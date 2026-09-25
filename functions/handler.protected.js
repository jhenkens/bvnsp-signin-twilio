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
        return response.data.values.map((row) => {
            const rawNumber = row[(0, _utils_util__WEBPACK_IMPORTED_MODULE_8__.excel_row_to_index)(opts.PHONE_NUMBER_NUMBER_COLUMN)];
            const currentNumber = rawNumber != undefined ? (0, _utils_util__WEBPACK_IMPORTED_MODULE_8__.sanitize_phone_number)(rawNumber) : rawNumber;
            const currentName = row[(0, _utils_util__WEBPACK_IMPORTED_MODULE_8__.excel_row_to_index)(opts.PHONE_NUMBER_NAME_COLUMN)];
            return {
                name: currentName,
                number: currentNumber
            };
        }).filter((patroller) => patroller.number === number)[0];
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
    eligible;
    eligible_reason;
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
    for(var p = 0; p < lowerLetters.length; p++){
        const characterValue = lowerLetters.charCodeAt(p) - "a".charCodeAt(0) + 1;
        result = characterValue + result * 26;
    }
    return result - 1;
}
/**
 * Parse a Google Sheets checkbox/boolean cell value into a boolean.
 * Accepts the JS boolean true/false as well as the string literals "TRUE"/"FALSE"
 * (case-insensitive) that Sheets can return depending on the render option.
 * Any value that is not recognisably truthy returns false.
 * @param {any} value - The raw cell value.
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RCxNQUFNcFcsT0FBTyxDQUFDQTtJQUVkUSxRQUNJLGlEQUFpRDtLQUNoRDhWLE9BQU8sQ0FBQ0YsTUFBTTNQLFFBQVEsR0FDdkIsNERBQTREO0tBQzNEOFAsWUFBWSxDQUFDLGdCQUFnQixZQUM3QkMsU0FBUyxDQUFDWCx1QkFBdUJuVjtJQUV0QyxPQUFPcVYsU0FBUyxNQUFNdlY7QUFDMUIsRUFBRSIsInNvdXJjZXMiOlsiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9ub2RlX21vZHVsZXMvQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlcy9pbmRleC5qcyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL2Vudi9oYW5kbGVyX2NvbmZpZy50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL2hhbmRsZXJzL2J2bnNwX2hhbmRsZXIudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9zaGVldHMvZ3Vlc3RfcGFzc19zaGVldC50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3NoZWV0cy9sb2dpbl9zaGVldC50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3NoZWV0cy9zZWFzb25fc2hlZXQudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91c2VyLWNyZWRzLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvY2hlY2tpbl92YWx1ZXMudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91dGlscy9kYXRldGltZV91dGlsLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvZmlsZV91dGlscy50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3V0aWxzL2dvb2dsZV9zaGVldHNfc3ByZWFkc2hlZXRfdGFiLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvZ3Vlc3RfcGFzc2VzLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvc2NvcGVfdXRpbC50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3V0aWxzL3NlY3Rpb25fdmFsdWVzLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvdXRpbC50cyIsImV4dGVybmFsIGNvbW1vbmpzIFwiZ29vZ2xlYXBpc1wiIiwiZXh0ZXJuYWwgY29tbW9uanMgXCJzbXMtc2VnbWVudHMtY2FsY3VsYXRvclwiIiwiZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImZzXCIiLCJ3ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9oYW5kbGVycy9oYW5kbGVyLnByb3RlY3RlZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJbnRlbnRpb25hbGx5IGxlZnQgZW1wdHlcbiIsImltcG9ydCB7IENoZWNraW5WYWx1ZSB9IGZyb20gXCIuLi91dGlscy9jaGVja2luX3ZhbHVlc1wiO1xuXG4vKipcbiAqIEVudmlyb25tZW50IGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBoYW5kbGVyLlxuICogPHA+XG4gKiBOb3RlOiBUaGVzZSBhcmUgdGhlIG9ubHkgc2VjcmV0IHZhbHVlcyB3ZSBuZWVkIHRvIHJlYWQuIFJlc3QgY2FuIGJlIGRlcGxveWVkLlxuICogQHR5cGVkZWYge09iamVjdH0gSGFuZGxlckVudmlyb25tZW50XG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0NSSVBUX0lEIC0gVGhlIElEIG9mIHRoZSBHb29nbGUgQXBwcyBTY3JpcHQgcHJvamVjdC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTWU5DX1NJRCAtIFRoZSBTSUQgb2YgdGhlIFR3aWxpbyBTeW5jIHNlcnZpY2UuXG4gKi9cbnR5cGUgSGFuZGxlckVudmlyb25tZW50ID0ge1xuICAgIFNIRUVUX0lEOiBzdHJpbmc7XG4gICAgU0NSSVBUX0lEOiBzdHJpbmc7XG4gICAgU1lOQ19TSUQ6IHN0cmluZztcbn07XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgdXNlciBjcmVkZW50aWFscy5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IFVzZXJDcmVkc0NvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsfSBOU1BfRU1BSUxfRE9NQUlOIC0gVGhlIGVtYWlsIGRvbWFpbiBmb3IgTlNQLlxuICovXG50eXBlIFVzZXJDcmVkc0NvbmZpZyA9IHtcbiAgICBOU1BfRU1BSUxfRE9NQUlOOiBzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsO1xufTtcbmNvbnN0IHVzZXJfY3JlZHNfY29uZmlnOiBVc2VyQ3JlZHNDb25maWcgPSB7XG4gICAgTlNQX0VNQUlMX0RPTUFJTjogXCJmYXJ3ZXN0Lm9yZ1wiLFxufTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciBmaW5kaW5nIGEgcGF0cm9sbGVyLlxuICogQHR5cGVkZWYge09iamVjdH0gRmluZFBhdHJvbGxlckNvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFNIRUVUX0lEIC0gVGhlIElEIG9mIHRoZSBHb29nbGUgU2hlZXRzIHNwcmVhZHNoZWV0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFBIT05FX05VTUJFUl9MT09LVVBfU0hFRVQgLSBUaGUgcmFuZ2UgZm9yIHBob25lIG51bWJlciBsb29rdXAuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gUEhPTkVfTlVNQkVSX05VTUJFUl9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBwaG9uZSBudW1iZXJzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFBIT05FX05VTUJFUl9OQU1FX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIG5hbWVzLlxuICovXG50eXBlIEZpbmRQYXRyb2xsZXJDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICBQSE9ORV9OVU1CRVJfTE9PS1VQX1NIRUVUOiBzdHJpbmc7XG4gICAgUEhPTkVfTlVNQkVSX05VTUJFUl9DT0xVTU46IHN0cmluZztcbiAgICBQSE9ORV9OVU1CRVJfTkFNRV9DT0xVTU46IHN0cmluZztcbn07XG5cbmNvbnN0IGZpbmRfcGF0cm9sbGVyX2NvbmZpZzogRmluZFBhdHJvbGxlckNvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogXCJ0ZXN0XCIsXG4gICAgUEhPTkVfTlVNQkVSX0xPT0tVUF9TSEVFVDogXCJQaG9uZSBOdW1iZXJzIUEyOkIxMDBcIixcbiAgICBQSE9ORV9OVU1CRVJfTkFNRV9DT0xVTU46IFwiQVwiLFxuICAgIFBIT05FX05VTUJFUl9OVU1CRVJfQ09MVU1OOiBcIkJcIixcbn07XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgdGhlIGxvZ2luIHNoZWV0LlxuICogQHR5cGVkZWYge09iamVjdH0gTG9naW5TaGVldENvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFNIRUVUX0lEIC0gVGhlIElEIG9mIHRoZSBHb29nbGUgU2hlZXRzIHNwcmVhZHNoZWV0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IExPR0lOX1NIRUVUX0xPT0tVUCAtIFRoZSByYW5nZSBmb3IgbG9naW4gc2hlZXQgbG9va3VwLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IENIRUNLSU5fQ09VTlRfTE9PS1VQIC0gVGhlIHJhbmdlIGZvciBjaGVjay1pbiBjb3VudCBsb29rdXAuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQVJDSElWRURfQ0VMTCAtIFRoZSBjZWxsIGZvciBhcmNoaXZlZCBkYXRhLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNIRUVUX0RBVEVfQ0VMTCAtIFRoZSBjZWxsIGZvciB0aGUgc2hlZXQgZGF0ZS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDVVJSRU5UX0RBVEVfQ0VMTCAtIFRoZSBjZWxsIGZvciB0aGUgY3VycmVudCBkYXRlLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IE5BTUVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgbmFtZXMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQ0FURUdPUllfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgY2F0ZWdvcmllcy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTRUNUSU9OX0RST1BET1dOX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIHNlY3Rpb24gZHJvcGRvd24uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBjaGVjay1pbiBkcm9wZG93bi5cbiAqL1xudHlwZSBMb2dpblNoZWV0Q29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBzdHJpbmc7XG4gICAgTE9HSU5fU0hFRVRfTE9PS1VQOiBzdHJpbmc7XG4gICAgQ0hFQ0tJTl9DT1VOVF9MT09LVVA6IHN0cmluZztcbiAgICBBUkNISVZFRF9DRUxMOiBzdHJpbmc7XG4gICAgU0hFRVRfREFURV9DRUxMOiBzdHJpbmc7XG4gICAgQ1VSUkVOVF9EQVRFX0NFTEw6IHN0cmluZztcbiAgICBOQU1FX0NPTFVNTjogc3RyaW5nO1xuICAgIENBVEVHT1JZX0NPTFVNTjogc3RyaW5nO1xuICAgIFNFQ1RJT05fRFJPUERPV05fQ09MVU1OOiBzdHJpbmc7XG4gICAgQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU46IHN0cmluZztcbn07XG5cbmNvbnN0IGxvZ2luX3NoZWV0X2NvbmZpZzogTG9naW5TaGVldENvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogXCJ0ZXN0XCIsXG4gICAgTE9HSU5fU0hFRVRfTE9PS1VQOiBcIkxvZ2luIUExOkkxMDBcIixcbiAgICBDSEVDS0lOX0NPVU5UX0xPT0tVUDogXCJUb29scyFHMjpHMlwiLFxuICAgIFNIRUVUX0RBVEVfQ0VMTDogXCJCMVwiLFxuICAgIENVUlJFTlRfREFURV9DRUxMOiBcIkIyXCIsXG4gICAgQVJDSElWRURfQ0VMTDogXCJIMVwiLFxuICAgIE5BTUVfQ09MVU1OOiBcIkFcIixcbiAgICBDQVRFR09SWV9DT0xVTU46IFwiQlwiLFxuICAgIFNFQ1RJT05fRFJPUERPV05fQ09MVU1OOiBcIkhcIixcbiAgICBDSEVDS0lOX0RST1BET1dOX0NPTFVNTjogXCJJXCIsXG59O1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIHRoZSBzZWFzb24gc2hlZXQuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBTZWFzb25TaGVldENvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFNIRUVUX0lEIC0gVGhlIElEIG9mIHRoZSBHb29nbGUgU2hlZXRzIHNwcmVhZHNoZWV0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNFQVNPTl9TSEVFVCAtIFRoZSBuYW1lIG9mIHRoZSBzZWFzb24gc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0VBU09OX1NIRUVUX0RBWVNfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3Igc2Vhc29uIHNoZWV0IGRheXMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0VBU09OX1NIRUVUX05BTUVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3Igc2Vhc29uIHNoZWV0IG5hbWVzLlxuICovXG50eXBlIFNlYXNvblNoZWV0Q29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBzdHJpbmc7XG4gICAgU0VBU09OX1NIRUVUOiBzdHJpbmc7XG4gICAgU0VBU09OX1NIRUVUX0RBWVNfQ09MVU1OOiBzdHJpbmc7XG4gICAgU0VBU09OX1NIRUVUX05BTUVfQ09MVU1OOiBzdHJpbmc7XG59O1xuY29uc3Qgc2Vhc29uX3NoZWV0X2NvbmZpZzogU2Vhc29uU2hlZXRDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IFwidGVzdFwiLFxuICAgIFNFQVNPTl9TSEVFVDogXCJTZWFzb25cIixcbiAgICBTRUFTT05fU0hFRVRfTkFNRV9DT0xVTU46IFwiQlwiLFxuICAgIFNFQVNPTl9TSEVFVF9EQVlTX0NPTFVNTjogXCJBXCIsXG59O1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIHNlY3Rpb25zLlxuICogQHR5cGVkZWYge09iamVjdH0gU2VjdGlvbkNvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFNFQ1RJT05fVkFMVUVTIC0gVGhlIHNlY3Rpb24gdmFsdWVzLlxuICovXG50eXBlIFNlY3Rpb25Db25maWcgPSB7XG4gICAgU0VDVElPTl9WQUxVRVM6IHN0cmluZztcbn07XG5jb25zdCBzZWN0aW9uX2NvbmZpZzogU2VjdGlvbkNvbmZpZyA9IHtcbiAgICBTRUNUSU9OX1ZBTFVFUzogIFwiMSwyLDMsNCxSb3ZpbmcsRkFSLFRyYWluaW5nXCIsXG59O1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIGd1ZXN0IHBhc3Nlcy5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IEd1ZXN0UGFzc2VzQ29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gR1VFU1RfUEFTU19TSEVFVCAtIFRoZSBuYW1lIG9mIHRoZSBndWVzdCBwYXNzIHNoZWV0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IEdVRVNUX1BBU1NfRUxJR0lCTEVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgdGhlIGVsaWdpYmlsaXR5IGNoZWNrYm94IChUUlVFL0ZBTFNFKS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBHVUVTVF9QQVNTX0VMSUdJQkxFX1JFQVNPTl9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciB0aGUgaW5lbGlnaWJpbGl0eSByZWFzb24gc3RyaW5nLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IEdVRVNUX1BBU1NfU0hFRVRfQVZBSUxBQkxFX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIGF2YWlsYWJsZSBwYXNzIGNvdW50LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IEdVRVNUX1BBU1NfU0hFRVRfVVNFRF9UT0RBWV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBwYXNzZXMgdXNlZCB0b2RheS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBHVUVTVF9QQVNTX1NIRUVUX1VTRURfU0VBU09OX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIHBhc3NlcyB1c2VkIHRoaXMgc2Vhc29uLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IEdVRVNUX1BBU1NfU0hFRVRfREFURVNfU1RBUlRJTkdfQ09MVU1OIC0gVGhlIGNvbHVtbiB3aGVyZSBkYXRlLW9mLXVzZSBlbnRyaWVzIGJlZ2luLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IEdVRVNUX1BBU1NfU0hFRVRfTkFNRV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBwYXRyb2xsZXIgbmFtZXMuXG4gKi9cbnR5cGUgR3Vlc3RQYXNzZXNDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICBHVUVTVF9QQVNTX1NIRUVUOiBzdHJpbmc7XG4gICAgR1VFU1RfUEFTU19FTElHSUJMRV9DT0xVTU46IHN0cmluZztcbiAgICBHVUVTVF9QQVNTX0VMSUdJQkxFX1JFQVNPTl9DT0xVTU46IHN0cmluZztcbiAgICBHVUVTVF9QQVNTX1NIRUVUX0FWQUlMQUJMRV9DT0xVTU46IHN0cmluZztcbiAgICBHVUVTVF9QQVNTX1NIRUVUX1VTRURfVE9EQVlfQ09MVU1OOiBzdHJpbmc7XG4gICAgR1VFU1RfUEFTU19TSEVFVF9VU0VEX1NFQVNPTl9DT0xVTU46IHN0cmluZztcbiAgICBHVUVTVF9QQVNTX1NIRUVUX0RBVEVTX1NUQVJUSU5HX0NPTFVNTjogc3RyaW5nO1xuICAgIEdVRVNUX1BBU1NfU0hFRVRfTkFNRV9DT0xVTU46IHN0cmluZztcbn07XG5jb25zdCBndWVzdF9wYXNzZXNfY29uZmlnOiBHdWVzdFBhc3Nlc0NvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogXCJ0ZXN0XCIsXG4gICAgR1VFU1RfUEFTU19TSEVFVDogXCJHdWVzdFBhc3Nlc1wiLFxuICAgIEdVRVNUX1BBU1NfRUxJR0lCTEVfQ09MVU1OOiBcIkJcIixcbiAgICBHVUVTVF9QQVNTX0VMSUdJQkxFX1JFQVNPTl9DT0xVTU46IFwiQ1wiLFxuICAgIEdVRVNUX1BBU1NfU0hFRVRfTkFNRV9DT0xVTU46IFwiQVwiLFxuICAgIEdVRVNUX1BBU1NfU0hFRVRfQVZBSUxBQkxFX0NPTFVNTjogXCJEXCIsXG4gICAgR1VFU1RfUEFTU19TSEVFVF9VU0VEX1RPREFZX0NPTFVNTjogXCJFXCIsXG4gICAgR1VFU1RfUEFTU19TSEVFVF9VU0VEX1NFQVNPTl9DT0xVTU46IFwiRlwiLFxuICAgIEdVRVNUX1BBU1NfU0hFRVRfREFURVNfU1RBUlRJTkdfQ09MVU1OOiBcIkdcIixcbn07XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgdGhlIGhhbmRsZXIuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBIYW5kbGVyQ29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0NSSVBUX0lEIC0gVGhlIElEIG9mIHRoZSBHb29nbGUgQXBwcyBTY3JpcHQgcHJvamVjdC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTSEVFVF9JRCAtIFRoZSBJRCBvZiB0aGUgR29vZ2xlIFNoZWV0cyBzcHJlYWRzaGVldC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTWU5DX1NJRCAtIFRoZSBTSUQgb2YgdGhlIFR3aWxpbyBTeW5jIHNlcnZpY2UuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gUkVTRVRfRlVOQ1RJT05fTkFNRSAtIFRoZSBuYW1lIG9mIHRoZSByZXNldCBmdW5jdGlvbi5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBBUkNISVZFX0ZVTkNUSU9OX05BTUUgLSBUaGUgbmFtZSBvZiB0aGUgYXJjaGl2ZSBmdW5jdGlvbi5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gVVNFX1NFUlZJQ0VfQUNDT1VOVCAtIFdoZXRoZXIgdG8gdXNlIGEgc2VydmljZSBhY2NvdW50LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IEFDVElPTl9MT0dfU0hFRVQgLSBUaGUgbmFtZSBvZiB0aGUgYWN0aW9uIGxvZyBzaGVldC5cbiAqIEBwcm9wZXJ0eSB7Q2hlY2tpblZhbHVlW119IENIRUNLSU5fVkFMVUVTIC0gVGhlIGNoZWNrLWluIHZhbHVlcy5cbiAqL1xudHlwZSBIYW5kbGVyQ29uZmlnID0ge1xuICAgIFNDUklQVF9JRDogc3RyaW5nO1xuICAgIFNIRUVUX0lEOiBzdHJpbmc7XG4gICAgU1lOQ19TSUQ6IHN0cmluZztcbiAgICBSRVNFVF9GVU5DVElPTl9OQU1FOiBzdHJpbmc7XG4gICAgQVJDSElWRV9GVU5DVElPTl9OQU1FOiBzdHJpbmc7XG4gICAgVVNFX1NFUlZJQ0VfQUNDT1VOVDogYm9vbGVhbjtcbiAgICBBQ1RJT05fTE9HX1NIRUVUOiBzdHJpbmc7XG4gICAgQ0hFQ0tJTl9WQUxVRVM6IENoZWNraW5WYWx1ZVtdO1xufTtcbmNvbnN0IGhhbmRsZXJfY29uZmlnOiBIYW5kbGVyQ29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBcInRlc3RcIixcbiAgICBTQ1JJUFRfSUQ6IFwidGVzdFwiLFxuICAgIFNZTkNfU0lEOiBcInRlc3RcIixcbiAgICBBUkNISVZFX0ZVTkNUSU9OX05BTUU6IFwiQXJjaGl2ZVwiLFxuICAgIFJFU0VUX0ZVTkNUSU9OX05BTUU6IFwiUmVzZXRcIixcbiAgICBVU0VfU0VSVklDRV9BQ0NPVU5UOiB0cnVlLFxuICAgIEFDVElPTl9MT0dfU0hFRVQ6IFwiQm90X1VzYWdlXCIsXG4gICAgQ0hFQ0tJTl9WQUxVRVM6IFtcbiAgICAgICAgbmV3IENoZWNraW5WYWx1ZShcImRheVwiLCBcIkFsbCBEYXlcIiwgXCJhbGwgZGF5L0RBWVwiLCBbXCJjaGVja2luLWRheVwiXSksXG4gICAgICAgIG5ldyBDaGVja2luVmFsdWUoXCJhbVwiLCBcIkhhbGYgQU1cIiwgXCJtb3JuaW5nL0FNXCIsIFtcImNoZWNraW4tYW1cIl0pLFxuICAgICAgICBuZXcgQ2hlY2tpblZhbHVlKFwicG1cIiwgXCJIYWxmIFBNXCIsIFwiYWZ0ZXJub29uL1BNXCIsIFtcImNoZWNraW4tcG1cIl0pLFxuICAgICAgICBuZXcgQ2hlY2tpblZhbHVlKFwib3V0XCIsIFwiQ2hlY2tlZCBPdXRcIiwgXCJjaGVjayBvdXQvT1VUXCIsIFtcImNoZWNrb3V0XCIsIFwiY2hlY2stb3V0XCJdKSxcbiAgICBdLFxufTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciBwYXRyb2xsZXIgcm93cy5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IFBhdHJvbGxlclJvd0NvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IE5BTUVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgbmFtZXMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQ0FURUdPUllfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgY2F0ZWdvcmllcy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTRUNUSU9OX0RST1BET1dOX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIHNlY3Rpb24gZHJvcGRvd24uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBjaGVjay1pbiBkcm9wZG93bi5cbiAqL1xudHlwZSBQYXRyb2xsZXJSb3dDb25maWcgPSB7XG4gICAgTkFNRV9DT0xVTU46IHN0cmluZztcbiAgICBDQVRFR09SWV9DT0xVTU46IHN0cmluZztcbiAgICBTRUNUSU9OX0RST1BET1dOX0NPTFVNTjogc3RyaW5nO1xuICAgIENIRUNLSU5fRFJPUERPV05fQ09MVU1OOiBzdHJpbmc7XG59O1xuXG4vKipcbiAqIENvbWJpbmVkIGNvbmZpZ3VyYXRpb24gdHlwZS5cbiAqIEB0eXBlZGVmIHtIYW5kbGVyRW52aXJvbm1lbnQgJiBVc2VyQ3JlZHNDb25maWcgJiBGaW5kUGF0cm9sbGVyQ29uZmlnICYgTG9naW5TaGVldENvbmZpZyAmIFNlYXNvblNoZWV0Q29uZmlnICYgU2VjdGlvbkNvbmZpZyAmIEd1ZXN0UGFzc2VzQ29uZmlnICYgSGFuZGxlckNvbmZpZyAmIFBhdHJvbGxlclJvd0NvbmZpZ30gQ29tYmluZWRDb25maWdcbiAqL1xudHlwZSBDb21iaW5lZENvbmZpZyA9IEhhbmRsZXJFbnZpcm9ubWVudCAmXG4gICAgVXNlckNyZWRzQ29uZmlnICZcbiAgICBGaW5kUGF0cm9sbGVyQ29uZmlnICZcbiAgICBMb2dpblNoZWV0Q29uZmlnICZcbiAgICBTZWFzb25TaGVldENvbmZpZyAmXG4gICAgU2VjdGlvbkNvbmZpZyAmXG4gICAgR3Vlc3RQYXNzZXNDb25maWcgJlxuICAgIEhhbmRsZXJDb25maWcgJlxuICAgIFBhdHJvbGxlclJvd0NvbmZpZztcblxuY29uc3QgQ09ORklHOiBDb21iaW5lZENvbmZpZyA9IHtcbiAgICAuLi5oYW5kbGVyX2NvbmZpZyxcbiAgICAuLi5maW5kX3BhdHJvbGxlcl9jb25maWcsXG4gICAgLi4ubG9naW5fc2hlZXRfY29uZmlnLFxuICAgIC4uLmd1ZXN0X3Bhc3Nlc19jb25maWcsXG4gICAgLi4uc2Vhc29uX3NoZWV0X2NvbmZpZyxcbiAgICAuLi51c2VyX2NyZWRzX2NvbmZpZyxcbiAgICAuLi5zZWN0aW9uX2NvbmZpZyxcbn07XG5cbmV4cG9ydCB7XG4gICAgQ09ORklHLFxuICAgIENvbWJpbmVkQ29uZmlnLFxuICAgIFNlY3Rpb25Db25maWcsXG4gICAgR3Vlc3RQYXNzZXNDb25maWcsXG4gICAgRmluZFBhdHJvbGxlckNvbmZpZyxcbiAgICBIYW5kbGVyQ29uZmlnLFxuICAgIEhhbmRsZXJFbnZpcm9ubWVudCxcbiAgICBVc2VyQ3JlZHNDb25maWcsXG4gICAgTG9naW5TaGVldENvbmZpZyxcbiAgICBTZWFzb25TaGVldENvbmZpZyxcbiAgICBQYXRyb2xsZXJSb3dDb25maWcsXG59OyIsImltcG9ydCBcIkB0d2lsaW8tbGFicy9zZXJ2ZXJsZXNzLXJ1bnRpbWUtdHlwZXNcIjtcbmltcG9ydCB7XG4gICAgQ29udGV4dCxcbiAgICBTZXJ2ZXJsZXNzRXZlbnRPYmplY3QsXG4gICAgU2VydmljZUNvbnRleHQsXG4gICAgVHdpbGlvQ2xpZW50LFxufSBmcm9tIFwiQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlcy90eXBlc1wiO1xuaW1wb3J0IHtnb29nbGUsIHNjcmlwdF92MSwgc2hlZXRzX3Y0fSBmcm9tIFwiZ29vZ2xlYXBpc1wiO1xuaW1wb3J0IHtHb29nbGVBdXRofSBmcm9tIFwiZ29vZ2xlYXBpcy1jb21tb25cIjtcbmltcG9ydCB7XG4gICAgQ09ORklHLFxuICAgIENvbWJpbmVkQ29uZmlnLFxuICAgIEd1ZXN0UGFzc2VzQ29uZmlnLFxuICAgIEZpbmRQYXRyb2xsZXJDb25maWcsXG4gICAgSGFuZGxlckNvbmZpZyxcbiAgICBIYW5kbGVyRW52aXJvbm1lbnQsXG4gICAgTG9naW5TaGVldENvbmZpZyxcbiAgICBTZWFzb25TaGVldENvbmZpZyxcbn0gZnJvbSBcIi4uL2Vudi9oYW5kbGVyX2NvbmZpZ1wiO1xuaW1wb3J0IExvZ2luU2hlZXQsIHtQYXRyb2xsZXJSb3d9IGZyb20gXCIuLi9zaGVldHMvbG9naW5fc2hlZXRcIjtcbmltcG9ydCBTZWFzb25TaGVldCBmcm9tIFwiLi4vc2hlZXRzL3NlYXNvbl9zaGVldFwiO1xuaW1wb3J0IHtVc2VyQ3JlZHN9IGZyb20gXCIuLi91c2VyLWNyZWRzXCI7XG5pbXBvcnQge0NoZWNraW5WYWx1ZXN9IGZyb20gXCIuLi91dGlscy9jaGVja2luX3ZhbHVlc1wiO1xuaW1wb3J0IHtnZXRfc2VydmljZV9jcmVkZW50aWFsc19wYXRofSBmcm9tIFwiLi4vdXRpbHMvZmlsZV91dGlsc1wiO1xuaW1wb3J0IHtleGNlbF9yb3dfdG9faW5kZXgsIHNhbml0aXplX3Bob25lX251bWJlcn0gZnJvbSBcIi4uL3V0aWxzL3V0aWxcIjtcbmltcG9ydCB7YnVpbGRfcGFzc2VzX3N0cmluZyx9IGZyb20gXCIuLi91dGlscy9ndWVzdF9wYXNzZXNcIjtcbmltcG9ydCB7R3Vlc3RQYXNzU2hlZXR9IGZyb20gXCIuLi9zaGVldHMvZ3Vlc3RfcGFzc19zaGVldFwiO1xuaW1wb3J0IHtTZWN0aW9uVmFsdWVzfSBmcm9tICcuLi91dGlscy9zZWN0aW9uX3ZhbHVlcyc7XG5cbmV4cG9ydCB0eXBlIEJWTlNQUmVzcG9uc2UgPSB7XG4gICAgcmVzcG9uc2U/OiBzdHJpbmc7XG4gICAgbmV4dF9zdGVwPzogc3RyaW5nO1xufTtcbmV4cG9ydCB0eXBlIEJWTlNQRXZlbnQgPSBTZXJ2ZXJsZXNzRXZlbnRPYmplY3Q8XG4gICAge1xuICAgICAgICBGcm9tOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgICAgIFRvOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgICAgIG51bWJlcjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgICB0ZXN0X251bWJlcjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgICBCb2R5OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgfSxcbiAgICB7fSxcbiAgICB7XG4gICAgICAgIGJ2bnNwX25leHRfc3RlcDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIH1cbj47XG5cbmV4cG9ydCBjb25zdCBORVhUX1NURVBTID0ge1xuICAgIEFXQUlUX0NPTU1BTkQ6IFwiYXdhaXQtY29tbWFuZFwiLFxuICAgIEFXQUlUX0NIRUNLSU46IFwiYXdhaXQtY2hlY2tpblwiLFxuICAgIENPTkZJUk1fUkVTRVQ6IFwiY29uZmlybS1yZXNldFwiLFxuICAgIEFVVEhfUkVTRVQ6IFwiYXV0aC1yZXNldFwiLFxuICAgIEFXQUlUX1NFQ1RJT046IFwiYXdhaXQtc2VjdGlvblwiLFxuICAgIEFXQUlUX1BBU1M6IFwiYXdhaXQtcGFzc1wiLFxuICAgIEFXQUlUX01FU1NBR0U6IFwiYXdhaXQtbWVzc2FnZVwiLFxuICAgIEFXQUlUX0JST0FEQ0FTVDogXCJhd2FpdC1icm9hZGNhc3RcIixcbn07XG5cbmNvbnN0IENPTU1BTkRTID0ge1xuICAgIE9OX0RVVFk6IFtcIm9uZHV0eVwiLCBcIm9uLWR1dHlcIl0sXG4gICAgU1RBVFVTOiBbXCJzdGF0dXNcIl0sXG4gICAgQ0hFQ0tJTjogW1wiY2hlY2tpblwiLCBcImNoZWNrLWluXCJdLFxuICAgIFNFQ1RJT05fQVNTSUdOTUVOVDogW1wic2VjdGlvblwiLCBcInNlY3Rpb24tYXNzaWdubWVudFwiLCBcInNlY3Rpb25hc3NpZ25tZW50XCIsIFwiYXNzaWdubWVudFwiXSxcbiAgICBHVUVTVF9QQVNTOiBbXCJndWVzdC1wYXNzXCIsIFwiZ3Vlc3RwYXNzXCIsIFwiZ3Vlc3RcIl0sXG4gICAgV0hBVFNBUFA6IFtcIndoYXRzYXBwXCJdLFxuICAgIE1FU1NBR0U6IFtcIm1lc3NhZ2VcIiwgXCJtc2dcIl0sXG4gICAgQlJPQURDQVNUOiBbXCJicm9hZGNhc3RcIl0sXG59O1xuXG5leHBvcnQgY29uc3QgU01TX01BWF9MRU5HVEggPSAxNjA7XG5leHBvcnQgY29uc3QgTUVTU0FHRV9QUkVGSVhfVEVNUExBVEUgPSBcIk1lc3NhZ2UgZnJvbSBcIjtcbmV4cG9ydCBjb25zdCBNRVNTQUdFX1BSRUZJWF9TVUZGSVggPSBcIjogXCI7XG5cbi8qKlxuICogUmVzdWx0IG9mIHZhbGlkYXRpbmcgYW4gU01TIG1lc3NhZ2UgZm9yIEdTTS03IGNvbXBhdGliaWxpdHkgYW5kIHNlZ21lbnQgY291bnQuXG4gKi9cbmV4cG9ydCB0eXBlIFNtc1ZhbGlkYXRpb25SZXN1bHQgPSB7XG4gICAgLyoqIFdoZXRoZXIgdGhlIG1lc3NhZ2UgaXMgdmFsaWQgKEdTTS03IG9ubHkgYW5kIGZpdHMgaW4gYSBzaW5nbGUgc2VnbWVudCkuICovXG4gICAgdmFsaWQ6IGJvb2xlYW47XG4gICAgLyoqIElmIGludmFsaWQsIHRoZSByZWFzb246ICdub25fZ3NtNycgb3IgJ3Rvb19tYW55X3NlZ21lbnRzJy4gKi9cbiAgICByZWFzb24/OiBcIm5vbl9nc203XCIgfCBcInRvb19tYW55X3NlZ21lbnRzXCI7XG4gICAgLyoqIFRoZSBub24tR1NNLTcgY2hhcmFjdGVycyBmb3VuZCwgaWYgYW55LiAqL1xuICAgIG5vbl9nc21fY2hhcmFjdGVycz86IHN0cmluZ1tdO1xuICAgIC8qKiBUaGUgbnVtYmVyIG9mIFNNUyBzZWdtZW50cyB0aGUgbWVzc2FnZSB3b3VsZCByZXF1aXJlLiAqL1xuICAgIHNlZ21lbnRzX2NvdW50PzogbnVtYmVyO1xufTtcblxuLyoqXG4gKiBWYWxpZGF0ZXMgdGhhdCBhIGNvbXBsZXRlIFNNUyBtZXNzYWdlIChwcmVmaXggKyBib2R5KSB1c2VzIG9ubHkgR1NNLTcgY2hhcmFjdGVyc1xuICogYW5kIGZpdHMgd2l0aGluIGEgc2luZ2xlIFNNUyBzZWdtZW50LlxuICpcbiAqIFVzZXMgdGhlIHNtcy1zZWdtZW50cy1jYWxjdWxhdG9yIGxpYnJhcnkgKG1haW50YWluZWQgYnkgVHdpbGlvRGV2RWQpIHdoaWNoXG4gKiBwcm92aWRlcyBhdXRob3JpdGF0aXZlIEdTTS03IGNoYXJhY3RlciBkZXRlY3Rpb24uXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZ1bGxfbWVzc2FnZSAtIFRoZSBjb21wbGV0ZSBtZXNzYWdlIHRvIHZhbGlkYXRlIChwcmVmaXggKyB1c2VyIHRleHQpLlxuICogQHJldHVybnMge1Ntc1ZhbGlkYXRpb25SZXN1bHR9IFRoZSB2YWxpZGF0aW9uIHJlc3VsdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlX3Ntc19tZXNzYWdlKGZ1bGxfbWVzc2FnZTogc3RyaW5nKTogU21zVmFsaWRhdGlvblJlc3VsdCB7XG4gICAgY29uc3QgeyBTZWdtZW50ZWRNZXNzYWdlIH0gPSByZXF1aXJlKFwic21zLXNlZ21lbnRzLWNhbGN1bGF0b3JcIik7XG4gICAgY29uc3Qgc2VnbWVudGVkID0gbmV3IFNlZ21lbnRlZE1lc3NhZ2UoZnVsbF9tZXNzYWdlKTtcbiAgICBjb25zdCBub25fZ3NtID0gc2VnbWVudGVkLmdldE5vbkdzbUNoYXJhY3RlcnMoKSBhcyBzdHJpbmdbXTtcblxuICAgIGlmIChub25fZ3NtLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgICAgICAgIHJlYXNvbjogXCJub25fZ3NtN1wiLFxuICAgICAgICAgICAgbm9uX2dzbV9jaGFyYWN0ZXJzOiBbLi4ubmV3IFNldChub25fZ3NtKV0sXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKHNlZ21lbnRlZC5zZWdtZW50c0NvdW50ID4gMSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsaWQ6IGZhbHNlLFxuICAgICAgICAgICAgcmVhc29uOiBcInRvb19tYW55X3NlZ21lbnRzXCIsXG4gICAgICAgICAgICBzZWdtZW50c19jb3VudDogc2VnbWVudGVkLnNlZ21lbnRzQ291bnQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgdmFsaWQ6IHRydWUgfTtcbn1cblxuLyoqXG4gKiBGb3JtYXRzIGEgMTAtZGlnaXQgcGhvbmUgbnVtYmVyIHN0cmluZyBhcyAoWFhYKVhYWC1YWFhYIGZvciBkaXNwbGF5LlxuICogQHBhcmFtIHtzdHJpbmd9IHRlbl9kaWdpdHMgLSBBIDEwLWRpZ2l0IHBob25lIG51bWJlciBzdHJpbmcgKGUuZy4gXCIxMjM0NTY3ODkwXCIpLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCBwaG9uZSBudW1iZXIgKGUuZy4gXCIoMTIzKTQ1Ni03ODkwXCIpLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0X3Bob25lX2Zvcl9kaXNwbGF5KHRlbl9kaWdpdHM6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAoJHt0ZW5fZGlnaXRzLnN1YnN0cmluZygwLCAzKX0pJHt0ZW5fZGlnaXRzLnN1YnN0cmluZygzLCA2KX0tJHt0ZW5fZGlnaXRzLnN1YnN0cmluZyg2LCAxMCl9YDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQlZOU1BIYW5kbGVyIHtcbiAgICBTQ09QRVM6IHN0cmluZ1tdID0gW1wiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9zcHJlYWRzaGVldHNcIl07XG5cbiAgICBzbXNfcmVxdWVzdDogYm9vbGVhbjtcbiAgICByZXN1bHRfbWVzc2FnZXM6IHN0cmluZ1tdID0gW107XG4gICAgZnJvbTogc3RyaW5nO1xuICAgIHRvOiBzdHJpbmc7XG4gICAgYm9keTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIGJvZHlfcmF3OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgcGF0cm9sbGVyOiBQYXRyb2xsZXJSb3cgfCBudWxsO1xuICAgIGJ2bnNwX25leHRfc3RlcDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIGNoZWNraW5fbW9kZTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gICAgZmFzdF9jaGVja2luOiBib29sZWFuID0gZmFsc2U7XG4gICAgYXNzaWduZWRfc2VjdGlvbjogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgICB0d2lsaW9fY2xpZW50OiBUd2lsaW9DbGllbnQgfCBudWxsID0gbnVsbDtcbiAgICBzeW5jX3NpZDogc3RyaW5nO1xuICAgIHJlc2V0X3NjcmlwdF9pZDogc3RyaW5nO1xuXG4gICAgLy8gQ2FjaGUgY2xpZW50c1xuICAgIHN5bmNfY2xpZW50OiBTZXJ2aWNlQ29udGV4dCB8IG51bGwgPSBudWxsO1xuICAgIHVzZXJfY3JlZHM6IFVzZXJDcmVkcyB8IG51bGwgPSBudWxsO1xuICAgIHNlcnZpY2VfY3JlZHM6IEdvb2dsZUF1dGggfCBudWxsID0gbnVsbDtcbiAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyB8IG51bGwgPSBudWxsO1xuICAgIHVzZXJfc2NyaXB0c19zZXJ2aWNlOiBzY3JpcHRfdjEuU2NyaXB0IHwgbnVsbCA9IG51bGw7XG5cbiAgICBsb2dpbl9zaGVldDogTG9naW5TaGVldCB8IG51bGwgPSBudWxsO1xuICAgIHNlYXNvbl9zaGVldDogU2Vhc29uU2hlZXQgfCBudWxsID0gbnVsbDtcbiAgICBndWVzdF9wYXNzX3NoZWV0OiBHdWVzdFBhc3NTaGVldCB8IG51bGwgPSBudWxsO1xuXG4gICAgY2hlY2tpbl92YWx1ZXM6IENoZWNraW5WYWx1ZXM7XG4gICAgY3VycmVudF9zaGVldF9kYXRlOiBEYXRlO1xuXG4gICAgY29tYmluZWRfY29uZmlnOiBDb21iaW5lZENvbmZpZztcbiAgICBjb25maWc6IEhhbmRsZXJDb25maWc7XG5cbiAgICBzZWN0aW9uX3ZhbHVlczogU2VjdGlvblZhbHVlcztcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgYSBuZXcgQlZOU1BIYW5kbGVyLlxuICAgICAqIEBwYXJhbSB7Q29udGV4dDxIYW5kbGVyRW52aXJvbm1lbnQ+fSBjb250ZXh0IC0gVGhlIHNlcnZlcmxlc3MgZnVuY3Rpb24gY29udGV4dC5cbiAgICAgKiBAcGFyYW0ge1NlcnZlcmxlc3NFdmVudE9iamVjdDxCVk5TUEV2ZW50Pn0gZXZlbnQgLSBUaGUgZXZlbnQgb2JqZWN0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBjb250ZXh0OiBDb250ZXh0PEhhbmRsZXJFbnZpcm9ubWVudD4sXG4gICAgICAgIGV2ZW50OiBTZXJ2ZXJsZXNzRXZlbnRPYmplY3Q8QlZOU1BFdmVudD5cbiAgICApIHtcbiAgICAgICAgLy8gRGV0ZXJtaW5lIG1lc3NhZ2UgZGV0YWlscyBmcm9tIHRoZSBpbmNvbWluZyBldmVudCwgd2l0aCBmYWxsYmFjayB2YWx1ZXNcbiAgICAgICAgdGhpcy5zbXNfcmVxdWVzdCA9IChldmVudC5Gcm9tIHx8IGV2ZW50Lm51bWJlcikgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5mcm9tID0gZXZlbnQuRnJvbSB8fCBldmVudC5udW1iZXIgfHwgZXZlbnQudGVzdF9udW1iZXIhO1xuICAgICAgICB0aGlzLnRvID0gc2FuaXRpemVfcGhvbmVfbnVtYmVyKGV2ZW50LlRvISk7XG4gICAgICAgIHRoaXMuYm9keSA9IGV2ZW50LkJvZHk/LnRvTG93ZXJDYXNlKCk/LnRyaW0oKS5yZXBsYWNlKC9cXHMrLywgXCItXCIpO1xuICAgICAgICB0aGlzLmJvZHlfcmF3ID0gZXZlbnQuQm9keVxuICAgICAgICB0aGlzLmJ2bnNwX25leHRfc3RlcCA9XG4gICAgICAgICAgICBldmVudC5yZXF1ZXN0LmNvb2tpZXMuYnZuc3BfbmV4dF9zdGVwO1xuICAgICAgICB0aGlzLmNvbWJpbmVkX2NvbmZpZyA9IHsgLi4uQ09ORklHLCAuLi5jb250ZXh0IH07XG4gICAgICAgIHRoaXMuY29uZmlnID0gdGhpcy5jb21iaW5lZF9jb25maWc7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMudHdpbGlvX2NsaWVudCA9IGNvbnRleHQuZ2V0VHdpbGlvQ2xpZW50KCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgaW5pdGlhbGl6aW5nIHR3aWxpb19jbGllbnRcIiwgZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zeW5jX3NpZCA9IGNvbnRleHQuU1lOQ19TSUQ7XG4gICAgICAgIHRoaXMucmVzZXRfc2NyaXB0X2lkID0gY29udGV4dC5TQ1JJUFRfSUQ7XG4gICAgICAgIHRoaXMucGF0cm9sbGVyID0gbnVsbDtcblxuICAgICAgICB0aGlzLmNoZWNraW5fdmFsdWVzID0gbmV3IENoZWNraW5WYWx1ZXMoQ09ORklHLkNIRUNLSU5fVkFMVUVTKTtcbiAgICAgICAgdGhpcy5jdXJyZW50X3NoZWV0X2RhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB0aGlzLnNlY3Rpb25fdmFsdWVzID0gbmV3IFNlY3Rpb25WYWx1ZXModGhpcy5jb21iaW5lZF9jb25maWcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlcyB0aGUgZmFzdCBjaGVjay1pbiBtb2RlIGZyb20gdGhlIG1lc3NhZ2UgYm9keS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYm9keSAtIFRoZSBtZXNzYWdlIGJvZHkuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgZmFzdCBjaGVjay1pbiBtb2RlIGlzIHBhcnNlZCwgb3RoZXJ3aXNlIGZhbHNlLlxuICAgICAqL1xuICAgIHBhcnNlX2Zhc3RfY2hlY2tpbl9tb2RlKGJvZHk6IHN0cmluZykge1xuICAgICAgICBjb25zdCBwYXJzZWQgPSB0aGlzLmNoZWNraW5fdmFsdWVzLnBhcnNlX2Zhc3RfY2hlY2tpbihib2R5KTtcbiAgICAgICAgaWYgKHBhcnNlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNraW5fbW9kZSA9IHBhcnNlZC5rZXk7XG4gICAgICAgICAgICB0aGlzLmZhc3RfY2hlY2tpbiA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIHRoZSBjaGVjay1pbiBtb2RlIGZyb20gdGhlIG1lc3NhZ2UgYm9keS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYm9keSAtIFRoZSBtZXNzYWdlIGJvZHkuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgY2hlY2staW4gbW9kZSBpcyBwYXJzZWQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKi9cbiAgICBwYXJzZV9jaGVja2luKGJvZHk6IHN0cmluZykge1xuICAgICAgICBjb25zdCBwYXJzZWQgPSB0aGlzLmNoZWNraW5fdmFsdWVzLnBhcnNlX2NoZWNraW4oYm9keSk7XG4gICAgICAgIGlmIChwYXJzZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5jaGVja2luX21vZGUgPSBwYXJzZWQua2V5O1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlcyB0aGUgY2hlY2staW4gbW9kZSBmcm9tIHRoZSBuZXh0IHN0ZXAuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgY2hlY2staW4gbW9kZSBpcyBwYXJzZWQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKi9cbiAgICBwYXJzZV9jaGVja2luX2Zyb21fbmV4dF9zdGVwKCkge1xuICAgICAgICBjb25zdCBsYXN0X3NlZ21lbnQgPSB0aGlzLmJ2bnNwX25leHRfc3RlcFxuICAgICAgICAgICAgPy5zcGxpdChcIi1cIilcbiAgICAgICAgICAgIC5zbGljZSgtMSlbMF07XG4gICAgICAgIGlmIChsYXN0X3NlZ21lbnQgJiYgbGFzdF9zZWdtZW50IGluIHRoaXMuY2hlY2tpbl92YWx1ZXMuYnlfa2V5KSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNraW5fbW9kZSA9IGxhc3Rfc2VnbWVudDtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWxheXMgdGhlIGV4ZWN1dGlvbiBmb3IgYSBzcGVjaWZpZWQgbnVtYmVyIG9mIHNlY29uZHMuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlY29uZHMgLSBUaGUgbnVtYmVyIG9mIHNlY29uZHMgdG8gZGVsYXkuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9uYWw9ZmFsc2VdIC0gV2hldGhlciB0aGUgZGVsYXkgaXMgb3B0aW9uYWwuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIGFmdGVyIHRoZSBkZWxheS5cbiAgICAgKi9cbiAgICBkZWxheShzZWNvbmRzOiBudW1iZXIsIG9wdGlvbmFsOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKG9wdGlvbmFsICYmICF0aGlzLnNtc19yZXF1ZXN0KSB7XG4gICAgICAgICAgICBzZWNvbmRzID0gMSAvIDEwMDAuMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcykgPT4ge1xuICAgICAgICAgICAgc2V0VGltZW91dChyZXMsIHNlY29uZHMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kcyBhIG1lc3NhZ2UgdG8gdGhlIHVzZXIuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSBUaGUgbWVzc2FnZSB0byBzZW5kLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBtZXNzYWdlIGlzIHNlbnQuXG4gICAgICovXG4gICAgYXN5bmMgc2VuZF9tZXNzYWdlKG1lc3NhZ2U6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5zbXNfcmVxdWVzdCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXRfdHdpbGlvX2NsaWVudCgpLm1lc3NhZ2VzLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgdG86IHRoaXMuZnJvbSxcbiAgICAgICAgICAgICAgICBmcm9tOiB0aGlzLnRvLFxuICAgICAgICAgICAgICAgIGJvZHk6IG1lc3NhZ2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVzdWx0X21lc3NhZ2VzLnB1c2gobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIHRoZSBjaGVjay1pbiBwcm9jZXNzLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBjaGVjay1pbiByZXNwb25zZS5cbiAgICAgKi9cbiAgICBhc3luYyBoYW5kbGUoKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2hhbmRsZSgpO1xuICAgICAgICBpZiAoIXRoaXMuc21zX3JlcXVlc3QpIHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQ/LnJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHRfbWVzc2FnZXMucHVzaChyZXN1bHQucmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogdGhpcy5yZXN1bHRfbWVzc2FnZXMuam9pbihcIlxcbiMjI1xcblwiKSxcbiAgICAgICAgICAgICAgICBuZXh0X3N0ZXA6IHJlc3VsdD8ubmV4dF9zdGVwLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEludGVybmFsIG1ldGhvZCB0byBoYW5kbGUgdGhlIGNoZWNrLWluIHByb2Nlc3MuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGNoZWNrLWluIHJlc3BvbnNlLlxuICAgICAqL1xuICAgIGFzeW5jIF9oYW5kbGUoKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgYFJlY2VpdmVkIHJlcXVlc3QgZnJvbSAke3RoaXMuZnJvbX0gd2l0aCBib2R5OiAke3RoaXMuYm9keX0gYW5kIHN0YXRlICR7dGhpcy5idm5zcF9uZXh0X3N0ZXB9YFxuICAgICAgICApO1xuICAgICAgICBpZiAodGhpcy5ib2R5ID09IFwibG9nb3V0XCIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIGxvZ291dGApO1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMubG9nb3V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlc3BvbnNlOiBCVk5TUFJlc3BvbnNlIHwgdW5kZWZpbmVkO1xuICAgICAgICBpZiAoIXRoaXMuY29uZmlnLlVTRV9TRVJWSUNFX0FDQ09VTlQpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlID0gYXdhaXQgdGhpcy5jaGVja191c2VyX2NyZWRzKCk7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UpIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5ib2R5Py50b0xvd2VyQ2FzZSgpID09PSBcInJlc3RhcnRcIikge1xuICAgICAgICAgICAgcmV0dXJuIHsgcmVzcG9uc2U6IFwiT2theS4gVGV4dCBtZSBhZ2FpbiB0byBzdGFydCBvdmVyLi4uXCIgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3BvbnNlID0gYXdhaXQgdGhpcy5nZXRfbWFwcGVkX3BhdHJvbGxlcigpO1xuICAgICAgICBpZiAocmVzcG9uc2UgfHwgdGhpcy5wYXRyb2xsZXIgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICByZXNwb25zZSB8fCB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBcIlVuZXhwZWN0ZWQgZXJyb3IgbG9va2luZyB1cCBwYXRyb2xsZXIgbWFwcGluZ1wiLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICAoIXRoaXMuYnZuc3BfbmV4dF9zdGVwIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5idm5zcF9uZXh0X3N0ZXAgPT0gTkVYVF9TVEVQUy5BV0FJVF9DT01NQU5EKSAmJlxuICAgICAgICAgICAgdGhpcy5ib2R5XG4gICAgICAgICkge1xuICAgICAgICAgICAgY29uc3QgYXdhaXRfcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmhhbmRsZV9hd2FpdF9jb21tYW5kKCk7XG4gICAgICAgICAgICBpZiAoYXdhaXRfcmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXRfcmVzcG9uc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICB0aGlzLmJ2bnNwX25leHRfc3RlcCA9PSBORVhUX1NURVBTLkFXQUlUX0NIRUNLSU4gJiZcbiAgICAgICAgICAgIHRoaXMuYm9keVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcnNlX2NoZWNraW4odGhpcy5ib2R5KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmNoZWNraW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHRoaXMuYnZuc3BfbmV4dF9zdGVwPy5zdGFydHNXaXRoKFxuICAgICAgICAgICAgICAgIE5FWFRfU1RFUFMuQ09ORklSTV9SRVNFVFxuICAgICAgICAgICAgKSAmJlxuICAgICAgICAgICAgdGhpcy5ib2R5XG4gICAgICAgICkge1xuICAgICAgICAgICAgaWYgKHRoaXMuYm9keSA9PSBcInllc1wiICYmIHRoaXMucGFyc2VfY2hlY2tpbl9mcm9tX25leHRfc3RlcCgpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgICAgIGBQZXJmb3JtaW5nIHJlc2V0X3NoZWV0X2Zsb3cgZm9yICR7dGhpcy5wYXRyb2xsZXIubmFtZX0gd2l0aCBjaGVja2luIG1vZGU6ICR7dGhpcy5jaGVja2luX21vZGV9YFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgKGF3YWl0IHRoaXMucmVzZXRfc2hlZXRfZmxvdygpKSB8fCAoYXdhaXQgdGhpcy5jaGVja2luKCkpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHRoaXMuYnZuc3BfbmV4dF9zdGVwPy5zdGFydHNXaXRoKE5FWFRfU1RFUFMuQVVUSF9SRVNFVClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wYXJzZV9jaGVja2luX2Zyb21fbmV4dF9zdGVwKCkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICAgICAgYFBlcmZvcm1pbmcgcmVzZXRfc2hlZXRfZmxvdy1wb3N0LWF1dGggZm9yICR7dGhpcy5wYXRyb2xsZXIubmFtZX0gd2l0aCBjaGVja2luIG1vZGU6ICR7dGhpcy5jaGVja2luX21vZGV9YFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgKGF3YWl0IHRoaXMucmVzZXRfc2hlZXRfZmxvdygpKSB8fCAoYXdhaXQgdGhpcy5jaGVja2luKCkpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHRoaXMuYnZuc3BfbmV4dF9zdGVwPy5zdGFydHNXaXRoKE5FWFRfU1RFUFMuQVdBSVRfU0VDVElPTikgJiZcbiAgICAgICAgICAgIHRoaXMuYm9keVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnN0IHNlY3Rpb24gPSB0aGlzLnNlY3Rpb25fdmFsdWVzLnBhcnNlX3NlY3Rpb24odGhpcy5ib2R5KVxuICAgICAgICAgICAgaWYgKHNlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5hc3NpZ25fc2VjdGlvbihzZWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnByb21wdF9zZWN0aW9uX2Fzc2lnbm1lbnQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHRoaXMuYnZuc3BfbmV4dF9zdGVwID09PSBORVhUX1NURVBTLkFXQUlUX01FU1NBR0UgJiZcbiAgICAgICAgICAgIHRoaXMuYm9keV9yYXdcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5zZW5kX3RleHRfbWVzc2FnZSh0aGlzLmJvZHlfcmF3KTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHRoaXMuYnZuc3BfbmV4dF9zdGVwID09PSBORVhUX1NURVBTLkFXQUlUX0JST0FEQ0FTVCAmJlxuICAgICAgICAgICAgdGhpcy5ib2R5X3Jhd1xuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnNlbmRfYnJvYWRjYXN0X21lc3NhZ2UodGhpcy5ib2R5X3Jhdyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5idm5zcF9uZXh0X3N0ZXApIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuc2VuZF9tZXNzYWdlKFwiU29ycnksIEkgZGlkbid0IHVuZGVyc3RhbmQgdGhhdC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucHJvbXB0X2NvbW1hbmQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIHRoZSBhd2FpdCBjb21tYW5kIHN0ZXAuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZSB8IHVuZGVmaW5lZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHJlc3BvbnNlIG9yIHVuZGVmaW5lZC5cbiAgICAgKi9cbiAgICBhc3luYyBoYW5kbGVfYXdhaXRfY29tbWFuZCgpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2UgfCB1bmRlZmluZWQ+IHtcbiAgICAgICAgY29uc3QgcGF0cm9sbGVyX25hbWUgPSB0aGlzLnBhdHJvbGxlciEubmFtZTtcbiAgICAgICAgaWYgKHRoaXMucGFyc2VfZmFzdF9jaGVja2luX21vZGUodGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgIGBQZXJmb3JtaW5nIGZhc3QgY2hlY2tpbiBmb3IgJHtwYXRyb2xsZXJfbmFtZX0gd2l0aCBtb2RlOiAke3RoaXMuY2hlY2tpbl9tb2RlfWBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5jaGVja2luKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKENPTU1BTkRTLk9OX0RVVFkuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIGdldF9vbl9kdXR5IGZvciAke3BhdHJvbGxlcl9uYW1lfWApO1xuICAgICAgICAgICAgcmV0dXJuIHsgcmVzcG9uc2U6IGF3YWl0IHRoaXMuZ2V0X29uX2R1dHkoKSB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ2hlY2tpbmcgZm9yIHN0YXR1cy4uLlwiKTtcbiAgICAgICAgaWYgKENPTU1BTkRTLlNUQVRVUy5pbmNsdWRlcyh0aGlzLmJvZHkhKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmZvcm1pbmcgZ2V0X3N0YXR1cyBmb3IgJHtwYXRyb2xsZXJfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldF9zdGF0dXMoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQ09NTUFORFMuQ0hFQ0tJTi5pbmNsdWRlcyh0aGlzLmJvZHkhKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmZvcm1pbmcgcHJvbXB0X2NoZWNraW4gZm9yICR7cGF0cm9sbGVyX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9tcHRfY2hlY2tpbigpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDT01NQU5EUy5HVUVTVF9QQVNTLmluY2x1ZGVzKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBndWVzdF9wYXNzIGZvciAke3BhdHJvbGxlcl9uYW1lfWApO1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucHJvbXB0X2d1ZXN0X3Bhc3MoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wYXJzZV9mYXN0X3NlY3Rpb25fYXNzaWdubWVudCh0aGlzLmJvZHkhKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmZvcm1pbmcgZmFzdCBzZWN0aW9uX2Fzc2lnbm1lbnQgZm9yICR7cGF0cm9sbGVyX25hbWV9IHRvICR7dGhpcy5hc3NpZ25lZF9zZWN0aW9ufWApO1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuYXNzaWduX3NlY3Rpb24odGhpcy5hc3NpZ25lZF9zZWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQ09NTUFORFMuU0VDVElPTl9BU1NJR05NRU5ULmluY2x1ZGVzKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBzZWN0aW9uX2Fzc2lnbm1lbnQgZm9yICR7cGF0cm9sbGVyX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5wcm9tcHRfc2VjdGlvbl9hc3NpZ25tZW50KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKENPTU1BTkRTLldIQVRTQVBQLmluY2x1ZGVzKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgSSdtIGF2YWlsYWJsZSBvbiBXaGF0c0FwcCBhcyB3ZWxsISBXaGF0c0FwcCB1c2VzIFdpZmkvQ2VsbCBEYXRhIGluc3RlYWQgb2YgU01TLCBhbmQgY2FuIGJlIG1vcmUgcmVsaWFibGUuIE1lc3NhZ2UgbWUgYXQgaHR0cHM6Ly93YS5tZS8xJHt0aGlzLnRvfWAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChDT01NQU5EUy5NRVNTQUdFLmluY2x1ZGVzKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBtZXNzYWdlIGZvciAke3BhdHJvbGxlcl9uYW1lfWApO1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucHJvbXB0X21lc3NhZ2UoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQ09NTUFORFMuQlJPQURDQVNULmluY2x1ZGVzKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBicm9hZGNhc3QgZm9yICR7cGF0cm9sbGVyX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5wcm9tcHRfYnJvYWRjYXN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm9tcHRzIHRoZSB1c2VyIGZvciBhIGNvbW1hbmQuXG4gICAgICogQHJldHVybnMge0JWTlNQUmVzcG9uc2V9IFRoZSByZXNwb25zZSBwcm9tcHRpbmcgdGhlIHVzZXIgZm9yIGEgY29tbWFuZC5cbiAgICAgKi9cbiAgICBwcm9tcHRfY29tbWFuZCgpOiBCVk5TUFJlc3BvbnNlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3BvbnNlOiBgJHt0aGlzLnBhdHJvbGxlciEubmFtZX0sIEknbSB0aGUgQlZOU1AgQm90LlxuRW50ZXIgYSBjb21tYW5kOlxuQ2hlY2sgaW4gLyBDaGVjayBvdXQgLyBTdGF0dXMgLyBPbiBEdXR5IC8gU2VjdGlvbiBBc3NpZ25tZW50IC8gR3Vlc3QgUGFzcyAvIE1lc3NhZ2UgLyBXaGF0c0FwcFxuU2VuZCAncmVzdGFydCcgYXQgYW55IHRpbWUgdG8gYmVnaW4gYWdhaW5gLFxuICAgICAgICAgICAgbmV4dF9zdGVwOiBORVhUX1NURVBTLkFXQUlUX0NPTU1BTkQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvbXB0cyB0aGUgdXNlciBmb3IgYSBjaGVjay1pbi5cbiAgICAgKiBAcmV0dXJucyB7QlZOU1BSZXNwb25zZX0gVGhlIHJlc3BvbnNlIHByb21wdGluZyB0aGUgdXNlciBmb3IgYSBjaGVjay1pbi5cbiAgICAgKi9cbiAgICBwcm9tcHRfY2hlY2tpbigpOiBCVk5TUFJlc3BvbnNlIHtcbiAgICAgICAgY29uc3QgdHlwZXMgPSBPYmplY3QudmFsdWVzKHRoaXMuY2hlY2tpbl92YWx1ZXMuYnlfa2V5KS5tYXAoXG4gICAgICAgICAgICAoeCkgPT4geC5zbXNfZGVzY1xuICAgICAgICApO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IGAke1xuICAgICAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyIS5uYW1lXG4gICAgICAgICAgICB9LCB1cGRhdGUgcGF0cm9sbGluZyBzdGF0dXMgdG86ICR7dHlwZXNcbiAgICAgICAgICAgICAgICAuc2xpY2UoMCwgLTEpXG4gICAgICAgICAgICAgICAgLmpvaW4oXCIsIFwiKX0sIG9yICR7dHlwZXMuc2xpY2UoLTEpfT9gLFxuICAgICAgICAgICAgbmV4dF9zdGVwOiBORVhUX1NURVBTLkFXQUlUX0NIRUNLSU4sXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBQYXJzZXMgdGhlIGZhc3Qgc2VjdGlvbiBhc3NpZ25tZW50IGZyb20gdGhlIG1lc3NhZ2UgYm9keS5cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5IC0gVGhlIG1lc3NhZ2UgYm9keS5cbiAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzZWN0aW9uIGFzc2lnbm1lbnQgaXMgcGFyc2VkLCBvdGhlcndpc2UgZmFsc2UuXG4gICAgKi9cbiAgICBwYXJzZV9mYXN0X3NlY3Rpb25fYXNzaWdubWVudChib2R5OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICB0aGlzLmFzc2lnbmVkX3NlY3Rpb24gPSBudWxsO1xuICAgIGlmICghYm9keSB8fCAhYm9keS5pbmNsdWRlcyhcIi1cIikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBzZWdtZW50cyA9IGJvZHkuc3BsaXQoXCItXCIpO1xuICAgIGNvbnN0IGxhc3RTZWdtZW50ID0gc2VnbWVudHMucG9wKCk7XG4gICAgY29uc3QgZmlyc3RQYXJ0ID0gc2VnbWVudHMuam9pbihcIi1cIikudG9Mb3dlckNhc2UoKTtcblxuICAgIGlmIChsYXN0U2VnbWVudCAmJiBDT01NQU5EUy5TRUNUSU9OX0FTU0lHTk1FTlQuaW5jbHVkZXMoZmlyc3RQYXJ0KSkge1xuICAgICAgICB0aGlzLmFzc2lnbmVkX3NlY3Rpb24gPSB0aGlzLnNlY3Rpb25fdmFsdWVzLm1hcF9zZWN0aW9uKGxhc3RTZWdtZW50LnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICByZXR1cm4gdGhpcy5hc3NpZ25lZF9zZWN0aW9uICE9PSBudWxsICYmIHRoaXMuYXNzaWduZWRfc2VjdGlvbiAhPT0gXCJcIjtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb21wdHMgdGhlIHVzZXIgZm9yIHNlY3Rpb24gYXNzaWdubWVudC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcmVzcG9uc2UuXG4gICAgICovXG4gICAgYXN5bmMgcHJvbXB0X3NlY3Rpb25fYXNzaWdubWVudCgpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgaWYgKCF0aGlzLnBhdHJvbGxlciB8fCAhdGhpcy5wYXRyb2xsZXIuY2hlY2tpbikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYCR7dGhpcy5wYXRyb2xsZXIhLm5hbWV9IGlzIG5vdCBjaGVja2VkIGluLmAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNlY3Rpb25fZGVzY3JpcHRpb24gPSB0aGlzLnNlY3Rpb25fdmFsdWVzLmdldF9zZWN0aW9uX2Rlc2NyaXB0aW9uKCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZTogYEVudGVyIHlvdXIgYXNzaWduZWQgc2VjdGlvbjsgb25lIG9mICR7c2VjdGlvbl9kZXNjcmlwdGlvbn0gKG9yICdyZXN0YXJ0JylgLFxuICAgICAgICAgICAgbmV4dF9zdGVwOiBORVhUX1NURVBTLkFXQUlUX1NFQ1RJT04sXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQnVpbGRzIHRoZSBtZXNzYWdlIHByZWZpeCBmb3IgYSB0ZXh0IG1lc3NhZ2UgZnJvbSBhIHBhdHJvbGxlci5cbiAgICAgKiBJbmNsdWRlcyB0aGUgc2VuZGVyJ3MgbmFtZSBhbmQgZm9ybWF0dGVkIHBob25lIG51bWJlci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VuZGVyX25hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcGF0cm9sbGVyIHNlbmRpbmcgdGhlIG1lc3NhZ2UuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbmRlcl9waG9uZSAtIFRoZSBzZW5kZXIncyAxMC1kaWdpdCBwaG9uZSBudW1iZXIuXG4gICAgICogQHJldHVybnMge3N0cmluZ30gVGhlIG1lc3NhZ2UgcHJlZml4LiBmb3IgZXhhbXBsZSA6IFwiTWVzc2FnZSBmcm9tIEpvaG4gRG9lICgxMjMpNDU2LTc4OTBcIi5cbiAgICAgKi9cbiAgICBnZXRfbWVzc2FnZV9wcmVmaXgoc2VuZGVyX25hbWU6IHN0cmluZywgc2VuZGVyX3Bob25lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBmb3JtYXR0ZWRfcGhvbmUgPSBmb3JtYXRfcGhvbmVfZm9yX2Rpc3BsYXkoc2VuZGVyX3Bob25lKTtcbiAgICAgICAgcmV0dXJuIGAke01FU1NBR0VfUFJFRklYX1RFTVBMQVRFfSR7c2VuZGVyX25hbWV9ICR7Zm9ybWF0dGVkX3Bob25lfSR7TUVTU0FHRV9QUkVGSVhfU1VGRklYfWA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlcyB0aGUgbWF4aW11bSBhbGxvd2VkIG1lc3NhZ2UgbGVuZ3RoIGZvciBhIHRleHQgbWVzc2FnZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VuZGVyX25hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcGF0cm9sbGVyIHNlbmRpbmcgdGhlIG1lc3NhZ2UuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbmRlcl9waG9uZSAtIFRoZSBzZW5kZXIncyAxMC1kaWdpdCBwaG9uZSBudW1iZXIuXG4gICAgICogQHJldHVybnMge251bWJlcn0gVGhlIG1heGltdW0gbnVtYmVyIG9mIGNoYXJhY3RlcnMgdGhlIHVzZXIncyBtZXNzYWdlIGNhbiBjb250YWluLlxuICAgICAqL1xuICAgIGdldF9tYXhfbWVzc2FnZV9sZW5ndGgoc2VuZGVyX25hbWU6IHN0cmluZywgc2VuZGVyX3Bob25lOiBzdHJpbmcpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gU01TX01BWF9MRU5HVEggLSB0aGlzLmdldF9tZXNzYWdlX3ByZWZpeChzZW5kZXJfbmFtZSwgc2VuZGVyX3Bob25lKS5sZW5ndGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvbXB0cyB0aGUgdXNlciB0byB0eXBlIHRoZWlyIHRleHQgbWVzc2FnZS5cbiAgICAgKiBBbnkgcGF0cm9sbGVyIHdpdGggYSB2YWxpZCBwaG9uZSBudW1iZXIgY2FuIHNlbmQgYSBtZXNzYWdlLCByZWdhcmRsZXNzXG4gICAgICogb2YgdGhlaXIgb3duIGNoZWNrLWluIHN0YXR1cy4gIFRoZSByZWNpcGllbnQgbGlzdCBpbmNsdWRlcyBhbGxcbiAgICAgKiBwYXRyb2xsZXJzIHdobyBoYXZlIGFueSBjaGVjay1pbiBzdGF0dXMgKEFsbCBEYXksIEhhbGYgQU0sIEhhbGYgUE0sXG4gICAgICogb3IgQ2hlY2tlZCBPdXQpLCBpbmNsdWRpbmcgdGhlIHNlbmRlciB0aGVtc2VsdmVzIGlmIHRoZXkgYXJlIGNoZWNrZWQgaW4uXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHByb21wdCByZXNwb25zZS5cbiAgICAgKi9cbiAgICBhc3luYyBwcm9tcHRfbWVzc2FnZSgpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuICAgICAgICBjb25zdCByZWNpcGllbnRzID0gbG9naW5fc2hlZXQuZ2V0X29uX2R1dHlfcGF0cm9sbGVycygpO1xuICAgICAgICBpZiAocmVjaXBpZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBObyBwYXRyb2xsZXJzIGFyZSBjdXJyZW50bHkgbG9nZ2VkIGluLiBUaGVyZSBpcyBub2JvZHkgdG8gc2VuZCBhIG1lc3NhZ2UgdG8uYCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2VuZGVyX3Bob25lID0gc2FuaXRpemVfcGhvbmVfbnVtYmVyKHRoaXMuZnJvbSk7XG4gICAgICAgIGNvbnN0IG1heF9sZW5ndGggPSB0aGlzLmdldF9tYXhfbWVzc2FnZV9sZW5ndGgodGhpcy5wYXRyb2xsZXIhLm5hbWUsIHNlbmRlcl9waG9uZSk7XG4gICAgICAgIGlmIChtYXhfbGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBZb3VyIG5hbWUgaXMgdG9vIGxvbmcgdG8gc2VuZCBhIHRleHQgbWVzc2FnZS5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IGBQbGVhc2UgdHlwZSBhIG1lc3NhZ2Ugb2Ygbm8gbW9yZSB0aGFuICR7bWF4X2xlbmd0aH0gcGxhaW4tdGV4dCBjaGFyYWN0ZXJzIHRvICR7cmVjaXBpZW50cy5sZW5ndGh9IHBhdHJvbGxlciR7cmVjaXBpZW50cy5sZW5ndGggIT09IDEgPyBcInNcIiA6IFwiXCJ9LCBvciAncmVzdGFydCcgdG8gY2FuY2VsLmAsXG4gICAgICAgICAgICBuZXh0X3N0ZXA6IE5FWFRfU1RFUFMuQVdBSVRfTUVTU0FHRSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kcyBhIHRleHQgbWVzc2FnZSB0byBhbGwgcGF0cm9sbGVycyB3aXRoIGEgY2hlY2staW4gc3RhdHVzIGZvciB0aGUgZGF5LlxuICAgICAqIFRoZSBzZW5kZXIgYWxzbyByZWNlaXZlcyB0aGUgbWVzc2FnZSBpZiB0aGV5IGhhdmUgYSBjaGVjay1pbiBzdGF0dXMuXG4gICAgICogVmFsaWRhdGVzIHRoYXQgdGhlIGNvbXBsZXRlIG1lc3NhZ2UgKHByZWZpeCArIGJvZHkpIHVzZXMgb25seSBHU00tN1xuICAgICAqIGNoYXJhY3RlcnMgYW5kIGZpdHMgd2l0aGluIGEgc2luZ2xlIFNNUyBzZWdtZW50LCB1c2luZyB0aGVcbiAgICAgKiBzbXMtc2VnbWVudHMtY2FsY3VsYXRvciBsaWJyYXJ5LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlX3RleHQgLSBUaGUgcmF3IG1lc3NhZ2UgdGV4dCBmcm9tIHRoZSBzZW5kZXIuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHNlbmQgcmVzdWx0LlxuICAgICAqL1xuICAgIGFzeW5jIHNlbmRfdGV4dF9tZXNzYWdlKG1lc3NhZ2VfdGV4dDogc3RyaW5nKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnN0IHNlbmRlcl9uYW1lID0gdGhpcy5wYXRyb2xsZXIhLm5hbWU7XG4gICAgICAgIGNvbnN0IHNlbmRlcl9waG9uZSA9IHNhbml0aXplX3Bob25lX251bWJlcih0aGlzLmZyb20pO1xuICAgICAgICBjb25zdCBwcmVmaXggPSB0aGlzLmdldF9tZXNzYWdlX3ByZWZpeChzZW5kZXJfbmFtZSwgc2VuZGVyX3Bob25lKTtcbiAgICAgICAgY29uc3QgbWF4X2xlbmd0aCA9IHRoaXMuZ2V0X21heF9tZXNzYWdlX2xlbmd0aChzZW5kZXJfbmFtZSwgc2VuZGVyX3Bob25lKTtcbiAgICAgICAgY29uc3QgZnVsbF9tZXNzYWdlID0gcHJlZml4ICsgbWVzc2FnZV90ZXh0O1xuXG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb24gPSB2YWxpZGF0ZV9zbXNfbWVzc2FnZShmdWxsX21lc3NhZ2UpO1xuICAgICAgICBpZiAoIXZhbGlkYXRpb24udmFsaWQpIHtcbiAgICAgICAgICAgIGlmICh2YWxpZGF0aW9uLnJlYXNvbiA9PT0gXCJub25fZ3NtN1wiKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYmFkX2NoYXJzID0gdmFsaWRhdGlvbi5ub25fZ3NtX2NoYXJhY3RlcnMhLmpvaW4oXCIgXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgWW91ciBtZXNzYWdlIGNvbnRhaW5zIGNoYXJhY3RlcnMgdGhhdCBhcmUgbm90IHN1cHBvcnRlZCBpbiBwbGFpbi10ZXh0IFNNUzogJHtiYWRfY2hhcnN9LiBQbGVhc2UgdXNlIG9ubHkgc3RhbmRhcmQgY2hhcmFjdGVycyBhbmQgdHJ5IGFnYWluLmAsXG4gICAgICAgICAgICAgICAgICAgIG5leHRfc3RlcDogTkVYVF9TVEVQUy5BV0FJVF9NRVNTQUdFLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgWW91ciBtZXNzYWdlIGlzICR7bWVzc2FnZV90ZXh0Lmxlbmd0aH0gY2hhcmFjdGVycywgd2hpY2ggZXhjZWVkcyB0aGUgbGltaXQgb2YgJHttYXhfbGVuZ3RofS4gUGxlYXNlIHNob3J0ZW4geW91ciBtZXNzYWdlIGFuZCB0cnkgYWdhaW4sIG9yIHR5cGUgJ3Jlc3RhcnQnIHRvIGNhbmNlbC5gLFxuICAgICAgICAgICAgICAgIG5leHRfc3RlcDogTkVYVF9TVEVQUy5BV0FJVF9NRVNTQUdFLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKTtcbiAgICAgICAgY29uc3Qgc2lnbmVkX2luX3BhdHJvbGxlcnMgPSBsb2dpbl9zaGVldC5nZXRfb25fZHV0eV9wYXRyb2xsZXJzKCk7XG4gICAgICAgIGNvbnN0IHBob25lX21hcCA9IGF3YWl0IHRoaXMuZ2V0X3Bob25lX251bWJlcl9tYXAoKTtcblxuICAgICAgICAvLyBCdWlsZCByZWNpcGllbnQgbWFwIGZvciBvbi1kdXR5IHBhdHJvbGxlcnMgd2l0aCBrbm93biBwaG9uZXM7IHRyYWNrIG1pc3NpbmdcbiAgICAgICAgY29uc3QgcmVjaXBpZW50X21hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xuICAgICAgICBjb25zdCBub19waG9uZV9uYW1lczogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBwYXRyb2xsZXIgb2Ygc2lnbmVkX2luX3BhdHJvbGxlcnMpIHtcbiAgICAgICAgICAgIGNvbnN0IHBob25lID0gcGhvbmVfbWFwW3BhdHJvbGxlci5uYW1lXTtcbiAgICAgICAgICAgIGlmIChwaG9uZSkge1xuICAgICAgICAgICAgICAgIHJlY2lwaWVudF9tYXBbcGF0cm9sbGVyLm5hbWVdID0gcGhvbmU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vX3Bob25lX25hbWVzLnB1c2gocGF0cm9sbGVyLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgeyBzZW50X2NvdW50LCBjb3B5X3NlbnRfdG9fc2VuZGVyLCBmYWlsZWRfbmFtZXMgfSA9XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmRlbGl2ZXJfc21zX3RvX21hcChyZWNpcGllbnRfbWFwLCBmdWxsX21lc3NhZ2UsIHNlbmRlcl9uYW1lKTtcblxuICAgICAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oYHRleHRfbWVzc2FnZSgke3NlbnRfY291bnQgKyAoY29weV9zZW50X3RvX3NlbmRlciA/IDEgOiAwKX0pYCk7XG5cbiAgICAgICAgbGV0IHJlc3BvbnNlID0gYE1lc3NhZ2Ugc2VudCB0byAke3NlbnRfY291bnR9IHBhdHJvbGxlciR7c2VudF9jb3VudCAhPT0gMSA/IFwic1wiIDogXCJcIn1gO1xuICAgICAgICBpZiAoY29weV9zZW50X3RvX3NlbmRlcikge1xuICAgICAgICAgICAgcmVzcG9uc2UgKz0gYCBhbmQgYSBjb3B5IHRvIHlvdS5gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzcG9uc2UgKz0gYC5gO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFsbF9mYWlsZWQgPSBbLi4ubm9fcGhvbmVfbmFtZXMsIC4uLmZhaWxlZF9uYW1lc107XG4gICAgICAgIGlmIChhbGxfZmFpbGVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJlc3BvbnNlICs9IGAgQ291bGQgbm90IHNlbmQgdG86ICR7YWxsX2ZhaWxlZC5qb2luKFwiLCBcIil9LmA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgcmVzcG9uc2UgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb3JlIFNNUyBkZWxpdmVyeSBsb29wLiBTZW5kcyBmdWxsX21lc3NhZ2UgdG8gZWFjaCBlbnRyeSBpbiByZWNpcGllbnRfbWFwXG4gICAgICogKG5hbWUg4oaSIFwiKzFYWFhYWFhYWFhYXCIpLiBJZiB0aGUgc2VuZGVyJ3MgcGhvbmUgaXMgbm90IGFtb25nIHRoZSByZWNpcGllbnRzLFxuICAgICAqIGEgY29weSBpcyBzZW50IHRvIHRoaXMuZnJvbS4gUmV0dXJucyBkZWxpdmVyeSBhY2NvdW50aW5nIGRhdGEuXG4gICAgICogQHBhcmFtIHtSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+fSByZWNpcGllbnRfbWFwIC0gTWFwIG9mIHBhdHJvbGxlciBuYW1lIHRvIFwiKzFYWFhYWFhYWFhYXCIgcGhvbmUuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZ1bGxfbWVzc2FnZSAtIFRoZSBjb21wbGV0ZSBmb3JtYXR0ZWQgU01TIHRvIHNlbmQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbmRlcl9uYW1lIC0gVGhlIHNlbmRlcidzIG5hbWUgKHVzZWQgZm9yIGZhaWx1cmUgbG9nZ2luZykuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8b2JqZWN0Pn0gRGVsaXZlcnkgY291bnRzIGFuZCBmYWlsdXJlIGxpc3QuXG4gICAgICovXG4gICAgYXN5bmMgZGVsaXZlcl9zbXNfdG9fbWFwKFxuICAgICAgICByZWNpcGllbnRfbWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+LFxuICAgICAgICBmdWxsX21lc3NhZ2U6IHN0cmluZyxcbiAgICAgICAgc2VuZGVyX25hbWU6IHN0cmluZyxcbiAgICApOiBQcm9taXNlPHsgc2VudF9jb3VudDogbnVtYmVyOyBjb3B5X3NlbnRfdG9fc2VuZGVyOiBib29sZWFuOyBmYWlsZWRfbmFtZXM6IHN0cmluZ1tdIH0+IHtcbiAgICAgICAgbGV0IHNlbnRfY291bnQgPSAwO1xuICAgICAgICBjb25zdCBmYWlsZWRfbmFtZXM6IHN0cmluZ1tdID0gW107XG5cbiAgICAgICAgZm9yIChjb25zdCBbbmFtZSwgcGhvbmVdIG9mIE9iamVjdC5lbnRyaWVzKHJlY2lwaWVudF9tYXApKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0X3R3aWxpb19jbGllbnQoKS5tZXNzYWdlcy5jcmVhdGUoe1xuICAgICAgICAgICAgICAgICAgICB0bzogcGhvbmUsXG4gICAgICAgICAgICAgICAgICAgIGZyb206IHRoaXMudG8sXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IGZ1bGxfbWVzc2FnZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzZW50X2NvdW50Kys7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYEZhaWxlZCB0byBzZW5kIFNNUyB0byAke25hbWV9OiAke2V9YCk7XG4gICAgICAgICAgICAgICAgZmFpbGVkX25hbWVzLnB1c2gobmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZW5kIGEgY29weSB0byB0aGUgc2VuZGVyIGlmIHRoZWlyIG51bWJlciBpcyBub3QgYWxyZWFkeSBpbiB0aGUgcmVjaXBpZW50IG1hcFxuICAgICAgICBjb25zdCBub3JtYWxpemVkX3NlbmRlciA9IGArMSR7c2FuaXRpemVfcGhvbmVfbnVtYmVyKHRoaXMuZnJvbSl9YDtcbiAgICAgICAgY29uc3Qgc2VuZGVyX2luX21hcCA9IE9iamVjdC52YWx1ZXMocmVjaXBpZW50X21hcCkuaW5jbHVkZXMobm9ybWFsaXplZF9zZW5kZXIpO1xuICAgICAgICBsZXQgY29weV9zZW50X3RvX3NlbmRlciA9IGZhbHNlO1xuICAgICAgICBpZiAoIXNlbmRlcl9pbl9tYXApIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXRfdHdpbGlvX2NsaWVudCgpLm1lc3NhZ2VzLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHRvOiB0aGlzLmZyb20sXG4gICAgICAgICAgICAgICAgICAgIGZyb206IHRoaXMudG8sXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IGZ1bGxfbWVzc2FnZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb3B5X3NlbnRfdG9fc2VuZGVyID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgRmFpbGVkIHRvIHNlbmQgU01TIGNvcHkgdG8gc2VuZGVyICR7c2VuZGVyX25hbWV9OiAke2V9YCk7XG4gICAgICAgICAgICAgICAgZmFpbGVkX25hbWVzLnB1c2goc2VuZGVyX25hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHsgc2VudF9jb3VudCwgY29weV9zZW50X3RvX3NlbmRlciwgZmFpbGVkX25hbWVzIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvbXB0cyB0aGUgdXNlciB0byB0eXBlIGEgYnJvYWRjYXN0IG1lc3NhZ2UgdG8gYWxsIHBhdHJvbGxlcnMuXG4gICAgICogVW5saWtlIHRoZSBtZXNzYWdlIGNvbW1hbmQgKHdoaWNoIHRhcmdldHMgb25seSBsb2dnZWQtaW4gcGF0cm9sbGVycyksIGJyb2FkY2FzdFxuICAgICAqIHNlbmRzIHRvIGV2ZXJ5IHBhdHJvbGxlciBpbiB0aGUgUGhvbmUgTnVtYmVycyBzaGVldC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcHJvbXB0IHJlc3BvbnNlLlxuICAgICAqL1xuICAgIGFzeW5jIHByb21wdF9icm9hZGNhc3QoKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnN0IHBob25lX21hcCA9IGF3YWl0IHRoaXMuZ2V0X3Bob25lX251bWJlcl9tYXAoKTtcbiAgICAgICAgY29uc3QgcmVjaXBpZW50X2NvdW50ID0gT2JqZWN0LmtleXMocGhvbmVfbWFwKS5sZW5ndGg7XG4gICAgICAgIGlmIChyZWNpcGllbnRfY291bnQgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBObyBwYXRyb2xsZXJzIHdpdGggcGhvbmUgbnVtYmVycyBmb3VuZC4gVGhlcmUgaXMgbm9ib2R5IHRvIGJyb2FkY2FzdCB0by5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZW5kZXJfcGhvbmUgPSBzYW5pdGl6ZV9waG9uZV9udW1iZXIodGhpcy5mcm9tKTtcbiAgICAgICAgY29uc3QgbWF4X2xlbmd0aCA9IHRoaXMuZ2V0X21heF9tZXNzYWdlX2xlbmd0aCh0aGlzLnBhdHJvbGxlciEubmFtZSwgc2VuZGVyX3Bob25lKTtcbiAgICAgICAgaWYgKG1heF9sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYFlvdXIgbmFtZSBpcyB0b28gbG9uZyB0byBzZW5kIGEgYnJvYWRjYXN0IG1lc3NhZ2UuYCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3BvbnNlOiBgUGxlYXNlIHR5cGUgYSBicm9hZGNhc3QgbWVzc2FnZSBvZiBubyBtb3JlIHRoYW4gJHttYXhfbGVuZ3RofSBwbGFpbi10ZXh0IGNoYXJhY3RlcnMgdG8gJHtyZWNpcGllbnRfY291bnR9IHBhdHJvbGxlciR7cmVjaXBpZW50X2NvdW50ICE9PSAxID8gXCJzXCIgOiBcIlwifSwgb3IgJ3Jlc3RhcnQnIHRvIGNhbmNlbC5gLFxuICAgICAgICAgICAgbmV4dF9zdGVwOiBORVhUX1NURVBTLkFXQUlUX0JST0FEQ0FTVCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kcyBhIGJyb2FkY2FzdCBtZXNzYWdlIHRvIEFMTCBwYXRyb2xsZXJzIGluIHRoZSBQaG9uZSBOdW1iZXJzIHNoZWV0LFxuICAgICAqIHJlZ2FyZGxlc3Mgb2YgY2hlY2staW4gc3RhdHVzLiBVc2VzIHRoZSBzYW1lIHByZWZpeCBmb3JtYXQgYW5kIEdTTS03IC8gc2luZ2xlLXNlZ21lbnRcbiAgICAgKiB2YWxpZGF0aW9uIGFzIHRoZSBtZXNzYWdlIGNvbW1hbmQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VfdGV4dCAtIFRoZSByYXcgbWVzc2FnZSB0ZXh0IGZyb20gdGhlIHNlbmRlci5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgc2VuZCByZXN1bHQuXG4gICAgICovXG4gICAgYXN5bmMgc2VuZF9icm9hZGNhc3RfbWVzc2FnZShtZXNzYWdlX3RleHQ6IHN0cmluZyk6IFByb21pc2U8QlZOU1BSZXNwb25zZT4ge1xuICAgICAgICBjb25zdCBzZW5kZXJfbmFtZSA9IHRoaXMucGF0cm9sbGVyIS5uYW1lO1xuICAgICAgICBjb25zdCBzZW5kZXJfcGhvbmUgPSBzYW5pdGl6ZV9waG9uZV9udW1iZXIodGhpcy5mcm9tKTtcbiAgICAgICAgY29uc3QgcHJlZml4ID0gdGhpcy5nZXRfbWVzc2FnZV9wcmVmaXgoc2VuZGVyX25hbWUsIHNlbmRlcl9waG9uZSk7XG4gICAgICAgIGNvbnN0IG1heF9sZW5ndGggPSB0aGlzLmdldF9tYXhfbWVzc2FnZV9sZW5ndGgoc2VuZGVyX25hbWUsIHNlbmRlcl9waG9uZSk7XG4gICAgICAgIGNvbnN0IGZ1bGxfbWVzc2FnZSA9IHByZWZpeCArIG1lc3NhZ2VfdGV4dDtcblxuICAgICAgICBjb25zdCB2YWxpZGF0aW9uID0gdmFsaWRhdGVfc21zX21lc3NhZ2UoZnVsbF9tZXNzYWdlKTtcbiAgICAgICAgaWYgKCF2YWxpZGF0aW9uLnZhbGlkKSB7XG4gICAgICAgICAgICBpZiAodmFsaWRhdGlvbi5yZWFzb24gPT09IFwibm9uX2dzbTdcIikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJhZF9jaGFycyA9IHZhbGlkYXRpb24ubm9uX2dzbV9jaGFyYWN0ZXJzIS5qb2luKFwiIFwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICByZXNwb25zZTogYFlvdXIgbWVzc2FnZSBjb250YWlucyBjaGFyYWN0ZXJzIHRoYXQgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gcGxhaW4tdGV4dCBTTVM6ICR7YmFkX2NoYXJzfS4gUGxlYXNlIHVzZSBvbmx5IHN0YW5kYXJkIGNoYXJhY3RlcnMgYW5kIHRyeSBhZ2Fpbi5gLFxuICAgICAgICAgICAgICAgICAgICBuZXh0X3N0ZXA6IE5FWFRfU1RFUFMuQVdBSVRfQlJPQURDQVNULFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgWW91ciBtZXNzYWdlIGlzICR7bWVzc2FnZV90ZXh0Lmxlbmd0aH0gY2hhcmFjdGVycywgd2hpY2ggZXhjZWVkcyB0aGUgbGltaXQgb2YgJHttYXhfbGVuZ3RofS4gUGxlYXNlIHNob3J0ZW4geW91ciBtZXNzYWdlIGFuZCB0cnkgYWdhaW4sIG9yIHR5cGUgJ3Jlc3RhcnQnIHRvIGNhbmNlbC5gLFxuICAgICAgICAgICAgICAgIG5leHRfc3RlcDogTkVYVF9TVEVQUy5BV0FJVF9CUk9BRENBU1QsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRm9yIGJyb2FkY2FzdCwgc2VuZCB0byBBTEwgcGF0cm9sbGVycyBpbiB0aGUgcGhvbmUgbnVtYmVyIG1hcFxuICAgICAgICBjb25zdCBwaG9uZV9tYXAgPSBhd2FpdCB0aGlzLmdldF9waG9uZV9udW1iZXJfbWFwKCk7XG4gICAgICAgIGNvbnN0IHsgc2VudF9jb3VudCwgY29weV9zZW50X3RvX3NlbmRlciwgZmFpbGVkX25hbWVzIH0gPVxuICAgICAgICAgICAgYXdhaXQgdGhpcy5kZWxpdmVyX3Ntc190b19tYXAocGhvbmVfbWFwLCBmdWxsX21lc3NhZ2UsIHNlbmRlcl9uYW1lKTtcblxuICAgICAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oYGJyb2FkY2FzdCgke3NlbnRfY291bnQgKyAoY29weV9zZW50X3RvX3NlbmRlciA/IDEgOiAwKX0pYCk7XG5cbiAgICAgICAgbGV0IHJlc3BvbnNlID0gYEJyb2FkY2FzdCBzZW50IHRvICR7c2VudF9jb3VudH0gcGF0cm9sbGVyJHtzZW50X2NvdW50ICE9PSAxID8gXCJzXCIgOiBcIlwifWA7XG4gICAgICAgIGlmIChjb3B5X3NlbnRfdG9fc2VuZGVyKSB7XG4gICAgICAgICAgICByZXNwb25zZSArPSBgIGFuZCBhIGNvcHkgdG8geW91LmA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNwb25zZSArPSBgLmA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZmFpbGVkX25hbWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJlc3BvbnNlICs9IGAgQ291bGQgbm90IHNlbmQgdG86ICR7ZmFpbGVkX25hbWVzLmpvaW4oXCIsIFwiKX0uYDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyByZXNwb25zZSB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvb2tzIHVwIHBob25lIG51bWJlcnMgZm9yIGFsbCBwYXRyb2xsZXJzIGZyb20gdGhlIFBob25lIE51bWJlcnMgc2hlZXQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8UmVjb3JkPHN0cmluZywgc3RyaW5nPj59IEEgbWFwIG9mIHBhdHJvbGxlciBuYW1lIHRvIHBob25lIG51bWJlciAoaW4gKzFYWFhYWFhYWFhYIGZvcm1hdCkuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3Bob25lX251bWJlcl9tYXAoKTogUHJvbWlzZTxSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+PiB7XG4gICAgICAgIGNvbnN0IHNoZWV0c19zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfc2hlZXRzX3NlcnZpY2UoKTtcbiAgICAgICAgY29uc3Qgb3B0czogRmluZFBhdHJvbGxlckNvbmZpZyA9IHRoaXMuY29tYmluZWRfY29uZmlnO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHNoZWV0c19zZXJ2aWNlLnNwcmVhZHNoZWV0cy52YWx1ZXMuZ2V0KHtcbiAgICAgICAgICAgIHNwcmVhZHNoZWV0SWQ6IG9wdHMuU0hFRVRfSUQsXG4gICAgICAgICAgICByYW5nZTogb3B0cy5QSE9ORV9OVU1CRVJfTE9PS1VQX1NIRUVULFxuICAgICAgICAgICAgdmFsdWVSZW5kZXJPcHRpb246IFwiVU5GT1JNQVRURURfVkFMVUVcIixcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghcmVzcG9uc2UuZGF0YS52YWx1ZXMpIHtcbiAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBtYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCByb3cgb2YgcmVzcG9uc2UuZGF0YS52YWx1ZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSByb3dbZXhjZWxfcm93X3RvX2luZGV4KG9wdHMuUEhPTkVfTlVNQkVSX05BTUVfQ09MVU1OKV07XG4gICAgICAgICAgICBjb25zdCByYXdOdW1iZXIgPSByb3dbZXhjZWxfcm93X3RvX2luZGV4KG9wdHMuUEhPTkVfTlVNQkVSX05VTUJFUl9DT0xVTU4pXTtcbiAgICAgICAgICAgIGlmIChuYW1lICYmIHJhd051bWJlcikge1xuICAgICAgICAgICAgICAgIG1hcFtuYW1lXSA9IGArMSR7c2FuaXRpemVfcGhvbmVfbnVtYmVyKHJhd051bWJlcil9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWFwO1xuICAgIH1cblxuLyoqXG4gKiBBc3NpZ25zIHRoZSBzZWN0aW9uIHRvIHRoZSBwYXRyb2xsZXIuXG4gKiBAcGFyYW0ge3N0cmluZyB8IG51bGx9IHNlY3Rpb24gLSBUaGUgc2VjdGlvbiB0byBhc3NpZ24uXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcmVzcG9uc2UuXG4gKi9cbmFzeW5jIGFzc2lnbl9zZWN0aW9uKHNlY3Rpb246IHN0cmluZyB8IG51bGwpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICBjb25zdCBhc3NpZ25lZFNlY3Rpb24gPSBzZWN0aW9uID8/IFwiUm92aW5nXCI7XG4gICAgY29uc29sZS5sb2coYEFzc2lnbmluZyBzZWN0aW9uICR7dGhpcy5wYXRyb2xsZXIhLm5hbWV9IHRvICR7YXNzaWduZWRTZWN0aW9ufWApO1xuICAgIGNvbnN0IG1hcHBlZF9zZWN0aW9uID0gdGhpcy5zZWN0aW9uX3ZhbHVlcy5tYXBfc2VjdGlvbihhc3NpZ25lZFNlY3Rpb24pO1xuICAgIGF3YWl0IHRoaXMubG9nX2FjdGlvbihgYXNzaWduX3NlY3Rpb24oJHttYXBwZWRfc2VjdGlvbn0pYCk7XG4gICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuICAgIGF3YWl0IGxvZ2luX3NoZWV0LmFzc2lnbl9zZWN0aW9uKHRoaXMucGF0cm9sbGVyISwgbWFwcGVkX3NlY3Rpb24pO1xuICAgIGF3YWl0IHRoaXMubG9naW5fc2hlZXQ/LnJlZnJlc2goKTtcbiAgICBhd2FpdCB0aGlzLmdldF9tYXBwZWRfcGF0cm9sbGVyKHRydWUpO1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3BvbnNlOiBgVXBkYXRlZCAke3RoaXMucGF0cm9sbGVyIS5uYW1lfSB3aXRoIHNlY3Rpb24gYXNzaWdubWVudDogJHttYXBwZWRfc2VjdGlvbn0uYCxcbiAgICB9O1xufVxuXG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBzdGF0dXMgb2YgdGhlIHBhdHJvbGxlci5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgc3RhdHVzIHJlc3BvbnNlLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF9zdGF0dXMoKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKTtcbiAgICAgICAgY29uc3Qgc2hlZXRfZGF0ZSA9IGxvZ2luX3NoZWV0LnNoZWV0X2RhdGUudG9EYXRlU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfZGF0ZSA9IGxvZ2luX3NoZWV0LmN1cnJlbnRfZGF0ZS50b0RhdGVTdHJpbmcoKTtcbiAgICAgICAgaWYgKCFsb2dpbl9zaGVldC5pc19jdXJyZW50KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgc2hlZXRfZGF0ZTogJHtsb2dpbl9zaGVldC5zaGVldF9kYXRlfWApO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYGN1cnJlbnRfZGF0ZTogJHtsb2dpbl9zaGVldC5jdXJyZW50X2RhdGV9YCk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgU2hlZXQgaXMgbm90IGN1cnJlbnQgZm9yIHRvZGF5IChsYXN0IHJlc2V0OiAke3NoZWV0X2RhdGV9KS4gJHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXIhLm5hbWVcbiAgICAgICAgICAgICAgICB9IGlzIG5vdCBjaGVja2VkIGluIGZvciAke2N1cnJlbnRfZGF0ZX0uYCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB7IHJlc3BvbnNlOiBhd2FpdCB0aGlzLmdldF9zdGF0dXNfc3RyaW5nKCkgfTtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKFwic3RhdHVzXCIpO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgc3RhdHVzIHN0cmluZyBvZiB0aGUgcGF0cm9sbGVyLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHN0cmluZz59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHN0YXR1cyBzdHJpbmcuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3N0YXR1c19zdHJpbmcoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuICAgICAgICBjb25zdCBndWVzdF9wYXNzX3Byb21pc2UgPSAoXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmdldF9ndWVzdF9wYXNzX3NoZWV0KClcbiAgICAgICAgKS5nZXRfYXZhaWxhYmxlX2FuZF91c2VkX3Bhc3Nlcyh0aGlzLnBhdHJvbGxlciEubmFtZSk7XG4gICAgICAgIGNvbnN0IHBhdHJvbGxlcl9zdGF0dXMgPSB0aGlzLnBhdHJvbGxlciE7XG5cbiAgICAgICAgY29uc3QgY2hlY2tpbkNvbHVtblNldCA9XG4gICAgICAgICAgICBwYXRyb2xsZXJfc3RhdHVzLmNoZWNraW4gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgcGF0cm9sbGVyX3N0YXR1cy5jaGVja2luICE9PSBudWxsO1xuICAgICAgICBjb25zdCBjaGVja2VkT3V0ID1cbiAgICAgICAgICAgIGNoZWNraW5Db2x1bW5TZXQgJiZcbiAgICAgICAgICAgIHRoaXMuY2hlY2tpbl92YWx1ZXMuYnlfc2hlZXRfc3RyaW5nW3BhdHJvbGxlcl9zdGF0dXMuY2hlY2tpbl0ua2V5ID09XG4gICAgICAgICAgICAgICAgXCJvdXRcIjtcbiAgICAgICAgbGV0IHN0YXR1cyA9IHBhdHJvbGxlcl9zdGF0dXMuY2hlY2tpbiB8fCBcIk5vdCBQcmVzZW50XCI7XG5cbiAgICAgICAgaWYgKGNoZWNrZWRPdXQpIHtcbiAgICAgICAgICAgIHN0YXR1cyA9IFwiQ2hlY2tlZCBPdXRcIjtcbiAgICAgICAgfSBlbHNlIGlmIChjaGVja2luQ29sdW1uU2V0KSB7XG4gICAgICAgICAgICBsZXQgc2VjdGlvbiA9IHBhdHJvbGxlcl9zdGF0dXMuc2VjdGlvbi50b1N0cmluZygpO1xuICAgICAgICAgICAgaWYgKHNlY3Rpb24ubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgICAgICBzZWN0aW9uID0gYFNlY3Rpb24gJHtzZWN0aW9ufWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdGF0dXMgPSBgJHtwYXRyb2xsZXJfc3RhdHVzLmNoZWNraW59ICgke3NlY3Rpb259KWA7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb21wbGV0ZWRQYXRyb2xEYXlzID0gYXdhaXQgKFxuICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXRfc2Vhc29uX3NoZWV0KClcbiAgICAgICAgKS5nZXRfcGF0cm9sbGVkX2RheXModGhpcy5wYXRyb2xsZXIhLm5hbWUpO1xuICAgICAgICBjb25zdCBjb21wbGV0ZWRQYXRyb2xEYXlzU3RyaW5nID1cbiAgICAgICAgICAgIGNvbXBsZXRlZFBhdHJvbERheXMgPiAwID8gY29tcGxldGVkUGF0cm9sRGF5cy50b1N0cmluZygpIDogXCJOb1wiO1xuICAgICAgICBjb25zdCBsb2dpblNoZWV0RGF0ZSA9IGxvZ2luX3NoZWV0LnNoZWV0X2RhdGUudG9EYXRlU3RyaW5nKCk7XG5cbiAgICAgICAgbGV0IHN0YXR1c1N0cmluZyA9IGBTdGF0dXMgZm9yICR7XG4gICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICB9IG9uIGRhdGUgJHtsb2dpblNoZWV0RGF0ZX06ICR7c3RhdHVzfS5cXG4ke2NvbXBsZXRlZFBhdHJvbERheXNTdHJpbmd9IGNvbXBsZXRlZCBwYXRyb2wgZGF5cyBwcmlvciB0byB0b2RheS5gO1xuICAgICAgICBjb25zdCB1c2VkVG9kYXlHdWVzdFBhc3NlcyA9IChhd2FpdCBndWVzdF9wYXNzX3Byb21pc2UpPy51c2VkX3RvZGF5IHx8IDA7XG4gICAgICAgIGNvbnN0IHVzZWRTZWFzb25HdWVzdFBhc3NlcyA9XG4gICAgICAgICAgICAoYXdhaXQgZ3Vlc3RfcGFzc19wcm9taXNlKT8udXNlZF9zZWFzb24gfHwgMDtcbiAgICAgICAgY29uc3QgYXZhaWxhYmxlR3Vlc3RQYXNzZXMgPSAoYXdhaXQgZ3Vlc3RfcGFzc19wcm9taXNlKT8uYXZhaWxhYmxlIHx8IDA7XG5cblxuICAgICAgICBzdGF0dXNTdHJpbmcgKz1cbiAgICAgICAgICAgIFwiIFwiICtcbiAgICAgICAgICAgIGJ1aWxkX3Bhc3Nlc19zdHJpbmcoXG4gICAgICAgICAgICAgICAgdXNlZFNlYXNvbkd1ZXN0UGFzc2VzLFxuICAgICAgICAgICAgICAgIHVzZWRTZWFzb25HdWVzdFBhc3NlcyArIGF2YWlsYWJsZUd1ZXN0UGFzc2VzLFxuICAgICAgICAgICAgICAgIHVzZWRUb2RheUd1ZXN0UGFzc2VzXG4gICAgICAgICAgICApO1xuICAgICAgICByZXR1cm4gc3RhdHVzU3RyaW5nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIHRoZSBjaGVjay1pbiBwcm9jZXNzIGZvciB0aGUgcGF0cm9sbGVyIG9uY2UgdGhlIGNoZWNrLWluIG1vZGUgaXMgc2V0LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBjaGVjay1pbiByZXNwb25zZS5cbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gVGhyb3dzIGFuIGVycm9yIGlmIHRoZSBjaGVjay1pbiBtb2RlIGlzIGltcHJvcGVybHkgc2V0LlxuICAgICAqL1xuICAgIGFzeW5jIGNoZWNraW4oKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgYFBlcmZvcm1pbmcgcmVndWxhciBjaGVja2luIGZvciAke1xuICAgICAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyIS5uYW1lXG4gICAgICAgICAgICB9IHdpdGggbW9kZTogJHt0aGlzLmNoZWNraW5fbW9kZX1gXG4gICAgICAgICk7XG4gICAgICAgIGlmIChhd2FpdCB0aGlzLnNoZWV0X25lZWRzX3Jlc2V0KCkpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6XG4gICAgICAgICAgICAgICAgICAgIGAke1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXIhLm5hbWVcbiAgICAgICAgICAgICAgICAgICAgfSwgeW91IGFyZSB0aGUgZmlyc3QgcGVyc29uIHRvIGNoZWNrIGluIHRvZGF5LiBgICtcbiAgICAgICAgICAgICAgICAgICAgYEkgbmVlZCB0byBhcmNoaXZlIGFuZCByZXNldCB0aGUgc2hlZXQgYmVmb3JlIGNvbnRpbnVpbmcuIGAgK1xuICAgICAgICAgICAgICAgICAgICBgV291bGQgeW91IGxpa2UgbWUgdG8gZG8gdGhhdD8gKFllcy9ObylgLFxuICAgICAgICAgICAgICAgIG5leHRfc3RlcDogYCR7TkVYVF9TVEVQUy5DT05GSVJNX1JFU0VUfS0ke3RoaXMuY2hlY2tpbl9tb2RlfWAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGxldCBjaGVja2luX21vZGU7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgICF0aGlzLmNoZWNraW5fbW9kZSB8fFxuICAgICAgICAgICAgKGNoZWNraW5fbW9kZSA9IHRoaXMuY2hlY2tpbl92YWx1ZXMuYnlfa2V5W3RoaXMuY2hlY2tpbl9tb2RlXSkgPT09XG4gICAgICAgICAgICAgICAgdW5kZWZpbmVkXG4gICAgICAgICkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2hlY2tpbiBtb2RlIGltcHJvcGVybHkgc2V0XCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuICAgICAgICBjb25zdCBuZXdfY2hlY2tpbl92YWx1ZSA9IGNoZWNraW5fbW9kZS5zaGVldHNfdmFsdWU7XG4gICAgICAgIGF3YWl0IGxvZ2luX3NoZWV0LmNoZWNraW4odGhpcy5wYXRyb2xsZXIhLCBuZXdfY2hlY2tpbl92YWx1ZSk7XG4gICAgICAgIGF3YWl0IHRoaXMubG9nX2FjdGlvbihgdXBkYXRlLXN0YXR1cygke25ld19jaGVja2luX3ZhbHVlfSlgKTtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2dpbl9zaGVldD8ucmVmcmVzaCgpO1xuICAgICAgICBhd2FpdCB0aGlzLmdldF9tYXBwZWRfcGF0cm9sbGVyKHRydWUpO1xuXG4gICAgICAgIGxldCByZXNwb25zZSA9IGBVcGRhdGluZyAke1xuICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXIhLm5hbWVcbiAgICAgICAgfSB3aXRoIHN0YXR1czogJHtuZXdfY2hlY2tpbl92YWx1ZX0uYDtcbiAgICAgICAgaWYgKCF0aGlzLmZhc3RfY2hlY2tpbikge1xuICAgICAgICAgICAgcmVzcG9uc2UgKz0gYCBZb3UgY2FuIHNlbmQgJyR7Y2hlY2tpbl9tb2RlLmZhc3RfY2hlY2tpbnNbMF19JyBhcyB5b3VyIGZpcnN0IG1lc3NhZ2UgZm9yIGEgZmFzdCAke2NoZWNraW5fbW9kZS5zaGVldHNfdmFsdWV9IGNoZWNraW4gbmV4dCB0aW1lLmA7XG4gICAgICAgIH1cbiAgICAgICAgcmVzcG9uc2UgKz0gXCJcXG5cXG5cIiArIChhd2FpdCB0aGlzLmdldF9zdGF0dXNfc3RyaW5nKCkpO1xuICAgICAgICByZXR1cm4geyByZXNwb25zZTogcmVzcG9uc2UgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdGhlIEdvb2dsZSBTaGVldHMgbmVlZHMgdG8gYmUgcmVzZXQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRydWUgaWYgdGhlIHNoZWV0IG5lZWRzIHRvIGJlIHJlc2V0LCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICovXG4gICAgYXN5bmMgc2hlZXRfbmVlZHNfcmVzZXQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKTtcblxuICAgICAgICBjb25zdCBzaGVldF9kYXRlID0gbG9naW5fc2hlZXQuc2hlZXRfZGF0ZTtcbiAgICAgICAgY29uc3QgY3VycmVudF9kYXRlID0gbG9naW5fc2hlZXQuY3VycmVudF9kYXRlO1xuICAgICAgICBjb25zb2xlLmxvZyhgc2hlZXRfZGF0ZTogJHtzaGVldF9kYXRlfWApO1xuICAgICAgICBjb25zb2xlLmxvZyhgY3VycmVudF9kYXRlOiAke2N1cnJlbnRfZGF0ZX1gKTtcblxuICAgICAgICBjb25zb2xlLmxvZyhgZGF0ZV9pc19jdXJyZW50OiAke2xvZ2luX3NoZWV0LmlzX2N1cnJlbnR9YCk7XG5cbiAgICAgICAgcmV0dXJuICFsb2dpbl9zaGVldC5pc19jdXJyZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc2V0cyB0aGUgR29vZ2xlIFNoZWV0cyBmbG93LCBpbmNsdWRpbmcgYXJjaGl2aW5nIGFuZCByZXNldHRpbmcgdGhlIHNoZWV0IGlmIG5lY2Vzc2FyeS5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlIHwgdm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGNoZWNrLWluIHJlc3BvbnNlIG9yIHZvaWQuXG4gICAgICovXG4gICAgYXN5bmMgcmVzZXRfc2hlZXRfZmxvdygpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2UgfCB2b2lkPiB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5jaGVja191c2VyX2NyZWRzKFxuICAgICAgICAgICAgYCR7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXIhLm5hbWVcbiAgICAgICAgICAgIH0sIGluIG9yZGVyIHRvIHJlc2V0L2FyY2hpdmUsIEkgbmVlZCB5b3UgdG8gYXV0aG9yaXplIHRoZSBhcHAuYFxuICAgICAgICApO1xuICAgICAgICBpZiAocmVzcG9uc2UpXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiByZXNwb25zZS5yZXNwb25zZSxcbiAgICAgICAgICAgICAgICBuZXh0X3N0ZXA6IGAke05FWFRfU1RFUFMuQVVUSF9SRVNFVH0tJHt0aGlzLmNoZWNraW5fbW9kZX1gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucmVzZXRfc2hlZXQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXNldHMgdGhlIEdvb2dsZSBTaGVldHMsIGluY2x1ZGluZyBhcmNoaXZpbmcgYW5kIHJlc2V0dGluZyB0aGUgc2hlZXQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHNoZWV0IGlzIHJlc2V0LlxuICAgICAqL1xuICAgIGFzeW5jIHJlc2V0X3NoZWV0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCBzY3JpcHRfc2VydmljZSA9IGF3YWl0IHRoaXMuZ2V0X3VzZXJfc2NyaXB0c19zZXJ2aWNlKCk7XG4gICAgICAgIGNvbnN0IHNob3VsZF9wZXJmb3JtX2FyY2hpdmUgPSAhKGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCkpLmFyY2hpdmVkO1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gc2hvdWxkX3BlcmZvcm1fYXJjaGl2ZVxuICAgICAgICAgICAgPyBcIk9rYXkuIEFyY2hpdmluZyBhbmQgcmVzZXR0aW5nIHRoZSBjaGVjayBpbiBzaGVldC4gVGhpcyB0YWtlcyBhYm91dCAxMCBzZWNvbmRzLi4uXCJcbiAgICAgICAgICAgIDogXCJPa2F5LiBTaGVldCBoYXMgYWxyZWFkeSBiZWVuIGFyY2hpdmVkLiBQZXJmb3JtaW5nIHJlc2V0LiBUaGlzIHRha2VzIGFib3V0IDUgc2Vjb25kcy4uLlwiO1xuICAgICAgICBhd2FpdCB0aGlzLnNlbmRfbWVzc2FnZShtZXNzYWdlKTtcbiAgICAgICAgaWYgKHNob3VsZF9wZXJmb3JtX2FyY2hpdmUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQXJjaGl2aW5nLi4uXCIpO1xuXG4gICAgICAgICAgICBhd2FpdCBzY3JpcHRfc2VydmljZS5zY3JpcHRzLnJ1bih7XG4gICAgICAgICAgICAgICAgc2NyaXB0SWQ6IHRoaXMucmVzZXRfc2NyaXB0X2lkLFxuICAgICAgICAgICAgICAgIHJlcXVlc3RCb2R5OiB7IGZ1bmN0aW9uOiB0aGlzLmNvbmZpZy5BUkNISVZFX0ZVTkNUSU9OX05BTUUgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5kZWxheSg1KTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubG9nX2FjdGlvbihcImFyY2hpdmVcIik7XG4gICAgICAgICAgICB0aGlzLmxvZ2luX3NoZWV0ID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVzZXR0aW5nLi4uXCIpO1xuICAgICAgICBhd2FpdCBzY3JpcHRfc2VydmljZS5zY3JpcHRzLnJ1bih7XG4gICAgICAgICAgICBzY3JpcHRJZDogdGhpcy5yZXNldF9zY3JpcHRfaWQsXG4gICAgICAgICAgICByZXF1ZXN0Qm9keTogeyBmdW5jdGlvbjogdGhpcy5jb25maWcuUkVTRVRfRlVOQ1RJT05fTkFNRSB9LFxuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgdGhpcy5kZWxheSg1KTtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKFwicmVzZXRcIik7XG4gICAgICAgIGF3YWl0IHRoaXMuc2VuZF9tZXNzYWdlKFwiRG9uZS5cIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgR29vZ2xlIEFwcHMgU2NyaXB0IHNlcnZpY2UuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c2NyaXB0X3YxLlNjcmlwdD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIEdvb2dsZSBBcHBzIFNjcmlwdCBzZXJ2aWNlLlxuICAgICAqL1xuICAgIGFzeW5jIGNoZWNrX3VzZXJfY3JlZHMoXG4gICAgICAgIHByb21wdF9tZXNzYWdlOiBzdHJpbmcgPSBcIkhpLCBiZWZvcmUgeW91IGNhbiB1c2UgQlZOU1AgYm90LCB5b3UgbXVzdCBsb2dpbi5cIlxuICAgICk6IFByb21pc2U8QlZOU1BSZXNwb25zZSB8IHVuZGVmaW5lZD4ge1xuICAgICAgICBjb25zdCB1c2VyX2NyZWRzID0gdGhpcy5nZXRfdXNlcl9jcmVkcygpO1xuICAgICAgICBpZiAoIShhd2FpdCB1c2VyX2NyZWRzLmxvYWRUb2tlbigpKSkge1xuICAgICAgICAgICAgY29uc3QgYXV0aFVybCA9IGF3YWl0IHVzZXJfY3JlZHMuZ2V0QXV0aFVybCgpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYCR7cHJvbXB0X21lc3NhZ2V9IFBsZWFzZSBmb2xsb3cgdGhpcyBsaW5rOlxuJHthdXRoVXJsfVxuXG5NZXNzYWdlIG1lIGFnYWluIHdoZW4gZG9uZS5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIEdvb2dsZSBBcHBzIFNjcmlwdCBzZXJ2aWNlLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHNjcmlwdF92MS5TY3JpcHQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBHb29nbGUgQXBwcyBTY3JpcHQgc2VydmljZS5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfb25fZHV0eSgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zdCBjaGVja2VkX291dF9zZWN0aW9uID0gXCJDaGVja2VkIE91dFwiO1xuICAgICAgICBjb25zdCBsYXN0X3NlY3Rpb25zID0gW2NoZWNrZWRfb3V0X3NlY3Rpb25dO1xuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG5cbiAgICAgICAgY29uc3Qgb25fZHV0eV9wYXRyb2xsZXJzID0gbG9naW5fc2hlZXQuZ2V0X29uX2R1dHlfcGF0cm9sbGVycygpO1xuICAgICAgICBjb25zdCBieV9zZWN0aW9uID0gb25fZHV0eV9wYXRyb2xsZXJzXG4gICAgICAgICAgICAuZmlsdGVyKCh4KSA9PiB4LmNoZWNraW4pXG4gICAgICAgICAgICAucmVkdWNlKChwcmV2OiB7IFtrZXk6IHN0cmluZ106IFBhdHJvbGxlclJvd1tdIH0sIGN1cikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNob3J0X2NvZGUgPVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNraW5fdmFsdWVzLmJ5X3NoZWV0X3N0cmluZ1tjdXIuY2hlY2tpbl0ua2V5O1xuICAgICAgICAgICAgICAgIGxldCBzZWN0aW9uID0gY3VyLnNlY3Rpb247XG4gICAgICAgICAgICAgICAgaWYgKHNob3J0X2NvZGUgPT0gXCJvdXRcIikge1xuICAgICAgICAgICAgICAgICAgICBzZWN0aW9uID0gY2hlY2tlZF9vdXRfc2VjdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCEoc2VjdGlvbiBpbiBwcmV2KSkge1xuICAgICAgICAgICAgICAgICAgICBwcmV2W3NlY3Rpb25dID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHByZXZbc2VjdGlvbl0ucHVzaChjdXIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgICAgICAgfSwge30pO1xuICAgICAgICBsZXQgcmVzdWx0czogc3RyaW5nW11bXSA9IFtdO1xuICAgICAgICBsZXQgYWxsX2tleXMgPSBPYmplY3Qua2V5cyhieV9zZWN0aW9uKTtcbiAgICAgICAgY29uc3Qgb3JkZXJlZF9wcmltYXJ5X3NlY3Rpb25zID0gT2JqZWN0LmtleXMoYnlfc2VjdGlvbilcbiAgICAgICAgICAgIC5maWx0ZXIoKHgpID0+ICFsYXN0X3NlY3Rpb25zLmluY2x1ZGVzKHgpKVxuICAgICAgICAgICAgLnNvcnQoKTtcbiAgICAgICAgY29uc3QgZmlsdGVyZWRfbGFzdF9zZWN0aW9ucyA9IGxhc3Rfc2VjdGlvbnMuZmlsdGVyKCh4KSA9PlxuICAgICAgICAgICAgYWxsX2tleXMuaW5jbHVkZXMoeClcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3Qgb3JkZXJlZF9zZWN0aW9ucyA9IG9yZGVyZWRfcHJpbWFyeV9zZWN0aW9ucy5jb25jYXQoXG4gICAgICAgICAgICBmaWx0ZXJlZF9sYXN0X3NlY3Rpb25zXG4gICAgICAgICk7XG5cbiAgICAgICAgZm9yIChjb25zdCBzZWN0aW9uIG9mIG9yZGVyZWRfc2VjdGlvbnMpIHtcbiAgICAgICAgICAgIGxldCByZXN1bHQ6IHN0cmluZ1tdID0gW107XG4gICAgICAgICAgICBjb25zdCBwYXRyb2xsZXJzID0gYnlfc2VjdGlvbltzZWN0aW9uXS5zb3J0KCh4LCB5KSA9PlxuICAgICAgICAgICAgICAgIHgubmFtZS5sb2NhbGVDb21wYXJlKHkubmFtZSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoc2VjdGlvbi5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChcIlNlY3Rpb24gXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0LnB1c2goYCR7c2VjdGlvbn06IGApO1xuICAgICAgICAgICAgZnVuY3Rpb24gcGF0cm9sbGVyX3N0cmluZyhuYW1lOiBzdHJpbmcsIHNob3J0X2NvZGU6IHN0cmluZykge1xuICAgICAgICAgICAgICAgIGxldCBkZXRhaWxzID0gXCJcIjtcbiAgICAgICAgICAgICAgICBpZiAoc2hvcnRfY29kZSAhPT0gXCJkYXlcIiAmJiBzaG9ydF9jb2RlICE9PSBcIm91dFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGRldGFpbHMgPSBgICgke3Nob3J0X2NvZGUudG9VcHBlckNhc2UoKX0pYDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke25hbWV9JHtkZXRhaWxzfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQucHVzaChcbiAgICAgICAgICAgICAgICBwYXRyb2xsZXJzXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKHgpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRyb2xsZXJfc3RyaW5nKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHgubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNraW5fdmFsdWVzLmJ5X3NoZWV0X3N0cmluZ1t4LmNoZWNraW5dLmtleVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5qb2luKFwiLCBcIilcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oXCJvbi1kdXR5XCIpO1xuICAgICAgICByZXR1cm4gYFBhdHJvbGxlcnMgZm9yICR7bG9naW5fc2hlZXQuc2hlZXRfZGF0ZS50b0RhdGVTdHJpbmcoKX0gKFRvdGFsOiAke1xuICAgICAgICAgICAgb25fZHV0eV9wYXRyb2xsZXJzLmxlbmd0aFxuICAgICAgICB9KTpcXG4ke3Jlc3VsdHMubWFwKChyKSA9PiByLmpvaW4oXCJcIikpLmpvaW4oXCJcXG5cIil9YDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2dzIGFuIGFjdGlvbiB0byB0aGUgR29vZ2xlIFNoZWV0cy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYWN0aW9uX25hbWUgLSBUaGUgbmFtZSBvZiB0aGUgYWN0aW9uIHRvIGxvZy5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgYWN0aW9uIGlzIGxvZ2dlZC5cbiAgICAgKi9cbiAgICBhc3luYyBsb2dfYWN0aW9uKGFjdGlvbl9uYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3Qgc2hlZXRzX3NlcnZpY2UgPSBhd2FpdCB0aGlzLmdldF9zaGVldHNfc2VydmljZSgpO1xuICAgICAgICBhd2FpdCBzaGVldHNfc2VydmljZS5zcHJlYWRzaGVldHMudmFsdWVzLmFwcGVuZCh7XG4gICAgICAgICAgICBzcHJlYWRzaGVldElkOiB0aGlzLmNvbWJpbmVkX2NvbmZpZy5TSEVFVF9JRCxcbiAgICAgICAgICAgIHJhbmdlOiB0aGlzLmNvbmZpZy5BQ1RJT05fTE9HX1NIRUVULFxuICAgICAgICAgICAgdmFsdWVJbnB1dE9wdGlvbjogXCJVU0VSX0VOVEVSRURcIixcbiAgICAgICAgICAgIHJlcXVlc3RCb2R5OiB7XG4gICAgICAgICAgICAgICAgdmFsdWVzOiBbW3RoaXMucGF0cm9sbGVyIS5uYW1lLCBuZXcgRGF0ZSgpLCBhY3Rpb25fbmFtZV1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9ncyBvdXQgdGhlIHVzZXIuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGxvZ291dCByZXNwb25zZS5cbiAgICAgKi9cbiAgICBhc3luYyBsb2dvdXQoKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnN0IHVzZXJfY3JlZHMgPSB0aGlzLmdldF91c2VyX2NyZWRzKCk7XG4gICAgICAgIGF3YWl0IHVzZXJfY3JlZHMuZGVsZXRlVG9rZW4oKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3BvbnNlOiBcIk9rYXksIEkgaGF2ZSByZW1vdmVkIGFsbCBsb2dpbiBzZXNzaW9uIGluZm9ybWF0aW9uLlwiLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIFR3aWxpbyBjbGllbnQuXG4gICAgICogQHJldHVybnMge1R3aWxpb0NsaWVudH0gVGhlIFR3aWxpbyBjbGllbnQuXG4gICAgICovXG4gICAgZ2V0X3R3aWxpb19jbGllbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnR3aWxpb19jbGllbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHdpbGlvX2NsaWVudCB3YXMgbmV2ZXIgaW5pdGlhbGl6ZWQhXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnR3aWxpb19jbGllbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgVHdpbGlvIFN5bmMgY2xpZW50LlxuICAgICAqIEByZXR1cm5zIHtTZXJ2aWNlQ29udGV4dH0gVGhlIFR3aWxpbyBTeW5jIGNsaWVudC5cbiAgICAgKi9cbiAgICBnZXRfc3luY19jbGllbnQoKSB7XG4gICAgICAgIGlmICghdGhpcy5zeW5jX2NsaWVudCkge1xuICAgICAgICAgICAgdGhpcy5zeW5jX2NsaWVudCA9IHRoaXMuZ2V0X3R3aWxpb19jbGllbnQoKS5zeW5jLnYxLnNlcnZpY2VzKFxuICAgICAgICAgICAgICAgIHRoaXMuc3luY19zaWRcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc3luY19jbGllbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgdXNlciBjcmVkZW50aWFscy5cbiAgICAgKiBAcmV0dXJucyB7VXNlckNyZWRzfSBUaGUgdXNlciBjcmVkZW50aWFscy5cbiAgICAgKi9cbiAgICBnZXRfdXNlcl9jcmVkcygpIHtcbiAgICAgICAgaWYgKCF0aGlzLnVzZXJfY3JlZHMpIHtcbiAgICAgICAgICAgIHRoaXMudXNlcl9jcmVkcyA9IG5ldyBVc2VyQ3JlZHMoXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRfc3luY19jbGllbnQoKSxcbiAgICAgICAgICAgICAgICB0aGlzLmZyb20sXG4gICAgICAgICAgICAgICAgdGhpcy5jb21iaW5lZF9jb25maWdcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudXNlcl9jcmVkcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBzZXJ2aWNlIGNyZWRlbnRpYWxzLlxuICAgICAqIEByZXR1cm5zIHtHb29nbGVBdXRofSBUaGUgc2VydmljZSBjcmVkZW50aWFscy5cbiAgICAgKi9cbiAgICBnZXRfc2VydmljZV9jcmVkcygpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNlcnZpY2VfY3JlZHMpIHtcbiAgICAgICAgICAgIHRoaXMuc2VydmljZV9jcmVkcyA9IG5ldyBnb29nbGUuYXV0aC5Hb29nbGVBdXRoKHtcbiAgICAgICAgICAgICAgICBrZXlGaWxlOiBnZXRfc2VydmljZV9jcmVkZW50aWFsc19wYXRoKCksXG4gICAgICAgICAgICAgICAgc2NvcGVzOiB0aGlzLlNDT1BFUyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2VfY3JlZHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgdmFsaWQgY3JlZGVudGlhbHMuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbcmVxdWlyZV91c2VyX2NyZWRzPWZhbHNlXSAtIFdoZXRoZXIgdXNlciBjcmVkZW50aWFscyBhcmUgcmVxdWlyZWQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8R29vZ2xlQXV0aD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHZhbGlkIGNyZWRlbnRpYWxzLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF92YWxpZF9jcmVkcyhyZXF1aXJlX3VzZXJfY3JlZHM6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBpZiAodGhpcy5jb25maWcuVVNFX1NFUlZJQ0VfQUNDT1VOVCAmJiAhcmVxdWlyZV91c2VyX2NyZWRzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRfc2VydmljZV9jcmVkcygpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVzZXJfY3JlZHMgPSB0aGlzLmdldF91c2VyX2NyZWRzKCk7XG4gICAgICAgIGlmICghKGF3YWl0IHVzZXJfY3JlZHMubG9hZFRva2VuKCkpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVc2VyIGlzIG5vdCBhdXRoZWQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVXNpbmcgdXNlciBhY2NvdW50IGZvciBzZXJ2aWNlIGF1dGguLi5cIik7XG4gICAgICAgIHJldHVybiB1c2VyX2NyZWRzLm9hdXRoMl9jbGllbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgR29vZ2xlIFNoZWV0cyBzZXJ2aWNlLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHNoZWV0c192NC5TaGVldHM+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBHb29nbGUgU2hlZXRzIHNlcnZpY2UuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3NoZWV0c19zZXJ2aWNlKCkge1xuICAgICAgICBpZiAoIXRoaXMuc2hlZXRzX3NlcnZpY2UpIHtcbiAgICAgICAgICAgIHRoaXMuc2hlZXRzX3NlcnZpY2UgPSBnb29nbGUuc2hlZXRzKHtcbiAgICAgICAgICAgICAgICB2ZXJzaW9uOiBcInY0XCIsXG4gICAgICAgICAgICAgICAgYXV0aDogYXdhaXQgdGhpcy5nZXRfdmFsaWRfY3JlZHMoKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNoZWV0c19zZXJ2aWNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGxvZ2luIHNoZWV0LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPExvZ2luU2hlZXQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBsb2dpbiBzaGVldFxuICAgICAqL1xuICAgIGFzeW5jIGdldF9sb2dpbl9zaGVldCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmxvZ2luX3NoZWV0KSB7XG4gICAgICAgICAgICBjb25zdCBsb2dpbl9zaGVldF9jb25maWc6IExvZ2luU2hlZXRDb25maWcgPSB0aGlzLmNvbWJpbmVkX2NvbmZpZztcbiAgICAgICAgICAgIGNvbnN0IHNoZWV0c19zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfc2hlZXRzX3NlcnZpY2UoKTtcbiAgICAgICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gbmV3IExvZ2luU2hlZXQoXG4gICAgICAgICAgICAgICAgc2hlZXRzX3NlcnZpY2UsXG4gICAgICAgICAgICAgICAgbG9naW5fc2hlZXRfY29uZmlnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYXdhaXQgbG9naW5fc2hlZXQucmVmcmVzaCgpO1xuICAgICAgICAgICAgdGhpcy5sb2dpbl9zaGVldCA9IGxvZ2luX3NoZWV0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmxvZ2luX3NoZWV0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHNlYXNvbiBzaGVldC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxTZWFzb25TaGVldD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHNlYXNvbiBzaGVldFxuICAgICAqL1xuICAgIGFzeW5jIGdldF9zZWFzb25fc2hlZXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5zZWFzb25fc2hlZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IHNlYXNvbl9zaGVldF9jb25maWc6IFNlYXNvblNoZWV0Q29uZmlnID0gdGhpcy5jb21iaW5lZF9jb25maWc7XG4gICAgICAgICAgICBjb25zdCBzaGVldHNfc2VydmljZSA9IGF3YWl0IHRoaXMuZ2V0X3NoZWV0c19zZXJ2aWNlKCk7XG4gICAgICAgICAgICBjb25zdCBzZWFzb25fc2hlZXQgPSBuZXcgU2Vhc29uU2hlZXQoXG4gICAgICAgICAgICAgICAgc2hlZXRzX3NlcnZpY2UsXG4gICAgICAgICAgICAgICAgc2Vhc29uX3NoZWV0X2NvbmZpZ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuc2Vhc29uX3NoZWV0ID0gc2Vhc29uX3NoZWV0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNlYXNvbl9zaGVldDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBndWVzdCBwYXNzIHNoZWV0LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEd1ZXN0UGFzc1NoZWV0Pn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgZ3Vlc3QgcGFzcyBzaGVldFxuICAgICAqL1xuICAgIGFzeW5jIGdldF9ndWVzdF9wYXNzX3NoZWV0KCkge1xuICAgICAgICBpZiAoIXRoaXMuZ3Vlc3RfcGFzc19zaGVldCkge1xuICAgICAgICAgICAgY29uc3QgY29uZmlnOiBHdWVzdFBhc3Nlc0NvbmZpZyA9IHRoaXMuY29tYmluZWRfY29uZmlnO1xuICAgICAgICAgICAgY29uc3Qgc2hlZXRzX3NlcnZpY2UgPSBhd2FpdCB0aGlzLmdldF9zaGVldHNfc2VydmljZSgpO1xuICAgICAgICAgICAgdGhpcy5ndWVzdF9wYXNzX3NoZWV0ID0gbmV3IEd1ZXN0UGFzc1NoZWV0KHNoZWV0c19zZXJ2aWNlLCBjb25maWcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmd1ZXN0X3Bhc3Nfc2hlZXQ7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBHb29nbGUgQXBwcyBTY3JpcHQgc2VydmljZS5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzY3JpcHRfdjEuU2NyaXB0Pn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgR29vZ2xlIEFwcHMgU2NyaXB0IHNlcnZpY2UuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3VzZXJfc2NyaXB0c19zZXJ2aWNlKCkge1xuICAgICAgICBpZiAoIXRoaXMudXNlcl9zY3JpcHRzX3NlcnZpY2UpIHtcbiAgICAgICAgICAgIHRoaXMudXNlcl9zY3JpcHRzX3NlcnZpY2UgPSBnb29nbGUuc2NyaXB0KHtcbiAgICAgICAgICAgICAgICB2ZXJzaW9uOiBcInYxXCIsXG4gICAgICAgICAgICAgICAgYXV0aDogYXdhaXQgdGhpcy5nZXRfdmFsaWRfY3JlZHModHJ1ZSksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy51c2VyX3NjcmlwdHNfc2VydmljZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBtYXBwZWQgcGF0cm9sbGVyLlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2ZvcmNlPWZhbHNlXSAtIFdoZXRoZXIgdG8gZm9yY2UgdGhlIHBhdHJvbGxlciB0byBiZSBmb3VuZC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlIHwgdm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHJlc3BvbnNlIG9yIHZvaWQuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X21hcHBlZF9wYXRyb2xsZXIoZm9yY2U6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBjb25zdCBwaG9uZV9sb29rdXAgPSBhd2FpdCB0aGlzLmZpbmRfcGF0cm9sbGVyX2Zyb21fbnVtYmVyKCk7XG4gICAgICAgIGlmIChwaG9uZV9sb29rdXAgPT09IHVuZGVmaW5lZCB8fCBwaG9uZV9sb29rdXAgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChmb3JjZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBmaW5kIGFzc29jaWF0ZWQgdXNlclwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBTb3JyeSwgSSBjb3VsZG4ndCBmaW5kIGFuIGFzc29jaWF0ZWQgQlZOU1AgbWVtYmVyIHdpdGggeW91ciBwaG9uZSBudW1iZXIgKCR7dGhpcy5mcm9tfSlgLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKTtcbiAgICAgICAgY29uc3QgbWFwcGVkUGF0cm9sbGVyID0gbG9naW5fc2hlZXQudHJ5X2ZpbmRfcGF0cm9sbGVyKFxuICAgICAgICAgICAgcGhvbmVfbG9va3VwLm5hbWVcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKG1hcHBlZFBhdHJvbGxlciA9PT0gXCJub3RfZm91bmRcIikge1xuICAgICAgICAgICAgaWYgKGZvcmNlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IHBhdHJvbGxlciBpbiBsb2dpbiBzaGVldFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBDb3VsZCBub3QgZmluZCBwYXRyb2xsZXIgJyR7cGhvbmVfbG9va3VwLm5hbWV9JyBpbiBsb2dpbiBzaGVldC4gUGxlYXNlIGxvb2sgYXQgdGhlIGxvZ2luIHNoZWV0IG5hbWUsIGFuZCBjb3B5IGl0IHRvIHRoZSBQaG9uZSBOdW1iZXJzIHRhYi5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1cnJlbnRfc2hlZXRfZGF0ZSA9IGxvZ2luX3NoZWV0LmN1cnJlbnRfZGF0ZTtcbiAgICAgICAgdGhpcy5wYXRyb2xsZXIgPSBtYXBwZWRQYXRyb2xsZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmluZHMgdGhlIHBhdHJvbGxlciBmcm9tIHRoZSBwaG9uZSBudW1iZXIuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8UGF0cm9sbGVyUm93Pn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcGF0cm9sbGVyLlxuICAgICAqL1xuICAgIGFzeW5jIGZpbmRfcGF0cm9sbGVyX2Zyb21fbnVtYmVyKCkge1xuICAgICAgICBjb25zdCByYXdfbnVtYmVyID0gdGhpcy5mcm9tO1xuICAgICAgICBjb25zdCBzaGVldHNfc2VydmljZSA9IGF3YWl0IHRoaXMuZ2V0X3NoZWV0c19zZXJ2aWNlKCk7XG4gICAgICAgIGNvbnN0IG9wdHM6IEZpbmRQYXRyb2xsZXJDb25maWcgPSB0aGlzLmNvbWJpbmVkX2NvbmZpZztcbiAgICAgICAgY29uc3QgbnVtYmVyID0gc2FuaXRpemVfcGhvbmVfbnVtYmVyKHJhd19udW1iZXIpO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHNoZWV0c19zZXJ2aWNlLnNwcmVhZHNoZWV0cy52YWx1ZXMuZ2V0KHtcbiAgICAgICAgICAgIHNwcmVhZHNoZWV0SWQ6IG9wdHMuU0hFRVRfSUQsXG4gICAgICAgICAgICByYW5nZTogb3B0cy5QSE9ORV9OVU1CRVJfTE9PS1VQX1NIRUVULFxuICAgICAgICAgICAgdmFsdWVSZW5kZXJPcHRpb246IFwiVU5GT1JNQVRURURfVkFMVUVcIixcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghcmVzcG9uc2UuZGF0YS52YWx1ZXMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBmaW5kIHBhdHJvbGxlci5cIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGF0cm9sbGVyID0gcmVzcG9uc2UuZGF0YS52YWx1ZXNcbiAgICAgICAgICAgIC5tYXAoKHJvdykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJhd051bWJlciA9XG4gICAgICAgICAgICAgICAgICAgIHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5QSE9ORV9OVU1CRVJfTlVNQkVSX0NPTFVNTildO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnROdW1iZXIgPVxuICAgICAgICAgICAgICAgICAgICByYXdOdW1iZXIgIT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHNhbml0aXplX3Bob25lX251bWJlcihyYXdOdW1iZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHJhd051bWJlcjtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50TmFtZSA9XG4gICAgICAgICAgICAgICAgICAgIHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5QSE9ORV9OVU1CRVJfTkFNRV9DT0xVTU4pXTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBuYW1lOiBjdXJyZW50TmFtZSwgbnVtYmVyOiBjdXJyZW50TnVtYmVyIH07XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmZpbHRlcigocGF0cm9sbGVyKSA9PiBwYXRyb2xsZXIubnVtYmVyID09PSBudW1iZXIpWzBdO1xuICAgICAgICByZXR1cm4gcGF0cm9sbGVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb21wdHMgdGhlIHVzZXIgZm9yIGEgY29tcCBvciBtYW5hZ2VyIHBhc3MuXG4gICAgICogV2UgZG8gbm90IHJlcXVpcmUgYSBndWVzdCBuYW1lIGluIHRoZSBTTVMgZmxvdzsgdGhpcyByZXR1cm5zIHRoZSBzdGF0dXMvcHJvbXB0XG4gICAgICogZm9yIGd1ZXN0IHBhc3NlcyBzbyB0aGUgR3Vlc3QgUGFzcyBjb21tYW5kIGJlaGF2ZXMgbGlrZSBvdGhlciBpbW1lZGlhdGUgYWN0aW9ucy5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcmVzcG9uc2UuXG4gICAgICovXG4gICAgYXN5bmMgcHJvbXB0X2d1ZXN0X3Bhc3MoKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlPiB7XG4gICAgICAgIC8vIEFsbG93IGFsbCBwYXRyb2xsZXJzIChpbmNsdWRpbmcgY2FuZGlkYXRlcykgdG8gdXNlIGd1ZXN0IHBhc3NlcyB3aGVuIGF2YWlsYWJsZS5cbiAgICAgICAgY29uc3Qgc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9ndWVzdF9wYXNzX3NoZWV0KCk7XG4gICAgICAgIGNvbnN0IHVzZWRfYW5kX2F2YWlsYWJsZSA9IGF3YWl0IHNoZWV0LmdldF9hdmFpbGFibGVfYW5kX3VzZWRfcGFzc2VzKHRoaXMucGF0cm9sbGVyIS5uYW1lKTtcbiAgICAgICAgaWYgKHVzZWRfYW5kX2F2YWlsYWJsZSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4geyByZXNwb25zZTogXCJQcm9ibGVtIGxvb2tpbmcgdXAgcGF0cm9sbGVyIGZvciBndWVzdCBwYXNzZXNcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgdGhlcmUgYXJlIG5vIGF2YWlsYWJsZSBwYXNzZXMgdG9kYXksIHJldHVybiB0aGUgcHJvbXB0IGluZGljYXRpbmcgbm9uZSBhcmUgYXZhaWxhYmxlLlxuICAgICAgICBpZiAodXNlZF9hbmRfYXZhaWxhYmxlLmF2YWlsYWJsZSA8IDEpIHtcbiAgICAgICAgICAgIHJldHVybiB1c2VkX2FuZF9hdmFpbGFibGUuZ2V0X3Byb21wdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ29uc3VtZSBvbmUgYXZhaWxhYmxlIHBhc3MgKHRoZSBzaGVldCByZWNvcmRzIG9ubHkgdGhlIGRhdGUgb2YgdXNlKS5cbiAgICAgICAgYXdhaXQgc2hlZXQuc2V0X3VzZWRfZ3Vlc3RfcGFzc2VzKHVzZWRfYW5kX2F2YWlsYWJsZSk7XG5cbiAgICAgICAgLy8gUmUtcmVhZCB0aGUgdmFsdWVzIGFuZCByZXR1cm4gY29uZmlybWF0aW9uICsgdXBkYXRlZCBzdGF0dXMuXG4gICAgICAgIGNvbnN0IHVwZGF0ZWQgPSBhd2FpdCBzaGVldC5nZXRfYXZhaWxhYmxlX2FuZF91c2VkX3Bhc3Nlcyh0aGlzLnBhdHJvbGxlciEubmFtZSk7XG4gICAgICAgIGlmICh1cGRhdGVkID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHJlc3BvbnNlOiBgVXBkYXRlZCAke3RoaXMucGF0cm9sbGVyIS5uYW1lfSB0byB1c2UgYSBndWVzdCBwYXNzIHRvZGF5LmAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHN0YXR1cyA9IGJ1aWxkX3Bhc3Nlc19zdHJpbmcoXG4gICAgICAgICAgICB1cGRhdGVkLnVzZWRfc2Vhc29uLFxuICAgICAgICAgICAgdXBkYXRlZC51c2VkX3NlYXNvbiArIHVwZGF0ZWQuYXZhaWxhYmxlLFxuICAgICAgICAgICAgdXBkYXRlZC51c2VkX3RvZGF5XG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZTogYFVwZGF0ZWQgJHt0aGlzLnBhdHJvbGxlciEubmFtZX0gdG8gdXNlIGEgZ3Vlc3QgcGFzcyB0b2RheS5cXG4ke3N0YXR1c31gLFxuICAgICAgICB9O1xuICAgIH1cbn1cbiIsImltcG9ydCB7IHNoZWV0c192NCB9IGZyb20gXCJnb29nbGVhcGlzXCI7XG5pbXBvcnQgeyBHdWVzdFBhc3Nlc0NvbmZpZyB9IGZyb20gXCIuLi9lbnYvaGFuZGxlcl9jb25maWdcIjtcbmltcG9ydCB7IGV4Y2VsX3Jvd190b19pbmRleCwgcm93X2NvbF90b19leGNlbF9pbmRleCwgcGFyc2VfYm9vbGVhbl9jZWxsIH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxcIjtcbmltcG9ydCBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYiBmcm9tIFwiLi4vdXRpbHMvZ29vZ2xlX3NoZWV0c19zcHJlYWRzaGVldF90YWJcIjtcbmltcG9ydCB7IGZvcm1hdF9kYXRlX2Zvcl9zcHJlYWRzaGVldF92YWx1ZSB9IGZyb20gXCIuLi91dGlscy9kYXRldGltZV91dGlsXCI7XG5pbXBvcnQgeyBidWlsZF9wYXNzZXNfc3RyaW5nIH0gZnJvbSBcIi4uL3V0aWxzL2d1ZXN0X3Bhc3Nlc1wiO1xuaW1wb3J0IHsgQlZOU1BSZXNwb25zZSB9IGZyb20gXCIuLi9oYW5kbGVycy9idm5zcF9oYW5kbGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBVc2VkQW5kQXZhaWxhYmxlUGFzc2VzIHtcbiAgICByb3c6IGFueVtdO1xuICAgIGluZGV4OiBudW1iZXI7XG4gICAgYXZhaWxhYmxlOiBudW1iZXI7XG4gICAgdXNlZF90b2RheTogbnVtYmVyO1xuICAgIHVzZWRfc2Vhc29uOiBudW1iZXI7XG4gICAgZWxpZ2libGU6IGJvb2xlYW47XG4gICAgZWxpZ2libGVfcmVhc29uOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcm93OiBhbnlbXSxcbiAgICAgICAgaW5kZXg6IG51bWJlcixcbiAgICAgICAgZWxpZ2libGU6IGFueSxcbiAgICAgICAgZWxpZ2libGVfcmVhc29uOiBhbnksXG4gICAgICAgIGF2YWlsYWJsZTogYW55LFxuICAgICAgICB1c2VkX3RvZGF5OiBhbnksXG4gICAgICAgIHVzZWRfc2Vhc29uOiBhbnlcbiAgICApIHtcbiAgICAgICAgdGhpcy5yb3cgPSByb3c7XG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5lbGlnaWJsZSA9IHBhcnNlX2Jvb2xlYW5fY2VsbChlbGlnaWJsZSk7XG4gICAgICAgIHRoaXMuZWxpZ2libGVfcmVhc29uID0gU3RyaW5nKGVsaWdpYmxlX3JlYXNvbiA/PyBcIlwiKTtcbiAgICAgICAgdGhpcy5hdmFpbGFibGUgPSBOdW1iZXIoYXZhaWxhYmxlKTtcbiAgICAgICAgdGhpcy51c2VkX3RvZGF5ID0gTnVtYmVyKHVzZWRfdG9kYXkpO1xuICAgICAgICB0aGlzLnVzZWRfc2Vhc29uID0gTnVtYmVyKHVzZWRfc2Vhc29uKTtcbiAgICB9XG5cbiAgICBnZXRfcHJvbXB0KCk6IEJWTlNQUmVzcG9uc2Uge1xuICAgICAgICBpZiAodGhpcy5hdmFpbGFibGUgPiAwKSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGJ1aWxkX3Bhc3Nlc19zdHJpbmcoXG4gICAgICAgICAgICAgICAgdGhpcy51c2VkX3NlYXNvbixcbiAgICAgICAgICAgICAgICB0aGlzLmF2YWlsYWJsZSArIHRoaXMudXNlZF9zZWFzb24sXG4gICAgICAgICAgICAgICAgdGhpcy51c2VkX3RvZGF5LFxuICAgICAgICAgICAgICAgIHRydWVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuZWxpZ2libGUpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBZb3UgYXJlIG5vdCBlbGlnaWJsZSBmb3IgZ3Vlc3QgcGFzc2VzLiBSZWFzb246ICR7dGhpcy5lbGlnaWJsZV9yZWFzb259YCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3BvbnNlOiBcIllvdSBkbyBub3QgaGF2ZSBhbnkgZ3Vlc3QgcGFzc2VzIGF2YWlsYWJsZSB0b2RheVwiLFxuICAgICAgICB9O1xuICAgIH1cbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBhc3NTaGVldCB7XG4gICAgc2hlZXQ6IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiO1xuXG4gICAgY29uc3RydWN0b3Ioc2hlZXQ6IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiKSB7XG4gICAgICAgIHRoaXMuc2hlZXQgPSBzaGVldDtcbiAgICB9XG5cbiAgICBhYnN0cmFjdCBnZXQgZWxpZ2libGVfY29sdW1uKCk6IHN0cmluZztcbiAgICBhYnN0cmFjdCBnZXQgZWxpZ2libGVfcmVhc29uX2NvbHVtbigpOiBzdHJpbmc7XG4gICAgYWJzdHJhY3QgZ2V0IGF2YWlsYWJsZV9jb2x1bW4oKTogc3RyaW5nO1xuICAgIGFic3RyYWN0IGdldCB1c2VkX3RvZGF5X2NvbHVtbigpOiBzdHJpbmc7XG4gICAgYWJzdHJhY3QgZ2V0IHVzZWRfc2Vhc29uX2NvbHVtbigpOiBzdHJpbmc7XG4gICAgYWJzdHJhY3QgZ2V0IG5hbWVfY29sdW1uKCk6IHN0cmluZztcbiAgICBhYnN0cmFjdCBnZXQgc3RhcnRfaW5kZXgoKTogbnVtYmVyO1xuICAgIGFic3RyYWN0IGdldCBzaGVldF9uYW1lKCk6IHN0cmluZztcblxuICAgIGFzeW5jIGdldF9hdmFpbGFibGVfYW5kX3VzZWRfcGFzc2VzKFxuICAgICAgICBwYXRyb2xsZXJfbmFtZTogc3RyaW5nXG4gICAgKTogUHJvbWlzZTxVc2VkQW5kQXZhaWxhYmxlUGFzc2VzIHwgbnVsbD4ge1xuICAgICAgICBjb25zdCBwYXRyb2xsZXJfcm93ID0gYXdhaXQgdGhpcy5zaGVldC5nZXRfc2hlZXRfcm93X2Zvcl9wYXRyb2xsZXIoXG4gICAgICAgICAgICBwYXRyb2xsZXJfbmFtZSxcbiAgICAgICAgICAgIHRoaXMubmFtZV9jb2x1bW5cbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHBhdHJvbGxlcl9yb3cgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZWxpZ2libGUgPVxuICAgICAgICAgICAgcGF0cm9sbGVyX3Jvdy5yb3dbZXhjZWxfcm93X3RvX2luZGV4KHRoaXMuZWxpZ2libGVfY29sdW1uKV07XG4gICAgICAgIGNvbnN0IGVsaWdpYmxlX3JlYXNvbiA9XG4gICAgICAgICAgICBwYXRyb2xsZXJfcm93LnJvd1tleGNlbF9yb3dfdG9faW5kZXgodGhpcy5lbGlnaWJsZV9yZWFzb25fY29sdW1uKV07XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfZGF5X2F2YWlsYWJsZV9wYXNzZXMgPVxuICAgICAgICAgICAgcGF0cm9sbGVyX3Jvdy5yb3dbZXhjZWxfcm93X3RvX2luZGV4KHRoaXMuYXZhaWxhYmxlX2NvbHVtbildO1xuICAgICAgICBjb25zdCBjdXJyZW50X2RheV91c2VkX3Bhc3NlcyA9XG4gICAgICAgICAgICBwYXRyb2xsZXJfcm93LnJvd1tleGNlbF9yb3dfdG9faW5kZXgodGhpcy51c2VkX3RvZGF5X2NvbHVtbildO1xuICAgICAgICBjb25zdCBjdXJyZW50X3NlYXNvbl91c2VkX3Bhc3NlcyA9XG4gICAgICAgICAgICBwYXRyb2xsZXJfcm93LnJvd1tleGNlbF9yb3dfdG9faW5kZXgodGhpcy51c2VkX3NlYXNvbl9jb2x1bW4pXTtcbiAgICAgICAgcmV0dXJuIG5ldyBVc2VkQW5kQXZhaWxhYmxlUGFzc2VzKFxuICAgICAgICAgICAgcGF0cm9sbGVyX3Jvdy5yb3csXG4gICAgICAgICAgICBwYXRyb2xsZXJfcm93LmluZGV4LFxuICAgICAgICAgICAgZWxpZ2libGUsXG4gICAgICAgICAgICBlbGlnaWJsZV9yZWFzb24sXG4gICAgICAgICAgICBjdXJyZW50X2RheV9hdmFpbGFibGVfcGFzc2VzLFxuICAgICAgICAgICAgY3VycmVudF9kYXlfdXNlZF9wYXNzZXMsXG4gICAgICAgICAgICBjdXJyZW50X3NlYXNvbl91c2VkX3Bhc3Nlc1xuICAgICAgICApO1xuICAgIH1cblxuICAgIGFzeW5jIHNldF91c2VkX2d1ZXN0X3Bhc3NlcyhcbiAgICAgICAgcGF0cm9sbGVyX3JvdzogVXNlZEFuZEF2YWlsYWJsZVBhc3NlcyxcbiAgICApIHtcbiAgICAgICAgaWYgKCFwYXRyb2xsZXJfcm93LmVsaWdpYmxlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgYFBhdHJvbGxlciBpcyBub3QgZWxpZ2libGUgZm9yIGd1ZXN0IHBhc3Nlcy4gUmVhc29uOiAke3BhdHJvbGxlcl9yb3cuZWxpZ2libGVfcmVhc29ufWBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhdHJvbGxlcl9yb3cuYXZhaWxhYmxlIDwgMSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgIGBOb3QgZW5vdWdoIGF2YWlsYWJsZSBwYXNzZXM6IEF2YWlsYWJsZTogJHtwYXRyb2xsZXJfcm93LmF2YWlsYWJsZX0sIFVzZWQgdGhpcyBzZWFzb246ICAke3BhdHJvbGxlcl9yb3cudXNlZF9zZWFzb259LCBVc2VkIHRvZGF5OiAke3BhdHJvbGxlcl9yb3cudXNlZF90b2RheX1gXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgcm93bnVtID0gcGF0cm9sbGVyX3Jvdy5pbmRleDtcbiAgICAgICAgY29uc3Qgc3RhcnRfaW5kZXggPSB0aGlzLnN0YXJ0X2luZGV4O1xuICAgICAgICBjb25zdCBwcmlvcl9sZW5ndGggPSBwYXRyb2xsZXJfcm93LnJvdy5sZW5ndGggLSBzdGFydF9pbmRleDtcbiAgICAgICAgY29uc3QgY3VycmVudF9kYXRlX3N0cmluZyA9IGZvcm1hdF9kYXRlX2Zvcl9zcHJlYWRzaGVldF92YWx1ZShuZXcgRGF0ZSgpKTtcblxuICAgICAgICBjb25zdCBuZXdfdmFscyA9IHBhdHJvbGxlcl9yb3cucm93XG4gICAgICAgICAgICAuc2xpY2Uoc3RhcnRfaW5kZXgpXG4gICAgICAgICAgICAubWFwKCh4KSA9PiB4Py50b1N0cmluZygpKTtcblxuICAgICAgICAvLyBSZWNvcmQgb25seSB0aGUgZGF0ZSBvZiB0aGUgdXNlOyBubyBndWVzdCBuYW1lIGlzIHN0b3JlZC5cbiAgICAgICAgbmV3X3ZhbHMucHVzaChjdXJyZW50X2RhdGVfc3RyaW5nKTtcblxuICAgICAgICBjb25zdCB1cGRhdGVfbGVuZ3RoID0gTWF0aC5tYXgocHJpb3JfbGVuZ3RoLCBuZXdfdmFscy5sZW5ndGgpO1xuICAgICAgICB3aGlsZSAobmV3X3ZhbHMubGVuZ3RoIDwgdXBkYXRlX2xlbmd0aCkge1xuICAgICAgICAgICAgbmV3X3ZhbHMucHVzaChcIlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGVuZF9pbmRleCA9IHN0YXJ0X2luZGV4ICsgdXBkYXRlX2xlbmd0aCAtIDE7XG4gICAgICAgIGNvbnN0IHJhbmdlID0gYCR7dGhpcy5zaGVldC5zaGVldF9uYW1lfSEke3Jvd19jb2xfdG9fZXhjZWxfaW5kZXgoXG4gICAgICAgICAgICByb3dudW0sXG4gICAgICAgICAgICBzdGFydF9pbmRleFxuICAgICAgICApfToke3Jvd19jb2xfdG9fZXhjZWxfaW5kZXgocm93bnVtLCBlbmRfaW5kZXgpfWA7XG5cbiAgICAgICAgY29uc29sZS5sb2coYFVwZGF0aW5nICR7cmFuZ2V9IHdpdGggJHtuZXdfdmFscy5sZW5ndGh9IHZhbHVlc2ApO1xuICAgICAgICBhd2FpdCB0aGlzLnNoZWV0LnVwZGF0ZV92YWx1ZXMocmFuZ2UsIFtuZXdfdmFsc10pO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEd1ZXN0UGFzc1NoZWV0IGV4dGVuZHMgUGFzc1NoZWV0IHtcbiAgICBjb25maWc6IEd1ZXN0UGFzc2VzQ29uZmlnO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzIHwgbnVsbCxcbiAgICAgICAgY29uZmlnOiBHdWVzdFBhc3Nlc0NvbmZpZ1xuICAgICkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIG5ldyBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYihcbiAgICAgICAgICAgICAgICBzaGVldHNfc2VydmljZSxcbiAgICAgICAgICAgICAgICBjb25maWcuU0hFRVRfSUQsXG4gICAgICAgICAgICAgICAgY29uZmlnLkdVRVNUX1BBU1NfU0hFRVRcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gICAgfVxuXG4gICAgZ2V0IHN0YXJ0X2luZGV4KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBleGNlbF9yb3dfdG9faW5kZXgoXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5HVUVTVF9QQVNTX1NIRUVUX0RBVEVTX1NUQVJUSU5HX0NPTFVNTlxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldCBzaGVldF9uYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5HVUVTVF9QQVNTX1NIRUVUO1xuICAgIH1cblxuICAgIGdldCBlbGlnaWJsZV9jb2x1bW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLkdVRVNUX1BBU1NfRUxJR0lCTEVfQ09MVU1OO1xuICAgIH1cblxuICAgIGdldCBlbGlnaWJsZV9yZWFzb25fY29sdW1uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5HVUVTVF9QQVNTX0VMSUdJQkxFX1JFQVNPTl9DT0xVTU47XG4gICAgfVxuXG4gICAgZ2V0IGF2YWlsYWJsZV9jb2x1bW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLkdVRVNUX1BBU1NfU0hFRVRfQVZBSUxBQkxFX0NPTFVNTjtcbiAgICB9XG5cbiAgICBnZXQgdXNlZF90b2RheV9jb2x1bW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLkdVRVNUX1BBU1NfU0hFRVRfVVNFRF9UT0RBWV9DT0xVTU47XG4gICAgfVxuXG4gICAgZ2V0IHVzZWRfc2Vhc29uX2NvbHVtbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuR1VFU1RfUEFTU19TSEVFVF9VU0VEX1NFQVNPTl9DT0xVTU47XG4gICAgfVxuXG4gICAgZ2V0IG5hbWVfY29sdW1uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5HVUVTVF9QQVNTX1NIRUVUX05BTUVfQ09MVU1OO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IGxvb2t1cF9yb3dfY29sX2luX3NoZWV0LCBleGNlbF9yb3dfdG9faW5kZXggfSBmcm9tIFwiLi4vdXRpbHMvdXRpbFwiO1xuaW1wb3J0IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiIGZyb20gXCIuLi91dGlscy9nb29nbGVfc2hlZXRzX3NwcmVhZHNoZWV0X3RhYlwiO1xuaW1wb3J0IHsgc2FuaXRpemVfZGF0ZSB9IGZyb20gXCIuLi91dGlscy9kYXRldGltZV91dGlsXCI7XG5pbXBvcnQgeyBMb2dpblNoZWV0Q29uZmlnLCBQYXRyb2xsZXJSb3dDb25maWcgfSBmcm9tIFwiLi4vZW52L2hhbmRsZXJfY29uZmlnXCI7XG5pbXBvcnQgeyBzaGVldHNfdjQgfSBmcm9tIFwiZ29vZ2xlYXBpc1wiO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSByb3cgb2YgcGF0cm9sbGVyIGRhdGEuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBQYXRyb2xsZXJSb3dcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBpbmRleCAtIFRoZSBpbmRleCBvZiB0aGUgcm93LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcGF0cm9sbGVyLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IGNhdGVnb3J5IC0gVGhlIGNhdGVnb3J5IG9mIHRoZSBwYXRyb2xsZXIuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gc2VjdGlvbiAtIFRoZSBzZWN0aW9uIG9mIHRoZSBwYXRyb2xsZXIuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gY2hlY2tpbiAtIFRoZSBjaGVjay1pbiBzdGF0dXMgb2YgdGhlIHBhdHJvbGxlci5cbiAqL1xuZXhwb3J0IHR5cGUgUGF0cm9sbGVyUm93ID0ge1xuICAgIGluZGV4OiBudW1iZXI7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGNhdGVnb3J5OiBzdHJpbmc7XG4gICAgc2VjdGlvbjogc3RyaW5nO1xuICAgIGNoZWNraW46IHN0cmluZztcbn07XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGEgbG9naW4gc2hlZXQgaW4gR29vZ2xlIFNoZWV0cy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9naW5TaGVldCB7XG4gICAgbG9naW5fc2hlZXQ6IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiO1xuICAgIGNoZWNraW5fY291bnRfc2hlZXQ6IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiO1xuICAgIGNvbmZpZzogTG9naW5TaGVldENvbmZpZztcbiAgICByb3dzPzogYW55W11bXSB8IG51bGwgPSBudWxsO1xuICAgIGNoZWNraW5fY291bnQ6IG51bWJlciB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgICBwYXRyb2xsZXJzOiBQYXRyb2xsZXJSb3dbXSA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBMb2dpblNoZWV0LlxuICAgICAqIEBwYXJhbSB7c2hlZXRzX3Y0LlNoZWV0cyB8IG51bGx9IHNoZWV0c19zZXJ2aWNlIC0gVGhlIEdvb2dsZSBTaGVldHMgQVBJIHNlcnZpY2UuXG4gICAgICogQHBhcmFtIHtMb2dpblNoZWV0Q29uZmlnfSBjb25maWcgLSBUaGUgY29uZmlndXJhdGlvbiBmb3IgdGhlIGxvZ2luIHNoZWV0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyB8IG51bGwsXG4gICAgICAgIGNvbmZpZzogTG9naW5TaGVldENvbmZpZ1xuICAgICkge1xuICAgICAgICB0aGlzLmxvZ2luX3NoZWV0ID0gbmV3IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiKFxuICAgICAgICAgICAgc2hlZXRzX3NlcnZpY2UsXG4gICAgICAgICAgICBjb25maWcuU0hFRVRfSUQsXG4gICAgICAgICAgICBjb25maWcuTE9HSU5fU0hFRVRfTE9PS1VQXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY2hlY2tpbl9jb3VudF9zaGVldCA9IG5ldyBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYihcbiAgICAgICAgICAgIHNoZWV0c19zZXJ2aWNlLFxuICAgICAgICAgICAgY29uZmlnLlNIRUVUX0lELFxuICAgICAgICAgICAgY29uZmlnLkNIRUNLSU5fQ09VTlRfTE9PS1VQXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZnJlc2hlcyB0aGUgZGF0YSBmcm9tIHRoZSBHb29nbGUgU2hlZXRzLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgICAqL1xuICAgIGFzeW5jIHJlZnJlc2goKSB7XG4gICAgICAgIHRoaXMucm93cyA9IGF3YWl0IHRoaXMubG9naW5fc2hlZXQuZ2V0X3ZhbHVlcyhcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLkxPR0lOX1NIRUVUX0xPT0tVUFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmNoZWNraW5fY291bnQgPSAoYXdhaXQgdGhpcy5jaGVja2luX2NvdW50X3NoZWV0LmdldF92YWx1ZXMoXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5DSEVDS0lOX0NPVU5UX0xPT0tVUFxuICAgICAgICApKSFbMF1bMF07XG4gICAgICAgIHRoaXMucGF0cm9sbGVycyA9IHRoaXMucm93cyEubWFwKCh4LCBpKSA9PlxuICAgICAgICAgICAgdGhpcy5wYXJzZV9wYXRyb2xsZXJfcm93KGksIHgsIHRoaXMuY29uZmlnKVxuICAgICAgICApLmZpbHRlcigoeCkgPT4geCAhPSBudWxsKSBhcyBQYXRyb2xsZXJSb3dbXTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIlJlZnJlc2hpbmcgUGF0cm9sbGVyczogXCIgKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnBhdHJvbGxlcnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGFyY2hpdmVkIHN0YXR1cyBvZiB0aGUgbG9naW4gc2hlZXQuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNoZWV0IGlzIGFyY2hpdmVkLCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICovXG4gICAgZ2V0IGFyY2hpdmVkKCkge1xuICAgICAgICBjb25zdCBhcmNoaXZlZCA9IGxvb2t1cF9yb3dfY29sX2luX3NoZWV0KFxuICAgICAgICAgICAgdGhpcy5jb25maWcuQVJDSElWRURfQ0VMTCxcbiAgICAgICAgICAgIHRoaXMucm93cyFcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIChhcmNoaXZlZCA9PT0gdW5kZWZpbmVkICYmIHRoaXMuY2hlY2tpbl9jb3VudCA9PT0gMCkgfHxcbiAgICAgICAgICAgIGFyY2hpdmVkLnRvTG93ZXJDYXNlKCkgPT09IFwieWVzXCJcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBkYXRlIG9mIHRoZSBzaGVldC5cbiAgICAgKiBAcmV0dXJucyB7RGF0ZX0gVGhlIGRhdGUgb2YgdGhlIHNoZWV0LlxuICAgICAqL1xuICAgIGdldCBzaGVldF9kYXRlKCkge1xuICAgICAgICByZXR1cm4gc2FuaXRpemVfZGF0ZShcbiAgICAgICAgICAgIGxvb2t1cF9yb3dfY29sX2luX3NoZWV0KHRoaXMuY29uZmlnLlNIRUVUX0RBVEVfQ0VMTCwgdGhpcy5yb3dzISlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBjdXJyZW50IGRhdGUuXG4gICAgICogQHJldHVybnMge0RhdGV9IFRoZSBjdXJyZW50IGRhdGUuXG4gICAgICovXG4gICAgZ2V0IGN1cnJlbnRfZGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHNhbml0aXplX2RhdGUoXG4gICAgICAgICAgICBsb29rdXBfcm93X2NvbF9pbl9zaGVldCh0aGlzLmNvbmZpZy5DVVJSRU5UX0RBVEVfQ0VMTCwgdGhpcy5yb3dzISlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdGhlIHNoZWV0IGRhdGUgaXMgdGhlIGN1cnJlbnQgZGF0ZS5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc2hlZXQgZGF0ZSBpcyB0aGUgY3VycmVudCBkYXRlLCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICovXG4gICAgZ2V0IGlzX2N1cnJlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNoZWV0X2RhdGUuZ2V0VGltZSgpID09PSB0aGlzLmN1cnJlbnRfZGF0ZS5nZXRUaW1lKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZXMgdG8gZmluZCBhIHBhdHJvbGxlciBieSBuYW1lLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHBhdHJvbGxlci5cbiAgICAgKiBAcmV0dXJucyB7UGF0cm9sbGVyUm93IHwgXCJub3RfZm91bmRcIn0gVGhlIHBhdHJvbGxlciByb3cgb3IgXCJub3RfZm91bmRcIi5cbiAgICAgKi9cbiAgICB0cnlfZmluZF9wYXRyb2xsZXIobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHBhdHJvbGxlcnMgPSB0aGlzLnBhdHJvbGxlcnMuZmlsdGVyKCh4KSA9PiB4Lm5hbWUgPT09IG5hbWUpO1xuICAgICAgICBpZiAocGF0cm9sbGVycy5sZW5ndGggIT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBcIm5vdF9mb3VuZFwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXRyb2xsZXJzWzBdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZpbmRzIGEgcGF0cm9sbGVyIGJ5IG5hbWUuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcGF0cm9sbGVyLlxuICAgICAqIEByZXR1cm5zIHtQYXRyb2xsZXJSb3d9IFRoZSBwYXRyb2xsZXIgcm93LlxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGF0cm9sbGVyIGlzIG5vdCBmb3VuZC5cbiAgICAgKi9cbiAgICBmaW5kX3BhdHJvbGxlcihuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy50cnlfZmluZF9wYXRyb2xsZXIobmFtZSk7XG4gICAgICAgIGlmIChyZXN1bHQgPT09IFwibm90X2ZvdW5kXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgJHtuYW1lfSBpbiBsb2dpbiBzaGVldGApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcGF0cm9sbGVycyB3aG8gYXJlIG9uIGR1dHkuXG4gICAgICogQHJldHVybnMge1BhdHJvbGxlclJvd1tdfSBUaGUgbGlzdCBvZiBvbi1kdXR5IHBhdHJvbGxlcnMuXG4gICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBsb2dpbiBzaGVldCBpcyBub3QgY3VycmVudC5cbiAgICAgKi9cbiAgICBnZXRfb25fZHV0eV9wYXRyb2xsZXJzKCk6IFBhdHJvbGxlclJvd1tdIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzX2N1cnJlbnQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxvZ2luIHNoZWV0IGlzIG5vdCBjdXJyZW50XCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnBhdHJvbGxlcnMuZmlsdGVyKCh4KSA9PiB4LmNoZWNraW4pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpbiBhIHBhdHJvbGxlciB3aXRoIGEgbmV3IGNoZWNrLWluIHZhbHVlLlxuICAgICAqIEBwYXJhbSB7UGF0cm9sbGVyUm93fSBwYXRyb2xsZXJfc3RhdHVzIC0gVGhlIHN0YXR1cyBvZiB0aGUgcGF0cm9sbGVyLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuZXdfY2hlY2tpbl92YWx1ZSAtIFRoZSBuZXcgY2hlY2staW4gdmFsdWUuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBsb2dpbiBzaGVldCBpcyBub3QgY3VycmVudC5cbiAgICAgKi9cbiAgICBhc3luYyBjaGVja2luKHBhdHJvbGxlcl9zdGF0dXM6IFBhdHJvbGxlclJvdywgbmV3X2NoZWNraW5fdmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAoIXRoaXMuaXNfY3VycmVudCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTG9naW4gc2hlZXQgaXMgbm90IGN1cnJlbnRcIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coYEV4aXN0aW5nIHN0YXR1czogJHtKU09OLnN0cmluZ2lmeShwYXRyb2xsZXJfc3RhdHVzKX1gKTtcblxuICAgICAgICBjb25zdCByb3cgPSBwYXRyb2xsZXJfc3RhdHVzLmluZGV4ICsgMTsgLy8gcHJvZ3JhbW1pbmcgLT4gZXhjZWwgbG9va3VwXG4gICAgICAgIGNvbnN0IHJhbmdlID0gYCR7dGhpcy5jb25maWcuQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU59JHtyb3d9YDtcblxuICAgICAgICBhd2FpdCB0aGlzLmxvZ2luX3NoZWV0LnVwZGF0ZV92YWx1ZXMocmFuZ2UsIFtbbmV3X2NoZWNraW5fdmFsdWVdXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBBc3NpZ25zIGEgc2VjdGlvbiB0byBhIHBhdHJvbGxlci5cbiAgICAqIEBwYXJhbSB7UGF0cm9sbGVyUm93fSBwYXRyb2xsZXIgLSBUaGUgcGF0cm9sbGVyIHRvIGFzc2lnbiB0aGUgc2VjdGlvbiB0by5cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBuZXdfc2VjdGlvbl92YWx1ZSAtIFRoZSBuZXcgc2VjdGlvbiB2YWx1ZS5cbiAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBsb2dpbiBzaGVldCBpcyBub3QgY3VycmVudC5cbiAgICAqL1xuICAgIGFzeW5jIGFzc2lnbl9zZWN0aW9uKHBhdHJvbGxlcl9zZWN0aW9uOiBQYXRyb2xsZXJSb3csIG5ld19zZWN0aW9uX3ZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzX2N1cnJlbnQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxvZ2luIHNoZWV0IGlzIG5vdCBjdXJyZW50XCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGBFeGlzdGluZyBzdGF0dXM6ICR7SlNPTi5zdHJpbmdpZnkocGF0cm9sbGVyX3NlY3Rpb24pfWApO1xuXG4gICAgICAgIGNvbnN0IHJvdyA9IHBhdHJvbGxlcl9zZWN0aW9uLmluZGV4ICsgMTsgLy8gcHJvZ3JhbW1pbmcgLT4gZXhjZWwgbG9va3VwXG4gICAgICAgIGNvbnN0IHJhbmdlID0gYCR7dGhpcy5jb25maWcuU0VDVElPTl9EUk9QRE9XTl9DT0xVTU59JHtyb3d9YDtcblxuICAgICAgICBhd2FpdCB0aGlzLmxvZ2luX3NoZWV0LnVwZGF0ZV92YWx1ZXMocmFuZ2UsIFtbbmV3X3NlY3Rpb25fdmFsdWVdXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIGEgcm93IG9mIHBhdHJvbGxlciBkYXRhLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIFRoZSBpbmRleCBvZiB0aGUgcm93LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IHJvdyAtIFRoZSByb3cgZGF0YS5cbiAgICAgKiBAcGFyYW0ge1BhdHJvbGxlclJvd0NvbmZpZ30gb3B0cyAtIFRoZSBjb25maWd1cmF0aW9uIG9wdGlvbnMgZm9yIHRoZSBwYXRyb2xsZXIgcm93LlxuICAgICAqIEByZXR1cm5zIHtQYXRyb2xsZXJSb3cgfCBudWxsfSBUaGUgcGFyc2VkIHBhdHJvbGxlciByb3cgb3IgbnVsbCBpZiBpbnZhbGlkLlxuICAgICAqL1xuICAgIHByaXZhdGUgcGFyc2VfcGF0cm9sbGVyX3JvdyhcbiAgICAgICAgaW5kZXg6IG51bWJlcixcbiAgICAgICAgcm93OiBzdHJpbmdbXSxcbiAgICAgICAgb3B0czogUGF0cm9sbGVyUm93Q29uZmlnXG4gICAgKTogUGF0cm9sbGVyUm93IHwgbnVsbCB7XG4gICAgICAgIGlmIChyb3cubGVuZ3RoIDwgNCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluZGV4IDwgMyl7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgbmFtZTogcm93W2V4Y2VsX3Jvd190b19pbmRleChvcHRzLk5BTUVfQ09MVU1OKV0sXG4gICAgICAgICAgICBjYXRlZ29yeTogcm93W2V4Y2VsX3Jvd190b19pbmRleChvcHRzLkNBVEVHT1JZX0NPTFVNTildLFxuICAgICAgICAgICAgc2VjdGlvbjogcm93W2V4Y2VsX3Jvd190b19pbmRleChvcHRzLlNFQ1RJT05fRFJPUERPV05fQ09MVU1OKV0sXG4gICAgICAgICAgICBjaGVja2luOiByb3dbZXhjZWxfcm93X3RvX2luZGV4KG9wdHMuQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU4pXSxcbiAgICAgICAgfTtcbiAgICB9XG59IiwiaW1wb3J0IHsgc2hlZXRzX3Y0IH0gZnJvbSBcImdvb2dsZWFwaXNcIjtcbmltcG9ydCB7XG4gICAgU2Vhc29uU2hlZXRDb25maWcsXG59IGZyb20gXCIuLi9lbnYvaGFuZGxlcl9jb25maWdcIjtcbmltcG9ydCB7IGV4Y2VsX3Jvd190b19pbmRleCB9IGZyb20gXCIuLi91dGlscy91dGlsXCI7XG5pbXBvcnQgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIgZnJvbSBcIi4uL3V0aWxzL2dvb2dsZV9zaGVldHNfc3ByZWFkc2hlZXRfdGFiXCI7XG5pbXBvcnQgeyBmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9jdXJyZW50X2RheSB9IGZyb20gXCIuLi91dGlscy9kYXRldGltZV91dGlsXCI7XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGEgc2Vhc29uIHNoZWV0IGluIEdvb2dsZSBTaGVldHMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXNvblNoZWV0IHtcbiAgICBzaGVldDogR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWI7XG4gICAgY29uZmlnOiBTZWFzb25TaGVldENvbmZpZztcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgU2Vhc29uU2hlZXQuXG4gICAgICogQHBhcmFtIHtzaGVldHNfdjQuU2hlZXRzIHwgbnVsbH0gc2hlZXRzX3NlcnZpY2UgLSBUaGUgR29vZ2xlIFNoZWV0cyBBUEkgc2VydmljZS5cbiAgICAgKiBAcGFyYW0ge1NlYXNvblNoZWV0Q29uZmlnfSBjb25maWcgLSBUaGUgY29uZmlndXJhdGlvbiBmb3IgdGhlIHNlYXNvbiBzaGVldC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgc2hlZXRzX3NlcnZpY2U6IHNoZWV0c192NC5TaGVldHMgfCBudWxsLFxuICAgICAgICBjb25maWc6IFNlYXNvblNoZWV0Q29uZmlnXG4gICAgKSB7XG4gICAgICAgIHRoaXMuc2hlZXQgPSBuZXcgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIoXG4gICAgICAgICAgICBzaGVldHNfc2VydmljZSxcbiAgICAgICAgICAgIGNvbmZpZy5TSEVFVF9JRCxcbiAgICAgICAgICAgIGNvbmZpZy5TRUFTT05fU0hFRVRcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbnVtYmVyIG9mIGRheXMgcGF0cm9sbGVkIGJ5IGEgcGF0cm9sbGVyLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRyb2xsZXJfbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwYXRyb2xsZXIuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8bnVtYmVyPn0gVGhlIG51bWJlciBvZiBkYXlzIHBhdHJvbGxlZC5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfcGF0cm9sbGVkX2RheXMoXG4gICAgICAgIHBhdHJvbGxlcl9uYW1lOiBzdHJpbmdcbiAgICApOiBQcm9taXNlPG51bWJlcj4ge1xuICAgICAgICBjb25zdCBwYXRyb2xsZXJfcm93ID0gYXdhaXQgdGhpcy5zaGVldC5nZXRfc2hlZXRfcm93X2Zvcl9wYXRyb2xsZXIoXG4gICAgICAgICAgICBwYXRyb2xsZXJfbmFtZSxcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLlNFQVNPTl9TSEVFVF9OQU1FX0NPTFVNTlxuICAgICAgICApO1xuXG4gICAgICAgIGlmICghcGF0cm9sbGVyX3Jvdykge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY3VycmVudE51bWJlciA9XG4gICAgICAgICAgICBwYXRyb2xsZXJfcm93LnJvd1tleGNlbF9yb3dfdG9faW5kZXgodGhpcy5jb25maWcuU0VBU09OX1NIRUVUX0RBWVNfQ09MVU1OKV07XG5cbiAgICAgICAgY29uc3QgY3VycmVudERheSA9IGZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2N1cnJlbnRfZGF5KHBhdHJvbGxlcl9yb3cucm93KVxuICAgICAgICAgICAgLm1hcCgoeCkgPT4gKHg/LnN0YXJ0c1dpdGgoXCJIXCIpID8gMC41IDogMSkpXG4gICAgICAgICAgICAucmVkdWNlKCh4LCB5LCBpKSA9PiB4ICsgeSwgMCk7XG5cbiAgICAgICAgY29uc3QgZGF5c0JlZm9yZVRvZGF5ID0gY3VycmVudE51bWJlciAtIGN1cnJlbnREYXk7XG4gICAgICAgIHJldHVybiBkYXlzQmVmb3JlVG9kYXk7XG4gICAgfVxufSIsImltcG9ydCB7IGdvb2dsZSB9IGZyb20gXCJnb29nbGVhcGlzXCI7XG5pbXBvcnQgeyBHZW5lcmF0ZUF1dGhVcmxPcHRzIH0gZnJvbSBcImdvb2dsZS1hdXRoLWxpYnJhcnlcIjtcbmltcG9ydCB7IE9BdXRoMkNsaWVudCB9IGZyb20gXCJnb29nbGVhcGlzLWNvbW1vblwiO1xuaW1wb3J0IHsgc2FuaXRpemVfcGhvbmVfbnVtYmVyIH0gZnJvbSBcIi4vdXRpbHMvdXRpbFwiO1xuaW1wb3J0IHsgbG9hZF9jcmVkZW50aWFsc19maWxlcyB9IGZyb20gXCIuL3V0aWxzL2ZpbGVfdXRpbHNcIjtcbmltcG9ydCB7IFNlcnZpY2VDb250ZXh0IH0gZnJvbSBcIkB0d2lsaW8tbGFicy9zZXJ2ZXJsZXNzLXJ1bnRpbWUtdHlwZXMvdHlwZXNcIjtcbmltcG9ydCB7IFVzZXJDcmVkc0NvbmZpZyB9IGZyb20gXCIuL2Vudi9oYW5kbGVyX2NvbmZpZ1wiO1xuaW1wb3J0IHsgdmFsaWRhdGVfc2NvcGVzIH0gZnJvbSBcIi4vdXRpbHMvc2NvcGVfdXRpbFwiO1xuXG5jb25zdCBTQ09QRVMgPSBbXG4gICAgXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3NjcmlwdC5wcm9qZWN0c1wiLFxuICAgIFwiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9zcHJlYWRzaGVldHNcIixcbl07XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIHVzZXIgY3JlZGVudGlhbHMgZm9yIEdvb2dsZSBPQXV0aDIuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXJDcmVkcyB7XG4gICAgbnVtYmVyOiBzdHJpbmc7XG4gICAgb2F1dGgyX2NsaWVudDogT0F1dGgyQ2xpZW50O1xuICAgIHN5bmNfY2xpZW50OiBTZXJ2aWNlQ29udGV4dDtcbiAgICBkb21haW4/OiBzdHJpbmc7XG4gICAgbG9hZGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBVc2VyQ3JlZHMgaW5zdGFuY2UuXG4gICAgICogQHBhcmFtIHtTZXJ2aWNlQ29udGV4dH0gc3luY19jbGllbnQgLSBUaGUgVHdpbGlvIFN5bmMgY2xpZW50LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgdW5kZWZpbmVkfSBudW1iZXIgLSBUaGUgdXNlcidzIHBob25lIG51bWJlci5cbiAgICAgKiBAcGFyYW0ge1VzZXJDcmVkc0NvbmZpZ30gb3B0cyAtIFRoZSB1c2VyIGNyZWRlbnRpYWxzIGNvbmZpZ3VyYXRpb24uXG4gICAgICogQHRocm93cyB7RXJyb3J9IFRocm93cyBhbiBlcnJvciBpZiB0aGUgbnVtYmVyIGlzIHVuZGVmaW5lZCBvciBudWxsLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBzeW5jX2NsaWVudDogU2VydmljZUNvbnRleHQsXG4gICAgICAgIG51bWJlcjogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgICAgICBvcHRzOiBVc2VyQ3JlZHNDb25maWdcbiAgICApIHtcbiAgICAgICAgaWYgKG51bWJlciA9PT0gdW5kZWZpbmVkIHx8IG51bWJlciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTnVtYmVyIGlzIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm51bWJlciA9IHNhbml0aXplX3Bob25lX251bWJlcihudW1iZXIpO1xuXG4gICAgICAgIGNvbnN0IGNyZWRlbnRpYWxzID0gbG9hZF9jcmVkZW50aWFsc19maWxlcygpO1xuICAgICAgICBjb25zdCB7IGNsaWVudF9zZWNyZXQsIGNsaWVudF9pZCwgcmVkaXJlY3RfdXJpcyB9ID0gY3JlZGVudGlhbHMud2ViO1xuICAgICAgICB0aGlzLm9hdXRoMl9jbGllbnQgPSBuZXcgZ29vZ2xlLmF1dGguT0F1dGgyKFxuICAgICAgICAgICAgY2xpZW50X2lkLFxuICAgICAgICAgICAgY2xpZW50X3NlY3JldCxcbiAgICAgICAgICAgIHJlZGlyZWN0X3VyaXNbMF1cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zeW5jX2NsaWVudCA9IHN5bmNfY2xpZW50O1xuICAgICAgICBsZXQgZG9tYWluID0gb3B0cy5OU1BfRU1BSUxfRE9NQUlOO1xuICAgICAgICBpZiAoZG9tYWluID09PSB1bmRlZmluZWQgfHwgZG9tYWluID09PSBudWxsIHx8IGRvbWFpbiA9PT0gXCJcIikge1xuICAgICAgICAgICAgZG9tYWluID0gdW5kZWZpbmVkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kb21haW4gPSBkb21haW47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2FkIHRoZSBPQXV0aDIgdG9rZW4uXG4gICAgICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgYm9vbGVhbiBpbmRpY2F0aW5nIGlmIHRoZSB0b2tlbiB3YXMgbG9hZGVkLlxuICAgICAqL1xuICAgIGFzeW5jIGxvYWRUb2tlbigpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgaWYgKCF0aGlzLmxvYWRlZCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgTG9va2luZyBmb3IgJHt0aGlzLnRva2VuX2tleX1gKTtcbiAgICAgICAgICAgICAgICBjb25zdCBvYXV0aDJEb2MgPSBhd2FpdCB0aGlzLnN5bmNfY2xpZW50XG4gICAgICAgICAgICAgICAgICAgIC5kb2N1bWVudHModGhpcy50b2tlbl9rZXkpXG4gICAgICAgICAgICAgICAgICAgIC5mZXRjaCgpO1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgb2F1dGgyRG9jID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICAgICAgb2F1dGgyRG9jLmRhdGEgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgICAgIG9hdXRoMkRvYy5kYXRhLnRva2VuID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYERpZG4ndCBmaW5kICR7dGhpcy50b2tlbl9rZXl9YCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBvYXV0aDJEb2MuZGF0YS50b2tlbjtcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGVfc2NvcGVzKG9hdXRoMkRvYy5kYXRhLnNjb3BlcywgU0NPUEVTKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vYXV0aDJfY2xpZW50LnNldENyZWRlbnRpYWxzKHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYExvYWRlZCB0b2tlbiAke3RoaXMudG9rZW5fa2V5fWApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgICAgICBgRmFpbGVkIHRvIGxvYWQgdG9rZW4gZm9yICR7dGhpcy50b2tlbl9rZXl9LlxcbiAke2V9YFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZGVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdG9rZW4ga2V5LlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSB0b2tlbiBrZXkuXG4gICAgICovXG4gICAgZ2V0IHRva2VuX2tleSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYG9hdXRoMl8ke3RoaXMubnVtYmVyfWA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVsZXRlIHRoZSBPQXV0aDIgdG9rZW4uXG4gICAgICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgYm9vbGVhbiBpbmRpY2F0aW5nIGlmIHRoZSB0b2tlbiB3YXMgZGVsZXRlZC5cbiAgICAgKi9cbiAgICBhc3luYyBkZWxldGVUb2tlbigpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgY29uc3Qgb2F1dGgyRG9jID0gYXdhaXQgdGhpcy5zeW5jX2NsaWVudFxuICAgICAgICAgICAgLmRvY3VtZW50cyh0aGlzLnRva2VuX2tleSlcbiAgICAgICAgICAgIC5mZXRjaCgpO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICBvYXV0aDJEb2MgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgb2F1dGgyRG9jLmRhdGEgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICBvYXV0aDJEb2MuZGF0YS50b2tlbiA9PT0gdW5kZWZpbmVkXG4gICAgICAgICkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYERpZG4ndCBmaW5kICR7dGhpcy50b2tlbl9rZXl9YCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgdGhpcy5zeW5jX2NsaWVudC5kb2N1bWVudHMob2F1dGgyRG9jLnNpZCkucmVtb3ZlKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBEZWxldGVkIHRva2VuICR7dGhpcy50b2tlbl9rZXl9YCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbXBsZXRlIHRoZSBsb2dpbiBwcm9jZXNzIGJ5IGV4Y2hhbmdpbmcgdGhlIGF1dGhvcml6YXRpb24gY29kZSBmb3IgYSB0b2tlbi5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29kZSAtIFRoZSBhdXRob3JpemF0aW9uIGNvZGUuXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gc2NvcGVzIC0gVGhlIHNjb3BlcyB0byB2YWxpZGF0ZS5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgbG9naW4gcHJvY2VzcyBpcyBjb21wbGV0ZS5cbiAgICAgKi9cbiAgICBhc3luYyBjb21wbGV0ZUxvZ2luKGNvZGU6IHN0cmluZywgc2NvcGVzOiBzdHJpbmdbXSk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICB2YWxpZGF0ZV9zY29wZXMoc2NvcGVzLCBTQ09QRVMpO1xuICAgICAgICBjb25zdCB0b2tlbiA9IGF3YWl0IHRoaXMub2F1dGgyX2NsaWVudC5nZXRUb2tlbihjb2RlKTtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoT2JqZWN0LmtleXModG9rZW4ucmVzISkpKTtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodG9rZW4udG9rZW5zKSk7XG4gICAgICAgIHRoaXMub2F1dGgyX2NsaWVudC5zZXRDcmVkZW50aWFscyh0b2tlbi50b2tlbnMpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3Qgb2F1dGhEb2MgPSBhd2FpdCB0aGlzLnN5bmNfY2xpZW50LmRvY3VtZW50cy5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6IHsgdG9rZW46IHRva2VuLnRva2Vucywgc2NvcGVzOiBzY29wZXMgfSxcbiAgICAgICAgICAgICAgICB1bmlxdWVOYW1lOiB0aGlzLnRva2VuX2tleSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICBgRXhjZXB0aW9uIHdoZW4gY3JlYXRpbmcgb2F1dGguIFRyeWluZyB0byB1cGRhdGUgaW5zdGVhZC4uLlxcbiR7ZX1gXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29uc3Qgb2F1dGhEb2MgPSBhd2FpdCB0aGlzLnN5bmNfY2xpZW50XG4gICAgICAgICAgICAgICAgLmRvY3VtZW50cyh0aGlzLnRva2VuX2tleSlcbiAgICAgICAgICAgICAgICAudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogeyB0b2tlbjogdG9rZW4sIHNjb3Blczogc2NvcGVzIH0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGF1dGhvcml6YXRpb24gVVJMLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHN0cmluZz59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSBhdXRob3JpemF0aW9uIFVSTC5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRBdXRoVXJsKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIGNvbnN0IGlkID0gdGhpcy5nZW5lcmF0ZVJhbmRvbVN0cmluZygpO1xuICAgICAgICBjb25zb2xlLmxvZyhgVXNpbmcgbm9uY2UgJHtpZH0gZm9yICR7dGhpcy5udW1iZXJ9YCk7XG4gICAgICAgIGNvbnN0IGRvYyA9IGF3YWl0IHRoaXMuc3luY19jbGllbnQuZG9jdW1lbnRzLmNyZWF0ZSh7XG4gICAgICAgICAgICBkYXRhOiB7IG51bWJlcjogdGhpcy5udW1iZXIsIHNjb3BlczogU0NPUEVTIH0sXG4gICAgICAgICAgICB1bmlxdWVOYW1lOiBpZCxcbiAgICAgICAgICAgIHR0bDogNjAgKiA1LCAvLyA1IG1pbnV0ZXNcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBNYWRlIG5vbmNlLWRvYzogJHtKU09OLnN0cmluZ2lmeShkb2MpfWApO1xuXG4gICAgICAgIGNvbnN0IG9wdHM6IEdlbmVyYXRlQXV0aFVybE9wdHMgPSB7XG4gICAgICAgICAgICBhY2Nlc3NfdHlwZTogXCJvZmZsaW5lXCIsXG4gICAgICAgICAgICBzY29wZTogU0NPUEVTLFxuICAgICAgICAgICAgc3RhdGU6IGlkLFxuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5kb21haW4pIHtcbiAgICAgICAgICAgIG9wdHNbXCJoZFwiXSA9IHRoaXMuZG9tYWluO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYXV0aFVybCA9IHRoaXMub2F1dGgyX2NsaWVudC5nZW5lcmF0ZUF1dGhVcmwob3B0cyk7XG4gICAgICAgIHJldHVybiBhdXRoVXJsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlIGEgcmFuZG9tIHN0cmluZy5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBBIHJhbmRvbSBzdHJpbmcuXG4gICAgICovXG4gICAgZ2VuZXJhdGVSYW5kb21TdHJpbmcoKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gMzA7XG4gICAgICAgIGxldCByZXN1bHQgPSBcIlwiO1xuICAgICAgICBjb25zdCBjaGFyYWN0ZXJzID1cbiAgICAgICAgICAgIFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODlcIjtcbiAgICAgICAgY29uc3QgY2hhcmFjdGVyc0xlbmd0aCA9IGNoYXJhY3RlcnMubGVuZ3RoO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gY2hhcmFjdGVycy5jaGFyQXQoXG4gICAgICAgICAgICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hhcmFjdGVyc0xlbmd0aClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5cbi8qKlxuICogSW50ZXJmYWNlIHJlcHJlc2VudGluZyB0aGUgdXNlciBjcmVkZW50aWFscyBjb25maWd1cmF0aW9uLlxuICovXG5leHBvcnQgeyBVc2VyQ3JlZHMsIFNDT1BFUyBhcyBVc2VyQ3JlZHNTY29wZXMgfTtcbiIsIi8qKlxuICogUmVwcmVzZW50cyBhIGNoZWNrLWluIHZhbHVlIHdpdGggdmFyaW91cyBwcm9wZXJ0aWVzIGFuZCBsb29rdXAgdmFsdWVzLlxuICovXG5jbGFzcyBDaGVja2luVmFsdWUge1xuICAgIGtleTogc3RyaW5nO1xuICAgIHNoZWV0c192YWx1ZTogc3RyaW5nO1xuICAgIHNtc19kZXNjOiBzdHJpbmc7XG4gICAgZmFzdF9jaGVja2luczogc3RyaW5nW107XG4gICAgbG9va3VwX3ZhbHVlczogU2V0PHN0cmluZz47XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIENoZWNraW5WYWx1ZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gVGhlIGtleSBmb3IgdGhlIGNoZWNrLWluIHZhbHVlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaGVldHNfdmFsdWUgLSBUaGUgdmFsdWUgdXNlZCBpbiBzaGVldHMuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNtc19kZXNjIC0gVGhlIGRlc2NyaXB0aW9uIHVzZWQgaW4gU01TLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgc3RyaW5nW119IGZhc3RfY2hlY2tpbnMgLSBUaGUgZmFzdCBjaGVjay1pbiB2YWx1ZXMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGtleTogc3RyaW5nLFxuICAgICAgICBzaGVldHNfdmFsdWU6IHN0cmluZyxcbiAgICAgICAgc21zX2Rlc2M6IHN0cmluZyxcbiAgICAgICAgZmFzdF9jaGVja2luczogc3RyaW5nIHwgc3RyaW5nW11cbiAgICApIHtcbiAgICAgICAgaWYgKCEoZmFzdF9jaGVja2lucyBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgICAgICAgZmFzdF9jaGVja2lucyA9IFtmYXN0X2NoZWNraW5zXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmtleSA9IGtleTtcbiAgICAgICAgdGhpcy5zaGVldHNfdmFsdWUgPSBzaGVldHNfdmFsdWU7XG4gICAgICAgIHRoaXMuc21zX2Rlc2MgPSBzbXNfZGVzYztcbiAgICAgICAgdGhpcy5mYXN0X2NoZWNraW5zID0gZmFzdF9jaGVja2lucy5tYXAoKHgpID0+IHgudHJpbSgpLnRvTG93ZXJDYXNlKCkpO1xuXG4gICAgICAgIGNvbnN0IHNtc19kZXNjX3NwbGl0OiBzdHJpbmdbXSA9IHNtc19kZXNjXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxzKy8sIFwiLVwiKVxuICAgICAgICAgICAgLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgIC5zcGxpdChcIi9cIik7XG4gICAgICAgIGNvbnN0IGxvb2t1cF92YWxzID0gWy4uLnRoaXMuZmFzdF9jaGVja2lucywgLi4uc21zX2Rlc2Nfc3BsaXRdO1xuICAgICAgICB0aGlzLmxvb2t1cF92YWx1ZXMgPSBuZXcgU2V0PHN0cmluZz4obG9va3VwX3ZhbHMpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgY29sbGVjdGlvbiBvZiBjaGVjay1pbiB2YWx1ZXMgd2l0aCB2YXJpb3VzIGxvb2t1cCBtZXRob2RzLlxuICovXG5jbGFzcyBDaGVja2luVmFsdWVzIHtcbiAgICBieV9rZXk6IHsgW2tleTogc3RyaW5nXTogQ2hlY2tpblZhbHVlIH0gPSB7fTtcbiAgICBieV9sdjogeyBba2V5OiBzdHJpbmddOiBDaGVja2luVmFsdWUgfSA9IHt9O1xuICAgIGJ5X2ZjOiB7IFtrZXk6IHN0cmluZ106IENoZWNraW5WYWx1ZSB9ID0ge307XG4gICAgYnlfc2hlZXRfc3RyaW5nOiB7IFtrZXk6IHN0cmluZ106IENoZWNraW5WYWx1ZSB9ID0ge307XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIENoZWNraW5WYWx1ZXMuXG4gICAgICogQHBhcmFtIHtDaGVja2luVmFsdWVbXX0gY2hlY2tpblZhbHVlcyAtIFRoZSBhcnJheSBvZiBjaGVjay1pbiB2YWx1ZXMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY2hlY2tpblZhbHVlczogQ2hlY2tpblZhbHVlW10pIHtcbiAgICAgICAgZm9yICh2YXIgY2hlY2tpblZhbHVlIG9mIGNoZWNraW5WYWx1ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuYnlfa2V5W2NoZWNraW5WYWx1ZS5rZXldID0gY2hlY2tpblZhbHVlO1xuICAgICAgICAgICAgdGhpcy5ieV9zaGVldF9zdHJpbmdbY2hlY2tpblZhbHVlLnNoZWV0c192YWx1ZV0gPSBjaGVja2luVmFsdWU7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGx2IG9mIGNoZWNraW5WYWx1ZS5sb29rdXBfdmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ieV9sdltsdl0gPSBjaGVja2luVmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZjIG9mIGNoZWNraW5WYWx1ZS5mYXN0X2NoZWNraW5zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ieV9mY1tmY10gPSBjaGVja2luVmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBlbnRyaWVzIG9mIGNoZWNrLWluIHZhbHVlcyBieSBrZXkuXG4gICAgICogQHJldHVybnMge0FycmF5fSBUaGUgZW50cmllcyBvZiBjaGVjay1pbiB2YWx1ZXMuXG4gICAgICovXG4gICAgZW50cmllcygpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKHRoaXMuYnlfa2V5KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZXMgYSBmYXN0IGNoZWNrLWluIHZhbHVlIGZyb20gdGhlIGdpdmVuIGJvZHkgc3RyaW5nLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5IC0gVGhlIGJvZHkgc3RyaW5nIHRvIHBhcnNlLlxuICAgICAqIEByZXR1cm5zIHtDaGVja2luVmFsdWUgfCB1bmRlZmluZWR9IFRoZSBwYXJzZWQgY2hlY2staW4gdmFsdWUgb3IgdW5kZWZpbmVkLlxuICAgICAqL1xuICAgIHBhcnNlX2Zhc3RfY2hlY2tpbihib2R5OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnlfZmNbYm9keV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIGEgY2hlY2staW4gdmFsdWUgZnJvbSB0aGUgZ2l2ZW4gYm9keSBzdHJpbmcuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHkgLSBUaGUgYm9keSBzdHJpbmcgdG8gcGFyc2UuXG4gICAgICogQHJldHVybnMge0NoZWNraW5WYWx1ZSB8IHVuZGVmaW5lZH0gVGhlIHBhcnNlZCBjaGVjay1pbiB2YWx1ZSBvciB1bmRlZmluZWQuXG4gICAgICovXG4gICAgcGFyc2VfY2hlY2tpbihib2R5OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgY2hlY2tpbl9sb3dlciA9IGJvZHkucmVwbGFjZSgvXFxzKy8sIFwiXCIpO1xuICAgICAgICByZXR1cm4gdGhpcy5ieV9sdltjaGVja2luX2xvd2VyXTtcbiAgICB9XG59XG5cbmV4cG9ydCB7IENoZWNraW5WYWx1ZSwgQ2hlY2tpblZhbHVlcyB9IiwiLyoqXG4gKiBDb252ZXJ0IGFuIEV4Y2VsIGRhdGUgdG8gYSBKYXZhU2NyaXB0IERhdGUgb2JqZWN0LlxuICogQHBhcmFtIHtudW1iZXJ9IGRhdGUgLSBUaGUgRXhjZWwgZGF0ZS5cbiAqIEByZXR1cm5zIHtEYXRlfSBUaGUgSmF2YVNjcmlwdCBEYXRlIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gZXhjZWxfZGF0ZV90b19qc19kYXRlKGRhdGU6IG51bWJlcik6IERhdGUge1xuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBEYXRlKDApO1xuICAgIHJlc3VsdC5zZXRVVENNaWxsaXNlY29uZHMoTWF0aC5yb3VuZCgoZGF0ZSAtIDI1NTY5KSAqIDg2NDAwICogMTAwMCkpO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ2hhbmdlIHRoZSB0aW1lem9uZSBvZiBhIERhdGUgb2JqZWN0IHRvIFBTVC5cbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSAtIFRoZSBEYXRlIG9iamVjdC5cbiAqIEByZXR1cm5zIHtEYXRlfSBUaGUgRGF0ZSBvYmplY3Qgd2l0aCB0aGUgdGltZXpvbmUgc2V0IHRvIFBTVC5cbiAqL1xuZnVuY3Rpb24gY2hhbmdlX3RpbWV6b25lX3RvX3BzdChkYXRlOiBEYXRlKTogRGF0ZSB7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IERhdGUoZGF0ZS50b1VUQ1N0cmluZygpLnJlcGxhY2UoXCIgR01UXCIsIFwiIFBTVFwiKSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBTdHJpcCB0aGUgdGltZSBmcm9tIGEgRGF0ZSBvYmplY3QsIGtlZXBpbmcgb25seSB0aGUgZGF0ZS5cbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSAtIFRoZSBEYXRlIG9iamVjdC5cbiAqIEByZXR1cm5zIHtEYXRlfSBUaGUgRGF0ZSBvYmplY3Qgd2l0aCB0aGUgdGltZSBzdHJpcHBlZC5cbiAqL1xuZnVuY3Rpb24gc3RyaXBfZGF0ZXRpbWVfdG9fZGF0ZShkYXRlOiBEYXRlKTogRGF0ZSB7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IERhdGUoXG4gICAgICAgIGRhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKFwiZW4tVVNcIiwgeyB0aW1lWm9uZTogXCJBbWVyaWNhL0xvc19BbmdlbGVzXCIgfSlcbiAgICApO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogU2FuaXRpemUgYSBkYXRlIGJ5IGNvbnZlcnRpbmcgaXQgZnJvbSBhbiBFeGNlbCBkYXRlIGFuZCBzdHJpcHBpbmcgdGhlIHRpbWUuXG4gKiBAcGFyYW0ge251bWJlcn0gZGF0ZSAtIFRoZSBFeGNlbCBkYXRlLlxuICogQHJldHVybnMge0RhdGV9IFRoZSBzYW5pdGl6ZWQgRGF0ZSBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIHNhbml0aXplX2RhdGUoZGF0ZTogbnVtYmVyKTogRGF0ZSB7XG4gICAgY29uc3QgcmVzdWx0ID0gc3RyaXBfZGF0ZXRpbWVfdG9fZGF0ZShcbiAgICAgICAgY2hhbmdlX3RpbWV6b25lX3RvX3BzdChleGNlbF9kYXRlX3RvX2pzX2RhdGUoZGF0ZSkpXG4gICAgKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEZvcm1hdCBhIERhdGUgb2JqZWN0IGZvciB1c2UgaW4gYSBzcHJlYWRzaGVldCB2YWx1ZS5cbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSAtIFRoZSBEYXRlIG9iamVjdC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgZGF0ZSBzdHJpbmcgaW4gUFNUXG4gKi9cbmZ1bmN0aW9uIGZvcm1hdF9kYXRlX2Zvcl9zcHJlYWRzaGVldF92YWx1ZShkYXRlOiBEYXRlKTogc3RyaW5nIHtcbiAgICAgY29uc3QgZGF0ZXN0ciA9IGRhdGVcbiAgICAgICAgIC50b0xvY2FsZURhdGVTdHJpbmcoXCJlbi1VU1wiLCB7IHRpbWVab25lOiBcIkFtZXJpY2EvTG9zX0FuZ2VsZXNcIiB9KVxuICAgICAgICAuc3BsaXQoXCIvXCIpXG4gICAgICAgIC5tYXAoKHgpID0+IHgucGFkU3RhcnQoMiwgXCIwXCIpKVxuICAgICAgICAuam9pbihcIlwiKTtcbiAgICByZXR1cm4gZGF0ZXN0cjtcbn1cblxuLyoqXG4gKiBGaWx0ZXIgYSBsaXN0IHRvIGluY2x1ZGUgb25seSBpdGVtcyB0aGF0IGVuZCB3aXRoIGEgc3BlY2lmaWMgZGF0ZS5cbiAqIEBwYXJhbSB7YW55W119IGxpc3QgLSBUaGUgbGlzdCB0byBmaWx0ZXIuXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgLSBUaGUgZGF0ZSB0byBmaWx0ZXIgYnkuXG4gKiBAcmV0dXJucyB7YW55W119IFRoZSBmaWx0ZXJlZCBsaXN0LlxuICovXG5mdW5jdGlvbiBmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9kYXRlKGxpc3Q6IGFueVtdLCBkYXRlOiBEYXRlKTogYW55W10ge1xuICAgIGNvbnN0IGRhdGVzdHIgPSBmb3JtYXRfZGF0ZV9mb3Jfc3ByZWFkc2hlZXRfdmFsdWUoZGF0ZSk7XG4gICAgcmV0dXJuIGxpc3QubWFwKCh4KSA9PiB4Py50b1N0cmluZygpKS5maWx0ZXIoKHgpID0+IHg/LmVuZHNXaXRoKGRhdGVzdHIpKTtcbn1cblxuLyoqXG4gKiBGaWx0ZXIgYSBsaXN0IHRvIGluY2x1ZGUgb25seSBpdGVtcyB0aGF0IGVuZCB3aXRoIHRoZSBjdXJyZW50IGRhdGUuXG4gKiBAcGFyYW0ge2FueVtdfSBsaXN0IC0gVGhlIGxpc3QgdG8gZmlsdGVyLlxuICogQHJldHVybnMge2FueVtdfSBUaGUgZmlsdGVyZWQgbGlzdC5cbiAqL1xuZnVuY3Rpb24gZmlsdGVyX2xpc3RfdG9fZW5kc3dpdGhfY3VycmVudF9kYXkobGlzdDogYW55W10pOiBhbnlbXSB7XG4gICAgcmV0dXJuIGZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2RhdGUobGlzdCwgbmV3IERhdGUoKSk7XG59XG5cbmV4cG9ydCB7XG4gICAgc2FuaXRpemVfZGF0ZSxcbiAgICBleGNlbF9kYXRlX3RvX2pzX2RhdGUsXG4gICAgY2hhbmdlX3RpbWV6b25lX3RvX3BzdCxcbiAgICBzdHJpcF9kYXRldGltZV90b19kYXRlLFxuICAgIGZvcm1hdF9kYXRlX2Zvcl9zcHJlYWRzaGVldF92YWx1ZSxcbiAgICBmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9kYXRlLFxuICAgIGZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2N1cnJlbnRfZGF5LFxufTsiLCJpbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCAnQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlcyc7XG5cbi8qKlxuICogTG9hZCBjcmVkZW50aWFscyBmcm9tIGEgSlNPTiBmaWxlLlxuICogQHJldHVybnMge2FueX0gVGhlIHBhcnNlZCBjcmVkZW50aWFscyBmcm9tIHRoZSBKU09OIGZpbGUuXG4gKi9cbmZ1bmN0aW9uIGxvYWRfY3JlZGVudGlhbHNfZmlsZXMoKTogYW55IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShcbiAgICAgICAgZnNcbiAgICAgICAgICAgIC5yZWFkRmlsZVN5bmMoUnVudGltZS5nZXRBc3NldHMoKVtcIi9jcmVkZW50aWFscy5qc29uXCJdLnBhdGgpXG4gICAgICAgICAgICAudG9TdHJpbmcoKVxuICAgICk7XG59XG5cbi8qKlxuICogR2V0IHRoZSBwYXRoIHRvIHRoZSBzZXJ2aWNlIGNyZWRlbnRpYWxzIGZpbGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgcGF0aCB0byB0aGUgc2VydmljZSBjcmVkZW50aWFscyBmaWxlLlxuICovXG5mdW5jdGlvbiBnZXRfc2VydmljZV9jcmVkZW50aWFsc19wYXRoKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFJ1bnRpbWUuZ2V0QXNzZXRzKClbXCIvc2VydmljZS1jcmVkZW50aWFscy5qc29uXCJdLnBhdGg7XG59XG5cbmV4cG9ydCB7IGxvYWRfY3JlZGVudGlhbHNfZmlsZXMsIGdldF9zZXJ2aWNlX2NyZWRlbnRpYWxzX3BhdGggfTsiLCJpbXBvcnQgeyBzaGVldHNfdjQgfSBmcm9tIFwiZ29vZ2xlYXBpc1wiO1xuaW1wb3J0IHsgZXhjZWxfcm93X3RvX2luZGV4IH0gZnJvbSBcIi4vdXRpbFwiO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQgdGFiLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYiB7XG4gICAgc2hlZXRzX3NlcnZpY2U6IHNoZWV0c192NC5TaGVldHMgfCBudWxsO1xuICAgIHNoZWV0X2lkOiBzdHJpbmc7XG4gICAgc2hlZXRfbmFtZTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIuXG4gICAgICogQHBhcmFtIHtzaGVldHNfdjQuU2hlZXRzIHwgbnVsbH0gc2hlZXRzX3NlcnZpY2UgLSBUaGUgR29vZ2xlIFNoZWV0cyBBUEkgc2VydmljZSBpbnN0YW5jZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2hlZXRfaWQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNoZWV0X25hbWUgLSBUaGUgbmFtZSBvZiB0aGUgc2hlZXQgdGFiLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyB8IG51bGwsXG4gICAgICAgIHNoZWV0X2lkOiBzdHJpbmcsXG4gICAgICAgIHNoZWV0X25hbWU6IHN0cmluZ1xuICAgICkge1xuICAgICAgICB0aGlzLnNoZWV0c19zZXJ2aWNlID0gc2hlZXRzX3NlcnZpY2U7XG4gICAgICAgIHRoaXMuc2hlZXRfaWQgPSBzaGVldF9pZDtcbiAgICAgICAgdGhpcy5zaGVldF9uYW1lID0gc2hlZXRfbmFtZS5zcGxpdChcIiFcIilbMF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHZhbHVlcyBmcm9tIHRoZSBzaGVldC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bGx9IFtyYW5nZV0gLSBUaGUgcmFuZ2UgdG8gZ2V0IHZhbHVlcyBmcm9tLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueVtdW10gfCB1bmRlZmluZWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgdmFsdWVzIGZyb20gdGhlIHNoZWV0LlxuICAgICAqL1xuICAgIGFzeW5jIGdldF92YWx1ZXMocmFuZ2U/OiBzdHJpbmcgfCBudWxsKTogUHJvbWlzZTxhbnlbXVtdIHwgdW5kZWZpbmVkPiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2dldF92YWx1ZXMocmFuZ2UpO1xuICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGEudmFsdWVzID8/IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHJvdyBmb3IgYSBzcGVjaWZpYyBwYXRyb2xsZXIuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdHJvbGxlcl9uYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHBhdHJvbGxlci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZV9jb2x1bW4gLSBUaGUgY29sdW1uIHdoZXJlIHRoZSBwYXRyb2xsZXIncyBuYW1lIGlzIGxvY2F0ZWQuXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCBudWxsfSBbcmFuZ2VdIC0gVGhlIHJhbmdlIHRvIHNlYXJjaCB3aXRoaW4uXG4gICAgICogQHJldHVybnMge1Byb21pc2U8eyByb3c6IGFueVtdOyBpbmRleDogbnVtYmVyOyB9IHwgbnVsbD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSByb3cgYW5kIGluZGV4IG9mIHRoZSBwYXRyb2xsZXIsIG9yIG51bGwgaWYgbm90IGZvdW5kLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF9zaGVldF9yb3dfZm9yX3BhdHJvbGxlcihcbiAgICAgICAgcGF0cm9sbGVyX25hbWU6IHN0cmluZyxcbiAgICAgICAgbmFtZV9jb2x1bW46IHN0cmluZyxcbiAgICAgICAgcmFuZ2U/OiBzdHJpbmcgfCBudWxsXG4gICAgKTogUHJvbWlzZTx7IHJvdzogYW55W107IGluZGV4OiBudW1iZXI7IH0gfCBudWxsPiB7XG4gICAgICAgIGNvbnN0IHJvd3MgPSBhd2FpdCB0aGlzLmdldF92YWx1ZXMocmFuZ2UpO1xuICAgICAgICBpZiAocm93cykge1xuICAgICAgICAgICAgY29uc3QgbG9va3VwX2luZGV4ID0gZXhjZWxfcm93X3RvX2luZGV4KG5hbWVfY29sdW1uKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm93cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChyb3dzW2ldW2xvb2t1cF9pbmRleF0gPT09IHBhdHJvbGxlcl9uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHJvdzogcm93c1tpXSwgaW5kZXg6IGkgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgIGBDb3VsZG4ndCBmaW5kIHBhdHJvbGxlciAke3BhdHJvbGxlcl9uYW1lfSBpbiBzaGVldCAke3RoaXMuc2hlZXRfbmFtZX0uYFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdmFsdWVzIGluIHRoZSBzaGVldC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmFuZ2UgLSBUaGUgcmFuZ2UgdG8gdXBkYXRlLlxuICAgICAqIEBwYXJhbSB7YW55W11bXX0gdmFsdWVzIC0gVGhlIHZhbHVlcyB0byB1cGRhdGUuXG4gICAgICovXG4gICAgYXN5bmMgdXBkYXRlX3ZhbHVlcyhyYW5nZTogc3RyaW5nLCB2YWx1ZXM6IGFueVtdW10pIHtcbiAgICAgICAgY29uc3QgdXBkYXRlTWUgPSAoYXdhaXQgdGhpcy5fZ2V0X3ZhbHVlcyhyYW5nZSwgbnVsbCkpLmRhdGE7XG5cbiAgICAgICAgdXBkYXRlTWUudmFsdWVzID0gdmFsdWVzO1xuICAgICAgICBhd2FpdCB0aGlzLnNoZWV0c19zZXJ2aWNlIS5zcHJlYWRzaGVldHMudmFsdWVzLnVwZGF0ZSh7XG4gICAgICAgICAgICBzcHJlYWRzaGVldElkOiB0aGlzLnNoZWV0X2lkLFxuICAgICAgICAgICAgdmFsdWVJbnB1dE9wdGlvbjogXCJVU0VSX0VOVEVSRURcIixcbiAgICAgICAgICAgIHJhbmdlOiB1cGRhdGVNZS5yYW5nZSEsXG4gICAgICAgICAgICByZXF1ZXN0Qm9keTogdXBkYXRlTWUsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB2YWx1ZXMgZnJvbSB0aGUgc2hlZXQgKHByaXZhdGUgbWV0aG9kKS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bGx9IFtyYW5nZV0gLSBUaGUgcmFuZ2UgdG8gZ2V0IHZhbHVlcyBmcm9tLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbH0gW3ZhbHVlUmVuZGVyT3B0aW9uXSAtIFRoZSB2YWx1ZSByZW5kZXIgb3B0aW9uLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueVtdW10+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgdmFsdWUgcmFuZ2UuXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIGFzeW5jIF9nZXRfdmFsdWVzKFxuICAgICAgICByYW5nZT86IHN0cmluZyB8IG51bGwsXG4gICAgICAgIHZhbHVlUmVuZGVyT3B0aW9uOiBzdHJpbmcgfCBudWxsID0gXCJVTkZPUk1BVFRFRF9WQUxVRVwiXG4gICAgKSB7XG4gICAgICAgIGxldCBsb29rdXBSYW5nZSA9IHRoaXMuc2hlZXRfbmFtZTtcbiAgICAgICAgaWYgKHJhbmdlICE9IG51bGwpIHtcbiAgICAgICAgICAgIGxvb2t1cFJhbmdlID0gbG9va3VwUmFuZ2UgKyBcIiFcIjtcblxuICAgICAgICAgICAgaWYgKHJhbmdlLnN0YXJ0c1dpdGgobG9va3VwUmFuZ2UpKSB7XG4gICAgICAgICAgICAgICAgcmFuZ2UgPSByYW5nZS5zdWJzdHJpbmcobG9va3VwUmFuZ2UubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvb2t1cFJhbmdlID0gbG9va3VwUmFuZ2UgKyByYW5nZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgb3B0czogc2hlZXRzX3Y0LlBhcmFtcyRSZXNvdXJjZSRTcHJlYWRzaGVldHMkVmFsdWVzJEdldCA9IHtcbiAgICAgICAgICAgIHNwcmVhZHNoZWV0SWQ6IHRoaXMuc2hlZXRfaWQsXG4gICAgICAgICAgICByYW5nZTogbG9va3VwUmFuZ2UsXG4gICAgICAgIH07XG4gICAgICAgIGlmICh2YWx1ZVJlbmRlck9wdGlvbikge1xuICAgICAgICAgICAgb3B0cy52YWx1ZVJlbmRlck9wdGlvbiA9IHZhbHVlUmVuZGVyT3B0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuc2hlZXRzX3NlcnZpY2UhLnNwcmVhZHNoZWV0cy52YWx1ZXMuZ2V0KG9wdHMpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cbiIsIlxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkX3Bhc3Nlc19zdHJpbmcoXG4gICAgdXNlZDogbnVtYmVyLFxuICAgIHRvdGFsOiBudW1iZXIsXG4gICAgdG9kYXk6IG51bWJlcixcbiAgICBmb3JjZV90b2RheTogYm9vbGVhbiA9IGZhbHNlXG4pIHtcbiAgICBsZXQgbWVzc2FnZSA9IGBZb3UgaGF2ZSB1c2VkICR7dXNlZH0gb2YgJHt0b3RhbH0gZ3Vlc3QgcGFzc2VzIHRoaXMgc2Vhc29uYDtcbiAgICBpZiAoZm9yY2VfdG9kYXkgfHwgdG9kYXkgPiAwKSB7XG4gICAgICAgIG1lc3NhZ2UgKz0gYCAoJHt0b2RheX0gdXNlZCB0b2RheSlgO1xuICAgIH1cbiAgICBtZXNzYWdlICs9IFwiLlwiO1xuICAgIHJldHVybiBtZXNzYWdlO1xufVxuIiwiLyoqXG4gKiBWYWxpZGF0ZXMgaWYgdGhlIHByb3ZpZGVkIHNjb3BlcyBpbmNsdWRlIGFsbCBkZXNpcmVkIHNjb3Blcy5cbiAqIEBwYXJhbSB7c3RyaW5nW119IHNjb3BlcyAtIFRoZSBsaXN0IG9mIHNjb3BlcyB0byB2YWxpZGF0ZS5cbiAqIEBwYXJhbSB7c3RyaW5nW119IGRlc2lyZWRfc2NvcGVzIC0gVGhlIGxpc3Qgb2YgZGVzaXJlZCBzY29wZXMuXG4gKiBAdGhyb3dzIHtFcnJvcn0gVGhyb3dzIGFuIGVycm9yIGlmIGFueSBkZXNpcmVkIHNjb3BlIGlzIG1pc3NpbmcuXG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlX3Njb3BlcyhzY29wZXM6IHN0cmluZ1tdLCBkZXNpcmVkX3Njb3Blczogc3RyaW5nW10pIHtcbiAgICBmb3IgKGNvbnN0IGRlc2lyZWRfc2NvcGUgb2YgZGVzaXJlZF9zY29wZXMpIHtcbiAgICAgICAgaWYgKHNjb3BlcyA9PT0gdW5kZWZpbmVkIHx8ICFzY29wZXMuaW5jbHVkZXMoZGVzaXJlZF9zY29wZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gYE1pc3Npbmcgc2NvcGUgJHtkZXNpcmVkX3Njb3BlfSBpbiByZWNlaXZlZCBzY29wZXM6ICR7c2NvcGVzfWA7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IHt2YWxpZGF0ZV9zY29wZXN9IiwiaW1wb3J0IHsgU2VjdGlvbkNvbmZpZyB9IGZyb20gJy4uL2Vudi9oYW5kbGVyX2NvbmZpZyc7XG5cbi8qKlxuICAgICogQ2xhc3MgZm9yIHNlY3Rpb24gdmFsdWVzLlxuICAgICovXG5jbGFzcyBTZWN0aW9uVmFsdWVzIHtcbiAgICBzZWN0aW9uX2NvbmZpZzogU2VjdGlvbkNvbmZpZ1xuICAgIHNlY3Rpb25zOiBzdHJpbmdbXTtcbiAgICBsb3dlcmNhc2Vfc2VjdGlvbnM6IHN0cmluZ1tdO1xuXG4gICAgY29uc3RydWN0b3Ioc2VjdGlvbl9jb25maWc6IFNlY3Rpb25Db25maWcpIHtcbiAgICAgICAgdGhpcy5zZWN0aW9uX2NvbmZpZyA9IHNlY3Rpb25fY29uZmlnO1xuICAgICAgICB0aGlzLnNlY3Rpb25zID0gc2VjdGlvbl9jb25maWcuU0VDVElPTl9WQUxVRVMuc3BsaXQoJywnKTtcbiAgICAgICAgdGhpcy5sb3dlcmNhc2Vfc2VjdGlvbnMgPSBzZWN0aW9uX2NvbmZpZy5TRUNUSU9OX1ZBTFVFUy50b0xvd2VyQ2FzZSgpLnNwbGl0KCcsJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgc2VjdGlvbiBkZXNjcmlwdGlvbi5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgc2VjdGlvbiBkZXNjcmlwdGlvbi5cbiAgICAqL1xuICAgIGdldF9zZWN0aW9uX2Rlc2NyaXB0aW9uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlY3Rpb25fY29uZmlnLlNFQ1RJT05fVkFMVUVTO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogUGFyc2VzIGEgc2VjdGlvbi5cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5IC0gVGhlIGJvZHkgb2YgdGhlIHJlcXVlc3QuXG4gICAgKiBAcmV0dXJucyB7c3RyaW5nIHwgbnVsbH0gVGhlIHNlY3Rpb24gaWYgaXQgaXMgYSB2YWxpZCBzZWN0aW9uIG9yIG51bGwuXG4gICAgKi9cbiAgICBwYXJzZV9zZWN0aW9uKGJvZHk6IHN0cmluZyB8IG51bGwpOiBzdHJpbmcgfCBudWxsIHtcbiAgICAgICAgaWYgKGJvZHkgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgICByZXR1cm4gdGhpcy5sb3dlcmNhc2Vfc2VjdGlvbnMuaW5jbHVkZXMoYm9keS50b0xvd2VyQ2FzZSgpKSA/IGJvZHkgOiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogTWFwcyBhIGxvd2VyIGNhc2UgdmVyc2lvbiBvZiBhIHNlY3Rpb24gc3RyaW5nIHRvIHRoZSBvcmlnaW5hbCBjYXNlIHZhbHVlLlxuICAgICogQHBhcmFtIHtzdHJpbmd9IHNlY3Rpb24gLSBUaGUgbG93ZXIgY2FzZSBzZWN0aW9uIHN0cmluZy5cbiAgICAqIEByZXR1cm5zIHtzdHJpbmcgfSBUaGUgb3JpZ2luYWwgY2FzZSB2YWx1ZSBpZiBmb3VuZCwgb3RoZXJ3aXNlIG51bGwuXG4gICAgKi9cbiAgIG1hcF9zZWN0aW9uKHNlY3Rpb246IHN0cmluZyB8IG51bGwpOiBzdHJpbmcgIHtcbiAgICAgICBpZiAoc2VjdGlvbiA9PT0gbnVsbCkge1xuICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICB9XG4gICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmxvd2VyY2FzZV9zZWN0aW9ucy5pbmRleE9mKHNlY3Rpb24udG9Mb3dlckNhc2UoKSk7XG4gICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICByZXR1cm4gdGhpcy5zZWN0aW9uc1tpbmRleF07XG4gICAgICAgfVxuICAgICAgIHJldHVybiBcIlwiO1xuICAgfVxuXG59XG5cbmV4cG9ydCB7IFNlY3Rpb25WYWx1ZXMgfTsiLCIvKipcbiAqIENvbnZlcnQgcm93IGFuZCBjb2x1bW4gbnVtYmVycyB0byBhbiBFeGNlbC1saWtlIGluZGV4LlxuICogQHBhcmFtIHtudW1iZXJ9IHJvdyAtIFRoZSByb3cgbnVtYmVyICgwLWJhc2VkKS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBjb2wgLSBUaGUgY29sdW1uIG51bWJlciAoMC1iYXNlZCkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgRXhjZWwtbGlrZSBpbmRleCAoZS5nLiwgXCJBMVwiKS5cbiAqL1xuZnVuY3Rpb24gcm93X2NvbF90b19leGNlbF9pbmRleChyb3c6IG51bWJlciwgY29sOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGxldCBjb2xTdHJpbmcgPSBcIlwiO1xuICAgIGNvbCArPSAxO1xuICAgIHdoaWxlIChjb2wgPiAwKSB7XG4gICAgICAgIGNvbCAtPSAxO1xuICAgICAgICBjb25zdCBtb2R1bG8gPSBjb2wgJSAyNjtcbiAgICAgICAgY29uc3QgY29sTGV0dGVyID0gU3RyaW5nLmZyb21DaGFyQ29kZSgnQScuY2hhckNvZGVBdCgwKSArIG1vZHVsbyk7XG4gICAgICAgIGNvbFN0cmluZyA9IGNvbExldHRlciArIGNvbFN0cmluZztcbiAgICAgICAgY29sID0gTWF0aC5mbG9vcihjb2wgLyAyNik7XG4gICAgfVxuICAgIHJldHVybiBjb2xTdHJpbmcgKyAocm93ICsgMSkudG9TdHJpbmcoKTtcbn1cblxuLyoqXG4gKiBTcGxpdCBhbiBFeGNlbC1saWtlIGluZGV4IGludG8gcm93IGFuZCBjb2x1bW4gbnVtYmVycy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBleGNlbF9pbmRleCAtIFRoZSBFeGNlbC1saWtlIGluZGV4IChlLmcuLCBcIkExXCIpLlxuICogQHJldHVybnMge1tudW1iZXIsIG51bWJlcl19IEFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIHJvdyBhbmQgY29sdW1uIG51bWJlcnMgKDAtYmFzZWQpLlxuICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBpbmRleCBjYW5ub3QgYmUgcGFyc2VkLlxuICovXG5mdW5jdGlvbiBzcGxpdF90b19yb3dfY29sKGV4Y2VsX2luZGV4OiBzdHJpbmcpOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoXCJeKFtBLVphLXpdKykoWzAtOV0rKSRcIik7XG4gICAgY29uc3QgbWF0Y2ggPSByZWdleC5leGVjKGV4Y2VsX2luZGV4KTtcbiAgICBpZiAobWF0Y2ggPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gcGFyc2Ugc3RyaW5nIGZvciBleGNlbCBwb3NpdGlvbiBzcGxpdFwiKTtcbiAgICB9XG4gICAgY29uc3QgY29sID0gZXhjZWxfcm93X3RvX2luZGV4KG1hdGNoWzFdKTtcbiAgICBjb25zdCByYXdfcm93ID0gTnVtYmVyKG1hdGNoWzJdKTtcbiAgICBpZiAocmF3X3JvdyA8IDEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUm93IG11c3QgYmUgPj0xXCIpO1xuICAgIH1cbiAgICByZXR1cm4gW3Jhd19yb3cgLSAxLCBjb2xdO1xufVxuXG4vKipcbiAqIExvb2sgdXAgYSB2YWx1ZSBpbiBhIHNoZWV0IGJ5IGl0cyBFeGNlbC1saWtlIGluZGV4LlxuICogQHBhcmFtIHtzdHJpbmd9IGV4Y2VsX2luZGV4IC0gVGhlIEV4Y2VsLWxpa2UgaW5kZXggKGUuZy4sIFwiQTFcIikuXG4gKiBAcGFyYW0ge2FueVtdW119IHNoZWV0IC0gVGhlIHNoZWV0IGRhdGEuXG4gKiBAcmV0dXJucyB7YW55fSBUaGUgdmFsdWUgYXQgdGhlIHNwZWNpZmllZCBpbmRleCwgb3IgdW5kZWZpbmVkIGlmIG5vdCBmb3VuZC5cbiAqL1xuZnVuY3Rpb24gbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQoZXhjZWxfaW5kZXg6IHN0cmluZywgc2hlZXQ6IGFueVtdW10pOiBhbnkge1xuICAgIGNvbnN0IFtyb3csIGNvbF0gPSBzcGxpdF90b19yb3dfY29sKGV4Y2VsX2luZGV4KTtcbiAgICBpZiAocm93ID49IHNoZWV0Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gc2hlZXRbcm93XVtjb2xdO1xufVxuXG4vKipcbiAqIENvbnZlcnQgRXhjZWwtbGlrZSBjb2x1bW4gbGV0dGVycyB0byBhIGNvbHVtbiBudW1iZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gbGV0dGVycyAtIFRoZSBjb2x1bW4gbGV0dGVycyAoZS5nLiwgXCJBXCIpLlxuICogQHJldHVybnMge251bWJlcn0gVGhlIGNvbHVtbiBudW1iZXIgKDAtYmFzZWQpLlxuICovXG5mdW5jdGlvbiBleGNlbF9yb3dfdG9faW5kZXgobGV0dGVyczogc3RyaW5nKTogbnVtYmVyIHtcbiAgICBjb25zdCBsb3dlckxldHRlcnMgPSBsZXR0ZXJzLnRvTG93ZXJDYXNlKCk7XG4gICAgbGV0IHJlc3VsdDogbnVtYmVyID0gMDtcbiAgICBmb3IgKHZhciBwID0gMDsgcCA8IGxvd2VyTGV0dGVycy5sZW5ndGg7IHArKykge1xuICAgICAgICBjb25zdCBjaGFyYWN0ZXJWYWx1ZSA9XG4gICAgICAgICAgICBsb3dlckxldHRlcnMuY2hhckNvZGVBdChwKSAtIFwiYVwiLmNoYXJDb2RlQXQoMCkgKyAxO1xuICAgICAgICByZXN1bHQgPSBjaGFyYWN0ZXJWYWx1ZSArIHJlc3VsdCAqIDI2O1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0IC0gMTtcbn1cblxuLyoqXG4gKiBQYXJzZSBhIEdvb2dsZSBTaGVldHMgY2hlY2tib3gvYm9vbGVhbiBjZWxsIHZhbHVlIGludG8gYSBib29sZWFuLlxuICogQWNjZXB0cyB0aGUgSlMgYm9vbGVhbiB0cnVlL2ZhbHNlIGFzIHdlbGwgYXMgdGhlIHN0cmluZyBsaXRlcmFscyBcIlRSVUVcIi9cIkZBTFNFXCJcbiAqIChjYXNlLWluc2Vuc2l0aXZlKSB0aGF0IFNoZWV0cyBjYW4gcmV0dXJuIGRlcGVuZGluZyBvbiB0aGUgcmVuZGVyIG9wdGlvbi5cbiAqIEFueSB2YWx1ZSB0aGF0IGlzIG5vdCByZWNvZ25pc2FibHkgdHJ1dGh5IHJldHVybnMgZmFsc2UuXG4gKiBAcGFyYW0ge2FueX0gdmFsdWUgLSBUaGUgcmF3IGNlbGwgdmFsdWUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZSBvbmx5IHdoZW4gdmFsdWUgaXMgdHJ1ZSBvciBcIlRSVUVcIiAoY2FzZS1pbnNlbnNpdGl2ZSkuXG4gKi9cbmZ1bmN0aW9uIHBhcnNlX2Jvb2xlYW5fY2VsbCh2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgaWYgKHZhbHVlID09PSB0cnVlKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIHZhbHVlLnRvVXBwZXJDYXNlKCkgPT09IFwiVFJVRVwiO1xufVxuXG4vKipcbiAqIFNhbml0aXplIGEgcGhvbmUgbnVtYmVyIGJ5IHJlbW92aW5nIHVud2FudGVkIGNoYXJhY3RlcnMuXG4gKiBAcGFyYW0ge251bWJlciB8IHN0cmluZ30gbnVtYmVyIC0gVGhlIHBob25lIG51bWJlciB0byBzYW5pdGl6ZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBzYW5pdGl6ZWQgcGhvbmUgbnVtYmVyLlxuICovXG5mdW5jdGlvbiBzYW5pdGl6ZV9waG9uZV9udW1iZXIobnVtYmVyOiBudW1iZXIgfCBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGxldCBuZXdfbnVtYmVyID0gbnVtYmVyLnRvU3RyaW5nKCk7XG4gICAgbmV3X251bWJlciA9IG5ld19udW1iZXIucmVwbGFjZShcIndoYXRzYXBwOlwiLCBcIlwiKTtcbiAgICBsZXQgdGVtcG9yYXJ5X25ld19udW1iZXI6IHN0cmluZyA9IFwiXCI7XG4gICAgd2hpbGUgKHRlbXBvcmFyeV9uZXdfbnVtYmVyICE9IG5ld19udW1iZXIpIHtcbiAgICAgICAgLy8gRG8gdGhpcyBtdWx0aXBsZSB0aW1lcyBzbyB3ZSBnZXQgYWxsICsxIGF0IHRoZSBzdGFydCBvZiB0aGUgc3RyaW5nLCBldmVuIGFmdGVyIHN0cmlwcGluZy5cbiAgICAgICAgdGVtcG9yYXJ5X25ld19udW1iZXIgPSBuZXdfbnVtYmVyO1xuICAgICAgICBuZXdfbnVtYmVyID0gbmV3X251bWJlci5yZXBsYWNlKC8oXlxcKzF8XFwofFxcKXxcXC58LSkvZywgXCJcIik7XG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdCA9IFN0cmluZyhwYXJzZUludChuZXdfbnVtYmVyKSkucGFkU3RhcnQoMTAsIFwiMFwiKTtcbiAgICBpZiAocmVzdWx0Lmxlbmd0aCA9PSAxMSAmJiByZXN1bHRbMF0gPT0gXCIxXCIpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5zdWJzdHJpbmcoMSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCB7XG4gICAgcm93X2NvbF90b19leGNlbF9pbmRleCxcbiAgICBleGNlbF9yb3dfdG9faW5kZXgsXG4gICAgc2FuaXRpemVfcGhvbmVfbnVtYmVyLFxuICAgIHNwbGl0X3RvX3Jvd19jb2wsXG4gICAgbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQsXG4gICAgcGFyc2VfYm9vbGVhbl9jZWxsLFxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImdvb2dsZWFwaXNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic21zLXNlZ21lbnRzLWNhbGN1bGF0b3JcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxuY29uc3QgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRjb25zdCBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0Y29uc3QgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdGNvbnN0IGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHRjb25zdCBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlci92YWx1ZSBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0aWYoQXJyYXkuaXNBcnJheShkZWZpbml0aW9uKSkge1xuXHRcdHZhciBpID0gMDtcblx0XHR3aGlsZShpIDwgZGVmaW5pdGlvbi5sZW5ndGgpIHtcblx0XHRcdHZhciBrZXkgPSBkZWZpbml0aW9uW2krK107XG5cdFx0XHR2YXIgYmluZGluZyA9IGRlZmluaXRpb25baSsrXTtcblx0XHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0XHRpZihiaW5kaW5nID09PSAwKSB7XG5cdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogZGVmaW5pdGlvbltpKytdIH0pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBiaW5kaW5nIH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYoYmluZGluZyA9PT0gMCkgeyBpKys7IH1cblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZihTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCJAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzXCI7XG5pbXBvcnQge1xuICAgIENvbnRleHQsXG4gICAgU2VydmVybGVzc0NhbGxiYWNrLFxuICAgIFNlcnZlcmxlc3NFdmVudE9iamVjdCxcbiAgICBTZXJ2ZXJsZXNzRnVuY3Rpb25TaWduYXR1cmUsXG59IGZyb20gXCJAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzL3R5cGVzXCI7XG5pbXBvcnQgQlZOU1BIYW5kbGVyLCB7IEJWTlNQRXZlbnQgfSBmcm9tIFwiLi9idm5zcF9oYW5kbGVyXCI7XG5pbXBvcnQgeyBIYW5kbGVyRW52aXJvbm1lbnQgfSBmcm9tIFwiLi4vZW52L2hhbmRsZXJfY29uZmlnXCI7XG5cbmNvbnN0IE5FWFRfU1RFUF9DT09LSUVfTkFNRSA9IFwiYnZuc3BfbmV4dF9zdGVwXCI7XG5cbi8qKlxuICogVHdpbGlvIFNlcnZlcmxlc3MgZnVuY3Rpb24gaGFuZGxlciBmb3IgQlZOU1AgYm90IGNvbW1hbmRzLlxuICogQHBhcmFtIHtDb250ZXh0PEhhbmRsZXJFbnZpcm9ubWVudD59IGNvbnRleHQgLSBUaGUgVHdpbGlvIHNlcnZlcmxlc3MgY29udGV4dC5cbiAqIEBwYXJhbSB7U2VydmVybGVzc0V2ZW50T2JqZWN0PEJWTlNQRXZlbnQ+fSBldmVudCAtIFRoZSBldmVudCBvYmplY3QuXG4gKiBAcGFyYW0ge1NlcnZlcmxlc3NDYWxsYmFja30gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBjb25zdCBoYW5kbGVyOiBTZXJ2ZXJsZXNzRnVuY3Rpb25TaWduYXR1cmU8XG4gICAgSGFuZGxlckVudmlyb25tZW50LFxuICAgIEJWTlNQRXZlbnRcbj4gPSBhc3luYyBmdW5jdGlvbiAoXG4gICAgY29udGV4dDogQ29udGV4dDxIYW5kbGVyRW52aXJvbm1lbnQ+LFxuICAgIGV2ZW50OiBTZXJ2ZXJsZXNzRXZlbnRPYmplY3Q8QlZOU1BFdmVudD4sXG4gICAgY2FsbGJhY2s6IFNlcnZlcmxlc3NDYWxsYmFja1xuKSB7XG4gICAgY29uc3QgaGFuZGxlciA9IG5ldyBCVk5TUEhhbmRsZXIoY29udGV4dCwgZXZlbnQpO1xuICAgIGxldCBtZXNzYWdlOiBzdHJpbmc7XG4gICAgbGV0IG5leHRfc3RlcDogc3RyaW5nID0gXCJcIjtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBoYW5kbGVyX3Jlc3BvbnNlID0gYXdhaXQgaGFuZGxlci5oYW5kbGUoKTtcbiAgICAgICAgbWVzc2FnZSA9XG4gICAgICAgICAgICBoYW5kbGVyX3Jlc3BvbnNlLnJlc3BvbnNlIHx8XG4gICAgICAgICAgICBcIlVuZXhwZWN0ZWQgcmVzdWx0IC0gbm8gcmVzcG9uc2UgZGV0ZXJtaW5lZFwiO1xuICAgICAgICBuZXh0X3N0ZXAgPSBoYW5kbGVyX3Jlc3BvbnNlLm5leHRfc3RlcCB8fCBcIlwiO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJBbiBlcnJvciBvY2N1cmVkXCIpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZSkpO1xuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICB9XG4gICAgICAgIG1lc3NhZ2UgPSBcIkFuIHVuZXhwZWN0ZWQgZXJyb3Igb2NjdXJlZC5cIjtcbiAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgbWVzc2FnZSArPSBcIlxcblwiICsgZS5tZXNzYWdlO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvclwiLCBlLnN0YWNrKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3JcIiwgZS5uYW1lKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3JcIiwgZS5tZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHJlc3BvbnNlID0gbmV3IFR3aWxpby5SZXNwb25zZSgpO1xuICAgIGNvbnN0IHR3aW1sID0gbmV3IFR3aWxpby50d2ltbC5NZXNzYWdpbmdSZXNwb25zZSgpO1xuXG4gICAgdHdpbWwubWVzc2FnZShtZXNzYWdlKTtcblxuICAgIHJlc3BvbnNlXG4gICAgICAgIC8vIEFkZCB0aGUgc3RyaW5naWZpZWQgVHdpTUwgdG8gdGhlIHJlc3BvbnNlIGJvZHlcbiAgICAgICAgLnNldEJvZHkodHdpbWwudG9TdHJpbmcoKSlcbiAgICAgICAgLy8gU2luY2Ugd2UncmUgcmV0dXJuaW5nIFR3aU1MLCB0aGUgY29udGVudCB0eXBlIG11c3QgYmUgWE1MXG4gICAgICAgIC5hcHBlbmRIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJ0ZXh0L3htbFwiKVxuICAgICAgICAuc2V0Q29va2llKE5FWFRfU1RFUF9DT09LSUVfTkFNRSwgbmV4dF9zdGVwKTtcblxuICAgIHJldHVybiBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7XG59OyJdLCJuYW1lcyI6WyJDaGVja2luVmFsdWUiLCJ1c2VyX2NyZWRzX2NvbmZpZyIsIk5TUF9FTUFJTF9ET01BSU4iLCJmaW5kX3BhdHJvbGxlcl9jb25maWciLCJTSEVFVF9JRCIsIlBIT05FX05VTUJFUl9MT09LVVBfU0hFRVQiLCJQSE9ORV9OVU1CRVJfTkFNRV9DT0xVTU4iLCJQSE9ORV9OVU1CRVJfTlVNQkVSX0NPTFVNTiIsImxvZ2luX3NoZWV0X2NvbmZpZyIsIkxPR0lOX1NIRUVUX0xPT0tVUCIsIkNIRUNLSU5fQ09VTlRfTE9PS1VQIiwiU0hFRVRfREFURV9DRUxMIiwiQ1VSUkVOVF9EQVRFX0NFTEwiLCJBUkNISVZFRF9DRUxMIiwiTkFNRV9DT0xVTU4iLCJDQVRFR09SWV9DT0xVTU4iLCJTRUNUSU9OX0RST1BET1dOX0NPTFVNTiIsIkNIRUNLSU5fRFJPUERPV05fQ09MVU1OIiwic2Vhc29uX3NoZWV0X2NvbmZpZyIsIlNFQVNPTl9TSEVFVCIsIlNFQVNPTl9TSEVFVF9OQU1FX0NPTFVNTiIsIlNFQVNPTl9TSEVFVF9EQVlTX0NPTFVNTiIsInNlY3Rpb25fY29uZmlnIiwiU0VDVElPTl9WQUxVRVMiLCJndWVzdF9wYXNzZXNfY29uZmlnIiwiR1VFU1RfUEFTU19TSEVFVCIsIkdVRVNUX1BBU1NfRUxJR0lCTEVfQ09MVU1OIiwiR1VFU1RfUEFTU19FTElHSUJMRV9SRUFTT05fQ09MVU1OIiwiR1VFU1RfUEFTU19TSEVFVF9OQU1FX0NPTFVNTiIsIkdVRVNUX1BBU1NfU0hFRVRfQVZBSUxBQkxFX0NPTFVNTiIsIkdVRVNUX1BBU1NfU0hFRVRfVVNFRF9UT0RBWV9DT0xVTU4iLCJHVUVTVF9QQVNTX1NIRUVUX1VTRURfU0VBU09OX0NPTFVNTiIsIkdVRVNUX1BBU1NfU0hFRVRfREFURVNfU1RBUlRJTkdfQ09MVU1OIiwiaGFuZGxlcl9jb25maWciLCJTQ1JJUFRfSUQiLCJTWU5DX1NJRCIsIkFSQ0hJVkVfRlVOQ1RJT05fTkFNRSIsIlJFU0VUX0ZVTkNUSU9OX05BTUUiLCJVU0VfU0VSVklDRV9BQ0NPVU5UIiwiQUNUSU9OX0xPR19TSEVFVCIsIkNIRUNLSU5fVkFMVUVTIiwiQ09ORklHIiwiZ29vZ2xlIiwiTG9naW5TaGVldCIsIlNlYXNvblNoZWV0IiwiVXNlckNyZWRzIiwiQ2hlY2tpblZhbHVlcyIsImdldF9zZXJ2aWNlX2NyZWRlbnRpYWxzX3BhdGgiLCJleGNlbF9yb3dfdG9faW5kZXgiLCJzYW5pdGl6ZV9waG9uZV9udW1iZXIiLCJidWlsZF9wYXNzZXNfc3RyaW5nIiwiR3Vlc3RQYXNzU2hlZXQiLCJTZWN0aW9uVmFsdWVzIiwiTkVYVF9TVEVQUyIsIkFXQUlUX0NPTU1BTkQiLCJBV0FJVF9DSEVDS0lOIiwiQ09ORklSTV9SRVNFVCIsIkFVVEhfUkVTRVQiLCJBV0FJVF9TRUNUSU9OIiwiQVdBSVRfUEFTUyIsIkFXQUlUX01FU1NBR0UiLCJBV0FJVF9CUk9BRENBU1QiLCJDT01NQU5EUyIsIk9OX0RVVFkiLCJTVEFUVVMiLCJDSEVDS0lOIiwiU0VDVElPTl9BU1NJR05NRU5UIiwiR1VFU1RfUEFTUyIsIldIQVRTQVBQIiwiTUVTU0FHRSIsIkJST0FEQ0FTVCIsIlNNU19NQVhfTEVOR1RIIiwiTUVTU0FHRV9QUkVGSVhfVEVNUExBVEUiLCJNRVNTQUdFX1BSRUZJWF9TVUZGSVgiLCJ2YWxpZGF0ZV9zbXNfbWVzc2FnZSIsImZ1bGxfbWVzc2FnZSIsIlNlZ21lbnRlZE1lc3NhZ2UiLCJyZXF1aXJlIiwic2VnbWVudGVkIiwibm9uX2dzbSIsImdldE5vbkdzbUNoYXJhY3RlcnMiLCJsZW5ndGgiLCJ2YWxpZCIsInJlYXNvbiIsIm5vbl9nc21fY2hhcmFjdGVycyIsIlNldCIsInNlZ21lbnRzQ291bnQiLCJzZWdtZW50c19jb3VudCIsImZvcm1hdF9waG9uZV9mb3JfZGlzcGxheSIsInRlbl9kaWdpdHMiLCJzdWJzdHJpbmciLCJCVk5TUEhhbmRsZXIiLCJTQ09QRVMiLCJzbXNfcmVxdWVzdCIsInJlc3VsdF9tZXNzYWdlcyIsImZyb20iLCJ0byIsImJvZHkiLCJib2R5X3JhdyIsInBhdHJvbGxlciIsImJ2bnNwX25leHRfc3RlcCIsImNoZWNraW5fbW9kZSIsImZhc3RfY2hlY2tpbiIsImFzc2lnbmVkX3NlY3Rpb24iLCJ0d2lsaW9fY2xpZW50Iiwic3luY19zaWQiLCJyZXNldF9zY3JpcHRfaWQiLCJzeW5jX2NsaWVudCIsInVzZXJfY3JlZHMiLCJzZXJ2aWNlX2NyZWRzIiwic2hlZXRzX3NlcnZpY2UiLCJ1c2VyX3NjcmlwdHNfc2VydmljZSIsImxvZ2luX3NoZWV0Iiwic2Vhc29uX3NoZWV0IiwiZ3Vlc3RfcGFzc19zaGVldCIsImNoZWNraW5fdmFsdWVzIiwiY3VycmVudF9zaGVldF9kYXRlIiwiY29tYmluZWRfY29uZmlnIiwiY29uZmlnIiwic2VjdGlvbl92YWx1ZXMiLCJjb250ZXh0IiwiZXZlbnQiLCJGcm9tIiwibnVtYmVyIiwidW5kZWZpbmVkIiwidGVzdF9udW1iZXIiLCJUbyIsIkJvZHkiLCJ0b0xvd2VyQ2FzZSIsInRyaW0iLCJyZXBsYWNlIiwicmVxdWVzdCIsImNvb2tpZXMiLCJnZXRUd2lsaW9DbGllbnQiLCJlIiwiY29uc29sZSIsImxvZyIsIkRhdGUiLCJwYXJzZV9mYXN0X2NoZWNraW5fbW9kZSIsInBhcnNlZCIsInBhcnNlX2Zhc3RfY2hlY2tpbiIsImtleSIsInBhcnNlX2NoZWNraW4iLCJwYXJzZV9jaGVja2luX2Zyb21fbmV4dF9zdGVwIiwibGFzdF9zZWdtZW50Iiwic3BsaXQiLCJzbGljZSIsImJ5X2tleSIsImRlbGF5Iiwic2Vjb25kcyIsIm9wdGlvbmFsIiwiUHJvbWlzZSIsInJlcyIsInNldFRpbWVvdXQiLCJzZW5kX21lc3NhZ2UiLCJtZXNzYWdlIiwiZ2V0X3R3aWxpb19jbGllbnQiLCJtZXNzYWdlcyIsImNyZWF0ZSIsInB1c2giLCJoYW5kbGUiLCJyZXN1bHQiLCJfaGFuZGxlIiwicmVzcG9uc2UiLCJqb2luIiwibmV4dF9zdGVwIiwibG9nb3V0IiwiY2hlY2tfdXNlcl9jcmVkcyIsImdldF9tYXBwZWRfcGF0cm9sbGVyIiwiYXdhaXRfcmVzcG9uc2UiLCJoYW5kbGVfYXdhaXRfY29tbWFuZCIsImNoZWNraW4iLCJzdGFydHNXaXRoIiwibmFtZSIsInJlc2V0X3NoZWV0X2Zsb3ciLCJzZWN0aW9uIiwicGFyc2Vfc2VjdGlvbiIsImFzc2lnbl9zZWN0aW9uIiwicHJvbXB0X3NlY3Rpb25fYXNzaWdubWVudCIsInNlbmRfdGV4dF9tZXNzYWdlIiwic2VuZF9icm9hZGNhc3RfbWVzc2FnZSIsInByb21wdF9jb21tYW5kIiwicGF0cm9sbGVyX25hbWUiLCJpbmNsdWRlcyIsImdldF9vbl9kdXR5IiwiZ2V0X3N0YXR1cyIsInByb21wdF9jaGVja2luIiwicHJvbXB0X2d1ZXN0X3Bhc3MiLCJwYXJzZV9mYXN0X3NlY3Rpb25fYXNzaWdubWVudCIsInByb21wdF9tZXNzYWdlIiwicHJvbXB0X2Jyb2FkY2FzdCIsInR5cGVzIiwiT2JqZWN0IiwidmFsdWVzIiwibWFwIiwieCIsInNtc19kZXNjIiwic2VnbWVudHMiLCJsYXN0U2VnbWVudCIsInBvcCIsImZpcnN0UGFydCIsIm1hcF9zZWN0aW9uIiwic2VjdGlvbl9kZXNjcmlwdGlvbiIsImdldF9zZWN0aW9uX2Rlc2NyaXB0aW9uIiwiZ2V0X21lc3NhZ2VfcHJlZml4Iiwic2VuZGVyX25hbWUiLCJzZW5kZXJfcGhvbmUiLCJmb3JtYXR0ZWRfcGhvbmUiLCJnZXRfbWF4X21lc3NhZ2VfbGVuZ3RoIiwiZ2V0X2xvZ2luX3NoZWV0IiwicmVjaXBpZW50cyIsImdldF9vbl9kdXR5X3BhdHJvbGxlcnMiLCJtYXhfbGVuZ3RoIiwibWVzc2FnZV90ZXh0IiwicHJlZml4IiwidmFsaWRhdGlvbiIsImJhZF9jaGFycyIsInNpZ25lZF9pbl9wYXRyb2xsZXJzIiwicGhvbmVfbWFwIiwiZ2V0X3Bob25lX251bWJlcl9tYXAiLCJyZWNpcGllbnRfbWFwIiwibm9fcGhvbmVfbmFtZXMiLCJwaG9uZSIsInNlbnRfY291bnQiLCJjb3B5X3NlbnRfdG9fc2VuZGVyIiwiZmFpbGVkX25hbWVzIiwiZGVsaXZlcl9zbXNfdG9fbWFwIiwibG9nX2FjdGlvbiIsImFsbF9mYWlsZWQiLCJlbnRyaWVzIiwibm9ybWFsaXplZF9zZW5kZXIiLCJzZW5kZXJfaW5fbWFwIiwicmVjaXBpZW50X2NvdW50Iiwia2V5cyIsImdldF9zaGVldHNfc2VydmljZSIsIm9wdHMiLCJzcHJlYWRzaGVldHMiLCJnZXQiLCJzcHJlYWRzaGVldElkIiwicmFuZ2UiLCJ2YWx1ZVJlbmRlck9wdGlvbiIsImRhdGEiLCJyb3ciLCJyYXdOdW1iZXIiLCJhc3NpZ25lZFNlY3Rpb24iLCJtYXBwZWRfc2VjdGlvbiIsInJlZnJlc2giLCJzaGVldF9kYXRlIiwidG9EYXRlU3RyaW5nIiwiY3VycmVudF9kYXRlIiwiaXNfY3VycmVudCIsImdldF9zdGF0dXNfc3RyaW5nIiwiZ3Vlc3RfcGFzc19wcm9taXNlIiwiZ2V0X2d1ZXN0X3Bhc3Nfc2hlZXQiLCJnZXRfYXZhaWxhYmxlX2FuZF91c2VkX3Bhc3NlcyIsInBhdHJvbGxlcl9zdGF0dXMiLCJjaGVja2luQ29sdW1uU2V0IiwiY2hlY2tlZE91dCIsImJ5X3NoZWV0X3N0cmluZyIsInN0YXR1cyIsInRvU3RyaW5nIiwiY29tcGxldGVkUGF0cm9sRGF5cyIsImdldF9zZWFzb25fc2hlZXQiLCJnZXRfcGF0cm9sbGVkX2RheXMiLCJjb21wbGV0ZWRQYXRyb2xEYXlzU3RyaW5nIiwibG9naW5TaGVldERhdGUiLCJzdGF0dXNTdHJpbmciLCJ1c2VkVG9kYXlHdWVzdFBhc3NlcyIsInVzZWRfdG9kYXkiLCJ1c2VkU2Vhc29uR3Vlc3RQYXNzZXMiLCJ1c2VkX3NlYXNvbiIsImF2YWlsYWJsZUd1ZXN0UGFzc2VzIiwiYXZhaWxhYmxlIiwic2hlZXRfbmVlZHNfcmVzZXQiLCJFcnJvciIsIm5ld19jaGVja2luX3ZhbHVlIiwic2hlZXRzX3ZhbHVlIiwiZmFzdF9jaGVja2lucyIsInJlc2V0X3NoZWV0Iiwic2NyaXB0X3NlcnZpY2UiLCJnZXRfdXNlcl9zY3JpcHRzX3NlcnZpY2UiLCJzaG91bGRfcGVyZm9ybV9hcmNoaXZlIiwiYXJjaGl2ZWQiLCJzY3JpcHRzIiwicnVuIiwic2NyaXB0SWQiLCJyZXF1ZXN0Qm9keSIsImZ1bmN0aW9uIiwiZ2V0X3VzZXJfY3JlZHMiLCJsb2FkVG9rZW4iLCJhdXRoVXJsIiwiZ2V0QXV0aFVybCIsImNoZWNrZWRfb3V0X3NlY3Rpb24iLCJsYXN0X3NlY3Rpb25zIiwib25fZHV0eV9wYXRyb2xsZXJzIiwiYnlfc2VjdGlvbiIsImZpbHRlciIsInJlZHVjZSIsInByZXYiLCJjdXIiLCJzaG9ydF9jb2RlIiwicmVzdWx0cyIsImFsbF9rZXlzIiwib3JkZXJlZF9wcmltYXJ5X3NlY3Rpb25zIiwic29ydCIsImZpbHRlcmVkX2xhc3Rfc2VjdGlvbnMiLCJvcmRlcmVkX3NlY3Rpb25zIiwiY29uY2F0IiwicGF0cm9sbGVycyIsInkiLCJsb2NhbGVDb21wYXJlIiwicGF0cm9sbGVyX3N0cmluZyIsImRldGFpbHMiLCJ0b1VwcGVyQ2FzZSIsInIiLCJhY3Rpb25fbmFtZSIsImFwcGVuZCIsInZhbHVlSW5wdXRPcHRpb24iLCJkZWxldGVUb2tlbiIsImdldF9zeW5jX2NsaWVudCIsInN5bmMiLCJ2MSIsInNlcnZpY2VzIiwiZ2V0X3NlcnZpY2VfY3JlZHMiLCJhdXRoIiwiR29vZ2xlQXV0aCIsImtleUZpbGUiLCJzY29wZXMiLCJnZXRfdmFsaWRfY3JlZHMiLCJyZXF1aXJlX3VzZXJfY3JlZHMiLCJvYXV0aDJfY2xpZW50Iiwic2hlZXRzIiwidmVyc2lvbiIsInNjcmlwdCIsImZvcmNlIiwicGhvbmVfbG9va3VwIiwiZmluZF9wYXRyb2xsZXJfZnJvbV9udW1iZXIiLCJtYXBwZWRQYXRyb2xsZXIiLCJ0cnlfZmluZF9wYXRyb2xsZXIiLCJyYXdfbnVtYmVyIiwiY3VycmVudE51bWJlciIsImN1cnJlbnROYW1lIiwic2hlZXQiLCJ1c2VkX2FuZF9hdmFpbGFibGUiLCJnZXRfcHJvbXB0Iiwic2V0X3VzZWRfZ3Vlc3RfcGFzc2VzIiwidXBkYXRlZCIsInJvd19jb2xfdG9fZXhjZWxfaW5kZXgiLCJwYXJzZV9ib29sZWFuX2NlbGwiLCJHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYiIsImZvcm1hdF9kYXRlX2Zvcl9zcHJlYWRzaGVldF92YWx1ZSIsIlVzZWRBbmRBdmFpbGFibGVQYXNzZXMiLCJpbmRleCIsImVsaWdpYmxlIiwiZWxpZ2libGVfcmVhc29uIiwiU3RyaW5nIiwiTnVtYmVyIiwiUGFzc1NoZWV0IiwicGF0cm9sbGVyX3JvdyIsImdldF9zaGVldF9yb3dfZm9yX3BhdHJvbGxlciIsIm5hbWVfY29sdW1uIiwiZWxpZ2libGVfY29sdW1uIiwiZWxpZ2libGVfcmVhc29uX2NvbHVtbiIsImN1cnJlbnRfZGF5X2F2YWlsYWJsZV9wYXNzZXMiLCJhdmFpbGFibGVfY29sdW1uIiwiY3VycmVudF9kYXlfdXNlZF9wYXNzZXMiLCJ1c2VkX3RvZGF5X2NvbHVtbiIsImN1cnJlbnRfc2Vhc29uX3VzZWRfcGFzc2VzIiwidXNlZF9zZWFzb25fY29sdW1uIiwicm93bnVtIiwic3RhcnRfaW5kZXgiLCJwcmlvcl9sZW5ndGgiLCJjdXJyZW50X2RhdGVfc3RyaW5nIiwibmV3X3ZhbHMiLCJ1cGRhdGVfbGVuZ3RoIiwiTWF0aCIsIm1heCIsImVuZF9pbmRleCIsInNoZWV0X25hbWUiLCJ1cGRhdGVfdmFsdWVzIiwibG9va3VwX3Jvd19jb2xfaW5fc2hlZXQiLCJzYW5pdGl6ZV9kYXRlIiwiY2hlY2tpbl9jb3VudF9zaGVldCIsInJvd3MiLCJjaGVja2luX2NvdW50IiwiZ2V0X3ZhbHVlcyIsImkiLCJwYXJzZV9wYXRyb2xsZXJfcm93IiwiZ2V0VGltZSIsImZpbmRfcGF0cm9sbGVyIiwiSlNPTiIsInN0cmluZ2lmeSIsInBhdHJvbGxlcl9zZWN0aW9uIiwibmV3X3NlY3Rpb25fdmFsdWUiLCJjYXRlZ29yeSIsImZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2N1cnJlbnRfZGF5IiwiY3VycmVudERheSIsImRheXNCZWZvcmVUb2RheSIsImxvYWRfY3JlZGVudGlhbHNfZmlsZXMiLCJ2YWxpZGF0ZV9zY29wZXMiLCJkb21haW4iLCJsb2FkZWQiLCJjcmVkZW50aWFscyIsImNsaWVudF9zZWNyZXQiLCJjbGllbnRfaWQiLCJyZWRpcmVjdF91cmlzIiwid2ViIiwiT0F1dGgyIiwidG9rZW5fa2V5Iiwib2F1dGgyRG9jIiwiZG9jdW1lbnRzIiwiZmV0Y2giLCJ0b2tlbiIsInNldENyZWRlbnRpYWxzIiwic2lkIiwicmVtb3ZlIiwiY29tcGxldGVMb2dpbiIsImNvZGUiLCJnZXRUb2tlbiIsInRva2VucyIsIm9hdXRoRG9jIiwidW5pcXVlTmFtZSIsInVwZGF0ZSIsImlkIiwiZ2VuZXJhdGVSYW5kb21TdHJpbmciLCJkb2MiLCJ0dGwiLCJhY2Nlc3NfdHlwZSIsInNjb3BlIiwic3RhdGUiLCJnZW5lcmF0ZUF1dGhVcmwiLCJjaGFyYWN0ZXJzIiwiY2hhcmFjdGVyc0xlbmd0aCIsImNoYXJBdCIsImZsb29yIiwicmFuZG9tIiwiVXNlckNyZWRzU2NvcGVzIiwibG9va3VwX3ZhbHVlcyIsIkFycmF5Iiwic21zX2Rlc2Nfc3BsaXQiLCJsb29rdXBfdmFscyIsImJ5X2x2IiwiYnlfZmMiLCJjaGVja2luVmFsdWVzIiwiY2hlY2tpblZhbHVlIiwibHYiLCJmYyIsImNoZWNraW5fbG93ZXIiLCJleGNlbF9kYXRlX3RvX2pzX2RhdGUiLCJkYXRlIiwic2V0VVRDTWlsbGlzZWNvbmRzIiwicm91bmQiLCJjaGFuZ2VfdGltZXpvbmVfdG9fcHN0IiwidG9VVENTdHJpbmciLCJzdHJpcF9kYXRldGltZV90b19kYXRlIiwidG9Mb2NhbGVEYXRlU3RyaW5nIiwidGltZVpvbmUiLCJkYXRlc3RyIiwicGFkU3RhcnQiLCJmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9kYXRlIiwibGlzdCIsImVuZHNXaXRoIiwiZnMiLCJwYXJzZSIsInJlYWRGaWxlU3luYyIsIlJ1bnRpbWUiLCJnZXRBc3NldHMiLCJwYXRoIiwic2hlZXRfaWQiLCJfZ2V0X3ZhbHVlcyIsImxvb2t1cF9pbmRleCIsInVwZGF0ZU1lIiwibG9va3VwUmFuZ2UiLCJ1c2VkIiwidG90YWwiLCJ0b2RheSIsImZvcmNlX3RvZGF5IiwiZGVzaXJlZF9zY29wZXMiLCJkZXNpcmVkX3Njb3BlIiwiZXJyb3IiLCJzZWN0aW9ucyIsImxvd2VyY2FzZV9zZWN0aW9ucyIsImluZGV4T2YiLCJjb2wiLCJjb2xTdHJpbmciLCJtb2R1bG8iLCJjb2xMZXR0ZXIiLCJmcm9tQ2hhckNvZGUiLCJjaGFyQ29kZUF0Iiwic3BsaXRfdG9fcm93X2NvbCIsImV4Y2VsX2luZGV4IiwicmVnZXgiLCJSZWdFeHAiLCJtYXRjaCIsImV4ZWMiLCJyYXdfcm93IiwibGV0dGVycyIsImxvd2VyTGV0dGVycyIsInAiLCJjaGFyYWN0ZXJWYWx1ZSIsInZhbHVlIiwibmV3X251bWJlciIsInRlbXBvcmFyeV9uZXdfbnVtYmVyIiwicGFyc2VJbnQiLCJORVhUX1NURVBfQ09PS0lFX05BTUUiLCJoYW5kbGVyIiwiY2FsbGJhY2siLCJoYW5kbGVyX3Jlc3BvbnNlIiwic3RhY2siLCJUd2lsaW8iLCJSZXNwb25zZSIsInR3aW1sIiwiTWVzc2FnaW5nUmVzcG9uc2UiLCJzZXRCb2R5IiwiYXBwZW5kSGVhZGVyIiwic2V0Q29va2llIl0sInNvdXJjZVJvb3QiOiIifQ==