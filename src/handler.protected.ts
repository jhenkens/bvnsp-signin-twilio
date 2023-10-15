import '@twilio-labs/serverless-runtime-types';
import {
    Context,
    ServerlessCallback,
    ServerlessEventObject,
    ServerlessFunctionSignature,
    ServiceContext,
    TwilioClient,
} from "@twilio-labs/serverless-runtime-types/types";
import { google, script_v1, sheets_v4 } from "googleapis";
import { GoogleAuth } from "googleapis-common";
import { LOGIN_SHEET_OPTS, LoginSheet } from "./login-sheet";
import { USER_CREDS_OPTS, UserCreds } from "./user-creds";
import {
    FIND_PATROLLER_OPTS,
    find_patroller_from_number,
    get_patrolled_days,
    PATROLLER_SEASON_OPTS,
    PatrollerRow,
} from "./util";
import { get_service_credentials_path } from "./file-utils";

const NEXT_STEP_COOKIE_NAME = "bvnsp_checkin_next_step";
type HandlerEvent = ServerlessEventObject<
    {
        From: string | undefined;
        To: string | undefined;
        number: string | undefined;
        Body: string | undefined;
    },
    {},
    {
        bvnsp_checkin_next_step: string | undefined;
    }
>;
type HandlerEnvironment = {
    SHEET_ID: string;
    SCRIPT_ID: string;
    RESET_FUNCTION_NAME: string;
    ARCHIVE_FUNCTION_NAME: string;
    PHONE_NUMBER_LOOKUP_SHEET: string;
    PHONE_NUMBER_NUMBER_COLUMN: string;
    PHONE_NUMBER_NAME_COLUMN: string;
    SYNC_SID: string;
    USE_SERVICE_ACCOUNT: string;
    NSP_EMAIL_DOMAIN: string;

    LOGIN_SHEET_LOOKUP: string;
    NUMBER_CHECKINS_LOOKUP: string;
    ARCHIVED_CELL: string;
    SHEET_DATE_CELL: string;
    CURRENT_DATE_CELL: string;
    SECTION_DROPDOWN_COLUMN: string;
    CHECKIN_DROPDOWN_COLUMN: string;
    CHECKIN_VALUES: string;
    USER_STATISTICS_SHEET: string;

    SEASON_SHEET: string;
    SEASON_SHEET_DAYS_COLUMN: string;
    SEASON_SHEET_NAME_COLUMN: string;
};

export const handler: ServerlessFunctionSignature<
    HandlerEnvironment,
    HandlerEvent
> = async function (
    context: Context<HandlerEnvironment>,
    event: ServerlessEventObject<HandlerEvent>,
    callback: ServerlessCallback
) {
    const handler = new Handler(context, event);
    let message: string;
    let next_step: string = "";
    try {
        const handler_response = await handler.handle();
        message =
            handler_response.response ||
            "Unexpected result - no response determined";
        next_step = handler_response.next_step || "";
    } catch (e) {
        console.log("An error occured");
        console.log(e);
        message = "An unexpected error occured.";
        if (e instanceof Error) {
            message += "\n" + e.message;
            console.log("Error", e.stack);
            console.log("Error", e.name);
            console.log("Error", e.message);
        }
    }

    const response = new Twilio.Response();
    const twiml = new Twilio.twiml.MessagingResponse();

    twiml.message(message);

    response
        // Add the stringified TwiML to the response body
        .setBody(twiml.toString())
        // Since we're returning TwiML, the content type must be XML
        .appendHeader("Content-Type", "text/xml")
        // You can increment the count state for the next message, or any other
        // operation that makes sense for your application's needs. Remember
        // that cookies are always stored as strings
        .setCookie(NEXT_STEP_COOKIE_NAME, next_step);

    return callback(null, response);
};

type Response = {
    response?: string;
    next_step?: string;
};

class CheckinValue {
    key: string;
    sheets_value: string;
    sms_desc: string;
    fast_checkins: string[];
    lookup_values: Set<string>;
    constructor(
        key: string,
        sheets_value: string,
        sms_desc: string,
        fast_checkins: string | string[]
    ) {
        if (!(fast_checkins instanceof Array)) {
            fast_checkins = [fast_checkins];
        }
        this.key = key;
        this.sheets_value = sheets_value;
        this.sms_desc = sms_desc;
        this.fast_checkins = fast_checkins.map((x) => x.trim().toLowerCase());

        const sms_desc_split: string[] = sms_desc
            .replace(/\s+/, "-")
            .toLowerCase()
            .split("/");
        const lookup_vals = [...this.fast_checkins, ...sms_desc_split];
        this.lookup_values = new Set<string>(lookup_vals);
    }
}

class CheckinValues {
    by_key: { [key: string]: CheckinValue } = {};
    by_lv: { [key: string]: CheckinValue } = {};
    by_fc: { [key: string]: CheckinValue } = {};
    by_sheet_string: { [key: string]: CheckinValue } = {};
    constructor(json_blob: string) {
        const values: CheckinValue[] = [];
        for (var [key, sheets_value, sms_desc, fast_checkin] of JSON.parse(
            json_blob
        )) {
            const result = new CheckinValue(
                key,
                sheets_value,
                sms_desc,
                fast_checkin
            );
            this.by_key[result.key] = result;
            this.by_sheet_string[result.sheets_value] = result;
            for (const lv of result.lookup_values) {
                this.by_lv[lv] = result;
            }
            for (const fc of result.fast_checkins) {
                this.by_fc[fc] = result;
            }
        }
    }
    entries() {
        return Object.entries(this.by_key);
    }

    parse_fast_checkin(body: string) {
        return this.by_fc[body];
    }

    parse_checkin(body: string) {
        const checkin_lower = body.replace(/\s+/, "");
        return this.by_lv[checkin_lower];
    }
}

class Handler {
    SCOPES: string[] = ["https://www.googleapis.com/auth/spreadsheets"];

    sms_request: boolean;
    result_messages: string[] = [];
    from: string;
    to: string;
    body: string | undefined;
    patroller: PatrollerRow | null;
    bvnsp_checkin_next_step: string | undefined;
    checkin_mode: string | null = null;
    fast_checkin: boolean = false;

    use_service_account: boolean;
    twilio_client: TwilioClient;
    sync_sid: string;
    reset_script_id: string;
    archive_function_name: string;
    reset_function_name: string;
    user_auth_opts: USER_CREDS_OPTS;
    find_patroller_opts: FIND_PATROLLER_OPTS;
    action_log_sheet: string;

    // Cache clients
    sync_client: ServiceContext | null = null;
    user_creds: UserCreds | null = null;
    service_creds: GoogleAuth | null = null;
    sheets_service: sheets_v4.Sheets | null = null;
    user_scripts_service: script_v1.Script | null = null;
    login_sheet_opts: LOGIN_SHEET_OPTS;
    login_sheet: LoginSheet | null = null;
    checkin_values: CheckinValues;
    patroller_season_opts: PATROLLER_SEASON_OPTS;

    constructor(
        context: Context<HandlerEnvironment>,
        event: ServerlessEventObject<HandlerEvent>
    ) {
        // Determine message details from the incoming event, with fallback values
        this.sms_request = (event.From || event.number) !== undefined;
        this.from = event.From || event.number || "+16508046698";
        this.to = event.To || "+12093000096";
        this.body = event.Body?.toLowerCase()?.trim().replace(/\s+/, "-");
        this.bvnsp_checkin_next_step =
            event.request.cookies.bvnsp_checkin_next_step;
        this.use_service_account = context.USE_SERVICE_ACCOUNT === "true";

        this.twilio_client = context.getTwilioClient();
        this.sync_sid = context.SYNC_SID;
        this.reset_script_id = context.SCRIPT_ID;
        this.archive_function_name = context.ARCHIVE_FUNCTION_NAME;
        this.reset_function_name = context.RESET_FUNCTION_NAME;
        this.action_log_sheet = context.USER_STATISTICS_SHEET;
        this.user_auth_opts = context;
        this.find_patroller_opts = context;
        this.login_sheet_opts = context;
        this.patroller_season_opts = context;
        this.patroller = null;

        this.checkin_values = new CheckinValues(context.CHECKIN_VALUES);
    }

    parse_fast_checkin_mode(body: string) {
        const parsed = this.checkin_values.parse_fast_checkin(body);
        if (parsed !== undefined) {
            this.checkin_mode = parsed.key;
            this.fast_checkin = true;
            return true;
        }
        return false;
    }

    parse_checkin(body: string) {
        const parsed = this.checkin_values.parse_checkin(body);
        if (parsed !== undefined) {
            this.checkin_mode = parsed.key;
            return true;
        }
        return false;
    }

    parse_checkin_from_next_step() {
        const last_segment = this.bvnsp_checkin_next_step
            ?.split("-")
            .slice(-1)[0];
        if (last_segment && last_segment in this.checkin_values.by_key) {
            this.checkin_mode = last_segment;
            return true;
        }
        return false;
    }

    delay(seconds: number, optional: boolean = false) {
        if (optional && !this.sms_request) {
            seconds = 1 / 1000.0;
        }
        return new Promise((res) => {
            setTimeout(res, seconds);
        });
    }

    async send_message(message: string) {
        if (this.sms_request) {
            await this.twilio_client.messages
                .create({
                    to: this.from,
                    from: this.to,
                    body: message,
                });
        } else {
            this.result_messages.push(message);
        }
    }

    async handle(): Promise<Response> {
        const result = await this._handle();
        if (!this.sms_request) {
            if (result?.response) {
                this.result_messages.push(result.response);
            }
            return {
                response: this.result_messages.join("\n###\n"),
                next_step: result?.next_step,
            };
        }
        return result;
    }
    async _handle(): Promise<Response> {
        console.log(
            `Received request from ${this.from} with body: ${this.body} and state ${this.bvnsp_checkin_next_step}`
        );
        if (this.body == "logout") {
            console.log(`Performing logout`);
            return await this.logout();
        }
        let response: Response | undefined;
        if (!this.use_service_account) {
            response = await this.check_user_creds();
            if (response) return response;
        }
        if (this.body == "restart") {
            return { response: "Okay. Text me again to start over..." };
        }
        response = await this.get_patroller_name();
        if (response) {
            return response;
        }

        if (
            (!this.bvnsp_checkin_next_step ||
                this.bvnsp_checkin_next_step == "await-command") &&
            this.body
        ) {
            if (this.parse_fast_checkin_mode(this.body)) {
                console.log(
                    `Performing fast checkin for ${this.patroller_name} with mode: ${this.checkin_mode}`
                );
                return await this.checkin();
            }
            if (["onduty", "on-duty"].includes(this.body)) {
                console.log(
                    `Performing get_on_duty for ${this.patroller_name}`
                );
                return { response: await this.get_on_duty() };
            }
            if (["status"].includes(this.body)) {
                console.log(`Performing get_status for ${this.patroller_name}`);
                return this.get_status();
            }
            if (["checkin", "check-in"].includes(this.body)) {
                console.log(
                    `Performing prompt_checkin for ${this.patroller_name}`
                );
                return this.prompt_checkin();
            }
        } else if (
            this.bvnsp_checkin_next_step == "await-checkin" &&
            this.body
        ) {
            if (this.parse_checkin(this.body)) {
                console.log(
                    `Performing regular checkin for ${this.patroller_name} with mode: ${this.checkin_mode}`
                );
                return await this.checkin();
            }
        } else if (
            this.bvnsp_checkin_next_step?.startsWith("confirm-reset") &&
            this.body
        ) {
            if (this.body == "yes" && this.parse_checkin_from_next_step()) {
                console.log(
                    `Performing reset_sheet_flow for ${this.patroller_name} with checkin mode: ${this.checkin_mode}`
                );
                return (
                    (await this.reset_sheet_flow()) || (await this.checkin())
                );
            }
        } else if (this.bvnsp_checkin_next_step?.startsWith("auth-reset")) {
            if (this.parse_checkin_from_next_step()) {
                console.log(
                    `Performing reset_sheet_flow-post-auth for ${this.patroller_name} with checkin mode: ${this.checkin_mode}`
                );
                return (
                    (await this.reset_sheet_flow()) || (await this.checkin())
                );
            }
        }

        if (this.bvnsp_checkin_next_step) {
            await this.send_message("Sorry, I didn't understand that.");
        }
        return this.prompt_command();
    }

    prompt_command() {
        return {
            response: `${this.patroller_name}, I'm BVNSP Bot. 
Enter a command:
Check in / Check out / Status / On Duty
Send 'restart' at any time to begin again`,
            next_step: "await-command",
        };
    }

    prompt_checkin() {
        const types = Object.values(this.checkin_values.by_key).map(
            (x) => x.sms_desc
        );
        return {
            response: `${
                this.patroller_name
            }, update patrolling status to: ${types
                .slice(0, -1)
                .join(", ")}, or ${types.slice(-1)}?`,
            next_step: "await-checkin",
        };
    }

    async get_status() {
        const login_sheet = await this.get_login_sheet();
        const sheet_date = login_sheet.sheet_date.toDateString();
        const current_date = login_sheet.current_date.toDateString();
        if (!login_sheet.is_current) {
            console.log(`sheet_date: ${login_sheet.sheet_date}`);
            console.log(`current_date: ${login_sheet.current_date}`);
            return {
                response: `Sheet is not current for today (last reset: ${sheet_date}). ${this.patroller_name} is not checked in for ${current_date}.`,
            };
        }
        const response = { response: await this.get_status_string() };
        await this.log_action("status");
        return response;
    }

    async get_status_string() {
        const login_sheet = await this.get_login_sheet();
        const patroller_status = login_sheet.find_patroller(
            this.patroller_name
        );
        const checkinColumnSet =
            patroller_status.checkin !== undefined &&
            patroller_status.checkin !== null;
        const checkedOut =
            checkinColumnSet &&
            this.checkin_values.by_sheet_string[patroller_status.checkin].key ==
                "out";
        let status = patroller_status.checkin || "Not Present";

        if (checkedOut) {
            status = "Checked Out";
        } else if (checkinColumnSet) {
            let section = patroller_status.section.toString();
            if (section.length == 1) {
                section = `Section ${section}`;
            }
            status = `${patroller_status.checkin} (${section})`;
        } else {
            status = "not present";
        }

        const completedPatrolDays = await get_patrolled_days(
            this.patroller_name,
            await this.get_sheets_service(),
            this.patroller_season_opts
        );
        const completedPatrolDaysString =
            completedPatrolDays > 0 ? completedPatrolDays.toString() : "No";
        const loginSheetDate = login_sheet.sheet_date.toDateString();

        return `Status for ${this.patroller_name} on date ${loginSheetDate}: ${status}.\n${completedPatrolDaysString} completed patrol days prior to today.`;
    }

    async checkin() {
        if (await this.sheet_needs_reset()) {
            return {
                response:
                    `${this.patroller_name}, you are the first person to check in today. ` +
                    `I need to archive and reset the sheet before continuing. ` +
                    `Would you like me to do that? (Yes/No)`,
                next_step: `confirm-reset-${this.checkin_mode}`,
            };
        }
        let checkin_mode;
        if (
            !this.checkin_mode ||
            (checkin_mode = this.checkin_values.by_key[this.checkin_mode]) ===
                undefined
        ) {
            throw new Error("Checkin mode improperly set");
        }

        const login_sheet = await this.get_login_sheet();
        const new_checkin_value = checkin_mode.sheets_value;
        await login_sheet.checkin(this.patroller_name, new_checkin_value);
        await this.login_sheet?.refresh();

        let response = `Updating ${this.patroller_name} with status: ${new_checkin_value}.`;
        if (!this.fast_checkin) {
            response += ` You can send '${checkin_mode.fast_checkins[0]}' as your first message for a fast ${checkin_mode.sheets_value} checkin next time.`;
        }

        response += "\n\n" + (await this.get_status_string());
        return { response: response };
    }

    async sheet_needs_reset() {
        const login_sheet = await this.get_login_sheet();

        const sheet_date = login_sheet.sheet_date;
        const current_date = login_sheet.current_date;
        console.log(`sheet_date: ${sheet_date}`);
        console.log(`current_date: ${current_date}`);

        console.log(`date_is_current: ${login_sheet.is_current}`);

        return !login_sheet.is_current;
    }

    async reset_sheet_flow() {
        const response = await this.check_user_creds(
            `${this.patroller_name}, in order to reset/archive, I need you to authorize the app.`
        );
        if (response)
            return {
                response: response.response,
                next_step: `auth-reset-${this.checkin_mode}`,
            };
        if (response) {
            return response;
        }
        return await this.reset_sheet();
    }

    async reset_sheet() {
        const script_service = await this.get_user_scripts_service();
        const should_perform_archive = !(await this.get_login_sheet()).archived;
        const message = should_perform_archive
            ? "Okay. Archiving and reseting the check in sheet. This takes about 10 seconds..."
            : "Okay. Sheet has already been archived. Performing reset. This takes about 5 seconds...";
        await this.send_message(message);
        if (should_perform_archive) {
            console.log("Archiving...");

            await script_service.scripts.run({
                scriptId: this.reset_script_id,
                requestBody: { function: this.archive_function_name },
            });
            await this.delay(5);
            await this.log_action("archive");
            this.login_sheet = null;
        }

        console.log("Resetting...");
        await script_service.scripts.run({
            scriptId: this.reset_script_id,
            requestBody: { function: this.reset_function_name },
        });
        await this.delay(5);
        await this.log_action("reset");
        await this.send_message("Done.");
    }

    async check_user_creds(
        prompt_message: string = "Hi, before you can use BVNSP bot, you must login."
    ) {
        const user_creds = this.get_user_creds();
        if (!(await user_creds.loadToken())) {
            const authUrl = await user_creds.getAuthUrl();
            return {
                response: `${prompt_message} Please follow this link:
${authUrl}

Message me again when done.`,
            };
        }
    }

    async get_on_duty() {
        const checked_out_section = "Checked Out";
        const last_sections = [checked_out_section];
        const login_sheet = await this.get_login_sheet();

        const on_duty_patrollers = login_sheet.get_on_duty_patrollers();
        const by_section = on_duty_patrollers
            .filter((x) => x.checkin)
            .reduce((prev: { [key: string]: PatrollerRow[] }, cur) => {
                const short_code =
                    this.checkin_values.by_sheet_string[cur.checkin].key;
                let section = cur.section;
                if (short_code == "out") {
                    section = checked_out_section;
                }
                if (!(section in prev)) {
                    prev[section] = [];
                }
                prev[section].push(cur);
                return prev;
            }, {});
        let results: string[][] = [];
        let all_keys = Object.keys(by_section);
        const ordered_primary_sections = Object.keys(by_section)
            .filter((x) => !last_sections.includes(x))
            .sort();
        const filtered_last_sections = last_sections.filter((x) =>
            all_keys.includes(x)
        );
        const ordered_sections = ordered_primary_sections.concat(
            filtered_last_sections
        );

        for (const section of ordered_sections) {
            let result: string[] = [];
            const patrollers = by_section[section].sort((x, y) =>
                x.name.localeCompare(y.name)
            );
            if (section.length === 1) {
                result.push("Section ");
            }
            result.push(`${section}: `);
            function patroller_string(name: string, short_code: string) {
                let details = "";
                if (short_code !== "day" && short_code !== "out") {
                    details = ` (${short_code.toUpperCase()})`;
                }
                return `${name}${details}`;
            }
            result.push(
                patrollers
                    .map((x) =>
                        patroller_string(
                            x.name,
                            this.checkin_values.by_sheet_string[x.checkin].key
                        )
                    )
                    .join(", ")
            );
            results.push(result);
        }
        await this.log_action("on-duty");
        return `Patrollers for ${login_sheet.sheet_date.toDateString()} (Total: ${
            on_duty_patrollers.length
        }):\n${results.map((r) => r.join("")).join("\n")}`;
    }

    async log_action(action_name: string) {
        const sheets_service = await this.get_sheets_service();
        await sheets_service.spreadsheets.values.append({
            spreadsheetId: this.login_sheet_opts.SHEET_ID,
            range: this.action_log_sheet,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[this.patroller_name, new Date(), action_name]],
            },
        });
    }

    async logout() {
        const user_creds = this.get_user_creds();
        await user_creds.deleteToken();
        return {
            response: "Okay, I have removed all login session information.",
        };
    }

    get_sync_client() {
        if (!this.sync_client) {
            this.sync_client = this.twilio_client.sync.services(this.sync_sid);
        }
        return this.sync_client;
    }

    get_user_creds() {
        if (!this.user_creds) {
            this.user_creds = new UserCreds(
                this.get_sync_client(),
                this.from,
                this.user_auth_opts
            );
        }
        return this.user_creds;
    }

    get_service_creds() {
        if (!this.service_creds) {
            this.service_creds = new google.auth.GoogleAuth({
                keyFile: get_service_credentials_path(),
                scopes: this.SCOPES,
            });
        }
        return this.service_creds;
    }

    async get_valid_creds(require_user_creds: boolean = false) {
        if (this.use_service_account && !require_user_creds) {
            return this.get_service_creds();
        }
        const user_creds = this.get_user_creds();
        if (!(await user_creds.loadToken())) {
            throw new Error("User is not authed.");
        }
        console.log("Using user account for service auth...");
        return user_creds.oauth2_client;
    }

    async get_sheets_service() {
        if (!this.sheets_service) {
            this.sheets_service = google.sheets({
                version: "v4",
                auth: await this.get_valid_creds(),
            });
        }
        return this.sheets_service;
    }

    async get_login_sheet() {
        if (!this.login_sheet) {
            const sheets_service = await this.get_sheets_service();
            const login_sheet = new LoginSheet(
                sheets_service,
                this.login_sheet_opts
            );
            await login_sheet.refresh();
            this.login_sheet = login_sheet;
        }
        return this.login_sheet;
    }

    async get_user_scripts_service() {
        if (!this.user_scripts_service) {
            this.user_scripts_service = google.script({
                version: "v1",
                auth: await this.get_valid_creds(true),
            });
        }
        return this.user_scripts_service;
    }

    async get_patroller_name() {
        const sheets_service = await this.get_sheets_service();
        const phone_lookup = await find_patroller_from_number(
            this.from,
            sheets_service,
            this.find_patroller_opts
        );
        if (phone_lookup === undefined || phone_lookup === null) {
            return {
                response: `Sorry, I couldn't find an associated BVNSP member with your phone number (${this.from})`,
            };
        }

        const login_sheet = await this.get_login_sheet();
        const mappedPatroller = login_sheet.try_find_patroller(
            phone_lookup.name
        );
        if (mappedPatroller === "not_found") {
            return {
                response: `Could not find patroller '${phone_lookup.name}' in login sheet. Please look at the login sheet name, and copy it to the Phone Numbers tab.`,
            };
        }
        this.patroller_name = phone_lookup.name;
    }
}
