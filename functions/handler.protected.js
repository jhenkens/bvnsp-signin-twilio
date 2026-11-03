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
const sled_beacon_sheet_config = {
    SHEET_ID: "test",
    SLED_BEACON_SHEET: "Sled_Beacon Checks",
    SLED_BEACON_SHEET_NAME_COLUMN: "A",
    BEACON_SEARCH_COUNT_COLUMN: "J",
    BEACON_FIND_DATES_STARTING_COLUMN: "K"
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
    ...sled_beacon_sheet_config,
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
/* harmony import */ var _sheets_sled_beacon_check_sheet__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../sheets/sled_beacon_check_sheet */ "./src/sheets/sled_beacon_check_sheet.ts");













const NEXT_STEPS = {
    AWAIT_COMMAND: "await-command",
    AWAIT_CHECKIN: "await-checkin",
    CONFIRM_RESET: "confirm-reset",
    AUTH_RESET: "auth-reset",
    AWAIT_SECTION: "await-section",
    AWAIT_PASS: "await-pass",
    AWAIT_MESSAGE: "await-message",
    AWAIT_BROADCAST: "await-broadcast",
    AWAIT_BEACON: "await-beacon"
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
    ],
    BEACON: [
        "beacon",
        "beacon-search",
        "beacon-find"
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
    sled_beacon_check_sheet = null;
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
        } else if (this.bvnsp_next_step?.startsWith(NEXT_STEPS.AWAIT_BEACON) && this.body) {
            const beacon_search_location = await this.parse_beacon_search_location(this.body);
            if (beacon_search_location) {
                return await this.set_beacon_search(beacon_search_location);
            }
            return await this.prompt_beacon_search();
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
            console.log(`Performing prompt_guest_pass for ${patroller_name}`);
            return await this.prompt_guest_pass();
        }
        if (COMMANDS.BEACON.includes(this.body)) {
            console.log(`Performing prompt_beacon for ${patroller_name}`);
            return await this.prompt_beacon_search();
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
Check in / Check out / Status / Beacon / Section Assignment / Guest Pass / On Duty / Message / WhatsApp
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
        const formatted_phone = (0,_utils_util__WEBPACK_IMPORTED_MODULE_8__.format_phone_for_display)(sender_phone);
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
     * @param {string | null} section  The section to assign.
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
     * Record the beacon search for this patroller
     * @param{string }  beacon_search_location  where the beacon was found
     * @returns {Promise<BVNSPResponse>}
     */ async set_beacon_search(beacon_search_location) {
        console.log(`Setting beacon search for ${this.patroller.name} at ${beacon_search_location}`);
        const sheet = await this.get_sled_beacon_check_sheet();
        const prior_searches = await sheet.get_beacon_searches(this.patroller.name);
        if (prior_searches == null) {
            return {
                response: "Problem looking up patroller for beacon searches."
            };
        }
        // Record the new beacon search
        await sheet.set_beacons_searches(prior_searches, beacon_search_location);
        // Re-read the values and return confirmation
        const updated = await sheet.get_beacon_searches(this.patroller.name);
        if (updated == null) {
            return {
                response: `Unable to record beacon search for ${this.patroller.name} today.`
            };
        }
        const status = `Completed ${updated.search_count} search${updated.search_count === 1 ? '' : 'es'} this season.`;
        return {
            response: `Updated ${this.patroller.name} to complete beacon search at ${beacon_search_location} today.\n${status}`
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
    /** get the slec_beacon_check_sheet.
     * @returns (Promise<SledBeaconCheckSheet>)
     */ async get_sled_beacon_check_sheet() {
        if (!this.sled_beacon_check_sheet) {
            const config = this.combined_config;
            const sheets_service = await this.get_sheets_service();
            this.sled_beacon_check_sheet = new _sheets_sled_beacon_check_sheet__WEBPACK_IMPORTED_MODULE_12__.SledBeaconCheckSheet(sheets_service, config);
        }
        return this.sled_beacon_check_sheet;
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
    /**
     * Prompt the user for the location of their completed beacon search
     * @returns {Promise<BVNSPResponse>} A promise that resolves with the response.
     */ async prompt_beacon_search() {
        if (!this.patroller || !this.patroller.checkin) {
            return {
                response: `${this.patroller.name} is not checked in.`
            };
        }
        return {
            response: "On which run did you complete a beacon search today (or 'restart' to cancel)?",
            next_step: NEXT_STEPS.AWAIT_BEACON
        };
    }
    /**
     * Parse location
     * @param {string} body - the body of the request
     * @returns {Promise<string | null>} The search location if the location is valid
     */ async parse_beacon_search_location(body) {
        const sheet = await this.get_sled_beacon_check_sheet();
        return sheet.parse_location(body);
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

/***/ "./src/sheets/sled_beacon_check_sheet.ts"
/*!***********************************************!*\
  !*** ./src/sheets/sled_beacon_check_sheet.ts ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BeaconSearches: () => (/* binding */ BeaconSearches),
/* harmony export */   SledBeaconCheckSheet: () => (/* binding */ SledBeaconCheckSheet)
/* harmony export */ });
/* harmony import */ var _utils_google_sheets_spreadsheet_tab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/google_sheets_spreadsheet_tab */ "./src/utils/google_sheets_spreadsheet_tab.ts");
/* harmony import */ var _utils_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/util */ "./src/utils/util.ts");
/* harmony import */ var _utils_datetime_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/datetime_util */ "./src/utils/datetime_util.ts");



class BeaconSearches {
    row;
    index;
    search_count;
    constructor(row, index, search_count){
        this.row = row;
        this.index = index;
        this.search_count = Number(search_count);
    }
}
/**
 * Class representing a Sled Beacon Check Sheet in Google Sheets
 */ class SledBeaconCheckSheet {
    sled_beacon_check_sheet;
    config;
    /**
     * Creates an instance of LoginSheet.
     * @param {sheets_v4.Sheets | null} sheets_service - The Google Sheets API service.
     * @param {SledBeaconConfig} config - The configuration for this sheet.
     */ constructor(sheets_service, config){
        this.sled_beacon_check_sheet = new _utils_google_sheets_spreadsheet_tab__WEBPACK_IMPORTED_MODULE_0__["default"](sheets_service, config.SHEET_ID, config.SLED_BEACON_SHEET);
        this.config = config;
    }
    get start_index() {
        return (0,_utils_util__WEBPACK_IMPORTED_MODULE_1__.excel_row_to_index)(this.config.BEACON_FIND_DATES_STARTING_COLUMN);
    }
    get sheet_name() {
        return this.config.SLED_BEACON_SHEET;
    }
    get name_column() {
        return this.config.SLED_BEACON_SHEET_NAME_COLUMN;
    }
    get beacon_search_count_column() {
        return this.config.BEACON_SEARCH_COUNT_COLUMN;
    }
    /**
     * Get the current searches for the given patroller
     * @param patroller_name
     */ async get_beacon_searches(patroller_name) {
        const patroller_row = await this.sled_beacon_check_sheet.get_sheet_row_for_patroller(patroller_name, this.name_column);
        if (patroller_row == null) {
            return null;
        }
        const search_count = patroller_row.row[(0,_utils_util__WEBPACK_IMPORTED_MODULE_1__.excel_row_to_index)(this.beacon_search_count_column)];
        return new BeaconSearches(patroller_row.row, patroller_row.index, search_count);
    }
    /**
     * Gets the number of beacon finds by a patroller.
     * @param {string} patroller_name - The name of the patroller.
     * @returns {Promise<number>} The number of times this patroller found a beacons.
     */ async get_patrolled_beacon_find_count(patroller_name) {
        const patroller_row = await this.sled_beacon_check_sheet.get_sheet_row_for_patroller(patroller_name, this.config.SLED_BEACON_SHEET_NAME_COLUMN);
        if (!patroller_row) {
            return -1;
        }
        return patroller_row.row[(0,_utils_util__WEBPACK_IMPORTED_MODULE_1__.excel_row_to_index)(this.config.BEACON_SEARCH_COUNT_COLUMN)];
    }
    /**
     * Record a new beacon search for today at the specified location.
     * @param patroller_row
     * @param search_location
     */ async set_beacons_searches(patroller_row, search_location) {
        const row_num = patroller_row.index;
        const start_index = this.start_index;
        const prior_length = patroller_row.row.length - start_index;
        const current_date_string = (0,_utils_datetime_util__WEBPACK_IMPORTED_MODULE_2__.format_date_for_spreadsheet_value)(new Date());
        let new_vals = patroller_row.row.slice(start_index).map((x)=>x?.toString());
        // Record  the date of the search and the location
        new_vals.push(current_date_string + "," + search_location);
        const update_length = Math.max(prior_length, new_vals.length);
        while(new_vals.length < update_length){
            new_vals.push("");
        }
        const end_index = start_index + update_length - 1;
        const range = `${this.sled_beacon_check_sheet.sheet_name}!${(0,_utils_util__WEBPACK_IMPORTED_MODULE_1__.row_col_to_excel_index)(row_num, start_index)}:${(0,_utils_util__WEBPACK_IMPORTED_MODULE_1__.row_col_to_excel_index)(row_num, end_index)}`;
        console.log(`Updating ${range} with ${new_vals.length} values`);
        await this.sled_beacon_check_sheet.update_values(range, [
            new_vals
        ]);
    }
    /**
     * Parse location
     * @param {string} body - the body of the request
     * @returns {string | null} The search location if the location is valid
     */ parse_location(body) {
        if (body === null) {
            return null;
        }
        return this.cleanSmsValue(body);
    }
    cleanSmsValue(input) {
        if (!input) return '';
        let cleaned = input.trim();
        // 1. Remove formula triggers from the beginning of the string
        // Loops to catch edge cases like "==Click here" or "++1"
        while([
            '=',
            '+',
            '-',
            '@'
        ].includes(cleaned.charAt(0))){
            cleaned = cleaned.substring(1).trim();
        }
        // 2. Strip line breaks, tabs, and invisible control characters (\x00-\x1F, \x7F)
        // This prevents the SMS reply from breaking onto new lines unexpectedly
        cleaned = cleaned.replace(/[\r\n\t\x00-\x1F\x7F]/g, ' ');
        // 3. Collapse multiple spaces into a single space
        cleaned = cleaned.replace(/\s+/g, ' ').trim();
        return cleaned;
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
/* harmony export */   format_phone_for_display: () => (/* binding */ format_phone_for_display),
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
/**
 * Formats a 10-digit phone number string as (XXX)XXX-XXXX for display.
 * @param {string} ten_digits - A 10-digit phone number string (e.g. "1234567890").
 * @returns {string} The formatted phone number (e.g. "(123)456-7890").
 */ function format_phone_for_display(ten_digits) {
    return `(${ten_digits.substring(0, 3)})${ten_digits.substring(3, 6)}-${ten_digits.substring(6, 10)}`;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVEsSUFDekI7UUFDSkUsWUFBWXVXLGlCQUFpQnZXLFNBQVMsSUFBSTtJQUM5QyxFQUFFLE9BQU8vQixHQUFHO1FBQ1JDLFFBQVFDLEdBQUcsQ0FBQztRQUNaLElBQUk7WUFDQUQsUUFBUUMsR0FBRyxDQUFDdVEsS0FBS0MsU0FBUyxDQUFDMVE7UUFDL0IsRUFBRSxPQUFNO1lBQ0pDLFFBQVFDLEdBQUcsQ0FBQ0Y7UUFDaEI7UUFDQXFCLFVBQVU7UUFDVixJQUFJckIsYUFBYXVKLE9BQU87WUFDcEJsSSxXQUFXLE9BQU9yQixFQUFFcUIsT0FBTztZQUMzQnBCLFFBQVFDLEdBQUcsQ0FBQyxTQUFTRixFQUFFdVksS0FBSztZQUM1QnRZLFFBQVFDLEdBQUcsQ0FBQyxTQUFTRixFQUFFdUMsSUFBSTtZQUMzQnRDLFFBQVFDLEdBQUcsQ0FBQyxTQUFTRixFQUFFcUIsT0FBTztRQUNsQztJQUNKO0lBRUEsTUFBTVEsV0FBVyxJQUFJMlcsT0FBT0MsUUFBUTtJQUNwQyxNQUFNQyxRQUFRLElBQUlGLE9BQU9FLEtBQUssQ0FBQ0MsaUJBQWlCO0lBRWhERCxNQUFNclgsT0FBTyxDQUFDQTtJQUVkUSxRQUNJLGlEQUFpRDtLQUNoRCtXLE9BQU8sQ0FBQ0YsTUFBTWpRLFFBQVEsR0FDdkIsNERBQTREO0tBQzNEb1EsWUFBWSxDQUFDLGdCQUFnQixZQUM3QkMsU0FBUyxDQUFDWCx1QkFBdUJwVztJQUV0QyxPQUFPc1csU0FBUyxNQUFNeFc7QUFDMUIsRUFBRSIsInNvdXJjZXMiOlsiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9ub2RlX21vZHVsZXMvQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlcy9pbmRleC5qcyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL2Vudi9oYW5kbGVyX2NvbmZpZy50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL2hhbmRsZXJzL2J2bnNwX2hhbmRsZXIudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9zaGVldHMvZ3Vlc3RfcGFzc19zaGVldC50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3NoZWV0cy9sb2dpbl9zaGVldC50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3NoZWV0cy9zZWFzb25fc2hlZXQudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9zaGVldHMvc2xlZF9iZWFjb25fY2hlY2tfc2hlZXQudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91c2VyLWNyZWRzLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvY2hlY2tpbl92YWx1ZXMudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91dGlscy9kYXRldGltZV91dGlsLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvZmlsZV91dGlscy50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3V0aWxzL2dvb2dsZV9zaGVldHNfc3ByZWFkc2hlZXRfdGFiLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvZ3Vlc3RfcGFzc2VzLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvc2NvcGVfdXRpbC50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3V0aWxzL3NlY3Rpb25fdmFsdWVzLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvdXRpbC50cyIsImV4dGVybmFsIGNvbW1vbmpzIFwiZ29vZ2xlYXBpc1wiIiwiZXh0ZXJuYWwgY29tbW9uanMgXCJzbXMtc2VnbWVudHMtY2FsY3VsYXRvclwiIiwiZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImZzXCIiLCJ3ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9oYW5kbGVycy9oYW5kbGVyLnByb3RlY3RlZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJbnRlbnRpb25hbGx5IGxlZnQgZW1wdHlcbiIsImltcG9ydCB7IENoZWNraW5WYWx1ZSB9IGZyb20gXCIuLi91dGlscy9jaGVja2luX3ZhbHVlc1wiO1xuXG4vKipcbiAqIEVudmlyb25tZW50IGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBoYW5kbGVyLlxuICogPHA+XG4gKiBOb3RlOiBUaGVzZSBhcmUgdGhlIG9ubHkgc2VjcmV0IHZhbHVlcyB3ZSBuZWVkIHRvIHJlYWQuIFJlc3QgY2FuIGJlIGRlcGxveWVkLlxuICogQHR5cGVkZWYge09iamVjdH0gSGFuZGxlckVudmlyb25tZW50XG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0NSSVBUX0lEIC0gVGhlIElEIG9mIHRoZSBHb29nbGUgQXBwcyBTY3JpcHQgcHJvamVjdC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTWU5DX1NJRCAtIFRoZSBTSUQgb2YgdGhlIFR3aWxpbyBTeW5jIHNlcnZpY2UuXG4gKi9cbnR5cGUgSGFuZGxlckVudmlyb25tZW50ID0ge1xuICAgIFNIRUVUX0lEOiBzdHJpbmc7XG4gICAgU0NSSVBUX0lEOiBzdHJpbmc7XG4gICAgU1lOQ19TSUQ6IHN0cmluZztcbn07XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgdXNlciBjcmVkZW50aWFscy5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IFVzZXJDcmVkc0NvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsfSBOU1BfRU1BSUxfRE9NQUlOIC0gVGhlIGVtYWlsIGRvbWFpbiBmb3IgTlNQLlxuICovXG50eXBlIFVzZXJDcmVkc0NvbmZpZyA9IHtcbiAgICBOU1BfRU1BSUxfRE9NQUlOOiBzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsO1xufTtcbmNvbnN0IHVzZXJfY3JlZHNfY29uZmlnOiBVc2VyQ3JlZHNDb25maWcgPSB7XG4gICAgTlNQX0VNQUlMX0RPTUFJTjogXCJmYXJ3ZXN0Lm9yZ1wiLFxufTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciBmaW5kaW5nIGEgcGF0cm9sbGVyLlxuICogQHR5cGVkZWYge09iamVjdH0gRmluZFBhdHJvbGxlckNvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFNIRUVUX0lEIC0gVGhlIElEIG9mIHRoZSBHb29nbGUgU2hlZXRzIHNwcmVhZHNoZWV0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFBIT05FX05VTUJFUl9MT09LVVBfU0hFRVQgLSBUaGUgcmFuZ2UgZm9yIHBob25lIG51bWJlciBsb29rdXAuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gUEhPTkVfTlVNQkVSX05VTUJFUl9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBwaG9uZSBudW1iZXJzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFBIT05FX05VTUJFUl9OQU1FX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIG5hbWVzLlxuICovXG50eXBlIEZpbmRQYXRyb2xsZXJDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICBQSE9ORV9OVU1CRVJfTE9PS1VQX1NIRUVUOiBzdHJpbmc7XG4gICAgUEhPTkVfTlVNQkVSX05VTUJFUl9DT0xVTU46IHN0cmluZztcbiAgICBQSE9ORV9OVU1CRVJfTkFNRV9DT0xVTU46IHN0cmluZztcbn07XG5cbmNvbnN0IGZpbmRfcGF0cm9sbGVyX2NvbmZpZzogRmluZFBhdHJvbGxlckNvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogXCJ0ZXN0XCIsXG4gICAgUEhPTkVfTlVNQkVSX0xPT0tVUF9TSEVFVDogXCJQaG9uZSBOdW1iZXJzIUEyOkIxMDBcIixcbiAgICBQSE9ORV9OVU1CRVJfTkFNRV9DT0xVTU46IFwiQVwiLFxuICAgIFBIT05FX05VTUJFUl9OVU1CRVJfQ09MVU1OOiBcIkJcIixcbn07XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgdGhlIGxvZ2luIHNoZWV0LlxuICogQHR5cGVkZWYge09iamVjdH0gTG9naW5TaGVldENvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFNIRUVUX0lEIC0gVGhlIElEIG9mIHRoZSBHb29nbGUgU2hlZXRzIHNwcmVhZHNoZWV0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IExPR0lOX1NIRUVUX0xPT0tVUCAtIFRoZSByYW5nZSBmb3IgbG9naW4gc2hlZXQgbG9va3VwLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IENIRUNLSU5fQ09VTlRfTE9PS1VQIC0gVGhlIHJhbmdlIGZvciBjaGVjay1pbiBjb3VudCBsb29rdXAuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQVJDSElWRURfQ0VMTCAtIFRoZSBjZWxsIGZvciBhcmNoaXZlZCBkYXRhLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNIRUVUX0RBVEVfQ0VMTCAtIFRoZSBjZWxsIGZvciB0aGUgc2hlZXQgZGF0ZS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDVVJSRU5UX0RBVEVfQ0VMTCAtIFRoZSBjZWxsIGZvciB0aGUgY3VycmVudCBkYXRlLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IE5BTUVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgbmFtZXMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQ0FURUdPUllfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgY2F0ZWdvcmllcy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTRUNUSU9OX0RST1BET1dOX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIHNlY3Rpb24gZHJvcGRvd24uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBjaGVjay1pbiBkcm9wZG93bi5cbiAqL1xudHlwZSBMb2dpblNoZWV0Q29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBzdHJpbmc7XG4gICAgTE9HSU5fU0hFRVRfTE9PS1VQOiBzdHJpbmc7XG4gICAgQ0hFQ0tJTl9DT1VOVF9MT09LVVA6IHN0cmluZztcbiAgICBBUkNISVZFRF9DRUxMOiBzdHJpbmc7XG4gICAgU0hFRVRfREFURV9DRUxMOiBzdHJpbmc7XG4gICAgQ1VSUkVOVF9EQVRFX0NFTEw6IHN0cmluZztcbiAgICBOQU1FX0NPTFVNTjogc3RyaW5nO1xuICAgIENBVEVHT1JZX0NPTFVNTjogc3RyaW5nO1xuICAgIFNFQ1RJT05fRFJPUERPV05fQ09MVU1OOiBzdHJpbmc7XG4gICAgQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU46IHN0cmluZztcbn07XG5cbmNvbnN0IGxvZ2luX3NoZWV0X2NvbmZpZzogTG9naW5TaGVldENvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogXCJ0ZXN0XCIsXG4gICAgTE9HSU5fU0hFRVRfTE9PS1VQOiBcIkxvZ2luIUExOkkxMDBcIixcbiAgICBDSEVDS0lOX0NPVU5UX0xPT0tVUDogXCJUb29scyFHMjpHMlwiLFxuICAgIFNIRUVUX0RBVEVfQ0VMTDogXCJCMVwiLFxuICAgIENVUlJFTlRfREFURV9DRUxMOiBcIkIyXCIsXG4gICAgQVJDSElWRURfQ0VMTDogXCJIMVwiLFxuICAgIE5BTUVfQ09MVU1OOiBcIkFcIixcbiAgICBDQVRFR09SWV9DT0xVTU46IFwiQlwiLFxuICAgIFNFQ1RJT05fRFJPUERPV05fQ09MVU1OOiBcIkhcIixcbiAgICBDSEVDS0lOX0RST1BET1dOX0NPTFVNTjogXCJJXCIsXG59O1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIHRoZSBzZWFzb24gc2hlZXQuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBTZWFzb25TaGVldENvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFNIRUVUX0lEIC0gVGhlIElEIG9mIHRoZSBHb29nbGUgU2hlZXRzIHNwcmVhZHNoZWV0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNFQVNPTl9TSEVFVCAtIFRoZSBuYW1lIG9mIHRoZSBzZWFzb24gc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0VBU09OX1NIRUVUX0RBWVNfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3Igc2Vhc29uIHNoZWV0IGRheXMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0VBU09OX1NIRUVUX05BTUVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3Igc2Vhc29uIHNoZWV0IG5hbWVzLlxuICovXG50eXBlIFNlYXNvblNoZWV0Q29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBzdHJpbmc7XG4gICAgU0VBU09OX1NIRUVUOiBzdHJpbmc7XG4gICAgU0VBU09OX1NIRUVUX0RBWVNfQ09MVU1OOiBzdHJpbmc7XG4gICAgU0VBU09OX1NIRUVUX05BTUVfQ09MVU1OOiBzdHJpbmc7XG59O1xuY29uc3Qgc2Vhc29uX3NoZWV0X2NvbmZpZzogU2Vhc29uU2hlZXRDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IFwidGVzdFwiLFxuICAgIFNFQVNPTl9TSEVFVDogXCJTZWFzb25cIixcbiAgICBTRUFTT05fU0hFRVRfTkFNRV9DT0xVTU46IFwiQlwiLFxuICAgIFNFQVNPTl9TSEVFVF9EQVlTX0NPTFVNTjogXCJBXCIsXG59O1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIHNlY3Rpb25zLlxuICogQHR5cGVkZWYge09iamVjdH0gU2VjdGlvbkNvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFNFQ1RJT05fVkFMVUVTIC0gVGhlIHNlY3Rpb24gdmFsdWVzLlxuICovXG50eXBlIFNlY3Rpb25Db25maWcgPSB7XG4gICAgU0VDVElPTl9WQUxVRVM6IHN0cmluZztcbn07XG5jb25zdCBzZWN0aW9uX2NvbmZpZzogU2VjdGlvbkNvbmZpZyA9IHtcbiAgICBTRUNUSU9OX1ZBTFVFUzogIFwiMSwyLDMsNCxSb3ZpbmcsRkFSLFRyYWluaW5nXCIsXG59O1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIGd1ZXN0IHBhc3Nlcy5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IEd1ZXN0UGFzc2VzQ29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gR1VFU1RfUEFTU19TSEVFVCAtIFRoZSBuYW1lIG9mIHRoZSBndWVzdCBwYXNzIHNoZWV0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IEdVRVNUX1BBU1NfRUxJR0lCTEVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgZ3Vlc3QgcGFzcyAgZWxpZ2liaWxpdHkgY2hlY2tib3ggKFRSVUUvRkFMU0UpLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IEdVRVNUX1BBU1NfRUxJR0lCTEVfUkVBU09OX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIHRoZSBpbmVsaWdpYmlsaXR5IHJlYXNvbiBzdHJpbmcuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gR1VFU1RfUEFTU19TSEVFVF9BVkFJTEFCTEVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgYXZhaWxhYmxlIHBhc3MgY291bnQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gR1VFU1RfUEFTU19TSEVFVF9VU0VEX1RPREFZX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIHBhc3NlcyB1c2VkIHRvZGF5LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IEdVRVNUX1BBU1NfU0hFRVRfVVNFRF9TRUFTT05fQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgcGFzc2VzIHVzZWQgdGhpcyBzZWFzb24uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gR1VFU1RfUEFTU19TSEVFVF9EQVRFU19TVEFSVElOR19DT0xVTU4gLSBUaGUgY29sdW1uIHdoZXJlIGRhdGUtb2YtdXNlIGVudHJpZXMgYmVnaW4uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gR1VFU1RfUEFTU19TSEVFVF9OQU1FX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIHBhdHJvbGxlciBuYW1lcy5cbiAqL1xudHlwZSBHdWVzdFBhc3Nlc0NvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogc3RyaW5nO1xuICAgIEdVRVNUX1BBU1NfU0hFRVQ6IHN0cmluZztcbiAgICBHVUVTVF9QQVNTX0VMSUdJQkxFX0NPTFVNTjogc3RyaW5nO1xuICAgIEdVRVNUX1BBU1NfRUxJR0lCTEVfUkVBU09OX0NPTFVNTjogc3RyaW5nO1xuICAgIEdVRVNUX1BBU1NfU0hFRVRfQVZBSUxBQkxFX0NPTFVNTjogc3RyaW5nO1xuICAgIEdVRVNUX1BBU1NfU0hFRVRfVVNFRF9UT0RBWV9DT0xVTU46IHN0cmluZztcbiAgICBHVUVTVF9QQVNTX1NIRUVUX1VTRURfU0VBU09OX0NPTFVNTjogc3RyaW5nO1xuICAgIEdVRVNUX1BBU1NfU0hFRVRfREFURVNfU1RBUlRJTkdfQ09MVU1OOiBzdHJpbmc7XG4gICAgR1VFU1RfUEFTU19TSEVFVF9OQU1FX0NPTFVNTjogc3RyaW5nO1xufTtcbmNvbnN0IGd1ZXN0X3Bhc3Nlc19jb25maWc6IEd1ZXN0UGFzc2VzQ29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBcInRlc3RcIixcbiAgICBHVUVTVF9QQVNTX1NIRUVUOiBcIkd1ZXN0UGFzc2VzXCIsXG4gICAgR1VFU1RfUEFTU19FTElHSUJMRV9DT0xVTU46IFwiQlwiLFxuICAgIEdVRVNUX1BBU1NfRUxJR0lCTEVfUkVBU09OX0NPTFVNTjogXCJDXCIsXG4gICAgR1VFU1RfUEFTU19TSEVFVF9OQU1FX0NPTFVNTjogXCJBXCIsXG4gICAgR1VFU1RfUEFTU19TSEVFVF9BVkFJTEFCTEVfQ09MVU1OOiBcIkRcIixcbiAgICBHVUVTVF9QQVNTX1NIRUVUX1VTRURfVE9EQVlfQ09MVU1OOiBcIkVcIixcbiAgICBHVUVTVF9QQVNTX1NIRUVUX1VTRURfU0VBU09OX0NPTFVNTjogXCJGXCIsXG4gICAgR1VFU1RfUEFTU19TSEVFVF9EQVRFU19TVEFSVElOR19DT0xVTU46IFwiR1wiLFxufTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciB0aGUgU2xlZCBCZWFjb24gQ2hlY2tzIHNoZWV0XG4gKlxuICogQHR5cGVkZWYge09iamVjdH0gU2xlZEJlYWNvbkNvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFNIRUVUX0lEIC0gVGhlIElEIG9mIHRoZSBHb29nbGUgU2hlZXRzIHNwcmVhZHNoZWV0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNMRURfQkVBQ09OX1NIRUVUIC0gVGhlIG5hbWUgb2YgdGhlIFNsZWQgQmVjb24gQ2hlY2sgc2hlZXRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTTEVEX0JFQUNPTl9TSEVFVF9OQU1FX0NPTFVNTiAtICBUaGUgY29sdW1uIGZvciBwYXRyb2xsZXIgbmFtZXMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQkVBQ09OX1NFQVJDSF9DT1VOVF9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciB0aGUgc2VhcmNoIGNvdW50IGZvciB0aGlzIHNlYXNvbi5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBCRUFDT05fRklORF9EQVRFU19TVEFSVElOR19DT0xVTU4gLSBUaGVyZSBjb2x1bW4gd2hlcmUgaHRlIGRhdGVzIGZvciBiZWFjb24gZmluZHMgYmVnaW5zLlxuICovXG50eXBlIFNsZWRCZWFjb25Db25maWcgPSB7XG4gICAgIFNIRUVUX0lEOiBzdHJpbmc7XG4gICAgIFNMRURfQkVBQ09OX1NIRUVUOiBzdHJpbmc7XG4gICAgIFNMRURfQkVBQ09OX1NIRUVUX05BTUVfQ09MVU1OOiBzdHJpbmc7XG4gICAgIEJFQUNPTl9TRUFSQ0hfQ09VTlRfQ09MVU1OOiBzdHJpbmc7XG4gICAgIEJFQUNPTl9GSU5EX0RBVEVTX1NUQVJUSU5HX0NPTFVNTjogc3RyaW5nO1xufTtcbiBjb25zdCBzbGVkX2JlYWNvbl9zaGVldF9jb25maWc6IFNsZWRCZWFjb25Db25maWcgPSB7XG4gICAgIFNIRUVUX0lEOiBcInRlc3RcIixcbiAgICAgU0xFRF9CRUFDT05fU0hFRVQ6IFwiU2xlZF9CZWFjb24gQ2hlY2tzXCIsXG4gICAgIFNMRURfQkVBQ09OX1NIRUVUX05BTUVfQ09MVU1OOiBcIkFcIixcbiAgICAgQkVBQ09OX1NFQVJDSF9DT1VOVF9DT0xVTU46IFwiSlwiLFxuICAgICBCRUFDT05fRklORF9EQVRFU19TVEFSVElOR19DT0xVTU46IFwiS1wiXG59XG5cbiAvKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIHRoZSBoYW5kbGVyLlxuICogQHR5cGVkZWYge09iamVjdH0gSGFuZGxlckNvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFNDUklQVF9JRCAtIFRoZSBJRCBvZiB0aGUgR29vZ2xlIEFwcHMgU2NyaXB0IHByb2plY3QuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU1lOQ19TSUQgLSBUaGUgU0lEIG9mIHRoZSBUd2lsaW8gU3luYyBzZXJ2aWNlLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFJFU0VUX0ZVTkNUSU9OX05BTUUgLSBUaGUgbmFtZSBvZiB0aGUgcmVzZXQgZnVuY3Rpb24uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQVJDSElWRV9GVU5DVElPTl9OQU1FIC0gVGhlIG5hbWUgb2YgdGhlIGFyY2hpdmUgZnVuY3Rpb24uXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFVTRV9TRVJWSUNFX0FDQ09VTlQgLSBXaGV0aGVyIHRvIHVzZSBhIHNlcnZpY2UgYWNjb3VudC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBBQ1RJT05fTE9HX1NIRUVUIC0gVGhlIG5hbWUgb2YgdGhlIGFjdGlvbiBsb2cgc2hlZXQuXG4gKiBAcHJvcGVydHkge0NoZWNraW5WYWx1ZVtdfSBDSEVDS0lOX1ZBTFVFUyAtIFRoZSBjaGVjay1pbiB2YWx1ZXMuXG4gKi9cbnR5cGUgSGFuZGxlckNvbmZpZyA9IHtcbiAgICBTQ1JJUFRfSUQ6IHN0cmluZztcbiAgICBTSEVFVF9JRDogc3RyaW5nO1xuICAgIFNZTkNfU0lEOiBzdHJpbmc7XG4gICAgUkVTRVRfRlVOQ1RJT05fTkFNRTogc3RyaW5nO1xuICAgIEFSQ0hJVkVfRlVOQ1RJT05fTkFNRTogc3RyaW5nO1xuICAgIFVTRV9TRVJWSUNFX0FDQ09VTlQ6IGJvb2xlYW47XG4gICAgQUNUSU9OX0xPR19TSEVFVDogc3RyaW5nO1xuICAgIENIRUNLSU5fVkFMVUVTOiBDaGVja2luVmFsdWVbXTtcbn07XG5jb25zdCBoYW5kbGVyX2NvbmZpZzogSGFuZGxlckNvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogXCJ0ZXN0XCIsXG4gICAgU0NSSVBUX0lEOiBcInRlc3RcIixcbiAgICBTWU5DX1NJRDogXCJ0ZXN0XCIsXG5cbiAgICBBUkNISVZFX0ZVTkNUSU9OX05BTUU6IFwiQXJjaGl2ZVwiLFxuICAgIFJFU0VUX0ZVTkNUSU9OX05BTUU6IFwiUmVzZXRcIixcbiAgICBVU0VfU0VSVklDRV9BQ0NPVU5UOiB0cnVlLFxuICAgIEFDVElPTl9MT0dfU0hFRVQ6IFwiQm90X1VzYWdlXCIsXG4gICAgQ0hFQ0tJTl9WQUxVRVM6IFtcbiAgICAgICAgbmV3IENoZWNraW5WYWx1ZShcImRheVwiLCBcIkFsbCBEYXlcIiwgXCJhbGwgZGF5L0RBWVwiLCBbXCJjaGVja2luLWRheVwiXSksXG4gICAgICAgIG5ldyBDaGVja2luVmFsdWUoXCJhbVwiLCBcIkhhbGYgQU1cIiwgXCJtb3JuaW5nL0FNXCIsIFtcImNoZWNraW4tYW1cIl0pLFxuICAgICAgICBuZXcgQ2hlY2tpblZhbHVlKFwicG1cIiwgXCJIYWxmIFBNXCIsIFwiYWZ0ZXJub29uL1BNXCIsIFtcImNoZWNraW4tcG1cIl0pLFxuICAgICAgICBuZXcgQ2hlY2tpblZhbHVlKFwib3V0XCIsIFwiQ2hlY2tlZCBPdXRcIiwgXCJjaGVjayBvdXQvT1VUXCIsIFtcImNoZWNrb3V0XCIsIFwiY2hlY2stb3V0XCJdKSxcbiAgICBdLFxufTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciBwYXRyb2xsZXIgcm93cy5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IFBhdHJvbGxlclJvd0NvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IE5BTUVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgbmFtZXMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQ0FURUdPUllfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgY2F0ZWdvcmllcy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTRUNUSU9OX0RST1BET1dOX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIHNlY3Rpb24gZHJvcGRvd24uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBjaGVjay1pbiBkcm9wZG93bi5cbiAqL1xudHlwZSBQYXRyb2xsZXJSb3dDb25maWcgPSB7XG4gICAgTkFNRV9DT0xVTU46IHN0cmluZztcbiAgICBDQVRFR09SWV9DT0xVTU46IHN0cmluZztcbiAgICBTRUNUSU9OX0RST1BET1dOX0NPTFVNTjogc3RyaW5nO1xuICAgIENIRUNLSU5fRFJPUERPV05fQ09MVU1OOiBzdHJpbmc7XG59O1xuXG4vKipcbiAqIENvbWJpbmVkIGNvbmZpZ3VyYXRpb24gdHlwZS5cbiAqIEB0eXBlZGVmIHtIYW5kbGVyRW52aXJvbm1lbnQgJiBVc2VyQ3JlZHNDb25maWcgJiBGaW5kUGF0cm9sbGVyQ29uZmlnICYgTG9naW5TaGVldENvbmZpZyAmIFNlYXNvblNoZWV0Q29uZmlnICYgU2VjdGlvbkNvbmZpZyAmIEd1ZXN0UGFzc2VzQ29uZmlnICYgSGFuZGxlckNvbmZpZyAmIFBhdHJvbGxlclJvd0NvbmZpZ30gQ29tYmluZWRDb25maWdcbiAqL1xudHlwZSBDb21iaW5lZENvbmZpZyA9IEhhbmRsZXJFbnZpcm9ubWVudCAmXG4gICAgVXNlckNyZWRzQ29uZmlnICZcbiAgICBGaW5kUGF0cm9sbGVyQ29uZmlnICZcbiAgICBMb2dpblNoZWV0Q29uZmlnICZcbiAgICBTZWFzb25TaGVldENvbmZpZyAmXG4gICAgU2VjdGlvbkNvbmZpZyAmXG4gICAgR3Vlc3RQYXNzZXNDb25maWcgJlxuICAgIFNsZWRCZWFjb25Db25maWcgJlxuICAgIEhhbmRsZXJDb25maWcgJlxuICAgIFBhdHJvbGxlclJvd0NvbmZpZztcblxuY29uc3QgQ09ORklHOiBDb21iaW5lZENvbmZpZyA9IHtcbiAgICAuLi5oYW5kbGVyX2NvbmZpZyxcbiAgICAuLi5maW5kX3BhdHJvbGxlcl9jb25maWcsXG4gICAgLi4ubG9naW5fc2hlZXRfY29uZmlnLFxuICAgIC4uLmd1ZXN0X3Bhc3Nlc19jb25maWcsXG4gICAgLi4uc2xlZF9iZWFjb25fc2hlZXRfY29uZmlnLFxuICAgIC4uLnNlYXNvbl9zaGVldF9jb25maWcsXG4gICAgLi4udXNlcl9jcmVkc19jb25maWcsXG4gICAgLi4uc2VjdGlvbl9jb25maWcsXG59O1xuXG5leHBvcnQge1xuICAgIENPTkZJRyxcbiAgICBDb21iaW5lZENvbmZpZyxcbiAgICBTZWN0aW9uQ29uZmlnLFxuICAgIEd1ZXN0UGFzc2VzQ29uZmlnLFxuICAgIFNsZWRCZWFjb25Db25maWcsXG4gICAgRmluZFBhdHJvbGxlckNvbmZpZyxcbiAgICBIYW5kbGVyQ29uZmlnLFxuICAgIEhhbmRsZXJFbnZpcm9ubWVudCxcbiAgICBVc2VyQ3JlZHNDb25maWcsXG4gICAgTG9naW5TaGVldENvbmZpZyxcbiAgICBTZWFzb25TaGVldENvbmZpZyxcbiAgICBQYXRyb2xsZXJSb3dDb25maWcsXG59OyIsImltcG9ydCBcIkB0d2lsaW8tbGFicy9zZXJ2ZXJsZXNzLXJ1bnRpbWUtdHlwZXNcIjtcbmltcG9ydCB7XG4gICAgQ29udGV4dCxcbiAgICBTZXJ2ZXJsZXNzRXZlbnRPYmplY3QsXG4gICAgU2VydmljZUNvbnRleHQsXG4gICAgVHdpbGlvQ2xpZW50LFxufSBmcm9tIFwiQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlcy90eXBlc1wiO1xuaW1wb3J0IHtnb29nbGUsIHNjcmlwdF92MSwgc2hlZXRzX3Y0fSBmcm9tIFwiZ29vZ2xlYXBpc1wiO1xuaW1wb3J0IHtHb29nbGVBdXRofSBmcm9tIFwiZ29vZ2xlYXBpcy1jb21tb25cIjtcbmltcG9ydCB7XG4gICAgQ29tYmluZWRDb25maWcsXG4gICAgQ09ORklHLFxuICAgIEZpbmRQYXRyb2xsZXJDb25maWcsXG4gICAgR3Vlc3RQYXNzZXNDb25maWcsXG4gICAgSGFuZGxlckNvbmZpZyxcbiAgICBIYW5kbGVyRW52aXJvbm1lbnQsXG4gICAgTG9naW5TaGVldENvbmZpZyxcbiAgICBTZWFzb25TaGVldENvbmZpZywgU2xlZEJlYWNvbkNvbmZpZyxcbn0gZnJvbSBcIi4uL2Vudi9oYW5kbGVyX2NvbmZpZ1wiO1xuaW1wb3J0IExvZ2luU2hlZXQsIHtQYXRyb2xsZXJSb3d9IGZyb20gXCIuLi9zaGVldHMvbG9naW5fc2hlZXRcIjtcbmltcG9ydCBTZWFzb25TaGVldCBmcm9tIFwiLi4vc2hlZXRzL3NlYXNvbl9zaGVldFwiO1xuaW1wb3J0IHtVc2VyQ3JlZHN9IGZyb20gXCIuLi91c2VyLWNyZWRzXCI7XG5pbXBvcnQge0NoZWNraW5WYWx1ZXN9IGZyb20gXCIuLi91dGlscy9jaGVja2luX3ZhbHVlc1wiO1xuaW1wb3J0IHtnZXRfc2VydmljZV9jcmVkZW50aWFsc19wYXRofSBmcm9tIFwiLi4vdXRpbHMvZmlsZV91dGlsc1wiO1xuaW1wb3J0IHtleGNlbF9yb3dfdG9faW5kZXgsIGZvcm1hdF9waG9uZV9mb3JfZGlzcGxheSwgc2FuaXRpemVfcGhvbmVfbnVtYmVyfSBmcm9tIFwiLi4vdXRpbHMvdXRpbFwiO1xuaW1wb3J0IHtidWlsZF9wYXNzZXNfc3RyaW5nLH0gZnJvbSBcIi4uL3V0aWxzL2d1ZXN0X3Bhc3Nlc1wiO1xuaW1wb3J0IHtHdWVzdFBhc3NTaGVldH0gZnJvbSBcIi4uL3NoZWV0cy9ndWVzdF9wYXNzX3NoZWV0XCI7XG5pbXBvcnQge1NlY3Rpb25WYWx1ZXN9IGZyb20gJy4uL3V0aWxzL3NlY3Rpb25fdmFsdWVzJztcbmltcG9ydCB7U2xlZEJlYWNvbkNoZWNrU2hlZXR9IGZyb20gXCIuLi9zaGVldHMvc2xlZF9iZWFjb25fY2hlY2tfc2hlZXRcIjtcblxuZXhwb3J0IHR5cGUgQlZOU1BSZXNwb25zZSA9IHtcbiAgICByZXNwb25zZT86IHN0cmluZztcbiAgICBuZXh0X3N0ZXA/OiBzdHJpbmc7XG59O1xuZXhwb3J0IHR5cGUgQlZOU1BFdmVudCA9IFNlcnZlcmxlc3NFdmVudE9iamVjdDxcbiAgICB7XG4gICAgICAgIEZyb206IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAgICAgVG86IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAgICAgbnVtYmVyOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgICAgIHRlc3RfbnVtYmVyOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgICAgIEJvZHk6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICB9LFxuICAgIHt9LFxuICAgIHtcbiAgICAgICAgYnZuc3BfbmV4dF9zdGVwOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgfVxuPjtcblxuZXhwb3J0IGNvbnN0IE5FWFRfU1RFUFMgPSB7XG4gICAgQVdBSVRfQ09NTUFORDogXCJhd2FpdC1jb21tYW5kXCIsXG4gICAgQVdBSVRfQ0hFQ0tJTjogXCJhd2FpdC1jaGVja2luXCIsXG4gICAgQ09ORklSTV9SRVNFVDogXCJjb25maXJtLXJlc2V0XCIsXG4gICAgQVVUSF9SRVNFVDogXCJhdXRoLXJlc2V0XCIsXG4gICAgQVdBSVRfU0VDVElPTjogXCJhd2FpdC1zZWN0aW9uXCIsXG4gICAgQVdBSVRfUEFTUzogXCJhd2FpdC1wYXNzXCIsXG4gICAgQVdBSVRfTUVTU0FHRTogXCJhd2FpdC1tZXNzYWdlXCIsXG4gICAgQVdBSVRfQlJPQURDQVNUOiBcImF3YWl0LWJyb2FkY2FzdFwiLFxuICAgIEFXQUlUX0JFQUNPTjpcImF3YWl0LWJlYWNvblwiLFxufTtcblxuY29uc3QgQ09NTUFORFMgPSB7XG4gICAgT05fRFVUWTogW1wib25kdXR5XCIsIFwib24tZHV0eVwiXSxcbiAgICBTVEFUVVM6IFtcInN0YXR1c1wiXSxcbiAgICBDSEVDS0lOOiBbXCJjaGVja2luXCIsIFwiY2hlY2staW5cIl0sXG4gICAgU0VDVElPTl9BU1NJR05NRU5UOiBbXCJzZWN0aW9uXCIsIFwic2VjdGlvbi1hc3NpZ25tZW50XCIsIFwic2VjdGlvbmFzc2lnbm1lbnRcIiwgXCJhc3NpZ25tZW50XCJdLFxuICAgIEdVRVNUX1BBU1M6IFtcImd1ZXN0LXBhc3NcIiwgXCJndWVzdHBhc3NcIiwgXCJndWVzdFwiXSxcbiAgICBXSEFUU0FQUDogW1wid2hhdHNhcHBcIl0sXG4gICAgTUVTU0FHRTogW1wibWVzc2FnZVwiLCBcIm1zZ1wiXSxcbiAgICBCUk9BRENBU1Q6IFtcImJyb2FkY2FzdFwiXSxcbiAgICBCRUFDT046IFtcImJlYWNvblwiLCBcImJlYWNvbi1zZWFyY2hcIiwgXCJiZWFjb24tZmluZFwiXSxcbn07XG5cbmV4cG9ydCBjb25zdCBTTVNfTUFYX0xFTkdUSCA9IDE2MDtcbmV4cG9ydCBjb25zdCBNRVNTQUdFX1BSRUZJWF9URU1QTEFURSA9IFwiTWVzc2FnZSBmcm9tIFwiO1xuZXhwb3J0IGNvbnN0IE1FU1NBR0VfUFJFRklYX1NVRkZJWCA9IFwiOiBcIjtcblxuLyoqXG4gKiBSZXN1bHQgb2YgdmFsaWRhdGluZyBhbiBTTVMgbWVzc2FnZSBmb3IgR1NNLTcgY29tcGF0aWJpbGl0eSBhbmQgc2VnbWVudCBjb3VudC5cbiAqL1xuZXhwb3J0IHR5cGUgU21zVmFsaWRhdGlvblJlc3VsdCA9IHtcbiAgICAvKiogV2hldGhlciB0aGUgbWVzc2FnZSBpcyB2YWxpZCAoR1NNLTcgb25seSBhbmQgZml0cyBpbiBhIHNpbmdsZSBzZWdtZW50KS4gKi9cbiAgICB2YWxpZDogYm9vbGVhbjtcbiAgICAvKiogSWYgaW52YWxpZCwgdGhlIHJlYXNvbjogJ25vbl9nc203JyBvciAndG9vX21hbnlfc2VnbWVudHMnLiAqL1xuICAgIHJlYXNvbj86IFwibm9uX2dzbTdcIiB8IFwidG9vX21hbnlfc2VnbWVudHNcIjtcbiAgICAvKiogVGhlIG5vbi1HU00tNyBjaGFyYWN0ZXJzIGZvdW5kLCBpZiBhbnkuICovXG4gICAgbm9uX2dzbV9jaGFyYWN0ZXJzPzogc3RyaW5nW107XG4gICAgLyoqIFRoZSBudW1iZXIgb2YgU01TIHNlZ21lbnRzIHRoZSBtZXNzYWdlIHdvdWxkIHJlcXVpcmUuICovXG4gICAgc2VnbWVudHNfY291bnQ/OiBudW1iZXI7XG59O1xuXG4vKipcbiAqIFZhbGlkYXRlcyB0aGF0IGEgY29tcGxldGUgU01TIG1lc3NhZ2UgKHByZWZpeCArIGJvZHkpIHVzZXMgb25seSBHU00tNyBjaGFyYWN0ZXJzXG4gKiBhbmQgZml0cyB3aXRoaW4gYSBzaW5nbGUgU01TIHNlZ21lbnQuXG4gKlxuICogVXNlcyB0aGUgc21zLXNlZ21lbnRzLWNhbGN1bGF0b3IgbGlicmFyeSAobWFpbnRhaW5lZCBieSBUd2lsaW9EZXZFZCkgd2hpY2hcbiAqIHByb3ZpZGVzIGF1dGhvcml0YXRpdmUgR1NNLTcgY2hhcmFjdGVyIGRldGVjdGlvbi5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZnVsbF9tZXNzYWdlIC0gVGhlIGNvbXBsZXRlIG1lc3NhZ2UgdG8gdmFsaWRhdGUgKHByZWZpeCArIHVzZXIgdGV4dCkuXG4gKiBAcmV0dXJucyB7U21zVmFsaWRhdGlvblJlc3VsdH0gVGhlIHZhbGlkYXRpb24gcmVzdWx0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVfc21zX21lc3NhZ2UoZnVsbF9tZXNzYWdlOiBzdHJpbmcpOiBTbXNWYWxpZGF0aW9uUmVzdWx0IHtcbiAgICBjb25zdCB7IFNlZ21lbnRlZE1lc3NhZ2UgfSA9IHJlcXVpcmUoXCJzbXMtc2VnbWVudHMtY2FsY3VsYXRvclwiKTtcbiAgICBjb25zdCBzZWdtZW50ZWQgPSBuZXcgU2VnbWVudGVkTWVzc2FnZShmdWxsX21lc3NhZ2UpO1xuICAgIGNvbnN0IG5vbl9nc20gPSBzZWdtZW50ZWQuZ2V0Tm9uR3NtQ2hhcmFjdGVycygpIGFzIHN0cmluZ1tdO1xuXG4gICAgaWYgKG5vbl9nc20ubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsaWQ6IGZhbHNlLFxuICAgICAgICAgICAgcmVhc29uOiBcIm5vbl9nc203XCIsXG4gICAgICAgICAgICBub25fZ3NtX2NoYXJhY3RlcnM6IFsuLi5uZXcgU2V0KG5vbl9nc20pXSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoc2VnbWVudGVkLnNlZ21lbnRzQ291bnQgPiAxKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWxpZDogZmFsc2UsXG4gICAgICAgICAgICByZWFzb246IFwidG9vX21hbnlfc2VnbWVudHNcIixcbiAgICAgICAgICAgIHNlZ21lbnRzX2NvdW50OiBzZWdtZW50ZWQuc2VnbWVudHNDb3VudCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4geyB2YWxpZDogdHJ1ZSB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCVk5TUEhhbmRsZXIge1xuICAgIFNDT1BFUzogc3RyaW5nW10gPSBbXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3NwcmVhZHNoZWV0c1wiXTtcblxuICAgIHNtc19yZXF1ZXN0OiBib29sZWFuO1xuICAgIHJlc3VsdF9tZXNzYWdlczogc3RyaW5nW10gPSBbXTtcbiAgICBmcm9tOiBzdHJpbmc7XG4gICAgdG86IHN0cmluZztcbiAgICBib2R5OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgYm9keV9yYXc6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBwYXRyb2xsZXI6IFBhdHJvbGxlclJvdyB8IG51bGw7XG4gICAgYnZuc3BfbmV4dF9zdGVwOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgY2hlY2tpbl9tb2RlOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgICBmYXN0X2NoZWNraW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBhc3NpZ25lZF9zZWN0aW9uOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAgIHR3aWxpb19jbGllbnQ6IFR3aWxpb0NsaWVudCB8IG51bGwgPSBudWxsO1xuICAgIHN5bmNfc2lkOiBzdHJpbmc7XG4gICAgcmVzZXRfc2NyaXB0X2lkOiBzdHJpbmc7XG5cbiAgICAvLyBDYWNoZSBjbGllbnRzXG4gICAgc3luY19jbGllbnQ6IFNlcnZpY2VDb250ZXh0IHwgbnVsbCA9IG51bGw7XG4gICAgdXNlcl9jcmVkczogVXNlckNyZWRzIHwgbnVsbCA9IG51bGw7XG4gICAgc2VydmljZV9jcmVkczogR29vZ2xlQXV0aCB8IG51bGwgPSBudWxsO1xuICAgIHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzIHwgbnVsbCA9IG51bGw7XG4gICAgdXNlcl9zY3JpcHRzX3NlcnZpY2U6IHNjcmlwdF92MS5TY3JpcHQgfCBudWxsID0gbnVsbDtcblxuICAgIGxvZ2luX3NoZWV0OiBMb2dpblNoZWV0IHwgbnVsbCA9IG51bGw7XG4gICAgc2Vhc29uX3NoZWV0OiBTZWFzb25TaGVldCB8IG51bGwgPSBudWxsO1xuICAgIGd1ZXN0X3Bhc3Nfc2hlZXQ6IEd1ZXN0UGFzc1NoZWV0IHwgbnVsbCA9IG51bGw7XG4gICAgc2xlZF9iZWFjb25fY2hlY2tfc2hlZXQ6IFNsZWRCZWFjb25DaGVja1NoZWV0IHwgbnVsbCA9IG51bGw7XG5cbiAgICBjaGVja2luX3ZhbHVlczogQ2hlY2tpblZhbHVlcztcbiAgICBjdXJyZW50X3NoZWV0X2RhdGU6IERhdGU7XG5cbiAgICBjb21iaW5lZF9jb25maWc6IENvbWJpbmVkQ29uZmlnO1xuICAgIGNvbmZpZzogSGFuZGxlckNvbmZpZztcblxuICAgIHNlY3Rpb25fdmFsdWVzOiBTZWN0aW9uVmFsdWVzO1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhIG5ldyBCVk5TUEhhbmRsZXIuXG4gICAgICogQHBhcmFtIHtDb250ZXh0PEhhbmRsZXJFbnZpcm9ubWVudD59IGNvbnRleHQgLSBUaGUgc2VydmVybGVzcyBmdW5jdGlvbiBjb250ZXh0LlxuICAgICAqIEBwYXJhbSB7U2VydmVybGVzc0V2ZW50T2JqZWN0PEJWTlNQRXZlbnQ+fSBldmVudCAtIFRoZSBldmVudCBvYmplY3QuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGNvbnRleHQ6IENvbnRleHQ8SGFuZGxlckVudmlyb25tZW50PixcbiAgICAgICAgZXZlbnQ6IFNlcnZlcmxlc3NFdmVudE9iamVjdDxCVk5TUEV2ZW50PlxuICAgICkge1xuICAgICAgICAvLyBEZXRlcm1pbmUgbWVzc2FnZSBkZXRhaWxzIGZyb20gdGhlIGluY29taW5nIGV2ZW50LCB3aXRoIGZhbGxiYWNrIHZhbHVlc1xuICAgICAgICB0aGlzLnNtc19yZXF1ZXN0ID0gKGV2ZW50LkZyb20gfHwgZXZlbnQubnVtYmVyKSAhPT0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmZyb20gPSBldmVudC5Gcm9tIHx8IGV2ZW50Lm51bWJlciB8fCBldmVudC50ZXN0X251bWJlciE7XG4gICAgICAgIHRoaXMudG8gPSBzYW5pdGl6ZV9waG9uZV9udW1iZXIoZXZlbnQuVG8hKTtcbiAgICAgICAgdGhpcy5ib2R5ID0gZXZlbnQuQm9keT8udG9Mb3dlckNhc2UoKT8udHJpbSgpLnJlcGxhY2UoL1xccysvLCBcIi1cIik7XG4gICAgICAgIHRoaXMuYm9keV9yYXcgPSBldmVudC5Cb2R5XG4gICAgICAgIHRoaXMuYnZuc3BfbmV4dF9zdGVwID1cbiAgICAgICAgICAgIGV2ZW50LnJlcXVlc3QuY29va2llcy5idm5zcF9uZXh0X3N0ZXA7XG4gICAgICAgIHRoaXMuY29tYmluZWRfY29uZmlnID0geyAuLi5DT05GSUcsIC4uLmNvbnRleHQgfTtcbiAgICAgICAgdGhpcy5jb25maWcgPSB0aGlzLmNvbWJpbmVkX2NvbmZpZztcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy50d2lsaW9fY2xpZW50ID0gY29udGV4dC5nZXRUd2lsaW9DbGllbnQoKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBpbml0aWFsaXppbmcgdHdpbGlvX2NsaWVudFwiLCBlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN5bmNfc2lkID0gY29udGV4dC5TWU5DX1NJRDtcbiAgICAgICAgdGhpcy5yZXNldF9zY3JpcHRfaWQgPSBjb250ZXh0LlNDUklQVF9JRDtcbiAgICAgICAgdGhpcy5wYXRyb2xsZXIgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuY2hlY2tpbl92YWx1ZXMgPSBuZXcgQ2hlY2tpblZhbHVlcyhDT05GSUcuQ0hFQ0tJTl9WQUxVRVMpO1xuICAgICAgICB0aGlzLmN1cnJlbnRfc2hlZXRfZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHRoaXMuc2VjdGlvbl92YWx1ZXMgPSBuZXcgU2VjdGlvblZhbHVlcyh0aGlzLmNvbWJpbmVkX2NvbmZpZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIHRoZSBmYXN0IGNoZWNrLWluIG1vZGUgZnJvbSB0aGUgbWVzc2FnZSBib2R5LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5IC0gVGhlIG1lc3NhZ2UgYm9keS5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBmYXN0IGNoZWNrLWluIG1vZGUgaXMgcGFyc2VkLCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICovXG4gICAgcGFyc2VfZmFzdF9jaGVja2luX21vZGUoYm9keTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHBhcnNlZCA9IHRoaXMuY2hlY2tpbl92YWx1ZXMucGFyc2VfZmFzdF9jaGVja2luKGJvZHkpO1xuICAgICAgICBpZiAocGFyc2VkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tpbl9tb2RlID0gcGFyc2VkLmtleTtcbiAgICAgICAgICAgIHRoaXMuZmFzdF9jaGVja2luID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZXMgdGhlIGNoZWNrLWluIG1vZGUgZnJvbSB0aGUgbWVzc2FnZSBib2R5LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5IC0gVGhlIG1lc3NhZ2UgYm9keS5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBjaGVjay1pbiBtb2RlIGlzIHBhcnNlZCwgb3RoZXJ3aXNlIGZhbHNlLlxuICAgICAqL1xuICAgIHBhcnNlX2NoZWNraW4oYm9keTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHBhcnNlZCA9IHRoaXMuY2hlY2tpbl92YWx1ZXMucGFyc2VfY2hlY2tpbihib2R5KTtcbiAgICAgICAgaWYgKHBhcnNlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNraW5fbW9kZSA9IHBhcnNlZC5rZXk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIHRoZSBjaGVjay1pbiBtb2RlIGZyb20gdGhlIG5leHQgc3RlcC5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBjaGVjay1pbiBtb2RlIGlzIHBhcnNlZCwgb3RoZXJ3aXNlIGZhbHNlLlxuICAgICAqL1xuICAgIHBhcnNlX2NoZWNraW5fZnJvbV9uZXh0X3N0ZXAoKSB7XG4gICAgICAgIGNvbnN0IGxhc3Rfc2VnbWVudCA9IHRoaXMuYnZuc3BfbmV4dF9zdGVwXG4gICAgICAgICAgICA/LnNwbGl0KFwiLVwiKVxuICAgICAgICAgICAgLnNsaWNlKC0xKVswXTtcbiAgICAgICAgaWYgKGxhc3Rfc2VnbWVudCAmJiBsYXN0X3NlZ21lbnQgaW4gdGhpcy5jaGVja2luX3ZhbHVlcy5ieV9rZXkpIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tpbl9tb2RlID0gbGFzdF9zZWdtZW50O1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlbGF5cyB0aGUgZXhlY3V0aW9uIGZvciBhIHNwZWNpZmllZCBudW1iZXIgb2Ygc2Vjb25kcy5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2Vjb25kcyAtIFRoZSBudW1iZXIgb2Ygc2Vjb25kcyB0byBkZWxheS5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25hbD1mYWxzZV0gLSBXaGV0aGVyIHRoZSBkZWxheSBpcyBvcHRpb25hbC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgYWZ0ZXIgdGhlIGRlbGF5LlxuICAgICAqL1xuICAgIGRlbGF5KHNlY29uZHM6IG51bWJlciwgb3B0aW9uYWw6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBpZiAob3B0aW9uYWwgJiYgIXRoaXMuc21zX3JlcXVlc3QpIHtcbiAgICAgICAgICAgIHNlY29uZHMgPSAxIC8gMTAwMC4wO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzKSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJlcywgc2Vjb25kcyAqIDEwMDApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kcyBhIG1lc3NhZ2UgdG8gdGhlIHVzZXIuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSBUaGUgbWVzc2FnZSB0byBzZW5kLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBtZXNzYWdlIGlzIHNlbnQuXG4gICAgICovXG4gICAgYXN5bmMgc2VuZF9tZXNzYWdlKG1lc3NhZ2U6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5zbXNfcmVxdWVzdCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXRfdHdpbGlvX2NsaWVudCgpLm1lc3NhZ2VzLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgdG86IHRoaXMuZnJvbSxcbiAgICAgICAgICAgICAgICBmcm9tOiB0aGlzLnRvLFxuICAgICAgICAgICAgICAgIGJvZHk6IG1lc3NhZ2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVzdWx0X21lc3NhZ2VzLnB1c2gobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIHRoZSBjaGVjay1pbiBwcm9jZXNzLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBjaGVjay1pbiByZXNwb25zZS5cbiAgICAgKi9cbiAgICBhc3luYyBoYW5kbGUoKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2hhbmRsZSgpO1xuICAgICAgICBpZiAoIXRoaXMuc21zX3JlcXVlc3QpIHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQ/LnJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHRfbWVzc2FnZXMucHVzaChyZXN1bHQucmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogdGhpcy5yZXN1bHRfbWVzc2FnZXMuam9pbihcIlxcbiMjI1xcblwiKSxcbiAgICAgICAgICAgICAgICBuZXh0X3N0ZXA6IHJlc3VsdD8ubmV4dF9zdGVwLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEludGVybmFsIG1ldGhvZCB0byBoYW5kbGUgdGhlIGNoZWNrLWluIHByb2Nlc3MuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGNoZWNrLWluIHJlc3BvbnNlLlxuICAgICAqL1xuICAgIGFzeW5jIF9oYW5kbGUoKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgYFJlY2VpdmVkIHJlcXVlc3QgZnJvbSAke3RoaXMuZnJvbX0gd2l0aCBib2R5OiAke3RoaXMuYm9keX0gYW5kIHN0YXRlICR7dGhpcy5idm5zcF9uZXh0X3N0ZXB9YFxuICAgICAgICApO1xuICAgICAgICBpZiAodGhpcy5ib2R5ID09IFwibG9nb3V0XCIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIGxvZ291dGApO1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMubG9nb3V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlc3BvbnNlOiBCVk5TUFJlc3BvbnNlIHwgdW5kZWZpbmVkO1xuICAgICAgICBpZiAoIXRoaXMuY29uZmlnLlVTRV9TRVJWSUNFX0FDQ09VTlQpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlID0gYXdhaXQgdGhpcy5jaGVja191c2VyX2NyZWRzKCk7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UpIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5ib2R5Py50b0xvd2VyQ2FzZSgpID09PSBcInJlc3RhcnRcIikge1xuICAgICAgICAgICAgcmV0dXJuIHtyZXNwb25zZTogXCJPa2F5LiBUZXh0IG1lIGFnYWluIHRvIHN0YXJ0IG92ZXIuLi5cIn07XG4gICAgICAgIH1cblxuICAgICAgICByZXNwb25zZSA9IGF3YWl0IHRoaXMuZ2V0X21hcHBlZF9wYXRyb2xsZXIoKTtcbiAgICAgICAgaWYgKHJlc3BvbnNlIHx8IHRoaXMucGF0cm9sbGVyID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UgfHwge1xuICAgICAgICAgICAgICAgICAgICByZXNwb25zZTogXCJVbmV4cGVjdGVkIGVycm9yIGxvb2tpbmcgdXAgcGF0cm9sbGVyIG1hcHBpbmdcIixcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgKCF0aGlzLmJ2bnNwX25leHRfc3RlcCB8fFxuICAgICAgICAgICAgICAgIHRoaXMuYnZuc3BfbmV4dF9zdGVwID09IE5FWFRfU1RFUFMuQVdBSVRfQ09NTUFORCkgJiZcbiAgICAgICAgICAgIHRoaXMuYm9keVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnN0IGF3YWl0X3Jlc3BvbnNlID0gYXdhaXQgdGhpcy5oYW5kbGVfYXdhaXRfY29tbWFuZCgpO1xuICAgICAgICAgICAgaWYgKGF3YWl0X3Jlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0X3Jlc3BvbnNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgdGhpcy5idm5zcF9uZXh0X3N0ZXAgPT0gTkVYVF9TVEVQUy5BV0FJVF9DSEVDS0lOICYmXG4gICAgICAgICAgICB0aGlzLmJvZHlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wYXJzZV9jaGVja2luKHRoaXMuYm9keSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5jaGVja2luKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICB0aGlzLmJ2bnNwX25leHRfc3RlcD8uc3RhcnRzV2l0aChcbiAgICAgICAgICAgICAgICBORVhUX1NURVBTLkNPTkZJUk1fUkVTRVRcbiAgICAgICAgICAgICkgJiZcbiAgICAgICAgICAgIHRoaXMuYm9keVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmJvZHkgPT0gXCJ5ZXNcIiAmJiB0aGlzLnBhcnNlX2NoZWNraW5fZnJvbV9uZXh0X3N0ZXAoKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgICAgICBgUGVyZm9ybWluZyByZXNldF9zaGVldF9mbG93IGZvciAke3RoaXMucGF0cm9sbGVyLm5hbWV9IHdpdGggY2hlY2tpbiBtb2RlOiAke3RoaXMuY2hlY2tpbl9tb2RlfWBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIChhd2FpdCB0aGlzLnJlc2V0X3NoZWV0X2Zsb3coKSkgfHwgKGF3YWl0IHRoaXMuY2hlY2tpbigpKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICB0aGlzLmJ2bnNwX25leHRfc3RlcD8uc3RhcnRzV2l0aChORVhUX1NURVBTLkFVVEhfUkVTRVQpXG4gICAgICAgICkge1xuICAgICAgICAgICAgaWYgKHRoaXMucGFyc2VfY2hlY2tpbl9mcm9tX25leHRfc3RlcCgpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgICAgIGBQZXJmb3JtaW5nIHJlc2V0X3NoZWV0X2Zsb3ctcG9zdC1hdXRoIGZvciAke3RoaXMucGF0cm9sbGVyLm5hbWV9IHdpdGggY2hlY2tpbiBtb2RlOiAke3RoaXMuY2hlY2tpbl9tb2RlfWBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIChhd2FpdCB0aGlzLnJlc2V0X3NoZWV0X2Zsb3coKSkgfHwgKGF3YWl0IHRoaXMuY2hlY2tpbigpKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICB0aGlzLmJ2bnNwX25leHRfc3RlcD8uc3RhcnRzV2l0aChORVhUX1NURVBTLkFXQUlUX1NFQ1RJT04pICYmXG4gICAgICAgICAgICB0aGlzLmJvZHlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zdCBzZWN0aW9uID0gdGhpcy5zZWN0aW9uX3ZhbHVlcy5wYXJzZV9zZWN0aW9uKHRoaXMuYm9keSlcbiAgICAgICAgICAgIGlmIChzZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuYXNzaWduX3NlY3Rpb24oc2VjdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5wcm9tcHRfc2VjdGlvbl9hc3NpZ25tZW50KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICB0aGlzLmJ2bnNwX25leHRfc3RlcCA9PT0gTkVYVF9TVEVQUy5BV0FJVF9NRVNTQUdFICYmXG4gICAgICAgICAgICB0aGlzLmJvZHlfcmF3XG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuc2VuZF90ZXh0X21lc3NhZ2UodGhpcy5ib2R5X3Jhdyk7XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICB0aGlzLmJ2bnNwX25leHRfc3RlcCA9PT0gTkVYVF9TVEVQUy5BV0FJVF9CUk9BRENBU1QgJiZcbiAgICAgICAgICAgIHRoaXMuYm9keV9yYXdcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5zZW5kX2Jyb2FkY2FzdF9tZXNzYWdlKHRoaXMuYm9keV9yYXcpO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgdGhpcy5idm5zcF9uZXh0X3N0ZXA/LnN0YXJ0c1dpdGgoTkVYVF9TVEVQUy5BV0FJVF9CRUFDT04pICYmXG4gICAgICAgICAgICB0aGlzLmJvZHlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zdCBiZWFjb25fc2VhcmNoX2xvY2F0aW9uID0gYXdhaXQgdGhpcy5wYXJzZV9iZWFjb25fc2VhcmNoX2xvY2F0aW9uKHRoaXMuYm9keSlcbiAgICAgICAgICAgIGlmIChiZWFjb25fc2VhcmNoX2xvY2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuc2V0X2JlYWNvbl9zZWFyY2goYmVhY29uX3NlYXJjaF9sb2NhdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5wcm9tcHRfYmVhY29uX3NlYXJjaCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYnZuc3BfbmV4dF9zdGVwKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnNlbmRfbWVzc2FnZShcIlNvcnJ5LCBJIGRpZG4ndCB1bmRlcnN0YW5kIHRoYXQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnByb21wdF9jb21tYW5kKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlcyB0aGUgYXdhaXQgY29tbWFuZCBzdGVwLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2UgfCB1bmRlZmluZWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSByZXNwb25zZSBvciB1bmRlZmluZWQuXG4gICAgICovXG4gICAgYXN5bmMgaGFuZGxlX2F3YWl0X2NvbW1hbmQoKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlIHwgdW5kZWZpbmVkPiB7XG4gICAgICAgIGNvbnN0IHBhdHJvbGxlcl9uYW1lID0gdGhpcy5wYXRyb2xsZXIhLm5hbWU7XG4gICAgICAgIGlmICh0aGlzLnBhcnNlX2Zhc3RfY2hlY2tpbl9tb2RlKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICBgUGVyZm9ybWluZyBmYXN0IGNoZWNraW4gZm9yICR7cGF0cm9sbGVyX25hbWV9IHdpdGggbW9kZTogJHt0aGlzLmNoZWNraW5fbW9kZX1gXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuY2hlY2tpbigpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDT01NQU5EUy5PTl9EVVRZLmluY2x1ZGVzKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBnZXRfb25fZHV0eSBmb3IgJHtwYXRyb2xsZXJfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiB7IHJlc3BvbnNlOiBhd2FpdCB0aGlzLmdldF9vbl9kdXR5KCkgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhcIkNoZWNraW5nIGZvciBzdGF0dXMuLi5cIik7XG4gICAgICAgIGlmIChDT01NQU5EUy5TVEFUVVMuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIGdldF9zdGF0dXMgZm9yICR7cGF0cm9sbGVyX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRfc3RhdHVzKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKENPTU1BTkRTLkNIRUNLSU4uaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIHByb21wdF9jaGVja2luIGZvciAke3BhdHJvbGxlcl9uYW1lfWApO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvbXB0X2NoZWNraW4oKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQ09NTUFORFMuR1VFU1RfUEFTUy5pbmNsdWRlcyh0aGlzLmJvZHkhKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmZvcm1pbmcgcHJvbXB0X2d1ZXN0X3Bhc3MgZm9yICR7cGF0cm9sbGVyX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5wcm9tcHRfZ3Vlc3RfcGFzcygpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDT01NQU5EUy5CRUFDT04uaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIHByb21wdF9iZWFjb24gZm9yICR7cGF0cm9sbGVyX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5wcm9tcHRfYmVhY29uX3NlYXJjaCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnBhcnNlX2Zhc3Rfc2VjdGlvbl9hc3NpZ25tZW50KHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBmYXN0IHNlY3Rpb25fYXNzaWdubWVudCBmb3IgJHtwYXRyb2xsZXJfbmFtZX0gdG8gJHt0aGlzLmFzc2lnbmVkX3NlY3Rpb259YCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5hc3NpZ25fc2VjdGlvbih0aGlzLmFzc2lnbmVkX3NlY3Rpb24pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDT01NQU5EUy5TRUNUSU9OX0FTU0lHTk1FTlQuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIHNlY3Rpb25fYXNzaWdubWVudCBmb3IgJHtwYXRyb2xsZXJfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnByb21wdF9zZWN0aW9uX2Fzc2lnbm1lbnQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQ09NTUFORFMuV0hBVFNBUFAuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBJJ20gYXZhaWxhYmxlIG9uIFdoYXRzQXBwIGFzIHdlbGwhIFdoYXRzQXBwIHVzZXMgV2lmaS9DZWxsIERhdGEgaW5zdGVhZCBvZiBTTVMsIGFuZCBjYW4gYmUgbW9yZSByZWxpYWJsZS4gTWVzc2FnZSBtZSBhdCBodHRwczovL3dhLm1lLzEke3RoaXMudG99YCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKENPTU1BTkRTLk1FU1NBR0UuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIG1lc3NhZ2UgZm9yICR7cGF0cm9sbGVyX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5wcm9tcHRfbWVzc2FnZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDT01NQU5EUy5CUk9BRENBU1QuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIGJyb2FkY2FzdCBmb3IgJHtwYXRyb2xsZXJfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnByb21wdF9icm9hZGNhc3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb21wdHMgdGhlIHVzZXIgZm9yIGEgY29tbWFuZC5cbiAgICAgKiBAcmV0dXJucyB7QlZOU1BSZXNwb25zZX0gVGhlIHJlc3BvbnNlIHByb21wdGluZyB0aGUgdXNlciBmb3IgYSBjb21tYW5kLlxuICAgICAqL1xuICAgIHByb21wdF9jb21tYW5kKCk6IEJWTlNQUmVzcG9uc2Uge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IGAke3RoaXMucGF0cm9sbGVyIS5uYW1lfSwgSSdtIHRoZSBCVk5TUCBCb3QuXG5FbnRlciBhIGNvbW1hbmQ6XG5DaGVjayBpbiAvIENoZWNrIG91dCAvIFN0YXR1cyAvIEJlYWNvbiAvIFNlY3Rpb24gQXNzaWdubWVudCAvIEd1ZXN0IFBhc3MgLyBPbiBEdXR5IC8gTWVzc2FnZSAvIFdoYXRzQXBwXG5TZW5kICdyZXN0YXJ0JyBhdCBhbnkgdGltZSB0byBiZWdpbiBhZ2FpbmAsXG4gICAgICAgICAgICBuZXh0X3N0ZXA6IE5FWFRfU1RFUFMuQVdBSVRfQ09NTUFORCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm9tcHRzIHRoZSB1c2VyIGZvciBhIGNoZWNrLWluLlxuICAgICAqIEByZXR1cm5zIHtCVk5TUFJlc3BvbnNlfSBUaGUgcmVzcG9uc2UgcHJvbXB0aW5nIHRoZSB1c2VyIGZvciBhIGNoZWNrLWluLlxuICAgICAqL1xuICAgIHByb21wdF9jaGVja2luKCk6IEJWTlNQUmVzcG9uc2Uge1xuICAgICAgICBjb25zdCB0eXBlcyA9IE9iamVjdC52YWx1ZXModGhpcy5jaGVja2luX3ZhbHVlcy5ieV9rZXkpLm1hcChcbiAgICAgICAgICAgICh4KSA9PiB4LnNtc19kZXNjXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZTogYCR7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXIhLm5hbWVcbiAgICAgICAgICAgIH0sIHVwZGF0ZSBwYXRyb2xsaW5nIHN0YXR1cyB0bzogJHt0eXBlc1xuICAgICAgICAgICAgICAgIC5zbGljZSgwLCAtMSlcbiAgICAgICAgICAgICAgICAuam9pbihcIiwgXCIpfSwgb3IgJHt0eXBlcy5zbGljZSgtMSl9P2AsXG4gICAgICAgICAgICBuZXh0X3N0ZXA6IE5FWFRfU1RFUFMuQVdBSVRfQ0hFQ0tJTixcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIFBhcnNlcyB0aGUgZmFzdCBzZWN0aW9uIGFzc2lnbm1lbnQgZnJvbSB0aGUgbWVzc2FnZSBib2R5LlxuICAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHkgLSBUaGUgbWVzc2FnZSBib2R5LlxuICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNlY3Rpb24gYXNzaWdubWVudCBpcyBwYXJzZWQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAqL1xuICAgIHBhcnNlX2Zhc3Rfc2VjdGlvbl9hc3NpZ25tZW50KGJvZHk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHRoaXMuYXNzaWduZWRfc2VjdGlvbiA9IG51bGw7XG4gICAgaWYgKCFib2R5IHx8ICFib2R5LmluY2x1ZGVzKFwiLVwiKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHNlZ21lbnRzID0gYm9keS5zcGxpdChcIi1cIik7XG4gICAgY29uc3QgbGFzdFNlZ21lbnQgPSBzZWdtZW50cy5wb3AoKTtcbiAgICBjb25zdCBmaXJzdFBhcnQgPSBzZWdtZW50cy5qb2luKFwiLVwiKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgaWYgKGxhc3RTZWdtZW50ICYmIENPTU1BTkRTLlNFQ1RJT05fQVNTSUdOTUVOVC5pbmNsdWRlcyhmaXJzdFBhcnQpKSB7XG4gICAgICAgIHRoaXMuYXNzaWduZWRfc2VjdGlvbiA9IHRoaXMuc2VjdGlvbl92YWx1ZXMubWFwX3NlY3Rpb24obGFzdFNlZ21lbnQudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgIHJldHVybiB0aGlzLmFzc2lnbmVkX3NlY3Rpb24gIT09IG51bGwgJiYgdGhpcy5hc3NpZ25lZF9zZWN0aW9uICE9PSBcIlwiO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvbXB0cyB0aGUgdXNlciBmb3Igc2VjdGlvbiBhc3NpZ25tZW50LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSByZXNwb25zZS5cbiAgICAgKi9cbiAgICBhc3luYyBwcm9tcHRfc2VjdGlvbl9hc3NpZ25tZW50KCk6IFByb21pc2U8QlZOU1BSZXNwb25zZT4ge1xuICAgICAgICBpZiAoIXRoaXMucGF0cm9sbGVyIHx8ICF0aGlzLnBhdHJvbGxlci5jaGVja2luKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgJHt0aGlzLnBhdHJvbGxlciEubmFtZX0gaXMgbm90IGNoZWNrZWQgaW4uYCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2VjdGlvbl9kZXNjcmlwdGlvbiA9IHRoaXMuc2VjdGlvbl92YWx1ZXMuZ2V0X3NlY3Rpb25fZGVzY3JpcHRpb24oKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3BvbnNlOiBgRW50ZXIgeW91ciBhc3NpZ25lZCBzZWN0aW9uOyBvbmUgb2YgJHtzZWN0aW9uX2Rlc2NyaXB0aW9ufSAob3IgJ3Jlc3RhcnQnKWAsXG4gICAgICAgICAgICBuZXh0X3N0ZXA6IE5FWFRfU1RFUFMuQVdBSVRfU0VDVElPTixcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCdWlsZHMgdGhlIG1lc3NhZ2UgcHJlZml4IGZvciBhIHRleHQgbWVzc2FnZSBmcm9tIGEgcGF0cm9sbGVyLlxuICAgICAqIEluY2x1ZGVzIHRoZSBzZW5kZXIncyBuYW1lIGFuZCBmb3JtYXR0ZWQgcGhvbmUgbnVtYmVyLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZW5kZXJfbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwYXRyb2xsZXIgc2VuZGluZyB0aGUgbWVzc2FnZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VuZGVyX3Bob25lIC0gVGhlIHNlbmRlcidzIDEwLWRpZ2l0IHBob25lIG51bWJlci5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgbWVzc2FnZSBwcmVmaXguIGZvciBleGFtcGxlIDogXCJNZXNzYWdlIGZyb20gSm9obiBEb2UgKDEyMyk0NTYtNzg5MFwiLlxuICAgICAqL1xuICAgIGdldF9tZXNzYWdlX3ByZWZpeChzZW5kZXJfbmFtZTogc3RyaW5nLCBzZW5kZXJfcGhvbmU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZF9waG9uZSA9IGZvcm1hdF9waG9uZV9mb3JfZGlzcGxheShzZW5kZXJfcGhvbmUpO1xuICAgICAgICByZXR1cm4gYCR7TUVTU0FHRV9QUkVGSVhfVEVNUExBVEV9JHtzZW5kZXJfbmFtZX0gJHtmb3JtYXR0ZWRfcGhvbmV9JHtNRVNTQUdFX1BSRUZJWF9TVUZGSVh9YDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGVzIHRoZSBtYXhpbXVtIGFsbG93ZWQgbWVzc2FnZSBsZW5ndGggZm9yIGEgdGV4dCBtZXNzYWdlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZW5kZXJfbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwYXRyb2xsZXIgc2VuZGluZyB0aGUgbWVzc2FnZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VuZGVyX3Bob25lIC0gVGhlIHNlbmRlcidzIDEwLWRpZ2l0IHBob25lIG51bWJlci5cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgbWF4aW11bSBudW1iZXIgb2YgY2hhcmFjdGVycyB0aGUgdXNlcidzIG1lc3NhZ2UgY2FuIGNvbnRhaW4uXG4gICAgICovXG4gICAgZ2V0X21heF9tZXNzYWdlX2xlbmd0aChzZW5kZXJfbmFtZTogc3RyaW5nLCBzZW5kZXJfcGhvbmU6IHN0cmluZyk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBTTVNfTUFYX0xFTkdUSCAtIHRoaXMuZ2V0X21lc3NhZ2VfcHJlZml4KHNlbmRlcl9uYW1lLCBzZW5kZXJfcGhvbmUpLmxlbmd0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm9tcHRzIHRoZSB1c2VyIHRvIHR5cGUgdGhlaXIgdGV4dCBtZXNzYWdlLlxuICAgICAqIEFueSBwYXRyb2xsZXIgd2l0aCBhIHZhbGlkIHBob25lIG51bWJlciBjYW4gc2VuZCBhIG1lc3NhZ2UsIHJlZ2FyZGxlc3NcbiAgICAgKiBvZiB0aGVpciBvd24gY2hlY2staW4gc3RhdHVzLiAgVGhlIHJlY2lwaWVudCBsaXN0IGluY2x1ZGVzIGFsbFxuICAgICAqIHBhdHJvbGxlcnMgd2hvIGhhdmUgYW55IGNoZWNrLWluIHN0YXR1cyAoQWxsIERheSwgSGFsZiBBTSwgSGFsZiBQTSxcbiAgICAgKiBvciBDaGVja2VkIE91dCksIGluY2x1ZGluZyB0aGUgc2VuZGVyIHRoZW1zZWx2ZXMgaWYgdGhleSBhcmUgY2hlY2tlZCBpbi5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcHJvbXB0IHJlc3BvbnNlLlxuICAgICAqL1xuICAgIGFzeW5jIHByb21wdF9tZXNzYWdlKCk6IFByb21pc2U8QlZOU1BSZXNwb25zZT4ge1xuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG4gICAgICAgIGNvbnN0IHJlY2lwaWVudHMgPSBsb2dpbl9zaGVldC5nZXRfb25fZHV0eV9wYXRyb2xsZXJzKCk7XG4gICAgICAgIGlmIChyZWNpcGllbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYE5vIHBhdHJvbGxlcnMgYXJlIGN1cnJlbnRseSBsb2dnZWQgaW4uIFRoZXJlIGlzIG5vYm9keSB0byBzZW5kIGEgbWVzc2FnZSB0by5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZW5kZXJfcGhvbmUgPSBzYW5pdGl6ZV9waG9uZV9udW1iZXIodGhpcy5mcm9tKTtcbiAgICAgICAgY29uc3QgbWF4X2xlbmd0aCA9IHRoaXMuZ2V0X21heF9tZXNzYWdlX2xlbmd0aCh0aGlzLnBhdHJvbGxlciEubmFtZSwgc2VuZGVyX3Bob25lKTtcbiAgICAgICAgaWYgKG1heF9sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYFlvdXIgbmFtZSBpcyB0b28gbG9uZyB0byBzZW5kIGEgdGV4dCBtZXNzYWdlLmAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZTogYFBsZWFzZSB0eXBlIGEgbWVzc2FnZSBvZiBubyBtb3JlIHRoYW4gJHttYXhfbGVuZ3RofSBwbGFpbi10ZXh0IGNoYXJhY3RlcnMgdG8gJHtyZWNpcGllbnRzLmxlbmd0aH0gcGF0cm9sbGVyJHtyZWNpcGllbnRzLmxlbmd0aCAhPT0gMSA/IFwic1wiIDogXCJcIn0sIG9yICdyZXN0YXJ0JyB0byBjYW5jZWwuYCxcbiAgICAgICAgICAgIG5leHRfc3RlcDogTkVYVF9TVEVQUy5BV0FJVF9NRVNTQUdFLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbmRzIGEgdGV4dCBtZXNzYWdlIHRvIGFsbCBwYXRyb2xsZXJzIHdpdGggYSBjaGVjay1pbiBzdGF0dXMgZm9yIHRoZSBkYXkuXG4gICAgICogVGhlIHNlbmRlciBhbHNvIHJlY2VpdmVzIHRoZSBtZXNzYWdlIGlmIHRoZXkgaGF2ZSBhIGNoZWNrLWluIHN0YXR1cy5cbiAgICAgKiBWYWxpZGF0ZXMgdGhhdCB0aGUgY29tcGxldGUgbWVzc2FnZSAocHJlZml4ICsgYm9keSkgdXNlcyBvbmx5IEdTTS03XG4gICAgICogY2hhcmFjdGVycyBhbmQgZml0cyB3aXRoaW4gYSBzaW5nbGUgU01TIHNlZ21lbnQsIHVzaW5nIHRoZVxuICAgICAqIHNtcy1zZWdtZW50cy1jYWxjdWxhdG9yIGxpYnJhcnkuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VfdGV4dCAtIFRoZSByYXcgbWVzc2FnZSB0ZXh0IGZyb20gdGhlIHNlbmRlci5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgc2VuZCByZXN1bHQuXG4gICAgICovXG4gICAgYXN5bmMgc2VuZF90ZXh0X21lc3NhZ2UobWVzc2FnZV90ZXh0OiBzdHJpbmcpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3Qgc2VuZGVyX25hbWUgPSB0aGlzLnBhdHJvbGxlciEubmFtZTtcbiAgICAgICAgY29uc3Qgc2VuZGVyX3Bob25lID0gc2FuaXRpemVfcGhvbmVfbnVtYmVyKHRoaXMuZnJvbSk7XG4gICAgICAgIGNvbnN0IHByZWZpeCA9IHRoaXMuZ2V0X21lc3NhZ2VfcHJlZml4KHNlbmRlcl9uYW1lLCBzZW5kZXJfcGhvbmUpO1xuICAgICAgICBjb25zdCBtYXhfbGVuZ3RoID0gdGhpcy5nZXRfbWF4X21lc3NhZ2VfbGVuZ3RoKHNlbmRlcl9uYW1lLCBzZW5kZXJfcGhvbmUpO1xuICAgICAgICBjb25zdCBmdWxsX21lc3NhZ2UgPSBwcmVmaXggKyBtZXNzYWdlX3RleHQ7XG5cbiAgICAgICAgY29uc3QgdmFsaWRhdGlvbiA9IHZhbGlkYXRlX3Ntc19tZXNzYWdlKGZ1bGxfbWVzc2FnZSk7XG4gICAgICAgIGlmICghdmFsaWRhdGlvbi52YWxpZCkge1xuICAgICAgICAgICAgaWYgKHZhbGlkYXRpb24ucmVhc29uID09PSBcIm5vbl9nc203XCIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBiYWRfY2hhcnMgPSB2YWxpZGF0aW9uLm5vbl9nc21fY2hhcmFjdGVycyEuam9pbihcIiBcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBZb3VyIG1lc3NhZ2UgY29udGFpbnMgY2hhcmFjdGVycyB0aGF0IGFyZSBub3Qgc3VwcG9ydGVkIGluIHBsYWluLXRleHQgU01TOiAke2JhZF9jaGFyc30uIFBsZWFzZSB1c2Ugb25seSBzdGFuZGFyZCBjaGFyYWN0ZXJzIGFuZCB0cnkgYWdhaW4uYCxcbiAgICAgICAgICAgICAgICAgICAgbmV4dF9zdGVwOiBORVhUX1NURVBTLkFXQUlUX01FU1NBR0UsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBZb3VyIG1lc3NhZ2UgaXMgJHttZXNzYWdlX3RleHQubGVuZ3RofSBjaGFyYWN0ZXJzLCB3aGljaCBleGNlZWRzIHRoZSBsaW1pdCBvZiAke21heF9sZW5ndGh9LiBQbGVhc2Ugc2hvcnRlbiB5b3VyIG1lc3NhZ2UgYW5kIHRyeSBhZ2Fpbiwgb3IgdHlwZSAncmVzdGFydCcgdG8gY2FuY2VsLmAsXG4gICAgICAgICAgICAgICAgbmV4dF9zdGVwOiBORVhUX1NURVBTLkFXQUlUX01FU1NBR0UsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuICAgICAgICBjb25zdCBzaWduZWRfaW5fcGF0cm9sbGVycyA9IGxvZ2luX3NoZWV0LmdldF9vbl9kdXR5X3BhdHJvbGxlcnMoKTtcbiAgICAgICAgY29uc3QgcGhvbmVfbWFwID0gYXdhaXQgdGhpcy5nZXRfcGhvbmVfbnVtYmVyX21hcCgpO1xuXG4gICAgICAgIC8vIEJ1aWxkIHJlY2lwaWVudCBtYXAgZm9yIG9uLWR1dHkgcGF0cm9sbGVycyB3aXRoIGtub3duIHBob25lczsgdHJhY2sgbWlzc2luZ1xuICAgICAgICBjb25zdCByZWNpcGllbnRfbWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge307XG4gICAgICAgIGNvbnN0IG5vX3Bob25lX25hbWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IHBhdHJvbGxlciBvZiBzaWduZWRfaW5fcGF0cm9sbGVycykge1xuICAgICAgICAgICAgY29uc3QgcGhvbmUgPSBwaG9uZV9tYXBbcGF0cm9sbGVyLm5hbWVdO1xuICAgICAgICAgICAgaWYgKHBob25lKSB7XG4gICAgICAgICAgICAgICAgcmVjaXBpZW50X21hcFtwYXRyb2xsZXIubmFtZV0gPSBwaG9uZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbm9fcGhvbmVfbmFtZXMucHVzaChwYXRyb2xsZXIubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB7IHNlbnRfY291bnQsIGNvcHlfc2VudF90b19zZW5kZXIsIGZhaWxlZF9uYW1lcyB9ID1cbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZGVsaXZlcl9zbXNfdG9fbWFwKHJlY2lwaWVudF9tYXAsIGZ1bGxfbWVzc2FnZSwgc2VuZGVyX25hbWUpO1xuXG4gICAgICAgIGF3YWl0IHRoaXMubG9nX2FjdGlvbihgdGV4dF9tZXNzYWdlKCR7c2VudF9jb3VudCArIChjb3B5X3NlbnRfdG9fc2VuZGVyID8gMSA6IDApfSlgKTtcblxuICAgICAgICBsZXQgcmVzcG9uc2UgPSBgTWVzc2FnZSBzZW50IHRvICR7c2VudF9jb3VudH0gcGF0cm9sbGVyJHtzZW50X2NvdW50ICE9PSAxID8gXCJzXCIgOiBcIlwifWA7XG4gICAgICAgIGlmIChjb3B5X3NlbnRfdG9fc2VuZGVyKSB7XG4gICAgICAgICAgICByZXNwb25zZSArPSBgIGFuZCBhIGNvcHkgdG8geW91LmA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNwb25zZSArPSBgLmA7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYWxsX2ZhaWxlZCA9IFsuLi5ub19waG9uZV9uYW1lcywgLi4uZmFpbGVkX25hbWVzXTtcbiAgICAgICAgaWYgKGFsbF9mYWlsZWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmVzcG9uc2UgKz0gYCBDb3VsZCBub3Qgc2VuZCB0bzogJHthbGxfZmFpbGVkLmpvaW4oXCIsIFwiKX0uYDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyByZXNwb25zZSB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvcmUgU01TIGRlbGl2ZXJ5IGxvb3AuIFNlbmRzIGZ1bGxfbWVzc2FnZSB0byBlYWNoIGVudHJ5IGluIHJlY2lwaWVudF9tYXBcbiAgICAgKiAobmFtZSDihpIgXCIrMVhYWFhYWFhYWFhcIikuIElmIHRoZSBzZW5kZXIncyBwaG9uZSBpcyBub3QgYW1vbmcgdGhlIHJlY2lwaWVudHMsXG4gICAgICogYSBjb3B5IGlzIHNlbnQgdG8gdGhpcy5mcm9tLiBSZXR1cm5zIGRlbGl2ZXJ5IGFjY291bnRpbmcgZGF0YS5cbiAgICAgKiBAcGFyYW0ge1JlY29yZDxzdHJpbmcsIHN0cmluZz59IHJlY2lwaWVudF9tYXAgLSBNYXAgb2YgcGF0cm9sbGVyIG5hbWUgdG8gXCIrMVhYWFhYWFhYWFhcIiBwaG9uZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZnVsbF9tZXNzYWdlIC0gVGhlIGNvbXBsZXRlIGZvcm1hdHRlZCBTTVMgdG8gc2VuZC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VuZGVyX25hbWUgLSBUaGUgc2VuZGVyJ3MgbmFtZSAodXNlZCBmb3IgZmFpbHVyZSBsb2dnaW5nKS5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxvYmplY3Q+fSBEZWxpdmVyeSBjb3VudHMgYW5kIGZhaWx1cmUgbGlzdC5cbiAgICAgKi9cbiAgICBhc3luYyBkZWxpdmVyX3Ntc190b19tYXAoXG4gICAgICAgIHJlY2lwaWVudF9tYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4sXG4gICAgICAgIGZ1bGxfbWVzc2FnZTogc3RyaW5nLFxuICAgICAgICBzZW5kZXJfbmFtZTogc3RyaW5nLFxuICAgICk6IFByb21pc2U8eyBzZW50X2NvdW50OiBudW1iZXI7IGNvcHlfc2VudF90b19zZW5kZXI6IGJvb2xlYW47IGZhaWxlZF9uYW1lczogc3RyaW5nW10gfT4ge1xuICAgICAgICBsZXQgc2VudF9jb3VudCA9IDA7XG4gICAgICAgIGNvbnN0IGZhaWxlZF9uYW1lczogc3RyaW5nW10gPSBbXTtcblxuICAgICAgICBmb3IgKGNvbnN0IFtuYW1lLCBwaG9uZV0gb2YgT2JqZWN0LmVudHJpZXMocmVjaXBpZW50X21hcCkpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXRfdHdpbGlvX2NsaWVudCgpLm1lc3NhZ2VzLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHRvOiBwaG9uZSxcbiAgICAgICAgICAgICAgICAgICAgZnJvbTogdGhpcy50byxcbiAgICAgICAgICAgICAgICAgICAgYm9keTogZnVsbF9tZXNzYWdlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHNlbnRfY291bnQrKztcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgRmFpbGVkIHRvIHNlbmQgU01TIHRvICR7bmFtZX06ICR7ZX1gKTtcbiAgICAgICAgICAgICAgICBmYWlsZWRfbmFtZXMucHVzaChuYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNlbmQgYSBjb3B5IHRvIHRoZSBzZW5kZXIgaWYgdGhlaXIgbnVtYmVyIGlzIG5vdCBhbHJlYWR5IGluIHRoZSByZWNpcGllbnQgbWFwXG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZWRfc2VuZGVyID0gYCsxJHtzYW5pdGl6ZV9waG9uZV9udW1iZXIodGhpcy5mcm9tKX1gO1xuICAgICAgICBjb25zdCBzZW5kZXJfaW5fbWFwID0gT2JqZWN0LnZhbHVlcyhyZWNpcGllbnRfbWFwKS5pbmNsdWRlcyhub3JtYWxpemVkX3NlbmRlcik7XG4gICAgICAgIGxldCBjb3B5X3NlbnRfdG9fc2VuZGVyID0gZmFsc2U7XG4gICAgICAgIGlmICghc2VuZGVyX2luX21hcCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmdldF90d2lsaW9fY2xpZW50KCkubWVzc2FnZXMuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgdG86IHRoaXMuZnJvbSxcbiAgICAgICAgICAgICAgICAgICAgZnJvbTogdGhpcy50byxcbiAgICAgICAgICAgICAgICAgICAgYm9keTogZnVsbF9tZXNzYWdlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvcHlfc2VudF90b19zZW5kZXIgPSB0cnVlO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBGYWlsZWQgdG8gc2VuZCBTTVMgY29weSB0byBzZW5kZXIgJHtzZW5kZXJfbmFtZX06ICR7ZX1gKTtcbiAgICAgICAgICAgICAgICBmYWlsZWRfbmFtZXMucHVzaChzZW5kZXJfbmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geyBzZW50X2NvdW50LCBjb3B5X3NlbnRfdG9fc2VuZGVyLCBmYWlsZWRfbmFtZXMgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm9tcHRzIHRoZSB1c2VyIHRvIHR5cGUgYSBicm9hZGNhc3QgbWVzc2FnZSB0byBhbGwgcGF0cm9sbGVycy5cbiAgICAgKiBVbmxpa2UgdGhlIG1lc3NhZ2UgY29tbWFuZCAod2hpY2ggdGFyZ2V0cyBvbmx5IGxvZ2dlZC1pbiBwYXRyb2xsZXJzKSwgYnJvYWRjYXN0XG4gICAgICogc2VuZHMgdG8gZXZlcnkgcGF0cm9sbGVyIGluIHRoZSBQaG9uZSBOdW1iZXJzIHNoZWV0LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBwcm9tcHQgcmVzcG9uc2UuXG4gICAgICovXG4gICAgYXN5bmMgcHJvbXB0X2Jyb2FkY2FzdCgpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgcGhvbmVfbWFwID0gYXdhaXQgdGhpcy5nZXRfcGhvbmVfbnVtYmVyX21hcCgpO1xuICAgICAgICBjb25zdCByZWNpcGllbnRfY291bnQgPSBPYmplY3Qua2V5cyhwaG9uZV9tYXApLmxlbmd0aDtcbiAgICAgICAgaWYgKHJlY2lwaWVudF9jb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYE5vIHBhdHJvbGxlcnMgd2l0aCBwaG9uZSBudW1iZXJzIGZvdW5kLiBUaGVyZSBpcyBub2JvZHkgdG8gYnJvYWRjYXN0IHRvLmAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNlbmRlcl9waG9uZSA9IHNhbml0aXplX3Bob25lX251bWJlcih0aGlzLmZyb20pO1xuICAgICAgICBjb25zdCBtYXhfbGVuZ3RoID0gdGhpcy5nZXRfbWF4X21lc3NhZ2VfbGVuZ3RoKHRoaXMucGF0cm9sbGVyIS5uYW1lLCBzZW5kZXJfcGhvbmUpO1xuICAgICAgICBpZiAobWF4X2xlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgWW91ciBuYW1lIGlzIHRvbyBsb25nIHRvIHNlbmQgYSBicm9hZGNhc3QgbWVzc2FnZS5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IGBQbGVhc2UgdHlwZSBhIGJyb2FkY2FzdCBtZXNzYWdlIG9mIG5vIG1vcmUgdGhhbiAke21heF9sZW5ndGh9IHBsYWluLXRleHQgY2hhcmFjdGVycyB0byAke3JlY2lwaWVudF9jb3VudH0gcGF0cm9sbGVyJHtyZWNpcGllbnRfY291bnQgIT09IDEgPyBcInNcIiA6IFwiXCJ9LCBvciAncmVzdGFydCcgdG8gY2FuY2VsLmAsXG4gICAgICAgICAgICBuZXh0X3N0ZXA6IE5FWFRfU1RFUFMuQVdBSVRfQlJPQURDQVNULFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbmRzIGEgYnJvYWRjYXN0IG1lc3NhZ2UgdG8gQUxMIHBhdHJvbGxlcnMgaW4gdGhlIFBob25lIE51bWJlcnMgc2hlZXQsXG4gICAgICogcmVnYXJkbGVzcyBvZiBjaGVjay1pbiBzdGF0dXMuIFVzZXMgdGhlIHNhbWUgcHJlZml4IGZvcm1hdCBhbmQgR1NNLTcgLyBzaW5nbGUtc2VnbWVudFxuICAgICAqIHZhbGlkYXRpb24gYXMgdGhlIG1lc3NhZ2UgY29tbWFuZC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZV90ZXh0IC0gVGhlIHJhdyBtZXNzYWdlIHRleHQgZnJvbSB0aGUgc2VuZGVyLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBzZW5kIHJlc3VsdC5cbiAgICAgKi9cbiAgICBhc3luYyBzZW5kX2Jyb2FkY2FzdF9tZXNzYWdlKG1lc3NhZ2VfdGV4dDogc3RyaW5nKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnN0IHNlbmRlcl9uYW1lID0gdGhpcy5wYXRyb2xsZXIhLm5hbWU7XG4gICAgICAgIGNvbnN0IHNlbmRlcl9waG9uZSA9IHNhbml0aXplX3Bob25lX251bWJlcih0aGlzLmZyb20pO1xuICAgICAgICBjb25zdCBwcmVmaXggPSB0aGlzLmdldF9tZXNzYWdlX3ByZWZpeChzZW5kZXJfbmFtZSwgc2VuZGVyX3Bob25lKTtcbiAgICAgICAgY29uc3QgbWF4X2xlbmd0aCA9IHRoaXMuZ2V0X21heF9tZXNzYWdlX2xlbmd0aChzZW5kZXJfbmFtZSwgc2VuZGVyX3Bob25lKTtcbiAgICAgICAgY29uc3QgZnVsbF9tZXNzYWdlID0gcHJlZml4ICsgbWVzc2FnZV90ZXh0O1xuXG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb24gPSB2YWxpZGF0ZV9zbXNfbWVzc2FnZShmdWxsX21lc3NhZ2UpO1xuICAgICAgICBpZiAoIXZhbGlkYXRpb24udmFsaWQpIHtcbiAgICAgICAgICAgIGlmICh2YWxpZGF0aW9uLnJlYXNvbiA9PT0gXCJub25fZ3NtN1wiKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYmFkX2NoYXJzID0gdmFsaWRhdGlvbi5ub25fZ3NtX2NoYXJhY3RlcnMhLmpvaW4oXCIgXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgWW91ciBtZXNzYWdlIGNvbnRhaW5zIGNoYXJhY3RlcnMgdGhhdCBhcmUgbm90IHN1cHBvcnRlZCBpbiBwbGFpbi10ZXh0IFNNUzogJHtiYWRfY2hhcnN9LiBQbGVhc2UgdXNlIG9ubHkgc3RhbmRhcmQgY2hhcmFjdGVycyBhbmQgdHJ5IGFnYWluLmAsXG4gICAgICAgICAgICAgICAgICAgIG5leHRfc3RlcDogTkVYVF9TVEVQUy5BV0FJVF9CUk9BRENBU1QsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBZb3VyIG1lc3NhZ2UgaXMgJHttZXNzYWdlX3RleHQubGVuZ3RofSBjaGFyYWN0ZXJzLCB3aGljaCBleGNlZWRzIHRoZSBsaW1pdCBvZiAke21heF9sZW5ndGh9LiBQbGVhc2Ugc2hvcnRlbiB5b3VyIG1lc3NhZ2UgYW5kIHRyeSBhZ2Fpbiwgb3IgdHlwZSAncmVzdGFydCcgdG8gY2FuY2VsLmAsXG4gICAgICAgICAgICAgICAgbmV4dF9zdGVwOiBORVhUX1NURVBTLkFXQUlUX0JST0FEQ0FTVCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGb3IgYnJvYWRjYXN0LCBzZW5kIHRvIEFMTCBwYXRyb2xsZXJzIGluIHRoZSBwaG9uZSBudW1iZXIgbWFwXG4gICAgICAgIGNvbnN0IHBob25lX21hcCA9IGF3YWl0IHRoaXMuZ2V0X3Bob25lX251bWJlcl9tYXAoKTtcbiAgICAgICAgY29uc3QgeyBzZW50X2NvdW50LCBjb3B5X3NlbnRfdG9fc2VuZGVyLCBmYWlsZWRfbmFtZXMgfSA9XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmRlbGl2ZXJfc21zX3RvX21hcChwaG9uZV9tYXAsIGZ1bGxfbWVzc2FnZSwgc2VuZGVyX25hbWUpO1xuXG4gICAgICAgIGF3YWl0IHRoaXMubG9nX2FjdGlvbihgYnJvYWRjYXN0KCR7c2VudF9jb3VudCArIChjb3B5X3NlbnRfdG9fc2VuZGVyID8gMSA6IDApfSlgKTtcblxuICAgICAgICBsZXQgcmVzcG9uc2UgPSBgQnJvYWRjYXN0IHNlbnQgdG8gJHtzZW50X2NvdW50fSBwYXRyb2xsZXIke3NlbnRfY291bnQgIT09IDEgPyBcInNcIiA6IFwiXCJ9YDtcbiAgICAgICAgaWYgKGNvcHlfc2VudF90b19zZW5kZXIpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlICs9IGAgYW5kIGEgY29weSB0byB5b3UuYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3BvbnNlICs9IGAuYDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmYWlsZWRfbmFtZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmVzcG9uc2UgKz0gYCBDb3VsZCBub3Qgc2VuZCB0bzogJHtmYWlsZWRfbmFtZXMuam9pbihcIiwgXCIpfS5gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHJlc3BvbnNlIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9va3MgdXAgcGhvbmUgbnVtYmVycyBmb3IgYWxsIHBhdHJvbGxlcnMgZnJvbSB0aGUgUGhvbmUgTnVtYmVycyBzaGVldC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+Pn0gQSBtYXAgb2YgcGF0cm9sbGVyIG5hbWUgdG8gcGhvbmUgbnVtYmVyIChpbiArMVhYWFhYWFhYWFggZm9ybWF0KS5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfcGhvbmVfbnVtYmVyX21hcCgpOiBQcm9taXNlPFJlY29yZDxzdHJpbmcsIHN0cmluZz4+IHtcbiAgICAgICAgY29uc3Qgc2hlZXRzX3NlcnZpY2UgPSBhd2FpdCB0aGlzLmdldF9zaGVldHNfc2VydmljZSgpO1xuICAgICAgICBjb25zdCBvcHRzOiBGaW5kUGF0cm9sbGVyQ29uZmlnID0gdGhpcy5jb21iaW5lZF9jb25maWc7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgc2hlZXRzX3NlcnZpY2Uuc3ByZWFkc2hlZXRzLnZhbHVlcy5nZXQoe1xuICAgICAgICAgICAgc3ByZWFkc2hlZXRJZDogb3B0cy5TSEVFVF9JRCxcbiAgICAgICAgICAgIHJhbmdlOiBvcHRzLlBIT05FX05VTUJFUl9MT09LVVBfU0hFRVQsXG4gICAgICAgICAgICB2YWx1ZVJlbmRlck9wdGlvbjogXCJVTkZPUk1BVFRFRF9WQUxVRVwiLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhLnZhbHVlcykge1xuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IHJvdyBvZiByZXNwb25zZS5kYXRhLnZhbHVlcykge1xuICAgICAgICAgICAgY29uc3QgbmFtZSA9IHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5QSE9ORV9OVU1CRVJfTkFNRV9DT0xVTU4pXTtcbiAgICAgICAgICAgIGNvbnN0IHJhd051bWJlciA9IHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5QSE9ORV9OVU1CRVJfTlVNQkVSX0NPTFVNTildO1xuICAgICAgICAgICAgaWYgKG5hbWUgJiYgcmF3TnVtYmVyKSB7XG4gICAgICAgICAgICAgICAgbWFwW25hbWVdID0gYCsxJHtzYW5pdGl6ZV9waG9uZV9udW1iZXIocmF3TnVtYmVyKX1gO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXNzaWducyB0aGUgc2VjdGlvbiB0byB0aGUgcGF0cm9sbGVyLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbH0gc2VjdGlvbiAgVGhlIHNlY3Rpb24gdG8gYXNzaWduLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSByZXNwb25zZS5cbiAgICAgKi9cbiAgICBhc3luYyBhc3NpZ25fc2VjdGlvbihzZWN0aW9uOiBzdHJpbmcgfCBudWxsKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnN0IGFzc2lnbmVkU2VjdGlvbiA9IHNlY3Rpb24gPz8gXCJSb3ZpbmdcIjtcbiAgICAgICAgY29uc29sZS5sb2coYEFzc2lnbmluZyBzZWN0aW9uICR7dGhpcy5wYXRyb2xsZXIhLm5hbWV9IHRvICR7YXNzaWduZWRTZWN0aW9ufWApO1xuICAgICAgICBjb25zdCBtYXBwZWRfc2VjdGlvbiA9IHRoaXMuc2VjdGlvbl92YWx1ZXMubWFwX3NlY3Rpb24oYXNzaWduZWRTZWN0aW9uKTtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKGBhc3NpZ25fc2VjdGlvbigke21hcHBlZF9zZWN0aW9ufSlgKTtcbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuICAgICAgICBhd2FpdCBsb2dpbl9zaGVldC5hc3NpZ25fc2VjdGlvbih0aGlzLnBhdHJvbGxlciEsIG1hcHBlZF9zZWN0aW9uKTtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2dpbl9zaGVldD8ucmVmcmVzaCgpO1xuICAgICAgICBhd2FpdCB0aGlzLmdldF9tYXBwZWRfcGF0cm9sbGVyKHRydWUpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IGBVcGRhdGVkICR7dGhpcy5wYXRyb2xsZXIhLm5hbWV9IHdpdGggc2VjdGlvbiBhc3NpZ25tZW50OiAke21hcHBlZF9zZWN0aW9ufS5gLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlY29yZCB0aGUgYmVhY29uIHNlYXJjaCBmb3IgdGhpcyBwYXRyb2xsZXJcbiAgICAgKiBAcGFyYW17c3RyaW5nIH0gIGJlYWNvbl9zZWFyY2hfbG9jYXRpb24gIHdoZXJlIHRoZSBiZWFjb24gd2FzIGZvdW5kXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZT59XG4gICAgICovXG4gICAgYXN5bmMgc2V0X2JlYWNvbl9zZWFyY2goYmVhY29uX3NlYXJjaF9sb2NhdGlvbjogc3RyaW5nKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBTZXR0aW5nIGJlYWNvbiBzZWFyY2ggZm9yICR7dGhpcy5wYXRyb2xsZXIhLm5hbWV9IGF0ICR7YmVhY29uX3NlYXJjaF9sb2NhdGlvbn1gKTtcbiAgICAgICAgY29uc3Qgc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9zbGVkX2JlYWNvbl9jaGVja19zaGVldCgpO1xuICAgICAgICBjb25zdCBwcmlvcl9zZWFyY2hlcyA9IGF3YWl0IHNoZWV0LmdldF9iZWFjb25fc2VhcmNoZXModGhpcy5wYXRyb2xsZXIhLm5hbWUpO1xuICAgICAgICBpZiAocHJpb3Jfc2VhcmNoZXMgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgcmVzcG9uc2U6IFwiUHJvYmxlbSBsb29raW5nIHVwIHBhdHJvbGxlciBmb3IgYmVhY29uIHNlYXJjaGVzLlwiIH07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZWNvcmQgdGhlIG5ldyBiZWFjb24gc2VhcmNoXG4gICAgICAgIGF3YWl0IHNoZWV0LnNldF9iZWFjb25zX3NlYXJjaGVzKHByaW9yX3NlYXJjaGVzLCBiZWFjb25fc2VhcmNoX2xvY2F0aW9uKTtcblxuICAgICAgICAvLyBSZS1yZWFkIHRoZSB2YWx1ZXMgYW5kIHJldHVybiBjb25maXJtYXRpb25cbiAgICAgICAgY29uc3QgdXBkYXRlZCA9IGF3YWl0IHNoZWV0LmdldF9iZWFjb25fc2VhcmNoZXModGhpcy5wYXRyb2xsZXIhLm5hbWUpO1xuICAgICAgICBpZiAodXBkYXRlZCA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4geyByZXNwb25zZTogYFVuYWJsZSB0byByZWNvcmQgYmVhY29uIHNlYXJjaCBmb3IgJHt0aGlzLnBhdHJvbGxlciEubmFtZX0gdG9kYXkuYCB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN0YXR1cyA9IGBDb21wbGV0ZWQgJHt1cGRhdGVkLnNlYXJjaF9jb3VudH0gc2VhcmNoJHt1cGRhdGVkLnNlYXJjaF9jb3VudCA9PT0gMSA/ICcnIDogJ2VzJ30gdGhpcyBzZWFzb24uYDtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IGBVcGRhdGVkICR7dGhpcy5wYXRyb2xsZXIhLm5hbWV9IHRvIGNvbXBsZXRlIGJlYWNvbiBzZWFyY2ggYXQgJHtiZWFjb25fc2VhcmNoX2xvY2F0aW9ufSB0b2RheS5cXG4ke3N0YXR1c31gLFxuICAgICAgICB9O1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgc3RhdHVzIG9mIHRoZSBwYXRyb2xsZXIuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHN0YXR1cyByZXNwb25zZS5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfc3RhdHVzKCk6IFByb21pc2U8QlZOU1BSZXNwb25zZT4ge1xuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG4gICAgICAgIGNvbnN0IHNoZWV0X2RhdGUgPSBsb2dpbl9zaGVldC5zaGVldF9kYXRlLnRvRGF0ZVN0cmluZygpO1xuICAgICAgICBjb25zdCBjdXJyZW50X2RhdGUgPSBsb2dpbl9zaGVldC5jdXJyZW50X2RhdGUudG9EYXRlU3RyaW5nKCk7XG4gICAgICAgIGlmICghbG9naW5fc2hlZXQuaXNfY3VycmVudCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYHNoZWV0X2RhdGU6ICR7bG9naW5fc2hlZXQuc2hlZXRfZGF0ZX1gKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBjdXJyZW50X2RhdGU6ICR7bG9naW5fc2hlZXQuY3VycmVudF9kYXRlfWApO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYFNoZWV0IGlzIG5vdCBjdXJyZW50IGZvciB0b2RheSAobGFzdCByZXNldDogJHtzaGVldF9kYXRlfSkuICR7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyIS5uYW1lXG4gICAgICAgICAgICAgICAgfSBpcyBub3QgY2hlY2tlZCBpbiBmb3IgJHtjdXJyZW50X2RhdGV9LmAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0geyByZXNwb25zZTogYXdhaXQgdGhpcy5nZXRfc3RhdHVzX3N0cmluZygpIH07XG4gICAgICAgIGF3YWl0IHRoaXMubG9nX2FjdGlvbihcInN0YXR1c1wiKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHN0YXR1cyBzdHJpbmcgb2YgdGhlIHBhdHJvbGxlci5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzdHJpbmc+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBzdGF0dXMgc3RyaW5nLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF9zdGF0dXNfc3RyaW5nKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKTtcbiAgICAgICAgY29uc3QgZ3Vlc3RfcGFzc19wcm9taXNlID0gKFxuICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXRfZ3Vlc3RfcGFzc19zaGVldCgpXG4gICAgICAgICkuZ2V0X2F2YWlsYWJsZV9hbmRfdXNlZF9wYXNzZXModGhpcy5wYXRyb2xsZXIhLm5hbWUpO1xuICAgICAgICBjb25zdCBwYXRyb2xsZXJfc3RhdHVzID0gdGhpcy5wYXRyb2xsZXIhO1xuXG4gICAgICAgIGNvbnN0IGNoZWNraW5Db2x1bW5TZXQgPVxuICAgICAgICAgICAgcGF0cm9sbGVyX3N0YXR1cy5jaGVja2luICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIHBhdHJvbGxlcl9zdGF0dXMuY2hlY2tpbiAhPT0gbnVsbDtcbiAgICAgICAgY29uc3QgY2hlY2tlZE91dCA9XG4gICAgICAgICAgICBjaGVja2luQ29sdW1uU2V0ICYmXG4gICAgICAgICAgICB0aGlzLmNoZWNraW5fdmFsdWVzLmJ5X3NoZWV0X3N0cmluZ1twYXRyb2xsZXJfc3RhdHVzLmNoZWNraW5dLmtleSA9PVxuICAgICAgICAgICAgICAgIFwib3V0XCI7XG4gICAgICAgIGxldCBzdGF0dXMgPSBwYXRyb2xsZXJfc3RhdHVzLmNoZWNraW4gfHwgXCJOb3QgUHJlc2VudFwiO1xuXG4gICAgICAgIGlmIChjaGVja2VkT3V0KSB7XG4gICAgICAgICAgICBzdGF0dXMgPSBcIkNoZWNrZWQgT3V0XCI7XG4gICAgICAgIH0gZWxzZSBpZiAoY2hlY2tpbkNvbHVtblNldCkge1xuICAgICAgICAgICAgbGV0IHNlY3Rpb24gPSBwYXRyb2xsZXJfc3RhdHVzLnNlY3Rpb24udG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGlmIChzZWN0aW9uLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgc2VjdGlvbiA9IGBTZWN0aW9uICR7c2VjdGlvbn1gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RhdHVzID0gYCR7cGF0cm9sbGVyX3N0YXR1cy5jaGVja2lufSAoJHtzZWN0aW9ufSlgO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29tcGxldGVkUGF0cm9sRGF5cyA9IGF3YWl0IChcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0X3NlYXNvbl9zaGVldCgpXG4gICAgICAgICkuZ2V0X3BhdHJvbGxlZF9kYXlzKHRoaXMucGF0cm9sbGVyIS5uYW1lKTtcbiAgICAgICAgY29uc3QgY29tcGxldGVkUGF0cm9sRGF5c1N0cmluZyA9XG4gICAgICAgICAgICBjb21wbGV0ZWRQYXRyb2xEYXlzID4gMCA/IGNvbXBsZXRlZFBhdHJvbERheXMudG9TdHJpbmcoKSA6IFwiTm9cIjtcbiAgICAgICAgY29uc3QgbG9naW5TaGVldERhdGUgPSBsb2dpbl9zaGVldC5zaGVldF9kYXRlLnRvRGF0ZVN0cmluZygpO1xuXG4gICAgICAgIGxldCBzdGF0dXNTdHJpbmcgPSBgU3RhdHVzIGZvciAke1xuICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXIhLm5hbWVcbiAgICAgICAgfSBvbiBkYXRlICR7bG9naW5TaGVldERhdGV9OiAke3N0YXR1c30uXFxuJHtjb21wbGV0ZWRQYXRyb2xEYXlzU3RyaW5nfSBjb21wbGV0ZWQgcGF0cm9sIGRheXMgcHJpb3IgdG8gdG9kYXkuYDtcbiAgICAgICAgY29uc3QgdXNlZFRvZGF5R3Vlc3RQYXNzZXMgPSAoYXdhaXQgZ3Vlc3RfcGFzc19wcm9taXNlKT8udXNlZF90b2RheSB8fCAwO1xuICAgICAgICBjb25zdCB1c2VkU2Vhc29uR3Vlc3RQYXNzZXMgPVxuICAgICAgICAgICAgKGF3YWl0IGd1ZXN0X3Bhc3NfcHJvbWlzZSk/LnVzZWRfc2Vhc29uIHx8IDA7XG4gICAgICAgIGNvbnN0IGF2YWlsYWJsZUd1ZXN0UGFzc2VzID0gKGF3YWl0IGd1ZXN0X3Bhc3NfcHJvbWlzZSk/LmF2YWlsYWJsZSB8fCAwO1xuXG5cbiAgICAgICAgc3RhdHVzU3RyaW5nICs9XG4gICAgICAgICAgICBcIiBcIiArXG4gICAgICAgICAgICBidWlsZF9wYXNzZXNfc3RyaW5nKFxuICAgICAgICAgICAgICAgIHVzZWRTZWFzb25HdWVzdFBhc3NlcyxcbiAgICAgICAgICAgICAgICB1c2VkU2Vhc29uR3Vlc3RQYXNzZXMgKyBhdmFpbGFibGVHdWVzdFBhc3NlcyxcbiAgICAgICAgICAgICAgICB1c2VkVG9kYXlHdWVzdFBhc3Nlc1xuICAgICAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIHN0YXR1c1N0cmluZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyB0aGUgY2hlY2staW4gcHJvY2VzcyBmb3IgdGhlIHBhdHJvbGxlciBvbmNlIHRoZSBjaGVjay1pbiBtb2RlIGlzIHNldC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgY2hlY2staW4gcmVzcG9uc2UuXG4gICAgICogQHRocm93cyB7RXJyb3J9IFRocm93cyBhbiBlcnJvciBpZiB0aGUgY2hlY2staW4gbW9kZSBpcyBpbXByb3Blcmx5IHNldC5cbiAgICAgKi9cbiAgICBhc3luYyBjaGVja2luKCk6IFByb21pc2U8QlZOU1BSZXNwb25zZT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgIGBQZXJmb3JtaW5nIHJlZ3VsYXIgY2hlY2tpbiBmb3IgJHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICAgICAgfSB3aXRoIG1vZGU6ICR7dGhpcy5jaGVja2luX21vZGV9YFxuICAgICAgICApO1xuICAgICAgICBpZiAoYXdhaXQgdGhpcy5zaGVldF9uZWVkc19yZXNldCgpKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOlxuICAgICAgICAgICAgICAgICAgICBgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyIS5uYW1lXG4gICAgICAgICAgICAgICAgICAgIH0sIHlvdSBhcmUgdGhlIGZpcnN0IHBlcnNvbiB0byBjaGVjayBpbiB0b2RheS4gYCArXG4gICAgICAgICAgICAgICAgICAgIGBJIG5lZWQgdG8gYXJjaGl2ZSBhbmQgcmVzZXQgdGhlIHNoZWV0IGJlZm9yZSBjb250aW51aW5nLiBgICtcbiAgICAgICAgICAgICAgICAgICAgYFdvdWxkIHlvdSBsaWtlIG1lIHRvIGRvIHRoYXQ/IChZZXMvTm8pYCxcbiAgICAgICAgICAgICAgICBuZXh0X3N0ZXA6IGAke05FWFRfU1RFUFMuQ09ORklSTV9SRVNFVH0tJHt0aGlzLmNoZWNraW5fbW9kZX1gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY2hlY2tpbl9tb2RlO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICAhdGhpcy5jaGVja2luX21vZGUgfHxcbiAgICAgICAgICAgIChjaGVja2luX21vZGUgPSB0aGlzLmNoZWNraW5fdmFsdWVzLmJ5X2tleVt0aGlzLmNoZWNraW5fbW9kZV0pID09PVxuICAgICAgICAgICAgICAgIHVuZGVmaW5lZFxuICAgICAgICApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNoZWNraW4gbW9kZSBpbXByb3Blcmx5IHNldFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKTtcbiAgICAgICAgY29uc3QgbmV3X2NoZWNraW5fdmFsdWUgPSBjaGVja2luX21vZGUuc2hlZXRzX3ZhbHVlO1xuICAgICAgICBhd2FpdCBsb2dpbl9zaGVldC5jaGVja2luKHRoaXMucGF0cm9sbGVyISwgbmV3X2NoZWNraW5fdmFsdWUpO1xuICAgICAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oYHVwZGF0ZS1zdGF0dXMoJHtuZXdfY2hlY2tpbl92YWx1ZX0pYCk7XG4gICAgICAgIGF3YWl0IHRoaXMubG9naW5fc2hlZXQ/LnJlZnJlc2goKTtcbiAgICAgICAgYXdhaXQgdGhpcy5nZXRfbWFwcGVkX3BhdHJvbGxlcih0cnVlKTtcblxuICAgICAgICBsZXQgcmVzcG9uc2UgPSBgVXBkYXRpbmcgJHtcbiAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyIS5uYW1lXG4gICAgICAgIH0gd2l0aCBzdGF0dXM6ICR7bmV3X2NoZWNraW5fdmFsdWV9LmA7XG4gICAgICAgIGlmICghdGhpcy5mYXN0X2NoZWNraW4pIHtcbiAgICAgICAgICAgIHJlc3BvbnNlICs9IGAgWW91IGNhbiBzZW5kICcke2NoZWNraW5fbW9kZS5mYXN0X2NoZWNraW5zWzBdfScgYXMgeW91ciBmaXJzdCBtZXNzYWdlIGZvciBhIGZhc3QgJHtjaGVja2luX21vZGUuc2hlZXRzX3ZhbHVlfSBjaGVja2luIG5leHQgdGltZS5gO1xuICAgICAgICB9XG4gICAgICAgIHJlc3BvbnNlICs9IFwiXFxuXFxuXCIgKyAoYXdhaXQgdGhpcy5nZXRfc3RhdHVzX3N0cmluZygpKTtcbiAgICAgICAgcmV0dXJuIHsgcmVzcG9uc2U6IHJlc3BvbnNlIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHRoZSBHb29nbGUgU2hlZXRzIG5lZWRzIHRvIGJlIHJlc2V0LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0cnVlIGlmIHRoZSBzaGVldCBuZWVkcyB0byBiZSByZXNldCwgb3RoZXJ3aXNlIGZhbHNlLlxuICAgICAqL1xuICAgIGFzeW5jIHNoZWV0X25lZWRzX3Jlc2V0KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG5cbiAgICAgICAgY29uc3Qgc2hlZXRfZGF0ZSA9IGxvZ2luX3NoZWV0LnNoZWV0X2RhdGU7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfZGF0ZSA9IGxvZ2luX3NoZWV0LmN1cnJlbnRfZGF0ZTtcbiAgICAgICAgY29uc29sZS5sb2coYHNoZWV0X2RhdGU6ICR7c2hlZXRfZGF0ZX1gKTtcbiAgICAgICAgY29uc29sZS5sb2coYGN1cnJlbnRfZGF0ZTogJHtjdXJyZW50X2RhdGV9YCk7XG5cbiAgICAgICAgY29uc29sZS5sb2coYGRhdGVfaXNfY3VycmVudDogJHtsb2dpbl9zaGVldC5pc19jdXJyZW50fWApO1xuXG4gICAgICAgIHJldHVybiAhbG9naW5fc2hlZXQuaXNfY3VycmVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXNldHMgdGhlIEdvb2dsZSBTaGVldHMgZmxvdywgaW5jbHVkaW5nIGFyY2hpdmluZyBhbmQgcmVzZXR0aW5nIHRoZSBzaGVldCBpZiBuZWNlc3NhcnkuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZSB8IHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBjaGVjay1pbiByZXNwb25zZSBvciB2b2lkLlxuICAgICAqL1xuICAgIGFzeW5jIHJlc2V0X3NoZWV0X2Zsb3coKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlIHwgdm9pZD4ge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuY2hlY2tfdXNlcl9jcmVkcyhcbiAgICAgICAgICAgIGAke1xuICAgICAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyIS5uYW1lXG4gICAgICAgICAgICB9LCBpbiBvcmRlciB0byByZXNldC9hcmNoaXZlLCBJIG5lZWQgeW91IHRvIGF1dGhvcml6ZSB0aGUgYXBwLmBcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHJlc3BvbnNlKVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogcmVzcG9uc2UucmVzcG9uc2UsXG4gICAgICAgICAgICAgICAgbmV4dF9zdGVwOiBgJHtORVhUX1NURVBTLkFVVEhfUkVTRVR9LSR7dGhpcy5jaGVja2luX21vZGV9YCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnJlc2V0X3NoZWV0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzZXRzIHRoZSBHb29nbGUgU2hlZXRzLCBpbmNsdWRpbmcgYXJjaGl2aW5nIGFuZCByZXNldHRpbmcgdGhlIHNoZWV0LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBzaGVldCBpcyByZXNldC5cbiAgICAgKi9cbiAgICBhc3luYyByZXNldF9zaGVldCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3Qgc2NyaXB0X3NlcnZpY2UgPSBhd2FpdCB0aGlzLmdldF91c2VyX3NjcmlwdHNfc2VydmljZSgpO1xuICAgICAgICBjb25zdCBzaG91bGRfcGVyZm9ybV9hcmNoaXZlID0gIShhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpKS5hcmNoaXZlZDtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IHNob3VsZF9wZXJmb3JtX2FyY2hpdmVcbiAgICAgICAgICAgID8gXCJPa2F5LiBBcmNoaXZpbmcgYW5kIHJlc2V0dGluZyB0aGUgY2hlY2sgaW4gc2hlZXQuIFRoaXMgdGFrZXMgYWJvdXQgMTAgc2Vjb25kcy4uLlwiXG4gICAgICAgICAgICA6IFwiT2theS4gU2hlZXQgaGFzIGFscmVhZHkgYmVlbiBhcmNoaXZlZC4gUGVyZm9ybWluZyByZXNldC4gVGhpcyB0YWtlcyBhYm91dCA1IHNlY29uZHMuLi5cIjtcbiAgICAgICAgYXdhaXQgdGhpcy5zZW5kX21lc3NhZ2UobWVzc2FnZSk7XG4gICAgICAgIGlmIChzaG91bGRfcGVyZm9ybV9hcmNoaXZlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkFyY2hpdmluZy4uLlwiKTtcblxuICAgICAgICAgICAgYXdhaXQgc2NyaXB0X3NlcnZpY2Uuc2NyaXB0cy5ydW4oe1xuICAgICAgICAgICAgICAgIHNjcmlwdElkOiB0aGlzLnJlc2V0X3NjcmlwdF9pZCxcbiAgICAgICAgICAgICAgICByZXF1ZXN0Qm9keTogeyBmdW5jdGlvbjogdGhpcy5jb25maWcuQVJDSElWRV9GVU5DVElPTl9OQU1FIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZGVsYXkoNSk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oXCJhcmNoaXZlXCIpO1xuICAgICAgICAgICAgdGhpcy5sb2dpbl9zaGVldCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZyhcIlJlc2V0dGluZy4uLlwiKTtcbiAgICAgICAgYXdhaXQgc2NyaXB0X3NlcnZpY2Uuc2NyaXB0cy5ydW4oe1xuICAgICAgICAgICAgc2NyaXB0SWQ6IHRoaXMucmVzZXRfc2NyaXB0X2lkLFxuICAgICAgICAgICAgcmVxdWVzdEJvZHk6IHsgZnVuY3Rpb246IHRoaXMuY29uZmlnLlJFU0VUX0ZVTkNUSU9OX05BTUUgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIGF3YWl0IHRoaXMuZGVsYXkoNSk7XG4gICAgICAgIGF3YWl0IHRoaXMubG9nX2FjdGlvbihcInJlc2V0XCIpO1xuICAgICAgICBhd2FpdCB0aGlzLnNlbmRfbWVzc2FnZShcIkRvbmUuXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIEdvb2dsZSBBcHBzIFNjcmlwdCBzZXJ2aWNlLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHNjcmlwdF92MS5TY3JpcHQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBHb29nbGUgQXBwcyBTY3JpcHQgc2VydmljZS5cbiAgICAgKi9cbiAgICBhc3luYyBjaGVja191c2VyX2NyZWRzKFxuICAgICAgICBwcm9tcHRfbWVzc2FnZTogc3RyaW5nID0gXCJIaSwgYmVmb3JlIHlvdSBjYW4gdXNlIEJWTlNQIGJvdCwgeW91IG11c3QgbG9naW4uXCJcbiAgICApOiBQcm9taXNlPEJWTlNQUmVzcG9uc2UgfCB1bmRlZmluZWQ+IHtcbiAgICAgICAgY29uc3QgdXNlcl9jcmVkcyA9IHRoaXMuZ2V0X3VzZXJfY3JlZHMoKTtcbiAgICAgICAgaWYgKCEoYXdhaXQgdXNlcl9jcmVkcy5sb2FkVG9rZW4oKSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGF1dGhVcmwgPSBhd2FpdCB1c2VyX2NyZWRzLmdldEF1dGhVcmwoKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGAke3Byb21wdF9tZXNzYWdlfSBQbGVhc2UgZm9sbG93IHRoaXMgbGluazpcbiR7YXV0aFVybH1cblxuTWVzc2FnZSBtZSBhZ2FpbiB3aGVuIGRvbmUuYCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBHb29nbGUgQXBwcyBTY3JpcHQgc2VydmljZS5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzY3JpcHRfdjEuU2NyaXB0Pn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgR29vZ2xlIEFwcHMgU2NyaXB0IHNlcnZpY2UuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X29uX2R1dHkoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgY29uc3QgY2hlY2tlZF9vdXRfc2VjdGlvbiA9IFwiQ2hlY2tlZCBPdXRcIjtcbiAgICAgICAgY29uc3QgbGFzdF9zZWN0aW9ucyA9IFtjaGVja2VkX291dF9zZWN0aW9uXTtcbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuXG4gICAgICAgIGNvbnN0IG9uX2R1dHlfcGF0cm9sbGVycyA9IGxvZ2luX3NoZWV0LmdldF9vbl9kdXR5X3BhdHJvbGxlcnMoKTtcbiAgICAgICAgY29uc3QgYnlfc2VjdGlvbiA9IG9uX2R1dHlfcGF0cm9sbGVyc1xuICAgICAgICAgICAgLmZpbHRlcigoeCkgPT4geC5jaGVja2luKVxuICAgICAgICAgICAgLnJlZHVjZSgocHJldjogeyBba2V5OiBzdHJpbmddOiBQYXRyb2xsZXJSb3dbXSB9LCBjdXIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzaG9ydF9jb2RlID1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja2luX3ZhbHVlcy5ieV9zaGVldF9zdHJpbmdbY3VyLmNoZWNraW5dLmtleTtcbiAgICAgICAgICAgICAgICBsZXQgc2VjdGlvbiA9IGN1ci5zZWN0aW9uO1xuICAgICAgICAgICAgICAgIGlmIChzaG9ydF9jb2RlID09IFwib3V0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VjdGlvbiA9IGNoZWNrZWRfb3V0X3NlY3Rpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghKHNlY3Rpb24gaW4gcHJldikpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldltzZWN0aW9uXSA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwcmV2W3NlY3Rpb25dLnB1c2goY3VyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJldjtcbiAgICAgICAgICAgIH0sIHt9KTtcbiAgICAgICAgbGV0IHJlc3VsdHM6IHN0cmluZ1tdW10gPSBbXTtcbiAgICAgICAgbGV0IGFsbF9rZXlzID0gT2JqZWN0LmtleXMoYnlfc2VjdGlvbik7XG4gICAgICAgIGNvbnN0IG9yZGVyZWRfcHJpbWFyeV9zZWN0aW9ucyA9IE9iamVjdC5rZXlzKGJ5X3NlY3Rpb24pXG4gICAgICAgICAgICAuZmlsdGVyKCh4KSA9PiAhbGFzdF9zZWN0aW9ucy5pbmNsdWRlcyh4KSlcbiAgICAgICAgICAgIC5zb3J0KCk7XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkX2xhc3Rfc2VjdGlvbnMgPSBsYXN0X3NlY3Rpb25zLmZpbHRlcigoeCkgPT5cbiAgICAgICAgICAgIGFsbF9rZXlzLmluY2x1ZGVzKHgpXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IG9yZGVyZWRfc2VjdGlvbnMgPSBvcmRlcmVkX3ByaW1hcnlfc2VjdGlvbnMuY29uY2F0KFxuICAgICAgICAgICAgZmlsdGVyZWRfbGFzdF9zZWN0aW9uc1xuICAgICAgICApO1xuXG4gICAgICAgIGZvciAoY29uc3Qgc2VjdGlvbiBvZiBvcmRlcmVkX3NlY3Rpb25zKSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0OiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICAgICAgY29uc3QgcGF0cm9sbGVycyA9IGJ5X3NlY3Rpb25bc2VjdGlvbl0uc29ydCgoeCwgeSkgPT5cbiAgICAgICAgICAgICAgICB4Lm5hbWUubG9jYWxlQ29tcGFyZSh5Lm5hbWUpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKHNlY3Rpb24ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goXCJTZWN0aW9uIFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGAke3NlY3Rpb259OiBgKTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIHBhdHJvbGxlcl9zdHJpbmcobmFtZTogc3RyaW5nLCBzaG9ydF9jb2RlOiBzdHJpbmcpIHtcbiAgICAgICAgICAgICAgICBsZXQgZGV0YWlscyA9IFwiXCI7XG4gICAgICAgICAgICAgICAgaWYgKHNob3J0X2NvZGUgIT09IFwiZGF5XCIgJiYgc2hvcnRfY29kZSAhPT0gXCJvdXRcIikge1xuICAgICAgICAgICAgICAgICAgICBkZXRhaWxzID0gYCAoJHtzaG9ydF9jb2RlLnRvVXBwZXJDYXNlKCl9KWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBgJHtuYW1lfSR7ZGV0YWlsc31gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0LnB1c2goXG4gICAgICAgICAgICAgICAgcGF0cm9sbGVyc1xuICAgICAgICAgICAgICAgICAgICAubWFwKCh4KSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0cm9sbGVyX3N0cmluZyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja2luX3ZhbHVlcy5ieV9zaGVldF9zdHJpbmdbeC5jaGVja2luXS5rZXlcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAuam9pbihcIiwgXCIpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKFwib24tZHV0eVwiKTtcbiAgICAgICAgcmV0dXJuIGBQYXRyb2xsZXJzIGZvciAke2xvZ2luX3NoZWV0LnNoZWV0X2RhdGUudG9EYXRlU3RyaW5nKCl9IChUb3RhbDogJHtcbiAgICAgICAgICAgIG9uX2R1dHlfcGF0cm9sbGVycy5sZW5ndGhcbiAgICAgICAgfSk6XFxuJHtyZXN1bHRzLm1hcCgocikgPT4gci5qb2luKFwiXCIpKS5qb2luKFwiXFxuXCIpfWA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9ncyBhbiBhY3Rpb24gdG8gdGhlIEdvb2dsZSBTaGVldHMuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGFjdGlvbl9uYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGFjdGlvbiB0byBsb2cuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGFjdGlvbiBpcyBsb2dnZWQuXG4gICAgICovXG4gICAgYXN5bmMgbG9nX2FjdGlvbihhY3Rpb25fbmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHNoZWV0c19zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfc2hlZXRzX3NlcnZpY2UoKTtcbiAgICAgICAgYXdhaXQgc2hlZXRzX3NlcnZpY2Uuc3ByZWFkc2hlZXRzLnZhbHVlcy5hcHBlbmQoe1xuICAgICAgICAgICAgc3ByZWFkc2hlZXRJZDogdGhpcy5jb21iaW5lZF9jb25maWcuU0hFRVRfSUQsXG4gICAgICAgICAgICByYW5nZTogdGhpcy5jb25maWcuQUNUSU9OX0xPR19TSEVFVCxcbiAgICAgICAgICAgIHZhbHVlSW5wdXRPcHRpb246IFwiVVNFUl9FTlRFUkVEXCIsXG4gICAgICAgICAgICByZXF1ZXN0Qm9keToge1xuICAgICAgICAgICAgICAgIHZhbHVlczogW1t0aGlzLnBhdHJvbGxlciEubmFtZSwgbmV3IERhdGUoKSwgYWN0aW9uX25hbWVdXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvZ3Mgb3V0IHRoZSB1c2VyLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBsb2dvdXQgcmVzcG9uc2UuXG4gICAgICovXG4gICAgYXN5bmMgbG9nb3V0KCk6IFByb21pc2U8QlZOU1BSZXNwb25zZT4ge1xuICAgICAgICBjb25zdCB1c2VyX2NyZWRzID0gdGhpcy5nZXRfdXNlcl9jcmVkcygpO1xuICAgICAgICBhd2FpdCB1c2VyX2NyZWRzLmRlbGV0ZVRva2VuKCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZTogXCJPa2F5LCBJIGhhdmUgcmVtb3ZlZCBhbGwgbG9naW4gc2Vzc2lvbiBpbmZvcm1hdGlvbi5cIixcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBUd2lsaW8gY2xpZW50LlxuICAgICAqIEByZXR1cm5zIHtUd2lsaW9DbGllbnR9IFRoZSBUd2lsaW8gY2xpZW50LlxuICAgICAqL1xuICAgIGdldF90d2lsaW9fY2xpZW50KCkge1xuICAgICAgICBpZiAodGhpcy50d2lsaW9fY2xpZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInR3aWxpb19jbGllbnQgd2FzIG5ldmVyIGluaXRpYWxpemVkIVwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy50d2lsaW9fY2xpZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIFR3aWxpbyBTeW5jIGNsaWVudC5cbiAgICAgKiBAcmV0dXJucyB7U2VydmljZUNvbnRleHR9IFRoZSBUd2lsaW8gU3luYyBjbGllbnQuXG4gICAgICovXG4gICAgZ2V0X3N5bmNfY2xpZW50KCkge1xuICAgICAgICBpZiAoIXRoaXMuc3luY19jbGllbnQpIHtcbiAgICAgICAgICAgIHRoaXMuc3luY19jbGllbnQgPSB0aGlzLmdldF90d2lsaW9fY2xpZW50KCkuc3luYy52MS5zZXJ2aWNlcyhcbiAgICAgICAgICAgICAgICB0aGlzLnN5bmNfc2lkXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnN5bmNfY2xpZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHVzZXIgY3JlZGVudGlhbHMuXG4gICAgICogQHJldHVybnMge1VzZXJDcmVkc30gVGhlIHVzZXIgY3JlZGVudGlhbHMuXG4gICAgICovXG4gICAgZ2V0X3VzZXJfY3JlZHMoKSB7XG4gICAgICAgIGlmICghdGhpcy51c2VyX2NyZWRzKSB7XG4gICAgICAgICAgICB0aGlzLnVzZXJfY3JlZHMgPSBuZXcgVXNlckNyZWRzKFxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0X3N5bmNfY2xpZW50KCksXG4gICAgICAgICAgICAgICAgdGhpcy5mcm9tLFxuICAgICAgICAgICAgICAgIHRoaXMuY29tYmluZWRfY29uZmlnXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJfY3JlZHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgc2VydmljZSBjcmVkZW50aWFscy5cbiAgICAgKiBAcmV0dXJucyB7R29vZ2xlQXV0aH0gVGhlIHNlcnZpY2UgY3JlZGVudGlhbHMuXG4gICAgICovXG4gICAgZ2V0X3NlcnZpY2VfY3JlZHMoKSB7XG4gICAgICAgIGlmICghdGhpcy5zZXJ2aWNlX2NyZWRzKSB7XG4gICAgICAgICAgICB0aGlzLnNlcnZpY2VfY3JlZHMgPSBuZXcgZ29vZ2xlLmF1dGguR29vZ2xlQXV0aCh7XG4gICAgICAgICAgICAgICAga2V5RmlsZTogZ2V0X3NlcnZpY2VfY3JlZGVudGlhbHNfcGF0aCgpLFxuICAgICAgICAgICAgICAgIHNjb3BlczogdGhpcy5TQ09QRVMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlX2NyZWRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHZhbGlkIGNyZWRlbnRpYWxzLlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW3JlcXVpcmVfdXNlcl9jcmVkcz1mYWxzZV0gLSBXaGV0aGVyIHVzZXIgY3JlZGVudGlhbHMgYXJlIHJlcXVpcmVkLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEdvb2dsZUF1dGg+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSB2YWxpZCBjcmVkZW50aWFscy5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfdmFsaWRfY3JlZHMocmVxdWlyZV91c2VyX2NyZWRzOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLlVTRV9TRVJWSUNFX0FDQ09VTlQgJiYgIXJlcXVpcmVfdXNlcl9jcmVkcykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X3NlcnZpY2VfY3JlZHMoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1c2VyX2NyZWRzID0gdGhpcy5nZXRfdXNlcl9jcmVkcygpO1xuICAgICAgICBpZiAoIShhd2FpdCB1c2VyX2NyZWRzLmxvYWRUb2tlbigpKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVXNlciBpcyBub3QgYXV0aGVkLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhcIlVzaW5nIHVzZXIgYWNjb3VudCBmb3Igc2VydmljZSBhdXRoLi4uXCIpO1xuICAgICAgICByZXR1cm4gdXNlcl9jcmVkcy5vYXV0aDJfY2xpZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIEdvb2dsZSBTaGVldHMgc2VydmljZS5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzaGVldHNfdjQuU2hlZXRzPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgR29vZ2xlIFNoZWV0cyBzZXJ2aWNlLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF9zaGVldHNfc2VydmljZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNoZWV0c19zZXJ2aWNlKSB7XG4gICAgICAgICAgICB0aGlzLnNoZWV0c19zZXJ2aWNlID0gZ29vZ2xlLnNoZWV0cyh7XG4gICAgICAgICAgICAgICAgdmVyc2lvbjogXCJ2NFwiLFxuICAgICAgICAgICAgICAgIGF1dGg6IGF3YWl0IHRoaXMuZ2V0X3ZhbGlkX2NyZWRzKCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zaGVldHNfc2VydmljZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBsb2dpbiBzaGVldC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxMb2dpblNoZWV0Pn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgbG9naW4gc2hlZXRcbiAgICAgKi9cbiAgICBhc3luYyBnZXRfbG9naW5fc2hlZXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5sb2dpbl9zaGVldCkge1xuICAgICAgICAgICAgY29uc3QgbG9naW5fc2hlZXRfY29uZmlnOiBMb2dpblNoZWV0Q29uZmlnID0gdGhpcy5jb21iaW5lZF9jb25maWc7XG4gICAgICAgICAgICBjb25zdCBzaGVldHNfc2VydmljZSA9IGF3YWl0IHRoaXMuZ2V0X3NoZWV0c19zZXJ2aWNlKCk7XG4gICAgICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IG5ldyBMb2dpblNoZWV0KFxuICAgICAgICAgICAgICAgIHNoZWV0c19zZXJ2aWNlLFxuICAgICAgICAgICAgICAgIGxvZ2luX3NoZWV0X2NvbmZpZ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGF3YWl0IGxvZ2luX3NoZWV0LnJlZnJlc2goKTtcbiAgICAgICAgICAgIHRoaXMubG9naW5fc2hlZXQgPSBsb2dpbl9zaGVldDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5sb2dpbl9zaGVldDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBzZWFzb24gc2hlZXQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8U2Vhc29uU2hlZXQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBzZWFzb24gc2hlZXRcbiAgICAgKi9cbiAgICBhc3luYyBnZXRfc2Vhc29uX3NoZWV0KCkge1xuICAgICAgICBpZiAoIXRoaXMuc2Vhc29uX3NoZWV0KSB7XG4gICAgICAgICAgICBjb25zdCBzZWFzb25fc2hlZXRfY29uZmlnOiBTZWFzb25TaGVldENvbmZpZyA9IHRoaXMuY29tYmluZWRfY29uZmlnO1xuICAgICAgICAgICAgY29uc3Qgc2hlZXRzX3NlcnZpY2UgPSBhd2FpdCB0aGlzLmdldF9zaGVldHNfc2VydmljZSgpO1xuICAgICAgICAgICAgdGhpcy5zZWFzb25fc2hlZXQgPSBuZXcgU2Vhc29uU2hlZXQoXG4gICAgICAgICAgICAgICAgc2hlZXRzX3NlcnZpY2UsXG4gICAgICAgICAgICAgICAgc2Vhc29uX3NoZWV0X2NvbmZpZ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zZWFzb25fc2hlZXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgZ3Vlc3QgcGFzcyBzaGVldC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxHdWVzdFBhc3NTaGVldD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGd1ZXN0IHBhc3Mgc2hlZXRcbiAgICAgKi9cbiAgICBhc3luYyBnZXRfZ3Vlc3RfcGFzc19zaGVldCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmd1ZXN0X3Bhc3Nfc2hlZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpZzogR3Vlc3RQYXNzZXNDb25maWcgPSB0aGlzLmNvbWJpbmVkX2NvbmZpZztcbiAgICAgICAgICAgIGNvbnN0IHNoZWV0c19zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfc2hlZXRzX3NlcnZpY2UoKTtcbiAgICAgICAgICAgIHRoaXMuZ3Vlc3RfcGFzc19zaGVldCA9IG5ldyBHdWVzdFBhc3NTaGVldChzaGVldHNfc2VydmljZSwgY29uZmlnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5ndWVzdF9wYXNzX3NoZWV0O1xuICAgIH1cblxuICAgIC8qKiBnZXQgdGhlIHNsZWNfYmVhY29uX2NoZWNrX3NoZWV0LlxuICAgICAqIEByZXR1cm5zIChQcm9taXNlPFNsZWRCZWFjb25DaGVja1NoZWV0PilcbiAgICAgKi9cbiAgICBhc3luYyBnZXRfc2xlZF9iZWFjb25fY2hlY2tfc2hlZXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5zbGVkX2JlYWNvbl9jaGVja19zaGVldCkge1xuICAgICAgICAgICAgY29uc3QgY29uZmlnOiBTbGVkQmVhY29uQ29uZmlnID0gIHRoaXMuY29tYmluZWRfY29uZmlnO1xuICAgICAgICAgICAgY29uc3Qgc2hlZXRzX3NlcnZpY2UgPSBhd2FpdCB0aGlzLmdldF9zaGVldHNfc2VydmljZSgpO1xuICAgICAgICAgICAgdGhpcy5zbGVkX2JlYWNvbl9jaGVja19zaGVldCA9IG5ldyBTbGVkQmVhY29uQ2hlY2tTaGVldChzaGVldHNfc2VydmljZSwgY29uZmlnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zbGVkX2JlYWNvbl9jaGVja19zaGVldDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBHb29nbGUgQXBwcyBTY3JpcHQgc2VydmljZS5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzY3JpcHRfdjEuU2NyaXB0Pn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgR29vZ2xlIEFwcHMgU2NyaXB0IHNlcnZpY2UuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3VzZXJfc2NyaXB0c19zZXJ2aWNlKCkge1xuICAgICAgICBpZiAoIXRoaXMudXNlcl9zY3JpcHRzX3NlcnZpY2UpIHtcbiAgICAgICAgICAgIHRoaXMudXNlcl9zY3JpcHRzX3NlcnZpY2UgPSBnb29nbGUuc2NyaXB0KHtcbiAgICAgICAgICAgICAgICB2ZXJzaW9uOiBcInYxXCIsXG4gICAgICAgICAgICAgICAgYXV0aDogYXdhaXQgdGhpcy5nZXRfdmFsaWRfY3JlZHModHJ1ZSksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy51c2VyX3NjcmlwdHNfc2VydmljZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBtYXBwZWQgcGF0cm9sbGVyLlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2ZvcmNlPWZhbHNlXSAtIFdoZXRoZXIgdG8gZm9yY2UgdGhlIHBhdHJvbGxlciB0byBiZSBmb3VuZC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlIHwgdm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHJlc3BvbnNlIG9yIHZvaWQuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X21hcHBlZF9wYXRyb2xsZXIoZm9yY2U6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBjb25zdCBwaG9uZV9sb29rdXAgPSBhd2FpdCB0aGlzLmZpbmRfcGF0cm9sbGVyX2Zyb21fbnVtYmVyKCk7XG4gICAgICAgIGlmIChwaG9uZV9sb29rdXAgPT09IHVuZGVmaW5lZCB8fCBwaG9uZV9sb29rdXAgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChmb3JjZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBmaW5kIGFzc29jaWF0ZWQgdXNlclwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBTb3JyeSwgSSBjb3VsZG4ndCBmaW5kIGFuIGFzc29jaWF0ZWQgQlZOU1AgbWVtYmVyIHdpdGggeW91ciBwaG9uZSBudW1iZXIgKCR7dGhpcy5mcm9tfSlgLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKTtcbiAgICAgICAgY29uc3QgbWFwcGVkUGF0cm9sbGVyID0gbG9naW5fc2hlZXQudHJ5X2ZpbmRfcGF0cm9sbGVyKFxuICAgICAgICAgICAgcGhvbmVfbG9va3VwLm5hbWVcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKG1hcHBlZFBhdHJvbGxlciA9PT0gXCJub3RfZm91bmRcIikge1xuICAgICAgICAgICAgaWYgKGZvcmNlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IHBhdHJvbGxlciBpbiBsb2dpbiBzaGVldFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBDb3VsZCBub3QgZmluZCBwYXRyb2xsZXIgJyR7cGhvbmVfbG9va3VwLm5hbWV9JyBpbiBsb2dpbiBzaGVldC4gUGxlYXNlIGxvb2sgYXQgdGhlIGxvZ2luIHNoZWV0IG5hbWUsIGFuZCBjb3B5IGl0IHRvIHRoZSBQaG9uZSBOdW1iZXJzIHRhYi5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1cnJlbnRfc2hlZXRfZGF0ZSA9IGxvZ2luX3NoZWV0LmN1cnJlbnRfZGF0ZTtcbiAgICAgICAgdGhpcy5wYXRyb2xsZXIgPSBtYXBwZWRQYXRyb2xsZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmluZHMgdGhlIHBhdHJvbGxlciBmcm9tIHRoZSBwaG9uZSBudW1iZXIuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8UGF0cm9sbGVyUm93Pn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcGF0cm9sbGVyLlxuICAgICAqL1xuICAgIGFzeW5jIGZpbmRfcGF0cm9sbGVyX2Zyb21fbnVtYmVyKCkge1xuICAgICAgICBjb25zdCByYXdfbnVtYmVyID0gdGhpcy5mcm9tO1xuICAgICAgICBjb25zdCBzaGVldHNfc2VydmljZSA9IGF3YWl0IHRoaXMuZ2V0X3NoZWV0c19zZXJ2aWNlKCk7XG4gICAgICAgIGNvbnN0IG9wdHM6IEZpbmRQYXRyb2xsZXJDb25maWcgPSB0aGlzLmNvbWJpbmVkX2NvbmZpZztcbiAgICAgICAgY29uc3QgbnVtYmVyID0gc2FuaXRpemVfcGhvbmVfbnVtYmVyKHJhd19udW1iZXIpO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHNoZWV0c19zZXJ2aWNlLnNwcmVhZHNoZWV0cy52YWx1ZXMuZ2V0KHtcbiAgICAgICAgICAgIHNwcmVhZHNoZWV0SWQ6IG9wdHMuU0hFRVRfSUQsXG4gICAgICAgICAgICByYW5nZTogb3B0cy5QSE9ORV9OVU1CRVJfTE9PS1VQX1NIRUVULFxuICAgICAgICAgICAgdmFsdWVSZW5kZXJPcHRpb246IFwiVU5GT1JNQVRURURfVkFMVUVcIixcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghcmVzcG9uc2UuZGF0YS52YWx1ZXMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBmaW5kIHBhdHJvbGxlci5cIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEudmFsdWVzXG4gICAgICAgICAgICAubWFwKChyb3cpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByYXdOdW1iZXIgPVxuICAgICAgICAgICAgICAgICAgICByb3dbZXhjZWxfcm93X3RvX2luZGV4KG9wdHMuUEhPTkVfTlVNQkVSX05VTUJFUl9DT0xVTU4pXTtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50TnVtYmVyID1cbiAgICAgICAgICAgICAgICAgICAgcmF3TnVtYmVyICE9IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBzYW5pdGl6ZV9waG9uZV9udW1iZXIocmF3TnVtYmVyKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiByYXdOdW1iZXI7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudE5hbWUgPVxuICAgICAgICAgICAgICAgICAgICByb3dbZXhjZWxfcm93X3RvX2luZGV4KG9wdHMuUEhPTkVfTlVNQkVSX05BTUVfQ09MVU1OKV07XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtuYW1lOiBjdXJyZW50TmFtZSwgbnVtYmVyOiBjdXJyZW50TnVtYmVyfTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZmlsdGVyKChwYXRyb2xsZXIpID0+IHBhdHJvbGxlci5udW1iZXIgPT09IG51bWJlcilbMF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvbXB0cyB0aGUgdXNlciBmb3IgYSBjb21wIG9yIG1hbmFnZXIgcGFzcy5cbiAgICAgKiBXZSBkbyBub3QgcmVxdWlyZSBhIGd1ZXN0IG5hbWUgaW4gdGhlIFNNUyBmbG93OyB0aGlzIHJldHVybnMgdGhlIHN0YXR1cy9wcm9tcHRcbiAgICAgKiBmb3IgZ3Vlc3QgcGFzc2VzIHNvIHRoZSBHdWVzdCBQYXNzIGNvbW1hbmQgYmVoYXZlcyBsaWtlIG90aGVyIGltbWVkaWF0ZSBhY3Rpb25zLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSByZXNwb25zZS5cbiAgICAgKi9cbiAgICBhc3luYyBwcm9tcHRfZ3Vlc3RfcGFzcygpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgLy8gQWxsb3cgYWxsIHBhdHJvbGxlcnMgKGluY2x1ZGluZyBjYW5kaWRhdGVzKSB0byB1c2UgZ3Vlc3QgcGFzc2VzIHdoZW4gYXZhaWxhYmxlLlxuICAgICAgICBjb25zdCBzaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2d1ZXN0X3Bhc3Nfc2hlZXQoKTtcbiAgICAgICAgY29uc3QgdXNlZF9hbmRfYXZhaWxhYmxlID0gYXdhaXQgc2hlZXQuZ2V0X2F2YWlsYWJsZV9hbmRfdXNlZF9wYXNzZXModGhpcy5wYXRyb2xsZXIhLm5hbWUpO1xuICAgICAgICBpZiAodXNlZF9hbmRfYXZhaWxhYmxlID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHJlc3BvbnNlOiBcIlByb2JsZW0gbG9va2luZyB1cCBwYXRyb2xsZXIgZm9yIGd1ZXN0IHBhc3Nlc1wiIH07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiB0aGVyZSBhcmUgbm8gYXZhaWxhYmxlIHBhc3NlcyB0b2RheSwgcmV0dXJuIHRoZSBwcm9tcHQgaW5kaWNhdGluZyBub25lIGFyZSBhdmFpbGFibGUuXG4gICAgICAgIGlmICh1c2VkX2FuZF9hdmFpbGFibGUuYXZhaWxhYmxlIDwgMSkge1xuICAgICAgICAgICAgcmV0dXJuIHVzZWRfYW5kX2F2YWlsYWJsZS5nZXRfcHJvbXB0KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDb25zdW1lIG9uZSBhdmFpbGFibGUgcGFzcyAodGhlIHNoZWV0IHJlY29yZHMgb25seSB0aGUgZGF0ZSBvZiB1c2UpLlxuICAgICAgICBhd2FpdCBzaGVldC5zZXRfdXNlZF9ndWVzdF9wYXNzZXModXNlZF9hbmRfYXZhaWxhYmxlKTtcblxuICAgICAgICAvLyBSZS1yZWFkIHRoZSB2YWx1ZXMgYW5kIHJldHVybiBjb25maXJtYXRpb24gKyB1cGRhdGVkIHN0YXR1cy5cbiAgICAgICAgY29uc3QgdXBkYXRlZCA9IGF3YWl0IHNoZWV0LmdldF9hdmFpbGFibGVfYW5kX3VzZWRfcGFzc2VzKHRoaXMucGF0cm9sbGVyIS5uYW1lKTtcbiAgICAgICAgaWYgKHVwZGF0ZWQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgcmVzcG9uc2U6IGBVcGRhdGVkICR7dGhpcy5wYXRyb2xsZXIhLm5hbWV9IHRvIHVzZSBhIGd1ZXN0IHBhc3MgdG9kYXkuYCB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc3RhdHVzID0gYnVpbGRfcGFzc2VzX3N0cmluZyhcbiAgICAgICAgICAgIHVwZGF0ZWQudXNlZF9zZWFzb24sXG4gICAgICAgICAgICB1cGRhdGVkLnVzZWRfc2Vhc29uICsgdXBkYXRlZC5hdmFpbGFibGUsXG4gICAgICAgICAgICB1cGRhdGVkLnVzZWRfdG9kYXlcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3BvbnNlOiBgVXBkYXRlZCAke3RoaXMucGF0cm9sbGVyIS5uYW1lfSB0byB1c2UgYSBndWVzdCBwYXNzIHRvZGF5LlxcbiR7c3RhdHVzfWAsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvbXB0IHRoZSB1c2VyIGZvciB0aGUgbG9jYXRpb24gb2YgdGhlaXIgY29tcGxldGVkIGJlYWNvbiBzZWFyY2hcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcmVzcG9uc2UuXG4gICAgICovXG4gICAgYXN5bmMgcHJvbXB0X2JlYWNvbl9zZWFyY2goKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlPiB7XG4gICAgICAgIGlmICghdGhpcy5wYXRyb2xsZXIgfHwgIXRoaXMucGF0cm9sbGVyLmNoZWNraW4pIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGAke3RoaXMucGF0cm9sbGVyIS5uYW1lfSBpcyBub3QgY2hlY2tlZCBpbi5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6ICBcIk9uIHdoaWNoIHJ1biBkaWQgeW91IGNvbXBsZXRlIGEgYmVhY29uIHNlYXJjaCB0b2RheSAob3IgJ3Jlc3RhcnQnIHRvIGNhbmNlbCk/XCIsXG4gICAgICAgICAgICBuZXh0X3N0ZXA6IE5FWFRfU1RFUFMuQVdBSVRfQkVBQ09OXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2UgbG9jYXRpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYm9keSAtIHRoZSBib2R5IG9mIHRoZSByZXF1ZXN0XG4gICAgICogQHJldHVybnMge1Byb21pc2U8c3RyaW5nIHwgbnVsbD59IFRoZSBzZWFyY2ggbG9jYXRpb24gaWYgdGhlIGxvY2F0aW9uIGlzIHZhbGlkXG4gICAgICovXG4gICAgYXN5bmMgcGFyc2VfYmVhY29uX3NlYXJjaF9sb2NhdGlvbihib2R5OiBzdHJpbmcgfCBudWxsKTogUHJvbWlzZTxzdHJpbmcgfCBudWxsPiB7XG4gICAgICAgIGNvbnN0IHNoZWV0ID0gYXdhaXQgdGhpcy5nZXRfc2xlZF9iZWFjb25fY2hlY2tfc2hlZXQoKTtcbiAgICAgICAgcmV0dXJuIHNoZWV0LnBhcnNlX2xvY2F0aW9uKGJvZHkpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IHNoZWV0c192NCB9IGZyb20gXCJnb29nbGVhcGlzXCI7XG5pbXBvcnQgeyBHdWVzdFBhc3Nlc0NvbmZpZyB9IGZyb20gXCIuLi9lbnYvaGFuZGxlcl9jb25maWdcIjtcbmltcG9ydCB7IGV4Y2VsX3Jvd190b19pbmRleCwgcm93X2NvbF90b19leGNlbF9pbmRleCwgcGFyc2VfYm9vbGVhbl9jZWxsIH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxcIjtcbmltcG9ydCBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYiBmcm9tIFwiLi4vdXRpbHMvZ29vZ2xlX3NoZWV0c19zcHJlYWRzaGVldF90YWJcIjtcbmltcG9ydCB7IGZvcm1hdF9kYXRlX2Zvcl9zcHJlYWRzaGVldF92YWx1ZSB9IGZyb20gXCIuLi91dGlscy9kYXRldGltZV91dGlsXCI7XG5pbXBvcnQgeyBidWlsZF9wYXNzZXNfc3RyaW5nIH0gZnJvbSBcIi4uL3V0aWxzL2d1ZXN0X3Bhc3Nlc1wiO1xuaW1wb3J0IHsgQlZOU1BSZXNwb25zZSB9IGZyb20gXCIuLi9oYW5kbGVycy9idm5zcF9oYW5kbGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBVc2VkQW5kQXZhaWxhYmxlUGFzc2VzIHtcbiAgICByb3c6IGFueVtdO1xuICAgIGluZGV4OiBudW1iZXI7XG4gICAgZWxpZ2libGU6IGJvb2xlYW47XG4gICAgZWxpZ2libGVfcmVhc29uOiBzdHJpbmc7XG4gICAgYXZhaWxhYmxlOiBudW1iZXI7XG4gICAgdXNlZF90b2RheTogbnVtYmVyO1xuICAgIHVzZWRfc2Vhc29uOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcm93OiBhbnlbXSxcbiAgICAgICAgaW5kZXg6IG51bWJlcixcbiAgICAgICAgZWxpZ2libGU6IGFueSxcbiAgICAgICAgZWxpZ2libGVfcmVhc29uOiBhbnksXG4gICAgICAgIGF2YWlsYWJsZTogYW55LFxuICAgICAgICB1c2VkX3RvZGF5OiBhbnksXG4gICAgICAgIHVzZWRfc2Vhc29uOiBhbnlcbiAgICApIHtcbiAgICAgICAgdGhpcy5yb3cgPSByb3c7XG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5lbGlnaWJsZSA9IHBhcnNlX2Jvb2xlYW5fY2VsbChlbGlnaWJsZSk7XG4gICAgICAgIHRoaXMuZWxpZ2libGVfcmVhc29uID0gU3RyaW5nKGVsaWdpYmxlX3JlYXNvbiA/PyBcIlwiKTtcbiAgICAgICAgdGhpcy5hdmFpbGFibGUgPSBOdW1iZXIoYXZhaWxhYmxlKTtcbiAgICAgICAgdGhpcy51c2VkX3RvZGF5ID0gTnVtYmVyKHVzZWRfdG9kYXkpO1xuICAgICAgICB0aGlzLnVzZWRfc2Vhc29uID0gTnVtYmVyKHVzZWRfc2Vhc29uKTtcbiAgICB9XG5cbiAgICBnZXRfcHJvbXB0KCk6IEJWTlNQUmVzcG9uc2Uge1xuICAgICAgICBpZiAodGhpcy5hdmFpbGFibGUgPiAwKSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGJ1aWxkX3Bhc3Nlc19zdHJpbmcoXG4gICAgICAgICAgICAgICAgdGhpcy51c2VkX3NlYXNvbixcbiAgICAgICAgICAgICAgICB0aGlzLmF2YWlsYWJsZSArIHRoaXMudXNlZF9zZWFzb24sXG4gICAgICAgICAgICAgICAgdGhpcy51c2VkX3RvZGF5LFxuICAgICAgICAgICAgICAgIHRydWVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuZWxpZ2libGUpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBZb3UgYXJlIG5vdCBlbGlnaWJsZSBmb3IgZ3Vlc3QgcGFzc2VzLiBSZWFzb246ICR7dGhpcy5lbGlnaWJsZV9yZWFzb259YCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3BvbnNlOiBcIllvdSBkbyBub3QgaGF2ZSBhbnkgZ3Vlc3QgcGFzc2VzIGF2YWlsYWJsZSB0b2RheVwiLFxuICAgICAgICB9O1xuICAgIH1cbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBhc3NTaGVldCB7XG4gICAgc2hlZXQ6IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiO1xuXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHNoZWV0OiBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYikge1xuICAgICAgICB0aGlzLnNoZWV0ID0gc2hlZXQ7XG4gICAgfVxuXG4gICAgYWJzdHJhY3QgZ2V0IGVsaWdpYmxlX2NvbHVtbigpOiBzdHJpbmc7XG4gICAgYWJzdHJhY3QgZ2V0IGVsaWdpYmxlX3JlYXNvbl9jb2x1bW4oKTogc3RyaW5nO1xuICAgIGFic3RyYWN0IGdldCBhdmFpbGFibGVfY29sdW1uKCk6IHN0cmluZztcbiAgICBhYnN0cmFjdCBnZXQgdXNlZF90b2RheV9jb2x1bW4oKTogc3RyaW5nO1xuICAgIGFic3RyYWN0IGdldCB1c2VkX3NlYXNvbl9jb2x1bW4oKTogc3RyaW5nO1xuICAgIGFic3RyYWN0IGdldCBuYW1lX2NvbHVtbigpOiBzdHJpbmc7XG4gICAgYWJzdHJhY3QgZ2V0IHN0YXJ0X2luZGV4KCk6IG51bWJlcjtcbiAgICBhYnN0cmFjdCBnZXQgc2hlZXRfbmFtZSgpOiBzdHJpbmc7XG5cbiAgICBhc3luYyBnZXRfYXZhaWxhYmxlX2FuZF91c2VkX3Bhc3NlcyhcbiAgICAgICAgcGF0cm9sbGVyX25hbWU6IHN0cmluZ1xuICAgICk6IFByb21pc2U8VXNlZEFuZEF2YWlsYWJsZVBhc3NlcyB8IG51bGw+IHtcbiAgICAgICAgY29uc3QgcGF0cm9sbGVyX3JvdyA9IGF3YWl0IHRoaXMuc2hlZXQuZ2V0X3NoZWV0X3Jvd19mb3JfcGF0cm9sbGVyKFxuICAgICAgICAgICAgcGF0cm9sbGVyX25hbWUsXG4gICAgICAgICAgICB0aGlzLm5hbWVfY29sdW1uXG4gICAgICAgICk7XG4gICAgICAgIGlmIChwYXRyb2xsZXJfcm93ID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGVsaWdpYmxlID1cbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cucm93W2V4Y2VsX3Jvd190b19pbmRleCh0aGlzLmVsaWdpYmxlX2NvbHVtbildO1xuICAgICAgICBjb25zdCBlbGlnaWJsZV9yZWFzb24gPVxuICAgICAgICAgICAgcGF0cm9sbGVyX3Jvdy5yb3dbZXhjZWxfcm93X3RvX2luZGV4KHRoaXMuZWxpZ2libGVfcmVhc29uX2NvbHVtbildO1xuICAgICAgICBjb25zdCBjdXJyZW50X2RheV9hdmFpbGFibGVfcGFzc2VzID1cbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cucm93W2V4Y2VsX3Jvd190b19pbmRleCh0aGlzLmF2YWlsYWJsZV9jb2x1bW4pXTtcbiAgICAgICAgY29uc3QgY3VycmVudF9kYXlfdXNlZF9wYXNzZXMgPVxuICAgICAgICAgICAgcGF0cm9sbGVyX3Jvdy5yb3dbZXhjZWxfcm93X3RvX2luZGV4KHRoaXMudXNlZF90b2RheV9jb2x1bW4pXTtcbiAgICAgICAgY29uc3QgY3VycmVudF9zZWFzb25fdXNlZF9wYXNzZXMgPVxuICAgICAgICAgICAgcGF0cm9sbGVyX3Jvdy5yb3dbZXhjZWxfcm93X3RvX2luZGV4KHRoaXMudXNlZF9zZWFzb25fY29sdW1uKV07XG4gICAgICAgIHJldHVybiBuZXcgVXNlZEFuZEF2YWlsYWJsZVBhc3NlcyhcbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cucm93LFxuICAgICAgICAgICAgcGF0cm9sbGVyX3Jvdy5pbmRleCxcbiAgICAgICAgICAgIGVsaWdpYmxlLFxuICAgICAgICAgICAgZWxpZ2libGVfcmVhc29uLFxuICAgICAgICAgICAgY3VycmVudF9kYXlfYXZhaWxhYmxlX3Bhc3NlcyxcbiAgICAgICAgICAgIGN1cnJlbnRfZGF5X3VzZWRfcGFzc2VzLFxuICAgICAgICAgICAgY3VycmVudF9zZWFzb25fdXNlZF9wYXNzZXNcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBhc3luYyBzZXRfdXNlZF9ndWVzdF9wYXNzZXMoXG4gICAgICAgIHBhdHJvbGxlcl9yb3c6IFVzZWRBbmRBdmFpbGFibGVQYXNzZXMsXG4gICAgKSB7XG4gICAgICAgIGlmICghcGF0cm9sbGVyX3Jvdy5lbGlnaWJsZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgIGBQYXRyb2xsZXIgaXMgbm90IGVsaWdpYmxlIGZvciBndWVzdCBwYXNzZXMuIFJlYXNvbjogJHtwYXRyb2xsZXJfcm93LmVsaWdpYmxlX3JlYXNvbn1gXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXRyb2xsZXJfcm93LmF2YWlsYWJsZSA8IDEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICBgTm90IGVub3VnaCBhdmFpbGFibGUgcGFzc2VzOiBBdmFpbGFibGU6ICR7cGF0cm9sbGVyX3Jvdy5hdmFpbGFibGV9LCBVc2VkIHRoaXMgc2Vhc29uOiAgJHtwYXRyb2xsZXJfcm93LnVzZWRfc2Vhc29ufSwgVXNlZCB0b2RheTogJHtwYXRyb2xsZXJfcm93LnVzZWRfdG9kYXl9YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJvd251bSA9IHBhdHJvbGxlcl9yb3cuaW5kZXg7XG4gICAgICAgIGNvbnN0IHN0YXJ0X2luZGV4ID0gdGhpcy5zdGFydF9pbmRleDtcbiAgICAgICAgY29uc3QgcHJpb3JfbGVuZ3RoID0gcGF0cm9sbGVyX3Jvdy5yb3cubGVuZ3RoIC0gc3RhcnRfaW5kZXg7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfZGF0ZV9zdHJpbmcgPSBmb3JtYXRfZGF0ZV9mb3Jfc3ByZWFkc2hlZXRfdmFsdWUobmV3IERhdGUoKSk7XG5cbiAgICAgICAgY29uc3QgbmV3X3ZhbHMgPSBwYXRyb2xsZXJfcm93LnJvd1xuICAgICAgICAgICAgLnNsaWNlKHN0YXJ0X2luZGV4KVxuICAgICAgICAgICAgLm1hcCgoeCkgPT4geD8udG9TdHJpbmcoKSk7XG5cbiAgICAgICAgLy8gUmVjb3JkIG9ubHkgdGhlIGRhdGUgb2YgdGhlIHVzZTsgbm8gZ3Vlc3QgbmFtZSBpcyBzdG9yZWQuXG4gICAgICAgIG5ld192YWxzLnB1c2goY3VycmVudF9kYXRlX3N0cmluZyk7XG5cbiAgICAgICAgY29uc3QgdXBkYXRlX2xlbmd0aCA9IE1hdGgubWF4KHByaW9yX2xlbmd0aCwgbmV3X3ZhbHMubGVuZ3RoKTtcbiAgICAgICAgd2hpbGUgKG5ld192YWxzLmxlbmd0aCA8IHVwZGF0ZV9sZW5ndGgpIHtcbiAgICAgICAgICAgIG5ld192YWxzLnB1c2goXCJcIik7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBlbmRfaW5kZXggPSBzdGFydF9pbmRleCArIHVwZGF0ZV9sZW5ndGggLSAxO1xuICAgICAgICBjb25zdCByYW5nZSA9IGAke3RoaXMuc2hlZXQuc2hlZXRfbmFtZX0hJHtyb3dfY29sX3RvX2V4Y2VsX2luZGV4KFxuICAgICAgICAgICAgcm93bnVtLFxuICAgICAgICAgICAgc3RhcnRfaW5kZXhcbiAgICAgICAgKX06JHtyb3dfY29sX3RvX2V4Y2VsX2luZGV4KHJvd251bSwgZW5kX2luZGV4KX1gO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGBVcGRhdGluZyAke3JhbmdlfSB3aXRoICR7bmV3X3ZhbHMubGVuZ3RofSB2YWx1ZXNgKTtcbiAgICAgICAgYXdhaXQgdGhpcy5zaGVldC51cGRhdGVfdmFsdWVzKHJhbmdlLCBbbmV3X3ZhbHNdKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBHdWVzdFBhc3NTaGVldCBleHRlbmRzIFBhc3NTaGVldCB7XG4gICAgY29uZmlnOiBHdWVzdFBhc3Nlc0NvbmZpZztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyB8IG51bGwsXG4gICAgICAgIGNvbmZpZzogR3Vlc3RQYXNzZXNDb25maWdcbiAgICApIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBuZXcgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIoXG4gICAgICAgICAgICAgICAgc2hlZXRzX3NlcnZpY2UsXG4gICAgICAgICAgICAgICAgY29uZmlnLlNIRUVUX0lELFxuICAgICAgICAgICAgICAgIGNvbmZpZy5HVUVTVF9QQVNTX1NIRUVUXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgIH1cblxuICAgIGdldCBzdGFydF9pbmRleCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gZXhjZWxfcm93X3RvX2luZGV4KFxuICAgICAgICAgICAgdGhpcy5jb25maWcuR1VFU1RfUEFTU19TSEVFVF9EQVRFU19TVEFSVElOR19DT0xVTU5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXQgc2hlZXRfbmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuR1VFU1RfUEFTU19TSEVFVDtcbiAgICB9XG5cbiAgICBnZXQgZWxpZ2libGVfY29sdW1uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5HVUVTVF9QQVNTX0VMSUdJQkxFX0NPTFVNTjtcbiAgICB9XG5cbiAgICBnZXQgZWxpZ2libGVfcmVhc29uX2NvbHVtbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuR1VFU1RfUEFTU19FTElHSUJMRV9SRUFTT05fQ09MVU1OO1xuICAgIH1cblxuICAgIGdldCBhdmFpbGFibGVfY29sdW1uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5HVUVTVF9QQVNTX1NIRUVUX0FWQUlMQUJMRV9DT0xVTU47XG4gICAgfVxuXG4gICAgZ2V0IHVzZWRfdG9kYXlfY29sdW1uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5HVUVTVF9QQVNTX1NIRUVUX1VTRURfVE9EQVlfQ09MVU1OO1xuICAgIH1cblxuICAgIGdldCB1c2VkX3NlYXNvbl9jb2x1bW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLkdVRVNUX1BBU1NfU0hFRVRfVVNFRF9TRUFTT05fQ09MVU1OO1xuICAgIH1cblxuICAgIGdldCBuYW1lX2NvbHVtbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuR1VFU1RfUEFTU19TSEVFVF9OQU1FX0NPTFVNTjtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBsb29rdXBfcm93X2NvbF9pbl9zaGVldCwgZXhjZWxfcm93X3RvX2luZGV4IH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxcIjtcbmltcG9ydCBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYiBmcm9tIFwiLi4vdXRpbHMvZ29vZ2xlX3NoZWV0c19zcHJlYWRzaGVldF90YWJcIjtcbmltcG9ydCB7IHNhbml0aXplX2RhdGUgfSBmcm9tIFwiLi4vdXRpbHMvZGF0ZXRpbWVfdXRpbFwiO1xuaW1wb3J0IHsgTG9naW5TaGVldENvbmZpZywgUGF0cm9sbGVyUm93Q29uZmlnIH0gZnJvbSBcIi4uL2Vudi9oYW5kbGVyX2NvbmZpZ1wiO1xuaW1wb3J0IHsgc2hlZXRzX3Y0IH0gZnJvbSBcImdvb2dsZWFwaXNcIjtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcm93IG9mIHBhdHJvbGxlciBkYXRhLlxuICogQHR5cGVkZWYge09iamVjdH0gUGF0cm9sbGVyUm93XG4gKiBAcHJvcGVydHkge251bWJlcn0gaW5kZXggLSBUaGUgaW5kZXggb2YgdGhlIHJvdy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHBhdHJvbGxlci5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBjYXRlZ29yeSAtIFRoZSBjYXRlZ29yeSBvZiB0aGUgcGF0cm9sbGVyLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IHNlY3Rpb24gLSBUaGUgc2VjdGlvbiBvZiB0aGUgcGF0cm9sbGVyLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IGNoZWNraW4gLSBUaGUgY2hlY2staW4gc3RhdHVzIG9mIHRoZSBwYXRyb2xsZXIuXG4gKi9cbmV4cG9ydCB0eXBlIFBhdHJvbGxlclJvdyA9IHtcbiAgICBpbmRleDogbnVtYmVyO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBjYXRlZ29yeTogc3RyaW5nO1xuICAgIHNlY3Rpb246IHN0cmluZztcbiAgICBjaGVja2luOiBzdHJpbmc7XG59O1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhIGxvZ2luIHNoZWV0IGluIEdvb2dsZSBTaGVldHMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ2luU2hlZXQge1xuICAgIGxvZ2luX3NoZWV0OiBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYjtcbiAgICBjaGVja2luX2NvdW50X3NoZWV0OiBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYjtcbiAgICBjb25maWc6IExvZ2luU2hlZXRDb25maWc7XG4gICAgcm93cz86IGFueVtdW10gfCBudWxsID0gbnVsbDtcbiAgICBjaGVja2luX2NvdW50OiBudW1iZXIgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gICAgcGF0cm9sbGVyczogUGF0cm9sbGVyUm93W10gPSBbXTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgTG9naW5TaGVldC5cbiAgICAgKiBAcGFyYW0ge3NoZWV0c192NC5TaGVldHMgfCBudWxsfSBzaGVldHNfc2VydmljZSAtIFRoZSBHb29nbGUgU2hlZXRzIEFQSSBzZXJ2aWNlLlxuICAgICAqIEBwYXJhbSB7TG9naW5TaGVldENvbmZpZ30gY29uZmlnIC0gVGhlIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBsb2dpbiBzaGVldC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgc2hlZXRzX3NlcnZpY2U6IHNoZWV0c192NC5TaGVldHMgfCBudWxsLFxuICAgICAgICBjb25maWc6IExvZ2luU2hlZXRDb25maWdcbiAgICApIHtcbiAgICAgICAgdGhpcy5sb2dpbl9zaGVldCA9IG5ldyBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYihcbiAgICAgICAgICAgIHNoZWV0c19zZXJ2aWNlLFxuICAgICAgICAgICAgY29uZmlnLlNIRUVUX0lELFxuICAgICAgICAgICAgY29uZmlnLkxPR0lOX1NIRUVUX0xPT0tVUFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmNoZWNraW5fY291bnRfc2hlZXQgPSBuZXcgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIoXG4gICAgICAgICAgICBzaGVldHNfc2VydmljZSxcbiAgICAgICAgICAgIGNvbmZpZy5TSEVFVF9JRCxcbiAgICAgICAgICAgIGNvbmZpZy5DSEVDS0lOX0NPVU5UX0xPT0tVUFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWZyZXNoZXMgdGhlIGRhdGEgZnJvbSB0aGUgR29vZ2xlIFNoZWV0cy5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICAgKi9cbiAgICBhc3luYyByZWZyZXNoKCkge1xuICAgICAgICB0aGlzLnJvd3MgPSBhd2FpdCB0aGlzLmxvZ2luX3NoZWV0LmdldF92YWx1ZXMoXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5MT0dJTl9TSEVFVF9MT09LVVBcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jaGVja2luX2NvdW50ID0gKGF3YWl0IHRoaXMuY2hlY2tpbl9jb3VudF9zaGVldC5nZXRfdmFsdWVzKFxuICAgICAgICAgICAgdGhpcy5jb25maWcuQ0hFQ0tJTl9DT1VOVF9MT09LVVBcbiAgICAgICAgKSkhWzBdWzBdO1xuICAgICAgICB0aGlzLnBhdHJvbGxlcnMgPSB0aGlzLnJvd3MhLm1hcCgoeCwgaSkgPT5cbiAgICAgICAgICAgIHRoaXMucGFyc2VfcGF0cm9sbGVyX3JvdyhpLCB4LCB0aGlzLmNvbmZpZylcbiAgICAgICAgKS5maWx0ZXIoKHgpID0+IHggIT0gbnVsbCkgYXMgUGF0cm9sbGVyUm93W107XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJSZWZyZXNoaW5nIFBhdHJvbGxlcnM6IFwiICk7XG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5wYXRyb2xsZXJzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBhcmNoaXZlZCBzdGF0dXMgb2YgdGhlIGxvZ2luIHNoZWV0LlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzaGVldCBpcyBhcmNoaXZlZCwgb3RoZXJ3aXNlIGZhbHNlLlxuICAgICAqL1xuICAgIGdldCBhcmNoaXZlZCgpIHtcbiAgICAgICAgY29uc3QgYXJjaGl2ZWQgPSBsb29rdXBfcm93X2NvbF9pbl9zaGVldChcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLkFSQ0hJVkVEX0NFTEwsXG4gICAgICAgICAgICB0aGlzLnJvd3MhXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAoYXJjaGl2ZWQgPT09IHVuZGVmaW5lZCAmJiB0aGlzLmNoZWNraW5fY291bnQgPT09IDApIHx8XG4gICAgICAgICAgICBhcmNoaXZlZC50b0xvd2VyQ2FzZSgpID09PSBcInllc1wiXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgZGF0ZSBvZiB0aGUgc2hlZXQuXG4gICAgICogQHJldHVybnMge0RhdGV9IFRoZSBkYXRlIG9mIHRoZSBzaGVldC5cbiAgICAgKi9cbiAgICBnZXQgc2hlZXRfZGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHNhbml0aXplX2RhdGUoXG4gICAgICAgICAgICBsb29rdXBfcm93X2NvbF9pbl9zaGVldCh0aGlzLmNvbmZpZy5TSEVFVF9EQVRFX0NFTEwsIHRoaXMucm93cyEpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgY3VycmVudCBkYXRlLlxuICAgICAqIEByZXR1cm5zIHtEYXRlfSBUaGUgY3VycmVudCBkYXRlLlxuICAgICAqL1xuICAgIGdldCBjdXJyZW50X2RhdGUoKSB7XG4gICAgICAgIHJldHVybiBzYW5pdGl6ZV9kYXRlKFxuICAgICAgICAgICAgbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQodGhpcy5jb25maWcuQ1VSUkVOVF9EQVRFX0NFTEwsIHRoaXMucm93cyEpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHRoZSBzaGVldCBkYXRlIGlzIHRoZSBjdXJyZW50IGRhdGUuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNoZWV0IGRhdGUgaXMgdGhlIGN1cnJlbnQgZGF0ZSwgb3RoZXJ3aXNlIGZhbHNlLlxuICAgICAqL1xuICAgIGdldCBpc19jdXJyZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zaGVldF9kYXRlLmdldFRpbWUoKSA9PT0gdGhpcy5jdXJyZW50X2RhdGUuZ2V0VGltZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWVzIHRvIGZpbmQgYSBwYXRyb2xsZXIgYnkgbmFtZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwYXRyb2xsZXIuXG4gICAgICogQHJldHVybnMge1BhdHJvbGxlclJvdyB8IFwibm90X2ZvdW5kXCJ9IFRoZSBwYXRyb2xsZXIgcm93IG9yIFwibm90X2ZvdW5kXCIuXG4gICAgICovXG4gICAgdHJ5X2ZpbmRfcGF0cm9sbGVyKG5hbWU6IHN0cmluZykge1xuICAgICAgICBjb25zdCBwYXRyb2xsZXJzID0gdGhpcy5wYXRyb2xsZXJzLmZpbHRlcigoeCkgPT4geC5uYW1lID09PSBuYW1lKTtcbiAgICAgICAgaWYgKHBhdHJvbGxlcnMubGVuZ3RoICE9PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJub3RfZm91bmRcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGF0cm9sbGVyc1swXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwYXRyb2xsZXJzIHdobyBhcmUgb24gZHV0eS5cbiAgICAgKiBAcmV0dXJucyB7UGF0cm9sbGVyUm93W119IFRoZSBsaXN0IG9mIG9uLWR1dHkgcGF0cm9sbGVycy5cbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIGxvZ2luIHNoZWV0IGlzIG5vdCBjdXJyZW50LlxuICAgICAqL1xuICAgIGdldF9vbl9kdXR5X3BhdHJvbGxlcnMoKTogUGF0cm9sbGVyUm93W10ge1xuICAgICAgICBpZiAoIXRoaXMuaXNfY3VycmVudCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTG9naW4gc2hlZXQgaXMgbm90IGN1cnJlbnRcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucGF0cm9sbGVycy5maWx0ZXIoKHgpID0+IHguY2hlY2tpbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGluIGEgcGF0cm9sbGVyIHdpdGggYSBuZXcgY2hlY2staW4gdmFsdWUuXG4gICAgICogQHBhcmFtIHtQYXRyb2xsZXJSb3d9IHBhdHJvbGxlcl9zdGF0dXMgLSBUaGUgc3RhdHVzIG9mIHRoZSBwYXRyb2xsZXIuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5ld19jaGVja2luX3ZhbHVlIC0gVGhlIG5ldyBjaGVjay1pbiB2YWx1ZS5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIGxvZ2luIHNoZWV0IGlzIG5vdCBjdXJyZW50LlxuICAgICAqL1xuICAgIGFzeW5jIGNoZWNraW4ocGF0cm9sbGVyX3N0YXR1czogUGF0cm9sbGVyUm93LCBuZXdfY2hlY2tpbl92YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICghdGhpcy5pc19jdXJyZW50KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJMb2dpbiBzaGVldCBpcyBub3QgY3VycmVudFwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhgRXhpc3Rpbmcgc3RhdHVzOiAke0pTT04uc3RyaW5naWZ5KHBhdHJvbGxlcl9zdGF0dXMpfWApO1xuXG4gICAgICAgIGNvbnN0IHJvdyA9IHBhdHJvbGxlcl9zdGF0dXMuaW5kZXggKyAxOyAvLyBwcm9ncmFtbWluZyAtPiBleGNlbCBsb29rdXBcbiAgICAgICAgY29uc3QgcmFuZ2UgPSBgJHt0aGlzLmNvbmZpZy5DSEVDS0lOX0RST1BET1dOX0NPTFVNTn0ke3Jvd31gO1xuXG4gICAgICAgIGF3YWl0IHRoaXMubG9naW5fc2hlZXQudXBkYXRlX3ZhbHVlcyhyYW5nZSwgW1tuZXdfY2hlY2tpbl92YWx1ZV1dKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBc3NpZ25zIGEgc2VjdGlvbiB0byBhIHBhdHJvbGxlci5cbiAgICAgKiBAcGFyYW0gcGF0cm9sbGVyX3NlY3Rpb24gVGhlIHJvdyBmb3IgdGhlIHBhdHJvbGxlciB0aGF0IG5lZWRzIHRvIGhhdmUgYSBzZWN0aW9uIGFzc2lnbmVkIHRvLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuZXdfc2VjdGlvbl92YWx1ZSAtIFRoZSBuZXcgc2VjdGlvbiB2YWx1ZS5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIGxvZ2luIHNoZWV0IGlzIG5vdCBjdXJyZW50LlxuICAgICAqL1xuICAgIGFzeW5jIGFzc2lnbl9zZWN0aW9uKHBhdHJvbGxlcl9zZWN0aW9uOiBQYXRyb2xsZXJSb3csIG5ld19zZWN0aW9uX3ZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzX2N1cnJlbnQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxvZ2luIHNoZWV0IGlzIG5vdCBjdXJyZW50XCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGBFeGlzdGluZyBzdGF0dXM6ICR7SlNPTi5zdHJpbmdpZnkocGF0cm9sbGVyX3NlY3Rpb24pfWApO1xuXG4gICAgICAgIGNvbnN0IHJvdyA9IHBhdHJvbGxlcl9zZWN0aW9uLmluZGV4ICsgMTsgLy8gcHJvZ3JhbW1pbmcgLT4gZXhjZWwgbG9va3VwXG4gICAgICAgIGNvbnN0IHJhbmdlID0gYCR7dGhpcy5jb25maWcuU0VDVElPTl9EUk9QRE9XTl9DT0xVTU59JHtyb3d9YDtcblxuICAgICAgICBhd2FpdCB0aGlzLmxvZ2luX3NoZWV0LnVwZGF0ZV92YWx1ZXMocmFuZ2UsIFtbbmV3X3NlY3Rpb25fdmFsdWVdXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIGEgcm93IG9mIHBhdHJvbGxlciBkYXRhLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIFRoZSBpbmRleCBvZiB0aGUgcm93LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IHJvdyAtIFRoZSByb3cgZGF0YS5cbiAgICAgKiBAcGFyYW0ge1BhdHJvbGxlclJvd0NvbmZpZ30gb3B0cyAtIFRoZSBjb25maWd1cmF0aW9uIG9wdGlvbnMgZm9yIHRoZSBwYXRyb2xsZXIgcm93LlxuICAgICAqIEByZXR1cm5zIHtQYXRyb2xsZXJSb3cgfCBudWxsfSBUaGUgcGFyc2VkIHBhdHJvbGxlciByb3cgb3IgbnVsbCBpZiBpbnZhbGlkLlxuICAgICAqL1xuICAgIHByaXZhdGUgcGFyc2VfcGF0cm9sbGVyX3JvdyhcbiAgICAgICAgaW5kZXg6IG51bWJlcixcbiAgICAgICAgcm93OiBzdHJpbmdbXSxcbiAgICAgICAgb3B0czogUGF0cm9sbGVyUm93Q29uZmlnXG4gICAgKTogUGF0cm9sbGVyUm93IHwgbnVsbCB7XG4gICAgICAgIGlmIChyb3cubGVuZ3RoIDwgNCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluZGV4IDwgMyl7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgbmFtZTogcm93W2V4Y2VsX3Jvd190b19pbmRleChvcHRzLk5BTUVfQ09MVU1OKV0sXG4gICAgICAgICAgICBjYXRlZ29yeTogcm93W2V4Y2VsX3Jvd190b19pbmRleChvcHRzLkNBVEVHT1JZX0NPTFVNTildLFxuICAgICAgICAgICAgc2VjdGlvbjogcm93W2V4Y2VsX3Jvd190b19pbmRleChvcHRzLlNFQ1RJT05fRFJPUERPV05fQ09MVU1OKV0sXG4gICAgICAgICAgICBjaGVja2luOiByb3dbZXhjZWxfcm93X3RvX2luZGV4KG9wdHMuQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU4pXSxcbiAgICAgICAgfTtcbiAgICB9XG59IiwiaW1wb3J0IHtzaGVldHNfdjR9IGZyb20gXCJnb29nbGVhcGlzXCI7XG5pbXBvcnQge1NlYXNvblNoZWV0Q29uZmlnLH0gZnJvbSBcIi4uL2Vudi9oYW5kbGVyX2NvbmZpZ1wiO1xuaW1wb3J0IHtleGNlbF9yb3dfdG9faW5kZXh9IGZyb20gXCIuLi91dGlscy91dGlsXCI7XG5pbXBvcnQgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIgZnJvbSBcIi4uL3V0aWxzL2dvb2dsZV9zaGVldHNfc3ByZWFkc2hlZXRfdGFiXCI7XG5pbXBvcnQge2ZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2N1cnJlbnRfZGF5fSBmcm9tIFwiLi4vdXRpbHMvZGF0ZXRpbWVfdXRpbFwiO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhIHNlYXNvbiBzaGVldCBpbiBHb29nbGUgU2hlZXRzLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWFzb25TaGVldCB7XG4gICAgc2hlZXQ6IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiO1xuICAgIGNvbmZpZzogU2Vhc29uU2hlZXRDb25maWc7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFNlYXNvblNoZWV0LlxuICAgICAqIEBwYXJhbSB7c2hlZXRzX3Y0LlNoZWV0cyB8IG51bGx9IHNoZWV0c19zZXJ2aWNlIC0gVGhlIEdvb2dsZSBTaGVldHMgQVBJIHNlcnZpY2UuXG4gICAgICogQHBhcmFtIHtTZWFzb25TaGVldENvbmZpZ30gY29uZmlnIC0gVGhlIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBzZWFzb24gc2hlZXQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzIHwgbnVsbCxcbiAgICAgICAgY29uZmlnOiBTZWFzb25TaGVldENvbmZpZ1xuICAgICkge1xuICAgICAgICB0aGlzLnNoZWV0ID0gbmV3IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiKFxuICAgICAgICAgICAgc2hlZXRzX3NlcnZpY2UsXG4gICAgICAgICAgICBjb25maWcuU0hFRVRfSUQsXG4gICAgICAgICAgICBjb25maWcuU0VBU09OX1NIRUVUXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG51bWJlciBvZiBkYXlzIHBhdHJvbGxlZCBieSBhIHBhdHJvbGxlci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0cm9sbGVyX25hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcGF0cm9sbGVyLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPG51bWJlcj59IFRoZSBudW1iZXIgb2YgZGF5cyBwYXRyb2xsZWQuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3BhdHJvbGxlZF9kYXlzKFxuICAgICAgICBwYXRyb2xsZXJfbmFtZTogc3RyaW5nXG4gICAgKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICAgICAgY29uc3QgcGF0cm9sbGVyX3JvdyA9IGF3YWl0IHRoaXMuc2hlZXQuZ2V0X3NoZWV0X3Jvd19mb3JfcGF0cm9sbGVyKFxuICAgICAgICAgICAgcGF0cm9sbGVyX25hbWUsXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5TRUFTT05fU0hFRVRfTkFNRV9DT0xVTU5cbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoIXBhdHJvbGxlcl9yb3cpIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGN1cnJlbnROdW1iZXIgPVxuICAgICAgICAgICAgcGF0cm9sbGVyX3Jvdy5yb3dbZXhjZWxfcm93X3RvX2luZGV4KHRoaXMuY29uZmlnLlNFQVNPTl9TSEVFVF9EQVlTX0NPTFVNTildO1xuXG4gICAgICAgIGNvbnN0IGN1cnJlbnREYXkgPSBmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9jdXJyZW50X2RheShwYXRyb2xsZXJfcm93LnJvdylcbiAgICAgICAgICAgIC5tYXAoKHgpID0+ICh4Py5zdGFydHNXaXRoKFwiSFwiKSA/IDAuNSA6IDEpKVxuICAgICAgICAgICAgLnJlZHVjZSgoeCwgeSwgaSkgPT4geCArIHksIDApO1xuXG4gICAgICAgIHJldHVybiBjdXJyZW50TnVtYmVyIC0gY3VycmVudERheTtcbiAgICB9XG59IiwiaW1wb3J0IHtzaGVldHNfdjR9IGZyb20gXCJnb29nbGVhcGlzXCI7XG5pbXBvcnQgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIgZnJvbSBcIi4uL3V0aWxzL2dvb2dsZV9zaGVldHNfc3ByZWFkc2hlZXRfdGFiXCI7XG5pbXBvcnQge1NsZWRCZWFjb25Db25maWd9IGZyb20gXCIuLi9lbnYvaGFuZGxlcl9jb25maWdcIjtcbmltcG9ydCB7ZXhjZWxfcm93X3RvX2luZGV4LCByb3dfY29sX3RvX2V4Y2VsX2luZGV4fSBmcm9tIFwiLi4vdXRpbHMvdXRpbFwiO1xuaW1wb3J0IHtCVk5TUFJlc3BvbnNlfSBmcm9tIFwiLi4vaGFuZGxlcnMvYnZuc3BfaGFuZGxlclwiO1xuaW1wb3J0IHtmb3JtYXRfZGF0ZV9mb3Jfc3ByZWFkc2hlZXRfdmFsdWV9IGZyb20gXCIuLi91dGlscy9kYXRldGltZV91dGlsXCI7XG5cblxuZXhwb3J0IGNsYXNzIEJlYWNvblNlYXJjaGVzIHtcbiAgICByb3c6IGFueVtdO1xuICAgIGluZGV4OiBudW1iZXI7XG4gICAgc2VhcmNoX2NvdW50OiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcm93OiBhbnlbXSxcbiAgICAgICAgaW5kZXg6IG51bWJlcixcbiAgICAgICAgc2VhcmNoX2NvdW50OiBhbnlcbiAgICApIHtcbiAgICAgICAgdGhpcy5yb3cgPSByb3c7XG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5zZWFyY2hfY291bnQgPSBOdW1iZXIoc2VhcmNoX2NvdW50KTtcbiAgICB9XG59XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGEgU2xlZCBCZWFjb24gQ2hlY2sgU2hlZXQgaW4gR29vZ2xlIFNoZWV0c1xuICovXG5leHBvcnQgIGNsYXNzIFNsZWRCZWFjb25DaGVja1NoZWV0ICB7XG4gICAgc2xlZF9iZWFjb25fY2hlY2tfc2hlZXQ6IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiO1xuICAgIGNvbmZpZzogU2xlZEJlYWNvbkNvbmZpZ1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBMb2dpblNoZWV0LlxuICAgICAqIEBwYXJhbSB7c2hlZXRzX3Y0LlNoZWV0cyB8IG51bGx9IHNoZWV0c19zZXJ2aWNlIC0gVGhlIEdvb2dsZSBTaGVldHMgQVBJIHNlcnZpY2UuXG4gICAgICogQHBhcmFtIHtTbGVkQmVhY29uQ29uZmlnfSBjb25maWcgLSBUaGUgY29uZmlndXJhdGlvbiBmb3IgdGhpcyBzaGVldC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgc2hlZXRzX3NlcnZpY2U6IHNoZWV0c192NC5TaGVldHMgfCBudWxsLFxuICAgICAgICBjb25maWc6IFNsZWRCZWFjb25Db25maWdcbiAgICApIHtcbiAgICAgICAgdGhpcy5zbGVkX2JlYWNvbl9jaGVja19zaGVldCA9IG5ldyBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYihcbiAgICAgICAgICAgIHNoZWV0c19zZXJ2aWNlLFxuICAgICAgICAgICAgY29uZmlnLlNIRUVUX0lELFxuICAgICAgICAgICAgY29uZmlnLlNMRURfQkVBQ09OX1NIRUVUXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgIH1cblxuICAgIGdldCBzdGFydF9pbmRleCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gZXhjZWxfcm93X3RvX2luZGV4KFxuICAgICAgICAgICAgdGhpcy5jb25maWcuQkVBQ09OX0ZJTkRfREFURVNfU1RBUlRJTkdfQ09MVU1OXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0IHNoZWV0X25hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLlNMRURfQkVBQ09OX1NIRUVUO1xuICAgIH1cblxuICAgIGdldCBuYW1lX2NvbHVtbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuU0xFRF9CRUFDT05fU0hFRVRfTkFNRV9DT0xVTU47XG4gICAgfVxuXG4gICAgZ2V0IGJlYWNvbl9zZWFyY2hfY291bnRfY29sdW1uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5CRUFDT05fU0VBUkNIX0NPVU5UX0NPTFVNTjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGN1cnJlbnQgc2VhcmNoZXMgZm9yIHRoZSBnaXZlbiBwYXRyb2xsZXJcbiAgICAgKiBAcGFyYW0gcGF0cm9sbGVyX25hbWVcbiAgICAgKi9cbiAgICBhc3luYyBnZXRfYmVhY29uX3NlYXJjaGVzKFxuICAgICAgICBwYXRyb2xsZXJfbmFtZTogc3RyaW5nXG4gICAgKTogUHJvbWlzZTxCZWFjb25TZWFyY2hlcyB8IG51bGw+IHtcbiAgICAgICAgY29uc3QgcGF0cm9sbGVyX3JvdyA9IGF3YWl0IHRoaXMuc2xlZF9iZWFjb25fY2hlY2tfc2hlZXQuZ2V0X3NoZWV0X3Jvd19mb3JfcGF0cm9sbGVyKFxuICAgICAgICAgICAgcGF0cm9sbGVyX25hbWUsXG4gICAgICAgICAgICB0aGlzLm5hbWVfY29sdW1uXG4gICAgICAgICk7XG4gICAgICAgIGlmIChwYXRyb2xsZXJfcm93ID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNlYXJjaF9jb3VudCA9IHBhdHJvbGxlcl9yb3cucm93W2V4Y2VsX3Jvd190b19pbmRleCh0aGlzLmJlYWNvbl9zZWFyY2hfY291bnRfY29sdW1uKV07XG4gICAgICAgIHJldHVybiBuZXcgQmVhY29uU2VhcmNoZXMoXG4gICAgICAgICAgICBwYXRyb2xsZXJfcm93LnJvdyxcbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cuaW5kZXgsXG4gICAgICAgICAgICBzZWFyY2hfY291bnRcbiAgICAgICAgKTtcblxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbnVtYmVyIG9mIGJlYWNvbiBmaW5kcyBieSBhIHBhdHJvbGxlci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0cm9sbGVyX25hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcGF0cm9sbGVyLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPG51bWJlcj59IFRoZSBudW1iZXIgb2YgdGltZXMgdGhpcyBwYXRyb2xsZXIgZm91bmQgYSBiZWFjb25zLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF9wYXRyb2xsZWRfYmVhY29uX2ZpbmRfY291bnQoXG4gICAgICAgIHBhdHJvbGxlcl9uYW1lOiBzdHJpbmdcbiAgICApOiBQcm9taXNlPG51bWJlcj4ge1xuICAgICAgICBjb25zdCBwYXRyb2xsZXJfcm93ID0gYXdhaXQgdGhpcy5zbGVkX2JlYWNvbl9jaGVja19zaGVldC5nZXRfc2hlZXRfcm93X2Zvcl9wYXRyb2xsZXIoXG4gICAgICAgICAgICBwYXRyb2xsZXJfbmFtZSxcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLlNMRURfQkVBQ09OX1NIRUVUX05BTUVfQ09MVU1OXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKCFwYXRyb2xsZXJfcm93KSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGF0cm9sbGVyX3Jvdy5yb3dbZXhjZWxfcm93X3RvX2luZGV4KHRoaXMuY29uZmlnLkJFQUNPTl9TRUFSQ0hfQ09VTlRfQ09MVU1OKV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVjb3JkIGEgbmV3IGJlYWNvbiBzZWFyY2ggZm9yIHRvZGF5IGF0IHRoZSBzcGVjaWZpZWQgbG9jYXRpb24uXG4gICAgICogQHBhcmFtIHBhdHJvbGxlcl9yb3dcbiAgICAgKiBAcGFyYW0gc2VhcmNoX2xvY2F0aW9uXG4gICAgICovXG4gICAgYXN5bmMgc2V0X2JlYWNvbnNfc2VhcmNoZXMoXG4gICAgICAgIHBhdHJvbGxlcl9yb3c6IEJlYWNvblNlYXJjaGVzLFxuICAgICAgICBzZWFyY2hfbG9jYXRpb246IHN0cmluZ1xuICAgICkge1xuICAgICAgICBjb25zdCAgcm93X251bSA9IHBhdHJvbGxlcl9yb3cuaW5kZXg7XG4gICAgICAgIGNvbnN0IHN0YXJ0X2luZGV4ID0gdGhpcy5zdGFydF9pbmRleDtcbiAgICAgICAgY29uc3QgcHJpb3JfbGVuZ3RoID0gcGF0cm9sbGVyX3Jvdy5yb3cubGVuZ3RoIC0gc3RhcnRfaW5kZXg7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfZGF0ZV9zdHJpbmcgPSBmb3JtYXRfZGF0ZV9mb3Jfc3ByZWFkc2hlZXRfdmFsdWUobmV3IERhdGUoKSk7XG5cbiAgICAgICAgbGV0IG5ld192YWxzID0gcGF0cm9sbGVyX3Jvdy5yb3dcbiAgICAgICAgICAgIC5zbGljZShzdGFydF9pbmRleClcbiAgICAgICAgICAgIC5tYXAoKHgpID0+IHg/LnRvU3RyaW5nKCkpO1xuXG4gICAgICAgIC8vIFJlY29yZCAgdGhlIGRhdGUgb2YgdGhlIHNlYXJjaCBhbmQgdGhlIGxvY2F0aW9uXG4gICAgICAgIG5ld192YWxzLnB1c2goY3VycmVudF9kYXRlX3N0cmluZysgXCIsXCIgKyBzZWFyY2hfbG9jYXRpb24pO1xuXG4gICAgICAgIGNvbnN0IHVwZGF0ZV9sZW5ndGggPSBNYXRoLm1heChwcmlvcl9sZW5ndGgsIG5ld192YWxzLmxlbmd0aCk7XG4gICAgICAgIHdoaWxlIChuZXdfdmFscy5sZW5ndGggPCB1cGRhdGVfbGVuZ3RoKSB7XG4gICAgICAgICAgICBuZXdfdmFscy5wdXNoKFwiXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZW5kX2luZGV4ID0gc3RhcnRfaW5kZXggKyB1cGRhdGVfbGVuZ3RoIC0gMTtcbiAgICAgICAgY29uc3QgcmFuZ2UgPSBgJHt0aGlzLnNsZWRfYmVhY29uX2NoZWNrX3NoZWV0LnNoZWV0X25hbWV9ISR7cm93X2NvbF90b19leGNlbF9pbmRleChcbiAgICAgICAgICAgIHJvd19udW0sXG4gICAgICAgICAgICBzdGFydF9pbmRleFxuICAgICAgICApfToke3Jvd19jb2xfdG9fZXhjZWxfaW5kZXgocm93X251bSwgZW5kX2luZGV4KX1gO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGBVcGRhdGluZyAke3JhbmdlfSB3aXRoICR7bmV3X3ZhbHMubGVuZ3RofSB2YWx1ZXNgKTtcbiAgICAgICAgYXdhaXQgdGhpcy5zbGVkX2JlYWNvbl9jaGVja19zaGVldC51cGRhdGVfdmFsdWVzKHJhbmdlLCBbbmV3X3ZhbHNdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZSBsb2NhdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5IC0gdGhlIGJvZHkgb2YgdGhlIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nIHwgbnVsbH0gVGhlIHNlYXJjaCBsb2NhdGlvbiBpZiB0aGUgbG9jYXRpb24gaXMgdmFsaWRcbiAgICAgKi9cbiAgICBwYXJzZV9sb2NhdGlvbihib2R5OiBzdHJpbmcgfCBudWxsKTogc3RyaW5nIHxudWxsICB7XG4gICAgICAgIGlmIChib2R5ID09PSBudWxsICkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuY2xlYW5TbXNWYWx1ZShib2R5KTtcbiAgICB9XG5cbiAgICBjbGVhblNtc1ZhbHVlKGlucHV0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIWlucHV0KSByZXR1cm4gJyc7XG5cbiAgICAgICAgbGV0IGNsZWFuZWQgPSBpbnB1dC50cmltKCk7XG5cbiAgICAgICAgLy8gMS4gUmVtb3ZlIGZvcm11bGEgdHJpZ2dlcnMgZnJvbSB0aGUgYmVnaW5uaW5nIG9mIHRoZSBzdHJpbmdcbiAgICAgICAgLy8gTG9vcHMgdG8gY2F0Y2ggZWRnZSBjYXNlcyBsaWtlIFwiPT1DbGljayBoZXJlXCIgb3IgXCIrKzFcIlxuICAgICAgICB3aGlsZSAoWyc9JywgJysnLCAnLScsICdAJ10uaW5jbHVkZXMoY2xlYW5lZC5jaGFyQXQoMCkpKSB7XG4gICAgICAgICAgICBjbGVhbmVkID0gY2xlYW5lZC5zdWJzdHJpbmcoMSkudHJpbSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gMi4gU3RyaXAgbGluZSBicmVha3MsIHRhYnMsIGFuZCBpbnZpc2libGUgY29udHJvbCBjaGFyYWN0ZXJzIChcXHgwMC1cXHgxRiwgXFx4N0YpXG4gICAgICAgIC8vIFRoaXMgcHJldmVudHMgdGhlIFNNUyByZXBseSBmcm9tIGJyZWFraW5nIG9udG8gbmV3IGxpbmVzIHVuZXhwZWN0ZWRseVxuICAgICAgICBjbGVhbmVkID0gY2xlYW5lZC5yZXBsYWNlKC9bXFxyXFxuXFx0XFx4MDAtXFx4MUZcXHg3Rl0vZywgJyAnKTtcblxuICAgICAgICAvLyAzLiBDb2xsYXBzZSBtdWx0aXBsZSBzcGFjZXMgaW50byBhIHNpbmdsZSBzcGFjZVxuICAgICAgICBjbGVhbmVkID0gY2xlYW5lZC5yZXBsYWNlKC9cXHMrL2csICcgJykudHJpbSgpO1xuXG4gICAgICAgIHJldHVybiBjbGVhbmVkO1xuICAgIH1cblxufSIsImltcG9ydCB7Z29vZ2xlfSBmcm9tIFwiZ29vZ2xlYXBpc1wiO1xuaW1wb3J0IHtHZW5lcmF0ZUF1dGhVcmxPcHRzfSBmcm9tIFwiZ29vZ2xlLWF1dGgtbGlicmFyeVwiO1xuaW1wb3J0IHtPQXV0aDJDbGllbnR9IGZyb20gXCJnb29nbGVhcGlzLWNvbW1vblwiO1xuaW1wb3J0IHtzYW5pdGl6ZV9waG9uZV9udW1iZXJ9IGZyb20gXCIuL3V0aWxzL3V0aWxcIjtcbmltcG9ydCB7bG9hZF9jcmVkZW50aWFsc19maWxlc30gZnJvbSBcIi4vdXRpbHMvZmlsZV91dGlsc1wiO1xuaW1wb3J0IHtTZXJ2aWNlQ29udGV4dH0gZnJvbSBcIkB0d2lsaW8tbGFicy9zZXJ2ZXJsZXNzLXJ1bnRpbWUtdHlwZXMvdHlwZXNcIjtcbmltcG9ydCB7VXNlckNyZWRzQ29uZmlnfSBmcm9tIFwiLi9lbnYvaGFuZGxlcl9jb25maWdcIjtcbmltcG9ydCB7dmFsaWRhdGVfc2NvcGVzfSBmcm9tIFwiLi91dGlscy9zY29wZV91dGlsXCI7XG5cbmNvbnN0IFNDT1BFUyA9IFtcbiAgICBcImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvc2NyaXB0LnByb2plY3RzXCIsXG4gICAgXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3NwcmVhZHNoZWV0c1wiLFxuXTtcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgdXNlciBjcmVkZW50aWFscyBmb3IgR29vZ2xlIE9BdXRoMi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckNyZWRzIHtcbiAgICBudW1iZXI6IHN0cmluZztcbiAgICBvYXV0aDJfY2xpZW50OiBPQXV0aDJDbGllbnQ7XG4gICAgc3luY19jbGllbnQ6IFNlcnZpY2VDb250ZXh0O1xuICAgIGRvbWFpbj86IHN0cmluZztcbiAgICBsb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIFVzZXJDcmVkcyBpbnN0YW5jZS5cbiAgICAgKiBAcGFyYW0ge1NlcnZpY2VDb250ZXh0fSBzeW5jX2NsaWVudCAtIFRoZSBUd2lsaW8gU3luYyBjbGllbnQuXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCB1bmRlZmluZWR9IG51bWJlciAtIFRoZSB1c2VyJ3MgcGhvbmUgbnVtYmVyLlxuICAgICAqIEBwYXJhbSB7VXNlckNyZWRzQ29uZmlnfSBvcHRzIC0gVGhlIHVzZXIgY3JlZGVudGlhbHMgY29uZmlndXJhdGlvbi5cbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gVGhyb3dzIGFuIGVycm9yIGlmIHRoZSBudW1iZXIgaXMgdW5kZWZpbmVkIG9yIG51bGwuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHN5bmNfY2xpZW50OiBTZXJ2aWNlQ29udGV4dCxcbiAgICAgICAgbnVtYmVyOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgICAgIG9wdHM6IFVzZXJDcmVkc0NvbmZpZ1xuICAgICkge1xuICAgICAgICBpZiAobnVtYmVyID09PSB1bmRlZmluZWQgfHwgbnVtYmVyID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOdW1iZXIgaXMgdW5kZWZpbmVkXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubnVtYmVyID0gc2FuaXRpemVfcGhvbmVfbnVtYmVyKG51bWJlcik7XG5cbiAgICAgICAgY29uc3QgY3JlZGVudGlhbHMgPSBsb2FkX2NyZWRlbnRpYWxzX2ZpbGVzKCk7XG4gICAgICAgIGNvbnN0IHsgY2xpZW50X3NlY3JldCwgY2xpZW50X2lkLCByZWRpcmVjdF91cmlzIH0gPSBjcmVkZW50aWFscy53ZWI7XG4gICAgICAgIHRoaXMub2F1dGgyX2NsaWVudCA9IG5ldyBnb29nbGUuYXV0aC5PQXV0aDIoXG4gICAgICAgICAgICBjbGllbnRfaWQsXG4gICAgICAgICAgICBjbGllbnRfc2VjcmV0LFxuICAgICAgICAgICAgcmVkaXJlY3RfdXJpc1swXVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN5bmNfY2xpZW50ID0gc3luY19jbGllbnQ7XG4gICAgICAgIGxldCBkb21haW4gPSBvcHRzLk5TUF9FTUFJTF9ET01BSU47XG4gICAgICAgIGlmIChkb21haW4gPT09IHVuZGVmaW5lZCB8fCBkb21haW4gPT09IG51bGwgfHwgZG9tYWluID09PSBcIlwiKSB7XG4gICAgICAgICAgICBkb21haW4gPSB1bmRlZmluZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRvbWFpbiA9IGRvbWFpbjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvYWQgdGhlIE9BdXRoMiB0b2tlbi5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBib29sZWFuIGluZGljYXRpbmcgaWYgdGhlIHRva2VuIHdhcyBsb2FkZWQuXG4gICAgICovXG4gICAgYXN5bmMgbG9hZFRva2VuKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICBpZiAoIXRoaXMubG9hZGVkKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBMb29raW5nIGZvciAke3RoaXMudG9rZW5fa2V5fWApO1xuICAgICAgICAgICAgICAgIGNvbnN0IG9hdXRoMkRvYyA9IGF3YWl0IHRoaXMuc3luY19jbGllbnRcbiAgICAgICAgICAgICAgICAgICAgLmRvY3VtZW50cyh0aGlzLnRva2VuX2tleSlcbiAgICAgICAgICAgICAgICAgICAgLmZldGNoKCk7XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICBvYXV0aDJEb2MgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgICAgICBvYXV0aDJEb2MuZGF0YSA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICAgICAgb2F1dGgyRG9jLmRhdGEudG9rZW4gPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgRGlkbid0IGZpbmQgJHt0aGlzLnRva2VuX2tleX1gKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0b2tlbiA9IG9hdXRoMkRvYy5kYXRhLnRva2VuO1xuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZV9zY29wZXMob2F1dGgyRG9jLmRhdGEuc2NvcGVzLCBTQ09QRVMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9hdXRoMl9jbGllbnQuc2V0Q3JlZGVudGlhbHModG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgTG9hZGVkIHRva2VuICR7dGhpcy50b2tlbl9rZXl9YCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgICAgIGBGYWlsZWQgdG8gbG9hZCB0b2tlbiBmb3IgJHt0aGlzLnRva2VuX2tleX0uXFxuICR7ZX1gXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5sb2FkZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB0b2tlbiBrZXkuXG4gICAgICogQHJldHVybnMge3N0cmluZ30gVGhlIHRva2VuIGtleS5cbiAgICAgKi9cbiAgICBnZXQgdG9rZW5fa2V5KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgb2F1dGgyXyR7dGhpcy5udW1iZXJ9YDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWxldGUgdGhlIE9BdXRoMiB0b2tlbi5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBib29sZWFuIGluZGljYXRpbmcgaWYgdGhlIHRva2VuIHdhcyBkZWxldGVkLlxuICAgICAqL1xuICAgIGFzeW5jIGRlbGV0ZVRva2VuKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICBjb25zdCBvYXV0aDJEb2MgPSBhd2FpdCB0aGlzLnN5bmNfY2xpZW50XG4gICAgICAgICAgICAuZG9jdW1lbnRzKHRoaXMudG9rZW5fa2V5KVxuICAgICAgICAgICAgLmZldGNoKCk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIG9hdXRoMkRvYyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICBvYXV0aDJEb2MuZGF0YSA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIG9hdXRoMkRvYy5kYXRhLnRva2VuID09PSB1bmRlZmluZWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgRGlkbid0IGZpbmQgJHt0aGlzLnRva2VuX2tleX1gKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLnN5bmNfY2xpZW50LmRvY3VtZW50cyhvYXV0aDJEb2Muc2lkKS5yZW1vdmUoKTtcbiAgICAgICAgY29uc29sZS5sb2coYERlbGV0ZWQgdG9rZW4gJHt0aGlzLnRva2VuX2tleX1gKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29tcGxldGUgdGhlIGxvZ2luIHByb2Nlc3MgYnkgZXhjaGFuZ2luZyB0aGUgYXV0aG9yaXphdGlvbiBjb2RlIGZvciBhIHRva2VuLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb2RlIC0gVGhlIGF1dGhvcml6YXRpb24gY29kZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBzY29wZXMgLSBUaGUgc2NvcGVzIHRvIHZhbGlkYXRlLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBsb2dpbiBwcm9jZXNzIGlzIGNvbXBsZXRlLlxuICAgICAqL1xuICAgIGFzeW5jIGNvbXBsZXRlTG9naW4oY29kZTogc3RyaW5nLCBzY29wZXM6IHN0cmluZ1tdKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHZhbGlkYXRlX3Njb3BlcyhzY29wZXMsIFNDT1BFUyk7XG4gICAgICAgIGNvbnN0IHRva2VuID0gYXdhaXQgdGhpcy5vYXV0aDJfY2xpZW50LmdldFRva2VuKGNvZGUpO1xuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShPYmplY3Qua2V5cyh0b2tlbi5yZXMhKSkpO1xuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0b2tlbi50b2tlbnMpKTtcbiAgICAgICAgdGhpcy5vYXV0aDJfY2xpZW50LnNldENyZWRlbnRpYWxzKHRva2VuLnRva2Vucyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBvYXV0aERvYyA9IGF3YWl0IHRoaXMuc3luY19jbGllbnQuZG9jdW1lbnRzLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgZGF0YTogeyB0b2tlbjogdG9rZW4udG9rZW5zLCBzY29wZXM6IHNjb3BlcyB9LFxuICAgICAgICAgICAgICAgIHVuaXF1ZU5hbWU6IHRoaXMudG9rZW5fa2V5LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgIGBFeGNlcHRpb24gd2hlbiBjcmVhdGluZyBvYXV0aC4gVHJ5aW5nIHRvIHVwZGF0ZSBpbnN0ZWFkLi4uXFxuJHtlfWBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCBvYXV0aERvYyA9IGF3YWl0IHRoaXMuc3luY19jbGllbnRcbiAgICAgICAgICAgICAgICAuZG9jdW1lbnRzKHRoaXMudG9rZW5fa2V5KVxuICAgICAgICAgICAgICAgIC51cGRhdGUoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7IHRva2VuOiB0b2tlbiwgc2NvcGVzOiBzY29wZXMgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgYXV0aG9yaXphdGlvbiBVUkwuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c3RyaW5nPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIGF1dGhvcml6YXRpb24gVVJMLlxuICAgICAqL1xuICAgIGFzeW5jIGdldEF1dGhVcmwoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgY29uc3QgaWQgPSB0aGlzLmdlbmVyYXRlUmFuZG9tU3RyaW5nKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBVc2luZyBub25jZSAke2lkfSBmb3IgJHt0aGlzLm51bWJlcn1gKTtcbiAgICAgICAgY29uc3QgZG9jID0gYXdhaXQgdGhpcy5zeW5jX2NsaWVudC5kb2N1bWVudHMuY3JlYXRlKHtcbiAgICAgICAgICAgIGRhdGE6IHsgbnVtYmVyOiB0aGlzLm51bWJlciwgc2NvcGVzOiBTQ09QRVMgfSxcbiAgICAgICAgICAgIHVuaXF1ZU5hbWU6IGlkLFxuICAgICAgICAgICAgdHRsOiA2MCAqIDUsIC8vIDUgbWludXRlc1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2coYE1hZGUgbm9uY2UtZG9jOiAke0pTT04uc3RyaW5naWZ5KGRvYyl9YCk7XG5cbiAgICAgICAgY29uc3Qgb3B0czogR2VuZXJhdGVBdXRoVXJsT3B0cyA9IHtcbiAgICAgICAgICAgIGFjY2Vzc190eXBlOiBcIm9mZmxpbmVcIixcbiAgICAgICAgICAgIHNjb3BlOiBTQ09QRVMsXG4gICAgICAgICAgICBzdGF0ZTogaWQsXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLmRvbWFpbikge1xuICAgICAgICAgICAgb3B0c1tcImhkXCJdID0gdGhpcy5kb21haW47XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5vYXV0aDJfY2xpZW50LmdlbmVyYXRlQXV0aFVybChvcHRzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZSBhIHJhbmRvbSBzdHJpbmcuXG4gICAgICogQHJldHVybnMge3N0cmluZ30gQSByYW5kb20gc3RyaW5nLlxuICAgICAqL1xuICAgIGdlbmVyYXRlUmFuZG9tU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IDMwO1xuICAgICAgICBsZXQgcmVzdWx0ID0gXCJcIjtcbiAgICAgICAgY29uc3QgY2hhcmFjdGVycyA9XG4gICAgICAgICAgICBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5XCI7XG4gICAgICAgIGNvbnN0IGNoYXJhY3RlcnNMZW5ndGggPSBjaGFyYWN0ZXJzLmxlbmd0aDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0ICs9IGNoYXJhY3RlcnMuY2hhckF0KFxuICAgICAgICAgICAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJhY3RlcnNMZW5ndGgpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuXG4vKipcbiAqIEludGVyZmFjZSByZXByZXNlbnRpbmcgdGhlIHVzZXIgY3JlZGVudGlhbHMgY29uZmlndXJhdGlvbi5cbiAqL1xuZXhwb3J0IHsgVXNlckNyZWRzIH07XG4iLCIvKipcbiAqIFJlcHJlc2VudHMgYSBjaGVjay1pbiB2YWx1ZSB3aXRoIHZhcmlvdXMgcHJvcGVydGllcyBhbmQgbG9va3VwIHZhbHVlcy5cbiAqL1xuY2xhc3MgQ2hlY2tpblZhbHVlIHtcbiAgICBrZXk6IHN0cmluZztcbiAgICBzaGVldHNfdmFsdWU6IHN0cmluZztcbiAgICBzbXNfZGVzYzogc3RyaW5nO1xuICAgIGZhc3RfY2hlY2tpbnM6IHN0cmluZ1tdO1xuICAgIGxvb2t1cF92YWx1ZXM6IFNldDxzdHJpbmc+O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBDaGVja2luVmFsdWUuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIFRoZSBrZXkgZm9yIHRoZSBjaGVjay1pbiB2YWx1ZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2hlZXRzX3ZhbHVlIC0gVGhlIHZhbHVlIHVzZWQgaW4gc2hlZXRzLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzbXNfZGVzYyAtIFRoZSBkZXNjcmlwdGlvbiB1c2VkIGluIFNNUy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IHN0cmluZ1tdfSBmYXN0X2NoZWNraW5zIC0gVGhlIGZhc3QgY2hlY2staW4gdmFsdWVzLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBrZXk6IHN0cmluZyxcbiAgICAgICAgc2hlZXRzX3ZhbHVlOiBzdHJpbmcsXG4gICAgICAgIHNtc19kZXNjOiBzdHJpbmcsXG4gICAgICAgIGZhc3RfY2hlY2tpbnM6IHN0cmluZyB8IHN0cmluZ1tdXG4gICAgKSB7XG4gICAgICAgIGlmICghKGZhc3RfY2hlY2tpbnMgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgICAgICAgIGZhc3RfY2hlY2tpbnMgPSBbZmFzdF9jaGVja2luc107XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgICAgIHRoaXMuc2hlZXRzX3ZhbHVlID0gc2hlZXRzX3ZhbHVlO1xuICAgICAgICB0aGlzLnNtc19kZXNjID0gc21zX2Rlc2M7XG4gICAgICAgIHRoaXMuZmFzdF9jaGVja2lucyA9IGZhc3RfY2hlY2tpbnMubWFwKCh4KSA9PiB4LnRyaW0oKS50b0xvd2VyQ2FzZSgpKTtcblxuICAgICAgICBjb25zdCBzbXNfZGVzY19zcGxpdDogc3RyaW5nW10gPSBzbXNfZGVzY1xuICAgICAgICAgICAgLnJlcGxhY2UoL1xccysvLCBcIi1cIilcbiAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICAuc3BsaXQoXCIvXCIpO1xuICAgICAgICBjb25zdCBsb29rdXBfdmFscyA9IFsuLi50aGlzLmZhc3RfY2hlY2tpbnMsIC4uLnNtc19kZXNjX3NwbGl0XTtcbiAgICAgICAgdGhpcy5sb29rdXBfdmFsdWVzID0gbmV3IFNldDxzdHJpbmc+KGxvb2t1cF92YWxzKTtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGNvbGxlY3Rpb24gb2YgY2hlY2staW4gdmFsdWVzIHdpdGggdmFyaW91cyBsb29rdXAgbWV0aG9kcy5cbiAqL1xuY2xhc3MgQ2hlY2tpblZhbHVlcyB7XG4gICAgYnlfa2V5OiB7IFtrZXk6IHN0cmluZ106IENoZWNraW5WYWx1ZSB9ID0ge307XG4gICAgYnlfbHY6IHsgW2tleTogc3RyaW5nXTogQ2hlY2tpblZhbHVlIH0gPSB7fTtcbiAgICBieV9mYzogeyBba2V5OiBzdHJpbmddOiBDaGVja2luVmFsdWUgfSA9IHt9O1xuICAgIGJ5X3NoZWV0X3N0cmluZzogeyBba2V5OiBzdHJpbmddOiBDaGVja2luVmFsdWUgfSA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBDaGVja2luVmFsdWVzLlxuICAgICAqIEBwYXJhbSB7Q2hlY2tpblZhbHVlW119IGNoZWNraW5WYWx1ZXMgLSBUaGUgYXJyYXkgb2YgY2hlY2staW4gdmFsdWVzLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNoZWNraW5WYWx1ZXM6IENoZWNraW5WYWx1ZVtdKSB7XG4gICAgICAgIGZvciAoY29uc3QgY2hlY2tpblZhbHVlIG9mIGNoZWNraW5WYWx1ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuYnlfa2V5W2NoZWNraW5WYWx1ZS5rZXldID0gY2hlY2tpblZhbHVlO1xuICAgICAgICAgICAgdGhpcy5ieV9zaGVldF9zdHJpbmdbY2hlY2tpblZhbHVlLnNoZWV0c192YWx1ZV0gPSBjaGVja2luVmFsdWU7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGx2IG9mIGNoZWNraW5WYWx1ZS5sb29rdXBfdmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ieV9sdltsdl0gPSBjaGVja2luVmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZjIG9mIGNoZWNraW5WYWx1ZS5mYXN0X2NoZWNraW5zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ieV9mY1tmY10gPSBjaGVja2luVmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZXMgYSBmYXN0IGNoZWNrLWluIHZhbHVlIGZyb20gdGhlIGdpdmVuIGJvZHkgc3RyaW5nLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5IC0gVGhlIGJvZHkgc3RyaW5nIHRvIHBhcnNlLlxuICAgICAqIEByZXR1cm5zIHtDaGVja2luVmFsdWUgfCB1bmRlZmluZWR9IFRoZSBwYXJzZWQgY2hlY2staW4gdmFsdWUgb3IgdW5kZWZpbmVkLlxuICAgICAqL1xuICAgIHBhcnNlX2Zhc3RfY2hlY2tpbihib2R5OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnlfZmNbYm9keV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIGEgY2hlY2staW4gdmFsdWUgZnJvbSB0aGUgZ2l2ZW4gYm9keSBzdHJpbmcuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHkgLSBUaGUgYm9keSBzdHJpbmcgdG8gcGFyc2UuXG4gICAgICogQHJldHVybnMge0NoZWNraW5WYWx1ZSB8IHVuZGVmaW5lZH0gVGhlIHBhcnNlZCBjaGVjay1pbiB2YWx1ZSBvciB1bmRlZmluZWQuXG4gICAgICovXG4gICAgcGFyc2VfY2hlY2tpbihib2R5OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgY2hlY2tpbl9sb3dlciA9IGJvZHkucmVwbGFjZSgvXFxzKy8sIFwiXCIpO1xuICAgICAgICByZXR1cm4gdGhpcy5ieV9sdltjaGVja2luX2xvd2VyXTtcbiAgICB9XG59XG5cbmV4cG9ydCB7IENoZWNraW5WYWx1ZSwgQ2hlY2tpblZhbHVlcyB9IiwiLyoqXG4gKiBDb252ZXJ0IGFuIEV4Y2VsIGRhdGUgdG8gYSBKYXZhU2NyaXB0IERhdGUgb2JqZWN0LlxuICogQHBhcmFtIHtudW1iZXJ9IGRhdGUgLSBUaGUgRXhjZWwgZGF0ZS5cbiAqIEByZXR1cm5zIHtEYXRlfSBUaGUgSmF2YVNjcmlwdCBEYXRlIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gZXhjZWxfZGF0ZV90b19qc19kYXRlKGRhdGU6IG51bWJlcik6IERhdGUge1xuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBEYXRlKDApO1xuICAgIHJlc3VsdC5zZXRVVENNaWxsaXNlY29uZHMoTWF0aC5yb3VuZCgoZGF0ZSAtIDI1NTY5KSAqIDg2NDAwICogMTAwMCkpO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ2hhbmdlIHRoZSB0aW1lem9uZSBvZiBhIERhdGUgb2JqZWN0IHRvIFBTVC5cbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSAtIFRoZSBEYXRlIG9iamVjdC5cbiAqIEByZXR1cm5zIHtEYXRlfSBUaGUgRGF0ZSBvYmplY3Qgd2l0aCB0aGUgdGltZXpvbmUgc2V0IHRvIFBTVC5cbiAqL1xuZnVuY3Rpb24gY2hhbmdlX3RpbWV6b25lX3RvX3BzdChkYXRlOiBEYXRlKTogRGF0ZSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKGRhdGUudG9VVENTdHJpbmcoKS5yZXBsYWNlKFwiIEdNVFwiLCBcIiBQU1RcIikpO1xufVxuXG4vKipcbiAqIFN0cmlwIHRoZSB0aW1lIGZyb20gYSBEYXRlIG9iamVjdCwga2VlcGluZyBvbmx5IHRoZSBkYXRlLlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIC0gVGhlIERhdGUgb2JqZWN0LlxuICogQHJldHVybnMge0RhdGV9IFRoZSBEYXRlIG9iamVjdCB3aXRoIHRoZSB0aW1lIHN0cmlwcGVkLlxuICovXG5mdW5jdGlvbiBzdHJpcF9kYXRldGltZV90b19kYXRlKGRhdGU6IERhdGUpOiBEYXRlIHtcbiAgICByZXR1cm4gbmV3IERhdGUoXG4gICAgICAgIGRhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKFwiZW4tVVNcIiwge3RpbWVab25lOiBcIkFtZXJpY2EvTG9zX0FuZ2VsZXNcIn0pXG4gICAgKTtcbn1cblxuLyoqXG4gKiBTYW5pdGl6ZSBhIGRhdGUgYnkgY29udmVydGluZyBpdCBmcm9tIGFuIEV4Y2VsIGRhdGUgYW5kIHN0cmlwcGluZyB0aGUgdGltZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBkYXRlIC0gVGhlIEV4Y2VsIGRhdGUuXG4gKiBAcmV0dXJucyB7RGF0ZX0gVGhlIHNhbml0aXplZCBEYXRlIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gc2FuaXRpemVfZGF0ZShkYXRlOiBudW1iZXIpOiBEYXRlIHtcbiAgICByZXR1cm4gc3RyaXBfZGF0ZXRpbWVfdG9fZGF0ZShcbiAgICAgICAgY2hhbmdlX3RpbWV6b25lX3RvX3BzdChleGNlbF9kYXRlX3RvX2pzX2RhdGUoZGF0ZSkpXG4gICAgKTtcbn1cblxuLyoqXG4gKiBGb3JtYXQgYSBEYXRlIG9iamVjdCBmb3IgdXNlIGluIGEgc3ByZWFkc2hlZXQgdmFsdWUuXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgLSBUaGUgRGF0ZSBvYmplY3QuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIGRhdGUgc3RyaW5nIGluIFBTVFxuICovXG5mdW5jdGlvbiBmb3JtYXRfZGF0ZV9mb3Jfc3ByZWFkc2hlZXRfdmFsdWUoZGF0ZTogRGF0ZSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGRhdGVcbiAgICAgICAgLnRvTG9jYWxlRGF0ZVN0cmluZyhcImVuLVVTXCIsIHt0aW1lWm9uZTogXCJBbWVyaWNhL0xvc19BbmdlbGVzXCJ9KVxuICAgICAgICAuc3BsaXQoXCIvXCIpXG4gICAgICAgIC5tYXAoKHgpID0+IHgucGFkU3RhcnQoMiwgXCIwXCIpKVxuICAgICAgICAuam9pbihcIlwiKTtcbn1cblxuLyoqXG4gKiBGaWx0ZXIgYSBsaXN0IHRvIGluY2x1ZGUgb25seSBpdGVtcyB0aGF0IGVuZCB3aXRoIGEgc3BlY2lmaWMgZGF0ZS5cbiAqIEBwYXJhbSB7YW55W119IGxpc3QgLSBUaGUgbGlzdCB0byBmaWx0ZXIuXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgLSBUaGUgZGF0ZSB0byBmaWx0ZXIgYnkuXG4gKiBAcmV0dXJucyB7YW55W119IFRoZSBmaWx0ZXJlZCBsaXN0LlxuICovXG5mdW5jdGlvbiBmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9kYXRlKGxpc3Q6IGFueVtdLCBkYXRlOiBEYXRlKTogYW55W10ge1xuICAgIGNvbnN0IGRhdGVzdHIgPSBmb3JtYXRfZGF0ZV9mb3Jfc3ByZWFkc2hlZXRfdmFsdWUoZGF0ZSk7XG4gICAgcmV0dXJuIGxpc3QubWFwKCh4KSA9PiB4Py50b1N0cmluZygpKS5maWx0ZXIoKHgpID0+IHg/LmVuZHNXaXRoKGRhdGVzdHIpKTtcbn1cblxuLyoqXG4gKiBGaWx0ZXIgYSBsaXN0IHRvIGluY2x1ZGUgb25seSBpdGVtcyB0aGF0IGVuZCB3aXRoIHRoZSBjdXJyZW50IGRhdGUuXG4gKiBAcGFyYW0ge2FueVtdfSBsaXN0IC0gVGhlIGxpc3QgdG8gZmlsdGVyLlxuICogQHJldHVybnMge2FueVtdfSBUaGUgZmlsdGVyZWQgbGlzdC5cbiAqL1xuZnVuY3Rpb24gZmlsdGVyX2xpc3RfdG9fZW5kc3dpdGhfY3VycmVudF9kYXkobGlzdDogYW55W10pOiBhbnlbXSB7XG4gICAgcmV0dXJuIGZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2RhdGUobGlzdCwgbmV3IERhdGUoKSk7XG59XG5cbmV4cG9ydCB7XG4gICAgc2FuaXRpemVfZGF0ZSxcbiAgICBleGNlbF9kYXRlX3RvX2pzX2RhdGUsXG4gICAgY2hhbmdlX3RpbWV6b25lX3RvX3BzdCxcbiAgICBzdHJpcF9kYXRldGltZV90b19kYXRlLFxuICAgIGZvcm1hdF9kYXRlX2Zvcl9zcHJlYWRzaGVldF92YWx1ZSxcbiAgICBmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9kYXRlLFxuICAgIGZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2N1cnJlbnRfZGF5LFxufTsiLCJpbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCAnQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlcyc7XG5cbi8qKlxuICogTG9hZCBjcmVkZW50aWFscyBmcm9tIGEgSlNPTiBmaWxlLlxuICogQHJldHVybnMge2FueX0gVGhlIHBhcnNlZCBjcmVkZW50aWFscyBmcm9tIHRoZSBKU09OIGZpbGUuXG4gKi9cbmZ1bmN0aW9uIGxvYWRfY3JlZGVudGlhbHNfZmlsZXMoKTogYW55IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShcbiAgICAgICAgZnNcbiAgICAgICAgICAgIC5yZWFkRmlsZVN5bmMoUnVudGltZS5nZXRBc3NldHMoKVtcIi9jcmVkZW50aWFscy5qc29uXCJdLnBhdGgpXG4gICAgICAgICAgICAudG9TdHJpbmcoKVxuICAgICk7XG59XG5cbi8qKlxuICogR2V0IHRoZSBwYXRoIHRvIHRoZSBzZXJ2aWNlIGNyZWRlbnRpYWxzIGZpbGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgcGF0aCB0byB0aGUgc2VydmljZSBjcmVkZW50aWFscyBmaWxlLlxuICovXG5mdW5jdGlvbiBnZXRfc2VydmljZV9jcmVkZW50aWFsc19wYXRoKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFJ1bnRpbWUuZ2V0QXNzZXRzKClbXCIvc2VydmljZS1jcmVkZW50aWFscy5qc29uXCJdLnBhdGg7XG59XG5cbmV4cG9ydCB7IGxvYWRfY3JlZGVudGlhbHNfZmlsZXMsIGdldF9zZXJ2aWNlX2NyZWRlbnRpYWxzX3BhdGggfTsiLCJpbXBvcnQge3NoZWV0c192NH0gZnJvbSBcImdvb2dsZWFwaXNcIjtcbmltcG9ydCB7ZXhjZWxfcm93X3RvX2luZGV4fSBmcm9tIFwiLi91dGlsXCI7XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGEgR29vZ2xlIFNoZWV0cyBzcHJlYWRzaGVldCB0YWIuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiIHtcbiAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyB8IG51bGw7XG4gICAgc2hlZXRfaWQ6IHN0cmluZztcbiAgICBzaGVldF9uYW1lOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYi5cbiAgICAgKiBAcGFyYW0ge3NoZWV0c192NC5TaGVldHMgfCBudWxsfSBzaGVldHNfc2VydmljZSAtIFRoZSBHb29nbGUgU2hlZXRzIEFQSSBzZXJ2aWNlIGluc3RhbmNlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaGVldF9pZCAtIFRoZSBJRCBvZiB0aGUgR29vZ2xlIFNoZWV0cyBzcHJlYWRzaGVldC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2hlZXRfbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBzaGVldCB0YWIuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzIHwgbnVsbCxcbiAgICAgICAgc2hlZXRfaWQ6IHN0cmluZyxcbiAgICAgICAgc2hlZXRfbmFtZTogc3RyaW5nXG4gICAgKSB7XG4gICAgICAgIHRoaXMuc2hlZXRzX3NlcnZpY2UgPSBzaGVldHNfc2VydmljZTtcbiAgICAgICAgdGhpcy5zaGVldF9pZCA9IHNoZWV0X2lkO1xuICAgICAgICB0aGlzLnNoZWV0X25hbWUgPSBzaGVldF9uYW1lLnNwbGl0KFwiIVwiKVswXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdmFsdWVzIGZyb20gdGhlIHNoZWV0LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbH0gW3JhbmdlXSAtIFRoZSByYW5nZSB0byBnZXQgdmFsdWVzIGZyb20uXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55W11bXSB8IHVuZGVmaW5lZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSB2YWx1ZXMgZnJvbSB0aGUgc2hlZXQuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3ZhbHVlcyhyYW5nZT86IHN0cmluZyB8IG51bGwpOiBQcm9taXNlPGFueVtdW10gfCB1bmRlZmluZWQ+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5fZ2V0X3ZhbHVlcyhyYW5nZSk7XG4gICAgICAgIHJldHVybiByZXN1bHQuZGF0YS52YWx1ZXMgPz8gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgcm93IGZvciBhIHNwZWNpZmljIHBhdHJvbGxlci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0cm9sbGVyX25hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcGF0cm9sbGVyLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lX2NvbHVtbiAtIFRoZSBjb2x1bW4gd2hlcmUgdGhlIHBhdHJvbGxlcidzIG5hbWUgaXMgbG9jYXRlZC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bGx9IFtyYW5nZV0gLSBUaGUgcmFuZ2UgdG8gc2VhcmNoIHdpdGhpbi5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx7IHJvdzogYW55W107IGluZGV4OiBudW1iZXI7IH0gfCBudWxsPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIHJvdyBhbmQgaW5kZXggb2YgdGhlIHBhdHJvbGxlciwgb3IgbnVsbCBpZiBub3QgZm91bmQuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3NoZWV0X3Jvd19mb3JfcGF0cm9sbGVyKFxuICAgICAgICBwYXRyb2xsZXJfbmFtZTogc3RyaW5nLFxuICAgICAgICBuYW1lX2NvbHVtbjogc3RyaW5nLFxuICAgICAgICByYW5nZT86IHN0cmluZyB8IG51bGxcbiAgICApOiBQcm9taXNlPHsgcm93OiBhbnlbXTsgaW5kZXg6IG51bWJlcjsgfSB8IG51bGw+IHtcbiAgICAgICAgY29uc3Qgcm93cyA9IGF3YWl0IHRoaXMuZ2V0X3ZhbHVlcyhyYW5nZSk7XG4gICAgICAgIGlmIChyb3dzKSB7XG4gICAgICAgICAgICBjb25zdCBsb29rdXBfaW5kZXggPSBleGNlbF9yb3dfdG9faW5kZXgobmFtZV9jb2x1bW4pO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJvd3NbaV1bbG9va3VwX2luZGV4XSA9PT0gcGF0cm9sbGVyX25hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgcm93OiByb3dzW2ldLCBpbmRleDogaSB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgYENvdWxkbid0IGZpbmQgcGF0cm9sbGVyICR7cGF0cm9sbGVyX25hbWV9IGluIHNoZWV0ICR7dGhpcy5zaGVldF9uYW1lfS5gXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB2YWx1ZXMgaW4gdGhlIHNoZWV0LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByYW5nZSAtIFRoZSByYW5nZSB0byB1cGRhdGUuXG4gICAgICogQHBhcmFtIHthbnlbXVtdfSB2YWx1ZXMgLSBUaGUgdmFsdWVzIHRvIHVwZGF0ZS5cbiAgICAgKi9cbiAgICBhc3luYyB1cGRhdGVfdmFsdWVzKHJhbmdlOiBzdHJpbmcsIHZhbHVlczogYW55W11bXSkge1xuICAgICAgICBjb25zdCB1cGRhdGVNZSA9IChhd2FpdCB0aGlzLl9nZXRfdmFsdWVzKHJhbmdlLCBudWxsKSkuZGF0YTtcblxuICAgICAgICB1cGRhdGVNZS52YWx1ZXMgPSB2YWx1ZXM7XG4gICAgICAgIGF3YWl0IHRoaXMuc2hlZXRzX3NlcnZpY2UhLnNwcmVhZHNoZWV0cy52YWx1ZXMudXBkYXRlKHtcbiAgICAgICAgICAgIHNwcmVhZHNoZWV0SWQ6IHRoaXMuc2hlZXRfaWQsXG4gICAgICAgICAgICB2YWx1ZUlucHV0T3B0aW9uOiBcIlVTRVJfRU5URVJFRFwiLFxuICAgICAgICAgICAgcmFuZ2U6IHVwZGF0ZU1lLnJhbmdlISxcbiAgICAgICAgICAgIHJlcXVlc3RCb2R5OiB1cGRhdGVNZSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHZhbHVlcyBmcm9tIHRoZSBzaGVldCAocHJpdmF0ZSBtZXRob2QpLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbH0gW3JhbmdlXSAtIFRoZSByYW5nZSB0byBnZXQgdmFsdWVzIGZyb20uXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCBudWxsfSBbdmFsdWVSZW5kZXJPcHRpb25dIC0gVGhlIHZhbHVlIHJlbmRlciBvcHRpb24uXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55W11bXT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSB2YWx1ZSByYW5nZS5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgYXN5bmMgX2dldF92YWx1ZXMoXG4gICAgICAgIHJhbmdlPzogc3RyaW5nIHwgbnVsbCxcbiAgICAgICAgdmFsdWVSZW5kZXJPcHRpb246IHN0cmluZyB8IG51bGwgPSBcIlVORk9STUFUVEVEX1ZBTFVFXCJcbiAgICApIHtcbiAgICAgICAgbGV0IGxvb2t1cFJhbmdlID0gdGhpcy5zaGVldF9uYW1lO1xuICAgICAgICBpZiAocmFuZ2UgIT0gbnVsbCkge1xuICAgICAgICAgICAgbG9va3VwUmFuZ2UgPSBsb29rdXBSYW5nZSArIFwiIVwiO1xuXG4gICAgICAgICAgICBpZiAocmFuZ2Uuc3RhcnRzV2l0aChsb29rdXBSYW5nZSkpIHtcbiAgICAgICAgICAgICAgICByYW5nZSA9IHJhbmdlLnN1YnN0cmluZyhsb29rdXBSYW5nZS5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9va3VwUmFuZ2UgPSBsb29rdXBSYW5nZSArIHJhbmdlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBvcHRzOiBzaGVldHNfdjQuUGFyYW1zJFJlc291cmNlJFNwcmVhZHNoZWV0cyRWYWx1ZXMkR2V0ID0ge1xuICAgICAgICAgICAgc3ByZWFkc2hlZXRJZDogdGhpcy5zaGVldF9pZCxcbiAgICAgICAgICAgIHJhbmdlOiBsb29rdXBSYW5nZSxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHZhbHVlUmVuZGVyT3B0aW9uKSB7XG4gICAgICAgICAgICBvcHRzLnZhbHVlUmVuZGVyT3B0aW9uID0gdmFsdWVSZW5kZXJPcHRpb247XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuc2hlZXRzX3NlcnZpY2UhLnNwcmVhZHNoZWV0cy52YWx1ZXMuZ2V0KG9wdHMpO1xuICAgIH1cbn1cbiIsIlxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkX3Bhc3Nlc19zdHJpbmcoXG4gICAgdXNlZDogbnVtYmVyLFxuICAgIHRvdGFsOiBudW1iZXIsXG4gICAgdG9kYXk6IG51bWJlcixcbiAgICBmb3JjZV90b2RheTogYm9vbGVhbiA9IGZhbHNlXG4pIHtcbiAgICBsZXQgbWVzc2FnZSA9IGBZb3UgaGF2ZSB1c2VkICR7dXNlZH0gb2YgJHt0b3RhbH0gZ3Vlc3QgcGFzc2VzIHRoaXMgc2Vhc29uYDtcbiAgICBpZiAoZm9yY2VfdG9kYXkgfHwgdG9kYXkgPiAwKSB7XG4gICAgICAgIG1lc3NhZ2UgKz0gYCAoJHt0b2RheX0gdXNlZCB0b2RheSlgO1xuICAgIH1cbiAgICBtZXNzYWdlICs9IFwiLlwiO1xuICAgIHJldHVybiBtZXNzYWdlO1xufVxuIiwiLyoqXG4gKiBWYWxpZGF0ZXMgaWYgdGhlIHByb3ZpZGVkIHNjb3BlcyBpbmNsdWRlIGFsbCBkZXNpcmVkIHNjb3Blcy5cbiAqIEBwYXJhbSB7c3RyaW5nW119IHNjb3BlcyAtIFRoZSBsaXN0IG9mIHNjb3BlcyB0byB2YWxpZGF0ZS5cbiAqIEBwYXJhbSB7c3RyaW5nW119IGRlc2lyZWRfc2NvcGVzIC0gVGhlIGxpc3Qgb2YgZGVzaXJlZCBzY29wZXMuXG4gKiBAdGhyb3dzIHtFcnJvcn0gVGhyb3dzIGFuIGVycm9yIGlmIGFueSBkZXNpcmVkIHNjb3BlIGlzIG1pc3NpbmcuXG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlX3Njb3BlcyhzY29wZXM6IHN0cmluZ1tdLCBkZXNpcmVkX3Njb3Blczogc3RyaW5nW10pIHtcbiAgICBmb3IgKGNvbnN0IGRlc2lyZWRfc2NvcGUgb2YgZGVzaXJlZF9zY29wZXMpIHtcbiAgICAgICAgaWYgKHNjb3BlcyA9PT0gdW5kZWZpbmVkIHx8ICFzY29wZXMuaW5jbHVkZXMoZGVzaXJlZF9zY29wZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gYE1pc3Npbmcgc2NvcGUgJHtkZXNpcmVkX3Njb3BlfSBpbiByZWNlaXZlZCBzY29wZXM6ICR7c2NvcGVzfWA7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IHt2YWxpZGF0ZV9zY29wZXN9IiwiaW1wb3J0IHsgU2VjdGlvbkNvbmZpZyB9IGZyb20gJy4uL2Vudi9oYW5kbGVyX2NvbmZpZyc7XG5cbi8qKlxuICAgICogQ2xhc3MgZm9yIHNlY3Rpb24gdmFsdWVzLlxuICAgICovXG5jbGFzcyBTZWN0aW9uVmFsdWVzIHtcbiAgICBzZWN0aW9uX2NvbmZpZzogU2VjdGlvbkNvbmZpZ1xuICAgIHNlY3Rpb25zOiBzdHJpbmdbXTtcbiAgICBsb3dlcmNhc2Vfc2VjdGlvbnM6IHN0cmluZ1tdO1xuXG4gICAgY29uc3RydWN0b3Ioc2VjdGlvbl9jb25maWc6IFNlY3Rpb25Db25maWcpIHtcbiAgICAgICAgdGhpcy5zZWN0aW9uX2NvbmZpZyA9IHNlY3Rpb25fY29uZmlnO1xuICAgICAgICB0aGlzLnNlY3Rpb25zID0gc2VjdGlvbl9jb25maWcuU0VDVElPTl9WQUxVRVMuc3BsaXQoJywnKTtcbiAgICAgICAgdGhpcy5sb3dlcmNhc2Vfc2VjdGlvbnMgPSBzZWN0aW9uX2NvbmZpZy5TRUNUSU9OX1ZBTFVFUy50b0xvd2VyQ2FzZSgpLnNwbGl0KCcsJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgc2VjdGlvbiBkZXNjcmlwdGlvbi5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgc2VjdGlvbiBkZXNjcmlwdGlvbi5cbiAgICAqL1xuICAgIGdldF9zZWN0aW9uX2Rlc2NyaXB0aW9uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlY3Rpb25fY29uZmlnLlNFQ1RJT05fVkFMVUVTO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogUGFyc2VzIGEgc2VjdGlvbi5cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5IC0gVGhlIGJvZHkgb2YgdGhlIHJlcXVlc3QuXG4gICAgKiBAcmV0dXJucyB7c3RyaW5nIHwgbnVsbH0gVGhlIHNlY3Rpb24gaWYgaXQgaXMgYSB2YWxpZCBzZWN0aW9uIG9yIG51bGwuXG4gICAgKi9cbiAgICBwYXJzZV9zZWN0aW9uKGJvZHk6IHN0cmluZyB8IG51bGwpOiBzdHJpbmcgfCBudWxsIHtcbiAgICAgICAgaWYgKGJvZHkgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgICByZXR1cm4gdGhpcy5sb3dlcmNhc2Vfc2VjdGlvbnMuaW5jbHVkZXMoYm9keS50b0xvd2VyQ2FzZSgpKSA/IGJvZHkgOiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogTWFwcyBhIGxvd2VyIGNhc2UgdmVyc2lvbiBvZiBhIHNlY3Rpb24gc3RyaW5nIHRvIHRoZSBvcmlnaW5hbCBjYXNlIHZhbHVlLlxuICAgICogQHBhcmFtIHtzdHJpbmd9IHNlY3Rpb24gLSBUaGUgbG93ZXIgY2FzZSBzZWN0aW9uIHN0cmluZy5cbiAgICAqIEByZXR1cm5zIHtzdHJpbmcgfSBUaGUgb3JpZ2luYWwgY2FzZSB2YWx1ZSBpZiBmb3VuZCwgb3RoZXJ3aXNlIG51bGwuXG4gICAgKi9cbiAgIG1hcF9zZWN0aW9uKHNlY3Rpb246IHN0cmluZyB8IG51bGwpOiBzdHJpbmcgIHtcbiAgICAgICBpZiAoc2VjdGlvbiA9PT0gbnVsbCkge1xuICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICB9XG4gICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmxvd2VyY2FzZV9zZWN0aW9ucy5pbmRleE9mKHNlY3Rpb24udG9Mb3dlckNhc2UoKSk7XG4gICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICByZXR1cm4gdGhpcy5zZWN0aW9uc1tpbmRleF07XG4gICAgICAgfVxuICAgICAgIHJldHVybiBcIlwiO1xuICAgfVxuXG59XG5cbmV4cG9ydCB7IFNlY3Rpb25WYWx1ZXMgfTsiLCIvKipcbiAqIENvbnZlcnQgcm93IGFuZCBjb2x1bW4gbnVtYmVycyB0byBhbiBFeGNlbC1saWtlIGluZGV4LlxuICogQHBhcmFtIHtudW1iZXJ9IHJvdyAtIFRoZSByb3cgbnVtYmVyICgwLWJhc2VkKS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBjb2wgLSBUaGUgY29sdW1uIG51bWJlciAoMC1iYXNlZCkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgRXhjZWwtbGlrZSBpbmRleCAoZS5nLiwgXCJBMVwiKS5cbiAqL1xuZnVuY3Rpb24gcm93X2NvbF90b19leGNlbF9pbmRleChyb3c6IG51bWJlciwgY29sOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGxldCBjb2xTdHJpbmcgPSBcIlwiO1xuICAgIGNvbCArPSAxO1xuICAgIHdoaWxlIChjb2wgPiAwKSB7XG4gICAgICAgIGNvbCAtPSAxO1xuICAgICAgICBjb25zdCBtb2R1bG8gPSBjb2wgJSAyNjtcbiAgICAgICAgY29uc3QgY29sTGV0dGVyID0gU3RyaW5nLmZyb21DaGFyQ29kZSgnQScuY2hhckNvZGVBdCgwKSArIG1vZHVsbyk7XG4gICAgICAgIGNvbFN0cmluZyA9IGNvbExldHRlciArIGNvbFN0cmluZztcbiAgICAgICAgY29sID0gTWF0aC5mbG9vcihjb2wgLyAyNik7XG4gICAgfVxuICAgIHJldHVybiBjb2xTdHJpbmcgKyAocm93ICsgMSkudG9TdHJpbmcoKTtcbn1cblxuLyoqXG4gKiBTcGxpdCBhbiBFeGNlbC1saWtlIGluZGV4IGludG8gcm93IGFuZCBjb2x1bW4gbnVtYmVycy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBleGNlbF9pbmRleCAtIFRoZSBFeGNlbC1saWtlIGluZGV4IChlLmcuLCBcIkExXCIpLlxuICogQHJldHVybnMge1tudW1iZXIsIG51bWJlcl19IEFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIHJvdyBhbmQgY29sdW1uIG51bWJlcnMgKDAtYmFzZWQpLlxuICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBpbmRleCBjYW5ub3QgYmUgcGFyc2VkLlxuICovXG5mdW5jdGlvbiBzcGxpdF90b19yb3dfY29sKGV4Y2VsX2luZGV4OiBzdHJpbmcpOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoXCJeKFtBLVphLXpdKykoWzAtOV0rKSRcIik7XG4gICAgY29uc3QgbWF0Y2ggPSByZWdleC5leGVjKGV4Y2VsX2luZGV4KTtcbiAgICBpZiAobWF0Y2ggPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gcGFyc2Ugc3RyaW5nIGZvciBleGNlbCBwb3NpdGlvbiBzcGxpdFwiKTtcbiAgICB9XG4gICAgY29uc3QgY29sID0gZXhjZWxfcm93X3RvX2luZGV4KG1hdGNoWzFdKTtcbiAgICBjb25zdCByYXdfcm93ID0gTnVtYmVyKG1hdGNoWzJdKTtcbiAgICBpZiAocmF3X3JvdyA8IDEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUm93IG11c3QgYmUgPj0xXCIpO1xuICAgIH1cbiAgICByZXR1cm4gW3Jhd19yb3cgLSAxLCBjb2xdO1xufVxuXG4vKipcbiAqIExvb2sgdXAgYSB2YWx1ZSBpbiBhIHNoZWV0IGJ5IGl0cyBFeGNlbC1saWtlIGluZGV4LlxuICogQHBhcmFtIHtzdHJpbmd9IGV4Y2VsX2luZGV4IC0gVGhlIEV4Y2VsLWxpa2UgaW5kZXggKGUuZy4sIFwiQTFcIikuXG4gKiBAcGFyYW0ge2FueVtdW119IHNoZWV0IC0gVGhlIHNoZWV0IGRhdGEuXG4gKiBAcmV0dXJucyB7YW55fSBUaGUgdmFsdWUgYXQgdGhlIHNwZWNpZmllZCBpbmRleCwgb3IgdW5kZWZpbmVkIGlmIG5vdCBmb3VuZC5cbiAqL1xuZnVuY3Rpb24gbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQoZXhjZWxfaW5kZXg6IHN0cmluZywgc2hlZXQ6IGFueVtdW10pOiBhbnkge1xuICAgIGNvbnN0IFtyb3csIGNvbF0gPSBzcGxpdF90b19yb3dfY29sKGV4Y2VsX2luZGV4KTtcbiAgICBpZiAocm93ID49IHNoZWV0Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gc2hlZXRbcm93XVtjb2xdO1xufVxuXG4vKipcbiAqIENvbnZlcnQgRXhjZWwtbGlrZSBjb2x1bW4gbGV0dGVycyB0byBhIGNvbHVtbiBudW1iZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gbGV0dGVycyAtIFRoZSBjb2x1bW4gbGV0dGVycyAoZS5nLiwgXCJBXCIpLlxuICogQHJldHVybnMge251bWJlcn0gVGhlIGNvbHVtbiBudW1iZXIgKDAtYmFzZWQpLlxuICovXG5mdW5jdGlvbiBleGNlbF9yb3dfdG9faW5kZXgobGV0dGVyczogc3RyaW5nKTogbnVtYmVyIHtcbiAgICBjb25zdCBsb3dlckxldHRlcnMgPSBsZXR0ZXJzLnRvTG93ZXJDYXNlKCk7XG4gICAgbGV0IHJlc3VsdDogbnVtYmVyID0gMDtcbiAgICBmb3IgKGxldCBwID0gMDsgcCA8IGxvd2VyTGV0dGVycy5sZW5ndGg7IHArKykge1xuICAgICAgICBjb25zdCBjaGFyYWN0ZXJWYWx1ZSA9XG4gICAgICAgICAgICBsb3dlckxldHRlcnMuY2hhckNvZGVBdChwKSAtIFwiYVwiLmNoYXJDb2RlQXQoMCkgKyAxO1xuICAgICAgICByZXN1bHQgPSBjaGFyYWN0ZXJWYWx1ZSArIHJlc3VsdCAqIDI2O1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0IC0gMTtcbn1cblxuLyoqXG4gKiBQYXJzZSBhIEdvb2dsZSBTaGVldHMgY2hlY2tib3gvYm9vbGVhbiBjZWxsIHZhbHVlIGFzIGEgYm9vbGVhbi5cbiAqIEFjY2VwdHMgSlMgYm9vbGVhbiB0cnVlL2ZhbHNlIGFuZCBzdHJpbmcgbGl0ZXJhbHMgXCJUUlVFXCIvXCJGQUxTRVwiXG4gKiAoY2FzZS1pbnNlbnNpdGl2ZSkgZnJvbSBTaGVldHMsICBkZXBlbmRpbmcgb24gdGhlIGNlbGwgZm9ybWF0dGluZy5cbiAqIEFueSB2YWx1ZSB0aGF0IGNhbm5vdCBiZSByZWNvZ25pemVkIGFzIHRydWUgaXMgY29uc2lkZXJlZCBmYWxzZS5cbiAqIEBwYXJhbSB7YW55fSB2YWx1ZSAtIFJhdyBjZWxsIHZhbHVlLlxuICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgb25seSB3aGVuIHZhbHVlIGlzIHRydWUgb3IgXCJUUlVFXCIgKGNhc2UtaW5zZW5zaXRpdmUpLlxuICovXG5mdW5jdGlvbiBwYXJzZV9ib29sZWFuX2NlbGwodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiB2YWx1ZS50b1VwcGVyQ2FzZSgpID09PSBcIlRSVUVcIjtcbn1cblxuLyoqXG4gKiBTYW5pdGl6ZSBhIHBob25lIG51bWJlciBieSByZW1vdmluZyB1bndhbnRlZCBjaGFyYWN0ZXJzLlxuICogQHBhcmFtIHtudW1iZXIgfCBzdHJpbmd9IG51bWJlciAtIFRoZSBwaG9uZSBudW1iZXIgdG8gc2FuaXRpemUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgc2FuaXRpemVkIHBob25lIG51bWJlci5cbiAqL1xuZnVuY3Rpb24gc2FuaXRpemVfcGhvbmVfbnVtYmVyKG51bWJlcjogbnVtYmVyIHwgc3RyaW5nKTogc3RyaW5nIHtcbiAgICBsZXQgbmV3X251bWJlciA9IG51bWJlci50b1N0cmluZygpO1xuICAgIG5ld19udW1iZXIgPSBuZXdfbnVtYmVyLnJlcGxhY2UoXCJ3aGF0c2FwcDpcIiwgXCJcIik7XG4gICAgbGV0IHRlbXBvcmFyeV9uZXdfbnVtYmVyOiBzdHJpbmcgPSBcIlwiO1xuICAgIHdoaWxlICh0ZW1wb3JhcnlfbmV3X251bWJlciAhPSBuZXdfbnVtYmVyKSB7XG4gICAgICAgIC8vIERvIHRoaXMgbXVsdGlwbGUgdGltZXMgc28gd2UgZ2V0IGFsbCArMSBhdCB0aGUgc3RhcnQgb2YgdGhlIHN0cmluZywgZXZlbiBhZnRlciBzdHJpcHBpbmcuXG4gICAgICAgIHRlbXBvcmFyeV9uZXdfbnVtYmVyID0gbmV3X251bWJlcjtcbiAgICAgICAgbmV3X251bWJlciA9IG5ld19udW1iZXIucmVwbGFjZSgvKF5cXCsxfFxcKHxcXCl8XFwufC0pL2csIFwiXCIpO1xuICAgIH1cbiAgICBjb25zdCByZXN1bHQgPSBTdHJpbmcocGFyc2VJbnQobmV3X251bWJlcikpLnBhZFN0YXJ0KDEwLCBcIjBcIik7XG4gICAgaWYgKHJlc3VsdC5sZW5ndGggPT0gMTEgJiYgcmVzdWx0WzBdID09IFwiMVwiKSB7XG4gICAgICAgIHJldHVybiByZXN1bHQuc3Vic3RyaW5nKDEpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEZvcm1hdHMgYSAxMC1kaWdpdCBwaG9uZSBudW1iZXIgc3RyaW5nIGFzIChYWFgpWFhYLVhYWFggZm9yIGRpc3BsYXkuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGVuX2RpZ2l0cyAtIEEgMTAtZGlnaXQgcGhvbmUgbnVtYmVyIHN0cmluZyAoZS5nLiBcIjEyMzQ1Njc4OTBcIikuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHBob25lIG51bWJlciAoZS5nLiBcIigxMjMpNDU2LTc4OTBcIikuXG4gKi9cbmZ1bmN0aW9uIGZvcm1hdF9waG9uZV9mb3JfZGlzcGxheSh0ZW5fZGlnaXRzOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBgKCR7dGVuX2RpZ2l0cy5zdWJzdHJpbmcoMCwgMyl9KSR7dGVuX2RpZ2l0cy5zdWJzdHJpbmcoMywgNil9LSR7dGVuX2RpZ2l0cy5zdWJzdHJpbmcoNiwgMTApfWA7XG59XG5cbmV4cG9ydCB7XG4gICAgcm93X2NvbF90b19leGNlbF9pbmRleCxcbiAgICBleGNlbF9yb3dfdG9faW5kZXgsXG4gICAgc2FuaXRpemVfcGhvbmVfbnVtYmVyLFxuICAgIHNwbGl0X3RvX3Jvd19jb2wsXG4gICAgbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQsXG4gICAgcGFyc2VfYm9vbGVhbl9jZWxsLFxuICAgIGZvcm1hdF9waG9uZV9mb3JfZGlzcGxheVxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJnb29nbGVhcGlzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNtcy1zZWdtZW50cy1jYWxjdWxhdG9yXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbmNvbnN0IF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0Y29uc3QgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdGNvbnN0IG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHRjb25zdCBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0Y29uc3QgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIvdmFsdWUgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSk7IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIkB0d2lsaW8tbGFicy9zZXJ2ZXJsZXNzLXJ1bnRpbWUtdHlwZXNcIjtcbmltcG9ydCB7XG4gICAgQ29udGV4dCxcbiAgICBTZXJ2ZXJsZXNzQ2FsbGJhY2ssXG4gICAgU2VydmVybGVzc0V2ZW50T2JqZWN0LFxuICAgIFNlcnZlcmxlc3NGdW5jdGlvblNpZ25hdHVyZSxcbn0gZnJvbSBcIkB0d2lsaW8tbGFicy9zZXJ2ZXJsZXNzLXJ1bnRpbWUtdHlwZXMvdHlwZXNcIjtcbmltcG9ydCBCVk5TUEhhbmRsZXIsIHsgQlZOU1BFdmVudCB9IGZyb20gXCIuL2J2bnNwX2hhbmRsZXJcIjtcbmltcG9ydCB7IEhhbmRsZXJFbnZpcm9ubWVudCB9IGZyb20gXCIuLi9lbnYvaGFuZGxlcl9jb25maWdcIjtcblxuY29uc3QgTkVYVF9TVEVQX0NPT0tJRV9OQU1FID0gXCJidm5zcF9uZXh0X3N0ZXBcIjtcblxuLyoqXG4gKiBUd2lsaW8gU2VydmVybGVzcyBmdW5jdGlvbiBoYW5kbGVyIGZvciBCVk5TUCBib3QgY29tbWFuZHMuXG4gKiBAcGFyYW0ge0NvbnRleHQ8SGFuZGxlckVudmlyb25tZW50Pn0gY29udGV4dCAtIFRoZSBUd2lsaW8gc2VydmVybGVzcyBjb250ZXh0LlxuICogQHBhcmFtIHtTZXJ2ZXJsZXNzRXZlbnRPYmplY3Q8QlZOU1BFdmVudD59IGV2ZW50IC0gVGhlIGV2ZW50IG9iamVjdC5cbiAqIEBwYXJhbSB7U2VydmVybGVzc0NhbGxiYWNrfSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbi5cbiAqL1xuZXhwb3J0IGNvbnN0IGhhbmRsZXI6IFNlcnZlcmxlc3NGdW5jdGlvblNpZ25hdHVyZTxcbiAgICBIYW5kbGVyRW52aXJvbm1lbnQsXG4gICAgQlZOU1BFdmVudFxuPiA9IGFzeW5jIGZ1bmN0aW9uIChcbiAgICBjb250ZXh0OiBDb250ZXh0PEhhbmRsZXJFbnZpcm9ubWVudD4sXG4gICAgZXZlbnQ6IFNlcnZlcmxlc3NFdmVudE9iamVjdDxCVk5TUEV2ZW50PixcbiAgICBjYWxsYmFjazogU2VydmVybGVzc0NhbGxiYWNrXG4pIHtcbiAgICBjb25zdCBoYW5kbGVyID0gbmV3IEJWTlNQSGFuZGxlcihjb250ZXh0LCBldmVudCk7XG4gICAgbGV0IG1lc3NhZ2U6IHN0cmluZztcbiAgICBsZXQgbmV4dF9zdGVwOiBzdHJpbmcgPSBcIlwiO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXJfcmVzcG9uc2UgPSBhd2FpdCBoYW5kbGVyLmhhbmRsZSgpO1xuICAgICAgICBtZXNzYWdlID1cbiAgICAgICAgICAgIGhhbmRsZXJfcmVzcG9uc2UucmVzcG9uc2UgfHxcbiAgICAgICAgICAgIFwiVW5leHBlY3RlZCByZXN1bHQgLSBubyByZXNwb25zZSBkZXRlcm1pbmVkXCI7XG4gICAgICAgIG5leHRfc3RlcCA9IGhhbmRsZXJfcmVzcG9uc2UubmV4dF9zdGVwIHx8IFwiXCI7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkFuIGVycm9yIG9jY3VyZWRcIik7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlKSk7XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIH1cbiAgICAgICAgbWVzc2FnZSA9IFwiQW4gdW5leHBlY3RlZCBlcnJvciBvY2N1cmVkLlwiO1xuICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICBtZXNzYWdlICs9IFwiXFxuXCIgKyBlLm1lc3NhZ2U7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yXCIsIGUuc3RhY2spO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvclwiLCBlLm5hbWUpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvclwiLCBlLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBuZXcgVHdpbGlvLlJlc3BvbnNlKCk7XG4gICAgY29uc3QgdHdpbWwgPSBuZXcgVHdpbGlvLnR3aW1sLk1lc3NhZ2luZ1Jlc3BvbnNlKCk7XG5cbiAgICB0d2ltbC5tZXNzYWdlKG1lc3NhZ2UpO1xuXG4gICAgcmVzcG9uc2VcbiAgICAgICAgLy8gQWRkIHRoZSBzdHJpbmdpZmllZCBUd2lNTCB0byB0aGUgcmVzcG9uc2UgYm9keVxuICAgICAgICAuc2V0Qm9keSh0d2ltbC50b1N0cmluZygpKVxuICAgICAgICAvLyBTaW5jZSB3ZSdyZSByZXR1cm5pbmcgVHdpTUwsIHRoZSBjb250ZW50IHR5cGUgbXVzdCBiZSBYTUxcbiAgICAgICAgLmFwcGVuZEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcInRleHQveG1sXCIpXG4gICAgICAgIC5zZXRDb29raWUoTkVYVF9TVEVQX0NPT0tJRV9OQU1FLCBuZXh0X3N0ZXApO1xuXG4gICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlKTtcbn07Il0sIm5hbWVzIjpbIkNoZWNraW5WYWx1ZSIsInVzZXJfY3JlZHNfY29uZmlnIiwiTlNQX0VNQUlMX0RPTUFJTiIsImZpbmRfcGF0cm9sbGVyX2NvbmZpZyIsIlNIRUVUX0lEIiwiUEhPTkVfTlVNQkVSX0xPT0tVUF9TSEVFVCIsIlBIT05FX05VTUJFUl9OQU1FX0NPTFVNTiIsIlBIT05FX05VTUJFUl9OVU1CRVJfQ09MVU1OIiwibG9naW5fc2hlZXRfY29uZmlnIiwiTE9HSU5fU0hFRVRfTE9PS1VQIiwiQ0hFQ0tJTl9DT1VOVF9MT09LVVAiLCJTSEVFVF9EQVRFX0NFTEwiLCJDVVJSRU5UX0RBVEVfQ0VMTCIsIkFSQ0hJVkVEX0NFTEwiLCJOQU1FX0NPTFVNTiIsIkNBVEVHT1JZX0NPTFVNTiIsIlNFQ1RJT05fRFJPUERPV05fQ09MVU1OIiwiQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU4iLCJzZWFzb25fc2hlZXRfY29uZmlnIiwiU0VBU09OX1NIRUVUIiwiU0VBU09OX1NIRUVUX05BTUVfQ09MVU1OIiwiU0VBU09OX1NIRUVUX0RBWVNfQ09MVU1OIiwic2VjdGlvbl9jb25maWciLCJTRUNUSU9OX1ZBTFVFUyIsImd1ZXN0X3Bhc3Nlc19jb25maWciLCJHVUVTVF9QQVNTX1NIRUVUIiwiR1VFU1RfUEFTU19FTElHSUJMRV9DT0xVTU4iLCJHVUVTVF9QQVNTX0VMSUdJQkxFX1JFQVNPTl9DT0xVTU4iLCJHVUVTVF9QQVNTX1NIRUVUX05BTUVfQ09MVU1OIiwiR1VFU1RfUEFTU19TSEVFVF9BVkFJTEFCTEVfQ09MVU1OIiwiR1VFU1RfUEFTU19TSEVFVF9VU0VEX1RPREFZX0NPTFVNTiIsIkdVRVNUX1BBU1NfU0hFRVRfVVNFRF9TRUFTT05fQ09MVU1OIiwiR1VFU1RfUEFTU19TSEVFVF9EQVRFU19TVEFSVElOR19DT0xVTU4iLCJzbGVkX2JlYWNvbl9zaGVldF9jb25maWciLCJTTEVEX0JFQUNPTl9TSEVFVCIsIlNMRURfQkVBQ09OX1NIRUVUX05BTUVfQ09MVU1OIiwiQkVBQ09OX1NFQVJDSF9DT1VOVF9DT0xVTU4iLCJCRUFDT05fRklORF9EQVRFU19TVEFSVElOR19DT0xVTU4iLCJoYW5kbGVyX2NvbmZpZyIsIlNDUklQVF9JRCIsIlNZTkNfU0lEIiwiQVJDSElWRV9GVU5DVElPTl9OQU1FIiwiUkVTRVRfRlVOQ1RJT05fTkFNRSIsIlVTRV9TRVJWSUNFX0FDQ09VTlQiLCJBQ1RJT05fTE9HX1NIRUVUIiwiQ0hFQ0tJTl9WQUxVRVMiLCJDT05GSUciLCJnb29nbGUiLCJMb2dpblNoZWV0IiwiU2Vhc29uU2hlZXQiLCJVc2VyQ3JlZHMiLCJDaGVja2luVmFsdWVzIiwiZ2V0X3NlcnZpY2VfY3JlZGVudGlhbHNfcGF0aCIsImV4Y2VsX3Jvd190b19pbmRleCIsImZvcm1hdF9waG9uZV9mb3JfZGlzcGxheSIsInNhbml0aXplX3Bob25lX251bWJlciIsImJ1aWxkX3Bhc3Nlc19zdHJpbmciLCJHdWVzdFBhc3NTaGVldCIsIlNlY3Rpb25WYWx1ZXMiLCJTbGVkQmVhY29uQ2hlY2tTaGVldCIsIk5FWFRfU1RFUFMiLCJBV0FJVF9DT01NQU5EIiwiQVdBSVRfQ0hFQ0tJTiIsIkNPTkZJUk1fUkVTRVQiLCJBVVRIX1JFU0VUIiwiQVdBSVRfU0VDVElPTiIsIkFXQUlUX1BBU1MiLCJBV0FJVF9NRVNTQUdFIiwiQVdBSVRfQlJPQURDQVNUIiwiQVdBSVRfQkVBQ09OIiwiQ09NTUFORFMiLCJPTl9EVVRZIiwiU1RBVFVTIiwiQ0hFQ0tJTiIsIlNFQ1RJT05fQVNTSUdOTUVOVCIsIkdVRVNUX1BBU1MiLCJXSEFUU0FQUCIsIk1FU1NBR0UiLCJCUk9BRENBU1QiLCJCRUFDT04iLCJTTVNfTUFYX0xFTkdUSCIsIk1FU1NBR0VfUFJFRklYX1RFTVBMQVRFIiwiTUVTU0FHRV9QUkVGSVhfU1VGRklYIiwidmFsaWRhdGVfc21zX21lc3NhZ2UiLCJmdWxsX21lc3NhZ2UiLCJTZWdtZW50ZWRNZXNzYWdlIiwicmVxdWlyZSIsInNlZ21lbnRlZCIsIm5vbl9nc20iLCJnZXROb25Hc21DaGFyYWN0ZXJzIiwibGVuZ3RoIiwidmFsaWQiLCJyZWFzb24iLCJub25fZ3NtX2NoYXJhY3RlcnMiLCJTZXQiLCJzZWdtZW50c0NvdW50Iiwic2VnbWVudHNfY291bnQiLCJCVk5TUEhhbmRsZXIiLCJTQ09QRVMiLCJzbXNfcmVxdWVzdCIsInJlc3VsdF9tZXNzYWdlcyIsImZyb20iLCJ0byIsImJvZHkiLCJib2R5X3JhdyIsInBhdHJvbGxlciIsImJ2bnNwX25leHRfc3RlcCIsImNoZWNraW5fbW9kZSIsImZhc3RfY2hlY2tpbiIsImFzc2lnbmVkX3NlY3Rpb24iLCJ0d2lsaW9fY2xpZW50Iiwic3luY19zaWQiLCJyZXNldF9zY3JpcHRfaWQiLCJzeW5jX2NsaWVudCIsInVzZXJfY3JlZHMiLCJzZXJ2aWNlX2NyZWRzIiwic2hlZXRzX3NlcnZpY2UiLCJ1c2VyX3NjcmlwdHNfc2VydmljZSIsImxvZ2luX3NoZWV0Iiwic2Vhc29uX3NoZWV0IiwiZ3Vlc3RfcGFzc19zaGVldCIsInNsZWRfYmVhY29uX2NoZWNrX3NoZWV0IiwiY2hlY2tpbl92YWx1ZXMiLCJjdXJyZW50X3NoZWV0X2RhdGUiLCJjb21iaW5lZF9jb25maWciLCJjb25maWciLCJzZWN0aW9uX3ZhbHVlcyIsImNvbnRleHQiLCJldmVudCIsIkZyb20iLCJudW1iZXIiLCJ1bmRlZmluZWQiLCJ0ZXN0X251bWJlciIsIlRvIiwiQm9keSIsInRvTG93ZXJDYXNlIiwidHJpbSIsInJlcGxhY2UiLCJyZXF1ZXN0IiwiY29va2llcyIsImdldFR3aWxpb0NsaWVudCIsImUiLCJjb25zb2xlIiwibG9nIiwiRGF0ZSIsInBhcnNlX2Zhc3RfY2hlY2tpbl9tb2RlIiwicGFyc2VkIiwicGFyc2VfZmFzdF9jaGVja2luIiwia2V5IiwicGFyc2VfY2hlY2tpbiIsInBhcnNlX2NoZWNraW5fZnJvbV9uZXh0X3N0ZXAiLCJsYXN0X3NlZ21lbnQiLCJzcGxpdCIsInNsaWNlIiwiYnlfa2V5IiwiZGVsYXkiLCJzZWNvbmRzIiwib3B0aW9uYWwiLCJQcm9taXNlIiwicmVzIiwic2V0VGltZW91dCIsInNlbmRfbWVzc2FnZSIsIm1lc3NhZ2UiLCJnZXRfdHdpbGlvX2NsaWVudCIsIm1lc3NhZ2VzIiwiY3JlYXRlIiwicHVzaCIsImhhbmRsZSIsInJlc3VsdCIsIl9oYW5kbGUiLCJyZXNwb25zZSIsImpvaW4iLCJuZXh0X3N0ZXAiLCJsb2dvdXQiLCJjaGVja191c2VyX2NyZWRzIiwiZ2V0X21hcHBlZF9wYXRyb2xsZXIiLCJhd2FpdF9yZXNwb25zZSIsImhhbmRsZV9hd2FpdF9jb21tYW5kIiwiY2hlY2tpbiIsInN0YXJ0c1dpdGgiLCJuYW1lIiwicmVzZXRfc2hlZXRfZmxvdyIsInNlY3Rpb24iLCJwYXJzZV9zZWN0aW9uIiwiYXNzaWduX3NlY3Rpb24iLCJwcm9tcHRfc2VjdGlvbl9hc3NpZ25tZW50Iiwic2VuZF90ZXh0X21lc3NhZ2UiLCJzZW5kX2Jyb2FkY2FzdF9tZXNzYWdlIiwiYmVhY29uX3NlYXJjaF9sb2NhdGlvbiIsInBhcnNlX2JlYWNvbl9zZWFyY2hfbG9jYXRpb24iLCJzZXRfYmVhY29uX3NlYXJjaCIsInByb21wdF9iZWFjb25fc2VhcmNoIiwicHJvbXB0X2NvbW1hbmQiLCJwYXRyb2xsZXJfbmFtZSIsImluY2x1ZGVzIiwiZ2V0X29uX2R1dHkiLCJnZXRfc3RhdHVzIiwicHJvbXB0X2NoZWNraW4iLCJwcm9tcHRfZ3Vlc3RfcGFzcyIsInBhcnNlX2Zhc3Rfc2VjdGlvbl9hc3NpZ25tZW50IiwicHJvbXB0X21lc3NhZ2UiLCJwcm9tcHRfYnJvYWRjYXN0IiwidHlwZXMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJtYXAiLCJ4Iiwic21zX2Rlc2MiLCJzZWdtZW50cyIsImxhc3RTZWdtZW50IiwicG9wIiwiZmlyc3RQYXJ0IiwibWFwX3NlY3Rpb24iLCJzZWN0aW9uX2Rlc2NyaXB0aW9uIiwiZ2V0X3NlY3Rpb25fZGVzY3JpcHRpb24iLCJnZXRfbWVzc2FnZV9wcmVmaXgiLCJzZW5kZXJfbmFtZSIsInNlbmRlcl9waG9uZSIsImZvcm1hdHRlZF9waG9uZSIsImdldF9tYXhfbWVzc2FnZV9sZW5ndGgiLCJnZXRfbG9naW5fc2hlZXQiLCJyZWNpcGllbnRzIiwiZ2V0X29uX2R1dHlfcGF0cm9sbGVycyIsIm1heF9sZW5ndGgiLCJtZXNzYWdlX3RleHQiLCJwcmVmaXgiLCJ2YWxpZGF0aW9uIiwiYmFkX2NoYXJzIiwic2lnbmVkX2luX3BhdHJvbGxlcnMiLCJwaG9uZV9tYXAiLCJnZXRfcGhvbmVfbnVtYmVyX21hcCIsInJlY2lwaWVudF9tYXAiLCJub19waG9uZV9uYW1lcyIsInBob25lIiwic2VudF9jb3VudCIsImNvcHlfc2VudF90b19zZW5kZXIiLCJmYWlsZWRfbmFtZXMiLCJkZWxpdmVyX3Ntc190b19tYXAiLCJsb2dfYWN0aW9uIiwiYWxsX2ZhaWxlZCIsImVudHJpZXMiLCJub3JtYWxpemVkX3NlbmRlciIsInNlbmRlcl9pbl9tYXAiLCJyZWNpcGllbnRfY291bnQiLCJrZXlzIiwiZ2V0X3NoZWV0c19zZXJ2aWNlIiwib3B0cyIsInNwcmVhZHNoZWV0cyIsImdldCIsInNwcmVhZHNoZWV0SWQiLCJyYW5nZSIsInZhbHVlUmVuZGVyT3B0aW9uIiwiZGF0YSIsInJvdyIsInJhd051bWJlciIsImFzc2lnbmVkU2VjdGlvbiIsIm1hcHBlZF9zZWN0aW9uIiwicmVmcmVzaCIsInNoZWV0IiwiZ2V0X3NsZWRfYmVhY29uX2NoZWNrX3NoZWV0IiwicHJpb3Jfc2VhcmNoZXMiLCJnZXRfYmVhY29uX3NlYXJjaGVzIiwic2V0X2JlYWNvbnNfc2VhcmNoZXMiLCJ1cGRhdGVkIiwic3RhdHVzIiwic2VhcmNoX2NvdW50Iiwic2hlZXRfZGF0ZSIsInRvRGF0ZVN0cmluZyIsImN1cnJlbnRfZGF0ZSIsImlzX2N1cnJlbnQiLCJnZXRfc3RhdHVzX3N0cmluZyIsImd1ZXN0X3Bhc3NfcHJvbWlzZSIsImdldF9ndWVzdF9wYXNzX3NoZWV0IiwiZ2V0X2F2YWlsYWJsZV9hbmRfdXNlZF9wYXNzZXMiLCJwYXRyb2xsZXJfc3RhdHVzIiwiY2hlY2tpbkNvbHVtblNldCIsImNoZWNrZWRPdXQiLCJieV9zaGVldF9zdHJpbmciLCJ0b1N0cmluZyIsImNvbXBsZXRlZFBhdHJvbERheXMiLCJnZXRfc2Vhc29uX3NoZWV0IiwiZ2V0X3BhdHJvbGxlZF9kYXlzIiwiY29tcGxldGVkUGF0cm9sRGF5c1N0cmluZyIsImxvZ2luU2hlZXREYXRlIiwic3RhdHVzU3RyaW5nIiwidXNlZFRvZGF5R3Vlc3RQYXNzZXMiLCJ1c2VkX3RvZGF5IiwidXNlZFNlYXNvbkd1ZXN0UGFzc2VzIiwidXNlZF9zZWFzb24iLCJhdmFpbGFibGVHdWVzdFBhc3NlcyIsImF2YWlsYWJsZSIsInNoZWV0X25lZWRzX3Jlc2V0IiwiRXJyb3IiLCJuZXdfY2hlY2tpbl92YWx1ZSIsInNoZWV0c192YWx1ZSIsImZhc3RfY2hlY2tpbnMiLCJyZXNldF9zaGVldCIsInNjcmlwdF9zZXJ2aWNlIiwiZ2V0X3VzZXJfc2NyaXB0c19zZXJ2aWNlIiwic2hvdWxkX3BlcmZvcm1fYXJjaGl2ZSIsImFyY2hpdmVkIiwic2NyaXB0cyIsInJ1biIsInNjcmlwdElkIiwicmVxdWVzdEJvZHkiLCJmdW5jdGlvbiIsImdldF91c2VyX2NyZWRzIiwibG9hZFRva2VuIiwiYXV0aFVybCIsImdldEF1dGhVcmwiLCJjaGVja2VkX291dF9zZWN0aW9uIiwibGFzdF9zZWN0aW9ucyIsIm9uX2R1dHlfcGF0cm9sbGVycyIsImJ5X3NlY3Rpb24iLCJmaWx0ZXIiLCJyZWR1Y2UiLCJwcmV2IiwiY3VyIiwic2hvcnRfY29kZSIsInJlc3VsdHMiLCJhbGxfa2V5cyIsIm9yZGVyZWRfcHJpbWFyeV9zZWN0aW9ucyIsInNvcnQiLCJmaWx0ZXJlZF9sYXN0X3NlY3Rpb25zIiwib3JkZXJlZF9zZWN0aW9ucyIsImNvbmNhdCIsInBhdHJvbGxlcnMiLCJ5IiwibG9jYWxlQ29tcGFyZSIsInBhdHJvbGxlcl9zdHJpbmciLCJkZXRhaWxzIiwidG9VcHBlckNhc2UiLCJyIiwiYWN0aW9uX25hbWUiLCJhcHBlbmQiLCJ2YWx1ZUlucHV0T3B0aW9uIiwiZGVsZXRlVG9rZW4iLCJnZXRfc3luY19jbGllbnQiLCJzeW5jIiwidjEiLCJzZXJ2aWNlcyIsImdldF9zZXJ2aWNlX2NyZWRzIiwiYXV0aCIsIkdvb2dsZUF1dGgiLCJrZXlGaWxlIiwic2NvcGVzIiwiZ2V0X3ZhbGlkX2NyZWRzIiwicmVxdWlyZV91c2VyX2NyZWRzIiwib2F1dGgyX2NsaWVudCIsInNoZWV0cyIsInZlcnNpb24iLCJzY3JpcHQiLCJmb3JjZSIsInBob25lX2xvb2t1cCIsImZpbmRfcGF0cm9sbGVyX2Zyb21fbnVtYmVyIiwibWFwcGVkUGF0cm9sbGVyIiwidHJ5X2ZpbmRfcGF0cm9sbGVyIiwicmF3X251bWJlciIsImN1cnJlbnROdW1iZXIiLCJjdXJyZW50TmFtZSIsInVzZWRfYW5kX2F2YWlsYWJsZSIsImdldF9wcm9tcHQiLCJzZXRfdXNlZF9ndWVzdF9wYXNzZXMiLCJwYXJzZV9sb2NhdGlvbiIsInJvd19jb2xfdG9fZXhjZWxfaW5kZXgiLCJwYXJzZV9ib29sZWFuX2NlbGwiLCJHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYiIsImZvcm1hdF9kYXRlX2Zvcl9zcHJlYWRzaGVldF92YWx1ZSIsIlVzZWRBbmRBdmFpbGFibGVQYXNzZXMiLCJpbmRleCIsImVsaWdpYmxlIiwiZWxpZ2libGVfcmVhc29uIiwiU3RyaW5nIiwiTnVtYmVyIiwiUGFzc1NoZWV0IiwicGF0cm9sbGVyX3JvdyIsImdldF9zaGVldF9yb3dfZm9yX3BhdHJvbGxlciIsIm5hbWVfY29sdW1uIiwiZWxpZ2libGVfY29sdW1uIiwiZWxpZ2libGVfcmVhc29uX2NvbHVtbiIsImN1cnJlbnRfZGF5X2F2YWlsYWJsZV9wYXNzZXMiLCJhdmFpbGFibGVfY29sdW1uIiwiY3VycmVudF9kYXlfdXNlZF9wYXNzZXMiLCJ1c2VkX3RvZGF5X2NvbHVtbiIsImN1cnJlbnRfc2Vhc29uX3VzZWRfcGFzc2VzIiwidXNlZF9zZWFzb25fY29sdW1uIiwicm93bnVtIiwic3RhcnRfaW5kZXgiLCJwcmlvcl9sZW5ndGgiLCJjdXJyZW50X2RhdGVfc3RyaW5nIiwibmV3X3ZhbHMiLCJ1cGRhdGVfbGVuZ3RoIiwiTWF0aCIsIm1heCIsImVuZF9pbmRleCIsInNoZWV0X25hbWUiLCJ1cGRhdGVfdmFsdWVzIiwibG9va3VwX3Jvd19jb2xfaW5fc2hlZXQiLCJzYW5pdGl6ZV9kYXRlIiwiY2hlY2tpbl9jb3VudF9zaGVldCIsInJvd3MiLCJjaGVja2luX2NvdW50IiwiZ2V0X3ZhbHVlcyIsImkiLCJwYXJzZV9wYXRyb2xsZXJfcm93IiwiZ2V0VGltZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJwYXRyb2xsZXJfc2VjdGlvbiIsIm5ld19zZWN0aW9uX3ZhbHVlIiwiY2F0ZWdvcnkiLCJmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9jdXJyZW50X2RheSIsImN1cnJlbnREYXkiLCJCZWFjb25TZWFyY2hlcyIsImJlYWNvbl9zZWFyY2hfY291bnRfY29sdW1uIiwiZ2V0X3BhdHJvbGxlZF9iZWFjb25fZmluZF9jb3VudCIsInNlYXJjaF9sb2NhdGlvbiIsInJvd19udW0iLCJjbGVhblNtc1ZhbHVlIiwiaW5wdXQiLCJjbGVhbmVkIiwiY2hhckF0Iiwic3Vic3RyaW5nIiwibG9hZF9jcmVkZW50aWFsc19maWxlcyIsInZhbGlkYXRlX3Njb3BlcyIsImRvbWFpbiIsImxvYWRlZCIsImNyZWRlbnRpYWxzIiwiY2xpZW50X3NlY3JldCIsImNsaWVudF9pZCIsInJlZGlyZWN0X3VyaXMiLCJ3ZWIiLCJPQXV0aDIiLCJ0b2tlbl9rZXkiLCJvYXV0aDJEb2MiLCJkb2N1bWVudHMiLCJmZXRjaCIsInRva2VuIiwic2V0Q3JlZGVudGlhbHMiLCJzaWQiLCJyZW1vdmUiLCJjb21wbGV0ZUxvZ2luIiwiY29kZSIsImdldFRva2VuIiwidG9rZW5zIiwib2F1dGhEb2MiLCJ1bmlxdWVOYW1lIiwidXBkYXRlIiwiaWQiLCJnZW5lcmF0ZVJhbmRvbVN0cmluZyIsImRvYyIsInR0bCIsImFjY2Vzc190eXBlIiwic2NvcGUiLCJzdGF0ZSIsImdlbmVyYXRlQXV0aFVybCIsImNoYXJhY3RlcnMiLCJjaGFyYWN0ZXJzTGVuZ3RoIiwiZmxvb3IiLCJyYW5kb20iLCJsb29rdXBfdmFsdWVzIiwiQXJyYXkiLCJzbXNfZGVzY19zcGxpdCIsImxvb2t1cF92YWxzIiwiYnlfbHYiLCJieV9mYyIsImNoZWNraW5WYWx1ZXMiLCJjaGVja2luVmFsdWUiLCJsdiIsImZjIiwiY2hlY2tpbl9sb3dlciIsImV4Y2VsX2RhdGVfdG9fanNfZGF0ZSIsImRhdGUiLCJzZXRVVENNaWxsaXNlY29uZHMiLCJyb3VuZCIsImNoYW5nZV90aW1lem9uZV90b19wc3QiLCJ0b1VUQ1N0cmluZyIsInN0cmlwX2RhdGV0aW1lX3RvX2RhdGUiLCJ0b0xvY2FsZURhdGVTdHJpbmciLCJ0aW1lWm9uZSIsInBhZFN0YXJ0IiwiZmlsdGVyX2xpc3RfdG9fZW5kc3dpdGhfZGF0ZSIsImxpc3QiLCJkYXRlc3RyIiwiZW5kc1dpdGgiLCJmcyIsInBhcnNlIiwicmVhZEZpbGVTeW5jIiwiUnVudGltZSIsImdldEFzc2V0cyIsInBhdGgiLCJzaGVldF9pZCIsIl9nZXRfdmFsdWVzIiwibG9va3VwX2luZGV4IiwidXBkYXRlTWUiLCJsb29rdXBSYW5nZSIsInVzZWQiLCJ0b3RhbCIsInRvZGF5IiwiZm9yY2VfdG9kYXkiLCJkZXNpcmVkX3Njb3BlcyIsImRlc2lyZWRfc2NvcGUiLCJlcnJvciIsInNlY3Rpb25zIiwibG93ZXJjYXNlX3NlY3Rpb25zIiwiaW5kZXhPZiIsImNvbCIsImNvbFN0cmluZyIsIm1vZHVsbyIsImNvbExldHRlciIsImZyb21DaGFyQ29kZSIsImNoYXJDb2RlQXQiLCJzcGxpdF90b19yb3dfY29sIiwiZXhjZWxfaW5kZXgiLCJyZWdleCIsIlJlZ0V4cCIsIm1hdGNoIiwiZXhlYyIsInJhd19yb3ciLCJsZXR0ZXJzIiwibG93ZXJMZXR0ZXJzIiwicCIsImNoYXJhY3RlclZhbHVlIiwidmFsdWUiLCJuZXdfbnVtYmVyIiwidGVtcG9yYXJ5X25ld19udW1iZXIiLCJwYXJzZUludCIsInRlbl9kaWdpdHMiLCJORVhUX1NURVBfQ09PS0lFX05BTUUiLCJoYW5kbGVyIiwiY2FsbGJhY2siLCJoYW5kbGVyX3Jlc3BvbnNlIiwic3RhY2siLCJUd2lsaW8iLCJSZXNwb25zZSIsInR3aW1sIiwiTWVzc2FnaW5nUmVzcG9uc2UiLCJzZXRCb2R5IiwiYXBwZW5kSGVhZGVyIiwic2V0Q29va2llIl0sInNvdXJjZVJvb3QiOiIifQ==