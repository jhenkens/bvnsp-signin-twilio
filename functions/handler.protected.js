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
    GUEST_PASS_SHEET: "GuestPasses",
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
            return await this.prompt_guest_pass();
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
                response: `I'm available on WhatsApp as well! WhatsApp uses Wifi/Cell Data instead of SMS, and can be more reliable. Message me at https://wa.me/1${this.to}`
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
Check in / Check out / Status / On Duty / Section Assignment / Guest Pass / Message / WhatsApp
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
     * @returns {string} The message prefix. for example : "Message from John Doe (123)456-7890".
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
        const message = should_perform_archive ? "Okay. Archiving and resetting the check in sheet. This takes about 10 seconds..." : "Okay. Sheet has already been archived. Performing reset. This takes about 5 seconds...";
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
            this.sync_client = this.get_twilio_client().sync.v1.services(this.sync_sid);
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
    /**
     * Prompts the user for a comp or manager pass.
     * We do not require a guest name in the SMS flow; this returns the status/prompt
     * for guest passes so the Guest Pass command behaves like other immediate actions.
     * @returns {Promise<BVNSPResponse>} A promise that resolves with the response.
     */ async prompt_guest_pass() {
        // Allow all patrollers (including candidates) to use guest passes when available.
        const sheet = await this.get_guest_pass_sheet();
        const used_and_available = await sheet.get_available_and_used_passes(this.patroller.name);
        if (used_and_available == null) {
            return {
                response: "Problem looking up patroller for guest passes"
            };
        }
        // If there are no available passes today, return the prompt indicating none are available.
        if (used_and_available.available < 1) {
            return used_and_available.get_prompt();
        }
        // Consume one available pass (the sheet records only the date of use).
        await sheet.set_used_guest_passes(used_and_available);
        // Re-read the values and return confirmation + updated status.
        const updated = await sheet.get_available_and_used_passes(this.patroller.name);
        if (updated == null) {
            return {
                response: `Updated ${this.patroller.name} to use a guest pass today.`
            };
        }
        const status = (0,_utils_guest_passes__WEBPACK_IMPORTED_MODULE_9__.build_passes_string)(updated.used_season, updated.used_season + updated.available, updated.used_today);
        return {
            response: `Updated ${this.patroller.name} to use a guest pass today.\n${status}`
        };
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
            const response = (0,_utils_guest_passes__WEBPACK_IMPORTED_MODULE_3__.build_passes_string)(this.used_season, this.available + this.used_season, this.used_today, true);
            return {
                response
            };
        }
        return {
            response: "You do not have any guest passes available today"
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
    async set_used_guest_passes(patroller_row) {
        if (patroller_row.available < 1) {
            throw new Error(`Not enough available passes: Available: ${patroller_row.available}, Used this season:  ${patroller_row.used_season}, Used today: ${patroller_row.used_today}`);
        }
        const rownum = patroller_row.index;
        const start_index = this.start_index;
        const prior_length = patroller_row.row.length - start_index;
        const current_date_string = (0,_utils_datetime_util__WEBPACK_IMPORTED_MODULE_2__.format_date_for_spreadsheet_value)(new Date());
        const new_vals = patroller_row.row.slice(start_index).map((x)=>x?.toString());
        // Record only the date of the use; no guest name is stored.
        new_vals.push(current_date_string);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QixPQUFPO1FBQ2xDO0lBQ0o7SUFFQSxNQUFNUSxXQUFXLElBQUlvVixPQUFPQyxRQUFRO0lBQ3BDLE1BQU1DLFFBQVEsSUFBSUYsT0FBT0UsS0FBSyxDQUFDQyxpQkFBaUI7SUFFaERELE1BQU05VixPQUFPLENBQUNBO0lBRWRRLFFBQ0ksaURBQWlEO0tBQ2hEd1YsT0FBTyxDQUFDRixNQUFNclAsUUFBUSxHQUN2Qiw0REFBNEQ7S0FDM0R3UCxZQUFZLENBQUMsZ0JBQWdCLFlBQzdCQyxTQUFTLENBQUNYLHVCQUF1QjdVO0lBRXRDLE9BQU8rVSxTQUFTLE1BQU1qVjtBQUMxQixFQUFFIiwic291cmNlcyI6WyIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL25vZGVfbW9kdWxlcy9AdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzL2luZGV4LmpzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvZW52L2hhbmRsZXJfY29uZmlnLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvaGFuZGxlcnMvYnZuc3BfaGFuZGxlci50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3NoZWV0cy9ndWVzdF9wYXNzX3NoZWV0LnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvc2hlZXRzL2xvZ2luX3NoZWV0LnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvc2hlZXRzL3NlYXNvbl9zaGVldC50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3VzZXItY3JlZHMudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91dGlscy9jaGVja2luX3ZhbHVlcy50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3V0aWxzL2RhdGV0aW1lX3V0aWwudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91dGlscy9maWxlX3V0aWxzLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvZ29vZ2xlX3NoZWV0c19zcHJlYWRzaGVldF90YWIudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91dGlscy9ndWVzdF9wYXNzZXMudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91dGlscy9zY29wZV91dGlsLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvc2VjdGlvbl92YWx1ZXMudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91dGlscy91dGlsLnRzIiwiZXh0ZXJuYWwgY29tbW9uanMgXCJnb29nbGVhcGlzXCIiLCJleHRlcm5hbCBjb21tb25qcyBcInNtcy1zZWdtZW50cy1jYWxjdWxhdG9yXCIiLCJleHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiZnNcIiIsIndlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL2hhbmRsZXJzL2hhbmRsZXIucHJvdGVjdGVkLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEludGVudGlvbmFsbHkgbGVmdCBlbXB0eVxuIiwiaW1wb3J0IHsgQ2hlY2tpblZhbHVlIH0gZnJvbSBcIi4uL3V0aWxzL2NoZWNraW5fdmFsdWVzXCI7XG5cbi8qKlxuICogRW52aXJvbm1lbnQgY29uZmlndXJhdGlvbiBmb3IgdGhlIGhhbmRsZXIuXG4gKiA8cD5cbiAqIE5vdGU6IFRoZXNlIGFyZSB0aGUgb25seSBzZWNyZXQgdmFsdWVzIHdlIG5lZWQgdG8gcmVhZC4gUmVzdCBjYW4gYmUgZGVwbG95ZWQuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBIYW5kbGVyRW52aXJvbm1lbnRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTSEVFVF9JRCAtIFRoZSBJRCBvZiB0aGUgR29vZ2xlIFNoZWV0cyBzcHJlYWRzaGVldC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTQ1JJUFRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBBcHBzIFNjcmlwdCBwcm9qZWN0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNZTkNfU0lEIC0gVGhlIFNJRCBvZiB0aGUgVHdpbGlvIFN5bmMgc2VydmljZS5cbiAqL1xudHlwZSBIYW5kbGVyRW52aXJvbm1lbnQgPSB7XG4gICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICBTQ1JJUFRfSUQ6IHN0cmluZztcbiAgICBTWU5DX1NJRDogc3RyaW5nO1xufTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciB1c2VyIGNyZWRlbnRpYWxzLlxuICogQHR5cGVkZWYge09iamVjdH0gVXNlckNyZWRzQ29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZyB8IHVuZGVmaW5lZCB8IG51bGx9IE5TUF9FTUFJTF9ET01BSU4gLSBUaGUgZW1haWwgZG9tYWluIGZvciBOU1AuXG4gKi9cbnR5cGUgVXNlckNyZWRzQ29uZmlnID0ge1xuICAgIE5TUF9FTUFJTF9ET01BSU46IHN0cmluZyB8IHVuZGVmaW5lZCB8IG51bGw7XG59O1xuY29uc3QgdXNlcl9jcmVkc19jb25maWc6IFVzZXJDcmVkc0NvbmZpZyA9IHtcbiAgICBOU1BfRU1BSUxfRE9NQUlOOiBcImZhcndlc3Qub3JnXCIsXG59O1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIGZpbmRpbmcgYSBwYXRyb2xsZXIuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBGaW5kUGF0cm9sbGVyQ29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gUEhPTkVfTlVNQkVSX0xPT0tVUF9TSEVFVCAtIFRoZSByYW5nZSBmb3IgcGhvbmUgbnVtYmVyIGxvb2t1cC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBQSE9ORV9OVU1CRVJfTlVNQkVSX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIHBob25lIG51bWJlcnMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gUEhPTkVfTlVNQkVSX05BTUVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgbmFtZXMuXG4gKi9cbnR5cGUgRmluZFBhdHJvbGxlckNvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogc3RyaW5nO1xuICAgIFBIT05FX05VTUJFUl9MT09LVVBfU0hFRVQ6IHN0cmluZztcbiAgICBQSE9ORV9OVU1CRVJfTlVNQkVSX0NPTFVNTjogc3RyaW5nO1xuICAgIFBIT05FX05VTUJFUl9OQU1FX0NPTFVNTjogc3RyaW5nO1xufTtcblxuY29uc3QgZmluZF9wYXRyb2xsZXJfY29uZmlnOiBGaW5kUGF0cm9sbGVyQ29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBcInRlc3RcIixcbiAgICBQSE9ORV9OVU1CRVJfTE9PS1VQX1NIRUVUOiBcIlBob25lIE51bWJlcnMhQTI6QjEwMFwiLFxuICAgIFBIT05FX05VTUJFUl9OQU1FX0NPTFVNTjogXCJBXCIsXG4gICAgUEhPTkVfTlVNQkVSX05VTUJFUl9DT0xVTU46IFwiQlwiLFxufTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciB0aGUgbG9naW4gc2hlZXQuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBMb2dpblNoZWV0Q29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gTE9HSU5fU0hFRVRfTE9PS1VQIC0gVGhlIHJhbmdlIGZvciBsb2dpbiBzaGVldCBsb29rdXAuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQ0hFQ0tJTl9DT1VOVF9MT09LVVAgLSBUaGUgcmFuZ2UgZm9yIGNoZWNrLWluIGNvdW50IGxvb2t1cC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBBUkNISVZFRF9DRUxMIC0gVGhlIGNlbGwgZm9yIGFyY2hpdmVkIGRhdGEuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfREFURV9DRUxMIC0gVGhlIGNlbGwgZm9yIHRoZSBzaGVldCBkYXRlLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IENVUlJFTlRfREFURV9DRUxMIC0gVGhlIGNlbGwgZm9yIHRoZSBjdXJyZW50IGRhdGUuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gTkFNRV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBuYW1lcy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDQVRFR09SWV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBjYXRlZ29yaWVzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNFQ1RJT05fRFJPUERPV05fQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3Igc2VjdGlvbiBkcm9wZG93bi5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDSEVDS0lOX0RST1BET1dOX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIGNoZWNrLWluIGRyb3Bkb3duLlxuICovXG50eXBlIExvZ2luU2hlZXRDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICBMT0dJTl9TSEVFVF9MT09LVVA6IHN0cmluZztcbiAgICBDSEVDS0lOX0NPVU5UX0xPT0tVUDogc3RyaW5nO1xuICAgIEFSQ0hJVkVEX0NFTEw6IHN0cmluZztcbiAgICBTSEVFVF9EQVRFX0NFTEw6IHN0cmluZztcbiAgICBDVVJSRU5UX0RBVEVfQ0VMTDogc3RyaW5nO1xuICAgIE5BTUVfQ09MVU1OOiBzdHJpbmc7XG4gICAgQ0FURUdPUllfQ09MVU1OOiBzdHJpbmc7XG4gICAgU0VDVElPTl9EUk9QRE9XTl9DT0xVTU46IHN0cmluZztcbiAgICBDSEVDS0lOX0RST1BET1dOX0NPTFVNTjogc3RyaW5nO1xufTtcblxuY29uc3QgbG9naW5fc2hlZXRfY29uZmlnOiBMb2dpblNoZWV0Q29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBcInRlc3RcIixcbiAgICBMT0dJTl9TSEVFVF9MT09LVVA6IFwiTG9naW4hQTE6STEwMFwiLFxuICAgIENIRUNLSU5fQ09VTlRfTE9PS1VQOiBcIlRvb2xzIUcyOkcyXCIsXG4gICAgU0hFRVRfREFURV9DRUxMOiBcIkIxXCIsXG4gICAgQ1VSUkVOVF9EQVRFX0NFTEw6IFwiQjJcIixcbiAgICBBUkNISVZFRF9DRUxMOiBcIkgxXCIsXG4gICAgTkFNRV9DT0xVTU46IFwiQVwiLFxuICAgIENBVEVHT1JZX0NPTFVNTjogXCJCXCIsXG4gICAgU0VDVElPTl9EUk9QRE9XTl9DT0xVTU46IFwiSFwiLFxuICAgIENIRUNLSU5fRFJPUERPV05fQ09MVU1OOiBcIklcIixcbn07XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgdGhlIHNlYXNvbiBzaGVldC5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IFNlYXNvblNoZWV0Q29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0VBU09OX1NIRUVUIC0gVGhlIG5hbWUgb2YgdGhlIHNlYXNvbiBzaGVldC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTRUFTT05fU0hFRVRfREFZU19DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBzZWFzb24gc2hlZXQgZGF5cy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTRUFTT05fU0hFRVRfTkFNRV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBzZWFzb24gc2hlZXQgbmFtZXMuXG4gKi9cbnR5cGUgU2Vhc29uU2hlZXRDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICBTRUFTT05fU0hFRVQ6IHN0cmluZztcbiAgICBTRUFTT05fU0hFRVRfREFZU19DT0xVTU46IHN0cmluZztcbiAgICBTRUFTT05fU0hFRVRfTkFNRV9DT0xVTU46IHN0cmluZztcbn07XG5jb25zdCBzZWFzb25fc2hlZXRfY29uZmlnOiBTZWFzb25TaGVldENvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogXCJ0ZXN0XCIsXG4gICAgU0VBU09OX1NIRUVUOiBcIlNlYXNvblwiLFxuICAgIFNFQVNPTl9TSEVFVF9OQU1FX0NPTFVNTjogXCJCXCIsXG4gICAgU0VBU09OX1NIRUVUX0RBWVNfQ09MVU1OOiBcIkFcIixcbn07XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3Igc2VjdGlvbnMuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBTZWN0aW9uQ29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0VDVElPTl9WQUxVRVMgLSBUaGUgc2VjdGlvbiB2YWx1ZXMuXG4gKi9cbnR5cGUgU2VjdGlvbkNvbmZpZyA9IHtcbiAgICBTRUNUSU9OX1ZBTFVFUzogc3RyaW5nO1xufTtcbmNvbnN0IHNlY3Rpb25fY29uZmlnOiBTZWN0aW9uQ29uZmlnID0ge1xuICAgIFNFQ1RJT05fVkFMVUVTOiAgXCIxLDIsMyw0LFJvdmluZyxGQVIsVHJhaW5pbmdcIixcbn07XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgZ3Vlc3QgcGFzc2VzLlxuICogQHR5cGVkZWYge09iamVjdH0gR3Vlc3RQYXNzZXNDb25maWdcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTSEVFVF9JRCAtIFRoZSBJRCBvZiB0aGUgR29vZ2xlIFNoZWV0cyBzcHJlYWRzaGVldC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBHVUVTVF9QQVNTX1NIRUVUIC0gVGhlIG5hbWUgb2YgdGhlIGd1ZXN0IHBhc3Mgc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gR1VFU1RfUEFTU19TSEVFVF9EQVRFU19BVkFJTEFCTEVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgYXZhaWxhYmxlIGRhdGVzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IEdVRVNUX1BBU1NfU0hFRVRfVVNFRF9UT0RBWV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBkYXRlcyB1c2VkIHRvZGF5LlxuICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBHVUVTVF9QQVNTX1NIRUVUX1VTRURfU0VBU09OX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIGRhdGVzIHVzZWQgZm9yIHRoaXMgc2Vhc29uLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IEdVRVNUX1BBU1NfU0hFRVRfREFURVNfU1RBUlRJTkdfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3Igc3RhcnRpbmcgZGF0ZXMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gR1VFU1RfUEFTU19TSEVFVF9OQU1FX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIG5hbWVzLlxuICovXG50eXBlIEd1ZXN0UGFzc2VzQ29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBzdHJpbmc7XG4gICAgR1VFU1RfUEFTU19TSEVFVDogc3RyaW5nO1xuICAgIEdVRVNUX1BBU1NfU0hFRVRfREFURVNfQVZBSUxBQkxFX0NPTFVNTjogc3RyaW5nO1xuICAgIEdVRVNUX1BBU1NfU0hFRVRfVVNFRF9UT0RBWV9DT0xVTU46IHN0cmluZztcbiAgICBHVUVTVF9QQVNTX1NIRUVUX1VTRURfU0VBU09OX0NPTFVNTjogc3RyaW5nO1xuICAgIEdVRVNUX1BBU1NfU0hFRVRfREFURVNfU1RBUlRJTkdfQ09MVU1OOiBzdHJpbmc7XG4gICAgR1VFU1RfUEFTU19TSEVFVF9OQU1FX0NPTFVNTjogc3RyaW5nO1xufTtcbmNvbnN0IGd1ZXN0X3Bhc3Nlc19jb25maWc6IEd1ZXN0UGFzc2VzQ29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBcInRlc3RcIixcbiAgICBHVUVTVF9QQVNTX1NIRUVUOiBcIkd1ZXN0UGFzc2VzXCIsXG4gICAgR1VFU1RfUEFTU19TSEVFVF9OQU1FX0NPTFVNTjogXCJBXCIsXG4gICAgR1VFU1RfUEFTU19TSEVFVF9EQVRFU19BVkFJTEFCTEVfQ09MVU1OOiBcIkRcIixcbiAgICBHVUVTVF9QQVNTX1NIRUVUX1VTRURfVE9EQVlfQ09MVU1OOiBcIkVcIixcbiAgICBHVUVTVF9QQVNTX1NIRUVUX1VTRURfU0VBU09OX0NPTFVNTjogXCJGXCIsXG4gICAgR1VFU1RfUEFTU19TSEVFVF9EQVRFU19TVEFSVElOR19DT0xVTU46IFwiR1wiLFxufTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciB0aGUgaGFuZGxlci5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IEhhbmRsZXJDb25maWdcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTQ1JJUFRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBBcHBzIFNjcmlwdCBwcm9qZWN0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNIRUVUX0lEIC0gVGhlIElEIG9mIHRoZSBHb29nbGUgU2hlZXRzIHNwcmVhZHNoZWV0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNZTkNfU0lEIC0gVGhlIFNJRCBvZiB0aGUgVHdpbGlvIFN5bmMgc2VydmljZS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBSRVNFVF9GVU5DVElPTl9OQU1FIC0gVGhlIG5hbWUgb2YgdGhlIHJlc2V0IGZ1bmN0aW9uLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IEFSQ0hJVkVfRlVOQ1RJT05fTkFNRSAtIFRoZSBuYW1lIG9mIHRoZSBhcmNoaXZlIGZ1bmN0aW9uLlxuICogQHByb3BlcnR5IHtib29sZWFufSBVU0VfU0VSVklDRV9BQ0NPVU5UIC0gV2hldGhlciB0byB1c2UgYSBzZXJ2aWNlIGFjY291bnQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQUNUSU9OX0xPR19TSEVFVCAtIFRoZSBuYW1lIG9mIHRoZSBhY3Rpb24gbG9nIHNoZWV0LlxuICogQHByb3BlcnR5IHtDaGVja2luVmFsdWVbXX0gQ0hFQ0tJTl9WQUxVRVMgLSBUaGUgY2hlY2staW4gdmFsdWVzLlxuICovXG50eXBlIEhhbmRsZXJDb25maWcgPSB7XG4gICAgU0NSSVBUX0lEOiBzdHJpbmc7XG4gICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICBTWU5DX1NJRDogc3RyaW5nO1xuICAgIFJFU0VUX0ZVTkNUSU9OX05BTUU6IHN0cmluZztcbiAgICBBUkNISVZFX0ZVTkNUSU9OX05BTUU6IHN0cmluZztcbiAgICBVU0VfU0VSVklDRV9BQ0NPVU5UOiBib29sZWFuO1xuICAgIEFDVElPTl9MT0dfU0hFRVQ6IHN0cmluZztcbiAgICBDSEVDS0lOX1ZBTFVFUzogQ2hlY2tpblZhbHVlW107XG59O1xuY29uc3QgaGFuZGxlcl9jb25maWc6IEhhbmRsZXJDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IFwidGVzdFwiLFxuICAgIFNDUklQVF9JRDogXCJ0ZXN0XCIsXG4gICAgU1lOQ19TSUQ6IFwidGVzdFwiLFxuICAgIEFSQ0hJVkVfRlVOQ1RJT05fTkFNRTogXCJBcmNoaXZlXCIsXG4gICAgUkVTRVRfRlVOQ1RJT05fTkFNRTogXCJSZXNldFwiLFxuICAgIFVTRV9TRVJWSUNFX0FDQ09VTlQ6IHRydWUsXG4gICAgQUNUSU9OX0xPR19TSEVFVDogXCJCb3RfVXNhZ2VcIixcbiAgICBDSEVDS0lOX1ZBTFVFUzogW1xuICAgICAgICBuZXcgQ2hlY2tpblZhbHVlKFwiZGF5XCIsIFwiQWxsIERheVwiLCBcImFsbCBkYXkvREFZXCIsIFtcImNoZWNraW4tZGF5XCJdKSxcbiAgICAgICAgbmV3IENoZWNraW5WYWx1ZShcImFtXCIsIFwiSGFsZiBBTVwiLCBcIm1vcm5pbmcvQU1cIiwgW1wiY2hlY2tpbi1hbVwiXSksXG4gICAgICAgIG5ldyBDaGVja2luVmFsdWUoXCJwbVwiLCBcIkhhbGYgUE1cIiwgXCJhZnRlcm5vb24vUE1cIiwgW1wiY2hlY2tpbi1wbVwiXSksXG4gICAgICAgIG5ldyBDaGVja2luVmFsdWUoXCJvdXRcIiwgXCJDaGVja2VkIE91dFwiLCBcImNoZWNrIG91dC9PVVRcIiwgW1wiY2hlY2tvdXRcIiwgXCJjaGVjay1vdXRcIl0pLFxuICAgIF0sXG59O1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIHBhdHJvbGxlciByb3dzLlxuICogQHR5cGVkZWYge09iamVjdH0gUGF0cm9sbGVyUm93Q29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gTkFNRV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBuYW1lcy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDQVRFR09SWV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBjYXRlZ29yaWVzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNFQ1RJT05fRFJPUERPV05fQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3Igc2VjdGlvbiBkcm9wZG93bi5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDSEVDS0lOX0RST1BET1dOX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIGNoZWNrLWluIGRyb3Bkb3duLlxuICovXG50eXBlIFBhdHJvbGxlclJvd0NvbmZpZyA9IHtcbiAgICBOQU1FX0NPTFVNTjogc3RyaW5nO1xuICAgIENBVEVHT1JZX0NPTFVNTjogc3RyaW5nO1xuICAgIFNFQ1RJT05fRFJPUERPV05fQ09MVU1OOiBzdHJpbmc7XG4gICAgQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU46IHN0cmluZztcbn07XG5cbi8qKlxuICogQ29tYmluZWQgY29uZmlndXJhdGlvbiB0eXBlLlxuICogQHR5cGVkZWYge0hhbmRsZXJFbnZpcm9ubWVudCAmIFVzZXJDcmVkc0NvbmZpZyAmIEZpbmRQYXRyb2xsZXJDb25maWcgJiBMb2dpblNoZWV0Q29uZmlnICYgU2Vhc29uU2hlZXRDb25maWcgJiBTZWN0aW9uQ29uZmlnICYgR3Vlc3RQYXNzZXNDb25maWcgJiBIYW5kbGVyQ29uZmlnICYgUGF0cm9sbGVyUm93Q29uZmlnfSBDb21iaW5lZENvbmZpZ1xuICovXG50eXBlIENvbWJpbmVkQ29uZmlnID0gSGFuZGxlckVudmlyb25tZW50ICZcbiAgICBVc2VyQ3JlZHNDb25maWcgJlxuICAgIEZpbmRQYXRyb2xsZXJDb25maWcgJlxuICAgIExvZ2luU2hlZXRDb25maWcgJlxuICAgIFNlYXNvblNoZWV0Q29uZmlnICZcbiAgICBTZWN0aW9uQ29uZmlnICZcbiAgICBHdWVzdFBhc3Nlc0NvbmZpZyAmXG4gICAgSGFuZGxlckNvbmZpZyAmXG4gICAgUGF0cm9sbGVyUm93Q29uZmlnO1xuXG5jb25zdCBDT05GSUc6IENvbWJpbmVkQ29uZmlnID0ge1xuICAgIC4uLmhhbmRsZXJfY29uZmlnLFxuICAgIC4uLmZpbmRfcGF0cm9sbGVyX2NvbmZpZyxcbiAgICAuLi5sb2dpbl9zaGVldF9jb25maWcsXG4gICAgLi4uZ3Vlc3RfcGFzc2VzX2NvbmZpZyxcbiAgICAuLi5zZWFzb25fc2hlZXRfY29uZmlnLFxuICAgIC4uLnVzZXJfY3JlZHNfY29uZmlnLFxuICAgIC4uLnNlY3Rpb25fY29uZmlnLFxufTtcblxuZXhwb3J0IHtcbiAgICBDT05GSUcsXG4gICAgQ29tYmluZWRDb25maWcsXG4gICAgU2VjdGlvbkNvbmZpZyxcbiAgICBHdWVzdFBhc3Nlc0NvbmZpZyxcbiAgICBGaW5kUGF0cm9sbGVyQ29uZmlnLFxuICAgIEhhbmRsZXJDb25maWcsXG4gICAgSGFuZGxlckVudmlyb25tZW50LFxuICAgIFVzZXJDcmVkc0NvbmZpZyxcbiAgICBMb2dpblNoZWV0Q29uZmlnLFxuICAgIFNlYXNvblNoZWV0Q29uZmlnLFxuICAgIFBhdHJvbGxlclJvd0NvbmZpZyxcbn07IiwiaW1wb3J0IFwiQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlc1wiO1xuaW1wb3J0IHtcbiAgICBDb250ZXh0LFxuICAgIFNlcnZlcmxlc3NFdmVudE9iamVjdCxcbiAgICBTZXJ2aWNlQ29udGV4dCxcbiAgICBUd2lsaW9DbGllbnQsXG59IGZyb20gXCJAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzL3R5cGVzXCI7XG5pbXBvcnQge2dvb2dsZSwgc2NyaXB0X3YxLCBzaGVldHNfdjR9IGZyb20gXCJnb29nbGVhcGlzXCI7XG5pbXBvcnQge0dvb2dsZUF1dGh9IGZyb20gXCJnb29nbGVhcGlzLWNvbW1vblwiO1xuaW1wb3J0IHtcbiAgICBDT05GSUcsXG4gICAgQ29tYmluZWRDb25maWcsXG4gICAgR3Vlc3RQYXNzZXNDb25maWcsXG4gICAgRmluZFBhdHJvbGxlckNvbmZpZyxcbiAgICBIYW5kbGVyQ29uZmlnLFxuICAgIEhhbmRsZXJFbnZpcm9ubWVudCxcbiAgICBMb2dpblNoZWV0Q29uZmlnLFxuICAgIFNlYXNvblNoZWV0Q29uZmlnLFxufSBmcm9tIFwiLi4vZW52L2hhbmRsZXJfY29uZmlnXCI7XG5pbXBvcnQgTG9naW5TaGVldCwge1BhdHJvbGxlclJvd30gZnJvbSBcIi4uL3NoZWV0cy9sb2dpbl9zaGVldFwiO1xuaW1wb3J0IFNlYXNvblNoZWV0IGZyb20gXCIuLi9zaGVldHMvc2Vhc29uX3NoZWV0XCI7XG5pbXBvcnQge1VzZXJDcmVkc30gZnJvbSBcIi4uL3VzZXItY3JlZHNcIjtcbmltcG9ydCB7Q2hlY2tpblZhbHVlc30gZnJvbSBcIi4uL3V0aWxzL2NoZWNraW5fdmFsdWVzXCI7XG5pbXBvcnQge2dldF9zZXJ2aWNlX2NyZWRlbnRpYWxzX3BhdGh9IGZyb20gXCIuLi91dGlscy9maWxlX3V0aWxzXCI7XG5pbXBvcnQge2V4Y2VsX3Jvd190b19pbmRleCwgc2FuaXRpemVfcGhvbmVfbnVtYmVyfSBmcm9tIFwiLi4vdXRpbHMvdXRpbFwiO1xuaW1wb3J0IHtidWlsZF9wYXNzZXNfc3RyaW5nLH0gZnJvbSBcIi4uL3V0aWxzL2d1ZXN0X3Bhc3Nlc1wiO1xuaW1wb3J0IHtHdWVzdFBhc3NTaGVldH0gZnJvbSBcIi4uL3NoZWV0cy9ndWVzdF9wYXNzX3NoZWV0XCI7XG5pbXBvcnQge1NlY3Rpb25WYWx1ZXN9IGZyb20gJy4uL3V0aWxzL3NlY3Rpb25fdmFsdWVzJztcblxuZXhwb3J0IHR5cGUgQlZOU1BSZXNwb25zZSA9IHtcbiAgICByZXNwb25zZT86IHN0cmluZztcbiAgICBuZXh0X3N0ZXA/OiBzdHJpbmc7XG59O1xuZXhwb3J0IHR5cGUgQlZOU1BFdmVudCA9IFNlcnZlcmxlc3NFdmVudE9iamVjdDxcbiAgICB7XG4gICAgICAgIEZyb206IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAgICAgVG86IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAgICAgbnVtYmVyOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgICAgIHRlc3RfbnVtYmVyOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgICAgIEJvZHk6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICB9LFxuICAgIHt9LFxuICAgIHtcbiAgICAgICAgYnZuc3BfbmV4dF9zdGVwOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgfVxuPjtcblxuZXhwb3J0IGNvbnN0IE5FWFRfU1RFUFMgPSB7XG4gICAgQVdBSVRfQ09NTUFORDogXCJhd2FpdC1jb21tYW5kXCIsXG4gICAgQVdBSVRfQ0hFQ0tJTjogXCJhd2FpdC1jaGVja2luXCIsXG4gICAgQ09ORklSTV9SRVNFVDogXCJjb25maXJtLXJlc2V0XCIsXG4gICAgQVVUSF9SRVNFVDogXCJhdXRoLXJlc2V0XCIsXG4gICAgQVdBSVRfU0VDVElPTjogXCJhd2FpdC1zZWN0aW9uXCIsXG4gICAgQVdBSVRfUEFTUzogXCJhd2FpdC1wYXNzXCIsXG4gICAgQVdBSVRfTUVTU0FHRTogXCJhd2FpdC1tZXNzYWdlXCIsXG4gICAgQVdBSVRfQlJPQURDQVNUOiBcImF3YWl0LWJyb2FkY2FzdFwiLFxufTtcblxuY29uc3QgQ09NTUFORFMgPSB7XG4gICAgT05fRFVUWTogW1wib25kdXR5XCIsIFwib24tZHV0eVwiXSxcbiAgICBTVEFUVVM6IFtcInN0YXR1c1wiXSxcbiAgICBDSEVDS0lOOiBbXCJjaGVja2luXCIsIFwiY2hlY2staW5cIl0sXG4gICAgU0VDVElPTl9BU1NJR05NRU5UOiBbXCJzZWN0aW9uXCIsIFwic2VjdGlvbi1hc3NpZ25tZW50XCIsIFwic2VjdGlvbmFzc2lnbm1lbnRcIiwgXCJhc3NpZ25tZW50XCJdLFxuICAgIEdVRVNUX1BBU1M6IFtcImd1ZXN0LXBhc3NcIiwgXCJndWVzdHBhc3NcIiwgXCJndWVzdFwiXSxcbiAgICBXSEFUU0FQUDogW1wid2hhdHNhcHBcIl0sXG4gICAgTUVTU0FHRTogW1wibWVzc2FnZVwiLCBcIm1zZ1wiXSxcbiAgICBCUk9BRENBU1Q6IFtcImJyb2FkY2FzdFwiXSxcbn07XG5cbmV4cG9ydCBjb25zdCBTTVNfTUFYX0xFTkdUSCA9IDE2MDtcbmV4cG9ydCBjb25zdCBNRVNTQUdFX1BSRUZJWF9URU1QTEFURSA9IFwiTWVzc2FnZSBmcm9tIFwiO1xuZXhwb3J0IGNvbnN0IE1FU1NBR0VfUFJFRklYX1NVRkZJWCA9IFwiOiBcIjtcblxuLyoqXG4gKiBSZXN1bHQgb2YgdmFsaWRhdGluZyBhbiBTTVMgbWVzc2FnZSBmb3IgR1NNLTcgY29tcGF0aWJpbGl0eSBhbmQgc2VnbWVudCBjb3VudC5cbiAqL1xuZXhwb3J0IHR5cGUgU21zVmFsaWRhdGlvblJlc3VsdCA9IHtcbiAgICAvKiogV2hldGhlciB0aGUgbWVzc2FnZSBpcyB2YWxpZCAoR1NNLTcgb25seSBhbmQgZml0cyBpbiBhIHNpbmdsZSBzZWdtZW50KS4gKi9cbiAgICB2YWxpZDogYm9vbGVhbjtcbiAgICAvKiogSWYgaW52YWxpZCwgdGhlIHJlYXNvbjogJ25vbl9nc203JyBvciAndG9vX21hbnlfc2VnbWVudHMnLiAqL1xuICAgIHJlYXNvbj86IFwibm9uX2dzbTdcIiB8IFwidG9vX21hbnlfc2VnbWVudHNcIjtcbiAgICAvKiogVGhlIG5vbi1HU00tNyBjaGFyYWN0ZXJzIGZvdW5kLCBpZiBhbnkuICovXG4gICAgbm9uX2dzbV9jaGFyYWN0ZXJzPzogc3RyaW5nW107XG4gICAgLyoqIFRoZSBudW1iZXIgb2YgU01TIHNlZ21lbnRzIHRoZSBtZXNzYWdlIHdvdWxkIHJlcXVpcmUuICovXG4gICAgc2VnbWVudHNfY291bnQ/OiBudW1iZXI7XG59O1xuXG4vKipcbiAqIFZhbGlkYXRlcyB0aGF0IGEgY29tcGxldGUgU01TIG1lc3NhZ2UgKHByZWZpeCArIGJvZHkpIHVzZXMgb25seSBHU00tNyBjaGFyYWN0ZXJzXG4gKiBhbmQgZml0cyB3aXRoaW4gYSBzaW5nbGUgU01TIHNlZ21lbnQuXG4gKlxuICogVXNlcyB0aGUgc21zLXNlZ21lbnRzLWNhbGN1bGF0b3IgbGlicmFyeSAobWFpbnRhaW5lZCBieSBUd2lsaW9EZXZFZCkgd2hpY2hcbiAqIHByb3ZpZGVzIGF1dGhvcml0YXRpdmUgR1NNLTcgY2hhcmFjdGVyIGRldGVjdGlvbi5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZnVsbF9tZXNzYWdlIC0gVGhlIGNvbXBsZXRlIG1lc3NhZ2UgdG8gdmFsaWRhdGUgKHByZWZpeCArIHVzZXIgdGV4dCkuXG4gKiBAcmV0dXJucyB7U21zVmFsaWRhdGlvblJlc3VsdH0gVGhlIHZhbGlkYXRpb24gcmVzdWx0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVfc21zX21lc3NhZ2UoZnVsbF9tZXNzYWdlOiBzdHJpbmcpOiBTbXNWYWxpZGF0aW9uUmVzdWx0IHtcbiAgICBjb25zdCB7IFNlZ21lbnRlZE1lc3NhZ2UgfSA9IHJlcXVpcmUoXCJzbXMtc2VnbWVudHMtY2FsY3VsYXRvclwiKTtcbiAgICBjb25zdCBzZWdtZW50ZWQgPSBuZXcgU2VnbWVudGVkTWVzc2FnZShmdWxsX21lc3NhZ2UpO1xuICAgIGNvbnN0IG5vbl9nc20gPSBzZWdtZW50ZWQuZ2V0Tm9uR3NtQ2hhcmFjdGVycygpIGFzIHN0cmluZ1tdO1xuXG4gICAgaWYgKG5vbl9nc20ubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsaWQ6IGZhbHNlLFxuICAgICAgICAgICAgcmVhc29uOiBcIm5vbl9nc203XCIsXG4gICAgICAgICAgICBub25fZ3NtX2NoYXJhY3RlcnM6IFsuLi5uZXcgU2V0KG5vbl9nc20pXSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoc2VnbWVudGVkLnNlZ21lbnRzQ291bnQgPiAxKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWxpZDogZmFsc2UsXG4gICAgICAgICAgICByZWFzb246IFwidG9vX21hbnlfc2VnbWVudHNcIixcbiAgICAgICAgICAgIHNlZ21lbnRzX2NvdW50OiBzZWdtZW50ZWQuc2VnbWVudHNDb3VudCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4geyB2YWxpZDogdHJ1ZSB9O1xufVxuXG4vKipcbiAqIEZvcm1hdHMgYSAxMC1kaWdpdCBwaG9uZSBudW1iZXIgc3RyaW5nIGFzIChYWFgpWFhYLVhYWFggZm9yIGRpc3BsYXkuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGVuX2RpZ2l0cyAtIEEgMTAtZGlnaXQgcGhvbmUgbnVtYmVyIHN0cmluZyAoZS5nLiBcIjEyMzQ1Njc4OTBcIikuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHBob25lIG51bWJlciAoZS5nLiBcIigxMjMpNDU2LTc4OTBcIikuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRfcGhvbmVfZm9yX2Rpc3BsYXkodGVuX2RpZ2l0czogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCgke3Rlbl9kaWdpdHMuc3Vic3RyaW5nKDAsIDMpfSkke3Rlbl9kaWdpdHMuc3Vic3RyaW5nKDMsIDYpfS0ke3Rlbl9kaWdpdHMuc3Vic3RyaW5nKDYsIDEwKX1gO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCVk5TUEhhbmRsZXIge1xuICAgIFNDT1BFUzogc3RyaW5nW10gPSBbXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3NwcmVhZHNoZWV0c1wiXTtcblxuICAgIHNtc19yZXF1ZXN0OiBib29sZWFuO1xuICAgIHJlc3VsdF9tZXNzYWdlczogc3RyaW5nW10gPSBbXTtcbiAgICBmcm9tOiBzdHJpbmc7XG4gICAgdG86IHN0cmluZztcbiAgICBib2R5OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgYm9keV9yYXc6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBwYXRyb2xsZXI6IFBhdHJvbGxlclJvdyB8IG51bGw7XG4gICAgYnZuc3BfbmV4dF9zdGVwOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgY2hlY2tpbl9tb2RlOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgICBmYXN0X2NoZWNraW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBhc3NpZ25lZF9zZWN0aW9uOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAgIHR3aWxpb19jbGllbnQ6IFR3aWxpb0NsaWVudCB8IG51bGwgPSBudWxsO1xuICAgIHN5bmNfc2lkOiBzdHJpbmc7XG4gICAgcmVzZXRfc2NyaXB0X2lkOiBzdHJpbmc7XG5cbiAgICAvLyBDYWNoZSBjbGllbnRzXG4gICAgc3luY19jbGllbnQ6IFNlcnZpY2VDb250ZXh0IHwgbnVsbCA9IG51bGw7XG4gICAgdXNlcl9jcmVkczogVXNlckNyZWRzIHwgbnVsbCA9IG51bGw7XG4gICAgc2VydmljZV9jcmVkczogR29vZ2xlQXV0aCB8IG51bGwgPSBudWxsO1xuICAgIHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzIHwgbnVsbCA9IG51bGw7XG4gICAgdXNlcl9zY3JpcHRzX3NlcnZpY2U6IHNjcmlwdF92MS5TY3JpcHQgfCBudWxsID0gbnVsbDtcblxuICAgIGxvZ2luX3NoZWV0OiBMb2dpblNoZWV0IHwgbnVsbCA9IG51bGw7XG4gICAgc2Vhc29uX3NoZWV0OiBTZWFzb25TaGVldCB8IG51bGwgPSBudWxsO1xuICAgIGd1ZXN0X3Bhc3Nfc2hlZXQ6IEd1ZXN0UGFzc1NoZWV0IHwgbnVsbCA9IG51bGw7XG5cbiAgICBjaGVja2luX3ZhbHVlczogQ2hlY2tpblZhbHVlcztcbiAgICBjdXJyZW50X3NoZWV0X2RhdGU6IERhdGU7XG5cbiAgICBjb21iaW5lZF9jb25maWc6IENvbWJpbmVkQ29uZmlnO1xuICAgIGNvbmZpZzogSGFuZGxlckNvbmZpZztcblxuICAgIHNlY3Rpb25fdmFsdWVzOiBTZWN0aW9uVmFsdWVzO1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhIG5ldyBCVk5TUEhhbmRsZXIuXG4gICAgICogQHBhcmFtIHtDb250ZXh0PEhhbmRsZXJFbnZpcm9ubWVudD59IGNvbnRleHQgLSBUaGUgc2VydmVybGVzcyBmdW5jdGlvbiBjb250ZXh0LlxuICAgICAqIEBwYXJhbSB7U2VydmVybGVzc0V2ZW50T2JqZWN0PEJWTlNQRXZlbnQ+fSBldmVudCAtIFRoZSBldmVudCBvYmplY3QuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGNvbnRleHQ6IENvbnRleHQ8SGFuZGxlckVudmlyb25tZW50PixcbiAgICAgICAgZXZlbnQ6IFNlcnZlcmxlc3NFdmVudE9iamVjdDxCVk5TUEV2ZW50PlxuICAgICkge1xuICAgICAgICAvLyBEZXRlcm1pbmUgbWVzc2FnZSBkZXRhaWxzIGZyb20gdGhlIGluY29taW5nIGV2ZW50LCB3aXRoIGZhbGxiYWNrIHZhbHVlc1xuICAgICAgICB0aGlzLnNtc19yZXF1ZXN0ID0gKGV2ZW50LkZyb20gfHwgZXZlbnQubnVtYmVyKSAhPT0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmZyb20gPSBldmVudC5Gcm9tIHx8IGV2ZW50Lm51bWJlciB8fCBldmVudC50ZXN0X251bWJlciE7XG4gICAgICAgIHRoaXMudG8gPSBzYW5pdGl6ZV9waG9uZV9udW1iZXIoZXZlbnQuVG8hKTtcbiAgICAgICAgdGhpcy5ib2R5ID0gZXZlbnQuQm9keT8udG9Mb3dlckNhc2UoKT8udHJpbSgpLnJlcGxhY2UoL1xccysvLCBcIi1cIik7XG4gICAgICAgIHRoaXMuYm9keV9yYXcgPSBldmVudC5Cb2R5XG4gICAgICAgIHRoaXMuYnZuc3BfbmV4dF9zdGVwID1cbiAgICAgICAgICAgIGV2ZW50LnJlcXVlc3QuY29va2llcy5idm5zcF9uZXh0X3N0ZXA7XG4gICAgICAgIHRoaXMuY29tYmluZWRfY29uZmlnID0geyAuLi5DT05GSUcsIC4uLmNvbnRleHQgfTtcbiAgICAgICAgdGhpcy5jb25maWcgPSB0aGlzLmNvbWJpbmVkX2NvbmZpZztcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy50d2lsaW9fY2xpZW50ID0gY29udGV4dC5nZXRUd2lsaW9DbGllbnQoKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBpbml0aWFsaXppbmcgdHdpbGlvX2NsaWVudFwiLCBlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN5bmNfc2lkID0gY29udGV4dC5TWU5DX1NJRDtcbiAgICAgICAgdGhpcy5yZXNldF9zY3JpcHRfaWQgPSBjb250ZXh0LlNDUklQVF9JRDtcbiAgICAgICAgdGhpcy5wYXRyb2xsZXIgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuY2hlY2tpbl92YWx1ZXMgPSBuZXcgQ2hlY2tpblZhbHVlcyhDT05GSUcuQ0hFQ0tJTl9WQUxVRVMpO1xuICAgICAgICB0aGlzLmN1cnJlbnRfc2hlZXRfZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHRoaXMuc2VjdGlvbl92YWx1ZXMgPSBuZXcgU2VjdGlvblZhbHVlcyh0aGlzLmNvbWJpbmVkX2NvbmZpZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIHRoZSBmYXN0IGNoZWNrLWluIG1vZGUgZnJvbSB0aGUgbWVzc2FnZSBib2R5LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5IC0gVGhlIG1lc3NhZ2UgYm9keS5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBmYXN0IGNoZWNrLWluIG1vZGUgaXMgcGFyc2VkLCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICovXG4gICAgcGFyc2VfZmFzdF9jaGVja2luX21vZGUoYm9keTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHBhcnNlZCA9IHRoaXMuY2hlY2tpbl92YWx1ZXMucGFyc2VfZmFzdF9jaGVja2luKGJvZHkpO1xuICAgICAgICBpZiAocGFyc2VkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tpbl9tb2RlID0gcGFyc2VkLmtleTtcbiAgICAgICAgICAgIHRoaXMuZmFzdF9jaGVja2luID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZXMgdGhlIGNoZWNrLWluIG1vZGUgZnJvbSB0aGUgbWVzc2FnZSBib2R5LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5IC0gVGhlIG1lc3NhZ2UgYm9keS5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBjaGVjay1pbiBtb2RlIGlzIHBhcnNlZCwgb3RoZXJ3aXNlIGZhbHNlLlxuICAgICAqL1xuICAgIHBhcnNlX2NoZWNraW4oYm9keTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHBhcnNlZCA9IHRoaXMuY2hlY2tpbl92YWx1ZXMucGFyc2VfY2hlY2tpbihib2R5KTtcbiAgICAgICAgaWYgKHBhcnNlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNraW5fbW9kZSA9IHBhcnNlZC5rZXk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIHRoZSBjaGVjay1pbiBtb2RlIGZyb20gdGhlIG5leHQgc3RlcC5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBjaGVjay1pbiBtb2RlIGlzIHBhcnNlZCwgb3RoZXJ3aXNlIGZhbHNlLlxuICAgICAqL1xuICAgIHBhcnNlX2NoZWNraW5fZnJvbV9uZXh0X3N0ZXAoKSB7XG4gICAgICAgIGNvbnN0IGxhc3Rfc2VnbWVudCA9IHRoaXMuYnZuc3BfbmV4dF9zdGVwXG4gICAgICAgICAgICA/LnNwbGl0KFwiLVwiKVxuICAgICAgICAgICAgLnNsaWNlKC0xKVswXTtcbiAgICAgICAgaWYgKGxhc3Rfc2VnbWVudCAmJiBsYXN0X3NlZ21lbnQgaW4gdGhpcy5jaGVja2luX3ZhbHVlcy5ieV9rZXkpIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tpbl9tb2RlID0gbGFzdF9zZWdtZW50O1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlbGF5cyB0aGUgZXhlY3V0aW9uIGZvciBhIHNwZWNpZmllZCBudW1iZXIgb2Ygc2Vjb25kcy5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2Vjb25kcyAtIFRoZSBudW1iZXIgb2Ygc2Vjb25kcyB0byBkZWxheS5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25hbD1mYWxzZV0gLSBXaGV0aGVyIHRoZSBkZWxheSBpcyBvcHRpb25hbC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgYWZ0ZXIgdGhlIGRlbGF5LlxuICAgICAqL1xuICAgIGRlbGF5KHNlY29uZHM6IG51bWJlciwgb3B0aW9uYWw6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBpZiAob3B0aW9uYWwgJiYgIXRoaXMuc21zX3JlcXVlc3QpIHtcbiAgICAgICAgICAgIHNlY29uZHMgPSAxIC8gMTAwMC4wO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzKSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJlcywgc2Vjb25kcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbmRzIGEgbWVzc2FnZSB0byB0aGUgdXNlci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIFRoZSBtZXNzYWdlIHRvIHNlbmQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIG1lc3NhZ2UgaXMgc2VudC5cbiAgICAgKi9cbiAgICBhc3luYyBzZW5kX21lc3NhZ2UobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLnNtc19yZXF1ZXN0KSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmdldF90d2lsaW9fY2xpZW50KCkubWVzc2FnZXMuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICB0bzogdGhpcy5mcm9tLFxuICAgICAgICAgICAgICAgIGZyb206IHRoaXMudG8sXG4gICAgICAgICAgICAgICAgYm9keTogbWVzc2FnZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZXN1bHRfbWVzc2FnZXMucHVzaChtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgdGhlIGNoZWNrLWluIHByb2Nlc3MuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGNoZWNrLWluIHJlc3BvbnNlLlxuICAgICAqL1xuICAgIGFzeW5jIGhhbmRsZSgpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5faGFuZGxlKCk7XG4gICAgICAgIGlmICghdGhpcy5zbXNfcmVxdWVzdCkge1xuICAgICAgICAgICAgaWYgKHJlc3VsdD8ucmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdF9tZXNzYWdlcy5wdXNoKHJlc3VsdC5yZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiB0aGlzLnJlc3VsdF9tZXNzYWdlcy5qb2luKFwiXFxuIyMjXFxuXCIpLFxuICAgICAgICAgICAgICAgIG5leHRfc3RlcDogcmVzdWx0Py5uZXh0X3N0ZXAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW50ZXJuYWwgbWV0aG9kIHRvIGhhbmRsZSB0aGUgY2hlY2staW4gcHJvY2Vzcy5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgY2hlY2staW4gcmVzcG9uc2UuXG4gICAgICovXG4gICAgYXN5bmMgX2hhbmRsZSgpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICBgUmVjZWl2ZWQgcmVxdWVzdCBmcm9tICR7dGhpcy5mcm9tfSB3aXRoIGJvZHk6ICR7dGhpcy5ib2R5fSBhbmQgc3RhdGUgJHt0aGlzLmJ2bnNwX25leHRfc3RlcH1gXG4gICAgICAgICk7XG4gICAgICAgIGlmICh0aGlzLmJvZHkgPT0gXCJsb2dvdXRcIikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmZvcm1pbmcgbG9nb3V0YCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5sb2dvdXQoKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVzcG9uc2U6IEJWTlNQUmVzcG9uc2UgfCB1bmRlZmluZWQ7XG4gICAgICAgIGlmICghdGhpcy5jb25maWcuVVNFX1NFUlZJQ0VfQUNDT1VOVCkge1xuICAgICAgICAgICAgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmNoZWNrX3VzZXJfY3JlZHMoKTtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZSkgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmJvZHk/LnRvTG93ZXJDYXNlKCkgPT09IFwicmVzdGFydFwiKSB7XG4gICAgICAgICAgICByZXR1cm4geyByZXNwb25zZTogXCJPa2F5LiBUZXh0IG1lIGFnYWluIHRvIHN0YXJ0IG92ZXIuLi5cIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmdldF9tYXBwZWRfcGF0cm9sbGVyKCk7XG4gICAgICAgIGlmIChyZXNwb25zZSB8fCB0aGlzLnBhdHJvbGxlciA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIHJlc3BvbnNlIHx8IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2U6IFwiVW5leHBlY3RlZCBlcnJvciBsb29raW5nIHVwIHBhdHJvbGxlciBtYXBwaW5nXCIsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgICghdGhpcy5idm5zcF9uZXh0X3N0ZXAgfHxcbiAgICAgICAgICAgICAgICB0aGlzLmJ2bnNwX25leHRfc3RlcCA9PSBORVhUX1NURVBTLkFXQUlUX0NPTU1BTkQpICYmXG4gICAgICAgICAgICB0aGlzLmJvZHlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zdCBhd2FpdF9yZXNwb25zZSA9IGF3YWl0IHRoaXMuaGFuZGxlX2F3YWl0X2NvbW1hbmQoKTtcbiAgICAgICAgICAgIGlmIChhd2FpdF9yZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdF9yZXNwb25zZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHRoaXMuYnZuc3BfbmV4dF9zdGVwID09IE5FWFRfU1RFUFMuQVdBSVRfQ0hFQ0tJTiAmJlxuICAgICAgICAgICAgdGhpcy5ib2R5XG4gICAgICAgICkge1xuICAgICAgICAgICAgaWYgKHRoaXMucGFyc2VfY2hlY2tpbih0aGlzLmJvZHkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuY2hlY2tpbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgdGhpcy5idm5zcF9uZXh0X3N0ZXA/LnN0YXJ0c1dpdGgoXG4gICAgICAgICAgICAgICAgTkVYVF9TVEVQUy5DT05GSVJNX1JFU0VUXG4gICAgICAgICAgICApICYmXG4gICAgICAgICAgICB0aGlzLmJvZHlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5ib2R5ID09IFwieWVzXCIgJiYgdGhpcy5wYXJzZV9jaGVja2luX2Zyb21fbmV4dF9zdGVwKCkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICAgICAgYFBlcmZvcm1pbmcgcmVzZXRfc2hlZXRfZmxvdyBmb3IgJHt0aGlzLnBhdHJvbGxlci5uYW1lfSB3aXRoIGNoZWNraW4gbW9kZTogJHt0aGlzLmNoZWNraW5fbW9kZX1gXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAoYXdhaXQgdGhpcy5yZXNldF9zaGVldF9mbG93KCkpIHx8IChhd2FpdCB0aGlzLmNoZWNraW4oKSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgdGhpcy5idm5zcF9uZXh0X3N0ZXA/LnN0YXJ0c1dpdGgoTkVYVF9TVEVQUy5BVVRIX1JFU0VUKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcnNlX2NoZWNraW5fZnJvbV9uZXh0X3N0ZXAoKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgICAgICBgUGVyZm9ybWluZyByZXNldF9zaGVldF9mbG93LXBvc3QtYXV0aCBmb3IgJHt0aGlzLnBhdHJvbGxlci5uYW1lfSB3aXRoIGNoZWNraW4gbW9kZTogJHt0aGlzLmNoZWNraW5fbW9kZX1gXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAoYXdhaXQgdGhpcy5yZXNldF9zaGVldF9mbG93KCkpIHx8IChhd2FpdCB0aGlzLmNoZWNraW4oKSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgdGhpcy5idm5zcF9uZXh0X3N0ZXA/LnN0YXJ0c1dpdGgoTkVYVF9TVEVQUy5BV0FJVF9TRUNUSU9OKSAmJlxuICAgICAgICAgICAgdGhpcy5ib2R5XG4gICAgICAgICkge1xuICAgICAgICAgICAgY29uc3Qgc2VjdGlvbiA9IHRoaXMuc2VjdGlvbl92YWx1ZXMucGFyc2Vfc2VjdGlvbih0aGlzLmJvZHkpXG4gICAgICAgICAgICBpZiAoc2VjdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmFzc2lnbl9zZWN0aW9uKHNlY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucHJvbXB0X3NlY3Rpb25fYXNzaWdubWVudCgpO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgdGhpcy5idm5zcF9uZXh0X3N0ZXAgPT09IE5FWFRfU1RFUFMuQVdBSVRfTUVTU0FHRSAmJlxuICAgICAgICAgICAgdGhpcy5ib2R5X3Jhd1xuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnNlbmRfdGV4dF9tZXNzYWdlKHRoaXMuYm9keV9yYXcpO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgdGhpcy5idm5zcF9uZXh0X3N0ZXAgPT09IE5FWFRfU1RFUFMuQVdBSVRfQlJPQURDQVNUICYmXG4gICAgICAgICAgICB0aGlzLmJvZHlfcmF3XG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuc2VuZF9icm9hZGNhc3RfbWVzc2FnZSh0aGlzLmJvZHlfcmF3KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmJ2bnNwX25leHRfc3RlcCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5zZW5kX21lc3NhZ2UoXCJTb3JyeSwgSSBkaWRuJ3QgdW5kZXJzdGFuZCB0aGF0LlwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wcm9tcHRfY29tbWFuZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgdGhlIGF3YWl0IGNvbW1hbmQgc3RlcC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlIHwgdW5kZWZpbmVkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcmVzcG9uc2Ugb3IgdW5kZWZpbmVkLlxuICAgICAqL1xuICAgIGFzeW5jIGhhbmRsZV9hd2FpdF9jb21tYW5kKCk6IFByb21pc2U8QlZOU1BSZXNwb25zZSB8IHVuZGVmaW5lZD4ge1xuICAgICAgICBjb25zdCBwYXRyb2xsZXJfbmFtZSA9IHRoaXMucGF0cm9sbGVyIS5uYW1lO1xuICAgICAgICBpZiAodGhpcy5wYXJzZV9mYXN0X2NoZWNraW5fbW9kZSh0aGlzLmJvZHkhKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgYFBlcmZvcm1pbmcgZmFzdCBjaGVja2luIGZvciAke3BhdHJvbGxlcl9uYW1lfSB3aXRoIG1vZGU6ICR7dGhpcy5jaGVja2luX21vZGV9YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmNoZWNraW4oKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQ09NTUFORFMuT05fRFVUWS5pbmNsdWRlcyh0aGlzLmJvZHkhKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmZvcm1pbmcgZ2V0X29uX2R1dHkgZm9yICR7cGF0cm9sbGVyX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4geyByZXNwb25zZTogYXdhaXQgdGhpcy5nZXRfb25fZHV0eSgpIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJDaGVja2luZyBmb3Igc3RhdHVzLi4uXCIpO1xuICAgICAgICBpZiAoQ09NTUFORFMuU1RBVFVTLmluY2x1ZGVzKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBnZXRfc3RhdHVzIGZvciAke3BhdHJvbGxlcl9uYW1lfWApO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X3N0YXR1cygpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDT01NQU5EUy5DSEVDS0lOLmluY2x1ZGVzKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBwcm9tcHRfY2hlY2tpbiBmb3IgJHtwYXRyb2xsZXJfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb21wdF9jaGVja2luKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKENPTU1BTkRTLkdVRVNUX1BBU1MuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIGd1ZXN0X3Bhc3MgZm9yICR7cGF0cm9sbGVyX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5wcm9tcHRfZ3Vlc3RfcGFzcygpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnBhcnNlX2Zhc3Rfc2VjdGlvbl9hc3NpZ25tZW50KHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBmYXN0IHNlY3Rpb25fYXNzaWdubWVudCBmb3IgJHtwYXRyb2xsZXJfbmFtZX0gdG8gJHt0aGlzLmFzc2lnbmVkX3NlY3Rpb259YCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5hc3NpZ25fc2VjdGlvbih0aGlzLmFzc2lnbmVkX3NlY3Rpb24pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDT01NQU5EUy5TRUNUSU9OX0FTU0lHTk1FTlQuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIHNlY3Rpb25fYXNzaWdubWVudCBmb3IgJHtwYXRyb2xsZXJfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnByb21wdF9zZWN0aW9uX2Fzc2lnbm1lbnQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQ09NTUFORFMuV0hBVFNBUFAuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBJJ20gYXZhaWxhYmxlIG9uIFdoYXRzQXBwIGFzIHdlbGwhIFdoYXRzQXBwIHVzZXMgV2lmaS9DZWxsIERhdGEgaW5zdGVhZCBvZiBTTVMsIGFuZCBjYW4gYmUgbW9yZSByZWxpYWJsZS4gTWVzc2FnZSBtZSBhdCBodHRwczovL3dhLm1lLzEke3RoaXMudG99YCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKENPTU1BTkRTLk1FU1NBR0UuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIG1lc3NhZ2UgZm9yICR7cGF0cm9sbGVyX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5wcm9tcHRfbWVzc2FnZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDT01NQU5EUy5CUk9BRENBU1QuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIGJyb2FkY2FzdCBmb3IgJHtwYXRyb2xsZXJfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnByb21wdF9icm9hZGNhc3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb21wdHMgdGhlIHVzZXIgZm9yIGEgY29tbWFuZC5cbiAgICAgKiBAcmV0dXJucyB7QlZOU1BSZXNwb25zZX0gVGhlIHJlc3BvbnNlIHByb21wdGluZyB0aGUgdXNlciBmb3IgYSBjb21tYW5kLlxuICAgICAqL1xuICAgIHByb21wdF9jb21tYW5kKCk6IEJWTlNQUmVzcG9uc2Uge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IGAke3RoaXMucGF0cm9sbGVyIS5uYW1lfSwgSSdtIHRoZSBCVk5TUCBCb3QuXG5FbnRlciBhIGNvbW1hbmQ6XG5DaGVjayBpbiAvIENoZWNrIG91dCAvIFN0YXR1cyAvIE9uIER1dHkgLyBTZWN0aW9uIEFzc2lnbm1lbnQgLyBHdWVzdCBQYXNzIC8gTWVzc2FnZSAvIFdoYXRzQXBwXG5TZW5kICdyZXN0YXJ0JyBhdCBhbnkgdGltZSB0byBiZWdpbiBhZ2FpbmAsXG4gICAgICAgICAgICBuZXh0X3N0ZXA6IE5FWFRfU1RFUFMuQVdBSVRfQ09NTUFORCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm9tcHRzIHRoZSB1c2VyIGZvciBhIGNoZWNrLWluLlxuICAgICAqIEByZXR1cm5zIHtCVk5TUFJlc3BvbnNlfSBUaGUgcmVzcG9uc2UgcHJvbXB0aW5nIHRoZSB1c2VyIGZvciBhIGNoZWNrLWluLlxuICAgICAqL1xuICAgIHByb21wdF9jaGVja2luKCk6IEJWTlNQUmVzcG9uc2Uge1xuICAgICAgICBjb25zdCB0eXBlcyA9IE9iamVjdC52YWx1ZXModGhpcy5jaGVja2luX3ZhbHVlcy5ieV9rZXkpLm1hcChcbiAgICAgICAgICAgICh4KSA9PiB4LnNtc19kZXNjXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZTogYCR7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXIhLm5hbWVcbiAgICAgICAgICAgIH0sIHVwZGF0ZSBwYXRyb2xsaW5nIHN0YXR1cyB0bzogJHt0eXBlc1xuICAgICAgICAgICAgICAgIC5zbGljZSgwLCAtMSlcbiAgICAgICAgICAgICAgICAuam9pbihcIiwgXCIpfSwgb3IgJHt0eXBlcy5zbGljZSgtMSl9P2AsXG4gICAgICAgICAgICBuZXh0X3N0ZXA6IE5FWFRfU1RFUFMuQVdBSVRfQ0hFQ0tJTixcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIFBhcnNlcyB0aGUgZmFzdCBzZWN0aW9uIGFzc2lnbm1lbnQgZnJvbSB0aGUgbWVzc2FnZSBib2R5LlxuICAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHkgLSBUaGUgbWVzc2FnZSBib2R5LlxuICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNlY3Rpb24gYXNzaWdubWVudCBpcyBwYXJzZWQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAqL1xuICAgIHBhcnNlX2Zhc3Rfc2VjdGlvbl9hc3NpZ25tZW50KGJvZHk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHRoaXMuYXNzaWduZWRfc2VjdGlvbiA9IG51bGw7XG4gICAgaWYgKCFib2R5IHx8ICFib2R5LmluY2x1ZGVzKFwiLVwiKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHNlZ21lbnRzID0gYm9keS5zcGxpdChcIi1cIik7XG4gICAgY29uc3QgbGFzdFNlZ21lbnQgPSBzZWdtZW50cy5wb3AoKTtcbiAgICBjb25zdCBmaXJzdFBhcnQgPSBzZWdtZW50cy5qb2luKFwiLVwiKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgaWYgKGxhc3RTZWdtZW50ICYmIENPTU1BTkRTLlNFQ1RJT05fQVNTSUdOTUVOVC5pbmNsdWRlcyhmaXJzdFBhcnQpKSB7XG4gICAgICAgIHRoaXMuYXNzaWduZWRfc2VjdGlvbiA9IHRoaXMuc2VjdGlvbl92YWx1ZXMubWFwX3NlY3Rpb24obGFzdFNlZ21lbnQudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgIHJldHVybiB0aGlzLmFzc2lnbmVkX3NlY3Rpb24gIT09IG51bGwgJiYgdGhpcy5hc3NpZ25lZF9zZWN0aW9uICE9PSBcIlwiO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvbXB0cyB0aGUgdXNlciBmb3Igc2VjdGlvbiBhc3NpZ25tZW50LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSByZXNwb25zZS5cbiAgICAgKi9cbiAgICBhc3luYyBwcm9tcHRfc2VjdGlvbl9hc3NpZ25tZW50KCk6IFByb21pc2U8QlZOU1BSZXNwb25zZT4ge1xuICAgICAgICBpZiAoIXRoaXMucGF0cm9sbGVyIHx8ICF0aGlzLnBhdHJvbGxlci5jaGVja2luKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgJHt0aGlzLnBhdHJvbGxlciEubmFtZX0gaXMgbm90IGNoZWNrZWQgaW4uYCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2VjdGlvbl9kZXNjcmlwdGlvbiA9IHRoaXMuc2VjdGlvbl92YWx1ZXMuZ2V0X3NlY3Rpb25fZGVzY3JpcHRpb24oKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3BvbnNlOiBgRW50ZXIgeW91ciBhc3NpZ25lZCBzZWN0aW9uOyBvbmUgb2YgJHtzZWN0aW9uX2Rlc2NyaXB0aW9ufSAob3IgJ3Jlc3RhcnQnKWAsXG4gICAgICAgICAgICBuZXh0X3N0ZXA6IE5FWFRfU1RFUFMuQVdBSVRfU0VDVElPTixcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCdWlsZHMgdGhlIG1lc3NhZ2UgcHJlZml4IGZvciBhIHRleHQgbWVzc2FnZSBmcm9tIGEgcGF0cm9sbGVyLlxuICAgICAqIEluY2x1ZGVzIHRoZSBzZW5kZXIncyBuYW1lIGFuZCBmb3JtYXR0ZWQgcGhvbmUgbnVtYmVyLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZW5kZXJfbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwYXRyb2xsZXIgc2VuZGluZyB0aGUgbWVzc2FnZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VuZGVyX3Bob25lIC0gVGhlIHNlbmRlcidzIDEwLWRpZ2l0IHBob25lIG51bWJlci5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgbWVzc2FnZSBwcmVmaXguIGZvciBleGFtcGxlIDogXCJNZXNzYWdlIGZyb20gSm9obiBEb2UgKDEyMyk0NTYtNzg5MFwiLlxuICAgICAqL1xuICAgIGdldF9tZXNzYWdlX3ByZWZpeChzZW5kZXJfbmFtZTogc3RyaW5nLCBzZW5kZXJfcGhvbmU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZF9waG9uZSA9IGZvcm1hdF9waG9uZV9mb3JfZGlzcGxheShzZW5kZXJfcGhvbmUpO1xuICAgICAgICByZXR1cm4gYCR7TUVTU0FHRV9QUkVGSVhfVEVNUExBVEV9JHtzZW5kZXJfbmFtZX0gJHtmb3JtYXR0ZWRfcGhvbmV9JHtNRVNTQUdFX1BSRUZJWF9TVUZGSVh9YDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGVzIHRoZSBtYXhpbXVtIGFsbG93ZWQgbWVzc2FnZSBsZW5ndGggZm9yIGEgdGV4dCBtZXNzYWdlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZW5kZXJfbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwYXRyb2xsZXIgc2VuZGluZyB0aGUgbWVzc2FnZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VuZGVyX3Bob25lIC0gVGhlIHNlbmRlcidzIDEwLWRpZ2l0IHBob25lIG51bWJlci5cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgbWF4aW11bSBudW1iZXIgb2YgY2hhcmFjdGVycyB0aGUgdXNlcidzIG1lc3NhZ2UgY2FuIGNvbnRhaW4uXG4gICAgICovXG4gICAgZ2V0X21heF9tZXNzYWdlX2xlbmd0aChzZW5kZXJfbmFtZTogc3RyaW5nLCBzZW5kZXJfcGhvbmU6IHN0cmluZyk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBTTVNfTUFYX0xFTkdUSCAtIHRoaXMuZ2V0X21lc3NhZ2VfcHJlZml4KHNlbmRlcl9uYW1lLCBzZW5kZXJfcGhvbmUpLmxlbmd0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm9tcHRzIHRoZSB1c2VyIHRvIHR5cGUgdGhlaXIgdGV4dCBtZXNzYWdlLlxuICAgICAqIEFueSBwYXRyb2xsZXIgd2l0aCBhIHZhbGlkIHBob25lIG51bWJlciBjYW4gc2VuZCBhIG1lc3NhZ2UsIHJlZ2FyZGxlc3NcbiAgICAgKiBvZiB0aGVpciBvd24gY2hlY2staW4gc3RhdHVzLiAgVGhlIHJlY2lwaWVudCBsaXN0IGluY2x1ZGVzIGFsbFxuICAgICAqIHBhdHJvbGxlcnMgd2hvIGhhdmUgYW55IGNoZWNrLWluIHN0YXR1cyAoQWxsIERheSwgSGFsZiBBTSwgSGFsZiBQTSxcbiAgICAgKiBvciBDaGVja2VkIE91dCksIGluY2x1ZGluZyB0aGUgc2VuZGVyIHRoZW1zZWx2ZXMgaWYgdGhleSBhcmUgY2hlY2tlZCBpbi5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcHJvbXB0IHJlc3BvbnNlLlxuICAgICAqL1xuICAgIGFzeW5jIHByb21wdF9tZXNzYWdlKCk6IFByb21pc2U8QlZOU1BSZXNwb25zZT4ge1xuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG4gICAgICAgIGNvbnN0IHJlY2lwaWVudHMgPSBsb2dpbl9zaGVldC5nZXRfb25fZHV0eV9wYXRyb2xsZXJzKCk7XG4gICAgICAgIGlmIChyZWNpcGllbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYE5vIHBhdHJvbGxlcnMgYXJlIGN1cnJlbnRseSBsb2dnZWQgaW4uIFRoZXJlIGlzIG5vYm9keSB0byBzZW5kIGEgbWVzc2FnZSB0by5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZW5kZXJfcGhvbmUgPSBzYW5pdGl6ZV9waG9uZV9udW1iZXIodGhpcy5mcm9tKTtcbiAgICAgICAgY29uc3QgbWF4X2xlbmd0aCA9IHRoaXMuZ2V0X21heF9tZXNzYWdlX2xlbmd0aCh0aGlzLnBhdHJvbGxlciEubmFtZSwgc2VuZGVyX3Bob25lKTtcbiAgICAgICAgaWYgKG1heF9sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYFlvdXIgbmFtZSBpcyB0b28gbG9uZyB0byBzZW5kIGEgdGV4dCBtZXNzYWdlLmAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZTogYFBsZWFzZSB0eXBlIGEgbWVzc2FnZSBvZiBubyBtb3JlIHRoYW4gJHttYXhfbGVuZ3RofSBwbGFpbi10ZXh0IGNoYXJhY3RlcnMgdG8gJHtyZWNpcGllbnRzLmxlbmd0aH0gcGF0cm9sbGVyJHtyZWNpcGllbnRzLmxlbmd0aCAhPT0gMSA/IFwic1wiIDogXCJcIn0sIG9yICdyZXN0YXJ0JyB0byBjYW5jZWwuYCxcbiAgICAgICAgICAgIG5leHRfc3RlcDogTkVYVF9TVEVQUy5BV0FJVF9NRVNTQUdFLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbmRzIGEgdGV4dCBtZXNzYWdlIHRvIGFsbCBwYXRyb2xsZXJzIHdpdGggYSBjaGVjay1pbiBzdGF0dXMgZm9yIHRoZSBkYXkuXG4gICAgICogVGhlIHNlbmRlciBhbHNvIHJlY2VpdmVzIHRoZSBtZXNzYWdlIGlmIHRoZXkgaGF2ZSBhIGNoZWNrLWluIHN0YXR1cy5cbiAgICAgKiBWYWxpZGF0ZXMgdGhhdCB0aGUgY29tcGxldGUgbWVzc2FnZSAocHJlZml4ICsgYm9keSkgdXNlcyBvbmx5IEdTTS03XG4gICAgICogY2hhcmFjdGVycyBhbmQgZml0cyB3aXRoaW4gYSBzaW5nbGUgU01TIHNlZ21lbnQsIHVzaW5nIHRoZVxuICAgICAqIHNtcy1zZWdtZW50cy1jYWxjdWxhdG9yIGxpYnJhcnkuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VfdGV4dCAtIFRoZSByYXcgbWVzc2FnZSB0ZXh0IGZyb20gdGhlIHNlbmRlci5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgc2VuZCByZXN1bHQuXG4gICAgICovXG4gICAgYXN5bmMgc2VuZF90ZXh0X21lc3NhZ2UobWVzc2FnZV90ZXh0OiBzdHJpbmcpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3Qgc2VuZGVyX25hbWUgPSB0aGlzLnBhdHJvbGxlciEubmFtZTtcbiAgICAgICAgY29uc3Qgc2VuZGVyX3Bob25lID0gc2FuaXRpemVfcGhvbmVfbnVtYmVyKHRoaXMuZnJvbSk7XG4gICAgICAgIGNvbnN0IHByZWZpeCA9IHRoaXMuZ2V0X21lc3NhZ2VfcHJlZml4KHNlbmRlcl9uYW1lLCBzZW5kZXJfcGhvbmUpO1xuICAgICAgICBjb25zdCBtYXhfbGVuZ3RoID0gdGhpcy5nZXRfbWF4X21lc3NhZ2VfbGVuZ3RoKHNlbmRlcl9uYW1lLCBzZW5kZXJfcGhvbmUpO1xuICAgICAgICBjb25zdCBmdWxsX21lc3NhZ2UgPSBwcmVmaXggKyBtZXNzYWdlX3RleHQ7XG5cbiAgICAgICAgY29uc3QgdmFsaWRhdGlvbiA9IHZhbGlkYXRlX3Ntc19tZXNzYWdlKGZ1bGxfbWVzc2FnZSk7XG4gICAgICAgIGlmICghdmFsaWRhdGlvbi52YWxpZCkge1xuICAgICAgICAgICAgaWYgKHZhbGlkYXRpb24ucmVhc29uID09PSBcIm5vbl9nc203XCIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBiYWRfY2hhcnMgPSB2YWxpZGF0aW9uLm5vbl9nc21fY2hhcmFjdGVycyEuam9pbihcIiBcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBZb3VyIG1lc3NhZ2UgY29udGFpbnMgY2hhcmFjdGVycyB0aGF0IGFyZSBub3Qgc3VwcG9ydGVkIGluIHBsYWluLXRleHQgU01TOiAke2JhZF9jaGFyc30uIFBsZWFzZSB1c2Ugb25seSBzdGFuZGFyZCBjaGFyYWN0ZXJzIGFuZCB0cnkgYWdhaW4uYCxcbiAgICAgICAgICAgICAgICAgICAgbmV4dF9zdGVwOiBORVhUX1NURVBTLkFXQUlUX01FU1NBR0UsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBZb3VyIG1lc3NhZ2UgaXMgJHttZXNzYWdlX3RleHQubGVuZ3RofSBjaGFyYWN0ZXJzLCB3aGljaCBleGNlZWRzIHRoZSBsaW1pdCBvZiAke21heF9sZW5ndGh9LiBQbGVhc2Ugc2hvcnRlbiB5b3VyIG1lc3NhZ2UgYW5kIHRyeSBhZ2Fpbiwgb3IgdHlwZSAncmVzdGFydCcgdG8gY2FuY2VsLmAsXG4gICAgICAgICAgICAgICAgbmV4dF9zdGVwOiBORVhUX1NURVBTLkFXQUlUX01FU1NBR0UsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuICAgICAgICBjb25zdCBzaWduZWRfaW5fcGF0cm9sbGVycyA9IGxvZ2luX3NoZWV0LmdldF9vbl9kdXR5X3BhdHJvbGxlcnMoKTtcbiAgICAgICAgY29uc3QgcGhvbmVfbWFwID0gYXdhaXQgdGhpcy5nZXRfcGhvbmVfbnVtYmVyX21hcCgpO1xuXG4gICAgICAgIC8vIEJ1aWxkIHJlY2lwaWVudCBtYXAgZm9yIG9uLWR1dHkgcGF0cm9sbGVycyB3aXRoIGtub3duIHBob25lczsgdHJhY2sgbWlzc2luZ1xuICAgICAgICBjb25zdCByZWNpcGllbnRfbWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge307XG4gICAgICAgIGNvbnN0IG5vX3Bob25lX25hbWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IHBhdHJvbGxlciBvZiBzaWduZWRfaW5fcGF0cm9sbGVycykge1xuICAgICAgICAgICAgY29uc3QgcGhvbmUgPSBwaG9uZV9tYXBbcGF0cm9sbGVyLm5hbWVdO1xuICAgICAgICAgICAgaWYgKHBob25lKSB7XG4gICAgICAgICAgICAgICAgcmVjaXBpZW50X21hcFtwYXRyb2xsZXIubmFtZV0gPSBwaG9uZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbm9fcGhvbmVfbmFtZXMucHVzaChwYXRyb2xsZXIubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB7IHNlbnRfY291bnQsIGNvcHlfc2VudF90b19zZW5kZXIsIGZhaWxlZF9uYW1lcyB9ID1cbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZGVsaXZlcl9zbXNfdG9fbWFwKHJlY2lwaWVudF9tYXAsIGZ1bGxfbWVzc2FnZSwgc2VuZGVyX25hbWUpO1xuXG4gICAgICAgIGF3YWl0IHRoaXMubG9nX2FjdGlvbihgdGV4dF9tZXNzYWdlKCR7c2VudF9jb3VudCArIChjb3B5X3NlbnRfdG9fc2VuZGVyID8gMSA6IDApfSlgKTtcblxuICAgICAgICBsZXQgcmVzcG9uc2UgPSBgTWVzc2FnZSBzZW50IHRvICR7c2VudF9jb3VudH0gcGF0cm9sbGVyJHtzZW50X2NvdW50ICE9PSAxID8gXCJzXCIgOiBcIlwifWA7XG4gICAgICAgIGlmIChjb3B5X3NlbnRfdG9fc2VuZGVyKSB7XG4gICAgICAgICAgICByZXNwb25zZSArPSBgIGFuZCBhIGNvcHkgdG8geW91LmA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNwb25zZSArPSBgLmA7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYWxsX2ZhaWxlZCA9IFsuLi5ub19waG9uZV9uYW1lcywgLi4uZmFpbGVkX25hbWVzXTtcbiAgICAgICAgaWYgKGFsbF9mYWlsZWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmVzcG9uc2UgKz0gYCBDb3VsZCBub3Qgc2VuZCB0bzogJHthbGxfZmFpbGVkLmpvaW4oXCIsIFwiKX0uYDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyByZXNwb25zZSB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvcmUgU01TIGRlbGl2ZXJ5IGxvb3AuIFNlbmRzIGZ1bGxfbWVzc2FnZSB0byBlYWNoIGVudHJ5IGluIHJlY2lwaWVudF9tYXBcbiAgICAgKiAobmFtZSDihpIgXCIrMVhYWFhYWFhYWFhcIikuIElmIHRoZSBzZW5kZXIncyBwaG9uZSBpcyBub3QgYW1vbmcgdGhlIHJlY2lwaWVudHMsXG4gICAgICogYSBjb3B5IGlzIHNlbnQgdG8gdGhpcy5mcm9tLiBSZXR1cm5zIGRlbGl2ZXJ5IGFjY291bnRpbmcgZGF0YS5cbiAgICAgKiBAcGFyYW0ge1JlY29yZDxzdHJpbmcsIHN0cmluZz59IHJlY2lwaWVudF9tYXAgLSBNYXAgb2YgcGF0cm9sbGVyIG5hbWUgdG8gXCIrMVhYWFhYWFhYWFhcIiBwaG9uZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZnVsbF9tZXNzYWdlIC0gVGhlIGNvbXBsZXRlIGZvcm1hdHRlZCBTTVMgdG8gc2VuZC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VuZGVyX25hbWUgLSBUaGUgc2VuZGVyJ3MgbmFtZSAodXNlZCBmb3IgZmFpbHVyZSBsb2dnaW5nKS5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxvYmplY3Q+fSBEZWxpdmVyeSBjb3VudHMgYW5kIGZhaWx1cmUgbGlzdC5cbiAgICAgKi9cbiAgICBhc3luYyBkZWxpdmVyX3Ntc190b19tYXAoXG4gICAgICAgIHJlY2lwaWVudF9tYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4sXG4gICAgICAgIGZ1bGxfbWVzc2FnZTogc3RyaW5nLFxuICAgICAgICBzZW5kZXJfbmFtZTogc3RyaW5nLFxuICAgICk6IFByb21pc2U8eyBzZW50X2NvdW50OiBudW1iZXI7IGNvcHlfc2VudF90b19zZW5kZXI6IGJvb2xlYW47IGZhaWxlZF9uYW1lczogc3RyaW5nW10gfT4ge1xuICAgICAgICBsZXQgc2VudF9jb3VudCA9IDA7XG4gICAgICAgIGNvbnN0IGZhaWxlZF9uYW1lczogc3RyaW5nW10gPSBbXTtcblxuICAgICAgICBmb3IgKGNvbnN0IFtuYW1lLCBwaG9uZV0gb2YgT2JqZWN0LmVudHJpZXMocmVjaXBpZW50X21hcCkpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXRfdHdpbGlvX2NsaWVudCgpLm1lc3NhZ2VzLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHRvOiBwaG9uZSxcbiAgICAgICAgICAgICAgICAgICAgZnJvbTogdGhpcy50byxcbiAgICAgICAgICAgICAgICAgICAgYm9keTogZnVsbF9tZXNzYWdlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHNlbnRfY291bnQrKztcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgRmFpbGVkIHRvIHNlbmQgU01TIHRvICR7bmFtZX06ICR7ZX1gKTtcbiAgICAgICAgICAgICAgICBmYWlsZWRfbmFtZXMucHVzaChuYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNlbmQgYSBjb3B5IHRvIHRoZSBzZW5kZXIgaWYgdGhlaXIgbnVtYmVyIGlzIG5vdCBhbHJlYWR5IGluIHRoZSByZWNpcGllbnQgbWFwXG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZWRfc2VuZGVyID0gYCsxJHtzYW5pdGl6ZV9waG9uZV9udW1iZXIodGhpcy5mcm9tKX1gO1xuICAgICAgICBjb25zdCBzZW5kZXJfaW5fbWFwID0gT2JqZWN0LnZhbHVlcyhyZWNpcGllbnRfbWFwKS5pbmNsdWRlcyhub3JtYWxpemVkX3NlbmRlcik7XG4gICAgICAgIGxldCBjb3B5X3NlbnRfdG9fc2VuZGVyID0gZmFsc2U7XG4gICAgICAgIGlmICghc2VuZGVyX2luX21hcCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmdldF90d2lsaW9fY2xpZW50KCkubWVzc2FnZXMuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgdG86IHRoaXMuZnJvbSxcbiAgICAgICAgICAgICAgICAgICAgZnJvbTogdGhpcy50byxcbiAgICAgICAgICAgICAgICAgICAgYm9keTogZnVsbF9tZXNzYWdlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvcHlfc2VudF90b19zZW5kZXIgPSB0cnVlO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBGYWlsZWQgdG8gc2VuZCBTTVMgY29weSB0byBzZW5kZXIgJHtzZW5kZXJfbmFtZX06ICR7ZX1gKTtcbiAgICAgICAgICAgICAgICBmYWlsZWRfbmFtZXMucHVzaChzZW5kZXJfbmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geyBzZW50X2NvdW50LCBjb3B5X3NlbnRfdG9fc2VuZGVyLCBmYWlsZWRfbmFtZXMgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm9tcHRzIHRoZSB1c2VyIHRvIHR5cGUgYSBicm9hZGNhc3QgbWVzc2FnZSB0byBhbGwgcGF0cm9sbGVycy5cbiAgICAgKiBVbmxpa2UgdGhlIG1lc3NhZ2UgY29tbWFuZCAod2hpY2ggdGFyZ2V0cyBvbmx5IGxvZ2dlZC1pbiBwYXRyb2xsZXJzKSwgYnJvYWRjYXN0XG4gICAgICogc2VuZHMgdG8gZXZlcnkgcGF0cm9sbGVyIGluIHRoZSBQaG9uZSBOdW1iZXJzIHNoZWV0LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBwcm9tcHQgcmVzcG9uc2UuXG4gICAgICovXG4gICAgYXN5bmMgcHJvbXB0X2Jyb2FkY2FzdCgpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgcGhvbmVfbWFwID0gYXdhaXQgdGhpcy5nZXRfcGhvbmVfbnVtYmVyX21hcCgpO1xuICAgICAgICBjb25zdCByZWNpcGllbnRfY291bnQgPSBPYmplY3Qua2V5cyhwaG9uZV9tYXApLmxlbmd0aDtcbiAgICAgICAgaWYgKHJlY2lwaWVudF9jb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYE5vIHBhdHJvbGxlcnMgd2l0aCBwaG9uZSBudW1iZXJzIGZvdW5kLiBUaGVyZSBpcyBub2JvZHkgdG8gYnJvYWRjYXN0IHRvLmAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNlbmRlcl9waG9uZSA9IHNhbml0aXplX3Bob25lX251bWJlcih0aGlzLmZyb20pO1xuICAgICAgICBjb25zdCBtYXhfbGVuZ3RoID0gdGhpcy5nZXRfbWF4X21lc3NhZ2VfbGVuZ3RoKHRoaXMucGF0cm9sbGVyIS5uYW1lLCBzZW5kZXJfcGhvbmUpO1xuICAgICAgICBpZiAobWF4X2xlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgWW91ciBuYW1lIGlzIHRvbyBsb25nIHRvIHNlbmQgYSBicm9hZGNhc3QgbWVzc2FnZS5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IGBQbGVhc2UgdHlwZSBhIGJyb2FkY2FzdCBtZXNzYWdlIG9mIG5vIG1vcmUgdGhhbiAke21heF9sZW5ndGh9IHBsYWluLXRleHQgY2hhcmFjdGVycyB0byAke3JlY2lwaWVudF9jb3VudH0gcGF0cm9sbGVyJHtyZWNpcGllbnRfY291bnQgIT09IDEgPyBcInNcIiA6IFwiXCJ9LCBvciAncmVzdGFydCcgdG8gY2FuY2VsLmAsXG4gICAgICAgICAgICBuZXh0X3N0ZXA6IE5FWFRfU1RFUFMuQVdBSVRfQlJPQURDQVNULFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbmRzIGEgYnJvYWRjYXN0IG1lc3NhZ2UgdG8gQUxMIHBhdHJvbGxlcnMgaW4gdGhlIFBob25lIE51bWJlcnMgc2hlZXQsXG4gICAgICogcmVnYXJkbGVzcyBvZiBjaGVjay1pbiBzdGF0dXMuIFVzZXMgdGhlIHNhbWUgcHJlZml4IGZvcm1hdCBhbmQgR1NNLTcgLyBzaW5nbGUtc2VnbWVudFxuICAgICAqIHZhbGlkYXRpb24gYXMgdGhlIG1lc3NhZ2UgY29tbWFuZC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZV90ZXh0IC0gVGhlIHJhdyBtZXNzYWdlIHRleHQgZnJvbSB0aGUgc2VuZGVyLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBzZW5kIHJlc3VsdC5cbiAgICAgKi9cbiAgICBhc3luYyBzZW5kX2Jyb2FkY2FzdF9tZXNzYWdlKG1lc3NhZ2VfdGV4dDogc3RyaW5nKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnN0IHNlbmRlcl9uYW1lID0gdGhpcy5wYXRyb2xsZXIhLm5hbWU7XG4gICAgICAgIGNvbnN0IHNlbmRlcl9waG9uZSA9IHNhbml0aXplX3Bob25lX251bWJlcih0aGlzLmZyb20pO1xuICAgICAgICBjb25zdCBwcmVmaXggPSB0aGlzLmdldF9tZXNzYWdlX3ByZWZpeChzZW5kZXJfbmFtZSwgc2VuZGVyX3Bob25lKTtcbiAgICAgICAgY29uc3QgbWF4X2xlbmd0aCA9IHRoaXMuZ2V0X21heF9tZXNzYWdlX2xlbmd0aChzZW5kZXJfbmFtZSwgc2VuZGVyX3Bob25lKTtcbiAgICAgICAgY29uc3QgZnVsbF9tZXNzYWdlID0gcHJlZml4ICsgbWVzc2FnZV90ZXh0O1xuXG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb24gPSB2YWxpZGF0ZV9zbXNfbWVzc2FnZShmdWxsX21lc3NhZ2UpO1xuICAgICAgICBpZiAoIXZhbGlkYXRpb24udmFsaWQpIHtcbiAgICAgICAgICAgIGlmICh2YWxpZGF0aW9uLnJlYXNvbiA9PT0gXCJub25fZ3NtN1wiKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYmFkX2NoYXJzID0gdmFsaWRhdGlvbi5ub25fZ3NtX2NoYXJhY3RlcnMhLmpvaW4oXCIgXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgWW91ciBtZXNzYWdlIGNvbnRhaW5zIGNoYXJhY3RlcnMgdGhhdCBhcmUgbm90IHN1cHBvcnRlZCBpbiBwbGFpbi10ZXh0IFNNUzogJHtiYWRfY2hhcnN9LiBQbGVhc2UgdXNlIG9ubHkgc3RhbmRhcmQgY2hhcmFjdGVycyBhbmQgdHJ5IGFnYWluLmAsXG4gICAgICAgICAgICAgICAgICAgIG5leHRfc3RlcDogTkVYVF9TVEVQUy5BV0FJVF9CUk9BRENBU1QsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBZb3VyIG1lc3NhZ2UgaXMgJHttZXNzYWdlX3RleHQubGVuZ3RofSBjaGFyYWN0ZXJzLCB3aGljaCBleGNlZWRzIHRoZSBsaW1pdCBvZiAke21heF9sZW5ndGh9LiBQbGVhc2Ugc2hvcnRlbiB5b3VyIG1lc3NhZ2UgYW5kIHRyeSBhZ2Fpbiwgb3IgdHlwZSAncmVzdGFydCcgdG8gY2FuY2VsLmAsXG4gICAgICAgICAgICAgICAgbmV4dF9zdGVwOiBORVhUX1NURVBTLkFXQUlUX0JST0FEQ0FTVCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGb3IgYnJvYWRjYXN0LCBzZW5kIHRvIEFMTCBwYXRyb2xsZXJzIGluIHRoZSBwaG9uZSBudW1iZXIgbWFwXG4gICAgICAgIGNvbnN0IHBob25lX21hcCA9IGF3YWl0IHRoaXMuZ2V0X3Bob25lX251bWJlcl9tYXAoKTtcbiAgICAgICAgY29uc3QgeyBzZW50X2NvdW50LCBjb3B5X3NlbnRfdG9fc2VuZGVyLCBmYWlsZWRfbmFtZXMgfSA9XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmRlbGl2ZXJfc21zX3RvX21hcChwaG9uZV9tYXAsIGZ1bGxfbWVzc2FnZSwgc2VuZGVyX25hbWUpO1xuXG4gICAgICAgIGF3YWl0IHRoaXMubG9nX2FjdGlvbihgYnJvYWRjYXN0KCR7c2VudF9jb3VudCArIChjb3B5X3NlbnRfdG9fc2VuZGVyID8gMSA6IDApfSlgKTtcblxuICAgICAgICBsZXQgcmVzcG9uc2UgPSBgQnJvYWRjYXN0IHNlbnQgdG8gJHtzZW50X2NvdW50fSBwYXRyb2xsZXIke3NlbnRfY291bnQgIT09IDEgPyBcInNcIiA6IFwiXCJ9YDtcbiAgICAgICAgaWYgKGNvcHlfc2VudF90b19zZW5kZXIpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlICs9IGAgYW5kIGEgY29weSB0byB5b3UuYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3BvbnNlICs9IGAuYDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmYWlsZWRfbmFtZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmVzcG9uc2UgKz0gYCBDb3VsZCBub3Qgc2VuZCB0bzogJHtmYWlsZWRfbmFtZXMuam9pbihcIiwgXCIpfS5gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHJlc3BvbnNlIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9va3MgdXAgcGhvbmUgbnVtYmVycyBmb3IgYWxsIHBhdHJvbGxlcnMgZnJvbSB0aGUgUGhvbmUgTnVtYmVycyBzaGVldC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+Pn0gQSBtYXAgb2YgcGF0cm9sbGVyIG5hbWUgdG8gcGhvbmUgbnVtYmVyIChpbiArMVhYWFhYWFhYWFggZm9ybWF0KS5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfcGhvbmVfbnVtYmVyX21hcCgpOiBQcm9taXNlPFJlY29yZDxzdHJpbmcsIHN0cmluZz4+IHtcbiAgICAgICAgY29uc3Qgc2hlZXRzX3NlcnZpY2UgPSBhd2FpdCB0aGlzLmdldF9zaGVldHNfc2VydmljZSgpO1xuICAgICAgICBjb25zdCBvcHRzOiBGaW5kUGF0cm9sbGVyQ29uZmlnID0gdGhpcy5jb21iaW5lZF9jb25maWc7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgc2hlZXRzX3NlcnZpY2Uuc3ByZWFkc2hlZXRzLnZhbHVlcy5nZXQoe1xuICAgICAgICAgICAgc3ByZWFkc2hlZXRJZDogb3B0cy5TSEVFVF9JRCxcbiAgICAgICAgICAgIHJhbmdlOiBvcHRzLlBIT05FX05VTUJFUl9MT09LVVBfU0hFRVQsXG4gICAgICAgICAgICB2YWx1ZVJlbmRlck9wdGlvbjogXCJVTkZPUk1BVFRFRF9WQUxVRVwiLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhLnZhbHVlcykge1xuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IHJvdyBvZiByZXNwb25zZS5kYXRhLnZhbHVlcykge1xuICAgICAgICAgICAgY29uc3QgbmFtZSA9IHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5QSE9ORV9OVU1CRVJfTkFNRV9DT0xVTU4pXTtcbiAgICAgICAgICAgIGNvbnN0IHJhd051bWJlciA9IHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5QSE9ORV9OVU1CRVJfTlVNQkVSX0NPTFVNTildO1xuICAgICAgICAgICAgaWYgKG5hbWUgJiYgcmF3TnVtYmVyKSB7XG4gICAgICAgICAgICAgICAgbWFwW25hbWVdID0gYCsxJHtzYW5pdGl6ZV9waG9uZV9udW1iZXIocmF3TnVtYmVyKX1gO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXA7XG4gICAgfVxuXG4vKipcbiAqIEFzc2lnbnMgdGhlIHNlY3Rpb24gdG8gdGhlIHBhdHJvbGxlci5cbiAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbH0gc2VjdGlvbiAtIFRoZSBzZWN0aW9uIHRvIGFzc2lnbi5cbiAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSByZXNwb25zZS5cbiAqL1xuYXN5bmMgYXNzaWduX3NlY3Rpb24oc2VjdGlvbjogc3RyaW5nIHwgbnVsbCk6IFByb21pc2U8QlZOU1BSZXNwb25zZT4ge1xuICAgIGNvbnN0IGFzc2lnbmVkU2VjdGlvbiA9IHNlY3Rpb24gPz8gXCJSb3ZpbmdcIjtcbiAgICBjb25zb2xlLmxvZyhgQXNzaWduaW5nIHNlY3Rpb24gJHt0aGlzLnBhdHJvbGxlciEubmFtZX0gdG8gJHthc3NpZ25lZFNlY3Rpb259YCk7XG4gICAgY29uc3QgbWFwcGVkX3NlY3Rpb24gPSB0aGlzLnNlY3Rpb25fdmFsdWVzLm1hcF9zZWN0aW9uKGFzc2lnbmVkU2VjdGlvbik7XG4gICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKGBhc3NpZ25fc2VjdGlvbigke21hcHBlZF9zZWN0aW9ufSlgKTtcbiAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG4gICAgYXdhaXQgbG9naW5fc2hlZXQuYXNzaWduX3NlY3Rpb24odGhpcy5wYXRyb2xsZXIhLCBtYXBwZWRfc2VjdGlvbik7XG4gICAgYXdhaXQgdGhpcy5sb2dpbl9zaGVldD8ucmVmcmVzaCgpO1xuICAgIGF3YWl0IHRoaXMuZ2V0X21hcHBlZF9wYXRyb2xsZXIodHJ1ZSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzcG9uc2U6IGBVcGRhdGVkICR7dGhpcy5wYXRyb2xsZXIhLm5hbWV9IHdpdGggc2VjdGlvbiBhc3NpZ25tZW50OiAke21hcHBlZF9zZWN0aW9ufS5gLFxuICAgIH07XG59XG5cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHN0YXR1cyBvZiB0aGUgcGF0cm9sbGVyLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBzdGF0dXMgcmVzcG9uc2UuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3N0YXR1cygpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuICAgICAgICBjb25zdCBzaGVldF9kYXRlID0gbG9naW5fc2hlZXQuc2hlZXRfZGF0ZS50b0RhdGVTdHJpbmcoKTtcbiAgICAgICAgY29uc3QgY3VycmVudF9kYXRlID0gbG9naW5fc2hlZXQuY3VycmVudF9kYXRlLnRvRGF0ZVN0cmluZygpO1xuICAgICAgICBpZiAoIWxvZ2luX3NoZWV0LmlzX2N1cnJlbnQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBzaGVldF9kYXRlOiAke2xvZ2luX3NoZWV0LnNoZWV0X2RhdGV9YCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgY3VycmVudF9kYXRlOiAke2xvZ2luX3NoZWV0LmN1cnJlbnRfZGF0ZX1gKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBTaGVldCBpcyBub3QgY3VycmVudCBmb3IgdG9kYXkgKGxhc3QgcmVzZXQ6ICR7c2hlZXRfZGF0ZX0pLiAke1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICAgICAgICAgIH0gaXMgbm90IGNoZWNrZWQgaW4gZm9yICR7Y3VycmVudF9kYXRlfS5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXNwb25zZSA9IHsgcmVzcG9uc2U6IGF3YWl0IHRoaXMuZ2V0X3N0YXR1c19zdHJpbmcoKSB9O1xuICAgICAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oXCJzdGF0dXNcIik7XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBzdGF0dXMgc3RyaW5nIG9mIHRoZSBwYXRyb2xsZXIuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c3RyaW5nPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgc3RhdHVzIHN0cmluZy5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfc3RhdHVzX3N0cmluZygpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG4gICAgICAgIGNvbnN0IGd1ZXN0X3Bhc3NfcHJvbWlzZSA9IChcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0X2d1ZXN0X3Bhc3Nfc2hlZXQoKVxuICAgICAgICApLmdldF9hdmFpbGFibGVfYW5kX3VzZWRfcGFzc2VzKHRoaXMucGF0cm9sbGVyIS5uYW1lKTtcbiAgICAgICAgY29uc3QgcGF0cm9sbGVyX3N0YXR1cyA9IHRoaXMucGF0cm9sbGVyITtcblxuICAgICAgICBjb25zdCBjaGVja2luQ29sdW1uU2V0ID1cbiAgICAgICAgICAgIHBhdHJvbGxlcl9zdGF0dXMuY2hlY2tpbiAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICBwYXRyb2xsZXJfc3RhdHVzLmNoZWNraW4gIT09IG51bGw7XG4gICAgICAgIGNvbnN0IGNoZWNrZWRPdXQgPVxuICAgICAgICAgICAgY2hlY2tpbkNvbHVtblNldCAmJlxuICAgICAgICAgICAgdGhpcy5jaGVja2luX3ZhbHVlcy5ieV9zaGVldF9zdHJpbmdbcGF0cm9sbGVyX3N0YXR1cy5jaGVja2luXS5rZXkgPT1cbiAgICAgICAgICAgICAgICBcIm91dFwiO1xuICAgICAgICBsZXQgc3RhdHVzID0gcGF0cm9sbGVyX3N0YXR1cy5jaGVja2luIHx8IFwiTm90IFByZXNlbnRcIjtcblxuICAgICAgICBpZiAoY2hlY2tlZE91dCkge1xuICAgICAgICAgICAgc3RhdHVzID0gXCJDaGVja2VkIE91dFwiO1xuICAgICAgICB9IGVsc2UgaWYgKGNoZWNraW5Db2x1bW5TZXQpIHtcbiAgICAgICAgICAgIGxldCBzZWN0aW9uID0gcGF0cm9sbGVyX3N0YXR1cy5zZWN0aW9uLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBpZiAoc2VjdGlvbi5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgICAgIHNlY3Rpb24gPSBgU2VjdGlvbiAke3NlY3Rpb259YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0YXR1cyA9IGAke3BhdHJvbGxlcl9zdGF0dXMuY2hlY2tpbn0gKCR7c2VjdGlvbn0pYDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbXBsZXRlZFBhdHJvbERheXMgPSBhd2FpdCAoXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmdldF9zZWFzb25fc2hlZXQoKVxuICAgICAgICApLmdldF9wYXRyb2xsZWRfZGF5cyh0aGlzLnBhdHJvbGxlciEubmFtZSk7XG4gICAgICAgIGNvbnN0IGNvbXBsZXRlZFBhdHJvbERheXNTdHJpbmcgPVxuICAgICAgICAgICAgY29tcGxldGVkUGF0cm9sRGF5cyA+IDAgPyBjb21wbGV0ZWRQYXRyb2xEYXlzLnRvU3RyaW5nKCkgOiBcIk5vXCI7XG4gICAgICAgIGNvbnN0IGxvZ2luU2hlZXREYXRlID0gbG9naW5fc2hlZXQuc2hlZXRfZGF0ZS50b0RhdGVTdHJpbmcoKTtcblxuICAgICAgICBsZXQgc3RhdHVzU3RyaW5nID0gYFN0YXR1cyBmb3IgJHtcbiAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyIS5uYW1lXG4gICAgICAgIH0gb24gZGF0ZSAke2xvZ2luU2hlZXREYXRlfTogJHtzdGF0dXN9LlxcbiR7Y29tcGxldGVkUGF0cm9sRGF5c1N0cmluZ30gY29tcGxldGVkIHBhdHJvbCBkYXlzIHByaW9yIHRvIHRvZGF5LmA7XG4gICAgICAgIGNvbnN0IHVzZWRUb2RheUd1ZXN0UGFzc2VzID0gKGF3YWl0IGd1ZXN0X3Bhc3NfcHJvbWlzZSk/LnVzZWRfdG9kYXkgfHwgMDtcbiAgICAgICAgY29uc3QgdXNlZFNlYXNvbkd1ZXN0UGFzc2VzID1cbiAgICAgICAgICAgIChhd2FpdCBndWVzdF9wYXNzX3Byb21pc2UpPy51c2VkX3NlYXNvbiB8fCAwO1xuICAgICAgICBjb25zdCBhdmFpbGFibGVHdWVzdFBhc3NlcyA9IChhd2FpdCBndWVzdF9wYXNzX3Byb21pc2UpPy5hdmFpbGFibGUgfHwgMDtcblxuXG4gICAgICAgIHN0YXR1c1N0cmluZyArPVxuICAgICAgICAgICAgXCIgXCIgK1xuICAgICAgICAgICAgYnVpbGRfcGFzc2VzX3N0cmluZyhcbiAgICAgICAgICAgICAgICB1c2VkU2Vhc29uR3Vlc3RQYXNzZXMsXG4gICAgICAgICAgICAgICAgdXNlZFNlYXNvbkd1ZXN0UGFzc2VzICsgYXZhaWxhYmxlR3Vlc3RQYXNzZXMsXG4gICAgICAgICAgICAgICAgdXNlZFRvZGF5R3Vlc3RQYXNzZXNcbiAgICAgICAgICAgICk7XG4gICAgICAgIHJldHVybiBzdGF0dXNTdHJpbmc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgdGhlIGNoZWNrLWluIHByb2Nlc3MgZm9yIHRoZSBwYXRyb2xsZXIgb25jZSB0aGUgY2hlY2staW4gbW9kZSBpcyBzZXQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGNoZWNrLWluIHJlc3BvbnNlLlxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBUaHJvd3MgYW4gZXJyb3IgaWYgdGhlIGNoZWNrLWluIG1vZGUgaXMgaW1wcm9wZXJseSBzZXQuXG4gICAgICovXG4gICAgYXN5bmMgY2hlY2tpbigpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICBgUGVyZm9ybWluZyByZWd1bGFyIGNoZWNraW4gZm9yICR7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXIhLm5hbWVcbiAgICAgICAgICAgIH0gd2l0aCBtb2RlOiAke3RoaXMuY2hlY2tpbl9tb2RlfWBcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGF3YWl0IHRoaXMuc2hlZXRfbmVlZHNfcmVzZXQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTpcbiAgICAgICAgICAgICAgICAgICAgYCR7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICAgICAgICAgICAgICB9LCB5b3UgYXJlIHRoZSBmaXJzdCBwZXJzb24gdG8gY2hlY2sgaW4gdG9kYXkuIGAgK1xuICAgICAgICAgICAgICAgICAgICBgSSBuZWVkIHRvIGFyY2hpdmUgYW5kIHJlc2V0IHRoZSBzaGVldCBiZWZvcmUgY29udGludWluZy4gYCArXG4gICAgICAgICAgICAgICAgICAgIGBXb3VsZCB5b3UgbGlrZSBtZSB0byBkbyB0aGF0PyAoWWVzL05vKWAsXG4gICAgICAgICAgICAgICAgbmV4dF9zdGVwOiBgJHtORVhUX1NURVBTLkNPTkZJUk1fUkVTRVR9LSR7dGhpcy5jaGVja2luX21vZGV9YCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNoZWNraW5fbW9kZTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgIXRoaXMuY2hlY2tpbl9tb2RlIHx8XG4gICAgICAgICAgICAoY2hlY2tpbl9tb2RlID0gdGhpcy5jaGVja2luX3ZhbHVlcy5ieV9rZXlbdGhpcy5jaGVja2luX21vZGVdKSA9PT1cbiAgICAgICAgICAgICAgICB1bmRlZmluZWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDaGVja2luIG1vZGUgaW1wcm9wZXJseSBzZXRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG4gICAgICAgIGNvbnN0IG5ld19jaGVja2luX3ZhbHVlID0gY2hlY2tpbl9tb2RlLnNoZWV0c192YWx1ZTtcbiAgICAgICAgYXdhaXQgbG9naW5fc2hlZXQuY2hlY2tpbih0aGlzLnBhdHJvbGxlciEsIG5ld19jaGVja2luX3ZhbHVlKTtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKGB1cGRhdGUtc3RhdHVzKCR7bmV3X2NoZWNraW5fdmFsdWV9KWApO1xuICAgICAgICBhd2FpdCB0aGlzLmxvZ2luX3NoZWV0Py5yZWZyZXNoKCk7XG4gICAgICAgIGF3YWl0IHRoaXMuZ2V0X21hcHBlZF9wYXRyb2xsZXIodHJ1ZSk7XG5cbiAgICAgICAgbGV0IHJlc3BvbnNlID0gYFVwZGF0aW5nICR7XG4gICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICB9IHdpdGggc3RhdHVzOiAke25ld19jaGVja2luX3ZhbHVlfS5gO1xuICAgICAgICBpZiAoIXRoaXMuZmFzdF9jaGVja2luKSB7XG4gICAgICAgICAgICByZXNwb25zZSArPSBgIFlvdSBjYW4gc2VuZCAnJHtjaGVja2luX21vZGUuZmFzdF9jaGVja2luc1swXX0nIGFzIHlvdXIgZmlyc3QgbWVzc2FnZSBmb3IgYSBmYXN0ICR7Y2hlY2tpbl9tb2RlLnNoZWV0c192YWx1ZX0gY2hlY2tpbiBuZXh0IHRpbWUuYDtcbiAgICAgICAgfVxuICAgICAgICByZXNwb25zZSArPSBcIlxcblxcblwiICsgKGF3YWl0IHRoaXMuZ2V0X3N0YXR1c19zdHJpbmcoKSk7XG4gICAgICAgIHJldHVybiB7IHJlc3BvbnNlOiByZXNwb25zZSB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGUgR29vZ2xlIFNoZWV0cyBuZWVkcyB0byBiZSByZXNldC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdHJ1ZSBpZiB0aGUgc2hlZXQgbmVlZHMgdG8gYmUgcmVzZXQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKi9cbiAgICBhc3luYyBzaGVldF9uZWVkc19yZXNldCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuXG4gICAgICAgIGNvbnN0IHNoZWV0X2RhdGUgPSBsb2dpbl9zaGVldC5zaGVldF9kYXRlO1xuICAgICAgICBjb25zdCBjdXJyZW50X2RhdGUgPSBsb2dpbl9zaGVldC5jdXJyZW50X2RhdGU7XG4gICAgICAgIGNvbnNvbGUubG9nKGBzaGVldF9kYXRlOiAke3NoZWV0X2RhdGV9YCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBjdXJyZW50X2RhdGU6ICR7Y3VycmVudF9kYXRlfWApO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGBkYXRlX2lzX2N1cnJlbnQ6ICR7bG9naW5fc2hlZXQuaXNfY3VycmVudH1gKTtcblxuICAgICAgICByZXR1cm4gIWxvZ2luX3NoZWV0LmlzX2N1cnJlbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzZXRzIHRoZSBHb29nbGUgU2hlZXRzIGZsb3csIGluY2x1ZGluZyBhcmNoaXZpbmcgYW5kIHJlc2V0dGluZyB0aGUgc2hlZXQgaWYgbmVjZXNzYXJ5LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2UgfCB2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgY2hlY2staW4gcmVzcG9uc2Ugb3Igdm9pZC5cbiAgICAgKi9cbiAgICBhc3luYyByZXNldF9zaGVldF9mbG93KCk6IFByb21pc2U8QlZOU1BSZXNwb25zZSB8IHZvaWQ+IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmNoZWNrX3VzZXJfY3JlZHMoXG4gICAgICAgICAgICBgJHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICAgICAgfSwgaW4gb3JkZXIgdG8gcmVzZXQvYXJjaGl2ZSwgSSBuZWVkIHlvdSB0byBhdXRob3JpemUgdGhlIGFwcC5gXG4gICAgICAgICk7XG4gICAgICAgIGlmIChyZXNwb25zZSlcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IHJlc3BvbnNlLnJlc3BvbnNlLFxuICAgICAgICAgICAgICAgIG5leHRfc3RlcDogYCR7TkVYVF9TVEVQUy5BVVRIX1JFU0VUfS0ke3RoaXMuY2hlY2tpbl9tb2RlfWAsXG4gICAgICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5yZXNldF9zaGVldCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc2V0cyB0aGUgR29vZ2xlIFNoZWV0cywgaW5jbHVkaW5nIGFyY2hpdmluZyBhbmQgcmVzZXR0aW5nIHRoZSBzaGVldC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgc2hlZXQgaXMgcmVzZXQuXG4gICAgICovXG4gICAgYXN5bmMgcmVzZXRfc2hlZXQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IHNjcmlwdF9zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfdXNlcl9zY3JpcHRzX3NlcnZpY2UoKTtcbiAgICAgICAgY29uc3Qgc2hvdWxkX3BlcmZvcm1fYXJjaGl2ZSA9ICEoYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKSkuYXJjaGl2ZWQ7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBzaG91bGRfcGVyZm9ybV9hcmNoaXZlXG4gICAgICAgICAgICA/IFwiT2theS4gQXJjaGl2aW5nIGFuZCByZXNldHRpbmcgdGhlIGNoZWNrIGluIHNoZWV0LiBUaGlzIHRha2VzIGFib3V0IDEwIHNlY29uZHMuLi5cIlxuICAgICAgICAgICAgOiBcIk9rYXkuIFNoZWV0IGhhcyBhbHJlYWR5IGJlZW4gYXJjaGl2ZWQuIFBlcmZvcm1pbmcgcmVzZXQuIFRoaXMgdGFrZXMgYWJvdXQgNSBzZWNvbmRzLi4uXCI7XG4gICAgICAgIGF3YWl0IHRoaXMuc2VuZF9tZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICBpZiAoc2hvdWxkX3BlcmZvcm1fYXJjaGl2ZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJBcmNoaXZpbmcuLi5cIik7XG5cbiAgICAgICAgICAgIGF3YWl0IHNjcmlwdF9zZXJ2aWNlLnNjcmlwdHMucnVuKHtcbiAgICAgICAgICAgICAgICBzY3JpcHRJZDogdGhpcy5yZXNldF9zY3JpcHRfaWQsXG4gICAgICAgICAgICAgICAgcmVxdWVzdEJvZHk6IHsgZnVuY3Rpb246IHRoaXMuY29uZmlnLkFSQ0hJVkVfRlVOQ1RJT05fTkFNRSB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmRlbGF5KDUpO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKFwiYXJjaGl2ZVwiKTtcbiAgICAgICAgICAgIHRoaXMubG9naW5fc2hlZXQgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJSZXNldHRpbmcuLi5cIik7XG4gICAgICAgIGF3YWl0IHNjcmlwdF9zZXJ2aWNlLnNjcmlwdHMucnVuKHtcbiAgICAgICAgICAgIHNjcmlwdElkOiB0aGlzLnJlc2V0X3NjcmlwdF9pZCxcbiAgICAgICAgICAgIHJlcXVlc3RCb2R5OiB7IGZ1bmN0aW9uOiB0aGlzLmNvbmZpZy5SRVNFVF9GVU5DVElPTl9OQU1FIH0sXG4gICAgICAgIH0pO1xuICAgICAgICBhd2FpdCB0aGlzLmRlbGF5KDUpO1xuICAgICAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oXCJyZXNldFwiKTtcbiAgICAgICAgYXdhaXQgdGhpcy5zZW5kX21lc3NhZ2UoXCJEb25lLlwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBHb29nbGUgQXBwcyBTY3JpcHQgc2VydmljZS5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzY3JpcHRfdjEuU2NyaXB0Pn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgR29vZ2xlIEFwcHMgU2NyaXB0IHNlcnZpY2UuXG4gICAgICovXG4gICAgYXN5bmMgY2hlY2tfdXNlcl9jcmVkcyhcbiAgICAgICAgcHJvbXB0X21lc3NhZ2U6IHN0cmluZyA9IFwiSGksIGJlZm9yZSB5b3UgY2FuIHVzZSBCVk5TUCBib3QsIHlvdSBtdXN0IGxvZ2luLlwiXG4gICAgKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlIHwgdW5kZWZpbmVkPiB7XG4gICAgICAgIGNvbnN0IHVzZXJfY3JlZHMgPSB0aGlzLmdldF91c2VyX2NyZWRzKCk7XG4gICAgICAgIGlmICghKGF3YWl0IHVzZXJfY3JlZHMubG9hZFRva2VuKCkpKSB7XG4gICAgICAgICAgICBjb25zdCBhdXRoVXJsID0gYXdhaXQgdXNlcl9jcmVkcy5nZXRBdXRoVXJsKCk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgJHtwcm9tcHRfbWVzc2FnZX0gUGxlYXNlIGZvbGxvdyB0aGlzIGxpbms6XG4ke2F1dGhVcmx9XG5cbk1lc3NhZ2UgbWUgYWdhaW4gd2hlbiBkb25lLmAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgR29vZ2xlIEFwcHMgU2NyaXB0IHNlcnZpY2UuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c2NyaXB0X3YxLlNjcmlwdD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIEdvb2dsZSBBcHBzIFNjcmlwdCBzZXJ2aWNlLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF9vbl9kdXR5KCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIGNvbnN0IGNoZWNrZWRfb3V0X3NlY3Rpb24gPSBcIkNoZWNrZWQgT3V0XCI7XG4gICAgICAgIGNvbnN0IGxhc3Rfc2VjdGlvbnMgPSBbY2hlY2tlZF9vdXRfc2VjdGlvbl07XG4gICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKTtcblxuICAgICAgICBjb25zdCBvbl9kdXR5X3BhdHJvbGxlcnMgPSBsb2dpbl9zaGVldC5nZXRfb25fZHV0eV9wYXRyb2xsZXJzKCk7XG4gICAgICAgIGNvbnN0IGJ5X3NlY3Rpb24gPSBvbl9kdXR5X3BhdHJvbGxlcnNcbiAgICAgICAgICAgIC5maWx0ZXIoKHgpID0+IHguY2hlY2tpbilcbiAgICAgICAgICAgIC5yZWR1Y2UoKHByZXY6IHsgW2tleTogc3RyaW5nXTogUGF0cm9sbGVyUm93W10gfSwgY3VyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2hvcnRfY29kZSA9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tpbl92YWx1ZXMuYnlfc2hlZXRfc3RyaW5nW2N1ci5jaGVja2luXS5rZXk7XG4gICAgICAgICAgICAgICAgbGV0IHNlY3Rpb24gPSBjdXIuc2VjdGlvbjtcbiAgICAgICAgICAgICAgICBpZiAoc2hvcnRfY29kZSA9PSBcIm91dFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlY3Rpb24gPSBjaGVja2VkX291dF9zZWN0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIShzZWN0aW9uIGluIHByZXYpKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZbc2VjdGlvbl0gPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcHJldltzZWN0aW9uXS5wdXNoKGN1cik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByZXY7XG4gICAgICAgICAgICB9LCB7fSk7XG4gICAgICAgIGxldCByZXN1bHRzOiBzdHJpbmdbXVtdID0gW107XG4gICAgICAgIGxldCBhbGxfa2V5cyA9IE9iamVjdC5rZXlzKGJ5X3NlY3Rpb24pO1xuICAgICAgICBjb25zdCBvcmRlcmVkX3ByaW1hcnlfc2VjdGlvbnMgPSBPYmplY3Qua2V5cyhieV9zZWN0aW9uKVxuICAgICAgICAgICAgLmZpbHRlcigoeCkgPT4gIWxhc3Rfc2VjdGlvbnMuaW5jbHVkZXMoeCkpXG4gICAgICAgICAgICAuc29ydCgpO1xuICAgICAgICBjb25zdCBmaWx0ZXJlZF9sYXN0X3NlY3Rpb25zID0gbGFzdF9zZWN0aW9ucy5maWx0ZXIoKHgpID0+XG4gICAgICAgICAgICBhbGxfa2V5cy5pbmNsdWRlcyh4KVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBvcmRlcmVkX3NlY3Rpb25zID0gb3JkZXJlZF9wcmltYXJ5X3NlY3Rpb25zLmNvbmNhdChcbiAgICAgICAgICAgIGZpbHRlcmVkX2xhc3Rfc2VjdGlvbnNcbiAgICAgICAgKTtcblxuICAgICAgICBmb3IgKGNvbnN0IHNlY3Rpb24gb2Ygb3JkZXJlZF9zZWN0aW9ucykge1xuICAgICAgICAgICAgbGV0IHJlc3VsdDogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IHBhdHJvbGxlcnMgPSBieV9zZWN0aW9uW3NlY3Rpb25dLnNvcnQoKHgsIHkpID0+XG4gICAgICAgICAgICAgICAgeC5uYW1lLmxvY2FsZUNvbXBhcmUoeS5uYW1lKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChzZWN0aW9uLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKFwiU2VjdGlvbiBcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQucHVzaChgJHtzZWN0aW9ufTogYCk7XG4gICAgICAgICAgICBmdW5jdGlvbiBwYXRyb2xsZXJfc3RyaW5nKG5hbWU6IHN0cmluZywgc2hvcnRfY29kZTogc3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRldGFpbHMgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGlmIChzaG9ydF9jb2RlICE9PSBcImRheVwiICYmIHNob3J0X2NvZGUgIT09IFwib3V0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlscyA9IGAgKCR7c2hvcnRfY29kZS50b1VwcGVyQ2FzZSgpfSlgO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7bmFtZX0ke2RldGFpbHN9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFxuICAgICAgICAgICAgICAgIHBhdHJvbGxlcnNcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgoeCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdHJvbGxlcl9zdHJpbmcoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tpbl92YWx1ZXMuYnlfc2hlZXRfc3RyaW5nW3guY2hlY2tpbl0ua2V5XG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLmpvaW4oXCIsIFwiKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChyZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHRoaXMubG9nX2FjdGlvbihcIm9uLWR1dHlcIik7XG4gICAgICAgIHJldHVybiBgUGF0cm9sbGVycyBmb3IgJHtsb2dpbl9zaGVldC5zaGVldF9kYXRlLnRvRGF0ZVN0cmluZygpfSAoVG90YWw6ICR7XG4gICAgICAgICAgICBvbl9kdXR5X3BhdHJvbGxlcnMubGVuZ3RoXG4gICAgICAgIH0pOlxcbiR7cmVzdWx0cy5tYXAoKHIpID0+IHIuam9pbihcIlwiKSkuam9pbihcIlxcblwiKX1gO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvZ3MgYW4gYWN0aW9uIHRvIHRoZSBHb29nbGUgU2hlZXRzLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhY3Rpb25fbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBhY3Rpb24gdG8gbG9nLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBhY3Rpb24gaXMgbG9nZ2VkLlxuICAgICAqL1xuICAgIGFzeW5jIGxvZ19hY3Rpb24oYWN0aW9uX25hbWU6IHN0cmluZykge1xuICAgICAgICBjb25zdCBzaGVldHNfc2VydmljZSA9IGF3YWl0IHRoaXMuZ2V0X3NoZWV0c19zZXJ2aWNlKCk7XG4gICAgICAgIGF3YWl0IHNoZWV0c19zZXJ2aWNlLnNwcmVhZHNoZWV0cy52YWx1ZXMuYXBwZW5kKHtcbiAgICAgICAgICAgIHNwcmVhZHNoZWV0SWQ6IHRoaXMuY29tYmluZWRfY29uZmlnLlNIRUVUX0lELFxuICAgICAgICAgICAgcmFuZ2U6IHRoaXMuY29uZmlnLkFDVElPTl9MT0dfU0hFRVQsXG4gICAgICAgICAgICB2YWx1ZUlucHV0T3B0aW9uOiBcIlVTRVJfRU5URVJFRFwiLFxuICAgICAgICAgICAgcmVxdWVzdEJvZHk6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZXM6IFtbdGhpcy5wYXRyb2xsZXIhLm5hbWUsIG5ldyBEYXRlKCksIGFjdGlvbl9uYW1lXV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2dzIG91dCB0aGUgdXNlci5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgbG9nb3V0IHJlc3BvbnNlLlxuICAgICAqL1xuICAgIGFzeW5jIGxvZ291dCgpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgdXNlcl9jcmVkcyA9IHRoaXMuZ2V0X3VzZXJfY3JlZHMoKTtcbiAgICAgICAgYXdhaXQgdXNlcl9jcmVkcy5kZWxldGVUb2tlbigpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IFwiT2theSwgSSBoYXZlIHJlbW92ZWQgYWxsIGxvZ2luIHNlc3Npb24gaW5mb3JtYXRpb24uXCIsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgVHdpbGlvIGNsaWVudC5cbiAgICAgKiBAcmV0dXJucyB7VHdpbGlvQ2xpZW50fSBUaGUgVHdpbGlvIGNsaWVudC5cbiAgICAgKi9cbiAgICBnZXRfdHdpbGlvX2NsaWVudCgpIHtcbiAgICAgICAgaWYgKHRoaXMudHdpbGlvX2NsaWVudCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0d2lsaW9fY2xpZW50IHdhcyBuZXZlciBpbml0aWFsaXplZCFcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudHdpbGlvX2NsaWVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBUd2lsaW8gU3luYyBjbGllbnQuXG4gICAgICogQHJldHVybnMge1NlcnZpY2VDb250ZXh0fSBUaGUgVHdpbGlvIFN5bmMgY2xpZW50LlxuICAgICAqL1xuICAgIGdldF9zeW5jX2NsaWVudCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN5bmNfY2xpZW50KSB7XG4gICAgICAgICAgICB0aGlzLnN5bmNfY2xpZW50ID0gdGhpcy5nZXRfdHdpbGlvX2NsaWVudCgpLnN5bmMudjEuc2VydmljZXMoXG4gICAgICAgICAgICAgICAgdGhpcy5zeW5jX3NpZFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zeW5jX2NsaWVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB1c2VyIGNyZWRlbnRpYWxzLlxuICAgICAqIEByZXR1cm5zIHtVc2VyQ3JlZHN9IFRoZSB1c2VyIGNyZWRlbnRpYWxzLlxuICAgICAqL1xuICAgIGdldF91c2VyX2NyZWRzKCkge1xuICAgICAgICBpZiAoIXRoaXMudXNlcl9jcmVkcykge1xuICAgICAgICAgICAgdGhpcy51c2VyX2NyZWRzID0gbmV3IFVzZXJDcmVkcyhcbiAgICAgICAgICAgICAgICB0aGlzLmdldF9zeW5jX2NsaWVudCgpLFxuICAgICAgICAgICAgICAgIHRoaXMuZnJvbSxcbiAgICAgICAgICAgICAgICB0aGlzLmNvbWJpbmVkX2NvbmZpZ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy51c2VyX2NyZWRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHNlcnZpY2UgY3JlZGVudGlhbHMuXG4gICAgICogQHJldHVybnMge0dvb2dsZUF1dGh9IFRoZSBzZXJ2aWNlIGNyZWRlbnRpYWxzLlxuICAgICAqL1xuICAgIGdldF9zZXJ2aWNlX2NyZWRzKCkge1xuICAgICAgICBpZiAoIXRoaXMuc2VydmljZV9jcmVkcykge1xuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlX2NyZWRzID0gbmV3IGdvb2dsZS5hdXRoLkdvb2dsZUF1dGgoe1xuICAgICAgICAgICAgICAgIGtleUZpbGU6IGdldF9zZXJ2aWNlX2NyZWRlbnRpYWxzX3BhdGgoKSxcbiAgICAgICAgICAgICAgICBzY29wZXM6IHRoaXMuU0NPUEVTLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZV9jcmVkcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB2YWxpZCBjcmVkZW50aWFscy5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtyZXF1aXJlX3VzZXJfY3JlZHM9ZmFsc2VdIC0gV2hldGhlciB1c2VyIGNyZWRlbnRpYWxzIGFyZSByZXF1aXJlZC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxHb29nbGVBdXRoPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgdmFsaWQgY3JlZGVudGlhbHMuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3ZhbGlkX2NyZWRzKHJlcXVpcmVfdXNlcl9jcmVkczogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5VU0VfU0VSVklDRV9BQ0NPVU5UICYmICFyZXF1aXJlX3VzZXJfY3JlZHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldF9zZXJ2aWNlX2NyZWRzKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXNlcl9jcmVkcyA9IHRoaXMuZ2V0X3VzZXJfY3JlZHMoKTtcbiAgICAgICAgaWYgKCEoYXdhaXQgdXNlcl9jcmVkcy5sb2FkVG9rZW4oKSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVzZXIgaXMgbm90IGF1dGhlZC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJVc2luZyB1c2VyIGFjY291bnQgZm9yIHNlcnZpY2UgYXV0aC4uLlwiKTtcbiAgICAgICAgcmV0dXJuIHVzZXJfY3JlZHMub2F1dGgyX2NsaWVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBHb29nbGUgU2hlZXRzIHNlcnZpY2UuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c2hlZXRzX3Y0LlNoZWV0cz59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIEdvb2dsZSBTaGVldHMgc2VydmljZS5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfc2hlZXRzX3NlcnZpY2UoKSB7XG4gICAgICAgIGlmICghdGhpcy5zaGVldHNfc2VydmljZSkge1xuICAgICAgICAgICAgdGhpcy5zaGVldHNfc2VydmljZSA9IGdvb2dsZS5zaGVldHMoe1xuICAgICAgICAgICAgICAgIHZlcnNpb246IFwidjRcIixcbiAgICAgICAgICAgICAgICBhdXRoOiBhd2FpdCB0aGlzLmdldF92YWxpZF9jcmVkcygpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2hlZXRzX3NlcnZpY2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbG9naW4gc2hlZXQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8TG9naW5TaGVldD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGxvZ2luIHNoZWV0XG4gICAgICovXG4gICAgYXN5bmMgZ2V0X2xvZ2luX3NoZWV0KCkge1xuICAgICAgICBpZiAoIXRoaXMubG9naW5fc2hlZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0X2NvbmZpZzogTG9naW5TaGVldENvbmZpZyA9IHRoaXMuY29tYmluZWRfY29uZmlnO1xuICAgICAgICAgICAgY29uc3Qgc2hlZXRzX3NlcnZpY2UgPSBhd2FpdCB0aGlzLmdldF9zaGVldHNfc2VydmljZSgpO1xuICAgICAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBuZXcgTG9naW5TaGVldChcbiAgICAgICAgICAgICAgICBzaGVldHNfc2VydmljZSxcbiAgICAgICAgICAgICAgICBsb2dpbl9zaGVldF9jb25maWdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBhd2FpdCBsb2dpbl9zaGVldC5yZWZyZXNoKCk7XG4gICAgICAgICAgICB0aGlzLmxvZ2luX3NoZWV0ID0gbG9naW5fc2hlZXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubG9naW5fc2hlZXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgc2Vhc29uIHNoZWV0LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFNlYXNvblNoZWV0Pn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgc2Vhc29uIHNoZWV0XG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3NlYXNvbl9zaGVldCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNlYXNvbl9zaGVldCkge1xuICAgICAgICAgICAgY29uc3Qgc2Vhc29uX3NoZWV0X2NvbmZpZzogU2Vhc29uU2hlZXRDb25maWcgPSB0aGlzLmNvbWJpbmVkX2NvbmZpZztcbiAgICAgICAgICAgIGNvbnN0IHNoZWV0c19zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfc2hlZXRzX3NlcnZpY2UoKTtcbiAgICAgICAgICAgIGNvbnN0IHNlYXNvbl9zaGVldCA9IG5ldyBTZWFzb25TaGVldChcbiAgICAgICAgICAgICAgICBzaGVldHNfc2VydmljZSxcbiAgICAgICAgICAgICAgICBzZWFzb25fc2hlZXRfY29uZmlnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5zZWFzb25fc2hlZXQgPSBzZWFzb25fc2hlZXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2Vhc29uX3NoZWV0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGd1ZXN0IHBhc3Mgc2hlZXQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8R3Vlc3RQYXNzU2hlZXQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBndWVzdCBwYXNzIHNoZWV0XG4gICAgICovXG4gICAgYXN5bmMgZ2V0X2d1ZXN0X3Bhc3Nfc2hlZXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5ndWVzdF9wYXNzX3NoZWV0KSB7XG4gICAgICAgICAgICBjb25zdCBjb25maWc6IEd1ZXN0UGFzc2VzQ29uZmlnID0gdGhpcy5jb21iaW5lZF9jb25maWc7XG4gICAgICAgICAgICBjb25zdCBzaGVldHNfc2VydmljZSA9IGF3YWl0IHRoaXMuZ2V0X3NoZWV0c19zZXJ2aWNlKCk7XG4gICAgICAgICAgICB0aGlzLmd1ZXN0X3Bhc3Nfc2hlZXQgPSBuZXcgR3Vlc3RQYXNzU2hlZXQoc2hlZXRzX3NlcnZpY2UsIGNvbmZpZyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZ3Vlc3RfcGFzc19zaGVldDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIEdvb2dsZSBBcHBzIFNjcmlwdCBzZXJ2aWNlLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHNjcmlwdF92MS5TY3JpcHQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBHb29nbGUgQXBwcyBTY3JpcHQgc2VydmljZS5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfdXNlcl9zY3JpcHRzX3NlcnZpY2UoKSB7XG4gICAgICAgIGlmICghdGhpcy51c2VyX3NjcmlwdHNfc2VydmljZSkge1xuICAgICAgICAgICAgdGhpcy51c2VyX3NjcmlwdHNfc2VydmljZSA9IGdvb2dsZS5zY3JpcHQoe1xuICAgICAgICAgICAgICAgIHZlcnNpb246IFwidjFcIixcbiAgICAgICAgICAgICAgICBhdXRoOiBhd2FpdCB0aGlzLmdldF92YWxpZF9jcmVkcyh0cnVlKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJfc2NyaXB0c19zZXJ2aWNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG1hcHBlZCBwYXRyb2xsZXIuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbZm9yY2U9ZmFsc2VdIC0gV2hldGhlciB0byBmb3JjZSB0aGUgcGF0cm9sbGVyIHRvIGJlIGZvdW5kLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2UgfCB2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcmVzcG9uc2Ugb3Igdm9pZC5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfbWFwcGVkX3BhdHJvbGxlcihmb3JjZTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IHBob25lX2xvb2t1cCA9IGF3YWl0IHRoaXMuZmluZF9wYXRyb2xsZXJfZnJvbV9udW1iZXIoKTtcbiAgICAgICAgaWYgKHBob25lX2xvb2t1cCA9PT0gdW5kZWZpbmVkIHx8IHBob25lX2xvb2t1cCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGZvcmNlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGZpbmQgYXNzb2NpYXRlZCB1c2VyXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYFNvcnJ5LCBJIGNvdWxkbid0IGZpbmQgYW4gYXNzb2NpYXRlZCBCVk5TUCBtZW1iZXIgd2l0aCB5b3VyIHBob25lIG51bWJlciAoJHt0aGlzLmZyb219KWAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuICAgICAgICBjb25zdCBtYXBwZWRQYXRyb2xsZXIgPSBsb2dpbl9zaGVldC50cnlfZmluZF9wYXRyb2xsZXIoXG4gICAgICAgICAgICBwaG9uZV9sb29rdXAubmFtZVxuICAgICAgICApO1xuICAgICAgICBpZiAobWFwcGVkUGF0cm9sbGVyID09PSBcIm5vdF9mb3VuZFwiKSB7XG4gICAgICAgICAgICBpZiAoZm9yY2UpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgcGF0cm9sbGVyIGluIGxvZ2luIHNoZWV0XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYENvdWxkIG5vdCBmaW5kIHBhdHJvbGxlciAnJHtwaG9uZV9sb29rdXAubmFtZX0nIGluIGxvZ2luIHNoZWV0LiBQbGVhc2UgbG9vayBhdCB0aGUgbG9naW4gc2hlZXQgbmFtZSwgYW5kIGNvcHkgaXQgdG8gdGhlIFBob25lIE51bWJlcnMgdGFiLmAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3VycmVudF9zaGVldF9kYXRlID0gbG9naW5fc2hlZXQuY3VycmVudF9kYXRlO1xuICAgICAgICB0aGlzLnBhdHJvbGxlciA9IG1hcHBlZFBhdHJvbGxlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaW5kcyB0aGUgcGF0cm9sbGVyIGZyb20gdGhlIHBob25lIG51bWJlci5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxQYXRyb2xsZXJSb3c+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBwYXRyb2xsZXIuXG4gICAgICovXG4gICAgYXN5bmMgZmluZF9wYXRyb2xsZXJfZnJvbV9udW1iZXIoKSB7XG4gICAgICAgIGNvbnN0IHJhd19udW1iZXIgPSB0aGlzLmZyb207XG4gICAgICAgIGNvbnN0IHNoZWV0c19zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfc2hlZXRzX3NlcnZpY2UoKTtcbiAgICAgICAgY29uc3Qgb3B0czogRmluZFBhdHJvbGxlckNvbmZpZyA9IHRoaXMuY29tYmluZWRfY29uZmlnO1xuICAgICAgICBjb25zdCBudW1iZXIgPSBzYW5pdGl6ZV9waG9uZV9udW1iZXIocmF3X251bWJlcik7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgc2hlZXRzX3NlcnZpY2Uuc3ByZWFkc2hlZXRzLnZhbHVlcy5nZXQoe1xuICAgICAgICAgICAgc3ByZWFkc2hlZXRJZDogb3B0cy5TSEVFVF9JRCxcbiAgICAgICAgICAgIHJhbmdlOiBvcHRzLlBIT05FX05VTUJFUl9MT09LVVBfU0hFRVQsXG4gICAgICAgICAgICB2YWx1ZVJlbmRlck9wdGlvbjogXCJVTkZPUk1BVFRFRF9WQUxVRVwiLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhLnZhbHVlcykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGZpbmQgcGF0cm9sbGVyLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwYXRyb2xsZXIgPSByZXNwb25zZS5kYXRhLnZhbHVlc1xuICAgICAgICAgICAgLm1hcCgocm93KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmF3TnVtYmVyID1cbiAgICAgICAgICAgICAgICAgICAgcm93W2V4Y2VsX3Jvd190b19pbmRleChvcHRzLlBIT05FX05VTUJFUl9OVU1CRVJfQ09MVU1OKV07XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudE51bWJlciA9XG4gICAgICAgICAgICAgICAgICAgIHJhd051bWJlciAhPSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgICAgID8gc2FuaXRpemVfcGhvbmVfbnVtYmVyKHJhd051bWJlcilcbiAgICAgICAgICAgICAgICAgICAgICAgIDogcmF3TnVtYmVyO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnROYW1lID1cbiAgICAgICAgICAgICAgICAgICAgcm93W2V4Y2VsX3Jvd190b19pbmRleChvcHRzLlBIT05FX05VTUJFUl9OQU1FX0NPTFVNTildO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IG5hbWU6IGN1cnJlbnROYW1lLCBudW1iZXI6IGN1cnJlbnROdW1iZXIgfTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZmlsdGVyKChwYXRyb2xsZXIpID0+IHBhdHJvbGxlci5udW1iZXIgPT09IG51bWJlcilbMF07XG4gICAgICAgIHJldHVybiBwYXRyb2xsZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvbXB0cyB0aGUgdXNlciBmb3IgYSBjb21wIG9yIG1hbmFnZXIgcGFzcy5cbiAgICAgKiBXZSBkbyBub3QgcmVxdWlyZSBhIGd1ZXN0IG5hbWUgaW4gdGhlIFNNUyBmbG93OyB0aGlzIHJldHVybnMgdGhlIHN0YXR1cy9wcm9tcHRcbiAgICAgKiBmb3IgZ3Vlc3QgcGFzc2VzIHNvIHRoZSBHdWVzdCBQYXNzIGNvbW1hbmQgYmVoYXZlcyBsaWtlIG90aGVyIGltbWVkaWF0ZSBhY3Rpb25zLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSByZXNwb25zZS5cbiAgICAgKi9cbiAgICBhc3luYyBwcm9tcHRfZ3Vlc3RfcGFzcygpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgLy8gQWxsb3cgYWxsIHBhdHJvbGxlcnMgKGluY2x1ZGluZyBjYW5kaWRhdGVzKSB0byB1c2UgZ3Vlc3QgcGFzc2VzIHdoZW4gYXZhaWxhYmxlLlxuICAgICAgICBjb25zdCBzaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2d1ZXN0X3Bhc3Nfc2hlZXQoKTtcbiAgICAgICAgY29uc3QgdXNlZF9hbmRfYXZhaWxhYmxlID0gYXdhaXQgc2hlZXQuZ2V0X2F2YWlsYWJsZV9hbmRfdXNlZF9wYXNzZXModGhpcy5wYXRyb2xsZXIhLm5hbWUpO1xuICAgICAgICBpZiAodXNlZF9hbmRfYXZhaWxhYmxlID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHJlc3BvbnNlOiBcIlByb2JsZW0gbG9va2luZyB1cCBwYXRyb2xsZXIgZm9yIGd1ZXN0IHBhc3Nlc1wiIH07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiB0aGVyZSBhcmUgbm8gYXZhaWxhYmxlIHBhc3NlcyB0b2RheSwgcmV0dXJuIHRoZSBwcm9tcHQgaW5kaWNhdGluZyBub25lIGFyZSBhdmFpbGFibGUuXG4gICAgICAgIGlmICh1c2VkX2FuZF9hdmFpbGFibGUuYXZhaWxhYmxlIDwgMSkge1xuICAgICAgICAgICAgcmV0dXJuIHVzZWRfYW5kX2F2YWlsYWJsZS5nZXRfcHJvbXB0KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDb25zdW1lIG9uZSBhdmFpbGFibGUgcGFzcyAodGhlIHNoZWV0IHJlY29yZHMgb25seSB0aGUgZGF0ZSBvZiB1c2UpLlxuICAgICAgICBhd2FpdCBzaGVldC5zZXRfdXNlZF9ndWVzdF9wYXNzZXModXNlZF9hbmRfYXZhaWxhYmxlKTtcblxuICAgICAgICAvLyBSZS1yZWFkIHRoZSB2YWx1ZXMgYW5kIHJldHVybiBjb25maXJtYXRpb24gKyB1cGRhdGVkIHN0YXR1cy5cbiAgICAgICAgY29uc3QgdXBkYXRlZCA9IGF3YWl0IHNoZWV0LmdldF9hdmFpbGFibGVfYW5kX3VzZWRfcGFzc2VzKHRoaXMucGF0cm9sbGVyIS5uYW1lKTtcbiAgICAgICAgaWYgKHVwZGF0ZWQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgcmVzcG9uc2U6IGBVcGRhdGVkICR7dGhpcy5wYXRyb2xsZXIhLm5hbWV9IHRvIHVzZSBhIGd1ZXN0IHBhc3MgdG9kYXkuYCB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc3RhdHVzID0gYnVpbGRfcGFzc2VzX3N0cmluZyhcbiAgICAgICAgICAgIHVwZGF0ZWQudXNlZF9zZWFzb24sXG4gICAgICAgICAgICB1cGRhdGVkLnVzZWRfc2Vhc29uICsgdXBkYXRlZC5hdmFpbGFibGUsXG4gICAgICAgICAgICB1cGRhdGVkLnVzZWRfdG9kYXlcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3BvbnNlOiBgVXBkYXRlZCAke3RoaXMucGF0cm9sbGVyIS5uYW1lfSB0byB1c2UgYSBndWVzdCBwYXNzIHRvZGF5LlxcbiR7c3RhdHVzfWAsXG4gICAgICAgIH07XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgc2hlZXRzX3Y0IH0gZnJvbSBcImdvb2dsZWFwaXNcIjtcbmltcG9ydCB7IEd1ZXN0UGFzc2VzQ29uZmlnIH0gZnJvbSBcIi4uL2Vudi9oYW5kbGVyX2NvbmZpZ1wiO1xuaW1wb3J0IHsgZXhjZWxfcm93X3RvX2luZGV4LCByb3dfY29sX3RvX2V4Y2VsX2luZGV4IH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxcIjtcbmltcG9ydCBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYiBmcm9tIFwiLi4vdXRpbHMvZ29vZ2xlX3NoZWV0c19zcHJlYWRzaGVldF90YWJcIjtcbmltcG9ydCB7IGZvcm1hdF9kYXRlX2Zvcl9zcHJlYWRzaGVldF92YWx1ZSB9IGZyb20gXCIuLi91dGlscy9kYXRldGltZV91dGlsXCI7XG5pbXBvcnQgeyBidWlsZF9wYXNzZXNfc3RyaW5nIH0gZnJvbSBcIi4uL3V0aWxzL2d1ZXN0X3Bhc3Nlc1wiO1xuaW1wb3J0IHsgQlZOU1BSZXNwb25zZSB9IGZyb20gXCIuLi9oYW5kbGVycy9idm5zcF9oYW5kbGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBVc2VkQW5kQXZhaWxhYmxlUGFzc2VzIHtcbiAgICByb3c6IGFueVtdO1xuICAgIGluZGV4OiBudW1iZXI7XG4gICAgYXZhaWxhYmxlOiBudW1iZXI7XG4gICAgdXNlZF90b2RheTogbnVtYmVyO1xuICAgIHVzZWRfc2Vhc29uOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcm93OiBhbnlbXSxcbiAgICAgICAgaW5kZXg6IG51bWJlcixcbiAgICAgICAgYXZhaWxhYmxlOiBhbnksXG4gICAgICAgIHVzZWRfdG9kYXk6IGFueSxcbiAgICAgICAgdXNlZF9zZWFzb246IGFueSxcbiAgICApIHtcbiAgICAgICAgdGhpcy5yb3cgPSByb3c7XG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5hdmFpbGFibGUgPSBOdW1iZXIoYXZhaWxhYmxlKTtcbiAgICAgICAgdGhpcy51c2VkX3RvZGF5ID0gTnVtYmVyKHVzZWRfdG9kYXkpO1xuICAgICAgICB0aGlzLnVzZWRfc2Vhc29uID0gTnVtYmVyKHVzZWRfc2Vhc29uKTtcbiAgICB9XG5cbiAgICBnZXRfcHJvbXB0KCk6IEJWTlNQUmVzcG9uc2Uge1xuICAgICAgICBpZiAodGhpcy5hdmFpbGFibGUgPiAwKSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGJ1aWxkX3Bhc3Nlc19zdHJpbmcoXG4gICAgICAgICAgICAgICAgdGhpcy51c2VkX3NlYXNvbixcbiAgICAgICAgICAgICAgICB0aGlzLmF2YWlsYWJsZSArIHRoaXMudXNlZF9zZWFzb24sXG4gICAgICAgICAgICAgICAgdGhpcy51c2VkX3RvZGF5LFxuICAgICAgICAgICAgICAgIHRydWVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IFwiWW91IGRvIG5vdCBoYXZlIGFueSBndWVzdCBwYXNzZXMgYXZhaWxhYmxlIHRvZGF5XCIsXG4gICAgICAgIH07XG4gICAgfVxufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUGFzc1NoZWV0IHtcbiAgICBzaGVldDogR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWI7XG5cbiAgICBjb25zdHJ1Y3RvcihzaGVldDogR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIpIHtcbiAgICAgICAgdGhpcy5zaGVldCA9IHNoZWV0O1xuICAgIH1cblxuICAgIGFic3RyYWN0IGdldCBhdmFpbGFibGVfY29sdW1uKCk6IHN0cmluZztcbiAgICBhYnN0cmFjdCBnZXQgdXNlZF90b2RheV9jb2x1bW4oKTogc3RyaW5nO1xuICAgIGFic3RyYWN0IGdldCB1c2VkX3NlYXNvbl9jb2x1bW4oKTogc3RyaW5nO1xuICAgIGFic3RyYWN0IGdldCBuYW1lX2NvbHVtbigpOiBzdHJpbmc7XG4gICAgYWJzdHJhY3QgZ2V0IHN0YXJ0X2luZGV4KCk6IG51bWJlcjtcbiAgICBhYnN0cmFjdCBnZXQgc2hlZXRfbmFtZSgpOiBzdHJpbmc7XG5cbiAgICBhc3luYyBnZXRfYXZhaWxhYmxlX2FuZF91c2VkX3Bhc3NlcyhcbiAgICAgICAgcGF0cm9sbGVyX25hbWU6IHN0cmluZ1xuICAgICk6IFByb21pc2U8VXNlZEFuZEF2YWlsYWJsZVBhc3NlcyB8IG51bGw+IHtcbiAgICAgICAgY29uc3QgcGF0cm9sbGVyX3JvdyA9IGF3YWl0IHRoaXMuc2hlZXQuZ2V0X3NoZWV0X3Jvd19mb3JfcGF0cm9sbGVyKFxuICAgICAgICAgICAgcGF0cm9sbGVyX25hbWUsXG4gICAgICAgICAgICB0aGlzLm5hbWVfY29sdW1uXG4gICAgICAgICk7XG4gICAgICAgIGlmIChwYXRyb2xsZXJfcm93ID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfZGF5X2F2YWlsYWJsZV9wYXNzZXMgPVxuICAgICAgICAgICAgcGF0cm9sbGVyX3Jvdy5yb3dbZXhjZWxfcm93X3RvX2luZGV4KHRoaXMuYXZhaWxhYmxlX2NvbHVtbildO1xuICAgICAgICBjb25zdCBjdXJyZW50X2RheV91c2VkX3Bhc3NlcyA9XG4gICAgICAgICAgICBwYXRyb2xsZXJfcm93LnJvd1tleGNlbF9yb3dfdG9faW5kZXgodGhpcy51c2VkX3RvZGF5X2NvbHVtbildO1xuICAgICAgICBjb25zdCBjdXJyZW50X3NlYXNvbl91c2VkX3Bhc3NlcyA9XG4gICAgICAgICAgICBwYXRyb2xsZXJfcm93LnJvd1tleGNlbF9yb3dfdG9faW5kZXgodGhpcy51c2VkX3NlYXNvbl9jb2x1bW4pXTtcbiAgICAgICAgcmV0dXJuIG5ldyBVc2VkQW5kQXZhaWxhYmxlUGFzc2VzKFxuICAgICAgICAgICAgcGF0cm9sbGVyX3Jvdy5yb3csXG4gICAgICAgICAgICBwYXRyb2xsZXJfcm93LmluZGV4LFxuICAgICAgICAgICAgY3VycmVudF9kYXlfYXZhaWxhYmxlX3Bhc3NlcyxcbiAgICAgICAgICAgIGN1cnJlbnRfZGF5X3VzZWRfcGFzc2VzLFxuICAgICAgICAgICAgY3VycmVudF9zZWFzb25fdXNlZF9wYXNzZXNcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBhc3luYyBzZXRfdXNlZF9ndWVzdF9wYXNzZXMoXG4gICAgICAgIHBhdHJvbGxlcl9yb3c6IFVzZWRBbmRBdmFpbGFibGVQYXNzZXMsXG4gICAgKSB7XG4gICAgICAgIGlmIChwYXRyb2xsZXJfcm93LmF2YWlsYWJsZSA8IDEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICBgTm90IGVub3VnaCBhdmFpbGFibGUgcGFzc2VzOiBBdmFpbGFibGU6ICR7cGF0cm9sbGVyX3Jvdy5hdmFpbGFibGV9LCBVc2VkIHRoaXMgc2Vhc29uOiAgJHtwYXRyb2xsZXJfcm93LnVzZWRfc2Vhc29ufSwgVXNlZCB0b2RheTogJHtwYXRyb2xsZXJfcm93LnVzZWRfdG9kYXl9YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJvd251bSA9IHBhdHJvbGxlcl9yb3cuaW5kZXg7XG4gICAgICAgIGNvbnN0IHN0YXJ0X2luZGV4ID0gdGhpcy5zdGFydF9pbmRleDtcbiAgICAgICAgY29uc3QgcHJpb3JfbGVuZ3RoID0gcGF0cm9sbGVyX3Jvdy5yb3cubGVuZ3RoIC0gc3RhcnRfaW5kZXg7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfZGF0ZV9zdHJpbmcgPSBmb3JtYXRfZGF0ZV9mb3Jfc3ByZWFkc2hlZXRfdmFsdWUobmV3IERhdGUoKSk7XG5cbiAgICAgICAgY29uc3QgbmV3X3ZhbHMgPSBwYXRyb2xsZXJfcm93LnJvd1xuICAgICAgICAgICAgLnNsaWNlKHN0YXJ0X2luZGV4KVxuICAgICAgICAgICAgLm1hcCgoeCkgPT4geD8udG9TdHJpbmcoKSk7XG5cbiAgICAgICAgLy8gUmVjb3JkIG9ubHkgdGhlIGRhdGUgb2YgdGhlIHVzZTsgbm8gZ3Vlc3QgbmFtZSBpcyBzdG9yZWQuXG4gICAgICAgIG5ld192YWxzLnB1c2goY3VycmVudF9kYXRlX3N0cmluZyk7XG5cbiAgICAgICAgY29uc3QgdXBkYXRlX2xlbmd0aCA9IE1hdGgubWF4KHByaW9yX2xlbmd0aCwgbmV3X3ZhbHMubGVuZ3RoKTtcbiAgICAgICAgd2hpbGUgKG5ld192YWxzLmxlbmd0aCA8IHVwZGF0ZV9sZW5ndGgpIHtcbiAgICAgICAgICAgIG5ld192YWxzLnB1c2goXCJcIik7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBlbmRfaW5kZXggPSBzdGFydF9pbmRleCArIHVwZGF0ZV9sZW5ndGggLSAxO1xuICAgICAgICBjb25zdCByYW5nZSA9IGAke3RoaXMuc2hlZXQuc2hlZXRfbmFtZX0hJHtyb3dfY29sX3RvX2V4Y2VsX2luZGV4KFxuICAgICAgICAgICAgcm93bnVtLFxuICAgICAgICAgICAgc3RhcnRfaW5kZXhcbiAgICAgICAgKX06JHtyb3dfY29sX3RvX2V4Y2VsX2luZGV4KHJvd251bSwgZW5kX2luZGV4KX1gO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGBVcGRhdGluZyAke3JhbmdlfSB3aXRoICR7bmV3X3ZhbHMubGVuZ3RofSB2YWx1ZXNgKTtcbiAgICAgICAgYXdhaXQgdGhpcy5zaGVldC51cGRhdGVfdmFsdWVzKHJhbmdlLCBbbmV3X3ZhbHNdKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBHdWVzdFBhc3NTaGVldCBleHRlbmRzIFBhc3NTaGVldCB7XG4gICAgY29uZmlnOiBHdWVzdFBhc3Nlc0NvbmZpZztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyB8IG51bGwsXG4gICAgICAgIGNvbmZpZzogR3Vlc3RQYXNzZXNDb25maWdcbiAgICApIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBuZXcgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIoXG4gICAgICAgICAgICAgICAgc2hlZXRzX3NlcnZpY2UsXG4gICAgICAgICAgICAgICAgY29uZmlnLlNIRUVUX0lELFxuICAgICAgICAgICAgICAgIGNvbmZpZy5HVUVTVF9QQVNTX1NIRUVUXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgIH1cblxuICAgIGdldCBzdGFydF9pbmRleCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gZXhjZWxfcm93X3RvX2luZGV4KFxuICAgICAgICAgICAgdGhpcy5jb25maWcuR1VFU1RfUEFTU19TSEVFVF9EQVRFU19TVEFSVElOR19DT0xVTU5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXQgc2hlZXRfbmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuR1VFU1RfUEFTU19TSEVFVDtcbiAgICB9XG5cbiAgICBnZXQgYXZhaWxhYmxlX2NvbHVtbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuR1VFU1RfUEFTU19TSEVFVF9EQVRFU19BVkFJTEFCTEVfQ09MVU1OO1xuICAgIH1cblxuICAgIGdldCB1c2VkX3RvZGF5X2NvbHVtbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuR1VFU1RfUEFTU19TSEVFVF9VU0VEX1RPREFZX0NPTFVNTjtcbiAgICB9XG5cbiAgICBnZXQgdXNlZF9zZWFzb25fY29sdW1uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5HVUVTVF9QQVNTX1NIRUVUX1VTRURfU0VBU09OX0NPTFVNTjtcbiAgICB9XG5cbiAgICBnZXQgbmFtZV9jb2x1bW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLkdVRVNUX1BBU1NfU0hFRVRfTkFNRV9DT0xVTU47XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQsIGV4Y2VsX3Jvd190b19pbmRleCB9IGZyb20gXCIuLi91dGlscy91dGlsXCI7XG5pbXBvcnQgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIgZnJvbSBcIi4uL3V0aWxzL2dvb2dsZV9zaGVldHNfc3ByZWFkc2hlZXRfdGFiXCI7XG5pbXBvcnQgeyBzYW5pdGl6ZV9kYXRlIH0gZnJvbSBcIi4uL3V0aWxzL2RhdGV0aW1lX3V0aWxcIjtcbmltcG9ydCB7IExvZ2luU2hlZXRDb25maWcsIFBhdHJvbGxlclJvd0NvbmZpZyB9IGZyb20gXCIuLi9lbnYvaGFuZGxlcl9jb25maWdcIjtcbmltcG9ydCB7IHNoZWV0c192NCB9IGZyb20gXCJnb29nbGVhcGlzXCI7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHJvdyBvZiBwYXRyb2xsZXIgZGF0YS5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IFBhdHJvbGxlclJvd1xuICogQHByb3BlcnR5IHtudW1iZXJ9IGluZGV4IC0gVGhlIGluZGV4IG9mIHRoZSByb3cuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwYXRyb2xsZXIuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gY2F0ZWdvcnkgLSBUaGUgY2F0ZWdvcnkgb2YgdGhlIHBhdHJvbGxlci5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBzZWN0aW9uIC0gVGhlIHNlY3Rpb24gb2YgdGhlIHBhdHJvbGxlci5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBjaGVja2luIC0gVGhlIGNoZWNrLWluIHN0YXR1cyBvZiB0aGUgcGF0cm9sbGVyLlxuICovXG5leHBvcnQgdHlwZSBQYXRyb2xsZXJSb3cgPSB7XG4gICAgaW5kZXg6IG51bWJlcjtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgY2F0ZWdvcnk6IHN0cmluZztcbiAgICBzZWN0aW9uOiBzdHJpbmc7XG4gICAgY2hlY2tpbjogc3RyaW5nO1xufTtcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBsb2dpbiBzaGVldCBpbiBHb29nbGUgU2hlZXRzLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dpblNoZWV0IHtcbiAgICBsb2dpbl9zaGVldDogR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWI7XG4gICAgY2hlY2tpbl9jb3VudF9zaGVldDogR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWI7XG4gICAgY29uZmlnOiBMb2dpblNoZWV0Q29uZmlnO1xuICAgIHJvd3M/OiBhbnlbXVtdIHwgbnVsbCA9IG51bGw7XG4gICAgY2hlY2tpbl9jb3VudDogbnVtYmVyIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgIHBhdHJvbGxlcnM6IFBhdHJvbGxlclJvd1tdID0gW107XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIExvZ2luU2hlZXQuXG4gICAgICogQHBhcmFtIHtzaGVldHNfdjQuU2hlZXRzIHwgbnVsbH0gc2hlZXRzX3NlcnZpY2UgLSBUaGUgR29vZ2xlIFNoZWV0cyBBUEkgc2VydmljZS5cbiAgICAgKiBAcGFyYW0ge0xvZ2luU2hlZXRDb25maWd9IGNvbmZpZyAtIFRoZSBjb25maWd1cmF0aW9uIGZvciB0aGUgbG9naW4gc2hlZXQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzIHwgbnVsbCxcbiAgICAgICAgY29uZmlnOiBMb2dpblNoZWV0Q29uZmlnXG4gICAgKSB7XG4gICAgICAgIHRoaXMubG9naW5fc2hlZXQgPSBuZXcgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIoXG4gICAgICAgICAgICBzaGVldHNfc2VydmljZSxcbiAgICAgICAgICAgIGNvbmZpZy5TSEVFVF9JRCxcbiAgICAgICAgICAgIGNvbmZpZy5MT0dJTl9TSEVFVF9MT09LVVBcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jaGVja2luX2NvdW50X3NoZWV0ID0gbmV3IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiKFxuICAgICAgICAgICAgc2hlZXRzX3NlcnZpY2UsXG4gICAgICAgICAgICBjb25maWcuU0hFRVRfSUQsXG4gICAgICAgICAgICBjb25maWcuQ0hFQ0tJTl9DT1VOVF9MT09LVVBcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVmcmVzaGVzIHRoZSBkYXRhIGZyb20gdGhlIEdvb2dsZSBTaGVldHMuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAgICovXG4gICAgYXN5bmMgcmVmcmVzaCgpIHtcbiAgICAgICAgdGhpcy5yb3dzID0gYXdhaXQgdGhpcy5sb2dpbl9zaGVldC5nZXRfdmFsdWVzKFxuICAgICAgICAgICAgdGhpcy5jb25maWcuTE9HSU5fU0hFRVRfTE9PS1VQXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY2hlY2tpbl9jb3VudCA9IChhd2FpdCB0aGlzLmNoZWNraW5fY291bnRfc2hlZXQuZ2V0X3ZhbHVlcyhcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLkNIRUNLSU5fQ09VTlRfTE9PS1VQXG4gICAgICAgICkpIVswXVswXTtcbiAgICAgICAgdGhpcy5wYXRyb2xsZXJzID0gdGhpcy5yb3dzIS5tYXAoKHgsIGkpID0+XG4gICAgICAgICAgICB0aGlzLnBhcnNlX3BhdHJvbGxlcl9yb3coaSwgeCwgdGhpcy5jb25maWcpXG4gICAgICAgICkuZmlsdGVyKCh4KSA9PiB4ICE9IG51bGwpIGFzIFBhdHJvbGxlclJvd1tdO1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiUmVmcmVzaGluZyBQYXRyb2xsZXJzOiBcIiApO1xuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMucGF0cm9sbGVycyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgYXJjaGl2ZWQgc3RhdHVzIG9mIHRoZSBsb2dpbiBzaGVldC5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc2hlZXQgaXMgYXJjaGl2ZWQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKi9cbiAgICBnZXQgYXJjaGl2ZWQoKSB7XG4gICAgICAgIGNvbnN0IGFyY2hpdmVkID0gbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQoXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5BUkNISVZFRF9DRUxMLFxuICAgICAgICAgICAgdGhpcy5yb3dzIVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgKGFyY2hpdmVkID09PSB1bmRlZmluZWQgJiYgdGhpcy5jaGVja2luX2NvdW50ID09PSAwKSB8fFxuICAgICAgICAgICAgYXJjaGl2ZWQudG9Mb3dlckNhc2UoKSA9PT0gXCJ5ZXNcIlxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGRhdGUgb2YgdGhlIHNoZWV0LlxuICAgICAqIEByZXR1cm5zIHtEYXRlfSBUaGUgZGF0ZSBvZiB0aGUgc2hlZXQuXG4gICAgICovXG4gICAgZ2V0IHNoZWV0X2RhdGUoKSB7XG4gICAgICAgIHJldHVybiBzYW5pdGl6ZV9kYXRlKFxuICAgICAgICAgICAgbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQodGhpcy5jb25maWcuU0hFRVRfREFURV9DRUxMLCB0aGlzLnJvd3MhKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGN1cnJlbnQgZGF0ZS5cbiAgICAgKiBAcmV0dXJucyB7RGF0ZX0gVGhlIGN1cnJlbnQgZGF0ZS5cbiAgICAgKi9cbiAgICBnZXQgY3VycmVudF9kYXRlKCkge1xuICAgICAgICByZXR1cm4gc2FuaXRpemVfZGF0ZShcbiAgICAgICAgICAgIGxvb2t1cF9yb3dfY29sX2luX3NoZWV0KHRoaXMuY29uZmlnLkNVUlJFTlRfREFURV9DRUxMLCB0aGlzLnJvd3MhKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGUgc2hlZXQgZGF0ZSBpcyB0aGUgY3VycmVudCBkYXRlLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzaGVldCBkYXRlIGlzIHRoZSBjdXJyZW50IGRhdGUsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKi9cbiAgICBnZXQgaXNfY3VycmVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hlZXRfZGF0ZS5nZXRUaW1lKCkgPT09IHRoaXMuY3VycmVudF9kYXRlLmdldFRpbWUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmllcyB0byBmaW5kIGEgcGF0cm9sbGVyIGJ5IG5hbWUuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcGF0cm9sbGVyLlxuICAgICAqIEByZXR1cm5zIHtQYXRyb2xsZXJSb3cgfCBcIm5vdF9mb3VuZFwifSBUaGUgcGF0cm9sbGVyIHJvdyBvciBcIm5vdF9mb3VuZFwiLlxuICAgICAqL1xuICAgIHRyeV9maW5kX3BhdHJvbGxlcihuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgcGF0cm9sbGVycyA9IHRoaXMucGF0cm9sbGVycy5maWx0ZXIoKHgpID0+IHgubmFtZSA9PT0gbmFtZSk7XG4gICAgICAgIGlmIChwYXRyb2xsZXJzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIFwibm90X2ZvdW5kXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhdHJvbGxlcnNbMF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmluZHMgYSBwYXRyb2xsZXIgYnkgbmFtZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwYXRyb2xsZXIuXG4gICAgICogQHJldHVybnMge1BhdHJvbGxlclJvd30gVGhlIHBhdHJvbGxlciByb3cuXG4gICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXRyb2xsZXIgaXMgbm90IGZvdW5kLlxuICAgICAqL1xuICAgIGZpbmRfcGF0cm9sbGVyKG5hbWU6IHN0cmluZykge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLnRyeV9maW5kX3BhdHJvbGxlcihuYW1lKTtcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gXCJub3RfZm91bmRcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZmluZCAke25hbWV9IGluIGxvZ2luIHNoZWV0YCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwYXRyb2xsZXJzIHdobyBhcmUgb24gZHV0eS5cbiAgICAgKiBAcmV0dXJucyB7UGF0cm9sbGVyUm93W119IFRoZSBsaXN0IG9mIG9uLWR1dHkgcGF0cm9sbGVycy5cbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIGxvZ2luIHNoZWV0IGlzIG5vdCBjdXJyZW50LlxuICAgICAqL1xuICAgIGdldF9vbl9kdXR5X3BhdHJvbGxlcnMoKTogUGF0cm9sbGVyUm93W10ge1xuICAgICAgICBpZiAoIXRoaXMuaXNfY3VycmVudCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTG9naW4gc2hlZXQgaXMgbm90IGN1cnJlbnRcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucGF0cm9sbGVycy5maWx0ZXIoKHgpID0+IHguY2hlY2tpbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGluIGEgcGF0cm9sbGVyIHdpdGggYSBuZXcgY2hlY2staW4gdmFsdWUuXG4gICAgICogQHBhcmFtIHtQYXRyb2xsZXJSb3d9IHBhdHJvbGxlcl9zdGF0dXMgLSBUaGUgc3RhdHVzIG9mIHRoZSBwYXRyb2xsZXIuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5ld19jaGVja2luX3ZhbHVlIC0gVGhlIG5ldyBjaGVjay1pbiB2YWx1ZS5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIGxvZ2luIHNoZWV0IGlzIG5vdCBjdXJyZW50LlxuICAgICAqL1xuICAgIGFzeW5jIGNoZWNraW4ocGF0cm9sbGVyX3N0YXR1czogUGF0cm9sbGVyUm93LCBuZXdfY2hlY2tpbl92YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICghdGhpcy5pc19jdXJyZW50KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJMb2dpbiBzaGVldCBpcyBub3QgY3VycmVudFwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhgRXhpc3Rpbmcgc3RhdHVzOiAke0pTT04uc3RyaW5naWZ5KHBhdHJvbGxlcl9zdGF0dXMpfWApO1xuXG4gICAgICAgIGNvbnN0IHJvdyA9IHBhdHJvbGxlcl9zdGF0dXMuaW5kZXggKyAxOyAvLyBwcm9ncmFtbWluZyAtPiBleGNlbCBsb29rdXBcbiAgICAgICAgY29uc3QgcmFuZ2UgPSBgJHt0aGlzLmNvbmZpZy5DSEVDS0lOX0RST1BET1dOX0NPTFVNTn0ke3Jvd31gO1xuXG4gICAgICAgIGF3YWl0IHRoaXMubG9naW5fc2hlZXQudXBkYXRlX3ZhbHVlcyhyYW5nZSwgW1tuZXdfY2hlY2tpbl92YWx1ZV1dKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIEFzc2lnbnMgYSBzZWN0aW9uIHRvIGEgcGF0cm9sbGVyLlxuICAgICogQHBhcmFtIHtQYXRyb2xsZXJSb3d9IHBhdHJvbGxlciAtIFRoZSBwYXRyb2xsZXIgdG8gYXNzaWduIHRoZSBzZWN0aW9uIHRvLlxuICAgICogQHBhcmFtIHtzdHJpbmd9IG5ld19zZWN0aW9uX3ZhbHVlIC0gVGhlIG5ldyBzZWN0aW9uIHZhbHVlLlxuICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIGxvZ2luIHNoZWV0IGlzIG5vdCBjdXJyZW50LlxuICAgICovXG4gICAgYXN5bmMgYXNzaWduX3NlY3Rpb24ocGF0cm9sbGVyX3NlY3Rpb246IFBhdHJvbGxlclJvdywgbmV3X3NlY3Rpb25fdmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAoIXRoaXMuaXNfY3VycmVudCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTG9naW4gc2hlZXQgaXMgbm90IGN1cnJlbnRcIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coYEV4aXN0aW5nIHN0YXR1czogJHtKU09OLnN0cmluZ2lmeShwYXRyb2xsZXJfc2VjdGlvbil9YCk7XG5cbiAgICAgICAgY29uc3Qgcm93ID0gcGF0cm9sbGVyX3NlY3Rpb24uaW5kZXggKyAxOyAvLyBwcm9ncmFtbWluZyAtPiBleGNlbCBsb29rdXBcbiAgICAgICAgY29uc3QgcmFuZ2UgPSBgJHt0aGlzLmNvbmZpZy5TRUNUSU9OX0RST1BET1dOX0NPTFVNTn0ke3Jvd31gO1xuXG4gICAgICAgIGF3YWl0IHRoaXMubG9naW5fc2hlZXQudXBkYXRlX3ZhbHVlcyhyYW5nZSwgW1tuZXdfc2VjdGlvbl92YWx1ZV1dKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZXMgYSByb3cgb2YgcGF0cm9sbGVyIGRhdGEuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gVGhlIGluZGV4IG9mIHRoZSByb3cuXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gcm93IC0gVGhlIHJvdyBkYXRhLlxuICAgICAqIEBwYXJhbSB7UGF0cm9sbGVyUm93Q29uZmlnfSBvcHRzIC0gVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyBmb3IgdGhlIHBhdHJvbGxlciByb3cuXG4gICAgICogQHJldHVybnMge1BhdHJvbGxlclJvdyB8IG51bGx9IFRoZSBwYXJzZWQgcGF0cm9sbGVyIHJvdyBvciBudWxsIGlmIGludmFsaWQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBwYXJzZV9wYXRyb2xsZXJfcm93KFxuICAgICAgICBpbmRleDogbnVtYmVyLFxuICAgICAgICByb3c6IHN0cmluZ1tdLFxuICAgICAgICBvcHRzOiBQYXRyb2xsZXJSb3dDb25maWdcbiAgICApOiBQYXRyb2xsZXJSb3cgfCBudWxsIHtcbiAgICAgICAgaWYgKHJvdy5sZW5ndGggPCA0KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXggPCAzKXtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICBuYW1lOiByb3dbZXhjZWxfcm93X3RvX2luZGV4KG9wdHMuTkFNRV9DT0xVTU4pXSxcbiAgICAgICAgICAgIGNhdGVnb3J5OiByb3dbZXhjZWxfcm93X3RvX2luZGV4KG9wdHMuQ0FURUdPUllfQ09MVU1OKV0sXG4gICAgICAgICAgICBzZWN0aW9uOiByb3dbZXhjZWxfcm93X3RvX2luZGV4KG9wdHMuU0VDVElPTl9EUk9QRE9XTl9DT0xVTU4pXSxcbiAgICAgICAgICAgIGNoZWNraW46IHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5DSEVDS0lOX0RST1BET1dOX0NPTFVNTildLFxuICAgICAgICB9O1xuICAgIH1cbn0iLCJpbXBvcnQgeyBzaGVldHNfdjQgfSBmcm9tIFwiZ29vZ2xlYXBpc1wiO1xuaW1wb3J0IHtcbiAgICBTZWFzb25TaGVldENvbmZpZyxcbn0gZnJvbSBcIi4uL2Vudi9oYW5kbGVyX2NvbmZpZ1wiO1xuaW1wb3J0IHsgZXhjZWxfcm93X3RvX2luZGV4IH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxcIjtcbmltcG9ydCBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYiBmcm9tIFwiLi4vdXRpbHMvZ29vZ2xlX3NoZWV0c19zcHJlYWRzaGVldF90YWJcIjtcbmltcG9ydCB7IGZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2N1cnJlbnRfZGF5IH0gZnJvbSBcIi4uL3V0aWxzL2RhdGV0aW1lX3V0aWxcIjtcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBzZWFzb24gc2hlZXQgaW4gR29vZ2xlIFNoZWV0cy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2Vhc29uU2hlZXQge1xuICAgIHNoZWV0OiBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYjtcbiAgICBjb25maWc6IFNlYXNvblNoZWV0Q29uZmlnO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBTZWFzb25TaGVldC5cbiAgICAgKiBAcGFyYW0ge3NoZWV0c192NC5TaGVldHMgfCBudWxsfSBzaGVldHNfc2VydmljZSAtIFRoZSBHb29nbGUgU2hlZXRzIEFQSSBzZXJ2aWNlLlxuICAgICAqIEBwYXJhbSB7U2Vhc29uU2hlZXRDb25maWd9IGNvbmZpZyAtIFRoZSBjb25maWd1cmF0aW9uIGZvciB0aGUgc2Vhc29uIHNoZWV0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyB8IG51bGwsXG4gICAgICAgIGNvbmZpZzogU2Vhc29uU2hlZXRDb25maWdcbiAgICApIHtcbiAgICAgICAgdGhpcy5zaGVldCA9IG5ldyBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYihcbiAgICAgICAgICAgIHNoZWV0c19zZXJ2aWNlLFxuICAgICAgICAgICAgY29uZmlnLlNIRUVUX0lELFxuICAgICAgICAgICAgY29uZmlnLlNFQVNPTl9TSEVFVFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBudW1iZXIgb2YgZGF5cyBwYXRyb2xsZWQgYnkgYSBwYXRyb2xsZXIuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdHJvbGxlcl9uYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHBhdHJvbGxlci5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxudW1iZXI+fSBUaGUgbnVtYmVyIG9mIGRheXMgcGF0cm9sbGVkLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF9wYXRyb2xsZWRfZGF5cyhcbiAgICAgICAgcGF0cm9sbGVyX25hbWU6IHN0cmluZ1xuICAgICk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgICAgIGNvbnN0IHBhdHJvbGxlcl9yb3cgPSBhd2FpdCB0aGlzLnNoZWV0LmdldF9zaGVldF9yb3dfZm9yX3BhdHJvbGxlcihcbiAgICAgICAgICAgIHBhdHJvbGxlcl9uYW1lLFxuICAgICAgICAgICAgdGhpcy5jb25maWcuU0VBU09OX1NIRUVUX05BTUVfQ09MVU1OXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKCFwYXRyb2xsZXJfcm93KSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjdXJyZW50TnVtYmVyID1cbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cucm93W2V4Y2VsX3Jvd190b19pbmRleCh0aGlzLmNvbmZpZy5TRUFTT05fU0hFRVRfREFZU19DT0xVTU4pXTtcblxuICAgICAgICBjb25zdCBjdXJyZW50RGF5ID0gZmlsdGVyX2xpc3RfdG9fZW5kc3dpdGhfY3VycmVudF9kYXkocGF0cm9sbGVyX3Jvdy5yb3cpXG4gICAgICAgICAgICAubWFwKCh4KSA9PiAoeD8uc3RhcnRzV2l0aChcIkhcIikgPyAwLjUgOiAxKSlcbiAgICAgICAgICAgIC5yZWR1Y2UoKHgsIHksIGkpID0+IHggKyB5LCAwKTtcblxuICAgICAgICBjb25zdCBkYXlzQmVmb3JlVG9kYXkgPSBjdXJyZW50TnVtYmVyIC0gY3VycmVudERheTtcbiAgICAgICAgcmV0dXJuIGRheXNCZWZvcmVUb2RheTtcbiAgICB9XG59IiwiaW1wb3J0IHsgZ29vZ2xlIH0gZnJvbSBcImdvb2dsZWFwaXNcIjtcbmltcG9ydCB7IEdlbmVyYXRlQXV0aFVybE9wdHMgfSBmcm9tIFwiZ29vZ2xlLWF1dGgtbGlicmFyeVwiO1xuaW1wb3J0IHsgT0F1dGgyQ2xpZW50IH0gZnJvbSBcImdvb2dsZWFwaXMtY29tbW9uXCI7XG5pbXBvcnQgeyBzYW5pdGl6ZV9waG9uZV9udW1iZXIgfSBmcm9tIFwiLi91dGlscy91dGlsXCI7XG5pbXBvcnQgeyBsb2FkX2NyZWRlbnRpYWxzX2ZpbGVzIH0gZnJvbSBcIi4vdXRpbHMvZmlsZV91dGlsc1wiO1xuaW1wb3J0IHsgU2VydmljZUNvbnRleHQgfSBmcm9tIFwiQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlcy90eXBlc1wiO1xuaW1wb3J0IHsgVXNlckNyZWRzQ29uZmlnIH0gZnJvbSBcIi4vZW52L2hhbmRsZXJfY29uZmlnXCI7XG5pbXBvcnQgeyB2YWxpZGF0ZV9zY29wZXMgfSBmcm9tIFwiLi91dGlscy9zY29wZV91dGlsXCI7XG5cbmNvbnN0IFNDT1BFUyA9IFtcbiAgICBcImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvc2NyaXB0LnByb2plY3RzXCIsXG4gICAgXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3NwcmVhZHNoZWV0c1wiLFxuXTtcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgdXNlciBjcmVkZW50aWFscyBmb3IgR29vZ2xlIE9BdXRoMi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckNyZWRzIHtcbiAgICBudW1iZXI6IHN0cmluZztcbiAgICBvYXV0aDJfY2xpZW50OiBPQXV0aDJDbGllbnQ7XG4gICAgc3luY19jbGllbnQ6IFNlcnZpY2VDb250ZXh0O1xuICAgIGRvbWFpbj86IHN0cmluZztcbiAgICBsb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIFVzZXJDcmVkcyBpbnN0YW5jZS5cbiAgICAgKiBAcGFyYW0ge1NlcnZpY2VDb250ZXh0fSBzeW5jX2NsaWVudCAtIFRoZSBUd2lsaW8gU3luYyBjbGllbnQuXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCB1bmRlZmluZWR9IG51bWJlciAtIFRoZSB1c2VyJ3MgcGhvbmUgbnVtYmVyLlxuICAgICAqIEBwYXJhbSB7VXNlckNyZWRzQ29uZmlnfSBvcHRzIC0gVGhlIHVzZXIgY3JlZGVudGlhbHMgY29uZmlndXJhdGlvbi5cbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gVGhyb3dzIGFuIGVycm9yIGlmIHRoZSBudW1iZXIgaXMgdW5kZWZpbmVkIG9yIG51bGwuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHN5bmNfY2xpZW50OiBTZXJ2aWNlQ29udGV4dCxcbiAgICAgICAgbnVtYmVyOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgICAgIG9wdHM6IFVzZXJDcmVkc0NvbmZpZ1xuICAgICkge1xuICAgICAgICBpZiAobnVtYmVyID09PSB1bmRlZmluZWQgfHwgbnVtYmVyID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOdW1iZXIgaXMgdW5kZWZpbmVkXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubnVtYmVyID0gc2FuaXRpemVfcGhvbmVfbnVtYmVyKG51bWJlcik7XG5cbiAgICAgICAgY29uc3QgY3JlZGVudGlhbHMgPSBsb2FkX2NyZWRlbnRpYWxzX2ZpbGVzKCk7XG4gICAgICAgIGNvbnN0IHsgY2xpZW50X3NlY3JldCwgY2xpZW50X2lkLCByZWRpcmVjdF91cmlzIH0gPSBjcmVkZW50aWFscy53ZWI7XG4gICAgICAgIHRoaXMub2F1dGgyX2NsaWVudCA9IG5ldyBnb29nbGUuYXV0aC5PQXV0aDIoXG4gICAgICAgICAgICBjbGllbnRfaWQsXG4gICAgICAgICAgICBjbGllbnRfc2VjcmV0LFxuICAgICAgICAgICAgcmVkaXJlY3RfdXJpc1swXVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN5bmNfY2xpZW50ID0gc3luY19jbGllbnQ7XG4gICAgICAgIGxldCBkb21haW4gPSBvcHRzLk5TUF9FTUFJTF9ET01BSU47XG4gICAgICAgIGlmIChkb21haW4gPT09IHVuZGVmaW5lZCB8fCBkb21haW4gPT09IG51bGwgfHwgZG9tYWluID09PSBcIlwiKSB7XG4gICAgICAgICAgICBkb21haW4gPSB1bmRlZmluZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRvbWFpbiA9IGRvbWFpbjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvYWQgdGhlIE9BdXRoMiB0b2tlbi5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBib29sZWFuIGluZGljYXRpbmcgaWYgdGhlIHRva2VuIHdhcyBsb2FkZWQuXG4gICAgICovXG4gICAgYXN5bmMgbG9hZFRva2VuKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICBpZiAoIXRoaXMubG9hZGVkKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBMb29raW5nIGZvciAke3RoaXMudG9rZW5fa2V5fWApO1xuICAgICAgICAgICAgICAgIGNvbnN0IG9hdXRoMkRvYyA9IGF3YWl0IHRoaXMuc3luY19jbGllbnRcbiAgICAgICAgICAgICAgICAgICAgLmRvY3VtZW50cyh0aGlzLnRva2VuX2tleSlcbiAgICAgICAgICAgICAgICAgICAgLmZldGNoKCk7XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICBvYXV0aDJEb2MgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgICAgICBvYXV0aDJEb2MuZGF0YSA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICAgICAgb2F1dGgyRG9jLmRhdGEudG9rZW4gPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgRGlkbid0IGZpbmQgJHt0aGlzLnRva2VuX2tleX1gKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0b2tlbiA9IG9hdXRoMkRvYy5kYXRhLnRva2VuO1xuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZV9zY29wZXMob2F1dGgyRG9jLmRhdGEuc2NvcGVzLCBTQ09QRVMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9hdXRoMl9jbGllbnQuc2V0Q3JlZGVudGlhbHModG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgTG9hZGVkIHRva2VuICR7dGhpcy50b2tlbl9rZXl9YCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgICAgIGBGYWlsZWQgdG8gbG9hZCB0b2tlbiBmb3IgJHt0aGlzLnRva2VuX2tleX0uXFxuICR7ZX1gXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5sb2FkZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB0b2tlbiBrZXkuXG4gICAgICogQHJldHVybnMge3N0cmluZ30gVGhlIHRva2VuIGtleS5cbiAgICAgKi9cbiAgICBnZXQgdG9rZW5fa2V5KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgb2F1dGgyXyR7dGhpcy5udW1iZXJ9YDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWxldGUgdGhlIE9BdXRoMiB0b2tlbi5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBib29sZWFuIGluZGljYXRpbmcgaWYgdGhlIHRva2VuIHdhcyBkZWxldGVkLlxuICAgICAqL1xuICAgIGFzeW5jIGRlbGV0ZVRva2VuKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICBjb25zdCBvYXV0aDJEb2MgPSBhd2FpdCB0aGlzLnN5bmNfY2xpZW50XG4gICAgICAgICAgICAuZG9jdW1lbnRzKHRoaXMudG9rZW5fa2V5KVxuICAgICAgICAgICAgLmZldGNoKCk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIG9hdXRoMkRvYyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICBvYXV0aDJEb2MuZGF0YSA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIG9hdXRoMkRvYy5kYXRhLnRva2VuID09PSB1bmRlZmluZWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgRGlkbid0IGZpbmQgJHt0aGlzLnRva2VuX2tleX1gKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLnN5bmNfY2xpZW50LmRvY3VtZW50cyhvYXV0aDJEb2Muc2lkKS5yZW1vdmUoKTtcbiAgICAgICAgY29uc29sZS5sb2coYERlbGV0ZWQgdG9rZW4gJHt0aGlzLnRva2VuX2tleX1gKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29tcGxldGUgdGhlIGxvZ2luIHByb2Nlc3MgYnkgZXhjaGFuZ2luZyB0aGUgYXV0aG9yaXphdGlvbiBjb2RlIGZvciBhIHRva2VuLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb2RlIC0gVGhlIGF1dGhvcml6YXRpb24gY29kZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBzY29wZXMgLSBUaGUgc2NvcGVzIHRvIHZhbGlkYXRlLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBsb2dpbiBwcm9jZXNzIGlzIGNvbXBsZXRlLlxuICAgICAqL1xuICAgIGFzeW5jIGNvbXBsZXRlTG9naW4oY29kZTogc3RyaW5nLCBzY29wZXM6IHN0cmluZ1tdKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHZhbGlkYXRlX3Njb3BlcyhzY29wZXMsIFNDT1BFUyk7XG4gICAgICAgIGNvbnN0IHRva2VuID0gYXdhaXQgdGhpcy5vYXV0aDJfY2xpZW50LmdldFRva2VuKGNvZGUpO1xuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShPYmplY3Qua2V5cyh0b2tlbi5yZXMhKSkpO1xuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0b2tlbi50b2tlbnMpKTtcbiAgICAgICAgdGhpcy5vYXV0aDJfY2xpZW50LnNldENyZWRlbnRpYWxzKHRva2VuLnRva2Vucyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBvYXV0aERvYyA9IGF3YWl0IHRoaXMuc3luY19jbGllbnQuZG9jdW1lbnRzLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgZGF0YTogeyB0b2tlbjogdG9rZW4udG9rZW5zLCBzY29wZXM6IHNjb3BlcyB9LFxuICAgICAgICAgICAgICAgIHVuaXF1ZU5hbWU6IHRoaXMudG9rZW5fa2V5LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgIGBFeGNlcHRpb24gd2hlbiBjcmVhdGluZyBvYXV0aC4gVHJ5aW5nIHRvIHVwZGF0ZSBpbnN0ZWFkLi4uXFxuJHtlfWBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCBvYXV0aERvYyA9IGF3YWl0IHRoaXMuc3luY19jbGllbnRcbiAgICAgICAgICAgICAgICAuZG9jdW1lbnRzKHRoaXMudG9rZW5fa2V5KVxuICAgICAgICAgICAgICAgIC51cGRhdGUoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7IHRva2VuOiB0b2tlbiwgc2NvcGVzOiBzY29wZXMgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgYXV0aG9yaXphdGlvbiBVUkwuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c3RyaW5nPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIGF1dGhvcml6YXRpb24gVVJMLlxuICAgICAqL1xuICAgIGFzeW5jIGdldEF1dGhVcmwoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgY29uc3QgaWQgPSB0aGlzLmdlbmVyYXRlUmFuZG9tU3RyaW5nKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBVc2luZyBub25jZSAke2lkfSBmb3IgJHt0aGlzLm51bWJlcn1gKTtcbiAgICAgICAgY29uc3QgZG9jID0gYXdhaXQgdGhpcy5zeW5jX2NsaWVudC5kb2N1bWVudHMuY3JlYXRlKHtcbiAgICAgICAgICAgIGRhdGE6IHsgbnVtYmVyOiB0aGlzLm51bWJlciwgc2NvcGVzOiBTQ09QRVMgfSxcbiAgICAgICAgICAgIHVuaXF1ZU5hbWU6IGlkLFxuICAgICAgICAgICAgdHRsOiA2MCAqIDUsIC8vIDUgbWludXRlc1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2coYE1hZGUgbm9uY2UtZG9jOiAke0pTT04uc3RyaW5naWZ5KGRvYyl9YCk7XG5cbiAgICAgICAgY29uc3Qgb3B0czogR2VuZXJhdGVBdXRoVXJsT3B0cyA9IHtcbiAgICAgICAgICAgIGFjY2Vzc190eXBlOiBcIm9mZmxpbmVcIixcbiAgICAgICAgICAgIHNjb3BlOiBTQ09QRVMsXG4gICAgICAgICAgICBzdGF0ZTogaWQsXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLmRvbWFpbikge1xuICAgICAgICAgICAgb3B0c1tcImhkXCJdID0gdGhpcy5kb21haW47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBhdXRoVXJsID0gdGhpcy5vYXV0aDJfY2xpZW50LmdlbmVyYXRlQXV0aFVybChvcHRzKTtcbiAgICAgICAgcmV0dXJuIGF1dGhVcmw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2VuZXJhdGUgYSByYW5kb20gc3RyaW5nLlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IEEgcmFuZG9tIHN0cmluZy5cbiAgICAgKi9cbiAgICBnZW5lcmF0ZVJhbmRvbVN0cmluZygpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBsZW5ndGggPSAzMDtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFwiXCI7XG4gICAgICAgIGNvbnN0IGNoYXJhY3RlcnMgPVxuICAgICAgICAgICAgXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OVwiO1xuICAgICAgICBjb25zdCBjaGFyYWN0ZXJzTGVuZ3RoID0gY2hhcmFjdGVycy5sZW5ndGg7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSBjaGFyYWN0ZXJzLmNoYXJBdChcbiAgICAgICAgICAgICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFyYWN0ZXJzTGVuZ3RoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cblxuLyoqXG4gKiBJbnRlcmZhY2UgcmVwcmVzZW50aW5nIHRoZSB1c2VyIGNyZWRlbnRpYWxzIGNvbmZpZ3VyYXRpb24uXG4gKi9cbmV4cG9ydCB7IFVzZXJDcmVkcywgU0NPUEVTIGFzIFVzZXJDcmVkc1Njb3BlcyB9O1xuIiwiLyoqXG4gKiBSZXByZXNlbnRzIGEgY2hlY2staW4gdmFsdWUgd2l0aCB2YXJpb3VzIHByb3BlcnRpZXMgYW5kIGxvb2t1cCB2YWx1ZXMuXG4gKi9cbmNsYXNzIENoZWNraW5WYWx1ZSB7XG4gICAga2V5OiBzdHJpbmc7XG4gICAgc2hlZXRzX3ZhbHVlOiBzdHJpbmc7XG4gICAgc21zX2Rlc2M6IHN0cmluZztcbiAgICBmYXN0X2NoZWNraW5zOiBzdHJpbmdbXTtcbiAgICBsb29rdXBfdmFsdWVzOiBTZXQ8c3RyaW5nPjtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQ2hlY2tpblZhbHVlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBUaGUga2V5IGZvciB0aGUgY2hlY2staW4gdmFsdWUuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNoZWV0c192YWx1ZSAtIFRoZSB2YWx1ZSB1c2VkIGluIHNoZWV0cy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc21zX2Rlc2MgLSBUaGUgZGVzY3JpcHRpb24gdXNlZCBpbiBTTVMuXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCBzdHJpbmdbXX0gZmFzdF9jaGVja2lucyAtIFRoZSBmYXN0IGNoZWNrLWluIHZhbHVlcy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAga2V5OiBzdHJpbmcsXG4gICAgICAgIHNoZWV0c192YWx1ZTogc3RyaW5nLFxuICAgICAgICBzbXNfZGVzYzogc3RyaW5nLFxuICAgICAgICBmYXN0X2NoZWNraW5zOiBzdHJpbmcgfCBzdHJpbmdbXVxuICAgICkge1xuICAgICAgICBpZiAoIShmYXN0X2NoZWNraW5zIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICAgICAgICBmYXN0X2NoZWNraW5zID0gW2Zhc3RfY2hlY2tpbnNdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgICAgICB0aGlzLnNoZWV0c192YWx1ZSA9IHNoZWV0c192YWx1ZTtcbiAgICAgICAgdGhpcy5zbXNfZGVzYyA9IHNtc19kZXNjO1xuICAgICAgICB0aGlzLmZhc3RfY2hlY2tpbnMgPSBmYXN0X2NoZWNraW5zLm1hcCgoeCkgPT4geC50cmltKCkudG9Mb3dlckNhc2UoKSk7XG5cbiAgICAgICAgY29uc3Qgc21zX2Rlc2Nfc3BsaXQ6IHN0cmluZ1tdID0gc21zX2Rlc2NcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXHMrLywgXCItXCIpXG4gICAgICAgICAgICAudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgLnNwbGl0KFwiL1wiKTtcbiAgICAgICAgY29uc3QgbG9va3VwX3ZhbHMgPSBbLi4udGhpcy5mYXN0X2NoZWNraW5zLCAuLi5zbXNfZGVzY19zcGxpdF07XG4gICAgICAgIHRoaXMubG9va3VwX3ZhbHVlcyA9IG5ldyBTZXQ8c3RyaW5nPihsb29rdXBfdmFscyk7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBjb2xsZWN0aW9uIG9mIGNoZWNrLWluIHZhbHVlcyB3aXRoIHZhcmlvdXMgbG9va3VwIG1ldGhvZHMuXG4gKi9cbmNsYXNzIENoZWNraW5WYWx1ZXMge1xuICAgIGJ5X2tleTogeyBba2V5OiBzdHJpbmddOiBDaGVja2luVmFsdWUgfSA9IHt9O1xuICAgIGJ5X2x2OiB7IFtrZXk6IHN0cmluZ106IENoZWNraW5WYWx1ZSB9ID0ge307XG4gICAgYnlfZmM6IHsgW2tleTogc3RyaW5nXTogQ2hlY2tpblZhbHVlIH0gPSB7fTtcbiAgICBieV9zaGVldF9zdHJpbmc6IHsgW2tleTogc3RyaW5nXTogQ2hlY2tpblZhbHVlIH0gPSB7fTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQ2hlY2tpblZhbHVlcy5cbiAgICAgKiBAcGFyYW0ge0NoZWNraW5WYWx1ZVtdfSBjaGVja2luVmFsdWVzIC0gVGhlIGFycmF5IG9mIGNoZWNrLWluIHZhbHVlcy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihjaGVja2luVmFsdWVzOiBDaGVja2luVmFsdWVbXSkge1xuICAgICAgICBmb3IgKHZhciBjaGVja2luVmFsdWUgb2YgY2hlY2tpblZhbHVlcykge1xuICAgICAgICAgICAgdGhpcy5ieV9rZXlbY2hlY2tpblZhbHVlLmtleV0gPSBjaGVja2luVmFsdWU7XG4gICAgICAgICAgICB0aGlzLmJ5X3NoZWV0X3N0cmluZ1tjaGVja2luVmFsdWUuc2hlZXRzX3ZhbHVlXSA9IGNoZWNraW5WYWx1ZTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbHYgb2YgY2hlY2tpblZhbHVlLmxvb2t1cF92YWx1ZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ5X2x2W2x2XSA9IGNoZWNraW5WYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3QgZmMgb2YgY2hlY2tpblZhbHVlLmZhc3RfY2hlY2tpbnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ5X2ZjW2ZjXSA9IGNoZWNraW5WYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGVudHJpZXMgb2YgY2hlY2staW4gdmFsdWVzIGJ5IGtleS5cbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFRoZSBlbnRyaWVzIG9mIGNoZWNrLWluIHZhbHVlcy5cbiAgICAgKi9cbiAgICBlbnRyaWVzKCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmVudHJpZXModGhpcy5ieV9rZXkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlcyBhIGZhc3QgY2hlY2staW4gdmFsdWUgZnJvbSB0aGUgZ2l2ZW4gYm9keSBzdHJpbmcuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHkgLSBUaGUgYm9keSBzdHJpbmcgdG8gcGFyc2UuXG4gICAgICogQHJldHVybnMge0NoZWNraW5WYWx1ZSB8IHVuZGVmaW5lZH0gVGhlIHBhcnNlZCBjaGVjay1pbiB2YWx1ZSBvciB1bmRlZmluZWQuXG4gICAgICovXG4gICAgcGFyc2VfZmFzdF9jaGVja2luKGJvZHk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5ieV9mY1tib2R5XTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZXMgYSBjaGVjay1pbiB2YWx1ZSBmcm9tIHRoZSBnaXZlbiBib2R5IHN0cmluZy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYm9keSAtIFRoZSBib2R5IHN0cmluZyB0byBwYXJzZS5cbiAgICAgKiBAcmV0dXJucyB7Q2hlY2tpblZhbHVlIHwgdW5kZWZpbmVkfSBUaGUgcGFyc2VkIGNoZWNrLWluIHZhbHVlIG9yIHVuZGVmaW5lZC5cbiAgICAgKi9cbiAgICBwYXJzZV9jaGVja2luKGJvZHk6IHN0cmluZykge1xuICAgICAgICBjb25zdCBjaGVja2luX2xvd2VyID0gYm9keS5yZXBsYWNlKC9cXHMrLywgXCJcIik7XG4gICAgICAgIHJldHVybiB0aGlzLmJ5X2x2W2NoZWNraW5fbG93ZXJdO1xuICAgIH1cbn1cblxuZXhwb3J0IHsgQ2hlY2tpblZhbHVlLCBDaGVja2luVmFsdWVzIH0iLCIvKipcbiAqIENvbnZlcnQgYW4gRXhjZWwgZGF0ZSB0byBhIEphdmFTY3JpcHQgRGF0ZSBvYmplY3QuXG4gKiBAcGFyYW0ge251bWJlcn0gZGF0ZSAtIFRoZSBFeGNlbCBkYXRlLlxuICogQHJldHVybnMge0RhdGV9IFRoZSBKYXZhU2NyaXB0IERhdGUgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBleGNlbF9kYXRlX3RvX2pzX2RhdGUoZGF0ZTogbnVtYmVyKTogRGF0ZSB7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IERhdGUoMCk7XG4gICAgcmVzdWx0LnNldFVUQ01pbGxpc2Vjb25kcyhNYXRoLnJvdW5kKChkYXRlIC0gMjU1NjkpICogODY0MDAgKiAxMDAwKSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDaGFuZ2UgdGhlIHRpbWV6b25lIG9mIGEgRGF0ZSBvYmplY3QgdG8gUFNULlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIC0gVGhlIERhdGUgb2JqZWN0LlxuICogQHJldHVybnMge0RhdGV9IFRoZSBEYXRlIG9iamVjdCB3aXRoIHRoZSB0aW1lem9uZSBzZXQgdG8gUFNULlxuICovXG5mdW5jdGlvbiBjaGFuZ2VfdGltZXpvbmVfdG9fcHN0KGRhdGU6IERhdGUpOiBEYXRlIHtcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgRGF0ZShkYXRlLnRvVVRDU3RyaW5nKCkucmVwbGFjZShcIiBHTVRcIiwgXCIgUFNUXCIpKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFN0cmlwIHRoZSB0aW1lIGZyb20gYSBEYXRlIG9iamVjdCwga2VlcGluZyBvbmx5IHRoZSBkYXRlLlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIC0gVGhlIERhdGUgb2JqZWN0LlxuICogQHJldHVybnMge0RhdGV9IFRoZSBEYXRlIG9iamVjdCB3aXRoIHRoZSB0aW1lIHN0cmlwcGVkLlxuICovXG5mdW5jdGlvbiBzdHJpcF9kYXRldGltZV90b19kYXRlKGRhdGU6IERhdGUpOiBEYXRlIHtcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgRGF0ZShcbiAgICAgICAgZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoXCJlbi1VU1wiLCB7IHRpbWVab25lOiBcIkFtZXJpY2EvTG9zX0FuZ2VsZXNcIiB9KVxuICAgICk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBTYW5pdGl6ZSBhIGRhdGUgYnkgY29udmVydGluZyBpdCBmcm9tIGFuIEV4Y2VsIGRhdGUgYW5kIHN0cmlwcGluZyB0aGUgdGltZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBkYXRlIC0gVGhlIEV4Y2VsIGRhdGUuXG4gKiBAcmV0dXJucyB7RGF0ZX0gVGhlIHNhbml0aXplZCBEYXRlIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gc2FuaXRpemVfZGF0ZShkYXRlOiBudW1iZXIpOiBEYXRlIHtcbiAgICBjb25zdCByZXN1bHQgPSBzdHJpcF9kYXRldGltZV90b19kYXRlKFxuICAgICAgICBjaGFuZ2VfdGltZXpvbmVfdG9fcHN0KGV4Y2VsX2RhdGVfdG9fanNfZGF0ZShkYXRlKSlcbiAgICApO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRm9ybWF0IGEgRGF0ZSBvYmplY3QgZm9yIHVzZSBpbiBhIHNwcmVhZHNoZWV0IHZhbHVlLlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIC0gVGhlIERhdGUgb2JqZWN0LlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCBkYXRlIHN0cmluZyBpbiBQU1RcbiAqL1xuZnVuY3Rpb24gZm9ybWF0X2RhdGVfZm9yX3NwcmVhZHNoZWV0X3ZhbHVlKGRhdGU6IERhdGUpOiBzdHJpbmcge1xuICAgICBjb25zdCBkYXRlc3RyID0gZGF0ZVxuICAgICAgICAgLnRvTG9jYWxlRGF0ZVN0cmluZyhcImVuLVVTXCIsIHsgdGltZVpvbmU6IFwiQW1lcmljYS9Mb3NfQW5nZWxlc1wiIH0pXG4gICAgICAgIC5zcGxpdChcIi9cIilcbiAgICAgICAgLm1hcCgoeCkgPT4geC5wYWRTdGFydCgyLCBcIjBcIikpXG4gICAgICAgIC5qb2luKFwiXCIpO1xuICAgIHJldHVybiBkYXRlc3RyO1xufVxuXG4vKipcbiAqIEZpbHRlciBhIGxpc3QgdG8gaW5jbHVkZSBvbmx5IGl0ZW1zIHRoYXQgZW5kIHdpdGggYSBzcGVjaWZpYyBkYXRlLlxuICogQHBhcmFtIHthbnlbXX0gbGlzdCAtIFRoZSBsaXN0IHRvIGZpbHRlci5cbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSAtIFRoZSBkYXRlIHRvIGZpbHRlciBieS5cbiAqIEByZXR1cm5zIHthbnlbXX0gVGhlIGZpbHRlcmVkIGxpc3QuXG4gKi9cbmZ1bmN0aW9uIGZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2RhdGUobGlzdDogYW55W10sIGRhdGU6IERhdGUpOiBhbnlbXSB7XG4gICAgY29uc3QgZGF0ZXN0ciA9IGZvcm1hdF9kYXRlX2Zvcl9zcHJlYWRzaGVldF92YWx1ZShkYXRlKTtcbiAgICByZXR1cm4gbGlzdC5tYXAoKHgpID0+IHg/LnRvU3RyaW5nKCkpLmZpbHRlcigoeCkgPT4geD8uZW5kc1dpdGgoZGF0ZXN0cikpO1xufVxuXG4vKipcbiAqIEZpbHRlciBhIGxpc3QgdG8gaW5jbHVkZSBvbmx5IGl0ZW1zIHRoYXQgZW5kIHdpdGggdGhlIGN1cnJlbnQgZGF0ZS5cbiAqIEBwYXJhbSB7YW55W119IGxpc3QgLSBUaGUgbGlzdCB0byBmaWx0ZXIuXG4gKiBAcmV0dXJucyB7YW55W119IFRoZSBmaWx0ZXJlZCBsaXN0LlxuICovXG5mdW5jdGlvbiBmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9jdXJyZW50X2RheShsaXN0OiBhbnlbXSk6IGFueVtdIHtcbiAgICByZXR1cm4gZmlsdGVyX2xpc3RfdG9fZW5kc3dpdGhfZGF0ZShsaXN0LCBuZXcgRGF0ZSgpKTtcbn1cblxuZXhwb3J0IHtcbiAgICBzYW5pdGl6ZV9kYXRlLFxuICAgIGV4Y2VsX2RhdGVfdG9fanNfZGF0ZSxcbiAgICBjaGFuZ2VfdGltZXpvbmVfdG9fcHN0LFxuICAgIHN0cmlwX2RhdGV0aW1lX3RvX2RhdGUsXG4gICAgZm9ybWF0X2RhdGVfZm9yX3NwcmVhZHNoZWV0X3ZhbHVlLFxuICAgIGZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2RhdGUsXG4gICAgZmlsdGVyX2xpc3RfdG9fZW5kc3dpdGhfY3VycmVudF9kYXksXG59OyIsImltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICdAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzJztcblxuLyoqXG4gKiBMb2FkIGNyZWRlbnRpYWxzIGZyb20gYSBKU09OIGZpbGUuXG4gKiBAcmV0dXJucyB7YW55fSBUaGUgcGFyc2VkIGNyZWRlbnRpYWxzIGZyb20gdGhlIEpTT04gZmlsZS5cbiAqL1xuZnVuY3Rpb24gbG9hZF9jcmVkZW50aWFsc19maWxlcygpOiBhbnkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKFxuICAgICAgICBmc1xuICAgICAgICAgICAgLnJlYWRGaWxlU3luYyhSdW50aW1lLmdldEFzc2V0cygpW1wiL2NyZWRlbnRpYWxzLmpzb25cIl0ucGF0aClcbiAgICAgICAgICAgIC50b1N0cmluZygpXG4gICAgKTtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIHBhdGggdG8gdGhlIHNlcnZpY2UgY3JlZGVudGlhbHMgZmlsZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBwYXRoIHRvIHRoZSBzZXJ2aWNlIGNyZWRlbnRpYWxzIGZpbGUuXG4gKi9cbmZ1bmN0aW9uIGdldF9zZXJ2aWNlX2NyZWRlbnRpYWxzX3BhdGgoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gUnVudGltZS5nZXRBc3NldHMoKVtcIi9zZXJ2aWNlLWNyZWRlbnRpYWxzLmpzb25cIl0ucGF0aDtcbn1cblxuZXhwb3J0IHsgbG9hZF9jcmVkZW50aWFsc19maWxlcywgZ2V0X3NlcnZpY2VfY3JlZGVudGlhbHNfcGF0aCB9OyIsImltcG9ydCB7IHNoZWV0c192NCB9IGZyb20gXCJnb29nbGVhcGlzXCI7XG5pbXBvcnQgeyBleGNlbF9yb3dfdG9faW5kZXggfSBmcm9tIFwiLi91dGlsXCI7XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGEgR29vZ2xlIFNoZWV0cyBzcHJlYWRzaGVldCB0YWIuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiIHtcbiAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyB8IG51bGw7XG4gICAgc2hlZXRfaWQ6IHN0cmluZztcbiAgICBzaGVldF9uYW1lOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYi5cbiAgICAgKiBAcGFyYW0ge3NoZWV0c192NC5TaGVldHMgfCBudWxsfSBzaGVldHNfc2VydmljZSAtIFRoZSBHb29nbGUgU2hlZXRzIEFQSSBzZXJ2aWNlIGluc3RhbmNlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaGVldF9pZCAtIFRoZSBJRCBvZiB0aGUgR29vZ2xlIFNoZWV0cyBzcHJlYWRzaGVldC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2hlZXRfbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBzaGVldCB0YWIuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzIHwgbnVsbCxcbiAgICAgICAgc2hlZXRfaWQ6IHN0cmluZyxcbiAgICAgICAgc2hlZXRfbmFtZTogc3RyaW5nXG4gICAgKSB7XG4gICAgICAgIHRoaXMuc2hlZXRzX3NlcnZpY2UgPSBzaGVldHNfc2VydmljZTtcbiAgICAgICAgdGhpcy5zaGVldF9pZCA9IHNoZWV0X2lkO1xuICAgICAgICB0aGlzLnNoZWV0X25hbWUgPSBzaGVldF9uYW1lLnNwbGl0KFwiIVwiKVswXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdmFsdWVzIGZyb20gdGhlIHNoZWV0LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbH0gW3JhbmdlXSAtIFRoZSByYW5nZSB0byBnZXQgdmFsdWVzIGZyb20uXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55W11bXSB8IHVuZGVmaW5lZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSB2YWx1ZXMgZnJvbSB0aGUgc2hlZXQuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3ZhbHVlcyhyYW5nZT86IHN0cmluZyB8IG51bGwpOiBQcm9taXNlPGFueVtdW10gfCB1bmRlZmluZWQ+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5fZ2V0X3ZhbHVlcyhyYW5nZSk7XG4gICAgICAgIHJldHVybiByZXN1bHQuZGF0YS52YWx1ZXMgPz8gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgcm93IGZvciBhIHNwZWNpZmljIHBhdHJvbGxlci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0cm9sbGVyX25hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcGF0cm9sbGVyLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lX2NvbHVtbiAtIFRoZSBjb2x1bW4gd2hlcmUgdGhlIHBhdHJvbGxlcidzIG5hbWUgaXMgbG9jYXRlZC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bGx9IFtyYW5nZV0gLSBUaGUgcmFuZ2UgdG8gc2VhcmNoIHdpdGhpbi5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx7IHJvdzogYW55W107IGluZGV4OiBudW1iZXI7IH0gfCBudWxsPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIHJvdyBhbmQgaW5kZXggb2YgdGhlIHBhdHJvbGxlciwgb3IgbnVsbCBpZiBub3QgZm91bmQuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3NoZWV0X3Jvd19mb3JfcGF0cm9sbGVyKFxuICAgICAgICBwYXRyb2xsZXJfbmFtZTogc3RyaW5nLFxuICAgICAgICBuYW1lX2NvbHVtbjogc3RyaW5nLFxuICAgICAgICByYW5nZT86IHN0cmluZyB8IG51bGxcbiAgICApOiBQcm9taXNlPHsgcm93OiBhbnlbXTsgaW5kZXg6IG51bWJlcjsgfSB8IG51bGw+IHtcbiAgICAgICAgY29uc3Qgcm93cyA9IGF3YWl0IHRoaXMuZ2V0X3ZhbHVlcyhyYW5nZSk7XG4gICAgICAgIGlmIChyb3dzKSB7XG4gICAgICAgICAgICBjb25zdCBsb29rdXBfaW5kZXggPSBleGNlbF9yb3dfdG9faW5kZXgobmFtZV9jb2x1bW4pO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJvd3NbaV1bbG9va3VwX2luZGV4XSA9PT0gcGF0cm9sbGVyX25hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgcm93OiByb3dzW2ldLCBpbmRleDogaSB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgYENvdWxkbid0IGZpbmQgcGF0cm9sbGVyICR7cGF0cm9sbGVyX25hbWV9IGluIHNoZWV0ICR7dGhpcy5zaGVldF9uYW1lfS5gXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB2YWx1ZXMgaW4gdGhlIHNoZWV0LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByYW5nZSAtIFRoZSByYW5nZSB0byB1cGRhdGUuXG4gICAgICogQHBhcmFtIHthbnlbXVtdfSB2YWx1ZXMgLSBUaGUgdmFsdWVzIHRvIHVwZGF0ZS5cbiAgICAgKi9cbiAgICBhc3luYyB1cGRhdGVfdmFsdWVzKHJhbmdlOiBzdHJpbmcsIHZhbHVlczogYW55W11bXSkge1xuICAgICAgICBjb25zdCB1cGRhdGVNZSA9IChhd2FpdCB0aGlzLl9nZXRfdmFsdWVzKHJhbmdlLCBudWxsKSkuZGF0YTtcblxuICAgICAgICB1cGRhdGVNZS52YWx1ZXMgPSB2YWx1ZXM7XG4gICAgICAgIGF3YWl0IHRoaXMuc2hlZXRzX3NlcnZpY2UhLnNwcmVhZHNoZWV0cy52YWx1ZXMudXBkYXRlKHtcbiAgICAgICAgICAgIHNwcmVhZHNoZWV0SWQ6IHRoaXMuc2hlZXRfaWQsXG4gICAgICAgICAgICB2YWx1ZUlucHV0T3B0aW9uOiBcIlVTRVJfRU5URVJFRFwiLFxuICAgICAgICAgICAgcmFuZ2U6IHVwZGF0ZU1lLnJhbmdlISxcbiAgICAgICAgICAgIHJlcXVlc3RCb2R5OiB1cGRhdGVNZSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHZhbHVlcyBmcm9tIHRoZSBzaGVldCAocHJpdmF0ZSBtZXRob2QpLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbH0gW3JhbmdlXSAtIFRoZSByYW5nZSB0byBnZXQgdmFsdWVzIGZyb20uXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCBudWxsfSBbdmFsdWVSZW5kZXJPcHRpb25dIC0gVGhlIHZhbHVlIHJlbmRlciBvcHRpb24uXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55W11bXT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSB2YWx1ZSByYW5nZS5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgYXN5bmMgX2dldF92YWx1ZXMoXG4gICAgICAgIHJhbmdlPzogc3RyaW5nIHwgbnVsbCxcbiAgICAgICAgdmFsdWVSZW5kZXJPcHRpb246IHN0cmluZyB8IG51bGwgPSBcIlVORk9STUFUVEVEX1ZBTFVFXCJcbiAgICApIHtcbiAgICAgICAgbGV0IGxvb2t1cFJhbmdlID0gdGhpcy5zaGVldF9uYW1lO1xuICAgICAgICBpZiAocmFuZ2UgIT0gbnVsbCkge1xuICAgICAgICAgICAgbG9va3VwUmFuZ2UgPSBsb29rdXBSYW5nZSArIFwiIVwiO1xuXG4gICAgICAgICAgICBpZiAocmFuZ2Uuc3RhcnRzV2l0aChsb29rdXBSYW5nZSkpIHtcbiAgICAgICAgICAgICAgICByYW5nZSA9IHJhbmdlLnN1YnN0cmluZyhsb29rdXBSYW5nZS5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9va3VwUmFuZ2UgPSBsb29rdXBSYW5nZSArIHJhbmdlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBvcHRzOiBzaGVldHNfdjQuUGFyYW1zJFJlc291cmNlJFNwcmVhZHNoZWV0cyRWYWx1ZXMkR2V0ID0ge1xuICAgICAgICAgICAgc3ByZWFkc2hlZXRJZDogdGhpcy5zaGVldF9pZCxcbiAgICAgICAgICAgIHJhbmdlOiBsb29rdXBSYW5nZSxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHZhbHVlUmVuZGVyT3B0aW9uKSB7XG4gICAgICAgICAgICBvcHRzLnZhbHVlUmVuZGVyT3B0aW9uID0gdmFsdWVSZW5kZXJPcHRpb247XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5zaGVldHNfc2VydmljZSEuc3ByZWFkc2hlZXRzLnZhbHVlcy5nZXQob3B0cyk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuIiwiXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRfcGFzc2VzX3N0cmluZyhcbiAgICB1c2VkOiBudW1iZXIsXG4gICAgdG90YWw6IG51bWJlcixcbiAgICB0b2RheTogbnVtYmVyLFxuICAgIGZvcmNlX3RvZGF5OiBib29sZWFuID0gZmFsc2Vcbikge1xuICAgIGxldCBtZXNzYWdlID0gYFlvdSBoYXZlIHVzZWQgJHt1c2VkfSBvZiAke3RvdGFsfSBndWVzdCBwYXNzZXMgdGhpcyBzZWFzb25gO1xuICAgIGlmIChmb3JjZV90b2RheSB8fCB0b2RheSA+IDApIHtcbiAgICAgICAgbWVzc2FnZSArPSBgICgke3RvZGF5fSB1c2VkIHRvZGF5KWA7XG4gICAgfVxuICAgIG1lc3NhZ2UgKz0gXCIuXCI7XG4gICAgcmV0dXJuIG1lc3NhZ2U7XG59XG4iLCIvKipcbiAqIFZhbGlkYXRlcyBpZiB0aGUgcHJvdmlkZWQgc2NvcGVzIGluY2x1ZGUgYWxsIGRlc2lyZWQgc2NvcGVzLlxuICogQHBhcmFtIHtzdHJpbmdbXX0gc2NvcGVzIC0gVGhlIGxpc3Qgb2Ygc2NvcGVzIHRvIHZhbGlkYXRlLlxuICogQHBhcmFtIHtzdHJpbmdbXX0gZGVzaXJlZF9zY29wZXMgLSBUaGUgbGlzdCBvZiBkZXNpcmVkIHNjb3Blcy5cbiAqIEB0aHJvd3Mge0Vycm9yfSBUaHJvd3MgYW4gZXJyb3IgaWYgYW55IGRlc2lyZWQgc2NvcGUgaXMgbWlzc2luZy5cbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVfc2NvcGVzKHNjb3Blczogc3RyaW5nW10sIGRlc2lyZWRfc2NvcGVzOiBzdHJpbmdbXSkge1xuICAgIGZvciAoY29uc3QgZGVzaXJlZF9zY29wZSBvZiBkZXNpcmVkX3Njb3Blcykge1xuICAgICAgICBpZiAoc2NvcGVzID09PSB1bmRlZmluZWQgfHwgIXNjb3Blcy5pbmNsdWRlcyhkZXNpcmVkX3Njb3BlKSkge1xuICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBgTWlzc2luZyBzY29wZSAke2Rlc2lyZWRfc2NvcGV9IGluIHJlY2VpdmVkIHNjb3BlczogJHtzY29wZXN9YDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQge3ZhbGlkYXRlX3Njb3Blc30iLCJpbXBvcnQgeyBTZWN0aW9uQ29uZmlnIH0gZnJvbSAnLi4vZW52L2hhbmRsZXJfY29uZmlnJztcblxuLyoqXG4gICAgKiBDbGFzcyBmb3Igc2VjdGlvbiB2YWx1ZXMuXG4gICAgKi9cbmNsYXNzIFNlY3Rpb25WYWx1ZXMge1xuICAgIHNlY3Rpb25fY29uZmlnOiBTZWN0aW9uQ29uZmlnXG4gICAgc2VjdGlvbnM6IHN0cmluZ1tdO1xuICAgIGxvd2VyY2FzZV9zZWN0aW9uczogc3RyaW5nW107XG5cbiAgICBjb25zdHJ1Y3RvcihzZWN0aW9uX2NvbmZpZzogU2VjdGlvbkNvbmZpZykge1xuICAgICAgICB0aGlzLnNlY3Rpb25fY29uZmlnID0gc2VjdGlvbl9jb25maWc7XG4gICAgICAgIHRoaXMuc2VjdGlvbnMgPSBzZWN0aW9uX2NvbmZpZy5TRUNUSU9OX1ZBTFVFUy5zcGxpdCgnLCcpO1xuICAgICAgICB0aGlzLmxvd2VyY2FzZV9zZWN0aW9ucyA9IHNlY3Rpb25fY29uZmlnLlNFQ1RJT05fVkFMVUVTLnRvTG93ZXJDYXNlKCkuc3BsaXQoJywnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBzZWN0aW9uIGRlc2NyaXB0aW9uLlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBzZWN0aW9uIGRlc2NyaXB0aW9uLlxuICAgICovXG4gICAgZ2V0X3NlY3Rpb25fZGVzY3JpcHRpb24oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VjdGlvbl9jb25maWcuU0VDVElPTl9WQUxVRVM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBQYXJzZXMgYSBzZWN0aW9uLlxuICAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHkgLSBUaGUgYm9keSBvZiB0aGUgcmVxdWVzdC5cbiAgICAqIEByZXR1cm5zIHtzdHJpbmcgfCBudWxsfSBUaGUgc2VjdGlvbiBpZiBpdCBpcyBhIHZhbGlkIHNlY3Rpb24gb3IgbnVsbC5cbiAgICAqL1xuICAgIHBhcnNlX3NlY3Rpb24oYm9keTogc3RyaW5nIHwgbnVsbCk6IHN0cmluZyB8IG51bGwge1xuICAgICAgICBpZiAoYm9keSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgIHJldHVybiB0aGlzLmxvd2VyY2FzZV9zZWN0aW9ucy5pbmNsdWRlcyhib2R5LnRvTG93ZXJDYXNlKCkpID8gYm9keSA6IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBNYXBzIGEgbG93ZXIgY2FzZSB2ZXJzaW9uIG9mIGEgc2VjdGlvbiBzdHJpbmcgdG8gdGhlIG9yaWdpbmFsIGNhc2UgdmFsdWUuXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gc2VjdGlvbiAtIFRoZSBsb3dlciBjYXNlIHNlY3Rpb24gc3RyaW5nLlxuICAgICogQHJldHVybnMge3N0cmluZyB9IFRoZSBvcmlnaW5hbCBjYXNlIHZhbHVlIGlmIGZvdW5kLCBvdGhlcndpc2UgbnVsbC5cbiAgICAqL1xuICAgbWFwX3NlY3Rpb24oc2VjdGlvbjogc3RyaW5nIHwgbnVsbCk6IHN0cmluZyAge1xuICAgICAgIGlmIChzZWN0aW9uID09PSBudWxsKSB7XG4gICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgIH1cbiAgICAgICBjb25zdCBpbmRleCA9IHRoaXMubG93ZXJjYXNlX3NlY3Rpb25zLmluZGV4T2Yoc2VjdGlvbi50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgIHJldHVybiB0aGlzLnNlY3Rpb25zW2luZGV4XTtcbiAgICAgICB9XG4gICAgICAgcmV0dXJuIFwiXCI7XG4gICB9XG5cbn1cblxuZXhwb3J0IHsgU2VjdGlvblZhbHVlcyB9OyIsIi8qKlxuICogQ29udmVydCByb3cgYW5kIGNvbHVtbiBudW1iZXJzIHRvIGFuIEV4Y2VsLWxpa2UgaW5kZXguXG4gKiBAcGFyYW0ge251bWJlcn0gcm93IC0gVGhlIHJvdyBudW1iZXIgKDAtYmFzZWQpLlxuICogQHBhcmFtIHtudW1iZXJ9IGNvbCAtIFRoZSBjb2x1bW4gbnVtYmVyICgwLWJhc2VkKS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBFeGNlbC1saWtlIGluZGV4IChlLmcuLCBcIkExXCIpLlxuICovXG5mdW5jdGlvbiByb3dfY29sX3RvX2V4Y2VsX2luZGV4KHJvdzogbnVtYmVyLCBjb2w6IG51bWJlcik6IHN0cmluZyB7XG4gICAgbGV0IGNvbFN0cmluZyA9IFwiXCI7XG4gICAgY29sICs9IDE7XG4gICAgd2hpbGUgKGNvbCA+IDApIHtcbiAgICAgICAgY29sIC09IDE7XG4gICAgICAgIGNvbnN0IG1vZHVsbyA9IGNvbCAlIDI2O1xuICAgICAgICBjb25zdCBjb2xMZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKCdBJy5jaGFyQ29kZUF0KDApICsgbW9kdWxvKTtcbiAgICAgICAgY29sU3RyaW5nID0gY29sTGV0dGVyICsgY29sU3RyaW5nO1xuICAgICAgICBjb2wgPSBNYXRoLmZsb29yKGNvbCAvIDI2KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbFN0cmluZyArIChyb3cgKyAxKS50b1N0cmluZygpO1xufVxuXG4vKipcbiAqIFNwbGl0IGFuIEV4Y2VsLWxpa2UgaW5kZXggaW50byByb3cgYW5kIGNvbHVtbiBudW1iZXJzLlxuICogQHBhcmFtIHtzdHJpbmd9IGV4Y2VsX2luZGV4IC0gVGhlIEV4Y2VsLWxpa2UgaW5kZXggKGUuZy4sIFwiQTFcIikuXG4gKiBAcmV0dXJucyB7W251bWJlciwgbnVtYmVyXX0gQW4gYXJyYXkgY29udGFpbmluZyB0aGUgcm93IGFuZCBjb2x1bW4gbnVtYmVycyAoMC1iYXNlZCkuXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIGluZGV4IGNhbm5vdCBiZSBwYXJzZWQuXG4gKi9cbmZ1bmN0aW9uIHNwbGl0X3RvX3Jvd19jb2woZXhjZWxfaW5kZXg6IHN0cmluZyk6IFtudW1iZXIsIG51bWJlcl0ge1xuICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cChcIl4oW0EtWmEtel0rKShbMC05XSspJFwiKTtcbiAgICBjb25zdCBtYXRjaCA9IHJlZ2V4LmV4ZWMoZXhjZWxfaW5kZXgpO1xuICAgIGlmIChtYXRjaCA9PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBwYXJzZSBzdHJpbmcgZm9yIGV4Y2VsIHBvc2l0aW9uIHNwbGl0XCIpO1xuICAgIH1cbiAgICBjb25zdCBjb2wgPSBleGNlbF9yb3dfdG9faW5kZXgobWF0Y2hbMV0pO1xuICAgIGNvbnN0IHJhd19yb3cgPSBOdW1iZXIobWF0Y2hbMl0pO1xuICAgIGlmIChyYXdfcm93IDwgMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJSb3cgbXVzdCBiZSA+PTFcIik7XG4gICAgfVxuICAgIHJldHVybiBbcmF3X3JvdyAtIDEsIGNvbF07XG59XG5cbi8qKlxuICogTG9vayB1cCBhIHZhbHVlIGluIGEgc2hlZXQgYnkgaXRzIEV4Y2VsLWxpa2UgaW5kZXguXG4gKiBAcGFyYW0ge3N0cmluZ30gZXhjZWxfaW5kZXggLSBUaGUgRXhjZWwtbGlrZSBpbmRleCAoZS5nLiwgXCJBMVwiKS5cbiAqIEBwYXJhbSB7YW55W11bXX0gc2hlZXQgLSBUaGUgc2hlZXQgZGF0YS5cbiAqIEByZXR1cm5zIHthbnl9IFRoZSB2YWx1ZSBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LCBvciB1bmRlZmluZWQgaWYgbm90IGZvdW5kLlxuICovXG5mdW5jdGlvbiBsb29rdXBfcm93X2NvbF9pbl9zaGVldChleGNlbF9pbmRleDogc3RyaW5nLCBzaGVldDogYW55W11bXSk6IGFueSB7XG4gICAgY29uc3QgW3JvdywgY29sXSA9IHNwbGl0X3RvX3Jvd19jb2woZXhjZWxfaW5kZXgpO1xuICAgIGlmIChyb3cgPj0gc2hlZXQubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiBzaGVldFtyb3ddW2NvbF07XG59XG5cbi8qKlxuICogQ29udmVydCBFeGNlbC1saWtlIGNvbHVtbiBsZXR0ZXJzIHRvIGEgY29sdW1uIG51bWJlci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBsZXR0ZXJzIC0gVGhlIGNvbHVtbiBsZXR0ZXJzIChlLmcuLCBcIkFcIikuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgY29sdW1uIG51bWJlciAoMC1iYXNlZCkuXG4gKi9cbmZ1bmN0aW9uIGV4Y2VsX3Jvd190b19pbmRleChsZXR0ZXJzOiBzdHJpbmcpOiBudW1iZXIge1xuICAgIGNvbnN0IGxvd2VyTGV0dGVycyA9IGxldHRlcnMudG9Mb3dlckNhc2UoKTtcbiAgICBsZXQgcmVzdWx0OiBudW1iZXIgPSAwO1xuICAgIGZvciAodmFyIHAgPSAwOyBwIDwgbG93ZXJMZXR0ZXJzLmxlbmd0aDsgcCsrKSB7XG4gICAgICAgIGNvbnN0IGNoYXJhY3RlclZhbHVlID1cbiAgICAgICAgICAgIGxvd2VyTGV0dGVycy5jaGFyQ29kZUF0KHApIC0gXCJhXCIuY2hhckNvZGVBdCgwKSArIDE7XG4gICAgICAgIHJlc3VsdCA9IGNoYXJhY3RlclZhbHVlICsgcmVzdWx0ICogMjY7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQgLSAxO1xufVxuXG4vKipcbiAqIFNhbml0aXplIGEgcGhvbmUgbnVtYmVyIGJ5IHJlbW92aW5nIHVud2FudGVkIGNoYXJhY3RlcnMuXG4gKiBAcGFyYW0ge251bWJlciB8IHN0cmluZ30gbnVtYmVyIC0gVGhlIHBob25lIG51bWJlciB0byBzYW5pdGl6ZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBzYW5pdGl6ZWQgcGhvbmUgbnVtYmVyLlxuICovXG5mdW5jdGlvbiBzYW5pdGl6ZV9waG9uZV9udW1iZXIobnVtYmVyOiBudW1iZXIgfCBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGxldCBuZXdfbnVtYmVyID0gbnVtYmVyLnRvU3RyaW5nKCk7XG4gICAgbmV3X251bWJlciA9IG5ld19udW1iZXIucmVwbGFjZShcIndoYXRzYXBwOlwiLCBcIlwiKTtcbiAgICBsZXQgdGVtcG9yYXJ5X25ld19udW1iZXI6IHN0cmluZyA9IFwiXCI7XG4gICAgd2hpbGUgKHRlbXBvcmFyeV9uZXdfbnVtYmVyICE9IG5ld19udW1iZXIpIHtcbiAgICAgICAgLy8gRG8gdGhpcyBtdWx0aXBsZSB0aW1lcyBzbyB3ZSBnZXQgYWxsICsxIGF0IHRoZSBzdGFydCBvZiB0aGUgc3RyaW5nLCBldmVuIGFmdGVyIHN0cmlwcGluZy5cbiAgICAgICAgdGVtcG9yYXJ5X25ld19udW1iZXIgPSBuZXdfbnVtYmVyO1xuICAgICAgICBuZXdfbnVtYmVyID0gbmV3X251bWJlci5yZXBsYWNlKC8oXlxcKzF8XFwofFxcKXxcXC58LSkvZywgXCJcIik7XG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdCA9IFN0cmluZyhwYXJzZUludChuZXdfbnVtYmVyKSkucGFkU3RhcnQoMTAsIFwiMFwiKTtcbiAgICBpZiAocmVzdWx0Lmxlbmd0aCA9PSAxMSAmJiByZXN1bHRbMF0gPT0gXCIxXCIpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5zdWJzdHJpbmcoMSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCB7XG4gICAgcm93X2NvbF90b19leGNlbF9pbmRleCxcbiAgICBleGNlbF9yb3dfdG9faW5kZXgsXG4gICAgc2FuaXRpemVfcGhvbmVfbnVtYmVyLFxuICAgIHNwbGl0X3RvX3Jvd19jb2wsXG4gICAgbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQsXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZ29vZ2xlYXBpc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzbXMtc2VnbWVudHMtY2FsY3VsYXRvclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG5jb25zdCBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGNvbnN0IGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHRjb25zdCBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0Y29uc3QgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdGNvbnN0IGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyL3ZhbHVlIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRpZihBcnJheS5pc0FycmF5KGRlZmluaXRpb24pKSB7XG5cdFx0dmFyIGkgPSAwO1xuXHRcdHdoaWxlKGkgPCBkZWZpbml0aW9uLmxlbmd0aCkge1xuXHRcdFx0dmFyIGtleSA9IGRlZmluaXRpb25baSsrXTtcblx0XHRcdHZhciBiaW5kaW5nID0gZGVmaW5pdGlvbltpKytdO1xuXHRcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRcdGlmKGJpbmRpbmcgPT09IDApIHtcblx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiBkZWZpbml0aW9uW2krK10gfSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGJpbmRpbmcgfSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZihiaW5kaW5nID09PSAwKSB7IGkrKzsgfVxuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIkB0d2lsaW8tbGFicy9zZXJ2ZXJsZXNzLXJ1bnRpbWUtdHlwZXNcIjtcbmltcG9ydCB7XG4gICAgQ29udGV4dCxcbiAgICBTZXJ2ZXJsZXNzQ2FsbGJhY2ssXG4gICAgU2VydmVybGVzc0V2ZW50T2JqZWN0LFxuICAgIFNlcnZlcmxlc3NGdW5jdGlvblNpZ25hdHVyZSxcbn0gZnJvbSBcIkB0d2lsaW8tbGFicy9zZXJ2ZXJsZXNzLXJ1bnRpbWUtdHlwZXMvdHlwZXNcIjtcbmltcG9ydCBCVk5TUEhhbmRsZXIsIHsgQlZOU1BFdmVudCB9IGZyb20gXCIuL2J2bnNwX2hhbmRsZXJcIjtcbmltcG9ydCB7IEhhbmRsZXJFbnZpcm9ubWVudCB9IGZyb20gXCIuLi9lbnYvaGFuZGxlcl9jb25maWdcIjtcblxuY29uc3QgTkVYVF9TVEVQX0NPT0tJRV9OQU1FID0gXCJidm5zcF9uZXh0X3N0ZXBcIjtcblxuLyoqXG4gKiBUd2lsaW8gU2VydmVybGVzcyBmdW5jdGlvbiBoYW5kbGVyIGZvciBCVk5TUCBib3QgY29tbWFuZHMuXG4gKiBAcGFyYW0ge0NvbnRleHQ8SGFuZGxlckVudmlyb25tZW50Pn0gY29udGV4dCAtIFRoZSBUd2lsaW8gc2VydmVybGVzcyBjb250ZXh0LlxuICogQHBhcmFtIHtTZXJ2ZXJsZXNzRXZlbnRPYmplY3Q8QlZOU1BFdmVudD59IGV2ZW50IC0gVGhlIGV2ZW50IG9iamVjdC5cbiAqIEBwYXJhbSB7U2VydmVybGVzc0NhbGxiYWNrfSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbi5cbiAqL1xuZXhwb3J0IGNvbnN0IGhhbmRsZXI6IFNlcnZlcmxlc3NGdW5jdGlvblNpZ25hdHVyZTxcbiAgICBIYW5kbGVyRW52aXJvbm1lbnQsXG4gICAgQlZOU1BFdmVudFxuPiA9IGFzeW5jIGZ1bmN0aW9uIChcbiAgICBjb250ZXh0OiBDb250ZXh0PEhhbmRsZXJFbnZpcm9ubWVudD4sXG4gICAgZXZlbnQ6IFNlcnZlcmxlc3NFdmVudE9iamVjdDxCVk5TUEV2ZW50PixcbiAgICBjYWxsYmFjazogU2VydmVybGVzc0NhbGxiYWNrXG4pIHtcbiAgICBjb25zdCBoYW5kbGVyID0gbmV3IEJWTlNQSGFuZGxlcihjb250ZXh0LCBldmVudCk7XG4gICAgbGV0IG1lc3NhZ2U6IHN0cmluZztcbiAgICBsZXQgbmV4dF9zdGVwOiBzdHJpbmcgPSBcIlwiO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXJfcmVzcG9uc2UgPSBhd2FpdCBoYW5kbGVyLmhhbmRsZSgpO1xuICAgICAgICBtZXNzYWdlID1cbiAgICAgICAgICAgIGhhbmRsZXJfcmVzcG9uc2UucmVzcG9uc2UgfHxcbiAgICAgICAgICAgIFwiVW5leHBlY3RlZCByZXN1bHQgLSBubyByZXNwb25zZSBkZXRlcm1pbmVkXCI7XG4gICAgICAgIG5leHRfc3RlcCA9IGhhbmRsZXJfcmVzcG9uc2UubmV4dF9zdGVwIHx8IFwiXCI7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkFuIGVycm9yIG9jY3VyZWRcIik7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlKSk7XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIH1cbiAgICAgICAgbWVzc2FnZSA9IFwiQW4gdW5leHBlY3RlZCBlcnJvciBvY2N1cmVkLlwiO1xuICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICBtZXNzYWdlICs9IFwiXFxuXCIgKyBlLm1lc3NhZ2U7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yXCIsIGUuc3RhY2spO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvclwiLCBlLm5hbWUpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvclwiLCBlLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBuZXcgVHdpbGlvLlJlc3BvbnNlKCk7XG4gICAgY29uc3QgdHdpbWwgPSBuZXcgVHdpbGlvLnR3aW1sLk1lc3NhZ2luZ1Jlc3BvbnNlKCk7XG5cbiAgICB0d2ltbC5tZXNzYWdlKG1lc3NhZ2UpO1xuXG4gICAgcmVzcG9uc2VcbiAgICAgICAgLy8gQWRkIHRoZSBzdHJpbmdpZmllZCBUd2lNTCB0byB0aGUgcmVzcG9uc2UgYm9keVxuICAgICAgICAuc2V0Qm9keSh0d2ltbC50b1N0cmluZygpKVxuICAgICAgICAvLyBTaW5jZSB3ZSdyZSByZXR1cm5pbmcgVHdpTUwsIHRoZSBjb250ZW50IHR5cGUgbXVzdCBiZSBYTUxcbiAgICAgICAgLmFwcGVuZEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcInRleHQveG1sXCIpXG4gICAgICAgIC5zZXRDb29raWUoTkVYVF9TVEVQX0NPT0tJRV9OQU1FLCBuZXh0X3N0ZXApO1xuXG4gICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlKTtcbn07Il0sIm5hbWVzIjpbIkNoZWNraW5WYWx1ZSIsInVzZXJfY3JlZHNfY29uZmlnIiwiTlNQX0VNQUlMX0RPTUFJTiIsImZpbmRfcGF0cm9sbGVyX2NvbmZpZyIsIlNIRUVUX0lEIiwiUEhPTkVfTlVNQkVSX0xPT0tVUF9TSEVFVCIsIlBIT05FX05VTUJFUl9OQU1FX0NPTFVNTiIsIlBIT05FX05VTUJFUl9OVU1CRVJfQ09MVU1OIiwibG9naW5fc2hlZXRfY29uZmlnIiwiTE9HSU5fU0hFRVRfTE9PS1VQIiwiQ0hFQ0tJTl9DT1VOVF9MT09LVVAiLCJTSEVFVF9EQVRFX0NFTEwiLCJDVVJSRU5UX0RBVEVfQ0VMTCIsIkFSQ0hJVkVEX0NFTEwiLCJOQU1FX0NPTFVNTiIsIkNBVEVHT1JZX0NPTFVNTiIsIlNFQ1RJT05fRFJPUERPV05fQ09MVU1OIiwiQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU4iLCJzZWFzb25fc2hlZXRfY29uZmlnIiwiU0VBU09OX1NIRUVUIiwiU0VBU09OX1NIRUVUX05BTUVfQ09MVU1OIiwiU0VBU09OX1NIRUVUX0RBWVNfQ09MVU1OIiwic2VjdGlvbl9jb25maWciLCJTRUNUSU9OX1ZBTFVFUyIsImd1ZXN0X3Bhc3Nlc19jb25maWciLCJHVUVTVF9QQVNTX1NIRUVUIiwiR1VFU1RfUEFTU19TSEVFVF9OQU1FX0NPTFVNTiIsIkdVRVNUX1BBU1NfU0hFRVRfREFURVNfQVZBSUxBQkxFX0NPTFVNTiIsIkdVRVNUX1BBU1NfU0hFRVRfVVNFRF9UT0RBWV9DT0xVTU4iLCJHVUVTVF9QQVNTX1NIRUVUX1VTRURfU0VBU09OX0NPTFVNTiIsIkdVRVNUX1BBU1NfU0hFRVRfREFURVNfU1RBUlRJTkdfQ09MVU1OIiwiaGFuZGxlcl9jb25maWciLCJTQ1JJUFRfSUQiLCJTWU5DX1NJRCIsIkFSQ0hJVkVfRlVOQ1RJT05fTkFNRSIsIlJFU0VUX0ZVTkNUSU9OX05BTUUiLCJVU0VfU0VSVklDRV9BQ0NPVU5UIiwiQUNUSU9OX0xPR19TSEVFVCIsIkNIRUNLSU5fVkFMVUVTIiwiQ09ORklHIiwiZ29vZ2xlIiwiTG9naW5TaGVldCIsIlNlYXNvblNoZWV0IiwiVXNlckNyZWRzIiwiQ2hlY2tpblZhbHVlcyIsImdldF9zZXJ2aWNlX2NyZWRlbnRpYWxzX3BhdGgiLCJleGNlbF9yb3dfdG9faW5kZXgiLCJzYW5pdGl6ZV9waG9uZV9udW1iZXIiLCJidWlsZF9wYXNzZXNfc3RyaW5nIiwiR3Vlc3RQYXNzU2hlZXQiLCJTZWN0aW9uVmFsdWVzIiwiTkVYVF9TVEVQUyIsIkFXQUlUX0NPTU1BTkQiLCJBV0FJVF9DSEVDS0lOIiwiQ09ORklSTV9SRVNFVCIsIkFVVEhfUkVTRVQiLCJBV0FJVF9TRUNUSU9OIiwiQVdBSVRfUEFTUyIsIkFXQUlUX01FU1NBR0UiLCJBV0FJVF9CUk9BRENBU1QiLCJDT01NQU5EUyIsIk9OX0RVVFkiLCJTVEFUVVMiLCJDSEVDS0lOIiwiU0VDVElPTl9BU1NJR05NRU5UIiwiR1VFU1RfUEFTUyIsIldIQVRTQVBQIiwiTUVTU0FHRSIsIkJST0FEQ0FTVCIsIlNNU19NQVhfTEVOR1RIIiwiTUVTU0FHRV9QUkVGSVhfVEVNUExBVEUiLCJNRVNTQUdFX1BSRUZJWF9TVUZGSVgiLCJ2YWxpZGF0ZV9zbXNfbWVzc2FnZSIsImZ1bGxfbWVzc2FnZSIsIlNlZ21lbnRlZE1lc3NhZ2UiLCJyZXF1aXJlIiwic2VnbWVudGVkIiwibm9uX2dzbSIsImdldE5vbkdzbUNoYXJhY3RlcnMiLCJsZW5ndGgiLCJ2YWxpZCIsInJlYXNvbiIsIm5vbl9nc21fY2hhcmFjdGVycyIsIlNldCIsInNlZ21lbnRzQ291bnQiLCJzZWdtZW50c19jb3VudCIsImZvcm1hdF9waG9uZV9mb3JfZGlzcGxheSIsInRlbl9kaWdpdHMiLCJzdWJzdHJpbmciLCJCVk5TUEhhbmRsZXIiLCJTQ09QRVMiLCJzbXNfcmVxdWVzdCIsInJlc3VsdF9tZXNzYWdlcyIsImZyb20iLCJ0byIsImJvZHkiLCJib2R5X3JhdyIsInBhdHJvbGxlciIsImJ2bnNwX25leHRfc3RlcCIsImNoZWNraW5fbW9kZSIsImZhc3RfY2hlY2tpbiIsImFzc2lnbmVkX3NlY3Rpb24iLCJ0d2lsaW9fY2xpZW50Iiwic3luY19zaWQiLCJyZXNldF9zY3JpcHRfaWQiLCJzeW5jX2NsaWVudCIsInVzZXJfY3JlZHMiLCJzZXJ2aWNlX2NyZWRzIiwic2hlZXRzX3NlcnZpY2UiLCJ1c2VyX3NjcmlwdHNfc2VydmljZSIsImxvZ2luX3NoZWV0Iiwic2Vhc29uX3NoZWV0IiwiZ3Vlc3RfcGFzc19zaGVldCIsImNoZWNraW5fdmFsdWVzIiwiY3VycmVudF9zaGVldF9kYXRlIiwiY29tYmluZWRfY29uZmlnIiwiY29uZmlnIiwic2VjdGlvbl92YWx1ZXMiLCJjb250ZXh0IiwiZXZlbnQiLCJGcm9tIiwibnVtYmVyIiwidW5kZWZpbmVkIiwidGVzdF9udW1iZXIiLCJUbyIsIkJvZHkiLCJ0b0xvd2VyQ2FzZSIsInRyaW0iLCJyZXBsYWNlIiwicmVxdWVzdCIsImNvb2tpZXMiLCJnZXRUd2lsaW9DbGllbnQiLCJlIiwiY29uc29sZSIsImxvZyIsIkRhdGUiLCJwYXJzZV9mYXN0X2NoZWNraW5fbW9kZSIsInBhcnNlZCIsInBhcnNlX2Zhc3RfY2hlY2tpbiIsImtleSIsInBhcnNlX2NoZWNraW4iLCJwYXJzZV9jaGVja2luX2Zyb21fbmV4dF9zdGVwIiwibGFzdF9zZWdtZW50Iiwic3BsaXQiLCJzbGljZSIsImJ5X2tleSIsImRlbGF5Iiwic2Vjb25kcyIsIm9wdGlvbmFsIiwiUHJvbWlzZSIsInJlcyIsInNldFRpbWVvdXQiLCJzZW5kX21lc3NhZ2UiLCJtZXNzYWdlIiwiZ2V0X3R3aWxpb19jbGllbnQiLCJtZXNzYWdlcyIsImNyZWF0ZSIsInB1c2giLCJoYW5kbGUiLCJyZXN1bHQiLCJfaGFuZGxlIiwicmVzcG9uc2UiLCJqb2luIiwibmV4dF9zdGVwIiwibG9nb3V0IiwiY2hlY2tfdXNlcl9jcmVkcyIsImdldF9tYXBwZWRfcGF0cm9sbGVyIiwiYXdhaXRfcmVzcG9uc2UiLCJoYW5kbGVfYXdhaXRfY29tbWFuZCIsImNoZWNraW4iLCJzdGFydHNXaXRoIiwibmFtZSIsInJlc2V0X3NoZWV0X2Zsb3ciLCJzZWN0aW9uIiwicGFyc2Vfc2VjdGlvbiIsImFzc2lnbl9zZWN0aW9uIiwicHJvbXB0X3NlY3Rpb25fYXNzaWdubWVudCIsInNlbmRfdGV4dF9tZXNzYWdlIiwic2VuZF9icm9hZGNhc3RfbWVzc2FnZSIsInByb21wdF9jb21tYW5kIiwicGF0cm9sbGVyX25hbWUiLCJpbmNsdWRlcyIsImdldF9vbl9kdXR5IiwiZ2V0X3N0YXR1cyIsInByb21wdF9jaGVja2luIiwicHJvbXB0X2d1ZXN0X3Bhc3MiLCJwYXJzZV9mYXN0X3NlY3Rpb25fYXNzaWdubWVudCIsInByb21wdF9tZXNzYWdlIiwicHJvbXB0X2Jyb2FkY2FzdCIsInR5cGVzIiwiT2JqZWN0IiwidmFsdWVzIiwibWFwIiwieCIsInNtc19kZXNjIiwic2VnbWVudHMiLCJsYXN0U2VnbWVudCIsInBvcCIsImZpcnN0UGFydCIsIm1hcF9zZWN0aW9uIiwic2VjdGlvbl9kZXNjcmlwdGlvbiIsImdldF9zZWN0aW9uX2Rlc2NyaXB0aW9uIiwiZ2V0X21lc3NhZ2VfcHJlZml4Iiwic2VuZGVyX25hbWUiLCJzZW5kZXJfcGhvbmUiLCJmb3JtYXR0ZWRfcGhvbmUiLCJnZXRfbWF4X21lc3NhZ2VfbGVuZ3RoIiwiZ2V0X2xvZ2luX3NoZWV0IiwicmVjaXBpZW50cyIsImdldF9vbl9kdXR5X3BhdHJvbGxlcnMiLCJtYXhfbGVuZ3RoIiwibWVzc2FnZV90ZXh0IiwicHJlZml4IiwidmFsaWRhdGlvbiIsImJhZF9jaGFycyIsInNpZ25lZF9pbl9wYXRyb2xsZXJzIiwicGhvbmVfbWFwIiwiZ2V0X3Bob25lX251bWJlcl9tYXAiLCJyZWNpcGllbnRfbWFwIiwibm9fcGhvbmVfbmFtZXMiLCJwaG9uZSIsInNlbnRfY291bnQiLCJjb3B5X3NlbnRfdG9fc2VuZGVyIiwiZmFpbGVkX25hbWVzIiwiZGVsaXZlcl9zbXNfdG9fbWFwIiwibG9nX2FjdGlvbiIsImFsbF9mYWlsZWQiLCJlbnRyaWVzIiwibm9ybWFsaXplZF9zZW5kZXIiLCJzZW5kZXJfaW5fbWFwIiwicmVjaXBpZW50X2NvdW50Iiwia2V5cyIsImdldF9zaGVldHNfc2VydmljZSIsIm9wdHMiLCJzcHJlYWRzaGVldHMiLCJnZXQiLCJzcHJlYWRzaGVldElkIiwicmFuZ2UiLCJ2YWx1ZVJlbmRlck9wdGlvbiIsImRhdGEiLCJyb3ciLCJyYXdOdW1iZXIiLCJhc3NpZ25lZFNlY3Rpb24iLCJtYXBwZWRfc2VjdGlvbiIsInJlZnJlc2giLCJzaGVldF9kYXRlIiwidG9EYXRlU3RyaW5nIiwiY3VycmVudF9kYXRlIiwiaXNfY3VycmVudCIsImdldF9zdGF0dXNfc3RyaW5nIiwiZ3Vlc3RfcGFzc19wcm9taXNlIiwiZ2V0X2d1ZXN0X3Bhc3Nfc2hlZXQiLCJnZXRfYXZhaWxhYmxlX2FuZF91c2VkX3Bhc3NlcyIsInBhdHJvbGxlcl9zdGF0dXMiLCJjaGVja2luQ29sdW1uU2V0IiwiY2hlY2tlZE91dCIsImJ5X3NoZWV0X3N0cmluZyIsInN0YXR1cyIsInRvU3RyaW5nIiwiY29tcGxldGVkUGF0cm9sRGF5cyIsImdldF9zZWFzb25fc2hlZXQiLCJnZXRfcGF0cm9sbGVkX2RheXMiLCJjb21wbGV0ZWRQYXRyb2xEYXlzU3RyaW5nIiwibG9naW5TaGVldERhdGUiLCJzdGF0dXNTdHJpbmciLCJ1c2VkVG9kYXlHdWVzdFBhc3NlcyIsInVzZWRfdG9kYXkiLCJ1c2VkU2Vhc29uR3Vlc3RQYXNzZXMiLCJ1c2VkX3NlYXNvbiIsImF2YWlsYWJsZUd1ZXN0UGFzc2VzIiwiYXZhaWxhYmxlIiwic2hlZXRfbmVlZHNfcmVzZXQiLCJFcnJvciIsIm5ld19jaGVja2luX3ZhbHVlIiwic2hlZXRzX3ZhbHVlIiwiZmFzdF9jaGVja2lucyIsInJlc2V0X3NoZWV0Iiwic2NyaXB0X3NlcnZpY2UiLCJnZXRfdXNlcl9zY3JpcHRzX3NlcnZpY2UiLCJzaG91bGRfcGVyZm9ybV9hcmNoaXZlIiwiYXJjaGl2ZWQiLCJzY3JpcHRzIiwicnVuIiwic2NyaXB0SWQiLCJyZXF1ZXN0Qm9keSIsImZ1bmN0aW9uIiwiZ2V0X3VzZXJfY3JlZHMiLCJsb2FkVG9rZW4iLCJhdXRoVXJsIiwiZ2V0QXV0aFVybCIsImNoZWNrZWRfb3V0X3NlY3Rpb24iLCJsYXN0X3NlY3Rpb25zIiwib25fZHV0eV9wYXRyb2xsZXJzIiwiYnlfc2VjdGlvbiIsImZpbHRlciIsInJlZHVjZSIsInByZXYiLCJjdXIiLCJzaG9ydF9jb2RlIiwicmVzdWx0cyIsImFsbF9rZXlzIiwib3JkZXJlZF9wcmltYXJ5X3NlY3Rpb25zIiwic29ydCIsImZpbHRlcmVkX2xhc3Rfc2VjdGlvbnMiLCJvcmRlcmVkX3NlY3Rpb25zIiwiY29uY2F0IiwicGF0cm9sbGVycyIsInkiLCJsb2NhbGVDb21wYXJlIiwicGF0cm9sbGVyX3N0cmluZyIsImRldGFpbHMiLCJ0b1VwcGVyQ2FzZSIsInIiLCJhY3Rpb25fbmFtZSIsImFwcGVuZCIsInZhbHVlSW5wdXRPcHRpb24iLCJkZWxldGVUb2tlbiIsImdldF9zeW5jX2NsaWVudCIsInN5bmMiLCJ2MSIsInNlcnZpY2VzIiwiZ2V0X3NlcnZpY2VfY3JlZHMiLCJhdXRoIiwiR29vZ2xlQXV0aCIsImtleUZpbGUiLCJzY29wZXMiLCJnZXRfdmFsaWRfY3JlZHMiLCJyZXF1aXJlX3VzZXJfY3JlZHMiLCJvYXV0aDJfY2xpZW50Iiwic2hlZXRzIiwidmVyc2lvbiIsInNjcmlwdCIsImZvcmNlIiwicGhvbmVfbG9va3VwIiwiZmluZF9wYXRyb2xsZXJfZnJvbV9udW1iZXIiLCJtYXBwZWRQYXRyb2xsZXIiLCJ0cnlfZmluZF9wYXRyb2xsZXIiLCJyYXdfbnVtYmVyIiwiY3VycmVudE51bWJlciIsImN1cnJlbnROYW1lIiwic2hlZXQiLCJ1c2VkX2FuZF9hdmFpbGFibGUiLCJnZXRfcHJvbXB0Iiwic2V0X3VzZWRfZ3Vlc3RfcGFzc2VzIiwidXBkYXRlZCIsInJvd19jb2xfdG9fZXhjZWxfaW5kZXgiLCJHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYiIsImZvcm1hdF9kYXRlX2Zvcl9zcHJlYWRzaGVldF92YWx1ZSIsIlVzZWRBbmRBdmFpbGFibGVQYXNzZXMiLCJpbmRleCIsIk51bWJlciIsIlBhc3NTaGVldCIsInBhdHJvbGxlcl9yb3ciLCJnZXRfc2hlZXRfcm93X2Zvcl9wYXRyb2xsZXIiLCJuYW1lX2NvbHVtbiIsImN1cnJlbnRfZGF5X2F2YWlsYWJsZV9wYXNzZXMiLCJhdmFpbGFibGVfY29sdW1uIiwiY3VycmVudF9kYXlfdXNlZF9wYXNzZXMiLCJ1c2VkX3RvZGF5X2NvbHVtbiIsImN1cnJlbnRfc2Vhc29uX3VzZWRfcGFzc2VzIiwidXNlZF9zZWFzb25fY29sdW1uIiwicm93bnVtIiwic3RhcnRfaW5kZXgiLCJwcmlvcl9sZW5ndGgiLCJjdXJyZW50X2RhdGVfc3RyaW5nIiwibmV3X3ZhbHMiLCJ1cGRhdGVfbGVuZ3RoIiwiTWF0aCIsIm1heCIsImVuZF9pbmRleCIsInNoZWV0X25hbWUiLCJ1cGRhdGVfdmFsdWVzIiwibG9va3VwX3Jvd19jb2xfaW5fc2hlZXQiLCJzYW5pdGl6ZV9kYXRlIiwiY2hlY2tpbl9jb3VudF9zaGVldCIsInJvd3MiLCJjaGVja2luX2NvdW50IiwiZ2V0X3ZhbHVlcyIsImkiLCJwYXJzZV9wYXRyb2xsZXJfcm93IiwiZ2V0VGltZSIsImZpbmRfcGF0cm9sbGVyIiwiSlNPTiIsInN0cmluZ2lmeSIsInBhdHJvbGxlcl9zZWN0aW9uIiwibmV3X3NlY3Rpb25fdmFsdWUiLCJjYXRlZ29yeSIsImZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2N1cnJlbnRfZGF5IiwiY3VycmVudERheSIsImRheXNCZWZvcmVUb2RheSIsImxvYWRfY3JlZGVudGlhbHNfZmlsZXMiLCJ2YWxpZGF0ZV9zY29wZXMiLCJkb21haW4iLCJsb2FkZWQiLCJjcmVkZW50aWFscyIsImNsaWVudF9zZWNyZXQiLCJjbGllbnRfaWQiLCJyZWRpcmVjdF91cmlzIiwid2ViIiwiT0F1dGgyIiwidG9rZW5fa2V5Iiwib2F1dGgyRG9jIiwiZG9jdW1lbnRzIiwiZmV0Y2giLCJ0b2tlbiIsInNldENyZWRlbnRpYWxzIiwic2lkIiwicmVtb3ZlIiwiY29tcGxldGVMb2dpbiIsImNvZGUiLCJnZXRUb2tlbiIsInRva2VucyIsIm9hdXRoRG9jIiwidW5pcXVlTmFtZSIsInVwZGF0ZSIsImlkIiwiZ2VuZXJhdGVSYW5kb21TdHJpbmciLCJkb2MiLCJ0dGwiLCJhY2Nlc3NfdHlwZSIsInNjb3BlIiwic3RhdGUiLCJnZW5lcmF0ZUF1dGhVcmwiLCJjaGFyYWN0ZXJzIiwiY2hhcmFjdGVyc0xlbmd0aCIsImNoYXJBdCIsImZsb29yIiwicmFuZG9tIiwiVXNlckNyZWRzU2NvcGVzIiwibG9va3VwX3ZhbHVlcyIsIkFycmF5Iiwic21zX2Rlc2Nfc3BsaXQiLCJsb29rdXBfdmFscyIsImJ5X2x2IiwiYnlfZmMiLCJjaGVja2luVmFsdWVzIiwiY2hlY2tpblZhbHVlIiwibHYiLCJmYyIsImNoZWNraW5fbG93ZXIiLCJleGNlbF9kYXRlX3RvX2pzX2RhdGUiLCJkYXRlIiwic2V0VVRDTWlsbGlzZWNvbmRzIiwicm91bmQiLCJjaGFuZ2VfdGltZXpvbmVfdG9fcHN0IiwidG9VVENTdHJpbmciLCJzdHJpcF9kYXRldGltZV90b19kYXRlIiwidG9Mb2NhbGVEYXRlU3RyaW5nIiwidGltZVpvbmUiLCJkYXRlc3RyIiwicGFkU3RhcnQiLCJmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9kYXRlIiwibGlzdCIsImVuZHNXaXRoIiwiZnMiLCJwYXJzZSIsInJlYWRGaWxlU3luYyIsIlJ1bnRpbWUiLCJnZXRBc3NldHMiLCJwYXRoIiwic2hlZXRfaWQiLCJfZ2V0X3ZhbHVlcyIsImxvb2t1cF9pbmRleCIsInVwZGF0ZU1lIiwibG9va3VwUmFuZ2UiLCJ1c2VkIiwidG90YWwiLCJ0b2RheSIsImZvcmNlX3RvZGF5IiwiZGVzaXJlZF9zY29wZXMiLCJkZXNpcmVkX3Njb3BlIiwiZXJyb3IiLCJzZWN0aW9ucyIsImxvd2VyY2FzZV9zZWN0aW9ucyIsImluZGV4T2YiLCJjb2wiLCJjb2xTdHJpbmciLCJtb2R1bG8iLCJjb2xMZXR0ZXIiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJjaGFyQ29kZUF0Iiwic3BsaXRfdG9fcm93X2NvbCIsImV4Y2VsX2luZGV4IiwicmVnZXgiLCJSZWdFeHAiLCJtYXRjaCIsImV4ZWMiLCJyYXdfcm93IiwibGV0dGVycyIsImxvd2VyTGV0dGVycyIsInAiLCJjaGFyYWN0ZXJWYWx1ZSIsIm5ld19udW1iZXIiLCJ0ZW1wb3JhcnlfbmV3X251bWJlciIsInBhcnNlSW50IiwiTkVYVF9TVEVQX0NPT0tJRV9OQU1FIiwiaGFuZGxlciIsImNhbGxiYWNrIiwiaGFuZGxlcl9yZXNwb25zZSIsInN0YWNrIiwiVHdpbGlvIiwiUmVzcG9uc2UiLCJ0d2ltbCIsIk1lc3NhZ2luZ1Jlc3BvbnNlIiwic2V0Qm9keSIsImFwcGVuZEhlYWRlciIsInNldENvb2tpZSJdLCJzb3VyY2VSb290IjoiIn0=