import "@twilio-labs/serverless-runtime-types";
import {
    Context,
    ServerlessEventObject,
    ServiceContext,
    TwilioClient,
} from "@twilio-labs/serverless-runtime-types/types";
import { google, script_v1, sheets_v4 } from "googleapis";
import { GoogleAuth } from "googleapis-common";
import {
    CONFIG,
    CombinedConfig,
    CompPassesConfig,
    FindPatrollerConfig,
    HandlerConfig,
    HandlerEnvironment,
    LoginSheetConfig,
    ManagerPassesConfig,
    SeasonSheetConfig,
} from "../env/handler_config";
import LoginSheet, { PatrollerRow } from "../sheets/login_sheet";
import SeasonSheet from "../sheets/season_sheet";
import { UserCreds } from "../user-creds";
import { CheckinValues } from "../utils/checkin_values";
import { get_service_credentials_path } from "../utils/file_utils";
import { excel_row_to_index, sanitize_phone_number } from "../utils/util";
import { CompPassType, get_comp_pass_description } from "../utils/comp_passes";
import {
    CompPassSheet,
    ManagerPassSheet,
    PassSheet,
} from "../sheets/comp_pass_sheet";

export type BVNSPCheckinResponse = {
    response?: string;
    next_step?: string;
};
export type HandlerEvent = ServerlessEventObject<
    {
        From: string | undefined;
        To: string | undefined;
        number: string | undefined;
        test_number: string | undefined;
        Body: string | undefined;
    },
    {},
    {
        bvnsp_checkin_next_step: string | undefined;
    }
>;

export const NEXT_STEPS = {
    AWAIT_COMMAND: "await-command",
    AWAIT_CHECKIN: "await-checkin",
    CONFIRM_RESET: "confirm-reset",
    AUTH_RESET: "auth-reset",
    AWAIT_PASS: "await-pass",
};

const COMMANDS = {
    ON_DUTY: ["onduty", "on-duty"],
    STATUS: ["status"],
    CHECKIN: ["checkin", "check-in"],
    COMP_PASS: ["comp-pass", "comppass"],
    MANAGER_PASS: ["manager-pass", "managerpass"],
    WHATSAPP: ["whatsapp"],
};

export default class BVNSPCheckinHandler {
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

    twilio_client: TwilioClient | null = null;
    sync_sid: string;
    reset_script_id: string;

    // Cache clients
    sync_client: ServiceContext | null = null;
    user_creds: UserCreds | null = null;
    service_creds: GoogleAuth | null = null;
    sheets_service: sheets_v4.Sheets | null = null;
    user_scripts_service: script_v1.Script | null = null;

    login_sheet: LoginSheet | null = null;
    season_sheet: SeasonSheet | null = null;
    comp_pass_sheet: CompPassSheet | null = null;
    manager_pass_sheet: ManagerPassSheet | null = null;

    checkin_values: CheckinValues;
    current_sheet_date: Date;

    combined_config: CombinedConfig;
    config: HandlerConfig;

    constructor(
        context: Context<HandlerEnvironment>,
        event: ServerlessEventObject<HandlerEvent>
    ) {
        // Determine message details from the incoming event, with fallback values
        this.sms_request = (event.From || event.number) !== undefined;
        this.from = event.From || event.number || event.test_number!;
        this.to = sanitize_phone_number(event.To!);
        this.body = event.Body?.toLowerCase()?.trim().replace(/\s+/, "-");
        this.bvnsp_checkin_next_step =
            event.request.cookies.bvnsp_checkin_next_step;
        this.combined_config = { ...CONFIG, ...context };
        this.config = this.combined_config;

        try {
            this.twilio_client = context.getTwilioClient();
        } catch (e) {
            console.log("Error initializing twilio_client", e);
        }
        this.sync_sid = context.SYNC_SID;
        this.reset_script_id = context.SCRIPT_ID;
        this.patroller = null;

        this.checkin_values = new CheckinValues(this.config.CHECKIN_VALUES);
        this.current_sheet_date = new Date();
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

    parse_pass_from_next_step() {
        const last_segment = this.bvnsp_checkin_next_step
            ?.split("-")
            .slice(-2)
            .join("-");
        return last_segment as CompPassType;
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
            await this.get_twilio_client().messages.create({
                to: this.from,
                from: this.to,
                body: message,
            });
        } else {
            this.result_messages.push(message);
        }
    }

    async handle(): Promise<BVNSPCheckinResponse> {
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
    async _handle(): Promise<BVNSPCheckinResponse> {
        console.log(
            `Received request from ${this.from} with body: ${this.body} and state ${this.bvnsp_checkin_next_step}`
        );
        if (this.body == "logout") {
            console.log(`Performing logout`);
            return await this.logout();
        }
        let response: BVNSPCheckinResponse | undefined;
        if (!this.config.USE_SERVICE_ACCOUNT) {
            response = await this.check_user_creds();
            if (response) return response;
        }
        if (this.body == "restart") {
            return { response: "Okay. Text me again to start over..." };
        }

        response = await this.get_mapped_patroller();
        if (response || this.patroller == null) {
            return (
                response || {
                    response: "Unexpected error looking up patroller mapping",
                }
            );
        }

        if (
            (!this.bvnsp_checkin_next_step ||
                this.bvnsp_checkin_next_step == NEXT_STEPS.AWAIT_COMMAND) &&
            this.body
        ) {
            const await_response = await this.handle_await_command();
            if (await_response) {
                return await_response;
            }
        } else if (
            this.bvnsp_checkin_next_step == NEXT_STEPS.AWAIT_CHECKIN &&
            this.body
        ) {
            if (this.parse_checkin(this.body)) {
                return await this.checkin();
            }
        } else if (
            this.bvnsp_checkin_next_step?.startsWith(
                NEXT_STEPS.CONFIRM_RESET
            ) &&
            this.body
        ) {
            if (this.body == "yes" && this.parse_checkin_from_next_step()) {
                console.log(
                    `Performing reset_sheet_flow for ${this.patroller.name} with checkin mode: ${this.checkin_mode}`
                );
                return (
                    (await this.reset_sheet_flow()) || (await this.checkin())
                );
            }
        } else if (
            this.bvnsp_checkin_next_step?.startsWith(NEXT_STEPS.AUTH_RESET)
        ) {
            if (this.parse_checkin_from_next_step()) {
                console.log(
                    `Performing reset_sheet_flow-post-auth for ${this.patroller.name} with checkin mode: ${this.checkin_mode}`
                );
                return (
                    (await this.reset_sheet_flow()) || (await this.checkin())
                );
            }
        } else if (
            this.bvnsp_checkin_next_step?.startsWith(NEXT_STEPS.AWAIT_PASS) &&
            this.body
        ) {
            const type = this.parse_pass_from_next_step();
            const number = Number(this.body);
            if (
                !Number.isNaN(number) &&
                [CompPassType.CompPass, CompPassType.ManagerPass].includes(type)
            ) {
                return await this.prompt_comp_manager_pass(type, number);
            }
        }

        if (this.bvnsp_checkin_next_step) {
            await this.send_message("Sorry, I didn't understand that.");
        }
        return this.prompt_command();
    }

    async handle_await_command(): Promise<BVNSPCheckinResponse | undefined> {
        const patroller_name = this.patroller!.name;
        if (this.parse_fast_checkin_mode(this.body!)) {
            console.log(
                `Performing fast checkin for ${patroller_name} with mode: ${this.checkin_mode}`
            );
            return await this.checkin();
        }
        if (COMMANDS.ON_DUTY.includes(this.body!)) {
            console.log(`Performing get_on_duty for ${patroller_name}`);
            return { response: await this.get_on_duty() };
        }
        console.log("Checking for status...");
        if (COMMANDS.STATUS.includes(this.body!)) {
            console.log(`Performing get_status for ${patroller_name}`);
            return this.get_status();
        }
        if (COMMANDS.CHECKIN.includes(this.body!)) {
            console.log(`Performing prompt_checkin for ${patroller_name}`);
            return this.prompt_checkin();
        }
        if (COMMANDS.COMP_PASS.includes(this.body!)) {
            console.log(`Performing comp_pass for ${patroller_name}`);
            return await this.prompt_comp_manager_pass(
                CompPassType.CompPass,
                null
            );
        }
        if (COMMANDS.MANAGER_PASS.includes(this.body!)) {
            console.log(`Performing manager_pass for ${patroller_name}`);
            return await this.prompt_comp_manager_pass(
                CompPassType.ManagerPass,
                null
            );
        }
        if (COMMANDS.WHATSAPP.includes(this.body!)) {
            return {
                response: `I'm available on whatsapp as well! Whatsapp uses Wifi/Cell Data instead of SMS, and can be more reliable. Message me at https://wa.me/1${this.to}`,
            };
        }
    }

    prompt_command(): BVNSPCheckinResponse {
        return {
            response: `${this.patroller!.name}, I'm BVNSP Bot. 
Enter a command:
Check in / Check out / Status / On Duty / Comp Pass / Manager Pass / Whatsapp
Send 'restart' at any time to begin again`,
            next_step: NEXT_STEPS.AWAIT_COMMAND,
        };
    }

    prompt_checkin(): BVNSPCheckinResponse {
        const types = Object.values(this.checkin_values.by_key).map(
            (x) => x.sms_desc
        );
        return {
            response: `${
                this.patroller!.name
            }, update patrolling status to: ${types
                .slice(0, -1)
                .join(", ")}, or ${types.slice(-1)}?`,
            next_step: NEXT_STEPS.AWAIT_CHECKIN,
        };
    }

    async prompt_comp_manager_pass(
        pass_type: CompPassType,
        passes_to_use: number | null
    ): Promise<BVNSPCheckinResponse> {
        if (this.patroller!.category == "C") {
            return {
                response: `${
                    this.patroller!.name
                }, candidates do not receive comp or manager passes.`,
            };
        }
        const sheet: PassSheet = await (pass_type == CompPassType.CompPass
            ? this.get_comp_pass_sheet()
            : this.get_manager_pass_sheet());

        const used_and_available = await sheet.get_available_and_used_passes(
            this.patroller?.name!
        );
        if (used_and_available == null) {
            return {
                response: "Problem looking up patroller for comp passes",
            };
        }
        if (passes_to_use == null) {
            return used_and_available.get_prompt();
        } else {
            await sheet.set_used_comp_passes(used_and_available, passes_to_use);
            return {
                response: `Updated ${
                    this.patroller!.name
                } to use ${passes_to_use} ${get_comp_pass_description(
                    pass_type
                )} today.`,
            };
        }
    }

    async get_status(): Promise<BVNSPCheckinResponse> {
        const login_sheet = await this.get_login_sheet();
        const sheet_date = login_sheet.sheet_date.toDateString();
        const current_date = login_sheet.current_date.toDateString();
        if (!login_sheet.is_current) {
            console.log(`sheet_date: ${login_sheet.sheet_date}`);
            console.log(`current_date: ${login_sheet.current_date}`);
            return {
                response: `Sheet is not current for today (last reset: ${sheet_date}). ${
                    this.patroller!.name
                } is not checked in for ${current_date}.`,
            };
        }
        const response = { response: await this.get_status_string() };
        await this.log_action("status");
        return response;
    }

    async get_status_string(): Promise<string> {
        const login_sheet = await this.get_login_sheet();
        const comp_pass_promise = (
            await this.get_comp_pass_sheet()
        ).get_available_and_used_passes(this.patroller!.name);
        const manager_pass_promise = (
            await this.get_manager_pass_sheet()
        ).get_available_and_used_passes(this.patroller!.name);
        const patroller_status = this.patroller!;

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
        }

        const completedPatrolDays = await (
            await this.get_season_sheet()
        ).get_patrolled_days(this.patroller!.name);
        const completedPatrolDaysString =
            completedPatrolDays > 0 ? completedPatrolDays.toString() : "No";
        const loginSheetDate = login_sheet.sheet_date.toDateString();

        let statusString = `Status for ${
            this.patroller!.name
        } on date ${loginSheetDate}: ${status}.\n${completedPatrolDaysString} completed patrol days prior to today.`;
        const usedCompPasses = (await comp_pass_promise)?.used;
        const usedManagerPasses = (await manager_pass_promise)?.used;
        if (usedCompPasses) {
            statusString += ` You are using ${usedCompPasses} comp passes today.`;
        }
        if (usedManagerPasses) {
            statusString += ` You are using ${usedManagerPasses} manager passes today.`;
        }
        return statusString;
    }

    async checkin(): Promise<BVNSPCheckinResponse> {
        console.log(
            `Performing regular checkin for ${
                this.patroller!.name
            } with mode: ${this.checkin_mode}`
        );
        if (await this.sheet_needs_reset()) {
            return {
                response:
                    `${
                        this.patroller!.name
                    }, you are the first person to check in today. ` +
                    `I need to archive and reset the sheet before continuing. ` +
                    `Would you like me to do that? (Yes/No)`,
                next_step: `${NEXT_STEPS.CONFIRM_RESET}-${this.checkin_mode}`,
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
        await login_sheet.checkin(this.patroller!, new_checkin_value);
        await this.login_sheet?.refresh();
        await this.get_mapped_patroller(true);

        let response = `Updating ${
            this.patroller!.name
        } with status: ${new_checkin_value}.`;
        if (!this.fast_checkin) {
            response += ` You can send '${checkin_mode.fast_checkins[0]}' as your first message for a fast ${checkin_mode.sheets_value} checkin next time.`;
        }
        response += "\n\n" + (await this.get_status_string());
        return { response: response };
    }

    async sheet_needs_reset(): Promise<boolean> {
        const login_sheet = await this.get_login_sheet();

        const sheet_date = login_sheet.sheet_date;
        const current_date = login_sheet.current_date;
        console.log(`sheet_date: ${sheet_date}`);
        console.log(`current_date: ${current_date}`);

        console.log(`date_is_current: ${login_sheet.is_current}`);

        return !login_sheet.is_current;
    }

    async reset_sheet_flow(): Promise<BVNSPCheckinResponse | void> {
        const response = await this.check_user_creds(
            `${
                this.patroller!.name
            }, in order to reset/archive, I need you to authorize the app.`
        );
        if (response)
            return {
                response: response.response,
                next_step: `${NEXT_STEPS.AUTH_RESET}-${this.checkin_mode}`,
            };
        return await this.reset_sheet();
    }

    async reset_sheet(): Promise<void> {
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
                requestBody: { function: this.config.ARCHIVE_FUNCTION_NAME },
            });
            await this.delay(5);
            await this.log_action("archive");
            this.login_sheet = null;
        }

        console.log("Resetting...");
        await script_service.scripts.run({
            scriptId: this.reset_script_id,
            requestBody: { function: this.config.RESET_FUNCTION_NAME },
        });
        await this.delay(5);
        await this.log_action("reset");
        await this.send_message("Done.");
    }

    async check_user_creds(
        prompt_message: string = "Hi, before you can use BVNSP bot, you must login."
    ): Promise<BVNSPCheckinResponse | undefined> {
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

    async get_on_duty(): Promise<string> {
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
            spreadsheetId: this.combined_config.SHEET_ID,
            range: this.config.ACITON_LOG_SHEET,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[this.patroller!.name, new Date(), action_name]],
            },
        });
    }

    async logout(): Promise<BVNSPCheckinResponse> {
        const user_creds = this.get_user_creds();
        await user_creds.deleteToken();
        return {
            response: "Okay, I have removed all login session information.",
        };
    }

    get_twilio_client() {
        if (this.twilio_client == null) {
            throw new Error("twilio_client was never initialized!");
        }
        return this.twilio_client;
    }

    get_sync_client() {
        if (!this.sync_client) {
            this.sync_client = this.get_twilio_client().sync.services(
                this.sync_sid
            );
        }
        return this.sync_client;
    }

    get_user_creds() {
        if (!this.user_creds) {
            this.user_creds = new UserCreds(
                this.get_sync_client(),
                this.from,
                this.combined_config
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
        if (this.config.USE_SERVICE_ACCOUNT && !require_user_creds) {
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
            const login_sheet_config: LoginSheetConfig = this.combined_config;
            const sheets_service = await this.get_sheets_service();
            const login_sheet = new LoginSheet(
                sheets_service,
                login_sheet_config
            );
            await login_sheet.refresh();
            this.login_sheet = login_sheet;
        }
        return this.login_sheet;
    }

    async get_season_sheet() {
        if (!this.season_sheet) {
            const season_sheet_config: SeasonSheetConfig = this.combined_config;
            const sheets_service = await this.get_sheets_service();
            const season_sheet = new SeasonSheet(
                sheets_service,
                season_sheet_config
            );
            this.season_sheet = season_sheet;
        }
        return this.season_sheet;
    }

    async get_comp_pass_sheet() {
        if (!this.comp_pass_sheet) {
            const config: CompPassesConfig = this.combined_config;
            const sheets_service = await this.get_sheets_service();
            const season_sheet = new CompPassSheet(sheets_service, config);
            this.comp_pass_sheet = season_sheet;
        }
        return this.comp_pass_sheet;
    }

    async get_manager_pass_sheet() {
        if (!this.manager_pass_sheet) {
            const config: ManagerPassesConfig = this.combined_config;
            const sheets_service = await this.get_sheets_service();
            const season_sheet = new ManagerPassSheet(sheets_service, config);
            this.manager_pass_sheet = season_sheet;
        }
        return this.manager_pass_sheet;
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

    async get_mapped_patroller(force: boolean = false) {
        const phone_lookup = await this.find_patroller_from_number();
        if (phone_lookup === undefined || phone_lookup === null) {
            if (force) {
                throw new Error("Could not find associated user");
            }
            return {
                response: `Sorry, I couldn't find an associated BVNSP member with your phone number (${this.from})`,
            };
        }

        const login_sheet = await this.get_login_sheet();
        const mappedPatroller = login_sheet.try_find_patroller(
            phone_lookup.name
        );
        if (mappedPatroller === "not_found") {
            if (force) {
                throw new Error("Could not patroller in login sheet");
            }
            return {
                response: `Could not find patroller '${phone_lookup.name}' in login sheet. Please look at the login sheet name, and copy it to the Phone Numbers tab.`,
            };
        }
        this.current_sheet_date = login_sheet.current_date;
        this.patroller = mappedPatroller;
    }

    async find_patroller_from_number() {
        const raw_number = this.from;
        const sheets_service = await this.get_sheets_service();
        const opts: FindPatrollerConfig = this.combined_config;
        const number = sanitize_phone_number(raw_number);
        const response = await sheets_service.spreadsheets.values.get({
            spreadsheetId: opts.SHEET_ID,
            range: opts.PHONE_NUMBER_LOOKUP_SHEET,
            valueRenderOption: "UNFORMATTED_VALUE",
        });
        if (!response.data.values) {
            throw new Error("Could not find patroller.");
        }
        const patroller = response.data.values
            .map((row) => {
                const rawNumber =
                    row[excel_row_to_index(opts.PHONE_NUMBER_NUMBER_COLUMN)];
                const currentNumber =
                    rawNumber != undefined
                        ? sanitize_phone_number(rawNumber)
                        : rawNumber;
                const currentName =
                    row[excel_row_to_index(opts.PHONE_NUMBER_NAME_COLUMN)];
                return { name: currentName, number: currentNumber };
            })
            .filter((patroller) => patroller.number === number)[0];
        return patroller;
    }
}
