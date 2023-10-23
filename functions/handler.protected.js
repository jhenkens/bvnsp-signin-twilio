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
        this.checkin_values = new checkin_values_1.CheckinValues(this.config.CHECKIN_VALUES);
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
                response = `Based on your checkin for today, you have up to ${this.available_today} comp passes you can use today. You have currently used ${this.used}. Enter the number you would like to use:`;
            }
            else if (this.comp_pass_type == comp_passes_1.CompPassType.ManagerPass) {
                response = `Based on your days this and last season, you currently have ${this.available_today} manager passes you can use today. You have currently used ${this.used} today. Enter the number you would like to use:`;
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
class LoginSheet {
    constructor(sheets_service, config) {
        this.rows = null;
        this.checkin_count = undefined;
        this.allowed_categories = ["DR", "P", "C"];
        this.patrollers = [];
        this.login_sheet = new google_sheets_spreadsheet_tab_1.default(sheets_service, config.SHEET_ID, config.LOGIN_SHEET_LOOKUP);
        this.checkin_count_sheet = new google_sheets_spreadsheet_tab_1.default(sheets_service, config.SHEET_ID, config.CHECKIN_COUNT_LOOKUP);
        this.config = config;
    }
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            this.rows = yield this.login_sheet.get_values(this.config.LOGIN_SHEET_LOOKUP);
            this.checkin_count = (yield this.checkin_count_sheet.get_values(this.config.CHECKIN_COUNT_LOOKUP))[0][0];
            this.patrollers = this.rows.map((x, i) => this.parse_patroller_row(i, x, this.config)).filter((x) => x != null);
        });
    }
    get archived() {
        const archived = (0, util_1.lookup_row_col_in_sheet)(this.config.ARCHIVED_CELL, this.rows);
        return ((archived === undefined && this.checkin_count === 0) ||
            archived.toLowerCase() === "yes");
    }
    get sheet_date() {
        return (0, datetime_util_1.sanitize_date)((0, util_1.lookup_row_col_in_sheet)(this.config.SHEET_DATE_CELL, this.rows));
    }
    get current_date() {
        return (0, datetime_util_1.sanitize_date)((0, util_1.lookup_row_col_in_sheet)(this.config.CURRENT_DATE_CELL, this.rows));
    }
    get is_current() {
        return this.sheet_date.getTime() === this.current_date.getTime();
    }
    try_find_patroller(name) {
        const patrollers = this.patrollers.filter((x) => x.name === name);
        if (patrollers.length !== 1) {
            return "not_found";
        }
        return patrollers[0];
    }
    find_patroller(name) {
        const result = this.try_find_patroller(name);
        if (result === "not_found") {
            throw new Error(`Could not find ${name} in login sheet`);
        }
        return result;
    }
    get_on_duty_patrollers() {
        if (!this.is_current) {
            throw new Error("Login sheet is not current");
        }
        return this.patrollers.filter((x) => x.checkin);
    }
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
    parse_patroller_row(index, row, opts) {
        if (row.length < 2) {
            return null;
        }
        const potentialCategory = String(row[1]);
        if (!this.allowed_categories.includes(potentialCategory.toUpperCase())) {
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
class SeasonSheet {
    constructor(sheets_service, config) {
        this.sheet = new google_sheets_spreadsheet_tab_1.default(sheets_service, config.SHEET_ID, config.SEASON_SHEET);
        this.config = config;
    }
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
class UserCreds {
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
    get token_key() {
        return `oauth2_${this.number}`;
    }
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
class CheckinValue {
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
class CheckinValues {
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
    entries() {
        return Object.entries(this.by_key);
    }
    parse_fast_checkin(body) {
        return this.by_fc[body];
    }
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
var CompPassType;
(function (CompPassType) {
    CompPassType["CompPass"] = "comp-pass";
    CompPassType["ManagerPass"] = "manager-pass";
})(CompPassType || (exports.CompPassType = CompPassType = {}));
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
function excel_date_to_js_date(date) {
    const result = new Date(0);
    result.setUTCMilliseconds(Math.round((date - 25569) * 86400 * 1000));
    return result;
}
exports.excel_date_to_js_date = excel_date_to_js_date;
function change_timezone_to_pst(date) {
    const result = new Date(date.toUTCString().replace(" GMT", " PST"));
    return result;
}
exports.change_timezone_to_pst = change_timezone_to_pst;
function strip_datetime_to_date(date) {
    const result = new Date(date.toLocaleDateString("en-US", { timeZone: "America/Los_Angeles" }));
    return result;
}
exports.strip_datetime_to_date = strip_datetime_to_date;
function sanitize_date(date) {
    const result = strip_datetime_to_date(change_timezone_to_pst(excel_date_to_js_date(date)));
    return result;
}
exports.sanitize_date = sanitize_date;
function format_date_for_spreadsheet_value(date) {
    const datestr = date
        .toLocaleDateString()
        .split("/")
        .map((x) => x.padStart(2, "0"))
        .join("");
    return datestr;
}
exports.format_date_for_spreadsheet_value = format_date_for_spreadsheet_value;
function filter_list_to_endswith_date(list, date) {
    const datestr = format_date_for_spreadsheet_value(date);
    return list.map((x) => x === null || x === void 0 ? void 0 : x.toString()).filter((x) => x === null || x === void 0 ? void 0 : x.endsWith(datestr));
}
exports.filter_list_to_endswith_date = filter_list_to_endswith_date;
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
function load_credentials_files() {
    return JSON.parse(fs
        .readFileSync(Runtime.getAssets()["/credentials.json"].path)
        .toString());
}
exports.load_credentials_files = load_credentials_files;
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
class GoogleSheetsSpreadsheetTab {
    constructor(sheets_service, sheet_id, sheet_name) {
        this.sheets_service = sheets_service;
        this.sheet_id = sheet_id;
        this.sheet_name = sheet_name.split("!")[0];
    }
    get_values(range) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._get_values(range);
            return (_a = result.data.values) !== null && _a !== void 0 ? _a : undefined;
        });
    }
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
function lookup_row_col_in_sheet(excel_index, sheet) {
    const [row, col] = split_to_row_col(excel_index);
    if (row >= sheet.length) {
        return undefined;
    }
    return sheet[row][col];
}
exports.lookup_row_col_in_sheet = lookup_row_col_in_sheet;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TSxvQkFBb0IsSUFBSSxVQUFVLEVBQUM7UUFDckMsNEZBQTRGO1FBQzVGLG9CQUFvQixHQUFHLFVBQVUsQ0FBQztRQUNsQyxVQUFVLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUM3RDtJQUNELE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdELElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxFQUFFLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFBQztRQUN4QyxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDOUI7SUFDRCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBTUcsc0RBQXFCOzs7Ozs7Ozs7OztBQ2xFekI7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyIvVXNlcnMvam9oYW5oZW5rZW5zL1JlcG9zaXRvcmllcy9wZXJzb25hbF9wcm9qZWN0cy9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9lbnYvaGFuZGxlcl9jb25maWcudHMiLCIvVXNlcnMvam9oYW5oZW5rZW5zL1JlcG9zaXRvcmllcy9wZXJzb25hbF9wcm9qZWN0cy9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9oYW5kbGVycy9idm5zcF9jaGVja2luX2hhbmRsZXIudHMiLCIvVXNlcnMvam9oYW5oZW5rZW5zL1JlcG9zaXRvcmllcy9wZXJzb25hbF9wcm9qZWN0cy9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9oYW5kbGVycy9oYW5kbGVyLnByb3RlY3RlZC50cyIsIi9Vc2Vycy9qb2hhbmhlbmtlbnMvUmVwb3NpdG9yaWVzL3BlcnNvbmFsX3Byb2plY3RzL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3NoZWV0cy9jb21wX3Bhc3Nfc2hlZXQudHMiLCIvVXNlcnMvam9oYW5oZW5rZW5zL1JlcG9zaXRvcmllcy9wZXJzb25hbF9wcm9qZWN0cy9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9zaGVldHMvbG9naW5fc2hlZXQudHMiLCIvVXNlcnMvam9oYW5oZW5rZW5zL1JlcG9zaXRvcmllcy9wZXJzb25hbF9wcm9qZWN0cy9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9zaGVldHMvc2Vhc29uX3NoZWV0LnRzIiwiL1VzZXJzL2pvaGFuaGVua2Vucy9SZXBvc2l0b3JpZXMvcGVyc29uYWxfcHJvamVjdHMvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXNlci1jcmVkcy50cyIsIi9Vc2Vycy9qb2hhbmhlbmtlbnMvUmVwb3NpdG9yaWVzL3BlcnNvbmFsX3Byb2plY3RzL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3V0aWxzL2NoZWNraW5fdmFsdWVzLnRzIiwiL1VzZXJzL2pvaGFuaGVua2Vucy9SZXBvc2l0b3JpZXMvcGVyc29uYWxfcHJvamVjdHMvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvY29tcF9wYXNzZXMudHMiLCIvVXNlcnMvam9oYW5oZW5rZW5zL1JlcG9zaXRvcmllcy9wZXJzb25hbF9wcm9qZWN0cy9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91dGlscy9kYXRldGltZV91dGlsLnRzIiwiL1VzZXJzL2pvaGFuaGVua2Vucy9SZXBvc2l0b3JpZXMvcGVyc29uYWxfcHJvamVjdHMvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvZmlsZV91dGlscy50cyIsIi9Vc2Vycy9qb2hhbmhlbmtlbnMvUmVwb3NpdG9yaWVzL3BlcnNvbmFsX3Byb2plY3RzL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3V0aWxzL2dvb2dsZV9zaGVldHNfc3ByZWFkc2hlZXRfdGFiLnRzIiwiL1VzZXJzL2pvaGFuaGVua2Vucy9SZXBvc2l0b3JpZXMvcGVyc29uYWxfcHJvamVjdHMvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvc2NvcGVfdXRpbC50cyIsIi9Vc2Vycy9qb2hhbmhlbmtlbnMvUmVwb3NpdG9yaWVzL3BlcnNvbmFsX3Byb2plY3RzL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3V0aWxzL3V0aWwudHMiLCJleHRlcm5hbCBjb21tb25qcyBcIkB0d2lsaW8tbGFicy9zZXJ2ZXJsZXNzLXJ1bnRpbWUtdHlwZXNcIiIsImV4dGVybmFsIGNvbW1vbmpzIFwiZ29vZ2xlYXBpc1wiIiwiZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImZzXCIiLCJ3ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hlY2tpblZhbHVlIH0gZnJvbSBcIi4uL3V0aWxzL2NoZWNraW5fdmFsdWVzXCI7XG5cbi8vIFRoZXNlIGFyZSB0aGUgb25seSBzZWNyZXQgdmFsdWVzIHdlIG5lZWQgdG8gcmVhZC4gUmVzdCBjYW4gYmUgZGVwbG95ZWQuXG50eXBlIEhhbmRsZXJFbnZpcm9ubWVudCA9IHtcbiAgICBTSEVFVF9JRDogc3RyaW5nO1xuICAgIFNDUklQVF9JRDogc3RyaW5nO1xuICAgIFNZTkNfU0lEOiBzdHJpbmc7XG59O1xuXG50eXBlIFVzZXJDcmVkc0NvbmZpZyA9IHtcbiAgICBOU1BfRU1BSUxfRE9NQUlOOiBzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsO1xufTtcbmNvbnN0IHVzZXJfY3JlZHNfY29uZmlnOiBVc2VyQ3JlZHNDb25maWcgPSB7XG4gICAgTlNQX0VNQUlMX0RPTUFJTjogXCJmYXJ3ZXN0Lm9yZ1wiLFxufTtcblxudHlwZSBGaW5kUGF0cm9sbGVyQ29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBzdHJpbmc7XG4gICAgUEhPTkVfTlVNQkVSX0xPT0tVUF9TSEVFVDogc3RyaW5nO1xuICAgIFBIT05FX05VTUJFUl9OVU1CRVJfQ09MVU1OOiBzdHJpbmc7XG4gICAgUEhPTkVfTlVNQkVSX05BTUVfQ09MVU1OOiBzdHJpbmc7XG59O1xuXG5jb25zdCBmaW5kX3BhdHJvbGxlcl9jb25maWc6IEZpbmRQYXRyb2xsZXJDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IFwidGVzdFwiLFxuICAgIFBIT05FX05VTUJFUl9MT09LVVBfU0hFRVQ6IFwiUGhvbmUgTnVtYmVycyFBMjpCMTAwXCIsXG4gICAgUEhPTkVfTlVNQkVSX05BTUVfQ09MVU1OOiBcIkFcIixcbiAgICBQSE9ORV9OVU1CRVJfTlVNQkVSX0NPTFVNTjogXCJCXCIsXG59O1xudHlwZSBMb2dpblNoZWV0Q29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBzdHJpbmc7XG5cbiAgICBMT0dJTl9TSEVFVF9MT09LVVA6IHN0cmluZztcbiAgICBDSEVDS0lOX0NPVU5UX0xPT0tVUDogc3RyaW5nO1xuXG4gICAgQVJDSElWRURfQ0VMTDogc3RyaW5nO1xuICAgIFNIRUVUX0RBVEVfQ0VMTDogc3RyaW5nO1xuICAgIENVUlJFTlRfREFURV9DRUxMOiBzdHJpbmc7XG4gICAgTkFNRV9DT0xVTU46IHN0cmluZztcbiAgICBDQVRFR09SWV9DT0xVTU46IHN0cmluZztcbiAgICBTRUNUSU9OX0RST1BET1dOX0NPTFVNTjogc3RyaW5nO1xuICAgIENIRUNLSU5fRFJPUERPV05fQ09MVU1OOiBzdHJpbmc7XG59O1xuXG5jb25zdCBsb2dpbl9zaGVldF9jb25maWc6IExvZ2luU2hlZXRDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IFwidGVzdFwiLFxuXG4gICAgTE9HSU5fU0hFRVRfTE9PS1VQOiBcIkxvZ2luIUExOloxMDBcIixcbiAgICBDSEVDS0lOX0NPVU5UX0xPT0tVUDogXCJUb29scyFHMjpHMlwiLFxuXG4gICAgU0hFRVRfREFURV9DRUxMOiBcIkIxXCIsXG4gICAgQ1VSUkVOVF9EQVRFX0NFTEw6IFwiQjJcIixcbiAgICBBUkNISVZFRF9DRUxMOiBcIkgxXCIsXG4gICAgTkFNRV9DT0xVTU46IFwiQVwiLFxuICAgIENBVEVHT1JZX0NPTFVNTjogXCJCXCIsXG4gICAgU0VDVElPTl9EUk9QRE9XTl9DT0xVTU46IFwiSFwiLFxuICAgIENIRUNLSU5fRFJPUERPV05fQ09MVU1OOiBcIklcIixcblxufTtcblxudHlwZSBTZWFzb25TaGVldENvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogc3RyaW5nO1xuICAgIFNFQVNPTl9TSEVFVDogc3RyaW5nO1xuICAgIFNFQVNPTl9TSEVFVF9EQVlTX0NPTFVNTjogc3RyaW5nO1xuICAgIFNFQVNPTl9TSEVFVF9OQU1FX0NPTFVNTjogc3RyaW5nO1xufTtcbmNvbnN0IHNlYXNvbl9zaGVldF9jb25maWc6IFNlYXNvblNoZWV0Q29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBcInRlc3RcIixcblxuICAgIFNFQVNPTl9TSEVFVDogXCJTZWFzb25cIixcbiAgICBTRUFTT05fU0hFRVRfTkFNRV9DT0xVTU46IFwiQlwiLFxuICAgIFNFQVNPTl9TSEVFVF9EQVlTX0NPTFVNTjogXCJBXCIsXG59O1xuXG50eXBlIENvbXBQYXNzZXNDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICBDT01QX1BBU1NfU0hFRVQ6IHN0cmluZztcbiAgICBDT01QX1BBU1NfU0hFRVRfREFURVNfQVZBSUxBQkxFX0NPTFVNTjogc3RyaW5nO1xuICAgIENPTVBfUEFTU19TSEVFVF9EQVRFU19VU0VEX1RPREFZX0NPTFVNTjogc3RyaW5nO1xuICAgIENPTVBfUEFTU19TSEVFVF9EQVRFU19TVEFSVElOR19DT0xVTU46IHN0cmluZztcbiAgICBDT01QX1BBU1NfU0hFRVRfTkFNRV9DT0xVTU46IHN0cmluZztcbn07XG5jb25zdCBjb21wX3Bhc3Nlc19jb25maWc6IENvbXBQYXNzZXNDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IFwidGVzdFwiLFxuXG4gICAgQ09NUF9QQVNTX1NIRUVUOiBcIkNvbXBzXCIsXG4gICAgQ09NUF9QQVNTX1NIRUVUX05BTUVfQ09MVU1OOiBcIkFcIixcbiAgICBDT01QX1BBU1NfU0hFRVRfREFURVNfQVZBSUxBQkxFX0NPTFVNTjogXCJEXCIsXG4gICAgQ09NUF9QQVNTX1NIRUVUX0RBVEVTX1VTRURfVE9EQVlfQ09MVU1OOiBcIkVcIixcbiAgICBDT01QX1BBU1NfU0hFRVRfREFURVNfU1RBUlRJTkdfQ09MVU1OOiBcIkdcIixcbn07XG5cbnR5cGUgTWFuYWdlclBhc3Nlc0NvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogc3RyaW5nO1xuICAgIE1BTkFHRVJfUEFTU19TSEVFVDogc3RyaW5nO1xuICAgIE1BTkFHRVJfUEFTU19TSEVFVF9BVkFJQUJMRV9DT0xVTU46IHN0cmluZztcbiAgICBNQU5BR0VSX1BBU1NfU0hFRVRfVVNFRF9UT0RBWV9DT0xVTU46IHN0cmluZztcbiAgICBNQU5BR0VSX1BBU1NfU0hFRVRfREFURVNfU1RBUlRJTkdfQ09MVU1OOiBzdHJpbmc7XG4gICAgTUFOQUdFUl9QQVNTX1NIRUVUX05BTUVfQ09MVU1OOiBzdHJpbmc7XG59O1xuY29uc3QgbWFuYWdlcl9wYXNzZXNfY29uZmlnOiBNYW5hZ2VyUGFzc2VzQ29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBcInRlc3RcIixcblxuICAgIE1BTkFHRVJfUEFTU19TSEVFVDogXCJNYW5hZ2Vyc1wiLFxuICAgIE1BTkFHRVJfUEFTU19TSEVFVF9OQU1FX0NPTFVNTjogXCJBXCIsXG4gICAgTUFOQUdFUl9QQVNTX1NIRUVUX0FWQUlBQkxFX0NPTFVNTjogXCJHXCIsXG4gICAgTUFOQUdFUl9QQVNTX1NIRUVUX1VTRURfVE9EQVlfQ09MVU1OOiBcIkNcIixcbiAgICBNQU5BR0VSX1BBU1NfU0hFRVRfREFURVNfU1RBUlRJTkdfQ09MVU1OOiBcIkhcIixcbn07XG5cbnR5cGUgSGFuZGxlckNvbmZpZyA9IHtcbiAgICBTQ1JJUFRfSUQ6IHN0cmluZztcbiAgICBTSEVFVF9JRDogc3RyaW5nO1xuICAgIFNZTkNfU0lEOiBzdHJpbmc7XG5cbiAgICBSRVNFVF9GVU5DVElPTl9OQU1FOiBzdHJpbmc7XG4gICAgQVJDSElWRV9GVU5DVElPTl9OQU1FOiBzdHJpbmc7XG5cbiAgICBVU0VfU0VSVklDRV9BQ0NPVU5UOiBib29sZWFuO1xuICAgIEFDSVRPTl9MT0dfU0hFRVQ6IHN0cmluZztcblxuICAgIENIRUNLSU5fVkFMVUVTOiBDaGVja2luVmFsdWVbXTtcbn07XG5jb25zdCBoYW5kbGVyX2NvbmZpZzogSGFuZGxlckNvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogXCJ0ZXN0XCIsXG4gICAgU0NSSVBUX0lEOiBcInRlc3RcIixcbiAgICBTWU5DX1NJRDogXCJ0ZXN0XCIsXG5cbiAgICBBUkNISVZFX0ZVTkNUSU9OX05BTUU6IFwiQXJjaGl2ZVwiLFxuICAgIFJFU0VUX0ZVTkNUSU9OX05BTUU6IFwiUmVzZXRcIixcblxuICAgIFVTRV9TRVJWSUNFX0FDQ09VTlQ6IHRydWUsXG4gICAgQUNJVE9OX0xPR19TSEVFVDogXCJCb3RfVXNhZ2VcIixcblxuICAgIENIRUNLSU5fVkFMVUVTOiBbXG4gICAgICAgIG5ldyBDaGVja2luVmFsdWUoXCJkYXlcIiwgXCJBbGwgRGF5XCIsIFwiYWxsIGRheS9EQVlcIiwgW1wiY2hlY2tpbi1kYXlcIl0pLFxuICAgICAgICBuZXcgQ2hlY2tpblZhbHVlKFwiYW1cIiwgXCJIYWxmIEFNXCIsIFwibW9ybmluZy9BTVwiLCBbXCJjaGVja2luLWFtXCJdKSxcbiAgICAgICAgbmV3IENoZWNraW5WYWx1ZShcInBtXCIsIFwiSGFsZiBQTVwiLCBcImFmdGVybm9vbi9QTVwiLCBbXCJjaGVja2luLXBtXCJdKSxcbiAgICAgICAgbmV3IENoZWNraW5WYWx1ZShcIm91dFwiLCBcIkNoZWNrZWQgT3V0XCIsIFwiY2hlY2sgb3V0L09VVFwiLCBbXCJjaGVja291dFwiLCBcImNoZWNrLW91dFwiXSksXG4gICAgXSxcbn07XG5cblxudHlwZSBQYXRyb2xsZXJSb3dDb25maWcgPSB7XG4gICAgTkFNRV9DT0xVTU46IHN0cmluZztcbiAgICBDQVRFR09SWV9DT0xVTU46IHN0cmluZztcbiAgICBTRUNUSU9OX0RST1BET1dOX0NPTFVNTjogc3RyaW5nO1xuICAgIENIRUNLSU5fRFJPUERPV05fQ09MVU1OOiBzdHJpbmc7XG59O1xuXG50eXBlIENvbWJpbmVkQ29uZmlnID0gSGFuZGxlckVudmlyb25tZW50ICZcbiAgICBVc2VyQ3JlZHNDb25maWcgJlxuICAgIEZpbmRQYXRyb2xsZXJDb25maWcgJlxuICAgIExvZ2luU2hlZXRDb25maWcgJlxuICAgIFNlYXNvblNoZWV0Q29uZmlnICZcbiAgICBDb21wUGFzc2VzQ29uZmlnICZcbiAgICBNYW5hZ2VyUGFzc2VzQ29uZmlnICZcbiAgICBIYW5kbGVyQ29uZmlnICZcbiAgICBQYXRyb2xsZXJSb3dDb25maWc7XG5cbmNvbnN0IENPTkZJRzogQ29tYmluZWRDb25maWcgPSB7XG4gICAgLi4uaGFuZGxlcl9jb25maWcsXG4gICAgLi4uZmluZF9wYXRyb2xsZXJfY29uZmlnLFxuICAgIC4uLmxvZ2luX3NoZWV0X2NvbmZpZyxcbiAgICAuLi5jb21wX3Bhc3Nlc19jb25maWcsXG4gICAgLi4ubWFuYWdlcl9wYXNzZXNfY29uZmlnLFxuICAgIC4uLnNlYXNvbl9zaGVldF9jb25maWcsXG4gICAgLi4udXNlcl9jcmVkc19jb25maWcsXG59O1xuXG5leHBvcnQge1xuICAgIENPTkZJRyxcbiAgICBDb21iaW5lZENvbmZpZyxcbiAgICBDb21wUGFzc2VzQ29uZmlnLFxuICAgIEZpbmRQYXRyb2xsZXJDb25maWcsXG4gICAgSGFuZGxlckNvbmZpZyxcbiAgICBIYW5kbGVyRW52aXJvbm1lbnQsXG4gICAgTWFuYWdlclBhc3Nlc0NvbmZpZyxcbiAgICBVc2VyQ3JlZHNDb25maWcsXG4gICAgTG9naW5TaGVldENvbmZpZyxcbiAgICBTZWFzb25TaGVldENvbmZpZyxcbiAgICBQYXRyb2xsZXJSb3dDb25maWcsXG59O1xuIiwiaW1wb3J0IFwiQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlc1wiO1xuaW1wb3J0IHtcbiAgICBDb250ZXh0LFxuICAgIFNlcnZlcmxlc3NFdmVudE9iamVjdCxcbiAgICBTZXJ2aWNlQ29udGV4dCxcbiAgICBUd2lsaW9DbGllbnQsXG59IGZyb20gXCJAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzL3R5cGVzXCI7XG5pbXBvcnQgeyBnb29nbGUsIHNjcmlwdF92MSwgc2hlZXRzX3Y0IH0gZnJvbSBcImdvb2dsZWFwaXNcIjtcbmltcG9ydCB7IEdvb2dsZUF1dGggfSBmcm9tIFwiZ29vZ2xlYXBpcy1jb21tb25cIjtcbmltcG9ydCB7XG4gICAgQ09ORklHLFxuICAgIENvbWJpbmVkQ29uZmlnLFxuICAgIENvbXBQYXNzZXNDb25maWcsXG4gICAgRmluZFBhdHJvbGxlckNvbmZpZyxcbiAgICBIYW5kbGVyQ29uZmlnLFxuICAgIEhhbmRsZXJFbnZpcm9ubWVudCxcbiAgICBMb2dpblNoZWV0Q29uZmlnLFxuICAgIE1hbmFnZXJQYXNzZXNDb25maWcsXG4gICAgU2Vhc29uU2hlZXRDb25maWcsXG59IGZyb20gXCIuLi9lbnYvaGFuZGxlcl9jb25maWdcIjtcbmltcG9ydCBMb2dpblNoZWV0LCB7IFBhdHJvbGxlclJvdyB9IGZyb20gXCIuLi9zaGVldHMvbG9naW5fc2hlZXRcIjtcbmltcG9ydCBTZWFzb25TaGVldCBmcm9tIFwiLi4vc2hlZXRzL3NlYXNvbl9zaGVldFwiO1xuaW1wb3J0IHsgVXNlckNyZWRzIH0gZnJvbSBcIi4uL3VzZXItY3JlZHNcIjtcbmltcG9ydCB7IENoZWNraW5WYWx1ZXMgfSBmcm9tIFwiLi4vdXRpbHMvY2hlY2tpbl92YWx1ZXNcIjtcbmltcG9ydCB7IGdldF9zZXJ2aWNlX2NyZWRlbnRpYWxzX3BhdGggfSBmcm9tIFwiLi4vdXRpbHMvZmlsZV91dGlsc1wiO1xuaW1wb3J0IHsgZXhjZWxfcm93X3RvX2luZGV4LCBzYW5pdGl6ZV9waG9uZV9udW1iZXIgfSBmcm9tIFwiLi4vdXRpbHMvdXRpbFwiO1xuaW1wb3J0IHsgQ29tcFBhc3NUeXBlLCBnZXRfY29tcF9wYXNzX2Rlc2NyaXB0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2NvbXBfcGFzc2VzXCI7XG5pbXBvcnQge1xuICAgIENvbXBQYXNzU2hlZXQsXG4gICAgTWFuYWdlclBhc3NTaGVldCxcbiAgICBQYXNzU2hlZXQsXG59IGZyb20gXCIuLi9zaGVldHMvY29tcF9wYXNzX3NoZWV0XCI7XG5cbmV4cG9ydCB0eXBlIEJWTlNQQ2hlY2tpblJlc3BvbnNlID0ge1xuICAgIHJlc3BvbnNlPzogc3RyaW5nO1xuICAgIG5leHRfc3RlcD86IHN0cmluZztcbn07XG5leHBvcnQgdHlwZSBIYW5kbGVyRXZlbnQgPSBTZXJ2ZXJsZXNzRXZlbnRPYmplY3Q8XG4gICAge1xuICAgICAgICBGcm9tOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgICAgIFRvOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgICAgIG51bWJlcjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgICB0ZXN0X251bWJlcjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgICBCb2R5OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgfSxcbiAgICB7fSxcbiAgICB7XG4gICAgICAgIGJ2bnNwX2NoZWNraW5fbmV4dF9zdGVwOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgfVxuPjtcblxuZXhwb3J0IGNvbnN0IE5FWFRfU1RFUFMgPSB7XG4gICAgQVdBSVRfQ09NTUFORDogXCJhd2FpdC1jb21tYW5kXCIsXG4gICAgQVdBSVRfQ0hFQ0tJTjogXCJhd2FpdC1jaGVja2luXCIsXG4gICAgQ09ORklSTV9SRVNFVDogXCJjb25maXJtLXJlc2V0XCIsXG4gICAgQVVUSF9SRVNFVDogXCJhdXRoLXJlc2V0XCIsXG4gICAgQVdBSVRfUEFTUzogXCJhd2FpdC1wYXNzXCIsXG59O1xuXG5jb25zdCBDT01NQU5EUyA9IHtcbiAgICBPTl9EVVRZOiBbXCJvbmR1dHlcIiwgXCJvbi1kdXR5XCJdLFxuICAgIFNUQVRVUzogW1wic3RhdHVzXCJdLFxuICAgIENIRUNLSU46IFtcImNoZWNraW5cIiwgXCJjaGVjay1pblwiXSxcbiAgICBDT01QX1BBU1M6IFtcImNvbXAtcGFzc1wiLCBcImNvbXBwYXNzXCJdLFxuICAgIE1BTkFHRVJfUEFTUzogW1wibWFuYWdlci1wYXNzXCIsIFwibWFuYWdlcnBhc3NcIl0sXG4gICAgV0hBVFNBUFA6IFtcIndoYXRzYXBwXCJdLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQlZOU1BDaGVja2luSGFuZGxlciB7XG4gICAgU0NPUEVTOiBzdHJpbmdbXSA9IFtcImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvc3ByZWFkc2hlZXRzXCJdO1xuXG4gICAgc21zX3JlcXVlc3Q6IGJvb2xlYW47XG4gICAgcmVzdWx0X21lc3NhZ2VzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGZyb206IHN0cmluZztcbiAgICB0bzogc3RyaW5nO1xuICAgIGJvZHk6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBwYXRyb2xsZXI6IFBhdHJvbGxlclJvdyB8IG51bGw7XG4gICAgYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXA6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBjaGVja2luX21vZGU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICAgIGZhc3RfY2hlY2tpbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgdHdpbGlvX2NsaWVudDogVHdpbGlvQ2xpZW50IHwgbnVsbCA9IG51bGw7XG4gICAgc3luY19zaWQ6IHN0cmluZztcbiAgICByZXNldF9zY3JpcHRfaWQ6IHN0cmluZztcblxuICAgIC8vIENhY2hlIGNsaWVudHNcbiAgICBzeW5jX2NsaWVudDogU2VydmljZUNvbnRleHQgfCBudWxsID0gbnVsbDtcbiAgICB1c2VyX2NyZWRzOiBVc2VyQ3JlZHMgfCBudWxsID0gbnVsbDtcbiAgICBzZXJ2aWNlX2NyZWRzOiBHb29nbGVBdXRoIHwgbnVsbCA9IG51bGw7XG4gICAgc2hlZXRzX3NlcnZpY2U6IHNoZWV0c192NC5TaGVldHMgfCBudWxsID0gbnVsbDtcbiAgICB1c2VyX3NjcmlwdHNfc2VydmljZTogc2NyaXB0X3YxLlNjcmlwdCB8IG51bGwgPSBudWxsO1xuXG4gICAgbG9naW5fc2hlZXQ6IExvZ2luU2hlZXQgfCBudWxsID0gbnVsbDtcbiAgICBzZWFzb25fc2hlZXQ6IFNlYXNvblNoZWV0IHwgbnVsbCA9IG51bGw7XG4gICAgY29tcF9wYXNzX3NoZWV0OiBDb21wUGFzc1NoZWV0IHwgbnVsbCA9IG51bGw7XG4gICAgbWFuYWdlcl9wYXNzX3NoZWV0OiBNYW5hZ2VyUGFzc1NoZWV0IHwgbnVsbCA9IG51bGw7XG5cbiAgICBjaGVja2luX3ZhbHVlczogQ2hlY2tpblZhbHVlcztcbiAgICBjdXJyZW50X3NoZWV0X2RhdGU6IERhdGU7XG5cbiAgICBjb21iaW5lZF9jb25maWc6IENvbWJpbmVkQ29uZmlnO1xuICAgIGNvbmZpZzogSGFuZGxlckNvbmZpZztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBjb250ZXh0OiBDb250ZXh0PEhhbmRsZXJFbnZpcm9ubWVudD4sXG4gICAgICAgIGV2ZW50OiBTZXJ2ZXJsZXNzRXZlbnRPYmplY3Q8SGFuZGxlckV2ZW50PlxuICAgICkge1xuICAgICAgICAvLyBEZXRlcm1pbmUgbWVzc2FnZSBkZXRhaWxzIGZyb20gdGhlIGluY29taW5nIGV2ZW50LCB3aXRoIGZhbGxiYWNrIHZhbHVlc1xuICAgICAgICB0aGlzLnNtc19yZXF1ZXN0ID0gKGV2ZW50LkZyb20gfHwgZXZlbnQubnVtYmVyKSAhPT0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmZyb20gPSBldmVudC5Gcm9tIHx8IGV2ZW50Lm51bWJlciB8fCBldmVudC50ZXN0X251bWJlciE7XG4gICAgICAgIHRoaXMudG8gPSBzYW5pdGl6ZV9waG9uZV9udW1iZXIoZXZlbnQuVG8hKTtcbiAgICAgICAgdGhpcy5ib2R5ID0gZXZlbnQuQm9keT8udG9Mb3dlckNhc2UoKT8udHJpbSgpLnJlcGxhY2UoL1xccysvLCBcIi1cIik7XG4gICAgICAgIHRoaXMuYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXAgPVxuICAgICAgICAgICAgZXZlbnQucmVxdWVzdC5jb29raWVzLmJ2bnNwX2NoZWNraW5fbmV4dF9zdGVwO1xuICAgICAgICB0aGlzLmNvbWJpbmVkX2NvbmZpZyA9IHsgLi4uQ09ORklHLCAuLi5jb250ZXh0IH07XG4gICAgICAgIHRoaXMuY29uZmlnID0gdGhpcy5jb21iaW5lZF9jb25maWc7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMudHdpbGlvX2NsaWVudCA9IGNvbnRleHQuZ2V0VHdpbGlvQ2xpZW50KCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgaW5pdGlhbGl6aW5nIHR3aWxpb19jbGllbnRcIiwgZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zeW5jX3NpZCA9IGNvbnRleHQuU1lOQ19TSUQ7XG4gICAgICAgIHRoaXMucmVzZXRfc2NyaXB0X2lkID0gY29udGV4dC5TQ1JJUFRfSUQ7XG4gICAgICAgIHRoaXMucGF0cm9sbGVyID0gbnVsbDtcblxuICAgICAgICB0aGlzLmNoZWNraW5fdmFsdWVzID0gbmV3IENoZWNraW5WYWx1ZXModGhpcy5jb25maWcuQ0hFQ0tJTl9WQUxVRVMpO1xuICAgICAgICB0aGlzLmN1cnJlbnRfc2hlZXRfZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgfVxuXG4gICAgcGFyc2VfZmFzdF9jaGVja2luX21vZGUoYm9keTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHBhcnNlZCA9IHRoaXMuY2hlY2tpbl92YWx1ZXMucGFyc2VfZmFzdF9jaGVja2luKGJvZHkpO1xuICAgICAgICBpZiAocGFyc2VkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tpbl9tb2RlID0gcGFyc2VkLmtleTtcbiAgICAgICAgICAgIHRoaXMuZmFzdF9jaGVja2luID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwYXJzZV9jaGVja2luKGJvZHk6IHN0cmluZykge1xuICAgICAgICBjb25zdCBwYXJzZWQgPSB0aGlzLmNoZWNraW5fdmFsdWVzLnBhcnNlX2NoZWNraW4oYm9keSk7XG4gICAgICAgIGlmIChwYXJzZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5jaGVja2luX21vZGUgPSBwYXJzZWQua2V5O1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHBhcnNlX2NoZWNraW5fZnJvbV9uZXh0X3N0ZXAoKSB7XG4gICAgICAgIGNvbnN0IGxhc3Rfc2VnbWVudCA9IHRoaXMuYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXBcbiAgICAgICAgICAgID8uc3BsaXQoXCItXCIpXG4gICAgICAgICAgICAuc2xpY2UoLTEpWzBdO1xuICAgICAgICBpZiAobGFzdF9zZWdtZW50ICYmIGxhc3Rfc2VnbWVudCBpbiB0aGlzLmNoZWNraW5fdmFsdWVzLmJ5X2tleSkge1xuICAgICAgICAgICAgdGhpcy5jaGVja2luX21vZGUgPSBsYXN0X3NlZ21lbnQ7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcGFyc2VfcGFzc19mcm9tX25leHRfc3RlcCgpIHtcbiAgICAgICAgY29uc3QgbGFzdF9zZWdtZW50ID0gdGhpcy5idm5zcF9jaGVja2luX25leHRfc3RlcFxuICAgICAgICAgICAgPy5zcGxpdChcIi1cIilcbiAgICAgICAgICAgIC5zbGljZSgtMilcbiAgICAgICAgICAgIC5qb2luKFwiLVwiKTtcbiAgICAgICAgcmV0dXJuIGxhc3Rfc2VnbWVudCBhcyBDb21wUGFzc1R5cGU7XG4gICAgfVxuXG4gICAgZGVsYXkoc2Vjb25kczogbnVtYmVyLCBvcHRpb25hbDogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGlmIChvcHRpb25hbCAmJiAhdGhpcy5zbXNfcmVxdWVzdCkge1xuICAgICAgICAgICAgc2Vjb25kcyA9IDEgLyAxMDAwLjA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMpID0+IHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQocmVzLCBzZWNvbmRzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMgc2VuZF9tZXNzYWdlKG1lc3NhZ2U6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5zbXNfcmVxdWVzdCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXRfdHdpbGlvX2NsaWVudCgpLm1lc3NhZ2VzLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgdG86IHRoaXMuZnJvbSxcbiAgICAgICAgICAgICAgICBmcm9tOiB0aGlzLnRvLFxuICAgICAgICAgICAgICAgIGJvZHk6IG1lc3NhZ2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVzdWx0X21lc3NhZ2VzLnB1c2gobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBoYW5kbGUoKTogUHJvbWlzZTxCVk5TUENoZWNraW5SZXNwb25zZT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLl9oYW5kbGUoKTtcbiAgICAgICAgaWYgKCF0aGlzLnNtc19yZXF1ZXN0KSB7XG4gICAgICAgICAgICBpZiAocmVzdWx0Py5yZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0X21lc3NhZ2VzLnB1c2gocmVzdWx0LnJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IHRoaXMucmVzdWx0X21lc3NhZ2VzLmpvaW4oXCJcXG4jIyNcXG5cIiksXG4gICAgICAgICAgICAgICAgbmV4dF9zdGVwOiByZXN1bHQ/Lm5leHRfc3RlcCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgYXN5bmMgX2hhbmRsZSgpOiBQcm9taXNlPEJWTlNQQ2hlY2tpblJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgYFJlY2VpdmVkIHJlcXVlc3QgZnJvbSAke3RoaXMuZnJvbX0gd2l0aCBib2R5OiAke3RoaXMuYm9keX0gYW5kIHN0YXRlICR7dGhpcy5idm5zcF9jaGVja2luX25leHRfc3RlcH1gXG4gICAgICAgICk7XG4gICAgICAgIGlmICh0aGlzLmJvZHkgPT0gXCJsb2dvdXRcIikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmZvcm1pbmcgbG9nb3V0YCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5sb2dvdXQoKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVzcG9uc2U6IEJWTlNQQ2hlY2tpblJlc3BvbnNlIHwgdW5kZWZpbmVkO1xuICAgICAgICBpZiAoIXRoaXMuY29uZmlnLlVTRV9TRVJWSUNFX0FDQ09VTlQpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlID0gYXdhaXQgdGhpcy5jaGVja191c2VyX2NyZWRzKCk7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UpIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5ib2R5ID09IFwicmVzdGFydFwiKSB7XG4gICAgICAgICAgICByZXR1cm4geyByZXNwb25zZTogXCJPa2F5LiBUZXh0IG1lIGFnYWluIHRvIHN0YXJ0IG92ZXIuLi5cIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmdldF9tYXBwZWRfcGF0cm9sbGVyKCk7XG4gICAgICAgIGlmIChyZXNwb25zZSB8fCB0aGlzLnBhdHJvbGxlciA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIHJlc3BvbnNlIHx8IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2U6IFwiVW5leHBlY3RlZCBlcnJvciBsb29raW5nIHVwIHBhdHJvbGxlciBtYXBwaW5nXCIsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgICghdGhpcy5idm5zcF9jaGVja2luX25leHRfc3RlcCB8fFxuICAgICAgICAgICAgICAgIHRoaXMuYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXAgPT0gTkVYVF9TVEVQUy5BV0FJVF9DT01NQU5EKSAmJlxuICAgICAgICAgICAgdGhpcy5ib2R5XG4gICAgICAgICkge1xuICAgICAgICAgICAgY29uc3QgYXdhaXRfcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmhhbmRsZV9hd2FpdF9jb21tYW5kKCk7XG4gICAgICAgICAgICBpZiAoYXdhaXRfcmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXRfcmVzcG9uc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICB0aGlzLmJ2bnNwX2NoZWNraW5fbmV4dF9zdGVwID09IE5FWFRfU1RFUFMuQVdBSVRfQ0hFQ0tJTiAmJlxuICAgICAgICAgICAgdGhpcy5ib2R5XG4gICAgICAgICkge1xuICAgICAgICAgICAgaWYgKHRoaXMucGFyc2VfY2hlY2tpbih0aGlzLmJvZHkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuY2hlY2tpbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgdGhpcy5idm5zcF9jaGVja2luX25leHRfc3RlcD8uc3RhcnRzV2l0aChcbiAgICAgICAgICAgICAgICBORVhUX1NURVBTLkNPTkZJUk1fUkVTRVRcbiAgICAgICAgICAgICkgJiZcbiAgICAgICAgICAgIHRoaXMuYm9keVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmJvZHkgPT0gXCJ5ZXNcIiAmJiB0aGlzLnBhcnNlX2NoZWNraW5fZnJvbV9uZXh0X3N0ZXAoKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgICAgICBgUGVyZm9ybWluZyByZXNldF9zaGVldF9mbG93IGZvciAke3RoaXMucGF0cm9sbGVyLm5hbWV9IHdpdGggY2hlY2tpbiBtb2RlOiAke3RoaXMuY2hlY2tpbl9tb2RlfWBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIChhd2FpdCB0aGlzLnJlc2V0X3NoZWV0X2Zsb3coKSkgfHwgKGF3YWl0IHRoaXMuY2hlY2tpbigpKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICB0aGlzLmJ2bnNwX2NoZWNraW5fbmV4dF9zdGVwPy5zdGFydHNXaXRoKE5FWFRfU1RFUFMuQVVUSF9SRVNFVClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wYXJzZV9jaGVja2luX2Zyb21fbmV4dF9zdGVwKCkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICAgICAgYFBlcmZvcm1pbmcgcmVzZXRfc2hlZXRfZmxvdy1wb3N0LWF1dGggZm9yICR7dGhpcy5wYXRyb2xsZXIubmFtZX0gd2l0aCBjaGVja2luIG1vZGU6ICR7dGhpcy5jaGVja2luX21vZGV9YFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgKGF3YWl0IHRoaXMucmVzZXRfc2hlZXRfZmxvdygpKSB8fCAoYXdhaXQgdGhpcy5jaGVja2luKCkpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHRoaXMuYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXA/LnN0YXJ0c1dpdGgoTkVYVF9TVEVQUy5BV0FJVF9QQVNTKSAmJlxuICAgICAgICAgICAgdGhpcy5ib2R5XG4gICAgICAgICkge1xuICAgICAgICAgICAgY29uc3QgdHlwZSA9IHRoaXMucGFyc2VfcGFzc19mcm9tX25leHRfc3RlcCgpO1xuICAgICAgICAgICAgY29uc3QgbnVtYmVyID0gTnVtYmVyKHRoaXMuYm9keSk7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgIU51bWJlci5pc05hTihudW1iZXIpICYmXG4gICAgICAgICAgICAgICAgW0NvbXBQYXNzVHlwZS5Db21wUGFzcywgQ29tcFBhc3NUeXBlLk1hbmFnZXJQYXNzXS5pbmNsdWRlcyh0eXBlKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucHJvbXB0X2NvbXBfbWFuYWdlcl9wYXNzKHR5cGUsIG51bWJlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5idm5zcF9jaGVja2luX25leHRfc3RlcCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5zZW5kX21lc3NhZ2UoXCJTb3JyeSwgSSBkaWRuJ3QgdW5kZXJzdGFuZCB0aGF0LlwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wcm9tcHRfY29tbWFuZCgpO1xuICAgIH1cblxuICAgIGFzeW5jIGhhbmRsZV9hd2FpdF9jb21tYW5kKCk6IFByb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2UgfCB1bmRlZmluZWQ+IHtcbiAgICAgICAgY29uc3QgcGF0cm9sbGVyX25hbWUgPSB0aGlzLnBhdHJvbGxlciEubmFtZTtcbiAgICAgICAgaWYgKHRoaXMucGFyc2VfZmFzdF9jaGVja2luX21vZGUodGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgIGBQZXJmb3JtaW5nIGZhc3QgY2hlY2tpbiBmb3IgJHtwYXRyb2xsZXJfbmFtZX0gd2l0aCBtb2RlOiAke3RoaXMuY2hlY2tpbl9tb2RlfWBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5jaGVja2luKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKENPTU1BTkRTLk9OX0RVVFkuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIGdldF9vbl9kdXR5IGZvciAke3BhdHJvbGxlcl9uYW1lfWApO1xuICAgICAgICAgICAgcmV0dXJuIHsgcmVzcG9uc2U6IGF3YWl0IHRoaXMuZ2V0X29uX2R1dHkoKSB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ2hlY2tpbmcgZm9yIHN0YXR1cy4uLlwiKTtcbiAgICAgICAgaWYgKENPTU1BTkRTLlNUQVRVUy5pbmNsdWRlcyh0aGlzLmJvZHkhKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmZvcm1pbmcgZ2V0X3N0YXR1cyBmb3IgJHtwYXRyb2xsZXJfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldF9zdGF0dXMoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQ09NTUFORFMuQ0hFQ0tJTi5pbmNsdWRlcyh0aGlzLmJvZHkhKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmZvcm1pbmcgcHJvbXB0X2NoZWNraW4gZm9yICR7cGF0cm9sbGVyX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9tcHRfY2hlY2tpbigpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDT01NQU5EUy5DT01QX1BBU1MuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIGNvbXBfcGFzcyBmb3IgJHtwYXRyb2xsZXJfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnByb21wdF9jb21wX21hbmFnZXJfcGFzcyhcbiAgICAgICAgICAgICAgICBDb21wUGFzc1R5cGUuQ29tcFBhc3MsXG4gICAgICAgICAgICAgICAgbnVsbFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQ09NTUFORFMuTUFOQUdFUl9QQVNTLmluY2x1ZGVzKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBtYW5hZ2VyX3Bhc3MgZm9yICR7cGF0cm9sbGVyX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5wcm9tcHRfY29tcF9tYW5hZ2VyX3Bhc3MoXG4gICAgICAgICAgICAgICAgQ29tcFBhc3NUeXBlLk1hbmFnZXJQYXNzLFxuICAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKENPTU1BTkRTLldIQVRTQVBQLmluY2x1ZGVzKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgSSdtIGF2YWlsYWJsZSBvbiB3aGF0c2FwcCBhcyB3ZWxsISBXaGF0c2FwcCB1c2VzIFdpZmkvQ2VsbCBEYXRhIGluc3RlYWQgb2YgU01TLCBhbmQgY2FuIGJlIG1vcmUgcmVsaWFibGUuIE1lc3NhZ2UgbWUgYXQgaHR0cHM6Ly93YS5tZS8xJHt0aGlzLnRvfWAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvbXB0X2NvbW1hbmQoKTogQlZOU1BDaGVja2luUmVzcG9uc2Uge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IGAke3RoaXMucGF0cm9sbGVyIS5uYW1lfSwgSSdtIEJWTlNQIEJvdC4gXG5FbnRlciBhIGNvbW1hbmQ6XG5DaGVjayBpbiAvIENoZWNrIG91dCAvIFN0YXR1cyAvIE9uIER1dHkgLyBDb21wIFBhc3MgLyBNYW5hZ2VyIFBhc3MgLyBXaGF0c2FwcFxuU2VuZCAncmVzdGFydCcgYXQgYW55IHRpbWUgdG8gYmVnaW4gYWdhaW5gLFxuICAgICAgICAgICAgbmV4dF9zdGVwOiBORVhUX1NURVBTLkFXQUlUX0NPTU1BTkQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJvbXB0X2NoZWNraW4oKTogQlZOU1BDaGVja2luUmVzcG9uc2Uge1xuICAgICAgICBjb25zdCB0eXBlcyA9IE9iamVjdC52YWx1ZXModGhpcy5jaGVja2luX3ZhbHVlcy5ieV9rZXkpLm1hcChcbiAgICAgICAgICAgICh4KSA9PiB4LnNtc19kZXNjXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZTogYCR7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXIhLm5hbWVcbiAgICAgICAgICAgIH0sIHVwZGF0ZSBwYXRyb2xsaW5nIHN0YXR1cyB0bzogJHt0eXBlc1xuICAgICAgICAgICAgICAgIC5zbGljZSgwLCAtMSlcbiAgICAgICAgICAgICAgICAuam9pbihcIiwgXCIpfSwgb3IgJHt0eXBlcy5zbGljZSgtMSl9P2AsXG4gICAgICAgICAgICBuZXh0X3N0ZXA6IE5FWFRfU1RFUFMuQVdBSVRfQ0hFQ0tJTixcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBhc3luYyBwcm9tcHRfY29tcF9tYW5hZ2VyX3Bhc3MoXG4gICAgICAgIHBhc3NfdHlwZTogQ29tcFBhc3NUeXBlLFxuICAgICAgICBwYXNzZXNfdG9fdXNlOiBudW1iZXIgfCBudWxsXG4gICAgKTogUHJvbWlzZTxCVk5TUENoZWNraW5SZXNwb25zZT4ge1xuICAgICAgICBpZiAodGhpcy5wYXRyb2xsZXIhLmNhdGVnb3J5ID09IFwiQ1wiKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgJHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXIhLm5hbWVcbiAgICAgICAgICAgICAgICB9LCBjYW5kaWRhdGVzIGRvIG5vdCByZWNlaXZlIGNvbXAgb3IgbWFuYWdlciBwYXNzZXMuYCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2hlZXQ6IFBhc3NTaGVldCA9IGF3YWl0IChwYXNzX3R5cGUgPT0gQ29tcFBhc3NUeXBlLkNvbXBQYXNzXG4gICAgICAgICAgICA/IHRoaXMuZ2V0X2NvbXBfcGFzc19zaGVldCgpXG4gICAgICAgICAgICA6IHRoaXMuZ2V0X21hbmFnZXJfcGFzc19zaGVldCgpKTtcblxuICAgICAgICBjb25zdCB1c2VkX2FuZF9hdmFpbGFibGUgPSBhd2FpdCBzaGVldC5nZXRfYXZhaWxhYmxlX2FuZF91c2VkX3Bhc3NlcyhcbiAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyPy5uYW1lIVxuICAgICAgICApO1xuICAgICAgICBpZiAodXNlZF9hbmRfYXZhaWxhYmxlID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IFwiUHJvYmxlbSBsb29raW5nIHVwIHBhdHJvbGxlciBmb3IgY29tcCBwYXNzZXNcIixcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhc3Nlc190b191c2UgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHVzZWRfYW5kX2F2YWlsYWJsZS5nZXRfcHJvbXB0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhd2FpdCBzaGVldC5zZXRfdXNlZF9jb21wX3Bhc3Nlcyh1c2VkX2FuZF9hdmFpbGFibGUsIHBhc3Nlc190b191c2UpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYFVwZGF0ZWQgJHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXIhLm5hbWVcbiAgICAgICAgICAgICAgICB9IHRvIHVzZSAke3Bhc3Nlc190b191c2V9ICR7Z2V0X2NvbXBfcGFzc19kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgcGFzc190eXBlXG4gICAgICAgICAgICAgICAgKX0gdG9kYXkuYCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBnZXRfc3RhdHVzKCk6IFByb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuICAgICAgICBjb25zdCBzaGVldF9kYXRlID0gbG9naW5fc2hlZXQuc2hlZXRfZGF0ZS50b0RhdGVTdHJpbmcoKTtcbiAgICAgICAgY29uc3QgY3VycmVudF9kYXRlID0gbG9naW5fc2hlZXQuY3VycmVudF9kYXRlLnRvRGF0ZVN0cmluZygpO1xuICAgICAgICBpZiAoIWxvZ2luX3NoZWV0LmlzX2N1cnJlbnQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBzaGVldF9kYXRlOiAke2xvZ2luX3NoZWV0LnNoZWV0X2RhdGV9YCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgY3VycmVudF9kYXRlOiAke2xvZ2luX3NoZWV0LmN1cnJlbnRfZGF0ZX1gKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBTaGVldCBpcyBub3QgY3VycmVudCBmb3IgdG9kYXkgKGxhc3QgcmVzZXQ6ICR7c2hlZXRfZGF0ZX0pLiAke1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICAgICAgICAgIH0gaXMgbm90IGNoZWNrZWQgaW4gZm9yICR7Y3VycmVudF9kYXRlfS5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXNwb25zZSA9IHsgcmVzcG9uc2U6IGF3YWl0IHRoaXMuZ2V0X3N0YXR1c19zdHJpbmcoKSB9O1xuICAgICAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oXCJzdGF0dXNcIik7XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG5cbiAgICBhc3luYyBnZXRfc3RhdHVzX3N0cmluZygpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG4gICAgICAgIGNvbnN0IGNvbXBfcGFzc19wcm9taXNlID0gKFxuICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXRfY29tcF9wYXNzX3NoZWV0KClcbiAgICAgICAgKS5nZXRfYXZhaWxhYmxlX2FuZF91c2VkX3Bhc3Nlcyh0aGlzLnBhdHJvbGxlciEubmFtZSk7XG4gICAgICAgIGNvbnN0IG1hbmFnZXJfcGFzc19wcm9taXNlID0gKFxuICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXRfbWFuYWdlcl9wYXNzX3NoZWV0KClcbiAgICAgICAgKS5nZXRfYXZhaWxhYmxlX2FuZF91c2VkX3Bhc3Nlcyh0aGlzLnBhdHJvbGxlciEubmFtZSk7XG4gICAgICAgIGNvbnN0IHBhdHJvbGxlcl9zdGF0dXMgPSB0aGlzLnBhdHJvbGxlciE7XG5cbiAgICAgICAgY29uc3QgY2hlY2tpbkNvbHVtblNldCA9XG4gICAgICAgICAgICBwYXRyb2xsZXJfc3RhdHVzLmNoZWNraW4gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgcGF0cm9sbGVyX3N0YXR1cy5jaGVja2luICE9PSBudWxsO1xuICAgICAgICBjb25zdCBjaGVja2VkT3V0ID1cbiAgICAgICAgICAgIGNoZWNraW5Db2x1bW5TZXQgJiZcbiAgICAgICAgICAgIHRoaXMuY2hlY2tpbl92YWx1ZXMuYnlfc2hlZXRfc3RyaW5nW3BhdHJvbGxlcl9zdGF0dXMuY2hlY2tpbl0ua2V5ID09XG4gICAgICAgICAgICAgICAgXCJvdXRcIjtcbiAgICAgICAgbGV0IHN0YXR1cyA9IHBhdHJvbGxlcl9zdGF0dXMuY2hlY2tpbiB8fCBcIk5vdCBQcmVzZW50XCI7XG5cbiAgICAgICAgaWYgKGNoZWNrZWRPdXQpIHtcbiAgICAgICAgICAgIHN0YXR1cyA9IFwiQ2hlY2tlZCBPdXRcIjtcbiAgICAgICAgfSBlbHNlIGlmIChjaGVja2luQ29sdW1uU2V0KSB7XG4gICAgICAgICAgICBsZXQgc2VjdGlvbiA9IHBhdHJvbGxlcl9zdGF0dXMuc2VjdGlvbi50b1N0cmluZygpO1xuICAgICAgICAgICAgaWYgKHNlY3Rpb24ubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgICAgICBzZWN0aW9uID0gYFNlY3Rpb24gJHtzZWN0aW9ufWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdGF0dXMgPSBgJHtwYXRyb2xsZXJfc3RhdHVzLmNoZWNraW59ICgke3NlY3Rpb259KWA7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb21wbGV0ZWRQYXRyb2xEYXlzID0gYXdhaXQgKFxuICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXRfc2Vhc29uX3NoZWV0KClcbiAgICAgICAgKS5nZXRfcGF0cm9sbGVkX2RheXModGhpcy5wYXRyb2xsZXIhLm5hbWUpO1xuICAgICAgICBjb25zdCBjb21wbGV0ZWRQYXRyb2xEYXlzU3RyaW5nID1cbiAgICAgICAgICAgIGNvbXBsZXRlZFBhdHJvbERheXMgPiAwID8gY29tcGxldGVkUGF0cm9sRGF5cy50b1N0cmluZygpIDogXCJOb1wiO1xuICAgICAgICBjb25zdCBsb2dpblNoZWV0RGF0ZSA9IGxvZ2luX3NoZWV0LnNoZWV0X2RhdGUudG9EYXRlU3RyaW5nKCk7XG5cbiAgICAgICAgbGV0IHN0YXR1c1N0cmluZyA9IGBTdGF0dXMgZm9yICR7XG4gICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICB9IG9uIGRhdGUgJHtsb2dpblNoZWV0RGF0ZX06ICR7c3RhdHVzfS5cXG4ke2NvbXBsZXRlZFBhdHJvbERheXNTdHJpbmd9IGNvbXBsZXRlZCBwYXRyb2wgZGF5cyBwcmlvciB0byB0b2RheS5gO1xuICAgICAgICBjb25zdCB1c2VkQ29tcFBhc3NlcyA9IChhd2FpdCBjb21wX3Bhc3NfcHJvbWlzZSk/LnVzZWQ7XG4gICAgICAgIGNvbnN0IHVzZWRNYW5hZ2VyUGFzc2VzID0gKGF3YWl0IG1hbmFnZXJfcGFzc19wcm9taXNlKT8udXNlZDtcbiAgICAgICAgaWYgKHVzZWRDb21wUGFzc2VzKSB7XG4gICAgICAgICAgICBzdGF0dXNTdHJpbmcgKz0gYCBZb3UgYXJlIHVzaW5nICR7dXNlZENvbXBQYXNzZXN9IGNvbXAgcGFzc2VzIHRvZGF5LmA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVzZWRNYW5hZ2VyUGFzc2VzKSB7XG4gICAgICAgICAgICBzdGF0dXNTdHJpbmcgKz0gYCBZb3UgYXJlIHVzaW5nICR7dXNlZE1hbmFnZXJQYXNzZXN9IG1hbmFnZXIgcGFzc2VzIHRvZGF5LmA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0YXR1c1N0cmluZztcbiAgICB9XG5cbiAgICBhc3luYyBjaGVja2luKCk6IFByb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICBgUGVyZm9ybWluZyByZWd1bGFyIGNoZWNraW4gZm9yICR7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXIhLm5hbWVcbiAgICAgICAgICAgIH0gd2l0aCBtb2RlOiAke3RoaXMuY2hlY2tpbl9tb2RlfWBcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGF3YWl0IHRoaXMuc2hlZXRfbmVlZHNfcmVzZXQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTpcbiAgICAgICAgICAgICAgICAgICAgYCR7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICAgICAgICAgICAgICB9LCB5b3UgYXJlIHRoZSBmaXJzdCBwZXJzb24gdG8gY2hlY2sgaW4gdG9kYXkuIGAgK1xuICAgICAgICAgICAgICAgICAgICBgSSBuZWVkIHRvIGFyY2hpdmUgYW5kIHJlc2V0IHRoZSBzaGVldCBiZWZvcmUgY29udGludWluZy4gYCArXG4gICAgICAgICAgICAgICAgICAgIGBXb3VsZCB5b3UgbGlrZSBtZSB0byBkbyB0aGF0PyAoWWVzL05vKWAsXG4gICAgICAgICAgICAgICAgbmV4dF9zdGVwOiBgJHtORVhUX1NURVBTLkNPTkZJUk1fUkVTRVR9LSR7dGhpcy5jaGVja2luX21vZGV9YCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNoZWNraW5fbW9kZTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgIXRoaXMuY2hlY2tpbl9tb2RlIHx8XG4gICAgICAgICAgICAoY2hlY2tpbl9tb2RlID0gdGhpcy5jaGVja2luX3ZhbHVlcy5ieV9rZXlbdGhpcy5jaGVja2luX21vZGVdKSA9PT1cbiAgICAgICAgICAgICAgICB1bmRlZmluZWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDaGVja2luIG1vZGUgaW1wcm9wZXJseSBzZXRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG4gICAgICAgIGNvbnN0IG5ld19jaGVja2luX3ZhbHVlID0gY2hlY2tpbl9tb2RlLnNoZWV0c192YWx1ZTtcbiAgICAgICAgYXdhaXQgbG9naW5fc2hlZXQuY2hlY2tpbih0aGlzLnBhdHJvbGxlciEsIG5ld19jaGVja2luX3ZhbHVlKTtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2dpbl9zaGVldD8ucmVmcmVzaCgpO1xuICAgICAgICBhd2FpdCB0aGlzLmdldF9tYXBwZWRfcGF0cm9sbGVyKHRydWUpO1xuXG4gICAgICAgIGxldCByZXNwb25zZSA9IGBVcGRhdGluZyAke1xuICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXIhLm5hbWVcbiAgICAgICAgfSB3aXRoIHN0YXR1czogJHtuZXdfY2hlY2tpbl92YWx1ZX0uYDtcbiAgICAgICAgaWYgKCF0aGlzLmZhc3RfY2hlY2tpbikge1xuICAgICAgICAgICAgcmVzcG9uc2UgKz0gYCBZb3UgY2FuIHNlbmQgJyR7Y2hlY2tpbl9tb2RlLmZhc3RfY2hlY2tpbnNbMF19JyBhcyB5b3VyIGZpcnN0IG1lc3NhZ2UgZm9yIGEgZmFzdCAke2NoZWNraW5fbW9kZS5zaGVldHNfdmFsdWV9IGNoZWNraW4gbmV4dCB0aW1lLmA7XG4gICAgICAgIH1cbiAgICAgICAgcmVzcG9uc2UgKz0gXCJcXG5cXG5cIiArIChhd2FpdCB0aGlzLmdldF9zdGF0dXNfc3RyaW5nKCkpO1xuICAgICAgICByZXR1cm4geyByZXNwb25zZTogcmVzcG9uc2UgfTtcbiAgICB9XG5cbiAgICBhc3luYyBzaGVldF9uZWVkc19yZXNldCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuXG4gICAgICAgIGNvbnN0IHNoZWV0X2RhdGUgPSBsb2dpbl9zaGVldC5zaGVldF9kYXRlO1xuICAgICAgICBjb25zdCBjdXJyZW50X2RhdGUgPSBsb2dpbl9zaGVldC5jdXJyZW50X2RhdGU7XG4gICAgICAgIGNvbnNvbGUubG9nKGBzaGVldF9kYXRlOiAke3NoZWV0X2RhdGV9YCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBjdXJyZW50X2RhdGU6ICR7Y3VycmVudF9kYXRlfWApO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGBkYXRlX2lzX2N1cnJlbnQ6ICR7bG9naW5fc2hlZXQuaXNfY3VycmVudH1gKTtcblxuICAgICAgICByZXR1cm4gIWxvZ2luX3NoZWV0LmlzX2N1cnJlbnQ7XG4gICAgfVxuXG4gICAgYXN5bmMgcmVzZXRfc2hlZXRfZmxvdygpOiBQcm9taXNlPEJWTlNQQ2hlY2tpblJlc3BvbnNlIHwgdm9pZD4ge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuY2hlY2tfdXNlcl9jcmVkcyhcbiAgICAgICAgICAgIGAke1xuICAgICAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyIS5uYW1lXG4gICAgICAgICAgICB9LCBpbiBvcmRlciB0byByZXNldC9hcmNoaXZlLCBJIG5lZWQgeW91IHRvIGF1dGhvcml6ZSB0aGUgYXBwLmBcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHJlc3BvbnNlKVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogcmVzcG9uc2UucmVzcG9uc2UsXG4gICAgICAgICAgICAgICAgbmV4dF9zdGVwOiBgJHtORVhUX1NURVBTLkFVVEhfUkVTRVR9LSR7dGhpcy5jaGVja2luX21vZGV9YCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnJlc2V0X3NoZWV0KCk7XG4gICAgfVxuXG4gICAgYXN5bmMgcmVzZXRfc2hlZXQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IHNjcmlwdF9zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfdXNlcl9zY3JpcHRzX3NlcnZpY2UoKTtcbiAgICAgICAgY29uc3Qgc2hvdWxkX3BlcmZvcm1fYXJjaGl2ZSA9ICEoYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKSkuYXJjaGl2ZWQ7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBzaG91bGRfcGVyZm9ybV9hcmNoaXZlXG4gICAgICAgICAgICA/IFwiT2theS4gQXJjaGl2aW5nIGFuZCByZXNldGluZyB0aGUgY2hlY2sgaW4gc2hlZXQuIFRoaXMgdGFrZXMgYWJvdXQgMTAgc2Vjb25kcy4uLlwiXG4gICAgICAgICAgICA6IFwiT2theS4gU2hlZXQgaGFzIGFscmVhZHkgYmVlbiBhcmNoaXZlZC4gUGVyZm9ybWluZyByZXNldC4gVGhpcyB0YWtlcyBhYm91dCA1IHNlY29uZHMuLi5cIjtcbiAgICAgICAgYXdhaXQgdGhpcy5zZW5kX21lc3NhZ2UobWVzc2FnZSk7XG4gICAgICAgIGlmIChzaG91bGRfcGVyZm9ybV9hcmNoaXZlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkFyY2hpdmluZy4uLlwiKTtcblxuICAgICAgICAgICAgYXdhaXQgc2NyaXB0X3NlcnZpY2Uuc2NyaXB0cy5ydW4oe1xuICAgICAgICAgICAgICAgIHNjcmlwdElkOiB0aGlzLnJlc2V0X3NjcmlwdF9pZCxcbiAgICAgICAgICAgICAgICByZXF1ZXN0Qm9keTogeyBmdW5jdGlvbjogdGhpcy5jb25maWcuQVJDSElWRV9GVU5DVElPTl9OQU1FIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZGVsYXkoNSk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oXCJhcmNoaXZlXCIpO1xuICAgICAgICAgICAgdGhpcy5sb2dpbl9zaGVldCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZyhcIlJlc2V0dGluZy4uLlwiKTtcbiAgICAgICAgYXdhaXQgc2NyaXB0X3NlcnZpY2Uuc2NyaXB0cy5ydW4oe1xuICAgICAgICAgICAgc2NyaXB0SWQ6IHRoaXMucmVzZXRfc2NyaXB0X2lkLFxuICAgICAgICAgICAgcmVxdWVzdEJvZHk6IHsgZnVuY3Rpb246IHRoaXMuY29uZmlnLlJFU0VUX0ZVTkNUSU9OX05BTUUgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIGF3YWl0IHRoaXMuZGVsYXkoNSk7XG4gICAgICAgIGF3YWl0IHRoaXMubG9nX2FjdGlvbihcInJlc2V0XCIpO1xuICAgICAgICBhd2FpdCB0aGlzLnNlbmRfbWVzc2FnZShcIkRvbmUuXCIpO1xuICAgIH1cblxuICAgIGFzeW5jIGNoZWNrX3VzZXJfY3JlZHMoXG4gICAgICAgIHByb21wdF9tZXNzYWdlOiBzdHJpbmcgPSBcIkhpLCBiZWZvcmUgeW91IGNhbiB1c2UgQlZOU1AgYm90LCB5b3UgbXVzdCBsb2dpbi5cIlxuICAgICk6IFByb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2UgfCB1bmRlZmluZWQ+IHtcbiAgICAgICAgY29uc3QgdXNlcl9jcmVkcyA9IHRoaXMuZ2V0X3VzZXJfY3JlZHMoKTtcbiAgICAgICAgaWYgKCEoYXdhaXQgdXNlcl9jcmVkcy5sb2FkVG9rZW4oKSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGF1dGhVcmwgPSBhd2FpdCB1c2VyX2NyZWRzLmdldEF1dGhVcmwoKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGAke3Byb21wdF9tZXNzYWdlfSBQbGVhc2UgZm9sbG93IHRoaXMgbGluazpcbiR7YXV0aFVybH1cblxuTWVzc2FnZSBtZSBhZ2FpbiB3aGVuIGRvbmUuYCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBnZXRfb25fZHV0eSgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zdCBjaGVja2VkX291dF9zZWN0aW9uID0gXCJDaGVja2VkIE91dFwiO1xuICAgICAgICBjb25zdCBsYXN0X3NlY3Rpb25zID0gW2NoZWNrZWRfb3V0X3NlY3Rpb25dO1xuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG5cbiAgICAgICAgY29uc3Qgb25fZHV0eV9wYXRyb2xsZXJzID0gbG9naW5fc2hlZXQuZ2V0X29uX2R1dHlfcGF0cm9sbGVycygpO1xuICAgICAgICBjb25zdCBieV9zZWN0aW9uID0gb25fZHV0eV9wYXRyb2xsZXJzXG4gICAgICAgICAgICAuZmlsdGVyKCh4KSA9PiB4LmNoZWNraW4pXG4gICAgICAgICAgICAucmVkdWNlKChwcmV2OiB7IFtrZXk6IHN0cmluZ106IFBhdHJvbGxlclJvd1tdIH0sIGN1cikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNob3J0X2NvZGUgPVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNraW5fdmFsdWVzLmJ5X3NoZWV0X3N0cmluZ1tjdXIuY2hlY2tpbl0ua2V5O1xuICAgICAgICAgICAgICAgIGxldCBzZWN0aW9uID0gY3VyLnNlY3Rpb247XG4gICAgICAgICAgICAgICAgaWYgKHNob3J0X2NvZGUgPT0gXCJvdXRcIikge1xuICAgICAgICAgICAgICAgICAgICBzZWN0aW9uID0gY2hlY2tlZF9vdXRfc2VjdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCEoc2VjdGlvbiBpbiBwcmV2KSkge1xuICAgICAgICAgICAgICAgICAgICBwcmV2W3NlY3Rpb25dID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHByZXZbc2VjdGlvbl0ucHVzaChjdXIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgICAgICAgfSwge30pO1xuICAgICAgICBsZXQgcmVzdWx0czogc3RyaW5nW11bXSA9IFtdO1xuICAgICAgICBsZXQgYWxsX2tleXMgPSBPYmplY3Qua2V5cyhieV9zZWN0aW9uKTtcbiAgICAgICAgY29uc3Qgb3JkZXJlZF9wcmltYXJ5X3NlY3Rpb25zID0gT2JqZWN0LmtleXMoYnlfc2VjdGlvbilcbiAgICAgICAgICAgIC5maWx0ZXIoKHgpID0+ICFsYXN0X3NlY3Rpb25zLmluY2x1ZGVzKHgpKVxuICAgICAgICAgICAgLnNvcnQoKTtcbiAgICAgICAgY29uc3QgZmlsdGVyZWRfbGFzdF9zZWN0aW9ucyA9IGxhc3Rfc2VjdGlvbnMuZmlsdGVyKCh4KSA9PlxuICAgICAgICAgICAgYWxsX2tleXMuaW5jbHVkZXMoeClcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3Qgb3JkZXJlZF9zZWN0aW9ucyA9IG9yZGVyZWRfcHJpbWFyeV9zZWN0aW9ucy5jb25jYXQoXG4gICAgICAgICAgICBmaWx0ZXJlZF9sYXN0X3NlY3Rpb25zXG4gICAgICAgICk7XG5cbiAgICAgICAgZm9yIChjb25zdCBzZWN0aW9uIG9mIG9yZGVyZWRfc2VjdGlvbnMpIHtcbiAgICAgICAgICAgIGxldCByZXN1bHQ6IHN0cmluZ1tdID0gW107XG4gICAgICAgICAgICBjb25zdCBwYXRyb2xsZXJzID0gYnlfc2VjdGlvbltzZWN0aW9uXS5zb3J0KCh4LCB5KSA9PlxuICAgICAgICAgICAgICAgIHgubmFtZS5sb2NhbGVDb21wYXJlKHkubmFtZSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoc2VjdGlvbi5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChcIlNlY3Rpb24gXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0LnB1c2goYCR7c2VjdGlvbn06IGApO1xuICAgICAgICAgICAgZnVuY3Rpb24gcGF0cm9sbGVyX3N0cmluZyhuYW1lOiBzdHJpbmcsIHNob3J0X2NvZGU6IHN0cmluZykge1xuICAgICAgICAgICAgICAgIGxldCBkZXRhaWxzID0gXCJcIjtcbiAgICAgICAgICAgICAgICBpZiAoc2hvcnRfY29kZSAhPT0gXCJkYXlcIiAmJiBzaG9ydF9jb2RlICE9PSBcIm91dFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGRldGFpbHMgPSBgICgke3Nob3J0X2NvZGUudG9VcHBlckNhc2UoKX0pYDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke25hbWV9JHtkZXRhaWxzfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQucHVzaChcbiAgICAgICAgICAgICAgICBwYXRyb2xsZXJzXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKHgpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRyb2xsZXJfc3RyaW5nKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHgubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNraW5fdmFsdWVzLmJ5X3NoZWV0X3N0cmluZ1t4LmNoZWNraW5dLmtleVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5qb2luKFwiLCBcIilcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oXCJvbi1kdXR5XCIpO1xuICAgICAgICByZXR1cm4gYFBhdHJvbGxlcnMgZm9yICR7bG9naW5fc2hlZXQuc2hlZXRfZGF0ZS50b0RhdGVTdHJpbmcoKX0gKFRvdGFsOiAke1xuICAgICAgICAgICAgb25fZHV0eV9wYXRyb2xsZXJzLmxlbmd0aFxuICAgICAgICB9KTpcXG4ke3Jlc3VsdHMubWFwKChyKSA9PiByLmpvaW4oXCJcIikpLmpvaW4oXCJcXG5cIil9YDtcbiAgICB9XG5cbiAgICBhc3luYyBsb2dfYWN0aW9uKGFjdGlvbl9uYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3Qgc2hlZXRzX3NlcnZpY2UgPSBhd2FpdCB0aGlzLmdldF9zaGVldHNfc2VydmljZSgpO1xuICAgICAgICBhd2FpdCBzaGVldHNfc2VydmljZS5zcHJlYWRzaGVldHMudmFsdWVzLmFwcGVuZCh7XG4gICAgICAgICAgICBzcHJlYWRzaGVldElkOiB0aGlzLmNvbWJpbmVkX2NvbmZpZy5TSEVFVF9JRCxcbiAgICAgICAgICAgIHJhbmdlOiB0aGlzLmNvbmZpZy5BQ0lUT05fTE9HX1NIRUVULFxuICAgICAgICAgICAgdmFsdWVJbnB1dE9wdGlvbjogXCJVU0VSX0VOVEVSRURcIixcbiAgICAgICAgICAgIHJlcXVlc3RCb2R5OiB7XG4gICAgICAgICAgICAgICAgdmFsdWVzOiBbW3RoaXMucGF0cm9sbGVyIS5uYW1lLCBuZXcgRGF0ZSgpLCBhY3Rpb25fbmFtZV1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMgbG9nb3V0KCk6IFByb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgdXNlcl9jcmVkcyA9IHRoaXMuZ2V0X3VzZXJfY3JlZHMoKTtcbiAgICAgICAgYXdhaXQgdXNlcl9jcmVkcy5kZWxldGVUb2tlbigpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IFwiT2theSwgSSBoYXZlIHJlbW92ZWQgYWxsIGxvZ2luIHNlc3Npb24gaW5mb3JtYXRpb24uXCIsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2V0X3R3aWxpb19jbGllbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnR3aWxpb19jbGllbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHdpbGlvX2NsaWVudCB3YXMgbmV2ZXIgaW5pdGlhbGl6ZWQhXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnR3aWxpb19jbGllbnQ7XG4gICAgfVxuXG4gICAgZ2V0X3N5bmNfY2xpZW50KCkge1xuICAgICAgICBpZiAoIXRoaXMuc3luY19jbGllbnQpIHtcbiAgICAgICAgICAgIHRoaXMuc3luY19jbGllbnQgPSB0aGlzLmdldF90d2lsaW9fY2xpZW50KCkuc3luYy5zZXJ2aWNlcyhcbiAgICAgICAgICAgICAgICB0aGlzLnN5bmNfc2lkXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnN5bmNfY2xpZW50O1xuICAgIH1cblxuICAgIGdldF91c2VyX2NyZWRzKCkge1xuICAgICAgICBpZiAoIXRoaXMudXNlcl9jcmVkcykge1xuICAgICAgICAgICAgdGhpcy51c2VyX2NyZWRzID0gbmV3IFVzZXJDcmVkcyhcbiAgICAgICAgICAgICAgICB0aGlzLmdldF9zeW5jX2NsaWVudCgpLFxuICAgICAgICAgICAgICAgIHRoaXMuZnJvbSxcbiAgICAgICAgICAgICAgICB0aGlzLmNvbWJpbmVkX2NvbmZpZ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy51c2VyX2NyZWRzO1xuICAgIH1cblxuICAgIGdldF9zZXJ2aWNlX2NyZWRzKCkge1xuICAgICAgICBpZiAoIXRoaXMuc2VydmljZV9jcmVkcykge1xuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlX2NyZWRzID0gbmV3IGdvb2dsZS5hdXRoLkdvb2dsZUF1dGgoe1xuICAgICAgICAgICAgICAgIGtleUZpbGU6IGdldF9zZXJ2aWNlX2NyZWRlbnRpYWxzX3BhdGgoKSxcbiAgICAgICAgICAgICAgICBzY29wZXM6IHRoaXMuU0NPUEVTLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZV9jcmVkcztcbiAgICB9XG5cbiAgICBhc3luYyBnZXRfdmFsaWRfY3JlZHMocmVxdWlyZV91c2VyX2NyZWRzOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLlVTRV9TRVJWSUNFX0FDQ09VTlQgJiYgIXJlcXVpcmVfdXNlcl9jcmVkcykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X3NlcnZpY2VfY3JlZHMoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1c2VyX2NyZWRzID0gdGhpcy5nZXRfdXNlcl9jcmVkcygpO1xuICAgICAgICBpZiAoIShhd2FpdCB1c2VyX2NyZWRzLmxvYWRUb2tlbigpKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVXNlciBpcyBub3QgYXV0aGVkLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhcIlVzaW5nIHVzZXIgYWNjb3VudCBmb3Igc2VydmljZSBhdXRoLi4uXCIpO1xuICAgICAgICByZXR1cm4gdXNlcl9jcmVkcy5vYXV0aDJfY2xpZW50O1xuICAgIH1cblxuICAgIGFzeW5jIGdldF9zaGVldHNfc2VydmljZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNoZWV0c19zZXJ2aWNlKSB7XG4gICAgICAgICAgICB0aGlzLnNoZWV0c19zZXJ2aWNlID0gZ29vZ2xlLnNoZWV0cyh7XG4gICAgICAgICAgICAgICAgdmVyc2lvbjogXCJ2NFwiLFxuICAgICAgICAgICAgICAgIGF1dGg6IGF3YWl0IHRoaXMuZ2V0X3ZhbGlkX2NyZWRzKCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zaGVldHNfc2VydmljZTtcbiAgICB9XG5cbiAgICBhc3luYyBnZXRfbG9naW5fc2hlZXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5sb2dpbl9zaGVldCkge1xuICAgICAgICAgICAgY29uc3QgbG9naW5fc2hlZXRfY29uZmlnOiBMb2dpblNoZWV0Q29uZmlnID0gdGhpcy5jb21iaW5lZF9jb25maWc7XG4gICAgICAgICAgICBjb25zdCBzaGVldHNfc2VydmljZSA9IGF3YWl0IHRoaXMuZ2V0X3NoZWV0c19zZXJ2aWNlKCk7XG4gICAgICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IG5ldyBMb2dpblNoZWV0KFxuICAgICAgICAgICAgICAgIHNoZWV0c19zZXJ2aWNlLFxuICAgICAgICAgICAgICAgIGxvZ2luX3NoZWV0X2NvbmZpZ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGF3YWl0IGxvZ2luX3NoZWV0LnJlZnJlc2goKTtcbiAgICAgICAgICAgIHRoaXMubG9naW5fc2hlZXQgPSBsb2dpbl9zaGVldDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5sb2dpbl9zaGVldDtcbiAgICB9XG5cbiAgICBhc3luYyBnZXRfc2Vhc29uX3NoZWV0KCkge1xuICAgICAgICBpZiAoIXRoaXMuc2Vhc29uX3NoZWV0KSB7XG4gICAgICAgICAgICBjb25zdCBzZWFzb25fc2hlZXRfY29uZmlnOiBTZWFzb25TaGVldENvbmZpZyA9IHRoaXMuY29tYmluZWRfY29uZmlnO1xuICAgICAgICAgICAgY29uc3Qgc2hlZXRzX3NlcnZpY2UgPSBhd2FpdCB0aGlzLmdldF9zaGVldHNfc2VydmljZSgpO1xuICAgICAgICAgICAgY29uc3Qgc2Vhc29uX3NoZWV0ID0gbmV3IFNlYXNvblNoZWV0KFxuICAgICAgICAgICAgICAgIHNoZWV0c19zZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHNlYXNvbl9zaGVldF9jb25maWdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLnNlYXNvbl9zaGVldCA9IHNlYXNvbl9zaGVldDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zZWFzb25fc2hlZXQ7XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0X2NvbXBfcGFzc19zaGVldCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbXBfcGFzc19zaGVldCkge1xuICAgICAgICAgICAgY29uc3QgY29uZmlnOiBDb21wUGFzc2VzQ29uZmlnID0gdGhpcy5jb21iaW5lZF9jb25maWc7XG4gICAgICAgICAgICBjb25zdCBzaGVldHNfc2VydmljZSA9IGF3YWl0IHRoaXMuZ2V0X3NoZWV0c19zZXJ2aWNlKCk7XG4gICAgICAgICAgICBjb25zdCBzZWFzb25fc2hlZXQgPSBuZXcgQ29tcFBhc3NTaGVldChzaGVldHNfc2VydmljZSwgY29uZmlnKTtcbiAgICAgICAgICAgIHRoaXMuY29tcF9wYXNzX3NoZWV0ID0gc2Vhc29uX3NoZWV0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBfcGFzc19zaGVldDtcbiAgICB9XG5cbiAgICBhc3luYyBnZXRfbWFuYWdlcl9wYXNzX3NoZWV0KCkge1xuICAgICAgICBpZiAoIXRoaXMubWFuYWdlcl9wYXNzX3NoZWV0KSB7XG4gICAgICAgICAgICBjb25zdCBjb25maWc6IE1hbmFnZXJQYXNzZXNDb25maWcgPSB0aGlzLmNvbWJpbmVkX2NvbmZpZztcbiAgICAgICAgICAgIGNvbnN0IHNoZWV0c19zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfc2hlZXRzX3NlcnZpY2UoKTtcbiAgICAgICAgICAgIGNvbnN0IHNlYXNvbl9zaGVldCA9IG5ldyBNYW5hZ2VyUGFzc1NoZWV0KHNoZWV0c19zZXJ2aWNlLCBjb25maWcpO1xuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyX3Bhc3Nfc2hlZXQgPSBzZWFzb25fc2hlZXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubWFuYWdlcl9wYXNzX3NoZWV0O1xuICAgIH1cblxuICAgIGFzeW5jIGdldF91c2VyX3NjcmlwdHNfc2VydmljZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnVzZXJfc2NyaXB0c19zZXJ2aWNlKSB7XG4gICAgICAgICAgICB0aGlzLnVzZXJfc2NyaXB0c19zZXJ2aWNlID0gZ29vZ2xlLnNjcmlwdCh7XG4gICAgICAgICAgICAgICAgdmVyc2lvbjogXCJ2MVwiLFxuICAgICAgICAgICAgICAgIGF1dGg6IGF3YWl0IHRoaXMuZ2V0X3ZhbGlkX2NyZWRzKHRydWUpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudXNlcl9zY3JpcHRzX3NlcnZpY2U7XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0X21hcHBlZF9wYXRyb2xsZXIoZm9yY2U6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBjb25zdCBwaG9uZV9sb29rdXAgPSBhd2FpdCB0aGlzLmZpbmRfcGF0cm9sbGVyX2Zyb21fbnVtYmVyKCk7XG4gICAgICAgIGlmIChwaG9uZV9sb29rdXAgPT09IHVuZGVmaW5lZCB8fCBwaG9uZV9sb29rdXAgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChmb3JjZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBmaW5kIGFzc29jaWF0ZWQgdXNlclwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBTb3JyeSwgSSBjb3VsZG4ndCBmaW5kIGFuIGFzc29jaWF0ZWQgQlZOU1AgbWVtYmVyIHdpdGggeW91ciBwaG9uZSBudW1iZXIgKCR7dGhpcy5mcm9tfSlgLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKTtcbiAgICAgICAgY29uc3QgbWFwcGVkUGF0cm9sbGVyID0gbG9naW5fc2hlZXQudHJ5X2ZpbmRfcGF0cm9sbGVyKFxuICAgICAgICAgICAgcGhvbmVfbG9va3VwLm5hbWVcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKG1hcHBlZFBhdHJvbGxlciA9PT0gXCJub3RfZm91bmRcIikge1xuICAgICAgICAgICAgaWYgKGZvcmNlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IHBhdHJvbGxlciBpbiBsb2dpbiBzaGVldFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBDb3VsZCBub3QgZmluZCBwYXRyb2xsZXIgJyR7cGhvbmVfbG9va3VwLm5hbWV9JyBpbiBsb2dpbiBzaGVldC4gUGxlYXNlIGxvb2sgYXQgdGhlIGxvZ2luIHNoZWV0IG5hbWUsIGFuZCBjb3B5IGl0IHRvIHRoZSBQaG9uZSBOdW1iZXJzIHRhYi5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1cnJlbnRfc2hlZXRfZGF0ZSA9IGxvZ2luX3NoZWV0LmN1cnJlbnRfZGF0ZTtcbiAgICAgICAgdGhpcy5wYXRyb2xsZXIgPSBtYXBwZWRQYXRyb2xsZXI7XG4gICAgfVxuXG4gICAgYXN5bmMgZmluZF9wYXRyb2xsZXJfZnJvbV9udW1iZXIoKSB7XG4gICAgICAgIGNvbnN0IHJhd19udW1iZXIgPSB0aGlzLmZyb207XG4gICAgICAgIGNvbnN0IHNoZWV0c19zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfc2hlZXRzX3NlcnZpY2UoKTtcbiAgICAgICAgY29uc3Qgb3B0czogRmluZFBhdHJvbGxlckNvbmZpZyA9IHRoaXMuY29tYmluZWRfY29uZmlnO1xuICAgICAgICBjb25zdCBudW1iZXIgPSBzYW5pdGl6ZV9waG9uZV9udW1iZXIocmF3X251bWJlcik7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgc2hlZXRzX3NlcnZpY2Uuc3ByZWFkc2hlZXRzLnZhbHVlcy5nZXQoe1xuICAgICAgICAgICAgc3ByZWFkc2hlZXRJZDogb3B0cy5TSEVFVF9JRCxcbiAgICAgICAgICAgIHJhbmdlOiBvcHRzLlBIT05FX05VTUJFUl9MT09LVVBfU0hFRVQsXG4gICAgICAgICAgICB2YWx1ZVJlbmRlck9wdGlvbjogXCJVTkZPUk1BVFRFRF9WQUxVRVwiLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhLnZhbHVlcykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGZpbmQgcGF0cm9sbGVyLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwYXRyb2xsZXIgPSByZXNwb25zZS5kYXRhLnZhbHVlc1xuICAgICAgICAgICAgLm1hcCgocm93KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmF3TnVtYmVyID1cbiAgICAgICAgICAgICAgICAgICAgcm93W2V4Y2VsX3Jvd190b19pbmRleChvcHRzLlBIT05FX05VTUJFUl9OVU1CRVJfQ09MVU1OKV07XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudE51bWJlciA9XG4gICAgICAgICAgICAgICAgICAgIHJhd051bWJlciAhPSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgICAgID8gc2FuaXRpemVfcGhvbmVfbnVtYmVyKHJhd051bWJlcilcbiAgICAgICAgICAgICAgICAgICAgICAgIDogcmF3TnVtYmVyO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnROYW1lID1cbiAgICAgICAgICAgICAgICAgICAgcm93W2V4Y2VsX3Jvd190b19pbmRleChvcHRzLlBIT05FX05VTUJFUl9OQU1FX0NPTFVNTildO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IG5hbWU6IGN1cnJlbnROYW1lLCBudW1iZXI6IGN1cnJlbnROdW1iZXIgfTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZmlsdGVyKChwYXRyb2xsZXIpID0+IHBhdHJvbGxlci5udW1iZXIgPT09IG51bWJlcilbMF07XG4gICAgICAgIHJldHVybiBwYXRyb2xsZXI7XG4gICAgfVxufVxuIiwiaW1wb3J0IFwiQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlc1wiO1xuaW1wb3J0IHtcbiAgICBDb250ZXh0LFxuICAgIFNlcnZlcmxlc3NDYWxsYmFjayxcbiAgICBTZXJ2ZXJsZXNzRXZlbnRPYmplY3QsXG4gICAgU2VydmVybGVzc0Z1bmN0aW9uU2lnbmF0dXJlLFxufSBmcm9tIFwiQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlcy90eXBlc1wiO1xuaW1wb3J0IEJWTlNQQ2hlY2tpbkhhbmRsZXIsIHsgSGFuZGxlckV2ZW50IH0gZnJvbSBcIi4vYnZuc3BfY2hlY2tpbl9oYW5kbGVyXCI7XG5pbXBvcnQgeyBIYW5kbGVyRW52aXJvbm1lbnQgfSBmcm9tIFwiLi4vZW52L2hhbmRsZXJfY29uZmlnXCI7XG5cbmNvbnN0IE5FWFRfU1RFUF9DT09LSUVfTkFNRSA9IFwiYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXBcIjtcblxuZXhwb3J0IGNvbnN0IGhhbmRsZXI6IFNlcnZlcmxlc3NGdW5jdGlvblNpZ25hdHVyZTxcbiAgICBIYW5kbGVyRW52aXJvbm1lbnQsXG4gICAgSGFuZGxlckV2ZW50XG4+ID0gYXN5bmMgZnVuY3Rpb24gKFxuICAgIGNvbnRleHQ6IENvbnRleHQ8SGFuZGxlckVudmlyb25tZW50PixcbiAgICBldmVudDogU2VydmVybGVzc0V2ZW50T2JqZWN0PEhhbmRsZXJFdmVudD4sXG4gICAgY2FsbGJhY2s6IFNlcnZlcmxlc3NDYWxsYmFja1xuKSB7XG4gICAgY29uc3QgaGFuZGxlciA9IG5ldyBCVk5TUENoZWNraW5IYW5kbGVyKGNvbnRleHQsIGV2ZW50KTtcbiAgICBsZXQgbWVzc2FnZTogc3RyaW5nO1xuICAgIGxldCBuZXh0X3N0ZXA6IHN0cmluZyA9IFwiXCI7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgaGFuZGxlcl9yZXNwb25zZSA9IGF3YWl0IGhhbmRsZXIuaGFuZGxlKCk7XG4gICAgICAgIG1lc3NhZ2UgPVxuICAgICAgICAgICAgaGFuZGxlcl9yZXNwb25zZS5yZXNwb25zZSB8fFxuICAgICAgICAgICAgXCJVbmV4cGVjdGVkIHJlc3VsdCAtIG5vIHJlc3BvbnNlIGRldGVybWluZWRcIjtcbiAgICAgICAgbmV4dF9zdGVwID0gaGFuZGxlcl9yZXNwb25zZS5uZXh0X3N0ZXAgfHwgXCJcIjtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQW4gZXJyb3Igb2NjdXJlZFwiKTtcbiAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIG1lc3NhZ2UgPSBcIkFuIHVuZXhwZWN0ZWQgZXJyb3Igb2NjdXJlZC5cIjtcbiAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgbWVzc2FnZSArPSBcIlxcblwiICsgZS5tZXNzYWdlO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvclwiLCBlLnN0YWNrKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3JcIiwgZS5uYW1lKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3JcIiwgZS5tZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHJlc3BvbnNlID0gbmV3IFR3aWxpby5SZXNwb25zZSgpO1xuICAgIGNvbnN0IHR3aW1sID0gbmV3IFR3aWxpby50d2ltbC5NZXNzYWdpbmdSZXNwb25zZSgpO1xuXG4gICAgdHdpbWwubWVzc2FnZShtZXNzYWdlKTtcblxuICAgIHJlc3BvbnNlXG4gICAgICAgIC8vIEFkZCB0aGUgc3RyaW5naWZpZWQgVHdpTUwgdG8gdGhlIHJlc3BvbnNlIGJvZHlcbiAgICAgICAgLnNldEJvZHkodHdpbWwudG9TdHJpbmcoKSlcbiAgICAgICAgLy8gU2luY2Ugd2UncmUgcmV0dXJuaW5nIFR3aU1MLCB0aGUgY29udGVudCB0eXBlIG11c3QgYmUgWE1MXG4gICAgICAgIC5hcHBlbmRIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJ0ZXh0L3htbFwiKVxuICAgICAgICAuc2V0Q29va2llKE5FWFRfU1RFUF9DT09LSUVfTkFNRSwgbmV4dF9zdGVwKTtcblxuICAgIHJldHVybiBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7XG59O1xuIiwiaW1wb3J0IHsgc2hlZXRzX3Y0IH0gZnJvbSBcImdvb2dsZWFwaXNcIjtcbmltcG9ydCB7IENvbXBQYXNzZXNDb25maWcsIE1hbmFnZXJQYXNzZXNDb25maWcgfSBmcm9tIFwiLi4vZW52L2hhbmRsZXJfY29uZmlnXCI7XG5pbXBvcnQgeyBleGNlbF9yb3dfdG9faW5kZXgsIHJvd19jb2xfdG9fZXhjZWxfaW5kZXggfSBmcm9tIFwiLi4vdXRpbHMvdXRpbFwiO1xuaW1wb3J0IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiIGZyb20gXCIuLi91dGlscy9nb29nbGVfc2hlZXRzX3NwcmVhZHNoZWV0X3RhYlwiO1xuaW1wb3J0IHsgZm9ybWF0X2RhdGVfZm9yX3NwcmVhZHNoZWV0X3ZhbHVlIH0gZnJvbSBcIi4uL3V0aWxzL2RhdGV0aW1lX3V0aWxcIjtcbmltcG9ydCB7IENvbXBQYXNzVHlwZSwgZ2V0X2NvbXBfcGFzc19kZXNjcmlwdGlvbiB9IGZyb20gXCIuLi91dGlscy9jb21wX3Bhc3Nlc1wiO1xuaW1wb3J0IHsgQlZOU1BDaGVja2luUmVzcG9uc2UgfSBmcm9tIFwiLi4vaGFuZGxlcnMvYnZuc3BfY2hlY2tpbl9oYW5kbGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBVc2VkQW5kQXZhaWxhYmxlUGFzc2VzIHtcbiAgICByb3c6IGFueVtdO1xuICAgIGluZGV4OiBudW1iZXI7XG4gICAgYXZhaWxhYmxlX3RvZGF5OiBudW1iZXI7XG4gICAgcmVtYWluaW5nX3RvZGF5OiBudW1iZXI7XG4gICAgdXNlZDogbnVtYmVyO1xuICAgIGNvbXBfcGFzc190eXBlOiBDb21wUGFzc1R5cGU7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHJvdzogYW55W10sXG4gICAgICAgIGluZGV4OiBudW1iZXIsXG4gICAgICAgIGF2YWlsYWJsZTogYW55LFxuICAgICAgICB1c2VkOiBhbnksXG4gICAgICAgIHR5cGU6IENvbXBQYXNzVHlwZVxuICAgICkge1xuICAgICAgICB0aGlzLnJvdyA9IHJvdztcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgICAgICB0aGlzLnJlbWFpbmluZ190b2RheSA9IE51bWJlcihhdmFpbGFibGUpO1xuICAgICAgICB0aGlzLnVzZWQgPSBOdW1iZXIodXNlZCk7XG4gICAgICAgIHRoaXMuYXZhaWxhYmxlX3RvZGF5ID0gdGhpcy5yZW1haW5pbmdfdG9kYXkgKyB1c2VkO1xuICAgICAgICB0aGlzLmNvbXBfcGFzc190eXBlID0gdHlwZTtcbiAgICB9XG5cbiAgICBnZXRfcHJvbXB0KCk6IEJWTlNQQ2hlY2tpblJlc3BvbnNlIHtcbiAgICAgICAgaWYgKHRoaXMuYXZhaWxhYmxlX3RvZGF5ID4gMCkge1xuICAgICAgICAgICAgbGV0IHJlc3BvbnNlOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbXBfcGFzc190eXBlID09IENvbXBQYXNzVHlwZS5Db21wUGFzcykge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gYEJhc2VkIG9uIHlvdXIgY2hlY2tpbiBmb3IgdG9kYXksIHlvdSBoYXZlIHVwIHRvICR7dGhpcy5hdmFpbGFibGVfdG9kYXl9IGNvbXAgcGFzc2VzIHlvdSBjYW4gdXNlIHRvZGF5LiBZb3UgaGF2ZSBjdXJyZW50bHkgdXNlZCAke3RoaXMudXNlZH0uIEVudGVyIHRoZSBudW1iZXIgeW91IHdvdWxkIGxpa2UgdG8gdXNlOmA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY29tcF9wYXNzX3R5cGUgPT0gQ29tcFBhc3NUeXBlLk1hbmFnZXJQYXNzKSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBgQmFzZWQgb24geW91ciBkYXlzIHRoaXMgYW5kIGxhc3Qgc2Vhc29uLCB5b3UgY3VycmVudGx5IGhhdmUgJHt0aGlzLmF2YWlsYWJsZV90b2RheX0gbWFuYWdlciBwYXNzZXMgeW91IGNhbiB1c2UgdG9kYXkuIFlvdSBoYXZlIGN1cnJlbnRseSB1c2VkICR7dGhpcy51c2VkfSB0b2RheS4gRW50ZXIgdGhlIG51bWJlciB5b3Ugd291bGQgbGlrZSB0byB1c2U6YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXNwb25zZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2U6IHJlc3BvbnNlLFxuICAgICAgICAgICAgICAgICAgICBuZXh0X3N0ZXA6IGBhd2FpdC1wYXNzLSR7dGhpcy5jb21wX3Bhc3NfdHlwZX1gLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3BvbnNlOiBgWW91IGRvIG5vdCBoYXZlIGFueSAke2dldF9jb21wX3Bhc3NfZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgdGhpcy5jb21wX3Bhc3NfdHlwZVxuICAgICAgICAgICAgKX0gYXZhaWxhYmxlIHRvZGF5YCxcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQYXNzU2hlZXQge1xuICAgIHNoZWV0OiBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYjtcbiAgICBjb21wX3Bhc3NfdHlwZTogQ29tcFBhc3NUeXBlO1xuICAgIGNvbnN0cnVjdG9yKHNoZWV0OiBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYiwgdHlwZTogQ29tcFBhc3NUeXBlKSB7XG4gICAgICAgIHRoaXMuc2hlZXQgPSBzaGVldDtcbiAgICAgICAgdGhpcy5jb21wX3Bhc3NfdHlwZSA9IHR5cGU7XG4gICAgfVxuXG4gICAgYWJzdHJhY3QgZ2V0IGF2YWlsYWJsZV9jb2x1bW4oKTogc3RyaW5nO1xuICAgIGFic3RyYWN0IGdldCB1c2VkX2NvbHVtbigpOiBzdHJpbmc7XG4gICAgYWJzdHJhY3QgZ2V0IG5hbWVfY29sdW1uKCk6IHN0cmluZztcbiAgICBhYnN0cmFjdCBnZXQgc3RhcnRfaW5kZXgoKTogbnVtYmVyO1xuICAgIGFic3RyYWN0IGdldCBzaGVldF9uYW1lKCk6IHN0cmluZztcblxuICAgIGFzeW5jIGdldF9hdmFpbGFibGVfYW5kX3VzZWRfcGFzc2VzKFxuICAgICAgICBwYXRyb2xsZXJfbmFtZTogc3RyaW5nXG4gICAgKTogUHJvbWlzZTxVc2VkQW5kQXZhaWxhYmxlUGFzc2VzIHwgbnVsbD4ge1xuICAgICAgICBjb25zdCBwYXRyb2xsZXJfcm93ID0gYXdhaXQgdGhpcy5zaGVldC5nZXRfc2hlZXRfcm93X2Zvcl9wYXRyb2xsZXIoXG4gICAgICAgICAgICBwYXRyb2xsZXJfbmFtZSxcbiAgICAgICAgICAgIHRoaXMubmFtZV9jb2x1bW5cbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHBhdHJvbGxlcl9yb3cgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY3VycmVudF9kYXlfYXZhaWxhYmxlX3Bhc3NlcyA9XG4gICAgICAgICAgICBwYXRyb2xsZXJfcm93LnJvd1tleGNlbF9yb3dfdG9faW5kZXgodGhpcy5hdmFpbGFibGVfY29sdW1uKV07XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfZGF5X3VzZWRfcGFzc2VzID1cbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cucm93W2V4Y2VsX3Jvd190b19pbmRleCh0aGlzLnVzZWRfY29sdW1uKV07XG4gICAgICAgIHJldHVybiBuZXcgVXNlZEFuZEF2YWlsYWJsZVBhc3NlcyhcbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cucm93LFxuICAgICAgICAgICAgcGF0cm9sbGVyX3Jvdy5pbmRleCxcbiAgICAgICAgICAgIGN1cnJlbnRfZGF5X2F2YWlsYWJsZV9wYXNzZXMsXG4gICAgICAgICAgICBjdXJyZW50X2RheV91c2VkX3Bhc3NlcyxcbiAgICAgICAgICAgIHRoaXMuY29tcF9wYXNzX3R5cGVcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBhc3luYyBzZXRfdXNlZF9jb21wX3Bhc3NlcyhwYXRyb2xsZXJfcm93OiBVc2VkQW5kQXZhaWxhYmxlUGFzc2VzLCBwYXNzZXNfZGVzaXJlZDogbnVtYmVyKSB7XG4gICAgICAgIGlmIChwYXRyb2xsZXJfcm93LmF2YWlsYWJsZV90b2RheSA8IHBhc3Nlc19kZXNpcmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgYE5vdCBlbm91Z2ggYXZhaWxhYmxlIHBhc3NlczogQXZhaWxhYmxlOiAke3BhdHJvbGxlcl9yb3cuYXZhaWxhYmxlX3RvZGF5fSwgVXNlZDogJHtwYXRyb2xsZXJfcm93LnVzZWR9LCBEZXNpcmVkOiAke3Bhc3Nlc19kZXNpcmVkfWBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgcm93bnVtID0gcGF0cm9sbGVyX3Jvdy5pbmRleDtcblxuICAgICAgICBjb25zdCBzdGFydF9pbmRleCA9IHRoaXMuc3RhcnRfaW5kZXg7XG4gICAgICAgIGNvbnN0IHByaW9yX2xlbmd0aCA9IHBhdHJvbGxlcl9yb3cucm93Lmxlbmd0aCAtIHN0YXJ0X2luZGV4O1xuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRfZGF0ZV9zdHJpbmcgPSBmb3JtYXRfZGF0ZV9mb3Jfc3ByZWFkc2hlZXRfdmFsdWUoXG4gICAgICAgICAgICBuZXcgRGF0ZSgpXG4gICAgICAgICk7XG4gICAgICAgIGxldCBuZXdfdmFscyA9IHBhdHJvbGxlcl9yb3cucm93XG4gICAgICAgICAgICAuc2xpY2Uoc3RhcnRfaW5kZXgpXG4gICAgICAgICAgICAubWFwKCh4KSA9PiB4Py50b1N0cmluZygpKVxuICAgICAgICAgICAgLmZpbHRlcigoeCkgPT4gIXg/LmVuZHNXaXRoKGN1cnJlbnRfZGF0ZV9zdHJpbmcpKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhc3Nlc19kZXNpcmVkOyBpKyspIHtcbiAgICAgICAgICAgIG5ld192YWxzLnB1c2goY3VycmVudF9kYXRlX3N0cmluZyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB1cGRhdGVfbGVuZ3RoID0gTWF0aC5tYXgocHJpb3JfbGVuZ3RoLCBuZXdfdmFscy5sZW5ndGgpO1xuICAgICAgICB3aGlsZSAobmV3X3ZhbHMubGVuZ3RoIDwgdXBkYXRlX2xlbmd0aCkge1xuICAgICAgICAgICAgbmV3X3ZhbHMucHVzaChcIlwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBlbmRfaW5kZXggPSBzdGFydF9pbmRleCArIHVwZGF0ZV9sZW5ndGggLSAxO1xuXG4gICAgICAgIGNvbnN0IHJhbmdlID0gYCR7dGhpcy5zaGVldC5zaGVldF9uYW1lfSEke3Jvd19jb2xfdG9fZXhjZWxfaW5kZXgoXG4gICAgICAgICAgICByb3dudW0sXG4gICAgICAgICAgICBzdGFydF9pbmRleFxuICAgICAgICApfToke3Jvd19jb2xfdG9fZXhjZWxfaW5kZXgocm93bnVtLCBlbmRfaW5kZXgpfWA7XG4gICAgICAgIGNvbnNvbGUubG9nKGBVcGRhdGluZyAke3JhbmdlfSB3aXRoICR7bmV3X3ZhbHMubGVuZ3RofSB2YWx1ZXNgKTtcbiAgICAgICAgYXdhaXQgdGhpcy5zaGVldC51cGRhdGVfdmFsdWVzKHJhbmdlLCBbbmV3X3ZhbHNdKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb21wUGFzc1NoZWV0IGV4dGVuZHMgUGFzc1NoZWV0IHtcbiAgICBjb25maWc6IENvbXBQYXNzZXNDb25maWc7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzIHwgbnVsbCxcbiAgICAgICAgY29uZmlnOiBDb21wUGFzc2VzQ29uZmlnXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgbmV3IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiKFxuICAgICAgICAgICAgICAgIHNoZWV0c19zZXJ2aWNlLFxuICAgICAgICAgICAgICAgIGNvbmZpZy5TSEVFVF9JRCxcbiAgICAgICAgICAgICAgICBjb25maWcuQ09NUF9QQVNTX1NIRUVUXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgQ29tcFBhc3NUeXBlLkNvbXBQYXNzXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgIH1cblxuICAgIGdldCBzdGFydF9pbmRleCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gZXhjZWxfcm93X3RvX2luZGV4KFxuICAgICAgICAgICAgdGhpcy5jb25maWcuQ09NUF9QQVNTX1NIRUVUX0RBVEVTX1NUQVJUSU5HX0NPTFVNTlxuICAgICAgICApO1xuICAgIH1cbiAgICBnZXQgc2hlZXRfbmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuQ09NUF9QQVNTX1NIRUVUO1xuICAgIH1cbiAgICBnZXQgYXZhaWxhYmxlX2NvbHVtbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuQ09NUF9QQVNTX1NIRUVUX0RBVEVTX0FWQUlMQUJMRV9DT0xVTU47XG4gICAgfVxuICAgIGdldCB1c2VkX2NvbHVtbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuQ09NUF9QQVNTX1NIRUVUX0RBVEVTX1VTRURfVE9EQVlfQ09MVU1OO1xuICAgIH1cbiAgICBnZXQgbmFtZV9jb2x1bW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLkNPTVBfUEFTU19TSEVFVF9OQU1FX0NPTFVNTjtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNYW5hZ2VyUGFzc1NoZWV0IGV4dGVuZHMgUGFzc1NoZWV0IHtcbiAgICBjb25maWc6IE1hbmFnZXJQYXNzZXNDb25maWc7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzIHwgbnVsbCxcbiAgICAgICAgY29uZmlnOiBNYW5hZ2VyUGFzc2VzQ29uZmlnXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgbmV3IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiKFxuICAgICAgICAgICAgICAgIHNoZWV0c19zZXJ2aWNlLFxuICAgICAgICAgICAgICAgIGNvbmZpZy5TSEVFVF9JRCxcbiAgICAgICAgICAgICAgICBjb25maWcuTUFOQUdFUl9QQVNTX1NIRUVUXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgQ29tcFBhc3NUeXBlLk1hbmFnZXJQYXNzXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgIH1cblxuICAgIGdldCBzdGFydF9pbmRleCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gZXhjZWxfcm93X3RvX2luZGV4KFxuICAgICAgICAgICAgdGhpcy5jb25maWcuTUFOQUdFUl9QQVNTX1NIRUVUX0RBVEVTX1NUQVJUSU5HX0NPTFVNTlxuICAgICAgICApO1xuICAgIH1cbiAgICBnZXQgc2hlZXRfbmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuTUFOQUdFUl9QQVNTX1NIRUVUO1xuICAgIH1cbiAgICBnZXQgYXZhaWxhYmxlX2NvbHVtbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuTUFOQUdFUl9QQVNTX1NIRUVUX0FWQUlBQkxFX0NPTFVNTjtcbiAgICB9XG4gICAgZ2V0IHVzZWRfY29sdW1uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5NQU5BR0VSX1BBU1NfU0hFRVRfVVNFRF9UT0RBWV9DT0xVTU47XG4gICAgfVxuICAgIGdldCBuYW1lX2NvbHVtbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuTUFOQUdFUl9QQVNTX1NIRUVUX05BTUVfQ09MVU1OO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IGxvb2t1cF9yb3dfY29sX2luX3NoZWV0LCBleGNlbF9yb3dfdG9faW5kZXggfSBmcm9tIFwiLi4vdXRpbHMvdXRpbFwiO1xuaW1wb3J0IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiIGZyb20gXCIuLi91dGlscy9nb29nbGVfc2hlZXRzX3NwcmVhZHNoZWV0X3RhYlwiO1xuXG5pbXBvcnQgeyBzYW5pdGl6ZV9kYXRlIH0gZnJvbSBcIi4uL3V0aWxzL2RhdGV0aW1lX3V0aWxcIjtcbmltcG9ydCB7IExvZ2luU2hlZXRDb25maWcsIFBhdHJvbGxlclJvd0NvbmZpZyB9IGZyb20gXCIuLi9lbnYvaGFuZGxlcl9jb25maWdcIjtcbmltcG9ydCB7IHNoZWV0c192NCB9IGZyb20gXCJnb29nbGVhcGlzXCI7XG5cbmV4cG9ydCB0eXBlIFBhdHJvbGxlclJvdyA9IHtcbiAgICBpbmRleDogbnVtYmVyO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBjYXRlZ29yeTogc3RyaW5nO1xuICAgIHNlY3Rpb246IHN0cmluZztcbiAgICBjaGVja2luOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dpblNoZWV0IHtcbiAgICBsb2dpbl9zaGVldDogR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWI7XG4gICAgY2hlY2tpbl9jb3VudF9zaGVldDogR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWI7XG4gICAgY29uZmlnOiBMb2dpblNoZWV0Q29uZmlnO1xuICAgIHJvd3M/OiBhbnlbXVtdIHwgbnVsbCA9IG51bGw7XG4gICAgY2hlY2tpbl9jb3VudDogbnVtYmVyIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgIGFsbG93ZWRfY2F0ZWdvcmllcyA9IFtcIkRSXCIsIFwiUFwiLCBcIkNcIl07XG4gICAgcGF0cm9sbGVyczogUGF0cm9sbGVyUm93W10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyB8IG51bGwsXG4gICAgICAgIGNvbmZpZzogTG9naW5TaGVldENvbmZpZ1xuICAgICkge1xuICAgICAgICB0aGlzLmxvZ2luX3NoZWV0ID0gbmV3IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiKFxuICAgICAgICAgICAgc2hlZXRzX3NlcnZpY2UsXG4gICAgICAgICAgICBjb25maWcuU0hFRVRfSUQsXG4gICAgICAgICAgICBjb25maWcuTE9HSU5fU0hFRVRfTE9PS1VQXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY2hlY2tpbl9jb3VudF9zaGVldCA9IG5ldyBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYihcbiAgICAgICAgICAgIHNoZWV0c19zZXJ2aWNlLFxuICAgICAgICAgICAgY29uZmlnLlNIRUVUX0lELFxuICAgICAgICAgICAgY29uZmlnLkNIRUNLSU5fQ09VTlRfTE9PS1VQXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgIH1cblxuICAgIGFzeW5jIHJlZnJlc2goKSB7XG4gICAgICAgIHRoaXMucm93cyA9IGF3YWl0IHRoaXMubG9naW5fc2hlZXQuZ2V0X3ZhbHVlcyhcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLkxPR0lOX1NIRUVUX0xPT0tVUFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmNoZWNraW5fY291bnQgPSAoYXdhaXQgdGhpcy5jaGVja2luX2NvdW50X3NoZWV0LmdldF92YWx1ZXMoXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5DSEVDS0lOX0NPVU5UX0xPT0tVUFxuICAgICAgICApKSFbMF1bMF07XG4gICAgICAgIHRoaXMucGF0cm9sbGVycyA9IHRoaXMucm93cyEubWFwKCh4LCBpKSA9PlxuICAgICAgICAgICAgdGhpcy5wYXJzZV9wYXRyb2xsZXJfcm93KGksIHgsIHRoaXMuY29uZmlnKVxuICAgICAgICApLmZpbHRlcigoeCkgPT4geCAhPSBudWxsKSBhcyBQYXRyb2xsZXJSb3dbXTtcbiAgICB9XG5cbiAgICBnZXQgYXJjaGl2ZWQoKSB7XG4gICAgICAgIGNvbnN0IGFyY2hpdmVkID0gbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQoXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5BUkNISVZFRF9DRUxMLFxuICAgICAgICAgICAgdGhpcy5yb3dzIVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgKGFyY2hpdmVkID09PSB1bmRlZmluZWQgJiYgdGhpcy5jaGVja2luX2NvdW50ID09PSAwKSB8fFxuICAgICAgICAgICAgYXJjaGl2ZWQudG9Mb3dlckNhc2UoKSA9PT0gXCJ5ZXNcIlxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldCBzaGVldF9kYXRlKCkge1xuICAgICAgICByZXR1cm4gc2FuaXRpemVfZGF0ZShcbiAgICAgICAgICAgIGxvb2t1cF9yb3dfY29sX2luX3NoZWV0KHRoaXMuY29uZmlnLlNIRUVUX0RBVEVfQ0VMTCwgdGhpcy5yb3dzISlcbiAgICAgICAgKTtcbiAgICB9XG4gICAgZ2V0IGN1cnJlbnRfZGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHNhbml0aXplX2RhdGUoXG4gICAgICAgICAgICBsb29rdXBfcm93X2NvbF9pbl9zaGVldCh0aGlzLmNvbmZpZy5DVVJSRU5UX0RBVEVfQ0VMTCwgdGhpcy5yb3dzISlcbiAgICAgICAgKTtcbiAgICB9XG4gICAgZ2V0IGlzX2N1cnJlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNoZWV0X2RhdGUuZ2V0VGltZSgpID09PSB0aGlzLmN1cnJlbnRfZGF0ZS5nZXRUaW1lKCk7XG4gICAgfVxuICAgIHRyeV9maW5kX3BhdHJvbGxlcihuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgcGF0cm9sbGVycyA9IHRoaXMucGF0cm9sbGVycy5maWx0ZXIoKHgpID0+IHgubmFtZSA9PT0gbmFtZSk7XG4gICAgICAgIGlmIChwYXRyb2xsZXJzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIFwibm90X2ZvdW5kXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhdHJvbGxlcnNbMF07XG4gICAgfVxuICAgIGZpbmRfcGF0cm9sbGVyKG5hbWU6IHN0cmluZykge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLnRyeV9maW5kX3BhdHJvbGxlcihuYW1lKTtcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gXCJub3RfZm91bmRcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZmluZCAke25hbWV9IGluIGxvZ2luIHNoZWV0YCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBnZXRfb25fZHV0eV9wYXRyb2xsZXJzKCk6IFBhdHJvbGxlclJvd1tdIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzX2N1cnJlbnQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxvZ2luIHNoZWV0IGlzIG5vdCBjdXJyZW50XCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnBhdHJvbGxlcnMuZmlsdGVyKCh4KSA9PiB4LmNoZWNraW4pO1xuICAgIH1cblxuICAgIGFzeW5jIGNoZWNraW4ocGF0cm9sbGVyX3N0YXR1czogUGF0cm9sbGVyUm93LCBuZXdfY2hlY2tpbl92YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICghdGhpcy5pc19jdXJyZW50KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJMb2dpbiBzaGVldCBpcyBub3QgY3VycmVudFwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhgRXhpc3Rpbmcgc3RhdHVzOiAke0pTT04uc3RyaW5naWZ5KHBhdHJvbGxlcl9zdGF0dXMpfWApO1xuXG4gICAgICAgIGNvbnN0IHJvdyA9IHBhdHJvbGxlcl9zdGF0dXMuaW5kZXggKyAxOyAvLyBwcm9ncmFtbWluZyAtPiBleGNlbCBsb29rdXBcbiAgICAgICAgY29uc3QgcmFuZ2UgPSBgJHt0aGlzLmNvbmZpZy5DSEVDS0lOX0RST1BET1dOX0NPTFVNTn0ke3Jvd31gO1xuXG4gICAgICAgIGF3YWl0IHRoaXMubG9naW5fc2hlZXQudXBkYXRlX3ZhbHVlcyhyYW5nZSwgW1tuZXdfY2hlY2tpbl92YWx1ZV1dKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHBhcnNlX3BhdHJvbGxlcl9yb3coXG4gICAgICAgIGluZGV4OiBudW1iZXIsXG4gICAgICAgIHJvdzogc3RyaW5nW10sXG4gICAgICAgIG9wdHM6IFBhdHJvbGxlclJvd0NvbmZpZ1xuICAgICk6IFBhdHJvbGxlclJvdyB8IG51bGwge1xuICAgICAgICBpZiAocm93Lmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBvdGVudGlhbENhdGVnb3J5ID0gU3RyaW5nKHJvd1sxXSk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgICF0aGlzLmFsbG93ZWRfY2F0ZWdvcmllcy5pbmNsdWRlcyhwb3RlbnRpYWxDYXRlZ29yeS50b1VwcGVyQ2FzZSgpKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICBuYW1lOiByb3dbZXhjZWxfcm93X3RvX2luZGV4KG9wdHMuTkFNRV9DT0xVTU4pXSxcbiAgICAgICAgICAgIGNhdGVnb3J5OiByb3dbZXhjZWxfcm93X3RvX2luZGV4KG9wdHMuQ0FURUdPUllfQ09MVU1OKV0sXG4gICAgICAgICAgICBzZWN0aW9uOiByb3dbZXhjZWxfcm93X3RvX2luZGV4KG9wdHMuU0VDVElPTl9EUk9QRE9XTl9DT0xVTU4pXSxcbiAgICAgICAgICAgIGNoZWNraW46IHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5DSEVDS0lOX0RST1BET1dOX0NPTFVNTildLFxuICAgICAgICB9O1xuICAgIH1cbn1cbiIsImltcG9ydCB7IHNoZWV0c192NCB9IGZyb20gXCJnb29nbGVhcGlzXCI7XG5pbXBvcnQge1xuICAgIFNlYXNvblNoZWV0Q29uZmlnLFxufSBmcm9tIFwiLi4vZW52L2hhbmRsZXJfY29uZmlnXCI7XG5pbXBvcnQgeyBleGNlbF9yb3dfdG9faW5kZXggfSBmcm9tIFwiLi4vdXRpbHMvdXRpbFwiO1xuaW1wb3J0IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiIGZyb20gXCIuLi91dGlscy9nb29nbGVfc2hlZXRzX3NwcmVhZHNoZWV0X3RhYlwiO1xuaW1wb3J0IHsgZmlsdGVyX2xpc3RfdG9fZW5kc3dpdGhfY3VycmVudF9kYXkgfSBmcm9tIFwiLi4vdXRpbHMvZGF0ZXRpbWVfdXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWFzb25TaGVldCB7XG4gICAgc2hlZXQ6IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiO1xuICAgIGNvbmZpZzogU2Vhc29uU2hlZXRDb25maWc7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzIHwgbnVsbCxcbiAgICAgICAgY29uZmlnOiBTZWFzb25TaGVldENvbmZpZ1xuICAgICkge1xuICAgICAgICB0aGlzLnNoZWV0ID0gbmV3IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiKFxuICAgICAgICAgICAgc2hlZXRzX3NlcnZpY2UsXG4gICAgICAgICAgICBjb25maWcuU0hFRVRfSUQsXG4gICAgICAgICAgICBjb25maWcuU0VBU09OX1NIRUVUXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgIH1cblxuICAgIGFzeW5jIGdldF9wYXRyb2xsZWRfZGF5cyhcbiAgICAgICAgcGF0cm9sbGVyX25hbWU6IHN0cmluZ1xuICAgICk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgICAgIGNvbnN0IHBhdHJvbGxlcl9yb3cgPSBhd2FpdCB0aGlzLnNoZWV0LmdldF9zaGVldF9yb3dfZm9yX3BhdHJvbGxlcihcbiAgICAgICAgICAgIHBhdHJvbGxlcl9uYW1lLFxuICAgICAgICAgICAgdGhpcy5jb25maWcuU0VBU09OX1NIRUVUX05BTUVfQ09MVU1OXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKCFwYXRyb2xsZXJfcm93KSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjdXJyZW50TnVtYmVyID1cbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cucm93W2V4Y2VsX3Jvd190b19pbmRleCh0aGlzLmNvbmZpZy5TRUFTT05fU0hFRVRfREFZU19DT0xVTU4pXTtcblxuICAgICAgICBjb25zdCBjdXJyZW50RGF5ID0gZmlsdGVyX2xpc3RfdG9fZW5kc3dpdGhfY3VycmVudF9kYXkocGF0cm9sbGVyX3Jvdy5yb3cpXG4gICAgICAgICAgICAubWFwKCh4KSA9PiAoeD8uc3RhcnRzV2l0aChcIkhcIikgPyAwLjUgOiAxKSlcbiAgICAgICAgICAgIC5yZWR1Y2UoKHgsIHksIGkpID0+IHggKyB5LCAwKTtcblxuICAgICAgICBjb25zdCBkYXlzQmVmb3JlVG9kYXkgPSBjdXJyZW50TnVtYmVyIC0gY3VycmVudERheTtcbiAgICAgICAgcmV0dXJuIGRheXNCZWZvcmVUb2RheTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBnb29nbGUgfSBmcm9tIFwiZ29vZ2xlYXBpc1wiO1xuaW1wb3J0IHsgR2VuZXJhdGVBdXRoVXJsT3B0cyB9IGZyb20gXCJnb29nbGUtYXV0aC1saWJyYXJ5XCI7XG5pbXBvcnQgeyBPQXV0aDJDbGllbnQgfSBmcm9tIFwiZ29vZ2xlYXBpcy1jb21tb25cIjtcbmltcG9ydCB7IHNhbml0aXplX3Bob25lX251bWJlciB9IGZyb20gXCIuL3V0aWxzL3V0aWxcIjtcbmltcG9ydCB7IGxvYWRfY3JlZGVudGlhbHNfZmlsZXMgfSBmcm9tIFwiLi91dGlscy9maWxlX3V0aWxzXCI7XG5pbXBvcnQgeyBTZXJ2aWNlQ29udGV4dCB9IGZyb20gXCJAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzL3R5cGVzXCI7XG5pbXBvcnQgeyBVc2VyQ3JlZHNDb25maWcgfSBmcm9tIFwiLi9lbnYvaGFuZGxlcl9jb25maWdcIjtcbmltcG9ydCB7IHZhbGlkYXRlX3Njb3BlcyB9IGZyb20gXCIuL3V0aWxzL3Njb3BlX3V0aWxcIjtcblxuY29uc3QgU0NPUEVTID0gW1xuICAgIFwiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9zY3JpcHQucHJvamVjdHNcIixcbiAgICBcImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvc3ByZWFkc2hlZXRzXCIsXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyQ3JlZHMge1xuICAgIG51bWJlcjogc3RyaW5nO1xuICAgIG9hdXRoMl9jbGllbnQ6IE9BdXRoMkNsaWVudDtcbiAgICBzeW5jX2NsaWVudDogU2VydmljZUNvbnRleHQ7XG4gICAgZG9tYWluPzogc3RyaW5nO1xuICAgIGxvYWRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBzeW5jX2NsaWVudDogU2VydmljZUNvbnRleHQsXG4gICAgICAgIG51bWJlcjogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgICAgICBvcHRzOiBVc2VyQ3JlZHNDb25maWdcbiAgICApIHtcbiAgICAgICAgaWYgKG51bWJlciA9PT0gdW5kZWZpbmVkIHx8IG51bWJlciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTnVtYmVyIGlzIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm51bWJlciA9IHNhbml0aXplX3Bob25lX251bWJlcihudW1iZXIpO1xuXG4gICAgICAgIGNvbnN0IGNyZWRlbnRpYWxzID0gbG9hZF9jcmVkZW50aWFsc19maWxlcygpO1xuICAgICAgICBjb25zdCB7IGNsaWVudF9zZWNyZXQsIGNsaWVudF9pZCwgcmVkaXJlY3RfdXJpcyB9ID0gY3JlZGVudGlhbHMud2ViO1xuICAgICAgICB0aGlzLm9hdXRoMl9jbGllbnQgPSBuZXcgZ29vZ2xlLmF1dGguT0F1dGgyKFxuICAgICAgICAgICAgY2xpZW50X2lkLFxuICAgICAgICAgICAgY2xpZW50X3NlY3JldCxcbiAgICAgICAgICAgIHJlZGlyZWN0X3VyaXNbMF1cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zeW5jX2NsaWVudCA9IHN5bmNfY2xpZW50O1xuICAgICAgICBsZXQgZG9tYWluID0gb3B0cy5OU1BfRU1BSUxfRE9NQUlOO1xuICAgICAgICBpZiAoZG9tYWluID09PSB1bmRlZmluZWQgfHwgZG9tYWluID09PSBudWxsIHx8IGRvbWFpbiA9PT0gXCJcIikge1xuICAgICAgICAgICAgZG9tYWluID0gdW5kZWZpbmVkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kb21haW4gPSBkb21haW47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBsb2FkVG9rZW4oKSB7XG4gICAgICAgIGlmICghdGhpcy5sb2FkZWQpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYExvb2tpbmcgZm9yICR7dGhpcy50b2tlbl9rZXl9YCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2F1dGgyRG9jID0gYXdhaXQgdGhpcy5zeW5jX2NsaWVudFxuICAgICAgICAgICAgICAgICAgICAuZG9jdW1lbnRzKHRoaXMudG9rZW5fa2V5KVxuICAgICAgICAgICAgICAgICAgICAuZmV0Y2goKTtcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIG9hdXRoMkRvYyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgICAgIG9hdXRoMkRvYy5kYXRhID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgICAgICBvYXV0aDJEb2MuZGF0YS50b2tlbiA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBEaWRuJ3QgZmluZCAke3RoaXMudG9rZW5fa2V5fWApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRva2VuID0gb2F1dGgyRG9jLmRhdGEudG9rZW47XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlX3Njb3BlcyhvYXV0aDJEb2MuZGF0YS5zY29wZXMsIFNDT1BFUyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2F1dGgyX2NsaWVudC5zZXRDcmVkZW50aWFscyh0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBMb2FkZWQgdG9rZW4gJHt0aGlzLnRva2VuX2tleX1gKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICAgICAgYEZhaWxlZCB0byBsb2FkIHRva2VuIGZvciAke3RoaXMudG9rZW5fa2V5fS5cXG4gJHtlfWBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRlZDtcbiAgICB9XG5cbiAgICBnZXQgdG9rZW5fa2V5KCkge1xuICAgICAgICByZXR1cm4gYG9hdXRoMl8ke3RoaXMubnVtYmVyfWA7XG4gICAgfVxuXG4gICAgYXN5bmMgZGVsZXRlVG9rZW4oKSB7XG4gICAgICAgIGNvbnN0IG9hdXRoMkRvYyA9IGF3YWl0IHRoaXMuc3luY19jbGllbnRcbiAgICAgICAgICAgIC5kb2N1bWVudHModGhpcy50b2tlbl9rZXkpXG4gICAgICAgICAgICAuZmV0Y2goKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgb2F1dGgyRG9jID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIG9hdXRoMkRvYy5kYXRhID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgb2F1dGgyRG9jLmRhdGEudG9rZW4gPT09IHVuZGVmaW5lZFxuICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBEaWRuJ3QgZmluZCAke3RoaXMudG9rZW5fa2V5fWApO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHRoaXMuc3luY19jbGllbnQuZG9jdW1lbnRzKG9hdXRoMkRvYy5zaWQpLnJlbW92ZSgpO1xuICAgICAgICBjb25zb2xlLmxvZyhgRGVsZXRlZCB0b2tlbiAke3RoaXMudG9rZW5fa2V5fWApO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBhc3luYyBjb21wbGV0ZUxvZ2luKGNvZGU6IHN0cmluZywgc2NvcGVzOiBzdHJpbmdbXSkge1xuICAgICAgICB2YWxpZGF0ZV9zY29wZXMoc2NvcGVzLCBTQ09QRVMpO1xuICAgICAgICBjb25zdCB0b2tlbiA9IGF3YWl0IHRoaXMub2F1dGgyX2NsaWVudC5nZXRUb2tlbihjb2RlKTtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoT2JqZWN0LmtleXModG9rZW4ucmVzISkpKTtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodG9rZW4udG9rZW5zKSk7XG4gICAgICAgIHRoaXMub2F1dGgyX2NsaWVudC5zZXRDcmVkZW50aWFscyh0b2tlbi50b2tlbnMpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3Qgb2F1dGhEb2MgPSBhd2FpdCB0aGlzLnN5bmNfY2xpZW50LmRvY3VtZW50cy5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6IHsgdG9rZW46IHRva2VuLnRva2Vucywgc2NvcGVzOiBzY29wZXMgfSxcbiAgICAgICAgICAgICAgICB1bmlxdWVOYW1lOiB0aGlzLnRva2VuX2tleSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICBgRXhjZXB0aW9uIHdoZW4gY3JlYXRpbmcgb2F1dGguIFRyeWluZyB0byB1cGRhdGUgaW5zdGVhZC4uLlxcbiR7ZX1gXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29uc3Qgb2F1dGhEb2MgPSBhd2FpdCB0aGlzLnN5bmNfY2xpZW50XG4gICAgICAgICAgICAgICAgLmRvY3VtZW50cyh0aGlzLnRva2VuX2tleSlcbiAgICAgICAgICAgICAgICAudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogeyB0b2tlbjogdG9rZW4sIHNjb3Blczogc2NvcGVzIH0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBnZXRBdXRoVXJsKCkge1xuICAgICAgICBjb25zdCBpZCA9IHRoaXMuZ2VuZXJhdGVSYW5kb21TdHJpbmcoKTtcbiAgICAgICAgY29uc29sZS5sb2coYFVzaW5nIG5vbmNlICR7aWR9IGZvciAke3RoaXMubnVtYmVyfWApO1xuICAgICAgICBjb25zdCBkb2MgPSBhd2FpdCB0aGlzLnN5bmNfY2xpZW50LmRvY3VtZW50cy5jcmVhdGUoe1xuICAgICAgICAgICAgZGF0YTogeyBudW1iZXI6IHRoaXMubnVtYmVyLCBzY29wZXM6IFNDT1BFUyB9LFxuICAgICAgICAgICAgdW5pcXVlTmFtZTogaWQsXG4gICAgICAgICAgICB0dGw6IDYwICogNSwgLy8gNSBtaW51dGVzXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhgTWFkZSBub25jZS1kb2M6ICR7SlNPTi5zdHJpbmdpZnkoZG9jKX1gKTtcblxuICAgICAgICBjb25zdCBvcHRzOiBHZW5lcmF0ZUF1dGhVcmxPcHRzID0ge1xuICAgICAgICAgICAgYWNjZXNzX3R5cGU6IFwib2ZmbGluZVwiLFxuICAgICAgICAgICAgc2NvcGU6IFNDT1BFUyxcbiAgICAgICAgICAgIHN0YXRlOiBpZCxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMuZG9tYWluKSB7XG4gICAgICAgICAgICBvcHRzW1wiaGRcIl0gPSB0aGlzLmRvbWFpbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGF1dGhVcmwgPSB0aGlzLm9hdXRoMl9jbGllbnQuZ2VuZXJhdGVBdXRoVXJsKG9wdHMpO1xuICAgICAgICByZXR1cm4gYXV0aFVybDtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZVJhbmRvbVN0cmluZygpIHtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gMzA7XG4gICAgICAgIGxldCByZXN1bHQgPSBcIlwiO1xuICAgICAgICBjb25zdCBjaGFyYWN0ZXJzID1cbiAgICAgICAgICAgIFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODlcIjtcbiAgICAgICAgY29uc3QgY2hhcmFjdGVyc0xlbmd0aCA9IGNoYXJhY3RlcnMubGVuZ3RoO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gY2hhcmFjdGVycy5jaGFyQXQoXG4gICAgICAgICAgICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hhcmFjdGVyc0xlbmd0aClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5cbmV4cG9ydCB7IFVzZXJDcmVkcywgU0NPUEVTIGFzIFVzZXJDcmVkc1Njb3BlcyB9O1xuIiwiY2xhc3MgQ2hlY2tpblZhbHVlIHtcbiAgICBrZXk6IHN0cmluZztcbiAgICBzaGVldHNfdmFsdWU6IHN0cmluZztcbiAgICBzbXNfZGVzYzogc3RyaW5nO1xuICAgIGZhc3RfY2hlY2tpbnM6IHN0cmluZ1tdO1xuICAgIGxvb2t1cF92YWx1ZXM6IFNldDxzdHJpbmc+O1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBrZXk6IHN0cmluZyxcbiAgICAgICAgc2hlZXRzX3ZhbHVlOiBzdHJpbmcsXG4gICAgICAgIHNtc19kZXNjOiBzdHJpbmcsXG4gICAgICAgIGZhc3RfY2hlY2tpbnM6IHN0cmluZyB8IHN0cmluZ1tdXG4gICAgKSB7XG4gICAgICAgIGlmICghKGZhc3RfY2hlY2tpbnMgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgICAgICAgIGZhc3RfY2hlY2tpbnMgPSBbZmFzdF9jaGVja2luc107XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgICAgIHRoaXMuc2hlZXRzX3ZhbHVlID0gc2hlZXRzX3ZhbHVlO1xuICAgICAgICB0aGlzLnNtc19kZXNjID0gc21zX2Rlc2M7XG4gICAgICAgIHRoaXMuZmFzdF9jaGVja2lucyA9IGZhc3RfY2hlY2tpbnMubWFwKCh4KSA9PiB4LnRyaW0oKS50b0xvd2VyQ2FzZSgpKTtcblxuICAgICAgICBjb25zdCBzbXNfZGVzY19zcGxpdDogc3RyaW5nW10gPSBzbXNfZGVzY1xuICAgICAgICAgICAgLnJlcGxhY2UoL1xccysvLCBcIi1cIilcbiAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICAuc3BsaXQoXCIvXCIpO1xuICAgICAgICBjb25zdCBsb29rdXBfdmFscyA9IFsuLi50aGlzLmZhc3RfY2hlY2tpbnMsIC4uLnNtc19kZXNjX3NwbGl0XTtcbiAgICAgICAgdGhpcy5sb29rdXBfdmFsdWVzID0gbmV3IFNldDxzdHJpbmc+KGxvb2t1cF92YWxzKTtcbiAgICB9XG59XG5cbmNsYXNzIENoZWNraW5WYWx1ZXMge1xuICAgIGJ5X2tleTogeyBba2V5OiBzdHJpbmddOiBDaGVja2luVmFsdWUgfSA9IHt9O1xuICAgIGJ5X2x2OiB7IFtrZXk6IHN0cmluZ106IENoZWNraW5WYWx1ZSB9ID0ge307XG4gICAgYnlfZmM6IHsgW2tleTogc3RyaW5nXTogQ2hlY2tpblZhbHVlIH0gPSB7fTtcbiAgICBieV9zaGVldF9zdHJpbmc6IHsgW2tleTogc3RyaW5nXTogQ2hlY2tpblZhbHVlIH0gPSB7fTtcbiAgICBjb25zdHJ1Y3RvcihjaGVja2luVmFsdWVzOiBDaGVja2luVmFsdWVbXSkge1xuICAgICAgICBmb3IgKHZhciBjaGVja2luVmFsdWUgb2YgY2hlY2tpblZhbHVlcyl7XG4gICAgICAgICAgICB0aGlzLmJ5X2tleVtjaGVja2luVmFsdWUua2V5XSA9IGNoZWNraW5WYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuYnlfc2hlZXRfc3RyaW5nW2NoZWNraW5WYWx1ZS5zaGVldHNfdmFsdWVdID0gY2hlY2tpblZhbHVlO1xuICAgICAgICAgICAgZm9yIChjb25zdCBsdiBvZiBjaGVja2luVmFsdWUubG9va3VwX3ZhbHVlcykge1xuICAgICAgICAgICAgICAgIHRoaXMuYnlfbHZbbHZdID0gY2hlY2tpblZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCBmYyBvZiBjaGVja2luVmFsdWUuZmFzdF9jaGVja2lucykge1xuICAgICAgICAgICAgICAgIHRoaXMuYnlfZmNbZmNdID0gY2hlY2tpblZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVudHJpZXMoKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuZW50cmllcyh0aGlzLmJ5X2tleSk7XG4gICAgfVxuXG4gICAgcGFyc2VfZmFzdF9jaGVja2luKGJvZHk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5ieV9mY1tib2R5XTtcbiAgICB9XG5cbiAgICBwYXJzZV9jaGVja2luKGJvZHk6IHN0cmluZykge1xuICAgICAgICBjb25zdCBjaGVja2luX2xvd2VyID0gYm9keS5yZXBsYWNlKC9cXHMrLywgXCJcIik7XG4gICAgICAgIHJldHVybiB0aGlzLmJ5X2x2W2NoZWNraW5fbG93ZXJdO1xuICAgIH1cbn1cblxuZXhwb3J0IHtDaGVja2luVmFsdWUsIENoZWNraW5WYWx1ZXN9IiwiXG5leHBvcnQgZW51bSBDb21wUGFzc1R5cGUge1xuICAgIENvbXBQYXNzID0gXCJjb21wLXBhc3NcIixcbiAgICBNYW5hZ2VyUGFzcyA9IFwibWFuYWdlci1wYXNzXCIsXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRfY29tcF9wYXNzX2Rlc2NyaXB0aW9uKHR5cGU6IENvbXBQYXNzVHlwZSkge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIENvbXBQYXNzVHlwZS5Db21wUGFzczpcbiAgICAgICAgICAgIHJldHVybiBcIkNvbXAgUGFzc1wiO1xuICAgICAgICBjYXNlIENvbXBQYXNzVHlwZS5NYW5hZ2VyUGFzczpcbiAgICAgICAgICAgIHJldHVybiBcIk1hbmFnZXIgUGFzc1wiO1xuICAgIH1cbiAgICByZXR1cm4gXCJcIjtcbn1cbiIsImZ1bmN0aW9uIGV4Y2VsX2RhdGVfdG9fanNfZGF0ZShkYXRlOiBudW1iZXIpIHtcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgRGF0ZSgwKTtcbiAgICByZXN1bHQuc2V0VVRDTWlsbGlzZWNvbmRzKE1hdGgucm91bmQoKGRhdGUgLSAyNTU2OSkgKiA4NjQwMCAqIDEwMDApKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBjaGFuZ2VfdGltZXpvbmVfdG9fcHN0KGRhdGU6IERhdGUpIHtcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgRGF0ZShkYXRlLnRvVVRDU3RyaW5nKCkucmVwbGFjZShcIiBHTVRcIiwgXCIgUFNUXCIpKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBzdHJpcF9kYXRldGltZV90b19kYXRlKGRhdGU6IERhdGUpIHtcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgRGF0ZShcbiAgICAgICAgZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoXCJlbi1VU1wiLCB7IHRpbWVab25lOiBcIkFtZXJpY2EvTG9zX0FuZ2VsZXNcIiB9KVxuICAgICk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gc2FuaXRpemVfZGF0ZShkYXRlOiBudW1iZXIpIHtcbiAgICBjb25zdCByZXN1bHQgPSBzdHJpcF9kYXRldGltZV90b19kYXRlKFxuICAgICAgICBjaGFuZ2VfdGltZXpvbmVfdG9fcHN0KGV4Y2VsX2RhdGVfdG9fanNfZGF0ZShkYXRlKSlcbiAgICApO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdF9kYXRlX2Zvcl9zcHJlYWRzaGVldF92YWx1ZShkYXRlOiBEYXRlKSB7XG4gICAgY29uc3QgZGF0ZXN0ciA9IGRhdGVcbiAgICAgICAgLnRvTG9jYWxlRGF0ZVN0cmluZygpXG4gICAgICAgIC5zcGxpdChcIi9cIilcbiAgICAgICAgLm1hcCgoeCkgPT4geC5wYWRTdGFydCgyLCBcIjBcIikpXG4gICAgICAgIC5qb2luKFwiXCIpO1xuICAgIHJldHVybiBkYXRlc3RyO1xufVxuXG5mdW5jdGlvbiBmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9kYXRlKGxpc3Q6IGFueVtdLCBkYXRlOiBEYXRlKSB7XG4gICAgY29uc3QgZGF0ZXN0ciA9IGZvcm1hdF9kYXRlX2Zvcl9zcHJlYWRzaGVldF92YWx1ZShkYXRlKTtcbiAgICByZXR1cm4gbGlzdC5tYXAoKHgpID0+IHg/LnRvU3RyaW5nKCkpLmZpbHRlcigoeCkgPT4geD8uZW5kc1dpdGgoZGF0ZXN0cikpO1xufVxuXG5mdW5jdGlvbiBmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9jdXJyZW50X2RheShsaXN0OiBhbnlbXSkge1xuICAgIHJldHVybiBmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9kYXRlKGxpc3QsIG5ldyBEYXRlKCkpO1xufVxuXG5leHBvcnQge1xuICAgIHNhbml0aXplX2RhdGUsXG4gICAgZXhjZWxfZGF0ZV90b19qc19kYXRlLFxuICAgIGNoYW5nZV90aW1lem9uZV90b19wc3QsXG4gICAgc3RyaXBfZGF0ZXRpbWVfdG9fZGF0ZSxcbiAgICBmb3JtYXRfZGF0ZV9mb3Jfc3ByZWFkc2hlZXRfdmFsdWUsXG4gICAgZmlsdGVyX2xpc3RfdG9fZW5kc3dpdGhfZGF0ZSxcbiAgICBmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9jdXJyZW50X2RheSxcbn07XG4iLCJpbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCAnQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlcyc7XG5mdW5jdGlvbiBsb2FkX2NyZWRlbnRpYWxzX2ZpbGVzKCkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKFxuICAgICAgICBmc1xuICAgICAgICAgICAgLnJlYWRGaWxlU3luYyhSdW50aW1lLmdldEFzc2V0cygpW1wiL2NyZWRlbnRpYWxzLmpzb25cIl0ucGF0aClcbiAgICAgICAgICAgIC50b1N0cmluZygpXG4gICAgKTtcbn1cbmZ1bmN0aW9uIGdldF9zZXJ2aWNlX2NyZWRlbnRpYWxzX3BhdGgoKSB7XG4gICAgcmV0dXJuIFJ1bnRpbWUuZ2V0QXNzZXRzKClbXCIvc2VydmljZS1jcmVkZW50aWFscy5qc29uXCJdLnBhdGg7XG59XG5leHBvcnQgeyBsb2FkX2NyZWRlbnRpYWxzX2ZpbGVzLCBnZXRfc2VydmljZV9jcmVkZW50aWFsc19wYXRoIH07XG4iLCJpbXBvcnQgeyBzaGVldHNfdjQgfSBmcm9tIFwiZ29vZ2xlYXBpc1wiO1xuaW1wb3J0IHsgZXhjZWxfcm93X3RvX2luZGV4IH0gZnJvbSBcIi4vdXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYiB7XG4gICAgc2hlZXRzX3NlcnZpY2U6IHNoZWV0c192NC5TaGVldHMgfCBudWxsO1xuICAgIHNoZWV0X2lkOiBzdHJpbmc7XG4gICAgc2hlZXRfbmFtZTogc3RyaW5nO1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyB8IG51bGwsXG4gICAgICAgIHNoZWV0X2lkOiBzdHJpbmcsXG4gICAgICAgIHNoZWV0X25hbWU6IHN0cmluZ1xuICAgICkge1xuICAgICAgICB0aGlzLnNoZWV0c19zZXJ2aWNlID0gc2hlZXRzX3NlcnZpY2U7XG4gICAgICAgIHRoaXMuc2hlZXRfaWQgPSBzaGVldF9pZDtcbiAgICAgICAgdGhpcy5zaGVldF9uYW1lID0gc2hlZXRfbmFtZS5zcGxpdChcIiFcIilbMF07XG4gICAgfVxuICAgIGFzeW5jIGdldF92YWx1ZXMocmFuZ2U/OiBzdHJpbmcgfCBudWxsKTogUHJvbWlzZTxhbnlbXVtdIHwgdW5kZWZpbmVkPiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2dldF92YWx1ZXMocmFuZ2UpO1xuICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGEudmFsdWVzID8/IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBhc3luYyBnZXRfc2hlZXRfcm93X2Zvcl9wYXRyb2xsZXIoXG4gICAgICAgIHBhdHJvbGxlcl9uYW1lOiBzdHJpbmcsXG4gICAgICAgIG5hbWVfY29sdW1uOiBzdHJpbmcsXG4gICAgICAgIHJhbmdlPzogc3RyaW5nfG51bGxcbiAgICApOiBQcm9taXNlPHsgcm93OiBhbnlbXTsgaW5kZXg6IG51bWJlcjsgfSB8IG51bGw+IHtcbiAgICAgICAgY29uc3Qgcm93cyA9IGF3YWl0IHRoaXMuZ2V0X3ZhbHVlcyhyYW5nZSk7XG4gICAgICAgIGlmKHJvd3Mpe1xuICAgICAgICAgICAgY29uc3QgbG9va3VwX2luZGV4ID0gZXhjZWxfcm93X3RvX2luZGV4KG5hbWVfY29sdW1uKTtcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCByb3dzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBpZihyb3dzW2ldW2xvb2t1cF9pbmRleF0gPT09IHBhdHJvbGxlcl9uYW1lKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtyb3c6IHJvd3NbaV0sIGluZGV4OiBpfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICBgQ291bGRuJ3QgZmluZCBwYXRyb2xsZXIgJHtwYXRyb2xsZXJfbmFtZX0gaW4gc2hlZXQgJHt0aGlzLnNoZWV0X25hbWV9LmBcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIFxuICAgIGFzeW5jIHVwZGF0ZV92YWx1ZXMocmFuZ2U6IHN0cmluZywgdmFsdWVzOiBhbnlbXVtdKSB7XG4gICAgICAgIGNvbnN0IHVwZGF0ZU1lID0gKGF3YWl0IHRoaXMuX2dldF92YWx1ZXMocmFuZ2UsIG51bGwpKS5kYXRhO1xuXG4gICAgICAgIHVwZGF0ZU1lLnZhbHVlcyA9IHZhbHVlcztcbiAgICAgICAgYXdhaXQgdGhpcy5zaGVldHNfc2VydmljZSEuc3ByZWFkc2hlZXRzLnZhbHVlcy51cGRhdGUoe1xuICAgICAgICAgICAgc3ByZWFkc2hlZXRJZDogdGhpcy5zaGVldF9pZCxcbiAgICAgICAgICAgIHZhbHVlSW5wdXRPcHRpb246IFwiVVNFUl9FTlRFUkVEXCIsXG4gICAgICAgICAgICByYW5nZTogdXBkYXRlTWUucmFuZ2UhLFxuICAgICAgICAgICAgcmVxdWVzdEJvZHk6IHVwZGF0ZU1lLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIF9nZXRfdmFsdWVzKFxuICAgICAgICByYW5nZT86IHN0cmluZyB8IG51bGwsXG4gICAgICAgIHZhbHVlUmVuZGVyT3B0aW9uOiBzdHJpbmcgfCBudWxsID0gXCJVTkZPUk1BVFRFRF9WQUxVRVwiXG4gICAgKSB7XG4gICAgICAgIGxldCBsb29rdXBSYW5nZSA9IHRoaXMuc2hlZXRfbmFtZTtcbiAgICAgICAgaWYgKHJhbmdlICE9IG51bGwpIHtcbiAgICAgICAgICAgIGxvb2t1cFJhbmdlID0gbG9va3VwUmFuZ2UgKyBcIiFcIjtcblxuICAgICAgICAgICAgaWYgKHJhbmdlLnN0YXJ0c1dpdGgobG9va3VwUmFuZ2UpKSB7XG4gICAgICAgICAgICAgICAgcmFuZ2UgPSByYW5nZS5zdWJzdHJpbmcobG9va3VwUmFuZ2UubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvb2t1cFJhbmdlID0gbG9va3VwUmFuZ2UgKyByYW5nZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgb3B0czogc2hlZXRzX3Y0LlBhcmFtcyRSZXNvdXJjZSRTcHJlYWRzaGVldHMkVmFsdWVzJEdldCA9IHtcbiAgICAgICAgICAgIHNwcmVhZHNoZWV0SWQ6IHRoaXMuc2hlZXRfaWQsXG4gICAgICAgICAgICByYW5nZTogbG9va3VwUmFuZ2UsXG4gICAgICAgIH07XG4gICAgICAgIGlmICh2YWx1ZVJlbmRlck9wdGlvbikge1xuICAgICAgICAgICAgb3B0cy52YWx1ZVJlbmRlck9wdGlvbiA9IHZhbHVlUmVuZGVyT3B0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuc2hlZXRzX3NlcnZpY2UhLnNwcmVhZHNoZWV0cy52YWx1ZXMuZ2V0KG9wdHMpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cbiIsIlxuZnVuY3Rpb24gdmFsaWRhdGVfc2NvcGVzKHNjb3Blczogc3RyaW5nW10sIGRlc2lyZWRfc2NvcGVzOiBzdHJpbmdbXSkge1xuICAgIGZvciAoY29uc3QgZGVzaXJlZF9zY29wZSBvZiBkZXNpcmVkX3Njb3Blcykge1xuICAgICAgICBpZiAoc2NvcGVzID09PSB1bmRlZmluZWQgfHwgIXNjb3Blcy5pbmNsdWRlcyhkZXNpcmVkX3Njb3BlKSkge1xuICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBgTWlzc2luZyBzY29wZSAke2Rlc2lyZWRfc2NvcGV9IGluIHJlY2VpdmVkIHNjb3BlczogJHtzY29wZXN9YDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQge3ZhbGlkYXRlX3Njb3Blc30iLCJmdW5jdGlvbiByb3dfY29sX3RvX2V4Y2VsX2luZGV4KHJvdzogbnVtYmVyLCBjb2w6IG51bWJlcil7XG4gICAgbGV0IGNvbFN0cmluZyA9IFwiXCI7XG4gICAgY29sKz0xO1xuICAgIHdoaWxlKGNvbCA+IDApe1xuICAgICAgICBjb2wtPTE7XG4gICAgICAgIGNvbnN0IG1vZHVsbyA9IGNvbCAlIDI2O1xuICAgICAgICBjb25zdCBjb2xMZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKCdBJy5jaGFyQ29kZUF0KDApICsgbW9kdWxvKTtcbiAgICAgICAgY29sU3RyaW5nID0gY29sTGV0dGVyICsgY29sU3RyaW5nO1xuICAgICAgICBjb2wgPSBNYXRoLmZsb29yKGNvbCAvIDI2KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbFN0cmluZyArIChyb3crMSkudG9TdHJpbmcoKTtcbn1cblxuZnVuY3Rpb24gc3BsaXRfdG9fcm93X2NvbChleGNlbF9pbmRleDogc3RyaW5nKSB7XG4gICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKFwiXihbQS1aYS16XSspKFswLTldKykkXCIpO1xuICAgIGNvbnN0IG1hdGNoID0gcmVnZXguZXhlYyhleGNlbF9pbmRleCk7XG4gICAgaWYgKG1hdGNoID09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIHBhcnNlIHN0cmluZyBmb3IgZXhjZWwgcG9zaXRpb24gc3BsaXRcIik7XG4gICAgfVxuICAgIGNvbnN0IGNvbCA9IGV4Y2VsX3Jvd190b19pbmRleChtYXRjaFsxXSk7XG4gICAgY29uc3QgcmF3X3JvdyA9IE51bWJlcihtYXRjaFsyXSk7XG4gICAgaWYgKHJhd19yb3cgPCAxKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlJvdyBtdXN0IGJlID49MVwiKTtcbiAgICB9XG4gICAgcmV0dXJuIFtyYXdfcm93IC0gMSwgY29sXTtcbn1cblxuZnVuY3Rpb24gbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQoZXhjZWxfaW5kZXg6IHN0cmluZywgc2hlZXQ6IGFueVtdW10pIHtcbiAgICBjb25zdCBbcm93LCBjb2xdID0gc3BsaXRfdG9fcm93X2NvbChleGNlbF9pbmRleCk7XG4gICAgaWYgKHJvdyA+PSBzaGVldC5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIHNoZWV0W3Jvd11bY29sXTtcbn1cblxuZnVuY3Rpb24gZXhjZWxfcm93X3RvX2luZGV4KGxldHRlcnM6IHN0cmluZyk6bnVtYmVyIHtcbiAgICBjb25zdCBsb3dlckxldHRlcnMgPSBsZXR0ZXJzLnRvTG93ZXJDYXNlKCk7XG4gICAgbGV0IHJlc3VsdDogbnVtYmVyID0gMDtcbiAgICBmb3IgKHZhciBwID0gMDsgcCA8IGxvd2VyTGV0dGVycy5sZW5ndGg7IHArKykge1xuICAgICAgICBjb25zdCBjaGFyYWN0ZXJWYWx1ZSA9XG4gICAgICAgICAgICBsb3dlckxldHRlcnMuY2hhckNvZGVBdChwKSAtIFwiYVwiLmNoYXJDb2RlQXQoMCkgKyAxO1xuICAgICAgICByZXN1bHQgPSBjaGFyYWN0ZXJWYWx1ZSArIHJlc3VsdCAqIDI2O1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0IC0gMTtcbn1cblxuZnVuY3Rpb24gc2FuaXRpemVfcGhvbmVfbnVtYmVyKG51bWJlcjogbnVtYmVyIHwgc3RyaW5nKSB7XG4gICAgbGV0IG5ld19udW1iZXIgPSBudW1iZXIudG9TdHJpbmcoKTtcbiAgICBuZXdfbnVtYmVyID0gbmV3X251bWJlci5yZXBsYWNlKFwid2hhdHNhcHA6XCIsIFwiXCIpO1xuICAgIGxldCB0ZW1wb3JhcnlfbmV3X251bWJlcjogc3RyaW5nID0gXCJcIjtcbiAgICB3aGlsZSh0ZW1wb3JhcnlfbmV3X251bWJlciAhPSBuZXdfbnVtYmVyKXtcbiAgICAgICAgLy8gRG8gdGhpcyBtdWx0aXBsZSB0aW1lcyBzbyB3ZSBnZXQgYWxsICsxIGF0IHRoZSBzdGFydCBvZiB0aGUgc3RyaW5nLCBldmVuIGFmdGVyIHN0cmlwcGluZy5cbiAgICAgICAgdGVtcG9yYXJ5X25ld19udW1iZXIgPSBuZXdfbnVtYmVyO1xuICAgICAgICBuZXdfbnVtYmVyID0gbmV3X251bWJlci5yZXBsYWNlKC8oXlxcKzF8XFwofFxcKXxcXC58LSkvZywgXCJcIik7XG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdCA9IFN0cmluZyhwYXJzZUludChuZXdfbnVtYmVyKSkucGFkU3RhcnQoMTAsXCIwXCIpO1xuICAgIGlmIChyZXN1bHQubGVuZ3RoID09IDExICYmIHJlc3VsdFswXSA9PSBcIjFcIil7XG4gICAgICAgIHJldHVybiByZXN1bHQuc3Vic3RyaW5nKDEpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cbmV4cG9ydCB7XG4gICAgcm93X2NvbF90b19leGNlbF9pbmRleCxcbiAgICBleGNlbF9yb3dfdG9faW5kZXgsXG4gICAgc2FuaXRpemVfcGhvbmVfbnVtYmVyLFxuICAgIHNwbGl0X3RvX3Jvd19jb2wsXG4gICAgbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQsXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJnb29nbGVhcGlzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9oYW5kbGVycy9oYW5kbGVyLnByb3RlY3RlZC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==