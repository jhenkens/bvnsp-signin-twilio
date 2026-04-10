/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/env/handler_config.ts"
/*!***********************************!*\
  !*** ./src/env/handler_config.ts ***!
  \***********************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
    LOGIN_SHEET_LOOKUP: "Login!A1:I100",
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


/***/ },

/***/ "./src/handlers/bvnsp_checkin_handler.ts"
/*!***********************************************!*\
  !*** ./src/handlers/bvnsp_checkin_handler.ts ***!
  \***********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.MESSAGE_PREFIX_SUFFIX = exports.MESSAGE_PREFIX_TEMPLATE = exports.SMS_MAX_LENGTH = exports.NEXT_STEPS = void 0;
exports.validate_sms_message = validate_sms_message;
exports.format_phone_for_display = format_phone_for_display;
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
    AWAIT_MESSAGE: "await-message",
};
const COMMANDS = {
    ON_DUTY: ["onduty", "on-duty"],
    STATUS: ["status"],
    CHECKIN: ["checkin", "check-in"],
    SECTION_ASSIGNMENT: ["section", "section-assignment", "sectionassignment", "assignment"],
    COMP_PASS: ["comp-pass", "comppass", "comp"],
    MANAGER_PASS: ["manager-pass", "managerpass", "manager"],
    WHATSAPP: ["whatsapp"],
    MESSAGE: ["message", "msg"],
};
exports.SMS_MAX_LENGTH = 160;
exports.MESSAGE_PREFIX_TEMPLATE = "Message from ";
exports.MESSAGE_PREFIX_SUFFIX = ": ";
/**
 * Validates that a complete SMS message (prefix + body) uses only GSM-7 characters
 * and fits within a single SMS segment.
 *
 * Uses the sms-segments-calculator library (maintained by TwilioDevEd) which
 * provides authoritative GSM-7 character detection.
 *
 * @param {string} full_message - The complete message to validate (prefix + user text).
 * @returns {SmsValidationResult} The validation result.
 */
function validate_sms_message(full_message) {
    const { SegmentedMessage } = __webpack_require__(/*! sms-segments-calculator */ "sms-segments-calculator");
    const segmented = new SegmentedMessage(full_message);
    const non_gsm = segmented.getNonGsmCharacters();
    if (non_gsm.length > 0) {
        return {
            valid: false,
            reason: "non_gsm7",
            non_gsm_characters: [...new Set(non_gsm)],
        };
    }
    if (segmented.segmentsCount > 1) {
        return {
            valid: false,
            reason: "too_many_segments",
            segments_count: segmented.segmentsCount,
        };
    }
    return { valid: true };
}
/**
 * Formats a 10-digit phone number string as (XXX)XXX-XXXX for display.
 * @param {string} ten_digits - A 10-digit phone number string (e.g. "1234567890").
 * @returns {string} The formatted phone number (e.g. "(123)456-7890").
 */
function format_phone_for_display(ten_digits) {
    return `(${ten_digits.substring(0, 3)})${ten_digits.substring(3, 6)}-${ten_digits.substring(6, 10)}`;
}
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
        this.assigned_section = null;
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
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
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
            else if (this.bvnsp_checkin_next_step === exports.NEXT_STEPS.AWAIT_MESSAGE &&
                this.body_raw) {
                return yield this.send_text_message(this.body_raw);
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
            if (this.parse_fast_section_assignment(this.body)) {
                console.log(`Performing fast section_assignment for ${patroller_name} to ${this.assigned_section}`);
                return yield this.assign_section(this.assigned_section);
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
            if (COMMANDS.MESSAGE.includes(this.body)) {
                console.log(`Performing message for ${patroller_name}`);
                return yield this.prompt_message();
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
Check in / Check out / Status / On Duty / Section Assignment / Comp Pass / Manager Pass / Message / Whatsapp
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
    * Parses the fast section assignment from the message body.
    * @param {string} body - The message body.
    * @returns {boolean} True if the section assignment is parsed, otherwise false.
    */
    parse_fast_section_assignment(body) {
        this.assigned_section = null;
        if (!body || !body.includes("-")) {
            return false;
        }
        const segments = body.split("-");
        const lastSegment = segments.pop();
        const firstPart = segments.join("-").toLowerCase();
        if (lastSegment && COMMANDS.SECTION_ASSIGNMENT.includes(firstPart)) {
            this.assigned_section = this.section_values.map_section(lastSegment.toLowerCase());
            return this.assigned_section !== null && this.assigned_section !== "";
        }
        return false;
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
     * Builds the message prefix for a text message from a patroller.
     * Includes the sender's name and formatted phone number.
     * @param {string} sender_name - The name of the patroller sending the message.
     * @param {string} sender_phone - The sender's 10-digit phone number.
     * @returns {string} The message prefix (e.g., "Message from John Doe (123)456-7890: ").
     */
    get_message_prefix(sender_name, sender_phone) {
        const formatted_phone = format_phone_for_display(sender_phone);
        return `${exports.MESSAGE_PREFIX_TEMPLATE}${sender_name} ${formatted_phone}${exports.MESSAGE_PREFIX_SUFFIX}`;
    }
    /**
     * Calculates the maximum allowed message length for a text message.
     * @param {string} sender_name - The name of the patroller sending the message.
     * @param {string} sender_phone - The sender's 10-digit phone number.
     * @returns {number} The maximum number of characters the user's message can contain.
     */
    get_max_message_length(sender_name, sender_phone) {
        return exports.SMS_MAX_LENGTH - this.get_message_prefix(sender_name, sender_phone).length;
    }
    /**
     * Prompts the user to type their text message.
     * Any patroller with a valid phone number can send a message, regardless
     * of their own check-in status.  The recipient list includes all
     * patrollers who have any check-in status (All Day, Half AM, Half PM,
     * or Checked Out), including the sender themselves if they are checked in.
     * @returns {Promise<BVNSPCheckinResponse>} A promise that resolves with the prompt response.
     */
    prompt_message() {
        return __awaiter(this, void 0, void 0, function* () {
            const login_sheet = yield this.get_login_sheet();
            const recipients = login_sheet.get_on_duty_patrollers();
            if (recipients.length === 0) {
                return {
                    response: `No patrollers are currently logged in. There is nobody to send a message to.`,
                };
            }
            const sender_phone = (0, util_1.sanitize_phone_number)(this.from);
            const max_length = this.get_max_message_length(this.patroller.name, sender_phone);
            if (max_length <= 0) {
                return {
                    response: `Your name is too long to send a text message.`,
                };
            }
            return {
                response: `Please type a message of no more than ${max_length} plain-text characters to ${recipients.length} patroller${recipients.length !== 1 ? "s" : ""}, or 'restart' to cancel.`,
                next_step: exports.NEXT_STEPS.AWAIT_MESSAGE,
            };
        });
    }
    /**
     * Sends a text message to all patrollers with a check-in status for the day.
     * The sender also receives the message if they have a check-in status.
     * Validates that the complete message (prefix + body) uses only GSM-7
     * characters and fits within a single SMS segment, using the
     * sms-segments-calculator library.
     * @param {string} message_text - The raw message text from the sender.
     * @returns {Promise<BVNSPCheckinResponse>} A promise that resolves with the send result.
     */
    send_text_message(message_text) {
        return __awaiter(this, void 0, void 0, function* () {
            const sender_name = this.patroller.name;
            const sender_phone = (0, util_1.sanitize_phone_number)(this.from);
            const prefix = this.get_message_prefix(sender_name, sender_phone);
            const max_length = this.get_max_message_length(sender_name, sender_phone);
            const full_message = prefix + message_text;
            const validation = validate_sms_message(full_message);
            if (!validation.valid) {
                if (validation.reason === "non_gsm7") {
                    const bad_chars = validation.non_gsm_characters.join(" ");
                    return {
                        response: `Your message contains characters that are not supported in plain-text SMS: ${bad_chars}. Please use only standard characters and try again.`,
                        next_step: exports.NEXT_STEPS.AWAIT_MESSAGE,
                    };
                }
                // too_many_segments — message is too long
                return {
                    response: `Your message is ${message_text.length} characters, which exceeds the limit of ${max_length}. Please shorten your message and try again, or type 'restart' to cancel.`,
                    next_step: exports.NEXT_STEPS.AWAIT_MESSAGE,
                };
            }
            const login_sheet = yield this.get_login_sheet();
            const signed_in_patrollers = login_sheet.get_on_duty_patrollers();
            const phone_map = yield this.get_phone_number_map();
            let sent_count = 0;
            let failed_names = [];
            let copy_sent_to_sender = false;
            for (const patroller of signed_in_patrollers) {
                const phone = phone_map[patroller.name];
                if (!phone) {
                    failed_names.push(patroller.name);
                    continue;
                }
                try {
                    yield this.get_twilio_client().messages.create({
                        to: phone,
                        from: this.to,
                        body: full_message,
                    });
                    sent_count++;
                }
                catch (e) {
                    console.log(`Failed to send text message to ${patroller.name}: ${e}`);
                    failed_names.push(patroller.name);
                }
            }
            const sender_in_signed_in = signed_in_patrollers.some(p => p.name === sender_name);
            if (!sender_in_signed_in) {
                try {
                    yield this.get_twilio_client().messages.create({
                        to: this.from,
                        from: this.to,
                        body: full_message,
                    });
                    copy_sent_to_sender = true;
                }
                catch (e) {
                    console.log(`Failed to send text message to sender ${sender_name}: ${e}`);
                    failed_names.push(sender_name);
                }
            }
            // Include the sender copy in the total log count
            yield this.log_action(`text_message(${sent_count + (copy_sent_to_sender ? 1 : 0)})`);
            let response = `Message sent to ${sent_count} patroller${sent_count !== 1 ? "s" : ""}`;
            if (copy_sent_to_sender) {
                response += ` and a copy to you.`;
            }
            else {
                response += `.`;
            }
            if (failed_names.length > 0) {
                response += ` Could not send to: ${failed_names.join(", ")}.`;
            }
            return { response };
        });
    }
    /**
     * Looks up phone numbers for all patrollers from the Phone Numbers sheet.
     * @returns {Promise<Record<string, string>>} A map of patroller name to phone number (in +1XXXXXXXXXX format).
     */
    get_phone_number_map() {
        return __awaiter(this, void 0, void 0, function* () {
            const sheets_service = yield this.get_sheets_service();
            const opts = this.combined_config;
            const response = yield sheets_service.spreadsheets.values.get({
                spreadsheetId: opts.SHEET_ID,
                range: opts.PHONE_NUMBER_LOOKUP_SHEET,
                valueRenderOption: "UNFORMATTED_VALUE",
            });
            if (!response.data.values) {
                return {};
            }
            const map = {};
            for (const row of response.data.values) {
                const name = row[(0, util_1.excel_row_to_index)(opts.PHONE_NUMBER_NAME_COLUMN)];
                const rawNumber = row[(0, util_1.excel_row_to_index)(opts.PHONE_NUMBER_NUMBER_COLUMN)];
                if (name && rawNumber) {
                    map[name] = `+1${(0, util_1.sanitize_phone_number)(rawNumber)}`;
                }
            }
            return map;
        });
    }
    /**
     * Assigns the section to the patroller.
     * @param {string | null} section - The section to assign.
     * @returns {Promise<BVNSPCheckinResponse>} A promise that resolves with the response.
     */
    assign_section(section) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const assignedSection = section !== null && section !== void 0 ? section : "Roving";
            console.log(`Assigning section ${this.patroller.name} to ${assignedSection}`);
            const mapped_section = this.section_values.map_section(assignedSection);
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
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
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
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
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
     * Performs the check-in process for the patroller once the check-in mode is set.
     * @returns {Promise<BVNSPCheckinResponse>} A promise that resolves with the check-in response.
     * @throws {Error} Throws an error if the check-in mode is improperly set.
     */
    checkin() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
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
    check_user_creds() {
        return __awaiter(this, arguments, void 0, function* (prompt_message = "Hi, before you can use BVNSP bot, you must login.") {
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
    get_valid_creds() {
        return __awaiter(this, arguments, void 0, function* (require_user_creds = false) {
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
    get_mapped_patroller() {
        return __awaiter(this, arguments, void 0, function* (force = false) {
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


/***/ },

/***/ "./src/handlers/handler.protected.ts"
/*!*******************************************!*\
  !*** ./src/handlers/handler.protected.ts ***!
  \*******************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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


/***/ },

/***/ "./src/sheets/comp_pass_sheet.ts"
/*!***************************************!*\
  !*** ./src/sheets/comp_pass_sheet.ts ***!
  \***************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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


/***/ },

/***/ "./src/sheets/login_sheet.ts"
/*!***********************************!*\
  !*** ./src/sheets/login_sheet.ts ***!
  \***********************************/
(__unused_webpack_module, exports, __webpack_require__) {


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


/***/ },

/***/ "./src/sheets/season_sheet.ts"
/*!************************************!*\
  !*** ./src/sheets/season_sheet.ts ***!
  \************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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


/***/ },

/***/ "./src/user-creds.ts"
/*!***************************!*\
  !*** ./src/user-creds.ts ***!
  \***************************/
(__unused_webpack_module, exports, __webpack_require__) {


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


/***/ },

/***/ "./src/utils/checkin_values.ts"
/*!*************************************!*\
  !*** ./src/utils/checkin_values.ts ***!
  \*************************************/
(__unused_webpack_module, exports) {


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


/***/ },

/***/ "./src/utils/comp_passes.ts"
/*!**********************************!*\
  !*** ./src/utils/comp_passes.ts ***!
  \**********************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompPassType = void 0;
exports.get_comp_pass_description = get_comp_pass_description;
exports.build_passes_string = build_passes_string;
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
function build_passes_string(used, total, today, type, force_today = false) {
    let message = `You have used ${used} of ${total} ${type} this season`;
    if (force_today || today > 0) {
        message += ` (${today} used today)`;
    }
    message += ".";
    return message;
}


/***/ },

/***/ "./src/utils/datetime_util.ts"
/*!************************************!*\
  !*** ./src/utils/datetime_util.ts ***!
  \************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sanitize_date = sanitize_date;
exports.excel_date_to_js_date = excel_date_to_js_date;
exports.change_timezone_to_pst = change_timezone_to_pst;
exports.strip_datetime_to_date = strip_datetime_to_date;
exports.format_date_for_spreadsheet_value = format_date_for_spreadsheet_value;
exports.filter_list_to_endswith_date = filter_list_to_endswith_date;
exports.filter_list_to_endswith_current_day = filter_list_to_endswith_current_day;
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
/**
 * Change the timezone of a Date object to PST.
 * @param {Date} date - The Date object.
 * @returns {Date} The Date object with the timezone set to PST.
 */
function change_timezone_to_pst(date) {
    const result = new Date(date.toUTCString().replace(" GMT", " PST"));
    return result;
}
/**
 * Strip the time from a Date object, keeping only the date.
 * @param {Date} date - The Date object.
 * @returns {Date} The Date object with the time stripped.
 */
function strip_datetime_to_date(date) {
    const result = new Date(date.toLocaleDateString("en-US", { timeZone: "America/Los_Angeles" }));
    return result;
}
/**
 * Sanitize a date by converting it from an Excel date and stripping the time.
 * @param {number} date - The Excel date.
 * @returns {Date} The sanitized Date object.
 */
function sanitize_date(date) {
    const result = strip_datetime_to_date(change_timezone_to_pst(excel_date_to_js_date(date)));
    return result;
}
/**
 * Format a Date object for use in a spreadsheet value.
 * @param {Date} date - The Date object.
 * @returns {string} The formatted date string in PST
 */
function format_date_for_spreadsheet_value(date) {
    const datestr = date
        .toLocaleDateString("en-US", { timeZone: "America/Los_Angeles" })
        .split("/")
        .map((x) => x.padStart(2, "0"))
        .join("");
    return datestr;
}
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
/**
 * Filter a list to include only items that end with the current date.
 * @param {any[]} list - The list to filter.
 * @returns {any[]} The filtered list.
 */
function filter_list_to_endswith_current_day(list) {
    return filter_list_to_endswith_date(list, new Date());
}


/***/ },

/***/ "./src/utils/file_utils.ts"
/*!*********************************!*\
  !*** ./src/utils/file_utils.ts ***!
  \*********************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.load_credentials_files = load_credentials_files;
exports.get_service_credentials_path = get_service_credentials_path;
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
/**
 * Get the path to the service credentials file.
 * @returns {string} The path to the service credentials file.
 */
function get_service_credentials_path() {
    return Runtime.getAssets()["/service-credentials.json"].path;
}


/***/ },

/***/ "./src/utils/google_sheets_spreadsheet_tab.ts"
/*!****************************************************!*\
  !*** ./src/utils/google_sheets_spreadsheet_tab.ts ***!
  \****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
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
    _get_values(range_1) {
        return __awaiter(this, arguments, void 0, function* (range, valueRenderOption = "UNFORMATTED_VALUE") {
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


/***/ },

/***/ "./src/utils/scope_util.ts"
/*!*********************************!*\
  !*** ./src/utils/scope_util.ts ***!
  \*********************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validate_scopes = validate_scopes;
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


/***/ },

/***/ "./src/utils/section_values.ts"
/*!*************************************!*\
  !*** ./src/utils/section_values.ts ***!
  \*************************************/
(__unused_webpack_module, exports) {


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
    * @returns {string } The original case value if found, otherwise null.
    */
    map_section(section) {
        if (section === null) {
            return "";
        }
        const index = this.lowercase_sections.indexOf(section.toLowerCase());
        if (index !== -1) {
            return this.sections[index];
        }
        return "";
    }
}
exports.SectionValues = SectionValues;


/***/ },

/***/ "./src/utils/util.ts"
/*!***************************!*\
  !*** ./src/utils/util.ts ***!
  \***************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.row_col_to_excel_index = row_col_to_excel_index;
exports.excel_row_to_index = excel_row_to_index;
exports.sanitize_phone_number = sanitize_phone_number;
exports.split_to_row_col = split_to_row_col;
exports.lookup_row_col_in_sheet = lookup_row_col_in_sheet;
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


/***/ },

/***/ "@twilio-labs/serverless-runtime-types"
/*!********************************************************!*\
  !*** external "@twilio-labs/serverless-runtime-types" ***!
  \********************************************************/
(module) {

module.exports = require("@twilio-labs/serverless-runtime-types");

/***/ },

/***/ "googleapis"
/*!*****************************!*\
  !*** external "googleapis" ***!
  \*****************************/
(module) {

module.exports = require("googleapis");

/***/ },

/***/ "sms-segments-calculator"
/*!******************************************!*\
  !*** external "sms-segments-calculator" ***!
  \******************************************/
(module) {

module.exports = require("sms-segments-calculator");

/***/ },

/***/ "fs"
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
(module) {

module.exports = require("fs");

/***/ }

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
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFNUJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9lbnYvaGFuZGxlcl9jb25maWcudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9oYW5kbGVycy9idm5zcF9jaGVja2luX2hhbmRsZXIudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9oYW5kbGVycy9oYW5kbGVyLnByb3RlY3RlZC50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3NoZWV0cy9jb21wX3Bhc3Nfc2hlZXQudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9zaGVldHMvbG9naW5fc2hlZXQudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9zaGVldHMvc2Vhc29uX3NoZWV0LnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXNlci1jcmVkcy50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3V0aWxzL2NoZWNraW5fdmFsdWVzLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvY29tcF9wYXNzZXMudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91dGlscy9kYXRldGltZV91dGlsLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvZmlsZV91dGlscy50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3V0aWxzL2dvb2dsZV9zaGVldHNfc3ByZWFkc2hlZXRfdGFiLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvc2NvcGVfdXRpbC50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3V0aWxzL3NlY3Rpb25fdmFsdWVzLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvdXRpbC50cyIsImV4dGVybmFsIGNvbW1vbmpzIFwiQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlc1wiIiwiZXh0ZXJuYWwgY29tbW9uanMgXCJnb29nbGVhcGlzXCIiLCJleHRlcm5hbCBjb21tb25qcyBcInNtcy1zZWdtZW50cy1jYWxjdWxhdG9yXCIiLCJleHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiZnNcIiIsIndlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2svc3RhcnR1cCIsIndlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGVja2luVmFsdWUgfSBmcm9tIFwiLi4vdXRpbHMvY2hlY2tpbl92YWx1ZXNcIjtcblxuLyoqXG4gKiBFbnZpcm9ubWVudCBjb25maWd1cmF0aW9uIGZvciB0aGUgaGFuZGxlci5cbiAqIDxwPlxuICogTm90ZTogVGhlc2UgYXJlIHRoZSBvbmx5IHNlY3JldCB2YWx1ZXMgd2UgbmVlZCB0byByZWFkLiBSZXN0IGNhbiBiZSBkZXBsb3llZC5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IEhhbmRsZXJFbnZpcm9ubWVudFxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNIRUVUX0lEIC0gVGhlIElEIG9mIHRoZSBHb29nbGUgU2hlZXRzIHNwcmVhZHNoZWV0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNDUklQVF9JRCAtIFRoZSBJRCBvZiB0aGUgR29vZ2xlIEFwcHMgU2NyaXB0IHByb2plY3QuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU1lOQ19TSUQgLSBUaGUgU0lEIG9mIHRoZSBUd2lsaW8gU3luYyBzZXJ2aWNlLlxuICovXG50eXBlIEhhbmRsZXJFbnZpcm9ubWVudCA9IHtcbiAgICBTSEVFVF9JRDogc3RyaW5nO1xuICAgIFNDUklQVF9JRDogc3RyaW5nO1xuICAgIFNZTkNfU0lEOiBzdHJpbmc7XG59O1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIHVzZXIgY3JlZGVudGlhbHMuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBVc2VyQ3JlZHNDb25maWdcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nIHwgdW5kZWZpbmVkIHwgbnVsbH0gTlNQX0VNQUlMX0RPTUFJTiAtIFRoZSBlbWFpbCBkb21haW4gZm9yIE5TUC5cbiAqL1xudHlwZSBVc2VyQ3JlZHNDb25maWcgPSB7XG4gICAgTlNQX0VNQUlMX0RPTUFJTjogc3RyaW5nIHwgdW5kZWZpbmVkIHwgbnVsbDtcbn07XG5jb25zdCB1c2VyX2NyZWRzX2NvbmZpZzogVXNlckNyZWRzQ29uZmlnID0ge1xuICAgIE5TUF9FTUFJTF9ET01BSU46IFwiZmFyd2VzdC5vcmdcIixcbn07XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgZmluZGluZyBhIHBhdHJvbGxlci5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IEZpbmRQYXRyb2xsZXJDb25maWdcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTSEVFVF9JRCAtIFRoZSBJRCBvZiB0aGUgR29vZ2xlIFNoZWV0cyBzcHJlYWRzaGVldC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBQSE9ORV9OVU1CRVJfTE9PS1VQX1NIRUVUIC0gVGhlIHJhbmdlIGZvciBwaG9uZSBudW1iZXIgbG9va3VwLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFBIT05FX05VTUJFUl9OVU1CRVJfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgcGhvbmUgbnVtYmVycy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBQSE9ORV9OVU1CRVJfTkFNRV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBuYW1lcy5cbiAqL1xudHlwZSBGaW5kUGF0cm9sbGVyQ29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBzdHJpbmc7XG4gICAgUEhPTkVfTlVNQkVSX0xPT0tVUF9TSEVFVDogc3RyaW5nO1xuICAgIFBIT05FX05VTUJFUl9OVU1CRVJfQ09MVU1OOiBzdHJpbmc7XG4gICAgUEhPTkVfTlVNQkVSX05BTUVfQ09MVU1OOiBzdHJpbmc7XG59O1xuXG5jb25zdCBmaW5kX3BhdHJvbGxlcl9jb25maWc6IEZpbmRQYXRyb2xsZXJDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IFwidGVzdFwiLFxuICAgIFBIT05FX05VTUJFUl9MT09LVVBfU0hFRVQ6IFwiUGhvbmUgTnVtYmVycyFBMjpCMTAwXCIsXG4gICAgUEhPTkVfTlVNQkVSX05BTUVfQ09MVU1OOiBcIkFcIixcbiAgICBQSE9ORV9OVU1CRVJfTlVNQkVSX0NPTFVNTjogXCJCXCIsXG59O1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIHRoZSBsb2dpbiBzaGVldC5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IExvZ2luU2hlZXRDb25maWdcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTSEVFVF9JRCAtIFRoZSBJRCBvZiB0aGUgR29vZ2xlIFNoZWV0cyBzcHJlYWRzaGVldC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBMT0dJTl9TSEVFVF9MT09LVVAgLSBUaGUgcmFuZ2UgZm9yIGxvZ2luIHNoZWV0IGxvb2t1cC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDSEVDS0lOX0NPVU5UX0xPT0tVUCAtIFRoZSByYW5nZSBmb3IgY2hlY2staW4gY291bnQgbG9va3VwLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IEFSQ0hJVkVEX0NFTEwgLSBUaGUgY2VsbCBmb3IgYXJjaGl2ZWQgZGF0YS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTSEVFVF9EQVRFX0NFTEwgLSBUaGUgY2VsbCBmb3IgdGhlIHNoZWV0IGRhdGUuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQ1VSUkVOVF9EQVRFX0NFTEwgLSBUaGUgY2VsbCBmb3IgdGhlIGN1cnJlbnQgZGF0ZS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBOQU1FX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIG5hbWVzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IENBVEVHT1JZX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIGNhdGVnb3JpZXMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0VDVElPTl9EUk9QRE9XTl9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBzZWN0aW9uIGRyb3Bkb3duLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IENIRUNLSU5fRFJPUERPV05fQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgY2hlY2staW4gZHJvcGRvd24uXG4gKi9cbnR5cGUgTG9naW5TaGVldENvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogc3RyaW5nO1xuICAgIExPR0lOX1NIRUVUX0xPT0tVUDogc3RyaW5nO1xuICAgIENIRUNLSU5fQ09VTlRfTE9PS1VQOiBzdHJpbmc7XG4gICAgQVJDSElWRURfQ0VMTDogc3RyaW5nO1xuICAgIFNIRUVUX0RBVEVfQ0VMTDogc3RyaW5nO1xuICAgIENVUlJFTlRfREFURV9DRUxMOiBzdHJpbmc7XG4gICAgTkFNRV9DT0xVTU46IHN0cmluZztcbiAgICBDQVRFR09SWV9DT0xVTU46IHN0cmluZztcbiAgICBTRUNUSU9OX0RST1BET1dOX0NPTFVNTjogc3RyaW5nO1xuICAgIENIRUNLSU5fRFJPUERPV05fQ09MVU1OOiBzdHJpbmc7XG59O1xuXG5jb25zdCBsb2dpbl9zaGVldF9jb25maWc6IExvZ2luU2hlZXRDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IFwidGVzdFwiLFxuICAgIExPR0lOX1NIRUVUX0xPT0tVUDogXCJMb2dpbiFBMTpJMTAwXCIsXG4gICAgQ0hFQ0tJTl9DT1VOVF9MT09LVVA6IFwiVG9vbHMhRzI6RzJcIixcbiAgICBTSEVFVF9EQVRFX0NFTEw6IFwiQjFcIixcbiAgICBDVVJSRU5UX0RBVEVfQ0VMTDogXCJCMlwiLFxuICAgIEFSQ0hJVkVEX0NFTEw6IFwiSDFcIixcbiAgICBOQU1FX0NPTFVNTjogXCJBXCIsXG4gICAgQ0FURUdPUllfQ09MVU1OOiBcIkJcIixcbiAgICBTRUNUSU9OX0RST1BET1dOX0NPTFVNTjogXCJIXCIsXG4gICAgQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU46IFwiSVwiLFxufTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciB0aGUgc2Vhc29uIHNoZWV0LlxuICogQHR5cGVkZWYge09iamVjdH0gU2Vhc29uU2hlZXRDb25maWdcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTSEVFVF9JRCAtIFRoZSBJRCBvZiB0aGUgR29vZ2xlIFNoZWV0cyBzcHJlYWRzaGVldC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTRUFTT05fU0hFRVQgLSBUaGUgbmFtZSBvZiB0aGUgc2Vhc29uIHNoZWV0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNFQVNPTl9TSEVFVF9EQVlTX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIHNlYXNvbiBzaGVldCBkYXlzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNFQVNPTl9TSEVFVF9OQU1FX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIHNlYXNvbiBzaGVldCBuYW1lcy5cbiAqL1xudHlwZSBTZWFzb25TaGVldENvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogc3RyaW5nO1xuICAgIFNFQVNPTl9TSEVFVDogc3RyaW5nO1xuICAgIFNFQVNPTl9TSEVFVF9EQVlTX0NPTFVNTjogc3RyaW5nO1xuICAgIFNFQVNPTl9TSEVFVF9OQU1FX0NPTFVNTjogc3RyaW5nO1xufTtcbmNvbnN0IHNlYXNvbl9zaGVldF9jb25maWc6IFNlYXNvblNoZWV0Q29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBcInRlc3RcIixcbiAgICBTRUFTT05fU0hFRVQ6IFwiU2Vhc29uXCIsXG4gICAgU0VBU09OX1NIRUVUX05BTUVfQ09MVU1OOiBcIkJcIixcbiAgICBTRUFTT05fU0hFRVRfREFZU19DT0xVTU46IFwiQVwiLFxufTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciBzZWN0aW9ucy5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IFNlY3Rpb25Db25maWdcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTRUNUSU9OX1ZBTFVFUyAtIFRoZSBzZWN0aW9uIHZhbHVlcy5cbiAqL1xudHlwZSBTZWN0aW9uQ29uZmlnID0ge1xuICAgIFNFQ1RJT05fVkFMVUVTOiBzdHJpbmc7XG59O1xuY29uc3Qgc2VjdGlvbl9jb25maWc6IFNlY3Rpb25Db25maWcgPSB7XG4gICAgU0VDVElPTl9WQUxVRVM6ICBcIjEsMiwzLDQsUm92aW5nLEZBUixUcmFpbmluZ1wiLFxufTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciBjb21wIHBhc3Nlcy5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IENvbXBQYXNzZXNDb25maWdcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTSEVFVF9JRCAtIFRoZSBJRCBvZiB0aGUgR29vZ2xlIFNoZWV0cyBzcHJlYWRzaGVldC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDT01QX1BBU1NfU0hFRVQgLSBUaGUgbmFtZSBvZiB0aGUgY29tcCBwYXNzIHNoZWV0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IENPTVBfUEFTU19TSEVFVF9EQVRFU19BVkFJTEFCTEVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgYXZhaWxhYmxlIGRhdGVzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IENPTVBfUEFTU19TSEVFVF9VU0VEX1RPREFZX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIGRhdGVzIHVzZWQgdG9kYXkuXG4gICogQHByb3BlcnR5IHtzdHJpbmd9IENPTVBfUEFTU19TSEVFVF9VU0VEX1NFQVNPTl9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBkYXRlcyB1c2VkIGZvciB0aGlzIHNlYXNvbi5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDT01QX1BBU1NfU0hFRVRfREFURVNfU1RBUlRJTkdfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3Igc3RhcnRpbmcgZGF0ZXMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQ09NUF9QQVNTX1NIRUVUX05BTUVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgbmFtZXMuXG4gKi9cbnR5cGUgQ29tcFBhc3Nlc0NvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogc3RyaW5nO1xuICAgIENPTVBfUEFTU19TSEVFVDogc3RyaW5nO1xuICAgIENPTVBfUEFTU19TSEVFVF9EQVRFU19BVkFJTEFCTEVfQ09MVU1OOiBzdHJpbmc7XG4gICAgQ09NUF9QQVNTX1NIRUVUX1VTRURfVE9EQVlfQ09MVU1OOiBzdHJpbmc7XG4gICAgQ09NUF9QQVNTX1NIRUVUX1VTRURfU0VBU09OX0NPTFVNTjogc3RyaW5nO1xuICAgIENPTVBfUEFTU19TSEVFVF9EQVRFU19TVEFSVElOR19DT0xVTU46IHN0cmluZztcbiAgICBDT01QX1BBU1NfU0hFRVRfTkFNRV9DT0xVTU46IHN0cmluZztcbn07XG5jb25zdCBjb21wX3Bhc3Nlc19jb25maWc6IENvbXBQYXNzZXNDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IFwidGVzdFwiLFxuICAgIENPTVBfUEFTU19TSEVFVDogXCJDb21wc1wiLFxuICAgIENPTVBfUEFTU19TSEVFVF9OQU1FX0NPTFVNTjogXCJBXCIsXG4gICAgQ09NUF9QQVNTX1NIRUVUX0RBVEVTX0FWQUlMQUJMRV9DT0xVTU46IFwiRFwiLFxuICAgIENPTVBfUEFTU19TSEVFVF9VU0VEX1RPREFZX0NPTFVNTjogXCJFXCIsXG4gICAgQ09NUF9QQVNTX1NIRUVUX1VTRURfU0VBU09OX0NPTFVNTjogXCJGXCIsXG4gICAgQ09NUF9QQVNTX1NIRUVUX0RBVEVTX1NUQVJUSU5HX0NPTFVNTjogXCJHXCIsXG59O1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIG1hbmFnZXIgcGFzc2VzLlxuICogQHR5cGVkZWYge09iamVjdH0gTWFuYWdlclBhc3Nlc0NvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFNIRUVUX0lEIC0gVGhlIElEIG9mIHRoZSBHb29nbGUgU2hlZXRzIHNwcmVhZHNoZWV0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IE1BTkFHRVJfUEFTU19TSEVFVCAtIFRoZSBuYW1lIG9mIHRoZSBtYW5hZ2VyIHBhc3Mgc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gTUFOQUdFUl9QQVNTX1NIRUVUX0FWQUlMQUJMRV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBhdmFpbGFibGUgcGFzc2VzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IE1BTkFHRVJfUEFTU19TSEVFVF9VU0VEX1RPREFZX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIHBhc3NlcyB1c2VkIHRvZGF5LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IE1BTkFHRVJfUEFTU19TSEVFVF9VU0VEX1NFQVNPTl9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBkYXRlcyB1c2VkIGZvciB0aGlzIHNlYXNvbi5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBNQU5BR0VSX1BBU1NfU0hFRVRfREFURVNfU1RBUlRJTkdfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3Igc3RhcnRpbmcgZGF0ZXMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gTUFOQUdFUl9QQVNTX1NIRUVUX05BTUVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgbmFtZXMuXG4gKi9cbnR5cGUgTWFuYWdlclBhc3Nlc0NvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogc3RyaW5nO1xuICAgIE1BTkFHRVJfUEFTU19TSEVFVDogc3RyaW5nO1xuICAgIE1BTkFHRVJfUEFTU19TSEVFVF9BVkFJTEFCTEVfQ09MVU1OOiBzdHJpbmc7XG4gICAgTUFOQUdFUl9QQVNTX1NIRUVUX1VTRURfVE9EQVlfQ09MVU1OOiBzdHJpbmc7XG4gICAgTUFOQUdFUl9QQVNTX1NIRUVUX1VTRURfU0VBU09OX0NPTFVNTjogc3RyaW5nO1xuICAgIE1BTkFHRVJfUEFTU19TSEVFVF9EQVRFU19TVEFSVElOR19DT0xVTU46IHN0cmluZztcbiAgICBNQU5BR0VSX1BBU1NfU0hFRVRfTkFNRV9DT0xVTU46IHN0cmluZztcbn07XG5jb25zdCBtYW5hZ2VyX3Bhc3Nlc19jb25maWc6IE1hbmFnZXJQYXNzZXNDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IFwidGVzdFwiLFxuICAgIE1BTkFHRVJfUEFTU19TSEVFVDogXCJNYW5hZ2Vyc1wiLFxuICAgIE1BTkFHRVJfUEFTU19TSEVFVF9OQU1FX0NPTFVNTjogXCJBXCIsXG4gICAgTUFOQUdFUl9QQVNTX1NIRUVUX0FWQUlMQUJMRV9DT0xVTU46IFwiRVwiLFxuICAgIE1BTkFHRVJfUEFTU19TSEVFVF9VU0VEX1RPREFZX0NPTFVNTjogXCJDXCIsXG4gICAgTUFOQUdFUl9QQVNTX1NIRUVUX1VTRURfU0VBU09OX0NPTFVNTjogXCJCXCIsXG4gICAgTUFOQUdFUl9QQVNTX1NIRUVUX0RBVEVTX1NUQVJUSU5HX0NPTFVNTjogXCJGXCIsXG59O1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIHRoZSBoYW5kbGVyLlxuICogQHR5cGVkZWYge09iamVjdH0gSGFuZGxlckNvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFNDUklQVF9JRCAtIFRoZSBJRCBvZiB0aGUgR29vZ2xlIEFwcHMgU2NyaXB0IHByb2plY3QuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU1lOQ19TSUQgLSBUaGUgU0lEIG9mIHRoZSBUd2lsaW8gU3luYyBzZXJ2aWNlLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFJFU0VUX0ZVTkNUSU9OX05BTUUgLSBUaGUgbmFtZSBvZiB0aGUgcmVzZXQgZnVuY3Rpb24uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQVJDSElWRV9GVU5DVElPTl9OQU1FIC0gVGhlIG5hbWUgb2YgdGhlIGFyY2hpdmUgZnVuY3Rpb24uXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFVTRV9TRVJWSUNFX0FDQ09VTlQgLSBXaGV0aGVyIHRvIHVzZSBhIHNlcnZpY2UgYWNjb3VudC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBBQ1RJT05fTE9HX1NIRUVUIC0gVGhlIG5hbWUgb2YgdGhlIGFjdGlvbiBsb2cgc2hlZXQuXG4gKiBAcHJvcGVydHkge0NoZWNraW5WYWx1ZVtdfSBDSEVDS0lOX1ZBTFVFUyAtIFRoZSBjaGVjay1pbiB2YWx1ZXMuXG4gKi9cbnR5cGUgSGFuZGxlckNvbmZpZyA9IHtcbiAgICBTQ1JJUFRfSUQ6IHN0cmluZztcbiAgICBTSEVFVF9JRDogc3RyaW5nO1xuICAgIFNZTkNfU0lEOiBzdHJpbmc7XG4gICAgUkVTRVRfRlVOQ1RJT05fTkFNRTogc3RyaW5nO1xuICAgIEFSQ0hJVkVfRlVOQ1RJT05fTkFNRTogc3RyaW5nO1xuICAgIFVTRV9TRVJWSUNFX0FDQ09VTlQ6IGJvb2xlYW47XG4gICAgQUNUSU9OX0xPR19TSEVFVDogc3RyaW5nO1xuICAgIENIRUNLSU5fVkFMVUVTOiBDaGVja2luVmFsdWVbXTtcbn07XG5jb25zdCBoYW5kbGVyX2NvbmZpZzogSGFuZGxlckNvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogXCJ0ZXN0XCIsXG4gICAgU0NSSVBUX0lEOiBcInRlc3RcIixcbiAgICBTWU5DX1NJRDogXCJ0ZXN0XCIsXG4gICAgQVJDSElWRV9GVU5DVElPTl9OQU1FOiBcIkFyY2hpdmVcIixcbiAgICBSRVNFVF9GVU5DVElPTl9OQU1FOiBcIlJlc2V0XCIsXG4gICAgVVNFX1NFUlZJQ0VfQUNDT1VOVDogdHJ1ZSxcbiAgICBBQ1RJT05fTE9HX1NIRUVUOiBcIkJvdF9Vc2FnZVwiLFxuICAgIENIRUNLSU5fVkFMVUVTOiBbXG4gICAgICAgIG5ldyBDaGVja2luVmFsdWUoXCJkYXlcIiwgXCJBbGwgRGF5XCIsIFwiYWxsIGRheS9EQVlcIiwgW1wiY2hlY2tpbi1kYXlcIl0pLFxuICAgICAgICBuZXcgQ2hlY2tpblZhbHVlKFwiYW1cIiwgXCJIYWxmIEFNXCIsIFwibW9ybmluZy9BTVwiLCBbXCJjaGVja2luLWFtXCJdKSxcbiAgICAgICAgbmV3IENoZWNraW5WYWx1ZShcInBtXCIsIFwiSGFsZiBQTVwiLCBcImFmdGVybm9vbi9QTVwiLCBbXCJjaGVja2luLXBtXCJdKSxcbiAgICAgICAgbmV3IENoZWNraW5WYWx1ZShcIm91dFwiLCBcIkNoZWNrZWQgT3V0XCIsIFwiY2hlY2sgb3V0L09VVFwiLCBbXCJjaGVja291dFwiLCBcImNoZWNrLW91dFwiXSksXG4gICAgXSxcbn07XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgcGF0cm9sbGVyIHJvd3MuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBQYXRyb2xsZXJSb3dDb25maWdcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBOQU1FX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIG5hbWVzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IENBVEVHT1JZX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIGNhdGVnb3JpZXMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0VDVElPTl9EUk9QRE9XTl9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBzZWN0aW9uIGRyb3Bkb3duLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IENIRUNLSU5fRFJPUERPV05fQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgY2hlY2staW4gZHJvcGRvd24uXG4gKi9cbnR5cGUgUGF0cm9sbGVyUm93Q29uZmlnID0ge1xuICAgIE5BTUVfQ09MVU1OOiBzdHJpbmc7XG4gICAgQ0FURUdPUllfQ09MVU1OOiBzdHJpbmc7XG4gICAgU0VDVElPTl9EUk9QRE9XTl9DT0xVTU46IHN0cmluZztcbiAgICBDSEVDS0lOX0RST1BET1dOX0NPTFVNTjogc3RyaW5nO1xufTtcblxuLyoqXG4gKiBDb21iaW5lZCBjb25maWd1cmF0aW9uIHR5cGUuXG4gKiBAdHlwZWRlZiB7SGFuZGxlckVudmlyb25tZW50ICYgVXNlckNyZWRzQ29uZmlnICYgRmluZFBhdHJvbGxlckNvbmZpZyAmIExvZ2luU2hlZXRDb25maWcgJiBTZWFzb25TaGVldENvbmZpZyAmIFNlY3Rpb25Db25maWcgJiBDb21wUGFzc2VzQ29uZmlnICYgTWFuYWdlclBhc3Nlc0NvbmZpZyAmIEhhbmRsZXJDb25maWcgJiBQYXRyb2xsZXJSb3dDb25maWd9IENvbWJpbmVkQ29uZmlnXG4gKi9cbnR5cGUgQ29tYmluZWRDb25maWcgPSBIYW5kbGVyRW52aXJvbm1lbnQgJlxuICAgIFVzZXJDcmVkc0NvbmZpZyAmXG4gICAgRmluZFBhdHJvbGxlckNvbmZpZyAmXG4gICAgTG9naW5TaGVldENvbmZpZyAmXG4gICAgU2Vhc29uU2hlZXRDb25maWcgJlxuICAgIFNlY3Rpb25Db25maWcgJlxuICAgIENvbXBQYXNzZXNDb25maWcgJlxuICAgIE1hbmFnZXJQYXNzZXNDb25maWcgJlxuICAgIEhhbmRsZXJDb25maWcgJlxuICAgIFBhdHJvbGxlclJvd0NvbmZpZztcblxuY29uc3QgQ09ORklHOiBDb21iaW5lZENvbmZpZyA9IHtcbiAgICAuLi5oYW5kbGVyX2NvbmZpZyxcbiAgICAuLi5maW5kX3BhdHJvbGxlcl9jb25maWcsXG4gICAgLi4ubG9naW5fc2hlZXRfY29uZmlnLFxuICAgIC4uLmNvbXBfcGFzc2VzX2NvbmZpZyxcbiAgICAuLi5tYW5hZ2VyX3Bhc3Nlc19jb25maWcsXG4gICAgLi4uc2Vhc29uX3NoZWV0X2NvbmZpZyxcbiAgICAuLi51c2VyX2NyZWRzX2NvbmZpZyxcbiAgICAuLi5zZWN0aW9uX2NvbmZpZyxcbn07XG5cbmV4cG9ydCB7XG4gICAgQ09ORklHLFxuICAgIENvbWJpbmVkQ29uZmlnLFxuICAgIFNlY3Rpb25Db25maWcsXG4gICAgQ29tcFBhc3Nlc0NvbmZpZyxcbiAgICBGaW5kUGF0cm9sbGVyQ29uZmlnLFxuICAgIEhhbmRsZXJDb25maWcsXG4gICAgSGFuZGxlckVudmlyb25tZW50LFxuICAgIE1hbmFnZXJQYXNzZXNDb25maWcsXG4gICAgVXNlckNyZWRzQ29uZmlnLFxuICAgIExvZ2luU2hlZXRDb25maWcsXG4gICAgU2Vhc29uU2hlZXRDb25maWcsXG4gICAgUGF0cm9sbGVyUm93Q29uZmlnLFxufTsiLCJpbXBvcnQgXCJAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzXCI7XG5pbXBvcnQge1xuICAgIENvbnRleHQsXG4gICAgU2VydmVybGVzc0V2ZW50T2JqZWN0LFxuICAgIFNlcnZpY2VDb250ZXh0LFxuICAgIFR3aWxpb0NsaWVudCxcbn0gZnJvbSBcIkB0d2lsaW8tbGFicy9zZXJ2ZXJsZXNzLXJ1bnRpbWUtdHlwZXMvdHlwZXNcIjtcbmltcG9ydCB7IGdvb2dsZSwgc2NyaXB0X3YxLCBzaGVldHNfdjQgfSBmcm9tIFwiZ29vZ2xlYXBpc1wiO1xuaW1wb3J0IHsgR29vZ2xlQXV0aCB9IGZyb20gXCJnb29nbGVhcGlzLWNvbW1vblwiO1xuaW1wb3J0IHtcbiAgICBDT05GSUcsXG4gICAgQ29tYmluZWRDb25maWcsXG4gICAgQ29tcFBhc3Nlc0NvbmZpZyxcbiAgICBGaW5kUGF0cm9sbGVyQ29uZmlnLFxuICAgIEhhbmRsZXJDb25maWcsXG4gICAgSGFuZGxlckVudmlyb25tZW50LFxuICAgIExvZ2luU2hlZXRDb25maWcsXG4gICAgTWFuYWdlclBhc3Nlc0NvbmZpZyxcbiAgICBTZWFzb25TaGVldENvbmZpZyxcbn0gZnJvbSBcIi4uL2Vudi9oYW5kbGVyX2NvbmZpZ1wiO1xuaW1wb3J0IExvZ2luU2hlZXQsIHsgUGF0cm9sbGVyUm93IH0gZnJvbSBcIi4uL3NoZWV0cy9sb2dpbl9zaGVldFwiO1xuaW1wb3J0IFNlYXNvblNoZWV0IGZyb20gXCIuLi9zaGVldHMvc2Vhc29uX3NoZWV0XCI7XG5pbXBvcnQgeyBVc2VyQ3JlZHMgfSBmcm9tIFwiLi4vdXNlci1jcmVkc1wiO1xuaW1wb3J0IHsgQ2hlY2tpblZhbHVlcyB9IGZyb20gXCIuLi91dGlscy9jaGVja2luX3ZhbHVlc1wiO1xuaW1wb3J0IHsgZ2V0X3NlcnZpY2VfY3JlZGVudGlhbHNfcGF0aCB9IGZyb20gXCIuLi91dGlscy9maWxlX3V0aWxzXCI7XG5pbXBvcnQgeyBleGNlbF9yb3dfdG9faW5kZXgsIHNhbml0aXplX3Bob25lX251bWJlciB9IGZyb20gXCIuLi91dGlscy91dGlsXCI7XG5pbXBvcnQge1xuICAgIGJ1aWxkX3Bhc3Nlc19zdHJpbmcsXG4gICAgQ29tcFBhc3NUeXBlLFxuICAgIGdldF9jb21wX3Bhc3NfZGVzY3JpcHRpb24sXG59IGZyb20gXCIuLi91dGlscy9jb21wX3Bhc3Nlc1wiO1xuaW1wb3J0IHtcbiAgICBDb21wUGFzc1NoZWV0LFxuICAgIE1hbmFnZXJQYXNzU2hlZXQsXG4gICAgUGFzc1NoZWV0LFxufSBmcm9tIFwiLi4vc2hlZXRzL2NvbXBfcGFzc19zaGVldFwiO1xuaW1wb3J0IHsgU2VjdGlvblZhbHVlcyB9IGZyb20gJy4uL3V0aWxzL3NlY3Rpb25fdmFsdWVzJztcblxuZXhwb3J0IHR5cGUgQlZOU1BDaGVja2luUmVzcG9uc2UgPSB7XG4gICAgcmVzcG9uc2U/OiBzdHJpbmc7XG4gICAgbmV4dF9zdGVwPzogc3RyaW5nO1xufTtcbmV4cG9ydCB0eXBlIEhhbmRsZXJFdmVudCA9IFNlcnZlcmxlc3NFdmVudE9iamVjdDxcbiAgICB7XG4gICAgICAgIEZyb206IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAgICAgVG86IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAgICAgbnVtYmVyOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgICAgIHRlc3RfbnVtYmVyOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgICAgIEJvZHk6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICB9LFxuICAgIHt9LFxuICAgIHtcbiAgICAgICAgYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXA6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICB9XG4+O1xuXG5leHBvcnQgY29uc3QgTkVYVF9TVEVQUyA9IHtcbiAgICBBV0FJVF9DT01NQU5EOiBcImF3YWl0LWNvbW1hbmRcIixcbiAgICBBV0FJVF9DSEVDS0lOOiBcImF3YWl0LWNoZWNraW5cIixcbiAgICBDT05GSVJNX1JFU0VUOiBcImNvbmZpcm0tcmVzZXRcIixcbiAgICBBVVRIX1JFU0VUOiBcImF1dGgtcmVzZXRcIixcbiAgICBBV0FJVF9TRUNUSU9OOiBcImF3YWl0LXNlY3Rpb25cIixcbiAgICBBV0FJVF9QQVNTOiBcImF3YWl0LXBhc3NcIixcbiAgICBBV0FJVF9NRVNTQUdFOiBcImF3YWl0LW1lc3NhZ2VcIixcbn07XG5cbmNvbnN0IENPTU1BTkRTID0ge1xuICAgIE9OX0RVVFk6IFtcIm9uZHV0eVwiLCBcIm9uLWR1dHlcIl0sXG4gICAgU1RBVFVTOiBbXCJzdGF0dXNcIl0sXG4gICAgQ0hFQ0tJTjogW1wiY2hlY2tpblwiLCBcImNoZWNrLWluXCJdLFxuICAgIFNFQ1RJT05fQVNTSUdOTUVOVDogW1wic2VjdGlvblwiLCBcInNlY3Rpb24tYXNzaWdubWVudFwiLCBcInNlY3Rpb25hc3NpZ25tZW50XCIsIFwiYXNzaWdubWVudFwiXSxcbiAgICBDT01QX1BBU1M6IFtcImNvbXAtcGFzc1wiLCBcImNvbXBwYXNzXCIsIFwiY29tcFwiXSxcbiAgICBNQU5BR0VSX1BBU1M6IFtcIm1hbmFnZXItcGFzc1wiLCBcIm1hbmFnZXJwYXNzXCIsIFwibWFuYWdlclwiXSxcbiAgICBXSEFUU0FQUDogW1wid2hhdHNhcHBcIl0sXG4gICAgTUVTU0FHRTogW1wibWVzc2FnZVwiLCBcIm1zZ1wiXSxcbn07XG5cbmV4cG9ydCBjb25zdCBTTVNfTUFYX0xFTkdUSCA9IDE2MDtcbmV4cG9ydCBjb25zdCBNRVNTQUdFX1BSRUZJWF9URU1QTEFURSA9IFwiTWVzc2FnZSBmcm9tIFwiO1xuZXhwb3J0IGNvbnN0IE1FU1NBR0VfUFJFRklYX1NVRkZJWCA9IFwiOiBcIjtcblxuLyoqXG4gKiBSZXN1bHQgb2YgdmFsaWRhdGluZyBhbiBTTVMgbWVzc2FnZSBmb3IgR1NNLTcgY29tcGF0aWJpbGl0eSBhbmQgc2VnbWVudCBjb3VudC5cbiAqL1xuZXhwb3J0IHR5cGUgU21zVmFsaWRhdGlvblJlc3VsdCA9IHtcbiAgICAvKiogV2hldGhlciB0aGUgbWVzc2FnZSBpcyB2YWxpZCAoR1NNLTcgb25seSBhbmQgZml0cyBpbiBhIHNpbmdsZSBzZWdtZW50KS4gKi9cbiAgICB2YWxpZDogYm9vbGVhbjtcbiAgICAvKiogSWYgaW52YWxpZCwgdGhlIHJlYXNvbjogJ25vbl9nc203JyBvciAndG9vX21hbnlfc2VnbWVudHMnLiAqL1xuICAgIHJlYXNvbj86IFwibm9uX2dzbTdcIiB8IFwidG9vX21hbnlfc2VnbWVudHNcIjtcbiAgICAvKiogVGhlIG5vbi1HU00tNyBjaGFyYWN0ZXJzIGZvdW5kLCBpZiBhbnkuICovXG4gICAgbm9uX2dzbV9jaGFyYWN0ZXJzPzogc3RyaW5nW107XG4gICAgLyoqIFRoZSBudW1iZXIgb2YgU01TIHNlZ21lbnRzIHRoZSBtZXNzYWdlIHdvdWxkIHJlcXVpcmUuICovXG4gICAgc2VnbWVudHNfY291bnQ/OiBudW1iZXI7XG59O1xuXG4vKipcbiAqIFZhbGlkYXRlcyB0aGF0IGEgY29tcGxldGUgU01TIG1lc3NhZ2UgKHByZWZpeCArIGJvZHkpIHVzZXMgb25seSBHU00tNyBjaGFyYWN0ZXJzXG4gKiBhbmQgZml0cyB3aXRoaW4gYSBzaW5nbGUgU01TIHNlZ21lbnQuXG4gKlxuICogVXNlcyB0aGUgc21zLXNlZ21lbnRzLWNhbGN1bGF0b3IgbGlicmFyeSAobWFpbnRhaW5lZCBieSBUd2lsaW9EZXZFZCkgd2hpY2hcbiAqIHByb3ZpZGVzIGF1dGhvcml0YXRpdmUgR1NNLTcgY2hhcmFjdGVyIGRldGVjdGlvbi5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZnVsbF9tZXNzYWdlIC0gVGhlIGNvbXBsZXRlIG1lc3NhZ2UgdG8gdmFsaWRhdGUgKHByZWZpeCArIHVzZXIgdGV4dCkuXG4gKiBAcmV0dXJucyB7U21zVmFsaWRhdGlvblJlc3VsdH0gVGhlIHZhbGlkYXRpb24gcmVzdWx0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVfc21zX21lc3NhZ2UoZnVsbF9tZXNzYWdlOiBzdHJpbmcpOiBTbXNWYWxpZGF0aW9uUmVzdWx0IHtcbiAgICBjb25zdCB7IFNlZ21lbnRlZE1lc3NhZ2UgfSA9IHJlcXVpcmUoXCJzbXMtc2VnbWVudHMtY2FsY3VsYXRvclwiKTtcbiAgICBjb25zdCBzZWdtZW50ZWQgPSBuZXcgU2VnbWVudGVkTWVzc2FnZShmdWxsX21lc3NhZ2UpO1xuICAgIGNvbnN0IG5vbl9nc20gPSBzZWdtZW50ZWQuZ2V0Tm9uR3NtQ2hhcmFjdGVycygpIGFzIHN0cmluZ1tdO1xuXG4gICAgaWYgKG5vbl9nc20ubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsaWQ6IGZhbHNlLFxuICAgICAgICAgICAgcmVhc29uOiBcIm5vbl9nc203XCIsXG4gICAgICAgICAgICBub25fZ3NtX2NoYXJhY3RlcnM6IFsuLi5uZXcgU2V0KG5vbl9nc20pXSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoc2VnbWVudGVkLnNlZ21lbnRzQ291bnQgPiAxKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWxpZDogZmFsc2UsXG4gICAgICAgICAgICByZWFzb246IFwidG9vX21hbnlfc2VnbWVudHNcIixcbiAgICAgICAgICAgIHNlZ21lbnRzX2NvdW50OiBzZWdtZW50ZWQuc2VnbWVudHNDb3VudCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4geyB2YWxpZDogdHJ1ZSB9O1xufVxuXG4vKipcbiAqIEZvcm1hdHMgYSAxMC1kaWdpdCBwaG9uZSBudW1iZXIgc3RyaW5nIGFzIChYWFgpWFhYLVhYWFggZm9yIGRpc3BsYXkuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGVuX2RpZ2l0cyAtIEEgMTAtZGlnaXQgcGhvbmUgbnVtYmVyIHN0cmluZyAoZS5nLiBcIjEyMzQ1Njc4OTBcIikuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHBob25lIG51bWJlciAoZS5nLiBcIigxMjMpNDU2LTc4OTBcIikuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRfcGhvbmVfZm9yX2Rpc3BsYXkodGVuX2RpZ2l0czogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCgke3Rlbl9kaWdpdHMuc3Vic3RyaW5nKDAsIDMpfSkke3Rlbl9kaWdpdHMuc3Vic3RyaW5nKDMsIDYpfS0ke3Rlbl9kaWdpdHMuc3Vic3RyaW5nKDYsIDEwKX1gO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCVk5TUENoZWNraW5IYW5kbGVyIHtcbiAgICBTQ09QRVM6IHN0cmluZ1tdID0gW1wiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9zcHJlYWRzaGVldHNcIl07XG5cbiAgICBzbXNfcmVxdWVzdDogYm9vbGVhbjtcbiAgICByZXN1bHRfbWVzc2FnZXM6IHN0cmluZ1tdID0gW107XG4gICAgZnJvbTogc3RyaW5nO1xuICAgIHRvOiBzdHJpbmc7XG4gICAgYm9keTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIGJvZHlfcmF3OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgcGF0cm9sbGVyOiBQYXRyb2xsZXJSb3cgfCBudWxsO1xuICAgIGJ2bnNwX2NoZWNraW5fbmV4dF9zdGVwOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgY2hlY2tpbl9tb2RlOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgICBmYXN0X2NoZWNraW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBhc3NpZ25lZF9zZWN0aW9uOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAgIHR3aWxpb19jbGllbnQ6IFR3aWxpb0NsaWVudCB8IG51bGwgPSBudWxsO1xuICAgIHN5bmNfc2lkOiBzdHJpbmc7XG4gICAgcmVzZXRfc2NyaXB0X2lkOiBzdHJpbmc7XG5cbiAgICAvLyBDYWNoZSBjbGllbnRzXG4gICAgc3luY19jbGllbnQ6IFNlcnZpY2VDb250ZXh0IHwgbnVsbCA9IG51bGw7XG4gICAgdXNlcl9jcmVkczogVXNlckNyZWRzIHwgbnVsbCA9IG51bGw7XG4gICAgc2VydmljZV9jcmVkczogR29vZ2xlQXV0aCB8IG51bGwgPSBudWxsO1xuICAgIHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzIHwgbnVsbCA9IG51bGw7XG4gICAgdXNlcl9zY3JpcHRzX3NlcnZpY2U6IHNjcmlwdF92MS5TY3JpcHQgfCBudWxsID0gbnVsbDtcblxuICAgIGxvZ2luX3NoZWV0OiBMb2dpblNoZWV0IHwgbnVsbCA9IG51bGw7XG4gICAgc2Vhc29uX3NoZWV0OiBTZWFzb25TaGVldCB8IG51bGwgPSBudWxsO1xuICAgIGNvbXBfcGFzc19zaGVldDogQ29tcFBhc3NTaGVldCB8IG51bGwgPSBudWxsO1xuICAgIG1hbmFnZXJfcGFzc19zaGVldDogTWFuYWdlclBhc3NTaGVldCB8IG51bGwgPSBudWxsO1xuXG4gICAgY2hlY2tpbl92YWx1ZXM6IENoZWNraW5WYWx1ZXM7XG4gICAgY3VycmVudF9zaGVldF9kYXRlOiBEYXRlO1xuXG4gICAgY29tYmluZWRfY29uZmlnOiBDb21iaW5lZENvbmZpZztcbiAgICBjb25maWc6IEhhbmRsZXJDb25maWc7XG5cbiAgICBzZWN0aW9uX3ZhbHVlczogU2VjdGlvblZhbHVlcztcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgYSBuZXcgQlZOU1BDaGVja2luSGFuZGxlci5cbiAgICAgKiBAcGFyYW0ge0NvbnRleHQ8SGFuZGxlckVudmlyb25tZW50Pn0gY29udGV4dCAtIFRoZSBzZXJ2ZXJsZXNzIGZ1bmN0aW9uIGNvbnRleHQuXG4gICAgICogQHBhcmFtIHtTZXJ2ZXJsZXNzRXZlbnRPYmplY3Q8SGFuZGxlckV2ZW50Pn0gZXZlbnQgLSBUaGUgZXZlbnQgb2JqZWN0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBjb250ZXh0OiBDb250ZXh0PEhhbmRsZXJFbnZpcm9ubWVudD4sXG4gICAgICAgIGV2ZW50OiBTZXJ2ZXJsZXNzRXZlbnRPYmplY3Q8SGFuZGxlckV2ZW50PlxuICAgICkge1xuICAgICAgICAvLyBEZXRlcm1pbmUgbWVzc2FnZSBkZXRhaWxzIGZyb20gdGhlIGluY29taW5nIGV2ZW50LCB3aXRoIGZhbGxiYWNrIHZhbHVlc1xuICAgICAgICB0aGlzLnNtc19yZXF1ZXN0ID0gKGV2ZW50LkZyb20gfHwgZXZlbnQubnVtYmVyKSAhPT0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmZyb20gPSBldmVudC5Gcm9tIHx8IGV2ZW50Lm51bWJlciB8fCBldmVudC50ZXN0X251bWJlciE7XG4gICAgICAgIHRoaXMudG8gPSBzYW5pdGl6ZV9waG9uZV9udW1iZXIoZXZlbnQuVG8hKTtcbiAgICAgICAgdGhpcy5ib2R5ID0gZXZlbnQuQm9keT8udG9Mb3dlckNhc2UoKT8udHJpbSgpLnJlcGxhY2UoL1xccysvLCBcIi1cIik7XG4gICAgICAgIHRoaXMuYm9keV9yYXcgPSBldmVudC5Cb2R5XG4gICAgICAgIHRoaXMuYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXAgPVxuICAgICAgICAgICAgZXZlbnQucmVxdWVzdC5jb29raWVzLmJ2bnNwX2NoZWNraW5fbmV4dF9zdGVwO1xuICAgICAgICB0aGlzLmNvbWJpbmVkX2NvbmZpZyA9IHsgLi4uQ09ORklHLCAuLi5jb250ZXh0IH07XG4gICAgICAgIHRoaXMuY29uZmlnID0gdGhpcy5jb21iaW5lZF9jb25maWc7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMudHdpbGlvX2NsaWVudCA9IGNvbnRleHQuZ2V0VHdpbGlvQ2xpZW50KCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgaW5pdGlhbGl6aW5nIHR3aWxpb19jbGllbnRcIiwgZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zeW5jX3NpZCA9IGNvbnRleHQuU1lOQ19TSUQ7XG4gICAgICAgIHRoaXMucmVzZXRfc2NyaXB0X2lkID0gY29udGV4dC5TQ1JJUFRfSUQ7XG4gICAgICAgIHRoaXMucGF0cm9sbGVyID0gbnVsbDtcblxuICAgICAgICB0aGlzLmNoZWNraW5fdmFsdWVzID0gbmV3IENoZWNraW5WYWx1ZXMoQ09ORklHLkNIRUNLSU5fVkFMVUVTKTtcbiAgICAgICAgdGhpcy5jdXJyZW50X3NoZWV0X2RhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB0aGlzLnNlY3Rpb25fdmFsdWVzID0gbmV3IFNlY3Rpb25WYWx1ZXModGhpcy5jb21iaW5lZF9jb25maWcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlcyB0aGUgZmFzdCBjaGVjay1pbiBtb2RlIGZyb20gdGhlIG1lc3NhZ2UgYm9keS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYm9keSAtIFRoZSBtZXNzYWdlIGJvZHkuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgZmFzdCBjaGVjay1pbiBtb2RlIGlzIHBhcnNlZCwgb3RoZXJ3aXNlIGZhbHNlLlxuICAgICAqL1xuICAgIHBhcnNlX2Zhc3RfY2hlY2tpbl9tb2RlKGJvZHk6IHN0cmluZykge1xuICAgICAgICBjb25zdCBwYXJzZWQgPSB0aGlzLmNoZWNraW5fdmFsdWVzLnBhcnNlX2Zhc3RfY2hlY2tpbihib2R5KTtcbiAgICAgICAgaWYgKHBhcnNlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNraW5fbW9kZSA9IHBhcnNlZC5rZXk7XG4gICAgICAgICAgICB0aGlzLmZhc3RfY2hlY2tpbiA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIHRoZSBjaGVjay1pbiBtb2RlIGZyb20gdGhlIG1lc3NhZ2UgYm9keS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYm9keSAtIFRoZSBtZXNzYWdlIGJvZHkuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgY2hlY2staW4gbW9kZSBpcyBwYXJzZWQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKi9cbiAgICBwYXJzZV9jaGVja2luKGJvZHk6IHN0cmluZykge1xuICAgICAgICBjb25zdCBwYXJzZWQgPSB0aGlzLmNoZWNraW5fdmFsdWVzLnBhcnNlX2NoZWNraW4oYm9keSk7XG4gICAgICAgIGlmIChwYXJzZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5jaGVja2luX21vZGUgPSBwYXJzZWQua2V5O1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlcyB0aGUgY2hlY2staW4gbW9kZSBmcm9tIHRoZSBuZXh0IHN0ZXAuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgY2hlY2staW4gbW9kZSBpcyBwYXJzZWQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKi9cbiAgICBwYXJzZV9jaGVja2luX2Zyb21fbmV4dF9zdGVwKCkge1xuICAgICAgICBjb25zdCBsYXN0X3NlZ21lbnQgPSB0aGlzLmJ2bnNwX2NoZWNraW5fbmV4dF9zdGVwXG4gICAgICAgICAgICA/LnNwbGl0KFwiLVwiKVxuICAgICAgICAgICAgLnNsaWNlKC0xKVswXTtcbiAgICAgICAgaWYgKGxhc3Rfc2VnbWVudCAmJiBsYXN0X3NlZ21lbnQgaW4gdGhpcy5jaGVja2luX3ZhbHVlcy5ieV9rZXkpIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tpbl9tb2RlID0gbGFzdF9zZWdtZW50O1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlcyB0aGUgcGFzcyB0eXBlIGZyb20gdGhlIG5leHQgc3RlcC5cbiAgICAgKiBAcmV0dXJucyB7Q29tcFBhc3NUeXBlfSBUaGUgcGFyc2VkIHBhc3MgdHlwZS5cbiAgICAgKi9cbiAgICBwYXJzZV9wYXNzX2Zyb21fbmV4dF9zdGVwKCkge1xuICAgICAgICBjb25zdCBsYXN0X3NlZ21lbnQgPSB0aGlzLmJ2bnNwX2NoZWNraW5fbmV4dF9zdGVwXG4gICAgICAgICAgICA/LnNwbGl0KFwiLVwiKVxuICAgICAgICAgICAgLnNsaWNlKC0yKVxuICAgICAgICAgICAgLmpvaW4oXCItXCIpO1xuICAgICAgICByZXR1cm4gbGFzdF9zZWdtZW50IGFzIENvbXBQYXNzVHlwZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWxheXMgdGhlIGV4ZWN1dGlvbiBmb3IgYSBzcGVjaWZpZWQgbnVtYmVyIG9mIHNlY29uZHMuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlY29uZHMgLSBUaGUgbnVtYmVyIG9mIHNlY29uZHMgdG8gZGVsYXkuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9uYWw9ZmFsc2VdIC0gV2hldGhlciB0aGUgZGVsYXkgaXMgb3B0aW9uYWwuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIGFmdGVyIHRoZSBkZWxheS5cbiAgICAgKi9cbiAgICBkZWxheShzZWNvbmRzOiBudW1iZXIsIG9wdGlvbmFsOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKG9wdGlvbmFsICYmICF0aGlzLnNtc19yZXF1ZXN0KSB7XG4gICAgICAgICAgICBzZWNvbmRzID0gMSAvIDEwMDAuMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcykgPT4ge1xuICAgICAgICAgICAgc2V0VGltZW91dChyZXMsIHNlY29uZHMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kcyBhIG1lc3NhZ2UgdG8gdGhlIHVzZXIuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSBUaGUgbWVzc2FnZSB0byBzZW5kLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBtZXNzYWdlIGlzIHNlbnQuXG4gICAgICovXG4gICAgYXN5bmMgc2VuZF9tZXNzYWdlKG1lc3NhZ2U6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5zbXNfcmVxdWVzdCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXRfdHdpbGlvX2NsaWVudCgpLm1lc3NhZ2VzLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgdG86IHRoaXMuZnJvbSxcbiAgICAgICAgICAgICAgICBmcm9tOiB0aGlzLnRvLFxuICAgICAgICAgICAgICAgIGJvZHk6IG1lc3NhZ2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVzdWx0X21lc3NhZ2VzLnB1c2gobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIHRoZSBjaGVjay1pbiBwcm9jZXNzLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQQ2hlY2tpblJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgY2hlY2staW4gcmVzcG9uc2UuXG4gICAgICovXG4gICAgYXN5bmMgaGFuZGxlKCk6IFByb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5faGFuZGxlKCk7XG4gICAgICAgIGlmICghdGhpcy5zbXNfcmVxdWVzdCkge1xuICAgICAgICAgICAgaWYgKHJlc3VsdD8ucmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdF9tZXNzYWdlcy5wdXNoKHJlc3VsdC5yZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiB0aGlzLnJlc3VsdF9tZXNzYWdlcy5qb2luKFwiXFxuIyMjXFxuXCIpLFxuICAgICAgICAgICAgICAgIG5leHRfc3RlcDogcmVzdWx0Py5uZXh0X3N0ZXAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW50ZXJuYWwgbWV0aG9kIHRvIGhhbmRsZSB0aGUgY2hlY2staW4gcHJvY2Vzcy5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUENoZWNraW5SZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGNoZWNrLWluIHJlc3BvbnNlLlxuICAgICAqL1xuICAgIGFzeW5jIF9oYW5kbGUoKTogUHJvbWlzZTxCVk5TUENoZWNraW5SZXNwb25zZT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgIGBSZWNlaXZlZCByZXF1ZXN0IGZyb20gJHt0aGlzLmZyb219IHdpdGggYm9keTogJHt0aGlzLmJvZHl9IGFuZCBzdGF0ZSAke3RoaXMuYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXB9YFxuICAgICAgICApO1xuICAgICAgICBpZiAodGhpcy5ib2R5ID09IFwibG9nb3V0XCIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIGxvZ291dGApO1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMubG9nb3V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlc3BvbnNlOiBCVk5TUENoZWNraW5SZXNwb25zZSB8IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKCF0aGlzLmNvbmZpZy5VU0VfU0VSVklDRV9BQ0NPVU5UKSB7XG4gICAgICAgICAgICByZXNwb25zZSA9IGF3YWl0IHRoaXMuY2hlY2tfdXNlcl9jcmVkcygpO1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlKSByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYm9keT8udG9Mb3dlckNhc2UoKSA9PT0gXCJyZXN0YXJ0XCIpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHJlc3BvbnNlOiBcIk9rYXkuIFRleHQgbWUgYWdhaW4gdG8gc3RhcnQgb3Zlci4uLlwiIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXNwb25zZSA9IGF3YWl0IHRoaXMuZ2V0X21hcHBlZF9wYXRyb2xsZXIoKTtcbiAgICAgICAgaWYgKHJlc3BvbnNlIHx8IHRoaXMucGF0cm9sbGVyID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UgfHwge1xuICAgICAgICAgICAgICAgICAgICByZXNwb25zZTogXCJVbmV4cGVjdGVkIGVycm9yIGxvb2tpbmcgdXAgcGF0cm9sbGVyIG1hcHBpbmdcIixcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgKCF0aGlzLmJ2bnNwX2NoZWNraW5fbmV4dF9zdGVwIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5idm5zcF9jaGVja2luX25leHRfc3RlcCA9PSBORVhUX1NURVBTLkFXQUlUX0NPTU1BTkQpICYmXG4gICAgICAgICAgICB0aGlzLmJvZHlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zdCBhd2FpdF9yZXNwb25zZSA9IGF3YWl0IHRoaXMuaGFuZGxlX2F3YWl0X2NvbW1hbmQoKTtcbiAgICAgICAgICAgIGlmIChhd2FpdF9yZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdF9yZXNwb25zZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHRoaXMuYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXAgPT0gTkVYVF9TVEVQUy5BV0FJVF9DSEVDS0lOICYmXG4gICAgICAgICAgICB0aGlzLmJvZHlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wYXJzZV9jaGVja2luKHRoaXMuYm9keSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5jaGVja2luKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICB0aGlzLmJ2bnNwX2NoZWNraW5fbmV4dF9zdGVwPy5zdGFydHNXaXRoKFxuICAgICAgICAgICAgICAgIE5FWFRfU1RFUFMuQ09ORklSTV9SRVNFVFxuICAgICAgICAgICAgKSAmJlxuICAgICAgICAgICAgdGhpcy5ib2R5XG4gICAgICAgICkge1xuICAgICAgICAgICAgaWYgKHRoaXMuYm9keSA9PSBcInllc1wiICYmIHRoaXMucGFyc2VfY2hlY2tpbl9mcm9tX25leHRfc3RlcCgpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgICAgIGBQZXJmb3JtaW5nIHJlc2V0X3NoZWV0X2Zsb3cgZm9yICR7dGhpcy5wYXRyb2xsZXIubmFtZX0gd2l0aCBjaGVja2luIG1vZGU6ICR7dGhpcy5jaGVja2luX21vZGV9YFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgKGF3YWl0IHRoaXMucmVzZXRfc2hlZXRfZmxvdygpKSB8fCAoYXdhaXQgdGhpcy5jaGVja2luKCkpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHRoaXMuYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXA/LnN0YXJ0c1dpdGgoTkVYVF9TVEVQUy5BVVRIX1JFU0VUKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcnNlX2NoZWNraW5fZnJvbV9uZXh0X3N0ZXAoKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgICAgICBgUGVyZm9ybWluZyByZXNldF9zaGVldF9mbG93LXBvc3QtYXV0aCBmb3IgJHt0aGlzLnBhdHJvbGxlci5uYW1lfSB3aXRoIGNoZWNraW4gbW9kZTogJHt0aGlzLmNoZWNraW5fbW9kZX1gXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAoYXdhaXQgdGhpcy5yZXNldF9zaGVldF9mbG93KCkpIHx8IChhd2FpdCB0aGlzLmNoZWNraW4oKSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgdGhpcy5idm5zcF9jaGVja2luX25leHRfc3RlcD8uc3RhcnRzV2l0aChORVhUX1NURVBTLkFXQUlUX1BBU1MpICYmXG4gICAgICAgICAgICB0aGlzLmJvZHlfcmF3XG4gICAgICAgICkge1xuICAgICAgICAgICAgY29uc3QgdHlwZSA9IHRoaXMucGFyc2VfcGFzc19mcm9tX25leHRfc3RlcCgpO1xuICAgICAgICAgICAgY29uc3QgZ3Vlc3RfbmFtZSA9IHRoaXMuYm9keV9yYXc7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgZ3Vlc3RfbmFtZS50cmltKCkgIT09IFwiXCIgJiZcbiAgICAgICAgICAgICAgICBbQ29tcFBhc3NUeXBlLkNvbXBQYXNzLCBDb21wUGFzc1R5cGUuTWFuYWdlclBhc3NdLmluY2x1ZGVzKHR5cGUpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5wcm9tcHRfY29tcF9tYW5hZ2VyX3Bhc3ModHlwZSwgZ3Vlc3RfbmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICB0aGlzLmJ2bnNwX2NoZWNraW5fbmV4dF9zdGVwPy5zdGFydHNXaXRoKE5FWFRfU1RFUFMuQVdBSVRfU0VDVElPTikgJiZcbiAgICAgICAgICAgIHRoaXMuYm9keVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnN0IHNlY3Rpb24gPSB0aGlzLnNlY3Rpb25fdmFsdWVzLnBhcnNlX3NlY3Rpb24odGhpcy5ib2R5KVxuICAgICAgICAgICAgaWYgKHNlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5hc3NpZ25fc2VjdGlvbihzZWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnByb21wdF9zZWN0aW9uX2Fzc2lnbm1lbnQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHRoaXMuYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXAgPT09IE5FWFRfU1RFUFMuQVdBSVRfTUVTU0FHRSAmJlxuICAgICAgICAgICAgdGhpcy5ib2R5X3Jhd1xuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnNlbmRfdGV4dF9tZXNzYWdlKHRoaXMuYm9keV9yYXcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXApIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuc2VuZF9tZXNzYWdlKFwiU29ycnksIEkgZGlkbid0IHVuZGVyc3RhbmQgdGhhdC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucHJvbXB0X2NvbW1hbmQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIHRoZSBhd2FpdCBjb21tYW5kIHN0ZXAuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2UgfCB1bmRlZmluZWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSByZXNwb25zZSBvciB1bmRlZmluZWQuXG4gICAgICovXG4gICAgYXN5bmMgaGFuZGxlX2F3YWl0X2NvbW1hbmQoKTogUHJvbWlzZTxCVk5TUENoZWNraW5SZXNwb25zZSB8IHVuZGVmaW5lZD4ge1xuICAgICAgICBjb25zdCBwYXRyb2xsZXJfbmFtZSA9IHRoaXMucGF0cm9sbGVyIS5uYW1lO1xuICAgICAgICBpZiAodGhpcy5wYXJzZV9mYXN0X2NoZWNraW5fbW9kZSh0aGlzLmJvZHkhKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgYFBlcmZvcm1pbmcgZmFzdCBjaGVja2luIGZvciAke3BhdHJvbGxlcl9uYW1lfSB3aXRoIG1vZGU6ICR7dGhpcy5jaGVja2luX21vZGV9YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmNoZWNraW4oKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQ09NTUFORFMuT05fRFVUWS5pbmNsdWRlcyh0aGlzLmJvZHkhKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmZvcm1pbmcgZ2V0X29uX2R1dHkgZm9yICR7cGF0cm9sbGVyX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4geyByZXNwb25zZTogYXdhaXQgdGhpcy5nZXRfb25fZHV0eSgpIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJDaGVja2luZyBmb3Igc3RhdHVzLi4uXCIpO1xuICAgICAgICBpZiAoQ09NTUFORFMuU1RBVFVTLmluY2x1ZGVzKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBnZXRfc3RhdHVzIGZvciAke3BhdHJvbGxlcl9uYW1lfWApO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X3N0YXR1cygpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDT01NQU5EUy5DSEVDS0lOLmluY2x1ZGVzKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBwcm9tcHRfY2hlY2tpbiBmb3IgJHtwYXRyb2xsZXJfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb21wdF9jaGVja2luKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKENPTU1BTkRTLkNPTVBfUEFTUy5pbmNsdWRlcyh0aGlzLmJvZHkhKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmZvcm1pbmcgY29tcF9wYXNzIGZvciAke3BhdHJvbGxlcl9uYW1lfWApO1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucHJvbXB0X2NvbXBfbWFuYWdlcl9wYXNzKFxuICAgICAgICAgICAgICAgIENvbXBQYXNzVHlwZS5Db21wUGFzcyxcbiAgICAgICAgICAgICAgICBudWxsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnBhcnNlX2Zhc3Rfc2VjdGlvbl9hc3NpZ25tZW50KHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBmYXN0IHNlY3Rpb25fYXNzaWdubWVudCBmb3IgJHtwYXRyb2xsZXJfbmFtZX0gdG8gJHt0aGlzLmFzc2lnbmVkX3NlY3Rpb259YCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5hc3NpZ25fc2VjdGlvbih0aGlzLmFzc2lnbmVkX3NlY3Rpb24pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDT01NQU5EUy5TRUNUSU9OX0FTU0lHTk1FTlQuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIHNlY3Rpb25fYXNzaWdubWVudCBmb3IgJHtwYXRyb2xsZXJfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnByb21wdF9zZWN0aW9uX2Fzc2lnbm1lbnQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQ09NTUFORFMuTUFOQUdFUl9QQVNTLmluY2x1ZGVzKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBtYW5hZ2VyX3Bhc3MgZm9yICR7cGF0cm9sbGVyX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5wcm9tcHRfY29tcF9tYW5hZ2VyX3Bhc3MoXG4gICAgICAgICAgICAgICAgQ29tcFBhc3NUeXBlLk1hbmFnZXJQYXNzLFxuICAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKENPTU1BTkRTLldIQVRTQVBQLmluY2x1ZGVzKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgSSdtIGF2YWlsYWJsZSBvbiB3aGF0c2FwcCBhcyB3ZWxsISBXaGF0c2FwcCB1c2VzIFdpZmkvQ2VsbCBEYXRhIGluc3RlYWQgb2YgU01TLCBhbmQgY2FuIGJlIG1vcmUgcmVsaWFibGUuIE1lc3NhZ2UgbWUgYXQgaHR0cHM6Ly93YS5tZS8xJHt0aGlzLnRvfWAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChDT01NQU5EUy5NRVNTQUdFLmluY2x1ZGVzKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBtZXNzYWdlIGZvciAke3BhdHJvbGxlcl9uYW1lfWApO1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucHJvbXB0X21lc3NhZ2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb21wdHMgdGhlIHVzZXIgZm9yIGEgY29tbWFuZC5cbiAgICAgKiBAcmV0dXJucyB7QlZOU1BDaGVja2luUmVzcG9uc2V9IFRoZSByZXNwb25zZSBwcm9tcHRpbmcgdGhlIHVzZXIgZm9yIGEgY29tbWFuZC5cbiAgICAgKi9cbiAgICBwcm9tcHRfY29tbWFuZCgpOiBCVk5TUENoZWNraW5SZXNwb25zZSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZTogYCR7dGhpcy5wYXRyb2xsZXIhLm5hbWV9LCBJJ20gdGhlIEJWTlNQIEJvdC5cbkVudGVyIGEgY29tbWFuZDpcbkNoZWNrIGluIC8gQ2hlY2sgb3V0IC8gU3RhdHVzIC8gT24gRHV0eSAvIFNlY3Rpb24gQXNzaWdubWVudCAvIENvbXAgUGFzcyAvIE1hbmFnZXIgUGFzcyAvIE1lc3NhZ2UgLyBXaGF0c2FwcFxuU2VuZCAncmVzdGFydCcgYXQgYW55IHRpbWUgdG8gYmVnaW4gYWdhaW5gLFxuICAgICAgICAgICAgbmV4dF9zdGVwOiBORVhUX1NURVBTLkFXQUlUX0NPTU1BTkQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvbXB0cyB0aGUgdXNlciBmb3IgYSBjaGVjay1pbi5cbiAgICAgKiBAcmV0dXJucyB7QlZOU1BDaGVja2luUmVzcG9uc2V9IFRoZSByZXNwb25zZSBwcm9tcHRpbmcgdGhlIHVzZXIgZm9yIGEgY2hlY2staW4uXG4gICAgICovXG4gICAgcHJvbXB0X2NoZWNraW4oKTogQlZOU1BDaGVja2luUmVzcG9uc2Uge1xuICAgICAgICBjb25zdCB0eXBlcyA9IE9iamVjdC52YWx1ZXModGhpcy5jaGVja2luX3ZhbHVlcy5ieV9rZXkpLm1hcChcbiAgICAgICAgICAgICh4KSA9PiB4LnNtc19kZXNjXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZTogYCR7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXIhLm5hbWVcbiAgICAgICAgICAgIH0sIHVwZGF0ZSBwYXRyb2xsaW5nIHN0YXR1cyB0bzogJHt0eXBlc1xuICAgICAgICAgICAgICAgIC5zbGljZSgwLCAtMSlcbiAgICAgICAgICAgICAgICAuam9pbihcIiwgXCIpfSwgb3IgJHt0eXBlcy5zbGljZSgtMSl9P2AsXG4gICAgICAgICAgICBuZXh0X3N0ZXA6IE5FWFRfU1RFUFMuQVdBSVRfQ0hFQ0tJTixcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIFBhcnNlcyB0aGUgZmFzdCBzZWN0aW9uIGFzc2lnbm1lbnQgZnJvbSB0aGUgbWVzc2FnZSBib2R5LlxuICAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHkgLSBUaGUgbWVzc2FnZSBib2R5LlxuICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNlY3Rpb24gYXNzaWdubWVudCBpcyBwYXJzZWQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAqL1xuICAgIHBhcnNlX2Zhc3Rfc2VjdGlvbl9hc3NpZ25tZW50KGJvZHk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHRoaXMuYXNzaWduZWRfc2VjdGlvbiA9IG51bGw7XG4gICAgaWYgKCFib2R5IHx8ICFib2R5LmluY2x1ZGVzKFwiLVwiKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHNlZ21lbnRzID0gYm9keS5zcGxpdChcIi1cIik7XG4gICAgY29uc3QgbGFzdFNlZ21lbnQgPSBzZWdtZW50cy5wb3AoKTtcbiAgICBjb25zdCBmaXJzdFBhcnQgPSBzZWdtZW50cy5qb2luKFwiLVwiKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgaWYgKGxhc3RTZWdtZW50ICYmIENPTU1BTkRTLlNFQ1RJT05fQVNTSUdOTUVOVC5pbmNsdWRlcyhmaXJzdFBhcnQpKSB7XG4gICAgICAgIHRoaXMuYXNzaWduZWRfc2VjdGlvbiA9IHRoaXMuc2VjdGlvbl92YWx1ZXMubWFwX3NlY3Rpb24obGFzdFNlZ21lbnQudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgIHJldHVybiB0aGlzLmFzc2lnbmVkX3NlY3Rpb24gIT09IG51bGwgJiYgdGhpcy5hc3NpZ25lZF9zZWN0aW9uICE9PSBcIlwiO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvbXB0cyB0aGUgdXNlciBmb3Igc2VjdGlvbiBhc3NpZ25tZW50LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQQ2hlY2tpblJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcmVzcG9uc2UuXG4gICAgICovXG4gICAgYXN5bmMgcHJvbXB0X3NlY3Rpb25fYXNzaWdubWVudCgpOiBQcm9taXNlPEJWTlNQQ2hlY2tpblJlc3BvbnNlPiB7XG4gICAgICAgIGlmICghdGhpcy5wYXRyb2xsZXIgfHwgIXRoaXMucGF0cm9sbGVyLmNoZWNraW4pIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGAke3RoaXMucGF0cm9sbGVyIS5uYW1lfSBpcyBub3QgY2hlY2tlZCBpbi5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZWN0aW9uX2Rlc2NyaXB0aW9uID0gdGhpcy5zZWN0aW9uX3ZhbHVlcy5nZXRfc2VjdGlvbl9kZXNjcmlwdGlvbigpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IGBFbnRlciB5b3VyIGFzc2lnbmVkIHNlY3Rpb247IG9uZSBvZiAke3NlY3Rpb25fZGVzY3JpcHRpb259IChvciAncmVzdGFydCcpYCxcbiAgICAgICAgICAgIG5leHRfc3RlcDogTkVYVF9TVEVQUy5BV0FJVF9TRUNUSU9OLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEJ1aWxkcyB0aGUgbWVzc2FnZSBwcmVmaXggZm9yIGEgdGV4dCBtZXNzYWdlIGZyb20gYSBwYXRyb2xsZXIuXG4gICAgICogSW5jbHVkZXMgdGhlIHNlbmRlcidzIG5hbWUgYW5kIGZvcm1hdHRlZCBwaG9uZSBudW1iZXIuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbmRlcl9uYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHBhdHJvbGxlciBzZW5kaW5nIHRoZSBtZXNzYWdlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZW5kZXJfcGhvbmUgLSBUaGUgc2VuZGVyJ3MgMTAtZGlnaXQgcGhvbmUgbnVtYmVyLlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBtZXNzYWdlIHByZWZpeCAoZS5nLiwgXCJNZXNzYWdlIGZyb20gSm9obiBEb2UgKDEyMyk0NTYtNzg5MDogXCIpLlxuICAgICAqL1xuICAgIGdldF9tZXNzYWdlX3ByZWZpeChzZW5kZXJfbmFtZTogc3RyaW5nLCBzZW5kZXJfcGhvbmU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZF9waG9uZSA9IGZvcm1hdF9waG9uZV9mb3JfZGlzcGxheShzZW5kZXJfcGhvbmUpO1xuICAgICAgICByZXR1cm4gYCR7TUVTU0FHRV9QUkVGSVhfVEVNUExBVEV9JHtzZW5kZXJfbmFtZX0gJHtmb3JtYXR0ZWRfcGhvbmV9JHtNRVNTQUdFX1BSRUZJWF9TVUZGSVh9YDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGVzIHRoZSBtYXhpbXVtIGFsbG93ZWQgbWVzc2FnZSBsZW5ndGggZm9yIGEgdGV4dCBtZXNzYWdlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZW5kZXJfbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwYXRyb2xsZXIgc2VuZGluZyB0aGUgbWVzc2FnZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VuZGVyX3Bob25lIC0gVGhlIHNlbmRlcidzIDEwLWRpZ2l0IHBob25lIG51bWJlci5cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgbWF4aW11bSBudW1iZXIgb2YgY2hhcmFjdGVycyB0aGUgdXNlcidzIG1lc3NhZ2UgY2FuIGNvbnRhaW4uXG4gICAgICovXG4gICAgZ2V0X21heF9tZXNzYWdlX2xlbmd0aChzZW5kZXJfbmFtZTogc3RyaW5nLCBzZW5kZXJfcGhvbmU6IHN0cmluZyk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBTTVNfTUFYX0xFTkdUSCAtIHRoaXMuZ2V0X21lc3NhZ2VfcHJlZml4KHNlbmRlcl9uYW1lLCBzZW5kZXJfcGhvbmUpLmxlbmd0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm9tcHRzIHRoZSB1c2VyIHRvIHR5cGUgdGhlaXIgdGV4dCBtZXNzYWdlLlxuICAgICAqIEFueSBwYXRyb2xsZXIgd2l0aCBhIHZhbGlkIHBob25lIG51bWJlciBjYW4gc2VuZCBhIG1lc3NhZ2UsIHJlZ2FyZGxlc3NcbiAgICAgKiBvZiB0aGVpciBvd24gY2hlY2staW4gc3RhdHVzLiAgVGhlIHJlY2lwaWVudCBsaXN0IGluY2x1ZGVzIGFsbFxuICAgICAqIHBhdHJvbGxlcnMgd2hvIGhhdmUgYW55IGNoZWNrLWluIHN0YXR1cyAoQWxsIERheSwgSGFsZiBBTSwgSGFsZiBQTSxcbiAgICAgKiBvciBDaGVja2VkIE91dCksIGluY2x1ZGluZyB0aGUgc2VuZGVyIHRoZW1zZWx2ZXMgaWYgdGhleSBhcmUgY2hlY2tlZCBpbi5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUENoZWNraW5SZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHByb21wdCByZXNwb25zZS5cbiAgICAgKi9cbiAgICBhc3luYyBwcm9tcHRfbWVzc2FnZSgpOiBQcm9taXNlPEJWTlNQQ2hlY2tpblJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKTtcbiAgICAgICAgY29uc3QgcmVjaXBpZW50cyA9IGxvZ2luX3NoZWV0LmdldF9vbl9kdXR5X3BhdHJvbGxlcnMoKTtcbiAgICAgICAgaWYgKHJlY2lwaWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgTm8gcGF0cm9sbGVycyBhcmUgY3VycmVudGx5IGxvZ2dlZCBpbi4gVGhlcmUgaXMgbm9ib2R5IHRvIHNlbmQgYSBtZXNzYWdlIHRvLmAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNlbmRlcl9waG9uZSA9IHNhbml0aXplX3Bob25lX251bWJlcih0aGlzLmZyb20pO1xuICAgICAgICBjb25zdCBtYXhfbGVuZ3RoID0gdGhpcy5nZXRfbWF4X21lc3NhZ2VfbGVuZ3RoKHRoaXMucGF0cm9sbGVyIS5uYW1lLCBzZW5kZXJfcGhvbmUpO1xuICAgICAgICBpZiAobWF4X2xlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgWW91ciBuYW1lIGlzIHRvbyBsb25nIHRvIHNlbmQgYSB0ZXh0IG1lc3NhZ2UuYCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3BvbnNlOiBgUGxlYXNlIHR5cGUgYSBtZXNzYWdlIG9mIG5vIG1vcmUgdGhhbiAke21heF9sZW5ndGh9IHBsYWluLXRleHQgY2hhcmFjdGVycyB0byAke3JlY2lwaWVudHMubGVuZ3RofSBwYXRyb2xsZXIke3JlY2lwaWVudHMubGVuZ3RoICE9PSAxID8gXCJzXCIgOiBcIlwifSwgb3IgJ3Jlc3RhcnQnIHRvIGNhbmNlbC5gLFxuICAgICAgICAgICAgbmV4dF9zdGVwOiBORVhUX1NURVBTLkFXQUlUX01FU1NBR0UsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VuZHMgYSB0ZXh0IG1lc3NhZ2UgdG8gYWxsIHBhdHJvbGxlcnMgd2l0aCBhIGNoZWNrLWluIHN0YXR1cyBmb3IgdGhlIGRheS5cbiAgICAgKiBUaGUgc2VuZGVyIGFsc28gcmVjZWl2ZXMgdGhlIG1lc3NhZ2UgaWYgdGhleSBoYXZlIGEgY2hlY2staW4gc3RhdHVzLlxuICAgICAqIFZhbGlkYXRlcyB0aGF0IHRoZSBjb21wbGV0ZSBtZXNzYWdlIChwcmVmaXggKyBib2R5KSB1c2VzIG9ubHkgR1NNLTdcbiAgICAgKiBjaGFyYWN0ZXJzIGFuZCBmaXRzIHdpdGhpbiBhIHNpbmdsZSBTTVMgc2VnbWVudCwgdXNpbmcgdGhlXG4gICAgICogc21zLXNlZ21lbnRzLWNhbGN1bGF0b3IgbGlicmFyeS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZV90ZXh0IC0gVGhlIHJhdyBtZXNzYWdlIHRleHQgZnJvbSB0aGUgc2VuZGVyLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQQ2hlY2tpblJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgc2VuZCByZXN1bHQuXG4gICAgICovXG4gICAgYXN5bmMgc2VuZF90ZXh0X21lc3NhZ2UobWVzc2FnZV90ZXh0OiBzdHJpbmcpOiBQcm9taXNlPEJWTlNQQ2hlY2tpblJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnN0IHNlbmRlcl9uYW1lID0gdGhpcy5wYXRyb2xsZXIhLm5hbWU7XG4gICAgICAgIGNvbnN0IHNlbmRlcl9waG9uZSA9IHNhbml0aXplX3Bob25lX251bWJlcih0aGlzLmZyb20pO1xuICAgICAgICBjb25zdCBwcmVmaXggPSB0aGlzLmdldF9tZXNzYWdlX3ByZWZpeChzZW5kZXJfbmFtZSwgc2VuZGVyX3Bob25lKTtcbiAgICAgICAgY29uc3QgbWF4X2xlbmd0aCA9IHRoaXMuZ2V0X21heF9tZXNzYWdlX2xlbmd0aChzZW5kZXJfbmFtZSwgc2VuZGVyX3Bob25lKTtcbiAgICAgICAgY29uc3QgZnVsbF9tZXNzYWdlID0gcHJlZml4ICsgbWVzc2FnZV90ZXh0O1xuXG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb24gPSB2YWxpZGF0ZV9zbXNfbWVzc2FnZShmdWxsX21lc3NhZ2UpO1xuICAgICAgICBpZiAoIXZhbGlkYXRpb24udmFsaWQpIHtcbiAgICAgICAgICAgIGlmICh2YWxpZGF0aW9uLnJlYXNvbiA9PT0gXCJub25fZ3NtN1wiKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYmFkX2NoYXJzID0gdmFsaWRhdGlvbi5ub25fZ3NtX2NoYXJhY3RlcnMhLmpvaW4oXCIgXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgWW91ciBtZXNzYWdlIGNvbnRhaW5zIGNoYXJhY3RlcnMgdGhhdCBhcmUgbm90IHN1cHBvcnRlZCBpbiBwbGFpbi10ZXh0IFNNUzogJHtiYWRfY2hhcnN9LiBQbGVhc2UgdXNlIG9ubHkgc3RhbmRhcmQgY2hhcmFjdGVycyBhbmQgdHJ5IGFnYWluLmAsXG4gICAgICAgICAgICAgICAgICAgIG5leHRfc3RlcDogTkVYVF9TVEVQUy5BV0FJVF9NRVNTQUdFLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyB0b29fbWFueV9zZWdtZW50cyDigJQgbWVzc2FnZSBpcyB0b28gbG9uZ1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYFlvdXIgbWVzc2FnZSBpcyAke21lc3NhZ2VfdGV4dC5sZW5ndGh9IGNoYXJhY3RlcnMsIHdoaWNoIGV4Y2VlZHMgdGhlIGxpbWl0IG9mICR7bWF4X2xlbmd0aH0uIFBsZWFzZSBzaG9ydGVuIHlvdXIgbWVzc2FnZSBhbmQgdHJ5IGFnYWluLCBvciB0eXBlICdyZXN0YXJ0JyB0byBjYW5jZWwuYCxcbiAgICAgICAgICAgICAgICBuZXh0X3N0ZXA6IE5FWFRfU1RFUFMuQVdBSVRfTUVTU0FHRSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG4gICAgICAgIGNvbnN0IHNpZ25lZF9pbl9wYXRyb2xsZXJzID0gbG9naW5fc2hlZXQuZ2V0X29uX2R1dHlfcGF0cm9sbGVycygpO1xuICAgICAgICBjb25zdCBwaG9uZV9tYXAgPSBhd2FpdCB0aGlzLmdldF9waG9uZV9udW1iZXJfbWFwKCk7XG5cbiAgICAgICAgbGV0IHNlbnRfY291bnQgPSAwO1xuICAgICAgICBsZXQgZmFpbGVkX25hbWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICBsZXQgY29weV9zZW50X3RvX3NlbmRlciA9IGZhbHNlO1xuXG4gICAgICAgIGZvciAoY29uc3QgcGF0cm9sbGVyIG9mIHNpZ25lZF9pbl9wYXRyb2xsZXJzKSB7XG4gICAgICAgICAgICBjb25zdCBwaG9uZSA9IHBob25lX21hcFtwYXRyb2xsZXIubmFtZV07XG4gICAgICAgICAgICBpZiAoIXBob25lKSB7XG4gICAgICAgICAgICAgICAgZmFpbGVkX25hbWVzLnB1c2gocGF0cm9sbGVyLm5hbWUpO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmdldF90d2lsaW9fY2xpZW50KCkubWVzc2FnZXMuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgdG86IHBob25lLFxuICAgICAgICAgICAgICAgICAgICBmcm9tOiB0aGlzLnRvLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiBmdWxsX21lc3NhZ2UsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc2VudF9jb3VudCsrO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBGYWlsZWQgdG8gc2VuZCB0ZXh0IG1lc3NhZ2UgdG8gJHtwYXRyb2xsZXIubmFtZX06ICR7ZX1gKTtcbiAgICAgICAgICAgICAgICBmYWlsZWRfbmFtZXMucHVzaChwYXRyb2xsZXIubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzZW5kZXJfaW5fc2lnbmVkX2luID0gc2lnbmVkX2luX3BhdHJvbGxlcnMuc29tZShwID0+IHAubmFtZSA9PT0gc2VuZGVyX25hbWUpO1xuICAgICAgICBpZiAoIXNlbmRlcl9pbl9zaWduZWRfaW4pIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXRfdHdpbGlvX2NsaWVudCgpLm1lc3NhZ2VzLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHRvOiB0aGlzLmZyb20sXG4gICAgICAgICAgICAgICAgICAgIGZyb206IHRoaXMudG8sXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IGZ1bGxfbWVzc2FnZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb3B5X3NlbnRfdG9fc2VuZGVyID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgRmFpbGVkIHRvIHNlbmQgdGV4dCBtZXNzYWdlIHRvIHNlbmRlciAke3NlbmRlcl9uYW1lfTogJHtlfWApO1xuICAgICAgICAgICAgICAgIGZhaWxlZF9uYW1lcy5wdXNoKHNlbmRlcl9uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEluY2x1ZGUgdGhlIHNlbmRlciBjb3B5IGluIHRoZSB0b3RhbCBsb2cgY291bnRcbiAgICAgICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKGB0ZXh0X21lc3NhZ2UoJHtzZW50X2NvdW50ICsgKGNvcHlfc2VudF90b19zZW5kZXIgPyAxIDogMCl9KWApO1xuXG4gICAgICAgIGxldCByZXNwb25zZSA9IGBNZXNzYWdlIHNlbnQgdG8gJHtzZW50X2NvdW50fSBwYXRyb2xsZXIke3NlbnRfY291bnQgIT09IDEgPyBcInNcIiA6IFwiXCJ9YDtcbiAgICAgICAgaWYgKGNvcHlfc2VudF90b19zZW5kZXIpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlICs9IGAgYW5kIGEgY29weSB0byB5b3UuYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3BvbnNlICs9IGAuYDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmYWlsZWRfbmFtZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmVzcG9uc2UgKz0gYCBDb3VsZCBub3Qgc2VuZCB0bzogJHtmYWlsZWRfbmFtZXMuam9pbihcIiwgXCIpfS5gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHJlc3BvbnNlIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9va3MgdXAgcGhvbmUgbnVtYmVycyBmb3IgYWxsIHBhdHJvbGxlcnMgZnJvbSB0aGUgUGhvbmUgTnVtYmVycyBzaGVldC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+Pn0gQSBtYXAgb2YgcGF0cm9sbGVyIG5hbWUgdG8gcGhvbmUgbnVtYmVyIChpbiArMVhYWFhYWFhYWFggZm9ybWF0KS5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfcGhvbmVfbnVtYmVyX21hcCgpOiBQcm9taXNlPFJlY29yZDxzdHJpbmcsIHN0cmluZz4+IHtcbiAgICAgICAgY29uc3Qgc2hlZXRzX3NlcnZpY2UgPSBhd2FpdCB0aGlzLmdldF9zaGVldHNfc2VydmljZSgpO1xuICAgICAgICBjb25zdCBvcHRzOiBGaW5kUGF0cm9sbGVyQ29uZmlnID0gdGhpcy5jb21iaW5lZF9jb25maWc7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgc2hlZXRzX3NlcnZpY2Uuc3ByZWFkc2hlZXRzLnZhbHVlcy5nZXQoe1xuICAgICAgICAgICAgc3ByZWFkc2hlZXRJZDogb3B0cy5TSEVFVF9JRCxcbiAgICAgICAgICAgIHJhbmdlOiBvcHRzLlBIT05FX05VTUJFUl9MT09LVVBfU0hFRVQsXG4gICAgICAgICAgICB2YWx1ZVJlbmRlck9wdGlvbjogXCJVTkZPUk1BVFRFRF9WQUxVRVwiLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhLnZhbHVlcykge1xuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IHJvdyBvZiByZXNwb25zZS5kYXRhLnZhbHVlcykge1xuICAgICAgICAgICAgY29uc3QgbmFtZSA9IHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5QSE9ORV9OVU1CRVJfTkFNRV9DT0xVTU4pXTtcbiAgICAgICAgICAgIGNvbnN0IHJhd051bWJlciA9IHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5QSE9ORV9OVU1CRVJfTlVNQkVSX0NPTFVNTildO1xuICAgICAgICAgICAgaWYgKG5hbWUgJiYgcmF3TnVtYmVyKSB7XG4gICAgICAgICAgICAgICAgbWFwW25hbWVdID0gYCsxJHtzYW5pdGl6ZV9waG9uZV9udW1iZXIocmF3TnVtYmVyKX1gO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXA7XG4gICAgfVxuXG4vKipcbiAqIEFzc2lnbnMgdGhlIHNlY3Rpb24gdG8gdGhlIHBhdHJvbGxlci5cbiAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbH0gc2VjdGlvbiAtIFRoZSBzZWN0aW9uIHRvIGFzc2lnbi5cbiAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQQ2hlY2tpblJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcmVzcG9uc2UuXG4gKi9cbmFzeW5jIGFzc2lnbl9zZWN0aW9uKHNlY3Rpb246IHN0cmluZyB8IG51bGwpOiBQcm9taXNlPEJWTlNQQ2hlY2tpblJlc3BvbnNlPiB7XG4gICAgY29uc3QgYXNzaWduZWRTZWN0aW9uID0gc2VjdGlvbiA/PyBcIlJvdmluZ1wiO1xuICAgIGNvbnNvbGUubG9nKGBBc3NpZ25pbmcgc2VjdGlvbiAke3RoaXMucGF0cm9sbGVyIS5uYW1lfSB0byAke2Fzc2lnbmVkU2VjdGlvbn1gKTtcbiAgICBjb25zdCBtYXBwZWRfc2VjdGlvbiA9IHRoaXMuc2VjdGlvbl92YWx1ZXMubWFwX3NlY3Rpb24oYXNzaWduZWRTZWN0aW9uKTtcbiAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oYGFzc2lnbl9zZWN0aW9uKCR7bWFwcGVkX3NlY3Rpb259KWApO1xuICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKTtcbiAgICBhd2FpdCBsb2dpbl9zaGVldC5hc3NpZ25fc2VjdGlvbih0aGlzLnBhdHJvbGxlciEsIG1hcHBlZF9zZWN0aW9uKTtcbiAgICBhd2FpdCB0aGlzLmxvZ2luX3NoZWV0Py5yZWZyZXNoKCk7XG4gICAgYXdhaXQgdGhpcy5nZXRfbWFwcGVkX3BhdHJvbGxlcih0cnVlKTtcbiAgICByZXR1cm4ge1xuICAgICAgICByZXNwb25zZTogYFVwZGF0ZWQgJHt0aGlzLnBhdHJvbGxlciEubmFtZX0gd2l0aCBzZWN0aW9uIGFzc2lnbm1lbnQ6ICR7bWFwcGVkX3NlY3Rpb259LmAsXG4gICAgfTtcbn1cblxuICAgIC8qKlxuICAgICAqIFByb21wdHMgdGhlIHVzZXIgZm9yIGEgY29tcCBvciBtYW5hZ2VyIHBhc3MuXG4gICAgICogQHBhcmFtIHtDb21wUGFzc1R5cGV9IHBhc3NfdHlwZSAtIFRoZSB0eXBlIG9mIHBhc3MuXG4gICAgICogQHBhcmFtIHtudW1iZXIgfCBudWxsfSBwYXNzZXNfdG9fdXNlIC0gVGhlIG51bWJlciBvZiBwYXNzZXMgdG8gdXNlLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQQ2hlY2tpblJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcmVzcG9uc2UuXG4gICAgICovXG4gICAgYXN5bmMgcHJvbXB0X2NvbXBfbWFuYWdlcl9wYXNzKFxuICAgICAgICBwYXNzX3R5cGU6IENvbXBQYXNzVHlwZSxcbiAgICAgICAgZ3Vlc3RfbmFtZTogc3RyaW5nIHwgbnVsbFxuICAgICk6IFByb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2U+IHtcbiAgICAgICAgaWYgKHRoaXMucGF0cm9sbGVyIS5jYXRlZ29yeSA9PSBcIkNcIikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYCR7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyIS5uYW1lXG4gICAgICAgICAgICAgICAgfSwgY2FuZGlkYXRlcyBkbyBub3QgcmVjZWl2ZSBjb21wIG9yIG1hbmFnZXIgcGFzc2VzLmAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNoZWV0OiBQYXNzU2hlZXQgPSBhd2FpdCAocGFzc190eXBlID09IENvbXBQYXNzVHlwZS5Db21wUGFzc1xuICAgICAgICAgICAgPyB0aGlzLmdldF9jb21wX3Bhc3Nfc2hlZXQoKVxuICAgICAgICAgICAgOiB0aGlzLmdldF9tYW5hZ2VyX3Bhc3Nfc2hlZXQoKSk7XG5cbiAgICAgICAgY29uc3QgdXNlZF9hbmRfYXZhaWxhYmxlID0gYXdhaXQgc2hlZXQuZ2V0X2F2YWlsYWJsZV9hbmRfdXNlZF9wYXNzZXMoXG4gICAgICAgICAgICB0aGlzLnBhdHJvbGxlcj8ubmFtZSFcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHVzZWRfYW5kX2F2YWlsYWJsZSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBcIlByb2JsZW0gbG9va2luZyB1cCBwYXRyb2xsZXIgZm9yIGNvbXAgcGFzc2VzXCIsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChndWVzdF9uYW1lID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB1c2VkX2FuZF9hdmFpbGFibGUuZ2V0X3Byb21wdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKGB1c2VfJHtwYXNzX3R5cGV9YCk7XG4gICAgICAgICAgICBhd2FpdCBzaGVldC5zZXRfdXNlZF9jb21wX3Bhc3Nlcyh1c2VkX2FuZF9hdmFpbGFibGUsIGd1ZXN0X25hbWUpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYFVwZGF0ZWQgJHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXIhLm5hbWVcbiAgICAgICAgICAgICAgICB9IHRvIHVzZSAke2dldF9jb21wX3Bhc3NfZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIHBhc3NfdHlwZVxuICAgICAgICAgICAgICAgICl9IGZvciBndWVzdCBcIiR7Z3Vlc3RfbmFtZX1cIiB0b2RheS5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHN0YXR1cyBvZiB0aGUgcGF0cm9sbGVyLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQQ2hlY2tpblJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgc3RhdHVzIHJlc3BvbnNlLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF9zdGF0dXMoKTogUHJvbWlzZTxCVk5TUENoZWNraW5SZXNwb25zZT4ge1xuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG4gICAgICAgIGNvbnN0IHNoZWV0X2RhdGUgPSBsb2dpbl9zaGVldC5zaGVldF9kYXRlLnRvRGF0ZVN0cmluZygpO1xuICAgICAgICBjb25zdCBjdXJyZW50X2RhdGUgPSBsb2dpbl9zaGVldC5jdXJyZW50X2RhdGUudG9EYXRlU3RyaW5nKCk7XG4gICAgICAgIGlmICghbG9naW5fc2hlZXQuaXNfY3VycmVudCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYHNoZWV0X2RhdGU6ICR7bG9naW5fc2hlZXQuc2hlZXRfZGF0ZX1gKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBjdXJyZW50X2RhdGU6ICR7bG9naW5fc2hlZXQuY3VycmVudF9kYXRlfWApO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYFNoZWV0IGlzIG5vdCBjdXJyZW50IGZvciB0b2RheSAobGFzdCByZXNldDogJHtzaGVldF9kYXRlfSkuICR7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyIS5uYW1lXG4gICAgICAgICAgICAgICAgfSBpcyBub3QgY2hlY2tlZCBpbiBmb3IgJHtjdXJyZW50X2RhdGV9LmAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0geyByZXNwb25zZTogYXdhaXQgdGhpcy5nZXRfc3RhdHVzX3N0cmluZygpIH07XG4gICAgICAgIGF3YWl0IHRoaXMubG9nX2FjdGlvbihcInN0YXR1c1wiKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHN0YXR1cyBzdHJpbmcgb2YgdGhlIHBhdHJvbGxlci5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzdHJpbmc+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBzdGF0dXMgc3RyaW5nLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF9zdGF0dXNfc3RyaW5nKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKTtcbiAgICAgICAgY29uc3QgY29tcF9wYXNzX3Byb21pc2UgPSAoXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmdldF9jb21wX3Bhc3Nfc2hlZXQoKVxuICAgICAgICApLmdldF9hdmFpbGFibGVfYW5kX3VzZWRfcGFzc2VzKHRoaXMucGF0cm9sbGVyIS5uYW1lKTtcbiAgICAgICAgY29uc3QgbWFuYWdlcl9wYXNzX3Byb21pc2UgPSAoXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmdldF9tYW5hZ2VyX3Bhc3Nfc2hlZXQoKVxuICAgICAgICApLmdldF9hdmFpbGFibGVfYW5kX3VzZWRfcGFzc2VzKHRoaXMucGF0cm9sbGVyIS5uYW1lKTtcbiAgICAgICAgY29uc3QgcGF0cm9sbGVyX3N0YXR1cyA9IHRoaXMucGF0cm9sbGVyITtcblxuICAgICAgICBjb25zdCBjaGVja2luQ29sdW1uU2V0ID1cbiAgICAgICAgICAgIHBhdHJvbGxlcl9zdGF0dXMuY2hlY2tpbiAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICBwYXRyb2xsZXJfc3RhdHVzLmNoZWNraW4gIT09IG51bGw7XG4gICAgICAgIGNvbnN0IGNoZWNrZWRPdXQgPVxuICAgICAgICAgICAgY2hlY2tpbkNvbHVtblNldCAmJlxuICAgICAgICAgICAgdGhpcy5jaGVja2luX3ZhbHVlcy5ieV9zaGVldF9zdHJpbmdbcGF0cm9sbGVyX3N0YXR1cy5jaGVja2luXS5rZXkgPT1cbiAgICAgICAgICAgICAgICBcIm91dFwiO1xuICAgICAgICBsZXQgc3RhdHVzID0gcGF0cm9sbGVyX3N0YXR1cy5jaGVja2luIHx8IFwiTm90IFByZXNlbnRcIjtcblxuICAgICAgICBpZiAoY2hlY2tlZE91dCkge1xuICAgICAgICAgICAgc3RhdHVzID0gXCJDaGVja2VkIE91dFwiO1xuICAgICAgICB9IGVsc2UgaWYgKGNoZWNraW5Db2x1bW5TZXQpIHtcbiAgICAgICAgICAgIGxldCBzZWN0aW9uID0gcGF0cm9sbGVyX3N0YXR1cy5zZWN0aW9uLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBpZiAoc2VjdGlvbi5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgICAgIHNlY3Rpb24gPSBgU2VjdGlvbiAke3NlY3Rpb259YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0YXR1cyA9IGAke3BhdHJvbGxlcl9zdGF0dXMuY2hlY2tpbn0gKCR7c2VjdGlvbn0pYDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbXBsZXRlZFBhdHJvbERheXMgPSBhd2FpdCAoXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmdldF9zZWFzb25fc2hlZXQoKVxuICAgICAgICApLmdldF9wYXRyb2xsZWRfZGF5cyh0aGlzLnBhdHJvbGxlciEubmFtZSk7XG4gICAgICAgIGNvbnN0IGNvbXBsZXRlZFBhdHJvbERheXNTdHJpbmcgPVxuICAgICAgICAgICAgY29tcGxldGVkUGF0cm9sRGF5cyA+IDAgPyBjb21wbGV0ZWRQYXRyb2xEYXlzLnRvU3RyaW5nKCkgOiBcIk5vXCI7XG4gICAgICAgIGNvbnN0IGxvZ2luU2hlZXREYXRlID0gbG9naW5fc2hlZXQuc2hlZXRfZGF0ZS50b0RhdGVTdHJpbmcoKTtcblxuICAgICAgICBsZXQgc3RhdHVzU3RyaW5nID0gYFN0YXR1cyBmb3IgJHtcbiAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyIS5uYW1lXG4gICAgICAgIH0gb24gZGF0ZSAke2xvZ2luU2hlZXREYXRlfTogJHtzdGF0dXN9LlxcbiR7Y29tcGxldGVkUGF0cm9sRGF5c1N0cmluZ30gY29tcGxldGVkIHBhdHJvbCBkYXlzIHByaW9yIHRvIHRvZGF5LmA7XG4gICAgICAgIGNvbnN0IHVzZWRUb2RheUNvbXBQYXNzZXMgPSAoYXdhaXQgY29tcF9wYXNzX3Byb21pc2UpPy51c2VkX3RvZGF5IHx8IDA7XG4gICAgICAgIGNvbnN0IHVzZWRUb2RheU1hbmFnZXJQYXNzZXMgPVxuICAgICAgICAgICAgKGF3YWl0IG1hbmFnZXJfcGFzc19wcm9taXNlKT8udXNlZF90b2RheSB8fCAwO1xuICAgICAgICBjb25zdCB1c2VkU2Vhc29uQ29tcFBhc3NlcyA9XG4gICAgICAgICAgICAoYXdhaXQgY29tcF9wYXNzX3Byb21pc2UpPy51c2VkX3NlYXNvbiB8fCAwO1xuICAgICAgICBjb25zdCB1c2VkU2Vhc29uTWFuYWdlclBhc3NlcyA9XG4gICAgICAgICAgICAoYXdhaXQgbWFuYWdlcl9wYXNzX3Byb21pc2UpPy51c2VkX3NlYXNvbiB8fCAwO1xuICAgICAgICBjb25zdCBhdmFpbGFibGVDb21wUGFzc2VzID0gKGF3YWl0IGNvbXBfcGFzc19wcm9taXNlKT8uYXZhaWxhYmxlIHx8IDA7XG4gICAgICAgIGNvbnN0IGF2YWlsYWJsZU1hbmFnZXJQYXNzZXMgPVxuICAgICAgICAgICAgKGF3YWl0IG1hbmFnZXJfcGFzc19wcm9taXNlKT8uYXZhaWxhYmxlIHx8IDA7XG5cbiAgICAgICAgc3RhdHVzU3RyaW5nICs9XG4gICAgICAgICAgICBcIiBcIiArXG4gICAgICAgICAgICBidWlsZF9wYXNzZXNfc3RyaW5nKFxuICAgICAgICAgICAgICAgIHVzZWRTZWFzb25Db21wUGFzc2VzLFxuICAgICAgICAgICAgICAgIHVzZWRTZWFzb25Db21wUGFzc2VzICsgYXZhaWxhYmxlQ29tcFBhc3NlcyxcbiAgICAgICAgICAgICAgICB1c2VkVG9kYXlDb21wUGFzc2VzLFxuICAgICAgICAgICAgICAgIFwiY29tcCBwYXNzZXNcIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgaWYgKHVzZWRTZWFzb25NYW5hZ2VyUGFzc2VzICsgYXZhaWxhYmxlTWFuYWdlclBhc3NlcyA+IDApIHtcbiAgICAgICAgICAgIHN0YXR1c1N0cmluZyArPVxuICAgICAgICAgICAgICAgIFwiIFwiICtcbiAgICAgICAgICAgICAgICBidWlsZF9wYXNzZXNfc3RyaW5nKFxuICAgICAgICAgICAgICAgICAgICB1c2VkU2Vhc29uTWFuYWdlclBhc3NlcyxcbiAgICAgICAgICAgICAgICAgICAgdXNlZFNlYXNvbk1hbmFnZXJQYXNzZXMgKyBhdmFpbGFibGVNYW5hZ2VyUGFzc2VzLFxuICAgICAgICAgICAgICAgICAgICB1c2VkVG9kYXlNYW5hZ2VyUGFzc2VzLFxuICAgICAgICAgICAgICAgICAgICBcIm1hbmFnZXIgcGFzc2VzXCJcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdGF0dXNTdHJpbmc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgdGhlIGNoZWNrLWluIHByb2Nlc3MgZm9yIHRoZSBwYXRyb2xsZXIgb25jZSB0aGUgY2hlY2staW4gbW9kZSBpcyBzZXQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBjaGVjay1pbiByZXNwb25zZS5cbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gVGhyb3dzIGFuIGVycm9yIGlmIHRoZSBjaGVjay1pbiBtb2RlIGlzIGltcHJvcGVybHkgc2V0LlxuICAgICAqL1xuICAgIGFzeW5jIGNoZWNraW4oKTogUHJvbWlzZTxCVk5TUENoZWNraW5SZXNwb25zZT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgIGBQZXJmb3JtaW5nIHJlZ3VsYXIgY2hlY2tpbiBmb3IgJHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICAgICAgfSB3aXRoIG1vZGU6ICR7dGhpcy5jaGVja2luX21vZGV9YFxuICAgICAgICApO1xuICAgICAgICBpZiAoYXdhaXQgdGhpcy5zaGVldF9uZWVkc19yZXNldCgpKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOlxuICAgICAgICAgICAgICAgICAgICBgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyIS5uYW1lXG4gICAgICAgICAgICAgICAgICAgIH0sIHlvdSBhcmUgdGhlIGZpcnN0IHBlcnNvbiB0byBjaGVjayBpbiB0b2RheS4gYCArXG4gICAgICAgICAgICAgICAgICAgIGBJIG5lZWQgdG8gYXJjaGl2ZSBhbmQgcmVzZXQgdGhlIHNoZWV0IGJlZm9yZSBjb250aW51aW5nLiBgICtcbiAgICAgICAgICAgICAgICAgICAgYFdvdWxkIHlvdSBsaWtlIG1lIHRvIGRvIHRoYXQ/IChZZXMvTm8pYCxcbiAgICAgICAgICAgICAgICBuZXh0X3N0ZXA6IGAke05FWFRfU1RFUFMuQ09ORklSTV9SRVNFVH0tJHt0aGlzLmNoZWNraW5fbW9kZX1gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY2hlY2tpbl9tb2RlO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICAhdGhpcy5jaGVja2luX21vZGUgfHxcbiAgICAgICAgICAgIChjaGVja2luX21vZGUgPSB0aGlzLmNoZWNraW5fdmFsdWVzLmJ5X2tleVt0aGlzLmNoZWNraW5fbW9kZV0pID09PVxuICAgICAgICAgICAgICAgIHVuZGVmaW5lZFxuICAgICAgICApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNoZWNraW4gbW9kZSBpbXByb3Blcmx5IHNldFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKTtcbiAgICAgICAgY29uc3QgbmV3X2NoZWNraW5fdmFsdWUgPSBjaGVja2luX21vZGUuc2hlZXRzX3ZhbHVlO1xuICAgICAgICBhd2FpdCBsb2dpbl9zaGVldC5jaGVja2luKHRoaXMucGF0cm9sbGVyISwgbmV3X2NoZWNraW5fdmFsdWUpO1xuICAgICAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oYHVwZGF0ZS1zdGF0dXMoJHtuZXdfY2hlY2tpbl92YWx1ZX0pYCk7XG4gICAgICAgIGF3YWl0IHRoaXMubG9naW5fc2hlZXQ/LnJlZnJlc2goKTtcbiAgICAgICAgYXdhaXQgdGhpcy5nZXRfbWFwcGVkX3BhdHJvbGxlcih0cnVlKTtcblxuICAgICAgICBsZXQgcmVzcG9uc2UgPSBgVXBkYXRpbmcgJHtcbiAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyIS5uYW1lXG4gICAgICAgIH0gd2l0aCBzdGF0dXM6ICR7bmV3X2NoZWNraW5fdmFsdWV9LmA7XG4gICAgICAgIGlmICghdGhpcy5mYXN0X2NoZWNraW4pIHtcbiAgICAgICAgICAgIHJlc3BvbnNlICs9IGAgWW91IGNhbiBzZW5kICcke2NoZWNraW5fbW9kZS5mYXN0X2NoZWNraW5zWzBdfScgYXMgeW91ciBmaXJzdCBtZXNzYWdlIGZvciBhIGZhc3QgJHtjaGVja2luX21vZGUuc2hlZXRzX3ZhbHVlfSBjaGVja2luIG5leHQgdGltZS5gO1xuICAgICAgICB9XG4gICAgICAgIHJlc3BvbnNlICs9IFwiXFxuXFxuXCIgKyAoYXdhaXQgdGhpcy5nZXRfc3RhdHVzX3N0cmluZygpKTtcbiAgICAgICAgcmV0dXJuIHsgcmVzcG9uc2U6IHJlc3BvbnNlIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHRoZSBHb29nbGUgU2hlZXRzIG5lZWRzIHRvIGJlIHJlc2V0LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0cnVlIGlmIHRoZSBzaGVldCBuZWVkcyB0byBiZSByZXNldCwgb3RoZXJ3aXNlIGZhbHNlLlxuICAgICAqL1xuICAgIGFzeW5jIHNoZWV0X25lZWRzX3Jlc2V0KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG5cbiAgICAgICAgY29uc3Qgc2hlZXRfZGF0ZSA9IGxvZ2luX3NoZWV0LnNoZWV0X2RhdGU7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfZGF0ZSA9IGxvZ2luX3NoZWV0LmN1cnJlbnRfZGF0ZTtcbiAgICAgICAgY29uc29sZS5sb2coYHNoZWV0X2RhdGU6ICR7c2hlZXRfZGF0ZX1gKTtcbiAgICAgICAgY29uc29sZS5sb2coYGN1cnJlbnRfZGF0ZTogJHtjdXJyZW50X2RhdGV9YCk7XG5cbiAgICAgICAgY29uc29sZS5sb2coYGRhdGVfaXNfY3VycmVudDogJHtsb2dpbl9zaGVldC5pc19jdXJyZW50fWApO1xuXG4gICAgICAgIHJldHVybiAhbG9naW5fc2hlZXQuaXNfY3VycmVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXNldHMgdGhlIEdvb2dsZSBTaGVldHMgZmxvdywgaW5jbHVkaW5nIGFyY2hpdmluZyBhbmQgcmVzZXR0aW5nIHRoZSBzaGVldCBpZiBuZWNlc3NhcnkuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2UgfCB2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgY2hlY2staW4gcmVzcG9uc2Ugb3Igdm9pZC5cbiAgICAgKi9cbiAgICBhc3luYyByZXNldF9zaGVldF9mbG93KCk6IFByb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2UgfCB2b2lkPiB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5jaGVja191c2VyX2NyZWRzKFxuICAgICAgICAgICAgYCR7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXIhLm5hbWVcbiAgICAgICAgICAgIH0sIGluIG9yZGVyIHRvIHJlc2V0L2FyY2hpdmUsIEkgbmVlZCB5b3UgdG8gYXV0aG9yaXplIHRoZSBhcHAuYFxuICAgICAgICApO1xuICAgICAgICBpZiAocmVzcG9uc2UpXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiByZXNwb25zZS5yZXNwb25zZSxcbiAgICAgICAgICAgICAgICBuZXh0X3N0ZXA6IGAke05FWFRfU1RFUFMuQVVUSF9SRVNFVH0tJHt0aGlzLmNoZWNraW5fbW9kZX1gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucmVzZXRfc2hlZXQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXNldHMgdGhlIEdvb2dsZSBTaGVldHMsIGluY2x1ZGluZyBhcmNoaXZpbmcgYW5kIHJlc2V0dGluZyB0aGUgc2hlZXQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHNoZWV0IGlzIHJlc2V0LlxuICAgICAqL1xuICAgIGFzeW5jIHJlc2V0X3NoZWV0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCBzY3JpcHRfc2VydmljZSA9IGF3YWl0IHRoaXMuZ2V0X3VzZXJfc2NyaXB0c19zZXJ2aWNlKCk7XG4gICAgICAgIGNvbnN0IHNob3VsZF9wZXJmb3JtX2FyY2hpdmUgPSAhKGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCkpLmFyY2hpdmVkO1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gc2hvdWxkX3BlcmZvcm1fYXJjaGl2ZVxuICAgICAgICAgICAgPyBcIk9rYXkuIEFyY2hpdmluZyBhbmQgcmVzZXRpbmcgdGhlIGNoZWNrIGluIHNoZWV0LiBUaGlzIHRha2VzIGFib3V0IDEwIHNlY29uZHMuLi5cIlxuICAgICAgICAgICAgOiBcIk9rYXkuIFNoZWV0IGhhcyBhbHJlYWR5IGJlZW4gYXJjaGl2ZWQuIFBlcmZvcm1pbmcgcmVzZXQuIFRoaXMgdGFrZXMgYWJvdXQgNSBzZWNvbmRzLi4uXCI7XG4gICAgICAgIGF3YWl0IHRoaXMuc2VuZF9tZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICBpZiAoc2hvdWxkX3BlcmZvcm1fYXJjaGl2ZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJBcmNoaXZpbmcuLi5cIik7XG5cbiAgICAgICAgICAgIGF3YWl0IHNjcmlwdF9zZXJ2aWNlLnNjcmlwdHMucnVuKHtcbiAgICAgICAgICAgICAgICBzY3JpcHRJZDogdGhpcy5yZXNldF9zY3JpcHRfaWQsXG4gICAgICAgICAgICAgICAgcmVxdWVzdEJvZHk6IHsgZnVuY3Rpb246IHRoaXMuY29uZmlnLkFSQ0hJVkVfRlVOQ1RJT05fTkFNRSB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmRlbGF5KDUpO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKFwiYXJjaGl2ZVwiKTtcbiAgICAgICAgICAgIHRoaXMubG9naW5fc2hlZXQgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJSZXNldHRpbmcuLi5cIik7XG4gICAgICAgIGF3YWl0IHNjcmlwdF9zZXJ2aWNlLnNjcmlwdHMucnVuKHtcbiAgICAgICAgICAgIHNjcmlwdElkOiB0aGlzLnJlc2V0X3NjcmlwdF9pZCxcbiAgICAgICAgICAgIHJlcXVlc3RCb2R5OiB7IGZ1bmN0aW9uOiB0aGlzLmNvbmZpZy5SRVNFVF9GVU5DVElPTl9OQU1FIH0sXG4gICAgICAgIH0pO1xuICAgICAgICBhd2FpdCB0aGlzLmRlbGF5KDUpO1xuICAgICAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oXCJyZXNldFwiKTtcbiAgICAgICAgYXdhaXQgdGhpcy5zZW5kX21lc3NhZ2UoXCJEb25lLlwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBHb29nbGUgQXBwcyBTY3JpcHQgc2VydmljZS5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzY3JpcHRfdjEuU2NyaXB0Pn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgR29vZ2xlIEFwcHMgU2NyaXB0IHNlcnZpY2UuXG4gICAgICovXG4gICAgYXN5bmMgY2hlY2tfdXNlcl9jcmVkcyhcbiAgICAgICAgcHJvbXB0X21lc3NhZ2U6IHN0cmluZyA9IFwiSGksIGJlZm9yZSB5b3UgY2FuIHVzZSBCVk5TUCBib3QsIHlvdSBtdXN0IGxvZ2luLlwiXG4gICAgKTogUHJvbWlzZTxCVk5TUENoZWNraW5SZXNwb25zZSB8IHVuZGVmaW5lZD4ge1xuICAgICAgICBjb25zdCB1c2VyX2NyZWRzID0gdGhpcy5nZXRfdXNlcl9jcmVkcygpO1xuICAgICAgICBpZiAoIShhd2FpdCB1c2VyX2NyZWRzLmxvYWRUb2tlbigpKSkge1xuICAgICAgICAgICAgY29uc3QgYXV0aFVybCA9IGF3YWl0IHVzZXJfY3JlZHMuZ2V0QXV0aFVybCgpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYCR7cHJvbXB0X21lc3NhZ2V9IFBsZWFzZSBmb2xsb3cgdGhpcyBsaW5rOlxuJHthdXRoVXJsfVxuXG5NZXNzYWdlIG1lIGFnYWluIHdoZW4gZG9uZS5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIEdvb2dsZSBBcHBzIFNjcmlwdCBzZXJ2aWNlLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHNjcmlwdF92MS5TY3JpcHQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBHb29nbGUgQXBwcyBTY3JpcHQgc2VydmljZS5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfb25fZHV0eSgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zdCBjaGVja2VkX291dF9zZWN0aW9uID0gXCJDaGVja2VkIE91dFwiO1xuICAgICAgICBjb25zdCBsYXN0X3NlY3Rpb25zID0gW2NoZWNrZWRfb3V0X3NlY3Rpb25dO1xuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG5cbiAgICAgICAgY29uc3Qgb25fZHV0eV9wYXRyb2xsZXJzID0gbG9naW5fc2hlZXQuZ2V0X29uX2R1dHlfcGF0cm9sbGVycygpO1xuICAgICAgICBjb25zdCBieV9zZWN0aW9uID0gb25fZHV0eV9wYXRyb2xsZXJzXG4gICAgICAgICAgICAuZmlsdGVyKCh4KSA9PiB4LmNoZWNraW4pXG4gICAgICAgICAgICAucmVkdWNlKChwcmV2OiB7IFtrZXk6IHN0cmluZ106IFBhdHJvbGxlclJvd1tdIH0sIGN1cikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNob3J0X2NvZGUgPVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNraW5fdmFsdWVzLmJ5X3NoZWV0X3N0cmluZ1tjdXIuY2hlY2tpbl0ua2V5O1xuICAgICAgICAgICAgICAgIGxldCBzZWN0aW9uID0gY3VyLnNlY3Rpb247XG4gICAgICAgICAgICAgICAgaWYgKHNob3J0X2NvZGUgPT0gXCJvdXRcIikge1xuICAgICAgICAgICAgICAgICAgICBzZWN0aW9uID0gY2hlY2tlZF9vdXRfc2VjdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCEoc2VjdGlvbiBpbiBwcmV2KSkge1xuICAgICAgICAgICAgICAgICAgICBwcmV2W3NlY3Rpb25dID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHByZXZbc2VjdGlvbl0ucHVzaChjdXIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgICAgICAgfSwge30pO1xuICAgICAgICBsZXQgcmVzdWx0czogc3RyaW5nW11bXSA9IFtdO1xuICAgICAgICBsZXQgYWxsX2tleXMgPSBPYmplY3Qua2V5cyhieV9zZWN0aW9uKTtcbiAgICAgICAgY29uc3Qgb3JkZXJlZF9wcmltYXJ5X3NlY3Rpb25zID0gT2JqZWN0LmtleXMoYnlfc2VjdGlvbilcbiAgICAgICAgICAgIC5maWx0ZXIoKHgpID0+ICFsYXN0X3NlY3Rpb25zLmluY2x1ZGVzKHgpKVxuICAgICAgICAgICAgLnNvcnQoKTtcbiAgICAgICAgY29uc3QgZmlsdGVyZWRfbGFzdF9zZWN0aW9ucyA9IGxhc3Rfc2VjdGlvbnMuZmlsdGVyKCh4KSA9PlxuICAgICAgICAgICAgYWxsX2tleXMuaW5jbHVkZXMoeClcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3Qgb3JkZXJlZF9zZWN0aW9ucyA9IG9yZGVyZWRfcHJpbWFyeV9zZWN0aW9ucy5jb25jYXQoXG4gICAgICAgICAgICBmaWx0ZXJlZF9sYXN0X3NlY3Rpb25zXG4gICAgICAgICk7XG5cbiAgICAgICAgZm9yIChjb25zdCBzZWN0aW9uIG9mIG9yZGVyZWRfc2VjdGlvbnMpIHtcbiAgICAgICAgICAgIGxldCByZXN1bHQ6IHN0cmluZ1tdID0gW107XG4gICAgICAgICAgICBjb25zdCBwYXRyb2xsZXJzID0gYnlfc2VjdGlvbltzZWN0aW9uXS5zb3J0KCh4LCB5KSA9PlxuICAgICAgICAgICAgICAgIHgubmFtZS5sb2NhbGVDb21wYXJlKHkubmFtZSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoc2VjdGlvbi5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChcIlNlY3Rpb24gXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0LnB1c2goYCR7c2VjdGlvbn06IGApO1xuICAgICAgICAgICAgZnVuY3Rpb24gcGF0cm9sbGVyX3N0cmluZyhuYW1lOiBzdHJpbmcsIHNob3J0X2NvZGU6IHN0cmluZykge1xuICAgICAgICAgICAgICAgIGxldCBkZXRhaWxzID0gXCJcIjtcbiAgICAgICAgICAgICAgICBpZiAoc2hvcnRfY29kZSAhPT0gXCJkYXlcIiAmJiBzaG9ydF9jb2RlICE9PSBcIm91dFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGRldGFpbHMgPSBgICgke3Nob3J0X2NvZGUudG9VcHBlckNhc2UoKX0pYDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke25hbWV9JHtkZXRhaWxzfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQucHVzaChcbiAgICAgICAgICAgICAgICBwYXRyb2xsZXJzXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKHgpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRyb2xsZXJfc3RyaW5nKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHgubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNraW5fdmFsdWVzLmJ5X3NoZWV0X3N0cmluZ1t4LmNoZWNraW5dLmtleVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5qb2luKFwiLCBcIilcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oXCJvbi1kdXR5XCIpO1xuICAgICAgICByZXR1cm4gYFBhdHJvbGxlcnMgZm9yICR7bG9naW5fc2hlZXQuc2hlZXRfZGF0ZS50b0RhdGVTdHJpbmcoKX0gKFRvdGFsOiAke1xuICAgICAgICAgICAgb25fZHV0eV9wYXRyb2xsZXJzLmxlbmd0aFxuICAgICAgICB9KTpcXG4ke3Jlc3VsdHMubWFwKChyKSA9PiByLmpvaW4oXCJcIikpLmpvaW4oXCJcXG5cIil9YDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2dzIGFuIGFjdGlvbiB0byB0aGUgR29vZ2xlIFNoZWV0cy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYWN0aW9uX25hbWUgLSBUaGUgbmFtZSBvZiB0aGUgYWN0aW9uIHRvIGxvZy5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgYWN0aW9uIGlzIGxvZ2dlZC5cbiAgICAgKi9cbiAgICBhc3luYyBsb2dfYWN0aW9uKGFjdGlvbl9uYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3Qgc2hlZXRzX3NlcnZpY2UgPSBhd2FpdCB0aGlzLmdldF9zaGVldHNfc2VydmljZSgpO1xuICAgICAgICBhd2FpdCBzaGVldHNfc2VydmljZS5zcHJlYWRzaGVldHMudmFsdWVzLmFwcGVuZCh7XG4gICAgICAgICAgICBzcHJlYWRzaGVldElkOiB0aGlzLmNvbWJpbmVkX2NvbmZpZy5TSEVFVF9JRCxcbiAgICAgICAgICAgIHJhbmdlOiB0aGlzLmNvbmZpZy5BQ1RJT05fTE9HX1NIRUVULFxuICAgICAgICAgICAgdmFsdWVJbnB1dE9wdGlvbjogXCJVU0VSX0VOVEVSRURcIixcbiAgICAgICAgICAgIHJlcXVlc3RCb2R5OiB7XG4gICAgICAgICAgICAgICAgdmFsdWVzOiBbW3RoaXMucGF0cm9sbGVyIS5uYW1lLCBuZXcgRGF0ZSgpLCBhY3Rpb25fbmFtZV1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9ncyBvdXQgdGhlIHVzZXIuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBsb2dvdXQgcmVzcG9uc2UuXG4gICAgICovXG4gICAgYXN5bmMgbG9nb3V0KCk6IFByb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgdXNlcl9jcmVkcyA9IHRoaXMuZ2V0X3VzZXJfY3JlZHMoKTtcbiAgICAgICAgYXdhaXQgdXNlcl9jcmVkcy5kZWxldGVUb2tlbigpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IFwiT2theSwgSSBoYXZlIHJlbW92ZWQgYWxsIGxvZ2luIHNlc3Npb24gaW5mb3JtYXRpb24uXCIsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgVHdpbGlvIGNsaWVudC5cbiAgICAgKiBAcmV0dXJucyB7VHdpbGlvQ2xpZW50fSBUaGUgVHdpbGlvIGNsaWVudC5cbiAgICAgKi9cbiAgICBnZXRfdHdpbGlvX2NsaWVudCgpIHtcbiAgICAgICAgaWYgKHRoaXMudHdpbGlvX2NsaWVudCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0d2lsaW9fY2xpZW50IHdhcyBuZXZlciBpbml0aWFsaXplZCFcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudHdpbGlvX2NsaWVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBUd2lsaW8gU3luYyBjbGllbnQuXG4gICAgICogQHJldHVybnMge1NlcnZpY2VDb250ZXh0fSBUaGUgVHdpbGlvIFN5bmMgY2xpZW50LlxuICAgICAqL1xuICAgIGdldF9zeW5jX2NsaWVudCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN5bmNfY2xpZW50KSB7XG4gICAgICAgICAgICB0aGlzLnN5bmNfY2xpZW50ID0gdGhpcy5nZXRfdHdpbGlvX2NsaWVudCgpLnN5bmMuc2VydmljZXMoXG4gICAgICAgICAgICAgICAgdGhpcy5zeW5jX3NpZFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zeW5jX2NsaWVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB1c2VyIGNyZWRlbnRpYWxzLlxuICAgICAqIEByZXR1cm5zIHtVc2VyQ3JlZHN9IFRoZSB1c2VyIGNyZWRlbnRpYWxzLlxuICAgICAqL1xuICAgIGdldF91c2VyX2NyZWRzKCkge1xuICAgICAgICBpZiAoIXRoaXMudXNlcl9jcmVkcykge1xuICAgICAgICAgICAgdGhpcy51c2VyX2NyZWRzID0gbmV3IFVzZXJDcmVkcyhcbiAgICAgICAgICAgICAgICB0aGlzLmdldF9zeW5jX2NsaWVudCgpLFxuICAgICAgICAgICAgICAgIHRoaXMuZnJvbSxcbiAgICAgICAgICAgICAgICB0aGlzLmNvbWJpbmVkX2NvbmZpZ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy51c2VyX2NyZWRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHNlcnZpY2UgY3JlZGVudGlhbHMuXG4gICAgICogQHJldHVybnMge0dvb2dsZUF1dGh9IFRoZSBzZXJ2aWNlIGNyZWRlbnRpYWxzLlxuICAgICAqL1xuICAgIGdldF9zZXJ2aWNlX2NyZWRzKCkge1xuICAgICAgICBpZiAoIXRoaXMuc2VydmljZV9jcmVkcykge1xuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlX2NyZWRzID0gbmV3IGdvb2dsZS5hdXRoLkdvb2dsZUF1dGgoe1xuICAgICAgICAgICAgICAgIGtleUZpbGU6IGdldF9zZXJ2aWNlX2NyZWRlbnRpYWxzX3BhdGgoKSxcbiAgICAgICAgICAgICAgICBzY29wZXM6IHRoaXMuU0NPUEVTLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZV9jcmVkcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB2YWxpZCBjcmVkZW50aWFscy5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtyZXF1aXJlX3VzZXJfY3JlZHM9ZmFsc2VdIC0gV2hldGhlciB1c2VyIGNyZWRlbnRpYWxzIGFyZSByZXF1aXJlZC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxHb29nbGVBdXRoPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgdmFsaWQgY3JlZGVudGlhbHMuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3ZhbGlkX2NyZWRzKHJlcXVpcmVfdXNlcl9jcmVkczogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5VU0VfU0VSVklDRV9BQ0NPVU5UICYmICFyZXF1aXJlX3VzZXJfY3JlZHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldF9zZXJ2aWNlX2NyZWRzKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXNlcl9jcmVkcyA9IHRoaXMuZ2V0X3VzZXJfY3JlZHMoKTtcbiAgICAgICAgaWYgKCEoYXdhaXQgdXNlcl9jcmVkcy5sb2FkVG9rZW4oKSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVzZXIgaXMgbm90IGF1dGhlZC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJVc2luZyB1c2VyIGFjY291bnQgZm9yIHNlcnZpY2UgYXV0aC4uLlwiKTtcbiAgICAgICAgcmV0dXJuIHVzZXJfY3JlZHMub2F1dGgyX2NsaWVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBHb29nbGUgU2hlZXRzIHNlcnZpY2UuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c2hlZXRzX3Y0LlNoZWV0cz59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIEdvb2dsZSBTaGVldHMgc2VydmljZS5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfc2hlZXRzX3NlcnZpY2UoKSB7XG4gICAgICAgIGlmICghdGhpcy5zaGVldHNfc2VydmljZSkge1xuICAgICAgICAgICAgdGhpcy5zaGVldHNfc2VydmljZSA9IGdvb2dsZS5zaGVldHMoe1xuICAgICAgICAgICAgICAgIHZlcnNpb246IFwidjRcIixcbiAgICAgICAgICAgICAgICBhdXRoOiBhd2FpdCB0aGlzLmdldF92YWxpZF9jcmVkcygpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2hlZXRzX3NlcnZpY2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbG9naW4gc2hlZXQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8TG9naW5TaGVldD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGxvZ2luIHNoZWV0XG4gICAgICovXG4gICAgYXN5bmMgZ2V0X2xvZ2luX3NoZWV0KCkge1xuICAgICAgICBpZiAoIXRoaXMubG9naW5fc2hlZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0X2NvbmZpZzogTG9naW5TaGVldENvbmZpZyA9IHRoaXMuY29tYmluZWRfY29uZmlnO1xuICAgICAgICAgICAgY29uc3Qgc2hlZXRzX3NlcnZpY2UgPSBhd2FpdCB0aGlzLmdldF9zaGVldHNfc2VydmljZSgpO1xuICAgICAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBuZXcgTG9naW5TaGVldChcbiAgICAgICAgICAgICAgICBzaGVldHNfc2VydmljZSxcbiAgICAgICAgICAgICAgICBsb2dpbl9zaGVldF9jb25maWdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBhd2FpdCBsb2dpbl9zaGVldC5yZWZyZXNoKCk7XG4gICAgICAgICAgICB0aGlzLmxvZ2luX3NoZWV0ID0gbG9naW5fc2hlZXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubG9naW5fc2hlZXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgc2Vhc29uIHNoZWV0LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFNlYXNvblNoZWV0Pn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgc2Vhc29uIHNoZWV0XG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3NlYXNvbl9zaGVldCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNlYXNvbl9zaGVldCkge1xuICAgICAgICAgICAgY29uc3Qgc2Vhc29uX3NoZWV0X2NvbmZpZzogU2Vhc29uU2hlZXRDb25maWcgPSB0aGlzLmNvbWJpbmVkX2NvbmZpZztcbiAgICAgICAgICAgIGNvbnN0IHNoZWV0c19zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfc2hlZXRzX3NlcnZpY2UoKTtcbiAgICAgICAgICAgIGNvbnN0IHNlYXNvbl9zaGVldCA9IG5ldyBTZWFzb25TaGVldChcbiAgICAgICAgICAgICAgICBzaGVldHNfc2VydmljZSxcbiAgICAgICAgICAgICAgICBzZWFzb25fc2hlZXRfY29uZmlnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5zZWFzb25fc2hlZXQgPSBzZWFzb25fc2hlZXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2Vhc29uX3NoZWV0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGNvbXAgcGFzcyBzaGVldC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxDb21wUGFzc1NoZWV0Pn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgY29tcCBwYXNzIHNoZWV0XG4gICAgICovXG4gICAgYXN5bmMgZ2V0X2NvbXBfcGFzc19zaGVldCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbXBfcGFzc19zaGVldCkge1xuICAgICAgICAgICAgY29uc3QgY29uZmlnOiBDb21wUGFzc2VzQ29uZmlnID0gdGhpcy5jb21iaW5lZF9jb25maWc7XG4gICAgICAgICAgICBjb25zdCBzaGVldHNfc2VydmljZSA9IGF3YWl0IHRoaXMuZ2V0X3NoZWV0c19zZXJ2aWNlKCk7XG4gICAgICAgICAgICBjb25zdCBzZWFzb25fc2hlZXQgPSBuZXcgQ29tcFBhc3NTaGVldChzaGVldHNfc2VydmljZSwgY29uZmlnKTtcbiAgICAgICAgICAgIHRoaXMuY29tcF9wYXNzX3NoZWV0ID0gc2Vhc29uX3NoZWV0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBfcGFzc19zaGVldDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBtYW5hZ2VyIHBhc3Mgc2hlZXQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8TWFuYWdlclBhc3NTaGVldD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIG1hbmFnZXIgcGFzcyBzaGVldFxuICAgICAqL1xuICAgIGFzeW5jIGdldF9tYW5hZ2VyX3Bhc3Nfc2hlZXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5tYW5hZ2VyX3Bhc3Nfc2hlZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpZzogTWFuYWdlclBhc3Nlc0NvbmZpZyA9IHRoaXMuY29tYmluZWRfY29uZmlnO1xuICAgICAgICAgICAgY29uc3Qgc2hlZXRzX3NlcnZpY2UgPSBhd2FpdCB0aGlzLmdldF9zaGVldHNfc2VydmljZSgpO1xuICAgICAgICAgICAgY29uc3Qgc2Vhc29uX3NoZWV0ID0gbmV3IE1hbmFnZXJQYXNzU2hlZXQoc2hlZXRzX3NlcnZpY2UsIGNvbmZpZyk7XG4gICAgICAgICAgICB0aGlzLm1hbmFnZXJfcGFzc19zaGVldCA9IHNlYXNvbl9zaGVldDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5tYW5hZ2VyX3Bhc3Nfc2hlZXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgR29vZ2xlIEFwcHMgU2NyaXB0IHNlcnZpY2UuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c2NyaXB0X3YxLlNjcmlwdD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIEdvb2dsZSBBcHBzIFNjcmlwdCBzZXJ2aWNlLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF91c2VyX3NjcmlwdHNfc2VydmljZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnVzZXJfc2NyaXB0c19zZXJ2aWNlKSB7XG4gICAgICAgICAgICB0aGlzLnVzZXJfc2NyaXB0c19zZXJ2aWNlID0gZ29vZ2xlLnNjcmlwdCh7XG4gICAgICAgICAgICAgICAgdmVyc2lvbjogXCJ2MVwiLFxuICAgICAgICAgICAgICAgIGF1dGg6IGF3YWl0IHRoaXMuZ2V0X3ZhbGlkX2NyZWRzKHRydWUpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudXNlcl9zY3JpcHRzX3NlcnZpY2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbWFwcGVkIHBhdHJvbGxlci5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtmb3JjZT1mYWxzZV0gLSBXaGV0aGVyIHRvIGZvcmNlIHRoZSBwYXRyb2xsZXIgdG8gYmUgZm91bmQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BDaGVja2luUmVzcG9uc2UgfCB2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcmVzcG9uc2Ugb3Igdm9pZC5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfbWFwcGVkX3BhdHJvbGxlcihmb3JjZTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IHBob25lX2xvb2t1cCA9IGF3YWl0IHRoaXMuZmluZF9wYXRyb2xsZXJfZnJvbV9udW1iZXIoKTtcbiAgICAgICAgaWYgKHBob25lX2xvb2t1cCA9PT0gdW5kZWZpbmVkIHx8IHBob25lX2xvb2t1cCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGZvcmNlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGZpbmQgYXNzb2NpYXRlZCB1c2VyXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYFNvcnJ5LCBJIGNvdWxkbid0IGZpbmQgYW4gYXNzb2NpYXRlZCBCVk5TUCBtZW1iZXIgd2l0aCB5b3VyIHBob25lIG51bWJlciAoJHt0aGlzLmZyb219KWAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuICAgICAgICBjb25zdCBtYXBwZWRQYXRyb2xsZXIgPSBsb2dpbl9zaGVldC50cnlfZmluZF9wYXRyb2xsZXIoXG4gICAgICAgICAgICBwaG9uZV9sb29rdXAubmFtZVxuICAgICAgICApO1xuICAgICAgICBpZiAobWFwcGVkUGF0cm9sbGVyID09PSBcIm5vdF9mb3VuZFwiKSB7XG4gICAgICAgICAgICBpZiAoZm9yY2UpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgcGF0cm9sbGVyIGluIGxvZ2luIHNoZWV0XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYENvdWxkIG5vdCBmaW5kIHBhdHJvbGxlciAnJHtwaG9uZV9sb29rdXAubmFtZX0nIGluIGxvZ2luIHNoZWV0LiBQbGVhc2UgbG9vayBhdCB0aGUgbG9naW4gc2hlZXQgbmFtZSwgYW5kIGNvcHkgaXQgdG8gdGhlIFBob25lIE51bWJlcnMgdGFiLmAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3VycmVudF9zaGVldF9kYXRlID0gbG9naW5fc2hlZXQuY3VycmVudF9kYXRlO1xuICAgICAgICB0aGlzLnBhdHJvbGxlciA9IG1hcHBlZFBhdHJvbGxlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaW5kcyB0aGUgcGF0cm9sbGVyIGZyb20gdGhlIHBob25lIG51bWJlci5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxQYXRyb2xsZXJSb3c+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBwYXRyb2xsZXIuXG4gICAgICovXG4gICAgYXN5bmMgZmluZF9wYXRyb2xsZXJfZnJvbV9udW1iZXIoKSB7XG4gICAgICAgIGNvbnN0IHJhd19udW1iZXIgPSB0aGlzLmZyb207XG4gICAgICAgIGNvbnN0IHNoZWV0c19zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfc2hlZXRzX3NlcnZpY2UoKTtcbiAgICAgICAgY29uc3Qgb3B0czogRmluZFBhdHJvbGxlckNvbmZpZyA9IHRoaXMuY29tYmluZWRfY29uZmlnO1xuICAgICAgICBjb25zdCBudW1iZXIgPSBzYW5pdGl6ZV9waG9uZV9udW1iZXIocmF3X251bWJlcik7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgc2hlZXRzX3NlcnZpY2Uuc3ByZWFkc2hlZXRzLnZhbHVlcy5nZXQoe1xuICAgICAgICAgICAgc3ByZWFkc2hlZXRJZDogb3B0cy5TSEVFVF9JRCxcbiAgICAgICAgICAgIHJhbmdlOiBvcHRzLlBIT05FX05VTUJFUl9MT09LVVBfU0hFRVQsXG4gICAgICAgICAgICB2YWx1ZVJlbmRlck9wdGlvbjogXCJVTkZPUk1BVFRFRF9WQUxVRVwiLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhLnZhbHVlcykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGZpbmQgcGF0cm9sbGVyLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwYXRyb2xsZXIgPSByZXNwb25zZS5kYXRhLnZhbHVlc1xuICAgICAgICAgICAgLm1hcCgocm93KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmF3TnVtYmVyID1cbiAgICAgICAgICAgICAgICAgICAgcm93W2V4Y2VsX3Jvd190b19pbmRleChvcHRzLlBIT05FX05VTUJFUl9OVU1CRVJfQ09MVU1OKV07XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudE51bWJlciA9XG4gICAgICAgICAgICAgICAgICAgIHJhd051bWJlciAhPSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgICAgID8gc2FuaXRpemVfcGhvbmVfbnVtYmVyKHJhd051bWJlcilcbiAgICAgICAgICAgICAgICAgICAgICAgIDogcmF3TnVtYmVyO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnROYW1lID1cbiAgICAgICAgICAgICAgICAgICAgcm93W2V4Y2VsX3Jvd190b19pbmRleChvcHRzLlBIT05FX05VTUJFUl9OQU1FX0NPTFVNTildO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IG5hbWU6IGN1cnJlbnROYW1lLCBudW1iZXI6IGN1cnJlbnROdW1iZXIgfTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZmlsdGVyKChwYXRyb2xsZXIpID0+IHBhdHJvbGxlci5udW1iZXIgPT09IG51bWJlcilbMF07XG4gICAgICAgIHJldHVybiBwYXRyb2xsZXI7XG4gICAgfVxufVxuIiwiaW1wb3J0IFwiQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlc1wiO1xuaW1wb3J0IHtcbiAgICBDb250ZXh0LFxuICAgIFNlcnZlcmxlc3NDYWxsYmFjayxcbiAgICBTZXJ2ZXJsZXNzRXZlbnRPYmplY3QsXG4gICAgU2VydmVybGVzc0Z1bmN0aW9uU2lnbmF0dXJlLFxufSBmcm9tIFwiQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlcy90eXBlc1wiO1xuaW1wb3J0IEJWTlNQQ2hlY2tpbkhhbmRsZXIsIHsgSGFuZGxlckV2ZW50IH0gZnJvbSBcIi4vYnZuc3BfY2hlY2tpbl9oYW5kbGVyXCI7XG5pbXBvcnQgeyBIYW5kbGVyRW52aXJvbm1lbnQgfSBmcm9tIFwiLi4vZW52L2hhbmRsZXJfY29uZmlnXCI7XG5cbmNvbnN0IE5FWFRfU1RFUF9DT09LSUVfTkFNRSA9IFwiYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXBcIjtcblxuLyoqXG4gKiBUd2lsaW8gU2VydmVybGVzcyBmdW5jdGlvbiBoYW5kbGVyIGZvciBCVk5TUCBjaGVjay1pbi5cbiAqIEBwYXJhbSB7Q29udGV4dDxIYW5kbGVyRW52aXJvbm1lbnQ+fSBjb250ZXh0IC0gVGhlIFR3aWxpbyBzZXJ2ZXJsZXNzIGNvbnRleHQuXG4gKiBAcGFyYW0ge1NlcnZlcmxlc3NFdmVudE9iamVjdDxIYW5kbGVyRXZlbnQ+fSBldmVudCAtIFRoZSBldmVudCBvYmplY3QuXG4gKiBAcGFyYW0ge1NlcnZlcmxlc3NDYWxsYmFja30gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBjb25zdCBoYW5kbGVyOiBTZXJ2ZXJsZXNzRnVuY3Rpb25TaWduYXR1cmU8XG4gICAgSGFuZGxlckVudmlyb25tZW50LFxuICAgIEhhbmRsZXJFdmVudFxuPiA9IGFzeW5jIGZ1bmN0aW9uIChcbiAgICBjb250ZXh0OiBDb250ZXh0PEhhbmRsZXJFbnZpcm9ubWVudD4sXG4gICAgZXZlbnQ6IFNlcnZlcmxlc3NFdmVudE9iamVjdDxIYW5kbGVyRXZlbnQ+LFxuICAgIGNhbGxiYWNrOiBTZXJ2ZXJsZXNzQ2FsbGJhY2tcbikge1xuICAgIGNvbnN0IGhhbmRsZXIgPSBuZXcgQlZOU1BDaGVja2luSGFuZGxlcihjb250ZXh0LCBldmVudCk7XG4gICAgbGV0IG1lc3NhZ2U6IHN0cmluZztcbiAgICBsZXQgbmV4dF9zdGVwOiBzdHJpbmcgPSBcIlwiO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXJfcmVzcG9uc2UgPSBhd2FpdCBoYW5kbGVyLmhhbmRsZSgpO1xuICAgICAgICBtZXNzYWdlID1cbiAgICAgICAgICAgIGhhbmRsZXJfcmVzcG9uc2UucmVzcG9uc2UgfHxcbiAgICAgICAgICAgIFwiVW5leHBlY3RlZCByZXN1bHQgLSBubyByZXNwb25zZSBkZXRlcm1pbmVkXCI7XG4gICAgICAgIG5leHRfc3RlcCA9IGhhbmRsZXJfcmVzcG9uc2UubmV4dF9zdGVwIHx8IFwiXCI7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkFuIGVycm9yIG9jY3VyZWRcIik7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlKSk7XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIH1cbiAgICAgICAgbWVzc2FnZSA9IFwiQW4gdW5leHBlY3RlZCBlcnJvciBvY2N1cmVkLlwiO1xuICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICBtZXNzYWdlICs9IFwiXFxuXCIgKyBlLm1lc3NhZ2U7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yXCIsIGUuc3RhY2spO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvclwiLCBlLm5hbWUpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvclwiLCBlLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBuZXcgVHdpbGlvLlJlc3BvbnNlKCk7XG4gICAgY29uc3QgdHdpbWwgPSBuZXcgVHdpbGlvLnR3aW1sLk1lc3NhZ2luZ1Jlc3BvbnNlKCk7XG5cbiAgICB0d2ltbC5tZXNzYWdlKG1lc3NhZ2UpO1xuXG4gICAgcmVzcG9uc2VcbiAgICAgICAgLy8gQWRkIHRoZSBzdHJpbmdpZmllZCBUd2lNTCB0byB0aGUgcmVzcG9uc2UgYm9keVxuICAgICAgICAuc2V0Qm9keSh0d2ltbC50b1N0cmluZygpKVxuICAgICAgICAvLyBTaW5jZSB3ZSdyZSByZXR1cm5pbmcgVHdpTUwsIHRoZSBjb250ZW50IHR5cGUgbXVzdCBiZSBYTUxcbiAgICAgICAgLmFwcGVuZEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcInRleHQveG1sXCIpXG4gICAgICAgIC5zZXRDb29raWUoTkVYVF9TVEVQX0NPT0tJRV9OQU1FLCBuZXh0X3N0ZXApO1xuXG4gICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlKTtcbn07IiwiaW1wb3J0IHsgc2hlZXRzX3Y0IH0gZnJvbSBcImdvb2dsZWFwaXNcIjtcbmltcG9ydCB7IENvbXBQYXNzZXNDb25maWcsIE1hbmFnZXJQYXNzZXNDb25maWcgfSBmcm9tIFwiLi4vZW52L2hhbmRsZXJfY29uZmlnXCI7XG5pbXBvcnQgeyBleGNlbF9yb3dfdG9faW5kZXgsIHJvd19jb2xfdG9fZXhjZWxfaW5kZXggfSBmcm9tIFwiLi4vdXRpbHMvdXRpbFwiO1xuaW1wb3J0IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiIGZyb20gXCIuLi91dGlscy9nb29nbGVfc2hlZXRzX3NwcmVhZHNoZWV0X3RhYlwiO1xuaW1wb3J0IHsgZm9ybWF0X2RhdGVfZm9yX3NwcmVhZHNoZWV0X3ZhbHVlIH0gZnJvbSBcIi4uL3V0aWxzL2RhdGV0aW1lX3V0aWxcIjtcbmltcG9ydCB7XG4gICAgYnVpbGRfcGFzc2VzX3N0cmluZyxcbiAgICBDb21wUGFzc1R5cGUsXG4gICAgZ2V0X2NvbXBfcGFzc19kZXNjcmlwdGlvbixcbn0gZnJvbSBcIi4uL3V0aWxzL2NvbXBfcGFzc2VzXCI7XG5pbXBvcnQgeyBCVk5TUENoZWNraW5SZXNwb25zZSB9IGZyb20gXCIuLi9oYW5kbGVycy9idm5zcF9jaGVja2luX2hhbmRsZXJcIjtcblxuZXhwb3J0IGNsYXNzIFVzZWRBbmRBdmFpbGFibGVQYXNzZXMge1xuICAgIHJvdzogYW55W107XG4gICAgaW5kZXg6IG51bWJlcjtcbiAgICBhdmFpbGFibGU6IG51bWJlcjtcbiAgICB1c2VkX3RvZGF5OiBudW1iZXI7XG4gICAgdXNlZF9zZWFzb246IG51bWJlcjtcbiAgICBjb21wX3Bhc3NfdHlwZTogQ29tcFBhc3NUeXBlO1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICByb3c6IGFueVtdLFxuICAgICAgICBpbmRleDogbnVtYmVyLFxuICAgICAgICBhdmFpbGFibGU6IGFueSxcbiAgICAgICAgdXNlZF90b2RheTogYW55LFxuICAgICAgICB1c2VkX3NlYXNvbjogYW55LFxuICAgICAgICB0eXBlOiBDb21wUGFzc1R5cGVcbiAgICApIHtcbiAgICAgICAgdGhpcy5yb3cgPSByb3c7XG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5hdmFpbGFibGUgPSBOdW1iZXIoYXZhaWxhYmxlKTtcbiAgICAgICAgdGhpcy51c2VkX3RvZGF5ID0gTnVtYmVyKHVzZWRfdG9kYXkpO1xuICAgICAgICB0aGlzLnVzZWRfc2Vhc29uID0gTnVtYmVyKHVzZWRfc2Vhc29uKTtcbiAgICAgICAgdGhpcy5jb21wX3Bhc3NfdHlwZSA9IHR5cGU7XG4gICAgfVxuXG4gICAgZ2V0X3Byb21wdCgpOiBCVk5TUENoZWNraW5SZXNwb25zZSB7XG4gICAgICAgIGlmICh0aGlzLmF2YWlsYWJsZSA+IDApIHtcbiAgICAgICAgICAgIGxldCByZXNwb25zZTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gICAgICAgICAgICBsZXQgcGFzc19zdHJpbmc6IHN0cmluZyA9IGdldF9jb21wX3Bhc3NfZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgdGhpcy5jb21wX3Bhc3NfdHlwZVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgcmVzcG9uc2UgPSBidWlsZF9wYXNzZXNfc3RyaW5nKFxuICAgICAgICAgICAgICAgIHRoaXMudXNlZF9zZWFzb24sXG4gICAgICAgICAgICAgICAgdGhpcy5hdmFpbGFibGUgKyB0aGlzLnVzZWRfc2Vhc29uLFxuICAgICAgICAgICAgICAgIHRoaXMudXNlZF90b2RheSxcbiAgICAgICAgICAgICAgICBgJHtwYXNzX3N0cmluZ31lc2AsXG4gICAgICAgICAgICAgICAgdHJ1ZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJlc3BvbnNlICs9XG4gICAgICAgICAgICAgICAgXCJcXG5cXG5cIiArXG4gICAgICAgICAgICAgICAgYEVudGVyIHRoZSBmaXJzdCBhbmQgbGFzdCBuYW1lIG9mIHRoZSBndWVzdCB0aGF0IHdpbGwgdXNlIGEgJHtwYXNzX3N0cmluZ30gdG9kYXkgKG9yICdyZXN0YXJ0Jyk6YDtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2U6IHJlc3BvbnNlLFxuICAgICAgICAgICAgICAgICAgICBuZXh0X3N0ZXA6IGBhd2FpdC1wYXNzLSR7dGhpcy5jb21wX3Bhc3NfdHlwZX1gLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3BvbnNlOiBgWW91IGRvIG5vdCBoYXZlIGFueSAke2dldF9jb21wX3Bhc3NfZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgdGhpcy5jb21wX3Bhc3NfdHlwZVxuICAgICAgICAgICAgKX0gYXZhaWxhYmxlIHRvZGF5YCxcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQYXNzU2hlZXQge1xuICAgIHNoZWV0OiBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYjtcbiAgICBjb21wX3Bhc3NfdHlwZTogQ29tcFBhc3NUeXBlO1xuICAgIGNvbnN0cnVjdG9yKHNoZWV0OiBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYiwgdHlwZTogQ29tcFBhc3NUeXBlKSB7XG4gICAgICAgIHRoaXMuc2hlZXQgPSBzaGVldDtcbiAgICAgICAgdGhpcy5jb21wX3Bhc3NfdHlwZSA9IHR5cGU7XG4gICAgfVxuXG4gICAgYWJzdHJhY3QgZ2V0IGF2YWlsYWJsZV9jb2x1bW4oKTogc3RyaW5nO1xuICAgIGFic3RyYWN0IGdldCB1c2VkX3RvZGF5X2NvbHVtbigpOiBzdHJpbmc7XG4gICAgYWJzdHJhY3QgZ2V0IHVzZWRfc2Vhc29uX2NvbHVtbigpOiBzdHJpbmc7XG4gICAgYWJzdHJhY3QgZ2V0IG5hbWVfY29sdW1uKCk6IHN0cmluZztcbiAgICBhYnN0cmFjdCBnZXQgc3RhcnRfaW5kZXgoKTogbnVtYmVyO1xuICAgIGFic3RyYWN0IGdldCBzaGVldF9uYW1lKCk6IHN0cmluZztcblxuICAgIGFzeW5jIGdldF9hdmFpbGFibGVfYW5kX3VzZWRfcGFzc2VzKFxuICAgICAgICBwYXRyb2xsZXJfbmFtZTogc3RyaW5nXG4gICAgKTogUHJvbWlzZTxVc2VkQW5kQXZhaWxhYmxlUGFzc2VzIHwgbnVsbD4ge1xuICAgICAgICBjb25zdCBwYXRyb2xsZXJfcm93ID0gYXdhaXQgdGhpcy5zaGVldC5nZXRfc2hlZXRfcm93X2Zvcl9wYXRyb2xsZXIoXG4gICAgICAgICAgICBwYXRyb2xsZXJfbmFtZSxcbiAgICAgICAgICAgIHRoaXMubmFtZV9jb2x1bW5cbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHBhdHJvbGxlcl9yb3cgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY3VycmVudF9kYXlfYXZhaWxhYmxlX3Bhc3NlcyA9XG4gICAgICAgICAgICBwYXRyb2xsZXJfcm93LnJvd1tleGNlbF9yb3dfdG9faW5kZXgodGhpcy5hdmFpbGFibGVfY29sdW1uKV07XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfZGF5X3VzZWRfcGFzc2VzID1cbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cucm93W2V4Y2VsX3Jvd190b19pbmRleCh0aGlzLnVzZWRfdG9kYXlfY29sdW1uKV07XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfc2Vhc29uX3VzZWRfcGFzc2VzID1cbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cucm93W2V4Y2VsX3Jvd190b19pbmRleCh0aGlzLnVzZWRfc2Vhc29uX2NvbHVtbildO1xuICAgICAgICByZXR1cm4gbmV3IFVzZWRBbmRBdmFpbGFibGVQYXNzZXMoXG4gICAgICAgICAgICBwYXRyb2xsZXJfcm93LnJvdyxcbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cuaW5kZXgsXG4gICAgICAgICAgICBjdXJyZW50X2RheV9hdmFpbGFibGVfcGFzc2VzLFxuICAgICAgICAgICAgY3VycmVudF9kYXlfdXNlZF9wYXNzZXMsXG4gICAgICAgICAgICBjdXJyZW50X3NlYXNvbl91c2VkX3Bhc3NlcyxcbiAgICAgICAgICAgIHRoaXMuY29tcF9wYXNzX3R5cGVcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBhc3luYyBzZXRfdXNlZF9jb21wX3Bhc3NlcyhcbiAgICAgICAgcGF0cm9sbGVyX3JvdzogVXNlZEFuZEF2YWlsYWJsZVBhc3NlcyxcbiAgICAgICAgZ3Vlc3RfbmFtZTogc3RyaW5nXG4gICAgKSB7XG4gICAgICAgIGlmIChwYXRyb2xsZXJfcm93LmF2YWlsYWJsZSA8IDEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICBgTm90IGVub3VnaCBhdmFpbGFibGUgcGFzc2VzOiBBdmFpbGFibGU6ICR7cGF0cm9sbGVyX3Jvdy5hdmFpbGFibGV9LCBVc2VkIHRoaXMgc2Vhc29uOiAgJHtwYXRyb2xsZXJfcm93LnVzZWRfc2Vhc29ufSwgVXNlZCB0b2RheTogJHtwYXRyb2xsZXJfcm93LnVzZWRfdG9kYXl9YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByb3dudW0gPSBwYXRyb2xsZXJfcm93LmluZGV4O1xuXG4gICAgICAgIGNvbnN0IHN0YXJ0X2luZGV4ID0gdGhpcy5zdGFydF9pbmRleDtcbiAgICAgICAgY29uc3QgcHJpb3JfbGVuZ3RoID0gcGF0cm9sbGVyX3Jvdy5yb3cubGVuZ3RoIC0gc3RhcnRfaW5kZXg7XG5cbiAgICAgICAgY29uc3QgY3VycmVudF9kYXRlX3N0cmluZyA9IGZvcm1hdF9kYXRlX2Zvcl9zcHJlYWRzaGVldF92YWx1ZShcbiAgICAgICAgICAgIG5ldyBEYXRlKClcbiAgICAgICAgKTtcbiAgICAgICAgbGV0IG5ld192YWxzID0gcGF0cm9sbGVyX3Jvdy5yb3dcbiAgICAgICAgICAgIC5zbGljZShzdGFydF9pbmRleClcbiAgICAgICAgICAgIC5tYXAoKHgpID0+IHg/LnRvU3RyaW5nKCkpO1xuXG4gICAgICAgIC8vIEFkZCB0aGUgY3VycmVudCBkYXRlIGFwcGVuZGVkIHdpdGggdGhlIG5ldyBndWVzdCBuYW1lXG4gICAgICAgIG5ld192YWxzLnB1c2goY3VycmVudF9kYXRlX3N0cmluZyArIFwiLFwiICsgZ3Vlc3RfbmFtZSk7XG5cbiAgICAgICAgY29uc3QgdXBkYXRlX2xlbmd0aCA9IE1hdGgubWF4KHByaW9yX2xlbmd0aCwgbmV3X3ZhbHMubGVuZ3RoKTtcbiAgICAgICAgd2hpbGUgKG5ld192YWxzLmxlbmd0aCA8IHVwZGF0ZV9sZW5ndGgpIHtcbiAgICAgICAgICAgIG5ld192YWxzLnB1c2goXCJcIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZW5kX2luZGV4ID0gc3RhcnRfaW5kZXggKyB1cGRhdGVfbGVuZ3RoIC0gMTtcblxuICAgICAgICBjb25zdCByYW5nZSA9IGAke3RoaXMuc2hlZXQuc2hlZXRfbmFtZX0hJHtyb3dfY29sX3RvX2V4Y2VsX2luZGV4KFxuICAgICAgICAgICAgcm93bnVtLFxuICAgICAgICAgICAgc3RhcnRfaW5kZXhcbiAgICAgICAgKX06JHtyb3dfY29sX3RvX2V4Y2VsX2luZGV4KHJvd251bSwgZW5kX2luZGV4KX1gO1xuICAgICAgICBjb25zb2xlLmxvZyhgVXBkYXRpbmcgJHtyYW5nZX0gd2l0aCAke25ld192YWxzLmxlbmd0aH0gdmFsdWVzYCk7XG4gICAgICAgIGF3YWl0IHRoaXMuc2hlZXQudXBkYXRlX3ZhbHVlcyhyYW5nZSwgW25ld192YWxzXSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ29tcFBhc3NTaGVldCBleHRlbmRzIFBhc3NTaGVldCB7XG4gICAgY29uZmlnOiBDb21wUGFzc2VzQ29uZmlnO1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyB8IG51bGwsXG4gICAgICAgIGNvbmZpZzogQ29tcFBhc3Nlc0NvbmZpZ1xuICAgICkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIG5ldyBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYihcbiAgICAgICAgICAgICAgICBzaGVldHNfc2VydmljZSxcbiAgICAgICAgICAgICAgICBjb25maWcuU0hFRVRfSUQsXG4gICAgICAgICAgICAgICAgY29uZmlnLkNPTVBfUEFTU19TSEVFVFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIENvbXBQYXNzVHlwZS5Db21wUGFzc1xuICAgICAgICApO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICB9XG5cbiAgICBnZXQgc3RhcnRfaW5kZXgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGV4Y2VsX3Jvd190b19pbmRleChcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLkNPTVBfUEFTU19TSEVFVF9EQVRFU19TVEFSVElOR19DT0xVTU5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgZ2V0IHNoZWV0X25hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLkNPTVBfUEFTU19TSEVFVDtcbiAgICB9XG4gICAgZ2V0IGF2YWlsYWJsZV9jb2x1bW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLkNPTVBfUEFTU19TSEVFVF9EQVRFU19BVkFJTEFCTEVfQ09MVU1OO1xuICAgIH1cbiAgICBnZXQgdXNlZF90b2RheV9jb2x1bW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLkNPTVBfUEFTU19TSEVFVF9VU0VEX1RPREFZX0NPTFVNTjtcbiAgICB9XG4gICAgZ2V0IHVzZWRfc2Vhc29uX2NvbHVtbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuQ09NUF9QQVNTX1NIRUVUX1VTRURfU0VBU09OX0NPTFVNTjtcbiAgICB9XG4gICAgZ2V0IG5hbWVfY29sdW1uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5DT01QX1BBU1NfU0hFRVRfTkFNRV9DT0xVTU47XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTWFuYWdlclBhc3NTaGVldCBleHRlbmRzIFBhc3NTaGVldCB7XG4gICAgY29uZmlnOiBNYW5hZ2VyUGFzc2VzQ29uZmlnO1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyB8IG51bGwsXG4gICAgICAgIGNvbmZpZzogTWFuYWdlclBhc3Nlc0NvbmZpZ1xuICAgICkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIG5ldyBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYihcbiAgICAgICAgICAgICAgICBzaGVldHNfc2VydmljZSxcbiAgICAgICAgICAgICAgICBjb25maWcuU0hFRVRfSUQsXG4gICAgICAgICAgICAgICAgY29uZmlnLk1BTkFHRVJfUEFTU19TSEVFVFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIENvbXBQYXNzVHlwZS5NYW5hZ2VyUGFzc1xuICAgICAgICApO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICB9XG5cbiAgICBnZXQgc3RhcnRfaW5kZXgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGV4Y2VsX3Jvd190b19pbmRleChcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLk1BTkFHRVJfUEFTU19TSEVFVF9EQVRFU19TVEFSVElOR19DT0xVTU5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgZ2V0IHNoZWV0X25hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLk1BTkFHRVJfUEFTU19TSEVFVDtcbiAgICB9XG4gICAgZ2V0IGF2YWlsYWJsZV9jb2x1bW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLk1BTkFHRVJfUEFTU19TSEVFVF9BVkFJTEFCTEVfQ09MVU1OO1xuICAgIH1cbiAgICBnZXQgdXNlZF90b2RheV9jb2x1bW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLk1BTkFHRVJfUEFTU19TSEVFVF9VU0VEX1RPREFZX0NPTFVNTjtcbiAgICB9XG4gICAgZ2V0IHVzZWRfc2Vhc29uX2NvbHVtbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuTUFOQUdFUl9QQVNTX1NIRUVUX1VTRURfU0VBU09OX0NPTFVNTjtcbiAgICB9XG4gICAgZ2V0IG5hbWVfY29sdW1uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5NQU5BR0VSX1BBU1NfU0hFRVRfTkFNRV9DT0xVTU47XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQsIGV4Y2VsX3Jvd190b19pbmRleCB9IGZyb20gXCIuLi91dGlscy91dGlsXCI7XG5pbXBvcnQgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIgZnJvbSBcIi4uL3V0aWxzL2dvb2dsZV9zaGVldHNfc3ByZWFkc2hlZXRfdGFiXCI7XG5pbXBvcnQgeyBzYW5pdGl6ZV9kYXRlIH0gZnJvbSBcIi4uL3V0aWxzL2RhdGV0aW1lX3V0aWxcIjtcbmltcG9ydCB7IExvZ2luU2hlZXRDb25maWcsIFBhdHJvbGxlclJvd0NvbmZpZyB9IGZyb20gXCIuLi9lbnYvaGFuZGxlcl9jb25maWdcIjtcbmltcG9ydCB7IHNoZWV0c192NCB9IGZyb20gXCJnb29nbGVhcGlzXCI7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHJvdyBvZiBwYXRyb2xsZXIgZGF0YS5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IFBhdHJvbGxlclJvd1xuICogQHByb3BlcnR5IHtudW1iZXJ9IGluZGV4IC0gVGhlIGluZGV4IG9mIHRoZSByb3cuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwYXRyb2xsZXIuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gY2F0ZWdvcnkgLSBUaGUgY2F0ZWdvcnkgb2YgdGhlIHBhdHJvbGxlci5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBzZWN0aW9uIC0gVGhlIHNlY3Rpb24gb2YgdGhlIHBhdHJvbGxlci5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBjaGVja2luIC0gVGhlIGNoZWNrLWluIHN0YXR1cyBvZiB0aGUgcGF0cm9sbGVyLlxuICovXG5leHBvcnQgdHlwZSBQYXRyb2xsZXJSb3cgPSB7XG4gICAgaW5kZXg6IG51bWJlcjtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgY2F0ZWdvcnk6IHN0cmluZztcbiAgICBzZWN0aW9uOiBzdHJpbmc7XG4gICAgY2hlY2tpbjogc3RyaW5nO1xufTtcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBsb2dpbiBzaGVldCBpbiBHb29nbGUgU2hlZXRzLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dpblNoZWV0IHtcbiAgICBsb2dpbl9zaGVldDogR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWI7XG4gICAgY2hlY2tpbl9jb3VudF9zaGVldDogR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWI7XG4gICAgY29uZmlnOiBMb2dpblNoZWV0Q29uZmlnO1xuICAgIHJvd3M/OiBhbnlbXVtdIHwgbnVsbCA9IG51bGw7XG4gICAgY2hlY2tpbl9jb3VudDogbnVtYmVyIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgIHBhdHJvbGxlcnM6IFBhdHJvbGxlclJvd1tdID0gW107XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIExvZ2luU2hlZXQuXG4gICAgICogQHBhcmFtIHtzaGVldHNfdjQuU2hlZXRzIHwgbnVsbH0gc2hlZXRzX3NlcnZpY2UgLSBUaGUgR29vZ2xlIFNoZWV0cyBBUEkgc2VydmljZS5cbiAgICAgKiBAcGFyYW0ge0xvZ2luU2hlZXRDb25maWd9IGNvbmZpZyAtIFRoZSBjb25maWd1cmF0aW9uIGZvciB0aGUgbG9naW4gc2hlZXQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzIHwgbnVsbCxcbiAgICAgICAgY29uZmlnOiBMb2dpblNoZWV0Q29uZmlnXG4gICAgKSB7XG4gICAgICAgIHRoaXMubG9naW5fc2hlZXQgPSBuZXcgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIoXG4gICAgICAgICAgICBzaGVldHNfc2VydmljZSxcbiAgICAgICAgICAgIGNvbmZpZy5TSEVFVF9JRCxcbiAgICAgICAgICAgIGNvbmZpZy5MT0dJTl9TSEVFVF9MT09LVVBcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jaGVja2luX2NvdW50X3NoZWV0ID0gbmV3IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiKFxuICAgICAgICAgICAgc2hlZXRzX3NlcnZpY2UsXG4gICAgICAgICAgICBjb25maWcuU0hFRVRfSUQsXG4gICAgICAgICAgICBjb25maWcuQ0hFQ0tJTl9DT1VOVF9MT09LVVBcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVmcmVzaGVzIHRoZSBkYXRhIGZyb20gdGhlIEdvb2dsZSBTaGVldHMuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAgICovXG4gICAgYXN5bmMgcmVmcmVzaCgpIHtcbiAgICAgICAgdGhpcy5yb3dzID0gYXdhaXQgdGhpcy5sb2dpbl9zaGVldC5nZXRfdmFsdWVzKFxuICAgICAgICAgICAgdGhpcy5jb25maWcuTE9HSU5fU0hFRVRfTE9PS1VQXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY2hlY2tpbl9jb3VudCA9IChhd2FpdCB0aGlzLmNoZWNraW5fY291bnRfc2hlZXQuZ2V0X3ZhbHVlcyhcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLkNIRUNLSU5fQ09VTlRfTE9PS1VQXG4gICAgICAgICkpIVswXVswXTtcbiAgICAgICAgdGhpcy5wYXRyb2xsZXJzID0gdGhpcy5yb3dzIS5tYXAoKHgsIGkpID0+XG4gICAgICAgICAgICB0aGlzLnBhcnNlX3BhdHJvbGxlcl9yb3coaSwgeCwgdGhpcy5jb25maWcpXG4gICAgICAgICkuZmlsdGVyKCh4KSA9PiB4ICE9IG51bGwpIGFzIFBhdHJvbGxlclJvd1tdO1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiUmVmcmVzaGluZyBQYXRyb2xsZXJzOiBcIiApO1xuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMucGF0cm9sbGVycyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgYXJjaGl2ZWQgc3RhdHVzIG9mIHRoZSBsb2dpbiBzaGVldC5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc2hlZXQgaXMgYXJjaGl2ZWQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKi9cbiAgICBnZXQgYXJjaGl2ZWQoKSB7XG4gICAgICAgIGNvbnN0IGFyY2hpdmVkID0gbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQoXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5BUkNISVZFRF9DRUxMLFxuICAgICAgICAgICAgdGhpcy5yb3dzIVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgKGFyY2hpdmVkID09PSB1bmRlZmluZWQgJiYgdGhpcy5jaGVja2luX2NvdW50ID09PSAwKSB8fFxuICAgICAgICAgICAgYXJjaGl2ZWQudG9Mb3dlckNhc2UoKSA9PT0gXCJ5ZXNcIlxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGRhdGUgb2YgdGhlIHNoZWV0LlxuICAgICAqIEByZXR1cm5zIHtEYXRlfSBUaGUgZGF0ZSBvZiB0aGUgc2hlZXQuXG4gICAgICovXG4gICAgZ2V0IHNoZWV0X2RhdGUoKSB7XG4gICAgICAgIHJldHVybiBzYW5pdGl6ZV9kYXRlKFxuICAgICAgICAgICAgbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQodGhpcy5jb25maWcuU0hFRVRfREFURV9DRUxMLCB0aGlzLnJvd3MhKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGN1cnJlbnQgZGF0ZS5cbiAgICAgKiBAcmV0dXJucyB7RGF0ZX0gVGhlIGN1cnJlbnQgZGF0ZS5cbiAgICAgKi9cbiAgICBnZXQgY3VycmVudF9kYXRlKCkge1xuICAgICAgICByZXR1cm4gc2FuaXRpemVfZGF0ZShcbiAgICAgICAgICAgIGxvb2t1cF9yb3dfY29sX2luX3NoZWV0KHRoaXMuY29uZmlnLkNVUlJFTlRfREFURV9DRUxMLCB0aGlzLnJvd3MhKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGUgc2hlZXQgZGF0ZSBpcyB0aGUgY3VycmVudCBkYXRlLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzaGVldCBkYXRlIGlzIHRoZSBjdXJyZW50IGRhdGUsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKi9cbiAgICBnZXQgaXNfY3VycmVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hlZXRfZGF0ZS5nZXRUaW1lKCkgPT09IHRoaXMuY3VycmVudF9kYXRlLmdldFRpbWUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmllcyB0byBmaW5kIGEgcGF0cm9sbGVyIGJ5IG5hbWUuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcGF0cm9sbGVyLlxuICAgICAqIEByZXR1cm5zIHtQYXRyb2xsZXJSb3cgfCBcIm5vdF9mb3VuZFwifSBUaGUgcGF0cm9sbGVyIHJvdyBvciBcIm5vdF9mb3VuZFwiLlxuICAgICAqL1xuICAgIHRyeV9maW5kX3BhdHJvbGxlcihuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgcGF0cm9sbGVycyA9IHRoaXMucGF0cm9sbGVycy5maWx0ZXIoKHgpID0+IHgubmFtZSA9PT0gbmFtZSk7XG4gICAgICAgIGlmIChwYXRyb2xsZXJzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIFwibm90X2ZvdW5kXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhdHJvbGxlcnNbMF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmluZHMgYSBwYXRyb2xsZXIgYnkgbmFtZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwYXRyb2xsZXIuXG4gICAgICogQHJldHVybnMge1BhdHJvbGxlclJvd30gVGhlIHBhdHJvbGxlciByb3cuXG4gICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXRyb2xsZXIgaXMgbm90IGZvdW5kLlxuICAgICAqL1xuICAgIGZpbmRfcGF0cm9sbGVyKG5hbWU6IHN0cmluZykge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLnRyeV9maW5kX3BhdHJvbGxlcihuYW1lKTtcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gXCJub3RfZm91bmRcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZmluZCAke25hbWV9IGluIGxvZ2luIHNoZWV0YCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwYXRyb2xsZXJzIHdobyBhcmUgb24gZHV0eS5cbiAgICAgKiBAcmV0dXJucyB7UGF0cm9sbGVyUm93W119IFRoZSBsaXN0IG9mIG9uLWR1dHkgcGF0cm9sbGVycy5cbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIGxvZ2luIHNoZWV0IGlzIG5vdCBjdXJyZW50LlxuICAgICAqL1xuICAgIGdldF9vbl9kdXR5X3BhdHJvbGxlcnMoKTogUGF0cm9sbGVyUm93W10ge1xuICAgICAgICBpZiAoIXRoaXMuaXNfY3VycmVudCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTG9naW4gc2hlZXQgaXMgbm90IGN1cnJlbnRcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucGF0cm9sbGVycy5maWx0ZXIoKHgpID0+IHguY2hlY2tpbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGluIGEgcGF0cm9sbGVyIHdpdGggYSBuZXcgY2hlY2staW4gdmFsdWUuXG4gICAgICogQHBhcmFtIHtQYXRyb2xsZXJSb3d9IHBhdHJvbGxlcl9zdGF0dXMgLSBUaGUgc3RhdHVzIG9mIHRoZSBwYXRyb2xsZXIuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5ld19jaGVja2luX3ZhbHVlIC0gVGhlIG5ldyBjaGVjay1pbiB2YWx1ZS5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIGxvZ2luIHNoZWV0IGlzIG5vdCBjdXJyZW50LlxuICAgICAqL1xuICAgIGFzeW5jIGNoZWNraW4ocGF0cm9sbGVyX3N0YXR1czogUGF0cm9sbGVyUm93LCBuZXdfY2hlY2tpbl92YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICghdGhpcy5pc19jdXJyZW50KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJMb2dpbiBzaGVldCBpcyBub3QgY3VycmVudFwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhgRXhpc3Rpbmcgc3RhdHVzOiAke0pTT04uc3RyaW5naWZ5KHBhdHJvbGxlcl9zdGF0dXMpfWApO1xuXG4gICAgICAgIGNvbnN0IHJvdyA9IHBhdHJvbGxlcl9zdGF0dXMuaW5kZXggKyAxOyAvLyBwcm9ncmFtbWluZyAtPiBleGNlbCBsb29rdXBcbiAgICAgICAgY29uc3QgcmFuZ2UgPSBgJHt0aGlzLmNvbmZpZy5DSEVDS0lOX0RST1BET1dOX0NPTFVNTn0ke3Jvd31gO1xuXG4gICAgICAgIGF3YWl0IHRoaXMubG9naW5fc2hlZXQudXBkYXRlX3ZhbHVlcyhyYW5nZSwgW1tuZXdfY2hlY2tpbl92YWx1ZV1dKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIEFzc2lnbnMgYSBzZWN0aW9uIHRvIGEgcGF0cm9sbGVyLlxuICAgICogQHBhcmFtIHtQYXRyb2xsZXJSb3d9IHBhdHJvbGxlciAtIFRoZSBwYXRyb2xsZXIgdG8gYXNzaWduIHRoZSBzZWN0aW9uIHRvLlxuICAgICogQHBhcmFtIHtzdHJpbmd9IG5ld19zZWN0aW9uX3ZhbHVlIC0gVGhlIG5ldyBzZWN0aW9uIHZhbHVlLlxuICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIGxvZ2luIHNoZWV0IGlzIG5vdCBjdXJyZW50LlxuICAgICovXG4gICAgYXN5bmMgYXNzaWduX3NlY3Rpb24ocGF0cm9sbGVyX3NlY3Rpb246IFBhdHJvbGxlclJvdywgbmV3X3NlY3Rpb25fdmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAoIXRoaXMuaXNfY3VycmVudCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTG9naW4gc2hlZXQgaXMgbm90IGN1cnJlbnRcIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coYEV4aXN0aW5nIHN0YXR1czogJHtKU09OLnN0cmluZ2lmeShwYXRyb2xsZXJfc2VjdGlvbil9YCk7XG5cbiAgICAgICAgY29uc3Qgcm93ID0gcGF0cm9sbGVyX3NlY3Rpb24uaW5kZXggKyAxOyAvLyBwcm9ncmFtbWluZyAtPiBleGNlbCBsb29rdXBcbiAgICAgICAgY29uc3QgcmFuZ2UgPSBgJHt0aGlzLmNvbmZpZy5TRUNUSU9OX0RST1BET1dOX0NPTFVNTn0ke3Jvd31gO1xuXG4gICAgICAgIGF3YWl0IHRoaXMubG9naW5fc2hlZXQudXBkYXRlX3ZhbHVlcyhyYW5nZSwgW1tuZXdfc2VjdGlvbl92YWx1ZV1dKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZXMgYSByb3cgb2YgcGF0cm9sbGVyIGRhdGEuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gVGhlIGluZGV4IG9mIHRoZSByb3cuXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gcm93IC0gVGhlIHJvdyBkYXRhLlxuICAgICAqIEBwYXJhbSB7UGF0cm9sbGVyUm93Q29uZmlnfSBvcHRzIC0gVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyBmb3IgdGhlIHBhdHJvbGxlciByb3cuXG4gICAgICogQHJldHVybnMge1BhdHJvbGxlclJvdyB8IG51bGx9IFRoZSBwYXJzZWQgcGF0cm9sbGVyIHJvdyBvciBudWxsIGlmIGludmFsaWQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBwYXJzZV9wYXRyb2xsZXJfcm93KFxuICAgICAgICBpbmRleDogbnVtYmVyLFxuICAgICAgICByb3c6IHN0cmluZ1tdLFxuICAgICAgICBvcHRzOiBQYXRyb2xsZXJSb3dDb25maWdcbiAgICApOiBQYXRyb2xsZXJSb3cgfCBudWxsIHtcbiAgICAgICAgaWYgKHJvdy5sZW5ndGggPCA0KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXggPCAzKXtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICBuYW1lOiByb3dbZXhjZWxfcm93X3RvX2luZGV4KG9wdHMuTkFNRV9DT0xVTU4pXSxcbiAgICAgICAgICAgIGNhdGVnb3J5OiByb3dbZXhjZWxfcm93X3RvX2luZGV4KG9wdHMuQ0FURUdPUllfQ09MVU1OKV0sXG4gICAgICAgICAgICBzZWN0aW9uOiByb3dbZXhjZWxfcm93X3RvX2luZGV4KG9wdHMuU0VDVElPTl9EUk9QRE9XTl9DT0xVTU4pXSxcbiAgICAgICAgICAgIGNoZWNraW46IHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5DSEVDS0lOX0RST1BET1dOX0NPTFVNTildLFxuICAgICAgICB9O1xuICAgIH1cbn0iLCJpbXBvcnQgeyBzaGVldHNfdjQgfSBmcm9tIFwiZ29vZ2xlYXBpc1wiO1xuaW1wb3J0IHtcbiAgICBTZWFzb25TaGVldENvbmZpZyxcbn0gZnJvbSBcIi4uL2Vudi9oYW5kbGVyX2NvbmZpZ1wiO1xuaW1wb3J0IHsgZXhjZWxfcm93X3RvX2luZGV4IH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxcIjtcbmltcG9ydCBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYiBmcm9tIFwiLi4vdXRpbHMvZ29vZ2xlX3NoZWV0c19zcHJlYWRzaGVldF90YWJcIjtcbmltcG9ydCB7IGZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2N1cnJlbnRfZGF5IH0gZnJvbSBcIi4uL3V0aWxzL2RhdGV0aW1lX3V0aWxcIjtcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBzZWFzb24gc2hlZXQgaW4gR29vZ2xlIFNoZWV0cy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2Vhc29uU2hlZXQge1xuICAgIHNoZWV0OiBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYjtcbiAgICBjb25maWc6IFNlYXNvblNoZWV0Q29uZmlnO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBTZWFzb25TaGVldC5cbiAgICAgKiBAcGFyYW0ge3NoZWV0c192NC5TaGVldHMgfCBudWxsfSBzaGVldHNfc2VydmljZSAtIFRoZSBHb29nbGUgU2hlZXRzIEFQSSBzZXJ2aWNlLlxuICAgICAqIEBwYXJhbSB7U2Vhc29uU2hlZXRDb25maWd9IGNvbmZpZyAtIFRoZSBjb25maWd1cmF0aW9uIGZvciB0aGUgc2Vhc29uIHNoZWV0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyB8IG51bGwsXG4gICAgICAgIGNvbmZpZzogU2Vhc29uU2hlZXRDb25maWdcbiAgICApIHtcbiAgICAgICAgdGhpcy5zaGVldCA9IG5ldyBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYihcbiAgICAgICAgICAgIHNoZWV0c19zZXJ2aWNlLFxuICAgICAgICAgICAgY29uZmlnLlNIRUVUX0lELFxuICAgICAgICAgICAgY29uZmlnLlNFQVNPTl9TSEVFVFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBudW1iZXIgb2YgZGF5cyBwYXRyb2xsZWQgYnkgYSBwYXRyb2xsZXIuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdHJvbGxlcl9uYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHBhdHJvbGxlci5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxudW1iZXI+fSBUaGUgbnVtYmVyIG9mIGRheXMgcGF0cm9sbGVkLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF9wYXRyb2xsZWRfZGF5cyhcbiAgICAgICAgcGF0cm9sbGVyX25hbWU6IHN0cmluZ1xuICAgICk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgICAgIGNvbnN0IHBhdHJvbGxlcl9yb3cgPSBhd2FpdCB0aGlzLnNoZWV0LmdldF9zaGVldF9yb3dfZm9yX3BhdHJvbGxlcihcbiAgICAgICAgICAgIHBhdHJvbGxlcl9uYW1lLFxuICAgICAgICAgICAgdGhpcy5jb25maWcuU0VBU09OX1NIRUVUX05BTUVfQ09MVU1OXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKCFwYXRyb2xsZXJfcm93KSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjdXJyZW50TnVtYmVyID1cbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cucm93W2V4Y2VsX3Jvd190b19pbmRleCh0aGlzLmNvbmZpZy5TRUFTT05fU0hFRVRfREFZU19DT0xVTU4pXTtcblxuICAgICAgICBjb25zdCBjdXJyZW50RGF5ID0gZmlsdGVyX2xpc3RfdG9fZW5kc3dpdGhfY3VycmVudF9kYXkocGF0cm9sbGVyX3Jvdy5yb3cpXG4gICAgICAgICAgICAubWFwKCh4KSA9PiAoeD8uc3RhcnRzV2l0aChcIkhcIikgPyAwLjUgOiAxKSlcbiAgICAgICAgICAgIC5yZWR1Y2UoKHgsIHksIGkpID0+IHggKyB5LCAwKTtcblxuICAgICAgICBjb25zdCBkYXlzQmVmb3JlVG9kYXkgPSBjdXJyZW50TnVtYmVyIC0gY3VycmVudERheTtcbiAgICAgICAgcmV0dXJuIGRheXNCZWZvcmVUb2RheTtcbiAgICB9XG59IiwiaW1wb3J0IHsgZ29vZ2xlIH0gZnJvbSBcImdvb2dsZWFwaXNcIjtcbmltcG9ydCB7IEdlbmVyYXRlQXV0aFVybE9wdHMgfSBmcm9tIFwiZ29vZ2xlLWF1dGgtbGlicmFyeVwiO1xuaW1wb3J0IHsgT0F1dGgyQ2xpZW50IH0gZnJvbSBcImdvb2dsZWFwaXMtY29tbW9uXCI7XG5pbXBvcnQgeyBzYW5pdGl6ZV9waG9uZV9udW1iZXIgfSBmcm9tIFwiLi91dGlscy91dGlsXCI7XG5pbXBvcnQgeyBsb2FkX2NyZWRlbnRpYWxzX2ZpbGVzIH0gZnJvbSBcIi4vdXRpbHMvZmlsZV91dGlsc1wiO1xuaW1wb3J0IHsgU2VydmljZUNvbnRleHQgfSBmcm9tIFwiQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlcy90eXBlc1wiO1xuaW1wb3J0IHsgVXNlckNyZWRzQ29uZmlnIH0gZnJvbSBcIi4vZW52L2hhbmRsZXJfY29uZmlnXCI7XG5pbXBvcnQgeyB2YWxpZGF0ZV9zY29wZXMgfSBmcm9tIFwiLi91dGlscy9zY29wZV91dGlsXCI7XG5cbmNvbnN0IFNDT1BFUyA9IFtcbiAgICBcImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvc2NyaXB0LnByb2plY3RzXCIsXG4gICAgXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3NwcmVhZHNoZWV0c1wiLFxuXTtcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgdXNlciBjcmVkZW50aWFscyBmb3IgR29vZ2xlIE9BdXRoMi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckNyZWRzIHtcbiAgICBudW1iZXI6IHN0cmluZztcbiAgICBvYXV0aDJfY2xpZW50OiBPQXV0aDJDbGllbnQ7XG4gICAgc3luY19jbGllbnQ6IFNlcnZpY2VDb250ZXh0O1xuICAgIGRvbWFpbj86IHN0cmluZztcbiAgICBsb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIFVzZXJDcmVkcyBpbnN0YW5jZS5cbiAgICAgKiBAcGFyYW0ge1NlcnZpY2VDb250ZXh0fSBzeW5jX2NsaWVudCAtIFRoZSBUd2lsaW8gU3luYyBjbGllbnQuXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCB1bmRlZmluZWR9IG51bWJlciAtIFRoZSB1c2VyJ3MgcGhvbmUgbnVtYmVyLlxuICAgICAqIEBwYXJhbSB7VXNlckNyZWRzQ29uZmlnfSBvcHRzIC0gVGhlIHVzZXIgY3JlZGVudGlhbHMgY29uZmlndXJhdGlvbi5cbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gVGhyb3dzIGFuIGVycm9yIGlmIHRoZSBudW1iZXIgaXMgdW5kZWZpbmVkIG9yIG51bGwuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHN5bmNfY2xpZW50OiBTZXJ2aWNlQ29udGV4dCxcbiAgICAgICAgbnVtYmVyOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgICAgIG9wdHM6IFVzZXJDcmVkc0NvbmZpZ1xuICAgICkge1xuICAgICAgICBpZiAobnVtYmVyID09PSB1bmRlZmluZWQgfHwgbnVtYmVyID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOdW1iZXIgaXMgdW5kZWZpbmVkXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubnVtYmVyID0gc2FuaXRpemVfcGhvbmVfbnVtYmVyKG51bWJlcik7XG5cbiAgICAgICAgY29uc3QgY3JlZGVudGlhbHMgPSBsb2FkX2NyZWRlbnRpYWxzX2ZpbGVzKCk7XG4gICAgICAgIGNvbnN0IHsgY2xpZW50X3NlY3JldCwgY2xpZW50X2lkLCByZWRpcmVjdF91cmlzIH0gPSBjcmVkZW50aWFscy53ZWI7XG4gICAgICAgIHRoaXMub2F1dGgyX2NsaWVudCA9IG5ldyBnb29nbGUuYXV0aC5PQXV0aDIoXG4gICAgICAgICAgICBjbGllbnRfaWQsXG4gICAgICAgICAgICBjbGllbnRfc2VjcmV0LFxuICAgICAgICAgICAgcmVkaXJlY3RfdXJpc1swXVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN5bmNfY2xpZW50ID0gc3luY19jbGllbnQ7XG4gICAgICAgIGxldCBkb21haW4gPSBvcHRzLk5TUF9FTUFJTF9ET01BSU47XG4gICAgICAgIGlmIChkb21haW4gPT09IHVuZGVmaW5lZCB8fCBkb21haW4gPT09IG51bGwgfHwgZG9tYWluID09PSBcIlwiKSB7XG4gICAgICAgICAgICBkb21haW4gPSB1bmRlZmluZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRvbWFpbiA9IGRvbWFpbjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvYWQgdGhlIE9BdXRoMiB0b2tlbi5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBib29sZWFuIGluZGljYXRpbmcgaWYgdGhlIHRva2VuIHdhcyBsb2FkZWQuXG4gICAgICovXG4gICAgYXN5bmMgbG9hZFRva2VuKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICBpZiAoIXRoaXMubG9hZGVkKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBMb29raW5nIGZvciAke3RoaXMudG9rZW5fa2V5fWApO1xuICAgICAgICAgICAgICAgIGNvbnN0IG9hdXRoMkRvYyA9IGF3YWl0IHRoaXMuc3luY19jbGllbnRcbiAgICAgICAgICAgICAgICAgICAgLmRvY3VtZW50cyh0aGlzLnRva2VuX2tleSlcbiAgICAgICAgICAgICAgICAgICAgLmZldGNoKCk7XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICBvYXV0aDJEb2MgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgICAgICBvYXV0aDJEb2MuZGF0YSA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICAgICAgb2F1dGgyRG9jLmRhdGEudG9rZW4gPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgRGlkbid0IGZpbmQgJHt0aGlzLnRva2VuX2tleX1gKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0b2tlbiA9IG9hdXRoMkRvYy5kYXRhLnRva2VuO1xuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZV9zY29wZXMob2F1dGgyRG9jLmRhdGEuc2NvcGVzLCBTQ09QRVMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9hdXRoMl9jbGllbnQuc2V0Q3JlZGVudGlhbHModG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgTG9hZGVkIHRva2VuICR7dGhpcy50b2tlbl9rZXl9YCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgICAgIGBGYWlsZWQgdG8gbG9hZCB0b2tlbiBmb3IgJHt0aGlzLnRva2VuX2tleX0uXFxuICR7ZX1gXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5sb2FkZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB0b2tlbiBrZXkuXG4gICAgICogQHJldHVybnMge3N0cmluZ30gVGhlIHRva2VuIGtleS5cbiAgICAgKi9cbiAgICBnZXQgdG9rZW5fa2V5KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgb2F1dGgyXyR7dGhpcy5udW1iZXJ9YDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWxldGUgdGhlIE9BdXRoMiB0b2tlbi5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBib29sZWFuIGluZGljYXRpbmcgaWYgdGhlIHRva2VuIHdhcyBkZWxldGVkLlxuICAgICAqL1xuICAgIGFzeW5jIGRlbGV0ZVRva2VuKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICBjb25zdCBvYXV0aDJEb2MgPSBhd2FpdCB0aGlzLnN5bmNfY2xpZW50XG4gICAgICAgICAgICAuZG9jdW1lbnRzKHRoaXMudG9rZW5fa2V5KVxuICAgICAgICAgICAgLmZldGNoKCk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIG9hdXRoMkRvYyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICBvYXV0aDJEb2MuZGF0YSA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIG9hdXRoMkRvYy5kYXRhLnRva2VuID09PSB1bmRlZmluZWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgRGlkbid0IGZpbmQgJHt0aGlzLnRva2VuX2tleX1gKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLnN5bmNfY2xpZW50LmRvY3VtZW50cyhvYXV0aDJEb2Muc2lkKS5yZW1vdmUoKTtcbiAgICAgICAgY29uc29sZS5sb2coYERlbGV0ZWQgdG9rZW4gJHt0aGlzLnRva2VuX2tleX1gKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29tcGxldGUgdGhlIGxvZ2luIHByb2Nlc3MgYnkgZXhjaGFuZ2luZyB0aGUgYXV0aG9yaXphdGlvbiBjb2RlIGZvciBhIHRva2VuLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb2RlIC0gVGhlIGF1dGhvcml6YXRpb24gY29kZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBzY29wZXMgLSBUaGUgc2NvcGVzIHRvIHZhbGlkYXRlLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBsb2dpbiBwcm9jZXNzIGlzIGNvbXBsZXRlLlxuICAgICAqL1xuICAgIGFzeW5jIGNvbXBsZXRlTG9naW4oY29kZTogc3RyaW5nLCBzY29wZXM6IHN0cmluZ1tdKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHZhbGlkYXRlX3Njb3BlcyhzY29wZXMsIFNDT1BFUyk7XG4gICAgICAgIGNvbnN0IHRva2VuID0gYXdhaXQgdGhpcy5vYXV0aDJfY2xpZW50LmdldFRva2VuKGNvZGUpO1xuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShPYmplY3Qua2V5cyh0b2tlbi5yZXMhKSkpO1xuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0b2tlbi50b2tlbnMpKTtcbiAgICAgICAgdGhpcy5vYXV0aDJfY2xpZW50LnNldENyZWRlbnRpYWxzKHRva2VuLnRva2Vucyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBvYXV0aERvYyA9IGF3YWl0IHRoaXMuc3luY19jbGllbnQuZG9jdW1lbnRzLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgZGF0YTogeyB0b2tlbjogdG9rZW4udG9rZW5zLCBzY29wZXM6IHNjb3BlcyB9LFxuICAgICAgICAgICAgICAgIHVuaXF1ZU5hbWU6IHRoaXMudG9rZW5fa2V5LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgIGBFeGNlcHRpb24gd2hlbiBjcmVhdGluZyBvYXV0aC4gVHJ5aW5nIHRvIHVwZGF0ZSBpbnN0ZWFkLi4uXFxuJHtlfWBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCBvYXV0aERvYyA9IGF3YWl0IHRoaXMuc3luY19jbGllbnRcbiAgICAgICAgICAgICAgICAuZG9jdW1lbnRzKHRoaXMudG9rZW5fa2V5KVxuICAgICAgICAgICAgICAgIC51cGRhdGUoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7IHRva2VuOiB0b2tlbiwgc2NvcGVzOiBzY29wZXMgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgYXV0aG9yaXphdGlvbiBVUkwuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c3RyaW5nPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIGF1dGhvcml6YXRpb24gVVJMLlxuICAgICAqL1xuICAgIGFzeW5jIGdldEF1dGhVcmwoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgY29uc3QgaWQgPSB0aGlzLmdlbmVyYXRlUmFuZG9tU3RyaW5nKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBVc2luZyBub25jZSAke2lkfSBmb3IgJHt0aGlzLm51bWJlcn1gKTtcbiAgICAgICAgY29uc3QgZG9jID0gYXdhaXQgdGhpcy5zeW5jX2NsaWVudC5kb2N1bWVudHMuY3JlYXRlKHtcbiAgICAgICAgICAgIGRhdGE6IHsgbnVtYmVyOiB0aGlzLm51bWJlciwgc2NvcGVzOiBTQ09QRVMgfSxcbiAgICAgICAgICAgIHVuaXF1ZU5hbWU6IGlkLFxuICAgICAgICAgICAgdHRsOiA2MCAqIDUsIC8vIDUgbWludXRlc1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2coYE1hZGUgbm9uY2UtZG9jOiAke0pTT04uc3RyaW5naWZ5KGRvYyl9YCk7XG5cbiAgICAgICAgY29uc3Qgb3B0czogR2VuZXJhdGVBdXRoVXJsT3B0cyA9IHtcbiAgICAgICAgICAgIGFjY2Vzc190eXBlOiBcIm9mZmxpbmVcIixcbiAgICAgICAgICAgIHNjb3BlOiBTQ09QRVMsXG4gICAgICAgICAgICBzdGF0ZTogaWQsXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLmRvbWFpbikge1xuICAgICAgICAgICAgb3B0c1tcImhkXCJdID0gdGhpcy5kb21haW47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBhdXRoVXJsID0gdGhpcy5vYXV0aDJfY2xpZW50LmdlbmVyYXRlQXV0aFVybChvcHRzKTtcbiAgICAgICAgcmV0dXJuIGF1dGhVcmw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2VuZXJhdGUgYSByYW5kb20gc3RyaW5nLlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IEEgcmFuZG9tIHN0cmluZy5cbiAgICAgKi9cbiAgICBnZW5lcmF0ZVJhbmRvbVN0cmluZygpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBsZW5ndGggPSAzMDtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFwiXCI7XG4gICAgICAgIGNvbnN0IGNoYXJhY3RlcnMgPVxuICAgICAgICAgICAgXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OVwiO1xuICAgICAgICBjb25zdCBjaGFyYWN0ZXJzTGVuZ3RoID0gY2hhcmFjdGVycy5sZW5ndGg7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSBjaGFyYWN0ZXJzLmNoYXJBdChcbiAgICAgICAgICAgICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFyYWN0ZXJzTGVuZ3RoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cblxuLyoqXG4gKiBJbnRlcmZhY2UgcmVwcmVzZW50aW5nIHRoZSB1c2VyIGNyZWRlbnRpYWxzIGNvbmZpZ3VyYXRpb24uXG4gKi9cbmV4cG9ydCB7IFVzZXJDcmVkcywgU0NPUEVTIGFzIFVzZXJDcmVkc1Njb3BlcyB9O1xuIiwiLyoqXG4gKiBSZXByZXNlbnRzIGEgY2hlY2staW4gdmFsdWUgd2l0aCB2YXJpb3VzIHByb3BlcnRpZXMgYW5kIGxvb2t1cCB2YWx1ZXMuXG4gKi9cbmNsYXNzIENoZWNraW5WYWx1ZSB7XG4gICAga2V5OiBzdHJpbmc7XG4gICAgc2hlZXRzX3ZhbHVlOiBzdHJpbmc7XG4gICAgc21zX2Rlc2M6IHN0cmluZztcbiAgICBmYXN0X2NoZWNraW5zOiBzdHJpbmdbXTtcbiAgICBsb29rdXBfdmFsdWVzOiBTZXQ8c3RyaW5nPjtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQ2hlY2tpblZhbHVlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBUaGUga2V5IGZvciB0aGUgY2hlY2staW4gdmFsdWUuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNoZWV0c192YWx1ZSAtIFRoZSB2YWx1ZSB1c2VkIGluIHNoZWV0cy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc21zX2Rlc2MgLSBUaGUgZGVzY3JpcHRpb24gdXNlZCBpbiBTTVMuXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCBzdHJpbmdbXX0gZmFzdF9jaGVja2lucyAtIFRoZSBmYXN0IGNoZWNrLWluIHZhbHVlcy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAga2V5OiBzdHJpbmcsXG4gICAgICAgIHNoZWV0c192YWx1ZTogc3RyaW5nLFxuICAgICAgICBzbXNfZGVzYzogc3RyaW5nLFxuICAgICAgICBmYXN0X2NoZWNraW5zOiBzdHJpbmcgfCBzdHJpbmdbXVxuICAgICkge1xuICAgICAgICBpZiAoIShmYXN0X2NoZWNraW5zIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICAgICAgICBmYXN0X2NoZWNraW5zID0gW2Zhc3RfY2hlY2tpbnNdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgICAgICB0aGlzLnNoZWV0c192YWx1ZSA9IHNoZWV0c192YWx1ZTtcbiAgICAgICAgdGhpcy5zbXNfZGVzYyA9IHNtc19kZXNjO1xuICAgICAgICB0aGlzLmZhc3RfY2hlY2tpbnMgPSBmYXN0X2NoZWNraW5zLm1hcCgoeCkgPT4geC50cmltKCkudG9Mb3dlckNhc2UoKSk7XG5cbiAgICAgICAgY29uc3Qgc21zX2Rlc2Nfc3BsaXQ6IHN0cmluZ1tdID0gc21zX2Rlc2NcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXHMrLywgXCItXCIpXG4gICAgICAgICAgICAudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgLnNwbGl0KFwiL1wiKTtcbiAgICAgICAgY29uc3QgbG9va3VwX3ZhbHMgPSBbLi4udGhpcy5mYXN0X2NoZWNraW5zLCAuLi5zbXNfZGVzY19zcGxpdF07XG4gICAgICAgIHRoaXMubG9va3VwX3ZhbHVlcyA9IG5ldyBTZXQ8c3RyaW5nPihsb29rdXBfdmFscyk7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBjb2xsZWN0aW9uIG9mIGNoZWNrLWluIHZhbHVlcyB3aXRoIHZhcmlvdXMgbG9va3VwIG1ldGhvZHMuXG4gKi9cbmNsYXNzIENoZWNraW5WYWx1ZXMge1xuICAgIGJ5X2tleTogeyBba2V5OiBzdHJpbmddOiBDaGVja2luVmFsdWUgfSA9IHt9O1xuICAgIGJ5X2x2OiB7IFtrZXk6IHN0cmluZ106IENoZWNraW5WYWx1ZSB9ID0ge307XG4gICAgYnlfZmM6IHsgW2tleTogc3RyaW5nXTogQ2hlY2tpblZhbHVlIH0gPSB7fTtcbiAgICBieV9zaGVldF9zdHJpbmc6IHsgW2tleTogc3RyaW5nXTogQ2hlY2tpblZhbHVlIH0gPSB7fTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQ2hlY2tpblZhbHVlcy5cbiAgICAgKiBAcGFyYW0ge0NoZWNraW5WYWx1ZVtdfSBjaGVja2luVmFsdWVzIC0gVGhlIGFycmF5IG9mIGNoZWNrLWluIHZhbHVlcy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihjaGVja2luVmFsdWVzOiBDaGVja2luVmFsdWVbXSkge1xuICAgICAgICBmb3IgKHZhciBjaGVja2luVmFsdWUgb2YgY2hlY2tpblZhbHVlcykge1xuICAgICAgICAgICAgdGhpcy5ieV9rZXlbY2hlY2tpblZhbHVlLmtleV0gPSBjaGVja2luVmFsdWU7XG4gICAgICAgICAgICB0aGlzLmJ5X3NoZWV0X3N0cmluZ1tjaGVja2luVmFsdWUuc2hlZXRzX3ZhbHVlXSA9IGNoZWNraW5WYWx1ZTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbHYgb2YgY2hlY2tpblZhbHVlLmxvb2t1cF92YWx1ZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ5X2x2W2x2XSA9IGNoZWNraW5WYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3QgZmMgb2YgY2hlY2tpblZhbHVlLmZhc3RfY2hlY2tpbnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ5X2ZjW2ZjXSA9IGNoZWNraW5WYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGVudHJpZXMgb2YgY2hlY2staW4gdmFsdWVzIGJ5IGtleS5cbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFRoZSBlbnRyaWVzIG9mIGNoZWNrLWluIHZhbHVlcy5cbiAgICAgKi9cbiAgICBlbnRyaWVzKCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmVudHJpZXModGhpcy5ieV9rZXkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlcyBhIGZhc3QgY2hlY2staW4gdmFsdWUgZnJvbSB0aGUgZ2l2ZW4gYm9keSBzdHJpbmcuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHkgLSBUaGUgYm9keSBzdHJpbmcgdG8gcGFyc2UuXG4gICAgICogQHJldHVybnMge0NoZWNraW5WYWx1ZSB8IHVuZGVmaW5lZH0gVGhlIHBhcnNlZCBjaGVjay1pbiB2YWx1ZSBvciB1bmRlZmluZWQuXG4gICAgICovXG4gICAgcGFyc2VfZmFzdF9jaGVja2luKGJvZHk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5ieV9mY1tib2R5XTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZXMgYSBjaGVjay1pbiB2YWx1ZSBmcm9tIHRoZSBnaXZlbiBib2R5IHN0cmluZy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYm9keSAtIFRoZSBib2R5IHN0cmluZyB0byBwYXJzZS5cbiAgICAgKiBAcmV0dXJucyB7Q2hlY2tpblZhbHVlIHwgdW5kZWZpbmVkfSBUaGUgcGFyc2VkIGNoZWNrLWluIHZhbHVlIG9yIHVuZGVmaW5lZC5cbiAgICAgKi9cbiAgICBwYXJzZV9jaGVja2luKGJvZHk6IHN0cmluZykge1xuICAgICAgICBjb25zdCBjaGVja2luX2xvd2VyID0gYm9keS5yZXBsYWNlKC9cXHMrLywgXCJcIik7XG4gICAgICAgIHJldHVybiB0aGlzLmJ5X2x2W2NoZWNraW5fbG93ZXJdO1xuICAgIH1cbn1cblxuZXhwb3J0IHsgQ2hlY2tpblZhbHVlLCBDaGVja2luVmFsdWVzIH0iLCIvKipcbiAqIEVudW0gZm9yIGRpZmZlcmVudCB0eXBlcyBvZiBjb21wIHBhc3Nlcy5cbiAqIEBlbnVtIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBlbnVtIENvbXBQYXNzVHlwZSB7XG4gICAgQ29tcFBhc3MgPSBcImNvbXAtcGFzc1wiLFxuICAgIE1hbmFnZXJQYXNzID0gXCJtYW5hZ2VyLXBhc3NcIixcbn1cblxuLyoqXG4gKiBHZXQgdGhlIGRlc2NyaXB0aW9uIGZvciBhIGdpdmVuIGNvbXAgcGFzcyB0eXBlLlxuICogQHBhcmFtIHtDb21wUGFzc1R5cGV9IHR5cGUgLSBUaGUgdHlwZSBvZiB0aGUgY29tcCBwYXNzLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGRlc2NyaXB0aW9uIG9mIHRoZSBjb21wIHBhc3MgdHlwZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldF9jb21wX3Bhc3NfZGVzY3JpcHRpb24odHlwZTogQ29tcFBhc3NUeXBlKTogc3RyaW5nIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBDb21wUGFzc1R5cGUuQ29tcFBhc3M6XG4gICAgICAgICAgICByZXR1cm4gXCJDb21wIFBhc3NcIjtcbiAgICAgICAgY2FzZSBDb21wUGFzc1R5cGUuTWFuYWdlclBhc3M6XG4gICAgICAgICAgICByZXR1cm4gXCJNYW5hZ2VyIFBhc3NcIjtcbiAgICB9XG4gICAgcmV0dXJuIFwiXCI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBidWlsZF9wYXNzZXNfc3RyaW5nKFxuICAgIHVzZWQ6IG51bWJlcixcbiAgICB0b3RhbDogbnVtYmVyLFxuICAgIHRvZGF5OiBudW1iZXIsXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGZvcmNlX3RvZGF5OiBib29sZWFuID0gZmFsc2Vcbikge1xuICAgIGxldCBtZXNzYWdlID0gYFlvdSBoYXZlIHVzZWQgJHt1c2VkfSBvZiAke3RvdGFsfSAke3R5cGV9IHRoaXMgc2Vhc29uYDtcbiAgICBpZiAoZm9yY2VfdG9kYXkgfHwgdG9kYXkgPiAwKSB7XG4gICAgICAgIG1lc3NhZ2UgKz0gYCAoJHt0b2RheX0gdXNlZCB0b2RheSlgO1xuICAgIH1cbiAgICBtZXNzYWdlICs9IFwiLlwiO1xuICAgIHJldHVybiBtZXNzYWdlO1xufVxuIiwiLyoqXG4gKiBDb252ZXJ0IGFuIEV4Y2VsIGRhdGUgdG8gYSBKYXZhU2NyaXB0IERhdGUgb2JqZWN0LlxuICogQHBhcmFtIHtudW1iZXJ9IGRhdGUgLSBUaGUgRXhjZWwgZGF0ZS5cbiAqIEByZXR1cm5zIHtEYXRlfSBUaGUgSmF2YVNjcmlwdCBEYXRlIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gZXhjZWxfZGF0ZV90b19qc19kYXRlKGRhdGU6IG51bWJlcik6IERhdGUge1xuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBEYXRlKDApO1xuICAgIHJlc3VsdC5zZXRVVENNaWxsaXNlY29uZHMoTWF0aC5yb3VuZCgoZGF0ZSAtIDI1NTY5KSAqIDg2NDAwICogMTAwMCkpO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ2hhbmdlIHRoZSB0aW1lem9uZSBvZiBhIERhdGUgb2JqZWN0IHRvIFBTVC5cbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSAtIFRoZSBEYXRlIG9iamVjdC5cbiAqIEByZXR1cm5zIHtEYXRlfSBUaGUgRGF0ZSBvYmplY3Qgd2l0aCB0aGUgdGltZXpvbmUgc2V0IHRvIFBTVC5cbiAqL1xuZnVuY3Rpb24gY2hhbmdlX3RpbWV6b25lX3RvX3BzdChkYXRlOiBEYXRlKTogRGF0ZSB7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IERhdGUoZGF0ZS50b1VUQ1N0cmluZygpLnJlcGxhY2UoXCIgR01UXCIsIFwiIFBTVFwiKSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBTdHJpcCB0aGUgdGltZSBmcm9tIGEgRGF0ZSBvYmplY3QsIGtlZXBpbmcgb25seSB0aGUgZGF0ZS5cbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSAtIFRoZSBEYXRlIG9iamVjdC5cbiAqIEByZXR1cm5zIHtEYXRlfSBUaGUgRGF0ZSBvYmplY3Qgd2l0aCB0aGUgdGltZSBzdHJpcHBlZC5cbiAqL1xuZnVuY3Rpb24gc3RyaXBfZGF0ZXRpbWVfdG9fZGF0ZShkYXRlOiBEYXRlKTogRGF0ZSB7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IERhdGUoXG4gICAgICAgIGRhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKFwiZW4tVVNcIiwgeyB0aW1lWm9uZTogXCJBbWVyaWNhL0xvc19BbmdlbGVzXCIgfSlcbiAgICApO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogU2FuaXRpemUgYSBkYXRlIGJ5IGNvbnZlcnRpbmcgaXQgZnJvbSBhbiBFeGNlbCBkYXRlIGFuZCBzdHJpcHBpbmcgdGhlIHRpbWUuXG4gKiBAcGFyYW0ge251bWJlcn0gZGF0ZSAtIFRoZSBFeGNlbCBkYXRlLlxuICogQHJldHVybnMge0RhdGV9IFRoZSBzYW5pdGl6ZWQgRGF0ZSBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIHNhbml0aXplX2RhdGUoZGF0ZTogbnVtYmVyKTogRGF0ZSB7XG4gICAgY29uc3QgcmVzdWx0ID0gc3RyaXBfZGF0ZXRpbWVfdG9fZGF0ZShcbiAgICAgICAgY2hhbmdlX3RpbWV6b25lX3RvX3BzdChleGNlbF9kYXRlX3RvX2pzX2RhdGUoZGF0ZSkpXG4gICAgKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEZvcm1hdCBhIERhdGUgb2JqZWN0IGZvciB1c2UgaW4gYSBzcHJlYWRzaGVldCB2YWx1ZS5cbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSAtIFRoZSBEYXRlIG9iamVjdC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgZGF0ZSBzdHJpbmcgaW4gUFNUXG4gKi9cbmZ1bmN0aW9uIGZvcm1hdF9kYXRlX2Zvcl9zcHJlYWRzaGVldF92YWx1ZShkYXRlOiBEYXRlKTogc3RyaW5nIHtcbiAgICAgY29uc3QgZGF0ZXN0ciA9IGRhdGVcbiAgICAgICAgIC50b0xvY2FsZURhdGVTdHJpbmcoXCJlbi1VU1wiLCB7IHRpbWVab25lOiBcIkFtZXJpY2EvTG9zX0FuZ2VsZXNcIiB9KVxuICAgICAgICAuc3BsaXQoXCIvXCIpXG4gICAgICAgIC5tYXAoKHgpID0+IHgucGFkU3RhcnQoMiwgXCIwXCIpKVxuICAgICAgICAuam9pbihcIlwiKTtcbiAgICByZXR1cm4gZGF0ZXN0cjtcbn1cblxuLyoqXG4gKiBGaWx0ZXIgYSBsaXN0IHRvIGluY2x1ZGUgb25seSBpdGVtcyB0aGF0IGVuZCB3aXRoIGEgc3BlY2lmaWMgZGF0ZS5cbiAqIEBwYXJhbSB7YW55W119IGxpc3QgLSBUaGUgbGlzdCB0byBmaWx0ZXIuXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgLSBUaGUgZGF0ZSB0byBmaWx0ZXIgYnkuXG4gKiBAcmV0dXJucyB7YW55W119IFRoZSBmaWx0ZXJlZCBsaXN0LlxuICovXG5mdW5jdGlvbiBmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9kYXRlKGxpc3Q6IGFueVtdLCBkYXRlOiBEYXRlKTogYW55W10ge1xuICAgIGNvbnN0IGRhdGVzdHIgPSBmb3JtYXRfZGF0ZV9mb3Jfc3ByZWFkc2hlZXRfdmFsdWUoZGF0ZSk7XG4gICAgcmV0dXJuIGxpc3QubWFwKCh4KSA9PiB4Py50b1N0cmluZygpKS5maWx0ZXIoKHgpID0+IHg/LmVuZHNXaXRoKGRhdGVzdHIpKTtcbn1cblxuLyoqXG4gKiBGaWx0ZXIgYSBsaXN0IHRvIGluY2x1ZGUgb25seSBpdGVtcyB0aGF0IGVuZCB3aXRoIHRoZSBjdXJyZW50IGRhdGUuXG4gKiBAcGFyYW0ge2FueVtdfSBsaXN0IC0gVGhlIGxpc3QgdG8gZmlsdGVyLlxuICogQHJldHVybnMge2FueVtdfSBUaGUgZmlsdGVyZWQgbGlzdC5cbiAqL1xuZnVuY3Rpb24gZmlsdGVyX2xpc3RfdG9fZW5kc3dpdGhfY3VycmVudF9kYXkobGlzdDogYW55W10pOiBhbnlbXSB7XG4gICAgcmV0dXJuIGZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2RhdGUobGlzdCwgbmV3IERhdGUoKSk7XG59XG5cbmV4cG9ydCB7XG4gICAgc2FuaXRpemVfZGF0ZSxcbiAgICBleGNlbF9kYXRlX3RvX2pzX2RhdGUsXG4gICAgY2hhbmdlX3RpbWV6b25lX3RvX3BzdCxcbiAgICBzdHJpcF9kYXRldGltZV90b19kYXRlLFxuICAgIGZvcm1hdF9kYXRlX2Zvcl9zcHJlYWRzaGVldF92YWx1ZSxcbiAgICBmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9kYXRlLFxuICAgIGZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2N1cnJlbnRfZGF5LFxufTsiLCJpbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCAnQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlcyc7XG5cbi8qKlxuICogTG9hZCBjcmVkZW50aWFscyBmcm9tIGEgSlNPTiBmaWxlLlxuICogQHJldHVybnMge2FueX0gVGhlIHBhcnNlZCBjcmVkZW50aWFscyBmcm9tIHRoZSBKU09OIGZpbGUuXG4gKi9cbmZ1bmN0aW9uIGxvYWRfY3JlZGVudGlhbHNfZmlsZXMoKTogYW55IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShcbiAgICAgICAgZnNcbiAgICAgICAgICAgIC5yZWFkRmlsZVN5bmMoUnVudGltZS5nZXRBc3NldHMoKVtcIi9jcmVkZW50aWFscy5qc29uXCJdLnBhdGgpXG4gICAgICAgICAgICAudG9TdHJpbmcoKVxuICAgICk7XG59XG5cbi8qKlxuICogR2V0IHRoZSBwYXRoIHRvIHRoZSBzZXJ2aWNlIGNyZWRlbnRpYWxzIGZpbGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgcGF0aCB0byB0aGUgc2VydmljZSBjcmVkZW50aWFscyBmaWxlLlxuICovXG5mdW5jdGlvbiBnZXRfc2VydmljZV9jcmVkZW50aWFsc19wYXRoKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFJ1bnRpbWUuZ2V0QXNzZXRzKClbXCIvc2VydmljZS1jcmVkZW50aWFscy5qc29uXCJdLnBhdGg7XG59XG5cbmV4cG9ydCB7IGxvYWRfY3JlZGVudGlhbHNfZmlsZXMsIGdldF9zZXJ2aWNlX2NyZWRlbnRpYWxzX3BhdGggfTsiLCJpbXBvcnQgeyBzaGVldHNfdjQgfSBmcm9tIFwiZ29vZ2xlYXBpc1wiO1xuaW1wb3J0IHsgZXhjZWxfcm93X3RvX2luZGV4IH0gZnJvbSBcIi4vdXRpbFwiO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQgdGFiLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYiB7XG4gICAgc2hlZXRzX3NlcnZpY2U6IHNoZWV0c192NC5TaGVldHMgfCBudWxsO1xuICAgIHNoZWV0X2lkOiBzdHJpbmc7XG4gICAgc2hlZXRfbmFtZTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIuXG4gICAgICogQHBhcmFtIHtzaGVldHNfdjQuU2hlZXRzIHwgbnVsbH0gc2hlZXRzX3NlcnZpY2UgLSBUaGUgR29vZ2xlIFNoZWV0cyBBUEkgc2VydmljZSBpbnN0YW5jZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2hlZXRfaWQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNoZWV0X25hbWUgLSBUaGUgbmFtZSBvZiB0aGUgc2hlZXQgdGFiLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyB8IG51bGwsXG4gICAgICAgIHNoZWV0X2lkOiBzdHJpbmcsXG4gICAgICAgIHNoZWV0X25hbWU6IHN0cmluZ1xuICAgICkge1xuICAgICAgICB0aGlzLnNoZWV0c19zZXJ2aWNlID0gc2hlZXRzX3NlcnZpY2U7XG4gICAgICAgIHRoaXMuc2hlZXRfaWQgPSBzaGVldF9pZDtcbiAgICAgICAgdGhpcy5zaGVldF9uYW1lID0gc2hlZXRfbmFtZS5zcGxpdChcIiFcIilbMF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHZhbHVlcyBmcm9tIHRoZSBzaGVldC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bGx9IFtyYW5nZV0gLSBUaGUgcmFuZ2UgdG8gZ2V0IHZhbHVlcyBmcm9tLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueVtdW10gfCB1bmRlZmluZWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgdmFsdWVzIGZyb20gdGhlIHNoZWV0LlxuICAgICAqL1xuICAgIGFzeW5jIGdldF92YWx1ZXMocmFuZ2U/OiBzdHJpbmcgfCBudWxsKTogUHJvbWlzZTxhbnlbXVtdIHwgdW5kZWZpbmVkPiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2dldF92YWx1ZXMocmFuZ2UpO1xuICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGEudmFsdWVzID8/IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHJvdyBmb3IgYSBzcGVjaWZpYyBwYXRyb2xsZXIuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdHJvbGxlcl9uYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHBhdHJvbGxlci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZV9jb2x1bW4gLSBUaGUgY29sdW1uIHdoZXJlIHRoZSBwYXRyb2xsZXIncyBuYW1lIGlzIGxvY2F0ZWQuXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCBudWxsfSBbcmFuZ2VdIC0gVGhlIHJhbmdlIHRvIHNlYXJjaCB3aXRoaW4uXG4gICAgICogQHJldHVybnMge1Byb21pc2U8eyByb3c6IGFueVtdOyBpbmRleDogbnVtYmVyOyB9IHwgbnVsbD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSByb3cgYW5kIGluZGV4IG9mIHRoZSBwYXRyb2xsZXIsIG9yIG51bGwgaWYgbm90IGZvdW5kLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF9zaGVldF9yb3dfZm9yX3BhdHJvbGxlcihcbiAgICAgICAgcGF0cm9sbGVyX25hbWU6IHN0cmluZyxcbiAgICAgICAgbmFtZV9jb2x1bW46IHN0cmluZyxcbiAgICAgICAgcmFuZ2U/OiBzdHJpbmcgfCBudWxsXG4gICAgKTogUHJvbWlzZTx7IHJvdzogYW55W107IGluZGV4OiBudW1iZXI7IH0gfCBudWxsPiB7XG4gICAgICAgIGNvbnN0IHJvd3MgPSBhd2FpdCB0aGlzLmdldF92YWx1ZXMocmFuZ2UpO1xuICAgICAgICBpZiAocm93cykge1xuICAgICAgICAgICAgY29uc3QgbG9va3VwX2luZGV4ID0gZXhjZWxfcm93X3RvX2luZGV4KG5hbWVfY29sdW1uKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm93cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChyb3dzW2ldW2xvb2t1cF9pbmRleF0gPT09IHBhdHJvbGxlcl9uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHJvdzogcm93c1tpXSwgaW5kZXg6IGkgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgIGBDb3VsZG4ndCBmaW5kIHBhdHJvbGxlciAke3BhdHJvbGxlcl9uYW1lfSBpbiBzaGVldCAke3RoaXMuc2hlZXRfbmFtZX0uYFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdmFsdWVzIGluIHRoZSBzaGVldC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmFuZ2UgLSBUaGUgcmFuZ2UgdG8gdXBkYXRlLlxuICAgICAqIEBwYXJhbSB7YW55W11bXX0gdmFsdWVzIC0gVGhlIHZhbHVlcyB0byB1cGRhdGUuXG4gICAgICovXG4gICAgYXN5bmMgdXBkYXRlX3ZhbHVlcyhyYW5nZTogc3RyaW5nLCB2YWx1ZXM6IGFueVtdW10pIHtcbiAgICAgICAgY29uc3QgdXBkYXRlTWUgPSAoYXdhaXQgdGhpcy5fZ2V0X3ZhbHVlcyhyYW5nZSwgbnVsbCkpLmRhdGE7XG5cbiAgICAgICAgdXBkYXRlTWUudmFsdWVzID0gdmFsdWVzO1xuICAgICAgICBhd2FpdCB0aGlzLnNoZWV0c19zZXJ2aWNlIS5zcHJlYWRzaGVldHMudmFsdWVzLnVwZGF0ZSh7XG4gICAgICAgICAgICBzcHJlYWRzaGVldElkOiB0aGlzLnNoZWV0X2lkLFxuICAgICAgICAgICAgdmFsdWVJbnB1dE9wdGlvbjogXCJVU0VSX0VOVEVSRURcIixcbiAgICAgICAgICAgIHJhbmdlOiB1cGRhdGVNZS5yYW5nZSEsXG4gICAgICAgICAgICByZXF1ZXN0Qm9keTogdXBkYXRlTWUsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB2YWx1ZXMgZnJvbSB0aGUgc2hlZXQgKHByaXZhdGUgbWV0aG9kKS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bGx9IFtyYW5nZV0gLSBUaGUgcmFuZ2UgdG8gZ2V0IHZhbHVlcyBmcm9tLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbH0gW3ZhbHVlUmVuZGVyT3B0aW9uXSAtIFRoZSB2YWx1ZSByZW5kZXIgb3B0aW9uLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueVtdW10+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgdmFsdWUgcmFuZ2UuXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIGFzeW5jIF9nZXRfdmFsdWVzKFxuICAgICAgICByYW5nZT86IHN0cmluZyB8IG51bGwsXG4gICAgICAgIHZhbHVlUmVuZGVyT3B0aW9uOiBzdHJpbmcgfCBudWxsID0gXCJVTkZPUk1BVFRFRF9WQUxVRVwiXG4gICAgKSB7XG4gICAgICAgIGxldCBsb29rdXBSYW5nZSA9IHRoaXMuc2hlZXRfbmFtZTtcbiAgICAgICAgaWYgKHJhbmdlICE9IG51bGwpIHtcbiAgICAgICAgICAgIGxvb2t1cFJhbmdlID0gbG9va3VwUmFuZ2UgKyBcIiFcIjtcblxuICAgICAgICAgICAgaWYgKHJhbmdlLnN0YXJ0c1dpdGgobG9va3VwUmFuZ2UpKSB7XG4gICAgICAgICAgICAgICAgcmFuZ2UgPSByYW5nZS5zdWJzdHJpbmcobG9va3VwUmFuZ2UubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvb2t1cFJhbmdlID0gbG9va3VwUmFuZ2UgKyByYW5nZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgb3B0czogc2hlZXRzX3Y0LlBhcmFtcyRSZXNvdXJjZSRTcHJlYWRzaGVldHMkVmFsdWVzJEdldCA9IHtcbiAgICAgICAgICAgIHNwcmVhZHNoZWV0SWQ6IHRoaXMuc2hlZXRfaWQsXG4gICAgICAgICAgICByYW5nZTogbG9va3VwUmFuZ2UsXG4gICAgICAgIH07XG4gICAgICAgIGlmICh2YWx1ZVJlbmRlck9wdGlvbikge1xuICAgICAgICAgICAgb3B0cy52YWx1ZVJlbmRlck9wdGlvbiA9IHZhbHVlUmVuZGVyT3B0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuc2hlZXRzX3NlcnZpY2UhLnNwcmVhZHNoZWV0cy52YWx1ZXMuZ2V0KG9wdHMpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cbiIsIi8qKlxuICogVmFsaWRhdGVzIGlmIHRoZSBwcm92aWRlZCBzY29wZXMgaW5jbHVkZSBhbGwgZGVzaXJlZCBzY29wZXMuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBzY29wZXMgLSBUaGUgbGlzdCBvZiBzY29wZXMgdG8gdmFsaWRhdGUuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBkZXNpcmVkX3Njb3BlcyAtIFRoZSBsaXN0IG9mIGRlc2lyZWQgc2NvcGVzLlxuICogQHRocm93cyB7RXJyb3J9IFRocm93cyBhbiBlcnJvciBpZiBhbnkgZGVzaXJlZCBzY29wZSBpcyBtaXNzaW5nLlxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZV9zY29wZXMoc2NvcGVzOiBzdHJpbmdbXSwgZGVzaXJlZF9zY29wZXM6IHN0cmluZ1tdKSB7XG4gICAgZm9yIChjb25zdCBkZXNpcmVkX3Njb3BlIG9mIGRlc2lyZWRfc2NvcGVzKSB7XG4gICAgICAgIGlmIChzY29wZXMgPT09IHVuZGVmaW5lZCB8fCAhc2NvcGVzLmluY2x1ZGVzKGRlc2lyZWRfc2NvcGUpKSB7XG4gICAgICAgICAgICBjb25zdCBlcnJvciA9IGBNaXNzaW5nIHNjb3BlICR7ZGVzaXJlZF9zY29wZX0gaW4gcmVjZWl2ZWQgc2NvcGVzOiAke3Njb3Blc31gO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCB7dmFsaWRhdGVfc2NvcGVzfSIsImltcG9ydCB7IFNlY3Rpb25Db25maWcgfSBmcm9tICcuLi9lbnYvaGFuZGxlcl9jb25maWcnO1xuXG4vKipcbiAgICAqIENsYXNzIGZvciBzZWN0aW9uIHZhbHVlcy5cbiAgICAqL1xuY2xhc3MgU2VjdGlvblZhbHVlcyB7XG4gICAgc2VjdGlvbl9jb25maWc6IFNlY3Rpb25Db25maWdcbiAgICBzZWN0aW9uczogc3RyaW5nW107XG4gICAgbG93ZXJjYXNlX3NlY3Rpb25zOiBzdHJpbmdbXTtcblxuICAgIGNvbnN0cnVjdG9yKHNlY3Rpb25fY29uZmlnOiBTZWN0aW9uQ29uZmlnKSB7XG4gICAgICAgIHRoaXMuc2VjdGlvbl9jb25maWcgPSBzZWN0aW9uX2NvbmZpZztcbiAgICAgICAgdGhpcy5zZWN0aW9ucyA9IHNlY3Rpb25fY29uZmlnLlNFQ1RJT05fVkFMVUVTLnNwbGl0KCcsJyk7XG4gICAgICAgIHRoaXMubG93ZXJjYXNlX3NlY3Rpb25zID0gc2VjdGlvbl9jb25maWcuU0VDVElPTl9WQUxVRVMudG9Mb3dlckNhc2UoKS5zcGxpdCgnLCcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHNlY3Rpb24gZGVzY3JpcHRpb24uXG4gICAgICogQHJldHVybnMge3N0cmluZ30gVGhlIHNlY3Rpb24gZGVzY3JpcHRpb24uXG4gICAgKi9cbiAgICBnZXRfc2VjdGlvbl9kZXNjcmlwdGlvbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWN0aW9uX2NvbmZpZy5TRUNUSU9OX1ZBTFVFUztcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIFBhcnNlcyBhIHNlY3Rpb24uXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gYm9keSAtIFRoZSBib2R5IG9mIHRoZSByZXF1ZXN0LlxuICAgICogQHJldHVybnMge3N0cmluZyB8IG51bGx9IFRoZSBzZWN0aW9uIGlmIGl0IGlzIGEgdmFsaWQgc2VjdGlvbiBvciBudWxsLlxuICAgICovXG4gICAgcGFyc2Vfc2VjdGlvbihib2R5OiBzdHJpbmcgfCBudWxsKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgICAgIGlmIChib2R5ID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICAgcmV0dXJuIHRoaXMubG93ZXJjYXNlX3NlY3Rpb25zLmluY2x1ZGVzKGJvZHkudG9Mb3dlckNhc2UoKSkgPyBib2R5IDogbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIE1hcHMgYSBsb3dlciBjYXNlIHZlcnNpb24gb2YgYSBzZWN0aW9uIHN0cmluZyB0byB0aGUgb3JpZ2luYWwgY2FzZSB2YWx1ZS5cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWN0aW9uIC0gVGhlIGxvd2VyIGNhc2Ugc2VjdGlvbiBzdHJpbmcuXG4gICAgKiBAcmV0dXJucyB7c3RyaW5nIH0gVGhlIG9yaWdpbmFsIGNhc2UgdmFsdWUgaWYgZm91bmQsIG90aGVyd2lzZSBudWxsLlxuICAgICovXG4gICBtYXBfc2VjdGlvbihzZWN0aW9uOiBzdHJpbmcgfCBudWxsKTogc3RyaW5nICB7XG4gICAgICAgaWYgKHNlY3Rpb24gPT09IG51bGwpIHtcbiAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgfVxuICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5sb3dlcmNhc2Vfc2VjdGlvbnMuaW5kZXhPZihzZWN0aW9uLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VjdGlvbnNbaW5kZXhdO1xuICAgICAgIH1cbiAgICAgICByZXR1cm4gXCJcIjtcbiAgIH1cblxufVxuXG5leHBvcnQgeyBTZWN0aW9uVmFsdWVzIH07IiwiLyoqXG4gKiBDb252ZXJ0IHJvdyBhbmQgY29sdW1uIG51bWJlcnMgdG8gYW4gRXhjZWwtbGlrZSBpbmRleC5cbiAqIEBwYXJhbSB7bnVtYmVyfSByb3cgLSBUaGUgcm93IG51bWJlciAoMC1iYXNlZCkuXG4gKiBAcGFyYW0ge251bWJlcn0gY29sIC0gVGhlIGNvbHVtbiBudW1iZXIgKDAtYmFzZWQpLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIEV4Y2VsLWxpa2UgaW5kZXggKGUuZy4sIFwiQTFcIikuXG4gKi9cbmZ1bmN0aW9uIHJvd19jb2xfdG9fZXhjZWxfaW5kZXgocm93OiBudW1iZXIsIGNvbDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBsZXQgY29sU3RyaW5nID0gXCJcIjtcbiAgICBjb2wgKz0gMTtcbiAgICB3aGlsZSAoY29sID4gMCkge1xuICAgICAgICBjb2wgLT0gMTtcbiAgICAgICAgY29uc3QgbW9kdWxvID0gY29sICUgMjY7XG4gICAgICAgIGNvbnN0IGNvbExldHRlciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoJ0EnLmNoYXJDb2RlQXQoMCkgKyBtb2R1bG8pO1xuICAgICAgICBjb2xTdHJpbmcgPSBjb2xMZXR0ZXIgKyBjb2xTdHJpbmc7XG4gICAgICAgIGNvbCA9IE1hdGguZmxvb3IoY29sIC8gMjYpO1xuICAgIH1cbiAgICByZXR1cm4gY29sU3RyaW5nICsgKHJvdyArIDEpLnRvU3RyaW5nKCk7XG59XG5cbi8qKlxuICogU3BsaXQgYW4gRXhjZWwtbGlrZSBpbmRleCBpbnRvIHJvdyBhbmQgY29sdW1uIG51bWJlcnMuXG4gKiBAcGFyYW0ge3N0cmluZ30gZXhjZWxfaW5kZXggLSBUaGUgRXhjZWwtbGlrZSBpbmRleCAoZS5nLiwgXCJBMVwiKS5cbiAqIEByZXR1cm5zIHtbbnVtYmVyLCBudW1iZXJdfSBBbiBhcnJheSBjb250YWluaW5nIHRoZSByb3cgYW5kIGNvbHVtbiBudW1iZXJzICgwLWJhc2VkKS5cbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgaW5kZXggY2Fubm90IGJlIHBhcnNlZC5cbiAqL1xuZnVuY3Rpb24gc3BsaXRfdG9fcm93X2NvbChleGNlbF9pbmRleDogc3RyaW5nKTogW251bWJlciwgbnVtYmVyXSB7XG4gICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKFwiXihbQS1aYS16XSspKFswLTldKykkXCIpO1xuICAgIGNvbnN0IG1hdGNoID0gcmVnZXguZXhlYyhleGNlbF9pbmRleCk7XG4gICAgaWYgKG1hdGNoID09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIHBhcnNlIHN0cmluZyBmb3IgZXhjZWwgcG9zaXRpb24gc3BsaXRcIik7XG4gICAgfVxuICAgIGNvbnN0IGNvbCA9IGV4Y2VsX3Jvd190b19pbmRleChtYXRjaFsxXSk7XG4gICAgY29uc3QgcmF3X3JvdyA9IE51bWJlcihtYXRjaFsyXSk7XG4gICAgaWYgKHJhd19yb3cgPCAxKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlJvdyBtdXN0IGJlID49MVwiKTtcbiAgICB9XG4gICAgcmV0dXJuIFtyYXdfcm93IC0gMSwgY29sXTtcbn1cblxuLyoqXG4gKiBMb29rIHVwIGEgdmFsdWUgaW4gYSBzaGVldCBieSBpdHMgRXhjZWwtbGlrZSBpbmRleC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBleGNlbF9pbmRleCAtIFRoZSBFeGNlbC1saWtlIGluZGV4IChlLmcuLCBcIkExXCIpLlxuICogQHBhcmFtIHthbnlbXVtdfSBzaGVldCAtIFRoZSBzaGVldCBkYXRhLlxuICogQHJldHVybnMge2FueX0gVGhlIHZhbHVlIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXgsIG9yIHVuZGVmaW5lZCBpZiBub3QgZm91bmQuXG4gKi9cbmZ1bmN0aW9uIGxvb2t1cF9yb3dfY29sX2luX3NoZWV0KGV4Y2VsX2luZGV4OiBzdHJpbmcsIHNoZWV0OiBhbnlbXVtdKTogYW55IHtcbiAgICBjb25zdCBbcm93LCBjb2xdID0gc3BsaXRfdG9fcm93X2NvbChleGNlbF9pbmRleCk7XG4gICAgaWYgKHJvdyA+PSBzaGVldC5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIHNoZWV0W3Jvd11bY29sXTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0IEV4Y2VsLWxpa2UgY29sdW1uIGxldHRlcnMgdG8gYSBjb2x1bW4gbnVtYmVyLlxuICogQHBhcmFtIHtzdHJpbmd9IGxldHRlcnMgLSBUaGUgY29sdW1uIGxldHRlcnMgKGUuZy4sIFwiQVwiKS5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBjb2x1bW4gbnVtYmVyICgwLWJhc2VkKS5cbiAqL1xuZnVuY3Rpb24gZXhjZWxfcm93X3RvX2luZGV4KGxldHRlcnM6IHN0cmluZyk6IG51bWJlciB7XG4gICAgY29uc3QgbG93ZXJMZXR0ZXJzID0gbGV0dGVycy50b0xvd2VyQ2FzZSgpO1xuICAgIGxldCByZXN1bHQ6IG51bWJlciA9IDA7XG4gICAgZm9yICh2YXIgcCA9IDA7IHAgPCBsb3dlckxldHRlcnMubGVuZ3RoOyBwKyspIHtcbiAgICAgICAgY29uc3QgY2hhcmFjdGVyVmFsdWUgPVxuICAgICAgICAgICAgbG93ZXJMZXR0ZXJzLmNoYXJDb2RlQXQocCkgLSBcImFcIi5jaGFyQ29kZUF0KDApICsgMTtcbiAgICAgICAgcmVzdWx0ID0gY2hhcmFjdGVyVmFsdWUgKyByZXN1bHQgKiAyNjtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdCAtIDE7XG59XG5cbi8qKlxuICogU2FuaXRpemUgYSBwaG9uZSBudW1iZXIgYnkgcmVtb3ZpbmcgdW53YW50ZWQgY2hhcmFjdGVycy5cbiAqIEBwYXJhbSB7bnVtYmVyIHwgc3RyaW5nfSBudW1iZXIgLSBUaGUgcGhvbmUgbnVtYmVyIHRvIHNhbml0aXplLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIHNhbml0aXplZCBwaG9uZSBudW1iZXIuXG4gKi9cbmZ1bmN0aW9uIHNhbml0aXplX3Bob25lX251bWJlcihudW1iZXI6IG51bWJlciB8IHN0cmluZyk6IHN0cmluZyB7XG4gICAgbGV0IG5ld19udW1iZXIgPSBudW1iZXIudG9TdHJpbmcoKTtcbiAgICBuZXdfbnVtYmVyID0gbmV3X251bWJlci5yZXBsYWNlKFwid2hhdHNhcHA6XCIsIFwiXCIpO1xuICAgIGxldCB0ZW1wb3JhcnlfbmV3X251bWJlcjogc3RyaW5nID0gXCJcIjtcbiAgICB3aGlsZSAodGVtcG9yYXJ5X25ld19udW1iZXIgIT0gbmV3X251bWJlcikge1xuICAgICAgICAvLyBEbyB0aGlzIG11bHRpcGxlIHRpbWVzIHNvIHdlIGdldCBhbGwgKzEgYXQgdGhlIHN0YXJ0IG9mIHRoZSBzdHJpbmcsIGV2ZW4gYWZ0ZXIgc3RyaXBwaW5nLlxuICAgICAgICB0ZW1wb3JhcnlfbmV3X251bWJlciA9IG5ld19udW1iZXI7XG4gICAgICAgIG5ld19udW1iZXIgPSBuZXdfbnVtYmVyLnJlcGxhY2UoLyheXFwrMXxcXCh8XFwpfFxcLnwtKS9nLCBcIlwiKTtcbiAgICB9XG4gICAgY29uc3QgcmVzdWx0ID0gU3RyaW5nKHBhcnNlSW50KG5ld19udW1iZXIpKS5wYWRTdGFydCgxMCwgXCIwXCIpO1xuICAgIGlmIChyZXN1bHQubGVuZ3RoID09IDExICYmIHJlc3VsdFswXSA9PSBcIjFcIikge1xuICAgICAgICByZXR1cm4gcmVzdWx0LnN1YnN0cmluZygxKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IHtcbiAgICByb3dfY29sX3RvX2V4Y2VsX2luZGV4LFxuICAgIGV4Y2VsX3Jvd190b19pbmRleCxcbiAgICBzYW5pdGl6ZV9waG9uZV9udW1iZXIsXG4gICAgc3BsaXRfdG9fcm93X2NvbCxcbiAgICBsb29rdXBfcm93X2NvbF9pbl9zaGVldCxcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImdvb2dsZWFwaXNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic21zLXNlZ21lbnRzLWNhbGN1bGF0b3JcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaGFuZGxlcnMvaGFuZGxlci5wcm90ZWN0ZWQudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=