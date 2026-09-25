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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlci5wcm90ZWN0ZWQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQXVEO0FBeUJ2RCxNQUFNQyxvQkFBcUM7SUFDdkNDLGtCQUFrQjtBQUN0QjtBQWlCQSxNQUFNQyx3QkFBNkM7SUFDL0NDLFVBQVU7SUFDVkMsMkJBQTJCO0lBQzNCQywwQkFBMEI7SUFDMUJDLDRCQUE0QjtBQUNoQztBQTZCQSxNQUFNQyxxQkFBdUM7SUFDekNKLFVBQVU7SUFDVkssb0JBQW9CO0lBQ3BCQyxzQkFBc0I7SUFDdEJDLGlCQUFpQjtJQUNqQkMsbUJBQW1CO0lBQ25CQyxlQUFlO0lBQ2ZDLGFBQWE7SUFDYkMsaUJBQWlCO0lBQ2pCQyx5QkFBeUI7SUFDekJDLHlCQUF5QjtBQUM3QjtBQWdCQSxNQUFNQyxzQkFBeUM7SUFDM0NkLFVBQVU7SUFDVmUsY0FBYztJQUNkQywwQkFBMEI7SUFDMUJDLDBCQUEwQjtBQUM5QjtBQVVBLE1BQU1DLGlCQUFnQztJQUNsQ0MsZ0JBQWlCO0FBQ3JCO0FBMEJBLE1BQU1DLHNCQUF5QztJQUMzQ3BCLFVBQVU7SUFDVnFCLGtCQUFrQjtJQUNsQkMsNEJBQTRCO0lBQzVCQyxtQ0FBbUM7SUFDbkNDLDhCQUE4QjtJQUM5QkMsbUNBQW1DO0lBQ25DQyxvQ0FBb0M7SUFDcENDLHFDQUFxQztJQUNyQ0Msd0NBQXdDO0FBQzVDO0FBd0JBLE1BQU1DLGlCQUFnQztJQUNsQzdCLFVBQVU7SUFDVjhCLFdBQVc7SUFDWEMsVUFBVTtJQUNWQyx1QkFBdUI7SUFDdkJDLHFCQUFxQjtJQUNyQkMscUJBQXFCO0lBQ3JCQyxrQkFBa0I7SUFDbEJDLGdCQUFnQjtRQUNaLElBQUl4QywrREFBWUEsQ0FBQyxPQUFPLFdBQVcsZUFBZTtZQUFDO1NBQWM7UUFDakUsSUFBSUEsK0RBQVlBLENBQUMsTUFBTSxXQUFXLGNBQWM7WUFBQztTQUFhO1FBQzlELElBQUlBLCtEQUFZQSxDQUFDLE1BQU0sV0FBVyxnQkFBZ0I7WUFBQztTQUFhO1FBQ2hFLElBQUlBLCtEQUFZQSxDQUFDLE9BQU8sZUFBZSxpQkFBaUI7WUFBQztZQUFZO1NBQVk7S0FDcEY7QUFDTDtBQStCQSxNQUFNeUMsU0FBeUI7SUFDM0IsR0FBR1IsY0FBYztJQUNqQixHQUFHOUIscUJBQXFCO0lBQ3hCLEdBQUdLLGtCQUFrQjtJQUNyQixHQUFHZ0IsbUJBQW1CO0lBQ3RCLEdBQUdOLG1CQUFtQjtJQUN0QixHQUFHakIsaUJBQWlCO0lBQ3BCLEdBQUdxQixjQUFjO0FBQ3JCO0FBY0U7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pQNkM7QUFPUztBQVd6QjtBQUNnQztBQUNkO0FBQ1Q7QUFDYztBQUNXO0FBQ087QUFDYjtBQUNEO0FBQ0o7QUFvQi9DLE1BQU0rQixhQUFhO0lBQ3RCQyxlQUFlO0lBQ2ZDLGVBQWU7SUFDZkMsZUFBZTtJQUNmQyxZQUFZO0lBQ1pDLGVBQWU7SUFDZkMsWUFBWTtJQUNaQyxlQUFlO0lBQ2ZDLGlCQUFpQjtBQUNyQixFQUFFO0FBRUYsTUFBTUMsV0FBVztJQUNiQyxTQUFTO1FBQUM7UUFBVTtLQUFVO0lBQzlCQyxRQUFRO1FBQUM7S0FBUztJQUNsQkMsU0FBUztRQUFDO1FBQVc7S0FBVztJQUNoQ0Msb0JBQW9CO1FBQUM7UUFBVztRQUFzQjtRQUFxQjtLQUFhO0lBQ3hGQyxZQUFZO1FBQUM7UUFBYztRQUFhO0tBQVE7SUFDaERDLFVBQVU7UUFBQztLQUFXO0lBQ3RCQyxTQUFTO1FBQUM7UUFBVztLQUFNO0lBQzNCQyxXQUFXO1FBQUM7S0FBWTtBQUM1QjtBQUVPLE1BQU1DLGlCQUFpQixJQUFJO0FBQzNCLE1BQU1DLDBCQUEwQixnQkFBZ0I7QUFDaEQsTUFBTUMsd0JBQXdCLEtBQUs7QUFnQjFDOzs7Ozs7Ozs7Q0FTQyxHQUNNLFNBQVNDLHFCQUFxQkMsWUFBb0I7SUFDckQsTUFBTSxFQUFFQyxnQkFBZ0IsRUFBRSxHQUFHQyxtQkFBT0EsQ0FBQyx3REFBeUI7SUFDOUQsTUFBTUMsWUFBWSxJQUFJRixpQkFBaUJEO0lBQ3ZDLE1BQU1JLFVBQVVELFVBQVVFLG1CQUFtQjtJQUU3QyxJQUFJRCxRQUFRRSxNQUFNLEdBQUcsR0FBRztRQUNwQixPQUFPO1lBQ0hDLE9BQU87WUFDUEMsUUFBUTtZQUNSQyxvQkFBb0I7bUJBQUksSUFBSUMsSUFBSU47YUFBUztRQUM3QztJQUNKO0lBRUEsSUFBSUQsVUFBVVEsYUFBYSxHQUFHLEdBQUc7UUFDN0IsT0FBTztZQUNISixPQUFPO1lBQ1BDLFFBQVE7WUFDUkksZ0JBQWdCVCxVQUFVUSxhQUFhO1FBQzNDO0lBQ0o7SUFFQSxPQUFPO1FBQUVKLE9BQU87SUFBSztBQUN6QjtBQUVBOzs7O0NBSUMsR0FDTSxTQUFTTSx5QkFBeUJDLFVBQWtCO0lBQ3ZELE9BQU8sQ0FBQyxDQUFDLEVBQUVBLFdBQVdDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFRCxXQUFXQyxTQUFTLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRUQsV0FBV0MsU0FBUyxDQUFDLEdBQUcsS0FBSztBQUN4RztBQUVlLE1BQU1DO0lBQ2pCQyxTQUFtQjtRQUFDO0tBQStDLENBQUM7SUFFcEVDLFlBQXFCO0lBQ3JCQyxrQkFBNEIsRUFBRSxDQUFDO0lBQy9CQyxLQUFhO0lBQ2JDLEdBQVc7SUFDWEMsS0FBeUI7SUFDekJDLFNBQTZCO0lBQzdCQyxVQUErQjtJQUMvQkMsZ0JBQW9DO0lBQ3BDQyxlQUE4QixLQUFLO0lBQ25DQyxlQUF3QixNQUFNO0lBQzlCQyxtQkFBa0MsS0FBSztJQUV2Q0MsZ0JBQXFDLEtBQUs7SUFDMUNDLFNBQWlCO0lBQ2pCQyxnQkFBd0I7SUFFeEIsZ0JBQWdCO0lBQ2hCQyxjQUFxQyxLQUFLO0lBQzFDQyxhQUErQixLQUFLO0lBQ3BDQyxnQkFBbUMsS0FBSztJQUN4Q0MsaUJBQTBDLEtBQUs7SUFDL0NDLHVCQUFnRCxLQUFLO0lBRXJEQyxjQUFpQyxLQUFLO0lBQ3RDQyxlQUFtQyxLQUFLO0lBQ3hDQyxtQkFBMEMsS0FBSztJQUUvQ0MsZUFBOEI7SUFDOUJDLG1CQUF5QjtJQUV6QkMsZ0JBQWdDO0lBQ2hDQyxPQUFzQjtJQUV0QkMsZUFBOEI7SUFFOUI7Ozs7S0FJQyxHQUNELFlBQ0lDLE9BQW9DLEVBQ3BDQyxLQUF3QyxDQUMxQztRQUNFLDBFQUEwRTtRQUMxRSxJQUFJLENBQUM1QixXQUFXLEdBQUcsQ0FBQzRCLE1BQU1DLElBQUksSUFBSUQsTUFBTUUsTUFBTSxNQUFNQztRQUNwRCxJQUFJLENBQUM3QixJQUFJLEdBQUcwQixNQUFNQyxJQUFJLElBQUlELE1BQU1FLE1BQU0sSUFBSUYsTUFBTUksV0FBVztRQUMzRCxJQUFJLENBQUM3QixFQUFFLEdBQUcvQyxrRUFBcUJBLENBQUN3RSxNQUFNSyxFQUFFO1FBQ3hDLElBQUksQ0FBQzdCLElBQUksR0FBR3dCLE1BQU1NLElBQUksRUFBRUMsZUFBZUMsT0FBT0MsUUFBUSxPQUFPO1FBQzdELElBQUksQ0FBQ2hDLFFBQVEsR0FBR3VCLE1BQU1NLElBQUk7UUFDMUIsSUFBSSxDQUFDM0IsZUFBZSxHQUNoQnFCLE1BQU1VLE9BQU8sQ0FBQ0MsT0FBTyxDQUFDaEMsZUFBZTtRQUN6QyxJQUFJLENBQUNpQixlQUFlLEdBQUc7WUFBRSxHQUFHNUUsdURBQU07WUFBRSxHQUFHK0UsT0FBTztRQUFDO1FBQy9DLElBQUksQ0FBQ0YsTUFBTSxHQUFHLElBQUksQ0FBQ0QsZUFBZTtRQUVsQyxJQUFJO1lBQ0EsSUFBSSxDQUFDYixhQUFhLEdBQUdnQixRQUFRYSxlQUFlO1FBQ2hELEVBQUUsT0FBT0MsR0FBRztZQUNSQyxRQUFRQyxHQUFHLENBQUMsb0NBQW9DRjtRQUNwRDtRQUNBLElBQUksQ0FBQzdCLFFBQVEsR0FBR2UsUUFBUXJGLFFBQVE7UUFDaEMsSUFBSSxDQUFDdUUsZUFBZSxHQUFHYyxRQUFRdEYsU0FBUztRQUN4QyxJQUFJLENBQUNpRSxTQUFTLEdBQUc7UUFFakIsSUFBSSxDQUFDZ0IsY0FBYyxHQUFHLElBQUlyRSxnRUFBYUEsQ0FBQ0wsdURBQU1BLENBQUNELGNBQWM7UUFDN0QsSUFBSSxDQUFDNEUsa0JBQWtCLEdBQUcsSUFBSXFCO1FBQzlCLElBQUksQ0FBQ2xCLGNBQWMsR0FBRyxJQUFJbkUsaUVBQWFBLENBQUMsSUFBSSxDQUFDaUUsZUFBZTtJQUNoRTtJQUVBOzs7O0tBSUMsR0FDRHFCLHdCQUF3QnpDLElBQVksRUFBRTtRQUNsQyxNQUFNMEMsU0FBUyxJQUFJLENBQUN4QixjQUFjLENBQUN5QixrQkFBa0IsQ0FBQzNDO1FBQ3RELElBQUkwQyxXQUFXZixXQUFXO1lBQ3RCLElBQUksQ0FBQ3ZCLFlBQVksR0FBR3NDLE9BQU9FLEdBQUc7WUFDOUIsSUFBSSxDQUFDdkMsWUFBWSxHQUFHO1lBQ3BCLE9BQU87UUFDWDtRQUNBLE9BQU87SUFDWDtJQUVBOzs7O0tBSUMsR0FDRHdDLGNBQWM3QyxJQUFZLEVBQUU7UUFDeEIsTUFBTTBDLFNBQVMsSUFBSSxDQUFDeEIsY0FBYyxDQUFDMkIsYUFBYSxDQUFDN0M7UUFDakQsSUFBSTBDLFdBQVdmLFdBQVc7WUFDdEIsSUFBSSxDQUFDdkIsWUFBWSxHQUFHc0MsT0FBT0UsR0FBRztZQUM5QixPQUFPO1FBQ1g7UUFDQSxPQUFPO0lBQ1g7SUFFQTs7O0tBR0MsR0FDREUsK0JBQStCO1FBQzNCLE1BQU1DLGVBQWUsSUFBSSxDQUFDNUMsZUFBZSxFQUNuQzZDLE1BQU0sS0FDUEMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFO1FBQ2pCLElBQUlGLGdCQUFnQkEsZ0JBQWdCLElBQUksQ0FBQzdCLGNBQWMsQ0FBQ2dDLE1BQU0sRUFBRTtZQUM1RCxJQUFJLENBQUM5QyxZQUFZLEdBQUcyQztZQUNwQixPQUFPO1FBQ1g7UUFDQSxPQUFPO0lBQ1g7SUFFQTs7Ozs7S0FLQyxHQUNESSxNQUFNQyxPQUFlLEVBQUVDLFdBQW9CLEtBQUssRUFBRTtRQUM5QyxJQUFJQSxZQUFZLENBQUMsSUFBSSxDQUFDekQsV0FBVyxFQUFFO1lBQy9Cd0QsVUFBVSxJQUFJO1FBQ2xCO1FBQ0EsT0FBTyxJQUFJRSxRQUFRLENBQUNDO1lBQ2hCQyxXQUFXRCxLQUFLSDtRQUNwQjtJQUNKO0lBRUE7Ozs7S0FJQyxHQUNELE1BQU1LLGFBQWFDLE9BQWUsRUFBRTtRQUNoQyxJQUFJLElBQUksQ0FBQzlELFdBQVcsRUFBRTtZQUNsQixNQUFNLElBQUksQ0FBQytELGlCQUFpQixHQUFHQyxRQUFRLENBQUNDLE1BQU0sQ0FBQztnQkFDM0M5RCxJQUFJLElBQUksQ0FBQ0QsSUFBSTtnQkFDYkEsTUFBTSxJQUFJLENBQUNDLEVBQUU7Z0JBQ2JDLE1BQU0wRDtZQUNWO1FBQ0osT0FBTztZQUNILElBQUksQ0FBQzdELGVBQWUsQ0FBQ2lFLElBQUksQ0FBQ0o7UUFDOUI7SUFDSjtJQUVBOzs7S0FHQyxHQUNELE1BQU1LLFNBQWlDO1FBQ25DLE1BQU1DLFNBQVMsTUFBTSxJQUFJLENBQUNDLE9BQU87UUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQ3JFLFdBQVcsRUFBRTtZQUNuQixJQUFJb0UsUUFBUUUsVUFBVTtnQkFDbEIsSUFBSSxDQUFDckUsZUFBZSxDQUFDaUUsSUFBSSxDQUFDRSxPQUFPRSxRQUFRO1lBQzdDO1lBQ0EsT0FBTztnQkFDSEEsVUFBVSxJQUFJLENBQUNyRSxlQUFlLENBQUNzRSxJQUFJLENBQUM7Z0JBQ3BDQyxXQUFXSixRQUFRSTtZQUN2QjtRQUNKO1FBQ0EsT0FBT0o7SUFDWDtJQUVBOzs7S0FHQyxHQUNELE1BQU1DLFVBQWtDO1FBQ3BDM0IsUUFBUUMsR0FBRyxDQUNQLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDekMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUNFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDRyxlQUFlLEVBQUU7UUFFbEcsSUFBSSxJQUFJLENBQUNILElBQUksSUFBSSxVQUFVO1lBQ3ZCc0MsUUFBUUMsR0FBRyxDQUFDLENBQUMsaUJBQWlCLENBQUM7WUFDL0IsT0FBTyxNQUFNLElBQUksQ0FBQzhCLE1BQU07UUFDNUI7UUFDQSxJQUFJSDtRQUNKLElBQUksQ0FBQyxJQUFJLENBQUM3QyxNQUFNLENBQUNoRixtQkFBbUIsRUFBRTtZQUNsQzZILFdBQVcsTUFBTSxJQUFJLENBQUNJLGdCQUFnQjtZQUN0QyxJQUFJSixVQUFVLE9BQU9BO1FBQ3pCO1FBQ0EsSUFBSSxJQUFJLENBQUNsRSxJQUFJLEVBQUUrQixrQkFBa0IsV0FBVztZQUN4QyxPQUFPO2dCQUFFbUMsVUFBVTtZQUF1QztRQUM5RDtRQUVBQSxXQUFXLE1BQU0sSUFBSSxDQUFDSyxvQkFBb0I7UUFDMUMsSUFBSUwsWUFBWSxJQUFJLENBQUNoRSxTQUFTLElBQUksTUFBTTtZQUNwQyxPQUNJZ0UsWUFBWTtnQkFDUkEsVUFBVTtZQUNkO1FBRVI7UUFFQSxJQUNJLENBQUMsQ0FBQyxJQUFJLENBQUMvRCxlQUFlLElBQ2xCLElBQUksQ0FBQ0EsZUFBZSxJQUFJL0MsV0FBV0MsYUFBYSxLQUNwRCxJQUFJLENBQUMyQyxJQUFJLEVBQ1g7WUFDRSxNQUFNd0UsaUJBQWlCLE1BQU0sSUFBSSxDQUFDQyxvQkFBb0I7WUFDdEQsSUFBSUQsZ0JBQWdCO2dCQUNoQixPQUFPQTtZQUNYO1FBQ0osT0FBTyxJQUNILElBQUksQ0FBQ3JFLGVBQWUsSUFBSS9DLFdBQVdFLGFBQWEsSUFDaEQsSUFBSSxDQUFDMEMsSUFBSSxFQUNYO1lBQ0UsSUFBSSxJQUFJLENBQUM2QyxhQUFhLENBQUMsSUFBSSxDQUFDN0MsSUFBSSxHQUFHO2dCQUMvQixPQUFPLE1BQU0sSUFBSSxDQUFDMEUsT0FBTztZQUM3QjtRQUNKLE9BQU8sSUFDSCxJQUFJLENBQUN2RSxlQUFlLEVBQUV3RSxXQUNsQnZILFdBQVdHLGFBQWEsS0FFNUIsSUFBSSxDQUFDeUMsSUFBSSxFQUNYO1lBQ0UsSUFBSSxJQUFJLENBQUNBLElBQUksSUFBSSxTQUFTLElBQUksQ0FBQzhDLDRCQUE0QixJQUFJO2dCQUMzRFIsUUFBUUMsR0FBRyxDQUNQLENBQUMsZ0NBQWdDLEVBQUUsSUFBSSxDQUFDckMsU0FBUyxDQUFDMEUsSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQ3hFLFlBQVksRUFBRTtnQkFFcEcsT0FDSSxNQUFPLElBQUksQ0FBQ3lFLGdCQUFnQixNQUFRLE1BQU0sSUFBSSxDQUFDSCxPQUFPO1lBRTlEO1FBQ0osT0FBTyxJQUNILElBQUksQ0FBQ3ZFLGVBQWUsRUFBRXdFLFdBQVd2SCxXQUFXSSxVQUFVLEdBQ3hEO1lBQ0UsSUFBSSxJQUFJLENBQUNzRiw0QkFBNEIsSUFBSTtnQkFDckNSLFFBQVFDLEdBQUcsQ0FDUCxDQUFDLDBDQUEwQyxFQUFFLElBQUksQ0FBQ3JDLFNBQVMsQ0FBQzBFLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUN4RSxZQUFZLEVBQUU7Z0JBRTlHLE9BQ0ksTUFBTyxJQUFJLENBQUN5RSxnQkFBZ0IsTUFBUSxNQUFNLElBQUksQ0FBQ0gsT0FBTztZQUU5RDtRQUNKLE9BQU8sSUFDSCxJQUFJLENBQUN2RSxlQUFlLEVBQUV3RSxXQUFXdkgsV0FBV0ssYUFBYSxLQUN6RCxJQUFJLENBQUN1QyxJQUFJLEVBQ1g7WUFDRSxNQUFNOEUsVUFBVSxJQUFJLENBQUN4RCxjQUFjLENBQUN5RCxhQUFhLENBQUMsSUFBSSxDQUFDL0UsSUFBSTtZQUMzRCxJQUFJOEUsU0FBUztnQkFDVCxPQUFPLE1BQU0sSUFBSSxDQUFDRSxjQUFjLENBQUNGO1lBQ3JDO1lBQ0EsT0FBTyxNQUFNLElBQUksQ0FBQ0cseUJBQXlCO1FBQy9DLE9BQU8sSUFDSCxJQUFJLENBQUM5RSxlQUFlLEtBQUsvQyxXQUFXTyxhQUFhLElBQ2pELElBQUksQ0FBQ3NDLFFBQVEsRUFDZjtZQUNFLE9BQU8sTUFBTSxJQUFJLENBQUNpRixpQkFBaUIsQ0FBQyxJQUFJLENBQUNqRixRQUFRO1FBQ3JELE9BQU8sSUFDSCxJQUFJLENBQUNFLGVBQWUsS0FBSy9DLFdBQVdRLGVBQWUsSUFDbkQsSUFBSSxDQUFDcUMsUUFBUSxFQUNmO1lBQ0UsT0FBTyxNQUFNLElBQUksQ0FBQ2tGLHNCQUFzQixDQUFDLElBQUksQ0FBQ2xGLFFBQVE7UUFDMUQ7UUFFQSxJQUFJLElBQUksQ0FBQ0UsZUFBZSxFQUFFO1lBQ3RCLE1BQU0sSUFBSSxDQUFDc0QsWUFBWSxDQUFDO1FBQzVCO1FBQ0EsT0FBTyxJQUFJLENBQUMyQixjQUFjO0lBQzlCO0lBRUE7OztLQUdDLEdBQ0QsTUFBTVgsdUJBQTJEO1FBQzdELE1BQU1ZLGlCQUFpQixJQUFJLENBQUNuRixTQUFTLENBQUUwRSxJQUFJO1FBQzNDLElBQUksSUFBSSxDQUFDbkMsdUJBQXVCLENBQUMsSUFBSSxDQUFDekMsSUFBSSxHQUFJO1lBQzFDc0MsUUFBUUMsR0FBRyxDQUNQLENBQUMsNEJBQTRCLEVBQUU4QyxlQUFlLFlBQVksRUFBRSxJQUFJLENBQUNqRixZQUFZLEVBQUU7WUFFbkYsT0FBTyxNQUFNLElBQUksQ0FBQ3NFLE9BQU87UUFDN0I7UUFDQSxJQUFJN0csU0FBU0MsT0FBTyxDQUFDd0gsUUFBUSxDQUFDLElBQUksQ0FBQ3RGLElBQUksR0FBSTtZQUN2Q3NDLFFBQVFDLEdBQUcsQ0FBQyxDQUFDLDJCQUEyQixFQUFFOEMsZ0JBQWdCO1lBQzFELE9BQU87Z0JBQUVuQixVQUFVLE1BQU0sSUFBSSxDQUFDcUIsV0FBVztZQUFHO1FBQ2hEO1FBQ0FqRCxRQUFRQyxHQUFHLENBQUM7UUFDWixJQUFJMUUsU0FBU0UsTUFBTSxDQUFDdUgsUUFBUSxDQUFDLElBQUksQ0FBQ3RGLElBQUksR0FBSTtZQUN0Q3NDLFFBQVFDLEdBQUcsQ0FBQyxDQUFDLDBCQUEwQixFQUFFOEMsZ0JBQWdCO1lBQ3pELE9BQU8sSUFBSSxDQUFDRyxVQUFVO1FBQzFCO1FBQ0EsSUFBSTNILFNBQVNHLE9BQU8sQ0FBQ3NILFFBQVEsQ0FBQyxJQUFJLENBQUN0RixJQUFJLEdBQUk7WUFDdkNzQyxRQUFRQyxHQUFHLENBQUMsQ0FBQyw4QkFBOEIsRUFBRThDLGdCQUFnQjtZQUM3RCxPQUFPLElBQUksQ0FBQ0ksY0FBYztRQUM5QjtRQUNBLElBQUk1SCxTQUFTSyxVQUFVLENBQUNvSCxRQUFRLENBQUMsSUFBSSxDQUFDdEYsSUFBSSxHQUFJO1lBQzFDc0MsUUFBUUMsR0FBRyxDQUFDLENBQUMsMEJBQTBCLEVBQUU4QyxnQkFBZ0I7WUFDekQsT0FBTyxNQUFNLElBQUksQ0FBQ0ssaUJBQWlCO1FBQ3ZDO1FBQ0EsSUFBSSxJQUFJLENBQUNDLDZCQUE2QixDQUFDLElBQUksQ0FBQzNGLElBQUksR0FBSTtZQUNoRHNDLFFBQVFDLEdBQUcsQ0FBQyxDQUFDLHVDQUF1QyxFQUFFOEMsZUFBZSxJQUFJLEVBQUUsSUFBSSxDQUFDL0UsZ0JBQWdCLEVBQUU7WUFDbEcsT0FBTyxNQUFNLElBQUksQ0FBQzBFLGNBQWMsQ0FBQyxJQUFJLENBQUMxRSxnQkFBZ0I7UUFDMUQ7UUFDQSxJQUFJekMsU0FBU0ksa0JBQWtCLENBQUNxSCxRQUFRLENBQUMsSUFBSSxDQUFDdEYsSUFBSSxHQUFJO1lBQ2xEc0MsUUFBUUMsR0FBRyxDQUFDLENBQUMsa0NBQWtDLEVBQUU4QyxnQkFBZ0I7WUFDakUsT0FBTyxNQUFNLElBQUksQ0FBQ0oseUJBQXlCO1FBQy9DO1FBQ0EsSUFBSXBILFNBQVNNLFFBQVEsQ0FBQ21ILFFBQVEsQ0FBQyxJQUFJLENBQUN0RixJQUFJLEdBQUk7WUFDeEMsT0FBTztnQkFDSGtFLFVBQVUsQ0FBQyx1SUFBdUksRUFBRSxJQUFJLENBQUNuRSxFQUFFLEVBQUU7WUFDaks7UUFDSjtRQUNBLElBQUlsQyxTQUFTTyxPQUFPLENBQUNrSCxRQUFRLENBQUMsSUFBSSxDQUFDdEYsSUFBSSxHQUFJO1lBQ3ZDc0MsUUFBUUMsR0FBRyxDQUFDLENBQUMsdUJBQXVCLEVBQUU4QyxnQkFBZ0I7WUFDdEQsT0FBTyxNQUFNLElBQUksQ0FBQ08sY0FBYztRQUNwQztRQUNBLElBQUkvSCxTQUFTUSxTQUFTLENBQUNpSCxRQUFRLENBQUMsSUFBSSxDQUFDdEYsSUFBSSxHQUFJO1lBQ3pDc0MsUUFBUUMsR0FBRyxDQUFDLENBQUMseUJBQXlCLEVBQUU4QyxnQkFBZ0I7WUFDeEQsT0FBTyxNQUFNLElBQUksQ0FBQ1EsZ0JBQWdCO1FBQ3RDO0lBQ0o7SUFFQTs7O0tBR0MsR0FDRFQsaUJBQWdDO1FBQzVCLE9BQU87WUFDSGxCLFVBQVUsR0FBRyxJQUFJLENBQUNoRSxTQUFTLENBQUUwRSxJQUFJLENBQUM7Ozt5Q0FHTCxDQUFDO1lBQzlCUixXQUFXaEgsV0FBV0MsYUFBYTtRQUN2QztJQUNKO0lBRUE7OztLQUdDLEdBQ0RvSSxpQkFBZ0M7UUFDNUIsTUFBTUssUUFBUUMsT0FBT0MsTUFBTSxDQUFDLElBQUksQ0FBQzlFLGNBQWMsQ0FBQ2dDLE1BQU0sRUFBRStDLEdBQUcsQ0FDdkQsQ0FBQ0MsSUFBTUEsRUFBRUMsUUFBUTtRQUVyQixPQUFPO1lBQ0hqQyxVQUFVLEdBQ04sSUFBSSxDQUFDaEUsU0FBUyxDQUFFMEUsSUFBSSxDQUN2QiwrQkFBK0IsRUFBRWtCLE1BQzdCN0MsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUNWa0IsSUFBSSxDQUFDLE1BQU0sS0FBSyxFQUFFMkIsTUFBTTdDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3pDbUIsV0FBV2hILFdBQVdFLGFBQWE7UUFDdkM7SUFDSjtJQUVBOzs7O0lBSUEsR0FDQXFJLDhCQUE4QjNGLElBQVksRUFBVztRQUNyRCxJQUFJLENBQUNNLGdCQUFnQixHQUFHO1FBQ3hCLElBQUksQ0FBQ04sUUFBUSxDQUFDQSxLQUFLc0YsUUFBUSxDQUFDLE1BQU07WUFDOUIsT0FBTztRQUNYO1FBQ0EsTUFBTWMsV0FBV3BHLEtBQUtnRCxLQUFLLENBQUM7UUFDNUIsTUFBTXFELGNBQWNELFNBQVNFLEdBQUc7UUFDaEMsTUFBTUMsWUFBWUgsU0FBU2pDLElBQUksQ0FBQyxLQUFLcEMsV0FBVztRQUVoRCxJQUFJc0UsZUFBZXhJLFNBQVNJLGtCQUFrQixDQUFDcUgsUUFBUSxDQUFDaUIsWUFBWTtZQUNoRSxJQUFJLENBQUNqRyxnQkFBZ0IsR0FBRyxJQUFJLENBQUNnQixjQUFjLENBQUNrRixXQUFXLENBQUNILFlBQVl0RSxXQUFXO1lBQy9FLE9BQU8sSUFBSSxDQUFDekIsZ0JBQWdCLEtBQUssUUFBUSxJQUFJLENBQUNBLGdCQUFnQixLQUFLO1FBQ3ZFO1FBQ0EsT0FBTztJQUNQO0lBRUE7OztLQUdDLEdBQ0QsTUFBTTJFLDRCQUFvRDtRQUN0RCxJQUFJLENBQUMsSUFBSSxDQUFDL0UsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDQSxTQUFTLENBQUN3RSxPQUFPLEVBQUU7WUFDNUMsT0FBTztnQkFDSFIsVUFBVSxHQUFHLElBQUksQ0FBQ2hFLFNBQVMsQ0FBRTBFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztZQUMxRDtRQUNKO1FBQ0EsTUFBTTZCLHNCQUFzQixJQUFJLENBQUNuRixjQUFjLENBQUNvRix1QkFBdUI7UUFDdkUsT0FBTztZQUNIeEMsVUFBVSxDQUFDLG9DQUFvQyxFQUFFdUMsb0JBQW9CLGVBQWUsQ0FBQztZQUNyRnJDLFdBQVdoSCxXQUFXSyxhQUFhO1FBQ3ZDO0lBQ0o7SUFFQTs7Ozs7O0tBTUMsR0FDRGtKLG1CQUFtQkMsV0FBbUIsRUFBRUMsWUFBb0IsRUFBVTtRQUNsRSxNQUFNQyxrQkFBa0J2SCx5QkFBeUJzSDtRQUNqRCxPQUFPLEdBQUd0SSwwQkFBMEJxSSxZQUFZLENBQUMsRUFBRUUsa0JBQWtCdEksdUJBQXVCO0lBQ2hHO0lBRUE7Ozs7O0tBS0MsR0FDRHVJLHVCQUF1QkgsV0FBbUIsRUFBRUMsWUFBb0IsRUFBVTtRQUN0RSxPQUFPdkksaUJBQWlCLElBQUksQ0FBQ3FJLGtCQUFrQixDQUFDQyxhQUFhQyxjQUFjN0gsTUFBTTtJQUNyRjtJQUVBOzs7Ozs7O0tBT0MsR0FDRCxNQUFNNEcsaUJBQXlDO1FBQzNDLE1BQU03RSxjQUFjLE1BQU0sSUFBSSxDQUFDaUcsZUFBZTtRQUM5QyxNQUFNQyxhQUFhbEcsWUFBWW1HLHNCQUFzQjtRQUNyRCxJQUFJRCxXQUFXakksTUFBTSxLQUFLLEdBQUc7WUFDekIsT0FBTztnQkFDSGtGLFVBQVUsQ0FBQyw0RUFBNEUsQ0FBQztZQUM1RjtRQUNKO1FBQ0EsTUFBTTJDLGVBQWU3SixrRUFBcUJBLENBQUMsSUFBSSxDQUFDOEMsSUFBSTtRQUNwRCxNQUFNcUgsYUFBYSxJQUFJLENBQUNKLHNCQUFzQixDQUFDLElBQUksQ0FBQzdHLFNBQVMsQ0FBRTBFLElBQUksRUFBRWlDO1FBQ3JFLElBQUlNLGNBQWMsR0FBRztZQUNqQixPQUFPO2dCQUNIakQsVUFBVSxDQUFDLDZDQUE2QyxDQUFDO1lBQzdEO1FBQ0o7UUFDQSxPQUFPO1lBQ0hBLFVBQVUsQ0FBQyxzQ0FBc0MsRUFBRWlELFdBQVcsMEJBQTBCLEVBQUVGLFdBQVdqSSxNQUFNLENBQUMsVUFBVSxFQUFFaUksV0FBV2pJLE1BQU0sS0FBSyxJQUFJLE1BQU0sR0FBRyx5QkFBeUIsQ0FBQztZQUNyTG9GLFdBQVdoSCxXQUFXTyxhQUFhO1FBQ3ZDO0lBQ0o7SUFFQTs7Ozs7Ozs7S0FRQyxHQUNELE1BQU11SCxrQkFBa0JrQyxZQUFvQixFQUEwQjtRQUNsRSxNQUFNUixjQUFjLElBQUksQ0FBQzFHLFNBQVMsQ0FBRTBFLElBQUk7UUFDeEMsTUFBTWlDLGVBQWU3SixrRUFBcUJBLENBQUMsSUFBSSxDQUFDOEMsSUFBSTtRQUNwRCxNQUFNdUgsU0FBUyxJQUFJLENBQUNWLGtCQUFrQixDQUFDQyxhQUFhQztRQUNwRCxNQUFNTSxhQUFhLElBQUksQ0FBQ0osc0JBQXNCLENBQUNILGFBQWFDO1FBQzVELE1BQU1uSSxlQUFlMkksU0FBU0Q7UUFFOUIsTUFBTUUsYUFBYTdJLHFCQUFxQkM7UUFDeEMsSUFBSSxDQUFDNEksV0FBV3JJLEtBQUssRUFBRTtZQUNuQixJQUFJcUksV0FBV3BJLE1BQU0sS0FBSyxZQUFZO2dCQUNsQyxNQUFNcUksWUFBWUQsV0FBV25JLGtCQUFrQixDQUFFZ0YsSUFBSSxDQUFDO2dCQUN0RCxPQUFPO29CQUNIRCxVQUFVLENBQUMsMkVBQTJFLEVBQUVxRCxVQUFVLG9EQUFvRCxDQUFDO29CQUN2Sm5ELFdBQVdoSCxXQUFXTyxhQUFhO2dCQUN2QztZQUNKO1lBQ0EsT0FBTztnQkFDSHVHLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRWtELGFBQWFwSSxNQUFNLENBQUMsd0NBQXdDLEVBQUVtSSxXQUFXLHlFQUF5RSxDQUFDO2dCQUNoTC9DLFdBQVdoSCxXQUFXTyxhQUFhO1lBQ3ZDO1FBQ0o7UUFFQSxNQUFNb0QsY0FBYyxNQUFNLElBQUksQ0FBQ2lHLGVBQWU7UUFDOUMsTUFBTVEsdUJBQXVCekcsWUFBWW1HLHNCQUFzQjtRQUMvRCxNQUFNTyxZQUFZLE1BQU0sSUFBSSxDQUFDQyxvQkFBb0I7UUFFakQsOEVBQThFO1FBQzlFLE1BQU1DLGdCQUF3QyxDQUFDO1FBQy9DLE1BQU1DLGlCQUEyQixFQUFFO1FBQ25DLEtBQUssTUFBTTFILGFBQWFzSCxxQkFBc0I7WUFDMUMsTUFBTUssUUFBUUosU0FBUyxDQUFDdkgsVUFBVTBFLElBQUksQ0FBQztZQUN2QyxJQUFJaUQsT0FBTztnQkFDUEYsYUFBYSxDQUFDekgsVUFBVTBFLElBQUksQ0FBQyxHQUFHaUQ7WUFDcEMsT0FBTztnQkFDSEQsZUFBZTlELElBQUksQ0FBQzVELFVBQVUwRSxJQUFJO1lBQ3RDO1FBQ0o7UUFFQSxNQUFNLEVBQUVrRCxVQUFVLEVBQUVDLG1CQUFtQixFQUFFQyxZQUFZLEVBQUUsR0FDbkQsTUFBTSxJQUFJLENBQUNDLGtCQUFrQixDQUFDTixlQUFlakosY0FBY2tJO1FBRS9ELE1BQU0sSUFBSSxDQUFDc0IsVUFBVSxDQUFDLENBQUMsYUFBYSxFQUFFSixhQUFjQyxDQUFBQSxzQkFBc0IsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUVuRixJQUFJN0QsV0FBVyxDQUFDLGdCQUFnQixFQUFFNEQsV0FBVyxVQUFVLEVBQUVBLGVBQWUsSUFBSSxNQUFNLElBQUk7UUFDdEYsSUFBSUMscUJBQXFCO1lBQ3JCN0QsWUFBWSxDQUFDLG1CQUFtQixDQUFDO1FBQ3JDLE9BQU87WUFDSEEsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUNuQjtRQUNBLE1BQU1pRSxhQUFhO2VBQUlQO2VBQW1CSTtTQUFhO1FBQ3ZELElBQUlHLFdBQVduSixNQUFNLEdBQUcsR0FBRztZQUN2QmtGLFlBQVksQ0FBQyxvQkFBb0IsRUFBRWlFLFdBQVdoRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0Q7UUFDQSxPQUFPO1lBQUVEO1FBQVM7SUFDdEI7SUFFQTs7Ozs7Ozs7S0FRQyxHQUNELE1BQU0rRCxtQkFDRk4sYUFBcUMsRUFDckNqSixZQUFvQixFQUNwQmtJLFdBQW1CLEVBQ2tFO1FBQ3JGLElBQUlrQixhQUFhO1FBQ2pCLE1BQU1FLGVBQXlCLEVBQUU7UUFFakMsS0FBSyxNQUFNLENBQUNwRCxNQUFNaUQsTUFBTSxJQUFJOUIsT0FBT3FDLE9BQU8sQ0FBQ1QsZUFBZ0I7WUFDdkQsSUFBSTtnQkFDQSxNQUFNLElBQUksQ0FBQ2hFLGlCQUFpQixHQUFHQyxRQUFRLENBQUNDLE1BQU0sQ0FBQztvQkFDM0M5RCxJQUFJOEg7b0JBQ0ovSCxNQUFNLElBQUksQ0FBQ0MsRUFBRTtvQkFDYkMsTUFBTXRCO2dCQUNWO2dCQUNBb0o7WUFDSixFQUFFLE9BQU96RixHQUFHO2dCQUNSQyxRQUFRQyxHQUFHLENBQUMsQ0FBQyxzQkFBc0IsRUFBRXFDLEtBQUssRUFBRSxFQUFFdkMsR0FBRztnQkFDakQyRixhQUFhbEUsSUFBSSxDQUFDYztZQUN0QjtRQUNKO1FBRUEsZ0ZBQWdGO1FBQ2hGLE1BQU15RCxvQkFBb0IsQ0FBQyxFQUFFLEVBQUVyTCxrRUFBcUJBLENBQUMsSUFBSSxDQUFDOEMsSUFBSSxHQUFHO1FBQ2pFLE1BQU13SSxnQkFBZ0J2QyxPQUFPQyxNQUFNLENBQUMyQixlQUFlckMsUUFBUSxDQUFDK0M7UUFDNUQsSUFBSU4sc0JBQXNCO1FBQzFCLElBQUksQ0FBQ08sZUFBZTtZQUNoQixJQUFJO2dCQUNBLE1BQU0sSUFBSSxDQUFDM0UsaUJBQWlCLEdBQUdDLFFBQVEsQ0FBQ0MsTUFBTSxDQUFDO29CQUMzQzlELElBQUksSUFBSSxDQUFDRCxJQUFJO29CQUNiQSxNQUFNLElBQUksQ0FBQ0MsRUFBRTtvQkFDYkMsTUFBTXRCO2dCQUNWO2dCQUNBcUosc0JBQXNCO1lBQzFCLEVBQUUsT0FBTzFGLEdBQUc7Z0JBQ1JDLFFBQVFDLEdBQUcsQ0FBQyxDQUFDLGtDQUFrQyxFQUFFcUUsWUFBWSxFQUFFLEVBQUV2RSxHQUFHO2dCQUNwRTJGLGFBQWFsRSxJQUFJLENBQUM4QztZQUN0QjtRQUNKO1FBRUEsT0FBTztZQUFFa0I7WUFBWUM7WUFBcUJDO1FBQWE7SUFDM0Q7SUFFQTs7Ozs7S0FLQyxHQUNELE1BQU1uQyxtQkFBMkM7UUFDN0MsTUFBTTRCLFlBQVksTUFBTSxJQUFJLENBQUNDLG9CQUFvQjtRQUNqRCxNQUFNYSxrQkFBa0J4QyxPQUFPeUMsSUFBSSxDQUFDZixXQUFXekksTUFBTTtRQUNyRCxJQUFJdUosb0JBQW9CLEdBQUc7WUFDdkIsT0FBTztnQkFDSHJFLFVBQVUsQ0FBQyx3RUFBd0UsQ0FBQztZQUN4RjtRQUNKO1FBQ0EsTUFBTTJDLGVBQWU3SixrRUFBcUJBLENBQUMsSUFBSSxDQUFDOEMsSUFBSTtRQUNwRCxNQUFNcUgsYUFBYSxJQUFJLENBQUNKLHNCQUFzQixDQUFDLElBQUksQ0FBQzdHLFNBQVMsQ0FBRTBFLElBQUksRUFBRWlDO1FBQ3JFLElBQUlNLGNBQWMsR0FBRztZQUNqQixPQUFPO2dCQUNIakQsVUFBVSxDQUFDLGtEQUFrRCxDQUFDO1lBQ2xFO1FBQ0o7UUFDQSxPQUFPO1lBQ0hBLFVBQVUsQ0FBQyxnREFBZ0QsRUFBRWlELFdBQVcsMEJBQTBCLEVBQUVvQixnQkFBZ0IsVUFBVSxFQUFFQSxvQkFBb0IsSUFBSSxNQUFNLEdBQUcseUJBQXlCLENBQUM7WUFDM0xuRSxXQUFXaEgsV0FBV1EsZUFBZTtRQUN6QztJQUNKO0lBRUE7Ozs7OztLQU1DLEdBQ0QsTUFBTXVILHVCQUF1QmlDLFlBQW9CLEVBQTBCO1FBQ3ZFLE1BQU1SLGNBQWMsSUFBSSxDQUFDMUcsU0FBUyxDQUFFMEUsSUFBSTtRQUN4QyxNQUFNaUMsZUFBZTdKLGtFQUFxQkEsQ0FBQyxJQUFJLENBQUM4QyxJQUFJO1FBQ3BELE1BQU11SCxTQUFTLElBQUksQ0FBQ1Ysa0JBQWtCLENBQUNDLGFBQWFDO1FBQ3BELE1BQU1NLGFBQWEsSUFBSSxDQUFDSixzQkFBc0IsQ0FBQ0gsYUFBYUM7UUFDNUQsTUFBTW5JLGVBQWUySSxTQUFTRDtRQUU5QixNQUFNRSxhQUFhN0kscUJBQXFCQztRQUN4QyxJQUFJLENBQUM0SSxXQUFXckksS0FBSyxFQUFFO1lBQ25CLElBQUlxSSxXQUFXcEksTUFBTSxLQUFLLFlBQVk7Z0JBQ2xDLE1BQU1xSSxZQUFZRCxXQUFXbkksa0JBQWtCLENBQUVnRixJQUFJLENBQUM7Z0JBQ3RELE9BQU87b0JBQ0hELFVBQVUsQ0FBQywyRUFBMkUsRUFBRXFELFVBQVUsb0RBQW9ELENBQUM7b0JBQ3ZKbkQsV0FBV2hILFdBQVdRLGVBQWU7Z0JBQ3pDO1lBQ0o7WUFDQSxPQUFPO2dCQUNIc0csVUFBVSxDQUFDLGdCQUFnQixFQUFFa0QsYUFBYXBJLE1BQU0sQ0FBQyx3Q0FBd0MsRUFBRW1JLFdBQVcseUVBQXlFLENBQUM7Z0JBQ2hML0MsV0FBV2hILFdBQVdRLGVBQWU7WUFDekM7UUFDSjtRQUVBLGdFQUFnRTtRQUNoRSxNQUFNNkosWUFBWSxNQUFNLElBQUksQ0FBQ0Msb0JBQW9CO1FBQ2pELE1BQU0sRUFBRUksVUFBVSxFQUFFQyxtQkFBbUIsRUFBRUMsWUFBWSxFQUFFLEdBQ25ELE1BQU0sSUFBSSxDQUFDQyxrQkFBa0IsQ0FBQ1IsV0FBVy9JLGNBQWNrSTtRQUUzRCxNQUFNLElBQUksQ0FBQ3NCLFVBQVUsQ0FBQyxDQUFDLFVBQVUsRUFBRUosYUFBY0MsQ0FBQUEsc0JBQXNCLElBQUksR0FBRyxDQUFDLENBQUM7UUFFaEYsSUFBSTdELFdBQVcsQ0FBQyxrQkFBa0IsRUFBRTRELFdBQVcsVUFBVSxFQUFFQSxlQUFlLElBQUksTUFBTSxJQUFJO1FBQ3hGLElBQUlDLHFCQUFxQjtZQUNyQjdELFlBQVksQ0FBQyxtQkFBbUIsQ0FBQztRQUNyQyxPQUFPO1lBQ0hBLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFDbkI7UUFFQSxJQUFJOEQsYUFBYWhKLE1BQU0sR0FBRyxHQUFHO1lBQ3pCa0YsWUFBWSxDQUFDLG9CQUFvQixFQUFFOEQsYUFBYTdELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRTtRQUNBLE9BQU87WUFBRUQ7UUFBUztJQUN0QjtJQUVBOzs7S0FHQyxHQUNELE1BQU13RCx1QkFBd0Q7UUFDMUQsTUFBTTdHLGlCQUFpQixNQUFNLElBQUksQ0FBQzRILGtCQUFrQjtRQUNwRCxNQUFNQyxPQUE0QixJQUFJLENBQUN0SCxlQUFlO1FBQ3RELE1BQU04QyxXQUFXLE1BQU1yRCxlQUFlOEgsWUFBWSxDQUFDM0MsTUFBTSxDQUFDNEMsR0FBRyxDQUFDO1lBQzFEQyxlQUFlSCxLQUFLdk8sUUFBUTtZQUM1QjJPLE9BQU9KLEtBQUt0Tyx5QkFBeUI7WUFDckMyTyxtQkFBbUI7UUFDdkI7UUFDQSxJQUFJLENBQUM3RSxTQUFTOEUsSUFBSSxDQUFDaEQsTUFBTSxFQUFFO1lBQ3ZCLE9BQU8sQ0FBQztRQUNaO1FBQ0EsTUFBTUMsTUFBOEIsQ0FBQztRQUNyQyxLQUFLLE1BQU1nRCxPQUFPL0UsU0FBUzhFLElBQUksQ0FBQ2hELE1BQU0sQ0FBRTtZQUNwQyxNQUFNcEIsT0FBT3FFLEdBQUcsQ0FBQ2xNLCtEQUFrQkEsQ0FBQzJMLEtBQUtyTyx3QkFBd0IsRUFBRTtZQUNuRSxNQUFNNk8sWUFBWUQsR0FBRyxDQUFDbE0sK0RBQWtCQSxDQUFDMkwsS0FBS3BPLDBCQUEwQixFQUFFO1lBQzFFLElBQUlzSyxRQUFRc0UsV0FBVztnQkFDbkJqRCxHQUFHLENBQUNyQixLQUFLLEdBQUcsQ0FBQyxFQUFFLEVBQUU1SCxrRUFBcUJBLENBQUNrTSxZQUFZO1lBQ3ZEO1FBQ0o7UUFDQSxPQUFPakQ7SUFDWDtJQUVKOzs7O0NBSUMsR0FDRCxNQUFNakIsZUFBZUYsT0FBc0IsRUFBMEI7UUFDakUsTUFBTXFFLGtCQUFrQnJFLFdBQVc7UUFDbkN4QyxRQUFRQyxHQUFHLENBQUMsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUNyQyxTQUFTLENBQUUwRSxJQUFJLENBQUMsSUFBSSxFQUFFdUUsaUJBQWlCO1FBQzdFLE1BQU1DLGlCQUFpQixJQUFJLENBQUM5SCxjQUFjLENBQUNrRixXQUFXLENBQUMyQztRQUN2RCxNQUFNLElBQUksQ0FBQ2pCLFVBQVUsQ0FBQyxDQUFDLGVBQWUsRUFBRWtCLGVBQWUsQ0FBQyxDQUFDO1FBQ3pELE1BQU1ySSxjQUFjLE1BQU0sSUFBSSxDQUFDaUcsZUFBZTtRQUM5QyxNQUFNakcsWUFBWWlFLGNBQWMsQ0FBQyxJQUFJLENBQUM5RSxTQUFTLEVBQUdrSjtRQUNsRCxNQUFNLElBQUksQ0FBQ3JJLFdBQVcsRUFBRXNJO1FBQ3hCLE1BQU0sSUFBSSxDQUFDOUUsb0JBQW9CLENBQUM7UUFDaEMsT0FBTztZQUNITCxVQUFVLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQ2hFLFNBQVMsQ0FBRTBFLElBQUksQ0FBQywwQkFBMEIsRUFBRXdFLGVBQWUsQ0FBQyxDQUFDO1FBQzNGO0lBQ0o7SUFHSTs7O0tBR0MsR0FDRCxNQUFNNUQsYUFBcUM7UUFDdkMsTUFBTXpFLGNBQWMsTUFBTSxJQUFJLENBQUNpRyxlQUFlO1FBQzlDLE1BQU1zQyxhQUFhdkksWUFBWXVJLFVBQVUsQ0FBQ0MsWUFBWTtRQUN0RCxNQUFNQyxlQUFlekksWUFBWXlJLFlBQVksQ0FBQ0QsWUFBWTtRQUMxRCxJQUFJLENBQUN4SSxZQUFZMEksVUFBVSxFQUFFO1lBQ3pCbkgsUUFBUUMsR0FBRyxDQUFDLENBQUMsWUFBWSxFQUFFeEIsWUFBWXVJLFVBQVUsRUFBRTtZQUNuRGhILFFBQVFDLEdBQUcsQ0FBQyxDQUFDLGNBQWMsRUFBRXhCLFlBQVl5SSxZQUFZLEVBQUU7WUFDdkQsT0FBTztnQkFDSHRGLFVBQVUsQ0FBQyw0Q0FBNEMsRUFBRW9GLFdBQVcsR0FBRyxFQUNuRSxJQUFJLENBQUNwSixTQUFTLENBQUUwRSxJQUFJLENBQ3ZCLHVCQUF1QixFQUFFNEUsYUFBYSxDQUFDLENBQUM7WUFDN0M7UUFDSjtRQUNBLE1BQU10RixXQUFXO1lBQUVBLFVBQVUsTUFBTSxJQUFJLENBQUN3RixpQkFBaUI7UUFBRztRQUM1RCxNQUFNLElBQUksQ0FBQ3hCLFVBQVUsQ0FBQztRQUN0QixPQUFPaEU7SUFDWDtJQUVBOzs7S0FHQyxHQUNELE1BQU13RixvQkFBcUM7UUFDdkMsTUFBTTNJLGNBQWMsTUFBTSxJQUFJLENBQUNpRyxlQUFlO1FBQzlDLE1BQU0yQyxxQkFBcUIsQ0FDdkIsTUFBTSxJQUFJLENBQUNDLG9CQUFvQixFQUFDLEVBQ2xDQyw2QkFBNkIsQ0FBQyxJQUFJLENBQUMzSixTQUFTLENBQUUwRSxJQUFJO1FBQ3BELE1BQU1rRixtQkFBbUIsSUFBSSxDQUFDNUosU0FBUztRQUV2QyxNQUFNNkosbUJBQ0ZELGlCQUFpQnBGLE9BQU8sS0FBSy9DLGFBQzdCbUksaUJBQWlCcEYsT0FBTyxLQUFLO1FBQ2pDLE1BQU1zRixhQUNGRCxvQkFDQSxJQUFJLENBQUM3SSxjQUFjLENBQUMrSSxlQUFlLENBQUNILGlCQUFpQnBGLE9BQU8sQ0FBQyxDQUFDOUIsR0FBRyxJQUM3RDtRQUNSLElBQUlzSCxTQUFTSixpQkFBaUJwRixPQUFPLElBQUk7UUFFekMsSUFBSXNGLFlBQVk7WUFDWkUsU0FBUztRQUNiLE9BQU8sSUFBSUgsa0JBQWtCO1lBQ3pCLElBQUlqRixVQUFVZ0YsaUJBQWlCaEYsT0FBTyxDQUFDcUYsUUFBUTtZQUMvQyxJQUFJckYsUUFBUTlGLE1BQU0sSUFBSSxHQUFHO2dCQUNyQjhGLFVBQVUsQ0FBQyxRQUFRLEVBQUVBLFNBQVM7WUFDbEM7WUFDQW9GLFNBQVMsR0FBR0osaUJBQWlCcEYsT0FBTyxDQUFDLEVBQUUsRUFBRUksUUFBUSxDQUFDLENBQUM7UUFDdkQ7UUFFQSxNQUFNc0Ysc0JBQXNCLE1BQU0sQ0FDOUIsTUFBTSxJQUFJLENBQUNDLGdCQUFnQixFQUFDLEVBQzlCQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUNwSyxTQUFTLENBQUUwRSxJQUFJO1FBQ3pDLE1BQU0yRiw0QkFDRkgsc0JBQXNCLElBQUlBLG9CQUFvQkQsUUFBUSxLQUFLO1FBQy9ELE1BQU1LLGlCQUFpQnpKLFlBQVl1SSxVQUFVLENBQUNDLFlBQVk7UUFFMUQsSUFBSWtCLGVBQWUsQ0FBQyxXQUFXLEVBQzNCLElBQUksQ0FBQ3ZLLFNBQVMsQ0FBRTBFLElBQUksQ0FDdkIsU0FBUyxFQUFFNEYsZUFBZSxFQUFFLEVBQUVOLE9BQU8sR0FBRyxFQUFFSywwQkFBMEIsc0NBQXNDLENBQUM7UUFDNUcsTUFBTUcsdUJBQXVCLENBQUMsTUFBTWYsa0JBQWlCLEdBQUlnQixjQUFjO1FBQ3ZFLE1BQU1DLHdCQUNGLENBQUMsTUFBTWpCLGtCQUFpQixHQUFJa0IsZUFBZTtRQUMvQyxNQUFNQyx1QkFBdUIsQ0FBQyxNQUFNbkIsa0JBQWlCLEdBQUlvQixhQUFhO1FBR3RFTixnQkFDSSxNQUNBeE4sd0VBQW1CQSxDQUNmMk4sdUJBQ0FBLHdCQUF3QkUsc0JBQ3hCSjtRQUVSLE9BQU9EO0lBQ1g7SUFFQTs7OztLQUlDLEdBQ0QsTUFBTS9GLFVBQWtDO1FBQ3BDcEMsUUFBUUMsR0FBRyxDQUNQLENBQUMsK0JBQStCLEVBQzVCLElBQUksQ0FBQ3JDLFNBQVMsQ0FBRTBFLElBQUksQ0FDdkIsWUFBWSxFQUFFLElBQUksQ0FBQ3hFLFlBQVksRUFBRTtRQUV0QyxJQUFJLE1BQU0sSUFBSSxDQUFDNEssaUJBQWlCLElBQUk7WUFDaEMsT0FBTztnQkFDSDlHLFVBQ0ksR0FDSSxJQUFJLENBQUNoRSxTQUFTLENBQUUwRSxJQUFJLENBQ3ZCLDhDQUE4QyxDQUFDLEdBQ2hELENBQUMseURBQXlELENBQUMsR0FDM0QsQ0FBQyxzQ0FBc0MsQ0FBQztnQkFDNUNSLFdBQVcsR0FBR2hILFdBQVdHLGFBQWEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDNkMsWUFBWSxFQUFFO1lBQ2pFO1FBQ0o7UUFDQSxJQUFJQTtRQUNKLElBQ0ksQ0FBQyxJQUFJLENBQUNBLFlBQVksSUFDbEIsQ0FBQ0EsZUFBZSxJQUFJLENBQUNjLGNBQWMsQ0FBQ2dDLE1BQU0sQ0FBQyxJQUFJLENBQUM5QyxZQUFZLENBQUMsTUFDekR1QixXQUNOO1lBQ0UsTUFBTSxJQUFJc0osTUFBTTtRQUNwQjtRQUVBLE1BQU1sSyxjQUFjLE1BQU0sSUFBSSxDQUFDaUcsZUFBZTtRQUM5QyxNQUFNa0Usb0JBQW9COUssYUFBYStLLFlBQVk7UUFDbkQsTUFBTXBLLFlBQVkyRCxPQUFPLENBQUMsSUFBSSxDQUFDeEUsU0FBUyxFQUFHZ0w7UUFDM0MsTUFBTSxJQUFJLENBQUNoRCxVQUFVLENBQUMsQ0FBQyxjQUFjLEVBQUVnRCxrQkFBa0IsQ0FBQyxDQUFDO1FBQzNELE1BQU0sSUFBSSxDQUFDbkssV0FBVyxFQUFFc0k7UUFDeEIsTUFBTSxJQUFJLENBQUM5RSxvQkFBb0IsQ0FBQztRQUVoQyxJQUFJTCxXQUFXLENBQUMsU0FBUyxFQUNyQixJQUFJLENBQUNoRSxTQUFTLENBQUUwRSxJQUFJLENBQ3ZCLGNBQWMsRUFBRXNHLGtCQUFrQixDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQzdLLFlBQVksRUFBRTtZQUNwQjZELFlBQVksQ0FBQyxlQUFlLEVBQUU5RCxhQUFhZ0wsYUFBYSxDQUFDLEVBQUUsQ0FBQyxtQ0FBbUMsRUFBRWhMLGFBQWErSyxZQUFZLENBQUMsbUJBQW1CLENBQUM7UUFDbko7UUFDQWpILFlBQVksU0FBVSxNQUFNLElBQUksQ0FBQ3dGLGlCQUFpQjtRQUNsRCxPQUFPO1lBQUV4RixVQUFVQTtRQUFTO0lBQ2hDO0lBRUE7OztLQUdDLEdBQ0QsTUFBTThHLG9CQUFzQztRQUN4QyxNQUFNakssY0FBYyxNQUFNLElBQUksQ0FBQ2lHLGVBQWU7UUFFOUMsTUFBTXNDLGFBQWF2SSxZQUFZdUksVUFBVTtRQUN6QyxNQUFNRSxlQUFlekksWUFBWXlJLFlBQVk7UUFDN0NsSCxRQUFRQyxHQUFHLENBQUMsQ0FBQyxZQUFZLEVBQUUrRyxZQUFZO1FBQ3ZDaEgsUUFBUUMsR0FBRyxDQUFDLENBQUMsY0FBYyxFQUFFaUgsY0FBYztRQUUzQ2xILFFBQVFDLEdBQUcsQ0FBQyxDQUFDLGlCQUFpQixFQUFFeEIsWUFBWTBJLFVBQVUsRUFBRTtRQUV4RCxPQUFPLENBQUMxSSxZQUFZMEksVUFBVTtJQUNsQztJQUVBOzs7S0FHQyxHQUNELE1BQU01RSxtQkFBa0Q7UUFDcEQsTUFBTVgsV0FBVyxNQUFNLElBQUksQ0FBQ0ksZ0JBQWdCLENBQ3hDLEdBQ0ksSUFBSSxDQUFDcEUsU0FBUyxDQUFFMEUsSUFBSSxDQUN2Qiw2REFBNkQsQ0FBQztRQUVuRSxJQUFJVixVQUNBLE9BQU87WUFDSEEsVUFBVUEsU0FBU0EsUUFBUTtZQUMzQkUsV0FBVyxHQUFHaEgsV0FBV0ksVUFBVSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUM0QyxZQUFZLEVBQUU7UUFDOUQ7UUFDSixPQUFPLE1BQU0sSUFBSSxDQUFDaUwsV0FBVztJQUNqQztJQUVBOzs7S0FHQyxHQUNELE1BQU1BLGNBQTZCO1FBQy9CLE1BQU1DLGlCQUFpQixNQUFNLElBQUksQ0FBQ0Msd0JBQXdCO1FBQzFELE1BQU1DLHlCQUF5QixDQUFDLENBQUMsTUFBTSxJQUFJLENBQUN4RSxlQUFlLEVBQUMsRUFBR3lFLFFBQVE7UUFDdkUsTUFBTS9ILFVBQVU4SCx5QkFDVixxRkFDQTtRQUNOLE1BQU0sSUFBSSxDQUFDL0gsWUFBWSxDQUFDQztRQUN4QixJQUFJOEgsd0JBQXdCO1lBQ3hCbEosUUFBUUMsR0FBRyxDQUFDO1lBRVosTUFBTStJLGVBQWVJLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDO2dCQUM3QkMsVUFBVSxJQUFJLENBQUNuTCxlQUFlO2dCQUM5Qm9MLGFBQWE7b0JBQUVDLFVBQVUsSUFBSSxDQUFDekssTUFBTSxDQUFDbEYscUJBQXFCO2dCQUFDO1lBQy9EO1lBQ0EsTUFBTSxJQUFJLENBQUNnSCxLQUFLLENBQUM7WUFDakIsTUFBTSxJQUFJLENBQUMrRSxVQUFVLENBQUM7WUFDdEIsSUFBSSxDQUFDbkgsV0FBVyxHQUFHO1FBQ3ZCO1FBRUF1QixRQUFRQyxHQUFHLENBQUM7UUFDWixNQUFNK0ksZUFBZUksT0FBTyxDQUFDQyxHQUFHLENBQUM7WUFDN0JDLFVBQVUsSUFBSSxDQUFDbkwsZUFBZTtZQUM5Qm9MLGFBQWE7Z0JBQUVDLFVBQVUsSUFBSSxDQUFDekssTUFBTSxDQUFDakYsbUJBQW1CO1lBQUM7UUFDN0Q7UUFDQSxNQUFNLElBQUksQ0FBQytHLEtBQUssQ0FBQztRQUNqQixNQUFNLElBQUksQ0FBQytFLFVBQVUsQ0FBQztRQUN0QixNQUFNLElBQUksQ0FBQ3pFLFlBQVksQ0FBQztJQUM1QjtJQUVBOzs7S0FHQyxHQUNELE1BQU1hLGlCQUNGc0IsaUJBQXlCLG1EQUFtRCxFQUMxQztRQUNsQyxNQUFNakYsYUFBYSxJQUFJLENBQUNvTCxjQUFjO1FBQ3RDLElBQUksQ0FBRSxNQUFNcEwsV0FBV3FMLFNBQVMsSUFBSztZQUNqQyxNQUFNQyxVQUFVLE1BQU10TCxXQUFXdUwsVUFBVTtZQUMzQyxPQUFPO2dCQUNIaEksVUFBVSxHQUFHMEIsZUFBZTtBQUM1QyxFQUFFcUcsUUFBUTs7MkJBRWlCLENBQUM7WUFDaEI7UUFDSjtJQUNKO0lBRUE7OztLQUdDLEdBQ0QsTUFBTTFHLGNBQStCO1FBQ2pDLE1BQU00RyxzQkFBc0I7UUFDNUIsTUFBTUMsZ0JBQWdCO1lBQUNEO1NBQW9CO1FBQzNDLE1BQU1wTCxjQUFjLE1BQU0sSUFBSSxDQUFDaUcsZUFBZTtRQUU5QyxNQUFNcUYscUJBQXFCdEwsWUFBWW1HLHNCQUFzQjtRQUM3RCxNQUFNb0YsYUFBYUQsbUJBQ2RFLE1BQU0sQ0FBQyxDQUFDckcsSUFBTUEsRUFBRXhCLE9BQU8sRUFDdkI4SCxNQUFNLENBQUMsQ0FBQ0MsTUFBeUNDO1lBQzlDLE1BQU1DLGFBQ0YsSUFBSSxDQUFDekwsY0FBYyxDQUFDK0ksZUFBZSxDQUFDeUMsSUFBSWhJLE9BQU8sQ0FBQyxDQUFDOUIsR0FBRztZQUN4RCxJQUFJa0MsVUFBVTRILElBQUk1SCxPQUFPO1lBQ3pCLElBQUk2SCxjQUFjLE9BQU87Z0JBQ3JCN0gsVUFBVXFIO1lBQ2Q7WUFDQSxJQUFJLENBQUVySCxDQUFBQSxXQUFXMkgsSUFBRyxHQUFJO2dCQUNwQkEsSUFBSSxDQUFDM0gsUUFBUSxHQUFHLEVBQUU7WUFDdEI7WUFDQTJILElBQUksQ0FBQzNILFFBQVEsQ0FBQ2hCLElBQUksQ0FBQzRJO1lBQ25CLE9BQU9EO1FBQ1gsR0FBRyxDQUFDO1FBQ1IsSUFBSUcsVUFBc0IsRUFBRTtRQUM1QixJQUFJQyxXQUFXOUcsT0FBT3lDLElBQUksQ0FBQzhEO1FBQzNCLE1BQU1RLDJCQUEyQi9HLE9BQU95QyxJQUFJLENBQUM4RCxZQUN4Q0MsTUFBTSxDQUFDLENBQUNyRyxJQUFNLENBQUNrRyxjQUFjOUcsUUFBUSxDQUFDWSxJQUN0QzZHLElBQUk7UUFDVCxNQUFNQyx5QkFBeUJaLGNBQWNHLE1BQU0sQ0FBQyxDQUFDckcsSUFDakQyRyxTQUFTdkgsUUFBUSxDQUFDWTtRQUV0QixNQUFNK0csbUJBQW1CSCx5QkFBeUJJLE1BQU0sQ0FDcERGO1FBR0osS0FBSyxNQUFNbEksV0FBV21JLGlCQUFrQjtZQUNwQyxJQUFJakosU0FBbUIsRUFBRTtZQUN6QixNQUFNbUosYUFBYWIsVUFBVSxDQUFDeEgsUUFBUSxDQUFDaUksSUFBSSxDQUFDLENBQUM3RyxHQUFHa0gsSUFDNUNsSCxFQUFFdEIsSUFBSSxDQUFDeUksYUFBYSxDQUFDRCxFQUFFeEksSUFBSTtZQUUvQixJQUFJRSxRQUFROUYsTUFBTSxLQUFLLEdBQUc7Z0JBQ3RCZ0YsT0FBT0YsSUFBSSxDQUFDO1lBQ2hCO1lBQ0FFLE9BQU9GLElBQUksQ0FBQyxHQUFHZ0IsUUFBUSxFQUFFLENBQUM7WUFDMUIsU0FBU3dJLGlCQUFpQjFJLElBQVksRUFBRStILFVBQWtCO2dCQUN0RCxJQUFJWSxVQUFVO2dCQUNkLElBQUlaLGVBQWUsU0FBU0EsZUFBZSxPQUFPO29CQUM5Q1ksVUFBVSxDQUFDLEVBQUUsRUFBRVosV0FBV2EsV0FBVyxHQUFHLENBQUMsQ0FBQztnQkFDOUM7Z0JBQ0EsT0FBTyxHQUFHNUksT0FBTzJJLFNBQVM7WUFDOUI7WUFDQXZKLE9BQU9GLElBQUksQ0FDUHFKLFdBQ0tsSCxHQUFHLENBQUMsQ0FBQ0MsSUFDRm9ILGlCQUNJcEgsRUFBRXRCLElBQUksRUFDTixJQUFJLENBQUMxRCxjQUFjLENBQUMrSSxlQUFlLENBQUMvRCxFQUFFeEIsT0FBTyxDQUFDLENBQUM5QixHQUFHLEdBR3pEdUIsSUFBSSxDQUFDO1lBRWR5SSxRQUFROUksSUFBSSxDQUFDRTtRQUNqQjtRQUNBLE1BQU0sSUFBSSxDQUFDa0UsVUFBVSxDQUFDO1FBQ3RCLE9BQU8sQ0FBQyxlQUFlLEVBQUVuSCxZQUFZdUksVUFBVSxDQUFDQyxZQUFZLEdBQUcsU0FBUyxFQUNwRThDLG1CQUFtQnJOLE1BQU0sQ0FDNUIsSUFBSSxFQUFFNE4sUUFBUTNHLEdBQUcsQ0FBQyxDQUFDd0gsSUFBTUEsRUFBRXRKLElBQUksQ0FBQyxLQUFLQSxJQUFJLENBQUMsT0FBTztJQUN0RDtJQUVBOzs7O0tBSUMsR0FDRCxNQUFNK0QsV0FBV3dGLFdBQW1CLEVBQUU7UUFDbEMsTUFBTTdNLGlCQUFpQixNQUFNLElBQUksQ0FBQzRILGtCQUFrQjtRQUNwRCxNQUFNNUgsZUFBZThILFlBQVksQ0FBQzNDLE1BQU0sQ0FBQzJILE1BQU0sQ0FBQztZQUM1QzlFLGVBQWUsSUFBSSxDQUFDekgsZUFBZSxDQUFDakgsUUFBUTtZQUM1QzJPLE9BQU8sSUFBSSxDQUFDekgsTUFBTSxDQUFDL0UsZ0JBQWdCO1lBQ25Dc1Isa0JBQWtCO1lBQ2xCL0IsYUFBYTtnQkFDVDdGLFFBQVE7b0JBQUM7d0JBQUMsSUFBSSxDQUFDOUYsU0FBUyxDQUFFMEUsSUFBSTt3QkFBRSxJQUFJcEM7d0JBQVFrTDtxQkFBWTtpQkFBQztZQUM3RDtRQUNKO0lBQ0o7SUFFQTs7O0tBR0MsR0FDRCxNQUFNckosU0FBaUM7UUFDbkMsTUFBTTFELGFBQWEsSUFBSSxDQUFDb0wsY0FBYztRQUN0QyxNQUFNcEwsV0FBV2tOLFdBQVc7UUFDNUIsT0FBTztZQUNIM0osVUFBVTtRQUNkO0lBQ0o7SUFFQTs7O0tBR0MsR0FDRFAsb0JBQW9CO1FBQ2hCLElBQUksSUFBSSxDQUFDcEQsYUFBYSxJQUFJLE1BQU07WUFDNUIsTUFBTSxJQUFJMEssTUFBTTtRQUNwQjtRQUNBLE9BQU8sSUFBSSxDQUFDMUssYUFBYTtJQUM3QjtJQUVBOzs7S0FHQyxHQUNEdU4sa0JBQWtCO1FBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQ3BOLFdBQVcsRUFBRTtZQUNuQixJQUFJLENBQUNBLFdBQVcsR0FBRyxJQUFJLENBQUNpRCxpQkFBaUIsR0FBR29LLElBQUksQ0FBQ0MsRUFBRSxDQUFDQyxRQUFRLENBQ3hELElBQUksQ0FBQ3pOLFFBQVE7UUFFckI7UUFDQSxPQUFPLElBQUksQ0FBQ0UsV0FBVztJQUMzQjtJQUVBOzs7S0FHQyxHQUNEcUwsaUJBQWlCO1FBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQ3BMLFVBQVUsRUFBRTtZQUNsQixJQUFJLENBQUNBLFVBQVUsR0FBRyxJQUFJL0Qsa0RBQVNBLENBQzNCLElBQUksQ0FBQ2tSLGVBQWUsSUFDcEIsSUFBSSxDQUFDaE8sSUFBSSxFQUNULElBQUksQ0FBQ3NCLGVBQWU7UUFFNUI7UUFDQSxPQUFPLElBQUksQ0FBQ1QsVUFBVTtJQUMxQjtJQUVBOzs7S0FHQyxHQUNEdU4sb0JBQW9CO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUN0TixhQUFhLEVBQUU7WUFDckIsSUFBSSxDQUFDQSxhQUFhLEdBQUcsSUFBSW5FLDhDQUFNQSxDQUFDMFIsSUFBSSxDQUFDQyxVQUFVLENBQUM7Z0JBQzVDQyxTQUFTdlIsK0VBQTRCQTtnQkFDckN3UixRQUFRLElBQUksQ0FBQzNPLE1BQU07WUFDdkI7UUFDSjtRQUNBLE9BQU8sSUFBSSxDQUFDaUIsYUFBYTtJQUM3QjtJQUVBOzs7O0tBSUMsR0FDRCxNQUFNMk4sZ0JBQWdCQyxxQkFBOEIsS0FBSyxFQUFFO1FBQ3ZELElBQUksSUFBSSxDQUFDbk4sTUFBTSxDQUFDaEYsbUJBQW1CLElBQUksQ0FBQ21TLG9CQUFvQjtZQUN4RCxPQUFPLElBQUksQ0FBQ04saUJBQWlCO1FBQ2pDO1FBQ0EsTUFBTXZOLGFBQWEsSUFBSSxDQUFDb0wsY0FBYztRQUN0QyxJQUFJLENBQUUsTUFBTXBMLFdBQVdxTCxTQUFTLElBQUs7WUFDakMsTUFBTSxJQUFJZixNQUFNO1FBQ3BCO1FBQ0EzSSxRQUFRQyxHQUFHLENBQUM7UUFDWixPQUFPNUIsV0FBVzhOLGFBQWE7SUFDbkM7SUFFQTs7O0tBR0MsR0FDRCxNQUFNaEcscUJBQXFCO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUM1SCxjQUFjLEVBQUU7WUFDdEIsSUFBSSxDQUFDQSxjQUFjLEdBQUdwRSw4Q0FBTUEsQ0FBQ2lTLE1BQU0sQ0FBQztnQkFDaENDLFNBQVM7Z0JBQ1RSLE1BQU0sTUFBTSxJQUFJLENBQUNJLGVBQWU7WUFDcEM7UUFDSjtRQUNBLE9BQU8sSUFBSSxDQUFDMU4sY0FBYztJQUM5QjtJQUVBOzs7S0FHQyxHQUNELE1BQU1tRyxrQkFBa0I7UUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQ2pHLFdBQVcsRUFBRTtZQUNuQixNQUFNeEcscUJBQXVDLElBQUksQ0FBQzZHLGVBQWU7WUFDakUsTUFBTVAsaUJBQWlCLE1BQU0sSUFBSSxDQUFDNEgsa0JBQWtCO1lBQ3BELE1BQU0xSCxjQUFjLElBQUlyRSwyREFBVUEsQ0FDOUJtRSxnQkFDQXRHO1lBRUosTUFBTXdHLFlBQVlzSSxPQUFPO1lBQ3pCLElBQUksQ0FBQ3RJLFdBQVcsR0FBR0E7UUFDdkI7UUFDQSxPQUFPLElBQUksQ0FBQ0EsV0FBVztJQUMzQjtJQUVBOzs7S0FHQyxHQUNELE1BQU1zSixtQkFBbUI7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQ3JKLFlBQVksRUFBRTtZQUNwQixNQUFNL0Ysc0JBQXlDLElBQUksQ0FBQ21HLGVBQWU7WUFDbkUsTUFBTVAsaUJBQWlCLE1BQU0sSUFBSSxDQUFDNEgsa0JBQWtCO1lBQ3BELElBQUksQ0FBQ3pILFlBQVksR0FBRyxJQUFJckUsNERBQVdBLENBQy9Ca0UsZ0JBQ0E1RjtRQUVSO1FBQ0EsT0FBTyxJQUFJLENBQUMrRixZQUFZO0lBQzVCO0lBRUE7OztLQUdDLEdBQ0QsTUFBTTRJLHVCQUF1QjtRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDM0ksZ0JBQWdCLEVBQUU7WUFDeEIsTUFBTUksU0FBNEIsSUFBSSxDQUFDRCxlQUFlO1lBQ3RELE1BQU1QLGlCQUFpQixNQUFNLElBQUksQ0FBQzRILGtCQUFrQjtZQUNwRCxJQUFJLENBQUN4SCxnQkFBZ0IsR0FBRyxJQUFJL0QscUVBQWNBLENBQUMyRCxnQkFBZ0JRO1FBQy9EO1FBQ0EsT0FBTyxJQUFJLENBQUNKLGdCQUFnQjtJQUNoQztJQUdBOzs7S0FHQyxHQUNELE1BQU1zSywyQkFBMkI7UUFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQ3pLLG9CQUFvQixFQUFFO1lBQzVCLElBQUksQ0FBQ0Esb0JBQW9CLEdBQUdyRSw4Q0FBTUEsQ0FBQ21TLE1BQU0sQ0FBQztnQkFDdENELFNBQVM7Z0JBQ1RSLE1BQU0sTUFBTSxJQUFJLENBQUNJLGVBQWUsQ0FBQztZQUNyQztRQUNKO1FBQ0EsT0FBTyxJQUFJLENBQUN6TixvQkFBb0I7SUFDcEM7SUFFQTs7OztLQUlDLEdBQ0QsTUFBTXlELHFCQUFxQnNLLFFBQWlCLEtBQUssRUFBRTtRQUMvQyxNQUFNQyxlQUFlLE1BQU0sSUFBSSxDQUFDQywwQkFBMEI7UUFDMUQsSUFBSUQsaUJBQWlCbk4sYUFBYW1OLGlCQUFpQixNQUFNO1lBQ3JELElBQUlELE9BQU87Z0JBQ1AsTUFBTSxJQUFJNUQsTUFBTTtZQUNwQjtZQUNBLE9BQU87Z0JBQ0gvRyxVQUFVLENBQUMsMEVBQTBFLEVBQUUsSUFBSSxDQUFDcEUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN2RztRQUNKO1FBRUEsTUFBTWlCLGNBQWMsTUFBTSxJQUFJLENBQUNpRyxlQUFlO1FBQzlDLE1BQU1nSSxrQkFBa0JqTyxZQUFZa08sa0JBQWtCLENBQ2xESCxhQUFhbEssSUFBSTtRQUVyQixJQUFJb0ssb0JBQW9CLGFBQWE7WUFDakMsSUFBSUgsT0FBTztnQkFDUCxNQUFNLElBQUk1RCxNQUFNO1lBQ3BCO1lBQ0EsT0FBTztnQkFDSC9HLFVBQVUsQ0FBQywwQkFBMEIsRUFBRTRLLGFBQWFsSyxJQUFJLENBQUMsNEZBQTRGLENBQUM7WUFDMUo7UUFDSjtRQUNBLElBQUksQ0FBQ3pELGtCQUFrQixHQUFHSixZQUFZeUksWUFBWTtRQUNsRCxJQUFJLENBQUN0SixTQUFTLEdBQUc4TztJQUNyQjtJQUVBOzs7S0FHQyxHQUNELE1BQU1ELDZCQUE2QjtRQUMvQixNQUFNRyxhQUFhLElBQUksQ0FBQ3BQLElBQUk7UUFDNUIsTUFBTWUsaUJBQWlCLE1BQU0sSUFBSSxDQUFDNEgsa0JBQWtCO1FBQ3BELE1BQU1DLE9BQTRCLElBQUksQ0FBQ3RILGVBQWU7UUFDdEQsTUFBTU0sU0FBUzFFLGtFQUFxQkEsQ0FBQ2tTO1FBQ3JDLE1BQU1oTCxXQUFXLE1BQU1yRCxlQUFlOEgsWUFBWSxDQUFDM0MsTUFBTSxDQUFDNEMsR0FBRyxDQUFDO1lBQzFEQyxlQUFlSCxLQUFLdk8sUUFBUTtZQUM1QjJPLE9BQU9KLEtBQUt0Tyx5QkFBeUI7WUFDckMyTyxtQkFBbUI7UUFDdkI7UUFDQSxJQUFJLENBQUM3RSxTQUFTOEUsSUFBSSxDQUFDaEQsTUFBTSxFQUFFO1lBQ3ZCLE1BQU0sSUFBSWlGLE1BQU07UUFDcEI7UUFDQSxPQUFPL0csU0FBUzhFLElBQUksQ0FBQ2hELE1BQU0sQ0FDdEJDLEdBQUcsQ0FBQyxDQUFDZ0Q7WUFDRixNQUFNQyxZQUNGRCxHQUFHLENBQUNsTSwrREFBa0JBLENBQUMyTCxLQUFLcE8sMEJBQTBCLEVBQUU7WUFDNUQsTUFBTTZVLGdCQUNGakcsYUFBYXZILFlBQ1AzRSxrRUFBcUJBLENBQUNrTSxhQUN0QkE7WUFDVixNQUFNa0csY0FDRm5HLEdBQUcsQ0FBQ2xNLCtEQUFrQkEsQ0FBQzJMLEtBQUtyTyx3QkFBd0IsRUFBRTtZQUMxRCxPQUFPO2dCQUFDdUssTUFBTXdLO2dCQUFhMU4sUUFBUXlOO1lBQWE7UUFDcEQsR0FDQzVDLE1BQU0sQ0FBQyxDQUFDck0sWUFBY0EsVUFBVXdCLE1BQU0sS0FBS0EsT0FBTyxDQUFDLEVBQUU7SUFDOUQ7SUFFQTs7Ozs7S0FLQyxHQUNELE1BQU1nRSxvQkFBNEM7UUFDOUMsa0ZBQWtGO1FBQ2xGLE1BQU0ySixRQUFRLE1BQU0sSUFBSSxDQUFDekYsb0JBQW9CO1FBQzdDLE1BQU0wRixxQkFBcUIsTUFBTUQsTUFBTXhGLDZCQUE2QixDQUFDLElBQUksQ0FBQzNKLFNBQVMsQ0FBRTBFLElBQUk7UUFDekYsSUFBSTBLLHNCQUFzQixNQUFNO1lBQzVCLE9BQU87Z0JBQUVwTCxVQUFVO1lBQWdEO1FBQ3ZFO1FBRUEsMkZBQTJGO1FBQzNGLElBQUlvTCxtQkFBbUJ2RSxTQUFTLEdBQUcsR0FBRztZQUNsQyxPQUFPdUUsbUJBQW1CQyxVQUFVO1FBQ3hDO1FBRUEsdUVBQXVFO1FBQ3ZFLE1BQU1GLE1BQU1HLHFCQUFxQixDQUFDRjtRQUVsQywrREFBK0Q7UUFDL0QsTUFBTUcsVUFBVSxNQUFNSixNQUFNeEYsNkJBQTZCLENBQUMsSUFBSSxDQUFDM0osU0FBUyxDQUFFMEUsSUFBSTtRQUM5RSxJQUFJNkssV0FBVyxNQUFNO1lBQ2pCLE9BQU87Z0JBQUV2TCxVQUFVLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQ2hFLFNBQVMsQ0FBRTBFLElBQUksQ0FBQywyQkFBMkIsQ0FBQztZQUFDO1FBQ3BGO1FBRUEsTUFBTXNGLFNBQVNqTix3RUFBbUJBLENBQzlCd1MsUUFBUTVFLFdBQVcsRUFDbkI0RSxRQUFRNUUsV0FBVyxHQUFHNEUsUUFBUTFFLFNBQVMsRUFDdkMwRSxRQUFROUUsVUFBVTtRQUV0QixPQUFPO1lBQ0h6RyxVQUFVLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQ2hFLFNBQVMsQ0FBRTBFLElBQUksQ0FBQyw2QkFBNkIsRUFBRXNGLFFBQVE7UUFDckY7SUFDSjtBQUNKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcDFDK0Y7QUFDZjtBQUNMO0FBQ2Y7QUFHckQsTUFBTTRGO0lBQ1Q3RyxJQUFXO0lBQ1g4RyxNQUFjO0lBQ2RDLFNBQWtCO0lBQ2xCQyxnQkFBd0I7SUFDeEJsRixVQUFrQjtJQUNsQkosV0FBbUI7SUFDbkJFLFlBQW9CO0lBRXBCLFlBQ0k1QixHQUFVLEVBQ1Y4RyxLQUFhLEVBQ2JDLFFBQWEsRUFDYkMsZUFBb0IsRUFDcEJsRixTQUFjLEVBQ2RKLFVBQWUsRUFDZkUsV0FBZ0IsQ0FDbEI7UUFDRSxJQUFJLENBQUM1QixHQUFHLEdBQUdBO1FBQ1gsSUFBSSxDQUFDOEcsS0FBSyxHQUFHQTtRQUNiLElBQUksQ0FBQ0MsUUFBUSxHQUFHTCwrREFBa0JBLENBQUNLO1FBQ25DLElBQUksQ0FBQ0MsZUFBZSxHQUFHQyxPQUFPRCxtQkFBbUI7UUFDakQsSUFBSSxDQUFDbEYsU0FBUyxHQUFHb0YsT0FBT3BGO1FBQ3hCLElBQUksQ0FBQ0osVUFBVSxHQUFHd0YsT0FBT3hGO1FBQ3pCLElBQUksQ0FBQ0UsV0FBVyxHQUFHc0YsT0FBT3RGO0lBQzlCO0lBRUEwRSxhQUE0QjtRQUN4QixJQUFJLElBQUksQ0FBQ3hFLFNBQVMsR0FBRyxHQUFHO1lBQ3BCLE1BQU03RyxXQUFXakgsd0VBQW1CQSxDQUNoQyxJQUFJLENBQUM0TixXQUFXLEVBQ2hCLElBQUksQ0FBQ0UsU0FBUyxHQUFHLElBQUksQ0FBQ0YsV0FBVyxFQUNqQyxJQUFJLENBQUNGLFVBQVUsRUFDZjtZQUVKLE9BQU87Z0JBQ0h6RztZQUNKO1FBQ0o7UUFDQSxJQUFJLENBQUMsSUFBSSxDQUFDOEwsUUFBUSxFQUFFO1lBQ2hCLE9BQU87Z0JBQ0g5TCxVQUFVLENBQUMsK0NBQStDLEVBQUUsSUFBSSxDQUFDK0wsZUFBZSxFQUFFO1lBQ3RGO1FBQ0o7UUFDQSxPQUFPO1lBQ0gvTCxVQUFVO1FBQ2Q7SUFDSjtBQUNKO0FBRU8sTUFBZWtNO0lBQ2xCZixNQUFrQztJQUVsQyxZQUFzQkEsS0FBaUMsQ0FBRTtRQUNyRCxJQUFJLENBQUNBLEtBQUssR0FBR0E7SUFDakI7SUFXQSxNQUFNeEYsOEJBQ0Z4RSxjQUFzQixFQUNnQjtRQUN0QyxNQUFNZ0wsZ0JBQWdCLE1BQU0sSUFBSSxDQUFDaEIsS0FBSyxDQUFDaUIsMkJBQTJCLENBQzlEakwsZ0JBQ0EsSUFBSSxDQUFDa0wsV0FBVztRQUVwQixJQUFJRixpQkFBaUIsTUFBTTtZQUN2QixPQUFPO1FBQ1g7UUFDQSxNQUFNTCxXQUNGSyxjQUFjcEgsR0FBRyxDQUFDbE0sK0RBQWtCQSxDQUFDLElBQUksQ0FBQ3lULGVBQWUsRUFBRTtRQUMvRCxNQUFNUCxrQkFDRkksY0FBY3BILEdBQUcsQ0FBQ2xNLCtEQUFrQkEsQ0FBQyxJQUFJLENBQUMwVCxzQkFBc0IsRUFBRTtRQUN0RSxNQUFNQywrQkFDRkwsY0FBY3BILEdBQUcsQ0FBQ2xNLCtEQUFrQkEsQ0FBQyxJQUFJLENBQUM0VCxnQkFBZ0IsRUFBRTtRQUNoRSxNQUFNQywwQkFDRlAsY0FBY3BILEdBQUcsQ0FBQ2xNLCtEQUFrQkEsQ0FBQyxJQUFJLENBQUM4VCxpQkFBaUIsRUFBRTtRQUNqRSxNQUFNQyw2QkFDRlQsY0FBY3BILEdBQUcsQ0FBQ2xNLCtEQUFrQkEsQ0FBQyxJQUFJLENBQUNnVSxrQkFBa0IsRUFBRTtRQUNsRSxPQUFPLElBQUlqQix1QkFDUE8sY0FBY3BILEdBQUcsRUFDakJvSCxjQUFjTixLQUFLLEVBQ25CQyxVQUNBQyxpQkFDQVMsOEJBQ0FFLHlCQUNBRTtJQUVSO0lBRUEsTUFBTXRCLHNCQUNGYSxhQUFxQyxFQUN2QztRQUNFLElBQUksQ0FBQ0EsY0FBY0wsUUFBUSxFQUFFO1lBQ3pCLE1BQU0sSUFBSS9FLE1BQ04sQ0FBQyxvREFBb0QsRUFBRW9GLGNBQWNKLGVBQWUsRUFBRTtRQUU5RjtRQUNBLElBQUlJLGNBQWN0RixTQUFTLEdBQUcsR0FBRztZQUM3QixNQUFNLElBQUlFLE1BQ04sQ0FBQyx3Q0FBd0MsRUFBRW9GLGNBQWN0RixTQUFTLENBQUMscUJBQXFCLEVBQUVzRixjQUFjeEYsV0FBVyxDQUFDLGNBQWMsRUFBRXdGLGNBQWMxRixVQUFVLEVBQUU7UUFFdEs7UUFFQSxNQUFNcUcsU0FBU1gsY0FBY04sS0FBSztRQUNsQyxNQUFNa0IsY0FBYyxJQUFJLENBQUNBLFdBQVc7UUFDcEMsTUFBTUMsZUFBZWIsY0FBY3BILEdBQUcsQ0FBQ2pLLE1BQU0sR0FBR2lTO1FBQ2hELE1BQU1FLHNCQUFzQnRCLHVGQUFpQ0EsQ0FBQyxJQUFJck47UUFFbEUsTUFBTTRPLFdBQVdmLGNBQWNwSCxHQUFHLENBQzdCaEcsS0FBSyxDQUFDZ08sYUFDTmhMLEdBQUcsQ0FBQyxDQUFDQyxJQUFNQSxHQUFHaUU7UUFFbkIsNERBQTREO1FBQzVEaUgsU0FBU3ROLElBQUksQ0FBQ3FOO1FBRWQsTUFBTUUsZ0JBQWdCQyxLQUFLQyxHQUFHLENBQUNMLGNBQWNFLFNBQVNwUyxNQUFNO1FBQzVELE1BQU9vUyxTQUFTcFMsTUFBTSxHQUFHcVMsY0FBZTtZQUNwQ0QsU0FBU3ROLElBQUksQ0FBQztRQUNsQjtRQUVBLE1BQU0wTixZQUFZUCxjQUFjSSxnQkFBZ0I7UUFDaEQsTUFBTXZJLFFBQVEsR0FBRyxJQUFJLENBQUN1RyxLQUFLLENBQUNvQyxVQUFVLENBQUMsQ0FBQyxFQUFFL0IsbUVBQXNCQSxDQUM1RHNCLFFBQ0FDLGFBQ0YsQ0FBQyxFQUFFdkIsbUVBQXNCQSxDQUFDc0IsUUFBUVEsWUFBWTtRQUVoRGxQLFFBQVFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRXVHLE1BQU0sTUFBTSxFQUFFc0ksU0FBU3BTLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDOUQsTUFBTSxJQUFJLENBQUNxUSxLQUFLLENBQUNxQyxhQUFhLENBQUM1SSxPQUFPO1lBQUNzSTtTQUFTO0lBQ3BEO0FBQ0o7QUFFTyxNQUFNbFUsdUJBQXVCa1Q7SUFDaEMvTyxPQUEwQjtJQUUxQixZQUNJUixjQUF1QyxFQUN2Q1EsTUFBeUIsQ0FDM0I7UUFDRSxLQUFLLENBQ0QsSUFBSXVPLDRFQUEwQkEsQ0FDMUIvTyxnQkFDQVEsT0FBT2xILFFBQVEsRUFDZmtILE9BQU83RixnQkFBZ0I7UUFHL0IsSUFBSSxDQUFDNkYsTUFBTSxHQUFHQTtJQUNsQjtJQUVBLElBQUk0UCxjQUFzQjtRQUN0QixPQUFPbFUsK0RBQWtCQSxDQUNyQixJQUFJLENBQUNzRSxNQUFNLENBQUN0RixzQ0FBc0M7SUFFMUQ7SUFFQSxJQUFJMFYsYUFBcUI7UUFDckIsT0FBTyxJQUFJLENBQUNwUSxNQUFNLENBQUM3RixnQkFBZ0I7SUFDdkM7SUFFQSxJQUFJZ1Ysa0JBQTBCO1FBQzFCLE9BQU8sSUFBSSxDQUFDblAsTUFBTSxDQUFDNUYsMEJBQTBCO0lBQ2pEO0lBRUEsSUFBSWdWLHlCQUFpQztRQUNqQyxPQUFPLElBQUksQ0FBQ3BQLE1BQU0sQ0FBQzNGLGlDQUFpQztJQUN4RDtJQUVBLElBQUlpVixtQkFBMkI7UUFDM0IsT0FBTyxJQUFJLENBQUN0UCxNQUFNLENBQUN6RixpQ0FBaUM7SUFDeEQ7SUFFQSxJQUFJaVYsb0JBQTRCO1FBQzVCLE9BQU8sSUFBSSxDQUFDeFAsTUFBTSxDQUFDeEYsa0NBQWtDO0lBQ3pEO0lBRUEsSUFBSWtWLHFCQUE2QjtRQUM3QixPQUFPLElBQUksQ0FBQzFQLE1BQU0sQ0FBQ3ZGLG1DQUFtQztJQUMxRDtJQUVBLElBQUl5VSxjQUFzQjtRQUN0QixPQUFPLElBQUksQ0FBQ2xQLE1BQU0sQ0FBQzFGLDRCQUE0QjtJQUNuRDtBQUNKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDck00RTtBQUNJO0FBQ3pCO0FBcUJ2RDs7Q0FFQyxHQUNjLE1BQU1lO0lBQ2pCcUUsWUFBd0M7SUFDeEM4USxvQkFBZ0Q7SUFDaER4USxPQUF5QjtJQUN6QnlRLE9BQXdCLEtBQUs7SUFDN0JDLGdCQUFvQ3BRLFVBQVU7SUFDOUN3TCxhQUE2QixFQUFFLENBQUM7SUFFaEM7Ozs7S0FJQyxHQUNELFlBQ0l0TSxjQUF1QyxFQUN2Q1EsTUFBd0IsQ0FDMUI7UUFDRSxJQUFJLENBQUNOLFdBQVcsR0FBRyxJQUFJNk8sNEVBQTBCQSxDQUM3Qy9PLGdCQUNBUSxPQUFPbEgsUUFBUSxFQUNma0gsT0FBTzdHLGtCQUFrQjtRQUU3QixJQUFJLENBQUNxWCxtQkFBbUIsR0FBRyxJQUFJakMsNEVBQTBCQSxDQUNyRC9PLGdCQUNBUSxPQUFPbEgsUUFBUSxFQUNma0gsT0FBTzVHLG9CQUFvQjtRQUUvQixJQUFJLENBQUM0RyxNQUFNLEdBQUdBO0lBQ2xCO0lBRUE7OztLQUdDLEdBQ0QsTUFBTWdJLFVBQVU7UUFDWixJQUFJLENBQUN5SSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMvUSxXQUFXLENBQUNpUixVQUFVLENBQ3pDLElBQUksQ0FBQzNRLE1BQU0sQ0FBQzdHLGtCQUFrQjtRQUVsQyxJQUFJLENBQUN1WCxhQUFhLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQ0YsbUJBQW1CLENBQUNHLFVBQVUsQ0FDM0QsSUFBSSxDQUFDM1EsTUFBTSxDQUFDNUcsb0JBQW9CLENBQ3BDLENBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtRQUNULElBQUksQ0FBQzBTLFVBQVUsR0FBRyxJQUFJLENBQUMyRSxJQUFJLENBQUU3TCxHQUFHLENBQUMsQ0FBQ0MsR0FBRytMLElBQ2pDLElBQUksQ0FBQ0MsbUJBQW1CLENBQUNELEdBQUcvTCxHQUFHLElBQUksQ0FBQzdFLE1BQU0sR0FDNUNrTCxNQUFNLENBQUMsQ0FBQ3JHLElBQU1BLEtBQUs7SUFDckIsMENBQTBDO0lBQzFDLCtCQUErQjtJQUNuQztJQUVBOzs7S0FHQyxHQUNELElBQUl1RixXQUFXO1FBQ1gsTUFBTUEsV0FBV2tHLG9FQUF1QkEsQ0FDcEMsSUFBSSxDQUFDdFEsTUFBTSxDQUFDekcsYUFBYSxFQUN6QixJQUFJLENBQUNrWCxJQUFJO1FBRWIsT0FDSSxhQUFjblEsYUFBYSxJQUFJLENBQUNvUSxhQUFhLEtBQUssS0FDbER0RyxTQUFTMUosV0FBVyxPQUFPO0lBRW5DO0lBRUE7OztLQUdDLEdBQ0QsSUFBSXVILGFBQWE7UUFDYixPQUFPc0ksbUVBQWFBLENBQ2hCRCxvRUFBdUJBLENBQUMsSUFBSSxDQUFDdFEsTUFBTSxDQUFDM0csZUFBZSxFQUFFLElBQUksQ0FBQ29YLElBQUk7SUFFdEU7SUFFQTs7O0tBR0MsR0FDRCxJQUFJdEksZUFBZTtRQUNmLE9BQU9vSSxtRUFBYUEsQ0FDaEJELG9FQUF1QkEsQ0FBQyxJQUFJLENBQUN0USxNQUFNLENBQUMxRyxpQkFBaUIsRUFBRSxJQUFJLENBQUNtWCxJQUFJO0lBRXhFO0lBRUE7OztLQUdDLEdBQ0QsSUFBSXJJLGFBQWE7UUFDYixPQUFPLElBQUksQ0FBQ0gsVUFBVSxDQUFDNkksT0FBTyxPQUFPLElBQUksQ0FBQzNJLFlBQVksQ0FBQzJJLE9BQU87SUFDbEU7SUFFQTs7OztLQUlDLEdBQ0RsRCxtQkFBbUJySyxJQUFZLEVBQUU7UUFDN0IsTUFBTXVJLGFBQWEsSUFBSSxDQUFDQSxVQUFVLENBQUNaLE1BQU0sQ0FBQyxDQUFDckcsSUFBTUEsRUFBRXRCLElBQUksS0FBS0E7UUFDNUQsSUFBSXVJLFdBQVduTyxNQUFNLEtBQUssR0FBRztZQUN6QixPQUFPO1FBQ1g7UUFDQSxPQUFPbU8sVUFBVSxDQUFDLEVBQUU7SUFDeEI7SUFFQTs7OztLQUlDLEdBQ0RqRyx5QkFBeUM7UUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQ3VDLFVBQVUsRUFBRTtZQUNsQixNQUFNLElBQUl3QixNQUFNO1FBQ3BCO1FBQ0EsT0FBTyxJQUFJLENBQUNrQyxVQUFVLENBQUNaLE1BQU0sQ0FBQyxDQUFDckcsSUFBTUEsRUFBRXhCLE9BQU87SUFDbEQ7SUFFQTs7Ozs7O0tBTUMsR0FDRCxNQUFNQSxRQUFRb0YsZ0JBQThCLEVBQUVvQixpQkFBeUIsRUFBRTtRQUNyRSxJQUFJLENBQUMsSUFBSSxDQUFDekIsVUFBVSxFQUFFO1lBQ2xCLE1BQU0sSUFBSXdCLE1BQU07UUFDcEI7UUFDQTNJLFFBQVFDLEdBQUcsQ0FBQyxDQUFDLGlCQUFpQixFQUFFNlAsS0FBS0MsU0FBUyxDQUFDdkksbUJBQW1CO1FBRWxFLE1BQU1iLE1BQU1hLGlCQUFpQmlHLEtBQUssR0FBRyxHQUFHLDhCQUE4QjtRQUN0RSxNQUFNakgsUUFBUSxHQUFHLElBQUksQ0FBQ3pILE1BQU0sQ0FBQ3JHLHVCQUF1QixHQUFHaU8sS0FBSztRQUU1RCxNQUFNLElBQUksQ0FBQ2xJLFdBQVcsQ0FBQzJRLGFBQWEsQ0FBQzVJLE9BQU87WUFBQztnQkFBQ29DO2FBQWtCO1NBQUM7SUFDckU7SUFFQTs7Ozs7O0tBTUMsR0FDRCxNQUFNbEcsZUFBZXNOLGlCQUErQixFQUFFQyxpQkFBeUIsRUFBRTtRQUM3RSxJQUFJLENBQUMsSUFBSSxDQUFDOUksVUFBVSxFQUFFO1lBQ2xCLE1BQU0sSUFBSXdCLE1BQU07UUFDcEI7UUFDQTNJLFFBQVFDLEdBQUcsQ0FBQyxDQUFDLGlCQUFpQixFQUFFNlAsS0FBS0MsU0FBUyxDQUFDQyxvQkFBb0I7UUFFbkUsTUFBTXJKLE1BQU1xSixrQkFBa0J2QyxLQUFLLEdBQUcsR0FBRyw4QkFBOEI7UUFDdkUsTUFBTWpILFFBQVEsR0FBRyxJQUFJLENBQUN6SCxNQUFNLENBQUN0Ryx1QkFBdUIsR0FBR2tPLEtBQUs7UUFFNUQsTUFBTSxJQUFJLENBQUNsSSxXQUFXLENBQUMyUSxhQUFhLENBQUM1SSxPQUFPO1lBQUM7Z0JBQUN5SjthQUFrQjtTQUFDO0lBQ3JFO0lBRUE7Ozs7OztLQU1DLEdBQ0Qsb0JBQ0l4QyxLQUFhLEVBQ2I5RyxHQUFhLEVBQ2JQLElBQXdCLEVBQ0w7UUFDbkIsSUFBSU8sSUFBSWpLLE1BQU0sR0FBRyxHQUFHO1lBQ2hCLE9BQU87UUFDWDtRQUNBLElBQUkrUSxRQUFRLEdBQUU7WUFDVixPQUFPO1FBQ1g7UUFDQSxPQUFPO1lBQ0hBLE9BQU9BO1lBQ1BuTCxNQUFNcUUsR0FBRyxDQUFDbE0sK0RBQWtCQSxDQUFDMkwsS0FBSzdOLFdBQVcsRUFBRTtZQUMvQzJYLFVBQVV2SixHQUFHLENBQUNsTSwrREFBa0JBLENBQUMyTCxLQUFLNU4sZUFBZSxFQUFFO1lBQ3ZEZ0ssU0FBU21FLEdBQUcsQ0FBQ2xNLCtEQUFrQkEsQ0FBQzJMLEtBQUszTix1QkFBdUIsRUFBRTtZQUM5RDJKLFNBQVN1RSxHQUFHLENBQUNsTSwrREFBa0JBLENBQUMyTCxLQUFLMU4sdUJBQXVCLEVBQUU7UUFDbEU7SUFDSjtBQUNKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNU1pRDtBQUMrQjtBQUNMO0FBRTNFOztDQUVDLEdBQ2MsTUFBTTJCO0lBQ2pCMFMsTUFBa0M7SUFDbENoTyxPQUEwQjtJQUUxQjs7OztLQUlDLEdBQ0QsWUFDSVIsY0FBdUMsRUFDdkNRLE1BQXlCLENBQzNCO1FBQ0UsSUFBSSxDQUFDZ08sS0FBSyxHQUFHLElBQUlPLDRFQUEwQkEsQ0FDdkMvTyxnQkFDQVEsT0FBT2xILFFBQVEsRUFDZmtILE9BQU9uRyxZQUFZO1FBRXZCLElBQUksQ0FBQ21HLE1BQU0sR0FBR0E7SUFDbEI7SUFFQTs7OztLQUlDLEdBQ0QsTUFBTWlKLG1CQUNGakYsY0FBc0IsRUFDUDtRQUNmLE1BQU1nTCxnQkFBZ0IsTUFBTSxJQUFJLENBQUNoQixLQUFLLENBQUNpQiwyQkFBMkIsQ0FDOURqTCxnQkFDQSxJQUFJLENBQUNoRSxNQUFNLENBQUNsRyx3QkFBd0I7UUFHeEMsSUFBSSxDQUFDa1YsZUFBZTtZQUNoQixPQUFPLENBQUM7UUFDWjtRQUVBLE1BQU1sQixnQkFDRmtCLGNBQWNwSCxHQUFHLENBQUNsTSwrREFBa0JBLENBQUMsSUFBSSxDQUFDc0UsTUFBTSxDQUFDakcsd0JBQXdCLEVBQUU7UUFFL0UsTUFBTXNYLGFBQWFELHlGQUFtQ0EsQ0FBQ3BDLGNBQWNwSCxHQUFHLEVBQ25FaEQsR0FBRyxDQUFDLENBQUNDLElBQU9BLEdBQUd2QixXQUFXLE9BQU8sTUFBTSxHQUN2QzZILE1BQU0sQ0FBQyxDQUFDdEcsR0FBR2tILEdBQUc2RSxJQUFNL0wsSUFBSWtILEdBQUc7UUFFaEMsT0FBTytCLGdCQUFnQnVEO0lBQzNCO0FBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4RGtDO0FBR2lCO0FBQ087QUFHUDtBQUVuRCxNQUFNL1MsU0FBUztJQUNYO0lBQ0E7Q0FDSDtBQUVEOztDQUVDLEdBQ2MsTUFBTS9DO0lBQ2pCOEUsT0FBZTtJQUNmK00sY0FBNEI7SUFDNUIvTixZQUE0QjtJQUM1Qm1TLE9BQWdCO0lBQ2hCQyxTQUFrQixNQUFNO0lBRXhCOzs7Ozs7S0FNQyxHQUNELFlBQ0lwUyxXQUEyQixFQUMzQmdCLE1BQTBCLEVBQzFCZ0gsSUFBcUIsQ0FDdkI7UUFDRSxJQUFJaEgsV0FBV0MsYUFBYUQsV0FBVyxNQUFNO1lBQ3pDLE1BQU0sSUFBSXVKLE1BQU07UUFDcEI7UUFDQSxJQUFJLENBQUN2SixNQUFNLEdBQUcxRSxrRUFBcUJBLENBQUMwRTtRQUVwQyxNQUFNcVIsY0FBY0oseUVBQXNCQTtRQUMxQyxNQUFNLEVBQUVLLGFBQWEsRUFBRUMsU0FBUyxFQUFFQyxhQUFhLEVBQUUsR0FBR0gsWUFBWUksR0FBRztRQUNuRSxJQUFJLENBQUMxRSxhQUFhLEdBQUcsSUFBSWhTLDhDQUFNQSxDQUFDMFIsSUFBSSxDQUFDaUYsTUFBTSxDQUN2Q0gsV0FDQUQsZUFDQUUsYUFBYSxDQUFDLEVBQUU7UUFFcEIsSUFBSSxDQUFDeFMsV0FBVyxHQUFHQTtRQUNuQixJQUFJbVMsU0FBU25LLEtBQUt6TyxnQkFBZ0I7UUFDbEMsSUFBSTRZLFdBQVdsUixhQUFha1IsV0FBVyxRQUFRQSxXQUFXLElBQUk7WUFDMURBLFNBQVNsUjtRQUNiLE9BQU87WUFDSCxJQUFJLENBQUNrUixNQUFNLEdBQUdBO1FBQ2xCO0lBQ0o7SUFFQTs7O0tBR0MsR0FDRCxNQUFNN0csWUFBOEI7UUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQzhHLE1BQU0sRUFBRTtZQUNkLElBQUk7Z0JBQ0F4USxRQUFRQyxHQUFHLENBQUMsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDOFEsU0FBUyxFQUFFO2dCQUMzQyxNQUFNQyxZQUFZLE1BQU0sSUFBSSxDQUFDNVMsV0FBVyxDQUNuQzZTLFNBQVMsQ0FBQyxJQUFJLENBQUNGLFNBQVMsRUFDeEJHLEtBQUs7Z0JBQ1YsSUFDSUYsY0FBYzNSLGFBQ2QyUixVQUFVdEssSUFBSSxJQUFJckgsYUFDbEIyUixVQUFVdEssSUFBSSxDQUFDeUssS0FBSyxLQUFLOVIsV0FDM0I7b0JBQ0VXLFFBQVFDLEdBQUcsQ0FBQyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUM4USxTQUFTLEVBQUU7Z0JBQy9DLE9BQU87b0JBQ0gsTUFBTUksUUFBUUgsVUFBVXRLLElBQUksQ0FBQ3lLLEtBQUs7b0JBQ2xDYixrRUFBZUEsQ0FBQ1UsVUFBVXRLLElBQUksQ0FBQ3NGLE1BQU0sRUFBRTNPO29CQUN2QyxJQUFJLENBQUM4TyxhQUFhLENBQUNpRixjQUFjLENBQUNEO29CQUNsQ25SLFFBQVFDLEdBQUcsQ0FBQyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUM4USxTQUFTLEVBQUU7b0JBQzVDLElBQUksQ0FBQ1AsTUFBTSxHQUFHO2dCQUNsQjtZQUNKLEVBQUUsT0FBT3pRLEdBQUc7Z0JBQ1JDLFFBQVFDLEdBQUcsQ0FDUCxDQUFDLHlCQUF5QixFQUFFLElBQUksQ0FBQzhRLFNBQVMsQ0FBQyxJQUFJLEVBQUVoUixHQUFHO1lBRTVEO1FBQ0o7UUFDQSxPQUFPLElBQUksQ0FBQ3lRLE1BQU07SUFDdEI7SUFFQTs7O0tBR0MsR0FDRCxJQUFJTyxZQUFvQjtRQUNwQixPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQzNSLE1BQU0sRUFBRTtJQUNsQztJQUVBOzs7S0FHQyxHQUNELE1BQU1tTSxjQUFnQztRQUNsQyxNQUFNeUYsWUFBWSxNQUFNLElBQUksQ0FBQzVTLFdBQVcsQ0FDbkM2UyxTQUFTLENBQUMsSUFBSSxDQUFDRixTQUFTLEVBQ3hCRyxLQUFLO1FBQ1YsSUFDSUYsY0FBYzNSLGFBQ2QyUixVQUFVdEssSUFBSSxJQUFJckgsYUFDbEIyUixVQUFVdEssSUFBSSxDQUFDeUssS0FBSyxLQUFLOVIsV0FDM0I7WUFDRVcsUUFBUUMsR0FBRyxDQUFDLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQzhRLFNBQVMsRUFBRTtZQUMzQyxPQUFPO1FBQ1g7UUFDQSxNQUFNLElBQUksQ0FBQzNTLFdBQVcsQ0FBQzZTLFNBQVMsQ0FBQ0QsVUFBVUssR0FBRyxFQUFFQyxNQUFNO1FBQ3REdFIsUUFBUUMsR0FBRyxDQUFDLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQzhRLFNBQVMsRUFBRTtRQUM3QyxPQUFPO0lBQ1g7SUFFQTs7Ozs7S0FLQyxHQUNELE1BQU1RLGNBQWNDLElBQVksRUFBRXhGLE1BQWdCLEVBQWlCO1FBQy9Ec0UsbUVBQWVBLENBQUN0RSxRQUFRM087UUFDeEIsTUFBTThULFFBQVEsTUFBTSxJQUFJLENBQUNoRixhQUFhLENBQUNzRixRQUFRLENBQUNEO1FBQ2hEeFIsUUFBUUMsR0FBRyxDQUFDNlAsS0FBS0MsU0FBUyxDQUFDdE0sT0FBT3lDLElBQUksQ0FBQ2lMLE1BQU1sUSxHQUFHO1FBQ2hEakIsUUFBUUMsR0FBRyxDQUFDNlAsS0FBS0MsU0FBUyxDQUFDb0IsTUFBTU8sTUFBTTtRQUN2QyxJQUFJLENBQUN2RixhQUFhLENBQUNpRixjQUFjLENBQUNELE1BQU1PLE1BQU07UUFDOUMsSUFBSTtZQUNBLE1BQU1DLFdBQVcsTUFBTSxJQUFJLENBQUN2VCxXQUFXLENBQUM2UyxTQUFTLENBQUMxUCxNQUFNLENBQUM7Z0JBQ3JEbUYsTUFBTTtvQkFBRXlLLE9BQU9BLE1BQU1PLE1BQU07b0JBQUUxRixRQUFRQTtnQkFBTztnQkFDNUM0RixZQUFZLElBQUksQ0FBQ2IsU0FBUztZQUM5QjtRQUNKLEVBQUUsT0FBT2hSLEdBQUc7WUFDUkMsUUFBUUMsR0FBRyxDQUNQLENBQUMsNERBQTRELEVBQUVGLEdBQUc7WUFFdEUsTUFBTTRSLFdBQVcsTUFBTSxJQUFJLENBQUN2VCxXQUFXLENBQ2xDNlMsU0FBUyxDQUFDLElBQUksQ0FBQ0YsU0FBUyxFQUN4QmMsTUFBTSxDQUFDO2dCQUNKbkwsTUFBTTtvQkFBRXlLLE9BQU9BO29CQUFPbkYsUUFBUUE7Z0JBQU87WUFDekM7UUFDUjtJQUNKO0lBRUE7OztLQUdDLEdBQ0QsTUFBTXBDLGFBQThCO1FBQ2hDLE1BQU1rSSxLQUFLLElBQUksQ0FBQ0Msb0JBQW9CO1FBQ3BDL1IsUUFBUUMsR0FBRyxDQUFDLENBQUMsWUFBWSxFQUFFNlIsR0FBRyxLQUFLLEVBQUUsSUFBSSxDQUFDMVMsTUFBTSxFQUFFO1FBQ2xELE1BQU00UyxNQUFNLE1BQU0sSUFBSSxDQUFDNVQsV0FBVyxDQUFDNlMsU0FBUyxDQUFDMVAsTUFBTSxDQUFDO1lBQ2hEbUYsTUFBTTtnQkFBRXRILFFBQVEsSUFBSSxDQUFDQSxNQUFNO2dCQUFFNE0sUUFBUTNPO1lBQU87WUFDNUN1VSxZQUFZRTtZQUNaRyxLQUFLLEtBQUs7UUFDZDtRQUNBalMsUUFBUUMsR0FBRyxDQUFDLENBQUMsZ0JBQWdCLEVBQUU2UCxLQUFLQyxTQUFTLENBQUNpQyxNQUFNO1FBRXBELE1BQU01TCxPQUE0QjtZQUM5QjhMLGFBQWE7WUFDYkMsT0FBTzlVO1lBQ1ArVSxPQUFPTjtRQUNYO1FBQ0EsSUFBSSxJQUFJLENBQUN2QixNQUFNLEVBQUU7WUFDYm5LLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDbUssTUFBTTtRQUM1QjtRQUVBLE9BQU8sSUFBSSxDQUFDcEUsYUFBYSxDQUFDa0csZUFBZSxDQUFDak07SUFDOUM7SUFFQTs7O0tBR0MsR0FDRDJMLHVCQUErQjtRQUMzQixNQUFNclYsU0FBUztRQUNmLElBQUlnRixTQUFTO1FBQ2IsTUFBTTRRLGFBQ0Y7UUFDSixNQUFNQyxtQkFBbUJELFdBQVc1VixNQUFNO1FBQzFDLElBQUssSUFBSWlULElBQUksR0FBR0EsSUFBSWpULFFBQVFpVCxJQUFLO1lBQzdCak8sVUFBVTRRLFdBQVdFLE1BQU0sQ0FDdkJ4RCxLQUFLeUQsS0FBSyxDQUFDekQsS0FBSzBELE1BQU0sS0FBS0g7UUFFbkM7UUFDQSxPQUFPN1E7SUFDWDtBQUNKO0FBRUE7O0NBRUMsR0FDb0I7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcE1yQjs7Q0FFQyxHQUNELE1BQU1qSztJQUNGNkksSUFBWTtJQUNadUksYUFBcUI7SUFDckJoRixTQUFpQjtJQUNqQmlGLGNBQXdCO0lBQ3hCNkosY0FBMkI7SUFFM0I7Ozs7OztLQU1DLEdBQ0QsWUFDSXJTLEdBQVcsRUFDWHVJLFlBQW9CLEVBQ3BCaEYsUUFBZ0IsRUFDaEJpRixhQUFnQyxDQUNsQztRQUNFLElBQUksQ0FBRUEsQ0FBQUEseUJBQXlCOEosS0FBSSxHQUFJO1lBQ25DOUosZ0JBQWdCO2dCQUFDQTthQUFjO1FBQ25DO1FBQ0EsSUFBSSxDQUFDeEksR0FBRyxHQUFHQTtRQUNYLElBQUksQ0FBQ3VJLFlBQVksR0FBR0E7UUFDcEIsSUFBSSxDQUFDaEYsUUFBUSxHQUFHQTtRQUNoQixJQUFJLENBQUNpRixhQUFhLEdBQUdBLGNBQWNuRixHQUFHLENBQUMsQ0FBQ0MsSUFBTUEsRUFBRWxFLElBQUksR0FBR0QsV0FBVztRQUVsRSxNQUFNb1QsaUJBQTJCaFAsU0FDNUJsRSxPQUFPLENBQUMsT0FBTyxLQUNmRixXQUFXLEdBQ1hpQixLQUFLLENBQUM7UUFDWCxNQUFNb1MsY0FBYztlQUFJLElBQUksQ0FBQ2hLLGFBQWE7ZUFBSytKO1NBQWU7UUFDOUQsSUFBSSxDQUFDRixhQUFhLEdBQUcsSUFBSTdWLElBQVlnVztJQUN6QztBQUNKO0FBRUE7O0NBRUMsR0FDRCxNQUFNdlk7SUFDRnFHLFNBQTBDLENBQUMsRUFBRTtJQUM3Q21TLFFBQXlDLENBQUMsRUFBRTtJQUM1Q0MsUUFBeUMsQ0FBQyxFQUFFO0lBQzVDckwsa0JBQW1ELENBQUMsRUFBRTtJQUV0RDs7O0tBR0MsR0FDRCxZQUFZc0wsYUFBNkIsQ0FBRTtRQUN2QyxLQUFLLE1BQU1DLGdCQUFnQkQsY0FBZTtZQUN0QyxJQUFJLENBQUNyUyxNQUFNLENBQUNzUyxhQUFhNVMsR0FBRyxDQUFDLEdBQUc0UztZQUNoQyxJQUFJLENBQUN2TCxlQUFlLENBQUN1TCxhQUFhckssWUFBWSxDQUFDLEdBQUdxSztZQUNsRCxLQUFLLE1BQU1DLE1BQU1ELGFBQWFQLGFBQWEsQ0FBRTtnQkFDekMsSUFBSSxDQUFDSSxLQUFLLENBQUNJLEdBQUcsR0FBR0Q7WUFDckI7WUFDQSxLQUFLLE1BQU1FLE1BQU1GLGFBQWFwSyxhQUFhLENBQUU7Z0JBQ3pDLElBQUksQ0FBQ2tLLEtBQUssQ0FBQ0ksR0FBRyxHQUFHRjtZQUNyQjtRQUNKO0lBQ0o7SUFFQTs7OztLQUlDLEdBQ0Q3UyxtQkFBbUIzQyxJQUFZLEVBQUU7UUFDN0IsT0FBTyxJQUFJLENBQUNzVixLQUFLLENBQUN0VixLQUFLO0lBQzNCO0lBRUE7Ozs7S0FJQyxHQUNENkMsY0FBYzdDLElBQVksRUFBRTtRQUN4QixNQUFNMlYsZ0JBQWdCM1YsS0FBS2lDLE9BQU8sQ0FBQyxPQUFPO1FBQzFDLE9BQU8sSUFBSSxDQUFDb1QsS0FBSyxDQUFDTSxjQUFjO0lBQ3BDO0FBQ0o7QUFFc0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0RnRDOzs7O0NBSUMsR0FDRCxTQUFTQyxzQkFBc0JDLElBQVk7SUFDdkMsTUFBTTdSLFNBQVMsSUFBSXhCLEtBQUs7SUFDeEJ3QixPQUFPOFIsa0JBQWtCLENBQUN4RSxLQUFLeUUsS0FBSyxDQUFDLENBQUNGLE9BQU8sS0FBSSxJQUFLLFFBQVE7SUFDOUQsT0FBTzdSO0FBQ1g7QUFFQTs7OztDQUlDLEdBQ0QsU0FBU2dTLHVCQUF1QkgsSUFBVTtJQUN0QyxPQUFPLElBQUlyVCxLQUFLcVQsS0FBS0ksV0FBVyxHQUFHaFUsT0FBTyxDQUFDLFFBQVE7QUFDdkQ7QUFFQTs7OztDQUlDLEdBQ0QsU0FBU2lVLHVCQUF1QkwsSUFBVTtJQUN0QyxPQUFPLElBQUlyVCxLQUNQcVQsS0FBS00sa0JBQWtCLENBQUMsU0FBUztRQUFDQyxVQUFVO0lBQXFCO0FBRXpFO0FBRUE7Ozs7Q0FJQyxHQUNELFNBQVN4RSxjQUFjaUUsSUFBWTtJQUMvQixPQUFPSyx1QkFDSEYsdUJBQXVCSixzQkFBc0JDO0FBRXJEO0FBRUE7Ozs7Q0FJQyxHQUNELFNBQVNoRyxrQ0FBa0NnRyxJQUFVO0lBQ2pELE9BQU9BLEtBQ0ZNLGtCQUFrQixDQUFDLFNBQVM7UUFBQ0MsVUFBVTtJQUFxQixHQUM1RHBULEtBQUssQ0FBQyxLQUNOaUQsR0FBRyxDQUFDLENBQUNDLElBQU1BLEVBQUVtUSxRQUFRLENBQUMsR0FBRyxNQUN6QmxTLElBQUksQ0FBQztBQUNkO0FBRUE7Ozs7O0NBS0MsR0FDRCxTQUFTbVMsNkJBQTZCQyxJQUFXLEVBQUVWLElBQVU7SUFDekQsTUFBTVcsVUFBVTNHLGtDQUFrQ2dHO0lBQ2xELE9BQU9VLEtBQUt0USxHQUFHLENBQUMsQ0FBQ0MsSUFBTUEsR0FBR2lFLFlBQVlvQyxNQUFNLENBQUMsQ0FBQ3JHLElBQU1BLEdBQUd1USxTQUFTRDtBQUNwRTtBQUVBOzs7O0NBSUMsR0FDRCxTQUFTL0Qsb0NBQW9DOEQsSUFBVztJQUNwRCxPQUFPRCw2QkFBNkJDLE1BQU0sSUFBSS9UO0FBQ2xEO0FBVUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25GdUI7QUFDc0I7QUFFL0M7OztDQUdDLEdBQ0QsU0FBU21RO0lBQ0wsT0FBT1AsS0FBS3VFLEtBQUssQ0FDYkQsNENBQ2lCLENBQUNHLFFBQVFDLFNBQVMsRUFBRSxDQUFDLG9CQUFvQixDQUFDQyxJQUFJLEVBQzFENU0sUUFBUTtBQUVyQjtBQUVBOzs7Q0FHQyxHQUNELFNBQVNyTjtJQUNMLE9BQU8rWixRQUFRQyxTQUFTLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQ0MsSUFBSTtBQUNoRTtBQUVnRTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0QnRCO0FBRTFDOztDQUVDLEdBQ2MsTUFBTW5IO0lBQ2pCL08sZUFBd0M7SUFDeENtVyxTQUFpQjtJQUNqQnZGLFdBQW1CO0lBRW5COzs7OztLQUtDLEdBQ0QsWUFDSTVRLGNBQXVDLEVBQ3ZDbVcsUUFBZ0IsRUFDaEJ2RixVQUFrQixDQUNwQjtRQUNFLElBQUksQ0FBQzVRLGNBQWMsR0FBR0E7UUFDdEIsSUFBSSxDQUFDbVcsUUFBUSxHQUFHQTtRQUNoQixJQUFJLENBQUN2RixVQUFVLEdBQUdBLFdBQVd6TyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7SUFDOUM7SUFFQTs7OztLQUlDLEdBQ0QsTUFBTWdQLFdBQVdsSixLQUFxQixFQUFnQztRQUNsRSxNQUFNOUUsU0FBUyxNQUFNLElBQUksQ0FBQ2lULFdBQVcsQ0FBQ25PO1FBQ3RDLE9BQU85RSxPQUFPZ0YsSUFBSSxDQUFDaEQsTUFBTSxJQUFJckU7SUFDakM7SUFFQTs7Ozs7O0tBTUMsR0FDRCxNQUFNMk8sNEJBQ0ZqTCxjQUFzQixFQUN0QmtMLFdBQW1CLEVBQ25CekgsS0FBcUIsRUFDeUI7UUFDOUMsTUFBTWdKLE9BQU8sTUFBTSxJQUFJLENBQUNFLFVBQVUsQ0FBQ2xKO1FBQ25DLElBQUlnSixNQUFNO1lBQ04sTUFBTW9GLGVBQWVuYSx5REFBa0JBLENBQUN3VDtZQUN4QyxJQUFLLElBQUkwQixJQUFJLEdBQUdBLElBQUlILEtBQUs5UyxNQUFNLEVBQUVpVCxJQUFLO2dCQUNsQyxJQUFJSCxJQUFJLENBQUNHLEVBQUUsQ0FBQ2lGLGFBQWEsS0FBSzdSLGdCQUFnQjtvQkFDMUMsT0FBTzt3QkFBRTRELEtBQUs2SSxJQUFJLENBQUNHLEVBQUU7d0JBQUVsQyxPQUFPa0M7b0JBQUU7Z0JBQ3BDO1lBQ0o7UUFDSjtRQUVBM1AsUUFBUUMsR0FBRyxDQUNQLENBQUMsd0JBQXdCLEVBQUU4QyxlQUFlLFVBQVUsRUFBRSxJQUFJLENBQUNvTSxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBRTVFLE9BQU87SUFDWDtJQUVBOzs7O0tBSUMsR0FDRCxNQUFNQyxjQUFjNUksS0FBYSxFQUFFOUMsTUFBZSxFQUFFO1FBQ2hELE1BQU1tUixXQUFXLENBQUMsTUFBTSxJQUFJLENBQUNGLFdBQVcsQ0FBQ25PLE9BQU8sS0FBSSxFQUFHRSxJQUFJO1FBRTNEbU8sU0FBU25SLE1BQU0sR0FBR0E7UUFDbEIsTUFBTSxJQUFJLENBQUNuRixjQUFjLENBQUU4SCxZQUFZLENBQUMzQyxNQUFNLENBQUNtTyxNQUFNLENBQUM7WUFDbER0TCxlQUFlLElBQUksQ0FBQ21PLFFBQVE7WUFDNUJwSixrQkFBa0I7WUFDbEI5RSxPQUFPcU8sU0FBU3JPLEtBQUs7WUFDckIrQyxhQUFhc0w7UUFDakI7SUFDSjtJQUVBOzs7Ozs7S0FNQyxHQUNELE1BQWNGLFlBQ1ZuTyxLQUFxQixFQUNyQkMsb0JBQW1DLG1CQUFtQixFQUN4RDtRQUNFLElBQUlxTyxjQUFjLElBQUksQ0FBQzNGLFVBQVU7UUFDakMsSUFBSTNJLFNBQVMsTUFBTTtZQUNmc08sY0FBY0EsY0FBYztZQUU1QixJQUFJdE8sTUFBTW5FLFVBQVUsQ0FBQ3lTLGNBQWM7Z0JBQy9CdE8sUUFBUUEsTUFBTXJKLFNBQVMsQ0FBQzJYLFlBQVlwWSxNQUFNO1lBQzlDO1lBQ0FvWSxjQUFjQSxjQUFjdE87UUFDaEM7UUFDQSxJQUFJSixPQUEwRDtZQUMxREcsZUFBZSxJQUFJLENBQUNtTyxRQUFRO1lBQzVCbE8sT0FBT3NPO1FBQ1g7UUFDQSxJQUFJck8sbUJBQW1CO1lBQ25CTCxLQUFLSyxpQkFBaUIsR0FBR0E7UUFDN0I7UUFDQSxPQUFPLE1BQU0sSUFBSSxDQUFDbEksY0FBYyxDQUFFOEgsWUFBWSxDQUFDM0MsTUFBTSxDQUFDNEMsR0FBRyxDQUFDRjtJQUM5RDtBQUNKOzs7Ozs7Ozs7Ozs7Ozs7O0FDOUdPLFNBQVN6TCxvQkFDWm9hLElBQVksRUFDWkMsS0FBYSxFQUNiQyxLQUFhLEVBQ2JDLGNBQXVCLEtBQUs7SUFFNUIsSUFBSTlULFVBQVUsQ0FBQyxjQUFjLEVBQUUyVCxLQUFLLElBQUksRUFBRUMsTUFBTSx5QkFBeUIsQ0FBQztJQUMxRSxJQUFJRSxlQUFlRCxRQUFRLEdBQUc7UUFDMUI3VCxXQUFXLENBQUMsRUFBRSxFQUFFNlQsTUFBTSxZQUFZLENBQUM7SUFDdkM7SUFDQTdULFdBQVc7SUFDWCxPQUFPQTtBQUNYOzs7Ozs7Ozs7Ozs7Ozs7O0FDYkE7Ozs7O0NBS0MsR0FDRCxTQUFTa1AsZ0JBQWdCdEUsTUFBZ0IsRUFBRW1KLGNBQXdCO0lBQy9ELEtBQUssTUFBTUMsaUJBQWlCRCxlQUFnQjtRQUN4QyxJQUFJbkosV0FBVzNNLGFBQWEsQ0FBQzJNLE9BQU9oSixRQUFRLENBQUNvUyxnQkFBZ0I7WUFDekQsTUFBTUMsUUFBUSxDQUFDLGNBQWMsRUFBRUQsY0FBYyxxQkFBcUIsRUFBRXBKLFFBQVE7WUFDNUVoTSxRQUFRQyxHQUFHLENBQUNvVjtZQUNaLE1BQU0sSUFBSTFNLE1BQU0wTTtRQUNwQjtJQUNKO0FBQ0o7QUFDd0I7Ozs7Ozs7Ozs7Ozs7Ozs7QUNieEI7O0lBRUksR0FDSixNQUFNeGE7SUFDRjlCLGVBQTZCO0lBQzdCdWMsU0FBbUI7SUFDbkJDLG1CQUE2QjtJQUU3QixZQUFZeGMsY0FBNkIsQ0FBRTtRQUN2QyxJQUFJLENBQUNBLGNBQWMsR0FBR0E7UUFDdEIsSUFBSSxDQUFDdWMsUUFBUSxHQUFHdmMsZUFBZUMsY0FBYyxDQUFDMEgsS0FBSyxDQUFDO1FBQ3BELElBQUksQ0FBQzZVLGtCQUFrQixHQUFHeGMsZUFBZUMsY0FBYyxDQUFDeUcsV0FBVyxHQUFHaUIsS0FBSyxDQUFDO0lBQ2hGO0lBRUE7OztJQUdBLEdBQ0EwRCwwQkFBa0M7UUFDOUIsT0FBTyxJQUFJLENBQUNyTCxjQUFjLENBQUNDLGNBQWM7SUFDN0M7SUFFQTs7OztJQUlBLEdBQ0F5SixjQUFjL0UsSUFBbUIsRUFBaUI7UUFDOUMsSUFBSUEsU0FBUyxNQUFNO1lBQ2YsT0FBTztRQUNYO1FBQ0MsT0FBTyxJQUFJLENBQUM2WCxrQkFBa0IsQ0FBQ3ZTLFFBQVEsQ0FBQ3RGLEtBQUsrQixXQUFXLE1BQU0vQixPQUFPO0lBQzFFO0lBRUE7Ozs7SUFJQSxHQUNEd0csWUFBWTFCLE9BQXNCLEVBQVc7UUFDekMsSUFBSUEsWUFBWSxNQUFNO1lBQ2xCLE9BQU87UUFDWDtRQUNBLE1BQU1pTCxRQUFRLElBQUksQ0FBQzhILGtCQUFrQixDQUFDQyxPQUFPLENBQUNoVCxRQUFRL0MsV0FBVztRQUNqRSxJQUFJZ08sVUFBVSxDQUFDLEdBQUc7WUFDZCxPQUFPLElBQUksQ0FBQzZILFFBQVEsQ0FBQzdILE1BQU07UUFDL0I7UUFDQSxPQUFPO0lBQ1g7QUFFSDtBQUV5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdER6Qjs7Ozs7Q0FLQyxHQUNELFNBQVNMLHVCQUF1QnpHLEdBQVcsRUFBRThPLEdBQVc7SUFDcEQsSUFBSUMsWUFBWTtJQUNoQkQsT0FBTztJQUNQLE1BQU9BLE1BQU0sRUFBRztRQUNaQSxPQUFPO1FBQ1AsTUFBTUUsU0FBU0YsTUFBTTtRQUNyQixNQUFNRyxZQUFZaEksT0FBT2lJLFlBQVksQ0FBQyxJQUFJQyxVQUFVLENBQUMsS0FBS0g7UUFDMURELFlBQVlFLFlBQVlGO1FBQ3hCRCxNQUFNekcsS0FBS3lELEtBQUssQ0FBQ2dELE1BQU07SUFDM0I7SUFDQSxPQUFPQyxZQUFZLENBQUMvTyxNQUFNLEdBQUdrQixRQUFRO0FBQ3pDO0FBRUE7Ozs7O0NBS0MsR0FDRCxTQUFTa08saUJBQWlCQyxXQUFtQjtJQUN6QyxNQUFNQyxRQUFRLElBQUlDLE9BQU87SUFDekIsTUFBTUMsUUFBUUYsTUFBTUcsSUFBSSxDQUFDSjtJQUN6QixJQUFJRyxTQUFTLE1BQU07UUFDZixNQUFNLElBQUl4TixNQUFNO0lBQ3BCO0lBQ0EsTUFBTThNLE1BQU1oYixtQkFBbUIwYixLQUFLLENBQUMsRUFBRTtJQUN2QyxNQUFNRSxVQUFVeEksT0FBT3NJLEtBQUssQ0FBQyxFQUFFO0lBQy9CLElBQUlFLFVBQVUsR0FBRztRQUNiLE1BQU0sSUFBSTFOLE1BQU07SUFDcEI7SUFDQSxPQUFPO1FBQUMwTixVQUFVO1FBQUdaO0tBQUk7QUFDN0I7QUFFQTs7Ozs7Q0FLQyxHQUNELFNBQVNwRyx3QkFBd0IyRyxXQUFtQixFQUFFakosS0FBYztJQUNoRSxNQUFNLENBQUNwRyxLQUFLOE8sSUFBSSxHQUFHTSxpQkFBaUJDO0lBQ3BDLElBQUlyUCxPQUFPb0csTUFBTXJRLE1BQU0sRUFBRTtRQUNyQixPQUFPMkM7SUFDWDtJQUNBLE9BQU8wTixLQUFLLENBQUNwRyxJQUFJLENBQUM4TyxJQUFJO0FBQzFCO0FBRUE7Ozs7Q0FJQyxHQUNELFNBQVNoYixtQkFBbUI2YixPQUFlO0lBQ3ZDLE1BQU1DLGVBQWVELFFBQVE3VyxXQUFXO0lBQ3hDLElBQUlpQyxTQUFpQjtJQUNyQixJQUFLLElBQUk4VSxJQUFJLEdBQUdBLElBQUlELGFBQWE3WixNQUFNLEVBQUU4WixJQUFLO1FBQzFDLE1BQU1DLGlCQUNGRixhQUFhVCxVQUFVLENBQUNVLEtBQUssSUFBSVYsVUFBVSxDQUFDLEtBQUs7UUFDckRwVSxTQUFTK1UsaUJBQWlCL1UsU0FBUztJQUN2QztJQUNBLE9BQU9BLFNBQVM7QUFDcEI7QUFFQTs7Ozs7OztDQU9DLEdBQ0QsU0FBUzJMLG1CQUFtQnFKLEtBQVU7SUFDbEMsSUFBSUEsVUFBVSxNQUFNLE9BQU87SUFDM0IsT0FBTyxPQUFPQSxVQUFVLFlBQVlBLE1BQU14TCxXQUFXLE9BQU87QUFDaEU7QUFFQTs7OztDQUlDLEdBQ0QsU0FBU3hRLHNCQUFzQjBFLE1BQXVCO0lBQ2xELElBQUl1WCxhQUFhdlgsT0FBT3lJLFFBQVE7SUFDaEM4TyxhQUFhQSxXQUFXaFgsT0FBTyxDQUFDLGFBQWE7SUFDN0MsSUFBSWlYLHVCQUErQjtJQUNuQyxNQUFPQSx3QkFBd0JELFdBQVk7UUFDdkMsNEZBQTRGO1FBQzVGQyx1QkFBdUJEO1FBQ3ZCQSxhQUFhQSxXQUFXaFgsT0FBTyxDQUFDLHNCQUFzQjtJQUMxRDtJQUNBLE1BQU0rQixTQUFTa00sT0FBT2lKLFNBQVNGLGFBQWE1QyxRQUFRLENBQUMsSUFBSTtJQUN6RCxJQUFJclMsT0FBT2hGLE1BQU0sSUFBSSxNQUFNZ0YsTUFBTSxDQUFDLEVBQUUsSUFBSSxLQUFLO1FBQ3pDLE9BQU9BLE9BQU92RSxTQUFTLENBQUM7SUFDNUI7SUFDQSxPQUFPdUU7QUFDWDtBQVNFOzs7Ozs7Ozs7Ozs7QUM5R0YsdUM7Ozs7Ozs7Ozs7O0FDQUEsb0Q7Ozs7Ozs7Ozs7O0FDQUEsK0I7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDNUJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBLEU7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsMkNBQTJDLDBDQUEwQztXQUNyRixNQUFNO1dBQ04sMkNBQTJDLGdDQUFnQztXQUMzRTtXQUNBLEtBQUsseUJBQXlCO1dBQzlCO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSwwQ0FBMEMsd0NBQXdDO1dBQ2xGO1dBQ0E7V0FDQTtXQUNBLEU7Ozs7O1dDdEJBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOK0M7QUFPWTtBQUczRCxNQUFNb1Ysd0JBQXdCO0FBRTlCOzs7OztDQUtDLEdBQ00sTUFBTUMsVUFHVCxlQUNBOVgsT0FBb0MsRUFDcENDLEtBQXdDLEVBQ3hDOFgsUUFBNEI7SUFFNUIsTUFBTUQsVUFBVSxJQUFJM1osc0RBQVlBLENBQUM2QixTQUFTQztJQUMxQyxJQUFJa0M7SUFDSixJQUFJVSxZQUFvQjtJQUN4QixJQUFJO1FBQ0EsTUFBTW1WLG1CQUFtQixNQUFNRixRQUFRdFYsTUFBTTtRQUM3Q0wsVUFDSTZWLGlCQUFpQnJWLFFBQVEsSUFDekI7UUFDSkUsWUFBWW1WLGlCQUFpQm5WLFNBQVMsSUFBSTtJQUM5QyxFQUFFLE9BQU8vQixHQUFHO1FBQ1JDLFFBQVFDLEdBQUcsQ0FBQztRQUNaLElBQUk7WUFDQUQsUUFBUUMsR0FBRyxDQUFDNlAsS0FBS0MsU0FBUyxDQUFDaFE7UUFDL0IsRUFBRSxPQUFNO1lBQ0pDLFFBQVFDLEdBQUcsQ0FBQ0Y7UUFDaEI7UUFDQXFCLFVBQVU7UUFDVixJQUFJckIsYUFBYTRJLE9BQU87WUFDcEJ2SCxXQUFXLE9BQU9yQixFQUFFcUIsT0FBTztZQUMzQnBCLFFBQVFDLEdBQUcsQ0FBQyxTQUFTRixFQUFFbVgsS0FBSztZQUM1QmxYLFFBQVFDLEdBQUcsQ0FBQyxTQUFTRixFQUFFdUMsSUFBSTtZQUMzQnRDLFFBQVFDLEdBQUcsQ0FBQyxTQUFTRixFQUFFcUIsT0FBTztRQUNsQztJQUNKO0lBRUEsTUFBTVEsV0FBVyxJQUFJdVYsT0FBT0MsUUFBUTtJQUNwQyxNQUFNQyxRQUFRLElBQUlGLE9BQU9FLEtBQUssQ0FBQ0MsaUJBQWlCO0lBRWhERCxNQUFNalcsT0FBTyxDQUFDQTtJQUVkUSxRQUNJLGlEQUFpRDtLQUNoRDJWLE9BQU8sQ0FBQ0YsTUFBTXhQLFFBQVEsR0FDdkIsNERBQTREO0tBQzNEMlAsWUFBWSxDQUFDLGdCQUFnQixZQUM3QkMsU0FBUyxDQUFDWCx1QkFBdUJoVjtJQUV0QyxPQUFPa1YsU0FBUyxNQUFNcFY7QUFDMUIsRUFBRSIsInNvdXJjZXMiOlsiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9ub2RlX21vZHVsZXMvQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlcy9pbmRleC5qcyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL2Vudi9oYW5kbGVyX2NvbmZpZy50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL2hhbmRsZXJzL2J2bnNwX2hhbmRsZXIudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9zaGVldHMvZ3Vlc3RfcGFzc19zaGVldC50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3NoZWV0cy9sb2dpbl9zaGVldC50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3NoZWV0cy9zZWFzb25fc2hlZXQudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91c2VyLWNyZWRzLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvY2hlY2tpbl92YWx1ZXMudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91dGlscy9kYXRldGltZV91dGlsLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvZmlsZV91dGlscy50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3V0aWxzL2dvb2dsZV9zaGVldHNfc3ByZWFkc2hlZXRfdGFiLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvZ3Vlc3RfcGFzc2VzLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvc2NvcGVfdXRpbC50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3V0aWxzL3NlY3Rpb25fdmFsdWVzLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvdXRpbC50cyIsImV4dGVybmFsIGNvbW1vbmpzIFwiZ29vZ2xlYXBpc1wiIiwiZXh0ZXJuYWwgY29tbW9uanMgXCJzbXMtc2VnbWVudHMtY2FsY3VsYXRvclwiIiwiZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImZzXCIiLCJ3ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9oYW5kbGVycy9oYW5kbGVyLnByb3RlY3RlZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJbnRlbnRpb25hbGx5IGxlZnQgZW1wdHlcbiIsImltcG9ydCB7IENoZWNraW5WYWx1ZSB9IGZyb20gXCIuLi91dGlscy9jaGVja2luX3ZhbHVlc1wiO1xuXG4vKipcbiAqIEVudmlyb25tZW50IGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBoYW5kbGVyLlxuICogPHA+XG4gKiBOb3RlOiBUaGVzZSBhcmUgdGhlIG9ubHkgc2VjcmV0IHZhbHVlcyB3ZSBuZWVkIHRvIHJlYWQuIFJlc3QgY2FuIGJlIGRlcGxveWVkLlxuICogQHR5cGVkZWYge09iamVjdH0gSGFuZGxlckVudmlyb25tZW50XG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0NSSVBUX0lEIC0gVGhlIElEIG9mIHRoZSBHb29nbGUgQXBwcyBTY3JpcHQgcHJvamVjdC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTWU5DX1NJRCAtIFRoZSBTSUQgb2YgdGhlIFR3aWxpbyBTeW5jIHNlcnZpY2UuXG4gKi9cbnR5cGUgSGFuZGxlckVudmlyb25tZW50ID0ge1xuICAgIFNIRUVUX0lEOiBzdHJpbmc7XG4gICAgU0NSSVBUX0lEOiBzdHJpbmc7XG4gICAgU1lOQ19TSUQ6IHN0cmluZztcbn07XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgdXNlciBjcmVkZW50aWFscy5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IFVzZXJDcmVkc0NvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsfSBOU1BfRU1BSUxfRE9NQUlOIC0gVGhlIGVtYWlsIGRvbWFpbiBmb3IgTlNQLlxuICovXG50eXBlIFVzZXJDcmVkc0NvbmZpZyA9IHtcbiAgICBOU1BfRU1BSUxfRE9NQUlOOiBzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsO1xufTtcbmNvbnN0IHVzZXJfY3JlZHNfY29uZmlnOiBVc2VyQ3JlZHNDb25maWcgPSB7XG4gICAgTlNQX0VNQUlMX0RPTUFJTjogXCJmYXJ3ZXN0Lm9yZ1wiLFxufTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciBmaW5kaW5nIGEgcGF0cm9sbGVyLlxuICogQHR5cGVkZWYge09iamVjdH0gRmluZFBhdHJvbGxlckNvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFNIRUVUX0lEIC0gVGhlIElEIG9mIHRoZSBHb29nbGUgU2hlZXRzIHNwcmVhZHNoZWV0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFBIT05FX05VTUJFUl9MT09LVVBfU0hFRVQgLSBUaGUgcmFuZ2UgZm9yIHBob25lIG51bWJlciBsb29rdXAuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gUEhPTkVfTlVNQkVSX05VTUJFUl9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBwaG9uZSBudW1iZXJzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFBIT05FX05VTUJFUl9OQU1FX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIG5hbWVzLlxuICovXG50eXBlIEZpbmRQYXRyb2xsZXJDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICBQSE9ORV9OVU1CRVJfTE9PS1VQX1NIRUVUOiBzdHJpbmc7XG4gICAgUEhPTkVfTlVNQkVSX05VTUJFUl9DT0xVTU46IHN0cmluZztcbiAgICBQSE9ORV9OVU1CRVJfTkFNRV9DT0xVTU46IHN0cmluZztcbn07XG5cbmNvbnN0IGZpbmRfcGF0cm9sbGVyX2NvbmZpZzogRmluZFBhdHJvbGxlckNvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogXCJ0ZXN0XCIsXG4gICAgUEhPTkVfTlVNQkVSX0xPT0tVUF9TSEVFVDogXCJQaG9uZSBOdW1iZXJzIUEyOkIxMDBcIixcbiAgICBQSE9ORV9OVU1CRVJfTkFNRV9DT0xVTU46IFwiQVwiLFxuICAgIFBIT05FX05VTUJFUl9OVU1CRVJfQ09MVU1OOiBcIkJcIixcbn07XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgdGhlIGxvZ2luIHNoZWV0LlxuICogQHR5cGVkZWYge09iamVjdH0gTG9naW5TaGVldENvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFNIRUVUX0lEIC0gVGhlIElEIG9mIHRoZSBHb29nbGUgU2hlZXRzIHNwcmVhZHNoZWV0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IExPR0lOX1NIRUVUX0xPT0tVUCAtIFRoZSByYW5nZSBmb3IgbG9naW4gc2hlZXQgbG9va3VwLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IENIRUNLSU5fQ09VTlRfTE9PS1VQIC0gVGhlIHJhbmdlIGZvciBjaGVjay1pbiBjb3VudCBsb29rdXAuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQVJDSElWRURfQ0VMTCAtIFRoZSBjZWxsIGZvciBhcmNoaXZlZCBkYXRhLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNIRUVUX0RBVEVfQ0VMTCAtIFRoZSBjZWxsIGZvciB0aGUgc2hlZXQgZGF0ZS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDVVJSRU5UX0RBVEVfQ0VMTCAtIFRoZSBjZWxsIGZvciB0aGUgY3VycmVudCBkYXRlLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IE5BTUVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgbmFtZXMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQ0FURUdPUllfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgY2F0ZWdvcmllcy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTRUNUSU9OX0RST1BET1dOX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIHNlY3Rpb24gZHJvcGRvd24uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBjaGVjay1pbiBkcm9wZG93bi5cbiAqL1xudHlwZSBMb2dpblNoZWV0Q29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBzdHJpbmc7XG4gICAgTE9HSU5fU0hFRVRfTE9PS1VQOiBzdHJpbmc7XG4gICAgQ0hFQ0tJTl9DT1VOVF9MT09LVVA6IHN0cmluZztcbiAgICBBUkNISVZFRF9DRUxMOiBzdHJpbmc7XG4gICAgU0hFRVRfREFURV9DRUxMOiBzdHJpbmc7XG4gICAgQ1VSUkVOVF9EQVRFX0NFTEw6IHN0cmluZztcbiAgICBOQU1FX0NPTFVNTjogc3RyaW5nO1xuICAgIENBVEVHT1JZX0NPTFVNTjogc3RyaW5nO1xuICAgIFNFQ1RJT05fRFJPUERPV05fQ09MVU1OOiBzdHJpbmc7XG4gICAgQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU46IHN0cmluZztcbn07XG5cbmNvbnN0IGxvZ2luX3NoZWV0X2NvbmZpZzogTG9naW5TaGVldENvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogXCJ0ZXN0XCIsXG4gICAgTE9HSU5fU0hFRVRfTE9PS1VQOiBcIkxvZ2luIUExOkkxMDBcIixcbiAgICBDSEVDS0lOX0NPVU5UX0xPT0tVUDogXCJUb29scyFHMjpHMlwiLFxuICAgIFNIRUVUX0RBVEVfQ0VMTDogXCJCMVwiLFxuICAgIENVUlJFTlRfREFURV9DRUxMOiBcIkIyXCIsXG4gICAgQVJDSElWRURfQ0VMTDogXCJIMVwiLFxuICAgIE5BTUVfQ09MVU1OOiBcIkFcIixcbiAgICBDQVRFR09SWV9DT0xVTU46IFwiQlwiLFxuICAgIFNFQ1RJT05fRFJPUERPV05fQ09MVU1OOiBcIkhcIixcbiAgICBDSEVDS0lOX0RST1BET1dOX0NPTFVNTjogXCJJXCIsXG59O1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIHRoZSBzZWFzb24gc2hlZXQuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBTZWFzb25TaGVldENvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFNIRUVUX0lEIC0gVGhlIElEIG9mIHRoZSBHb29nbGUgU2hlZXRzIHNwcmVhZHNoZWV0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNFQVNPTl9TSEVFVCAtIFRoZSBuYW1lIG9mIHRoZSBzZWFzb24gc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0VBU09OX1NIRUVUX0RBWVNfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3Igc2Vhc29uIHNoZWV0IGRheXMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0VBU09OX1NIRUVUX05BTUVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3Igc2Vhc29uIHNoZWV0IG5hbWVzLlxuICovXG50eXBlIFNlYXNvblNoZWV0Q29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBzdHJpbmc7XG4gICAgU0VBU09OX1NIRUVUOiBzdHJpbmc7XG4gICAgU0VBU09OX1NIRUVUX0RBWVNfQ09MVU1OOiBzdHJpbmc7XG4gICAgU0VBU09OX1NIRUVUX05BTUVfQ09MVU1OOiBzdHJpbmc7XG59O1xuY29uc3Qgc2Vhc29uX3NoZWV0X2NvbmZpZzogU2Vhc29uU2hlZXRDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IFwidGVzdFwiLFxuICAgIFNFQVNPTl9TSEVFVDogXCJTZWFzb25cIixcbiAgICBTRUFTT05fU0hFRVRfTkFNRV9DT0xVTU46IFwiQlwiLFxuICAgIFNFQVNPTl9TSEVFVF9EQVlTX0NPTFVNTjogXCJBXCIsXG59O1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIHNlY3Rpb25zLlxuICogQHR5cGVkZWYge09iamVjdH0gU2VjdGlvbkNvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFNFQ1RJT05fVkFMVUVTIC0gVGhlIHNlY3Rpb24gdmFsdWVzLlxuICovXG50eXBlIFNlY3Rpb25Db25maWcgPSB7XG4gICAgU0VDVElPTl9WQUxVRVM6IHN0cmluZztcbn07XG5jb25zdCBzZWN0aW9uX2NvbmZpZzogU2VjdGlvbkNvbmZpZyA9IHtcbiAgICBTRUNUSU9OX1ZBTFVFUzogIFwiMSwyLDMsNCxSb3ZpbmcsRkFSLFRyYWluaW5nXCIsXG59O1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIGd1ZXN0IHBhc3Nlcy5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IEd1ZXN0UGFzc2VzQ29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gR1VFU1RfUEFTU19TSEVFVCAtIFRoZSBuYW1lIG9mIHRoZSBndWVzdCBwYXNzIHNoZWV0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IEdVRVNUX1BBU1NfRUxJR0lCTEVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgZ3Vlc3QgcGFzcyAgZWxpZ2liaWxpdHkgY2hlY2tib3ggKFRSVUUvRkFMU0UpLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IEdVRVNUX1BBU1NfRUxJR0lCTEVfUkVBU09OX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIHRoZSBpbmVsaWdpYmlsaXR5IHJlYXNvbiBzdHJpbmcuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gR1VFU1RfUEFTU19TSEVFVF9BVkFJTEFCTEVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgYXZhaWxhYmxlIHBhc3MgY291bnQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gR1VFU1RfUEFTU19TSEVFVF9VU0VEX1RPREFZX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIHBhc3NlcyB1c2VkIHRvZGF5LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IEdVRVNUX1BBU1NfU0hFRVRfVVNFRF9TRUFTT05fQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgcGFzc2VzIHVzZWQgdGhpcyBzZWFzb24uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gR1VFU1RfUEFTU19TSEVFVF9EQVRFU19TVEFSVElOR19DT0xVTU4gLSBUaGUgY29sdW1uIHdoZXJlIGRhdGUtb2YtdXNlIGVudHJpZXMgYmVnaW4uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gR1VFU1RfUEFTU19TSEVFVF9OQU1FX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIHBhdHJvbGxlciBuYW1lcy5cbiAqL1xudHlwZSBHdWVzdFBhc3Nlc0NvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogc3RyaW5nO1xuICAgIEdVRVNUX1BBU1NfU0hFRVQ6IHN0cmluZztcbiAgICBHVUVTVF9QQVNTX0VMSUdJQkxFX0NPTFVNTjogc3RyaW5nO1xuICAgIEdVRVNUX1BBU1NfRUxJR0lCTEVfUkVBU09OX0NPTFVNTjogc3RyaW5nO1xuICAgIEdVRVNUX1BBU1NfU0hFRVRfQVZBSUxBQkxFX0NPTFVNTjogc3RyaW5nO1xuICAgIEdVRVNUX1BBU1NfU0hFRVRfVVNFRF9UT0RBWV9DT0xVTU46IHN0cmluZztcbiAgICBHVUVTVF9QQVNTX1NIRUVUX1VTRURfU0VBU09OX0NPTFVNTjogc3RyaW5nO1xuICAgIEdVRVNUX1BBU1NfU0hFRVRfREFURVNfU1RBUlRJTkdfQ09MVU1OOiBzdHJpbmc7XG4gICAgR1VFU1RfUEFTU19TSEVFVF9OQU1FX0NPTFVNTjogc3RyaW5nO1xufTtcbmNvbnN0IGd1ZXN0X3Bhc3Nlc19jb25maWc6IEd1ZXN0UGFzc2VzQ29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBcInRlc3RcIixcbiAgICBHVUVTVF9QQVNTX1NIRUVUOiBcIkd1ZXN0UGFzc2VzXCIsXG4gICAgR1VFU1RfUEFTU19FTElHSUJMRV9DT0xVTU46IFwiQlwiLFxuICAgIEdVRVNUX1BBU1NfRUxJR0lCTEVfUkVBU09OX0NPTFVNTjogXCJDXCIsXG4gICAgR1VFU1RfUEFTU19TSEVFVF9OQU1FX0NPTFVNTjogXCJBXCIsXG4gICAgR1VFU1RfUEFTU19TSEVFVF9BVkFJTEFCTEVfQ09MVU1OOiBcIkRcIixcbiAgICBHVUVTVF9QQVNTX1NIRUVUX1VTRURfVE9EQVlfQ09MVU1OOiBcIkVcIixcbiAgICBHVUVTVF9QQVNTX1NIRUVUX1VTRURfU0VBU09OX0NPTFVNTjogXCJGXCIsXG4gICAgR1VFU1RfUEFTU19TSEVFVF9EQVRFU19TVEFSVElOR19DT0xVTU46IFwiR1wiLFxufTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciB0aGUgaGFuZGxlci5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IEhhbmRsZXJDb25maWdcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTQ1JJUFRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBBcHBzIFNjcmlwdCBwcm9qZWN0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNIRUVUX0lEIC0gVGhlIElEIG9mIHRoZSBHb29nbGUgU2hlZXRzIHNwcmVhZHNoZWV0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNZTkNfU0lEIC0gVGhlIFNJRCBvZiB0aGUgVHdpbGlvIFN5bmMgc2VydmljZS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBSRVNFVF9GVU5DVElPTl9OQU1FIC0gVGhlIG5hbWUgb2YgdGhlIHJlc2V0IGZ1bmN0aW9uLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IEFSQ0hJVkVfRlVOQ1RJT05fTkFNRSAtIFRoZSBuYW1lIG9mIHRoZSBhcmNoaXZlIGZ1bmN0aW9uLlxuICogQHByb3BlcnR5IHtib29sZWFufSBVU0VfU0VSVklDRV9BQ0NPVU5UIC0gV2hldGhlciB0byB1c2UgYSBzZXJ2aWNlIGFjY291bnQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQUNUSU9OX0xPR19TSEVFVCAtIFRoZSBuYW1lIG9mIHRoZSBhY3Rpb24gbG9nIHNoZWV0LlxuICogQHByb3BlcnR5IHtDaGVja2luVmFsdWVbXX0gQ0hFQ0tJTl9WQUxVRVMgLSBUaGUgY2hlY2staW4gdmFsdWVzLlxuICovXG50eXBlIEhhbmRsZXJDb25maWcgPSB7XG4gICAgU0NSSVBUX0lEOiBzdHJpbmc7XG4gICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICBTWU5DX1NJRDogc3RyaW5nO1xuICAgIFJFU0VUX0ZVTkNUSU9OX05BTUU6IHN0cmluZztcbiAgICBBUkNISVZFX0ZVTkNUSU9OX05BTUU6IHN0cmluZztcbiAgICBVU0VfU0VSVklDRV9BQ0NPVU5UOiBib29sZWFuO1xuICAgIEFDVElPTl9MT0dfU0hFRVQ6IHN0cmluZztcbiAgICBDSEVDS0lOX1ZBTFVFUzogQ2hlY2tpblZhbHVlW107XG59O1xuY29uc3QgaGFuZGxlcl9jb25maWc6IEhhbmRsZXJDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IFwidGVzdFwiLFxuICAgIFNDUklQVF9JRDogXCJ0ZXN0XCIsXG4gICAgU1lOQ19TSUQ6IFwidGVzdFwiLFxuICAgIEFSQ0hJVkVfRlVOQ1RJT05fTkFNRTogXCJBcmNoaXZlXCIsXG4gICAgUkVTRVRfRlVOQ1RJT05fTkFNRTogXCJSZXNldFwiLFxuICAgIFVTRV9TRVJWSUNFX0FDQ09VTlQ6IHRydWUsXG4gICAgQUNUSU9OX0xPR19TSEVFVDogXCJCb3RfVXNhZ2VcIixcbiAgICBDSEVDS0lOX1ZBTFVFUzogW1xuICAgICAgICBuZXcgQ2hlY2tpblZhbHVlKFwiZGF5XCIsIFwiQWxsIERheVwiLCBcImFsbCBkYXkvREFZXCIsIFtcImNoZWNraW4tZGF5XCJdKSxcbiAgICAgICAgbmV3IENoZWNraW5WYWx1ZShcImFtXCIsIFwiSGFsZiBBTVwiLCBcIm1vcm5pbmcvQU1cIiwgW1wiY2hlY2tpbi1hbVwiXSksXG4gICAgICAgIG5ldyBDaGVja2luVmFsdWUoXCJwbVwiLCBcIkhhbGYgUE1cIiwgXCJhZnRlcm5vb24vUE1cIiwgW1wiY2hlY2tpbi1wbVwiXSksXG4gICAgICAgIG5ldyBDaGVja2luVmFsdWUoXCJvdXRcIiwgXCJDaGVja2VkIE91dFwiLCBcImNoZWNrIG91dC9PVVRcIiwgW1wiY2hlY2tvdXRcIiwgXCJjaGVjay1vdXRcIl0pLFxuICAgIF0sXG59O1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIHBhdHJvbGxlciByb3dzLlxuICogQHR5cGVkZWYge09iamVjdH0gUGF0cm9sbGVyUm93Q29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gTkFNRV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBuYW1lcy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDQVRFR09SWV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBjYXRlZ29yaWVzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNFQ1RJT05fRFJPUERPV05fQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3Igc2VjdGlvbiBkcm9wZG93bi5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDSEVDS0lOX0RST1BET1dOX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIGNoZWNrLWluIGRyb3Bkb3duLlxuICovXG50eXBlIFBhdHJvbGxlclJvd0NvbmZpZyA9IHtcbiAgICBOQU1FX0NPTFVNTjogc3RyaW5nO1xuICAgIENBVEVHT1JZX0NPTFVNTjogc3RyaW5nO1xuICAgIFNFQ1RJT05fRFJPUERPV05fQ09MVU1OOiBzdHJpbmc7XG4gICAgQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU46IHN0cmluZztcbn07XG5cbi8qKlxuICogQ29tYmluZWQgY29uZmlndXJhdGlvbiB0eXBlLlxuICogQHR5cGVkZWYge0hhbmRsZXJFbnZpcm9ubWVudCAmIFVzZXJDcmVkc0NvbmZpZyAmIEZpbmRQYXRyb2xsZXJDb25maWcgJiBMb2dpblNoZWV0Q29uZmlnICYgU2Vhc29uU2hlZXRDb25maWcgJiBTZWN0aW9uQ29uZmlnICYgR3Vlc3RQYXNzZXNDb25maWcgJiBIYW5kbGVyQ29uZmlnICYgUGF0cm9sbGVyUm93Q29uZmlnfSBDb21iaW5lZENvbmZpZ1xuICovXG50eXBlIENvbWJpbmVkQ29uZmlnID0gSGFuZGxlckVudmlyb25tZW50ICZcbiAgICBVc2VyQ3JlZHNDb25maWcgJlxuICAgIEZpbmRQYXRyb2xsZXJDb25maWcgJlxuICAgIExvZ2luU2hlZXRDb25maWcgJlxuICAgIFNlYXNvblNoZWV0Q29uZmlnICZcbiAgICBTZWN0aW9uQ29uZmlnICZcbiAgICBHdWVzdFBhc3Nlc0NvbmZpZyAmXG4gICAgSGFuZGxlckNvbmZpZyAmXG4gICAgUGF0cm9sbGVyUm93Q29uZmlnO1xuXG5jb25zdCBDT05GSUc6IENvbWJpbmVkQ29uZmlnID0ge1xuICAgIC4uLmhhbmRsZXJfY29uZmlnLFxuICAgIC4uLmZpbmRfcGF0cm9sbGVyX2NvbmZpZyxcbiAgICAuLi5sb2dpbl9zaGVldF9jb25maWcsXG4gICAgLi4uZ3Vlc3RfcGFzc2VzX2NvbmZpZyxcbiAgICAuLi5zZWFzb25fc2hlZXRfY29uZmlnLFxuICAgIC4uLnVzZXJfY3JlZHNfY29uZmlnLFxuICAgIC4uLnNlY3Rpb25fY29uZmlnLFxufTtcblxuZXhwb3J0IHtcbiAgICBDT05GSUcsXG4gICAgQ29tYmluZWRDb25maWcsXG4gICAgU2VjdGlvbkNvbmZpZyxcbiAgICBHdWVzdFBhc3Nlc0NvbmZpZyxcbiAgICBGaW5kUGF0cm9sbGVyQ29uZmlnLFxuICAgIEhhbmRsZXJDb25maWcsXG4gICAgSGFuZGxlckVudmlyb25tZW50LFxuICAgIFVzZXJDcmVkc0NvbmZpZyxcbiAgICBMb2dpblNoZWV0Q29uZmlnLFxuICAgIFNlYXNvblNoZWV0Q29uZmlnLFxuICAgIFBhdHJvbGxlclJvd0NvbmZpZyxcbn07IiwiaW1wb3J0IFwiQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlc1wiO1xuaW1wb3J0IHtcbiAgICBDb250ZXh0LFxuICAgIFNlcnZlcmxlc3NFdmVudE9iamVjdCxcbiAgICBTZXJ2aWNlQ29udGV4dCxcbiAgICBUd2lsaW9DbGllbnQsXG59IGZyb20gXCJAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzL3R5cGVzXCI7XG5pbXBvcnQge2dvb2dsZSwgc2NyaXB0X3YxLCBzaGVldHNfdjR9IGZyb20gXCJnb29nbGVhcGlzXCI7XG5pbXBvcnQge0dvb2dsZUF1dGh9IGZyb20gXCJnb29nbGVhcGlzLWNvbW1vblwiO1xuaW1wb3J0IHtcbiAgICBDb21iaW5lZENvbmZpZyxcbiAgICBDT05GSUcsXG4gICAgRmluZFBhdHJvbGxlckNvbmZpZyxcbiAgICBHdWVzdFBhc3Nlc0NvbmZpZyxcbiAgICBIYW5kbGVyQ29uZmlnLFxuICAgIEhhbmRsZXJFbnZpcm9ubWVudCxcbiAgICBMb2dpblNoZWV0Q29uZmlnLFxuICAgIFNlYXNvblNoZWV0Q29uZmlnLFxufSBmcm9tIFwiLi4vZW52L2hhbmRsZXJfY29uZmlnXCI7XG5pbXBvcnQgTG9naW5TaGVldCwge1BhdHJvbGxlclJvd30gZnJvbSBcIi4uL3NoZWV0cy9sb2dpbl9zaGVldFwiO1xuaW1wb3J0IFNlYXNvblNoZWV0IGZyb20gXCIuLi9zaGVldHMvc2Vhc29uX3NoZWV0XCI7XG5pbXBvcnQge1VzZXJDcmVkc30gZnJvbSBcIi4uL3VzZXItY3JlZHNcIjtcbmltcG9ydCB7Q2hlY2tpblZhbHVlc30gZnJvbSBcIi4uL3V0aWxzL2NoZWNraW5fdmFsdWVzXCI7XG5pbXBvcnQge2dldF9zZXJ2aWNlX2NyZWRlbnRpYWxzX3BhdGh9IGZyb20gXCIuLi91dGlscy9maWxlX3V0aWxzXCI7XG5pbXBvcnQge2V4Y2VsX3Jvd190b19pbmRleCwgc2FuaXRpemVfcGhvbmVfbnVtYmVyfSBmcm9tIFwiLi4vdXRpbHMvdXRpbFwiO1xuaW1wb3J0IHtidWlsZF9wYXNzZXNfc3RyaW5nLH0gZnJvbSBcIi4uL3V0aWxzL2d1ZXN0X3Bhc3Nlc1wiO1xuaW1wb3J0IHtHdWVzdFBhc3NTaGVldH0gZnJvbSBcIi4uL3NoZWV0cy9ndWVzdF9wYXNzX3NoZWV0XCI7XG5pbXBvcnQge1NlY3Rpb25WYWx1ZXN9IGZyb20gJy4uL3V0aWxzL3NlY3Rpb25fdmFsdWVzJztcblxuZXhwb3J0IHR5cGUgQlZOU1BSZXNwb25zZSA9IHtcbiAgICByZXNwb25zZT86IHN0cmluZztcbiAgICBuZXh0X3N0ZXA/OiBzdHJpbmc7XG59O1xuZXhwb3J0IHR5cGUgQlZOU1BFdmVudCA9IFNlcnZlcmxlc3NFdmVudE9iamVjdDxcbiAgICB7XG4gICAgICAgIEZyb206IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAgICAgVG86IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAgICAgbnVtYmVyOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgICAgIHRlc3RfbnVtYmVyOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgICAgIEJvZHk6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICB9LFxuICAgIHt9LFxuICAgIHtcbiAgICAgICAgYnZuc3BfbmV4dF9zdGVwOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgfVxuPjtcblxuZXhwb3J0IGNvbnN0IE5FWFRfU1RFUFMgPSB7XG4gICAgQVdBSVRfQ09NTUFORDogXCJhd2FpdC1jb21tYW5kXCIsXG4gICAgQVdBSVRfQ0hFQ0tJTjogXCJhd2FpdC1jaGVja2luXCIsXG4gICAgQ09ORklSTV9SRVNFVDogXCJjb25maXJtLXJlc2V0XCIsXG4gICAgQVVUSF9SRVNFVDogXCJhdXRoLXJlc2V0XCIsXG4gICAgQVdBSVRfU0VDVElPTjogXCJhd2FpdC1zZWN0aW9uXCIsXG4gICAgQVdBSVRfUEFTUzogXCJhd2FpdC1wYXNzXCIsXG4gICAgQVdBSVRfTUVTU0FHRTogXCJhd2FpdC1tZXNzYWdlXCIsXG4gICAgQVdBSVRfQlJPQURDQVNUOiBcImF3YWl0LWJyb2FkY2FzdFwiLFxufTtcblxuY29uc3QgQ09NTUFORFMgPSB7XG4gICAgT05fRFVUWTogW1wib25kdXR5XCIsIFwib24tZHV0eVwiXSxcbiAgICBTVEFUVVM6IFtcInN0YXR1c1wiXSxcbiAgICBDSEVDS0lOOiBbXCJjaGVja2luXCIsIFwiY2hlY2staW5cIl0sXG4gICAgU0VDVElPTl9BU1NJR05NRU5UOiBbXCJzZWN0aW9uXCIsIFwic2VjdGlvbi1hc3NpZ25tZW50XCIsIFwic2VjdGlvbmFzc2lnbm1lbnRcIiwgXCJhc3NpZ25tZW50XCJdLFxuICAgIEdVRVNUX1BBU1M6IFtcImd1ZXN0LXBhc3NcIiwgXCJndWVzdHBhc3NcIiwgXCJndWVzdFwiXSxcbiAgICBXSEFUU0FQUDogW1wid2hhdHNhcHBcIl0sXG4gICAgTUVTU0FHRTogW1wibWVzc2FnZVwiLCBcIm1zZ1wiXSxcbiAgICBCUk9BRENBU1Q6IFtcImJyb2FkY2FzdFwiXSxcbn07XG5cbmV4cG9ydCBjb25zdCBTTVNfTUFYX0xFTkdUSCA9IDE2MDtcbmV4cG9ydCBjb25zdCBNRVNTQUdFX1BSRUZJWF9URU1QTEFURSA9IFwiTWVzc2FnZSBmcm9tIFwiO1xuZXhwb3J0IGNvbnN0IE1FU1NBR0VfUFJFRklYX1NVRkZJWCA9IFwiOiBcIjtcblxuLyoqXG4gKiBSZXN1bHQgb2YgdmFsaWRhdGluZyBhbiBTTVMgbWVzc2FnZSBmb3IgR1NNLTcgY29tcGF0aWJpbGl0eSBhbmQgc2VnbWVudCBjb3VudC5cbiAqL1xuZXhwb3J0IHR5cGUgU21zVmFsaWRhdGlvblJlc3VsdCA9IHtcbiAgICAvKiogV2hldGhlciB0aGUgbWVzc2FnZSBpcyB2YWxpZCAoR1NNLTcgb25seSBhbmQgZml0cyBpbiBhIHNpbmdsZSBzZWdtZW50KS4gKi9cbiAgICB2YWxpZDogYm9vbGVhbjtcbiAgICAvKiogSWYgaW52YWxpZCwgdGhlIHJlYXNvbjogJ25vbl9nc203JyBvciAndG9vX21hbnlfc2VnbWVudHMnLiAqL1xuICAgIHJlYXNvbj86IFwibm9uX2dzbTdcIiB8IFwidG9vX21hbnlfc2VnbWVudHNcIjtcbiAgICAvKiogVGhlIG5vbi1HU00tNyBjaGFyYWN0ZXJzIGZvdW5kLCBpZiBhbnkuICovXG4gICAgbm9uX2dzbV9jaGFyYWN0ZXJzPzogc3RyaW5nW107XG4gICAgLyoqIFRoZSBudW1iZXIgb2YgU01TIHNlZ21lbnRzIHRoZSBtZXNzYWdlIHdvdWxkIHJlcXVpcmUuICovXG4gICAgc2VnbWVudHNfY291bnQ/OiBudW1iZXI7XG59O1xuXG4vKipcbiAqIFZhbGlkYXRlcyB0aGF0IGEgY29tcGxldGUgU01TIG1lc3NhZ2UgKHByZWZpeCArIGJvZHkpIHVzZXMgb25seSBHU00tNyBjaGFyYWN0ZXJzXG4gKiBhbmQgZml0cyB3aXRoaW4gYSBzaW5nbGUgU01TIHNlZ21lbnQuXG4gKlxuICogVXNlcyB0aGUgc21zLXNlZ21lbnRzLWNhbGN1bGF0b3IgbGlicmFyeSAobWFpbnRhaW5lZCBieSBUd2lsaW9EZXZFZCkgd2hpY2hcbiAqIHByb3ZpZGVzIGF1dGhvcml0YXRpdmUgR1NNLTcgY2hhcmFjdGVyIGRldGVjdGlvbi5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZnVsbF9tZXNzYWdlIC0gVGhlIGNvbXBsZXRlIG1lc3NhZ2UgdG8gdmFsaWRhdGUgKHByZWZpeCArIHVzZXIgdGV4dCkuXG4gKiBAcmV0dXJucyB7U21zVmFsaWRhdGlvblJlc3VsdH0gVGhlIHZhbGlkYXRpb24gcmVzdWx0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVfc21zX21lc3NhZ2UoZnVsbF9tZXNzYWdlOiBzdHJpbmcpOiBTbXNWYWxpZGF0aW9uUmVzdWx0IHtcbiAgICBjb25zdCB7IFNlZ21lbnRlZE1lc3NhZ2UgfSA9IHJlcXVpcmUoXCJzbXMtc2VnbWVudHMtY2FsY3VsYXRvclwiKTtcbiAgICBjb25zdCBzZWdtZW50ZWQgPSBuZXcgU2VnbWVudGVkTWVzc2FnZShmdWxsX21lc3NhZ2UpO1xuICAgIGNvbnN0IG5vbl9nc20gPSBzZWdtZW50ZWQuZ2V0Tm9uR3NtQ2hhcmFjdGVycygpIGFzIHN0cmluZ1tdO1xuXG4gICAgaWYgKG5vbl9nc20ubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsaWQ6IGZhbHNlLFxuICAgICAgICAgICAgcmVhc29uOiBcIm5vbl9nc203XCIsXG4gICAgICAgICAgICBub25fZ3NtX2NoYXJhY3RlcnM6IFsuLi5uZXcgU2V0KG5vbl9nc20pXSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoc2VnbWVudGVkLnNlZ21lbnRzQ291bnQgPiAxKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWxpZDogZmFsc2UsXG4gICAgICAgICAgICByZWFzb246IFwidG9vX21hbnlfc2VnbWVudHNcIixcbiAgICAgICAgICAgIHNlZ21lbnRzX2NvdW50OiBzZWdtZW50ZWQuc2VnbWVudHNDb3VudCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4geyB2YWxpZDogdHJ1ZSB9O1xufVxuXG4vKipcbiAqIEZvcm1hdHMgYSAxMC1kaWdpdCBwaG9uZSBudW1iZXIgc3RyaW5nIGFzIChYWFgpWFhYLVhYWFggZm9yIGRpc3BsYXkuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGVuX2RpZ2l0cyAtIEEgMTAtZGlnaXQgcGhvbmUgbnVtYmVyIHN0cmluZyAoZS5nLiBcIjEyMzQ1Njc4OTBcIikuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHBob25lIG51bWJlciAoZS5nLiBcIigxMjMpNDU2LTc4OTBcIikuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRfcGhvbmVfZm9yX2Rpc3BsYXkodGVuX2RpZ2l0czogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCgke3Rlbl9kaWdpdHMuc3Vic3RyaW5nKDAsIDMpfSkke3Rlbl9kaWdpdHMuc3Vic3RyaW5nKDMsIDYpfS0ke3Rlbl9kaWdpdHMuc3Vic3RyaW5nKDYsIDEwKX1gO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCVk5TUEhhbmRsZXIge1xuICAgIFNDT1BFUzogc3RyaW5nW10gPSBbXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3NwcmVhZHNoZWV0c1wiXTtcblxuICAgIHNtc19yZXF1ZXN0OiBib29sZWFuO1xuICAgIHJlc3VsdF9tZXNzYWdlczogc3RyaW5nW10gPSBbXTtcbiAgICBmcm9tOiBzdHJpbmc7XG4gICAgdG86IHN0cmluZztcbiAgICBib2R5OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgYm9keV9yYXc6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBwYXRyb2xsZXI6IFBhdHJvbGxlclJvdyB8IG51bGw7XG4gICAgYnZuc3BfbmV4dF9zdGVwOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgY2hlY2tpbl9tb2RlOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgICBmYXN0X2NoZWNraW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBhc3NpZ25lZF9zZWN0aW9uOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAgIHR3aWxpb19jbGllbnQ6IFR3aWxpb0NsaWVudCB8IG51bGwgPSBudWxsO1xuICAgIHN5bmNfc2lkOiBzdHJpbmc7XG4gICAgcmVzZXRfc2NyaXB0X2lkOiBzdHJpbmc7XG5cbiAgICAvLyBDYWNoZSBjbGllbnRzXG4gICAgc3luY19jbGllbnQ6IFNlcnZpY2VDb250ZXh0IHwgbnVsbCA9IG51bGw7XG4gICAgdXNlcl9jcmVkczogVXNlckNyZWRzIHwgbnVsbCA9IG51bGw7XG4gICAgc2VydmljZV9jcmVkczogR29vZ2xlQXV0aCB8IG51bGwgPSBudWxsO1xuICAgIHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzIHwgbnVsbCA9IG51bGw7XG4gICAgdXNlcl9zY3JpcHRzX3NlcnZpY2U6IHNjcmlwdF92MS5TY3JpcHQgfCBudWxsID0gbnVsbDtcblxuICAgIGxvZ2luX3NoZWV0OiBMb2dpblNoZWV0IHwgbnVsbCA9IG51bGw7XG4gICAgc2Vhc29uX3NoZWV0OiBTZWFzb25TaGVldCB8IG51bGwgPSBudWxsO1xuICAgIGd1ZXN0X3Bhc3Nfc2hlZXQ6IEd1ZXN0UGFzc1NoZWV0IHwgbnVsbCA9IG51bGw7XG5cbiAgICBjaGVja2luX3ZhbHVlczogQ2hlY2tpblZhbHVlcztcbiAgICBjdXJyZW50X3NoZWV0X2RhdGU6IERhdGU7XG5cbiAgICBjb21iaW5lZF9jb25maWc6IENvbWJpbmVkQ29uZmlnO1xuICAgIGNvbmZpZzogSGFuZGxlckNvbmZpZztcblxuICAgIHNlY3Rpb25fdmFsdWVzOiBTZWN0aW9uVmFsdWVzO1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhIG5ldyBCVk5TUEhhbmRsZXIuXG4gICAgICogQHBhcmFtIHtDb250ZXh0PEhhbmRsZXJFbnZpcm9ubWVudD59IGNvbnRleHQgLSBUaGUgc2VydmVybGVzcyBmdW5jdGlvbiBjb250ZXh0LlxuICAgICAqIEBwYXJhbSB7U2VydmVybGVzc0V2ZW50T2JqZWN0PEJWTlNQRXZlbnQ+fSBldmVudCAtIFRoZSBldmVudCBvYmplY3QuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGNvbnRleHQ6IENvbnRleHQ8SGFuZGxlckVudmlyb25tZW50PixcbiAgICAgICAgZXZlbnQ6IFNlcnZlcmxlc3NFdmVudE9iamVjdDxCVk5TUEV2ZW50PlxuICAgICkge1xuICAgICAgICAvLyBEZXRlcm1pbmUgbWVzc2FnZSBkZXRhaWxzIGZyb20gdGhlIGluY29taW5nIGV2ZW50LCB3aXRoIGZhbGxiYWNrIHZhbHVlc1xuICAgICAgICB0aGlzLnNtc19yZXF1ZXN0ID0gKGV2ZW50LkZyb20gfHwgZXZlbnQubnVtYmVyKSAhPT0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmZyb20gPSBldmVudC5Gcm9tIHx8IGV2ZW50Lm51bWJlciB8fCBldmVudC50ZXN0X251bWJlciE7XG4gICAgICAgIHRoaXMudG8gPSBzYW5pdGl6ZV9waG9uZV9udW1iZXIoZXZlbnQuVG8hKTtcbiAgICAgICAgdGhpcy5ib2R5ID0gZXZlbnQuQm9keT8udG9Mb3dlckNhc2UoKT8udHJpbSgpLnJlcGxhY2UoL1xccysvLCBcIi1cIik7XG4gICAgICAgIHRoaXMuYm9keV9yYXcgPSBldmVudC5Cb2R5XG4gICAgICAgIHRoaXMuYnZuc3BfbmV4dF9zdGVwID1cbiAgICAgICAgICAgIGV2ZW50LnJlcXVlc3QuY29va2llcy5idm5zcF9uZXh0X3N0ZXA7XG4gICAgICAgIHRoaXMuY29tYmluZWRfY29uZmlnID0geyAuLi5DT05GSUcsIC4uLmNvbnRleHQgfTtcbiAgICAgICAgdGhpcy5jb25maWcgPSB0aGlzLmNvbWJpbmVkX2NvbmZpZztcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy50d2lsaW9fY2xpZW50ID0gY29udGV4dC5nZXRUd2lsaW9DbGllbnQoKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBpbml0aWFsaXppbmcgdHdpbGlvX2NsaWVudFwiLCBlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN5bmNfc2lkID0gY29udGV4dC5TWU5DX1NJRDtcbiAgICAgICAgdGhpcy5yZXNldF9zY3JpcHRfaWQgPSBjb250ZXh0LlNDUklQVF9JRDtcbiAgICAgICAgdGhpcy5wYXRyb2xsZXIgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuY2hlY2tpbl92YWx1ZXMgPSBuZXcgQ2hlY2tpblZhbHVlcyhDT05GSUcuQ0hFQ0tJTl9WQUxVRVMpO1xuICAgICAgICB0aGlzLmN1cnJlbnRfc2hlZXRfZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHRoaXMuc2VjdGlvbl92YWx1ZXMgPSBuZXcgU2VjdGlvblZhbHVlcyh0aGlzLmNvbWJpbmVkX2NvbmZpZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIHRoZSBmYXN0IGNoZWNrLWluIG1vZGUgZnJvbSB0aGUgbWVzc2FnZSBib2R5LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5IC0gVGhlIG1lc3NhZ2UgYm9keS5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBmYXN0IGNoZWNrLWluIG1vZGUgaXMgcGFyc2VkLCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICovXG4gICAgcGFyc2VfZmFzdF9jaGVja2luX21vZGUoYm9keTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHBhcnNlZCA9IHRoaXMuY2hlY2tpbl92YWx1ZXMucGFyc2VfZmFzdF9jaGVja2luKGJvZHkpO1xuICAgICAgICBpZiAocGFyc2VkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tpbl9tb2RlID0gcGFyc2VkLmtleTtcbiAgICAgICAgICAgIHRoaXMuZmFzdF9jaGVja2luID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZXMgdGhlIGNoZWNrLWluIG1vZGUgZnJvbSB0aGUgbWVzc2FnZSBib2R5LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5IC0gVGhlIG1lc3NhZ2UgYm9keS5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBjaGVjay1pbiBtb2RlIGlzIHBhcnNlZCwgb3RoZXJ3aXNlIGZhbHNlLlxuICAgICAqL1xuICAgIHBhcnNlX2NoZWNraW4oYm9keTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHBhcnNlZCA9IHRoaXMuY2hlY2tpbl92YWx1ZXMucGFyc2VfY2hlY2tpbihib2R5KTtcbiAgICAgICAgaWYgKHBhcnNlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNraW5fbW9kZSA9IHBhcnNlZC5rZXk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIHRoZSBjaGVjay1pbiBtb2RlIGZyb20gdGhlIG5leHQgc3RlcC5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBjaGVjay1pbiBtb2RlIGlzIHBhcnNlZCwgb3RoZXJ3aXNlIGZhbHNlLlxuICAgICAqL1xuICAgIHBhcnNlX2NoZWNraW5fZnJvbV9uZXh0X3N0ZXAoKSB7XG4gICAgICAgIGNvbnN0IGxhc3Rfc2VnbWVudCA9IHRoaXMuYnZuc3BfbmV4dF9zdGVwXG4gICAgICAgICAgICA/LnNwbGl0KFwiLVwiKVxuICAgICAgICAgICAgLnNsaWNlKC0xKVswXTtcbiAgICAgICAgaWYgKGxhc3Rfc2VnbWVudCAmJiBsYXN0X3NlZ21lbnQgaW4gdGhpcy5jaGVja2luX3ZhbHVlcy5ieV9rZXkpIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tpbl9tb2RlID0gbGFzdF9zZWdtZW50O1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlbGF5cyB0aGUgZXhlY3V0aW9uIGZvciBhIHNwZWNpZmllZCBudW1iZXIgb2Ygc2Vjb25kcy5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2Vjb25kcyAtIFRoZSBudW1iZXIgb2Ygc2Vjb25kcyB0byBkZWxheS5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25hbD1mYWxzZV0gLSBXaGV0aGVyIHRoZSBkZWxheSBpcyBvcHRpb25hbC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgYWZ0ZXIgdGhlIGRlbGF5LlxuICAgICAqL1xuICAgIGRlbGF5KHNlY29uZHM6IG51bWJlciwgb3B0aW9uYWw6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBpZiAob3B0aW9uYWwgJiYgIXRoaXMuc21zX3JlcXVlc3QpIHtcbiAgICAgICAgICAgIHNlY29uZHMgPSAxIC8gMTAwMC4wO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzKSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJlcywgc2Vjb25kcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbmRzIGEgbWVzc2FnZSB0byB0aGUgdXNlci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIFRoZSBtZXNzYWdlIHRvIHNlbmQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIG1lc3NhZ2UgaXMgc2VudC5cbiAgICAgKi9cbiAgICBhc3luYyBzZW5kX21lc3NhZ2UobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLnNtc19yZXF1ZXN0KSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmdldF90d2lsaW9fY2xpZW50KCkubWVzc2FnZXMuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICB0bzogdGhpcy5mcm9tLFxuICAgICAgICAgICAgICAgIGZyb206IHRoaXMudG8sXG4gICAgICAgICAgICAgICAgYm9keTogbWVzc2FnZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZXN1bHRfbWVzc2FnZXMucHVzaChtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgdGhlIGNoZWNrLWluIHByb2Nlc3MuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGNoZWNrLWluIHJlc3BvbnNlLlxuICAgICAqL1xuICAgIGFzeW5jIGhhbmRsZSgpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5faGFuZGxlKCk7XG4gICAgICAgIGlmICghdGhpcy5zbXNfcmVxdWVzdCkge1xuICAgICAgICAgICAgaWYgKHJlc3VsdD8ucmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdF9tZXNzYWdlcy5wdXNoKHJlc3VsdC5yZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiB0aGlzLnJlc3VsdF9tZXNzYWdlcy5qb2luKFwiXFxuIyMjXFxuXCIpLFxuICAgICAgICAgICAgICAgIG5leHRfc3RlcDogcmVzdWx0Py5uZXh0X3N0ZXAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW50ZXJuYWwgbWV0aG9kIHRvIGhhbmRsZSB0aGUgY2hlY2staW4gcHJvY2Vzcy5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgY2hlY2staW4gcmVzcG9uc2UuXG4gICAgICovXG4gICAgYXN5bmMgX2hhbmRsZSgpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICBgUmVjZWl2ZWQgcmVxdWVzdCBmcm9tICR7dGhpcy5mcm9tfSB3aXRoIGJvZHk6ICR7dGhpcy5ib2R5fSBhbmQgc3RhdGUgJHt0aGlzLmJ2bnNwX25leHRfc3RlcH1gXG4gICAgICAgICk7XG4gICAgICAgIGlmICh0aGlzLmJvZHkgPT0gXCJsb2dvdXRcIikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmZvcm1pbmcgbG9nb3V0YCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5sb2dvdXQoKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVzcG9uc2U6IEJWTlNQUmVzcG9uc2UgfCB1bmRlZmluZWQ7XG4gICAgICAgIGlmICghdGhpcy5jb25maWcuVVNFX1NFUlZJQ0VfQUNDT1VOVCkge1xuICAgICAgICAgICAgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmNoZWNrX3VzZXJfY3JlZHMoKTtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZSkgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmJvZHk/LnRvTG93ZXJDYXNlKCkgPT09IFwicmVzdGFydFwiKSB7XG4gICAgICAgICAgICByZXR1cm4geyByZXNwb25zZTogXCJPa2F5LiBUZXh0IG1lIGFnYWluIHRvIHN0YXJ0IG92ZXIuLi5cIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmdldF9tYXBwZWRfcGF0cm9sbGVyKCk7XG4gICAgICAgIGlmIChyZXNwb25zZSB8fCB0aGlzLnBhdHJvbGxlciA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIHJlc3BvbnNlIHx8IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2U6IFwiVW5leHBlY3RlZCBlcnJvciBsb29raW5nIHVwIHBhdHJvbGxlciBtYXBwaW5nXCIsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgICghdGhpcy5idm5zcF9uZXh0X3N0ZXAgfHxcbiAgICAgICAgICAgICAgICB0aGlzLmJ2bnNwX25leHRfc3RlcCA9PSBORVhUX1NURVBTLkFXQUlUX0NPTU1BTkQpICYmXG4gICAgICAgICAgICB0aGlzLmJvZHlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zdCBhd2FpdF9yZXNwb25zZSA9IGF3YWl0IHRoaXMuaGFuZGxlX2F3YWl0X2NvbW1hbmQoKTtcbiAgICAgICAgICAgIGlmIChhd2FpdF9yZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdF9yZXNwb25zZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHRoaXMuYnZuc3BfbmV4dF9zdGVwID09IE5FWFRfU1RFUFMuQVdBSVRfQ0hFQ0tJTiAmJlxuICAgICAgICAgICAgdGhpcy5ib2R5XG4gICAgICAgICkge1xuICAgICAgICAgICAgaWYgKHRoaXMucGFyc2VfY2hlY2tpbih0aGlzLmJvZHkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuY2hlY2tpbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgdGhpcy5idm5zcF9uZXh0X3N0ZXA/LnN0YXJ0c1dpdGgoXG4gICAgICAgICAgICAgICAgTkVYVF9TVEVQUy5DT05GSVJNX1JFU0VUXG4gICAgICAgICAgICApICYmXG4gICAgICAgICAgICB0aGlzLmJvZHlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5ib2R5ID09IFwieWVzXCIgJiYgdGhpcy5wYXJzZV9jaGVja2luX2Zyb21fbmV4dF9zdGVwKCkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICAgICAgYFBlcmZvcm1pbmcgcmVzZXRfc2hlZXRfZmxvdyBmb3IgJHt0aGlzLnBhdHJvbGxlci5uYW1lfSB3aXRoIGNoZWNraW4gbW9kZTogJHt0aGlzLmNoZWNraW5fbW9kZX1gXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAoYXdhaXQgdGhpcy5yZXNldF9zaGVldF9mbG93KCkpIHx8IChhd2FpdCB0aGlzLmNoZWNraW4oKSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgdGhpcy5idm5zcF9uZXh0X3N0ZXA/LnN0YXJ0c1dpdGgoTkVYVF9TVEVQUy5BVVRIX1JFU0VUKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcnNlX2NoZWNraW5fZnJvbV9uZXh0X3N0ZXAoKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgICAgICBgUGVyZm9ybWluZyByZXNldF9zaGVldF9mbG93LXBvc3QtYXV0aCBmb3IgJHt0aGlzLnBhdHJvbGxlci5uYW1lfSB3aXRoIGNoZWNraW4gbW9kZTogJHt0aGlzLmNoZWNraW5fbW9kZX1gXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAoYXdhaXQgdGhpcy5yZXNldF9zaGVldF9mbG93KCkpIHx8IChhd2FpdCB0aGlzLmNoZWNraW4oKSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgdGhpcy5idm5zcF9uZXh0X3N0ZXA/LnN0YXJ0c1dpdGgoTkVYVF9TVEVQUy5BV0FJVF9TRUNUSU9OKSAmJlxuICAgICAgICAgICAgdGhpcy5ib2R5XG4gICAgICAgICkge1xuICAgICAgICAgICAgY29uc3Qgc2VjdGlvbiA9IHRoaXMuc2VjdGlvbl92YWx1ZXMucGFyc2Vfc2VjdGlvbih0aGlzLmJvZHkpXG4gICAgICAgICAgICBpZiAoc2VjdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmFzc2lnbl9zZWN0aW9uKHNlY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucHJvbXB0X3NlY3Rpb25fYXNzaWdubWVudCgpO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgdGhpcy5idm5zcF9uZXh0X3N0ZXAgPT09IE5FWFRfU1RFUFMuQVdBSVRfTUVTU0FHRSAmJlxuICAgICAgICAgICAgdGhpcy5ib2R5X3Jhd1xuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnNlbmRfdGV4dF9tZXNzYWdlKHRoaXMuYm9keV9yYXcpO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgdGhpcy5idm5zcF9uZXh0X3N0ZXAgPT09IE5FWFRfU1RFUFMuQVdBSVRfQlJPQURDQVNUICYmXG4gICAgICAgICAgICB0aGlzLmJvZHlfcmF3XG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuc2VuZF9icm9hZGNhc3RfbWVzc2FnZSh0aGlzLmJvZHlfcmF3KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmJ2bnNwX25leHRfc3RlcCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5zZW5kX21lc3NhZ2UoXCJTb3JyeSwgSSBkaWRuJ3QgdW5kZXJzdGFuZCB0aGF0LlwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wcm9tcHRfY29tbWFuZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgdGhlIGF3YWl0IGNvbW1hbmQgc3RlcC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlIHwgdW5kZWZpbmVkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcmVzcG9uc2Ugb3IgdW5kZWZpbmVkLlxuICAgICAqL1xuICAgIGFzeW5jIGhhbmRsZV9hd2FpdF9jb21tYW5kKCk6IFByb21pc2U8QlZOU1BSZXNwb25zZSB8IHVuZGVmaW5lZD4ge1xuICAgICAgICBjb25zdCBwYXRyb2xsZXJfbmFtZSA9IHRoaXMucGF0cm9sbGVyIS5uYW1lO1xuICAgICAgICBpZiAodGhpcy5wYXJzZV9mYXN0X2NoZWNraW5fbW9kZSh0aGlzLmJvZHkhKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgYFBlcmZvcm1pbmcgZmFzdCBjaGVja2luIGZvciAke3BhdHJvbGxlcl9uYW1lfSB3aXRoIG1vZGU6ICR7dGhpcy5jaGVja2luX21vZGV9YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmNoZWNraW4oKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQ09NTUFORFMuT05fRFVUWS5pbmNsdWRlcyh0aGlzLmJvZHkhKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmZvcm1pbmcgZ2V0X29uX2R1dHkgZm9yICR7cGF0cm9sbGVyX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4geyByZXNwb25zZTogYXdhaXQgdGhpcy5nZXRfb25fZHV0eSgpIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJDaGVja2luZyBmb3Igc3RhdHVzLi4uXCIpO1xuICAgICAgICBpZiAoQ09NTUFORFMuU1RBVFVTLmluY2x1ZGVzKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBnZXRfc3RhdHVzIGZvciAke3BhdHJvbGxlcl9uYW1lfWApO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X3N0YXR1cygpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDT01NQU5EUy5DSEVDS0lOLmluY2x1ZGVzKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBwcm9tcHRfY2hlY2tpbiBmb3IgJHtwYXRyb2xsZXJfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb21wdF9jaGVja2luKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKENPTU1BTkRTLkdVRVNUX1BBU1MuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIGd1ZXN0X3Bhc3MgZm9yICR7cGF0cm9sbGVyX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5wcm9tcHRfZ3Vlc3RfcGFzcygpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnBhcnNlX2Zhc3Rfc2VjdGlvbl9hc3NpZ25tZW50KHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBmYXN0IHNlY3Rpb25fYXNzaWdubWVudCBmb3IgJHtwYXRyb2xsZXJfbmFtZX0gdG8gJHt0aGlzLmFzc2lnbmVkX3NlY3Rpb259YCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5hc3NpZ25fc2VjdGlvbih0aGlzLmFzc2lnbmVkX3NlY3Rpb24pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDT01NQU5EUy5TRUNUSU9OX0FTU0lHTk1FTlQuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIHNlY3Rpb25fYXNzaWdubWVudCBmb3IgJHtwYXRyb2xsZXJfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnByb21wdF9zZWN0aW9uX2Fzc2lnbm1lbnQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQ09NTUFORFMuV0hBVFNBUFAuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBJJ20gYXZhaWxhYmxlIG9uIFdoYXRzQXBwIGFzIHdlbGwhIFdoYXRzQXBwIHVzZXMgV2lmaS9DZWxsIERhdGEgaW5zdGVhZCBvZiBTTVMsIGFuZCBjYW4gYmUgbW9yZSByZWxpYWJsZS4gTWVzc2FnZSBtZSBhdCBodHRwczovL3dhLm1lLzEke3RoaXMudG99YCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKENPTU1BTkRTLk1FU1NBR0UuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIG1lc3NhZ2UgZm9yICR7cGF0cm9sbGVyX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5wcm9tcHRfbWVzc2FnZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDT01NQU5EUy5CUk9BRENBU1QuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIGJyb2FkY2FzdCBmb3IgJHtwYXRyb2xsZXJfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnByb21wdF9icm9hZGNhc3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb21wdHMgdGhlIHVzZXIgZm9yIGEgY29tbWFuZC5cbiAgICAgKiBAcmV0dXJucyB7QlZOU1BSZXNwb25zZX0gVGhlIHJlc3BvbnNlIHByb21wdGluZyB0aGUgdXNlciBmb3IgYSBjb21tYW5kLlxuICAgICAqL1xuICAgIHByb21wdF9jb21tYW5kKCk6IEJWTlNQUmVzcG9uc2Uge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IGAke3RoaXMucGF0cm9sbGVyIS5uYW1lfSwgSSdtIHRoZSBCVk5TUCBCb3QuXG5FbnRlciBhIGNvbW1hbmQ6XG5DaGVjayBpbiAvIENoZWNrIG91dCAvIFN0YXR1cyAvIE9uIER1dHkgLyBTZWN0aW9uIEFzc2lnbm1lbnQgLyBHdWVzdCBQYXNzIC8gTWVzc2FnZSAvIFdoYXRzQXBwXG5TZW5kICdyZXN0YXJ0JyBhdCBhbnkgdGltZSB0byBiZWdpbiBhZ2FpbmAsXG4gICAgICAgICAgICBuZXh0X3N0ZXA6IE5FWFRfU1RFUFMuQVdBSVRfQ09NTUFORCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm9tcHRzIHRoZSB1c2VyIGZvciBhIGNoZWNrLWluLlxuICAgICAqIEByZXR1cm5zIHtCVk5TUFJlc3BvbnNlfSBUaGUgcmVzcG9uc2UgcHJvbXB0aW5nIHRoZSB1c2VyIGZvciBhIGNoZWNrLWluLlxuICAgICAqL1xuICAgIHByb21wdF9jaGVja2luKCk6IEJWTlNQUmVzcG9uc2Uge1xuICAgICAgICBjb25zdCB0eXBlcyA9IE9iamVjdC52YWx1ZXModGhpcy5jaGVja2luX3ZhbHVlcy5ieV9rZXkpLm1hcChcbiAgICAgICAgICAgICh4KSA9PiB4LnNtc19kZXNjXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZTogYCR7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXIhLm5hbWVcbiAgICAgICAgICAgIH0sIHVwZGF0ZSBwYXRyb2xsaW5nIHN0YXR1cyB0bzogJHt0eXBlc1xuICAgICAgICAgICAgICAgIC5zbGljZSgwLCAtMSlcbiAgICAgICAgICAgICAgICAuam9pbihcIiwgXCIpfSwgb3IgJHt0eXBlcy5zbGljZSgtMSl9P2AsXG4gICAgICAgICAgICBuZXh0X3N0ZXA6IE5FWFRfU1RFUFMuQVdBSVRfQ0hFQ0tJTixcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIFBhcnNlcyB0aGUgZmFzdCBzZWN0aW9uIGFzc2lnbm1lbnQgZnJvbSB0aGUgbWVzc2FnZSBib2R5LlxuICAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHkgLSBUaGUgbWVzc2FnZSBib2R5LlxuICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNlY3Rpb24gYXNzaWdubWVudCBpcyBwYXJzZWQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAqL1xuICAgIHBhcnNlX2Zhc3Rfc2VjdGlvbl9hc3NpZ25tZW50KGJvZHk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHRoaXMuYXNzaWduZWRfc2VjdGlvbiA9IG51bGw7XG4gICAgaWYgKCFib2R5IHx8ICFib2R5LmluY2x1ZGVzKFwiLVwiKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHNlZ21lbnRzID0gYm9keS5zcGxpdChcIi1cIik7XG4gICAgY29uc3QgbGFzdFNlZ21lbnQgPSBzZWdtZW50cy5wb3AoKTtcbiAgICBjb25zdCBmaXJzdFBhcnQgPSBzZWdtZW50cy5qb2luKFwiLVwiKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgaWYgKGxhc3RTZWdtZW50ICYmIENPTU1BTkRTLlNFQ1RJT05fQVNTSUdOTUVOVC5pbmNsdWRlcyhmaXJzdFBhcnQpKSB7XG4gICAgICAgIHRoaXMuYXNzaWduZWRfc2VjdGlvbiA9IHRoaXMuc2VjdGlvbl92YWx1ZXMubWFwX3NlY3Rpb24obGFzdFNlZ21lbnQudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgIHJldHVybiB0aGlzLmFzc2lnbmVkX3NlY3Rpb24gIT09IG51bGwgJiYgdGhpcy5hc3NpZ25lZF9zZWN0aW9uICE9PSBcIlwiO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvbXB0cyB0aGUgdXNlciBmb3Igc2VjdGlvbiBhc3NpZ25tZW50LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSByZXNwb25zZS5cbiAgICAgKi9cbiAgICBhc3luYyBwcm9tcHRfc2VjdGlvbl9hc3NpZ25tZW50KCk6IFByb21pc2U8QlZOU1BSZXNwb25zZT4ge1xuICAgICAgICBpZiAoIXRoaXMucGF0cm9sbGVyIHx8ICF0aGlzLnBhdHJvbGxlci5jaGVja2luKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgJHt0aGlzLnBhdHJvbGxlciEubmFtZX0gaXMgbm90IGNoZWNrZWQgaW4uYCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2VjdGlvbl9kZXNjcmlwdGlvbiA9IHRoaXMuc2VjdGlvbl92YWx1ZXMuZ2V0X3NlY3Rpb25fZGVzY3JpcHRpb24oKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3BvbnNlOiBgRW50ZXIgeW91ciBhc3NpZ25lZCBzZWN0aW9uOyBvbmUgb2YgJHtzZWN0aW9uX2Rlc2NyaXB0aW9ufSAob3IgJ3Jlc3RhcnQnKWAsXG4gICAgICAgICAgICBuZXh0X3N0ZXA6IE5FWFRfU1RFUFMuQVdBSVRfU0VDVElPTixcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCdWlsZHMgdGhlIG1lc3NhZ2UgcHJlZml4IGZvciBhIHRleHQgbWVzc2FnZSBmcm9tIGEgcGF0cm9sbGVyLlxuICAgICAqIEluY2x1ZGVzIHRoZSBzZW5kZXIncyBuYW1lIGFuZCBmb3JtYXR0ZWQgcGhvbmUgbnVtYmVyLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZW5kZXJfbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwYXRyb2xsZXIgc2VuZGluZyB0aGUgbWVzc2FnZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VuZGVyX3Bob25lIC0gVGhlIHNlbmRlcidzIDEwLWRpZ2l0IHBob25lIG51bWJlci5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgbWVzc2FnZSBwcmVmaXguIGZvciBleGFtcGxlIDogXCJNZXNzYWdlIGZyb20gSm9obiBEb2UgKDEyMyk0NTYtNzg5MFwiLlxuICAgICAqL1xuICAgIGdldF9tZXNzYWdlX3ByZWZpeChzZW5kZXJfbmFtZTogc3RyaW5nLCBzZW5kZXJfcGhvbmU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZF9waG9uZSA9IGZvcm1hdF9waG9uZV9mb3JfZGlzcGxheShzZW5kZXJfcGhvbmUpO1xuICAgICAgICByZXR1cm4gYCR7TUVTU0FHRV9QUkVGSVhfVEVNUExBVEV9JHtzZW5kZXJfbmFtZX0gJHtmb3JtYXR0ZWRfcGhvbmV9JHtNRVNTQUdFX1BSRUZJWF9TVUZGSVh9YDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGVzIHRoZSBtYXhpbXVtIGFsbG93ZWQgbWVzc2FnZSBsZW5ndGggZm9yIGEgdGV4dCBtZXNzYWdlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZW5kZXJfbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwYXRyb2xsZXIgc2VuZGluZyB0aGUgbWVzc2FnZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VuZGVyX3Bob25lIC0gVGhlIHNlbmRlcidzIDEwLWRpZ2l0IHBob25lIG51bWJlci5cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgbWF4aW11bSBudW1iZXIgb2YgY2hhcmFjdGVycyB0aGUgdXNlcidzIG1lc3NhZ2UgY2FuIGNvbnRhaW4uXG4gICAgICovXG4gICAgZ2V0X21heF9tZXNzYWdlX2xlbmd0aChzZW5kZXJfbmFtZTogc3RyaW5nLCBzZW5kZXJfcGhvbmU6IHN0cmluZyk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBTTVNfTUFYX0xFTkdUSCAtIHRoaXMuZ2V0X21lc3NhZ2VfcHJlZml4KHNlbmRlcl9uYW1lLCBzZW5kZXJfcGhvbmUpLmxlbmd0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm9tcHRzIHRoZSB1c2VyIHRvIHR5cGUgdGhlaXIgdGV4dCBtZXNzYWdlLlxuICAgICAqIEFueSBwYXRyb2xsZXIgd2l0aCBhIHZhbGlkIHBob25lIG51bWJlciBjYW4gc2VuZCBhIG1lc3NhZ2UsIHJlZ2FyZGxlc3NcbiAgICAgKiBvZiB0aGVpciBvd24gY2hlY2staW4gc3RhdHVzLiAgVGhlIHJlY2lwaWVudCBsaXN0IGluY2x1ZGVzIGFsbFxuICAgICAqIHBhdHJvbGxlcnMgd2hvIGhhdmUgYW55IGNoZWNrLWluIHN0YXR1cyAoQWxsIERheSwgSGFsZiBBTSwgSGFsZiBQTSxcbiAgICAgKiBvciBDaGVja2VkIE91dCksIGluY2x1ZGluZyB0aGUgc2VuZGVyIHRoZW1zZWx2ZXMgaWYgdGhleSBhcmUgY2hlY2tlZCBpbi5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcHJvbXB0IHJlc3BvbnNlLlxuICAgICAqL1xuICAgIGFzeW5jIHByb21wdF9tZXNzYWdlKCk6IFByb21pc2U8QlZOU1BSZXNwb25zZT4ge1xuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG4gICAgICAgIGNvbnN0IHJlY2lwaWVudHMgPSBsb2dpbl9zaGVldC5nZXRfb25fZHV0eV9wYXRyb2xsZXJzKCk7XG4gICAgICAgIGlmIChyZWNpcGllbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYE5vIHBhdHJvbGxlcnMgYXJlIGN1cnJlbnRseSBsb2dnZWQgaW4uIFRoZXJlIGlzIG5vYm9keSB0byBzZW5kIGEgbWVzc2FnZSB0by5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZW5kZXJfcGhvbmUgPSBzYW5pdGl6ZV9waG9uZV9udW1iZXIodGhpcy5mcm9tKTtcbiAgICAgICAgY29uc3QgbWF4X2xlbmd0aCA9IHRoaXMuZ2V0X21heF9tZXNzYWdlX2xlbmd0aCh0aGlzLnBhdHJvbGxlciEubmFtZSwgc2VuZGVyX3Bob25lKTtcbiAgICAgICAgaWYgKG1heF9sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYFlvdXIgbmFtZSBpcyB0b28gbG9uZyB0byBzZW5kIGEgdGV4dCBtZXNzYWdlLmAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZTogYFBsZWFzZSB0eXBlIGEgbWVzc2FnZSBvZiBubyBtb3JlIHRoYW4gJHttYXhfbGVuZ3RofSBwbGFpbi10ZXh0IGNoYXJhY3RlcnMgdG8gJHtyZWNpcGllbnRzLmxlbmd0aH0gcGF0cm9sbGVyJHtyZWNpcGllbnRzLmxlbmd0aCAhPT0gMSA/IFwic1wiIDogXCJcIn0sIG9yICdyZXN0YXJ0JyB0byBjYW5jZWwuYCxcbiAgICAgICAgICAgIG5leHRfc3RlcDogTkVYVF9TVEVQUy5BV0FJVF9NRVNTQUdFLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbmRzIGEgdGV4dCBtZXNzYWdlIHRvIGFsbCBwYXRyb2xsZXJzIHdpdGggYSBjaGVjay1pbiBzdGF0dXMgZm9yIHRoZSBkYXkuXG4gICAgICogVGhlIHNlbmRlciBhbHNvIHJlY2VpdmVzIHRoZSBtZXNzYWdlIGlmIHRoZXkgaGF2ZSBhIGNoZWNrLWluIHN0YXR1cy5cbiAgICAgKiBWYWxpZGF0ZXMgdGhhdCB0aGUgY29tcGxldGUgbWVzc2FnZSAocHJlZml4ICsgYm9keSkgdXNlcyBvbmx5IEdTTS03XG4gICAgICogY2hhcmFjdGVycyBhbmQgZml0cyB3aXRoaW4gYSBzaW5nbGUgU01TIHNlZ21lbnQsIHVzaW5nIHRoZVxuICAgICAqIHNtcy1zZWdtZW50cy1jYWxjdWxhdG9yIGxpYnJhcnkuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VfdGV4dCAtIFRoZSByYXcgbWVzc2FnZSB0ZXh0IGZyb20gdGhlIHNlbmRlci5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgc2VuZCByZXN1bHQuXG4gICAgICovXG4gICAgYXN5bmMgc2VuZF90ZXh0X21lc3NhZ2UobWVzc2FnZV90ZXh0OiBzdHJpbmcpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3Qgc2VuZGVyX25hbWUgPSB0aGlzLnBhdHJvbGxlciEubmFtZTtcbiAgICAgICAgY29uc3Qgc2VuZGVyX3Bob25lID0gc2FuaXRpemVfcGhvbmVfbnVtYmVyKHRoaXMuZnJvbSk7XG4gICAgICAgIGNvbnN0IHByZWZpeCA9IHRoaXMuZ2V0X21lc3NhZ2VfcHJlZml4KHNlbmRlcl9uYW1lLCBzZW5kZXJfcGhvbmUpO1xuICAgICAgICBjb25zdCBtYXhfbGVuZ3RoID0gdGhpcy5nZXRfbWF4X21lc3NhZ2VfbGVuZ3RoKHNlbmRlcl9uYW1lLCBzZW5kZXJfcGhvbmUpO1xuICAgICAgICBjb25zdCBmdWxsX21lc3NhZ2UgPSBwcmVmaXggKyBtZXNzYWdlX3RleHQ7XG5cbiAgICAgICAgY29uc3QgdmFsaWRhdGlvbiA9IHZhbGlkYXRlX3Ntc19tZXNzYWdlKGZ1bGxfbWVzc2FnZSk7XG4gICAgICAgIGlmICghdmFsaWRhdGlvbi52YWxpZCkge1xuICAgICAgICAgICAgaWYgKHZhbGlkYXRpb24ucmVhc29uID09PSBcIm5vbl9nc203XCIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBiYWRfY2hhcnMgPSB2YWxpZGF0aW9uLm5vbl9nc21fY2hhcmFjdGVycyEuam9pbihcIiBcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBZb3VyIG1lc3NhZ2UgY29udGFpbnMgY2hhcmFjdGVycyB0aGF0IGFyZSBub3Qgc3VwcG9ydGVkIGluIHBsYWluLXRleHQgU01TOiAke2JhZF9jaGFyc30uIFBsZWFzZSB1c2Ugb25seSBzdGFuZGFyZCBjaGFyYWN0ZXJzIGFuZCB0cnkgYWdhaW4uYCxcbiAgICAgICAgICAgICAgICAgICAgbmV4dF9zdGVwOiBORVhUX1NURVBTLkFXQUlUX01FU1NBR0UsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBZb3VyIG1lc3NhZ2UgaXMgJHttZXNzYWdlX3RleHQubGVuZ3RofSBjaGFyYWN0ZXJzLCB3aGljaCBleGNlZWRzIHRoZSBsaW1pdCBvZiAke21heF9sZW5ndGh9LiBQbGVhc2Ugc2hvcnRlbiB5b3VyIG1lc3NhZ2UgYW5kIHRyeSBhZ2Fpbiwgb3IgdHlwZSAncmVzdGFydCcgdG8gY2FuY2VsLmAsXG4gICAgICAgICAgICAgICAgbmV4dF9zdGVwOiBORVhUX1NURVBTLkFXQUlUX01FU1NBR0UsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuICAgICAgICBjb25zdCBzaWduZWRfaW5fcGF0cm9sbGVycyA9IGxvZ2luX3NoZWV0LmdldF9vbl9kdXR5X3BhdHJvbGxlcnMoKTtcbiAgICAgICAgY29uc3QgcGhvbmVfbWFwID0gYXdhaXQgdGhpcy5nZXRfcGhvbmVfbnVtYmVyX21hcCgpO1xuXG4gICAgICAgIC8vIEJ1aWxkIHJlY2lwaWVudCBtYXAgZm9yIG9uLWR1dHkgcGF0cm9sbGVycyB3aXRoIGtub3duIHBob25lczsgdHJhY2sgbWlzc2luZ1xuICAgICAgICBjb25zdCByZWNpcGllbnRfbWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge307XG4gICAgICAgIGNvbnN0IG5vX3Bob25lX25hbWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IHBhdHJvbGxlciBvZiBzaWduZWRfaW5fcGF0cm9sbGVycykge1xuICAgICAgICAgICAgY29uc3QgcGhvbmUgPSBwaG9uZV9tYXBbcGF0cm9sbGVyLm5hbWVdO1xuICAgICAgICAgICAgaWYgKHBob25lKSB7XG4gICAgICAgICAgICAgICAgcmVjaXBpZW50X21hcFtwYXRyb2xsZXIubmFtZV0gPSBwaG9uZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbm9fcGhvbmVfbmFtZXMucHVzaChwYXRyb2xsZXIubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB7IHNlbnRfY291bnQsIGNvcHlfc2VudF90b19zZW5kZXIsIGZhaWxlZF9uYW1lcyB9ID1cbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZGVsaXZlcl9zbXNfdG9fbWFwKHJlY2lwaWVudF9tYXAsIGZ1bGxfbWVzc2FnZSwgc2VuZGVyX25hbWUpO1xuXG4gICAgICAgIGF3YWl0IHRoaXMubG9nX2FjdGlvbihgdGV4dF9tZXNzYWdlKCR7c2VudF9jb3VudCArIChjb3B5X3NlbnRfdG9fc2VuZGVyID8gMSA6IDApfSlgKTtcblxuICAgICAgICBsZXQgcmVzcG9uc2UgPSBgTWVzc2FnZSBzZW50IHRvICR7c2VudF9jb3VudH0gcGF0cm9sbGVyJHtzZW50X2NvdW50ICE9PSAxID8gXCJzXCIgOiBcIlwifWA7XG4gICAgICAgIGlmIChjb3B5X3NlbnRfdG9fc2VuZGVyKSB7XG4gICAgICAgICAgICByZXNwb25zZSArPSBgIGFuZCBhIGNvcHkgdG8geW91LmA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNwb25zZSArPSBgLmA7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYWxsX2ZhaWxlZCA9IFsuLi5ub19waG9uZV9uYW1lcywgLi4uZmFpbGVkX25hbWVzXTtcbiAgICAgICAgaWYgKGFsbF9mYWlsZWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmVzcG9uc2UgKz0gYCBDb3VsZCBub3Qgc2VuZCB0bzogJHthbGxfZmFpbGVkLmpvaW4oXCIsIFwiKX0uYDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyByZXNwb25zZSB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvcmUgU01TIGRlbGl2ZXJ5IGxvb3AuIFNlbmRzIGZ1bGxfbWVzc2FnZSB0byBlYWNoIGVudHJ5IGluIHJlY2lwaWVudF9tYXBcbiAgICAgKiAobmFtZSDihpIgXCIrMVhYWFhYWFhYWFhcIikuIElmIHRoZSBzZW5kZXIncyBwaG9uZSBpcyBub3QgYW1vbmcgdGhlIHJlY2lwaWVudHMsXG4gICAgICogYSBjb3B5IGlzIHNlbnQgdG8gdGhpcy5mcm9tLiBSZXR1cm5zIGRlbGl2ZXJ5IGFjY291bnRpbmcgZGF0YS5cbiAgICAgKiBAcGFyYW0ge1JlY29yZDxzdHJpbmcsIHN0cmluZz59IHJlY2lwaWVudF9tYXAgLSBNYXAgb2YgcGF0cm9sbGVyIG5hbWUgdG8gXCIrMVhYWFhYWFhYWFhcIiBwaG9uZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZnVsbF9tZXNzYWdlIC0gVGhlIGNvbXBsZXRlIGZvcm1hdHRlZCBTTVMgdG8gc2VuZC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VuZGVyX25hbWUgLSBUaGUgc2VuZGVyJ3MgbmFtZSAodXNlZCBmb3IgZmFpbHVyZSBsb2dnaW5nKS5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxvYmplY3Q+fSBEZWxpdmVyeSBjb3VudHMgYW5kIGZhaWx1cmUgbGlzdC5cbiAgICAgKi9cbiAgICBhc3luYyBkZWxpdmVyX3Ntc190b19tYXAoXG4gICAgICAgIHJlY2lwaWVudF9tYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4sXG4gICAgICAgIGZ1bGxfbWVzc2FnZTogc3RyaW5nLFxuICAgICAgICBzZW5kZXJfbmFtZTogc3RyaW5nLFxuICAgICk6IFByb21pc2U8eyBzZW50X2NvdW50OiBudW1iZXI7IGNvcHlfc2VudF90b19zZW5kZXI6IGJvb2xlYW47IGZhaWxlZF9uYW1lczogc3RyaW5nW10gfT4ge1xuICAgICAgICBsZXQgc2VudF9jb3VudCA9IDA7XG4gICAgICAgIGNvbnN0IGZhaWxlZF9uYW1lczogc3RyaW5nW10gPSBbXTtcblxuICAgICAgICBmb3IgKGNvbnN0IFtuYW1lLCBwaG9uZV0gb2YgT2JqZWN0LmVudHJpZXMocmVjaXBpZW50X21hcCkpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXRfdHdpbGlvX2NsaWVudCgpLm1lc3NhZ2VzLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHRvOiBwaG9uZSxcbiAgICAgICAgICAgICAgICAgICAgZnJvbTogdGhpcy50byxcbiAgICAgICAgICAgICAgICAgICAgYm9keTogZnVsbF9tZXNzYWdlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHNlbnRfY291bnQrKztcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgRmFpbGVkIHRvIHNlbmQgU01TIHRvICR7bmFtZX06ICR7ZX1gKTtcbiAgICAgICAgICAgICAgICBmYWlsZWRfbmFtZXMucHVzaChuYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNlbmQgYSBjb3B5IHRvIHRoZSBzZW5kZXIgaWYgdGhlaXIgbnVtYmVyIGlzIG5vdCBhbHJlYWR5IGluIHRoZSByZWNpcGllbnQgbWFwXG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZWRfc2VuZGVyID0gYCsxJHtzYW5pdGl6ZV9waG9uZV9udW1iZXIodGhpcy5mcm9tKX1gO1xuICAgICAgICBjb25zdCBzZW5kZXJfaW5fbWFwID0gT2JqZWN0LnZhbHVlcyhyZWNpcGllbnRfbWFwKS5pbmNsdWRlcyhub3JtYWxpemVkX3NlbmRlcik7XG4gICAgICAgIGxldCBjb3B5X3NlbnRfdG9fc2VuZGVyID0gZmFsc2U7XG4gICAgICAgIGlmICghc2VuZGVyX2luX21hcCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmdldF90d2lsaW9fY2xpZW50KCkubWVzc2FnZXMuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgdG86IHRoaXMuZnJvbSxcbiAgICAgICAgICAgICAgICAgICAgZnJvbTogdGhpcy50byxcbiAgICAgICAgICAgICAgICAgICAgYm9keTogZnVsbF9tZXNzYWdlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvcHlfc2VudF90b19zZW5kZXIgPSB0cnVlO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBGYWlsZWQgdG8gc2VuZCBTTVMgY29weSB0byBzZW5kZXIgJHtzZW5kZXJfbmFtZX06ICR7ZX1gKTtcbiAgICAgICAgICAgICAgICBmYWlsZWRfbmFtZXMucHVzaChzZW5kZXJfbmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geyBzZW50X2NvdW50LCBjb3B5X3NlbnRfdG9fc2VuZGVyLCBmYWlsZWRfbmFtZXMgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm9tcHRzIHRoZSB1c2VyIHRvIHR5cGUgYSBicm9hZGNhc3QgbWVzc2FnZSB0byBhbGwgcGF0cm9sbGVycy5cbiAgICAgKiBVbmxpa2UgdGhlIG1lc3NhZ2UgY29tbWFuZCAod2hpY2ggdGFyZ2V0cyBvbmx5IGxvZ2dlZC1pbiBwYXRyb2xsZXJzKSwgYnJvYWRjYXN0XG4gICAgICogc2VuZHMgdG8gZXZlcnkgcGF0cm9sbGVyIGluIHRoZSBQaG9uZSBOdW1iZXJzIHNoZWV0LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBwcm9tcHQgcmVzcG9uc2UuXG4gICAgICovXG4gICAgYXN5bmMgcHJvbXB0X2Jyb2FkY2FzdCgpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgcGhvbmVfbWFwID0gYXdhaXQgdGhpcy5nZXRfcGhvbmVfbnVtYmVyX21hcCgpO1xuICAgICAgICBjb25zdCByZWNpcGllbnRfY291bnQgPSBPYmplY3Qua2V5cyhwaG9uZV9tYXApLmxlbmd0aDtcbiAgICAgICAgaWYgKHJlY2lwaWVudF9jb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYE5vIHBhdHJvbGxlcnMgd2l0aCBwaG9uZSBudW1iZXJzIGZvdW5kLiBUaGVyZSBpcyBub2JvZHkgdG8gYnJvYWRjYXN0IHRvLmAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNlbmRlcl9waG9uZSA9IHNhbml0aXplX3Bob25lX251bWJlcih0aGlzLmZyb20pO1xuICAgICAgICBjb25zdCBtYXhfbGVuZ3RoID0gdGhpcy5nZXRfbWF4X21lc3NhZ2VfbGVuZ3RoKHRoaXMucGF0cm9sbGVyIS5uYW1lLCBzZW5kZXJfcGhvbmUpO1xuICAgICAgICBpZiAobWF4X2xlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgWW91ciBuYW1lIGlzIHRvbyBsb25nIHRvIHNlbmQgYSBicm9hZGNhc3QgbWVzc2FnZS5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IGBQbGVhc2UgdHlwZSBhIGJyb2FkY2FzdCBtZXNzYWdlIG9mIG5vIG1vcmUgdGhhbiAke21heF9sZW5ndGh9IHBsYWluLXRleHQgY2hhcmFjdGVycyB0byAke3JlY2lwaWVudF9jb3VudH0gcGF0cm9sbGVyJHtyZWNpcGllbnRfY291bnQgIT09IDEgPyBcInNcIiA6IFwiXCJ9LCBvciAncmVzdGFydCcgdG8gY2FuY2VsLmAsXG4gICAgICAgICAgICBuZXh0X3N0ZXA6IE5FWFRfU1RFUFMuQVdBSVRfQlJPQURDQVNULFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbmRzIGEgYnJvYWRjYXN0IG1lc3NhZ2UgdG8gQUxMIHBhdHJvbGxlcnMgaW4gdGhlIFBob25lIE51bWJlcnMgc2hlZXQsXG4gICAgICogcmVnYXJkbGVzcyBvZiBjaGVjay1pbiBzdGF0dXMuIFVzZXMgdGhlIHNhbWUgcHJlZml4IGZvcm1hdCBhbmQgR1NNLTcgLyBzaW5nbGUtc2VnbWVudFxuICAgICAqIHZhbGlkYXRpb24gYXMgdGhlIG1lc3NhZ2UgY29tbWFuZC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZV90ZXh0IC0gVGhlIHJhdyBtZXNzYWdlIHRleHQgZnJvbSB0aGUgc2VuZGVyLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBzZW5kIHJlc3VsdC5cbiAgICAgKi9cbiAgICBhc3luYyBzZW5kX2Jyb2FkY2FzdF9tZXNzYWdlKG1lc3NhZ2VfdGV4dDogc3RyaW5nKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnN0IHNlbmRlcl9uYW1lID0gdGhpcy5wYXRyb2xsZXIhLm5hbWU7XG4gICAgICAgIGNvbnN0IHNlbmRlcl9waG9uZSA9IHNhbml0aXplX3Bob25lX251bWJlcih0aGlzLmZyb20pO1xuICAgICAgICBjb25zdCBwcmVmaXggPSB0aGlzLmdldF9tZXNzYWdlX3ByZWZpeChzZW5kZXJfbmFtZSwgc2VuZGVyX3Bob25lKTtcbiAgICAgICAgY29uc3QgbWF4X2xlbmd0aCA9IHRoaXMuZ2V0X21heF9tZXNzYWdlX2xlbmd0aChzZW5kZXJfbmFtZSwgc2VuZGVyX3Bob25lKTtcbiAgICAgICAgY29uc3QgZnVsbF9tZXNzYWdlID0gcHJlZml4ICsgbWVzc2FnZV90ZXh0O1xuXG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb24gPSB2YWxpZGF0ZV9zbXNfbWVzc2FnZShmdWxsX21lc3NhZ2UpO1xuICAgICAgICBpZiAoIXZhbGlkYXRpb24udmFsaWQpIHtcbiAgICAgICAgICAgIGlmICh2YWxpZGF0aW9uLnJlYXNvbiA9PT0gXCJub25fZ3NtN1wiKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYmFkX2NoYXJzID0gdmFsaWRhdGlvbi5ub25fZ3NtX2NoYXJhY3RlcnMhLmpvaW4oXCIgXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgWW91ciBtZXNzYWdlIGNvbnRhaW5zIGNoYXJhY3RlcnMgdGhhdCBhcmUgbm90IHN1cHBvcnRlZCBpbiBwbGFpbi10ZXh0IFNNUzogJHtiYWRfY2hhcnN9LiBQbGVhc2UgdXNlIG9ubHkgc3RhbmRhcmQgY2hhcmFjdGVycyBhbmQgdHJ5IGFnYWluLmAsXG4gICAgICAgICAgICAgICAgICAgIG5leHRfc3RlcDogTkVYVF9TVEVQUy5BV0FJVF9CUk9BRENBU1QsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBZb3VyIG1lc3NhZ2UgaXMgJHttZXNzYWdlX3RleHQubGVuZ3RofSBjaGFyYWN0ZXJzLCB3aGljaCBleGNlZWRzIHRoZSBsaW1pdCBvZiAke21heF9sZW5ndGh9LiBQbGVhc2Ugc2hvcnRlbiB5b3VyIG1lc3NhZ2UgYW5kIHRyeSBhZ2Fpbiwgb3IgdHlwZSAncmVzdGFydCcgdG8gY2FuY2VsLmAsXG4gICAgICAgICAgICAgICAgbmV4dF9zdGVwOiBORVhUX1NURVBTLkFXQUlUX0JST0FEQ0FTVCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGb3IgYnJvYWRjYXN0LCBzZW5kIHRvIEFMTCBwYXRyb2xsZXJzIGluIHRoZSBwaG9uZSBudW1iZXIgbWFwXG4gICAgICAgIGNvbnN0IHBob25lX21hcCA9IGF3YWl0IHRoaXMuZ2V0X3Bob25lX251bWJlcl9tYXAoKTtcbiAgICAgICAgY29uc3QgeyBzZW50X2NvdW50LCBjb3B5X3NlbnRfdG9fc2VuZGVyLCBmYWlsZWRfbmFtZXMgfSA9XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmRlbGl2ZXJfc21zX3RvX21hcChwaG9uZV9tYXAsIGZ1bGxfbWVzc2FnZSwgc2VuZGVyX25hbWUpO1xuXG4gICAgICAgIGF3YWl0IHRoaXMubG9nX2FjdGlvbihgYnJvYWRjYXN0KCR7c2VudF9jb3VudCArIChjb3B5X3NlbnRfdG9fc2VuZGVyID8gMSA6IDApfSlgKTtcblxuICAgICAgICBsZXQgcmVzcG9uc2UgPSBgQnJvYWRjYXN0IHNlbnQgdG8gJHtzZW50X2NvdW50fSBwYXRyb2xsZXIke3NlbnRfY291bnQgIT09IDEgPyBcInNcIiA6IFwiXCJ9YDtcbiAgICAgICAgaWYgKGNvcHlfc2VudF90b19zZW5kZXIpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlICs9IGAgYW5kIGEgY29weSB0byB5b3UuYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3BvbnNlICs9IGAuYDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmYWlsZWRfbmFtZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmVzcG9uc2UgKz0gYCBDb3VsZCBub3Qgc2VuZCB0bzogJHtmYWlsZWRfbmFtZXMuam9pbihcIiwgXCIpfS5gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHJlc3BvbnNlIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9va3MgdXAgcGhvbmUgbnVtYmVycyBmb3IgYWxsIHBhdHJvbGxlcnMgZnJvbSB0aGUgUGhvbmUgTnVtYmVycyBzaGVldC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+Pn0gQSBtYXAgb2YgcGF0cm9sbGVyIG5hbWUgdG8gcGhvbmUgbnVtYmVyIChpbiArMVhYWFhYWFhYWFggZm9ybWF0KS5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfcGhvbmVfbnVtYmVyX21hcCgpOiBQcm9taXNlPFJlY29yZDxzdHJpbmcsIHN0cmluZz4+IHtcbiAgICAgICAgY29uc3Qgc2hlZXRzX3NlcnZpY2UgPSBhd2FpdCB0aGlzLmdldF9zaGVldHNfc2VydmljZSgpO1xuICAgICAgICBjb25zdCBvcHRzOiBGaW5kUGF0cm9sbGVyQ29uZmlnID0gdGhpcy5jb21iaW5lZF9jb25maWc7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgc2hlZXRzX3NlcnZpY2Uuc3ByZWFkc2hlZXRzLnZhbHVlcy5nZXQoe1xuICAgICAgICAgICAgc3ByZWFkc2hlZXRJZDogb3B0cy5TSEVFVF9JRCxcbiAgICAgICAgICAgIHJhbmdlOiBvcHRzLlBIT05FX05VTUJFUl9MT09LVVBfU0hFRVQsXG4gICAgICAgICAgICB2YWx1ZVJlbmRlck9wdGlvbjogXCJVTkZPUk1BVFRFRF9WQUxVRVwiLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhLnZhbHVlcykge1xuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IHJvdyBvZiByZXNwb25zZS5kYXRhLnZhbHVlcykge1xuICAgICAgICAgICAgY29uc3QgbmFtZSA9IHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5QSE9ORV9OVU1CRVJfTkFNRV9DT0xVTU4pXTtcbiAgICAgICAgICAgIGNvbnN0IHJhd051bWJlciA9IHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5QSE9ORV9OVU1CRVJfTlVNQkVSX0NPTFVNTildO1xuICAgICAgICAgICAgaWYgKG5hbWUgJiYgcmF3TnVtYmVyKSB7XG4gICAgICAgICAgICAgICAgbWFwW25hbWVdID0gYCsxJHtzYW5pdGl6ZV9waG9uZV9udW1iZXIocmF3TnVtYmVyKX1gO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXA7XG4gICAgfVxuXG4vKipcbiAqIEFzc2lnbnMgdGhlIHNlY3Rpb24gdG8gdGhlIHBhdHJvbGxlci5cbiAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbH0gc2VjdGlvbiAtIFRoZSBzZWN0aW9uIHRvIGFzc2lnbi5cbiAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSByZXNwb25zZS5cbiAqL1xuYXN5bmMgYXNzaWduX3NlY3Rpb24oc2VjdGlvbjogc3RyaW5nIHwgbnVsbCk6IFByb21pc2U8QlZOU1BSZXNwb25zZT4ge1xuICAgIGNvbnN0IGFzc2lnbmVkU2VjdGlvbiA9IHNlY3Rpb24gPz8gXCJSb3ZpbmdcIjtcbiAgICBjb25zb2xlLmxvZyhgQXNzaWduaW5nIHNlY3Rpb24gJHt0aGlzLnBhdHJvbGxlciEubmFtZX0gdG8gJHthc3NpZ25lZFNlY3Rpb259YCk7XG4gICAgY29uc3QgbWFwcGVkX3NlY3Rpb24gPSB0aGlzLnNlY3Rpb25fdmFsdWVzLm1hcF9zZWN0aW9uKGFzc2lnbmVkU2VjdGlvbik7XG4gICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKGBhc3NpZ25fc2VjdGlvbigke21hcHBlZF9zZWN0aW9ufSlgKTtcbiAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG4gICAgYXdhaXQgbG9naW5fc2hlZXQuYXNzaWduX3NlY3Rpb24odGhpcy5wYXRyb2xsZXIhLCBtYXBwZWRfc2VjdGlvbik7XG4gICAgYXdhaXQgdGhpcy5sb2dpbl9zaGVldD8ucmVmcmVzaCgpO1xuICAgIGF3YWl0IHRoaXMuZ2V0X21hcHBlZF9wYXRyb2xsZXIodHJ1ZSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzcG9uc2U6IGBVcGRhdGVkICR7dGhpcy5wYXRyb2xsZXIhLm5hbWV9IHdpdGggc2VjdGlvbiBhc3NpZ25tZW50OiAke21hcHBlZF9zZWN0aW9ufS5gLFxuICAgIH07XG59XG5cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHN0YXR1cyBvZiB0aGUgcGF0cm9sbGVyLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBzdGF0dXMgcmVzcG9uc2UuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3N0YXR1cygpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuICAgICAgICBjb25zdCBzaGVldF9kYXRlID0gbG9naW5fc2hlZXQuc2hlZXRfZGF0ZS50b0RhdGVTdHJpbmcoKTtcbiAgICAgICAgY29uc3QgY3VycmVudF9kYXRlID0gbG9naW5fc2hlZXQuY3VycmVudF9kYXRlLnRvRGF0ZVN0cmluZygpO1xuICAgICAgICBpZiAoIWxvZ2luX3NoZWV0LmlzX2N1cnJlbnQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBzaGVldF9kYXRlOiAke2xvZ2luX3NoZWV0LnNoZWV0X2RhdGV9YCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgY3VycmVudF9kYXRlOiAke2xvZ2luX3NoZWV0LmN1cnJlbnRfZGF0ZX1gKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBTaGVldCBpcyBub3QgY3VycmVudCBmb3IgdG9kYXkgKGxhc3QgcmVzZXQ6ICR7c2hlZXRfZGF0ZX0pLiAke1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICAgICAgICAgIH0gaXMgbm90IGNoZWNrZWQgaW4gZm9yICR7Y3VycmVudF9kYXRlfS5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXNwb25zZSA9IHsgcmVzcG9uc2U6IGF3YWl0IHRoaXMuZ2V0X3N0YXR1c19zdHJpbmcoKSB9O1xuICAgICAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oXCJzdGF0dXNcIik7XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBzdGF0dXMgc3RyaW5nIG9mIHRoZSBwYXRyb2xsZXIuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c3RyaW5nPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgc3RhdHVzIHN0cmluZy5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfc3RhdHVzX3N0cmluZygpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG4gICAgICAgIGNvbnN0IGd1ZXN0X3Bhc3NfcHJvbWlzZSA9IChcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0X2d1ZXN0X3Bhc3Nfc2hlZXQoKVxuICAgICAgICApLmdldF9hdmFpbGFibGVfYW5kX3VzZWRfcGFzc2VzKHRoaXMucGF0cm9sbGVyIS5uYW1lKTtcbiAgICAgICAgY29uc3QgcGF0cm9sbGVyX3N0YXR1cyA9IHRoaXMucGF0cm9sbGVyITtcblxuICAgICAgICBjb25zdCBjaGVja2luQ29sdW1uU2V0ID1cbiAgICAgICAgICAgIHBhdHJvbGxlcl9zdGF0dXMuY2hlY2tpbiAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICBwYXRyb2xsZXJfc3RhdHVzLmNoZWNraW4gIT09IG51bGw7XG4gICAgICAgIGNvbnN0IGNoZWNrZWRPdXQgPVxuICAgICAgICAgICAgY2hlY2tpbkNvbHVtblNldCAmJlxuICAgICAgICAgICAgdGhpcy5jaGVja2luX3ZhbHVlcy5ieV9zaGVldF9zdHJpbmdbcGF0cm9sbGVyX3N0YXR1cy5jaGVja2luXS5rZXkgPT1cbiAgICAgICAgICAgICAgICBcIm91dFwiO1xuICAgICAgICBsZXQgc3RhdHVzID0gcGF0cm9sbGVyX3N0YXR1cy5jaGVja2luIHx8IFwiTm90IFByZXNlbnRcIjtcblxuICAgICAgICBpZiAoY2hlY2tlZE91dCkge1xuICAgICAgICAgICAgc3RhdHVzID0gXCJDaGVja2VkIE91dFwiO1xuICAgICAgICB9IGVsc2UgaWYgKGNoZWNraW5Db2x1bW5TZXQpIHtcbiAgICAgICAgICAgIGxldCBzZWN0aW9uID0gcGF0cm9sbGVyX3N0YXR1cy5zZWN0aW9uLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBpZiAoc2VjdGlvbi5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgICAgIHNlY3Rpb24gPSBgU2VjdGlvbiAke3NlY3Rpb259YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0YXR1cyA9IGAke3BhdHJvbGxlcl9zdGF0dXMuY2hlY2tpbn0gKCR7c2VjdGlvbn0pYDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbXBsZXRlZFBhdHJvbERheXMgPSBhd2FpdCAoXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmdldF9zZWFzb25fc2hlZXQoKVxuICAgICAgICApLmdldF9wYXRyb2xsZWRfZGF5cyh0aGlzLnBhdHJvbGxlciEubmFtZSk7XG4gICAgICAgIGNvbnN0IGNvbXBsZXRlZFBhdHJvbERheXNTdHJpbmcgPVxuICAgICAgICAgICAgY29tcGxldGVkUGF0cm9sRGF5cyA+IDAgPyBjb21wbGV0ZWRQYXRyb2xEYXlzLnRvU3RyaW5nKCkgOiBcIk5vXCI7XG4gICAgICAgIGNvbnN0IGxvZ2luU2hlZXREYXRlID0gbG9naW5fc2hlZXQuc2hlZXRfZGF0ZS50b0RhdGVTdHJpbmcoKTtcblxuICAgICAgICBsZXQgc3RhdHVzU3RyaW5nID0gYFN0YXR1cyBmb3IgJHtcbiAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyIS5uYW1lXG4gICAgICAgIH0gb24gZGF0ZSAke2xvZ2luU2hlZXREYXRlfTogJHtzdGF0dXN9LlxcbiR7Y29tcGxldGVkUGF0cm9sRGF5c1N0cmluZ30gY29tcGxldGVkIHBhdHJvbCBkYXlzIHByaW9yIHRvIHRvZGF5LmA7XG4gICAgICAgIGNvbnN0IHVzZWRUb2RheUd1ZXN0UGFzc2VzID0gKGF3YWl0IGd1ZXN0X3Bhc3NfcHJvbWlzZSk/LnVzZWRfdG9kYXkgfHwgMDtcbiAgICAgICAgY29uc3QgdXNlZFNlYXNvbkd1ZXN0UGFzc2VzID1cbiAgICAgICAgICAgIChhd2FpdCBndWVzdF9wYXNzX3Byb21pc2UpPy51c2VkX3NlYXNvbiB8fCAwO1xuICAgICAgICBjb25zdCBhdmFpbGFibGVHdWVzdFBhc3NlcyA9IChhd2FpdCBndWVzdF9wYXNzX3Byb21pc2UpPy5hdmFpbGFibGUgfHwgMDtcblxuXG4gICAgICAgIHN0YXR1c1N0cmluZyArPVxuICAgICAgICAgICAgXCIgXCIgK1xuICAgICAgICAgICAgYnVpbGRfcGFzc2VzX3N0cmluZyhcbiAgICAgICAgICAgICAgICB1c2VkU2Vhc29uR3Vlc3RQYXNzZXMsXG4gICAgICAgICAgICAgICAgdXNlZFNlYXNvbkd1ZXN0UGFzc2VzICsgYXZhaWxhYmxlR3Vlc3RQYXNzZXMsXG4gICAgICAgICAgICAgICAgdXNlZFRvZGF5R3Vlc3RQYXNzZXNcbiAgICAgICAgICAgICk7XG4gICAgICAgIHJldHVybiBzdGF0dXNTdHJpbmc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgdGhlIGNoZWNrLWluIHByb2Nlc3MgZm9yIHRoZSBwYXRyb2xsZXIgb25jZSB0aGUgY2hlY2staW4gbW9kZSBpcyBzZXQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGNoZWNrLWluIHJlc3BvbnNlLlxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBUaHJvd3MgYW4gZXJyb3IgaWYgdGhlIGNoZWNrLWluIG1vZGUgaXMgaW1wcm9wZXJseSBzZXQuXG4gICAgICovXG4gICAgYXN5bmMgY2hlY2tpbigpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICBgUGVyZm9ybWluZyByZWd1bGFyIGNoZWNraW4gZm9yICR7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXIhLm5hbWVcbiAgICAgICAgICAgIH0gd2l0aCBtb2RlOiAke3RoaXMuY2hlY2tpbl9tb2RlfWBcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGF3YWl0IHRoaXMuc2hlZXRfbmVlZHNfcmVzZXQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTpcbiAgICAgICAgICAgICAgICAgICAgYCR7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICAgICAgICAgICAgICB9LCB5b3UgYXJlIHRoZSBmaXJzdCBwZXJzb24gdG8gY2hlY2sgaW4gdG9kYXkuIGAgK1xuICAgICAgICAgICAgICAgICAgICBgSSBuZWVkIHRvIGFyY2hpdmUgYW5kIHJlc2V0IHRoZSBzaGVldCBiZWZvcmUgY29udGludWluZy4gYCArXG4gICAgICAgICAgICAgICAgICAgIGBXb3VsZCB5b3UgbGlrZSBtZSB0byBkbyB0aGF0PyAoWWVzL05vKWAsXG4gICAgICAgICAgICAgICAgbmV4dF9zdGVwOiBgJHtORVhUX1NURVBTLkNPTkZJUk1fUkVTRVR9LSR7dGhpcy5jaGVja2luX21vZGV9YCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNoZWNraW5fbW9kZTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgIXRoaXMuY2hlY2tpbl9tb2RlIHx8XG4gICAgICAgICAgICAoY2hlY2tpbl9tb2RlID0gdGhpcy5jaGVja2luX3ZhbHVlcy5ieV9rZXlbdGhpcy5jaGVja2luX21vZGVdKSA9PT1cbiAgICAgICAgICAgICAgICB1bmRlZmluZWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDaGVja2luIG1vZGUgaW1wcm9wZXJseSBzZXRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG4gICAgICAgIGNvbnN0IG5ld19jaGVja2luX3ZhbHVlID0gY2hlY2tpbl9tb2RlLnNoZWV0c192YWx1ZTtcbiAgICAgICAgYXdhaXQgbG9naW5fc2hlZXQuY2hlY2tpbih0aGlzLnBhdHJvbGxlciEsIG5ld19jaGVja2luX3ZhbHVlKTtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKGB1cGRhdGUtc3RhdHVzKCR7bmV3X2NoZWNraW5fdmFsdWV9KWApO1xuICAgICAgICBhd2FpdCB0aGlzLmxvZ2luX3NoZWV0Py5yZWZyZXNoKCk7XG4gICAgICAgIGF3YWl0IHRoaXMuZ2V0X21hcHBlZF9wYXRyb2xsZXIodHJ1ZSk7XG5cbiAgICAgICAgbGV0IHJlc3BvbnNlID0gYFVwZGF0aW5nICR7XG4gICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICB9IHdpdGggc3RhdHVzOiAke25ld19jaGVja2luX3ZhbHVlfS5gO1xuICAgICAgICBpZiAoIXRoaXMuZmFzdF9jaGVja2luKSB7XG4gICAgICAgICAgICByZXNwb25zZSArPSBgIFlvdSBjYW4gc2VuZCAnJHtjaGVja2luX21vZGUuZmFzdF9jaGVja2luc1swXX0nIGFzIHlvdXIgZmlyc3QgbWVzc2FnZSBmb3IgYSBmYXN0ICR7Y2hlY2tpbl9tb2RlLnNoZWV0c192YWx1ZX0gY2hlY2tpbiBuZXh0IHRpbWUuYDtcbiAgICAgICAgfVxuICAgICAgICByZXNwb25zZSArPSBcIlxcblxcblwiICsgKGF3YWl0IHRoaXMuZ2V0X3N0YXR1c19zdHJpbmcoKSk7XG4gICAgICAgIHJldHVybiB7IHJlc3BvbnNlOiByZXNwb25zZSB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGUgR29vZ2xlIFNoZWV0cyBuZWVkcyB0byBiZSByZXNldC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdHJ1ZSBpZiB0aGUgc2hlZXQgbmVlZHMgdG8gYmUgcmVzZXQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKi9cbiAgICBhc3luYyBzaGVldF9uZWVkc19yZXNldCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuXG4gICAgICAgIGNvbnN0IHNoZWV0X2RhdGUgPSBsb2dpbl9zaGVldC5zaGVldF9kYXRlO1xuICAgICAgICBjb25zdCBjdXJyZW50X2RhdGUgPSBsb2dpbl9zaGVldC5jdXJyZW50X2RhdGU7XG4gICAgICAgIGNvbnNvbGUubG9nKGBzaGVldF9kYXRlOiAke3NoZWV0X2RhdGV9YCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBjdXJyZW50X2RhdGU6ICR7Y3VycmVudF9kYXRlfWApO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGBkYXRlX2lzX2N1cnJlbnQ6ICR7bG9naW5fc2hlZXQuaXNfY3VycmVudH1gKTtcblxuICAgICAgICByZXR1cm4gIWxvZ2luX3NoZWV0LmlzX2N1cnJlbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzZXRzIHRoZSBHb29nbGUgU2hlZXRzIGZsb3csIGluY2x1ZGluZyBhcmNoaXZpbmcgYW5kIHJlc2V0dGluZyB0aGUgc2hlZXQgaWYgbmVjZXNzYXJ5LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2UgfCB2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgY2hlY2staW4gcmVzcG9uc2Ugb3Igdm9pZC5cbiAgICAgKi9cbiAgICBhc3luYyByZXNldF9zaGVldF9mbG93KCk6IFByb21pc2U8QlZOU1BSZXNwb25zZSB8IHZvaWQ+IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmNoZWNrX3VzZXJfY3JlZHMoXG4gICAgICAgICAgICBgJHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICAgICAgfSwgaW4gb3JkZXIgdG8gcmVzZXQvYXJjaGl2ZSwgSSBuZWVkIHlvdSB0byBhdXRob3JpemUgdGhlIGFwcC5gXG4gICAgICAgICk7XG4gICAgICAgIGlmIChyZXNwb25zZSlcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IHJlc3BvbnNlLnJlc3BvbnNlLFxuICAgICAgICAgICAgICAgIG5leHRfc3RlcDogYCR7TkVYVF9TVEVQUy5BVVRIX1JFU0VUfS0ke3RoaXMuY2hlY2tpbl9tb2RlfWAsXG4gICAgICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5yZXNldF9zaGVldCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc2V0cyB0aGUgR29vZ2xlIFNoZWV0cywgaW5jbHVkaW5nIGFyY2hpdmluZyBhbmQgcmVzZXR0aW5nIHRoZSBzaGVldC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgc2hlZXQgaXMgcmVzZXQuXG4gICAgICovXG4gICAgYXN5bmMgcmVzZXRfc2hlZXQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IHNjcmlwdF9zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfdXNlcl9zY3JpcHRzX3NlcnZpY2UoKTtcbiAgICAgICAgY29uc3Qgc2hvdWxkX3BlcmZvcm1fYXJjaGl2ZSA9ICEoYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKSkuYXJjaGl2ZWQ7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBzaG91bGRfcGVyZm9ybV9hcmNoaXZlXG4gICAgICAgICAgICA/IFwiT2theS4gQXJjaGl2aW5nIGFuZCByZXNldHRpbmcgdGhlIGNoZWNrIGluIHNoZWV0LiBUaGlzIHRha2VzIGFib3V0IDEwIHNlY29uZHMuLi5cIlxuICAgICAgICAgICAgOiBcIk9rYXkuIFNoZWV0IGhhcyBhbHJlYWR5IGJlZW4gYXJjaGl2ZWQuIFBlcmZvcm1pbmcgcmVzZXQuIFRoaXMgdGFrZXMgYWJvdXQgNSBzZWNvbmRzLi4uXCI7XG4gICAgICAgIGF3YWl0IHRoaXMuc2VuZF9tZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICBpZiAoc2hvdWxkX3BlcmZvcm1fYXJjaGl2ZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJBcmNoaXZpbmcuLi5cIik7XG5cbiAgICAgICAgICAgIGF3YWl0IHNjcmlwdF9zZXJ2aWNlLnNjcmlwdHMucnVuKHtcbiAgICAgICAgICAgICAgICBzY3JpcHRJZDogdGhpcy5yZXNldF9zY3JpcHRfaWQsXG4gICAgICAgICAgICAgICAgcmVxdWVzdEJvZHk6IHsgZnVuY3Rpb246IHRoaXMuY29uZmlnLkFSQ0hJVkVfRlVOQ1RJT05fTkFNRSB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmRlbGF5KDUpO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKFwiYXJjaGl2ZVwiKTtcbiAgICAgICAgICAgIHRoaXMubG9naW5fc2hlZXQgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJSZXNldHRpbmcuLi5cIik7XG4gICAgICAgIGF3YWl0IHNjcmlwdF9zZXJ2aWNlLnNjcmlwdHMucnVuKHtcbiAgICAgICAgICAgIHNjcmlwdElkOiB0aGlzLnJlc2V0X3NjcmlwdF9pZCxcbiAgICAgICAgICAgIHJlcXVlc3RCb2R5OiB7IGZ1bmN0aW9uOiB0aGlzLmNvbmZpZy5SRVNFVF9GVU5DVElPTl9OQU1FIH0sXG4gICAgICAgIH0pO1xuICAgICAgICBhd2FpdCB0aGlzLmRlbGF5KDUpO1xuICAgICAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oXCJyZXNldFwiKTtcbiAgICAgICAgYXdhaXQgdGhpcy5zZW5kX21lc3NhZ2UoXCJEb25lLlwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBHb29nbGUgQXBwcyBTY3JpcHQgc2VydmljZS5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzY3JpcHRfdjEuU2NyaXB0Pn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgR29vZ2xlIEFwcHMgU2NyaXB0IHNlcnZpY2UuXG4gICAgICovXG4gICAgYXN5bmMgY2hlY2tfdXNlcl9jcmVkcyhcbiAgICAgICAgcHJvbXB0X21lc3NhZ2U6IHN0cmluZyA9IFwiSGksIGJlZm9yZSB5b3UgY2FuIHVzZSBCVk5TUCBib3QsIHlvdSBtdXN0IGxvZ2luLlwiXG4gICAgKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlIHwgdW5kZWZpbmVkPiB7XG4gICAgICAgIGNvbnN0IHVzZXJfY3JlZHMgPSB0aGlzLmdldF91c2VyX2NyZWRzKCk7XG4gICAgICAgIGlmICghKGF3YWl0IHVzZXJfY3JlZHMubG9hZFRva2VuKCkpKSB7XG4gICAgICAgICAgICBjb25zdCBhdXRoVXJsID0gYXdhaXQgdXNlcl9jcmVkcy5nZXRBdXRoVXJsKCk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgJHtwcm9tcHRfbWVzc2FnZX0gUGxlYXNlIGZvbGxvdyB0aGlzIGxpbms6XG4ke2F1dGhVcmx9XG5cbk1lc3NhZ2UgbWUgYWdhaW4gd2hlbiBkb25lLmAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgR29vZ2xlIEFwcHMgU2NyaXB0IHNlcnZpY2UuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c2NyaXB0X3YxLlNjcmlwdD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIEdvb2dsZSBBcHBzIFNjcmlwdCBzZXJ2aWNlLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF9vbl9kdXR5KCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIGNvbnN0IGNoZWNrZWRfb3V0X3NlY3Rpb24gPSBcIkNoZWNrZWQgT3V0XCI7XG4gICAgICAgIGNvbnN0IGxhc3Rfc2VjdGlvbnMgPSBbY2hlY2tlZF9vdXRfc2VjdGlvbl07XG4gICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKTtcblxuICAgICAgICBjb25zdCBvbl9kdXR5X3BhdHJvbGxlcnMgPSBsb2dpbl9zaGVldC5nZXRfb25fZHV0eV9wYXRyb2xsZXJzKCk7XG4gICAgICAgIGNvbnN0IGJ5X3NlY3Rpb24gPSBvbl9kdXR5X3BhdHJvbGxlcnNcbiAgICAgICAgICAgIC5maWx0ZXIoKHgpID0+IHguY2hlY2tpbilcbiAgICAgICAgICAgIC5yZWR1Y2UoKHByZXY6IHsgW2tleTogc3RyaW5nXTogUGF0cm9sbGVyUm93W10gfSwgY3VyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2hvcnRfY29kZSA9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tpbl92YWx1ZXMuYnlfc2hlZXRfc3RyaW5nW2N1ci5jaGVja2luXS5rZXk7XG4gICAgICAgICAgICAgICAgbGV0IHNlY3Rpb24gPSBjdXIuc2VjdGlvbjtcbiAgICAgICAgICAgICAgICBpZiAoc2hvcnRfY29kZSA9PSBcIm91dFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlY3Rpb24gPSBjaGVja2VkX291dF9zZWN0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIShzZWN0aW9uIGluIHByZXYpKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZbc2VjdGlvbl0gPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcHJldltzZWN0aW9uXS5wdXNoKGN1cik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByZXY7XG4gICAgICAgICAgICB9LCB7fSk7XG4gICAgICAgIGxldCByZXN1bHRzOiBzdHJpbmdbXVtdID0gW107XG4gICAgICAgIGxldCBhbGxfa2V5cyA9IE9iamVjdC5rZXlzKGJ5X3NlY3Rpb24pO1xuICAgICAgICBjb25zdCBvcmRlcmVkX3ByaW1hcnlfc2VjdGlvbnMgPSBPYmplY3Qua2V5cyhieV9zZWN0aW9uKVxuICAgICAgICAgICAgLmZpbHRlcigoeCkgPT4gIWxhc3Rfc2VjdGlvbnMuaW5jbHVkZXMoeCkpXG4gICAgICAgICAgICAuc29ydCgpO1xuICAgICAgICBjb25zdCBmaWx0ZXJlZF9sYXN0X3NlY3Rpb25zID0gbGFzdF9zZWN0aW9ucy5maWx0ZXIoKHgpID0+XG4gICAgICAgICAgICBhbGxfa2V5cy5pbmNsdWRlcyh4KVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBvcmRlcmVkX3NlY3Rpb25zID0gb3JkZXJlZF9wcmltYXJ5X3NlY3Rpb25zLmNvbmNhdChcbiAgICAgICAgICAgIGZpbHRlcmVkX2xhc3Rfc2VjdGlvbnNcbiAgICAgICAgKTtcblxuICAgICAgICBmb3IgKGNvbnN0IHNlY3Rpb24gb2Ygb3JkZXJlZF9zZWN0aW9ucykge1xuICAgICAgICAgICAgbGV0IHJlc3VsdDogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IHBhdHJvbGxlcnMgPSBieV9zZWN0aW9uW3NlY3Rpb25dLnNvcnQoKHgsIHkpID0+XG4gICAgICAgICAgICAgICAgeC5uYW1lLmxvY2FsZUNvbXBhcmUoeS5uYW1lKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChzZWN0aW9uLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKFwiU2VjdGlvbiBcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQucHVzaChgJHtzZWN0aW9ufTogYCk7XG4gICAgICAgICAgICBmdW5jdGlvbiBwYXRyb2xsZXJfc3RyaW5nKG5hbWU6IHN0cmluZywgc2hvcnRfY29kZTogc3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRldGFpbHMgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGlmIChzaG9ydF9jb2RlICE9PSBcImRheVwiICYmIHNob3J0X2NvZGUgIT09IFwib3V0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlscyA9IGAgKCR7c2hvcnRfY29kZS50b1VwcGVyQ2FzZSgpfSlgO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7bmFtZX0ke2RldGFpbHN9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFxuICAgICAgICAgICAgICAgIHBhdHJvbGxlcnNcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgoeCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdHJvbGxlcl9zdHJpbmcoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tpbl92YWx1ZXMuYnlfc2hlZXRfc3RyaW5nW3guY2hlY2tpbl0ua2V5XG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLmpvaW4oXCIsIFwiKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChyZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHRoaXMubG9nX2FjdGlvbihcIm9uLWR1dHlcIik7XG4gICAgICAgIHJldHVybiBgUGF0cm9sbGVycyBmb3IgJHtsb2dpbl9zaGVldC5zaGVldF9kYXRlLnRvRGF0ZVN0cmluZygpfSAoVG90YWw6ICR7XG4gICAgICAgICAgICBvbl9kdXR5X3BhdHJvbGxlcnMubGVuZ3RoXG4gICAgICAgIH0pOlxcbiR7cmVzdWx0cy5tYXAoKHIpID0+IHIuam9pbihcIlwiKSkuam9pbihcIlxcblwiKX1gO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvZ3MgYW4gYWN0aW9uIHRvIHRoZSBHb29nbGUgU2hlZXRzLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhY3Rpb25fbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBhY3Rpb24gdG8gbG9nLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBhY3Rpb24gaXMgbG9nZ2VkLlxuICAgICAqL1xuICAgIGFzeW5jIGxvZ19hY3Rpb24oYWN0aW9uX25hbWU6IHN0cmluZykge1xuICAgICAgICBjb25zdCBzaGVldHNfc2VydmljZSA9IGF3YWl0IHRoaXMuZ2V0X3NoZWV0c19zZXJ2aWNlKCk7XG4gICAgICAgIGF3YWl0IHNoZWV0c19zZXJ2aWNlLnNwcmVhZHNoZWV0cy52YWx1ZXMuYXBwZW5kKHtcbiAgICAgICAgICAgIHNwcmVhZHNoZWV0SWQ6IHRoaXMuY29tYmluZWRfY29uZmlnLlNIRUVUX0lELFxuICAgICAgICAgICAgcmFuZ2U6IHRoaXMuY29uZmlnLkFDVElPTl9MT0dfU0hFRVQsXG4gICAgICAgICAgICB2YWx1ZUlucHV0T3B0aW9uOiBcIlVTRVJfRU5URVJFRFwiLFxuICAgICAgICAgICAgcmVxdWVzdEJvZHk6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZXM6IFtbdGhpcy5wYXRyb2xsZXIhLm5hbWUsIG5ldyBEYXRlKCksIGFjdGlvbl9uYW1lXV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2dzIG91dCB0aGUgdXNlci5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgbG9nb3V0IHJlc3BvbnNlLlxuICAgICAqL1xuICAgIGFzeW5jIGxvZ291dCgpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgdXNlcl9jcmVkcyA9IHRoaXMuZ2V0X3VzZXJfY3JlZHMoKTtcbiAgICAgICAgYXdhaXQgdXNlcl9jcmVkcy5kZWxldGVUb2tlbigpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IFwiT2theSwgSSBoYXZlIHJlbW92ZWQgYWxsIGxvZ2luIHNlc3Npb24gaW5mb3JtYXRpb24uXCIsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgVHdpbGlvIGNsaWVudC5cbiAgICAgKiBAcmV0dXJucyB7VHdpbGlvQ2xpZW50fSBUaGUgVHdpbGlvIGNsaWVudC5cbiAgICAgKi9cbiAgICBnZXRfdHdpbGlvX2NsaWVudCgpIHtcbiAgICAgICAgaWYgKHRoaXMudHdpbGlvX2NsaWVudCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0d2lsaW9fY2xpZW50IHdhcyBuZXZlciBpbml0aWFsaXplZCFcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudHdpbGlvX2NsaWVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBUd2lsaW8gU3luYyBjbGllbnQuXG4gICAgICogQHJldHVybnMge1NlcnZpY2VDb250ZXh0fSBUaGUgVHdpbGlvIFN5bmMgY2xpZW50LlxuICAgICAqL1xuICAgIGdldF9zeW5jX2NsaWVudCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN5bmNfY2xpZW50KSB7XG4gICAgICAgICAgICB0aGlzLnN5bmNfY2xpZW50ID0gdGhpcy5nZXRfdHdpbGlvX2NsaWVudCgpLnN5bmMudjEuc2VydmljZXMoXG4gICAgICAgICAgICAgICAgdGhpcy5zeW5jX3NpZFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zeW5jX2NsaWVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB1c2VyIGNyZWRlbnRpYWxzLlxuICAgICAqIEByZXR1cm5zIHtVc2VyQ3JlZHN9IFRoZSB1c2VyIGNyZWRlbnRpYWxzLlxuICAgICAqL1xuICAgIGdldF91c2VyX2NyZWRzKCkge1xuICAgICAgICBpZiAoIXRoaXMudXNlcl9jcmVkcykge1xuICAgICAgICAgICAgdGhpcy51c2VyX2NyZWRzID0gbmV3IFVzZXJDcmVkcyhcbiAgICAgICAgICAgICAgICB0aGlzLmdldF9zeW5jX2NsaWVudCgpLFxuICAgICAgICAgICAgICAgIHRoaXMuZnJvbSxcbiAgICAgICAgICAgICAgICB0aGlzLmNvbWJpbmVkX2NvbmZpZ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy51c2VyX2NyZWRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHNlcnZpY2UgY3JlZGVudGlhbHMuXG4gICAgICogQHJldHVybnMge0dvb2dsZUF1dGh9IFRoZSBzZXJ2aWNlIGNyZWRlbnRpYWxzLlxuICAgICAqL1xuICAgIGdldF9zZXJ2aWNlX2NyZWRzKCkge1xuICAgICAgICBpZiAoIXRoaXMuc2VydmljZV9jcmVkcykge1xuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlX2NyZWRzID0gbmV3IGdvb2dsZS5hdXRoLkdvb2dsZUF1dGgoe1xuICAgICAgICAgICAgICAgIGtleUZpbGU6IGdldF9zZXJ2aWNlX2NyZWRlbnRpYWxzX3BhdGgoKSxcbiAgICAgICAgICAgICAgICBzY29wZXM6IHRoaXMuU0NPUEVTLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZV9jcmVkcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB2YWxpZCBjcmVkZW50aWFscy5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtyZXF1aXJlX3VzZXJfY3JlZHM9ZmFsc2VdIC0gV2hldGhlciB1c2VyIGNyZWRlbnRpYWxzIGFyZSByZXF1aXJlZC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxHb29nbGVBdXRoPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgdmFsaWQgY3JlZGVudGlhbHMuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3ZhbGlkX2NyZWRzKHJlcXVpcmVfdXNlcl9jcmVkczogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5VU0VfU0VSVklDRV9BQ0NPVU5UICYmICFyZXF1aXJlX3VzZXJfY3JlZHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldF9zZXJ2aWNlX2NyZWRzKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXNlcl9jcmVkcyA9IHRoaXMuZ2V0X3VzZXJfY3JlZHMoKTtcbiAgICAgICAgaWYgKCEoYXdhaXQgdXNlcl9jcmVkcy5sb2FkVG9rZW4oKSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVzZXIgaXMgbm90IGF1dGhlZC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJVc2luZyB1c2VyIGFjY291bnQgZm9yIHNlcnZpY2UgYXV0aC4uLlwiKTtcbiAgICAgICAgcmV0dXJuIHVzZXJfY3JlZHMub2F1dGgyX2NsaWVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBHb29nbGUgU2hlZXRzIHNlcnZpY2UuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c2hlZXRzX3Y0LlNoZWV0cz59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIEdvb2dsZSBTaGVldHMgc2VydmljZS5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfc2hlZXRzX3NlcnZpY2UoKSB7XG4gICAgICAgIGlmICghdGhpcy5zaGVldHNfc2VydmljZSkge1xuICAgICAgICAgICAgdGhpcy5zaGVldHNfc2VydmljZSA9IGdvb2dsZS5zaGVldHMoe1xuICAgICAgICAgICAgICAgIHZlcnNpb246IFwidjRcIixcbiAgICAgICAgICAgICAgICBhdXRoOiBhd2FpdCB0aGlzLmdldF92YWxpZF9jcmVkcygpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2hlZXRzX3NlcnZpY2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbG9naW4gc2hlZXQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8TG9naW5TaGVldD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGxvZ2luIHNoZWV0XG4gICAgICovXG4gICAgYXN5bmMgZ2V0X2xvZ2luX3NoZWV0KCkge1xuICAgICAgICBpZiAoIXRoaXMubG9naW5fc2hlZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0X2NvbmZpZzogTG9naW5TaGVldENvbmZpZyA9IHRoaXMuY29tYmluZWRfY29uZmlnO1xuICAgICAgICAgICAgY29uc3Qgc2hlZXRzX3NlcnZpY2UgPSBhd2FpdCB0aGlzLmdldF9zaGVldHNfc2VydmljZSgpO1xuICAgICAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBuZXcgTG9naW5TaGVldChcbiAgICAgICAgICAgICAgICBzaGVldHNfc2VydmljZSxcbiAgICAgICAgICAgICAgICBsb2dpbl9zaGVldF9jb25maWdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBhd2FpdCBsb2dpbl9zaGVldC5yZWZyZXNoKCk7XG4gICAgICAgICAgICB0aGlzLmxvZ2luX3NoZWV0ID0gbG9naW5fc2hlZXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubG9naW5fc2hlZXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgc2Vhc29uIHNoZWV0LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFNlYXNvblNoZWV0Pn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgc2Vhc29uIHNoZWV0XG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3NlYXNvbl9zaGVldCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNlYXNvbl9zaGVldCkge1xuICAgICAgICAgICAgY29uc3Qgc2Vhc29uX3NoZWV0X2NvbmZpZzogU2Vhc29uU2hlZXRDb25maWcgPSB0aGlzLmNvbWJpbmVkX2NvbmZpZztcbiAgICAgICAgICAgIGNvbnN0IHNoZWV0c19zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfc2hlZXRzX3NlcnZpY2UoKTtcbiAgICAgICAgICAgIHRoaXMuc2Vhc29uX3NoZWV0ID0gbmV3IFNlYXNvblNoZWV0KFxuICAgICAgICAgICAgICAgIHNoZWV0c19zZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHNlYXNvbl9zaGVldF9jb25maWdcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2Vhc29uX3NoZWV0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGd1ZXN0IHBhc3Mgc2hlZXQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8R3Vlc3RQYXNzU2hlZXQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBndWVzdCBwYXNzIHNoZWV0XG4gICAgICovXG4gICAgYXN5bmMgZ2V0X2d1ZXN0X3Bhc3Nfc2hlZXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5ndWVzdF9wYXNzX3NoZWV0KSB7XG4gICAgICAgICAgICBjb25zdCBjb25maWc6IEd1ZXN0UGFzc2VzQ29uZmlnID0gdGhpcy5jb21iaW5lZF9jb25maWc7XG4gICAgICAgICAgICBjb25zdCBzaGVldHNfc2VydmljZSA9IGF3YWl0IHRoaXMuZ2V0X3NoZWV0c19zZXJ2aWNlKCk7XG4gICAgICAgICAgICB0aGlzLmd1ZXN0X3Bhc3Nfc2hlZXQgPSBuZXcgR3Vlc3RQYXNzU2hlZXQoc2hlZXRzX3NlcnZpY2UsIGNvbmZpZyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZ3Vlc3RfcGFzc19zaGVldDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIEdvb2dsZSBBcHBzIFNjcmlwdCBzZXJ2aWNlLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHNjcmlwdF92MS5TY3JpcHQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBHb29nbGUgQXBwcyBTY3JpcHQgc2VydmljZS5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfdXNlcl9zY3JpcHRzX3NlcnZpY2UoKSB7XG4gICAgICAgIGlmICghdGhpcy51c2VyX3NjcmlwdHNfc2VydmljZSkge1xuICAgICAgICAgICAgdGhpcy51c2VyX3NjcmlwdHNfc2VydmljZSA9IGdvb2dsZS5zY3JpcHQoe1xuICAgICAgICAgICAgICAgIHZlcnNpb246IFwidjFcIixcbiAgICAgICAgICAgICAgICBhdXRoOiBhd2FpdCB0aGlzLmdldF92YWxpZF9jcmVkcyh0cnVlKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJfc2NyaXB0c19zZXJ2aWNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG1hcHBlZCBwYXRyb2xsZXIuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbZm9yY2U9ZmFsc2VdIC0gV2hldGhlciB0byBmb3JjZSB0aGUgcGF0cm9sbGVyIHRvIGJlIGZvdW5kLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2UgfCB2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcmVzcG9uc2Ugb3Igdm9pZC5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfbWFwcGVkX3BhdHJvbGxlcihmb3JjZTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IHBob25lX2xvb2t1cCA9IGF3YWl0IHRoaXMuZmluZF9wYXRyb2xsZXJfZnJvbV9udW1iZXIoKTtcbiAgICAgICAgaWYgKHBob25lX2xvb2t1cCA9PT0gdW5kZWZpbmVkIHx8IHBob25lX2xvb2t1cCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGZvcmNlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGZpbmQgYXNzb2NpYXRlZCB1c2VyXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYFNvcnJ5LCBJIGNvdWxkbid0IGZpbmQgYW4gYXNzb2NpYXRlZCBCVk5TUCBtZW1iZXIgd2l0aCB5b3VyIHBob25lIG51bWJlciAoJHt0aGlzLmZyb219KWAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuICAgICAgICBjb25zdCBtYXBwZWRQYXRyb2xsZXIgPSBsb2dpbl9zaGVldC50cnlfZmluZF9wYXRyb2xsZXIoXG4gICAgICAgICAgICBwaG9uZV9sb29rdXAubmFtZVxuICAgICAgICApO1xuICAgICAgICBpZiAobWFwcGVkUGF0cm9sbGVyID09PSBcIm5vdF9mb3VuZFwiKSB7XG4gICAgICAgICAgICBpZiAoZm9yY2UpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgcGF0cm9sbGVyIGluIGxvZ2luIHNoZWV0XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYENvdWxkIG5vdCBmaW5kIHBhdHJvbGxlciAnJHtwaG9uZV9sb29rdXAubmFtZX0nIGluIGxvZ2luIHNoZWV0LiBQbGVhc2UgbG9vayBhdCB0aGUgbG9naW4gc2hlZXQgbmFtZSwgYW5kIGNvcHkgaXQgdG8gdGhlIFBob25lIE51bWJlcnMgdGFiLmAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3VycmVudF9zaGVldF9kYXRlID0gbG9naW5fc2hlZXQuY3VycmVudF9kYXRlO1xuICAgICAgICB0aGlzLnBhdHJvbGxlciA9IG1hcHBlZFBhdHJvbGxlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaW5kcyB0aGUgcGF0cm9sbGVyIGZyb20gdGhlIHBob25lIG51bWJlci5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxQYXRyb2xsZXJSb3c+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBwYXRyb2xsZXIuXG4gICAgICovXG4gICAgYXN5bmMgZmluZF9wYXRyb2xsZXJfZnJvbV9udW1iZXIoKSB7XG4gICAgICAgIGNvbnN0IHJhd19udW1iZXIgPSB0aGlzLmZyb207XG4gICAgICAgIGNvbnN0IHNoZWV0c19zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfc2hlZXRzX3NlcnZpY2UoKTtcbiAgICAgICAgY29uc3Qgb3B0czogRmluZFBhdHJvbGxlckNvbmZpZyA9IHRoaXMuY29tYmluZWRfY29uZmlnO1xuICAgICAgICBjb25zdCBudW1iZXIgPSBzYW5pdGl6ZV9waG9uZV9udW1iZXIocmF3X251bWJlcik7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgc2hlZXRzX3NlcnZpY2Uuc3ByZWFkc2hlZXRzLnZhbHVlcy5nZXQoe1xuICAgICAgICAgICAgc3ByZWFkc2hlZXRJZDogb3B0cy5TSEVFVF9JRCxcbiAgICAgICAgICAgIHJhbmdlOiBvcHRzLlBIT05FX05VTUJFUl9MT09LVVBfU0hFRVQsXG4gICAgICAgICAgICB2YWx1ZVJlbmRlck9wdGlvbjogXCJVTkZPUk1BVFRFRF9WQUxVRVwiLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhLnZhbHVlcykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGZpbmQgcGF0cm9sbGVyLlwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS52YWx1ZXNcbiAgICAgICAgICAgIC5tYXAoKHJvdykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJhd051bWJlciA9XG4gICAgICAgICAgICAgICAgICAgIHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5QSE9ORV9OVU1CRVJfTlVNQkVSX0NPTFVNTildO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnROdW1iZXIgPVxuICAgICAgICAgICAgICAgICAgICByYXdOdW1iZXIgIT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHNhbml0aXplX3Bob25lX251bWJlcihyYXdOdW1iZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHJhd051bWJlcjtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50TmFtZSA9XG4gICAgICAgICAgICAgICAgICAgIHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5QSE9ORV9OVU1CRVJfTkFNRV9DT0xVTU4pXTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge25hbWU6IGN1cnJlbnROYW1lLCBudW1iZXI6IGN1cnJlbnROdW1iZXJ9O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5maWx0ZXIoKHBhdHJvbGxlcikgPT4gcGF0cm9sbGVyLm51bWJlciA9PT0gbnVtYmVyKVswXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm9tcHRzIHRoZSB1c2VyIGZvciBhIGNvbXAgb3IgbWFuYWdlciBwYXNzLlxuICAgICAqIFdlIGRvIG5vdCByZXF1aXJlIGEgZ3Vlc3QgbmFtZSBpbiB0aGUgU01TIGZsb3c7IHRoaXMgcmV0dXJucyB0aGUgc3RhdHVzL3Byb21wdFxuICAgICAqIGZvciBndWVzdCBwYXNzZXMgc28gdGhlIEd1ZXN0IFBhc3MgY29tbWFuZCBiZWhhdmVzIGxpa2Ugb3RoZXIgaW1tZWRpYXRlIGFjdGlvbnMuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHJlc3BvbnNlLlxuICAgICAqL1xuICAgIGFzeW5jIHByb21wdF9ndWVzdF9wYXNzKCk6IFByb21pc2U8QlZOU1BSZXNwb25zZT4ge1xuICAgICAgICAvLyBBbGxvdyBhbGwgcGF0cm9sbGVycyAoaW5jbHVkaW5nIGNhbmRpZGF0ZXMpIHRvIHVzZSBndWVzdCBwYXNzZXMgd2hlbiBhdmFpbGFibGUuXG4gICAgICAgIGNvbnN0IHNoZWV0ID0gYXdhaXQgdGhpcy5nZXRfZ3Vlc3RfcGFzc19zaGVldCgpO1xuICAgICAgICBjb25zdCB1c2VkX2FuZF9hdmFpbGFibGUgPSBhd2FpdCBzaGVldC5nZXRfYXZhaWxhYmxlX2FuZF91c2VkX3Bhc3Nlcyh0aGlzLnBhdHJvbGxlciEubmFtZSk7XG4gICAgICAgIGlmICh1c2VkX2FuZF9hdmFpbGFibGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgcmVzcG9uc2U6IFwiUHJvYmxlbSBsb29raW5nIHVwIHBhdHJvbGxlciBmb3IgZ3Vlc3QgcGFzc2VzXCIgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHRoZXJlIGFyZSBubyBhdmFpbGFibGUgcGFzc2VzIHRvZGF5LCByZXR1cm4gdGhlIHByb21wdCBpbmRpY2F0aW5nIG5vbmUgYXJlIGF2YWlsYWJsZS5cbiAgICAgICAgaWYgKHVzZWRfYW5kX2F2YWlsYWJsZS5hdmFpbGFibGUgPCAxKSB7XG4gICAgICAgICAgICByZXR1cm4gdXNlZF9hbmRfYXZhaWxhYmxlLmdldF9wcm9tcHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENvbnN1bWUgb25lIGF2YWlsYWJsZSBwYXNzICh0aGUgc2hlZXQgcmVjb3JkcyBvbmx5IHRoZSBkYXRlIG9mIHVzZSkuXG4gICAgICAgIGF3YWl0IHNoZWV0LnNldF91c2VkX2d1ZXN0X3Bhc3Nlcyh1c2VkX2FuZF9hdmFpbGFibGUpO1xuXG4gICAgICAgIC8vIFJlLXJlYWQgdGhlIHZhbHVlcyBhbmQgcmV0dXJuIGNvbmZpcm1hdGlvbiArIHVwZGF0ZWQgc3RhdHVzLlxuICAgICAgICBjb25zdCB1cGRhdGVkID0gYXdhaXQgc2hlZXQuZ2V0X2F2YWlsYWJsZV9hbmRfdXNlZF9wYXNzZXModGhpcy5wYXRyb2xsZXIhLm5hbWUpO1xuICAgICAgICBpZiAodXBkYXRlZCA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4geyByZXNwb25zZTogYFVwZGF0ZWQgJHt0aGlzLnBhdHJvbGxlciEubmFtZX0gdG8gdXNlIGEgZ3Vlc3QgcGFzcyB0b2RheS5gIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzdGF0dXMgPSBidWlsZF9wYXNzZXNfc3RyaW5nKFxuICAgICAgICAgICAgdXBkYXRlZC51c2VkX3NlYXNvbixcbiAgICAgICAgICAgIHVwZGF0ZWQudXNlZF9zZWFzb24gKyB1cGRhdGVkLmF2YWlsYWJsZSxcbiAgICAgICAgICAgIHVwZGF0ZWQudXNlZF90b2RheVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IGBVcGRhdGVkICR7dGhpcy5wYXRyb2xsZXIhLm5hbWV9IHRvIHVzZSBhIGd1ZXN0IHBhc3MgdG9kYXkuXFxuJHtzdGF0dXN9YCxcbiAgICAgICAgfTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBzaGVldHNfdjQgfSBmcm9tIFwiZ29vZ2xlYXBpc1wiO1xuaW1wb3J0IHsgR3Vlc3RQYXNzZXNDb25maWcgfSBmcm9tIFwiLi4vZW52L2hhbmRsZXJfY29uZmlnXCI7XG5pbXBvcnQgeyBleGNlbF9yb3dfdG9faW5kZXgsIHJvd19jb2xfdG9fZXhjZWxfaW5kZXgsIHBhcnNlX2Jvb2xlYW5fY2VsbCB9IGZyb20gXCIuLi91dGlscy91dGlsXCI7XG5pbXBvcnQgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIgZnJvbSBcIi4uL3V0aWxzL2dvb2dsZV9zaGVldHNfc3ByZWFkc2hlZXRfdGFiXCI7XG5pbXBvcnQgeyBmb3JtYXRfZGF0ZV9mb3Jfc3ByZWFkc2hlZXRfdmFsdWUgfSBmcm9tIFwiLi4vdXRpbHMvZGF0ZXRpbWVfdXRpbFwiO1xuaW1wb3J0IHsgYnVpbGRfcGFzc2VzX3N0cmluZyB9IGZyb20gXCIuLi91dGlscy9ndWVzdF9wYXNzZXNcIjtcbmltcG9ydCB7IEJWTlNQUmVzcG9uc2UgfSBmcm9tIFwiLi4vaGFuZGxlcnMvYnZuc3BfaGFuZGxlclwiO1xuXG5leHBvcnQgY2xhc3MgVXNlZEFuZEF2YWlsYWJsZVBhc3NlcyB7XG4gICAgcm93OiBhbnlbXTtcbiAgICBpbmRleDogbnVtYmVyO1xuICAgIGVsaWdpYmxlOiBib29sZWFuO1xuICAgIGVsaWdpYmxlX3JlYXNvbjogc3RyaW5nO1xuICAgIGF2YWlsYWJsZTogbnVtYmVyO1xuICAgIHVzZWRfdG9kYXk6IG51bWJlcjtcbiAgICB1c2VkX3NlYXNvbjogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHJvdzogYW55W10sXG4gICAgICAgIGluZGV4OiBudW1iZXIsXG4gICAgICAgIGVsaWdpYmxlOiBhbnksXG4gICAgICAgIGVsaWdpYmxlX3JlYXNvbjogYW55LFxuICAgICAgICBhdmFpbGFibGU6IGFueSxcbiAgICAgICAgdXNlZF90b2RheTogYW55LFxuICAgICAgICB1c2VkX3NlYXNvbjogYW55XG4gICAgKSB7XG4gICAgICAgIHRoaXMucm93ID0gcm93O1xuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgICAgIHRoaXMuZWxpZ2libGUgPSBwYXJzZV9ib29sZWFuX2NlbGwoZWxpZ2libGUpO1xuICAgICAgICB0aGlzLmVsaWdpYmxlX3JlYXNvbiA9IFN0cmluZyhlbGlnaWJsZV9yZWFzb24gPz8gXCJcIik7XG4gICAgICAgIHRoaXMuYXZhaWxhYmxlID0gTnVtYmVyKGF2YWlsYWJsZSk7XG4gICAgICAgIHRoaXMudXNlZF90b2RheSA9IE51bWJlcih1c2VkX3RvZGF5KTtcbiAgICAgICAgdGhpcy51c2VkX3NlYXNvbiA9IE51bWJlcih1c2VkX3NlYXNvbik7XG4gICAgfVxuXG4gICAgZ2V0X3Byb21wdCgpOiBCVk5TUFJlc3BvbnNlIHtcbiAgICAgICAgaWYgKHRoaXMuYXZhaWxhYmxlID4gMCkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBidWlsZF9wYXNzZXNfc3RyaW5nKFxuICAgICAgICAgICAgICAgIHRoaXMudXNlZF9zZWFzb24sXG4gICAgICAgICAgICAgICAgdGhpcy5hdmFpbGFibGUgKyB0aGlzLnVzZWRfc2Vhc29uLFxuICAgICAgICAgICAgICAgIHRoaXMudXNlZF90b2RheSxcbiAgICAgICAgICAgICAgICB0cnVlXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmVsaWdpYmxlKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgWW91IGFyZSBub3QgZWxpZ2libGUgZm9yIGd1ZXN0IHBhc3Nlcy4gUmVhc29uOiAke3RoaXMuZWxpZ2libGVfcmVhc29ufWAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZTogXCJZb3UgZG8gbm90IGhhdmUgYW55IGd1ZXN0IHBhc3NlcyBhdmFpbGFibGUgdG9kYXlcIixcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQYXNzU2hlZXQge1xuICAgIHNoZWV0OiBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYjtcblxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihzaGVldDogR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIpIHtcbiAgICAgICAgdGhpcy5zaGVldCA9IHNoZWV0O1xuICAgIH1cblxuICAgIGFic3RyYWN0IGdldCBlbGlnaWJsZV9jb2x1bW4oKTogc3RyaW5nO1xuICAgIGFic3RyYWN0IGdldCBlbGlnaWJsZV9yZWFzb25fY29sdW1uKCk6IHN0cmluZztcbiAgICBhYnN0cmFjdCBnZXQgYXZhaWxhYmxlX2NvbHVtbigpOiBzdHJpbmc7XG4gICAgYWJzdHJhY3QgZ2V0IHVzZWRfdG9kYXlfY29sdW1uKCk6IHN0cmluZztcbiAgICBhYnN0cmFjdCBnZXQgdXNlZF9zZWFzb25fY29sdW1uKCk6IHN0cmluZztcbiAgICBhYnN0cmFjdCBnZXQgbmFtZV9jb2x1bW4oKTogc3RyaW5nO1xuICAgIGFic3RyYWN0IGdldCBzdGFydF9pbmRleCgpOiBudW1iZXI7XG4gICAgYWJzdHJhY3QgZ2V0IHNoZWV0X25hbWUoKTogc3RyaW5nO1xuXG4gICAgYXN5bmMgZ2V0X2F2YWlsYWJsZV9hbmRfdXNlZF9wYXNzZXMoXG4gICAgICAgIHBhdHJvbGxlcl9uYW1lOiBzdHJpbmdcbiAgICApOiBQcm9taXNlPFVzZWRBbmRBdmFpbGFibGVQYXNzZXMgfCBudWxsPiB7XG4gICAgICAgIGNvbnN0IHBhdHJvbGxlcl9yb3cgPSBhd2FpdCB0aGlzLnNoZWV0LmdldF9zaGVldF9yb3dfZm9yX3BhdHJvbGxlcihcbiAgICAgICAgICAgIHBhdHJvbGxlcl9uYW1lLFxuICAgICAgICAgICAgdGhpcy5uYW1lX2NvbHVtblxuICAgICAgICApO1xuICAgICAgICBpZiAocGF0cm9sbGVyX3JvdyA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBlbGlnaWJsZSA9XG4gICAgICAgICAgICBwYXRyb2xsZXJfcm93LnJvd1tleGNlbF9yb3dfdG9faW5kZXgodGhpcy5lbGlnaWJsZV9jb2x1bW4pXTtcbiAgICAgICAgY29uc3QgZWxpZ2libGVfcmVhc29uID1cbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cucm93W2V4Y2VsX3Jvd190b19pbmRleCh0aGlzLmVsaWdpYmxlX3JlYXNvbl9jb2x1bW4pXTtcbiAgICAgICAgY29uc3QgY3VycmVudF9kYXlfYXZhaWxhYmxlX3Bhc3NlcyA9XG4gICAgICAgICAgICBwYXRyb2xsZXJfcm93LnJvd1tleGNlbF9yb3dfdG9faW5kZXgodGhpcy5hdmFpbGFibGVfY29sdW1uKV07XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfZGF5X3VzZWRfcGFzc2VzID1cbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cucm93W2V4Y2VsX3Jvd190b19pbmRleCh0aGlzLnVzZWRfdG9kYXlfY29sdW1uKV07XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfc2Vhc29uX3VzZWRfcGFzc2VzID1cbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cucm93W2V4Y2VsX3Jvd190b19pbmRleCh0aGlzLnVzZWRfc2Vhc29uX2NvbHVtbildO1xuICAgICAgICByZXR1cm4gbmV3IFVzZWRBbmRBdmFpbGFibGVQYXNzZXMoXG4gICAgICAgICAgICBwYXRyb2xsZXJfcm93LnJvdyxcbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cuaW5kZXgsXG4gICAgICAgICAgICBlbGlnaWJsZSxcbiAgICAgICAgICAgIGVsaWdpYmxlX3JlYXNvbixcbiAgICAgICAgICAgIGN1cnJlbnRfZGF5X2F2YWlsYWJsZV9wYXNzZXMsXG4gICAgICAgICAgICBjdXJyZW50X2RheV91c2VkX3Bhc3NlcyxcbiAgICAgICAgICAgIGN1cnJlbnRfc2Vhc29uX3VzZWRfcGFzc2VzXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgYXN5bmMgc2V0X3VzZWRfZ3Vlc3RfcGFzc2VzKFxuICAgICAgICBwYXRyb2xsZXJfcm93OiBVc2VkQW5kQXZhaWxhYmxlUGFzc2VzLFxuICAgICkge1xuICAgICAgICBpZiAoIXBhdHJvbGxlcl9yb3cuZWxpZ2libGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICBgUGF0cm9sbGVyIGlzIG5vdCBlbGlnaWJsZSBmb3IgZ3Vlc3QgcGFzc2VzLiBSZWFzb246ICR7cGF0cm9sbGVyX3Jvdy5lbGlnaWJsZV9yZWFzb259YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGF0cm9sbGVyX3Jvdy5hdmFpbGFibGUgPCAxKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgYE5vdCBlbm91Z2ggYXZhaWxhYmxlIHBhc3NlczogQXZhaWxhYmxlOiAke3BhdHJvbGxlcl9yb3cuYXZhaWxhYmxlfSwgVXNlZCB0aGlzIHNlYXNvbjogICR7cGF0cm9sbGVyX3Jvdy51c2VkX3NlYXNvbn0sIFVzZWQgdG9kYXk6ICR7cGF0cm9sbGVyX3Jvdy51c2VkX3RvZGF5fWBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByb3dudW0gPSBwYXRyb2xsZXJfcm93LmluZGV4O1xuICAgICAgICBjb25zdCBzdGFydF9pbmRleCA9IHRoaXMuc3RhcnRfaW5kZXg7XG4gICAgICAgIGNvbnN0IHByaW9yX2xlbmd0aCA9IHBhdHJvbGxlcl9yb3cucm93Lmxlbmd0aCAtIHN0YXJ0X2luZGV4O1xuICAgICAgICBjb25zdCBjdXJyZW50X2RhdGVfc3RyaW5nID0gZm9ybWF0X2RhdGVfZm9yX3NwcmVhZHNoZWV0X3ZhbHVlKG5ldyBEYXRlKCkpO1xuXG4gICAgICAgIGNvbnN0IG5ld192YWxzID0gcGF0cm9sbGVyX3Jvdy5yb3dcbiAgICAgICAgICAgIC5zbGljZShzdGFydF9pbmRleClcbiAgICAgICAgICAgIC5tYXAoKHgpID0+IHg/LnRvU3RyaW5nKCkpO1xuXG4gICAgICAgIC8vIFJlY29yZCBvbmx5IHRoZSBkYXRlIG9mIHRoZSB1c2U7IG5vIGd1ZXN0IG5hbWUgaXMgc3RvcmVkLlxuICAgICAgICBuZXdfdmFscy5wdXNoKGN1cnJlbnRfZGF0ZV9zdHJpbmcpO1xuXG4gICAgICAgIGNvbnN0IHVwZGF0ZV9sZW5ndGggPSBNYXRoLm1heChwcmlvcl9sZW5ndGgsIG5ld192YWxzLmxlbmd0aCk7XG4gICAgICAgIHdoaWxlIChuZXdfdmFscy5sZW5ndGggPCB1cGRhdGVfbGVuZ3RoKSB7XG4gICAgICAgICAgICBuZXdfdmFscy5wdXNoKFwiXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZW5kX2luZGV4ID0gc3RhcnRfaW5kZXggKyB1cGRhdGVfbGVuZ3RoIC0gMTtcbiAgICAgICAgY29uc3QgcmFuZ2UgPSBgJHt0aGlzLnNoZWV0LnNoZWV0X25hbWV9ISR7cm93X2NvbF90b19leGNlbF9pbmRleChcbiAgICAgICAgICAgIHJvd251bSxcbiAgICAgICAgICAgIHN0YXJ0X2luZGV4XG4gICAgICAgICl9OiR7cm93X2NvbF90b19leGNlbF9pbmRleChyb3dudW0sIGVuZF9pbmRleCl9YDtcblxuICAgICAgICBjb25zb2xlLmxvZyhgVXBkYXRpbmcgJHtyYW5nZX0gd2l0aCAke25ld192YWxzLmxlbmd0aH0gdmFsdWVzYCk7XG4gICAgICAgIGF3YWl0IHRoaXMuc2hlZXQudXBkYXRlX3ZhbHVlcyhyYW5nZSwgW25ld192YWxzXSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgR3Vlc3RQYXNzU2hlZXQgZXh0ZW5kcyBQYXNzU2hlZXQge1xuICAgIGNvbmZpZzogR3Vlc3RQYXNzZXNDb25maWc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgc2hlZXRzX3NlcnZpY2U6IHNoZWV0c192NC5TaGVldHMgfCBudWxsLFxuICAgICAgICBjb25maWc6IEd1ZXN0UGFzc2VzQ29uZmlnXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgbmV3IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiKFxuICAgICAgICAgICAgICAgIHNoZWV0c19zZXJ2aWNlLFxuICAgICAgICAgICAgICAgIGNvbmZpZy5TSEVFVF9JRCxcbiAgICAgICAgICAgICAgICBjb25maWcuR1VFU1RfUEFTU19TSEVFVFxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICB9XG5cbiAgICBnZXQgc3RhcnRfaW5kZXgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGV4Y2VsX3Jvd190b19pbmRleChcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLkdVRVNUX1BBU1NfU0hFRVRfREFURVNfU1RBUlRJTkdfQ09MVU1OXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0IHNoZWV0X25hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLkdVRVNUX1BBU1NfU0hFRVQ7XG4gICAgfVxuXG4gICAgZ2V0IGVsaWdpYmxlX2NvbHVtbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuR1VFU1RfUEFTU19FTElHSUJMRV9DT0xVTU47XG4gICAgfVxuXG4gICAgZ2V0IGVsaWdpYmxlX3JlYXNvbl9jb2x1bW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLkdVRVNUX1BBU1NfRUxJR0lCTEVfUkVBU09OX0NPTFVNTjtcbiAgICB9XG5cbiAgICBnZXQgYXZhaWxhYmxlX2NvbHVtbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuR1VFU1RfUEFTU19TSEVFVF9BVkFJTEFCTEVfQ09MVU1OO1xuICAgIH1cblxuICAgIGdldCB1c2VkX3RvZGF5X2NvbHVtbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuR1VFU1RfUEFTU19TSEVFVF9VU0VEX1RPREFZX0NPTFVNTjtcbiAgICB9XG5cbiAgICBnZXQgdXNlZF9zZWFzb25fY29sdW1uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5HVUVTVF9QQVNTX1NIRUVUX1VTRURfU0VBU09OX0NPTFVNTjtcbiAgICB9XG5cbiAgICBnZXQgbmFtZV9jb2x1bW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLkdVRVNUX1BBU1NfU0hFRVRfTkFNRV9DT0xVTU47XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQsIGV4Y2VsX3Jvd190b19pbmRleCB9IGZyb20gXCIuLi91dGlscy91dGlsXCI7XG5pbXBvcnQgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIgZnJvbSBcIi4uL3V0aWxzL2dvb2dsZV9zaGVldHNfc3ByZWFkc2hlZXRfdGFiXCI7XG5pbXBvcnQgeyBzYW5pdGl6ZV9kYXRlIH0gZnJvbSBcIi4uL3V0aWxzL2RhdGV0aW1lX3V0aWxcIjtcbmltcG9ydCB7IExvZ2luU2hlZXRDb25maWcsIFBhdHJvbGxlclJvd0NvbmZpZyB9IGZyb20gXCIuLi9lbnYvaGFuZGxlcl9jb25maWdcIjtcbmltcG9ydCB7IHNoZWV0c192NCB9IGZyb20gXCJnb29nbGVhcGlzXCI7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHJvdyBvZiBwYXRyb2xsZXIgZGF0YS5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IFBhdHJvbGxlclJvd1xuICogQHByb3BlcnR5IHtudW1iZXJ9IGluZGV4IC0gVGhlIGluZGV4IG9mIHRoZSByb3cuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwYXRyb2xsZXIuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gY2F0ZWdvcnkgLSBUaGUgY2F0ZWdvcnkgb2YgdGhlIHBhdHJvbGxlci5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBzZWN0aW9uIC0gVGhlIHNlY3Rpb24gb2YgdGhlIHBhdHJvbGxlci5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBjaGVja2luIC0gVGhlIGNoZWNrLWluIHN0YXR1cyBvZiB0aGUgcGF0cm9sbGVyLlxuICovXG5leHBvcnQgdHlwZSBQYXRyb2xsZXJSb3cgPSB7XG4gICAgaW5kZXg6IG51bWJlcjtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgY2F0ZWdvcnk6IHN0cmluZztcbiAgICBzZWN0aW9uOiBzdHJpbmc7XG4gICAgY2hlY2tpbjogc3RyaW5nO1xufTtcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBsb2dpbiBzaGVldCBpbiBHb29nbGUgU2hlZXRzLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dpblNoZWV0IHtcbiAgICBsb2dpbl9zaGVldDogR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWI7XG4gICAgY2hlY2tpbl9jb3VudF9zaGVldDogR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWI7XG4gICAgY29uZmlnOiBMb2dpblNoZWV0Q29uZmlnO1xuICAgIHJvd3M/OiBhbnlbXVtdIHwgbnVsbCA9IG51bGw7XG4gICAgY2hlY2tpbl9jb3VudDogbnVtYmVyIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgIHBhdHJvbGxlcnM6IFBhdHJvbGxlclJvd1tdID0gW107XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIExvZ2luU2hlZXQuXG4gICAgICogQHBhcmFtIHtzaGVldHNfdjQuU2hlZXRzIHwgbnVsbH0gc2hlZXRzX3NlcnZpY2UgLSBUaGUgR29vZ2xlIFNoZWV0cyBBUEkgc2VydmljZS5cbiAgICAgKiBAcGFyYW0ge0xvZ2luU2hlZXRDb25maWd9IGNvbmZpZyAtIFRoZSBjb25maWd1cmF0aW9uIGZvciB0aGUgbG9naW4gc2hlZXQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzIHwgbnVsbCxcbiAgICAgICAgY29uZmlnOiBMb2dpblNoZWV0Q29uZmlnXG4gICAgKSB7XG4gICAgICAgIHRoaXMubG9naW5fc2hlZXQgPSBuZXcgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIoXG4gICAgICAgICAgICBzaGVldHNfc2VydmljZSxcbiAgICAgICAgICAgIGNvbmZpZy5TSEVFVF9JRCxcbiAgICAgICAgICAgIGNvbmZpZy5MT0dJTl9TSEVFVF9MT09LVVBcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jaGVja2luX2NvdW50X3NoZWV0ID0gbmV3IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiKFxuICAgICAgICAgICAgc2hlZXRzX3NlcnZpY2UsXG4gICAgICAgICAgICBjb25maWcuU0hFRVRfSUQsXG4gICAgICAgICAgICBjb25maWcuQ0hFQ0tJTl9DT1VOVF9MT09LVVBcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVmcmVzaGVzIHRoZSBkYXRhIGZyb20gdGhlIEdvb2dsZSBTaGVldHMuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAgICovXG4gICAgYXN5bmMgcmVmcmVzaCgpIHtcbiAgICAgICAgdGhpcy5yb3dzID0gYXdhaXQgdGhpcy5sb2dpbl9zaGVldC5nZXRfdmFsdWVzKFxuICAgICAgICAgICAgdGhpcy5jb25maWcuTE9HSU5fU0hFRVRfTE9PS1VQXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY2hlY2tpbl9jb3VudCA9IChhd2FpdCB0aGlzLmNoZWNraW5fY291bnRfc2hlZXQuZ2V0X3ZhbHVlcyhcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLkNIRUNLSU5fQ09VTlRfTE9PS1VQXG4gICAgICAgICkpIVswXVswXTtcbiAgICAgICAgdGhpcy5wYXRyb2xsZXJzID0gdGhpcy5yb3dzIS5tYXAoKHgsIGkpID0+XG4gICAgICAgICAgICB0aGlzLnBhcnNlX3BhdHJvbGxlcl9yb3coaSwgeCwgdGhpcy5jb25maWcpXG4gICAgICAgICkuZmlsdGVyKCh4KSA9PiB4ICE9IG51bGwpIGFzIFBhdHJvbGxlclJvd1tdO1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiUmVmcmVzaGluZyBQYXRyb2xsZXJzOiBcIiApO1xuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMucGF0cm9sbGVycyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgYXJjaGl2ZWQgc3RhdHVzIG9mIHRoZSBsb2dpbiBzaGVldC5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc2hlZXQgaXMgYXJjaGl2ZWQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKi9cbiAgICBnZXQgYXJjaGl2ZWQoKSB7XG4gICAgICAgIGNvbnN0IGFyY2hpdmVkID0gbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQoXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5BUkNISVZFRF9DRUxMLFxuICAgICAgICAgICAgdGhpcy5yb3dzIVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgKGFyY2hpdmVkID09PSB1bmRlZmluZWQgJiYgdGhpcy5jaGVja2luX2NvdW50ID09PSAwKSB8fFxuICAgICAgICAgICAgYXJjaGl2ZWQudG9Mb3dlckNhc2UoKSA9PT0gXCJ5ZXNcIlxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGRhdGUgb2YgdGhlIHNoZWV0LlxuICAgICAqIEByZXR1cm5zIHtEYXRlfSBUaGUgZGF0ZSBvZiB0aGUgc2hlZXQuXG4gICAgICovXG4gICAgZ2V0IHNoZWV0X2RhdGUoKSB7XG4gICAgICAgIHJldHVybiBzYW5pdGl6ZV9kYXRlKFxuICAgICAgICAgICAgbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQodGhpcy5jb25maWcuU0hFRVRfREFURV9DRUxMLCB0aGlzLnJvd3MhKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGN1cnJlbnQgZGF0ZS5cbiAgICAgKiBAcmV0dXJucyB7RGF0ZX0gVGhlIGN1cnJlbnQgZGF0ZS5cbiAgICAgKi9cbiAgICBnZXQgY3VycmVudF9kYXRlKCkge1xuICAgICAgICByZXR1cm4gc2FuaXRpemVfZGF0ZShcbiAgICAgICAgICAgIGxvb2t1cF9yb3dfY29sX2luX3NoZWV0KHRoaXMuY29uZmlnLkNVUlJFTlRfREFURV9DRUxMLCB0aGlzLnJvd3MhKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGUgc2hlZXQgZGF0ZSBpcyB0aGUgY3VycmVudCBkYXRlLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzaGVldCBkYXRlIGlzIHRoZSBjdXJyZW50IGRhdGUsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKi9cbiAgICBnZXQgaXNfY3VycmVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hlZXRfZGF0ZS5nZXRUaW1lKCkgPT09IHRoaXMuY3VycmVudF9kYXRlLmdldFRpbWUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmllcyB0byBmaW5kIGEgcGF0cm9sbGVyIGJ5IG5hbWUuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcGF0cm9sbGVyLlxuICAgICAqIEByZXR1cm5zIHtQYXRyb2xsZXJSb3cgfCBcIm5vdF9mb3VuZFwifSBUaGUgcGF0cm9sbGVyIHJvdyBvciBcIm5vdF9mb3VuZFwiLlxuICAgICAqL1xuICAgIHRyeV9maW5kX3BhdHJvbGxlcihuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgcGF0cm9sbGVycyA9IHRoaXMucGF0cm9sbGVycy5maWx0ZXIoKHgpID0+IHgubmFtZSA9PT0gbmFtZSk7XG4gICAgICAgIGlmIChwYXRyb2xsZXJzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIFwibm90X2ZvdW5kXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhdHJvbGxlcnNbMF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcGF0cm9sbGVycyB3aG8gYXJlIG9uIGR1dHkuXG4gICAgICogQHJldHVybnMge1BhdHJvbGxlclJvd1tdfSBUaGUgbGlzdCBvZiBvbi1kdXR5IHBhdHJvbGxlcnMuXG4gICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBsb2dpbiBzaGVldCBpcyBub3QgY3VycmVudC5cbiAgICAgKi9cbiAgICBnZXRfb25fZHV0eV9wYXRyb2xsZXJzKCk6IFBhdHJvbGxlclJvd1tdIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzX2N1cnJlbnQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxvZ2luIHNoZWV0IGlzIG5vdCBjdXJyZW50XCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnBhdHJvbGxlcnMuZmlsdGVyKCh4KSA9PiB4LmNoZWNraW4pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpbiBhIHBhdHJvbGxlciB3aXRoIGEgbmV3IGNoZWNrLWluIHZhbHVlLlxuICAgICAqIEBwYXJhbSB7UGF0cm9sbGVyUm93fSBwYXRyb2xsZXJfc3RhdHVzIC0gVGhlIHN0YXR1cyBvZiB0aGUgcGF0cm9sbGVyLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuZXdfY2hlY2tpbl92YWx1ZSAtIFRoZSBuZXcgY2hlY2staW4gdmFsdWUuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBsb2dpbiBzaGVldCBpcyBub3QgY3VycmVudC5cbiAgICAgKi9cbiAgICBhc3luYyBjaGVja2luKHBhdHJvbGxlcl9zdGF0dXM6IFBhdHJvbGxlclJvdywgbmV3X2NoZWNraW5fdmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAoIXRoaXMuaXNfY3VycmVudCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTG9naW4gc2hlZXQgaXMgbm90IGN1cnJlbnRcIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coYEV4aXN0aW5nIHN0YXR1czogJHtKU09OLnN0cmluZ2lmeShwYXRyb2xsZXJfc3RhdHVzKX1gKTtcblxuICAgICAgICBjb25zdCByb3cgPSBwYXRyb2xsZXJfc3RhdHVzLmluZGV4ICsgMTsgLy8gcHJvZ3JhbW1pbmcgLT4gZXhjZWwgbG9va3VwXG4gICAgICAgIGNvbnN0IHJhbmdlID0gYCR7dGhpcy5jb25maWcuQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU59JHtyb3d9YDtcblxuICAgICAgICBhd2FpdCB0aGlzLmxvZ2luX3NoZWV0LnVwZGF0ZV92YWx1ZXMocmFuZ2UsIFtbbmV3X2NoZWNraW5fdmFsdWVdXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXNzaWducyBhIHNlY3Rpb24gdG8gYSBwYXRyb2xsZXIuXG4gICAgICogQHBhcmFtIHBhdHJvbGxlcl9zZWN0aW9uIFRoZSByb3cgZm9yIHRoZSBwYXRyb2xsZXIgdGhhdCBuZWVkcyB0byBoYXZlIGEgc2VjdGlvbiBhc3NpZ25lZCB0by5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmV3X3NlY3Rpb25fdmFsdWUgLSBUaGUgbmV3IHNlY3Rpb24gdmFsdWUuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBsb2dpbiBzaGVldCBpcyBub3QgY3VycmVudC5cbiAgICAgKi9cbiAgICBhc3luYyBhc3NpZ25fc2VjdGlvbihwYXRyb2xsZXJfc2VjdGlvbjogUGF0cm9sbGVyUm93LCBuZXdfc2VjdGlvbl92YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICghdGhpcy5pc19jdXJyZW50KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJMb2dpbiBzaGVldCBpcyBub3QgY3VycmVudFwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhgRXhpc3Rpbmcgc3RhdHVzOiAke0pTT04uc3RyaW5naWZ5KHBhdHJvbGxlcl9zZWN0aW9uKX1gKTtcblxuICAgICAgICBjb25zdCByb3cgPSBwYXRyb2xsZXJfc2VjdGlvbi5pbmRleCArIDE7IC8vIHByb2dyYW1taW5nIC0+IGV4Y2VsIGxvb2t1cFxuICAgICAgICBjb25zdCByYW5nZSA9IGAke3RoaXMuY29uZmlnLlNFQ1RJT05fRFJPUERPV05fQ09MVU1OfSR7cm93fWA7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5sb2dpbl9zaGVldC51cGRhdGVfdmFsdWVzKHJhbmdlLCBbW25ld19zZWN0aW9uX3ZhbHVlXV0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlcyBhIHJvdyBvZiBwYXRyb2xsZXIgZGF0YS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggLSBUaGUgaW5kZXggb2YgdGhlIHJvdy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSByb3cgLSBUaGUgcm93IGRhdGEuXG4gICAgICogQHBhcmFtIHtQYXRyb2xsZXJSb3dDb25maWd9IG9wdHMgLSBUaGUgY29uZmlndXJhdGlvbiBvcHRpb25zIGZvciB0aGUgcGF0cm9sbGVyIHJvdy5cbiAgICAgKiBAcmV0dXJucyB7UGF0cm9sbGVyUm93IHwgbnVsbH0gVGhlIHBhcnNlZCBwYXRyb2xsZXIgcm93IG9yIG51bGwgaWYgaW52YWxpZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHBhcnNlX3BhdHJvbGxlcl9yb3coXG4gICAgICAgIGluZGV4OiBudW1iZXIsXG4gICAgICAgIHJvdzogc3RyaW5nW10sXG4gICAgICAgIG9wdHM6IFBhdHJvbGxlclJvd0NvbmZpZ1xuICAgICk6IFBhdHJvbGxlclJvdyB8IG51bGwge1xuICAgICAgICBpZiAocm93Lmxlbmd0aCA8IDQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbmRleCA8IDMpe1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIG5hbWU6IHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5OQU1FX0NPTFVNTildLFxuICAgICAgICAgICAgY2F0ZWdvcnk6IHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5DQVRFR09SWV9DT0xVTU4pXSxcbiAgICAgICAgICAgIHNlY3Rpb246IHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5TRUNUSU9OX0RST1BET1dOX0NPTFVNTildLFxuICAgICAgICAgICAgY2hlY2tpbjogcm93W2V4Y2VsX3Jvd190b19pbmRleChvcHRzLkNIRUNLSU5fRFJPUERPV05fQ09MVU1OKV0sXG4gICAgICAgIH07XG4gICAgfVxufSIsImltcG9ydCB7c2hlZXRzX3Y0fSBmcm9tIFwiZ29vZ2xlYXBpc1wiO1xuaW1wb3J0IHtTZWFzb25TaGVldENvbmZpZyx9IGZyb20gXCIuLi9lbnYvaGFuZGxlcl9jb25maWdcIjtcbmltcG9ydCB7ZXhjZWxfcm93X3RvX2luZGV4fSBmcm9tIFwiLi4vdXRpbHMvdXRpbFwiO1xuaW1wb3J0IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiIGZyb20gXCIuLi91dGlscy9nb29nbGVfc2hlZXRzX3NwcmVhZHNoZWV0X3RhYlwiO1xuaW1wb3J0IHtmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9jdXJyZW50X2RheX0gZnJvbSBcIi4uL3V0aWxzL2RhdGV0aW1lX3V0aWxcIjtcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBzZWFzb24gc2hlZXQgaW4gR29vZ2xlIFNoZWV0cy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2Vhc29uU2hlZXQge1xuICAgIHNoZWV0OiBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYjtcbiAgICBjb25maWc6IFNlYXNvblNoZWV0Q29uZmlnO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBTZWFzb25TaGVldC5cbiAgICAgKiBAcGFyYW0ge3NoZWV0c192NC5TaGVldHMgfCBudWxsfSBzaGVldHNfc2VydmljZSAtIFRoZSBHb29nbGUgU2hlZXRzIEFQSSBzZXJ2aWNlLlxuICAgICAqIEBwYXJhbSB7U2Vhc29uU2hlZXRDb25maWd9IGNvbmZpZyAtIFRoZSBjb25maWd1cmF0aW9uIGZvciB0aGUgc2Vhc29uIHNoZWV0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyB8IG51bGwsXG4gICAgICAgIGNvbmZpZzogU2Vhc29uU2hlZXRDb25maWdcbiAgICApIHtcbiAgICAgICAgdGhpcy5zaGVldCA9IG5ldyBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYihcbiAgICAgICAgICAgIHNoZWV0c19zZXJ2aWNlLFxuICAgICAgICAgICAgY29uZmlnLlNIRUVUX0lELFxuICAgICAgICAgICAgY29uZmlnLlNFQVNPTl9TSEVFVFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBudW1iZXIgb2YgZGF5cyBwYXRyb2xsZWQgYnkgYSBwYXRyb2xsZXIuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdHJvbGxlcl9uYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHBhdHJvbGxlci5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxudW1iZXI+fSBUaGUgbnVtYmVyIG9mIGRheXMgcGF0cm9sbGVkLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF9wYXRyb2xsZWRfZGF5cyhcbiAgICAgICAgcGF0cm9sbGVyX25hbWU6IHN0cmluZ1xuICAgICk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgICAgIGNvbnN0IHBhdHJvbGxlcl9yb3cgPSBhd2FpdCB0aGlzLnNoZWV0LmdldF9zaGVldF9yb3dfZm9yX3BhdHJvbGxlcihcbiAgICAgICAgICAgIHBhdHJvbGxlcl9uYW1lLFxuICAgICAgICAgICAgdGhpcy5jb25maWcuU0VBU09OX1NIRUVUX05BTUVfQ09MVU1OXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKCFwYXRyb2xsZXJfcm93KSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjdXJyZW50TnVtYmVyID1cbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cucm93W2V4Y2VsX3Jvd190b19pbmRleCh0aGlzLmNvbmZpZy5TRUFTT05fU0hFRVRfREFZU19DT0xVTU4pXTtcblxuICAgICAgICBjb25zdCBjdXJyZW50RGF5ID0gZmlsdGVyX2xpc3RfdG9fZW5kc3dpdGhfY3VycmVudF9kYXkocGF0cm9sbGVyX3Jvdy5yb3cpXG4gICAgICAgICAgICAubWFwKCh4KSA9PiAoeD8uc3RhcnRzV2l0aChcIkhcIikgPyAwLjUgOiAxKSlcbiAgICAgICAgICAgIC5yZWR1Y2UoKHgsIHksIGkpID0+IHggKyB5LCAwKTtcblxuICAgICAgICByZXR1cm4gY3VycmVudE51bWJlciAtIGN1cnJlbnREYXk7XG4gICAgfVxufSIsImltcG9ydCB7Z29vZ2xlfSBmcm9tIFwiZ29vZ2xlYXBpc1wiO1xuaW1wb3J0IHtHZW5lcmF0ZUF1dGhVcmxPcHRzfSBmcm9tIFwiZ29vZ2xlLWF1dGgtbGlicmFyeVwiO1xuaW1wb3J0IHtPQXV0aDJDbGllbnR9IGZyb20gXCJnb29nbGVhcGlzLWNvbW1vblwiO1xuaW1wb3J0IHtzYW5pdGl6ZV9waG9uZV9udW1iZXJ9IGZyb20gXCIuL3V0aWxzL3V0aWxcIjtcbmltcG9ydCB7bG9hZF9jcmVkZW50aWFsc19maWxlc30gZnJvbSBcIi4vdXRpbHMvZmlsZV91dGlsc1wiO1xuaW1wb3J0IHtTZXJ2aWNlQ29udGV4dH0gZnJvbSBcIkB0d2lsaW8tbGFicy9zZXJ2ZXJsZXNzLXJ1bnRpbWUtdHlwZXMvdHlwZXNcIjtcbmltcG9ydCB7VXNlckNyZWRzQ29uZmlnfSBmcm9tIFwiLi9lbnYvaGFuZGxlcl9jb25maWdcIjtcbmltcG9ydCB7dmFsaWRhdGVfc2NvcGVzfSBmcm9tIFwiLi91dGlscy9zY29wZV91dGlsXCI7XG5cbmNvbnN0IFNDT1BFUyA9IFtcbiAgICBcImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvc2NyaXB0LnByb2plY3RzXCIsXG4gICAgXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3NwcmVhZHNoZWV0c1wiLFxuXTtcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgdXNlciBjcmVkZW50aWFscyBmb3IgR29vZ2xlIE9BdXRoMi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckNyZWRzIHtcbiAgICBudW1iZXI6IHN0cmluZztcbiAgICBvYXV0aDJfY2xpZW50OiBPQXV0aDJDbGllbnQ7XG4gICAgc3luY19jbGllbnQ6IFNlcnZpY2VDb250ZXh0O1xuICAgIGRvbWFpbj86IHN0cmluZztcbiAgICBsb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIFVzZXJDcmVkcyBpbnN0YW5jZS5cbiAgICAgKiBAcGFyYW0ge1NlcnZpY2VDb250ZXh0fSBzeW5jX2NsaWVudCAtIFRoZSBUd2lsaW8gU3luYyBjbGllbnQuXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCB1bmRlZmluZWR9IG51bWJlciAtIFRoZSB1c2VyJ3MgcGhvbmUgbnVtYmVyLlxuICAgICAqIEBwYXJhbSB7VXNlckNyZWRzQ29uZmlnfSBvcHRzIC0gVGhlIHVzZXIgY3JlZGVudGlhbHMgY29uZmlndXJhdGlvbi5cbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gVGhyb3dzIGFuIGVycm9yIGlmIHRoZSBudW1iZXIgaXMgdW5kZWZpbmVkIG9yIG51bGwuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHN5bmNfY2xpZW50OiBTZXJ2aWNlQ29udGV4dCxcbiAgICAgICAgbnVtYmVyOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgICAgIG9wdHM6IFVzZXJDcmVkc0NvbmZpZ1xuICAgICkge1xuICAgICAgICBpZiAobnVtYmVyID09PSB1bmRlZmluZWQgfHwgbnVtYmVyID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOdW1iZXIgaXMgdW5kZWZpbmVkXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubnVtYmVyID0gc2FuaXRpemVfcGhvbmVfbnVtYmVyKG51bWJlcik7XG5cbiAgICAgICAgY29uc3QgY3JlZGVudGlhbHMgPSBsb2FkX2NyZWRlbnRpYWxzX2ZpbGVzKCk7XG4gICAgICAgIGNvbnN0IHsgY2xpZW50X3NlY3JldCwgY2xpZW50X2lkLCByZWRpcmVjdF91cmlzIH0gPSBjcmVkZW50aWFscy53ZWI7XG4gICAgICAgIHRoaXMub2F1dGgyX2NsaWVudCA9IG5ldyBnb29nbGUuYXV0aC5PQXV0aDIoXG4gICAgICAgICAgICBjbGllbnRfaWQsXG4gICAgICAgICAgICBjbGllbnRfc2VjcmV0LFxuICAgICAgICAgICAgcmVkaXJlY3RfdXJpc1swXVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN5bmNfY2xpZW50ID0gc3luY19jbGllbnQ7XG4gICAgICAgIGxldCBkb21haW4gPSBvcHRzLk5TUF9FTUFJTF9ET01BSU47XG4gICAgICAgIGlmIChkb21haW4gPT09IHVuZGVmaW5lZCB8fCBkb21haW4gPT09IG51bGwgfHwgZG9tYWluID09PSBcIlwiKSB7XG4gICAgICAgICAgICBkb21haW4gPSB1bmRlZmluZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRvbWFpbiA9IGRvbWFpbjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvYWQgdGhlIE9BdXRoMiB0b2tlbi5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBib29sZWFuIGluZGljYXRpbmcgaWYgdGhlIHRva2VuIHdhcyBsb2FkZWQuXG4gICAgICovXG4gICAgYXN5bmMgbG9hZFRva2VuKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICBpZiAoIXRoaXMubG9hZGVkKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBMb29raW5nIGZvciAke3RoaXMudG9rZW5fa2V5fWApO1xuICAgICAgICAgICAgICAgIGNvbnN0IG9hdXRoMkRvYyA9IGF3YWl0IHRoaXMuc3luY19jbGllbnRcbiAgICAgICAgICAgICAgICAgICAgLmRvY3VtZW50cyh0aGlzLnRva2VuX2tleSlcbiAgICAgICAgICAgICAgICAgICAgLmZldGNoKCk7XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICBvYXV0aDJEb2MgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgICAgICBvYXV0aDJEb2MuZGF0YSA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICAgICAgb2F1dGgyRG9jLmRhdGEudG9rZW4gPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgRGlkbid0IGZpbmQgJHt0aGlzLnRva2VuX2tleX1gKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0b2tlbiA9IG9hdXRoMkRvYy5kYXRhLnRva2VuO1xuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZV9zY29wZXMob2F1dGgyRG9jLmRhdGEuc2NvcGVzLCBTQ09QRVMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9hdXRoMl9jbGllbnQuc2V0Q3JlZGVudGlhbHModG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgTG9hZGVkIHRva2VuICR7dGhpcy50b2tlbl9rZXl9YCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgICAgIGBGYWlsZWQgdG8gbG9hZCB0b2tlbiBmb3IgJHt0aGlzLnRva2VuX2tleX0uXFxuICR7ZX1gXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5sb2FkZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB0b2tlbiBrZXkuXG4gICAgICogQHJldHVybnMge3N0cmluZ30gVGhlIHRva2VuIGtleS5cbiAgICAgKi9cbiAgICBnZXQgdG9rZW5fa2V5KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgb2F1dGgyXyR7dGhpcy5udW1iZXJ9YDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWxldGUgdGhlIE9BdXRoMiB0b2tlbi5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBib29sZWFuIGluZGljYXRpbmcgaWYgdGhlIHRva2VuIHdhcyBkZWxldGVkLlxuICAgICAqL1xuICAgIGFzeW5jIGRlbGV0ZVRva2VuKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICBjb25zdCBvYXV0aDJEb2MgPSBhd2FpdCB0aGlzLnN5bmNfY2xpZW50XG4gICAgICAgICAgICAuZG9jdW1lbnRzKHRoaXMudG9rZW5fa2V5KVxuICAgICAgICAgICAgLmZldGNoKCk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIG9hdXRoMkRvYyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICBvYXV0aDJEb2MuZGF0YSA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIG9hdXRoMkRvYy5kYXRhLnRva2VuID09PSB1bmRlZmluZWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgRGlkbid0IGZpbmQgJHt0aGlzLnRva2VuX2tleX1gKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLnN5bmNfY2xpZW50LmRvY3VtZW50cyhvYXV0aDJEb2Muc2lkKS5yZW1vdmUoKTtcbiAgICAgICAgY29uc29sZS5sb2coYERlbGV0ZWQgdG9rZW4gJHt0aGlzLnRva2VuX2tleX1gKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29tcGxldGUgdGhlIGxvZ2luIHByb2Nlc3MgYnkgZXhjaGFuZ2luZyB0aGUgYXV0aG9yaXphdGlvbiBjb2RlIGZvciBhIHRva2VuLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb2RlIC0gVGhlIGF1dGhvcml6YXRpb24gY29kZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBzY29wZXMgLSBUaGUgc2NvcGVzIHRvIHZhbGlkYXRlLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBsb2dpbiBwcm9jZXNzIGlzIGNvbXBsZXRlLlxuICAgICAqL1xuICAgIGFzeW5jIGNvbXBsZXRlTG9naW4oY29kZTogc3RyaW5nLCBzY29wZXM6IHN0cmluZ1tdKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHZhbGlkYXRlX3Njb3BlcyhzY29wZXMsIFNDT1BFUyk7XG4gICAgICAgIGNvbnN0IHRva2VuID0gYXdhaXQgdGhpcy5vYXV0aDJfY2xpZW50LmdldFRva2VuKGNvZGUpO1xuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShPYmplY3Qua2V5cyh0b2tlbi5yZXMhKSkpO1xuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0b2tlbi50b2tlbnMpKTtcbiAgICAgICAgdGhpcy5vYXV0aDJfY2xpZW50LnNldENyZWRlbnRpYWxzKHRva2VuLnRva2Vucyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBvYXV0aERvYyA9IGF3YWl0IHRoaXMuc3luY19jbGllbnQuZG9jdW1lbnRzLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgZGF0YTogeyB0b2tlbjogdG9rZW4udG9rZW5zLCBzY29wZXM6IHNjb3BlcyB9LFxuICAgICAgICAgICAgICAgIHVuaXF1ZU5hbWU6IHRoaXMudG9rZW5fa2V5LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgIGBFeGNlcHRpb24gd2hlbiBjcmVhdGluZyBvYXV0aC4gVHJ5aW5nIHRvIHVwZGF0ZSBpbnN0ZWFkLi4uXFxuJHtlfWBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCBvYXV0aERvYyA9IGF3YWl0IHRoaXMuc3luY19jbGllbnRcbiAgICAgICAgICAgICAgICAuZG9jdW1lbnRzKHRoaXMudG9rZW5fa2V5KVxuICAgICAgICAgICAgICAgIC51cGRhdGUoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7IHRva2VuOiB0b2tlbiwgc2NvcGVzOiBzY29wZXMgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgYXV0aG9yaXphdGlvbiBVUkwuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c3RyaW5nPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIGF1dGhvcml6YXRpb24gVVJMLlxuICAgICAqL1xuICAgIGFzeW5jIGdldEF1dGhVcmwoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgY29uc3QgaWQgPSB0aGlzLmdlbmVyYXRlUmFuZG9tU3RyaW5nKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBVc2luZyBub25jZSAke2lkfSBmb3IgJHt0aGlzLm51bWJlcn1gKTtcbiAgICAgICAgY29uc3QgZG9jID0gYXdhaXQgdGhpcy5zeW5jX2NsaWVudC5kb2N1bWVudHMuY3JlYXRlKHtcbiAgICAgICAgICAgIGRhdGE6IHsgbnVtYmVyOiB0aGlzLm51bWJlciwgc2NvcGVzOiBTQ09QRVMgfSxcbiAgICAgICAgICAgIHVuaXF1ZU5hbWU6IGlkLFxuICAgICAgICAgICAgdHRsOiA2MCAqIDUsIC8vIDUgbWludXRlc1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2coYE1hZGUgbm9uY2UtZG9jOiAke0pTT04uc3RyaW5naWZ5KGRvYyl9YCk7XG5cbiAgICAgICAgY29uc3Qgb3B0czogR2VuZXJhdGVBdXRoVXJsT3B0cyA9IHtcbiAgICAgICAgICAgIGFjY2Vzc190eXBlOiBcIm9mZmxpbmVcIixcbiAgICAgICAgICAgIHNjb3BlOiBTQ09QRVMsXG4gICAgICAgICAgICBzdGF0ZTogaWQsXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLmRvbWFpbikge1xuICAgICAgICAgICAgb3B0c1tcImhkXCJdID0gdGhpcy5kb21haW47XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5vYXV0aDJfY2xpZW50LmdlbmVyYXRlQXV0aFVybChvcHRzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZSBhIHJhbmRvbSBzdHJpbmcuXG4gICAgICogQHJldHVybnMge3N0cmluZ30gQSByYW5kb20gc3RyaW5nLlxuICAgICAqL1xuICAgIGdlbmVyYXRlUmFuZG9tU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IDMwO1xuICAgICAgICBsZXQgcmVzdWx0ID0gXCJcIjtcbiAgICAgICAgY29uc3QgY2hhcmFjdGVycyA9XG4gICAgICAgICAgICBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5XCI7XG4gICAgICAgIGNvbnN0IGNoYXJhY3RlcnNMZW5ndGggPSBjaGFyYWN0ZXJzLmxlbmd0aDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0ICs9IGNoYXJhY3RlcnMuY2hhckF0KFxuICAgICAgICAgICAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJhY3RlcnNMZW5ndGgpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuXG4vKipcbiAqIEludGVyZmFjZSByZXByZXNlbnRpbmcgdGhlIHVzZXIgY3JlZGVudGlhbHMgY29uZmlndXJhdGlvbi5cbiAqL1xuZXhwb3J0IHsgVXNlckNyZWRzIH07XG4iLCIvKipcbiAqIFJlcHJlc2VudHMgYSBjaGVjay1pbiB2YWx1ZSB3aXRoIHZhcmlvdXMgcHJvcGVydGllcyBhbmQgbG9va3VwIHZhbHVlcy5cbiAqL1xuY2xhc3MgQ2hlY2tpblZhbHVlIHtcbiAgICBrZXk6IHN0cmluZztcbiAgICBzaGVldHNfdmFsdWU6IHN0cmluZztcbiAgICBzbXNfZGVzYzogc3RyaW5nO1xuICAgIGZhc3RfY2hlY2tpbnM6IHN0cmluZ1tdO1xuICAgIGxvb2t1cF92YWx1ZXM6IFNldDxzdHJpbmc+O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBDaGVja2luVmFsdWUuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIFRoZSBrZXkgZm9yIHRoZSBjaGVjay1pbiB2YWx1ZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2hlZXRzX3ZhbHVlIC0gVGhlIHZhbHVlIHVzZWQgaW4gc2hlZXRzLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzbXNfZGVzYyAtIFRoZSBkZXNjcmlwdGlvbiB1c2VkIGluIFNNUy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IHN0cmluZ1tdfSBmYXN0X2NoZWNraW5zIC0gVGhlIGZhc3QgY2hlY2staW4gdmFsdWVzLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBrZXk6IHN0cmluZyxcbiAgICAgICAgc2hlZXRzX3ZhbHVlOiBzdHJpbmcsXG4gICAgICAgIHNtc19kZXNjOiBzdHJpbmcsXG4gICAgICAgIGZhc3RfY2hlY2tpbnM6IHN0cmluZyB8IHN0cmluZ1tdXG4gICAgKSB7XG4gICAgICAgIGlmICghKGZhc3RfY2hlY2tpbnMgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgICAgICAgIGZhc3RfY2hlY2tpbnMgPSBbZmFzdF9jaGVja2luc107XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgICAgIHRoaXMuc2hlZXRzX3ZhbHVlID0gc2hlZXRzX3ZhbHVlO1xuICAgICAgICB0aGlzLnNtc19kZXNjID0gc21zX2Rlc2M7XG4gICAgICAgIHRoaXMuZmFzdF9jaGVja2lucyA9IGZhc3RfY2hlY2tpbnMubWFwKCh4KSA9PiB4LnRyaW0oKS50b0xvd2VyQ2FzZSgpKTtcblxuICAgICAgICBjb25zdCBzbXNfZGVzY19zcGxpdDogc3RyaW5nW10gPSBzbXNfZGVzY1xuICAgICAgICAgICAgLnJlcGxhY2UoL1xccysvLCBcIi1cIilcbiAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICAuc3BsaXQoXCIvXCIpO1xuICAgICAgICBjb25zdCBsb29rdXBfdmFscyA9IFsuLi50aGlzLmZhc3RfY2hlY2tpbnMsIC4uLnNtc19kZXNjX3NwbGl0XTtcbiAgICAgICAgdGhpcy5sb29rdXBfdmFsdWVzID0gbmV3IFNldDxzdHJpbmc+KGxvb2t1cF92YWxzKTtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGNvbGxlY3Rpb24gb2YgY2hlY2staW4gdmFsdWVzIHdpdGggdmFyaW91cyBsb29rdXAgbWV0aG9kcy5cbiAqL1xuY2xhc3MgQ2hlY2tpblZhbHVlcyB7XG4gICAgYnlfa2V5OiB7IFtrZXk6IHN0cmluZ106IENoZWNraW5WYWx1ZSB9ID0ge307XG4gICAgYnlfbHY6IHsgW2tleTogc3RyaW5nXTogQ2hlY2tpblZhbHVlIH0gPSB7fTtcbiAgICBieV9mYzogeyBba2V5OiBzdHJpbmddOiBDaGVja2luVmFsdWUgfSA9IHt9O1xuICAgIGJ5X3NoZWV0X3N0cmluZzogeyBba2V5OiBzdHJpbmddOiBDaGVja2luVmFsdWUgfSA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBDaGVja2luVmFsdWVzLlxuICAgICAqIEBwYXJhbSB7Q2hlY2tpblZhbHVlW119IGNoZWNraW5WYWx1ZXMgLSBUaGUgYXJyYXkgb2YgY2hlY2staW4gdmFsdWVzLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNoZWNraW5WYWx1ZXM6IENoZWNraW5WYWx1ZVtdKSB7XG4gICAgICAgIGZvciAoY29uc3QgY2hlY2tpblZhbHVlIG9mIGNoZWNraW5WYWx1ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuYnlfa2V5W2NoZWNraW5WYWx1ZS5rZXldID0gY2hlY2tpblZhbHVlO1xuICAgICAgICAgICAgdGhpcy5ieV9zaGVldF9zdHJpbmdbY2hlY2tpblZhbHVlLnNoZWV0c192YWx1ZV0gPSBjaGVja2luVmFsdWU7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGx2IG9mIGNoZWNraW5WYWx1ZS5sb29rdXBfdmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ieV9sdltsdl0gPSBjaGVja2luVmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZjIG9mIGNoZWNraW5WYWx1ZS5mYXN0X2NoZWNraW5zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ieV9mY1tmY10gPSBjaGVja2luVmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZXMgYSBmYXN0IGNoZWNrLWluIHZhbHVlIGZyb20gdGhlIGdpdmVuIGJvZHkgc3RyaW5nLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5IC0gVGhlIGJvZHkgc3RyaW5nIHRvIHBhcnNlLlxuICAgICAqIEByZXR1cm5zIHtDaGVja2luVmFsdWUgfCB1bmRlZmluZWR9IFRoZSBwYXJzZWQgY2hlY2staW4gdmFsdWUgb3IgdW5kZWZpbmVkLlxuICAgICAqL1xuICAgIHBhcnNlX2Zhc3RfY2hlY2tpbihib2R5OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnlfZmNbYm9keV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIGEgY2hlY2staW4gdmFsdWUgZnJvbSB0aGUgZ2l2ZW4gYm9keSBzdHJpbmcuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHkgLSBUaGUgYm9keSBzdHJpbmcgdG8gcGFyc2UuXG4gICAgICogQHJldHVybnMge0NoZWNraW5WYWx1ZSB8IHVuZGVmaW5lZH0gVGhlIHBhcnNlZCBjaGVjay1pbiB2YWx1ZSBvciB1bmRlZmluZWQuXG4gICAgICovXG4gICAgcGFyc2VfY2hlY2tpbihib2R5OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgY2hlY2tpbl9sb3dlciA9IGJvZHkucmVwbGFjZSgvXFxzKy8sIFwiXCIpO1xuICAgICAgICByZXR1cm4gdGhpcy5ieV9sdltjaGVja2luX2xvd2VyXTtcbiAgICB9XG59XG5cbmV4cG9ydCB7IENoZWNraW5WYWx1ZSwgQ2hlY2tpblZhbHVlcyB9IiwiLyoqXG4gKiBDb252ZXJ0IGFuIEV4Y2VsIGRhdGUgdG8gYSBKYXZhU2NyaXB0IERhdGUgb2JqZWN0LlxuICogQHBhcmFtIHtudW1iZXJ9IGRhdGUgLSBUaGUgRXhjZWwgZGF0ZS5cbiAqIEByZXR1cm5zIHtEYXRlfSBUaGUgSmF2YVNjcmlwdCBEYXRlIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gZXhjZWxfZGF0ZV90b19qc19kYXRlKGRhdGU6IG51bWJlcik6IERhdGUge1xuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBEYXRlKDApO1xuICAgIHJlc3VsdC5zZXRVVENNaWxsaXNlY29uZHMoTWF0aC5yb3VuZCgoZGF0ZSAtIDI1NTY5KSAqIDg2NDAwICogMTAwMCkpO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ2hhbmdlIHRoZSB0aW1lem9uZSBvZiBhIERhdGUgb2JqZWN0IHRvIFBTVC5cbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSAtIFRoZSBEYXRlIG9iamVjdC5cbiAqIEByZXR1cm5zIHtEYXRlfSBUaGUgRGF0ZSBvYmplY3Qgd2l0aCB0aGUgdGltZXpvbmUgc2V0IHRvIFBTVC5cbiAqL1xuZnVuY3Rpb24gY2hhbmdlX3RpbWV6b25lX3RvX3BzdChkYXRlOiBEYXRlKTogRGF0ZSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKGRhdGUudG9VVENTdHJpbmcoKS5yZXBsYWNlKFwiIEdNVFwiLCBcIiBQU1RcIikpO1xufVxuXG4vKipcbiAqIFN0cmlwIHRoZSB0aW1lIGZyb20gYSBEYXRlIG9iamVjdCwga2VlcGluZyBvbmx5IHRoZSBkYXRlLlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIC0gVGhlIERhdGUgb2JqZWN0LlxuICogQHJldHVybnMge0RhdGV9IFRoZSBEYXRlIG9iamVjdCB3aXRoIHRoZSB0aW1lIHN0cmlwcGVkLlxuICovXG5mdW5jdGlvbiBzdHJpcF9kYXRldGltZV90b19kYXRlKGRhdGU6IERhdGUpOiBEYXRlIHtcbiAgICByZXR1cm4gbmV3IERhdGUoXG4gICAgICAgIGRhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKFwiZW4tVVNcIiwge3RpbWVab25lOiBcIkFtZXJpY2EvTG9zX0FuZ2VsZXNcIn0pXG4gICAgKTtcbn1cblxuLyoqXG4gKiBTYW5pdGl6ZSBhIGRhdGUgYnkgY29udmVydGluZyBpdCBmcm9tIGFuIEV4Y2VsIGRhdGUgYW5kIHN0cmlwcGluZyB0aGUgdGltZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBkYXRlIC0gVGhlIEV4Y2VsIGRhdGUuXG4gKiBAcmV0dXJucyB7RGF0ZX0gVGhlIHNhbml0aXplZCBEYXRlIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gc2FuaXRpemVfZGF0ZShkYXRlOiBudW1iZXIpOiBEYXRlIHtcbiAgICByZXR1cm4gc3RyaXBfZGF0ZXRpbWVfdG9fZGF0ZShcbiAgICAgICAgY2hhbmdlX3RpbWV6b25lX3RvX3BzdChleGNlbF9kYXRlX3RvX2pzX2RhdGUoZGF0ZSkpXG4gICAgKTtcbn1cblxuLyoqXG4gKiBGb3JtYXQgYSBEYXRlIG9iamVjdCBmb3IgdXNlIGluIGEgc3ByZWFkc2hlZXQgdmFsdWUuXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgLSBUaGUgRGF0ZSBvYmplY3QuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIGRhdGUgc3RyaW5nIGluIFBTVFxuICovXG5mdW5jdGlvbiBmb3JtYXRfZGF0ZV9mb3Jfc3ByZWFkc2hlZXRfdmFsdWUoZGF0ZTogRGF0ZSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGRhdGVcbiAgICAgICAgLnRvTG9jYWxlRGF0ZVN0cmluZyhcImVuLVVTXCIsIHt0aW1lWm9uZTogXCJBbWVyaWNhL0xvc19BbmdlbGVzXCJ9KVxuICAgICAgICAuc3BsaXQoXCIvXCIpXG4gICAgICAgIC5tYXAoKHgpID0+IHgucGFkU3RhcnQoMiwgXCIwXCIpKVxuICAgICAgICAuam9pbihcIlwiKTtcbn1cblxuLyoqXG4gKiBGaWx0ZXIgYSBsaXN0IHRvIGluY2x1ZGUgb25seSBpdGVtcyB0aGF0IGVuZCB3aXRoIGEgc3BlY2lmaWMgZGF0ZS5cbiAqIEBwYXJhbSB7YW55W119IGxpc3QgLSBUaGUgbGlzdCB0byBmaWx0ZXIuXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgLSBUaGUgZGF0ZSB0byBmaWx0ZXIgYnkuXG4gKiBAcmV0dXJucyB7YW55W119IFRoZSBmaWx0ZXJlZCBsaXN0LlxuICovXG5mdW5jdGlvbiBmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9kYXRlKGxpc3Q6IGFueVtdLCBkYXRlOiBEYXRlKTogYW55W10ge1xuICAgIGNvbnN0IGRhdGVzdHIgPSBmb3JtYXRfZGF0ZV9mb3Jfc3ByZWFkc2hlZXRfdmFsdWUoZGF0ZSk7XG4gICAgcmV0dXJuIGxpc3QubWFwKCh4KSA9PiB4Py50b1N0cmluZygpKS5maWx0ZXIoKHgpID0+IHg/LmVuZHNXaXRoKGRhdGVzdHIpKTtcbn1cblxuLyoqXG4gKiBGaWx0ZXIgYSBsaXN0IHRvIGluY2x1ZGUgb25seSBpdGVtcyB0aGF0IGVuZCB3aXRoIHRoZSBjdXJyZW50IGRhdGUuXG4gKiBAcGFyYW0ge2FueVtdfSBsaXN0IC0gVGhlIGxpc3QgdG8gZmlsdGVyLlxuICogQHJldHVybnMge2FueVtdfSBUaGUgZmlsdGVyZWQgbGlzdC5cbiAqL1xuZnVuY3Rpb24gZmlsdGVyX2xpc3RfdG9fZW5kc3dpdGhfY3VycmVudF9kYXkobGlzdDogYW55W10pOiBhbnlbXSB7XG4gICAgcmV0dXJuIGZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2RhdGUobGlzdCwgbmV3IERhdGUoKSk7XG59XG5cbmV4cG9ydCB7XG4gICAgc2FuaXRpemVfZGF0ZSxcbiAgICBleGNlbF9kYXRlX3RvX2pzX2RhdGUsXG4gICAgY2hhbmdlX3RpbWV6b25lX3RvX3BzdCxcbiAgICBzdHJpcF9kYXRldGltZV90b19kYXRlLFxuICAgIGZvcm1hdF9kYXRlX2Zvcl9zcHJlYWRzaGVldF92YWx1ZSxcbiAgICBmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9kYXRlLFxuICAgIGZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2N1cnJlbnRfZGF5LFxufTsiLCJpbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCAnQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlcyc7XG5cbi8qKlxuICogTG9hZCBjcmVkZW50aWFscyBmcm9tIGEgSlNPTiBmaWxlLlxuICogQHJldHVybnMge2FueX0gVGhlIHBhcnNlZCBjcmVkZW50aWFscyBmcm9tIHRoZSBKU09OIGZpbGUuXG4gKi9cbmZ1bmN0aW9uIGxvYWRfY3JlZGVudGlhbHNfZmlsZXMoKTogYW55IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShcbiAgICAgICAgZnNcbiAgICAgICAgICAgIC5yZWFkRmlsZVN5bmMoUnVudGltZS5nZXRBc3NldHMoKVtcIi9jcmVkZW50aWFscy5qc29uXCJdLnBhdGgpXG4gICAgICAgICAgICAudG9TdHJpbmcoKVxuICAgICk7XG59XG5cbi8qKlxuICogR2V0IHRoZSBwYXRoIHRvIHRoZSBzZXJ2aWNlIGNyZWRlbnRpYWxzIGZpbGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgcGF0aCB0byB0aGUgc2VydmljZSBjcmVkZW50aWFscyBmaWxlLlxuICovXG5mdW5jdGlvbiBnZXRfc2VydmljZV9jcmVkZW50aWFsc19wYXRoKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFJ1bnRpbWUuZ2V0QXNzZXRzKClbXCIvc2VydmljZS1jcmVkZW50aWFscy5qc29uXCJdLnBhdGg7XG59XG5cbmV4cG9ydCB7IGxvYWRfY3JlZGVudGlhbHNfZmlsZXMsIGdldF9zZXJ2aWNlX2NyZWRlbnRpYWxzX3BhdGggfTsiLCJpbXBvcnQge3NoZWV0c192NH0gZnJvbSBcImdvb2dsZWFwaXNcIjtcbmltcG9ydCB7ZXhjZWxfcm93X3RvX2luZGV4fSBmcm9tIFwiLi91dGlsXCI7XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGEgR29vZ2xlIFNoZWV0cyBzcHJlYWRzaGVldCB0YWIuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiIHtcbiAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyB8IG51bGw7XG4gICAgc2hlZXRfaWQ6IHN0cmluZztcbiAgICBzaGVldF9uYW1lOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYi5cbiAgICAgKiBAcGFyYW0ge3NoZWV0c192NC5TaGVldHMgfCBudWxsfSBzaGVldHNfc2VydmljZSAtIFRoZSBHb29nbGUgU2hlZXRzIEFQSSBzZXJ2aWNlIGluc3RhbmNlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaGVldF9pZCAtIFRoZSBJRCBvZiB0aGUgR29vZ2xlIFNoZWV0cyBzcHJlYWRzaGVldC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2hlZXRfbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBzaGVldCB0YWIuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzIHwgbnVsbCxcbiAgICAgICAgc2hlZXRfaWQ6IHN0cmluZyxcbiAgICAgICAgc2hlZXRfbmFtZTogc3RyaW5nXG4gICAgKSB7XG4gICAgICAgIHRoaXMuc2hlZXRzX3NlcnZpY2UgPSBzaGVldHNfc2VydmljZTtcbiAgICAgICAgdGhpcy5zaGVldF9pZCA9IHNoZWV0X2lkO1xuICAgICAgICB0aGlzLnNoZWV0X25hbWUgPSBzaGVldF9uYW1lLnNwbGl0KFwiIVwiKVswXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdmFsdWVzIGZyb20gdGhlIHNoZWV0LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbH0gW3JhbmdlXSAtIFRoZSByYW5nZSB0byBnZXQgdmFsdWVzIGZyb20uXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55W11bXSB8IHVuZGVmaW5lZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSB2YWx1ZXMgZnJvbSB0aGUgc2hlZXQuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3ZhbHVlcyhyYW5nZT86IHN0cmluZyB8IG51bGwpOiBQcm9taXNlPGFueVtdW10gfCB1bmRlZmluZWQ+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5fZ2V0X3ZhbHVlcyhyYW5nZSk7XG4gICAgICAgIHJldHVybiByZXN1bHQuZGF0YS52YWx1ZXMgPz8gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgcm93IGZvciBhIHNwZWNpZmljIHBhdHJvbGxlci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0cm9sbGVyX25hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcGF0cm9sbGVyLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lX2NvbHVtbiAtIFRoZSBjb2x1bW4gd2hlcmUgdGhlIHBhdHJvbGxlcidzIG5hbWUgaXMgbG9jYXRlZC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bGx9IFtyYW5nZV0gLSBUaGUgcmFuZ2UgdG8gc2VhcmNoIHdpdGhpbi5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx7IHJvdzogYW55W107IGluZGV4OiBudW1iZXI7IH0gfCBudWxsPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIHJvdyBhbmQgaW5kZXggb2YgdGhlIHBhdHJvbGxlciwgb3IgbnVsbCBpZiBub3QgZm91bmQuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3NoZWV0X3Jvd19mb3JfcGF0cm9sbGVyKFxuICAgICAgICBwYXRyb2xsZXJfbmFtZTogc3RyaW5nLFxuICAgICAgICBuYW1lX2NvbHVtbjogc3RyaW5nLFxuICAgICAgICByYW5nZT86IHN0cmluZyB8IG51bGxcbiAgICApOiBQcm9taXNlPHsgcm93OiBhbnlbXTsgaW5kZXg6IG51bWJlcjsgfSB8IG51bGw+IHtcbiAgICAgICAgY29uc3Qgcm93cyA9IGF3YWl0IHRoaXMuZ2V0X3ZhbHVlcyhyYW5nZSk7XG4gICAgICAgIGlmIChyb3dzKSB7XG4gICAgICAgICAgICBjb25zdCBsb29rdXBfaW5kZXggPSBleGNlbF9yb3dfdG9faW5kZXgobmFtZV9jb2x1bW4pO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJvd3NbaV1bbG9va3VwX2luZGV4XSA9PT0gcGF0cm9sbGVyX25hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgcm93OiByb3dzW2ldLCBpbmRleDogaSB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgYENvdWxkbid0IGZpbmQgcGF0cm9sbGVyICR7cGF0cm9sbGVyX25hbWV9IGluIHNoZWV0ICR7dGhpcy5zaGVldF9uYW1lfS5gXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB2YWx1ZXMgaW4gdGhlIHNoZWV0LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByYW5nZSAtIFRoZSByYW5nZSB0byB1cGRhdGUuXG4gICAgICogQHBhcmFtIHthbnlbXVtdfSB2YWx1ZXMgLSBUaGUgdmFsdWVzIHRvIHVwZGF0ZS5cbiAgICAgKi9cbiAgICBhc3luYyB1cGRhdGVfdmFsdWVzKHJhbmdlOiBzdHJpbmcsIHZhbHVlczogYW55W11bXSkge1xuICAgICAgICBjb25zdCB1cGRhdGVNZSA9IChhd2FpdCB0aGlzLl9nZXRfdmFsdWVzKHJhbmdlLCBudWxsKSkuZGF0YTtcblxuICAgICAgICB1cGRhdGVNZS52YWx1ZXMgPSB2YWx1ZXM7XG4gICAgICAgIGF3YWl0IHRoaXMuc2hlZXRzX3NlcnZpY2UhLnNwcmVhZHNoZWV0cy52YWx1ZXMudXBkYXRlKHtcbiAgICAgICAgICAgIHNwcmVhZHNoZWV0SWQ6IHRoaXMuc2hlZXRfaWQsXG4gICAgICAgICAgICB2YWx1ZUlucHV0T3B0aW9uOiBcIlVTRVJfRU5URVJFRFwiLFxuICAgICAgICAgICAgcmFuZ2U6IHVwZGF0ZU1lLnJhbmdlISxcbiAgICAgICAgICAgIHJlcXVlc3RCb2R5OiB1cGRhdGVNZSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHZhbHVlcyBmcm9tIHRoZSBzaGVldCAocHJpdmF0ZSBtZXRob2QpLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbH0gW3JhbmdlXSAtIFRoZSByYW5nZSB0byBnZXQgdmFsdWVzIGZyb20uXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCBudWxsfSBbdmFsdWVSZW5kZXJPcHRpb25dIC0gVGhlIHZhbHVlIHJlbmRlciBvcHRpb24uXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55W11bXT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSB2YWx1ZSByYW5nZS5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgYXN5bmMgX2dldF92YWx1ZXMoXG4gICAgICAgIHJhbmdlPzogc3RyaW5nIHwgbnVsbCxcbiAgICAgICAgdmFsdWVSZW5kZXJPcHRpb246IHN0cmluZyB8IG51bGwgPSBcIlVORk9STUFUVEVEX1ZBTFVFXCJcbiAgICApIHtcbiAgICAgICAgbGV0IGxvb2t1cFJhbmdlID0gdGhpcy5zaGVldF9uYW1lO1xuICAgICAgICBpZiAocmFuZ2UgIT0gbnVsbCkge1xuICAgICAgICAgICAgbG9va3VwUmFuZ2UgPSBsb29rdXBSYW5nZSArIFwiIVwiO1xuXG4gICAgICAgICAgICBpZiAocmFuZ2Uuc3RhcnRzV2l0aChsb29rdXBSYW5nZSkpIHtcbiAgICAgICAgICAgICAgICByYW5nZSA9IHJhbmdlLnN1YnN0cmluZyhsb29rdXBSYW5nZS5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9va3VwUmFuZ2UgPSBsb29rdXBSYW5nZSArIHJhbmdlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBvcHRzOiBzaGVldHNfdjQuUGFyYW1zJFJlc291cmNlJFNwcmVhZHNoZWV0cyRWYWx1ZXMkR2V0ID0ge1xuICAgICAgICAgICAgc3ByZWFkc2hlZXRJZDogdGhpcy5zaGVldF9pZCxcbiAgICAgICAgICAgIHJhbmdlOiBsb29rdXBSYW5nZSxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHZhbHVlUmVuZGVyT3B0aW9uKSB7XG4gICAgICAgICAgICBvcHRzLnZhbHVlUmVuZGVyT3B0aW9uID0gdmFsdWVSZW5kZXJPcHRpb247XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuc2hlZXRzX3NlcnZpY2UhLnNwcmVhZHNoZWV0cy52YWx1ZXMuZ2V0KG9wdHMpO1xuICAgIH1cbn1cbiIsIlxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkX3Bhc3Nlc19zdHJpbmcoXG4gICAgdXNlZDogbnVtYmVyLFxuICAgIHRvdGFsOiBudW1iZXIsXG4gICAgdG9kYXk6IG51bWJlcixcbiAgICBmb3JjZV90b2RheTogYm9vbGVhbiA9IGZhbHNlXG4pIHtcbiAgICBsZXQgbWVzc2FnZSA9IGBZb3UgaGF2ZSB1c2VkICR7dXNlZH0gb2YgJHt0b3RhbH0gZ3Vlc3QgcGFzc2VzIHRoaXMgc2Vhc29uYDtcbiAgICBpZiAoZm9yY2VfdG9kYXkgfHwgdG9kYXkgPiAwKSB7XG4gICAgICAgIG1lc3NhZ2UgKz0gYCAoJHt0b2RheX0gdXNlZCB0b2RheSlgO1xuICAgIH1cbiAgICBtZXNzYWdlICs9IFwiLlwiO1xuICAgIHJldHVybiBtZXNzYWdlO1xufVxuIiwiLyoqXG4gKiBWYWxpZGF0ZXMgaWYgdGhlIHByb3ZpZGVkIHNjb3BlcyBpbmNsdWRlIGFsbCBkZXNpcmVkIHNjb3Blcy5cbiAqIEBwYXJhbSB7c3RyaW5nW119IHNjb3BlcyAtIFRoZSBsaXN0IG9mIHNjb3BlcyB0byB2YWxpZGF0ZS5cbiAqIEBwYXJhbSB7c3RyaW5nW119IGRlc2lyZWRfc2NvcGVzIC0gVGhlIGxpc3Qgb2YgZGVzaXJlZCBzY29wZXMuXG4gKiBAdGhyb3dzIHtFcnJvcn0gVGhyb3dzIGFuIGVycm9yIGlmIGFueSBkZXNpcmVkIHNjb3BlIGlzIG1pc3NpbmcuXG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlX3Njb3BlcyhzY29wZXM6IHN0cmluZ1tdLCBkZXNpcmVkX3Njb3Blczogc3RyaW5nW10pIHtcbiAgICBmb3IgKGNvbnN0IGRlc2lyZWRfc2NvcGUgb2YgZGVzaXJlZF9zY29wZXMpIHtcbiAgICAgICAgaWYgKHNjb3BlcyA9PT0gdW5kZWZpbmVkIHx8ICFzY29wZXMuaW5jbHVkZXMoZGVzaXJlZF9zY29wZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gYE1pc3Npbmcgc2NvcGUgJHtkZXNpcmVkX3Njb3BlfSBpbiByZWNlaXZlZCBzY29wZXM6ICR7c2NvcGVzfWA7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IHt2YWxpZGF0ZV9zY29wZXN9IiwiaW1wb3J0IHsgU2VjdGlvbkNvbmZpZyB9IGZyb20gJy4uL2Vudi9oYW5kbGVyX2NvbmZpZyc7XG5cbi8qKlxuICAgICogQ2xhc3MgZm9yIHNlY3Rpb24gdmFsdWVzLlxuICAgICovXG5jbGFzcyBTZWN0aW9uVmFsdWVzIHtcbiAgICBzZWN0aW9uX2NvbmZpZzogU2VjdGlvbkNvbmZpZ1xuICAgIHNlY3Rpb25zOiBzdHJpbmdbXTtcbiAgICBsb3dlcmNhc2Vfc2VjdGlvbnM6IHN0cmluZ1tdO1xuXG4gICAgY29uc3RydWN0b3Ioc2VjdGlvbl9jb25maWc6IFNlY3Rpb25Db25maWcpIHtcbiAgICAgICAgdGhpcy5zZWN0aW9uX2NvbmZpZyA9IHNlY3Rpb25fY29uZmlnO1xuICAgICAgICB0aGlzLnNlY3Rpb25zID0gc2VjdGlvbl9jb25maWcuU0VDVElPTl9WQUxVRVMuc3BsaXQoJywnKTtcbiAgICAgICAgdGhpcy5sb3dlcmNhc2Vfc2VjdGlvbnMgPSBzZWN0aW9uX2NvbmZpZy5TRUNUSU9OX1ZBTFVFUy50b0xvd2VyQ2FzZSgpLnNwbGl0KCcsJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgc2VjdGlvbiBkZXNjcmlwdGlvbi5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgc2VjdGlvbiBkZXNjcmlwdGlvbi5cbiAgICAqL1xuICAgIGdldF9zZWN0aW9uX2Rlc2NyaXB0aW9uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlY3Rpb25fY29uZmlnLlNFQ1RJT05fVkFMVUVTO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogUGFyc2VzIGEgc2VjdGlvbi5cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5IC0gVGhlIGJvZHkgb2YgdGhlIHJlcXVlc3QuXG4gICAgKiBAcmV0dXJucyB7c3RyaW5nIHwgbnVsbH0gVGhlIHNlY3Rpb24gaWYgaXQgaXMgYSB2YWxpZCBzZWN0aW9uIG9yIG51bGwuXG4gICAgKi9cbiAgICBwYXJzZV9zZWN0aW9uKGJvZHk6IHN0cmluZyB8IG51bGwpOiBzdHJpbmcgfCBudWxsIHtcbiAgICAgICAgaWYgKGJvZHkgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgICByZXR1cm4gdGhpcy5sb3dlcmNhc2Vfc2VjdGlvbnMuaW5jbHVkZXMoYm9keS50b0xvd2VyQ2FzZSgpKSA/IGJvZHkgOiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogTWFwcyBhIGxvd2VyIGNhc2UgdmVyc2lvbiBvZiBhIHNlY3Rpb24gc3RyaW5nIHRvIHRoZSBvcmlnaW5hbCBjYXNlIHZhbHVlLlxuICAgICogQHBhcmFtIHtzdHJpbmd9IHNlY3Rpb24gLSBUaGUgbG93ZXIgY2FzZSBzZWN0aW9uIHN0cmluZy5cbiAgICAqIEByZXR1cm5zIHtzdHJpbmcgfSBUaGUgb3JpZ2luYWwgY2FzZSB2YWx1ZSBpZiBmb3VuZCwgb3RoZXJ3aXNlIG51bGwuXG4gICAgKi9cbiAgIG1hcF9zZWN0aW9uKHNlY3Rpb246IHN0cmluZyB8IG51bGwpOiBzdHJpbmcgIHtcbiAgICAgICBpZiAoc2VjdGlvbiA9PT0gbnVsbCkge1xuICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICB9XG4gICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmxvd2VyY2FzZV9zZWN0aW9ucy5pbmRleE9mKHNlY3Rpb24udG9Mb3dlckNhc2UoKSk7XG4gICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICByZXR1cm4gdGhpcy5zZWN0aW9uc1tpbmRleF07XG4gICAgICAgfVxuICAgICAgIHJldHVybiBcIlwiO1xuICAgfVxuXG59XG5cbmV4cG9ydCB7IFNlY3Rpb25WYWx1ZXMgfTsiLCIvKipcbiAqIENvbnZlcnQgcm93IGFuZCBjb2x1bW4gbnVtYmVycyB0byBhbiBFeGNlbC1saWtlIGluZGV4LlxuICogQHBhcmFtIHtudW1iZXJ9IHJvdyAtIFRoZSByb3cgbnVtYmVyICgwLWJhc2VkKS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBjb2wgLSBUaGUgY29sdW1uIG51bWJlciAoMC1iYXNlZCkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgRXhjZWwtbGlrZSBpbmRleCAoZS5nLiwgXCJBMVwiKS5cbiAqL1xuZnVuY3Rpb24gcm93X2NvbF90b19leGNlbF9pbmRleChyb3c6IG51bWJlciwgY29sOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGxldCBjb2xTdHJpbmcgPSBcIlwiO1xuICAgIGNvbCArPSAxO1xuICAgIHdoaWxlIChjb2wgPiAwKSB7XG4gICAgICAgIGNvbCAtPSAxO1xuICAgICAgICBjb25zdCBtb2R1bG8gPSBjb2wgJSAyNjtcbiAgICAgICAgY29uc3QgY29sTGV0dGVyID0gU3RyaW5nLmZyb21DaGFyQ29kZSgnQScuY2hhckNvZGVBdCgwKSArIG1vZHVsbyk7XG4gICAgICAgIGNvbFN0cmluZyA9IGNvbExldHRlciArIGNvbFN0cmluZztcbiAgICAgICAgY29sID0gTWF0aC5mbG9vcihjb2wgLyAyNik7XG4gICAgfVxuICAgIHJldHVybiBjb2xTdHJpbmcgKyAocm93ICsgMSkudG9TdHJpbmcoKTtcbn1cblxuLyoqXG4gKiBTcGxpdCBhbiBFeGNlbC1saWtlIGluZGV4IGludG8gcm93IGFuZCBjb2x1bW4gbnVtYmVycy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBleGNlbF9pbmRleCAtIFRoZSBFeGNlbC1saWtlIGluZGV4IChlLmcuLCBcIkExXCIpLlxuICogQHJldHVybnMge1tudW1iZXIsIG51bWJlcl19IEFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIHJvdyBhbmQgY29sdW1uIG51bWJlcnMgKDAtYmFzZWQpLlxuICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBpbmRleCBjYW5ub3QgYmUgcGFyc2VkLlxuICovXG5mdW5jdGlvbiBzcGxpdF90b19yb3dfY29sKGV4Y2VsX2luZGV4OiBzdHJpbmcpOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoXCJeKFtBLVphLXpdKykoWzAtOV0rKSRcIik7XG4gICAgY29uc3QgbWF0Y2ggPSByZWdleC5leGVjKGV4Y2VsX2luZGV4KTtcbiAgICBpZiAobWF0Y2ggPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gcGFyc2Ugc3RyaW5nIGZvciBleGNlbCBwb3NpdGlvbiBzcGxpdFwiKTtcbiAgICB9XG4gICAgY29uc3QgY29sID0gZXhjZWxfcm93X3RvX2luZGV4KG1hdGNoWzFdKTtcbiAgICBjb25zdCByYXdfcm93ID0gTnVtYmVyKG1hdGNoWzJdKTtcbiAgICBpZiAocmF3X3JvdyA8IDEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUm93IG11c3QgYmUgPj0xXCIpO1xuICAgIH1cbiAgICByZXR1cm4gW3Jhd19yb3cgLSAxLCBjb2xdO1xufVxuXG4vKipcbiAqIExvb2sgdXAgYSB2YWx1ZSBpbiBhIHNoZWV0IGJ5IGl0cyBFeGNlbC1saWtlIGluZGV4LlxuICogQHBhcmFtIHtzdHJpbmd9IGV4Y2VsX2luZGV4IC0gVGhlIEV4Y2VsLWxpa2UgaW5kZXggKGUuZy4sIFwiQTFcIikuXG4gKiBAcGFyYW0ge2FueVtdW119IHNoZWV0IC0gVGhlIHNoZWV0IGRhdGEuXG4gKiBAcmV0dXJucyB7YW55fSBUaGUgdmFsdWUgYXQgdGhlIHNwZWNpZmllZCBpbmRleCwgb3IgdW5kZWZpbmVkIGlmIG5vdCBmb3VuZC5cbiAqL1xuZnVuY3Rpb24gbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQoZXhjZWxfaW5kZXg6IHN0cmluZywgc2hlZXQ6IGFueVtdW10pOiBhbnkge1xuICAgIGNvbnN0IFtyb3csIGNvbF0gPSBzcGxpdF90b19yb3dfY29sKGV4Y2VsX2luZGV4KTtcbiAgICBpZiAocm93ID49IHNoZWV0Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gc2hlZXRbcm93XVtjb2xdO1xufVxuXG4vKipcbiAqIENvbnZlcnQgRXhjZWwtbGlrZSBjb2x1bW4gbGV0dGVycyB0byBhIGNvbHVtbiBudW1iZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gbGV0dGVycyAtIFRoZSBjb2x1bW4gbGV0dGVycyAoZS5nLiwgXCJBXCIpLlxuICogQHJldHVybnMge251bWJlcn0gVGhlIGNvbHVtbiBudW1iZXIgKDAtYmFzZWQpLlxuICovXG5mdW5jdGlvbiBleGNlbF9yb3dfdG9faW5kZXgobGV0dGVyczogc3RyaW5nKTogbnVtYmVyIHtcbiAgICBjb25zdCBsb3dlckxldHRlcnMgPSBsZXR0ZXJzLnRvTG93ZXJDYXNlKCk7XG4gICAgbGV0IHJlc3VsdDogbnVtYmVyID0gMDtcbiAgICBmb3IgKGxldCBwID0gMDsgcCA8IGxvd2VyTGV0dGVycy5sZW5ndGg7IHArKykge1xuICAgICAgICBjb25zdCBjaGFyYWN0ZXJWYWx1ZSA9XG4gICAgICAgICAgICBsb3dlckxldHRlcnMuY2hhckNvZGVBdChwKSAtIFwiYVwiLmNoYXJDb2RlQXQoMCkgKyAxO1xuICAgICAgICByZXN1bHQgPSBjaGFyYWN0ZXJWYWx1ZSArIHJlc3VsdCAqIDI2O1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0IC0gMTtcbn1cblxuLyoqXG4gKiBQYXJzZSBhIEdvb2dsZSBTaGVldHMgY2hlY2tib3gvYm9vbGVhbiBjZWxsIHZhbHVlIGFzIGEgYm9vbGVhbi5cbiAqIEFjY2VwdHMgSlMgYm9vbGVhbiB0cnVlL2ZhbHNlIGFuZCBzdHJpbmcgbGl0ZXJhbHMgXCJUUlVFXCIvXCJGQUxTRVwiXG4gKiAoY2FzZS1pbnNlbnNpdGl2ZSkgZnJvbSBTaGVldHMsICBkZXBlbmRpbmcgb24gdGhlIGNlbGwgZm9ybWF0dGluZy5cbiAqIEFueSB2YWx1ZSB0aGF0IGNhbm5vdCBiZSByZWNvZ25pemVkIGFzIHRydWUgaXMgY29uc2lkZXJlZCBmYWxzZS5cbiAqIEBwYXJhbSB7YW55fSB2YWx1ZSAtIFJhdyBjZWxsIHZhbHVlLlxuICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgb25seSB3aGVuIHZhbHVlIGlzIHRydWUgb3IgXCJUUlVFXCIgKGNhc2UtaW5zZW5zaXRpdmUpLlxuICovXG5mdW5jdGlvbiBwYXJzZV9ib29sZWFuX2NlbGwodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiB2YWx1ZS50b1VwcGVyQ2FzZSgpID09PSBcIlRSVUVcIjtcbn1cblxuLyoqXG4gKiBTYW5pdGl6ZSBhIHBob25lIG51bWJlciBieSByZW1vdmluZyB1bndhbnRlZCBjaGFyYWN0ZXJzLlxuICogQHBhcmFtIHtudW1iZXIgfCBzdHJpbmd9IG51bWJlciAtIFRoZSBwaG9uZSBudW1iZXIgdG8gc2FuaXRpemUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgc2FuaXRpemVkIHBob25lIG51bWJlci5cbiAqL1xuZnVuY3Rpb24gc2FuaXRpemVfcGhvbmVfbnVtYmVyKG51bWJlcjogbnVtYmVyIHwgc3RyaW5nKTogc3RyaW5nIHtcbiAgICBsZXQgbmV3X251bWJlciA9IG51bWJlci50b1N0cmluZygpO1xuICAgIG5ld19udW1iZXIgPSBuZXdfbnVtYmVyLnJlcGxhY2UoXCJ3aGF0c2FwcDpcIiwgXCJcIik7XG4gICAgbGV0IHRlbXBvcmFyeV9uZXdfbnVtYmVyOiBzdHJpbmcgPSBcIlwiO1xuICAgIHdoaWxlICh0ZW1wb3JhcnlfbmV3X251bWJlciAhPSBuZXdfbnVtYmVyKSB7XG4gICAgICAgIC8vIERvIHRoaXMgbXVsdGlwbGUgdGltZXMgc28gd2UgZ2V0IGFsbCArMSBhdCB0aGUgc3RhcnQgb2YgdGhlIHN0cmluZywgZXZlbiBhZnRlciBzdHJpcHBpbmcuXG4gICAgICAgIHRlbXBvcmFyeV9uZXdfbnVtYmVyID0gbmV3X251bWJlcjtcbiAgICAgICAgbmV3X251bWJlciA9IG5ld19udW1iZXIucmVwbGFjZSgvKF5cXCsxfFxcKHxcXCl8XFwufC0pL2csIFwiXCIpO1xuICAgIH1cbiAgICBjb25zdCByZXN1bHQgPSBTdHJpbmcocGFyc2VJbnQobmV3X251bWJlcikpLnBhZFN0YXJ0KDEwLCBcIjBcIik7XG4gICAgaWYgKHJlc3VsdC5sZW5ndGggPT0gMTEgJiYgcmVzdWx0WzBdID09IFwiMVwiKSB7XG4gICAgICAgIHJldHVybiByZXN1bHQuc3Vic3RyaW5nKDEpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQge1xuICAgIHJvd19jb2xfdG9fZXhjZWxfaW5kZXgsXG4gICAgZXhjZWxfcm93X3RvX2luZGV4LFxuICAgIHNhbml0aXplX3Bob25lX251bWJlcixcbiAgICBzcGxpdF90b19yb3dfY29sLFxuICAgIGxvb2t1cF9yb3dfY29sX2luX3NoZWV0LFxuICAgIHBhcnNlX2Jvb2xlYW5fY2VsbCxcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJnb29nbGVhcGlzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNtcy1zZWdtZW50cy1jYWxjdWxhdG9yXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbmNvbnN0IF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0Y29uc3QgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdGNvbnN0IG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHRjb25zdCBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0Y29uc3QgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIvdmFsdWUgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGlmKEFycmF5LmlzQXJyYXkoZGVmaW5pdGlvbikpIHtcblx0XHR2YXIgaSA9IDA7XG5cdFx0d2hpbGUoaSA8IGRlZmluaXRpb24ubGVuZ3RoKSB7XG5cdFx0XHR2YXIga2V5ID0gZGVmaW5pdGlvbltpKytdO1xuXHRcdFx0dmFyIGJpbmRpbmcgPSBkZWZpbml0aW9uW2krK107XG5cdFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdFx0aWYoYmluZGluZyA9PT0gMCkge1xuXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IGRlZmluaXRpb25baSsrXSB9KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogYmluZGluZyB9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmKGJpbmRpbmcgPT09IDApIHsgaSsrOyB9XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYoU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlc1wiO1xuaW1wb3J0IHtcbiAgICBDb250ZXh0LFxuICAgIFNlcnZlcmxlc3NDYWxsYmFjayxcbiAgICBTZXJ2ZXJsZXNzRXZlbnRPYmplY3QsXG4gICAgU2VydmVybGVzc0Z1bmN0aW9uU2lnbmF0dXJlLFxufSBmcm9tIFwiQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlcy90eXBlc1wiO1xuaW1wb3J0IEJWTlNQSGFuZGxlciwgeyBCVk5TUEV2ZW50IH0gZnJvbSBcIi4vYnZuc3BfaGFuZGxlclwiO1xuaW1wb3J0IHsgSGFuZGxlckVudmlyb25tZW50IH0gZnJvbSBcIi4uL2Vudi9oYW5kbGVyX2NvbmZpZ1wiO1xuXG5jb25zdCBORVhUX1NURVBfQ09PS0lFX05BTUUgPSBcImJ2bnNwX25leHRfc3RlcFwiO1xuXG4vKipcbiAqIFR3aWxpbyBTZXJ2ZXJsZXNzIGZ1bmN0aW9uIGhhbmRsZXIgZm9yIEJWTlNQIGJvdCBjb21tYW5kcy5cbiAqIEBwYXJhbSB7Q29udGV4dDxIYW5kbGVyRW52aXJvbm1lbnQ+fSBjb250ZXh0IC0gVGhlIFR3aWxpbyBzZXJ2ZXJsZXNzIGNvbnRleHQuXG4gKiBAcGFyYW0ge1NlcnZlcmxlc3NFdmVudE9iamVjdDxCVk5TUEV2ZW50Pn0gZXZlbnQgLSBUaGUgZXZlbnQgb2JqZWN0LlxuICogQHBhcmFtIHtTZXJ2ZXJsZXNzQ2FsbGJhY2t9IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgY29uc3QgaGFuZGxlcjogU2VydmVybGVzc0Z1bmN0aW9uU2lnbmF0dXJlPFxuICAgIEhhbmRsZXJFbnZpcm9ubWVudCxcbiAgICBCVk5TUEV2ZW50XG4+ID0gYXN5bmMgZnVuY3Rpb24gKFxuICAgIGNvbnRleHQ6IENvbnRleHQ8SGFuZGxlckVudmlyb25tZW50PixcbiAgICBldmVudDogU2VydmVybGVzc0V2ZW50T2JqZWN0PEJWTlNQRXZlbnQ+LFxuICAgIGNhbGxiYWNrOiBTZXJ2ZXJsZXNzQ2FsbGJhY2tcbikge1xuICAgIGNvbnN0IGhhbmRsZXIgPSBuZXcgQlZOU1BIYW5kbGVyKGNvbnRleHQsIGV2ZW50KTtcbiAgICBsZXQgbWVzc2FnZTogc3RyaW5nO1xuICAgIGxldCBuZXh0X3N0ZXA6IHN0cmluZyA9IFwiXCI7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgaGFuZGxlcl9yZXNwb25zZSA9IGF3YWl0IGhhbmRsZXIuaGFuZGxlKCk7XG4gICAgICAgIG1lc3NhZ2UgPVxuICAgICAgICAgICAgaGFuZGxlcl9yZXNwb25zZS5yZXNwb25zZSB8fFxuICAgICAgICAgICAgXCJVbmV4cGVjdGVkIHJlc3VsdCAtIG5vIHJlc3BvbnNlIGRldGVybWluZWRcIjtcbiAgICAgICAgbmV4dF9zdGVwID0gaGFuZGxlcl9yZXNwb25zZS5uZXh0X3N0ZXAgfHwgXCJcIjtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQW4gZXJyb3Igb2NjdXJlZFwiKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGUpKTtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgfVxuICAgICAgICBtZXNzYWdlID0gXCJBbiB1bmV4cGVjdGVkIGVycm9yIG9jY3VyZWQuXCI7XG4gICAgICAgIGlmIChlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIG1lc3NhZ2UgKz0gXCJcXG5cIiArIGUubWVzc2FnZTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3JcIiwgZS5zdGFjayk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yXCIsIGUubmFtZSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yXCIsIGUubWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCByZXNwb25zZSA9IG5ldyBUd2lsaW8uUmVzcG9uc2UoKTtcbiAgICBjb25zdCB0d2ltbCA9IG5ldyBUd2lsaW8udHdpbWwuTWVzc2FnaW5nUmVzcG9uc2UoKTtcblxuICAgIHR3aW1sLm1lc3NhZ2UobWVzc2FnZSk7XG5cbiAgICByZXNwb25zZVxuICAgICAgICAvLyBBZGQgdGhlIHN0cmluZ2lmaWVkIFR3aU1MIHRvIHRoZSByZXNwb25zZSBib2R5XG4gICAgICAgIC5zZXRCb2R5KHR3aW1sLnRvU3RyaW5nKCkpXG4gICAgICAgIC8vIFNpbmNlIHdlJ3JlIHJldHVybmluZyBUd2lNTCwgdGhlIGNvbnRlbnQgdHlwZSBtdXN0IGJlIFhNTFxuICAgICAgICAuYXBwZW5kSGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwidGV4dC94bWxcIilcbiAgICAgICAgLnNldENvb2tpZShORVhUX1NURVBfQ09PS0lFX05BTUUsIG5leHRfc3RlcCk7XG5cbiAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgcmVzcG9uc2UpO1xufTsiXSwibmFtZXMiOlsiQ2hlY2tpblZhbHVlIiwidXNlcl9jcmVkc19jb25maWciLCJOU1BfRU1BSUxfRE9NQUlOIiwiZmluZF9wYXRyb2xsZXJfY29uZmlnIiwiU0hFRVRfSUQiLCJQSE9ORV9OVU1CRVJfTE9PS1VQX1NIRUVUIiwiUEhPTkVfTlVNQkVSX05BTUVfQ09MVU1OIiwiUEhPTkVfTlVNQkVSX05VTUJFUl9DT0xVTU4iLCJsb2dpbl9zaGVldF9jb25maWciLCJMT0dJTl9TSEVFVF9MT09LVVAiLCJDSEVDS0lOX0NPVU5UX0xPT0tVUCIsIlNIRUVUX0RBVEVfQ0VMTCIsIkNVUlJFTlRfREFURV9DRUxMIiwiQVJDSElWRURfQ0VMTCIsIk5BTUVfQ09MVU1OIiwiQ0FURUdPUllfQ09MVU1OIiwiU0VDVElPTl9EUk9QRE9XTl9DT0xVTU4iLCJDSEVDS0lOX0RST1BET1dOX0NPTFVNTiIsInNlYXNvbl9zaGVldF9jb25maWciLCJTRUFTT05fU0hFRVQiLCJTRUFTT05fU0hFRVRfTkFNRV9DT0xVTU4iLCJTRUFTT05fU0hFRVRfREFZU19DT0xVTU4iLCJzZWN0aW9uX2NvbmZpZyIsIlNFQ1RJT05fVkFMVUVTIiwiZ3Vlc3RfcGFzc2VzX2NvbmZpZyIsIkdVRVNUX1BBU1NfU0hFRVQiLCJHVUVTVF9QQVNTX0VMSUdJQkxFX0NPTFVNTiIsIkdVRVNUX1BBU1NfRUxJR0lCTEVfUkVBU09OX0NPTFVNTiIsIkdVRVNUX1BBU1NfU0hFRVRfTkFNRV9DT0xVTU4iLCJHVUVTVF9QQVNTX1NIRUVUX0FWQUlMQUJMRV9DT0xVTU4iLCJHVUVTVF9QQVNTX1NIRUVUX1VTRURfVE9EQVlfQ09MVU1OIiwiR1VFU1RfUEFTU19TSEVFVF9VU0VEX1NFQVNPTl9DT0xVTU4iLCJHVUVTVF9QQVNTX1NIRUVUX0RBVEVTX1NUQVJUSU5HX0NPTFVNTiIsImhhbmRsZXJfY29uZmlnIiwiU0NSSVBUX0lEIiwiU1lOQ19TSUQiLCJBUkNISVZFX0ZVTkNUSU9OX05BTUUiLCJSRVNFVF9GVU5DVElPTl9OQU1FIiwiVVNFX1NFUlZJQ0VfQUNDT1VOVCIsIkFDVElPTl9MT0dfU0hFRVQiLCJDSEVDS0lOX1ZBTFVFUyIsIkNPTkZJRyIsImdvb2dsZSIsIkxvZ2luU2hlZXQiLCJTZWFzb25TaGVldCIsIlVzZXJDcmVkcyIsIkNoZWNraW5WYWx1ZXMiLCJnZXRfc2VydmljZV9jcmVkZW50aWFsc19wYXRoIiwiZXhjZWxfcm93X3RvX2luZGV4Iiwic2FuaXRpemVfcGhvbmVfbnVtYmVyIiwiYnVpbGRfcGFzc2VzX3N0cmluZyIsIkd1ZXN0UGFzc1NoZWV0IiwiU2VjdGlvblZhbHVlcyIsIk5FWFRfU1RFUFMiLCJBV0FJVF9DT01NQU5EIiwiQVdBSVRfQ0hFQ0tJTiIsIkNPTkZJUk1fUkVTRVQiLCJBVVRIX1JFU0VUIiwiQVdBSVRfU0VDVElPTiIsIkFXQUlUX1BBU1MiLCJBV0FJVF9NRVNTQUdFIiwiQVdBSVRfQlJPQURDQVNUIiwiQ09NTUFORFMiLCJPTl9EVVRZIiwiU1RBVFVTIiwiQ0hFQ0tJTiIsIlNFQ1RJT05fQVNTSUdOTUVOVCIsIkdVRVNUX1BBU1MiLCJXSEFUU0FQUCIsIk1FU1NBR0UiLCJCUk9BRENBU1QiLCJTTVNfTUFYX0xFTkdUSCIsIk1FU1NBR0VfUFJFRklYX1RFTVBMQVRFIiwiTUVTU0FHRV9QUkVGSVhfU1VGRklYIiwidmFsaWRhdGVfc21zX21lc3NhZ2UiLCJmdWxsX21lc3NhZ2UiLCJTZWdtZW50ZWRNZXNzYWdlIiwicmVxdWlyZSIsInNlZ21lbnRlZCIsIm5vbl9nc20iLCJnZXROb25Hc21DaGFyYWN0ZXJzIiwibGVuZ3RoIiwidmFsaWQiLCJyZWFzb24iLCJub25fZ3NtX2NoYXJhY3RlcnMiLCJTZXQiLCJzZWdtZW50c0NvdW50Iiwic2VnbWVudHNfY291bnQiLCJmb3JtYXRfcGhvbmVfZm9yX2Rpc3BsYXkiLCJ0ZW5fZGlnaXRzIiwic3Vic3RyaW5nIiwiQlZOU1BIYW5kbGVyIiwiU0NPUEVTIiwic21zX3JlcXVlc3QiLCJyZXN1bHRfbWVzc2FnZXMiLCJmcm9tIiwidG8iLCJib2R5IiwiYm9keV9yYXciLCJwYXRyb2xsZXIiLCJidm5zcF9uZXh0X3N0ZXAiLCJjaGVja2luX21vZGUiLCJmYXN0X2NoZWNraW4iLCJhc3NpZ25lZF9zZWN0aW9uIiwidHdpbGlvX2NsaWVudCIsInN5bmNfc2lkIiwicmVzZXRfc2NyaXB0X2lkIiwic3luY19jbGllbnQiLCJ1c2VyX2NyZWRzIiwic2VydmljZV9jcmVkcyIsInNoZWV0c19zZXJ2aWNlIiwidXNlcl9zY3JpcHRzX3NlcnZpY2UiLCJsb2dpbl9zaGVldCIsInNlYXNvbl9zaGVldCIsImd1ZXN0X3Bhc3Nfc2hlZXQiLCJjaGVja2luX3ZhbHVlcyIsImN1cnJlbnRfc2hlZXRfZGF0ZSIsImNvbWJpbmVkX2NvbmZpZyIsImNvbmZpZyIsInNlY3Rpb25fdmFsdWVzIiwiY29udGV4dCIsImV2ZW50IiwiRnJvbSIsIm51bWJlciIsInVuZGVmaW5lZCIsInRlc3RfbnVtYmVyIiwiVG8iLCJCb2R5IiwidG9Mb3dlckNhc2UiLCJ0cmltIiwicmVwbGFjZSIsInJlcXVlc3QiLCJjb29raWVzIiwiZ2V0VHdpbGlvQ2xpZW50IiwiZSIsImNvbnNvbGUiLCJsb2ciLCJEYXRlIiwicGFyc2VfZmFzdF9jaGVja2luX21vZGUiLCJwYXJzZWQiLCJwYXJzZV9mYXN0X2NoZWNraW4iLCJrZXkiLCJwYXJzZV9jaGVja2luIiwicGFyc2VfY2hlY2tpbl9mcm9tX25leHRfc3RlcCIsImxhc3Rfc2VnbWVudCIsInNwbGl0Iiwic2xpY2UiLCJieV9rZXkiLCJkZWxheSIsInNlY29uZHMiLCJvcHRpb25hbCIsIlByb21pc2UiLCJyZXMiLCJzZXRUaW1lb3V0Iiwic2VuZF9tZXNzYWdlIiwibWVzc2FnZSIsImdldF90d2lsaW9fY2xpZW50IiwibWVzc2FnZXMiLCJjcmVhdGUiLCJwdXNoIiwiaGFuZGxlIiwicmVzdWx0IiwiX2hhbmRsZSIsInJlc3BvbnNlIiwiam9pbiIsIm5leHRfc3RlcCIsImxvZ291dCIsImNoZWNrX3VzZXJfY3JlZHMiLCJnZXRfbWFwcGVkX3BhdHJvbGxlciIsImF3YWl0X3Jlc3BvbnNlIiwiaGFuZGxlX2F3YWl0X2NvbW1hbmQiLCJjaGVja2luIiwic3RhcnRzV2l0aCIsIm5hbWUiLCJyZXNldF9zaGVldF9mbG93Iiwic2VjdGlvbiIsInBhcnNlX3NlY3Rpb24iLCJhc3NpZ25fc2VjdGlvbiIsInByb21wdF9zZWN0aW9uX2Fzc2lnbm1lbnQiLCJzZW5kX3RleHRfbWVzc2FnZSIsInNlbmRfYnJvYWRjYXN0X21lc3NhZ2UiLCJwcm9tcHRfY29tbWFuZCIsInBhdHJvbGxlcl9uYW1lIiwiaW5jbHVkZXMiLCJnZXRfb25fZHV0eSIsImdldF9zdGF0dXMiLCJwcm9tcHRfY2hlY2tpbiIsInByb21wdF9ndWVzdF9wYXNzIiwicGFyc2VfZmFzdF9zZWN0aW9uX2Fzc2lnbm1lbnQiLCJwcm9tcHRfbWVzc2FnZSIsInByb21wdF9icm9hZGNhc3QiLCJ0eXBlcyIsIk9iamVjdCIsInZhbHVlcyIsIm1hcCIsIngiLCJzbXNfZGVzYyIsInNlZ21lbnRzIiwibGFzdFNlZ21lbnQiLCJwb3AiLCJmaXJzdFBhcnQiLCJtYXBfc2VjdGlvbiIsInNlY3Rpb25fZGVzY3JpcHRpb24iLCJnZXRfc2VjdGlvbl9kZXNjcmlwdGlvbiIsImdldF9tZXNzYWdlX3ByZWZpeCIsInNlbmRlcl9uYW1lIiwic2VuZGVyX3Bob25lIiwiZm9ybWF0dGVkX3Bob25lIiwiZ2V0X21heF9tZXNzYWdlX2xlbmd0aCIsImdldF9sb2dpbl9zaGVldCIsInJlY2lwaWVudHMiLCJnZXRfb25fZHV0eV9wYXRyb2xsZXJzIiwibWF4X2xlbmd0aCIsIm1lc3NhZ2VfdGV4dCIsInByZWZpeCIsInZhbGlkYXRpb24iLCJiYWRfY2hhcnMiLCJzaWduZWRfaW5fcGF0cm9sbGVycyIsInBob25lX21hcCIsImdldF9waG9uZV9udW1iZXJfbWFwIiwicmVjaXBpZW50X21hcCIsIm5vX3Bob25lX25hbWVzIiwicGhvbmUiLCJzZW50X2NvdW50IiwiY29weV9zZW50X3RvX3NlbmRlciIsImZhaWxlZF9uYW1lcyIsImRlbGl2ZXJfc21zX3RvX21hcCIsImxvZ19hY3Rpb24iLCJhbGxfZmFpbGVkIiwiZW50cmllcyIsIm5vcm1hbGl6ZWRfc2VuZGVyIiwic2VuZGVyX2luX21hcCIsInJlY2lwaWVudF9jb3VudCIsImtleXMiLCJnZXRfc2hlZXRzX3NlcnZpY2UiLCJvcHRzIiwic3ByZWFkc2hlZXRzIiwiZ2V0Iiwic3ByZWFkc2hlZXRJZCIsInJhbmdlIiwidmFsdWVSZW5kZXJPcHRpb24iLCJkYXRhIiwicm93IiwicmF3TnVtYmVyIiwiYXNzaWduZWRTZWN0aW9uIiwibWFwcGVkX3NlY3Rpb24iLCJyZWZyZXNoIiwic2hlZXRfZGF0ZSIsInRvRGF0ZVN0cmluZyIsImN1cnJlbnRfZGF0ZSIsImlzX2N1cnJlbnQiLCJnZXRfc3RhdHVzX3N0cmluZyIsImd1ZXN0X3Bhc3NfcHJvbWlzZSIsImdldF9ndWVzdF9wYXNzX3NoZWV0IiwiZ2V0X2F2YWlsYWJsZV9hbmRfdXNlZF9wYXNzZXMiLCJwYXRyb2xsZXJfc3RhdHVzIiwiY2hlY2tpbkNvbHVtblNldCIsImNoZWNrZWRPdXQiLCJieV9zaGVldF9zdHJpbmciLCJzdGF0dXMiLCJ0b1N0cmluZyIsImNvbXBsZXRlZFBhdHJvbERheXMiLCJnZXRfc2Vhc29uX3NoZWV0IiwiZ2V0X3BhdHJvbGxlZF9kYXlzIiwiY29tcGxldGVkUGF0cm9sRGF5c1N0cmluZyIsImxvZ2luU2hlZXREYXRlIiwic3RhdHVzU3RyaW5nIiwidXNlZFRvZGF5R3Vlc3RQYXNzZXMiLCJ1c2VkX3RvZGF5IiwidXNlZFNlYXNvbkd1ZXN0UGFzc2VzIiwidXNlZF9zZWFzb24iLCJhdmFpbGFibGVHdWVzdFBhc3NlcyIsImF2YWlsYWJsZSIsInNoZWV0X25lZWRzX3Jlc2V0IiwiRXJyb3IiLCJuZXdfY2hlY2tpbl92YWx1ZSIsInNoZWV0c192YWx1ZSIsImZhc3RfY2hlY2tpbnMiLCJyZXNldF9zaGVldCIsInNjcmlwdF9zZXJ2aWNlIiwiZ2V0X3VzZXJfc2NyaXB0c19zZXJ2aWNlIiwic2hvdWxkX3BlcmZvcm1fYXJjaGl2ZSIsImFyY2hpdmVkIiwic2NyaXB0cyIsInJ1biIsInNjcmlwdElkIiwicmVxdWVzdEJvZHkiLCJmdW5jdGlvbiIsImdldF91c2VyX2NyZWRzIiwibG9hZFRva2VuIiwiYXV0aFVybCIsImdldEF1dGhVcmwiLCJjaGVja2VkX291dF9zZWN0aW9uIiwibGFzdF9zZWN0aW9ucyIsIm9uX2R1dHlfcGF0cm9sbGVycyIsImJ5X3NlY3Rpb24iLCJmaWx0ZXIiLCJyZWR1Y2UiLCJwcmV2IiwiY3VyIiwic2hvcnRfY29kZSIsInJlc3VsdHMiLCJhbGxfa2V5cyIsIm9yZGVyZWRfcHJpbWFyeV9zZWN0aW9ucyIsInNvcnQiLCJmaWx0ZXJlZF9sYXN0X3NlY3Rpb25zIiwib3JkZXJlZF9zZWN0aW9ucyIsImNvbmNhdCIsInBhdHJvbGxlcnMiLCJ5IiwibG9jYWxlQ29tcGFyZSIsInBhdHJvbGxlcl9zdHJpbmciLCJkZXRhaWxzIiwidG9VcHBlckNhc2UiLCJyIiwiYWN0aW9uX25hbWUiLCJhcHBlbmQiLCJ2YWx1ZUlucHV0T3B0aW9uIiwiZGVsZXRlVG9rZW4iLCJnZXRfc3luY19jbGllbnQiLCJzeW5jIiwidjEiLCJzZXJ2aWNlcyIsImdldF9zZXJ2aWNlX2NyZWRzIiwiYXV0aCIsIkdvb2dsZUF1dGgiLCJrZXlGaWxlIiwic2NvcGVzIiwiZ2V0X3ZhbGlkX2NyZWRzIiwicmVxdWlyZV91c2VyX2NyZWRzIiwib2F1dGgyX2NsaWVudCIsInNoZWV0cyIsInZlcnNpb24iLCJzY3JpcHQiLCJmb3JjZSIsInBob25lX2xvb2t1cCIsImZpbmRfcGF0cm9sbGVyX2Zyb21fbnVtYmVyIiwibWFwcGVkUGF0cm9sbGVyIiwidHJ5X2ZpbmRfcGF0cm9sbGVyIiwicmF3X251bWJlciIsImN1cnJlbnROdW1iZXIiLCJjdXJyZW50TmFtZSIsInNoZWV0IiwidXNlZF9hbmRfYXZhaWxhYmxlIiwiZ2V0X3Byb21wdCIsInNldF91c2VkX2d1ZXN0X3Bhc3NlcyIsInVwZGF0ZWQiLCJyb3dfY29sX3RvX2V4Y2VsX2luZGV4IiwicGFyc2VfYm9vbGVhbl9jZWxsIiwiR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIiLCJmb3JtYXRfZGF0ZV9mb3Jfc3ByZWFkc2hlZXRfdmFsdWUiLCJVc2VkQW5kQXZhaWxhYmxlUGFzc2VzIiwiaW5kZXgiLCJlbGlnaWJsZSIsImVsaWdpYmxlX3JlYXNvbiIsIlN0cmluZyIsIk51bWJlciIsIlBhc3NTaGVldCIsInBhdHJvbGxlcl9yb3ciLCJnZXRfc2hlZXRfcm93X2Zvcl9wYXRyb2xsZXIiLCJuYW1lX2NvbHVtbiIsImVsaWdpYmxlX2NvbHVtbiIsImVsaWdpYmxlX3JlYXNvbl9jb2x1bW4iLCJjdXJyZW50X2RheV9hdmFpbGFibGVfcGFzc2VzIiwiYXZhaWxhYmxlX2NvbHVtbiIsImN1cnJlbnRfZGF5X3VzZWRfcGFzc2VzIiwidXNlZF90b2RheV9jb2x1bW4iLCJjdXJyZW50X3NlYXNvbl91c2VkX3Bhc3NlcyIsInVzZWRfc2Vhc29uX2NvbHVtbiIsInJvd251bSIsInN0YXJ0X2luZGV4IiwicHJpb3JfbGVuZ3RoIiwiY3VycmVudF9kYXRlX3N0cmluZyIsIm5ld192YWxzIiwidXBkYXRlX2xlbmd0aCIsIk1hdGgiLCJtYXgiLCJlbmRfaW5kZXgiLCJzaGVldF9uYW1lIiwidXBkYXRlX3ZhbHVlcyIsImxvb2t1cF9yb3dfY29sX2luX3NoZWV0Iiwic2FuaXRpemVfZGF0ZSIsImNoZWNraW5fY291bnRfc2hlZXQiLCJyb3dzIiwiY2hlY2tpbl9jb3VudCIsImdldF92YWx1ZXMiLCJpIiwicGFyc2VfcGF0cm9sbGVyX3JvdyIsImdldFRpbWUiLCJKU09OIiwic3RyaW5naWZ5IiwicGF0cm9sbGVyX3NlY3Rpb24iLCJuZXdfc2VjdGlvbl92YWx1ZSIsImNhdGVnb3J5IiwiZmlsdGVyX2xpc3RfdG9fZW5kc3dpdGhfY3VycmVudF9kYXkiLCJjdXJyZW50RGF5IiwibG9hZF9jcmVkZW50aWFsc19maWxlcyIsInZhbGlkYXRlX3Njb3BlcyIsImRvbWFpbiIsImxvYWRlZCIsImNyZWRlbnRpYWxzIiwiY2xpZW50X3NlY3JldCIsImNsaWVudF9pZCIsInJlZGlyZWN0X3VyaXMiLCJ3ZWIiLCJPQXV0aDIiLCJ0b2tlbl9rZXkiLCJvYXV0aDJEb2MiLCJkb2N1bWVudHMiLCJmZXRjaCIsInRva2VuIiwic2V0Q3JlZGVudGlhbHMiLCJzaWQiLCJyZW1vdmUiLCJjb21wbGV0ZUxvZ2luIiwiY29kZSIsImdldFRva2VuIiwidG9rZW5zIiwib2F1dGhEb2MiLCJ1bmlxdWVOYW1lIiwidXBkYXRlIiwiaWQiLCJnZW5lcmF0ZVJhbmRvbVN0cmluZyIsImRvYyIsInR0bCIsImFjY2Vzc190eXBlIiwic2NvcGUiLCJzdGF0ZSIsImdlbmVyYXRlQXV0aFVybCIsImNoYXJhY3RlcnMiLCJjaGFyYWN0ZXJzTGVuZ3RoIiwiY2hhckF0IiwiZmxvb3IiLCJyYW5kb20iLCJsb29rdXBfdmFsdWVzIiwiQXJyYXkiLCJzbXNfZGVzY19zcGxpdCIsImxvb2t1cF92YWxzIiwiYnlfbHYiLCJieV9mYyIsImNoZWNraW5WYWx1ZXMiLCJjaGVja2luVmFsdWUiLCJsdiIsImZjIiwiY2hlY2tpbl9sb3dlciIsImV4Y2VsX2RhdGVfdG9fanNfZGF0ZSIsImRhdGUiLCJzZXRVVENNaWxsaXNlY29uZHMiLCJyb3VuZCIsImNoYW5nZV90aW1lem9uZV90b19wc3QiLCJ0b1VUQ1N0cmluZyIsInN0cmlwX2RhdGV0aW1lX3RvX2RhdGUiLCJ0b0xvY2FsZURhdGVTdHJpbmciLCJ0aW1lWm9uZSIsInBhZFN0YXJ0IiwiZmlsdGVyX2xpc3RfdG9fZW5kc3dpdGhfZGF0ZSIsImxpc3QiLCJkYXRlc3RyIiwiZW5kc1dpdGgiLCJmcyIsInBhcnNlIiwicmVhZEZpbGVTeW5jIiwiUnVudGltZSIsImdldEFzc2V0cyIsInBhdGgiLCJzaGVldF9pZCIsIl9nZXRfdmFsdWVzIiwibG9va3VwX2luZGV4IiwidXBkYXRlTWUiLCJsb29rdXBSYW5nZSIsInVzZWQiLCJ0b3RhbCIsInRvZGF5IiwiZm9yY2VfdG9kYXkiLCJkZXNpcmVkX3Njb3BlcyIsImRlc2lyZWRfc2NvcGUiLCJlcnJvciIsInNlY3Rpb25zIiwibG93ZXJjYXNlX3NlY3Rpb25zIiwiaW5kZXhPZiIsImNvbCIsImNvbFN0cmluZyIsIm1vZHVsbyIsImNvbExldHRlciIsImZyb21DaGFyQ29kZSIsImNoYXJDb2RlQXQiLCJzcGxpdF90b19yb3dfY29sIiwiZXhjZWxfaW5kZXgiLCJyZWdleCIsIlJlZ0V4cCIsIm1hdGNoIiwiZXhlYyIsInJhd19yb3ciLCJsZXR0ZXJzIiwibG93ZXJMZXR0ZXJzIiwicCIsImNoYXJhY3RlclZhbHVlIiwidmFsdWUiLCJuZXdfbnVtYmVyIiwidGVtcG9yYXJ5X25ld19udW1iZXIiLCJwYXJzZUludCIsIk5FWFRfU1RFUF9DT09LSUVfTkFNRSIsImhhbmRsZXIiLCJjYWxsYmFjayIsImhhbmRsZXJfcmVzcG9uc2UiLCJzdGFjayIsIlR3aWxpbyIsIlJlc3BvbnNlIiwidHdpbWwiLCJNZXNzYWdpbmdSZXNwb25zZSIsInNldEJvZHkiLCJhcHBlbmRIZWFkZXIiLCJzZXRDb29raWUiXSwic291cmNlUm9vdCI6IiJ9