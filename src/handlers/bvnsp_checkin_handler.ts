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
    handler_config,
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
import {
    build_passes_string,
    CompPassType,
    get_comp_pass_description,
} from "../utils/comp_passes";
import {
    CompPassSheet,
    ManagerPassSheet,
    PassSheet,
} from "../sheets/comp_pass_sheet";
import { SectionValues } from '../utils/section_values';

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
    AWAIT_SECTION: "await-section",
    AWAIT_PASS: "await-pass",
};

const COMMANDS = {
    ON_DUTY: ["onduty", "on-duty"],
    STATUS: ["status"],
    CHECKIN: ["checkin", "check-in"],
    SECTION_ASSIGNMENT: ["section", "section-assignment", "sectionsignment", "assignment"],
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
    body_raw: string | undefined;
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

    section_values: SectionValues;

    /**
     * Constructs a new BVNSPCheckinHandler.
     * @param {Context<HandlerEnvironment>} context - The serverless function context.
     * @param {ServerlessEventObject<HandlerEvent>} event - The event object.
     */
    constructor(
        context: Context<HandlerEnvironment>,
        event: ServerlessEventObject<HandlerEvent>
    ) {
        // Determine message details from the incoming event, with fallback values
        this.sms_request = (event.From || event.number) !== undefined;
        this.from = event.From || event.number || event.test_number!;
        this.to = sanitize_phone_number(event.To!);
        this.body = event.Body?.toLowerCase()?.trim().replace(/\s+/, "-");
        this.body_raw = event.Body
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

        this.checkin_values = new CheckinValues(handler_config.CHECKIN_VALUES);
        this.current_sheet_date = new Date();
        this.section_values = new SectionValues(this.combined_config);
    }

    /**
     * Parses the fast check-in mode from the message body.
     * @param {string} body - The message body.
     * @returns {boolean} True if fast check-in mode is parsed, otherwise false.
     */
    parse_fast_checkin_mode(body: string) {
        const parsed = this.checkin_values.parse_fast_checkin(body);
        if (parsed !== undefined) {
            this.checkin_mode = parsed.key;
            this.fast_checkin = true;
            return true;
        }
        return false;
    }

    /**
     * Parses the check-in mode from the message body.
     * @param {string} body - The message body.
     * @returns {boolean} True if check-in mode is parsed, otherwise false.
     */
    parse_checkin(body: string) {
        const parsed = this.checkin_values.parse_checkin(body);
        if (parsed !== undefined) {
            this.checkin_mode = parsed.key;
            return true;
        }
        return false;
    }

    /**
     * Parses the check-in mode from the next step.
     * @returns {boolean} True if check-in mode is parsed, otherwise false.
     */
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

    /**
     * Parses the pass type from the next step.
     * @returns {CompPassType} The parsed pass type.
     */
    parse_pass_from_next_step() {
        const last_segment = this.bvnsp_checkin_next_step
            ?.split("-")
            .slice(-2)
            .join("-");
        return last_segment as CompPassType;
    }

    /**
     * Delays the execution for a specified number of seconds.
     * @param {number} seconds - The number of seconds to delay.
     * @param {boolean} [optional=false] - Whether the delay is optional.
     * @returns {Promise<void>} A promise that resolves after the delay.
     */
    delay(seconds: number, optional: boolean = false) {
        if (optional && !this.sms_request) {
            seconds = 1 / 1000.0;
        }
        return new Promise((res) => {
            setTimeout(res, seconds);
        });
    }

    /**
     * Sends a message to the user.
     * @param {string} message - The message to send.
     * @returns {Promise<void>} A promise that resolves when the message is sent.
     */
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

    /**
     * Handles the check-in process.
     * @returns {Promise<BVNSPCheckinResponse>} A promise that resolves with the check-in response.
     */
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

    /**
     * Internal method to handle the check-in process.
     * @returns {Promise<BVNSPCheckinResponse>} A promise that resolves with the check-in response.
     */
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
        if (this.body?.toLowerCase() === "restart") {
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
            this.body_raw
        ) {
            const type = this.parse_pass_from_next_step();
            const guest_name = this.body_raw;
            if (
                guest_name.trim() !== "" &&
                [CompPassType.CompPass, CompPassType.ManagerPass].includes(type)
            ) {
                return await this.prompt_comp_manager_pass(type, guest_name);
            }
        } else if (
            this.bvnsp_checkin_next_step?.startsWith(NEXT_STEPS.AWAIT_SECTION) &&
            this.body
        ) {
            const section = this.section_values.parse_section(this.body)
            if (section) {
                return await this.assign_section(section);
            }
            return await this.prompt_section_assignment();
        }

        if (this.bvnsp_checkin_next_step) {
            await this.send_message("Sorry, I didn't understand that.");
        }
        return this.prompt_command();
    }

    /**
     * Handles the await command step.
     * @returns {Promise<BVNSPCheckinResponse | undefined>} A promise that resolves with the response or undefined.
     */
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
        if (COMMANDS.SECTION_ASSIGNMENT.includes(this.body!)) {
            console.log(`Performing section_assignment for ${patroller_name}`);
            return await this.prompt_section_assignment();
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

    /**
     * Prompts the user for a command.
     * @returns {BVNSPCheckinResponse} The response prompting the user for a command.
     */
    prompt_command(): BVNSPCheckinResponse {
        return {
            response: `${this.patroller!.name}, I'm the BVNSP Bot.
Enter a command:
Check in / Check out / Status / On Duty / Section Assignment / Comp Pass / Manager Pass / Whatsapp
Send 'restart' at any time to begin again`,
            next_step: NEXT_STEPS.AWAIT_COMMAND,
        };
    }

    /**
     * Prompts the user for a check-in.
     * @returns {BVNSPCheckinResponse} The response prompting the user for a check-in.
     */
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

    /**
     * Prompts the user for section assignment.
     * @returns {Promise<BVNSPCheckinResponse>} A promise that resolves with the response.
     */
    async prompt_section_assignment(): Promise<BVNSPCheckinResponse> {
        if (!this.patroller || !this.patroller.checkin) {
            return {
                response: `${this.patroller!.name} is not checked in.`,
            };
        }
        const section_description = this.section_values.get_section_description();
        return {
            response: `Enter your assigned section; one of ${section_description} (or 'restart')`,
            next_step: NEXT_STEPS.AWAIT_SECTION,
        };
    }

    /**
     * Assigns the section to the patroller.
     * @param {string} section - The section to assign.
     * @returns {Promise<BVNSPCheckinResponse>} A promise that resolves with the response.
     */
    async assign_section(section: string): Promise<BVNSPCheckinResponse> {
        console.log(`Assigning section ${this.patroller!.name} to ${section}`);
        const mapped_section = this.section_values.map_section(section);
        await this.log_action(`assign_section(${mapped_section})`);
        const login_sheet= await this.get_login_sheet()
        await login_sheet.assign_section(this.patroller!, mapped_section);
        await this.login_sheet?.refresh();
        await this.get_mapped_patroller(true);
        return {
            response: `Updated ${
                this.patroller!.name
            } with section assignment: ${mapped_section}.`,
        };
    }

    /**
     * Prompts the user for a comp or manager pass.
     * @param {CompPassType} pass_type - The type of pass.
     * @param {number | null} passes_to_use - The number of passes to use.
     * @returns {Promise<BVNSPCheckinResponse>} A promise that resolves with the response.
     */
    async prompt_comp_manager_pass(
        pass_type: CompPassType,
        guest_name: string | null
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
        if (guest_name == null) {
            return used_and_available.get_prompt();
        } else {
            await this.log_action(`use_${pass_type}`);
            await sheet.set_used_comp_passes(used_and_available, guest_name);
            return {
                response: `Updated ${
                    this.patroller!.name
                } to use ${get_comp_pass_description(
                    pass_type
                )} for guest "${guest_name}" today.`,
            };
        }
    }

    /**
     * Gets the status of the patroller.
     * @returns {Promise<BVNSPCheckinResponse>} A promise that resolves with the status response.
     */
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

    /**
     * Gets the status string of the patroller.
     * @returns {Promise<string>} A promise that resolves with the status string.
     */
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
        const usedTodayCompPasses = (await comp_pass_promise)?.used_today || 0;
        const usedTodayManagerPasses =
            (await manager_pass_promise)?.used_today || 0;
        const usedSeasonCompPasses =
            (await comp_pass_promise)?.used_season || 0;
        const usedSeasonManagerPasses =
            (await manager_pass_promise)?.used_season || 0;
        const availableCompPasses = (await comp_pass_promise)?.available || 0;
        const availableManagerPasses =
            (await manager_pass_promise)?.available || 0;

        statusString +=
            " " +
            build_passes_string(
                usedSeasonCompPasses,
                usedSeasonCompPasses + availableCompPasses,
                usedTodayCompPasses,
                "comp passes"
            );
        if (usedSeasonManagerPasses + availableManagerPasses > 0) {
            statusString +=
                " " +
                build_passes_string(
                    usedSeasonManagerPasses,
                    usedSeasonManagerPasses + availableManagerPasses,
                    usedTodayManagerPasses,
                    "manager passes"
                );
        }
        return statusString;
    }

    /**
     * Performs the check-in process for the patroller.
     * @returns {Promise<BVNSPCheckinResponse>} A promise that resolves with the check-in response.
     * @throws {Error} Throws an error if the check-in mode is improperly set.
     */
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
        await this.log_action(`update-status(${new_checkin_value})`);
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

    /**
     * Checks if the Google Sheets needs to be reset.
     * @returns {Promise<boolean>} A promise that resolves to true if the sheet needs to be reset, otherwise false.
     */
    async sheet_needs_reset(): Promise<boolean> {
        const login_sheet = await this.get_login_sheet();

        const sheet_date = login_sheet.sheet_date;
        const current_date = login_sheet.current_date;
        console.log(`sheet_date: ${sheet_date}`);
        console.log(`current_date: ${current_date}`);

        console.log(`date_is_current: ${login_sheet.is_current}`);

        return !login_sheet.is_current;
    }

    /**
     * Resets the Google Sheets flow, including archiving and resetting the sheet if necessary.
     * @returns {Promise<BVNSPCheckinResponse | void>} A promise that resolves with the check-in response or void.
     */
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

    /**
     * Resets the Google Sheets, including archiving and resetting the sheet.
     * @returns {Promise<void>} A promise that resolves when the sheet is reset.
     */
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

    /**
     * Gets the Google Apps Script service.
     * @returns {Promise<script_v1.Script>} A promise that resolves with the Google Apps Script service.
     */
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

    /**
     * Gets the Google Apps Script service.
     * @returns {Promise<script_v1.Script>} A promise that resolves with the Google Apps Script service.
     */
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

    /**
     * Logs an action to the Google Sheets.
     * @param {string} action_name - The name of the action to log.
     * @returns {Promise<void>} A promise that resolves when the action is logged.
     */
    async log_action(action_name: string) {
        const sheets_service = await this.get_sheets_service();
        await sheets_service.spreadsheets.values.append({
            spreadsheetId: this.combined_config.SHEET_ID,
            range: this.config.ACTION_LOG_SHEET,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[this.patroller!.name, new Date(), action_name]],
            },
        });
    }

    /**
     * Logs out the user.
     * @returns {Promise<BVNSPCheckinResponse>} A promise that resolves with the logout response.
     */
    async logout(): Promise<BVNSPCheckinResponse> {
        const user_creds = this.get_user_creds();
        await user_creds.deleteToken();
        return {
            response: "Okay, I have removed all login session information.",
        };
    }

    /**
     * Gets the Twilio client.
     * @returns {TwilioClient} The Twilio client.
     */
    get_twilio_client() {
        if (this.twilio_client == null) {
            throw new Error("twilio_client was never initialized!");
        }
        return this.twilio_client;
    }

    /**
     * Gets the Twilio Sync client.
     * @returns {ServiceContext} The Twilio Sync client.
     */
    get_sync_client() {
        if (!this.sync_client) {
            this.sync_client = this.get_twilio_client().sync.services(
                this.sync_sid
            );
        }
        return this.sync_client;
    }

    /**
     * Gets the user credentials.
     * @returns {UserCreds} The user credentials.
     */
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

    /**
     * Gets the service credentials.
     * @returns {GoogleAuth} The service credentials.
     */
    get_service_creds() {
        if (!this.service_creds) {
            this.service_creds = new google.auth.GoogleAuth({
                keyFile: get_service_credentials_path(),
                scopes: this.SCOPES,
            });
        }
        return this.service_creds;
    }

    /**
     * Gets the valid credentials.
     * @param {boolean} [require_user_creds=false] - Whether user credentials are required.
     * @returns {Promise<GoogleAuth>} A promise that resolves with the valid credentials.
     */
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

    /**
     * Gets the Google Sheets service.
     * @returns {Promise<sheets_v4.Sheets>} A promise that resolves with the Google Sheets service.
     */
    async get_sheets_service() {
        if (!this.sheets_service) {
            this.sheets_service = google.sheets({
                version: "v4",
                auth: await this.get_valid_creds(),
            });
        }
        return this.sheets_service;
    }

    /**
     * Gets the login sheet.
     * @returns {Promise<LoginSheet>} A promise that resolves with the login sheet
     */
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

    /**
     * Gets the season sheet.
     * @returns {Promise<SeasonSheet>} A promise that resolves with the season sheet
     */
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

    /**
     * Gets the comp pass sheet.
     * @returns {Promise<CompPassSheet>} A promise that resolves with the comp pass sheet
     */
    async get_comp_pass_sheet() {
        if (!this.comp_pass_sheet) {
            const config: CompPassesConfig = this.combined_config;
            const sheets_service = await this.get_sheets_service();
            const season_sheet = new CompPassSheet(sheets_service, config);
            this.comp_pass_sheet = season_sheet;
        }
        return this.comp_pass_sheet;
    }

    /**
     * Gets the manager pass sheet.
     * @returns {Promise<ManagerPassSheet>} A promise that resolves with the manager pass sheet
     */
    async get_manager_pass_sheet() {
        if (!this.manager_pass_sheet) {
            const config: ManagerPassesConfig = this.combined_config;
            const sheets_service = await this.get_sheets_service();
            const season_sheet = new ManagerPassSheet(sheets_service, config);
            this.manager_pass_sheet = season_sheet;
        }
        return this.manager_pass_sheet;
    }

    /**
     * Gets the Google Apps Script service.
     * @returns {Promise<script_v1.Script>} A promise that resolves with the Google Apps Script service.
     */
    async get_user_scripts_service() {
        if (!this.user_scripts_service) {
            this.user_scripts_service = google.script({
                version: "v1",
                auth: await this.get_valid_creds(true),
            });
        }
        return this.user_scripts_service;
    }

    /**
     * Gets the mapped patroller.
     * @param {boolean} [force=false] - Whether to force the patroller to be found.
     * @returns {Promise<BVNSPCheckinResponse | void>} A promise that resolves with the response or void.
     */
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

    /**
     * Finds the patroller from the phone number.
     * @returns {Promise<PatrollerRow>} A promise that resolves with the patroller.
     */
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
