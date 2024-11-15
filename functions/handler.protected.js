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
exports.handler_config = handler_config;
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
        this.checkin_values = new checkin_values_1.CheckinValues(handler_config_1.handler_config.CHECKIN_VALUES);
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
Check in / Check out / Status / On Duty / Area Assignment / Comp Pass / Manager Pass / Whatsapp
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
            yield this.log_action(`assign_section(${section})`);
            const login_sheet = yield this.get_login_sheet();
            yield login_sheet.assign_section(this.patroller, section);
            yield ((_a = this.login_sheet) === null || _a === void 0 ? void 0 : _a.refresh());
            yield this.get_mapped_patroller(true);
            return {
                response: `Updated ${this.patroller.name} with section assignment: ${section}.`,
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
        return this.sections.includes(body) ? body : null;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LElBQUksb0JBQW9CLEdBQVcsRUFBRSxDQUFDO0lBQ3RDLE9BQU8sb0JBQW9CLElBQUksVUFBVSxFQUFFO1FBQ3ZDLDRGQUE0RjtRQUM1RixvQkFBb0IsR0FBRyxVQUFVLENBQUM7UUFDbEMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDN0Q7SUFDRCxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM5RCxJQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUksRUFBRSxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUU7UUFDekMsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzlCO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQUtHLHNEQUFxQjs7Ozs7Ozs7Ozs7QUM3RnpCOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvZW52L2hhbmRsZXJfY29uZmlnLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvaGFuZGxlcnMvYnZuc3BfY2hlY2tpbl9oYW5kbGVyLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvaGFuZGxlcnMvaGFuZGxlci5wcm90ZWN0ZWQudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9zaGVldHMvY29tcF9wYXNzX3NoZWV0LnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvc2hlZXRzL2xvZ2luX3NoZWV0LnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvc2hlZXRzL3NlYXNvbl9zaGVldC50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3VzZXItY3JlZHMudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91dGlscy9jaGVja2luX3ZhbHVlcy50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3V0aWxzL2NvbXBfcGFzc2VzLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvZGF0ZXRpbWVfdXRpbC50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3V0aWxzL2ZpbGVfdXRpbHMudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91dGlscy9nb29nbGVfc2hlZXRzX3NwcmVhZHNoZWV0X3RhYi50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3V0aWxzL3Njb3BlX3V0aWwudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91dGlscy9zZWN0aW9uX3ZhbHVlcy50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3V0aWxzL3V0aWwudHMiLCJleHRlcm5hbCBjb21tb25qcyBcIkB0d2lsaW8tbGFicy9zZXJ2ZXJsZXNzLXJ1bnRpbWUtdHlwZXNcIiIsImV4dGVybmFsIGNvbW1vbmpzIFwiZ29vZ2xlYXBpc1wiIiwiZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImZzXCIiLCJ3ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hlY2tpblZhbHVlIH0gZnJvbSBcIi4uL3V0aWxzL2NoZWNraW5fdmFsdWVzXCI7XG5cbi8qKlxuICogRW52aXJvbm1lbnQgY29uZmlndXJhdGlvbiBmb3IgdGhlIGhhbmRsZXIuXG4gKiA8cD5cbiAqIE5vdGU6IFRoZXNlIGFyZSB0aGUgb25seSBzZWNyZXQgdmFsdWVzIHdlIG5lZWQgdG8gcmVhZC4gUmVzdCBjYW4gYmUgZGVwbG95ZWQuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBIYW5kbGVyRW52aXJvbm1lbnRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTSEVFVF9JRCAtIFRoZSBJRCBvZiB0aGUgR29vZ2xlIFNoZWV0cyBzcHJlYWRzaGVldC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTQ1JJUFRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBBcHBzIFNjcmlwdCBwcm9qZWN0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNZTkNfU0lEIC0gVGhlIFNJRCBvZiB0aGUgVHdpbGlvIFN5bmMgc2VydmljZS5cbiAqL1xudHlwZSBIYW5kbGVyRW52aXJvbm1lbnQgPSB7XG4gICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICBTQ1JJUFRfSUQ6IHN0cmluZztcbiAgICBTWU5DX1NJRDogc3RyaW5nO1xufTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciB1c2VyIGNyZWRlbnRpYWxzLlxuICogQHR5cGVkZWYge09iamVjdH0gVXNlckNyZWRzQ29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZyB8IHVuZGVmaW5lZCB8IG51bGx9IE5TUF9FTUFJTF9ET01BSU4gLSBUaGUgZW1haWwgZG9tYWluIGZvciBOU1AuXG4gKi9cbnR5cGUgVXNlckNyZWRzQ29uZmlnID0ge1xuICAgIE5TUF9FTUFJTF9ET01BSU46IHN0cmluZyB8IHVuZGVmaW5lZCB8IG51bGw7XG59O1xuY29uc3QgdXNlcl9jcmVkc19jb25maWc6IFVzZXJDcmVkc0NvbmZpZyA9IHtcbiAgICBOU1BfRU1BSUxfRE9NQUlOOiBcImZhcndlc3Qub3JnXCIsXG59O1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIGZpbmRpbmcgYSBwYXRyb2xsZXIuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBGaW5kUGF0cm9sbGVyQ29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gUEhPTkVfTlVNQkVSX0xPT0tVUF9TSEVFVCAtIFRoZSByYW5nZSBmb3IgcGhvbmUgbnVtYmVyIGxvb2t1cC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBQSE9ORV9OVU1CRVJfTlVNQkVSX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIHBob25lIG51bWJlcnMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gUEhPTkVfTlVNQkVSX05BTUVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgbmFtZXMuXG4gKi9cbnR5cGUgRmluZFBhdHJvbGxlckNvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogc3RyaW5nO1xuICAgIFBIT05FX05VTUJFUl9MT09LVVBfU0hFRVQ6IHN0cmluZztcbiAgICBQSE9ORV9OVU1CRVJfTlVNQkVSX0NPTFVNTjogc3RyaW5nO1xuICAgIFBIT05FX05VTUJFUl9OQU1FX0NPTFVNTjogc3RyaW5nO1xufTtcblxuY29uc3QgZmluZF9wYXRyb2xsZXJfY29uZmlnOiBGaW5kUGF0cm9sbGVyQ29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBcInRlc3RcIixcbiAgICBQSE9ORV9OVU1CRVJfTE9PS1VQX1NIRUVUOiBcIlBob25lIE51bWJlcnMhQTI6QjEwMFwiLFxuICAgIFBIT05FX05VTUJFUl9OQU1FX0NPTFVNTjogXCJBXCIsXG4gICAgUEhPTkVfTlVNQkVSX05VTUJFUl9DT0xVTU46IFwiQlwiLFxufTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciB0aGUgbG9naW4gc2hlZXQuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBMb2dpblNoZWV0Q29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gTE9HSU5fU0hFRVRfTE9PS1VQIC0gVGhlIHJhbmdlIGZvciBsb2dpbiBzaGVldCBsb29rdXAuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQ0hFQ0tJTl9DT1VOVF9MT09LVVAgLSBUaGUgcmFuZ2UgZm9yIGNoZWNrLWluIGNvdW50IGxvb2t1cC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBBUkNISVZFRF9DRUxMIC0gVGhlIGNlbGwgZm9yIGFyY2hpdmVkIGRhdGEuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfREFURV9DRUxMIC0gVGhlIGNlbGwgZm9yIHRoZSBzaGVldCBkYXRlLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IENVUlJFTlRfREFURV9DRUxMIC0gVGhlIGNlbGwgZm9yIHRoZSBjdXJyZW50IGRhdGUuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gTkFNRV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBuYW1lcy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDQVRFR09SWV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBjYXRlZ29yaWVzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNFQ1RJT05fRFJPUERPV05fQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3Igc2VjdGlvbiBkcm9wZG93bi5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDSEVDS0lOX0RST1BET1dOX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIGNoZWNrLWluIGRyb3Bkb3duLlxuICovXG50eXBlIExvZ2luU2hlZXRDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICBMT0dJTl9TSEVFVF9MT09LVVA6IHN0cmluZztcbiAgICBDSEVDS0lOX0NPVU5UX0xPT0tVUDogc3RyaW5nO1xuICAgIEFSQ0hJVkVEX0NFTEw6IHN0cmluZztcbiAgICBTSEVFVF9EQVRFX0NFTEw6IHN0cmluZztcbiAgICBDVVJSRU5UX0RBVEVfQ0VMTDogc3RyaW5nO1xuICAgIE5BTUVfQ09MVU1OOiBzdHJpbmc7XG4gICAgQ0FURUdPUllfQ09MVU1OOiBzdHJpbmc7XG4gICAgU0VDVElPTl9EUk9QRE9XTl9DT0xVTU46IHN0cmluZztcbiAgICBDSEVDS0lOX0RST1BET1dOX0NPTFVNTjogc3RyaW5nO1xufTtcblxuY29uc3QgbG9naW5fc2hlZXRfY29uZmlnOiBMb2dpblNoZWV0Q29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBcInRlc3RcIixcbiAgICBMT0dJTl9TSEVFVF9MT09LVVA6IFwiTG9naW4hQTE6WjEwMFwiLFxuICAgIENIRUNLSU5fQ09VTlRfTE9PS1VQOiBcIlRvb2xzIUcyOkcyXCIsXG4gICAgU0hFRVRfREFURV9DRUxMOiBcIkIxXCIsXG4gICAgQ1VSUkVOVF9EQVRFX0NFTEw6IFwiQjJcIixcbiAgICBBUkNISVZFRF9DRUxMOiBcIkgxXCIsXG4gICAgTkFNRV9DT0xVTU46IFwiQVwiLFxuICAgIENBVEVHT1JZX0NPTFVNTjogXCJCXCIsXG4gICAgU0VDVElPTl9EUk9QRE9XTl9DT0xVTU46IFwiSFwiLFxuICAgIENIRUNLSU5fRFJPUERPV05fQ09MVU1OOiBcIklcIixcbn07XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgdGhlIHNlYXNvbiBzaGVldC5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IFNlYXNvblNoZWV0Q29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0VBU09OX1NIRUVUIC0gVGhlIG5hbWUgb2YgdGhlIHNlYXNvbiBzaGVldC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTRUFTT05fU0hFRVRfREFZU19DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBzZWFzb24gc2hlZXQgZGF5cy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTRUFTT05fU0hFRVRfTkFNRV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBzZWFzb24gc2hlZXQgbmFtZXMuXG4gKi9cbnR5cGUgU2Vhc29uU2hlZXRDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICBTRUFTT05fU0hFRVQ6IHN0cmluZztcbiAgICBTRUFTT05fU0hFRVRfREFZU19DT0xVTU46IHN0cmluZztcbiAgICBTRUFTT05fU0hFRVRfTkFNRV9DT0xVTU46IHN0cmluZztcbn07XG5jb25zdCBzZWFzb25fc2hlZXRfY29uZmlnOiBTZWFzb25TaGVldENvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogXCJ0ZXN0XCIsXG4gICAgU0VBU09OX1NIRUVUOiBcIlNlYXNvblwiLFxuICAgIFNFQVNPTl9TSEVFVF9OQU1FX0NPTFVNTjogXCJCXCIsXG4gICAgU0VBU09OX1NIRUVUX0RBWVNfQ09MVU1OOiBcIkFcIixcbn07XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3Igc2VjdGlvbnMuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBTZWN0aW9uQ29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0VDVElPTl9WQUxVRVMgLSBUaGUgc2VjdGlvbiB2YWx1ZXMuXG4gKi9cbnR5cGUgU2VjdGlvbkNvbmZpZyA9IHtcbiAgICBTRUNUSU9OX1ZBTFVFUzogc3RyaW5nO1xufTtcbmNvbnN0IHNlY3Rpb25fY29uZmlnOiBTZWN0aW9uQ29uZmlnID0ge1xuICAgIFNFQ1RJT05fVkFMVUVTOiAgXCIxLDIsMyw0LFJvdmluZyxGQVIsVHJhaW5pbmdcIixcbn07XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgY29tcCBwYXNzZXMuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBDb21wUGFzc2VzQ29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQ09NUF9QQVNTX1NIRUVUIC0gVGhlIG5hbWUgb2YgdGhlIGNvbXAgcGFzcyBzaGVldC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDT01QX1BBU1NfU0hFRVRfREFURVNfQVZBSUxBQkxFX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIGF2YWlsYWJsZSBkYXRlcy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDT01QX1BBU1NfU0hFRVRfVVNFRF9UT0RBWV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBkYXRlcyB1c2VkIHRvZGF5LlxuICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDT01QX1BBU1NfU0hFRVRfVVNFRF9TRUFTT05fQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgZGF0ZXMgdXNlZCBmb3IgdGhpcyBzZWFzb24uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQ09NUF9QQVNTX1NIRUVUX0RBVEVTX1NUQVJUSU5HX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIHN0YXJ0aW5nIGRhdGVzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IENPTVBfUEFTU19TSEVFVF9OQU1FX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIG5hbWVzLlxuICovXG50eXBlIENvbXBQYXNzZXNDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICBDT01QX1BBU1NfU0hFRVQ6IHN0cmluZztcbiAgICBDT01QX1BBU1NfU0hFRVRfREFURVNfQVZBSUxBQkxFX0NPTFVNTjogc3RyaW5nO1xuICAgIENPTVBfUEFTU19TSEVFVF9VU0VEX1RPREFZX0NPTFVNTjogc3RyaW5nO1xuICAgIENPTVBfUEFTU19TSEVFVF9VU0VEX1NFQVNPTl9DT0xVTU46IHN0cmluZztcbiAgICBDT01QX1BBU1NfU0hFRVRfREFURVNfU1RBUlRJTkdfQ09MVU1OOiBzdHJpbmc7XG4gICAgQ09NUF9QQVNTX1NIRUVUX05BTUVfQ09MVU1OOiBzdHJpbmc7XG59O1xuY29uc3QgY29tcF9wYXNzZXNfY29uZmlnOiBDb21wUGFzc2VzQ29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBcInRlc3RcIixcbiAgICBDT01QX1BBU1NfU0hFRVQ6IFwiQ29tcHNcIixcbiAgICBDT01QX1BBU1NfU0hFRVRfTkFNRV9DT0xVTU46IFwiQVwiLFxuICAgIENPTVBfUEFTU19TSEVFVF9EQVRFU19BVkFJTEFCTEVfQ09MVU1OOiBcIkRcIixcbiAgICBDT01QX1BBU1NfU0hFRVRfVVNFRF9UT0RBWV9DT0xVTU46IFwiRVwiLFxuICAgIENPTVBfUEFTU19TSEVFVF9VU0VEX1NFQVNPTl9DT0xVTU46IFwiRlwiLFxuICAgIENPTVBfUEFTU19TSEVFVF9EQVRFU19TVEFSVElOR19DT0xVTU46IFwiR1wiLFxufTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciBtYW5hZ2VyIHBhc3Nlcy5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IE1hbmFnZXJQYXNzZXNDb25maWdcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTSEVFVF9JRCAtIFRoZSBJRCBvZiB0aGUgR29vZ2xlIFNoZWV0cyBzcHJlYWRzaGVldC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBNQU5BR0VSX1BBU1NfU0hFRVQgLSBUaGUgbmFtZSBvZiB0aGUgbWFuYWdlciBwYXNzIHNoZWV0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IE1BTkFHRVJfUEFTU19TSEVFVF9BVkFJTEFCTEVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgYXZhaWxhYmxlIHBhc3Nlcy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBNQU5BR0VSX1BBU1NfU0hFRVRfVVNFRF9UT0RBWV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBwYXNzZXMgdXNlZCB0b2RheS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBNQU5BR0VSX1BBU1NfU0hFRVRfVVNFRF9TRUFTT05fQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgZGF0ZXMgdXNlZCBmb3IgdGhpcyBzZWFzb24uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gTUFOQUdFUl9QQVNTX1NIRUVUX0RBVEVTX1NUQVJUSU5HX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIHN0YXJ0aW5nIGRhdGVzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IE1BTkFHRVJfUEFTU19TSEVFVF9OQU1FX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIG5hbWVzLlxuICovXG50eXBlIE1hbmFnZXJQYXNzZXNDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICBNQU5BR0VSX1BBU1NfU0hFRVQ6IHN0cmluZztcbiAgICBNQU5BR0VSX1BBU1NfU0hFRVRfQVZBSUxBQkxFX0NPTFVNTjogc3RyaW5nO1xuICAgIE1BTkFHRVJfUEFTU19TSEVFVF9VU0VEX1RPREFZX0NPTFVNTjogc3RyaW5nO1xuICAgIE1BTkFHRVJfUEFTU19TSEVFVF9VU0VEX1NFQVNPTl9DT0xVTU46IHN0cmluZztcbiAgICBNQU5BR0VSX1BBU1NfU0hFRVRfREFURVNfU1RBUlRJTkdfQ09MVU1OOiBzdHJpbmc7XG4gICAgTUFOQUdFUl9QQVNTX1NIRUVUX05BTUVfQ09MVU1OOiBzdHJpbmc7XG59O1xuY29uc3QgbWFuYWdlcl9wYXNzZXNfY29uZmlnOiBNYW5hZ2VyUGFzc2VzQ29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBcInRlc3RcIixcbiAgICBNQU5BR0VSX1BBU1NfU0hFRVQ6IFwiTWFuYWdlcnNcIixcbiAgICBNQU5BR0VSX1BBU1NfU0hFRVRfTkFNRV9DT0xVTU46IFwiQVwiLFxuICAgIE1BTkFHRVJfUEFTU19TSEVFVF9BVkFJTEFCTEVfQ09MVU1OOiBcIkVcIixcbiAgICBNQU5BR0VSX1BBU1NfU0hFRVRfVVNFRF9UT0RBWV9DT0xVTU46IFwiQ1wiLFxuICAgIE1BTkFHRVJfUEFTU19TSEVFVF9VU0VEX1NFQVNPTl9DT0xVTU46IFwiQlwiLFxuICAgIE1BTkFHRVJfUEFTU19TSEVFVF9EQVRFU19TVEFSVElOR19DT0xVTU46IFwiRlwiLFxufTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciB0aGUgaGFuZGxlci5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IEhhbmRsZXJDb25maWdcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTQ1JJUFRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBBcHBzIFNjcmlwdCBwcm9qZWN0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNIRUVUX0lEIC0gVGhlIElEIG9mIHRoZSBHb29nbGUgU2hlZXRzIHNwcmVhZHNoZWV0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNZTkNfU0lEIC0gVGhlIFNJRCBvZiB0aGUgVHdpbGlvIFN5bmMgc2VydmljZS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBSRVNFVF9GVU5DVElPTl9OQU1FIC0gVGhlIG5hbWUgb2YgdGhlIHJlc2V0IGZ1bmN0aW9uLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IEFSQ0hJVkVfRlVOQ1RJT05fTkFNRSAtIFRoZSBuYW1lIG9mIHRoZSBhcmNoaXZlIGZ1bmN0aW9uLlxuICogQHByb3BlcnR5IHtib29sZWFufSBVU0VfU0VSVklDRV9BQ0NPVU5UIC0gV2hldGhlciB0byB1c2UgYSBzZXJ2aWNlIGFjY291bnQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQUNUSU9OX0xPR19TSEVFVCAtIFRoZSBuYW1lIG9mIHRoZSBhY3Rpb24gbG9nIHNoZWV0LlxuICogQHByb3BlcnR5IHtDaGVja2luVmFsdWVbXX0gQ0hFQ0tJTl9WQUxVRVMgLSBUaGUgY2hlY2staW4gdmFsdWVzLlxuICovXG50eXBlIEhhbmRsZXJDb25maWcgPSB7XG4gICAgU0NSSVBUX0lEOiBzdHJpbmc7XG4gICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICBTWU5DX1NJRDogc3RyaW5nO1xuICAgIFJFU0VUX0ZVTkNUSU9OX05BTUU6IHN0cmluZztcbiAgICBBUkNISVZFX0ZVTkNUSU9OX05BTUU6IHN0cmluZztcbiAgICBVU0VfU0VSVklDRV9BQ0NPVU5UOiBib29sZWFuO1xuICAgIEFDVElPTl9MT0dfU0hFRVQ6IHN0cmluZztcbiAgICBDSEVDS0lOX1ZBTFVFUzogQ2hlY2tpblZhbHVlW107XG59O1xuY29uc3QgaGFuZGxlcl9jb25maWc6IEhhbmRsZXJDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IFwidGVzdFwiLFxuICAgIFNDUklQVF9JRDogXCJ0ZXN0XCIsXG4gICAgU1lOQ19TSUQ6IFwidGVzdFwiLFxuICAgIEFSQ0hJVkVfRlVOQ1RJT05fTkFNRTogXCJBcmNoaXZlXCIsXG4gICAgUkVTRVRfRlVOQ1RJT05fTkFNRTogXCJSZXNldFwiLFxuICAgIFVTRV9TRVJWSUNFX0FDQ09VTlQ6IHRydWUsXG4gICAgQUNUSU9OX0xPR19TSEVFVDogXCJCb3RfVXNhZ2VcIixcbiAgICBDSEVDS0lOX1ZBTFVFUzogW1xuICAgICAgICBuZXcgQ2hlY2tpblZhbHVlKFwiZGF5XCIsIFwiQWxsIERheVwiLCBcImFsbCBkYXkvREFZXCIsIFtcImNoZWNraW4tZGF5XCJdKSxcbiAgICAgICAgbmV3IENoZWNraW5WYWx1ZShcImFtXCIsIFwiSGFsZiBBTVwiLCBcIm1vcm5pbmcvQU1cIiwgW1wiY2hlY2tpbi1hbVwiXSksXG4gICAgICAgIG5ldyBDaGVja2luVmFsdWUoXCJwbVwiLCBcIkhhbGYgUE1cIiwgXCJhZnRlcm5vb24vUE1cIiwgW1wiY2hlY2tpbi1wbVwiXSksXG4gICAgICAgIG5ldyBDaGVja2luVmFsdWUoXCJvdXRcIiwgXCJDaGVja2VkIE91dFwiLCBcImNoZWNrIG91dC9PVVRcIiwgW1wiY2hlY2tvdXRcIiwgXCJjaGVjay1vdXRcIl0pLFxuICAgIF0sXG59O1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIHBhdHJvbGxlciByb3dzLlxuICogQHR5cGVkZWYge09iamVjdH0gUGF0cm9sbGVyUm93Q29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gTkFNRV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBuYW1lcy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDQVRFR09SWV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBjYXRlZ29yaWVzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNFQ1RJT05fRFJPUERPV05fQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3Igc2VjdGlvbiBkcm9wZG93bi5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDSEVDS0lOX0RST1BET1dOX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIGNoZWNrLWluIGRyb3Bkb3duLlxuICovXG50eXBlIFBhdHJvbGxlclJvd0NvbmZpZyA9IHtcbiAgICBOQU1FX0NPTFVNTjogc3RyaW5nO1xuICAgIENBVEVHT1JZX0NPTFVNTjogc3RyaW5nO1xuICAgIFNFQ1RJT05fRFJPUERPV05fQ09MVU1OOiBzdHJpbmc7XG4gICAgQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU46IHN0cmluZztcbn07XG5cbi8qKlxuICogQ29tYmluZWQgY29uZmlndXJhdGlvbiB0eXBlLlxuICogQHR5cGVkZWYge0hhbmRsZXJFbnZpcm9ubWVudCAmIFVzZXJDcmVkc0NvbmZpZyAmIEZpbmRQYXRyb2xsZXJDb25maWcgJiBMb2dpblNoZWV0Q29uZmlnICYgU2Vhc29uU2hlZXRDb25maWcgJiBTZWN0aW9uQ29uZmlnICYgQ29tcFBhc3Nlc0NvbmZpZyAmIE1hbmFnZXJQYXNzZXNDb25maWcgJiBIYW5kbGVyQ29uZmlnICYgUGF0cm9sbGVyUm93Q29uZmlnfSBDb21iaW5lZENvbmZpZ1xuICovXG50eXBlIENvbWJpbmVkQ29uZmlnID0gSGFuZGxlckVudmlyb25tZW50ICZcbiAgICBVc2VyQ3JlZHNDb25maWcgJlxuICAgIEZpbmRQYXRyb2xsZXJDb25maWcgJlxuICAgIExvZ2luU2hlZXRDb25maWcgJlxuICAgIFNlYXNvblNoZWV0Q29uZmlnICZcbiAgICBTZWN0aW9uQ29uZmlnICZcbiAgICBDb21wUGFzc2VzQ29uZmlnICZcbiAgICBNYW5hZ2VyUGFzc2VzQ29uZmlnICZcbiAgICBIYW5kbGVyQ29uZmlnICZcbiAgICBQYXRyb2xsZXJSb3dDb25maWc7XG5cbmNvbnN0IENPTkZJRzogQ29tYmluZWRDb25maWcgPSB7XG4gICAgLi4uaGFuZGxlcl9jb25maWcsXG4gICAgLi4uZmluZF9wYXRyb2xsZXJfY29uZmlnLFxuICAgIC4uLmxvZ2luX3NoZWV0X2NvbmZpZyxcbiAgICAuLi5jb21wX3Bhc3Nlc19jb25maWcsXG4gICAgLi4ubWFuYWdlcl9wYXNzZXNfY29uZmlnLFxuICAgIC4uLnNlYXNvbl9zaGVldF9jb25maWcsXG4gICAgLi4udXNlcl9jcmVkc19jb25maWcsXG4gICAgLi4uc2VjdGlvbl9jb25maWcsXG59O1xuXG5leHBvcnQge1xuICAgIENPTkZJRyxcbiAgICBDb21iaW5lZENvbmZpZyxcbiAgICBTZWN0aW9uQ29uZmlnLFxuICAgIENvbXBQYXNzZXNDb25maWcsXG4gICAgRmluZFBhdHJvbGxlckNvbmZpZyxcbiAgICBIYW5kbGVyQ29uZmlnLFxuICAgIGhhbmRsZXJfY29uZmlnLFxuICAgIEhhbmRsZXJFbnZpcm9ubWVudCxcbiAgICBNYW5hZ2VyUGFzc2VzQ29uZmlnLFxuICAgIFVzZXJDcmVkc0NvbmZpZyxcbiAgICBMb2dpblNoZWV0Q29uZmlnLFxuICAgIFNlYXNvblNoZWV0Q29uZmlnLFxuICAgIFBhdHJvbGxlclJvd0NvbmZpZyxcbn07IiwiaW1wb3J0IFwiQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlc1wiO1xuaW1wb3J0IHtcbiAgICBDb250ZXh0LFxuICAgIFNlcnZlcmxlc3NFdmVudE9iamVjdCxcbiAgICBTZXJ2aWNlQ29udGV4dCxcbiAgICBUd2lsaW9DbGllbnQsXG59IGZyb20gXCJAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzL3R5cGVzXCI7XG5pbXBvcnQgeyBnb29nbGUsIHNjcmlwdF92MSwgc2hlZXRzX3Y0IH0gZnJvbSBcImdvb2dsZWFwaXNcIjtcbmltcG9ydCB7IEdvb2dsZUF1dGggfSBmcm9tIFwiZ29vZ2xlYXBpcy1jb21tb25cIjtcbmltcG9ydCB7XG4gICAgQ09ORklHLFxuICAgIENvbWJpbmVkQ29uZmlnLFxuICAgIENvbXBQYXNzZXNDb25maWcsXG4gICAgRmluZFBhdHJvbGxlckNvbmZpZyxcbiAgICBIYW5kbGVyQ29uZmlnLFxuICAgIGhhbmRsZXJfY29uZmlnLFxuICAgIEhhbmRsZXJFbnZpcm9ubWVudCxcbiAgICBMb2dpblNoZWV0Q29uZmlnLFxuICAgIE1hbmFnZXJQYXNzZXNDb25maWcsXG4gICAgU2Vhc29uU2hlZXRDb25maWcsXG59IGZyb20gXCIuLi9lbnYvaGFuZGxlcl9jb25maWdcIjtcbmltcG9ydCBMb2dpblNoZWV0LCB7IFBhdHJvbGxlclJvdyB9IGZyb20gXCIuLi9zaGVldHMvbG9naW5fc2hlZXRcIjtcbmltcG9ydCBTZWFzb25TaGVldCBmcm9tIFwiLi4vc2hlZXRzL3NlYXNvbl9zaGVldFwiO1xuaW1wb3J0IHsgVXNlckNyZWRzIH0gZnJvbSBcIi4uL3VzZXItY3JlZHNcIjtcbmltcG9ydCB7IENoZWNraW5WYWx1ZXMgfSBmcm9tIFwiLi4vdXRpbHMvY2hlY2tpbl92YWx1ZXNcIjtcbmltcG9ydCB7IGdldF9zZXJ2aWNlX2NyZWRlbnRpYWxzX3BhdGggfSBmcm9tIFwiLi4vdXRpbHMvZmlsZV91dGlsc1wiO1xuaW1wb3J0IHsgZXhjZWxfcm93X3RvX2luZGV4LCBzYW5pdGl6ZV9waG9uZV9udW1iZXIgfSBmcm9tIFwiLi4vdXRpbHMvdXRpbFwiO1xuaW1wb3J0IHtcbiAgICBidWlsZF9wYXNzZXNfc3RyaW5nLFxuICAgIENvbXBQYXNzVHlwZSxcbiAgICBnZXRfY29tcF9wYXNzX2Rlc2NyaXB0aW9uLFxufSBmcm9tIFwiLi4vdXRpbHMvY29tcF9wYXNzZXNcIjtcbmltcG9ydCB7XG4gICAgQ29tcFBhc3NTaGVldCxcbiAgICBNYW5hZ2VyUGFzc1NoZWV0LFxuICAgIFBhc3NTaGVldCxcbn0gZnJvbSBcIi4uL3NoZWV0cy9jb21wX3Bhc3Nfc2hlZXRcIjtcbmltcG9ydCB7IFNlY3Rpb25WYWx1ZXMgfSBmcm9tICcuLi91dGlscy9zZWN0aW9uX3ZhbHVlcyc7XG5cbmV4cG9ydCB0eXBlIEJWTlNQQ2hlY2tpblJlc3BvbnNlID0ge1xuICAgIHJlc3BvbnNlPzogc3RyaW5nO1xuICAgIG5leHRfc3RlcD86IHN0cmluZztcbn07XG5leHBvcnQgdHlwZSBIYW5kbGVyRXZlbnQgPSBTZXJ2ZXJsZXNzRXZlbnRPYmplY3Q8XG4gICAge1xuICAgICAgICBGcm9tOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgICAgIFRvOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgICAgIG51bWJlcjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgICB0ZXN0X251bWJlcjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgICBCb2R5OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgfSxcbiAgICB7fSxcbiAgICB7XG4gICAgICAgIGJ2bnNwX2NoZWNraW5fbmV4dF9zdGVwOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgfVxuPjtcblxuZXhwb3J0IGNvbnN0IE5FWFRfU1RFUFMgPSB7XG4gICAgQVdBSVRfQ09NTUFORDogXCJhd2FpdC1jb21tYW5kXCIsXG4gICAgQVdBSVRfQ0hFQ0tJTjogXCJhd2FpdC1jaGVja2luXCIsXG4gICAgQ09ORklSTV9SRVNFVDogXCJjb25maXJtLXJlc2V0XCIsXG4gICAgQVVUSF9SRVNFVDogXCJhdXRoLXJlc2V0XCIsXG4gICAgQVdBSVRfU0VDVElPTjogXCJhd2FpdC1zZWN0aW9uXCIsXG4gICAgQVdBSVRfUEFTUzogXCJhd2FpdC1wYXNzXCIsXG59O1xuXG5jb25zdCBDT01NQU5EUyA9IHtcbiAgICBPTl9EVVRZOiBbXCJvbmR1dHlcIiwgXCJvbi1kdXR5XCJdLFxuICAgIFNUQVRVUzogW1wic3RhdHVzXCJdLFxuICAgIENIRUNLSU46IFtcImNoZWNraW5cIiwgXCJjaGVjay1pblwiXSxcbiAgICBTRUNUSU9OX0FTU0lHTk1FTlQ6IFtcInNlY3Rpb25cIiwgXCJzZWN0aW9uLWFzc2lnbm1lbnRcIiwgXCJzZWN0aW9uc2lnbm1lbnRcIiwgXCJhc3NpZ25tZW50XCJdLFxuICAgIENPTVBfUEFTUzogW1wiY29tcC1wYXNzXCIsIFwiY29tcHBhc3NcIl0sXG4gICAgTUFOQUdFUl9QQVNTOiBbXCJtYW5hZ2VyLXBhc3NcIiwgXCJtYW5hZ2VycGFzc1wiXSxcbiAgICBXSEFUU0FQUDogW1wid2hhdHNhcHBcIl0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCVk5TUENoZWNraW5IYW5kbGVyIHtcbiAgICBTQ09QRVM6IHN0cmluZ1tdID0gW1wiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9zcHJlYWRzaGVldHNcIl07XG5cbiAgICBzbXNfcmVxdWVzdDogYm9vbGVhbjtcbiAgICByZXN1bHRfbWVzc2FnZXM6IHN0cmluZ1tdID0gW107XG4gICAgZnJvbTogc3RyaW5nO1xuICAgIHRvOiBzdHJpbmc7XG4gICAgYm9keTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIGJvZHlfcmF3OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgcGF0cm9sbGVyOiBQYXRyb2xsZXJSb3cgfCBudWxsO1xuICAgIGJ2bnNwX2NoZWNraW5fbmV4dF9zdGVwOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgY2hlY2tpbl9tb2RlOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgICBmYXN0X2NoZWNraW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHR3aWxpb19jbGllbnQ6IFR3aWxpb0NsaWVudCB8IG51bGwgPSBudWxsO1xuICAgIHN5bmNfc2lkOiBzdHJpbmc7XG4gICAgcmVzZXRfc2NyaXB0X2lkOiBzdHJpbmc7XG5cbiAgICAvLyBDYWNoZSBjbGllbnRzXG4gICAgc3luY19jbGllbnQ6IFNlcnZpY2VDb250ZXh0IHwgbnVsbCA9IG51bGw7XG4gICAgdXNlcl9jcmVkczogVXNlckNyZWRzIHwgbnVsbCA9IG51bGw7XG4gICAgc2VydmljZV9jcmVkczogR29vZ2xlQXV0aCB8IG51bGwgPSBudWxsO1xuICAgIHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzIHwgbnVsbCA9IG51bGw7XG4gICAgdXNlcl9zY3JpcHRzX3NlcnZpY2U6IHNjcmlwdF92MS5TY3JpcHQgfCBudWxsID0gbnVsbDtcblxuICAgIGxvZ2luX3NoZWV0OiBMb2dpblNoZWV0IHwgbnVsbCA9IG51bGw7XG4gICAgc2Vhc29uX3NoZWV0OiBTZWFzb25TaGVldCB8IG51bGwgPSBudWxsO1xuICAgIGNvbXBfcGFzc19zaGVldDogQ29tcFBhc3NTaGVldCB8IG51bGwgPSBudWxsO1xuICAgIG1hbmFnZXJfcGFzc19zaGVldDogTWFuYWdlclBhc3NTaGVldCB8IG51bGwgPSBudWxsO1xuXG4gICAgY2hlY2tpbl92YWx1ZXM6IENoZWNraW5WYWx1ZXM7XG4gICAgY3VycmVudF9zaGVldF9kYXRlOiBEYXRlO1xuXG4gICAgY29tYmluZWRfY29uZmlnOiBDb21iaW5lZENvbmZpZztcbiAgICBjb25maWc6IEhhbmRsZXJDb25maWc7XG5cbiAgICBzZWN0aW9uX3ZhbHVlczogU2VjdGlvblZhbHVlcztcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgYSBuZXcgQlZOU1BDaGVja2luSGFuZGxlci5cbiAgICAgKiBAcGFyYW0ge0NvbnRleHQ8SGFuZGxlckVudmlyb25tZW50Pn0gY29udGV4dCAtIFRoZSBzZXJ2ZXJsZXNzIGZ1bmN0aW9uIGNvbnRleHQuXG4gICAgICogQHBhcmFtIHtTZXJ2ZXJsZXNzRXZlbnRPYmplY3Q8SGFuZGxlckV2ZW50Pn0gZXZlbnQgLSBUaGUgZXZlbnQgb2JqZWN0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBjb250ZXh0OiBDb250ZXh0PEhhbmRsZXJFbnZpcm9ubWVudD4sXG4gICAgICAgIGV2ZW50OiBTZXJ2ZXJsZXNzRXZlbnRPYmplY3Q8SGFuZGxlckV2ZW50PlxuICAgICkge1xuICAgICAgICAvLyBEZXRlcm1pbmUgbWVzc2FnZSBkZXRhaWxzIGZyb20gdGhlIGluY29taW5nIGV2ZW50LCB3aXRoIGZhbGxiYWNrIHZhbHVlc1xuICAgICAgICB0aGlzLnNtc19yZXF1ZXN0ID0gKGV2ZW50LkZyb20gfHwgZXZlbnQubnVtYmVyKSAhPT0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmZyb20gPSBldmVudC5Gcm9tIHx8IGV2ZW50Lm51bWJlciB8fCBldmVudC50ZXN0X251bWJlciE7XG4gICAgICAgIHRoaXMudG8gPSBzYW5pdGl6ZV9waG9uZV9udW1iZXIoZXZlbnQuVG8hKTtcbiAgICAgICAgdGhpcy5ib2R5ID0gZXZlbnQuQm9keT8udG9Mb3dlckNhc2UoKT8udHJpbSgpLnJlcGxhY2UoL1xccysvLCBcIi1cIik7XG4gICAgICAgIHRoaXMuYm9keV9yYXcgPSBldmVudC5Cb2R5XG4gICAgICAgIHRoaXMuYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXAgPVxuICAgICAgICAgICAgZXZlbnQucmVxdWVzdC5jb29raWVzLmJ2bnNwX2NoZWNraW5fbmV4dF9zdGVwO1xuICAgICAgICB0aGlzLmNvbWJpbmVkX2NvbmZpZyA9IHsgLi4uQ09ORklHLCAuLi5jb250ZXh0IH07XG4gICAgICAgIHRoaXMuY29uZmlnID0gdGhpcy5jb21iaW5lZF9jb25maWc7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMudHdpbGlvX2NsaWVudCA9IGNvbnRleHQuZ2V0VHdpbGlvQ2xpZW50KCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgaW5pdGlhbGl6aW5nIHR3aWxpb19jbGllbnRcIiwgZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zeW5jX3NpZCA9IGNvbnRleHQuU1lOQ19TSUQ7XG4gICAgICAgIHRoaXMucmVzZXRfc2NyaXB0X2lkID0gY29udGV4dC5TQ1JJUFRfSUQ7XG4gICAgICAgIHRoaXMucGF0cm9sbGVyID0gbnVsbDtcblxuICAgICAgICB0aGlzLmNoZWNraW5fdmFsdWVzID0gbmV3IENoZWNraW5WYWx1ZXMoaGFuZGxlcl9jb25maWcuQ0hFQ0tJTl9WQUxVRVMpO1xuICAgICAgICB0aGlzLmN1cnJlbnRfc2hlZXRfZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHRoaXMuc2VjdGlvbl92YWx1ZXMgPSBuZXcgU2VjdGlvblZhbHVlcyh0aGlzLmNvbWJpbmVkX2NvbmZpZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIHRoZSBmYXN0IGNoZWNrLWluIG1vZGUgZnJvbSB0aGUgbWVzc2FnZSBib2R5LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5IC0gVGhlIG1lc3NhZ2UgYm9keS5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBmYXN0IGNoZWNrLWluIG1vZGUgaXMgcGFyc2VkLCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICovXG4gICAgcGFyc2VfZmFzdF9jaGVja2luX21vZGUoYm9keTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHBhcnNlZCA9IHRoaXMuY2hlY2tpbl92YWx1ZXMucGFyc2VfZmFzdF9jaGVja2luKGJvZHkpO1xuICAgICAgICBpZiAocGFyc2VkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tpbl9tb2RlID0gcGFyc2VkLmtleTtcbiAgICAgICAgICAgIHRoaXMuZmFzdF9jaGVja2luID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZXMgdGhlIGNoZWNrLWluIG1vZGUgZnJvbSB0aGUgbWVzc2FnZSBib2R5LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5IC0gVGhlIG1lc3NhZ2UgYm9keS5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBjaGVjay1pbiBtb2RlIGlzIHBhcnNlZCwgb3RoZXJ3aXNlIGZhbHNlLlxuICAgICAqL1xuICAgIHBhcnNlX2NoZWNraW4oYm9keTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHBhcnNlZCA9IHRoaXMuY2hlY2tpbl92YWx1ZXMucGFyc2VfY2hlY2tpbihib2R5KTtcbiAgICAgICAgaWYgKHBhcnNlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNraW5fbW9kZSA9IHBhcnNlZC5rZXk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIHRoZSBjaGVjay1pbiBtb2RlIGZyb20gdGhlIG5leHQgc3RlcC5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBjaGVjay1pbiBtb2RlIGlzIHBhcnNlZCwgb3RoZXJ3aXNlIGZhbHNlLlxuICAgICAqL1xuICAgIHBhcnNlX2NoZWNraW5fZnJvbV9uZXh0X3N0ZXAoKSB7XG4gICAgICAgIGNvbnN0IGxhc3Rfc2VnbWVudCA9IHRoaXMuYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXBcbiAgICAgICAgICAgID8uc3BsaXQoXCItXCIpXG4gICAgICAgICAgICAuc2xpY2UoLTEpWzBdO1xuICAgICAgICBpZiAobGFzdF9zZWdtZW50ICYmIGxhc3Rfc2VnbWVudCBpbiB0aGlzLmNoZWNraW5fdmFsdWVzLmJ5X2tleSkge1xuICAgICAgICAgICAgdGhpcy5jaGVja2luX21vZGUgPSBsYXN0X3NlZ21lbnQ7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIHRoZSBwYXNzIHR5cGUgZnJvbSB0aGUgbmV4dCBzdGVwLlxuICAgICAqIEByZXR1cm5zIHtDb21wUGFzc1R5cGV9IFRoZSBwYXJzZWQgcGFzcyB0eXBlLlxuICAgICAqL1xuICAgIHBhcnNlX3Bhc3NfZnJvbV9uZXh0X3N0ZXAoKSB7XG4gICAgICAgIGNvbnN0IGxhc3Rfc2VnbWVudCA9IHRoaXMuYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXBcbiAgICAgICAgICAgID8uc3BsaXQoXCItXCIpXG4gICAgICAgICAgICAuc2xpY2UoLTIpXG4gICAgICAgICAgICAuam9pbihcIi1cIik7XG4gICAgICAgIHJldHVybiBsYXN0X3NlZ21lbnQgYXMgQ29tcFBhc3NUeXBlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlbGF5cyB0aGUgZXhlY3V0aW9uIGZvciBhIHNwZWNpZmllZCBudW1iZXIgb2Ygc2Vjb25kcy5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2Vjb25kcyAtIFRoZSBudW1iZXIgb2Ygc2Vjb25kcyB0byBkZWxheS5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25hbD1mYWxzZV0gLSBXaGV0aGVyIHRoZSBkZWxheSBpcyBvcHRpb25hbC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgYWZ0ZXIgdGhlIGRlbGF5LlxuICAgICAqL1xuICAgIGRlbGF5KHNlY29uZHM6IG51bWJlciwgb3B0aW9uYWw6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBpZiAob3B0aW9uYWwgJiYgIXRoaXMuc21zX3JlcXVlc3QpIHtcbiAgICAgICAgICAgIHNlY29uZHMgPSAxIC8gMTAwMC4wO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzKSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJlcywgc2Vjb25kcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbmRzIGEgbWVzc2FnZSB0byB0aGUgdXNlci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIFRoZSBtZXNzYWdlIHRvIHNlbmQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIG1lc3NhZ2UgaXMgc2VudC5cbiAgICAgKi9cbiAgICBhc3luYyBzZW5kX21lc3NhZ2UobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLnNtc19yZXF1ZXN0KSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmdldF90d2lsaW9fY2xpZW50KCkubWVzc2FnZXMuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICB0bzogdGhpcy5mcm9tLFxuICAgICAgICAgICAgICAgIGZyb206IHRoaXMudG8sXG4gICAgICAgICAgICAgICAgYm9keTogbWVzc2FnZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZXN1bHRfbWVzc2FnZXMucHVzaChtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgdGhlIGNoZWNrLWluIHByb2Nlc3MuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBjaGVjay1pbiByZXNwb25zZS5cbiAgICAgKi9cbiAgICBhc3luYyBoYW5kbGUoKTogUHJvbWlzZTxCVk5TUENoZWNraW5SZXNwb25zZT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLl9oYW5kbGUoKTtcbiAgICAgICAgaWYgKCF0aGlzLnNtc19yZXF1ZXN0KSB7XG4gICAgICAgICAgICBpZiAocmVzdWx0Py5yZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0X21lc3NhZ2VzLnB1c2gocmVzdWx0LnJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IHRoaXMucmVzdWx0X21lc3NhZ2VzLmpvaW4oXCJcXG4jIyNcXG5cIiksXG4gICAgICAgICAgICAgICAgbmV4dF9zdGVwOiByZXN1bHQ/Lm5leHRfc3RlcCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbnRlcm5hbCBtZXRob2QgdG8gaGFuZGxlIHRoZSBjaGVjay1pbiBwcm9jZXNzLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQQ2hlY2tpblJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgY2hlY2staW4gcmVzcG9uc2UuXG4gICAgICovXG4gICAgYXN5bmMgX2hhbmRsZSgpOiBQcm9taXNlPEJWTlNQQ2hlY2tpblJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgYFJlY2VpdmVkIHJlcXVlc3QgZnJvbSAke3RoaXMuZnJvbX0gd2l0aCBib2R5OiAke3RoaXMuYm9keX0gYW5kIHN0YXRlICR7dGhpcy5idm5zcF9jaGVja2luX25leHRfc3RlcH1gXG4gICAgICAgICk7XG4gICAgICAgIGlmICh0aGlzLmJvZHkgPT0gXCJsb2dvdXRcIikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmZvcm1pbmcgbG9nb3V0YCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5sb2dvdXQoKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVzcG9uc2U6IEJWTlNQQ2hlY2tpblJlc3BvbnNlIHwgdW5kZWZpbmVkO1xuICAgICAgICBpZiAoIXRoaXMuY29uZmlnLlVTRV9TRVJWSUNFX0FDQ09VTlQpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlID0gYXdhaXQgdGhpcy5jaGVja191c2VyX2NyZWRzKCk7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UpIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5ib2R5Py50b0xvd2VyQ2FzZSgpID09PSBcInJlc3RhcnRcIikge1xuICAgICAgICAgICAgcmV0dXJuIHsgcmVzcG9uc2U6IFwiT2theS4gVGV4dCBtZSBhZ2FpbiB0byBzdGFydCBvdmVyLi4uXCIgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3BvbnNlID0gYXdhaXQgdGhpcy5nZXRfbWFwcGVkX3BhdHJvbGxlcigpO1xuICAgICAgICBpZiAocmVzcG9uc2UgfHwgdGhpcy5wYXRyb2xsZXIgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICByZXNwb25zZSB8fCB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBcIlVuZXhwZWN0ZWQgZXJyb3IgbG9va2luZyB1cCBwYXRyb2xsZXIgbWFwcGluZ1wiLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICAoIXRoaXMuYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXAgfHxcbiAgICAgICAgICAgICAgICB0aGlzLmJ2bnNwX2NoZWNraW5fbmV4dF9zdGVwID09IE5FWFRfU1RFUFMuQVdBSVRfQ09NTUFORCkgJiZcbiAgICAgICAgICAgIHRoaXMuYm9keVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnN0IGF3YWl0X3Jlc3BvbnNlID0gYXdhaXQgdGhpcy5oYW5kbGVfYXdhaXRfY29tbWFuZCgpO1xuICAgICAgICAgICAgaWYgKGF3YWl0X3Jlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0X3Jlc3BvbnNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgdGhpcy5idm5zcF9jaGVja2luX25leHRfc3RlcCA9PSBORVhUX1NURVBTLkFXQUlUX0NIRUNLSU4gJiZcbiAgICAgICAgICAgIHRoaXMuYm9keVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcnNlX2NoZWNraW4odGhpcy5ib2R5KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmNoZWNraW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHRoaXMuYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXA/LnN0YXJ0c1dpdGgoXG4gICAgICAgICAgICAgICAgTkVYVF9TVEVQUy5DT05GSVJNX1JFU0VUXG4gICAgICAgICAgICApICYmXG4gICAgICAgICAgICB0aGlzLmJvZHlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5ib2R5ID09IFwieWVzXCIgJiYgdGhpcy5wYXJzZV9jaGVja2luX2Zyb21fbmV4dF9zdGVwKCkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICAgICAgYFBlcmZvcm1pbmcgcmVzZXRfc2hlZXRfZmxvdyBmb3IgJHt0aGlzLnBhdHJvbGxlci5uYW1lfSB3aXRoIGNoZWNraW4gbW9kZTogJHt0aGlzLmNoZWNraW5fbW9kZX1gXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAoYXdhaXQgdGhpcy5yZXNldF9zaGVldF9mbG93KCkpIHx8IChhd2FpdCB0aGlzLmNoZWNraW4oKSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgdGhpcy5idm5zcF9jaGVja2luX25leHRfc3RlcD8uc3RhcnRzV2l0aChORVhUX1NURVBTLkFVVEhfUkVTRVQpXG4gICAgICAgICkge1xuICAgICAgICAgICAgaWYgKHRoaXMucGFyc2VfY2hlY2tpbl9mcm9tX25leHRfc3RlcCgpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgICAgIGBQZXJmb3JtaW5nIHJlc2V0X3NoZWV0X2Zsb3ctcG9zdC1hdXRoIGZvciAke3RoaXMucGF0cm9sbGVyLm5hbWV9IHdpdGggY2hlY2tpbiBtb2RlOiAke3RoaXMuY2hlY2tpbl9tb2RlfWBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIChhd2FpdCB0aGlzLnJlc2V0X3NoZWV0X2Zsb3coKSkgfHwgKGF3YWl0IHRoaXMuY2hlY2tpbigpKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICB0aGlzLmJ2bnNwX2NoZWNraW5fbmV4dF9zdGVwPy5zdGFydHNXaXRoKE5FWFRfU1RFUFMuQVdBSVRfUEFTUykgJiZcbiAgICAgICAgICAgIHRoaXMuYm9keV9yYXdcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zdCB0eXBlID0gdGhpcy5wYXJzZV9wYXNzX2Zyb21fbmV4dF9zdGVwKCk7XG4gICAgICAgICAgICBjb25zdCBndWVzdF9uYW1lID0gdGhpcy5ib2R5X3JhdztcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBndWVzdF9uYW1lLnRyaW0oKSAhPT0gXCJcIiAmJlxuICAgICAgICAgICAgICAgIFtDb21wUGFzc1R5cGUuQ29tcFBhc3MsIENvbXBQYXNzVHlwZS5NYW5hZ2VyUGFzc10uaW5jbHVkZXModHlwZSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnByb21wdF9jb21wX21hbmFnZXJfcGFzcyh0eXBlLCBndWVzdF9uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHRoaXMuYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXA/LnN0YXJ0c1dpdGgoTkVYVF9TVEVQUy5BV0FJVF9TRUNUSU9OKSAmJlxuICAgICAgICAgICAgdGhpcy5ib2R5XG4gICAgICAgICkge1xuICAgICAgICAgICAgY29uc3Qgc2VjdGlvbiA9IHRoaXMuc2VjdGlvbl92YWx1ZXMucGFyc2Vfc2VjdGlvbih0aGlzLmJvZHkpXG4gICAgICAgICAgICBpZiAoc2VjdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmFzc2lnbl9zZWN0aW9uKHNlY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucHJvbXB0X3NlY3Rpb25fYXNzaWdubWVudCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXApIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuc2VuZF9tZXNzYWdlKFwiU29ycnksIEkgZGlkbid0IHVuZGVyc3RhbmQgdGhhdC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucHJvbXB0X2NvbW1hbmQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIHRoZSBhd2FpdCBjb21tYW5kIHN0ZXAuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2UgfCB1bmRlZmluZWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSByZXNwb25zZSBvciB1bmRlZmluZWQuXG4gICAgICovXG4gICAgYXN5bmMgaGFuZGxlX2F3YWl0X2NvbW1hbmQoKTogUHJvbWlzZTxCVk5TUENoZWNraW5SZXNwb25zZSB8IHVuZGVmaW5lZD4ge1xuICAgICAgICBjb25zdCBwYXRyb2xsZXJfbmFtZSA9IHRoaXMucGF0cm9sbGVyIS5uYW1lO1xuICAgICAgICBpZiAodGhpcy5wYXJzZV9mYXN0X2NoZWNraW5fbW9kZSh0aGlzLmJvZHkhKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgYFBlcmZvcm1pbmcgZmFzdCBjaGVja2luIGZvciAke3BhdHJvbGxlcl9uYW1lfSB3aXRoIG1vZGU6ICR7dGhpcy5jaGVja2luX21vZGV9YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmNoZWNraW4oKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQ09NTUFORFMuT05fRFVUWS5pbmNsdWRlcyh0aGlzLmJvZHkhKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmZvcm1pbmcgZ2V0X29uX2R1dHkgZm9yICR7cGF0cm9sbGVyX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4geyByZXNwb25zZTogYXdhaXQgdGhpcy5nZXRfb25fZHV0eSgpIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJDaGVja2luZyBmb3Igc3RhdHVzLi4uXCIpO1xuICAgICAgICBpZiAoQ09NTUFORFMuU1RBVFVTLmluY2x1ZGVzKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBnZXRfc3RhdHVzIGZvciAke3BhdHJvbGxlcl9uYW1lfWApO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X3N0YXR1cygpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDT01NQU5EUy5DSEVDS0lOLmluY2x1ZGVzKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBwcm9tcHRfY2hlY2tpbiBmb3IgJHtwYXRyb2xsZXJfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb21wdF9jaGVja2luKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKENPTU1BTkRTLkNPTVBfUEFTUy5pbmNsdWRlcyh0aGlzLmJvZHkhKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmZvcm1pbmcgY29tcF9wYXNzIGZvciAke3BhdHJvbGxlcl9uYW1lfWApO1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucHJvbXB0X2NvbXBfbWFuYWdlcl9wYXNzKFxuICAgICAgICAgICAgICAgIENvbXBQYXNzVHlwZS5Db21wUGFzcyxcbiAgICAgICAgICAgICAgICBudWxsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDT01NQU5EUy5TRUNUSU9OX0FTU0lHTk1FTlQuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIHNlY3Rpb25fYXNzaWdubWVudCBmb3IgJHtwYXRyb2xsZXJfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnByb21wdF9zZWN0aW9uX2Fzc2lnbm1lbnQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQ09NTUFORFMuTUFOQUdFUl9QQVNTLmluY2x1ZGVzKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBtYW5hZ2VyX3Bhc3MgZm9yICR7cGF0cm9sbGVyX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5wcm9tcHRfY29tcF9tYW5hZ2VyX3Bhc3MoXG4gICAgICAgICAgICAgICAgQ29tcFBhc3NUeXBlLk1hbmFnZXJQYXNzLFxuICAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKENPTU1BTkRTLldIQVRTQVBQLmluY2x1ZGVzKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgSSdtIGF2YWlsYWJsZSBvbiB3aGF0c2FwcCBhcyB3ZWxsISBXaGF0c2FwcCB1c2VzIFdpZmkvQ2VsbCBEYXRhIGluc3RlYWQgb2YgU01TLCBhbmQgY2FuIGJlIG1vcmUgcmVsaWFibGUuIE1lc3NhZ2UgbWUgYXQgaHR0cHM6Ly93YS5tZS8xJHt0aGlzLnRvfWAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvbXB0cyB0aGUgdXNlciBmb3IgYSBjb21tYW5kLlxuICAgICAqIEByZXR1cm5zIHtCVk5TUENoZWNraW5SZXNwb25zZX0gVGhlIHJlc3BvbnNlIHByb21wdGluZyB0aGUgdXNlciBmb3IgYSBjb21tYW5kLlxuICAgICAqL1xuICAgIHByb21wdF9jb21tYW5kKCk6IEJWTlNQQ2hlY2tpblJlc3BvbnNlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3BvbnNlOiBgJHt0aGlzLnBhdHJvbGxlciEubmFtZX0sIEknbSB0aGUgQlZOU1AgQm90LlxuRW50ZXIgYSBjb21tYW5kOlxuQ2hlY2sgaW4gLyBDaGVjayBvdXQgLyBTdGF0dXMgLyBPbiBEdXR5IC8gQXJlYSBBc3NpZ25tZW50IC8gQ29tcCBQYXNzIC8gTWFuYWdlciBQYXNzIC8gV2hhdHNhcHBcblNlbmQgJ3Jlc3RhcnQnIGF0IGFueSB0aW1lIHRvIGJlZ2luIGFnYWluYCxcbiAgICAgICAgICAgIG5leHRfc3RlcDogTkVYVF9TVEVQUy5BV0FJVF9DT01NQU5ELFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb21wdHMgdGhlIHVzZXIgZm9yIGEgY2hlY2staW4uXG4gICAgICogQHJldHVybnMge0JWTlNQQ2hlY2tpblJlc3BvbnNlfSBUaGUgcmVzcG9uc2UgcHJvbXB0aW5nIHRoZSB1c2VyIGZvciBhIGNoZWNrLWluLlxuICAgICAqL1xuICAgIHByb21wdF9jaGVja2luKCk6IEJWTlNQQ2hlY2tpblJlc3BvbnNlIHtcbiAgICAgICAgY29uc3QgdHlwZXMgPSBPYmplY3QudmFsdWVzKHRoaXMuY2hlY2tpbl92YWx1ZXMuYnlfa2V5KS5tYXAoXG4gICAgICAgICAgICAoeCkgPT4geC5zbXNfZGVzY1xuICAgICAgICApO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IGAke1xuICAgICAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyIS5uYW1lXG4gICAgICAgICAgICB9LCB1cGRhdGUgcGF0cm9sbGluZyBzdGF0dXMgdG86ICR7dHlwZXNcbiAgICAgICAgICAgICAgICAuc2xpY2UoMCwgLTEpXG4gICAgICAgICAgICAgICAgLmpvaW4oXCIsIFwiKX0sIG9yICR7dHlwZXMuc2xpY2UoLTEpfT9gLFxuICAgICAgICAgICAgbmV4dF9zdGVwOiBORVhUX1NURVBTLkFXQUlUX0NIRUNLSU4sXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvbXB0cyB0aGUgdXNlciBmb3Igc2VjdGlvbiBhc3NpZ25tZW50LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQQ2hlY2tpblJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcmVzcG9uc2UuXG4gICAgICovXG4gICAgYXN5bmMgcHJvbXB0X3NlY3Rpb25fYXNzaWdubWVudCgpOiBQcm9taXNlPEJWTlNQQ2hlY2tpblJlc3BvbnNlPiB7XG4gICAgICAgIGlmICghdGhpcy5wYXRyb2xsZXIgfHwgIXRoaXMucGF0cm9sbGVyLmNoZWNraW4pIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGAke3RoaXMucGF0cm9sbGVyIS5uYW1lfSBpcyBub3QgY2hlY2tlZCBpbi5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZWN0aW9uX2Rlc2NyaXB0aW9uID0gdGhpcy5zZWN0aW9uX3ZhbHVlcy5nZXRfc2VjdGlvbl9kZXNjcmlwdGlvbigpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IGBFbnRlciB5b3VyIGFzc2lnbmVkIHNlY3Rpb247IG9uZSBvZiAke3NlY3Rpb25fZGVzY3JpcHRpb259IChvciAncmVzdGFydCcpYCxcbiAgICAgICAgICAgIG5leHRfc3RlcDogTkVYVF9TVEVQUy5BV0FJVF9TRUNUSU9OLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFzc2lnbnMgdGhlIHNlY3Rpb24gdG8gdGhlIHBhdHJvbGxlci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VjdGlvbiAtIFRoZSBzZWN0aW9uIHRvIGFzc2lnbi5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUENoZWNraW5SZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHJlc3BvbnNlLlxuICAgICAqL1xuICAgIGFzeW5jIGFzc2lnbl9zZWN0aW9uKHNlY3Rpb246IHN0cmluZyk6IFByb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc29sZS5sb2coYEFzc2lnbmluZyBzZWN0aW9uICR7dGhpcy5wYXRyb2xsZXIhLm5hbWV9IHRvICR7c2VjdGlvbn1gKTtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKGBhc3NpZ25fc2VjdGlvbigke3NlY3Rpb259KWApO1xuICAgICAgICBjb25zdCBsb2dpbl9zaGVldD0gYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKVxuICAgICAgICBhd2FpdCBsb2dpbl9zaGVldC5hc3NpZ25fc2VjdGlvbih0aGlzLnBhdHJvbGxlciEsIHNlY3Rpb24pO1xuICAgICAgICBhd2FpdCB0aGlzLmxvZ2luX3NoZWV0Py5yZWZyZXNoKCk7XG4gICAgICAgIGF3YWl0IHRoaXMuZ2V0X21hcHBlZF9wYXRyb2xsZXIodHJ1ZSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZTogYFVwZGF0ZWQgJHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICAgICAgfSB3aXRoIHNlY3Rpb24gYXNzaWdubWVudDogJHtzZWN0aW9ufS5gLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb21wdHMgdGhlIHVzZXIgZm9yIGEgY29tcCBvciBtYW5hZ2VyIHBhc3MuXG4gICAgICogQHBhcmFtIHtDb21wUGFzc1R5cGV9IHBhc3NfdHlwZSAtIFRoZSB0eXBlIG9mIHBhc3MuXG4gICAgICogQHBhcmFtIHtudW1iZXIgfCBudWxsfSBwYXNzZXNfdG9fdXNlIC0gVGhlIG51bWJlciBvZiBwYXNzZXMgdG8gdXNlLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQQ2hlY2tpblJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcmVzcG9uc2UuXG4gICAgICovXG4gICAgYXN5bmMgcHJvbXB0X2NvbXBfbWFuYWdlcl9wYXNzKFxuICAgICAgICBwYXNzX3R5cGU6IENvbXBQYXNzVHlwZSxcbiAgICAgICAgZ3Vlc3RfbmFtZTogc3RyaW5nIHwgbnVsbFxuICAgICk6IFByb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2U+IHtcbiAgICAgICAgaWYgKHRoaXMucGF0cm9sbGVyIS5jYXRlZ29yeSA9PSBcIkNcIikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYCR7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyIS5uYW1lXG4gICAgICAgICAgICAgICAgfSwgY2FuZGlkYXRlcyBkbyBub3QgcmVjZWl2ZSBjb21wIG9yIG1hbmFnZXIgcGFzc2VzLmAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNoZWV0OiBQYXNzU2hlZXQgPSBhd2FpdCAocGFzc190eXBlID09IENvbXBQYXNzVHlwZS5Db21wUGFzc1xuICAgICAgICAgICAgPyB0aGlzLmdldF9jb21wX3Bhc3Nfc2hlZXQoKVxuICAgICAgICAgICAgOiB0aGlzLmdldF9tYW5hZ2VyX3Bhc3Nfc2hlZXQoKSk7XG5cbiAgICAgICAgY29uc3QgdXNlZF9hbmRfYXZhaWxhYmxlID0gYXdhaXQgc2hlZXQuZ2V0X2F2YWlsYWJsZV9hbmRfdXNlZF9wYXNzZXMoXG4gICAgICAgICAgICB0aGlzLnBhdHJvbGxlcj8ubmFtZSFcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHVzZWRfYW5kX2F2YWlsYWJsZSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBcIlByb2JsZW0gbG9va2luZyB1cCBwYXRyb2xsZXIgZm9yIGNvbXAgcGFzc2VzXCIsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChndWVzdF9uYW1lID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB1c2VkX2FuZF9hdmFpbGFibGUuZ2V0X3Byb21wdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKGB1c2VfJHtwYXNzX3R5cGV9YCk7XG4gICAgICAgICAgICBhd2FpdCBzaGVldC5zZXRfdXNlZF9jb21wX3Bhc3Nlcyh1c2VkX2FuZF9hdmFpbGFibGUsIGd1ZXN0X25hbWUpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYFVwZGF0ZWQgJHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXIhLm5hbWVcbiAgICAgICAgICAgICAgICB9IHRvIHVzZSAke2dldF9jb21wX3Bhc3NfZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIHBhc3NfdHlwZVxuICAgICAgICAgICAgICAgICl9IGZvciBndWVzdCBcIiR7Z3Vlc3RfbmFtZX1cIiB0b2RheS5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHN0YXR1cyBvZiB0aGUgcGF0cm9sbGVyLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQQ2hlY2tpblJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgc3RhdHVzIHJlc3BvbnNlLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF9zdGF0dXMoKTogUHJvbWlzZTxCVk5TUENoZWNraW5SZXNwb25zZT4ge1xuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG4gICAgICAgIGNvbnN0IHNoZWV0X2RhdGUgPSBsb2dpbl9zaGVldC5zaGVldF9kYXRlLnRvRGF0ZVN0cmluZygpO1xuICAgICAgICBjb25zdCBjdXJyZW50X2RhdGUgPSBsb2dpbl9zaGVldC5jdXJyZW50X2RhdGUudG9EYXRlU3RyaW5nKCk7XG4gICAgICAgIGlmICghbG9naW5fc2hlZXQuaXNfY3VycmVudCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYHNoZWV0X2RhdGU6ICR7bG9naW5fc2hlZXQuc2hlZXRfZGF0ZX1gKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBjdXJyZW50X2RhdGU6ICR7bG9naW5fc2hlZXQuY3VycmVudF9kYXRlfWApO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYFNoZWV0IGlzIG5vdCBjdXJyZW50IGZvciB0b2RheSAobGFzdCByZXNldDogJHtzaGVldF9kYXRlfSkuICR7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyIS5uYW1lXG4gICAgICAgICAgICAgICAgfSBpcyBub3QgY2hlY2tlZCBpbiBmb3IgJHtjdXJyZW50X2RhdGV9LmAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0geyByZXNwb25zZTogYXdhaXQgdGhpcy5nZXRfc3RhdHVzX3N0cmluZygpIH07XG4gICAgICAgIGF3YWl0IHRoaXMubG9nX2FjdGlvbihcInN0YXR1c1wiKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHN0YXR1cyBzdHJpbmcgb2YgdGhlIHBhdHJvbGxlci5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzdHJpbmc+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBzdGF0dXMgc3RyaW5nLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF9zdGF0dXNfc3RyaW5nKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKTtcbiAgICAgICAgY29uc3QgY29tcF9wYXNzX3Byb21pc2UgPSAoXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmdldF9jb21wX3Bhc3Nfc2hlZXQoKVxuICAgICAgICApLmdldF9hdmFpbGFibGVfYW5kX3VzZWRfcGFzc2VzKHRoaXMucGF0cm9sbGVyIS5uYW1lKTtcbiAgICAgICAgY29uc3QgbWFuYWdlcl9wYXNzX3Byb21pc2UgPSAoXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmdldF9tYW5hZ2VyX3Bhc3Nfc2hlZXQoKVxuICAgICAgICApLmdldF9hdmFpbGFibGVfYW5kX3VzZWRfcGFzc2VzKHRoaXMucGF0cm9sbGVyIS5uYW1lKTtcbiAgICAgICAgY29uc3QgcGF0cm9sbGVyX3N0YXR1cyA9IHRoaXMucGF0cm9sbGVyITtcblxuICAgICAgICBjb25zdCBjaGVja2luQ29sdW1uU2V0ID1cbiAgICAgICAgICAgIHBhdHJvbGxlcl9zdGF0dXMuY2hlY2tpbiAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICBwYXRyb2xsZXJfc3RhdHVzLmNoZWNraW4gIT09IG51bGw7XG4gICAgICAgIGNvbnN0IGNoZWNrZWRPdXQgPVxuICAgICAgICAgICAgY2hlY2tpbkNvbHVtblNldCAmJlxuICAgICAgICAgICAgdGhpcy5jaGVja2luX3ZhbHVlcy5ieV9zaGVldF9zdHJpbmdbcGF0cm9sbGVyX3N0YXR1cy5jaGVja2luXS5rZXkgPT1cbiAgICAgICAgICAgICAgICBcIm91dFwiO1xuICAgICAgICBsZXQgc3RhdHVzID0gcGF0cm9sbGVyX3N0YXR1cy5jaGVja2luIHx8IFwiTm90IFByZXNlbnRcIjtcblxuICAgICAgICBpZiAoY2hlY2tlZE91dCkge1xuICAgICAgICAgICAgc3RhdHVzID0gXCJDaGVja2VkIE91dFwiO1xuICAgICAgICB9IGVsc2UgaWYgKGNoZWNraW5Db2x1bW5TZXQpIHtcbiAgICAgICAgICAgIGxldCBzZWN0aW9uID0gcGF0cm9sbGVyX3N0YXR1cy5zZWN0aW9uLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBpZiAoc2VjdGlvbi5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgICAgIHNlY3Rpb24gPSBgU2VjdGlvbiAke3NlY3Rpb259YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0YXR1cyA9IGAke3BhdHJvbGxlcl9zdGF0dXMuY2hlY2tpbn0gKCR7c2VjdGlvbn0pYDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbXBsZXRlZFBhdHJvbERheXMgPSBhd2FpdCAoXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmdldF9zZWFzb25fc2hlZXQoKVxuICAgICAgICApLmdldF9wYXRyb2xsZWRfZGF5cyh0aGlzLnBhdHJvbGxlciEubmFtZSk7XG4gICAgICAgIGNvbnN0IGNvbXBsZXRlZFBhdHJvbERheXNTdHJpbmcgPVxuICAgICAgICAgICAgY29tcGxldGVkUGF0cm9sRGF5cyA+IDAgPyBjb21wbGV0ZWRQYXRyb2xEYXlzLnRvU3RyaW5nKCkgOiBcIk5vXCI7XG4gICAgICAgIGNvbnN0IGxvZ2luU2hlZXREYXRlID0gbG9naW5fc2hlZXQuc2hlZXRfZGF0ZS50b0RhdGVTdHJpbmcoKTtcblxuICAgICAgICBsZXQgc3RhdHVzU3RyaW5nID0gYFN0YXR1cyBmb3IgJHtcbiAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyIS5uYW1lXG4gICAgICAgIH0gb24gZGF0ZSAke2xvZ2luU2hlZXREYXRlfTogJHtzdGF0dXN9LlxcbiR7Y29tcGxldGVkUGF0cm9sRGF5c1N0cmluZ30gY29tcGxldGVkIHBhdHJvbCBkYXlzIHByaW9yIHRvIHRvZGF5LmA7XG4gICAgICAgIGNvbnN0IHVzZWRUb2RheUNvbXBQYXNzZXMgPSAoYXdhaXQgY29tcF9wYXNzX3Byb21pc2UpPy51c2VkX3RvZGF5IHx8IDA7XG4gICAgICAgIGNvbnN0IHVzZWRUb2RheU1hbmFnZXJQYXNzZXMgPVxuICAgICAgICAgICAgKGF3YWl0IG1hbmFnZXJfcGFzc19wcm9taXNlKT8udXNlZF90b2RheSB8fCAwO1xuICAgICAgICBjb25zdCB1c2VkU2Vhc29uQ29tcFBhc3NlcyA9XG4gICAgICAgICAgICAoYXdhaXQgY29tcF9wYXNzX3Byb21pc2UpPy51c2VkX3NlYXNvbiB8fCAwO1xuICAgICAgICBjb25zdCB1c2VkU2Vhc29uTWFuYWdlclBhc3NlcyA9XG4gICAgICAgICAgICAoYXdhaXQgbWFuYWdlcl9wYXNzX3Byb21pc2UpPy51c2VkX3NlYXNvbiB8fCAwO1xuICAgICAgICBjb25zdCBhdmFpbGFibGVDb21wUGFzc2VzID0gKGF3YWl0IGNvbXBfcGFzc19wcm9taXNlKT8uYXZhaWxhYmxlIHx8IDA7XG4gICAgICAgIGNvbnN0IGF2YWlsYWJsZU1hbmFnZXJQYXNzZXMgPVxuICAgICAgICAgICAgKGF3YWl0IG1hbmFnZXJfcGFzc19wcm9taXNlKT8uYXZhaWxhYmxlIHx8IDA7XG5cbiAgICAgICAgc3RhdHVzU3RyaW5nICs9XG4gICAgICAgICAgICBcIiBcIiArXG4gICAgICAgICAgICBidWlsZF9wYXNzZXNfc3RyaW5nKFxuICAgICAgICAgICAgICAgIHVzZWRTZWFzb25Db21wUGFzc2VzLFxuICAgICAgICAgICAgICAgIHVzZWRTZWFzb25Db21wUGFzc2VzICsgYXZhaWxhYmxlQ29tcFBhc3NlcyxcbiAgICAgICAgICAgICAgICB1c2VkVG9kYXlDb21wUGFzc2VzLFxuICAgICAgICAgICAgICAgIFwiY29tcCBwYXNzZXNcIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgaWYgKHVzZWRTZWFzb25NYW5hZ2VyUGFzc2VzICsgYXZhaWxhYmxlTWFuYWdlclBhc3NlcyA+IDApIHtcbiAgICAgICAgICAgIHN0YXR1c1N0cmluZyArPVxuICAgICAgICAgICAgICAgIFwiIFwiICtcbiAgICAgICAgICAgICAgICBidWlsZF9wYXNzZXNfc3RyaW5nKFxuICAgICAgICAgICAgICAgICAgICB1c2VkU2Vhc29uTWFuYWdlclBhc3NlcyxcbiAgICAgICAgICAgICAgICAgICAgdXNlZFNlYXNvbk1hbmFnZXJQYXNzZXMgKyBhdmFpbGFibGVNYW5hZ2VyUGFzc2VzLFxuICAgICAgICAgICAgICAgICAgICB1c2VkVG9kYXlNYW5hZ2VyUGFzc2VzLFxuICAgICAgICAgICAgICAgICAgICBcIm1hbmFnZXIgcGFzc2VzXCJcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdGF0dXNTdHJpbmc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgdGhlIGNoZWNrLWluIHByb2Nlc3MgZm9yIHRoZSBwYXRyb2xsZXIuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBjaGVjay1pbiByZXNwb25zZS5cbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gVGhyb3dzIGFuIGVycm9yIGlmIHRoZSBjaGVjay1pbiBtb2RlIGlzIGltcHJvcGVybHkgc2V0LlxuICAgICAqL1xuICAgIGFzeW5jIGNoZWNraW4oKTogUHJvbWlzZTxCVk5TUENoZWNraW5SZXNwb25zZT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgIGBQZXJmb3JtaW5nIHJlZ3VsYXIgY2hlY2tpbiBmb3IgJHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICAgICAgfSB3aXRoIG1vZGU6ICR7dGhpcy5jaGVja2luX21vZGV9YFxuICAgICAgICApO1xuICAgICAgICBpZiAoYXdhaXQgdGhpcy5zaGVldF9uZWVkc19yZXNldCgpKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOlxuICAgICAgICAgICAgICAgICAgICBgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyIS5uYW1lXG4gICAgICAgICAgICAgICAgICAgIH0sIHlvdSBhcmUgdGhlIGZpcnN0IHBlcnNvbiB0byBjaGVjayBpbiB0b2RheS4gYCArXG4gICAgICAgICAgICAgICAgICAgIGBJIG5lZWQgdG8gYXJjaGl2ZSBhbmQgcmVzZXQgdGhlIHNoZWV0IGJlZm9yZSBjb250aW51aW5nLiBgICtcbiAgICAgICAgICAgICAgICAgICAgYFdvdWxkIHlvdSBsaWtlIG1lIHRvIGRvIHRoYXQ/IChZZXMvTm8pYCxcbiAgICAgICAgICAgICAgICBuZXh0X3N0ZXA6IGAke05FWFRfU1RFUFMuQ09ORklSTV9SRVNFVH0tJHt0aGlzLmNoZWNraW5fbW9kZX1gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY2hlY2tpbl9tb2RlO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICAhdGhpcy5jaGVja2luX21vZGUgfHxcbiAgICAgICAgICAgIChjaGVja2luX21vZGUgPSB0aGlzLmNoZWNraW5fdmFsdWVzLmJ5X2tleVt0aGlzLmNoZWNraW5fbW9kZV0pID09PVxuICAgICAgICAgICAgICAgIHVuZGVmaW5lZFxuICAgICAgICApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNoZWNraW4gbW9kZSBpbXByb3Blcmx5IHNldFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKTtcbiAgICAgICAgY29uc3QgbmV3X2NoZWNraW5fdmFsdWUgPSBjaGVja2luX21vZGUuc2hlZXRzX3ZhbHVlO1xuICAgICAgICBhd2FpdCBsb2dpbl9zaGVldC5jaGVja2luKHRoaXMucGF0cm9sbGVyISwgbmV3X2NoZWNraW5fdmFsdWUpO1xuICAgICAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oYHVwZGF0ZS1zdGF0dXMoJHtuZXdfY2hlY2tpbl92YWx1ZX0pYCk7XG4gICAgICAgIGF3YWl0IHRoaXMubG9naW5fc2hlZXQ/LnJlZnJlc2goKTtcbiAgICAgICAgYXdhaXQgdGhpcy5nZXRfbWFwcGVkX3BhdHJvbGxlcih0cnVlKTtcblxuICAgICAgICBsZXQgcmVzcG9uc2UgPSBgVXBkYXRpbmcgJHtcbiAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyIS5uYW1lXG4gICAgICAgIH0gd2l0aCBzdGF0dXM6ICR7bmV3X2NoZWNraW5fdmFsdWV9LmA7XG4gICAgICAgIGlmICghdGhpcy5mYXN0X2NoZWNraW4pIHtcbiAgICAgICAgICAgIHJlc3BvbnNlICs9IGAgWW91IGNhbiBzZW5kICcke2NoZWNraW5fbW9kZS5mYXN0X2NoZWNraW5zWzBdfScgYXMgeW91ciBmaXJzdCBtZXNzYWdlIGZvciBhIGZhc3QgJHtjaGVja2luX21vZGUuc2hlZXRzX3ZhbHVlfSBjaGVja2luIG5leHQgdGltZS5gO1xuICAgICAgICB9XG4gICAgICAgIHJlc3BvbnNlICs9IFwiXFxuXFxuXCIgKyAoYXdhaXQgdGhpcy5nZXRfc3RhdHVzX3N0cmluZygpKTtcbiAgICAgICAgcmV0dXJuIHsgcmVzcG9uc2U6IHJlc3BvbnNlIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHRoZSBHb29nbGUgU2hlZXRzIG5lZWRzIHRvIGJlIHJlc2V0LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0cnVlIGlmIHRoZSBzaGVldCBuZWVkcyB0byBiZSByZXNldCwgb3RoZXJ3aXNlIGZhbHNlLlxuICAgICAqL1xuICAgIGFzeW5jIHNoZWV0X25lZWRzX3Jlc2V0KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG5cbiAgICAgICAgY29uc3Qgc2hlZXRfZGF0ZSA9IGxvZ2luX3NoZWV0LnNoZWV0X2RhdGU7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfZGF0ZSA9IGxvZ2luX3NoZWV0LmN1cnJlbnRfZGF0ZTtcbiAgICAgICAgY29uc29sZS5sb2coYHNoZWV0X2RhdGU6ICR7c2hlZXRfZGF0ZX1gKTtcbiAgICAgICAgY29uc29sZS5sb2coYGN1cnJlbnRfZGF0ZTogJHtjdXJyZW50X2RhdGV9YCk7XG5cbiAgICAgICAgY29uc29sZS5sb2coYGRhdGVfaXNfY3VycmVudDogJHtsb2dpbl9zaGVldC5pc19jdXJyZW50fWApO1xuXG4gICAgICAgIHJldHVybiAhbG9naW5fc2hlZXQuaXNfY3VycmVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXNldHMgdGhlIEdvb2dsZSBTaGVldHMgZmxvdywgaW5jbHVkaW5nIGFyY2hpdmluZyBhbmQgcmVzZXR0aW5nIHRoZSBzaGVldCBpZiBuZWNlc3NhcnkuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2UgfCB2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgY2hlY2staW4gcmVzcG9uc2Ugb3Igdm9pZC5cbiAgICAgKi9cbiAgICBhc3luYyByZXNldF9zaGVldF9mbG93KCk6IFByb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2UgfCB2b2lkPiB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5jaGVja191c2VyX2NyZWRzKFxuICAgICAgICAgICAgYCR7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXIhLm5hbWVcbiAgICAgICAgICAgIH0sIGluIG9yZGVyIHRvIHJlc2V0L2FyY2hpdmUsIEkgbmVlZCB5b3UgdG8gYXV0aG9yaXplIHRoZSBhcHAuYFxuICAgICAgICApO1xuICAgICAgICBpZiAocmVzcG9uc2UpXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiByZXNwb25zZS5yZXNwb25zZSxcbiAgICAgICAgICAgICAgICBuZXh0X3N0ZXA6IGAke05FWFRfU1RFUFMuQVVUSF9SRVNFVH0tJHt0aGlzLmNoZWNraW5fbW9kZX1gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucmVzZXRfc2hlZXQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXNldHMgdGhlIEdvb2dsZSBTaGVldHMsIGluY2x1ZGluZyBhcmNoaXZpbmcgYW5kIHJlc2V0dGluZyB0aGUgc2hlZXQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHNoZWV0IGlzIHJlc2V0LlxuICAgICAqL1xuICAgIGFzeW5jIHJlc2V0X3NoZWV0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCBzY3JpcHRfc2VydmljZSA9IGF3YWl0IHRoaXMuZ2V0X3VzZXJfc2NyaXB0c19zZXJ2aWNlKCk7XG4gICAgICAgIGNvbnN0IHNob3VsZF9wZXJmb3JtX2FyY2hpdmUgPSAhKGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCkpLmFyY2hpdmVkO1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gc2hvdWxkX3BlcmZvcm1fYXJjaGl2ZVxuICAgICAgICAgICAgPyBcIk9rYXkuIEFyY2hpdmluZyBhbmQgcmVzZXRpbmcgdGhlIGNoZWNrIGluIHNoZWV0LiBUaGlzIHRha2VzIGFib3V0IDEwIHNlY29uZHMuLi5cIlxuICAgICAgICAgICAgOiBcIk9rYXkuIFNoZWV0IGhhcyBhbHJlYWR5IGJlZW4gYXJjaGl2ZWQuIFBlcmZvcm1pbmcgcmVzZXQuIFRoaXMgdGFrZXMgYWJvdXQgNSBzZWNvbmRzLi4uXCI7XG4gICAgICAgIGF3YWl0IHRoaXMuc2VuZF9tZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICBpZiAoc2hvdWxkX3BlcmZvcm1fYXJjaGl2ZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJBcmNoaXZpbmcuLi5cIik7XG5cbiAgICAgICAgICAgIGF3YWl0IHNjcmlwdF9zZXJ2aWNlLnNjcmlwdHMucnVuKHtcbiAgICAgICAgICAgICAgICBzY3JpcHRJZDogdGhpcy5yZXNldF9zY3JpcHRfaWQsXG4gICAgICAgICAgICAgICAgcmVxdWVzdEJvZHk6IHsgZnVuY3Rpb246IHRoaXMuY29uZmlnLkFSQ0hJVkVfRlVOQ1RJT05fTkFNRSB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmRlbGF5KDUpO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKFwiYXJjaGl2ZVwiKTtcbiAgICAgICAgICAgIHRoaXMubG9naW5fc2hlZXQgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJSZXNldHRpbmcuLi5cIik7XG4gICAgICAgIGF3YWl0IHNjcmlwdF9zZXJ2aWNlLnNjcmlwdHMucnVuKHtcbiAgICAgICAgICAgIHNjcmlwdElkOiB0aGlzLnJlc2V0X3NjcmlwdF9pZCxcbiAgICAgICAgICAgIHJlcXVlc3RCb2R5OiB7IGZ1bmN0aW9uOiB0aGlzLmNvbmZpZy5SRVNFVF9GVU5DVElPTl9OQU1FIH0sXG4gICAgICAgIH0pO1xuICAgICAgICBhd2FpdCB0aGlzLmRlbGF5KDUpO1xuICAgICAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oXCJyZXNldFwiKTtcbiAgICAgICAgYXdhaXQgdGhpcy5zZW5kX21lc3NhZ2UoXCJEb25lLlwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBHb29nbGUgQXBwcyBTY3JpcHQgc2VydmljZS5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzY3JpcHRfdjEuU2NyaXB0Pn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgR29vZ2xlIEFwcHMgU2NyaXB0IHNlcnZpY2UuXG4gICAgICovXG4gICAgYXN5bmMgY2hlY2tfdXNlcl9jcmVkcyhcbiAgICAgICAgcHJvbXB0X21lc3NhZ2U6IHN0cmluZyA9IFwiSGksIGJlZm9yZSB5b3UgY2FuIHVzZSBCVk5TUCBib3QsIHlvdSBtdXN0IGxvZ2luLlwiXG4gICAgKTogUHJvbWlzZTxCVk5TUENoZWNraW5SZXNwb25zZSB8IHVuZGVmaW5lZD4ge1xuICAgICAgICBjb25zdCB1c2VyX2NyZWRzID0gdGhpcy5nZXRfdXNlcl9jcmVkcygpO1xuICAgICAgICBpZiAoIShhd2FpdCB1c2VyX2NyZWRzLmxvYWRUb2tlbigpKSkge1xuICAgICAgICAgICAgY29uc3QgYXV0aFVybCA9IGF3YWl0IHVzZXJfY3JlZHMuZ2V0QXV0aFVybCgpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYCR7cHJvbXB0X21lc3NhZ2V9IFBsZWFzZSBmb2xsb3cgdGhpcyBsaW5rOlxuJHthdXRoVXJsfVxuXG5NZXNzYWdlIG1lIGFnYWluIHdoZW4gZG9uZS5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIEdvb2dsZSBBcHBzIFNjcmlwdCBzZXJ2aWNlLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHNjcmlwdF92MS5TY3JpcHQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBHb29nbGUgQXBwcyBTY3JpcHQgc2VydmljZS5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfb25fZHV0eSgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zdCBjaGVja2VkX291dF9zZWN0aW9uID0gXCJDaGVja2VkIE91dFwiO1xuICAgICAgICBjb25zdCBsYXN0X3NlY3Rpb25zID0gW2NoZWNrZWRfb3V0X3NlY3Rpb25dO1xuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG5cbiAgICAgICAgY29uc3Qgb25fZHV0eV9wYXRyb2xsZXJzID0gbG9naW5fc2hlZXQuZ2V0X29uX2R1dHlfcGF0cm9sbGVycygpO1xuICAgICAgICBjb25zdCBieV9zZWN0aW9uID0gb25fZHV0eV9wYXRyb2xsZXJzXG4gICAgICAgICAgICAuZmlsdGVyKCh4KSA9PiB4LmNoZWNraW4pXG4gICAgICAgICAgICAucmVkdWNlKChwcmV2OiB7IFtrZXk6IHN0cmluZ106IFBhdHJvbGxlclJvd1tdIH0sIGN1cikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNob3J0X2NvZGUgPVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNraW5fdmFsdWVzLmJ5X3NoZWV0X3N0cmluZ1tjdXIuY2hlY2tpbl0ua2V5O1xuICAgICAgICAgICAgICAgIGxldCBzZWN0aW9uID0gY3VyLnNlY3Rpb247XG4gICAgICAgICAgICAgICAgaWYgKHNob3J0X2NvZGUgPT0gXCJvdXRcIikge1xuICAgICAgICAgICAgICAgICAgICBzZWN0aW9uID0gY2hlY2tlZF9vdXRfc2VjdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCEoc2VjdGlvbiBpbiBwcmV2KSkge1xuICAgICAgICAgICAgICAgICAgICBwcmV2W3NlY3Rpb25dID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHByZXZbc2VjdGlvbl0ucHVzaChjdXIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgICAgICAgfSwge30pO1xuICAgICAgICBsZXQgcmVzdWx0czogc3RyaW5nW11bXSA9IFtdO1xuICAgICAgICBsZXQgYWxsX2tleXMgPSBPYmplY3Qua2V5cyhieV9zZWN0aW9uKTtcbiAgICAgICAgY29uc3Qgb3JkZXJlZF9wcmltYXJ5X3NlY3Rpb25zID0gT2JqZWN0LmtleXMoYnlfc2VjdGlvbilcbiAgICAgICAgICAgIC5maWx0ZXIoKHgpID0+ICFsYXN0X3NlY3Rpb25zLmluY2x1ZGVzKHgpKVxuICAgICAgICAgICAgLnNvcnQoKTtcbiAgICAgICAgY29uc3QgZmlsdGVyZWRfbGFzdF9zZWN0aW9ucyA9IGxhc3Rfc2VjdGlvbnMuZmlsdGVyKCh4KSA9PlxuICAgICAgICAgICAgYWxsX2tleXMuaW5jbHVkZXMoeClcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3Qgb3JkZXJlZF9zZWN0aW9ucyA9IG9yZGVyZWRfcHJpbWFyeV9zZWN0aW9ucy5jb25jYXQoXG4gICAgICAgICAgICBmaWx0ZXJlZF9sYXN0X3NlY3Rpb25zXG4gICAgICAgICk7XG5cbiAgICAgICAgZm9yIChjb25zdCBzZWN0aW9uIG9mIG9yZGVyZWRfc2VjdGlvbnMpIHtcbiAgICAgICAgICAgIGxldCByZXN1bHQ6IHN0cmluZ1tdID0gW107XG4gICAgICAgICAgICBjb25zdCBwYXRyb2xsZXJzID0gYnlfc2VjdGlvbltzZWN0aW9uXS5zb3J0KCh4LCB5KSA9PlxuICAgICAgICAgICAgICAgIHgubmFtZS5sb2NhbGVDb21wYXJlKHkubmFtZSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoc2VjdGlvbi5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChcIlNlY3Rpb24gXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0LnB1c2goYCR7c2VjdGlvbn06IGApO1xuICAgICAgICAgICAgZnVuY3Rpb24gcGF0cm9sbGVyX3N0cmluZyhuYW1lOiBzdHJpbmcsIHNob3J0X2NvZGU6IHN0cmluZykge1xuICAgICAgICAgICAgICAgIGxldCBkZXRhaWxzID0gXCJcIjtcbiAgICAgICAgICAgICAgICBpZiAoc2hvcnRfY29kZSAhPT0gXCJkYXlcIiAmJiBzaG9ydF9jb2RlICE9PSBcIm91dFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGRldGFpbHMgPSBgICgke3Nob3J0X2NvZGUudG9VcHBlckNhc2UoKX0pYDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke25hbWV9JHtkZXRhaWxzfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQucHVzaChcbiAgICAgICAgICAgICAgICBwYXRyb2xsZXJzXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKHgpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRyb2xsZXJfc3RyaW5nKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHgubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNraW5fdmFsdWVzLmJ5X3NoZWV0X3N0cmluZ1t4LmNoZWNraW5dLmtleVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5qb2luKFwiLCBcIilcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oXCJvbi1kdXR5XCIpO1xuICAgICAgICByZXR1cm4gYFBhdHJvbGxlcnMgZm9yICR7bG9naW5fc2hlZXQuc2hlZXRfZGF0ZS50b0RhdGVTdHJpbmcoKX0gKFRvdGFsOiAke1xuICAgICAgICAgICAgb25fZHV0eV9wYXRyb2xsZXJzLmxlbmd0aFxuICAgICAgICB9KTpcXG4ke3Jlc3VsdHMubWFwKChyKSA9PiByLmpvaW4oXCJcIikpLmpvaW4oXCJcXG5cIil9YDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2dzIGFuIGFjdGlvbiB0byB0aGUgR29vZ2xlIFNoZWV0cy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYWN0aW9uX25hbWUgLSBUaGUgbmFtZSBvZiB0aGUgYWN0aW9uIHRvIGxvZy5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgYWN0aW9uIGlzIGxvZ2dlZC5cbiAgICAgKi9cbiAgICBhc3luYyBsb2dfYWN0aW9uKGFjdGlvbl9uYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3Qgc2hlZXRzX3NlcnZpY2UgPSBhd2FpdCB0aGlzLmdldF9zaGVldHNfc2VydmljZSgpO1xuICAgICAgICBhd2FpdCBzaGVldHNfc2VydmljZS5zcHJlYWRzaGVldHMudmFsdWVzLmFwcGVuZCh7XG4gICAgICAgICAgICBzcHJlYWRzaGVldElkOiB0aGlzLmNvbWJpbmVkX2NvbmZpZy5TSEVFVF9JRCxcbiAgICAgICAgICAgIHJhbmdlOiB0aGlzLmNvbmZpZy5BQ1RJT05fTE9HX1NIRUVULFxuICAgICAgICAgICAgdmFsdWVJbnB1dE9wdGlvbjogXCJVU0VSX0VOVEVSRURcIixcbiAgICAgICAgICAgIHJlcXVlc3RCb2R5OiB7XG4gICAgICAgICAgICAgICAgdmFsdWVzOiBbW3RoaXMucGF0cm9sbGVyIS5uYW1lLCBuZXcgRGF0ZSgpLCBhY3Rpb25fbmFtZV1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9ncyBvdXQgdGhlIHVzZXIuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBsb2dvdXQgcmVzcG9uc2UuXG4gICAgICovXG4gICAgYXN5bmMgbG9nb3V0KCk6IFByb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgdXNlcl9jcmVkcyA9IHRoaXMuZ2V0X3VzZXJfY3JlZHMoKTtcbiAgICAgICAgYXdhaXQgdXNlcl9jcmVkcy5kZWxldGVUb2tlbigpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IFwiT2theSwgSSBoYXZlIHJlbW92ZWQgYWxsIGxvZ2luIHNlc3Npb24gaW5mb3JtYXRpb24uXCIsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgVHdpbGlvIGNsaWVudC5cbiAgICAgKiBAcmV0dXJucyB7VHdpbGlvQ2xpZW50fSBUaGUgVHdpbGlvIGNsaWVudC5cbiAgICAgKi9cbiAgICBnZXRfdHdpbGlvX2NsaWVudCgpIHtcbiAgICAgICAgaWYgKHRoaXMudHdpbGlvX2NsaWVudCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0d2lsaW9fY2xpZW50IHdhcyBuZXZlciBpbml0aWFsaXplZCFcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudHdpbGlvX2NsaWVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBUd2lsaW8gU3luYyBjbGllbnQuXG4gICAgICogQHJldHVybnMge1NlcnZpY2VDb250ZXh0fSBUaGUgVHdpbGlvIFN5bmMgY2xpZW50LlxuICAgICAqL1xuICAgIGdldF9zeW5jX2NsaWVudCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN5bmNfY2xpZW50KSB7XG4gICAgICAgICAgICB0aGlzLnN5bmNfY2xpZW50ID0gdGhpcy5nZXRfdHdpbGlvX2NsaWVudCgpLnN5bmMuc2VydmljZXMoXG4gICAgICAgICAgICAgICAgdGhpcy5zeW5jX3NpZFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zeW5jX2NsaWVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB1c2VyIGNyZWRlbnRpYWxzLlxuICAgICAqIEByZXR1cm5zIHtVc2VyQ3JlZHN9IFRoZSB1c2VyIGNyZWRlbnRpYWxzLlxuICAgICAqL1xuICAgIGdldF91c2VyX2NyZWRzKCkge1xuICAgICAgICBpZiAoIXRoaXMudXNlcl9jcmVkcykge1xuICAgICAgICAgICAgdGhpcy51c2VyX2NyZWRzID0gbmV3IFVzZXJDcmVkcyhcbiAgICAgICAgICAgICAgICB0aGlzLmdldF9zeW5jX2NsaWVudCgpLFxuICAgICAgICAgICAgICAgIHRoaXMuZnJvbSxcbiAgICAgICAgICAgICAgICB0aGlzLmNvbWJpbmVkX2NvbmZpZ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy51c2VyX2NyZWRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHNlcnZpY2UgY3JlZGVudGlhbHMuXG4gICAgICogQHJldHVybnMge0dvb2dsZUF1dGh9IFRoZSBzZXJ2aWNlIGNyZWRlbnRpYWxzLlxuICAgICAqL1xuICAgIGdldF9zZXJ2aWNlX2NyZWRzKCkge1xuICAgICAgICBpZiAoIXRoaXMuc2VydmljZV9jcmVkcykge1xuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlX2NyZWRzID0gbmV3IGdvb2dsZS5hdXRoLkdvb2dsZUF1dGgoe1xuICAgICAgICAgICAgICAgIGtleUZpbGU6IGdldF9zZXJ2aWNlX2NyZWRlbnRpYWxzX3BhdGgoKSxcbiAgICAgICAgICAgICAgICBzY29wZXM6IHRoaXMuU0NPUEVTLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZV9jcmVkcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB2YWxpZCBjcmVkZW50aWFscy5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtyZXF1aXJlX3VzZXJfY3JlZHM9ZmFsc2VdIC0gV2hldGhlciB1c2VyIGNyZWRlbnRpYWxzIGFyZSByZXF1aXJlZC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxHb29nbGVBdXRoPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgdmFsaWQgY3JlZGVudGlhbHMuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3ZhbGlkX2NyZWRzKHJlcXVpcmVfdXNlcl9jcmVkczogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5VU0VfU0VSVklDRV9BQ0NPVU5UICYmICFyZXF1aXJlX3VzZXJfY3JlZHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldF9zZXJ2aWNlX2NyZWRzKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXNlcl9jcmVkcyA9IHRoaXMuZ2V0X3VzZXJfY3JlZHMoKTtcbiAgICAgICAgaWYgKCEoYXdhaXQgdXNlcl9jcmVkcy5sb2FkVG9rZW4oKSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVzZXIgaXMgbm90IGF1dGhlZC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJVc2luZyB1c2VyIGFjY291bnQgZm9yIHNlcnZpY2UgYXV0aC4uLlwiKTtcbiAgICAgICAgcmV0dXJuIHVzZXJfY3JlZHMub2F1dGgyX2NsaWVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBHb29nbGUgU2hlZXRzIHNlcnZpY2UuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c2hlZXRzX3Y0LlNoZWV0cz59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIEdvb2dsZSBTaGVldHMgc2VydmljZS5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfc2hlZXRzX3NlcnZpY2UoKSB7XG4gICAgICAgIGlmICghdGhpcy5zaGVldHNfc2VydmljZSkge1xuICAgICAgICAgICAgdGhpcy5zaGVldHNfc2VydmljZSA9IGdvb2dsZS5zaGVldHMoe1xuICAgICAgICAgICAgICAgIHZlcnNpb246IFwidjRcIixcbiAgICAgICAgICAgICAgICBhdXRoOiBhd2FpdCB0aGlzLmdldF92YWxpZF9jcmVkcygpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2hlZXRzX3NlcnZpY2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbG9naW4gc2hlZXQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8TG9naW5TaGVldD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGxvZ2luIHNoZWV0XG4gICAgICovXG4gICAgYXN5bmMgZ2V0X2xvZ2luX3NoZWV0KCkge1xuICAgICAgICBpZiAoIXRoaXMubG9naW5fc2hlZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0X2NvbmZpZzogTG9naW5TaGVldENvbmZpZyA9IHRoaXMuY29tYmluZWRfY29uZmlnO1xuICAgICAgICAgICAgY29uc3Qgc2hlZXRzX3NlcnZpY2UgPSBhd2FpdCB0aGlzLmdldF9zaGVldHNfc2VydmljZSgpO1xuICAgICAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBuZXcgTG9naW5TaGVldChcbiAgICAgICAgICAgICAgICBzaGVldHNfc2VydmljZSxcbiAgICAgICAgICAgICAgICBsb2dpbl9zaGVldF9jb25maWdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBhd2FpdCBsb2dpbl9zaGVldC5yZWZyZXNoKCk7XG4gICAgICAgICAgICB0aGlzLmxvZ2luX3NoZWV0ID0gbG9naW5fc2hlZXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubG9naW5fc2hlZXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgc2Vhc29uIHNoZWV0LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFNlYXNvblNoZWV0Pn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgc2Vhc29uIHNoZWV0XG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3NlYXNvbl9zaGVldCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNlYXNvbl9zaGVldCkge1xuICAgICAgICAgICAgY29uc3Qgc2Vhc29uX3NoZWV0X2NvbmZpZzogU2Vhc29uU2hlZXRDb25maWcgPSB0aGlzLmNvbWJpbmVkX2NvbmZpZztcbiAgICAgICAgICAgIGNvbnN0IHNoZWV0c19zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfc2hlZXRzX3NlcnZpY2UoKTtcbiAgICAgICAgICAgIGNvbnN0IHNlYXNvbl9zaGVldCA9IG5ldyBTZWFzb25TaGVldChcbiAgICAgICAgICAgICAgICBzaGVldHNfc2VydmljZSxcbiAgICAgICAgICAgICAgICBzZWFzb25fc2hlZXRfY29uZmlnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5zZWFzb25fc2hlZXQgPSBzZWFzb25fc2hlZXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2Vhc29uX3NoZWV0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGNvbXAgcGFzcyBzaGVldC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxDb21wUGFzc1NoZWV0Pn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgY29tcCBwYXNzIHNoZWV0XG4gICAgICovXG4gICAgYXN5bmMgZ2V0X2NvbXBfcGFzc19zaGVldCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbXBfcGFzc19zaGVldCkge1xuICAgICAgICAgICAgY29uc3QgY29uZmlnOiBDb21wUGFzc2VzQ29uZmlnID0gdGhpcy5jb21iaW5lZF9jb25maWc7XG4gICAgICAgICAgICBjb25zdCBzaGVldHNfc2VydmljZSA9IGF3YWl0IHRoaXMuZ2V0X3NoZWV0c19zZXJ2aWNlKCk7XG4gICAgICAgICAgICBjb25zdCBzZWFzb25fc2hlZXQgPSBuZXcgQ29tcFBhc3NTaGVldChzaGVldHNfc2VydmljZSwgY29uZmlnKTtcbiAgICAgICAgICAgIHRoaXMuY29tcF9wYXNzX3NoZWV0ID0gc2Vhc29uX3NoZWV0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBfcGFzc19zaGVldDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBtYW5hZ2VyIHBhc3Mgc2hlZXQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8TWFuYWdlclBhc3NTaGVldD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIG1hbmFnZXIgcGFzcyBzaGVldFxuICAgICAqL1xuICAgIGFzeW5jIGdldF9tYW5hZ2VyX3Bhc3Nfc2hlZXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5tYW5hZ2VyX3Bhc3Nfc2hlZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpZzogTWFuYWdlclBhc3Nlc0NvbmZpZyA9IHRoaXMuY29tYmluZWRfY29uZmlnO1xuICAgICAgICAgICAgY29uc3Qgc2hlZXRzX3NlcnZpY2UgPSBhd2FpdCB0aGlzLmdldF9zaGVldHNfc2VydmljZSgpO1xuICAgICAgICAgICAgY29uc3Qgc2Vhc29uX3NoZWV0ID0gbmV3IE1hbmFnZXJQYXNzU2hlZXQoc2hlZXRzX3NlcnZpY2UsIGNvbmZpZyk7XG4gICAgICAgICAgICB0aGlzLm1hbmFnZXJfcGFzc19zaGVldCA9IHNlYXNvbl9zaGVldDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5tYW5hZ2VyX3Bhc3Nfc2hlZXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgR29vZ2xlIEFwcHMgU2NyaXB0IHNlcnZpY2UuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c2NyaXB0X3YxLlNjcmlwdD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIEdvb2dsZSBBcHBzIFNjcmlwdCBzZXJ2aWNlLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF91c2VyX3NjcmlwdHNfc2VydmljZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnVzZXJfc2NyaXB0c19zZXJ2aWNlKSB7XG4gICAgICAgICAgICB0aGlzLnVzZXJfc2NyaXB0c19zZXJ2aWNlID0gZ29vZ2xlLnNjcmlwdCh7XG4gICAgICAgICAgICAgICAgdmVyc2lvbjogXCJ2MVwiLFxuICAgICAgICAgICAgICAgIGF1dGg6IGF3YWl0IHRoaXMuZ2V0X3ZhbGlkX2NyZWRzKHRydWUpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudXNlcl9zY3JpcHRzX3NlcnZpY2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbWFwcGVkIHBhdHJvbGxlci5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtmb3JjZT1mYWxzZV0gLSBXaGV0aGVyIHRvIGZvcmNlIHRoZSBwYXRyb2xsZXIgdG8gYmUgZm91bmQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2UgfCB2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcmVzcG9uc2Ugb3Igdm9pZC5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfbWFwcGVkX3BhdHJvbGxlcihmb3JjZTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IHBob25lX2xvb2t1cCA9IGF3YWl0IHRoaXMuZmluZF9wYXRyb2xsZXJfZnJvbV9udW1iZXIoKTtcbiAgICAgICAgaWYgKHBob25lX2xvb2t1cCA9PT0gdW5kZWZpbmVkIHx8IHBob25lX2xvb2t1cCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGZvcmNlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGZpbmQgYXNzb2NpYXRlZCB1c2VyXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYFNvcnJ5LCBJIGNvdWxkbid0IGZpbmQgYW4gYXNzb2NpYXRlZCBCVk5TUCBtZW1iZXIgd2l0aCB5b3VyIHBob25lIG51bWJlciAoJHt0aGlzLmZyb219KWAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuICAgICAgICBjb25zdCBtYXBwZWRQYXRyb2xsZXIgPSBsb2dpbl9zaGVldC50cnlfZmluZF9wYXRyb2xsZXIoXG4gICAgICAgICAgICBwaG9uZV9sb29rdXAubmFtZVxuICAgICAgICApO1xuICAgICAgICBpZiAobWFwcGVkUGF0cm9sbGVyID09PSBcIm5vdF9mb3VuZFwiKSB7XG4gICAgICAgICAgICBpZiAoZm9yY2UpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgcGF0cm9sbGVyIGluIGxvZ2luIHNoZWV0XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYENvdWxkIG5vdCBmaW5kIHBhdHJvbGxlciAnJHtwaG9uZV9sb29rdXAubmFtZX0nIGluIGxvZ2luIHNoZWV0LiBQbGVhc2UgbG9vayBhdCB0aGUgbG9naW4gc2hlZXQgbmFtZSwgYW5kIGNvcHkgaXQgdG8gdGhlIFBob25lIE51bWJlcnMgdGFiLmAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3VycmVudF9zaGVldF9kYXRlID0gbG9naW5fc2hlZXQuY3VycmVudF9kYXRlO1xuICAgICAgICB0aGlzLnBhdHJvbGxlciA9IG1hcHBlZFBhdHJvbGxlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaW5kcyB0aGUgcGF0cm9sbGVyIGZyb20gdGhlIHBob25lIG51bWJlci5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxQYXRyb2xsZXJSb3c+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBwYXRyb2xsZXIuXG4gICAgICovXG4gICAgYXN5bmMgZmluZF9wYXRyb2xsZXJfZnJvbV9udW1iZXIoKSB7XG4gICAgICAgIGNvbnN0IHJhd19udW1iZXIgPSB0aGlzLmZyb207XG4gICAgICAgIGNvbnN0IHNoZWV0c19zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfc2hlZXRzX3NlcnZpY2UoKTtcbiAgICAgICAgY29uc3Qgb3B0czogRmluZFBhdHJvbGxlckNvbmZpZyA9IHRoaXMuY29tYmluZWRfY29uZmlnO1xuICAgICAgICBjb25zdCBudW1iZXIgPSBzYW5pdGl6ZV9waG9uZV9udW1iZXIocmF3X251bWJlcik7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgc2hlZXRzX3NlcnZpY2Uuc3ByZWFkc2hlZXRzLnZhbHVlcy5nZXQoe1xuICAgICAgICAgICAgc3ByZWFkc2hlZXRJZDogb3B0cy5TSEVFVF9JRCxcbiAgICAgICAgICAgIHJhbmdlOiBvcHRzLlBIT05FX05VTUJFUl9MT09LVVBfU0hFRVQsXG4gICAgICAgICAgICB2YWx1ZVJlbmRlck9wdGlvbjogXCJVTkZPUk1BVFRFRF9WQUxVRVwiLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhLnZhbHVlcykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGZpbmQgcGF0cm9sbGVyLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwYXRyb2xsZXIgPSByZXNwb25zZS5kYXRhLnZhbHVlc1xuICAgICAgICAgICAgLm1hcCgocm93KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmF3TnVtYmVyID1cbiAgICAgICAgICAgICAgICAgICAgcm93W2V4Y2VsX3Jvd190b19pbmRleChvcHRzLlBIT05FX05VTUJFUl9OVU1CRVJfQ09MVU1OKV07XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudE51bWJlciA9XG4gICAgICAgICAgICAgICAgICAgIHJhd051bWJlciAhPSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgICAgID8gc2FuaXRpemVfcGhvbmVfbnVtYmVyKHJhd051bWJlcilcbiAgICAgICAgICAgICAgICAgICAgICAgIDogcmF3TnVtYmVyO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnROYW1lID1cbiAgICAgICAgICAgICAgICAgICAgcm93W2V4Y2VsX3Jvd190b19pbmRleChvcHRzLlBIT05FX05VTUJFUl9OQU1FX0NPTFVNTildO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IG5hbWU6IGN1cnJlbnROYW1lLCBudW1iZXI6IGN1cnJlbnROdW1iZXIgfTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZmlsdGVyKChwYXRyb2xsZXIpID0+IHBhdHJvbGxlci5udW1iZXIgPT09IG51bWJlcilbMF07XG4gICAgICAgIHJldHVybiBwYXRyb2xsZXI7XG4gICAgfVxufVxuIiwiaW1wb3J0IFwiQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlc1wiO1xuaW1wb3J0IHtcbiAgICBDb250ZXh0LFxuICAgIFNlcnZlcmxlc3NDYWxsYmFjayxcbiAgICBTZXJ2ZXJsZXNzRXZlbnRPYmplY3QsXG4gICAgU2VydmVybGVzc0Z1bmN0aW9uU2lnbmF0dXJlLFxufSBmcm9tIFwiQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlcy90eXBlc1wiO1xuaW1wb3J0IEJWTlNQQ2hlY2tpbkhhbmRsZXIsIHsgSGFuZGxlckV2ZW50IH0gZnJvbSBcIi4vYnZuc3BfY2hlY2tpbl9oYW5kbGVyXCI7XG5pbXBvcnQgeyBIYW5kbGVyRW52aXJvbm1lbnQgfSBmcm9tIFwiLi4vZW52L2hhbmRsZXJfY29uZmlnXCI7XG5cbmNvbnN0IE5FWFRfU1RFUF9DT09LSUVfTkFNRSA9IFwiYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXBcIjtcblxuLyoqXG4gKiBUd2lsaW8gU2VydmVybGVzcyBmdW5jdGlvbiBoYW5kbGVyIGZvciBCVk5TUCBjaGVjay1pbi5cbiAqIEBwYXJhbSB7Q29udGV4dDxIYW5kbGVyRW52aXJvbm1lbnQ+fSBjb250ZXh0IC0gVGhlIFR3aWxpbyBzZXJ2ZXJsZXNzIGNvbnRleHQuXG4gKiBAcGFyYW0ge1NlcnZlcmxlc3NFdmVudE9iamVjdDxIYW5kbGVyRXZlbnQ+fSBldmVudCAtIFRoZSBldmVudCBvYmplY3QuXG4gKiBAcGFyYW0ge1NlcnZlcmxlc3NDYWxsYmFja30gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBjb25zdCBoYW5kbGVyOiBTZXJ2ZXJsZXNzRnVuY3Rpb25TaWduYXR1cmU8XG4gICAgSGFuZGxlckVudmlyb25tZW50LFxuICAgIEhhbmRsZXJFdmVudFxuPiA9IGFzeW5jIGZ1bmN0aW9uIChcbiAgICBjb250ZXh0OiBDb250ZXh0PEhhbmRsZXJFbnZpcm9ubWVudD4sXG4gICAgZXZlbnQ6IFNlcnZlcmxlc3NFdmVudE9iamVjdDxIYW5kbGVyRXZlbnQ+LFxuICAgIGNhbGxiYWNrOiBTZXJ2ZXJsZXNzQ2FsbGJhY2tcbikge1xuICAgIGNvbnN0IGhhbmRsZXIgPSBuZXcgQlZOU1BDaGVja2luSGFuZGxlcihjb250ZXh0LCBldmVudCk7XG4gICAgbGV0IG1lc3NhZ2U6IHN0cmluZztcbiAgICBsZXQgbmV4dF9zdGVwOiBzdHJpbmcgPSBcIlwiO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXJfcmVzcG9uc2UgPSBhd2FpdCBoYW5kbGVyLmhhbmRsZSgpO1xuICAgICAgICBtZXNzYWdlID1cbiAgICAgICAgICAgIGhhbmRsZXJfcmVzcG9uc2UucmVzcG9uc2UgfHxcbiAgICAgICAgICAgIFwiVW5leHBlY3RlZCByZXN1bHQgLSBubyByZXNwb25zZSBkZXRlcm1pbmVkXCI7XG4gICAgICAgIG5leHRfc3RlcCA9IGhhbmRsZXJfcmVzcG9uc2UubmV4dF9zdGVwIHx8IFwiXCI7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkFuIGVycm9yIG9jY3VyZWRcIik7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlKSk7XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIH1cbiAgICAgICAgbWVzc2FnZSA9IFwiQW4gdW5leHBlY3RlZCBlcnJvciBvY2N1cmVkLlwiO1xuICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICBtZXNzYWdlICs9IFwiXFxuXCIgKyBlLm1lc3NhZ2U7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yXCIsIGUuc3RhY2spO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvclwiLCBlLm5hbWUpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvclwiLCBlLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBuZXcgVHdpbGlvLlJlc3BvbnNlKCk7XG4gICAgY29uc3QgdHdpbWwgPSBuZXcgVHdpbGlvLnR3aW1sLk1lc3NhZ2luZ1Jlc3BvbnNlKCk7XG5cbiAgICB0d2ltbC5tZXNzYWdlKG1lc3NhZ2UpO1xuXG4gICAgcmVzcG9uc2VcbiAgICAgICAgLy8gQWRkIHRoZSBzdHJpbmdpZmllZCBUd2lNTCB0byB0aGUgcmVzcG9uc2UgYm9keVxuICAgICAgICAuc2V0Qm9keSh0d2ltbC50b1N0cmluZygpKVxuICAgICAgICAvLyBTaW5jZSB3ZSdyZSByZXR1cm5pbmcgVHdpTUwsIHRoZSBjb250ZW50IHR5cGUgbXVzdCBiZSBYTUxcbiAgICAgICAgLmFwcGVuZEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcInRleHQveG1sXCIpXG4gICAgICAgIC5zZXRDb29raWUoTkVYVF9TVEVQX0NPT0tJRV9OQU1FLCBuZXh0X3N0ZXApO1xuXG4gICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlKTtcbn07IiwiaW1wb3J0IHsgc2hlZXRzX3Y0IH0gZnJvbSBcImdvb2dsZWFwaXNcIjtcbmltcG9ydCB7IENvbXBQYXNzZXNDb25maWcsIE1hbmFnZXJQYXNzZXNDb25maWcgfSBmcm9tIFwiLi4vZW52L2hhbmRsZXJfY29uZmlnXCI7XG5pbXBvcnQgeyBleGNlbF9yb3dfdG9faW5kZXgsIHJvd19jb2xfdG9fZXhjZWxfaW5kZXggfSBmcm9tIFwiLi4vdXRpbHMvdXRpbFwiO1xuaW1wb3J0IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiIGZyb20gXCIuLi91dGlscy9nb29nbGVfc2hlZXRzX3NwcmVhZHNoZWV0X3RhYlwiO1xuaW1wb3J0IHsgZm9ybWF0X2RhdGVfZm9yX3NwcmVhZHNoZWV0X3ZhbHVlIH0gZnJvbSBcIi4uL3V0aWxzL2RhdGV0aW1lX3V0aWxcIjtcbmltcG9ydCB7XG4gICAgYnVpbGRfcGFzc2VzX3N0cmluZyxcbiAgICBDb21wUGFzc1R5cGUsXG4gICAgZ2V0X2NvbXBfcGFzc19kZXNjcmlwdGlvbixcbn0gZnJvbSBcIi4uL3V0aWxzL2NvbXBfcGFzc2VzXCI7XG5pbXBvcnQgeyBCVk5TUENoZWNraW5SZXNwb25zZSB9IGZyb20gXCIuLi9oYW5kbGVycy9idm5zcF9jaGVja2luX2hhbmRsZXJcIjtcblxuZXhwb3J0IGNsYXNzIFVzZWRBbmRBdmFpbGFibGVQYXNzZXMge1xuICAgIHJvdzogYW55W107XG4gICAgaW5kZXg6IG51bWJlcjtcbiAgICBhdmFpbGFibGU6IG51bWJlcjtcbiAgICB1c2VkX3RvZGF5OiBudW1iZXI7XG4gICAgdXNlZF9zZWFzb246IG51bWJlcjtcbiAgICBjb21wX3Bhc3NfdHlwZTogQ29tcFBhc3NUeXBlO1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICByb3c6IGFueVtdLFxuICAgICAgICBpbmRleDogbnVtYmVyLFxuICAgICAgICBhdmFpbGFibGU6IGFueSxcbiAgICAgICAgdXNlZF90b2RheTogYW55LFxuICAgICAgICB1c2VkX3NlYXNvbjogYW55LFxuICAgICAgICB0eXBlOiBDb21wUGFzc1R5cGVcbiAgICApIHtcbiAgICAgICAgdGhpcy5yb3cgPSByb3c7XG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5hdmFpbGFibGUgPSBOdW1iZXIoYXZhaWxhYmxlKTtcbiAgICAgICAgdGhpcy51c2VkX3RvZGF5ID0gTnVtYmVyKHVzZWRfdG9kYXkpO1xuICAgICAgICB0aGlzLnVzZWRfc2Vhc29uID0gTnVtYmVyKHVzZWRfc2Vhc29uKTtcbiAgICAgICAgdGhpcy5jb21wX3Bhc3NfdHlwZSA9IHR5cGU7XG4gICAgfVxuXG4gICAgZ2V0X3Byb21wdCgpOiBCVk5TUENoZWNraW5SZXNwb25zZSB7XG4gICAgICAgIGlmICh0aGlzLmF2YWlsYWJsZSA+IDApIHtcbiAgICAgICAgICAgIGxldCByZXNwb25zZTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gICAgICAgICAgICBsZXQgcGFzc19zdHJpbmc6IHN0cmluZyA9IGdldF9jb21wX3Bhc3NfZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgdGhpcy5jb21wX3Bhc3NfdHlwZVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgcmVzcG9uc2UgPSBidWlsZF9wYXNzZXNfc3RyaW5nKFxuICAgICAgICAgICAgICAgIHRoaXMudXNlZF9zZWFzb24sXG4gICAgICAgICAgICAgICAgdGhpcy5hdmFpbGFibGUgKyB0aGlzLnVzZWRfc2Vhc29uLFxuICAgICAgICAgICAgICAgIHRoaXMudXNlZF90b2RheSxcbiAgICAgICAgICAgICAgICBgJHtwYXNzX3N0cmluZ31lc2AsXG4gICAgICAgICAgICAgICAgdHJ1ZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJlc3BvbnNlICs9XG4gICAgICAgICAgICAgICAgXCJcXG5cXG5cIiArXG4gICAgICAgICAgICAgICAgYEVudGVyIHRoZSBmaXJzdCBhbmQgbGFzdCBuYW1lIG9mIHRoZSBndWVzdCB0aGF0IHdpbGwgdXNlIGEgJHtwYXNzX3N0cmluZ30gdG9kYXkgKG9yICdyZXN0YXJ0Jyk6YDtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2U6IHJlc3BvbnNlLFxuICAgICAgICAgICAgICAgICAgICBuZXh0X3N0ZXA6IGBhd2FpdC1wYXNzLSR7dGhpcy5jb21wX3Bhc3NfdHlwZX1gLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3BvbnNlOiBgWW91IGRvIG5vdCBoYXZlIGFueSAke2dldF9jb21wX3Bhc3NfZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgdGhpcy5jb21wX3Bhc3NfdHlwZVxuICAgICAgICAgICAgKX0gYXZhaWxhYmxlIHRvZGF5YCxcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQYXNzU2hlZXQge1xuICAgIHNoZWV0OiBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYjtcbiAgICBjb21wX3Bhc3NfdHlwZTogQ29tcFBhc3NUeXBlO1xuICAgIGNvbnN0cnVjdG9yKHNoZWV0OiBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYiwgdHlwZTogQ29tcFBhc3NUeXBlKSB7XG4gICAgICAgIHRoaXMuc2hlZXQgPSBzaGVldDtcbiAgICAgICAgdGhpcy5jb21wX3Bhc3NfdHlwZSA9IHR5cGU7XG4gICAgfVxuXG4gICAgYWJzdHJhY3QgZ2V0IGF2YWlsYWJsZV9jb2x1bW4oKTogc3RyaW5nO1xuICAgIGFic3RyYWN0IGdldCB1c2VkX3RvZGF5X2NvbHVtbigpOiBzdHJpbmc7XG4gICAgYWJzdHJhY3QgZ2V0IHVzZWRfc2Vhc29uX2NvbHVtbigpOiBzdHJpbmc7XG4gICAgYWJzdHJhY3QgZ2V0IG5hbWVfY29sdW1uKCk6IHN0cmluZztcbiAgICBhYnN0cmFjdCBnZXQgc3RhcnRfaW5kZXgoKTogbnVtYmVyO1xuICAgIGFic3RyYWN0IGdldCBzaGVldF9uYW1lKCk6IHN0cmluZztcblxuICAgIGFzeW5jIGdldF9hdmFpbGFibGVfYW5kX3VzZWRfcGFzc2VzKFxuICAgICAgICBwYXRyb2xsZXJfbmFtZTogc3RyaW5nXG4gICAgKTogUHJvbWlzZTxVc2VkQW5kQXZhaWxhYmxlUGFzc2VzIHwgbnVsbD4ge1xuICAgICAgICBjb25zdCBwYXRyb2xsZXJfcm93ID0gYXdhaXQgdGhpcy5zaGVldC5nZXRfc2hlZXRfcm93X2Zvcl9wYXRyb2xsZXIoXG4gICAgICAgICAgICBwYXRyb2xsZXJfbmFtZSxcbiAgICAgICAgICAgIHRoaXMubmFtZV9jb2x1bW5cbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHBhdHJvbGxlcl9yb3cgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY3VycmVudF9kYXlfYXZhaWxhYmxlX3Bhc3NlcyA9XG4gICAgICAgICAgICBwYXRyb2xsZXJfcm93LnJvd1tleGNlbF9yb3dfdG9faW5kZXgodGhpcy5hdmFpbGFibGVfY29sdW1uKV07XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfZGF5X3VzZWRfcGFzc2VzID1cbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cucm93W2V4Y2VsX3Jvd190b19pbmRleCh0aGlzLnVzZWRfdG9kYXlfY29sdW1uKV07XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfc2Vhc29uX3VzZWRfcGFzc2VzID1cbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cucm93W2V4Y2VsX3Jvd190b19pbmRleCh0aGlzLnVzZWRfc2Vhc29uX2NvbHVtbildO1xuICAgICAgICByZXR1cm4gbmV3IFVzZWRBbmRBdmFpbGFibGVQYXNzZXMoXG4gICAgICAgICAgICBwYXRyb2xsZXJfcm93LnJvdyxcbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cuaW5kZXgsXG4gICAgICAgICAgICBjdXJyZW50X2RheV9hdmFpbGFibGVfcGFzc2VzLFxuICAgICAgICAgICAgY3VycmVudF9kYXlfdXNlZF9wYXNzZXMsXG4gICAgICAgICAgICBjdXJyZW50X3NlYXNvbl91c2VkX3Bhc3NlcyxcbiAgICAgICAgICAgIHRoaXMuY29tcF9wYXNzX3R5cGVcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBhc3luYyBzZXRfdXNlZF9jb21wX3Bhc3NlcyhcbiAgICAgICAgcGF0cm9sbGVyX3JvdzogVXNlZEFuZEF2YWlsYWJsZVBhc3NlcyxcbiAgICAgICAgZ3Vlc3RfbmFtZTogc3RyaW5nXG4gICAgKSB7XG4gICAgICAgIGlmIChwYXRyb2xsZXJfcm93LmF2YWlsYWJsZSA8IDEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICBgTm90IGVub3VnaCBhdmFpbGFibGUgcGFzc2VzOiBBdmFpbGFibGU6ICR7cGF0cm9sbGVyX3Jvdy5hdmFpbGFibGV9LCBVc2VkIHRoaXMgc2Vhc29uOiAgJHtwYXRyb2xsZXJfcm93LnVzZWRfc2Vhc29ufSwgVXNlZCB0b2RheTogJHtwYXRyb2xsZXJfcm93LnVzZWRfdG9kYXl9YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByb3dudW0gPSBwYXRyb2xsZXJfcm93LmluZGV4O1xuXG4gICAgICAgIGNvbnN0IHN0YXJ0X2luZGV4ID0gdGhpcy5zdGFydF9pbmRleDtcbiAgICAgICAgY29uc3QgcHJpb3JfbGVuZ3RoID0gcGF0cm9sbGVyX3Jvdy5yb3cubGVuZ3RoIC0gc3RhcnRfaW5kZXg7XG5cbiAgICAgICAgY29uc3QgY3VycmVudF9kYXRlX3N0cmluZyA9IGZvcm1hdF9kYXRlX2Zvcl9zcHJlYWRzaGVldF92YWx1ZShcbiAgICAgICAgICAgIG5ldyBEYXRlKClcbiAgICAgICAgKTtcbiAgICAgICAgbGV0IG5ld192YWxzID0gcGF0cm9sbGVyX3Jvdy5yb3dcbiAgICAgICAgICAgIC5zbGljZShzdGFydF9pbmRleClcbiAgICAgICAgICAgIC5tYXAoKHgpID0+IHg/LnRvU3RyaW5nKCkpO1xuXG4gICAgICAgIC8vIEFkZCB0aGUgY3VycmVudCBkYXRlIGFwcGVuZGVkIHdpdGggdGhlIG5ldyBndWVzdCBuYW1lXG4gICAgICAgIG5ld192YWxzLnB1c2goY3VycmVudF9kYXRlX3N0cmluZyArIFwiLFwiICsgZ3Vlc3RfbmFtZSk7XG5cbiAgICAgICAgY29uc3QgdXBkYXRlX2xlbmd0aCA9IE1hdGgubWF4KHByaW9yX2xlbmd0aCwgbmV3X3ZhbHMubGVuZ3RoKTtcbiAgICAgICAgd2hpbGUgKG5ld192YWxzLmxlbmd0aCA8IHVwZGF0ZV9sZW5ndGgpIHtcbiAgICAgICAgICAgIG5ld192YWxzLnB1c2goXCJcIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZW5kX2luZGV4ID0gc3RhcnRfaW5kZXggKyB1cGRhdGVfbGVuZ3RoIC0gMTtcblxuICAgICAgICBjb25zdCByYW5nZSA9IGAke3RoaXMuc2hlZXQuc2hlZXRfbmFtZX0hJHtyb3dfY29sX3RvX2V4Y2VsX2luZGV4KFxuICAgICAgICAgICAgcm93bnVtLFxuICAgICAgICAgICAgc3RhcnRfaW5kZXhcbiAgICAgICAgKX06JHtyb3dfY29sX3RvX2V4Y2VsX2luZGV4KHJvd251bSwgZW5kX2luZGV4KX1gO1xuICAgICAgICBjb25zb2xlLmxvZyhgVXBkYXRpbmcgJHtyYW5nZX0gd2l0aCAke25ld192YWxzLmxlbmd0aH0gdmFsdWVzYCk7XG4gICAgICAgIGF3YWl0IHRoaXMuc2hlZXQudXBkYXRlX3ZhbHVlcyhyYW5nZSwgW25ld192YWxzXSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ29tcFBhc3NTaGVldCBleHRlbmRzIFBhc3NTaGVldCB7XG4gICAgY29uZmlnOiBDb21wUGFzc2VzQ29uZmlnO1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyB8IG51bGwsXG4gICAgICAgIGNvbmZpZzogQ29tcFBhc3Nlc0NvbmZpZ1xuICAgICkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIG5ldyBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYihcbiAgICAgICAgICAgICAgICBzaGVldHNfc2VydmljZSxcbiAgICAgICAgICAgICAgICBjb25maWcuU0hFRVRfSUQsXG4gICAgICAgICAgICAgICAgY29uZmlnLkNPTVBfUEFTU19TSEVFVFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIENvbXBQYXNzVHlwZS5Db21wUGFzc1xuICAgICAgICApO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICB9XG5cbiAgICBnZXQgc3RhcnRfaW5kZXgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGV4Y2VsX3Jvd190b19pbmRleChcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLkNPTVBfUEFTU19TSEVFVF9EQVRFU19TVEFSVElOR19DT0xVTU5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgZ2V0IHNoZWV0X25hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLkNPTVBfUEFTU19TSEVFVDtcbiAgICB9XG4gICAgZ2V0IGF2YWlsYWJsZV9jb2x1bW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLkNPTVBfUEFTU19TSEVFVF9EQVRFU19BVkFJTEFCTEVfQ09MVU1OO1xuICAgIH1cbiAgICBnZXQgdXNlZF90b2RheV9jb2x1bW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLkNPTVBfUEFTU19TSEVFVF9VU0VEX1RPREFZX0NPTFVNTjtcbiAgICB9XG4gICAgZ2V0IHVzZWRfc2Vhc29uX2NvbHVtbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuQ09NUF9QQVNTX1NIRUVUX1VTRURfU0VBU09OX0NPTFVNTjtcbiAgICB9XG4gICAgZ2V0IG5hbWVfY29sdW1uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5DT01QX1BBU1NfU0hFRVRfTkFNRV9DT0xVTU47XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTWFuYWdlclBhc3NTaGVldCBleHRlbmRzIFBhc3NTaGVldCB7XG4gICAgY29uZmlnOiBNYW5hZ2VyUGFzc2VzQ29uZmlnO1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyB8IG51bGwsXG4gICAgICAgIGNvbmZpZzogTWFuYWdlclBhc3Nlc0NvbmZpZ1xuICAgICkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIG5ldyBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYihcbiAgICAgICAgICAgICAgICBzaGVldHNfc2VydmljZSxcbiAgICAgICAgICAgICAgICBjb25maWcuU0hFRVRfSUQsXG4gICAgICAgICAgICAgICAgY29uZmlnLk1BTkFHRVJfUEFTU19TSEVFVFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIENvbXBQYXNzVHlwZS5NYW5hZ2VyUGFzc1xuICAgICAgICApO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICB9XG5cbiAgICBnZXQgc3RhcnRfaW5kZXgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGV4Y2VsX3Jvd190b19pbmRleChcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLk1BTkFHRVJfUEFTU19TSEVFVF9EQVRFU19TVEFSVElOR19DT0xVTU5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgZ2V0IHNoZWV0X25hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLk1BTkFHRVJfUEFTU19TSEVFVDtcbiAgICB9XG4gICAgZ2V0IGF2YWlsYWJsZV9jb2x1bW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLk1BTkFHRVJfUEFTU19TSEVFVF9BVkFJTEFCTEVfQ09MVU1OO1xuICAgIH1cbiAgICBnZXQgdXNlZF90b2RheV9jb2x1bW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLk1BTkFHRVJfUEFTU19TSEVFVF9VU0VEX1RPREFZX0NPTFVNTjtcbiAgICB9XG4gICAgZ2V0IHVzZWRfc2Vhc29uX2NvbHVtbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuTUFOQUdFUl9QQVNTX1NIRUVUX1VTRURfU0VBU09OX0NPTFVNTjtcbiAgICB9XG4gICAgZ2V0IG5hbWVfY29sdW1uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5NQU5BR0VSX1BBU1NfU0hFRVRfTkFNRV9DT0xVTU47XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQsIGV4Y2VsX3Jvd190b19pbmRleCB9IGZyb20gXCIuLi91dGlscy91dGlsXCI7XG5pbXBvcnQgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIgZnJvbSBcIi4uL3V0aWxzL2dvb2dsZV9zaGVldHNfc3ByZWFkc2hlZXRfdGFiXCI7XG5pbXBvcnQgeyBzYW5pdGl6ZV9kYXRlIH0gZnJvbSBcIi4uL3V0aWxzL2RhdGV0aW1lX3V0aWxcIjtcbmltcG9ydCB7IExvZ2luU2hlZXRDb25maWcsIFBhdHJvbGxlclJvd0NvbmZpZyB9IGZyb20gXCIuLi9lbnYvaGFuZGxlcl9jb25maWdcIjtcbmltcG9ydCB7IHNoZWV0c192NCB9IGZyb20gXCJnb29nbGVhcGlzXCI7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHJvdyBvZiBwYXRyb2xsZXIgZGF0YS5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IFBhdHJvbGxlclJvd1xuICogQHByb3BlcnR5IHtudW1iZXJ9IGluZGV4IC0gVGhlIGluZGV4IG9mIHRoZSByb3cuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwYXRyb2xsZXIuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gY2F0ZWdvcnkgLSBUaGUgY2F0ZWdvcnkgb2YgdGhlIHBhdHJvbGxlci5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBzZWN0aW9uIC0gVGhlIHNlY3Rpb24gb2YgdGhlIHBhdHJvbGxlci5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBjaGVja2luIC0gVGhlIGNoZWNrLWluIHN0YXR1cyBvZiB0aGUgcGF0cm9sbGVyLlxuICovXG5leHBvcnQgdHlwZSBQYXRyb2xsZXJSb3cgPSB7XG4gICAgaW5kZXg6IG51bWJlcjtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgY2F0ZWdvcnk6IHN0cmluZztcbiAgICBzZWN0aW9uOiBzdHJpbmc7XG4gICAgY2hlY2tpbjogc3RyaW5nO1xufTtcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBsb2dpbiBzaGVldCBpbiBHb29nbGUgU2hlZXRzLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dpblNoZWV0IHtcbiAgICBsb2dpbl9zaGVldDogR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWI7XG4gICAgY2hlY2tpbl9jb3VudF9zaGVldDogR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWI7XG4gICAgY29uZmlnOiBMb2dpblNoZWV0Q29uZmlnO1xuICAgIHJvd3M/OiBhbnlbXVtdIHwgbnVsbCA9IG51bGw7XG4gICAgY2hlY2tpbl9jb3VudDogbnVtYmVyIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgIHBhdHJvbGxlcnM6IFBhdHJvbGxlclJvd1tdID0gW107XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIExvZ2luU2hlZXQuXG4gICAgICogQHBhcmFtIHtzaGVldHNfdjQuU2hlZXRzIHwgbnVsbH0gc2hlZXRzX3NlcnZpY2UgLSBUaGUgR29vZ2xlIFNoZWV0cyBBUEkgc2VydmljZS5cbiAgICAgKiBAcGFyYW0ge0xvZ2luU2hlZXRDb25maWd9IGNvbmZpZyAtIFRoZSBjb25maWd1cmF0aW9uIGZvciB0aGUgbG9naW4gc2hlZXQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzIHwgbnVsbCxcbiAgICAgICAgY29uZmlnOiBMb2dpblNoZWV0Q29uZmlnXG4gICAgKSB7XG4gICAgICAgIHRoaXMubG9naW5fc2hlZXQgPSBuZXcgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIoXG4gICAgICAgICAgICBzaGVldHNfc2VydmljZSxcbiAgICAgICAgICAgIGNvbmZpZy5TSEVFVF9JRCxcbiAgICAgICAgICAgIGNvbmZpZy5MT0dJTl9TSEVFVF9MT09LVVBcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jaGVja2luX2NvdW50X3NoZWV0ID0gbmV3IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiKFxuICAgICAgICAgICAgc2hlZXRzX3NlcnZpY2UsXG4gICAgICAgICAgICBjb25maWcuU0hFRVRfSUQsXG4gICAgICAgICAgICBjb25maWcuQ0hFQ0tJTl9DT1VOVF9MT09LVVBcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVmcmVzaGVzIHRoZSBkYXRhIGZyb20gdGhlIEdvb2dsZSBTaGVldHMuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAgICovXG4gICAgYXN5bmMgcmVmcmVzaCgpIHtcbiAgICAgICAgdGhpcy5yb3dzID0gYXdhaXQgdGhpcy5sb2dpbl9zaGVldC5nZXRfdmFsdWVzKFxuICAgICAgICAgICAgdGhpcy5jb25maWcuTE9HSU5fU0hFRVRfTE9PS1VQXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY2hlY2tpbl9jb3VudCA9IChhd2FpdCB0aGlzLmNoZWNraW5fY291bnRfc2hlZXQuZ2V0X3ZhbHVlcyhcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLkNIRUNLSU5fQ09VTlRfTE9PS1VQXG4gICAgICAgICkpIVswXVswXTtcbiAgICAgICAgdGhpcy5wYXRyb2xsZXJzID0gdGhpcy5yb3dzIS5tYXAoKHgsIGkpID0+XG4gICAgICAgICAgICB0aGlzLnBhcnNlX3BhdHJvbGxlcl9yb3coaSwgeCwgdGhpcy5jb25maWcpXG4gICAgICAgICkuZmlsdGVyKCh4KSA9PiB4ICE9IG51bGwpIGFzIFBhdHJvbGxlclJvd1tdO1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiUmVmcmVzaGluZyBQYXRyb2xsZXJzOiBcIiApO1xuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMucGF0cm9sbGVycyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgYXJjaGl2ZWQgc3RhdHVzIG9mIHRoZSBsb2dpbiBzaGVldC5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc2hlZXQgaXMgYXJjaGl2ZWQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKi9cbiAgICBnZXQgYXJjaGl2ZWQoKSB7XG4gICAgICAgIGNvbnN0IGFyY2hpdmVkID0gbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQoXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5BUkNISVZFRF9DRUxMLFxuICAgICAgICAgICAgdGhpcy5yb3dzIVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgKGFyY2hpdmVkID09PSB1bmRlZmluZWQgJiYgdGhpcy5jaGVja2luX2NvdW50ID09PSAwKSB8fFxuICAgICAgICAgICAgYXJjaGl2ZWQudG9Mb3dlckNhc2UoKSA9PT0gXCJ5ZXNcIlxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGRhdGUgb2YgdGhlIHNoZWV0LlxuICAgICAqIEByZXR1cm5zIHtEYXRlfSBUaGUgZGF0ZSBvZiB0aGUgc2hlZXQuXG4gICAgICovXG4gICAgZ2V0IHNoZWV0X2RhdGUoKSB7XG4gICAgICAgIHJldHVybiBzYW5pdGl6ZV9kYXRlKFxuICAgICAgICAgICAgbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQodGhpcy5jb25maWcuU0hFRVRfREFURV9DRUxMLCB0aGlzLnJvd3MhKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGN1cnJlbnQgZGF0ZS5cbiAgICAgKiBAcmV0dXJucyB7RGF0ZX0gVGhlIGN1cnJlbnQgZGF0ZS5cbiAgICAgKi9cbiAgICBnZXQgY3VycmVudF9kYXRlKCkge1xuICAgICAgICByZXR1cm4gc2FuaXRpemVfZGF0ZShcbiAgICAgICAgICAgIGxvb2t1cF9yb3dfY29sX2luX3NoZWV0KHRoaXMuY29uZmlnLkNVUlJFTlRfREFURV9DRUxMLCB0aGlzLnJvd3MhKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGUgc2hlZXQgZGF0ZSBpcyB0aGUgY3VycmVudCBkYXRlLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzaGVldCBkYXRlIGlzIHRoZSBjdXJyZW50IGRhdGUsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKi9cbiAgICBnZXQgaXNfY3VycmVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hlZXRfZGF0ZS5nZXRUaW1lKCkgPT09IHRoaXMuY3VycmVudF9kYXRlLmdldFRpbWUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmllcyB0byBmaW5kIGEgcGF0cm9sbGVyIGJ5IG5hbWUuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcGF0cm9sbGVyLlxuICAgICAqIEByZXR1cm5zIHtQYXRyb2xsZXJSb3cgfCBcIm5vdF9mb3VuZFwifSBUaGUgcGF0cm9sbGVyIHJvdyBvciBcIm5vdF9mb3VuZFwiLlxuICAgICAqL1xuICAgIHRyeV9maW5kX3BhdHJvbGxlcihuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgcGF0cm9sbGVycyA9IHRoaXMucGF0cm9sbGVycy5maWx0ZXIoKHgpID0+IHgubmFtZSA9PT0gbmFtZSk7XG4gICAgICAgIGlmIChwYXRyb2xsZXJzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIFwibm90X2ZvdW5kXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhdHJvbGxlcnNbMF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmluZHMgYSBwYXRyb2xsZXIgYnkgbmFtZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwYXRyb2xsZXIuXG4gICAgICogQHJldHVybnMge1BhdHJvbGxlclJvd30gVGhlIHBhdHJvbGxlciByb3cuXG4gICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXRyb2xsZXIgaXMgbm90IGZvdW5kLlxuICAgICAqL1xuICAgIGZpbmRfcGF0cm9sbGVyKG5hbWU6IHN0cmluZykge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLnRyeV9maW5kX3BhdHJvbGxlcihuYW1lKTtcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gXCJub3RfZm91bmRcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZmluZCAke25hbWV9IGluIGxvZ2luIHNoZWV0YCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwYXRyb2xsZXJzIHdobyBhcmUgb24gZHV0eS5cbiAgICAgKiBAcmV0dXJucyB7UGF0cm9sbGVyUm93W119IFRoZSBsaXN0IG9mIG9uLWR1dHkgcGF0cm9sbGVycy5cbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIGxvZ2luIHNoZWV0IGlzIG5vdCBjdXJyZW50LlxuICAgICAqL1xuICAgIGdldF9vbl9kdXR5X3BhdHJvbGxlcnMoKTogUGF0cm9sbGVyUm93W10ge1xuICAgICAgICBpZiAoIXRoaXMuaXNfY3VycmVudCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTG9naW4gc2hlZXQgaXMgbm90IGN1cnJlbnRcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucGF0cm9sbGVycy5maWx0ZXIoKHgpID0+IHguY2hlY2tpbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGluIGEgcGF0cm9sbGVyIHdpdGggYSBuZXcgY2hlY2staW4gdmFsdWUuXG4gICAgICogQHBhcmFtIHtQYXRyb2xsZXJSb3d9IHBhdHJvbGxlcl9zdGF0dXMgLSBUaGUgc3RhdHVzIG9mIHRoZSBwYXRyb2xsZXIuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5ld19jaGVja2luX3ZhbHVlIC0gVGhlIG5ldyBjaGVjay1pbiB2YWx1ZS5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIGxvZ2luIHNoZWV0IGlzIG5vdCBjdXJyZW50LlxuICAgICAqL1xuICAgIGFzeW5jIGNoZWNraW4ocGF0cm9sbGVyX3N0YXR1czogUGF0cm9sbGVyUm93LCBuZXdfY2hlY2tpbl92YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICghdGhpcy5pc19jdXJyZW50KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJMb2dpbiBzaGVldCBpcyBub3QgY3VycmVudFwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhgRXhpc3Rpbmcgc3RhdHVzOiAke0pTT04uc3RyaW5naWZ5KHBhdHJvbGxlcl9zdGF0dXMpfWApO1xuXG4gICAgICAgIGNvbnN0IHJvdyA9IHBhdHJvbGxlcl9zdGF0dXMuaW5kZXggKyAxOyAvLyBwcm9ncmFtbWluZyAtPiBleGNlbCBsb29rdXBcbiAgICAgICAgY29uc3QgcmFuZ2UgPSBgJHt0aGlzLmNvbmZpZy5DSEVDS0lOX0RST1BET1dOX0NPTFVNTn0ke3Jvd31gO1xuXG4gICAgICAgIGF3YWl0IHRoaXMubG9naW5fc2hlZXQudXBkYXRlX3ZhbHVlcyhyYW5nZSwgW1tuZXdfY2hlY2tpbl92YWx1ZV1dKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIEFzc2lnbnMgYSBzZWN0aW9uIHRvIGEgcGF0cm9sbGVyLlxuICAgICogQHBhcmFtIHtQYXRyb2xsZXJSb3d9IHBhdHJvbGxlciAtIFRoZSBwYXRyb2xsZXIgdG8gYXNzaWduIHRoZSBzZWN0aW9uIHRvLlxuICAgICogQHBhcmFtIHtzdHJpbmd9IG5ld19zZWN0aW9uX3ZhbHVlIC0gVGhlIG5ldyBzZWN0aW9uIHZhbHVlLlxuICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIGxvZ2luIHNoZWV0IGlzIG5vdCBjdXJyZW50LlxuICAgICovXG4gICAgYXN5bmMgYXNzaWduX3NlY3Rpb24ocGF0cm9sbGVyX3NlY3Rpb246IFBhdHJvbGxlclJvdywgbmV3X3NlY3Rpb25fdmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAoIXRoaXMuaXNfY3VycmVudCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTG9naW4gc2hlZXQgaXMgbm90IGN1cnJlbnRcIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coYEV4aXN0aW5nIHN0YXR1czogJHtKU09OLnN0cmluZ2lmeShwYXRyb2xsZXJfc2VjdGlvbil9YCk7XG5cbiAgICAgICAgY29uc3Qgcm93ID0gcGF0cm9sbGVyX3NlY3Rpb24uaW5kZXggKyAxOyAvLyBwcm9ncmFtbWluZyAtPiBleGNlbCBsb29rdXBcbiAgICAgICAgY29uc3QgcmFuZ2UgPSBgJHt0aGlzLmNvbmZpZy5TRUNUSU9OX0RST1BET1dOX0NPTFVNTn0ke3Jvd31gO1xuXG4gICAgICAgIGF3YWl0IHRoaXMubG9naW5fc2hlZXQudXBkYXRlX3ZhbHVlcyhyYW5nZSwgW1tuZXdfc2VjdGlvbl92YWx1ZV1dKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZXMgYSByb3cgb2YgcGF0cm9sbGVyIGRhdGEuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gVGhlIGluZGV4IG9mIHRoZSByb3cuXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gcm93IC0gVGhlIHJvdyBkYXRhLlxuICAgICAqIEBwYXJhbSB7UGF0cm9sbGVyUm93Q29uZmlnfSBvcHRzIC0gVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyBmb3IgdGhlIHBhdHJvbGxlciByb3cuXG4gICAgICogQHJldHVybnMge1BhdHJvbGxlclJvdyB8IG51bGx9IFRoZSBwYXJzZWQgcGF0cm9sbGVyIHJvdyBvciBudWxsIGlmIGludmFsaWQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBwYXJzZV9wYXRyb2xsZXJfcm93KFxuICAgICAgICBpbmRleDogbnVtYmVyLFxuICAgICAgICByb3c6IHN0cmluZ1tdLFxuICAgICAgICBvcHRzOiBQYXRyb2xsZXJSb3dDb25maWdcbiAgICApOiBQYXRyb2xsZXJSb3cgfCBudWxsIHtcbiAgICAgICAgaWYgKHJvdy5sZW5ndGggPCA0KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXggPCAzKXtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICBuYW1lOiByb3dbZXhjZWxfcm93X3RvX2luZGV4KG9wdHMuTkFNRV9DT0xVTU4pXSxcbiAgICAgICAgICAgIGNhdGVnb3J5OiByb3dbZXhjZWxfcm93X3RvX2luZGV4KG9wdHMuQ0FURUdPUllfQ09MVU1OKV0sXG4gICAgICAgICAgICBzZWN0aW9uOiByb3dbZXhjZWxfcm93X3RvX2luZGV4KG9wdHMuU0VDVElPTl9EUk9QRE9XTl9DT0xVTU4pXSxcbiAgICAgICAgICAgIGNoZWNraW46IHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5DSEVDS0lOX0RST1BET1dOX0NPTFVNTildLFxuICAgICAgICB9O1xuICAgIH1cbn0iLCJpbXBvcnQgeyBzaGVldHNfdjQgfSBmcm9tIFwiZ29vZ2xlYXBpc1wiO1xuaW1wb3J0IHtcbiAgICBTZWFzb25TaGVldENvbmZpZyxcbn0gZnJvbSBcIi4uL2Vudi9oYW5kbGVyX2NvbmZpZ1wiO1xuaW1wb3J0IHsgZXhjZWxfcm93X3RvX2luZGV4IH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxcIjtcbmltcG9ydCBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYiBmcm9tIFwiLi4vdXRpbHMvZ29vZ2xlX3NoZWV0c19zcHJlYWRzaGVldF90YWJcIjtcbmltcG9ydCB7IGZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2N1cnJlbnRfZGF5IH0gZnJvbSBcIi4uL3V0aWxzL2RhdGV0aW1lX3V0aWxcIjtcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBzZWFzb24gc2hlZXQgaW4gR29vZ2xlIFNoZWV0cy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2Vhc29uU2hlZXQge1xuICAgIHNoZWV0OiBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYjtcbiAgICBjb25maWc6IFNlYXNvblNoZWV0Q29uZmlnO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBTZWFzb25TaGVldC5cbiAgICAgKiBAcGFyYW0ge3NoZWV0c192NC5TaGVldHMgfCBudWxsfSBzaGVldHNfc2VydmljZSAtIFRoZSBHb29nbGUgU2hlZXRzIEFQSSBzZXJ2aWNlLlxuICAgICAqIEBwYXJhbSB7U2Vhc29uU2hlZXRDb25maWd9IGNvbmZpZyAtIFRoZSBjb25maWd1cmF0aW9uIGZvciB0aGUgc2Vhc29uIHNoZWV0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyB8IG51bGwsXG4gICAgICAgIGNvbmZpZzogU2Vhc29uU2hlZXRDb25maWdcbiAgICApIHtcbiAgICAgICAgdGhpcy5zaGVldCA9IG5ldyBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYihcbiAgICAgICAgICAgIHNoZWV0c19zZXJ2aWNlLFxuICAgICAgICAgICAgY29uZmlnLlNIRUVUX0lELFxuICAgICAgICAgICAgY29uZmlnLlNFQVNPTl9TSEVFVFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBudW1iZXIgb2YgZGF5cyBwYXRyb2xsZWQgYnkgYSBwYXRyb2xsZXIuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdHJvbGxlcl9uYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHBhdHJvbGxlci5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxudW1iZXI+fSBUaGUgbnVtYmVyIG9mIGRheXMgcGF0cm9sbGVkLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF9wYXRyb2xsZWRfZGF5cyhcbiAgICAgICAgcGF0cm9sbGVyX25hbWU6IHN0cmluZ1xuICAgICk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgICAgIGNvbnN0IHBhdHJvbGxlcl9yb3cgPSBhd2FpdCB0aGlzLnNoZWV0LmdldF9zaGVldF9yb3dfZm9yX3BhdHJvbGxlcihcbiAgICAgICAgICAgIHBhdHJvbGxlcl9uYW1lLFxuICAgICAgICAgICAgdGhpcy5jb25maWcuU0VBU09OX1NIRUVUX05BTUVfQ09MVU1OXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKCFwYXRyb2xsZXJfcm93KSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjdXJyZW50TnVtYmVyID1cbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cucm93W2V4Y2VsX3Jvd190b19pbmRleCh0aGlzLmNvbmZpZy5TRUFTT05fU0hFRVRfREFZU19DT0xVTU4pXTtcblxuICAgICAgICBjb25zdCBjdXJyZW50RGF5ID0gZmlsdGVyX2xpc3RfdG9fZW5kc3dpdGhfY3VycmVudF9kYXkocGF0cm9sbGVyX3Jvdy5yb3cpXG4gICAgICAgICAgICAubWFwKCh4KSA9PiAoeD8uc3RhcnRzV2l0aChcIkhcIikgPyAwLjUgOiAxKSlcbiAgICAgICAgICAgIC5yZWR1Y2UoKHgsIHksIGkpID0+IHggKyB5LCAwKTtcblxuICAgICAgICBjb25zdCBkYXlzQmVmb3JlVG9kYXkgPSBjdXJyZW50TnVtYmVyIC0gY3VycmVudERheTtcbiAgICAgICAgcmV0dXJuIGRheXNCZWZvcmVUb2RheTtcbiAgICB9XG59IiwiaW1wb3J0IHsgZ29vZ2xlIH0gZnJvbSBcImdvb2dsZWFwaXNcIjtcbmltcG9ydCB7IEdlbmVyYXRlQXV0aFVybE9wdHMgfSBmcm9tIFwiZ29vZ2xlLWF1dGgtbGlicmFyeVwiO1xuaW1wb3J0IHsgT0F1dGgyQ2xpZW50IH0gZnJvbSBcImdvb2dsZWFwaXMtY29tbW9uXCI7XG5pbXBvcnQgeyBzYW5pdGl6ZV9waG9uZV9udW1iZXIgfSBmcm9tIFwiLi91dGlscy91dGlsXCI7XG5pbXBvcnQgeyBsb2FkX2NyZWRlbnRpYWxzX2ZpbGVzIH0gZnJvbSBcIi4vdXRpbHMvZmlsZV91dGlsc1wiO1xuaW1wb3J0IHsgU2VydmljZUNvbnRleHQgfSBmcm9tIFwiQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlcy90eXBlc1wiO1xuaW1wb3J0IHsgVXNlckNyZWRzQ29uZmlnIH0gZnJvbSBcIi4vZW52L2hhbmRsZXJfY29uZmlnXCI7XG5pbXBvcnQgeyB2YWxpZGF0ZV9zY29wZXMgfSBmcm9tIFwiLi91dGlscy9zY29wZV91dGlsXCI7XG5cbmNvbnN0IFNDT1BFUyA9IFtcbiAgICBcImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvc2NyaXB0LnByb2plY3RzXCIsXG4gICAgXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3NwcmVhZHNoZWV0c1wiLFxuXTtcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgdXNlciBjcmVkZW50aWFscyBmb3IgR29vZ2xlIE9BdXRoMi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckNyZWRzIHtcbiAgICBudW1iZXI6IHN0cmluZztcbiAgICBvYXV0aDJfY2xpZW50OiBPQXV0aDJDbGllbnQ7XG4gICAgc3luY19jbGllbnQ6IFNlcnZpY2VDb250ZXh0O1xuICAgIGRvbWFpbj86IHN0cmluZztcbiAgICBsb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIFVzZXJDcmVkcyBpbnN0YW5jZS5cbiAgICAgKiBAcGFyYW0ge1NlcnZpY2VDb250ZXh0fSBzeW5jX2NsaWVudCAtIFRoZSBUd2lsaW8gU3luYyBjbGllbnQuXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCB1bmRlZmluZWR9IG51bWJlciAtIFRoZSB1c2VyJ3MgcGhvbmUgbnVtYmVyLlxuICAgICAqIEBwYXJhbSB7VXNlckNyZWRzQ29uZmlnfSBvcHRzIC0gVGhlIHVzZXIgY3JlZGVudGlhbHMgY29uZmlndXJhdGlvbi5cbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gVGhyb3dzIGFuIGVycm9yIGlmIHRoZSBudW1iZXIgaXMgdW5kZWZpbmVkIG9yIG51bGwuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHN5bmNfY2xpZW50OiBTZXJ2aWNlQ29udGV4dCxcbiAgICAgICAgbnVtYmVyOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgICAgIG9wdHM6IFVzZXJDcmVkc0NvbmZpZ1xuICAgICkge1xuICAgICAgICBpZiAobnVtYmVyID09PSB1bmRlZmluZWQgfHwgbnVtYmVyID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOdW1iZXIgaXMgdW5kZWZpbmVkXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubnVtYmVyID0gc2FuaXRpemVfcGhvbmVfbnVtYmVyKG51bWJlcik7XG5cbiAgICAgICAgY29uc3QgY3JlZGVudGlhbHMgPSBsb2FkX2NyZWRlbnRpYWxzX2ZpbGVzKCk7XG4gICAgICAgIGNvbnN0IHsgY2xpZW50X3NlY3JldCwgY2xpZW50X2lkLCByZWRpcmVjdF91cmlzIH0gPSBjcmVkZW50aWFscy53ZWI7XG4gICAgICAgIHRoaXMub2F1dGgyX2NsaWVudCA9IG5ldyBnb29nbGUuYXV0aC5PQXV0aDIoXG4gICAgICAgICAgICBjbGllbnRfaWQsXG4gICAgICAgICAgICBjbGllbnRfc2VjcmV0LFxuICAgICAgICAgICAgcmVkaXJlY3RfdXJpc1swXVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN5bmNfY2xpZW50ID0gc3luY19jbGllbnQ7XG4gICAgICAgIGxldCBkb21haW4gPSBvcHRzLk5TUF9FTUFJTF9ET01BSU47XG4gICAgICAgIGlmIChkb21haW4gPT09IHVuZGVmaW5lZCB8fCBkb21haW4gPT09IG51bGwgfHwgZG9tYWluID09PSBcIlwiKSB7XG4gICAgICAgICAgICBkb21haW4gPSB1bmRlZmluZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRvbWFpbiA9IGRvbWFpbjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvYWQgdGhlIE9BdXRoMiB0b2tlbi5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBib29sZWFuIGluZGljYXRpbmcgaWYgdGhlIHRva2VuIHdhcyBsb2FkZWQuXG4gICAgICovXG4gICAgYXN5bmMgbG9hZFRva2VuKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICBpZiAoIXRoaXMubG9hZGVkKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBMb29raW5nIGZvciAke3RoaXMudG9rZW5fa2V5fWApO1xuICAgICAgICAgICAgICAgIGNvbnN0IG9hdXRoMkRvYyA9IGF3YWl0IHRoaXMuc3luY19jbGllbnRcbiAgICAgICAgICAgICAgICAgICAgLmRvY3VtZW50cyh0aGlzLnRva2VuX2tleSlcbiAgICAgICAgICAgICAgICAgICAgLmZldGNoKCk7XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICBvYXV0aDJEb2MgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgICAgICBvYXV0aDJEb2MuZGF0YSA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICAgICAgb2F1dGgyRG9jLmRhdGEudG9rZW4gPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgRGlkbid0IGZpbmQgJHt0aGlzLnRva2VuX2tleX1gKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0b2tlbiA9IG9hdXRoMkRvYy5kYXRhLnRva2VuO1xuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZV9zY29wZXMob2F1dGgyRG9jLmRhdGEuc2NvcGVzLCBTQ09QRVMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9hdXRoMl9jbGllbnQuc2V0Q3JlZGVudGlhbHModG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgTG9hZGVkIHRva2VuICR7dGhpcy50b2tlbl9rZXl9YCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgICAgIGBGYWlsZWQgdG8gbG9hZCB0b2tlbiBmb3IgJHt0aGlzLnRva2VuX2tleX0uXFxuICR7ZX1gXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5sb2FkZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB0b2tlbiBrZXkuXG4gICAgICogQHJldHVybnMge3N0cmluZ30gVGhlIHRva2VuIGtleS5cbiAgICAgKi9cbiAgICBnZXQgdG9rZW5fa2V5KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgb2F1dGgyXyR7dGhpcy5udW1iZXJ9YDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWxldGUgdGhlIE9BdXRoMiB0b2tlbi5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBib29sZWFuIGluZGljYXRpbmcgaWYgdGhlIHRva2VuIHdhcyBkZWxldGVkLlxuICAgICAqL1xuICAgIGFzeW5jIGRlbGV0ZVRva2VuKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICBjb25zdCBvYXV0aDJEb2MgPSBhd2FpdCB0aGlzLnN5bmNfY2xpZW50XG4gICAgICAgICAgICAuZG9jdW1lbnRzKHRoaXMudG9rZW5fa2V5KVxuICAgICAgICAgICAgLmZldGNoKCk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIG9hdXRoMkRvYyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICBvYXV0aDJEb2MuZGF0YSA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIG9hdXRoMkRvYy5kYXRhLnRva2VuID09PSB1bmRlZmluZWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgRGlkbid0IGZpbmQgJHt0aGlzLnRva2VuX2tleX1gKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLnN5bmNfY2xpZW50LmRvY3VtZW50cyhvYXV0aDJEb2Muc2lkKS5yZW1vdmUoKTtcbiAgICAgICAgY29uc29sZS5sb2coYERlbGV0ZWQgdG9rZW4gJHt0aGlzLnRva2VuX2tleX1gKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29tcGxldGUgdGhlIGxvZ2luIHByb2Nlc3MgYnkgZXhjaGFuZ2luZyB0aGUgYXV0aG9yaXphdGlvbiBjb2RlIGZvciBhIHRva2VuLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb2RlIC0gVGhlIGF1dGhvcml6YXRpb24gY29kZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBzY29wZXMgLSBUaGUgc2NvcGVzIHRvIHZhbGlkYXRlLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBsb2dpbiBwcm9jZXNzIGlzIGNvbXBsZXRlLlxuICAgICAqL1xuICAgIGFzeW5jIGNvbXBsZXRlTG9naW4oY29kZTogc3RyaW5nLCBzY29wZXM6IHN0cmluZ1tdKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHZhbGlkYXRlX3Njb3BlcyhzY29wZXMsIFNDT1BFUyk7XG4gICAgICAgIGNvbnN0IHRva2VuID0gYXdhaXQgdGhpcy5vYXV0aDJfY2xpZW50LmdldFRva2VuKGNvZGUpO1xuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShPYmplY3Qua2V5cyh0b2tlbi5yZXMhKSkpO1xuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0b2tlbi50b2tlbnMpKTtcbiAgICAgICAgdGhpcy5vYXV0aDJfY2xpZW50LnNldENyZWRlbnRpYWxzKHRva2VuLnRva2Vucyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBvYXV0aERvYyA9IGF3YWl0IHRoaXMuc3luY19jbGllbnQuZG9jdW1lbnRzLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgZGF0YTogeyB0b2tlbjogdG9rZW4udG9rZW5zLCBzY29wZXM6IHNjb3BlcyB9LFxuICAgICAgICAgICAgICAgIHVuaXF1ZU5hbWU6IHRoaXMudG9rZW5fa2V5LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgIGBFeGNlcHRpb24gd2hlbiBjcmVhdGluZyBvYXV0aC4gVHJ5aW5nIHRvIHVwZGF0ZSBpbnN0ZWFkLi4uXFxuJHtlfWBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCBvYXV0aERvYyA9IGF3YWl0IHRoaXMuc3luY19jbGllbnRcbiAgICAgICAgICAgICAgICAuZG9jdW1lbnRzKHRoaXMudG9rZW5fa2V5KVxuICAgICAgICAgICAgICAgIC51cGRhdGUoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7IHRva2VuOiB0b2tlbiwgc2NvcGVzOiBzY29wZXMgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgYXV0aG9yaXphdGlvbiBVUkwuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c3RyaW5nPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIGF1dGhvcml6YXRpb24gVVJMLlxuICAgICAqL1xuICAgIGFzeW5jIGdldEF1dGhVcmwoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgY29uc3QgaWQgPSB0aGlzLmdlbmVyYXRlUmFuZG9tU3RyaW5nKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBVc2luZyBub25jZSAke2lkfSBmb3IgJHt0aGlzLm51bWJlcn1gKTtcbiAgICAgICAgY29uc3QgZG9jID0gYXdhaXQgdGhpcy5zeW5jX2NsaWVudC5kb2N1bWVudHMuY3JlYXRlKHtcbiAgICAgICAgICAgIGRhdGE6IHsgbnVtYmVyOiB0aGlzLm51bWJlciwgc2NvcGVzOiBTQ09QRVMgfSxcbiAgICAgICAgICAgIHVuaXF1ZU5hbWU6IGlkLFxuICAgICAgICAgICAgdHRsOiA2MCAqIDUsIC8vIDUgbWludXRlc1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2coYE1hZGUgbm9uY2UtZG9jOiAke0pTT04uc3RyaW5naWZ5KGRvYyl9YCk7XG5cbiAgICAgICAgY29uc3Qgb3B0czogR2VuZXJhdGVBdXRoVXJsT3B0cyA9IHtcbiAgICAgICAgICAgIGFjY2Vzc190eXBlOiBcIm9mZmxpbmVcIixcbiAgICAgICAgICAgIHNjb3BlOiBTQ09QRVMsXG4gICAgICAgICAgICBzdGF0ZTogaWQsXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLmRvbWFpbikge1xuICAgICAgICAgICAgb3B0c1tcImhkXCJdID0gdGhpcy5kb21haW47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBhdXRoVXJsID0gdGhpcy5vYXV0aDJfY2xpZW50LmdlbmVyYXRlQXV0aFVybChvcHRzKTtcbiAgICAgICAgcmV0dXJuIGF1dGhVcmw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2VuZXJhdGUgYSByYW5kb20gc3RyaW5nLlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IEEgcmFuZG9tIHN0cmluZy5cbiAgICAgKi9cbiAgICBnZW5lcmF0ZVJhbmRvbVN0cmluZygpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBsZW5ndGggPSAzMDtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFwiXCI7XG4gICAgICAgIGNvbnN0IGNoYXJhY3RlcnMgPVxuICAgICAgICAgICAgXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OVwiO1xuICAgICAgICBjb25zdCBjaGFyYWN0ZXJzTGVuZ3RoID0gY2hhcmFjdGVycy5sZW5ndGg7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSBjaGFyYWN0ZXJzLmNoYXJBdChcbiAgICAgICAgICAgICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFyYWN0ZXJzTGVuZ3RoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cblxuLyoqXG4gKiBJbnRlcmZhY2UgcmVwcmVzZW50aW5nIHRoZSB1c2VyIGNyZWRlbnRpYWxzIGNvbmZpZ3VyYXRpb24uXG4gKi9cbmV4cG9ydCB7IFVzZXJDcmVkcywgU0NPUEVTIGFzIFVzZXJDcmVkc1Njb3BlcyB9O1xuIiwiLyoqXG4gKiBSZXByZXNlbnRzIGEgY2hlY2staW4gdmFsdWUgd2l0aCB2YXJpb3VzIHByb3BlcnRpZXMgYW5kIGxvb2t1cCB2YWx1ZXMuXG4gKi9cbmNsYXNzIENoZWNraW5WYWx1ZSB7XG4gICAga2V5OiBzdHJpbmc7XG4gICAgc2hlZXRzX3ZhbHVlOiBzdHJpbmc7XG4gICAgc21zX2Rlc2M6IHN0cmluZztcbiAgICBmYXN0X2NoZWNraW5zOiBzdHJpbmdbXTtcbiAgICBsb29rdXBfdmFsdWVzOiBTZXQ8c3RyaW5nPjtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQ2hlY2tpblZhbHVlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBUaGUga2V5IGZvciB0aGUgY2hlY2staW4gdmFsdWUuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNoZWV0c192YWx1ZSAtIFRoZSB2YWx1ZSB1c2VkIGluIHNoZWV0cy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc21zX2Rlc2MgLSBUaGUgZGVzY3JpcHRpb24gdXNlZCBpbiBTTVMuXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCBzdHJpbmdbXX0gZmFzdF9jaGVja2lucyAtIFRoZSBmYXN0IGNoZWNrLWluIHZhbHVlcy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAga2V5OiBzdHJpbmcsXG4gICAgICAgIHNoZWV0c192YWx1ZTogc3RyaW5nLFxuICAgICAgICBzbXNfZGVzYzogc3RyaW5nLFxuICAgICAgICBmYXN0X2NoZWNraW5zOiBzdHJpbmcgfCBzdHJpbmdbXVxuICAgICkge1xuICAgICAgICBpZiAoIShmYXN0X2NoZWNraW5zIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICAgICAgICBmYXN0X2NoZWNraW5zID0gW2Zhc3RfY2hlY2tpbnNdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgICAgICB0aGlzLnNoZWV0c192YWx1ZSA9IHNoZWV0c192YWx1ZTtcbiAgICAgICAgdGhpcy5zbXNfZGVzYyA9IHNtc19kZXNjO1xuICAgICAgICB0aGlzLmZhc3RfY2hlY2tpbnMgPSBmYXN0X2NoZWNraW5zLm1hcCgoeCkgPT4geC50cmltKCkudG9Mb3dlckNhc2UoKSk7XG5cbiAgICAgICAgY29uc3Qgc21zX2Rlc2Nfc3BsaXQ6IHN0cmluZ1tdID0gc21zX2Rlc2NcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXHMrLywgXCItXCIpXG4gICAgICAgICAgICAudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgLnNwbGl0KFwiL1wiKTtcbiAgICAgICAgY29uc3QgbG9va3VwX3ZhbHMgPSBbLi4udGhpcy5mYXN0X2NoZWNraW5zLCAuLi5zbXNfZGVzY19zcGxpdF07XG4gICAgICAgIHRoaXMubG9va3VwX3ZhbHVlcyA9IG5ldyBTZXQ8c3RyaW5nPihsb29rdXBfdmFscyk7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBjb2xsZWN0aW9uIG9mIGNoZWNrLWluIHZhbHVlcyB3aXRoIHZhcmlvdXMgbG9va3VwIG1ldGhvZHMuXG4gKi9cbmNsYXNzIENoZWNraW5WYWx1ZXMge1xuICAgIGJ5X2tleTogeyBba2V5OiBzdHJpbmddOiBDaGVja2luVmFsdWUgfSA9IHt9O1xuICAgIGJ5X2x2OiB7IFtrZXk6IHN0cmluZ106IENoZWNraW5WYWx1ZSB9ID0ge307XG4gICAgYnlfZmM6IHsgW2tleTogc3RyaW5nXTogQ2hlY2tpblZhbHVlIH0gPSB7fTtcbiAgICBieV9zaGVldF9zdHJpbmc6IHsgW2tleTogc3RyaW5nXTogQ2hlY2tpblZhbHVlIH0gPSB7fTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQ2hlY2tpblZhbHVlcy5cbiAgICAgKiBAcGFyYW0ge0NoZWNraW5WYWx1ZVtdfSBjaGVja2luVmFsdWVzIC0gVGhlIGFycmF5IG9mIGNoZWNrLWluIHZhbHVlcy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihjaGVja2luVmFsdWVzOiBDaGVja2luVmFsdWVbXSkge1xuICAgICAgICBmb3IgKHZhciBjaGVja2luVmFsdWUgb2YgY2hlY2tpblZhbHVlcykge1xuICAgICAgICAgICAgdGhpcy5ieV9rZXlbY2hlY2tpblZhbHVlLmtleV0gPSBjaGVja2luVmFsdWU7XG4gICAgICAgICAgICB0aGlzLmJ5X3NoZWV0X3N0cmluZ1tjaGVja2luVmFsdWUuc2hlZXRzX3ZhbHVlXSA9IGNoZWNraW5WYWx1ZTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbHYgb2YgY2hlY2tpblZhbHVlLmxvb2t1cF92YWx1ZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ5X2x2W2x2XSA9IGNoZWNraW5WYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3QgZmMgb2YgY2hlY2tpblZhbHVlLmZhc3RfY2hlY2tpbnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ5X2ZjW2ZjXSA9IGNoZWNraW5WYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGVudHJpZXMgb2YgY2hlY2staW4gdmFsdWVzIGJ5IGtleS5cbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFRoZSBlbnRyaWVzIG9mIGNoZWNrLWluIHZhbHVlcy5cbiAgICAgKi9cbiAgICBlbnRyaWVzKCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmVudHJpZXModGhpcy5ieV9rZXkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlcyBhIGZhc3QgY2hlY2staW4gdmFsdWUgZnJvbSB0aGUgZ2l2ZW4gYm9keSBzdHJpbmcuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHkgLSBUaGUgYm9keSBzdHJpbmcgdG8gcGFyc2UuXG4gICAgICogQHJldHVybnMge0NoZWNraW5WYWx1ZSB8IHVuZGVmaW5lZH0gVGhlIHBhcnNlZCBjaGVjay1pbiB2YWx1ZSBvciB1bmRlZmluZWQuXG4gICAgICovXG4gICAgcGFyc2VfZmFzdF9jaGVja2luKGJvZHk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5ieV9mY1tib2R5XTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZXMgYSBjaGVjay1pbiB2YWx1ZSBmcm9tIHRoZSBnaXZlbiBib2R5IHN0cmluZy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYm9keSAtIFRoZSBib2R5IHN0cmluZyB0byBwYXJzZS5cbiAgICAgKiBAcmV0dXJucyB7Q2hlY2tpblZhbHVlIHwgdW5kZWZpbmVkfSBUaGUgcGFyc2VkIGNoZWNrLWluIHZhbHVlIG9yIHVuZGVmaW5lZC5cbiAgICAgKi9cbiAgICBwYXJzZV9jaGVja2luKGJvZHk6IHN0cmluZykge1xuICAgICAgICBjb25zdCBjaGVja2luX2xvd2VyID0gYm9keS5yZXBsYWNlKC9cXHMrLywgXCJcIik7XG4gICAgICAgIHJldHVybiB0aGlzLmJ5X2x2W2NoZWNraW5fbG93ZXJdO1xuICAgIH1cbn1cblxuZXhwb3J0IHsgQ2hlY2tpblZhbHVlLCBDaGVja2luVmFsdWVzIH0iLCIvKipcbiAqIEVudW0gZm9yIGRpZmZlcmVudCB0eXBlcyBvZiBjb21wIHBhc3Nlcy5cbiAqIEBlbnVtIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBlbnVtIENvbXBQYXNzVHlwZSB7XG4gICAgQ29tcFBhc3MgPSBcImNvbXAtcGFzc1wiLFxuICAgIE1hbmFnZXJQYXNzID0gXCJtYW5hZ2VyLXBhc3NcIixcbn1cblxuLyoqXG4gKiBHZXQgdGhlIGRlc2NyaXB0aW9uIGZvciBhIGdpdmVuIGNvbXAgcGFzcyB0eXBlLlxuICogQHBhcmFtIHtDb21wUGFzc1R5cGV9IHR5cGUgLSBUaGUgdHlwZSBvZiB0aGUgY29tcCBwYXNzLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGRlc2NyaXB0aW9uIG9mIHRoZSBjb21wIHBhc3MgdHlwZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldF9jb21wX3Bhc3NfZGVzY3JpcHRpb24odHlwZTogQ29tcFBhc3NUeXBlKTogc3RyaW5nIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBDb21wUGFzc1R5cGUuQ29tcFBhc3M6XG4gICAgICAgICAgICByZXR1cm4gXCJDb21wIFBhc3NcIjtcbiAgICAgICAgY2FzZSBDb21wUGFzc1R5cGUuTWFuYWdlclBhc3M6XG4gICAgICAgICAgICByZXR1cm4gXCJNYW5hZ2VyIFBhc3NcIjtcbiAgICB9XG4gICAgcmV0dXJuIFwiXCI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBidWlsZF9wYXNzZXNfc3RyaW5nKFxuICAgIHVzZWQ6IG51bWJlcixcbiAgICB0b3RhbDogbnVtYmVyLFxuICAgIHRvZGF5OiBudW1iZXIsXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGZvcmNlX3RvZGF5OiBib29sZWFuID0gZmFsc2Vcbikge1xuICAgIGxldCBtZXNzYWdlID0gYFlvdSBoYXZlIHVzZWQgJHt1c2VkfSBvZiAke3RvdGFsfSAke3R5cGV9IHRoaXMgc2Vhc29uYDtcbiAgICBpZiAoZm9yY2VfdG9kYXkgfHwgdG9kYXkgPiAwKSB7XG4gICAgICAgIG1lc3NhZ2UgKz0gYCAoJHt0b2RheX0gdXNlZCB0b2RheSlgO1xuICAgIH1cbiAgICBtZXNzYWdlICs9IFwiLlwiO1xuICAgIHJldHVybiBtZXNzYWdlO1xufVxuIiwiLyoqXG4gKiBDb252ZXJ0IGFuIEV4Y2VsIGRhdGUgdG8gYSBKYXZhU2NyaXB0IERhdGUgb2JqZWN0LlxuICogQHBhcmFtIHtudW1iZXJ9IGRhdGUgLSBUaGUgRXhjZWwgZGF0ZS5cbiAqIEByZXR1cm5zIHtEYXRlfSBUaGUgSmF2YVNjcmlwdCBEYXRlIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gZXhjZWxfZGF0ZV90b19qc19kYXRlKGRhdGU6IG51bWJlcik6IERhdGUge1xuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBEYXRlKDApO1xuICAgIHJlc3VsdC5zZXRVVENNaWxsaXNlY29uZHMoTWF0aC5yb3VuZCgoZGF0ZSAtIDI1NTY5KSAqIDg2NDAwICogMTAwMCkpO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ2hhbmdlIHRoZSB0aW1lem9uZSBvZiBhIERhdGUgb2JqZWN0IHRvIFBTVC5cbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSAtIFRoZSBEYXRlIG9iamVjdC5cbiAqIEByZXR1cm5zIHtEYXRlfSBUaGUgRGF0ZSBvYmplY3Qgd2l0aCB0aGUgdGltZXpvbmUgc2V0IHRvIFBTVC5cbiAqL1xuZnVuY3Rpb24gY2hhbmdlX3RpbWV6b25lX3RvX3BzdChkYXRlOiBEYXRlKTogRGF0ZSB7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IERhdGUoZGF0ZS50b1VUQ1N0cmluZygpLnJlcGxhY2UoXCIgR01UXCIsIFwiIFBTVFwiKSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBTdHJpcCB0aGUgdGltZSBmcm9tIGEgRGF0ZSBvYmplY3QsIGtlZXBpbmcgb25seSB0aGUgZGF0ZS5cbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSAtIFRoZSBEYXRlIG9iamVjdC5cbiAqIEByZXR1cm5zIHtEYXRlfSBUaGUgRGF0ZSBvYmplY3Qgd2l0aCB0aGUgdGltZSBzdHJpcHBlZC5cbiAqL1xuZnVuY3Rpb24gc3RyaXBfZGF0ZXRpbWVfdG9fZGF0ZShkYXRlOiBEYXRlKTogRGF0ZSB7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IERhdGUoXG4gICAgICAgIGRhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKFwiZW4tVVNcIiwgeyB0aW1lWm9uZTogXCJBbWVyaWNhL0xvc19BbmdlbGVzXCIgfSlcbiAgICApO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogU2FuaXRpemUgYSBkYXRlIGJ5IGNvbnZlcnRpbmcgaXQgZnJvbSBhbiBFeGNlbCBkYXRlIGFuZCBzdHJpcHBpbmcgdGhlIHRpbWUuXG4gKiBAcGFyYW0ge251bWJlcn0gZGF0ZSAtIFRoZSBFeGNlbCBkYXRlLlxuICogQHJldHVybnMge0RhdGV9IFRoZSBzYW5pdGl6ZWQgRGF0ZSBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIHNhbml0aXplX2RhdGUoZGF0ZTogbnVtYmVyKTogRGF0ZSB7XG4gICAgY29uc3QgcmVzdWx0ID0gc3RyaXBfZGF0ZXRpbWVfdG9fZGF0ZShcbiAgICAgICAgY2hhbmdlX3RpbWV6b25lX3RvX3BzdChleGNlbF9kYXRlX3RvX2pzX2RhdGUoZGF0ZSkpXG4gICAgKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEZvcm1hdCBhIERhdGUgb2JqZWN0IGZvciB1c2UgaW4gYSBzcHJlYWRzaGVldCB2YWx1ZS5cbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSAtIFRoZSBEYXRlIG9iamVjdC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgZGF0ZSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGZvcm1hdF9kYXRlX2Zvcl9zcHJlYWRzaGVldF92YWx1ZShkYXRlOiBEYXRlKTogc3RyaW5nIHtcbiAgICBjb25zdCBkYXRlc3RyID0gZGF0ZVxuICAgICAgICAudG9Mb2NhbGVEYXRlU3RyaW5nKClcbiAgICAgICAgLnNwbGl0KFwiL1wiKVxuICAgICAgICAubWFwKCh4KSA9PiB4LnBhZFN0YXJ0KDIsIFwiMFwiKSlcbiAgICAgICAgLmpvaW4oXCJcIik7XG4gICAgcmV0dXJuIGRhdGVzdHI7XG59XG5cbi8qKlxuICogRmlsdGVyIGEgbGlzdCB0byBpbmNsdWRlIG9ubHkgaXRlbXMgdGhhdCBlbmQgd2l0aCBhIHNwZWNpZmljIGRhdGUuXG4gKiBAcGFyYW0ge2FueVtdfSBsaXN0IC0gVGhlIGxpc3QgdG8gZmlsdGVyLlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIC0gVGhlIGRhdGUgdG8gZmlsdGVyIGJ5LlxuICogQHJldHVybnMge2FueVtdfSBUaGUgZmlsdGVyZWQgbGlzdC5cbiAqL1xuZnVuY3Rpb24gZmlsdGVyX2xpc3RfdG9fZW5kc3dpdGhfZGF0ZShsaXN0OiBhbnlbXSwgZGF0ZTogRGF0ZSk6IGFueVtdIHtcbiAgICBjb25zdCBkYXRlc3RyID0gZm9ybWF0X2RhdGVfZm9yX3NwcmVhZHNoZWV0X3ZhbHVlKGRhdGUpO1xuICAgIHJldHVybiBsaXN0Lm1hcCgoeCkgPT4geD8udG9TdHJpbmcoKSkuZmlsdGVyKCh4KSA9PiB4Py5lbmRzV2l0aChkYXRlc3RyKSk7XG59XG5cbi8qKlxuICogRmlsdGVyIGEgbGlzdCB0byBpbmNsdWRlIG9ubHkgaXRlbXMgdGhhdCBlbmQgd2l0aCB0aGUgY3VycmVudCBkYXRlLlxuICogQHBhcmFtIHthbnlbXX0gbGlzdCAtIFRoZSBsaXN0IHRvIGZpbHRlci5cbiAqIEByZXR1cm5zIHthbnlbXX0gVGhlIGZpbHRlcmVkIGxpc3QuXG4gKi9cbmZ1bmN0aW9uIGZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2N1cnJlbnRfZGF5KGxpc3Q6IGFueVtdKTogYW55W10ge1xuICAgIHJldHVybiBmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9kYXRlKGxpc3QsIG5ldyBEYXRlKCkpO1xufVxuXG5leHBvcnQge1xuICAgIHNhbml0aXplX2RhdGUsXG4gICAgZXhjZWxfZGF0ZV90b19qc19kYXRlLFxuICAgIGNoYW5nZV90aW1lem9uZV90b19wc3QsXG4gICAgc3RyaXBfZGF0ZXRpbWVfdG9fZGF0ZSxcbiAgICBmb3JtYXRfZGF0ZV9mb3Jfc3ByZWFkc2hlZXRfdmFsdWUsXG4gICAgZmlsdGVyX2xpc3RfdG9fZW5kc3dpdGhfZGF0ZSxcbiAgICBmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9jdXJyZW50X2RheSxcbn07IiwiaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgJ0B0d2lsaW8tbGFicy9zZXJ2ZXJsZXNzLXJ1bnRpbWUtdHlwZXMnO1xuXG4vKipcbiAqIExvYWQgY3JlZGVudGlhbHMgZnJvbSBhIEpTT04gZmlsZS5cbiAqIEByZXR1cm5zIHthbnl9IFRoZSBwYXJzZWQgY3JlZGVudGlhbHMgZnJvbSB0aGUgSlNPTiBmaWxlLlxuICovXG5mdW5jdGlvbiBsb2FkX2NyZWRlbnRpYWxzX2ZpbGVzKCk6IGFueSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoXG4gICAgICAgIGZzXG4gICAgICAgICAgICAucmVhZEZpbGVTeW5jKFJ1bnRpbWUuZ2V0QXNzZXRzKClbXCIvY3JlZGVudGlhbHMuanNvblwiXS5wYXRoKVxuICAgICAgICAgICAgLnRvU3RyaW5nKClcbiAgICApO1xufVxuXG4vKipcbiAqIEdldCB0aGUgcGF0aCB0byB0aGUgc2VydmljZSBjcmVkZW50aWFscyBmaWxlLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIHBhdGggdG8gdGhlIHNlcnZpY2UgY3JlZGVudGlhbHMgZmlsZS5cbiAqL1xuZnVuY3Rpb24gZ2V0X3NlcnZpY2VfY3JlZGVudGlhbHNfcGF0aCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBSdW50aW1lLmdldEFzc2V0cygpW1wiL3NlcnZpY2UtY3JlZGVudGlhbHMuanNvblwiXS5wYXRoO1xufVxuXG5leHBvcnQgeyBsb2FkX2NyZWRlbnRpYWxzX2ZpbGVzLCBnZXRfc2VydmljZV9jcmVkZW50aWFsc19wYXRoIH07IiwiaW1wb3J0IHsgc2hlZXRzX3Y0IH0gZnJvbSBcImdvb2dsZWFwaXNcIjtcbmltcG9ydCB7IGV4Y2VsX3Jvd190b19pbmRleCB9IGZyb20gXCIuL3V0aWxcIjtcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBHb29nbGUgU2hlZXRzIHNwcmVhZHNoZWV0IHRhYi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIge1xuICAgIHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzIHwgbnVsbDtcbiAgICBzaGVldF9pZDogc3RyaW5nO1xuICAgIHNoZWV0X25hbWU6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiLlxuICAgICAqIEBwYXJhbSB7c2hlZXRzX3Y0LlNoZWV0cyB8IG51bGx9IHNoZWV0c19zZXJ2aWNlIC0gVGhlIEdvb2dsZSBTaGVldHMgQVBJIHNlcnZpY2UgaW5zdGFuY2UuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNoZWV0X2lkIC0gVGhlIElEIG9mIHRoZSBHb29nbGUgU2hlZXRzIHNwcmVhZHNoZWV0LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaGVldF9uYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHNoZWV0IHRhYi5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgc2hlZXRzX3NlcnZpY2U6IHNoZWV0c192NC5TaGVldHMgfCBudWxsLFxuICAgICAgICBzaGVldF9pZDogc3RyaW5nLFxuICAgICAgICBzaGVldF9uYW1lOiBzdHJpbmdcbiAgICApIHtcbiAgICAgICAgdGhpcy5zaGVldHNfc2VydmljZSA9IHNoZWV0c19zZXJ2aWNlO1xuICAgICAgICB0aGlzLnNoZWV0X2lkID0gc2hlZXRfaWQ7XG4gICAgICAgIHRoaXMuc2hlZXRfbmFtZSA9IHNoZWV0X25hbWUuc3BsaXQoXCIhXCIpWzBdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB2YWx1ZXMgZnJvbSB0aGUgc2hlZXQuXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCBudWxsfSBbcmFuZ2VdIC0gVGhlIHJhbmdlIHRvIGdldCB2YWx1ZXMgZnJvbS5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnlbXVtdIHwgdW5kZWZpbmVkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIHZhbHVlcyBmcm9tIHRoZSBzaGVldC5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfdmFsdWVzKHJhbmdlPzogc3RyaW5nIHwgbnVsbCk6IFByb21pc2U8YW55W11bXSB8IHVuZGVmaW5lZD4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLl9nZXRfdmFsdWVzKHJhbmdlKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhLnZhbHVlcyA/PyB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSByb3cgZm9yIGEgc3BlY2lmaWMgcGF0cm9sbGVyLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRyb2xsZXJfbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwYXRyb2xsZXIuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVfY29sdW1uIC0gVGhlIGNvbHVtbiB3aGVyZSB0aGUgcGF0cm9sbGVyJ3MgbmFtZSBpcyBsb2NhdGVkLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbH0gW3JhbmdlXSAtIFRoZSByYW5nZSB0byBzZWFyY2ggd2l0aGluLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHsgcm93OiBhbnlbXTsgaW5kZXg6IG51bWJlcjsgfSB8IG51bGw+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgcm93IGFuZCBpbmRleCBvZiB0aGUgcGF0cm9sbGVyLCBvciBudWxsIGlmIG5vdCBmb3VuZC5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfc2hlZXRfcm93X2Zvcl9wYXRyb2xsZXIoXG4gICAgICAgIHBhdHJvbGxlcl9uYW1lOiBzdHJpbmcsXG4gICAgICAgIG5hbWVfY29sdW1uOiBzdHJpbmcsXG4gICAgICAgIHJhbmdlPzogc3RyaW5nIHwgbnVsbFxuICAgICk6IFByb21pc2U8eyByb3c6IGFueVtdOyBpbmRleDogbnVtYmVyOyB9IHwgbnVsbD4ge1xuICAgICAgICBjb25zdCByb3dzID0gYXdhaXQgdGhpcy5nZXRfdmFsdWVzKHJhbmdlKTtcbiAgICAgICAgaWYgKHJvd3MpIHtcbiAgICAgICAgICAgIGNvbnN0IGxvb2t1cF9pbmRleCA9IGV4Y2VsX3Jvd190b19pbmRleChuYW1lX2NvbHVtbik7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvd3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAocm93c1tpXVtsb29rdXBfaW5kZXhdID09PSBwYXRyb2xsZXJfbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyByb3c6IHJvd3NbaV0sIGluZGV4OiBpIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICBgQ291bGRuJ3QgZmluZCBwYXRyb2xsZXIgJHtwYXRyb2xsZXJfbmFtZX0gaW4gc2hlZXQgJHt0aGlzLnNoZWV0X25hbWV9LmBcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHZhbHVlcyBpbiB0aGUgc2hlZXQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJhbmdlIC0gVGhlIHJhbmdlIHRvIHVwZGF0ZS5cbiAgICAgKiBAcGFyYW0ge2FueVtdW119IHZhbHVlcyAtIFRoZSB2YWx1ZXMgdG8gdXBkYXRlLlxuICAgICAqL1xuICAgIGFzeW5jIHVwZGF0ZV92YWx1ZXMocmFuZ2U6IHN0cmluZywgdmFsdWVzOiBhbnlbXVtdKSB7XG4gICAgICAgIGNvbnN0IHVwZGF0ZU1lID0gKGF3YWl0IHRoaXMuX2dldF92YWx1ZXMocmFuZ2UsIG51bGwpKS5kYXRhO1xuXG4gICAgICAgIHVwZGF0ZU1lLnZhbHVlcyA9IHZhbHVlcztcbiAgICAgICAgYXdhaXQgdGhpcy5zaGVldHNfc2VydmljZSEuc3ByZWFkc2hlZXRzLnZhbHVlcy51cGRhdGUoe1xuICAgICAgICAgICAgc3ByZWFkc2hlZXRJZDogdGhpcy5zaGVldF9pZCxcbiAgICAgICAgICAgIHZhbHVlSW5wdXRPcHRpb246IFwiVVNFUl9FTlRFUkVEXCIsXG4gICAgICAgICAgICByYW5nZTogdXBkYXRlTWUucmFuZ2UhLFxuICAgICAgICAgICAgcmVxdWVzdEJvZHk6IHVwZGF0ZU1lLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdmFsdWVzIGZyb20gdGhlIHNoZWV0IChwcml2YXRlIG1ldGhvZCkuXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCBudWxsfSBbcmFuZ2VdIC0gVGhlIHJhbmdlIHRvIGdldCB2YWx1ZXMgZnJvbS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bGx9IFt2YWx1ZVJlbmRlck9wdGlvbl0gLSBUaGUgdmFsdWUgcmVuZGVyIG9wdGlvbi5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnlbXVtdPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIHZhbHVlIHJhbmdlLlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcHJpdmF0ZSBhc3luYyBfZ2V0X3ZhbHVlcyhcbiAgICAgICAgcmFuZ2U/OiBzdHJpbmcgfCBudWxsLFxuICAgICAgICB2YWx1ZVJlbmRlck9wdGlvbjogc3RyaW5nIHwgbnVsbCA9IFwiVU5GT1JNQVRURURfVkFMVUVcIlxuICAgICkge1xuICAgICAgICBsZXQgbG9va3VwUmFuZ2UgPSB0aGlzLnNoZWV0X25hbWU7XG4gICAgICAgIGlmIChyYW5nZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBsb29rdXBSYW5nZSA9IGxvb2t1cFJhbmdlICsgXCIhXCI7XG5cbiAgICAgICAgICAgIGlmIChyYW5nZS5zdGFydHNXaXRoKGxvb2t1cFJhbmdlKSkge1xuICAgICAgICAgICAgICAgIHJhbmdlID0gcmFuZ2Uuc3Vic3RyaW5nKGxvb2t1cFJhbmdlLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb29rdXBSYW5nZSA9IGxvb2t1cFJhbmdlICsgcmFuZ2U7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG9wdHM6IHNoZWV0c192NC5QYXJhbXMkUmVzb3VyY2UkU3ByZWFkc2hlZXRzJFZhbHVlcyRHZXQgPSB7XG4gICAgICAgICAgICBzcHJlYWRzaGVldElkOiB0aGlzLnNoZWV0X2lkLFxuICAgICAgICAgICAgcmFuZ2U6IGxvb2t1cFJhbmdlLFxuICAgICAgICB9O1xuICAgICAgICBpZiAodmFsdWVSZW5kZXJPcHRpb24pIHtcbiAgICAgICAgICAgIG9wdHMudmFsdWVSZW5kZXJPcHRpb24gPSB2YWx1ZVJlbmRlck9wdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLnNoZWV0c19zZXJ2aWNlIS5zcHJlYWRzaGVldHMudmFsdWVzLmdldChvcHRzKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG4iLCIvKipcbiAqIFZhbGlkYXRlcyBpZiB0aGUgcHJvdmlkZWQgc2NvcGVzIGluY2x1ZGUgYWxsIGRlc2lyZWQgc2NvcGVzLlxuICogQHBhcmFtIHtzdHJpbmdbXX0gc2NvcGVzIC0gVGhlIGxpc3Qgb2Ygc2NvcGVzIHRvIHZhbGlkYXRlLlxuICogQHBhcmFtIHtzdHJpbmdbXX0gZGVzaXJlZF9zY29wZXMgLSBUaGUgbGlzdCBvZiBkZXNpcmVkIHNjb3Blcy5cbiAqIEB0aHJvd3Mge0Vycm9yfSBUaHJvd3MgYW4gZXJyb3IgaWYgYW55IGRlc2lyZWQgc2NvcGUgaXMgbWlzc2luZy5cbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVfc2NvcGVzKHNjb3Blczogc3RyaW5nW10sIGRlc2lyZWRfc2NvcGVzOiBzdHJpbmdbXSkge1xuICAgIGZvciAoY29uc3QgZGVzaXJlZF9zY29wZSBvZiBkZXNpcmVkX3Njb3Blcykge1xuICAgICAgICBpZiAoc2NvcGVzID09PSB1bmRlZmluZWQgfHwgIXNjb3Blcy5pbmNsdWRlcyhkZXNpcmVkX3Njb3BlKSkge1xuICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBgTWlzc2luZyBzY29wZSAke2Rlc2lyZWRfc2NvcGV9IGluIHJlY2VpdmVkIHNjb3BlczogJHtzY29wZXN9YDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQge3ZhbGlkYXRlX3Njb3Blc30iLCJpbXBvcnQgeyBTZWN0aW9uQ29uZmlnIH0gZnJvbSAnLi4vZW52L2hhbmRsZXJfY29uZmlnJztcblxuLyoqXG4gICAgKiBDbGFzcyBmb3Igc2VjdGlvbiB2YWx1ZXMuXG4gICAgKi9cbmNsYXNzIFNlY3Rpb25WYWx1ZXMge1xuICAgIHNlY3Rpb25fY29uZmlnOiBTZWN0aW9uQ29uZmlnXG4gICAgc2VjdGlvbnM6IHN0cmluZ1tdO1xuXG4gICAgY29uc3RydWN0b3Ioc2VjdGlvbl9jb25maWc6IFNlY3Rpb25Db25maWcpIHtcbiAgICAgICAgdGhpcy5zZWN0aW9uX2NvbmZpZyA9IHNlY3Rpb25fY29uZmlnO1xuICAgICAgICB0aGlzLnNlY3Rpb25zID0gc2VjdGlvbl9jb25maWcuU0VDVElPTl9WQUxVRVMuc3BsaXQoJywnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBzZWN0aW9uIGRlc2NyaXB0aW9uLlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBzZWN0aW9uIGRlc2NyaXB0aW9uLlxuICAgICovXG4gICAgZ2V0X3NlY3Rpb25fZGVzY3JpcHRpb24oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VjdGlvbl9jb25maWcuU0VDVElPTl9WQUxVRVM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBQYXJzZXMgYSBzZWN0aW9uLlxuICAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHkgLSBUaGUgYm9keSBvZiB0aGUgcmVxdWVzdC5cbiAgICAqIEByZXR1cm5zIHtzdHJpbmcgfCBudWxsfSBUaGUgc2VjdGlvbiBpZiBpdCBpcyBhIHZhbGlkIHNlY3Rpb24gb3IgbnVsbC5cbiAgICAqL1xuICAgIHBhcnNlX3NlY3Rpb24oYm9keTogc3RyaW5nKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgICAgICByZXR1cm4gdGhpcy5zZWN0aW9ucy5pbmNsdWRlcyhib2R5KSA/IGJvZHkgOiBudWxsO1xuICAgIH1cbn1cblxuZXhwb3J0IHsgU2VjdGlvblZhbHVlcyB9OyIsIi8qKlxuICogQ29udmVydCByb3cgYW5kIGNvbHVtbiBudW1iZXJzIHRvIGFuIEV4Y2VsLWxpa2UgaW5kZXguXG4gKiBAcGFyYW0ge251bWJlcn0gcm93IC0gVGhlIHJvdyBudW1iZXIgKDAtYmFzZWQpLlxuICogQHBhcmFtIHtudW1iZXJ9IGNvbCAtIFRoZSBjb2x1bW4gbnVtYmVyICgwLWJhc2VkKS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBFeGNlbC1saWtlIGluZGV4IChlLmcuLCBcIkExXCIpLlxuICovXG5mdW5jdGlvbiByb3dfY29sX3RvX2V4Y2VsX2luZGV4KHJvdzogbnVtYmVyLCBjb2w6IG51bWJlcik6IHN0cmluZyB7XG4gICAgbGV0IGNvbFN0cmluZyA9IFwiXCI7XG4gICAgY29sICs9IDE7XG4gICAgd2hpbGUgKGNvbCA+IDApIHtcbiAgICAgICAgY29sIC09IDE7XG4gICAgICAgIGNvbnN0IG1vZHVsbyA9IGNvbCAlIDI2O1xuICAgICAgICBjb25zdCBjb2xMZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKCdBJy5jaGFyQ29kZUF0KDApICsgbW9kdWxvKTtcbiAgICAgICAgY29sU3RyaW5nID0gY29sTGV0dGVyICsgY29sU3RyaW5nO1xuICAgICAgICBjb2wgPSBNYXRoLmZsb29yKGNvbCAvIDI2KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbFN0cmluZyArIChyb3cgKyAxKS50b1N0cmluZygpO1xufVxuXG4vKipcbiAqIFNwbGl0IGFuIEV4Y2VsLWxpa2UgaW5kZXggaW50byByb3cgYW5kIGNvbHVtbiBudW1iZXJzLlxuICogQHBhcmFtIHtzdHJpbmd9IGV4Y2VsX2luZGV4IC0gVGhlIEV4Y2VsLWxpa2UgaW5kZXggKGUuZy4sIFwiQTFcIikuXG4gKiBAcmV0dXJucyB7W251bWJlciwgbnVtYmVyXX0gQW4gYXJyYXkgY29udGFpbmluZyB0aGUgcm93IGFuZCBjb2x1bW4gbnVtYmVycyAoMC1iYXNlZCkuXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIGluZGV4IGNhbm5vdCBiZSBwYXJzZWQuXG4gKi9cbmZ1bmN0aW9uIHNwbGl0X3RvX3Jvd19jb2woZXhjZWxfaW5kZXg6IHN0cmluZyk6IFtudW1iZXIsIG51bWJlcl0ge1xuICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cChcIl4oW0EtWmEtel0rKShbMC05XSspJFwiKTtcbiAgICBjb25zdCBtYXRjaCA9IHJlZ2V4LmV4ZWMoZXhjZWxfaW5kZXgpO1xuICAgIGlmIChtYXRjaCA9PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBwYXJzZSBzdHJpbmcgZm9yIGV4Y2VsIHBvc2l0aW9uIHNwbGl0XCIpO1xuICAgIH1cbiAgICBjb25zdCBjb2wgPSBleGNlbF9yb3dfdG9faW5kZXgobWF0Y2hbMV0pO1xuICAgIGNvbnN0IHJhd19yb3cgPSBOdW1iZXIobWF0Y2hbMl0pO1xuICAgIGlmIChyYXdfcm93IDwgMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJSb3cgbXVzdCBiZSA+PTFcIik7XG4gICAgfVxuICAgIHJldHVybiBbcmF3X3JvdyAtIDEsIGNvbF07XG59XG5cbi8qKlxuICogTG9vayB1cCBhIHZhbHVlIGluIGEgc2hlZXQgYnkgaXRzIEV4Y2VsLWxpa2UgaW5kZXguXG4gKiBAcGFyYW0ge3N0cmluZ30gZXhjZWxfaW5kZXggLSBUaGUgRXhjZWwtbGlrZSBpbmRleCAoZS5nLiwgXCJBMVwiKS5cbiAqIEBwYXJhbSB7YW55W11bXX0gc2hlZXQgLSBUaGUgc2hlZXQgZGF0YS5cbiAqIEByZXR1cm5zIHthbnl9IFRoZSB2YWx1ZSBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LCBvciB1bmRlZmluZWQgaWYgbm90IGZvdW5kLlxuICovXG5mdW5jdGlvbiBsb29rdXBfcm93X2NvbF9pbl9zaGVldChleGNlbF9pbmRleDogc3RyaW5nLCBzaGVldDogYW55W11bXSk6IGFueSB7XG4gICAgY29uc3QgW3JvdywgY29sXSA9IHNwbGl0X3RvX3Jvd19jb2woZXhjZWxfaW5kZXgpO1xuICAgIGlmIChyb3cgPj0gc2hlZXQubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiBzaGVldFtyb3ddW2NvbF07XG59XG5cbi8qKlxuICogQ29udmVydCBFeGNlbC1saWtlIGNvbHVtbiBsZXR0ZXJzIHRvIGEgY29sdW1uIG51bWJlci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBsZXR0ZXJzIC0gVGhlIGNvbHVtbiBsZXR0ZXJzIChlLmcuLCBcIkFcIikuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgY29sdW1uIG51bWJlciAoMC1iYXNlZCkuXG4gKi9cbmZ1bmN0aW9uIGV4Y2VsX3Jvd190b19pbmRleChsZXR0ZXJzOiBzdHJpbmcpOiBudW1iZXIge1xuICAgIGNvbnN0IGxvd2VyTGV0dGVycyA9IGxldHRlcnMudG9Mb3dlckNhc2UoKTtcbiAgICBsZXQgcmVzdWx0OiBudW1iZXIgPSAwO1xuICAgIGZvciAodmFyIHAgPSAwOyBwIDwgbG93ZXJMZXR0ZXJzLmxlbmd0aDsgcCsrKSB7XG4gICAgICAgIGNvbnN0IGNoYXJhY3RlclZhbHVlID1cbiAgICAgICAgICAgIGxvd2VyTGV0dGVycy5jaGFyQ29kZUF0KHApIC0gXCJhXCIuY2hhckNvZGVBdCgwKSArIDE7XG4gICAgICAgIHJlc3VsdCA9IGNoYXJhY3RlclZhbHVlICsgcmVzdWx0ICogMjY7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQgLSAxO1xufVxuXG4vKipcbiAqIFNhbml0aXplIGEgcGhvbmUgbnVtYmVyIGJ5IHJlbW92aW5nIHVud2FudGVkIGNoYXJhY3RlcnMuXG4gKiBAcGFyYW0ge251bWJlciB8IHN0cmluZ30gbnVtYmVyIC0gVGhlIHBob25lIG51bWJlciB0byBzYW5pdGl6ZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBzYW5pdGl6ZWQgcGhvbmUgbnVtYmVyLlxuICovXG5mdW5jdGlvbiBzYW5pdGl6ZV9waG9uZV9udW1iZXIobnVtYmVyOiBudW1iZXIgfCBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGxldCBuZXdfbnVtYmVyID0gbnVtYmVyLnRvU3RyaW5nKCk7XG4gICAgbmV3X251bWJlciA9IG5ld19udW1iZXIucmVwbGFjZShcIndoYXRzYXBwOlwiLCBcIlwiKTtcbiAgICBsZXQgdGVtcG9yYXJ5X25ld19udW1iZXI6IHN0cmluZyA9IFwiXCI7XG4gICAgd2hpbGUgKHRlbXBvcmFyeV9uZXdfbnVtYmVyICE9IG5ld19udW1iZXIpIHtcbiAgICAgICAgLy8gRG8gdGhpcyBtdWx0aXBsZSB0aW1lcyBzbyB3ZSBnZXQgYWxsICsxIGF0IHRoZSBzdGFydCBvZiB0aGUgc3RyaW5nLCBldmVuIGFmdGVyIHN0cmlwcGluZy5cbiAgICAgICAgdGVtcG9yYXJ5X25ld19udW1iZXIgPSBuZXdfbnVtYmVyO1xuICAgICAgICBuZXdfbnVtYmVyID0gbmV3X251bWJlci5yZXBsYWNlKC8oXlxcKzF8XFwofFxcKXxcXC58LSkvZywgXCJcIik7XG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdCA9IFN0cmluZyhwYXJzZUludChuZXdfbnVtYmVyKSkucGFkU3RhcnQoMTAsIFwiMFwiKTtcbiAgICBpZiAocmVzdWx0Lmxlbmd0aCA9PSAxMSAmJiByZXN1bHRbMF0gPT0gXCIxXCIpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5zdWJzdHJpbmcoMSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCB7XG4gICAgcm93X2NvbF90b19leGNlbF9pbmRleCxcbiAgICBleGNlbF9yb3dfdG9faW5kZXgsXG4gICAgc2FuaXRpemVfcGhvbmVfbnVtYmVyLFxuICAgIHNwbGl0X3RvX3Jvd19jb2wsXG4gICAgbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQsXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJnb29nbGVhcGlzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9oYW5kbGVycy9oYW5kbGVyLnByb3RlY3RlZC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==