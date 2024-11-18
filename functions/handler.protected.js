/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/env/handler_config.ts":
/*!***********************************!*\
  !*** ./src/env/handler_config.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CONFIG = void 0;
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
const section_config = {
    SECTION_VALUES: "1,2,3,4,Roving,FAR,Training",
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
    MANAGER_PASS_SHEET_DATES_STARTING_COLUMN: "F",
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
const CONFIG = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, handler_config), find_patroller_config), login_sheet_config), comp_passes_config), manager_passes_config), season_sheet_config), user_creds_config), section_config);
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
const section_values_1 = __webpack_require__(/*! ../utils/section_values */ "./src/utils/section_values.ts");
exports.NEXT_STEPS = {
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
    COMP_PASS: ["comp-pass", "comppass", "comp"],
    MANAGER_PASS: ["manager-pass", "managerpass", "manager"],
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
        this.body_raw = event.Body;
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
        this.checkin_values = new checkin_values_1.CheckinValues(handler_config_1.CONFIG.CHECKIN_VALUES);
        this.current_sheet_date = new Date();
        this.section_values = new section_values_1.SectionValues(this.combined_config);
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
        var _a, _b, _c, _d, _e;
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
            if (((_a = this.body) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "restart") {
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
            else if (((_b = this.bvnsp_checkin_next_step) === null || _b === void 0 ? void 0 : _b.startsWith(exports.NEXT_STEPS.CONFIRM_RESET)) &&
                this.body) {
                if (this.body == "yes" && this.parse_checkin_from_next_step()) {
                    console.log(`Performing reset_sheet_flow for ${this.patroller.name} with checkin mode: ${this.checkin_mode}`);
                    return ((yield this.reset_sheet_flow()) || (yield this.checkin()));
                }
            }
            else if ((_c = this.bvnsp_checkin_next_step) === null || _c === void 0 ? void 0 : _c.startsWith(exports.NEXT_STEPS.AUTH_RESET)) {
                if (this.parse_checkin_from_next_step()) {
                    console.log(`Performing reset_sheet_flow-post-auth for ${this.patroller.name} with checkin mode: ${this.checkin_mode}`);
                    return ((yield this.reset_sheet_flow()) || (yield this.checkin()));
                }
            }
            else if (((_d = this.bvnsp_checkin_next_step) === null || _d === void 0 ? void 0 : _d.startsWith(exports.NEXT_STEPS.AWAIT_PASS)) &&
                this.body_raw) {
                const type = this.parse_pass_from_next_step();
                const guest_name = this.body_raw;
                if (guest_name.trim() !== "" &&
                    [comp_passes_1.CompPassType.CompPass, comp_passes_1.CompPassType.ManagerPass].includes(type)) {
                    return yield this.prompt_comp_manager_pass(type, guest_name);
                }
            }
            else if (((_e = this.bvnsp_checkin_next_step) === null || _e === void 0 ? void 0 : _e.startsWith(exports.NEXT_STEPS.AWAIT_SECTION)) &&
                this.body) {
                const section = this.section_values.parse_section(this.body);
                if (section) {
                    return yield this.assign_section(section);
                }
                return yield this.prompt_section_assignment();
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
            if (COMMANDS.SECTION_ASSIGNMENT.includes(this.body)) {
                console.log(`Performing section_assignment for ${patroller_name}`);
                return yield this.prompt_section_assignment();
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
            response: `${this.patroller.name}, I'm the BVNSP Bot.
Enter a command:
Check in / Check out / Status / On Duty / Section Assignment / Comp Pass / Manager Pass / Whatsapp
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
     * Prompts the user for section assignment.
     * @returns {Promise<BVNSPCheckinResponse>} A promise that resolves with the response.
     */
    prompt_section_assignment() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.patroller || !this.patroller.checkin) {
                return {
                    response: `${this.patroller.name} is not checked in.`,
                };
            }
            const section_description = this.section_values.get_section_description();
            return {
                response: `Enter your assigned section; one of ${section_description} (or 'restart')`,
                next_step: exports.NEXT_STEPS.AWAIT_SECTION,
            };
        });
    }
    /**
     * Assigns the section to the patroller.
     * @param {string} section - The section to assign.
     * @returns {Promise<BVNSPCheckinResponse>} A promise that resolves with the response.
     */
    assign_section(section) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Assigning section ${this.patroller.name} to ${section}`);
            const mapped_section = this.section_values.map_section(section);
            yield this.log_action(`assign_section(${mapped_section})`);
            const login_sheet = yield this.get_login_sheet();
            yield login_sheet.assign_section(this.patroller, mapped_section);
            yield ((_a = this.login_sheet) === null || _a === void 0 ? void 0 : _a.refresh());
            yield this.get_mapped_patroller(true);
            return {
                response: `Updated ${this.patroller.name} with section assignment: ${mapped_section}.`,
            };
        });
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
                    response: `Updated ${this.patroller.name} to use ${(0, comp_passes_1.get_comp_pass_description)(pass_type)} for guest "${guest_name}" today.`,
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
            const usedTodayCompPasses = ((_a = (yield comp_pass_promise)) === null || _a === void 0 ? void 0 : _a.used_today) || 0;
            const usedTodayManagerPasses = ((_b = (yield manager_pass_promise)) === null || _b === void 0 ? void 0 : _b.used_today) || 0;
            const usedSeasonCompPasses = ((_c = (yield comp_pass_promise)) === null || _c === void 0 ? void 0 : _c.used_season) || 0;
            const usedSeasonManagerPasses = ((_d = (yield manager_pass_promise)) === null || _d === void 0 ? void 0 : _d.used_season) || 0;
            const availableCompPasses = ((_e = (yield comp_pass_promise)) === null || _e === void 0 ? void 0 : _e.available) || 0;
            const availableManagerPasses = ((_f = (yield manager_pass_promise)) === null || _f === void 0 ? void 0 : _f.available) || 0;
            statusString +=
                " " +
                    (0, comp_passes_1.build_passes_string)(usedSeasonCompPasses, usedSeasonCompPasses + availableCompPasses, usedTodayCompPasses, "comp passes");
            if (usedSeasonManagerPasses + availableManagerPasses > 0) {
                statusString +=
                    " " +
                        (0, comp_passes_1.build_passes_string)(usedSeasonManagerPasses, usedSeasonManagerPasses + availableManagerPasses, usedTodayManagerPasses, "manager passes");
            }
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
            let pass_string = (0, comp_passes_1.get_comp_pass_description)(this.comp_pass_type);
            response = (0, comp_passes_1.build_passes_string)(this.used_season, this.available + this.used_season, this.used_today, `${pass_string}es`, true);
            response +=
                "\n\n" +
                    `Enter the first and last name of the guest that will use a ${pass_string} today (or 'restart'):`;
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
            new_vals.push(current_date_string + "," + guest_name);
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
    * Assigns a section to a patroller.
    * @param {PatrollerRow} patroller - The patroller to assign the section to.
    * @param {string} new_section_value - The new section value.
    * @returns {Promise<void>}
    * @throws {Error} If the login sheet is not current.
    */
    assign_section(patroller_section, new_section_value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.is_current) {
                throw new Error("Login sheet is not current");
            }
            console.log(`Existing status: ${JSON.stringify(patroller_section)}`);
            const row = patroller_section.index + 1; // programming -> excel lookup
            const range = `${this.config.SECTION_DROPDOWN_COLUMN}${row}`;
            yield this.login_sheet.update_values(range, [[new_section_value]]);
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
exports.build_passes_string = exports.get_comp_pass_description = exports.CompPassType = void 0;
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
function build_passes_string(used, total, today, type, force_today = false) {
    let message = `You have used ${used} of ${total} ${type} this season`;
    if (force_today || today > 0) {
        message += ` (${today} used today)`;
    }
    message += ".";
    return message;
}
exports.build_passes_string = build_passes_string;


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

/***/ "./src/utils/section_values.ts":
/*!*************************************!*\
  !*** ./src/utils/section_values.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SectionValues = void 0;
/**
    * Class for section values.
    */
class SectionValues {
    constructor(section_config) {
        this.section_config = section_config;
        this.sections = section_config.SECTION_VALUES.split(',');
        this.lowercase_sections = section_config.SECTION_VALUES.toLowerCase().split(',');
    }
    /**
     * Gets the section description.
     * @returns {string} The section description.
    */
    get_section_description() {
        return this.section_config.SECTION_VALUES;
    }
    /**
    * Parses a section.
    * @param {string} body - The body of the request.
    * @returns {string | null} The section if it is a valid section or null.
    */
    parse_section(body) {
        if (body === null) {
            return null;
        }
        return this.lowercase_sections.includes(body.toLowerCase()) ? body : null;
    }
    /**
    * Maps a lower case version of a section string to the original case value.
    * @param {string} section - The lower case section string.
    * @returns {string | null} The original case value if found, otherwise null.
    */
    map_section(section) {
        const index = this.lowercase_sections.indexOf(section.toLowerCase());
        if (index !== -1) {
            return this.sections[index];
        }
        return "";
    }
}
exports.SectionValues = SectionValues;


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QXFCOzs7Ozs7Ozs7OztBQzdGekI7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9lbnYvaGFuZGxlcl9jb25maWcudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9oYW5kbGVycy9idm5zcF9jaGVja2luX2hhbmRsZXIudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9oYW5kbGVycy9oYW5kbGVyLnByb3RlY3RlZC50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3NoZWV0cy9jb21wX3Bhc3Nfc2hlZXQudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9zaGVldHMvbG9naW5fc2hlZXQudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9zaGVldHMvc2Vhc29uX3NoZWV0LnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXNlci1jcmVkcy50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3V0aWxzL2NoZWNraW5fdmFsdWVzLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvY29tcF9wYXNzZXMudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91dGlscy9kYXRldGltZV91dGlsLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvZmlsZV91dGlscy50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3V0aWxzL2dvb2dsZV9zaGVldHNfc3ByZWFkc2hlZXRfdGFiLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvc2NvcGVfdXRpbC50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3V0aWxzL3NlY3Rpb25fdmFsdWVzLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvdXRpbC50cyIsImV4dGVybmFsIGNvbW1vbmpzIFwiQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlc1wiIiwiZXh0ZXJuYWwgY29tbW9uanMgXCJnb29nbGVhcGlzXCIiLCJleHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiZnNcIiIsIndlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2svc3RhcnR1cCIsIndlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGVja2luVmFsdWUgfSBmcm9tIFwiLi4vdXRpbHMvY2hlY2tpbl92YWx1ZXNcIjtcblxuLyoqXG4gKiBFbnZpcm9ubWVudCBjb25maWd1cmF0aW9uIGZvciB0aGUgaGFuZGxlci5cbiAqIDxwPlxuICogTm90ZTogVGhlc2UgYXJlIHRoZSBvbmx5IHNlY3JldCB2YWx1ZXMgd2UgbmVlZCB0byByZWFkLiBSZXN0IGNhbiBiZSBkZXBsb3llZC5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IEhhbmRsZXJFbnZpcm9ubWVudFxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNIRUVUX0lEIC0gVGhlIElEIG9mIHRoZSBHb29nbGUgU2hlZXRzIHNwcmVhZHNoZWV0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNDUklQVF9JRCAtIFRoZSBJRCBvZiB0aGUgR29vZ2xlIEFwcHMgU2NyaXB0IHByb2plY3QuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU1lOQ19TSUQgLSBUaGUgU0lEIG9mIHRoZSBUd2lsaW8gU3luYyBzZXJ2aWNlLlxuICovXG50eXBlIEhhbmRsZXJFbnZpcm9ubWVudCA9IHtcbiAgICBTSEVFVF9JRDogc3RyaW5nO1xuICAgIFNDUklQVF9JRDogc3RyaW5nO1xuICAgIFNZTkNfU0lEOiBzdHJpbmc7XG59O1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIHVzZXIgY3JlZGVudGlhbHMuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBVc2VyQ3JlZHNDb25maWdcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nIHwgdW5kZWZpbmVkIHwgbnVsbH0gTlNQX0VNQUlMX0RPTUFJTiAtIFRoZSBlbWFpbCBkb21haW4gZm9yIE5TUC5cbiAqL1xudHlwZSBVc2VyQ3JlZHNDb25maWcgPSB7XG4gICAgTlNQX0VNQUlMX0RPTUFJTjogc3RyaW5nIHwgdW5kZWZpbmVkIHwgbnVsbDtcbn07XG5jb25zdCB1c2VyX2NyZWRzX2NvbmZpZzogVXNlckNyZWRzQ29uZmlnID0ge1xuICAgIE5TUF9FTUFJTF9ET01BSU46IFwiZmFyd2VzdC5vcmdcIixcbn07XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgZmluZGluZyBhIHBhdHJvbGxlci5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IEZpbmRQYXRyb2xsZXJDb25maWdcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTSEVFVF9JRCAtIFRoZSBJRCBvZiB0aGUgR29vZ2xlIFNoZWV0cyBzcHJlYWRzaGVldC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBQSE9ORV9OVU1CRVJfTE9PS1VQX1NIRUVUIC0gVGhlIHJhbmdlIGZvciBwaG9uZSBudW1iZXIgbG9va3VwLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFBIT05FX05VTUJFUl9OVU1CRVJfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgcGhvbmUgbnVtYmVycy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBQSE9ORV9OVU1CRVJfTkFNRV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBuYW1lcy5cbiAqL1xudHlwZSBGaW5kUGF0cm9sbGVyQ29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBzdHJpbmc7XG4gICAgUEhPTkVfTlVNQkVSX0xPT0tVUF9TSEVFVDogc3RyaW5nO1xuICAgIFBIT05FX05VTUJFUl9OVU1CRVJfQ09MVU1OOiBzdHJpbmc7XG4gICAgUEhPTkVfTlVNQkVSX05BTUVfQ09MVU1OOiBzdHJpbmc7XG59O1xuXG5jb25zdCBmaW5kX3BhdHJvbGxlcl9jb25maWc6IEZpbmRQYXRyb2xsZXJDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IFwidGVzdFwiLFxuICAgIFBIT05FX05VTUJFUl9MT09LVVBfU0hFRVQ6IFwiUGhvbmUgTnVtYmVycyFBMjpCMTAwXCIsXG4gICAgUEhPTkVfTlVNQkVSX05BTUVfQ09MVU1OOiBcIkFcIixcbiAgICBQSE9ORV9OVU1CRVJfTlVNQkVSX0NPTFVNTjogXCJCXCIsXG59O1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIHRoZSBsb2dpbiBzaGVldC5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IExvZ2luU2hlZXRDb25maWdcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTSEVFVF9JRCAtIFRoZSBJRCBvZiB0aGUgR29vZ2xlIFNoZWV0cyBzcHJlYWRzaGVldC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBMT0dJTl9TSEVFVF9MT09LVVAgLSBUaGUgcmFuZ2UgZm9yIGxvZ2luIHNoZWV0IGxvb2t1cC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDSEVDS0lOX0NPVU5UX0xPT0tVUCAtIFRoZSByYW5nZSBmb3IgY2hlY2staW4gY291bnQgbG9va3VwLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IEFSQ0hJVkVEX0NFTEwgLSBUaGUgY2VsbCBmb3IgYXJjaGl2ZWQgZGF0YS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTSEVFVF9EQVRFX0NFTEwgLSBUaGUgY2VsbCBmb3IgdGhlIHNoZWV0IGRhdGUuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQ1VSUkVOVF9EQVRFX0NFTEwgLSBUaGUgY2VsbCBmb3IgdGhlIGN1cnJlbnQgZGF0ZS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBOQU1FX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIG5hbWVzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IENBVEVHT1JZX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIGNhdGVnb3JpZXMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0VDVElPTl9EUk9QRE9XTl9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBzZWN0aW9uIGRyb3Bkb3duLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IENIRUNLSU5fRFJPUERPV05fQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgY2hlY2staW4gZHJvcGRvd24uXG4gKi9cbnR5cGUgTG9naW5TaGVldENvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogc3RyaW5nO1xuICAgIExPR0lOX1NIRUVUX0xPT0tVUDogc3RyaW5nO1xuICAgIENIRUNLSU5fQ09VTlRfTE9PS1VQOiBzdHJpbmc7XG4gICAgQVJDSElWRURfQ0VMTDogc3RyaW5nO1xuICAgIFNIRUVUX0RBVEVfQ0VMTDogc3RyaW5nO1xuICAgIENVUlJFTlRfREFURV9DRUxMOiBzdHJpbmc7XG4gICAgTkFNRV9DT0xVTU46IHN0cmluZztcbiAgICBDQVRFR09SWV9DT0xVTU46IHN0cmluZztcbiAgICBTRUNUSU9OX0RST1BET1dOX0NPTFVNTjogc3RyaW5nO1xuICAgIENIRUNLSU5fRFJPUERPV05fQ09MVU1OOiBzdHJpbmc7XG59O1xuXG5jb25zdCBsb2dpbl9zaGVldF9jb25maWc6IExvZ2luU2hlZXRDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IFwidGVzdFwiLFxuICAgIExPR0lOX1NIRUVUX0xPT0tVUDogXCJMb2dpbiFBMTpaMTAwXCIsXG4gICAgQ0hFQ0tJTl9DT1VOVF9MT09LVVA6IFwiVG9vbHMhRzI6RzJcIixcbiAgICBTSEVFVF9EQVRFX0NFTEw6IFwiQjFcIixcbiAgICBDVVJSRU5UX0RBVEVfQ0VMTDogXCJCMlwiLFxuICAgIEFSQ0hJVkVEX0NFTEw6IFwiSDFcIixcbiAgICBOQU1FX0NPTFVNTjogXCJBXCIsXG4gICAgQ0FURUdPUllfQ09MVU1OOiBcIkJcIixcbiAgICBTRUNUSU9OX0RST1BET1dOX0NPTFVNTjogXCJIXCIsXG4gICAgQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU46IFwiSVwiLFxufTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciB0aGUgc2Vhc29uIHNoZWV0LlxuICogQHR5cGVkZWYge09iamVjdH0gU2Vhc29uU2hlZXRDb25maWdcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTSEVFVF9JRCAtIFRoZSBJRCBvZiB0aGUgR29vZ2xlIFNoZWV0cyBzcHJlYWRzaGVldC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTRUFTT05fU0hFRVQgLSBUaGUgbmFtZSBvZiB0aGUgc2Vhc29uIHNoZWV0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNFQVNPTl9TSEVFVF9EQVlTX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIHNlYXNvbiBzaGVldCBkYXlzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNFQVNPTl9TSEVFVF9OQU1FX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIHNlYXNvbiBzaGVldCBuYW1lcy5cbiAqL1xudHlwZSBTZWFzb25TaGVldENvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogc3RyaW5nO1xuICAgIFNFQVNPTl9TSEVFVDogc3RyaW5nO1xuICAgIFNFQVNPTl9TSEVFVF9EQVlTX0NPTFVNTjogc3RyaW5nO1xuICAgIFNFQVNPTl9TSEVFVF9OQU1FX0NPTFVNTjogc3RyaW5nO1xufTtcbmNvbnN0IHNlYXNvbl9zaGVldF9jb25maWc6IFNlYXNvblNoZWV0Q29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBcInRlc3RcIixcbiAgICBTRUFTT05fU0hFRVQ6IFwiU2Vhc29uXCIsXG4gICAgU0VBU09OX1NIRUVUX05BTUVfQ09MVU1OOiBcIkJcIixcbiAgICBTRUFTT05fU0hFRVRfREFZU19DT0xVTU46IFwiQVwiLFxufTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciBzZWN0aW9ucy5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IFNlY3Rpb25Db25maWdcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTRUNUSU9OX1ZBTFVFUyAtIFRoZSBzZWN0aW9uIHZhbHVlcy5cbiAqL1xudHlwZSBTZWN0aW9uQ29uZmlnID0ge1xuICAgIFNFQ1RJT05fVkFMVUVTOiBzdHJpbmc7XG59O1xuY29uc3Qgc2VjdGlvbl9jb25maWc6IFNlY3Rpb25Db25maWcgPSB7XG4gICAgU0VDVElPTl9WQUxVRVM6ICBcIjEsMiwzLDQsUm92aW5nLEZBUixUcmFpbmluZ1wiLFxufTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciBjb21wIHBhc3Nlcy5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IENvbXBQYXNzZXNDb25maWdcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTSEVFVF9JRCAtIFRoZSBJRCBvZiB0aGUgR29vZ2xlIFNoZWV0cyBzcHJlYWRzaGVldC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDT01QX1BBU1NfU0hFRVQgLSBUaGUgbmFtZSBvZiB0aGUgY29tcCBwYXNzIHNoZWV0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IENPTVBfUEFTU19TSEVFVF9EQVRFU19BVkFJTEFCTEVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgYXZhaWxhYmxlIGRhdGVzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IENPTVBfUEFTU19TSEVFVF9VU0VEX1RPREFZX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIGRhdGVzIHVzZWQgdG9kYXkuXG4gICogQHByb3BlcnR5IHtzdHJpbmd9IENPTVBfUEFTU19TSEVFVF9VU0VEX1NFQVNPTl9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBkYXRlcyB1c2VkIGZvciB0aGlzIHNlYXNvbi5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDT01QX1BBU1NfU0hFRVRfREFURVNfU1RBUlRJTkdfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3Igc3RhcnRpbmcgZGF0ZXMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQ09NUF9QQVNTX1NIRUVUX05BTUVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgbmFtZXMuXG4gKi9cbnR5cGUgQ29tcFBhc3Nlc0NvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogc3RyaW5nO1xuICAgIENPTVBfUEFTU19TSEVFVDogc3RyaW5nO1xuICAgIENPTVBfUEFTU19TSEVFVF9EQVRFU19BVkFJTEFCTEVfQ09MVU1OOiBzdHJpbmc7XG4gICAgQ09NUF9QQVNTX1NIRUVUX1VTRURfVE9EQVlfQ09MVU1OOiBzdHJpbmc7XG4gICAgQ09NUF9QQVNTX1NIRUVUX1VTRURfU0VBU09OX0NPTFVNTjogc3RyaW5nO1xuICAgIENPTVBfUEFTU19TSEVFVF9EQVRFU19TVEFSVElOR19DT0xVTU46IHN0cmluZztcbiAgICBDT01QX1BBU1NfU0hFRVRfTkFNRV9DT0xVTU46IHN0cmluZztcbn07XG5jb25zdCBjb21wX3Bhc3Nlc19jb25maWc6IENvbXBQYXNzZXNDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IFwidGVzdFwiLFxuICAgIENPTVBfUEFTU19TSEVFVDogXCJDb21wc1wiLFxuICAgIENPTVBfUEFTU19TSEVFVF9OQU1FX0NPTFVNTjogXCJBXCIsXG4gICAgQ09NUF9QQVNTX1NIRUVUX0RBVEVTX0FWQUlMQUJMRV9DT0xVTU46IFwiRFwiLFxuICAgIENPTVBfUEFTU19TSEVFVF9VU0VEX1RPREFZX0NPTFVNTjogXCJFXCIsXG4gICAgQ09NUF9QQVNTX1NIRUVUX1VTRURfU0VBU09OX0NPTFVNTjogXCJGXCIsXG4gICAgQ09NUF9QQVNTX1NIRUVUX0RBVEVTX1NUQVJUSU5HX0NPTFVNTjogXCJHXCIsXG59O1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIG1hbmFnZXIgcGFzc2VzLlxuICogQHR5cGVkZWYge09iamVjdH0gTWFuYWdlclBhc3Nlc0NvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFNIRUVUX0lEIC0gVGhlIElEIG9mIHRoZSBHb29nbGUgU2hlZXRzIHNwcmVhZHNoZWV0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IE1BTkFHRVJfUEFTU19TSEVFVCAtIFRoZSBuYW1lIG9mIHRoZSBtYW5hZ2VyIHBhc3Mgc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gTUFOQUdFUl9QQVNTX1NIRUVUX0FWQUlMQUJMRV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBhdmFpbGFibGUgcGFzc2VzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IE1BTkFHRVJfUEFTU19TSEVFVF9VU0VEX1RPREFZX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIHBhc3NlcyB1c2VkIHRvZGF5LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IE1BTkFHRVJfUEFTU19TSEVFVF9VU0VEX1NFQVNPTl9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBkYXRlcyB1c2VkIGZvciB0aGlzIHNlYXNvbi5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBNQU5BR0VSX1BBU1NfU0hFRVRfREFURVNfU1RBUlRJTkdfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3Igc3RhcnRpbmcgZGF0ZXMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gTUFOQUdFUl9QQVNTX1NIRUVUX05BTUVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgbmFtZXMuXG4gKi9cbnR5cGUgTWFuYWdlclBhc3Nlc0NvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogc3RyaW5nO1xuICAgIE1BTkFHRVJfUEFTU19TSEVFVDogc3RyaW5nO1xuICAgIE1BTkFHRVJfUEFTU19TSEVFVF9BVkFJTEFCTEVfQ09MVU1OOiBzdHJpbmc7XG4gICAgTUFOQUdFUl9QQVNTX1NIRUVUX1VTRURfVE9EQVlfQ09MVU1OOiBzdHJpbmc7XG4gICAgTUFOQUdFUl9QQVNTX1NIRUVUX1VTRURfU0VBU09OX0NPTFVNTjogc3RyaW5nO1xuICAgIE1BTkFHRVJfUEFTU19TSEVFVF9EQVRFU19TVEFSVElOR19DT0xVTU46IHN0cmluZztcbiAgICBNQU5BR0VSX1BBU1NfU0hFRVRfTkFNRV9DT0xVTU46IHN0cmluZztcbn07XG5jb25zdCBtYW5hZ2VyX3Bhc3Nlc19jb25maWc6IE1hbmFnZXJQYXNzZXNDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IFwidGVzdFwiLFxuICAgIE1BTkFHRVJfUEFTU19TSEVFVDogXCJNYW5hZ2Vyc1wiLFxuICAgIE1BTkFHRVJfUEFTU19TSEVFVF9OQU1FX0NPTFVNTjogXCJBXCIsXG4gICAgTUFOQUdFUl9QQVNTX1NIRUVUX0FWQUlMQUJMRV9DT0xVTU46IFwiRVwiLFxuICAgIE1BTkFHRVJfUEFTU19TSEVFVF9VU0VEX1RPREFZX0NPTFVNTjogXCJDXCIsXG4gICAgTUFOQUdFUl9QQVNTX1NIRUVUX1VTRURfU0VBU09OX0NPTFVNTjogXCJCXCIsXG4gICAgTUFOQUdFUl9QQVNTX1NIRUVUX0RBVEVTX1NUQVJUSU5HX0NPTFVNTjogXCJGXCIsXG59O1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIHRoZSBoYW5kbGVyLlxuICogQHR5cGVkZWYge09iamVjdH0gSGFuZGxlckNvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFNDUklQVF9JRCAtIFRoZSBJRCBvZiB0aGUgR29vZ2xlIEFwcHMgU2NyaXB0IHByb2plY3QuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU1lOQ19TSUQgLSBUaGUgU0lEIG9mIHRoZSBUd2lsaW8gU3luYyBzZXJ2aWNlLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFJFU0VUX0ZVTkNUSU9OX05BTUUgLSBUaGUgbmFtZSBvZiB0aGUgcmVzZXQgZnVuY3Rpb24uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQVJDSElWRV9GVU5DVElPTl9OQU1FIC0gVGhlIG5hbWUgb2YgdGhlIGFyY2hpdmUgZnVuY3Rpb24uXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFVTRV9TRVJWSUNFX0FDQ09VTlQgLSBXaGV0aGVyIHRvIHVzZSBhIHNlcnZpY2UgYWNjb3VudC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBBQ1RJT05fTE9HX1NIRUVUIC0gVGhlIG5hbWUgb2YgdGhlIGFjdGlvbiBsb2cgc2hlZXQuXG4gKiBAcHJvcGVydHkge0NoZWNraW5WYWx1ZVtdfSBDSEVDS0lOX1ZBTFVFUyAtIFRoZSBjaGVjay1pbiB2YWx1ZXMuXG4gKi9cbnR5cGUgSGFuZGxlckNvbmZpZyA9IHtcbiAgICBTQ1JJUFRfSUQ6IHN0cmluZztcbiAgICBTSEVFVF9JRDogc3RyaW5nO1xuICAgIFNZTkNfU0lEOiBzdHJpbmc7XG4gICAgUkVTRVRfRlVOQ1RJT05fTkFNRTogc3RyaW5nO1xuICAgIEFSQ0hJVkVfRlVOQ1RJT05fTkFNRTogc3RyaW5nO1xuICAgIFVTRV9TRVJWSUNFX0FDQ09VTlQ6IGJvb2xlYW47XG4gICAgQUNUSU9OX0xPR19TSEVFVDogc3RyaW5nO1xuICAgIENIRUNLSU5fVkFMVUVTOiBDaGVja2luVmFsdWVbXTtcbn07XG5jb25zdCBoYW5kbGVyX2NvbmZpZzogSGFuZGxlckNvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogXCJ0ZXN0XCIsXG4gICAgU0NSSVBUX0lEOiBcInRlc3RcIixcbiAgICBTWU5DX1NJRDogXCJ0ZXN0XCIsXG4gICAgQVJDSElWRV9GVU5DVElPTl9OQU1FOiBcIkFyY2hpdmVcIixcbiAgICBSRVNFVF9GVU5DVElPTl9OQU1FOiBcIlJlc2V0XCIsXG4gICAgVVNFX1NFUlZJQ0VfQUNDT1VOVDogdHJ1ZSxcbiAgICBBQ1RJT05fTE9HX1NIRUVUOiBcIkJvdF9Vc2FnZVwiLFxuICAgIENIRUNLSU5fVkFMVUVTOiBbXG4gICAgICAgIG5ldyBDaGVja2luVmFsdWUoXCJkYXlcIiwgXCJBbGwgRGF5XCIsIFwiYWxsIGRheS9EQVlcIiwgW1wiY2hlY2tpbi1kYXlcIl0pLFxuICAgICAgICBuZXcgQ2hlY2tpblZhbHVlKFwiYW1cIiwgXCJIYWxmIEFNXCIsIFwibW9ybmluZy9BTVwiLCBbXCJjaGVja2luLWFtXCJdKSxcbiAgICAgICAgbmV3IENoZWNraW5WYWx1ZShcInBtXCIsIFwiSGFsZiBQTVwiLCBcImFmdGVybm9vbi9QTVwiLCBbXCJjaGVja2luLXBtXCJdKSxcbiAgICAgICAgbmV3IENoZWNraW5WYWx1ZShcIm91dFwiLCBcIkNoZWNrZWQgT3V0XCIsIFwiY2hlY2sgb3V0L09VVFwiLCBbXCJjaGVja291dFwiLCBcImNoZWNrLW91dFwiXSksXG4gICAgXSxcbn07XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgcGF0cm9sbGVyIHJvd3MuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBQYXRyb2xsZXJSb3dDb25maWdcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBOQU1FX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIG5hbWVzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IENBVEVHT1JZX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIGNhdGVnb3JpZXMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0VDVElPTl9EUk9QRE9XTl9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBzZWN0aW9uIGRyb3Bkb3duLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IENIRUNLSU5fRFJPUERPV05fQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgY2hlY2staW4gZHJvcGRvd24uXG4gKi9cbnR5cGUgUGF0cm9sbGVyUm93Q29uZmlnID0ge1xuICAgIE5BTUVfQ09MVU1OOiBzdHJpbmc7XG4gICAgQ0FURUdPUllfQ09MVU1OOiBzdHJpbmc7XG4gICAgU0VDVElPTl9EUk9QRE9XTl9DT0xVTU46IHN0cmluZztcbiAgICBDSEVDS0lOX0RST1BET1dOX0NPTFVNTjogc3RyaW5nO1xufTtcblxuLyoqXG4gKiBDb21iaW5lZCBjb25maWd1cmF0aW9uIHR5cGUuXG4gKiBAdHlwZWRlZiB7SGFuZGxlckVudmlyb25tZW50ICYgVXNlckNyZWRzQ29uZmlnICYgRmluZFBhdHJvbGxlckNvbmZpZyAmIExvZ2luU2hlZXRDb25maWcgJiBTZWFzb25TaGVldENvbmZpZyAmIFNlY3Rpb25Db25maWcgJiBDb21wUGFzc2VzQ29uZmlnICYgTWFuYWdlclBhc3Nlc0NvbmZpZyAmIEhhbmRsZXJDb25maWcgJiBQYXRyb2xsZXJSb3dDb25maWd9IENvbWJpbmVkQ29uZmlnXG4gKi9cbnR5cGUgQ29tYmluZWRDb25maWcgPSBIYW5kbGVyRW52aXJvbm1lbnQgJlxuICAgIFVzZXJDcmVkc0NvbmZpZyAmXG4gICAgRmluZFBhdHJvbGxlckNvbmZpZyAmXG4gICAgTG9naW5TaGVldENvbmZpZyAmXG4gICAgU2Vhc29uU2hlZXRDb25maWcgJlxuICAgIFNlY3Rpb25Db25maWcgJlxuICAgIENvbXBQYXNzZXNDb25maWcgJlxuICAgIE1hbmFnZXJQYXNzZXNDb25maWcgJlxuICAgIEhhbmRsZXJDb25maWcgJlxuICAgIFBhdHJvbGxlclJvd0NvbmZpZztcblxuY29uc3QgQ09ORklHOiBDb21iaW5lZENvbmZpZyA9IHtcbiAgICAuLi5oYW5kbGVyX2NvbmZpZyxcbiAgICAuLi5maW5kX3BhdHJvbGxlcl9jb25maWcsXG4gICAgLi4ubG9naW5fc2hlZXRfY29uZmlnLFxuICAgIC4uLmNvbXBfcGFzc2VzX2NvbmZpZyxcbiAgICAuLi5tYW5hZ2VyX3Bhc3Nlc19jb25maWcsXG4gICAgLi4uc2Vhc29uX3NoZWV0X2NvbmZpZyxcbiAgICAuLi51c2VyX2NyZWRzX2NvbmZpZyxcbiAgICAuLi5zZWN0aW9uX2NvbmZpZyxcbn07XG5cbmV4cG9ydCB7XG4gICAgQ09ORklHLFxuICAgIENvbWJpbmVkQ29uZmlnLFxuICAgIFNlY3Rpb25Db25maWcsXG4gICAgQ29tcFBhc3Nlc0NvbmZpZyxcbiAgICBGaW5kUGF0cm9sbGVyQ29uZmlnLFxuICAgIEhhbmRsZXJDb25maWcsXG4gICAgSGFuZGxlckVudmlyb25tZW50LFxuICAgIE1hbmFnZXJQYXNzZXNDb25maWcsXG4gICAgVXNlckNyZWRzQ29uZmlnLFxuICAgIExvZ2luU2hlZXRDb25maWcsXG4gICAgU2Vhc29uU2hlZXRDb25maWcsXG4gICAgUGF0cm9sbGVyUm93Q29uZmlnLFxufTsiLCJpbXBvcnQgXCJAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzXCI7XG5pbXBvcnQge1xuICAgIENvbnRleHQsXG4gICAgU2VydmVybGVzc0V2ZW50T2JqZWN0LFxuICAgIFNlcnZpY2VDb250ZXh0LFxuICAgIFR3aWxpb0NsaWVudCxcbn0gZnJvbSBcIkB0d2lsaW8tbGFicy9zZXJ2ZXJsZXNzLXJ1bnRpbWUtdHlwZXMvdHlwZXNcIjtcbmltcG9ydCB7IGdvb2dsZSwgc2NyaXB0X3YxLCBzaGVldHNfdjQgfSBmcm9tIFwiZ29vZ2xlYXBpc1wiO1xuaW1wb3J0IHsgR29vZ2xlQXV0aCB9IGZyb20gXCJnb29nbGVhcGlzLWNvbW1vblwiO1xuaW1wb3J0IHtcbiAgICBDT05GSUcsXG4gICAgQ29tYmluZWRDb25maWcsXG4gICAgQ29tcFBhc3Nlc0NvbmZpZyxcbiAgICBGaW5kUGF0cm9sbGVyQ29uZmlnLFxuICAgIEhhbmRsZXJDb25maWcsXG4gICAgSGFuZGxlckVudmlyb25tZW50LFxuICAgIExvZ2luU2hlZXRDb25maWcsXG4gICAgTWFuYWdlclBhc3Nlc0NvbmZpZyxcbiAgICBTZWFzb25TaGVldENvbmZpZyxcbn0gZnJvbSBcIi4uL2Vudi9oYW5kbGVyX2NvbmZpZ1wiO1xuaW1wb3J0IExvZ2luU2hlZXQsIHsgUGF0cm9sbGVyUm93IH0gZnJvbSBcIi4uL3NoZWV0cy9sb2dpbl9zaGVldFwiO1xuaW1wb3J0IFNlYXNvblNoZWV0IGZyb20gXCIuLi9zaGVldHMvc2Vhc29uX3NoZWV0XCI7XG5pbXBvcnQgeyBVc2VyQ3JlZHMgfSBmcm9tIFwiLi4vdXNlci1jcmVkc1wiO1xuaW1wb3J0IHsgQ2hlY2tpblZhbHVlcyB9IGZyb20gXCIuLi91dGlscy9jaGVja2luX3ZhbHVlc1wiO1xuaW1wb3J0IHsgZ2V0X3NlcnZpY2VfY3JlZGVudGlhbHNfcGF0aCB9IGZyb20gXCIuLi91dGlscy9maWxlX3V0aWxzXCI7XG5pbXBvcnQgeyBleGNlbF9yb3dfdG9faW5kZXgsIHNhbml0aXplX3Bob25lX251bWJlciB9IGZyb20gXCIuLi91dGlscy91dGlsXCI7XG5pbXBvcnQge1xuICAgIGJ1aWxkX3Bhc3Nlc19zdHJpbmcsXG4gICAgQ29tcFBhc3NUeXBlLFxuICAgIGdldF9jb21wX3Bhc3NfZGVzY3JpcHRpb24sXG59IGZyb20gXCIuLi91dGlscy9jb21wX3Bhc3Nlc1wiO1xuaW1wb3J0IHtcbiAgICBDb21wUGFzc1NoZWV0LFxuICAgIE1hbmFnZXJQYXNzU2hlZXQsXG4gICAgUGFzc1NoZWV0LFxufSBmcm9tIFwiLi4vc2hlZXRzL2NvbXBfcGFzc19zaGVldFwiO1xuaW1wb3J0IHsgU2VjdGlvblZhbHVlcyB9IGZyb20gJy4uL3V0aWxzL3NlY3Rpb25fdmFsdWVzJztcblxuZXhwb3J0IHR5cGUgQlZOU1BDaGVja2luUmVzcG9uc2UgPSB7XG4gICAgcmVzcG9uc2U/OiBzdHJpbmc7XG4gICAgbmV4dF9zdGVwPzogc3RyaW5nO1xufTtcbmV4cG9ydCB0eXBlIEhhbmRsZXJFdmVudCA9IFNlcnZlcmxlc3NFdmVudE9iamVjdDxcbiAgICB7XG4gICAgICAgIEZyb206IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAgICAgVG86IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAgICAgbnVtYmVyOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgICAgIHRlc3RfbnVtYmVyOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgICAgIEJvZHk6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICB9LFxuICAgIHt9LFxuICAgIHtcbiAgICAgICAgYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXA6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICB9XG4+O1xuXG5leHBvcnQgY29uc3QgTkVYVF9TVEVQUyA9IHtcbiAgICBBV0FJVF9DT01NQU5EOiBcImF3YWl0LWNvbW1hbmRcIixcbiAgICBBV0FJVF9DSEVDS0lOOiBcImF3YWl0LWNoZWNraW5cIixcbiAgICBDT05GSVJNX1JFU0VUOiBcImNvbmZpcm0tcmVzZXRcIixcbiAgICBBVVRIX1JFU0VUOiBcImF1dGgtcmVzZXRcIixcbiAgICBBV0FJVF9TRUNUSU9OOiBcImF3YWl0LXNlY3Rpb25cIixcbiAgICBBV0FJVF9QQVNTOiBcImF3YWl0LXBhc3NcIixcbn07XG5cbmNvbnN0IENPTU1BTkRTID0ge1xuICAgIE9OX0RVVFk6IFtcIm9uZHV0eVwiLCBcIm9uLWR1dHlcIl0sXG4gICAgU1RBVFVTOiBbXCJzdGF0dXNcIl0sXG4gICAgQ0hFQ0tJTjogW1wiY2hlY2tpblwiLCBcImNoZWNrLWluXCJdLFxuICAgIFNFQ1RJT05fQVNTSUdOTUVOVDogW1wic2VjdGlvblwiLCBcInNlY3Rpb24tYXNzaWdubWVudFwiLCBcInNlY3Rpb25zaWdubWVudFwiLCBcImFzc2lnbm1lbnRcIl0sXG4gICAgQ09NUF9QQVNTOiBbXCJjb21wLXBhc3NcIiwgXCJjb21wcGFzc1wiLCBcImNvbXBcIl0sXG4gICAgTUFOQUdFUl9QQVNTOiBbXCJtYW5hZ2VyLXBhc3NcIiwgXCJtYW5hZ2VycGFzc1wiLCBcIm1hbmFnZXJcIl0sXG4gICAgV0hBVFNBUFA6IFtcIndoYXRzYXBwXCJdLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQlZOU1BDaGVja2luSGFuZGxlciB7XG4gICAgU0NPUEVTOiBzdHJpbmdbXSA9IFtcImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvc3ByZWFkc2hlZXRzXCJdO1xuXG4gICAgc21zX3JlcXVlc3Q6IGJvb2xlYW47XG4gICAgcmVzdWx0X21lc3NhZ2VzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGZyb206IHN0cmluZztcbiAgICB0bzogc3RyaW5nO1xuICAgIGJvZHk6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBib2R5X3Jhdzogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIHBhdHJvbGxlcjogUGF0cm9sbGVyUm93IHwgbnVsbDtcbiAgICBidm5zcF9jaGVja2luX25leHRfc3RlcDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIGNoZWNraW5fbW9kZTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gICAgZmFzdF9jaGVja2luOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICB0d2lsaW9fY2xpZW50OiBUd2lsaW9DbGllbnQgfCBudWxsID0gbnVsbDtcbiAgICBzeW5jX3NpZDogc3RyaW5nO1xuICAgIHJlc2V0X3NjcmlwdF9pZDogc3RyaW5nO1xuXG4gICAgLy8gQ2FjaGUgY2xpZW50c1xuICAgIHN5bmNfY2xpZW50OiBTZXJ2aWNlQ29udGV4dCB8IG51bGwgPSBudWxsO1xuICAgIHVzZXJfY3JlZHM6IFVzZXJDcmVkcyB8IG51bGwgPSBudWxsO1xuICAgIHNlcnZpY2VfY3JlZHM6IEdvb2dsZUF1dGggfCBudWxsID0gbnVsbDtcbiAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyB8IG51bGwgPSBudWxsO1xuICAgIHVzZXJfc2NyaXB0c19zZXJ2aWNlOiBzY3JpcHRfdjEuU2NyaXB0IHwgbnVsbCA9IG51bGw7XG5cbiAgICBsb2dpbl9zaGVldDogTG9naW5TaGVldCB8IG51bGwgPSBudWxsO1xuICAgIHNlYXNvbl9zaGVldDogU2Vhc29uU2hlZXQgfCBudWxsID0gbnVsbDtcbiAgICBjb21wX3Bhc3Nfc2hlZXQ6IENvbXBQYXNzU2hlZXQgfCBudWxsID0gbnVsbDtcbiAgICBtYW5hZ2VyX3Bhc3Nfc2hlZXQ6IE1hbmFnZXJQYXNzU2hlZXQgfCBudWxsID0gbnVsbDtcblxuICAgIGNoZWNraW5fdmFsdWVzOiBDaGVja2luVmFsdWVzO1xuICAgIGN1cnJlbnRfc2hlZXRfZGF0ZTogRGF0ZTtcblxuICAgIGNvbWJpbmVkX2NvbmZpZzogQ29tYmluZWRDb25maWc7XG4gICAgY29uZmlnOiBIYW5kbGVyQ29uZmlnO1xuXG4gICAgc2VjdGlvbl92YWx1ZXM6IFNlY3Rpb25WYWx1ZXM7XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGEgbmV3IEJWTlNQQ2hlY2tpbkhhbmRsZXIuXG4gICAgICogQHBhcmFtIHtDb250ZXh0PEhhbmRsZXJFbnZpcm9ubWVudD59IGNvbnRleHQgLSBUaGUgc2VydmVybGVzcyBmdW5jdGlvbiBjb250ZXh0LlxuICAgICAqIEBwYXJhbSB7U2VydmVybGVzc0V2ZW50T2JqZWN0PEhhbmRsZXJFdmVudD59IGV2ZW50IC0gVGhlIGV2ZW50IG9iamVjdC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgY29udGV4dDogQ29udGV4dDxIYW5kbGVyRW52aXJvbm1lbnQ+LFxuICAgICAgICBldmVudDogU2VydmVybGVzc0V2ZW50T2JqZWN0PEhhbmRsZXJFdmVudD5cbiAgICApIHtcbiAgICAgICAgLy8gRGV0ZXJtaW5lIG1lc3NhZ2UgZGV0YWlscyBmcm9tIHRoZSBpbmNvbWluZyBldmVudCwgd2l0aCBmYWxsYmFjayB2YWx1ZXNcbiAgICAgICAgdGhpcy5zbXNfcmVxdWVzdCA9IChldmVudC5Gcm9tIHx8IGV2ZW50Lm51bWJlcikgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5mcm9tID0gZXZlbnQuRnJvbSB8fCBldmVudC5udW1iZXIgfHwgZXZlbnQudGVzdF9udW1iZXIhO1xuICAgICAgICB0aGlzLnRvID0gc2FuaXRpemVfcGhvbmVfbnVtYmVyKGV2ZW50LlRvISk7XG4gICAgICAgIHRoaXMuYm9keSA9IGV2ZW50LkJvZHk/LnRvTG93ZXJDYXNlKCk/LnRyaW0oKS5yZXBsYWNlKC9cXHMrLywgXCItXCIpO1xuICAgICAgICB0aGlzLmJvZHlfcmF3ID0gZXZlbnQuQm9keVxuICAgICAgICB0aGlzLmJ2bnNwX2NoZWNraW5fbmV4dF9zdGVwID1cbiAgICAgICAgICAgIGV2ZW50LnJlcXVlc3QuY29va2llcy5idm5zcF9jaGVja2luX25leHRfc3RlcDtcbiAgICAgICAgdGhpcy5jb21iaW5lZF9jb25maWcgPSB7IC4uLkNPTkZJRywgLi4uY29udGV4dCB9O1xuICAgICAgICB0aGlzLmNvbmZpZyA9IHRoaXMuY29tYmluZWRfY29uZmlnO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLnR3aWxpb19jbGllbnQgPSBjb250ZXh0LmdldFR3aWxpb0NsaWVudCgpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGluaXRpYWxpemluZyB0d2lsaW9fY2xpZW50XCIsIGUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3luY19zaWQgPSBjb250ZXh0LlNZTkNfU0lEO1xuICAgICAgICB0aGlzLnJlc2V0X3NjcmlwdF9pZCA9IGNvbnRleHQuU0NSSVBUX0lEO1xuICAgICAgICB0aGlzLnBhdHJvbGxlciA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5jaGVja2luX3ZhbHVlcyA9IG5ldyBDaGVja2luVmFsdWVzKENPTkZJRy5DSEVDS0lOX1ZBTFVFUyk7XG4gICAgICAgIHRoaXMuY3VycmVudF9zaGVldF9kYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgdGhpcy5zZWN0aW9uX3ZhbHVlcyA9IG5ldyBTZWN0aW9uVmFsdWVzKHRoaXMuY29tYmluZWRfY29uZmlnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZXMgdGhlIGZhc3QgY2hlY2staW4gbW9kZSBmcm9tIHRoZSBtZXNzYWdlIGJvZHkuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHkgLSBUaGUgbWVzc2FnZSBib2R5LlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIGZhc3QgY2hlY2staW4gbW9kZSBpcyBwYXJzZWQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKi9cbiAgICBwYXJzZV9mYXN0X2NoZWNraW5fbW9kZShib2R5OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgcGFyc2VkID0gdGhpcy5jaGVja2luX3ZhbHVlcy5wYXJzZV9mYXN0X2NoZWNraW4oYm9keSk7XG4gICAgICAgIGlmIChwYXJzZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5jaGVja2luX21vZGUgPSBwYXJzZWQua2V5O1xuICAgICAgICAgICAgdGhpcy5mYXN0X2NoZWNraW4gPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlcyB0aGUgY2hlY2staW4gbW9kZSBmcm9tIHRoZSBtZXNzYWdlIGJvZHkuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHkgLSBUaGUgbWVzc2FnZSBib2R5LlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIGNoZWNrLWluIG1vZGUgaXMgcGFyc2VkLCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICovXG4gICAgcGFyc2VfY2hlY2tpbihib2R5OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgcGFyc2VkID0gdGhpcy5jaGVja2luX3ZhbHVlcy5wYXJzZV9jaGVja2luKGJvZHkpO1xuICAgICAgICBpZiAocGFyc2VkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tpbl9tb2RlID0gcGFyc2VkLmtleTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZXMgdGhlIGNoZWNrLWluIG1vZGUgZnJvbSB0aGUgbmV4dCBzdGVwLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIGNoZWNrLWluIG1vZGUgaXMgcGFyc2VkLCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICovXG4gICAgcGFyc2VfY2hlY2tpbl9mcm9tX25leHRfc3RlcCgpIHtcbiAgICAgICAgY29uc3QgbGFzdF9zZWdtZW50ID0gdGhpcy5idm5zcF9jaGVja2luX25leHRfc3RlcFxuICAgICAgICAgICAgPy5zcGxpdChcIi1cIilcbiAgICAgICAgICAgIC5zbGljZSgtMSlbMF07XG4gICAgICAgIGlmIChsYXN0X3NlZ21lbnQgJiYgbGFzdF9zZWdtZW50IGluIHRoaXMuY2hlY2tpbl92YWx1ZXMuYnlfa2V5KSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNraW5fbW9kZSA9IGxhc3Rfc2VnbWVudDtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZXMgdGhlIHBhc3MgdHlwZSBmcm9tIHRoZSBuZXh0IHN0ZXAuXG4gICAgICogQHJldHVybnMge0NvbXBQYXNzVHlwZX0gVGhlIHBhcnNlZCBwYXNzIHR5cGUuXG4gICAgICovXG4gICAgcGFyc2VfcGFzc19mcm9tX25leHRfc3RlcCgpIHtcbiAgICAgICAgY29uc3QgbGFzdF9zZWdtZW50ID0gdGhpcy5idm5zcF9jaGVja2luX25leHRfc3RlcFxuICAgICAgICAgICAgPy5zcGxpdChcIi1cIilcbiAgICAgICAgICAgIC5zbGljZSgtMilcbiAgICAgICAgICAgIC5qb2luKFwiLVwiKTtcbiAgICAgICAgcmV0dXJuIGxhc3Rfc2VnbWVudCBhcyBDb21wUGFzc1R5cGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVsYXlzIHRoZSBleGVjdXRpb24gZm9yIGEgc3BlY2lmaWVkIG51bWJlciBvZiBzZWNvbmRzLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZWNvbmRzIC0gVGhlIG51bWJlciBvZiBzZWNvbmRzIHRvIGRlbGF5LlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbmFsPWZhbHNlXSAtIFdoZXRoZXIgdGhlIGRlbGF5IGlzIG9wdGlvbmFsLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyBhZnRlciB0aGUgZGVsYXkuXG4gICAgICovXG4gICAgZGVsYXkoc2Vjb25kczogbnVtYmVyLCBvcHRpb25hbDogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGlmIChvcHRpb25hbCAmJiAhdGhpcy5zbXNfcmVxdWVzdCkge1xuICAgICAgICAgICAgc2Vjb25kcyA9IDEgLyAxMDAwLjA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMpID0+IHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQocmVzLCBzZWNvbmRzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VuZHMgYSBtZXNzYWdlIHRvIHRoZSB1c2VyLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gVGhlIG1lc3NhZ2UgdG8gc2VuZC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgbWVzc2FnZSBpcyBzZW50LlxuICAgICAqL1xuICAgIGFzeW5jIHNlbmRfbWVzc2FnZShtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMuc21zX3JlcXVlc3QpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0X3R3aWxpb19jbGllbnQoKS5tZXNzYWdlcy5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIHRvOiB0aGlzLmZyb20sXG4gICAgICAgICAgICAgICAgZnJvbTogdGhpcy50byxcbiAgICAgICAgICAgICAgICBib2R5OiBtZXNzYWdlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlc3VsdF9tZXNzYWdlcy5wdXNoKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlcyB0aGUgY2hlY2staW4gcHJvY2Vzcy5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUENoZWNraW5SZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGNoZWNrLWluIHJlc3BvbnNlLlxuICAgICAqL1xuICAgIGFzeW5jIGhhbmRsZSgpOiBQcm9taXNlPEJWTlNQQ2hlY2tpblJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2hhbmRsZSgpO1xuICAgICAgICBpZiAoIXRoaXMuc21zX3JlcXVlc3QpIHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQ/LnJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHRfbWVzc2FnZXMucHVzaChyZXN1bHQucmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogdGhpcy5yZXN1bHRfbWVzc2FnZXMuam9pbihcIlxcbiMjI1xcblwiKSxcbiAgICAgICAgICAgICAgICBuZXh0X3N0ZXA6IHJlc3VsdD8ubmV4dF9zdGVwLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEludGVybmFsIG1ldGhvZCB0byBoYW5kbGUgdGhlIGNoZWNrLWluIHByb2Nlc3MuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBjaGVjay1pbiByZXNwb25zZS5cbiAgICAgKi9cbiAgICBhc3luYyBfaGFuZGxlKCk6IFByb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICBgUmVjZWl2ZWQgcmVxdWVzdCBmcm9tICR7dGhpcy5mcm9tfSB3aXRoIGJvZHk6ICR7dGhpcy5ib2R5fSBhbmQgc3RhdGUgJHt0aGlzLmJ2bnNwX2NoZWNraW5fbmV4dF9zdGVwfWBcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHRoaXMuYm9keSA9PSBcImxvZ291dFwiKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBsb2dvdXRgKTtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmxvZ291dCgpO1xuICAgICAgICB9XG4gICAgICAgIGxldCByZXNwb25zZTogQlZOU1BDaGVja2luUmVzcG9uc2UgfCB1bmRlZmluZWQ7XG4gICAgICAgIGlmICghdGhpcy5jb25maWcuVVNFX1NFUlZJQ0VfQUNDT1VOVCkge1xuICAgICAgICAgICAgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmNoZWNrX3VzZXJfY3JlZHMoKTtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZSkgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmJvZHk/LnRvTG93ZXJDYXNlKCkgPT09IFwicmVzdGFydFwiKSB7XG4gICAgICAgICAgICByZXR1cm4geyByZXNwb25zZTogXCJPa2F5LiBUZXh0IG1lIGFnYWluIHRvIHN0YXJ0IG92ZXIuLi5cIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmdldF9tYXBwZWRfcGF0cm9sbGVyKCk7XG4gICAgICAgIGlmIChyZXNwb25zZSB8fCB0aGlzLnBhdHJvbGxlciA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIHJlc3BvbnNlIHx8IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2U6IFwiVW5leHBlY3RlZCBlcnJvciBsb29raW5nIHVwIHBhdHJvbGxlciBtYXBwaW5nXCIsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgICghdGhpcy5idm5zcF9jaGVja2luX25leHRfc3RlcCB8fFxuICAgICAgICAgICAgICAgIHRoaXMuYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXAgPT0gTkVYVF9TVEVQUy5BV0FJVF9DT01NQU5EKSAmJlxuICAgICAgICAgICAgdGhpcy5ib2R5XG4gICAgICAgICkge1xuICAgICAgICAgICAgY29uc3QgYXdhaXRfcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmhhbmRsZV9hd2FpdF9jb21tYW5kKCk7XG4gICAgICAgICAgICBpZiAoYXdhaXRfcmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXRfcmVzcG9uc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICB0aGlzLmJ2bnNwX2NoZWNraW5fbmV4dF9zdGVwID09IE5FWFRfU1RFUFMuQVdBSVRfQ0hFQ0tJTiAmJlxuICAgICAgICAgICAgdGhpcy5ib2R5XG4gICAgICAgICkge1xuICAgICAgICAgICAgaWYgKHRoaXMucGFyc2VfY2hlY2tpbih0aGlzLmJvZHkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuY2hlY2tpbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgdGhpcy5idm5zcF9jaGVja2luX25leHRfc3RlcD8uc3RhcnRzV2l0aChcbiAgICAgICAgICAgICAgICBORVhUX1NURVBTLkNPTkZJUk1fUkVTRVRcbiAgICAgICAgICAgICkgJiZcbiAgICAgICAgICAgIHRoaXMuYm9keVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmJvZHkgPT0gXCJ5ZXNcIiAmJiB0aGlzLnBhcnNlX2NoZWNraW5fZnJvbV9uZXh0X3N0ZXAoKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgICAgICBgUGVyZm9ybWluZyByZXNldF9zaGVldF9mbG93IGZvciAke3RoaXMucGF0cm9sbGVyLm5hbWV9IHdpdGggY2hlY2tpbiBtb2RlOiAke3RoaXMuY2hlY2tpbl9tb2RlfWBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIChhd2FpdCB0aGlzLnJlc2V0X3NoZWV0X2Zsb3coKSkgfHwgKGF3YWl0IHRoaXMuY2hlY2tpbigpKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICB0aGlzLmJ2bnNwX2NoZWNraW5fbmV4dF9zdGVwPy5zdGFydHNXaXRoKE5FWFRfU1RFUFMuQVVUSF9SRVNFVClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wYXJzZV9jaGVja2luX2Zyb21fbmV4dF9zdGVwKCkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICAgICAgYFBlcmZvcm1pbmcgcmVzZXRfc2hlZXRfZmxvdy1wb3N0LWF1dGggZm9yICR7dGhpcy5wYXRyb2xsZXIubmFtZX0gd2l0aCBjaGVja2luIG1vZGU6ICR7dGhpcy5jaGVja2luX21vZGV9YFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgKGF3YWl0IHRoaXMucmVzZXRfc2hlZXRfZmxvdygpKSB8fCAoYXdhaXQgdGhpcy5jaGVja2luKCkpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHRoaXMuYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXA/LnN0YXJ0c1dpdGgoTkVYVF9TVEVQUy5BV0FJVF9QQVNTKSAmJlxuICAgICAgICAgICAgdGhpcy5ib2R5X3Jhd1xuICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnN0IHR5cGUgPSB0aGlzLnBhcnNlX3Bhc3NfZnJvbV9uZXh0X3N0ZXAoKTtcbiAgICAgICAgICAgIGNvbnN0IGd1ZXN0X25hbWUgPSB0aGlzLmJvZHlfcmF3O1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGd1ZXN0X25hbWUudHJpbSgpICE9PSBcIlwiICYmXG4gICAgICAgICAgICAgICAgW0NvbXBQYXNzVHlwZS5Db21wUGFzcywgQ29tcFBhc3NUeXBlLk1hbmFnZXJQYXNzXS5pbmNsdWRlcyh0eXBlKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucHJvbXB0X2NvbXBfbWFuYWdlcl9wYXNzKHR5cGUsIGd1ZXN0X25hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgdGhpcy5idm5zcF9jaGVja2luX25leHRfc3RlcD8uc3RhcnRzV2l0aChORVhUX1NURVBTLkFXQUlUX1NFQ1RJT04pICYmXG4gICAgICAgICAgICB0aGlzLmJvZHlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zdCBzZWN0aW9uID0gdGhpcy5zZWN0aW9uX3ZhbHVlcy5wYXJzZV9zZWN0aW9uKHRoaXMuYm9keSlcbiAgICAgICAgICAgIGlmIChzZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuYXNzaWduX3NlY3Rpb24oc2VjdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5wcm9tcHRfc2VjdGlvbl9hc3NpZ25tZW50KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5idm5zcF9jaGVja2luX25leHRfc3RlcCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5zZW5kX21lc3NhZ2UoXCJTb3JyeSwgSSBkaWRuJ3QgdW5kZXJzdGFuZCB0aGF0LlwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wcm9tcHRfY29tbWFuZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgdGhlIGF3YWl0IGNvbW1hbmQgc3RlcC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUENoZWNraW5SZXNwb25zZSB8IHVuZGVmaW5lZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHJlc3BvbnNlIG9yIHVuZGVmaW5lZC5cbiAgICAgKi9cbiAgICBhc3luYyBoYW5kbGVfYXdhaXRfY29tbWFuZCgpOiBQcm9taXNlPEJWTlNQQ2hlY2tpblJlc3BvbnNlIHwgdW5kZWZpbmVkPiB7XG4gICAgICAgIGNvbnN0IHBhdHJvbGxlcl9uYW1lID0gdGhpcy5wYXRyb2xsZXIhLm5hbWU7XG4gICAgICAgIGlmICh0aGlzLnBhcnNlX2Zhc3RfY2hlY2tpbl9tb2RlKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICBgUGVyZm9ybWluZyBmYXN0IGNoZWNraW4gZm9yICR7cGF0cm9sbGVyX25hbWV9IHdpdGggbW9kZTogJHt0aGlzLmNoZWNraW5fbW9kZX1gXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuY2hlY2tpbigpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDT01NQU5EUy5PTl9EVVRZLmluY2x1ZGVzKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBnZXRfb25fZHV0eSBmb3IgJHtwYXRyb2xsZXJfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiB7IHJlc3BvbnNlOiBhd2FpdCB0aGlzLmdldF9vbl9kdXR5KCkgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhcIkNoZWNraW5nIGZvciBzdGF0dXMuLi5cIik7XG4gICAgICAgIGlmIChDT01NQU5EUy5TVEFUVVMuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIGdldF9zdGF0dXMgZm9yICR7cGF0cm9sbGVyX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRfc3RhdHVzKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKENPTU1BTkRTLkNIRUNLSU4uaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIHByb21wdF9jaGVja2luIGZvciAke3BhdHJvbGxlcl9uYW1lfWApO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvbXB0X2NoZWNraW4oKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQ09NTUFORFMuQ09NUF9QQVNTLmluY2x1ZGVzKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBjb21wX3Bhc3MgZm9yICR7cGF0cm9sbGVyX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5wcm9tcHRfY29tcF9tYW5hZ2VyX3Bhc3MoXG4gICAgICAgICAgICAgICAgQ29tcFBhc3NUeXBlLkNvbXBQYXNzLFxuICAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKENPTU1BTkRTLlNFQ1RJT05fQVNTSUdOTUVOVC5pbmNsdWRlcyh0aGlzLmJvZHkhKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmZvcm1pbmcgc2VjdGlvbl9hc3NpZ25tZW50IGZvciAke3BhdHJvbGxlcl9uYW1lfWApO1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucHJvbXB0X3NlY3Rpb25fYXNzaWdubWVudCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDT01NQU5EUy5NQU5BR0VSX1BBU1MuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIG1hbmFnZXJfcGFzcyBmb3IgJHtwYXRyb2xsZXJfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnByb21wdF9jb21wX21hbmFnZXJfcGFzcyhcbiAgICAgICAgICAgICAgICBDb21wUGFzc1R5cGUuTWFuYWdlclBhc3MsXG4gICAgICAgICAgICAgICAgbnVsbFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQ09NTUFORFMuV0hBVFNBUFAuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBJJ20gYXZhaWxhYmxlIG9uIHdoYXRzYXBwIGFzIHdlbGwhIFdoYXRzYXBwIHVzZXMgV2lmaS9DZWxsIERhdGEgaW5zdGVhZCBvZiBTTVMsIGFuZCBjYW4gYmUgbW9yZSByZWxpYWJsZS4gTWVzc2FnZSBtZSBhdCBodHRwczovL3dhLm1lLzEke3RoaXMudG99YCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm9tcHRzIHRoZSB1c2VyIGZvciBhIGNvbW1hbmQuXG4gICAgICogQHJldHVybnMge0JWTlNQQ2hlY2tpblJlc3BvbnNlfSBUaGUgcmVzcG9uc2UgcHJvbXB0aW5nIHRoZSB1c2VyIGZvciBhIGNvbW1hbmQuXG4gICAgICovXG4gICAgcHJvbXB0X2NvbW1hbmQoKTogQlZOU1BDaGVja2luUmVzcG9uc2Uge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IGAke3RoaXMucGF0cm9sbGVyIS5uYW1lfSwgSSdtIHRoZSBCVk5TUCBCb3QuXG5FbnRlciBhIGNvbW1hbmQ6XG5DaGVjayBpbiAvIENoZWNrIG91dCAvIFN0YXR1cyAvIE9uIER1dHkgLyBTZWN0aW9uIEFzc2lnbm1lbnQgLyBDb21wIFBhc3MgLyBNYW5hZ2VyIFBhc3MgLyBXaGF0c2FwcFxuU2VuZCAncmVzdGFydCcgYXQgYW55IHRpbWUgdG8gYmVnaW4gYWdhaW5gLFxuICAgICAgICAgICAgbmV4dF9zdGVwOiBORVhUX1NURVBTLkFXQUlUX0NPTU1BTkQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvbXB0cyB0aGUgdXNlciBmb3IgYSBjaGVjay1pbi5cbiAgICAgKiBAcmV0dXJucyB7QlZOU1BDaGVja2luUmVzcG9uc2V9IFRoZSByZXNwb25zZSBwcm9tcHRpbmcgdGhlIHVzZXIgZm9yIGEgY2hlY2staW4uXG4gICAgICovXG4gICAgcHJvbXB0X2NoZWNraW4oKTogQlZOU1BDaGVja2luUmVzcG9uc2Uge1xuICAgICAgICBjb25zdCB0eXBlcyA9IE9iamVjdC52YWx1ZXModGhpcy5jaGVja2luX3ZhbHVlcy5ieV9rZXkpLm1hcChcbiAgICAgICAgICAgICh4KSA9PiB4LnNtc19kZXNjXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZTogYCR7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXIhLm5hbWVcbiAgICAgICAgICAgIH0sIHVwZGF0ZSBwYXRyb2xsaW5nIHN0YXR1cyB0bzogJHt0eXBlc1xuICAgICAgICAgICAgICAgIC5zbGljZSgwLCAtMSlcbiAgICAgICAgICAgICAgICAuam9pbihcIiwgXCIpfSwgb3IgJHt0eXBlcy5zbGljZSgtMSl9P2AsXG4gICAgICAgICAgICBuZXh0X3N0ZXA6IE5FWFRfU1RFUFMuQVdBSVRfQ0hFQ0tJTixcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm9tcHRzIHRoZSB1c2VyIGZvciBzZWN0aW9uIGFzc2lnbm1lbnQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSByZXNwb25zZS5cbiAgICAgKi9cbiAgICBhc3luYyBwcm9tcHRfc2VjdGlvbl9hc3NpZ25tZW50KCk6IFByb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2U+IHtcbiAgICAgICAgaWYgKCF0aGlzLnBhdHJvbGxlciB8fCAhdGhpcy5wYXRyb2xsZXIuY2hlY2tpbikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYCR7dGhpcy5wYXRyb2xsZXIhLm5hbWV9IGlzIG5vdCBjaGVja2VkIGluLmAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNlY3Rpb25fZGVzY3JpcHRpb24gPSB0aGlzLnNlY3Rpb25fdmFsdWVzLmdldF9zZWN0aW9uX2Rlc2NyaXB0aW9uKCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZTogYEVudGVyIHlvdXIgYXNzaWduZWQgc2VjdGlvbjsgb25lIG9mICR7c2VjdGlvbl9kZXNjcmlwdGlvbn0gKG9yICdyZXN0YXJ0JylgLFxuICAgICAgICAgICAgbmV4dF9zdGVwOiBORVhUX1NURVBTLkFXQUlUX1NFQ1RJT04sXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXNzaWducyB0aGUgc2VjdGlvbiB0byB0aGUgcGF0cm9sbGVyLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWN0aW9uIC0gVGhlIHNlY3Rpb24gdG8gYXNzaWduLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQQ2hlY2tpblJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcmVzcG9uc2UuXG4gICAgICovXG4gICAgYXN5bmMgYXNzaWduX3NlY3Rpb24oc2VjdGlvbjogc3RyaW5nKTogUHJvbWlzZTxCVk5TUENoZWNraW5SZXNwb25zZT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhgQXNzaWduaW5nIHNlY3Rpb24gJHt0aGlzLnBhdHJvbGxlciEubmFtZX0gdG8gJHtzZWN0aW9ufWApO1xuICAgICAgICBjb25zdCBtYXBwZWRfc2VjdGlvbiA9IHRoaXMuc2VjdGlvbl92YWx1ZXMubWFwX3NlY3Rpb24oc2VjdGlvbik7XG4gICAgICAgIGF3YWl0IHRoaXMubG9nX2FjdGlvbihgYXNzaWduX3NlY3Rpb24oJHttYXBwZWRfc2VjdGlvbn0pYCk7XG4gICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0PSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpXG4gICAgICAgIGF3YWl0IGxvZ2luX3NoZWV0LmFzc2lnbl9zZWN0aW9uKHRoaXMucGF0cm9sbGVyISwgbWFwcGVkX3NlY3Rpb24pO1xuICAgICAgICBhd2FpdCB0aGlzLmxvZ2luX3NoZWV0Py5yZWZyZXNoKCk7XG4gICAgICAgIGF3YWl0IHRoaXMuZ2V0X21hcHBlZF9wYXRyb2xsZXIodHJ1ZSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZTogYFVwZGF0ZWQgJHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICAgICAgfSB3aXRoIHNlY3Rpb24gYXNzaWdubWVudDogJHttYXBwZWRfc2VjdGlvbn0uYCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm9tcHRzIHRoZSB1c2VyIGZvciBhIGNvbXAgb3IgbWFuYWdlciBwYXNzLlxuICAgICAqIEBwYXJhbSB7Q29tcFBhc3NUeXBlfSBwYXNzX3R5cGUgLSBUaGUgdHlwZSBvZiBwYXNzLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyIHwgbnVsbH0gcGFzc2VzX3RvX3VzZSAtIFRoZSBudW1iZXIgb2YgcGFzc2VzIHRvIHVzZS5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUENoZWNraW5SZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHJlc3BvbnNlLlxuICAgICAqL1xuICAgIGFzeW5jIHByb21wdF9jb21wX21hbmFnZXJfcGFzcyhcbiAgICAgICAgcGFzc190eXBlOiBDb21wUGFzc1R5cGUsXG4gICAgICAgIGd1ZXN0X25hbWU6IHN0cmluZyB8IG51bGxcbiAgICApOiBQcm9taXNlPEJWTlNQQ2hlY2tpblJlc3BvbnNlPiB7XG4gICAgICAgIGlmICh0aGlzLnBhdHJvbGxlciEuY2F0ZWdvcnkgPT0gXCJDXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGAke1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICAgICAgICAgIH0sIGNhbmRpZGF0ZXMgZG8gbm90IHJlY2VpdmUgY29tcCBvciBtYW5hZ2VyIHBhc3Nlcy5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzaGVldDogUGFzc1NoZWV0ID0gYXdhaXQgKHBhc3NfdHlwZSA9PSBDb21wUGFzc1R5cGUuQ29tcFBhc3NcbiAgICAgICAgICAgID8gdGhpcy5nZXRfY29tcF9wYXNzX3NoZWV0KClcbiAgICAgICAgICAgIDogdGhpcy5nZXRfbWFuYWdlcl9wYXNzX3NoZWV0KCkpO1xuXG4gICAgICAgIGNvbnN0IHVzZWRfYW5kX2F2YWlsYWJsZSA9IGF3YWl0IHNoZWV0LmdldF9hdmFpbGFibGVfYW5kX3VzZWRfcGFzc2VzKFxuICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXI/Lm5hbWUhXG4gICAgICAgICk7XG4gICAgICAgIGlmICh1c2VkX2FuZF9hdmFpbGFibGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogXCJQcm9ibGVtIGxvb2tpbmcgdXAgcGF0cm9sbGVyIGZvciBjb21wIHBhc3Nlc1wiLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZ3Vlc3RfbmFtZSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdXNlZF9hbmRfYXZhaWxhYmxlLmdldF9wcm9tcHQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubG9nX2FjdGlvbihgdXNlXyR7cGFzc190eXBlfWApO1xuICAgICAgICAgICAgYXdhaXQgc2hlZXQuc2V0X3VzZWRfY29tcF9wYXNzZXModXNlZF9hbmRfYXZhaWxhYmxlLCBndWVzdF9uYW1lKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBVcGRhdGVkICR7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyIS5uYW1lXG4gICAgICAgICAgICAgICAgfSB0byB1c2UgJHtnZXRfY29tcF9wYXNzX2Rlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBwYXNzX3R5cGVcbiAgICAgICAgICAgICAgICApfSBmb3IgZ3Vlc3QgXCIke2d1ZXN0X25hbWV9XCIgdG9kYXkuYCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBzdGF0dXMgb2YgdGhlIHBhdHJvbGxlci5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUENoZWNraW5SZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHN0YXR1cyByZXNwb25zZS5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfc3RhdHVzKCk6IFByb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuICAgICAgICBjb25zdCBzaGVldF9kYXRlID0gbG9naW5fc2hlZXQuc2hlZXRfZGF0ZS50b0RhdGVTdHJpbmcoKTtcbiAgICAgICAgY29uc3QgY3VycmVudF9kYXRlID0gbG9naW5fc2hlZXQuY3VycmVudF9kYXRlLnRvRGF0ZVN0cmluZygpO1xuICAgICAgICBpZiAoIWxvZ2luX3NoZWV0LmlzX2N1cnJlbnQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBzaGVldF9kYXRlOiAke2xvZ2luX3NoZWV0LnNoZWV0X2RhdGV9YCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgY3VycmVudF9kYXRlOiAke2xvZ2luX3NoZWV0LmN1cnJlbnRfZGF0ZX1gKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBTaGVldCBpcyBub3QgY3VycmVudCBmb3IgdG9kYXkgKGxhc3QgcmVzZXQ6ICR7c2hlZXRfZGF0ZX0pLiAke1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICAgICAgICAgIH0gaXMgbm90IGNoZWNrZWQgaW4gZm9yICR7Y3VycmVudF9kYXRlfS5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXNwb25zZSA9IHsgcmVzcG9uc2U6IGF3YWl0IHRoaXMuZ2V0X3N0YXR1c19zdHJpbmcoKSB9O1xuICAgICAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oXCJzdGF0dXNcIik7XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBzdGF0dXMgc3RyaW5nIG9mIHRoZSBwYXRyb2xsZXIuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c3RyaW5nPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgc3RhdHVzIHN0cmluZy5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfc3RhdHVzX3N0cmluZygpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG4gICAgICAgIGNvbnN0IGNvbXBfcGFzc19wcm9taXNlID0gKFxuICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXRfY29tcF9wYXNzX3NoZWV0KClcbiAgICAgICAgKS5nZXRfYXZhaWxhYmxlX2FuZF91c2VkX3Bhc3Nlcyh0aGlzLnBhdHJvbGxlciEubmFtZSk7XG4gICAgICAgIGNvbnN0IG1hbmFnZXJfcGFzc19wcm9taXNlID0gKFxuICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXRfbWFuYWdlcl9wYXNzX3NoZWV0KClcbiAgICAgICAgKS5nZXRfYXZhaWxhYmxlX2FuZF91c2VkX3Bhc3Nlcyh0aGlzLnBhdHJvbGxlciEubmFtZSk7XG4gICAgICAgIGNvbnN0IHBhdHJvbGxlcl9zdGF0dXMgPSB0aGlzLnBhdHJvbGxlciE7XG5cbiAgICAgICAgY29uc3QgY2hlY2tpbkNvbHVtblNldCA9XG4gICAgICAgICAgICBwYXRyb2xsZXJfc3RhdHVzLmNoZWNraW4gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgcGF0cm9sbGVyX3N0YXR1cy5jaGVja2luICE9PSBudWxsO1xuICAgICAgICBjb25zdCBjaGVja2VkT3V0ID1cbiAgICAgICAgICAgIGNoZWNraW5Db2x1bW5TZXQgJiZcbiAgICAgICAgICAgIHRoaXMuY2hlY2tpbl92YWx1ZXMuYnlfc2hlZXRfc3RyaW5nW3BhdHJvbGxlcl9zdGF0dXMuY2hlY2tpbl0ua2V5ID09XG4gICAgICAgICAgICAgICAgXCJvdXRcIjtcbiAgICAgICAgbGV0IHN0YXR1cyA9IHBhdHJvbGxlcl9zdGF0dXMuY2hlY2tpbiB8fCBcIk5vdCBQcmVzZW50XCI7XG5cbiAgICAgICAgaWYgKGNoZWNrZWRPdXQpIHtcbiAgICAgICAgICAgIHN0YXR1cyA9IFwiQ2hlY2tlZCBPdXRcIjtcbiAgICAgICAgfSBlbHNlIGlmIChjaGVja2luQ29sdW1uU2V0KSB7XG4gICAgICAgICAgICBsZXQgc2VjdGlvbiA9IHBhdHJvbGxlcl9zdGF0dXMuc2VjdGlvbi50b1N0cmluZygpO1xuICAgICAgICAgICAgaWYgKHNlY3Rpb24ubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgICAgICBzZWN0aW9uID0gYFNlY3Rpb24gJHtzZWN0aW9ufWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdGF0dXMgPSBgJHtwYXRyb2xsZXJfc3RhdHVzLmNoZWNraW59ICgke3NlY3Rpb259KWA7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb21wbGV0ZWRQYXRyb2xEYXlzID0gYXdhaXQgKFxuICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXRfc2Vhc29uX3NoZWV0KClcbiAgICAgICAgKS5nZXRfcGF0cm9sbGVkX2RheXModGhpcy5wYXRyb2xsZXIhLm5hbWUpO1xuICAgICAgICBjb25zdCBjb21wbGV0ZWRQYXRyb2xEYXlzU3RyaW5nID1cbiAgICAgICAgICAgIGNvbXBsZXRlZFBhdHJvbERheXMgPiAwID8gY29tcGxldGVkUGF0cm9sRGF5cy50b1N0cmluZygpIDogXCJOb1wiO1xuICAgICAgICBjb25zdCBsb2dpblNoZWV0RGF0ZSA9IGxvZ2luX3NoZWV0LnNoZWV0X2RhdGUudG9EYXRlU3RyaW5nKCk7XG5cbiAgICAgICAgbGV0IHN0YXR1c1N0cmluZyA9IGBTdGF0dXMgZm9yICR7XG4gICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICB9IG9uIGRhdGUgJHtsb2dpblNoZWV0RGF0ZX06ICR7c3RhdHVzfS5cXG4ke2NvbXBsZXRlZFBhdHJvbERheXNTdHJpbmd9IGNvbXBsZXRlZCBwYXRyb2wgZGF5cyBwcmlvciB0byB0b2RheS5gO1xuICAgICAgICBjb25zdCB1c2VkVG9kYXlDb21wUGFzc2VzID0gKGF3YWl0IGNvbXBfcGFzc19wcm9taXNlKT8udXNlZF90b2RheSB8fCAwO1xuICAgICAgICBjb25zdCB1c2VkVG9kYXlNYW5hZ2VyUGFzc2VzID1cbiAgICAgICAgICAgIChhd2FpdCBtYW5hZ2VyX3Bhc3NfcHJvbWlzZSk/LnVzZWRfdG9kYXkgfHwgMDtcbiAgICAgICAgY29uc3QgdXNlZFNlYXNvbkNvbXBQYXNzZXMgPVxuICAgICAgICAgICAgKGF3YWl0IGNvbXBfcGFzc19wcm9taXNlKT8udXNlZF9zZWFzb24gfHwgMDtcbiAgICAgICAgY29uc3QgdXNlZFNlYXNvbk1hbmFnZXJQYXNzZXMgPVxuICAgICAgICAgICAgKGF3YWl0IG1hbmFnZXJfcGFzc19wcm9taXNlKT8udXNlZF9zZWFzb24gfHwgMDtcbiAgICAgICAgY29uc3QgYXZhaWxhYmxlQ29tcFBhc3NlcyA9IChhd2FpdCBjb21wX3Bhc3NfcHJvbWlzZSk/LmF2YWlsYWJsZSB8fCAwO1xuICAgICAgICBjb25zdCBhdmFpbGFibGVNYW5hZ2VyUGFzc2VzID1cbiAgICAgICAgICAgIChhd2FpdCBtYW5hZ2VyX3Bhc3NfcHJvbWlzZSk/LmF2YWlsYWJsZSB8fCAwO1xuXG4gICAgICAgIHN0YXR1c1N0cmluZyArPVxuICAgICAgICAgICAgXCIgXCIgK1xuICAgICAgICAgICAgYnVpbGRfcGFzc2VzX3N0cmluZyhcbiAgICAgICAgICAgICAgICB1c2VkU2Vhc29uQ29tcFBhc3NlcyxcbiAgICAgICAgICAgICAgICB1c2VkU2Vhc29uQ29tcFBhc3NlcyArIGF2YWlsYWJsZUNvbXBQYXNzZXMsXG4gICAgICAgICAgICAgICAgdXNlZFRvZGF5Q29tcFBhc3NlcyxcbiAgICAgICAgICAgICAgICBcImNvbXAgcGFzc2VzXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgIGlmICh1c2VkU2Vhc29uTWFuYWdlclBhc3NlcyArIGF2YWlsYWJsZU1hbmFnZXJQYXNzZXMgPiAwKSB7XG4gICAgICAgICAgICBzdGF0dXNTdHJpbmcgKz1cbiAgICAgICAgICAgICAgICBcIiBcIiArXG4gICAgICAgICAgICAgICAgYnVpbGRfcGFzc2VzX3N0cmluZyhcbiAgICAgICAgICAgICAgICAgICAgdXNlZFNlYXNvbk1hbmFnZXJQYXNzZXMsXG4gICAgICAgICAgICAgICAgICAgIHVzZWRTZWFzb25NYW5hZ2VyUGFzc2VzICsgYXZhaWxhYmxlTWFuYWdlclBhc3NlcyxcbiAgICAgICAgICAgICAgICAgICAgdXNlZFRvZGF5TWFuYWdlclBhc3NlcyxcbiAgICAgICAgICAgICAgICAgICAgXCJtYW5hZ2VyIHBhc3Nlc1wiXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RhdHVzU3RyaW5nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIHRoZSBjaGVjay1pbiBwcm9jZXNzIGZvciB0aGUgcGF0cm9sbGVyLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQQ2hlY2tpblJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgY2hlY2staW4gcmVzcG9uc2UuXG4gICAgICogQHRocm93cyB7RXJyb3J9IFRocm93cyBhbiBlcnJvciBpZiB0aGUgY2hlY2staW4gbW9kZSBpcyBpbXByb3Blcmx5IHNldC5cbiAgICAgKi9cbiAgICBhc3luYyBjaGVja2luKCk6IFByb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICBgUGVyZm9ybWluZyByZWd1bGFyIGNoZWNraW4gZm9yICR7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXIhLm5hbWVcbiAgICAgICAgICAgIH0gd2l0aCBtb2RlOiAke3RoaXMuY2hlY2tpbl9tb2RlfWBcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGF3YWl0IHRoaXMuc2hlZXRfbmVlZHNfcmVzZXQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTpcbiAgICAgICAgICAgICAgICAgICAgYCR7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICAgICAgICAgICAgICB9LCB5b3UgYXJlIHRoZSBmaXJzdCBwZXJzb24gdG8gY2hlY2sgaW4gdG9kYXkuIGAgK1xuICAgICAgICAgICAgICAgICAgICBgSSBuZWVkIHRvIGFyY2hpdmUgYW5kIHJlc2V0IHRoZSBzaGVldCBiZWZvcmUgY29udGludWluZy4gYCArXG4gICAgICAgICAgICAgICAgICAgIGBXb3VsZCB5b3UgbGlrZSBtZSB0byBkbyB0aGF0PyAoWWVzL05vKWAsXG4gICAgICAgICAgICAgICAgbmV4dF9zdGVwOiBgJHtORVhUX1NURVBTLkNPTkZJUk1fUkVTRVR9LSR7dGhpcy5jaGVja2luX21vZGV9YCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNoZWNraW5fbW9kZTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgIXRoaXMuY2hlY2tpbl9tb2RlIHx8XG4gICAgICAgICAgICAoY2hlY2tpbl9tb2RlID0gdGhpcy5jaGVja2luX3ZhbHVlcy5ieV9rZXlbdGhpcy5jaGVja2luX21vZGVdKSA9PT1cbiAgICAgICAgICAgICAgICB1bmRlZmluZWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDaGVja2luIG1vZGUgaW1wcm9wZXJseSBzZXRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG4gICAgICAgIGNvbnN0IG5ld19jaGVja2luX3ZhbHVlID0gY2hlY2tpbl9tb2RlLnNoZWV0c192YWx1ZTtcbiAgICAgICAgYXdhaXQgbG9naW5fc2hlZXQuY2hlY2tpbih0aGlzLnBhdHJvbGxlciEsIG5ld19jaGVja2luX3ZhbHVlKTtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKGB1cGRhdGUtc3RhdHVzKCR7bmV3X2NoZWNraW5fdmFsdWV9KWApO1xuICAgICAgICBhd2FpdCB0aGlzLmxvZ2luX3NoZWV0Py5yZWZyZXNoKCk7XG4gICAgICAgIGF3YWl0IHRoaXMuZ2V0X21hcHBlZF9wYXRyb2xsZXIodHJ1ZSk7XG5cbiAgICAgICAgbGV0IHJlc3BvbnNlID0gYFVwZGF0aW5nICR7XG4gICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICB9IHdpdGggc3RhdHVzOiAke25ld19jaGVja2luX3ZhbHVlfS5gO1xuICAgICAgICBpZiAoIXRoaXMuZmFzdF9jaGVja2luKSB7XG4gICAgICAgICAgICByZXNwb25zZSArPSBgIFlvdSBjYW4gc2VuZCAnJHtjaGVja2luX21vZGUuZmFzdF9jaGVja2luc1swXX0nIGFzIHlvdXIgZmlyc3QgbWVzc2FnZSBmb3IgYSBmYXN0ICR7Y2hlY2tpbl9tb2RlLnNoZWV0c192YWx1ZX0gY2hlY2tpbiBuZXh0IHRpbWUuYDtcbiAgICAgICAgfVxuICAgICAgICByZXNwb25zZSArPSBcIlxcblxcblwiICsgKGF3YWl0IHRoaXMuZ2V0X3N0YXR1c19zdHJpbmcoKSk7XG4gICAgICAgIHJldHVybiB7IHJlc3BvbnNlOiByZXNwb25zZSB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGUgR29vZ2xlIFNoZWV0cyBuZWVkcyB0byBiZSByZXNldC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdHJ1ZSBpZiB0aGUgc2hlZXQgbmVlZHMgdG8gYmUgcmVzZXQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKi9cbiAgICBhc3luYyBzaGVldF9uZWVkc19yZXNldCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuXG4gICAgICAgIGNvbnN0IHNoZWV0X2RhdGUgPSBsb2dpbl9zaGVldC5zaGVldF9kYXRlO1xuICAgICAgICBjb25zdCBjdXJyZW50X2RhdGUgPSBsb2dpbl9zaGVldC5jdXJyZW50X2RhdGU7XG4gICAgICAgIGNvbnNvbGUubG9nKGBzaGVldF9kYXRlOiAke3NoZWV0X2RhdGV9YCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBjdXJyZW50X2RhdGU6ICR7Y3VycmVudF9kYXRlfWApO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGBkYXRlX2lzX2N1cnJlbnQ6ICR7bG9naW5fc2hlZXQuaXNfY3VycmVudH1gKTtcblxuICAgICAgICByZXR1cm4gIWxvZ2luX3NoZWV0LmlzX2N1cnJlbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzZXRzIHRoZSBHb29nbGUgU2hlZXRzIGZsb3csIGluY2x1ZGluZyBhcmNoaXZpbmcgYW5kIHJlc2V0dGluZyB0aGUgc2hlZXQgaWYgbmVjZXNzYXJ5LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQQ2hlY2tpblJlc3BvbnNlIHwgdm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGNoZWNrLWluIHJlc3BvbnNlIG9yIHZvaWQuXG4gICAgICovXG4gICAgYXN5bmMgcmVzZXRfc2hlZXRfZmxvdygpOiBQcm9taXNlPEJWTlNQQ2hlY2tpblJlc3BvbnNlIHwgdm9pZD4ge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuY2hlY2tfdXNlcl9jcmVkcyhcbiAgICAgICAgICAgIGAke1xuICAgICAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyIS5uYW1lXG4gICAgICAgICAgICB9LCBpbiBvcmRlciB0byByZXNldC9hcmNoaXZlLCBJIG5lZWQgeW91IHRvIGF1dGhvcml6ZSB0aGUgYXBwLmBcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHJlc3BvbnNlKVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogcmVzcG9uc2UucmVzcG9uc2UsXG4gICAgICAgICAgICAgICAgbmV4dF9zdGVwOiBgJHtORVhUX1NURVBTLkFVVEhfUkVTRVR9LSR7dGhpcy5jaGVja2luX21vZGV9YCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnJlc2V0X3NoZWV0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzZXRzIHRoZSBHb29nbGUgU2hlZXRzLCBpbmNsdWRpbmcgYXJjaGl2aW5nIGFuZCByZXNldHRpbmcgdGhlIHNoZWV0LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBzaGVldCBpcyByZXNldC5cbiAgICAgKi9cbiAgICBhc3luYyByZXNldF9zaGVldCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3Qgc2NyaXB0X3NlcnZpY2UgPSBhd2FpdCB0aGlzLmdldF91c2VyX3NjcmlwdHNfc2VydmljZSgpO1xuICAgICAgICBjb25zdCBzaG91bGRfcGVyZm9ybV9hcmNoaXZlID0gIShhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpKS5hcmNoaXZlZDtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IHNob3VsZF9wZXJmb3JtX2FyY2hpdmVcbiAgICAgICAgICAgID8gXCJPa2F5LiBBcmNoaXZpbmcgYW5kIHJlc2V0aW5nIHRoZSBjaGVjayBpbiBzaGVldC4gVGhpcyB0YWtlcyBhYm91dCAxMCBzZWNvbmRzLi4uXCJcbiAgICAgICAgICAgIDogXCJPa2F5LiBTaGVldCBoYXMgYWxyZWFkeSBiZWVuIGFyY2hpdmVkLiBQZXJmb3JtaW5nIHJlc2V0LiBUaGlzIHRha2VzIGFib3V0IDUgc2Vjb25kcy4uLlwiO1xuICAgICAgICBhd2FpdCB0aGlzLnNlbmRfbWVzc2FnZShtZXNzYWdlKTtcbiAgICAgICAgaWYgKHNob3VsZF9wZXJmb3JtX2FyY2hpdmUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQXJjaGl2aW5nLi4uXCIpO1xuXG4gICAgICAgICAgICBhd2FpdCBzY3JpcHRfc2VydmljZS5zY3JpcHRzLnJ1bih7XG4gICAgICAgICAgICAgICAgc2NyaXB0SWQ6IHRoaXMucmVzZXRfc2NyaXB0X2lkLFxuICAgICAgICAgICAgICAgIHJlcXVlc3RCb2R5OiB7IGZ1bmN0aW9uOiB0aGlzLmNvbmZpZy5BUkNISVZFX0ZVTkNUSU9OX05BTUUgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5kZWxheSg1KTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubG9nX2FjdGlvbihcImFyY2hpdmVcIik7XG4gICAgICAgICAgICB0aGlzLmxvZ2luX3NoZWV0ID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVzZXR0aW5nLi4uXCIpO1xuICAgICAgICBhd2FpdCBzY3JpcHRfc2VydmljZS5zY3JpcHRzLnJ1bih7XG4gICAgICAgICAgICBzY3JpcHRJZDogdGhpcy5yZXNldF9zY3JpcHRfaWQsXG4gICAgICAgICAgICByZXF1ZXN0Qm9keTogeyBmdW5jdGlvbjogdGhpcy5jb25maWcuUkVTRVRfRlVOQ1RJT05fTkFNRSB9LFxuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgdGhpcy5kZWxheSg1KTtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKFwicmVzZXRcIik7XG4gICAgICAgIGF3YWl0IHRoaXMuc2VuZF9tZXNzYWdlKFwiRG9uZS5cIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgR29vZ2xlIEFwcHMgU2NyaXB0IHNlcnZpY2UuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c2NyaXB0X3YxLlNjcmlwdD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIEdvb2dsZSBBcHBzIFNjcmlwdCBzZXJ2aWNlLlxuICAgICAqL1xuICAgIGFzeW5jIGNoZWNrX3VzZXJfY3JlZHMoXG4gICAgICAgIHByb21wdF9tZXNzYWdlOiBzdHJpbmcgPSBcIkhpLCBiZWZvcmUgeW91IGNhbiB1c2UgQlZOU1AgYm90LCB5b3UgbXVzdCBsb2dpbi5cIlxuICAgICk6IFByb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2UgfCB1bmRlZmluZWQ+IHtcbiAgICAgICAgY29uc3QgdXNlcl9jcmVkcyA9IHRoaXMuZ2V0X3VzZXJfY3JlZHMoKTtcbiAgICAgICAgaWYgKCEoYXdhaXQgdXNlcl9jcmVkcy5sb2FkVG9rZW4oKSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGF1dGhVcmwgPSBhd2FpdCB1c2VyX2NyZWRzLmdldEF1dGhVcmwoKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGAke3Byb21wdF9tZXNzYWdlfSBQbGVhc2UgZm9sbG93IHRoaXMgbGluazpcbiR7YXV0aFVybH1cblxuTWVzc2FnZSBtZSBhZ2FpbiB3aGVuIGRvbmUuYCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBHb29nbGUgQXBwcyBTY3JpcHQgc2VydmljZS5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzY3JpcHRfdjEuU2NyaXB0Pn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgR29vZ2xlIEFwcHMgU2NyaXB0IHNlcnZpY2UuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X29uX2R1dHkoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgY29uc3QgY2hlY2tlZF9vdXRfc2VjdGlvbiA9IFwiQ2hlY2tlZCBPdXRcIjtcbiAgICAgICAgY29uc3QgbGFzdF9zZWN0aW9ucyA9IFtjaGVja2VkX291dF9zZWN0aW9uXTtcbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuXG4gICAgICAgIGNvbnN0IG9uX2R1dHlfcGF0cm9sbGVycyA9IGxvZ2luX3NoZWV0LmdldF9vbl9kdXR5X3BhdHJvbGxlcnMoKTtcbiAgICAgICAgY29uc3QgYnlfc2VjdGlvbiA9IG9uX2R1dHlfcGF0cm9sbGVyc1xuICAgICAgICAgICAgLmZpbHRlcigoeCkgPT4geC5jaGVja2luKVxuICAgICAgICAgICAgLnJlZHVjZSgocHJldjogeyBba2V5OiBzdHJpbmddOiBQYXRyb2xsZXJSb3dbXSB9LCBjdXIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzaG9ydF9jb2RlID1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja2luX3ZhbHVlcy5ieV9zaGVldF9zdHJpbmdbY3VyLmNoZWNraW5dLmtleTtcbiAgICAgICAgICAgICAgICBsZXQgc2VjdGlvbiA9IGN1ci5zZWN0aW9uO1xuICAgICAgICAgICAgICAgIGlmIChzaG9ydF9jb2RlID09IFwib3V0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VjdGlvbiA9IGNoZWNrZWRfb3V0X3NlY3Rpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghKHNlY3Rpb24gaW4gcHJldikpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldltzZWN0aW9uXSA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwcmV2W3NlY3Rpb25dLnB1c2goY3VyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJldjtcbiAgICAgICAgICAgIH0sIHt9KTtcbiAgICAgICAgbGV0IHJlc3VsdHM6IHN0cmluZ1tdW10gPSBbXTtcbiAgICAgICAgbGV0IGFsbF9rZXlzID0gT2JqZWN0LmtleXMoYnlfc2VjdGlvbik7XG4gICAgICAgIGNvbnN0IG9yZGVyZWRfcHJpbWFyeV9zZWN0aW9ucyA9IE9iamVjdC5rZXlzKGJ5X3NlY3Rpb24pXG4gICAgICAgICAgICAuZmlsdGVyKCh4KSA9PiAhbGFzdF9zZWN0aW9ucy5pbmNsdWRlcyh4KSlcbiAgICAgICAgICAgIC5zb3J0KCk7XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkX2xhc3Rfc2VjdGlvbnMgPSBsYXN0X3NlY3Rpb25zLmZpbHRlcigoeCkgPT5cbiAgICAgICAgICAgIGFsbF9rZXlzLmluY2x1ZGVzKHgpXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IG9yZGVyZWRfc2VjdGlvbnMgPSBvcmRlcmVkX3ByaW1hcnlfc2VjdGlvbnMuY29uY2F0KFxuICAgICAgICAgICAgZmlsdGVyZWRfbGFzdF9zZWN0aW9uc1xuICAgICAgICApO1xuXG4gICAgICAgIGZvciAoY29uc3Qgc2VjdGlvbiBvZiBvcmRlcmVkX3NlY3Rpb25zKSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0OiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICAgICAgY29uc3QgcGF0cm9sbGVycyA9IGJ5X3NlY3Rpb25bc2VjdGlvbl0uc29ydCgoeCwgeSkgPT5cbiAgICAgICAgICAgICAgICB4Lm5hbWUubG9jYWxlQ29tcGFyZSh5Lm5hbWUpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKHNlY3Rpb24ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goXCJTZWN0aW9uIFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGAke3NlY3Rpb259OiBgKTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIHBhdHJvbGxlcl9zdHJpbmcobmFtZTogc3RyaW5nLCBzaG9ydF9jb2RlOiBzdHJpbmcpIHtcbiAgICAgICAgICAgICAgICBsZXQgZGV0YWlscyA9IFwiXCI7XG4gICAgICAgICAgICAgICAgaWYgKHNob3J0X2NvZGUgIT09IFwiZGF5XCIgJiYgc2hvcnRfY29kZSAhPT0gXCJvdXRcIikge1xuICAgICAgICAgICAgICAgICAgICBkZXRhaWxzID0gYCAoJHtzaG9ydF9jb2RlLnRvVXBwZXJDYXNlKCl9KWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBgJHtuYW1lfSR7ZGV0YWlsc31gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0LnB1c2goXG4gICAgICAgICAgICAgICAgcGF0cm9sbGVyc1xuICAgICAgICAgICAgICAgICAgICAubWFwKCh4KSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0cm9sbGVyX3N0cmluZyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja2luX3ZhbHVlcy5ieV9zaGVldF9zdHJpbmdbeC5jaGVja2luXS5rZXlcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAuam9pbihcIiwgXCIpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKFwib24tZHV0eVwiKTtcbiAgICAgICAgcmV0dXJuIGBQYXRyb2xsZXJzIGZvciAke2xvZ2luX3NoZWV0LnNoZWV0X2RhdGUudG9EYXRlU3RyaW5nKCl9IChUb3RhbDogJHtcbiAgICAgICAgICAgIG9uX2R1dHlfcGF0cm9sbGVycy5sZW5ndGhcbiAgICAgICAgfSk6XFxuJHtyZXN1bHRzLm1hcCgocikgPT4gci5qb2luKFwiXCIpKS5qb2luKFwiXFxuXCIpfWA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9ncyBhbiBhY3Rpb24gdG8gdGhlIEdvb2dsZSBTaGVldHMuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGFjdGlvbl9uYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGFjdGlvbiB0byBsb2cuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGFjdGlvbiBpcyBsb2dnZWQuXG4gICAgICovXG4gICAgYXN5bmMgbG9nX2FjdGlvbihhY3Rpb25fbmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHNoZWV0c19zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfc2hlZXRzX3NlcnZpY2UoKTtcbiAgICAgICAgYXdhaXQgc2hlZXRzX3NlcnZpY2Uuc3ByZWFkc2hlZXRzLnZhbHVlcy5hcHBlbmQoe1xuICAgICAgICAgICAgc3ByZWFkc2hlZXRJZDogdGhpcy5jb21iaW5lZF9jb25maWcuU0hFRVRfSUQsXG4gICAgICAgICAgICByYW5nZTogdGhpcy5jb25maWcuQUNUSU9OX0xPR19TSEVFVCxcbiAgICAgICAgICAgIHZhbHVlSW5wdXRPcHRpb246IFwiVVNFUl9FTlRFUkVEXCIsXG4gICAgICAgICAgICByZXF1ZXN0Qm9keToge1xuICAgICAgICAgICAgICAgIHZhbHVlczogW1t0aGlzLnBhdHJvbGxlciEubmFtZSwgbmV3IERhdGUoKSwgYWN0aW9uX25hbWVdXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvZ3Mgb3V0IHRoZSB1c2VyLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQQ2hlY2tpblJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgbG9nb3V0IHJlc3BvbnNlLlxuICAgICAqL1xuICAgIGFzeW5jIGxvZ291dCgpOiBQcm9taXNlPEJWTlNQQ2hlY2tpblJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnN0IHVzZXJfY3JlZHMgPSB0aGlzLmdldF91c2VyX2NyZWRzKCk7XG4gICAgICAgIGF3YWl0IHVzZXJfY3JlZHMuZGVsZXRlVG9rZW4oKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3BvbnNlOiBcIk9rYXksIEkgaGF2ZSByZW1vdmVkIGFsbCBsb2dpbiBzZXNzaW9uIGluZm9ybWF0aW9uLlwiLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIFR3aWxpbyBjbGllbnQuXG4gICAgICogQHJldHVybnMge1R3aWxpb0NsaWVudH0gVGhlIFR3aWxpbyBjbGllbnQuXG4gICAgICovXG4gICAgZ2V0X3R3aWxpb19jbGllbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnR3aWxpb19jbGllbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHdpbGlvX2NsaWVudCB3YXMgbmV2ZXIgaW5pdGlhbGl6ZWQhXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnR3aWxpb19jbGllbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgVHdpbGlvIFN5bmMgY2xpZW50LlxuICAgICAqIEByZXR1cm5zIHtTZXJ2aWNlQ29udGV4dH0gVGhlIFR3aWxpbyBTeW5jIGNsaWVudC5cbiAgICAgKi9cbiAgICBnZXRfc3luY19jbGllbnQoKSB7XG4gICAgICAgIGlmICghdGhpcy5zeW5jX2NsaWVudCkge1xuICAgICAgICAgICAgdGhpcy5zeW5jX2NsaWVudCA9IHRoaXMuZ2V0X3R3aWxpb19jbGllbnQoKS5zeW5jLnNlcnZpY2VzKFxuICAgICAgICAgICAgICAgIHRoaXMuc3luY19zaWRcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc3luY19jbGllbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgdXNlciBjcmVkZW50aWFscy5cbiAgICAgKiBAcmV0dXJucyB7VXNlckNyZWRzfSBUaGUgdXNlciBjcmVkZW50aWFscy5cbiAgICAgKi9cbiAgICBnZXRfdXNlcl9jcmVkcygpIHtcbiAgICAgICAgaWYgKCF0aGlzLnVzZXJfY3JlZHMpIHtcbiAgICAgICAgICAgIHRoaXMudXNlcl9jcmVkcyA9IG5ldyBVc2VyQ3JlZHMoXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRfc3luY19jbGllbnQoKSxcbiAgICAgICAgICAgICAgICB0aGlzLmZyb20sXG4gICAgICAgICAgICAgICAgdGhpcy5jb21iaW5lZF9jb25maWdcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudXNlcl9jcmVkcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBzZXJ2aWNlIGNyZWRlbnRpYWxzLlxuICAgICAqIEByZXR1cm5zIHtHb29nbGVBdXRofSBUaGUgc2VydmljZSBjcmVkZW50aWFscy5cbiAgICAgKi9cbiAgICBnZXRfc2VydmljZV9jcmVkcygpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNlcnZpY2VfY3JlZHMpIHtcbiAgICAgICAgICAgIHRoaXMuc2VydmljZV9jcmVkcyA9IG5ldyBnb29nbGUuYXV0aC5Hb29nbGVBdXRoKHtcbiAgICAgICAgICAgICAgICBrZXlGaWxlOiBnZXRfc2VydmljZV9jcmVkZW50aWFsc19wYXRoKCksXG4gICAgICAgICAgICAgICAgc2NvcGVzOiB0aGlzLlNDT1BFUyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2VfY3JlZHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgdmFsaWQgY3JlZGVudGlhbHMuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbcmVxdWlyZV91c2VyX2NyZWRzPWZhbHNlXSAtIFdoZXRoZXIgdXNlciBjcmVkZW50aWFscyBhcmUgcmVxdWlyZWQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8R29vZ2xlQXV0aD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHZhbGlkIGNyZWRlbnRpYWxzLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF92YWxpZF9jcmVkcyhyZXF1aXJlX3VzZXJfY3JlZHM6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBpZiAodGhpcy5jb25maWcuVVNFX1NFUlZJQ0VfQUNDT1VOVCAmJiAhcmVxdWlyZV91c2VyX2NyZWRzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRfc2VydmljZV9jcmVkcygpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVzZXJfY3JlZHMgPSB0aGlzLmdldF91c2VyX2NyZWRzKCk7XG4gICAgICAgIGlmICghKGF3YWl0IHVzZXJfY3JlZHMubG9hZFRva2VuKCkpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVc2VyIGlzIG5vdCBhdXRoZWQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVXNpbmcgdXNlciBhY2NvdW50IGZvciBzZXJ2aWNlIGF1dGguLi5cIik7XG4gICAgICAgIHJldHVybiB1c2VyX2NyZWRzLm9hdXRoMl9jbGllbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgR29vZ2xlIFNoZWV0cyBzZXJ2aWNlLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHNoZWV0c192NC5TaGVldHM+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBHb29nbGUgU2hlZXRzIHNlcnZpY2UuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3NoZWV0c19zZXJ2aWNlKCkge1xuICAgICAgICBpZiAoIXRoaXMuc2hlZXRzX3NlcnZpY2UpIHtcbiAgICAgICAgICAgIHRoaXMuc2hlZXRzX3NlcnZpY2UgPSBnb29nbGUuc2hlZXRzKHtcbiAgICAgICAgICAgICAgICB2ZXJzaW9uOiBcInY0XCIsXG4gICAgICAgICAgICAgICAgYXV0aDogYXdhaXQgdGhpcy5nZXRfdmFsaWRfY3JlZHMoKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNoZWV0c19zZXJ2aWNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGxvZ2luIHNoZWV0LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPExvZ2luU2hlZXQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBsb2dpbiBzaGVldFxuICAgICAqL1xuICAgIGFzeW5jIGdldF9sb2dpbl9zaGVldCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmxvZ2luX3NoZWV0KSB7XG4gICAgICAgICAgICBjb25zdCBsb2dpbl9zaGVldF9jb25maWc6IExvZ2luU2hlZXRDb25maWcgPSB0aGlzLmNvbWJpbmVkX2NvbmZpZztcbiAgICAgICAgICAgIGNvbnN0IHNoZWV0c19zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfc2hlZXRzX3NlcnZpY2UoKTtcbiAgICAgICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gbmV3IExvZ2luU2hlZXQoXG4gICAgICAgICAgICAgICAgc2hlZXRzX3NlcnZpY2UsXG4gICAgICAgICAgICAgICAgbG9naW5fc2hlZXRfY29uZmlnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYXdhaXQgbG9naW5fc2hlZXQucmVmcmVzaCgpO1xuICAgICAgICAgICAgdGhpcy5sb2dpbl9zaGVldCA9IGxvZ2luX3NoZWV0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmxvZ2luX3NoZWV0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHNlYXNvbiBzaGVldC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxTZWFzb25TaGVldD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHNlYXNvbiBzaGVldFxuICAgICAqL1xuICAgIGFzeW5jIGdldF9zZWFzb25fc2hlZXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5zZWFzb25fc2hlZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IHNlYXNvbl9zaGVldF9jb25maWc6IFNlYXNvblNoZWV0Q29uZmlnID0gdGhpcy5jb21iaW5lZF9jb25maWc7XG4gICAgICAgICAgICBjb25zdCBzaGVldHNfc2VydmljZSA9IGF3YWl0IHRoaXMuZ2V0X3NoZWV0c19zZXJ2aWNlKCk7XG4gICAgICAgICAgICBjb25zdCBzZWFzb25fc2hlZXQgPSBuZXcgU2Vhc29uU2hlZXQoXG4gICAgICAgICAgICAgICAgc2hlZXRzX3NlcnZpY2UsXG4gICAgICAgICAgICAgICAgc2Vhc29uX3NoZWV0X2NvbmZpZ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuc2Vhc29uX3NoZWV0ID0gc2Vhc29uX3NoZWV0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNlYXNvbl9zaGVldDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBjb21wIHBhc3Mgc2hlZXQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8Q29tcFBhc3NTaGVldD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGNvbXAgcGFzcyBzaGVldFxuICAgICAqL1xuICAgIGFzeW5jIGdldF9jb21wX3Bhc3Nfc2hlZXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5jb21wX3Bhc3Nfc2hlZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpZzogQ29tcFBhc3Nlc0NvbmZpZyA9IHRoaXMuY29tYmluZWRfY29uZmlnO1xuICAgICAgICAgICAgY29uc3Qgc2hlZXRzX3NlcnZpY2UgPSBhd2FpdCB0aGlzLmdldF9zaGVldHNfc2VydmljZSgpO1xuICAgICAgICAgICAgY29uc3Qgc2Vhc29uX3NoZWV0ID0gbmV3IENvbXBQYXNzU2hlZXQoc2hlZXRzX3NlcnZpY2UsIGNvbmZpZyk7XG4gICAgICAgICAgICB0aGlzLmNvbXBfcGFzc19zaGVldCA9IHNlYXNvbl9zaGVldDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jb21wX3Bhc3Nfc2hlZXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbWFuYWdlciBwYXNzIHNoZWV0LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPE1hbmFnZXJQYXNzU2hlZXQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBtYW5hZ2VyIHBhc3Mgc2hlZXRcbiAgICAgKi9cbiAgICBhc3luYyBnZXRfbWFuYWdlcl9wYXNzX3NoZWV0KCkge1xuICAgICAgICBpZiAoIXRoaXMubWFuYWdlcl9wYXNzX3NoZWV0KSB7XG4gICAgICAgICAgICBjb25zdCBjb25maWc6IE1hbmFnZXJQYXNzZXNDb25maWcgPSB0aGlzLmNvbWJpbmVkX2NvbmZpZztcbiAgICAgICAgICAgIGNvbnN0IHNoZWV0c19zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfc2hlZXRzX3NlcnZpY2UoKTtcbiAgICAgICAgICAgIGNvbnN0IHNlYXNvbl9zaGVldCA9IG5ldyBNYW5hZ2VyUGFzc1NoZWV0KHNoZWV0c19zZXJ2aWNlLCBjb25maWcpO1xuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyX3Bhc3Nfc2hlZXQgPSBzZWFzb25fc2hlZXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubWFuYWdlcl9wYXNzX3NoZWV0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIEdvb2dsZSBBcHBzIFNjcmlwdCBzZXJ2aWNlLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHNjcmlwdF92MS5TY3JpcHQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBHb29nbGUgQXBwcyBTY3JpcHQgc2VydmljZS5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfdXNlcl9zY3JpcHRzX3NlcnZpY2UoKSB7XG4gICAgICAgIGlmICghdGhpcy51c2VyX3NjcmlwdHNfc2VydmljZSkge1xuICAgICAgICAgICAgdGhpcy51c2VyX3NjcmlwdHNfc2VydmljZSA9IGdvb2dsZS5zY3JpcHQoe1xuICAgICAgICAgICAgICAgIHZlcnNpb246IFwidjFcIixcbiAgICAgICAgICAgICAgICBhdXRoOiBhd2FpdCB0aGlzLmdldF92YWxpZF9jcmVkcyh0cnVlKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJfc2NyaXB0c19zZXJ2aWNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG1hcHBlZCBwYXRyb2xsZXIuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbZm9yY2U9ZmFsc2VdIC0gV2hldGhlciB0byBmb3JjZSB0aGUgcGF0cm9sbGVyIHRvIGJlIGZvdW5kLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQQ2hlY2tpblJlc3BvbnNlIHwgdm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHJlc3BvbnNlIG9yIHZvaWQuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X21hcHBlZF9wYXRyb2xsZXIoZm9yY2U6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBjb25zdCBwaG9uZV9sb29rdXAgPSBhd2FpdCB0aGlzLmZpbmRfcGF0cm9sbGVyX2Zyb21fbnVtYmVyKCk7XG4gICAgICAgIGlmIChwaG9uZV9sb29rdXAgPT09IHVuZGVmaW5lZCB8fCBwaG9uZV9sb29rdXAgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChmb3JjZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBmaW5kIGFzc29jaWF0ZWQgdXNlclwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBTb3JyeSwgSSBjb3VsZG4ndCBmaW5kIGFuIGFzc29jaWF0ZWQgQlZOU1AgbWVtYmVyIHdpdGggeW91ciBwaG9uZSBudW1iZXIgKCR7dGhpcy5mcm9tfSlgLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKTtcbiAgICAgICAgY29uc3QgbWFwcGVkUGF0cm9sbGVyID0gbG9naW5fc2hlZXQudHJ5X2ZpbmRfcGF0cm9sbGVyKFxuICAgICAgICAgICAgcGhvbmVfbG9va3VwLm5hbWVcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKG1hcHBlZFBhdHJvbGxlciA9PT0gXCJub3RfZm91bmRcIikge1xuICAgICAgICAgICAgaWYgKGZvcmNlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IHBhdHJvbGxlciBpbiBsb2dpbiBzaGVldFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBDb3VsZCBub3QgZmluZCBwYXRyb2xsZXIgJyR7cGhvbmVfbG9va3VwLm5hbWV9JyBpbiBsb2dpbiBzaGVldC4gUGxlYXNlIGxvb2sgYXQgdGhlIGxvZ2luIHNoZWV0IG5hbWUsIGFuZCBjb3B5IGl0IHRvIHRoZSBQaG9uZSBOdW1iZXJzIHRhYi5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1cnJlbnRfc2hlZXRfZGF0ZSA9IGxvZ2luX3NoZWV0LmN1cnJlbnRfZGF0ZTtcbiAgICAgICAgdGhpcy5wYXRyb2xsZXIgPSBtYXBwZWRQYXRyb2xsZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmluZHMgdGhlIHBhdHJvbGxlciBmcm9tIHRoZSBwaG9uZSBudW1iZXIuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8UGF0cm9sbGVyUm93Pn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcGF0cm9sbGVyLlxuICAgICAqL1xuICAgIGFzeW5jIGZpbmRfcGF0cm9sbGVyX2Zyb21fbnVtYmVyKCkge1xuICAgICAgICBjb25zdCByYXdfbnVtYmVyID0gdGhpcy5mcm9tO1xuICAgICAgICBjb25zdCBzaGVldHNfc2VydmljZSA9IGF3YWl0IHRoaXMuZ2V0X3NoZWV0c19zZXJ2aWNlKCk7XG4gICAgICAgIGNvbnN0IG9wdHM6IEZpbmRQYXRyb2xsZXJDb25maWcgPSB0aGlzLmNvbWJpbmVkX2NvbmZpZztcbiAgICAgICAgY29uc3QgbnVtYmVyID0gc2FuaXRpemVfcGhvbmVfbnVtYmVyKHJhd19udW1iZXIpO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHNoZWV0c19zZXJ2aWNlLnNwcmVhZHNoZWV0cy52YWx1ZXMuZ2V0KHtcbiAgICAgICAgICAgIHNwcmVhZHNoZWV0SWQ6IG9wdHMuU0hFRVRfSUQsXG4gICAgICAgICAgICByYW5nZTogb3B0cy5QSE9ORV9OVU1CRVJfTE9PS1VQX1NIRUVULFxuICAgICAgICAgICAgdmFsdWVSZW5kZXJPcHRpb246IFwiVU5GT1JNQVRURURfVkFMVUVcIixcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghcmVzcG9uc2UuZGF0YS52YWx1ZXMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBmaW5kIHBhdHJvbGxlci5cIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGF0cm9sbGVyID0gcmVzcG9uc2UuZGF0YS52YWx1ZXNcbiAgICAgICAgICAgIC5tYXAoKHJvdykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJhd051bWJlciA9XG4gICAgICAgICAgICAgICAgICAgIHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5QSE9ORV9OVU1CRVJfTlVNQkVSX0NPTFVNTildO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnROdW1iZXIgPVxuICAgICAgICAgICAgICAgICAgICByYXdOdW1iZXIgIT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHNhbml0aXplX3Bob25lX251bWJlcihyYXdOdW1iZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHJhd051bWJlcjtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50TmFtZSA9XG4gICAgICAgICAgICAgICAgICAgIHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5QSE9ORV9OVU1CRVJfTkFNRV9DT0xVTU4pXTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBuYW1lOiBjdXJyZW50TmFtZSwgbnVtYmVyOiBjdXJyZW50TnVtYmVyIH07XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmZpbHRlcigocGF0cm9sbGVyKSA9PiBwYXRyb2xsZXIubnVtYmVyID09PSBudW1iZXIpWzBdO1xuICAgICAgICByZXR1cm4gcGF0cm9sbGVyO1xuICAgIH1cbn1cbiIsImltcG9ydCBcIkB0d2lsaW8tbGFicy9zZXJ2ZXJsZXNzLXJ1bnRpbWUtdHlwZXNcIjtcbmltcG9ydCB7XG4gICAgQ29udGV4dCxcbiAgICBTZXJ2ZXJsZXNzQ2FsbGJhY2ssXG4gICAgU2VydmVybGVzc0V2ZW50T2JqZWN0LFxuICAgIFNlcnZlcmxlc3NGdW5jdGlvblNpZ25hdHVyZSxcbn0gZnJvbSBcIkB0d2lsaW8tbGFicy9zZXJ2ZXJsZXNzLXJ1bnRpbWUtdHlwZXMvdHlwZXNcIjtcbmltcG9ydCBCVk5TUENoZWNraW5IYW5kbGVyLCB7IEhhbmRsZXJFdmVudCB9IGZyb20gXCIuL2J2bnNwX2NoZWNraW5faGFuZGxlclwiO1xuaW1wb3J0IHsgSGFuZGxlckVudmlyb25tZW50IH0gZnJvbSBcIi4uL2Vudi9oYW5kbGVyX2NvbmZpZ1wiO1xuXG5jb25zdCBORVhUX1NURVBfQ09PS0lFX05BTUUgPSBcImJ2bnNwX2NoZWNraW5fbmV4dF9zdGVwXCI7XG5cbi8qKlxuICogVHdpbGlvIFNlcnZlcmxlc3MgZnVuY3Rpb24gaGFuZGxlciBmb3IgQlZOU1AgY2hlY2staW4uXG4gKiBAcGFyYW0ge0NvbnRleHQ8SGFuZGxlckVudmlyb25tZW50Pn0gY29udGV4dCAtIFRoZSBUd2lsaW8gc2VydmVybGVzcyBjb250ZXh0LlxuICogQHBhcmFtIHtTZXJ2ZXJsZXNzRXZlbnRPYmplY3Q8SGFuZGxlckV2ZW50Pn0gZXZlbnQgLSBUaGUgZXZlbnQgb2JqZWN0LlxuICogQHBhcmFtIHtTZXJ2ZXJsZXNzQ2FsbGJhY2t9IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgY29uc3QgaGFuZGxlcjogU2VydmVybGVzc0Z1bmN0aW9uU2lnbmF0dXJlPFxuICAgIEhhbmRsZXJFbnZpcm9ubWVudCxcbiAgICBIYW5kbGVyRXZlbnRcbj4gPSBhc3luYyBmdW5jdGlvbiAoXG4gICAgY29udGV4dDogQ29udGV4dDxIYW5kbGVyRW52aXJvbm1lbnQ+LFxuICAgIGV2ZW50OiBTZXJ2ZXJsZXNzRXZlbnRPYmplY3Q8SGFuZGxlckV2ZW50PixcbiAgICBjYWxsYmFjazogU2VydmVybGVzc0NhbGxiYWNrXG4pIHtcbiAgICBjb25zdCBoYW5kbGVyID0gbmV3IEJWTlNQQ2hlY2tpbkhhbmRsZXIoY29udGV4dCwgZXZlbnQpO1xuICAgIGxldCBtZXNzYWdlOiBzdHJpbmc7XG4gICAgbGV0IG5leHRfc3RlcDogc3RyaW5nID0gXCJcIjtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBoYW5kbGVyX3Jlc3BvbnNlID0gYXdhaXQgaGFuZGxlci5oYW5kbGUoKTtcbiAgICAgICAgbWVzc2FnZSA9XG4gICAgICAgICAgICBoYW5kbGVyX3Jlc3BvbnNlLnJlc3BvbnNlIHx8XG4gICAgICAgICAgICBcIlVuZXhwZWN0ZWQgcmVzdWx0IC0gbm8gcmVzcG9uc2UgZGV0ZXJtaW5lZFwiO1xuICAgICAgICBuZXh0X3N0ZXAgPSBoYW5kbGVyX3Jlc3BvbnNlLm5leHRfc3RlcCB8fCBcIlwiO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJBbiBlcnJvciBvY2N1cmVkXCIpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZSkpO1xuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICB9XG4gICAgICAgIG1lc3NhZ2UgPSBcIkFuIHVuZXhwZWN0ZWQgZXJyb3Igb2NjdXJlZC5cIjtcbiAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgbWVzc2FnZSArPSBcIlxcblwiICsgZS5tZXNzYWdlO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvclwiLCBlLnN0YWNrKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3JcIiwgZS5uYW1lKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3JcIiwgZS5tZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHJlc3BvbnNlID0gbmV3IFR3aWxpby5SZXNwb25zZSgpO1xuICAgIGNvbnN0IHR3aW1sID0gbmV3IFR3aWxpby50d2ltbC5NZXNzYWdpbmdSZXNwb25zZSgpO1xuXG4gICAgdHdpbWwubWVzc2FnZShtZXNzYWdlKTtcblxuICAgIHJlc3BvbnNlXG4gICAgICAgIC8vIEFkZCB0aGUgc3RyaW5naWZpZWQgVHdpTUwgdG8gdGhlIHJlc3BvbnNlIGJvZHlcbiAgICAgICAgLnNldEJvZHkodHdpbWwudG9TdHJpbmcoKSlcbiAgICAgICAgLy8gU2luY2Ugd2UncmUgcmV0dXJuaW5nIFR3aU1MLCB0aGUgY29udGVudCB0eXBlIG11c3QgYmUgWE1MXG4gICAgICAgIC5hcHBlbmRIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJ0ZXh0L3htbFwiKVxuICAgICAgICAuc2V0Q29va2llKE5FWFRfU1RFUF9DT09LSUVfTkFNRSwgbmV4dF9zdGVwKTtcblxuICAgIHJldHVybiBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7XG59OyIsImltcG9ydCB7IHNoZWV0c192NCB9IGZyb20gXCJnb29nbGVhcGlzXCI7XG5pbXBvcnQgeyBDb21wUGFzc2VzQ29uZmlnLCBNYW5hZ2VyUGFzc2VzQ29uZmlnIH0gZnJvbSBcIi4uL2Vudi9oYW5kbGVyX2NvbmZpZ1wiO1xuaW1wb3J0IHsgZXhjZWxfcm93X3RvX2luZGV4LCByb3dfY29sX3RvX2V4Y2VsX2luZGV4IH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxcIjtcbmltcG9ydCBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYiBmcm9tIFwiLi4vdXRpbHMvZ29vZ2xlX3NoZWV0c19zcHJlYWRzaGVldF90YWJcIjtcbmltcG9ydCB7IGZvcm1hdF9kYXRlX2Zvcl9zcHJlYWRzaGVldF92YWx1ZSB9IGZyb20gXCIuLi91dGlscy9kYXRldGltZV91dGlsXCI7XG5pbXBvcnQge1xuICAgIGJ1aWxkX3Bhc3Nlc19zdHJpbmcsXG4gICAgQ29tcFBhc3NUeXBlLFxuICAgIGdldF9jb21wX3Bhc3NfZGVzY3JpcHRpb24sXG59IGZyb20gXCIuLi91dGlscy9jb21wX3Bhc3Nlc1wiO1xuaW1wb3J0IHsgQlZOU1BDaGVja2luUmVzcG9uc2UgfSBmcm9tIFwiLi4vaGFuZGxlcnMvYnZuc3BfY2hlY2tpbl9oYW5kbGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBVc2VkQW5kQXZhaWxhYmxlUGFzc2VzIHtcbiAgICByb3c6IGFueVtdO1xuICAgIGluZGV4OiBudW1iZXI7XG4gICAgYXZhaWxhYmxlOiBudW1iZXI7XG4gICAgdXNlZF90b2RheTogbnVtYmVyO1xuICAgIHVzZWRfc2Vhc29uOiBudW1iZXI7XG4gICAgY29tcF9wYXNzX3R5cGU6IENvbXBQYXNzVHlwZTtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcm93OiBhbnlbXSxcbiAgICAgICAgaW5kZXg6IG51bWJlcixcbiAgICAgICAgYXZhaWxhYmxlOiBhbnksXG4gICAgICAgIHVzZWRfdG9kYXk6IGFueSxcbiAgICAgICAgdXNlZF9zZWFzb246IGFueSxcbiAgICAgICAgdHlwZTogQ29tcFBhc3NUeXBlXG4gICAgKSB7XG4gICAgICAgIHRoaXMucm93ID0gcm93O1xuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgICAgIHRoaXMuYXZhaWxhYmxlID0gTnVtYmVyKGF2YWlsYWJsZSk7XG4gICAgICAgIHRoaXMudXNlZF90b2RheSA9IE51bWJlcih1c2VkX3RvZGF5KTtcbiAgICAgICAgdGhpcy51c2VkX3NlYXNvbiA9IE51bWJlcih1c2VkX3NlYXNvbik7XG4gICAgICAgIHRoaXMuY29tcF9wYXNzX3R5cGUgPSB0eXBlO1xuICAgIH1cblxuICAgIGdldF9wcm9tcHQoKTogQlZOU1BDaGVja2luUmVzcG9uc2Uge1xuICAgICAgICBpZiAodGhpcy5hdmFpbGFibGUgPiAwKSB7XG4gICAgICAgICAgICBsZXQgcmVzcG9uc2U6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICAgICAgICAgICAgbGV0IHBhc3Nfc3RyaW5nOiBzdHJpbmcgPSBnZXRfY29tcF9wYXNzX2Rlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIHRoaXMuY29tcF9wYXNzX3R5cGVcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHJlc3BvbnNlID0gYnVpbGRfcGFzc2VzX3N0cmluZyhcbiAgICAgICAgICAgICAgICB0aGlzLnVzZWRfc2Vhc29uLFxuICAgICAgICAgICAgICAgIHRoaXMuYXZhaWxhYmxlICsgdGhpcy51c2VkX3NlYXNvbixcbiAgICAgICAgICAgICAgICB0aGlzLnVzZWRfdG9kYXksXG4gICAgICAgICAgICAgICAgYCR7cGFzc19zdHJpbmd9ZXNgLFxuICAgICAgICAgICAgICAgIHRydWVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXNwb25zZSArPVxuICAgICAgICAgICAgICAgIFwiXFxuXFxuXCIgK1xuICAgICAgICAgICAgICAgIGBFbnRlciB0aGUgZmlyc3QgYW5kIGxhc3QgbmFtZSBvZiB0aGUgZ3Vlc3QgdGhhdCB3aWxsIHVzZSBhICR7cGFzc19zdHJpbmd9IHRvZGF5IChvciAncmVzdGFydCcpOmA7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlOiByZXNwb25zZSxcbiAgICAgICAgICAgICAgICAgICAgbmV4dF9zdGVwOiBgYXdhaXQtcGFzcy0ke3RoaXMuY29tcF9wYXNzX3R5cGV9YCxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZTogYFlvdSBkbyBub3QgaGF2ZSBhbnkgJHtnZXRfY29tcF9wYXNzX2Rlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIHRoaXMuY29tcF9wYXNzX3R5cGVcbiAgICAgICAgICAgICl9IGF2YWlsYWJsZSB0b2RheWAsXG4gICAgICAgIH07XG4gICAgfVxufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUGFzc1NoZWV0IHtcbiAgICBzaGVldDogR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWI7XG4gICAgY29tcF9wYXNzX3R5cGU6IENvbXBQYXNzVHlwZTtcbiAgICBjb25zdHJ1Y3RvcihzaGVldDogR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIsIHR5cGU6IENvbXBQYXNzVHlwZSkge1xuICAgICAgICB0aGlzLnNoZWV0ID0gc2hlZXQ7XG4gICAgICAgIHRoaXMuY29tcF9wYXNzX3R5cGUgPSB0eXBlO1xuICAgIH1cblxuICAgIGFic3RyYWN0IGdldCBhdmFpbGFibGVfY29sdW1uKCk6IHN0cmluZztcbiAgICBhYnN0cmFjdCBnZXQgdXNlZF90b2RheV9jb2x1bW4oKTogc3RyaW5nO1xuICAgIGFic3RyYWN0IGdldCB1c2VkX3NlYXNvbl9jb2x1bW4oKTogc3RyaW5nO1xuICAgIGFic3RyYWN0IGdldCBuYW1lX2NvbHVtbigpOiBzdHJpbmc7XG4gICAgYWJzdHJhY3QgZ2V0IHN0YXJ0X2luZGV4KCk6IG51bWJlcjtcbiAgICBhYnN0cmFjdCBnZXQgc2hlZXRfbmFtZSgpOiBzdHJpbmc7XG5cbiAgICBhc3luYyBnZXRfYXZhaWxhYmxlX2FuZF91c2VkX3Bhc3NlcyhcbiAgICAgICAgcGF0cm9sbGVyX25hbWU6IHN0cmluZ1xuICAgICk6IFByb21pc2U8VXNlZEFuZEF2YWlsYWJsZVBhc3NlcyB8IG51bGw+IHtcbiAgICAgICAgY29uc3QgcGF0cm9sbGVyX3JvdyA9IGF3YWl0IHRoaXMuc2hlZXQuZ2V0X3NoZWV0X3Jvd19mb3JfcGF0cm9sbGVyKFxuICAgICAgICAgICAgcGF0cm9sbGVyX25hbWUsXG4gICAgICAgICAgICB0aGlzLm5hbWVfY29sdW1uXG4gICAgICAgICk7XG4gICAgICAgIGlmIChwYXRyb2xsZXJfcm93ID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfZGF5X2F2YWlsYWJsZV9wYXNzZXMgPVxuICAgICAgICAgICAgcGF0cm9sbGVyX3Jvdy5yb3dbZXhjZWxfcm93X3RvX2luZGV4KHRoaXMuYXZhaWxhYmxlX2NvbHVtbildO1xuICAgICAgICBjb25zdCBjdXJyZW50X2RheV91c2VkX3Bhc3NlcyA9XG4gICAgICAgICAgICBwYXRyb2xsZXJfcm93LnJvd1tleGNlbF9yb3dfdG9faW5kZXgodGhpcy51c2VkX3RvZGF5X2NvbHVtbildO1xuICAgICAgICBjb25zdCBjdXJyZW50X3NlYXNvbl91c2VkX3Bhc3NlcyA9XG4gICAgICAgICAgICBwYXRyb2xsZXJfcm93LnJvd1tleGNlbF9yb3dfdG9faW5kZXgodGhpcy51c2VkX3NlYXNvbl9jb2x1bW4pXTtcbiAgICAgICAgcmV0dXJuIG5ldyBVc2VkQW5kQXZhaWxhYmxlUGFzc2VzKFxuICAgICAgICAgICAgcGF0cm9sbGVyX3Jvdy5yb3csXG4gICAgICAgICAgICBwYXRyb2xsZXJfcm93LmluZGV4LFxuICAgICAgICAgICAgY3VycmVudF9kYXlfYXZhaWxhYmxlX3Bhc3NlcyxcbiAgICAgICAgICAgIGN1cnJlbnRfZGF5X3VzZWRfcGFzc2VzLFxuICAgICAgICAgICAgY3VycmVudF9zZWFzb25fdXNlZF9wYXNzZXMsXG4gICAgICAgICAgICB0aGlzLmNvbXBfcGFzc190eXBlXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgYXN5bmMgc2V0X3VzZWRfY29tcF9wYXNzZXMoXG4gICAgICAgIHBhdHJvbGxlcl9yb3c6IFVzZWRBbmRBdmFpbGFibGVQYXNzZXMsXG4gICAgICAgIGd1ZXN0X25hbWU6IHN0cmluZ1xuICAgICkge1xuICAgICAgICBpZiAocGF0cm9sbGVyX3Jvdy5hdmFpbGFibGUgPCAxKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgYE5vdCBlbm91Z2ggYXZhaWxhYmxlIHBhc3NlczogQXZhaWxhYmxlOiAke3BhdHJvbGxlcl9yb3cuYXZhaWxhYmxlfSwgVXNlZCB0aGlzIHNlYXNvbjogICR7cGF0cm9sbGVyX3Jvdy51c2VkX3NlYXNvbn0sIFVzZWQgdG9kYXk6ICR7cGF0cm9sbGVyX3Jvdy51c2VkX3RvZGF5fWBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgcm93bnVtID0gcGF0cm9sbGVyX3Jvdy5pbmRleDtcblxuICAgICAgICBjb25zdCBzdGFydF9pbmRleCA9IHRoaXMuc3RhcnRfaW5kZXg7XG4gICAgICAgIGNvbnN0IHByaW9yX2xlbmd0aCA9IHBhdHJvbGxlcl9yb3cucm93Lmxlbmd0aCAtIHN0YXJ0X2luZGV4O1xuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRfZGF0ZV9zdHJpbmcgPSBmb3JtYXRfZGF0ZV9mb3Jfc3ByZWFkc2hlZXRfdmFsdWUoXG4gICAgICAgICAgICBuZXcgRGF0ZSgpXG4gICAgICAgICk7XG4gICAgICAgIGxldCBuZXdfdmFscyA9IHBhdHJvbGxlcl9yb3cucm93XG4gICAgICAgICAgICAuc2xpY2Uoc3RhcnRfaW5kZXgpXG4gICAgICAgICAgICAubWFwKCh4KSA9PiB4Py50b1N0cmluZygpKTtcblxuICAgICAgICAvLyBBZGQgdGhlIGN1cnJlbnQgZGF0ZSBhcHBlbmRlZCB3aXRoIHRoZSBuZXcgZ3Vlc3QgbmFtZVxuICAgICAgICBuZXdfdmFscy5wdXNoKGN1cnJlbnRfZGF0ZV9zdHJpbmcgKyBcIixcIiArIGd1ZXN0X25hbWUpO1xuXG4gICAgICAgIGNvbnN0IHVwZGF0ZV9sZW5ndGggPSBNYXRoLm1heChwcmlvcl9sZW5ndGgsIG5ld192YWxzLmxlbmd0aCk7XG4gICAgICAgIHdoaWxlIChuZXdfdmFscy5sZW5ndGggPCB1cGRhdGVfbGVuZ3RoKSB7XG4gICAgICAgICAgICBuZXdfdmFscy5wdXNoKFwiXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGVuZF9pbmRleCA9IHN0YXJ0X2luZGV4ICsgdXBkYXRlX2xlbmd0aCAtIDE7XG5cbiAgICAgICAgY29uc3QgcmFuZ2UgPSBgJHt0aGlzLnNoZWV0LnNoZWV0X25hbWV9ISR7cm93X2NvbF90b19leGNlbF9pbmRleChcbiAgICAgICAgICAgIHJvd251bSxcbiAgICAgICAgICAgIHN0YXJ0X2luZGV4XG4gICAgICAgICl9OiR7cm93X2NvbF90b19leGNlbF9pbmRleChyb3dudW0sIGVuZF9pbmRleCl9YDtcbiAgICAgICAgY29uc29sZS5sb2coYFVwZGF0aW5nICR7cmFuZ2V9IHdpdGggJHtuZXdfdmFscy5sZW5ndGh9IHZhbHVlc2ApO1xuICAgICAgICBhd2FpdCB0aGlzLnNoZWV0LnVwZGF0ZV92YWx1ZXMocmFuZ2UsIFtuZXdfdmFsc10pO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIENvbXBQYXNzU2hlZXQgZXh0ZW5kcyBQYXNzU2hlZXQge1xuICAgIGNvbmZpZzogQ29tcFBhc3Nlc0NvbmZpZztcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgc2hlZXRzX3NlcnZpY2U6IHNoZWV0c192NC5TaGVldHMgfCBudWxsLFxuICAgICAgICBjb25maWc6IENvbXBQYXNzZXNDb25maWdcbiAgICApIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBuZXcgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIoXG4gICAgICAgICAgICAgICAgc2hlZXRzX3NlcnZpY2UsXG4gICAgICAgICAgICAgICAgY29uZmlnLlNIRUVUX0lELFxuICAgICAgICAgICAgICAgIGNvbmZpZy5DT01QX1BBU1NfU0hFRVRcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBDb21wUGFzc1R5cGUuQ29tcFBhc3NcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gICAgfVxuXG4gICAgZ2V0IHN0YXJ0X2luZGV4KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBleGNlbF9yb3dfdG9faW5kZXgoXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5DT01QX1BBU1NfU0hFRVRfREFURVNfU1RBUlRJTkdfQ09MVU1OXG4gICAgICAgICk7XG4gICAgfVxuICAgIGdldCBzaGVldF9uYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5DT01QX1BBU1NfU0hFRVQ7XG4gICAgfVxuICAgIGdldCBhdmFpbGFibGVfY29sdW1uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5DT01QX1BBU1NfU0hFRVRfREFURVNfQVZBSUxBQkxFX0NPTFVNTjtcbiAgICB9XG4gICAgZ2V0IHVzZWRfdG9kYXlfY29sdW1uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5DT01QX1BBU1NfU0hFRVRfVVNFRF9UT0RBWV9DT0xVTU47XG4gICAgfVxuICAgIGdldCB1c2VkX3NlYXNvbl9jb2x1bW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLkNPTVBfUEFTU19TSEVFVF9VU0VEX1NFQVNPTl9DT0xVTU47XG4gICAgfVxuICAgIGdldCBuYW1lX2NvbHVtbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuQ09NUF9QQVNTX1NIRUVUX05BTUVfQ09MVU1OO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIE1hbmFnZXJQYXNzU2hlZXQgZXh0ZW5kcyBQYXNzU2hlZXQge1xuICAgIGNvbmZpZzogTWFuYWdlclBhc3Nlc0NvbmZpZztcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgc2hlZXRzX3NlcnZpY2U6IHNoZWV0c192NC5TaGVldHMgfCBudWxsLFxuICAgICAgICBjb25maWc6IE1hbmFnZXJQYXNzZXNDb25maWdcbiAgICApIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBuZXcgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIoXG4gICAgICAgICAgICAgICAgc2hlZXRzX3NlcnZpY2UsXG4gICAgICAgICAgICAgICAgY29uZmlnLlNIRUVUX0lELFxuICAgICAgICAgICAgICAgIGNvbmZpZy5NQU5BR0VSX1BBU1NfU0hFRVRcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBDb21wUGFzc1R5cGUuTWFuYWdlclBhc3NcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gICAgfVxuXG4gICAgZ2V0IHN0YXJ0X2luZGV4KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBleGNlbF9yb3dfdG9faW5kZXgoXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5NQU5BR0VSX1BBU1NfU0hFRVRfREFURVNfU1RBUlRJTkdfQ09MVU1OXG4gICAgICAgICk7XG4gICAgfVxuICAgIGdldCBzaGVldF9uYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5NQU5BR0VSX1BBU1NfU0hFRVQ7XG4gICAgfVxuICAgIGdldCBhdmFpbGFibGVfY29sdW1uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5NQU5BR0VSX1BBU1NfU0hFRVRfQVZBSUxBQkxFX0NPTFVNTjtcbiAgICB9XG4gICAgZ2V0IHVzZWRfdG9kYXlfY29sdW1uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5NQU5BR0VSX1BBU1NfU0hFRVRfVVNFRF9UT0RBWV9DT0xVTU47XG4gICAgfVxuICAgIGdldCB1c2VkX3NlYXNvbl9jb2x1bW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLk1BTkFHRVJfUEFTU19TSEVFVF9VU0VEX1NFQVNPTl9DT0xVTU47XG4gICAgfVxuICAgIGdldCBuYW1lX2NvbHVtbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuTUFOQUdFUl9QQVNTX1NIRUVUX05BTUVfQ09MVU1OO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IGxvb2t1cF9yb3dfY29sX2luX3NoZWV0LCBleGNlbF9yb3dfdG9faW5kZXggfSBmcm9tIFwiLi4vdXRpbHMvdXRpbFwiO1xuaW1wb3J0IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiIGZyb20gXCIuLi91dGlscy9nb29nbGVfc2hlZXRzX3NwcmVhZHNoZWV0X3RhYlwiO1xuaW1wb3J0IHsgc2FuaXRpemVfZGF0ZSB9IGZyb20gXCIuLi91dGlscy9kYXRldGltZV91dGlsXCI7XG5pbXBvcnQgeyBMb2dpblNoZWV0Q29uZmlnLCBQYXRyb2xsZXJSb3dDb25maWcgfSBmcm9tIFwiLi4vZW52L2hhbmRsZXJfY29uZmlnXCI7XG5pbXBvcnQgeyBzaGVldHNfdjQgfSBmcm9tIFwiZ29vZ2xlYXBpc1wiO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSByb3cgb2YgcGF0cm9sbGVyIGRhdGEuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBQYXRyb2xsZXJSb3dcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBpbmRleCAtIFRoZSBpbmRleCBvZiB0aGUgcm93LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcGF0cm9sbGVyLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IGNhdGVnb3J5IC0gVGhlIGNhdGVnb3J5IG9mIHRoZSBwYXRyb2xsZXIuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gc2VjdGlvbiAtIFRoZSBzZWN0aW9uIG9mIHRoZSBwYXRyb2xsZXIuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gY2hlY2tpbiAtIFRoZSBjaGVjay1pbiBzdGF0dXMgb2YgdGhlIHBhdHJvbGxlci5cbiAqL1xuZXhwb3J0IHR5cGUgUGF0cm9sbGVyUm93ID0ge1xuICAgIGluZGV4OiBudW1iZXI7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGNhdGVnb3J5OiBzdHJpbmc7XG4gICAgc2VjdGlvbjogc3RyaW5nO1xuICAgIGNoZWNraW46IHN0cmluZztcbn07XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGEgbG9naW4gc2hlZXQgaW4gR29vZ2xlIFNoZWV0cy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9naW5TaGVldCB7XG4gICAgbG9naW5fc2hlZXQ6IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiO1xuICAgIGNoZWNraW5fY291bnRfc2hlZXQ6IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiO1xuICAgIGNvbmZpZzogTG9naW5TaGVldENvbmZpZztcbiAgICByb3dzPzogYW55W11bXSB8IG51bGwgPSBudWxsO1xuICAgIGNoZWNraW5fY291bnQ6IG51bWJlciB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgICBwYXRyb2xsZXJzOiBQYXRyb2xsZXJSb3dbXSA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBMb2dpblNoZWV0LlxuICAgICAqIEBwYXJhbSB7c2hlZXRzX3Y0LlNoZWV0cyB8IG51bGx9IHNoZWV0c19zZXJ2aWNlIC0gVGhlIEdvb2dsZSBTaGVldHMgQVBJIHNlcnZpY2UuXG4gICAgICogQHBhcmFtIHtMb2dpblNoZWV0Q29uZmlnfSBjb25maWcgLSBUaGUgY29uZmlndXJhdGlvbiBmb3IgdGhlIGxvZ2luIHNoZWV0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyB8IG51bGwsXG4gICAgICAgIGNvbmZpZzogTG9naW5TaGVldENvbmZpZ1xuICAgICkge1xuICAgICAgICB0aGlzLmxvZ2luX3NoZWV0ID0gbmV3IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiKFxuICAgICAgICAgICAgc2hlZXRzX3NlcnZpY2UsXG4gICAgICAgICAgICBjb25maWcuU0hFRVRfSUQsXG4gICAgICAgICAgICBjb25maWcuTE9HSU5fU0hFRVRfTE9PS1VQXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY2hlY2tpbl9jb3VudF9zaGVldCA9IG5ldyBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYihcbiAgICAgICAgICAgIHNoZWV0c19zZXJ2aWNlLFxuICAgICAgICAgICAgY29uZmlnLlNIRUVUX0lELFxuICAgICAgICAgICAgY29uZmlnLkNIRUNLSU5fQ09VTlRfTE9PS1VQXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZnJlc2hlcyB0aGUgZGF0YSBmcm9tIHRoZSBHb29nbGUgU2hlZXRzLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgICAqL1xuICAgIGFzeW5jIHJlZnJlc2goKSB7XG4gICAgICAgIHRoaXMucm93cyA9IGF3YWl0IHRoaXMubG9naW5fc2hlZXQuZ2V0X3ZhbHVlcyhcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLkxPR0lOX1NIRUVUX0xPT0tVUFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmNoZWNraW5fY291bnQgPSAoYXdhaXQgdGhpcy5jaGVja2luX2NvdW50X3NoZWV0LmdldF92YWx1ZXMoXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5DSEVDS0lOX0NPVU5UX0xPT0tVUFxuICAgICAgICApKSFbMF1bMF07XG4gICAgICAgIHRoaXMucGF0cm9sbGVycyA9IHRoaXMucm93cyEubWFwKCh4LCBpKSA9PlxuICAgICAgICAgICAgdGhpcy5wYXJzZV9wYXRyb2xsZXJfcm93KGksIHgsIHRoaXMuY29uZmlnKVxuICAgICAgICApLmZpbHRlcigoeCkgPT4geCAhPSBudWxsKSBhcyBQYXRyb2xsZXJSb3dbXTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIlJlZnJlc2hpbmcgUGF0cm9sbGVyczogXCIgKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnBhdHJvbGxlcnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGFyY2hpdmVkIHN0YXR1cyBvZiB0aGUgbG9naW4gc2hlZXQuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNoZWV0IGlzIGFyY2hpdmVkLCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICovXG4gICAgZ2V0IGFyY2hpdmVkKCkge1xuICAgICAgICBjb25zdCBhcmNoaXZlZCA9IGxvb2t1cF9yb3dfY29sX2luX3NoZWV0KFxuICAgICAgICAgICAgdGhpcy5jb25maWcuQVJDSElWRURfQ0VMTCxcbiAgICAgICAgICAgIHRoaXMucm93cyFcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIChhcmNoaXZlZCA9PT0gdW5kZWZpbmVkICYmIHRoaXMuY2hlY2tpbl9jb3VudCA9PT0gMCkgfHxcbiAgICAgICAgICAgIGFyY2hpdmVkLnRvTG93ZXJDYXNlKCkgPT09IFwieWVzXCJcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBkYXRlIG9mIHRoZSBzaGVldC5cbiAgICAgKiBAcmV0dXJucyB7RGF0ZX0gVGhlIGRhdGUgb2YgdGhlIHNoZWV0LlxuICAgICAqL1xuICAgIGdldCBzaGVldF9kYXRlKCkge1xuICAgICAgICByZXR1cm4gc2FuaXRpemVfZGF0ZShcbiAgICAgICAgICAgIGxvb2t1cF9yb3dfY29sX2luX3NoZWV0KHRoaXMuY29uZmlnLlNIRUVUX0RBVEVfQ0VMTCwgdGhpcy5yb3dzISlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBjdXJyZW50IGRhdGUuXG4gICAgICogQHJldHVybnMge0RhdGV9IFRoZSBjdXJyZW50IGRhdGUuXG4gICAgICovXG4gICAgZ2V0IGN1cnJlbnRfZGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHNhbml0aXplX2RhdGUoXG4gICAgICAgICAgICBsb29rdXBfcm93X2NvbF9pbl9zaGVldCh0aGlzLmNvbmZpZy5DVVJSRU5UX0RBVEVfQ0VMTCwgdGhpcy5yb3dzISlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdGhlIHNoZWV0IGRhdGUgaXMgdGhlIGN1cnJlbnQgZGF0ZS5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc2hlZXQgZGF0ZSBpcyB0aGUgY3VycmVudCBkYXRlLCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICovXG4gICAgZ2V0IGlzX2N1cnJlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNoZWV0X2RhdGUuZ2V0VGltZSgpID09PSB0aGlzLmN1cnJlbnRfZGF0ZS5nZXRUaW1lKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZXMgdG8gZmluZCBhIHBhdHJvbGxlciBieSBuYW1lLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHBhdHJvbGxlci5cbiAgICAgKiBAcmV0dXJucyB7UGF0cm9sbGVyUm93IHwgXCJub3RfZm91bmRcIn0gVGhlIHBhdHJvbGxlciByb3cgb3IgXCJub3RfZm91bmRcIi5cbiAgICAgKi9cbiAgICB0cnlfZmluZF9wYXRyb2xsZXIobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHBhdHJvbGxlcnMgPSB0aGlzLnBhdHJvbGxlcnMuZmlsdGVyKCh4KSA9PiB4Lm5hbWUgPT09IG5hbWUpO1xuICAgICAgICBpZiAocGF0cm9sbGVycy5sZW5ndGggIT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBcIm5vdF9mb3VuZFwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXRyb2xsZXJzWzBdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZpbmRzIGEgcGF0cm9sbGVyIGJ5IG5hbWUuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcGF0cm9sbGVyLlxuICAgICAqIEByZXR1cm5zIHtQYXRyb2xsZXJSb3d9IFRoZSBwYXRyb2xsZXIgcm93LlxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGF0cm9sbGVyIGlzIG5vdCBmb3VuZC5cbiAgICAgKi9cbiAgICBmaW5kX3BhdHJvbGxlcihuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy50cnlfZmluZF9wYXRyb2xsZXIobmFtZSk7XG4gICAgICAgIGlmIChyZXN1bHQgPT09IFwibm90X2ZvdW5kXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgJHtuYW1lfSBpbiBsb2dpbiBzaGVldGApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcGF0cm9sbGVycyB3aG8gYXJlIG9uIGR1dHkuXG4gICAgICogQHJldHVybnMge1BhdHJvbGxlclJvd1tdfSBUaGUgbGlzdCBvZiBvbi1kdXR5IHBhdHJvbGxlcnMuXG4gICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBsb2dpbiBzaGVldCBpcyBub3QgY3VycmVudC5cbiAgICAgKi9cbiAgICBnZXRfb25fZHV0eV9wYXRyb2xsZXJzKCk6IFBhdHJvbGxlclJvd1tdIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzX2N1cnJlbnQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxvZ2luIHNoZWV0IGlzIG5vdCBjdXJyZW50XCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnBhdHJvbGxlcnMuZmlsdGVyKCh4KSA9PiB4LmNoZWNraW4pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpbiBhIHBhdHJvbGxlciB3aXRoIGEgbmV3IGNoZWNrLWluIHZhbHVlLlxuICAgICAqIEBwYXJhbSB7UGF0cm9sbGVyUm93fSBwYXRyb2xsZXJfc3RhdHVzIC0gVGhlIHN0YXR1cyBvZiB0aGUgcGF0cm9sbGVyLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuZXdfY2hlY2tpbl92YWx1ZSAtIFRoZSBuZXcgY2hlY2staW4gdmFsdWUuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBsb2dpbiBzaGVldCBpcyBub3QgY3VycmVudC5cbiAgICAgKi9cbiAgICBhc3luYyBjaGVja2luKHBhdHJvbGxlcl9zdGF0dXM6IFBhdHJvbGxlclJvdywgbmV3X2NoZWNraW5fdmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAoIXRoaXMuaXNfY3VycmVudCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTG9naW4gc2hlZXQgaXMgbm90IGN1cnJlbnRcIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coYEV4aXN0aW5nIHN0YXR1czogJHtKU09OLnN0cmluZ2lmeShwYXRyb2xsZXJfc3RhdHVzKX1gKTtcblxuICAgICAgICBjb25zdCByb3cgPSBwYXRyb2xsZXJfc3RhdHVzLmluZGV4ICsgMTsgLy8gcHJvZ3JhbW1pbmcgLT4gZXhjZWwgbG9va3VwXG4gICAgICAgIGNvbnN0IHJhbmdlID0gYCR7dGhpcy5jb25maWcuQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU59JHtyb3d9YDtcblxuICAgICAgICBhd2FpdCB0aGlzLmxvZ2luX3NoZWV0LnVwZGF0ZV92YWx1ZXMocmFuZ2UsIFtbbmV3X2NoZWNraW5fdmFsdWVdXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBBc3NpZ25zIGEgc2VjdGlvbiB0byBhIHBhdHJvbGxlci5cbiAgICAqIEBwYXJhbSB7UGF0cm9sbGVyUm93fSBwYXRyb2xsZXIgLSBUaGUgcGF0cm9sbGVyIHRvIGFzc2lnbiB0aGUgc2VjdGlvbiB0by5cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBuZXdfc2VjdGlvbl92YWx1ZSAtIFRoZSBuZXcgc2VjdGlvbiB2YWx1ZS5cbiAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBsb2dpbiBzaGVldCBpcyBub3QgY3VycmVudC5cbiAgICAqL1xuICAgIGFzeW5jIGFzc2lnbl9zZWN0aW9uKHBhdHJvbGxlcl9zZWN0aW9uOiBQYXRyb2xsZXJSb3csIG5ld19zZWN0aW9uX3ZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzX2N1cnJlbnQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxvZ2luIHNoZWV0IGlzIG5vdCBjdXJyZW50XCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGBFeGlzdGluZyBzdGF0dXM6ICR7SlNPTi5zdHJpbmdpZnkocGF0cm9sbGVyX3NlY3Rpb24pfWApO1xuXG4gICAgICAgIGNvbnN0IHJvdyA9IHBhdHJvbGxlcl9zZWN0aW9uLmluZGV4ICsgMTsgLy8gcHJvZ3JhbW1pbmcgLT4gZXhjZWwgbG9va3VwXG4gICAgICAgIGNvbnN0IHJhbmdlID0gYCR7dGhpcy5jb25maWcuU0VDVElPTl9EUk9QRE9XTl9DT0xVTU59JHtyb3d9YDtcblxuICAgICAgICBhd2FpdCB0aGlzLmxvZ2luX3NoZWV0LnVwZGF0ZV92YWx1ZXMocmFuZ2UsIFtbbmV3X3NlY3Rpb25fdmFsdWVdXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIGEgcm93IG9mIHBhdHJvbGxlciBkYXRhLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIFRoZSBpbmRleCBvZiB0aGUgcm93LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IHJvdyAtIFRoZSByb3cgZGF0YS5cbiAgICAgKiBAcGFyYW0ge1BhdHJvbGxlclJvd0NvbmZpZ30gb3B0cyAtIFRoZSBjb25maWd1cmF0aW9uIG9wdGlvbnMgZm9yIHRoZSBwYXRyb2xsZXIgcm93LlxuICAgICAqIEByZXR1cm5zIHtQYXRyb2xsZXJSb3cgfCBudWxsfSBUaGUgcGFyc2VkIHBhdHJvbGxlciByb3cgb3IgbnVsbCBpZiBpbnZhbGlkLlxuICAgICAqL1xuICAgIHByaXZhdGUgcGFyc2VfcGF0cm9sbGVyX3JvdyhcbiAgICAgICAgaW5kZXg6IG51bWJlcixcbiAgICAgICAgcm93OiBzdHJpbmdbXSxcbiAgICAgICAgb3B0czogUGF0cm9sbGVyUm93Q29uZmlnXG4gICAgKTogUGF0cm9sbGVyUm93IHwgbnVsbCB7XG4gICAgICAgIGlmIChyb3cubGVuZ3RoIDwgNCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluZGV4IDwgMyl7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgbmFtZTogcm93W2V4Y2VsX3Jvd190b19pbmRleChvcHRzLk5BTUVfQ09MVU1OKV0sXG4gICAgICAgICAgICBjYXRlZ29yeTogcm93W2V4Y2VsX3Jvd190b19pbmRleChvcHRzLkNBVEVHT1JZX0NPTFVNTildLFxuICAgICAgICAgICAgc2VjdGlvbjogcm93W2V4Y2VsX3Jvd190b19pbmRleChvcHRzLlNFQ1RJT05fRFJPUERPV05fQ09MVU1OKV0sXG4gICAgICAgICAgICBjaGVja2luOiByb3dbZXhjZWxfcm93X3RvX2luZGV4KG9wdHMuQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU4pXSxcbiAgICAgICAgfTtcbiAgICB9XG59IiwiaW1wb3J0IHsgc2hlZXRzX3Y0IH0gZnJvbSBcImdvb2dsZWFwaXNcIjtcbmltcG9ydCB7XG4gICAgU2Vhc29uU2hlZXRDb25maWcsXG59IGZyb20gXCIuLi9lbnYvaGFuZGxlcl9jb25maWdcIjtcbmltcG9ydCB7IGV4Y2VsX3Jvd190b19pbmRleCB9IGZyb20gXCIuLi91dGlscy91dGlsXCI7XG5pbXBvcnQgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIgZnJvbSBcIi4uL3V0aWxzL2dvb2dsZV9zaGVldHNfc3ByZWFkc2hlZXRfdGFiXCI7XG5pbXBvcnQgeyBmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9jdXJyZW50X2RheSB9IGZyb20gXCIuLi91dGlscy9kYXRldGltZV91dGlsXCI7XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGEgc2Vhc29uIHNoZWV0IGluIEdvb2dsZSBTaGVldHMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXNvblNoZWV0IHtcbiAgICBzaGVldDogR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWI7XG4gICAgY29uZmlnOiBTZWFzb25TaGVldENvbmZpZztcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgU2Vhc29uU2hlZXQuXG4gICAgICogQHBhcmFtIHtzaGVldHNfdjQuU2hlZXRzIHwgbnVsbH0gc2hlZXRzX3NlcnZpY2UgLSBUaGUgR29vZ2xlIFNoZWV0cyBBUEkgc2VydmljZS5cbiAgICAgKiBAcGFyYW0ge1NlYXNvblNoZWV0Q29uZmlnfSBjb25maWcgLSBUaGUgY29uZmlndXJhdGlvbiBmb3IgdGhlIHNlYXNvbiBzaGVldC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgc2hlZXRzX3NlcnZpY2U6IHNoZWV0c192NC5TaGVldHMgfCBudWxsLFxuICAgICAgICBjb25maWc6IFNlYXNvblNoZWV0Q29uZmlnXG4gICAgKSB7XG4gICAgICAgIHRoaXMuc2hlZXQgPSBuZXcgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIoXG4gICAgICAgICAgICBzaGVldHNfc2VydmljZSxcbiAgICAgICAgICAgIGNvbmZpZy5TSEVFVF9JRCxcbiAgICAgICAgICAgIGNvbmZpZy5TRUFTT05fU0hFRVRcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbnVtYmVyIG9mIGRheXMgcGF0cm9sbGVkIGJ5IGEgcGF0cm9sbGVyLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRyb2xsZXJfbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwYXRyb2xsZXIuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8bnVtYmVyPn0gVGhlIG51bWJlciBvZiBkYXlzIHBhdHJvbGxlZC5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfcGF0cm9sbGVkX2RheXMoXG4gICAgICAgIHBhdHJvbGxlcl9uYW1lOiBzdHJpbmdcbiAgICApOiBQcm9taXNlPG51bWJlcj4ge1xuICAgICAgICBjb25zdCBwYXRyb2xsZXJfcm93ID0gYXdhaXQgdGhpcy5zaGVldC5nZXRfc2hlZXRfcm93X2Zvcl9wYXRyb2xsZXIoXG4gICAgICAgICAgICBwYXRyb2xsZXJfbmFtZSxcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLlNFQVNPTl9TSEVFVF9OQU1FX0NPTFVNTlxuICAgICAgICApO1xuXG4gICAgICAgIGlmICghcGF0cm9sbGVyX3Jvdykge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY3VycmVudE51bWJlciA9XG4gICAgICAgICAgICBwYXRyb2xsZXJfcm93LnJvd1tleGNlbF9yb3dfdG9faW5kZXgodGhpcy5jb25maWcuU0VBU09OX1NIRUVUX0RBWVNfQ09MVU1OKV07XG5cbiAgICAgICAgY29uc3QgY3VycmVudERheSA9IGZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2N1cnJlbnRfZGF5KHBhdHJvbGxlcl9yb3cucm93KVxuICAgICAgICAgICAgLm1hcCgoeCkgPT4gKHg/LnN0YXJ0c1dpdGgoXCJIXCIpID8gMC41IDogMSkpXG4gICAgICAgICAgICAucmVkdWNlKCh4LCB5LCBpKSA9PiB4ICsgeSwgMCk7XG5cbiAgICAgICAgY29uc3QgZGF5c0JlZm9yZVRvZGF5ID0gY3VycmVudE51bWJlciAtIGN1cnJlbnREYXk7XG4gICAgICAgIHJldHVybiBkYXlzQmVmb3JlVG9kYXk7XG4gICAgfVxufSIsImltcG9ydCB7IGdvb2dsZSB9IGZyb20gXCJnb29nbGVhcGlzXCI7XG5pbXBvcnQgeyBHZW5lcmF0ZUF1dGhVcmxPcHRzIH0gZnJvbSBcImdvb2dsZS1hdXRoLWxpYnJhcnlcIjtcbmltcG9ydCB7IE9BdXRoMkNsaWVudCB9IGZyb20gXCJnb29nbGVhcGlzLWNvbW1vblwiO1xuaW1wb3J0IHsgc2FuaXRpemVfcGhvbmVfbnVtYmVyIH0gZnJvbSBcIi4vdXRpbHMvdXRpbFwiO1xuaW1wb3J0IHsgbG9hZF9jcmVkZW50aWFsc19maWxlcyB9IGZyb20gXCIuL3V0aWxzL2ZpbGVfdXRpbHNcIjtcbmltcG9ydCB7IFNlcnZpY2VDb250ZXh0IH0gZnJvbSBcIkB0d2lsaW8tbGFicy9zZXJ2ZXJsZXNzLXJ1bnRpbWUtdHlwZXMvdHlwZXNcIjtcbmltcG9ydCB7IFVzZXJDcmVkc0NvbmZpZyB9IGZyb20gXCIuL2Vudi9oYW5kbGVyX2NvbmZpZ1wiO1xuaW1wb3J0IHsgdmFsaWRhdGVfc2NvcGVzIH0gZnJvbSBcIi4vdXRpbHMvc2NvcGVfdXRpbFwiO1xuXG5jb25zdCBTQ09QRVMgPSBbXG4gICAgXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3NjcmlwdC5wcm9qZWN0c1wiLFxuICAgIFwiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9zcHJlYWRzaGVldHNcIixcbl07XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIHVzZXIgY3JlZGVudGlhbHMgZm9yIEdvb2dsZSBPQXV0aDIuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXJDcmVkcyB7XG4gICAgbnVtYmVyOiBzdHJpbmc7XG4gICAgb2F1dGgyX2NsaWVudDogT0F1dGgyQ2xpZW50O1xuICAgIHN5bmNfY2xpZW50OiBTZXJ2aWNlQ29udGV4dDtcbiAgICBkb21haW4/OiBzdHJpbmc7XG4gICAgbG9hZGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBVc2VyQ3JlZHMgaW5zdGFuY2UuXG4gICAgICogQHBhcmFtIHtTZXJ2aWNlQ29udGV4dH0gc3luY19jbGllbnQgLSBUaGUgVHdpbGlvIFN5bmMgY2xpZW50LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgdW5kZWZpbmVkfSBudW1iZXIgLSBUaGUgdXNlcidzIHBob25lIG51bWJlci5cbiAgICAgKiBAcGFyYW0ge1VzZXJDcmVkc0NvbmZpZ30gb3B0cyAtIFRoZSB1c2VyIGNyZWRlbnRpYWxzIGNvbmZpZ3VyYXRpb24uXG4gICAgICogQHRocm93cyB7RXJyb3J9IFRocm93cyBhbiBlcnJvciBpZiB0aGUgbnVtYmVyIGlzIHVuZGVmaW5lZCBvciBudWxsLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBzeW5jX2NsaWVudDogU2VydmljZUNvbnRleHQsXG4gICAgICAgIG51bWJlcjogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgICAgICBvcHRzOiBVc2VyQ3JlZHNDb25maWdcbiAgICApIHtcbiAgICAgICAgaWYgKG51bWJlciA9PT0gdW5kZWZpbmVkIHx8IG51bWJlciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTnVtYmVyIGlzIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm51bWJlciA9IHNhbml0aXplX3Bob25lX251bWJlcihudW1iZXIpO1xuXG4gICAgICAgIGNvbnN0IGNyZWRlbnRpYWxzID0gbG9hZF9jcmVkZW50aWFsc19maWxlcygpO1xuICAgICAgICBjb25zdCB7IGNsaWVudF9zZWNyZXQsIGNsaWVudF9pZCwgcmVkaXJlY3RfdXJpcyB9ID0gY3JlZGVudGlhbHMud2ViO1xuICAgICAgICB0aGlzLm9hdXRoMl9jbGllbnQgPSBuZXcgZ29vZ2xlLmF1dGguT0F1dGgyKFxuICAgICAgICAgICAgY2xpZW50X2lkLFxuICAgICAgICAgICAgY2xpZW50X3NlY3JldCxcbiAgICAgICAgICAgIHJlZGlyZWN0X3VyaXNbMF1cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zeW5jX2NsaWVudCA9IHN5bmNfY2xpZW50O1xuICAgICAgICBsZXQgZG9tYWluID0gb3B0cy5OU1BfRU1BSUxfRE9NQUlOO1xuICAgICAgICBpZiAoZG9tYWluID09PSB1bmRlZmluZWQgfHwgZG9tYWluID09PSBudWxsIHx8IGRvbWFpbiA9PT0gXCJcIikge1xuICAgICAgICAgICAgZG9tYWluID0gdW5kZWZpbmVkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kb21haW4gPSBkb21haW47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2FkIHRoZSBPQXV0aDIgdG9rZW4uXG4gICAgICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgYm9vbGVhbiBpbmRpY2F0aW5nIGlmIHRoZSB0b2tlbiB3YXMgbG9hZGVkLlxuICAgICAqL1xuICAgIGFzeW5jIGxvYWRUb2tlbigpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgaWYgKCF0aGlzLmxvYWRlZCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgTG9va2luZyBmb3IgJHt0aGlzLnRva2VuX2tleX1gKTtcbiAgICAgICAgICAgICAgICBjb25zdCBvYXV0aDJEb2MgPSBhd2FpdCB0aGlzLnN5bmNfY2xpZW50XG4gICAgICAgICAgICAgICAgICAgIC5kb2N1bWVudHModGhpcy50b2tlbl9rZXkpXG4gICAgICAgICAgICAgICAgICAgIC5mZXRjaCgpO1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgb2F1dGgyRG9jID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICAgICAgb2F1dGgyRG9jLmRhdGEgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgICAgIG9hdXRoMkRvYy5kYXRhLnRva2VuID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYERpZG4ndCBmaW5kICR7dGhpcy50b2tlbl9rZXl9YCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBvYXV0aDJEb2MuZGF0YS50b2tlbjtcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGVfc2NvcGVzKG9hdXRoMkRvYy5kYXRhLnNjb3BlcywgU0NPUEVTKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vYXV0aDJfY2xpZW50LnNldENyZWRlbnRpYWxzKHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYExvYWRlZCB0b2tlbiAke3RoaXMudG9rZW5fa2V5fWApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgICAgICBgRmFpbGVkIHRvIGxvYWQgdG9rZW4gZm9yICR7dGhpcy50b2tlbl9rZXl9LlxcbiAke2V9YFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZGVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdG9rZW4ga2V5LlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSB0b2tlbiBrZXkuXG4gICAgICovXG4gICAgZ2V0IHRva2VuX2tleSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYG9hdXRoMl8ke3RoaXMubnVtYmVyfWA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVsZXRlIHRoZSBPQXV0aDIgdG9rZW4uXG4gICAgICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgYm9vbGVhbiBpbmRpY2F0aW5nIGlmIHRoZSB0b2tlbiB3YXMgZGVsZXRlZC5cbiAgICAgKi9cbiAgICBhc3luYyBkZWxldGVUb2tlbigpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgY29uc3Qgb2F1dGgyRG9jID0gYXdhaXQgdGhpcy5zeW5jX2NsaWVudFxuICAgICAgICAgICAgLmRvY3VtZW50cyh0aGlzLnRva2VuX2tleSlcbiAgICAgICAgICAgIC5mZXRjaCgpO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICBvYXV0aDJEb2MgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgb2F1dGgyRG9jLmRhdGEgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICBvYXV0aDJEb2MuZGF0YS50b2tlbiA9PT0gdW5kZWZpbmVkXG4gICAgICAgICkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYERpZG4ndCBmaW5kICR7dGhpcy50b2tlbl9rZXl9YCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgdGhpcy5zeW5jX2NsaWVudC5kb2N1bWVudHMob2F1dGgyRG9jLnNpZCkucmVtb3ZlKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBEZWxldGVkIHRva2VuICR7dGhpcy50b2tlbl9rZXl9YCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbXBsZXRlIHRoZSBsb2dpbiBwcm9jZXNzIGJ5IGV4Y2hhbmdpbmcgdGhlIGF1dGhvcml6YXRpb24gY29kZSBmb3IgYSB0b2tlbi5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29kZSAtIFRoZSBhdXRob3JpemF0aW9uIGNvZGUuXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gc2NvcGVzIC0gVGhlIHNjb3BlcyB0byB2YWxpZGF0ZS5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgbG9naW4gcHJvY2VzcyBpcyBjb21wbGV0ZS5cbiAgICAgKi9cbiAgICBhc3luYyBjb21wbGV0ZUxvZ2luKGNvZGU6IHN0cmluZywgc2NvcGVzOiBzdHJpbmdbXSk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICB2YWxpZGF0ZV9zY29wZXMoc2NvcGVzLCBTQ09QRVMpO1xuICAgICAgICBjb25zdCB0b2tlbiA9IGF3YWl0IHRoaXMub2F1dGgyX2NsaWVudC5nZXRUb2tlbihjb2RlKTtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoT2JqZWN0LmtleXModG9rZW4ucmVzISkpKTtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodG9rZW4udG9rZW5zKSk7XG4gICAgICAgIHRoaXMub2F1dGgyX2NsaWVudC5zZXRDcmVkZW50aWFscyh0b2tlbi50b2tlbnMpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3Qgb2F1dGhEb2MgPSBhd2FpdCB0aGlzLnN5bmNfY2xpZW50LmRvY3VtZW50cy5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6IHsgdG9rZW46IHRva2VuLnRva2Vucywgc2NvcGVzOiBzY29wZXMgfSxcbiAgICAgICAgICAgICAgICB1bmlxdWVOYW1lOiB0aGlzLnRva2VuX2tleSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICBgRXhjZXB0aW9uIHdoZW4gY3JlYXRpbmcgb2F1dGguIFRyeWluZyB0byB1cGRhdGUgaW5zdGVhZC4uLlxcbiR7ZX1gXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29uc3Qgb2F1dGhEb2MgPSBhd2FpdCB0aGlzLnN5bmNfY2xpZW50XG4gICAgICAgICAgICAgICAgLmRvY3VtZW50cyh0aGlzLnRva2VuX2tleSlcbiAgICAgICAgICAgICAgICAudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogeyB0b2tlbjogdG9rZW4sIHNjb3Blczogc2NvcGVzIH0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGF1dGhvcml6YXRpb24gVVJMLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHN0cmluZz59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSBhdXRob3JpemF0aW9uIFVSTC5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRBdXRoVXJsKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIGNvbnN0IGlkID0gdGhpcy5nZW5lcmF0ZVJhbmRvbVN0cmluZygpO1xuICAgICAgICBjb25zb2xlLmxvZyhgVXNpbmcgbm9uY2UgJHtpZH0gZm9yICR7dGhpcy5udW1iZXJ9YCk7XG4gICAgICAgIGNvbnN0IGRvYyA9IGF3YWl0IHRoaXMuc3luY19jbGllbnQuZG9jdW1lbnRzLmNyZWF0ZSh7XG4gICAgICAgICAgICBkYXRhOiB7IG51bWJlcjogdGhpcy5udW1iZXIsIHNjb3BlczogU0NPUEVTIH0sXG4gICAgICAgICAgICB1bmlxdWVOYW1lOiBpZCxcbiAgICAgICAgICAgIHR0bDogNjAgKiA1LCAvLyA1IG1pbnV0ZXNcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBNYWRlIG5vbmNlLWRvYzogJHtKU09OLnN0cmluZ2lmeShkb2MpfWApO1xuXG4gICAgICAgIGNvbnN0IG9wdHM6IEdlbmVyYXRlQXV0aFVybE9wdHMgPSB7XG4gICAgICAgICAgICBhY2Nlc3NfdHlwZTogXCJvZmZsaW5lXCIsXG4gICAgICAgICAgICBzY29wZTogU0NPUEVTLFxuICAgICAgICAgICAgc3RhdGU6IGlkLFxuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5kb21haW4pIHtcbiAgICAgICAgICAgIG9wdHNbXCJoZFwiXSA9IHRoaXMuZG9tYWluO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYXV0aFVybCA9IHRoaXMub2F1dGgyX2NsaWVudC5nZW5lcmF0ZUF1dGhVcmwob3B0cyk7XG4gICAgICAgIHJldHVybiBhdXRoVXJsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlIGEgcmFuZG9tIHN0cmluZy5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBBIHJhbmRvbSBzdHJpbmcuXG4gICAgICovXG4gICAgZ2VuZXJhdGVSYW5kb21TdHJpbmcoKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gMzA7XG4gICAgICAgIGxldCByZXN1bHQgPSBcIlwiO1xuICAgICAgICBjb25zdCBjaGFyYWN0ZXJzID1cbiAgICAgICAgICAgIFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODlcIjtcbiAgICAgICAgY29uc3QgY2hhcmFjdGVyc0xlbmd0aCA9IGNoYXJhY3RlcnMubGVuZ3RoO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gY2hhcmFjdGVycy5jaGFyQXQoXG4gICAgICAgICAgICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hhcmFjdGVyc0xlbmd0aClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5cbi8qKlxuICogSW50ZXJmYWNlIHJlcHJlc2VudGluZyB0aGUgdXNlciBjcmVkZW50aWFscyBjb25maWd1cmF0aW9uLlxuICovXG5leHBvcnQgeyBVc2VyQ3JlZHMsIFNDT1BFUyBhcyBVc2VyQ3JlZHNTY29wZXMgfTtcbiIsIi8qKlxuICogUmVwcmVzZW50cyBhIGNoZWNrLWluIHZhbHVlIHdpdGggdmFyaW91cyBwcm9wZXJ0aWVzIGFuZCBsb29rdXAgdmFsdWVzLlxuICovXG5jbGFzcyBDaGVja2luVmFsdWUge1xuICAgIGtleTogc3RyaW5nO1xuICAgIHNoZWV0c192YWx1ZTogc3RyaW5nO1xuICAgIHNtc19kZXNjOiBzdHJpbmc7XG4gICAgZmFzdF9jaGVja2luczogc3RyaW5nW107XG4gICAgbG9va3VwX3ZhbHVlczogU2V0PHN0cmluZz47XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIENoZWNraW5WYWx1ZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gVGhlIGtleSBmb3IgdGhlIGNoZWNrLWluIHZhbHVlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaGVldHNfdmFsdWUgLSBUaGUgdmFsdWUgdXNlZCBpbiBzaGVldHMuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNtc19kZXNjIC0gVGhlIGRlc2NyaXB0aW9uIHVzZWQgaW4gU01TLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgc3RyaW5nW119IGZhc3RfY2hlY2tpbnMgLSBUaGUgZmFzdCBjaGVjay1pbiB2YWx1ZXMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGtleTogc3RyaW5nLFxuICAgICAgICBzaGVldHNfdmFsdWU6IHN0cmluZyxcbiAgICAgICAgc21zX2Rlc2M6IHN0cmluZyxcbiAgICAgICAgZmFzdF9jaGVja2luczogc3RyaW5nIHwgc3RyaW5nW11cbiAgICApIHtcbiAgICAgICAgaWYgKCEoZmFzdF9jaGVja2lucyBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgICAgICAgZmFzdF9jaGVja2lucyA9IFtmYXN0X2NoZWNraW5zXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmtleSA9IGtleTtcbiAgICAgICAgdGhpcy5zaGVldHNfdmFsdWUgPSBzaGVldHNfdmFsdWU7XG4gICAgICAgIHRoaXMuc21zX2Rlc2MgPSBzbXNfZGVzYztcbiAgICAgICAgdGhpcy5mYXN0X2NoZWNraW5zID0gZmFzdF9jaGVja2lucy5tYXAoKHgpID0+IHgudHJpbSgpLnRvTG93ZXJDYXNlKCkpO1xuXG4gICAgICAgIGNvbnN0IHNtc19kZXNjX3NwbGl0OiBzdHJpbmdbXSA9IHNtc19kZXNjXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxzKy8sIFwiLVwiKVxuICAgICAgICAgICAgLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgIC5zcGxpdChcIi9cIik7XG4gICAgICAgIGNvbnN0IGxvb2t1cF92YWxzID0gWy4uLnRoaXMuZmFzdF9jaGVja2lucywgLi4uc21zX2Rlc2Nfc3BsaXRdO1xuICAgICAgICB0aGlzLmxvb2t1cF92YWx1ZXMgPSBuZXcgU2V0PHN0cmluZz4obG9va3VwX3ZhbHMpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgY29sbGVjdGlvbiBvZiBjaGVjay1pbiB2YWx1ZXMgd2l0aCB2YXJpb3VzIGxvb2t1cCBtZXRob2RzLlxuICovXG5jbGFzcyBDaGVja2luVmFsdWVzIHtcbiAgICBieV9rZXk6IHsgW2tleTogc3RyaW5nXTogQ2hlY2tpblZhbHVlIH0gPSB7fTtcbiAgICBieV9sdjogeyBba2V5OiBzdHJpbmddOiBDaGVja2luVmFsdWUgfSA9IHt9O1xuICAgIGJ5X2ZjOiB7IFtrZXk6IHN0cmluZ106IENoZWNraW5WYWx1ZSB9ID0ge307XG4gICAgYnlfc2hlZXRfc3RyaW5nOiB7IFtrZXk6IHN0cmluZ106IENoZWNraW5WYWx1ZSB9ID0ge307XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIENoZWNraW5WYWx1ZXMuXG4gICAgICogQHBhcmFtIHtDaGVja2luVmFsdWVbXX0gY2hlY2tpblZhbHVlcyAtIFRoZSBhcnJheSBvZiBjaGVjay1pbiB2YWx1ZXMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY2hlY2tpblZhbHVlczogQ2hlY2tpblZhbHVlW10pIHtcbiAgICAgICAgZm9yICh2YXIgY2hlY2tpblZhbHVlIG9mIGNoZWNraW5WYWx1ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuYnlfa2V5W2NoZWNraW5WYWx1ZS5rZXldID0gY2hlY2tpblZhbHVlO1xuICAgICAgICAgICAgdGhpcy5ieV9zaGVldF9zdHJpbmdbY2hlY2tpblZhbHVlLnNoZWV0c192YWx1ZV0gPSBjaGVja2luVmFsdWU7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGx2IG9mIGNoZWNraW5WYWx1ZS5sb29rdXBfdmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ieV9sdltsdl0gPSBjaGVja2luVmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZjIG9mIGNoZWNraW5WYWx1ZS5mYXN0X2NoZWNraW5zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ieV9mY1tmY10gPSBjaGVja2luVmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBlbnRyaWVzIG9mIGNoZWNrLWluIHZhbHVlcyBieSBrZXkuXG4gICAgICogQHJldHVybnMge0FycmF5fSBUaGUgZW50cmllcyBvZiBjaGVjay1pbiB2YWx1ZXMuXG4gICAgICovXG4gICAgZW50cmllcygpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKHRoaXMuYnlfa2V5KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZXMgYSBmYXN0IGNoZWNrLWluIHZhbHVlIGZyb20gdGhlIGdpdmVuIGJvZHkgc3RyaW5nLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5IC0gVGhlIGJvZHkgc3RyaW5nIHRvIHBhcnNlLlxuICAgICAqIEByZXR1cm5zIHtDaGVja2luVmFsdWUgfCB1bmRlZmluZWR9IFRoZSBwYXJzZWQgY2hlY2staW4gdmFsdWUgb3IgdW5kZWZpbmVkLlxuICAgICAqL1xuICAgIHBhcnNlX2Zhc3RfY2hlY2tpbihib2R5OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnlfZmNbYm9keV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIGEgY2hlY2staW4gdmFsdWUgZnJvbSB0aGUgZ2l2ZW4gYm9keSBzdHJpbmcuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHkgLSBUaGUgYm9keSBzdHJpbmcgdG8gcGFyc2UuXG4gICAgICogQHJldHVybnMge0NoZWNraW5WYWx1ZSB8IHVuZGVmaW5lZH0gVGhlIHBhcnNlZCBjaGVjay1pbiB2YWx1ZSBvciB1bmRlZmluZWQuXG4gICAgICovXG4gICAgcGFyc2VfY2hlY2tpbihib2R5OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgY2hlY2tpbl9sb3dlciA9IGJvZHkucmVwbGFjZSgvXFxzKy8sIFwiXCIpO1xuICAgICAgICByZXR1cm4gdGhpcy5ieV9sdltjaGVja2luX2xvd2VyXTtcbiAgICB9XG59XG5cbmV4cG9ydCB7IENoZWNraW5WYWx1ZSwgQ2hlY2tpblZhbHVlcyB9IiwiLyoqXG4gKiBFbnVtIGZvciBkaWZmZXJlbnQgdHlwZXMgb2YgY29tcCBwYXNzZXMuXG4gKiBAZW51bSB7c3RyaW5nfVxuICovXG5leHBvcnQgZW51bSBDb21wUGFzc1R5cGUge1xuICAgIENvbXBQYXNzID0gXCJjb21wLXBhc3NcIixcbiAgICBNYW5hZ2VyUGFzcyA9IFwibWFuYWdlci1wYXNzXCIsXG59XG5cbi8qKlxuICogR2V0IHRoZSBkZXNjcmlwdGlvbiBmb3IgYSBnaXZlbiBjb21wIHBhc3MgdHlwZS5cbiAqIEBwYXJhbSB7Q29tcFBhc3NUeXBlfSB0eXBlIC0gVGhlIHR5cGUgb2YgdGhlIGNvbXAgcGFzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgY29tcCBwYXNzIHR5cGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRfY29tcF9wYXNzX2Rlc2NyaXB0aW9uKHR5cGU6IENvbXBQYXNzVHlwZSk6IHN0cmluZyB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgQ29tcFBhc3NUeXBlLkNvbXBQYXNzOlxuICAgICAgICAgICAgcmV0dXJuIFwiQ29tcCBQYXNzXCI7XG4gICAgICAgIGNhc2UgQ29tcFBhc3NUeXBlLk1hbmFnZXJQYXNzOlxuICAgICAgICAgICAgcmV0dXJuIFwiTWFuYWdlciBQYXNzXCI7XG4gICAgfVxuICAgIHJldHVybiBcIlwiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRfcGFzc2VzX3N0cmluZyhcbiAgICB1c2VkOiBudW1iZXIsXG4gICAgdG90YWw6IG51bWJlcixcbiAgICB0b2RheTogbnVtYmVyLFxuICAgIHR5cGU6IHN0cmluZyxcbiAgICBmb3JjZV90b2RheTogYm9vbGVhbiA9IGZhbHNlXG4pIHtcbiAgICBsZXQgbWVzc2FnZSA9IGBZb3UgaGF2ZSB1c2VkICR7dXNlZH0gb2YgJHt0b3RhbH0gJHt0eXBlfSB0aGlzIHNlYXNvbmA7XG4gICAgaWYgKGZvcmNlX3RvZGF5IHx8IHRvZGF5ID4gMCkge1xuICAgICAgICBtZXNzYWdlICs9IGAgKCR7dG9kYXl9IHVzZWQgdG9kYXkpYDtcbiAgICB9XG4gICAgbWVzc2FnZSArPSBcIi5cIjtcbiAgICByZXR1cm4gbWVzc2FnZTtcbn1cbiIsIi8qKlxuICogQ29udmVydCBhbiBFeGNlbCBkYXRlIHRvIGEgSmF2YVNjcmlwdCBEYXRlIG9iamVjdC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBkYXRlIC0gVGhlIEV4Y2VsIGRhdGUuXG4gKiBAcmV0dXJucyB7RGF0ZX0gVGhlIEphdmFTY3JpcHQgRGF0ZSBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGV4Y2VsX2RhdGVfdG9fanNfZGF0ZShkYXRlOiBudW1iZXIpOiBEYXRlIHtcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgRGF0ZSgwKTtcbiAgICByZXN1bHQuc2V0VVRDTWlsbGlzZWNvbmRzKE1hdGgucm91bmQoKGRhdGUgLSAyNTU2OSkgKiA4NjQwMCAqIDEwMDApKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENoYW5nZSB0aGUgdGltZXpvbmUgb2YgYSBEYXRlIG9iamVjdCB0byBQU1QuXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgLSBUaGUgRGF0ZSBvYmplY3QuXG4gKiBAcmV0dXJucyB7RGF0ZX0gVGhlIERhdGUgb2JqZWN0IHdpdGggdGhlIHRpbWV6b25lIHNldCB0byBQU1QuXG4gKi9cbmZ1bmN0aW9uIGNoYW5nZV90aW1lem9uZV90b19wc3QoZGF0ZTogRGF0ZSk6IERhdGUge1xuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBEYXRlKGRhdGUudG9VVENTdHJpbmcoKS5yZXBsYWNlKFwiIEdNVFwiLCBcIiBQU1RcIikpO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogU3RyaXAgdGhlIHRpbWUgZnJvbSBhIERhdGUgb2JqZWN0LCBrZWVwaW5nIG9ubHkgdGhlIGRhdGUuXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgLSBUaGUgRGF0ZSBvYmplY3QuXG4gKiBAcmV0dXJucyB7RGF0ZX0gVGhlIERhdGUgb2JqZWN0IHdpdGggdGhlIHRpbWUgc3RyaXBwZWQuXG4gKi9cbmZ1bmN0aW9uIHN0cmlwX2RhdGV0aW1lX3RvX2RhdGUoZGF0ZTogRGF0ZSk6IERhdGUge1xuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBEYXRlKFxuICAgICAgICBkYXRlLnRvTG9jYWxlRGF0ZVN0cmluZyhcImVuLVVTXCIsIHsgdGltZVpvbmU6IFwiQW1lcmljYS9Mb3NfQW5nZWxlc1wiIH0pXG4gICAgKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFNhbml0aXplIGEgZGF0ZSBieSBjb252ZXJ0aW5nIGl0IGZyb20gYW4gRXhjZWwgZGF0ZSBhbmQgc3RyaXBwaW5nIHRoZSB0aW1lLlxuICogQHBhcmFtIHtudW1iZXJ9IGRhdGUgLSBUaGUgRXhjZWwgZGF0ZS5cbiAqIEByZXR1cm5zIHtEYXRlfSBUaGUgc2FuaXRpemVkIERhdGUgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBzYW5pdGl6ZV9kYXRlKGRhdGU6IG51bWJlcik6IERhdGUge1xuICAgIGNvbnN0IHJlc3VsdCA9IHN0cmlwX2RhdGV0aW1lX3RvX2RhdGUoXG4gICAgICAgIGNoYW5nZV90aW1lem9uZV90b19wc3QoZXhjZWxfZGF0ZV90b19qc19kYXRlKGRhdGUpKVxuICAgICk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBGb3JtYXQgYSBEYXRlIG9iamVjdCBmb3IgdXNlIGluIGEgc3ByZWFkc2hlZXQgdmFsdWUuXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgLSBUaGUgRGF0ZSBvYmplY3QuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIGRhdGUgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBmb3JtYXRfZGF0ZV9mb3Jfc3ByZWFkc2hlZXRfdmFsdWUoZGF0ZTogRGF0ZSk6IHN0cmluZyB7XG4gICAgY29uc3QgZGF0ZXN0ciA9IGRhdGVcbiAgICAgICAgLnRvTG9jYWxlRGF0ZVN0cmluZygpXG4gICAgICAgIC5zcGxpdChcIi9cIilcbiAgICAgICAgLm1hcCgoeCkgPT4geC5wYWRTdGFydCgyLCBcIjBcIikpXG4gICAgICAgIC5qb2luKFwiXCIpO1xuICAgIHJldHVybiBkYXRlc3RyO1xufVxuXG4vKipcbiAqIEZpbHRlciBhIGxpc3QgdG8gaW5jbHVkZSBvbmx5IGl0ZW1zIHRoYXQgZW5kIHdpdGggYSBzcGVjaWZpYyBkYXRlLlxuICogQHBhcmFtIHthbnlbXX0gbGlzdCAtIFRoZSBsaXN0IHRvIGZpbHRlci5cbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSAtIFRoZSBkYXRlIHRvIGZpbHRlciBieS5cbiAqIEByZXR1cm5zIHthbnlbXX0gVGhlIGZpbHRlcmVkIGxpc3QuXG4gKi9cbmZ1bmN0aW9uIGZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2RhdGUobGlzdDogYW55W10sIGRhdGU6IERhdGUpOiBhbnlbXSB7XG4gICAgY29uc3QgZGF0ZXN0ciA9IGZvcm1hdF9kYXRlX2Zvcl9zcHJlYWRzaGVldF92YWx1ZShkYXRlKTtcbiAgICByZXR1cm4gbGlzdC5tYXAoKHgpID0+IHg/LnRvU3RyaW5nKCkpLmZpbHRlcigoeCkgPT4geD8uZW5kc1dpdGgoZGF0ZXN0cikpO1xufVxuXG4vKipcbiAqIEZpbHRlciBhIGxpc3QgdG8gaW5jbHVkZSBvbmx5IGl0ZW1zIHRoYXQgZW5kIHdpdGggdGhlIGN1cnJlbnQgZGF0ZS5cbiAqIEBwYXJhbSB7YW55W119IGxpc3QgLSBUaGUgbGlzdCB0byBmaWx0ZXIuXG4gKiBAcmV0dXJucyB7YW55W119IFRoZSBmaWx0ZXJlZCBsaXN0LlxuICovXG5mdW5jdGlvbiBmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9jdXJyZW50X2RheShsaXN0OiBhbnlbXSk6IGFueVtdIHtcbiAgICByZXR1cm4gZmlsdGVyX2xpc3RfdG9fZW5kc3dpdGhfZGF0ZShsaXN0LCBuZXcgRGF0ZSgpKTtcbn1cblxuZXhwb3J0IHtcbiAgICBzYW5pdGl6ZV9kYXRlLFxuICAgIGV4Y2VsX2RhdGVfdG9fanNfZGF0ZSxcbiAgICBjaGFuZ2VfdGltZXpvbmVfdG9fcHN0LFxuICAgIHN0cmlwX2RhdGV0aW1lX3RvX2RhdGUsXG4gICAgZm9ybWF0X2RhdGVfZm9yX3NwcmVhZHNoZWV0X3ZhbHVlLFxuICAgIGZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2RhdGUsXG4gICAgZmlsdGVyX2xpc3RfdG9fZW5kc3dpdGhfY3VycmVudF9kYXksXG59OyIsImltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICdAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzJztcblxuLyoqXG4gKiBMb2FkIGNyZWRlbnRpYWxzIGZyb20gYSBKU09OIGZpbGUuXG4gKiBAcmV0dXJucyB7YW55fSBUaGUgcGFyc2VkIGNyZWRlbnRpYWxzIGZyb20gdGhlIEpTT04gZmlsZS5cbiAqL1xuZnVuY3Rpb24gbG9hZF9jcmVkZW50aWFsc19maWxlcygpOiBhbnkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKFxuICAgICAgICBmc1xuICAgICAgICAgICAgLnJlYWRGaWxlU3luYyhSdW50aW1lLmdldEFzc2V0cygpW1wiL2NyZWRlbnRpYWxzLmpzb25cIl0ucGF0aClcbiAgICAgICAgICAgIC50b1N0cmluZygpXG4gICAgKTtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIHBhdGggdG8gdGhlIHNlcnZpY2UgY3JlZGVudGlhbHMgZmlsZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBwYXRoIHRvIHRoZSBzZXJ2aWNlIGNyZWRlbnRpYWxzIGZpbGUuXG4gKi9cbmZ1bmN0aW9uIGdldF9zZXJ2aWNlX2NyZWRlbnRpYWxzX3BhdGgoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gUnVudGltZS5nZXRBc3NldHMoKVtcIi9zZXJ2aWNlLWNyZWRlbnRpYWxzLmpzb25cIl0ucGF0aDtcbn1cblxuZXhwb3J0IHsgbG9hZF9jcmVkZW50aWFsc19maWxlcywgZ2V0X3NlcnZpY2VfY3JlZGVudGlhbHNfcGF0aCB9OyIsImltcG9ydCB7IHNoZWV0c192NCB9IGZyb20gXCJnb29nbGVhcGlzXCI7XG5pbXBvcnQgeyBleGNlbF9yb3dfdG9faW5kZXggfSBmcm9tIFwiLi91dGlsXCI7XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGEgR29vZ2xlIFNoZWV0cyBzcHJlYWRzaGVldCB0YWIuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiIHtcbiAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyB8IG51bGw7XG4gICAgc2hlZXRfaWQ6IHN0cmluZztcbiAgICBzaGVldF9uYW1lOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYi5cbiAgICAgKiBAcGFyYW0ge3NoZWV0c192NC5TaGVldHMgfCBudWxsfSBzaGVldHNfc2VydmljZSAtIFRoZSBHb29nbGUgU2hlZXRzIEFQSSBzZXJ2aWNlIGluc3RhbmNlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaGVldF9pZCAtIFRoZSBJRCBvZiB0aGUgR29vZ2xlIFNoZWV0cyBzcHJlYWRzaGVldC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2hlZXRfbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBzaGVldCB0YWIuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzIHwgbnVsbCxcbiAgICAgICAgc2hlZXRfaWQ6IHN0cmluZyxcbiAgICAgICAgc2hlZXRfbmFtZTogc3RyaW5nXG4gICAgKSB7XG4gICAgICAgIHRoaXMuc2hlZXRzX3NlcnZpY2UgPSBzaGVldHNfc2VydmljZTtcbiAgICAgICAgdGhpcy5zaGVldF9pZCA9IHNoZWV0X2lkO1xuICAgICAgICB0aGlzLnNoZWV0X25hbWUgPSBzaGVldF9uYW1lLnNwbGl0KFwiIVwiKVswXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdmFsdWVzIGZyb20gdGhlIHNoZWV0LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbH0gW3JhbmdlXSAtIFRoZSByYW5nZSB0byBnZXQgdmFsdWVzIGZyb20uXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55W11bXSB8IHVuZGVmaW5lZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSB2YWx1ZXMgZnJvbSB0aGUgc2hlZXQuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3ZhbHVlcyhyYW5nZT86IHN0cmluZyB8IG51bGwpOiBQcm9taXNlPGFueVtdW10gfCB1bmRlZmluZWQ+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5fZ2V0X3ZhbHVlcyhyYW5nZSk7XG4gICAgICAgIHJldHVybiByZXN1bHQuZGF0YS52YWx1ZXMgPz8gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgcm93IGZvciBhIHNwZWNpZmljIHBhdHJvbGxlci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0cm9sbGVyX25hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcGF0cm9sbGVyLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lX2NvbHVtbiAtIFRoZSBjb2x1bW4gd2hlcmUgdGhlIHBhdHJvbGxlcidzIG5hbWUgaXMgbG9jYXRlZC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bGx9IFtyYW5nZV0gLSBUaGUgcmFuZ2UgdG8gc2VhcmNoIHdpdGhpbi5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx7IHJvdzogYW55W107IGluZGV4OiBudW1iZXI7IH0gfCBudWxsPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIHJvdyBhbmQgaW5kZXggb2YgdGhlIHBhdHJvbGxlciwgb3IgbnVsbCBpZiBub3QgZm91bmQuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3NoZWV0X3Jvd19mb3JfcGF0cm9sbGVyKFxuICAgICAgICBwYXRyb2xsZXJfbmFtZTogc3RyaW5nLFxuICAgICAgICBuYW1lX2NvbHVtbjogc3RyaW5nLFxuICAgICAgICByYW5nZT86IHN0cmluZyB8IG51bGxcbiAgICApOiBQcm9taXNlPHsgcm93OiBhbnlbXTsgaW5kZXg6IG51bWJlcjsgfSB8IG51bGw+IHtcbiAgICAgICAgY29uc3Qgcm93cyA9IGF3YWl0IHRoaXMuZ2V0X3ZhbHVlcyhyYW5nZSk7XG4gICAgICAgIGlmIChyb3dzKSB7XG4gICAgICAgICAgICBjb25zdCBsb29rdXBfaW5kZXggPSBleGNlbF9yb3dfdG9faW5kZXgobmFtZV9jb2x1bW4pO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJvd3NbaV1bbG9va3VwX2luZGV4XSA9PT0gcGF0cm9sbGVyX25hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgcm93OiByb3dzW2ldLCBpbmRleDogaSB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgYENvdWxkbid0IGZpbmQgcGF0cm9sbGVyICR7cGF0cm9sbGVyX25hbWV9IGluIHNoZWV0ICR7dGhpcy5zaGVldF9uYW1lfS5gXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB2YWx1ZXMgaW4gdGhlIHNoZWV0LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByYW5nZSAtIFRoZSByYW5nZSB0byB1cGRhdGUuXG4gICAgICogQHBhcmFtIHthbnlbXVtdfSB2YWx1ZXMgLSBUaGUgdmFsdWVzIHRvIHVwZGF0ZS5cbiAgICAgKi9cbiAgICBhc3luYyB1cGRhdGVfdmFsdWVzKHJhbmdlOiBzdHJpbmcsIHZhbHVlczogYW55W11bXSkge1xuICAgICAgICBjb25zdCB1cGRhdGVNZSA9IChhd2FpdCB0aGlzLl9nZXRfdmFsdWVzKHJhbmdlLCBudWxsKSkuZGF0YTtcblxuICAgICAgICB1cGRhdGVNZS52YWx1ZXMgPSB2YWx1ZXM7XG4gICAgICAgIGF3YWl0IHRoaXMuc2hlZXRzX3NlcnZpY2UhLnNwcmVhZHNoZWV0cy52YWx1ZXMudXBkYXRlKHtcbiAgICAgICAgICAgIHNwcmVhZHNoZWV0SWQ6IHRoaXMuc2hlZXRfaWQsXG4gICAgICAgICAgICB2YWx1ZUlucHV0T3B0aW9uOiBcIlVTRVJfRU5URVJFRFwiLFxuICAgICAgICAgICAgcmFuZ2U6IHVwZGF0ZU1lLnJhbmdlISxcbiAgICAgICAgICAgIHJlcXVlc3RCb2R5OiB1cGRhdGVNZSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHZhbHVlcyBmcm9tIHRoZSBzaGVldCAocHJpdmF0ZSBtZXRob2QpLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbH0gW3JhbmdlXSAtIFRoZSByYW5nZSB0byBnZXQgdmFsdWVzIGZyb20uXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCBudWxsfSBbdmFsdWVSZW5kZXJPcHRpb25dIC0gVGhlIHZhbHVlIHJlbmRlciBvcHRpb24uXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55W11bXT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSB2YWx1ZSByYW5nZS5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgYXN5bmMgX2dldF92YWx1ZXMoXG4gICAgICAgIHJhbmdlPzogc3RyaW5nIHwgbnVsbCxcbiAgICAgICAgdmFsdWVSZW5kZXJPcHRpb246IHN0cmluZyB8IG51bGwgPSBcIlVORk9STUFUVEVEX1ZBTFVFXCJcbiAgICApIHtcbiAgICAgICAgbGV0IGxvb2t1cFJhbmdlID0gdGhpcy5zaGVldF9uYW1lO1xuICAgICAgICBpZiAocmFuZ2UgIT0gbnVsbCkge1xuICAgICAgICAgICAgbG9va3VwUmFuZ2UgPSBsb29rdXBSYW5nZSArIFwiIVwiO1xuXG4gICAgICAgICAgICBpZiAocmFuZ2Uuc3RhcnRzV2l0aChsb29rdXBSYW5nZSkpIHtcbiAgICAgICAgICAgICAgICByYW5nZSA9IHJhbmdlLnN1YnN0cmluZyhsb29rdXBSYW5nZS5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9va3VwUmFuZ2UgPSBsb29rdXBSYW5nZSArIHJhbmdlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBvcHRzOiBzaGVldHNfdjQuUGFyYW1zJFJlc291cmNlJFNwcmVhZHNoZWV0cyRWYWx1ZXMkR2V0ID0ge1xuICAgICAgICAgICAgc3ByZWFkc2hlZXRJZDogdGhpcy5zaGVldF9pZCxcbiAgICAgICAgICAgIHJhbmdlOiBsb29rdXBSYW5nZSxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHZhbHVlUmVuZGVyT3B0aW9uKSB7XG4gICAgICAgICAgICBvcHRzLnZhbHVlUmVuZGVyT3B0aW9uID0gdmFsdWVSZW5kZXJPcHRpb247XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5zaGVldHNfc2VydmljZSEuc3ByZWFkc2hlZXRzLnZhbHVlcy5nZXQob3B0cyk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBWYWxpZGF0ZXMgaWYgdGhlIHByb3ZpZGVkIHNjb3BlcyBpbmNsdWRlIGFsbCBkZXNpcmVkIHNjb3Blcy5cbiAqIEBwYXJhbSB7c3RyaW5nW119IHNjb3BlcyAtIFRoZSBsaXN0IG9mIHNjb3BlcyB0byB2YWxpZGF0ZS5cbiAqIEBwYXJhbSB7c3RyaW5nW119IGRlc2lyZWRfc2NvcGVzIC0gVGhlIGxpc3Qgb2YgZGVzaXJlZCBzY29wZXMuXG4gKiBAdGhyb3dzIHtFcnJvcn0gVGhyb3dzIGFuIGVycm9yIGlmIGFueSBkZXNpcmVkIHNjb3BlIGlzIG1pc3NpbmcuXG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlX3Njb3BlcyhzY29wZXM6IHN0cmluZ1tdLCBkZXNpcmVkX3Njb3Blczogc3RyaW5nW10pIHtcbiAgICBmb3IgKGNvbnN0IGRlc2lyZWRfc2NvcGUgb2YgZGVzaXJlZF9zY29wZXMpIHtcbiAgICAgICAgaWYgKHNjb3BlcyA9PT0gdW5kZWZpbmVkIHx8ICFzY29wZXMuaW5jbHVkZXMoZGVzaXJlZF9zY29wZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gYE1pc3Npbmcgc2NvcGUgJHtkZXNpcmVkX3Njb3BlfSBpbiByZWNlaXZlZCBzY29wZXM6ICR7c2NvcGVzfWA7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IHt2YWxpZGF0ZV9zY29wZXN9IiwiaW1wb3J0IHsgU2VjdGlvbkNvbmZpZyB9IGZyb20gJy4uL2Vudi9oYW5kbGVyX2NvbmZpZyc7XG5cbi8qKlxuICAgICogQ2xhc3MgZm9yIHNlY3Rpb24gdmFsdWVzLlxuICAgICovXG5jbGFzcyBTZWN0aW9uVmFsdWVzIHtcbiAgICBzZWN0aW9uX2NvbmZpZzogU2VjdGlvbkNvbmZpZ1xuICAgIHNlY3Rpb25zOiBzdHJpbmdbXTtcbiAgICBsb3dlcmNhc2Vfc2VjdGlvbnM6IHN0cmluZ1tdO1xuXG4gICAgY29uc3RydWN0b3Ioc2VjdGlvbl9jb25maWc6IFNlY3Rpb25Db25maWcpIHtcbiAgICAgICAgdGhpcy5zZWN0aW9uX2NvbmZpZyA9IHNlY3Rpb25fY29uZmlnO1xuICAgICAgICB0aGlzLnNlY3Rpb25zID0gc2VjdGlvbl9jb25maWcuU0VDVElPTl9WQUxVRVMuc3BsaXQoJywnKTtcbiAgICAgICAgdGhpcy5sb3dlcmNhc2Vfc2VjdGlvbnMgPSBzZWN0aW9uX2NvbmZpZy5TRUNUSU9OX1ZBTFVFUy50b0xvd2VyQ2FzZSgpLnNwbGl0KCcsJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgc2VjdGlvbiBkZXNjcmlwdGlvbi5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgc2VjdGlvbiBkZXNjcmlwdGlvbi5cbiAgICAqL1xuICAgIGdldF9zZWN0aW9uX2Rlc2NyaXB0aW9uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlY3Rpb25fY29uZmlnLlNFQ1RJT05fVkFMVUVTO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogUGFyc2VzIGEgc2VjdGlvbi5cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5IC0gVGhlIGJvZHkgb2YgdGhlIHJlcXVlc3QuXG4gICAgKiBAcmV0dXJucyB7c3RyaW5nIHwgbnVsbH0gVGhlIHNlY3Rpb24gaWYgaXQgaXMgYSB2YWxpZCBzZWN0aW9uIG9yIG51bGwuXG4gICAgKi9cbiAgICBwYXJzZV9zZWN0aW9uKGJvZHk6IHN0cmluZyB8IG51bGwpOiBzdHJpbmcgfCBudWxsIHtcbiAgICAgICAgaWYgKGJvZHkgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgICByZXR1cm4gdGhpcy5sb3dlcmNhc2Vfc2VjdGlvbnMuaW5jbHVkZXMoYm9keS50b0xvd2VyQ2FzZSgpKSA/IGJvZHkgOiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogTWFwcyBhIGxvd2VyIGNhc2UgdmVyc2lvbiBvZiBhIHNlY3Rpb24gc3RyaW5nIHRvIHRoZSBvcmlnaW5hbCBjYXNlIHZhbHVlLlxuICAgICogQHBhcmFtIHtzdHJpbmd9IHNlY3Rpb24gLSBUaGUgbG93ZXIgY2FzZSBzZWN0aW9uIHN0cmluZy5cbiAgICAqIEByZXR1cm5zIHtzdHJpbmcgfCBudWxsfSBUaGUgb3JpZ2luYWwgY2FzZSB2YWx1ZSBpZiBmb3VuZCwgb3RoZXJ3aXNlIG51bGwuXG4gICAgKi9cbiAgIG1hcF9zZWN0aW9uKHNlY3Rpb246IHN0cmluZyk6IHN0cmluZyAge1xuICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5sb3dlcmNhc2Vfc2VjdGlvbnMuaW5kZXhPZihzZWN0aW9uLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VjdGlvbnNbaW5kZXhdO1xuICAgICAgIH1cbiAgICAgICByZXR1cm4gXCJcIjtcbiAgIH1cblxufVxuXG5leHBvcnQgeyBTZWN0aW9uVmFsdWVzIH07IiwiLyoqXG4gKiBDb252ZXJ0IHJvdyBhbmQgY29sdW1uIG51bWJlcnMgdG8gYW4gRXhjZWwtbGlrZSBpbmRleC5cbiAqIEBwYXJhbSB7bnVtYmVyfSByb3cgLSBUaGUgcm93IG51bWJlciAoMC1iYXNlZCkuXG4gKiBAcGFyYW0ge251bWJlcn0gY29sIC0gVGhlIGNvbHVtbiBudW1iZXIgKDAtYmFzZWQpLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIEV4Y2VsLWxpa2UgaW5kZXggKGUuZy4sIFwiQTFcIikuXG4gKi9cbmZ1bmN0aW9uIHJvd19jb2xfdG9fZXhjZWxfaW5kZXgocm93OiBudW1iZXIsIGNvbDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBsZXQgY29sU3RyaW5nID0gXCJcIjtcbiAgICBjb2wgKz0gMTtcbiAgICB3aGlsZSAoY29sID4gMCkge1xuICAgICAgICBjb2wgLT0gMTtcbiAgICAgICAgY29uc3QgbW9kdWxvID0gY29sICUgMjY7XG4gICAgICAgIGNvbnN0IGNvbExldHRlciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoJ0EnLmNoYXJDb2RlQXQoMCkgKyBtb2R1bG8pO1xuICAgICAgICBjb2xTdHJpbmcgPSBjb2xMZXR0ZXIgKyBjb2xTdHJpbmc7XG4gICAgICAgIGNvbCA9IE1hdGguZmxvb3IoY29sIC8gMjYpO1xuICAgIH1cbiAgICByZXR1cm4gY29sU3RyaW5nICsgKHJvdyArIDEpLnRvU3RyaW5nKCk7XG59XG5cbi8qKlxuICogU3BsaXQgYW4gRXhjZWwtbGlrZSBpbmRleCBpbnRvIHJvdyBhbmQgY29sdW1uIG51bWJlcnMuXG4gKiBAcGFyYW0ge3N0cmluZ30gZXhjZWxfaW5kZXggLSBUaGUgRXhjZWwtbGlrZSBpbmRleCAoZS5nLiwgXCJBMVwiKS5cbiAqIEByZXR1cm5zIHtbbnVtYmVyLCBudW1iZXJdfSBBbiBhcnJheSBjb250YWluaW5nIHRoZSByb3cgYW5kIGNvbHVtbiBudW1iZXJzICgwLWJhc2VkKS5cbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgaW5kZXggY2Fubm90IGJlIHBhcnNlZC5cbiAqL1xuZnVuY3Rpb24gc3BsaXRfdG9fcm93X2NvbChleGNlbF9pbmRleDogc3RyaW5nKTogW251bWJlciwgbnVtYmVyXSB7XG4gICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKFwiXihbQS1aYS16XSspKFswLTldKykkXCIpO1xuICAgIGNvbnN0IG1hdGNoID0gcmVnZXguZXhlYyhleGNlbF9pbmRleCk7XG4gICAgaWYgKG1hdGNoID09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIHBhcnNlIHN0cmluZyBmb3IgZXhjZWwgcG9zaXRpb24gc3BsaXRcIik7XG4gICAgfVxuICAgIGNvbnN0IGNvbCA9IGV4Y2VsX3Jvd190b19pbmRleChtYXRjaFsxXSk7XG4gICAgY29uc3QgcmF3X3JvdyA9IE51bWJlcihtYXRjaFsyXSk7XG4gICAgaWYgKHJhd19yb3cgPCAxKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlJvdyBtdXN0IGJlID49MVwiKTtcbiAgICB9XG4gICAgcmV0dXJuIFtyYXdfcm93IC0gMSwgY29sXTtcbn1cblxuLyoqXG4gKiBMb29rIHVwIGEgdmFsdWUgaW4gYSBzaGVldCBieSBpdHMgRXhjZWwtbGlrZSBpbmRleC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBleGNlbF9pbmRleCAtIFRoZSBFeGNlbC1saWtlIGluZGV4IChlLmcuLCBcIkExXCIpLlxuICogQHBhcmFtIHthbnlbXVtdfSBzaGVldCAtIFRoZSBzaGVldCBkYXRhLlxuICogQHJldHVybnMge2FueX0gVGhlIHZhbHVlIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXgsIG9yIHVuZGVmaW5lZCBpZiBub3QgZm91bmQuXG4gKi9cbmZ1bmN0aW9uIGxvb2t1cF9yb3dfY29sX2luX3NoZWV0KGV4Y2VsX2luZGV4OiBzdHJpbmcsIHNoZWV0OiBhbnlbXVtdKTogYW55IHtcbiAgICBjb25zdCBbcm93LCBjb2xdID0gc3BsaXRfdG9fcm93X2NvbChleGNlbF9pbmRleCk7XG4gICAgaWYgKHJvdyA+PSBzaGVldC5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIHNoZWV0W3Jvd11bY29sXTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0IEV4Y2VsLWxpa2UgY29sdW1uIGxldHRlcnMgdG8gYSBjb2x1bW4gbnVtYmVyLlxuICogQHBhcmFtIHtzdHJpbmd9IGxldHRlcnMgLSBUaGUgY29sdW1uIGxldHRlcnMgKGUuZy4sIFwiQVwiKS5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBjb2x1bW4gbnVtYmVyICgwLWJhc2VkKS5cbiAqL1xuZnVuY3Rpb24gZXhjZWxfcm93X3RvX2luZGV4KGxldHRlcnM6IHN0cmluZyk6IG51bWJlciB7XG4gICAgY29uc3QgbG93ZXJMZXR0ZXJzID0gbGV0dGVycy50b0xvd2VyQ2FzZSgpO1xuICAgIGxldCByZXN1bHQ6IG51bWJlciA9IDA7XG4gICAgZm9yICh2YXIgcCA9IDA7IHAgPCBsb3dlckxldHRlcnMubGVuZ3RoOyBwKyspIHtcbiAgICAgICAgY29uc3QgY2hhcmFjdGVyVmFsdWUgPVxuICAgICAgICAgICAgbG93ZXJMZXR0ZXJzLmNoYXJDb2RlQXQocCkgLSBcImFcIi5jaGFyQ29kZUF0KDApICsgMTtcbiAgICAgICAgcmVzdWx0ID0gY2hhcmFjdGVyVmFsdWUgKyByZXN1bHQgKiAyNjtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdCAtIDE7XG59XG5cbi8qKlxuICogU2FuaXRpemUgYSBwaG9uZSBudW1iZXIgYnkgcmVtb3ZpbmcgdW53YW50ZWQgY2hhcmFjdGVycy5cbiAqIEBwYXJhbSB7bnVtYmVyIHwgc3RyaW5nfSBudW1iZXIgLSBUaGUgcGhvbmUgbnVtYmVyIHRvIHNhbml0aXplLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIHNhbml0aXplZCBwaG9uZSBudW1iZXIuXG4gKi9cbmZ1bmN0aW9uIHNhbml0aXplX3Bob25lX251bWJlcihudW1iZXI6IG51bWJlciB8IHN0cmluZyk6IHN0cmluZyB7XG4gICAgbGV0IG5ld19udW1iZXIgPSBudW1iZXIudG9TdHJpbmcoKTtcbiAgICBuZXdfbnVtYmVyID0gbmV3X251bWJlci5yZXBsYWNlKFwid2hhdHNhcHA6XCIsIFwiXCIpO1xuICAgIGxldCB0ZW1wb3JhcnlfbmV3X251bWJlcjogc3RyaW5nID0gXCJcIjtcbiAgICB3aGlsZSAodGVtcG9yYXJ5X25ld19udW1iZXIgIT0gbmV3X251bWJlcikge1xuICAgICAgICAvLyBEbyB0aGlzIG11bHRpcGxlIHRpbWVzIHNvIHdlIGdldCBhbGwgKzEgYXQgdGhlIHN0YXJ0IG9mIHRoZSBzdHJpbmcsIGV2ZW4gYWZ0ZXIgc3RyaXBwaW5nLlxuICAgICAgICB0ZW1wb3JhcnlfbmV3X251bWJlciA9IG5ld19udW1iZXI7XG4gICAgICAgIG5ld19udW1iZXIgPSBuZXdfbnVtYmVyLnJlcGxhY2UoLyheXFwrMXxcXCh8XFwpfFxcLnwtKS9nLCBcIlwiKTtcbiAgICB9XG4gICAgY29uc3QgcmVzdWx0ID0gU3RyaW5nKHBhcnNlSW50KG5ld19udW1iZXIpKS5wYWRTdGFydCgxMCwgXCIwXCIpO1xuICAgIGlmIChyZXN1bHQubGVuZ3RoID09IDExICYmIHJlc3VsdFswXSA9PSBcIjFcIikge1xuICAgICAgICByZXR1cm4gcmVzdWx0LnN1YnN0cmluZygxKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IHtcbiAgICByb3dfY29sX3RvX2V4Y2VsX2luZGV4LFxuICAgIGV4Y2VsX3Jvd190b19pbmRleCxcbiAgICBzYW5pdGl6ZV9waG9uZV9udW1iZXIsXG4gICAgc3BsaXRfdG9fcm93X2NvbCxcbiAgICBsb29rdXBfcm93X2NvbF9pbl9zaGVldCxcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImdvb2dsZWFwaXNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2hhbmRsZXJzL2hhbmRsZXIucHJvdGVjdGVkLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9