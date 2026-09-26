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
    GUEST_PASS_ELIGIBLE_COLUMN: "B",
    GUEST_PASS_ELIGIBLE_REASON_COLUMN: "C",
    GUEST_PASS_SHEET_NAME_COLUMN: "A",
    GUEST_PASS_SHEET_AVAILABLE_COLUMN: "D",
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
            setTimeout(res, seconds * 1000);
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
            this.season_sheet = new _sheets_season_sheet__WEBPACK_IMPORTED_MODULE_4__["default"](sheets_service, season_sheet_config);
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
        return response.data.values.map((row)=>{
            const rawNumber = row[(0,_utils_util__WEBPACK_IMPORTED_MODULE_8__.excel_row_to_index)(opts.PHONE_NUMBER_NUMBER_COLUMN)];
            const currentNumber = rawNumber != undefined ? (0,_utils_util__WEBPACK_IMPORTED_MODULE_8__.sanitize_phone_number)(rawNumber) : rawNumber;
            const currentName = row[(0,_utils_util__WEBPACK_IMPORTED_MODULE_8__.excel_row_to_index)(opts.PHONE_NUMBER_NAME_COLUMN)];
            return {
                name: currentName,
                number: currentNumber
            };
        }).filter((patroller)=>patroller.number === number)[0];
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
    eligible;
    eligible_reason;
    available;
    used_today;
    used_season;
    constructor(row, index, eligible, eligible_reason, available, used_today, used_season){
        this.row = row;
        this.index = index;
        this.eligible = (0,_utils_util__WEBPACK_IMPORTED_MODULE_0__.parse_boolean_cell)(eligible);
        this.eligible_reason = String(eligible_reason ?? "");
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
        if (!this.eligible) {
            return {
                response: `You are not eligible for guest passes. Reason: ${this.eligible_reason}`
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
        const eligible = patroller_row.row[(0,_utils_util__WEBPACK_IMPORTED_MODULE_0__.excel_row_to_index)(this.eligible_column)];
        const eligible_reason = patroller_row.row[(0,_utils_util__WEBPACK_IMPORTED_MODULE_0__.excel_row_to_index)(this.eligible_reason_column)];
        const current_day_available_passes = patroller_row.row[(0,_utils_util__WEBPACK_IMPORTED_MODULE_0__.excel_row_to_index)(this.available_column)];
        const current_day_used_passes = patroller_row.row[(0,_utils_util__WEBPACK_IMPORTED_MODULE_0__.excel_row_to_index)(this.used_today_column)];
        const current_season_used_passes = patroller_row.row[(0,_utils_util__WEBPACK_IMPORTED_MODULE_0__.excel_row_to_index)(this.used_season_column)];
        return new UsedAndAvailablePasses(patroller_row.row, patroller_row.index, eligible, eligible_reason, current_day_available_passes, current_day_used_passes, current_season_used_passes);
    }
    async set_used_guest_passes(patroller_row) {
        if (!patroller_row.eligible) {
            throw new Error(`Patroller is not eligible for guest passes. Reason: ${patroller_row.eligible_reason}`);
        }
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
    get eligible_column() {
        return this.config.GUEST_PASS_ELIGIBLE_COLUMN;
    }
    get eligible_reason_column() {
        return this.config.GUEST_PASS_ELIGIBLE_REASON_COLUMN;
    }
    get available_column() {
        return this.config.GUEST_PASS_SHEET_AVAILABLE_COLUMN;
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
     * @param patroller_section The row for the patroller that needs to have a section assigned to.
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
        return currentNumber - currentDay;
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
        return this.oauth2_client.generateAuthUrl(opts);
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
        for (const checkinValue of checkinValues){
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
    return new Date(date.toUTCString().replace(" GMT", " PST"));
}
/**
 * Strip the time from a Date object, keeping only the date.
 * @param {Date} date - The Date object.
 * @returns {Date} The Date object with the time stripped.
 */ function strip_datetime_to_date(date) {
    return new Date(date.toLocaleDateString("en-US", {
        timeZone: "America/Los_Angeles"
    }));
}
/**
 * Sanitize a date by converting it from an Excel date and stripping the time.
 * @param {number} date - The Excel date.
 * @returns {Date} The sanitized Date object.
 */ function sanitize_date(date) {
    return strip_datetime_to_date(change_timezone_to_pst(excel_date_to_js_date(date)));
}
/**
 * Format a Date object for use in a spreadsheet value.
 * @param {Date} date - The Date object.
 * @returns {string} The formatted date string in PST
 */ function format_date_for_spreadsheet_value(date) {
    return date.toLocaleDateString("en-US", {
        timeZone: "America/Los_Angeles"
    }).split("/").map((x)=>x.padStart(2, "0")).join("");
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
            for(let i = 0; i < rows.length; i++){
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
        return await this.sheets_service.spreadsheets.values.get(opts);
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
/* harmony export */   parse_boolean_cell: () => (/* binding */ parse_boolean_cell),
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
    for(let p = 0; p < lowerLetters.length; p++){
        const characterValue = lowerLetters.charCodeAt(p) - "a".charCodeAt(0) + 1;
        result = characterValue + result * 26;
    }
    return result - 1;
}
/**
 * Parse a Google Sheets checkbox/boolean cell value as a boolean.
 * Accepts JS boolean true/false and string literals "TRUE"/"FALSE"
 * (case-insensitive) from Sheets,  depending on the cell formatting.
 * Any value that cannot be recognized as true is considered false.
 * @param {any} value - Raw cell value.
 * @returns {boolean} true only when value is true or "TRUE" (case-insensitive).
 */ function parse_boolean_cell(value) {
    if (value === true) return true;
    return typeof value === "string" && value.toUpperCase() === "TRUE";
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
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		const getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QixFQUFFLE9BQU07WUFDSkMsUUFBUUMsR0FBRyxDQUFDRjtRQUNoQjtRQUNBcUIsVUFBVTtRQUNWLElBQUlyQixhQUFhNEksT0FBTztZQUNwQnZILFdBQVcsT0FBT3JCLEVBQUVxQixPQUFPO1lBQzNCcEIsUUFBUUMsR0FBRyxDQUFDLFNBQVNGLEVBQUVtWCxLQUFLO1lBQzVCbFgsUUFBUUMsR0FBRyxDQUFDLFNBQVNGLEVBQUV1QyxJQUFJO1lBQzNCdEMsUUFBUUMsR0FBRyxDQUFDLFNBQVNGLEVBQUVxQixPQUFPO1FBQ2xDO0lBQ0o7SUFFQSxNQUFNUSxXQUFXLElBQUl1VixPQUFPQyxRQUFRO0lBQ3BDLE1BQU1DLFFBQVEsSUFBSUYsT0FBT0UsS0FBSyxDQUFDQyxpQkFBaUI7SUFFaERELE1BQU1qVyxPQUFPLENBQUNBO0lBRWRRLFFBQ0ksaURBQWlEO0tBQ2hEMlYsT0FBTyxDQUFDRixNQUFNeFAsUUFBUSxHQUN2Qiw0REFBNEQ7S0FDM0QyUCxZQUFZLENBQUMsZ0JBQWdCLFlBQzdCQyxTQUFTLENBQUNYLHVCQUF1QmhWO0lBRXRDLE9BQU9rVixTQUFTLE1BQU1wVjtBQUMxQixFQUFFIiwic291cmNlcyI6WyIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL25vZGVfbW9kdWxlcy9AdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzL2luZGV4LmpzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvZW52L2hhbmRsZXJfY29uZmlnLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvaGFuZGxlcnMvYnZuc3BfaGFuZGxlci50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3NoZWV0cy9ndWVzdF9wYXNzX3NoZWV0LnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvc2hlZXRzL2xvZ2luX3NoZWV0LnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvc2hlZXRzL3NlYXNvbl9zaGVldC50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3VzZXItY3JlZHMudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91dGlscy9jaGVja2luX3ZhbHVlcy50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3V0aWxzL2RhdGV0aW1lX3V0aWwudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91dGlscy9maWxlX3V0aWxzLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvZ29vZ2xlX3NoZWV0c19zcHJlYWRzaGVldF90YWIudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91dGlscy9ndWVzdF9wYXNzZXMudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91dGlscy9zY29wZV91dGlsLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvc2VjdGlvbl92YWx1ZXMudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91dGlscy91dGlsLnRzIiwiZXh0ZXJuYWwgY29tbW9uanMgXCJnb29nbGVhcGlzXCIiLCJleHRlcm5hbCBjb21tb25qcyBcInNtcy1zZWdtZW50cy1jYWxjdWxhdG9yXCIiLCJleHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiZnNcIiIsIndlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL2hhbmRsZXJzL2hhbmRsZXIucHJvdGVjdGVkLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEludGVudGlvbmFsbHkgbGVmdCBlbXB0eVxuIiwiaW1wb3J0IHsgQ2hlY2tpblZhbHVlIH0gZnJvbSBcIi4uL3V0aWxzL2NoZWNraW5fdmFsdWVzXCI7XG5cbi8qKlxuICogRW52aXJvbm1lbnQgY29uZmlndXJhdGlvbiBmb3IgdGhlIGhhbmRsZXIuXG4gKiA8cD5cbiAqIE5vdGU6IFRoZXNlIGFyZSB0aGUgb25seSBzZWNyZXQgdmFsdWVzIHdlIG5lZWQgdG8gcmVhZC4gUmVzdCBjYW4gYmUgZGVwbG95ZWQuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBIYW5kbGVyRW52aXJvbm1lbnRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTSEVFVF9JRCAtIFRoZSBJRCBvZiB0aGUgR29vZ2xlIFNoZWV0cyBzcHJlYWRzaGVldC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTQ1JJUFRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBBcHBzIFNjcmlwdCBwcm9qZWN0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNZTkNfU0lEIC0gVGhlIFNJRCBvZiB0aGUgVHdpbGlvIFN5bmMgc2VydmljZS5cbiAqL1xudHlwZSBIYW5kbGVyRW52aXJvbm1lbnQgPSB7XG4gICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICBTQ1JJUFRfSUQ6IHN0cmluZztcbiAgICBTWU5DX1NJRDogc3RyaW5nO1xufTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciB1c2VyIGNyZWRlbnRpYWxzLlxuICogQHR5cGVkZWYge09iamVjdH0gVXNlckNyZWRzQ29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZyB8IHVuZGVmaW5lZCB8IG51bGx9IE5TUF9FTUFJTF9ET01BSU4gLSBUaGUgZW1haWwgZG9tYWluIGZvciBOU1AuXG4gKi9cbnR5cGUgVXNlckNyZWRzQ29uZmlnID0ge1xuICAgIE5TUF9FTUFJTF9ET01BSU46IHN0cmluZyB8IHVuZGVmaW5lZCB8IG51bGw7XG59O1xuY29uc3QgdXNlcl9jcmVkc19jb25maWc6IFVzZXJDcmVkc0NvbmZpZyA9IHtcbiAgICBOU1BfRU1BSUxfRE9NQUlOOiBcImZhcndlc3Qub3JnXCIsXG59O1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIGZpbmRpbmcgYSBwYXRyb2xsZXIuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBGaW5kUGF0cm9sbGVyQ29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gUEhPTkVfTlVNQkVSX0xPT0tVUF9TSEVFVCAtIFRoZSByYW5nZSBmb3IgcGhvbmUgbnVtYmVyIGxvb2t1cC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBQSE9ORV9OVU1CRVJfTlVNQkVSX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIHBob25lIG51bWJlcnMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gUEhPTkVfTlVNQkVSX05BTUVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgbmFtZXMuXG4gKi9cbnR5cGUgRmluZFBhdHJvbGxlckNvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogc3RyaW5nO1xuICAgIFBIT05FX05VTUJFUl9MT09LVVBfU0hFRVQ6IHN0cmluZztcbiAgICBQSE9ORV9OVU1CRVJfTlVNQkVSX0NPTFVNTjogc3RyaW5nO1xuICAgIFBIT05FX05VTUJFUl9OQU1FX0NPTFVNTjogc3RyaW5nO1xufTtcblxuY29uc3QgZmluZF9wYXRyb2xsZXJfY29uZmlnOiBGaW5kUGF0cm9sbGVyQ29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBcInRlc3RcIixcbiAgICBQSE9ORV9OVU1CRVJfTE9PS1VQX1NIRUVUOiBcIlBob25lIE51bWJlcnMhQTI6QjEwMFwiLFxuICAgIFBIT05FX05VTUJFUl9OQU1FX0NPTFVNTjogXCJBXCIsXG4gICAgUEhPTkVfTlVNQkVSX05VTUJFUl9DT0xVTU46IFwiQlwiLFxufTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciB0aGUgbG9naW4gc2hlZXQuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBMb2dpblNoZWV0Q29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gTE9HSU5fU0hFRVRfTE9PS1VQIC0gVGhlIHJhbmdlIGZvciBsb2dpbiBzaGVldCBsb29rdXAuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQ0hFQ0tJTl9DT1VOVF9MT09LVVAgLSBUaGUgcmFuZ2UgZm9yIGNoZWNrLWluIGNvdW50IGxvb2t1cC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBBUkNISVZFRF9DRUxMIC0gVGhlIGNlbGwgZm9yIGFyY2hpdmVkIGRhdGEuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfREFURV9DRUxMIC0gVGhlIGNlbGwgZm9yIHRoZSBzaGVldCBkYXRlLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IENVUlJFTlRfREFURV9DRUxMIC0gVGhlIGNlbGwgZm9yIHRoZSBjdXJyZW50IGRhdGUuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gTkFNRV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBuYW1lcy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDQVRFR09SWV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBjYXRlZ29yaWVzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNFQ1RJT05fRFJPUERPV05fQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3Igc2VjdGlvbiBkcm9wZG93bi5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDSEVDS0lOX0RST1BET1dOX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIGNoZWNrLWluIGRyb3Bkb3duLlxuICovXG50eXBlIExvZ2luU2hlZXRDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICBMT0dJTl9TSEVFVF9MT09LVVA6IHN0cmluZztcbiAgICBDSEVDS0lOX0NPVU5UX0xPT0tVUDogc3RyaW5nO1xuICAgIEFSQ0hJVkVEX0NFTEw6IHN0cmluZztcbiAgICBTSEVFVF9EQVRFX0NFTEw6IHN0cmluZztcbiAgICBDVVJSRU5UX0RBVEVfQ0VMTDogc3RyaW5nO1xuICAgIE5BTUVfQ09MVU1OOiBzdHJpbmc7XG4gICAgQ0FURUdPUllfQ09MVU1OOiBzdHJpbmc7XG4gICAgU0VDVElPTl9EUk9QRE9XTl9DT0xVTU46IHN0cmluZztcbiAgICBDSEVDS0lOX0RST1BET1dOX0NPTFVNTjogc3RyaW5nO1xufTtcblxuY29uc3QgbG9naW5fc2hlZXRfY29uZmlnOiBMb2dpblNoZWV0Q29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBcInRlc3RcIixcbiAgICBMT0dJTl9TSEVFVF9MT09LVVA6IFwiTG9naW4hQTE6STEwMFwiLFxuICAgIENIRUNLSU5fQ09VTlRfTE9PS1VQOiBcIlRvb2xzIUcyOkcyXCIsXG4gICAgU0hFRVRfREFURV9DRUxMOiBcIkIxXCIsXG4gICAgQ1VSUkVOVF9EQVRFX0NFTEw6IFwiQjJcIixcbiAgICBBUkNISVZFRF9DRUxMOiBcIkgxXCIsXG4gICAgTkFNRV9DT0xVTU46IFwiQVwiLFxuICAgIENBVEVHT1JZX0NPTFVNTjogXCJCXCIsXG4gICAgU0VDVElPTl9EUk9QRE9XTl9DT0xVTU46IFwiSFwiLFxuICAgIENIRUNLSU5fRFJPUERPV05fQ09MVU1OOiBcIklcIixcbn07XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgdGhlIHNlYXNvbiBzaGVldC5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IFNlYXNvblNoZWV0Q29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0VBU09OX1NIRUVUIC0gVGhlIG5hbWUgb2YgdGhlIHNlYXNvbiBzaGVldC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTRUFTT05fU0hFRVRfREFZU19DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBzZWFzb24gc2hlZXQgZGF5cy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTRUFTT05fU0hFRVRfTkFNRV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBzZWFzb24gc2hlZXQgbmFtZXMuXG4gKi9cbnR5cGUgU2Vhc29uU2hlZXRDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICBTRUFTT05fU0hFRVQ6IHN0cmluZztcbiAgICBTRUFTT05fU0hFRVRfREFZU19DT0xVTU46IHN0cmluZztcbiAgICBTRUFTT05fU0hFRVRfTkFNRV9DT0xVTU46IHN0cmluZztcbn07XG5jb25zdCBzZWFzb25fc2hlZXRfY29uZmlnOiBTZWFzb25TaGVldENvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogXCJ0ZXN0XCIsXG4gICAgU0VBU09OX1NIRUVUOiBcIlNlYXNvblwiLFxuICAgIFNFQVNPTl9TSEVFVF9OQU1FX0NPTFVNTjogXCJCXCIsXG4gICAgU0VBU09OX1NIRUVUX0RBWVNfQ09MVU1OOiBcIkFcIixcbn07XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3Igc2VjdGlvbnMuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBTZWN0aW9uQ29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0VDVElPTl9WQUxVRVMgLSBUaGUgc2VjdGlvbiB2YWx1ZXMuXG4gKi9cbnR5cGUgU2VjdGlvbkNvbmZpZyA9IHtcbiAgICBTRUNUSU9OX1ZBTFVFUzogc3RyaW5nO1xufTtcbmNvbnN0IHNlY3Rpb25fY29uZmlnOiBTZWN0aW9uQ29uZmlnID0ge1xuICAgIFNFQ1RJT05fVkFMVUVTOiAgXCIxLDIsMyw0LFJvdmluZyxGQVIsVHJhaW5pbmdcIixcbn07XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgZ3Vlc3QgcGFzc2VzLlxuICogQHR5cGVkZWYge09iamVjdH0gR3Vlc3RQYXNzZXNDb25maWdcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTSEVFVF9JRCAtIFRoZSBJRCBvZiB0aGUgR29vZ2xlIFNoZWV0cyBzcHJlYWRzaGVldC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBHVUVTVF9QQVNTX1NIRUVUIC0gVGhlIG5hbWUgb2YgdGhlIGd1ZXN0IHBhc3Mgc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gR1VFU1RfUEFTU19FTElHSUJMRV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBndWVzdCBwYXNzICBlbGlnaWJpbGl0eSBjaGVja2JveCAoVFJVRS9GQUxTRSkuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gR1VFU1RfUEFTU19FTElHSUJMRV9SRUFTT05fQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgdGhlIGluZWxpZ2liaWxpdHkgcmVhc29uIHN0cmluZy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBHVUVTVF9QQVNTX1NIRUVUX0FWQUlMQUJMRV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBhdmFpbGFibGUgcGFzcyBjb3VudC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBHVUVTVF9QQVNTX1NIRUVUX1VTRURfVE9EQVlfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgcGFzc2VzIHVzZWQgdG9kYXkuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gR1VFU1RfUEFTU19TSEVFVF9VU0VEX1NFQVNPTl9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBwYXNzZXMgdXNlZCB0aGlzIHNlYXNvbi5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBHVUVTVF9QQVNTX1NIRUVUX0RBVEVTX1NUQVJUSU5HX0NPTFVNTiAtIFRoZSBjb2x1bW4gd2hlcmUgZGF0ZS1vZi11c2UgZW50cmllcyBiZWdpbi5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBHVUVTVF9QQVNTX1NIRUVUX05BTUVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgcGF0cm9sbGVyIG5hbWVzLlxuICovXG50eXBlIEd1ZXN0UGFzc2VzQ29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBzdHJpbmc7XG4gICAgR1VFU1RfUEFTU19TSEVFVDogc3RyaW5nO1xuICAgIEdVRVNUX1BBU1NfRUxJR0lCTEVfQ09MVU1OOiBzdHJpbmc7XG4gICAgR1VFU1RfUEFTU19FTElHSUJMRV9SRUFTT05fQ09MVU1OOiBzdHJpbmc7XG4gICAgR1VFU1RfUEFTU19TSEVFVF9BVkFJTEFCTEVfQ09MVU1OOiBzdHJpbmc7XG4gICAgR1VFU1RfUEFTU19TSEVFVF9VU0VEX1RPREFZX0NPTFVNTjogc3RyaW5nO1xuICAgIEdVRVNUX1BBU1NfU0hFRVRfVVNFRF9TRUFTT05fQ09MVU1OOiBzdHJpbmc7XG4gICAgR1VFU1RfUEFTU19TSEVFVF9EQVRFU19TVEFSVElOR19DT0xVTU46IHN0cmluZztcbiAgICBHVUVTVF9QQVNTX1NIRUVUX05BTUVfQ09MVU1OOiBzdHJpbmc7XG59O1xuY29uc3QgZ3Vlc3RfcGFzc2VzX2NvbmZpZzogR3Vlc3RQYXNzZXNDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IFwidGVzdFwiLFxuICAgIEdVRVNUX1BBU1NfU0hFRVQ6IFwiR3Vlc3RQYXNzZXNcIixcbiAgICBHVUVTVF9QQVNTX0VMSUdJQkxFX0NPTFVNTjogXCJCXCIsXG4gICAgR1VFU1RfUEFTU19FTElHSUJMRV9SRUFTT05fQ09MVU1OOiBcIkNcIixcbiAgICBHVUVTVF9QQVNTX1NIRUVUX05BTUVfQ09MVU1OOiBcIkFcIixcbiAgICBHVUVTVF9QQVNTX1NIRUVUX0FWQUlMQUJMRV9DT0xVTU46IFwiRFwiLFxuICAgIEdVRVNUX1BBU1NfU0hFRVRfVVNFRF9UT0RBWV9DT0xVTU46IFwiRVwiLFxuICAgIEdVRVNUX1BBU1NfU0hFRVRfVVNFRF9TRUFTT05fQ09MVU1OOiBcIkZcIixcbiAgICBHVUVTVF9QQVNTX1NIRUVUX0RBVEVTX1NUQVJUSU5HX0NPTFVNTjogXCJHXCIsXG59O1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIHRoZSBoYW5kbGVyLlxuICogQHR5cGVkZWYge09iamVjdH0gSGFuZGxlckNvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFNDUklQVF9JRCAtIFRoZSBJRCBvZiB0aGUgR29vZ2xlIEFwcHMgU2NyaXB0IHByb2plY3QuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU1lOQ19TSUQgLSBUaGUgU0lEIG9mIHRoZSBUd2lsaW8gU3luYyBzZXJ2aWNlLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFJFU0VUX0ZVTkNUSU9OX05BTUUgLSBUaGUgbmFtZSBvZiB0aGUgcmVzZXQgZnVuY3Rpb24uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQVJDSElWRV9GVU5DVElPTl9OQU1FIC0gVGhlIG5hbWUgb2YgdGhlIGFyY2hpdmUgZnVuY3Rpb24uXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFVTRV9TRVJWSUNFX0FDQ09VTlQgLSBXaGV0aGVyIHRvIHVzZSBhIHNlcnZpY2UgYWNjb3VudC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBBQ1RJT05fTE9HX1NIRUVUIC0gVGhlIG5hbWUgb2YgdGhlIGFjdGlvbiBsb2cgc2hlZXQuXG4gKiBAcHJvcGVydHkge0NoZWNraW5WYWx1ZVtdfSBDSEVDS0lOX1ZBTFVFUyAtIFRoZSBjaGVjay1pbiB2YWx1ZXMuXG4gKi9cbnR5cGUgSGFuZGxlckNvbmZpZyA9IHtcbiAgICBTQ1JJUFRfSUQ6IHN0cmluZztcbiAgICBTSEVFVF9JRDogc3RyaW5nO1xuICAgIFNZTkNfU0lEOiBzdHJpbmc7XG4gICAgUkVTRVRfRlVOQ1RJT05fTkFNRTogc3RyaW5nO1xuICAgIEFSQ0hJVkVfRlVOQ1RJT05fTkFNRTogc3RyaW5nO1xuICAgIFVTRV9TRVJWSUNFX0FDQ09VTlQ6IGJvb2xlYW47XG4gICAgQUNUSU9OX0xPR19TSEVFVDogc3RyaW5nO1xuICAgIENIRUNLSU5fVkFMVUVTOiBDaGVja2luVmFsdWVbXTtcbn07XG5jb25zdCBoYW5kbGVyX2NvbmZpZzogSGFuZGxlckNvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogXCJ0ZXN0XCIsXG4gICAgU0NSSVBUX0lEOiBcInRlc3RcIixcbiAgICBTWU5DX1NJRDogXCJ0ZXN0XCIsXG4gICAgQVJDSElWRV9GVU5DVElPTl9OQU1FOiBcIkFyY2hpdmVcIixcbiAgICBSRVNFVF9GVU5DVElPTl9OQU1FOiBcIlJlc2V0XCIsXG4gICAgVVNFX1NFUlZJQ0VfQUNDT1VOVDogdHJ1ZSxcbiAgICBBQ1RJT05fTE9HX1NIRUVUOiBcIkJvdF9Vc2FnZVwiLFxuICAgIENIRUNLSU5fVkFMVUVTOiBbXG4gICAgICAgIG5ldyBDaGVja2luVmFsdWUoXCJkYXlcIiwgXCJBbGwgRGF5XCIsIFwiYWxsIGRheS9EQVlcIiwgW1wiY2hlY2tpbi1kYXlcIl0pLFxuICAgICAgICBuZXcgQ2hlY2tpblZhbHVlKFwiYW1cIiwgXCJIYWxmIEFNXCIsIFwibW9ybmluZy9BTVwiLCBbXCJjaGVja2luLWFtXCJdKSxcbiAgICAgICAgbmV3IENoZWNraW5WYWx1ZShcInBtXCIsIFwiSGFsZiBQTVwiLCBcImFmdGVybm9vbi9QTVwiLCBbXCJjaGVja2luLXBtXCJdKSxcbiAgICAgICAgbmV3IENoZWNraW5WYWx1ZShcIm91dFwiLCBcIkNoZWNrZWQgT3V0XCIsIFwiY2hlY2sgb3V0L09VVFwiLCBbXCJjaGVja291dFwiLCBcImNoZWNrLW91dFwiXSksXG4gICAgXSxcbn07XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgcGF0cm9sbGVyIHJvd3MuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBQYXRyb2xsZXJSb3dDb25maWdcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBOQU1FX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIG5hbWVzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IENBVEVHT1JZX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIGNhdGVnb3JpZXMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0VDVElPTl9EUk9QRE9XTl9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBzZWN0aW9uIGRyb3Bkb3duLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IENIRUNLSU5fRFJPUERPV05fQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgY2hlY2staW4gZHJvcGRvd24uXG4gKi9cbnR5cGUgUGF0cm9sbGVyUm93Q29uZmlnID0ge1xuICAgIE5BTUVfQ09MVU1OOiBzdHJpbmc7XG4gICAgQ0FURUdPUllfQ09MVU1OOiBzdHJpbmc7XG4gICAgU0VDVElPTl9EUk9QRE9XTl9DT0xVTU46IHN0cmluZztcbiAgICBDSEVDS0lOX0RST1BET1dOX0NPTFVNTjogc3RyaW5nO1xufTtcblxuLyoqXG4gKiBDb21iaW5lZCBjb25maWd1cmF0aW9uIHR5cGUuXG4gKiBAdHlwZWRlZiB7SGFuZGxlckVudmlyb25tZW50ICYgVXNlckNyZWRzQ29uZmlnICYgRmluZFBhdHJvbGxlckNvbmZpZyAmIExvZ2luU2hlZXRDb25maWcgJiBTZWFzb25TaGVldENvbmZpZyAmIFNlY3Rpb25Db25maWcgJiBHdWVzdFBhc3Nlc0NvbmZpZyAmIEhhbmRsZXJDb25maWcgJiBQYXRyb2xsZXJSb3dDb25maWd9IENvbWJpbmVkQ29uZmlnXG4gKi9cbnR5cGUgQ29tYmluZWRDb25maWcgPSBIYW5kbGVyRW52aXJvbm1lbnQgJlxuICAgIFVzZXJDcmVkc0NvbmZpZyAmXG4gICAgRmluZFBhdHJvbGxlckNvbmZpZyAmXG4gICAgTG9naW5TaGVldENvbmZpZyAmXG4gICAgU2Vhc29uU2hlZXRDb25maWcgJlxuICAgIFNlY3Rpb25Db25maWcgJlxuICAgIEd1ZXN0UGFzc2VzQ29uZmlnICZcbiAgICBIYW5kbGVyQ29uZmlnICZcbiAgICBQYXRyb2xsZXJSb3dDb25maWc7XG5cbmNvbnN0IENPTkZJRzogQ29tYmluZWRDb25maWcgPSB7XG4gICAgLi4uaGFuZGxlcl9jb25maWcsXG4gICAgLi4uZmluZF9wYXRyb2xsZXJfY29uZmlnLFxuICAgIC4uLmxvZ2luX3NoZWV0X2NvbmZpZyxcbiAgICAuLi5ndWVzdF9wYXNzZXNfY29uZmlnLFxuICAgIC4uLnNlYXNvbl9zaGVldF9jb25maWcsXG4gICAgLi4udXNlcl9jcmVkc19jb25maWcsXG4gICAgLi4uc2VjdGlvbl9jb25maWcsXG59O1xuXG5leHBvcnQge1xuICAgIENPTkZJRyxcbiAgICBDb21iaW5lZENvbmZpZyxcbiAgICBTZWN0aW9uQ29uZmlnLFxuICAgIEd1ZXN0UGFzc2VzQ29uZmlnLFxuICAgIEZpbmRQYXRyb2xsZXJDb25maWcsXG4gICAgSGFuZGxlckNvbmZpZyxcbiAgICBIYW5kbGVyRW52aXJvbm1lbnQsXG4gICAgVXNlckNyZWRzQ29uZmlnLFxuICAgIExvZ2luU2hlZXRDb25maWcsXG4gICAgU2Vhc29uU2hlZXRDb25maWcsXG4gICAgUGF0cm9sbGVyUm93Q29uZmlnLFxufTsiLCJpbXBvcnQgXCJAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzXCI7XG5pbXBvcnQge1xuICAgIENvbnRleHQsXG4gICAgU2VydmVybGVzc0V2ZW50T2JqZWN0LFxuICAgIFNlcnZpY2VDb250ZXh0LFxuICAgIFR3aWxpb0NsaWVudCxcbn0gZnJvbSBcIkB0d2lsaW8tbGFicy9zZXJ2ZXJsZXNzLXJ1bnRpbWUtdHlwZXMvdHlwZXNcIjtcbmltcG9ydCB7Z29vZ2xlLCBzY3JpcHRfdjEsIHNoZWV0c192NH0gZnJvbSBcImdvb2dsZWFwaXNcIjtcbmltcG9ydCB7R29vZ2xlQXV0aH0gZnJvbSBcImdvb2dsZWFwaXMtY29tbW9uXCI7XG5pbXBvcnQge1xuICAgIENvbWJpbmVkQ29uZmlnLFxuICAgIENPTkZJRyxcbiAgICBGaW5kUGF0cm9sbGVyQ29uZmlnLFxuICAgIEd1ZXN0UGFzc2VzQ29uZmlnLFxuICAgIEhhbmRsZXJDb25maWcsXG4gICAgSGFuZGxlckVudmlyb25tZW50LFxuICAgIExvZ2luU2hlZXRDb25maWcsXG4gICAgU2Vhc29uU2hlZXRDb25maWcsXG59IGZyb20gXCIuLi9lbnYvaGFuZGxlcl9jb25maWdcIjtcbmltcG9ydCBMb2dpblNoZWV0LCB7UGF0cm9sbGVyUm93fSBmcm9tIFwiLi4vc2hlZXRzL2xvZ2luX3NoZWV0XCI7XG5pbXBvcnQgU2Vhc29uU2hlZXQgZnJvbSBcIi4uL3NoZWV0cy9zZWFzb25fc2hlZXRcIjtcbmltcG9ydCB7VXNlckNyZWRzfSBmcm9tIFwiLi4vdXNlci1jcmVkc1wiO1xuaW1wb3J0IHtDaGVja2luVmFsdWVzfSBmcm9tIFwiLi4vdXRpbHMvY2hlY2tpbl92YWx1ZXNcIjtcbmltcG9ydCB7Z2V0X3NlcnZpY2VfY3JlZGVudGlhbHNfcGF0aH0gZnJvbSBcIi4uL3V0aWxzL2ZpbGVfdXRpbHNcIjtcbmltcG9ydCB7ZXhjZWxfcm93X3RvX2luZGV4LCBzYW5pdGl6ZV9waG9uZV9udW1iZXJ9IGZyb20gXCIuLi91dGlscy91dGlsXCI7XG5pbXBvcnQge2J1aWxkX3Bhc3Nlc19zdHJpbmcsfSBmcm9tIFwiLi4vdXRpbHMvZ3Vlc3RfcGFzc2VzXCI7XG5pbXBvcnQge0d1ZXN0UGFzc1NoZWV0fSBmcm9tIFwiLi4vc2hlZXRzL2d1ZXN0X3Bhc3Nfc2hlZXRcIjtcbmltcG9ydCB7U2VjdGlvblZhbHVlc30gZnJvbSAnLi4vdXRpbHMvc2VjdGlvbl92YWx1ZXMnO1xuXG5leHBvcnQgdHlwZSBCVk5TUFJlc3BvbnNlID0ge1xuICAgIHJlc3BvbnNlPzogc3RyaW5nO1xuICAgIG5leHRfc3RlcD86IHN0cmluZztcbn07XG5leHBvcnQgdHlwZSBCVk5TUEV2ZW50ID0gU2VydmVybGVzc0V2ZW50T2JqZWN0PFxuICAgIHtcbiAgICAgICAgRnJvbTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgICBUbzogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgICBudW1iZXI6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAgICAgdGVzdF9udW1iZXI6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAgICAgQm9keTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIH0sXG4gICAge30sXG4gICAge1xuICAgICAgICBidm5zcF9uZXh0X3N0ZXA6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICB9XG4+O1xuXG5leHBvcnQgY29uc3QgTkVYVF9TVEVQUyA9IHtcbiAgICBBV0FJVF9DT01NQU5EOiBcImF3YWl0LWNvbW1hbmRcIixcbiAgICBBV0FJVF9DSEVDS0lOOiBcImF3YWl0LWNoZWNraW5cIixcbiAgICBDT05GSVJNX1JFU0VUOiBcImNvbmZpcm0tcmVzZXRcIixcbiAgICBBVVRIX1JFU0VUOiBcImF1dGgtcmVzZXRcIixcbiAgICBBV0FJVF9TRUNUSU9OOiBcImF3YWl0LXNlY3Rpb25cIixcbiAgICBBV0FJVF9QQVNTOiBcImF3YWl0LXBhc3NcIixcbiAgICBBV0FJVF9NRVNTQUdFOiBcImF3YWl0LW1lc3NhZ2VcIixcbiAgICBBV0FJVF9CUk9BRENBU1Q6IFwiYXdhaXQtYnJvYWRjYXN0XCIsXG59O1xuXG5jb25zdCBDT01NQU5EUyA9IHtcbiAgICBPTl9EVVRZOiBbXCJvbmR1dHlcIiwgXCJvbi1kdXR5XCJdLFxuICAgIFNUQVRVUzogW1wic3RhdHVzXCJdLFxuICAgIENIRUNLSU46IFtcImNoZWNraW5cIiwgXCJjaGVjay1pblwiXSxcbiAgICBTRUNUSU9OX0FTU0lHTk1FTlQ6IFtcInNlY3Rpb25cIiwgXCJzZWN0aW9uLWFzc2lnbm1lbnRcIiwgXCJzZWN0aW9uYXNzaWdubWVudFwiLCBcImFzc2lnbm1lbnRcIl0sXG4gICAgR1VFU1RfUEFTUzogW1wiZ3Vlc3QtcGFzc1wiLCBcImd1ZXN0cGFzc1wiLCBcImd1ZXN0XCJdLFxuICAgIFdIQVRTQVBQOiBbXCJ3aGF0c2FwcFwiXSxcbiAgICBNRVNTQUdFOiBbXCJtZXNzYWdlXCIsIFwibXNnXCJdLFxuICAgIEJST0FEQ0FTVDogW1wiYnJvYWRjYXN0XCJdLFxufTtcblxuZXhwb3J0IGNvbnN0IFNNU19NQVhfTEVOR1RIID0gMTYwO1xuZXhwb3J0IGNvbnN0IE1FU1NBR0VfUFJFRklYX1RFTVBMQVRFID0gXCJNZXNzYWdlIGZyb20gXCI7XG5leHBvcnQgY29uc3QgTUVTU0FHRV9QUkVGSVhfU1VGRklYID0gXCI6IFwiO1xuXG4vKipcbiAqIFJlc3VsdCBvZiB2YWxpZGF0aW5nIGFuIFNNUyBtZXNzYWdlIGZvciBHU00tNyBjb21wYXRpYmlsaXR5IGFuZCBzZWdtZW50IGNvdW50LlxuICovXG5leHBvcnQgdHlwZSBTbXNWYWxpZGF0aW9uUmVzdWx0ID0ge1xuICAgIC8qKiBXaGV0aGVyIHRoZSBtZXNzYWdlIGlzIHZhbGlkIChHU00tNyBvbmx5IGFuZCBmaXRzIGluIGEgc2luZ2xlIHNlZ21lbnQpLiAqL1xuICAgIHZhbGlkOiBib29sZWFuO1xuICAgIC8qKiBJZiBpbnZhbGlkLCB0aGUgcmVhc29uOiAnbm9uX2dzbTcnIG9yICd0b29fbWFueV9zZWdtZW50cycuICovXG4gICAgcmVhc29uPzogXCJub25fZ3NtN1wiIHwgXCJ0b29fbWFueV9zZWdtZW50c1wiO1xuICAgIC8qKiBUaGUgbm9uLUdTTS03IGNoYXJhY3RlcnMgZm91bmQsIGlmIGFueS4gKi9cbiAgICBub25fZ3NtX2NoYXJhY3RlcnM/OiBzdHJpbmdbXTtcbiAgICAvKiogVGhlIG51bWJlciBvZiBTTVMgc2VnbWVudHMgdGhlIG1lc3NhZ2Ugd291bGQgcmVxdWlyZS4gKi9cbiAgICBzZWdtZW50c19jb3VudD86IG51bWJlcjtcbn07XG5cbi8qKlxuICogVmFsaWRhdGVzIHRoYXQgYSBjb21wbGV0ZSBTTVMgbWVzc2FnZSAocHJlZml4ICsgYm9keSkgdXNlcyBvbmx5IEdTTS03IGNoYXJhY3RlcnNcbiAqIGFuZCBmaXRzIHdpdGhpbiBhIHNpbmdsZSBTTVMgc2VnbWVudC5cbiAqXG4gKiBVc2VzIHRoZSBzbXMtc2VnbWVudHMtY2FsY3VsYXRvciBsaWJyYXJ5IChtYWludGFpbmVkIGJ5IFR3aWxpb0RldkVkKSB3aGljaFxuICogcHJvdmlkZXMgYXV0aG9yaXRhdGl2ZSBHU00tNyBjaGFyYWN0ZXIgZGV0ZWN0aW9uLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmdWxsX21lc3NhZ2UgLSBUaGUgY29tcGxldGUgbWVzc2FnZSB0byB2YWxpZGF0ZSAocHJlZml4ICsgdXNlciB0ZXh0KS5cbiAqIEByZXR1cm5zIHtTbXNWYWxpZGF0aW9uUmVzdWx0fSBUaGUgdmFsaWRhdGlvbiByZXN1bHQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZV9zbXNfbWVzc2FnZShmdWxsX21lc3NhZ2U6IHN0cmluZyk6IFNtc1ZhbGlkYXRpb25SZXN1bHQge1xuICAgIGNvbnN0IHsgU2VnbWVudGVkTWVzc2FnZSB9ID0gcmVxdWlyZShcInNtcy1zZWdtZW50cy1jYWxjdWxhdG9yXCIpO1xuICAgIGNvbnN0IHNlZ21lbnRlZCA9IG5ldyBTZWdtZW50ZWRNZXNzYWdlKGZ1bGxfbWVzc2FnZSk7XG4gICAgY29uc3Qgbm9uX2dzbSA9IHNlZ21lbnRlZC5nZXROb25Hc21DaGFyYWN0ZXJzKCkgYXMgc3RyaW5nW107XG5cbiAgICBpZiAobm9uX2dzbS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWxpZDogZmFsc2UsXG4gICAgICAgICAgICByZWFzb246IFwibm9uX2dzbTdcIixcbiAgICAgICAgICAgIG5vbl9nc21fY2hhcmFjdGVyczogWy4uLm5ldyBTZXQobm9uX2dzbSldLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGlmIChzZWdtZW50ZWQuc2VnbWVudHNDb3VudCA+IDEpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgICAgICAgIHJlYXNvbjogXCJ0b29fbWFueV9zZWdtZW50c1wiLFxuICAgICAgICAgICAgc2VnbWVudHNfY291bnQ6IHNlZ21lbnRlZC5zZWdtZW50c0NvdW50LFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB7IHZhbGlkOiB0cnVlIH07XG59XG5cbi8qKlxuICogRm9ybWF0cyBhIDEwLWRpZ2l0IHBob25lIG51bWJlciBzdHJpbmcgYXMgKFhYWClYWFgtWFhYWCBmb3IgZGlzcGxheS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZW5fZGlnaXRzIC0gQSAxMC1kaWdpdCBwaG9uZSBudW1iZXIgc3RyaW5nIChlLmcuIFwiMTIzNDU2Nzg5MFwiKS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgcGhvbmUgbnVtYmVyIChlLmcuIFwiKDEyMyk0NTYtNzg5MFwiKS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdF9waG9uZV9mb3JfZGlzcGxheSh0ZW5fZGlnaXRzOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBgKCR7dGVuX2RpZ2l0cy5zdWJzdHJpbmcoMCwgMyl9KSR7dGVuX2RpZ2l0cy5zdWJzdHJpbmcoMywgNil9LSR7dGVuX2RpZ2l0cy5zdWJzdHJpbmcoNiwgMTApfWA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJWTlNQSGFuZGxlciB7XG4gICAgU0NPUEVTOiBzdHJpbmdbXSA9IFtcImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvc3ByZWFkc2hlZXRzXCJdO1xuXG4gICAgc21zX3JlcXVlc3Q6IGJvb2xlYW47XG4gICAgcmVzdWx0X21lc3NhZ2VzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGZyb206IHN0cmluZztcbiAgICB0bzogc3RyaW5nO1xuICAgIGJvZHk6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBib2R5X3Jhdzogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIHBhdHJvbGxlcjogUGF0cm9sbGVyUm93IHwgbnVsbDtcbiAgICBidm5zcF9uZXh0X3N0ZXA6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBjaGVja2luX21vZGU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICAgIGZhc3RfY2hlY2tpbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGFzc2lnbmVkX3NlY3Rpb246IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gICAgdHdpbGlvX2NsaWVudDogVHdpbGlvQ2xpZW50IHwgbnVsbCA9IG51bGw7XG4gICAgc3luY19zaWQ6IHN0cmluZztcbiAgICByZXNldF9zY3JpcHRfaWQ6IHN0cmluZztcblxuICAgIC8vIENhY2hlIGNsaWVudHNcbiAgICBzeW5jX2NsaWVudDogU2VydmljZUNvbnRleHQgfCBudWxsID0gbnVsbDtcbiAgICB1c2VyX2NyZWRzOiBVc2VyQ3JlZHMgfCBudWxsID0gbnVsbDtcbiAgICBzZXJ2aWNlX2NyZWRzOiBHb29nbGVBdXRoIHwgbnVsbCA9IG51bGw7XG4gICAgc2hlZXRzX3NlcnZpY2U6IHNoZWV0c192NC5TaGVldHMgfCBudWxsID0gbnVsbDtcbiAgICB1c2VyX3NjcmlwdHNfc2VydmljZTogc2NyaXB0X3YxLlNjcmlwdCB8IG51bGwgPSBudWxsO1xuXG4gICAgbG9naW5fc2hlZXQ6IExvZ2luU2hlZXQgfCBudWxsID0gbnVsbDtcbiAgICBzZWFzb25fc2hlZXQ6IFNlYXNvblNoZWV0IHwgbnVsbCA9IG51bGw7XG4gICAgZ3Vlc3RfcGFzc19zaGVldDogR3Vlc3RQYXNzU2hlZXQgfCBudWxsID0gbnVsbDtcblxuICAgIGNoZWNraW5fdmFsdWVzOiBDaGVja2luVmFsdWVzO1xuICAgIGN1cnJlbnRfc2hlZXRfZGF0ZTogRGF0ZTtcblxuICAgIGNvbWJpbmVkX2NvbmZpZzogQ29tYmluZWRDb25maWc7XG4gICAgY29uZmlnOiBIYW5kbGVyQ29uZmlnO1xuXG4gICAgc2VjdGlvbl92YWx1ZXM6IFNlY3Rpb25WYWx1ZXM7XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGEgbmV3IEJWTlNQSGFuZGxlci5cbiAgICAgKiBAcGFyYW0ge0NvbnRleHQ8SGFuZGxlckVudmlyb25tZW50Pn0gY29udGV4dCAtIFRoZSBzZXJ2ZXJsZXNzIGZ1bmN0aW9uIGNvbnRleHQuXG4gICAgICogQHBhcmFtIHtTZXJ2ZXJsZXNzRXZlbnRPYmplY3Q8QlZOU1BFdmVudD59IGV2ZW50IC0gVGhlIGV2ZW50IG9iamVjdC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgY29udGV4dDogQ29udGV4dDxIYW5kbGVyRW52aXJvbm1lbnQ+LFxuICAgICAgICBldmVudDogU2VydmVybGVzc0V2ZW50T2JqZWN0PEJWTlNQRXZlbnQ+XG4gICAgKSB7XG4gICAgICAgIC8vIERldGVybWluZSBtZXNzYWdlIGRldGFpbHMgZnJvbSB0aGUgaW5jb21pbmcgZXZlbnQsIHdpdGggZmFsbGJhY2sgdmFsdWVzXG4gICAgICAgIHRoaXMuc21zX3JlcXVlc3QgPSAoZXZlbnQuRnJvbSB8fCBldmVudC5udW1iZXIpICE9PSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZnJvbSA9IGV2ZW50LkZyb20gfHwgZXZlbnQubnVtYmVyIHx8IGV2ZW50LnRlc3RfbnVtYmVyITtcbiAgICAgICAgdGhpcy50byA9IHNhbml0aXplX3Bob25lX251bWJlcihldmVudC5UbyEpO1xuICAgICAgICB0aGlzLmJvZHkgPSBldmVudC5Cb2R5Py50b0xvd2VyQ2FzZSgpPy50cmltKCkucmVwbGFjZSgvXFxzKy8sIFwiLVwiKTtcbiAgICAgICAgdGhpcy5ib2R5X3JhdyA9IGV2ZW50LkJvZHlcbiAgICAgICAgdGhpcy5idm5zcF9uZXh0X3N0ZXAgPVxuICAgICAgICAgICAgZXZlbnQucmVxdWVzdC5jb29raWVzLmJ2bnNwX25leHRfc3RlcDtcbiAgICAgICAgdGhpcy5jb21iaW5lZF9jb25maWcgPSB7IC4uLkNPTkZJRywgLi4uY29udGV4dCB9O1xuICAgICAgICB0aGlzLmNvbmZpZyA9IHRoaXMuY29tYmluZWRfY29uZmlnO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLnR3aWxpb19jbGllbnQgPSBjb250ZXh0LmdldFR3aWxpb0NsaWVudCgpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGluaXRpYWxpemluZyB0d2lsaW9fY2xpZW50XCIsIGUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3luY19zaWQgPSBjb250ZXh0LlNZTkNfU0lEO1xuICAgICAgICB0aGlzLnJlc2V0X3NjcmlwdF9pZCA9IGNvbnRleHQuU0NSSVBUX0lEO1xuICAgICAgICB0aGlzLnBhdHJvbGxlciA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5jaGVja2luX3ZhbHVlcyA9IG5ldyBDaGVja2luVmFsdWVzKENPTkZJRy5DSEVDS0lOX1ZBTFVFUyk7XG4gICAgICAgIHRoaXMuY3VycmVudF9zaGVldF9kYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgdGhpcy5zZWN0aW9uX3ZhbHVlcyA9IG5ldyBTZWN0aW9uVmFsdWVzKHRoaXMuY29tYmluZWRfY29uZmlnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZXMgdGhlIGZhc3QgY2hlY2staW4gbW9kZSBmcm9tIHRoZSBtZXNzYWdlIGJvZHkuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHkgLSBUaGUgbWVzc2FnZSBib2R5LlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIGZhc3QgY2hlY2staW4gbW9kZSBpcyBwYXJzZWQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKi9cbiAgICBwYXJzZV9mYXN0X2NoZWNraW5fbW9kZShib2R5OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgcGFyc2VkID0gdGhpcy5jaGVja2luX3ZhbHVlcy5wYXJzZV9mYXN0X2NoZWNraW4oYm9keSk7XG4gICAgICAgIGlmIChwYXJzZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5jaGVja2luX21vZGUgPSBwYXJzZWQua2V5O1xuICAgICAgICAgICAgdGhpcy5mYXN0X2NoZWNraW4gPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlcyB0aGUgY2hlY2staW4gbW9kZSBmcm9tIHRoZSBtZXNzYWdlIGJvZHkuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHkgLSBUaGUgbWVzc2FnZSBib2R5LlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIGNoZWNrLWluIG1vZGUgaXMgcGFyc2VkLCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICovXG4gICAgcGFyc2VfY2hlY2tpbihib2R5OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgcGFyc2VkID0gdGhpcy5jaGVja2luX3ZhbHVlcy5wYXJzZV9jaGVja2luKGJvZHkpO1xuICAgICAgICBpZiAocGFyc2VkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tpbl9tb2RlID0gcGFyc2VkLmtleTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZXMgdGhlIGNoZWNrLWluIG1vZGUgZnJvbSB0aGUgbmV4dCBzdGVwLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIGNoZWNrLWluIG1vZGUgaXMgcGFyc2VkLCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICovXG4gICAgcGFyc2VfY2hlY2tpbl9mcm9tX25leHRfc3RlcCgpIHtcbiAgICAgICAgY29uc3QgbGFzdF9zZWdtZW50ID0gdGhpcy5idm5zcF9uZXh0X3N0ZXBcbiAgICAgICAgICAgID8uc3BsaXQoXCItXCIpXG4gICAgICAgICAgICAuc2xpY2UoLTEpWzBdO1xuICAgICAgICBpZiAobGFzdF9zZWdtZW50ICYmIGxhc3Rfc2VnbWVudCBpbiB0aGlzLmNoZWNraW5fdmFsdWVzLmJ5X2tleSkge1xuICAgICAgICAgICAgdGhpcy5jaGVja2luX21vZGUgPSBsYXN0X3NlZ21lbnQ7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVsYXlzIHRoZSBleGVjdXRpb24gZm9yIGEgc3BlY2lmaWVkIG51bWJlciBvZiBzZWNvbmRzLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZWNvbmRzIC0gVGhlIG51bWJlciBvZiBzZWNvbmRzIHRvIGRlbGF5LlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbmFsPWZhbHNlXSAtIFdoZXRoZXIgdGhlIGRlbGF5IGlzIG9wdGlvbmFsLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyBhZnRlciB0aGUgZGVsYXkuXG4gICAgICovXG4gICAgZGVsYXkoc2Vjb25kczogbnVtYmVyLCBvcHRpb25hbDogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGlmIChvcHRpb25hbCAmJiAhdGhpcy5zbXNfcmVxdWVzdCkge1xuICAgICAgICAgICAgc2Vjb25kcyA9IDEgLyAxMDAwLjA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMpID0+IHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQocmVzLCBzZWNvbmRzICogMTAwMCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbmRzIGEgbWVzc2FnZSB0byB0aGUgdXNlci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIFRoZSBtZXNzYWdlIHRvIHNlbmQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIG1lc3NhZ2UgaXMgc2VudC5cbiAgICAgKi9cbiAgICBhc3luYyBzZW5kX21lc3NhZ2UobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLnNtc19yZXF1ZXN0KSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmdldF90d2lsaW9fY2xpZW50KCkubWVzc2FnZXMuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICB0bzogdGhpcy5mcm9tLFxuICAgICAgICAgICAgICAgIGZyb206IHRoaXMudG8sXG4gICAgICAgICAgICAgICAgYm9keTogbWVzc2FnZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZXN1bHRfbWVzc2FnZXMucHVzaChtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgdGhlIGNoZWNrLWluIHByb2Nlc3MuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGNoZWNrLWluIHJlc3BvbnNlLlxuICAgICAqL1xuICAgIGFzeW5jIGhhbmRsZSgpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5faGFuZGxlKCk7XG4gICAgICAgIGlmICghdGhpcy5zbXNfcmVxdWVzdCkge1xuICAgICAgICAgICAgaWYgKHJlc3VsdD8ucmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdF9tZXNzYWdlcy5wdXNoKHJlc3VsdC5yZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiB0aGlzLnJlc3VsdF9tZXNzYWdlcy5qb2luKFwiXFxuIyMjXFxuXCIpLFxuICAgICAgICAgICAgICAgIG5leHRfc3RlcDogcmVzdWx0Py5uZXh0X3N0ZXAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW50ZXJuYWwgbWV0aG9kIHRvIGhhbmRsZSB0aGUgY2hlY2staW4gcHJvY2Vzcy5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgY2hlY2staW4gcmVzcG9uc2UuXG4gICAgICovXG4gICAgYXN5bmMgX2hhbmRsZSgpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICBgUmVjZWl2ZWQgcmVxdWVzdCBmcm9tICR7dGhpcy5mcm9tfSB3aXRoIGJvZHk6ICR7dGhpcy5ib2R5fSBhbmQgc3RhdGUgJHt0aGlzLmJ2bnNwX25leHRfc3RlcH1gXG4gICAgICAgICk7XG4gICAgICAgIGlmICh0aGlzLmJvZHkgPT0gXCJsb2dvdXRcIikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmZvcm1pbmcgbG9nb3V0YCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5sb2dvdXQoKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVzcG9uc2U6IEJWTlNQUmVzcG9uc2UgfCB1bmRlZmluZWQ7XG4gICAgICAgIGlmICghdGhpcy5jb25maWcuVVNFX1NFUlZJQ0VfQUNDT1VOVCkge1xuICAgICAgICAgICAgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmNoZWNrX3VzZXJfY3JlZHMoKTtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZSkgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmJvZHk/LnRvTG93ZXJDYXNlKCkgPT09IFwicmVzdGFydFwiKSB7XG4gICAgICAgICAgICByZXR1cm4geyByZXNwb25zZTogXCJPa2F5LiBUZXh0IG1lIGFnYWluIHRvIHN0YXJ0IG92ZXIuLi5cIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmdldF9tYXBwZWRfcGF0cm9sbGVyKCk7XG4gICAgICAgIGlmIChyZXNwb25zZSB8fCB0aGlzLnBhdHJvbGxlciA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIHJlc3BvbnNlIHx8IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2U6IFwiVW5leHBlY3RlZCBlcnJvciBsb29raW5nIHVwIHBhdHJvbGxlciBtYXBwaW5nXCIsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgICghdGhpcy5idm5zcF9uZXh0X3N0ZXAgfHxcbiAgICAgICAgICAgICAgICB0aGlzLmJ2bnNwX25leHRfc3RlcCA9PSBORVhUX1NURVBTLkFXQUlUX0NPTU1BTkQpICYmXG4gICAgICAgICAgICB0aGlzLmJvZHlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zdCBhd2FpdF9yZXNwb25zZSA9IGF3YWl0IHRoaXMuaGFuZGxlX2F3YWl0X2NvbW1hbmQoKTtcbiAgICAgICAgICAgIGlmIChhd2FpdF9yZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdF9yZXNwb25zZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHRoaXMuYnZuc3BfbmV4dF9zdGVwID09IE5FWFRfU1RFUFMuQVdBSVRfQ0hFQ0tJTiAmJlxuICAgICAgICAgICAgdGhpcy5ib2R5XG4gICAgICAgICkge1xuICAgICAgICAgICAgaWYgKHRoaXMucGFyc2VfY2hlY2tpbih0aGlzLmJvZHkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuY2hlY2tpbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgdGhpcy5idm5zcF9uZXh0X3N0ZXA/LnN0YXJ0c1dpdGgoXG4gICAgICAgICAgICAgICAgTkVYVF9TVEVQUy5DT05GSVJNX1JFU0VUXG4gICAgICAgICAgICApICYmXG4gICAgICAgICAgICB0aGlzLmJvZHlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5ib2R5ID09IFwieWVzXCIgJiYgdGhpcy5wYXJzZV9jaGVja2luX2Zyb21fbmV4dF9zdGVwKCkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICAgICAgYFBlcmZvcm1pbmcgcmVzZXRfc2hlZXRfZmxvdyBmb3IgJHt0aGlzLnBhdHJvbGxlci5uYW1lfSB3aXRoIGNoZWNraW4gbW9kZTogJHt0aGlzLmNoZWNraW5fbW9kZX1gXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAoYXdhaXQgdGhpcy5yZXNldF9zaGVldF9mbG93KCkpIHx8IChhd2FpdCB0aGlzLmNoZWNraW4oKSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgdGhpcy5idm5zcF9uZXh0X3N0ZXA/LnN0YXJ0c1dpdGgoTkVYVF9TVEVQUy5BVVRIX1JFU0VUKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcnNlX2NoZWNraW5fZnJvbV9uZXh0X3N0ZXAoKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgICAgICBgUGVyZm9ybWluZyByZXNldF9zaGVldF9mbG93LXBvc3QtYXV0aCBmb3IgJHt0aGlzLnBhdHJvbGxlci5uYW1lfSB3aXRoIGNoZWNraW4gbW9kZTogJHt0aGlzLmNoZWNraW5fbW9kZX1gXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAoYXdhaXQgdGhpcy5yZXNldF9zaGVldF9mbG93KCkpIHx8IChhd2FpdCB0aGlzLmNoZWNraW4oKSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgdGhpcy5idm5zcF9uZXh0X3N0ZXA/LnN0YXJ0c1dpdGgoTkVYVF9TVEVQUy5BV0FJVF9TRUNUSU9OKSAmJlxuICAgICAgICAgICAgdGhpcy5ib2R5XG4gICAgICAgICkge1xuICAgICAgICAgICAgY29uc3Qgc2VjdGlvbiA9IHRoaXMuc2VjdGlvbl92YWx1ZXMucGFyc2Vfc2VjdGlvbih0aGlzLmJvZHkpXG4gICAgICAgICAgICBpZiAoc2VjdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmFzc2lnbl9zZWN0aW9uKHNlY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucHJvbXB0X3NlY3Rpb25fYXNzaWdubWVudCgpO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgdGhpcy5idm5zcF9uZXh0X3N0ZXAgPT09IE5FWFRfU1RFUFMuQVdBSVRfTUVTU0FHRSAmJlxuICAgICAgICAgICAgdGhpcy5ib2R5X3Jhd1xuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnNlbmRfdGV4dF9tZXNzYWdlKHRoaXMuYm9keV9yYXcpO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgdGhpcy5idm5zcF9uZXh0X3N0ZXAgPT09IE5FWFRfU1RFUFMuQVdBSVRfQlJPQURDQVNUICYmXG4gICAgICAgICAgICB0aGlzLmJvZHlfcmF3XG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuc2VuZF9icm9hZGNhc3RfbWVzc2FnZSh0aGlzLmJvZHlfcmF3KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmJ2bnNwX25leHRfc3RlcCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5zZW5kX21lc3NhZ2UoXCJTb3JyeSwgSSBkaWRuJ3QgdW5kZXJzdGFuZCB0aGF0LlwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wcm9tcHRfY29tbWFuZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgdGhlIGF3YWl0IGNvbW1hbmQgc3RlcC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlIHwgdW5kZWZpbmVkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcmVzcG9uc2Ugb3IgdW5kZWZpbmVkLlxuICAgICAqL1xuICAgIGFzeW5jIGhhbmRsZV9hd2FpdF9jb21tYW5kKCk6IFByb21pc2U8QlZOU1BSZXNwb25zZSB8IHVuZGVmaW5lZD4ge1xuICAgICAgICBjb25zdCBwYXRyb2xsZXJfbmFtZSA9IHRoaXMucGF0cm9sbGVyIS5uYW1lO1xuICAgICAgICBpZiAodGhpcy5wYXJzZV9mYXN0X2NoZWNraW5fbW9kZSh0aGlzLmJvZHkhKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgYFBlcmZvcm1pbmcgZmFzdCBjaGVja2luIGZvciAke3BhdHJvbGxlcl9uYW1lfSB3aXRoIG1vZGU6ICR7dGhpcy5jaGVja2luX21vZGV9YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmNoZWNraW4oKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQ09NTUFORFMuT05fRFVUWS5pbmNsdWRlcyh0aGlzLmJvZHkhKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmZvcm1pbmcgZ2V0X29uX2R1dHkgZm9yICR7cGF0cm9sbGVyX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4geyByZXNwb25zZTogYXdhaXQgdGhpcy5nZXRfb25fZHV0eSgpIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJDaGVja2luZyBmb3Igc3RhdHVzLi4uXCIpO1xuICAgICAgICBpZiAoQ09NTUFORFMuU1RBVFVTLmluY2x1ZGVzKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBnZXRfc3RhdHVzIGZvciAke3BhdHJvbGxlcl9uYW1lfWApO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X3N0YXR1cygpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDT01NQU5EUy5DSEVDS0lOLmluY2x1ZGVzKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBwcm9tcHRfY2hlY2tpbiBmb3IgJHtwYXRyb2xsZXJfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb21wdF9jaGVja2luKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKENPTU1BTkRTLkdVRVNUX1BBU1MuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIGd1ZXN0X3Bhc3MgZm9yICR7cGF0cm9sbGVyX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5wcm9tcHRfZ3Vlc3RfcGFzcygpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnBhcnNlX2Zhc3Rfc2VjdGlvbl9hc3NpZ25tZW50KHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBmYXN0IHNlY3Rpb25fYXNzaWdubWVudCBmb3IgJHtwYXRyb2xsZXJfbmFtZX0gdG8gJHt0aGlzLmFzc2lnbmVkX3NlY3Rpb259YCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5hc3NpZ25fc2VjdGlvbih0aGlzLmFzc2lnbmVkX3NlY3Rpb24pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDT01NQU5EUy5TRUNUSU9OX0FTU0lHTk1FTlQuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIHNlY3Rpb25fYXNzaWdubWVudCBmb3IgJHtwYXRyb2xsZXJfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnByb21wdF9zZWN0aW9uX2Fzc2lnbm1lbnQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQ09NTUFORFMuV0hBVFNBUFAuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBJJ20gYXZhaWxhYmxlIG9uIFdoYXRzQXBwIGFzIHdlbGwhIFdoYXRzQXBwIHVzZXMgV2lmaS9DZWxsIERhdGEgaW5zdGVhZCBvZiBTTVMsIGFuZCBjYW4gYmUgbW9yZSByZWxpYWJsZS4gTWVzc2FnZSBtZSBhdCBodHRwczovL3dhLm1lLzEke3RoaXMudG99YCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKENPTU1BTkRTLk1FU1NBR0UuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIG1lc3NhZ2UgZm9yICR7cGF0cm9sbGVyX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5wcm9tcHRfbWVzc2FnZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDT01NQU5EUy5CUk9BRENBU1QuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIGJyb2FkY2FzdCBmb3IgJHtwYXRyb2xsZXJfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnByb21wdF9icm9hZGNhc3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb21wdHMgdGhlIHVzZXIgZm9yIGEgY29tbWFuZC5cbiAgICAgKiBAcmV0dXJucyB7QlZOU1BSZXNwb25zZX0gVGhlIHJlc3BvbnNlIHByb21wdGluZyB0aGUgdXNlciBmb3IgYSBjb21tYW5kLlxuICAgICAqL1xuICAgIHByb21wdF9jb21tYW5kKCk6IEJWTlNQUmVzcG9uc2Uge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IGAke3RoaXMucGF0cm9sbGVyIS5uYW1lfSwgSSdtIHRoZSBCVk5TUCBCb3QuXG5FbnRlciBhIGNvbW1hbmQ6XG5DaGVjayBpbiAvIENoZWNrIG91dCAvIFN0YXR1cyAvIE9uIER1dHkgLyBTZWN0aW9uIEFzc2lnbm1lbnQgLyBHdWVzdCBQYXNzIC8gTWVzc2FnZSAvIFdoYXRzQXBwXG5TZW5kICdyZXN0YXJ0JyBhdCBhbnkgdGltZSB0byBiZWdpbiBhZ2FpbmAsXG4gICAgICAgICAgICBuZXh0X3N0ZXA6IE5FWFRfU1RFUFMuQVdBSVRfQ09NTUFORCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm9tcHRzIHRoZSB1c2VyIGZvciBhIGNoZWNrLWluLlxuICAgICAqIEByZXR1cm5zIHtCVk5TUFJlc3BvbnNlfSBUaGUgcmVzcG9uc2UgcHJvbXB0aW5nIHRoZSB1c2VyIGZvciBhIGNoZWNrLWluLlxuICAgICAqL1xuICAgIHByb21wdF9jaGVja2luKCk6IEJWTlNQUmVzcG9uc2Uge1xuICAgICAgICBjb25zdCB0eXBlcyA9IE9iamVjdC52YWx1ZXModGhpcy5jaGVja2luX3ZhbHVlcy5ieV9rZXkpLm1hcChcbiAgICAgICAgICAgICh4KSA9PiB4LnNtc19kZXNjXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZTogYCR7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXIhLm5hbWVcbiAgICAgICAgICAgIH0sIHVwZGF0ZSBwYXRyb2xsaW5nIHN0YXR1cyB0bzogJHt0eXBlc1xuICAgICAgICAgICAgICAgIC5zbGljZSgwLCAtMSlcbiAgICAgICAgICAgICAgICAuam9pbihcIiwgXCIpfSwgb3IgJHt0eXBlcy5zbGljZSgtMSl9P2AsXG4gICAgICAgICAgICBuZXh0X3N0ZXA6IE5FWFRfU1RFUFMuQVdBSVRfQ0hFQ0tJTixcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIFBhcnNlcyB0aGUgZmFzdCBzZWN0aW9uIGFzc2lnbm1lbnQgZnJvbSB0aGUgbWVzc2FnZSBib2R5LlxuICAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHkgLSBUaGUgbWVzc2FnZSBib2R5LlxuICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNlY3Rpb24gYXNzaWdubWVudCBpcyBwYXJzZWQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAqL1xuICAgIHBhcnNlX2Zhc3Rfc2VjdGlvbl9hc3NpZ25tZW50KGJvZHk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHRoaXMuYXNzaWduZWRfc2VjdGlvbiA9IG51bGw7XG4gICAgaWYgKCFib2R5IHx8ICFib2R5LmluY2x1ZGVzKFwiLVwiKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHNlZ21lbnRzID0gYm9keS5zcGxpdChcIi1cIik7XG4gICAgY29uc3QgbGFzdFNlZ21lbnQgPSBzZWdtZW50cy5wb3AoKTtcbiAgICBjb25zdCBmaXJzdFBhcnQgPSBzZWdtZW50cy5qb2luKFwiLVwiKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgaWYgKGxhc3RTZWdtZW50ICYmIENPTU1BTkRTLlNFQ1RJT05fQVNTSUdOTUVOVC5pbmNsdWRlcyhmaXJzdFBhcnQpKSB7XG4gICAgICAgIHRoaXMuYXNzaWduZWRfc2VjdGlvbiA9IHRoaXMuc2VjdGlvbl92YWx1ZXMubWFwX3NlY3Rpb24obGFzdFNlZ21lbnQudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgIHJldHVybiB0aGlzLmFzc2lnbmVkX3NlY3Rpb24gIT09IG51bGwgJiYgdGhpcy5hc3NpZ25lZF9zZWN0aW9uICE9PSBcIlwiO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvbXB0cyB0aGUgdXNlciBmb3Igc2VjdGlvbiBhc3NpZ25tZW50LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSByZXNwb25zZS5cbiAgICAgKi9cbiAgICBhc3luYyBwcm9tcHRfc2VjdGlvbl9hc3NpZ25tZW50KCk6IFByb21pc2U8QlZOU1BSZXNwb25zZT4ge1xuICAgICAgICBpZiAoIXRoaXMucGF0cm9sbGVyIHx8ICF0aGlzLnBhdHJvbGxlci5jaGVja2luKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgJHt0aGlzLnBhdHJvbGxlciEubmFtZX0gaXMgbm90IGNoZWNrZWQgaW4uYCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2VjdGlvbl9kZXNjcmlwdGlvbiA9IHRoaXMuc2VjdGlvbl92YWx1ZXMuZ2V0X3NlY3Rpb25fZGVzY3JpcHRpb24oKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3BvbnNlOiBgRW50ZXIgeW91ciBhc3NpZ25lZCBzZWN0aW9uOyBvbmUgb2YgJHtzZWN0aW9uX2Rlc2NyaXB0aW9ufSAob3IgJ3Jlc3RhcnQnKWAsXG4gICAgICAgICAgICBuZXh0X3N0ZXA6IE5FWFRfU1RFUFMuQVdBSVRfU0VDVElPTixcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCdWlsZHMgdGhlIG1lc3NhZ2UgcHJlZml4IGZvciBhIHRleHQgbWVzc2FnZSBmcm9tIGEgcGF0cm9sbGVyLlxuICAgICAqIEluY2x1ZGVzIHRoZSBzZW5kZXIncyBuYW1lIGFuZCBmb3JtYXR0ZWQgcGhvbmUgbnVtYmVyLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZW5kZXJfbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwYXRyb2xsZXIgc2VuZGluZyB0aGUgbWVzc2FnZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VuZGVyX3Bob25lIC0gVGhlIHNlbmRlcidzIDEwLWRpZ2l0IHBob25lIG51bWJlci5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgbWVzc2FnZSBwcmVmaXguIGZvciBleGFtcGxlIDogXCJNZXNzYWdlIGZyb20gSm9obiBEb2UgKDEyMyk0NTYtNzg5MFwiLlxuICAgICAqL1xuICAgIGdldF9tZXNzYWdlX3ByZWZpeChzZW5kZXJfbmFtZTogc3RyaW5nLCBzZW5kZXJfcGhvbmU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZF9waG9uZSA9IGZvcm1hdF9waG9uZV9mb3JfZGlzcGxheShzZW5kZXJfcGhvbmUpO1xuICAgICAgICByZXR1cm4gYCR7TUVTU0FHRV9QUkVGSVhfVEVNUExBVEV9JHtzZW5kZXJfbmFtZX0gJHtmb3JtYXR0ZWRfcGhvbmV9JHtNRVNTQUdFX1BSRUZJWF9TVUZGSVh9YDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGVzIHRoZSBtYXhpbXVtIGFsbG93ZWQgbWVzc2FnZSBsZW5ndGggZm9yIGEgdGV4dCBtZXNzYWdlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZW5kZXJfbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwYXRyb2xsZXIgc2VuZGluZyB0aGUgbWVzc2FnZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VuZGVyX3Bob25lIC0gVGhlIHNlbmRlcidzIDEwLWRpZ2l0IHBob25lIG51bWJlci5cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgbWF4aW11bSBudW1iZXIgb2YgY2hhcmFjdGVycyB0aGUgdXNlcidzIG1lc3NhZ2UgY2FuIGNvbnRhaW4uXG4gICAgICovXG4gICAgZ2V0X21heF9tZXNzYWdlX2xlbmd0aChzZW5kZXJfbmFtZTogc3RyaW5nLCBzZW5kZXJfcGhvbmU6IHN0cmluZyk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBTTVNfTUFYX0xFTkdUSCAtIHRoaXMuZ2V0X21lc3NhZ2VfcHJlZml4KHNlbmRlcl9uYW1lLCBzZW5kZXJfcGhvbmUpLmxlbmd0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm9tcHRzIHRoZSB1c2VyIHRvIHR5cGUgdGhlaXIgdGV4dCBtZXNzYWdlLlxuICAgICAqIEFueSBwYXRyb2xsZXIgd2l0aCBhIHZhbGlkIHBob25lIG51bWJlciBjYW4gc2VuZCBhIG1lc3NhZ2UsIHJlZ2FyZGxlc3NcbiAgICAgKiBvZiB0aGVpciBvd24gY2hlY2staW4gc3RhdHVzLiAgVGhlIHJlY2lwaWVudCBsaXN0IGluY2x1ZGVzIGFsbFxuICAgICAqIHBhdHJvbGxlcnMgd2hvIGhhdmUgYW55IGNoZWNrLWluIHN0YXR1cyAoQWxsIERheSwgSGFsZiBBTSwgSGFsZiBQTSxcbiAgICAgKiBvciBDaGVja2VkIE91dCksIGluY2x1ZGluZyB0aGUgc2VuZGVyIHRoZW1zZWx2ZXMgaWYgdGhleSBhcmUgY2hlY2tlZCBpbi5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcHJvbXB0IHJlc3BvbnNlLlxuICAgICAqL1xuICAgIGFzeW5jIHByb21wdF9tZXNzYWdlKCk6IFByb21pc2U8QlZOU1BSZXNwb25zZT4ge1xuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG4gICAgICAgIGNvbnN0IHJlY2lwaWVudHMgPSBsb2dpbl9zaGVldC5nZXRfb25fZHV0eV9wYXRyb2xsZXJzKCk7XG4gICAgICAgIGlmIChyZWNpcGllbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYE5vIHBhdHJvbGxlcnMgYXJlIGN1cnJlbnRseSBsb2dnZWQgaW4uIFRoZXJlIGlzIG5vYm9keSB0byBzZW5kIGEgbWVzc2FnZSB0by5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZW5kZXJfcGhvbmUgPSBzYW5pdGl6ZV9waG9uZV9udW1iZXIodGhpcy5mcm9tKTtcbiAgICAgICAgY29uc3QgbWF4X2xlbmd0aCA9IHRoaXMuZ2V0X21heF9tZXNzYWdlX2xlbmd0aCh0aGlzLnBhdHJvbGxlciEubmFtZSwgc2VuZGVyX3Bob25lKTtcbiAgICAgICAgaWYgKG1heF9sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYFlvdXIgbmFtZSBpcyB0b28gbG9uZyB0byBzZW5kIGEgdGV4dCBtZXNzYWdlLmAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZTogYFBsZWFzZSB0eXBlIGEgbWVzc2FnZSBvZiBubyBtb3JlIHRoYW4gJHttYXhfbGVuZ3RofSBwbGFpbi10ZXh0IGNoYXJhY3RlcnMgdG8gJHtyZWNpcGllbnRzLmxlbmd0aH0gcGF0cm9sbGVyJHtyZWNpcGllbnRzLmxlbmd0aCAhPT0gMSA/IFwic1wiIDogXCJcIn0sIG9yICdyZXN0YXJ0JyB0byBjYW5jZWwuYCxcbiAgICAgICAgICAgIG5leHRfc3RlcDogTkVYVF9TVEVQUy5BV0FJVF9NRVNTQUdFLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbmRzIGEgdGV4dCBtZXNzYWdlIHRvIGFsbCBwYXRyb2xsZXJzIHdpdGggYSBjaGVjay1pbiBzdGF0dXMgZm9yIHRoZSBkYXkuXG4gICAgICogVGhlIHNlbmRlciBhbHNvIHJlY2VpdmVzIHRoZSBtZXNzYWdlIGlmIHRoZXkgaGF2ZSBhIGNoZWNrLWluIHN0YXR1cy5cbiAgICAgKiBWYWxpZGF0ZXMgdGhhdCB0aGUgY29tcGxldGUgbWVzc2FnZSAocHJlZml4ICsgYm9keSkgdXNlcyBvbmx5IEdTTS03XG4gICAgICogY2hhcmFjdGVycyBhbmQgZml0cyB3aXRoaW4gYSBzaW5nbGUgU01TIHNlZ21lbnQsIHVzaW5nIHRoZVxuICAgICAqIHNtcy1zZWdtZW50cy1jYWxjdWxhdG9yIGxpYnJhcnkuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VfdGV4dCAtIFRoZSByYXcgbWVzc2FnZSB0ZXh0IGZyb20gdGhlIHNlbmRlci5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgc2VuZCByZXN1bHQuXG4gICAgICovXG4gICAgYXN5bmMgc2VuZF90ZXh0X21lc3NhZ2UobWVzc2FnZV90ZXh0OiBzdHJpbmcpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3Qgc2VuZGVyX25hbWUgPSB0aGlzLnBhdHJvbGxlciEubmFtZTtcbiAgICAgICAgY29uc3Qgc2VuZGVyX3Bob25lID0gc2FuaXRpemVfcGhvbmVfbnVtYmVyKHRoaXMuZnJvbSk7XG4gICAgICAgIGNvbnN0IHByZWZpeCA9IHRoaXMuZ2V0X21lc3NhZ2VfcHJlZml4KHNlbmRlcl9uYW1lLCBzZW5kZXJfcGhvbmUpO1xuICAgICAgICBjb25zdCBtYXhfbGVuZ3RoID0gdGhpcy5nZXRfbWF4X21lc3NhZ2VfbGVuZ3RoKHNlbmRlcl9uYW1lLCBzZW5kZXJfcGhvbmUpO1xuICAgICAgICBjb25zdCBmdWxsX21lc3NhZ2UgPSBwcmVmaXggKyBtZXNzYWdlX3RleHQ7XG5cbiAgICAgICAgY29uc3QgdmFsaWRhdGlvbiA9IHZhbGlkYXRlX3Ntc19tZXNzYWdlKGZ1bGxfbWVzc2FnZSk7XG4gICAgICAgIGlmICghdmFsaWRhdGlvbi52YWxpZCkge1xuICAgICAgICAgICAgaWYgKHZhbGlkYXRpb24ucmVhc29uID09PSBcIm5vbl9nc203XCIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBiYWRfY2hhcnMgPSB2YWxpZGF0aW9uLm5vbl9nc21fY2hhcmFjdGVycyEuam9pbihcIiBcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBZb3VyIG1lc3NhZ2UgY29udGFpbnMgY2hhcmFjdGVycyB0aGF0IGFyZSBub3Qgc3VwcG9ydGVkIGluIHBsYWluLXRleHQgU01TOiAke2JhZF9jaGFyc30uIFBsZWFzZSB1c2Ugb25seSBzdGFuZGFyZCBjaGFyYWN0ZXJzIGFuZCB0cnkgYWdhaW4uYCxcbiAgICAgICAgICAgICAgICAgICAgbmV4dF9zdGVwOiBORVhUX1NURVBTLkFXQUlUX01FU1NBR0UsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBZb3VyIG1lc3NhZ2UgaXMgJHttZXNzYWdlX3RleHQubGVuZ3RofSBjaGFyYWN0ZXJzLCB3aGljaCBleGNlZWRzIHRoZSBsaW1pdCBvZiAke21heF9sZW5ndGh9LiBQbGVhc2Ugc2hvcnRlbiB5b3VyIG1lc3NhZ2UgYW5kIHRyeSBhZ2Fpbiwgb3IgdHlwZSAncmVzdGFydCcgdG8gY2FuY2VsLmAsXG4gICAgICAgICAgICAgICAgbmV4dF9zdGVwOiBORVhUX1NURVBTLkFXQUlUX01FU1NBR0UsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuICAgICAgICBjb25zdCBzaWduZWRfaW5fcGF0cm9sbGVycyA9IGxvZ2luX3NoZWV0LmdldF9vbl9kdXR5X3BhdHJvbGxlcnMoKTtcbiAgICAgICAgY29uc3QgcGhvbmVfbWFwID0gYXdhaXQgdGhpcy5nZXRfcGhvbmVfbnVtYmVyX21hcCgpO1xuXG4gICAgICAgIC8vIEJ1aWxkIHJlY2lwaWVudCBtYXAgZm9yIG9uLWR1dHkgcGF0cm9sbGVycyB3aXRoIGtub3duIHBob25lczsgdHJhY2sgbWlzc2luZ1xuICAgICAgICBjb25zdCByZWNpcGllbnRfbWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge307XG4gICAgICAgIGNvbnN0IG5vX3Bob25lX25hbWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IHBhdHJvbGxlciBvZiBzaWduZWRfaW5fcGF0cm9sbGVycykge1xuICAgICAgICAgICAgY29uc3QgcGhvbmUgPSBwaG9uZV9tYXBbcGF0cm9sbGVyLm5hbWVdO1xuICAgICAgICAgICAgaWYgKHBob25lKSB7XG4gICAgICAgICAgICAgICAgcmVjaXBpZW50X21hcFtwYXRyb2xsZXIubmFtZV0gPSBwaG9uZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbm9fcGhvbmVfbmFtZXMucHVzaChwYXRyb2xsZXIubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB7IHNlbnRfY291bnQsIGNvcHlfc2VudF90b19zZW5kZXIsIGZhaWxlZF9uYW1lcyB9ID1cbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZGVsaXZlcl9zbXNfdG9fbWFwKHJlY2lwaWVudF9tYXAsIGZ1bGxfbWVzc2FnZSwgc2VuZGVyX25hbWUpO1xuXG4gICAgICAgIGF3YWl0IHRoaXMubG9nX2FjdGlvbihgdGV4dF9tZXNzYWdlKCR7c2VudF9jb3VudCArIChjb3B5X3NlbnRfdG9fc2VuZGVyID8gMSA6IDApfSlgKTtcblxuICAgICAgICBsZXQgcmVzcG9uc2UgPSBgTWVzc2FnZSBzZW50IHRvICR7c2VudF9jb3VudH0gcGF0cm9sbGVyJHtzZW50X2NvdW50ICE9PSAxID8gXCJzXCIgOiBcIlwifWA7XG4gICAgICAgIGlmIChjb3B5X3NlbnRfdG9fc2VuZGVyKSB7XG4gICAgICAgICAgICByZXNwb25zZSArPSBgIGFuZCBhIGNvcHkgdG8geW91LmA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNwb25zZSArPSBgLmA7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYWxsX2ZhaWxlZCA9IFsuLi5ub19waG9uZV9uYW1lcywgLi4uZmFpbGVkX25hbWVzXTtcbiAgICAgICAgaWYgKGFsbF9mYWlsZWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmVzcG9uc2UgKz0gYCBDb3VsZCBub3Qgc2VuZCB0bzogJHthbGxfZmFpbGVkLmpvaW4oXCIsIFwiKX0uYDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyByZXNwb25zZSB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvcmUgU01TIGRlbGl2ZXJ5IGxvb3AuIFNlbmRzIGZ1bGxfbWVzc2FnZSB0byBlYWNoIGVudHJ5IGluIHJlY2lwaWVudF9tYXBcbiAgICAgKiAobmFtZSDihpIgXCIrMVhYWFhYWFhYWFhcIikuIElmIHRoZSBzZW5kZXIncyBwaG9uZSBpcyBub3QgYW1vbmcgdGhlIHJlY2lwaWVudHMsXG4gICAgICogYSBjb3B5IGlzIHNlbnQgdG8gdGhpcy5mcm9tLiBSZXR1cm5zIGRlbGl2ZXJ5IGFjY291bnRpbmcgZGF0YS5cbiAgICAgKiBAcGFyYW0ge1JlY29yZDxzdHJpbmcsIHN0cmluZz59IHJlY2lwaWVudF9tYXAgLSBNYXAgb2YgcGF0cm9sbGVyIG5hbWUgdG8gXCIrMVhYWFhYWFhYWFhcIiBwaG9uZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZnVsbF9tZXNzYWdlIC0gVGhlIGNvbXBsZXRlIGZvcm1hdHRlZCBTTVMgdG8gc2VuZC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VuZGVyX25hbWUgLSBUaGUgc2VuZGVyJ3MgbmFtZSAodXNlZCBmb3IgZmFpbHVyZSBsb2dnaW5nKS5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxvYmplY3Q+fSBEZWxpdmVyeSBjb3VudHMgYW5kIGZhaWx1cmUgbGlzdC5cbiAgICAgKi9cbiAgICBhc3luYyBkZWxpdmVyX3Ntc190b19tYXAoXG4gICAgICAgIHJlY2lwaWVudF9tYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4sXG4gICAgICAgIGZ1bGxfbWVzc2FnZTogc3RyaW5nLFxuICAgICAgICBzZW5kZXJfbmFtZTogc3RyaW5nLFxuICAgICk6IFByb21pc2U8eyBzZW50X2NvdW50OiBudW1iZXI7IGNvcHlfc2VudF90b19zZW5kZXI6IGJvb2xlYW47IGZhaWxlZF9uYW1lczogc3RyaW5nW10gfT4ge1xuICAgICAgICBsZXQgc2VudF9jb3VudCA9IDA7XG4gICAgICAgIGNvbnN0IGZhaWxlZF9uYW1lczogc3RyaW5nW10gPSBbXTtcblxuICAgICAgICBmb3IgKGNvbnN0IFtuYW1lLCBwaG9uZV0gb2YgT2JqZWN0LmVudHJpZXMocmVjaXBpZW50X21hcCkpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXRfdHdpbGlvX2NsaWVudCgpLm1lc3NhZ2VzLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHRvOiBwaG9uZSxcbiAgICAgICAgICAgICAgICAgICAgZnJvbTogdGhpcy50byxcbiAgICAgICAgICAgICAgICAgICAgYm9keTogZnVsbF9tZXNzYWdlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHNlbnRfY291bnQrKztcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgRmFpbGVkIHRvIHNlbmQgU01TIHRvICR7bmFtZX06ICR7ZX1gKTtcbiAgICAgICAgICAgICAgICBmYWlsZWRfbmFtZXMucHVzaChuYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNlbmQgYSBjb3B5IHRvIHRoZSBzZW5kZXIgaWYgdGhlaXIgbnVtYmVyIGlzIG5vdCBhbHJlYWR5IGluIHRoZSByZWNpcGllbnQgbWFwXG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZWRfc2VuZGVyID0gYCsxJHtzYW5pdGl6ZV9waG9uZV9udW1iZXIodGhpcy5mcm9tKX1gO1xuICAgICAgICBjb25zdCBzZW5kZXJfaW5fbWFwID0gT2JqZWN0LnZhbHVlcyhyZWNpcGllbnRfbWFwKS5pbmNsdWRlcyhub3JtYWxpemVkX3NlbmRlcik7XG4gICAgICAgIGxldCBjb3B5X3NlbnRfdG9fc2VuZGVyID0gZmFsc2U7XG4gICAgICAgIGlmICghc2VuZGVyX2luX21hcCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmdldF90d2lsaW9fY2xpZW50KCkubWVzc2FnZXMuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgdG86IHRoaXMuZnJvbSxcbiAgICAgICAgICAgICAgICAgICAgZnJvbTogdGhpcy50byxcbiAgICAgICAgICAgICAgICAgICAgYm9keTogZnVsbF9tZXNzYWdlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvcHlfc2VudF90b19zZW5kZXIgPSB0cnVlO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBGYWlsZWQgdG8gc2VuZCBTTVMgY29weSB0byBzZW5kZXIgJHtzZW5kZXJfbmFtZX06ICR7ZX1gKTtcbiAgICAgICAgICAgICAgICBmYWlsZWRfbmFtZXMucHVzaChzZW5kZXJfbmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geyBzZW50X2NvdW50LCBjb3B5X3NlbnRfdG9fc2VuZGVyLCBmYWlsZWRfbmFtZXMgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm9tcHRzIHRoZSB1c2VyIHRvIHR5cGUgYSBicm9hZGNhc3QgbWVzc2FnZSB0byBhbGwgcGF0cm9sbGVycy5cbiAgICAgKiBVbmxpa2UgdGhlIG1lc3NhZ2UgY29tbWFuZCAod2hpY2ggdGFyZ2V0cyBvbmx5IGxvZ2dlZC1pbiBwYXRyb2xsZXJzKSwgYnJvYWRjYXN0XG4gICAgICogc2VuZHMgdG8gZXZlcnkgcGF0cm9sbGVyIGluIHRoZSBQaG9uZSBOdW1iZXJzIHNoZWV0LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBwcm9tcHQgcmVzcG9uc2UuXG4gICAgICovXG4gICAgYXN5bmMgcHJvbXB0X2Jyb2FkY2FzdCgpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgcGhvbmVfbWFwID0gYXdhaXQgdGhpcy5nZXRfcGhvbmVfbnVtYmVyX21hcCgpO1xuICAgICAgICBjb25zdCByZWNpcGllbnRfY291bnQgPSBPYmplY3Qua2V5cyhwaG9uZV9tYXApLmxlbmd0aDtcbiAgICAgICAgaWYgKHJlY2lwaWVudF9jb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYE5vIHBhdHJvbGxlcnMgd2l0aCBwaG9uZSBudW1iZXJzIGZvdW5kLiBUaGVyZSBpcyBub2JvZHkgdG8gYnJvYWRjYXN0IHRvLmAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNlbmRlcl9waG9uZSA9IHNhbml0aXplX3Bob25lX251bWJlcih0aGlzLmZyb20pO1xuICAgICAgICBjb25zdCBtYXhfbGVuZ3RoID0gdGhpcy5nZXRfbWF4X21lc3NhZ2VfbGVuZ3RoKHRoaXMucGF0cm9sbGVyIS5uYW1lLCBzZW5kZXJfcGhvbmUpO1xuICAgICAgICBpZiAobWF4X2xlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgWW91ciBuYW1lIGlzIHRvbyBsb25nIHRvIHNlbmQgYSBicm9hZGNhc3QgbWVzc2FnZS5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IGBQbGVhc2UgdHlwZSBhIGJyb2FkY2FzdCBtZXNzYWdlIG9mIG5vIG1vcmUgdGhhbiAke21heF9sZW5ndGh9IHBsYWluLXRleHQgY2hhcmFjdGVycyB0byAke3JlY2lwaWVudF9jb3VudH0gcGF0cm9sbGVyJHtyZWNpcGllbnRfY291bnQgIT09IDEgPyBcInNcIiA6IFwiXCJ9LCBvciAncmVzdGFydCcgdG8gY2FuY2VsLmAsXG4gICAgICAgICAgICBuZXh0X3N0ZXA6IE5FWFRfU1RFUFMuQVdBSVRfQlJPQURDQVNULFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbmRzIGEgYnJvYWRjYXN0IG1lc3NhZ2UgdG8gQUxMIHBhdHJvbGxlcnMgaW4gdGhlIFBob25lIE51bWJlcnMgc2hlZXQsXG4gICAgICogcmVnYXJkbGVzcyBvZiBjaGVjay1pbiBzdGF0dXMuIFVzZXMgdGhlIHNhbWUgcHJlZml4IGZvcm1hdCBhbmQgR1NNLTcgLyBzaW5nbGUtc2VnbWVudFxuICAgICAqIHZhbGlkYXRpb24gYXMgdGhlIG1lc3NhZ2UgY29tbWFuZC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZV90ZXh0IC0gVGhlIHJhdyBtZXNzYWdlIHRleHQgZnJvbSB0aGUgc2VuZGVyLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBzZW5kIHJlc3VsdC5cbiAgICAgKi9cbiAgICBhc3luYyBzZW5kX2Jyb2FkY2FzdF9tZXNzYWdlKG1lc3NhZ2VfdGV4dDogc3RyaW5nKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnN0IHNlbmRlcl9uYW1lID0gdGhpcy5wYXRyb2xsZXIhLm5hbWU7XG4gICAgICAgIGNvbnN0IHNlbmRlcl9waG9uZSA9IHNhbml0aXplX3Bob25lX251bWJlcih0aGlzLmZyb20pO1xuICAgICAgICBjb25zdCBwcmVmaXggPSB0aGlzLmdldF9tZXNzYWdlX3ByZWZpeChzZW5kZXJfbmFtZSwgc2VuZGVyX3Bob25lKTtcbiAgICAgICAgY29uc3QgbWF4X2xlbmd0aCA9IHRoaXMuZ2V0X21heF9tZXNzYWdlX2xlbmd0aChzZW5kZXJfbmFtZSwgc2VuZGVyX3Bob25lKTtcbiAgICAgICAgY29uc3QgZnVsbF9tZXNzYWdlID0gcHJlZml4ICsgbWVzc2FnZV90ZXh0O1xuXG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb24gPSB2YWxpZGF0ZV9zbXNfbWVzc2FnZShmdWxsX21lc3NhZ2UpO1xuICAgICAgICBpZiAoIXZhbGlkYXRpb24udmFsaWQpIHtcbiAgICAgICAgICAgIGlmICh2YWxpZGF0aW9uLnJlYXNvbiA9PT0gXCJub25fZ3NtN1wiKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYmFkX2NoYXJzID0gdmFsaWRhdGlvbi5ub25fZ3NtX2NoYXJhY3RlcnMhLmpvaW4oXCIgXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgWW91ciBtZXNzYWdlIGNvbnRhaW5zIGNoYXJhY3RlcnMgdGhhdCBhcmUgbm90IHN1cHBvcnRlZCBpbiBwbGFpbi10ZXh0IFNNUzogJHtiYWRfY2hhcnN9LiBQbGVhc2UgdXNlIG9ubHkgc3RhbmRhcmQgY2hhcmFjdGVycyBhbmQgdHJ5IGFnYWluLmAsXG4gICAgICAgICAgICAgICAgICAgIG5leHRfc3RlcDogTkVYVF9TVEVQUy5BV0FJVF9CUk9BRENBU1QsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBZb3VyIG1lc3NhZ2UgaXMgJHttZXNzYWdlX3RleHQubGVuZ3RofSBjaGFyYWN0ZXJzLCB3aGljaCBleGNlZWRzIHRoZSBsaW1pdCBvZiAke21heF9sZW5ndGh9LiBQbGVhc2Ugc2hvcnRlbiB5b3VyIG1lc3NhZ2UgYW5kIHRyeSBhZ2Fpbiwgb3IgdHlwZSAncmVzdGFydCcgdG8gY2FuY2VsLmAsXG4gICAgICAgICAgICAgICAgbmV4dF9zdGVwOiBORVhUX1NURVBTLkFXQUlUX0JST0FEQ0FTVCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGb3IgYnJvYWRjYXN0LCBzZW5kIHRvIEFMTCBwYXRyb2xsZXJzIGluIHRoZSBwaG9uZSBudW1iZXIgbWFwXG4gICAgICAgIGNvbnN0IHBob25lX21hcCA9IGF3YWl0IHRoaXMuZ2V0X3Bob25lX251bWJlcl9tYXAoKTtcbiAgICAgICAgY29uc3QgeyBzZW50X2NvdW50LCBjb3B5X3NlbnRfdG9fc2VuZGVyLCBmYWlsZWRfbmFtZXMgfSA9XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmRlbGl2ZXJfc21zX3RvX21hcChwaG9uZV9tYXAsIGZ1bGxfbWVzc2FnZSwgc2VuZGVyX25hbWUpO1xuXG4gICAgICAgIGF3YWl0IHRoaXMubG9nX2FjdGlvbihgYnJvYWRjYXN0KCR7c2VudF9jb3VudCArIChjb3B5X3NlbnRfdG9fc2VuZGVyID8gMSA6IDApfSlgKTtcblxuICAgICAgICBsZXQgcmVzcG9uc2UgPSBgQnJvYWRjYXN0IHNlbnQgdG8gJHtzZW50X2NvdW50fSBwYXRyb2xsZXIke3NlbnRfY291bnQgIT09IDEgPyBcInNcIiA6IFwiXCJ9YDtcbiAgICAgICAgaWYgKGNvcHlfc2VudF90b19zZW5kZXIpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlICs9IGAgYW5kIGEgY29weSB0byB5b3UuYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3BvbnNlICs9IGAuYDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmYWlsZWRfbmFtZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmVzcG9uc2UgKz0gYCBDb3VsZCBub3Qgc2VuZCB0bzogJHtmYWlsZWRfbmFtZXMuam9pbihcIiwgXCIpfS5gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHJlc3BvbnNlIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9va3MgdXAgcGhvbmUgbnVtYmVycyBmb3IgYWxsIHBhdHJvbGxlcnMgZnJvbSB0aGUgUGhvbmUgTnVtYmVycyBzaGVldC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+Pn0gQSBtYXAgb2YgcGF0cm9sbGVyIG5hbWUgdG8gcGhvbmUgbnVtYmVyIChpbiArMVhYWFhYWFhYWFggZm9ybWF0KS5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfcGhvbmVfbnVtYmVyX21hcCgpOiBQcm9taXNlPFJlY29yZDxzdHJpbmcsIHN0cmluZz4+IHtcbiAgICAgICAgY29uc3Qgc2hlZXRzX3NlcnZpY2UgPSBhd2FpdCB0aGlzLmdldF9zaGVldHNfc2VydmljZSgpO1xuICAgICAgICBjb25zdCBvcHRzOiBGaW5kUGF0cm9sbGVyQ29uZmlnID0gdGhpcy5jb21iaW5lZF9jb25maWc7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgc2hlZXRzX3NlcnZpY2Uuc3ByZWFkc2hlZXRzLnZhbHVlcy5nZXQoe1xuICAgICAgICAgICAgc3ByZWFkc2hlZXRJZDogb3B0cy5TSEVFVF9JRCxcbiAgICAgICAgICAgIHJhbmdlOiBvcHRzLlBIT05FX05VTUJFUl9MT09LVVBfU0hFRVQsXG4gICAgICAgICAgICB2YWx1ZVJlbmRlck9wdGlvbjogXCJVTkZPUk1BVFRFRF9WQUxVRVwiLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhLnZhbHVlcykge1xuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IHJvdyBvZiByZXNwb25zZS5kYXRhLnZhbHVlcykge1xuICAgICAgICAgICAgY29uc3QgbmFtZSA9IHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5QSE9ORV9OVU1CRVJfTkFNRV9DT0xVTU4pXTtcbiAgICAgICAgICAgIGNvbnN0IHJhd051bWJlciA9IHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5QSE9ORV9OVU1CRVJfTlVNQkVSX0NPTFVNTildO1xuICAgICAgICAgICAgaWYgKG5hbWUgJiYgcmF3TnVtYmVyKSB7XG4gICAgICAgICAgICAgICAgbWFwW25hbWVdID0gYCsxJHtzYW5pdGl6ZV9waG9uZV9udW1iZXIocmF3TnVtYmVyKX1gO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXA7XG4gICAgfVxuXG4vKipcbiAqIEFzc2lnbnMgdGhlIHNlY3Rpb24gdG8gdGhlIHBhdHJvbGxlci5cbiAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbH0gc2VjdGlvbiAtIFRoZSBzZWN0aW9uIHRvIGFzc2lnbi5cbiAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSByZXNwb25zZS5cbiAqL1xuYXN5bmMgYXNzaWduX3NlY3Rpb24oc2VjdGlvbjogc3RyaW5nIHwgbnVsbCk6IFByb21pc2U8QlZOU1BSZXNwb25zZT4ge1xuICAgIGNvbnN0IGFzc2lnbmVkU2VjdGlvbiA9IHNlY3Rpb24gPz8gXCJSb3ZpbmdcIjtcbiAgICBjb25zb2xlLmxvZyhgQXNzaWduaW5nIHNlY3Rpb24gJHt0aGlzLnBhdHJvbGxlciEubmFtZX0gdG8gJHthc3NpZ25lZFNlY3Rpb259YCk7XG4gICAgY29uc3QgbWFwcGVkX3NlY3Rpb24gPSB0aGlzLnNlY3Rpb25fdmFsdWVzLm1hcF9zZWN0aW9uKGFzc2lnbmVkU2VjdGlvbik7XG4gICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKGBhc3NpZ25fc2VjdGlvbigke21hcHBlZF9zZWN0aW9ufSlgKTtcbiAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG4gICAgYXdhaXQgbG9naW5fc2hlZXQuYXNzaWduX3NlY3Rpb24odGhpcy5wYXRyb2xsZXIhLCBtYXBwZWRfc2VjdGlvbik7XG4gICAgYXdhaXQgdGhpcy5sb2dpbl9zaGVldD8ucmVmcmVzaCgpO1xuICAgIGF3YWl0IHRoaXMuZ2V0X21hcHBlZF9wYXRyb2xsZXIodHJ1ZSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzcG9uc2U6IGBVcGRhdGVkICR7dGhpcy5wYXRyb2xsZXIhLm5hbWV9IHdpdGggc2VjdGlvbiBhc3NpZ25tZW50OiAke21hcHBlZF9zZWN0aW9ufS5gLFxuICAgIH07XG59XG5cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHN0YXR1cyBvZiB0aGUgcGF0cm9sbGVyLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBzdGF0dXMgcmVzcG9uc2UuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3N0YXR1cygpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuICAgICAgICBjb25zdCBzaGVldF9kYXRlID0gbG9naW5fc2hlZXQuc2hlZXRfZGF0ZS50b0RhdGVTdHJpbmcoKTtcbiAgICAgICAgY29uc3QgY3VycmVudF9kYXRlID0gbG9naW5fc2hlZXQuY3VycmVudF9kYXRlLnRvRGF0ZVN0cmluZygpO1xuICAgICAgICBpZiAoIWxvZ2luX3NoZWV0LmlzX2N1cnJlbnQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBzaGVldF9kYXRlOiAke2xvZ2luX3NoZWV0LnNoZWV0X2RhdGV9YCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgY3VycmVudF9kYXRlOiAke2xvZ2luX3NoZWV0LmN1cnJlbnRfZGF0ZX1gKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBTaGVldCBpcyBub3QgY3VycmVudCBmb3IgdG9kYXkgKGxhc3QgcmVzZXQ6ICR7c2hlZXRfZGF0ZX0pLiAke1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICAgICAgICAgIH0gaXMgbm90IGNoZWNrZWQgaW4gZm9yICR7Y3VycmVudF9kYXRlfS5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXNwb25zZSA9IHsgcmVzcG9uc2U6IGF3YWl0IHRoaXMuZ2V0X3N0YXR1c19zdHJpbmcoKSB9O1xuICAgICAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oXCJzdGF0dXNcIik7XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBzdGF0dXMgc3RyaW5nIG9mIHRoZSBwYXRyb2xsZXIuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c3RyaW5nPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgc3RhdHVzIHN0cmluZy5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfc3RhdHVzX3N0cmluZygpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG4gICAgICAgIGNvbnN0IGd1ZXN0X3Bhc3NfcHJvbWlzZSA9IChcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0X2d1ZXN0X3Bhc3Nfc2hlZXQoKVxuICAgICAgICApLmdldF9hdmFpbGFibGVfYW5kX3VzZWRfcGFzc2VzKHRoaXMucGF0cm9sbGVyIS5uYW1lKTtcbiAgICAgICAgY29uc3QgcGF0cm9sbGVyX3N0YXR1cyA9IHRoaXMucGF0cm9sbGVyITtcblxuICAgICAgICBjb25zdCBjaGVja2luQ29sdW1uU2V0ID1cbiAgICAgICAgICAgIHBhdHJvbGxlcl9zdGF0dXMuY2hlY2tpbiAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICBwYXRyb2xsZXJfc3RhdHVzLmNoZWNraW4gIT09IG51bGw7XG4gICAgICAgIGNvbnN0IGNoZWNrZWRPdXQgPVxuICAgICAgICAgICAgY2hlY2tpbkNvbHVtblNldCAmJlxuICAgICAgICAgICAgdGhpcy5jaGVja2luX3ZhbHVlcy5ieV9zaGVldF9zdHJpbmdbcGF0cm9sbGVyX3N0YXR1cy5jaGVja2luXS5rZXkgPT1cbiAgICAgICAgICAgICAgICBcIm91dFwiO1xuICAgICAgICBsZXQgc3RhdHVzID0gcGF0cm9sbGVyX3N0YXR1cy5jaGVja2luIHx8IFwiTm90IFByZXNlbnRcIjtcblxuICAgICAgICBpZiAoY2hlY2tlZE91dCkge1xuICAgICAgICAgICAgc3RhdHVzID0gXCJDaGVja2VkIE91dFwiO1xuICAgICAgICB9IGVsc2UgaWYgKGNoZWNraW5Db2x1bW5TZXQpIHtcbiAgICAgICAgICAgIGxldCBzZWN0aW9uID0gcGF0cm9sbGVyX3N0YXR1cy5zZWN0aW9uLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBpZiAoc2VjdGlvbi5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgICAgIHNlY3Rpb24gPSBgU2VjdGlvbiAke3NlY3Rpb259YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0YXR1cyA9IGAke3BhdHJvbGxlcl9zdGF0dXMuY2hlY2tpbn0gKCR7c2VjdGlvbn0pYDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbXBsZXRlZFBhdHJvbERheXMgPSBhd2FpdCAoXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmdldF9zZWFzb25fc2hlZXQoKVxuICAgICAgICApLmdldF9wYXRyb2xsZWRfZGF5cyh0aGlzLnBhdHJvbGxlciEubmFtZSk7XG4gICAgICAgIGNvbnN0IGNvbXBsZXRlZFBhdHJvbERheXNTdHJpbmcgPVxuICAgICAgICAgICAgY29tcGxldGVkUGF0cm9sRGF5cyA+IDAgPyBjb21wbGV0ZWRQYXRyb2xEYXlzLnRvU3RyaW5nKCkgOiBcIk5vXCI7XG4gICAgICAgIGNvbnN0IGxvZ2luU2hlZXREYXRlID0gbG9naW5fc2hlZXQuc2hlZXRfZGF0ZS50b0RhdGVTdHJpbmcoKTtcblxuICAgICAgICBsZXQgc3RhdHVzU3RyaW5nID0gYFN0YXR1cyBmb3IgJHtcbiAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyIS5uYW1lXG4gICAgICAgIH0gb24gZGF0ZSAke2xvZ2luU2hlZXREYXRlfTogJHtzdGF0dXN9LlxcbiR7Y29tcGxldGVkUGF0cm9sRGF5c1N0cmluZ30gY29tcGxldGVkIHBhdHJvbCBkYXlzIHByaW9yIHRvIHRvZGF5LmA7XG4gICAgICAgIGNvbnN0IHVzZWRUb2RheUd1ZXN0UGFzc2VzID0gKGF3YWl0IGd1ZXN0X3Bhc3NfcHJvbWlzZSk/LnVzZWRfdG9kYXkgfHwgMDtcbiAgICAgICAgY29uc3QgdXNlZFNlYXNvbkd1ZXN0UGFzc2VzID1cbiAgICAgICAgICAgIChhd2FpdCBndWVzdF9wYXNzX3Byb21pc2UpPy51c2VkX3NlYXNvbiB8fCAwO1xuICAgICAgICBjb25zdCBhdmFpbGFibGVHdWVzdFBhc3NlcyA9IChhd2FpdCBndWVzdF9wYXNzX3Byb21pc2UpPy5hdmFpbGFibGUgfHwgMDtcblxuXG4gICAgICAgIHN0YXR1c1N0cmluZyArPVxuICAgICAgICAgICAgXCIgXCIgK1xuICAgICAgICAgICAgYnVpbGRfcGFzc2VzX3N0cmluZyhcbiAgICAgICAgICAgICAgICB1c2VkU2Vhc29uR3Vlc3RQYXNzZXMsXG4gICAgICAgICAgICAgICAgdXNlZFNlYXNvbkd1ZXN0UGFzc2VzICsgYXZhaWxhYmxlR3Vlc3RQYXNzZXMsXG4gICAgICAgICAgICAgICAgdXNlZFRvZGF5R3Vlc3RQYXNzZXNcbiAgICAgICAgICAgICk7XG4gICAgICAgIHJldHVybiBzdGF0dXNTdHJpbmc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgdGhlIGNoZWNrLWluIHByb2Nlc3MgZm9yIHRoZSBwYXRyb2xsZXIgb25jZSB0aGUgY2hlY2staW4gbW9kZSBpcyBzZXQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGNoZWNrLWluIHJlc3BvbnNlLlxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBUaHJvd3MgYW4gZXJyb3IgaWYgdGhlIGNoZWNrLWluIG1vZGUgaXMgaW1wcm9wZXJseSBzZXQuXG4gICAgICovXG4gICAgYXN5bmMgY2hlY2tpbigpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICBgUGVyZm9ybWluZyByZWd1bGFyIGNoZWNraW4gZm9yICR7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXIhLm5hbWVcbiAgICAgICAgICAgIH0gd2l0aCBtb2RlOiAke3RoaXMuY2hlY2tpbl9tb2RlfWBcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGF3YWl0IHRoaXMuc2hlZXRfbmVlZHNfcmVzZXQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTpcbiAgICAgICAgICAgICAgICAgICAgYCR7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICAgICAgICAgICAgICB9LCB5b3UgYXJlIHRoZSBmaXJzdCBwZXJzb24gdG8gY2hlY2sgaW4gdG9kYXkuIGAgK1xuICAgICAgICAgICAgICAgICAgICBgSSBuZWVkIHRvIGFyY2hpdmUgYW5kIHJlc2V0IHRoZSBzaGVldCBiZWZvcmUgY29udGludWluZy4gYCArXG4gICAgICAgICAgICAgICAgICAgIGBXb3VsZCB5b3UgbGlrZSBtZSB0byBkbyB0aGF0PyAoWWVzL05vKWAsXG4gICAgICAgICAgICAgICAgbmV4dF9zdGVwOiBgJHtORVhUX1NURVBTLkNPTkZJUk1fUkVTRVR9LSR7dGhpcy5jaGVja2luX21vZGV9YCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNoZWNraW5fbW9kZTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgIXRoaXMuY2hlY2tpbl9tb2RlIHx8XG4gICAgICAgICAgICAoY2hlY2tpbl9tb2RlID0gdGhpcy5jaGVja2luX3ZhbHVlcy5ieV9rZXlbdGhpcy5jaGVja2luX21vZGVdKSA9PT1cbiAgICAgICAgICAgICAgICB1bmRlZmluZWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDaGVja2luIG1vZGUgaW1wcm9wZXJseSBzZXRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG4gICAgICAgIGNvbnN0IG5ld19jaGVja2luX3ZhbHVlID0gY2hlY2tpbl9tb2RlLnNoZWV0c192YWx1ZTtcbiAgICAgICAgYXdhaXQgbG9naW5fc2hlZXQuY2hlY2tpbih0aGlzLnBhdHJvbGxlciEsIG5ld19jaGVja2luX3ZhbHVlKTtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKGB1cGRhdGUtc3RhdHVzKCR7bmV3X2NoZWNraW5fdmFsdWV9KWApO1xuICAgICAgICBhd2FpdCB0aGlzLmxvZ2luX3NoZWV0Py5yZWZyZXNoKCk7XG4gICAgICAgIGF3YWl0IHRoaXMuZ2V0X21hcHBlZF9wYXRyb2xsZXIodHJ1ZSk7XG5cbiAgICAgICAgbGV0IHJlc3BvbnNlID0gYFVwZGF0aW5nICR7XG4gICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICB9IHdpdGggc3RhdHVzOiAke25ld19jaGVja2luX3ZhbHVlfS5gO1xuICAgICAgICBpZiAoIXRoaXMuZmFzdF9jaGVja2luKSB7XG4gICAgICAgICAgICByZXNwb25zZSArPSBgIFlvdSBjYW4gc2VuZCAnJHtjaGVja2luX21vZGUuZmFzdF9jaGVja2luc1swXX0nIGFzIHlvdXIgZmlyc3QgbWVzc2FnZSBmb3IgYSBmYXN0ICR7Y2hlY2tpbl9tb2RlLnNoZWV0c192YWx1ZX0gY2hlY2tpbiBuZXh0IHRpbWUuYDtcbiAgICAgICAgfVxuICAgICAgICByZXNwb25zZSArPSBcIlxcblxcblwiICsgKGF3YWl0IHRoaXMuZ2V0X3N0YXR1c19zdHJpbmcoKSk7XG4gICAgICAgIHJldHVybiB7IHJlc3BvbnNlOiByZXNwb25zZSB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGUgR29vZ2xlIFNoZWV0cyBuZWVkcyB0byBiZSByZXNldC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdHJ1ZSBpZiB0aGUgc2hlZXQgbmVlZHMgdG8gYmUgcmVzZXQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKi9cbiAgICBhc3luYyBzaGVldF9uZWVkc19yZXNldCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuXG4gICAgICAgIGNvbnN0IHNoZWV0X2RhdGUgPSBsb2dpbl9zaGVldC5zaGVldF9kYXRlO1xuICAgICAgICBjb25zdCBjdXJyZW50X2RhdGUgPSBsb2dpbl9zaGVldC5jdXJyZW50X2RhdGU7XG4gICAgICAgIGNvbnNvbGUubG9nKGBzaGVldF9kYXRlOiAke3NoZWV0X2RhdGV9YCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBjdXJyZW50X2RhdGU6ICR7Y3VycmVudF9kYXRlfWApO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGBkYXRlX2lzX2N1cnJlbnQ6ICR7bG9naW5fc2hlZXQuaXNfY3VycmVudH1gKTtcblxuICAgICAgICByZXR1cm4gIWxvZ2luX3NoZWV0LmlzX2N1cnJlbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzZXRzIHRoZSBHb29nbGUgU2hlZXRzIGZsb3csIGluY2x1ZGluZyBhcmNoaXZpbmcgYW5kIHJlc2V0dGluZyB0aGUgc2hlZXQgaWYgbmVjZXNzYXJ5LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2UgfCB2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgY2hlY2staW4gcmVzcG9uc2Ugb3Igdm9pZC5cbiAgICAgKi9cbiAgICBhc3luYyByZXNldF9zaGVldF9mbG93KCk6IFByb21pc2U8QlZOU1BSZXNwb25zZSB8IHZvaWQ+IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmNoZWNrX3VzZXJfY3JlZHMoXG4gICAgICAgICAgICBgJHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICAgICAgfSwgaW4gb3JkZXIgdG8gcmVzZXQvYXJjaGl2ZSwgSSBuZWVkIHlvdSB0byBhdXRob3JpemUgdGhlIGFwcC5gXG4gICAgICAgICk7XG4gICAgICAgIGlmIChyZXNwb25zZSlcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IHJlc3BvbnNlLnJlc3BvbnNlLFxuICAgICAgICAgICAgICAgIG5leHRfc3RlcDogYCR7TkVYVF9TVEVQUy5BVVRIX1JFU0VUfS0ke3RoaXMuY2hlY2tpbl9tb2RlfWAsXG4gICAgICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5yZXNldF9zaGVldCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc2V0cyB0aGUgR29vZ2xlIFNoZWV0cywgaW5jbHVkaW5nIGFyY2hpdmluZyBhbmQgcmVzZXR0aW5nIHRoZSBzaGVldC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgc2hlZXQgaXMgcmVzZXQuXG4gICAgICovXG4gICAgYXN5bmMgcmVzZXRfc2hlZXQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IHNjcmlwdF9zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfdXNlcl9zY3JpcHRzX3NlcnZpY2UoKTtcbiAgICAgICAgY29uc3Qgc2hvdWxkX3BlcmZvcm1fYXJjaGl2ZSA9ICEoYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKSkuYXJjaGl2ZWQ7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBzaG91bGRfcGVyZm9ybV9hcmNoaXZlXG4gICAgICAgICAgICA/IFwiT2theS4gQXJjaGl2aW5nIGFuZCByZXNldHRpbmcgdGhlIGNoZWNrIGluIHNoZWV0LiBUaGlzIHRha2VzIGFib3V0IDEwIHNlY29uZHMuLi5cIlxuICAgICAgICAgICAgOiBcIk9rYXkuIFNoZWV0IGhhcyBhbHJlYWR5IGJlZW4gYXJjaGl2ZWQuIFBlcmZvcm1pbmcgcmVzZXQuIFRoaXMgdGFrZXMgYWJvdXQgNSBzZWNvbmRzLi4uXCI7XG4gICAgICAgIGF3YWl0IHRoaXMuc2VuZF9tZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICBpZiAoc2hvdWxkX3BlcmZvcm1fYXJjaGl2ZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJBcmNoaXZpbmcuLi5cIik7XG5cbiAgICAgICAgICAgIGF3YWl0IHNjcmlwdF9zZXJ2aWNlLnNjcmlwdHMucnVuKHtcbiAgICAgICAgICAgICAgICBzY3JpcHRJZDogdGhpcy5yZXNldF9zY3JpcHRfaWQsXG4gICAgICAgICAgICAgICAgcmVxdWVzdEJvZHk6IHsgZnVuY3Rpb246IHRoaXMuY29uZmlnLkFSQ0hJVkVfRlVOQ1RJT05fTkFNRSB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmRlbGF5KDUpO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKFwiYXJjaGl2ZVwiKTtcbiAgICAgICAgICAgIHRoaXMubG9naW5fc2hlZXQgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJSZXNldHRpbmcuLi5cIik7XG4gICAgICAgIGF3YWl0IHNjcmlwdF9zZXJ2aWNlLnNjcmlwdHMucnVuKHtcbiAgICAgICAgICAgIHNjcmlwdElkOiB0aGlzLnJlc2V0X3NjcmlwdF9pZCxcbiAgICAgICAgICAgIHJlcXVlc3RCb2R5OiB7IGZ1bmN0aW9uOiB0aGlzLmNvbmZpZy5SRVNFVF9GVU5DVElPTl9OQU1FIH0sXG4gICAgICAgIH0pO1xuICAgICAgICBhd2FpdCB0aGlzLmRlbGF5KDUpO1xuICAgICAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oXCJyZXNldFwiKTtcbiAgICAgICAgYXdhaXQgdGhpcy5zZW5kX21lc3NhZ2UoXCJEb25lLlwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBHb29nbGUgQXBwcyBTY3JpcHQgc2VydmljZS5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzY3JpcHRfdjEuU2NyaXB0Pn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgR29vZ2xlIEFwcHMgU2NyaXB0IHNlcnZpY2UuXG4gICAgICovXG4gICAgYXN5bmMgY2hlY2tfdXNlcl9jcmVkcyhcbiAgICAgICAgcHJvbXB0X21lc3NhZ2U6IHN0cmluZyA9IFwiSGksIGJlZm9yZSB5b3UgY2FuIHVzZSBCVk5TUCBib3QsIHlvdSBtdXN0IGxvZ2luLlwiXG4gICAgKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlIHwgdW5kZWZpbmVkPiB7XG4gICAgICAgIGNvbnN0IHVzZXJfY3JlZHMgPSB0aGlzLmdldF91c2VyX2NyZWRzKCk7XG4gICAgICAgIGlmICghKGF3YWl0IHVzZXJfY3JlZHMubG9hZFRva2VuKCkpKSB7XG4gICAgICAgICAgICBjb25zdCBhdXRoVXJsID0gYXdhaXQgdXNlcl9jcmVkcy5nZXRBdXRoVXJsKCk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgJHtwcm9tcHRfbWVzc2FnZX0gUGxlYXNlIGZvbGxvdyB0aGlzIGxpbms6XG4ke2F1dGhVcmx9XG5cbk1lc3NhZ2UgbWUgYWdhaW4gd2hlbiBkb25lLmAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgR29vZ2xlIEFwcHMgU2NyaXB0IHNlcnZpY2UuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c2NyaXB0X3YxLlNjcmlwdD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIEdvb2dsZSBBcHBzIFNjcmlwdCBzZXJ2aWNlLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF9vbl9kdXR5KCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIGNvbnN0IGNoZWNrZWRfb3V0X3NlY3Rpb24gPSBcIkNoZWNrZWQgT3V0XCI7XG4gICAgICAgIGNvbnN0IGxhc3Rfc2VjdGlvbnMgPSBbY2hlY2tlZF9vdXRfc2VjdGlvbl07XG4gICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKTtcblxuICAgICAgICBjb25zdCBvbl9kdXR5X3BhdHJvbGxlcnMgPSBsb2dpbl9zaGVldC5nZXRfb25fZHV0eV9wYXRyb2xsZXJzKCk7XG4gICAgICAgIGNvbnN0IGJ5X3NlY3Rpb24gPSBvbl9kdXR5X3BhdHJvbGxlcnNcbiAgICAgICAgICAgIC5maWx0ZXIoKHgpID0+IHguY2hlY2tpbilcbiAgICAgICAgICAgIC5yZWR1Y2UoKHByZXY6IHsgW2tleTogc3RyaW5nXTogUGF0cm9sbGVyUm93W10gfSwgY3VyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2hvcnRfY29kZSA9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tpbl92YWx1ZXMuYnlfc2hlZXRfc3RyaW5nW2N1ci5jaGVja2luXS5rZXk7XG4gICAgICAgICAgICAgICAgbGV0IHNlY3Rpb24gPSBjdXIuc2VjdGlvbjtcbiAgICAgICAgICAgICAgICBpZiAoc2hvcnRfY29kZSA9PSBcIm91dFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlY3Rpb24gPSBjaGVja2VkX291dF9zZWN0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIShzZWN0aW9uIGluIHByZXYpKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZbc2VjdGlvbl0gPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcHJldltzZWN0aW9uXS5wdXNoKGN1cik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByZXY7XG4gICAgICAgICAgICB9LCB7fSk7XG4gICAgICAgIGxldCByZXN1bHRzOiBzdHJpbmdbXVtdID0gW107XG4gICAgICAgIGxldCBhbGxfa2V5cyA9IE9iamVjdC5rZXlzKGJ5X3NlY3Rpb24pO1xuICAgICAgICBjb25zdCBvcmRlcmVkX3ByaW1hcnlfc2VjdGlvbnMgPSBPYmplY3Qua2V5cyhieV9zZWN0aW9uKVxuICAgICAgICAgICAgLmZpbHRlcigoeCkgPT4gIWxhc3Rfc2VjdGlvbnMuaW5jbHVkZXMoeCkpXG4gICAgICAgICAgICAuc29ydCgpO1xuICAgICAgICBjb25zdCBmaWx0ZXJlZF9sYXN0X3NlY3Rpb25zID0gbGFzdF9zZWN0aW9ucy5maWx0ZXIoKHgpID0+XG4gICAgICAgICAgICBhbGxfa2V5cy5pbmNsdWRlcyh4KVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBvcmRlcmVkX3NlY3Rpb25zID0gb3JkZXJlZF9wcmltYXJ5X3NlY3Rpb25zLmNvbmNhdChcbiAgICAgICAgICAgIGZpbHRlcmVkX2xhc3Rfc2VjdGlvbnNcbiAgICAgICAgKTtcblxuICAgICAgICBmb3IgKGNvbnN0IHNlY3Rpb24gb2Ygb3JkZXJlZF9zZWN0aW9ucykge1xuICAgICAgICAgICAgbGV0IHJlc3VsdDogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IHBhdHJvbGxlcnMgPSBieV9zZWN0aW9uW3NlY3Rpb25dLnNvcnQoKHgsIHkpID0+XG4gICAgICAgICAgICAgICAgeC5uYW1lLmxvY2FsZUNvbXBhcmUoeS5uYW1lKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChzZWN0aW9uLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKFwiU2VjdGlvbiBcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQucHVzaChgJHtzZWN0aW9ufTogYCk7XG4gICAgICAgICAgICBmdW5jdGlvbiBwYXRyb2xsZXJfc3RyaW5nKG5hbWU6IHN0cmluZywgc2hvcnRfY29kZTogc3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRldGFpbHMgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGlmIChzaG9ydF9jb2RlICE9PSBcImRheVwiICYmIHNob3J0X2NvZGUgIT09IFwib3V0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlscyA9IGAgKCR7c2hvcnRfY29kZS50b1VwcGVyQ2FzZSgpfSlgO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7bmFtZX0ke2RldGFpbHN9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFxuICAgICAgICAgICAgICAgIHBhdHJvbGxlcnNcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgoeCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdHJvbGxlcl9zdHJpbmcoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tpbl92YWx1ZXMuYnlfc2hlZXRfc3RyaW5nW3guY2hlY2tpbl0ua2V5XG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLmpvaW4oXCIsIFwiKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChyZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHRoaXMubG9nX2FjdGlvbihcIm9uLWR1dHlcIik7XG4gICAgICAgIHJldHVybiBgUGF0cm9sbGVycyBmb3IgJHtsb2dpbl9zaGVldC5zaGVldF9kYXRlLnRvRGF0ZVN0cmluZygpfSAoVG90YWw6ICR7XG4gICAgICAgICAgICBvbl9kdXR5X3BhdHJvbGxlcnMubGVuZ3RoXG4gICAgICAgIH0pOlxcbiR7cmVzdWx0cy5tYXAoKHIpID0+IHIuam9pbihcIlwiKSkuam9pbihcIlxcblwiKX1gO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvZ3MgYW4gYWN0aW9uIHRvIHRoZSBHb29nbGUgU2hlZXRzLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhY3Rpb25fbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBhY3Rpb24gdG8gbG9nLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBhY3Rpb24gaXMgbG9nZ2VkLlxuICAgICAqL1xuICAgIGFzeW5jIGxvZ19hY3Rpb24oYWN0aW9uX25hbWU6IHN0cmluZykge1xuICAgICAgICBjb25zdCBzaGVldHNfc2VydmljZSA9IGF3YWl0IHRoaXMuZ2V0X3NoZWV0c19zZXJ2aWNlKCk7XG4gICAgICAgIGF3YWl0IHNoZWV0c19zZXJ2aWNlLnNwcmVhZHNoZWV0cy52YWx1ZXMuYXBwZW5kKHtcbiAgICAgICAgICAgIHNwcmVhZHNoZWV0SWQ6IHRoaXMuY29tYmluZWRfY29uZmlnLlNIRUVUX0lELFxuICAgICAgICAgICAgcmFuZ2U6IHRoaXMuY29uZmlnLkFDVElPTl9MT0dfU0hFRVQsXG4gICAgICAgICAgICB2YWx1ZUlucHV0T3B0aW9uOiBcIlVTRVJfRU5URVJFRFwiLFxuICAgICAgICAgICAgcmVxdWVzdEJvZHk6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZXM6IFtbdGhpcy5wYXRyb2xsZXIhLm5hbWUsIG5ldyBEYXRlKCksIGFjdGlvbl9uYW1lXV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2dzIG91dCB0aGUgdXNlci5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgbG9nb3V0IHJlc3BvbnNlLlxuICAgICAqL1xuICAgIGFzeW5jIGxvZ291dCgpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgdXNlcl9jcmVkcyA9IHRoaXMuZ2V0X3VzZXJfY3JlZHMoKTtcbiAgICAgICAgYXdhaXQgdXNlcl9jcmVkcy5kZWxldGVUb2tlbigpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IFwiT2theSwgSSBoYXZlIHJlbW92ZWQgYWxsIGxvZ2luIHNlc3Npb24gaW5mb3JtYXRpb24uXCIsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgVHdpbGlvIGNsaWVudC5cbiAgICAgKiBAcmV0dXJucyB7VHdpbGlvQ2xpZW50fSBUaGUgVHdpbGlvIGNsaWVudC5cbiAgICAgKi9cbiAgICBnZXRfdHdpbGlvX2NsaWVudCgpIHtcbiAgICAgICAgaWYgKHRoaXMudHdpbGlvX2NsaWVudCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0d2lsaW9fY2xpZW50IHdhcyBuZXZlciBpbml0aWFsaXplZCFcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudHdpbGlvX2NsaWVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBUd2lsaW8gU3luYyBjbGllbnQuXG4gICAgICogQHJldHVybnMge1NlcnZpY2VDb250ZXh0fSBUaGUgVHdpbGlvIFN5bmMgY2xpZW50LlxuICAgICAqL1xuICAgIGdldF9zeW5jX2NsaWVudCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN5bmNfY2xpZW50KSB7XG4gICAgICAgICAgICB0aGlzLnN5bmNfY2xpZW50ID0gdGhpcy5nZXRfdHdpbGlvX2NsaWVudCgpLnN5bmMudjEuc2VydmljZXMoXG4gICAgICAgICAgICAgICAgdGhpcy5zeW5jX3NpZFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zeW5jX2NsaWVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB1c2VyIGNyZWRlbnRpYWxzLlxuICAgICAqIEByZXR1cm5zIHtVc2VyQ3JlZHN9IFRoZSB1c2VyIGNyZWRlbnRpYWxzLlxuICAgICAqL1xuICAgIGdldF91c2VyX2NyZWRzKCkge1xuICAgICAgICBpZiAoIXRoaXMudXNlcl9jcmVkcykge1xuICAgICAgICAgICAgdGhpcy51c2VyX2NyZWRzID0gbmV3IFVzZXJDcmVkcyhcbiAgICAgICAgICAgICAgICB0aGlzLmdldF9zeW5jX2NsaWVudCgpLFxuICAgICAgICAgICAgICAgIHRoaXMuZnJvbSxcbiAgICAgICAgICAgICAgICB0aGlzLmNvbWJpbmVkX2NvbmZpZ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy51c2VyX2NyZWRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHNlcnZpY2UgY3JlZGVudGlhbHMuXG4gICAgICogQHJldHVybnMge0dvb2dsZUF1dGh9IFRoZSBzZXJ2aWNlIGNyZWRlbnRpYWxzLlxuICAgICAqL1xuICAgIGdldF9zZXJ2aWNlX2NyZWRzKCkge1xuICAgICAgICBpZiAoIXRoaXMuc2VydmljZV9jcmVkcykge1xuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlX2NyZWRzID0gbmV3IGdvb2dsZS5hdXRoLkdvb2dsZUF1dGgoe1xuICAgICAgICAgICAgICAgIGtleUZpbGU6IGdldF9zZXJ2aWNlX2NyZWRlbnRpYWxzX3BhdGgoKSxcbiAgICAgICAgICAgICAgICBzY29wZXM6IHRoaXMuU0NPUEVTLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZV9jcmVkcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB2YWxpZCBjcmVkZW50aWFscy5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtyZXF1aXJlX3VzZXJfY3JlZHM9ZmFsc2VdIC0gV2hldGhlciB1c2VyIGNyZWRlbnRpYWxzIGFyZSByZXF1aXJlZC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxHb29nbGVBdXRoPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgdmFsaWQgY3JlZGVudGlhbHMuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3ZhbGlkX2NyZWRzKHJlcXVpcmVfdXNlcl9jcmVkczogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5VU0VfU0VSVklDRV9BQ0NPVU5UICYmICFyZXF1aXJlX3VzZXJfY3JlZHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldF9zZXJ2aWNlX2NyZWRzKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXNlcl9jcmVkcyA9IHRoaXMuZ2V0X3VzZXJfY3JlZHMoKTtcbiAgICAgICAgaWYgKCEoYXdhaXQgdXNlcl9jcmVkcy5sb2FkVG9rZW4oKSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVzZXIgaXMgbm90IGF1dGhlZC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJVc2luZyB1c2VyIGFjY291bnQgZm9yIHNlcnZpY2UgYXV0aC4uLlwiKTtcbiAgICAgICAgcmV0dXJuIHVzZXJfY3JlZHMub2F1dGgyX2NsaWVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBHb29nbGUgU2hlZXRzIHNlcnZpY2UuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c2hlZXRzX3Y0LlNoZWV0cz59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIEdvb2dsZSBTaGVldHMgc2VydmljZS5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfc2hlZXRzX3NlcnZpY2UoKSB7XG4gICAgICAgIGlmICghdGhpcy5zaGVldHNfc2VydmljZSkge1xuICAgICAgICAgICAgdGhpcy5zaGVldHNfc2VydmljZSA9IGdvb2dsZS5zaGVldHMoe1xuICAgICAgICAgICAgICAgIHZlcnNpb246IFwidjRcIixcbiAgICAgICAgICAgICAgICBhdXRoOiBhd2FpdCB0aGlzLmdldF92YWxpZF9jcmVkcygpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2hlZXRzX3NlcnZpY2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbG9naW4gc2hlZXQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8TG9naW5TaGVldD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGxvZ2luIHNoZWV0XG4gICAgICovXG4gICAgYXN5bmMgZ2V0X2xvZ2luX3NoZWV0KCkge1xuICAgICAgICBpZiAoIXRoaXMubG9naW5fc2hlZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0X2NvbmZpZzogTG9naW5TaGVldENvbmZpZyA9IHRoaXMuY29tYmluZWRfY29uZmlnO1xuICAgICAgICAgICAgY29uc3Qgc2hlZXRzX3NlcnZpY2UgPSBhd2FpdCB0aGlzLmdldF9zaGVldHNfc2VydmljZSgpO1xuICAgICAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBuZXcgTG9naW5TaGVldChcbiAgICAgICAgICAgICAgICBzaGVldHNfc2VydmljZSxcbiAgICAgICAgICAgICAgICBsb2dpbl9zaGVldF9jb25maWdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBhd2FpdCBsb2dpbl9zaGVldC5yZWZyZXNoKCk7XG4gICAgICAgICAgICB0aGlzLmxvZ2luX3NoZWV0ID0gbG9naW5fc2hlZXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubG9naW5fc2hlZXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgc2Vhc29uIHNoZWV0LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFNlYXNvblNoZWV0Pn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgc2Vhc29uIHNoZWV0XG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3NlYXNvbl9zaGVldCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNlYXNvbl9zaGVldCkge1xuICAgICAgICAgICAgY29uc3Qgc2Vhc29uX3NoZWV0X2NvbmZpZzogU2Vhc29uU2hlZXRDb25maWcgPSB0aGlzLmNvbWJpbmVkX2NvbmZpZztcbiAgICAgICAgICAgIGNvbnN0IHNoZWV0c19zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfc2hlZXRzX3NlcnZpY2UoKTtcbiAgICAgICAgICAgIHRoaXMuc2Vhc29uX3NoZWV0ID0gbmV3IFNlYXNvblNoZWV0KFxuICAgICAgICAgICAgICAgIHNoZWV0c19zZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHNlYXNvbl9zaGVldF9jb25maWdcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2Vhc29uX3NoZWV0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGd1ZXN0IHBhc3Mgc2hlZXQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8R3Vlc3RQYXNzU2hlZXQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBndWVzdCBwYXNzIHNoZWV0XG4gICAgICovXG4gICAgYXN5bmMgZ2V0X2d1ZXN0X3Bhc3Nfc2hlZXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5ndWVzdF9wYXNzX3NoZWV0KSB7XG4gICAgICAgICAgICBjb25zdCBjb25maWc6IEd1ZXN0UGFzc2VzQ29uZmlnID0gdGhpcy5jb21iaW5lZF9jb25maWc7XG4gICAgICAgICAgICBjb25zdCBzaGVldHNfc2VydmljZSA9IGF3YWl0IHRoaXMuZ2V0X3NoZWV0c19zZXJ2aWNlKCk7XG4gICAgICAgICAgICB0aGlzLmd1ZXN0X3Bhc3Nfc2hlZXQgPSBuZXcgR3Vlc3RQYXNzU2hlZXQoc2hlZXRzX3NlcnZpY2UsIGNvbmZpZyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZ3Vlc3RfcGFzc19zaGVldDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIEdvb2dsZSBBcHBzIFNjcmlwdCBzZXJ2aWNlLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHNjcmlwdF92MS5TY3JpcHQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBHb29nbGUgQXBwcyBTY3JpcHQgc2VydmljZS5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfdXNlcl9zY3JpcHRzX3NlcnZpY2UoKSB7XG4gICAgICAgIGlmICghdGhpcy51c2VyX3NjcmlwdHNfc2VydmljZSkge1xuICAgICAgICAgICAgdGhpcy51c2VyX3NjcmlwdHNfc2VydmljZSA9IGdvb2dsZS5zY3JpcHQoe1xuICAgICAgICAgICAgICAgIHZlcnNpb246IFwidjFcIixcbiAgICAgICAgICAgICAgICBhdXRoOiBhd2FpdCB0aGlzLmdldF92YWxpZF9jcmVkcyh0cnVlKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJfc2NyaXB0c19zZXJ2aWNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG1hcHBlZCBwYXRyb2xsZXIuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbZm9yY2U9ZmFsc2VdIC0gV2hldGhlciB0byBmb3JjZSB0aGUgcGF0cm9sbGVyIHRvIGJlIGZvdW5kLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2UgfCB2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcmVzcG9uc2Ugb3Igdm9pZC5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfbWFwcGVkX3BhdHJvbGxlcihmb3JjZTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IHBob25lX2xvb2t1cCA9IGF3YWl0IHRoaXMuZmluZF9wYXRyb2xsZXJfZnJvbV9udW1iZXIoKTtcbiAgICAgICAgaWYgKHBob25lX2xvb2t1cCA9PT0gdW5kZWZpbmVkIHx8IHBob25lX2xvb2t1cCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGZvcmNlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGZpbmQgYXNzb2NpYXRlZCB1c2VyXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYFNvcnJ5LCBJIGNvdWxkbid0IGZpbmQgYW4gYXNzb2NpYXRlZCBCVk5TUCBtZW1iZXIgd2l0aCB5b3VyIHBob25lIG51bWJlciAoJHt0aGlzLmZyb219KWAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuICAgICAgICBjb25zdCBtYXBwZWRQYXRyb2xsZXIgPSBsb2dpbl9zaGVldC50cnlfZmluZF9wYXRyb2xsZXIoXG4gICAgICAgICAgICBwaG9uZV9sb29rdXAubmFtZVxuICAgICAgICApO1xuICAgICAgICBpZiAobWFwcGVkUGF0cm9sbGVyID09PSBcIm5vdF9mb3VuZFwiKSB7XG4gICAgICAgICAgICBpZiAoZm9yY2UpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgcGF0cm9sbGVyIGluIGxvZ2luIHNoZWV0XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYENvdWxkIG5vdCBmaW5kIHBhdHJvbGxlciAnJHtwaG9uZV9sb29rdXAubmFtZX0nIGluIGxvZ2luIHNoZWV0LiBQbGVhc2UgbG9vayBhdCB0aGUgbG9naW4gc2hlZXQgbmFtZSwgYW5kIGNvcHkgaXQgdG8gdGhlIFBob25lIE51bWJlcnMgdGFiLmAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3VycmVudF9zaGVldF9kYXRlID0gbG9naW5fc2hlZXQuY3VycmVudF9kYXRlO1xuICAgICAgICB0aGlzLnBhdHJvbGxlciA9IG1hcHBlZFBhdHJvbGxlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaW5kcyB0aGUgcGF0cm9sbGVyIGZyb20gdGhlIHBob25lIG51bWJlci5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxQYXRyb2xsZXJSb3c+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBwYXRyb2xsZXIuXG4gICAgICovXG4gICAgYXN5bmMgZmluZF9wYXRyb2xsZXJfZnJvbV9udW1iZXIoKSB7XG4gICAgICAgIGNvbnN0IHJhd19udW1iZXIgPSB0aGlzLmZyb207XG4gICAgICAgIGNvbnN0IHNoZWV0c19zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfc2hlZXRzX3NlcnZpY2UoKTtcbiAgICAgICAgY29uc3Qgb3B0czogRmluZFBhdHJvbGxlckNvbmZpZyA9IHRoaXMuY29tYmluZWRfY29uZmlnO1xuICAgICAgICBjb25zdCBudW1iZXIgPSBzYW5pdGl6ZV9waG9uZV9udW1iZXIocmF3X251bWJlcik7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgc2hlZXRzX3NlcnZpY2Uuc3ByZWFkc2hlZXRzLnZhbHVlcy5nZXQoe1xuICAgICAgICAgICAgc3ByZWFkc2hlZXRJZDogb3B0cy5TSEVFVF9JRCxcbiAgICAgICAgICAgIHJhbmdlOiBvcHRzLlBIT05FX05VTUJFUl9MT09LVVBfU0hFRVQsXG4gICAgICAgICAgICB2YWx1ZVJlbmRlck9wdGlvbjogXCJVTkZPUk1BVFRFRF9WQUxVRVwiLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhLnZhbHVlcykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGZpbmQgcGF0cm9sbGVyLlwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS52YWx1ZXNcbiAgICAgICAgICAgIC5tYXAoKHJvdykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJhd051bWJlciA9XG4gICAgICAgICAgICAgICAgICAgIHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5QSE9ORV9OVU1CRVJfTlVNQkVSX0NPTFVNTildO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnROdW1iZXIgPVxuICAgICAgICAgICAgICAgICAgICByYXdOdW1iZXIgIT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHNhbml0aXplX3Bob25lX251bWJlcihyYXdOdW1iZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHJhd051bWJlcjtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50TmFtZSA9XG4gICAgICAgICAgICAgICAgICAgIHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5QSE9ORV9OVU1CRVJfTkFNRV9DT0xVTU4pXTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge25hbWU6IGN1cnJlbnROYW1lLCBudW1iZXI6IGN1cnJlbnROdW1iZXJ9O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5maWx0ZXIoKHBhdHJvbGxlcikgPT4gcGF0cm9sbGVyLm51bWJlciA9PT0gbnVtYmVyKVswXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm9tcHRzIHRoZSB1c2VyIGZvciBhIGNvbXAgb3IgbWFuYWdlciBwYXNzLlxuICAgICAqIFdlIGRvIG5vdCByZXF1aXJlIGEgZ3Vlc3QgbmFtZSBpbiB0aGUgU01TIGZsb3c7IHRoaXMgcmV0dXJucyB0aGUgc3RhdHVzL3Byb21wdFxuICAgICAqIGZvciBndWVzdCBwYXNzZXMgc28gdGhlIEd1ZXN0IFBhc3MgY29tbWFuZCBiZWhhdmVzIGxpa2Ugb3RoZXIgaW1tZWRpYXRlIGFjdGlvbnMuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHJlc3BvbnNlLlxuICAgICAqL1xuICAgIGFzeW5jIHByb21wdF9ndWVzdF9wYXNzKCk6IFByb21pc2U8QlZOU1BSZXNwb25zZT4ge1xuICAgICAgICAvLyBBbGxvdyBhbGwgcGF0cm9sbGVycyAoaW5jbHVkaW5nIGNhbmRpZGF0ZXMpIHRvIHVzZSBndWVzdCBwYXNzZXMgd2hlbiBhdmFpbGFibGUuXG4gICAgICAgIGNvbnN0IHNoZWV0ID0gYXdhaXQgdGhpcy5nZXRfZ3Vlc3RfcGFzc19zaGVldCgpO1xuICAgICAgICBjb25zdCB1c2VkX2FuZF9hdmFpbGFibGUgPSBhd2FpdCBzaGVldC5nZXRfYXZhaWxhYmxlX2FuZF91c2VkX3Bhc3Nlcyh0aGlzLnBhdHJvbGxlciEubmFtZSk7XG4gICAgICAgIGlmICh1c2VkX2FuZF9hdmFpbGFibGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgcmVzcG9uc2U6IFwiUHJvYmxlbSBsb29raW5nIHVwIHBhdHJvbGxlciBmb3IgZ3Vlc3QgcGFzc2VzXCIgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHRoZXJlIGFyZSBubyBhdmFpbGFibGUgcGFzc2VzIHRvZGF5LCByZXR1cm4gdGhlIHByb21wdCBpbmRpY2F0aW5nIG5vbmUgYXJlIGF2YWlsYWJsZS5cbiAgICAgICAgaWYgKHVzZWRfYW5kX2F2YWlsYWJsZS5hdmFpbGFibGUgPCAxKSB7XG4gICAgICAgICAgICByZXR1cm4gdXNlZF9hbmRfYXZhaWxhYmxlLmdldF9wcm9tcHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENvbnN1bWUgb25lIGF2YWlsYWJsZSBwYXNzICh0aGUgc2hlZXQgcmVjb3JkcyBvbmx5IHRoZSBkYXRlIG9mIHVzZSkuXG4gICAgICAgIGF3YWl0IHNoZWV0LnNldF91c2VkX2d1ZXN0X3Bhc3Nlcyh1c2VkX2FuZF9hdmFpbGFibGUpO1xuXG4gICAgICAgIC8vIFJlLXJlYWQgdGhlIHZhbHVlcyBhbmQgcmV0dXJuIGNvbmZpcm1hdGlvbiArIHVwZGF0ZWQgc3RhdHVzLlxuICAgICAgICBjb25zdCB1cGRhdGVkID0gYXdhaXQgc2hlZXQuZ2V0X2F2YWlsYWJsZV9hbmRfdXNlZF9wYXNzZXModGhpcy5wYXRyb2xsZXIhLm5hbWUpO1xuICAgICAgICBpZiAodXBkYXRlZCA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4geyByZXNwb25zZTogYFVwZGF0ZWQgJHt0aGlzLnBhdHJvbGxlciEubmFtZX0gdG8gdXNlIGEgZ3Vlc3QgcGFzcyB0b2RheS5gIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzdGF0dXMgPSBidWlsZF9wYXNzZXNfc3RyaW5nKFxuICAgICAgICAgICAgdXBkYXRlZC51c2VkX3NlYXNvbixcbiAgICAgICAgICAgIHVwZGF0ZWQudXNlZF9zZWFzb24gKyB1cGRhdGVkLmF2YWlsYWJsZSxcbiAgICAgICAgICAgIHVwZGF0ZWQudXNlZF90b2RheVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IGBVcGRhdGVkICR7dGhpcy5wYXRyb2xsZXIhLm5hbWV9IHRvIHVzZSBhIGd1ZXN0IHBhc3MgdG9kYXkuXFxuJHtzdGF0dXN9YCxcbiAgICAgICAgfTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBzaGVldHNfdjQgfSBmcm9tIFwiZ29vZ2xlYXBpc1wiO1xuaW1wb3J0IHsgR3Vlc3RQYXNzZXNDb25maWcgfSBmcm9tIFwiLi4vZW52L2hhbmRsZXJfY29uZmlnXCI7XG5pbXBvcnQgeyBleGNlbF9yb3dfdG9faW5kZXgsIHJvd19jb2xfdG9fZXhjZWxfaW5kZXgsIHBhcnNlX2Jvb2xlYW5fY2VsbCB9IGZyb20gXCIuLi91dGlscy91dGlsXCI7XG5pbXBvcnQgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIgZnJvbSBcIi4uL3V0aWxzL2dvb2dsZV9zaGVldHNfc3ByZWFkc2hlZXRfdGFiXCI7XG5pbXBvcnQgeyBmb3JtYXRfZGF0ZV9mb3Jfc3ByZWFkc2hlZXRfdmFsdWUgfSBmcm9tIFwiLi4vdXRpbHMvZGF0ZXRpbWVfdXRpbFwiO1xuaW1wb3J0IHsgYnVpbGRfcGFzc2VzX3N0cmluZyB9IGZyb20gXCIuLi91dGlscy9ndWVzdF9wYXNzZXNcIjtcbmltcG9ydCB7IEJWTlNQUmVzcG9uc2UgfSBmcm9tIFwiLi4vaGFuZGxlcnMvYnZuc3BfaGFuZGxlclwiO1xuXG5leHBvcnQgY2xhc3MgVXNlZEFuZEF2YWlsYWJsZVBhc3NlcyB7XG4gICAgcm93OiBhbnlbXTtcbiAgICBpbmRleDogbnVtYmVyO1xuICAgIGVsaWdpYmxlOiBib29sZWFuO1xuICAgIGVsaWdpYmxlX3JlYXNvbjogc3RyaW5nO1xuICAgIGF2YWlsYWJsZTogbnVtYmVyO1xuICAgIHVzZWRfdG9kYXk6IG51bWJlcjtcbiAgICB1c2VkX3NlYXNvbjogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHJvdzogYW55W10sXG4gICAgICAgIGluZGV4OiBudW1iZXIsXG4gICAgICAgIGVsaWdpYmxlOiBhbnksXG4gICAgICAgIGVsaWdpYmxlX3JlYXNvbjogYW55LFxuICAgICAgICBhdmFpbGFibGU6IGFueSxcbiAgICAgICAgdXNlZF90b2RheTogYW55LFxuICAgICAgICB1c2VkX3NlYXNvbjogYW55XG4gICAgKSB7XG4gICAgICAgIHRoaXMucm93ID0gcm93O1xuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgICAgIHRoaXMuZWxpZ2libGUgPSBwYXJzZV9ib29sZWFuX2NlbGwoZWxpZ2libGUpO1xuICAgICAgICB0aGlzLmVsaWdpYmxlX3JlYXNvbiA9IFN0cmluZyhlbGlnaWJsZV9yZWFzb24gPz8gXCJcIik7XG4gICAgICAgIHRoaXMuYXZhaWxhYmxlID0gTnVtYmVyKGF2YWlsYWJsZSk7XG4gICAgICAgIHRoaXMudXNlZF90b2RheSA9IE51bWJlcih1c2VkX3RvZGF5KTtcbiAgICAgICAgdGhpcy51c2VkX3NlYXNvbiA9IE51bWJlcih1c2VkX3NlYXNvbik7XG4gICAgfVxuXG4gICAgZ2V0X3Byb21wdCgpOiBCVk5TUFJlc3BvbnNlIHtcbiAgICAgICAgaWYgKHRoaXMuYXZhaWxhYmxlID4gMCkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBidWlsZF9wYXNzZXNfc3RyaW5nKFxuICAgICAgICAgICAgICAgIHRoaXMudXNlZF9zZWFzb24sXG4gICAgICAgICAgICAgICAgdGhpcy5hdmFpbGFibGUgKyB0aGlzLnVzZWRfc2Vhc29uLFxuICAgICAgICAgICAgICAgIHRoaXMudXNlZF90b2RheSxcbiAgICAgICAgICAgICAgICB0cnVlXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmVsaWdpYmxlKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgWW91IGFyZSBub3QgZWxpZ2libGUgZm9yIGd1ZXN0IHBhc3Nlcy4gUmVhc29uOiAke3RoaXMuZWxpZ2libGVfcmVhc29ufWAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZTogXCJZb3UgZG8gbm90IGhhdmUgYW55IGd1ZXN0IHBhc3NlcyBhdmFpbGFibGUgdG9kYXlcIixcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQYXNzU2hlZXQge1xuICAgIHNoZWV0OiBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYjtcblxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihzaGVldDogR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIpIHtcbiAgICAgICAgdGhpcy5zaGVldCA9IHNoZWV0O1xuICAgIH1cblxuICAgIGFic3RyYWN0IGdldCBlbGlnaWJsZV9jb2x1bW4oKTogc3RyaW5nO1xuICAgIGFic3RyYWN0IGdldCBlbGlnaWJsZV9yZWFzb25fY29sdW1uKCk6IHN0cmluZztcbiAgICBhYnN0cmFjdCBnZXQgYXZhaWxhYmxlX2NvbHVtbigpOiBzdHJpbmc7XG4gICAgYWJzdHJhY3QgZ2V0IHVzZWRfdG9kYXlfY29sdW1uKCk6IHN0cmluZztcbiAgICBhYnN0cmFjdCBnZXQgdXNlZF9zZWFzb25fY29sdW1uKCk6IHN0cmluZztcbiAgICBhYnN0cmFjdCBnZXQgbmFtZV9jb2x1bW4oKTogc3RyaW5nO1xuICAgIGFic3RyYWN0IGdldCBzdGFydF9pbmRleCgpOiBudW1iZXI7XG4gICAgYWJzdHJhY3QgZ2V0IHNoZWV0X25hbWUoKTogc3RyaW5nO1xuXG4gICAgYXN5bmMgZ2V0X2F2YWlsYWJsZV9hbmRfdXNlZF9wYXNzZXMoXG4gICAgICAgIHBhdHJvbGxlcl9uYW1lOiBzdHJpbmdcbiAgICApOiBQcm9taXNlPFVzZWRBbmRBdmFpbGFibGVQYXNzZXMgfCBudWxsPiB7XG4gICAgICAgIGNvbnN0IHBhdHJvbGxlcl9yb3cgPSBhd2FpdCB0aGlzLnNoZWV0LmdldF9zaGVldF9yb3dfZm9yX3BhdHJvbGxlcihcbiAgICAgICAgICAgIHBhdHJvbGxlcl9uYW1lLFxuICAgICAgICAgICAgdGhpcy5uYW1lX2NvbHVtblxuICAgICAgICApO1xuICAgICAgICBpZiAocGF0cm9sbGVyX3JvdyA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBlbGlnaWJsZSA9XG4gICAgICAgICAgICBwYXRyb2xsZXJfcm93LnJvd1tleGNlbF9yb3dfdG9faW5kZXgodGhpcy5lbGlnaWJsZV9jb2x1bW4pXTtcbiAgICAgICAgY29uc3QgZWxpZ2libGVfcmVhc29uID1cbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cucm93W2V4Y2VsX3Jvd190b19pbmRleCh0aGlzLmVsaWdpYmxlX3JlYXNvbl9jb2x1bW4pXTtcbiAgICAgICAgY29uc3QgY3VycmVudF9kYXlfYXZhaWxhYmxlX3Bhc3NlcyA9XG4gICAgICAgICAgICBwYXRyb2xsZXJfcm93LnJvd1tleGNlbF9yb3dfdG9faW5kZXgodGhpcy5hdmFpbGFibGVfY29sdW1uKV07XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfZGF5X3VzZWRfcGFzc2VzID1cbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cucm93W2V4Y2VsX3Jvd190b19pbmRleCh0aGlzLnVzZWRfdG9kYXlfY29sdW1uKV07XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfc2Vhc29uX3VzZWRfcGFzc2VzID1cbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cucm93W2V4Y2VsX3Jvd190b19pbmRleCh0aGlzLnVzZWRfc2Vhc29uX2NvbHVtbildO1xuICAgICAgICByZXR1cm4gbmV3IFVzZWRBbmRBdmFpbGFibGVQYXNzZXMoXG4gICAgICAgICAgICBwYXRyb2xsZXJfcm93LnJvdyxcbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cuaW5kZXgsXG4gICAgICAgICAgICBlbGlnaWJsZSxcbiAgICAgICAgICAgIGVsaWdpYmxlX3JlYXNvbixcbiAgICAgICAgICAgIGN1cnJlbnRfZGF5X2F2YWlsYWJsZV9wYXNzZXMsXG4gICAgICAgICAgICBjdXJyZW50X2RheV91c2VkX3Bhc3NlcyxcbiAgICAgICAgICAgIGN1cnJlbnRfc2Vhc29uX3VzZWRfcGFzc2VzXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgYXN5bmMgc2V0X3VzZWRfZ3Vlc3RfcGFzc2VzKFxuICAgICAgICBwYXRyb2xsZXJfcm93OiBVc2VkQW5kQXZhaWxhYmxlUGFzc2VzLFxuICAgICkge1xuICAgICAgICBpZiAoIXBhdHJvbGxlcl9yb3cuZWxpZ2libGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICBgUGF0cm9sbGVyIGlzIG5vdCBlbGlnaWJsZSBmb3IgZ3Vlc3QgcGFzc2VzLiBSZWFzb246ICR7cGF0cm9sbGVyX3Jvdy5lbGlnaWJsZV9yZWFzb259YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGF0cm9sbGVyX3Jvdy5hdmFpbGFibGUgPCAxKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgYE5vdCBlbm91Z2ggYXZhaWxhYmxlIHBhc3NlczogQXZhaWxhYmxlOiAke3BhdHJvbGxlcl9yb3cuYXZhaWxhYmxlfSwgVXNlZCB0aGlzIHNlYXNvbjogICR7cGF0cm9sbGVyX3Jvdy51c2VkX3NlYXNvbn0sIFVzZWQgdG9kYXk6ICR7cGF0cm9sbGVyX3Jvdy51c2VkX3RvZGF5fWBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByb3dudW0gPSBwYXRyb2xsZXJfcm93LmluZGV4O1xuICAgICAgICBjb25zdCBzdGFydF9pbmRleCA9IHRoaXMuc3RhcnRfaW5kZXg7XG4gICAgICAgIGNvbnN0IHByaW9yX2xlbmd0aCA9IHBhdHJvbGxlcl9yb3cucm93Lmxlbmd0aCAtIHN0YXJ0X2luZGV4O1xuICAgICAgICBjb25zdCBjdXJyZW50X2RhdGVfc3RyaW5nID0gZm9ybWF0X2RhdGVfZm9yX3NwcmVhZHNoZWV0X3ZhbHVlKG5ldyBEYXRlKCkpO1xuXG4gICAgICAgIGNvbnN0IG5ld192YWxzID0gcGF0cm9sbGVyX3Jvdy5yb3dcbiAgICAgICAgICAgIC5zbGljZShzdGFydF9pbmRleClcbiAgICAgICAgICAgIC5tYXAoKHgpID0+IHg/LnRvU3RyaW5nKCkpO1xuXG4gICAgICAgIC8vIFJlY29yZCBvbmx5IHRoZSBkYXRlIG9mIHRoZSB1c2U7IG5vIGd1ZXN0IG5hbWUgaXMgc3RvcmVkLlxuICAgICAgICBuZXdfdmFscy5wdXNoKGN1cnJlbnRfZGF0ZV9zdHJpbmcpO1xuXG4gICAgICAgIGNvbnN0IHVwZGF0ZV9sZW5ndGggPSBNYXRoLm1heChwcmlvcl9sZW5ndGgsIG5ld192YWxzLmxlbmd0aCk7XG4gICAgICAgIHdoaWxlIChuZXdfdmFscy5sZW5ndGggPCB1cGRhdGVfbGVuZ3RoKSB7XG4gICAgICAgICAgICBuZXdfdmFscy5wdXNoKFwiXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZW5kX2luZGV4ID0gc3RhcnRfaW5kZXggKyB1cGRhdGVfbGVuZ3RoIC0gMTtcbiAgICAgICAgY29uc3QgcmFuZ2UgPSBgJHt0aGlzLnNoZWV0LnNoZWV0X25hbWV9ISR7cm93X2NvbF90b19leGNlbF9pbmRleChcbiAgICAgICAgICAgIHJvd251bSxcbiAgICAgICAgICAgIHN0YXJ0X2luZGV4XG4gICAgICAgICl9OiR7cm93X2NvbF90b19leGNlbF9pbmRleChyb3dudW0sIGVuZF9pbmRleCl9YDtcblxuICAgICAgICBjb25zb2xlLmxvZyhgVXBkYXRpbmcgJHtyYW5nZX0gd2l0aCAke25ld192YWxzLmxlbmd0aH0gdmFsdWVzYCk7XG4gICAgICAgIGF3YWl0IHRoaXMuc2hlZXQudXBkYXRlX3ZhbHVlcyhyYW5nZSwgW25ld192YWxzXSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgR3Vlc3RQYXNzU2hlZXQgZXh0ZW5kcyBQYXNzU2hlZXQge1xuICAgIGNvbmZpZzogR3Vlc3RQYXNzZXNDb25maWc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgc2hlZXRzX3NlcnZpY2U6IHNoZWV0c192NC5TaGVldHMgfCBudWxsLFxuICAgICAgICBjb25maWc6IEd1ZXN0UGFzc2VzQ29uZmlnXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgbmV3IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiKFxuICAgICAgICAgICAgICAgIHNoZWV0c19zZXJ2aWNlLFxuICAgICAgICAgICAgICAgIGNvbmZpZy5TSEVFVF9JRCxcbiAgICAgICAgICAgICAgICBjb25maWcuR1VFU1RfUEFTU19TSEVFVFxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICB9XG5cbiAgICBnZXQgc3RhcnRfaW5kZXgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGV4Y2VsX3Jvd190b19pbmRleChcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLkdVRVNUX1BBU1NfU0hFRVRfREFURVNfU1RBUlRJTkdfQ09MVU1OXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0IHNoZWV0X25hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLkdVRVNUX1BBU1NfU0hFRVQ7XG4gICAgfVxuXG4gICAgZ2V0IGVsaWdpYmxlX2NvbHVtbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuR1VFU1RfUEFTU19FTElHSUJMRV9DT0xVTU47XG4gICAgfVxuXG4gICAgZ2V0IGVsaWdpYmxlX3JlYXNvbl9jb2x1bW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLkdVRVNUX1BBU1NfRUxJR0lCTEVfUkVBU09OX0NPTFVNTjtcbiAgICB9XG5cbiAgICBnZXQgYXZhaWxhYmxlX2NvbHVtbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuR1VFU1RfUEFTU19TSEVFVF9BVkFJTEFCTEVfQ09MVU1OO1xuICAgIH1cblxuICAgIGdldCB1c2VkX3RvZGF5X2NvbHVtbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuR1VFU1RfUEFTU19TSEVFVF9VU0VEX1RPREFZX0NPTFVNTjtcbiAgICB9XG5cbiAgICBnZXQgdXNlZF9zZWFzb25fY29sdW1uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5HVUVTVF9QQVNTX1NIRUVUX1VTRURfU0VBU09OX0NPTFVNTjtcbiAgICB9XG5cbiAgICBnZXQgbmFtZV9jb2x1bW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLkdVRVNUX1BBU1NfU0hFRVRfTkFNRV9DT0xVTU47XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQsIGV4Y2VsX3Jvd190b19pbmRleCB9IGZyb20gXCIuLi91dGlscy91dGlsXCI7XG5pbXBvcnQgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIgZnJvbSBcIi4uL3V0aWxzL2dvb2dsZV9zaGVldHNfc3ByZWFkc2hlZXRfdGFiXCI7XG5pbXBvcnQgeyBzYW5pdGl6ZV9kYXRlIH0gZnJvbSBcIi4uL3V0aWxzL2RhdGV0aW1lX3V0aWxcIjtcbmltcG9ydCB7IExvZ2luU2hlZXRDb25maWcsIFBhdHJvbGxlclJvd0NvbmZpZyB9IGZyb20gXCIuLi9lbnYvaGFuZGxlcl9jb25maWdcIjtcbmltcG9ydCB7IHNoZWV0c192NCB9IGZyb20gXCJnb29nbGVhcGlzXCI7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHJvdyBvZiBwYXRyb2xsZXIgZGF0YS5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IFBhdHJvbGxlclJvd1xuICogQHByb3BlcnR5IHtudW1iZXJ9IGluZGV4IC0gVGhlIGluZGV4IG9mIHRoZSByb3cuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwYXRyb2xsZXIuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gY2F0ZWdvcnkgLSBUaGUgY2F0ZWdvcnkgb2YgdGhlIHBhdHJvbGxlci5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBzZWN0aW9uIC0gVGhlIHNlY3Rpb24gb2YgdGhlIHBhdHJvbGxlci5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBjaGVja2luIC0gVGhlIGNoZWNrLWluIHN0YXR1cyBvZiB0aGUgcGF0cm9sbGVyLlxuICovXG5leHBvcnQgdHlwZSBQYXRyb2xsZXJSb3cgPSB7XG4gICAgaW5kZXg6IG51bWJlcjtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgY2F0ZWdvcnk6IHN0cmluZztcbiAgICBzZWN0aW9uOiBzdHJpbmc7XG4gICAgY2hlY2tpbjogc3RyaW5nO1xufTtcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBsb2dpbiBzaGVldCBpbiBHb29nbGUgU2hlZXRzLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dpblNoZWV0IHtcbiAgICBsb2dpbl9zaGVldDogR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWI7XG4gICAgY2hlY2tpbl9jb3VudF9zaGVldDogR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWI7XG4gICAgY29uZmlnOiBMb2dpblNoZWV0Q29uZmlnO1xuICAgIHJvd3M/OiBhbnlbXVtdIHwgbnVsbCA9IG51bGw7XG4gICAgY2hlY2tpbl9jb3VudDogbnVtYmVyIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgIHBhdHJvbGxlcnM6IFBhdHJvbGxlclJvd1tdID0gW107XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIExvZ2luU2hlZXQuXG4gICAgICogQHBhcmFtIHtzaGVldHNfdjQuU2hlZXRzIHwgbnVsbH0gc2hlZXRzX3NlcnZpY2UgLSBUaGUgR29vZ2xlIFNoZWV0cyBBUEkgc2VydmljZS5cbiAgICAgKiBAcGFyYW0ge0xvZ2luU2hlZXRDb25maWd9IGNvbmZpZyAtIFRoZSBjb25maWd1cmF0aW9uIGZvciB0aGUgbG9naW4gc2hlZXQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzIHwgbnVsbCxcbiAgICAgICAgY29uZmlnOiBMb2dpblNoZWV0Q29uZmlnXG4gICAgKSB7XG4gICAgICAgIHRoaXMubG9naW5fc2hlZXQgPSBuZXcgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIoXG4gICAgICAgICAgICBzaGVldHNfc2VydmljZSxcbiAgICAgICAgICAgIGNvbmZpZy5TSEVFVF9JRCxcbiAgICAgICAgICAgIGNvbmZpZy5MT0dJTl9TSEVFVF9MT09LVVBcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jaGVja2luX2NvdW50X3NoZWV0ID0gbmV3IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiKFxuICAgICAgICAgICAgc2hlZXRzX3NlcnZpY2UsXG4gICAgICAgICAgICBjb25maWcuU0hFRVRfSUQsXG4gICAgICAgICAgICBjb25maWcuQ0hFQ0tJTl9DT1VOVF9MT09LVVBcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVmcmVzaGVzIHRoZSBkYXRhIGZyb20gdGhlIEdvb2dsZSBTaGVldHMuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAgICovXG4gICAgYXN5bmMgcmVmcmVzaCgpIHtcbiAgICAgICAgdGhpcy5yb3dzID0gYXdhaXQgdGhpcy5sb2dpbl9zaGVldC5nZXRfdmFsdWVzKFxuICAgICAgICAgICAgdGhpcy5jb25maWcuTE9HSU5fU0hFRVRfTE9PS1VQXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY2hlY2tpbl9jb3VudCA9IChhd2FpdCB0aGlzLmNoZWNraW5fY291bnRfc2hlZXQuZ2V0X3ZhbHVlcyhcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLkNIRUNLSU5fQ09VTlRfTE9PS1VQXG4gICAgICAgICkpIVswXVswXTtcbiAgICAgICAgdGhpcy5wYXRyb2xsZXJzID0gdGhpcy5yb3dzIS5tYXAoKHgsIGkpID0+XG4gICAgICAgICAgICB0aGlzLnBhcnNlX3BhdHJvbGxlcl9yb3coaSwgeCwgdGhpcy5jb25maWcpXG4gICAgICAgICkuZmlsdGVyKCh4KSA9PiB4ICE9IG51bGwpIGFzIFBhdHJvbGxlclJvd1tdO1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiUmVmcmVzaGluZyBQYXRyb2xsZXJzOiBcIiApO1xuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMucGF0cm9sbGVycyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgYXJjaGl2ZWQgc3RhdHVzIG9mIHRoZSBsb2dpbiBzaGVldC5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc2hlZXQgaXMgYXJjaGl2ZWQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKi9cbiAgICBnZXQgYXJjaGl2ZWQoKSB7XG4gICAgICAgIGNvbnN0IGFyY2hpdmVkID0gbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQoXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5BUkNISVZFRF9DRUxMLFxuICAgICAgICAgICAgdGhpcy5yb3dzIVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgKGFyY2hpdmVkID09PSB1bmRlZmluZWQgJiYgdGhpcy5jaGVja2luX2NvdW50ID09PSAwKSB8fFxuICAgICAgICAgICAgYXJjaGl2ZWQudG9Mb3dlckNhc2UoKSA9PT0gXCJ5ZXNcIlxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGRhdGUgb2YgdGhlIHNoZWV0LlxuICAgICAqIEByZXR1cm5zIHtEYXRlfSBUaGUgZGF0ZSBvZiB0aGUgc2hlZXQuXG4gICAgICovXG4gICAgZ2V0IHNoZWV0X2RhdGUoKSB7XG4gICAgICAgIHJldHVybiBzYW5pdGl6ZV9kYXRlKFxuICAgICAgICAgICAgbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQodGhpcy5jb25maWcuU0hFRVRfREFURV9DRUxMLCB0aGlzLnJvd3MhKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGN1cnJlbnQgZGF0ZS5cbiAgICAgKiBAcmV0dXJucyB7RGF0ZX0gVGhlIGN1cnJlbnQgZGF0ZS5cbiAgICAgKi9cbiAgICBnZXQgY3VycmVudF9kYXRlKCkge1xuICAgICAgICByZXR1cm4gc2FuaXRpemVfZGF0ZShcbiAgICAgICAgICAgIGxvb2t1cF9yb3dfY29sX2luX3NoZWV0KHRoaXMuY29uZmlnLkNVUlJFTlRfREFURV9DRUxMLCB0aGlzLnJvd3MhKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGUgc2hlZXQgZGF0ZSBpcyB0aGUgY3VycmVudCBkYXRlLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzaGVldCBkYXRlIGlzIHRoZSBjdXJyZW50IGRhdGUsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKi9cbiAgICBnZXQgaXNfY3VycmVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hlZXRfZGF0ZS5nZXRUaW1lKCkgPT09IHRoaXMuY3VycmVudF9kYXRlLmdldFRpbWUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmllcyB0byBmaW5kIGEgcGF0cm9sbGVyIGJ5IG5hbWUuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcGF0cm9sbGVyLlxuICAgICAqIEByZXR1cm5zIHtQYXRyb2xsZXJSb3cgfCBcIm5vdF9mb3VuZFwifSBUaGUgcGF0cm9sbGVyIHJvdyBvciBcIm5vdF9mb3VuZFwiLlxuICAgICAqL1xuICAgIHRyeV9maW5kX3BhdHJvbGxlcihuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgcGF0cm9sbGVycyA9IHRoaXMucGF0cm9sbGVycy5maWx0ZXIoKHgpID0+IHgubmFtZSA9PT0gbmFtZSk7XG4gICAgICAgIGlmIChwYXRyb2xsZXJzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIFwibm90X2ZvdW5kXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhdHJvbGxlcnNbMF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcGF0cm9sbGVycyB3aG8gYXJlIG9uIGR1dHkuXG4gICAgICogQHJldHVybnMge1BhdHJvbGxlclJvd1tdfSBUaGUgbGlzdCBvZiBvbi1kdXR5IHBhdHJvbGxlcnMuXG4gICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBsb2dpbiBzaGVldCBpcyBub3QgY3VycmVudC5cbiAgICAgKi9cbiAgICBnZXRfb25fZHV0eV9wYXRyb2xsZXJzKCk6IFBhdHJvbGxlclJvd1tdIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzX2N1cnJlbnQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxvZ2luIHNoZWV0IGlzIG5vdCBjdXJyZW50XCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnBhdHJvbGxlcnMuZmlsdGVyKCh4KSA9PiB4LmNoZWNraW4pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpbiBhIHBhdHJvbGxlciB3aXRoIGEgbmV3IGNoZWNrLWluIHZhbHVlLlxuICAgICAqIEBwYXJhbSB7UGF0cm9sbGVyUm93fSBwYXRyb2xsZXJfc3RhdHVzIC0gVGhlIHN0YXR1cyBvZiB0aGUgcGF0cm9sbGVyLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuZXdfY2hlY2tpbl92YWx1ZSAtIFRoZSBuZXcgY2hlY2staW4gdmFsdWUuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBsb2dpbiBzaGVldCBpcyBub3QgY3VycmVudC5cbiAgICAgKi9cbiAgICBhc3luYyBjaGVja2luKHBhdHJvbGxlcl9zdGF0dXM6IFBhdHJvbGxlclJvdywgbmV3X2NoZWNraW5fdmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAoIXRoaXMuaXNfY3VycmVudCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTG9naW4gc2hlZXQgaXMgbm90IGN1cnJlbnRcIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coYEV4aXN0aW5nIHN0YXR1czogJHtKU09OLnN0cmluZ2lmeShwYXRyb2xsZXJfc3RhdHVzKX1gKTtcblxuICAgICAgICBjb25zdCByb3cgPSBwYXRyb2xsZXJfc3RhdHVzLmluZGV4ICsgMTsgLy8gcHJvZ3JhbW1pbmcgLT4gZXhjZWwgbG9va3VwXG4gICAgICAgIGNvbnN0IHJhbmdlID0gYCR7dGhpcy5jb25maWcuQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU59JHtyb3d9YDtcblxuICAgICAgICBhd2FpdCB0aGlzLmxvZ2luX3NoZWV0LnVwZGF0ZV92YWx1ZXMocmFuZ2UsIFtbbmV3X2NoZWNraW5fdmFsdWVdXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXNzaWducyBhIHNlY3Rpb24gdG8gYSBwYXRyb2xsZXIuXG4gICAgICogQHBhcmFtIHBhdHJvbGxlcl9zZWN0aW9uIFRoZSByb3cgZm9yIHRoZSBwYXRyb2xsZXIgdGhhdCBuZWVkcyB0byBoYXZlIGEgc2VjdGlvbiBhc3NpZ25lZCB0by5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmV3X3NlY3Rpb25fdmFsdWUgLSBUaGUgbmV3IHNlY3Rpb24gdmFsdWUuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBsb2dpbiBzaGVldCBpcyBub3QgY3VycmVudC5cbiAgICAgKi9cbiAgICBhc3luYyBhc3NpZ25fc2VjdGlvbihwYXRyb2xsZXJfc2VjdGlvbjogUGF0cm9sbGVyUm93LCBuZXdfc2VjdGlvbl92YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICghdGhpcy5pc19jdXJyZW50KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJMb2dpbiBzaGVldCBpcyBub3QgY3VycmVudFwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhgRXhpc3Rpbmcgc3RhdHVzOiAke0pTT04uc3RyaW5naWZ5KHBhdHJvbGxlcl9zZWN0aW9uKX1gKTtcblxuICAgICAgICBjb25zdCByb3cgPSBwYXRyb2xsZXJfc2VjdGlvbi5pbmRleCArIDE7IC8vIHByb2dyYW1taW5nIC0+IGV4Y2VsIGxvb2t1cFxuICAgICAgICBjb25zdCByYW5nZSA9IGAke3RoaXMuY29uZmlnLlNFQ1RJT05fRFJPUERPV05fQ09MVU1OfSR7cm93fWA7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5sb2dpbl9zaGVldC51cGRhdGVfdmFsdWVzKHJhbmdlLCBbW25ld19zZWN0aW9uX3ZhbHVlXV0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlcyBhIHJvdyBvZiBwYXRyb2xsZXIgZGF0YS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggLSBUaGUgaW5kZXggb2YgdGhlIHJvdy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSByb3cgLSBUaGUgcm93IGRhdGEuXG4gICAgICogQHBhcmFtIHtQYXRyb2xsZXJSb3dDb25maWd9IG9wdHMgLSBUaGUgY29uZmlndXJhdGlvbiBvcHRpb25zIGZvciB0aGUgcGF0cm9sbGVyIHJvdy5cbiAgICAgKiBAcmV0dXJucyB7UGF0cm9sbGVyUm93IHwgbnVsbH0gVGhlIHBhcnNlZCBwYXRyb2xsZXIgcm93IG9yIG51bGwgaWYgaW52YWxpZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHBhcnNlX3BhdHJvbGxlcl9yb3coXG4gICAgICAgIGluZGV4OiBudW1iZXIsXG4gICAgICAgIHJvdzogc3RyaW5nW10sXG4gICAgICAgIG9wdHM6IFBhdHJvbGxlclJvd0NvbmZpZ1xuICAgICk6IFBhdHJvbGxlclJvdyB8IG51bGwge1xuICAgICAgICBpZiAocm93Lmxlbmd0aCA8IDQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbmRleCA8IDMpe1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIG5hbWU6IHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5OQU1FX0NPTFVNTildLFxuICAgICAgICAgICAgY2F0ZWdvcnk6IHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5DQVRFR09SWV9DT0xVTU4pXSxcbiAgICAgICAgICAgIHNlY3Rpb246IHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5TRUNUSU9OX0RST1BET1dOX0NPTFVNTildLFxuICAgICAgICAgICAgY2hlY2tpbjogcm93W2V4Y2VsX3Jvd190b19pbmRleChvcHRzLkNIRUNLSU5fRFJPUERPV05fQ09MVU1OKV0sXG4gICAgICAgIH07XG4gICAgfVxufSIsImltcG9ydCB7c2hlZXRzX3Y0fSBmcm9tIFwiZ29vZ2xlYXBpc1wiO1xuaW1wb3J0IHtTZWFzb25TaGVldENvbmZpZyx9IGZyb20gXCIuLi9lbnYvaGFuZGxlcl9jb25maWdcIjtcbmltcG9ydCB7ZXhjZWxfcm93X3RvX2luZGV4fSBmcm9tIFwiLi4vdXRpbHMvdXRpbFwiO1xuaW1wb3J0IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiIGZyb20gXCIuLi91dGlscy9nb29nbGVfc2hlZXRzX3NwcmVhZHNoZWV0X3RhYlwiO1xuaW1wb3J0IHtmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9jdXJyZW50X2RheX0gZnJvbSBcIi4uL3V0aWxzL2RhdGV0aW1lX3V0aWxcIjtcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBzZWFzb24gc2hlZXQgaW4gR29vZ2xlIFNoZWV0cy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2Vhc29uU2hlZXQge1xuICAgIHNoZWV0OiBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYjtcbiAgICBjb25maWc6IFNlYXNvblNoZWV0Q29uZmlnO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBTZWFzb25TaGVldC5cbiAgICAgKiBAcGFyYW0ge3NoZWV0c192NC5TaGVldHMgfCBudWxsfSBzaGVldHNfc2VydmljZSAtIFRoZSBHb29nbGUgU2hlZXRzIEFQSSBzZXJ2aWNlLlxuICAgICAqIEBwYXJhbSB7U2Vhc29uU2hlZXRDb25maWd9IGNvbmZpZyAtIFRoZSBjb25maWd1cmF0aW9uIGZvciB0aGUgc2Vhc29uIHNoZWV0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyB8IG51bGwsXG4gICAgICAgIGNvbmZpZzogU2Vhc29uU2hlZXRDb25maWdcbiAgICApIHtcbiAgICAgICAgdGhpcy5zaGVldCA9IG5ldyBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYihcbiAgICAgICAgICAgIHNoZWV0c19zZXJ2aWNlLFxuICAgICAgICAgICAgY29uZmlnLlNIRUVUX0lELFxuICAgICAgICAgICAgY29uZmlnLlNFQVNPTl9TSEVFVFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBudW1iZXIgb2YgZGF5cyBwYXRyb2xsZWQgYnkgYSBwYXRyb2xsZXIuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdHJvbGxlcl9uYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHBhdHJvbGxlci5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxudW1iZXI+fSBUaGUgbnVtYmVyIG9mIGRheXMgcGF0cm9sbGVkLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF9wYXRyb2xsZWRfZGF5cyhcbiAgICAgICAgcGF0cm9sbGVyX25hbWU6IHN0cmluZ1xuICAgICk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgICAgIGNvbnN0IHBhdHJvbGxlcl9yb3cgPSBhd2FpdCB0aGlzLnNoZWV0LmdldF9zaGVldF9yb3dfZm9yX3BhdHJvbGxlcihcbiAgICAgICAgICAgIHBhdHJvbGxlcl9uYW1lLFxuICAgICAgICAgICAgdGhpcy5jb25maWcuU0VBU09OX1NIRUVUX05BTUVfQ09MVU1OXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKCFwYXRyb2xsZXJfcm93KSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjdXJyZW50TnVtYmVyID1cbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cucm93W2V4Y2VsX3Jvd190b19pbmRleCh0aGlzLmNvbmZpZy5TRUFTT05fU0hFRVRfREFZU19DT0xVTU4pXTtcblxuICAgICAgICBjb25zdCBjdXJyZW50RGF5ID0gZmlsdGVyX2xpc3RfdG9fZW5kc3dpdGhfY3VycmVudF9kYXkocGF0cm9sbGVyX3Jvdy5yb3cpXG4gICAgICAgICAgICAubWFwKCh4KSA9PiAoeD8uc3RhcnRzV2l0aChcIkhcIikgPyAwLjUgOiAxKSlcbiAgICAgICAgICAgIC5yZWR1Y2UoKHgsIHksIGkpID0+IHggKyB5LCAwKTtcblxuICAgICAgICByZXR1cm4gY3VycmVudE51bWJlciAtIGN1cnJlbnREYXk7XG4gICAgfVxufSIsImltcG9ydCB7Z29vZ2xlfSBmcm9tIFwiZ29vZ2xlYXBpc1wiO1xuaW1wb3J0IHtHZW5lcmF0ZUF1dGhVcmxPcHRzfSBmcm9tIFwiZ29vZ2xlLWF1dGgtbGlicmFyeVwiO1xuaW1wb3J0IHtPQXV0aDJDbGllbnR9IGZyb20gXCJnb29nbGVhcGlzLWNvbW1vblwiO1xuaW1wb3J0IHtzYW5pdGl6ZV9waG9uZV9udW1iZXJ9IGZyb20gXCIuL3V0aWxzL3V0aWxcIjtcbmltcG9ydCB7bG9hZF9jcmVkZW50aWFsc19maWxlc30gZnJvbSBcIi4vdXRpbHMvZmlsZV91dGlsc1wiO1xuaW1wb3J0IHtTZXJ2aWNlQ29udGV4dH0gZnJvbSBcIkB0d2lsaW8tbGFicy9zZXJ2ZXJsZXNzLXJ1bnRpbWUtdHlwZXMvdHlwZXNcIjtcbmltcG9ydCB7VXNlckNyZWRzQ29uZmlnfSBmcm9tIFwiLi9lbnYvaGFuZGxlcl9jb25maWdcIjtcbmltcG9ydCB7dmFsaWRhdGVfc2NvcGVzfSBmcm9tIFwiLi91dGlscy9zY29wZV91dGlsXCI7XG5cbmNvbnN0IFNDT1BFUyA9IFtcbiAgICBcImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvc2NyaXB0LnByb2plY3RzXCIsXG4gICAgXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3NwcmVhZHNoZWV0c1wiLFxuXTtcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgdXNlciBjcmVkZW50aWFscyBmb3IgR29vZ2xlIE9BdXRoMi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckNyZWRzIHtcbiAgICBudW1iZXI6IHN0cmluZztcbiAgICBvYXV0aDJfY2xpZW50OiBPQXV0aDJDbGllbnQ7XG4gICAgc3luY19jbGllbnQ6IFNlcnZpY2VDb250ZXh0O1xuICAgIGRvbWFpbj86IHN0cmluZztcbiAgICBsb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIFVzZXJDcmVkcyBpbnN0YW5jZS5cbiAgICAgKiBAcGFyYW0ge1NlcnZpY2VDb250ZXh0fSBzeW5jX2NsaWVudCAtIFRoZSBUd2lsaW8gU3luYyBjbGllbnQuXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCB1bmRlZmluZWR9IG51bWJlciAtIFRoZSB1c2VyJ3MgcGhvbmUgbnVtYmVyLlxuICAgICAqIEBwYXJhbSB7VXNlckNyZWRzQ29uZmlnfSBvcHRzIC0gVGhlIHVzZXIgY3JlZGVudGlhbHMgY29uZmlndXJhdGlvbi5cbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gVGhyb3dzIGFuIGVycm9yIGlmIHRoZSBudW1iZXIgaXMgdW5kZWZpbmVkIG9yIG51bGwuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHN5bmNfY2xpZW50OiBTZXJ2aWNlQ29udGV4dCxcbiAgICAgICAgbnVtYmVyOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgICAgIG9wdHM6IFVzZXJDcmVkc0NvbmZpZ1xuICAgICkge1xuICAgICAgICBpZiAobnVtYmVyID09PSB1bmRlZmluZWQgfHwgbnVtYmVyID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOdW1iZXIgaXMgdW5kZWZpbmVkXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubnVtYmVyID0gc2FuaXRpemVfcGhvbmVfbnVtYmVyKG51bWJlcik7XG5cbiAgICAgICAgY29uc3QgY3JlZGVudGlhbHMgPSBsb2FkX2NyZWRlbnRpYWxzX2ZpbGVzKCk7XG4gICAgICAgIGNvbnN0IHsgY2xpZW50X3NlY3JldCwgY2xpZW50X2lkLCByZWRpcmVjdF91cmlzIH0gPSBjcmVkZW50aWFscy53ZWI7XG4gICAgICAgIHRoaXMub2F1dGgyX2NsaWVudCA9IG5ldyBnb29nbGUuYXV0aC5PQXV0aDIoXG4gICAgICAgICAgICBjbGllbnRfaWQsXG4gICAgICAgICAgICBjbGllbnRfc2VjcmV0LFxuICAgICAgICAgICAgcmVkaXJlY3RfdXJpc1swXVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN5bmNfY2xpZW50ID0gc3luY19jbGllbnQ7XG4gICAgICAgIGxldCBkb21haW4gPSBvcHRzLk5TUF9FTUFJTF9ET01BSU47XG4gICAgICAgIGlmIChkb21haW4gPT09IHVuZGVmaW5lZCB8fCBkb21haW4gPT09IG51bGwgfHwgZG9tYWluID09PSBcIlwiKSB7XG4gICAgICAgICAgICBkb21haW4gPSB1bmRlZmluZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRvbWFpbiA9IGRvbWFpbjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvYWQgdGhlIE9BdXRoMiB0b2tlbi5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBib29sZWFuIGluZGljYXRpbmcgaWYgdGhlIHRva2VuIHdhcyBsb2FkZWQuXG4gICAgICovXG4gICAgYXN5bmMgbG9hZFRva2VuKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICBpZiAoIXRoaXMubG9hZGVkKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBMb29raW5nIGZvciAke3RoaXMudG9rZW5fa2V5fWApO1xuICAgICAgICAgICAgICAgIGNvbnN0IG9hdXRoMkRvYyA9IGF3YWl0IHRoaXMuc3luY19jbGllbnRcbiAgICAgICAgICAgICAgICAgICAgLmRvY3VtZW50cyh0aGlzLnRva2VuX2tleSlcbiAgICAgICAgICAgICAgICAgICAgLmZldGNoKCk7XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICBvYXV0aDJEb2MgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgICAgICBvYXV0aDJEb2MuZGF0YSA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICAgICAgb2F1dGgyRG9jLmRhdGEudG9rZW4gPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgRGlkbid0IGZpbmQgJHt0aGlzLnRva2VuX2tleX1gKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0b2tlbiA9IG9hdXRoMkRvYy5kYXRhLnRva2VuO1xuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZV9zY29wZXMob2F1dGgyRG9jLmRhdGEuc2NvcGVzLCBTQ09QRVMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9hdXRoMl9jbGllbnQuc2V0Q3JlZGVudGlhbHModG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgTG9hZGVkIHRva2VuICR7dGhpcy50b2tlbl9rZXl9YCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgICAgIGBGYWlsZWQgdG8gbG9hZCB0b2tlbiBmb3IgJHt0aGlzLnRva2VuX2tleX0uXFxuICR7ZX1gXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5sb2FkZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB0b2tlbiBrZXkuXG4gICAgICogQHJldHVybnMge3N0cmluZ30gVGhlIHRva2VuIGtleS5cbiAgICAgKi9cbiAgICBnZXQgdG9rZW5fa2V5KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgb2F1dGgyXyR7dGhpcy5udW1iZXJ9YDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWxldGUgdGhlIE9BdXRoMiB0b2tlbi5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBib29sZWFuIGluZGljYXRpbmcgaWYgdGhlIHRva2VuIHdhcyBkZWxldGVkLlxuICAgICAqL1xuICAgIGFzeW5jIGRlbGV0ZVRva2VuKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICBjb25zdCBvYXV0aDJEb2MgPSBhd2FpdCB0aGlzLnN5bmNfY2xpZW50XG4gICAgICAgICAgICAuZG9jdW1lbnRzKHRoaXMudG9rZW5fa2V5KVxuICAgICAgICAgICAgLmZldGNoKCk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIG9hdXRoMkRvYyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICBvYXV0aDJEb2MuZGF0YSA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIG9hdXRoMkRvYy5kYXRhLnRva2VuID09PSB1bmRlZmluZWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgRGlkbid0IGZpbmQgJHt0aGlzLnRva2VuX2tleX1gKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLnN5bmNfY2xpZW50LmRvY3VtZW50cyhvYXV0aDJEb2Muc2lkKS5yZW1vdmUoKTtcbiAgICAgICAgY29uc29sZS5sb2coYERlbGV0ZWQgdG9rZW4gJHt0aGlzLnRva2VuX2tleX1gKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29tcGxldGUgdGhlIGxvZ2luIHByb2Nlc3MgYnkgZXhjaGFuZ2luZyB0aGUgYXV0aG9yaXphdGlvbiBjb2RlIGZvciBhIHRva2VuLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb2RlIC0gVGhlIGF1dGhvcml6YXRpb24gY29kZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBzY29wZXMgLSBUaGUgc2NvcGVzIHRvIHZhbGlkYXRlLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBsb2dpbiBwcm9jZXNzIGlzIGNvbXBsZXRlLlxuICAgICAqL1xuICAgIGFzeW5jIGNvbXBsZXRlTG9naW4oY29kZTogc3RyaW5nLCBzY29wZXM6IHN0cmluZ1tdKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHZhbGlkYXRlX3Njb3BlcyhzY29wZXMsIFNDT1BFUyk7XG4gICAgICAgIGNvbnN0IHRva2VuID0gYXdhaXQgdGhpcy5vYXV0aDJfY2xpZW50LmdldFRva2VuKGNvZGUpO1xuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShPYmplY3Qua2V5cyh0b2tlbi5yZXMhKSkpO1xuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0b2tlbi50b2tlbnMpKTtcbiAgICAgICAgdGhpcy5vYXV0aDJfY2xpZW50LnNldENyZWRlbnRpYWxzKHRva2VuLnRva2Vucyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBvYXV0aERvYyA9IGF3YWl0IHRoaXMuc3luY19jbGllbnQuZG9jdW1lbnRzLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgZGF0YTogeyB0b2tlbjogdG9rZW4udG9rZW5zLCBzY29wZXM6IHNjb3BlcyB9LFxuICAgICAgICAgICAgICAgIHVuaXF1ZU5hbWU6IHRoaXMudG9rZW5fa2V5LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgIGBFeGNlcHRpb24gd2hlbiBjcmVhdGluZyBvYXV0aC4gVHJ5aW5nIHRvIHVwZGF0ZSBpbnN0ZWFkLi4uXFxuJHtlfWBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCBvYXV0aERvYyA9IGF3YWl0IHRoaXMuc3luY19jbGllbnRcbiAgICAgICAgICAgICAgICAuZG9jdW1lbnRzKHRoaXMudG9rZW5fa2V5KVxuICAgICAgICAgICAgICAgIC51cGRhdGUoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7IHRva2VuOiB0b2tlbiwgc2NvcGVzOiBzY29wZXMgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgYXV0aG9yaXphdGlvbiBVUkwuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c3RyaW5nPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIGF1dGhvcml6YXRpb24gVVJMLlxuICAgICAqL1xuICAgIGFzeW5jIGdldEF1dGhVcmwoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgY29uc3QgaWQgPSB0aGlzLmdlbmVyYXRlUmFuZG9tU3RyaW5nKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBVc2luZyBub25jZSAke2lkfSBmb3IgJHt0aGlzLm51bWJlcn1gKTtcbiAgICAgICAgY29uc3QgZG9jID0gYXdhaXQgdGhpcy5zeW5jX2NsaWVudC5kb2N1bWVudHMuY3JlYXRlKHtcbiAgICAgICAgICAgIGRhdGE6IHsgbnVtYmVyOiB0aGlzLm51bWJlciwgc2NvcGVzOiBTQ09QRVMgfSxcbiAgICAgICAgICAgIHVuaXF1ZU5hbWU6IGlkLFxuICAgICAgICAgICAgdHRsOiA2MCAqIDUsIC8vIDUgbWludXRlc1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2coYE1hZGUgbm9uY2UtZG9jOiAke0pTT04uc3RyaW5naWZ5KGRvYyl9YCk7XG5cbiAgICAgICAgY29uc3Qgb3B0czogR2VuZXJhdGVBdXRoVXJsT3B0cyA9IHtcbiAgICAgICAgICAgIGFjY2Vzc190eXBlOiBcIm9mZmxpbmVcIixcbiAgICAgICAgICAgIHNjb3BlOiBTQ09QRVMsXG4gICAgICAgICAgICBzdGF0ZTogaWQsXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLmRvbWFpbikge1xuICAgICAgICAgICAgb3B0c1tcImhkXCJdID0gdGhpcy5kb21haW47XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5vYXV0aDJfY2xpZW50LmdlbmVyYXRlQXV0aFVybChvcHRzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZSBhIHJhbmRvbSBzdHJpbmcuXG4gICAgICogQHJldHVybnMge3N0cmluZ30gQSByYW5kb20gc3RyaW5nLlxuICAgICAqL1xuICAgIGdlbmVyYXRlUmFuZG9tU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IDMwO1xuICAgICAgICBsZXQgcmVzdWx0ID0gXCJcIjtcbiAgICAgICAgY29uc3QgY2hhcmFjdGVycyA9XG4gICAgICAgICAgICBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5XCI7XG4gICAgICAgIGNvbnN0IGNoYXJhY3RlcnNMZW5ndGggPSBjaGFyYWN0ZXJzLmxlbmd0aDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0ICs9IGNoYXJhY3RlcnMuY2hhckF0KFxuICAgICAgICAgICAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJhY3RlcnNMZW5ndGgpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuXG4vKipcbiAqIEludGVyZmFjZSByZXByZXNlbnRpbmcgdGhlIHVzZXIgY3JlZGVudGlhbHMgY29uZmlndXJhdGlvbi5cbiAqL1xuZXhwb3J0IHsgVXNlckNyZWRzIH07XG4iLCIvKipcbiAqIFJlcHJlc2VudHMgYSBjaGVjay1pbiB2YWx1ZSB3aXRoIHZhcmlvdXMgcHJvcGVydGllcyBhbmQgbG9va3VwIHZhbHVlcy5cbiAqL1xuY2xhc3MgQ2hlY2tpblZhbHVlIHtcbiAgICBrZXk6IHN0cmluZztcbiAgICBzaGVldHNfdmFsdWU6IHN0cmluZztcbiAgICBzbXNfZGVzYzogc3RyaW5nO1xuICAgIGZhc3RfY2hlY2tpbnM6IHN0cmluZ1tdO1xuICAgIGxvb2t1cF92YWx1ZXM6IFNldDxzdHJpbmc+O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBDaGVja2luVmFsdWUuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIFRoZSBrZXkgZm9yIHRoZSBjaGVjay1pbiB2YWx1ZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2hlZXRzX3ZhbHVlIC0gVGhlIHZhbHVlIHVzZWQgaW4gc2hlZXRzLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzbXNfZGVzYyAtIFRoZSBkZXNjcmlwdGlvbiB1c2VkIGluIFNNUy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IHN0cmluZ1tdfSBmYXN0X2NoZWNraW5zIC0gVGhlIGZhc3QgY2hlY2staW4gdmFsdWVzLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBrZXk6IHN0cmluZyxcbiAgICAgICAgc2hlZXRzX3ZhbHVlOiBzdHJpbmcsXG4gICAgICAgIHNtc19kZXNjOiBzdHJpbmcsXG4gICAgICAgIGZhc3RfY2hlY2tpbnM6IHN0cmluZyB8IHN0cmluZ1tdXG4gICAgKSB7XG4gICAgICAgIGlmICghKGZhc3RfY2hlY2tpbnMgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgICAgICAgIGZhc3RfY2hlY2tpbnMgPSBbZmFzdF9jaGVja2luc107XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgICAgIHRoaXMuc2hlZXRzX3ZhbHVlID0gc2hlZXRzX3ZhbHVlO1xuICAgICAgICB0aGlzLnNtc19kZXNjID0gc21zX2Rlc2M7XG4gICAgICAgIHRoaXMuZmFzdF9jaGVja2lucyA9IGZhc3RfY2hlY2tpbnMubWFwKCh4KSA9PiB4LnRyaW0oKS50b0xvd2VyQ2FzZSgpKTtcblxuICAgICAgICBjb25zdCBzbXNfZGVzY19zcGxpdDogc3RyaW5nW10gPSBzbXNfZGVzY1xuICAgICAgICAgICAgLnJlcGxhY2UoL1xccysvLCBcIi1cIilcbiAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICAuc3BsaXQoXCIvXCIpO1xuICAgICAgICBjb25zdCBsb29rdXBfdmFscyA9IFsuLi50aGlzLmZhc3RfY2hlY2tpbnMsIC4uLnNtc19kZXNjX3NwbGl0XTtcbiAgICAgICAgdGhpcy5sb29rdXBfdmFsdWVzID0gbmV3IFNldDxzdHJpbmc+KGxvb2t1cF92YWxzKTtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGNvbGxlY3Rpb24gb2YgY2hlY2staW4gdmFsdWVzIHdpdGggdmFyaW91cyBsb29rdXAgbWV0aG9kcy5cbiAqL1xuY2xhc3MgQ2hlY2tpblZhbHVlcyB7XG4gICAgYnlfa2V5OiB7IFtrZXk6IHN0cmluZ106IENoZWNraW5WYWx1ZSB9ID0ge307XG4gICAgYnlfbHY6IHsgW2tleTogc3RyaW5nXTogQ2hlY2tpblZhbHVlIH0gPSB7fTtcbiAgICBieV9mYzogeyBba2V5OiBzdHJpbmddOiBDaGVja2luVmFsdWUgfSA9IHt9O1xuICAgIGJ5X3NoZWV0X3N0cmluZzogeyBba2V5OiBzdHJpbmddOiBDaGVja2luVmFsdWUgfSA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBDaGVja2luVmFsdWVzLlxuICAgICAqIEBwYXJhbSB7Q2hlY2tpblZhbHVlW119IGNoZWNraW5WYWx1ZXMgLSBUaGUgYXJyYXkgb2YgY2hlY2staW4gdmFsdWVzLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNoZWNraW5WYWx1ZXM6IENoZWNraW5WYWx1ZVtdKSB7XG4gICAgICAgIGZvciAoY29uc3QgY2hlY2tpblZhbHVlIG9mIGNoZWNraW5WYWx1ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuYnlfa2V5W2NoZWNraW5WYWx1ZS5rZXldID0gY2hlY2tpblZhbHVlO1xuICAgICAgICAgICAgdGhpcy5ieV9zaGVldF9zdHJpbmdbY2hlY2tpblZhbHVlLnNoZWV0c192YWx1ZV0gPSBjaGVja2luVmFsdWU7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGx2IG9mIGNoZWNraW5WYWx1ZS5sb29rdXBfdmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ieV9sdltsdl0gPSBjaGVja2luVmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZjIG9mIGNoZWNraW5WYWx1ZS5mYXN0X2NoZWNraW5zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ieV9mY1tmY10gPSBjaGVja2luVmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZXMgYSBmYXN0IGNoZWNrLWluIHZhbHVlIGZyb20gdGhlIGdpdmVuIGJvZHkgc3RyaW5nLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5IC0gVGhlIGJvZHkgc3RyaW5nIHRvIHBhcnNlLlxuICAgICAqIEByZXR1cm5zIHtDaGVja2luVmFsdWUgfCB1bmRlZmluZWR9IFRoZSBwYXJzZWQgY2hlY2staW4gdmFsdWUgb3IgdW5kZWZpbmVkLlxuICAgICAqL1xuICAgIHBhcnNlX2Zhc3RfY2hlY2tpbihib2R5OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnlfZmNbYm9keV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIGEgY2hlY2staW4gdmFsdWUgZnJvbSB0aGUgZ2l2ZW4gYm9keSBzdHJpbmcuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHkgLSBUaGUgYm9keSBzdHJpbmcgdG8gcGFyc2UuXG4gICAgICogQHJldHVybnMge0NoZWNraW5WYWx1ZSB8IHVuZGVmaW5lZH0gVGhlIHBhcnNlZCBjaGVjay1pbiB2YWx1ZSBvciB1bmRlZmluZWQuXG4gICAgICovXG4gICAgcGFyc2VfY2hlY2tpbihib2R5OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgY2hlY2tpbl9sb3dlciA9IGJvZHkucmVwbGFjZSgvXFxzKy8sIFwiXCIpO1xuICAgICAgICByZXR1cm4gdGhpcy5ieV9sdltjaGVja2luX2xvd2VyXTtcbiAgICB9XG59XG5cbmV4cG9ydCB7IENoZWNraW5WYWx1ZSwgQ2hlY2tpblZhbHVlcyB9IiwiLyoqXG4gKiBDb252ZXJ0IGFuIEV4Y2VsIGRhdGUgdG8gYSBKYXZhU2NyaXB0IERhdGUgb2JqZWN0LlxuICogQHBhcmFtIHtudW1iZXJ9IGRhdGUgLSBUaGUgRXhjZWwgZGF0ZS5cbiAqIEByZXR1cm5zIHtEYXRlfSBUaGUgSmF2YVNjcmlwdCBEYXRlIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gZXhjZWxfZGF0ZV90b19qc19kYXRlKGRhdGU6IG51bWJlcik6IERhdGUge1xuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBEYXRlKDApO1xuICAgIHJlc3VsdC5zZXRVVENNaWxsaXNlY29uZHMoTWF0aC5yb3VuZCgoZGF0ZSAtIDI1NTY5KSAqIDg2NDAwICogMTAwMCkpO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ2hhbmdlIHRoZSB0aW1lem9uZSBvZiBhIERhdGUgb2JqZWN0IHRvIFBTVC5cbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSAtIFRoZSBEYXRlIG9iamVjdC5cbiAqIEByZXR1cm5zIHtEYXRlfSBUaGUgRGF0ZSBvYmplY3Qgd2l0aCB0aGUgdGltZXpvbmUgc2V0IHRvIFBTVC5cbiAqL1xuZnVuY3Rpb24gY2hhbmdlX3RpbWV6b25lX3RvX3BzdChkYXRlOiBEYXRlKTogRGF0ZSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKGRhdGUudG9VVENTdHJpbmcoKS5yZXBsYWNlKFwiIEdNVFwiLCBcIiBQU1RcIikpO1xufVxuXG4vKipcbiAqIFN0cmlwIHRoZSB0aW1lIGZyb20gYSBEYXRlIG9iamVjdCwga2VlcGluZyBvbmx5IHRoZSBkYXRlLlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIC0gVGhlIERhdGUgb2JqZWN0LlxuICogQHJldHVybnMge0RhdGV9IFRoZSBEYXRlIG9iamVjdCB3aXRoIHRoZSB0aW1lIHN0cmlwcGVkLlxuICovXG5mdW5jdGlvbiBzdHJpcF9kYXRldGltZV90b19kYXRlKGRhdGU6IERhdGUpOiBEYXRlIHtcbiAgICByZXR1cm4gbmV3IERhdGUoXG4gICAgICAgIGRhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKFwiZW4tVVNcIiwge3RpbWVab25lOiBcIkFtZXJpY2EvTG9zX0FuZ2VsZXNcIn0pXG4gICAgKTtcbn1cblxuLyoqXG4gKiBTYW5pdGl6ZSBhIGRhdGUgYnkgY29udmVydGluZyBpdCBmcm9tIGFuIEV4Y2VsIGRhdGUgYW5kIHN0cmlwcGluZyB0aGUgdGltZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBkYXRlIC0gVGhlIEV4Y2VsIGRhdGUuXG4gKiBAcmV0dXJucyB7RGF0ZX0gVGhlIHNhbml0aXplZCBEYXRlIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gc2FuaXRpemVfZGF0ZShkYXRlOiBudW1iZXIpOiBEYXRlIHtcbiAgICByZXR1cm4gc3RyaXBfZGF0ZXRpbWVfdG9fZGF0ZShcbiAgICAgICAgY2hhbmdlX3RpbWV6b25lX3RvX3BzdChleGNlbF9kYXRlX3RvX2pzX2RhdGUoZGF0ZSkpXG4gICAgKTtcbn1cblxuLyoqXG4gKiBGb3JtYXQgYSBEYXRlIG9iamVjdCBmb3IgdXNlIGluIGEgc3ByZWFkc2hlZXQgdmFsdWUuXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgLSBUaGUgRGF0ZSBvYmplY3QuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIGRhdGUgc3RyaW5nIGluIFBTVFxuICovXG5mdW5jdGlvbiBmb3JtYXRfZGF0ZV9mb3Jfc3ByZWFkc2hlZXRfdmFsdWUoZGF0ZTogRGF0ZSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGRhdGVcbiAgICAgICAgLnRvTG9jYWxlRGF0ZVN0cmluZyhcImVuLVVTXCIsIHt0aW1lWm9uZTogXCJBbWVyaWNhL0xvc19BbmdlbGVzXCJ9KVxuICAgICAgICAuc3BsaXQoXCIvXCIpXG4gICAgICAgIC5tYXAoKHgpID0+IHgucGFkU3RhcnQoMiwgXCIwXCIpKVxuICAgICAgICAuam9pbihcIlwiKTtcbn1cblxuLyoqXG4gKiBGaWx0ZXIgYSBsaXN0IHRvIGluY2x1ZGUgb25seSBpdGVtcyB0aGF0IGVuZCB3aXRoIGEgc3BlY2lmaWMgZGF0ZS5cbiAqIEBwYXJhbSB7YW55W119IGxpc3QgLSBUaGUgbGlzdCB0byBmaWx0ZXIuXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgLSBUaGUgZGF0ZSB0byBmaWx0ZXIgYnkuXG4gKiBAcmV0dXJucyB7YW55W119IFRoZSBmaWx0ZXJlZCBsaXN0LlxuICovXG5mdW5jdGlvbiBmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9kYXRlKGxpc3Q6IGFueVtdLCBkYXRlOiBEYXRlKTogYW55W10ge1xuICAgIGNvbnN0IGRhdGVzdHIgPSBmb3JtYXRfZGF0ZV9mb3Jfc3ByZWFkc2hlZXRfdmFsdWUoZGF0ZSk7XG4gICAgcmV0dXJuIGxpc3QubWFwKCh4KSA9PiB4Py50b1N0cmluZygpKS5maWx0ZXIoKHgpID0+IHg/LmVuZHNXaXRoKGRhdGVzdHIpKTtcbn1cblxuLyoqXG4gKiBGaWx0ZXIgYSBsaXN0IHRvIGluY2x1ZGUgb25seSBpdGVtcyB0aGF0IGVuZCB3aXRoIHRoZSBjdXJyZW50IGRhdGUuXG4gKiBAcGFyYW0ge2FueVtdfSBsaXN0IC0gVGhlIGxpc3QgdG8gZmlsdGVyLlxuICogQHJldHVybnMge2FueVtdfSBUaGUgZmlsdGVyZWQgbGlzdC5cbiAqL1xuZnVuY3Rpb24gZmlsdGVyX2xpc3RfdG9fZW5kc3dpdGhfY3VycmVudF9kYXkobGlzdDogYW55W10pOiBhbnlbXSB7XG4gICAgcmV0dXJuIGZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2RhdGUobGlzdCwgbmV3IERhdGUoKSk7XG59XG5cbmV4cG9ydCB7XG4gICAgc2FuaXRpemVfZGF0ZSxcbiAgICBleGNlbF9kYXRlX3RvX2pzX2RhdGUsXG4gICAgY2hhbmdlX3RpbWV6b25lX3RvX3BzdCxcbiAgICBzdHJpcF9kYXRldGltZV90b19kYXRlLFxuICAgIGZvcm1hdF9kYXRlX2Zvcl9zcHJlYWRzaGVldF92YWx1ZSxcbiAgICBmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9kYXRlLFxuICAgIGZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2N1cnJlbnRfZGF5LFxufTsiLCJpbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCAnQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlcyc7XG5cbi8qKlxuICogTG9hZCBjcmVkZW50aWFscyBmcm9tIGEgSlNPTiBmaWxlLlxuICogQHJldHVybnMge2FueX0gVGhlIHBhcnNlZCBjcmVkZW50aWFscyBmcm9tIHRoZSBKU09OIGZpbGUuXG4gKi9cbmZ1bmN0aW9uIGxvYWRfY3JlZGVudGlhbHNfZmlsZXMoKTogYW55IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShcbiAgICAgICAgZnNcbiAgICAgICAgICAgIC5yZWFkRmlsZVN5bmMoUnVudGltZS5nZXRBc3NldHMoKVtcIi9jcmVkZW50aWFscy5qc29uXCJdLnBhdGgpXG4gICAgICAgICAgICAudG9TdHJpbmcoKVxuICAgICk7XG59XG5cbi8qKlxuICogR2V0IHRoZSBwYXRoIHRvIHRoZSBzZXJ2aWNlIGNyZWRlbnRpYWxzIGZpbGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgcGF0aCB0byB0aGUgc2VydmljZSBjcmVkZW50aWFscyBmaWxlLlxuICovXG5mdW5jdGlvbiBnZXRfc2VydmljZV9jcmVkZW50aWFsc19wYXRoKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFJ1bnRpbWUuZ2V0QXNzZXRzKClbXCIvc2VydmljZS1jcmVkZW50aWFscy5qc29uXCJdLnBhdGg7XG59XG5cbmV4cG9ydCB7IGxvYWRfY3JlZGVudGlhbHNfZmlsZXMsIGdldF9zZXJ2aWNlX2NyZWRlbnRpYWxzX3BhdGggfTsiLCJpbXBvcnQge3NoZWV0c192NH0gZnJvbSBcImdvb2dsZWFwaXNcIjtcbmltcG9ydCB7ZXhjZWxfcm93X3RvX2luZGV4fSBmcm9tIFwiLi91dGlsXCI7XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGEgR29vZ2xlIFNoZWV0cyBzcHJlYWRzaGVldCB0YWIuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiIHtcbiAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyB8IG51bGw7XG4gICAgc2hlZXRfaWQ6IHN0cmluZztcbiAgICBzaGVldF9uYW1lOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYi5cbiAgICAgKiBAcGFyYW0ge3NoZWV0c192NC5TaGVldHMgfCBudWxsfSBzaGVldHNfc2VydmljZSAtIFRoZSBHb29nbGUgU2hlZXRzIEFQSSBzZXJ2aWNlIGluc3RhbmNlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaGVldF9pZCAtIFRoZSBJRCBvZiB0aGUgR29vZ2xlIFNoZWV0cyBzcHJlYWRzaGVldC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2hlZXRfbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBzaGVldCB0YWIuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzIHwgbnVsbCxcbiAgICAgICAgc2hlZXRfaWQ6IHN0cmluZyxcbiAgICAgICAgc2hlZXRfbmFtZTogc3RyaW5nXG4gICAgKSB7XG4gICAgICAgIHRoaXMuc2hlZXRzX3NlcnZpY2UgPSBzaGVldHNfc2VydmljZTtcbiAgICAgICAgdGhpcy5zaGVldF9pZCA9IHNoZWV0X2lkO1xuICAgICAgICB0aGlzLnNoZWV0X25hbWUgPSBzaGVldF9uYW1lLnNwbGl0KFwiIVwiKVswXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdmFsdWVzIGZyb20gdGhlIHNoZWV0LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbH0gW3JhbmdlXSAtIFRoZSByYW5nZSB0byBnZXQgdmFsdWVzIGZyb20uXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55W11bXSB8IHVuZGVmaW5lZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSB2YWx1ZXMgZnJvbSB0aGUgc2hlZXQuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3ZhbHVlcyhyYW5nZT86IHN0cmluZyB8IG51bGwpOiBQcm9taXNlPGFueVtdW10gfCB1bmRlZmluZWQ+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5fZ2V0X3ZhbHVlcyhyYW5nZSk7XG4gICAgICAgIHJldHVybiByZXN1bHQuZGF0YS52YWx1ZXMgPz8gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgcm93IGZvciBhIHNwZWNpZmljIHBhdHJvbGxlci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0cm9sbGVyX25hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcGF0cm9sbGVyLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lX2NvbHVtbiAtIFRoZSBjb2x1bW4gd2hlcmUgdGhlIHBhdHJvbGxlcidzIG5hbWUgaXMgbG9jYXRlZC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bGx9IFtyYW5nZV0gLSBUaGUgcmFuZ2UgdG8gc2VhcmNoIHdpdGhpbi5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx7IHJvdzogYW55W107IGluZGV4OiBudW1iZXI7IH0gfCBudWxsPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIHJvdyBhbmQgaW5kZXggb2YgdGhlIHBhdHJvbGxlciwgb3IgbnVsbCBpZiBub3QgZm91bmQuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3NoZWV0X3Jvd19mb3JfcGF0cm9sbGVyKFxuICAgICAgICBwYXRyb2xsZXJfbmFtZTogc3RyaW5nLFxuICAgICAgICBuYW1lX2NvbHVtbjogc3RyaW5nLFxuICAgICAgICByYW5nZT86IHN0cmluZyB8IG51bGxcbiAgICApOiBQcm9taXNlPHsgcm93OiBhbnlbXTsgaW5kZXg6IG51bWJlcjsgfSB8IG51bGw+IHtcbiAgICAgICAgY29uc3Qgcm93cyA9IGF3YWl0IHRoaXMuZ2V0X3ZhbHVlcyhyYW5nZSk7XG4gICAgICAgIGlmIChyb3dzKSB7XG4gICAgICAgICAgICBjb25zdCBsb29rdXBfaW5kZXggPSBleGNlbF9yb3dfdG9faW5kZXgobmFtZV9jb2x1bW4pO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJvd3NbaV1bbG9va3VwX2luZGV4XSA9PT0gcGF0cm9sbGVyX25hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgcm93OiByb3dzW2ldLCBpbmRleDogaSB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgYENvdWxkbid0IGZpbmQgcGF0cm9sbGVyICR7cGF0cm9sbGVyX25hbWV9IGluIHNoZWV0ICR7dGhpcy5zaGVldF9uYW1lfS5gXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB2YWx1ZXMgaW4gdGhlIHNoZWV0LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByYW5nZSAtIFRoZSByYW5nZSB0byB1cGRhdGUuXG4gICAgICogQHBhcmFtIHthbnlbXVtdfSB2YWx1ZXMgLSBUaGUgdmFsdWVzIHRvIHVwZGF0ZS5cbiAgICAgKi9cbiAgICBhc3luYyB1cGRhdGVfdmFsdWVzKHJhbmdlOiBzdHJpbmcsIHZhbHVlczogYW55W11bXSkge1xuICAgICAgICBjb25zdCB1cGRhdGVNZSA9IChhd2FpdCB0aGlzLl9nZXRfdmFsdWVzKHJhbmdlLCBudWxsKSkuZGF0YTtcblxuICAgICAgICB1cGRhdGVNZS52YWx1ZXMgPSB2YWx1ZXM7XG4gICAgICAgIGF3YWl0IHRoaXMuc2hlZXRzX3NlcnZpY2UhLnNwcmVhZHNoZWV0cy52YWx1ZXMudXBkYXRlKHtcbiAgICAgICAgICAgIHNwcmVhZHNoZWV0SWQ6IHRoaXMuc2hlZXRfaWQsXG4gICAgICAgICAgICB2YWx1ZUlucHV0T3B0aW9uOiBcIlVTRVJfRU5URVJFRFwiLFxuICAgICAgICAgICAgcmFuZ2U6IHVwZGF0ZU1lLnJhbmdlISxcbiAgICAgICAgICAgIHJlcXVlc3RCb2R5OiB1cGRhdGVNZSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHZhbHVlcyBmcm9tIHRoZSBzaGVldCAocHJpdmF0ZSBtZXRob2QpLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbH0gW3JhbmdlXSAtIFRoZSByYW5nZSB0byBnZXQgdmFsdWVzIGZyb20uXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCBudWxsfSBbdmFsdWVSZW5kZXJPcHRpb25dIC0gVGhlIHZhbHVlIHJlbmRlciBvcHRpb24uXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55W11bXT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSB2YWx1ZSByYW5nZS5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgYXN5bmMgX2dldF92YWx1ZXMoXG4gICAgICAgIHJhbmdlPzogc3RyaW5nIHwgbnVsbCxcbiAgICAgICAgdmFsdWVSZW5kZXJPcHRpb246IHN0cmluZyB8IG51bGwgPSBcIlVORk9STUFUVEVEX1ZBTFVFXCJcbiAgICApIHtcbiAgICAgICAgbGV0IGxvb2t1cFJhbmdlID0gdGhpcy5zaGVldF9uYW1lO1xuICAgICAgICBpZiAocmFuZ2UgIT0gbnVsbCkge1xuICAgICAgICAgICAgbG9va3VwUmFuZ2UgPSBsb29rdXBSYW5nZSArIFwiIVwiO1xuXG4gICAgICAgICAgICBpZiAocmFuZ2Uuc3RhcnRzV2l0aChsb29rdXBSYW5nZSkpIHtcbiAgICAgICAgICAgICAgICByYW5nZSA9IHJhbmdlLnN1YnN0cmluZyhsb29rdXBSYW5nZS5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9va3VwUmFuZ2UgPSBsb29rdXBSYW5nZSArIHJhbmdlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBvcHRzOiBzaGVldHNfdjQuUGFyYW1zJFJlc291cmNlJFNwcmVhZHNoZWV0cyRWYWx1ZXMkR2V0ID0ge1xuICAgICAgICAgICAgc3ByZWFkc2hlZXRJZDogdGhpcy5zaGVldF9pZCxcbiAgICAgICAgICAgIHJhbmdlOiBsb29rdXBSYW5nZSxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHZhbHVlUmVuZGVyT3B0aW9uKSB7XG4gICAgICAgICAgICBvcHRzLnZhbHVlUmVuZGVyT3B0aW9uID0gdmFsdWVSZW5kZXJPcHRpb247XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuc2hlZXRzX3NlcnZpY2UhLnNwcmVhZHNoZWV0cy52YWx1ZXMuZ2V0KG9wdHMpO1xuICAgIH1cbn1cbiIsIlxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkX3Bhc3Nlc19zdHJpbmcoXG4gICAgdXNlZDogbnVtYmVyLFxuICAgIHRvdGFsOiBudW1iZXIsXG4gICAgdG9kYXk6IG51bWJlcixcbiAgICBmb3JjZV90b2RheTogYm9vbGVhbiA9IGZhbHNlXG4pIHtcbiAgICBsZXQgbWVzc2FnZSA9IGBZb3UgaGF2ZSB1c2VkICR7dXNlZH0gb2YgJHt0b3RhbH0gZ3Vlc3QgcGFzc2VzIHRoaXMgc2Vhc29uYDtcbiAgICBpZiAoZm9yY2VfdG9kYXkgfHwgdG9kYXkgPiAwKSB7XG4gICAgICAgIG1lc3NhZ2UgKz0gYCAoJHt0b2RheX0gdXNlZCB0b2RheSlgO1xuICAgIH1cbiAgICBtZXNzYWdlICs9IFwiLlwiO1xuICAgIHJldHVybiBtZXNzYWdlO1xufVxuIiwiLyoqXG4gKiBWYWxpZGF0ZXMgaWYgdGhlIHByb3ZpZGVkIHNjb3BlcyBpbmNsdWRlIGFsbCBkZXNpcmVkIHNjb3Blcy5cbiAqIEBwYXJhbSB7c3RyaW5nW119IHNjb3BlcyAtIFRoZSBsaXN0IG9mIHNjb3BlcyB0byB2YWxpZGF0ZS5cbiAqIEBwYXJhbSB7c3RyaW5nW119IGRlc2lyZWRfc2NvcGVzIC0gVGhlIGxpc3Qgb2YgZGVzaXJlZCBzY29wZXMuXG4gKiBAdGhyb3dzIHtFcnJvcn0gVGhyb3dzIGFuIGVycm9yIGlmIGFueSBkZXNpcmVkIHNjb3BlIGlzIG1pc3NpbmcuXG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlX3Njb3BlcyhzY29wZXM6IHN0cmluZ1tdLCBkZXNpcmVkX3Njb3Blczogc3RyaW5nW10pIHtcbiAgICBmb3IgKGNvbnN0IGRlc2lyZWRfc2NvcGUgb2YgZGVzaXJlZF9zY29wZXMpIHtcbiAgICAgICAgaWYgKHNjb3BlcyA9PT0gdW5kZWZpbmVkIHx8ICFzY29wZXMuaW5jbHVkZXMoZGVzaXJlZF9zY29wZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gYE1pc3Npbmcgc2NvcGUgJHtkZXNpcmVkX3Njb3BlfSBpbiByZWNlaXZlZCBzY29wZXM6ICR7c2NvcGVzfWA7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IHt2YWxpZGF0ZV9zY29wZXN9IiwiaW1wb3J0IHsgU2VjdGlvbkNvbmZpZyB9IGZyb20gJy4uL2Vudi9oYW5kbGVyX2NvbmZpZyc7XG5cbi8qKlxuICAgICogQ2xhc3MgZm9yIHNlY3Rpb24gdmFsdWVzLlxuICAgICovXG5jbGFzcyBTZWN0aW9uVmFsdWVzIHtcbiAgICBzZWN0aW9uX2NvbmZpZzogU2VjdGlvbkNvbmZpZ1xuICAgIHNlY3Rpb25zOiBzdHJpbmdbXTtcbiAgICBsb3dlcmNhc2Vfc2VjdGlvbnM6IHN0cmluZ1tdO1xuXG4gICAgY29uc3RydWN0b3Ioc2VjdGlvbl9jb25maWc6IFNlY3Rpb25Db25maWcpIHtcbiAgICAgICAgdGhpcy5zZWN0aW9uX2NvbmZpZyA9IHNlY3Rpb25fY29uZmlnO1xuICAgICAgICB0aGlzLnNlY3Rpb25zID0gc2VjdGlvbl9jb25maWcuU0VDVElPTl9WQUxVRVMuc3BsaXQoJywnKTtcbiAgICAgICAgdGhpcy5sb3dlcmNhc2Vfc2VjdGlvbnMgPSBzZWN0aW9uX2NvbmZpZy5TRUNUSU9OX1ZBTFVFUy50b0xvd2VyQ2FzZSgpLnNwbGl0KCcsJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgc2VjdGlvbiBkZXNjcmlwdGlvbi5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgc2VjdGlvbiBkZXNjcmlwdGlvbi5cbiAgICAqL1xuICAgIGdldF9zZWN0aW9uX2Rlc2NyaXB0aW9uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlY3Rpb25fY29uZmlnLlNFQ1RJT05fVkFMVUVTO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogUGFyc2VzIGEgc2VjdGlvbi5cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5IC0gVGhlIGJvZHkgb2YgdGhlIHJlcXVlc3QuXG4gICAgKiBAcmV0dXJucyB7c3RyaW5nIHwgbnVsbH0gVGhlIHNlY3Rpb24gaWYgaXQgaXMgYSB2YWxpZCBzZWN0aW9uIG9yIG51bGwuXG4gICAgKi9cbiAgICBwYXJzZV9zZWN0aW9uKGJvZHk6IHN0cmluZyB8IG51bGwpOiBzdHJpbmcgfCBudWxsIHtcbiAgICAgICAgaWYgKGJvZHkgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgICByZXR1cm4gdGhpcy5sb3dlcmNhc2Vfc2VjdGlvbnMuaW5jbHVkZXMoYm9keS50b0xvd2VyQ2FzZSgpKSA/IGJvZHkgOiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogTWFwcyBhIGxvd2VyIGNhc2UgdmVyc2lvbiBvZiBhIHNlY3Rpb24gc3RyaW5nIHRvIHRoZSBvcmlnaW5hbCBjYXNlIHZhbHVlLlxuICAgICogQHBhcmFtIHtzdHJpbmd9IHNlY3Rpb24gLSBUaGUgbG93ZXIgY2FzZSBzZWN0aW9uIHN0cmluZy5cbiAgICAqIEByZXR1cm5zIHtzdHJpbmcgfSBUaGUgb3JpZ2luYWwgY2FzZSB2YWx1ZSBpZiBmb3VuZCwgb3RoZXJ3aXNlIG51bGwuXG4gICAgKi9cbiAgIG1hcF9zZWN0aW9uKHNlY3Rpb246IHN0cmluZyB8IG51bGwpOiBzdHJpbmcgIHtcbiAgICAgICBpZiAoc2VjdGlvbiA9PT0gbnVsbCkge1xuICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICB9XG4gICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmxvd2VyY2FzZV9zZWN0aW9ucy5pbmRleE9mKHNlY3Rpb24udG9Mb3dlckNhc2UoKSk7XG4gICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICByZXR1cm4gdGhpcy5zZWN0aW9uc1tpbmRleF07XG4gICAgICAgfVxuICAgICAgIHJldHVybiBcIlwiO1xuICAgfVxuXG59XG5cbmV4cG9ydCB7IFNlY3Rpb25WYWx1ZXMgfTsiLCIvKipcbiAqIENvbnZlcnQgcm93IGFuZCBjb2x1bW4gbnVtYmVycyB0byBhbiBFeGNlbC1saWtlIGluZGV4LlxuICogQHBhcmFtIHtudW1iZXJ9IHJvdyAtIFRoZSByb3cgbnVtYmVyICgwLWJhc2VkKS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBjb2wgLSBUaGUgY29sdW1uIG51bWJlciAoMC1iYXNlZCkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgRXhjZWwtbGlrZSBpbmRleCAoZS5nLiwgXCJBMVwiKS5cbiAqL1xuZnVuY3Rpb24gcm93X2NvbF90b19leGNlbF9pbmRleChyb3c6IG51bWJlciwgY29sOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGxldCBjb2xTdHJpbmcgPSBcIlwiO1xuICAgIGNvbCArPSAxO1xuICAgIHdoaWxlIChjb2wgPiAwKSB7XG4gICAgICAgIGNvbCAtPSAxO1xuICAgICAgICBjb25zdCBtb2R1bG8gPSBjb2wgJSAyNjtcbiAgICAgICAgY29uc3QgY29sTGV0dGVyID0gU3RyaW5nLmZyb21DaGFyQ29kZSgnQScuY2hhckNvZGVBdCgwKSArIG1vZHVsbyk7XG4gICAgICAgIGNvbFN0cmluZyA9IGNvbExldHRlciArIGNvbFN0cmluZztcbiAgICAgICAgY29sID0gTWF0aC5mbG9vcihjb2wgLyAyNik7XG4gICAgfVxuICAgIHJldHVybiBjb2xTdHJpbmcgKyAocm93ICsgMSkudG9TdHJpbmcoKTtcbn1cblxuLyoqXG4gKiBTcGxpdCBhbiBFeGNlbC1saWtlIGluZGV4IGludG8gcm93IGFuZCBjb2x1bW4gbnVtYmVycy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBleGNlbF9pbmRleCAtIFRoZSBFeGNlbC1saWtlIGluZGV4IChlLmcuLCBcIkExXCIpLlxuICogQHJldHVybnMge1tudW1iZXIsIG51bWJlcl19IEFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIHJvdyBhbmQgY29sdW1uIG51bWJlcnMgKDAtYmFzZWQpLlxuICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBpbmRleCBjYW5ub3QgYmUgcGFyc2VkLlxuICovXG5mdW5jdGlvbiBzcGxpdF90b19yb3dfY29sKGV4Y2VsX2luZGV4OiBzdHJpbmcpOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoXCJeKFtBLVphLXpdKykoWzAtOV0rKSRcIik7XG4gICAgY29uc3QgbWF0Y2ggPSByZWdleC5leGVjKGV4Y2VsX2luZGV4KTtcbiAgICBpZiAobWF0Y2ggPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gcGFyc2Ugc3RyaW5nIGZvciBleGNlbCBwb3NpdGlvbiBzcGxpdFwiKTtcbiAgICB9XG4gICAgY29uc3QgY29sID0gZXhjZWxfcm93X3RvX2luZGV4KG1hdGNoWzFdKTtcbiAgICBjb25zdCByYXdfcm93ID0gTnVtYmVyKG1hdGNoWzJdKTtcbiAgICBpZiAocmF3X3JvdyA8IDEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUm93IG11c3QgYmUgPj0xXCIpO1xuICAgIH1cbiAgICByZXR1cm4gW3Jhd19yb3cgLSAxLCBjb2xdO1xufVxuXG4vKipcbiAqIExvb2sgdXAgYSB2YWx1ZSBpbiBhIHNoZWV0IGJ5IGl0cyBFeGNlbC1saWtlIGluZGV4LlxuICogQHBhcmFtIHtzdHJpbmd9IGV4Y2VsX2luZGV4IC0gVGhlIEV4Y2VsLWxpa2UgaW5kZXggKGUuZy4sIFwiQTFcIikuXG4gKiBAcGFyYW0ge2FueVtdW119IHNoZWV0IC0gVGhlIHNoZWV0IGRhdGEuXG4gKiBAcmV0dXJucyB7YW55fSBUaGUgdmFsdWUgYXQgdGhlIHNwZWNpZmllZCBpbmRleCwgb3IgdW5kZWZpbmVkIGlmIG5vdCBmb3VuZC5cbiAqL1xuZnVuY3Rpb24gbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQoZXhjZWxfaW5kZXg6IHN0cmluZywgc2hlZXQ6IGFueVtdW10pOiBhbnkge1xuICAgIGNvbnN0IFtyb3csIGNvbF0gPSBzcGxpdF90b19yb3dfY29sKGV4Y2VsX2luZGV4KTtcbiAgICBpZiAocm93ID49IHNoZWV0Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gc2hlZXRbcm93XVtjb2xdO1xufVxuXG4vKipcbiAqIENvbnZlcnQgRXhjZWwtbGlrZSBjb2x1bW4gbGV0dGVycyB0byBhIGNvbHVtbiBudW1iZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gbGV0dGVycyAtIFRoZSBjb2x1bW4gbGV0dGVycyAoZS5nLiwgXCJBXCIpLlxuICogQHJldHVybnMge251bWJlcn0gVGhlIGNvbHVtbiBudW1iZXIgKDAtYmFzZWQpLlxuICovXG5mdW5jdGlvbiBleGNlbF9yb3dfdG9faW5kZXgobGV0dGVyczogc3RyaW5nKTogbnVtYmVyIHtcbiAgICBjb25zdCBsb3dlckxldHRlcnMgPSBsZXR0ZXJzLnRvTG93ZXJDYXNlKCk7XG4gICAgbGV0IHJlc3VsdDogbnVtYmVyID0gMDtcbiAgICBmb3IgKGxldCBwID0gMDsgcCA8IGxvd2VyTGV0dGVycy5sZW5ndGg7IHArKykge1xuICAgICAgICBjb25zdCBjaGFyYWN0ZXJWYWx1ZSA9XG4gICAgICAgICAgICBsb3dlckxldHRlcnMuY2hhckNvZGVBdChwKSAtIFwiYVwiLmNoYXJDb2RlQXQoMCkgKyAxO1xuICAgICAgICByZXN1bHQgPSBjaGFyYWN0ZXJWYWx1ZSArIHJlc3VsdCAqIDI2O1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0IC0gMTtcbn1cblxuLyoqXG4gKiBQYXJzZSBhIEdvb2dsZSBTaGVldHMgY2hlY2tib3gvYm9vbGVhbiBjZWxsIHZhbHVlIGFzIGEgYm9vbGVhbi5cbiAqIEFjY2VwdHMgSlMgYm9vbGVhbiB0cnVlL2ZhbHNlIGFuZCBzdHJpbmcgbGl0ZXJhbHMgXCJUUlVFXCIvXCJGQUxTRVwiXG4gKiAoY2FzZS1pbnNlbnNpdGl2ZSkgZnJvbSBTaGVldHMsICBkZXBlbmRpbmcgb24gdGhlIGNlbGwgZm9ybWF0dGluZy5cbiAqIEFueSB2YWx1ZSB0aGF0IGNhbm5vdCBiZSByZWNvZ25pemVkIGFzIHRydWUgaXMgY29uc2lkZXJlZCBmYWxzZS5cbiAqIEBwYXJhbSB7YW55fSB2YWx1ZSAtIFJhdyBjZWxsIHZhbHVlLlxuICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgb25seSB3aGVuIHZhbHVlIGlzIHRydWUgb3IgXCJUUlVFXCIgKGNhc2UtaW5zZW5zaXRpdmUpLlxuICovXG5mdW5jdGlvbiBwYXJzZV9ib29sZWFuX2NlbGwodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiB2YWx1ZS50b1VwcGVyQ2FzZSgpID09PSBcIlRSVUVcIjtcbn1cblxuLyoqXG4gKiBTYW5pdGl6ZSBhIHBob25lIG51bWJlciBieSByZW1vdmluZyB1bndhbnRlZCBjaGFyYWN0ZXJzLlxuICogQHBhcmFtIHtudW1iZXIgfCBzdHJpbmd9IG51bWJlciAtIFRoZSBwaG9uZSBudW1iZXIgdG8gc2FuaXRpemUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgc2FuaXRpemVkIHBob25lIG51bWJlci5cbiAqL1xuZnVuY3Rpb24gc2FuaXRpemVfcGhvbmVfbnVtYmVyKG51bWJlcjogbnVtYmVyIHwgc3RyaW5nKTogc3RyaW5nIHtcbiAgICBsZXQgbmV3X251bWJlciA9IG51bWJlci50b1N0cmluZygpO1xuICAgIG5ld19udW1iZXIgPSBuZXdfbnVtYmVyLnJlcGxhY2UoXCJ3aGF0c2FwcDpcIiwgXCJcIik7XG4gICAgbGV0IHRlbXBvcmFyeV9uZXdfbnVtYmVyOiBzdHJpbmcgPSBcIlwiO1xuICAgIHdoaWxlICh0ZW1wb3JhcnlfbmV3X251bWJlciAhPSBuZXdfbnVtYmVyKSB7XG4gICAgICAgIC8vIERvIHRoaXMgbXVsdGlwbGUgdGltZXMgc28gd2UgZ2V0IGFsbCArMSBhdCB0aGUgc3RhcnQgb2YgdGhlIHN0cmluZywgZXZlbiBhZnRlciBzdHJpcHBpbmcuXG4gICAgICAgIHRlbXBvcmFyeV9uZXdfbnVtYmVyID0gbmV3X251bWJlcjtcbiAgICAgICAgbmV3X251bWJlciA9IG5ld19udW1iZXIucmVwbGFjZSgvKF5cXCsxfFxcKHxcXCl8XFwufC0pL2csIFwiXCIpO1xuICAgIH1cbiAgICBjb25zdCByZXN1bHQgPSBTdHJpbmcocGFyc2VJbnQobmV3X251bWJlcikpLnBhZFN0YXJ0KDEwLCBcIjBcIik7XG4gICAgaWYgKHJlc3VsdC5sZW5ndGggPT0gMTEgJiYgcmVzdWx0WzBdID09IFwiMVwiKSB7XG4gICAgICAgIHJldHVybiByZXN1bHQuc3Vic3RyaW5nKDEpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQge1xuICAgIHJvd19jb2xfdG9fZXhjZWxfaW5kZXgsXG4gICAgZXhjZWxfcm93X3RvX2luZGV4LFxuICAgIHNhbml0aXplX3Bob25lX251bWJlcixcbiAgICBzcGxpdF90b19yb3dfY29sLFxuICAgIGxvb2t1cF9yb3dfY29sX2luX3NoZWV0LFxuICAgIHBhcnNlX2Jvb2xlYW5fY2VsbCxcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJnb29nbGVhcGlzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNtcy1zZWdtZW50cy1jYWxjdWxhdG9yXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbmNvbnN0IF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0Y29uc3QgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdGNvbnN0IG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHRjb25zdCBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0Y29uc3QgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIvdmFsdWUgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSk7IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIkB0d2lsaW8tbGFicy9zZXJ2ZXJsZXNzLXJ1bnRpbWUtdHlwZXNcIjtcbmltcG9ydCB7XG4gICAgQ29udGV4dCxcbiAgICBTZXJ2ZXJsZXNzQ2FsbGJhY2ssXG4gICAgU2VydmVybGVzc0V2ZW50T2JqZWN0LFxuICAgIFNlcnZlcmxlc3NGdW5jdGlvblNpZ25hdHVyZSxcbn0gZnJvbSBcIkB0d2lsaW8tbGFicy9zZXJ2ZXJsZXNzLXJ1bnRpbWUtdHlwZXMvdHlwZXNcIjtcbmltcG9ydCBCVk5TUEhhbmRsZXIsIHsgQlZOU1BFdmVudCB9IGZyb20gXCIuL2J2bnNwX2hhbmRsZXJcIjtcbmltcG9ydCB7IEhhbmRsZXJFbnZpcm9ubWVudCB9IGZyb20gXCIuLi9lbnYvaGFuZGxlcl9jb25maWdcIjtcblxuY29uc3QgTkVYVF9TVEVQX0NPT0tJRV9OQU1FID0gXCJidm5zcF9uZXh0X3N0ZXBcIjtcblxuLyoqXG4gKiBUd2lsaW8gU2VydmVybGVzcyBmdW5jdGlvbiBoYW5kbGVyIGZvciBCVk5TUCBib3QgY29tbWFuZHMuXG4gKiBAcGFyYW0ge0NvbnRleHQ8SGFuZGxlckVudmlyb25tZW50Pn0gY29udGV4dCAtIFRoZSBUd2lsaW8gc2VydmVybGVzcyBjb250ZXh0LlxuICogQHBhcmFtIHtTZXJ2ZXJsZXNzRXZlbnRPYmplY3Q8QlZOU1BFdmVudD59IGV2ZW50IC0gVGhlIGV2ZW50IG9iamVjdC5cbiAqIEBwYXJhbSB7U2VydmVybGVzc0NhbGxiYWNrfSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbi5cbiAqL1xuZXhwb3J0IGNvbnN0IGhhbmRsZXI6IFNlcnZlcmxlc3NGdW5jdGlvblNpZ25hdHVyZTxcbiAgICBIYW5kbGVyRW52aXJvbm1lbnQsXG4gICAgQlZOU1BFdmVudFxuPiA9IGFzeW5jIGZ1bmN0aW9uIChcbiAgICBjb250ZXh0OiBDb250ZXh0PEhhbmRsZXJFbnZpcm9ubWVudD4sXG4gICAgZXZlbnQ6IFNlcnZlcmxlc3NFdmVudE9iamVjdDxCVk5TUEV2ZW50PixcbiAgICBjYWxsYmFjazogU2VydmVybGVzc0NhbGxiYWNrXG4pIHtcbiAgICBjb25zdCBoYW5kbGVyID0gbmV3IEJWTlNQSGFuZGxlcihjb250ZXh0LCBldmVudCk7XG4gICAgbGV0IG1lc3NhZ2U6IHN0cmluZztcbiAgICBsZXQgbmV4dF9zdGVwOiBzdHJpbmcgPSBcIlwiO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXJfcmVzcG9uc2UgPSBhd2FpdCBoYW5kbGVyLmhhbmRsZSgpO1xuICAgICAgICBtZXNzYWdlID1cbiAgICAgICAgICAgIGhhbmRsZXJfcmVzcG9uc2UucmVzcG9uc2UgfHxcbiAgICAgICAgICAgIFwiVW5leHBlY3RlZCByZXN1bHQgLSBubyByZXNwb25zZSBkZXRlcm1pbmVkXCI7XG4gICAgICAgIG5leHRfc3RlcCA9IGhhbmRsZXJfcmVzcG9uc2UubmV4dF9zdGVwIHx8IFwiXCI7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkFuIGVycm9yIG9jY3VyZWRcIik7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlKSk7XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIH1cbiAgICAgICAgbWVzc2FnZSA9IFwiQW4gdW5leHBlY3RlZCBlcnJvciBvY2N1cmVkLlwiO1xuICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICBtZXNzYWdlICs9IFwiXFxuXCIgKyBlLm1lc3NhZ2U7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yXCIsIGUuc3RhY2spO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvclwiLCBlLm5hbWUpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvclwiLCBlLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBuZXcgVHdpbGlvLlJlc3BvbnNlKCk7XG4gICAgY29uc3QgdHdpbWwgPSBuZXcgVHdpbGlvLnR3aW1sLk1lc3NhZ2luZ1Jlc3BvbnNlKCk7XG5cbiAgICB0d2ltbC5tZXNzYWdlKG1lc3NhZ2UpO1xuXG4gICAgcmVzcG9uc2VcbiAgICAgICAgLy8gQWRkIHRoZSBzdHJpbmdpZmllZCBUd2lNTCB0byB0aGUgcmVzcG9uc2UgYm9keVxuICAgICAgICAuc2V0Qm9keSh0d2ltbC50b1N0cmluZygpKVxuICAgICAgICAvLyBTaW5jZSB3ZSdyZSByZXR1cm5pbmcgVHdpTUwsIHRoZSBjb250ZW50IHR5cGUgbXVzdCBiZSBYTUxcbiAgICAgICAgLmFwcGVuZEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcInRleHQveG1sXCIpXG4gICAgICAgIC5zZXRDb29raWUoTkVYVF9TVEVQX0NPT0tJRV9OQU1FLCBuZXh0X3N0ZXApO1xuXG4gICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlKTtcbn07Il0sIm5hbWVzIjpbIkNoZWNraW5WYWx1ZSIsInVzZXJfY3JlZHNfY29uZmlnIiwiTlNQX0VNQUlMX0RPTUFJTiIsImZpbmRfcGF0cm9sbGVyX2NvbmZpZyIsIlNIRUVUX0lEIiwiUEhPTkVfTlVNQkVSX0xPT0tVUF9TSEVFVCIsIlBIT05FX05VTUJFUl9OQU1FX0NPTFVNTiIsIlBIT05FX05VTUJFUl9OVU1CRVJfQ09MVU1OIiwibG9naW5fc2hlZXRfY29uZmlnIiwiTE9HSU5fU0hFRVRfTE9PS1VQIiwiQ0hFQ0tJTl9DT1VOVF9MT09LVVAiLCJTSEVFVF9EQVRFX0NFTEwiLCJDVVJSRU5UX0RBVEVfQ0VMTCIsIkFSQ0hJVkVEX0NFTEwiLCJOQU1FX0NPTFVNTiIsIkNBVEVHT1JZX0NPTFVNTiIsIlNFQ1RJT05fRFJPUERPV05fQ09MVU1OIiwiQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU4iLCJzZWFzb25fc2hlZXRfY29uZmlnIiwiU0VBU09OX1NIRUVUIiwiU0VBU09OX1NIRUVUX05BTUVfQ09MVU1OIiwiU0VBU09OX1NIRUVUX0RBWVNfQ09MVU1OIiwic2VjdGlvbl9jb25maWciLCJTRUNUSU9OX1ZBTFVFUyIsImd1ZXN0X3Bhc3Nlc19jb25maWciLCJHVUVTVF9QQVNTX1NIRUVUIiwiR1VFU1RfUEFTU19FTElHSUJMRV9DT0xVTU4iLCJHVUVTVF9QQVNTX0VMSUdJQkxFX1JFQVNPTl9DT0xVTU4iLCJHVUVTVF9QQVNTX1NIRUVUX05BTUVfQ09MVU1OIiwiR1VFU1RfUEFTU19TSEVFVF9BVkFJTEFCTEVfQ09MVU1OIiwiR1VFU1RfUEFTU19TSEVFVF9VU0VEX1RPREFZX0NPTFVNTiIsIkdVRVNUX1BBU1NfU0hFRVRfVVNFRF9TRUFTT05fQ09MVU1OIiwiR1VFU1RfUEFTU19TSEVFVF9EQVRFU19TVEFSVElOR19DT0xVTU4iLCJoYW5kbGVyX2NvbmZpZyIsIlNDUklQVF9JRCIsIlNZTkNfU0lEIiwiQVJDSElWRV9GVU5DVElPTl9OQU1FIiwiUkVTRVRfRlVOQ1RJT05fTkFNRSIsIlVTRV9TRVJWSUNFX0FDQ09VTlQiLCJBQ1RJT05fTE9HX1NIRUVUIiwiQ0hFQ0tJTl9WQUxVRVMiLCJDT05GSUciLCJnb29nbGUiLCJMb2dpblNoZWV0IiwiU2Vhc29uU2hlZXQiLCJVc2VyQ3JlZHMiLCJDaGVja2luVmFsdWVzIiwiZ2V0X3NlcnZpY2VfY3JlZGVudGlhbHNfcGF0aCIsImV4Y2VsX3Jvd190b19pbmRleCIsInNhbml0aXplX3Bob25lX251bWJlciIsImJ1aWxkX3Bhc3Nlc19zdHJpbmciLCJHdWVzdFBhc3NTaGVldCIsIlNlY3Rpb25WYWx1ZXMiLCJORVhUX1NURVBTIiwiQVdBSVRfQ09NTUFORCIsIkFXQUlUX0NIRUNLSU4iLCJDT05GSVJNX1JFU0VUIiwiQVVUSF9SRVNFVCIsIkFXQUlUX1NFQ1RJT04iLCJBV0FJVF9QQVNTIiwiQVdBSVRfTUVTU0FHRSIsIkFXQUlUX0JST0FEQ0FTVCIsIkNPTU1BTkRTIiwiT05fRFVUWSIsIlNUQVRVUyIsIkNIRUNLSU4iLCJTRUNUSU9OX0FTU0lHTk1FTlQiLCJHVUVTVF9QQVNTIiwiV0hBVFNBUFAiLCJNRVNTQUdFIiwiQlJPQURDQVNUIiwiU01TX01BWF9MRU5HVEgiLCJNRVNTQUdFX1BSRUZJWF9URU1QTEFURSIsIk1FU1NBR0VfUFJFRklYX1NVRkZJWCIsInZhbGlkYXRlX3Ntc19tZXNzYWdlIiwiZnVsbF9tZXNzYWdlIiwiU2VnbWVudGVkTWVzc2FnZSIsInJlcXVpcmUiLCJzZWdtZW50ZWQiLCJub25fZ3NtIiwiZ2V0Tm9uR3NtQ2hhcmFjdGVycyIsImxlbmd0aCIsInZhbGlkIiwicmVhc29uIiwibm9uX2dzbV9jaGFyYWN0ZXJzIiwiU2V0Iiwic2VnbWVudHNDb3VudCIsInNlZ21lbnRzX2NvdW50IiwiZm9ybWF0X3Bob25lX2Zvcl9kaXNwbGF5IiwidGVuX2RpZ2l0cyIsInN1YnN0cmluZyIsIkJWTlNQSGFuZGxlciIsIlNDT1BFUyIsInNtc19yZXF1ZXN0IiwicmVzdWx0X21lc3NhZ2VzIiwiZnJvbSIsInRvIiwiYm9keSIsImJvZHlfcmF3IiwicGF0cm9sbGVyIiwiYnZuc3BfbmV4dF9zdGVwIiwiY2hlY2tpbl9tb2RlIiwiZmFzdF9jaGVja2luIiwiYXNzaWduZWRfc2VjdGlvbiIsInR3aWxpb19jbGllbnQiLCJzeW5jX3NpZCIsInJlc2V0X3NjcmlwdF9pZCIsInN5bmNfY2xpZW50IiwidXNlcl9jcmVkcyIsInNlcnZpY2VfY3JlZHMiLCJzaGVldHNfc2VydmljZSIsInVzZXJfc2NyaXB0c19zZXJ2aWNlIiwibG9naW5fc2hlZXQiLCJzZWFzb25fc2hlZXQiLCJndWVzdF9wYXNzX3NoZWV0IiwiY2hlY2tpbl92YWx1ZXMiLCJjdXJyZW50X3NoZWV0X2RhdGUiLCJjb21iaW5lZF9jb25maWciLCJjb25maWciLCJzZWN0aW9uX3ZhbHVlcyIsImNvbnRleHQiLCJldmVudCIsIkZyb20iLCJudW1iZXIiLCJ1bmRlZmluZWQiLCJ0ZXN0X251bWJlciIsIlRvIiwiQm9keSIsInRvTG93ZXJDYXNlIiwidHJpbSIsInJlcGxhY2UiLCJyZXF1ZXN0IiwiY29va2llcyIsImdldFR3aWxpb0NsaWVudCIsImUiLCJjb25zb2xlIiwibG9nIiwiRGF0ZSIsInBhcnNlX2Zhc3RfY2hlY2tpbl9tb2RlIiwicGFyc2VkIiwicGFyc2VfZmFzdF9jaGVja2luIiwia2V5IiwicGFyc2VfY2hlY2tpbiIsInBhcnNlX2NoZWNraW5fZnJvbV9uZXh0X3N0ZXAiLCJsYXN0X3NlZ21lbnQiLCJzcGxpdCIsInNsaWNlIiwiYnlfa2V5IiwiZGVsYXkiLCJzZWNvbmRzIiwib3B0aW9uYWwiLCJQcm9taXNlIiwicmVzIiwic2V0VGltZW91dCIsInNlbmRfbWVzc2FnZSIsIm1lc3NhZ2UiLCJnZXRfdHdpbGlvX2NsaWVudCIsIm1lc3NhZ2VzIiwiY3JlYXRlIiwicHVzaCIsImhhbmRsZSIsInJlc3VsdCIsIl9oYW5kbGUiLCJyZXNwb25zZSIsImpvaW4iLCJuZXh0X3N0ZXAiLCJsb2dvdXQiLCJjaGVja191c2VyX2NyZWRzIiwiZ2V0X21hcHBlZF9wYXRyb2xsZXIiLCJhd2FpdF9yZXNwb25zZSIsImhhbmRsZV9hd2FpdF9jb21tYW5kIiwiY2hlY2tpbiIsInN0YXJ0c1dpdGgiLCJuYW1lIiwicmVzZXRfc2hlZXRfZmxvdyIsInNlY3Rpb24iLCJwYXJzZV9zZWN0aW9uIiwiYXNzaWduX3NlY3Rpb24iLCJwcm9tcHRfc2VjdGlvbl9hc3NpZ25tZW50Iiwic2VuZF90ZXh0X21lc3NhZ2UiLCJzZW5kX2Jyb2FkY2FzdF9tZXNzYWdlIiwicHJvbXB0X2NvbW1hbmQiLCJwYXRyb2xsZXJfbmFtZSIsImluY2x1ZGVzIiwiZ2V0X29uX2R1dHkiLCJnZXRfc3RhdHVzIiwicHJvbXB0X2NoZWNraW4iLCJwcm9tcHRfZ3Vlc3RfcGFzcyIsInBhcnNlX2Zhc3Rfc2VjdGlvbl9hc3NpZ25tZW50IiwicHJvbXB0X21lc3NhZ2UiLCJwcm9tcHRfYnJvYWRjYXN0IiwidHlwZXMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJtYXAiLCJ4Iiwic21zX2Rlc2MiLCJzZWdtZW50cyIsImxhc3RTZWdtZW50IiwicG9wIiwiZmlyc3RQYXJ0IiwibWFwX3NlY3Rpb24iLCJzZWN0aW9uX2Rlc2NyaXB0aW9uIiwiZ2V0X3NlY3Rpb25fZGVzY3JpcHRpb24iLCJnZXRfbWVzc2FnZV9wcmVmaXgiLCJzZW5kZXJfbmFtZSIsInNlbmRlcl9waG9uZSIsImZvcm1hdHRlZF9waG9uZSIsImdldF9tYXhfbWVzc2FnZV9sZW5ndGgiLCJnZXRfbG9naW5fc2hlZXQiLCJyZWNpcGllbnRzIiwiZ2V0X29uX2R1dHlfcGF0cm9sbGVycyIsIm1heF9sZW5ndGgiLCJtZXNzYWdlX3RleHQiLCJwcmVmaXgiLCJ2YWxpZGF0aW9uIiwiYmFkX2NoYXJzIiwic2lnbmVkX2luX3BhdHJvbGxlcnMiLCJwaG9uZV9tYXAiLCJnZXRfcGhvbmVfbnVtYmVyX21hcCIsInJlY2lwaWVudF9tYXAiLCJub19waG9uZV9uYW1lcyIsInBob25lIiwic2VudF9jb3VudCIsImNvcHlfc2VudF90b19zZW5kZXIiLCJmYWlsZWRfbmFtZXMiLCJkZWxpdmVyX3Ntc190b19tYXAiLCJsb2dfYWN0aW9uIiwiYWxsX2ZhaWxlZCIsImVudHJpZXMiLCJub3JtYWxpemVkX3NlbmRlciIsInNlbmRlcl9pbl9tYXAiLCJyZWNpcGllbnRfY291bnQiLCJrZXlzIiwiZ2V0X3NoZWV0c19zZXJ2aWNlIiwib3B0cyIsInNwcmVhZHNoZWV0cyIsImdldCIsInNwcmVhZHNoZWV0SWQiLCJyYW5nZSIsInZhbHVlUmVuZGVyT3B0aW9uIiwiZGF0YSIsInJvdyIsInJhd051bWJlciIsImFzc2lnbmVkU2VjdGlvbiIsIm1hcHBlZF9zZWN0aW9uIiwicmVmcmVzaCIsInNoZWV0X2RhdGUiLCJ0b0RhdGVTdHJpbmciLCJjdXJyZW50X2RhdGUiLCJpc19jdXJyZW50IiwiZ2V0X3N0YXR1c19zdHJpbmciLCJndWVzdF9wYXNzX3Byb21pc2UiLCJnZXRfZ3Vlc3RfcGFzc19zaGVldCIsImdldF9hdmFpbGFibGVfYW5kX3VzZWRfcGFzc2VzIiwicGF0cm9sbGVyX3N0YXR1cyIsImNoZWNraW5Db2x1bW5TZXQiLCJjaGVja2VkT3V0IiwiYnlfc2hlZXRfc3RyaW5nIiwic3RhdHVzIiwidG9TdHJpbmciLCJjb21wbGV0ZWRQYXRyb2xEYXlzIiwiZ2V0X3NlYXNvbl9zaGVldCIsImdldF9wYXRyb2xsZWRfZGF5cyIsImNvbXBsZXRlZFBhdHJvbERheXNTdHJpbmciLCJsb2dpblNoZWV0RGF0ZSIsInN0YXR1c1N0cmluZyIsInVzZWRUb2RheUd1ZXN0UGFzc2VzIiwidXNlZF90b2RheSIsInVzZWRTZWFzb25HdWVzdFBhc3NlcyIsInVzZWRfc2Vhc29uIiwiYXZhaWxhYmxlR3Vlc3RQYXNzZXMiLCJhdmFpbGFibGUiLCJzaGVldF9uZWVkc19yZXNldCIsIkVycm9yIiwibmV3X2NoZWNraW5fdmFsdWUiLCJzaGVldHNfdmFsdWUiLCJmYXN0X2NoZWNraW5zIiwicmVzZXRfc2hlZXQiLCJzY3JpcHRfc2VydmljZSIsImdldF91c2VyX3NjcmlwdHNfc2VydmljZSIsInNob3VsZF9wZXJmb3JtX2FyY2hpdmUiLCJhcmNoaXZlZCIsInNjcmlwdHMiLCJydW4iLCJzY3JpcHRJZCIsInJlcXVlc3RCb2R5IiwiZnVuY3Rpb24iLCJnZXRfdXNlcl9jcmVkcyIsImxvYWRUb2tlbiIsImF1dGhVcmwiLCJnZXRBdXRoVXJsIiwiY2hlY2tlZF9vdXRfc2VjdGlvbiIsImxhc3Rfc2VjdGlvbnMiLCJvbl9kdXR5X3BhdHJvbGxlcnMiLCJieV9zZWN0aW9uIiwiZmlsdGVyIiwicmVkdWNlIiwicHJldiIsImN1ciIsInNob3J0X2NvZGUiLCJyZXN1bHRzIiwiYWxsX2tleXMiLCJvcmRlcmVkX3ByaW1hcnlfc2VjdGlvbnMiLCJzb3J0IiwiZmlsdGVyZWRfbGFzdF9zZWN0aW9ucyIsIm9yZGVyZWRfc2VjdGlvbnMiLCJjb25jYXQiLCJwYXRyb2xsZXJzIiwieSIsImxvY2FsZUNvbXBhcmUiLCJwYXRyb2xsZXJfc3RyaW5nIiwiZGV0YWlscyIsInRvVXBwZXJDYXNlIiwiciIsImFjdGlvbl9uYW1lIiwiYXBwZW5kIiwidmFsdWVJbnB1dE9wdGlvbiIsImRlbGV0ZVRva2VuIiwiZ2V0X3N5bmNfY2xpZW50Iiwic3luYyIsInYxIiwic2VydmljZXMiLCJnZXRfc2VydmljZV9jcmVkcyIsImF1dGgiLCJHb29nbGVBdXRoIiwia2V5RmlsZSIsInNjb3BlcyIsImdldF92YWxpZF9jcmVkcyIsInJlcXVpcmVfdXNlcl9jcmVkcyIsIm9hdXRoMl9jbGllbnQiLCJzaGVldHMiLCJ2ZXJzaW9uIiwic2NyaXB0IiwiZm9yY2UiLCJwaG9uZV9sb29rdXAiLCJmaW5kX3BhdHJvbGxlcl9mcm9tX251bWJlciIsIm1hcHBlZFBhdHJvbGxlciIsInRyeV9maW5kX3BhdHJvbGxlciIsInJhd19udW1iZXIiLCJjdXJyZW50TnVtYmVyIiwiY3VycmVudE5hbWUiLCJzaGVldCIsInVzZWRfYW5kX2F2YWlsYWJsZSIsImdldF9wcm9tcHQiLCJzZXRfdXNlZF9ndWVzdF9wYXNzZXMiLCJ1cGRhdGVkIiwicm93X2NvbF90b19leGNlbF9pbmRleCIsInBhcnNlX2Jvb2xlYW5fY2VsbCIsIkdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiIiwiZm9ybWF0X2RhdGVfZm9yX3NwcmVhZHNoZWV0X3ZhbHVlIiwiVXNlZEFuZEF2YWlsYWJsZVBhc3NlcyIsImluZGV4IiwiZWxpZ2libGUiLCJlbGlnaWJsZV9yZWFzb24iLCJTdHJpbmciLCJOdW1iZXIiLCJQYXNzU2hlZXQiLCJwYXRyb2xsZXJfcm93IiwiZ2V0X3NoZWV0X3Jvd19mb3JfcGF0cm9sbGVyIiwibmFtZV9jb2x1bW4iLCJlbGlnaWJsZV9jb2x1bW4iLCJlbGlnaWJsZV9yZWFzb25fY29sdW1uIiwiY3VycmVudF9kYXlfYXZhaWxhYmxlX3Bhc3NlcyIsImF2YWlsYWJsZV9jb2x1bW4iLCJjdXJyZW50X2RheV91c2VkX3Bhc3NlcyIsInVzZWRfdG9kYXlfY29sdW1uIiwiY3VycmVudF9zZWFzb25fdXNlZF9wYXNzZXMiLCJ1c2VkX3NlYXNvbl9jb2x1bW4iLCJyb3dudW0iLCJzdGFydF9pbmRleCIsInByaW9yX2xlbmd0aCIsImN1cnJlbnRfZGF0ZV9zdHJpbmciLCJuZXdfdmFscyIsInVwZGF0ZV9sZW5ndGgiLCJNYXRoIiwibWF4IiwiZW5kX2luZGV4Iiwic2hlZXRfbmFtZSIsInVwZGF0ZV92YWx1ZXMiLCJsb29rdXBfcm93X2NvbF9pbl9zaGVldCIsInNhbml0aXplX2RhdGUiLCJjaGVja2luX2NvdW50X3NoZWV0Iiwicm93cyIsImNoZWNraW5fY291bnQiLCJnZXRfdmFsdWVzIiwiaSIsInBhcnNlX3BhdHJvbGxlcl9yb3ciLCJnZXRUaW1lIiwiSlNPTiIsInN0cmluZ2lmeSIsInBhdHJvbGxlcl9zZWN0aW9uIiwibmV3X3NlY3Rpb25fdmFsdWUiLCJjYXRlZ29yeSIsImZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2N1cnJlbnRfZGF5IiwiY3VycmVudERheSIsImxvYWRfY3JlZGVudGlhbHNfZmlsZXMiLCJ2YWxpZGF0ZV9zY29wZXMiLCJkb21haW4iLCJsb2FkZWQiLCJjcmVkZW50aWFscyIsImNsaWVudF9zZWNyZXQiLCJjbGllbnRfaWQiLCJyZWRpcmVjdF91cmlzIiwid2ViIiwiT0F1dGgyIiwidG9rZW5fa2V5Iiwib2F1dGgyRG9jIiwiZG9jdW1lbnRzIiwiZmV0Y2giLCJ0b2tlbiIsInNldENyZWRlbnRpYWxzIiwic2lkIiwicmVtb3ZlIiwiY29tcGxldGVMb2dpbiIsImNvZGUiLCJnZXRUb2tlbiIsInRva2VucyIsIm9hdXRoRG9jIiwidW5pcXVlTmFtZSIsInVwZGF0ZSIsImlkIiwiZ2VuZXJhdGVSYW5kb21TdHJpbmciLCJkb2MiLCJ0dGwiLCJhY2Nlc3NfdHlwZSIsInNjb3BlIiwic3RhdGUiLCJnZW5lcmF0ZUF1dGhVcmwiLCJjaGFyYWN0ZXJzIiwiY2hhcmFjdGVyc0xlbmd0aCIsImNoYXJBdCIsImZsb29yIiwicmFuZG9tIiwibG9va3VwX3ZhbHVlcyIsIkFycmF5Iiwic21zX2Rlc2Nfc3BsaXQiLCJsb29rdXBfdmFscyIsImJ5X2x2IiwiYnlfZmMiLCJjaGVja2luVmFsdWVzIiwiY2hlY2tpblZhbHVlIiwibHYiLCJmYyIsImNoZWNraW5fbG93ZXIiLCJleGNlbF9kYXRlX3RvX2pzX2RhdGUiLCJkYXRlIiwic2V0VVRDTWlsbGlzZWNvbmRzIiwicm91bmQiLCJjaGFuZ2VfdGltZXpvbmVfdG9fcHN0IiwidG9VVENTdHJpbmciLCJzdHJpcF9kYXRldGltZV90b19kYXRlIiwidG9Mb2NhbGVEYXRlU3RyaW5nIiwidGltZVpvbmUiLCJwYWRTdGFydCIsImZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2RhdGUiLCJsaXN0IiwiZGF0ZXN0ciIsImVuZHNXaXRoIiwiZnMiLCJwYXJzZSIsInJlYWRGaWxlU3luYyIsIlJ1bnRpbWUiLCJnZXRBc3NldHMiLCJwYXRoIiwic2hlZXRfaWQiLCJfZ2V0X3ZhbHVlcyIsImxvb2t1cF9pbmRleCIsInVwZGF0ZU1lIiwibG9va3VwUmFuZ2UiLCJ1c2VkIiwidG90YWwiLCJ0b2RheSIsImZvcmNlX3RvZGF5IiwiZGVzaXJlZF9zY29wZXMiLCJkZXNpcmVkX3Njb3BlIiwiZXJyb3IiLCJzZWN0aW9ucyIsImxvd2VyY2FzZV9zZWN0aW9ucyIsImluZGV4T2YiLCJjb2wiLCJjb2xTdHJpbmciLCJtb2R1bG8iLCJjb2xMZXR0ZXIiLCJmcm9tQ2hhckNvZGUiLCJjaGFyQ29kZUF0Iiwic3BsaXRfdG9fcm93X2NvbCIsImV4Y2VsX2luZGV4IiwicmVnZXgiLCJSZWdFeHAiLCJtYXRjaCIsImV4ZWMiLCJyYXdfcm93IiwibGV0dGVycyIsImxvd2VyTGV0dGVycyIsInAiLCJjaGFyYWN0ZXJWYWx1ZSIsInZhbHVlIiwibmV3X251bWJlciIsInRlbXBvcmFyeV9uZXdfbnVtYmVyIiwicGFyc2VJbnQiLCJORVhUX1NURVBfQ09PS0lFX05BTUUiLCJoYW5kbGVyIiwiY2FsbGJhY2siLCJoYW5kbGVyX3Jlc3BvbnNlIiwic3RhY2siLCJUd2lsaW8iLCJSZXNwb25zZSIsInR3aW1sIiwiTWVzc2FnaW5nUmVzcG9uc2UiLCJzZXRCb2R5IiwiYXBwZW5kSGVhZGVyIiwic2V0Q29va2llIl0sInNvdXJjZVJvb3QiOiIifQ==