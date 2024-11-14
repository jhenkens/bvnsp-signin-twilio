/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/env/handler_config.ts":
/*!***********************************!*\
  !*** ./src/env/handler_config.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.handler_config = exports.CONFIG = void 0;
const checkin_values_1 = __webpack_require__(/*! ../utils/checkin_values */ "./src/utils/checkin_values.ts");
const user_creds_config = {
    NSP_EMAIL_DOMAIN: "farwest.org",
};
const find_patroller_config = {
    SHEET_ID: "test",
    PHONE_NUMBER_LOOKUP_SHEET: "Phone Numbers!A2:B100",
    PHONE_NUMBER_NAME_COLUMN: "A",
    PHONE_NUMBER_NUMBER_COLUMN: "B",
};
const login_sheet_config = {
    SHEET_ID: "test",
    LOGIN_SHEET_LOOKUP: "Login!A1:Z100",
    CHECKIN_COUNT_LOOKUP: "Tools!G2:G2",
    SHEET_DATE_CELL: "B1",
    CURRENT_DATE_CELL: "B2",
    ARCHIVED_CELL: "H1",
    NAME_COLUMN: "A",
    CATEGORY_COLUMN: "B",
    SECTION_DROPDOWN_COLUMN: "H",
    CHECKIN_DROPDOWN_COLUMN: "I",
};
const season_sheet_config = {
    SHEET_ID: "test",
    SEASON_SHEET: "Season",
    SEASON_SHEET_NAME_COLUMN: "B",
    SEASON_SHEET_DAYS_COLUMN: "A",
};
const comp_passes_config = {
    SHEET_ID: "test",
    COMP_PASS_SHEET: "Comps",
    COMP_PASS_SHEET_NAME_COLUMN: "A",
    COMP_PASS_SHEET_DATES_AVAILABLE_COLUMN: "D",
    COMP_PASS_SHEET_USED_TODAY_COLUMN: "E",
    COMP_PASS_SHEET_USED_SEASON_COLUMN: "F",
    COMP_PASS_SHEET_DATES_STARTING_COLUMN: "G",
};
const manager_passes_config = {
    SHEET_ID: "test",
    MANAGER_PASS_SHEET: "Managers",
    MANAGER_PASS_SHEET_NAME_COLUMN: "A",
    MANAGER_PASS_SHEET_AVAILABLE_COLUMN: "E",
    MANAGER_PASS_SHEET_USED_TODAY_COLUMN: "C",
    MANAGER_PASS_SHEET_USED_SEASON_COLUMN: "B",
    MANAGER_PASS_SHEET_DATES_STARTING_COLUMN: "H",
};
const handler_config = {
    SHEET_ID: "test",
    SCRIPT_ID: "test",
    SYNC_SID: "test",
    ARCHIVE_FUNCTION_NAME: "Archive",
    RESET_FUNCTION_NAME: "Reset",
    USE_SERVICE_ACCOUNT: true,
    ACTION_LOG_SHEET: "Bot_Usage",
    CHECKIN_VALUES: [
        new checkin_values_1.CheckinValue("day", "All Day", "all day/DAY", ["checkin-day"]),
        new checkin_values_1.CheckinValue("am", "Half AM", "morning/AM", ["checkin-am"]),
        new checkin_values_1.CheckinValue("pm", "Half PM", "afternoon/PM", ["checkin-pm"]),
        new checkin_values_1.CheckinValue("out", "Checked Out", "check out/OUT", ["checkout", "check-out"]),
    ],
};
exports.handler_config = handler_config;
const CONFIG = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, handler_config), find_patroller_config), login_sheet_config), comp_passes_config), manager_passes_config), season_sheet_config), user_creds_config);
exports.CONFIG = CONFIG;


/***/ }),

/***/ "./src/handlers/bvnsp_checkin_handler.ts":
/*!***********************************************!*\
  !*** ./src/handlers/bvnsp_checkin_handler.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NEXT_STEPS = void 0;
__webpack_require__(/*! @twilio-labs/serverless-runtime-types */ "@twilio-labs/serverless-runtime-types");
const googleapis_1 = __webpack_require__(/*! googleapis */ "googleapis");
const handler_config_1 = __webpack_require__(/*! ../env/handler_config */ "./src/env/handler_config.ts");
const login_sheet_1 = __importDefault(__webpack_require__(/*! ../sheets/login_sheet */ "./src/sheets/login_sheet.ts"));
const season_sheet_1 = __importDefault(__webpack_require__(/*! ../sheets/season_sheet */ "./src/sheets/season_sheet.ts"));
const user_creds_1 = __webpack_require__(/*! ../user-creds */ "./src/user-creds.ts");
const checkin_values_1 = __webpack_require__(/*! ../utils/checkin_values */ "./src/utils/checkin_values.ts");
const file_utils_1 = __webpack_require__(/*! ../utils/file_utils */ "./src/utils/file_utils.ts");
const util_1 = __webpack_require__(/*! ../utils/util */ "./src/utils/util.ts");
const comp_passes_1 = __webpack_require__(/*! ../utils/comp_passes */ "./src/utils/comp_passes.ts");
const comp_pass_sheet_1 = __webpack_require__(/*! ../sheets/comp_pass_sheet */ "./src/sheets/comp_pass_sheet.ts");
exports.NEXT_STEPS = {
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
class BVNSPCheckinHandler {
    /**
     * Constructs a new BVNSPCheckinHandler.
     * @param {Context<HandlerEnvironment>} context - The serverless function context.
     * @param {ServerlessEventObject<HandlerEvent>} event - The event object.
     */
    constructor(context, event) {
        var _a, _b;
        this.SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
        this.result_messages = [];
        this.checkin_mode = null;
        this.fast_checkin = false;
        this.twilio_client = null;
        // Cache clients
        this.sync_client = null;
        this.user_creds = null;
        this.service_creds = null;
        this.sheets_service = null;
        this.user_scripts_service = null;
        this.login_sheet = null;
        this.season_sheet = null;
        this.comp_pass_sheet = null;
        this.manager_pass_sheet = null;
        // Determine message details from the incoming event, with fallback values
        this.sms_request = (event.From || event.number) !== undefined;
        this.from = event.From || event.number || event.test_number;
        this.to = (0, util_1.sanitize_phone_number)(event.To);
        this.body = (_b = (_a = event.Body) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === null || _b === void 0 ? void 0 : _b.trim().replace(/\s+/, "-");
        this.bvnsp_checkin_next_step =
            event.request.cookies.bvnsp_checkin_next_step;
        this.combined_config = Object.assign(Object.assign({}, handler_config_1.CONFIG), context);
        this.config = this.combined_config;
        try {
            this.twilio_client = context.getTwilioClient();
        }
        catch (e) {
            console.log("Error initializing twilio_client", e);
        }
        this.sync_sid = context.SYNC_SID;
        this.reset_script_id = context.SCRIPT_ID;
        this.patroller = null;
        this.checkin_values = new checkin_values_1.CheckinValues(handler_config_1.handler_config.CHECKIN_VALUES);
        this.current_sheet_date = new Date();
    }
    /**
     * Parses the fast check-in mode from the message body.
     * @param {string} body - The message body.
     * @returns {boolean} True if fast check-in mode is parsed, otherwise false.
     */
    parse_fast_checkin_mode(body) {
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
    parse_checkin(body) {
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
        var _a;
        const last_segment = (_a = this.bvnsp_checkin_next_step) === null || _a === void 0 ? void 0 : _a.split("-").slice(-1)[0];
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
        var _a;
        const last_segment = (_a = this.bvnsp_checkin_next_step) === null || _a === void 0 ? void 0 : _a.split("-").slice(-2).join("-");
        return last_segment;
    }
    /**
     * Delays the execution for a specified number of seconds.
     * @param {number} seconds - The number of seconds to delay.
     * @param {boolean} [optional=false] - Whether the delay is optional.
     * @returns {Promise<void>} A promise that resolves after the delay.
     */
    delay(seconds, optional = false) {
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
    send_message(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.sms_request) {
                yield this.get_twilio_client().messages.create({
                    to: this.from,
                    from: this.to,
                    body: message,
                });
            }
            else {
                this.result_messages.push(message);
            }
        });
    }
    /**
     * Handles the check-in process.
     * @returns {Promise<BVNSPCheckinResponse>} A promise that resolves with the check-in response.
     */
    handle() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._handle();
            if (!this.sms_request) {
                if (result === null || result === void 0 ? void 0 : result.response) {
                    this.result_messages.push(result.response);
                }
                return {
                    response: this.result_messages.join("\n###\n"),
                    next_step: result === null || result === void 0 ? void 0 : result.next_step,
                };
            }
            return result;
        });
    }
    /**
     * Internal method to handle the check-in process.
     * @returns {Promise<BVNSPCheckinResponse>} A promise that resolves with the check-in response.
     */
    _handle() {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Received request from ${this.from} with body: ${this.body} and state ${this.bvnsp_checkin_next_step}`);
            if (this.body == "logout") {
                console.log(`Performing logout`);
                return yield this.logout();
            }
            let response;
            if (!this.config.USE_SERVICE_ACCOUNT) {
                response = yield this.check_user_creds();
                if (response)
                    return response;
            }
            if (this.body == "restart") {
                return { response: "Okay. Text me again to start over..." };
            }
            response = yield this.get_mapped_patroller();
            if (response || this.patroller == null) {
                return (response || {
                    response: "Unexpected error looking up patroller mapping",
                });
            }
            if ((!this.bvnsp_checkin_next_step ||
                this.bvnsp_checkin_next_step == exports.NEXT_STEPS.AWAIT_COMMAND) &&
                this.body) {
                const await_response = yield this.handle_await_command();
                if (await_response) {
                    return await_response;
                }
            }
            else if (this.bvnsp_checkin_next_step == exports.NEXT_STEPS.AWAIT_CHECKIN &&
                this.body) {
                if (this.parse_checkin(this.body)) {
                    return yield this.checkin();
                }
            }
            else if (((_a = this.bvnsp_checkin_next_step) === null || _a === void 0 ? void 0 : _a.startsWith(exports.NEXT_STEPS.CONFIRM_RESET)) &&
                this.body) {
                if (this.body == "yes" && this.parse_checkin_from_next_step()) {
                    console.log(`Performing reset_sheet_flow for ${this.patroller.name} with checkin mode: ${this.checkin_mode}`);
                    return ((yield this.reset_sheet_flow()) || (yield this.checkin()));
                }
            }
            else if ((_b = this.bvnsp_checkin_next_step) === null || _b === void 0 ? void 0 : _b.startsWith(exports.NEXT_STEPS.AUTH_RESET)) {
                if (this.parse_checkin_from_next_step()) {
                    console.log(`Performing reset_sheet_flow-post-auth for ${this.patroller.name} with checkin mode: ${this.checkin_mode}`);
                    return ((yield this.reset_sheet_flow()) || (yield this.checkin()));
                }
            }
            else if (((_c = this.bvnsp_checkin_next_step) === null || _c === void 0 ? void 0 : _c.startsWith(exports.NEXT_STEPS.AWAIT_PASS)) &&
                this.body) {
                const type = this.parse_pass_from_next_step();
                const guest_name = this.body;
                if (guest_name.trim() !== "" &&
                    [comp_passes_1.CompPassType.CompPass, comp_passes_1.CompPassType.ManagerPass].includes(type)) {
                    return yield this.prompt_comp_manager_pass(type, guest_name);
                }
            }
            if (this.bvnsp_checkin_next_step) {
                yield this.send_message("Sorry, I didn't understand that.");
            }
            return this.prompt_command();
        });
    }
    /**
     * Handles the await command step.
     * @returns {Promise<BVNSPCheckinResponse | undefined>} A promise that resolves with the response or undefined.
     */
    handle_await_command() {
        return __awaiter(this, void 0, void 0, function* () {
            const patroller_name = this.patroller.name;
            if (this.parse_fast_checkin_mode(this.body)) {
                console.log(`Performing fast checkin for ${patroller_name} with mode: ${this.checkin_mode}`);
                return yield this.checkin();
            }
            if (COMMANDS.ON_DUTY.includes(this.body)) {
                console.log(`Performing get_on_duty for ${patroller_name}`);
                return { response: yield this.get_on_duty() };
            }
            console.log("Checking for status...");
            if (COMMANDS.STATUS.includes(this.body)) {
                console.log(`Performing get_status for ${patroller_name}`);
                return this.get_status();
            }
            if (COMMANDS.CHECKIN.includes(this.body)) {
                console.log(`Performing prompt_checkin for ${patroller_name}`);
                return this.prompt_checkin();
            }
            if (COMMANDS.COMP_PASS.includes(this.body)) {
                console.log(`Performing comp_pass for ${patroller_name}`);
                return yield this.prompt_comp_manager_pass(comp_passes_1.CompPassType.CompPass, null);
            }
            if (COMMANDS.MANAGER_PASS.includes(this.body)) {
                console.log(`Performing manager_pass for ${patroller_name}`);
                return yield this.prompt_comp_manager_pass(comp_passes_1.CompPassType.ManagerPass, null);
            }
            if (COMMANDS.WHATSAPP.includes(this.body)) {
                return {
                    response: `I'm available on whatsapp as well! Whatsapp uses Wifi/Cell Data instead of SMS, and can be more reliable. Message me at https://wa.me/1${this.to}`,
                };
            }
        });
    }
    /**
     * Prompts the user for a command.
     * @returns {BVNSPCheckinResponse} The response prompting the user for a command.
     */
    prompt_command() {
        return {
            response: `${this.patroller.name}, I'm BVNSP Bot. 
Enter a command:
Check in / Check out / Status / On Duty / Comp Pass / Manager Pass / Whatsapp
Send 'restart' at any time to begin again`,
            next_step: exports.NEXT_STEPS.AWAIT_COMMAND,
        };
    }
    /**
     * Prompts the user for a check-in.
     * @returns {BVNSPCheckinResponse} The response prompting the user for a check-in.
     */
    prompt_checkin() {
        const types = Object.values(this.checkin_values.by_key).map((x) => x.sms_desc);
        return {
            response: `${this.patroller.name}, update patrolling status to: ${types
                .slice(0, -1)
                .join(", ")}, or ${types.slice(-1)}?`,
            next_step: exports.NEXT_STEPS.AWAIT_CHECKIN,
        };
    }
    /**
     * Prompts the user for a comp or manager pass.
     * @param {CompPassType} pass_type - The type of pass.
     * @param {number | null} passes_to_use - The number of passes to use.
     * @returns {Promise<BVNSPCheckinResponse>} A promise that resolves with the response.
     */
    prompt_comp_manager_pass(pass_type, guest_name) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.patroller.category == "C") {
                return {
                    response: `${this.patroller.name}, candidates do not receive comp or manager passes.`,
                };
            }
            const sheet = yield (pass_type == comp_passes_1.CompPassType.CompPass
                ? this.get_comp_pass_sheet()
                : this.get_manager_pass_sheet());
            const used_and_available = yield sheet.get_available_and_used_passes((_a = this.patroller) === null || _a === void 0 ? void 0 : _a.name);
            if (used_and_available == null) {
                return {
                    response: "Problem looking up patroller for comp passes",
                };
            }
            if (guest_name == null) {
                return used_and_available.get_prompt();
            }
            else {
                yield this.log_action(`use_${pass_type}`);
                yield sheet.set_used_comp_passes(used_and_available, guest_name);
                return {
                    response: `Updated ${this.patroller.name} to use ${(0, comp_passes_1.get_comp_pass_description)(pass_type)} for guest ${guest_name} today.`,
                };
            }
        });
    }
    /**
     * Gets the status of the patroller.
     * @returns {Promise<BVNSPCheckinResponse>} A promise that resolves with the status response.
     */
    get_status() {
        return __awaiter(this, void 0, void 0, function* () {
            const login_sheet = yield this.get_login_sheet();
            const sheet_date = login_sheet.sheet_date.toDateString();
            const current_date = login_sheet.current_date.toDateString();
            if (!login_sheet.is_current) {
                console.log(`sheet_date: ${login_sheet.sheet_date}`);
                console.log(`current_date: ${login_sheet.current_date}`);
                return {
                    response: `Sheet is not current for today (last reset: ${sheet_date}). ${this.patroller.name} is not checked in for ${current_date}.`,
                };
            }
            const response = { response: yield this.get_status_string() };
            yield this.log_action("status");
            return response;
        });
    }
    /**
     * Gets the status string of the patroller.
     * @returns {Promise<string>} A promise that resolves with the status string.
     */
    get_status_string() {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            const login_sheet = yield this.get_login_sheet();
            const comp_pass_promise = (yield this.get_comp_pass_sheet()).get_available_and_used_passes(this.patroller.name);
            const manager_pass_promise = (yield this.get_manager_pass_sheet()).get_available_and_used_passes(this.patroller.name);
            const patroller_status = this.patroller;
            const checkinColumnSet = patroller_status.checkin !== undefined &&
                patroller_status.checkin !== null;
            const checkedOut = checkinColumnSet &&
                this.checkin_values.by_sheet_string[patroller_status.checkin].key ==
                    "out";
            let status = patroller_status.checkin || "Not Present";
            if (checkedOut) {
                status = "Checked Out";
            }
            else if (checkinColumnSet) {
                let section = patroller_status.section.toString();
                if (section.length == 1) {
                    section = `Section ${section}`;
                }
                status = `${patroller_status.checkin} (${section})`;
            }
            const completedPatrolDays = yield (yield this.get_season_sheet()).get_patrolled_days(this.patroller.name);
            const completedPatrolDaysString = completedPatrolDays > 0 ? completedPatrolDays.toString() : "No";
            const loginSheetDate = login_sheet.sheet_date.toDateString();
            let statusString = `Status for ${this.patroller.name} on date ${loginSheetDate}: ${status}.\n${completedPatrolDaysString} completed patrol days prior to today.`;
            const usedTodayCompPasses = (_a = (yield comp_pass_promise)) === null || _a === void 0 ? void 0 : _a.used_today;
            const usedTodayManagerPasses = (_b = (yield manager_pass_promise)) === null || _b === void 0 ? void 0 : _b.used_today;
            const usedSeasonCompPasses = (_c = (yield comp_pass_promise)) === null || _c === void 0 ? void 0 : _c.used_season;
            const usedSeasonManagerPasses = (_d = (yield manager_pass_promise)) === null || _d === void 0 ? void 0 : _d.used_season;
            const availableCompPasses = (_e = (yield comp_pass_promise)) === null || _e === void 0 ? void 0 : _e.available;
            const availableManagerPasses = (_f = (yield manager_pass_promise)) === null || _f === void 0 ? void 0 : _f.available;
            statusString += ` You have used ${usedSeasonCompPasses} comp pass${usedSeasonCompPasses != 1 ? 'es' : ''} this season.`;
            if (usedTodayCompPasses) {
                statusString += ` You are using ${usedTodayCompPasses} comp pass${usedTodayCompPasses != 1 ? 'es' : ''} today.`;
            }
            statusString += ` You have  ${availableCompPasses} comp pass${availableCompPasses != 1 ? 'es' : ''} remaining this season.`;
            statusString += ` You have used ${usedSeasonManagerPasses} manager pass${usedSeasonManagerPasses != 1 ? 'es' : ''} this season.`;
            if (usedTodayManagerPasses) {
                statusString += ` You are using ${usedTodayManagerPasses} manager pass${usedTodayManagerPasses != 1 ? 'es' : ''} today.`;
            }
            statusString += ` You have  ${availableManagerPasses} manager pass${availableManagerPasses != 1 ? 'es' : ''} remaining this season.`;
            return statusString;
        });
    }
    /**
    * Performs the check-in process for the patroller.
    * @returns {Promise<BVNSPCheckinResponse>} A promise that resolves with the check-in response.
    * @throws {Error} Throws an error if the check-in mode is improperly set.
    */
    checkin() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Performing regular checkin for ${this.patroller.name} with mode: ${this.checkin_mode}`);
            if (yield this.sheet_needs_reset()) {
                return {
                    response: `${this.patroller.name}, you are the first person to check in today. ` +
                        `I need to archive and reset the sheet before continuing. ` +
                        `Would you like me to do that? (Yes/No)`,
                    next_step: `${exports.NEXT_STEPS.CONFIRM_RESET}-${this.checkin_mode}`,
                };
            }
            let checkin_mode;
            if (!this.checkin_mode ||
                (checkin_mode = this.checkin_values.by_key[this.checkin_mode]) ===
                    undefined) {
                throw new Error("Checkin mode improperly set");
            }
            const login_sheet = yield this.get_login_sheet();
            const new_checkin_value = checkin_mode.sheets_value;
            yield login_sheet.checkin(this.patroller, new_checkin_value);
            yield this.log_action(`update-status(${new_checkin_value})`);
            yield ((_a = this.login_sheet) === null || _a === void 0 ? void 0 : _a.refresh());
            yield this.get_mapped_patroller(true);
            let response = `Updating ${this.patroller.name} with status: ${new_checkin_value}.`;
            if (!this.fast_checkin) {
                response += ` You can send '${checkin_mode.fast_checkins[0]}' as your first message for a fast ${checkin_mode.sheets_value} checkin next time.`;
            }
            response += "\n\n" + (yield this.get_status_string());
            return { response: response };
        });
    }
    /**
     * Checks if the Google Sheets needs to be reset.
     * @returns {Promise<boolean>} A promise that resolves to true if the sheet needs to be reset, otherwise false.
     */
    sheet_needs_reset() {
        return __awaiter(this, void 0, void 0, function* () {
            const login_sheet = yield this.get_login_sheet();
            const sheet_date = login_sheet.sheet_date;
            const current_date = login_sheet.current_date;
            console.log(`sheet_date: ${sheet_date}`);
            console.log(`current_date: ${current_date}`);
            console.log(`date_is_current: ${login_sheet.is_current}`);
            return !login_sheet.is_current;
        });
    }
    /**
     * Resets the Google Sheets flow, including archiving and resetting the sheet if necessary.
     * @returns {Promise<BVNSPCheckinResponse | void>} A promise that resolves with the check-in response or void.
     */
    reset_sheet_flow() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.check_user_creds(`${this.patroller.name}, in order to reset/archive, I need you to authorize the app.`);
            if (response)
                return {
                    response: response.response,
                    next_step: `${exports.NEXT_STEPS.AUTH_RESET}-${this.checkin_mode}`,
                };
            return yield this.reset_sheet();
        });
    }
    /**
     * Resets the Google Sheets, including archiving and resetting the sheet.
     * @returns {Promise<void>} A promise that resolves when the sheet is reset.
     */
    reset_sheet() {
        return __awaiter(this, void 0, void 0, function* () {
            const script_service = yield this.get_user_scripts_service();
            const should_perform_archive = !(yield this.get_login_sheet()).archived;
            const message = should_perform_archive
                ? "Okay. Archiving and reseting the check in sheet. This takes about 10 seconds..."
                : "Okay. Sheet has already been archived. Performing reset. This takes about 5 seconds...";
            yield this.send_message(message);
            if (should_perform_archive) {
                console.log("Archiving...");
                yield script_service.scripts.run({
                    scriptId: this.reset_script_id,
                    requestBody: { function: this.config.ARCHIVE_FUNCTION_NAME },
                });
                yield this.delay(5);
                yield this.log_action("archive");
                this.login_sheet = null;
            }
            console.log("Resetting...");
            yield script_service.scripts.run({
                scriptId: this.reset_script_id,
                requestBody: { function: this.config.RESET_FUNCTION_NAME },
            });
            yield this.delay(5);
            yield this.log_action("reset");
            yield this.send_message("Done.");
        });
    }
    /**
     * Gets the Google Apps Script service.
     * @returns {Promise<script_v1.Script>} A promise that resolves with the Google Apps Script service.
     */
    check_user_creds(prompt_message = "Hi, before you can use BVNSP bot, you must login.") {
        return __awaiter(this, void 0, void 0, function* () {
            const user_creds = this.get_user_creds();
            if (!(yield user_creds.loadToken())) {
                const authUrl = yield user_creds.getAuthUrl();
                return {
                    response: `${prompt_message} Please follow this link:
${authUrl}

Message me again when done.`,
                };
            }
        });
    }
    /**
     * Gets the Google Apps Script service.
     * @returns {Promise<script_v1.Script>} A promise that resolves with the Google Apps Script service.
     */
    get_on_duty() {
        return __awaiter(this, void 0, void 0, function* () {
            const checked_out_section = "Checked Out";
            const last_sections = [checked_out_section];
            const login_sheet = yield this.get_login_sheet();
            const on_duty_patrollers = login_sheet.get_on_duty_patrollers();
            const by_section = on_duty_patrollers
                .filter((x) => x.checkin)
                .reduce((prev, cur) => {
                const short_code = this.checkin_values.by_sheet_string[cur.checkin].key;
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
            let results = [];
            let all_keys = Object.keys(by_section);
            const ordered_primary_sections = Object.keys(by_section)
                .filter((x) => !last_sections.includes(x))
                .sort();
            const filtered_last_sections = last_sections.filter((x) => all_keys.includes(x));
            const ordered_sections = ordered_primary_sections.concat(filtered_last_sections);
            for (const section of ordered_sections) {
                let result = [];
                const patrollers = by_section[section].sort((x, y) => x.name.localeCompare(y.name));
                if (section.length === 1) {
                    result.push("Section ");
                }
                result.push(`${section}: `);
                function patroller_string(name, short_code) {
                    let details = "";
                    if (short_code !== "day" && short_code !== "out") {
                        details = ` (${short_code.toUpperCase()})`;
                    }
                    return `${name}${details}`;
                }
                result.push(patrollers
                    .map((x) => patroller_string(x.name, this.checkin_values.by_sheet_string[x.checkin].key))
                    .join(", "));
                results.push(result);
            }
            yield this.log_action("on-duty");
            return `Patrollers for ${login_sheet.sheet_date.toDateString()} (Total: ${on_duty_patrollers.length}):\n${results.map((r) => r.join("")).join("\n")}`;
        });
    }
    /**
     * Logs an action to the Google Sheets.
     * @param {string} action_name - The name of the action to log.
     * @returns {Promise<void>} A promise that resolves when the action is logged.
     */
    log_action(action_name) {
        return __awaiter(this, void 0, void 0, function* () {
            const sheets_service = yield this.get_sheets_service();
            yield sheets_service.spreadsheets.values.append({
                spreadsheetId: this.combined_config.SHEET_ID,
                range: this.config.ACTION_LOG_SHEET,
                valueInputOption: "USER_ENTERED",
                requestBody: {
                    values: [[this.patroller.name, new Date(), action_name]],
                },
            });
        });
    }
    /**
     * Logs out the user.
     * @returns {Promise<BVNSPCheckinResponse>} A promise that resolves with the logout response.
     */
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            const user_creds = this.get_user_creds();
            yield user_creds.deleteToken();
            return {
                response: "Okay, I have removed all login session information.",
            };
        });
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
            this.sync_client = this.get_twilio_client().sync.services(this.sync_sid);
        }
        return this.sync_client;
    }
    /**
    * Gets the user credentials.
    * @returns {UserCreds} The user credentials.
    */
    get_user_creds() {
        if (!this.user_creds) {
            this.user_creds = new user_creds_1.UserCreds(this.get_sync_client(), this.from, this.combined_config);
        }
        return this.user_creds;
    }
    /**
     * Gets the service credentials.
     * @returns {GoogleAuth} The service credentials.
     */
    get_service_creds() {
        if (!this.service_creds) {
            this.service_creds = new googleapis_1.google.auth.GoogleAuth({
                keyFile: (0, file_utils_1.get_service_credentials_path)(),
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
    get_valid_creds(require_user_creds = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.config.USE_SERVICE_ACCOUNT && !require_user_creds) {
                return this.get_service_creds();
            }
            const user_creds = this.get_user_creds();
            if (!(yield user_creds.loadToken())) {
                throw new Error("User is not authed.");
            }
            console.log("Using user account for service auth...");
            return user_creds.oauth2_client;
        });
    }
    /**
     * Gets the Google Sheets service.
     * @returns {Promise<sheets_v4.Sheets>} A promise that resolves with the Google Sheets service.
     */
    get_sheets_service() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.sheets_service) {
                this.sheets_service = googleapis_1.google.sheets({
                    version: "v4",
                    auth: yield this.get_valid_creds(),
                });
            }
            return this.sheets_service;
        });
    }
    /**
     * Gets the login sheet.
    * @returns {Promise<LoginSheet>} A promise that resolves with the login sheet
    */
    get_login_sheet() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.login_sheet) {
                const login_sheet_config = this.combined_config;
                const sheets_service = yield this.get_sheets_service();
                const login_sheet = new login_sheet_1.default(sheets_service, login_sheet_config);
                yield login_sheet.refresh();
                this.login_sheet = login_sheet;
            }
            return this.login_sheet;
        });
    }
    /**
    * Gets the season sheet.
    * @returns {Promise<SeasonSheet>} A promise that resolves with the season sheet
    */
    get_season_sheet() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.season_sheet) {
                const season_sheet_config = this.combined_config;
                const sheets_service = yield this.get_sheets_service();
                const season_sheet = new season_sheet_1.default(sheets_service, season_sheet_config);
                this.season_sheet = season_sheet;
            }
            return this.season_sheet;
        });
    }
    /**
    * Gets the comp pass sheet.
    * @returns {Promise<CompPassSheet>} A promise that resolves with the comp pass sheet
    */
    get_comp_pass_sheet() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.comp_pass_sheet) {
                const config = this.combined_config;
                const sheets_service = yield this.get_sheets_service();
                const season_sheet = new comp_pass_sheet_1.CompPassSheet(sheets_service, config);
                this.comp_pass_sheet = season_sheet;
            }
            return this.comp_pass_sheet;
        });
    }
    /**
     * Gets the manager pass sheet.
    * @returns {Promise<ManagerPassSheet>} A promise that resolves with the manager pass sheet
    */
    get_manager_pass_sheet() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.manager_pass_sheet) {
                const config = this.combined_config;
                const sheets_service = yield this.get_sheets_service();
                const season_sheet = new comp_pass_sheet_1.ManagerPassSheet(sheets_service, config);
                this.manager_pass_sheet = season_sheet;
            }
            return this.manager_pass_sheet;
        });
    }
    /**
     * Gets the Google Apps Script service.
     * @returns {Promise<script_v1.Script>} A promise that resolves with the Google Apps Script service.
     */
    get_user_scripts_service() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.user_scripts_service) {
                this.user_scripts_service = googleapis_1.google.script({
                    version: "v1",
                    auth: yield this.get_valid_creds(true),
                });
            }
            return this.user_scripts_service;
        });
    }
    /**
     * Gets the mapped patroller.
    * @param {boolean} [force=false] - Whether to force the patroller to be found.
    * @returns {Promise<BVNSPCheckinResponse | void>} A promise that resolves with the response or void.
    */
    get_mapped_patroller(force = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const phone_lookup = yield this.find_patroller_from_number();
            if (phone_lookup === undefined || phone_lookup === null) {
                if (force) {
                    throw new Error("Could not find associated user");
                }
                return {
                    response: `Sorry, I couldn't find an associated BVNSP member with your phone number (${this.from})`,
                };
            }
            const login_sheet = yield this.get_login_sheet();
            const mappedPatroller = login_sheet.try_find_patroller(phone_lookup.name);
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
        });
    }
    /**
    * Finds the patroller from the phone number.
    * @returns {Promise<PatrollerRow>} A promise that resolves with the patroller.
    */
    find_patroller_from_number() {
        return __awaiter(this, void 0, void 0, function* () {
            const raw_number = this.from;
            const sheets_service = yield this.get_sheets_service();
            const opts = this.combined_config;
            const number = (0, util_1.sanitize_phone_number)(raw_number);
            const response = yield sheets_service.spreadsheets.values.get({
                spreadsheetId: opts.SHEET_ID,
                range: opts.PHONE_NUMBER_LOOKUP_SHEET,
                valueRenderOption: "UNFORMATTED_VALUE",
            });
            if (!response.data.values) {
                throw new Error("Could not find patroller.");
            }
            const patroller = response.data.values
                .map((row) => {
                const rawNumber = row[(0, util_1.excel_row_to_index)(opts.PHONE_NUMBER_NUMBER_COLUMN)];
                const currentNumber = rawNumber != undefined
                    ? (0, util_1.sanitize_phone_number)(rawNumber)
                    : rawNumber;
                const currentName = row[(0, util_1.excel_row_to_index)(opts.PHONE_NUMBER_NAME_COLUMN)];
                return { name: currentName, number: currentNumber };
            })
                .filter((patroller) => patroller.number === number)[0];
            return patroller;
        });
    }
}
exports["default"] = BVNSPCheckinHandler;


/***/ }),

/***/ "./src/handlers/handler.protected.ts":
/*!*******************************************!*\
  !*** ./src/handlers/handler.protected.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.handler = void 0;
__webpack_require__(/*! @twilio-labs/serverless-runtime-types */ "@twilio-labs/serverless-runtime-types");
const bvnsp_checkin_handler_1 = __importDefault(__webpack_require__(/*! ./bvnsp_checkin_handler */ "./src/handlers/bvnsp_checkin_handler.ts"));
const NEXT_STEP_COOKIE_NAME = "bvnsp_checkin_next_step";
/**
 * Twilio Serverless function handler for BVNSP check-in.
 * @param {Context<HandlerEnvironment>} context - The Twilio serverless context.
 * @param {ServerlessEventObject<HandlerEvent>} event - The event object.
 * @param {ServerlessCallback} callback - The callback function.
 */
const handler = function (context, event, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const handler = new bvnsp_checkin_handler_1.default(context, event);
        let message;
        let next_step = "";
        try {
            const handler_response = yield handler.handle();
            message =
                handler_response.response ||
                    "Unexpected result - no response determined";
            next_step = handler_response.next_step || "";
        }
        catch (e) {
            console.log("An error occured");
            try {
                console.log(JSON.stringify(e));
            }
            catch (_a) {
                console.log(e);
            }
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
            .setCookie(NEXT_STEP_COOKIE_NAME, next_step);
        return callback(null, response);
    });
};
exports.handler = handler;


/***/ }),

/***/ "./src/sheets/comp_pass_sheet.ts":
/*!***************************************!*\
  !*** ./src/sheets/comp_pass_sheet.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ManagerPassSheet = exports.CompPassSheet = exports.PassSheet = exports.UsedAndAvailablePasses = void 0;
const util_1 = __webpack_require__(/*! ../utils/util */ "./src/utils/util.ts");
const google_sheets_spreadsheet_tab_1 = __importDefault(__webpack_require__(/*! ../utils/google_sheets_spreadsheet_tab */ "./src/utils/google_sheets_spreadsheet_tab.ts"));
const datetime_util_1 = __webpack_require__(/*! ../utils/datetime_util */ "./src/utils/datetime_util.ts");
const comp_passes_1 = __webpack_require__(/*! ../utils/comp_passes */ "./src/utils/comp_passes.ts");
class UsedAndAvailablePasses {
    constructor(row, index, available, used_today, used_season, type) {
        this.row = row;
        this.index = index;
        this.available = Number(available);
        this.used_today = Number(used_today);
        this.used_season = Number(used_season);
        this.comp_pass_type = type;
    }
    get_prompt() {
        if (this.available > 0) {
            let response = null;
            if (this.comp_pass_type == comp_passes_1.CompPassType.CompPass) {
                response = `You have up to ${this.available} comp passes you can use today.\n
                    You have used ${this.used_season} comp passes this season.\n
                    You have currently used ${this.used_today} so far today.\n
                    Enter the first and last name of the guest that will use a comp pass today (or  'restart'):`;
            }
            else if (this.comp_pass_type == comp_passes_1.CompPassType.ManagerPass) {
                response = `You have up to  ${this.available} manager passes you can use today.\n
                You have used ${this.used_season} manager passes this season.\n
                You have currently used ${this.used_today} so far today.\n
                Enter the first and last name of the guest that will use a manager pass today (or  'restart'):`;
            }
            if (response != null) {
                return {
                    response: response,
                    next_step: `await-pass-${this.comp_pass_type}`,
                };
            }
        }
        return {
            response: `You do not have any ${(0, comp_passes_1.get_comp_pass_description)(this.comp_pass_type)} available today`,
        };
    }
}
exports.UsedAndAvailablePasses = UsedAndAvailablePasses;
class PassSheet {
    constructor(sheet, type) {
        this.sheet = sheet;
        this.comp_pass_type = type;
    }
    get_available_and_used_passes(patroller_name) {
        return __awaiter(this, void 0, void 0, function* () {
            const patroller_row = yield this.sheet.get_sheet_row_for_patroller(patroller_name, this.name_column);
            if (patroller_row == null) {
                return null;
            }
            const current_day_available_passes = patroller_row.row[(0, util_1.excel_row_to_index)(this.available_column)];
            const current_day_used_passes = patroller_row.row[(0, util_1.excel_row_to_index)(this.used_today_column)];
            const current_season_used_passes = patroller_row.row[(0, util_1.excel_row_to_index)(this.used_season_column)];
            return new UsedAndAvailablePasses(patroller_row.row, patroller_row.index, current_day_available_passes, current_day_used_passes, current_season_used_passes, this.comp_pass_type);
        });
    }
    set_used_comp_passes(patroller_row, guest_name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (patroller_row.available < 1) {
                throw new Error(`Not enough available passes: Available: ${patroller_row.available}, Used this season:  ${patroller_row.used_season}, Used today: ${patroller_row.used_today}`);
            }
            const rownum = patroller_row.index;
            const start_index = this.start_index;
            const prior_length = patroller_row.row.length - start_index;
            const current_date_string = (0, datetime_util_1.format_date_for_spreadsheet_value)(new Date());
            let new_vals = patroller_row.row
                .slice(start_index)
                .map((x) => x === null || x === void 0 ? void 0 : x.toString());
            // Add the current date appended with the new guest name
            new_vals.push(current_date_string + guest_name);
            const update_length = Math.max(prior_length, new_vals.length);
            while (new_vals.length < update_length) {
                new_vals.push("");
            }
            const end_index = start_index + update_length - 1;
            const range = `${this.sheet.sheet_name}!${(0, util_1.row_col_to_excel_index)(rownum, start_index)}:${(0, util_1.row_col_to_excel_index)(rownum, end_index)}`;
            console.log(`Updating ${range} with ${new_vals.length} values`);
            yield this.sheet.update_values(range, [new_vals]);
        });
    }
}
exports.PassSheet = PassSheet;
class CompPassSheet extends PassSheet {
    constructor(sheets_service, config) {
        super(new google_sheets_spreadsheet_tab_1.default(sheets_service, config.SHEET_ID, config.COMP_PASS_SHEET), comp_passes_1.CompPassType.CompPass);
        this.config = config;
    }
    get start_index() {
        return (0, util_1.excel_row_to_index)(this.config.COMP_PASS_SHEET_DATES_STARTING_COLUMN);
    }
    get sheet_name() {
        return this.config.COMP_PASS_SHEET;
    }
    get available_column() {
        return this.config.COMP_PASS_SHEET_DATES_AVAILABLE_COLUMN;
    }
    get used_today_column() {
        return this.config.COMP_PASS_SHEET_USED_TODAY_COLUMN;
    }
    get used_season_column() {
        return this.config.COMP_PASS_SHEET_USED_SEASON_COLUMN;
    }
    get name_column() {
        return this.config.COMP_PASS_SHEET_NAME_COLUMN;
    }
}
exports.CompPassSheet = CompPassSheet;
class ManagerPassSheet extends PassSheet {
    constructor(sheets_service, config) {
        super(new google_sheets_spreadsheet_tab_1.default(sheets_service, config.SHEET_ID, config.MANAGER_PASS_SHEET), comp_passes_1.CompPassType.ManagerPass);
        this.config = config;
    }
    get start_index() {
        return (0, util_1.excel_row_to_index)(this.config.MANAGER_PASS_SHEET_DATES_STARTING_COLUMN);
    }
    get sheet_name() {
        return this.config.MANAGER_PASS_SHEET;
    }
    get available_column() {
        return this.config.MANAGER_PASS_SHEET_AVAILABLE_COLUMN;
    }
    get used_today_column() {
        return this.config.MANAGER_PASS_SHEET_USED_TODAY_COLUMN;
    }
    get used_season_column() {
        return this.config.MANAGER_PASS_SHEET_USED_SEASON_COLUMN;
    }
    get name_column() {
        return this.config.MANAGER_PASS_SHEET_NAME_COLUMN;
    }
}
exports.ManagerPassSheet = ManagerPassSheet;


/***/ }),

/***/ "./src/sheets/login_sheet.ts":
/*!***********************************!*\
  !*** ./src/sheets/login_sheet.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const util_1 = __webpack_require__(/*! ../utils/util */ "./src/utils/util.ts");
const google_sheets_spreadsheet_tab_1 = __importDefault(__webpack_require__(/*! ../utils/google_sheets_spreadsheet_tab */ "./src/utils/google_sheets_spreadsheet_tab.ts"));
const datetime_util_1 = __webpack_require__(/*! ../utils/datetime_util */ "./src/utils/datetime_util.ts");
/**
 * Class representing a login sheet in Google Sheets.
 */
class LoginSheet {
    /**
     * Creates an instance of LoginSheet.
     * @param {sheets_v4.Sheets | null} sheets_service - The Google Sheets API service.
     * @param {LoginSheetConfig} config - The configuration for the login sheet.
     */
    constructor(sheets_service, config) {
        this.rows = null;
        this.checkin_count = undefined;
        this.patrollers = [];
        this.login_sheet = new google_sheets_spreadsheet_tab_1.default(sheets_service, config.SHEET_ID, config.LOGIN_SHEET_LOOKUP);
        this.checkin_count_sheet = new google_sheets_spreadsheet_tab_1.default(sheets_service, config.SHEET_ID, config.CHECKIN_COUNT_LOOKUP);
        this.config = config;
    }
    /**
     * Refreshes the data from the Google Sheets.
     * @returns {Promise<void>}
     */
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            this.rows = yield this.login_sheet.get_values(this.config.LOGIN_SHEET_LOOKUP);
            this.checkin_count = (yield this.checkin_count_sheet.get_values(this.config.CHECKIN_COUNT_LOOKUP))[0][0];
            this.patrollers = this.rows.map((x, i) => this.parse_patroller_row(i, x, this.config)).filter((x) => x != null);
            //console.log("Refreshing Patrollers: " );
            //console.log(this.patrollers);
        });
    }
    /**
     * Gets the archived status of the login sheet.
     * @returns {boolean} True if the sheet is archived, otherwise false.
     */
    get archived() {
        const archived = (0, util_1.lookup_row_col_in_sheet)(this.config.ARCHIVED_CELL, this.rows);
        return ((archived === undefined && this.checkin_count === 0) ||
            archived.toLowerCase() === "yes");
    }
    /**
     * Gets the date of the sheet.
     * @returns {Date} The date of the sheet.
     */
    get sheet_date() {
        return (0, datetime_util_1.sanitize_date)((0, util_1.lookup_row_col_in_sheet)(this.config.SHEET_DATE_CELL, this.rows));
    }
    /**
     * Gets the current date.
     * @returns {Date} The current date.
     */
    get current_date() {
        return (0, datetime_util_1.sanitize_date)((0, util_1.lookup_row_col_in_sheet)(this.config.CURRENT_DATE_CELL, this.rows));
    }
    /**
     * Checks if the sheet date is the current date.
     * @returns {boolean} True if the sheet date is the current date, otherwise false.
     */
    get is_current() {
        return this.sheet_date.getTime() === this.current_date.getTime();
    }
    /**
     * Tries to find a patroller by name.
     * @param {string} name - The name of the patroller.
     * @returns {PatrollerRow | "not_found"} The patroller row or "not_found".
     */
    try_find_patroller(name) {
        const patrollers = this.patrollers.filter((x) => x.name === name);
        if (patrollers.length !== 1) {
            return "not_found";
        }
        return patrollers[0];
    }
    /**
     * Finds a patroller by name.
     * @param {string} name - The name of the patroller.
     * @returns {PatrollerRow} The patroller row.
     * @throws {Error} If the patroller is not found.
     */
    find_patroller(name) {
        const result = this.try_find_patroller(name);
        if (result === "not_found") {
            throw new Error(`Could not find ${name} in login sheet`);
        }
        return result;
    }
    /**
     * Gets the patrollers who are on duty.
     * @returns {PatrollerRow[]} The list of on-duty patrollers.
     * @throws {Error} If the login sheet is not current.
     */
    get_on_duty_patrollers() {
        if (!this.is_current) {
            throw new Error("Login sheet is not current");
        }
        return this.patrollers.filter((x) => x.checkin);
    }
    /**
     * Checks in a patroller with a new check-in value.
     * @param {PatrollerRow} patroller_status - The status of the patroller.
     * @param {string} new_checkin_value - The new check-in value.
     * @returns {Promise<void>}
     * @throws {Error} If the login sheet is not current.
     */
    checkin(patroller_status, new_checkin_value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.is_current) {
                throw new Error("Login sheet is not current");
            }
            console.log(`Existing status: ${JSON.stringify(patroller_status)}`);
            const row = patroller_status.index + 1; // programming -> excel lookup
            const range = `${this.config.CHECKIN_DROPDOWN_COLUMN}${row}`;
            yield this.login_sheet.update_values(range, [[new_checkin_value]]);
        });
    }
    /**
     * Parses a row of patroller data.
     * @param {number} index - The index of the row.
     * @param {string[]} row - The row data.
     * @param {PatrollerRowConfig} opts - The configuration options for the patroller row.
     * @returns {PatrollerRow | null} The parsed patroller row or null if invalid.
     */
    parse_patroller_row(index, row, opts) {
        if (row.length < 4) {
            return null;
        }
        if (index < 3) {
            return null;
        }
        return {
            index: index,
            name: row[(0, util_1.excel_row_to_index)(opts.NAME_COLUMN)],
            category: row[(0, util_1.excel_row_to_index)(opts.CATEGORY_COLUMN)],
            section: row[(0, util_1.excel_row_to_index)(opts.SECTION_DROPDOWN_COLUMN)],
            checkin: row[(0, util_1.excel_row_to_index)(opts.CHECKIN_DROPDOWN_COLUMN)],
        };
    }
}
exports["default"] = LoginSheet;


/***/ }),

/***/ "./src/sheets/season_sheet.ts":
/*!************************************!*\
  !*** ./src/sheets/season_sheet.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const util_1 = __webpack_require__(/*! ../utils/util */ "./src/utils/util.ts");
const google_sheets_spreadsheet_tab_1 = __importDefault(__webpack_require__(/*! ../utils/google_sheets_spreadsheet_tab */ "./src/utils/google_sheets_spreadsheet_tab.ts"));
const datetime_util_1 = __webpack_require__(/*! ../utils/datetime_util */ "./src/utils/datetime_util.ts");
/**
 * Class representing a season sheet in Google Sheets.
 */
class SeasonSheet {
    /**
     * Creates an instance of SeasonSheet.
     * @param {sheets_v4.Sheets | null} sheets_service - The Google Sheets API service.
     * @param {SeasonSheetConfig} config - The configuration for the season sheet.
     */
    constructor(sheets_service, config) {
        this.sheet = new google_sheets_spreadsheet_tab_1.default(sheets_service, config.SHEET_ID, config.SEASON_SHEET);
        this.config = config;
    }
    /**
     * Gets the number of days patrolled by a patroller.
     * @param {string} patroller_name - The name of the patroller.
     * @returns {Promise<number>} The number of days patrolled.
     */
    get_patrolled_days(patroller_name) {
        return __awaiter(this, void 0, void 0, function* () {
            const patroller_row = yield this.sheet.get_sheet_row_for_patroller(patroller_name, this.config.SEASON_SHEET_NAME_COLUMN);
            if (!patroller_row) {
                return -1;
            }
            const currentNumber = patroller_row.row[(0, util_1.excel_row_to_index)(this.config.SEASON_SHEET_DAYS_COLUMN)];
            const currentDay = (0, datetime_util_1.filter_list_to_endswith_current_day)(patroller_row.row)
                .map((x) => ((x === null || x === void 0 ? void 0 : x.startsWith("H")) ? 0.5 : 1))
                .reduce((x, y, i) => x + y, 0);
            const daysBeforeToday = currentNumber - currentDay;
            return daysBeforeToday;
        });
    }
}
exports["default"] = SeasonSheet;


/***/ }),

/***/ "./src/user-creds.ts":
/*!***************************!*\
  !*** ./src/user-creds.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserCredsScopes = exports.UserCreds = void 0;
const googleapis_1 = __webpack_require__(/*! googleapis */ "googleapis");
const util_1 = __webpack_require__(/*! ./utils/util */ "./src/utils/util.ts");
const file_utils_1 = __webpack_require__(/*! ./utils/file_utils */ "./src/utils/file_utils.ts");
const scope_util_1 = __webpack_require__(/*! ./utils/scope_util */ "./src/utils/scope_util.ts");
const SCOPES = [
    "https://www.googleapis.com/auth/script.projects",
    "https://www.googleapis.com/auth/spreadsheets",
];
exports.UserCredsScopes = SCOPES;
/**
 * Class representing user credentials for Google OAuth2.
 */
class UserCreds {
    /**
     * Create a UserCreds instance.
     * @param {ServiceContext} sync_client - The Twilio Sync client.
     * @param {string | undefined} number - The user's phone number.
     * @param {UserCredsConfig} opts - The user credentials configuration.
     * @throws {Error} Throws an error if the number is undefined or null.
     */
    constructor(sync_client, number, opts) {
        this.loaded = false;
        if (number === undefined || number === null) {
            throw new Error("Number is undefined");
        }
        this.number = (0, util_1.sanitize_phone_number)(number);
        const credentials = (0, file_utils_1.load_credentials_files)();
        const { client_secret, client_id, redirect_uris } = credentials.web;
        this.oauth2_client = new googleapis_1.google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
        this.sync_client = sync_client;
        let domain = opts.NSP_EMAIL_DOMAIN;
        if (domain === undefined || domain === null || domain === "") {
            domain = undefined;
        }
        else {
            this.domain = domain;
        }
    }
    /**
     * Load the OAuth2 token.
     * @returns {Promise<boolean>} A promise that resolves to a boolean indicating if the token was loaded.
     */
    loadToken() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.loaded) {
                try {
                    console.log(`Looking for ${this.token_key}`);
                    const oauth2Doc = yield this.sync_client
                        .documents(this.token_key)
                        .fetch();
                    if (oauth2Doc === undefined ||
                        oauth2Doc.data == undefined ||
                        oauth2Doc.data.token === undefined) {
                        console.log(`Didn't find ${this.token_key}`);
                    }
                    else {
                        const token = oauth2Doc.data.token;
                        (0, scope_util_1.validate_scopes)(oauth2Doc.data.scopes, SCOPES);
                        this.oauth2_client.setCredentials(token);
                        console.log(`Loaded token ${this.token_key}`);
                        this.loaded = true;
                    }
                }
                catch (e) {
                    console.log(`Failed to load token for ${this.token_key}.\n ${e}`);
                }
            }
            return this.loaded;
        });
    }
    /**
     * Get the token key.
     * @returns {string} The token key.
     */
    get token_key() {
        return `oauth2_${this.number}`;
    }
    /**
     * Delete the OAuth2 token.
     * @returns {Promise<boolean>} A promise that resolves to a boolean indicating if the token was deleted.
     */
    deleteToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const oauth2Doc = yield this.sync_client
                .documents(this.token_key)
                .fetch();
            if (oauth2Doc === undefined ||
                oauth2Doc.data == undefined ||
                oauth2Doc.data.token === undefined) {
                console.log(`Didn't find ${this.token_key}`);
                return false;
            }
            yield this.sync_client.documents(oauth2Doc.sid).remove();
            console.log(`Deleted token ${this.token_key}`);
            return true;
        });
    }
    /**
     * Complete the login process by exchanging the authorization code for a token.
     * @param {string} code - The authorization code.
     * @param {string[]} scopes - The scopes to validate.
     * @returns {Promise<void>} A promise that resolves when the login process is complete.
     */
    completeLogin(code, scopes) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, scope_util_1.validate_scopes)(scopes, SCOPES);
            const token = yield this.oauth2_client.getToken(code);
            console.log(JSON.stringify(Object.keys(token.res)));
            console.log(JSON.stringify(token.tokens));
            this.oauth2_client.setCredentials(token.tokens);
            try {
                const oauthDoc = yield this.sync_client.documents.create({
                    data: { token: token.tokens, scopes: scopes },
                    uniqueName: this.token_key,
                });
            }
            catch (e) {
                console.log(`Exception when creating oauth. Trying to update instead...\n${e}`);
                const oauthDoc = yield this.sync_client
                    .documents(this.token_key)
                    .update({
                    data: { token: token, scopes: scopes },
                });
            }
        });
    }
    /**
     * Get the authorization URL.
     * @returns {Promise<string>} A promise that resolves to the authorization URL.
     */
    getAuthUrl() {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.generateRandomString();
            console.log(`Using nonce ${id} for ${this.number}`);
            const doc = yield this.sync_client.documents.create({
                data: { number: this.number, scopes: SCOPES },
                uniqueName: id,
                ttl: 60 * 5, // 5 minutes
            });
            console.log(`Made nonce-doc: ${JSON.stringify(doc)}`);
            const opts = {
                access_type: "offline",
                scope: SCOPES,
                state: id,
            };
            if (this.domain) {
                opts["hd"] = this.domain;
            }
            const authUrl = this.oauth2_client.generateAuthUrl(opts);
            return authUrl;
        });
    }
    /**
     * Generate a random string.
     * @returns {string} A random string.
     */
    generateRandomString() {
        const length = 30;
        let result = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}
exports["default"] = UserCreds;
exports.UserCreds = UserCreds;


/***/ }),

/***/ "./src/utils/checkin_values.ts":
/*!*************************************!*\
  !*** ./src/utils/checkin_values.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CheckinValues = exports.CheckinValue = void 0;
/**
 * Represents a check-in value with various properties and lookup values.
 */
class CheckinValue {
    /**
     * Creates an instance of CheckinValue.
     * @param {string} key - The key for the check-in value.
     * @param {string} sheets_value - The value used in sheets.
     * @param {string} sms_desc - The description used in SMS.
     * @param {string | string[]} fast_checkins - The fast check-in values.
     */
    constructor(key, sheets_value, sms_desc, fast_checkins) {
        if (!(fast_checkins instanceof Array)) {
            fast_checkins = [fast_checkins];
        }
        this.key = key;
        this.sheets_value = sheets_value;
        this.sms_desc = sms_desc;
        this.fast_checkins = fast_checkins.map((x) => x.trim().toLowerCase());
        const sms_desc_split = sms_desc
            .replace(/\s+/, "-")
            .toLowerCase()
            .split("/");
        const lookup_vals = [...this.fast_checkins, ...sms_desc_split];
        this.lookup_values = new Set(lookup_vals);
    }
}
exports.CheckinValue = CheckinValue;
/**
 * Represents a collection of check-in values with various lookup methods.
 */
class CheckinValues {
    /**
     * Creates an instance of CheckinValues.
     * @param {CheckinValue[]} checkinValues - The array of check-in values.
     */
    constructor(checkinValues) {
        this.by_key = {};
        this.by_lv = {};
        this.by_fc = {};
        this.by_sheet_string = {};
        for (var checkinValue of checkinValues) {
            this.by_key[checkinValue.key] = checkinValue;
            this.by_sheet_string[checkinValue.sheets_value] = checkinValue;
            for (const lv of checkinValue.lookup_values) {
                this.by_lv[lv] = checkinValue;
            }
            for (const fc of checkinValue.fast_checkins) {
                this.by_fc[fc] = checkinValue;
            }
        }
    }
    /**
     * Returns the entries of check-in values by key.
     * @returns {Array} The entries of check-in values.
     */
    entries() {
        return Object.entries(this.by_key);
    }
    /**
     * Parses a fast check-in value from the given body string.
     * @param {string} body - The body string to parse.
     * @returns {CheckinValue | undefined} The parsed check-in value or undefined.
     */
    parse_fast_checkin(body) {
        return this.by_fc[body];
    }
    /**
     * Parses a check-in value from the given body string.
     * @param {string} body - The body string to parse.
     * @returns {CheckinValue | undefined} The parsed check-in value or undefined.
     */
    parse_checkin(body) {
        const checkin_lower = body.replace(/\s+/, "");
        return this.by_lv[checkin_lower];
    }
}
exports.CheckinValues = CheckinValues;


/***/ }),

/***/ "./src/utils/comp_passes.ts":
/*!**********************************!*\
  !*** ./src/utils/comp_passes.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.get_comp_pass_description = exports.CompPassType = void 0;
/**
 * Enum for different types of comp passes.
 * @enum {string}
 */
var CompPassType;
(function (CompPassType) {
    CompPassType["CompPass"] = "comp-pass";
    CompPassType["ManagerPass"] = "manager-pass";
})(CompPassType || (exports.CompPassType = CompPassType = {}));
/**
 * Get the description for a given comp pass type.
 * @param {CompPassType} type - The type of the comp pass.
 * @returns {string} The description of the comp pass type.
 */
function get_comp_pass_description(type) {
    switch (type) {
        case CompPassType.CompPass:
            return "Comp Pass";
        case CompPassType.ManagerPass:
            return "Manager Pass";
    }
    return "";
}
exports.get_comp_pass_description = get_comp_pass_description;


/***/ }),

/***/ "./src/utils/datetime_util.ts":
/*!************************************!*\
  !*** ./src/utils/datetime_util.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.filter_list_to_endswith_current_day = exports.filter_list_to_endswith_date = exports.format_date_for_spreadsheet_value = exports.strip_datetime_to_date = exports.change_timezone_to_pst = exports.excel_date_to_js_date = exports.sanitize_date = void 0;
/**
 * Convert an Excel date to a JavaScript Date object.
 * @param {number} date - The Excel date.
 * @returns {Date} The JavaScript Date object.
 */
function excel_date_to_js_date(date) {
    const result = new Date(0);
    result.setUTCMilliseconds(Math.round((date - 25569) * 86400 * 1000));
    return result;
}
exports.excel_date_to_js_date = excel_date_to_js_date;
/**
 * Change the timezone of a Date object to PST.
 * @param {Date} date - The Date object.
 * @returns {Date} The Date object with the timezone set to PST.
 */
function change_timezone_to_pst(date) {
    const result = new Date(date.toUTCString().replace(" GMT", " PST"));
    return result;
}
exports.change_timezone_to_pst = change_timezone_to_pst;
/**
 * Strip the time from a Date object, keeping only the date.
 * @param {Date} date - The Date object.
 * @returns {Date} The Date object with the time stripped.
 */
function strip_datetime_to_date(date) {
    const result = new Date(date.toLocaleDateString("en-US", { timeZone: "America/Los_Angeles" }));
    return result;
}
exports.strip_datetime_to_date = strip_datetime_to_date;
/**
 * Sanitize a date by converting it from an Excel date and stripping the time.
 * @param {number} date - The Excel date.
 * @returns {Date} The sanitized Date object.
 */
function sanitize_date(date) {
    const result = strip_datetime_to_date(change_timezone_to_pst(excel_date_to_js_date(date)));
    return result;
}
exports.sanitize_date = sanitize_date;
/**
 * Format a Date object for use in a spreadsheet value.
 * @param {Date} date - The Date object.
 * @returns {string} The formatted date string.
 */
function format_date_for_spreadsheet_value(date) {
    const datestr = date
        .toLocaleDateString()
        .split("/")
        .map((x) => x.padStart(2, "0"))
        .join("");
    return datestr;
}
exports.format_date_for_spreadsheet_value = format_date_for_spreadsheet_value;
/**
 * Filter a list to include only items that end with a specific date.
 * @param {any[]} list - The list to filter.
 * @param {Date} date - The date to filter by.
 * @returns {any[]} The filtered list.
 */
function filter_list_to_endswith_date(list, date) {
    const datestr = format_date_for_spreadsheet_value(date);
    return list.map((x) => x === null || x === void 0 ? void 0 : x.toString()).filter((x) => x === null || x === void 0 ? void 0 : x.endsWith(datestr));
}
exports.filter_list_to_endswith_date = filter_list_to_endswith_date;
/**
 * Filter a list to include only items that end with the current date.
 * @param {any[]} list - The list to filter.
 * @returns {any[]} The filtered list.
 */
function filter_list_to_endswith_current_day(list) {
    return filter_list_to_endswith_date(list, new Date());
}
exports.filter_list_to_endswith_current_day = filter_list_to_endswith_current_day;


/***/ }),

/***/ "./src/utils/file_utils.ts":
/*!*********************************!*\
  !*** ./src/utils/file_utils.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.get_service_credentials_path = exports.load_credentials_files = void 0;
const fs = __importStar(__webpack_require__(/*! fs */ "fs"));
__webpack_require__(/*! @twilio-labs/serverless-runtime-types */ "@twilio-labs/serverless-runtime-types");
/**
 * Load credentials from a JSON file.
 * @returns {any} The parsed credentials from the JSON file.
 */
function load_credentials_files() {
    return JSON.parse(fs
        .readFileSync(Runtime.getAssets()["/credentials.json"].path)
        .toString());
}
exports.load_credentials_files = load_credentials_files;
/**
 * Get the path to the service credentials file.
 * @returns {string} The path to the service credentials file.
 */
function get_service_credentials_path() {
    return Runtime.getAssets()["/service-credentials.json"].path;
}
exports.get_service_credentials_path = get_service_credentials_path;


/***/ }),

/***/ "./src/utils/google_sheets_spreadsheet_tab.ts":
/*!****************************************************!*\
  !*** ./src/utils/google_sheets_spreadsheet_tab.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const util_1 = __webpack_require__(/*! ./util */ "./src/utils/util.ts");
/**
 * Class representing a Google Sheets spreadsheet tab.
 */
class GoogleSheetsSpreadsheetTab {
    /**
     * Create a GoogleSheetsSpreadsheetTab.
     * @param {sheets_v4.Sheets | null} sheets_service - The Google Sheets API service instance.
     * @param {string} sheet_id - The ID of the Google Sheets spreadsheet.
     * @param {string} sheet_name - The name of the sheet tab.
     */
    constructor(sheets_service, sheet_id, sheet_name) {
        this.sheets_service = sheets_service;
        this.sheet_id = sheet_id;
        this.sheet_name = sheet_name.split("!")[0];
    }
    /**
     * Get values from the sheet.
     * @param {string | null} [range] - The range to get values from.
     * @returns {Promise<any[][] | undefined>} A promise that resolves to the values from the sheet.
     */
    get_values(range) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._get_values(range);
            return (_a = result.data.values) !== null && _a !== void 0 ? _a : undefined;
        });
    }
    /**
     * Get the row for a specific patroller.
     * @param {string} patroller_name - The name of the patroller.
     * @param {string} name_column - The column where the patroller's name is located.
     * @param {string | null} [range] - The range to search within.
     * @returns {Promise<{ row: any[]; index: number; } | null>} A promise that resolves to the row and index of the patroller, or null if not found.
     */
    get_sheet_row_for_patroller(patroller_name, name_column, range) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield this.get_values(range);
            if (rows) {
                const lookup_index = (0, util_1.excel_row_to_index)(name_column);
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i][lookup_index] === patroller_name) {
                        return { row: rows[i], index: i };
                    }
                }
            }
            console.log(`Couldn't find patroller ${patroller_name} in sheet ${this.sheet_name}.`);
            return null;
        });
    }
    /**
     * Update values in the sheet.
     * @param {string} range - The range to update.
     * @param {any[][]} values - The values to update.
     */
    update_values(range, values) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateMe = (yield this._get_values(range, null)).data;
            updateMe.values = values;
            yield this.sheets_service.spreadsheets.values.update({
                spreadsheetId: this.sheet_id,
                valueInputOption: "USER_ENTERED",
                range: updateMe.range,
                requestBody: updateMe,
            });
        });
    }
    /**
     * Get values from the sheet (private method).
     * @param {string | null} [range] - The range to get values from.
     * @param {string | null} [valueRenderOption] - The value render option.
     * @returns {Promise<any[][]>} A promise that resolves to the value range.
     * @private
     */
    _get_values(range, valueRenderOption = "UNFORMATTED_VALUE") {
        return __awaiter(this, void 0, void 0, function* () {
            let lookupRange = this.sheet_name;
            if (range != null) {
                lookupRange = lookupRange + "!";
                if (range.startsWith(lookupRange)) {
                    range = range.substring(lookupRange.length);
                }
                lookupRange = lookupRange + range;
            }
            let opts = {
                spreadsheetId: this.sheet_id,
                range: lookupRange,
            };
            if (valueRenderOption) {
                opts.valueRenderOption = valueRenderOption;
            }
            const result = yield this.sheets_service.spreadsheets.values.get(opts);
            return result;
        });
    }
}
exports["default"] = GoogleSheetsSpreadsheetTab;


/***/ }),

/***/ "./src/utils/scope_util.ts":
/*!*********************************!*\
  !*** ./src/utils/scope_util.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validate_scopes = void 0;
/**
 * Validates if the provided scopes include all desired scopes.
 * @param {string[]} scopes - The list of scopes to validate.
 * @param {string[]} desired_scopes - The list of desired scopes.
 * @throws {Error} Throws an error if any desired scope is missing.
 */
function validate_scopes(scopes, desired_scopes) {
    for (const desired_scope of desired_scopes) {
        if (scopes === undefined || !scopes.includes(desired_scope)) {
            const error = `Missing scope ${desired_scope} in received scopes: ${scopes}`;
            console.log(error);
            throw new Error(error);
        }
    }
}
exports.validate_scopes = validate_scopes;


/***/ }),

/***/ "./src/utils/util.ts":
/*!***************************!*\
  !*** ./src/utils/util.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.lookup_row_col_in_sheet = exports.split_to_row_col = exports.sanitize_phone_number = exports.excel_row_to_index = exports.row_col_to_excel_index = void 0;
/**
 * Convert row and column numbers to an Excel-like index.
 * @param {number} row - The row number (0-based).
 * @param {number} col - The column number (0-based).
 * @returns {string} The Excel-like index (e.g., "A1").
 */
function row_col_to_excel_index(row, col) {
    let colString = "";
    col += 1;
    while (col > 0) {
        col -= 1;
        const modulo = col % 26;
        const colLetter = String.fromCharCode('A'.charCodeAt(0) + modulo);
        colString = colLetter + colString;
        col = Math.floor(col / 26);
    }
    return colString + (row + 1).toString();
}
exports.row_col_to_excel_index = row_col_to_excel_index;
/**
 * Split an Excel-like index into row and column numbers.
 * @param {string} excel_index - The Excel-like index (e.g., "A1").
 * @returns {[number, number]} An array containing the row and column numbers (0-based).
 * @throws {Error} If the index cannot be parsed.
 */
function split_to_row_col(excel_index) {
    const regex = new RegExp("^([A-Za-z]+)([0-9]+)$");
    const match = regex.exec(excel_index);
    if (match == null) {
        throw new Error("Failed to parse string for excel position split");
    }
    const col = excel_row_to_index(match[1]);
    const raw_row = Number(match[2]);
    if (raw_row < 1) {
        throw new Error("Row must be >=1");
    }
    return [raw_row - 1, col];
}
exports.split_to_row_col = split_to_row_col;
/**
 * Look up a value in a sheet by its Excel-like index.
 * @param {string} excel_index - The Excel-like index (e.g., "A1").
 * @param {any[][]} sheet - The sheet data.
 * @returns {any} The value at the specified index, or undefined if not found.
 */
function lookup_row_col_in_sheet(excel_index, sheet) {
    const [row, col] = split_to_row_col(excel_index);
    if (row >= sheet.length) {
        return undefined;
    }
    return sheet[row][col];
}
exports.lookup_row_col_in_sheet = lookup_row_col_in_sheet;
/**
 * Convert Excel-like column letters to a column number.
 * @param {string} letters - The column letters (e.g., "A").
 * @returns {number} The column number (0-based).
 */
function excel_row_to_index(letters) {
    const lowerLetters = letters.toLowerCase();
    let result = 0;
    for (var p = 0; p < lowerLetters.length; p++) {
        const characterValue = lowerLetters.charCodeAt(p) - "a".charCodeAt(0) + 1;
        result = characterValue + result * 26;
    }
    return result - 1;
}
exports.excel_row_to_index = excel_row_to_index;
/**
 * Sanitize a phone number by removing unwanted characters.
 * @param {number | string} number - The phone number to sanitize.
 * @returns {string} The sanitized phone number.
 */
function sanitize_phone_number(number) {
    let new_number = number.toString();
    new_number = new_number.replace("whatsapp:", "");
    let temporary_new_number = "";
    while (temporary_new_number != new_number) {
        // Do this multiple times so we get all +1 at the start of the string, even after stripping.
        temporary_new_number = new_number;
        new_number = new_number.replace(/(^\+1|\(|\)|\.|-)/g, "");
    }
    const result = String(parseInt(new_number)).padStart(10, "0");
    if (result.length == 11 && result[0] == "1") {
        return result.substring(1);
    }
    return result;
}
exports.sanitize_phone_number = sanitize_phone_number;


/***/ }),

/***/ "@twilio-labs/serverless-runtime-types":
/*!********************************************************!*\
  !*** external "@twilio-labs/serverless-runtime-types" ***!
  \********************************************************/
/***/ ((module) => {

module.exports = require("@twilio-labs/serverless-runtime-types");

/***/ }),

/***/ "googleapis":
/*!*****************************!*\
  !*** external "googleapis" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("googleapis");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/handlers/handler.protected.ts");
/******/ 	exports.handler = __webpack_exports__.handler;
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9lbnYvaGFuZGxlcl9jb25maWcudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9oYW5kbGVycy9idm5zcF9jaGVja2luX2hhbmRsZXIudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9oYW5kbGVycy9oYW5kbGVyLnByb3RlY3RlZC50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3NoZWV0cy9jb21wX3Bhc3Nfc2hlZXQudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9zaGVldHMvbG9naW5fc2hlZXQudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9zaGVldHMvc2Vhc29uX3NoZWV0LnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXNlci1jcmVkcy50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3V0aWxzL2NoZWNraW5fdmFsdWVzLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvY29tcF9wYXNzZXMudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91dGlscy9kYXRldGltZV91dGlsLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvZmlsZV91dGlscy50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3V0aWxzL2dvb2dsZV9zaGVldHNfc3ByZWFkc2hlZXRfdGFiLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvc2NvcGVfdXRpbC50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3V0aWxzL3V0aWwudHMiLCJleHRlcm5hbCBjb21tb25qcyBcIkB0d2lsaW8tbGFicy9zZXJ2ZXJsZXNzLXJ1bnRpbWUtdHlwZXNcIiIsImV4dGVybmFsIGNvbW1vbmpzIFwiZ29vZ2xlYXBpc1wiIiwiZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImZzXCIiLCJ3ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hlY2tpblZhbHVlIH0gZnJvbSBcIi4uL3V0aWxzL2NoZWNraW5fdmFsdWVzXCI7XG5cbi8qKlxuICogRW52aXJvbm1lbnQgY29uZmlndXJhdGlvbiBmb3IgdGhlIGhhbmRsZXIuXG4gKiA8cD5cbiAqIE5vdGU6IFRoZXNlIGFyZSB0aGUgb25seSBzZWNyZXQgdmFsdWVzIHdlIG5lZWQgdG8gcmVhZC4gUmVzdCBjYW4gYmUgZGVwbG95ZWQuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBIYW5kbGVyRW52aXJvbm1lbnRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTSEVFVF9JRCAtIFRoZSBJRCBvZiB0aGUgR29vZ2xlIFNoZWV0cyBzcHJlYWRzaGVldC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTQ1JJUFRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBBcHBzIFNjcmlwdCBwcm9qZWN0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNZTkNfU0lEIC0gVGhlIFNJRCBvZiB0aGUgVHdpbGlvIFN5bmMgc2VydmljZS5cbiAqL1xudHlwZSBIYW5kbGVyRW52aXJvbm1lbnQgPSB7XG4gICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICBTQ1JJUFRfSUQ6IHN0cmluZztcbiAgICBTWU5DX1NJRDogc3RyaW5nO1xufTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciB1c2VyIGNyZWRlbnRpYWxzLlxuICogQHR5cGVkZWYge09iamVjdH0gVXNlckNyZWRzQ29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZyB8IHVuZGVmaW5lZCB8IG51bGx9IE5TUF9FTUFJTF9ET01BSU4gLSBUaGUgZW1haWwgZG9tYWluIGZvciBOU1AuXG4gKi9cbnR5cGUgVXNlckNyZWRzQ29uZmlnID0ge1xuICAgIE5TUF9FTUFJTF9ET01BSU46IHN0cmluZyB8IHVuZGVmaW5lZCB8IG51bGw7XG59O1xuY29uc3QgdXNlcl9jcmVkc19jb25maWc6IFVzZXJDcmVkc0NvbmZpZyA9IHtcbiAgICBOU1BfRU1BSUxfRE9NQUlOOiBcImZhcndlc3Qub3JnXCIsXG59O1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIGZpbmRpbmcgYSBwYXRyb2xsZXIuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBGaW5kUGF0cm9sbGVyQ29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gUEhPTkVfTlVNQkVSX0xPT0tVUF9TSEVFVCAtIFRoZSByYW5nZSBmb3IgcGhvbmUgbnVtYmVyIGxvb2t1cC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBQSE9ORV9OVU1CRVJfTlVNQkVSX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIHBob25lIG51bWJlcnMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gUEhPTkVfTlVNQkVSX05BTUVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgbmFtZXMuXG4gKi9cbnR5cGUgRmluZFBhdHJvbGxlckNvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogc3RyaW5nO1xuICAgIFBIT05FX05VTUJFUl9MT09LVVBfU0hFRVQ6IHN0cmluZztcbiAgICBQSE9ORV9OVU1CRVJfTlVNQkVSX0NPTFVNTjogc3RyaW5nO1xuICAgIFBIT05FX05VTUJFUl9OQU1FX0NPTFVNTjogc3RyaW5nO1xufTtcblxuY29uc3QgZmluZF9wYXRyb2xsZXJfY29uZmlnOiBGaW5kUGF0cm9sbGVyQ29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBcInRlc3RcIixcbiAgICBQSE9ORV9OVU1CRVJfTE9PS1VQX1NIRUVUOiBcIlBob25lIE51bWJlcnMhQTI6QjEwMFwiLFxuICAgIFBIT05FX05VTUJFUl9OQU1FX0NPTFVNTjogXCJBXCIsXG4gICAgUEhPTkVfTlVNQkVSX05VTUJFUl9DT0xVTU46IFwiQlwiLFxufTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciB0aGUgbG9naW4gc2hlZXQuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBMb2dpblNoZWV0Q29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gTE9HSU5fU0hFRVRfTE9PS1VQIC0gVGhlIHJhbmdlIGZvciBsb2dpbiBzaGVldCBsb29rdXAuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQ0hFQ0tJTl9DT1VOVF9MT09LVVAgLSBUaGUgcmFuZ2UgZm9yIGNoZWNrLWluIGNvdW50IGxvb2t1cC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBBUkNISVZFRF9DRUxMIC0gVGhlIGNlbGwgZm9yIGFyY2hpdmVkIGRhdGEuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfREFURV9DRUxMIC0gVGhlIGNlbGwgZm9yIHRoZSBzaGVldCBkYXRlLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IENVUlJFTlRfREFURV9DRUxMIC0gVGhlIGNlbGwgZm9yIHRoZSBjdXJyZW50IGRhdGUuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gTkFNRV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBuYW1lcy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDQVRFR09SWV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBjYXRlZ29yaWVzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNFQ1RJT05fRFJPUERPV05fQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3Igc2VjdGlvbiBkcm9wZG93bi5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDSEVDS0lOX0RST1BET1dOX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIGNoZWNrLWluIGRyb3Bkb3duLlxuICovXG50eXBlIExvZ2luU2hlZXRDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICBMT0dJTl9TSEVFVF9MT09LVVA6IHN0cmluZztcbiAgICBDSEVDS0lOX0NPVU5UX0xPT0tVUDogc3RyaW5nO1xuICAgIEFSQ0hJVkVEX0NFTEw6IHN0cmluZztcbiAgICBTSEVFVF9EQVRFX0NFTEw6IHN0cmluZztcbiAgICBDVVJSRU5UX0RBVEVfQ0VMTDogc3RyaW5nO1xuICAgIE5BTUVfQ09MVU1OOiBzdHJpbmc7XG4gICAgQ0FURUdPUllfQ09MVU1OOiBzdHJpbmc7XG4gICAgU0VDVElPTl9EUk9QRE9XTl9DT0xVTU46IHN0cmluZztcbiAgICBDSEVDS0lOX0RST1BET1dOX0NPTFVNTjogc3RyaW5nO1xufTtcblxuY29uc3QgbG9naW5fc2hlZXRfY29uZmlnOiBMb2dpblNoZWV0Q29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBcInRlc3RcIixcbiAgICBMT0dJTl9TSEVFVF9MT09LVVA6IFwiTG9naW4hQTE6WjEwMFwiLFxuICAgIENIRUNLSU5fQ09VTlRfTE9PS1VQOiBcIlRvb2xzIUcyOkcyXCIsXG4gICAgU0hFRVRfREFURV9DRUxMOiBcIkIxXCIsXG4gICAgQ1VSUkVOVF9EQVRFX0NFTEw6IFwiQjJcIixcbiAgICBBUkNISVZFRF9DRUxMOiBcIkgxXCIsXG4gICAgTkFNRV9DT0xVTU46IFwiQVwiLFxuICAgIENBVEVHT1JZX0NPTFVNTjogXCJCXCIsXG4gICAgU0VDVElPTl9EUk9QRE9XTl9DT0xVTU46IFwiSFwiLFxuICAgIENIRUNLSU5fRFJPUERPV05fQ09MVU1OOiBcIklcIixcbn07XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgdGhlIHNlYXNvbiBzaGVldC5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IFNlYXNvblNoZWV0Q29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0VBU09OX1NIRUVUIC0gVGhlIG5hbWUgb2YgdGhlIHNlYXNvbiBzaGVldC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTRUFTT05fU0hFRVRfREFZU19DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBzZWFzb24gc2hlZXQgZGF5cy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTRUFTT05fU0hFRVRfTkFNRV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBzZWFzb24gc2hlZXQgbmFtZXMuXG4gKi9cbnR5cGUgU2Vhc29uU2hlZXRDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICBTRUFTT05fU0hFRVQ6IHN0cmluZztcbiAgICBTRUFTT05fU0hFRVRfREFZU19DT0xVTU46IHN0cmluZztcbiAgICBTRUFTT05fU0hFRVRfTkFNRV9DT0xVTU46IHN0cmluZztcbn07XG5jb25zdCBzZWFzb25fc2hlZXRfY29uZmlnOiBTZWFzb25TaGVldENvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogXCJ0ZXN0XCIsXG4gICAgU0VBU09OX1NIRUVUOiBcIlNlYXNvblwiLFxuICAgIFNFQVNPTl9TSEVFVF9OQU1FX0NPTFVNTjogXCJCXCIsXG4gICAgU0VBU09OX1NIRUVUX0RBWVNfQ09MVU1OOiBcIkFcIixcbn07XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgY29tcCBwYXNzZXMuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBDb21wUGFzc2VzQ29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQ09NUF9QQVNTX1NIRUVUIC0gVGhlIG5hbWUgb2YgdGhlIGNvbXAgcGFzcyBzaGVldC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDT01QX1BBU1NfU0hFRVRfREFURVNfQVZBSUxBQkxFX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIGF2YWlsYWJsZSBkYXRlcy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDT01QX1BBU1NfU0hFRVRfVVNFRF9UT0RBWV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBkYXRlcyB1c2VkIHRvZGF5LlxuICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDT01QX1BBU1NfU0hFRVRfVVNFRF9TRUFTT05fQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgZGF0ZXMgdXNlZCBmb3IgdGhpcyBzZWFzb24uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQ09NUF9QQVNTX1NIRUVUX0RBVEVTX1NUQVJUSU5HX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIHN0YXJ0aW5nIGRhdGVzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IENPTVBfUEFTU19TSEVFVF9OQU1FX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIG5hbWVzLlxuICovXG50eXBlIENvbXBQYXNzZXNDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICBDT01QX1BBU1NfU0hFRVQ6IHN0cmluZztcbiAgICBDT01QX1BBU1NfU0hFRVRfREFURVNfQVZBSUxBQkxFX0NPTFVNTjogc3RyaW5nO1xuICAgIENPTVBfUEFTU19TSEVFVF9VU0VEX1RPREFZX0NPTFVNTjogc3RyaW5nO1xuICAgIENPTVBfUEFTU19TSEVFVF9VU0VEX1NFQVNPTl9DT0xVTU46IHN0cmluZztcbiAgICBDT01QX1BBU1NfU0hFRVRfREFURVNfU1RBUlRJTkdfQ09MVU1OOiBzdHJpbmc7XG4gICAgQ09NUF9QQVNTX1NIRUVUX05BTUVfQ09MVU1OOiBzdHJpbmc7XG59O1xuY29uc3QgY29tcF9wYXNzZXNfY29uZmlnOiBDb21wUGFzc2VzQ29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBcInRlc3RcIixcbiAgICBDT01QX1BBU1NfU0hFRVQ6IFwiQ29tcHNcIixcbiAgICBDT01QX1BBU1NfU0hFRVRfTkFNRV9DT0xVTU46IFwiQVwiLFxuICAgIENPTVBfUEFTU19TSEVFVF9EQVRFU19BVkFJTEFCTEVfQ09MVU1OOiBcIkRcIixcbiAgICBDT01QX1BBU1NfU0hFRVRfVVNFRF9UT0RBWV9DT0xVTU46IFwiRVwiLFxuICAgIENPTVBfUEFTU19TSEVFVF9VU0VEX1NFQVNPTl9DT0xVTU46IFwiRlwiLFxuICAgIENPTVBfUEFTU19TSEVFVF9EQVRFU19TVEFSVElOR19DT0xVTU46IFwiR1wiLFxufTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciBtYW5hZ2VyIHBhc3Nlcy5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IE1hbmFnZXJQYXNzZXNDb25maWdcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTSEVFVF9JRCAtIFRoZSBJRCBvZiB0aGUgR29vZ2xlIFNoZWV0cyBzcHJlYWRzaGVldC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBNQU5BR0VSX1BBU1NfU0hFRVQgLSBUaGUgbmFtZSBvZiB0aGUgbWFuYWdlciBwYXNzIHNoZWV0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IE1BTkFHRVJfUEFTU19TSEVFVF9BVkFJTEFCTEVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgYXZhaWxhYmxlIHBhc3Nlcy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBNQU5BR0VSX1BBU1NfU0hFRVRfVVNFRF9UT0RBWV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBwYXNzZXMgdXNlZCB0b2RheS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBNQU5BR0VSX1BBU1NfU0hFRVRfVVNFRF9TRUFTT05fQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgZGF0ZXMgdXNlZCBmb3IgdGhpcyBzZWFzb24uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gTUFOQUdFUl9QQVNTX1NIRUVUX0RBVEVTX1NUQVJUSU5HX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIHN0YXJ0aW5nIGRhdGVzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IE1BTkFHRVJfUEFTU19TSEVFVF9OQU1FX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIG5hbWVzLlxuICovXG50eXBlIE1hbmFnZXJQYXNzZXNDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICBNQU5BR0VSX1BBU1NfU0hFRVQ6IHN0cmluZztcbiAgICBNQU5BR0VSX1BBU1NfU0hFRVRfQVZBSUxBQkxFX0NPTFVNTjogc3RyaW5nO1xuICAgIE1BTkFHRVJfUEFTU19TSEVFVF9VU0VEX1RPREFZX0NPTFVNTjogc3RyaW5nO1xuICAgIE1BTkFHRVJfUEFTU19TSEVFVF9VU0VEX1NFQVNPTl9DT0xVTU46IHN0cmluZztcbiAgICBNQU5BR0VSX1BBU1NfU0hFRVRfREFURVNfU1RBUlRJTkdfQ09MVU1OOiBzdHJpbmc7XG4gICAgTUFOQUdFUl9QQVNTX1NIRUVUX05BTUVfQ09MVU1OOiBzdHJpbmc7XG59O1xuY29uc3QgbWFuYWdlcl9wYXNzZXNfY29uZmlnOiBNYW5hZ2VyUGFzc2VzQ29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBcInRlc3RcIixcbiAgICBNQU5BR0VSX1BBU1NfU0hFRVQ6IFwiTWFuYWdlcnNcIixcbiAgICBNQU5BR0VSX1BBU1NfU0hFRVRfTkFNRV9DT0xVTU46IFwiQVwiLFxuICAgIE1BTkFHRVJfUEFTU19TSEVFVF9BVkFJTEFCTEVfQ09MVU1OOiBcIkVcIixcbiAgICBNQU5BR0VSX1BBU1NfU0hFRVRfVVNFRF9UT0RBWV9DT0xVTU46IFwiQ1wiLFxuICAgIE1BTkFHRVJfUEFTU19TSEVFVF9VU0VEX1NFQVNPTl9DT0xVTU46IFwiQlwiLFxuICAgIE1BTkFHRVJfUEFTU19TSEVFVF9EQVRFU19TVEFSVElOR19DT0xVTU46IFwiSFwiLFxufTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciB0aGUgaGFuZGxlci5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IEhhbmRsZXJDb25maWdcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTQ1JJUFRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBBcHBzIFNjcmlwdCBwcm9qZWN0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNIRUVUX0lEIC0gVGhlIElEIG9mIHRoZSBHb29nbGUgU2hlZXRzIHNwcmVhZHNoZWV0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNZTkNfU0lEIC0gVGhlIFNJRCBvZiB0aGUgVHdpbGlvIFN5bmMgc2VydmljZS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBSRVNFVF9GVU5DVElPTl9OQU1FIC0gVGhlIG5hbWUgb2YgdGhlIHJlc2V0IGZ1bmN0aW9uLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IEFSQ0hJVkVfRlVOQ1RJT05fTkFNRSAtIFRoZSBuYW1lIG9mIHRoZSBhcmNoaXZlIGZ1bmN0aW9uLlxuICogQHByb3BlcnR5IHtib29sZWFufSBVU0VfU0VSVklDRV9BQ0NPVU5UIC0gV2hldGhlciB0byB1c2UgYSBzZXJ2aWNlIGFjY291bnQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQUNUSU9OX0xPR19TSEVFVCAtIFRoZSBuYW1lIG9mIHRoZSBhY3Rpb24gbG9nIHNoZWV0LlxuICogQHByb3BlcnR5IHtDaGVja2luVmFsdWVbXX0gQ0hFQ0tJTl9WQUxVRVMgLSBUaGUgY2hlY2staW4gdmFsdWVzLlxuICovXG50eXBlIEhhbmRsZXJDb25maWcgPSB7XG4gICAgU0NSSVBUX0lEOiBzdHJpbmc7XG4gICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICBTWU5DX1NJRDogc3RyaW5nO1xuICAgIFJFU0VUX0ZVTkNUSU9OX05BTUU6IHN0cmluZztcbiAgICBBUkNISVZFX0ZVTkNUSU9OX05BTUU6IHN0cmluZztcbiAgICBVU0VfU0VSVklDRV9BQ0NPVU5UOiBib29sZWFuO1xuICAgIEFDVElPTl9MT0dfU0hFRVQ6IHN0cmluZztcbiAgICBDSEVDS0lOX1ZBTFVFUzogQ2hlY2tpblZhbHVlW107XG59O1xuY29uc3QgaGFuZGxlcl9jb25maWc6IEhhbmRsZXJDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IFwidGVzdFwiLFxuICAgIFNDUklQVF9JRDogXCJ0ZXN0XCIsXG4gICAgU1lOQ19TSUQ6IFwidGVzdFwiLFxuICAgIEFSQ0hJVkVfRlVOQ1RJT05fTkFNRTogXCJBcmNoaXZlXCIsXG4gICAgUkVTRVRfRlVOQ1RJT05fTkFNRTogXCJSZXNldFwiLFxuICAgIFVTRV9TRVJWSUNFX0FDQ09VTlQ6IHRydWUsXG4gICAgQUNUSU9OX0xPR19TSEVFVDogXCJCb3RfVXNhZ2VcIixcbiAgICBDSEVDS0lOX1ZBTFVFUzogW1xuICAgICAgICBuZXcgQ2hlY2tpblZhbHVlKFwiZGF5XCIsIFwiQWxsIERheVwiLCBcImFsbCBkYXkvREFZXCIsIFtcImNoZWNraW4tZGF5XCJdKSxcbiAgICAgICAgbmV3IENoZWNraW5WYWx1ZShcImFtXCIsIFwiSGFsZiBBTVwiLCBcIm1vcm5pbmcvQU1cIiwgW1wiY2hlY2tpbi1hbVwiXSksXG4gICAgICAgIG5ldyBDaGVja2luVmFsdWUoXCJwbVwiLCBcIkhhbGYgUE1cIiwgXCJhZnRlcm5vb24vUE1cIiwgW1wiY2hlY2tpbi1wbVwiXSksXG4gICAgICAgIG5ldyBDaGVja2luVmFsdWUoXCJvdXRcIiwgXCJDaGVja2VkIE91dFwiLCBcImNoZWNrIG91dC9PVVRcIiwgW1wiY2hlY2tvdXRcIiwgXCJjaGVjay1vdXRcIl0pLFxuICAgIF0sXG59O1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIHBhdHJvbGxlciByb3dzLlxuICogQHR5cGVkZWYge09iamVjdH0gUGF0cm9sbGVyUm93Q29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gTkFNRV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBuYW1lcy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDQVRFR09SWV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBjYXRlZ29yaWVzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNFQ1RJT05fRFJPUERPV05fQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3Igc2VjdGlvbiBkcm9wZG93bi5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDSEVDS0lOX0RST1BET1dOX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIGNoZWNrLWluIGRyb3Bkb3duLlxuICovXG50eXBlIFBhdHJvbGxlclJvd0NvbmZpZyA9IHtcbiAgICBOQU1FX0NPTFVNTjogc3RyaW5nO1xuICAgIENBVEVHT1JZX0NPTFVNTjogc3RyaW5nO1xuICAgIFNFQ1RJT05fRFJPUERPV05fQ09MVU1OOiBzdHJpbmc7XG4gICAgQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU46IHN0cmluZztcbn07XG5cbi8qKlxuICogQ29tYmluZWQgY29uZmlndXJhdGlvbiB0eXBlLlxuICogQHR5cGVkZWYge0hhbmRsZXJFbnZpcm9ubWVudCAmIFVzZXJDcmVkc0NvbmZpZyAmIEZpbmRQYXRyb2xsZXJDb25maWcgJiBMb2dpblNoZWV0Q29uZmlnICYgU2Vhc29uU2hlZXRDb25maWcgJiBDb21wUGFzc2VzQ29uZmlnICYgTWFuYWdlclBhc3Nlc0NvbmZpZyAmIEhhbmRsZXJDb25maWcgJiBQYXRyb2xsZXJSb3dDb25maWd9IENvbWJpbmVkQ29uZmlnXG4gKi9cbnR5cGUgQ29tYmluZWRDb25maWcgPSBIYW5kbGVyRW52aXJvbm1lbnQgJlxuICAgIFVzZXJDcmVkc0NvbmZpZyAmXG4gICAgRmluZFBhdHJvbGxlckNvbmZpZyAmXG4gICAgTG9naW5TaGVldENvbmZpZyAmXG4gICAgU2Vhc29uU2hlZXRDb25maWcgJlxuICAgIENvbXBQYXNzZXNDb25maWcgJlxuICAgIE1hbmFnZXJQYXNzZXNDb25maWcgJlxuICAgIEhhbmRsZXJDb25maWcgJlxuICAgIFBhdHJvbGxlclJvd0NvbmZpZztcblxuY29uc3QgQ09ORklHOiBDb21iaW5lZENvbmZpZyA9IHtcbiAgICAuLi5oYW5kbGVyX2NvbmZpZyxcbiAgICAuLi5maW5kX3BhdHJvbGxlcl9jb25maWcsXG4gICAgLi4ubG9naW5fc2hlZXRfY29uZmlnLFxuICAgIC4uLmNvbXBfcGFzc2VzX2NvbmZpZyxcbiAgICAuLi5tYW5hZ2VyX3Bhc3Nlc19jb25maWcsXG4gICAgLi4uc2Vhc29uX3NoZWV0X2NvbmZpZyxcbiAgICAuLi51c2VyX2NyZWRzX2NvbmZpZyxcbn07XG5cbmV4cG9ydCB7XG4gICAgQ09ORklHLFxuICAgIENvbWJpbmVkQ29uZmlnLFxuICAgIENvbXBQYXNzZXNDb25maWcsXG4gICAgRmluZFBhdHJvbGxlckNvbmZpZyxcbiAgICBIYW5kbGVyQ29uZmlnLFxuICAgIGhhbmRsZXJfY29uZmlnLFxuICAgIEhhbmRsZXJFbnZpcm9ubWVudCxcbiAgICBNYW5hZ2VyUGFzc2VzQ29uZmlnLFxuICAgIFVzZXJDcmVkc0NvbmZpZyxcbiAgICBMb2dpblNoZWV0Q29uZmlnLFxuICAgIFNlYXNvblNoZWV0Q29uZmlnLFxuICAgIFBhdHJvbGxlclJvd0NvbmZpZyxcbn07IiwiaW1wb3J0IFwiQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlc1wiO1xuaW1wb3J0IHtcbiAgICBDb250ZXh0LFxuICAgIFNlcnZlcmxlc3NFdmVudE9iamVjdCxcbiAgICBTZXJ2aWNlQ29udGV4dCxcbiAgICBUd2lsaW9DbGllbnQsXG59IGZyb20gXCJAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzL3R5cGVzXCI7XG5pbXBvcnQgeyBnb29nbGUsIHNjcmlwdF92MSwgc2hlZXRzX3Y0IH0gZnJvbSBcImdvb2dsZWFwaXNcIjtcbmltcG9ydCB7IEdvb2dsZUF1dGggfSBmcm9tIFwiZ29vZ2xlYXBpcy1jb21tb25cIjtcbmltcG9ydCB7XG4gICAgQ09ORklHLFxuICAgIENvbWJpbmVkQ29uZmlnLFxuICAgIENvbXBQYXNzZXNDb25maWcsXG4gICAgRmluZFBhdHJvbGxlckNvbmZpZyxcbiAgICBIYW5kbGVyQ29uZmlnLFxuICAgIGhhbmRsZXJfY29uZmlnLFxuICAgIEhhbmRsZXJFbnZpcm9ubWVudCxcbiAgICBMb2dpblNoZWV0Q29uZmlnLFxuICAgIE1hbmFnZXJQYXNzZXNDb25maWcsXG4gICAgU2Vhc29uU2hlZXRDb25maWcsXG59IGZyb20gXCIuLi9lbnYvaGFuZGxlcl9jb25maWdcIjtcbmltcG9ydCBMb2dpblNoZWV0LCB7IFBhdHJvbGxlclJvdyB9IGZyb20gXCIuLi9zaGVldHMvbG9naW5fc2hlZXRcIjtcbmltcG9ydCBTZWFzb25TaGVldCBmcm9tIFwiLi4vc2hlZXRzL3NlYXNvbl9zaGVldFwiO1xuaW1wb3J0IHsgVXNlckNyZWRzIH0gZnJvbSBcIi4uL3VzZXItY3JlZHNcIjtcbmltcG9ydCB7IENoZWNraW5WYWx1ZXMgfSBmcm9tIFwiLi4vdXRpbHMvY2hlY2tpbl92YWx1ZXNcIjtcbmltcG9ydCB7IGdldF9zZXJ2aWNlX2NyZWRlbnRpYWxzX3BhdGggfSBmcm9tIFwiLi4vdXRpbHMvZmlsZV91dGlsc1wiO1xuaW1wb3J0IHsgZXhjZWxfcm93X3RvX2luZGV4LCBzYW5pdGl6ZV9waG9uZV9udW1iZXIgfSBmcm9tIFwiLi4vdXRpbHMvdXRpbFwiO1xuaW1wb3J0IHsgQ29tcFBhc3NUeXBlLCBnZXRfY29tcF9wYXNzX2Rlc2NyaXB0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2NvbXBfcGFzc2VzXCI7XG5pbXBvcnQge1xuICAgIENvbXBQYXNzU2hlZXQsXG4gICAgTWFuYWdlclBhc3NTaGVldCxcbiAgICBQYXNzU2hlZXQsXG59IGZyb20gXCIuLi9zaGVldHMvY29tcF9wYXNzX3NoZWV0XCI7XG5cbmV4cG9ydCB0eXBlIEJWTlNQQ2hlY2tpblJlc3BvbnNlID0ge1xuICAgIHJlc3BvbnNlPzogc3RyaW5nO1xuICAgIG5leHRfc3RlcD86IHN0cmluZztcbn07XG5leHBvcnQgdHlwZSBIYW5kbGVyRXZlbnQgPSBTZXJ2ZXJsZXNzRXZlbnRPYmplY3Q8XG4gICAge1xuICAgICAgICBGcm9tOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgICAgIFRvOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgICAgIG51bWJlcjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgICB0ZXN0X251bWJlcjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgICBCb2R5OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgfSxcbiAgICB7fSxcbiAgICB7XG4gICAgICAgIGJ2bnNwX2NoZWNraW5fbmV4dF9zdGVwOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgfVxuPjtcblxuZXhwb3J0IGNvbnN0IE5FWFRfU1RFUFMgPSB7XG4gICAgQVdBSVRfQ09NTUFORDogXCJhd2FpdC1jb21tYW5kXCIsXG4gICAgQVdBSVRfQ0hFQ0tJTjogXCJhd2FpdC1jaGVja2luXCIsXG4gICAgQ09ORklSTV9SRVNFVDogXCJjb25maXJtLXJlc2V0XCIsXG4gICAgQVVUSF9SRVNFVDogXCJhdXRoLXJlc2V0XCIsXG4gICAgQVdBSVRfUEFTUzogXCJhd2FpdC1wYXNzXCIsXG59O1xuXG5jb25zdCBDT01NQU5EUyA9IHtcbiAgICBPTl9EVVRZOiBbXCJvbmR1dHlcIiwgXCJvbi1kdXR5XCJdLFxuICAgIFNUQVRVUzogW1wic3RhdHVzXCJdLFxuICAgIENIRUNLSU46IFtcImNoZWNraW5cIiwgXCJjaGVjay1pblwiXSxcbiAgICBDT01QX1BBU1M6IFtcImNvbXAtcGFzc1wiLCBcImNvbXBwYXNzXCJdLFxuICAgIE1BTkFHRVJfUEFTUzogW1wibWFuYWdlci1wYXNzXCIsIFwibWFuYWdlcnBhc3NcIl0sXG4gICAgV0hBVFNBUFA6IFtcIndoYXRzYXBwXCJdLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQlZOU1BDaGVja2luSGFuZGxlciB7XG4gICAgU0NPUEVTOiBzdHJpbmdbXSA9IFtcImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvc3ByZWFkc2hlZXRzXCJdO1xuXG4gICAgc21zX3JlcXVlc3Q6IGJvb2xlYW47XG4gICAgcmVzdWx0X21lc3NhZ2VzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGZyb206IHN0cmluZztcbiAgICB0bzogc3RyaW5nO1xuICAgIGJvZHk6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBwYXRyb2xsZXI6IFBhdHJvbGxlclJvdyB8IG51bGw7XG4gICAgYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXA6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBjaGVja2luX21vZGU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICAgIGZhc3RfY2hlY2tpbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgdHdpbGlvX2NsaWVudDogVHdpbGlvQ2xpZW50IHwgbnVsbCA9IG51bGw7XG4gICAgc3luY19zaWQ6IHN0cmluZztcbiAgICByZXNldF9zY3JpcHRfaWQ6IHN0cmluZztcblxuICAgIC8vIENhY2hlIGNsaWVudHNcbiAgICBzeW5jX2NsaWVudDogU2VydmljZUNvbnRleHQgfCBudWxsID0gbnVsbDtcbiAgICB1c2VyX2NyZWRzOiBVc2VyQ3JlZHMgfCBudWxsID0gbnVsbDtcbiAgICBzZXJ2aWNlX2NyZWRzOiBHb29nbGVBdXRoIHwgbnVsbCA9IG51bGw7XG4gICAgc2hlZXRzX3NlcnZpY2U6IHNoZWV0c192NC5TaGVldHMgfCBudWxsID0gbnVsbDtcbiAgICB1c2VyX3NjcmlwdHNfc2VydmljZTogc2NyaXB0X3YxLlNjcmlwdCB8IG51bGwgPSBudWxsO1xuXG4gICAgbG9naW5fc2hlZXQ6IExvZ2luU2hlZXQgfCBudWxsID0gbnVsbDtcbiAgICBzZWFzb25fc2hlZXQ6IFNlYXNvblNoZWV0IHwgbnVsbCA9IG51bGw7XG4gICAgY29tcF9wYXNzX3NoZWV0OiBDb21wUGFzc1NoZWV0IHwgbnVsbCA9IG51bGw7XG4gICAgbWFuYWdlcl9wYXNzX3NoZWV0OiBNYW5hZ2VyUGFzc1NoZWV0IHwgbnVsbCA9IG51bGw7XG5cbiAgICBjaGVja2luX3ZhbHVlczogQ2hlY2tpblZhbHVlcztcbiAgICBjdXJyZW50X3NoZWV0X2RhdGU6IERhdGU7XG5cbiAgICBjb21iaW5lZF9jb25maWc6IENvbWJpbmVkQ29uZmlnO1xuICAgIGNvbmZpZzogSGFuZGxlckNvbmZpZztcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgYSBuZXcgQlZOU1BDaGVja2luSGFuZGxlci5cbiAgICAgKiBAcGFyYW0ge0NvbnRleHQ8SGFuZGxlckVudmlyb25tZW50Pn0gY29udGV4dCAtIFRoZSBzZXJ2ZXJsZXNzIGZ1bmN0aW9uIGNvbnRleHQuXG4gICAgICogQHBhcmFtIHtTZXJ2ZXJsZXNzRXZlbnRPYmplY3Q8SGFuZGxlckV2ZW50Pn0gZXZlbnQgLSBUaGUgZXZlbnQgb2JqZWN0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBjb250ZXh0OiBDb250ZXh0PEhhbmRsZXJFbnZpcm9ubWVudD4sXG4gICAgICAgIGV2ZW50OiBTZXJ2ZXJsZXNzRXZlbnRPYmplY3Q8SGFuZGxlckV2ZW50PlxuICAgICkge1xuICAgICAgICAvLyBEZXRlcm1pbmUgbWVzc2FnZSBkZXRhaWxzIGZyb20gdGhlIGluY29taW5nIGV2ZW50LCB3aXRoIGZhbGxiYWNrIHZhbHVlc1xuICAgICAgICB0aGlzLnNtc19yZXF1ZXN0ID0gKGV2ZW50LkZyb20gfHwgZXZlbnQubnVtYmVyKSAhPT0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmZyb20gPSBldmVudC5Gcm9tIHx8IGV2ZW50Lm51bWJlciB8fCBldmVudC50ZXN0X251bWJlciE7XG4gICAgICAgIHRoaXMudG8gPSBzYW5pdGl6ZV9waG9uZV9udW1iZXIoZXZlbnQuVG8hKTtcbiAgICAgICAgdGhpcy5ib2R5ID0gZXZlbnQuQm9keT8udG9Mb3dlckNhc2UoKT8udHJpbSgpLnJlcGxhY2UoL1xccysvLCBcIi1cIik7XG4gICAgICAgIHRoaXMuYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXAgPVxuICAgICAgICAgICAgZXZlbnQucmVxdWVzdC5jb29raWVzLmJ2bnNwX2NoZWNraW5fbmV4dF9zdGVwO1xuICAgICAgICB0aGlzLmNvbWJpbmVkX2NvbmZpZyA9IHsgLi4uQ09ORklHLCAuLi5jb250ZXh0IH07XG4gICAgICAgIHRoaXMuY29uZmlnID0gdGhpcy5jb21iaW5lZF9jb25maWc7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMudHdpbGlvX2NsaWVudCA9IGNvbnRleHQuZ2V0VHdpbGlvQ2xpZW50KCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgaW5pdGlhbGl6aW5nIHR3aWxpb19jbGllbnRcIiwgZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zeW5jX3NpZCA9IGNvbnRleHQuU1lOQ19TSUQ7XG4gICAgICAgIHRoaXMucmVzZXRfc2NyaXB0X2lkID0gY29udGV4dC5TQ1JJUFRfSUQ7XG4gICAgICAgIHRoaXMucGF0cm9sbGVyID0gbnVsbDtcblxuICAgICAgICB0aGlzLmNoZWNraW5fdmFsdWVzID0gbmV3IENoZWNraW5WYWx1ZXMoaGFuZGxlcl9jb25maWcuQ0hFQ0tJTl9WQUxVRVMpO1xuICAgICAgICB0aGlzLmN1cnJlbnRfc2hlZXRfZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIHRoZSBmYXN0IGNoZWNrLWluIG1vZGUgZnJvbSB0aGUgbWVzc2FnZSBib2R5LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5IC0gVGhlIG1lc3NhZ2UgYm9keS5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBmYXN0IGNoZWNrLWluIG1vZGUgaXMgcGFyc2VkLCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICovXG4gICAgcGFyc2VfZmFzdF9jaGVja2luX21vZGUoYm9keTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHBhcnNlZCA9IHRoaXMuY2hlY2tpbl92YWx1ZXMucGFyc2VfZmFzdF9jaGVja2luKGJvZHkpO1xuICAgICAgICBpZiAocGFyc2VkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tpbl9tb2RlID0gcGFyc2VkLmtleTtcbiAgICAgICAgICAgIHRoaXMuZmFzdF9jaGVja2luID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZXMgdGhlIGNoZWNrLWluIG1vZGUgZnJvbSB0aGUgbWVzc2FnZSBib2R5LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5IC0gVGhlIG1lc3NhZ2UgYm9keS5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBjaGVjay1pbiBtb2RlIGlzIHBhcnNlZCwgb3RoZXJ3aXNlIGZhbHNlLlxuICAgICAqL1xuICAgIHBhcnNlX2NoZWNraW4oYm9keTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHBhcnNlZCA9IHRoaXMuY2hlY2tpbl92YWx1ZXMucGFyc2VfY2hlY2tpbihib2R5KTtcbiAgICAgICAgaWYgKHBhcnNlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNraW5fbW9kZSA9IHBhcnNlZC5rZXk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIHRoZSBjaGVjay1pbiBtb2RlIGZyb20gdGhlIG5leHQgc3RlcC5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBjaGVjay1pbiBtb2RlIGlzIHBhcnNlZCwgb3RoZXJ3aXNlIGZhbHNlLlxuICAgICAqL1xuICAgIHBhcnNlX2NoZWNraW5fZnJvbV9uZXh0X3N0ZXAoKSB7XG4gICAgICAgIGNvbnN0IGxhc3Rfc2VnbWVudCA9IHRoaXMuYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXBcbiAgICAgICAgICAgID8uc3BsaXQoXCItXCIpXG4gICAgICAgICAgICAuc2xpY2UoLTEpWzBdO1xuICAgICAgICBpZiAobGFzdF9zZWdtZW50ICYmIGxhc3Rfc2VnbWVudCBpbiB0aGlzLmNoZWNraW5fdmFsdWVzLmJ5X2tleSkge1xuICAgICAgICAgICAgdGhpcy5jaGVja2luX21vZGUgPSBsYXN0X3NlZ21lbnQ7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIHRoZSBwYXNzIHR5cGUgZnJvbSB0aGUgbmV4dCBzdGVwLlxuICAgICAqIEByZXR1cm5zIHtDb21wUGFzc1R5cGV9IFRoZSBwYXJzZWQgcGFzcyB0eXBlLlxuICAgICAqL1xuICAgIHBhcnNlX3Bhc3NfZnJvbV9uZXh0X3N0ZXAoKSB7XG4gICAgICAgIGNvbnN0IGxhc3Rfc2VnbWVudCA9IHRoaXMuYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXBcbiAgICAgICAgICAgID8uc3BsaXQoXCItXCIpXG4gICAgICAgICAgICAuc2xpY2UoLTIpXG4gICAgICAgICAgICAuam9pbihcIi1cIik7XG4gICAgICAgIHJldHVybiBsYXN0X3NlZ21lbnQgYXMgQ29tcFBhc3NUeXBlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlbGF5cyB0aGUgZXhlY3V0aW9uIGZvciBhIHNwZWNpZmllZCBudW1iZXIgb2Ygc2Vjb25kcy5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2Vjb25kcyAtIFRoZSBudW1iZXIgb2Ygc2Vjb25kcyB0byBkZWxheS5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25hbD1mYWxzZV0gLSBXaGV0aGVyIHRoZSBkZWxheSBpcyBvcHRpb25hbC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgYWZ0ZXIgdGhlIGRlbGF5LlxuICAgICAqL1xuICAgIGRlbGF5KHNlY29uZHM6IG51bWJlciwgb3B0aW9uYWw6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBpZiAob3B0aW9uYWwgJiYgIXRoaXMuc21zX3JlcXVlc3QpIHtcbiAgICAgICAgICAgIHNlY29uZHMgPSAxIC8gMTAwMC4wO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzKSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJlcywgc2Vjb25kcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbmRzIGEgbWVzc2FnZSB0byB0aGUgdXNlci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIFRoZSBtZXNzYWdlIHRvIHNlbmQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIG1lc3NhZ2UgaXMgc2VudC5cbiAgICAgKi9cbiAgICBhc3luYyBzZW5kX21lc3NhZ2UobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLnNtc19yZXF1ZXN0KSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmdldF90d2lsaW9fY2xpZW50KCkubWVzc2FnZXMuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICB0bzogdGhpcy5mcm9tLFxuICAgICAgICAgICAgICAgIGZyb206IHRoaXMudG8sXG4gICAgICAgICAgICAgICAgYm9keTogbWVzc2FnZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZXN1bHRfbWVzc2FnZXMucHVzaChtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgdGhlIGNoZWNrLWluIHByb2Nlc3MuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBjaGVjay1pbiByZXNwb25zZS5cbiAgICAgKi9cbiAgICBhc3luYyBoYW5kbGUoKTogUHJvbWlzZTxCVk5TUENoZWNraW5SZXNwb25zZT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLl9oYW5kbGUoKTtcbiAgICAgICAgaWYgKCF0aGlzLnNtc19yZXF1ZXN0KSB7XG4gICAgICAgICAgICBpZiAocmVzdWx0Py5yZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0X21lc3NhZ2VzLnB1c2gocmVzdWx0LnJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IHRoaXMucmVzdWx0X21lc3NhZ2VzLmpvaW4oXCJcXG4jIyNcXG5cIiksXG4gICAgICAgICAgICAgICAgbmV4dF9zdGVwOiByZXN1bHQ/Lm5leHRfc3RlcCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbnRlcm5hbCBtZXRob2QgdG8gaGFuZGxlIHRoZSBjaGVjay1pbiBwcm9jZXNzLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQQ2hlY2tpblJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgY2hlY2staW4gcmVzcG9uc2UuXG4gICAgICovXG4gICAgYXN5bmMgX2hhbmRsZSgpOiBQcm9taXNlPEJWTlNQQ2hlY2tpblJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgYFJlY2VpdmVkIHJlcXVlc3QgZnJvbSAke3RoaXMuZnJvbX0gd2l0aCBib2R5OiAke3RoaXMuYm9keX0gYW5kIHN0YXRlICR7dGhpcy5idm5zcF9jaGVja2luX25leHRfc3RlcH1gXG4gICAgICAgICk7XG4gICAgICAgIGlmICh0aGlzLmJvZHkgPT0gXCJsb2dvdXRcIikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmZvcm1pbmcgbG9nb3V0YCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5sb2dvdXQoKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVzcG9uc2U6IEJWTlNQQ2hlY2tpblJlc3BvbnNlIHwgdW5kZWZpbmVkO1xuICAgICAgICBpZiAoIXRoaXMuY29uZmlnLlVTRV9TRVJWSUNFX0FDQ09VTlQpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlID0gYXdhaXQgdGhpcy5jaGVja191c2VyX2NyZWRzKCk7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UpIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5ib2R5ID09IFwicmVzdGFydFwiKSB7XG4gICAgICAgICAgICByZXR1cm4geyByZXNwb25zZTogXCJPa2F5LiBUZXh0IG1lIGFnYWluIHRvIHN0YXJ0IG92ZXIuLi5cIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmdldF9tYXBwZWRfcGF0cm9sbGVyKCk7XG4gICAgICAgIGlmIChyZXNwb25zZSB8fCB0aGlzLnBhdHJvbGxlciA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIHJlc3BvbnNlIHx8IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2U6IFwiVW5leHBlY3RlZCBlcnJvciBsb29raW5nIHVwIHBhdHJvbGxlciBtYXBwaW5nXCIsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgICghdGhpcy5idm5zcF9jaGVja2luX25leHRfc3RlcCB8fFxuICAgICAgICAgICAgICAgIHRoaXMuYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXAgPT0gTkVYVF9TVEVQUy5BV0FJVF9DT01NQU5EKSAmJlxuICAgICAgICAgICAgdGhpcy5ib2R5XG4gICAgICAgICkge1xuICAgICAgICAgICAgY29uc3QgYXdhaXRfcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmhhbmRsZV9hd2FpdF9jb21tYW5kKCk7XG4gICAgICAgICAgICBpZiAoYXdhaXRfcmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXRfcmVzcG9uc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICB0aGlzLmJ2bnNwX2NoZWNraW5fbmV4dF9zdGVwID09IE5FWFRfU1RFUFMuQVdBSVRfQ0hFQ0tJTiAmJlxuICAgICAgICAgICAgdGhpcy5ib2R5XG4gICAgICAgICkge1xuICAgICAgICAgICAgaWYgKHRoaXMucGFyc2VfY2hlY2tpbih0aGlzLmJvZHkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuY2hlY2tpbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgdGhpcy5idm5zcF9jaGVja2luX25leHRfc3RlcD8uc3RhcnRzV2l0aChcbiAgICAgICAgICAgICAgICBORVhUX1NURVBTLkNPTkZJUk1fUkVTRVRcbiAgICAgICAgICAgICkgJiZcbiAgICAgICAgICAgIHRoaXMuYm9keVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmJvZHkgPT0gXCJ5ZXNcIiAmJiB0aGlzLnBhcnNlX2NoZWNraW5fZnJvbV9uZXh0X3N0ZXAoKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgICAgICBgUGVyZm9ybWluZyByZXNldF9zaGVldF9mbG93IGZvciAke3RoaXMucGF0cm9sbGVyLm5hbWV9IHdpdGggY2hlY2tpbiBtb2RlOiAke3RoaXMuY2hlY2tpbl9tb2RlfWBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIChhd2FpdCB0aGlzLnJlc2V0X3NoZWV0X2Zsb3coKSkgfHwgKGF3YWl0IHRoaXMuY2hlY2tpbigpKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICB0aGlzLmJ2bnNwX2NoZWNraW5fbmV4dF9zdGVwPy5zdGFydHNXaXRoKE5FWFRfU1RFUFMuQVVUSF9SRVNFVClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wYXJzZV9jaGVja2luX2Zyb21fbmV4dF9zdGVwKCkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICAgICAgYFBlcmZvcm1pbmcgcmVzZXRfc2hlZXRfZmxvdy1wb3N0LWF1dGggZm9yICR7dGhpcy5wYXRyb2xsZXIubmFtZX0gd2l0aCBjaGVja2luIG1vZGU6ICR7dGhpcy5jaGVja2luX21vZGV9YFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgKGF3YWl0IHRoaXMucmVzZXRfc2hlZXRfZmxvdygpKSB8fCAoYXdhaXQgdGhpcy5jaGVja2luKCkpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHRoaXMuYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXA/LnN0YXJ0c1dpdGgoTkVYVF9TVEVQUy5BV0FJVF9QQVNTKSAmJlxuICAgICAgICAgICAgdGhpcy5ib2R5XG4gICAgICAgICkge1xuICAgICAgICAgICAgY29uc3QgdHlwZSA9IHRoaXMucGFyc2VfcGFzc19mcm9tX25leHRfc3RlcCgpO1xuICAgICAgICAgICAgY29uc3QgZ3Vlc3RfbmFtZSA9IHRoaXMuYm9keTtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBndWVzdF9uYW1lLnRyaW0oKSAhPT0gXCJcIiAmJlxuICAgICAgICAgICAgICAgIFtDb21wUGFzc1R5cGUuQ29tcFBhc3MsIENvbXBQYXNzVHlwZS5NYW5hZ2VyUGFzc10uaW5jbHVkZXModHlwZSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnByb21wdF9jb21wX21hbmFnZXJfcGFzcyh0eXBlLCBndWVzdF9uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmJ2bnNwX2NoZWNraW5fbmV4dF9zdGVwKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnNlbmRfbWVzc2FnZShcIlNvcnJ5LCBJIGRpZG4ndCB1bmRlcnN0YW5kIHRoYXQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnByb21wdF9jb21tYW5kKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlcyB0aGUgYXdhaXQgY29tbWFuZCBzdGVwLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQQ2hlY2tpblJlc3BvbnNlIHwgdW5kZWZpbmVkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcmVzcG9uc2Ugb3IgdW5kZWZpbmVkLlxuICAgICAqL1xuICAgIGFzeW5jIGhhbmRsZV9hd2FpdF9jb21tYW5kKCk6IFByb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2UgfCB1bmRlZmluZWQ+IHtcbiAgICAgICAgY29uc3QgcGF0cm9sbGVyX25hbWUgPSB0aGlzLnBhdHJvbGxlciEubmFtZTtcbiAgICAgICAgaWYgKHRoaXMucGFyc2VfZmFzdF9jaGVja2luX21vZGUodGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgIGBQZXJmb3JtaW5nIGZhc3QgY2hlY2tpbiBmb3IgJHtwYXRyb2xsZXJfbmFtZX0gd2l0aCBtb2RlOiAke3RoaXMuY2hlY2tpbl9tb2RlfWBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5jaGVja2luKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKENPTU1BTkRTLk9OX0RVVFkuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIGdldF9vbl9kdXR5IGZvciAke3BhdHJvbGxlcl9uYW1lfWApO1xuICAgICAgICAgICAgcmV0dXJuIHsgcmVzcG9uc2U6IGF3YWl0IHRoaXMuZ2V0X29uX2R1dHkoKSB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ2hlY2tpbmcgZm9yIHN0YXR1cy4uLlwiKTtcbiAgICAgICAgaWYgKENPTU1BTkRTLlNUQVRVUy5pbmNsdWRlcyh0aGlzLmJvZHkhKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmZvcm1pbmcgZ2V0X3N0YXR1cyBmb3IgJHtwYXRyb2xsZXJfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldF9zdGF0dXMoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQ09NTUFORFMuQ0hFQ0tJTi5pbmNsdWRlcyh0aGlzLmJvZHkhKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmZvcm1pbmcgcHJvbXB0X2NoZWNraW4gZm9yICR7cGF0cm9sbGVyX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9tcHRfY2hlY2tpbigpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDT01NQU5EUy5DT01QX1BBU1MuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIGNvbXBfcGFzcyBmb3IgJHtwYXRyb2xsZXJfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnByb21wdF9jb21wX21hbmFnZXJfcGFzcyhcbiAgICAgICAgICAgICAgICBDb21wUGFzc1R5cGUuQ29tcFBhc3MsXG4gICAgICAgICAgICAgICAgbnVsbFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQ09NTUFORFMuTUFOQUdFUl9QQVNTLmluY2x1ZGVzKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBtYW5hZ2VyX3Bhc3MgZm9yICR7cGF0cm9sbGVyX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5wcm9tcHRfY29tcF9tYW5hZ2VyX3Bhc3MoXG4gICAgICAgICAgICAgICAgQ29tcFBhc3NUeXBlLk1hbmFnZXJQYXNzLFxuICAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKENPTU1BTkRTLldIQVRTQVBQLmluY2x1ZGVzKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgSSdtIGF2YWlsYWJsZSBvbiB3aGF0c2FwcCBhcyB3ZWxsISBXaGF0c2FwcCB1c2VzIFdpZmkvQ2VsbCBEYXRhIGluc3RlYWQgb2YgU01TLCBhbmQgY2FuIGJlIG1vcmUgcmVsaWFibGUuIE1lc3NhZ2UgbWUgYXQgaHR0cHM6Ly93YS5tZS8xJHt0aGlzLnRvfWAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvbXB0cyB0aGUgdXNlciBmb3IgYSBjb21tYW5kLlxuICAgICAqIEByZXR1cm5zIHtCVk5TUENoZWNraW5SZXNwb25zZX0gVGhlIHJlc3BvbnNlIHByb21wdGluZyB0aGUgdXNlciBmb3IgYSBjb21tYW5kLlxuICAgICAqL1xuICAgIHByb21wdF9jb21tYW5kKCk6IEJWTlNQQ2hlY2tpblJlc3BvbnNlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3BvbnNlOiBgJHt0aGlzLnBhdHJvbGxlciEubmFtZX0sIEknbSBCVk5TUCBCb3QuIFxuRW50ZXIgYSBjb21tYW5kOlxuQ2hlY2sgaW4gLyBDaGVjayBvdXQgLyBTdGF0dXMgLyBPbiBEdXR5IC8gQ29tcCBQYXNzIC8gTWFuYWdlciBQYXNzIC8gV2hhdHNhcHBcblNlbmQgJ3Jlc3RhcnQnIGF0IGFueSB0aW1lIHRvIGJlZ2luIGFnYWluYCxcbiAgICAgICAgICAgIG5leHRfc3RlcDogTkVYVF9TVEVQUy5BV0FJVF9DT01NQU5ELFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb21wdHMgdGhlIHVzZXIgZm9yIGEgY2hlY2staW4uXG4gICAgICogQHJldHVybnMge0JWTlNQQ2hlY2tpblJlc3BvbnNlfSBUaGUgcmVzcG9uc2UgcHJvbXB0aW5nIHRoZSB1c2VyIGZvciBhIGNoZWNrLWluLlxuICAgICAqL1xuICAgIHByb21wdF9jaGVja2luKCk6IEJWTlNQQ2hlY2tpblJlc3BvbnNlIHtcbiAgICAgICAgY29uc3QgdHlwZXMgPSBPYmplY3QudmFsdWVzKHRoaXMuY2hlY2tpbl92YWx1ZXMuYnlfa2V5KS5tYXAoXG4gICAgICAgICAgICAoeCkgPT4geC5zbXNfZGVzY1xuICAgICAgICApO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IGAke1xuICAgICAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyIS5uYW1lXG4gICAgICAgICAgICB9LCB1cGRhdGUgcGF0cm9sbGluZyBzdGF0dXMgdG86ICR7dHlwZXNcbiAgICAgICAgICAgICAgICAuc2xpY2UoMCwgLTEpXG4gICAgICAgICAgICAgICAgLmpvaW4oXCIsIFwiKX0sIG9yICR7dHlwZXMuc2xpY2UoLTEpfT9gLFxuICAgICAgICAgICAgbmV4dF9zdGVwOiBORVhUX1NURVBTLkFXQUlUX0NIRUNLSU4sXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvbXB0cyB0aGUgdXNlciBmb3IgYSBjb21wIG9yIG1hbmFnZXIgcGFzcy5cbiAgICAgKiBAcGFyYW0ge0NvbXBQYXNzVHlwZX0gcGFzc190eXBlIC0gVGhlIHR5cGUgb2YgcGFzcy5cbiAgICAgKiBAcGFyYW0ge251bWJlciB8IG51bGx9IHBhc3Nlc190b191c2UgLSBUaGUgbnVtYmVyIG9mIHBhc3NlcyB0byB1c2UuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSByZXNwb25zZS5cbiAgICAgKi9cbiAgICBhc3luYyBwcm9tcHRfY29tcF9tYW5hZ2VyX3Bhc3MoXG4gICAgICAgIHBhc3NfdHlwZTogQ29tcFBhc3NUeXBlLFxuICAgICAgICBndWVzdF9uYW1lOiBzdHJpbmcgfCBudWxsXG4gICAgKTogUHJvbWlzZTxCVk5TUENoZWNraW5SZXNwb25zZT4ge1xuICAgICAgICBpZiAodGhpcy5wYXRyb2xsZXIhLmNhdGVnb3J5ID09IFwiQ1wiKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgJHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXIhLm5hbWVcbiAgICAgICAgICAgICAgICB9LCBjYW5kaWRhdGVzIGRvIG5vdCByZWNlaXZlIGNvbXAgb3IgbWFuYWdlciBwYXNzZXMuYCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2hlZXQ6IFBhc3NTaGVldCA9IGF3YWl0IChwYXNzX3R5cGUgPT0gQ29tcFBhc3NUeXBlLkNvbXBQYXNzXG4gICAgICAgICAgICA/IHRoaXMuZ2V0X2NvbXBfcGFzc19zaGVldCgpXG4gICAgICAgICAgICA6IHRoaXMuZ2V0X21hbmFnZXJfcGFzc19zaGVldCgpKTtcblxuICAgICAgICBjb25zdCB1c2VkX2FuZF9hdmFpbGFibGUgPSBhd2FpdCBzaGVldC5nZXRfYXZhaWxhYmxlX2FuZF91c2VkX3Bhc3NlcyhcbiAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyPy5uYW1lIVxuICAgICAgICApO1xuICAgICAgICBpZiAodXNlZF9hbmRfYXZhaWxhYmxlID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IFwiUHJvYmxlbSBsb29raW5nIHVwIHBhdHJvbGxlciBmb3IgY29tcCBwYXNzZXNcIixcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGd1ZXN0X25hbWUgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHVzZWRfYW5kX2F2YWlsYWJsZS5nZXRfcHJvbXB0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oYHVzZV8ke3Bhc3NfdHlwZX1gKTtcbiAgICAgICAgICAgIGF3YWl0IHNoZWV0LnNldF91c2VkX2NvbXBfcGFzc2VzKHVzZWRfYW5kX2F2YWlsYWJsZSwgZ3Vlc3RfbmFtZSk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgVXBkYXRlZCAke1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICAgICAgICAgIH0gdG8gdXNlICR7Z2V0X2NvbXBfcGFzc19kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgcGFzc190eXBlXG4gICAgICAgICAgICAgICAgKX0gZm9yIGd1ZXN0ICR7Z3Vlc3RfbmFtZX0gdG9kYXkuYCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBzdGF0dXMgb2YgdGhlIHBhdHJvbGxlci5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUENoZWNraW5SZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHN0YXR1cyByZXNwb25zZS5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfc3RhdHVzKCk6IFByb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuICAgICAgICBjb25zdCBzaGVldF9kYXRlID0gbG9naW5fc2hlZXQuc2hlZXRfZGF0ZS50b0RhdGVTdHJpbmcoKTtcbiAgICAgICAgY29uc3QgY3VycmVudF9kYXRlID0gbG9naW5fc2hlZXQuY3VycmVudF9kYXRlLnRvRGF0ZVN0cmluZygpO1xuICAgICAgICBpZiAoIWxvZ2luX3NoZWV0LmlzX2N1cnJlbnQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBzaGVldF9kYXRlOiAke2xvZ2luX3NoZWV0LnNoZWV0X2RhdGV9YCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgY3VycmVudF9kYXRlOiAke2xvZ2luX3NoZWV0LmN1cnJlbnRfZGF0ZX1gKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBTaGVldCBpcyBub3QgY3VycmVudCBmb3IgdG9kYXkgKGxhc3QgcmVzZXQ6ICR7c2hlZXRfZGF0ZX0pLiAke1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICAgICAgICAgIH0gaXMgbm90IGNoZWNrZWQgaW4gZm9yICR7Y3VycmVudF9kYXRlfS5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXNwb25zZSA9IHsgcmVzcG9uc2U6IGF3YWl0IHRoaXMuZ2V0X3N0YXR1c19zdHJpbmcoKSB9O1xuICAgICAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oXCJzdGF0dXNcIik7XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBzdGF0dXMgc3RyaW5nIG9mIHRoZSBwYXRyb2xsZXIuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c3RyaW5nPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgc3RhdHVzIHN0cmluZy5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfc3RhdHVzX3N0cmluZygpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG4gICAgICAgIGNvbnN0IGNvbXBfcGFzc19wcm9taXNlID0gKFxuICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXRfY29tcF9wYXNzX3NoZWV0KClcbiAgICAgICAgKS5nZXRfYXZhaWxhYmxlX2FuZF91c2VkX3Bhc3Nlcyh0aGlzLnBhdHJvbGxlciEubmFtZSk7XG4gICAgICAgIGNvbnN0IG1hbmFnZXJfcGFzc19wcm9taXNlID0gKFxuICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXRfbWFuYWdlcl9wYXNzX3NoZWV0KClcbiAgICAgICAgKS5nZXRfYXZhaWxhYmxlX2FuZF91c2VkX3Bhc3Nlcyh0aGlzLnBhdHJvbGxlciEubmFtZSk7XG4gICAgICAgIGNvbnN0IHBhdHJvbGxlcl9zdGF0dXMgPSB0aGlzLnBhdHJvbGxlciE7XG5cbiAgICAgICAgY29uc3QgY2hlY2tpbkNvbHVtblNldCA9XG4gICAgICAgICAgICBwYXRyb2xsZXJfc3RhdHVzLmNoZWNraW4gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgcGF0cm9sbGVyX3N0YXR1cy5jaGVja2luICE9PSBudWxsO1xuICAgICAgICBjb25zdCBjaGVja2VkT3V0ID1cbiAgICAgICAgICAgIGNoZWNraW5Db2x1bW5TZXQgJiZcbiAgICAgICAgICAgIHRoaXMuY2hlY2tpbl92YWx1ZXMuYnlfc2hlZXRfc3RyaW5nW3BhdHJvbGxlcl9zdGF0dXMuY2hlY2tpbl0ua2V5ID09XG4gICAgICAgICAgICAgICAgXCJvdXRcIjtcbiAgICAgICAgbGV0IHN0YXR1cyA9IHBhdHJvbGxlcl9zdGF0dXMuY2hlY2tpbiB8fCBcIk5vdCBQcmVzZW50XCI7XG5cbiAgICAgICAgaWYgKGNoZWNrZWRPdXQpIHtcbiAgICAgICAgICAgIHN0YXR1cyA9IFwiQ2hlY2tlZCBPdXRcIjtcbiAgICAgICAgfSBlbHNlIGlmIChjaGVja2luQ29sdW1uU2V0KSB7XG4gICAgICAgICAgICBsZXQgc2VjdGlvbiA9IHBhdHJvbGxlcl9zdGF0dXMuc2VjdGlvbi50b1N0cmluZygpO1xuICAgICAgICAgICAgaWYgKHNlY3Rpb24ubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgICAgICBzZWN0aW9uID0gYFNlY3Rpb24gJHtzZWN0aW9ufWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdGF0dXMgPSBgJHtwYXRyb2xsZXJfc3RhdHVzLmNoZWNraW59ICgke3NlY3Rpb259KWA7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb21wbGV0ZWRQYXRyb2xEYXlzID0gYXdhaXQgKFxuICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXRfc2Vhc29uX3NoZWV0KClcbiAgICAgICAgKS5nZXRfcGF0cm9sbGVkX2RheXModGhpcy5wYXRyb2xsZXIhLm5hbWUpO1xuICAgICAgICBjb25zdCBjb21wbGV0ZWRQYXRyb2xEYXlzU3RyaW5nID1cbiAgICAgICAgICAgIGNvbXBsZXRlZFBhdHJvbERheXMgPiAwID8gY29tcGxldGVkUGF0cm9sRGF5cy50b1N0cmluZygpIDogXCJOb1wiO1xuICAgICAgICBjb25zdCBsb2dpblNoZWV0RGF0ZSA9IGxvZ2luX3NoZWV0LnNoZWV0X2RhdGUudG9EYXRlU3RyaW5nKCk7XG5cbiAgICAgICAgbGV0IHN0YXR1c1N0cmluZyA9IGBTdGF0dXMgZm9yICR7XG4gICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICB9IG9uIGRhdGUgJHtsb2dpblNoZWV0RGF0ZX06ICR7c3RhdHVzfS5cXG4ke2NvbXBsZXRlZFBhdHJvbERheXNTdHJpbmd9IGNvbXBsZXRlZCBwYXRyb2wgZGF5cyBwcmlvciB0byB0b2RheS5gO1xuICAgICAgICBjb25zdCB1c2VkVG9kYXlDb21wUGFzc2VzID0gKGF3YWl0IGNvbXBfcGFzc19wcm9taXNlKT8udXNlZF90b2RheTtcbiAgICAgICAgY29uc3QgdXNlZFRvZGF5TWFuYWdlclBhc3NlcyA9IChhd2FpdCBtYW5hZ2VyX3Bhc3NfcHJvbWlzZSk/LnVzZWRfdG9kYXk7XG4gICAgICAgIGNvbnN0IHVzZWRTZWFzb25Db21wUGFzc2VzID0gKGF3YWl0IGNvbXBfcGFzc19wcm9taXNlKT8udXNlZF9zZWFzb247XG4gICAgICAgIGNvbnN0IHVzZWRTZWFzb25NYW5hZ2VyUGFzc2VzID0gKGF3YWl0IG1hbmFnZXJfcGFzc19wcm9taXNlKT8udXNlZF9zZWFzb247XG4gICAgICAgIGNvbnN0IGF2YWlsYWJsZUNvbXBQYXNzZXMgPSAoYXdhaXQgY29tcF9wYXNzX3Byb21pc2UpPy5hdmFpbGFibGU7XG4gICAgICAgIGNvbnN0IGF2YWlsYWJsZU1hbmFnZXJQYXNzZXMgPSAoYXdhaXQgbWFuYWdlcl9wYXNzX3Byb21pc2UpPy5hdmFpbGFibGU7XG4gICAgICAgIHN0YXR1c1N0cmluZyArPSBgIFlvdSBoYXZlIHVzZWQgJHt1c2VkU2Vhc29uQ29tcFBhc3Nlc30gY29tcCBwYXNzJHt1c2VkU2Vhc29uQ29tcFBhc3NlcyAhPSAxID8gJ2VzJyA6ICcnfSB0aGlzIHNlYXNvbi5gO1xuICAgICAgICBpZiAodXNlZFRvZGF5Q29tcFBhc3Nlcykge1xuICAgICAgICAgICAgc3RhdHVzU3RyaW5nICs9IGAgWW91IGFyZSB1c2luZyAke3VzZWRUb2RheUNvbXBQYXNzZXN9IGNvbXAgcGFzcyR7dXNlZFRvZGF5Q29tcFBhc3NlcyAhPSAxID8gJ2VzJyA6ICcnfSB0b2RheS5gO1xuICAgICAgICB9XG4gICAgICAgIHN0YXR1c1N0cmluZyArPSBgIFlvdSBoYXZlICAke2F2YWlsYWJsZUNvbXBQYXNzZXN9IGNvbXAgcGFzcyR7YXZhaWxhYmxlQ29tcFBhc3NlcyAhPSAxID8gJ2VzJyA6ICcnfSByZW1haW5pbmcgdGhpcyBzZWFzb24uYDtcbiAgICAgICAgc3RhdHVzU3RyaW5nICs9IGAgWW91IGhhdmUgdXNlZCAke3VzZWRTZWFzb25NYW5hZ2VyUGFzc2VzfSBtYW5hZ2VyIHBhc3Mke3VzZWRTZWFzb25NYW5hZ2VyUGFzc2VzICE9IDEgPyAnZXMnIDogJyd9IHRoaXMgc2Vhc29uLmA7XG4gICAgICAgIGlmICh1c2VkVG9kYXlNYW5hZ2VyUGFzc2VzKSB7XG4gICAgICAgICAgICBzdGF0dXNTdHJpbmcgKz0gYCBZb3UgYXJlIHVzaW5nICR7dXNlZFRvZGF5TWFuYWdlclBhc3Nlc30gbWFuYWdlciBwYXNzJHt1c2VkVG9kYXlNYW5hZ2VyUGFzc2VzICE9IDEgPyAnZXMnIDogJyd9IHRvZGF5LmA7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdHVzU3RyaW5nICs9IGAgWW91IGhhdmUgICR7YXZhaWxhYmxlTWFuYWdlclBhc3Nlc30gbWFuYWdlciBwYXNzJHthdmFpbGFibGVNYW5hZ2VyUGFzc2VzICE9IDEgPyAnZXMnIDogJyd9IHJlbWFpbmluZyB0aGlzIHNlYXNvbi5gO1xuICAgICAgICByZXR1cm4gc3RhdHVzU3RyaW5nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogUGVyZm9ybXMgdGhlIGNoZWNrLWluIHByb2Nlc3MgZm9yIHRoZSBwYXRyb2xsZXIuXG4gICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUENoZWNraW5SZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGNoZWNrLWluIHJlc3BvbnNlLlxuICAgICogQHRocm93cyB7RXJyb3J9IFRocm93cyBhbiBlcnJvciBpZiB0aGUgY2hlY2staW4gbW9kZSBpcyBpbXByb3Blcmx5IHNldC5cbiAgICAqL1xuICAgIGFzeW5jIGNoZWNraW4oKTogUHJvbWlzZTxCVk5TUENoZWNraW5SZXNwb25zZT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgIGBQZXJmb3JtaW5nIHJlZ3VsYXIgY2hlY2tpbiBmb3IgJHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICAgICAgfSB3aXRoIG1vZGU6ICR7dGhpcy5jaGVja2luX21vZGV9YFxuICAgICAgICApO1xuICAgICAgICBpZiAoYXdhaXQgdGhpcy5zaGVldF9uZWVkc19yZXNldCgpKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOlxuICAgICAgICAgICAgICAgICAgICBgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyIS5uYW1lXG4gICAgICAgICAgICAgICAgICAgIH0sIHlvdSBhcmUgdGhlIGZpcnN0IHBlcnNvbiB0byBjaGVjayBpbiB0b2RheS4gYCArXG4gICAgICAgICAgICAgICAgICAgIGBJIG5lZWQgdG8gYXJjaGl2ZSBhbmQgcmVzZXQgdGhlIHNoZWV0IGJlZm9yZSBjb250aW51aW5nLiBgICtcbiAgICAgICAgICAgICAgICAgICAgYFdvdWxkIHlvdSBsaWtlIG1lIHRvIGRvIHRoYXQ/IChZZXMvTm8pYCxcbiAgICAgICAgICAgICAgICBuZXh0X3N0ZXA6IGAke05FWFRfU1RFUFMuQ09ORklSTV9SRVNFVH0tJHt0aGlzLmNoZWNraW5fbW9kZX1gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY2hlY2tpbl9tb2RlO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICAhdGhpcy5jaGVja2luX21vZGUgfHxcbiAgICAgICAgICAgIChjaGVja2luX21vZGUgPSB0aGlzLmNoZWNraW5fdmFsdWVzLmJ5X2tleVt0aGlzLmNoZWNraW5fbW9kZV0pID09PVxuICAgICAgICAgICAgICAgIHVuZGVmaW5lZFxuICAgICAgICApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNoZWNraW4gbW9kZSBpbXByb3Blcmx5IHNldFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKTtcbiAgICAgICAgY29uc3QgbmV3X2NoZWNraW5fdmFsdWUgPSBjaGVja2luX21vZGUuc2hlZXRzX3ZhbHVlO1xuICAgICAgICBhd2FpdCBsb2dpbl9zaGVldC5jaGVja2luKHRoaXMucGF0cm9sbGVyISwgbmV3X2NoZWNraW5fdmFsdWUpO1xuICAgICAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oYHVwZGF0ZS1zdGF0dXMoJHtuZXdfY2hlY2tpbl92YWx1ZX0pYCk7XG4gICAgICAgIGF3YWl0IHRoaXMubG9naW5fc2hlZXQ/LnJlZnJlc2goKTtcbiAgICAgICAgYXdhaXQgdGhpcy5nZXRfbWFwcGVkX3BhdHJvbGxlcih0cnVlKTtcblxuICAgICAgICBsZXQgcmVzcG9uc2UgPSBgVXBkYXRpbmcgJHtcbiAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyIS5uYW1lXG4gICAgICAgIH0gd2l0aCBzdGF0dXM6ICR7bmV3X2NoZWNraW5fdmFsdWV9LmA7XG4gICAgICAgIGlmICghdGhpcy5mYXN0X2NoZWNraW4pIHtcbiAgICAgICAgICAgIHJlc3BvbnNlICs9IGAgWW91IGNhbiBzZW5kICcke2NoZWNraW5fbW9kZS5mYXN0X2NoZWNraW5zWzBdfScgYXMgeW91ciBmaXJzdCBtZXNzYWdlIGZvciBhIGZhc3QgJHtjaGVja2luX21vZGUuc2hlZXRzX3ZhbHVlfSBjaGVja2luIG5leHQgdGltZS5gO1xuICAgICAgICB9XG4gICAgICAgIHJlc3BvbnNlICs9IFwiXFxuXFxuXCIgKyAoYXdhaXQgdGhpcy5nZXRfc3RhdHVzX3N0cmluZygpKTtcbiAgICAgICAgcmV0dXJuIHsgcmVzcG9uc2U6IHJlc3BvbnNlIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHRoZSBHb29nbGUgU2hlZXRzIG5lZWRzIHRvIGJlIHJlc2V0LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0cnVlIGlmIHRoZSBzaGVldCBuZWVkcyB0byBiZSByZXNldCwgb3RoZXJ3aXNlIGZhbHNlLlxuICAgICAqL1xuICAgIGFzeW5jIHNoZWV0X25lZWRzX3Jlc2V0KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG5cbiAgICAgICAgY29uc3Qgc2hlZXRfZGF0ZSA9IGxvZ2luX3NoZWV0LnNoZWV0X2RhdGU7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfZGF0ZSA9IGxvZ2luX3NoZWV0LmN1cnJlbnRfZGF0ZTtcbiAgICAgICAgY29uc29sZS5sb2coYHNoZWV0X2RhdGU6ICR7c2hlZXRfZGF0ZX1gKTtcbiAgICAgICAgY29uc29sZS5sb2coYGN1cnJlbnRfZGF0ZTogJHtjdXJyZW50X2RhdGV9YCk7XG5cbiAgICAgICAgY29uc29sZS5sb2coYGRhdGVfaXNfY3VycmVudDogJHtsb2dpbl9zaGVldC5pc19jdXJyZW50fWApO1xuXG4gICAgICAgIHJldHVybiAhbG9naW5fc2hlZXQuaXNfY3VycmVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXNldHMgdGhlIEdvb2dsZSBTaGVldHMgZmxvdywgaW5jbHVkaW5nIGFyY2hpdmluZyBhbmQgcmVzZXR0aW5nIHRoZSBzaGVldCBpZiBuZWNlc3NhcnkuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2UgfCB2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgY2hlY2staW4gcmVzcG9uc2Ugb3Igdm9pZC5cbiAgICAgKi9cbiAgICBhc3luYyByZXNldF9zaGVldF9mbG93KCk6IFByb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2UgfCB2b2lkPiB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5jaGVja191c2VyX2NyZWRzKFxuICAgICAgICAgICAgYCR7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXIhLm5hbWVcbiAgICAgICAgICAgIH0sIGluIG9yZGVyIHRvIHJlc2V0L2FyY2hpdmUsIEkgbmVlZCB5b3UgdG8gYXV0aG9yaXplIHRoZSBhcHAuYFxuICAgICAgICApO1xuICAgICAgICBpZiAocmVzcG9uc2UpXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiByZXNwb25zZS5yZXNwb25zZSxcbiAgICAgICAgICAgICAgICBuZXh0X3N0ZXA6IGAke05FWFRfU1RFUFMuQVVUSF9SRVNFVH0tJHt0aGlzLmNoZWNraW5fbW9kZX1gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucmVzZXRfc2hlZXQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXNldHMgdGhlIEdvb2dsZSBTaGVldHMsIGluY2x1ZGluZyBhcmNoaXZpbmcgYW5kIHJlc2V0dGluZyB0aGUgc2hlZXQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHNoZWV0IGlzIHJlc2V0LlxuICAgICAqL1xuICAgIGFzeW5jIHJlc2V0X3NoZWV0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCBzY3JpcHRfc2VydmljZSA9IGF3YWl0IHRoaXMuZ2V0X3VzZXJfc2NyaXB0c19zZXJ2aWNlKCk7XG4gICAgICAgIGNvbnN0IHNob3VsZF9wZXJmb3JtX2FyY2hpdmUgPSAhKGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCkpLmFyY2hpdmVkO1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gc2hvdWxkX3BlcmZvcm1fYXJjaGl2ZVxuICAgICAgICAgICAgPyBcIk9rYXkuIEFyY2hpdmluZyBhbmQgcmVzZXRpbmcgdGhlIGNoZWNrIGluIHNoZWV0LiBUaGlzIHRha2VzIGFib3V0IDEwIHNlY29uZHMuLi5cIlxuICAgICAgICAgICAgOiBcIk9rYXkuIFNoZWV0IGhhcyBhbHJlYWR5IGJlZW4gYXJjaGl2ZWQuIFBlcmZvcm1pbmcgcmVzZXQuIFRoaXMgdGFrZXMgYWJvdXQgNSBzZWNvbmRzLi4uXCI7XG4gICAgICAgIGF3YWl0IHRoaXMuc2VuZF9tZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICBpZiAoc2hvdWxkX3BlcmZvcm1fYXJjaGl2ZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJBcmNoaXZpbmcuLi5cIik7XG5cbiAgICAgICAgICAgIGF3YWl0IHNjcmlwdF9zZXJ2aWNlLnNjcmlwdHMucnVuKHtcbiAgICAgICAgICAgICAgICBzY3JpcHRJZDogdGhpcy5yZXNldF9zY3JpcHRfaWQsXG4gICAgICAgICAgICAgICAgcmVxdWVzdEJvZHk6IHsgZnVuY3Rpb246IHRoaXMuY29uZmlnLkFSQ0hJVkVfRlVOQ1RJT05fTkFNRSB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmRlbGF5KDUpO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKFwiYXJjaGl2ZVwiKTtcbiAgICAgICAgICAgIHRoaXMubG9naW5fc2hlZXQgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJSZXNldHRpbmcuLi5cIik7XG4gICAgICAgIGF3YWl0IHNjcmlwdF9zZXJ2aWNlLnNjcmlwdHMucnVuKHtcbiAgICAgICAgICAgIHNjcmlwdElkOiB0aGlzLnJlc2V0X3NjcmlwdF9pZCxcbiAgICAgICAgICAgIHJlcXVlc3RCb2R5OiB7IGZ1bmN0aW9uOiB0aGlzLmNvbmZpZy5SRVNFVF9GVU5DVElPTl9OQU1FIH0sXG4gICAgICAgIH0pO1xuICAgICAgICBhd2FpdCB0aGlzLmRlbGF5KDUpO1xuICAgICAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oXCJyZXNldFwiKTtcbiAgICAgICAgYXdhaXQgdGhpcy5zZW5kX21lc3NhZ2UoXCJEb25lLlwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBHb29nbGUgQXBwcyBTY3JpcHQgc2VydmljZS5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzY3JpcHRfdjEuU2NyaXB0Pn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgR29vZ2xlIEFwcHMgU2NyaXB0IHNlcnZpY2UuXG4gICAgICovXG4gICAgYXN5bmMgY2hlY2tfdXNlcl9jcmVkcyhcbiAgICAgICAgcHJvbXB0X21lc3NhZ2U6IHN0cmluZyA9IFwiSGksIGJlZm9yZSB5b3UgY2FuIHVzZSBCVk5TUCBib3QsIHlvdSBtdXN0IGxvZ2luLlwiXG4gICAgKTogUHJvbWlzZTxCVk5TUENoZWNraW5SZXNwb25zZSB8IHVuZGVmaW5lZD4ge1xuICAgICAgICBjb25zdCB1c2VyX2NyZWRzID0gdGhpcy5nZXRfdXNlcl9jcmVkcygpO1xuICAgICAgICBpZiAoIShhd2FpdCB1c2VyX2NyZWRzLmxvYWRUb2tlbigpKSkge1xuICAgICAgICAgICAgY29uc3QgYXV0aFVybCA9IGF3YWl0IHVzZXJfY3JlZHMuZ2V0QXV0aFVybCgpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYCR7cHJvbXB0X21lc3NhZ2V9IFBsZWFzZSBmb2xsb3cgdGhpcyBsaW5rOlxuJHthdXRoVXJsfVxuXG5NZXNzYWdlIG1lIGFnYWluIHdoZW4gZG9uZS5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIEdvb2dsZSBBcHBzIFNjcmlwdCBzZXJ2aWNlLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHNjcmlwdF92MS5TY3JpcHQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBHb29nbGUgQXBwcyBTY3JpcHQgc2VydmljZS5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfb25fZHV0eSgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zdCBjaGVja2VkX291dF9zZWN0aW9uID0gXCJDaGVja2VkIE91dFwiO1xuICAgICAgICBjb25zdCBsYXN0X3NlY3Rpb25zID0gW2NoZWNrZWRfb3V0X3NlY3Rpb25dO1xuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG5cbiAgICAgICAgY29uc3Qgb25fZHV0eV9wYXRyb2xsZXJzID0gbG9naW5fc2hlZXQuZ2V0X29uX2R1dHlfcGF0cm9sbGVycygpO1xuICAgICAgICBjb25zdCBieV9zZWN0aW9uID0gb25fZHV0eV9wYXRyb2xsZXJzXG4gICAgICAgICAgICAuZmlsdGVyKCh4KSA9PiB4LmNoZWNraW4pXG4gICAgICAgICAgICAucmVkdWNlKChwcmV2OiB7IFtrZXk6IHN0cmluZ106IFBhdHJvbGxlclJvd1tdIH0sIGN1cikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNob3J0X2NvZGUgPVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNraW5fdmFsdWVzLmJ5X3NoZWV0X3N0cmluZ1tjdXIuY2hlY2tpbl0ua2V5O1xuICAgICAgICAgICAgICAgIGxldCBzZWN0aW9uID0gY3VyLnNlY3Rpb247XG4gICAgICAgICAgICAgICAgaWYgKHNob3J0X2NvZGUgPT0gXCJvdXRcIikge1xuICAgICAgICAgICAgICAgICAgICBzZWN0aW9uID0gY2hlY2tlZF9vdXRfc2VjdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCEoc2VjdGlvbiBpbiBwcmV2KSkge1xuICAgICAgICAgICAgICAgICAgICBwcmV2W3NlY3Rpb25dID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHByZXZbc2VjdGlvbl0ucHVzaChjdXIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgICAgICAgfSwge30pO1xuICAgICAgICBsZXQgcmVzdWx0czogc3RyaW5nW11bXSA9IFtdO1xuICAgICAgICBsZXQgYWxsX2tleXMgPSBPYmplY3Qua2V5cyhieV9zZWN0aW9uKTtcbiAgICAgICAgY29uc3Qgb3JkZXJlZF9wcmltYXJ5X3NlY3Rpb25zID0gT2JqZWN0LmtleXMoYnlfc2VjdGlvbilcbiAgICAgICAgICAgIC5maWx0ZXIoKHgpID0+ICFsYXN0X3NlY3Rpb25zLmluY2x1ZGVzKHgpKVxuICAgICAgICAgICAgLnNvcnQoKTtcbiAgICAgICAgY29uc3QgZmlsdGVyZWRfbGFzdF9zZWN0aW9ucyA9IGxhc3Rfc2VjdGlvbnMuZmlsdGVyKCh4KSA9PlxuICAgICAgICAgICAgYWxsX2tleXMuaW5jbHVkZXMoeClcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3Qgb3JkZXJlZF9zZWN0aW9ucyA9IG9yZGVyZWRfcHJpbWFyeV9zZWN0aW9ucy5jb25jYXQoXG4gICAgICAgICAgICBmaWx0ZXJlZF9sYXN0X3NlY3Rpb25zXG4gICAgICAgICk7XG5cbiAgICAgICAgZm9yIChjb25zdCBzZWN0aW9uIG9mIG9yZGVyZWRfc2VjdGlvbnMpIHtcbiAgICAgICAgICAgIGxldCByZXN1bHQ6IHN0cmluZ1tdID0gW107XG4gICAgICAgICAgICBjb25zdCBwYXRyb2xsZXJzID0gYnlfc2VjdGlvbltzZWN0aW9uXS5zb3J0KCh4LCB5KSA9PlxuICAgICAgICAgICAgICAgIHgubmFtZS5sb2NhbGVDb21wYXJlKHkubmFtZSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoc2VjdGlvbi5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChcIlNlY3Rpb24gXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0LnB1c2goYCR7c2VjdGlvbn06IGApO1xuICAgICAgICAgICAgZnVuY3Rpb24gcGF0cm9sbGVyX3N0cmluZyhuYW1lOiBzdHJpbmcsIHNob3J0X2NvZGU6IHN0cmluZykge1xuICAgICAgICAgICAgICAgIGxldCBkZXRhaWxzID0gXCJcIjtcbiAgICAgICAgICAgICAgICBpZiAoc2hvcnRfY29kZSAhPT0gXCJkYXlcIiAmJiBzaG9ydF9jb2RlICE9PSBcIm91dFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGRldGFpbHMgPSBgICgke3Nob3J0X2NvZGUudG9VcHBlckNhc2UoKX0pYDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke25hbWV9JHtkZXRhaWxzfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQucHVzaChcbiAgICAgICAgICAgICAgICBwYXRyb2xsZXJzXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKHgpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRyb2xsZXJfc3RyaW5nKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHgubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNraW5fdmFsdWVzLmJ5X3NoZWV0X3N0cmluZ1t4LmNoZWNraW5dLmtleVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5qb2luKFwiLCBcIilcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oXCJvbi1kdXR5XCIpO1xuICAgICAgICByZXR1cm4gYFBhdHJvbGxlcnMgZm9yICR7bG9naW5fc2hlZXQuc2hlZXRfZGF0ZS50b0RhdGVTdHJpbmcoKX0gKFRvdGFsOiAke1xuICAgICAgICAgICAgb25fZHV0eV9wYXRyb2xsZXJzLmxlbmd0aFxuICAgICAgICB9KTpcXG4ke3Jlc3VsdHMubWFwKChyKSA9PiByLmpvaW4oXCJcIikpLmpvaW4oXCJcXG5cIil9YDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2dzIGFuIGFjdGlvbiB0byB0aGUgR29vZ2xlIFNoZWV0cy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYWN0aW9uX25hbWUgLSBUaGUgbmFtZSBvZiB0aGUgYWN0aW9uIHRvIGxvZy5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgYWN0aW9uIGlzIGxvZ2dlZC5cbiAgICAgKi9cbiAgICBhc3luYyBsb2dfYWN0aW9uKGFjdGlvbl9uYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3Qgc2hlZXRzX3NlcnZpY2UgPSBhd2FpdCB0aGlzLmdldF9zaGVldHNfc2VydmljZSgpO1xuICAgICAgICBhd2FpdCBzaGVldHNfc2VydmljZS5zcHJlYWRzaGVldHMudmFsdWVzLmFwcGVuZCh7XG4gICAgICAgICAgICBzcHJlYWRzaGVldElkOiB0aGlzLmNvbWJpbmVkX2NvbmZpZy5TSEVFVF9JRCxcbiAgICAgICAgICAgIHJhbmdlOiB0aGlzLmNvbmZpZy5BQ1RJT05fTE9HX1NIRUVULFxuICAgICAgICAgICAgdmFsdWVJbnB1dE9wdGlvbjogXCJVU0VSX0VOVEVSRURcIixcbiAgICAgICAgICAgIHJlcXVlc3RCb2R5OiB7XG4gICAgICAgICAgICAgICAgdmFsdWVzOiBbW3RoaXMucGF0cm9sbGVyIS5uYW1lLCBuZXcgRGF0ZSgpLCBhY3Rpb25fbmFtZV1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9ncyBvdXQgdGhlIHVzZXIuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBsb2dvdXQgcmVzcG9uc2UuXG4gICAgICovXG4gICAgYXN5bmMgbG9nb3V0KCk6IFByb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgdXNlcl9jcmVkcyA9IHRoaXMuZ2V0X3VzZXJfY3JlZHMoKTtcbiAgICAgICAgYXdhaXQgdXNlcl9jcmVkcy5kZWxldGVUb2tlbigpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IFwiT2theSwgSSBoYXZlIHJlbW92ZWQgYWxsIGxvZ2luIHNlc3Npb24gaW5mb3JtYXRpb24uXCIsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgVHdpbGlvIGNsaWVudC5cbiAgICAqIEByZXR1cm5zIHtUd2lsaW9DbGllbnR9IFRoZSBUd2lsaW8gY2xpZW50LlxuICAgICovXG4gICAgZ2V0X3R3aWxpb19jbGllbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnR3aWxpb19jbGllbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHdpbGlvX2NsaWVudCB3YXMgbmV2ZXIgaW5pdGlhbGl6ZWQhXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnR3aWxpb19jbGllbnQ7XG4gICAgfVxuXG4gICAgIC8qKlxuICAgICAqIEdldHMgdGhlIFR3aWxpbyBTeW5jIGNsaWVudC5cbiAgICAgKiBAcmV0dXJucyB7U2VydmljZUNvbnRleHR9IFRoZSBUd2lsaW8gU3luYyBjbGllbnQuXG4gICAgICovXG4gICAgZ2V0X3N5bmNfY2xpZW50KCkge1xuICAgICAgICBpZiAoIXRoaXMuc3luY19jbGllbnQpIHtcbiAgICAgICAgICAgIHRoaXMuc3luY19jbGllbnQgPSB0aGlzLmdldF90d2lsaW9fY2xpZW50KCkuc3luYy5zZXJ2aWNlcyhcbiAgICAgICAgICAgICAgICB0aGlzLnN5bmNfc2lkXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnN5bmNfY2xpZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICogR2V0cyB0aGUgdXNlciBjcmVkZW50aWFscy5cbiAgICAqIEByZXR1cm5zIHtVc2VyQ3JlZHN9IFRoZSB1c2VyIGNyZWRlbnRpYWxzLlxuICAgICovXG4gICAgZ2V0X3VzZXJfY3JlZHMoKSB7XG4gICAgICAgIGlmICghdGhpcy51c2VyX2NyZWRzKSB7XG4gICAgICAgICAgICB0aGlzLnVzZXJfY3JlZHMgPSBuZXcgVXNlckNyZWRzKFxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0X3N5bmNfY2xpZW50KCksXG4gICAgICAgICAgICAgICAgdGhpcy5mcm9tLFxuICAgICAgICAgICAgICAgIHRoaXMuY29tYmluZWRfY29uZmlnXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJfY3JlZHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgc2VydmljZSBjcmVkZW50aWFscy5cbiAgICAgKiBAcmV0dXJucyB7R29vZ2xlQXV0aH0gVGhlIHNlcnZpY2UgY3JlZGVudGlhbHMuXG4gICAgICovXG4gICAgZ2V0X3NlcnZpY2VfY3JlZHMoKSB7XG4gICAgICAgIGlmICghdGhpcy5zZXJ2aWNlX2NyZWRzKSB7XG4gICAgICAgICAgICB0aGlzLnNlcnZpY2VfY3JlZHMgPSBuZXcgZ29vZ2xlLmF1dGguR29vZ2xlQXV0aCh7XG4gICAgICAgICAgICAgICAga2V5RmlsZTogZ2V0X3NlcnZpY2VfY3JlZGVudGlhbHNfcGF0aCgpLFxuICAgICAgICAgICAgICAgIHNjb3BlczogdGhpcy5TQ09QRVMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlX2NyZWRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHZhbGlkIGNyZWRlbnRpYWxzLlxuICAgICogQHBhcmFtIHtib29sZWFufSBbcmVxdWlyZV91c2VyX2NyZWRzPWZhbHNlXSAtIFdoZXRoZXIgdXNlciBjcmVkZW50aWFscyBhcmUgcmVxdWlyZWQuXG4gICAgKiBAcmV0dXJucyB7UHJvbWlzZTxHb29nbGVBdXRoPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgdmFsaWQgY3JlZGVudGlhbHMuXG4gICAgKi9cbiAgICBhc3luYyBnZXRfdmFsaWRfY3JlZHMocmVxdWlyZV91c2VyX2NyZWRzOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLlVTRV9TRVJWSUNFX0FDQ09VTlQgJiYgIXJlcXVpcmVfdXNlcl9jcmVkcykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X3NlcnZpY2VfY3JlZHMoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1c2VyX2NyZWRzID0gdGhpcy5nZXRfdXNlcl9jcmVkcygpO1xuICAgICAgICBpZiAoIShhd2FpdCB1c2VyX2NyZWRzLmxvYWRUb2tlbigpKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVXNlciBpcyBub3QgYXV0aGVkLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhcIlVzaW5nIHVzZXIgYWNjb3VudCBmb3Igc2VydmljZSBhdXRoLi4uXCIpO1xuICAgICAgICByZXR1cm4gdXNlcl9jcmVkcy5vYXV0aDJfY2xpZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIEdvb2dsZSBTaGVldHMgc2VydmljZS5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzaGVldHNfdjQuU2hlZXRzPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgR29vZ2xlIFNoZWV0cyBzZXJ2aWNlLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF9zaGVldHNfc2VydmljZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNoZWV0c19zZXJ2aWNlKSB7XG4gICAgICAgICAgICB0aGlzLnNoZWV0c19zZXJ2aWNlID0gZ29vZ2xlLnNoZWV0cyh7XG4gICAgICAgICAgICAgICAgdmVyc2lvbjogXCJ2NFwiLFxuICAgICAgICAgICAgICAgIGF1dGg6IGF3YWl0IHRoaXMuZ2V0X3ZhbGlkX2NyZWRzKCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zaGVldHNfc2VydmljZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBsb2dpbiBzaGVldC5cbiAgICAqIEByZXR1cm5zIHtQcm9taXNlPExvZ2luU2hlZXQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBsb2dpbiBzaGVldFxuICAgICovXG4gICAgYXN5bmMgZ2V0X2xvZ2luX3NoZWV0KCkge1xuICAgICAgICBpZiAoIXRoaXMubG9naW5fc2hlZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0X2NvbmZpZzogTG9naW5TaGVldENvbmZpZyA9IHRoaXMuY29tYmluZWRfY29uZmlnO1xuICAgICAgICAgICAgY29uc3Qgc2hlZXRzX3NlcnZpY2UgPSBhd2FpdCB0aGlzLmdldF9zaGVldHNfc2VydmljZSgpO1xuICAgICAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBuZXcgTG9naW5TaGVldChcbiAgICAgICAgICAgICAgICBzaGVldHNfc2VydmljZSxcbiAgICAgICAgICAgICAgICBsb2dpbl9zaGVldF9jb25maWdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBhd2FpdCBsb2dpbl9zaGVldC5yZWZyZXNoKCk7XG4gICAgICAgICAgICB0aGlzLmxvZ2luX3NoZWV0ID0gbG9naW5fc2hlZXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubG9naW5fc2hlZXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBHZXRzIHRoZSBzZWFzb24gc2hlZXQuXG4gICAgKiBAcmV0dXJucyB7UHJvbWlzZTxTZWFzb25TaGVldD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHNlYXNvbiBzaGVldFxuICAgICovXG4gICAgYXN5bmMgZ2V0X3NlYXNvbl9zaGVldCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNlYXNvbl9zaGVldCkge1xuICAgICAgICAgICAgY29uc3Qgc2Vhc29uX3NoZWV0X2NvbmZpZzogU2Vhc29uU2hlZXRDb25maWcgPSB0aGlzLmNvbWJpbmVkX2NvbmZpZztcbiAgICAgICAgICAgIGNvbnN0IHNoZWV0c19zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfc2hlZXRzX3NlcnZpY2UoKTtcbiAgICAgICAgICAgIGNvbnN0IHNlYXNvbl9zaGVldCA9IG5ldyBTZWFzb25TaGVldChcbiAgICAgICAgICAgICAgICBzaGVldHNfc2VydmljZSxcbiAgICAgICAgICAgICAgICBzZWFzb25fc2hlZXRfY29uZmlnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5zZWFzb25fc2hlZXQgPSBzZWFzb25fc2hlZXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2Vhc29uX3NoZWV0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICogR2V0cyB0aGUgY29tcCBwYXNzIHNoZWV0LlxuICAgICogQHJldHVybnMge1Byb21pc2U8Q29tcFBhc3NTaGVldD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGNvbXAgcGFzcyBzaGVldFxuICAgICovXG4gICAgYXN5bmMgZ2V0X2NvbXBfcGFzc19zaGVldCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbXBfcGFzc19zaGVldCkge1xuICAgICAgICAgICAgY29uc3QgY29uZmlnOiBDb21wUGFzc2VzQ29uZmlnID0gdGhpcy5jb21iaW5lZF9jb25maWc7XG4gICAgICAgICAgICBjb25zdCBzaGVldHNfc2VydmljZSA9IGF3YWl0IHRoaXMuZ2V0X3NoZWV0c19zZXJ2aWNlKCk7XG4gICAgICAgICAgICBjb25zdCBzZWFzb25fc2hlZXQgPSBuZXcgQ29tcFBhc3NTaGVldChzaGVldHNfc2VydmljZSwgY29uZmlnKTtcbiAgICAgICAgICAgIHRoaXMuY29tcF9wYXNzX3NoZWV0ID0gc2Vhc29uX3NoZWV0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBfcGFzc19zaGVldDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBtYW5hZ2VyIHBhc3Mgc2hlZXQuXG4gICAgKiBAcmV0dXJucyB7UHJvbWlzZTxNYW5hZ2VyUGFzc1NoZWV0Pn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgbWFuYWdlciBwYXNzIHNoZWV0XG4gICAgKi9cbiAgICBhc3luYyBnZXRfbWFuYWdlcl9wYXNzX3NoZWV0KCkge1xuICAgICAgICBpZiAoIXRoaXMubWFuYWdlcl9wYXNzX3NoZWV0KSB7XG4gICAgICAgICAgICBjb25zdCBjb25maWc6IE1hbmFnZXJQYXNzZXNDb25maWcgPSB0aGlzLmNvbWJpbmVkX2NvbmZpZztcbiAgICAgICAgICAgIGNvbnN0IHNoZWV0c19zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfc2hlZXRzX3NlcnZpY2UoKTtcbiAgICAgICAgICAgIGNvbnN0IHNlYXNvbl9zaGVldCA9IG5ldyBNYW5hZ2VyUGFzc1NoZWV0KHNoZWV0c19zZXJ2aWNlLCBjb25maWcpO1xuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyX3Bhc3Nfc2hlZXQgPSBzZWFzb25fc2hlZXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubWFuYWdlcl9wYXNzX3NoZWV0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIEdvb2dsZSBBcHBzIFNjcmlwdCBzZXJ2aWNlLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHNjcmlwdF92MS5TY3JpcHQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBHb29nbGUgQXBwcyBTY3JpcHQgc2VydmljZS5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfdXNlcl9zY3JpcHRzX3NlcnZpY2UoKSB7XG4gICAgICAgIGlmICghdGhpcy51c2VyX3NjcmlwdHNfc2VydmljZSkge1xuICAgICAgICAgICAgdGhpcy51c2VyX3NjcmlwdHNfc2VydmljZSA9IGdvb2dsZS5zY3JpcHQoe1xuICAgICAgICAgICAgICAgIHZlcnNpb246IFwidjFcIixcbiAgICAgICAgICAgICAgICBhdXRoOiBhd2FpdCB0aGlzLmdldF92YWxpZF9jcmVkcyh0cnVlKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJfc2NyaXB0c19zZXJ2aWNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG1hcHBlZCBwYXRyb2xsZXIuXG4gICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtmb3JjZT1mYWxzZV0gLSBXaGV0aGVyIHRvIGZvcmNlIHRoZSBwYXRyb2xsZXIgdG8gYmUgZm91bmQuXG4gICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUENoZWNraW5SZXNwb25zZSB8IHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSByZXNwb25zZSBvciB2b2lkLlxuICAgICovXG4gICAgYXN5bmMgZ2V0X21hcHBlZF9wYXRyb2xsZXIoZm9yY2U6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBjb25zdCBwaG9uZV9sb29rdXAgPSBhd2FpdCB0aGlzLmZpbmRfcGF0cm9sbGVyX2Zyb21fbnVtYmVyKCk7XG4gICAgICAgIGlmIChwaG9uZV9sb29rdXAgPT09IHVuZGVmaW5lZCB8fCBwaG9uZV9sb29rdXAgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChmb3JjZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBmaW5kIGFzc29jaWF0ZWQgdXNlclwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBTb3JyeSwgSSBjb3VsZG4ndCBmaW5kIGFuIGFzc29jaWF0ZWQgQlZOU1AgbWVtYmVyIHdpdGggeW91ciBwaG9uZSBudW1iZXIgKCR7dGhpcy5mcm9tfSlgLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKTtcbiAgICAgICAgY29uc3QgbWFwcGVkUGF0cm9sbGVyID0gbG9naW5fc2hlZXQudHJ5X2ZpbmRfcGF0cm9sbGVyKFxuICAgICAgICAgICAgcGhvbmVfbG9va3VwLm5hbWVcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKG1hcHBlZFBhdHJvbGxlciA9PT0gXCJub3RfZm91bmRcIikge1xuICAgICAgICAgICAgaWYgKGZvcmNlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IHBhdHJvbGxlciBpbiBsb2dpbiBzaGVldFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBDb3VsZCBub3QgZmluZCBwYXRyb2xsZXIgJyR7cGhvbmVfbG9va3VwLm5hbWV9JyBpbiBsb2dpbiBzaGVldC4gUGxlYXNlIGxvb2sgYXQgdGhlIGxvZ2luIHNoZWV0IG5hbWUsIGFuZCBjb3B5IGl0IHRvIHRoZSBQaG9uZSBOdW1iZXJzIHRhYi5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1cnJlbnRfc2hlZXRfZGF0ZSA9IGxvZ2luX3NoZWV0LmN1cnJlbnRfZGF0ZTtcbiAgICAgICAgdGhpcy5wYXRyb2xsZXIgPSBtYXBwZWRQYXRyb2xsZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBGaW5kcyB0aGUgcGF0cm9sbGVyIGZyb20gdGhlIHBob25lIG51bWJlci5cbiAgICAqIEByZXR1cm5zIHtQcm9taXNlPFBhdHJvbGxlclJvdz59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHBhdHJvbGxlci5cbiAgICAqL1xuICAgIGFzeW5jIGZpbmRfcGF0cm9sbGVyX2Zyb21fbnVtYmVyKCkge1xuICAgICAgICBjb25zdCByYXdfbnVtYmVyID0gdGhpcy5mcm9tO1xuICAgICAgICBjb25zdCBzaGVldHNfc2VydmljZSA9IGF3YWl0IHRoaXMuZ2V0X3NoZWV0c19zZXJ2aWNlKCk7XG4gICAgICAgIGNvbnN0IG9wdHM6IEZpbmRQYXRyb2xsZXJDb25maWcgPSB0aGlzLmNvbWJpbmVkX2NvbmZpZztcbiAgICAgICAgY29uc3QgbnVtYmVyID0gc2FuaXRpemVfcGhvbmVfbnVtYmVyKHJhd19udW1iZXIpO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHNoZWV0c19zZXJ2aWNlLnNwcmVhZHNoZWV0cy52YWx1ZXMuZ2V0KHtcbiAgICAgICAgICAgIHNwcmVhZHNoZWV0SWQ6IG9wdHMuU0hFRVRfSUQsXG4gICAgICAgICAgICByYW5nZTogb3B0cy5QSE9ORV9OVU1CRVJfTE9PS1VQX1NIRUVULFxuICAgICAgICAgICAgdmFsdWVSZW5kZXJPcHRpb246IFwiVU5GT1JNQVRURURfVkFMVUVcIixcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghcmVzcG9uc2UuZGF0YS52YWx1ZXMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBmaW5kIHBhdHJvbGxlci5cIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGF0cm9sbGVyID0gcmVzcG9uc2UuZGF0YS52YWx1ZXNcbiAgICAgICAgICAgIC5tYXAoKHJvdykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJhd051bWJlciA9XG4gICAgICAgICAgICAgICAgICAgIHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5QSE9ORV9OVU1CRVJfTlVNQkVSX0NPTFVNTildO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnROdW1iZXIgPVxuICAgICAgICAgICAgICAgICAgICByYXdOdW1iZXIgIT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHNhbml0aXplX3Bob25lX251bWJlcihyYXdOdW1iZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHJhd051bWJlcjtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50TmFtZSA9XG4gICAgICAgICAgICAgICAgICAgIHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5QSE9ORV9OVU1CRVJfTkFNRV9DT0xVTU4pXTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBuYW1lOiBjdXJyZW50TmFtZSwgbnVtYmVyOiBjdXJyZW50TnVtYmVyIH07XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmZpbHRlcigocGF0cm9sbGVyKSA9PiBwYXRyb2xsZXIubnVtYmVyID09PSBudW1iZXIpWzBdO1xuICAgICAgICByZXR1cm4gcGF0cm9sbGVyO1xuICAgIH1cbn1cbiIsImltcG9ydCBcIkB0d2lsaW8tbGFicy9zZXJ2ZXJsZXNzLXJ1bnRpbWUtdHlwZXNcIjtcbmltcG9ydCB7XG4gICAgQ29udGV4dCxcbiAgICBTZXJ2ZXJsZXNzQ2FsbGJhY2ssXG4gICAgU2VydmVybGVzc0V2ZW50T2JqZWN0LFxuICAgIFNlcnZlcmxlc3NGdW5jdGlvblNpZ25hdHVyZSxcbn0gZnJvbSBcIkB0d2lsaW8tbGFicy9zZXJ2ZXJsZXNzLXJ1bnRpbWUtdHlwZXMvdHlwZXNcIjtcbmltcG9ydCBCVk5TUENoZWNraW5IYW5kbGVyLCB7IEhhbmRsZXJFdmVudCB9IGZyb20gXCIuL2J2bnNwX2NoZWNraW5faGFuZGxlclwiO1xuaW1wb3J0IHsgSGFuZGxlckVudmlyb25tZW50IH0gZnJvbSBcIi4uL2Vudi9oYW5kbGVyX2NvbmZpZ1wiO1xuXG5jb25zdCBORVhUX1NURVBfQ09PS0lFX05BTUUgPSBcImJ2bnNwX2NoZWNraW5fbmV4dF9zdGVwXCI7XG5cbi8qKlxuICogVHdpbGlvIFNlcnZlcmxlc3MgZnVuY3Rpb24gaGFuZGxlciBmb3IgQlZOU1AgY2hlY2staW4uXG4gKiBAcGFyYW0ge0NvbnRleHQ8SGFuZGxlckVudmlyb25tZW50Pn0gY29udGV4dCAtIFRoZSBUd2lsaW8gc2VydmVybGVzcyBjb250ZXh0LlxuICogQHBhcmFtIHtTZXJ2ZXJsZXNzRXZlbnRPYmplY3Q8SGFuZGxlckV2ZW50Pn0gZXZlbnQgLSBUaGUgZXZlbnQgb2JqZWN0LlxuICogQHBhcmFtIHtTZXJ2ZXJsZXNzQ2FsbGJhY2t9IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgY29uc3QgaGFuZGxlcjogU2VydmVybGVzc0Z1bmN0aW9uU2lnbmF0dXJlPFxuICAgIEhhbmRsZXJFbnZpcm9ubWVudCxcbiAgICBIYW5kbGVyRXZlbnRcbj4gPSBhc3luYyBmdW5jdGlvbiAoXG4gICAgY29udGV4dDogQ29udGV4dDxIYW5kbGVyRW52aXJvbm1lbnQ+LFxuICAgIGV2ZW50OiBTZXJ2ZXJsZXNzRXZlbnRPYmplY3Q8SGFuZGxlckV2ZW50PixcbiAgICBjYWxsYmFjazogU2VydmVybGVzc0NhbGxiYWNrXG4pIHtcbiAgICBjb25zdCBoYW5kbGVyID0gbmV3IEJWTlNQQ2hlY2tpbkhhbmRsZXIoY29udGV4dCwgZXZlbnQpO1xuICAgIGxldCBtZXNzYWdlOiBzdHJpbmc7XG4gICAgbGV0IG5leHRfc3RlcDogc3RyaW5nID0gXCJcIjtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBoYW5kbGVyX3Jlc3BvbnNlID0gYXdhaXQgaGFuZGxlci5oYW5kbGUoKTtcbiAgICAgICAgbWVzc2FnZSA9XG4gICAgICAgICAgICBoYW5kbGVyX3Jlc3BvbnNlLnJlc3BvbnNlIHx8XG4gICAgICAgICAgICBcIlVuZXhwZWN0ZWQgcmVzdWx0IC0gbm8gcmVzcG9uc2UgZGV0ZXJtaW5lZFwiO1xuICAgICAgICBuZXh0X3N0ZXAgPSBoYW5kbGVyX3Jlc3BvbnNlLm5leHRfc3RlcCB8fCBcIlwiO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJBbiBlcnJvciBvY2N1cmVkXCIpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZSkpO1xuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICB9XG4gICAgICAgIG1lc3NhZ2UgPSBcIkFuIHVuZXhwZWN0ZWQgZXJyb3Igb2NjdXJlZC5cIjtcbiAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgbWVzc2FnZSArPSBcIlxcblwiICsgZS5tZXNzYWdlO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvclwiLCBlLnN0YWNrKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3JcIiwgZS5uYW1lKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3JcIiwgZS5tZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHJlc3BvbnNlID0gbmV3IFR3aWxpby5SZXNwb25zZSgpO1xuICAgIGNvbnN0IHR3aW1sID0gbmV3IFR3aWxpby50d2ltbC5NZXNzYWdpbmdSZXNwb25zZSgpO1xuXG4gICAgdHdpbWwubWVzc2FnZShtZXNzYWdlKTtcblxuICAgIHJlc3BvbnNlXG4gICAgICAgIC8vIEFkZCB0aGUgc3RyaW5naWZpZWQgVHdpTUwgdG8gdGhlIHJlc3BvbnNlIGJvZHlcbiAgICAgICAgLnNldEJvZHkodHdpbWwudG9TdHJpbmcoKSlcbiAgICAgICAgLy8gU2luY2Ugd2UncmUgcmV0dXJuaW5nIFR3aU1MLCB0aGUgY29udGVudCB0eXBlIG11c3QgYmUgWE1MXG4gICAgICAgIC5hcHBlbmRIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJ0ZXh0L3htbFwiKVxuICAgICAgICAuc2V0Q29va2llKE5FWFRfU1RFUF9DT09LSUVfTkFNRSwgbmV4dF9zdGVwKTtcblxuICAgIHJldHVybiBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7XG59OyIsImltcG9ydCB7IHNoZWV0c192NCB9IGZyb20gXCJnb29nbGVhcGlzXCI7XG5pbXBvcnQgeyBDb21wUGFzc2VzQ29uZmlnLCBNYW5hZ2VyUGFzc2VzQ29uZmlnIH0gZnJvbSBcIi4uL2Vudi9oYW5kbGVyX2NvbmZpZ1wiO1xuaW1wb3J0IHsgZXhjZWxfcm93X3RvX2luZGV4LCByb3dfY29sX3RvX2V4Y2VsX2luZGV4IH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxcIjtcbmltcG9ydCBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYiBmcm9tIFwiLi4vdXRpbHMvZ29vZ2xlX3NoZWV0c19zcHJlYWRzaGVldF90YWJcIjtcbmltcG9ydCB7IGZvcm1hdF9kYXRlX2Zvcl9zcHJlYWRzaGVldF92YWx1ZSB9IGZyb20gXCIuLi91dGlscy9kYXRldGltZV91dGlsXCI7XG5pbXBvcnQgeyBDb21wUGFzc1R5cGUsIGdldF9jb21wX3Bhc3NfZGVzY3JpcHRpb24gfSBmcm9tIFwiLi4vdXRpbHMvY29tcF9wYXNzZXNcIjtcbmltcG9ydCB7IEJWTlNQQ2hlY2tpblJlc3BvbnNlIH0gZnJvbSBcIi4uL2hhbmRsZXJzL2J2bnNwX2NoZWNraW5faGFuZGxlclwiO1xuXG5leHBvcnQgY2xhc3MgVXNlZEFuZEF2YWlsYWJsZVBhc3NlcyB7XG4gICAgcm93OiBhbnlbXTtcbiAgICBpbmRleDogbnVtYmVyO1xuICAgIGF2YWlsYWJsZTogbnVtYmVyO1xuICAgIHVzZWRfdG9kYXk6IG51bWJlcjtcbiAgICB1c2VkX3NlYXNvbjogbnVtYmVyO1xuICAgIGNvbXBfcGFzc190eXBlOiBDb21wUGFzc1R5cGU7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHJvdzogYW55W10sXG4gICAgICAgIGluZGV4OiBudW1iZXIsXG4gICAgICAgIGF2YWlsYWJsZTogYW55LFxuICAgICAgICB1c2VkX3RvZGF5OiBhbnksXG4gICAgICAgIHVzZWRfc2Vhc29uOiBhbnksXG4gICAgICAgIHR5cGU6IENvbXBQYXNzVHlwZVxuICAgICkge1xuICAgICAgICB0aGlzLnJvdyA9IHJvdztcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgICAgICB0aGlzLmF2YWlsYWJsZSA9IE51bWJlcihhdmFpbGFibGUpO1xuICAgICAgICB0aGlzLnVzZWRfdG9kYXkgPSBOdW1iZXIodXNlZF90b2RheSk7XG4gICAgICAgIHRoaXMudXNlZF9zZWFzb24gPSBOdW1iZXIodXNlZF9zZWFzb24pO1xuICAgICAgICB0aGlzLmNvbXBfcGFzc190eXBlID0gdHlwZTtcbiAgICB9XG5cbiAgICBnZXRfcHJvbXB0KCk6IEJWTlNQQ2hlY2tpblJlc3BvbnNlIHtcbiAgICAgICAgaWYgKHRoaXMuYXZhaWxhYmxlID4gMCkge1xuICAgICAgICAgICAgbGV0IHJlc3BvbnNlOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbXBfcGFzc190eXBlID09IENvbXBQYXNzVHlwZS5Db21wUGFzcykge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gYFlvdSBoYXZlIHVwIHRvICR7dGhpcy5hdmFpbGFibGV9IGNvbXAgcGFzc2VzIHlvdSBjYW4gdXNlIHRvZGF5LlxcblxuICAgICAgICAgICAgICAgICAgICBZb3UgaGF2ZSB1c2VkICR7dGhpcy51c2VkX3NlYXNvbn0gY29tcCBwYXNzZXMgdGhpcyBzZWFzb24uXFxuXG4gICAgICAgICAgICAgICAgICAgIFlvdSBoYXZlIGN1cnJlbnRseSB1c2VkICR7dGhpcy51c2VkX3RvZGF5fSBzbyBmYXIgdG9kYXkuXFxuXG4gICAgICAgICAgICAgICAgICAgIEVudGVyIHRoZSBmaXJzdCBhbmQgbGFzdCBuYW1lIG9mIHRoZSBndWVzdCB0aGF0IHdpbGwgdXNlIGEgY29tcCBwYXNzIHRvZGF5IChvciAgJ3Jlc3RhcnQnKTpgO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNvbXBfcGFzc190eXBlID09IENvbXBQYXNzVHlwZS5NYW5hZ2VyUGFzcykge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gYFlvdSBoYXZlIHVwIHRvICAke3RoaXMuYXZhaWxhYmxlfSBtYW5hZ2VyIHBhc3NlcyB5b3UgY2FuIHVzZSB0b2RheS5cXG5cbiAgICAgICAgICAgICAgICBZb3UgaGF2ZSB1c2VkICR7dGhpcy51c2VkX3NlYXNvbn0gbWFuYWdlciBwYXNzZXMgdGhpcyBzZWFzb24uXFxuXG4gICAgICAgICAgICAgICAgWW91IGhhdmUgY3VycmVudGx5IHVzZWQgJHt0aGlzLnVzZWRfdG9kYXl9IHNvIGZhciB0b2RheS5cXG5cbiAgICAgICAgICAgICAgICBFbnRlciB0aGUgZmlyc3QgYW5kIGxhc3QgbmFtZSBvZiB0aGUgZ3Vlc3QgdGhhdCB3aWxsIHVzZSBhIG1hbmFnZXIgcGFzcyB0b2RheSAob3IgICdyZXN0YXJ0Jyk6YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXNwb25zZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2U6IHJlc3BvbnNlLFxuICAgICAgICAgICAgICAgICAgICBuZXh0X3N0ZXA6IGBhd2FpdC1wYXNzLSR7dGhpcy5jb21wX3Bhc3NfdHlwZX1gLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3BvbnNlOiBgWW91IGRvIG5vdCBoYXZlIGFueSAke2dldF9jb21wX3Bhc3NfZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgdGhpcy5jb21wX3Bhc3NfdHlwZVxuICAgICAgICAgICAgKX0gYXZhaWxhYmxlIHRvZGF5YCxcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQYXNzU2hlZXQge1xuICAgIHNoZWV0OiBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYjtcbiAgICBjb21wX3Bhc3NfdHlwZTogQ29tcFBhc3NUeXBlO1xuICAgIGNvbnN0cnVjdG9yKHNoZWV0OiBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYiwgdHlwZTogQ29tcFBhc3NUeXBlKSB7XG4gICAgICAgIHRoaXMuc2hlZXQgPSBzaGVldDtcbiAgICAgICAgdGhpcy5jb21wX3Bhc3NfdHlwZSA9IHR5cGU7XG4gICAgfVxuXG4gICAgYWJzdHJhY3QgZ2V0IGF2YWlsYWJsZV9jb2x1bW4oKTogc3RyaW5nO1xuICAgIGFic3RyYWN0IGdldCB1c2VkX3RvZGF5X2NvbHVtbigpOiBzdHJpbmc7XG4gICAgYWJzdHJhY3QgZ2V0IHVzZWRfc2Vhc29uX2NvbHVtbigpOiBzdHJpbmc7XG4gICAgYWJzdHJhY3QgZ2V0IG5hbWVfY29sdW1uKCk6IHN0cmluZztcbiAgICBhYnN0cmFjdCBnZXQgc3RhcnRfaW5kZXgoKTogbnVtYmVyO1xuICAgIGFic3RyYWN0IGdldCBzaGVldF9uYW1lKCk6IHN0cmluZztcblxuICAgIGFzeW5jIGdldF9hdmFpbGFibGVfYW5kX3VzZWRfcGFzc2VzKFxuICAgICAgICBwYXRyb2xsZXJfbmFtZTogc3RyaW5nXG4gICAgKTogUHJvbWlzZTxVc2VkQW5kQXZhaWxhYmxlUGFzc2VzIHwgbnVsbD4ge1xuICAgICAgICBjb25zdCBwYXRyb2xsZXJfcm93ID0gYXdhaXQgdGhpcy5zaGVldC5nZXRfc2hlZXRfcm93X2Zvcl9wYXRyb2xsZXIoXG4gICAgICAgICAgICBwYXRyb2xsZXJfbmFtZSxcbiAgICAgICAgICAgIHRoaXMubmFtZV9jb2x1bW5cbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHBhdHJvbGxlcl9yb3cgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY3VycmVudF9kYXlfYXZhaWxhYmxlX3Bhc3NlcyA9XG4gICAgICAgICAgICBwYXRyb2xsZXJfcm93LnJvd1tleGNlbF9yb3dfdG9faW5kZXgodGhpcy5hdmFpbGFibGVfY29sdW1uKV07XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfZGF5X3VzZWRfcGFzc2VzID1cbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cucm93W2V4Y2VsX3Jvd190b19pbmRleCh0aGlzLnVzZWRfdG9kYXlfY29sdW1uKV07XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfc2Vhc29uX3VzZWRfcGFzc2VzID1cbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cucm93W2V4Y2VsX3Jvd190b19pbmRleCh0aGlzLnVzZWRfc2Vhc29uX2NvbHVtbildIDtcbiAgICAgICAgcmV0dXJuIG5ldyBVc2VkQW5kQXZhaWxhYmxlUGFzc2VzKFxuICAgICAgICAgICAgcGF0cm9sbGVyX3Jvdy5yb3csXG4gICAgICAgICAgICBwYXRyb2xsZXJfcm93LmluZGV4LFxuICAgICAgICAgICAgY3VycmVudF9kYXlfYXZhaWxhYmxlX3Bhc3NlcyxcbiAgICAgICAgICAgIGN1cnJlbnRfZGF5X3VzZWRfcGFzc2VzLFxuICAgICAgICAgICAgY3VycmVudF9zZWFzb25fdXNlZF9wYXNzZXMsXG4gICAgICAgICAgICB0aGlzLmNvbXBfcGFzc190eXBlXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgYXN5bmMgc2V0X3VzZWRfY29tcF9wYXNzZXMocGF0cm9sbGVyX3JvdzogVXNlZEFuZEF2YWlsYWJsZVBhc3NlcywgZ3Vlc3RfbmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGlmIChwYXRyb2xsZXJfcm93LmF2YWlsYWJsZSA8MSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgIGBOb3QgZW5vdWdoIGF2YWlsYWJsZSBwYXNzZXM6IEF2YWlsYWJsZTogJHtwYXRyb2xsZXJfcm93LmF2YWlsYWJsZX0sIFVzZWQgdGhpcyBzZWFzb246ICAke3BhdHJvbGxlcl9yb3cudXNlZF9zZWFzb259LCBVc2VkIHRvZGF5OiAke3BhdHJvbGxlcl9yb3cudXNlZF90b2RheX1gXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJvd251bSA9IHBhdHJvbGxlcl9yb3cuaW5kZXg7XG5cbiAgICAgICAgY29uc3Qgc3RhcnRfaW5kZXggPSB0aGlzLnN0YXJ0X2luZGV4O1xuICAgICAgICBjb25zdCBwcmlvcl9sZW5ndGggPSBwYXRyb2xsZXJfcm93LnJvdy5sZW5ndGggLSBzdGFydF9pbmRleDtcblxuICAgICAgICBjb25zdCBjdXJyZW50X2RhdGVfc3RyaW5nID0gZm9ybWF0X2RhdGVfZm9yX3NwcmVhZHNoZWV0X3ZhbHVlKFxuICAgICAgICAgICAgbmV3IERhdGUoKVxuICAgICAgICApO1xuICAgICAgICBsZXQgbmV3X3ZhbHMgPSBwYXRyb2xsZXJfcm93LnJvd1xuICAgICAgICAgICAgLnNsaWNlKHN0YXJ0X2luZGV4KVxuICAgICAgICAgICAgLm1hcCgoeCkgPT4geD8udG9TdHJpbmcoKSk7XG5cbiAgICAgICAgLy8gQWRkIHRoZSBjdXJyZW50IGRhdGUgYXBwZW5kZWQgd2l0aCB0aGUgbmV3IGd1ZXN0IG5hbWVcbiAgICAgICBuZXdfdmFscy5wdXNoKGN1cnJlbnRfZGF0ZV9zdHJpbmcgKyBndWVzdF9uYW1lKTtcblxuICAgICAgICBjb25zdCB1cGRhdGVfbGVuZ3RoID0gTWF0aC5tYXgocHJpb3JfbGVuZ3RoLCBuZXdfdmFscy5sZW5ndGgpO1xuICAgICAgICB3aGlsZSAobmV3X3ZhbHMubGVuZ3RoIDwgdXBkYXRlX2xlbmd0aCkge1xuICAgICAgICAgICAgbmV3X3ZhbHMucHVzaChcIlwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBlbmRfaW5kZXggPSBzdGFydF9pbmRleCArIHVwZGF0ZV9sZW5ndGggLSAxO1xuXG4gICAgICAgIGNvbnN0IHJhbmdlID0gYCR7dGhpcy5zaGVldC5zaGVldF9uYW1lfSEke3Jvd19jb2xfdG9fZXhjZWxfaW5kZXgoXG4gICAgICAgICAgICByb3dudW0sXG4gICAgICAgICAgICBzdGFydF9pbmRleFxuICAgICAgICApfToke3Jvd19jb2xfdG9fZXhjZWxfaW5kZXgocm93bnVtLCBlbmRfaW5kZXgpfWA7XG4gICAgICAgIGNvbnNvbGUubG9nKGBVcGRhdGluZyAke3JhbmdlfSB3aXRoICR7bmV3X3ZhbHMubGVuZ3RofSB2YWx1ZXNgKTtcbiAgICAgICAgYXdhaXQgdGhpcy5zaGVldC51cGRhdGVfdmFsdWVzKHJhbmdlLCBbbmV3X3ZhbHNdKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb21wUGFzc1NoZWV0IGV4dGVuZHMgUGFzc1NoZWV0IHtcbiAgICBjb25maWc6IENvbXBQYXNzZXNDb25maWc7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzIHwgbnVsbCxcbiAgICAgICAgY29uZmlnOiBDb21wUGFzc2VzQ29uZmlnXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgbmV3IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiKFxuICAgICAgICAgICAgICAgIHNoZWV0c19zZXJ2aWNlLFxuICAgICAgICAgICAgICAgIGNvbmZpZy5TSEVFVF9JRCxcbiAgICAgICAgICAgICAgICBjb25maWcuQ09NUF9QQVNTX1NIRUVUXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgQ29tcFBhc3NUeXBlLkNvbXBQYXNzXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgIH1cblxuICAgIGdldCBzdGFydF9pbmRleCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gZXhjZWxfcm93X3RvX2luZGV4KFxuICAgICAgICAgICAgdGhpcy5jb25maWcuQ09NUF9QQVNTX1NIRUVUX0RBVEVTX1NUQVJUSU5HX0NPTFVNTlxuICAgICAgICApO1xuICAgIH1cbiAgICBnZXQgc2hlZXRfbmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuQ09NUF9QQVNTX1NIRUVUO1xuICAgIH1cbiAgICBnZXQgYXZhaWxhYmxlX2NvbHVtbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuQ09NUF9QQVNTX1NIRUVUX0RBVEVTX0FWQUlMQUJMRV9DT0xVTU47XG4gICAgfVxuICAgIGdldCB1c2VkX3RvZGF5X2NvbHVtbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuQ09NUF9QQVNTX1NIRUVUX1VTRURfVE9EQVlfQ09MVU1OO1xuICAgIH1cbiAgICBnZXQgdXNlZF9zZWFzb25fY29sdW1uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5DT01QX1BBU1NfU0hFRVRfVVNFRF9TRUFTT05fQ09MVU1OO1xuICAgIH1cbiAgICBnZXQgbmFtZV9jb2x1bW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLkNPTVBfUEFTU19TSEVFVF9OQU1FX0NPTFVNTjtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNYW5hZ2VyUGFzc1NoZWV0IGV4dGVuZHMgUGFzc1NoZWV0IHtcbiAgICBjb25maWc6IE1hbmFnZXJQYXNzZXNDb25maWc7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzIHwgbnVsbCxcbiAgICAgICAgY29uZmlnOiBNYW5hZ2VyUGFzc2VzQ29uZmlnXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgbmV3IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiKFxuICAgICAgICAgICAgICAgIHNoZWV0c19zZXJ2aWNlLFxuICAgICAgICAgICAgICAgIGNvbmZpZy5TSEVFVF9JRCxcbiAgICAgICAgICAgICAgICBjb25maWcuTUFOQUdFUl9QQVNTX1NIRUVUXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgQ29tcFBhc3NUeXBlLk1hbmFnZXJQYXNzXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgIH1cblxuICAgIGdldCBzdGFydF9pbmRleCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gZXhjZWxfcm93X3RvX2luZGV4KFxuICAgICAgICAgICAgdGhpcy5jb25maWcuTUFOQUdFUl9QQVNTX1NIRUVUX0RBVEVTX1NUQVJUSU5HX0NPTFVNTlxuICAgICAgICApO1xuICAgIH1cbiAgICBnZXQgc2hlZXRfbmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuTUFOQUdFUl9QQVNTX1NIRUVUO1xuICAgIH1cbiAgICBnZXQgYXZhaWxhYmxlX2NvbHVtbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuTUFOQUdFUl9QQVNTX1NIRUVUX0FWQUlMQUJMRV9DT0xVTU47XG4gICAgfVxuICAgIGdldCB1c2VkX3RvZGF5X2NvbHVtbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuTUFOQUdFUl9QQVNTX1NIRUVUX1VTRURfVE9EQVlfQ09MVU1OO1xuICAgIH1cbiAgICBnZXQgdXNlZF9zZWFzb25fY29sdW1uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5NQU5BR0VSX1BBU1NfU0hFRVRfVVNFRF9TRUFTT05fQ09MVU1OO1xuICAgIH1cbiAgICBnZXQgbmFtZV9jb2x1bW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLk1BTkFHRVJfUEFTU19TSEVFVF9OQU1FX0NPTFVNTjtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBsb29rdXBfcm93X2NvbF9pbl9zaGVldCwgZXhjZWxfcm93X3RvX2luZGV4IH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxcIjtcbmltcG9ydCBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYiBmcm9tIFwiLi4vdXRpbHMvZ29vZ2xlX3NoZWV0c19zcHJlYWRzaGVldF90YWJcIjtcbmltcG9ydCB7IHNhbml0aXplX2RhdGUgfSBmcm9tIFwiLi4vdXRpbHMvZGF0ZXRpbWVfdXRpbFwiO1xuaW1wb3J0IHsgTG9naW5TaGVldENvbmZpZywgUGF0cm9sbGVyUm93Q29uZmlnIH0gZnJvbSBcIi4uL2Vudi9oYW5kbGVyX2NvbmZpZ1wiO1xuaW1wb3J0IHsgc2hlZXRzX3Y0IH0gZnJvbSBcImdvb2dsZWFwaXNcIjtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcm93IG9mIHBhdHJvbGxlciBkYXRhLlxuICogQHR5cGVkZWYge09iamVjdH0gUGF0cm9sbGVyUm93XG4gKiBAcHJvcGVydHkge251bWJlcn0gaW5kZXggLSBUaGUgaW5kZXggb2YgdGhlIHJvdy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHBhdHJvbGxlci5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBjYXRlZ29yeSAtIFRoZSBjYXRlZ29yeSBvZiB0aGUgcGF0cm9sbGVyLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IHNlY3Rpb24gLSBUaGUgc2VjdGlvbiBvZiB0aGUgcGF0cm9sbGVyLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IGNoZWNraW4gLSBUaGUgY2hlY2staW4gc3RhdHVzIG9mIHRoZSBwYXRyb2xsZXIuXG4gKi9cbmV4cG9ydCB0eXBlIFBhdHJvbGxlclJvdyA9IHtcbiAgICBpbmRleDogbnVtYmVyO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBjYXRlZ29yeTogc3RyaW5nO1xuICAgIHNlY3Rpb246IHN0cmluZztcbiAgICBjaGVja2luOiBzdHJpbmc7XG59O1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhIGxvZ2luIHNoZWV0IGluIEdvb2dsZSBTaGVldHMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ2luU2hlZXQge1xuICAgIGxvZ2luX3NoZWV0OiBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYjtcbiAgICBjaGVja2luX2NvdW50X3NoZWV0OiBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYjtcbiAgICBjb25maWc6IExvZ2luU2hlZXRDb25maWc7XG4gICAgcm93cz86IGFueVtdW10gfCBudWxsID0gbnVsbDtcbiAgICBjaGVja2luX2NvdW50OiBudW1iZXIgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gICAgcGF0cm9sbGVyczogUGF0cm9sbGVyUm93W10gPSBbXTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgTG9naW5TaGVldC5cbiAgICAgKiBAcGFyYW0ge3NoZWV0c192NC5TaGVldHMgfCBudWxsfSBzaGVldHNfc2VydmljZSAtIFRoZSBHb29nbGUgU2hlZXRzIEFQSSBzZXJ2aWNlLlxuICAgICAqIEBwYXJhbSB7TG9naW5TaGVldENvbmZpZ30gY29uZmlnIC0gVGhlIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBsb2dpbiBzaGVldC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgc2hlZXRzX3NlcnZpY2U6IHNoZWV0c192NC5TaGVldHMgfCBudWxsLFxuICAgICAgICBjb25maWc6IExvZ2luU2hlZXRDb25maWdcbiAgICApIHtcbiAgICAgICAgdGhpcy5sb2dpbl9zaGVldCA9IG5ldyBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYihcbiAgICAgICAgICAgIHNoZWV0c19zZXJ2aWNlLFxuICAgICAgICAgICAgY29uZmlnLlNIRUVUX0lELFxuICAgICAgICAgICAgY29uZmlnLkxPR0lOX1NIRUVUX0xPT0tVUFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmNoZWNraW5fY291bnRfc2hlZXQgPSBuZXcgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIoXG4gICAgICAgICAgICBzaGVldHNfc2VydmljZSxcbiAgICAgICAgICAgIGNvbmZpZy5TSEVFVF9JRCxcbiAgICAgICAgICAgIGNvbmZpZy5DSEVDS0lOX0NPVU5UX0xPT0tVUFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWZyZXNoZXMgdGhlIGRhdGEgZnJvbSB0aGUgR29vZ2xlIFNoZWV0cy5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICAgKi9cbiAgICBhc3luYyByZWZyZXNoKCkge1xuICAgICAgICB0aGlzLnJvd3MgPSBhd2FpdCB0aGlzLmxvZ2luX3NoZWV0LmdldF92YWx1ZXMoXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5MT0dJTl9TSEVFVF9MT09LVVBcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jaGVja2luX2NvdW50ID0gKGF3YWl0IHRoaXMuY2hlY2tpbl9jb3VudF9zaGVldC5nZXRfdmFsdWVzKFxuICAgICAgICAgICAgdGhpcy5jb25maWcuQ0hFQ0tJTl9DT1VOVF9MT09LVVBcbiAgICAgICAgKSkhWzBdWzBdO1xuICAgICAgICB0aGlzLnBhdHJvbGxlcnMgPSB0aGlzLnJvd3MhLm1hcCgoeCwgaSkgPT5cbiAgICAgICAgICAgIHRoaXMucGFyc2VfcGF0cm9sbGVyX3JvdyhpLCB4LCB0aGlzLmNvbmZpZylcbiAgICAgICAgKS5maWx0ZXIoKHgpID0+IHggIT0gbnVsbCkgYXMgUGF0cm9sbGVyUm93W107XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJSZWZyZXNoaW5nIFBhdHJvbGxlcnM6IFwiICk7XG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5wYXRyb2xsZXJzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBhcmNoaXZlZCBzdGF0dXMgb2YgdGhlIGxvZ2luIHNoZWV0LlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzaGVldCBpcyBhcmNoaXZlZCwgb3RoZXJ3aXNlIGZhbHNlLlxuICAgICAqL1xuICAgIGdldCBhcmNoaXZlZCgpIHtcbiAgICAgICAgY29uc3QgYXJjaGl2ZWQgPSBsb29rdXBfcm93X2NvbF9pbl9zaGVldChcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLkFSQ0hJVkVEX0NFTEwsXG4gICAgICAgICAgICB0aGlzLnJvd3MhXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAoYXJjaGl2ZWQgPT09IHVuZGVmaW5lZCAmJiB0aGlzLmNoZWNraW5fY291bnQgPT09IDApIHx8XG4gICAgICAgICAgICBhcmNoaXZlZC50b0xvd2VyQ2FzZSgpID09PSBcInllc1wiXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgZGF0ZSBvZiB0aGUgc2hlZXQuXG4gICAgICogQHJldHVybnMge0RhdGV9IFRoZSBkYXRlIG9mIHRoZSBzaGVldC5cbiAgICAgKi9cbiAgICBnZXQgc2hlZXRfZGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHNhbml0aXplX2RhdGUoXG4gICAgICAgICAgICBsb29rdXBfcm93X2NvbF9pbl9zaGVldCh0aGlzLmNvbmZpZy5TSEVFVF9EQVRFX0NFTEwsIHRoaXMucm93cyEpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgY3VycmVudCBkYXRlLlxuICAgICAqIEByZXR1cm5zIHtEYXRlfSBUaGUgY3VycmVudCBkYXRlLlxuICAgICAqL1xuICAgIGdldCBjdXJyZW50X2RhdGUoKSB7XG4gICAgICAgIHJldHVybiBzYW5pdGl6ZV9kYXRlKFxuICAgICAgICAgICAgbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQodGhpcy5jb25maWcuQ1VSUkVOVF9EQVRFX0NFTEwsIHRoaXMucm93cyEpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHRoZSBzaGVldCBkYXRlIGlzIHRoZSBjdXJyZW50IGRhdGUuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNoZWV0IGRhdGUgaXMgdGhlIGN1cnJlbnQgZGF0ZSwgb3RoZXJ3aXNlIGZhbHNlLlxuICAgICAqL1xuICAgIGdldCBpc19jdXJyZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zaGVldF9kYXRlLmdldFRpbWUoKSA9PT0gdGhpcy5jdXJyZW50X2RhdGUuZ2V0VGltZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWVzIHRvIGZpbmQgYSBwYXRyb2xsZXIgYnkgbmFtZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwYXRyb2xsZXIuXG4gICAgICogQHJldHVybnMge1BhdHJvbGxlclJvdyB8IFwibm90X2ZvdW5kXCJ9IFRoZSBwYXRyb2xsZXIgcm93IG9yIFwibm90X2ZvdW5kXCIuXG4gICAgICovXG4gICAgdHJ5X2ZpbmRfcGF0cm9sbGVyKG5hbWU6IHN0cmluZykge1xuICAgICAgICBjb25zdCBwYXRyb2xsZXJzID0gdGhpcy5wYXRyb2xsZXJzLmZpbHRlcigoeCkgPT4geC5uYW1lID09PSBuYW1lKTtcbiAgICAgICAgaWYgKHBhdHJvbGxlcnMubGVuZ3RoICE9PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJub3RfZm91bmRcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGF0cm9sbGVyc1swXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaW5kcyBhIHBhdHJvbGxlciBieSBuYW1lLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHBhdHJvbGxlci5cbiAgICAgKiBAcmV0dXJucyB7UGF0cm9sbGVyUm93fSBUaGUgcGF0cm9sbGVyIHJvdy5cbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBhdHJvbGxlciBpcyBub3QgZm91bmQuXG4gICAgICovXG4gICAgZmluZF9wYXRyb2xsZXIobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMudHJ5X2ZpbmRfcGF0cm9sbGVyKG5hbWUpO1xuICAgICAgICBpZiAocmVzdWx0ID09PSBcIm5vdF9mb3VuZFwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBmaW5kICR7bmFtZX0gaW4gbG9naW4gc2hlZXRgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHBhdHJvbGxlcnMgd2hvIGFyZSBvbiBkdXR5LlxuICAgICAqIEByZXR1cm5zIHtQYXRyb2xsZXJSb3dbXX0gVGhlIGxpc3Qgb2Ygb24tZHV0eSBwYXRyb2xsZXJzLlxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgbG9naW4gc2hlZXQgaXMgbm90IGN1cnJlbnQuXG4gICAgICovXG4gICAgZ2V0X29uX2R1dHlfcGF0cm9sbGVycygpOiBQYXRyb2xsZXJSb3dbXSB7XG4gICAgICAgIGlmICghdGhpcy5pc19jdXJyZW50KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJMb2dpbiBzaGVldCBpcyBub3QgY3VycmVudFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wYXRyb2xsZXJzLmZpbHRlcigoeCkgPT4geC5jaGVja2luKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaW4gYSBwYXRyb2xsZXIgd2l0aCBhIG5ldyBjaGVjay1pbiB2YWx1ZS5cbiAgICAgKiBAcGFyYW0ge1BhdHJvbGxlclJvd30gcGF0cm9sbGVyX3N0YXR1cyAtIFRoZSBzdGF0dXMgb2YgdGhlIHBhdHJvbGxlci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmV3X2NoZWNraW5fdmFsdWUgLSBUaGUgbmV3IGNoZWNrLWluIHZhbHVlLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgbG9naW4gc2hlZXQgaXMgbm90IGN1cnJlbnQuXG4gICAgICovXG4gICAgYXN5bmMgY2hlY2tpbihwYXRyb2xsZXJfc3RhdHVzOiBQYXRyb2xsZXJSb3csIG5ld19jaGVja2luX3ZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzX2N1cnJlbnQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxvZ2luIHNoZWV0IGlzIG5vdCBjdXJyZW50XCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGBFeGlzdGluZyBzdGF0dXM6ICR7SlNPTi5zdHJpbmdpZnkocGF0cm9sbGVyX3N0YXR1cyl9YCk7XG5cbiAgICAgICAgY29uc3Qgcm93ID0gcGF0cm9sbGVyX3N0YXR1cy5pbmRleCArIDE7IC8vIHByb2dyYW1taW5nIC0+IGV4Y2VsIGxvb2t1cFxuICAgICAgICBjb25zdCByYW5nZSA9IGAke3RoaXMuY29uZmlnLkNIRUNLSU5fRFJPUERPV05fQ09MVU1OfSR7cm93fWA7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5sb2dpbl9zaGVldC51cGRhdGVfdmFsdWVzKHJhbmdlLCBbW25ld19jaGVja2luX3ZhbHVlXV0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlcyBhIHJvdyBvZiBwYXRyb2xsZXIgZGF0YS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggLSBUaGUgaW5kZXggb2YgdGhlIHJvdy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSByb3cgLSBUaGUgcm93IGRhdGEuXG4gICAgICogQHBhcmFtIHtQYXRyb2xsZXJSb3dDb25maWd9IG9wdHMgLSBUaGUgY29uZmlndXJhdGlvbiBvcHRpb25zIGZvciB0aGUgcGF0cm9sbGVyIHJvdy5cbiAgICAgKiBAcmV0dXJucyB7UGF0cm9sbGVyUm93IHwgbnVsbH0gVGhlIHBhcnNlZCBwYXRyb2xsZXIgcm93IG9yIG51bGwgaWYgaW52YWxpZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHBhcnNlX3BhdHJvbGxlcl9yb3coXG4gICAgICAgIGluZGV4OiBudW1iZXIsXG4gICAgICAgIHJvdzogc3RyaW5nW10sXG4gICAgICAgIG9wdHM6IFBhdHJvbGxlclJvd0NvbmZpZ1xuICAgICk6IFBhdHJvbGxlclJvdyB8IG51bGwge1xuICAgICAgICBpZiAocm93Lmxlbmd0aCA8IDQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbmRleCA8IDMpe1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIG5hbWU6IHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5OQU1FX0NPTFVNTildLFxuICAgICAgICAgICAgY2F0ZWdvcnk6IHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5DQVRFR09SWV9DT0xVTU4pXSxcbiAgICAgICAgICAgIHNlY3Rpb246IHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5TRUNUSU9OX0RST1BET1dOX0NPTFVNTildLFxuICAgICAgICAgICAgY2hlY2tpbjogcm93W2V4Y2VsX3Jvd190b19pbmRleChvcHRzLkNIRUNLSU5fRFJPUERPV05fQ09MVU1OKV0sXG4gICAgICAgIH07XG4gICAgfVxufSIsImltcG9ydCB7IHNoZWV0c192NCB9IGZyb20gXCJnb29nbGVhcGlzXCI7XG5pbXBvcnQge1xuICAgIFNlYXNvblNoZWV0Q29uZmlnLFxufSBmcm9tIFwiLi4vZW52L2hhbmRsZXJfY29uZmlnXCI7XG5pbXBvcnQgeyBleGNlbF9yb3dfdG9faW5kZXggfSBmcm9tIFwiLi4vdXRpbHMvdXRpbFwiO1xuaW1wb3J0IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiIGZyb20gXCIuLi91dGlscy9nb29nbGVfc2hlZXRzX3NwcmVhZHNoZWV0X3RhYlwiO1xuaW1wb3J0IHsgZmlsdGVyX2xpc3RfdG9fZW5kc3dpdGhfY3VycmVudF9kYXkgfSBmcm9tIFwiLi4vdXRpbHMvZGF0ZXRpbWVfdXRpbFwiO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhIHNlYXNvbiBzaGVldCBpbiBHb29nbGUgU2hlZXRzLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWFzb25TaGVldCB7XG4gICAgc2hlZXQ6IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiO1xuICAgIGNvbmZpZzogU2Vhc29uU2hlZXRDb25maWc7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFNlYXNvblNoZWV0LlxuICAgICAqIEBwYXJhbSB7c2hlZXRzX3Y0LlNoZWV0cyB8IG51bGx9IHNoZWV0c19zZXJ2aWNlIC0gVGhlIEdvb2dsZSBTaGVldHMgQVBJIHNlcnZpY2UuXG4gICAgICogQHBhcmFtIHtTZWFzb25TaGVldENvbmZpZ30gY29uZmlnIC0gVGhlIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBzZWFzb24gc2hlZXQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzIHwgbnVsbCxcbiAgICAgICAgY29uZmlnOiBTZWFzb25TaGVldENvbmZpZ1xuICAgICkge1xuICAgICAgICB0aGlzLnNoZWV0ID0gbmV3IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiKFxuICAgICAgICAgICAgc2hlZXRzX3NlcnZpY2UsXG4gICAgICAgICAgICBjb25maWcuU0hFRVRfSUQsXG4gICAgICAgICAgICBjb25maWcuU0VBU09OX1NIRUVUXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG51bWJlciBvZiBkYXlzIHBhdHJvbGxlZCBieSBhIHBhdHJvbGxlci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0cm9sbGVyX25hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcGF0cm9sbGVyLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPG51bWJlcj59IFRoZSBudW1iZXIgb2YgZGF5cyBwYXRyb2xsZWQuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3BhdHJvbGxlZF9kYXlzKFxuICAgICAgICBwYXRyb2xsZXJfbmFtZTogc3RyaW5nXG4gICAgKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICAgICAgY29uc3QgcGF0cm9sbGVyX3JvdyA9IGF3YWl0IHRoaXMuc2hlZXQuZ2V0X3NoZWV0X3Jvd19mb3JfcGF0cm9sbGVyKFxuICAgICAgICAgICAgcGF0cm9sbGVyX25hbWUsXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5TRUFTT05fU0hFRVRfTkFNRV9DT0xVTU5cbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoIXBhdHJvbGxlcl9yb3cpIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGN1cnJlbnROdW1iZXIgPVxuICAgICAgICAgICAgcGF0cm9sbGVyX3Jvdy5yb3dbZXhjZWxfcm93X3RvX2luZGV4KHRoaXMuY29uZmlnLlNFQVNPTl9TSEVFVF9EQVlTX0NPTFVNTildO1xuXG4gICAgICAgIGNvbnN0IGN1cnJlbnREYXkgPSBmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9jdXJyZW50X2RheShwYXRyb2xsZXJfcm93LnJvdylcbiAgICAgICAgICAgIC5tYXAoKHgpID0+ICh4Py5zdGFydHNXaXRoKFwiSFwiKSA/IDAuNSA6IDEpKVxuICAgICAgICAgICAgLnJlZHVjZSgoeCwgeSwgaSkgPT4geCArIHksIDApO1xuXG4gICAgICAgIGNvbnN0IGRheXNCZWZvcmVUb2RheSA9IGN1cnJlbnROdW1iZXIgLSBjdXJyZW50RGF5O1xuICAgICAgICByZXR1cm4gZGF5c0JlZm9yZVRvZGF5O1xuICAgIH1cbn0iLCJpbXBvcnQgeyBnb29nbGUgfSBmcm9tIFwiZ29vZ2xlYXBpc1wiO1xuaW1wb3J0IHsgR2VuZXJhdGVBdXRoVXJsT3B0cyB9IGZyb20gXCJnb29nbGUtYXV0aC1saWJyYXJ5XCI7XG5pbXBvcnQgeyBPQXV0aDJDbGllbnQgfSBmcm9tIFwiZ29vZ2xlYXBpcy1jb21tb25cIjtcbmltcG9ydCB7IHNhbml0aXplX3Bob25lX251bWJlciB9IGZyb20gXCIuL3V0aWxzL3V0aWxcIjtcbmltcG9ydCB7IGxvYWRfY3JlZGVudGlhbHNfZmlsZXMgfSBmcm9tIFwiLi91dGlscy9maWxlX3V0aWxzXCI7XG5pbXBvcnQgeyBTZXJ2aWNlQ29udGV4dCB9IGZyb20gXCJAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzL3R5cGVzXCI7XG5pbXBvcnQgeyBVc2VyQ3JlZHNDb25maWcgfSBmcm9tIFwiLi9lbnYvaGFuZGxlcl9jb25maWdcIjtcbmltcG9ydCB7IHZhbGlkYXRlX3Njb3BlcyB9IGZyb20gXCIuL3V0aWxzL3Njb3BlX3V0aWxcIjtcblxuY29uc3QgU0NPUEVTID0gW1xuICAgIFwiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9zY3JpcHQucHJvamVjdHNcIixcbiAgICBcImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvc3ByZWFkc2hlZXRzXCIsXG5dO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyB1c2VyIGNyZWRlbnRpYWxzIGZvciBHb29nbGUgT0F1dGgyLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyQ3JlZHMge1xuICAgIG51bWJlcjogc3RyaW5nO1xuICAgIG9hdXRoMl9jbGllbnQ6IE9BdXRoMkNsaWVudDtcbiAgICBzeW5jX2NsaWVudDogU2VydmljZUNvbnRleHQ7XG4gICAgZG9tYWluPzogc3RyaW5nO1xuICAgIGxvYWRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgVXNlckNyZWRzIGluc3RhbmNlLlxuICAgICAqIEBwYXJhbSB7U2VydmljZUNvbnRleHR9IHN5bmNfY2xpZW50IC0gVGhlIFR3aWxpbyBTeW5jIGNsaWVudC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IHVuZGVmaW5lZH0gbnVtYmVyIC0gVGhlIHVzZXIncyBwaG9uZSBudW1iZXIuXG4gICAgICogQHBhcmFtIHtVc2VyQ3JlZHNDb25maWd9IG9wdHMgLSBUaGUgdXNlciBjcmVkZW50aWFscyBjb25maWd1cmF0aW9uLlxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBUaHJvd3MgYW4gZXJyb3IgaWYgdGhlIG51bWJlciBpcyB1bmRlZmluZWQgb3IgbnVsbC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgc3luY19jbGllbnQ6IFNlcnZpY2VDb250ZXh0LFxuICAgICAgICBudW1iZXI6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICAgICAgb3B0czogVXNlckNyZWRzQ29uZmlnXG4gICAgKSB7XG4gICAgICAgIGlmIChudW1iZXIgPT09IHVuZGVmaW5lZCB8fCBudW1iZXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk51bWJlciBpcyB1bmRlZmluZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5udW1iZXIgPSBzYW5pdGl6ZV9waG9uZV9udW1iZXIobnVtYmVyKTtcblxuICAgICAgICBjb25zdCBjcmVkZW50aWFscyA9IGxvYWRfY3JlZGVudGlhbHNfZmlsZXMoKTtcbiAgICAgICAgY29uc3QgeyBjbGllbnRfc2VjcmV0LCBjbGllbnRfaWQsIHJlZGlyZWN0X3VyaXMgfSA9IGNyZWRlbnRpYWxzLndlYjtcbiAgICAgICAgdGhpcy5vYXV0aDJfY2xpZW50ID0gbmV3IGdvb2dsZS5hdXRoLk9BdXRoMihcbiAgICAgICAgICAgIGNsaWVudF9pZCxcbiAgICAgICAgICAgIGNsaWVudF9zZWNyZXQsXG4gICAgICAgICAgICByZWRpcmVjdF91cmlzWzBdXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3luY19jbGllbnQgPSBzeW5jX2NsaWVudDtcbiAgICAgICAgbGV0IGRvbWFpbiA9IG9wdHMuTlNQX0VNQUlMX0RPTUFJTjtcbiAgICAgICAgaWYgKGRvbWFpbiA9PT0gdW5kZWZpbmVkIHx8IGRvbWFpbiA9PT0gbnVsbCB8fCBkb21haW4gPT09IFwiXCIpIHtcbiAgICAgICAgICAgIGRvbWFpbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZG9tYWluID0gZG9tYWluO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9hZCB0aGUgT0F1dGgyIHRva2VuLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIGJvb2xlYW4gaW5kaWNhdGluZyBpZiB0aGUgdG9rZW4gd2FzIGxvYWRlZC5cbiAgICAgKi9cbiAgICBhc3luYyBsb2FkVG9rZW4oKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIGlmICghdGhpcy5sb2FkZWQpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYExvb2tpbmcgZm9yICR7dGhpcy50b2tlbl9rZXl9YCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2F1dGgyRG9jID0gYXdhaXQgdGhpcy5zeW5jX2NsaWVudFxuICAgICAgICAgICAgICAgICAgICAuZG9jdW1lbnRzKHRoaXMudG9rZW5fa2V5KVxuICAgICAgICAgICAgICAgICAgICAuZmV0Y2goKTtcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIG9hdXRoMkRvYyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgICAgIG9hdXRoMkRvYy5kYXRhID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgICAgICBvYXV0aDJEb2MuZGF0YS50b2tlbiA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBEaWRuJ3QgZmluZCAke3RoaXMudG9rZW5fa2V5fWApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRva2VuID0gb2F1dGgyRG9jLmRhdGEudG9rZW47XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlX3Njb3BlcyhvYXV0aDJEb2MuZGF0YS5zY29wZXMsIFNDT1BFUyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2F1dGgyX2NsaWVudC5zZXRDcmVkZW50aWFscyh0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBMb2FkZWQgdG9rZW4gJHt0aGlzLnRva2VuX2tleX1gKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICAgICAgYEZhaWxlZCB0byBsb2FkIHRva2VuIGZvciAke3RoaXMudG9rZW5fa2V5fS5cXG4gJHtlfWBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHRva2VuIGtleS5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgdG9rZW4ga2V5LlxuICAgICAqL1xuICAgIGdldCB0b2tlbl9rZXkoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGBvYXV0aDJfJHt0aGlzLm51bWJlcn1gO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlbGV0ZSB0aGUgT0F1dGgyIHRva2VuLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIGJvb2xlYW4gaW5kaWNhdGluZyBpZiB0aGUgdG9rZW4gd2FzIGRlbGV0ZWQuXG4gICAgICovXG4gICAgYXN5bmMgZGVsZXRlVG9rZW4oKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIGNvbnN0IG9hdXRoMkRvYyA9IGF3YWl0IHRoaXMuc3luY19jbGllbnRcbiAgICAgICAgICAgIC5kb2N1bWVudHModGhpcy50b2tlbl9rZXkpXG4gICAgICAgICAgICAuZmV0Y2goKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgb2F1dGgyRG9jID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIG9hdXRoMkRvYy5kYXRhID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgb2F1dGgyRG9jLmRhdGEudG9rZW4gPT09IHVuZGVmaW5lZFxuICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBEaWRuJ3QgZmluZCAke3RoaXMudG9rZW5fa2V5fWApO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHRoaXMuc3luY19jbGllbnQuZG9jdW1lbnRzKG9hdXRoMkRvYy5zaWQpLnJlbW92ZSgpO1xuICAgICAgICBjb25zb2xlLmxvZyhgRGVsZXRlZCB0b2tlbiAke3RoaXMudG9rZW5fa2V5fWApO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb21wbGV0ZSB0aGUgbG9naW4gcHJvY2VzcyBieSBleGNoYW5naW5nIHRoZSBhdXRob3JpemF0aW9uIGNvZGUgZm9yIGEgdG9rZW4uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvZGUgLSBUaGUgYXV0aG9yaXphdGlvbiBjb2RlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IHNjb3BlcyAtIFRoZSBzY29wZXMgdG8gdmFsaWRhdGUuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGxvZ2luIHByb2Nlc3MgaXMgY29tcGxldGUuXG4gICAgICovXG4gICAgYXN5bmMgY29tcGxldGVMb2dpbihjb2RlOiBzdHJpbmcsIHNjb3Blczogc3RyaW5nW10pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgdmFsaWRhdGVfc2NvcGVzKHNjb3BlcywgU0NPUEVTKTtcbiAgICAgICAgY29uc3QgdG9rZW4gPSBhd2FpdCB0aGlzLm9hdXRoMl9jbGllbnQuZ2V0VG9rZW4oY29kZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KE9iamVjdC5rZXlzKHRva2VuLnJlcyEpKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRva2VuLnRva2VucykpO1xuICAgICAgICB0aGlzLm9hdXRoMl9jbGllbnQuc2V0Q3JlZGVudGlhbHModG9rZW4udG9rZW5zKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IG9hdXRoRG9jID0gYXdhaXQgdGhpcy5zeW5jX2NsaWVudC5kb2N1bWVudHMuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICBkYXRhOiB7IHRva2VuOiB0b2tlbi50b2tlbnMsIHNjb3Blczogc2NvcGVzIH0sXG4gICAgICAgICAgICAgICAgdW5pcXVlTmFtZTogdGhpcy50b2tlbl9rZXksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgYEV4Y2VwdGlvbiB3aGVuIGNyZWF0aW5nIG9hdXRoLiBUcnlpbmcgdG8gdXBkYXRlIGluc3RlYWQuLi5cXG4ke2V9YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IG9hdXRoRG9jID0gYXdhaXQgdGhpcy5zeW5jX2NsaWVudFxuICAgICAgICAgICAgICAgIC5kb2N1bWVudHModGhpcy50b2tlbl9rZXkpXG4gICAgICAgICAgICAgICAgLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHsgdG9rZW46IHRva2VuLCBzY29wZXM6IHNjb3BlcyB9LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBhdXRob3JpemF0aW9uIFVSTC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzdHJpbmc+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgYXV0aG9yaXphdGlvbiBVUkwuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0QXV0aFVybCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zdCBpZCA9IHRoaXMuZ2VuZXJhdGVSYW5kb21TdHJpbmcoKTtcbiAgICAgICAgY29uc29sZS5sb2coYFVzaW5nIG5vbmNlICR7aWR9IGZvciAke3RoaXMubnVtYmVyfWApO1xuICAgICAgICBjb25zdCBkb2MgPSBhd2FpdCB0aGlzLnN5bmNfY2xpZW50LmRvY3VtZW50cy5jcmVhdGUoe1xuICAgICAgICAgICAgZGF0YTogeyBudW1iZXI6IHRoaXMubnVtYmVyLCBzY29wZXM6IFNDT1BFUyB9LFxuICAgICAgICAgICAgdW5pcXVlTmFtZTogaWQsXG4gICAgICAgICAgICB0dGw6IDYwICogNSwgLy8gNSBtaW51dGVzXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhgTWFkZSBub25jZS1kb2M6ICR7SlNPTi5zdHJpbmdpZnkoZG9jKX1gKTtcblxuICAgICAgICBjb25zdCBvcHRzOiBHZW5lcmF0ZUF1dGhVcmxPcHRzID0ge1xuICAgICAgICAgICAgYWNjZXNzX3R5cGU6IFwib2ZmbGluZVwiLFxuICAgICAgICAgICAgc2NvcGU6IFNDT1BFUyxcbiAgICAgICAgICAgIHN0YXRlOiBpZCxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMuZG9tYWluKSB7XG4gICAgICAgICAgICBvcHRzW1wiaGRcIl0gPSB0aGlzLmRvbWFpbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGF1dGhVcmwgPSB0aGlzLm9hdXRoMl9jbGllbnQuZ2VuZXJhdGVBdXRoVXJsKG9wdHMpO1xuICAgICAgICByZXR1cm4gYXV0aFVybDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZSBhIHJhbmRvbSBzdHJpbmcuXG4gICAgICogQHJldHVybnMge3N0cmluZ30gQSByYW5kb20gc3RyaW5nLlxuICAgICAqL1xuICAgIGdlbmVyYXRlUmFuZG9tU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IDMwO1xuICAgICAgICBsZXQgcmVzdWx0ID0gXCJcIjtcbiAgICAgICAgY29uc3QgY2hhcmFjdGVycyA9XG4gICAgICAgICAgICBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5XCI7XG4gICAgICAgIGNvbnN0IGNoYXJhY3RlcnNMZW5ndGggPSBjaGFyYWN0ZXJzLmxlbmd0aDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0ICs9IGNoYXJhY3RlcnMuY2hhckF0KFxuICAgICAgICAgICAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJhY3RlcnNMZW5ndGgpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuXG4vKipcbiAqIEludGVyZmFjZSByZXByZXNlbnRpbmcgdGhlIHVzZXIgY3JlZGVudGlhbHMgY29uZmlndXJhdGlvbi5cbiAqL1xuZXhwb3J0IHsgVXNlckNyZWRzLCBTQ09QRVMgYXMgVXNlckNyZWRzU2NvcGVzIH07XG4iLCIvKipcbiAqIFJlcHJlc2VudHMgYSBjaGVjay1pbiB2YWx1ZSB3aXRoIHZhcmlvdXMgcHJvcGVydGllcyBhbmQgbG9va3VwIHZhbHVlcy5cbiAqL1xuY2xhc3MgQ2hlY2tpblZhbHVlIHtcbiAgICBrZXk6IHN0cmluZztcbiAgICBzaGVldHNfdmFsdWU6IHN0cmluZztcbiAgICBzbXNfZGVzYzogc3RyaW5nO1xuICAgIGZhc3RfY2hlY2tpbnM6IHN0cmluZ1tdO1xuICAgIGxvb2t1cF92YWx1ZXM6IFNldDxzdHJpbmc+O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBDaGVja2luVmFsdWUuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIFRoZSBrZXkgZm9yIHRoZSBjaGVjay1pbiB2YWx1ZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2hlZXRzX3ZhbHVlIC0gVGhlIHZhbHVlIHVzZWQgaW4gc2hlZXRzLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzbXNfZGVzYyAtIFRoZSBkZXNjcmlwdGlvbiB1c2VkIGluIFNNUy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IHN0cmluZ1tdfSBmYXN0X2NoZWNraW5zIC0gVGhlIGZhc3QgY2hlY2staW4gdmFsdWVzLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBrZXk6IHN0cmluZyxcbiAgICAgICAgc2hlZXRzX3ZhbHVlOiBzdHJpbmcsXG4gICAgICAgIHNtc19kZXNjOiBzdHJpbmcsXG4gICAgICAgIGZhc3RfY2hlY2tpbnM6IHN0cmluZyB8IHN0cmluZ1tdXG4gICAgKSB7XG4gICAgICAgIGlmICghKGZhc3RfY2hlY2tpbnMgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgICAgICAgIGZhc3RfY2hlY2tpbnMgPSBbZmFzdF9jaGVja2luc107XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgICAgIHRoaXMuc2hlZXRzX3ZhbHVlID0gc2hlZXRzX3ZhbHVlO1xuICAgICAgICB0aGlzLnNtc19kZXNjID0gc21zX2Rlc2M7XG4gICAgICAgIHRoaXMuZmFzdF9jaGVja2lucyA9IGZhc3RfY2hlY2tpbnMubWFwKCh4KSA9PiB4LnRyaW0oKS50b0xvd2VyQ2FzZSgpKTtcblxuICAgICAgICBjb25zdCBzbXNfZGVzY19zcGxpdDogc3RyaW5nW10gPSBzbXNfZGVzY1xuICAgICAgICAgICAgLnJlcGxhY2UoL1xccysvLCBcIi1cIilcbiAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICAuc3BsaXQoXCIvXCIpO1xuICAgICAgICBjb25zdCBsb29rdXBfdmFscyA9IFsuLi50aGlzLmZhc3RfY2hlY2tpbnMsIC4uLnNtc19kZXNjX3NwbGl0XTtcbiAgICAgICAgdGhpcy5sb29rdXBfdmFsdWVzID0gbmV3IFNldDxzdHJpbmc+KGxvb2t1cF92YWxzKTtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGNvbGxlY3Rpb24gb2YgY2hlY2staW4gdmFsdWVzIHdpdGggdmFyaW91cyBsb29rdXAgbWV0aG9kcy5cbiAqL1xuY2xhc3MgQ2hlY2tpblZhbHVlcyB7XG4gICAgYnlfa2V5OiB7IFtrZXk6IHN0cmluZ106IENoZWNraW5WYWx1ZSB9ID0ge307XG4gICAgYnlfbHY6IHsgW2tleTogc3RyaW5nXTogQ2hlY2tpblZhbHVlIH0gPSB7fTtcbiAgICBieV9mYzogeyBba2V5OiBzdHJpbmddOiBDaGVja2luVmFsdWUgfSA9IHt9O1xuICAgIGJ5X3NoZWV0X3N0cmluZzogeyBba2V5OiBzdHJpbmddOiBDaGVja2luVmFsdWUgfSA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBDaGVja2luVmFsdWVzLlxuICAgICAqIEBwYXJhbSB7Q2hlY2tpblZhbHVlW119IGNoZWNraW5WYWx1ZXMgLSBUaGUgYXJyYXkgb2YgY2hlY2staW4gdmFsdWVzLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNoZWNraW5WYWx1ZXM6IENoZWNraW5WYWx1ZVtdKSB7XG4gICAgICAgIGZvciAodmFyIGNoZWNraW5WYWx1ZSBvZiBjaGVja2luVmFsdWVzKSB7XG4gICAgICAgICAgICB0aGlzLmJ5X2tleVtjaGVja2luVmFsdWUua2V5XSA9IGNoZWNraW5WYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuYnlfc2hlZXRfc3RyaW5nW2NoZWNraW5WYWx1ZS5zaGVldHNfdmFsdWVdID0gY2hlY2tpblZhbHVlO1xuICAgICAgICAgICAgZm9yIChjb25zdCBsdiBvZiBjaGVja2luVmFsdWUubG9va3VwX3ZhbHVlcykge1xuICAgICAgICAgICAgICAgIHRoaXMuYnlfbHZbbHZdID0gY2hlY2tpblZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCBmYyBvZiBjaGVja2luVmFsdWUuZmFzdF9jaGVja2lucykge1xuICAgICAgICAgICAgICAgIHRoaXMuYnlfZmNbZmNdID0gY2hlY2tpblZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZW50cmllcyBvZiBjaGVjay1pbiB2YWx1ZXMgYnkga2V5LlxuICAgICAqIEByZXR1cm5zIHtBcnJheX0gVGhlIGVudHJpZXMgb2YgY2hlY2staW4gdmFsdWVzLlxuICAgICAqL1xuICAgIGVudHJpZXMoKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuZW50cmllcyh0aGlzLmJ5X2tleSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIGEgZmFzdCBjaGVjay1pbiB2YWx1ZSBmcm9tIHRoZSBnaXZlbiBib2R5IHN0cmluZy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYm9keSAtIFRoZSBib2R5IHN0cmluZyB0byBwYXJzZS5cbiAgICAgKiBAcmV0dXJucyB7Q2hlY2tpblZhbHVlIHwgdW5kZWZpbmVkfSBUaGUgcGFyc2VkIGNoZWNrLWluIHZhbHVlIG9yIHVuZGVmaW5lZC5cbiAgICAgKi9cbiAgICBwYXJzZV9mYXN0X2NoZWNraW4oYm9keTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJ5X2ZjW2JvZHldO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlcyBhIGNoZWNrLWluIHZhbHVlIGZyb20gdGhlIGdpdmVuIGJvZHkgc3RyaW5nLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5IC0gVGhlIGJvZHkgc3RyaW5nIHRvIHBhcnNlLlxuICAgICAqIEByZXR1cm5zIHtDaGVja2luVmFsdWUgfCB1bmRlZmluZWR9IFRoZSBwYXJzZWQgY2hlY2staW4gdmFsdWUgb3IgdW5kZWZpbmVkLlxuICAgICAqL1xuICAgIHBhcnNlX2NoZWNraW4oYm9keTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGNoZWNraW5fbG93ZXIgPSBib2R5LnJlcGxhY2UoL1xccysvLCBcIlwiKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnlfbHZbY2hlY2tpbl9sb3dlcl07XG4gICAgfVxufVxuXG5leHBvcnQgeyBDaGVja2luVmFsdWUsIENoZWNraW5WYWx1ZXMgfSIsIi8qKlxuICogRW51bSBmb3IgZGlmZmVyZW50IHR5cGVzIG9mIGNvbXAgcGFzc2VzLlxuICogQGVudW0ge3N0cmluZ31cbiAqL1xuZXhwb3J0IGVudW0gQ29tcFBhc3NUeXBlIHtcbiAgICBDb21wUGFzcyA9IFwiY29tcC1wYXNzXCIsXG4gICAgTWFuYWdlclBhc3MgPSBcIm1hbmFnZXItcGFzc1wiLFxufVxuXG4vKipcbiAqIEdldCB0aGUgZGVzY3JpcHRpb24gZm9yIGEgZ2l2ZW4gY29tcCBwYXNzIHR5cGUuXG4gKiBAcGFyYW0ge0NvbXBQYXNzVHlwZX0gdHlwZSAtIFRoZSB0eXBlIG9mIHRoZSBjb21wIHBhc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZGVzY3JpcHRpb24gb2YgdGhlIGNvbXAgcGFzcyB0eXBlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0X2NvbXBfcGFzc19kZXNjcmlwdGlvbih0eXBlOiBDb21wUGFzc1R5cGUpOiBzdHJpbmcge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIENvbXBQYXNzVHlwZS5Db21wUGFzczpcbiAgICAgICAgICAgIHJldHVybiBcIkNvbXAgUGFzc1wiO1xuICAgICAgICBjYXNlIENvbXBQYXNzVHlwZS5NYW5hZ2VyUGFzczpcbiAgICAgICAgICAgIHJldHVybiBcIk1hbmFnZXIgUGFzc1wiO1xuICAgIH1cbiAgICByZXR1cm4gXCJcIjtcbn0iLCIvKipcbiAqIENvbnZlcnQgYW4gRXhjZWwgZGF0ZSB0byBhIEphdmFTY3JpcHQgRGF0ZSBvYmplY3QuXG4gKiBAcGFyYW0ge251bWJlcn0gZGF0ZSAtIFRoZSBFeGNlbCBkYXRlLlxuICogQHJldHVybnMge0RhdGV9IFRoZSBKYXZhU2NyaXB0IERhdGUgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBleGNlbF9kYXRlX3RvX2pzX2RhdGUoZGF0ZTogbnVtYmVyKTogRGF0ZSB7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IERhdGUoMCk7XG4gICAgcmVzdWx0LnNldFVUQ01pbGxpc2Vjb25kcyhNYXRoLnJvdW5kKChkYXRlIC0gMjU1NjkpICogODY0MDAgKiAxMDAwKSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDaGFuZ2UgdGhlIHRpbWV6b25lIG9mIGEgRGF0ZSBvYmplY3QgdG8gUFNULlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIC0gVGhlIERhdGUgb2JqZWN0LlxuICogQHJldHVybnMge0RhdGV9IFRoZSBEYXRlIG9iamVjdCB3aXRoIHRoZSB0aW1lem9uZSBzZXQgdG8gUFNULlxuICovXG5mdW5jdGlvbiBjaGFuZ2VfdGltZXpvbmVfdG9fcHN0KGRhdGU6IERhdGUpOiBEYXRlIHtcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgRGF0ZShkYXRlLnRvVVRDU3RyaW5nKCkucmVwbGFjZShcIiBHTVRcIiwgXCIgUFNUXCIpKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFN0cmlwIHRoZSB0aW1lIGZyb20gYSBEYXRlIG9iamVjdCwga2VlcGluZyBvbmx5IHRoZSBkYXRlLlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIC0gVGhlIERhdGUgb2JqZWN0LlxuICogQHJldHVybnMge0RhdGV9IFRoZSBEYXRlIG9iamVjdCB3aXRoIHRoZSB0aW1lIHN0cmlwcGVkLlxuICovXG5mdW5jdGlvbiBzdHJpcF9kYXRldGltZV90b19kYXRlKGRhdGU6IERhdGUpOiBEYXRlIHtcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgRGF0ZShcbiAgICAgICAgZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoXCJlbi1VU1wiLCB7IHRpbWVab25lOiBcIkFtZXJpY2EvTG9zX0FuZ2VsZXNcIiB9KVxuICAgICk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBTYW5pdGl6ZSBhIGRhdGUgYnkgY29udmVydGluZyBpdCBmcm9tIGFuIEV4Y2VsIGRhdGUgYW5kIHN0cmlwcGluZyB0aGUgdGltZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBkYXRlIC0gVGhlIEV4Y2VsIGRhdGUuXG4gKiBAcmV0dXJucyB7RGF0ZX0gVGhlIHNhbml0aXplZCBEYXRlIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gc2FuaXRpemVfZGF0ZShkYXRlOiBudW1iZXIpOiBEYXRlIHtcbiAgICBjb25zdCByZXN1bHQgPSBzdHJpcF9kYXRldGltZV90b19kYXRlKFxuICAgICAgICBjaGFuZ2VfdGltZXpvbmVfdG9fcHN0KGV4Y2VsX2RhdGVfdG9fanNfZGF0ZShkYXRlKSlcbiAgICApO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRm9ybWF0IGEgRGF0ZSBvYmplY3QgZm9yIHVzZSBpbiBhIHNwcmVhZHNoZWV0IHZhbHVlLlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIC0gVGhlIERhdGUgb2JqZWN0LlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCBkYXRlIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gZm9ybWF0X2RhdGVfZm9yX3NwcmVhZHNoZWV0X3ZhbHVlKGRhdGU6IERhdGUpOiBzdHJpbmcge1xuICAgIGNvbnN0IGRhdGVzdHIgPSBkYXRlXG4gICAgICAgIC50b0xvY2FsZURhdGVTdHJpbmcoKVxuICAgICAgICAuc3BsaXQoXCIvXCIpXG4gICAgICAgIC5tYXAoKHgpID0+IHgucGFkU3RhcnQoMiwgXCIwXCIpKVxuICAgICAgICAuam9pbihcIlwiKTtcbiAgICByZXR1cm4gZGF0ZXN0cjtcbn1cblxuLyoqXG4gKiBGaWx0ZXIgYSBsaXN0IHRvIGluY2x1ZGUgb25seSBpdGVtcyB0aGF0IGVuZCB3aXRoIGEgc3BlY2lmaWMgZGF0ZS5cbiAqIEBwYXJhbSB7YW55W119IGxpc3QgLSBUaGUgbGlzdCB0byBmaWx0ZXIuXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgLSBUaGUgZGF0ZSB0byBmaWx0ZXIgYnkuXG4gKiBAcmV0dXJucyB7YW55W119IFRoZSBmaWx0ZXJlZCBsaXN0LlxuICovXG5mdW5jdGlvbiBmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9kYXRlKGxpc3Q6IGFueVtdLCBkYXRlOiBEYXRlKTogYW55W10ge1xuICAgIGNvbnN0IGRhdGVzdHIgPSBmb3JtYXRfZGF0ZV9mb3Jfc3ByZWFkc2hlZXRfdmFsdWUoZGF0ZSk7XG4gICAgcmV0dXJuIGxpc3QubWFwKCh4KSA9PiB4Py50b1N0cmluZygpKS5maWx0ZXIoKHgpID0+IHg/LmVuZHNXaXRoKGRhdGVzdHIpKTtcbn1cblxuLyoqXG4gKiBGaWx0ZXIgYSBsaXN0IHRvIGluY2x1ZGUgb25seSBpdGVtcyB0aGF0IGVuZCB3aXRoIHRoZSBjdXJyZW50IGRhdGUuXG4gKiBAcGFyYW0ge2FueVtdfSBsaXN0IC0gVGhlIGxpc3QgdG8gZmlsdGVyLlxuICogQHJldHVybnMge2FueVtdfSBUaGUgZmlsdGVyZWQgbGlzdC5cbiAqL1xuZnVuY3Rpb24gZmlsdGVyX2xpc3RfdG9fZW5kc3dpdGhfY3VycmVudF9kYXkobGlzdDogYW55W10pOiBhbnlbXSB7XG4gICAgcmV0dXJuIGZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2RhdGUobGlzdCwgbmV3IERhdGUoKSk7XG59XG5cbmV4cG9ydCB7XG4gICAgc2FuaXRpemVfZGF0ZSxcbiAgICBleGNlbF9kYXRlX3RvX2pzX2RhdGUsXG4gICAgY2hhbmdlX3RpbWV6b25lX3RvX3BzdCxcbiAgICBzdHJpcF9kYXRldGltZV90b19kYXRlLFxuICAgIGZvcm1hdF9kYXRlX2Zvcl9zcHJlYWRzaGVldF92YWx1ZSxcbiAgICBmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9kYXRlLFxuICAgIGZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2N1cnJlbnRfZGF5LFxufTsiLCJpbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCAnQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlcyc7XG5cbi8qKlxuICogTG9hZCBjcmVkZW50aWFscyBmcm9tIGEgSlNPTiBmaWxlLlxuICogQHJldHVybnMge2FueX0gVGhlIHBhcnNlZCBjcmVkZW50aWFscyBmcm9tIHRoZSBKU09OIGZpbGUuXG4gKi9cbmZ1bmN0aW9uIGxvYWRfY3JlZGVudGlhbHNfZmlsZXMoKTogYW55IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShcbiAgICAgICAgZnNcbiAgICAgICAgICAgIC5yZWFkRmlsZVN5bmMoUnVudGltZS5nZXRBc3NldHMoKVtcIi9jcmVkZW50aWFscy5qc29uXCJdLnBhdGgpXG4gICAgICAgICAgICAudG9TdHJpbmcoKVxuICAgICk7XG59XG5cbi8qKlxuICogR2V0IHRoZSBwYXRoIHRvIHRoZSBzZXJ2aWNlIGNyZWRlbnRpYWxzIGZpbGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgcGF0aCB0byB0aGUgc2VydmljZSBjcmVkZW50aWFscyBmaWxlLlxuICovXG5mdW5jdGlvbiBnZXRfc2VydmljZV9jcmVkZW50aWFsc19wYXRoKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFJ1bnRpbWUuZ2V0QXNzZXRzKClbXCIvc2VydmljZS1jcmVkZW50aWFscy5qc29uXCJdLnBhdGg7XG59XG5cbmV4cG9ydCB7IGxvYWRfY3JlZGVudGlhbHNfZmlsZXMsIGdldF9zZXJ2aWNlX2NyZWRlbnRpYWxzX3BhdGggfTsiLCJpbXBvcnQgeyBzaGVldHNfdjQgfSBmcm9tIFwiZ29vZ2xlYXBpc1wiO1xuaW1wb3J0IHsgZXhjZWxfcm93X3RvX2luZGV4IH0gZnJvbSBcIi4vdXRpbFwiO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQgdGFiLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYiB7XG4gICAgc2hlZXRzX3NlcnZpY2U6IHNoZWV0c192NC5TaGVldHMgfCBudWxsO1xuICAgIHNoZWV0X2lkOiBzdHJpbmc7XG4gICAgc2hlZXRfbmFtZTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIuXG4gICAgICogQHBhcmFtIHtzaGVldHNfdjQuU2hlZXRzIHwgbnVsbH0gc2hlZXRzX3NlcnZpY2UgLSBUaGUgR29vZ2xlIFNoZWV0cyBBUEkgc2VydmljZSBpbnN0YW5jZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2hlZXRfaWQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNoZWV0X25hbWUgLSBUaGUgbmFtZSBvZiB0aGUgc2hlZXQgdGFiLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyB8IG51bGwsXG4gICAgICAgIHNoZWV0X2lkOiBzdHJpbmcsXG4gICAgICAgIHNoZWV0X25hbWU6IHN0cmluZ1xuICAgICkge1xuICAgICAgICB0aGlzLnNoZWV0c19zZXJ2aWNlID0gc2hlZXRzX3NlcnZpY2U7XG4gICAgICAgIHRoaXMuc2hlZXRfaWQgPSBzaGVldF9pZDtcbiAgICAgICAgdGhpcy5zaGVldF9uYW1lID0gc2hlZXRfbmFtZS5zcGxpdChcIiFcIilbMF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHZhbHVlcyBmcm9tIHRoZSBzaGVldC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bGx9IFtyYW5nZV0gLSBUaGUgcmFuZ2UgdG8gZ2V0IHZhbHVlcyBmcm9tLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueVtdW10gfCB1bmRlZmluZWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgdmFsdWVzIGZyb20gdGhlIHNoZWV0LlxuICAgICAqL1xuICAgIGFzeW5jIGdldF92YWx1ZXMocmFuZ2U/OiBzdHJpbmcgfCBudWxsKTogUHJvbWlzZTxhbnlbXVtdIHwgdW5kZWZpbmVkPiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2dldF92YWx1ZXMocmFuZ2UpO1xuICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGEudmFsdWVzID8/IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHJvdyBmb3IgYSBzcGVjaWZpYyBwYXRyb2xsZXIuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdHJvbGxlcl9uYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHBhdHJvbGxlci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZV9jb2x1bW4gLSBUaGUgY29sdW1uIHdoZXJlIHRoZSBwYXRyb2xsZXIncyBuYW1lIGlzIGxvY2F0ZWQuXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCBudWxsfSBbcmFuZ2VdIC0gVGhlIHJhbmdlIHRvIHNlYXJjaCB3aXRoaW4uXG4gICAgICogQHJldHVybnMge1Byb21pc2U8eyByb3c6IGFueVtdOyBpbmRleDogbnVtYmVyOyB9IHwgbnVsbD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSByb3cgYW5kIGluZGV4IG9mIHRoZSBwYXRyb2xsZXIsIG9yIG51bGwgaWYgbm90IGZvdW5kLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF9zaGVldF9yb3dfZm9yX3BhdHJvbGxlcihcbiAgICAgICAgcGF0cm9sbGVyX25hbWU6IHN0cmluZyxcbiAgICAgICAgbmFtZV9jb2x1bW46IHN0cmluZyxcbiAgICAgICAgcmFuZ2U/OiBzdHJpbmcgfCBudWxsXG4gICAgKTogUHJvbWlzZTx7IHJvdzogYW55W107IGluZGV4OiBudW1iZXI7IH0gfCBudWxsPiB7XG4gICAgICAgIGNvbnN0IHJvd3MgPSBhd2FpdCB0aGlzLmdldF92YWx1ZXMocmFuZ2UpO1xuICAgICAgICBpZiAocm93cykge1xuICAgICAgICAgICAgY29uc3QgbG9va3VwX2luZGV4ID0gZXhjZWxfcm93X3RvX2luZGV4KG5hbWVfY29sdW1uKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm93cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChyb3dzW2ldW2xvb2t1cF9pbmRleF0gPT09IHBhdHJvbGxlcl9uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHJvdzogcm93c1tpXSwgaW5kZXg6IGkgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgIGBDb3VsZG4ndCBmaW5kIHBhdHJvbGxlciAke3BhdHJvbGxlcl9uYW1lfSBpbiBzaGVldCAke3RoaXMuc2hlZXRfbmFtZX0uYFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdmFsdWVzIGluIHRoZSBzaGVldC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmFuZ2UgLSBUaGUgcmFuZ2UgdG8gdXBkYXRlLlxuICAgICAqIEBwYXJhbSB7YW55W11bXX0gdmFsdWVzIC0gVGhlIHZhbHVlcyB0byB1cGRhdGUuXG4gICAgICovXG4gICAgYXN5bmMgdXBkYXRlX3ZhbHVlcyhyYW5nZTogc3RyaW5nLCB2YWx1ZXM6IGFueVtdW10pIHtcbiAgICAgICAgY29uc3QgdXBkYXRlTWUgPSAoYXdhaXQgdGhpcy5fZ2V0X3ZhbHVlcyhyYW5nZSwgbnVsbCkpLmRhdGE7XG5cbiAgICAgICAgdXBkYXRlTWUudmFsdWVzID0gdmFsdWVzO1xuICAgICAgICBhd2FpdCB0aGlzLnNoZWV0c19zZXJ2aWNlIS5zcHJlYWRzaGVldHMudmFsdWVzLnVwZGF0ZSh7XG4gICAgICAgICAgICBzcHJlYWRzaGVldElkOiB0aGlzLnNoZWV0X2lkLFxuICAgICAgICAgICAgdmFsdWVJbnB1dE9wdGlvbjogXCJVU0VSX0VOVEVSRURcIixcbiAgICAgICAgICAgIHJhbmdlOiB1cGRhdGVNZS5yYW5nZSEsXG4gICAgICAgICAgICByZXF1ZXN0Qm9keTogdXBkYXRlTWUsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB2YWx1ZXMgZnJvbSB0aGUgc2hlZXQgKHByaXZhdGUgbWV0aG9kKS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bGx9IFtyYW5nZV0gLSBUaGUgcmFuZ2UgdG8gZ2V0IHZhbHVlcyBmcm9tLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbH0gW3ZhbHVlUmVuZGVyT3B0aW9uXSAtIFRoZSB2YWx1ZSByZW5kZXIgb3B0aW9uLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueVtdW10+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgdmFsdWUgcmFuZ2UuXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIGFzeW5jIF9nZXRfdmFsdWVzKFxuICAgICAgICByYW5nZT86IHN0cmluZyB8IG51bGwsXG4gICAgICAgIHZhbHVlUmVuZGVyT3B0aW9uOiBzdHJpbmcgfCBudWxsID0gXCJVTkZPUk1BVFRFRF9WQUxVRVwiXG4gICAgKSB7XG4gICAgICAgIGxldCBsb29rdXBSYW5nZSA9IHRoaXMuc2hlZXRfbmFtZTtcbiAgICAgICAgaWYgKHJhbmdlICE9IG51bGwpIHtcbiAgICAgICAgICAgIGxvb2t1cFJhbmdlID0gbG9va3VwUmFuZ2UgKyBcIiFcIjtcblxuICAgICAgICAgICAgaWYgKHJhbmdlLnN0YXJ0c1dpdGgobG9va3VwUmFuZ2UpKSB7XG4gICAgICAgICAgICAgICAgcmFuZ2UgPSByYW5nZS5zdWJzdHJpbmcobG9va3VwUmFuZ2UubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvb2t1cFJhbmdlID0gbG9va3VwUmFuZ2UgKyByYW5nZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgb3B0czogc2hlZXRzX3Y0LlBhcmFtcyRSZXNvdXJjZSRTcHJlYWRzaGVldHMkVmFsdWVzJEdldCA9IHtcbiAgICAgICAgICAgIHNwcmVhZHNoZWV0SWQ6IHRoaXMuc2hlZXRfaWQsXG4gICAgICAgICAgICByYW5nZTogbG9va3VwUmFuZ2UsXG4gICAgICAgIH07XG4gICAgICAgIGlmICh2YWx1ZVJlbmRlck9wdGlvbikge1xuICAgICAgICAgICAgb3B0cy52YWx1ZVJlbmRlck9wdGlvbiA9IHZhbHVlUmVuZGVyT3B0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuc2hlZXRzX3NlcnZpY2UhLnNwcmVhZHNoZWV0cy52YWx1ZXMuZ2V0KG9wdHMpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cbiIsIi8qKlxuICogVmFsaWRhdGVzIGlmIHRoZSBwcm92aWRlZCBzY29wZXMgaW5jbHVkZSBhbGwgZGVzaXJlZCBzY29wZXMuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBzY29wZXMgLSBUaGUgbGlzdCBvZiBzY29wZXMgdG8gdmFsaWRhdGUuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBkZXNpcmVkX3Njb3BlcyAtIFRoZSBsaXN0IG9mIGRlc2lyZWQgc2NvcGVzLlxuICogQHRocm93cyB7RXJyb3J9IFRocm93cyBhbiBlcnJvciBpZiBhbnkgZGVzaXJlZCBzY29wZSBpcyBtaXNzaW5nLlxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZV9zY29wZXMoc2NvcGVzOiBzdHJpbmdbXSwgZGVzaXJlZF9zY29wZXM6IHN0cmluZ1tdKSB7XG4gICAgZm9yIChjb25zdCBkZXNpcmVkX3Njb3BlIG9mIGRlc2lyZWRfc2NvcGVzKSB7XG4gICAgICAgIGlmIChzY29wZXMgPT09IHVuZGVmaW5lZCB8fCAhc2NvcGVzLmluY2x1ZGVzKGRlc2lyZWRfc2NvcGUpKSB7XG4gICAgICAgICAgICBjb25zdCBlcnJvciA9IGBNaXNzaW5nIHNjb3BlICR7ZGVzaXJlZF9zY29wZX0gaW4gcmVjZWl2ZWQgc2NvcGVzOiAke3Njb3Blc31gO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCB7dmFsaWRhdGVfc2NvcGVzfSIsIi8qKlxuICogQ29udmVydCByb3cgYW5kIGNvbHVtbiBudW1iZXJzIHRvIGFuIEV4Y2VsLWxpa2UgaW5kZXguXG4gKiBAcGFyYW0ge251bWJlcn0gcm93IC0gVGhlIHJvdyBudW1iZXIgKDAtYmFzZWQpLlxuICogQHBhcmFtIHtudW1iZXJ9IGNvbCAtIFRoZSBjb2x1bW4gbnVtYmVyICgwLWJhc2VkKS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBFeGNlbC1saWtlIGluZGV4IChlLmcuLCBcIkExXCIpLlxuICovXG5mdW5jdGlvbiByb3dfY29sX3RvX2V4Y2VsX2luZGV4KHJvdzogbnVtYmVyLCBjb2w6IG51bWJlcik6IHN0cmluZyB7XG4gICAgbGV0IGNvbFN0cmluZyA9IFwiXCI7XG4gICAgY29sICs9IDE7XG4gICAgd2hpbGUgKGNvbCA+IDApIHtcbiAgICAgICAgY29sIC09IDE7XG4gICAgICAgIGNvbnN0IG1vZHVsbyA9IGNvbCAlIDI2O1xuICAgICAgICBjb25zdCBjb2xMZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKCdBJy5jaGFyQ29kZUF0KDApICsgbW9kdWxvKTtcbiAgICAgICAgY29sU3RyaW5nID0gY29sTGV0dGVyICsgY29sU3RyaW5nO1xuICAgICAgICBjb2wgPSBNYXRoLmZsb29yKGNvbCAvIDI2KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbFN0cmluZyArIChyb3cgKyAxKS50b1N0cmluZygpO1xufVxuXG4vKipcbiAqIFNwbGl0IGFuIEV4Y2VsLWxpa2UgaW5kZXggaW50byByb3cgYW5kIGNvbHVtbiBudW1iZXJzLlxuICogQHBhcmFtIHtzdHJpbmd9IGV4Y2VsX2luZGV4IC0gVGhlIEV4Y2VsLWxpa2UgaW5kZXggKGUuZy4sIFwiQTFcIikuXG4gKiBAcmV0dXJucyB7W251bWJlciwgbnVtYmVyXX0gQW4gYXJyYXkgY29udGFpbmluZyB0aGUgcm93IGFuZCBjb2x1bW4gbnVtYmVycyAoMC1iYXNlZCkuXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIGluZGV4IGNhbm5vdCBiZSBwYXJzZWQuXG4gKi9cbmZ1bmN0aW9uIHNwbGl0X3RvX3Jvd19jb2woZXhjZWxfaW5kZXg6IHN0cmluZyk6IFtudW1iZXIsIG51bWJlcl0ge1xuICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cChcIl4oW0EtWmEtel0rKShbMC05XSspJFwiKTtcbiAgICBjb25zdCBtYXRjaCA9IHJlZ2V4LmV4ZWMoZXhjZWxfaW5kZXgpO1xuICAgIGlmIChtYXRjaCA9PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBwYXJzZSBzdHJpbmcgZm9yIGV4Y2VsIHBvc2l0aW9uIHNwbGl0XCIpO1xuICAgIH1cbiAgICBjb25zdCBjb2wgPSBleGNlbF9yb3dfdG9faW5kZXgobWF0Y2hbMV0pO1xuICAgIGNvbnN0IHJhd19yb3cgPSBOdW1iZXIobWF0Y2hbMl0pO1xuICAgIGlmIChyYXdfcm93IDwgMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJSb3cgbXVzdCBiZSA+PTFcIik7XG4gICAgfVxuICAgIHJldHVybiBbcmF3X3JvdyAtIDEsIGNvbF07XG59XG5cbi8qKlxuICogTG9vayB1cCBhIHZhbHVlIGluIGEgc2hlZXQgYnkgaXRzIEV4Y2VsLWxpa2UgaW5kZXguXG4gKiBAcGFyYW0ge3N0cmluZ30gZXhjZWxfaW5kZXggLSBUaGUgRXhjZWwtbGlrZSBpbmRleCAoZS5nLiwgXCJBMVwiKS5cbiAqIEBwYXJhbSB7YW55W11bXX0gc2hlZXQgLSBUaGUgc2hlZXQgZGF0YS5cbiAqIEByZXR1cm5zIHthbnl9IFRoZSB2YWx1ZSBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LCBvciB1bmRlZmluZWQgaWYgbm90IGZvdW5kLlxuICovXG5mdW5jdGlvbiBsb29rdXBfcm93X2NvbF9pbl9zaGVldChleGNlbF9pbmRleDogc3RyaW5nLCBzaGVldDogYW55W11bXSk6IGFueSB7XG4gICAgY29uc3QgW3JvdywgY29sXSA9IHNwbGl0X3RvX3Jvd19jb2woZXhjZWxfaW5kZXgpO1xuICAgIGlmIChyb3cgPj0gc2hlZXQubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiBzaGVldFtyb3ddW2NvbF07XG59XG5cbi8qKlxuICogQ29udmVydCBFeGNlbC1saWtlIGNvbHVtbiBsZXR0ZXJzIHRvIGEgY29sdW1uIG51bWJlci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBsZXR0ZXJzIC0gVGhlIGNvbHVtbiBsZXR0ZXJzIChlLmcuLCBcIkFcIikuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgY29sdW1uIG51bWJlciAoMC1iYXNlZCkuXG4gKi9cbmZ1bmN0aW9uIGV4Y2VsX3Jvd190b19pbmRleChsZXR0ZXJzOiBzdHJpbmcpOiBudW1iZXIge1xuICAgIGNvbnN0IGxvd2VyTGV0dGVycyA9IGxldHRlcnMudG9Mb3dlckNhc2UoKTtcbiAgICBsZXQgcmVzdWx0OiBudW1iZXIgPSAwO1xuICAgIGZvciAodmFyIHAgPSAwOyBwIDwgbG93ZXJMZXR0ZXJzLmxlbmd0aDsgcCsrKSB7XG4gICAgICAgIGNvbnN0IGNoYXJhY3RlclZhbHVlID1cbiAgICAgICAgICAgIGxvd2VyTGV0dGVycy5jaGFyQ29kZUF0KHApIC0gXCJhXCIuY2hhckNvZGVBdCgwKSArIDE7XG4gICAgICAgIHJlc3VsdCA9IGNoYXJhY3RlclZhbHVlICsgcmVzdWx0ICogMjY7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQgLSAxO1xufVxuXG4vKipcbiAqIFNhbml0aXplIGEgcGhvbmUgbnVtYmVyIGJ5IHJlbW92aW5nIHVud2FudGVkIGNoYXJhY3RlcnMuXG4gKiBAcGFyYW0ge251bWJlciB8IHN0cmluZ30gbnVtYmVyIC0gVGhlIHBob25lIG51bWJlciB0byBzYW5pdGl6ZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBzYW5pdGl6ZWQgcGhvbmUgbnVtYmVyLlxuICovXG5mdW5jdGlvbiBzYW5pdGl6ZV9waG9uZV9udW1iZXIobnVtYmVyOiBudW1iZXIgfCBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGxldCBuZXdfbnVtYmVyID0gbnVtYmVyLnRvU3RyaW5nKCk7XG4gICAgbmV3X251bWJlciA9IG5ld19udW1iZXIucmVwbGFjZShcIndoYXRzYXBwOlwiLCBcIlwiKTtcbiAgICBsZXQgdGVtcG9yYXJ5X25ld19udW1iZXI6IHN0cmluZyA9IFwiXCI7XG4gICAgd2hpbGUgKHRlbXBvcmFyeV9uZXdfbnVtYmVyICE9IG5ld19udW1iZXIpIHtcbiAgICAgICAgLy8gRG8gdGhpcyBtdWx0aXBsZSB0aW1lcyBzbyB3ZSBnZXQgYWxsICsxIGF0IHRoZSBzdGFydCBvZiB0aGUgc3RyaW5nLCBldmVuIGFmdGVyIHN0cmlwcGluZy5cbiAgICAgICAgdGVtcG9yYXJ5X25ld19udW1iZXIgPSBuZXdfbnVtYmVyO1xuICAgICAgICBuZXdfbnVtYmVyID0gbmV3X251bWJlci5yZXBsYWNlKC8oXlxcKzF8XFwofFxcKXxcXC58LSkvZywgXCJcIik7XG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdCA9IFN0cmluZyhwYXJzZUludChuZXdfbnVtYmVyKSkucGFkU3RhcnQoMTAsIFwiMFwiKTtcbiAgICBpZiAocmVzdWx0Lmxlbmd0aCA9PSAxMSAmJiByZXN1bHRbMF0gPT0gXCIxXCIpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5zdWJzdHJpbmcoMSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCB7XG4gICAgcm93X2NvbF90b19leGNlbF9pbmRleCxcbiAgICBleGNlbF9yb3dfdG9faW5kZXgsXG4gICAgc2FuaXRpemVfcGhvbmVfbnVtYmVyLFxuICAgIHNwbGl0X3RvX3Jvd19jb2wsXG4gICAgbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQsXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJnb29nbGVhcGlzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9oYW5kbGVycy9oYW5kbGVyLnByb3RlY3RlZC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==