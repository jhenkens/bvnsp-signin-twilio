/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@twilio-labs/serverless-runtime-types/index.js"
/*!*********************************************************************!*\
  !*** ./node_modules/@twilio-labs/serverless-runtime-types/index.js ***!
  \*********************************************************************/
() {

// Intentionally left empty


/***/ },

/***/ "./src/env/handler_config.ts"
/*!***********************************!*\
  !*** ./src/env/handler_config.ts ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CONFIG: () => (/* binding */ CONFIG)
/* harmony export */ });
/* harmony import */ var _utils_checkin_values__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/checkin_values */ "./src/utils/checkin_values.ts");

const user_creds_config = {
    NSP_EMAIL_DOMAIN: "farwest.org"
};
const find_patroller_config = {
    SHEET_ID: "test",
    PHONE_NUMBER_LOOKUP_SHEET: "Phone Numbers!A2:B100",
    PHONE_NUMBER_NAME_COLUMN: "A",
    PHONE_NUMBER_NUMBER_COLUMN: "B"
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
    CHECKIN_DROPDOWN_COLUMN: "I"
};
const season_sheet_config = {
    SHEET_ID: "test",
    SEASON_SHEET: "Season",
    SEASON_SHEET_NAME_COLUMN: "B",
    SEASON_SHEET_DAYS_COLUMN: "A"
};
const section_config = {
    SECTION_VALUES: "1,2,3,4,Roving,FAR,Training"
};
const guest_passes_config = {
    SHEET_ID: "test",
    GUEST_PASS_SHEET: "Comps",
    GUEST_PASS_SHEET_NAME_COLUMN: "A",
    GUEST_PASS_SHEET_DATES_AVAILABLE_COLUMN: "D",
    GUEST_PASS_SHEET_USED_TODAY_COLUMN: "E",
    GUEST_PASS_SHEET_USED_SEASON_COLUMN: "F",
    GUEST_PASS_SHEET_DATES_STARTING_COLUMN: "G"
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
        new _utils_checkin_values__WEBPACK_IMPORTED_MODULE_0__.CheckinValue("day", "All Day", "all day/DAY", [
            "checkin-day"
        ]),
        new _utils_checkin_values__WEBPACK_IMPORTED_MODULE_0__.CheckinValue("am", "Half AM", "morning/AM", [
            "checkin-am"
        ]),
        new _utils_checkin_values__WEBPACK_IMPORTED_MODULE_0__.CheckinValue("pm", "Half PM", "afternoon/PM", [
            "checkin-pm"
        ]),
        new _utils_checkin_values__WEBPACK_IMPORTED_MODULE_0__.CheckinValue("out", "Checked Out", "check out/OUT", [
            "checkout",
            "check-out"
        ])
    ]
};
const CONFIG = {
    ...handler_config,
    ...find_patroller_config,
    ...login_sheet_config,
    ...guest_passes_config,
    ...season_sheet_config,
    ...user_creds_config,
    ...section_config
};



/***/ },

/***/ "./src/handlers/bvnsp_handler.ts"
/*!***************************************!*\
  !*** ./src/handlers/bvnsp_handler.ts ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MESSAGE_PREFIX_SUFFIX: () => (/* binding */ MESSAGE_PREFIX_SUFFIX),
/* harmony export */   MESSAGE_PREFIX_TEMPLATE: () => (/* binding */ MESSAGE_PREFIX_TEMPLATE),
/* harmony export */   NEXT_STEPS: () => (/* binding */ NEXT_STEPS),
/* harmony export */   SMS_MAX_LENGTH: () => (/* binding */ SMS_MAX_LENGTH),
/* harmony export */   "default": () => (/* binding */ BVNSPHandler),
/* harmony export */   format_phone_for_display: () => (/* binding */ format_phone_for_display),
/* harmony export */   validate_sms_message: () => (/* binding */ validate_sms_message)
/* harmony export */ });
/* harmony import */ var _twilio_labs_serverless_runtime_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @twilio-labs/serverless-runtime-types */ "./node_modules/@twilio-labs/serverless-runtime-types/index.js");
/* harmony import */ var _twilio_labs_serverless_runtime_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_twilio_labs_serverless_runtime_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var googleapis__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! googleapis */ "googleapis");
/* harmony import */ var googleapis__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(googleapis__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _env_handler_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../env/handler_config */ "./src/env/handler_config.ts");
/* harmony import */ var _sheets_login_sheet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../sheets/login_sheet */ "./src/sheets/login_sheet.ts");
/* harmony import */ var _sheets_season_sheet__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../sheets/season_sheet */ "./src/sheets/season_sheet.ts");
/* harmony import */ var _user_creds__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../user-creds */ "./src/user-creds.ts");
/* harmony import */ var _utils_checkin_values__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/checkin_values */ "./src/utils/checkin_values.ts");
/* harmony import */ var _utils_file_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/file_utils */ "./src/utils/file_utils.ts");
/* harmony import */ var _utils_util__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/util */ "./src/utils/util.ts");
/* harmony import */ var _utils_guest_passes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/guest_passes */ "./src/utils/guest_passes.ts");
/* harmony import */ var _sheets_guest_pass_sheet__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../sheets/guest_pass_sheet */ "./src/sheets/guest_pass_sheet.ts");
/* harmony import */ var _utils_section_values__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../utils/section_values */ "./src/utils/section_values.ts");












const NEXT_STEPS = {
    AWAIT_COMMAND: "await-command",
    AWAIT_CHECKIN: "await-checkin",
    CONFIRM_RESET: "confirm-reset",
    AUTH_RESET: "auth-reset",
    AWAIT_SECTION: "await-section",
    AWAIT_PASS: "await-pass",
    AWAIT_MESSAGE: "await-message",
    AWAIT_BROADCAST: "await-broadcast"
};
const COMMANDS = {
    ON_DUTY: [
        "onduty",
        "on-duty"
    ],
    STATUS: [
        "status"
    ],
    CHECKIN: [
        "checkin",
        "check-in"
    ],
    SECTION_ASSIGNMENT: [
        "section",
        "section-assignment",
        "sectionassignment",
        "assignment"
    ],
    GUEST_PASS: [
        "guest-pass",
        "guestpass",
        "guest"
    ],
    WHATSAPP: [
        "whatsapp"
    ],
    MESSAGE: [
        "message",
        "msg"
    ],
    BROADCAST: [
        "broadcast"
    ]
};
const SMS_MAX_LENGTH = 160;
const MESSAGE_PREFIX_TEMPLATE = "Message from ";
const MESSAGE_PREFIX_SUFFIX = ": ";
/**
 * Validates that a complete SMS message (prefix + body) uses only GSM-7 characters
 * and fits within a single SMS segment.
 *
 * Uses the sms-segments-calculator library (maintained by TwilioDevEd) which
 * provides authoritative GSM-7 character detection.
 *
 * @param {string} full_message - The complete message to validate (prefix + user text).
 * @returns {SmsValidationResult} The validation result.
 */ function validate_sms_message(full_message) {
    const { SegmentedMessage } = __webpack_require__(/*! sms-segments-calculator */ "sms-segments-calculator");
    const segmented = new SegmentedMessage(full_message);
    const non_gsm = segmented.getNonGsmCharacters();
    if (non_gsm.length > 0) {
        return {
            valid: false,
            reason: "non_gsm7",
            non_gsm_characters: [
                ...new Set(non_gsm)
            ]
        };
    }
    if (segmented.segmentsCount > 1) {
        return {
            valid: false,
            reason: "too_many_segments",
            segments_count: segmented.segmentsCount
        };
    }
    return {
        valid: true
    };
}
/**
 * Formats a 10-digit phone number string as (XXX)XXX-XXXX for display.
 * @param {string} ten_digits - A 10-digit phone number string (e.g. "1234567890").
 * @returns {string} The formatted phone number (e.g. "(123)456-7890").
 */ function format_phone_for_display(ten_digits) {
    return `(${ten_digits.substring(0, 3)})${ten_digits.substring(3, 6)}-${ten_digits.substring(6, 10)}`;
}
class BVNSPHandler {
    SCOPES = [
        "https://www.googleapis.com/auth/spreadsheets"
    ];
    sms_request;
    result_messages = [];
    from;
    to;
    body;
    body_raw;
    patroller;
    bvnsp_next_step;
    checkin_mode = null;
    fast_checkin = false;
    assigned_section = null;
    twilio_client = null;
    sync_sid;
    reset_script_id;
    // Cache clients
    sync_client = null;
    user_creds = null;
    service_creds = null;
    sheets_service = null;
    user_scripts_service = null;
    login_sheet = null;
    season_sheet = null;
    guest_pass_sheet = null;
    checkin_values;
    current_sheet_date;
    combined_config;
    config;
    section_values;
    /**
     * Constructs a new BVNSPHandler.
     * @param {Context<HandlerEnvironment>} context - The serverless function context.
     * @param {ServerlessEventObject<BVNSPEvent>} event - The event object.
     */ constructor(context, event){
        // Determine message details from the incoming event, with fallback values
        this.sms_request = (event.From || event.number) !== undefined;
        this.from = event.From || event.number || event.test_number;
        this.to = (0,_utils_util__WEBPACK_IMPORTED_MODULE_8__.sanitize_phone_number)(event.To);
        this.body = event.Body?.toLowerCase()?.trim().replace(/\s+/, "-");
        this.body_raw = event.Body;
        this.bvnsp_next_step = event.request.cookies.bvnsp_next_step;
        this.combined_config = {
            ..._env_handler_config__WEBPACK_IMPORTED_MODULE_2__.CONFIG,
            ...context
        };
        this.config = this.combined_config;
        try {
            this.twilio_client = context.getTwilioClient();
        } catch (e) {
            console.log("Error initializing twilio_client", e);
        }
        this.sync_sid = context.SYNC_SID;
        this.reset_script_id = context.SCRIPT_ID;
        this.patroller = null;
        this.checkin_values = new _utils_checkin_values__WEBPACK_IMPORTED_MODULE_6__.CheckinValues(_env_handler_config__WEBPACK_IMPORTED_MODULE_2__.CONFIG.CHECKIN_VALUES);
        this.current_sheet_date = new Date();
        this.section_values = new _utils_section_values__WEBPACK_IMPORTED_MODULE_11__.SectionValues(this.combined_config);
    }
    /**
     * Parses the fast check-in mode from the message body.
     * @param {string} body - The message body.
     * @returns {boolean} True if fast check-in mode is parsed, otherwise false.
     */ parse_fast_checkin_mode(body) {
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
     */ parse_checkin(body) {
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
     */ parse_checkin_from_next_step() {
        const last_segment = this.bvnsp_next_step?.split("-").slice(-1)[0];
        if (last_segment && last_segment in this.checkin_values.by_key) {
            this.checkin_mode = last_segment;
            return true;
        }
        return false;
    }
    /**
     * Delays the execution for a specified number of seconds.
     * @param {number} seconds - The number of seconds to delay.
     * @param {boolean} [optional=false] - Whether the delay is optional.
     * @returns {Promise<void>} A promise that resolves after the delay.
     */ delay(seconds, optional = false) {
        if (optional && !this.sms_request) {
            seconds = 1 / 1000.0;
        }
        return new Promise((res)=>{
            setTimeout(res, seconds);
        });
    }
    /**
     * Sends a message to the user.
     * @param {string} message - The message to send.
     * @returns {Promise<void>} A promise that resolves when the message is sent.
     */ async send_message(message) {
        if (this.sms_request) {
            await this.get_twilio_client().messages.create({
                to: this.from,
                from: this.to,
                body: message
            });
        } else {
            this.result_messages.push(message);
        }
    }
    /**
     * Handles the check-in process.
     * @returns {Promise<BVNSPResponse>} A promise that resolves with the check-in response.
     */ async handle() {
        const result = await this._handle();
        if (!this.sms_request) {
            if (result?.response) {
                this.result_messages.push(result.response);
            }
            return {
                response: this.result_messages.join("\n###\n"),
                next_step: result?.next_step
            };
        }
        return result;
    }
    /**
     * Internal method to handle the check-in process.
     * @returns {Promise<BVNSPResponse>} A promise that resolves with the check-in response.
     */ async _handle() {
        console.log(`Received request from ${this.from} with body: ${this.body} and state ${this.bvnsp_next_step}`);
        if (this.body == "logout") {
            console.log(`Performing logout`);
            return await this.logout();
        }
        let response;
        if (!this.config.USE_SERVICE_ACCOUNT) {
            response = await this.check_user_creds();
            if (response) return response;
        }
        if (this.body?.toLowerCase() === "restart") {
            return {
                response: "Okay. Text me again to start over..."
            };
        }
        response = await this.get_mapped_patroller();
        if (response || this.patroller == null) {
            return response || {
                response: "Unexpected error looking up patroller mapping"
            };
        }
        if ((!this.bvnsp_next_step || this.bvnsp_next_step == NEXT_STEPS.AWAIT_COMMAND) && this.body) {
            const await_response = await this.handle_await_command();
            if (await_response) {
                return await_response;
            }
        } else if (this.bvnsp_next_step == NEXT_STEPS.AWAIT_CHECKIN && this.body) {
            if (this.parse_checkin(this.body)) {
                return await this.checkin();
            }
        } else if (this.bvnsp_next_step?.startsWith(NEXT_STEPS.CONFIRM_RESET) && this.body) {
            if (this.body == "yes" && this.parse_checkin_from_next_step()) {
                console.log(`Performing reset_sheet_flow for ${this.patroller.name} with checkin mode: ${this.checkin_mode}`);
                return await this.reset_sheet_flow() || await this.checkin();
            }
        } else if (this.bvnsp_next_step?.startsWith(NEXT_STEPS.AUTH_RESET)) {
            if (this.parse_checkin_from_next_step()) {
                console.log(`Performing reset_sheet_flow-post-auth for ${this.patroller.name} with checkin mode: ${this.checkin_mode}`);
                return await this.reset_sheet_flow() || await this.checkin();
            }
        } else if (this.bvnsp_next_step?.startsWith(NEXT_STEPS.AWAIT_PASS) && this.body_raw) {
            const guest_name = this.body_raw;
            if (guest_name.trim() !== "") {
                return await this.prompt_guest_pass(guest_name);
            }
        } else if (this.bvnsp_next_step?.startsWith(NEXT_STEPS.AWAIT_SECTION) && this.body) {
            const section = this.section_values.parse_section(this.body);
            if (section) {
                return await this.assign_section(section);
            }
            return await this.prompt_section_assignment();
        } else if (this.bvnsp_next_step === NEXT_STEPS.AWAIT_MESSAGE && this.body_raw) {
            return await this.send_text_message(this.body_raw);
        } else if (this.bvnsp_next_step === NEXT_STEPS.AWAIT_BROADCAST && this.body_raw) {
            return await this.send_broadcast_message(this.body_raw);
        }
        if (this.bvnsp_next_step) {
            await this.send_message("Sorry, I didn't understand that.");
        }
        return this.prompt_command();
    }
    /**
     * Handles the await command step.
     * @returns {Promise<BVNSPResponse | undefined>} A promise that resolves with the response or undefined.
     */ async handle_await_command() {
        const patroller_name = this.patroller.name;
        if (this.parse_fast_checkin_mode(this.body)) {
            console.log(`Performing fast checkin for ${patroller_name} with mode: ${this.checkin_mode}`);
            return await this.checkin();
        }
        if (COMMANDS.ON_DUTY.includes(this.body)) {
            console.log(`Performing get_on_duty for ${patroller_name}`);
            return {
                response: await this.get_on_duty()
            };
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
        if (COMMANDS.GUEST_PASS.includes(this.body)) {
            console.log(`Performing guest_pass for ${patroller_name}`);
            return await this.prompt_guest_pass(null);
        }
        if (this.parse_fast_section_assignment(this.body)) {
            console.log(`Performing fast section_assignment for ${patroller_name} to ${this.assigned_section}`);
            return await this.assign_section(this.assigned_section);
        }
        if (COMMANDS.SECTION_ASSIGNMENT.includes(this.body)) {
            console.log(`Performing section_assignment for ${patroller_name}`);
            return await this.prompt_section_assignment();
        }
        if (COMMANDS.WHATSAPP.includes(this.body)) {
            return {
                response: `I'm available on whatsapp as well! Whatsapp uses Wifi/Cell Data instead of SMS, and can be more reliable. Message me at https://wa.me/1${this.to}`
            };
        }
        if (COMMANDS.MESSAGE.includes(this.body)) {
            console.log(`Performing message for ${patroller_name}`);
            return await this.prompt_message();
        }
        if (COMMANDS.BROADCAST.includes(this.body)) {
            console.log(`Performing broadcast for ${patroller_name}`);
            return await this.prompt_broadcast();
        }
    }
    /**
     * Prompts the user for a command.
     * @returns {BVNSPResponse} The response prompting the user for a command.
     */ prompt_command() {
        return {
            response: `${this.patroller.name}, I'm the BVNSP Bot.
Enter a command:
Check in / Check out / Status / On Duty / Section Assignment / Guest Pass / Message / Whatsapp
Send 'restart' at any time to begin again`,
            next_step: NEXT_STEPS.AWAIT_COMMAND
        };
    }
    /**
     * Prompts the user for a check-in.
     * @returns {BVNSPResponse} The response prompting the user for a check-in.
     */ prompt_checkin() {
        const types = Object.values(this.checkin_values.by_key).map((x)=>x.sms_desc);
        return {
            response: `${this.patroller.name}, update patrolling status to: ${types.slice(0, -1).join(", ")}, or ${types.slice(-1)}?`,
            next_step: NEXT_STEPS.AWAIT_CHECKIN
        };
    }
    /**
    * Parses the fast section assignment from the message body.
    * @param {string} body - The message body.
    * @returns {boolean} True if the section assignment is parsed, otherwise false.
    */ parse_fast_section_assignment(body) {
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
     * @returns {Promise<BVNSPResponse>} A promise that resolves with the response.
     */ async prompt_section_assignment() {
        if (!this.patroller || !this.patroller.checkin) {
            return {
                response: `${this.patroller.name} is not checked in.`
            };
        }
        const section_description = this.section_values.get_section_description();
        return {
            response: `Enter your assigned section; one of ${section_description} (or 'restart')`,
            next_step: NEXT_STEPS.AWAIT_SECTION
        };
    }
    /**
     * Builds the message prefix for a text message from a patroller.
     * Includes the sender's name and formatted phone number.
     * @param {string} sender_name - The name of the patroller sending the message.
     * @param {string} sender_phone - The sender's 10-digit phone number.
     * @returns {string} The message prefix (e.g., "Message from John Doe (123)456-7890: ").
     */ get_message_prefix(sender_name, sender_phone) {
        const formatted_phone = format_phone_for_display(sender_phone);
        return `${MESSAGE_PREFIX_TEMPLATE}${sender_name} ${formatted_phone}${MESSAGE_PREFIX_SUFFIX}`;
    }
    /**
     * Calculates the maximum allowed message length for a text message.
     * @param {string} sender_name - The name of the patroller sending the message.
     * @param {string} sender_phone - The sender's 10-digit phone number.
     * @returns {number} The maximum number of characters the user's message can contain.
     */ get_max_message_length(sender_name, sender_phone) {
        return SMS_MAX_LENGTH - this.get_message_prefix(sender_name, sender_phone).length;
    }
    /**
     * Prompts the user to type their text message.
     * Any patroller with a valid phone number can send a message, regardless
     * of their own check-in status.  The recipient list includes all
     * patrollers who have any check-in status (All Day, Half AM, Half PM,
     * or Checked Out), including the sender themselves if they are checked in.
     * @returns {Promise<BVNSPResponse>} A promise that resolves with the prompt response.
     */ async prompt_message() {
        const login_sheet = await this.get_login_sheet();
        const recipients = login_sheet.get_on_duty_patrollers();
        if (recipients.length === 0) {
            return {
                response: `No patrollers are currently logged in. There is nobody to send a message to.`
            };
        }
        const sender_phone = (0,_utils_util__WEBPACK_IMPORTED_MODULE_8__.sanitize_phone_number)(this.from);
        const max_length = this.get_max_message_length(this.patroller.name, sender_phone);
        if (max_length <= 0) {
            return {
                response: `Your name is too long to send a text message.`
            };
        }
        return {
            response: `Please type a message of no more than ${max_length} plain-text characters to ${recipients.length} patroller${recipients.length !== 1 ? "s" : ""}, or 'restart' to cancel.`,
            next_step: NEXT_STEPS.AWAIT_MESSAGE
        };
    }
    /**
     * Sends a text message to all patrollers with a check-in status for the day.
     * The sender also receives the message if they have a check-in status.
     * Validates that the complete message (prefix + body) uses only GSM-7
     * characters and fits within a single SMS segment, using the
     * sms-segments-calculator library.
     * @param {string} message_text - The raw message text from the sender.
     * @returns {Promise<BVNSPResponse>} A promise that resolves with the send result.
     */ async send_text_message(message_text) {
        const sender_name = this.patroller.name;
        const sender_phone = (0,_utils_util__WEBPACK_IMPORTED_MODULE_8__.sanitize_phone_number)(this.from);
        const prefix = this.get_message_prefix(sender_name, sender_phone);
        const max_length = this.get_max_message_length(sender_name, sender_phone);
        const full_message = prefix + message_text;
        const validation = validate_sms_message(full_message);
        if (!validation.valid) {
            if (validation.reason === "non_gsm7") {
                const bad_chars = validation.non_gsm_characters.join(" ");
                return {
                    response: `Your message contains characters that are not supported in plain-text SMS: ${bad_chars}. Please use only standard characters and try again.`,
                    next_step: NEXT_STEPS.AWAIT_MESSAGE
                };
            }
            return {
                response: `Your message is ${message_text.length} characters, which exceeds the limit of ${max_length}. Please shorten your message and try again, or type 'restart' to cancel.`,
                next_step: NEXT_STEPS.AWAIT_MESSAGE
            };
        }
        const login_sheet = await this.get_login_sheet();
        const signed_in_patrollers = login_sheet.get_on_duty_patrollers();
        const phone_map = await this.get_phone_number_map();
        // Build recipient map for on-duty patrollers with known phones; track missing
        const recipient_map = {};
        const no_phone_names = [];
        for (const patroller of signed_in_patrollers){
            const phone = phone_map[patroller.name];
            if (phone) {
                recipient_map[patroller.name] = phone;
            } else {
                no_phone_names.push(patroller.name);
            }
        }
        const { sent_count, copy_sent_to_sender, failed_names } = await this.deliver_sms_to_map(recipient_map, full_message, sender_name);
        await this.log_action(`text_message(${sent_count + (copy_sent_to_sender ? 1 : 0)})`);
        let response = `Message sent to ${sent_count} patroller${sent_count !== 1 ? "s" : ""}`;
        if (copy_sent_to_sender) {
            response += ` and a copy to you.`;
        } else {
            response += `.`;
        }
        const all_failed = [
            ...no_phone_names,
            ...failed_names
        ];
        if (all_failed.length > 0) {
            response += ` Could not send to: ${all_failed.join(", ")}.`;
        }
        return {
            response
        };
    }
    /**
     * Core SMS delivery loop. Sends full_message to each entry in recipient_map
     * (name → "+1XXXXXXXXXX"). If the sender's phone is not among the recipients,
     * a copy is sent to this.from. Returns delivery accounting data.
     * @param {Record<string, string>} recipient_map - Map of patroller name to "+1XXXXXXXXXX" phone.
     * @param {string} full_message - The complete formatted SMS to send.
     * @param {string} sender_name - The sender's name (used for failure logging).
     * @returns {Promise<object>} Delivery counts and failure list.
     */ async deliver_sms_to_map(recipient_map, full_message, sender_name) {
        let sent_count = 0;
        const failed_names = [];
        for (const [name, phone] of Object.entries(recipient_map)){
            try {
                await this.get_twilio_client().messages.create({
                    to: phone,
                    from: this.to,
                    body: full_message
                });
                sent_count++;
            } catch (e) {
                console.log(`Failed to send SMS to ${name}: ${e}`);
                failed_names.push(name);
            }
        }
        // Send a copy to the sender if their number is not already in the recipient map
        const normalized_sender = `+1${(0,_utils_util__WEBPACK_IMPORTED_MODULE_8__.sanitize_phone_number)(this.from)}`;
        const sender_in_map = Object.values(recipient_map).includes(normalized_sender);
        let copy_sent_to_sender = false;
        if (!sender_in_map) {
            try {
                await this.get_twilio_client().messages.create({
                    to: this.from,
                    from: this.to,
                    body: full_message
                });
                copy_sent_to_sender = true;
            } catch (e) {
                console.log(`Failed to send SMS copy to sender ${sender_name}: ${e}`);
                failed_names.push(sender_name);
            }
        }
        return {
            sent_count,
            copy_sent_to_sender,
            failed_names
        };
    }
    /**
     * Prompts the user to type a broadcast message to all patrollers.
     * Unlike the message command (which targets only logged-in patrollers), broadcast
     * sends to every patroller in the Phone Numbers sheet.
     * @returns {Promise<BVNSPResponse>} A promise that resolves with the prompt response.
     */ async prompt_broadcast() {
        const phone_map = await this.get_phone_number_map();
        const recipient_count = Object.keys(phone_map).length;
        if (recipient_count === 0) {
            return {
                response: `No patrollers with phone numbers found. There is nobody to broadcast to.`
            };
        }
        const sender_phone = (0,_utils_util__WEBPACK_IMPORTED_MODULE_8__.sanitize_phone_number)(this.from);
        const max_length = this.get_max_message_length(this.patroller.name, sender_phone);
        if (max_length <= 0) {
            return {
                response: `Your name is too long to send a broadcast message.`
            };
        }
        return {
            response: `Please type a broadcast message of no more than ${max_length} plain-text characters to ${recipient_count} patroller${recipient_count !== 1 ? "s" : ""}, or 'restart' to cancel.`,
            next_step: NEXT_STEPS.AWAIT_BROADCAST
        };
    }
    /**
     * Sends a broadcast message to ALL patrollers in the Phone Numbers sheet,
     * regardless of check-in status. Uses the same prefix format and GSM-7 / single-segment
     * validation as the message command.
     * @param {string} message_text - The raw message text from the sender.
     * @returns {Promise<BVNSPResponse>} A promise that resolves with the send result.
     */ async send_broadcast_message(message_text) {
        const sender_name = this.patroller.name;
        const sender_phone = (0,_utils_util__WEBPACK_IMPORTED_MODULE_8__.sanitize_phone_number)(this.from);
        const prefix = this.get_message_prefix(sender_name, sender_phone);
        const max_length = this.get_max_message_length(sender_name, sender_phone);
        const full_message = prefix + message_text;
        const validation = validate_sms_message(full_message);
        if (!validation.valid) {
            if (validation.reason === "non_gsm7") {
                const bad_chars = validation.non_gsm_characters.join(" ");
                return {
                    response: `Your message contains characters that are not supported in plain-text SMS: ${bad_chars}. Please use only standard characters and try again.`,
                    next_step: NEXT_STEPS.AWAIT_BROADCAST
                };
            }
            return {
                response: `Your message is ${message_text.length} characters, which exceeds the limit of ${max_length}. Please shorten your message and try again, or type 'restart' to cancel.`,
                next_step: NEXT_STEPS.AWAIT_BROADCAST
            };
        }
        // For broadcast, send to ALL patrollers in the phone number map
        const phone_map = await this.get_phone_number_map();
        const { sent_count, copy_sent_to_sender, failed_names } = await this.deliver_sms_to_map(phone_map, full_message, sender_name);
        await this.log_action(`broadcast(${sent_count + (copy_sent_to_sender ? 1 : 0)})`);
        let response = `Broadcast sent to ${sent_count} patroller${sent_count !== 1 ? "s" : ""}`;
        if (copy_sent_to_sender) {
            response += ` and a copy to you.`;
        } else {
            response += `.`;
        }
        if (failed_names.length > 0) {
            response += ` Could not send to: ${failed_names.join(", ")}.`;
        }
        return {
            response
        };
    }
    /**
     * Looks up phone numbers for all patrollers from the Phone Numbers sheet.
     * @returns {Promise<Record<string, string>>} A map of patroller name to phone number (in +1XXXXXXXXXX format).
     */ async get_phone_number_map() {
        const sheets_service = await this.get_sheets_service();
        const opts = this.combined_config;
        const response = await sheets_service.spreadsheets.values.get({
            spreadsheetId: opts.SHEET_ID,
            range: opts.PHONE_NUMBER_LOOKUP_SHEET,
            valueRenderOption: "UNFORMATTED_VALUE"
        });
        if (!response.data.values) {
            return {};
        }
        const map = {};
        for (const row of response.data.values){
            const name = row[(0,_utils_util__WEBPACK_IMPORTED_MODULE_8__.excel_row_to_index)(opts.PHONE_NUMBER_NAME_COLUMN)];
            const rawNumber = row[(0,_utils_util__WEBPACK_IMPORTED_MODULE_8__.excel_row_to_index)(opts.PHONE_NUMBER_NUMBER_COLUMN)];
            if (name && rawNumber) {
                map[name] = `+1${(0,_utils_util__WEBPACK_IMPORTED_MODULE_8__.sanitize_phone_number)(rawNumber)}`;
            }
        }
        return map;
    }
    /**
 * Assigns the section to the patroller.
 * @param {string | null} section - The section to assign.
 * @returns {Promise<BVNSPResponse>} A promise that resolves with the response.
 */ async assign_section(section) {
        const assignedSection = section ?? "Roving";
        console.log(`Assigning section ${this.patroller.name} to ${assignedSection}`);
        const mapped_section = this.section_values.map_section(assignedSection);
        await this.log_action(`assign_section(${mapped_section})`);
        const login_sheet = await this.get_login_sheet();
        await login_sheet.assign_section(this.patroller, mapped_section);
        await this.login_sheet?.refresh();
        await this.get_mapped_patroller(true);
        return {
            response: `Updated ${this.patroller.name} with section assignment: ${mapped_section}.`
        };
    }
    /**
     * Prompts the user for a comp or manager pass.
     * @param {number | null} passes_to_use - The number of passes to use.
     * @returns {Promise<BVNSPResponse>} A promise that resolves with the response.
     */ async prompt_guest_pass(guest_name) {
        if (this.patroller.category == "C") {
            return {
                response: `${this.patroller.name}, candidates do not receive comp or manager passes.`
            };
        }
        const sheet = await this.get_guest_pass_sheet();
        const used_and_available = await sheet.get_available_and_used_passes(this.patroller?.name);
        if (used_and_available == null) {
            return {
                response: "Problem looking up patroller for guest passes"
            };
        }
        if (guest_name == null) {
            return used_and_available.get_prompt();
        } else {
            await sheet.set_used_guest_passes(used_and_available, guest_name);
            return {
                response: `Updated ${this.patroller.name} to use a pass for guest "${guest_name}" today.`
            };
        }
    }
    /**
     * Gets the status of the patroller.
     * @returns {Promise<BVNSPResponse>} A promise that resolves with the status response.
     */ async get_status() {
        const login_sheet = await this.get_login_sheet();
        const sheet_date = login_sheet.sheet_date.toDateString();
        const current_date = login_sheet.current_date.toDateString();
        if (!login_sheet.is_current) {
            console.log(`sheet_date: ${login_sheet.sheet_date}`);
            console.log(`current_date: ${login_sheet.current_date}`);
            return {
                response: `Sheet is not current for today (last reset: ${sheet_date}). ${this.patroller.name} is not checked in for ${current_date}.`
            };
        }
        const response = {
            response: await this.get_status_string()
        };
        await this.log_action("status");
        return response;
    }
    /**
     * Gets the status string of the patroller.
     * @returns {Promise<string>} A promise that resolves with the status string.
     */ async get_status_string() {
        const login_sheet = await this.get_login_sheet();
        const guest_pass_promise = (await this.get_guest_pass_sheet()).get_available_and_used_passes(this.patroller.name);
        const patroller_status = this.patroller;
        const checkinColumnSet = patroller_status.checkin !== undefined && patroller_status.checkin !== null;
        const checkedOut = checkinColumnSet && this.checkin_values.by_sheet_string[patroller_status.checkin].key == "out";
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
        const completedPatrolDays = await (await this.get_season_sheet()).get_patrolled_days(this.patroller.name);
        const completedPatrolDaysString = completedPatrolDays > 0 ? completedPatrolDays.toString() : "No";
        const loginSheetDate = login_sheet.sheet_date.toDateString();
        let statusString = `Status for ${this.patroller.name} on date ${loginSheetDate}: ${status}.\n${completedPatrolDaysString} completed patrol days prior to today.`;
        const usedTodayGuestPasses = (await guest_pass_promise)?.used_today || 0;
        const usedSeasonGuestPasses = (await guest_pass_promise)?.used_season || 0;
        const availableGuestPasses = (await guest_pass_promise)?.available || 0;
        statusString += " " + (0,_utils_guest_passes__WEBPACK_IMPORTED_MODULE_9__.build_passes_string)(usedSeasonGuestPasses, usedSeasonGuestPasses + availableGuestPasses, usedTodayGuestPasses);
        return statusString;
    }
    /**
     * Performs the check-in process for the patroller once the check-in mode is set.
     * @returns {Promise<BVNSPResponse>} A promise that resolves with the check-in response.
     * @throws {Error} Throws an error if the check-in mode is improperly set.
     */ async checkin() {
        console.log(`Performing regular checkin for ${this.patroller.name} with mode: ${this.checkin_mode}`);
        if (await this.sheet_needs_reset()) {
            return {
                response: `${this.patroller.name}, you are the first person to check in today. ` + `I need to archive and reset the sheet before continuing. ` + `Would you like me to do that? (Yes/No)`,
                next_step: `${NEXT_STEPS.CONFIRM_RESET}-${this.checkin_mode}`
            };
        }
        let checkin_mode;
        if (!this.checkin_mode || (checkin_mode = this.checkin_values.by_key[this.checkin_mode]) === undefined) {
            throw new Error("Checkin mode improperly set");
        }
        const login_sheet = await this.get_login_sheet();
        const new_checkin_value = checkin_mode.sheets_value;
        await login_sheet.checkin(this.patroller, new_checkin_value);
        await this.log_action(`update-status(${new_checkin_value})`);
        await this.login_sheet?.refresh();
        await this.get_mapped_patroller(true);
        let response = `Updating ${this.patroller.name} with status: ${new_checkin_value}.`;
        if (!this.fast_checkin) {
            response += ` You can send '${checkin_mode.fast_checkins[0]}' as your first message for a fast ${checkin_mode.sheets_value} checkin next time.`;
        }
        response += "\n\n" + await this.get_status_string();
        return {
            response: response
        };
    }
    /**
     * Checks if the Google Sheets needs to be reset.
     * @returns {Promise<boolean>} A promise that resolves to true if the sheet needs to be reset, otherwise false.
     */ async sheet_needs_reset() {
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
     * @returns {Promise<BVNSPResponse | void>} A promise that resolves with the check-in response or void.
     */ async reset_sheet_flow() {
        const response = await this.check_user_creds(`${this.patroller.name}, in order to reset/archive, I need you to authorize the app.`);
        if (response) return {
            response: response.response,
            next_step: `${NEXT_STEPS.AUTH_RESET}-${this.checkin_mode}`
        };
        return await this.reset_sheet();
    }
    /**
     * Resets the Google Sheets, including archiving and resetting the sheet.
     * @returns {Promise<void>} A promise that resolves when the sheet is reset.
     */ async reset_sheet() {
        const script_service = await this.get_user_scripts_service();
        const should_perform_archive = !(await this.get_login_sheet()).archived;
        const message = should_perform_archive ? "Okay. Archiving and reseting the check in sheet. This takes about 10 seconds..." : "Okay. Sheet has already been archived. Performing reset. This takes about 5 seconds...";
        await this.send_message(message);
        if (should_perform_archive) {
            console.log("Archiving...");
            await script_service.scripts.run({
                scriptId: this.reset_script_id,
                requestBody: {
                    function: this.config.ARCHIVE_FUNCTION_NAME
                }
            });
            await this.delay(5);
            await this.log_action("archive");
            this.login_sheet = null;
        }
        console.log("Resetting...");
        await script_service.scripts.run({
            scriptId: this.reset_script_id,
            requestBody: {
                function: this.config.RESET_FUNCTION_NAME
            }
        });
        await this.delay(5);
        await this.log_action("reset");
        await this.send_message("Done.");
    }
    /**
     * Gets the Google Apps Script service.
     * @returns {Promise<script_v1.Script>} A promise that resolves with the Google Apps Script service.
     */ async check_user_creds(prompt_message = "Hi, before you can use BVNSP bot, you must login.") {
        const user_creds = this.get_user_creds();
        if (!await user_creds.loadToken()) {
            const authUrl = await user_creds.getAuthUrl();
            return {
                response: `${prompt_message} Please follow this link:
${authUrl}

Message me again when done.`
            };
        }
    }
    /**
     * Gets the Google Apps Script service.
     * @returns {Promise<script_v1.Script>} A promise that resolves with the Google Apps Script service.
     */ async get_on_duty() {
        const checked_out_section = "Checked Out";
        const last_sections = [
            checked_out_section
        ];
        const login_sheet = await this.get_login_sheet();
        const on_duty_patrollers = login_sheet.get_on_duty_patrollers();
        const by_section = on_duty_patrollers.filter((x)=>x.checkin).reduce((prev, cur)=>{
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
        const ordered_primary_sections = Object.keys(by_section).filter((x)=>!last_sections.includes(x)).sort();
        const filtered_last_sections = last_sections.filter((x)=>all_keys.includes(x));
        const ordered_sections = ordered_primary_sections.concat(filtered_last_sections);
        for (const section of ordered_sections){
            let result = [];
            const patrollers = by_section[section].sort((x, y)=>x.name.localeCompare(y.name));
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
            result.push(patrollers.map((x)=>patroller_string(x.name, this.checkin_values.by_sheet_string[x.checkin].key)).join(", "));
            results.push(result);
        }
        await this.log_action("on-duty");
        return `Patrollers for ${login_sheet.sheet_date.toDateString()} (Total: ${on_duty_patrollers.length}):\n${results.map((r)=>r.join("")).join("\n")}`;
    }
    /**
     * Logs an action to the Google Sheets.
     * @param {string} action_name - The name of the action to log.
     * @returns {Promise<void>} A promise that resolves when the action is logged.
     */ async log_action(action_name) {
        const sheets_service = await this.get_sheets_service();
        await sheets_service.spreadsheets.values.append({
            spreadsheetId: this.combined_config.SHEET_ID,
            range: this.config.ACTION_LOG_SHEET,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [
                    [
                        this.patroller.name,
                        new Date(),
                        action_name
                    ]
                ]
            }
        });
    }
    /**
     * Logs out the user.
     * @returns {Promise<BVNSPResponse>} A promise that resolves with the logout response.
     */ async logout() {
        const user_creds = this.get_user_creds();
        await user_creds.deleteToken();
        return {
            response: "Okay, I have removed all login session information."
        };
    }
    /**
     * Gets the Twilio client.
     * @returns {TwilioClient} The Twilio client.
     */ get_twilio_client() {
        if (this.twilio_client == null) {
            throw new Error("twilio_client was never initialized!");
        }
        return this.twilio_client;
    }
    /**
     * Gets the Twilio Sync client.
     * @returns {ServiceContext} The Twilio Sync client.
     */ get_sync_client() {
        if (!this.sync_client) {
            this.sync_client = this.get_twilio_client().sync.services(this.sync_sid);
        }
        return this.sync_client;
    }
    /**
     * Gets the user credentials.
     * @returns {UserCreds} The user credentials.
     */ get_user_creds() {
        if (!this.user_creds) {
            this.user_creds = new _user_creds__WEBPACK_IMPORTED_MODULE_5__.UserCreds(this.get_sync_client(), this.from, this.combined_config);
        }
        return this.user_creds;
    }
    /**
     * Gets the service credentials.
     * @returns {GoogleAuth} The service credentials.
     */ get_service_creds() {
        if (!this.service_creds) {
            this.service_creds = new googleapis__WEBPACK_IMPORTED_MODULE_1__.google.auth.GoogleAuth({
                keyFile: (0,_utils_file_utils__WEBPACK_IMPORTED_MODULE_7__.get_service_credentials_path)(),
                scopes: this.SCOPES
            });
        }
        return this.service_creds;
    }
    /**
     * Gets the valid credentials.
     * @param {boolean} [require_user_creds=false] - Whether user credentials are required.
     * @returns {Promise<GoogleAuth>} A promise that resolves with the valid credentials.
     */ async get_valid_creds(require_user_creds = false) {
        if (this.config.USE_SERVICE_ACCOUNT && !require_user_creds) {
            return this.get_service_creds();
        }
        const user_creds = this.get_user_creds();
        if (!await user_creds.loadToken()) {
            throw new Error("User is not authed.");
        }
        console.log("Using user account for service auth...");
        return user_creds.oauth2_client;
    }
    /**
     * Gets the Google Sheets service.
     * @returns {Promise<sheets_v4.Sheets>} A promise that resolves with the Google Sheets service.
     */ async get_sheets_service() {
        if (!this.sheets_service) {
            this.sheets_service = googleapis__WEBPACK_IMPORTED_MODULE_1__.google.sheets({
                version: "v4",
                auth: await this.get_valid_creds()
            });
        }
        return this.sheets_service;
    }
    /**
     * Gets the login sheet.
     * @returns {Promise<LoginSheet>} A promise that resolves with the login sheet
     */ async get_login_sheet() {
        if (!this.login_sheet) {
            const login_sheet_config = this.combined_config;
            const sheets_service = await this.get_sheets_service();
            const login_sheet = new _sheets_login_sheet__WEBPACK_IMPORTED_MODULE_3__["default"](sheets_service, login_sheet_config);
            await login_sheet.refresh();
            this.login_sheet = login_sheet;
        }
        return this.login_sheet;
    }
    /**
     * Gets the season sheet.
     * @returns {Promise<SeasonSheet>} A promise that resolves with the season sheet
     */ async get_season_sheet() {
        if (!this.season_sheet) {
            const season_sheet_config = this.combined_config;
            const sheets_service = await this.get_sheets_service();
            const season_sheet = new _sheets_season_sheet__WEBPACK_IMPORTED_MODULE_4__["default"](sheets_service, season_sheet_config);
            this.season_sheet = season_sheet;
        }
        return this.season_sheet;
    }
    /**
     * Gets the guest pass sheet.
     * @returns {Promise<GuestPassSheet>} A promise that resolves with the guest pass sheet
     */ async get_guest_pass_sheet() {
        if (!this.guest_pass_sheet) {
            const config = this.combined_config;
            const sheets_service = await this.get_sheets_service();
            this.guest_pass_sheet = new _sheets_guest_pass_sheet__WEBPACK_IMPORTED_MODULE_10__.GuestPassSheet(sheets_service, config);
        }
        return this.guest_pass_sheet;
    }
    /**
     * Gets the Google Apps Script service.
     * @returns {Promise<script_v1.Script>} A promise that resolves with the Google Apps Script service.
     */ async get_user_scripts_service() {
        if (!this.user_scripts_service) {
            this.user_scripts_service = googleapis__WEBPACK_IMPORTED_MODULE_1__.google.script({
                version: "v1",
                auth: await this.get_valid_creds(true)
            });
        }
        return this.user_scripts_service;
    }
    /**
     * Gets the mapped patroller.
     * @param {boolean} [force=false] - Whether to force the patroller to be found.
     * @returns {Promise<BVNSPResponse | void>} A promise that resolves with the response or void.
     */ async get_mapped_patroller(force = false) {
        const phone_lookup = await this.find_patroller_from_number();
        if (phone_lookup === undefined || phone_lookup === null) {
            if (force) {
                throw new Error("Could not find associated user");
            }
            return {
                response: `Sorry, I couldn't find an associated BVNSP member with your phone number (${this.from})`
            };
        }
        const login_sheet = await this.get_login_sheet();
        const mappedPatroller = login_sheet.try_find_patroller(phone_lookup.name);
        if (mappedPatroller === "not_found") {
            if (force) {
                throw new Error("Could not patroller in login sheet");
            }
            return {
                response: `Could not find patroller '${phone_lookup.name}' in login sheet. Please look at the login sheet name, and copy it to the Phone Numbers tab.`
            };
        }
        this.current_sheet_date = login_sheet.current_date;
        this.patroller = mappedPatroller;
    }
    /**
     * Finds the patroller from the phone number.
     * @returns {Promise<PatrollerRow>} A promise that resolves with the patroller.
     */ async find_patroller_from_number() {
        const raw_number = this.from;
        const sheets_service = await this.get_sheets_service();
        const opts = this.combined_config;
        const number = (0,_utils_util__WEBPACK_IMPORTED_MODULE_8__.sanitize_phone_number)(raw_number);
        const response = await sheets_service.spreadsheets.values.get({
            spreadsheetId: opts.SHEET_ID,
            range: opts.PHONE_NUMBER_LOOKUP_SHEET,
            valueRenderOption: "UNFORMATTED_VALUE"
        });
        if (!response.data.values) {
            throw new Error("Could not find patroller.");
        }
        const patroller = response.data.values.map((row)=>{
            const rawNumber = row[(0,_utils_util__WEBPACK_IMPORTED_MODULE_8__.excel_row_to_index)(opts.PHONE_NUMBER_NUMBER_COLUMN)];
            const currentNumber = rawNumber != undefined ? (0,_utils_util__WEBPACK_IMPORTED_MODULE_8__.sanitize_phone_number)(rawNumber) : rawNumber;
            const currentName = row[(0,_utils_util__WEBPACK_IMPORTED_MODULE_8__.excel_row_to_index)(opts.PHONE_NUMBER_NAME_COLUMN)];
            return {
                name: currentName,
                number: currentNumber
            };
        }).filter((patroller)=>patroller.number === number)[0];
        return patroller;
    }
}


/***/ },

/***/ "./src/sheets/guest_pass_sheet.ts"
/*!****************************************!*\
  !*** ./src/sheets/guest_pass_sheet.ts ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GuestPassSheet: () => (/* binding */ GuestPassSheet),
/* harmony export */   PassSheet: () => (/* binding */ PassSheet),
/* harmony export */   UsedAndAvailablePasses: () => (/* binding */ UsedAndAvailablePasses)
/* harmony export */ });
/* harmony import */ var _utils_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/util */ "./src/utils/util.ts");
/* harmony import */ var _utils_google_sheets_spreadsheet_tab__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/google_sheets_spreadsheet_tab */ "./src/utils/google_sheets_spreadsheet_tab.ts");
/* harmony import */ var _utils_datetime_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/datetime_util */ "./src/utils/datetime_util.ts");
/* harmony import */ var _utils_guest_passes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/guest_passes */ "./src/utils/guest_passes.ts");




class UsedAndAvailablePasses {
    row;
    index;
    available;
    used_today;
    used_season;
    constructor(row, index, available, used_today, used_season){
        this.row = row;
        this.index = index;
        this.available = Number(available);
        this.used_today = Number(used_today);
        this.used_season = Number(used_season);
    }
    get_prompt() {
        if (this.available > 0) {
            let response = null;
            response = (0,_utils_guest_passes__WEBPACK_IMPORTED_MODULE_3__.build_passes_string)(this.used_season, this.available + this.used_season, this.used_today, true);
            response += "\n\n" + `Enter the first and last name of the guest that will use a guest pass today (or 'restart'):`;
            if (response != null) {
                return {
                    response: response,
                    next_step: `await-pass-guest`
                };
            }
        }
        return {
            response: `You do not have any guest passes available today`
        };
    }
}
class PassSheet {
    sheet;
    constructor(sheet){
        this.sheet = sheet;
    }
    async get_available_and_used_passes(patroller_name) {
        const patroller_row = await this.sheet.get_sheet_row_for_patroller(patroller_name, this.name_column);
        if (patroller_row == null) {
            return null;
        }
        const current_day_available_passes = patroller_row.row[(0,_utils_util__WEBPACK_IMPORTED_MODULE_0__.excel_row_to_index)(this.available_column)];
        const current_day_used_passes = patroller_row.row[(0,_utils_util__WEBPACK_IMPORTED_MODULE_0__.excel_row_to_index)(this.used_today_column)];
        const current_season_used_passes = patroller_row.row[(0,_utils_util__WEBPACK_IMPORTED_MODULE_0__.excel_row_to_index)(this.used_season_column)];
        return new UsedAndAvailablePasses(patroller_row.row, patroller_row.index, current_day_available_passes, current_day_used_passes, current_season_used_passes);
    }
    async set_used_guest_passes(patroller_row, guest_name) {
        if (patroller_row.available < 1) {
            throw new Error(`Not enough available passes: Available: ${patroller_row.available}, Used this season:  ${patroller_row.used_season}, Used today: ${patroller_row.used_today}`);
        }
        const rownum = patroller_row.index;
        const start_index = this.start_index;
        const prior_length = patroller_row.row.length - start_index;
        const current_date_string = (0,_utils_datetime_util__WEBPACK_IMPORTED_MODULE_2__.format_date_for_spreadsheet_value)(new Date());
        let new_vals = patroller_row.row.slice(start_index).map((x)=>x?.toString());
        // Add the current date appended with the new guest name
        new_vals.push(current_date_string + "," + guest_name);
        const update_length = Math.max(prior_length, new_vals.length);
        while(new_vals.length < update_length){
            new_vals.push("");
        }
        const end_index = start_index + update_length - 1;
        const range = `${this.sheet.sheet_name}!${(0,_utils_util__WEBPACK_IMPORTED_MODULE_0__.row_col_to_excel_index)(rownum, start_index)}:${(0,_utils_util__WEBPACK_IMPORTED_MODULE_0__.row_col_to_excel_index)(rownum, end_index)}`;
        console.log(`Updating ${range} with ${new_vals.length} values`);
        await this.sheet.update_values(range, [
            new_vals
        ]);
    }
}
class GuestPassSheet extends PassSheet {
    config;
    constructor(sheets_service, config){
        super(new _utils_google_sheets_spreadsheet_tab__WEBPACK_IMPORTED_MODULE_1__["default"](sheets_service, config.SHEET_ID, config.GUEST_PASS_SHEET));
        this.config = config;
    }
    get start_index() {
        return (0,_utils_util__WEBPACK_IMPORTED_MODULE_0__.excel_row_to_index)(this.config.GUEST_PASS_SHEET_DATES_STARTING_COLUMN);
    }
    get sheet_name() {
        return this.config.GUEST_PASS_SHEET;
    }
    get available_column() {
        return this.config.GUEST_PASS_SHEET_DATES_AVAILABLE_COLUMN;
    }
    get used_today_column() {
        return this.config.GUEST_PASS_SHEET_USED_TODAY_COLUMN;
    }
    get used_season_column() {
        return this.config.GUEST_PASS_SHEET_USED_SEASON_COLUMN;
    }
    get name_column() {
        return this.config.GUEST_PASS_SHEET_NAME_COLUMN;
    }
}


/***/ },

/***/ "./src/sheets/login_sheet.ts"
/*!***********************************!*\
  !*** ./src/sheets/login_sheet.ts ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LoginSheet)
/* harmony export */ });
/* harmony import */ var _utils_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/util */ "./src/utils/util.ts");
/* harmony import */ var _utils_google_sheets_spreadsheet_tab__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/google_sheets_spreadsheet_tab */ "./src/utils/google_sheets_spreadsheet_tab.ts");
/* harmony import */ var _utils_datetime_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/datetime_util */ "./src/utils/datetime_util.ts");



/**
 * Class representing a login sheet in Google Sheets.
 */ class LoginSheet {
    login_sheet;
    checkin_count_sheet;
    config;
    rows = null;
    checkin_count = undefined;
    patrollers = [];
    /**
     * Creates an instance of LoginSheet.
     * @param {sheets_v4.Sheets | null} sheets_service - The Google Sheets API service.
     * @param {LoginSheetConfig} config - The configuration for the login sheet.
     */ constructor(sheets_service, config){
        this.login_sheet = new _utils_google_sheets_spreadsheet_tab__WEBPACK_IMPORTED_MODULE_1__["default"](sheets_service, config.SHEET_ID, config.LOGIN_SHEET_LOOKUP);
        this.checkin_count_sheet = new _utils_google_sheets_spreadsheet_tab__WEBPACK_IMPORTED_MODULE_1__["default"](sheets_service, config.SHEET_ID, config.CHECKIN_COUNT_LOOKUP);
        this.config = config;
    }
    /**
     * Refreshes the data from the Google Sheets.
     * @returns {Promise<void>}
     */ async refresh() {
        this.rows = await this.login_sheet.get_values(this.config.LOGIN_SHEET_LOOKUP);
        this.checkin_count = (await this.checkin_count_sheet.get_values(this.config.CHECKIN_COUNT_LOOKUP))[0][0];
        this.patrollers = this.rows.map((x, i)=>this.parse_patroller_row(i, x, this.config)).filter((x)=>x != null);
    //console.log("Refreshing Patrollers: " );
    //console.log(this.patrollers);
    }
    /**
     * Gets the archived status of the login sheet.
     * @returns {boolean} True if the sheet is archived, otherwise false.
     */ get archived() {
        const archived = (0,_utils_util__WEBPACK_IMPORTED_MODULE_0__.lookup_row_col_in_sheet)(this.config.ARCHIVED_CELL, this.rows);
        return archived === undefined && this.checkin_count === 0 || archived.toLowerCase() === "yes";
    }
    /**
     * Gets the date of the sheet.
     * @returns {Date} The date of the sheet.
     */ get sheet_date() {
        return (0,_utils_datetime_util__WEBPACK_IMPORTED_MODULE_2__.sanitize_date)((0,_utils_util__WEBPACK_IMPORTED_MODULE_0__.lookup_row_col_in_sheet)(this.config.SHEET_DATE_CELL, this.rows));
    }
    /**
     * Gets the current date.
     * @returns {Date} The current date.
     */ get current_date() {
        return (0,_utils_datetime_util__WEBPACK_IMPORTED_MODULE_2__.sanitize_date)((0,_utils_util__WEBPACK_IMPORTED_MODULE_0__.lookup_row_col_in_sheet)(this.config.CURRENT_DATE_CELL, this.rows));
    }
    /**
     * Checks if the sheet date is the current date.
     * @returns {boolean} True if the sheet date is the current date, otherwise false.
     */ get is_current() {
        return this.sheet_date.getTime() === this.current_date.getTime();
    }
    /**
     * Tries to find a patroller by name.
     * @param {string} name - The name of the patroller.
     * @returns {PatrollerRow | "not_found"} The patroller row or "not_found".
     */ try_find_patroller(name) {
        const patrollers = this.patrollers.filter((x)=>x.name === name);
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
     */ find_patroller(name) {
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
     */ get_on_duty_patrollers() {
        if (!this.is_current) {
            throw new Error("Login sheet is not current");
        }
        return this.patrollers.filter((x)=>x.checkin);
    }
    /**
     * Checks in a patroller with a new check-in value.
     * @param {PatrollerRow} patroller_status - The status of the patroller.
     * @param {string} new_checkin_value - The new check-in value.
     * @returns {Promise<void>}
     * @throws {Error} If the login sheet is not current.
     */ async checkin(patroller_status, new_checkin_value) {
        if (!this.is_current) {
            throw new Error("Login sheet is not current");
        }
        console.log(`Existing status: ${JSON.stringify(patroller_status)}`);
        const row = patroller_status.index + 1; // programming -> excel lookup
        const range = `${this.config.CHECKIN_DROPDOWN_COLUMN}${row}`;
        await this.login_sheet.update_values(range, [
            [
                new_checkin_value
            ]
        ]);
    }
    /**
    * Assigns a section to a patroller.
    * @param {PatrollerRow} patroller - The patroller to assign the section to.
    * @param {string} new_section_value - The new section value.
    * @returns {Promise<void>}
    * @throws {Error} If the login sheet is not current.
    */ async assign_section(patroller_section, new_section_value) {
        if (!this.is_current) {
            throw new Error("Login sheet is not current");
        }
        console.log(`Existing status: ${JSON.stringify(patroller_section)}`);
        const row = patroller_section.index + 1; // programming -> excel lookup
        const range = `${this.config.SECTION_DROPDOWN_COLUMN}${row}`;
        await this.login_sheet.update_values(range, [
            [
                new_section_value
            ]
        ]);
    }
    /**
     * Parses a row of patroller data.
     * @param {number} index - The index of the row.
     * @param {string[]} row - The row data.
     * @param {PatrollerRowConfig} opts - The configuration options for the patroller row.
     * @returns {PatrollerRow | null} The parsed patroller row or null if invalid.
     */ parse_patroller_row(index, row, opts) {
        if (row.length < 4) {
            return null;
        }
        if (index < 3) {
            return null;
        }
        return {
            index: index,
            name: row[(0,_utils_util__WEBPACK_IMPORTED_MODULE_0__.excel_row_to_index)(opts.NAME_COLUMN)],
            category: row[(0,_utils_util__WEBPACK_IMPORTED_MODULE_0__.excel_row_to_index)(opts.CATEGORY_COLUMN)],
            section: row[(0,_utils_util__WEBPACK_IMPORTED_MODULE_0__.excel_row_to_index)(opts.SECTION_DROPDOWN_COLUMN)],
            checkin: row[(0,_utils_util__WEBPACK_IMPORTED_MODULE_0__.excel_row_to_index)(opts.CHECKIN_DROPDOWN_COLUMN)]
        };
    }
}


/***/ },

/***/ "./src/sheets/season_sheet.ts"
/*!************************************!*\
  !*** ./src/sheets/season_sheet.ts ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SeasonSheet)
/* harmony export */ });
/* harmony import */ var _utils_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/util */ "./src/utils/util.ts");
/* harmony import */ var _utils_google_sheets_spreadsheet_tab__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/google_sheets_spreadsheet_tab */ "./src/utils/google_sheets_spreadsheet_tab.ts");
/* harmony import */ var _utils_datetime_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/datetime_util */ "./src/utils/datetime_util.ts");



/**
 * Class representing a season sheet in Google Sheets.
 */ class SeasonSheet {
    sheet;
    config;
    /**
     * Creates an instance of SeasonSheet.
     * @param {sheets_v4.Sheets | null} sheets_service - The Google Sheets API service.
     * @param {SeasonSheetConfig} config - The configuration for the season sheet.
     */ constructor(sheets_service, config){
        this.sheet = new _utils_google_sheets_spreadsheet_tab__WEBPACK_IMPORTED_MODULE_1__["default"](sheets_service, config.SHEET_ID, config.SEASON_SHEET);
        this.config = config;
    }
    /**
     * Gets the number of days patrolled by a patroller.
     * @param {string} patroller_name - The name of the patroller.
     * @returns {Promise<number>} The number of days patrolled.
     */ async get_patrolled_days(patroller_name) {
        const patroller_row = await this.sheet.get_sheet_row_for_patroller(patroller_name, this.config.SEASON_SHEET_NAME_COLUMN);
        if (!patroller_row) {
            return -1;
        }
        const currentNumber = patroller_row.row[(0,_utils_util__WEBPACK_IMPORTED_MODULE_0__.excel_row_to_index)(this.config.SEASON_SHEET_DAYS_COLUMN)];
        const currentDay = (0,_utils_datetime_util__WEBPACK_IMPORTED_MODULE_2__.filter_list_to_endswith_current_day)(patroller_row.row).map((x)=>x?.startsWith("H") ? 0.5 : 1).reduce((x, y, i)=>x + y, 0);
        const daysBeforeToday = currentNumber - currentDay;
        return daysBeforeToday;
    }
}


/***/ },

/***/ "./src/user-creds.ts"
/*!***************************!*\
  !*** ./src/user-creds.ts ***!
  \***************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserCreds: () => (/* binding */ UserCreds),
/* harmony export */   UserCredsScopes: () => (/* binding */ SCOPES),
/* harmony export */   "default": () => (/* binding */ UserCreds)
/* harmony export */ });
/* harmony import */ var googleapis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! googleapis */ "googleapis");
/* harmony import */ var googleapis__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(googleapis__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/util */ "./src/utils/util.ts");
/* harmony import */ var _utils_file_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/file_utils */ "./src/utils/file_utils.ts");
/* harmony import */ var _utils_scope_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/scope_util */ "./src/utils/scope_util.ts");




const SCOPES = [
    "https://www.googleapis.com/auth/script.projects",
    "https://www.googleapis.com/auth/spreadsheets"
];
/**
 * Class representing user credentials for Google OAuth2.
 */ class UserCreds {
    number;
    oauth2_client;
    sync_client;
    domain;
    loaded = false;
    /**
     * Create a UserCreds instance.
     * @param {ServiceContext} sync_client - The Twilio Sync client.
     * @param {string | undefined} number - The user's phone number.
     * @param {UserCredsConfig} opts - The user credentials configuration.
     * @throws {Error} Throws an error if the number is undefined or null.
     */ constructor(sync_client, number, opts){
        if (number === undefined || number === null) {
            throw new Error("Number is undefined");
        }
        this.number = (0,_utils_util__WEBPACK_IMPORTED_MODULE_1__.sanitize_phone_number)(number);
        const credentials = (0,_utils_file_utils__WEBPACK_IMPORTED_MODULE_2__.load_credentials_files)();
        const { client_secret, client_id, redirect_uris } = credentials.web;
        this.oauth2_client = new googleapis__WEBPACK_IMPORTED_MODULE_0__.google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
        this.sync_client = sync_client;
        let domain = opts.NSP_EMAIL_DOMAIN;
        if (domain === undefined || domain === null || domain === "") {
            domain = undefined;
        } else {
            this.domain = domain;
        }
    }
    /**
     * Load the OAuth2 token.
     * @returns {Promise<boolean>} A promise that resolves to a boolean indicating if the token was loaded.
     */ async loadToken() {
        if (!this.loaded) {
            try {
                console.log(`Looking for ${this.token_key}`);
                const oauth2Doc = await this.sync_client.documents(this.token_key).fetch();
                if (oauth2Doc === undefined || oauth2Doc.data == undefined || oauth2Doc.data.token === undefined) {
                    console.log(`Didn't find ${this.token_key}`);
                } else {
                    const token = oauth2Doc.data.token;
                    (0,_utils_scope_util__WEBPACK_IMPORTED_MODULE_3__.validate_scopes)(oauth2Doc.data.scopes, SCOPES);
                    this.oauth2_client.setCredentials(token);
                    console.log(`Loaded token ${this.token_key}`);
                    this.loaded = true;
                }
            } catch (e) {
                console.log(`Failed to load token for ${this.token_key}.\n ${e}`);
            }
        }
        return this.loaded;
    }
    /**
     * Get the token key.
     * @returns {string} The token key.
     */ get token_key() {
        return `oauth2_${this.number}`;
    }
    /**
     * Delete the OAuth2 token.
     * @returns {Promise<boolean>} A promise that resolves to a boolean indicating if the token was deleted.
     */ async deleteToken() {
        const oauth2Doc = await this.sync_client.documents(this.token_key).fetch();
        if (oauth2Doc === undefined || oauth2Doc.data == undefined || oauth2Doc.data.token === undefined) {
            console.log(`Didn't find ${this.token_key}`);
            return false;
        }
        await this.sync_client.documents(oauth2Doc.sid).remove();
        console.log(`Deleted token ${this.token_key}`);
        return true;
    }
    /**
     * Complete the login process by exchanging the authorization code for a token.
     * @param {string} code - The authorization code.
     * @param {string[]} scopes - The scopes to validate.
     * @returns {Promise<void>} A promise that resolves when the login process is complete.
     */ async completeLogin(code, scopes) {
        ;(0,_utils_scope_util__WEBPACK_IMPORTED_MODULE_3__.validate_scopes)(scopes, SCOPES);
        const token = await this.oauth2_client.getToken(code);
        console.log(JSON.stringify(Object.keys(token.res)));
        console.log(JSON.stringify(token.tokens));
        this.oauth2_client.setCredentials(token.tokens);
        try {
            const oauthDoc = await this.sync_client.documents.create({
                data: {
                    token: token.tokens,
                    scopes: scopes
                },
                uniqueName: this.token_key
            });
        } catch (e) {
            console.log(`Exception when creating oauth. Trying to update instead...\n${e}`);
            const oauthDoc = await this.sync_client.documents(this.token_key).update({
                data: {
                    token: token,
                    scopes: scopes
                }
            });
        }
    }
    /**
     * Get the authorization URL.
     * @returns {Promise<string>} A promise that resolves to the authorization URL.
     */ async getAuthUrl() {
        const id = this.generateRandomString();
        console.log(`Using nonce ${id} for ${this.number}`);
        const doc = await this.sync_client.documents.create({
            data: {
                number: this.number,
                scopes: SCOPES
            },
            uniqueName: id,
            ttl: 60 * 5
        });
        console.log(`Made nonce-doc: ${JSON.stringify(doc)}`);
        const opts = {
            access_type: "offline",
            scope: SCOPES,
            state: id
        };
        if (this.domain) {
            opts["hd"] = this.domain;
        }
        const authUrl = this.oauth2_client.generateAuthUrl(opts);
        return authUrl;
    }
    /**
     * Generate a random string.
     * @returns {string} A random string.
     */ generateRandomString() {
        const length = 30;
        let result = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        for(let i = 0; i < length; i++){
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}
/**
 * Interface representing the user credentials configuration.
 */ 


/***/ },

/***/ "./src/utils/checkin_values.ts"
/*!*************************************!*\
  !*** ./src/utils/checkin_values.ts ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CheckinValue: () => (/* binding */ CheckinValue),
/* harmony export */   CheckinValues: () => (/* binding */ CheckinValues)
/* harmony export */ });
/**
 * Represents a check-in value with various properties and lookup values.
 */ class CheckinValue {
    key;
    sheets_value;
    sms_desc;
    fast_checkins;
    lookup_values;
    /**
     * Creates an instance of CheckinValue.
     * @param {string} key - The key for the check-in value.
     * @param {string} sheets_value - The value used in sheets.
     * @param {string} sms_desc - The description used in SMS.
     * @param {string | string[]} fast_checkins - The fast check-in values.
     */ constructor(key, sheets_value, sms_desc, fast_checkins){
        if (!(fast_checkins instanceof Array)) {
            fast_checkins = [
                fast_checkins
            ];
        }
        this.key = key;
        this.sheets_value = sheets_value;
        this.sms_desc = sms_desc;
        this.fast_checkins = fast_checkins.map((x)=>x.trim().toLowerCase());
        const sms_desc_split = sms_desc.replace(/\s+/, "-").toLowerCase().split("/");
        const lookup_vals = [
            ...this.fast_checkins,
            ...sms_desc_split
        ];
        this.lookup_values = new Set(lookup_vals);
    }
}
/**
 * Represents a collection of check-in values with various lookup methods.
 */ class CheckinValues {
    by_key = {};
    by_lv = {};
    by_fc = {};
    by_sheet_string = {};
    /**
     * Creates an instance of CheckinValues.
     * @param {CheckinValue[]} checkinValues - The array of check-in values.
     */ constructor(checkinValues){
        for (var checkinValue of checkinValues){
            this.by_key[checkinValue.key] = checkinValue;
            this.by_sheet_string[checkinValue.sheets_value] = checkinValue;
            for (const lv of checkinValue.lookup_values){
                this.by_lv[lv] = checkinValue;
            }
            for (const fc of checkinValue.fast_checkins){
                this.by_fc[fc] = checkinValue;
            }
        }
    }
    /**
     * Returns the entries of check-in values by key.
     * @returns {Array} The entries of check-in values.
     */ entries() {
        return Object.entries(this.by_key);
    }
    /**
     * Parses a fast check-in value from the given body string.
     * @param {string} body - The body string to parse.
     * @returns {CheckinValue | undefined} The parsed check-in value or undefined.
     */ parse_fast_checkin(body) {
        return this.by_fc[body];
    }
    /**
     * Parses a check-in value from the given body string.
     * @param {string} body - The body string to parse.
     * @returns {CheckinValue | undefined} The parsed check-in value or undefined.
     */ parse_checkin(body) {
        const checkin_lower = body.replace(/\s+/, "");
        return this.by_lv[checkin_lower];
    }
}



/***/ },

/***/ "./src/utils/datetime_util.ts"
/*!************************************!*\
  !*** ./src/utils/datetime_util.ts ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   change_timezone_to_pst: () => (/* binding */ change_timezone_to_pst),
/* harmony export */   excel_date_to_js_date: () => (/* binding */ excel_date_to_js_date),
/* harmony export */   filter_list_to_endswith_current_day: () => (/* binding */ filter_list_to_endswith_current_day),
/* harmony export */   filter_list_to_endswith_date: () => (/* binding */ filter_list_to_endswith_date),
/* harmony export */   format_date_for_spreadsheet_value: () => (/* binding */ format_date_for_spreadsheet_value),
/* harmony export */   sanitize_date: () => (/* binding */ sanitize_date),
/* harmony export */   strip_datetime_to_date: () => (/* binding */ strip_datetime_to_date)
/* harmony export */ });
/**
 * Convert an Excel date to a JavaScript Date object.
 * @param {number} date - The Excel date.
 * @returns {Date} The JavaScript Date object.
 */ function excel_date_to_js_date(date) {
    const result = new Date(0);
    result.setUTCMilliseconds(Math.round((date - 25569) * 86400 * 1000));
    return result;
}
/**
 * Change the timezone of a Date object to PST.
 * @param {Date} date - The Date object.
 * @returns {Date} The Date object with the timezone set to PST.
 */ function change_timezone_to_pst(date) {
    const result = new Date(date.toUTCString().replace(" GMT", " PST"));
    return result;
}
/**
 * Strip the time from a Date object, keeping only the date.
 * @param {Date} date - The Date object.
 * @returns {Date} The Date object with the time stripped.
 */ function strip_datetime_to_date(date) {
    const result = new Date(date.toLocaleDateString("en-US", {
        timeZone: "America/Los_Angeles"
    }));
    return result;
}
/**
 * Sanitize a date by converting it from an Excel date and stripping the time.
 * @param {number} date - The Excel date.
 * @returns {Date} The sanitized Date object.
 */ function sanitize_date(date) {
    const result = strip_datetime_to_date(change_timezone_to_pst(excel_date_to_js_date(date)));
    return result;
}
/**
 * Format a Date object for use in a spreadsheet value.
 * @param {Date} date - The Date object.
 * @returns {string} The formatted date string in PST
 */ function format_date_for_spreadsheet_value(date) {
    const datestr = date.toLocaleDateString("en-US", {
        timeZone: "America/Los_Angeles"
    }).split("/").map((x)=>x.padStart(2, "0")).join("");
    return datestr;
}
/**
 * Filter a list to include only items that end with a specific date.
 * @param {any[]} list - The list to filter.
 * @param {Date} date - The date to filter by.
 * @returns {any[]} The filtered list.
 */ function filter_list_to_endswith_date(list, date) {
    const datestr = format_date_for_spreadsheet_value(date);
    return list.map((x)=>x?.toString()).filter((x)=>x?.endsWith(datestr));
}
/**
 * Filter a list to include only items that end with the current date.
 * @param {any[]} list - The list to filter.
 * @returns {any[]} The filtered list.
 */ function filter_list_to_endswith_current_day(list) {
    return filter_list_to_endswith_date(list, new Date());
}



/***/ },

/***/ "./src/utils/file_utils.ts"
/*!*********************************!*\
  !*** ./src/utils/file_utils.ts ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   get_service_credentials_path: () => (/* binding */ get_service_credentials_path),
/* harmony export */   load_credentials_files: () => (/* binding */ load_credentials_files)
/* harmony export */ });
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _twilio_labs_serverless_runtime_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @twilio-labs/serverless-runtime-types */ "./node_modules/@twilio-labs/serverless-runtime-types/index.js");
/* harmony import */ var _twilio_labs_serverless_runtime_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_twilio_labs_serverless_runtime_types__WEBPACK_IMPORTED_MODULE_1__);


/**
 * Load credentials from a JSON file.
 * @returns {any} The parsed credentials from the JSON file.
 */ function load_credentials_files() {
    return JSON.parse(fs__WEBPACK_IMPORTED_MODULE_0__.readFileSync(Runtime.getAssets()["/credentials.json"].path).toString());
}
/**
 * Get the path to the service credentials file.
 * @returns {string} The path to the service credentials file.
 */ function get_service_credentials_path() {
    return Runtime.getAssets()["/service-credentials.json"].path;
}



/***/ },

/***/ "./src/utils/google_sheets_spreadsheet_tab.ts"
/*!****************************************************!*\
  !*** ./src/utils/google_sheets_spreadsheet_tab.ts ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GoogleSheetsSpreadsheetTab)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/utils/util.ts");

/**
 * Class representing a Google Sheets spreadsheet tab.
 */ class GoogleSheetsSpreadsheetTab {
    sheets_service;
    sheet_id;
    sheet_name;
    /**
     * Create a GoogleSheetsSpreadsheetTab.
     * @param {sheets_v4.Sheets | null} sheets_service - The Google Sheets API service instance.
     * @param {string} sheet_id - The ID of the Google Sheets spreadsheet.
     * @param {string} sheet_name - The name of the sheet tab.
     */ constructor(sheets_service, sheet_id, sheet_name){
        this.sheets_service = sheets_service;
        this.sheet_id = sheet_id;
        this.sheet_name = sheet_name.split("!")[0];
    }
    /**
     * Get values from the sheet.
     * @param {string | null} [range] - The range to get values from.
     * @returns {Promise<any[][] | undefined>} A promise that resolves to the values from the sheet.
     */ async get_values(range) {
        const result = await this._get_values(range);
        return result.data.values ?? undefined;
    }
    /**
     * Get the row for a specific patroller.
     * @param {string} patroller_name - The name of the patroller.
     * @param {string} name_column - The column where the patroller's name is located.
     * @param {string | null} [range] - The range to search within.
     * @returns {Promise<{ row: any[]; index: number; } | null>} A promise that resolves to the row and index of the patroller, or null if not found.
     */ async get_sheet_row_for_patroller(patroller_name, name_column, range) {
        const rows = await this.get_values(range);
        if (rows) {
            const lookup_index = (0,_util__WEBPACK_IMPORTED_MODULE_0__.excel_row_to_index)(name_column);
            for(var i = 0; i < rows.length; i++){
                if (rows[i][lookup_index] === patroller_name) {
                    return {
                        row: rows[i],
                        index: i
                    };
                }
            }
        }
        console.log(`Couldn't find patroller ${patroller_name} in sheet ${this.sheet_name}.`);
        return null;
    }
    /**
     * Update values in the sheet.
     * @param {string} range - The range to update.
     * @param {any[][]} values - The values to update.
     */ async update_values(range, values) {
        const updateMe = (await this._get_values(range, null)).data;
        updateMe.values = values;
        await this.sheets_service.spreadsheets.values.update({
            spreadsheetId: this.sheet_id,
            valueInputOption: "USER_ENTERED",
            range: updateMe.range,
            requestBody: updateMe
        });
    }
    /**
     * Get values from the sheet (private method).
     * @param {string | null} [range] - The range to get values from.
     * @param {string | null} [valueRenderOption] - The value render option.
     * @returns {Promise<any[][]>} A promise that resolves to the value range.
     * @private
     */ async _get_values(range, valueRenderOption = "UNFORMATTED_VALUE") {
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
            range: lookupRange
        };
        if (valueRenderOption) {
            opts.valueRenderOption = valueRenderOption;
        }
        const result = await this.sheets_service.spreadsheets.values.get(opts);
        return result;
    }
}


/***/ },

/***/ "./src/utils/guest_passes.ts"
/*!***********************************!*\
  !*** ./src/utils/guest_passes.ts ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   build_passes_string: () => (/* binding */ build_passes_string)
/* harmony export */ });
function build_passes_string(used, total, today, force_today = false) {
    let message = `You have used ${used} of ${total} guest passes this season`;
    if (force_today || today > 0) {
        message += ` (${today} used today)`;
    }
    message += ".";
    return message;
}


/***/ },

/***/ "./src/utils/scope_util.ts"
/*!*********************************!*\
  !*** ./src/utils/scope_util.ts ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   validate_scopes: () => (/* binding */ validate_scopes)
/* harmony export */ });
/**
 * Validates if the provided scopes include all desired scopes.
 * @param {string[]} scopes - The list of scopes to validate.
 * @param {string[]} desired_scopes - The list of desired scopes.
 * @throws {Error} Throws an error if any desired scope is missing.
 */ function validate_scopes(scopes, desired_scopes) {
    for (const desired_scope of desired_scopes){
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
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SectionValues: () => (/* binding */ SectionValues)
/* harmony export */ });
/**
    * Class for section values.
    */ class SectionValues {
    section_config;
    sections;
    lowercase_sections;
    constructor(section_config){
        this.section_config = section_config;
        this.sections = section_config.SECTION_VALUES.split(',');
        this.lowercase_sections = section_config.SECTION_VALUES.toLowerCase().split(',');
    }
    /**
     * Gets the section description.
     * @returns {string} The section description.
    */ get_section_description() {
        return this.section_config.SECTION_VALUES;
    }
    /**
    * Parses a section.
    * @param {string} body - The body of the request.
    * @returns {string | null} The section if it is a valid section or null.
    */ parse_section(body) {
        if (body === null) {
            return null;
        }
        return this.lowercase_sections.includes(body.toLowerCase()) ? body : null;
    }
    /**
    * Maps a lower case version of a section string to the original case value.
    * @param {string} section - The lower case section string.
    * @returns {string } The original case value if found, otherwise null.
    */ map_section(section) {
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



/***/ },

/***/ "./src/utils/util.ts"
/*!***************************!*\
  !*** ./src/utils/util.ts ***!
  \***************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   excel_row_to_index: () => (/* binding */ excel_row_to_index),
/* harmony export */   lookup_row_col_in_sheet: () => (/* binding */ lookup_row_col_in_sheet),
/* harmony export */   row_col_to_excel_index: () => (/* binding */ row_col_to_excel_index),
/* harmony export */   sanitize_phone_number: () => (/* binding */ sanitize_phone_number),
/* harmony export */   split_to_row_col: () => (/* binding */ split_to_row_col)
/* harmony export */ });
/**
 * Convert row and column numbers to an Excel-like index.
 * @param {number} row - The row number (0-based).
 * @param {number} col - The column number (0-based).
 * @returns {string} The Excel-like index (e.g., "A1").
 */ function row_col_to_excel_index(row, col) {
    let colString = "";
    col += 1;
    while(col > 0){
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
 */ function split_to_row_col(excel_index) {
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
    return [
        raw_row - 1,
        col
    ];
}
/**
 * Look up a value in a sheet by its Excel-like index.
 * @param {string} excel_index - The Excel-like index (e.g., "A1").
 * @param {any[][]} sheet - The sheet data.
 * @returns {any} The value at the specified index, or undefined if not found.
 */ function lookup_row_col_in_sheet(excel_index, sheet) {
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
 */ function excel_row_to_index(letters) {
    const lowerLetters = letters.toLowerCase();
    let result = 0;
    for(var p = 0; p < lowerLetters.length; p++){
        const characterValue = lowerLetters.charCodeAt(p) - "a".charCodeAt(0) + 1;
        result = characterValue + result * 26;
    }
    return result - 1;
}
/**
 * Sanitize a phone number by removing unwanted characters.
 * @param {number | string} number - The phone number to sanitize.
 * @returns {string} The sanitized phone number.
 */ function sanitize_phone_number(number) {
    let new_number = number.toString();
    new_number = new_number.replace("whatsapp:", "");
    let temporary_new_number = "";
    while(temporary_new_number != new_number){
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

/***/ "googleapis"
/*!*****************************!*\
  !*** external "googleapis" ***!
  \*****************************/
(module) {

"use strict";
module.exports = require("googleapis");

/***/ },

/***/ "sms-segments-calculator"
/*!******************************************!*\
  !*** external "sms-segments-calculator" ***!
  \******************************************/
(module) {

"use strict";
module.exports = require("sms-segments-calculator");

/***/ },

/***/ "fs"
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
(module) {

"use strict";
module.exports = require("fs");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			const getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter/value functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			if(Array.isArray(definition)) {
/******/ 				var i = 0;
/******/ 				while(i < definition.length) {
/******/ 					var key = definition[i++];
/******/ 					var binding = definition[i++];
/******/ 					if(!__webpack_require__.o(exports, key)) {
/******/ 						if(binding === 0) {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, value: definition[i++] });
/******/ 						} else {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, get: binding });
/******/ 						}
/******/ 					} else if(binding === 0) { i++; }
/******/ 				}
/******/ 			} else {
/******/ 				for(var key in definition) {
/******/ 					if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!*******************************************!*\
  !*** ./src/handlers/handler.protected.ts ***!
  \*******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handler: () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _twilio_labs_serverless_runtime_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @twilio-labs/serverless-runtime-types */ "./node_modules/@twilio-labs/serverless-runtime-types/index.js");
/* harmony import */ var _twilio_labs_serverless_runtime_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_twilio_labs_serverless_runtime_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bvnsp_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bvnsp_handler */ "./src/handlers/bvnsp_handler.ts");


const NEXT_STEP_COOKIE_NAME = "bvnsp_next_step";
/**
 * Twilio Serverless function handler for BVNSP bot commands.
 * @param {Context<HandlerEnvironment>} context - The Twilio serverless context.
 * @param {ServerlessEventObject<BVNSPEvent>} event - The event object.
 * @param {ServerlessCallback} callback - The callback function.
 */ const handler = async function(context, event, callback) {
    const handler = new _bvnsp_handler__WEBPACK_IMPORTED_MODULE_1__["default"](context, event);
    let message;
    let next_step = "";
    try {
        const handler_response = await handler.handle();
        message = handler_response.response || "Unexpected result - no response determined";
        next_step = handler_response.next_step || "";
    } catch (e) {
        console.log("An error occured");
        try {
            console.log(JSON.stringify(e));
        } catch  {
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
    response// Add the stringified TwiML to the response body
    .setBody(twiml.toString())// Since we're returning TwiML, the content type must be XML
    .appendHeader("Content-Type", "text/xml").setCookie(NEXT_STEP_COOKIE_NAME, next_step);
    return callback(null, response);
};

})();

exports.handler = __webpack_exports__.handler;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFha0osT0FBTztZQUNwQjdILFdBQVcsT0FBT3JCLEVBQUVxQixPQUFPO1lBQzNCcEIsUUFBUUMsR0FBRyxDQUFDLFNBQVNGLEVBQUUrVyxLQUFLO1lBQzVCOVcsUUFBUUMsR0FBRyxDQUFDLFNBQVNGLEVBQUV1QyxJQUFJO1lBQzNCdEMsUUFBUUMsR0FBRyxDQUFDLFNBQVNGLEVBQUVxQixPQUFPO1FBQ2xDO0lBQ0o7SUFFQSxNQUFNUSxXQUFXLElBQUltVixPQUFPQyxRQUFRO0lBQ3BDLE1BQU1DLFFBQVEsSUFBSUYsT0FBT0UsS0FBSyxDQUFDQyxpQkFBaUI7SUFFaERELE1BQU03VixPQUFPLENBQUNBO0lBRWRRLFFBQ0ksaURBQWlEO0tBQ2hEdVYsT0FBTyxDQUFDRixNQUFNOU8sUUFBUSxHQUN2Qiw0REFBNEQ7S0FDM0RpUCxZQUFZLENBQUMsZ0JBQWdCLFlBQzdCQyxTQUFTLENBQUNYLHVCQUF1QjVVO0lBRXRDLE9BQU84VSxTQUFTLE1BQU1oVjtBQUMxQixFQUFFIiwic291cmNlcyI6WyIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL25vZGVfbW9kdWxlcy9AdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzL2luZGV4LmpzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvZW52L2hhbmRsZXJfY29uZmlnLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvaGFuZGxlcnMvYnZuc3BfaGFuZGxlci50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3NoZWV0cy9ndWVzdF9wYXNzX3NoZWV0LnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvc2hlZXRzL2xvZ2luX3NoZWV0LnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvc2hlZXRzL3NlYXNvbl9zaGVldC50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3VzZXItY3JlZHMudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91dGlscy9jaGVja2luX3ZhbHVlcy50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3V0aWxzL2RhdGV0aW1lX3V0aWwudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91dGlscy9maWxlX3V0aWxzLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvZ29vZ2xlX3NoZWV0c19zcHJlYWRzaGVldF90YWIudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91dGlscy9ndWVzdF9wYXNzZXMudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91dGlscy9zY29wZV91dGlsLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvc2VjdGlvbl92YWx1ZXMudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91dGlscy91dGlsLnRzIiwiZXh0ZXJuYWwgY29tbW9uanMgXCJnb29nbGVhcGlzXCIiLCJleHRlcm5hbCBjb21tb25qcyBcInNtcy1zZWdtZW50cy1jYWxjdWxhdG9yXCIiLCJleHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiZnNcIiIsIndlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL2hhbmRsZXJzL2hhbmRsZXIucHJvdGVjdGVkLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEludGVudGlvbmFsbHkgbGVmdCBlbXB0eVxuIiwiaW1wb3J0IHsgQ2hlY2tpblZhbHVlIH0gZnJvbSBcIi4uL3V0aWxzL2NoZWNraW5fdmFsdWVzXCI7XG5cbi8qKlxuICogRW52aXJvbm1lbnQgY29uZmlndXJhdGlvbiBmb3IgdGhlIGhhbmRsZXIuXG4gKiA8cD5cbiAqIE5vdGU6IFRoZXNlIGFyZSB0aGUgb25seSBzZWNyZXQgdmFsdWVzIHdlIG5lZWQgdG8gcmVhZC4gUmVzdCBjYW4gYmUgZGVwbG95ZWQuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBIYW5kbGVyRW52aXJvbm1lbnRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTSEVFVF9JRCAtIFRoZSBJRCBvZiB0aGUgR29vZ2xlIFNoZWV0cyBzcHJlYWRzaGVldC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTQ1JJUFRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBBcHBzIFNjcmlwdCBwcm9qZWN0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNZTkNfU0lEIC0gVGhlIFNJRCBvZiB0aGUgVHdpbGlvIFN5bmMgc2VydmljZS5cbiAqL1xudHlwZSBIYW5kbGVyRW52aXJvbm1lbnQgPSB7XG4gICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICBTQ1JJUFRfSUQ6IHN0cmluZztcbiAgICBTWU5DX1NJRDogc3RyaW5nO1xufTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciB1c2VyIGNyZWRlbnRpYWxzLlxuICogQHR5cGVkZWYge09iamVjdH0gVXNlckNyZWRzQ29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZyB8IHVuZGVmaW5lZCB8IG51bGx9IE5TUF9FTUFJTF9ET01BSU4gLSBUaGUgZW1haWwgZG9tYWluIGZvciBOU1AuXG4gKi9cbnR5cGUgVXNlckNyZWRzQ29uZmlnID0ge1xuICAgIE5TUF9FTUFJTF9ET01BSU46IHN0cmluZyB8IHVuZGVmaW5lZCB8IG51bGw7XG59O1xuY29uc3QgdXNlcl9jcmVkc19jb25maWc6IFVzZXJDcmVkc0NvbmZpZyA9IHtcbiAgICBOU1BfRU1BSUxfRE9NQUlOOiBcImZhcndlc3Qub3JnXCIsXG59O1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIGZpbmRpbmcgYSBwYXRyb2xsZXIuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBGaW5kUGF0cm9sbGVyQ29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gUEhPTkVfTlVNQkVSX0xPT0tVUF9TSEVFVCAtIFRoZSByYW5nZSBmb3IgcGhvbmUgbnVtYmVyIGxvb2t1cC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBQSE9ORV9OVU1CRVJfTlVNQkVSX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIHBob25lIG51bWJlcnMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gUEhPTkVfTlVNQkVSX05BTUVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgbmFtZXMuXG4gKi9cbnR5cGUgRmluZFBhdHJvbGxlckNvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogc3RyaW5nO1xuICAgIFBIT05FX05VTUJFUl9MT09LVVBfU0hFRVQ6IHN0cmluZztcbiAgICBQSE9ORV9OVU1CRVJfTlVNQkVSX0NPTFVNTjogc3RyaW5nO1xuICAgIFBIT05FX05VTUJFUl9OQU1FX0NPTFVNTjogc3RyaW5nO1xufTtcblxuY29uc3QgZmluZF9wYXRyb2xsZXJfY29uZmlnOiBGaW5kUGF0cm9sbGVyQ29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBcInRlc3RcIixcbiAgICBQSE9ORV9OVU1CRVJfTE9PS1VQX1NIRUVUOiBcIlBob25lIE51bWJlcnMhQTI6QjEwMFwiLFxuICAgIFBIT05FX05VTUJFUl9OQU1FX0NPTFVNTjogXCJBXCIsXG4gICAgUEhPTkVfTlVNQkVSX05VTUJFUl9DT0xVTU46IFwiQlwiLFxufTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciB0aGUgbG9naW4gc2hlZXQuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBMb2dpblNoZWV0Q29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gTE9HSU5fU0hFRVRfTE9PS1VQIC0gVGhlIHJhbmdlIGZvciBsb2dpbiBzaGVldCBsb29rdXAuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQ0hFQ0tJTl9DT1VOVF9MT09LVVAgLSBUaGUgcmFuZ2UgZm9yIGNoZWNrLWluIGNvdW50IGxvb2t1cC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBBUkNISVZFRF9DRUxMIC0gVGhlIGNlbGwgZm9yIGFyY2hpdmVkIGRhdGEuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfREFURV9DRUxMIC0gVGhlIGNlbGwgZm9yIHRoZSBzaGVldCBkYXRlLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IENVUlJFTlRfREFURV9DRUxMIC0gVGhlIGNlbGwgZm9yIHRoZSBjdXJyZW50IGRhdGUuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gTkFNRV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBuYW1lcy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDQVRFR09SWV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBjYXRlZ29yaWVzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNFQ1RJT05fRFJPUERPV05fQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3Igc2VjdGlvbiBkcm9wZG93bi5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDSEVDS0lOX0RST1BET1dOX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIGNoZWNrLWluIGRyb3Bkb3duLlxuICovXG50eXBlIExvZ2luU2hlZXRDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICBMT0dJTl9TSEVFVF9MT09LVVA6IHN0cmluZztcbiAgICBDSEVDS0lOX0NPVU5UX0xPT0tVUDogc3RyaW5nO1xuICAgIEFSQ0hJVkVEX0NFTEw6IHN0cmluZztcbiAgICBTSEVFVF9EQVRFX0NFTEw6IHN0cmluZztcbiAgICBDVVJSRU5UX0RBVEVfQ0VMTDogc3RyaW5nO1xuICAgIE5BTUVfQ09MVU1OOiBzdHJpbmc7XG4gICAgQ0FURUdPUllfQ09MVU1OOiBzdHJpbmc7XG4gICAgU0VDVElPTl9EUk9QRE9XTl9DT0xVTU46IHN0cmluZztcbiAgICBDSEVDS0lOX0RST1BET1dOX0NPTFVNTjogc3RyaW5nO1xufTtcblxuY29uc3QgbG9naW5fc2hlZXRfY29uZmlnOiBMb2dpblNoZWV0Q29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBcInRlc3RcIixcbiAgICBMT0dJTl9TSEVFVF9MT09LVVA6IFwiTG9naW4hQTE6STEwMFwiLFxuICAgIENIRUNLSU5fQ09VTlRfTE9PS1VQOiBcIlRvb2xzIUcyOkcyXCIsXG4gICAgU0hFRVRfREFURV9DRUxMOiBcIkIxXCIsXG4gICAgQ1VSUkVOVF9EQVRFX0NFTEw6IFwiQjJcIixcbiAgICBBUkNISVZFRF9DRUxMOiBcIkgxXCIsXG4gICAgTkFNRV9DT0xVTU46IFwiQVwiLFxuICAgIENBVEVHT1JZX0NPTFVNTjogXCJCXCIsXG4gICAgU0VDVElPTl9EUk9QRE9XTl9DT0xVTU46IFwiSFwiLFxuICAgIENIRUNLSU5fRFJPUERPV05fQ09MVU1OOiBcIklcIixcbn07XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgdGhlIHNlYXNvbiBzaGVldC5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IFNlYXNvblNoZWV0Q29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0VBU09OX1NIRUVUIC0gVGhlIG5hbWUgb2YgdGhlIHNlYXNvbiBzaGVldC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTRUFTT05fU0hFRVRfREFZU19DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBzZWFzb24gc2hlZXQgZGF5cy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTRUFTT05fU0hFRVRfTkFNRV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBzZWFzb24gc2hlZXQgbmFtZXMuXG4gKi9cbnR5cGUgU2Vhc29uU2hlZXRDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICBTRUFTT05fU0hFRVQ6IHN0cmluZztcbiAgICBTRUFTT05fU0hFRVRfREFZU19DT0xVTU46IHN0cmluZztcbiAgICBTRUFTT05fU0hFRVRfTkFNRV9DT0xVTU46IHN0cmluZztcbn07XG5jb25zdCBzZWFzb25fc2hlZXRfY29uZmlnOiBTZWFzb25TaGVldENvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogXCJ0ZXN0XCIsXG4gICAgU0VBU09OX1NIRUVUOiBcIlNlYXNvblwiLFxuICAgIFNFQVNPTl9TSEVFVF9OQU1FX0NPTFVNTjogXCJCXCIsXG4gICAgU0VBU09OX1NIRUVUX0RBWVNfQ09MVU1OOiBcIkFcIixcbn07XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3Igc2VjdGlvbnMuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBTZWN0aW9uQ29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0VDVElPTl9WQUxVRVMgLSBUaGUgc2VjdGlvbiB2YWx1ZXMuXG4gKi9cbnR5cGUgU2VjdGlvbkNvbmZpZyA9IHtcbiAgICBTRUNUSU9OX1ZBTFVFUzogc3RyaW5nO1xufTtcbmNvbnN0IHNlY3Rpb25fY29uZmlnOiBTZWN0aW9uQ29uZmlnID0ge1xuICAgIFNFQ1RJT05fVkFMVUVTOiAgXCIxLDIsMyw0LFJvdmluZyxGQVIsVHJhaW5pbmdcIixcbn07XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgZ3Vlc3QgcGFzc2VzLlxuICogQHR5cGVkZWYge09iamVjdH0gR3Vlc3RQYXNzZXNDb25maWdcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTSEVFVF9JRCAtIFRoZSBJRCBvZiB0aGUgR29vZ2xlIFNoZWV0cyBzcHJlYWRzaGVldC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBHVUVTVF9QQVNTX1NIRUVUIC0gVGhlIG5hbWUgb2YgdGhlIGd1ZXN0IHBhc3Mgc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gR1VFU1RfUEFTU19TSEVFVF9EQVRFU19BVkFJTEFCTEVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgYXZhaWxhYmxlIGRhdGVzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IEdVRVNUX1BBU1NfU0hFRVRfVVNFRF9UT0RBWV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBkYXRlcyB1c2VkIHRvZGF5LlxuICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBHVUVTVF9QQVNTX1NIRUVUX1VTRURfU0VBU09OX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIGRhdGVzIHVzZWQgZm9yIHRoaXMgc2Vhc29uLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IEdVRVNUX1BBU1NfU0hFRVRfREFURVNfU1RBUlRJTkdfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3Igc3RhcnRpbmcgZGF0ZXMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gR1VFU1RfUEFTU19TSEVFVF9OQU1FX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIG5hbWVzLlxuICovXG50eXBlIEd1ZXN0UGFzc2VzQ29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBzdHJpbmc7XG4gICAgR1VFU1RfUEFTU19TSEVFVDogc3RyaW5nO1xuICAgIEdVRVNUX1BBU1NfU0hFRVRfREFURVNfQVZBSUxBQkxFX0NPTFVNTjogc3RyaW5nO1xuICAgIEdVRVNUX1BBU1NfU0hFRVRfVVNFRF9UT0RBWV9DT0xVTU46IHN0cmluZztcbiAgICBHVUVTVF9QQVNTX1NIRUVUX1VTRURfU0VBU09OX0NPTFVNTjogc3RyaW5nO1xuICAgIEdVRVNUX1BBU1NfU0hFRVRfREFURVNfU1RBUlRJTkdfQ09MVU1OOiBzdHJpbmc7XG4gICAgR1VFU1RfUEFTU19TSEVFVF9OQU1FX0NPTFVNTjogc3RyaW5nO1xufTtcbmNvbnN0IGd1ZXN0X3Bhc3Nlc19jb25maWc6IEd1ZXN0UGFzc2VzQ29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBcInRlc3RcIixcbiAgICBHVUVTVF9QQVNTX1NIRUVUOiBcIkNvbXBzXCIsXG4gICAgR1VFU1RfUEFTU19TSEVFVF9OQU1FX0NPTFVNTjogXCJBXCIsXG4gICAgR1VFU1RfUEFTU19TSEVFVF9EQVRFU19BVkFJTEFCTEVfQ09MVU1OOiBcIkRcIixcbiAgICBHVUVTVF9QQVNTX1NIRUVUX1VTRURfVE9EQVlfQ09MVU1OOiBcIkVcIixcbiAgICBHVUVTVF9QQVNTX1NIRUVUX1VTRURfU0VBU09OX0NPTFVNTjogXCJGXCIsXG4gICAgR1VFU1RfUEFTU19TSEVFVF9EQVRFU19TVEFSVElOR19DT0xVTU46IFwiR1wiLFxufTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciB0aGUgaGFuZGxlci5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IEhhbmRsZXJDb25maWdcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTQ1JJUFRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBBcHBzIFNjcmlwdCBwcm9qZWN0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNIRUVUX0lEIC0gVGhlIElEIG9mIHRoZSBHb29nbGUgU2hlZXRzIHNwcmVhZHNoZWV0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNZTkNfU0lEIC0gVGhlIFNJRCBvZiB0aGUgVHdpbGlvIFN5bmMgc2VydmljZS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBSRVNFVF9GVU5DVElPTl9OQU1FIC0gVGhlIG5hbWUgb2YgdGhlIHJlc2V0IGZ1bmN0aW9uLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IEFSQ0hJVkVfRlVOQ1RJT05fTkFNRSAtIFRoZSBuYW1lIG9mIHRoZSBhcmNoaXZlIGZ1bmN0aW9uLlxuICogQHByb3BlcnR5IHtib29sZWFufSBVU0VfU0VSVklDRV9BQ0NPVU5UIC0gV2hldGhlciB0byB1c2UgYSBzZXJ2aWNlIGFjY291bnQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQUNUSU9OX0xPR19TSEVFVCAtIFRoZSBuYW1lIG9mIHRoZSBhY3Rpb24gbG9nIHNoZWV0LlxuICogQHByb3BlcnR5IHtDaGVja2luVmFsdWVbXX0gQ0hFQ0tJTl9WQUxVRVMgLSBUaGUgY2hlY2staW4gdmFsdWVzLlxuICovXG50eXBlIEhhbmRsZXJDb25maWcgPSB7XG4gICAgU0NSSVBUX0lEOiBzdHJpbmc7XG4gICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICBTWU5DX1NJRDogc3RyaW5nO1xuICAgIFJFU0VUX0ZVTkNUSU9OX05BTUU6IHN0cmluZztcbiAgICBBUkNISVZFX0ZVTkNUSU9OX05BTUU6IHN0cmluZztcbiAgICBVU0VfU0VSVklDRV9BQ0NPVU5UOiBib29sZWFuO1xuICAgIEFDVElPTl9MT0dfU0hFRVQ6IHN0cmluZztcbiAgICBDSEVDS0lOX1ZBTFVFUzogQ2hlY2tpblZhbHVlW107XG59O1xuY29uc3QgaGFuZGxlcl9jb25maWc6IEhhbmRsZXJDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IFwidGVzdFwiLFxuICAgIFNDUklQVF9JRDogXCJ0ZXN0XCIsXG4gICAgU1lOQ19TSUQ6IFwidGVzdFwiLFxuICAgIEFSQ0hJVkVfRlVOQ1RJT05fTkFNRTogXCJBcmNoaXZlXCIsXG4gICAgUkVTRVRfRlVOQ1RJT05fTkFNRTogXCJSZXNldFwiLFxuICAgIFVTRV9TRVJWSUNFX0FDQ09VTlQ6IHRydWUsXG4gICAgQUNUSU9OX0xPR19TSEVFVDogXCJCb3RfVXNhZ2VcIixcbiAgICBDSEVDS0lOX1ZBTFVFUzogW1xuICAgICAgICBuZXcgQ2hlY2tpblZhbHVlKFwiZGF5XCIsIFwiQWxsIERheVwiLCBcImFsbCBkYXkvREFZXCIsIFtcImNoZWNraW4tZGF5XCJdKSxcbiAgICAgICAgbmV3IENoZWNraW5WYWx1ZShcImFtXCIsIFwiSGFsZiBBTVwiLCBcIm1vcm5pbmcvQU1cIiwgW1wiY2hlY2tpbi1hbVwiXSksXG4gICAgICAgIG5ldyBDaGVja2luVmFsdWUoXCJwbVwiLCBcIkhhbGYgUE1cIiwgXCJhZnRlcm5vb24vUE1cIiwgW1wiY2hlY2tpbi1wbVwiXSksXG4gICAgICAgIG5ldyBDaGVja2luVmFsdWUoXCJvdXRcIiwgXCJDaGVja2VkIE91dFwiLCBcImNoZWNrIG91dC9PVVRcIiwgW1wiY2hlY2tvdXRcIiwgXCJjaGVjay1vdXRcIl0pLFxuICAgIF0sXG59O1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIHBhdHJvbGxlciByb3dzLlxuICogQHR5cGVkZWYge09iamVjdH0gUGF0cm9sbGVyUm93Q29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gTkFNRV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBuYW1lcy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDQVRFR09SWV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBjYXRlZ29yaWVzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNFQ1RJT05fRFJPUERPV05fQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3Igc2VjdGlvbiBkcm9wZG93bi5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDSEVDS0lOX0RST1BET1dOX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIGNoZWNrLWluIGRyb3Bkb3duLlxuICovXG50eXBlIFBhdHJvbGxlclJvd0NvbmZpZyA9IHtcbiAgICBOQU1FX0NPTFVNTjogc3RyaW5nO1xuICAgIENBVEVHT1JZX0NPTFVNTjogc3RyaW5nO1xuICAgIFNFQ1RJT05fRFJPUERPV05fQ09MVU1OOiBzdHJpbmc7XG4gICAgQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU46IHN0cmluZztcbn07XG5cbi8qKlxuICogQ29tYmluZWQgY29uZmlndXJhdGlvbiB0eXBlLlxuICogQHR5cGVkZWYge0hhbmRsZXJFbnZpcm9ubWVudCAmIFVzZXJDcmVkc0NvbmZpZyAmIEZpbmRQYXRyb2xsZXJDb25maWcgJiBMb2dpblNoZWV0Q29uZmlnICYgU2Vhc29uU2hlZXRDb25maWcgJiBTZWN0aW9uQ29uZmlnICYgR3Vlc3RQYXNzZXNDb25maWcgJiBIYW5kbGVyQ29uZmlnICYgUGF0cm9sbGVyUm93Q29uZmlnfSBDb21iaW5lZENvbmZpZ1xuICovXG50eXBlIENvbWJpbmVkQ29uZmlnID0gSGFuZGxlckVudmlyb25tZW50ICZcbiAgICBVc2VyQ3JlZHNDb25maWcgJlxuICAgIEZpbmRQYXRyb2xsZXJDb25maWcgJlxuICAgIExvZ2luU2hlZXRDb25maWcgJlxuICAgIFNlYXNvblNoZWV0Q29uZmlnICZcbiAgICBTZWN0aW9uQ29uZmlnICZcbiAgICBHdWVzdFBhc3Nlc0NvbmZpZyAmXG4gICAgSGFuZGxlckNvbmZpZyAmXG4gICAgUGF0cm9sbGVyUm93Q29uZmlnO1xuXG5jb25zdCBDT05GSUc6IENvbWJpbmVkQ29uZmlnID0ge1xuICAgIC4uLmhhbmRsZXJfY29uZmlnLFxuICAgIC4uLmZpbmRfcGF0cm9sbGVyX2NvbmZpZyxcbiAgICAuLi5sb2dpbl9zaGVldF9jb25maWcsXG4gICAgLi4uZ3Vlc3RfcGFzc2VzX2NvbmZpZyxcbiAgICAuLi5zZWFzb25fc2hlZXRfY29uZmlnLFxuICAgIC4uLnVzZXJfY3JlZHNfY29uZmlnLFxuICAgIC4uLnNlY3Rpb25fY29uZmlnLFxufTtcblxuZXhwb3J0IHtcbiAgICBDT05GSUcsXG4gICAgQ29tYmluZWRDb25maWcsXG4gICAgU2VjdGlvbkNvbmZpZyxcbiAgICBHdWVzdFBhc3Nlc0NvbmZpZyxcbiAgICBGaW5kUGF0cm9sbGVyQ29uZmlnLFxuICAgIEhhbmRsZXJDb25maWcsXG4gICAgSGFuZGxlckVudmlyb25tZW50LFxuICAgIFVzZXJDcmVkc0NvbmZpZyxcbiAgICBMb2dpblNoZWV0Q29uZmlnLFxuICAgIFNlYXNvblNoZWV0Q29uZmlnLFxuICAgIFBhdHJvbGxlclJvd0NvbmZpZyxcbn07IiwiaW1wb3J0IFwiQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlc1wiO1xuaW1wb3J0IHtcbiAgICBDb250ZXh0LFxuICAgIFNlcnZlcmxlc3NFdmVudE9iamVjdCxcbiAgICBTZXJ2aWNlQ29udGV4dCxcbiAgICBUd2lsaW9DbGllbnQsXG59IGZyb20gXCJAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzL3R5cGVzXCI7XG5pbXBvcnQge2dvb2dsZSwgc2NyaXB0X3YxLCBzaGVldHNfdjR9IGZyb20gXCJnb29nbGVhcGlzXCI7XG5pbXBvcnQge0dvb2dsZUF1dGh9IGZyb20gXCJnb29nbGVhcGlzLWNvbW1vblwiO1xuaW1wb3J0IHtcbiAgICBDT05GSUcsXG4gICAgQ29tYmluZWRDb25maWcsXG4gICAgR3Vlc3RQYXNzZXNDb25maWcsXG4gICAgRmluZFBhdHJvbGxlckNvbmZpZyxcbiAgICBIYW5kbGVyQ29uZmlnLFxuICAgIEhhbmRsZXJFbnZpcm9ubWVudCxcbiAgICBMb2dpblNoZWV0Q29uZmlnLFxuICAgIFNlYXNvblNoZWV0Q29uZmlnLFxufSBmcm9tIFwiLi4vZW52L2hhbmRsZXJfY29uZmlnXCI7XG5pbXBvcnQgTG9naW5TaGVldCwge1BhdHJvbGxlclJvd30gZnJvbSBcIi4uL3NoZWV0cy9sb2dpbl9zaGVldFwiO1xuaW1wb3J0IFNlYXNvblNoZWV0IGZyb20gXCIuLi9zaGVldHMvc2Vhc29uX3NoZWV0XCI7XG5pbXBvcnQge1VzZXJDcmVkc30gZnJvbSBcIi4uL3VzZXItY3JlZHNcIjtcbmltcG9ydCB7Q2hlY2tpblZhbHVlc30gZnJvbSBcIi4uL3V0aWxzL2NoZWNraW5fdmFsdWVzXCI7XG5pbXBvcnQge2dldF9zZXJ2aWNlX2NyZWRlbnRpYWxzX3BhdGh9IGZyb20gXCIuLi91dGlscy9maWxlX3V0aWxzXCI7XG5pbXBvcnQge2V4Y2VsX3Jvd190b19pbmRleCwgc2FuaXRpemVfcGhvbmVfbnVtYmVyfSBmcm9tIFwiLi4vdXRpbHMvdXRpbFwiO1xuaW1wb3J0IHtidWlsZF9wYXNzZXNfc3RyaW5nLH0gZnJvbSBcIi4uL3V0aWxzL2d1ZXN0X3Bhc3Nlc1wiO1xuaW1wb3J0IHtHdWVzdFBhc3NTaGVldCwgUGFzc1NoZWV0fSBmcm9tIFwiLi4vc2hlZXRzL2d1ZXN0X3Bhc3Nfc2hlZXRcIjtcbmltcG9ydCB7U2VjdGlvblZhbHVlc30gZnJvbSAnLi4vdXRpbHMvc2VjdGlvbl92YWx1ZXMnO1xuXG5leHBvcnQgdHlwZSBCVk5TUFJlc3BvbnNlID0ge1xuICAgIHJlc3BvbnNlPzogc3RyaW5nO1xuICAgIG5leHRfc3RlcD86IHN0cmluZztcbn07XG5leHBvcnQgdHlwZSBCVk5TUEV2ZW50ID0gU2VydmVybGVzc0V2ZW50T2JqZWN0PFxuICAgIHtcbiAgICAgICAgRnJvbTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgICBUbzogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgICBudW1iZXI6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAgICAgdGVzdF9udW1iZXI6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAgICAgQm9keTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIH0sXG4gICAge30sXG4gICAge1xuICAgICAgICBidm5zcF9uZXh0X3N0ZXA6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICB9XG4+O1xuXG5leHBvcnQgY29uc3QgTkVYVF9TVEVQUyA9IHtcbiAgICBBV0FJVF9DT01NQU5EOiBcImF3YWl0LWNvbW1hbmRcIixcbiAgICBBV0FJVF9DSEVDS0lOOiBcImF3YWl0LWNoZWNraW5cIixcbiAgICBDT05GSVJNX1JFU0VUOiBcImNvbmZpcm0tcmVzZXRcIixcbiAgICBBVVRIX1JFU0VUOiBcImF1dGgtcmVzZXRcIixcbiAgICBBV0FJVF9TRUNUSU9OOiBcImF3YWl0LXNlY3Rpb25cIixcbiAgICBBV0FJVF9QQVNTOiBcImF3YWl0LXBhc3NcIixcbiAgICBBV0FJVF9NRVNTQUdFOiBcImF3YWl0LW1lc3NhZ2VcIixcbiAgICBBV0FJVF9CUk9BRENBU1Q6IFwiYXdhaXQtYnJvYWRjYXN0XCIsXG59O1xuXG5jb25zdCBDT01NQU5EUyA9IHtcbiAgICBPTl9EVVRZOiBbXCJvbmR1dHlcIiwgXCJvbi1kdXR5XCJdLFxuICAgIFNUQVRVUzogW1wic3RhdHVzXCJdLFxuICAgIENIRUNLSU46IFtcImNoZWNraW5cIiwgXCJjaGVjay1pblwiXSxcbiAgICBTRUNUSU9OX0FTU0lHTk1FTlQ6IFtcInNlY3Rpb25cIiwgXCJzZWN0aW9uLWFzc2lnbm1lbnRcIiwgXCJzZWN0aW9uYXNzaWdubWVudFwiLCBcImFzc2lnbm1lbnRcIl0sXG4gICAgR1VFU1RfUEFTUzogW1wiZ3Vlc3QtcGFzc1wiLCBcImd1ZXN0cGFzc1wiLCBcImd1ZXN0XCJdLFxuICAgIFdIQVRTQVBQOiBbXCJ3aGF0c2FwcFwiXSxcbiAgICBNRVNTQUdFOiBbXCJtZXNzYWdlXCIsIFwibXNnXCJdLFxuICAgIEJST0FEQ0FTVDogW1wiYnJvYWRjYXN0XCJdLFxufTtcblxuZXhwb3J0IGNvbnN0IFNNU19NQVhfTEVOR1RIID0gMTYwO1xuZXhwb3J0IGNvbnN0IE1FU1NBR0VfUFJFRklYX1RFTVBMQVRFID0gXCJNZXNzYWdlIGZyb20gXCI7XG5leHBvcnQgY29uc3QgTUVTU0FHRV9QUkVGSVhfU1VGRklYID0gXCI6IFwiO1xuXG4vKipcbiAqIFJlc3VsdCBvZiB2YWxpZGF0aW5nIGFuIFNNUyBtZXNzYWdlIGZvciBHU00tNyBjb21wYXRpYmlsaXR5IGFuZCBzZWdtZW50IGNvdW50LlxuICovXG5leHBvcnQgdHlwZSBTbXNWYWxpZGF0aW9uUmVzdWx0ID0ge1xuICAgIC8qKiBXaGV0aGVyIHRoZSBtZXNzYWdlIGlzIHZhbGlkIChHU00tNyBvbmx5IGFuZCBmaXRzIGluIGEgc2luZ2xlIHNlZ21lbnQpLiAqL1xuICAgIHZhbGlkOiBib29sZWFuO1xuICAgIC8qKiBJZiBpbnZhbGlkLCB0aGUgcmVhc29uOiAnbm9uX2dzbTcnIG9yICd0b29fbWFueV9zZWdtZW50cycuICovXG4gICAgcmVhc29uPzogXCJub25fZ3NtN1wiIHwgXCJ0b29fbWFueV9zZWdtZW50c1wiO1xuICAgIC8qKiBUaGUgbm9uLUdTTS03IGNoYXJhY3RlcnMgZm91bmQsIGlmIGFueS4gKi9cbiAgICBub25fZ3NtX2NoYXJhY3RlcnM/OiBzdHJpbmdbXTtcbiAgICAvKiogVGhlIG51bWJlciBvZiBTTVMgc2VnbWVudHMgdGhlIG1lc3NhZ2Ugd291bGQgcmVxdWlyZS4gKi9cbiAgICBzZWdtZW50c19jb3VudD86IG51bWJlcjtcbn07XG5cbi8qKlxuICogVmFsaWRhdGVzIHRoYXQgYSBjb21wbGV0ZSBTTVMgbWVzc2FnZSAocHJlZml4ICsgYm9keSkgdXNlcyBvbmx5IEdTTS03IGNoYXJhY3RlcnNcbiAqIGFuZCBmaXRzIHdpdGhpbiBhIHNpbmdsZSBTTVMgc2VnbWVudC5cbiAqXG4gKiBVc2VzIHRoZSBzbXMtc2VnbWVudHMtY2FsY3VsYXRvciBsaWJyYXJ5IChtYWludGFpbmVkIGJ5IFR3aWxpb0RldkVkKSB3aGljaFxuICogcHJvdmlkZXMgYXV0aG9yaXRhdGl2ZSBHU00tNyBjaGFyYWN0ZXIgZGV0ZWN0aW9uLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmdWxsX21lc3NhZ2UgLSBUaGUgY29tcGxldGUgbWVzc2FnZSB0byB2YWxpZGF0ZSAocHJlZml4ICsgdXNlciB0ZXh0KS5cbiAqIEByZXR1cm5zIHtTbXNWYWxpZGF0aW9uUmVzdWx0fSBUaGUgdmFsaWRhdGlvbiByZXN1bHQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZV9zbXNfbWVzc2FnZShmdWxsX21lc3NhZ2U6IHN0cmluZyk6IFNtc1ZhbGlkYXRpb25SZXN1bHQge1xuICAgIGNvbnN0IHsgU2VnbWVudGVkTWVzc2FnZSB9ID0gcmVxdWlyZShcInNtcy1zZWdtZW50cy1jYWxjdWxhdG9yXCIpO1xuICAgIGNvbnN0IHNlZ21lbnRlZCA9IG5ldyBTZWdtZW50ZWRNZXNzYWdlKGZ1bGxfbWVzc2FnZSk7XG4gICAgY29uc3Qgbm9uX2dzbSA9IHNlZ21lbnRlZC5nZXROb25Hc21DaGFyYWN0ZXJzKCkgYXMgc3RyaW5nW107XG5cbiAgICBpZiAobm9uX2dzbS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWxpZDogZmFsc2UsXG4gICAgICAgICAgICByZWFzb246IFwibm9uX2dzbTdcIixcbiAgICAgICAgICAgIG5vbl9nc21fY2hhcmFjdGVyczogWy4uLm5ldyBTZXQobm9uX2dzbSldLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGlmIChzZWdtZW50ZWQuc2VnbWVudHNDb3VudCA+IDEpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgICAgICAgIHJlYXNvbjogXCJ0b29fbWFueV9zZWdtZW50c1wiLFxuICAgICAgICAgICAgc2VnbWVudHNfY291bnQ6IHNlZ21lbnRlZC5zZWdtZW50c0NvdW50LFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB7IHZhbGlkOiB0cnVlIH07XG59XG5cbi8qKlxuICogRm9ybWF0cyBhIDEwLWRpZ2l0IHBob25lIG51bWJlciBzdHJpbmcgYXMgKFhYWClYWFgtWFhYWCBmb3IgZGlzcGxheS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZW5fZGlnaXRzIC0gQSAxMC1kaWdpdCBwaG9uZSBudW1iZXIgc3RyaW5nIChlLmcuIFwiMTIzNDU2Nzg5MFwiKS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgcGhvbmUgbnVtYmVyIChlLmcuIFwiKDEyMyk0NTYtNzg5MFwiKS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdF9waG9uZV9mb3JfZGlzcGxheSh0ZW5fZGlnaXRzOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBgKCR7dGVuX2RpZ2l0cy5zdWJzdHJpbmcoMCwgMyl9KSR7dGVuX2RpZ2l0cy5zdWJzdHJpbmcoMywgNil9LSR7dGVuX2RpZ2l0cy5zdWJzdHJpbmcoNiwgMTApfWA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJWTlNQSGFuZGxlciB7XG4gICAgU0NPUEVTOiBzdHJpbmdbXSA9IFtcImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvc3ByZWFkc2hlZXRzXCJdO1xuXG4gICAgc21zX3JlcXVlc3Q6IGJvb2xlYW47XG4gICAgcmVzdWx0X21lc3NhZ2VzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGZyb206IHN0cmluZztcbiAgICB0bzogc3RyaW5nO1xuICAgIGJvZHk6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBib2R5X3Jhdzogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIHBhdHJvbGxlcjogUGF0cm9sbGVyUm93IHwgbnVsbDtcbiAgICBidm5zcF9uZXh0X3N0ZXA6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBjaGVja2luX21vZGU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICAgIGZhc3RfY2hlY2tpbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGFzc2lnbmVkX3NlY3Rpb246IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gICAgdHdpbGlvX2NsaWVudDogVHdpbGlvQ2xpZW50IHwgbnVsbCA9IG51bGw7XG4gICAgc3luY19zaWQ6IHN0cmluZztcbiAgICByZXNldF9zY3JpcHRfaWQ6IHN0cmluZztcblxuICAgIC8vIENhY2hlIGNsaWVudHNcbiAgICBzeW5jX2NsaWVudDogU2VydmljZUNvbnRleHQgfCBudWxsID0gbnVsbDtcbiAgICB1c2VyX2NyZWRzOiBVc2VyQ3JlZHMgfCBudWxsID0gbnVsbDtcbiAgICBzZXJ2aWNlX2NyZWRzOiBHb29nbGVBdXRoIHwgbnVsbCA9IG51bGw7XG4gICAgc2hlZXRzX3NlcnZpY2U6IHNoZWV0c192NC5TaGVldHMgfCBudWxsID0gbnVsbDtcbiAgICB1c2VyX3NjcmlwdHNfc2VydmljZTogc2NyaXB0X3YxLlNjcmlwdCB8IG51bGwgPSBudWxsO1xuXG4gICAgbG9naW5fc2hlZXQ6IExvZ2luU2hlZXQgfCBudWxsID0gbnVsbDtcbiAgICBzZWFzb25fc2hlZXQ6IFNlYXNvblNoZWV0IHwgbnVsbCA9IG51bGw7XG4gICAgZ3Vlc3RfcGFzc19zaGVldDogR3Vlc3RQYXNzU2hlZXQgfCBudWxsID0gbnVsbDtcblxuICAgIGNoZWNraW5fdmFsdWVzOiBDaGVja2luVmFsdWVzO1xuICAgIGN1cnJlbnRfc2hlZXRfZGF0ZTogRGF0ZTtcblxuICAgIGNvbWJpbmVkX2NvbmZpZzogQ29tYmluZWRDb25maWc7XG4gICAgY29uZmlnOiBIYW5kbGVyQ29uZmlnO1xuXG4gICAgc2VjdGlvbl92YWx1ZXM6IFNlY3Rpb25WYWx1ZXM7XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGEgbmV3IEJWTlNQSGFuZGxlci5cbiAgICAgKiBAcGFyYW0ge0NvbnRleHQ8SGFuZGxlckVudmlyb25tZW50Pn0gY29udGV4dCAtIFRoZSBzZXJ2ZXJsZXNzIGZ1bmN0aW9uIGNvbnRleHQuXG4gICAgICogQHBhcmFtIHtTZXJ2ZXJsZXNzRXZlbnRPYmplY3Q8QlZOU1BFdmVudD59IGV2ZW50IC0gVGhlIGV2ZW50IG9iamVjdC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgY29udGV4dDogQ29udGV4dDxIYW5kbGVyRW52aXJvbm1lbnQ+LFxuICAgICAgICBldmVudDogU2VydmVybGVzc0V2ZW50T2JqZWN0PEJWTlNQRXZlbnQ+XG4gICAgKSB7XG4gICAgICAgIC8vIERldGVybWluZSBtZXNzYWdlIGRldGFpbHMgZnJvbSB0aGUgaW5jb21pbmcgZXZlbnQsIHdpdGggZmFsbGJhY2sgdmFsdWVzXG4gICAgICAgIHRoaXMuc21zX3JlcXVlc3QgPSAoZXZlbnQuRnJvbSB8fCBldmVudC5udW1iZXIpICE9PSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZnJvbSA9IGV2ZW50LkZyb20gfHwgZXZlbnQubnVtYmVyIHx8IGV2ZW50LnRlc3RfbnVtYmVyITtcbiAgICAgICAgdGhpcy50byA9IHNhbml0aXplX3Bob25lX251bWJlcihldmVudC5UbyEpO1xuICAgICAgICB0aGlzLmJvZHkgPSBldmVudC5Cb2R5Py50b0xvd2VyQ2FzZSgpPy50cmltKCkucmVwbGFjZSgvXFxzKy8sIFwiLVwiKTtcbiAgICAgICAgdGhpcy5ib2R5X3JhdyA9IGV2ZW50LkJvZHlcbiAgICAgICAgdGhpcy5idm5zcF9uZXh0X3N0ZXAgPVxuICAgICAgICAgICAgZXZlbnQucmVxdWVzdC5jb29raWVzLmJ2bnNwX25leHRfc3RlcDtcbiAgICAgICAgdGhpcy5jb21iaW5lZF9jb25maWcgPSB7IC4uLkNPTkZJRywgLi4uY29udGV4dCB9O1xuICAgICAgICB0aGlzLmNvbmZpZyA9IHRoaXMuY29tYmluZWRfY29uZmlnO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLnR3aWxpb19jbGllbnQgPSBjb250ZXh0LmdldFR3aWxpb0NsaWVudCgpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGluaXRpYWxpemluZyB0d2lsaW9fY2xpZW50XCIsIGUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3luY19zaWQgPSBjb250ZXh0LlNZTkNfU0lEO1xuICAgICAgICB0aGlzLnJlc2V0X3NjcmlwdF9pZCA9IGNvbnRleHQuU0NSSVBUX0lEO1xuICAgICAgICB0aGlzLnBhdHJvbGxlciA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5jaGVja2luX3ZhbHVlcyA9IG5ldyBDaGVja2luVmFsdWVzKENPTkZJRy5DSEVDS0lOX1ZBTFVFUyk7XG4gICAgICAgIHRoaXMuY3VycmVudF9zaGVldF9kYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgdGhpcy5zZWN0aW9uX3ZhbHVlcyA9IG5ldyBTZWN0aW9uVmFsdWVzKHRoaXMuY29tYmluZWRfY29uZmlnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZXMgdGhlIGZhc3QgY2hlY2staW4gbW9kZSBmcm9tIHRoZSBtZXNzYWdlIGJvZHkuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHkgLSBUaGUgbWVzc2FnZSBib2R5LlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIGZhc3QgY2hlY2staW4gbW9kZSBpcyBwYXJzZWQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKi9cbiAgICBwYXJzZV9mYXN0X2NoZWNraW5fbW9kZShib2R5OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgcGFyc2VkID0gdGhpcy5jaGVja2luX3ZhbHVlcy5wYXJzZV9mYXN0X2NoZWNraW4oYm9keSk7XG4gICAgICAgIGlmIChwYXJzZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5jaGVja2luX21vZGUgPSBwYXJzZWQua2V5O1xuICAgICAgICAgICAgdGhpcy5mYXN0X2NoZWNraW4gPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlcyB0aGUgY2hlY2staW4gbW9kZSBmcm9tIHRoZSBtZXNzYWdlIGJvZHkuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHkgLSBUaGUgbWVzc2FnZSBib2R5LlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIGNoZWNrLWluIG1vZGUgaXMgcGFyc2VkLCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICovXG4gICAgcGFyc2VfY2hlY2tpbihib2R5OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgcGFyc2VkID0gdGhpcy5jaGVja2luX3ZhbHVlcy5wYXJzZV9jaGVja2luKGJvZHkpO1xuICAgICAgICBpZiAocGFyc2VkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tpbl9tb2RlID0gcGFyc2VkLmtleTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZXMgdGhlIGNoZWNrLWluIG1vZGUgZnJvbSB0aGUgbmV4dCBzdGVwLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIGNoZWNrLWluIG1vZGUgaXMgcGFyc2VkLCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICovXG4gICAgcGFyc2VfY2hlY2tpbl9mcm9tX25leHRfc3RlcCgpIHtcbiAgICAgICAgY29uc3QgbGFzdF9zZWdtZW50ID0gdGhpcy5idm5zcF9uZXh0X3N0ZXBcbiAgICAgICAgICAgID8uc3BsaXQoXCItXCIpXG4gICAgICAgICAgICAuc2xpY2UoLTEpWzBdO1xuICAgICAgICBpZiAobGFzdF9zZWdtZW50ICYmIGxhc3Rfc2VnbWVudCBpbiB0aGlzLmNoZWNraW5fdmFsdWVzLmJ5X2tleSkge1xuICAgICAgICAgICAgdGhpcy5jaGVja2luX21vZGUgPSBsYXN0X3NlZ21lbnQ7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVsYXlzIHRoZSBleGVjdXRpb24gZm9yIGEgc3BlY2lmaWVkIG51bWJlciBvZiBzZWNvbmRzLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZWNvbmRzIC0gVGhlIG51bWJlciBvZiBzZWNvbmRzIHRvIGRlbGF5LlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbmFsPWZhbHNlXSAtIFdoZXRoZXIgdGhlIGRlbGF5IGlzIG9wdGlvbmFsLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyBhZnRlciB0aGUgZGVsYXkuXG4gICAgICovXG4gICAgZGVsYXkoc2Vjb25kczogbnVtYmVyLCBvcHRpb25hbDogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGlmIChvcHRpb25hbCAmJiAhdGhpcy5zbXNfcmVxdWVzdCkge1xuICAgICAgICAgICAgc2Vjb25kcyA9IDEgLyAxMDAwLjA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMpID0+IHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQocmVzLCBzZWNvbmRzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VuZHMgYSBtZXNzYWdlIHRvIHRoZSB1c2VyLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gVGhlIG1lc3NhZ2UgdG8gc2VuZC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgbWVzc2FnZSBpcyBzZW50LlxuICAgICAqL1xuICAgIGFzeW5jIHNlbmRfbWVzc2FnZShtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMuc21zX3JlcXVlc3QpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0X3R3aWxpb19jbGllbnQoKS5tZXNzYWdlcy5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIHRvOiB0aGlzLmZyb20sXG4gICAgICAgICAgICAgICAgZnJvbTogdGhpcy50byxcbiAgICAgICAgICAgICAgICBib2R5OiBtZXNzYWdlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlc3VsdF9tZXNzYWdlcy5wdXNoKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlcyB0aGUgY2hlY2staW4gcHJvY2Vzcy5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgY2hlY2staW4gcmVzcG9uc2UuXG4gICAgICovXG4gICAgYXN5bmMgaGFuZGxlKCk6IFByb21pc2U8QlZOU1BSZXNwb25zZT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLl9oYW5kbGUoKTtcbiAgICAgICAgaWYgKCF0aGlzLnNtc19yZXF1ZXN0KSB7XG4gICAgICAgICAgICBpZiAocmVzdWx0Py5yZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0X21lc3NhZ2VzLnB1c2gocmVzdWx0LnJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IHRoaXMucmVzdWx0X21lc3NhZ2VzLmpvaW4oXCJcXG4jIyNcXG5cIiksXG4gICAgICAgICAgICAgICAgbmV4dF9zdGVwOiByZXN1bHQ/Lm5leHRfc3RlcCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbnRlcm5hbCBtZXRob2QgdG8gaGFuZGxlIHRoZSBjaGVjay1pbiBwcm9jZXNzLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBjaGVjay1pbiByZXNwb25zZS5cbiAgICAgKi9cbiAgICBhc3luYyBfaGFuZGxlKCk6IFByb21pc2U8QlZOU1BSZXNwb25zZT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgIGBSZWNlaXZlZCByZXF1ZXN0IGZyb20gJHt0aGlzLmZyb219IHdpdGggYm9keTogJHt0aGlzLmJvZHl9IGFuZCBzdGF0ZSAke3RoaXMuYnZuc3BfbmV4dF9zdGVwfWBcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHRoaXMuYm9keSA9PSBcImxvZ291dFwiKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBsb2dvdXRgKTtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmxvZ291dCgpO1xuICAgICAgICB9XG4gICAgICAgIGxldCByZXNwb25zZTogQlZOU1BSZXNwb25zZSB8IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKCF0aGlzLmNvbmZpZy5VU0VfU0VSVklDRV9BQ0NPVU5UKSB7XG4gICAgICAgICAgICByZXNwb25zZSA9IGF3YWl0IHRoaXMuY2hlY2tfdXNlcl9jcmVkcygpO1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlKSByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYm9keT8udG9Mb3dlckNhc2UoKSA9PT0gXCJyZXN0YXJ0XCIpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHJlc3BvbnNlOiBcIk9rYXkuIFRleHQgbWUgYWdhaW4gdG8gc3RhcnQgb3Zlci4uLlwiIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXNwb25zZSA9IGF3YWl0IHRoaXMuZ2V0X21hcHBlZF9wYXRyb2xsZXIoKTtcbiAgICAgICAgaWYgKHJlc3BvbnNlIHx8IHRoaXMucGF0cm9sbGVyID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UgfHwge1xuICAgICAgICAgICAgICAgICAgICByZXNwb25zZTogXCJVbmV4cGVjdGVkIGVycm9yIGxvb2tpbmcgdXAgcGF0cm9sbGVyIG1hcHBpbmdcIixcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgKCF0aGlzLmJ2bnNwX25leHRfc3RlcCB8fFxuICAgICAgICAgICAgICAgIHRoaXMuYnZuc3BfbmV4dF9zdGVwID09IE5FWFRfU1RFUFMuQVdBSVRfQ09NTUFORCkgJiZcbiAgICAgICAgICAgIHRoaXMuYm9keVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnN0IGF3YWl0X3Jlc3BvbnNlID0gYXdhaXQgdGhpcy5oYW5kbGVfYXdhaXRfY29tbWFuZCgpO1xuICAgICAgICAgICAgaWYgKGF3YWl0X3Jlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0X3Jlc3BvbnNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgdGhpcy5idm5zcF9uZXh0X3N0ZXAgPT0gTkVYVF9TVEVQUy5BV0FJVF9DSEVDS0lOICYmXG4gICAgICAgICAgICB0aGlzLmJvZHlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wYXJzZV9jaGVja2luKHRoaXMuYm9keSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5jaGVja2luKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICB0aGlzLmJ2bnNwX25leHRfc3RlcD8uc3RhcnRzV2l0aChcbiAgICAgICAgICAgICAgICBORVhUX1NURVBTLkNPTkZJUk1fUkVTRVRcbiAgICAgICAgICAgICkgJiZcbiAgICAgICAgICAgIHRoaXMuYm9keVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmJvZHkgPT0gXCJ5ZXNcIiAmJiB0aGlzLnBhcnNlX2NoZWNraW5fZnJvbV9uZXh0X3N0ZXAoKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgICAgICBgUGVyZm9ybWluZyByZXNldF9zaGVldF9mbG93IGZvciAke3RoaXMucGF0cm9sbGVyLm5hbWV9IHdpdGggY2hlY2tpbiBtb2RlOiAke3RoaXMuY2hlY2tpbl9tb2RlfWBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIChhd2FpdCB0aGlzLnJlc2V0X3NoZWV0X2Zsb3coKSkgfHwgKGF3YWl0IHRoaXMuY2hlY2tpbigpKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICB0aGlzLmJ2bnNwX25leHRfc3RlcD8uc3RhcnRzV2l0aChORVhUX1NURVBTLkFVVEhfUkVTRVQpXG4gICAgICAgICkge1xuICAgICAgICAgICAgaWYgKHRoaXMucGFyc2VfY2hlY2tpbl9mcm9tX25leHRfc3RlcCgpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgICAgIGBQZXJmb3JtaW5nIHJlc2V0X3NoZWV0X2Zsb3ctcG9zdC1hdXRoIGZvciAke3RoaXMucGF0cm9sbGVyLm5hbWV9IHdpdGggY2hlY2tpbiBtb2RlOiAke3RoaXMuY2hlY2tpbl9tb2RlfWBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIChhd2FpdCB0aGlzLnJlc2V0X3NoZWV0X2Zsb3coKSkgfHwgKGF3YWl0IHRoaXMuY2hlY2tpbigpKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICB0aGlzLmJ2bnNwX25leHRfc3RlcD8uc3RhcnRzV2l0aChORVhUX1NURVBTLkFXQUlUX1BBU1MpICYmXG4gICAgICAgICAgICB0aGlzLmJvZHlfcmF3XG4gICAgICAgICkge1xuICAgICAgICAgICAgY29uc3QgZ3Vlc3RfbmFtZSA9IHRoaXMuYm9keV9yYXc7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgZ3Vlc3RfbmFtZS50cmltKCkgIT09IFwiXCJcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnByb21wdF9ndWVzdF9wYXNzKGd1ZXN0X25hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgdGhpcy5idm5zcF9uZXh0X3N0ZXA/LnN0YXJ0c1dpdGgoTkVYVF9TVEVQUy5BV0FJVF9TRUNUSU9OKSAmJlxuICAgICAgICAgICAgdGhpcy5ib2R5XG4gICAgICAgICkge1xuICAgICAgICAgICAgY29uc3Qgc2VjdGlvbiA9IHRoaXMuc2VjdGlvbl92YWx1ZXMucGFyc2Vfc2VjdGlvbih0aGlzLmJvZHkpXG4gICAgICAgICAgICBpZiAoc2VjdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmFzc2lnbl9zZWN0aW9uKHNlY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucHJvbXB0X3NlY3Rpb25fYXNzaWdubWVudCgpO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgdGhpcy5idm5zcF9uZXh0X3N0ZXAgPT09IE5FWFRfU1RFUFMuQVdBSVRfTUVTU0FHRSAmJlxuICAgICAgICAgICAgdGhpcy5ib2R5X3Jhd1xuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnNlbmRfdGV4dF9tZXNzYWdlKHRoaXMuYm9keV9yYXcpO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgdGhpcy5idm5zcF9uZXh0X3N0ZXAgPT09IE5FWFRfU1RFUFMuQVdBSVRfQlJPQURDQVNUICYmXG4gICAgICAgICAgICB0aGlzLmJvZHlfcmF3XG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuc2VuZF9icm9hZGNhc3RfbWVzc2FnZSh0aGlzLmJvZHlfcmF3KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmJ2bnNwX25leHRfc3RlcCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5zZW5kX21lc3NhZ2UoXCJTb3JyeSwgSSBkaWRuJ3QgdW5kZXJzdGFuZCB0aGF0LlwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wcm9tcHRfY29tbWFuZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgdGhlIGF3YWl0IGNvbW1hbmQgc3RlcC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlIHwgdW5kZWZpbmVkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcmVzcG9uc2Ugb3IgdW5kZWZpbmVkLlxuICAgICAqL1xuICAgIGFzeW5jIGhhbmRsZV9hd2FpdF9jb21tYW5kKCk6IFByb21pc2U8QlZOU1BSZXNwb25zZSB8IHVuZGVmaW5lZD4ge1xuICAgICAgICBjb25zdCBwYXRyb2xsZXJfbmFtZSA9IHRoaXMucGF0cm9sbGVyIS5uYW1lO1xuICAgICAgICBpZiAodGhpcy5wYXJzZV9mYXN0X2NoZWNraW5fbW9kZSh0aGlzLmJvZHkhKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgYFBlcmZvcm1pbmcgZmFzdCBjaGVja2luIGZvciAke3BhdHJvbGxlcl9uYW1lfSB3aXRoIG1vZGU6ICR7dGhpcy5jaGVja2luX21vZGV9YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmNoZWNraW4oKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQ09NTUFORFMuT05fRFVUWS5pbmNsdWRlcyh0aGlzLmJvZHkhKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmZvcm1pbmcgZ2V0X29uX2R1dHkgZm9yICR7cGF0cm9sbGVyX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4geyByZXNwb25zZTogYXdhaXQgdGhpcy5nZXRfb25fZHV0eSgpIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJDaGVja2luZyBmb3Igc3RhdHVzLi4uXCIpO1xuICAgICAgICBpZiAoQ09NTUFORFMuU1RBVFVTLmluY2x1ZGVzKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBnZXRfc3RhdHVzIGZvciAke3BhdHJvbGxlcl9uYW1lfWApO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X3N0YXR1cygpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDT01NQU5EUy5DSEVDS0lOLmluY2x1ZGVzKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBwcm9tcHRfY2hlY2tpbiBmb3IgJHtwYXRyb2xsZXJfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb21wdF9jaGVja2luKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKENPTU1BTkRTLkdVRVNUX1BBU1MuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIGd1ZXN0X3Bhc3MgZm9yICR7cGF0cm9sbGVyX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5wcm9tcHRfZ3Vlc3RfcGFzcyhcbiAgICAgICAgICAgICAgICBudWxsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnBhcnNlX2Zhc3Rfc2VjdGlvbl9hc3NpZ25tZW50KHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBmYXN0IHNlY3Rpb25fYXNzaWdubWVudCBmb3IgJHtwYXRyb2xsZXJfbmFtZX0gdG8gJHt0aGlzLmFzc2lnbmVkX3NlY3Rpb259YCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5hc3NpZ25fc2VjdGlvbih0aGlzLmFzc2lnbmVkX3NlY3Rpb24pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDT01NQU5EUy5TRUNUSU9OX0FTU0lHTk1FTlQuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIHNlY3Rpb25fYXNzaWdubWVudCBmb3IgJHtwYXRyb2xsZXJfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnByb21wdF9zZWN0aW9uX2Fzc2lnbm1lbnQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQ09NTUFORFMuV0hBVFNBUFAuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBJJ20gYXZhaWxhYmxlIG9uIHdoYXRzYXBwIGFzIHdlbGwhIFdoYXRzYXBwIHVzZXMgV2lmaS9DZWxsIERhdGEgaW5zdGVhZCBvZiBTTVMsIGFuZCBjYW4gYmUgbW9yZSByZWxpYWJsZS4gTWVzc2FnZSBtZSBhdCBodHRwczovL3dhLm1lLzEke3RoaXMudG99YCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKENPTU1BTkRTLk1FU1NBR0UuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIG1lc3NhZ2UgZm9yICR7cGF0cm9sbGVyX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5wcm9tcHRfbWVzc2FnZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDT01NQU5EUy5CUk9BRENBU1QuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIGJyb2FkY2FzdCBmb3IgJHtwYXRyb2xsZXJfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnByb21wdF9icm9hZGNhc3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb21wdHMgdGhlIHVzZXIgZm9yIGEgY29tbWFuZC5cbiAgICAgKiBAcmV0dXJucyB7QlZOU1BSZXNwb25zZX0gVGhlIHJlc3BvbnNlIHByb21wdGluZyB0aGUgdXNlciBmb3IgYSBjb21tYW5kLlxuICAgICAqL1xuICAgIHByb21wdF9jb21tYW5kKCk6IEJWTlNQUmVzcG9uc2Uge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IGAke3RoaXMucGF0cm9sbGVyIS5uYW1lfSwgSSdtIHRoZSBCVk5TUCBCb3QuXG5FbnRlciBhIGNvbW1hbmQ6XG5DaGVjayBpbiAvIENoZWNrIG91dCAvIFN0YXR1cyAvIE9uIER1dHkgLyBTZWN0aW9uIEFzc2lnbm1lbnQgLyBHdWVzdCBQYXNzIC8gTWVzc2FnZSAvIFdoYXRzYXBwXG5TZW5kICdyZXN0YXJ0JyBhdCBhbnkgdGltZSB0byBiZWdpbiBhZ2FpbmAsXG4gICAgICAgICAgICBuZXh0X3N0ZXA6IE5FWFRfU1RFUFMuQVdBSVRfQ09NTUFORCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm9tcHRzIHRoZSB1c2VyIGZvciBhIGNoZWNrLWluLlxuICAgICAqIEByZXR1cm5zIHtCVk5TUFJlc3BvbnNlfSBUaGUgcmVzcG9uc2UgcHJvbXB0aW5nIHRoZSB1c2VyIGZvciBhIGNoZWNrLWluLlxuICAgICAqL1xuICAgIHByb21wdF9jaGVja2luKCk6IEJWTlNQUmVzcG9uc2Uge1xuICAgICAgICBjb25zdCB0eXBlcyA9IE9iamVjdC52YWx1ZXModGhpcy5jaGVja2luX3ZhbHVlcy5ieV9rZXkpLm1hcChcbiAgICAgICAgICAgICh4KSA9PiB4LnNtc19kZXNjXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZTogYCR7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXIhLm5hbWVcbiAgICAgICAgICAgIH0sIHVwZGF0ZSBwYXRyb2xsaW5nIHN0YXR1cyB0bzogJHt0eXBlc1xuICAgICAgICAgICAgICAgIC5zbGljZSgwLCAtMSlcbiAgICAgICAgICAgICAgICAuam9pbihcIiwgXCIpfSwgb3IgJHt0eXBlcy5zbGljZSgtMSl9P2AsXG4gICAgICAgICAgICBuZXh0X3N0ZXA6IE5FWFRfU1RFUFMuQVdBSVRfQ0hFQ0tJTixcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIFBhcnNlcyB0aGUgZmFzdCBzZWN0aW9uIGFzc2lnbm1lbnQgZnJvbSB0aGUgbWVzc2FnZSBib2R5LlxuICAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHkgLSBUaGUgbWVzc2FnZSBib2R5LlxuICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNlY3Rpb24gYXNzaWdubWVudCBpcyBwYXJzZWQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAqL1xuICAgIHBhcnNlX2Zhc3Rfc2VjdGlvbl9hc3NpZ25tZW50KGJvZHk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHRoaXMuYXNzaWduZWRfc2VjdGlvbiA9IG51bGw7XG4gICAgaWYgKCFib2R5IHx8ICFib2R5LmluY2x1ZGVzKFwiLVwiKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHNlZ21lbnRzID0gYm9keS5zcGxpdChcIi1cIik7XG4gICAgY29uc3QgbGFzdFNlZ21lbnQgPSBzZWdtZW50cy5wb3AoKTtcbiAgICBjb25zdCBmaXJzdFBhcnQgPSBzZWdtZW50cy5qb2luKFwiLVwiKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgaWYgKGxhc3RTZWdtZW50ICYmIENPTU1BTkRTLlNFQ1RJT05fQVNTSUdOTUVOVC5pbmNsdWRlcyhmaXJzdFBhcnQpKSB7XG4gICAgICAgIHRoaXMuYXNzaWduZWRfc2VjdGlvbiA9IHRoaXMuc2VjdGlvbl92YWx1ZXMubWFwX3NlY3Rpb24obGFzdFNlZ21lbnQudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgIHJldHVybiB0aGlzLmFzc2lnbmVkX3NlY3Rpb24gIT09IG51bGwgJiYgdGhpcy5hc3NpZ25lZF9zZWN0aW9uICE9PSBcIlwiO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvbXB0cyB0aGUgdXNlciBmb3Igc2VjdGlvbiBhc3NpZ25tZW50LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSByZXNwb25zZS5cbiAgICAgKi9cbiAgICBhc3luYyBwcm9tcHRfc2VjdGlvbl9hc3NpZ25tZW50KCk6IFByb21pc2U8QlZOU1BSZXNwb25zZT4ge1xuICAgICAgICBpZiAoIXRoaXMucGF0cm9sbGVyIHx8ICF0aGlzLnBhdHJvbGxlci5jaGVja2luKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgJHt0aGlzLnBhdHJvbGxlciEubmFtZX0gaXMgbm90IGNoZWNrZWQgaW4uYCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2VjdGlvbl9kZXNjcmlwdGlvbiA9IHRoaXMuc2VjdGlvbl92YWx1ZXMuZ2V0X3NlY3Rpb25fZGVzY3JpcHRpb24oKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3BvbnNlOiBgRW50ZXIgeW91ciBhc3NpZ25lZCBzZWN0aW9uOyBvbmUgb2YgJHtzZWN0aW9uX2Rlc2NyaXB0aW9ufSAob3IgJ3Jlc3RhcnQnKWAsXG4gICAgICAgICAgICBuZXh0X3N0ZXA6IE5FWFRfU1RFUFMuQVdBSVRfU0VDVElPTixcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCdWlsZHMgdGhlIG1lc3NhZ2UgcHJlZml4IGZvciBhIHRleHQgbWVzc2FnZSBmcm9tIGEgcGF0cm9sbGVyLlxuICAgICAqIEluY2x1ZGVzIHRoZSBzZW5kZXIncyBuYW1lIGFuZCBmb3JtYXR0ZWQgcGhvbmUgbnVtYmVyLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZW5kZXJfbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwYXRyb2xsZXIgc2VuZGluZyB0aGUgbWVzc2FnZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VuZGVyX3Bob25lIC0gVGhlIHNlbmRlcidzIDEwLWRpZ2l0IHBob25lIG51bWJlci5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgbWVzc2FnZSBwcmVmaXggKGUuZy4sIFwiTWVzc2FnZSBmcm9tIEpvaG4gRG9lICgxMjMpNDU2LTc4OTA6IFwiKS5cbiAgICAgKi9cbiAgICBnZXRfbWVzc2FnZV9wcmVmaXgoc2VuZGVyX25hbWU6IHN0cmluZywgc2VuZGVyX3Bob25lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBmb3JtYXR0ZWRfcGhvbmUgPSBmb3JtYXRfcGhvbmVfZm9yX2Rpc3BsYXkoc2VuZGVyX3Bob25lKTtcbiAgICAgICAgcmV0dXJuIGAke01FU1NBR0VfUFJFRklYX1RFTVBMQVRFfSR7c2VuZGVyX25hbWV9ICR7Zm9ybWF0dGVkX3Bob25lfSR7TUVTU0FHRV9QUkVGSVhfU1VGRklYfWA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlcyB0aGUgbWF4aW11bSBhbGxvd2VkIG1lc3NhZ2UgbGVuZ3RoIGZvciBhIHRleHQgbWVzc2FnZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VuZGVyX25hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcGF0cm9sbGVyIHNlbmRpbmcgdGhlIG1lc3NhZ2UuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbmRlcl9waG9uZSAtIFRoZSBzZW5kZXIncyAxMC1kaWdpdCBwaG9uZSBudW1iZXIuXG4gICAgICogQHJldHVybnMge251bWJlcn0gVGhlIG1heGltdW0gbnVtYmVyIG9mIGNoYXJhY3RlcnMgdGhlIHVzZXIncyBtZXNzYWdlIGNhbiBjb250YWluLlxuICAgICAqL1xuICAgIGdldF9tYXhfbWVzc2FnZV9sZW5ndGgoc2VuZGVyX25hbWU6IHN0cmluZywgc2VuZGVyX3Bob25lOiBzdHJpbmcpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gU01TX01BWF9MRU5HVEggLSB0aGlzLmdldF9tZXNzYWdlX3ByZWZpeChzZW5kZXJfbmFtZSwgc2VuZGVyX3Bob25lKS5sZW5ndGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvbXB0cyB0aGUgdXNlciB0byB0eXBlIHRoZWlyIHRleHQgbWVzc2FnZS5cbiAgICAgKiBBbnkgcGF0cm9sbGVyIHdpdGggYSB2YWxpZCBwaG9uZSBudW1iZXIgY2FuIHNlbmQgYSBtZXNzYWdlLCByZWdhcmRsZXNzXG4gICAgICogb2YgdGhlaXIgb3duIGNoZWNrLWluIHN0YXR1cy4gIFRoZSByZWNpcGllbnQgbGlzdCBpbmNsdWRlcyBhbGxcbiAgICAgKiBwYXRyb2xsZXJzIHdobyBoYXZlIGFueSBjaGVjay1pbiBzdGF0dXMgKEFsbCBEYXksIEhhbGYgQU0sIEhhbGYgUE0sXG4gICAgICogb3IgQ2hlY2tlZCBPdXQpLCBpbmNsdWRpbmcgdGhlIHNlbmRlciB0aGVtc2VsdmVzIGlmIHRoZXkgYXJlIGNoZWNrZWQgaW4uXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHByb21wdCByZXNwb25zZS5cbiAgICAgKi9cbiAgICBhc3luYyBwcm9tcHRfbWVzc2FnZSgpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuICAgICAgICBjb25zdCByZWNpcGllbnRzID0gbG9naW5fc2hlZXQuZ2V0X29uX2R1dHlfcGF0cm9sbGVycygpO1xuICAgICAgICBpZiAocmVjaXBpZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBObyBwYXRyb2xsZXJzIGFyZSBjdXJyZW50bHkgbG9nZ2VkIGluLiBUaGVyZSBpcyBub2JvZHkgdG8gc2VuZCBhIG1lc3NhZ2UgdG8uYCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2VuZGVyX3Bob25lID0gc2FuaXRpemVfcGhvbmVfbnVtYmVyKHRoaXMuZnJvbSk7XG4gICAgICAgIGNvbnN0IG1heF9sZW5ndGggPSB0aGlzLmdldF9tYXhfbWVzc2FnZV9sZW5ndGgodGhpcy5wYXRyb2xsZXIhLm5hbWUsIHNlbmRlcl9waG9uZSk7XG4gICAgICAgIGlmIChtYXhfbGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBZb3VyIG5hbWUgaXMgdG9vIGxvbmcgdG8gc2VuZCBhIHRleHQgbWVzc2FnZS5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IGBQbGVhc2UgdHlwZSBhIG1lc3NhZ2Ugb2Ygbm8gbW9yZSB0aGFuICR7bWF4X2xlbmd0aH0gcGxhaW4tdGV4dCBjaGFyYWN0ZXJzIHRvICR7cmVjaXBpZW50cy5sZW5ndGh9IHBhdHJvbGxlciR7cmVjaXBpZW50cy5sZW5ndGggIT09IDEgPyBcInNcIiA6IFwiXCJ9LCBvciAncmVzdGFydCcgdG8gY2FuY2VsLmAsXG4gICAgICAgICAgICBuZXh0X3N0ZXA6IE5FWFRfU1RFUFMuQVdBSVRfTUVTU0FHRSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kcyBhIHRleHQgbWVzc2FnZSB0byBhbGwgcGF0cm9sbGVycyB3aXRoIGEgY2hlY2staW4gc3RhdHVzIGZvciB0aGUgZGF5LlxuICAgICAqIFRoZSBzZW5kZXIgYWxzbyByZWNlaXZlcyB0aGUgbWVzc2FnZSBpZiB0aGV5IGhhdmUgYSBjaGVjay1pbiBzdGF0dXMuXG4gICAgICogVmFsaWRhdGVzIHRoYXQgdGhlIGNvbXBsZXRlIG1lc3NhZ2UgKHByZWZpeCArIGJvZHkpIHVzZXMgb25seSBHU00tN1xuICAgICAqIGNoYXJhY3RlcnMgYW5kIGZpdHMgd2l0aGluIGEgc2luZ2xlIFNNUyBzZWdtZW50LCB1c2luZyB0aGVcbiAgICAgKiBzbXMtc2VnbWVudHMtY2FsY3VsYXRvciBsaWJyYXJ5LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlX3RleHQgLSBUaGUgcmF3IG1lc3NhZ2UgdGV4dCBmcm9tIHRoZSBzZW5kZXIuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHNlbmQgcmVzdWx0LlxuICAgICAqL1xuICAgIGFzeW5jIHNlbmRfdGV4dF9tZXNzYWdlKG1lc3NhZ2VfdGV4dDogc3RyaW5nKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnN0IHNlbmRlcl9uYW1lID0gdGhpcy5wYXRyb2xsZXIhLm5hbWU7XG4gICAgICAgIGNvbnN0IHNlbmRlcl9waG9uZSA9IHNhbml0aXplX3Bob25lX251bWJlcih0aGlzLmZyb20pO1xuICAgICAgICBjb25zdCBwcmVmaXggPSB0aGlzLmdldF9tZXNzYWdlX3ByZWZpeChzZW5kZXJfbmFtZSwgc2VuZGVyX3Bob25lKTtcbiAgICAgICAgY29uc3QgbWF4X2xlbmd0aCA9IHRoaXMuZ2V0X21heF9tZXNzYWdlX2xlbmd0aChzZW5kZXJfbmFtZSwgc2VuZGVyX3Bob25lKTtcbiAgICAgICAgY29uc3QgZnVsbF9tZXNzYWdlID0gcHJlZml4ICsgbWVzc2FnZV90ZXh0O1xuXG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb24gPSB2YWxpZGF0ZV9zbXNfbWVzc2FnZShmdWxsX21lc3NhZ2UpO1xuICAgICAgICBpZiAoIXZhbGlkYXRpb24udmFsaWQpIHtcbiAgICAgICAgICAgIGlmICh2YWxpZGF0aW9uLnJlYXNvbiA9PT0gXCJub25fZ3NtN1wiKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYmFkX2NoYXJzID0gdmFsaWRhdGlvbi5ub25fZ3NtX2NoYXJhY3RlcnMhLmpvaW4oXCIgXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgWW91ciBtZXNzYWdlIGNvbnRhaW5zIGNoYXJhY3RlcnMgdGhhdCBhcmUgbm90IHN1cHBvcnRlZCBpbiBwbGFpbi10ZXh0IFNNUzogJHtiYWRfY2hhcnN9LiBQbGVhc2UgdXNlIG9ubHkgc3RhbmRhcmQgY2hhcmFjdGVycyBhbmQgdHJ5IGFnYWluLmAsXG4gICAgICAgICAgICAgICAgICAgIG5leHRfc3RlcDogTkVYVF9TVEVQUy5BV0FJVF9NRVNTQUdFLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgWW91ciBtZXNzYWdlIGlzICR7bWVzc2FnZV90ZXh0Lmxlbmd0aH0gY2hhcmFjdGVycywgd2hpY2ggZXhjZWVkcyB0aGUgbGltaXQgb2YgJHttYXhfbGVuZ3RofS4gUGxlYXNlIHNob3J0ZW4geW91ciBtZXNzYWdlIGFuZCB0cnkgYWdhaW4sIG9yIHR5cGUgJ3Jlc3RhcnQnIHRvIGNhbmNlbC5gLFxuICAgICAgICAgICAgICAgIG5leHRfc3RlcDogTkVYVF9TVEVQUy5BV0FJVF9NRVNTQUdFLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKTtcbiAgICAgICAgY29uc3Qgc2lnbmVkX2luX3BhdHJvbGxlcnMgPSBsb2dpbl9zaGVldC5nZXRfb25fZHV0eV9wYXRyb2xsZXJzKCk7XG4gICAgICAgIGNvbnN0IHBob25lX21hcCA9IGF3YWl0IHRoaXMuZ2V0X3Bob25lX251bWJlcl9tYXAoKTtcblxuICAgICAgICAvLyBCdWlsZCByZWNpcGllbnQgbWFwIGZvciBvbi1kdXR5IHBhdHJvbGxlcnMgd2l0aCBrbm93biBwaG9uZXM7IHRyYWNrIG1pc3NpbmdcbiAgICAgICAgY29uc3QgcmVjaXBpZW50X21hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xuICAgICAgICBjb25zdCBub19waG9uZV9uYW1lczogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBwYXRyb2xsZXIgb2Ygc2lnbmVkX2luX3BhdHJvbGxlcnMpIHtcbiAgICAgICAgICAgIGNvbnN0IHBob25lID0gcGhvbmVfbWFwW3BhdHJvbGxlci5uYW1lXTtcbiAgICAgICAgICAgIGlmIChwaG9uZSkge1xuICAgICAgICAgICAgICAgIHJlY2lwaWVudF9tYXBbcGF0cm9sbGVyLm5hbWVdID0gcGhvbmU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vX3Bob25lX25hbWVzLnB1c2gocGF0cm9sbGVyLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgeyBzZW50X2NvdW50LCBjb3B5X3NlbnRfdG9fc2VuZGVyLCBmYWlsZWRfbmFtZXMgfSA9XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmRlbGl2ZXJfc21zX3RvX21hcChyZWNpcGllbnRfbWFwLCBmdWxsX21lc3NhZ2UsIHNlbmRlcl9uYW1lKTtcblxuICAgICAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oYHRleHRfbWVzc2FnZSgke3NlbnRfY291bnQgKyAoY29weV9zZW50X3RvX3NlbmRlciA/IDEgOiAwKX0pYCk7XG5cbiAgICAgICAgbGV0IHJlc3BvbnNlID0gYE1lc3NhZ2Ugc2VudCB0byAke3NlbnRfY291bnR9IHBhdHJvbGxlciR7c2VudF9jb3VudCAhPT0gMSA/IFwic1wiIDogXCJcIn1gO1xuICAgICAgICBpZiAoY29weV9zZW50X3RvX3NlbmRlcikge1xuICAgICAgICAgICAgcmVzcG9uc2UgKz0gYCBhbmQgYSBjb3B5IHRvIHlvdS5gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzcG9uc2UgKz0gYC5gO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFsbF9mYWlsZWQgPSBbLi4ubm9fcGhvbmVfbmFtZXMsIC4uLmZhaWxlZF9uYW1lc107XG4gICAgICAgIGlmIChhbGxfZmFpbGVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJlc3BvbnNlICs9IGAgQ291bGQgbm90IHNlbmQgdG86ICR7YWxsX2ZhaWxlZC5qb2luKFwiLCBcIil9LmA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgcmVzcG9uc2UgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb3JlIFNNUyBkZWxpdmVyeSBsb29wLiBTZW5kcyBmdWxsX21lc3NhZ2UgdG8gZWFjaCBlbnRyeSBpbiByZWNpcGllbnRfbWFwXG4gICAgICogKG5hbWUg4oaSIFwiKzFYWFhYWFhYWFhYXCIpLiBJZiB0aGUgc2VuZGVyJ3MgcGhvbmUgaXMgbm90IGFtb25nIHRoZSByZWNpcGllbnRzLFxuICAgICAqIGEgY29weSBpcyBzZW50IHRvIHRoaXMuZnJvbS4gUmV0dXJucyBkZWxpdmVyeSBhY2NvdW50aW5nIGRhdGEuXG4gICAgICogQHBhcmFtIHtSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+fSByZWNpcGllbnRfbWFwIC0gTWFwIG9mIHBhdHJvbGxlciBuYW1lIHRvIFwiKzFYWFhYWFhYWFhYXCIgcGhvbmUuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZ1bGxfbWVzc2FnZSAtIFRoZSBjb21wbGV0ZSBmb3JtYXR0ZWQgU01TIHRvIHNlbmQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbmRlcl9uYW1lIC0gVGhlIHNlbmRlcidzIG5hbWUgKHVzZWQgZm9yIGZhaWx1cmUgbG9nZ2luZykuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8b2JqZWN0Pn0gRGVsaXZlcnkgY291bnRzIGFuZCBmYWlsdXJlIGxpc3QuXG4gICAgICovXG4gICAgYXN5bmMgZGVsaXZlcl9zbXNfdG9fbWFwKFxuICAgICAgICByZWNpcGllbnRfbWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+LFxuICAgICAgICBmdWxsX21lc3NhZ2U6IHN0cmluZyxcbiAgICAgICAgc2VuZGVyX25hbWU6IHN0cmluZyxcbiAgICApOiBQcm9taXNlPHsgc2VudF9jb3VudDogbnVtYmVyOyBjb3B5X3NlbnRfdG9fc2VuZGVyOiBib29sZWFuOyBmYWlsZWRfbmFtZXM6IHN0cmluZ1tdIH0+IHtcbiAgICAgICAgbGV0IHNlbnRfY291bnQgPSAwO1xuICAgICAgICBjb25zdCBmYWlsZWRfbmFtZXM6IHN0cmluZ1tdID0gW107XG5cbiAgICAgICAgZm9yIChjb25zdCBbbmFtZSwgcGhvbmVdIG9mIE9iamVjdC5lbnRyaWVzKHJlY2lwaWVudF9tYXApKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0X3R3aWxpb19jbGllbnQoKS5tZXNzYWdlcy5jcmVhdGUoe1xuICAgICAgICAgICAgICAgICAgICB0bzogcGhvbmUsXG4gICAgICAgICAgICAgICAgICAgIGZyb206IHRoaXMudG8sXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IGZ1bGxfbWVzc2FnZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzZW50X2NvdW50Kys7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYEZhaWxlZCB0byBzZW5kIFNNUyB0byAke25hbWV9OiAke2V9YCk7XG4gICAgICAgICAgICAgICAgZmFpbGVkX25hbWVzLnB1c2gobmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZW5kIGEgY29weSB0byB0aGUgc2VuZGVyIGlmIHRoZWlyIG51bWJlciBpcyBub3QgYWxyZWFkeSBpbiB0aGUgcmVjaXBpZW50IG1hcFxuICAgICAgICBjb25zdCBub3JtYWxpemVkX3NlbmRlciA9IGArMSR7c2FuaXRpemVfcGhvbmVfbnVtYmVyKHRoaXMuZnJvbSl9YDtcbiAgICAgICAgY29uc3Qgc2VuZGVyX2luX21hcCA9IE9iamVjdC52YWx1ZXMocmVjaXBpZW50X21hcCkuaW5jbHVkZXMobm9ybWFsaXplZF9zZW5kZXIpO1xuICAgICAgICBsZXQgY29weV9zZW50X3RvX3NlbmRlciA9IGZhbHNlO1xuICAgICAgICBpZiAoIXNlbmRlcl9pbl9tYXApIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXRfdHdpbGlvX2NsaWVudCgpLm1lc3NhZ2VzLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHRvOiB0aGlzLmZyb20sXG4gICAgICAgICAgICAgICAgICAgIGZyb206IHRoaXMudG8sXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IGZ1bGxfbWVzc2FnZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb3B5X3NlbnRfdG9fc2VuZGVyID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgRmFpbGVkIHRvIHNlbmQgU01TIGNvcHkgdG8gc2VuZGVyICR7c2VuZGVyX25hbWV9OiAke2V9YCk7XG4gICAgICAgICAgICAgICAgZmFpbGVkX25hbWVzLnB1c2goc2VuZGVyX25hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHsgc2VudF9jb3VudCwgY29weV9zZW50X3RvX3NlbmRlciwgZmFpbGVkX25hbWVzIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvbXB0cyB0aGUgdXNlciB0byB0eXBlIGEgYnJvYWRjYXN0IG1lc3NhZ2UgdG8gYWxsIHBhdHJvbGxlcnMuXG4gICAgICogVW5saWtlIHRoZSBtZXNzYWdlIGNvbW1hbmQgKHdoaWNoIHRhcmdldHMgb25seSBsb2dnZWQtaW4gcGF0cm9sbGVycyksIGJyb2FkY2FzdFxuICAgICAqIHNlbmRzIHRvIGV2ZXJ5IHBhdHJvbGxlciBpbiB0aGUgUGhvbmUgTnVtYmVycyBzaGVldC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcHJvbXB0IHJlc3BvbnNlLlxuICAgICAqL1xuICAgIGFzeW5jIHByb21wdF9icm9hZGNhc3QoKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnN0IHBob25lX21hcCA9IGF3YWl0IHRoaXMuZ2V0X3Bob25lX251bWJlcl9tYXAoKTtcbiAgICAgICAgY29uc3QgcmVjaXBpZW50X2NvdW50ID0gT2JqZWN0LmtleXMocGhvbmVfbWFwKS5sZW5ndGg7XG4gICAgICAgIGlmIChyZWNpcGllbnRfY291bnQgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBObyBwYXRyb2xsZXJzIHdpdGggcGhvbmUgbnVtYmVycyBmb3VuZC4gVGhlcmUgaXMgbm9ib2R5IHRvIGJyb2FkY2FzdCB0by5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZW5kZXJfcGhvbmUgPSBzYW5pdGl6ZV9waG9uZV9udW1iZXIodGhpcy5mcm9tKTtcbiAgICAgICAgY29uc3QgbWF4X2xlbmd0aCA9IHRoaXMuZ2V0X21heF9tZXNzYWdlX2xlbmd0aCh0aGlzLnBhdHJvbGxlciEubmFtZSwgc2VuZGVyX3Bob25lKTtcbiAgICAgICAgaWYgKG1heF9sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYFlvdXIgbmFtZSBpcyB0b28gbG9uZyB0byBzZW5kIGEgYnJvYWRjYXN0IG1lc3NhZ2UuYCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3BvbnNlOiBgUGxlYXNlIHR5cGUgYSBicm9hZGNhc3QgbWVzc2FnZSBvZiBubyBtb3JlIHRoYW4gJHttYXhfbGVuZ3RofSBwbGFpbi10ZXh0IGNoYXJhY3RlcnMgdG8gJHtyZWNpcGllbnRfY291bnR9IHBhdHJvbGxlciR7cmVjaXBpZW50X2NvdW50ICE9PSAxID8gXCJzXCIgOiBcIlwifSwgb3IgJ3Jlc3RhcnQnIHRvIGNhbmNlbC5gLFxuICAgICAgICAgICAgbmV4dF9zdGVwOiBORVhUX1NURVBTLkFXQUlUX0JST0FEQ0FTVCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kcyBhIGJyb2FkY2FzdCBtZXNzYWdlIHRvIEFMTCBwYXRyb2xsZXJzIGluIHRoZSBQaG9uZSBOdW1iZXJzIHNoZWV0LFxuICAgICAqIHJlZ2FyZGxlc3Mgb2YgY2hlY2staW4gc3RhdHVzLiBVc2VzIHRoZSBzYW1lIHByZWZpeCBmb3JtYXQgYW5kIEdTTS03IC8gc2luZ2xlLXNlZ21lbnRcbiAgICAgKiB2YWxpZGF0aW9uIGFzIHRoZSBtZXNzYWdlIGNvbW1hbmQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VfdGV4dCAtIFRoZSByYXcgbWVzc2FnZSB0ZXh0IGZyb20gdGhlIHNlbmRlci5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgc2VuZCByZXN1bHQuXG4gICAgICovXG4gICAgYXN5bmMgc2VuZF9icm9hZGNhc3RfbWVzc2FnZShtZXNzYWdlX3RleHQ6IHN0cmluZyk6IFByb21pc2U8QlZOU1BSZXNwb25zZT4ge1xuICAgICAgICBjb25zdCBzZW5kZXJfbmFtZSA9IHRoaXMucGF0cm9sbGVyIS5uYW1lO1xuICAgICAgICBjb25zdCBzZW5kZXJfcGhvbmUgPSBzYW5pdGl6ZV9waG9uZV9udW1iZXIodGhpcy5mcm9tKTtcbiAgICAgICAgY29uc3QgcHJlZml4ID0gdGhpcy5nZXRfbWVzc2FnZV9wcmVmaXgoc2VuZGVyX25hbWUsIHNlbmRlcl9waG9uZSk7XG4gICAgICAgIGNvbnN0IG1heF9sZW5ndGggPSB0aGlzLmdldF9tYXhfbWVzc2FnZV9sZW5ndGgoc2VuZGVyX25hbWUsIHNlbmRlcl9waG9uZSk7XG4gICAgICAgIGNvbnN0IGZ1bGxfbWVzc2FnZSA9IHByZWZpeCArIG1lc3NhZ2VfdGV4dDtcblxuICAgICAgICBjb25zdCB2YWxpZGF0aW9uID0gdmFsaWRhdGVfc21zX21lc3NhZ2UoZnVsbF9tZXNzYWdlKTtcbiAgICAgICAgaWYgKCF2YWxpZGF0aW9uLnZhbGlkKSB7XG4gICAgICAgICAgICBpZiAodmFsaWRhdGlvbi5yZWFzb24gPT09IFwibm9uX2dzbTdcIikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJhZF9jaGFycyA9IHZhbGlkYXRpb24ubm9uX2dzbV9jaGFyYWN0ZXJzIS5qb2luKFwiIFwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICByZXNwb25zZTogYFlvdXIgbWVzc2FnZSBjb250YWlucyBjaGFyYWN0ZXJzIHRoYXQgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gcGxhaW4tdGV4dCBTTVM6ICR7YmFkX2NoYXJzfS4gUGxlYXNlIHVzZSBvbmx5IHN0YW5kYXJkIGNoYXJhY3RlcnMgYW5kIHRyeSBhZ2Fpbi5gLFxuICAgICAgICAgICAgICAgICAgICBuZXh0X3N0ZXA6IE5FWFRfU1RFUFMuQVdBSVRfQlJPQURDQVNULFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgWW91ciBtZXNzYWdlIGlzICR7bWVzc2FnZV90ZXh0Lmxlbmd0aH0gY2hhcmFjdGVycywgd2hpY2ggZXhjZWVkcyB0aGUgbGltaXQgb2YgJHttYXhfbGVuZ3RofS4gUGxlYXNlIHNob3J0ZW4geW91ciBtZXNzYWdlIGFuZCB0cnkgYWdhaW4sIG9yIHR5cGUgJ3Jlc3RhcnQnIHRvIGNhbmNlbC5gLFxuICAgICAgICAgICAgICAgIG5leHRfc3RlcDogTkVYVF9TVEVQUy5BV0FJVF9CUk9BRENBU1QsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRm9yIGJyb2FkY2FzdCwgc2VuZCB0byBBTEwgcGF0cm9sbGVycyBpbiB0aGUgcGhvbmUgbnVtYmVyIG1hcFxuICAgICAgICBjb25zdCBwaG9uZV9tYXAgPSBhd2FpdCB0aGlzLmdldF9waG9uZV9udW1iZXJfbWFwKCk7XG4gICAgICAgIGNvbnN0IHsgc2VudF9jb3VudCwgY29weV9zZW50X3RvX3NlbmRlciwgZmFpbGVkX25hbWVzIH0gPVxuICAgICAgICAgICAgYXdhaXQgdGhpcy5kZWxpdmVyX3Ntc190b19tYXAocGhvbmVfbWFwLCBmdWxsX21lc3NhZ2UsIHNlbmRlcl9uYW1lKTtcblxuICAgICAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oYGJyb2FkY2FzdCgke3NlbnRfY291bnQgKyAoY29weV9zZW50X3RvX3NlbmRlciA/IDEgOiAwKX0pYCk7XG5cbiAgICAgICAgbGV0IHJlc3BvbnNlID0gYEJyb2FkY2FzdCBzZW50IHRvICR7c2VudF9jb3VudH0gcGF0cm9sbGVyJHtzZW50X2NvdW50ICE9PSAxID8gXCJzXCIgOiBcIlwifWA7XG4gICAgICAgIGlmIChjb3B5X3NlbnRfdG9fc2VuZGVyKSB7XG4gICAgICAgICAgICByZXNwb25zZSArPSBgIGFuZCBhIGNvcHkgdG8geW91LmA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNwb25zZSArPSBgLmA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZmFpbGVkX25hbWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJlc3BvbnNlICs9IGAgQ291bGQgbm90IHNlbmQgdG86ICR7ZmFpbGVkX25hbWVzLmpvaW4oXCIsIFwiKX0uYDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyByZXNwb25zZSB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvb2tzIHVwIHBob25lIG51bWJlcnMgZm9yIGFsbCBwYXRyb2xsZXJzIGZyb20gdGhlIFBob25lIE51bWJlcnMgc2hlZXQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8UmVjb3JkPHN0cmluZywgc3RyaW5nPj59IEEgbWFwIG9mIHBhdHJvbGxlciBuYW1lIHRvIHBob25lIG51bWJlciAoaW4gKzFYWFhYWFhYWFhYIGZvcm1hdCkuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3Bob25lX251bWJlcl9tYXAoKTogUHJvbWlzZTxSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+PiB7XG4gICAgICAgIGNvbnN0IHNoZWV0c19zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfc2hlZXRzX3NlcnZpY2UoKTtcbiAgICAgICAgY29uc3Qgb3B0czogRmluZFBhdHJvbGxlckNvbmZpZyA9IHRoaXMuY29tYmluZWRfY29uZmlnO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHNoZWV0c19zZXJ2aWNlLnNwcmVhZHNoZWV0cy52YWx1ZXMuZ2V0KHtcbiAgICAgICAgICAgIHNwcmVhZHNoZWV0SWQ6IG9wdHMuU0hFRVRfSUQsXG4gICAgICAgICAgICByYW5nZTogb3B0cy5QSE9ORV9OVU1CRVJfTE9PS1VQX1NIRUVULFxuICAgICAgICAgICAgdmFsdWVSZW5kZXJPcHRpb246IFwiVU5GT1JNQVRURURfVkFMVUVcIixcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghcmVzcG9uc2UuZGF0YS52YWx1ZXMpIHtcbiAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBtYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCByb3cgb2YgcmVzcG9uc2UuZGF0YS52YWx1ZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSByb3dbZXhjZWxfcm93X3RvX2luZGV4KG9wdHMuUEhPTkVfTlVNQkVSX05BTUVfQ09MVU1OKV07XG4gICAgICAgICAgICBjb25zdCByYXdOdW1iZXIgPSByb3dbZXhjZWxfcm93X3RvX2luZGV4KG9wdHMuUEhPTkVfTlVNQkVSX05VTUJFUl9DT0xVTU4pXTtcbiAgICAgICAgICAgIGlmIChuYW1lICYmIHJhd051bWJlcikge1xuICAgICAgICAgICAgICAgIG1hcFtuYW1lXSA9IGArMSR7c2FuaXRpemVfcGhvbmVfbnVtYmVyKHJhd051bWJlcil9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWFwO1xuICAgIH1cblxuLyoqXG4gKiBBc3NpZ25zIHRoZSBzZWN0aW9uIHRvIHRoZSBwYXRyb2xsZXIuXG4gKiBAcGFyYW0ge3N0cmluZyB8IG51bGx9IHNlY3Rpb24gLSBUaGUgc2VjdGlvbiB0byBhc3NpZ24uXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcmVzcG9uc2UuXG4gKi9cbmFzeW5jIGFzc2lnbl9zZWN0aW9uKHNlY3Rpb246IHN0cmluZyB8IG51bGwpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICBjb25zdCBhc3NpZ25lZFNlY3Rpb24gPSBzZWN0aW9uID8/IFwiUm92aW5nXCI7XG4gICAgY29uc29sZS5sb2coYEFzc2lnbmluZyBzZWN0aW9uICR7dGhpcy5wYXRyb2xsZXIhLm5hbWV9IHRvICR7YXNzaWduZWRTZWN0aW9ufWApO1xuICAgIGNvbnN0IG1hcHBlZF9zZWN0aW9uID0gdGhpcy5zZWN0aW9uX3ZhbHVlcy5tYXBfc2VjdGlvbihhc3NpZ25lZFNlY3Rpb24pO1xuICAgIGF3YWl0IHRoaXMubG9nX2FjdGlvbihgYXNzaWduX3NlY3Rpb24oJHttYXBwZWRfc2VjdGlvbn0pYCk7XG4gICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuICAgIGF3YWl0IGxvZ2luX3NoZWV0LmFzc2lnbl9zZWN0aW9uKHRoaXMucGF0cm9sbGVyISwgbWFwcGVkX3NlY3Rpb24pO1xuICAgIGF3YWl0IHRoaXMubG9naW5fc2hlZXQ/LnJlZnJlc2goKTtcbiAgICBhd2FpdCB0aGlzLmdldF9tYXBwZWRfcGF0cm9sbGVyKHRydWUpO1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3BvbnNlOiBgVXBkYXRlZCAke3RoaXMucGF0cm9sbGVyIS5uYW1lfSB3aXRoIHNlY3Rpb24gYXNzaWdubWVudDogJHttYXBwZWRfc2VjdGlvbn0uYCxcbiAgICB9O1xufVxuXG4gICAgLyoqXG4gICAgICogUHJvbXB0cyB0aGUgdXNlciBmb3IgYSBjb21wIG9yIG1hbmFnZXIgcGFzcy5cbiAgICAgKiBAcGFyYW0ge251bWJlciB8IG51bGx9IHBhc3Nlc190b191c2UgLSBUaGUgbnVtYmVyIG9mIHBhc3NlcyB0byB1c2UuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHJlc3BvbnNlLlxuICAgICAqL1xuICAgIGFzeW5jIHByb21wdF9ndWVzdF9wYXNzKFxuICAgICAgICBndWVzdF9uYW1lOiBzdHJpbmcgfCBudWxsXG4gICAgKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlPiB7XG4gICAgICAgIGlmICh0aGlzLnBhdHJvbGxlciEuY2F0ZWdvcnkgPT0gXCJDXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGAke1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICAgICAgICAgIH0sIGNhbmRpZGF0ZXMgZG8gbm90IHJlY2VpdmUgY29tcCBvciBtYW5hZ2VyIHBhc3Nlcy5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzaGVldDogUGFzc1NoZWV0ID0gYXdhaXQgdGhpcy5nZXRfZ3Vlc3RfcGFzc19zaGVldCgpO1xuXG4gICAgICAgIGNvbnN0IHVzZWRfYW5kX2F2YWlsYWJsZSA9IGF3YWl0IHNoZWV0LmdldF9hdmFpbGFibGVfYW5kX3VzZWRfcGFzc2VzKFxuICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXI/Lm5hbWUhXG4gICAgICAgICk7XG4gICAgICAgIGlmICh1c2VkX2FuZF9hdmFpbGFibGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogXCJQcm9ibGVtIGxvb2tpbmcgdXAgcGF0cm9sbGVyIGZvciBndWVzdCBwYXNzZXNcIixcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGd1ZXN0X25hbWUgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHVzZWRfYW5kX2F2YWlsYWJsZS5nZXRfcHJvbXB0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhd2FpdCBzaGVldC5zZXRfdXNlZF9ndWVzdF9wYXNzZXModXNlZF9hbmRfYXZhaWxhYmxlLCBndWVzdF9uYW1lKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBVcGRhdGVkICR7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyIS5uYW1lXG4gICAgICAgICAgICAgICAgfSB0byB1c2UgYSBwYXNzIGZvciBndWVzdCBcIiR7Z3Vlc3RfbmFtZX1cIiB0b2RheS5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHN0YXR1cyBvZiB0aGUgcGF0cm9sbGVyLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBzdGF0dXMgcmVzcG9uc2UuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3N0YXR1cygpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuICAgICAgICBjb25zdCBzaGVldF9kYXRlID0gbG9naW5fc2hlZXQuc2hlZXRfZGF0ZS50b0RhdGVTdHJpbmcoKTtcbiAgICAgICAgY29uc3QgY3VycmVudF9kYXRlID0gbG9naW5fc2hlZXQuY3VycmVudF9kYXRlLnRvRGF0ZVN0cmluZygpO1xuICAgICAgICBpZiAoIWxvZ2luX3NoZWV0LmlzX2N1cnJlbnQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBzaGVldF9kYXRlOiAke2xvZ2luX3NoZWV0LnNoZWV0X2RhdGV9YCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgY3VycmVudF9kYXRlOiAke2xvZ2luX3NoZWV0LmN1cnJlbnRfZGF0ZX1gKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBTaGVldCBpcyBub3QgY3VycmVudCBmb3IgdG9kYXkgKGxhc3QgcmVzZXQ6ICR7c2hlZXRfZGF0ZX0pLiAke1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICAgICAgICAgIH0gaXMgbm90IGNoZWNrZWQgaW4gZm9yICR7Y3VycmVudF9kYXRlfS5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXNwb25zZSA9IHsgcmVzcG9uc2U6IGF3YWl0IHRoaXMuZ2V0X3N0YXR1c19zdHJpbmcoKSB9O1xuICAgICAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oXCJzdGF0dXNcIik7XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBzdGF0dXMgc3RyaW5nIG9mIHRoZSBwYXRyb2xsZXIuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c3RyaW5nPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgc3RhdHVzIHN0cmluZy5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfc3RhdHVzX3N0cmluZygpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG4gICAgICAgIGNvbnN0IGd1ZXN0X3Bhc3NfcHJvbWlzZSA9IChcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0X2d1ZXN0X3Bhc3Nfc2hlZXQoKVxuICAgICAgICApLmdldF9hdmFpbGFibGVfYW5kX3VzZWRfcGFzc2VzKHRoaXMucGF0cm9sbGVyIS5uYW1lKTtcbiAgICAgICAgY29uc3QgcGF0cm9sbGVyX3N0YXR1cyA9IHRoaXMucGF0cm9sbGVyITtcblxuICAgICAgICBjb25zdCBjaGVja2luQ29sdW1uU2V0ID1cbiAgICAgICAgICAgIHBhdHJvbGxlcl9zdGF0dXMuY2hlY2tpbiAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICBwYXRyb2xsZXJfc3RhdHVzLmNoZWNraW4gIT09IG51bGw7XG4gICAgICAgIGNvbnN0IGNoZWNrZWRPdXQgPVxuICAgICAgICAgICAgY2hlY2tpbkNvbHVtblNldCAmJlxuICAgICAgICAgICAgdGhpcy5jaGVja2luX3ZhbHVlcy5ieV9zaGVldF9zdHJpbmdbcGF0cm9sbGVyX3N0YXR1cy5jaGVja2luXS5rZXkgPT1cbiAgICAgICAgICAgICAgICBcIm91dFwiO1xuICAgICAgICBsZXQgc3RhdHVzID0gcGF0cm9sbGVyX3N0YXR1cy5jaGVja2luIHx8IFwiTm90IFByZXNlbnRcIjtcblxuICAgICAgICBpZiAoY2hlY2tlZE91dCkge1xuICAgICAgICAgICAgc3RhdHVzID0gXCJDaGVja2VkIE91dFwiO1xuICAgICAgICB9IGVsc2UgaWYgKGNoZWNraW5Db2x1bW5TZXQpIHtcbiAgICAgICAgICAgIGxldCBzZWN0aW9uID0gcGF0cm9sbGVyX3N0YXR1cy5zZWN0aW9uLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBpZiAoc2VjdGlvbi5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgICAgIHNlY3Rpb24gPSBgU2VjdGlvbiAke3NlY3Rpb259YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0YXR1cyA9IGAke3BhdHJvbGxlcl9zdGF0dXMuY2hlY2tpbn0gKCR7c2VjdGlvbn0pYDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbXBsZXRlZFBhdHJvbERheXMgPSBhd2FpdCAoXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmdldF9zZWFzb25fc2hlZXQoKVxuICAgICAgICApLmdldF9wYXRyb2xsZWRfZGF5cyh0aGlzLnBhdHJvbGxlciEubmFtZSk7XG4gICAgICAgIGNvbnN0IGNvbXBsZXRlZFBhdHJvbERheXNTdHJpbmcgPVxuICAgICAgICAgICAgY29tcGxldGVkUGF0cm9sRGF5cyA+IDAgPyBjb21wbGV0ZWRQYXRyb2xEYXlzLnRvU3RyaW5nKCkgOiBcIk5vXCI7XG4gICAgICAgIGNvbnN0IGxvZ2luU2hlZXREYXRlID0gbG9naW5fc2hlZXQuc2hlZXRfZGF0ZS50b0RhdGVTdHJpbmcoKTtcblxuICAgICAgICBsZXQgc3RhdHVzU3RyaW5nID0gYFN0YXR1cyBmb3IgJHtcbiAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyIS5uYW1lXG4gICAgICAgIH0gb24gZGF0ZSAke2xvZ2luU2hlZXREYXRlfTogJHtzdGF0dXN9LlxcbiR7Y29tcGxldGVkUGF0cm9sRGF5c1N0cmluZ30gY29tcGxldGVkIHBhdHJvbCBkYXlzIHByaW9yIHRvIHRvZGF5LmA7XG4gICAgICAgIGNvbnN0IHVzZWRUb2RheUd1ZXN0UGFzc2VzID0gKGF3YWl0IGd1ZXN0X3Bhc3NfcHJvbWlzZSk/LnVzZWRfdG9kYXkgfHwgMDtcbiAgICAgICAgY29uc3QgdXNlZFNlYXNvbkd1ZXN0UGFzc2VzID1cbiAgICAgICAgICAgIChhd2FpdCBndWVzdF9wYXNzX3Byb21pc2UpPy51c2VkX3NlYXNvbiB8fCAwO1xuICAgICAgICBjb25zdCBhdmFpbGFibGVHdWVzdFBhc3NlcyA9IChhd2FpdCBndWVzdF9wYXNzX3Byb21pc2UpPy5hdmFpbGFibGUgfHwgMDtcblxuXG4gICAgICAgIHN0YXR1c1N0cmluZyArPVxuICAgICAgICAgICAgXCIgXCIgK1xuICAgICAgICAgICAgYnVpbGRfcGFzc2VzX3N0cmluZyhcbiAgICAgICAgICAgICAgICB1c2VkU2Vhc29uR3Vlc3RQYXNzZXMsXG4gICAgICAgICAgICAgICAgdXNlZFNlYXNvbkd1ZXN0UGFzc2VzICsgYXZhaWxhYmxlR3Vlc3RQYXNzZXMsXG4gICAgICAgICAgICAgICAgdXNlZFRvZGF5R3Vlc3RQYXNzZXNcbiAgICAgICAgICAgICk7XG4gICAgICAgIHJldHVybiBzdGF0dXNTdHJpbmc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgdGhlIGNoZWNrLWluIHByb2Nlc3MgZm9yIHRoZSBwYXRyb2xsZXIgb25jZSB0aGUgY2hlY2staW4gbW9kZSBpcyBzZXQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGNoZWNrLWluIHJlc3BvbnNlLlxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBUaHJvd3MgYW4gZXJyb3IgaWYgdGhlIGNoZWNrLWluIG1vZGUgaXMgaW1wcm9wZXJseSBzZXQuXG4gICAgICovXG4gICAgYXN5bmMgY2hlY2tpbigpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICBgUGVyZm9ybWluZyByZWd1bGFyIGNoZWNraW4gZm9yICR7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXIhLm5hbWVcbiAgICAgICAgICAgIH0gd2l0aCBtb2RlOiAke3RoaXMuY2hlY2tpbl9tb2RlfWBcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGF3YWl0IHRoaXMuc2hlZXRfbmVlZHNfcmVzZXQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTpcbiAgICAgICAgICAgICAgICAgICAgYCR7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICAgICAgICAgICAgICB9LCB5b3UgYXJlIHRoZSBmaXJzdCBwZXJzb24gdG8gY2hlY2sgaW4gdG9kYXkuIGAgK1xuICAgICAgICAgICAgICAgICAgICBgSSBuZWVkIHRvIGFyY2hpdmUgYW5kIHJlc2V0IHRoZSBzaGVldCBiZWZvcmUgY29udGludWluZy4gYCArXG4gICAgICAgICAgICAgICAgICAgIGBXb3VsZCB5b3UgbGlrZSBtZSB0byBkbyB0aGF0PyAoWWVzL05vKWAsXG4gICAgICAgICAgICAgICAgbmV4dF9zdGVwOiBgJHtORVhUX1NURVBTLkNPTkZJUk1fUkVTRVR9LSR7dGhpcy5jaGVja2luX21vZGV9YCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNoZWNraW5fbW9kZTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgIXRoaXMuY2hlY2tpbl9tb2RlIHx8XG4gICAgICAgICAgICAoY2hlY2tpbl9tb2RlID0gdGhpcy5jaGVja2luX3ZhbHVlcy5ieV9rZXlbdGhpcy5jaGVja2luX21vZGVdKSA9PT1cbiAgICAgICAgICAgICAgICB1bmRlZmluZWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDaGVja2luIG1vZGUgaW1wcm9wZXJseSBzZXRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG4gICAgICAgIGNvbnN0IG5ld19jaGVja2luX3ZhbHVlID0gY2hlY2tpbl9tb2RlLnNoZWV0c192YWx1ZTtcbiAgICAgICAgYXdhaXQgbG9naW5fc2hlZXQuY2hlY2tpbih0aGlzLnBhdHJvbGxlciEsIG5ld19jaGVja2luX3ZhbHVlKTtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKGB1cGRhdGUtc3RhdHVzKCR7bmV3X2NoZWNraW5fdmFsdWV9KWApO1xuICAgICAgICBhd2FpdCB0aGlzLmxvZ2luX3NoZWV0Py5yZWZyZXNoKCk7XG4gICAgICAgIGF3YWl0IHRoaXMuZ2V0X21hcHBlZF9wYXRyb2xsZXIodHJ1ZSk7XG5cbiAgICAgICAgbGV0IHJlc3BvbnNlID0gYFVwZGF0aW5nICR7XG4gICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICB9IHdpdGggc3RhdHVzOiAke25ld19jaGVja2luX3ZhbHVlfS5gO1xuICAgICAgICBpZiAoIXRoaXMuZmFzdF9jaGVja2luKSB7XG4gICAgICAgICAgICByZXNwb25zZSArPSBgIFlvdSBjYW4gc2VuZCAnJHtjaGVja2luX21vZGUuZmFzdF9jaGVja2luc1swXX0nIGFzIHlvdXIgZmlyc3QgbWVzc2FnZSBmb3IgYSBmYXN0ICR7Y2hlY2tpbl9tb2RlLnNoZWV0c192YWx1ZX0gY2hlY2tpbiBuZXh0IHRpbWUuYDtcbiAgICAgICAgfVxuICAgICAgICByZXNwb25zZSArPSBcIlxcblxcblwiICsgKGF3YWl0IHRoaXMuZ2V0X3N0YXR1c19zdHJpbmcoKSk7XG4gICAgICAgIHJldHVybiB7IHJlc3BvbnNlOiByZXNwb25zZSB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGUgR29vZ2xlIFNoZWV0cyBuZWVkcyB0byBiZSByZXNldC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdHJ1ZSBpZiB0aGUgc2hlZXQgbmVlZHMgdG8gYmUgcmVzZXQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKi9cbiAgICBhc3luYyBzaGVldF9uZWVkc19yZXNldCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuXG4gICAgICAgIGNvbnN0IHNoZWV0X2RhdGUgPSBsb2dpbl9zaGVldC5zaGVldF9kYXRlO1xuICAgICAgICBjb25zdCBjdXJyZW50X2RhdGUgPSBsb2dpbl9zaGVldC5jdXJyZW50X2RhdGU7XG4gICAgICAgIGNvbnNvbGUubG9nKGBzaGVldF9kYXRlOiAke3NoZWV0X2RhdGV9YCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBjdXJyZW50X2RhdGU6ICR7Y3VycmVudF9kYXRlfWApO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGBkYXRlX2lzX2N1cnJlbnQ6ICR7bG9naW5fc2hlZXQuaXNfY3VycmVudH1gKTtcblxuICAgICAgICByZXR1cm4gIWxvZ2luX3NoZWV0LmlzX2N1cnJlbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzZXRzIHRoZSBHb29nbGUgU2hlZXRzIGZsb3csIGluY2x1ZGluZyBhcmNoaXZpbmcgYW5kIHJlc2V0dGluZyB0aGUgc2hlZXQgaWYgbmVjZXNzYXJ5LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2UgfCB2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgY2hlY2staW4gcmVzcG9uc2Ugb3Igdm9pZC5cbiAgICAgKi9cbiAgICBhc3luYyByZXNldF9zaGVldF9mbG93KCk6IFByb21pc2U8QlZOU1BSZXNwb25zZSB8IHZvaWQ+IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmNoZWNrX3VzZXJfY3JlZHMoXG4gICAgICAgICAgICBgJHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICAgICAgfSwgaW4gb3JkZXIgdG8gcmVzZXQvYXJjaGl2ZSwgSSBuZWVkIHlvdSB0byBhdXRob3JpemUgdGhlIGFwcC5gXG4gICAgICAgICk7XG4gICAgICAgIGlmIChyZXNwb25zZSlcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IHJlc3BvbnNlLnJlc3BvbnNlLFxuICAgICAgICAgICAgICAgIG5leHRfc3RlcDogYCR7TkVYVF9TVEVQUy5BVVRIX1JFU0VUfS0ke3RoaXMuY2hlY2tpbl9tb2RlfWAsXG4gICAgICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5yZXNldF9zaGVldCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc2V0cyB0aGUgR29vZ2xlIFNoZWV0cywgaW5jbHVkaW5nIGFyY2hpdmluZyBhbmQgcmVzZXR0aW5nIHRoZSBzaGVldC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgc2hlZXQgaXMgcmVzZXQuXG4gICAgICovXG4gICAgYXN5bmMgcmVzZXRfc2hlZXQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IHNjcmlwdF9zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfdXNlcl9zY3JpcHRzX3NlcnZpY2UoKTtcbiAgICAgICAgY29uc3Qgc2hvdWxkX3BlcmZvcm1fYXJjaGl2ZSA9ICEoYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKSkuYXJjaGl2ZWQ7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBzaG91bGRfcGVyZm9ybV9hcmNoaXZlXG4gICAgICAgICAgICA/IFwiT2theS4gQXJjaGl2aW5nIGFuZCByZXNldGluZyB0aGUgY2hlY2sgaW4gc2hlZXQuIFRoaXMgdGFrZXMgYWJvdXQgMTAgc2Vjb25kcy4uLlwiXG4gICAgICAgICAgICA6IFwiT2theS4gU2hlZXQgaGFzIGFscmVhZHkgYmVlbiBhcmNoaXZlZC4gUGVyZm9ybWluZyByZXNldC4gVGhpcyB0YWtlcyBhYm91dCA1IHNlY29uZHMuLi5cIjtcbiAgICAgICAgYXdhaXQgdGhpcy5zZW5kX21lc3NhZ2UobWVzc2FnZSk7XG4gICAgICAgIGlmIChzaG91bGRfcGVyZm9ybV9hcmNoaXZlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkFyY2hpdmluZy4uLlwiKTtcblxuICAgICAgICAgICAgYXdhaXQgc2NyaXB0X3NlcnZpY2Uuc2NyaXB0cy5ydW4oe1xuICAgICAgICAgICAgICAgIHNjcmlwdElkOiB0aGlzLnJlc2V0X3NjcmlwdF9pZCxcbiAgICAgICAgICAgICAgICByZXF1ZXN0Qm9keTogeyBmdW5jdGlvbjogdGhpcy5jb25maWcuQVJDSElWRV9GVU5DVElPTl9OQU1FIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZGVsYXkoNSk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oXCJhcmNoaXZlXCIpO1xuICAgICAgICAgICAgdGhpcy5sb2dpbl9zaGVldCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZyhcIlJlc2V0dGluZy4uLlwiKTtcbiAgICAgICAgYXdhaXQgc2NyaXB0X3NlcnZpY2Uuc2NyaXB0cy5ydW4oe1xuICAgICAgICAgICAgc2NyaXB0SWQ6IHRoaXMucmVzZXRfc2NyaXB0X2lkLFxuICAgICAgICAgICAgcmVxdWVzdEJvZHk6IHsgZnVuY3Rpb246IHRoaXMuY29uZmlnLlJFU0VUX0ZVTkNUSU9OX05BTUUgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIGF3YWl0IHRoaXMuZGVsYXkoNSk7XG4gICAgICAgIGF3YWl0IHRoaXMubG9nX2FjdGlvbihcInJlc2V0XCIpO1xuICAgICAgICBhd2FpdCB0aGlzLnNlbmRfbWVzc2FnZShcIkRvbmUuXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIEdvb2dsZSBBcHBzIFNjcmlwdCBzZXJ2aWNlLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHNjcmlwdF92MS5TY3JpcHQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBHb29nbGUgQXBwcyBTY3JpcHQgc2VydmljZS5cbiAgICAgKi9cbiAgICBhc3luYyBjaGVja191c2VyX2NyZWRzKFxuICAgICAgICBwcm9tcHRfbWVzc2FnZTogc3RyaW5nID0gXCJIaSwgYmVmb3JlIHlvdSBjYW4gdXNlIEJWTlNQIGJvdCwgeW91IG11c3QgbG9naW4uXCJcbiAgICApOiBQcm9taXNlPEJWTlNQUmVzcG9uc2UgfCB1bmRlZmluZWQ+IHtcbiAgICAgICAgY29uc3QgdXNlcl9jcmVkcyA9IHRoaXMuZ2V0X3VzZXJfY3JlZHMoKTtcbiAgICAgICAgaWYgKCEoYXdhaXQgdXNlcl9jcmVkcy5sb2FkVG9rZW4oKSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGF1dGhVcmwgPSBhd2FpdCB1c2VyX2NyZWRzLmdldEF1dGhVcmwoKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGAke3Byb21wdF9tZXNzYWdlfSBQbGVhc2UgZm9sbG93IHRoaXMgbGluazpcbiR7YXV0aFVybH1cblxuTWVzc2FnZSBtZSBhZ2FpbiB3aGVuIGRvbmUuYCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBHb29nbGUgQXBwcyBTY3JpcHQgc2VydmljZS5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzY3JpcHRfdjEuU2NyaXB0Pn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgR29vZ2xlIEFwcHMgU2NyaXB0IHNlcnZpY2UuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X29uX2R1dHkoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgY29uc3QgY2hlY2tlZF9vdXRfc2VjdGlvbiA9IFwiQ2hlY2tlZCBPdXRcIjtcbiAgICAgICAgY29uc3QgbGFzdF9zZWN0aW9ucyA9IFtjaGVja2VkX291dF9zZWN0aW9uXTtcbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuXG4gICAgICAgIGNvbnN0IG9uX2R1dHlfcGF0cm9sbGVycyA9IGxvZ2luX3NoZWV0LmdldF9vbl9kdXR5X3BhdHJvbGxlcnMoKTtcbiAgICAgICAgY29uc3QgYnlfc2VjdGlvbiA9IG9uX2R1dHlfcGF0cm9sbGVyc1xuICAgICAgICAgICAgLmZpbHRlcigoeCkgPT4geC5jaGVja2luKVxuICAgICAgICAgICAgLnJlZHVjZSgocHJldjogeyBba2V5OiBzdHJpbmddOiBQYXRyb2xsZXJSb3dbXSB9LCBjdXIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzaG9ydF9jb2RlID1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja2luX3ZhbHVlcy5ieV9zaGVldF9zdHJpbmdbY3VyLmNoZWNraW5dLmtleTtcbiAgICAgICAgICAgICAgICBsZXQgc2VjdGlvbiA9IGN1ci5zZWN0aW9uO1xuICAgICAgICAgICAgICAgIGlmIChzaG9ydF9jb2RlID09IFwib3V0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VjdGlvbiA9IGNoZWNrZWRfb3V0X3NlY3Rpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghKHNlY3Rpb24gaW4gcHJldikpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldltzZWN0aW9uXSA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwcmV2W3NlY3Rpb25dLnB1c2goY3VyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJldjtcbiAgICAgICAgICAgIH0sIHt9KTtcbiAgICAgICAgbGV0IHJlc3VsdHM6IHN0cmluZ1tdW10gPSBbXTtcbiAgICAgICAgbGV0IGFsbF9rZXlzID0gT2JqZWN0LmtleXMoYnlfc2VjdGlvbik7XG4gICAgICAgIGNvbnN0IG9yZGVyZWRfcHJpbWFyeV9zZWN0aW9ucyA9IE9iamVjdC5rZXlzKGJ5X3NlY3Rpb24pXG4gICAgICAgICAgICAuZmlsdGVyKCh4KSA9PiAhbGFzdF9zZWN0aW9ucy5pbmNsdWRlcyh4KSlcbiAgICAgICAgICAgIC5zb3J0KCk7XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkX2xhc3Rfc2VjdGlvbnMgPSBsYXN0X3NlY3Rpb25zLmZpbHRlcigoeCkgPT5cbiAgICAgICAgICAgIGFsbF9rZXlzLmluY2x1ZGVzKHgpXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IG9yZGVyZWRfc2VjdGlvbnMgPSBvcmRlcmVkX3ByaW1hcnlfc2VjdGlvbnMuY29uY2F0KFxuICAgICAgICAgICAgZmlsdGVyZWRfbGFzdF9zZWN0aW9uc1xuICAgICAgICApO1xuXG4gICAgICAgIGZvciAoY29uc3Qgc2VjdGlvbiBvZiBvcmRlcmVkX3NlY3Rpb25zKSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0OiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICAgICAgY29uc3QgcGF0cm9sbGVycyA9IGJ5X3NlY3Rpb25bc2VjdGlvbl0uc29ydCgoeCwgeSkgPT5cbiAgICAgICAgICAgICAgICB4Lm5hbWUubG9jYWxlQ29tcGFyZSh5Lm5hbWUpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKHNlY3Rpb24ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goXCJTZWN0aW9uIFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGAke3NlY3Rpb259OiBgKTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIHBhdHJvbGxlcl9zdHJpbmcobmFtZTogc3RyaW5nLCBzaG9ydF9jb2RlOiBzdHJpbmcpIHtcbiAgICAgICAgICAgICAgICBsZXQgZGV0YWlscyA9IFwiXCI7XG4gICAgICAgICAgICAgICAgaWYgKHNob3J0X2NvZGUgIT09IFwiZGF5XCIgJiYgc2hvcnRfY29kZSAhPT0gXCJvdXRcIikge1xuICAgICAgICAgICAgICAgICAgICBkZXRhaWxzID0gYCAoJHtzaG9ydF9jb2RlLnRvVXBwZXJDYXNlKCl9KWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBgJHtuYW1lfSR7ZGV0YWlsc31gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0LnB1c2goXG4gICAgICAgICAgICAgICAgcGF0cm9sbGVyc1xuICAgICAgICAgICAgICAgICAgICAubWFwKCh4KSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0cm9sbGVyX3N0cmluZyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja2luX3ZhbHVlcy5ieV9zaGVldF9zdHJpbmdbeC5jaGVja2luXS5rZXlcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAuam9pbihcIiwgXCIpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKFwib24tZHV0eVwiKTtcbiAgICAgICAgcmV0dXJuIGBQYXRyb2xsZXJzIGZvciAke2xvZ2luX3NoZWV0LnNoZWV0X2RhdGUudG9EYXRlU3RyaW5nKCl9IChUb3RhbDogJHtcbiAgICAgICAgICAgIG9uX2R1dHlfcGF0cm9sbGVycy5sZW5ndGhcbiAgICAgICAgfSk6XFxuJHtyZXN1bHRzLm1hcCgocikgPT4gci5qb2luKFwiXCIpKS5qb2luKFwiXFxuXCIpfWA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9ncyBhbiBhY3Rpb24gdG8gdGhlIEdvb2dsZSBTaGVldHMuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGFjdGlvbl9uYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGFjdGlvbiB0byBsb2cuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGFjdGlvbiBpcyBsb2dnZWQuXG4gICAgICovXG4gICAgYXN5bmMgbG9nX2FjdGlvbihhY3Rpb25fbmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHNoZWV0c19zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfc2hlZXRzX3NlcnZpY2UoKTtcbiAgICAgICAgYXdhaXQgc2hlZXRzX3NlcnZpY2Uuc3ByZWFkc2hlZXRzLnZhbHVlcy5hcHBlbmQoe1xuICAgICAgICAgICAgc3ByZWFkc2hlZXRJZDogdGhpcy5jb21iaW5lZF9jb25maWcuU0hFRVRfSUQsXG4gICAgICAgICAgICByYW5nZTogdGhpcy5jb25maWcuQUNUSU9OX0xPR19TSEVFVCxcbiAgICAgICAgICAgIHZhbHVlSW5wdXRPcHRpb246IFwiVVNFUl9FTlRFUkVEXCIsXG4gICAgICAgICAgICByZXF1ZXN0Qm9keToge1xuICAgICAgICAgICAgICAgIHZhbHVlczogW1t0aGlzLnBhdHJvbGxlciEubmFtZSwgbmV3IERhdGUoKSwgYWN0aW9uX25hbWVdXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvZ3Mgb3V0IHRoZSB1c2VyLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBsb2dvdXQgcmVzcG9uc2UuXG4gICAgICovXG4gICAgYXN5bmMgbG9nb3V0KCk6IFByb21pc2U8QlZOU1BSZXNwb25zZT4ge1xuICAgICAgICBjb25zdCB1c2VyX2NyZWRzID0gdGhpcy5nZXRfdXNlcl9jcmVkcygpO1xuICAgICAgICBhd2FpdCB1c2VyX2NyZWRzLmRlbGV0ZVRva2VuKCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZTogXCJPa2F5LCBJIGhhdmUgcmVtb3ZlZCBhbGwgbG9naW4gc2Vzc2lvbiBpbmZvcm1hdGlvbi5cIixcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBUd2lsaW8gY2xpZW50LlxuICAgICAqIEByZXR1cm5zIHtUd2lsaW9DbGllbnR9IFRoZSBUd2lsaW8gY2xpZW50LlxuICAgICAqL1xuICAgIGdldF90d2lsaW9fY2xpZW50KCkge1xuICAgICAgICBpZiAodGhpcy50d2lsaW9fY2xpZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInR3aWxpb19jbGllbnQgd2FzIG5ldmVyIGluaXRpYWxpemVkIVwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy50d2lsaW9fY2xpZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIFR3aWxpbyBTeW5jIGNsaWVudC5cbiAgICAgKiBAcmV0dXJucyB7U2VydmljZUNvbnRleHR9IFRoZSBUd2lsaW8gU3luYyBjbGllbnQuXG4gICAgICovXG4gICAgZ2V0X3N5bmNfY2xpZW50KCkge1xuICAgICAgICBpZiAoIXRoaXMuc3luY19jbGllbnQpIHtcbiAgICAgICAgICAgIHRoaXMuc3luY19jbGllbnQgPSB0aGlzLmdldF90d2lsaW9fY2xpZW50KCkuc3luYy5zZXJ2aWNlcyhcbiAgICAgICAgICAgICAgICB0aGlzLnN5bmNfc2lkXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnN5bmNfY2xpZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHVzZXIgY3JlZGVudGlhbHMuXG4gICAgICogQHJldHVybnMge1VzZXJDcmVkc30gVGhlIHVzZXIgY3JlZGVudGlhbHMuXG4gICAgICovXG4gICAgZ2V0X3VzZXJfY3JlZHMoKSB7XG4gICAgICAgIGlmICghdGhpcy51c2VyX2NyZWRzKSB7XG4gICAgICAgICAgICB0aGlzLnVzZXJfY3JlZHMgPSBuZXcgVXNlckNyZWRzKFxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0X3N5bmNfY2xpZW50KCksXG4gICAgICAgICAgICAgICAgdGhpcy5mcm9tLFxuICAgICAgICAgICAgICAgIHRoaXMuY29tYmluZWRfY29uZmlnXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJfY3JlZHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgc2VydmljZSBjcmVkZW50aWFscy5cbiAgICAgKiBAcmV0dXJucyB7R29vZ2xlQXV0aH0gVGhlIHNlcnZpY2UgY3JlZGVudGlhbHMuXG4gICAgICovXG4gICAgZ2V0X3NlcnZpY2VfY3JlZHMoKSB7XG4gICAgICAgIGlmICghdGhpcy5zZXJ2aWNlX2NyZWRzKSB7XG4gICAgICAgICAgICB0aGlzLnNlcnZpY2VfY3JlZHMgPSBuZXcgZ29vZ2xlLmF1dGguR29vZ2xlQXV0aCh7XG4gICAgICAgICAgICAgICAga2V5RmlsZTogZ2V0X3NlcnZpY2VfY3JlZGVudGlhbHNfcGF0aCgpLFxuICAgICAgICAgICAgICAgIHNjb3BlczogdGhpcy5TQ09QRVMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlX2NyZWRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHZhbGlkIGNyZWRlbnRpYWxzLlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW3JlcXVpcmVfdXNlcl9jcmVkcz1mYWxzZV0gLSBXaGV0aGVyIHVzZXIgY3JlZGVudGlhbHMgYXJlIHJlcXVpcmVkLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEdvb2dsZUF1dGg+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSB2YWxpZCBjcmVkZW50aWFscy5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfdmFsaWRfY3JlZHMocmVxdWlyZV91c2VyX2NyZWRzOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLlVTRV9TRVJWSUNFX0FDQ09VTlQgJiYgIXJlcXVpcmVfdXNlcl9jcmVkcykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X3NlcnZpY2VfY3JlZHMoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1c2VyX2NyZWRzID0gdGhpcy5nZXRfdXNlcl9jcmVkcygpO1xuICAgICAgICBpZiAoIShhd2FpdCB1c2VyX2NyZWRzLmxvYWRUb2tlbigpKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVXNlciBpcyBub3QgYXV0aGVkLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhcIlVzaW5nIHVzZXIgYWNjb3VudCBmb3Igc2VydmljZSBhdXRoLi4uXCIpO1xuICAgICAgICByZXR1cm4gdXNlcl9jcmVkcy5vYXV0aDJfY2xpZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIEdvb2dsZSBTaGVldHMgc2VydmljZS5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzaGVldHNfdjQuU2hlZXRzPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgR29vZ2xlIFNoZWV0cyBzZXJ2aWNlLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF9zaGVldHNfc2VydmljZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNoZWV0c19zZXJ2aWNlKSB7XG4gICAgICAgICAgICB0aGlzLnNoZWV0c19zZXJ2aWNlID0gZ29vZ2xlLnNoZWV0cyh7XG4gICAgICAgICAgICAgICAgdmVyc2lvbjogXCJ2NFwiLFxuICAgICAgICAgICAgICAgIGF1dGg6IGF3YWl0IHRoaXMuZ2V0X3ZhbGlkX2NyZWRzKCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zaGVldHNfc2VydmljZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBsb2dpbiBzaGVldC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxMb2dpblNoZWV0Pn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgbG9naW4gc2hlZXRcbiAgICAgKi9cbiAgICBhc3luYyBnZXRfbG9naW5fc2hlZXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5sb2dpbl9zaGVldCkge1xuICAgICAgICAgICAgY29uc3QgbG9naW5fc2hlZXRfY29uZmlnOiBMb2dpblNoZWV0Q29uZmlnID0gdGhpcy5jb21iaW5lZF9jb25maWc7XG4gICAgICAgICAgICBjb25zdCBzaGVldHNfc2VydmljZSA9IGF3YWl0IHRoaXMuZ2V0X3NoZWV0c19zZXJ2aWNlKCk7XG4gICAgICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IG5ldyBMb2dpblNoZWV0KFxuICAgICAgICAgICAgICAgIHNoZWV0c19zZXJ2aWNlLFxuICAgICAgICAgICAgICAgIGxvZ2luX3NoZWV0X2NvbmZpZ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGF3YWl0IGxvZ2luX3NoZWV0LnJlZnJlc2goKTtcbiAgICAgICAgICAgIHRoaXMubG9naW5fc2hlZXQgPSBsb2dpbl9zaGVldDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5sb2dpbl9zaGVldDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBzZWFzb24gc2hlZXQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8U2Vhc29uU2hlZXQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBzZWFzb24gc2hlZXRcbiAgICAgKi9cbiAgICBhc3luYyBnZXRfc2Vhc29uX3NoZWV0KCkge1xuICAgICAgICBpZiAoIXRoaXMuc2Vhc29uX3NoZWV0KSB7XG4gICAgICAgICAgICBjb25zdCBzZWFzb25fc2hlZXRfY29uZmlnOiBTZWFzb25TaGVldENvbmZpZyA9IHRoaXMuY29tYmluZWRfY29uZmlnO1xuICAgICAgICAgICAgY29uc3Qgc2hlZXRzX3NlcnZpY2UgPSBhd2FpdCB0aGlzLmdldF9zaGVldHNfc2VydmljZSgpO1xuICAgICAgICAgICAgY29uc3Qgc2Vhc29uX3NoZWV0ID0gbmV3IFNlYXNvblNoZWV0KFxuICAgICAgICAgICAgICAgIHNoZWV0c19zZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHNlYXNvbl9zaGVldF9jb25maWdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLnNlYXNvbl9zaGVldCA9IHNlYXNvbl9zaGVldDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zZWFzb25fc2hlZXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgZ3Vlc3QgcGFzcyBzaGVldC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxHdWVzdFBhc3NTaGVldD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGd1ZXN0IHBhc3Mgc2hlZXRcbiAgICAgKi9cbiAgICBhc3luYyBnZXRfZ3Vlc3RfcGFzc19zaGVldCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmd1ZXN0X3Bhc3Nfc2hlZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpZzogR3Vlc3RQYXNzZXNDb25maWcgPSB0aGlzLmNvbWJpbmVkX2NvbmZpZztcbiAgICAgICAgICAgIGNvbnN0IHNoZWV0c19zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfc2hlZXRzX3NlcnZpY2UoKTtcbiAgICAgICAgICAgIHRoaXMuZ3Vlc3RfcGFzc19zaGVldCA9IG5ldyBHdWVzdFBhc3NTaGVldChzaGVldHNfc2VydmljZSwgY29uZmlnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5ndWVzdF9wYXNzX3NoZWV0O1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgR29vZ2xlIEFwcHMgU2NyaXB0IHNlcnZpY2UuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c2NyaXB0X3YxLlNjcmlwdD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIEdvb2dsZSBBcHBzIFNjcmlwdCBzZXJ2aWNlLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF91c2VyX3NjcmlwdHNfc2VydmljZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnVzZXJfc2NyaXB0c19zZXJ2aWNlKSB7XG4gICAgICAgICAgICB0aGlzLnVzZXJfc2NyaXB0c19zZXJ2aWNlID0gZ29vZ2xlLnNjcmlwdCh7XG4gICAgICAgICAgICAgICAgdmVyc2lvbjogXCJ2MVwiLFxuICAgICAgICAgICAgICAgIGF1dGg6IGF3YWl0IHRoaXMuZ2V0X3ZhbGlkX2NyZWRzKHRydWUpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudXNlcl9zY3JpcHRzX3NlcnZpY2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbWFwcGVkIHBhdHJvbGxlci5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtmb3JjZT1mYWxzZV0gLSBXaGV0aGVyIHRvIGZvcmNlIHRoZSBwYXRyb2xsZXIgdG8gYmUgZm91bmQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZSB8IHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSByZXNwb25zZSBvciB2b2lkLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF9tYXBwZWRfcGF0cm9sbGVyKGZvcmNlOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgcGhvbmVfbG9va3VwID0gYXdhaXQgdGhpcy5maW5kX3BhdHJvbGxlcl9mcm9tX251bWJlcigpO1xuICAgICAgICBpZiAocGhvbmVfbG9va3VwID09PSB1bmRlZmluZWQgfHwgcGhvbmVfbG9va3VwID09PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoZm9yY2UpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgZmluZCBhc3NvY2lhdGVkIHVzZXJcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgU29ycnksIEkgY291bGRuJ3QgZmluZCBhbiBhc3NvY2lhdGVkIEJWTlNQIG1lbWJlciB3aXRoIHlvdXIgcGhvbmUgbnVtYmVyICgke3RoaXMuZnJvbX0pYCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG4gICAgICAgIGNvbnN0IG1hcHBlZFBhdHJvbGxlciA9IGxvZ2luX3NoZWV0LnRyeV9maW5kX3BhdHJvbGxlcihcbiAgICAgICAgICAgIHBob25lX2xvb2t1cC5uYW1lXG4gICAgICAgICk7XG4gICAgICAgIGlmIChtYXBwZWRQYXRyb2xsZXIgPT09IFwibm90X2ZvdW5kXCIpIHtcbiAgICAgICAgICAgIGlmIChmb3JjZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBwYXRyb2xsZXIgaW4gbG9naW4gc2hlZXRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgQ291bGQgbm90IGZpbmQgcGF0cm9sbGVyICcke3Bob25lX2xvb2t1cC5uYW1lfScgaW4gbG9naW4gc2hlZXQuIFBsZWFzZSBsb29rIGF0IHRoZSBsb2dpbiBzaGVldCBuYW1lLCBhbmQgY29weSBpdCB0byB0aGUgUGhvbmUgTnVtYmVycyB0YWIuYCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJyZW50X3NoZWV0X2RhdGUgPSBsb2dpbl9zaGVldC5jdXJyZW50X2RhdGU7XG4gICAgICAgIHRoaXMucGF0cm9sbGVyID0gbWFwcGVkUGF0cm9sbGVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZpbmRzIHRoZSBwYXRyb2xsZXIgZnJvbSB0aGUgcGhvbmUgbnVtYmVyLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFBhdHJvbGxlclJvdz59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHBhdHJvbGxlci5cbiAgICAgKi9cbiAgICBhc3luYyBmaW5kX3BhdHJvbGxlcl9mcm9tX251bWJlcigpIHtcbiAgICAgICAgY29uc3QgcmF3X251bWJlciA9IHRoaXMuZnJvbTtcbiAgICAgICAgY29uc3Qgc2hlZXRzX3NlcnZpY2UgPSBhd2FpdCB0aGlzLmdldF9zaGVldHNfc2VydmljZSgpO1xuICAgICAgICBjb25zdCBvcHRzOiBGaW5kUGF0cm9sbGVyQ29uZmlnID0gdGhpcy5jb21iaW5lZF9jb25maWc7XG4gICAgICAgIGNvbnN0IG51bWJlciA9IHNhbml0aXplX3Bob25lX251bWJlcihyYXdfbnVtYmVyKTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBzaGVldHNfc2VydmljZS5zcHJlYWRzaGVldHMudmFsdWVzLmdldCh7XG4gICAgICAgICAgICBzcHJlYWRzaGVldElkOiBvcHRzLlNIRUVUX0lELFxuICAgICAgICAgICAgcmFuZ2U6IG9wdHMuUEhPTkVfTlVNQkVSX0xPT0tVUF9TSEVFVCxcbiAgICAgICAgICAgIHZhbHVlUmVuZGVyT3B0aW9uOiBcIlVORk9STUFUVEVEX1ZBTFVFXCIsXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIXJlc3BvbnNlLmRhdGEudmFsdWVzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgZmluZCBwYXRyb2xsZXIuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhdHJvbGxlciA9IHJlc3BvbnNlLmRhdGEudmFsdWVzXG4gICAgICAgICAgICAubWFwKChyb3cpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByYXdOdW1iZXIgPVxuICAgICAgICAgICAgICAgICAgICByb3dbZXhjZWxfcm93X3RvX2luZGV4KG9wdHMuUEhPTkVfTlVNQkVSX05VTUJFUl9DT0xVTU4pXTtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50TnVtYmVyID1cbiAgICAgICAgICAgICAgICAgICAgcmF3TnVtYmVyICE9IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBzYW5pdGl6ZV9waG9uZV9udW1iZXIocmF3TnVtYmVyKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiByYXdOdW1iZXI7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudE5hbWUgPVxuICAgICAgICAgICAgICAgICAgICByb3dbZXhjZWxfcm93X3RvX2luZGV4KG9wdHMuUEhPTkVfTlVNQkVSX05BTUVfQ09MVU1OKV07XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgbmFtZTogY3VycmVudE5hbWUsIG51bWJlcjogY3VycmVudE51bWJlciB9O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5maWx0ZXIoKHBhdHJvbGxlcikgPT4gcGF0cm9sbGVyLm51bWJlciA9PT0gbnVtYmVyKVswXTtcbiAgICAgICAgcmV0dXJuIHBhdHJvbGxlcjtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBzaGVldHNfdjQgfSBmcm9tIFwiZ29vZ2xlYXBpc1wiO1xuaW1wb3J0IHsgR3Vlc3RQYXNzZXNDb25maWcgfSBmcm9tIFwiLi4vZW52L2hhbmRsZXJfY29uZmlnXCI7XG5pbXBvcnQgeyBleGNlbF9yb3dfdG9faW5kZXgsIHJvd19jb2xfdG9fZXhjZWxfaW5kZXggfSBmcm9tIFwiLi4vdXRpbHMvdXRpbFwiO1xuaW1wb3J0IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiIGZyb20gXCIuLi91dGlscy9nb29nbGVfc2hlZXRzX3NwcmVhZHNoZWV0X3RhYlwiO1xuaW1wb3J0IHsgZm9ybWF0X2RhdGVfZm9yX3NwcmVhZHNoZWV0X3ZhbHVlIH0gZnJvbSBcIi4uL3V0aWxzL2RhdGV0aW1lX3V0aWxcIjtcbmltcG9ydCB7XG4gICAgYnVpbGRfcGFzc2VzX3N0cmluZyxcbn0gZnJvbSBcIi4uL3V0aWxzL2d1ZXN0X3Bhc3Nlc1wiO1xuaW1wb3J0IHsgQlZOU1BSZXNwb25zZSB9IGZyb20gXCIuLi9oYW5kbGVycy9idm5zcF9oYW5kbGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBVc2VkQW5kQXZhaWxhYmxlUGFzc2VzIHtcbiAgICByb3c6IGFueVtdO1xuICAgIGluZGV4OiBudW1iZXI7XG4gICAgYXZhaWxhYmxlOiBudW1iZXI7XG4gICAgdXNlZF90b2RheTogbnVtYmVyO1xuICAgIHVzZWRfc2Vhc29uOiBudW1iZXI7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHJvdzogYW55W10sXG4gICAgICAgIGluZGV4OiBudW1iZXIsXG4gICAgICAgIGF2YWlsYWJsZTogYW55LFxuICAgICAgICB1c2VkX3RvZGF5OiBhbnksXG4gICAgICAgIHVzZWRfc2Vhc29uOiBhbnksXG4gICAgKSB7XG4gICAgICAgIHRoaXMucm93ID0gcm93O1xuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgICAgIHRoaXMuYXZhaWxhYmxlID0gTnVtYmVyKGF2YWlsYWJsZSk7XG4gICAgICAgIHRoaXMudXNlZF90b2RheSA9IE51bWJlcih1c2VkX3RvZGF5KTtcbiAgICAgICAgdGhpcy51c2VkX3NlYXNvbiA9IE51bWJlcih1c2VkX3NlYXNvbik7XG4gICAgfVxuXG4gICAgZ2V0X3Byb21wdCgpOiBCVk5TUFJlc3BvbnNlIHtcbiAgICAgICAgaWYgKHRoaXMuYXZhaWxhYmxlID4gMCkge1xuICAgICAgICAgICAgbGV0IHJlc3BvbnNlOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAgICAgICAgICAgcmVzcG9uc2UgPSBidWlsZF9wYXNzZXNfc3RyaW5nKFxuICAgICAgICAgICAgICAgIHRoaXMudXNlZF9zZWFzb24sXG4gICAgICAgICAgICAgICAgdGhpcy5hdmFpbGFibGUgKyB0aGlzLnVzZWRfc2Vhc29uLFxuICAgICAgICAgICAgICAgIHRoaXMudXNlZF90b2RheSxcbiAgICAgICAgICAgICAgICB0cnVlXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmVzcG9uc2UgKz1cbiAgICAgICAgICAgICAgICBcIlxcblxcblwiICtcbiAgICAgICAgICAgICAgICBgRW50ZXIgdGhlIGZpcnN0IGFuZCBsYXN0IG5hbWUgb2YgdGhlIGd1ZXN0IHRoYXQgd2lsbCB1c2UgYSBndWVzdCBwYXNzIHRvZGF5IChvciAncmVzdGFydCcpOmA7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlOiByZXNwb25zZSxcbiAgICAgICAgICAgICAgICAgICAgbmV4dF9zdGVwOiBgYXdhaXQtcGFzcy1ndWVzdGAsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IGBZb3UgZG8gbm90IGhhdmUgYW55IGd1ZXN0IHBhc3NlcyBhdmFpbGFibGUgdG9kYXlgLFxuICAgICAgICB9O1xuICAgIH1cbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBhc3NTaGVldCB7XG4gICAgc2hlZXQ6IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiO1xuICAgIGNvbnN0cnVjdG9yKHNoZWV0OiBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYikge1xuICAgICAgICB0aGlzLnNoZWV0ID0gc2hlZXQ7XG4gICAgfVxuXG4gICAgYWJzdHJhY3QgZ2V0IGF2YWlsYWJsZV9jb2x1bW4oKTogc3RyaW5nO1xuICAgIGFic3RyYWN0IGdldCB1c2VkX3RvZGF5X2NvbHVtbigpOiBzdHJpbmc7XG4gICAgYWJzdHJhY3QgZ2V0IHVzZWRfc2Vhc29uX2NvbHVtbigpOiBzdHJpbmc7XG4gICAgYWJzdHJhY3QgZ2V0IG5hbWVfY29sdW1uKCk6IHN0cmluZztcbiAgICBhYnN0cmFjdCBnZXQgc3RhcnRfaW5kZXgoKTogbnVtYmVyO1xuICAgIGFic3RyYWN0IGdldCBzaGVldF9uYW1lKCk6IHN0cmluZztcblxuICAgIGFzeW5jIGdldF9hdmFpbGFibGVfYW5kX3VzZWRfcGFzc2VzKFxuICAgICAgICBwYXRyb2xsZXJfbmFtZTogc3RyaW5nXG4gICAgKTogUHJvbWlzZTxVc2VkQW5kQXZhaWxhYmxlUGFzc2VzIHwgbnVsbD4ge1xuICAgICAgICBjb25zdCBwYXRyb2xsZXJfcm93ID0gYXdhaXQgdGhpcy5zaGVldC5nZXRfc2hlZXRfcm93X2Zvcl9wYXRyb2xsZXIoXG4gICAgICAgICAgICBwYXRyb2xsZXJfbmFtZSxcbiAgICAgICAgICAgIHRoaXMubmFtZV9jb2x1bW5cbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHBhdHJvbGxlcl9yb3cgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY3VycmVudF9kYXlfYXZhaWxhYmxlX3Bhc3NlcyA9XG4gICAgICAgICAgICBwYXRyb2xsZXJfcm93LnJvd1tleGNlbF9yb3dfdG9faW5kZXgodGhpcy5hdmFpbGFibGVfY29sdW1uKV07XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfZGF5X3VzZWRfcGFzc2VzID1cbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cucm93W2V4Y2VsX3Jvd190b19pbmRleCh0aGlzLnVzZWRfdG9kYXlfY29sdW1uKV07XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfc2Vhc29uX3VzZWRfcGFzc2VzID1cbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cucm93W2V4Y2VsX3Jvd190b19pbmRleCh0aGlzLnVzZWRfc2Vhc29uX2NvbHVtbildO1xuICAgICAgICByZXR1cm4gbmV3IFVzZWRBbmRBdmFpbGFibGVQYXNzZXMoXG4gICAgICAgICAgICBwYXRyb2xsZXJfcm93LnJvdyxcbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cuaW5kZXgsXG4gICAgICAgICAgICBjdXJyZW50X2RheV9hdmFpbGFibGVfcGFzc2VzLFxuICAgICAgICAgICAgY3VycmVudF9kYXlfdXNlZF9wYXNzZXMsXG4gICAgICAgICAgICBjdXJyZW50X3NlYXNvbl91c2VkX3Bhc3Nlc1xuICAgICAgICApO1xuICAgIH1cblxuICAgIGFzeW5jIHNldF91c2VkX2d1ZXN0X3Bhc3NlcyhcbiAgICAgICAgcGF0cm9sbGVyX3JvdzogVXNlZEFuZEF2YWlsYWJsZVBhc3NlcyxcbiAgICAgICAgZ3Vlc3RfbmFtZTogc3RyaW5nXG4gICAgKSB7XG4gICAgICAgIGlmIChwYXRyb2xsZXJfcm93LmF2YWlsYWJsZSA8IDEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICBgTm90IGVub3VnaCBhdmFpbGFibGUgcGFzc2VzOiBBdmFpbGFibGU6ICR7cGF0cm9sbGVyX3Jvdy5hdmFpbGFibGV9LCBVc2VkIHRoaXMgc2Vhc29uOiAgJHtwYXRyb2xsZXJfcm93LnVzZWRfc2Vhc29ufSwgVXNlZCB0b2RheTogJHtwYXRyb2xsZXJfcm93LnVzZWRfdG9kYXl9YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByb3dudW0gPSBwYXRyb2xsZXJfcm93LmluZGV4O1xuXG4gICAgICAgIGNvbnN0IHN0YXJ0X2luZGV4ID0gdGhpcy5zdGFydF9pbmRleDtcbiAgICAgICAgY29uc3QgcHJpb3JfbGVuZ3RoID0gcGF0cm9sbGVyX3Jvdy5yb3cubGVuZ3RoIC0gc3RhcnRfaW5kZXg7XG5cbiAgICAgICAgY29uc3QgY3VycmVudF9kYXRlX3N0cmluZyA9IGZvcm1hdF9kYXRlX2Zvcl9zcHJlYWRzaGVldF92YWx1ZShcbiAgICAgICAgICAgIG5ldyBEYXRlKClcbiAgICAgICAgKTtcbiAgICAgICAgbGV0IG5ld192YWxzID0gcGF0cm9sbGVyX3Jvdy5yb3dcbiAgICAgICAgICAgIC5zbGljZShzdGFydF9pbmRleClcbiAgICAgICAgICAgIC5tYXAoKHgpID0+IHg/LnRvU3RyaW5nKCkpO1xuXG4gICAgICAgIC8vIEFkZCB0aGUgY3VycmVudCBkYXRlIGFwcGVuZGVkIHdpdGggdGhlIG5ldyBndWVzdCBuYW1lXG4gICAgICAgIG5ld192YWxzLnB1c2goY3VycmVudF9kYXRlX3N0cmluZyArIFwiLFwiICsgZ3Vlc3RfbmFtZSk7XG5cbiAgICAgICAgY29uc3QgdXBkYXRlX2xlbmd0aCA9IE1hdGgubWF4KHByaW9yX2xlbmd0aCwgbmV3X3ZhbHMubGVuZ3RoKTtcbiAgICAgICAgd2hpbGUgKG5ld192YWxzLmxlbmd0aCA8IHVwZGF0ZV9sZW5ndGgpIHtcbiAgICAgICAgICAgIG5ld192YWxzLnB1c2goXCJcIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZW5kX2luZGV4ID0gc3RhcnRfaW5kZXggKyB1cGRhdGVfbGVuZ3RoIC0gMTtcblxuICAgICAgICBjb25zdCByYW5nZSA9IGAke3RoaXMuc2hlZXQuc2hlZXRfbmFtZX0hJHtyb3dfY29sX3RvX2V4Y2VsX2luZGV4KFxuICAgICAgICAgICAgcm93bnVtLFxuICAgICAgICAgICAgc3RhcnRfaW5kZXhcbiAgICAgICAgKX06JHtyb3dfY29sX3RvX2V4Y2VsX2luZGV4KHJvd251bSwgZW5kX2luZGV4KX1gO1xuICAgICAgICBjb25zb2xlLmxvZyhgVXBkYXRpbmcgJHtyYW5nZX0gd2l0aCAke25ld192YWxzLmxlbmd0aH0gdmFsdWVzYCk7XG4gICAgICAgIGF3YWl0IHRoaXMuc2hlZXQudXBkYXRlX3ZhbHVlcyhyYW5nZSwgW25ld192YWxzXSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgR3Vlc3RQYXNzU2hlZXQgZXh0ZW5kcyBQYXNzU2hlZXQge1xuICAgIGNvbmZpZzogR3Vlc3RQYXNzZXNDb25maWc7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzIHwgbnVsbCxcbiAgICAgICAgY29uZmlnOiBHdWVzdFBhc3Nlc0NvbmZpZ1xuICAgICkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIG5ldyBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYihcbiAgICAgICAgICAgICAgICBzaGVldHNfc2VydmljZSxcbiAgICAgICAgICAgICAgICBjb25maWcuU0hFRVRfSUQsXG4gICAgICAgICAgICAgICAgY29uZmlnLkdVRVNUX1BBU1NfU0hFRVRcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gICAgfVxuXG4gICAgZ2V0IHN0YXJ0X2luZGV4KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBleGNlbF9yb3dfdG9faW5kZXgoXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5HVUVTVF9QQVNTX1NIRUVUX0RBVEVTX1NUQVJUSU5HX0NPTFVNTlxuICAgICAgICApO1xuICAgIH1cbiAgICBnZXQgc2hlZXRfbmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuR1VFU1RfUEFTU19TSEVFVDtcbiAgICB9XG4gICAgZ2V0IGF2YWlsYWJsZV9jb2x1bW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLkdVRVNUX1BBU1NfU0hFRVRfREFURVNfQVZBSUxBQkxFX0NPTFVNTjtcbiAgICB9XG4gICAgZ2V0IHVzZWRfdG9kYXlfY29sdW1uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5HVUVTVF9QQVNTX1NIRUVUX1VTRURfVE9EQVlfQ09MVU1OO1xuICAgIH1cbiAgICBnZXQgdXNlZF9zZWFzb25fY29sdW1uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5HVUVTVF9QQVNTX1NIRUVUX1VTRURfU0VBU09OX0NPTFVNTjtcbiAgICB9XG4gICAgZ2V0IG5hbWVfY29sdW1uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5HVUVTVF9QQVNTX1NIRUVUX05BTUVfQ09MVU1OO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IGxvb2t1cF9yb3dfY29sX2luX3NoZWV0LCBleGNlbF9yb3dfdG9faW5kZXggfSBmcm9tIFwiLi4vdXRpbHMvdXRpbFwiO1xuaW1wb3J0IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiIGZyb20gXCIuLi91dGlscy9nb29nbGVfc2hlZXRzX3NwcmVhZHNoZWV0X3RhYlwiO1xuaW1wb3J0IHsgc2FuaXRpemVfZGF0ZSB9IGZyb20gXCIuLi91dGlscy9kYXRldGltZV91dGlsXCI7XG5pbXBvcnQgeyBMb2dpblNoZWV0Q29uZmlnLCBQYXRyb2xsZXJSb3dDb25maWcgfSBmcm9tIFwiLi4vZW52L2hhbmRsZXJfY29uZmlnXCI7XG5pbXBvcnQgeyBzaGVldHNfdjQgfSBmcm9tIFwiZ29vZ2xlYXBpc1wiO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSByb3cgb2YgcGF0cm9sbGVyIGRhdGEuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBQYXRyb2xsZXJSb3dcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBpbmRleCAtIFRoZSBpbmRleCBvZiB0aGUgcm93LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcGF0cm9sbGVyLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IGNhdGVnb3J5IC0gVGhlIGNhdGVnb3J5IG9mIHRoZSBwYXRyb2xsZXIuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gc2VjdGlvbiAtIFRoZSBzZWN0aW9uIG9mIHRoZSBwYXRyb2xsZXIuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gY2hlY2tpbiAtIFRoZSBjaGVjay1pbiBzdGF0dXMgb2YgdGhlIHBhdHJvbGxlci5cbiAqL1xuZXhwb3J0IHR5cGUgUGF0cm9sbGVyUm93ID0ge1xuICAgIGluZGV4OiBudW1iZXI7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGNhdGVnb3J5OiBzdHJpbmc7XG4gICAgc2VjdGlvbjogc3RyaW5nO1xuICAgIGNoZWNraW46IHN0cmluZztcbn07XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGEgbG9naW4gc2hlZXQgaW4gR29vZ2xlIFNoZWV0cy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9naW5TaGVldCB7XG4gICAgbG9naW5fc2hlZXQ6IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiO1xuICAgIGNoZWNraW5fY291bnRfc2hlZXQ6IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiO1xuICAgIGNvbmZpZzogTG9naW5TaGVldENvbmZpZztcbiAgICByb3dzPzogYW55W11bXSB8IG51bGwgPSBudWxsO1xuICAgIGNoZWNraW5fY291bnQ6IG51bWJlciB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgICBwYXRyb2xsZXJzOiBQYXRyb2xsZXJSb3dbXSA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBMb2dpblNoZWV0LlxuICAgICAqIEBwYXJhbSB7c2hlZXRzX3Y0LlNoZWV0cyB8IG51bGx9IHNoZWV0c19zZXJ2aWNlIC0gVGhlIEdvb2dsZSBTaGVldHMgQVBJIHNlcnZpY2UuXG4gICAgICogQHBhcmFtIHtMb2dpblNoZWV0Q29uZmlnfSBjb25maWcgLSBUaGUgY29uZmlndXJhdGlvbiBmb3IgdGhlIGxvZ2luIHNoZWV0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyB8IG51bGwsXG4gICAgICAgIGNvbmZpZzogTG9naW5TaGVldENvbmZpZ1xuICAgICkge1xuICAgICAgICB0aGlzLmxvZ2luX3NoZWV0ID0gbmV3IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiKFxuICAgICAgICAgICAgc2hlZXRzX3NlcnZpY2UsXG4gICAgICAgICAgICBjb25maWcuU0hFRVRfSUQsXG4gICAgICAgICAgICBjb25maWcuTE9HSU5fU0hFRVRfTE9PS1VQXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY2hlY2tpbl9jb3VudF9zaGVldCA9IG5ldyBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYihcbiAgICAgICAgICAgIHNoZWV0c19zZXJ2aWNlLFxuICAgICAgICAgICAgY29uZmlnLlNIRUVUX0lELFxuICAgICAgICAgICAgY29uZmlnLkNIRUNLSU5fQ09VTlRfTE9PS1VQXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZnJlc2hlcyB0aGUgZGF0YSBmcm9tIHRoZSBHb29nbGUgU2hlZXRzLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgICAqL1xuICAgIGFzeW5jIHJlZnJlc2goKSB7XG4gICAgICAgIHRoaXMucm93cyA9IGF3YWl0IHRoaXMubG9naW5fc2hlZXQuZ2V0X3ZhbHVlcyhcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLkxPR0lOX1NIRUVUX0xPT0tVUFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmNoZWNraW5fY291bnQgPSAoYXdhaXQgdGhpcy5jaGVja2luX2NvdW50X3NoZWV0LmdldF92YWx1ZXMoXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5DSEVDS0lOX0NPVU5UX0xPT0tVUFxuICAgICAgICApKSFbMF1bMF07XG4gICAgICAgIHRoaXMucGF0cm9sbGVycyA9IHRoaXMucm93cyEubWFwKCh4LCBpKSA9PlxuICAgICAgICAgICAgdGhpcy5wYXJzZV9wYXRyb2xsZXJfcm93KGksIHgsIHRoaXMuY29uZmlnKVxuICAgICAgICApLmZpbHRlcigoeCkgPT4geCAhPSBudWxsKSBhcyBQYXRyb2xsZXJSb3dbXTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIlJlZnJlc2hpbmcgUGF0cm9sbGVyczogXCIgKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnBhdHJvbGxlcnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGFyY2hpdmVkIHN0YXR1cyBvZiB0aGUgbG9naW4gc2hlZXQuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNoZWV0IGlzIGFyY2hpdmVkLCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICovXG4gICAgZ2V0IGFyY2hpdmVkKCkge1xuICAgICAgICBjb25zdCBhcmNoaXZlZCA9IGxvb2t1cF9yb3dfY29sX2luX3NoZWV0KFxuICAgICAgICAgICAgdGhpcy5jb25maWcuQVJDSElWRURfQ0VMTCxcbiAgICAgICAgICAgIHRoaXMucm93cyFcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIChhcmNoaXZlZCA9PT0gdW5kZWZpbmVkICYmIHRoaXMuY2hlY2tpbl9jb3VudCA9PT0gMCkgfHxcbiAgICAgICAgICAgIGFyY2hpdmVkLnRvTG93ZXJDYXNlKCkgPT09IFwieWVzXCJcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBkYXRlIG9mIHRoZSBzaGVldC5cbiAgICAgKiBAcmV0dXJucyB7RGF0ZX0gVGhlIGRhdGUgb2YgdGhlIHNoZWV0LlxuICAgICAqL1xuICAgIGdldCBzaGVldF9kYXRlKCkge1xuICAgICAgICByZXR1cm4gc2FuaXRpemVfZGF0ZShcbiAgICAgICAgICAgIGxvb2t1cF9yb3dfY29sX2luX3NoZWV0KHRoaXMuY29uZmlnLlNIRUVUX0RBVEVfQ0VMTCwgdGhpcy5yb3dzISlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBjdXJyZW50IGRhdGUuXG4gICAgICogQHJldHVybnMge0RhdGV9IFRoZSBjdXJyZW50IGRhdGUuXG4gICAgICovXG4gICAgZ2V0IGN1cnJlbnRfZGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHNhbml0aXplX2RhdGUoXG4gICAgICAgICAgICBsb29rdXBfcm93X2NvbF9pbl9zaGVldCh0aGlzLmNvbmZpZy5DVVJSRU5UX0RBVEVfQ0VMTCwgdGhpcy5yb3dzISlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdGhlIHNoZWV0IGRhdGUgaXMgdGhlIGN1cnJlbnQgZGF0ZS5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc2hlZXQgZGF0ZSBpcyB0aGUgY3VycmVudCBkYXRlLCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICovXG4gICAgZ2V0IGlzX2N1cnJlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNoZWV0X2RhdGUuZ2V0VGltZSgpID09PSB0aGlzLmN1cnJlbnRfZGF0ZS5nZXRUaW1lKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZXMgdG8gZmluZCBhIHBhdHJvbGxlciBieSBuYW1lLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHBhdHJvbGxlci5cbiAgICAgKiBAcmV0dXJucyB7UGF0cm9sbGVyUm93IHwgXCJub3RfZm91bmRcIn0gVGhlIHBhdHJvbGxlciByb3cgb3IgXCJub3RfZm91bmRcIi5cbiAgICAgKi9cbiAgICB0cnlfZmluZF9wYXRyb2xsZXIobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHBhdHJvbGxlcnMgPSB0aGlzLnBhdHJvbGxlcnMuZmlsdGVyKCh4KSA9PiB4Lm5hbWUgPT09IG5hbWUpO1xuICAgICAgICBpZiAocGF0cm9sbGVycy5sZW5ndGggIT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBcIm5vdF9mb3VuZFwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXRyb2xsZXJzWzBdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZpbmRzIGEgcGF0cm9sbGVyIGJ5IG5hbWUuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcGF0cm9sbGVyLlxuICAgICAqIEByZXR1cm5zIHtQYXRyb2xsZXJSb3d9IFRoZSBwYXRyb2xsZXIgcm93LlxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGF0cm9sbGVyIGlzIG5vdCBmb3VuZC5cbiAgICAgKi9cbiAgICBmaW5kX3BhdHJvbGxlcihuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy50cnlfZmluZF9wYXRyb2xsZXIobmFtZSk7XG4gICAgICAgIGlmIChyZXN1bHQgPT09IFwibm90X2ZvdW5kXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgJHtuYW1lfSBpbiBsb2dpbiBzaGVldGApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcGF0cm9sbGVycyB3aG8gYXJlIG9uIGR1dHkuXG4gICAgICogQHJldHVybnMge1BhdHJvbGxlclJvd1tdfSBUaGUgbGlzdCBvZiBvbi1kdXR5IHBhdHJvbGxlcnMuXG4gICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBsb2dpbiBzaGVldCBpcyBub3QgY3VycmVudC5cbiAgICAgKi9cbiAgICBnZXRfb25fZHV0eV9wYXRyb2xsZXJzKCk6IFBhdHJvbGxlclJvd1tdIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzX2N1cnJlbnQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxvZ2luIHNoZWV0IGlzIG5vdCBjdXJyZW50XCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnBhdHJvbGxlcnMuZmlsdGVyKCh4KSA9PiB4LmNoZWNraW4pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpbiBhIHBhdHJvbGxlciB3aXRoIGEgbmV3IGNoZWNrLWluIHZhbHVlLlxuICAgICAqIEBwYXJhbSB7UGF0cm9sbGVyUm93fSBwYXRyb2xsZXJfc3RhdHVzIC0gVGhlIHN0YXR1cyBvZiB0aGUgcGF0cm9sbGVyLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuZXdfY2hlY2tpbl92YWx1ZSAtIFRoZSBuZXcgY2hlY2staW4gdmFsdWUuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBsb2dpbiBzaGVldCBpcyBub3QgY3VycmVudC5cbiAgICAgKi9cbiAgICBhc3luYyBjaGVja2luKHBhdHJvbGxlcl9zdGF0dXM6IFBhdHJvbGxlclJvdywgbmV3X2NoZWNraW5fdmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAoIXRoaXMuaXNfY3VycmVudCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTG9naW4gc2hlZXQgaXMgbm90IGN1cnJlbnRcIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coYEV4aXN0aW5nIHN0YXR1czogJHtKU09OLnN0cmluZ2lmeShwYXRyb2xsZXJfc3RhdHVzKX1gKTtcblxuICAgICAgICBjb25zdCByb3cgPSBwYXRyb2xsZXJfc3RhdHVzLmluZGV4ICsgMTsgLy8gcHJvZ3JhbW1pbmcgLT4gZXhjZWwgbG9va3VwXG4gICAgICAgIGNvbnN0IHJhbmdlID0gYCR7dGhpcy5jb25maWcuQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU59JHtyb3d9YDtcblxuICAgICAgICBhd2FpdCB0aGlzLmxvZ2luX3NoZWV0LnVwZGF0ZV92YWx1ZXMocmFuZ2UsIFtbbmV3X2NoZWNraW5fdmFsdWVdXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBBc3NpZ25zIGEgc2VjdGlvbiB0byBhIHBhdHJvbGxlci5cbiAgICAqIEBwYXJhbSB7UGF0cm9sbGVyUm93fSBwYXRyb2xsZXIgLSBUaGUgcGF0cm9sbGVyIHRvIGFzc2lnbiB0aGUgc2VjdGlvbiB0by5cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBuZXdfc2VjdGlvbl92YWx1ZSAtIFRoZSBuZXcgc2VjdGlvbiB2YWx1ZS5cbiAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBsb2dpbiBzaGVldCBpcyBub3QgY3VycmVudC5cbiAgICAqL1xuICAgIGFzeW5jIGFzc2lnbl9zZWN0aW9uKHBhdHJvbGxlcl9zZWN0aW9uOiBQYXRyb2xsZXJSb3csIG5ld19zZWN0aW9uX3ZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzX2N1cnJlbnQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxvZ2luIHNoZWV0IGlzIG5vdCBjdXJyZW50XCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGBFeGlzdGluZyBzdGF0dXM6ICR7SlNPTi5zdHJpbmdpZnkocGF0cm9sbGVyX3NlY3Rpb24pfWApO1xuXG4gICAgICAgIGNvbnN0IHJvdyA9IHBhdHJvbGxlcl9zZWN0aW9uLmluZGV4ICsgMTsgLy8gcHJvZ3JhbW1pbmcgLT4gZXhjZWwgbG9va3VwXG4gICAgICAgIGNvbnN0IHJhbmdlID0gYCR7dGhpcy5jb25maWcuU0VDVElPTl9EUk9QRE9XTl9DT0xVTU59JHtyb3d9YDtcblxuICAgICAgICBhd2FpdCB0aGlzLmxvZ2luX3NoZWV0LnVwZGF0ZV92YWx1ZXMocmFuZ2UsIFtbbmV3X3NlY3Rpb25fdmFsdWVdXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIGEgcm93IG9mIHBhdHJvbGxlciBkYXRhLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIFRoZSBpbmRleCBvZiB0aGUgcm93LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IHJvdyAtIFRoZSByb3cgZGF0YS5cbiAgICAgKiBAcGFyYW0ge1BhdHJvbGxlclJvd0NvbmZpZ30gb3B0cyAtIFRoZSBjb25maWd1cmF0aW9uIG9wdGlvbnMgZm9yIHRoZSBwYXRyb2xsZXIgcm93LlxuICAgICAqIEByZXR1cm5zIHtQYXRyb2xsZXJSb3cgfCBudWxsfSBUaGUgcGFyc2VkIHBhdHJvbGxlciByb3cgb3IgbnVsbCBpZiBpbnZhbGlkLlxuICAgICAqL1xuICAgIHByaXZhdGUgcGFyc2VfcGF0cm9sbGVyX3JvdyhcbiAgICAgICAgaW5kZXg6IG51bWJlcixcbiAgICAgICAgcm93OiBzdHJpbmdbXSxcbiAgICAgICAgb3B0czogUGF0cm9sbGVyUm93Q29uZmlnXG4gICAgKTogUGF0cm9sbGVyUm93IHwgbnVsbCB7XG4gICAgICAgIGlmIChyb3cubGVuZ3RoIDwgNCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluZGV4IDwgMyl7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgbmFtZTogcm93W2V4Y2VsX3Jvd190b19pbmRleChvcHRzLk5BTUVfQ09MVU1OKV0sXG4gICAgICAgICAgICBjYXRlZ29yeTogcm93W2V4Y2VsX3Jvd190b19pbmRleChvcHRzLkNBVEVHT1JZX0NPTFVNTildLFxuICAgICAgICAgICAgc2VjdGlvbjogcm93W2V4Y2VsX3Jvd190b19pbmRleChvcHRzLlNFQ1RJT05fRFJPUERPV05fQ09MVU1OKV0sXG4gICAgICAgICAgICBjaGVja2luOiByb3dbZXhjZWxfcm93X3RvX2luZGV4KG9wdHMuQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU4pXSxcbiAgICAgICAgfTtcbiAgICB9XG59IiwiaW1wb3J0IHsgc2hlZXRzX3Y0IH0gZnJvbSBcImdvb2dsZWFwaXNcIjtcbmltcG9ydCB7XG4gICAgU2Vhc29uU2hlZXRDb25maWcsXG59IGZyb20gXCIuLi9lbnYvaGFuZGxlcl9jb25maWdcIjtcbmltcG9ydCB7IGV4Y2VsX3Jvd190b19pbmRleCB9IGZyb20gXCIuLi91dGlscy91dGlsXCI7XG5pbXBvcnQgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIgZnJvbSBcIi4uL3V0aWxzL2dvb2dsZV9zaGVldHNfc3ByZWFkc2hlZXRfdGFiXCI7XG5pbXBvcnQgeyBmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9jdXJyZW50X2RheSB9IGZyb20gXCIuLi91dGlscy9kYXRldGltZV91dGlsXCI7XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGEgc2Vhc29uIHNoZWV0IGluIEdvb2dsZSBTaGVldHMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXNvblNoZWV0IHtcbiAgICBzaGVldDogR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWI7XG4gICAgY29uZmlnOiBTZWFzb25TaGVldENvbmZpZztcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgU2Vhc29uU2hlZXQuXG4gICAgICogQHBhcmFtIHtzaGVldHNfdjQuU2hlZXRzIHwgbnVsbH0gc2hlZXRzX3NlcnZpY2UgLSBUaGUgR29vZ2xlIFNoZWV0cyBBUEkgc2VydmljZS5cbiAgICAgKiBAcGFyYW0ge1NlYXNvblNoZWV0Q29uZmlnfSBjb25maWcgLSBUaGUgY29uZmlndXJhdGlvbiBmb3IgdGhlIHNlYXNvbiBzaGVldC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgc2hlZXRzX3NlcnZpY2U6IHNoZWV0c192NC5TaGVldHMgfCBudWxsLFxuICAgICAgICBjb25maWc6IFNlYXNvblNoZWV0Q29uZmlnXG4gICAgKSB7XG4gICAgICAgIHRoaXMuc2hlZXQgPSBuZXcgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIoXG4gICAgICAgICAgICBzaGVldHNfc2VydmljZSxcbiAgICAgICAgICAgIGNvbmZpZy5TSEVFVF9JRCxcbiAgICAgICAgICAgIGNvbmZpZy5TRUFTT05fU0hFRVRcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbnVtYmVyIG9mIGRheXMgcGF0cm9sbGVkIGJ5IGEgcGF0cm9sbGVyLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRyb2xsZXJfbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwYXRyb2xsZXIuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8bnVtYmVyPn0gVGhlIG51bWJlciBvZiBkYXlzIHBhdHJvbGxlZC5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfcGF0cm9sbGVkX2RheXMoXG4gICAgICAgIHBhdHJvbGxlcl9uYW1lOiBzdHJpbmdcbiAgICApOiBQcm9taXNlPG51bWJlcj4ge1xuICAgICAgICBjb25zdCBwYXRyb2xsZXJfcm93ID0gYXdhaXQgdGhpcy5zaGVldC5nZXRfc2hlZXRfcm93X2Zvcl9wYXRyb2xsZXIoXG4gICAgICAgICAgICBwYXRyb2xsZXJfbmFtZSxcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLlNFQVNPTl9TSEVFVF9OQU1FX0NPTFVNTlxuICAgICAgICApO1xuXG4gICAgICAgIGlmICghcGF0cm9sbGVyX3Jvdykge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY3VycmVudE51bWJlciA9XG4gICAgICAgICAgICBwYXRyb2xsZXJfcm93LnJvd1tleGNlbF9yb3dfdG9faW5kZXgodGhpcy5jb25maWcuU0VBU09OX1NIRUVUX0RBWVNfQ09MVU1OKV07XG5cbiAgICAgICAgY29uc3QgY3VycmVudERheSA9IGZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2N1cnJlbnRfZGF5KHBhdHJvbGxlcl9yb3cucm93KVxuICAgICAgICAgICAgLm1hcCgoeCkgPT4gKHg/LnN0YXJ0c1dpdGgoXCJIXCIpID8gMC41IDogMSkpXG4gICAgICAgICAgICAucmVkdWNlKCh4LCB5LCBpKSA9PiB4ICsgeSwgMCk7XG5cbiAgICAgICAgY29uc3QgZGF5c0JlZm9yZVRvZGF5ID0gY3VycmVudE51bWJlciAtIGN1cnJlbnREYXk7XG4gICAgICAgIHJldHVybiBkYXlzQmVmb3JlVG9kYXk7XG4gICAgfVxufSIsImltcG9ydCB7IGdvb2dsZSB9IGZyb20gXCJnb29nbGVhcGlzXCI7XG5pbXBvcnQgeyBHZW5lcmF0ZUF1dGhVcmxPcHRzIH0gZnJvbSBcImdvb2dsZS1hdXRoLWxpYnJhcnlcIjtcbmltcG9ydCB7IE9BdXRoMkNsaWVudCB9IGZyb20gXCJnb29nbGVhcGlzLWNvbW1vblwiO1xuaW1wb3J0IHsgc2FuaXRpemVfcGhvbmVfbnVtYmVyIH0gZnJvbSBcIi4vdXRpbHMvdXRpbFwiO1xuaW1wb3J0IHsgbG9hZF9jcmVkZW50aWFsc19maWxlcyB9IGZyb20gXCIuL3V0aWxzL2ZpbGVfdXRpbHNcIjtcbmltcG9ydCB7IFNlcnZpY2VDb250ZXh0IH0gZnJvbSBcIkB0d2lsaW8tbGFicy9zZXJ2ZXJsZXNzLXJ1bnRpbWUtdHlwZXMvdHlwZXNcIjtcbmltcG9ydCB7IFVzZXJDcmVkc0NvbmZpZyB9IGZyb20gXCIuL2Vudi9oYW5kbGVyX2NvbmZpZ1wiO1xuaW1wb3J0IHsgdmFsaWRhdGVfc2NvcGVzIH0gZnJvbSBcIi4vdXRpbHMvc2NvcGVfdXRpbFwiO1xuXG5jb25zdCBTQ09QRVMgPSBbXG4gICAgXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3NjcmlwdC5wcm9qZWN0c1wiLFxuICAgIFwiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9zcHJlYWRzaGVldHNcIixcbl07XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIHVzZXIgY3JlZGVudGlhbHMgZm9yIEdvb2dsZSBPQXV0aDIuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXJDcmVkcyB7XG4gICAgbnVtYmVyOiBzdHJpbmc7XG4gICAgb2F1dGgyX2NsaWVudDogT0F1dGgyQ2xpZW50O1xuICAgIHN5bmNfY2xpZW50OiBTZXJ2aWNlQ29udGV4dDtcbiAgICBkb21haW4/OiBzdHJpbmc7XG4gICAgbG9hZGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBVc2VyQ3JlZHMgaW5zdGFuY2UuXG4gICAgICogQHBhcmFtIHtTZXJ2aWNlQ29udGV4dH0gc3luY19jbGllbnQgLSBUaGUgVHdpbGlvIFN5bmMgY2xpZW50LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgdW5kZWZpbmVkfSBudW1iZXIgLSBUaGUgdXNlcidzIHBob25lIG51bWJlci5cbiAgICAgKiBAcGFyYW0ge1VzZXJDcmVkc0NvbmZpZ30gb3B0cyAtIFRoZSB1c2VyIGNyZWRlbnRpYWxzIGNvbmZpZ3VyYXRpb24uXG4gICAgICogQHRocm93cyB7RXJyb3J9IFRocm93cyBhbiBlcnJvciBpZiB0aGUgbnVtYmVyIGlzIHVuZGVmaW5lZCBvciBudWxsLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBzeW5jX2NsaWVudDogU2VydmljZUNvbnRleHQsXG4gICAgICAgIG51bWJlcjogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgICAgICBvcHRzOiBVc2VyQ3JlZHNDb25maWdcbiAgICApIHtcbiAgICAgICAgaWYgKG51bWJlciA9PT0gdW5kZWZpbmVkIHx8IG51bWJlciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTnVtYmVyIGlzIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm51bWJlciA9IHNhbml0aXplX3Bob25lX251bWJlcihudW1iZXIpO1xuXG4gICAgICAgIGNvbnN0IGNyZWRlbnRpYWxzID0gbG9hZF9jcmVkZW50aWFsc19maWxlcygpO1xuICAgICAgICBjb25zdCB7IGNsaWVudF9zZWNyZXQsIGNsaWVudF9pZCwgcmVkaXJlY3RfdXJpcyB9ID0gY3JlZGVudGlhbHMud2ViO1xuICAgICAgICB0aGlzLm9hdXRoMl9jbGllbnQgPSBuZXcgZ29vZ2xlLmF1dGguT0F1dGgyKFxuICAgICAgICAgICAgY2xpZW50X2lkLFxuICAgICAgICAgICAgY2xpZW50X3NlY3JldCxcbiAgICAgICAgICAgIHJlZGlyZWN0X3VyaXNbMF1cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zeW5jX2NsaWVudCA9IHN5bmNfY2xpZW50O1xuICAgICAgICBsZXQgZG9tYWluID0gb3B0cy5OU1BfRU1BSUxfRE9NQUlOO1xuICAgICAgICBpZiAoZG9tYWluID09PSB1bmRlZmluZWQgfHwgZG9tYWluID09PSBudWxsIHx8IGRvbWFpbiA9PT0gXCJcIikge1xuICAgICAgICAgICAgZG9tYWluID0gdW5kZWZpbmVkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kb21haW4gPSBkb21haW47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2FkIHRoZSBPQXV0aDIgdG9rZW4uXG4gICAgICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgYm9vbGVhbiBpbmRpY2F0aW5nIGlmIHRoZSB0b2tlbiB3YXMgbG9hZGVkLlxuICAgICAqL1xuICAgIGFzeW5jIGxvYWRUb2tlbigpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgaWYgKCF0aGlzLmxvYWRlZCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgTG9va2luZyBmb3IgJHt0aGlzLnRva2VuX2tleX1gKTtcbiAgICAgICAgICAgICAgICBjb25zdCBvYXV0aDJEb2MgPSBhd2FpdCB0aGlzLnN5bmNfY2xpZW50XG4gICAgICAgICAgICAgICAgICAgIC5kb2N1bWVudHModGhpcy50b2tlbl9rZXkpXG4gICAgICAgICAgICAgICAgICAgIC5mZXRjaCgpO1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgb2F1dGgyRG9jID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICAgICAgb2F1dGgyRG9jLmRhdGEgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgICAgIG9hdXRoMkRvYy5kYXRhLnRva2VuID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYERpZG4ndCBmaW5kICR7dGhpcy50b2tlbl9rZXl9YCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBvYXV0aDJEb2MuZGF0YS50b2tlbjtcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGVfc2NvcGVzKG9hdXRoMkRvYy5kYXRhLnNjb3BlcywgU0NPUEVTKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vYXV0aDJfY2xpZW50LnNldENyZWRlbnRpYWxzKHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYExvYWRlZCB0b2tlbiAke3RoaXMudG9rZW5fa2V5fWApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgICAgICBgRmFpbGVkIHRvIGxvYWQgdG9rZW4gZm9yICR7dGhpcy50b2tlbl9rZXl9LlxcbiAke2V9YFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZGVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdG9rZW4ga2V5LlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSB0b2tlbiBrZXkuXG4gICAgICovXG4gICAgZ2V0IHRva2VuX2tleSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYG9hdXRoMl8ke3RoaXMubnVtYmVyfWA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVsZXRlIHRoZSBPQXV0aDIgdG9rZW4uXG4gICAgICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgYm9vbGVhbiBpbmRpY2F0aW5nIGlmIHRoZSB0b2tlbiB3YXMgZGVsZXRlZC5cbiAgICAgKi9cbiAgICBhc3luYyBkZWxldGVUb2tlbigpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgY29uc3Qgb2F1dGgyRG9jID0gYXdhaXQgdGhpcy5zeW5jX2NsaWVudFxuICAgICAgICAgICAgLmRvY3VtZW50cyh0aGlzLnRva2VuX2tleSlcbiAgICAgICAgICAgIC5mZXRjaCgpO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICBvYXV0aDJEb2MgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgb2F1dGgyRG9jLmRhdGEgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICBvYXV0aDJEb2MuZGF0YS50b2tlbiA9PT0gdW5kZWZpbmVkXG4gICAgICAgICkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYERpZG4ndCBmaW5kICR7dGhpcy50b2tlbl9rZXl9YCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgdGhpcy5zeW5jX2NsaWVudC5kb2N1bWVudHMob2F1dGgyRG9jLnNpZCkucmVtb3ZlKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBEZWxldGVkIHRva2VuICR7dGhpcy50b2tlbl9rZXl9YCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbXBsZXRlIHRoZSBsb2dpbiBwcm9jZXNzIGJ5IGV4Y2hhbmdpbmcgdGhlIGF1dGhvcml6YXRpb24gY29kZSBmb3IgYSB0b2tlbi5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29kZSAtIFRoZSBhdXRob3JpemF0aW9uIGNvZGUuXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gc2NvcGVzIC0gVGhlIHNjb3BlcyB0byB2YWxpZGF0ZS5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgbG9naW4gcHJvY2VzcyBpcyBjb21wbGV0ZS5cbiAgICAgKi9cbiAgICBhc3luYyBjb21wbGV0ZUxvZ2luKGNvZGU6IHN0cmluZywgc2NvcGVzOiBzdHJpbmdbXSk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICB2YWxpZGF0ZV9zY29wZXMoc2NvcGVzLCBTQ09QRVMpO1xuICAgICAgICBjb25zdCB0b2tlbiA9IGF3YWl0IHRoaXMub2F1dGgyX2NsaWVudC5nZXRUb2tlbihjb2RlKTtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoT2JqZWN0LmtleXModG9rZW4ucmVzISkpKTtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodG9rZW4udG9rZW5zKSk7XG4gICAgICAgIHRoaXMub2F1dGgyX2NsaWVudC5zZXRDcmVkZW50aWFscyh0b2tlbi50b2tlbnMpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3Qgb2F1dGhEb2MgPSBhd2FpdCB0aGlzLnN5bmNfY2xpZW50LmRvY3VtZW50cy5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6IHsgdG9rZW46IHRva2VuLnRva2Vucywgc2NvcGVzOiBzY29wZXMgfSxcbiAgICAgICAgICAgICAgICB1bmlxdWVOYW1lOiB0aGlzLnRva2VuX2tleSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICBgRXhjZXB0aW9uIHdoZW4gY3JlYXRpbmcgb2F1dGguIFRyeWluZyB0byB1cGRhdGUgaW5zdGVhZC4uLlxcbiR7ZX1gXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29uc3Qgb2F1dGhEb2MgPSBhd2FpdCB0aGlzLnN5bmNfY2xpZW50XG4gICAgICAgICAgICAgICAgLmRvY3VtZW50cyh0aGlzLnRva2VuX2tleSlcbiAgICAgICAgICAgICAgICAudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogeyB0b2tlbjogdG9rZW4sIHNjb3Blczogc2NvcGVzIH0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGF1dGhvcml6YXRpb24gVVJMLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHN0cmluZz59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSBhdXRob3JpemF0aW9uIFVSTC5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRBdXRoVXJsKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIGNvbnN0IGlkID0gdGhpcy5nZW5lcmF0ZVJhbmRvbVN0cmluZygpO1xuICAgICAgICBjb25zb2xlLmxvZyhgVXNpbmcgbm9uY2UgJHtpZH0gZm9yICR7dGhpcy5udW1iZXJ9YCk7XG4gICAgICAgIGNvbnN0IGRvYyA9IGF3YWl0IHRoaXMuc3luY19jbGllbnQuZG9jdW1lbnRzLmNyZWF0ZSh7XG4gICAgICAgICAgICBkYXRhOiB7IG51bWJlcjogdGhpcy5udW1iZXIsIHNjb3BlczogU0NPUEVTIH0sXG4gICAgICAgICAgICB1bmlxdWVOYW1lOiBpZCxcbiAgICAgICAgICAgIHR0bDogNjAgKiA1LCAvLyA1IG1pbnV0ZXNcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBNYWRlIG5vbmNlLWRvYzogJHtKU09OLnN0cmluZ2lmeShkb2MpfWApO1xuXG4gICAgICAgIGNvbnN0IG9wdHM6IEdlbmVyYXRlQXV0aFVybE9wdHMgPSB7XG4gICAgICAgICAgICBhY2Nlc3NfdHlwZTogXCJvZmZsaW5lXCIsXG4gICAgICAgICAgICBzY29wZTogU0NPUEVTLFxuICAgICAgICAgICAgc3RhdGU6IGlkLFxuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5kb21haW4pIHtcbiAgICAgICAgICAgIG9wdHNbXCJoZFwiXSA9IHRoaXMuZG9tYWluO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYXV0aFVybCA9IHRoaXMub2F1dGgyX2NsaWVudC5nZW5lcmF0ZUF1dGhVcmwob3B0cyk7XG4gICAgICAgIHJldHVybiBhdXRoVXJsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlIGEgcmFuZG9tIHN0cmluZy5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBBIHJhbmRvbSBzdHJpbmcuXG4gICAgICovXG4gICAgZ2VuZXJhdGVSYW5kb21TdHJpbmcoKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gMzA7XG4gICAgICAgIGxldCByZXN1bHQgPSBcIlwiO1xuICAgICAgICBjb25zdCBjaGFyYWN0ZXJzID1cbiAgICAgICAgICAgIFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODlcIjtcbiAgICAgICAgY29uc3QgY2hhcmFjdGVyc0xlbmd0aCA9IGNoYXJhY3RlcnMubGVuZ3RoO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gY2hhcmFjdGVycy5jaGFyQXQoXG4gICAgICAgICAgICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hhcmFjdGVyc0xlbmd0aClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5cbi8qKlxuICogSW50ZXJmYWNlIHJlcHJlc2VudGluZyB0aGUgdXNlciBjcmVkZW50aWFscyBjb25maWd1cmF0aW9uLlxuICovXG5leHBvcnQgeyBVc2VyQ3JlZHMsIFNDT1BFUyBhcyBVc2VyQ3JlZHNTY29wZXMgfTtcbiIsIi8qKlxuICogUmVwcmVzZW50cyBhIGNoZWNrLWluIHZhbHVlIHdpdGggdmFyaW91cyBwcm9wZXJ0aWVzIGFuZCBsb29rdXAgdmFsdWVzLlxuICovXG5jbGFzcyBDaGVja2luVmFsdWUge1xuICAgIGtleTogc3RyaW5nO1xuICAgIHNoZWV0c192YWx1ZTogc3RyaW5nO1xuICAgIHNtc19kZXNjOiBzdHJpbmc7XG4gICAgZmFzdF9jaGVja2luczogc3RyaW5nW107XG4gICAgbG9va3VwX3ZhbHVlczogU2V0PHN0cmluZz47XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIENoZWNraW5WYWx1ZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gVGhlIGtleSBmb3IgdGhlIGNoZWNrLWluIHZhbHVlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaGVldHNfdmFsdWUgLSBUaGUgdmFsdWUgdXNlZCBpbiBzaGVldHMuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNtc19kZXNjIC0gVGhlIGRlc2NyaXB0aW9uIHVzZWQgaW4gU01TLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgc3RyaW5nW119IGZhc3RfY2hlY2tpbnMgLSBUaGUgZmFzdCBjaGVjay1pbiB2YWx1ZXMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGtleTogc3RyaW5nLFxuICAgICAgICBzaGVldHNfdmFsdWU6IHN0cmluZyxcbiAgICAgICAgc21zX2Rlc2M6IHN0cmluZyxcbiAgICAgICAgZmFzdF9jaGVja2luczogc3RyaW5nIHwgc3RyaW5nW11cbiAgICApIHtcbiAgICAgICAgaWYgKCEoZmFzdF9jaGVja2lucyBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgICAgICAgZmFzdF9jaGVja2lucyA9IFtmYXN0X2NoZWNraW5zXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmtleSA9IGtleTtcbiAgICAgICAgdGhpcy5zaGVldHNfdmFsdWUgPSBzaGVldHNfdmFsdWU7XG4gICAgICAgIHRoaXMuc21zX2Rlc2MgPSBzbXNfZGVzYztcbiAgICAgICAgdGhpcy5mYXN0X2NoZWNraW5zID0gZmFzdF9jaGVja2lucy5tYXAoKHgpID0+IHgudHJpbSgpLnRvTG93ZXJDYXNlKCkpO1xuXG4gICAgICAgIGNvbnN0IHNtc19kZXNjX3NwbGl0OiBzdHJpbmdbXSA9IHNtc19kZXNjXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxzKy8sIFwiLVwiKVxuICAgICAgICAgICAgLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgIC5zcGxpdChcIi9cIik7XG4gICAgICAgIGNvbnN0IGxvb2t1cF92YWxzID0gWy4uLnRoaXMuZmFzdF9jaGVja2lucywgLi4uc21zX2Rlc2Nfc3BsaXRdO1xuICAgICAgICB0aGlzLmxvb2t1cF92YWx1ZXMgPSBuZXcgU2V0PHN0cmluZz4obG9va3VwX3ZhbHMpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgY29sbGVjdGlvbiBvZiBjaGVjay1pbiB2YWx1ZXMgd2l0aCB2YXJpb3VzIGxvb2t1cCBtZXRob2RzLlxuICovXG5jbGFzcyBDaGVja2luVmFsdWVzIHtcbiAgICBieV9rZXk6IHsgW2tleTogc3RyaW5nXTogQ2hlY2tpblZhbHVlIH0gPSB7fTtcbiAgICBieV9sdjogeyBba2V5OiBzdHJpbmddOiBDaGVja2luVmFsdWUgfSA9IHt9O1xuICAgIGJ5X2ZjOiB7IFtrZXk6IHN0cmluZ106IENoZWNraW5WYWx1ZSB9ID0ge307XG4gICAgYnlfc2hlZXRfc3RyaW5nOiB7IFtrZXk6IHN0cmluZ106IENoZWNraW5WYWx1ZSB9ID0ge307XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIENoZWNraW5WYWx1ZXMuXG4gICAgICogQHBhcmFtIHtDaGVja2luVmFsdWVbXX0gY2hlY2tpblZhbHVlcyAtIFRoZSBhcnJheSBvZiBjaGVjay1pbiB2YWx1ZXMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY2hlY2tpblZhbHVlczogQ2hlY2tpblZhbHVlW10pIHtcbiAgICAgICAgZm9yICh2YXIgY2hlY2tpblZhbHVlIG9mIGNoZWNraW5WYWx1ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuYnlfa2V5W2NoZWNraW5WYWx1ZS5rZXldID0gY2hlY2tpblZhbHVlO1xuICAgICAgICAgICAgdGhpcy5ieV9zaGVldF9zdHJpbmdbY2hlY2tpblZhbHVlLnNoZWV0c192YWx1ZV0gPSBjaGVja2luVmFsdWU7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGx2IG9mIGNoZWNraW5WYWx1ZS5sb29rdXBfdmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ieV9sdltsdl0gPSBjaGVja2luVmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZjIG9mIGNoZWNraW5WYWx1ZS5mYXN0X2NoZWNraW5zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ieV9mY1tmY10gPSBjaGVja2luVmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBlbnRyaWVzIG9mIGNoZWNrLWluIHZhbHVlcyBieSBrZXkuXG4gICAgICogQHJldHVybnMge0FycmF5fSBUaGUgZW50cmllcyBvZiBjaGVjay1pbiB2YWx1ZXMuXG4gICAgICovXG4gICAgZW50cmllcygpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKHRoaXMuYnlfa2V5KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZXMgYSBmYXN0IGNoZWNrLWluIHZhbHVlIGZyb20gdGhlIGdpdmVuIGJvZHkgc3RyaW5nLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5IC0gVGhlIGJvZHkgc3RyaW5nIHRvIHBhcnNlLlxuICAgICAqIEByZXR1cm5zIHtDaGVja2luVmFsdWUgfCB1bmRlZmluZWR9IFRoZSBwYXJzZWQgY2hlY2staW4gdmFsdWUgb3IgdW5kZWZpbmVkLlxuICAgICAqL1xuICAgIHBhcnNlX2Zhc3RfY2hlY2tpbihib2R5OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnlfZmNbYm9keV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIGEgY2hlY2staW4gdmFsdWUgZnJvbSB0aGUgZ2l2ZW4gYm9keSBzdHJpbmcuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHkgLSBUaGUgYm9keSBzdHJpbmcgdG8gcGFyc2UuXG4gICAgICogQHJldHVybnMge0NoZWNraW5WYWx1ZSB8IHVuZGVmaW5lZH0gVGhlIHBhcnNlZCBjaGVjay1pbiB2YWx1ZSBvciB1bmRlZmluZWQuXG4gICAgICovXG4gICAgcGFyc2VfY2hlY2tpbihib2R5OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgY2hlY2tpbl9sb3dlciA9IGJvZHkucmVwbGFjZSgvXFxzKy8sIFwiXCIpO1xuICAgICAgICByZXR1cm4gdGhpcy5ieV9sdltjaGVja2luX2xvd2VyXTtcbiAgICB9XG59XG5cbmV4cG9ydCB7IENoZWNraW5WYWx1ZSwgQ2hlY2tpblZhbHVlcyB9IiwiLyoqXG4gKiBDb252ZXJ0IGFuIEV4Y2VsIGRhdGUgdG8gYSBKYXZhU2NyaXB0IERhdGUgb2JqZWN0LlxuICogQHBhcmFtIHtudW1iZXJ9IGRhdGUgLSBUaGUgRXhjZWwgZGF0ZS5cbiAqIEByZXR1cm5zIHtEYXRlfSBUaGUgSmF2YVNjcmlwdCBEYXRlIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gZXhjZWxfZGF0ZV90b19qc19kYXRlKGRhdGU6IG51bWJlcik6IERhdGUge1xuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBEYXRlKDApO1xuICAgIHJlc3VsdC5zZXRVVENNaWxsaXNlY29uZHMoTWF0aC5yb3VuZCgoZGF0ZSAtIDI1NTY5KSAqIDg2NDAwICogMTAwMCkpO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ2hhbmdlIHRoZSB0aW1lem9uZSBvZiBhIERhdGUgb2JqZWN0IHRvIFBTVC5cbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSAtIFRoZSBEYXRlIG9iamVjdC5cbiAqIEByZXR1cm5zIHtEYXRlfSBUaGUgRGF0ZSBvYmplY3Qgd2l0aCB0aGUgdGltZXpvbmUgc2V0IHRvIFBTVC5cbiAqL1xuZnVuY3Rpb24gY2hhbmdlX3RpbWV6b25lX3RvX3BzdChkYXRlOiBEYXRlKTogRGF0ZSB7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IERhdGUoZGF0ZS50b1VUQ1N0cmluZygpLnJlcGxhY2UoXCIgR01UXCIsIFwiIFBTVFwiKSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBTdHJpcCB0aGUgdGltZSBmcm9tIGEgRGF0ZSBvYmplY3QsIGtlZXBpbmcgb25seSB0aGUgZGF0ZS5cbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSAtIFRoZSBEYXRlIG9iamVjdC5cbiAqIEByZXR1cm5zIHtEYXRlfSBUaGUgRGF0ZSBvYmplY3Qgd2l0aCB0aGUgdGltZSBzdHJpcHBlZC5cbiAqL1xuZnVuY3Rpb24gc3RyaXBfZGF0ZXRpbWVfdG9fZGF0ZShkYXRlOiBEYXRlKTogRGF0ZSB7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IERhdGUoXG4gICAgICAgIGRhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKFwiZW4tVVNcIiwgeyB0aW1lWm9uZTogXCJBbWVyaWNhL0xvc19BbmdlbGVzXCIgfSlcbiAgICApO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogU2FuaXRpemUgYSBkYXRlIGJ5IGNvbnZlcnRpbmcgaXQgZnJvbSBhbiBFeGNlbCBkYXRlIGFuZCBzdHJpcHBpbmcgdGhlIHRpbWUuXG4gKiBAcGFyYW0ge251bWJlcn0gZGF0ZSAtIFRoZSBFeGNlbCBkYXRlLlxuICogQHJldHVybnMge0RhdGV9IFRoZSBzYW5pdGl6ZWQgRGF0ZSBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIHNhbml0aXplX2RhdGUoZGF0ZTogbnVtYmVyKTogRGF0ZSB7XG4gICAgY29uc3QgcmVzdWx0ID0gc3RyaXBfZGF0ZXRpbWVfdG9fZGF0ZShcbiAgICAgICAgY2hhbmdlX3RpbWV6b25lX3RvX3BzdChleGNlbF9kYXRlX3RvX2pzX2RhdGUoZGF0ZSkpXG4gICAgKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEZvcm1hdCBhIERhdGUgb2JqZWN0IGZvciB1c2UgaW4gYSBzcHJlYWRzaGVldCB2YWx1ZS5cbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSAtIFRoZSBEYXRlIG9iamVjdC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgZGF0ZSBzdHJpbmcgaW4gUFNUXG4gKi9cbmZ1bmN0aW9uIGZvcm1hdF9kYXRlX2Zvcl9zcHJlYWRzaGVldF92YWx1ZShkYXRlOiBEYXRlKTogc3RyaW5nIHtcbiAgICAgY29uc3QgZGF0ZXN0ciA9IGRhdGVcbiAgICAgICAgIC50b0xvY2FsZURhdGVTdHJpbmcoXCJlbi1VU1wiLCB7IHRpbWVab25lOiBcIkFtZXJpY2EvTG9zX0FuZ2VsZXNcIiB9KVxuICAgICAgICAuc3BsaXQoXCIvXCIpXG4gICAgICAgIC5tYXAoKHgpID0+IHgucGFkU3RhcnQoMiwgXCIwXCIpKVxuICAgICAgICAuam9pbihcIlwiKTtcbiAgICByZXR1cm4gZGF0ZXN0cjtcbn1cblxuLyoqXG4gKiBGaWx0ZXIgYSBsaXN0IHRvIGluY2x1ZGUgb25seSBpdGVtcyB0aGF0IGVuZCB3aXRoIGEgc3BlY2lmaWMgZGF0ZS5cbiAqIEBwYXJhbSB7YW55W119IGxpc3QgLSBUaGUgbGlzdCB0byBmaWx0ZXIuXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgLSBUaGUgZGF0ZSB0byBmaWx0ZXIgYnkuXG4gKiBAcmV0dXJucyB7YW55W119IFRoZSBmaWx0ZXJlZCBsaXN0LlxuICovXG5mdW5jdGlvbiBmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9kYXRlKGxpc3Q6IGFueVtdLCBkYXRlOiBEYXRlKTogYW55W10ge1xuICAgIGNvbnN0IGRhdGVzdHIgPSBmb3JtYXRfZGF0ZV9mb3Jfc3ByZWFkc2hlZXRfdmFsdWUoZGF0ZSk7XG4gICAgcmV0dXJuIGxpc3QubWFwKCh4KSA9PiB4Py50b1N0cmluZygpKS5maWx0ZXIoKHgpID0+IHg/LmVuZHNXaXRoKGRhdGVzdHIpKTtcbn1cblxuLyoqXG4gKiBGaWx0ZXIgYSBsaXN0IHRvIGluY2x1ZGUgb25seSBpdGVtcyB0aGF0IGVuZCB3aXRoIHRoZSBjdXJyZW50IGRhdGUuXG4gKiBAcGFyYW0ge2FueVtdfSBsaXN0IC0gVGhlIGxpc3QgdG8gZmlsdGVyLlxuICogQHJldHVybnMge2FueVtdfSBUaGUgZmlsdGVyZWQgbGlzdC5cbiAqL1xuZnVuY3Rpb24gZmlsdGVyX2xpc3RfdG9fZW5kc3dpdGhfY3VycmVudF9kYXkobGlzdDogYW55W10pOiBhbnlbXSB7XG4gICAgcmV0dXJuIGZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2RhdGUobGlzdCwgbmV3IERhdGUoKSk7XG59XG5cbmV4cG9ydCB7XG4gICAgc2FuaXRpemVfZGF0ZSxcbiAgICBleGNlbF9kYXRlX3RvX2pzX2RhdGUsXG4gICAgY2hhbmdlX3RpbWV6b25lX3RvX3BzdCxcbiAgICBzdHJpcF9kYXRldGltZV90b19kYXRlLFxuICAgIGZvcm1hdF9kYXRlX2Zvcl9zcHJlYWRzaGVldF92YWx1ZSxcbiAgICBmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9kYXRlLFxuICAgIGZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2N1cnJlbnRfZGF5LFxufTsiLCJpbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCAnQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlcyc7XG5cbi8qKlxuICogTG9hZCBjcmVkZW50aWFscyBmcm9tIGEgSlNPTiBmaWxlLlxuICogQHJldHVybnMge2FueX0gVGhlIHBhcnNlZCBjcmVkZW50aWFscyBmcm9tIHRoZSBKU09OIGZpbGUuXG4gKi9cbmZ1bmN0aW9uIGxvYWRfY3JlZGVudGlhbHNfZmlsZXMoKTogYW55IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShcbiAgICAgICAgZnNcbiAgICAgICAgICAgIC5yZWFkRmlsZVN5bmMoUnVudGltZS5nZXRBc3NldHMoKVtcIi9jcmVkZW50aWFscy5qc29uXCJdLnBhdGgpXG4gICAgICAgICAgICAudG9TdHJpbmcoKVxuICAgICk7XG59XG5cbi8qKlxuICogR2V0IHRoZSBwYXRoIHRvIHRoZSBzZXJ2aWNlIGNyZWRlbnRpYWxzIGZpbGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgcGF0aCB0byB0aGUgc2VydmljZSBjcmVkZW50aWFscyBmaWxlLlxuICovXG5mdW5jdGlvbiBnZXRfc2VydmljZV9jcmVkZW50aWFsc19wYXRoKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFJ1bnRpbWUuZ2V0QXNzZXRzKClbXCIvc2VydmljZS1jcmVkZW50aWFscy5qc29uXCJdLnBhdGg7XG59XG5cbmV4cG9ydCB7IGxvYWRfY3JlZGVudGlhbHNfZmlsZXMsIGdldF9zZXJ2aWNlX2NyZWRlbnRpYWxzX3BhdGggfTsiLCJpbXBvcnQgeyBzaGVldHNfdjQgfSBmcm9tIFwiZ29vZ2xlYXBpc1wiO1xuaW1wb3J0IHsgZXhjZWxfcm93X3RvX2luZGV4IH0gZnJvbSBcIi4vdXRpbFwiO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQgdGFiLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYiB7XG4gICAgc2hlZXRzX3NlcnZpY2U6IHNoZWV0c192NC5TaGVldHMgfCBudWxsO1xuICAgIHNoZWV0X2lkOiBzdHJpbmc7XG4gICAgc2hlZXRfbmFtZTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIuXG4gICAgICogQHBhcmFtIHtzaGVldHNfdjQuU2hlZXRzIHwgbnVsbH0gc2hlZXRzX3NlcnZpY2UgLSBUaGUgR29vZ2xlIFNoZWV0cyBBUEkgc2VydmljZSBpbnN0YW5jZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2hlZXRfaWQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNoZWV0X25hbWUgLSBUaGUgbmFtZSBvZiB0aGUgc2hlZXQgdGFiLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyB8IG51bGwsXG4gICAgICAgIHNoZWV0X2lkOiBzdHJpbmcsXG4gICAgICAgIHNoZWV0X25hbWU6IHN0cmluZ1xuICAgICkge1xuICAgICAgICB0aGlzLnNoZWV0c19zZXJ2aWNlID0gc2hlZXRzX3NlcnZpY2U7XG4gICAgICAgIHRoaXMuc2hlZXRfaWQgPSBzaGVldF9pZDtcbiAgICAgICAgdGhpcy5zaGVldF9uYW1lID0gc2hlZXRfbmFtZS5zcGxpdChcIiFcIilbMF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHZhbHVlcyBmcm9tIHRoZSBzaGVldC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bGx9IFtyYW5nZV0gLSBUaGUgcmFuZ2UgdG8gZ2V0IHZhbHVlcyBmcm9tLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueVtdW10gfCB1bmRlZmluZWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgdmFsdWVzIGZyb20gdGhlIHNoZWV0LlxuICAgICAqL1xuICAgIGFzeW5jIGdldF92YWx1ZXMocmFuZ2U/OiBzdHJpbmcgfCBudWxsKTogUHJvbWlzZTxhbnlbXVtdIHwgdW5kZWZpbmVkPiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2dldF92YWx1ZXMocmFuZ2UpO1xuICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGEudmFsdWVzID8/IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHJvdyBmb3IgYSBzcGVjaWZpYyBwYXRyb2xsZXIuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdHJvbGxlcl9uYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHBhdHJvbGxlci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZV9jb2x1bW4gLSBUaGUgY29sdW1uIHdoZXJlIHRoZSBwYXRyb2xsZXIncyBuYW1lIGlzIGxvY2F0ZWQuXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCBudWxsfSBbcmFuZ2VdIC0gVGhlIHJhbmdlIHRvIHNlYXJjaCB3aXRoaW4uXG4gICAgICogQHJldHVybnMge1Byb21pc2U8eyByb3c6IGFueVtdOyBpbmRleDogbnVtYmVyOyB9IHwgbnVsbD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSByb3cgYW5kIGluZGV4IG9mIHRoZSBwYXRyb2xsZXIsIG9yIG51bGwgaWYgbm90IGZvdW5kLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF9zaGVldF9yb3dfZm9yX3BhdHJvbGxlcihcbiAgICAgICAgcGF0cm9sbGVyX25hbWU6IHN0cmluZyxcbiAgICAgICAgbmFtZV9jb2x1bW46IHN0cmluZyxcbiAgICAgICAgcmFuZ2U/OiBzdHJpbmcgfCBudWxsXG4gICAgKTogUHJvbWlzZTx7IHJvdzogYW55W107IGluZGV4OiBudW1iZXI7IH0gfCBudWxsPiB7XG4gICAgICAgIGNvbnN0IHJvd3MgPSBhd2FpdCB0aGlzLmdldF92YWx1ZXMocmFuZ2UpO1xuICAgICAgICBpZiAocm93cykge1xuICAgICAgICAgICAgY29uc3QgbG9va3VwX2luZGV4ID0gZXhjZWxfcm93X3RvX2luZGV4KG5hbWVfY29sdW1uKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm93cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChyb3dzW2ldW2xvb2t1cF9pbmRleF0gPT09IHBhdHJvbGxlcl9uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHJvdzogcm93c1tpXSwgaW5kZXg6IGkgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgIGBDb3VsZG4ndCBmaW5kIHBhdHJvbGxlciAke3BhdHJvbGxlcl9uYW1lfSBpbiBzaGVldCAke3RoaXMuc2hlZXRfbmFtZX0uYFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdmFsdWVzIGluIHRoZSBzaGVldC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmFuZ2UgLSBUaGUgcmFuZ2UgdG8gdXBkYXRlLlxuICAgICAqIEBwYXJhbSB7YW55W11bXX0gdmFsdWVzIC0gVGhlIHZhbHVlcyB0byB1cGRhdGUuXG4gICAgICovXG4gICAgYXN5bmMgdXBkYXRlX3ZhbHVlcyhyYW5nZTogc3RyaW5nLCB2YWx1ZXM6IGFueVtdW10pIHtcbiAgICAgICAgY29uc3QgdXBkYXRlTWUgPSAoYXdhaXQgdGhpcy5fZ2V0X3ZhbHVlcyhyYW5nZSwgbnVsbCkpLmRhdGE7XG5cbiAgICAgICAgdXBkYXRlTWUudmFsdWVzID0gdmFsdWVzO1xuICAgICAgICBhd2FpdCB0aGlzLnNoZWV0c19zZXJ2aWNlIS5zcHJlYWRzaGVldHMudmFsdWVzLnVwZGF0ZSh7XG4gICAgICAgICAgICBzcHJlYWRzaGVldElkOiB0aGlzLnNoZWV0X2lkLFxuICAgICAgICAgICAgdmFsdWVJbnB1dE9wdGlvbjogXCJVU0VSX0VOVEVSRURcIixcbiAgICAgICAgICAgIHJhbmdlOiB1cGRhdGVNZS5yYW5nZSEsXG4gICAgICAgICAgICByZXF1ZXN0Qm9keTogdXBkYXRlTWUsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB2YWx1ZXMgZnJvbSB0aGUgc2hlZXQgKHByaXZhdGUgbWV0aG9kKS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bGx9IFtyYW5nZV0gLSBUaGUgcmFuZ2UgdG8gZ2V0IHZhbHVlcyBmcm9tLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbH0gW3ZhbHVlUmVuZGVyT3B0aW9uXSAtIFRoZSB2YWx1ZSByZW5kZXIgb3B0aW9uLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueVtdW10+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgdmFsdWUgcmFuZ2UuXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIGFzeW5jIF9nZXRfdmFsdWVzKFxuICAgICAgICByYW5nZT86IHN0cmluZyB8IG51bGwsXG4gICAgICAgIHZhbHVlUmVuZGVyT3B0aW9uOiBzdHJpbmcgfCBudWxsID0gXCJVTkZPUk1BVFRFRF9WQUxVRVwiXG4gICAgKSB7XG4gICAgICAgIGxldCBsb29rdXBSYW5nZSA9IHRoaXMuc2hlZXRfbmFtZTtcbiAgICAgICAgaWYgKHJhbmdlICE9IG51bGwpIHtcbiAgICAgICAgICAgIGxvb2t1cFJhbmdlID0gbG9va3VwUmFuZ2UgKyBcIiFcIjtcblxuICAgICAgICAgICAgaWYgKHJhbmdlLnN0YXJ0c1dpdGgobG9va3VwUmFuZ2UpKSB7XG4gICAgICAgICAgICAgICAgcmFuZ2UgPSByYW5nZS5zdWJzdHJpbmcobG9va3VwUmFuZ2UubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvb2t1cFJhbmdlID0gbG9va3VwUmFuZ2UgKyByYW5nZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgb3B0czogc2hlZXRzX3Y0LlBhcmFtcyRSZXNvdXJjZSRTcHJlYWRzaGVldHMkVmFsdWVzJEdldCA9IHtcbiAgICAgICAgICAgIHNwcmVhZHNoZWV0SWQ6IHRoaXMuc2hlZXRfaWQsXG4gICAgICAgICAgICByYW5nZTogbG9va3VwUmFuZ2UsXG4gICAgICAgIH07XG4gICAgICAgIGlmICh2YWx1ZVJlbmRlck9wdGlvbikge1xuICAgICAgICAgICAgb3B0cy52YWx1ZVJlbmRlck9wdGlvbiA9IHZhbHVlUmVuZGVyT3B0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuc2hlZXRzX3NlcnZpY2UhLnNwcmVhZHNoZWV0cy52YWx1ZXMuZ2V0KG9wdHMpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cbiIsIlxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkX3Bhc3Nlc19zdHJpbmcoXG4gICAgdXNlZDogbnVtYmVyLFxuICAgIHRvdGFsOiBudW1iZXIsXG4gICAgdG9kYXk6IG51bWJlcixcbiAgICBmb3JjZV90b2RheTogYm9vbGVhbiA9IGZhbHNlXG4pIHtcbiAgICBsZXQgbWVzc2FnZSA9IGBZb3UgaGF2ZSB1c2VkICR7dXNlZH0gb2YgJHt0b3RhbH0gZ3Vlc3QgcGFzc2VzIHRoaXMgc2Vhc29uYDtcbiAgICBpZiAoZm9yY2VfdG9kYXkgfHwgdG9kYXkgPiAwKSB7XG4gICAgICAgIG1lc3NhZ2UgKz0gYCAoJHt0b2RheX0gdXNlZCB0b2RheSlgO1xuICAgIH1cbiAgICBtZXNzYWdlICs9IFwiLlwiO1xuICAgIHJldHVybiBtZXNzYWdlO1xufVxuIiwiLyoqXG4gKiBWYWxpZGF0ZXMgaWYgdGhlIHByb3ZpZGVkIHNjb3BlcyBpbmNsdWRlIGFsbCBkZXNpcmVkIHNjb3Blcy5cbiAqIEBwYXJhbSB7c3RyaW5nW119IHNjb3BlcyAtIFRoZSBsaXN0IG9mIHNjb3BlcyB0byB2YWxpZGF0ZS5cbiAqIEBwYXJhbSB7c3RyaW5nW119IGRlc2lyZWRfc2NvcGVzIC0gVGhlIGxpc3Qgb2YgZGVzaXJlZCBzY29wZXMuXG4gKiBAdGhyb3dzIHtFcnJvcn0gVGhyb3dzIGFuIGVycm9yIGlmIGFueSBkZXNpcmVkIHNjb3BlIGlzIG1pc3NpbmcuXG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlX3Njb3BlcyhzY29wZXM6IHN0cmluZ1tdLCBkZXNpcmVkX3Njb3Blczogc3RyaW5nW10pIHtcbiAgICBmb3IgKGNvbnN0IGRlc2lyZWRfc2NvcGUgb2YgZGVzaXJlZF9zY29wZXMpIHtcbiAgICAgICAgaWYgKHNjb3BlcyA9PT0gdW5kZWZpbmVkIHx8ICFzY29wZXMuaW5jbHVkZXMoZGVzaXJlZF9zY29wZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gYE1pc3Npbmcgc2NvcGUgJHtkZXNpcmVkX3Njb3BlfSBpbiByZWNlaXZlZCBzY29wZXM6ICR7c2NvcGVzfWA7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IHt2YWxpZGF0ZV9zY29wZXN9IiwiaW1wb3J0IHsgU2VjdGlvbkNvbmZpZyB9IGZyb20gJy4uL2Vudi9oYW5kbGVyX2NvbmZpZyc7XG5cbi8qKlxuICAgICogQ2xhc3MgZm9yIHNlY3Rpb24gdmFsdWVzLlxuICAgICovXG5jbGFzcyBTZWN0aW9uVmFsdWVzIHtcbiAgICBzZWN0aW9uX2NvbmZpZzogU2VjdGlvbkNvbmZpZ1xuICAgIHNlY3Rpb25zOiBzdHJpbmdbXTtcbiAgICBsb3dlcmNhc2Vfc2VjdGlvbnM6IHN0cmluZ1tdO1xuXG4gICAgY29uc3RydWN0b3Ioc2VjdGlvbl9jb25maWc6IFNlY3Rpb25Db25maWcpIHtcbiAgICAgICAgdGhpcy5zZWN0aW9uX2NvbmZpZyA9IHNlY3Rpb25fY29uZmlnO1xuICAgICAgICB0aGlzLnNlY3Rpb25zID0gc2VjdGlvbl9jb25maWcuU0VDVElPTl9WQUxVRVMuc3BsaXQoJywnKTtcbiAgICAgICAgdGhpcy5sb3dlcmNhc2Vfc2VjdGlvbnMgPSBzZWN0aW9uX2NvbmZpZy5TRUNUSU9OX1ZBTFVFUy50b0xvd2VyQ2FzZSgpLnNwbGl0KCcsJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgc2VjdGlvbiBkZXNjcmlwdGlvbi5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgc2VjdGlvbiBkZXNjcmlwdGlvbi5cbiAgICAqL1xuICAgIGdldF9zZWN0aW9uX2Rlc2NyaXB0aW9uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlY3Rpb25fY29uZmlnLlNFQ1RJT05fVkFMVUVTO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogUGFyc2VzIGEgc2VjdGlvbi5cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5IC0gVGhlIGJvZHkgb2YgdGhlIHJlcXVlc3QuXG4gICAgKiBAcmV0dXJucyB7c3RyaW5nIHwgbnVsbH0gVGhlIHNlY3Rpb24gaWYgaXQgaXMgYSB2YWxpZCBzZWN0aW9uIG9yIG51bGwuXG4gICAgKi9cbiAgICBwYXJzZV9zZWN0aW9uKGJvZHk6IHN0cmluZyB8IG51bGwpOiBzdHJpbmcgfCBudWxsIHtcbiAgICAgICAgaWYgKGJvZHkgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgICByZXR1cm4gdGhpcy5sb3dlcmNhc2Vfc2VjdGlvbnMuaW5jbHVkZXMoYm9keS50b0xvd2VyQ2FzZSgpKSA/IGJvZHkgOiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogTWFwcyBhIGxvd2VyIGNhc2UgdmVyc2lvbiBvZiBhIHNlY3Rpb24gc3RyaW5nIHRvIHRoZSBvcmlnaW5hbCBjYXNlIHZhbHVlLlxuICAgICogQHBhcmFtIHtzdHJpbmd9IHNlY3Rpb24gLSBUaGUgbG93ZXIgY2FzZSBzZWN0aW9uIHN0cmluZy5cbiAgICAqIEByZXR1cm5zIHtzdHJpbmcgfSBUaGUgb3JpZ2luYWwgY2FzZSB2YWx1ZSBpZiBmb3VuZCwgb3RoZXJ3aXNlIG51bGwuXG4gICAgKi9cbiAgIG1hcF9zZWN0aW9uKHNlY3Rpb246IHN0cmluZyB8IG51bGwpOiBzdHJpbmcgIHtcbiAgICAgICBpZiAoc2VjdGlvbiA9PT0gbnVsbCkge1xuICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICB9XG4gICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmxvd2VyY2FzZV9zZWN0aW9ucy5pbmRleE9mKHNlY3Rpb24udG9Mb3dlckNhc2UoKSk7XG4gICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICByZXR1cm4gdGhpcy5zZWN0aW9uc1tpbmRleF07XG4gICAgICAgfVxuICAgICAgIHJldHVybiBcIlwiO1xuICAgfVxuXG59XG5cbmV4cG9ydCB7IFNlY3Rpb25WYWx1ZXMgfTsiLCIvKipcbiAqIENvbnZlcnQgcm93IGFuZCBjb2x1bW4gbnVtYmVycyB0byBhbiBFeGNlbC1saWtlIGluZGV4LlxuICogQHBhcmFtIHtudW1iZXJ9IHJvdyAtIFRoZSByb3cgbnVtYmVyICgwLWJhc2VkKS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBjb2wgLSBUaGUgY29sdW1uIG51bWJlciAoMC1iYXNlZCkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgRXhjZWwtbGlrZSBpbmRleCAoZS5nLiwgXCJBMVwiKS5cbiAqL1xuZnVuY3Rpb24gcm93X2NvbF90b19leGNlbF9pbmRleChyb3c6IG51bWJlciwgY29sOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGxldCBjb2xTdHJpbmcgPSBcIlwiO1xuICAgIGNvbCArPSAxO1xuICAgIHdoaWxlIChjb2wgPiAwKSB7XG4gICAgICAgIGNvbCAtPSAxO1xuICAgICAgICBjb25zdCBtb2R1bG8gPSBjb2wgJSAyNjtcbiAgICAgICAgY29uc3QgY29sTGV0dGVyID0gU3RyaW5nLmZyb21DaGFyQ29kZSgnQScuY2hhckNvZGVBdCgwKSArIG1vZHVsbyk7XG4gICAgICAgIGNvbFN0cmluZyA9IGNvbExldHRlciArIGNvbFN0cmluZztcbiAgICAgICAgY29sID0gTWF0aC5mbG9vcihjb2wgLyAyNik7XG4gICAgfVxuICAgIHJldHVybiBjb2xTdHJpbmcgKyAocm93ICsgMSkudG9TdHJpbmcoKTtcbn1cblxuLyoqXG4gKiBTcGxpdCBhbiBFeGNlbC1saWtlIGluZGV4IGludG8gcm93IGFuZCBjb2x1bW4gbnVtYmVycy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBleGNlbF9pbmRleCAtIFRoZSBFeGNlbC1saWtlIGluZGV4IChlLmcuLCBcIkExXCIpLlxuICogQHJldHVybnMge1tudW1iZXIsIG51bWJlcl19IEFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIHJvdyBhbmQgY29sdW1uIG51bWJlcnMgKDAtYmFzZWQpLlxuICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBpbmRleCBjYW5ub3QgYmUgcGFyc2VkLlxuICovXG5mdW5jdGlvbiBzcGxpdF90b19yb3dfY29sKGV4Y2VsX2luZGV4OiBzdHJpbmcpOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoXCJeKFtBLVphLXpdKykoWzAtOV0rKSRcIik7XG4gICAgY29uc3QgbWF0Y2ggPSByZWdleC5leGVjKGV4Y2VsX2luZGV4KTtcbiAgICBpZiAobWF0Y2ggPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gcGFyc2Ugc3RyaW5nIGZvciBleGNlbCBwb3NpdGlvbiBzcGxpdFwiKTtcbiAgICB9XG4gICAgY29uc3QgY29sID0gZXhjZWxfcm93X3RvX2luZGV4KG1hdGNoWzFdKTtcbiAgICBjb25zdCByYXdfcm93ID0gTnVtYmVyKG1hdGNoWzJdKTtcbiAgICBpZiAocmF3X3JvdyA8IDEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUm93IG11c3QgYmUgPj0xXCIpO1xuICAgIH1cbiAgICByZXR1cm4gW3Jhd19yb3cgLSAxLCBjb2xdO1xufVxuXG4vKipcbiAqIExvb2sgdXAgYSB2YWx1ZSBpbiBhIHNoZWV0IGJ5IGl0cyBFeGNlbC1saWtlIGluZGV4LlxuICogQHBhcmFtIHtzdHJpbmd9IGV4Y2VsX2luZGV4IC0gVGhlIEV4Y2VsLWxpa2UgaW5kZXggKGUuZy4sIFwiQTFcIikuXG4gKiBAcGFyYW0ge2FueVtdW119IHNoZWV0IC0gVGhlIHNoZWV0IGRhdGEuXG4gKiBAcmV0dXJucyB7YW55fSBUaGUgdmFsdWUgYXQgdGhlIHNwZWNpZmllZCBpbmRleCwgb3IgdW5kZWZpbmVkIGlmIG5vdCBmb3VuZC5cbiAqL1xuZnVuY3Rpb24gbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQoZXhjZWxfaW5kZXg6IHN0cmluZywgc2hlZXQ6IGFueVtdW10pOiBhbnkge1xuICAgIGNvbnN0IFtyb3csIGNvbF0gPSBzcGxpdF90b19yb3dfY29sKGV4Y2VsX2luZGV4KTtcbiAgICBpZiAocm93ID49IHNoZWV0Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gc2hlZXRbcm93XVtjb2xdO1xufVxuXG4vKipcbiAqIENvbnZlcnQgRXhjZWwtbGlrZSBjb2x1bW4gbGV0dGVycyB0byBhIGNvbHVtbiBudW1iZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gbGV0dGVycyAtIFRoZSBjb2x1bW4gbGV0dGVycyAoZS5nLiwgXCJBXCIpLlxuICogQHJldHVybnMge251bWJlcn0gVGhlIGNvbHVtbiBudW1iZXIgKDAtYmFzZWQpLlxuICovXG5mdW5jdGlvbiBleGNlbF9yb3dfdG9faW5kZXgobGV0dGVyczogc3RyaW5nKTogbnVtYmVyIHtcbiAgICBjb25zdCBsb3dlckxldHRlcnMgPSBsZXR0ZXJzLnRvTG93ZXJDYXNlKCk7XG4gICAgbGV0IHJlc3VsdDogbnVtYmVyID0gMDtcbiAgICBmb3IgKHZhciBwID0gMDsgcCA8IGxvd2VyTGV0dGVycy5sZW5ndGg7IHArKykge1xuICAgICAgICBjb25zdCBjaGFyYWN0ZXJWYWx1ZSA9XG4gICAgICAgICAgICBsb3dlckxldHRlcnMuY2hhckNvZGVBdChwKSAtIFwiYVwiLmNoYXJDb2RlQXQoMCkgKyAxO1xuICAgICAgICByZXN1bHQgPSBjaGFyYWN0ZXJWYWx1ZSArIHJlc3VsdCAqIDI2O1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0IC0gMTtcbn1cblxuLyoqXG4gKiBTYW5pdGl6ZSBhIHBob25lIG51bWJlciBieSByZW1vdmluZyB1bndhbnRlZCBjaGFyYWN0ZXJzLlxuICogQHBhcmFtIHtudW1iZXIgfCBzdHJpbmd9IG51bWJlciAtIFRoZSBwaG9uZSBudW1iZXIgdG8gc2FuaXRpemUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgc2FuaXRpemVkIHBob25lIG51bWJlci5cbiAqL1xuZnVuY3Rpb24gc2FuaXRpemVfcGhvbmVfbnVtYmVyKG51bWJlcjogbnVtYmVyIHwgc3RyaW5nKTogc3RyaW5nIHtcbiAgICBsZXQgbmV3X251bWJlciA9IG51bWJlci50b1N0cmluZygpO1xuICAgIG5ld19udW1iZXIgPSBuZXdfbnVtYmVyLnJlcGxhY2UoXCJ3aGF0c2FwcDpcIiwgXCJcIik7XG4gICAgbGV0IHRlbXBvcmFyeV9uZXdfbnVtYmVyOiBzdHJpbmcgPSBcIlwiO1xuICAgIHdoaWxlICh0ZW1wb3JhcnlfbmV3X251bWJlciAhPSBuZXdfbnVtYmVyKSB7XG4gICAgICAgIC8vIERvIHRoaXMgbXVsdGlwbGUgdGltZXMgc28gd2UgZ2V0IGFsbCArMSBhdCB0aGUgc3RhcnQgb2YgdGhlIHN0cmluZywgZXZlbiBhZnRlciBzdHJpcHBpbmcuXG4gICAgICAgIHRlbXBvcmFyeV9uZXdfbnVtYmVyID0gbmV3X251bWJlcjtcbiAgICAgICAgbmV3X251bWJlciA9IG5ld19udW1iZXIucmVwbGFjZSgvKF5cXCsxfFxcKHxcXCl8XFwufC0pL2csIFwiXCIpO1xuICAgIH1cbiAgICBjb25zdCByZXN1bHQgPSBTdHJpbmcocGFyc2VJbnQobmV3X251bWJlcikpLnBhZFN0YXJ0KDEwLCBcIjBcIik7XG4gICAgaWYgKHJlc3VsdC5sZW5ndGggPT0gMTEgJiYgcmVzdWx0WzBdID09IFwiMVwiKSB7XG4gICAgICAgIHJldHVybiByZXN1bHQuc3Vic3RyaW5nKDEpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQge1xuICAgIHJvd19jb2xfdG9fZXhjZWxfaW5kZXgsXG4gICAgZXhjZWxfcm93X3RvX2luZGV4LFxuICAgIHNhbml0aXplX3Bob25lX251bWJlcixcbiAgICBzcGxpdF90b19yb3dfY29sLFxuICAgIGxvb2t1cF9yb3dfY29sX2luX3NoZWV0LFxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImdvb2dsZWFwaXNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic21zLXNlZ21lbnRzLWNhbGN1bGF0b3JcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxuY29uc3QgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRjb25zdCBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0Y29uc3QgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdGNvbnN0IGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHRjb25zdCBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlci92YWx1ZSBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0aWYoQXJyYXkuaXNBcnJheShkZWZpbml0aW9uKSkge1xuXHRcdHZhciBpID0gMDtcblx0XHR3aGlsZShpIDwgZGVmaW5pdGlvbi5sZW5ndGgpIHtcblx0XHRcdHZhciBrZXkgPSBkZWZpbml0aW9uW2krK107XG5cdFx0XHR2YXIgYmluZGluZyA9IGRlZmluaXRpb25baSsrXTtcblx0XHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0XHRpZihiaW5kaW5nID09PSAwKSB7XG5cdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogZGVmaW5pdGlvbltpKytdIH0pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBiaW5kaW5nIH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYoYmluZGluZyA9PT0gMCkgeyBpKys7IH1cblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZihTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCJAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzXCI7XG5pbXBvcnQge1xuICAgIENvbnRleHQsXG4gICAgU2VydmVybGVzc0NhbGxiYWNrLFxuICAgIFNlcnZlcmxlc3NFdmVudE9iamVjdCxcbiAgICBTZXJ2ZXJsZXNzRnVuY3Rpb25TaWduYXR1cmUsXG59IGZyb20gXCJAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzL3R5cGVzXCI7XG5pbXBvcnQgQlZOU1BIYW5kbGVyLCB7IEJWTlNQRXZlbnQgfSBmcm9tIFwiLi9idm5zcF9oYW5kbGVyXCI7XG5pbXBvcnQgeyBIYW5kbGVyRW52aXJvbm1lbnQgfSBmcm9tIFwiLi4vZW52L2hhbmRsZXJfY29uZmlnXCI7XG5cbmNvbnN0IE5FWFRfU1RFUF9DT09LSUVfTkFNRSA9IFwiYnZuc3BfbmV4dF9zdGVwXCI7XG5cbi8qKlxuICogVHdpbGlvIFNlcnZlcmxlc3MgZnVuY3Rpb24gaGFuZGxlciBmb3IgQlZOU1AgYm90IGNvbW1hbmRzLlxuICogQHBhcmFtIHtDb250ZXh0PEhhbmRsZXJFbnZpcm9ubWVudD59IGNvbnRleHQgLSBUaGUgVHdpbGlvIHNlcnZlcmxlc3MgY29udGV4dC5cbiAqIEBwYXJhbSB7U2VydmVybGVzc0V2ZW50T2JqZWN0PEJWTlNQRXZlbnQ+fSBldmVudCAtIFRoZSBldmVudCBvYmplY3QuXG4gKiBAcGFyYW0ge1NlcnZlcmxlc3NDYWxsYmFja30gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBjb25zdCBoYW5kbGVyOiBTZXJ2ZXJsZXNzRnVuY3Rpb25TaWduYXR1cmU8XG4gICAgSGFuZGxlckVudmlyb25tZW50LFxuICAgIEJWTlNQRXZlbnRcbj4gPSBhc3luYyBmdW5jdGlvbiAoXG4gICAgY29udGV4dDogQ29udGV4dDxIYW5kbGVyRW52aXJvbm1lbnQ+LFxuICAgIGV2ZW50OiBTZXJ2ZXJsZXNzRXZlbnRPYmplY3Q8QlZOU1BFdmVudD4sXG4gICAgY2FsbGJhY2s6IFNlcnZlcmxlc3NDYWxsYmFja1xuKSB7XG4gICAgY29uc3QgaGFuZGxlciA9IG5ldyBCVk5TUEhhbmRsZXIoY29udGV4dCwgZXZlbnQpO1xuICAgIGxldCBtZXNzYWdlOiBzdHJpbmc7XG4gICAgbGV0IG5leHRfc3RlcDogc3RyaW5nID0gXCJcIjtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBoYW5kbGVyX3Jlc3BvbnNlID0gYXdhaXQgaGFuZGxlci5oYW5kbGUoKTtcbiAgICAgICAgbWVzc2FnZSA9XG4gICAgICAgICAgICBoYW5kbGVyX3Jlc3BvbnNlLnJlc3BvbnNlIHx8XG4gICAgICAgICAgICBcIlVuZXhwZWN0ZWQgcmVzdWx0IC0gbm8gcmVzcG9uc2UgZGV0ZXJtaW5lZFwiO1xuICAgICAgICBuZXh0X3N0ZXAgPSBoYW5kbGVyX3Jlc3BvbnNlLm5leHRfc3RlcCB8fCBcIlwiO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJBbiBlcnJvciBvY2N1cmVkXCIpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZSkpO1xuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICB9XG4gICAgICAgIG1lc3NhZ2UgPSBcIkFuIHVuZXhwZWN0ZWQgZXJyb3Igb2NjdXJlZC5cIjtcbiAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgbWVzc2FnZSArPSBcIlxcblwiICsgZS5tZXNzYWdlO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvclwiLCBlLnN0YWNrKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3JcIiwgZS5uYW1lKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3JcIiwgZS5tZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHJlc3BvbnNlID0gbmV3IFR3aWxpby5SZXNwb25zZSgpO1xuICAgIGNvbnN0IHR3aW1sID0gbmV3IFR3aWxpby50d2ltbC5NZXNzYWdpbmdSZXNwb25zZSgpO1xuXG4gICAgdHdpbWwubWVzc2FnZShtZXNzYWdlKTtcblxuICAgIHJlc3BvbnNlXG4gICAgICAgIC8vIEFkZCB0aGUgc3RyaW5naWZpZWQgVHdpTUwgdG8gdGhlIHJlc3BvbnNlIGJvZHlcbiAgICAgICAgLnNldEJvZHkodHdpbWwudG9TdHJpbmcoKSlcbiAgICAgICAgLy8gU2luY2Ugd2UncmUgcmV0dXJuaW5nIFR3aU1MLCB0aGUgY29udGVudCB0eXBlIG11c3QgYmUgWE1MXG4gICAgICAgIC5hcHBlbmRIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJ0ZXh0L3htbFwiKVxuICAgICAgICAuc2V0Q29va2llKE5FWFRfU1RFUF9DT09LSUVfTkFNRSwgbmV4dF9zdGVwKTtcblxuICAgIHJldHVybiBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7XG59OyJdLCJuYW1lcyI6WyJDaGVja2luVmFsdWUiLCJ1c2VyX2NyZWRzX2NvbmZpZyIsIk5TUF9FTUFJTF9ET01BSU4iLCJmaW5kX3BhdHJvbGxlcl9jb25maWciLCJTSEVFVF9JRCIsIlBIT05FX05VTUJFUl9MT09LVVBfU0hFRVQiLCJQSE9ORV9OVU1CRVJfTkFNRV9DT0xVTU4iLCJQSE9ORV9OVU1CRVJfTlVNQkVSX0NPTFVNTiIsImxvZ2luX3NoZWV0X2NvbmZpZyIsIkxPR0lOX1NIRUVUX0xPT0tVUCIsIkNIRUNLSU5fQ09VTlRfTE9PS1VQIiwiU0hFRVRfREFURV9DRUxMIiwiQ1VSUkVOVF9EQVRFX0NFTEwiLCJBUkNISVZFRF9DRUxMIiwiTkFNRV9DT0xVTU4iLCJDQVRFR09SWV9DT0xVTU4iLCJTRUNUSU9OX0RST1BET1dOX0NPTFVNTiIsIkNIRUNLSU5fRFJPUERPV05fQ09MVU1OIiwic2Vhc29uX3NoZWV0X2NvbmZpZyIsIlNFQVNPTl9TSEVFVCIsIlNFQVNPTl9TSEVFVF9OQU1FX0NPTFVNTiIsIlNFQVNPTl9TSEVFVF9EQVlTX0NPTFVNTiIsInNlY3Rpb25fY29uZmlnIiwiU0VDVElPTl9WQUxVRVMiLCJndWVzdF9wYXNzZXNfY29uZmlnIiwiR1VFU1RfUEFTU19TSEVFVCIsIkdVRVNUX1BBU1NfU0hFRVRfTkFNRV9DT0xVTU4iLCJHVUVTVF9QQVNTX1NIRUVUX0RBVEVTX0FWQUlMQUJMRV9DT0xVTU4iLCJHVUVTVF9QQVNTX1NIRUVUX1VTRURfVE9EQVlfQ09MVU1OIiwiR1VFU1RfUEFTU19TSEVFVF9VU0VEX1NFQVNPTl9DT0xVTU4iLCJHVUVTVF9QQVNTX1NIRUVUX0RBVEVTX1NUQVJUSU5HX0NPTFVNTiIsImhhbmRsZXJfY29uZmlnIiwiU0NSSVBUX0lEIiwiU1lOQ19TSUQiLCJBUkNISVZFX0ZVTkNUSU9OX05BTUUiLCJSRVNFVF9GVU5DVElPTl9OQU1FIiwiVVNFX1NFUlZJQ0VfQUNDT1VOVCIsIkFDVElPTl9MT0dfU0hFRVQiLCJDSEVDS0lOX1ZBTFVFUyIsIkNPTkZJRyIsImdvb2dsZSIsIkxvZ2luU2hlZXQiLCJTZWFzb25TaGVldCIsIlVzZXJDcmVkcyIsIkNoZWNraW5WYWx1ZXMiLCJnZXRfc2VydmljZV9jcmVkZW50aWFsc19wYXRoIiwiZXhjZWxfcm93X3RvX2luZGV4Iiwic2FuaXRpemVfcGhvbmVfbnVtYmVyIiwiYnVpbGRfcGFzc2VzX3N0cmluZyIsIkd1ZXN0UGFzc1NoZWV0IiwiU2VjdGlvblZhbHVlcyIsIk5FWFRfU1RFUFMiLCJBV0FJVF9DT01NQU5EIiwiQVdBSVRfQ0hFQ0tJTiIsIkNPTkZJUk1fUkVTRVQiLCJBVVRIX1JFU0VUIiwiQVdBSVRfU0VDVElPTiIsIkFXQUlUX1BBU1MiLCJBV0FJVF9NRVNTQUdFIiwiQVdBSVRfQlJPQURDQVNUIiwiQ09NTUFORFMiLCJPTl9EVVRZIiwiU1RBVFVTIiwiQ0hFQ0tJTiIsIlNFQ1RJT05fQVNTSUdOTUVOVCIsIkdVRVNUX1BBU1MiLCJXSEFUU0FQUCIsIk1FU1NBR0UiLCJCUk9BRENBU1QiLCJTTVNfTUFYX0xFTkdUSCIsIk1FU1NBR0VfUFJFRklYX1RFTVBMQVRFIiwiTUVTU0FHRV9QUkVGSVhfU1VGRklYIiwidmFsaWRhdGVfc21zX21lc3NhZ2UiLCJmdWxsX21lc3NhZ2UiLCJTZWdtZW50ZWRNZXNzYWdlIiwicmVxdWlyZSIsInNlZ21lbnRlZCIsIm5vbl9nc20iLCJnZXROb25Hc21DaGFyYWN0ZXJzIiwibGVuZ3RoIiwidmFsaWQiLCJyZWFzb24iLCJub25fZ3NtX2NoYXJhY3RlcnMiLCJTZXQiLCJzZWdtZW50c0NvdW50Iiwic2VnbWVudHNfY291bnQiLCJmb3JtYXRfcGhvbmVfZm9yX2Rpc3BsYXkiLCJ0ZW5fZGlnaXRzIiwic3Vic3RyaW5nIiwiQlZOU1BIYW5kbGVyIiwiU0NPUEVTIiwic21zX3JlcXVlc3QiLCJyZXN1bHRfbWVzc2FnZXMiLCJmcm9tIiwidG8iLCJib2R5IiwiYm9keV9yYXciLCJwYXRyb2xsZXIiLCJidm5zcF9uZXh0X3N0ZXAiLCJjaGVja2luX21vZGUiLCJmYXN0X2NoZWNraW4iLCJhc3NpZ25lZF9zZWN0aW9uIiwidHdpbGlvX2NsaWVudCIsInN5bmNfc2lkIiwicmVzZXRfc2NyaXB0X2lkIiwic3luY19jbGllbnQiLCJ1c2VyX2NyZWRzIiwic2VydmljZV9jcmVkcyIsInNoZWV0c19zZXJ2aWNlIiwidXNlcl9zY3JpcHRzX3NlcnZpY2UiLCJsb2dpbl9zaGVldCIsInNlYXNvbl9zaGVldCIsImd1ZXN0X3Bhc3Nfc2hlZXQiLCJjaGVja2luX3ZhbHVlcyIsImN1cnJlbnRfc2hlZXRfZGF0ZSIsImNvbWJpbmVkX2NvbmZpZyIsImNvbmZpZyIsInNlY3Rpb25fdmFsdWVzIiwiY29udGV4dCIsImV2ZW50IiwiRnJvbSIsIm51bWJlciIsInVuZGVmaW5lZCIsInRlc3RfbnVtYmVyIiwiVG8iLCJCb2R5IiwidG9Mb3dlckNhc2UiLCJ0cmltIiwicmVwbGFjZSIsInJlcXVlc3QiLCJjb29raWVzIiwiZ2V0VHdpbGlvQ2xpZW50IiwiZSIsImNvbnNvbGUiLCJsb2ciLCJEYXRlIiwicGFyc2VfZmFzdF9jaGVja2luX21vZGUiLCJwYXJzZWQiLCJwYXJzZV9mYXN0X2NoZWNraW4iLCJrZXkiLCJwYXJzZV9jaGVja2luIiwicGFyc2VfY2hlY2tpbl9mcm9tX25leHRfc3RlcCIsImxhc3Rfc2VnbWVudCIsInNwbGl0Iiwic2xpY2UiLCJieV9rZXkiLCJkZWxheSIsInNlY29uZHMiLCJvcHRpb25hbCIsIlByb21pc2UiLCJyZXMiLCJzZXRUaW1lb3V0Iiwic2VuZF9tZXNzYWdlIiwibWVzc2FnZSIsImdldF90d2lsaW9fY2xpZW50IiwibWVzc2FnZXMiLCJjcmVhdGUiLCJwdXNoIiwiaGFuZGxlIiwicmVzdWx0IiwiX2hhbmRsZSIsInJlc3BvbnNlIiwiam9pbiIsIm5leHRfc3RlcCIsImxvZ291dCIsImNoZWNrX3VzZXJfY3JlZHMiLCJnZXRfbWFwcGVkX3BhdHJvbGxlciIsImF3YWl0X3Jlc3BvbnNlIiwiaGFuZGxlX2F3YWl0X2NvbW1hbmQiLCJjaGVja2luIiwic3RhcnRzV2l0aCIsIm5hbWUiLCJyZXNldF9zaGVldF9mbG93IiwiZ3Vlc3RfbmFtZSIsInByb21wdF9ndWVzdF9wYXNzIiwic2VjdGlvbiIsInBhcnNlX3NlY3Rpb24iLCJhc3NpZ25fc2VjdGlvbiIsInByb21wdF9zZWN0aW9uX2Fzc2lnbm1lbnQiLCJzZW5kX3RleHRfbWVzc2FnZSIsInNlbmRfYnJvYWRjYXN0X21lc3NhZ2UiLCJwcm9tcHRfY29tbWFuZCIsInBhdHJvbGxlcl9uYW1lIiwiaW5jbHVkZXMiLCJnZXRfb25fZHV0eSIsImdldF9zdGF0dXMiLCJwcm9tcHRfY2hlY2tpbiIsInBhcnNlX2Zhc3Rfc2VjdGlvbl9hc3NpZ25tZW50IiwicHJvbXB0X21lc3NhZ2UiLCJwcm9tcHRfYnJvYWRjYXN0IiwidHlwZXMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJtYXAiLCJ4Iiwic21zX2Rlc2MiLCJzZWdtZW50cyIsImxhc3RTZWdtZW50IiwicG9wIiwiZmlyc3RQYXJ0IiwibWFwX3NlY3Rpb24iLCJzZWN0aW9uX2Rlc2NyaXB0aW9uIiwiZ2V0X3NlY3Rpb25fZGVzY3JpcHRpb24iLCJnZXRfbWVzc2FnZV9wcmVmaXgiLCJzZW5kZXJfbmFtZSIsInNlbmRlcl9waG9uZSIsImZvcm1hdHRlZF9waG9uZSIsImdldF9tYXhfbWVzc2FnZV9sZW5ndGgiLCJnZXRfbG9naW5fc2hlZXQiLCJyZWNpcGllbnRzIiwiZ2V0X29uX2R1dHlfcGF0cm9sbGVycyIsIm1heF9sZW5ndGgiLCJtZXNzYWdlX3RleHQiLCJwcmVmaXgiLCJ2YWxpZGF0aW9uIiwiYmFkX2NoYXJzIiwic2lnbmVkX2luX3BhdHJvbGxlcnMiLCJwaG9uZV9tYXAiLCJnZXRfcGhvbmVfbnVtYmVyX21hcCIsInJlY2lwaWVudF9tYXAiLCJub19waG9uZV9uYW1lcyIsInBob25lIiwic2VudF9jb3VudCIsImNvcHlfc2VudF90b19zZW5kZXIiLCJmYWlsZWRfbmFtZXMiLCJkZWxpdmVyX3Ntc190b19tYXAiLCJsb2dfYWN0aW9uIiwiYWxsX2ZhaWxlZCIsImVudHJpZXMiLCJub3JtYWxpemVkX3NlbmRlciIsInNlbmRlcl9pbl9tYXAiLCJyZWNpcGllbnRfY291bnQiLCJrZXlzIiwiZ2V0X3NoZWV0c19zZXJ2aWNlIiwib3B0cyIsInNwcmVhZHNoZWV0cyIsImdldCIsInNwcmVhZHNoZWV0SWQiLCJyYW5nZSIsInZhbHVlUmVuZGVyT3B0aW9uIiwiZGF0YSIsInJvdyIsInJhd051bWJlciIsImFzc2lnbmVkU2VjdGlvbiIsIm1hcHBlZF9zZWN0aW9uIiwicmVmcmVzaCIsImNhdGVnb3J5Iiwic2hlZXQiLCJnZXRfZ3Vlc3RfcGFzc19zaGVldCIsInVzZWRfYW5kX2F2YWlsYWJsZSIsImdldF9hdmFpbGFibGVfYW5kX3VzZWRfcGFzc2VzIiwiZ2V0X3Byb21wdCIsInNldF91c2VkX2d1ZXN0X3Bhc3NlcyIsInNoZWV0X2RhdGUiLCJ0b0RhdGVTdHJpbmciLCJjdXJyZW50X2RhdGUiLCJpc19jdXJyZW50IiwiZ2V0X3N0YXR1c19zdHJpbmciLCJndWVzdF9wYXNzX3Byb21pc2UiLCJwYXRyb2xsZXJfc3RhdHVzIiwiY2hlY2tpbkNvbHVtblNldCIsImNoZWNrZWRPdXQiLCJieV9zaGVldF9zdHJpbmciLCJzdGF0dXMiLCJ0b1N0cmluZyIsImNvbXBsZXRlZFBhdHJvbERheXMiLCJnZXRfc2Vhc29uX3NoZWV0IiwiZ2V0X3BhdHJvbGxlZF9kYXlzIiwiY29tcGxldGVkUGF0cm9sRGF5c1N0cmluZyIsImxvZ2luU2hlZXREYXRlIiwic3RhdHVzU3RyaW5nIiwidXNlZFRvZGF5R3Vlc3RQYXNzZXMiLCJ1c2VkX3RvZGF5IiwidXNlZFNlYXNvbkd1ZXN0UGFzc2VzIiwidXNlZF9zZWFzb24iLCJhdmFpbGFibGVHdWVzdFBhc3NlcyIsImF2YWlsYWJsZSIsInNoZWV0X25lZWRzX3Jlc2V0IiwiRXJyb3IiLCJuZXdfY2hlY2tpbl92YWx1ZSIsInNoZWV0c192YWx1ZSIsImZhc3RfY2hlY2tpbnMiLCJyZXNldF9zaGVldCIsInNjcmlwdF9zZXJ2aWNlIiwiZ2V0X3VzZXJfc2NyaXB0c19zZXJ2aWNlIiwic2hvdWxkX3BlcmZvcm1fYXJjaGl2ZSIsImFyY2hpdmVkIiwic2NyaXB0cyIsInJ1biIsInNjcmlwdElkIiwicmVxdWVzdEJvZHkiLCJmdW5jdGlvbiIsImdldF91c2VyX2NyZWRzIiwibG9hZFRva2VuIiwiYXV0aFVybCIsImdldEF1dGhVcmwiLCJjaGVja2VkX291dF9zZWN0aW9uIiwibGFzdF9zZWN0aW9ucyIsIm9uX2R1dHlfcGF0cm9sbGVycyIsImJ5X3NlY3Rpb24iLCJmaWx0ZXIiLCJyZWR1Y2UiLCJwcmV2IiwiY3VyIiwic2hvcnRfY29kZSIsInJlc3VsdHMiLCJhbGxfa2V5cyIsIm9yZGVyZWRfcHJpbWFyeV9zZWN0aW9ucyIsInNvcnQiLCJmaWx0ZXJlZF9sYXN0X3NlY3Rpb25zIiwib3JkZXJlZF9zZWN0aW9ucyIsImNvbmNhdCIsInBhdHJvbGxlcnMiLCJ5IiwibG9jYWxlQ29tcGFyZSIsInBhdHJvbGxlcl9zdHJpbmciLCJkZXRhaWxzIiwidG9VcHBlckNhc2UiLCJyIiwiYWN0aW9uX25hbWUiLCJhcHBlbmQiLCJ2YWx1ZUlucHV0T3B0aW9uIiwiZGVsZXRlVG9rZW4iLCJnZXRfc3luY19jbGllbnQiLCJzeW5jIiwic2VydmljZXMiLCJnZXRfc2VydmljZV9jcmVkcyIsImF1dGgiLCJHb29nbGVBdXRoIiwia2V5RmlsZSIsInNjb3BlcyIsImdldF92YWxpZF9jcmVkcyIsInJlcXVpcmVfdXNlcl9jcmVkcyIsIm9hdXRoMl9jbGllbnQiLCJzaGVldHMiLCJ2ZXJzaW9uIiwic2NyaXB0IiwiZm9yY2UiLCJwaG9uZV9sb29rdXAiLCJmaW5kX3BhdHJvbGxlcl9mcm9tX251bWJlciIsIm1hcHBlZFBhdHJvbGxlciIsInRyeV9maW5kX3BhdHJvbGxlciIsInJhd19udW1iZXIiLCJjdXJyZW50TnVtYmVyIiwiY3VycmVudE5hbWUiLCJyb3dfY29sX3RvX2V4Y2VsX2luZGV4IiwiR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIiLCJmb3JtYXRfZGF0ZV9mb3Jfc3ByZWFkc2hlZXRfdmFsdWUiLCJVc2VkQW5kQXZhaWxhYmxlUGFzc2VzIiwiaW5kZXgiLCJOdW1iZXIiLCJQYXNzU2hlZXQiLCJwYXRyb2xsZXJfcm93IiwiZ2V0X3NoZWV0X3Jvd19mb3JfcGF0cm9sbGVyIiwibmFtZV9jb2x1bW4iLCJjdXJyZW50X2RheV9hdmFpbGFibGVfcGFzc2VzIiwiYXZhaWxhYmxlX2NvbHVtbiIsImN1cnJlbnRfZGF5X3VzZWRfcGFzc2VzIiwidXNlZF90b2RheV9jb2x1bW4iLCJjdXJyZW50X3NlYXNvbl91c2VkX3Bhc3NlcyIsInVzZWRfc2Vhc29uX2NvbHVtbiIsInJvd251bSIsInN0YXJ0X2luZGV4IiwicHJpb3JfbGVuZ3RoIiwiY3VycmVudF9kYXRlX3N0cmluZyIsIm5ld192YWxzIiwidXBkYXRlX2xlbmd0aCIsIk1hdGgiLCJtYXgiLCJlbmRfaW5kZXgiLCJzaGVldF9uYW1lIiwidXBkYXRlX3ZhbHVlcyIsImxvb2t1cF9yb3dfY29sX2luX3NoZWV0Iiwic2FuaXRpemVfZGF0ZSIsImNoZWNraW5fY291bnRfc2hlZXQiLCJyb3dzIiwiY2hlY2tpbl9jb3VudCIsImdldF92YWx1ZXMiLCJpIiwicGFyc2VfcGF0cm9sbGVyX3JvdyIsImdldFRpbWUiLCJmaW5kX3BhdHJvbGxlciIsIkpTT04iLCJzdHJpbmdpZnkiLCJwYXRyb2xsZXJfc2VjdGlvbiIsIm5ld19zZWN0aW9uX3ZhbHVlIiwiZmlsdGVyX2xpc3RfdG9fZW5kc3dpdGhfY3VycmVudF9kYXkiLCJjdXJyZW50RGF5IiwiZGF5c0JlZm9yZVRvZGF5IiwibG9hZF9jcmVkZW50aWFsc19maWxlcyIsInZhbGlkYXRlX3Njb3BlcyIsImRvbWFpbiIsImxvYWRlZCIsImNyZWRlbnRpYWxzIiwiY2xpZW50X3NlY3JldCIsImNsaWVudF9pZCIsInJlZGlyZWN0X3VyaXMiLCJ3ZWIiLCJPQXV0aDIiLCJ0b2tlbl9rZXkiLCJvYXV0aDJEb2MiLCJkb2N1bWVudHMiLCJmZXRjaCIsInRva2VuIiwic2V0Q3JlZGVudGlhbHMiLCJzaWQiLCJyZW1vdmUiLCJjb21wbGV0ZUxvZ2luIiwiY29kZSIsImdldFRva2VuIiwidG9rZW5zIiwib2F1dGhEb2MiLCJ1bmlxdWVOYW1lIiwidXBkYXRlIiwiaWQiLCJnZW5lcmF0ZVJhbmRvbVN0cmluZyIsImRvYyIsInR0bCIsImFjY2Vzc190eXBlIiwic2NvcGUiLCJzdGF0ZSIsImdlbmVyYXRlQXV0aFVybCIsImNoYXJhY3RlcnMiLCJjaGFyYWN0ZXJzTGVuZ3RoIiwiY2hhckF0IiwiZmxvb3IiLCJyYW5kb20iLCJVc2VyQ3JlZHNTY29wZXMiLCJsb29rdXBfdmFsdWVzIiwiQXJyYXkiLCJzbXNfZGVzY19zcGxpdCIsImxvb2t1cF92YWxzIiwiYnlfbHYiLCJieV9mYyIsImNoZWNraW5WYWx1ZXMiLCJjaGVja2luVmFsdWUiLCJsdiIsImZjIiwiY2hlY2tpbl9sb3dlciIsImV4Y2VsX2RhdGVfdG9fanNfZGF0ZSIsImRhdGUiLCJzZXRVVENNaWxsaXNlY29uZHMiLCJyb3VuZCIsImNoYW5nZV90aW1lem9uZV90b19wc3QiLCJ0b1VUQ1N0cmluZyIsInN0cmlwX2RhdGV0aW1lX3RvX2RhdGUiLCJ0b0xvY2FsZURhdGVTdHJpbmciLCJ0aW1lWm9uZSIsImRhdGVzdHIiLCJwYWRTdGFydCIsImZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2RhdGUiLCJsaXN0IiwiZW5kc1dpdGgiLCJmcyIsInBhcnNlIiwicmVhZEZpbGVTeW5jIiwiUnVudGltZSIsImdldEFzc2V0cyIsInBhdGgiLCJzaGVldF9pZCIsIl9nZXRfdmFsdWVzIiwibG9va3VwX2luZGV4IiwidXBkYXRlTWUiLCJsb29rdXBSYW5nZSIsInVzZWQiLCJ0b3RhbCIsInRvZGF5IiwiZm9yY2VfdG9kYXkiLCJkZXNpcmVkX3Njb3BlcyIsImRlc2lyZWRfc2NvcGUiLCJlcnJvciIsInNlY3Rpb25zIiwibG93ZXJjYXNlX3NlY3Rpb25zIiwiaW5kZXhPZiIsImNvbCIsImNvbFN0cmluZyIsIm1vZHVsbyIsImNvbExldHRlciIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsImNoYXJDb2RlQXQiLCJzcGxpdF90b19yb3dfY29sIiwiZXhjZWxfaW5kZXgiLCJyZWdleCIsIlJlZ0V4cCIsIm1hdGNoIiwiZXhlYyIsInJhd19yb3ciLCJsZXR0ZXJzIiwibG93ZXJMZXR0ZXJzIiwicCIsImNoYXJhY3RlclZhbHVlIiwibmV3X251bWJlciIsInRlbXBvcmFyeV9uZXdfbnVtYmVyIiwicGFyc2VJbnQiLCJORVhUX1NURVBfQ09PS0lFX05BTUUiLCJoYW5kbGVyIiwiY2FsbGJhY2siLCJoYW5kbGVyX3Jlc3BvbnNlIiwic3RhY2siLCJUd2lsaW8iLCJSZXNwb25zZSIsInR3aW1sIiwiTWVzc2FnaW5nUmVzcG9uc2UiLCJzZXRCb2R5IiwiYXBwZW5kSGVhZGVyIiwic2V0Q29va2llIl0sInNvdXJjZVJvb3QiOiIifQ==