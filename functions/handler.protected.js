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
    COMP_PASS_SHEET_DATES_USED_TODAY_COLUMN: "E",
    COMP_PASS_SHEET_DATES_STARTING_COLUMN: "G",
};
const manager_passes_config = {
    SHEET_ID: "test",
    MANAGER_PASS_SHEET: "Managers",
    MANAGER_PASS_SHEET_NAME_COLUMN: "A",
    MANAGER_PASS_SHEET_AVAIABLE_COLUMN: "G",
    MANAGER_PASS_SHEET_USED_TODAY_COLUMN: "C",
    MANAGER_PASS_SHEET_DATES_STARTING_COLUMN: "H",
};
const handler_config = {
    SHEET_ID: "test",
    SCRIPT_ID: "test",
    SYNC_SID: "test",
    ARCHIVE_FUNCTION_NAME: "Archive",
    RESET_FUNCTION_NAME: "Reset",
    USE_SERVICE_ACCOUNT: true,
    ACITON_LOG_SHEET: "Bot_Usage",
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
    parse_fast_checkin_mode(body) {
        const parsed = this.checkin_values.parse_fast_checkin(body);
        if (parsed !== undefined) {
            this.checkin_mode = parsed.key;
            this.fast_checkin = true;
            return true;
        }
        return false;
    }
    parse_checkin(body) {
        const parsed = this.checkin_values.parse_checkin(body);
        if (parsed !== undefined) {
            this.checkin_mode = parsed.key;
            return true;
        }
        return false;
    }
    parse_checkin_from_next_step() {
        var _a;
        const last_segment = (_a = this.bvnsp_checkin_next_step) === null || _a === void 0 ? void 0 : _a.split("-").slice(-1)[0];
        if (last_segment && last_segment in this.checkin_values.by_key) {
            this.checkin_mode = last_segment;
            return true;
        }
        return false;
    }
    parse_pass_from_next_step() {
        var _a;
        const last_segment = (_a = this.bvnsp_checkin_next_step) === null || _a === void 0 ? void 0 : _a.split("-").slice(-2).join("-");
        return last_segment;
    }
    delay(seconds, optional = false) {
        if (optional && !this.sms_request) {
            seconds = 1 / 1000.0;
        }
        return new Promise((res) => {
            setTimeout(res, seconds);
        });
    }
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
                const number = Number(this.body);
                if (!Number.isNaN(number) &&
                    [comp_passes_1.CompPassType.CompPass, comp_passes_1.CompPassType.ManagerPass].includes(type)) {
                    return yield this.prompt_comp_manager_pass(type, number);
                }
            }
            if (this.bvnsp_checkin_next_step) {
                yield this.send_message("Sorry, I didn't understand that.");
            }
            return this.prompt_command();
        });
    }
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
    prompt_command() {
        return {
            response: `${this.patroller.name}, I'm BVNSP Bot. 
Enter a command:
Check in / Check out / Status / On Duty / Comp Pass / Manager Pass / Whatsapp
Send 'restart' at any time to begin again`,
            next_step: exports.NEXT_STEPS.AWAIT_COMMAND,
        };
    }
    prompt_checkin() {
        const types = Object.values(this.checkin_values.by_key).map((x) => x.sms_desc);
        return {
            response: `${this.patroller.name}, update patrolling status to: ${types
                .slice(0, -1)
                .join(", ")}, or ${types.slice(-1)}?`,
            next_step: exports.NEXT_STEPS.AWAIT_CHECKIN,
        };
    }
    prompt_comp_manager_pass(pass_type, passes_to_use) {
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
            if (passes_to_use == null) {
                return used_and_available.get_prompt();
            }
            else {
                yield this.log_action(`use_${pass_type}`);
                yield sheet.set_used_comp_passes(used_and_available, passes_to_use);
                return {
                    response: `Updated ${this.patroller.name} to use ${passes_to_use} ${(0, comp_passes_1.get_comp_pass_description)(pass_type)} today.`,
                };
            }
        });
    }
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
    get_status_string() {
        var _a, _b;
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
            const usedCompPasses = (_a = (yield comp_pass_promise)) === null || _a === void 0 ? void 0 : _a.used;
            const usedManagerPasses = (_b = (yield manager_pass_promise)) === null || _b === void 0 ? void 0 : _b.used;
            if (usedCompPasses) {
                statusString += ` You are using ${usedCompPasses} comp passes today.`;
            }
            if (usedManagerPasses) {
                statusString += ` You are using ${usedManagerPasses} manager passes today.`;
            }
            return statusString;
        });
    }
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
    log_action(action_name) {
        return __awaiter(this, void 0, void 0, function* () {
            const sheets_service = yield this.get_sheets_service();
            yield sheets_service.spreadsheets.values.append({
                spreadsheetId: this.combined_config.SHEET_ID,
                range: this.config.ACITON_LOG_SHEET,
                valueInputOption: "USER_ENTERED",
                requestBody: {
                    values: [[this.patroller.name, new Date(), action_name]],
                },
            });
        });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            const user_creds = this.get_user_creds();
            yield user_creds.deleteToken();
            return {
                response: "Okay, I have removed all login session information.",
            };
        });
    }
    get_twilio_client() {
        if (this.twilio_client == null) {
            throw new Error("twilio_client was never initialized!");
        }
        return this.twilio_client;
    }
    get_sync_client() {
        if (!this.sync_client) {
            this.sync_client = this.get_twilio_client().sync.services(this.sync_sid);
        }
        return this.sync_client;
    }
    get_user_creds() {
        if (!this.user_creds) {
            this.user_creds = new user_creds_1.UserCreds(this.get_sync_client(), this.from, this.combined_config);
        }
        return this.user_creds;
    }
    get_service_creds() {
        if (!this.service_creds) {
            this.service_creds = new googleapis_1.google.auth.GoogleAuth({
                keyFile: (0, file_utils_1.get_service_credentials_path)(),
                scopes: this.SCOPES,
            });
        }
        return this.service_creds;
    }
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
    constructor(row, index, available, used, type) {
        this.row = row;
        this.index = index;
        this.remaining_today = Number(available);
        this.used = Number(used);
        this.available_today = this.remaining_today + used;
        this.comp_pass_type = type;
    }
    get_prompt() {
        if (this.available_today > 0) {
            let response = null;
            if (this.comp_pass_type == comp_passes_1.CompPassType.CompPass) {
                response = `You have up to ${this.available_today} comp passes you can use today. You have currently used ${this.used} so far. Enter the first and last name of the guest that will use a comp pass today (or  'restart'):`;
            }
            else if (this.comp_pass_type == comp_passes_1.CompPassType.ManagerPass) {
                response = `You can have up to  ${this.available_today} manager passes you can use today. You have currently used ${this.used}  so far. Enter the first and last name of the guest that will use a comp pass today (or  'restart'):`;
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
            const current_day_used_passes = patroller_row.row[(0, util_1.excel_row_to_index)(this.used_column)];
            return new UsedAndAvailablePasses(patroller_row.row, patroller_row.index, current_day_available_passes, current_day_used_passes, this.comp_pass_type);
        });
    }
    set_used_comp_passes(patroller_row, passes_desired) {
        return __awaiter(this, void 0, void 0, function* () {
            if (patroller_row.available_today < passes_desired) {
                throw new Error(`Not enough available passes: Available: ${patroller_row.available_today}, Used: ${patroller_row.used}, Desired: ${passes_desired}`);
            }
            const rownum = patroller_row.index;
            const start_index = this.start_index;
            const prior_length = patroller_row.row.length - start_index;
            const current_date_string = (0, datetime_util_1.format_date_for_spreadsheet_value)(new Date());
            let new_vals = patroller_row.row
                .slice(start_index)
                .map((x) => x === null || x === void 0 ? void 0 : x.toString())
                .filter((x) => !(x === null || x === void 0 ? void 0 : x.endsWith(current_date_string)));
            for (var i = 0; i < passes_desired; i++) {
                new_vals.push(current_date_string);
            }
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
    get used_column() {
        return this.config.COMP_PASS_SHEET_DATES_USED_TODAY_COLUMN;
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
        return this.config.MANAGER_PASS_SHEET_AVAIABLE_COLUMN;
    }
    get used_column() {
        return this.config.MANAGER_PASS_SHEET_USED_TODAY_COLUMN;
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
            console.log("Refreshing Patrollers: " + this.patrollers);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFBVSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUM3RDtJQUNELE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzlELElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxFQUFFLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFBRTtRQUN6QyxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDOUI7SUFDRCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBS0csc0RBQXFCOzs7Ozs7Ozs7OztBQzdGekI7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9lbnYvaGFuZGxlcl9jb25maWcudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9oYW5kbGVycy9idm5zcF9jaGVja2luX2hhbmRsZXIudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9oYW5kbGVycy9oYW5kbGVyLnByb3RlY3RlZC50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3NoZWV0cy9jb21wX3Bhc3Nfc2hlZXQudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9zaGVldHMvbG9naW5fc2hlZXQudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9zaGVldHMvc2Vhc29uX3NoZWV0LnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXNlci1jcmVkcy50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3V0aWxzL2NoZWNraW5fdmFsdWVzLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvY29tcF9wYXNzZXMudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91dGlscy9kYXRldGltZV91dGlsLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvZmlsZV91dGlscy50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3V0aWxzL2dvb2dsZV9zaGVldHNfc3ByZWFkc2hlZXRfdGFiLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvc2NvcGVfdXRpbC50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3V0aWxzL3V0aWwudHMiLCJleHRlcm5hbCBjb21tb25qcyBcIkB0d2lsaW8tbGFicy9zZXJ2ZXJsZXNzLXJ1bnRpbWUtdHlwZXNcIiIsImV4dGVybmFsIGNvbW1vbmpzIFwiZ29vZ2xlYXBpc1wiIiwiZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImZzXCIiLCJ3ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hlY2tpblZhbHVlIH0gZnJvbSBcIi4uL3V0aWxzL2NoZWNraW5fdmFsdWVzXCI7XG5cbi8qKlxuICogRW52aXJvbm1lbnQgY29uZmlndXJhdGlvbiBmb3IgdGhlIGhhbmRsZXIuXG4gKiA8cD5cbiAqIE5vdGU6IFRoZXNlIGFyZSB0aGUgb25seSBzZWNyZXQgdmFsdWVzIHdlIG5lZWQgdG8gcmVhZC4gUmVzdCBjYW4gYmUgZGVwbG95ZWQuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBIYW5kbGVyRW52aXJvbm1lbnRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTSEVFVF9JRCAtIFRoZSBJRCBvZiB0aGUgR29vZ2xlIFNoZWV0cyBzcHJlYWRzaGVldC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTQ1JJUFRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBBcHBzIFNjcmlwdCBwcm9qZWN0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNZTkNfU0lEIC0gVGhlIFNJRCBvZiB0aGUgVHdpbGlvIFN5bmMgc2VydmljZS5cbiAqL1xudHlwZSBIYW5kbGVyRW52aXJvbm1lbnQgPSB7XG4gICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICBTQ1JJUFRfSUQ6IHN0cmluZztcbiAgICBTWU5DX1NJRDogc3RyaW5nO1xufTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciB1c2VyIGNyZWRlbnRpYWxzLlxuICogQHR5cGVkZWYge09iamVjdH0gVXNlckNyZWRzQ29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZyB8IHVuZGVmaW5lZCB8IG51bGx9IE5TUF9FTUFJTF9ET01BSU4gLSBUaGUgZW1haWwgZG9tYWluIGZvciBOU1AuXG4gKi9cbnR5cGUgVXNlckNyZWRzQ29uZmlnID0ge1xuICAgIE5TUF9FTUFJTF9ET01BSU46IHN0cmluZyB8IHVuZGVmaW5lZCB8IG51bGw7XG59O1xuY29uc3QgdXNlcl9jcmVkc19jb25maWc6IFVzZXJDcmVkc0NvbmZpZyA9IHtcbiAgICBOU1BfRU1BSUxfRE9NQUlOOiBcImZhcndlc3Qub3JnXCIsXG59O1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIGZpbmRpbmcgYSBwYXRyb2xsZXIuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBGaW5kUGF0cm9sbGVyQ29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gUEhPTkVfTlVNQkVSX0xPT0tVUF9TSEVFVCAtIFRoZSByYW5nZSBmb3IgcGhvbmUgbnVtYmVyIGxvb2t1cC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBQSE9ORV9OVU1CRVJfTlVNQkVSX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIHBob25lIG51bWJlcnMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gUEhPTkVfTlVNQkVSX05BTUVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgbmFtZXMuXG4gKi9cbnR5cGUgRmluZFBhdHJvbGxlckNvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogc3RyaW5nO1xuICAgIFBIT05FX05VTUJFUl9MT09LVVBfU0hFRVQ6IHN0cmluZztcbiAgICBQSE9ORV9OVU1CRVJfTlVNQkVSX0NPTFVNTjogc3RyaW5nO1xuICAgIFBIT05FX05VTUJFUl9OQU1FX0NPTFVNTjogc3RyaW5nO1xufTtcblxuY29uc3QgZmluZF9wYXRyb2xsZXJfY29uZmlnOiBGaW5kUGF0cm9sbGVyQ29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBcInRlc3RcIixcbiAgICBQSE9ORV9OVU1CRVJfTE9PS1VQX1NIRUVUOiBcIlBob25lIE51bWJlcnMhQTI6QjEwMFwiLFxuICAgIFBIT05FX05VTUJFUl9OQU1FX0NPTFVNTjogXCJBXCIsXG4gICAgUEhPTkVfTlVNQkVSX05VTUJFUl9DT0xVTU46IFwiQlwiLFxufTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciB0aGUgbG9naW4gc2hlZXQuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBMb2dpblNoZWV0Q29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gTE9HSU5fU0hFRVRfTE9PS1VQIC0gVGhlIHJhbmdlIGZvciBsb2dpbiBzaGVldCBsb29rdXAuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQ0hFQ0tJTl9DT1VOVF9MT09LVVAgLSBUaGUgcmFuZ2UgZm9yIGNoZWNrLWluIGNvdW50IGxvb2t1cC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBBUkNISVZFRF9DRUxMIC0gVGhlIGNlbGwgZm9yIGFyY2hpdmVkIGRhdGEuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfREFURV9DRUxMIC0gVGhlIGNlbGwgZm9yIHRoZSBzaGVldCBkYXRlLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IENVUlJFTlRfREFURV9DRUxMIC0gVGhlIGNlbGwgZm9yIHRoZSBjdXJyZW50IGRhdGUuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gTkFNRV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBuYW1lcy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDQVRFR09SWV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBjYXRlZ29yaWVzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNFQ1RJT05fRFJPUERPV05fQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3Igc2VjdGlvbiBkcm9wZG93bi5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDSEVDS0lOX0RST1BET1dOX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIGNoZWNrLWluIGRyb3Bkb3duLlxuICovXG50eXBlIExvZ2luU2hlZXRDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICBMT0dJTl9TSEVFVF9MT09LVVA6IHN0cmluZztcbiAgICBDSEVDS0lOX0NPVU5UX0xPT0tVUDogc3RyaW5nO1xuICAgIEFSQ0hJVkVEX0NFTEw6IHN0cmluZztcbiAgICBTSEVFVF9EQVRFX0NFTEw6IHN0cmluZztcbiAgICBDVVJSRU5UX0RBVEVfQ0VMTDogc3RyaW5nO1xuICAgIE5BTUVfQ09MVU1OOiBzdHJpbmc7XG4gICAgQ0FURUdPUllfQ09MVU1OOiBzdHJpbmc7XG4gICAgU0VDVElPTl9EUk9QRE9XTl9DT0xVTU46IHN0cmluZztcbiAgICBDSEVDS0lOX0RST1BET1dOX0NPTFVNTjogc3RyaW5nO1xufTtcblxuY29uc3QgbG9naW5fc2hlZXRfY29uZmlnOiBMb2dpblNoZWV0Q29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBcInRlc3RcIixcbiAgICBMT0dJTl9TSEVFVF9MT09LVVA6IFwiTG9naW4hQTE6WjEwMFwiLFxuICAgIENIRUNLSU5fQ09VTlRfTE9PS1VQOiBcIlRvb2xzIUcyOkcyXCIsXG4gICAgU0hFRVRfREFURV9DRUxMOiBcIkIxXCIsXG4gICAgQ1VSUkVOVF9EQVRFX0NFTEw6IFwiQjJcIixcbiAgICBBUkNISVZFRF9DRUxMOiBcIkgxXCIsXG4gICAgTkFNRV9DT0xVTU46IFwiQVwiLFxuICAgIENBVEVHT1JZX0NPTFVNTjogXCJCXCIsXG4gICAgU0VDVElPTl9EUk9QRE9XTl9DT0xVTU46IFwiSFwiLFxuICAgIENIRUNLSU5fRFJPUERPV05fQ09MVU1OOiBcIklcIixcbn07XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgdGhlIHNlYXNvbiBzaGVldC5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IFNlYXNvblNoZWV0Q29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0VBU09OX1NIRUVUIC0gVGhlIG5hbWUgb2YgdGhlIHNlYXNvbiBzaGVldC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTRUFTT05fU0hFRVRfREFZU19DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBzZWFzb24gc2hlZXQgZGF5cy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTRUFTT05fU0hFRVRfTkFNRV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBzZWFzb24gc2hlZXQgbmFtZXMuXG4gKi9cbnR5cGUgU2Vhc29uU2hlZXRDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICBTRUFTT05fU0hFRVQ6IHN0cmluZztcbiAgICBTRUFTT05fU0hFRVRfREFZU19DT0xVTU46IHN0cmluZztcbiAgICBTRUFTT05fU0hFRVRfTkFNRV9DT0xVTU46IHN0cmluZztcbn07XG5jb25zdCBzZWFzb25fc2hlZXRfY29uZmlnOiBTZWFzb25TaGVldENvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogXCJ0ZXN0XCIsXG4gICAgU0VBU09OX1NIRUVUOiBcIlNlYXNvblwiLFxuICAgIFNFQVNPTl9TSEVFVF9OQU1FX0NPTFVNTjogXCJCXCIsXG4gICAgU0VBU09OX1NIRUVUX0RBWVNfQ09MVU1OOiBcIkFcIixcbn07XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgY29tcCBwYXNzZXMuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBDb21wUGFzc2VzQ29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQ09NUF9QQVNTX1NIRUVUIC0gVGhlIG5hbWUgb2YgdGhlIGNvbXAgcGFzcyBzaGVldC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDT01QX1BBU1NfU0hFRVRfREFURVNfQVZBSUxBQkxFX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIGF2YWlsYWJsZSBkYXRlcy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDT01QX1BBU1NfU0hFRVRfREFURVNfVVNFRF9UT0RBWV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBkYXRlcyB1c2VkIHRvZGF5LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IENPTVBfUEFTU19TSEVFVF9EQVRFU19TVEFSVElOR19DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBzdGFydGluZyBkYXRlcy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDT01QX1BBU1NfU0hFRVRfTkFNRV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBuYW1lcy5cbiAqL1xudHlwZSBDb21wUGFzc2VzQ29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBzdHJpbmc7XG4gICAgQ09NUF9QQVNTX1NIRUVUOiBzdHJpbmc7XG4gICAgQ09NUF9QQVNTX1NIRUVUX0RBVEVTX0FWQUlMQUJMRV9DT0xVTU46IHN0cmluZztcbiAgICBDT01QX1BBU1NfU0hFRVRfREFURVNfVVNFRF9UT0RBWV9DT0xVTU46IHN0cmluZztcbiAgICBDT01QX1BBU1NfU0hFRVRfREFURVNfU1RBUlRJTkdfQ09MVU1OOiBzdHJpbmc7XG4gICAgQ09NUF9QQVNTX1NIRUVUX05BTUVfQ09MVU1OOiBzdHJpbmc7XG59O1xuY29uc3QgY29tcF9wYXNzZXNfY29uZmlnOiBDb21wUGFzc2VzQ29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBcInRlc3RcIixcbiAgICBDT01QX1BBU1NfU0hFRVQ6IFwiQ29tcHNcIixcbiAgICBDT01QX1BBU1NfU0hFRVRfTkFNRV9DT0xVTU46IFwiQVwiLFxuICAgIENPTVBfUEFTU19TSEVFVF9EQVRFU19BVkFJTEFCTEVfQ09MVU1OOiBcIkRcIixcbiAgICBDT01QX1BBU1NfU0hFRVRfREFURVNfVVNFRF9UT0RBWV9DT0xVTU46IFwiRVwiLFxuICAgIENPTVBfUEFTU19TSEVFVF9EQVRFU19TVEFSVElOR19DT0xVTU46IFwiR1wiLFxufTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciBtYW5hZ2VyIHBhc3Nlcy5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IE1hbmFnZXJQYXNzZXNDb25maWdcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTSEVFVF9JRCAtIFRoZSBJRCBvZiB0aGUgR29vZ2xlIFNoZWV0cyBzcHJlYWRzaGVldC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBNQU5BR0VSX1BBU1NfU0hFRVQgLSBUaGUgbmFtZSBvZiB0aGUgbWFuYWdlciBwYXNzIHNoZWV0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IE1BTkFHRVJfUEFTU19TSEVFVF9BVkFJQUJMRV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBhdmFpbGFibGUgcGFzc2VzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IE1BTkFHRVJfUEFTU19TSEVFVF9VU0VEX1RPREFZX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIHBhc3NlcyB1c2VkIHRvZGF5LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IE1BTkFHRVJfUEFTU19TSEVFVF9EQVRFU19TVEFSVElOR19DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBzdGFydGluZyBkYXRlcy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBNQU5BR0VSX1BBU1NfU0hFRVRfTkFNRV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBuYW1lcy5cbiAqL1xudHlwZSBNYW5hZ2VyUGFzc2VzQ29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBzdHJpbmc7XG4gICAgTUFOQUdFUl9QQVNTX1NIRUVUOiBzdHJpbmc7XG4gICAgTUFOQUdFUl9QQVNTX1NIRUVUX0FWQUlBQkxFX0NPTFVNTjogc3RyaW5nO1xuICAgIE1BTkFHRVJfUEFTU19TSEVFVF9VU0VEX1RPREFZX0NPTFVNTjogc3RyaW5nO1xuICAgIE1BTkFHRVJfUEFTU19TSEVFVF9EQVRFU19TVEFSVElOR19DT0xVTU46IHN0cmluZztcbiAgICBNQU5BR0VSX1BBU1NfU0hFRVRfTkFNRV9DT0xVTU46IHN0cmluZztcbn07XG5jb25zdCBtYW5hZ2VyX3Bhc3Nlc19jb25maWc6IE1hbmFnZXJQYXNzZXNDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IFwidGVzdFwiLFxuICAgIE1BTkFHRVJfUEFTU19TSEVFVDogXCJNYW5hZ2Vyc1wiLFxuICAgIE1BTkFHRVJfUEFTU19TSEVFVF9OQU1FX0NPTFVNTjogXCJBXCIsXG4gICAgTUFOQUdFUl9QQVNTX1NIRUVUX0FWQUlBQkxFX0NPTFVNTjogXCJHXCIsXG4gICAgTUFOQUdFUl9QQVNTX1NIRUVUX1VTRURfVE9EQVlfQ09MVU1OOiBcIkNcIixcbiAgICBNQU5BR0VSX1BBU1NfU0hFRVRfREFURVNfU1RBUlRJTkdfQ09MVU1OOiBcIkhcIixcbn07XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgdGhlIGhhbmRsZXIuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBIYW5kbGVyQ29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0NSSVBUX0lEIC0gVGhlIElEIG9mIHRoZSBHb29nbGUgQXBwcyBTY3JpcHQgcHJvamVjdC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTSEVFVF9JRCAtIFRoZSBJRCBvZiB0aGUgR29vZ2xlIFNoZWV0cyBzcHJlYWRzaGVldC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTWU5DX1NJRCAtIFRoZSBTSUQgb2YgdGhlIFR3aWxpbyBTeW5jIHNlcnZpY2UuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gUkVTRVRfRlVOQ1RJT05fTkFNRSAtIFRoZSBuYW1lIG9mIHRoZSByZXNldCBmdW5jdGlvbi5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBBUkNISVZFX0ZVTkNUSU9OX05BTUUgLSBUaGUgbmFtZSBvZiB0aGUgYXJjaGl2ZSBmdW5jdGlvbi5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gVVNFX1NFUlZJQ0VfQUNDT1VOVCAtIFdoZXRoZXIgdG8gdXNlIGEgc2VydmljZSBhY2NvdW50LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IEFDSVRPTl9MT0dfU0hFRVQgLSBUaGUgbmFtZSBvZiB0aGUgYWN0aW9uIGxvZyBzaGVldC5cbiAqIEBwcm9wZXJ0eSB7Q2hlY2tpblZhbHVlW119IENIRUNLSU5fVkFMVUVTIC0gVGhlIGNoZWNrLWluIHZhbHVlcy5cbiAqL1xudHlwZSBIYW5kbGVyQ29uZmlnID0ge1xuICAgIFNDUklQVF9JRDogc3RyaW5nO1xuICAgIFNIRUVUX0lEOiBzdHJpbmc7XG4gICAgU1lOQ19TSUQ6IHN0cmluZztcbiAgICBSRVNFVF9GVU5DVElPTl9OQU1FOiBzdHJpbmc7XG4gICAgQVJDSElWRV9GVU5DVElPTl9OQU1FOiBzdHJpbmc7XG4gICAgVVNFX1NFUlZJQ0VfQUNDT1VOVDogYm9vbGVhbjtcbiAgICBBQ0lUT05fTE9HX1NIRUVUOiBzdHJpbmc7XG4gICAgQ0hFQ0tJTl9WQUxVRVM6IENoZWNraW5WYWx1ZVtdO1xufTtcbmNvbnN0IGhhbmRsZXJfY29uZmlnOiBIYW5kbGVyQ29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBcInRlc3RcIixcbiAgICBTQ1JJUFRfSUQ6IFwidGVzdFwiLFxuICAgIFNZTkNfU0lEOiBcInRlc3RcIixcbiAgICBBUkNISVZFX0ZVTkNUSU9OX05BTUU6IFwiQXJjaGl2ZVwiLFxuICAgIFJFU0VUX0ZVTkNUSU9OX05BTUU6IFwiUmVzZXRcIixcbiAgICBVU0VfU0VSVklDRV9BQ0NPVU5UOiB0cnVlLFxuICAgIEFDSVRPTl9MT0dfU0hFRVQ6IFwiQm90X1VzYWdlXCIsXG4gICAgQ0hFQ0tJTl9WQUxVRVM6IFtcbiAgICAgICAgbmV3IENoZWNraW5WYWx1ZShcImRheVwiLCBcIkFsbCBEYXlcIiwgXCJhbGwgZGF5L0RBWVwiLCBbXCJjaGVja2luLWRheVwiXSksXG4gICAgICAgIG5ldyBDaGVja2luVmFsdWUoXCJhbVwiLCBcIkhhbGYgQU1cIiwgXCJtb3JuaW5nL0FNXCIsIFtcImNoZWNraW4tYW1cIl0pLFxuICAgICAgICBuZXcgQ2hlY2tpblZhbHVlKFwicG1cIiwgXCJIYWxmIFBNXCIsIFwiYWZ0ZXJub29uL1BNXCIsIFtcImNoZWNraW4tcG1cIl0pLFxuICAgICAgICBuZXcgQ2hlY2tpblZhbHVlKFwib3V0XCIsIFwiQ2hlY2tlZCBPdXRcIiwgXCJjaGVjayBvdXQvT1VUXCIsIFtcImNoZWNrb3V0XCIsIFwiY2hlY2stb3V0XCJdKSxcbiAgICBdLFxufTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciBwYXRyb2xsZXIgcm93cy5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IFBhdHJvbGxlclJvd0NvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IE5BTUVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgbmFtZXMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQ0FURUdPUllfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgY2F0ZWdvcmllcy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTRUNUSU9OX0RST1BET1dOX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIHNlY3Rpb24gZHJvcGRvd24uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBjaGVjay1pbiBkcm9wZG93bi5cbiAqL1xudHlwZSBQYXRyb2xsZXJSb3dDb25maWcgPSB7XG4gICAgTkFNRV9DT0xVTU46IHN0cmluZztcbiAgICBDQVRFR09SWV9DT0xVTU46IHN0cmluZztcbiAgICBTRUNUSU9OX0RST1BET1dOX0NPTFVNTjogc3RyaW5nO1xuICAgIENIRUNLSU5fRFJPUERPV05fQ09MVU1OOiBzdHJpbmc7XG59O1xuXG4vKipcbiAqIENvbWJpbmVkIGNvbmZpZ3VyYXRpb24gdHlwZS5cbiAqIEB0eXBlZGVmIHtIYW5kbGVyRW52aXJvbm1lbnQgJiBVc2VyQ3JlZHNDb25maWcgJiBGaW5kUGF0cm9sbGVyQ29uZmlnICYgTG9naW5TaGVldENvbmZpZyAmIFNlYXNvblNoZWV0Q29uZmlnICYgQ29tcFBhc3Nlc0NvbmZpZyAmIE1hbmFnZXJQYXNzZXNDb25maWcgJiBIYW5kbGVyQ29uZmlnICYgUGF0cm9sbGVyUm93Q29uZmlnfSBDb21iaW5lZENvbmZpZ1xuICovXG50eXBlIENvbWJpbmVkQ29uZmlnID0gSGFuZGxlckVudmlyb25tZW50ICZcbiAgICBVc2VyQ3JlZHNDb25maWcgJlxuICAgIEZpbmRQYXRyb2xsZXJDb25maWcgJlxuICAgIExvZ2luU2hlZXRDb25maWcgJlxuICAgIFNlYXNvblNoZWV0Q29uZmlnICZcbiAgICBDb21wUGFzc2VzQ29uZmlnICZcbiAgICBNYW5hZ2VyUGFzc2VzQ29uZmlnICZcbiAgICBIYW5kbGVyQ29uZmlnICZcbiAgICBQYXRyb2xsZXJSb3dDb25maWc7XG5cbmNvbnN0IENPTkZJRzogQ29tYmluZWRDb25maWcgPSB7XG4gICAgLi4uaGFuZGxlcl9jb25maWcsXG4gICAgLi4uZmluZF9wYXRyb2xsZXJfY29uZmlnLFxuICAgIC4uLmxvZ2luX3NoZWV0X2NvbmZpZyxcbiAgICAuLi5jb21wX3Bhc3Nlc19jb25maWcsXG4gICAgLi4ubWFuYWdlcl9wYXNzZXNfY29uZmlnLFxuICAgIC4uLnNlYXNvbl9zaGVldF9jb25maWcsXG4gICAgLi4udXNlcl9jcmVkc19jb25maWcsXG59O1xuXG5leHBvcnQge1xuICAgIENPTkZJRyxcbiAgICBDb21iaW5lZENvbmZpZyxcbiAgICBDb21wUGFzc2VzQ29uZmlnLFxuICAgIEZpbmRQYXRyb2xsZXJDb25maWcsXG4gICAgSGFuZGxlckNvbmZpZyxcbiAgICBoYW5kbGVyX2NvbmZpZyxcbiAgICBIYW5kbGVyRW52aXJvbm1lbnQsXG4gICAgTWFuYWdlclBhc3Nlc0NvbmZpZyxcbiAgICBVc2VyQ3JlZHNDb25maWcsXG4gICAgTG9naW5TaGVldENvbmZpZyxcbiAgICBTZWFzb25TaGVldENvbmZpZyxcbiAgICBQYXRyb2xsZXJSb3dDb25maWcsXG59OyIsImltcG9ydCBcIkB0d2lsaW8tbGFicy9zZXJ2ZXJsZXNzLXJ1bnRpbWUtdHlwZXNcIjtcbmltcG9ydCB7XG4gICAgQ29udGV4dCxcbiAgICBTZXJ2ZXJsZXNzRXZlbnRPYmplY3QsXG4gICAgU2VydmljZUNvbnRleHQsXG4gICAgVHdpbGlvQ2xpZW50LFxufSBmcm9tIFwiQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlcy90eXBlc1wiO1xuaW1wb3J0IHsgZ29vZ2xlLCBzY3JpcHRfdjEsIHNoZWV0c192NCB9IGZyb20gXCJnb29nbGVhcGlzXCI7XG5pbXBvcnQgeyBHb29nbGVBdXRoIH0gZnJvbSBcImdvb2dsZWFwaXMtY29tbW9uXCI7XG5pbXBvcnQge1xuICAgIENPTkZJRyxcbiAgICBDb21iaW5lZENvbmZpZyxcbiAgICBDb21wUGFzc2VzQ29uZmlnLFxuICAgIEZpbmRQYXRyb2xsZXJDb25maWcsXG4gICAgSGFuZGxlckNvbmZpZyxcbiAgICBoYW5kbGVyX2NvbmZpZyxcbiAgICBIYW5kbGVyRW52aXJvbm1lbnQsXG4gICAgTG9naW5TaGVldENvbmZpZyxcbiAgICBNYW5hZ2VyUGFzc2VzQ29uZmlnLFxuICAgIFNlYXNvblNoZWV0Q29uZmlnLFxufSBmcm9tIFwiLi4vZW52L2hhbmRsZXJfY29uZmlnXCI7XG5pbXBvcnQgTG9naW5TaGVldCwgeyBQYXRyb2xsZXJSb3cgfSBmcm9tIFwiLi4vc2hlZXRzL2xvZ2luX3NoZWV0XCI7XG5pbXBvcnQgU2Vhc29uU2hlZXQgZnJvbSBcIi4uL3NoZWV0cy9zZWFzb25fc2hlZXRcIjtcbmltcG9ydCB7IFVzZXJDcmVkcyB9IGZyb20gXCIuLi91c2VyLWNyZWRzXCI7XG5pbXBvcnQgeyBDaGVja2luVmFsdWVzIH0gZnJvbSBcIi4uL3V0aWxzL2NoZWNraW5fdmFsdWVzXCI7XG5pbXBvcnQgeyBnZXRfc2VydmljZV9jcmVkZW50aWFsc19wYXRoIH0gZnJvbSBcIi4uL3V0aWxzL2ZpbGVfdXRpbHNcIjtcbmltcG9ydCB7IGV4Y2VsX3Jvd190b19pbmRleCwgc2FuaXRpemVfcGhvbmVfbnVtYmVyIH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxcIjtcbmltcG9ydCB7IENvbXBQYXNzVHlwZSwgZ2V0X2NvbXBfcGFzc19kZXNjcmlwdGlvbiB9IGZyb20gXCIuLi91dGlscy9jb21wX3Bhc3Nlc1wiO1xuaW1wb3J0IHtcbiAgICBDb21wUGFzc1NoZWV0LFxuICAgIE1hbmFnZXJQYXNzU2hlZXQsXG4gICAgUGFzc1NoZWV0LFxufSBmcm9tIFwiLi4vc2hlZXRzL2NvbXBfcGFzc19zaGVldFwiO1xuXG5leHBvcnQgdHlwZSBCVk5TUENoZWNraW5SZXNwb25zZSA9IHtcbiAgICByZXNwb25zZT86IHN0cmluZztcbiAgICBuZXh0X3N0ZXA/OiBzdHJpbmc7XG59O1xuZXhwb3J0IHR5cGUgSGFuZGxlckV2ZW50ID0gU2VydmVybGVzc0V2ZW50T2JqZWN0PFxuICAgIHtcbiAgICAgICAgRnJvbTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgICBUbzogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgICBudW1iZXI6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAgICAgdGVzdF9udW1iZXI6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAgICAgQm9keTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIH0sXG4gICAge30sXG4gICAge1xuICAgICAgICBidm5zcF9jaGVja2luX25leHRfc3RlcDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIH1cbj47XG5cbmV4cG9ydCBjb25zdCBORVhUX1NURVBTID0ge1xuICAgIEFXQUlUX0NPTU1BTkQ6IFwiYXdhaXQtY29tbWFuZFwiLFxuICAgIEFXQUlUX0NIRUNLSU46IFwiYXdhaXQtY2hlY2tpblwiLFxuICAgIENPTkZJUk1fUkVTRVQ6IFwiY29uZmlybS1yZXNldFwiLFxuICAgIEFVVEhfUkVTRVQ6IFwiYXV0aC1yZXNldFwiLFxuICAgIEFXQUlUX1BBU1M6IFwiYXdhaXQtcGFzc1wiLFxufTtcblxuY29uc3QgQ09NTUFORFMgPSB7XG4gICAgT05fRFVUWTogW1wib25kdXR5XCIsIFwib24tZHV0eVwiXSxcbiAgICBTVEFUVVM6IFtcInN0YXR1c1wiXSxcbiAgICBDSEVDS0lOOiBbXCJjaGVja2luXCIsIFwiY2hlY2staW5cIl0sXG4gICAgQ09NUF9QQVNTOiBbXCJjb21wLXBhc3NcIiwgXCJjb21wcGFzc1wiXSxcbiAgICBNQU5BR0VSX1BBU1M6IFtcIm1hbmFnZXItcGFzc1wiLCBcIm1hbmFnZXJwYXNzXCJdLFxuICAgIFdIQVRTQVBQOiBbXCJ3aGF0c2FwcFwiXSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJWTlNQQ2hlY2tpbkhhbmRsZXIge1xuICAgIFNDT1BFUzogc3RyaW5nW10gPSBbXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3NwcmVhZHNoZWV0c1wiXTtcblxuICAgIHNtc19yZXF1ZXN0OiBib29sZWFuO1xuICAgIHJlc3VsdF9tZXNzYWdlczogc3RyaW5nW10gPSBbXTtcbiAgICBmcm9tOiBzdHJpbmc7XG4gICAgdG86IHN0cmluZztcbiAgICBib2R5OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgcGF0cm9sbGVyOiBQYXRyb2xsZXJSb3cgfCBudWxsO1xuICAgIGJ2bnNwX2NoZWNraW5fbmV4dF9zdGVwOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgY2hlY2tpbl9tb2RlOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgICBmYXN0X2NoZWNraW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHR3aWxpb19jbGllbnQ6IFR3aWxpb0NsaWVudCB8IG51bGwgPSBudWxsO1xuICAgIHN5bmNfc2lkOiBzdHJpbmc7XG4gICAgcmVzZXRfc2NyaXB0X2lkOiBzdHJpbmc7XG5cbiAgICAvLyBDYWNoZSBjbGllbnRzXG4gICAgc3luY19jbGllbnQ6IFNlcnZpY2VDb250ZXh0IHwgbnVsbCA9IG51bGw7XG4gICAgdXNlcl9jcmVkczogVXNlckNyZWRzIHwgbnVsbCA9IG51bGw7XG4gICAgc2VydmljZV9jcmVkczogR29vZ2xlQXV0aCB8IG51bGwgPSBudWxsO1xuICAgIHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzIHwgbnVsbCA9IG51bGw7XG4gICAgdXNlcl9zY3JpcHRzX3NlcnZpY2U6IHNjcmlwdF92MS5TY3JpcHQgfCBudWxsID0gbnVsbDtcblxuICAgIGxvZ2luX3NoZWV0OiBMb2dpblNoZWV0IHwgbnVsbCA9IG51bGw7XG4gICAgc2Vhc29uX3NoZWV0OiBTZWFzb25TaGVldCB8IG51bGwgPSBudWxsO1xuICAgIGNvbXBfcGFzc19zaGVldDogQ29tcFBhc3NTaGVldCB8IG51bGwgPSBudWxsO1xuICAgIG1hbmFnZXJfcGFzc19zaGVldDogTWFuYWdlclBhc3NTaGVldCB8IG51bGwgPSBudWxsO1xuXG4gICAgY2hlY2tpbl92YWx1ZXM6IENoZWNraW5WYWx1ZXM7XG4gICAgY3VycmVudF9zaGVldF9kYXRlOiBEYXRlO1xuXG4gICAgY29tYmluZWRfY29uZmlnOiBDb21iaW5lZENvbmZpZztcbiAgICBjb25maWc6IEhhbmRsZXJDb25maWc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgY29udGV4dDogQ29udGV4dDxIYW5kbGVyRW52aXJvbm1lbnQ+LFxuICAgICAgICBldmVudDogU2VydmVybGVzc0V2ZW50T2JqZWN0PEhhbmRsZXJFdmVudD5cbiAgICApIHtcbiAgICAgICAgLy8gRGV0ZXJtaW5lIG1lc3NhZ2UgZGV0YWlscyBmcm9tIHRoZSBpbmNvbWluZyBldmVudCwgd2l0aCBmYWxsYmFjayB2YWx1ZXNcbiAgICAgICAgdGhpcy5zbXNfcmVxdWVzdCA9IChldmVudC5Gcm9tIHx8IGV2ZW50Lm51bWJlcikgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5mcm9tID0gZXZlbnQuRnJvbSB8fCBldmVudC5udW1iZXIgfHwgZXZlbnQudGVzdF9udW1iZXIhO1xuICAgICAgICB0aGlzLnRvID0gc2FuaXRpemVfcGhvbmVfbnVtYmVyKGV2ZW50LlRvISk7XG4gICAgICAgIHRoaXMuYm9keSA9IGV2ZW50LkJvZHk/LnRvTG93ZXJDYXNlKCk/LnRyaW0oKS5yZXBsYWNlKC9cXHMrLywgXCItXCIpO1xuICAgICAgICB0aGlzLmJ2bnNwX2NoZWNraW5fbmV4dF9zdGVwID1cbiAgICAgICAgICAgIGV2ZW50LnJlcXVlc3QuY29va2llcy5idm5zcF9jaGVja2luX25leHRfc3RlcDtcbiAgICAgICAgdGhpcy5jb21iaW5lZF9jb25maWcgPSB7IC4uLkNPTkZJRywgLi4uY29udGV4dCB9O1xuICAgICAgICB0aGlzLmNvbmZpZyA9IHRoaXMuY29tYmluZWRfY29uZmlnO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLnR3aWxpb19jbGllbnQgPSBjb250ZXh0LmdldFR3aWxpb0NsaWVudCgpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGluaXRpYWxpemluZyB0d2lsaW9fY2xpZW50XCIsIGUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3luY19zaWQgPSBjb250ZXh0LlNZTkNfU0lEO1xuICAgICAgICB0aGlzLnJlc2V0X3NjcmlwdF9pZCA9IGNvbnRleHQuU0NSSVBUX0lEO1xuICAgICAgICB0aGlzLnBhdHJvbGxlciA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5jaGVja2luX3ZhbHVlcyA9IG5ldyBDaGVja2luVmFsdWVzKGhhbmRsZXJfY29uZmlnLkNIRUNLSU5fVkFMVUVTKTtcbiAgICAgICAgdGhpcy5jdXJyZW50X3NoZWV0X2RhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIH1cblxuICAgIHBhcnNlX2Zhc3RfY2hlY2tpbl9tb2RlKGJvZHk6IHN0cmluZykge1xuICAgICAgICBjb25zdCBwYXJzZWQgPSB0aGlzLmNoZWNraW5fdmFsdWVzLnBhcnNlX2Zhc3RfY2hlY2tpbihib2R5KTtcbiAgICAgICAgaWYgKHBhcnNlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNraW5fbW9kZSA9IHBhcnNlZC5rZXk7XG4gICAgICAgICAgICB0aGlzLmZhc3RfY2hlY2tpbiA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcGFyc2VfY2hlY2tpbihib2R5OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgcGFyc2VkID0gdGhpcy5jaGVja2luX3ZhbHVlcy5wYXJzZV9jaGVja2luKGJvZHkpO1xuICAgICAgICBpZiAocGFyc2VkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tpbl9tb2RlID0gcGFyc2VkLmtleTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwYXJzZV9jaGVja2luX2Zyb21fbmV4dF9zdGVwKCkge1xuICAgICAgICBjb25zdCBsYXN0X3NlZ21lbnQgPSB0aGlzLmJ2bnNwX2NoZWNraW5fbmV4dF9zdGVwXG4gICAgICAgICAgICA/LnNwbGl0KFwiLVwiKVxuICAgICAgICAgICAgLnNsaWNlKC0xKVswXTtcbiAgICAgICAgaWYgKGxhc3Rfc2VnbWVudCAmJiBsYXN0X3NlZ21lbnQgaW4gdGhpcy5jaGVja2luX3ZhbHVlcy5ieV9rZXkpIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tpbl9tb2RlID0gbGFzdF9zZWdtZW50O1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHBhcnNlX3Bhc3NfZnJvbV9uZXh0X3N0ZXAoKSB7XG4gICAgICAgIGNvbnN0IGxhc3Rfc2VnbWVudCA9IHRoaXMuYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXBcbiAgICAgICAgICAgID8uc3BsaXQoXCItXCIpXG4gICAgICAgICAgICAuc2xpY2UoLTIpXG4gICAgICAgICAgICAuam9pbihcIi1cIik7XG4gICAgICAgIHJldHVybiBsYXN0X3NlZ21lbnQgYXMgQ29tcFBhc3NUeXBlO1xuICAgIH1cblxuICAgIGRlbGF5KHNlY29uZHM6IG51bWJlciwgb3B0aW9uYWw6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBpZiAob3B0aW9uYWwgJiYgIXRoaXMuc21zX3JlcXVlc3QpIHtcbiAgICAgICAgICAgIHNlY29uZHMgPSAxIC8gMTAwMC4wO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzKSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJlcywgc2Vjb25kcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFzeW5jIHNlbmRfbWVzc2FnZShtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMuc21zX3JlcXVlc3QpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0X3R3aWxpb19jbGllbnQoKS5tZXNzYWdlcy5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIHRvOiB0aGlzLmZyb20sXG4gICAgICAgICAgICAgICAgZnJvbTogdGhpcy50byxcbiAgICAgICAgICAgICAgICBib2R5OiBtZXNzYWdlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlc3VsdF9tZXNzYWdlcy5wdXNoKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgaGFuZGxlKCk6IFByb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5faGFuZGxlKCk7XG4gICAgICAgIGlmICghdGhpcy5zbXNfcmVxdWVzdCkge1xuICAgICAgICAgICAgaWYgKHJlc3VsdD8ucmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdF9tZXNzYWdlcy5wdXNoKHJlc3VsdC5yZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiB0aGlzLnJlc3VsdF9tZXNzYWdlcy5qb2luKFwiXFxuIyMjXFxuXCIpLFxuICAgICAgICAgICAgICAgIG5leHRfc3RlcDogcmVzdWx0Py5uZXh0X3N0ZXAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGFzeW5jIF9oYW5kbGUoKTogUHJvbWlzZTxCVk5TUENoZWNraW5SZXNwb25zZT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgIGBSZWNlaXZlZCByZXF1ZXN0IGZyb20gJHt0aGlzLmZyb219IHdpdGggYm9keTogJHt0aGlzLmJvZHl9IGFuZCBzdGF0ZSAke3RoaXMuYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXB9YFxuICAgICAgICApO1xuICAgICAgICBpZiAodGhpcy5ib2R5ID09IFwibG9nb3V0XCIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIGxvZ291dGApO1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMubG9nb3V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlc3BvbnNlOiBCVk5TUENoZWNraW5SZXNwb25zZSB8IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKCF0aGlzLmNvbmZpZy5VU0VfU0VSVklDRV9BQ0NPVU5UKSB7XG4gICAgICAgICAgICByZXNwb25zZSA9IGF3YWl0IHRoaXMuY2hlY2tfdXNlcl9jcmVkcygpO1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlKSByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYm9keSA9PSBcInJlc3RhcnRcIikge1xuICAgICAgICAgICAgcmV0dXJuIHsgcmVzcG9uc2U6IFwiT2theS4gVGV4dCBtZSBhZ2FpbiB0byBzdGFydCBvdmVyLi4uXCIgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3BvbnNlID0gYXdhaXQgdGhpcy5nZXRfbWFwcGVkX3BhdHJvbGxlcigpO1xuICAgICAgICBpZiAocmVzcG9uc2UgfHwgdGhpcy5wYXRyb2xsZXIgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICByZXNwb25zZSB8fCB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBcIlVuZXhwZWN0ZWQgZXJyb3IgbG9va2luZyB1cCBwYXRyb2xsZXIgbWFwcGluZ1wiLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICAoIXRoaXMuYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXAgfHxcbiAgICAgICAgICAgICAgICB0aGlzLmJ2bnNwX2NoZWNraW5fbmV4dF9zdGVwID09IE5FWFRfU1RFUFMuQVdBSVRfQ09NTUFORCkgJiZcbiAgICAgICAgICAgIHRoaXMuYm9keVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnN0IGF3YWl0X3Jlc3BvbnNlID0gYXdhaXQgdGhpcy5oYW5kbGVfYXdhaXRfY29tbWFuZCgpO1xuICAgICAgICAgICAgaWYgKGF3YWl0X3Jlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0X3Jlc3BvbnNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgdGhpcy5idm5zcF9jaGVja2luX25leHRfc3RlcCA9PSBORVhUX1NURVBTLkFXQUlUX0NIRUNLSU4gJiZcbiAgICAgICAgICAgIHRoaXMuYm9keVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcnNlX2NoZWNraW4odGhpcy5ib2R5KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmNoZWNraW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHRoaXMuYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXA/LnN0YXJ0c1dpdGgoXG4gICAgICAgICAgICAgICAgTkVYVF9TVEVQUy5DT05GSVJNX1JFU0VUXG4gICAgICAgICAgICApICYmXG4gICAgICAgICAgICB0aGlzLmJvZHlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5ib2R5ID09IFwieWVzXCIgJiYgdGhpcy5wYXJzZV9jaGVja2luX2Zyb21fbmV4dF9zdGVwKCkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICAgICAgYFBlcmZvcm1pbmcgcmVzZXRfc2hlZXRfZmxvdyBmb3IgJHt0aGlzLnBhdHJvbGxlci5uYW1lfSB3aXRoIGNoZWNraW4gbW9kZTogJHt0aGlzLmNoZWNraW5fbW9kZX1gXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAoYXdhaXQgdGhpcy5yZXNldF9zaGVldF9mbG93KCkpIHx8IChhd2FpdCB0aGlzLmNoZWNraW4oKSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgdGhpcy5idm5zcF9jaGVja2luX25leHRfc3RlcD8uc3RhcnRzV2l0aChORVhUX1NURVBTLkFVVEhfUkVTRVQpXG4gICAgICAgICkge1xuICAgICAgICAgICAgaWYgKHRoaXMucGFyc2VfY2hlY2tpbl9mcm9tX25leHRfc3RlcCgpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgICAgIGBQZXJmb3JtaW5nIHJlc2V0X3NoZWV0X2Zsb3ctcG9zdC1hdXRoIGZvciAke3RoaXMucGF0cm9sbGVyLm5hbWV9IHdpdGggY2hlY2tpbiBtb2RlOiAke3RoaXMuY2hlY2tpbl9tb2RlfWBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIChhd2FpdCB0aGlzLnJlc2V0X3NoZWV0X2Zsb3coKSkgfHwgKGF3YWl0IHRoaXMuY2hlY2tpbigpKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICB0aGlzLmJ2bnNwX2NoZWNraW5fbmV4dF9zdGVwPy5zdGFydHNXaXRoKE5FWFRfU1RFUFMuQVdBSVRfUEFTUykgJiZcbiAgICAgICAgICAgIHRoaXMuYm9keVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnN0IHR5cGUgPSB0aGlzLnBhcnNlX3Bhc3NfZnJvbV9uZXh0X3N0ZXAoKTtcbiAgICAgICAgICAgIGNvbnN0IG51bWJlciA9IE51bWJlcih0aGlzLmJvZHkpO1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICFOdW1iZXIuaXNOYU4obnVtYmVyKSAmJlxuICAgICAgICAgICAgICAgIFtDb21wUGFzc1R5cGUuQ29tcFBhc3MsIENvbXBQYXNzVHlwZS5NYW5hZ2VyUGFzc10uaW5jbHVkZXModHlwZSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnByb21wdF9jb21wX21hbmFnZXJfcGFzcyh0eXBlLCBudW1iZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXApIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuc2VuZF9tZXNzYWdlKFwiU29ycnksIEkgZGlkbid0IHVuZGVyc3RhbmQgdGhhdC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucHJvbXB0X2NvbW1hbmQoKTtcbiAgICB9XG5cbiAgICBhc3luYyBoYW5kbGVfYXdhaXRfY29tbWFuZCgpOiBQcm9taXNlPEJWTlNQQ2hlY2tpblJlc3BvbnNlIHwgdW5kZWZpbmVkPiB7XG4gICAgICAgIGNvbnN0IHBhdHJvbGxlcl9uYW1lID0gdGhpcy5wYXRyb2xsZXIhLm5hbWU7XG4gICAgICAgIGlmICh0aGlzLnBhcnNlX2Zhc3RfY2hlY2tpbl9tb2RlKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICBgUGVyZm9ybWluZyBmYXN0IGNoZWNraW4gZm9yICR7cGF0cm9sbGVyX25hbWV9IHdpdGggbW9kZTogJHt0aGlzLmNoZWNraW5fbW9kZX1gXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuY2hlY2tpbigpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDT01NQU5EUy5PTl9EVVRZLmluY2x1ZGVzKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBnZXRfb25fZHV0eSBmb3IgJHtwYXRyb2xsZXJfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiB7IHJlc3BvbnNlOiBhd2FpdCB0aGlzLmdldF9vbl9kdXR5KCkgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhcIkNoZWNraW5nIGZvciBzdGF0dXMuLi5cIik7XG4gICAgICAgIGlmIChDT01NQU5EUy5TVEFUVVMuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIGdldF9zdGF0dXMgZm9yICR7cGF0cm9sbGVyX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRfc3RhdHVzKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKENPTU1BTkRTLkNIRUNLSU4uaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIHByb21wdF9jaGVja2luIGZvciAke3BhdHJvbGxlcl9uYW1lfWApO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvbXB0X2NoZWNraW4oKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQ09NTUFORFMuQ09NUF9QQVNTLmluY2x1ZGVzKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBjb21wX3Bhc3MgZm9yICR7cGF0cm9sbGVyX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5wcm9tcHRfY29tcF9tYW5hZ2VyX3Bhc3MoXG4gICAgICAgICAgICAgICAgQ29tcFBhc3NUeXBlLkNvbXBQYXNzLFxuICAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKENPTU1BTkRTLk1BTkFHRVJfUEFTUy5pbmNsdWRlcyh0aGlzLmJvZHkhKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmZvcm1pbmcgbWFuYWdlcl9wYXNzIGZvciAke3BhdHJvbGxlcl9uYW1lfWApO1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucHJvbXB0X2NvbXBfbWFuYWdlcl9wYXNzKFxuICAgICAgICAgICAgICAgIENvbXBQYXNzVHlwZS5NYW5hZ2VyUGFzcyxcbiAgICAgICAgICAgICAgICBudWxsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDT01NQU5EUy5XSEFUU0FQUC5pbmNsdWRlcyh0aGlzLmJvZHkhKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYEknbSBhdmFpbGFibGUgb24gd2hhdHNhcHAgYXMgd2VsbCEgV2hhdHNhcHAgdXNlcyBXaWZpL0NlbGwgRGF0YSBpbnN0ZWFkIG9mIFNNUywgYW5kIGNhbiBiZSBtb3JlIHJlbGlhYmxlLiBNZXNzYWdlIG1lIGF0IGh0dHBzOi8vd2EubWUvMSR7dGhpcy50b31gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb21wdF9jb21tYW5kKCk6IEJWTlNQQ2hlY2tpblJlc3BvbnNlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3BvbnNlOiBgJHt0aGlzLnBhdHJvbGxlciEubmFtZX0sIEknbSBCVk5TUCBCb3QuIFxuRW50ZXIgYSBjb21tYW5kOlxuQ2hlY2sgaW4gLyBDaGVjayBvdXQgLyBTdGF0dXMgLyBPbiBEdXR5IC8gQ29tcCBQYXNzIC8gTWFuYWdlciBQYXNzIC8gV2hhdHNhcHBcblNlbmQgJ3Jlc3RhcnQnIGF0IGFueSB0aW1lIHRvIGJlZ2luIGFnYWluYCxcbiAgICAgICAgICAgIG5leHRfc3RlcDogTkVYVF9TVEVQUy5BV0FJVF9DT01NQU5ELFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByb21wdF9jaGVja2luKCk6IEJWTlNQQ2hlY2tpblJlc3BvbnNlIHtcbiAgICAgICAgY29uc3QgdHlwZXMgPSBPYmplY3QudmFsdWVzKHRoaXMuY2hlY2tpbl92YWx1ZXMuYnlfa2V5KS5tYXAoXG4gICAgICAgICAgICAoeCkgPT4geC5zbXNfZGVzY1xuICAgICAgICApO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IGAke1xuICAgICAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyIS5uYW1lXG4gICAgICAgICAgICB9LCB1cGRhdGUgcGF0cm9sbGluZyBzdGF0dXMgdG86ICR7dHlwZXNcbiAgICAgICAgICAgICAgICAuc2xpY2UoMCwgLTEpXG4gICAgICAgICAgICAgICAgLmpvaW4oXCIsIFwiKX0sIG9yICR7dHlwZXMuc2xpY2UoLTEpfT9gLFxuICAgICAgICAgICAgbmV4dF9zdGVwOiBORVhUX1NURVBTLkFXQUlUX0NIRUNLSU4sXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgYXN5bmMgcHJvbXB0X2NvbXBfbWFuYWdlcl9wYXNzKFxuICAgICAgICBwYXNzX3R5cGU6IENvbXBQYXNzVHlwZSxcbiAgICAgICAgcGFzc2VzX3RvX3VzZTogbnVtYmVyIHwgbnVsbFxuICAgICk6IFByb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2U+IHtcbiAgICAgICAgaWYgKHRoaXMucGF0cm9sbGVyIS5jYXRlZ29yeSA9PSBcIkNcIikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYCR7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyIS5uYW1lXG4gICAgICAgICAgICAgICAgfSwgY2FuZGlkYXRlcyBkbyBub3QgcmVjZWl2ZSBjb21wIG9yIG1hbmFnZXIgcGFzc2VzLmAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNoZWV0OiBQYXNzU2hlZXQgPSBhd2FpdCAocGFzc190eXBlID09IENvbXBQYXNzVHlwZS5Db21wUGFzc1xuICAgICAgICAgICAgPyB0aGlzLmdldF9jb21wX3Bhc3Nfc2hlZXQoKVxuICAgICAgICAgICAgOiB0aGlzLmdldF9tYW5hZ2VyX3Bhc3Nfc2hlZXQoKSk7XG5cbiAgICAgICAgY29uc3QgdXNlZF9hbmRfYXZhaWxhYmxlID0gYXdhaXQgc2hlZXQuZ2V0X2F2YWlsYWJsZV9hbmRfdXNlZF9wYXNzZXMoXG4gICAgICAgICAgICB0aGlzLnBhdHJvbGxlcj8ubmFtZSFcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHVzZWRfYW5kX2F2YWlsYWJsZSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBcIlByb2JsZW0gbG9va2luZyB1cCBwYXRyb2xsZXIgZm9yIGNvbXAgcGFzc2VzXCIsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXNzZXNfdG9fdXNlID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB1c2VkX2FuZF9hdmFpbGFibGUuZ2V0X3Byb21wdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKGB1c2VfJHtwYXNzX3R5cGV9YCk7XG4gICAgICAgICAgICBhd2FpdCBzaGVldC5zZXRfdXNlZF9jb21wX3Bhc3Nlcyh1c2VkX2FuZF9hdmFpbGFibGUsIHBhc3Nlc190b191c2UpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYFVwZGF0ZWQgJHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXIhLm5hbWVcbiAgICAgICAgICAgICAgICB9IHRvIHVzZSAke3Bhc3Nlc190b191c2V9ICR7Z2V0X2NvbXBfcGFzc19kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgcGFzc190eXBlXG4gICAgICAgICAgICAgICAgKX0gdG9kYXkuYCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBnZXRfc3RhdHVzKCk6IFByb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuICAgICAgICBjb25zdCBzaGVldF9kYXRlID0gbG9naW5fc2hlZXQuc2hlZXRfZGF0ZS50b0RhdGVTdHJpbmcoKTtcbiAgICAgICAgY29uc3QgY3VycmVudF9kYXRlID0gbG9naW5fc2hlZXQuY3VycmVudF9kYXRlLnRvRGF0ZVN0cmluZygpO1xuICAgICAgICBpZiAoIWxvZ2luX3NoZWV0LmlzX2N1cnJlbnQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBzaGVldF9kYXRlOiAke2xvZ2luX3NoZWV0LnNoZWV0X2RhdGV9YCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgY3VycmVudF9kYXRlOiAke2xvZ2luX3NoZWV0LmN1cnJlbnRfZGF0ZX1gKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBTaGVldCBpcyBub3QgY3VycmVudCBmb3IgdG9kYXkgKGxhc3QgcmVzZXQ6ICR7c2hlZXRfZGF0ZX0pLiAke1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICAgICAgICAgIH0gaXMgbm90IGNoZWNrZWQgaW4gZm9yICR7Y3VycmVudF9kYXRlfS5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXNwb25zZSA9IHsgcmVzcG9uc2U6IGF3YWl0IHRoaXMuZ2V0X3N0YXR1c19zdHJpbmcoKSB9O1xuICAgICAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oXCJzdGF0dXNcIik7XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG5cbiAgICBhc3luYyBnZXRfc3RhdHVzX3N0cmluZygpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG4gICAgICAgIGNvbnN0IGNvbXBfcGFzc19wcm9taXNlID0gKFxuICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXRfY29tcF9wYXNzX3NoZWV0KClcbiAgICAgICAgKS5nZXRfYXZhaWxhYmxlX2FuZF91c2VkX3Bhc3Nlcyh0aGlzLnBhdHJvbGxlciEubmFtZSk7XG4gICAgICAgIGNvbnN0IG1hbmFnZXJfcGFzc19wcm9taXNlID0gKFxuICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXRfbWFuYWdlcl9wYXNzX3NoZWV0KClcbiAgICAgICAgKS5nZXRfYXZhaWxhYmxlX2FuZF91c2VkX3Bhc3Nlcyh0aGlzLnBhdHJvbGxlciEubmFtZSk7XG4gICAgICAgIGNvbnN0IHBhdHJvbGxlcl9zdGF0dXMgPSB0aGlzLnBhdHJvbGxlciE7XG5cbiAgICAgICAgY29uc3QgY2hlY2tpbkNvbHVtblNldCA9XG4gICAgICAgICAgICBwYXRyb2xsZXJfc3RhdHVzLmNoZWNraW4gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgcGF0cm9sbGVyX3N0YXR1cy5jaGVja2luICE9PSBudWxsO1xuICAgICAgICBjb25zdCBjaGVja2VkT3V0ID1cbiAgICAgICAgICAgIGNoZWNraW5Db2x1bW5TZXQgJiZcbiAgICAgICAgICAgIHRoaXMuY2hlY2tpbl92YWx1ZXMuYnlfc2hlZXRfc3RyaW5nW3BhdHJvbGxlcl9zdGF0dXMuY2hlY2tpbl0ua2V5ID09XG4gICAgICAgICAgICAgICAgXCJvdXRcIjtcbiAgICAgICAgbGV0IHN0YXR1cyA9IHBhdHJvbGxlcl9zdGF0dXMuY2hlY2tpbiB8fCBcIk5vdCBQcmVzZW50XCI7XG5cbiAgICAgICAgaWYgKGNoZWNrZWRPdXQpIHtcbiAgICAgICAgICAgIHN0YXR1cyA9IFwiQ2hlY2tlZCBPdXRcIjtcbiAgICAgICAgfSBlbHNlIGlmIChjaGVja2luQ29sdW1uU2V0KSB7XG4gICAgICAgICAgICBsZXQgc2VjdGlvbiA9IHBhdHJvbGxlcl9zdGF0dXMuc2VjdGlvbi50b1N0cmluZygpO1xuICAgICAgICAgICAgaWYgKHNlY3Rpb24ubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgICAgICBzZWN0aW9uID0gYFNlY3Rpb24gJHtzZWN0aW9ufWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdGF0dXMgPSBgJHtwYXRyb2xsZXJfc3RhdHVzLmNoZWNraW59ICgke3NlY3Rpb259KWA7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb21wbGV0ZWRQYXRyb2xEYXlzID0gYXdhaXQgKFxuICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXRfc2Vhc29uX3NoZWV0KClcbiAgICAgICAgKS5nZXRfcGF0cm9sbGVkX2RheXModGhpcy5wYXRyb2xsZXIhLm5hbWUpO1xuICAgICAgICBjb25zdCBjb21wbGV0ZWRQYXRyb2xEYXlzU3RyaW5nID1cbiAgICAgICAgICAgIGNvbXBsZXRlZFBhdHJvbERheXMgPiAwID8gY29tcGxldGVkUGF0cm9sRGF5cy50b1N0cmluZygpIDogXCJOb1wiO1xuICAgICAgICBjb25zdCBsb2dpblNoZWV0RGF0ZSA9IGxvZ2luX3NoZWV0LnNoZWV0X2RhdGUudG9EYXRlU3RyaW5nKCk7XG5cbiAgICAgICAgbGV0IHN0YXR1c1N0cmluZyA9IGBTdGF0dXMgZm9yICR7XG4gICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICB9IG9uIGRhdGUgJHtsb2dpblNoZWV0RGF0ZX06ICR7c3RhdHVzfS5cXG4ke2NvbXBsZXRlZFBhdHJvbERheXNTdHJpbmd9IGNvbXBsZXRlZCBwYXRyb2wgZGF5cyBwcmlvciB0byB0b2RheS5gO1xuICAgICAgICBjb25zdCB1c2VkQ29tcFBhc3NlcyA9IChhd2FpdCBjb21wX3Bhc3NfcHJvbWlzZSk/LnVzZWQ7XG4gICAgICAgIGNvbnN0IHVzZWRNYW5hZ2VyUGFzc2VzID0gKGF3YWl0IG1hbmFnZXJfcGFzc19wcm9taXNlKT8udXNlZDtcbiAgICAgICAgaWYgKHVzZWRDb21wUGFzc2VzKSB7XG4gICAgICAgICAgICBzdGF0dXNTdHJpbmcgKz0gYCBZb3UgYXJlIHVzaW5nICR7dXNlZENvbXBQYXNzZXN9IGNvbXAgcGFzc2VzIHRvZGF5LmA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVzZWRNYW5hZ2VyUGFzc2VzKSB7XG4gICAgICAgICAgICBzdGF0dXNTdHJpbmcgKz0gYCBZb3UgYXJlIHVzaW5nICR7dXNlZE1hbmFnZXJQYXNzZXN9IG1hbmFnZXIgcGFzc2VzIHRvZGF5LmA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0YXR1c1N0cmluZztcbiAgICB9XG5cbiAgICBhc3luYyBjaGVja2luKCk6IFByb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICBgUGVyZm9ybWluZyByZWd1bGFyIGNoZWNraW4gZm9yICR7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXIhLm5hbWVcbiAgICAgICAgICAgIH0gd2l0aCBtb2RlOiAke3RoaXMuY2hlY2tpbl9tb2RlfWBcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGF3YWl0IHRoaXMuc2hlZXRfbmVlZHNfcmVzZXQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTpcbiAgICAgICAgICAgICAgICAgICAgYCR7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICAgICAgICAgICAgICB9LCB5b3UgYXJlIHRoZSBmaXJzdCBwZXJzb24gdG8gY2hlY2sgaW4gdG9kYXkuIGAgK1xuICAgICAgICAgICAgICAgICAgICBgSSBuZWVkIHRvIGFyY2hpdmUgYW5kIHJlc2V0IHRoZSBzaGVldCBiZWZvcmUgY29udGludWluZy4gYCArXG4gICAgICAgICAgICAgICAgICAgIGBXb3VsZCB5b3UgbGlrZSBtZSB0byBkbyB0aGF0PyAoWWVzL05vKWAsXG4gICAgICAgICAgICAgICAgbmV4dF9zdGVwOiBgJHtORVhUX1NURVBTLkNPTkZJUk1fUkVTRVR9LSR7dGhpcy5jaGVja2luX21vZGV9YCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNoZWNraW5fbW9kZTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgIXRoaXMuY2hlY2tpbl9tb2RlIHx8XG4gICAgICAgICAgICAoY2hlY2tpbl9tb2RlID0gdGhpcy5jaGVja2luX3ZhbHVlcy5ieV9rZXlbdGhpcy5jaGVja2luX21vZGVdKSA9PT1cbiAgICAgICAgICAgICAgICB1bmRlZmluZWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDaGVja2luIG1vZGUgaW1wcm9wZXJseSBzZXRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG4gICAgICAgIGNvbnN0IG5ld19jaGVja2luX3ZhbHVlID0gY2hlY2tpbl9tb2RlLnNoZWV0c192YWx1ZTtcbiAgICAgICAgYXdhaXQgbG9naW5fc2hlZXQuY2hlY2tpbih0aGlzLnBhdHJvbGxlciEsIG5ld19jaGVja2luX3ZhbHVlKTtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKGB1cGRhdGUtc3RhdHVzKCR7bmV3X2NoZWNraW5fdmFsdWV9KWApO1xuICAgICAgICBhd2FpdCB0aGlzLmxvZ2luX3NoZWV0Py5yZWZyZXNoKCk7XG4gICAgICAgIGF3YWl0IHRoaXMuZ2V0X21hcHBlZF9wYXRyb2xsZXIodHJ1ZSk7XG5cbiAgICAgICAgbGV0IHJlc3BvbnNlID0gYFVwZGF0aW5nICR7XG4gICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICB9IHdpdGggc3RhdHVzOiAke25ld19jaGVja2luX3ZhbHVlfS5gO1xuICAgICAgICBpZiAoIXRoaXMuZmFzdF9jaGVja2luKSB7XG4gICAgICAgICAgICByZXNwb25zZSArPSBgIFlvdSBjYW4gc2VuZCAnJHtjaGVja2luX21vZGUuZmFzdF9jaGVja2luc1swXX0nIGFzIHlvdXIgZmlyc3QgbWVzc2FnZSBmb3IgYSBmYXN0ICR7Y2hlY2tpbl9tb2RlLnNoZWV0c192YWx1ZX0gY2hlY2tpbiBuZXh0IHRpbWUuYDtcbiAgICAgICAgfVxuICAgICAgICByZXNwb25zZSArPSBcIlxcblxcblwiICsgKGF3YWl0IHRoaXMuZ2V0X3N0YXR1c19zdHJpbmcoKSk7XG4gICAgICAgIHJldHVybiB7IHJlc3BvbnNlOiByZXNwb25zZSB9O1xuICAgIH1cblxuICAgIGFzeW5jIHNoZWV0X25lZWRzX3Jlc2V0KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG5cbiAgICAgICAgY29uc3Qgc2hlZXRfZGF0ZSA9IGxvZ2luX3NoZWV0LnNoZWV0X2RhdGU7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfZGF0ZSA9IGxvZ2luX3NoZWV0LmN1cnJlbnRfZGF0ZTtcbiAgICAgICAgY29uc29sZS5sb2coYHNoZWV0X2RhdGU6ICR7c2hlZXRfZGF0ZX1gKTtcbiAgICAgICAgY29uc29sZS5sb2coYGN1cnJlbnRfZGF0ZTogJHtjdXJyZW50X2RhdGV9YCk7XG5cbiAgICAgICAgY29uc29sZS5sb2coYGRhdGVfaXNfY3VycmVudDogJHtsb2dpbl9zaGVldC5pc19jdXJyZW50fWApO1xuXG4gICAgICAgIHJldHVybiAhbG9naW5fc2hlZXQuaXNfY3VycmVudDtcbiAgICB9XG5cbiAgICBhc3luYyByZXNldF9zaGVldF9mbG93KCk6IFByb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2UgfCB2b2lkPiB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5jaGVja191c2VyX2NyZWRzKFxuICAgICAgICAgICAgYCR7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXIhLm5hbWVcbiAgICAgICAgICAgIH0sIGluIG9yZGVyIHRvIHJlc2V0L2FyY2hpdmUsIEkgbmVlZCB5b3UgdG8gYXV0aG9yaXplIHRoZSBhcHAuYFxuICAgICAgICApO1xuICAgICAgICBpZiAocmVzcG9uc2UpXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiByZXNwb25zZS5yZXNwb25zZSxcbiAgICAgICAgICAgICAgICBuZXh0X3N0ZXA6IGAke05FWFRfU1RFUFMuQVVUSF9SRVNFVH0tJHt0aGlzLmNoZWNraW5fbW9kZX1gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucmVzZXRfc2hlZXQoKTtcbiAgICB9XG5cbiAgICBhc3luYyByZXNldF9zaGVldCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3Qgc2NyaXB0X3NlcnZpY2UgPSBhd2FpdCB0aGlzLmdldF91c2VyX3NjcmlwdHNfc2VydmljZSgpO1xuICAgICAgICBjb25zdCBzaG91bGRfcGVyZm9ybV9hcmNoaXZlID0gIShhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpKS5hcmNoaXZlZDtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IHNob3VsZF9wZXJmb3JtX2FyY2hpdmVcbiAgICAgICAgICAgID8gXCJPa2F5LiBBcmNoaXZpbmcgYW5kIHJlc2V0aW5nIHRoZSBjaGVjayBpbiBzaGVldC4gVGhpcyB0YWtlcyBhYm91dCAxMCBzZWNvbmRzLi4uXCJcbiAgICAgICAgICAgIDogXCJPa2F5LiBTaGVldCBoYXMgYWxyZWFkeSBiZWVuIGFyY2hpdmVkLiBQZXJmb3JtaW5nIHJlc2V0LiBUaGlzIHRha2VzIGFib3V0IDUgc2Vjb25kcy4uLlwiO1xuICAgICAgICBhd2FpdCB0aGlzLnNlbmRfbWVzc2FnZShtZXNzYWdlKTtcbiAgICAgICAgaWYgKHNob3VsZF9wZXJmb3JtX2FyY2hpdmUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQXJjaGl2aW5nLi4uXCIpO1xuXG4gICAgICAgICAgICBhd2FpdCBzY3JpcHRfc2VydmljZS5zY3JpcHRzLnJ1bih7XG4gICAgICAgICAgICAgICAgc2NyaXB0SWQ6IHRoaXMucmVzZXRfc2NyaXB0X2lkLFxuICAgICAgICAgICAgICAgIHJlcXVlc3RCb2R5OiB7IGZ1bmN0aW9uOiB0aGlzLmNvbmZpZy5BUkNISVZFX0ZVTkNUSU9OX05BTUUgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5kZWxheSg1KTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubG9nX2FjdGlvbihcImFyY2hpdmVcIik7XG4gICAgICAgICAgICB0aGlzLmxvZ2luX3NoZWV0ID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVzZXR0aW5nLi4uXCIpO1xuICAgICAgICBhd2FpdCBzY3JpcHRfc2VydmljZS5zY3JpcHRzLnJ1bih7XG4gICAgICAgICAgICBzY3JpcHRJZDogdGhpcy5yZXNldF9zY3JpcHRfaWQsXG4gICAgICAgICAgICByZXF1ZXN0Qm9keTogeyBmdW5jdGlvbjogdGhpcy5jb25maWcuUkVTRVRfRlVOQ1RJT05fTkFNRSB9LFxuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgdGhpcy5kZWxheSg1KTtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKFwicmVzZXRcIik7XG4gICAgICAgIGF3YWl0IHRoaXMuc2VuZF9tZXNzYWdlKFwiRG9uZS5cIik7XG4gICAgfVxuXG4gICAgYXN5bmMgY2hlY2tfdXNlcl9jcmVkcyhcbiAgICAgICAgcHJvbXB0X21lc3NhZ2U6IHN0cmluZyA9IFwiSGksIGJlZm9yZSB5b3UgY2FuIHVzZSBCVk5TUCBib3QsIHlvdSBtdXN0IGxvZ2luLlwiXG4gICAgKTogUHJvbWlzZTxCVk5TUENoZWNraW5SZXNwb25zZSB8IHVuZGVmaW5lZD4ge1xuICAgICAgICBjb25zdCB1c2VyX2NyZWRzID0gdGhpcy5nZXRfdXNlcl9jcmVkcygpO1xuICAgICAgICBpZiAoIShhd2FpdCB1c2VyX2NyZWRzLmxvYWRUb2tlbigpKSkge1xuICAgICAgICAgICAgY29uc3QgYXV0aFVybCA9IGF3YWl0IHVzZXJfY3JlZHMuZ2V0QXV0aFVybCgpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYCR7cHJvbXB0X21lc3NhZ2V9IFBsZWFzZSBmb2xsb3cgdGhpcyBsaW5rOlxuJHthdXRoVXJsfVxuXG5NZXNzYWdlIG1lIGFnYWluIHdoZW4gZG9uZS5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGdldF9vbl9kdXR5KCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIGNvbnN0IGNoZWNrZWRfb3V0X3NlY3Rpb24gPSBcIkNoZWNrZWQgT3V0XCI7XG4gICAgICAgIGNvbnN0IGxhc3Rfc2VjdGlvbnMgPSBbY2hlY2tlZF9vdXRfc2VjdGlvbl07XG4gICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKTtcblxuICAgICAgICBjb25zdCBvbl9kdXR5X3BhdHJvbGxlcnMgPSBsb2dpbl9zaGVldC5nZXRfb25fZHV0eV9wYXRyb2xsZXJzKCk7XG4gICAgICAgIGNvbnN0IGJ5X3NlY3Rpb24gPSBvbl9kdXR5X3BhdHJvbGxlcnNcbiAgICAgICAgICAgIC5maWx0ZXIoKHgpID0+IHguY2hlY2tpbilcbiAgICAgICAgICAgIC5yZWR1Y2UoKHByZXY6IHsgW2tleTogc3RyaW5nXTogUGF0cm9sbGVyUm93W10gfSwgY3VyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2hvcnRfY29kZSA9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tpbl92YWx1ZXMuYnlfc2hlZXRfc3RyaW5nW2N1ci5jaGVja2luXS5rZXk7XG4gICAgICAgICAgICAgICAgbGV0IHNlY3Rpb24gPSBjdXIuc2VjdGlvbjtcbiAgICAgICAgICAgICAgICBpZiAoc2hvcnRfY29kZSA9PSBcIm91dFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlY3Rpb24gPSBjaGVja2VkX291dF9zZWN0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIShzZWN0aW9uIGluIHByZXYpKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZbc2VjdGlvbl0gPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcHJldltzZWN0aW9uXS5wdXNoKGN1cik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByZXY7XG4gICAgICAgICAgICB9LCB7fSk7XG4gICAgICAgIGxldCByZXN1bHRzOiBzdHJpbmdbXVtdID0gW107XG4gICAgICAgIGxldCBhbGxfa2V5cyA9IE9iamVjdC5rZXlzKGJ5X3NlY3Rpb24pO1xuICAgICAgICBjb25zdCBvcmRlcmVkX3ByaW1hcnlfc2VjdGlvbnMgPSBPYmplY3Qua2V5cyhieV9zZWN0aW9uKVxuICAgICAgICAgICAgLmZpbHRlcigoeCkgPT4gIWxhc3Rfc2VjdGlvbnMuaW5jbHVkZXMoeCkpXG4gICAgICAgICAgICAuc29ydCgpO1xuICAgICAgICBjb25zdCBmaWx0ZXJlZF9sYXN0X3NlY3Rpb25zID0gbGFzdF9zZWN0aW9ucy5maWx0ZXIoKHgpID0+XG4gICAgICAgICAgICBhbGxfa2V5cy5pbmNsdWRlcyh4KVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBvcmRlcmVkX3NlY3Rpb25zID0gb3JkZXJlZF9wcmltYXJ5X3NlY3Rpb25zLmNvbmNhdChcbiAgICAgICAgICAgIGZpbHRlcmVkX2xhc3Rfc2VjdGlvbnNcbiAgICAgICAgKTtcblxuICAgICAgICBmb3IgKGNvbnN0IHNlY3Rpb24gb2Ygb3JkZXJlZF9zZWN0aW9ucykge1xuICAgICAgICAgICAgbGV0IHJlc3VsdDogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IHBhdHJvbGxlcnMgPSBieV9zZWN0aW9uW3NlY3Rpb25dLnNvcnQoKHgsIHkpID0+XG4gICAgICAgICAgICAgICAgeC5uYW1lLmxvY2FsZUNvbXBhcmUoeS5uYW1lKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChzZWN0aW9uLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKFwiU2VjdGlvbiBcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQucHVzaChgJHtzZWN0aW9ufTogYCk7XG4gICAgICAgICAgICBmdW5jdGlvbiBwYXRyb2xsZXJfc3RyaW5nKG5hbWU6IHN0cmluZywgc2hvcnRfY29kZTogc3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRldGFpbHMgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGlmIChzaG9ydF9jb2RlICE9PSBcImRheVwiICYmIHNob3J0X2NvZGUgIT09IFwib3V0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlscyA9IGAgKCR7c2hvcnRfY29kZS50b1VwcGVyQ2FzZSgpfSlgO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7bmFtZX0ke2RldGFpbHN9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFxuICAgICAgICAgICAgICAgIHBhdHJvbGxlcnNcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgoeCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdHJvbGxlcl9zdHJpbmcoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tpbl92YWx1ZXMuYnlfc2hlZXRfc3RyaW5nW3guY2hlY2tpbl0ua2V5XG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLmpvaW4oXCIsIFwiKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChyZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHRoaXMubG9nX2FjdGlvbihcIm9uLWR1dHlcIik7XG4gICAgICAgIHJldHVybiBgUGF0cm9sbGVycyBmb3IgJHtsb2dpbl9zaGVldC5zaGVldF9kYXRlLnRvRGF0ZVN0cmluZygpfSAoVG90YWw6ICR7XG4gICAgICAgICAgICBvbl9kdXR5X3BhdHJvbGxlcnMubGVuZ3RoXG4gICAgICAgIH0pOlxcbiR7cmVzdWx0cy5tYXAoKHIpID0+IHIuam9pbihcIlwiKSkuam9pbihcIlxcblwiKX1gO1xuICAgIH1cblxuICAgIGFzeW5jIGxvZ19hY3Rpb24oYWN0aW9uX25hbWU6IHN0cmluZykge1xuICAgICAgICBjb25zdCBzaGVldHNfc2VydmljZSA9IGF3YWl0IHRoaXMuZ2V0X3NoZWV0c19zZXJ2aWNlKCk7XG4gICAgICAgIGF3YWl0IHNoZWV0c19zZXJ2aWNlLnNwcmVhZHNoZWV0cy52YWx1ZXMuYXBwZW5kKHtcbiAgICAgICAgICAgIHNwcmVhZHNoZWV0SWQ6IHRoaXMuY29tYmluZWRfY29uZmlnLlNIRUVUX0lELFxuICAgICAgICAgICAgcmFuZ2U6IHRoaXMuY29uZmlnLkFDSVRPTl9MT0dfU0hFRVQsXG4gICAgICAgICAgICB2YWx1ZUlucHV0T3B0aW9uOiBcIlVTRVJfRU5URVJFRFwiLFxuICAgICAgICAgICAgcmVxdWVzdEJvZHk6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZXM6IFtbdGhpcy5wYXRyb2xsZXIhLm5hbWUsIG5ldyBEYXRlKCksIGFjdGlvbl9uYW1lXV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhc3luYyBsb2dvdXQoKTogUHJvbWlzZTxCVk5TUENoZWNraW5SZXNwb25zZT4ge1xuICAgICAgICBjb25zdCB1c2VyX2NyZWRzID0gdGhpcy5nZXRfdXNlcl9jcmVkcygpO1xuICAgICAgICBhd2FpdCB1c2VyX2NyZWRzLmRlbGV0ZVRva2VuKCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZTogXCJPa2F5LCBJIGhhdmUgcmVtb3ZlZCBhbGwgbG9naW4gc2Vzc2lvbiBpbmZvcm1hdGlvbi5cIixcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXRfdHdpbGlvX2NsaWVudCgpIHtcbiAgICAgICAgaWYgKHRoaXMudHdpbGlvX2NsaWVudCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0d2lsaW9fY2xpZW50IHdhcyBuZXZlciBpbml0aWFsaXplZCFcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudHdpbGlvX2NsaWVudDtcbiAgICB9XG5cbiAgICBnZXRfc3luY19jbGllbnQoKSB7XG4gICAgICAgIGlmICghdGhpcy5zeW5jX2NsaWVudCkge1xuICAgICAgICAgICAgdGhpcy5zeW5jX2NsaWVudCA9IHRoaXMuZ2V0X3R3aWxpb19jbGllbnQoKS5zeW5jLnNlcnZpY2VzKFxuICAgICAgICAgICAgICAgIHRoaXMuc3luY19zaWRcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc3luY19jbGllbnQ7XG4gICAgfVxuXG4gICAgZ2V0X3VzZXJfY3JlZHMoKSB7XG4gICAgICAgIGlmICghdGhpcy51c2VyX2NyZWRzKSB7XG4gICAgICAgICAgICB0aGlzLnVzZXJfY3JlZHMgPSBuZXcgVXNlckNyZWRzKFxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0X3N5bmNfY2xpZW50KCksXG4gICAgICAgICAgICAgICAgdGhpcy5mcm9tLFxuICAgICAgICAgICAgICAgIHRoaXMuY29tYmluZWRfY29uZmlnXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJfY3JlZHM7XG4gICAgfVxuXG4gICAgZ2V0X3NlcnZpY2VfY3JlZHMoKSB7XG4gICAgICAgIGlmICghdGhpcy5zZXJ2aWNlX2NyZWRzKSB7XG4gICAgICAgICAgICB0aGlzLnNlcnZpY2VfY3JlZHMgPSBuZXcgZ29vZ2xlLmF1dGguR29vZ2xlQXV0aCh7XG4gICAgICAgICAgICAgICAga2V5RmlsZTogZ2V0X3NlcnZpY2VfY3JlZGVudGlhbHNfcGF0aCgpLFxuICAgICAgICAgICAgICAgIHNjb3BlczogdGhpcy5TQ09QRVMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlX2NyZWRzO1xuICAgIH1cblxuICAgIGFzeW5jIGdldF92YWxpZF9jcmVkcyhyZXF1aXJlX3VzZXJfY3JlZHM6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBpZiAodGhpcy5jb25maWcuVVNFX1NFUlZJQ0VfQUNDT1VOVCAmJiAhcmVxdWlyZV91c2VyX2NyZWRzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRfc2VydmljZV9jcmVkcygpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVzZXJfY3JlZHMgPSB0aGlzLmdldF91c2VyX2NyZWRzKCk7XG4gICAgICAgIGlmICghKGF3YWl0IHVzZXJfY3JlZHMubG9hZFRva2VuKCkpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVc2VyIGlzIG5vdCBhdXRoZWQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVXNpbmcgdXNlciBhY2NvdW50IGZvciBzZXJ2aWNlIGF1dGguLi5cIik7XG4gICAgICAgIHJldHVybiB1c2VyX2NyZWRzLm9hdXRoMl9jbGllbnQ7XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0X3NoZWV0c19zZXJ2aWNlKCkge1xuICAgICAgICBpZiAoIXRoaXMuc2hlZXRzX3NlcnZpY2UpIHtcbiAgICAgICAgICAgIHRoaXMuc2hlZXRzX3NlcnZpY2UgPSBnb29nbGUuc2hlZXRzKHtcbiAgICAgICAgICAgICAgICB2ZXJzaW9uOiBcInY0XCIsXG4gICAgICAgICAgICAgICAgYXV0aDogYXdhaXQgdGhpcy5nZXRfdmFsaWRfY3JlZHMoKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNoZWV0c19zZXJ2aWNlO1xuICAgIH1cblxuICAgIGFzeW5jIGdldF9sb2dpbl9zaGVldCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmxvZ2luX3NoZWV0KSB7XG4gICAgICAgICAgICBjb25zdCBsb2dpbl9zaGVldF9jb25maWc6IExvZ2luU2hlZXRDb25maWcgPSB0aGlzLmNvbWJpbmVkX2NvbmZpZztcbiAgICAgICAgICAgIGNvbnN0IHNoZWV0c19zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfc2hlZXRzX3NlcnZpY2UoKTtcbiAgICAgICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gbmV3IExvZ2luU2hlZXQoXG4gICAgICAgICAgICAgICAgc2hlZXRzX3NlcnZpY2UsXG4gICAgICAgICAgICAgICAgbG9naW5fc2hlZXRfY29uZmlnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYXdhaXQgbG9naW5fc2hlZXQucmVmcmVzaCgpO1xuICAgICAgICAgICAgdGhpcy5sb2dpbl9zaGVldCA9IGxvZ2luX3NoZWV0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmxvZ2luX3NoZWV0O1xuICAgIH1cblxuICAgIGFzeW5jIGdldF9zZWFzb25fc2hlZXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5zZWFzb25fc2hlZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IHNlYXNvbl9zaGVldF9jb25maWc6IFNlYXNvblNoZWV0Q29uZmlnID0gdGhpcy5jb21iaW5lZF9jb25maWc7XG4gICAgICAgICAgICBjb25zdCBzaGVldHNfc2VydmljZSA9IGF3YWl0IHRoaXMuZ2V0X3NoZWV0c19zZXJ2aWNlKCk7XG4gICAgICAgICAgICBjb25zdCBzZWFzb25fc2hlZXQgPSBuZXcgU2Vhc29uU2hlZXQoXG4gICAgICAgICAgICAgICAgc2hlZXRzX3NlcnZpY2UsXG4gICAgICAgICAgICAgICAgc2Vhc29uX3NoZWV0X2NvbmZpZ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuc2Vhc29uX3NoZWV0ID0gc2Vhc29uX3NoZWV0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNlYXNvbl9zaGVldDtcbiAgICB9XG5cbiAgICBhc3luYyBnZXRfY29tcF9wYXNzX3NoZWV0KCkge1xuICAgICAgICBpZiAoIXRoaXMuY29tcF9wYXNzX3NoZWV0KSB7XG4gICAgICAgICAgICBjb25zdCBjb25maWc6IENvbXBQYXNzZXNDb25maWcgPSB0aGlzLmNvbWJpbmVkX2NvbmZpZztcbiAgICAgICAgICAgIGNvbnN0IHNoZWV0c19zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfc2hlZXRzX3NlcnZpY2UoKTtcbiAgICAgICAgICAgIGNvbnN0IHNlYXNvbl9zaGVldCA9IG5ldyBDb21wUGFzc1NoZWV0KHNoZWV0c19zZXJ2aWNlLCBjb25maWcpO1xuICAgICAgICAgICAgdGhpcy5jb21wX3Bhc3Nfc2hlZXQgPSBzZWFzb25fc2hlZXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcF9wYXNzX3NoZWV0O1xuICAgIH1cblxuICAgIGFzeW5jIGdldF9tYW5hZ2VyX3Bhc3Nfc2hlZXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5tYW5hZ2VyX3Bhc3Nfc2hlZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpZzogTWFuYWdlclBhc3Nlc0NvbmZpZyA9IHRoaXMuY29tYmluZWRfY29uZmlnO1xuICAgICAgICAgICAgY29uc3Qgc2hlZXRzX3NlcnZpY2UgPSBhd2FpdCB0aGlzLmdldF9zaGVldHNfc2VydmljZSgpO1xuICAgICAgICAgICAgY29uc3Qgc2Vhc29uX3NoZWV0ID0gbmV3IE1hbmFnZXJQYXNzU2hlZXQoc2hlZXRzX3NlcnZpY2UsIGNvbmZpZyk7XG4gICAgICAgICAgICB0aGlzLm1hbmFnZXJfcGFzc19zaGVldCA9IHNlYXNvbl9zaGVldDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5tYW5hZ2VyX3Bhc3Nfc2hlZXQ7XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0X3VzZXJfc2NyaXB0c19zZXJ2aWNlKCkge1xuICAgICAgICBpZiAoIXRoaXMudXNlcl9zY3JpcHRzX3NlcnZpY2UpIHtcbiAgICAgICAgICAgIHRoaXMudXNlcl9zY3JpcHRzX3NlcnZpY2UgPSBnb29nbGUuc2NyaXB0KHtcbiAgICAgICAgICAgICAgICB2ZXJzaW9uOiBcInYxXCIsXG4gICAgICAgICAgICAgICAgYXV0aDogYXdhaXQgdGhpcy5nZXRfdmFsaWRfY3JlZHModHJ1ZSksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy51c2VyX3NjcmlwdHNfc2VydmljZTtcbiAgICB9XG5cbiAgICBhc3luYyBnZXRfbWFwcGVkX3BhdHJvbGxlcihmb3JjZTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IHBob25lX2xvb2t1cCA9IGF3YWl0IHRoaXMuZmluZF9wYXRyb2xsZXJfZnJvbV9udW1iZXIoKTtcbiAgICAgICAgaWYgKHBob25lX2xvb2t1cCA9PT0gdW5kZWZpbmVkIHx8IHBob25lX2xvb2t1cCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGZvcmNlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGZpbmQgYXNzb2NpYXRlZCB1c2VyXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYFNvcnJ5LCBJIGNvdWxkbid0IGZpbmQgYW4gYXNzb2NpYXRlZCBCVk5TUCBtZW1iZXIgd2l0aCB5b3VyIHBob25lIG51bWJlciAoJHt0aGlzLmZyb219KWAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuICAgICAgICBjb25zdCBtYXBwZWRQYXRyb2xsZXIgPSBsb2dpbl9zaGVldC50cnlfZmluZF9wYXRyb2xsZXIoXG4gICAgICAgICAgICBwaG9uZV9sb29rdXAubmFtZVxuICAgICAgICApO1xuICAgICAgICBpZiAobWFwcGVkUGF0cm9sbGVyID09PSBcIm5vdF9mb3VuZFwiKSB7XG4gICAgICAgICAgICBpZiAoZm9yY2UpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgcGF0cm9sbGVyIGluIGxvZ2luIHNoZWV0XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYENvdWxkIG5vdCBmaW5kIHBhdHJvbGxlciAnJHtwaG9uZV9sb29rdXAubmFtZX0nIGluIGxvZ2luIHNoZWV0LiBQbGVhc2UgbG9vayBhdCB0aGUgbG9naW4gc2hlZXQgbmFtZSwgYW5kIGNvcHkgaXQgdG8gdGhlIFBob25lIE51bWJlcnMgdGFiLmAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3VycmVudF9zaGVldF9kYXRlID0gbG9naW5fc2hlZXQuY3VycmVudF9kYXRlO1xuICAgICAgICB0aGlzLnBhdHJvbGxlciA9IG1hcHBlZFBhdHJvbGxlcjtcbiAgICB9XG5cbiAgICBhc3luYyBmaW5kX3BhdHJvbGxlcl9mcm9tX251bWJlcigpIHtcbiAgICAgICAgY29uc3QgcmF3X251bWJlciA9IHRoaXMuZnJvbTtcbiAgICAgICAgY29uc3Qgc2hlZXRzX3NlcnZpY2UgPSBhd2FpdCB0aGlzLmdldF9zaGVldHNfc2VydmljZSgpO1xuICAgICAgICBjb25zdCBvcHRzOiBGaW5kUGF0cm9sbGVyQ29uZmlnID0gdGhpcy5jb21iaW5lZF9jb25maWc7XG4gICAgICAgIGNvbnN0IG51bWJlciA9IHNhbml0aXplX3Bob25lX251bWJlcihyYXdfbnVtYmVyKTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBzaGVldHNfc2VydmljZS5zcHJlYWRzaGVldHMudmFsdWVzLmdldCh7XG4gICAgICAgICAgICBzcHJlYWRzaGVldElkOiBvcHRzLlNIRUVUX0lELFxuICAgICAgICAgICAgcmFuZ2U6IG9wdHMuUEhPTkVfTlVNQkVSX0xPT0tVUF9TSEVFVCxcbiAgICAgICAgICAgIHZhbHVlUmVuZGVyT3B0aW9uOiBcIlVORk9STUFUVEVEX1ZBTFVFXCIsXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIXJlc3BvbnNlLmRhdGEudmFsdWVzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgZmluZCBwYXRyb2xsZXIuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhdHJvbGxlciA9IHJlc3BvbnNlLmRhdGEudmFsdWVzXG4gICAgICAgICAgICAubWFwKChyb3cpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByYXdOdW1iZXIgPVxuICAgICAgICAgICAgICAgICAgICByb3dbZXhjZWxfcm93X3RvX2luZGV4KG9wdHMuUEhPTkVfTlVNQkVSX05VTUJFUl9DT0xVTU4pXTtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50TnVtYmVyID1cbiAgICAgICAgICAgICAgICAgICAgcmF3TnVtYmVyICE9IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBzYW5pdGl6ZV9waG9uZV9udW1iZXIocmF3TnVtYmVyKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiByYXdOdW1iZXI7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudE5hbWUgPVxuICAgICAgICAgICAgICAgICAgICByb3dbZXhjZWxfcm93X3RvX2luZGV4KG9wdHMuUEhPTkVfTlVNQkVSX05BTUVfQ09MVU1OKV07XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgbmFtZTogY3VycmVudE5hbWUsIG51bWJlcjogY3VycmVudE51bWJlciB9O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5maWx0ZXIoKHBhdHJvbGxlcikgPT4gcGF0cm9sbGVyLm51bWJlciA9PT0gbnVtYmVyKVswXTtcbiAgICAgICAgcmV0dXJuIHBhdHJvbGxlcjtcbiAgICB9XG59XG4iLCJpbXBvcnQgXCJAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzXCI7XG5pbXBvcnQge1xuICAgIENvbnRleHQsXG4gICAgU2VydmVybGVzc0NhbGxiYWNrLFxuICAgIFNlcnZlcmxlc3NFdmVudE9iamVjdCxcbiAgICBTZXJ2ZXJsZXNzRnVuY3Rpb25TaWduYXR1cmUsXG59IGZyb20gXCJAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzL3R5cGVzXCI7XG5pbXBvcnQgQlZOU1BDaGVja2luSGFuZGxlciwgeyBIYW5kbGVyRXZlbnQgfSBmcm9tIFwiLi9idm5zcF9jaGVja2luX2hhbmRsZXJcIjtcbmltcG9ydCB7IEhhbmRsZXJFbnZpcm9ubWVudCB9IGZyb20gXCIuLi9lbnYvaGFuZGxlcl9jb25maWdcIjtcblxuY29uc3QgTkVYVF9TVEVQX0NPT0tJRV9OQU1FID0gXCJidm5zcF9jaGVja2luX25leHRfc3RlcFwiO1xuXG4vKipcbiAqIFR3aWxpbyBTZXJ2ZXJsZXNzIGZ1bmN0aW9uIGhhbmRsZXIgZm9yIEJWTlNQIGNoZWNrLWluLlxuICogQHBhcmFtIHtDb250ZXh0PEhhbmRsZXJFbnZpcm9ubWVudD59IGNvbnRleHQgLSBUaGUgVHdpbGlvIHNlcnZlcmxlc3MgY29udGV4dC5cbiAqIEBwYXJhbSB7U2VydmVybGVzc0V2ZW50T2JqZWN0PEhhbmRsZXJFdmVudD59IGV2ZW50IC0gVGhlIGV2ZW50IG9iamVjdC5cbiAqIEBwYXJhbSB7U2VydmVybGVzc0NhbGxiYWNrfSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbi5cbiAqL1xuZXhwb3J0IGNvbnN0IGhhbmRsZXI6IFNlcnZlcmxlc3NGdW5jdGlvblNpZ25hdHVyZTxcbiAgICBIYW5kbGVyRW52aXJvbm1lbnQsXG4gICAgSGFuZGxlckV2ZW50XG4+ID0gYXN5bmMgZnVuY3Rpb24gKFxuICAgIGNvbnRleHQ6IENvbnRleHQ8SGFuZGxlckVudmlyb25tZW50PixcbiAgICBldmVudDogU2VydmVybGVzc0V2ZW50T2JqZWN0PEhhbmRsZXJFdmVudD4sXG4gICAgY2FsbGJhY2s6IFNlcnZlcmxlc3NDYWxsYmFja1xuKSB7XG4gICAgY29uc3QgaGFuZGxlciA9IG5ldyBCVk5TUENoZWNraW5IYW5kbGVyKGNvbnRleHQsIGV2ZW50KTtcbiAgICBsZXQgbWVzc2FnZTogc3RyaW5nO1xuICAgIGxldCBuZXh0X3N0ZXA6IHN0cmluZyA9IFwiXCI7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgaGFuZGxlcl9yZXNwb25zZSA9IGF3YWl0IGhhbmRsZXIuaGFuZGxlKCk7XG4gICAgICAgIG1lc3NhZ2UgPVxuICAgICAgICAgICAgaGFuZGxlcl9yZXNwb25zZS5yZXNwb25zZSB8fFxuICAgICAgICAgICAgXCJVbmV4cGVjdGVkIHJlc3VsdCAtIG5vIHJlc3BvbnNlIGRldGVybWluZWRcIjtcbiAgICAgICAgbmV4dF9zdGVwID0gaGFuZGxlcl9yZXNwb25zZS5uZXh0X3N0ZXAgfHwgXCJcIjtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQW4gZXJyb3Igb2NjdXJlZFwiKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGUpKTtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgfVxuICAgICAgICBtZXNzYWdlID0gXCJBbiB1bmV4cGVjdGVkIGVycm9yIG9jY3VyZWQuXCI7XG4gICAgICAgIGlmIChlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIG1lc3NhZ2UgKz0gXCJcXG5cIiArIGUubWVzc2FnZTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3JcIiwgZS5zdGFjayk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yXCIsIGUubmFtZSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yXCIsIGUubWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCByZXNwb25zZSA9IG5ldyBUd2lsaW8uUmVzcG9uc2UoKTtcbiAgICBjb25zdCB0d2ltbCA9IG5ldyBUd2lsaW8udHdpbWwuTWVzc2FnaW5nUmVzcG9uc2UoKTtcblxuICAgIHR3aW1sLm1lc3NhZ2UobWVzc2FnZSk7XG5cbiAgICByZXNwb25zZVxuICAgICAgICAvLyBBZGQgdGhlIHN0cmluZ2lmaWVkIFR3aU1MIHRvIHRoZSByZXNwb25zZSBib2R5XG4gICAgICAgIC5zZXRCb2R5KHR3aW1sLnRvU3RyaW5nKCkpXG4gICAgICAgIC8vIFNpbmNlIHdlJ3JlIHJldHVybmluZyBUd2lNTCwgdGhlIGNvbnRlbnQgdHlwZSBtdXN0IGJlIFhNTFxuICAgICAgICAuYXBwZW5kSGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwidGV4dC94bWxcIilcbiAgICAgICAgLnNldENvb2tpZShORVhUX1NURVBfQ09PS0lFX05BTUUsIG5leHRfc3RlcCk7XG5cbiAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgcmVzcG9uc2UpO1xufTsiLCJpbXBvcnQgeyBzaGVldHNfdjQgfSBmcm9tIFwiZ29vZ2xlYXBpc1wiO1xuaW1wb3J0IHsgQ29tcFBhc3Nlc0NvbmZpZywgTWFuYWdlclBhc3Nlc0NvbmZpZyB9IGZyb20gXCIuLi9lbnYvaGFuZGxlcl9jb25maWdcIjtcbmltcG9ydCB7IGV4Y2VsX3Jvd190b19pbmRleCwgcm93X2NvbF90b19leGNlbF9pbmRleCB9IGZyb20gXCIuLi91dGlscy91dGlsXCI7XG5pbXBvcnQgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIgZnJvbSBcIi4uL3V0aWxzL2dvb2dsZV9zaGVldHNfc3ByZWFkc2hlZXRfdGFiXCI7XG5pbXBvcnQgeyBmb3JtYXRfZGF0ZV9mb3Jfc3ByZWFkc2hlZXRfdmFsdWUgfSBmcm9tIFwiLi4vdXRpbHMvZGF0ZXRpbWVfdXRpbFwiO1xuaW1wb3J0IHsgQ29tcFBhc3NUeXBlLCBnZXRfY29tcF9wYXNzX2Rlc2NyaXB0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2NvbXBfcGFzc2VzXCI7XG5pbXBvcnQgeyBCVk5TUENoZWNraW5SZXNwb25zZSB9IGZyb20gXCIuLi9oYW5kbGVycy9idm5zcF9jaGVja2luX2hhbmRsZXJcIjtcblxuZXhwb3J0IGNsYXNzIFVzZWRBbmRBdmFpbGFibGVQYXNzZXMge1xuICAgIHJvdzogYW55W107XG4gICAgaW5kZXg6IG51bWJlcjtcbiAgICBhdmFpbGFibGVfdG9kYXk6IG51bWJlcjtcbiAgICByZW1haW5pbmdfdG9kYXk6IG51bWJlcjtcbiAgICB1c2VkOiBudW1iZXI7XG4gICAgY29tcF9wYXNzX3R5cGU6IENvbXBQYXNzVHlwZTtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcm93OiBhbnlbXSxcbiAgICAgICAgaW5kZXg6IG51bWJlcixcbiAgICAgICAgYXZhaWxhYmxlOiBhbnksXG4gICAgICAgIHVzZWQ6IGFueSxcbiAgICAgICAgdHlwZTogQ29tcFBhc3NUeXBlXG4gICAgKSB7XG4gICAgICAgIHRoaXMucm93ID0gcm93O1xuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgICAgIHRoaXMucmVtYWluaW5nX3RvZGF5ID0gTnVtYmVyKGF2YWlsYWJsZSk7XG4gICAgICAgIHRoaXMudXNlZCA9IE51bWJlcih1c2VkKTtcbiAgICAgICAgdGhpcy5hdmFpbGFibGVfdG9kYXkgPSB0aGlzLnJlbWFpbmluZ190b2RheSArIHVzZWQ7XG4gICAgICAgIHRoaXMuY29tcF9wYXNzX3R5cGUgPSB0eXBlO1xuICAgIH1cblxuICAgIGdldF9wcm9tcHQoKTogQlZOU1BDaGVja2luUmVzcG9uc2Uge1xuICAgICAgICBpZiAodGhpcy5hdmFpbGFibGVfdG9kYXkgPiAwKSB7XG4gICAgICAgICAgICBsZXQgcmVzcG9uc2U6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICAgICAgICAgICAgaWYgKHRoaXMuY29tcF9wYXNzX3R5cGUgPT0gQ29tcFBhc3NUeXBlLkNvbXBQYXNzKSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBgWW91IGhhdmUgdXAgdG8gJHt0aGlzLmF2YWlsYWJsZV90b2RheX0gY29tcCBwYXNzZXMgeW91IGNhbiB1c2UgdG9kYXkuIFlvdSBoYXZlIGN1cnJlbnRseSB1c2VkICR7dGhpcy51c2VkfSBzbyBmYXIuIEVudGVyIHRoZSBmaXJzdCBhbmQgbGFzdCBuYW1lIG9mIHRoZSBndWVzdCB0aGF0IHdpbGwgdXNlIGEgY29tcCBwYXNzIHRvZGF5IChvciAgJ3Jlc3RhcnQnKTpgO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNvbXBfcGFzc190eXBlID09IENvbXBQYXNzVHlwZS5NYW5hZ2VyUGFzcykge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gYFlvdSBjYW4gaGF2ZSB1cCB0byAgJHt0aGlzLmF2YWlsYWJsZV90b2RheX0gbWFuYWdlciBwYXNzZXMgeW91IGNhbiB1c2UgdG9kYXkuIFlvdSBoYXZlIGN1cnJlbnRseSB1c2VkICR7dGhpcy51c2VkfSAgc28gZmFyLiBFbnRlciB0aGUgZmlyc3QgYW5kIGxhc3QgbmFtZSBvZiB0aGUgZ3Vlc3QgdGhhdCB3aWxsIHVzZSBhIGNvbXAgcGFzcyB0b2RheSAob3IgICdyZXN0YXJ0Jyk6YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXNwb25zZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2U6IHJlc3BvbnNlLFxuICAgICAgICAgICAgICAgICAgICBuZXh0X3N0ZXA6IGBhd2FpdC1wYXNzLSR7dGhpcy5jb21wX3Bhc3NfdHlwZX1gLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3BvbnNlOiBgWW91IGRvIG5vdCBoYXZlIGFueSAke2dldF9jb21wX3Bhc3NfZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgdGhpcy5jb21wX3Bhc3NfdHlwZVxuICAgICAgICAgICAgKX0gYXZhaWxhYmxlIHRvZGF5YCxcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQYXNzU2hlZXQge1xuICAgIHNoZWV0OiBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYjtcbiAgICBjb21wX3Bhc3NfdHlwZTogQ29tcFBhc3NUeXBlO1xuICAgIGNvbnN0cnVjdG9yKHNoZWV0OiBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYiwgdHlwZTogQ29tcFBhc3NUeXBlKSB7XG4gICAgICAgIHRoaXMuc2hlZXQgPSBzaGVldDtcbiAgICAgICAgdGhpcy5jb21wX3Bhc3NfdHlwZSA9IHR5cGU7XG4gICAgfVxuXG4gICAgYWJzdHJhY3QgZ2V0IGF2YWlsYWJsZV9jb2x1bW4oKTogc3RyaW5nO1xuICAgIGFic3RyYWN0IGdldCB1c2VkX2NvbHVtbigpOiBzdHJpbmc7XG4gICAgYWJzdHJhY3QgZ2V0IG5hbWVfY29sdW1uKCk6IHN0cmluZztcbiAgICBhYnN0cmFjdCBnZXQgc3RhcnRfaW5kZXgoKTogbnVtYmVyO1xuICAgIGFic3RyYWN0IGdldCBzaGVldF9uYW1lKCk6IHN0cmluZztcblxuICAgIGFzeW5jIGdldF9hdmFpbGFibGVfYW5kX3VzZWRfcGFzc2VzKFxuICAgICAgICBwYXRyb2xsZXJfbmFtZTogc3RyaW5nXG4gICAgKTogUHJvbWlzZTxVc2VkQW5kQXZhaWxhYmxlUGFzc2VzIHwgbnVsbD4ge1xuICAgICAgICBjb25zdCBwYXRyb2xsZXJfcm93ID0gYXdhaXQgdGhpcy5zaGVldC5nZXRfc2hlZXRfcm93X2Zvcl9wYXRyb2xsZXIoXG4gICAgICAgICAgICBwYXRyb2xsZXJfbmFtZSxcbiAgICAgICAgICAgIHRoaXMubmFtZV9jb2x1bW5cbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHBhdHJvbGxlcl9yb3cgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY3VycmVudF9kYXlfYXZhaWxhYmxlX3Bhc3NlcyA9XG4gICAgICAgICAgICBwYXRyb2xsZXJfcm93LnJvd1tleGNlbF9yb3dfdG9faW5kZXgodGhpcy5hdmFpbGFibGVfY29sdW1uKV07XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfZGF5X3VzZWRfcGFzc2VzID1cbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cucm93W2V4Y2VsX3Jvd190b19pbmRleCh0aGlzLnVzZWRfY29sdW1uKV07XG4gICAgICAgIHJldHVybiBuZXcgVXNlZEFuZEF2YWlsYWJsZVBhc3NlcyhcbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cucm93LFxuICAgICAgICAgICAgcGF0cm9sbGVyX3Jvdy5pbmRleCxcbiAgICAgICAgICAgIGN1cnJlbnRfZGF5X2F2YWlsYWJsZV9wYXNzZXMsXG4gICAgICAgICAgICBjdXJyZW50X2RheV91c2VkX3Bhc3NlcyxcbiAgICAgICAgICAgIHRoaXMuY29tcF9wYXNzX3R5cGVcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBhc3luYyBzZXRfdXNlZF9jb21wX3Bhc3NlcyhwYXRyb2xsZXJfcm93OiBVc2VkQW5kQXZhaWxhYmxlUGFzc2VzLCBwYXNzZXNfZGVzaXJlZDogbnVtYmVyKSB7XG4gICAgICAgIGlmIChwYXRyb2xsZXJfcm93LmF2YWlsYWJsZV90b2RheSA8IHBhc3Nlc19kZXNpcmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgYE5vdCBlbm91Z2ggYXZhaWxhYmxlIHBhc3NlczogQXZhaWxhYmxlOiAke3BhdHJvbGxlcl9yb3cuYXZhaWxhYmxlX3RvZGF5fSwgVXNlZDogJHtwYXRyb2xsZXJfcm93LnVzZWR9LCBEZXNpcmVkOiAke3Bhc3Nlc19kZXNpcmVkfWBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgcm93bnVtID0gcGF0cm9sbGVyX3Jvdy5pbmRleDtcblxuICAgICAgICBjb25zdCBzdGFydF9pbmRleCA9IHRoaXMuc3RhcnRfaW5kZXg7XG4gICAgICAgIGNvbnN0IHByaW9yX2xlbmd0aCA9IHBhdHJvbGxlcl9yb3cucm93Lmxlbmd0aCAtIHN0YXJ0X2luZGV4O1xuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRfZGF0ZV9zdHJpbmcgPSBmb3JtYXRfZGF0ZV9mb3Jfc3ByZWFkc2hlZXRfdmFsdWUoXG4gICAgICAgICAgICBuZXcgRGF0ZSgpXG4gICAgICAgICk7XG4gICAgICAgIGxldCBuZXdfdmFscyA9IHBhdHJvbGxlcl9yb3cucm93XG4gICAgICAgICAgICAuc2xpY2Uoc3RhcnRfaW5kZXgpXG4gICAgICAgICAgICAubWFwKCh4KSA9PiB4Py50b1N0cmluZygpKVxuICAgICAgICAgICAgLmZpbHRlcigoeCkgPT4gIXg/LmVuZHNXaXRoKGN1cnJlbnRfZGF0ZV9zdHJpbmcpKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhc3Nlc19kZXNpcmVkOyBpKyspIHtcbiAgICAgICAgICAgIG5ld192YWxzLnB1c2goY3VycmVudF9kYXRlX3N0cmluZyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB1cGRhdGVfbGVuZ3RoID0gTWF0aC5tYXgocHJpb3JfbGVuZ3RoLCBuZXdfdmFscy5sZW5ndGgpO1xuICAgICAgICB3aGlsZSAobmV3X3ZhbHMubGVuZ3RoIDwgdXBkYXRlX2xlbmd0aCkge1xuICAgICAgICAgICAgbmV3X3ZhbHMucHVzaChcIlwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBlbmRfaW5kZXggPSBzdGFydF9pbmRleCArIHVwZGF0ZV9sZW5ndGggLSAxO1xuXG4gICAgICAgIGNvbnN0IHJhbmdlID0gYCR7dGhpcy5zaGVldC5zaGVldF9uYW1lfSEke3Jvd19jb2xfdG9fZXhjZWxfaW5kZXgoXG4gICAgICAgICAgICByb3dudW0sXG4gICAgICAgICAgICBzdGFydF9pbmRleFxuICAgICAgICApfToke3Jvd19jb2xfdG9fZXhjZWxfaW5kZXgocm93bnVtLCBlbmRfaW5kZXgpfWA7XG4gICAgICAgIGNvbnNvbGUubG9nKGBVcGRhdGluZyAke3JhbmdlfSB3aXRoICR7bmV3X3ZhbHMubGVuZ3RofSB2YWx1ZXNgKTtcbiAgICAgICAgYXdhaXQgdGhpcy5zaGVldC51cGRhdGVfdmFsdWVzKHJhbmdlLCBbbmV3X3ZhbHNdKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb21wUGFzc1NoZWV0IGV4dGVuZHMgUGFzc1NoZWV0IHtcbiAgICBjb25maWc6IENvbXBQYXNzZXNDb25maWc7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzIHwgbnVsbCxcbiAgICAgICAgY29uZmlnOiBDb21wUGFzc2VzQ29uZmlnXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgbmV3IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiKFxuICAgICAgICAgICAgICAgIHNoZWV0c19zZXJ2aWNlLFxuICAgICAgICAgICAgICAgIGNvbmZpZy5TSEVFVF9JRCxcbiAgICAgICAgICAgICAgICBjb25maWcuQ09NUF9QQVNTX1NIRUVUXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgQ29tcFBhc3NUeXBlLkNvbXBQYXNzXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgIH1cblxuICAgIGdldCBzdGFydF9pbmRleCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gZXhjZWxfcm93X3RvX2luZGV4KFxuICAgICAgICAgICAgdGhpcy5jb25maWcuQ09NUF9QQVNTX1NIRUVUX0RBVEVTX1NUQVJUSU5HX0NPTFVNTlxuICAgICAgICApO1xuICAgIH1cbiAgICBnZXQgc2hlZXRfbmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuQ09NUF9QQVNTX1NIRUVUO1xuICAgIH1cbiAgICBnZXQgYXZhaWxhYmxlX2NvbHVtbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuQ09NUF9QQVNTX1NIRUVUX0RBVEVTX0FWQUlMQUJMRV9DT0xVTU47XG4gICAgfVxuICAgIGdldCB1c2VkX2NvbHVtbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuQ09NUF9QQVNTX1NIRUVUX0RBVEVTX1VTRURfVE9EQVlfQ09MVU1OO1xuICAgIH1cbiAgICBnZXQgbmFtZV9jb2x1bW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLkNPTVBfUEFTU19TSEVFVF9OQU1FX0NPTFVNTjtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNYW5hZ2VyUGFzc1NoZWV0IGV4dGVuZHMgUGFzc1NoZWV0IHtcbiAgICBjb25maWc6IE1hbmFnZXJQYXNzZXNDb25maWc7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzIHwgbnVsbCxcbiAgICAgICAgY29uZmlnOiBNYW5hZ2VyUGFzc2VzQ29uZmlnXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgbmV3IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiKFxuICAgICAgICAgICAgICAgIHNoZWV0c19zZXJ2aWNlLFxuICAgICAgICAgICAgICAgIGNvbmZpZy5TSEVFVF9JRCxcbiAgICAgICAgICAgICAgICBjb25maWcuTUFOQUdFUl9QQVNTX1NIRUVUXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgQ29tcFBhc3NUeXBlLk1hbmFnZXJQYXNzXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgIH1cblxuICAgIGdldCBzdGFydF9pbmRleCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gZXhjZWxfcm93X3RvX2luZGV4KFxuICAgICAgICAgICAgdGhpcy5jb25maWcuTUFOQUdFUl9QQVNTX1NIRUVUX0RBVEVTX1NUQVJUSU5HX0NPTFVNTlxuICAgICAgICApO1xuICAgIH1cbiAgICBnZXQgc2hlZXRfbmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuTUFOQUdFUl9QQVNTX1NIRUVUO1xuICAgIH1cbiAgICBnZXQgYXZhaWxhYmxlX2NvbHVtbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuTUFOQUdFUl9QQVNTX1NIRUVUX0FWQUlBQkxFX0NPTFVNTjtcbiAgICB9XG4gICAgZ2V0IHVzZWRfY29sdW1uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5NQU5BR0VSX1BBU1NfU0hFRVRfVVNFRF9UT0RBWV9DT0xVTU47XG4gICAgfVxuICAgIGdldCBuYW1lX2NvbHVtbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuTUFOQUdFUl9QQVNTX1NIRUVUX05BTUVfQ09MVU1OO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IGxvb2t1cF9yb3dfY29sX2luX3NoZWV0LCBleGNlbF9yb3dfdG9faW5kZXggfSBmcm9tIFwiLi4vdXRpbHMvdXRpbFwiO1xuaW1wb3J0IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiIGZyb20gXCIuLi91dGlscy9nb29nbGVfc2hlZXRzX3NwcmVhZHNoZWV0X3RhYlwiO1xuaW1wb3J0IHsgc2FuaXRpemVfZGF0ZSB9IGZyb20gXCIuLi91dGlscy9kYXRldGltZV91dGlsXCI7XG5pbXBvcnQgeyBMb2dpblNoZWV0Q29uZmlnLCBQYXRyb2xsZXJSb3dDb25maWcgfSBmcm9tIFwiLi4vZW52L2hhbmRsZXJfY29uZmlnXCI7XG5pbXBvcnQgeyBzaGVldHNfdjQgfSBmcm9tIFwiZ29vZ2xlYXBpc1wiO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSByb3cgb2YgcGF0cm9sbGVyIGRhdGEuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBQYXRyb2xsZXJSb3dcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBpbmRleCAtIFRoZSBpbmRleCBvZiB0aGUgcm93LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcGF0cm9sbGVyLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IGNhdGVnb3J5IC0gVGhlIGNhdGVnb3J5IG9mIHRoZSBwYXRyb2xsZXIuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gc2VjdGlvbiAtIFRoZSBzZWN0aW9uIG9mIHRoZSBwYXRyb2xsZXIuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gY2hlY2tpbiAtIFRoZSBjaGVjay1pbiBzdGF0dXMgb2YgdGhlIHBhdHJvbGxlci5cbiAqL1xuZXhwb3J0IHR5cGUgUGF0cm9sbGVyUm93ID0ge1xuICAgIGluZGV4OiBudW1iZXI7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGNhdGVnb3J5OiBzdHJpbmc7XG4gICAgc2VjdGlvbjogc3RyaW5nO1xuICAgIGNoZWNraW46IHN0cmluZztcbn07XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGEgbG9naW4gc2hlZXQgaW4gR29vZ2xlIFNoZWV0cy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9naW5TaGVldCB7XG4gICAgbG9naW5fc2hlZXQ6IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiO1xuICAgIGNoZWNraW5fY291bnRfc2hlZXQ6IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiO1xuICAgIGNvbmZpZzogTG9naW5TaGVldENvbmZpZztcbiAgICByb3dzPzogYW55W11bXSB8IG51bGwgPSBudWxsO1xuICAgIGNoZWNraW5fY291bnQ6IG51bWJlciB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgICBwYXRyb2xsZXJzOiBQYXRyb2xsZXJSb3dbXSA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBMb2dpblNoZWV0LlxuICAgICAqIEBwYXJhbSB7c2hlZXRzX3Y0LlNoZWV0cyB8IG51bGx9IHNoZWV0c19zZXJ2aWNlIC0gVGhlIEdvb2dsZSBTaGVldHMgQVBJIHNlcnZpY2UuXG4gICAgICogQHBhcmFtIHtMb2dpblNoZWV0Q29uZmlnfSBjb25maWcgLSBUaGUgY29uZmlndXJhdGlvbiBmb3IgdGhlIGxvZ2luIHNoZWV0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyB8IG51bGwsXG4gICAgICAgIGNvbmZpZzogTG9naW5TaGVldENvbmZpZ1xuICAgICkge1xuICAgICAgICB0aGlzLmxvZ2luX3NoZWV0ID0gbmV3IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiKFxuICAgICAgICAgICAgc2hlZXRzX3NlcnZpY2UsXG4gICAgICAgICAgICBjb25maWcuU0hFRVRfSUQsXG4gICAgICAgICAgICBjb25maWcuTE9HSU5fU0hFRVRfTE9PS1VQXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY2hlY2tpbl9jb3VudF9zaGVldCA9IG5ldyBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYihcbiAgICAgICAgICAgIHNoZWV0c19zZXJ2aWNlLFxuICAgICAgICAgICAgY29uZmlnLlNIRUVUX0lELFxuICAgICAgICAgICAgY29uZmlnLkNIRUNLSU5fQ09VTlRfTE9PS1VQXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZnJlc2hlcyB0aGUgZGF0YSBmcm9tIHRoZSBHb29nbGUgU2hlZXRzLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgICAqL1xuICAgIGFzeW5jIHJlZnJlc2goKSB7XG4gICAgICAgIHRoaXMucm93cyA9IGF3YWl0IHRoaXMubG9naW5fc2hlZXQuZ2V0X3ZhbHVlcyhcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLkxPR0lOX1NIRUVUX0xPT0tVUFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmNoZWNraW5fY291bnQgPSAoYXdhaXQgdGhpcy5jaGVja2luX2NvdW50X3NoZWV0LmdldF92YWx1ZXMoXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5DSEVDS0lOX0NPVU5UX0xPT0tVUFxuICAgICAgICApKSFbMF1bMF07XG4gICAgICAgIHRoaXMucGF0cm9sbGVycyA9IHRoaXMucm93cyEubWFwKCh4LCBpKSA9PlxuICAgICAgICAgICAgdGhpcy5wYXJzZV9wYXRyb2xsZXJfcm93KGksIHgsIHRoaXMuY29uZmlnKVxuICAgICAgICApLmZpbHRlcigoeCkgPT4geCAhPSBudWxsKSBhcyBQYXRyb2xsZXJSb3dbXTtcbiAgICAgICAgY29uc29sZS5sb2coXCJSZWZyZXNoaW5nIFBhdHJvbGxlcnM6IFwiICsgdGhpcy5wYXRyb2xsZXJzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBhcmNoaXZlZCBzdGF0dXMgb2YgdGhlIGxvZ2luIHNoZWV0LlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzaGVldCBpcyBhcmNoaXZlZCwgb3RoZXJ3aXNlIGZhbHNlLlxuICAgICAqL1xuICAgIGdldCBhcmNoaXZlZCgpIHtcbiAgICAgICAgY29uc3QgYXJjaGl2ZWQgPSBsb29rdXBfcm93X2NvbF9pbl9zaGVldChcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLkFSQ0hJVkVEX0NFTEwsXG4gICAgICAgICAgICB0aGlzLnJvd3MhXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAoYXJjaGl2ZWQgPT09IHVuZGVmaW5lZCAmJiB0aGlzLmNoZWNraW5fY291bnQgPT09IDApIHx8XG4gICAgICAgICAgICBhcmNoaXZlZC50b0xvd2VyQ2FzZSgpID09PSBcInllc1wiXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgZGF0ZSBvZiB0aGUgc2hlZXQuXG4gICAgICogQHJldHVybnMge0RhdGV9IFRoZSBkYXRlIG9mIHRoZSBzaGVldC5cbiAgICAgKi9cbiAgICBnZXQgc2hlZXRfZGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHNhbml0aXplX2RhdGUoXG4gICAgICAgICAgICBsb29rdXBfcm93X2NvbF9pbl9zaGVldCh0aGlzLmNvbmZpZy5TSEVFVF9EQVRFX0NFTEwsIHRoaXMucm93cyEpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgY3VycmVudCBkYXRlLlxuICAgICAqIEByZXR1cm5zIHtEYXRlfSBUaGUgY3VycmVudCBkYXRlLlxuICAgICAqL1xuICAgIGdldCBjdXJyZW50X2RhdGUoKSB7XG4gICAgICAgIHJldHVybiBzYW5pdGl6ZV9kYXRlKFxuICAgICAgICAgICAgbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQodGhpcy5jb25maWcuQ1VSUkVOVF9EQVRFX0NFTEwsIHRoaXMucm93cyEpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHRoZSBzaGVldCBkYXRlIGlzIHRoZSBjdXJyZW50IGRhdGUuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNoZWV0IGRhdGUgaXMgdGhlIGN1cnJlbnQgZGF0ZSwgb3RoZXJ3aXNlIGZhbHNlLlxuICAgICAqL1xuICAgIGdldCBpc19jdXJyZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zaGVldF9kYXRlLmdldFRpbWUoKSA9PT0gdGhpcy5jdXJyZW50X2RhdGUuZ2V0VGltZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWVzIHRvIGZpbmQgYSBwYXRyb2xsZXIgYnkgbmFtZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwYXRyb2xsZXIuXG4gICAgICogQHJldHVybnMge1BhdHJvbGxlclJvdyB8IFwibm90X2ZvdW5kXCJ9IFRoZSBwYXRyb2xsZXIgcm93IG9yIFwibm90X2ZvdW5kXCIuXG4gICAgICovXG4gICAgdHJ5X2ZpbmRfcGF0cm9sbGVyKG5hbWU6IHN0cmluZykge1xuICAgICAgICBjb25zdCBwYXRyb2xsZXJzID0gdGhpcy5wYXRyb2xsZXJzLmZpbHRlcigoeCkgPT4geC5uYW1lID09PSBuYW1lKTtcbiAgICAgICAgaWYgKHBhdHJvbGxlcnMubGVuZ3RoICE9PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJub3RfZm91bmRcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGF0cm9sbGVyc1swXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaW5kcyBhIHBhdHJvbGxlciBieSBuYW1lLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHBhdHJvbGxlci5cbiAgICAgKiBAcmV0dXJucyB7UGF0cm9sbGVyUm93fSBUaGUgcGF0cm9sbGVyIHJvdy5cbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBhdHJvbGxlciBpcyBub3QgZm91bmQuXG4gICAgICovXG4gICAgZmluZF9wYXRyb2xsZXIobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMudHJ5X2ZpbmRfcGF0cm9sbGVyKG5hbWUpO1xuICAgICAgICBpZiAocmVzdWx0ID09PSBcIm5vdF9mb3VuZFwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBmaW5kICR7bmFtZX0gaW4gbG9naW4gc2hlZXRgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHBhdHJvbGxlcnMgd2hvIGFyZSBvbiBkdXR5LlxuICAgICAqIEByZXR1cm5zIHtQYXRyb2xsZXJSb3dbXX0gVGhlIGxpc3Qgb2Ygb24tZHV0eSBwYXRyb2xsZXJzLlxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgbG9naW4gc2hlZXQgaXMgbm90IGN1cnJlbnQuXG4gICAgICovXG4gICAgZ2V0X29uX2R1dHlfcGF0cm9sbGVycygpOiBQYXRyb2xsZXJSb3dbXSB7XG4gICAgICAgIGlmICghdGhpcy5pc19jdXJyZW50KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJMb2dpbiBzaGVldCBpcyBub3QgY3VycmVudFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wYXRyb2xsZXJzLmZpbHRlcigoeCkgPT4geC5jaGVja2luKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaW4gYSBwYXRyb2xsZXIgd2l0aCBhIG5ldyBjaGVjay1pbiB2YWx1ZS5cbiAgICAgKiBAcGFyYW0ge1BhdHJvbGxlclJvd30gcGF0cm9sbGVyX3N0YXR1cyAtIFRoZSBzdGF0dXMgb2YgdGhlIHBhdHJvbGxlci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmV3X2NoZWNraW5fdmFsdWUgLSBUaGUgbmV3IGNoZWNrLWluIHZhbHVlLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgbG9naW4gc2hlZXQgaXMgbm90IGN1cnJlbnQuXG4gICAgICovXG4gICAgYXN5bmMgY2hlY2tpbihwYXRyb2xsZXJfc3RhdHVzOiBQYXRyb2xsZXJSb3csIG5ld19jaGVja2luX3ZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzX2N1cnJlbnQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxvZ2luIHNoZWV0IGlzIG5vdCBjdXJyZW50XCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGBFeGlzdGluZyBzdGF0dXM6ICR7SlNPTi5zdHJpbmdpZnkocGF0cm9sbGVyX3N0YXR1cyl9YCk7XG5cbiAgICAgICAgY29uc3Qgcm93ID0gcGF0cm9sbGVyX3N0YXR1cy5pbmRleCArIDE7IC8vIHByb2dyYW1taW5nIC0+IGV4Y2VsIGxvb2t1cFxuICAgICAgICBjb25zdCByYW5nZSA9IGAke3RoaXMuY29uZmlnLkNIRUNLSU5fRFJPUERPV05fQ09MVU1OfSR7cm93fWA7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5sb2dpbl9zaGVldC51cGRhdGVfdmFsdWVzKHJhbmdlLCBbW25ld19jaGVja2luX3ZhbHVlXV0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlcyBhIHJvdyBvZiBwYXRyb2xsZXIgZGF0YS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggLSBUaGUgaW5kZXggb2YgdGhlIHJvdy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSByb3cgLSBUaGUgcm93IGRhdGEuXG4gICAgICogQHBhcmFtIHtQYXRyb2xsZXJSb3dDb25maWd9IG9wdHMgLSBUaGUgY29uZmlndXJhdGlvbiBvcHRpb25zIGZvciB0aGUgcGF0cm9sbGVyIHJvdy5cbiAgICAgKiBAcmV0dXJucyB7UGF0cm9sbGVyUm93IHwgbnVsbH0gVGhlIHBhcnNlZCBwYXRyb2xsZXIgcm93IG9yIG51bGwgaWYgaW52YWxpZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHBhcnNlX3BhdHJvbGxlcl9yb3coXG4gICAgICAgIGluZGV4OiBudW1iZXIsXG4gICAgICAgIHJvdzogc3RyaW5nW10sXG4gICAgICAgIG9wdHM6IFBhdHJvbGxlclJvd0NvbmZpZ1xuICAgICk6IFBhdHJvbGxlclJvdyB8IG51bGwge1xuICAgICAgICBpZiAocm93Lmxlbmd0aCA8IDQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbmRleCA8IDMpe1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIG5hbWU6IHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5OQU1FX0NPTFVNTildLFxuICAgICAgICAgICAgY2F0ZWdvcnk6IHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5DQVRFR09SWV9DT0xVTU4pXSxcbiAgICAgICAgICAgIHNlY3Rpb246IHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5TRUNUSU9OX0RST1BET1dOX0NPTFVNTildLFxuICAgICAgICAgICAgY2hlY2tpbjogcm93W2V4Y2VsX3Jvd190b19pbmRleChvcHRzLkNIRUNLSU5fRFJPUERPV05fQ09MVU1OKV0sXG4gICAgICAgIH07XG4gICAgfVxufSIsImltcG9ydCB7IHNoZWV0c192NCB9IGZyb20gXCJnb29nbGVhcGlzXCI7XG5pbXBvcnQge1xuICAgIFNlYXNvblNoZWV0Q29uZmlnLFxufSBmcm9tIFwiLi4vZW52L2hhbmRsZXJfY29uZmlnXCI7XG5pbXBvcnQgeyBleGNlbF9yb3dfdG9faW5kZXggfSBmcm9tIFwiLi4vdXRpbHMvdXRpbFwiO1xuaW1wb3J0IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiIGZyb20gXCIuLi91dGlscy9nb29nbGVfc2hlZXRzX3NwcmVhZHNoZWV0X3RhYlwiO1xuaW1wb3J0IHsgZmlsdGVyX2xpc3RfdG9fZW5kc3dpdGhfY3VycmVudF9kYXkgfSBmcm9tIFwiLi4vdXRpbHMvZGF0ZXRpbWVfdXRpbFwiO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhIHNlYXNvbiBzaGVldCBpbiBHb29nbGUgU2hlZXRzLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWFzb25TaGVldCB7XG4gICAgc2hlZXQ6IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiO1xuICAgIGNvbmZpZzogU2Vhc29uU2hlZXRDb25maWc7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFNlYXNvblNoZWV0LlxuICAgICAqIEBwYXJhbSB7c2hlZXRzX3Y0LlNoZWV0cyB8IG51bGx9IHNoZWV0c19zZXJ2aWNlIC0gVGhlIEdvb2dsZSBTaGVldHMgQVBJIHNlcnZpY2UuXG4gICAgICogQHBhcmFtIHtTZWFzb25TaGVldENvbmZpZ30gY29uZmlnIC0gVGhlIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBzZWFzb24gc2hlZXQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzIHwgbnVsbCxcbiAgICAgICAgY29uZmlnOiBTZWFzb25TaGVldENvbmZpZ1xuICAgICkge1xuICAgICAgICB0aGlzLnNoZWV0ID0gbmV3IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiKFxuICAgICAgICAgICAgc2hlZXRzX3NlcnZpY2UsXG4gICAgICAgICAgICBjb25maWcuU0hFRVRfSUQsXG4gICAgICAgICAgICBjb25maWcuU0VBU09OX1NIRUVUXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG51bWJlciBvZiBkYXlzIHBhdHJvbGxlZCBieSBhIHBhdHJvbGxlci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0cm9sbGVyX25hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcGF0cm9sbGVyLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPG51bWJlcj59IFRoZSBudW1iZXIgb2YgZGF5cyBwYXRyb2xsZWQuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3BhdHJvbGxlZF9kYXlzKFxuICAgICAgICBwYXRyb2xsZXJfbmFtZTogc3RyaW5nXG4gICAgKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICAgICAgY29uc3QgcGF0cm9sbGVyX3JvdyA9IGF3YWl0IHRoaXMuc2hlZXQuZ2V0X3NoZWV0X3Jvd19mb3JfcGF0cm9sbGVyKFxuICAgICAgICAgICAgcGF0cm9sbGVyX25hbWUsXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5TRUFTT05fU0hFRVRfTkFNRV9DT0xVTU5cbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoIXBhdHJvbGxlcl9yb3cpIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGN1cnJlbnROdW1iZXIgPVxuICAgICAgICAgICAgcGF0cm9sbGVyX3Jvdy5yb3dbZXhjZWxfcm93X3RvX2luZGV4KHRoaXMuY29uZmlnLlNFQVNPTl9TSEVFVF9EQVlTX0NPTFVNTildO1xuXG4gICAgICAgIGNvbnN0IGN1cnJlbnREYXkgPSBmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9jdXJyZW50X2RheShwYXRyb2xsZXJfcm93LnJvdylcbiAgICAgICAgICAgIC5tYXAoKHgpID0+ICh4Py5zdGFydHNXaXRoKFwiSFwiKSA/IDAuNSA6IDEpKVxuICAgICAgICAgICAgLnJlZHVjZSgoeCwgeSwgaSkgPT4geCArIHksIDApO1xuXG4gICAgICAgIGNvbnN0IGRheXNCZWZvcmVUb2RheSA9IGN1cnJlbnROdW1iZXIgLSBjdXJyZW50RGF5O1xuICAgICAgICByZXR1cm4gZGF5c0JlZm9yZVRvZGF5O1xuICAgIH1cbn0iLCJpbXBvcnQgeyBnb29nbGUgfSBmcm9tIFwiZ29vZ2xlYXBpc1wiO1xuaW1wb3J0IHsgR2VuZXJhdGVBdXRoVXJsT3B0cyB9IGZyb20gXCJnb29nbGUtYXV0aC1saWJyYXJ5XCI7XG5pbXBvcnQgeyBPQXV0aDJDbGllbnQgfSBmcm9tIFwiZ29vZ2xlYXBpcy1jb21tb25cIjtcbmltcG9ydCB7IHNhbml0aXplX3Bob25lX251bWJlciB9IGZyb20gXCIuL3V0aWxzL3V0aWxcIjtcbmltcG9ydCB7IGxvYWRfY3JlZGVudGlhbHNfZmlsZXMgfSBmcm9tIFwiLi91dGlscy9maWxlX3V0aWxzXCI7XG5pbXBvcnQgeyBTZXJ2aWNlQ29udGV4dCB9IGZyb20gXCJAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzL3R5cGVzXCI7XG5pbXBvcnQgeyBVc2VyQ3JlZHNDb25maWcgfSBmcm9tIFwiLi9lbnYvaGFuZGxlcl9jb25maWdcIjtcbmltcG9ydCB7IHZhbGlkYXRlX3Njb3BlcyB9IGZyb20gXCIuL3V0aWxzL3Njb3BlX3V0aWxcIjtcblxuY29uc3QgU0NPUEVTID0gW1xuICAgIFwiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9zY3JpcHQucHJvamVjdHNcIixcbiAgICBcImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvc3ByZWFkc2hlZXRzXCIsXG5dO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyB1c2VyIGNyZWRlbnRpYWxzIGZvciBHb29nbGUgT0F1dGgyLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyQ3JlZHMge1xuICAgIG51bWJlcjogc3RyaW5nO1xuICAgIG9hdXRoMl9jbGllbnQ6IE9BdXRoMkNsaWVudDtcbiAgICBzeW5jX2NsaWVudDogU2VydmljZUNvbnRleHQ7XG4gICAgZG9tYWluPzogc3RyaW5nO1xuICAgIGxvYWRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgVXNlckNyZWRzIGluc3RhbmNlLlxuICAgICAqIEBwYXJhbSB7U2VydmljZUNvbnRleHR9IHN5bmNfY2xpZW50IC0gVGhlIFR3aWxpbyBTeW5jIGNsaWVudC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IHVuZGVmaW5lZH0gbnVtYmVyIC0gVGhlIHVzZXIncyBwaG9uZSBudW1iZXIuXG4gICAgICogQHBhcmFtIHtVc2VyQ3JlZHNDb25maWd9IG9wdHMgLSBUaGUgdXNlciBjcmVkZW50aWFscyBjb25maWd1cmF0aW9uLlxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBUaHJvd3MgYW4gZXJyb3IgaWYgdGhlIG51bWJlciBpcyB1bmRlZmluZWQgb3IgbnVsbC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgc3luY19jbGllbnQ6IFNlcnZpY2VDb250ZXh0LFxuICAgICAgICBudW1iZXI6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICAgICAgb3B0czogVXNlckNyZWRzQ29uZmlnXG4gICAgKSB7XG4gICAgICAgIGlmIChudW1iZXIgPT09IHVuZGVmaW5lZCB8fCBudW1iZXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk51bWJlciBpcyB1bmRlZmluZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5udW1iZXIgPSBzYW5pdGl6ZV9waG9uZV9udW1iZXIobnVtYmVyKTtcblxuICAgICAgICBjb25zdCBjcmVkZW50aWFscyA9IGxvYWRfY3JlZGVudGlhbHNfZmlsZXMoKTtcbiAgICAgICAgY29uc3QgeyBjbGllbnRfc2VjcmV0LCBjbGllbnRfaWQsIHJlZGlyZWN0X3VyaXMgfSA9IGNyZWRlbnRpYWxzLndlYjtcbiAgICAgICAgdGhpcy5vYXV0aDJfY2xpZW50ID0gbmV3IGdvb2dsZS5hdXRoLk9BdXRoMihcbiAgICAgICAgICAgIGNsaWVudF9pZCxcbiAgICAgICAgICAgIGNsaWVudF9zZWNyZXQsXG4gICAgICAgICAgICByZWRpcmVjdF91cmlzWzBdXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3luY19jbGllbnQgPSBzeW5jX2NsaWVudDtcbiAgICAgICAgbGV0IGRvbWFpbiA9IG9wdHMuTlNQX0VNQUlMX0RPTUFJTjtcbiAgICAgICAgaWYgKGRvbWFpbiA9PT0gdW5kZWZpbmVkIHx8IGRvbWFpbiA9PT0gbnVsbCB8fCBkb21haW4gPT09IFwiXCIpIHtcbiAgICAgICAgICAgIGRvbWFpbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZG9tYWluID0gZG9tYWluO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9hZCB0aGUgT0F1dGgyIHRva2VuLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIGJvb2xlYW4gaW5kaWNhdGluZyBpZiB0aGUgdG9rZW4gd2FzIGxvYWRlZC5cbiAgICAgKi9cbiAgICBhc3luYyBsb2FkVG9rZW4oKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIGlmICghdGhpcy5sb2FkZWQpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYExvb2tpbmcgZm9yICR7dGhpcy50b2tlbl9rZXl9YCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2F1dGgyRG9jID0gYXdhaXQgdGhpcy5zeW5jX2NsaWVudFxuICAgICAgICAgICAgICAgICAgICAuZG9jdW1lbnRzKHRoaXMudG9rZW5fa2V5KVxuICAgICAgICAgICAgICAgICAgICAuZmV0Y2goKTtcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIG9hdXRoMkRvYyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgICAgIG9hdXRoMkRvYy5kYXRhID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgICAgICBvYXV0aDJEb2MuZGF0YS50b2tlbiA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBEaWRuJ3QgZmluZCAke3RoaXMudG9rZW5fa2V5fWApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRva2VuID0gb2F1dGgyRG9jLmRhdGEudG9rZW47XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlX3Njb3BlcyhvYXV0aDJEb2MuZGF0YS5zY29wZXMsIFNDT1BFUyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2F1dGgyX2NsaWVudC5zZXRDcmVkZW50aWFscyh0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBMb2FkZWQgdG9rZW4gJHt0aGlzLnRva2VuX2tleX1gKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICAgICAgYEZhaWxlZCB0byBsb2FkIHRva2VuIGZvciAke3RoaXMudG9rZW5fa2V5fS5cXG4gJHtlfWBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHRva2VuIGtleS5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgdG9rZW4ga2V5LlxuICAgICAqL1xuICAgIGdldCB0b2tlbl9rZXkoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGBvYXV0aDJfJHt0aGlzLm51bWJlcn1gO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlbGV0ZSB0aGUgT0F1dGgyIHRva2VuLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIGJvb2xlYW4gaW5kaWNhdGluZyBpZiB0aGUgdG9rZW4gd2FzIGRlbGV0ZWQuXG4gICAgICovXG4gICAgYXN5bmMgZGVsZXRlVG9rZW4oKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIGNvbnN0IG9hdXRoMkRvYyA9IGF3YWl0IHRoaXMuc3luY19jbGllbnRcbiAgICAgICAgICAgIC5kb2N1bWVudHModGhpcy50b2tlbl9rZXkpXG4gICAgICAgICAgICAuZmV0Y2goKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgb2F1dGgyRG9jID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIG9hdXRoMkRvYy5kYXRhID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgb2F1dGgyRG9jLmRhdGEudG9rZW4gPT09IHVuZGVmaW5lZFxuICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBEaWRuJ3QgZmluZCAke3RoaXMudG9rZW5fa2V5fWApO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHRoaXMuc3luY19jbGllbnQuZG9jdW1lbnRzKG9hdXRoMkRvYy5zaWQpLnJlbW92ZSgpO1xuICAgICAgICBjb25zb2xlLmxvZyhgRGVsZXRlZCB0b2tlbiAke3RoaXMudG9rZW5fa2V5fWApO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb21wbGV0ZSB0aGUgbG9naW4gcHJvY2VzcyBieSBleGNoYW5naW5nIHRoZSBhdXRob3JpemF0aW9uIGNvZGUgZm9yIGEgdG9rZW4uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvZGUgLSBUaGUgYXV0aG9yaXphdGlvbiBjb2RlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IHNjb3BlcyAtIFRoZSBzY29wZXMgdG8gdmFsaWRhdGUuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGxvZ2luIHByb2Nlc3MgaXMgY29tcGxldGUuXG4gICAgICovXG4gICAgYXN5bmMgY29tcGxldGVMb2dpbihjb2RlOiBzdHJpbmcsIHNjb3Blczogc3RyaW5nW10pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgdmFsaWRhdGVfc2NvcGVzKHNjb3BlcywgU0NPUEVTKTtcbiAgICAgICAgY29uc3QgdG9rZW4gPSBhd2FpdCB0aGlzLm9hdXRoMl9jbGllbnQuZ2V0VG9rZW4oY29kZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KE9iamVjdC5rZXlzKHRva2VuLnJlcyEpKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRva2VuLnRva2VucykpO1xuICAgICAgICB0aGlzLm9hdXRoMl9jbGllbnQuc2V0Q3JlZGVudGlhbHModG9rZW4udG9rZW5zKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IG9hdXRoRG9jID0gYXdhaXQgdGhpcy5zeW5jX2NsaWVudC5kb2N1bWVudHMuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICBkYXRhOiB7IHRva2VuOiB0b2tlbi50b2tlbnMsIHNjb3Blczogc2NvcGVzIH0sXG4gICAgICAgICAgICAgICAgdW5pcXVlTmFtZTogdGhpcy50b2tlbl9rZXksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgYEV4Y2VwdGlvbiB3aGVuIGNyZWF0aW5nIG9hdXRoLiBUcnlpbmcgdG8gdXBkYXRlIGluc3RlYWQuLi5cXG4ke2V9YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IG9hdXRoRG9jID0gYXdhaXQgdGhpcy5zeW5jX2NsaWVudFxuICAgICAgICAgICAgICAgIC5kb2N1bWVudHModGhpcy50b2tlbl9rZXkpXG4gICAgICAgICAgICAgICAgLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHsgdG9rZW46IHRva2VuLCBzY29wZXM6IHNjb3BlcyB9LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBhdXRob3JpemF0aW9uIFVSTC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzdHJpbmc+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgYXV0aG9yaXphdGlvbiBVUkwuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0QXV0aFVybCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zdCBpZCA9IHRoaXMuZ2VuZXJhdGVSYW5kb21TdHJpbmcoKTtcbiAgICAgICAgY29uc29sZS5sb2coYFVzaW5nIG5vbmNlICR7aWR9IGZvciAke3RoaXMubnVtYmVyfWApO1xuICAgICAgICBjb25zdCBkb2MgPSBhd2FpdCB0aGlzLnN5bmNfY2xpZW50LmRvY3VtZW50cy5jcmVhdGUoe1xuICAgICAgICAgICAgZGF0YTogeyBudW1iZXI6IHRoaXMubnVtYmVyLCBzY29wZXM6IFNDT1BFUyB9LFxuICAgICAgICAgICAgdW5pcXVlTmFtZTogaWQsXG4gICAgICAgICAgICB0dGw6IDYwICogNSwgLy8gNSBtaW51dGVzXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhgTWFkZSBub25jZS1kb2M6ICR7SlNPTi5zdHJpbmdpZnkoZG9jKX1gKTtcblxuICAgICAgICBjb25zdCBvcHRzOiBHZW5lcmF0ZUF1dGhVcmxPcHRzID0ge1xuICAgICAgICAgICAgYWNjZXNzX3R5cGU6IFwib2ZmbGluZVwiLFxuICAgICAgICAgICAgc2NvcGU6IFNDT1BFUyxcbiAgICAgICAgICAgIHN0YXRlOiBpZCxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMuZG9tYWluKSB7XG4gICAgICAgICAgICBvcHRzW1wiaGRcIl0gPSB0aGlzLmRvbWFpbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGF1dGhVcmwgPSB0aGlzLm9hdXRoMl9jbGllbnQuZ2VuZXJhdGVBdXRoVXJsKG9wdHMpO1xuICAgICAgICByZXR1cm4gYXV0aFVybDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZSBhIHJhbmRvbSBzdHJpbmcuXG4gICAgICogQHJldHVybnMge3N0cmluZ30gQSByYW5kb20gc3RyaW5nLlxuICAgICAqL1xuICAgIGdlbmVyYXRlUmFuZG9tU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IDMwO1xuICAgICAgICBsZXQgcmVzdWx0ID0gXCJcIjtcbiAgICAgICAgY29uc3QgY2hhcmFjdGVycyA9XG4gICAgICAgICAgICBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5XCI7XG4gICAgICAgIGNvbnN0IGNoYXJhY3RlcnNMZW5ndGggPSBjaGFyYWN0ZXJzLmxlbmd0aDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0ICs9IGNoYXJhY3RlcnMuY2hhckF0KFxuICAgICAgICAgICAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJhY3RlcnNMZW5ndGgpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuXG4vKipcbiAqIEludGVyZmFjZSByZXByZXNlbnRpbmcgdGhlIHVzZXIgY3JlZGVudGlhbHMgY29uZmlndXJhdGlvbi5cbiAqL1xuZXhwb3J0IHsgVXNlckNyZWRzLCBTQ09QRVMgYXMgVXNlckNyZWRzU2NvcGVzIH07XG4iLCIvKipcbiAqIFJlcHJlc2VudHMgYSBjaGVjay1pbiB2YWx1ZSB3aXRoIHZhcmlvdXMgcHJvcGVydGllcyBhbmQgbG9va3VwIHZhbHVlcy5cbiAqL1xuY2xhc3MgQ2hlY2tpblZhbHVlIHtcbiAgICBrZXk6IHN0cmluZztcbiAgICBzaGVldHNfdmFsdWU6IHN0cmluZztcbiAgICBzbXNfZGVzYzogc3RyaW5nO1xuICAgIGZhc3RfY2hlY2tpbnM6IHN0cmluZ1tdO1xuICAgIGxvb2t1cF92YWx1ZXM6IFNldDxzdHJpbmc+O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBDaGVja2luVmFsdWUuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIFRoZSBrZXkgZm9yIHRoZSBjaGVjay1pbiB2YWx1ZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2hlZXRzX3ZhbHVlIC0gVGhlIHZhbHVlIHVzZWQgaW4gc2hlZXRzLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzbXNfZGVzYyAtIFRoZSBkZXNjcmlwdGlvbiB1c2VkIGluIFNNUy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IHN0cmluZ1tdfSBmYXN0X2NoZWNraW5zIC0gVGhlIGZhc3QgY2hlY2staW4gdmFsdWVzLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBrZXk6IHN0cmluZyxcbiAgICAgICAgc2hlZXRzX3ZhbHVlOiBzdHJpbmcsXG4gICAgICAgIHNtc19kZXNjOiBzdHJpbmcsXG4gICAgICAgIGZhc3RfY2hlY2tpbnM6IHN0cmluZyB8IHN0cmluZ1tdXG4gICAgKSB7XG4gICAgICAgIGlmICghKGZhc3RfY2hlY2tpbnMgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgICAgICAgIGZhc3RfY2hlY2tpbnMgPSBbZmFzdF9jaGVja2luc107XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgICAgIHRoaXMuc2hlZXRzX3ZhbHVlID0gc2hlZXRzX3ZhbHVlO1xuICAgICAgICB0aGlzLnNtc19kZXNjID0gc21zX2Rlc2M7XG4gICAgICAgIHRoaXMuZmFzdF9jaGVja2lucyA9IGZhc3RfY2hlY2tpbnMubWFwKCh4KSA9PiB4LnRyaW0oKS50b0xvd2VyQ2FzZSgpKTtcblxuICAgICAgICBjb25zdCBzbXNfZGVzY19zcGxpdDogc3RyaW5nW10gPSBzbXNfZGVzY1xuICAgICAgICAgICAgLnJlcGxhY2UoL1xccysvLCBcIi1cIilcbiAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICAuc3BsaXQoXCIvXCIpO1xuICAgICAgICBjb25zdCBsb29rdXBfdmFscyA9IFsuLi50aGlzLmZhc3RfY2hlY2tpbnMsIC4uLnNtc19kZXNjX3NwbGl0XTtcbiAgICAgICAgdGhpcy5sb29rdXBfdmFsdWVzID0gbmV3IFNldDxzdHJpbmc+KGxvb2t1cF92YWxzKTtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGNvbGxlY3Rpb24gb2YgY2hlY2staW4gdmFsdWVzIHdpdGggdmFyaW91cyBsb29rdXAgbWV0aG9kcy5cbiAqL1xuY2xhc3MgQ2hlY2tpblZhbHVlcyB7XG4gICAgYnlfa2V5OiB7IFtrZXk6IHN0cmluZ106IENoZWNraW5WYWx1ZSB9ID0ge307XG4gICAgYnlfbHY6IHsgW2tleTogc3RyaW5nXTogQ2hlY2tpblZhbHVlIH0gPSB7fTtcbiAgICBieV9mYzogeyBba2V5OiBzdHJpbmddOiBDaGVja2luVmFsdWUgfSA9IHt9O1xuICAgIGJ5X3NoZWV0X3N0cmluZzogeyBba2V5OiBzdHJpbmddOiBDaGVja2luVmFsdWUgfSA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBDaGVja2luVmFsdWVzLlxuICAgICAqIEBwYXJhbSB7Q2hlY2tpblZhbHVlW119IGNoZWNraW5WYWx1ZXMgLSBUaGUgYXJyYXkgb2YgY2hlY2staW4gdmFsdWVzLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNoZWNraW5WYWx1ZXM6IENoZWNraW5WYWx1ZVtdKSB7XG4gICAgICAgIGZvciAodmFyIGNoZWNraW5WYWx1ZSBvZiBjaGVja2luVmFsdWVzKSB7XG4gICAgICAgICAgICB0aGlzLmJ5X2tleVtjaGVja2luVmFsdWUua2V5XSA9IGNoZWNraW5WYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuYnlfc2hlZXRfc3RyaW5nW2NoZWNraW5WYWx1ZS5zaGVldHNfdmFsdWVdID0gY2hlY2tpblZhbHVlO1xuICAgICAgICAgICAgZm9yIChjb25zdCBsdiBvZiBjaGVja2luVmFsdWUubG9va3VwX3ZhbHVlcykge1xuICAgICAgICAgICAgICAgIHRoaXMuYnlfbHZbbHZdID0gY2hlY2tpblZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCBmYyBvZiBjaGVja2luVmFsdWUuZmFzdF9jaGVja2lucykge1xuICAgICAgICAgICAgICAgIHRoaXMuYnlfZmNbZmNdID0gY2hlY2tpblZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZW50cmllcyBvZiBjaGVjay1pbiB2YWx1ZXMgYnkga2V5LlxuICAgICAqIEByZXR1cm5zIHtBcnJheX0gVGhlIGVudHJpZXMgb2YgY2hlY2staW4gdmFsdWVzLlxuICAgICAqL1xuICAgIGVudHJpZXMoKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuZW50cmllcyh0aGlzLmJ5X2tleSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIGEgZmFzdCBjaGVjay1pbiB2YWx1ZSBmcm9tIHRoZSBnaXZlbiBib2R5IHN0cmluZy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYm9keSAtIFRoZSBib2R5IHN0cmluZyB0byBwYXJzZS5cbiAgICAgKiBAcmV0dXJucyB7Q2hlY2tpblZhbHVlIHwgdW5kZWZpbmVkfSBUaGUgcGFyc2VkIGNoZWNrLWluIHZhbHVlIG9yIHVuZGVmaW5lZC5cbiAgICAgKi9cbiAgICBwYXJzZV9mYXN0X2NoZWNraW4oYm9keTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJ5X2ZjW2JvZHldO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlcyBhIGNoZWNrLWluIHZhbHVlIGZyb20gdGhlIGdpdmVuIGJvZHkgc3RyaW5nLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5IC0gVGhlIGJvZHkgc3RyaW5nIHRvIHBhcnNlLlxuICAgICAqIEByZXR1cm5zIHtDaGVja2luVmFsdWUgfCB1bmRlZmluZWR9IFRoZSBwYXJzZWQgY2hlY2staW4gdmFsdWUgb3IgdW5kZWZpbmVkLlxuICAgICAqL1xuICAgIHBhcnNlX2NoZWNraW4oYm9keTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGNoZWNraW5fbG93ZXIgPSBib2R5LnJlcGxhY2UoL1xccysvLCBcIlwiKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnlfbHZbY2hlY2tpbl9sb3dlcl07XG4gICAgfVxufVxuXG5leHBvcnQgeyBDaGVja2luVmFsdWUsIENoZWNraW5WYWx1ZXMgfSIsIi8qKlxuICogRW51bSBmb3IgZGlmZmVyZW50IHR5cGVzIG9mIGNvbXAgcGFzc2VzLlxuICogQGVudW0ge3N0cmluZ31cbiAqL1xuZXhwb3J0IGVudW0gQ29tcFBhc3NUeXBlIHtcbiAgICBDb21wUGFzcyA9IFwiY29tcC1wYXNzXCIsXG4gICAgTWFuYWdlclBhc3MgPSBcIm1hbmFnZXItcGFzc1wiLFxufVxuXG4vKipcbiAqIEdldCB0aGUgZGVzY3JpcHRpb24gZm9yIGEgZ2l2ZW4gY29tcCBwYXNzIHR5cGUuXG4gKiBAcGFyYW0ge0NvbXBQYXNzVHlwZX0gdHlwZSAtIFRoZSB0eXBlIG9mIHRoZSBjb21wIHBhc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZGVzY3JpcHRpb24gb2YgdGhlIGNvbXAgcGFzcyB0eXBlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0X2NvbXBfcGFzc19kZXNjcmlwdGlvbih0eXBlOiBDb21wUGFzc1R5cGUpOiBzdHJpbmcge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIENvbXBQYXNzVHlwZS5Db21wUGFzczpcbiAgICAgICAgICAgIHJldHVybiBcIkNvbXAgUGFzc1wiO1xuICAgICAgICBjYXNlIENvbXBQYXNzVHlwZS5NYW5hZ2VyUGFzczpcbiAgICAgICAgICAgIHJldHVybiBcIk1hbmFnZXIgUGFzc1wiO1xuICAgIH1cbiAgICByZXR1cm4gXCJcIjtcbn0iLCIvKipcbiAqIENvbnZlcnQgYW4gRXhjZWwgZGF0ZSB0byBhIEphdmFTY3JpcHQgRGF0ZSBvYmplY3QuXG4gKiBAcGFyYW0ge251bWJlcn0gZGF0ZSAtIFRoZSBFeGNlbCBkYXRlLlxuICogQHJldHVybnMge0RhdGV9IFRoZSBKYXZhU2NyaXB0IERhdGUgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBleGNlbF9kYXRlX3RvX2pzX2RhdGUoZGF0ZTogbnVtYmVyKTogRGF0ZSB7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IERhdGUoMCk7XG4gICAgcmVzdWx0LnNldFVUQ01pbGxpc2Vjb25kcyhNYXRoLnJvdW5kKChkYXRlIC0gMjU1NjkpICogODY0MDAgKiAxMDAwKSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDaGFuZ2UgdGhlIHRpbWV6b25lIG9mIGEgRGF0ZSBvYmplY3QgdG8gUFNULlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIC0gVGhlIERhdGUgb2JqZWN0LlxuICogQHJldHVybnMge0RhdGV9IFRoZSBEYXRlIG9iamVjdCB3aXRoIHRoZSB0aW1lem9uZSBzZXQgdG8gUFNULlxuICovXG5mdW5jdGlvbiBjaGFuZ2VfdGltZXpvbmVfdG9fcHN0KGRhdGU6IERhdGUpOiBEYXRlIHtcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgRGF0ZShkYXRlLnRvVVRDU3RyaW5nKCkucmVwbGFjZShcIiBHTVRcIiwgXCIgUFNUXCIpKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFN0cmlwIHRoZSB0aW1lIGZyb20gYSBEYXRlIG9iamVjdCwga2VlcGluZyBvbmx5IHRoZSBkYXRlLlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIC0gVGhlIERhdGUgb2JqZWN0LlxuICogQHJldHVybnMge0RhdGV9IFRoZSBEYXRlIG9iamVjdCB3aXRoIHRoZSB0aW1lIHN0cmlwcGVkLlxuICovXG5mdW5jdGlvbiBzdHJpcF9kYXRldGltZV90b19kYXRlKGRhdGU6IERhdGUpOiBEYXRlIHtcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgRGF0ZShcbiAgICAgICAgZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoXCJlbi1VU1wiLCB7IHRpbWVab25lOiBcIkFtZXJpY2EvTG9zX0FuZ2VsZXNcIiB9KVxuICAgICk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBTYW5pdGl6ZSBhIGRhdGUgYnkgY29udmVydGluZyBpdCBmcm9tIGFuIEV4Y2VsIGRhdGUgYW5kIHN0cmlwcGluZyB0aGUgdGltZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBkYXRlIC0gVGhlIEV4Y2VsIGRhdGUuXG4gKiBAcmV0dXJucyB7RGF0ZX0gVGhlIHNhbml0aXplZCBEYXRlIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gc2FuaXRpemVfZGF0ZShkYXRlOiBudW1iZXIpOiBEYXRlIHtcbiAgICBjb25zdCByZXN1bHQgPSBzdHJpcF9kYXRldGltZV90b19kYXRlKFxuICAgICAgICBjaGFuZ2VfdGltZXpvbmVfdG9fcHN0KGV4Y2VsX2RhdGVfdG9fanNfZGF0ZShkYXRlKSlcbiAgICApO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRm9ybWF0IGEgRGF0ZSBvYmplY3QgZm9yIHVzZSBpbiBhIHNwcmVhZHNoZWV0IHZhbHVlLlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIC0gVGhlIERhdGUgb2JqZWN0LlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCBkYXRlIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gZm9ybWF0X2RhdGVfZm9yX3NwcmVhZHNoZWV0X3ZhbHVlKGRhdGU6IERhdGUpOiBzdHJpbmcge1xuICAgIGNvbnN0IGRhdGVzdHIgPSBkYXRlXG4gICAgICAgIC50b0xvY2FsZURhdGVTdHJpbmcoKVxuICAgICAgICAuc3BsaXQoXCIvXCIpXG4gICAgICAgIC5tYXAoKHgpID0+IHgucGFkU3RhcnQoMiwgXCIwXCIpKVxuICAgICAgICAuam9pbihcIlwiKTtcbiAgICByZXR1cm4gZGF0ZXN0cjtcbn1cblxuLyoqXG4gKiBGaWx0ZXIgYSBsaXN0IHRvIGluY2x1ZGUgb25seSBpdGVtcyB0aGF0IGVuZCB3aXRoIGEgc3BlY2lmaWMgZGF0ZS5cbiAqIEBwYXJhbSB7YW55W119IGxpc3QgLSBUaGUgbGlzdCB0byBmaWx0ZXIuXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgLSBUaGUgZGF0ZSB0byBmaWx0ZXIgYnkuXG4gKiBAcmV0dXJucyB7YW55W119IFRoZSBmaWx0ZXJlZCBsaXN0LlxuICovXG5mdW5jdGlvbiBmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9kYXRlKGxpc3Q6IGFueVtdLCBkYXRlOiBEYXRlKTogYW55W10ge1xuICAgIGNvbnN0IGRhdGVzdHIgPSBmb3JtYXRfZGF0ZV9mb3Jfc3ByZWFkc2hlZXRfdmFsdWUoZGF0ZSk7XG4gICAgcmV0dXJuIGxpc3QubWFwKCh4KSA9PiB4Py50b1N0cmluZygpKS5maWx0ZXIoKHgpID0+IHg/LmVuZHNXaXRoKGRhdGVzdHIpKTtcbn1cblxuLyoqXG4gKiBGaWx0ZXIgYSBsaXN0IHRvIGluY2x1ZGUgb25seSBpdGVtcyB0aGF0IGVuZCB3aXRoIHRoZSBjdXJyZW50IGRhdGUuXG4gKiBAcGFyYW0ge2FueVtdfSBsaXN0IC0gVGhlIGxpc3QgdG8gZmlsdGVyLlxuICogQHJldHVybnMge2FueVtdfSBUaGUgZmlsdGVyZWQgbGlzdC5cbiAqL1xuZnVuY3Rpb24gZmlsdGVyX2xpc3RfdG9fZW5kc3dpdGhfY3VycmVudF9kYXkobGlzdDogYW55W10pOiBhbnlbXSB7XG4gICAgcmV0dXJuIGZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2RhdGUobGlzdCwgbmV3IERhdGUoKSk7XG59XG5cbmV4cG9ydCB7XG4gICAgc2FuaXRpemVfZGF0ZSxcbiAgICBleGNlbF9kYXRlX3RvX2pzX2RhdGUsXG4gICAgY2hhbmdlX3RpbWV6b25lX3RvX3BzdCxcbiAgICBzdHJpcF9kYXRldGltZV90b19kYXRlLFxuICAgIGZvcm1hdF9kYXRlX2Zvcl9zcHJlYWRzaGVldF92YWx1ZSxcbiAgICBmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9kYXRlLFxuICAgIGZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2N1cnJlbnRfZGF5LFxufTsiLCJpbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCAnQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlcyc7XG5cbi8qKlxuICogTG9hZCBjcmVkZW50aWFscyBmcm9tIGEgSlNPTiBmaWxlLlxuICogQHJldHVybnMge2FueX0gVGhlIHBhcnNlZCBjcmVkZW50aWFscyBmcm9tIHRoZSBKU09OIGZpbGUuXG4gKi9cbmZ1bmN0aW9uIGxvYWRfY3JlZGVudGlhbHNfZmlsZXMoKTogYW55IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShcbiAgICAgICAgZnNcbiAgICAgICAgICAgIC5yZWFkRmlsZVN5bmMoUnVudGltZS5nZXRBc3NldHMoKVtcIi9jcmVkZW50aWFscy5qc29uXCJdLnBhdGgpXG4gICAgICAgICAgICAudG9TdHJpbmcoKVxuICAgICk7XG59XG5cbi8qKlxuICogR2V0IHRoZSBwYXRoIHRvIHRoZSBzZXJ2aWNlIGNyZWRlbnRpYWxzIGZpbGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgcGF0aCB0byB0aGUgc2VydmljZSBjcmVkZW50aWFscyBmaWxlLlxuICovXG5mdW5jdGlvbiBnZXRfc2VydmljZV9jcmVkZW50aWFsc19wYXRoKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFJ1bnRpbWUuZ2V0QXNzZXRzKClbXCIvc2VydmljZS1jcmVkZW50aWFscy5qc29uXCJdLnBhdGg7XG59XG5cbmV4cG9ydCB7IGxvYWRfY3JlZGVudGlhbHNfZmlsZXMsIGdldF9zZXJ2aWNlX2NyZWRlbnRpYWxzX3BhdGggfTsiLCJpbXBvcnQgeyBzaGVldHNfdjQgfSBmcm9tIFwiZ29vZ2xlYXBpc1wiO1xuaW1wb3J0IHsgZXhjZWxfcm93X3RvX2luZGV4IH0gZnJvbSBcIi4vdXRpbFwiO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQgdGFiLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYiB7XG4gICAgc2hlZXRzX3NlcnZpY2U6IHNoZWV0c192NC5TaGVldHMgfCBudWxsO1xuICAgIHNoZWV0X2lkOiBzdHJpbmc7XG4gICAgc2hlZXRfbmFtZTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIuXG4gICAgICogQHBhcmFtIHtzaGVldHNfdjQuU2hlZXRzIHwgbnVsbH0gc2hlZXRzX3NlcnZpY2UgLSBUaGUgR29vZ2xlIFNoZWV0cyBBUEkgc2VydmljZSBpbnN0YW5jZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2hlZXRfaWQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNoZWV0X25hbWUgLSBUaGUgbmFtZSBvZiB0aGUgc2hlZXQgdGFiLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyB8IG51bGwsXG4gICAgICAgIHNoZWV0X2lkOiBzdHJpbmcsXG4gICAgICAgIHNoZWV0X25hbWU6IHN0cmluZ1xuICAgICkge1xuICAgICAgICB0aGlzLnNoZWV0c19zZXJ2aWNlID0gc2hlZXRzX3NlcnZpY2U7XG4gICAgICAgIHRoaXMuc2hlZXRfaWQgPSBzaGVldF9pZDtcbiAgICAgICAgdGhpcy5zaGVldF9uYW1lID0gc2hlZXRfbmFtZS5zcGxpdChcIiFcIilbMF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHZhbHVlcyBmcm9tIHRoZSBzaGVldC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bGx9IFtyYW5nZV0gLSBUaGUgcmFuZ2UgdG8gZ2V0IHZhbHVlcyBmcm9tLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueVtdW10gfCB1bmRlZmluZWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgdmFsdWVzIGZyb20gdGhlIHNoZWV0LlxuICAgICAqL1xuICAgIGFzeW5jIGdldF92YWx1ZXMocmFuZ2U/OiBzdHJpbmcgfCBudWxsKTogUHJvbWlzZTxhbnlbXVtdIHwgdW5kZWZpbmVkPiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2dldF92YWx1ZXMocmFuZ2UpO1xuICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGEudmFsdWVzID8/IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHJvdyBmb3IgYSBzcGVjaWZpYyBwYXRyb2xsZXIuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdHJvbGxlcl9uYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHBhdHJvbGxlci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZV9jb2x1bW4gLSBUaGUgY29sdW1uIHdoZXJlIHRoZSBwYXRyb2xsZXIncyBuYW1lIGlzIGxvY2F0ZWQuXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCBudWxsfSBbcmFuZ2VdIC0gVGhlIHJhbmdlIHRvIHNlYXJjaCB3aXRoaW4uXG4gICAgICogQHJldHVybnMge1Byb21pc2U8eyByb3c6IGFueVtdOyBpbmRleDogbnVtYmVyOyB9IHwgbnVsbD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSByb3cgYW5kIGluZGV4IG9mIHRoZSBwYXRyb2xsZXIsIG9yIG51bGwgaWYgbm90IGZvdW5kLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF9zaGVldF9yb3dfZm9yX3BhdHJvbGxlcihcbiAgICAgICAgcGF0cm9sbGVyX25hbWU6IHN0cmluZyxcbiAgICAgICAgbmFtZV9jb2x1bW46IHN0cmluZyxcbiAgICAgICAgcmFuZ2U/OiBzdHJpbmcgfCBudWxsXG4gICAgKTogUHJvbWlzZTx7IHJvdzogYW55W107IGluZGV4OiBudW1iZXI7IH0gfCBudWxsPiB7XG4gICAgICAgIGNvbnN0IHJvd3MgPSBhd2FpdCB0aGlzLmdldF92YWx1ZXMocmFuZ2UpO1xuICAgICAgICBpZiAocm93cykge1xuICAgICAgICAgICAgY29uc3QgbG9va3VwX2luZGV4ID0gZXhjZWxfcm93X3RvX2luZGV4KG5hbWVfY29sdW1uKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm93cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChyb3dzW2ldW2xvb2t1cF9pbmRleF0gPT09IHBhdHJvbGxlcl9uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHJvdzogcm93c1tpXSwgaW5kZXg6IGkgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgIGBDb3VsZG4ndCBmaW5kIHBhdHJvbGxlciAke3BhdHJvbGxlcl9uYW1lfSBpbiBzaGVldCAke3RoaXMuc2hlZXRfbmFtZX0uYFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdmFsdWVzIGluIHRoZSBzaGVldC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmFuZ2UgLSBUaGUgcmFuZ2UgdG8gdXBkYXRlLlxuICAgICAqIEBwYXJhbSB7YW55W11bXX0gdmFsdWVzIC0gVGhlIHZhbHVlcyB0byB1cGRhdGUuXG4gICAgICovXG4gICAgYXN5bmMgdXBkYXRlX3ZhbHVlcyhyYW5nZTogc3RyaW5nLCB2YWx1ZXM6IGFueVtdW10pIHtcbiAgICAgICAgY29uc3QgdXBkYXRlTWUgPSAoYXdhaXQgdGhpcy5fZ2V0X3ZhbHVlcyhyYW5nZSwgbnVsbCkpLmRhdGE7XG5cbiAgICAgICAgdXBkYXRlTWUudmFsdWVzID0gdmFsdWVzO1xuICAgICAgICBhd2FpdCB0aGlzLnNoZWV0c19zZXJ2aWNlIS5zcHJlYWRzaGVldHMudmFsdWVzLnVwZGF0ZSh7XG4gICAgICAgICAgICBzcHJlYWRzaGVldElkOiB0aGlzLnNoZWV0X2lkLFxuICAgICAgICAgICAgdmFsdWVJbnB1dE9wdGlvbjogXCJVU0VSX0VOVEVSRURcIixcbiAgICAgICAgICAgIHJhbmdlOiB1cGRhdGVNZS5yYW5nZSEsXG4gICAgICAgICAgICByZXF1ZXN0Qm9keTogdXBkYXRlTWUsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB2YWx1ZXMgZnJvbSB0aGUgc2hlZXQgKHByaXZhdGUgbWV0aG9kKS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bGx9IFtyYW5nZV0gLSBUaGUgcmFuZ2UgdG8gZ2V0IHZhbHVlcyBmcm9tLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbH0gW3ZhbHVlUmVuZGVyT3B0aW9uXSAtIFRoZSB2YWx1ZSByZW5kZXIgb3B0aW9uLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueVtdW10+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgdmFsdWUgcmFuZ2UuXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIGFzeW5jIF9nZXRfdmFsdWVzKFxuICAgICAgICByYW5nZT86IHN0cmluZyB8IG51bGwsXG4gICAgICAgIHZhbHVlUmVuZGVyT3B0aW9uOiBzdHJpbmcgfCBudWxsID0gXCJVTkZPUk1BVFRFRF9WQUxVRVwiXG4gICAgKSB7XG4gICAgICAgIGxldCBsb29rdXBSYW5nZSA9IHRoaXMuc2hlZXRfbmFtZTtcbiAgICAgICAgaWYgKHJhbmdlICE9IG51bGwpIHtcbiAgICAgICAgICAgIGxvb2t1cFJhbmdlID0gbG9va3VwUmFuZ2UgKyBcIiFcIjtcblxuICAgICAgICAgICAgaWYgKHJhbmdlLnN0YXJ0c1dpdGgobG9va3VwUmFuZ2UpKSB7XG4gICAgICAgICAgICAgICAgcmFuZ2UgPSByYW5nZS5zdWJzdHJpbmcobG9va3VwUmFuZ2UubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvb2t1cFJhbmdlID0gbG9va3VwUmFuZ2UgKyByYW5nZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgb3B0czogc2hlZXRzX3Y0LlBhcmFtcyRSZXNvdXJjZSRTcHJlYWRzaGVldHMkVmFsdWVzJEdldCA9IHtcbiAgICAgICAgICAgIHNwcmVhZHNoZWV0SWQ6IHRoaXMuc2hlZXRfaWQsXG4gICAgICAgICAgICByYW5nZTogbG9va3VwUmFuZ2UsXG4gICAgICAgIH07XG4gICAgICAgIGlmICh2YWx1ZVJlbmRlck9wdGlvbikge1xuICAgICAgICAgICAgb3B0cy52YWx1ZVJlbmRlck9wdGlvbiA9IHZhbHVlUmVuZGVyT3B0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuc2hlZXRzX3NlcnZpY2UhLnNwcmVhZHNoZWV0cy52YWx1ZXMuZ2V0KG9wdHMpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cbiIsIi8qKlxuICogVmFsaWRhdGVzIGlmIHRoZSBwcm92aWRlZCBzY29wZXMgaW5jbHVkZSBhbGwgZGVzaXJlZCBzY29wZXMuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBzY29wZXMgLSBUaGUgbGlzdCBvZiBzY29wZXMgdG8gdmFsaWRhdGUuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBkZXNpcmVkX3Njb3BlcyAtIFRoZSBsaXN0IG9mIGRlc2lyZWQgc2NvcGVzLlxuICogQHRocm93cyB7RXJyb3J9IFRocm93cyBhbiBlcnJvciBpZiBhbnkgZGVzaXJlZCBzY29wZSBpcyBtaXNzaW5nLlxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZV9zY29wZXMoc2NvcGVzOiBzdHJpbmdbXSwgZGVzaXJlZF9zY29wZXM6IHN0cmluZ1tdKSB7XG4gICAgZm9yIChjb25zdCBkZXNpcmVkX3Njb3BlIG9mIGRlc2lyZWRfc2NvcGVzKSB7XG4gICAgICAgIGlmIChzY29wZXMgPT09IHVuZGVmaW5lZCB8fCAhc2NvcGVzLmluY2x1ZGVzKGRlc2lyZWRfc2NvcGUpKSB7XG4gICAgICAgICAgICBjb25zdCBlcnJvciA9IGBNaXNzaW5nIHNjb3BlICR7ZGVzaXJlZF9zY29wZX0gaW4gcmVjZWl2ZWQgc2NvcGVzOiAke3Njb3Blc31gO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCB7dmFsaWRhdGVfc2NvcGVzfSIsIi8qKlxuICogQ29udmVydCByb3cgYW5kIGNvbHVtbiBudW1iZXJzIHRvIGFuIEV4Y2VsLWxpa2UgaW5kZXguXG4gKiBAcGFyYW0ge251bWJlcn0gcm93IC0gVGhlIHJvdyBudW1iZXIgKDAtYmFzZWQpLlxuICogQHBhcmFtIHtudW1iZXJ9IGNvbCAtIFRoZSBjb2x1bW4gbnVtYmVyICgwLWJhc2VkKS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBFeGNlbC1saWtlIGluZGV4IChlLmcuLCBcIkExXCIpLlxuICovXG5mdW5jdGlvbiByb3dfY29sX3RvX2V4Y2VsX2luZGV4KHJvdzogbnVtYmVyLCBjb2w6IG51bWJlcik6IHN0cmluZyB7XG4gICAgbGV0IGNvbFN0cmluZyA9IFwiXCI7XG4gICAgY29sICs9IDE7XG4gICAgd2hpbGUgKGNvbCA+IDApIHtcbiAgICAgICAgY29sIC09IDE7XG4gICAgICAgIGNvbnN0IG1vZHVsbyA9IGNvbCAlIDI2O1xuICAgICAgICBjb25zdCBjb2xMZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKCdBJy5jaGFyQ29kZUF0KDApICsgbW9kdWxvKTtcbiAgICAgICAgY29sU3RyaW5nID0gY29sTGV0dGVyICsgY29sU3RyaW5nO1xuICAgICAgICBjb2wgPSBNYXRoLmZsb29yKGNvbCAvIDI2KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbFN0cmluZyArIChyb3cgKyAxKS50b1N0cmluZygpO1xufVxuXG4vKipcbiAqIFNwbGl0IGFuIEV4Y2VsLWxpa2UgaW5kZXggaW50byByb3cgYW5kIGNvbHVtbiBudW1iZXJzLlxuICogQHBhcmFtIHtzdHJpbmd9IGV4Y2VsX2luZGV4IC0gVGhlIEV4Y2VsLWxpa2UgaW5kZXggKGUuZy4sIFwiQTFcIikuXG4gKiBAcmV0dXJucyB7W251bWJlciwgbnVtYmVyXX0gQW4gYXJyYXkgY29udGFpbmluZyB0aGUgcm93IGFuZCBjb2x1bW4gbnVtYmVycyAoMC1iYXNlZCkuXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIGluZGV4IGNhbm5vdCBiZSBwYXJzZWQuXG4gKi9cbmZ1bmN0aW9uIHNwbGl0X3RvX3Jvd19jb2woZXhjZWxfaW5kZXg6IHN0cmluZyk6IFtudW1iZXIsIG51bWJlcl0ge1xuICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cChcIl4oW0EtWmEtel0rKShbMC05XSspJFwiKTtcbiAgICBjb25zdCBtYXRjaCA9IHJlZ2V4LmV4ZWMoZXhjZWxfaW5kZXgpO1xuICAgIGlmIChtYXRjaCA9PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBwYXJzZSBzdHJpbmcgZm9yIGV4Y2VsIHBvc2l0aW9uIHNwbGl0XCIpO1xuICAgIH1cbiAgICBjb25zdCBjb2wgPSBleGNlbF9yb3dfdG9faW5kZXgobWF0Y2hbMV0pO1xuICAgIGNvbnN0IHJhd19yb3cgPSBOdW1iZXIobWF0Y2hbMl0pO1xuICAgIGlmIChyYXdfcm93IDwgMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJSb3cgbXVzdCBiZSA+PTFcIik7XG4gICAgfVxuICAgIHJldHVybiBbcmF3X3JvdyAtIDEsIGNvbF07XG59XG5cbi8qKlxuICogTG9vayB1cCBhIHZhbHVlIGluIGEgc2hlZXQgYnkgaXRzIEV4Y2VsLWxpa2UgaW5kZXguXG4gKiBAcGFyYW0ge3N0cmluZ30gZXhjZWxfaW5kZXggLSBUaGUgRXhjZWwtbGlrZSBpbmRleCAoZS5nLiwgXCJBMVwiKS5cbiAqIEBwYXJhbSB7YW55W11bXX0gc2hlZXQgLSBUaGUgc2hlZXQgZGF0YS5cbiAqIEByZXR1cm5zIHthbnl9IFRoZSB2YWx1ZSBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LCBvciB1bmRlZmluZWQgaWYgbm90IGZvdW5kLlxuICovXG5mdW5jdGlvbiBsb29rdXBfcm93X2NvbF9pbl9zaGVldChleGNlbF9pbmRleDogc3RyaW5nLCBzaGVldDogYW55W11bXSk6IGFueSB7XG4gICAgY29uc3QgW3JvdywgY29sXSA9IHNwbGl0X3RvX3Jvd19jb2woZXhjZWxfaW5kZXgpO1xuICAgIGlmIChyb3cgPj0gc2hlZXQubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiBzaGVldFtyb3ddW2NvbF07XG59XG5cbi8qKlxuICogQ29udmVydCBFeGNlbC1saWtlIGNvbHVtbiBsZXR0ZXJzIHRvIGEgY29sdW1uIG51bWJlci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBsZXR0ZXJzIC0gVGhlIGNvbHVtbiBsZXR0ZXJzIChlLmcuLCBcIkFcIikuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgY29sdW1uIG51bWJlciAoMC1iYXNlZCkuXG4gKi9cbmZ1bmN0aW9uIGV4Y2VsX3Jvd190b19pbmRleChsZXR0ZXJzOiBzdHJpbmcpOiBudW1iZXIge1xuICAgIGNvbnN0IGxvd2VyTGV0dGVycyA9IGxldHRlcnMudG9Mb3dlckNhc2UoKTtcbiAgICBsZXQgcmVzdWx0OiBudW1iZXIgPSAwO1xuICAgIGZvciAodmFyIHAgPSAwOyBwIDwgbG93ZXJMZXR0ZXJzLmxlbmd0aDsgcCsrKSB7XG4gICAgICAgIGNvbnN0IGNoYXJhY3RlclZhbHVlID1cbiAgICAgICAgICAgIGxvd2VyTGV0dGVycy5jaGFyQ29kZUF0KHApIC0gXCJhXCIuY2hhckNvZGVBdCgwKSArIDE7XG4gICAgICAgIHJlc3VsdCA9IGNoYXJhY3RlclZhbHVlICsgcmVzdWx0ICogMjY7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQgLSAxO1xufVxuXG4vKipcbiAqIFNhbml0aXplIGEgcGhvbmUgbnVtYmVyIGJ5IHJlbW92aW5nIHVud2FudGVkIGNoYXJhY3RlcnMuXG4gKiBAcGFyYW0ge251bWJlciB8IHN0cmluZ30gbnVtYmVyIC0gVGhlIHBob25lIG51bWJlciB0byBzYW5pdGl6ZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBzYW5pdGl6ZWQgcGhvbmUgbnVtYmVyLlxuICovXG5mdW5jdGlvbiBzYW5pdGl6ZV9waG9uZV9udW1iZXIobnVtYmVyOiBudW1iZXIgfCBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGxldCBuZXdfbnVtYmVyID0gbnVtYmVyLnRvU3RyaW5nKCk7XG4gICAgbmV3X251bWJlciA9IG5ld19udW1iZXIucmVwbGFjZShcIndoYXRzYXBwOlwiLCBcIlwiKTtcbiAgICBsZXQgdGVtcG9yYXJ5X25ld19udW1iZXI6IHN0cmluZyA9IFwiXCI7XG4gICAgd2hpbGUgKHRlbXBvcmFyeV9uZXdfbnVtYmVyICE9IG5ld19udW1iZXIpIHtcbiAgICAgICAgLy8gRG8gdGhpcyBtdWx0aXBsZSB0aW1lcyBzbyB3ZSBnZXQgYWxsICsxIGF0IHRoZSBzdGFydCBvZiB0aGUgc3RyaW5nLCBldmVuIGFmdGVyIHN0cmlwcGluZy5cbiAgICAgICAgdGVtcG9yYXJ5X25ld19udW1iZXIgPSBuZXdfbnVtYmVyO1xuICAgICAgICBuZXdfbnVtYmVyID0gbmV3X251bWJlci5yZXBsYWNlKC8oXlxcKzF8XFwofFxcKXxcXC58LSkvZywgXCJcIik7XG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdCA9IFN0cmluZyhwYXJzZUludChuZXdfbnVtYmVyKSkucGFkU3RhcnQoMTAsIFwiMFwiKTtcbiAgICBpZiAocmVzdWx0Lmxlbmd0aCA9PSAxMSAmJiByZXN1bHRbMF0gPT0gXCIxXCIpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5zdWJzdHJpbmcoMSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCB7XG4gICAgcm93X2NvbF90b19leGNlbF9pbmRleCxcbiAgICBleGNlbF9yb3dfdG9faW5kZXgsXG4gICAgc2FuaXRpemVfcGhvbmVfbnVtYmVyLFxuICAgIHNwbGl0X3RvX3Jvd19jb2wsXG4gICAgbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQsXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJnb29nbGVhcGlzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9oYW5kbGVycy9oYW5kbGVyLnByb3RlY3RlZC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==