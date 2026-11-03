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
    /**
     * Sanitize input for storage in Google Sheets and Twilio SMS forwartding, by avoiding
     * - Flattens multi-line inputs, tabs, and hidden control characters into single spaces.
     * - Trims and normalizes excessive whitespace.
     * - Strips leading formula injection triggers (=, +, -, @) to prevent cell execution.
     * - Strips emojis, miscellaneous symbols, and transport/map indicators.
     * - Safely truncates text to a maximum character length.
     *
     * @param {string} input - The raw incoming SMS text string.
     * @param {number} maxLength - The maximum allowed visible characters (default: 320).
     * @returns {string} The cleaned, flattened, and safely truncated plaintext string.
     */ cleanSmsValue(input, maxLength = 32) {
        if (!input) return '';
        // 1. Strip line breaks, tabs, and invisible control characters (\x00-\x1F, \x7F)
        let cleaned = input.replace(/[\r\n\t\x00-\x1F\x7F]/g, ' ');
        // 2. Keep ONLY normal characters (Letters, Numbers, Spaces, Hyphens, Slashes)
        // Don't allow emojis,  extended pictographic and other non-standard characters.
        // This instantly vaporizes all emojis, variation selectors, and weird symbols globally.
        cleaned = cleaned.replace(/[^a-zA-Z0-9\s\/\-]/g, '');
        // 3. Collapse multiple spaces into a single space and trim edges
        cleaned = cleaned.replace(/\s+/g, ' ').trim();
        // 4. Remove formula triggers from the beginning of the string
        cleaned = cleaned.replace(/^([=+\-@]+)/, '').trim();
        // 5. Safely truncate using Array.from to handle any remaining multi-byte characters
        const characters = Array.from(cleaned);
        if (characters.length > maxLength) {
            cleaned = characters.slice(0, maxLength).join('');
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFVLElBQUlqYixzREFBWUEsQ0FBQzhCLFNBQVNDO0lBQzFDLElBQUlrQztJQUNKLElBQUlVLFlBQW9CO0lBQ3hCLElBQUk7UUFDQSxNQUFNd1csbUJBQW1CLE1BQU1GLFFBQVEzVyxNQUFNO1FBQzdDTCxVQUNJa1gsaUJBQWlCMVcsUUFBUSxJQUN6QjtRQUNKRSxZQUFZd1csaUJBQWlCeFcsU0FBUyxJQUFJO0lBQzlDLEVBQUUsT0FBTy9CLEdBQUc7UUFDUkMsUUFBUUMsR0FBRyxDQUFDO1FBQ1osSUFBSTtZQUNBRCxRQUFRQyxHQUFHLENBQUN1USxLQUFLQyxTQUFTLENBQUMxUTtRQUMvQixFQUFFLE9BQU07WUFDSkMsUUFBUUMsR0FBRyxDQUFDRjtRQUNoQjtRQUNBcUIsVUFBVTtRQUNWLElBQUlyQixhQUFhdUosT0FBTztZQUNwQmxJLFdBQVcsT0FBT3JCLEVBQUVxQixPQUFPO1lBQzNCcEIsUUFBUUMsR0FBRyxDQUFDLFNBQVNGLEVBQUV3WSxLQUFLO1lBQzVCdlksUUFBUUMsR0FBRyxDQUFDLFNBQVNGLEVBQUV1QyxJQUFJO1lBQzNCdEMsUUFBUUMsR0FBRyxDQUFDLFNBQVNGLEVBQUVxQixPQUFPO1FBQ2xDO0lBQ0o7SUFFQSxNQUFNUSxXQUFXLElBQUk0VyxPQUFPQyxRQUFRO0lBQ3BDLE1BQU1DLFFBQVEsSUFBSUYsT0FBT0UsS0FBSyxDQUFDQyxpQkFBaUI7SUFFaERELE1BQU10WCxPQUFPLENBQUNBO0lBRWRRLFFBQ0ksaURBQWlEO0tBQ2hEZ1gsT0FBTyxDQUFDRixNQUFNbFEsUUFBUSxHQUN2Qiw0REFBNEQ7S0FDM0RxUSxZQUFZLENBQUMsZ0JBQWdCLFlBQzdCQyxTQUFTLENBQUNYLHVCQUF1QnJXO0lBRXRDLE9BQU91VyxTQUFTLE1BQU16VztBQUMxQixFQUFFIiwic291cmNlcyI6WyIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL25vZGVfbW9kdWxlcy9AdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzL2luZGV4LmpzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvZW52L2hhbmRsZXJfY29uZmlnLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvaGFuZGxlcnMvYnZuc3BfaGFuZGxlci50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3NoZWV0cy9ndWVzdF9wYXNzX3NoZWV0LnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvc2hlZXRzL2xvZ2luX3NoZWV0LnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvc2hlZXRzL3NlYXNvbl9zaGVldC50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3NoZWV0cy9zbGVkX2JlYWNvbl9jaGVja19zaGVldC50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3VzZXItY3JlZHMudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91dGlscy9jaGVja2luX3ZhbHVlcy50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3V0aWxzL2RhdGV0aW1lX3V0aWwudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91dGlscy9maWxlX3V0aWxzLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvZ29vZ2xlX3NoZWV0c19zcHJlYWRzaGVldF90YWIudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91dGlscy9ndWVzdF9wYXNzZXMudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91dGlscy9zY29wZV91dGlsLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvc2VjdGlvbl92YWx1ZXMudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91dGlscy91dGlsLnRzIiwiZXh0ZXJuYWwgY29tbW9uanMgXCJnb29nbGVhcGlzXCIiLCJleHRlcm5hbCBjb21tb25qcyBcInNtcy1zZWdtZW50cy1jYWxjdWxhdG9yXCIiLCJleHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiZnNcIiIsIndlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL2hhbmRsZXJzL2hhbmRsZXIucHJvdGVjdGVkLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEludGVudGlvbmFsbHkgbGVmdCBlbXB0eVxuIiwiaW1wb3J0IHsgQ2hlY2tpblZhbHVlIH0gZnJvbSBcIi4uL3V0aWxzL2NoZWNraW5fdmFsdWVzXCI7XG5cbi8qKlxuICogRW52aXJvbm1lbnQgY29uZmlndXJhdGlvbiBmb3IgdGhlIGhhbmRsZXIuXG4gKiA8cD5cbiAqIE5vdGU6IFRoZXNlIGFyZSB0aGUgb25seSBzZWNyZXQgdmFsdWVzIHdlIG5lZWQgdG8gcmVhZC4gUmVzdCBjYW4gYmUgZGVwbG95ZWQuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBIYW5kbGVyRW52aXJvbm1lbnRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTSEVFVF9JRCAtIFRoZSBJRCBvZiB0aGUgR29vZ2xlIFNoZWV0cyBzcHJlYWRzaGVldC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTQ1JJUFRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBBcHBzIFNjcmlwdCBwcm9qZWN0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNZTkNfU0lEIC0gVGhlIFNJRCBvZiB0aGUgVHdpbGlvIFN5bmMgc2VydmljZS5cbiAqL1xudHlwZSBIYW5kbGVyRW52aXJvbm1lbnQgPSB7XG4gICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICBTQ1JJUFRfSUQ6IHN0cmluZztcbiAgICBTWU5DX1NJRDogc3RyaW5nO1xufTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciB1c2VyIGNyZWRlbnRpYWxzLlxuICogQHR5cGVkZWYge09iamVjdH0gVXNlckNyZWRzQ29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZyB8IHVuZGVmaW5lZCB8IG51bGx9IE5TUF9FTUFJTF9ET01BSU4gLSBUaGUgZW1haWwgZG9tYWluIGZvciBOU1AuXG4gKi9cbnR5cGUgVXNlckNyZWRzQ29uZmlnID0ge1xuICAgIE5TUF9FTUFJTF9ET01BSU46IHN0cmluZyB8IHVuZGVmaW5lZCB8IG51bGw7XG59O1xuY29uc3QgdXNlcl9jcmVkc19jb25maWc6IFVzZXJDcmVkc0NvbmZpZyA9IHtcbiAgICBOU1BfRU1BSUxfRE9NQUlOOiBcImZhcndlc3Qub3JnXCIsXG59O1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIGZpbmRpbmcgYSBwYXRyb2xsZXIuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBGaW5kUGF0cm9sbGVyQ29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gUEhPTkVfTlVNQkVSX0xPT0tVUF9TSEVFVCAtIFRoZSByYW5nZSBmb3IgcGhvbmUgbnVtYmVyIGxvb2t1cC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBQSE9ORV9OVU1CRVJfTlVNQkVSX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIHBob25lIG51bWJlcnMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gUEhPTkVfTlVNQkVSX05BTUVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgbmFtZXMuXG4gKi9cbnR5cGUgRmluZFBhdHJvbGxlckNvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogc3RyaW5nO1xuICAgIFBIT05FX05VTUJFUl9MT09LVVBfU0hFRVQ6IHN0cmluZztcbiAgICBQSE9ORV9OVU1CRVJfTlVNQkVSX0NPTFVNTjogc3RyaW5nO1xuICAgIFBIT05FX05VTUJFUl9OQU1FX0NPTFVNTjogc3RyaW5nO1xufTtcblxuY29uc3QgZmluZF9wYXRyb2xsZXJfY29uZmlnOiBGaW5kUGF0cm9sbGVyQ29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBcInRlc3RcIixcbiAgICBQSE9ORV9OVU1CRVJfTE9PS1VQX1NIRUVUOiBcIlBob25lIE51bWJlcnMhQTI6QjEwMFwiLFxuICAgIFBIT05FX05VTUJFUl9OQU1FX0NPTFVNTjogXCJBXCIsXG4gICAgUEhPTkVfTlVNQkVSX05VTUJFUl9DT0xVTU46IFwiQlwiLFxufTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciB0aGUgbG9naW4gc2hlZXQuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBMb2dpblNoZWV0Q29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gTE9HSU5fU0hFRVRfTE9PS1VQIC0gVGhlIHJhbmdlIGZvciBsb2dpbiBzaGVldCBsb29rdXAuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQ0hFQ0tJTl9DT1VOVF9MT09LVVAgLSBUaGUgcmFuZ2UgZm9yIGNoZWNrLWluIGNvdW50IGxvb2t1cC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBBUkNISVZFRF9DRUxMIC0gVGhlIGNlbGwgZm9yIGFyY2hpdmVkIGRhdGEuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfREFURV9DRUxMIC0gVGhlIGNlbGwgZm9yIHRoZSBzaGVldCBkYXRlLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IENVUlJFTlRfREFURV9DRUxMIC0gVGhlIGNlbGwgZm9yIHRoZSBjdXJyZW50IGRhdGUuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gTkFNRV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBuYW1lcy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDQVRFR09SWV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBjYXRlZ29yaWVzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNFQ1RJT05fRFJPUERPV05fQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3Igc2VjdGlvbiBkcm9wZG93bi5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDSEVDS0lOX0RST1BET1dOX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIGNoZWNrLWluIGRyb3Bkb3duLlxuICovXG50eXBlIExvZ2luU2hlZXRDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICBMT0dJTl9TSEVFVF9MT09LVVA6IHN0cmluZztcbiAgICBDSEVDS0lOX0NPVU5UX0xPT0tVUDogc3RyaW5nO1xuICAgIEFSQ0hJVkVEX0NFTEw6IHN0cmluZztcbiAgICBTSEVFVF9EQVRFX0NFTEw6IHN0cmluZztcbiAgICBDVVJSRU5UX0RBVEVfQ0VMTDogc3RyaW5nO1xuICAgIE5BTUVfQ09MVU1OOiBzdHJpbmc7XG4gICAgQ0FURUdPUllfQ09MVU1OOiBzdHJpbmc7XG4gICAgU0VDVElPTl9EUk9QRE9XTl9DT0xVTU46IHN0cmluZztcbiAgICBDSEVDS0lOX0RST1BET1dOX0NPTFVNTjogc3RyaW5nO1xufTtcblxuY29uc3QgbG9naW5fc2hlZXRfY29uZmlnOiBMb2dpblNoZWV0Q29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBcInRlc3RcIixcbiAgICBMT0dJTl9TSEVFVF9MT09LVVA6IFwiTG9naW4hQTE6STEwMFwiLFxuICAgIENIRUNLSU5fQ09VTlRfTE9PS1VQOiBcIlRvb2xzIUcyOkcyXCIsXG4gICAgU0hFRVRfREFURV9DRUxMOiBcIkIxXCIsXG4gICAgQ1VSUkVOVF9EQVRFX0NFTEw6IFwiQjJcIixcbiAgICBBUkNISVZFRF9DRUxMOiBcIkgxXCIsXG4gICAgTkFNRV9DT0xVTU46IFwiQVwiLFxuICAgIENBVEVHT1JZX0NPTFVNTjogXCJCXCIsXG4gICAgU0VDVElPTl9EUk9QRE9XTl9DT0xVTU46IFwiSFwiLFxuICAgIENIRUNLSU5fRFJPUERPV05fQ09MVU1OOiBcIklcIixcbn07XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgdGhlIHNlYXNvbiBzaGVldC5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IFNlYXNvblNoZWV0Q29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0VBU09OX1NIRUVUIC0gVGhlIG5hbWUgb2YgdGhlIHNlYXNvbiBzaGVldC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTRUFTT05fU0hFRVRfREFZU19DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBzZWFzb24gc2hlZXQgZGF5cy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTRUFTT05fU0hFRVRfTkFNRV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBzZWFzb24gc2hlZXQgbmFtZXMuXG4gKi9cbnR5cGUgU2Vhc29uU2hlZXRDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICBTRUFTT05fU0hFRVQ6IHN0cmluZztcbiAgICBTRUFTT05fU0hFRVRfREFZU19DT0xVTU46IHN0cmluZztcbiAgICBTRUFTT05fU0hFRVRfTkFNRV9DT0xVTU46IHN0cmluZztcbn07XG5jb25zdCBzZWFzb25fc2hlZXRfY29uZmlnOiBTZWFzb25TaGVldENvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogXCJ0ZXN0XCIsXG4gICAgU0VBU09OX1NIRUVUOiBcIlNlYXNvblwiLFxuICAgIFNFQVNPTl9TSEVFVF9OQU1FX0NPTFVNTjogXCJCXCIsXG4gICAgU0VBU09OX1NIRUVUX0RBWVNfQ09MVU1OOiBcIkFcIixcbn07XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3Igc2VjdGlvbnMuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBTZWN0aW9uQ29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0VDVElPTl9WQUxVRVMgLSBUaGUgc2VjdGlvbiB2YWx1ZXMuXG4gKi9cbnR5cGUgU2VjdGlvbkNvbmZpZyA9IHtcbiAgICBTRUNUSU9OX1ZBTFVFUzogc3RyaW5nO1xufTtcbmNvbnN0IHNlY3Rpb25fY29uZmlnOiBTZWN0aW9uQ29uZmlnID0ge1xuICAgIFNFQ1RJT05fVkFMVUVTOiAgXCIxLDIsMyw0LFJvdmluZyxGQVIsVHJhaW5pbmdcIixcbn07XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgZ3Vlc3QgcGFzc2VzLlxuICogQHR5cGVkZWYge09iamVjdH0gR3Vlc3RQYXNzZXNDb25maWdcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTSEVFVF9JRCAtIFRoZSBJRCBvZiB0aGUgR29vZ2xlIFNoZWV0cyBzcHJlYWRzaGVldC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBHVUVTVF9QQVNTX1NIRUVUIC0gVGhlIG5hbWUgb2YgdGhlIGd1ZXN0IHBhc3Mgc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gR1VFU1RfUEFTU19FTElHSUJMRV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBndWVzdCBwYXNzICBlbGlnaWJpbGl0eSBjaGVja2JveCAoVFJVRS9GQUxTRSkuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gR1VFU1RfUEFTU19FTElHSUJMRV9SRUFTT05fQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgdGhlIGluZWxpZ2liaWxpdHkgcmVhc29uIHN0cmluZy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBHVUVTVF9QQVNTX1NIRUVUX0FWQUlMQUJMRV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBhdmFpbGFibGUgcGFzcyBjb3VudC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBHVUVTVF9QQVNTX1NIRUVUX1VTRURfVE9EQVlfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgcGFzc2VzIHVzZWQgdG9kYXkuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gR1VFU1RfUEFTU19TSEVFVF9VU0VEX1NFQVNPTl9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBwYXNzZXMgdXNlZCB0aGlzIHNlYXNvbi5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBHVUVTVF9QQVNTX1NIRUVUX0RBVEVTX1NUQVJUSU5HX0NPTFVNTiAtIFRoZSBjb2x1bW4gd2hlcmUgZGF0ZS1vZi11c2UgZW50cmllcyBiZWdpbi5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBHVUVTVF9QQVNTX1NIRUVUX05BTUVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgcGF0cm9sbGVyIG5hbWVzLlxuICovXG50eXBlIEd1ZXN0UGFzc2VzQ29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBzdHJpbmc7XG4gICAgR1VFU1RfUEFTU19TSEVFVDogc3RyaW5nO1xuICAgIEdVRVNUX1BBU1NfRUxJR0lCTEVfQ09MVU1OOiBzdHJpbmc7XG4gICAgR1VFU1RfUEFTU19FTElHSUJMRV9SRUFTT05fQ09MVU1OOiBzdHJpbmc7XG4gICAgR1VFU1RfUEFTU19TSEVFVF9BVkFJTEFCTEVfQ09MVU1OOiBzdHJpbmc7XG4gICAgR1VFU1RfUEFTU19TSEVFVF9VU0VEX1RPREFZX0NPTFVNTjogc3RyaW5nO1xuICAgIEdVRVNUX1BBU1NfU0hFRVRfVVNFRF9TRUFTT05fQ09MVU1OOiBzdHJpbmc7XG4gICAgR1VFU1RfUEFTU19TSEVFVF9EQVRFU19TVEFSVElOR19DT0xVTU46IHN0cmluZztcbiAgICBHVUVTVF9QQVNTX1NIRUVUX05BTUVfQ09MVU1OOiBzdHJpbmc7XG59O1xuY29uc3QgZ3Vlc3RfcGFzc2VzX2NvbmZpZzogR3Vlc3RQYXNzZXNDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IFwidGVzdFwiLFxuICAgIEdVRVNUX1BBU1NfU0hFRVQ6IFwiR3Vlc3RQYXNzZXNcIixcbiAgICBHVUVTVF9QQVNTX0VMSUdJQkxFX0NPTFVNTjogXCJCXCIsXG4gICAgR1VFU1RfUEFTU19FTElHSUJMRV9SRUFTT05fQ09MVU1OOiBcIkNcIixcbiAgICBHVUVTVF9QQVNTX1NIRUVUX05BTUVfQ09MVU1OOiBcIkFcIixcbiAgICBHVUVTVF9QQVNTX1NIRUVUX0FWQUlMQUJMRV9DT0xVTU46IFwiRFwiLFxuICAgIEdVRVNUX1BBU1NfU0hFRVRfVVNFRF9UT0RBWV9DT0xVTU46IFwiRVwiLFxuICAgIEdVRVNUX1BBU1NfU0hFRVRfVVNFRF9TRUFTT05fQ09MVU1OOiBcIkZcIixcbiAgICBHVUVTVF9QQVNTX1NIRUVUX0RBVEVTX1NUQVJUSU5HX0NPTFVNTjogXCJHXCIsXG59O1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIHRoZSBTbGVkIEJlYWNvbiBDaGVja3Mgc2hlZXRcbiAqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBTbGVkQmVhY29uQ29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0xFRF9CRUFDT05fU0hFRVQgLSBUaGUgbmFtZSBvZiB0aGUgU2xlZCBCZWNvbiBDaGVjayBzaGVldFxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNMRURfQkVBQ09OX1NIRUVUX05BTUVfQ09MVU1OIC0gIFRoZSBjb2x1bW4gZm9yIHBhdHJvbGxlciBuYW1lcy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBCRUFDT05fU0VBUkNIX0NPVU5UX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIHRoZSBzZWFyY2ggY291bnQgZm9yIHRoaXMgc2Vhc29uLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IEJFQUNPTl9GSU5EX0RBVEVTX1NUQVJUSU5HX0NPTFVNTiAtIFRoZXJlIGNvbHVtbiB3aGVyZSBodGUgZGF0ZXMgZm9yIGJlYWNvbiBmaW5kcyBiZWdpbnMuXG4gKi9cbnR5cGUgU2xlZEJlYWNvbkNvbmZpZyA9IHtcbiAgICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICAgU0xFRF9CRUFDT05fU0hFRVQ6IHN0cmluZztcbiAgICAgU0xFRF9CRUFDT05fU0hFRVRfTkFNRV9DT0xVTU46IHN0cmluZztcbiAgICAgQkVBQ09OX1NFQVJDSF9DT1VOVF9DT0xVTU46IHN0cmluZztcbiAgICAgQkVBQ09OX0ZJTkRfREFURVNfU1RBUlRJTkdfQ09MVU1OOiBzdHJpbmc7XG59O1xuIGNvbnN0IHNsZWRfYmVhY29uX3NoZWV0X2NvbmZpZzogU2xlZEJlYWNvbkNvbmZpZyA9IHtcbiAgICAgU0hFRVRfSUQ6IFwidGVzdFwiLFxuICAgICBTTEVEX0JFQUNPTl9TSEVFVDogXCJTbGVkX0JlYWNvbiBDaGVja3NcIixcbiAgICAgU0xFRF9CRUFDT05fU0hFRVRfTkFNRV9DT0xVTU46IFwiQVwiLFxuICAgICBCRUFDT05fU0VBUkNIX0NPVU5UX0NPTFVNTjogXCJKXCIsXG4gICAgIEJFQUNPTl9GSU5EX0RBVEVTX1NUQVJUSU5HX0NPTFVNTjogXCJLXCJcbn1cblxuIC8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgdGhlIGhhbmRsZXIuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBIYW5kbGVyQ29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0NSSVBUX0lEIC0gVGhlIElEIG9mIHRoZSBHb29nbGUgQXBwcyBTY3JpcHQgcHJvamVjdC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTSEVFVF9JRCAtIFRoZSBJRCBvZiB0aGUgR29vZ2xlIFNoZWV0cyBzcHJlYWRzaGVldC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTWU5DX1NJRCAtIFRoZSBTSUQgb2YgdGhlIFR3aWxpbyBTeW5jIHNlcnZpY2UuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gUkVTRVRfRlVOQ1RJT05fTkFNRSAtIFRoZSBuYW1lIG9mIHRoZSByZXNldCBmdW5jdGlvbi5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBBUkNISVZFX0ZVTkNUSU9OX05BTUUgLSBUaGUgbmFtZSBvZiB0aGUgYXJjaGl2ZSBmdW5jdGlvbi5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gVVNFX1NFUlZJQ0VfQUNDT1VOVCAtIFdoZXRoZXIgdG8gdXNlIGEgc2VydmljZSBhY2NvdW50LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IEFDVElPTl9MT0dfU0hFRVQgLSBUaGUgbmFtZSBvZiB0aGUgYWN0aW9uIGxvZyBzaGVldC5cbiAqIEBwcm9wZXJ0eSB7Q2hlY2tpblZhbHVlW119IENIRUNLSU5fVkFMVUVTIC0gVGhlIGNoZWNrLWluIHZhbHVlcy5cbiAqL1xudHlwZSBIYW5kbGVyQ29uZmlnID0ge1xuICAgIFNDUklQVF9JRDogc3RyaW5nO1xuICAgIFNIRUVUX0lEOiBzdHJpbmc7XG4gICAgU1lOQ19TSUQ6IHN0cmluZztcbiAgICBSRVNFVF9GVU5DVElPTl9OQU1FOiBzdHJpbmc7XG4gICAgQVJDSElWRV9GVU5DVElPTl9OQU1FOiBzdHJpbmc7XG4gICAgVVNFX1NFUlZJQ0VfQUNDT1VOVDogYm9vbGVhbjtcbiAgICBBQ1RJT05fTE9HX1NIRUVUOiBzdHJpbmc7XG4gICAgQ0hFQ0tJTl9WQUxVRVM6IENoZWNraW5WYWx1ZVtdO1xufTtcbmNvbnN0IGhhbmRsZXJfY29uZmlnOiBIYW5kbGVyQ29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBcInRlc3RcIixcbiAgICBTQ1JJUFRfSUQ6IFwidGVzdFwiLFxuICAgIFNZTkNfU0lEOiBcInRlc3RcIixcblxuICAgIEFSQ0hJVkVfRlVOQ1RJT05fTkFNRTogXCJBcmNoaXZlXCIsXG4gICAgUkVTRVRfRlVOQ1RJT05fTkFNRTogXCJSZXNldFwiLFxuICAgIFVTRV9TRVJWSUNFX0FDQ09VTlQ6IHRydWUsXG4gICAgQUNUSU9OX0xPR19TSEVFVDogXCJCb3RfVXNhZ2VcIixcbiAgICBDSEVDS0lOX1ZBTFVFUzogW1xuICAgICAgICBuZXcgQ2hlY2tpblZhbHVlKFwiZGF5XCIsIFwiQWxsIERheVwiLCBcImFsbCBkYXkvREFZXCIsIFtcImNoZWNraW4tZGF5XCJdKSxcbiAgICAgICAgbmV3IENoZWNraW5WYWx1ZShcImFtXCIsIFwiSGFsZiBBTVwiLCBcIm1vcm5pbmcvQU1cIiwgW1wiY2hlY2tpbi1hbVwiXSksXG4gICAgICAgIG5ldyBDaGVja2luVmFsdWUoXCJwbVwiLCBcIkhhbGYgUE1cIiwgXCJhZnRlcm5vb24vUE1cIiwgW1wiY2hlY2tpbi1wbVwiXSksXG4gICAgICAgIG5ldyBDaGVja2luVmFsdWUoXCJvdXRcIiwgXCJDaGVja2VkIE91dFwiLCBcImNoZWNrIG91dC9PVVRcIiwgW1wiY2hlY2tvdXRcIiwgXCJjaGVjay1vdXRcIl0pLFxuICAgIF0sXG59O1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIHBhdHJvbGxlciByb3dzLlxuICogQHR5cGVkZWYge09iamVjdH0gUGF0cm9sbGVyUm93Q29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gTkFNRV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBuYW1lcy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDQVRFR09SWV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBjYXRlZ29yaWVzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNFQ1RJT05fRFJPUERPV05fQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3Igc2VjdGlvbiBkcm9wZG93bi5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDSEVDS0lOX0RST1BET1dOX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIGNoZWNrLWluIGRyb3Bkb3duLlxuICovXG50eXBlIFBhdHJvbGxlclJvd0NvbmZpZyA9IHtcbiAgICBOQU1FX0NPTFVNTjogc3RyaW5nO1xuICAgIENBVEVHT1JZX0NPTFVNTjogc3RyaW5nO1xuICAgIFNFQ1RJT05fRFJPUERPV05fQ09MVU1OOiBzdHJpbmc7XG4gICAgQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU46IHN0cmluZztcbn07XG5cbi8qKlxuICogQ29tYmluZWQgY29uZmlndXJhdGlvbiB0eXBlLlxuICogQHR5cGVkZWYge0hhbmRsZXJFbnZpcm9ubWVudCAmIFVzZXJDcmVkc0NvbmZpZyAmIEZpbmRQYXRyb2xsZXJDb25maWcgJiBMb2dpblNoZWV0Q29uZmlnICYgU2Vhc29uU2hlZXRDb25maWcgJiBTZWN0aW9uQ29uZmlnICYgR3Vlc3RQYXNzZXNDb25maWcgJiBIYW5kbGVyQ29uZmlnICYgUGF0cm9sbGVyUm93Q29uZmlnfSBDb21iaW5lZENvbmZpZ1xuICovXG50eXBlIENvbWJpbmVkQ29uZmlnID0gSGFuZGxlckVudmlyb25tZW50ICZcbiAgICBVc2VyQ3JlZHNDb25maWcgJlxuICAgIEZpbmRQYXRyb2xsZXJDb25maWcgJlxuICAgIExvZ2luU2hlZXRDb25maWcgJlxuICAgIFNlYXNvblNoZWV0Q29uZmlnICZcbiAgICBTZWN0aW9uQ29uZmlnICZcbiAgICBHdWVzdFBhc3Nlc0NvbmZpZyAmXG4gICAgU2xlZEJlYWNvbkNvbmZpZyAmXG4gICAgSGFuZGxlckNvbmZpZyAmXG4gICAgUGF0cm9sbGVyUm93Q29uZmlnO1xuXG5jb25zdCBDT05GSUc6IENvbWJpbmVkQ29uZmlnID0ge1xuICAgIC4uLmhhbmRsZXJfY29uZmlnLFxuICAgIC4uLmZpbmRfcGF0cm9sbGVyX2NvbmZpZyxcbiAgICAuLi5sb2dpbl9zaGVldF9jb25maWcsXG4gICAgLi4uZ3Vlc3RfcGFzc2VzX2NvbmZpZyxcbiAgICAuLi5zbGVkX2JlYWNvbl9zaGVldF9jb25maWcsXG4gICAgLi4uc2Vhc29uX3NoZWV0X2NvbmZpZyxcbiAgICAuLi51c2VyX2NyZWRzX2NvbmZpZyxcbiAgICAuLi5zZWN0aW9uX2NvbmZpZyxcbn07XG5cbmV4cG9ydCB7XG4gICAgQ09ORklHLFxuICAgIENvbWJpbmVkQ29uZmlnLFxuICAgIFNlY3Rpb25Db25maWcsXG4gICAgR3Vlc3RQYXNzZXNDb25maWcsXG4gICAgU2xlZEJlYWNvbkNvbmZpZyxcbiAgICBGaW5kUGF0cm9sbGVyQ29uZmlnLFxuICAgIEhhbmRsZXJDb25maWcsXG4gICAgSGFuZGxlckVudmlyb25tZW50LFxuICAgIFVzZXJDcmVkc0NvbmZpZyxcbiAgICBMb2dpblNoZWV0Q29uZmlnLFxuICAgIFNlYXNvblNoZWV0Q29uZmlnLFxuICAgIFBhdHJvbGxlclJvd0NvbmZpZyxcbn07IiwiaW1wb3J0IFwiQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlc1wiO1xuaW1wb3J0IHtcbiAgICBDb250ZXh0LFxuICAgIFNlcnZlcmxlc3NFdmVudE9iamVjdCxcbiAgICBTZXJ2aWNlQ29udGV4dCxcbiAgICBUd2lsaW9DbGllbnQsXG59IGZyb20gXCJAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzL3R5cGVzXCI7XG5pbXBvcnQge2dvb2dsZSwgc2NyaXB0X3YxLCBzaGVldHNfdjR9IGZyb20gXCJnb29nbGVhcGlzXCI7XG5pbXBvcnQge0dvb2dsZUF1dGh9IGZyb20gXCJnb29nbGVhcGlzLWNvbW1vblwiO1xuaW1wb3J0IHtcbiAgICBDb21iaW5lZENvbmZpZyxcbiAgICBDT05GSUcsXG4gICAgRmluZFBhdHJvbGxlckNvbmZpZyxcbiAgICBHdWVzdFBhc3Nlc0NvbmZpZyxcbiAgICBIYW5kbGVyQ29uZmlnLFxuICAgIEhhbmRsZXJFbnZpcm9ubWVudCxcbiAgICBMb2dpblNoZWV0Q29uZmlnLFxuICAgIFNlYXNvblNoZWV0Q29uZmlnLCBTbGVkQmVhY29uQ29uZmlnLFxufSBmcm9tIFwiLi4vZW52L2hhbmRsZXJfY29uZmlnXCI7XG5pbXBvcnQgTG9naW5TaGVldCwge1BhdHJvbGxlclJvd30gZnJvbSBcIi4uL3NoZWV0cy9sb2dpbl9zaGVldFwiO1xuaW1wb3J0IFNlYXNvblNoZWV0IGZyb20gXCIuLi9zaGVldHMvc2Vhc29uX3NoZWV0XCI7XG5pbXBvcnQge1VzZXJDcmVkc30gZnJvbSBcIi4uL3VzZXItY3JlZHNcIjtcbmltcG9ydCB7Q2hlY2tpblZhbHVlc30gZnJvbSBcIi4uL3V0aWxzL2NoZWNraW5fdmFsdWVzXCI7XG5pbXBvcnQge2dldF9zZXJ2aWNlX2NyZWRlbnRpYWxzX3BhdGh9IGZyb20gXCIuLi91dGlscy9maWxlX3V0aWxzXCI7XG5pbXBvcnQge2V4Y2VsX3Jvd190b19pbmRleCwgZm9ybWF0X3Bob25lX2Zvcl9kaXNwbGF5LCBzYW5pdGl6ZV9waG9uZV9udW1iZXJ9IGZyb20gXCIuLi91dGlscy91dGlsXCI7XG5pbXBvcnQge2J1aWxkX3Bhc3Nlc19zdHJpbmcsfSBmcm9tIFwiLi4vdXRpbHMvZ3Vlc3RfcGFzc2VzXCI7XG5pbXBvcnQge0d1ZXN0UGFzc1NoZWV0fSBmcm9tIFwiLi4vc2hlZXRzL2d1ZXN0X3Bhc3Nfc2hlZXRcIjtcbmltcG9ydCB7U2VjdGlvblZhbHVlc30gZnJvbSAnLi4vdXRpbHMvc2VjdGlvbl92YWx1ZXMnO1xuaW1wb3J0IHtTbGVkQmVhY29uQ2hlY2tTaGVldH0gZnJvbSBcIi4uL3NoZWV0cy9zbGVkX2JlYWNvbl9jaGVja19zaGVldFwiO1xuXG5leHBvcnQgdHlwZSBCVk5TUFJlc3BvbnNlID0ge1xuICAgIHJlc3BvbnNlPzogc3RyaW5nO1xuICAgIG5leHRfc3RlcD86IHN0cmluZztcbn07XG5leHBvcnQgdHlwZSBCVk5TUEV2ZW50ID0gU2VydmVybGVzc0V2ZW50T2JqZWN0PFxuICAgIHtcbiAgICAgICAgRnJvbTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgICBUbzogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgICBudW1iZXI6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAgICAgdGVzdF9udW1iZXI6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAgICAgQm9keTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIH0sXG4gICAge30sXG4gICAge1xuICAgICAgICBidm5zcF9uZXh0X3N0ZXA6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICB9XG4+O1xuXG5leHBvcnQgY29uc3QgTkVYVF9TVEVQUyA9IHtcbiAgICBBV0FJVF9DT01NQU5EOiBcImF3YWl0LWNvbW1hbmRcIixcbiAgICBBV0FJVF9DSEVDS0lOOiBcImF3YWl0LWNoZWNraW5cIixcbiAgICBDT05GSVJNX1JFU0VUOiBcImNvbmZpcm0tcmVzZXRcIixcbiAgICBBVVRIX1JFU0VUOiBcImF1dGgtcmVzZXRcIixcbiAgICBBV0FJVF9TRUNUSU9OOiBcImF3YWl0LXNlY3Rpb25cIixcbiAgICBBV0FJVF9QQVNTOiBcImF3YWl0LXBhc3NcIixcbiAgICBBV0FJVF9NRVNTQUdFOiBcImF3YWl0LW1lc3NhZ2VcIixcbiAgICBBV0FJVF9CUk9BRENBU1Q6IFwiYXdhaXQtYnJvYWRjYXN0XCIsXG4gICAgQVdBSVRfQkVBQ09OOlwiYXdhaXQtYmVhY29uXCIsXG59O1xuXG5jb25zdCBDT01NQU5EUyA9IHtcbiAgICBPTl9EVVRZOiBbXCJvbmR1dHlcIiwgXCJvbi1kdXR5XCJdLFxuICAgIFNUQVRVUzogW1wic3RhdHVzXCJdLFxuICAgIENIRUNLSU46IFtcImNoZWNraW5cIiwgXCJjaGVjay1pblwiXSxcbiAgICBTRUNUSU9OX0FTU0lHTk1FTlQ6IFtcInNlY3Rpb25cIiwgXCJzZWN0aW9uLWFzc2lnbm1lbnRcIiwgXCJzZWN0aW9uYXNzaWdubWVudFwiLCBcImFzc2lnbm1lbnRcIl0sXG4gICAgR1VFU1RfUEFTUzogW1wiZ3Vlc3QtcGFzc1wiLCBcImd1ZXN0cGFzc1wiLCBcImd1ZXN0XCJdLFxuICAgIFdIQVRTQVBQOiBbXCJ3aGF0c2FwcFwiXSxcbiAgICBNRVNTQUdFOiBbXCJtZXNzYWdlXCIsIFwibXNnXCJdLFxuICAgIEJST0FEQ0FTVDogW1wiYnJvYWRjYXN0XCJdLFxuICAgIEJFQUNPTjogW1wiYmVhY29uXCIsIFwiYmVhY29uLXNlYXJjaFwiLCBcImJlYWNvbi1maW5kXCJdLFxufTtcblxuZXhwb3J0IGNvbnN0IFNNU19NQVhfTEVOR1RIID0gMTYwO1xuZXhwb3J0IGNvbnN0IE1FU1NBR0VfUFJFRklYX1RFTVBMQVRFID0gXCJNZXNzYWdlIGZyb20gXCI7XG5leHBvcnQgY29uc3QgTUVTU0FHRV9QUkVGSVhfU1VGRklYID0gXCI6IFwiO1xuXG4vKipcbiAqIFJlc3VsdCBvZiB2YWxpZGF0aW5nIGFuIFNNUyBtZXNzYWdlIGZvciBHU00tNyBjb21wYXRpYmlsaXR5IGFuZCBzZWdtZW50IGNvdW50LlxuICovXG5leHBvcnQgdHlwZSBTbXNWYWxpZGF0aW9uUmVzdWx0ID0ge1xuICAgIC8qKiBXaGV0aGVyIHRoZSBtZXNzYWdlIGlzIHZhbGlkIChHU00tNyBvbmx5IGFuZCBmaXRzIGluIGEgc2luZ2xlIHNlZ21lbnQpLiAqL1xuICAgIHZhbGlkOiBib29sZWFuO1xuICAgIC8qKiBJZiBpbnZhbGlkLCB0aGUgcmVhc29uOiAnbm9uX2dzbTcnIG9yICd0b29fbWFueV9zZWdtZW50cycuICovXG4gICAgcmVhc29uPzogXCJub25fZ3NtN1wiIHwgXCJ0b29fbWFueV9zZWdtZW50c1wiO1xuICAgIC8qKiBUaGUgbm9uLUdTTS03IGNoYXJhY3RlcnMgZm91bmQsIGlmIGFueS4gKi9cbiAgICBub25fZ3NtX2NoYXJhY3RlcnM/OiBzdHJpbmdbXTtcbiAgICAvKiogVGhlIG51bWJlciBvZiBTTVMgc2VnbWVudHMgdGhlIG1lc3NhZ2Ugd291bGQgcmVxdWlyZS4gKi9cbiAgICBzZWdtZW50c19jb3VudD86IG51bWJlcjtcbn07XG5cbi8qKlxuICogVmFsaWRhdGVzIHRoYXQgYSBjb21wbGV0ZSBTTVMgbWVzc2FnZSAocHJlZml4ICsgYm9keSkgdXNlcyBvbmx5IEdTTS03IGNoYXJhY3RlcnNcbiAqIGFuZCBmaXRzIHdpdGhpbiBhIHNpbmdsZSBTTVMgc2VnbWVudC5cbiAqXG4gKiBVc2VzIHRoZSBzbXMtc2VnbWVudHMtY2FsY3VsYXRvciBsaWJyYXJ5IChtYWludGFpbmVkIGJ5IFR3aWxpb0RldkVkKSB3aGljaFxuICogcHJvdmlkZXMgYXV0aG9yaXRhdGl2ZSBHU00tNyBjaGFyYWN0ZXIgZGV0ZWN0aW9uLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmdWxsX21lc3NhZ2UgLSBUaGUgY29tcGxldGUgbWVzc2FnZSB0byB2YWxpZGF0ZSAocHJlZml4ICsgdXNlciB0ZXh0KS5cbiAqIEByZXR1cm5zIHtTbXNWYWxpZGF0aW9uUmVzdWx0fSBUaGUgdmFsaWRhdGlvbiByZXN1bHQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZV9zbXNfbWVzc2FnZShmdWxsX21lc3NhZ2U6IHN0cmluZyk6IFNtc1ZhbGlkYXRpb25SZXN1bHQge1xuICAgIGNvbnN0IHsgU2VnbWVudGVkTWVzc2FnZSB9ID0gcmVxdWlyZShcInNtcy1zZWdtZW50cy1jYWxjdWxhdG9yXCIpO1xuICAgIGNvbnN0IHNlZ21lbnRlZCA9IG5ldyBTZWdtZW50ZWRNZXNzYWdlKGZ1bGxfbWVzc2FnZSk7XG4gICAgY29uc3Qgbm9uX2dzbSA9IHNlZ21lbnRlZC5nZXROb25Hc21DaGFyYWN0ZXJzKCkgYXMgc3RyaW5nW107XG5cbiAgICBpZiAobm9uX2dzbS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWxpZDogZmFsc2UsXG4gICAgICAgICAgICByZWFzb246IFwibm9uX2dzbTdcIixcbiAgICAgICAgICAgIG5vbl9nc21fY2hhcmFjdGVyczogWy4uLm5ldyBTZXQobm9uX2dzbSldLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGlmIChzZWdtZW50ZWQuc2VnbWVudHNDb3VudCA+IDEpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgICAgICAgIHJlYXNvbjogXCJ0b29fbWFueV9zZWdtZW50c1wiLFxuICAgICAgICAgICAgc2VnbWVudHNfY291bnQ6IHNlZ21lbnRlZC5zZWdtZW50c0NvdW50LFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB7IHZhbGlkOiB0cnVlIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJWTlNQSGFuZGxlciB7XG4gICAgU0NPUEVTOiBzdHJpbmdbXSA9IFtcImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvc3ByZWFkc2hlZXRzXCJdO1xuXG4gICAgc21zX3JlcXVlc3Q6IGJvb2xlYW47XG4gICAgcmVzdWx0X21lc3NhZ2VzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGZyb206IHN0cmluZztcbiAgICB0bzogc3RyaW5nO1xuICAgIGJvZHk6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBib2R5X3Jhdzogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIHBhdHJvbGxlcjogUGF0cm9sbGVyUm93IHwgbnVsbDtcbiAgICBidm5zcF9uZXh0X3N0ZXA6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBjaGVja2luX21vZGU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICAgIGZhc3RfY2hlY2tpbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGFzc2lnbmVkX3NlY3Rpb246IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gICAgdHdpbGlvX2NsaWVudDogVHdpbGlvQ2xpZW50IHwgbnVsbCA9IG51bGw7XG4gICAgc3luY19zaWQ6IHN0cmluZztcbiAgICByZXNldF9zY3JpcHRfaWQ6IHN0cmluZztcblxuICAgIC8vIENhY2hlIGNsaWVudHNcbiAgICBzeW5jX2NsaWVudDogU2VydmljZUNvbnRleHQgfCBudWxsID0gbnVsbDtcbiAgICB1c2VyX2NyZWRzOiBVc2VyQ3JlZHMgfCBudWxsID0gbnVsbDtcbiAgICBzZXJ2aWNlX2NyZWRzOiBHb29nbGVBdXRoIHwgbnVsbCA9IG51bGw7XG4gICAgc2hlZXRzX3NlcnZpY2U6IHNoZWV0c192NC5TaGVldHMgfCBudWxsID0gbnVsbDtcbiAgICB1c2VyX3NjcmlwdHNfc2VydmljZTogc2NyaXB0X3YxLlNjcmlwdCB8IG51bGwgPSBudWxsO1xuXG4gICAgbG9naW5fc2hlZXQ6IExvZ2luU2hlZXQgfCBudWxsID0gbnVsbDtcbiAgICBzZWFzb25fc2hlZXQ6IFNlYXNvblNoZWV0IHwgbnVsbCA9IG51bGw7XG4gICAgZ3Vlc3RfcGFzc19zaGVldDogR3Vlc3RQYXNzU2hlZXQgfCBudWxsID0gbnVsbDtcbiAgICBzbGVkX2JlYWNvbl9jaGVja19zaGVldDogU2xlZEJlYWNvbkNoZWNrU2hlZXQgfCBudWxsID0gbnVsbDtcblxuICAgIGNoZWNraW5fdmFsdWVzOiBDaGVja2luVmFsdWVzO1xuICAgIGN1cnJlbnRfc2hlZXRfZGF0ZTogRGF0ZTtcblxuICAgIGNvbWJpbmVkX2NvbmZpZzogQ29tYmluZWRDb25maWc7XG4gICAgY29uZmlnOiBIYW5kbGVyQ29uZmlnO1xuXG4gICAgc2VjdGlvbl92YWx1ZXM6IFNlY3Rpb25WYWx1ZXM7XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGEgbmV3IEJWTlNQSGFuZGxlci5cbiAgICAgKiBAcGFyYW0ge0NvbnRleHQ8SGFuZGxlckVudmlyb25tZW50Pn0gY29udGV4dCAtIFRoZSBzZXJ2ZXJsZXNzIGZ1bmN0aW9uIGNvbnRleHQuXG4gICAgICogQHBhcmFtIHtTZXJ2ZXJsZXNzRXZlbnRPYmplY3Q8QlZOU1BFdmVudD59IGV2ZW50IC0gVGhlIGV2ZW50IG9iamVjdC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgY29udGV4dDogQ29udGV4dDxIYW5kbGVyRW52aXJvbm1lbnQ+LFxuICAgICAgICBldmVudDogU2VydmVybGVzc0V2ZW50T2JqZWN0PEJWTlNQRXZlbnQ+XG4gICAgKSB7XG4gICAgICAgIC8vIERldGVybWluZSBtZXNzYWdlIGRldGFpbHMgZnJvbSB0aGUgaW5jb21pbmcgZXZlbnQsIHdpdGggZmFsbGJhY2sgdmFsdWVzXG4gICAgICAgIHRoaXMuc21zX3JlcXVlc3QgPSAoZXZlbnQuRnJvbSB8fCBldmVudC5udW1iZXIpICE9PSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZnJvbSA9IGV2ZW50LkZyb20gfHwgZXZlbnQubnVtYmVyIHx8IGV2ZW50LnRlc3RfbnVtYmVyITtcbiAgICAgICAgdGhpcy50byA9IHNhbml0aXplX3Bob25lX251bWJlcihldmVudC5UbyEpO1xuICAgICAgICB0aGlzLmJvZHkgPSBldmVudC5Cb2R5Py50b0xvd2VyQ2FzZSgpPy50cmltKCkucmVwbGFjZSgvXFxzKy8sIFwiLVwiKTtcbiAgICAgICAgdGhpcy5ib2R5X3JhdyA9IGV2ZW50LkJvZHlcbiAgICAgICAgdGhpcy5idm5zcF9uZXh0X3N0ZXAgPVxuICAgICAgICAgICAgZXZlbnQucmVxdWVzdC5jb29raWVzLmJ2bnNwX25leHRfc3RlcDtcbiAgICAgICAgdGhpcy5jb21iaW5lZF9jb25maWcgPSB7IC4uLkNPTkZJRywgLi4uY29udGV4dCB9O1xuICAgICAgICB0aGlzLmNvbmZpZyA9IHRoaXMuY29tYmluZWRfY29uZmlnO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLnR3aWxpb19jbGllbnQgPSBjb250ZXh0LmdldFR3aWxpb0NsaWVudCgpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGluaXRpYWxpemluZyB0d2lsaW9fY2xpZW50XCIsIGUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3luY19zaWQgPSBjb250ZXh0LlNZTkNfU0lEO1xuICAgICAgICB0aGlzLnJlc2V0X3NjcmlwdF9pZCA9IGNvbnRleHQuU0NSSVBUX0lEO1xuICAgICAgICB0aGlzLnBhdHJvbGxlciA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5jaGVja2luX3ZhbHVlcyA9IG5ldyBDaGVja2luVmFsdWVzKENPTkZJRy5DSEVDS0lOX1ZBTFVFUyk7XG4gICAgICAgIHRoaXMuY3VycmVudF9zaGVldF9kYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgdGhpcy5zZWN0aW9uX3ZhbHVlcyA9IG5ldyBTZWN0aW9uVmFsdWVzKHRoaXMuY29tYmluZWRfY29uZmlnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZXMgdGhlIGZhc3QgY2hlY2staW4gbW9kZSBmcm9tIHRoZSBtZXNzYWdlIGJvZHkuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHkgLSBUaGUgbWVzc2FnZSBib2R5LlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIGZhc3QgY2hlY2staW4gbW9kZSBpcyBwYXJzZWQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKi9cbiAgICBwYXJzZV9mYXN0X2NoZWNraW5fbW9kZShib2R5OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgcGFyc2VkID0gdGhpcy5jaGVja2luX3ZhbHVlcy5wYXJzZV9mYXN0X2NoZWNraW4oYm9keSk7XG4gICAgICAgIGlmIChwYXJzZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5jaGVja2luX21vZGUgPSBwYXJzZWQua2V5O1xuICAgICAgICAgICAgdGhpcy5mYXN0X2NoZWNraW4gPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlcyB0aGUgY2hlY2staW4gbW9kZSBmcm9tIHRoZSBtZXNzYWdlIGJvZHkuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHkgLSBUaGUgbWVzc2FnZSBib2R5LlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIGNoZWNrLWluIG1vZGUgaXMgcGFyc2VkLCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICovXG4gICAgcGFyc2VfY2hlY2tpbihib2R5OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgcGFyc2VkID0gdGhpcy5jaGVja2luX3ZhbHVlcy5wYXJzZV9jaGVja2luKGJvZHkpO1xuICAgICAgICBpZiAocGFyc2VkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tpbl9tb2RlID0gcGFyc2VkLmtleTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZXMgdGhlIGNoZWNrLWluIG1vZGUgZnJvbSB0aGUgbmV4dCBzdGVwLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIGNoZWNrLWluIG1vZGUgaXMgcGFyc2VkLCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICovXG4gICAgcGFyc2VfY2hlY2tpbl9mcm9tX25leHRfc3RlcCgpIHtcbiAgICAgICAgY29uc3QgbGFzdF9zZWdtZW50ID0gdGhpcy5idm5zcF9uZXh0X3N0ZXBcbiAgICAgICAgICAgID8uc3BsaXQoXCItXCIpXG4gICAgICAgICAgICAuc2xpY2UoLTEpWzBdO1xuICAgICAgICBpZiAobGFzdF9zZWdtZW50ICYmIGxhc3Rfc2VnbWVudCBpbiB0aGlzLmNoZWNraW5fdmFsdWVzLmJ5X2tleSkge1xuICAgICAgICAgICAgdGhpcy5jaGVja2luX21vZGUgPSBsYXN0X3NlZ21lbnQ7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVsYXlzIHRoZSBleGVjdXRpb24gZm9yIGEgc3BlY2lmaWVkIG51bWJlciBvZiBzZWNvbmRzLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZWNvbmRzIC0gVGhlIG51bWJlciBvZiBzZWNvbmRzIHRvIGRlbGF5LlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbmFsPWZhbHNlXSAtIFdoZXRoZXIgdGhlIGRlbGF5IGlzIG9wdGlvbmFsLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyBhZnRlciB0aGUgZGVsYXkuXG4gICAgICovXG4gICAgZGVsYXkoc2Vjb25kczogbnVtYmVyLCBvcHRpb25hbDogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGlmIChvcHRpb25hbCAmJiAhdGhpcy5zbXNfcmVxdWVzdCkge1xuICAgICAgICAgICAgc2Vjb25kcyA9IDEgLyAxMDAwLjA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMpID0+IHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQocmVzLCBzZWNvbmRzICogMTAwMCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbmRzIGEgbWVzc2FnZSB0byB0aGUgdXNlci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIFRoZSBtZXNzYWdlIHRvIHNlbmQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIG1lc3NhZ2UgaXMgc2VudC5cbiAgICAgKi9cbiAgICBhc3luYyBzZW5kX21lc3NhZ2UobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLnNtc19yZXF1ZXN0KSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmdldF90d2lsaW9fY2xpZW50KCkubWVzc2FnZXMuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICB0bzogdGhpcy5mcm9tLFxuICAgICAgICAgICAgICAgIGZyb206IHRoaXMudG8sXG4gICAgICAgICAgICAgICAgYm9keTogbWVzc2FnZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZXN1bHRfbWVzc2FnZXMucHVzaChtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgdGhlIGNoZWNrLWluIHByb2Nlc3MuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGNoZWNrLWluIHJlc3BvbnNlLlxuICAgICAqL1xuICAgIGFzeW5jIGhhbmRsZSgpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5faGFuZGxlKCk7XG4gICAgICAgIGlmICghdGhpcy5zbXNfcmVxdWVzdCkge1xuICAgICAgICAgICAgaWYgKHJlc3VsdD8ucmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdF9tZXNzYWdlcy5wdXNoKHJlc3VsdC5yZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiB0aGlzLnJlc3VsdF9tZXNzYWdlcy5qb2luKFwiXFxuIyMjXFxuXCIpLFxuICAgICAgICAgICAgICAgIG5leHRfc3RlcDogcmVzdWx0Py5uZXh0X3N0ZXAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW50ZXJuYWwgbWV0aG9kIHRvIGhhbmRsZSB0aGUgY2hlY2staW4gcHJvY2Vzcy5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgY2hlY2staW4gcmVzcG9uc2UuXG4gICAgICovXG4gICAgYXN5bmMgX2hhbmRsZSgpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICBgUmVjZWl2ZWQgcmVxdWVzdCBmcm9tICR7dGhpcy5mcm9tfSB3aXRoIGJvZHk6ICR7dGhpcy5ib2R5fSBhbmQgc3RhdGUgJHt0aGlzLmJ2bnNwX25leHRfc3RlcH1gXG4gICAgICAgICk7XG4gICAgICAgIGlmICh0aGlzLmJvZHkgPT0gXCJsb2dvdXRcIikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmZvcm1pbmcgbG9nb3V0YCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5sb2dvdXQoKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVzcG9uc2U6IEJWTlNQUmVzcG9uc2UgfCB1bmRlZmluZWQ7XG4gICAgICAgIGlmICghdGhpcy5jb25maWcuVVNFX1NFUlZJQ0VfQUNDT1VOVCkge1xuICAgICAgICAgICAgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmNoZWNrX3VzZXJfY3JlZHMoKTtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZSkgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmJvZHk/LnRvTG93ZXJDYXNlKCkgPT09IFwicmVzdGFydFwiKSB7XG4gICAgICAgICAgICByZXR1cm4ge3Jlc3BvbnNlOiBcIk9rYXkuIFRleHQgbWUgYWdhaW4gdG8gc3RhcnQgb3Zlci4uLlwifTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3BvbnNlID0gYXdhaXQgdGhpcy5nZXRfbWFwcGVkX3BhdHJvbGxlcigpO1xuICAgICAgICBpZiAocmVzcG9uc2UgfHwgdGhpcy5wYXRyb2xsZXIgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICByZXNwb25zZSB8fCB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBcIlVuZXhwZWN0ZWQgZXJyb3IgbG9va2luZyB1cCBwYXRyb2xsZXIgbWFwcGluZ1wiLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICAoIXRoaXMuYnZuc3BfbmV4dF9zdGVwIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5idm5zcF9uZXh0X3N0ZXAgPT0gTkVYVF9TVEVQUy5BV0FJVF9DT01NQU5EKSAmJlxuICAgICAgICAgICAgdGhpcy5ib2R5XG4gICAgICAgICkge1xuICAgICAgICAgICAgY29uc3QgYXdhaXRfcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmhhbmRsZV9hd2FpdF9jb21tYW5kKCk7XG4gICAgICAgICAgICBpZiAoYXdhaXRfcmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXRfcmVzcG9uc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICB0aGlzLmJ2bnNwX25leHRfc3RlcCA9PSBORVhUX1NURVBTLkFXQUlUX0NIRUNLSU4gJiZcbiAgICAgICAgICAgIHRoaXMuYm9keVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcnNlX2NoZWNraW4odGhpcy5ib2R5KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmNoZWNraW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHRoaXMuYnZuc3BfbmV4dF9zdGVwPy5zdGFydHNXaXRoKFxuICAgICAgICAgICAgICAgIE5FWFRfU1RFUFMuQ09ORklSTV9SRVNFVFxuICAgICAgICAgICAgKSAmJlxuICAgICAgICAgICAgdGhpcy5ib2R5XG4gICAgICAgICkge1xuICAgICAgICAgICAgaWYgKHRoaXMuYm9keSA9PSBcInllc1wiICYmIHRoaXMucGFyc2VfY2hlY2tpbl9mcm9tX25leHRfc3RlcCgpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgICAgIGBQZXJmb3JtaW5nIHJlc2V0X3NoZWV0X2Zsb3cgZm9yICR7dGhpcy5wYXRyb2xsZXIubmFtZX0gd2l0aCBjaGVja2luIG1vZGU6ICR7dGhpcy5jaGVja2luX21vZGV9YFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgKGF3YWl0IHRoaXMucmVzZXRfc2hlZXRfZmxvdygpKSB8fCAoYXdhaXQgdGhpcy5jaGVja2luKCkpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHRoaXMuYnZuc3BfbmV4dF9zdGVwPy5zdGFydHNXaXRoKE5FWFRfU1RFUFMuQVVUSF9SRVNFVClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wYXJzZV9jaGVja2luX2Zyb21fbmV4dF9zdGVwKCkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICAgICAgYFBlcmZvcm1pbmcgcmVzZXRfc2hlZXRfZmxvdy1wb3N0LWF1dGggZm9yICR7dGhpcy5wYXRyb2xsZXIubmFtZX0gd2l0aCBjaGVja2luIG1vZGU6ICR7dGhpcy5jaGVja2luX21vZGV9YFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgKGF3YWl0IHRoaXMucmVzZXRfc2hlZXRfZmxvdygpKSB8fCAoYXdhaXQgdGhpcy5jaGVja2luKCkpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHRoaXMuYnZuc3BfbmV4dF9zdGVwPy5zdGFydHNXaXRoKE5FWFRfU1RFUFMuQVdBSVRfU0VDVElPTikgJiZcbiAgICAgICAgICAgIHRoaXMuYm9keVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnN0IHNlY3Rpb24gPSB0aGlzLnNlY3Rpb25fdmFsdWVzLnBhcnNlX3NlY3Rpb24odGhpcy5ib2R5KVxuICAgICAgICAgICAgaWYgKHNlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5hc3NpZ25fc2VjdGlvbihzZWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnByb21wdF9zZWN0aW9uX2Fzc2lnbm1lbnQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHRoaXMuYnZuc3BfbmV4dF9zdGVwID09PSBORVhUX1NURVBTLkFXQUlUX01FU1NBR0UgJiZcbiAgICAgICAgICAgIHRoaXMuYm9keV9yYXdcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5zZW5kX3RleHRfbWVzc2FnZSh0aGlzLmJvZHlfcmF3KTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHRoaXMuYnZuc3BfbmV4dF9zdGVwID09PSBORVhUX1NURVBTLkFXQUlUX0JST0FEQ0FTVCAmJlxuICAgICAgICAgICAgdGhpcy5ib2R5X3Jhd1xuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnNlbmRfYnJvYWRjYXN0X21lc3NhZ2UodGhpcy5ib2R5X3Jhdyk7XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICB0aGlzLmJ2bnNwX25leHRfc3RlcD8uc3RhcnRzV2l0aChORVhUX1NURVBTLkFXQUlUX0JFQUNPTikgJiZcbiAgICAgICAgICAgIHRoaXMuYm9keVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnN0IGJlYWNvbl9zZWFyY2hfbG9jYXRpb24gPSBhd2FpdCB0aGlzLnBhcnNlX2JlYWNvbl9zZWFyY2hfbG9jYXRpb24odGhpcy5ib2R5KVxuICAgICAgICAgICAgaWYgKGJlYWNvbl9zZWFyY2hfbG9jYXRpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5zZXRfYmVhY29uX3NlYXJjaChiZWFjb25fc2VhcmNoX2xvY2F0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnByb21wdF9iZWFjb25fc2VhcmNoKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5idm5zcF9uZXh0X3N0ZXApIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuc2VuZF9tZXNzYWdlKFwiU29ycnksIEkgZGlkbid0IHVuZGVyc3RhbmQgdGhhdC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucHJvbXB0X2NvbW1hbmQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIHRoZSBhd2FpdCBjb21tYW5kIHN0ZXAuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZSB8IHVuZGVmaW5lZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHJlc3BvbnNlIG9yIHVuZGVmaW5lZC5cbiAgICAgKi9cbiAgICBhc3luYyBoYW5kbGVfYXdhaXRfY29tbWFuZCgpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2UgfCB1bmRlZmluZWQ+IHtcbiAgICAgICAgY29uc3QgcGF0cm9sbGVyX25hbWUgPSB0aGlzLnBhdHJvbGxlciEubmFtZTtcbiAgICAgICAgaWYgKHRoaXMucGFyc2VfZmFzdF9jaGVja2luX21vZGUodGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgIGBQZXJmb3JtaW5nIGZhc3QgY2hlY2tpbiBmb3IgJHtwYXRyb2xsZXJfbmFtZX0gd2l0aCBtb2RlOiAke3RoaXMuY2hlY2tpbl9tb2RlfWBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5jaGVja2luKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKENPTU1BTkRTLk9OX0RVVFkuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIGdldF9vbl9kdXR5IGZvciAke3BhdHJvbGxlcl9uYW1lfWApO1xuICAgICAgICAgICAgcmV0dXJuIHsgcmVzcG9uc2U6IGF3YWl0IHRoaXMuZ2V0X29uX2R1dHkoKSB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ2hlY2tpbmcgZm9yIHN0YXR1cy4uLlwiKTtcbiAgICAgICAgaWYgKENPTU1BTkRTLlNUQVRVUy5pbmNsdWRlcyh0aGlzLmJvZHkhKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmZvcm1pbmcgZ2V0X3N0YXR1cyBmb3IgJHtwYXRyb2xsZXJfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldF9zdGF0dXMoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQ09NTUFORFMuQ0hFQ0tJTi5pbmNsdWRlcyh0aGlzLmJvZHkhKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmZvcm1pbmcgcHJvbXB0X2NoZWNraW4gZm9yICR7cGF0cm9sbGVyX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9tcHRfY2hlY2tpbigpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDT01NQU5EUy5HVUVTVF9QQVNTLmluY2x1ZGVzKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBwcm9tcHRfZ3Vlc3RfcGFzcyBmb3IgJHtwYXRyb2xsZXJfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnByb21wdF9ndWVzdF9wYXNzKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKENPTU1BTkRTLkJFQUNPTi5pbmNsdWRlcyh0aGlzLmJvZHkhKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmZvcm1pbmcgcHJvbXB0X2JlYWNvbiBmb3IgJHtwYXRyb2xsZXJfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnByb21wdF9iZWFjb25fc2VhcmNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucGFyc2VfZmFzdF9zZWN0aW9uX2Fzc2lnbm1lbnQodGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIGZhc3Qgc2VjdGlvbl9hc3NpZ25tZW50IGZvciAke3BhdHJvbGxlcl9uYW1lfSB0byAke3RoaXMuYXNzaWduZWRfc2VjdGlvbn1gKTtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmFzc2lnbl9zZWN0aW9uKHRoaXMuYXNzaWduZWRfc2VjdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKENPTU1BTkRTLlNFQ1RJT05fQVNTSUdOTUVOVC5pbmNsdWRlcyh0aGlzLmJvZHkhKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmZvcm1pbmcgc2VjdGlvbl9hc3NpZ25tZW50IGZvciAke3BhdHJvbGxlcl9uYW1lfWApO1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucHJvbXB0X3NlY3Rpb25fYXNzaWdubWVudCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDT01NQU5EUy5XSEFUU0FQUC5pbmNsdWRlcyh0aGlzLmJvZHkhKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYEknbSBhdmFpbGFibGUgb24gV2hhdHNBcHAgYXMgd2VsbCEgV2hhdHNBcHAgdXNlcyBXaWZpL0NlbGwgRGF0YSBpbnN0ZWFkIG9mIFNNUywgYW5kIGNhbiBiZSBtb3JlIHJlbGlhYmxlLiBNZXNzYWdlIG1lIGF0IGh0dHBzOi8vd2EubWUvMSR7dGhpcy50b31gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQ09NTUFORFMuTUVTU0FHRS5pbmNsdWRlcyh0aGlzLmJvZHkhKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmZvcm1pbmcgbWVzc2FnZSBmb3IgJHtwYXRyb2xsZXJfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnByb21wdF9tZXNzYWdlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKENPTU1BTkRTLkJST0FEQ0FTVC5pbmNsdWRlcyh0aGlzLmJvZHkhKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmZvcm1pbmcgYnJvYWRjYXN0IGZvciAke3BhdHJvbGxlcl9uYW1lfWApO1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucHJvbXB0X2Jyb2FkY2FzdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvbXB0cyB0aGUgdXNlciBmb3IgYSBjb21tYW5kLlxuICAgICAqIEByZXR1cm5zIHtCVk5TUFJlc3BvbnNlfSBUaGUgcmVzcG9uc2UgcHJvbXB0aW5nIHRoZSB1c2VyIGZvciBhIGNvbW1hbmQuXG4gICAgICovXG4gICAgcHJvbXB0X2NvbW1hbmQoKTogQlZOU1BSZXNwb25zZSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZTogYCR7dGhpcy5wYXRyb2xsZXIhLm5hbWV9LCBJJ20gdGhlIEJWTlNQIEJvdC5cbkVudGVyIGEgY29tbWFuZDpcbkNoZWNrIGluIC8gQ2hlY2sgb3V0IC8gU3RhdHVzIC8gQmVhY29uIC8gU2VjdGlvbiBBc3NpZ25tZW50IC8gR3Vlc3QgUGFzcyAvIE9uIER1dHkgLyBNZXNzYWdlIC8gV2hhdHNBcHBcblNlbmQgJ3Jlc3RhcnQnIGF0IGFueSB0aW1lIHRvIGJlZ2luIGFnYWluYCxcbiAgICAgICAgICAgIG5leHRfc3RlcDogTkVYVF9TVEVQUy5BV0FJVF9DT01NQU5ELFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb21wdHMgdGhlIHVzZXIgZm9yIGEgY2hlY2staW4uXG4gICAgICogQHJldHVybnMge0JWTlNQUmVzcG9uc2V9IFRoZSByZXNwb25zZSBwcm9tcHRpbmcgdGhlIHVzZXIgZm9yIGEgY2hlY2staW4uXG4gICAgICovXG4gICAgcHJvbXB0X2NoZWNraW4oKTogQlZOU1BSZXNwb25zZSB7XG4gICAgICAgIGNvbnN0IHR5cGVzID0gT2JqZWN0LnZhbHVlcyh0aGlzLmNoZWNraW5fdmFsdWVzLmJ5X2tleSkubWFwKFxuICAgICAgICAgICAgKHgpID0+IHguc21zX2Rlc2NcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3BvbnNlOiBgJHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICAgICAgfSwgdXBkYXRlIHBhdHJvbGxpbmcgc3RhdHVzIHRvOiAke3R5cGVzXG4gICAgICAgICAgICAgICAgLnNsaWNlKDAsIC0xKVxuICAgICAgICAgICAgICAgIC5qb2luKFwiLCBcIil9LCBvciAke3R5cGVzLnNsaWNlKC0xKX0/YCxcbiAgICAgICAgICAgIG5leHRfc3RlcDogTkVYVF9TVEVQUy5BV0FJVF9DSEVDS0lOLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICogUGFyc2VzIHRoZSBmYXN0IHNlY3Rpb24gYXNzaWdubWVudCBmcm9tIHRoZSBtZXNzYWdlIGJvZHkuXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gYm9keSAtIFRoZSBtZXNzYWdlIGJvZHkuXG4gICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc2VjdGlvbiBhc3NpZ25tZW50IGlzIHBhcnNlZCwgb3RoZXJ3aXNlIGZhbHNlLlxuICAgICovXG4gICAgcGFyc2VfZmFzdF9zZWN0aW9uX2Fzc2lnbm1lbnQoYm9keTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgdGhpcy5hc3NpZ25lZF9zZWN0aW9uID0gbnVsbDtcbiAgICBpZiAoIWJvZHkgfHwgIWJvZHkuaW5jbHVkZXMoXCItXCIpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3Qgc2VnbWVudHMgPSBib2R5LnNwbGl0KFwiLVwiKTtcbiAgICBjb25zdCBsYXN0U2VnbWVudCA9IHNlZ21lbnRzLnBvcCgpO1xuICAgIGNvbnN0IGZpcnN0UGFydCA9IHNlZ21lbnRzLmpvaW4oXCItXCIpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICBpZiAobGFzdFNlZ21lbnQgJiYgQ09NTUFORFMuU0VDVElPTl9BU1NJR05NRU5ULmluY2x1ZGVzKGZpcnN0UGFydCkpIHtcbiAgICAgICAgdGhpcy5hc3NpZ25lZF9zZWN0aW9uID0gdGhpcy5zZWN0aW9uX3ZhbHVlcy5tYXBfc2VjdGlvbihsYXN0U2VnbWVudC50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXNzaWduZWRfc2VjdGlvbiAhPT0gbnVsbCAmJiB0aGlzLmFzc2lnbmVkX3NlY3Rpb24gIT09IFwiXCI7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm9tcHRzIHRoZSB1c2VyIGZvciBzZWN0aW9uIGFzc2lnbm1lbnQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHJlc3BvbnNlLlxuICAgICAqL1xuICAgIGFzeW5jIHByb21wdF9zZWN0aW9uX2Fzc2lnbm1lbnQoKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlPiB7XG4gICAgICAgIGlmICghdGhpcy5wYXRyb2xsZXIgfHwgIXRoaXMucGF0cm9sbGVyLmNoZWNraW4pIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGAke3RoaXMucGF0cm9sbGVyIS5uYW1lfSBpcyBub3QgY2hlY2tlZCBpbi5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZWN0aW9uX2Rlc2NyaXB0aW9uID0gdGhpcy5zZWN0aW9uX3ZhbHVlcy5nZXRfc2VjdGlvbl9kZXNjcmlwdGlvbigpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IGBFbnRlciB5b3VyIGFzc2lnbmVkIHNlY3Rpb247IG9uZSBvZiAke3NlY3Rpb25fZGVzY3JpcHRpb259IChvciAncmVzdGFydCcpYCxcbiAgICAgICAgICAgIG5leHRfc3RlcDogTkVYVF9TVEVQUy5BV0FJVF9TRUNUSU9OLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEJ1aWxkcyB0aGUgbWVzc2FnZSBwcmVmaXggZm9yIGEgdGV4dCBtZXNzYWdlIGZyb20gYSBwYXRyb2xsZXIuXG4gICAgICogSW5jbHVkZXMgdGhlIHNlbmRlcidzIG5hbWUgYW5kIGZvcm1hdHRlZCBwaG9uZSBudW1iZXIuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbmRlcl9uYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHBhdHJvbGxlciBzZW5kaW5nIHRoZSBtZXNzYWdlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZW5kZXJfcGhvbmUgLSBUaGUgc2VuZGVyJ3MgMTAtZGlnaXQgcGhvbmUgbnVtYmVyLlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBtZXNzYWdlIHByZWZpeC4gZm9yIGV4YW1wbGUgOiBcIk1lc3NhZ2UgZnJvbSBKb2huIERvZSAoMTIzKTQ1Ni03ODkwXCIuXG4gICAgICovXG4gICAgZ2V0X21lc3NhZ2VfcHJlZml4KHNlbmRlcl9uYW1lOiBzdHJpbmcsIHNlbmRlcl9waG9uZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkX3Bob25lID0gZm9ybWF0X3Bob25lX2Zvcl9kaXNwbGF5KHNlbmRlcl9waG9uZSk7XG4gICAgICAgIHJldHVybiBgJHtNRVNTQUdFX1BSRUZJWF9URU1QTEFURX0ke3NlbmRlcl9uYW1lfSAke2Zvcm1hdHRlZF9waG9uZX0ke01FU1NBR0VfUFJFRklYX1NVRkZJWH1gO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgdGhlIG1heGltdW0gYWxsb3dlZCBtZXNzYWdlIGxlbmd0aCBmb3IgYSB0ZXh0IG1lc3NhZ2UuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbmRlcl9uYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHBhdHJvbGxlciBzZW5kaW5nIHRoZSBtZXNzYWdlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZW5kZXJfcGhvbmUgLSBUaGUgc2VuZGVyJ3MgMTAtZGlnaXQgcGhvbmUgbnVtYmVyLlxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBtYXhpbXVtIG51bWJlciBvZiBjaGFyYWN0ZXJzIHRoZSB1c2VyJ3MgbWVzc2FnZSBjYW4gY29udGFpbi5cbiAgICAgKi9cbiAgICBnZXRfbWF4X21lc3NhZ2VfbGVuZ3RoKHNlbmRlcl9uYW1lOiBzdHJpbmcsIHNlbmRlcl9waG9uZTogc3RyaW5nKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIFNNU19NQVhfTEVOR1RIIC0gdGhpcy5nZXRfbWVzc2FnZV9wcmVmaXgoc2VuZGVyX25hbWUsIHNlbmRlcl9waG9uZSkubGVuZ3RoO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb21wdHMgdGhlIHVzZXIgdG8gdHlwZSB0aGVpciB0ZXh0IG1lc3NhZ2UuXG4gICAgICogQW55IHBhdHJvbGxlciB3aXRoIGEgdmFsaWQgcGhvbmUgbnVtYmVyIGNhbiBzZW5kIGEgbWVzc2FnZSwgcmVnYXJkbGVzc1xuICAgICAqIG9mIHRoZWlyIG93biBjaGVjay1pbiBzdGF0dXMuICBUaGUgcmVjaXBpZW50IGxpc3QgaW5jbHVkZXMgYWxsXG4gICAgICogcGF0cm9sbGVycyB3aG8gaGF2ZSBhbnkgY2hlY2staW4gc3RhdHVzIChBbGwgRGF5LCBIYWxmIEFNLCBIYWxmIFBNLFxuICAgICAqIG9yIENoZWNrZWQgT3V0KSwgaW5jbHVkaW5nIHRoZSBzZW5kZXIgdGhlbXNlbHZlcyBpZiB0aGV5IGFyZSBjaGVja2VkIGluLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBwcm9tcHQgcmVzcG9uc2UuXG4gICAgICovXG4gICAgYXN5bmMgcHJvbXB0X21lc3NhZ2UoKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKTtcbiAgICAgICAgY29uc3QgcmVjaXBpZW50cyA9IGxvZ2luX3NoZWV0LmdldF9vbl9kdXR5X3BhdHJvbGxlcnMoKTtcbiAgICAgICAgaWYgKHJlY2lwaWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgTm8gcGF0cm9sbGVycyBhcmUgY3VycmVudGx5IGxvZ2dlZCBpbi4gVGhlcmUgaXMgbm9ib2R5IHRvIHNlbmQgYSBtZXNzYWdlIHRvLmAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNlbmRlcl9waG9uZSA9IHNhbml0aXplX3Bob25lX251bWJlcih0aGlzLmZyb20pO1xuICAgICAgICBjb25zdCBtYXhfbGVuZ3RoID0gdGhpcy5nZXRfbWF4X21lc3NhZ2VfbGVuZ3RoKHRoaXMucGF0cm9sbGVyIS5uYW1lLCBzZW5kZXJfcGhvbmUpO1xuICAgICAgICBpZiAobWF4X2xlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgWW91ciBuYW1lIGlzIHRvbyBsb25nIHRvIHNlbmQgYSB0ZXh0IG1lc3NhZ2UuYCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3BvbnNlOiBgUGxlYXNlIHR5cGUgYSBtZXNzYWdlIG9mIG5vIG1vcmUgdGhhbiAke21heF9sZW5ndGh9IHBsYWluLXRleHQgY2hhcmFjdGVycyB0byAke3JlY2lwaWVudHMubGVuZ3RofSBwYXRyb2xsZXIke3JlY2lwaWVudHMubGVuZ3RoICE9PSAxID8gXCJzXCIgOiBcIlwifSwgb3IgJ3Jlc3RhcnQnIHRvIGNhbmNlbC5gLFxuICAgICAgICAgICAgbmV4dF9zdGVwOiBORVhUX1NURVBTLkFXQUlUX01FU1NBR0UsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VuZHMgYSB0ZXh0IG1lc3NhZ2UgdG8gYWxsIHBhdHJvbGxlcnMgd2l0aCBhIGNoZWNrLWluIHN0YXR1cyBmb3IgdGhlIGRheS5cbiAgICAgKiBUaGUgc2VuZGVyIGFsc28gcmVjZWl2ZXMgdGhlIG1lc3NhZ2UgaWYgdGhleSBoYXZlIGEgY2hlY2staW4gc3RhdHVzLlxuICAgICAqIFZhbGlkYXRlcyB0aGF0IHRoZSBjb21wbGV0ZSBtZXNzYWdlIChwcmVmaXggKyBib2R5KSB1c2VzIG9ubHkgR1NNLTdcbiAgICAgKiBjaGFyYWN0ZXJzIGFuZCBmaXRzIHdpdGhpbiBhIHNpbmdsZSBTTVMgc2VnbWVudCwgdXNpbmcgdGhlXG4gICAgICogc21zLXNlZ21lbnRzLWNhbGN1bGF0b3IgbGlicmFyeS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZV90ZXh0IC0gVGhlIHJhdyBtZXNzYWdlIHRleHQgZnJvbSB0aGUgc2VuZGVyLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBzZW5kIHJlc3VsdC5cbiAgICAgKi9cbiAgICBhc3luYyBzZW5kX3RleHRfbWVzc2FnZShtZXNzYWdlX3RleHQ6IHN0cmluZyk6IFByb21pc2U8QlZOU1BSZXNwb25zZT4ge1xuICAgICAgICBjb25zdCBzZW5kZXJfbmFtZSA9IHRoaXMucGF0cm9sbGVyIS5uYW1lO1xuICAgICAgICBjb25zdCBzZW5kZXJfcGhvbmUgPSBzYW5pdGl6ZV9waG9uZV9udW1iZXIodGhpcy5mcm9tKTtcbiAgICAgICAgY29uc3QgcHJlZml4ID0gdGhpcy5nZXRfbWVzc2FnZV9wcmVmaXgoc2VuZGVyX25hbWUsIHNlbmRlcl9waG9uZSk7XG4gICAgICAgIGNvbnN0IG1heF9sZW5ndGggPSB0aGlzLmdldF9tYXhfbWVzc2FnZV9sZW5ndGgoc2VuZGVyX25hbWUsIHNlbmRlcl9waG9uZSk7XG4gICAgICAgIGNvbnN0IGZ1bGxfbWVzc2FnZSA9IHByZWZpeCArIG1lc3NhZ2VfdGV4dDtcblxuICAgICAgICBjb25zdCB2YWxpZGF0aW9uID0gdmFsaWRhdGVfc21zX21lc3NhZ2UoZnVsbF9tZXNzYWdlKTtcbiAgICAgICAgaWYgKCF2YWxpZGF0aW9uLnZhbGlkKSB7XG4gICAgICAgICAgICBpZiAodmFsaWRhdGlvbi5yZWFzb24gPT09IFwibm9uX2dzbTdcIikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJhZF9jaGFycyA9IHZhbGlkYXRpb24ubm9uX2dzbV9jaGFyYWN0ZXJzIS5qb2luKFwiIFwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICByZXNwb25zZTogYFlvdXIgbWVzc2FnZSBjb250YWlucyBjaGFyYWN0ZXJzIHRoYXQgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gcGxhaW4tdGV4dCBTTVM6ICR7YmFkX2NoYXJzfS4gUGxlYXNlIHVzZSBvbmx5IHN0YW5kYXJkIGNoYXJhY3RlcnMgYW5kIHRyeSBhZ2Fpbi5gLFxuICAgICAgICAgICAgICAgICAgICBuZXh0X3N0ZXA6IE5FWFRfU1RFUFMuQVdBSVRfTUVTU0FHRSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYFlvdXIgbWVzc2FnZSBpcyAke21lc3NhZ2VfdGV4dC5sZW5ndGh9IGNoYXJhY3RlcnMsIHdoaWNoIGV4Y2VlZHMgdGhlIGxpbWl0IG9mICR7bWF4X2xlbmd0aH0uIFBsZWFzZSBzaG9ydGVuIHlvdXIgbWVzc2FnZSBhbmQgdHJ5IGFnYWluLCBvciB0eXBlICdyZXN0YXJ0JyB0byBjYW5jZWwuYCxcbiAgICAgICAgICAgICAgICBuZXh0X3N0ZXA6IE5FWFRfU1RFUFMuQVdBSVRfTUVTU0FHRSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG4gICAgICAgIGNvbnN0IHNpZ25lZF9pbl9wYXRyb2xsZXJzID0gbG9naW5fc2hlZXQuZ2V0X29uX2R1dHlfcGF0cm9sbGVycygpO1xuICAgICAgICBjb25zdCBwaG9uZV9tYXAgPSBhd2FpdCB0aGlzLmdldF9waG9uZV9udW1iZXJfbWFwKCk7XG5cbiAgICAgICAgLy8gQnVpbGQgcmVjaXBpZW50IG1hcCBmb3Igb24tZHV0eSBwYXRyb2xsZXJzIHdpdGgga25vd24gcGhvbmVzOyB0cmFjayBtaXNzaW5nXG4gICAgICAgIGNvbnN0IHJlY2lwaWVudF9tYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7fTtcbiAgICAgICAgY29uc3Qgbm9fcGhvbmVfbmFtZXM6IHN0cmluZ1tdID0gW107XG4gICAgICAgIGZvciAoY29uc3QgcGF0cm9sbGVyIG9mIHNpZ25lZF9pbl9wYXRyb2xsZXJzKSB7XG4gICAgICAgICAgICBjb25zdCBwaG9uZSA9IHBob25lX21hcFtwYXRyb2xsZXIubmFtZV07XG4gICAgICAgICAgICBpZiAocGhvbmUpIHtcbiAgICAgICAgICAgICAgICByZWNpcGllbnRfbWFwW3BhdHJvbGxlci5uYW1lXSA9IHBob25lO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBub19waG9uZV9uYW1lcy5wdXNoKHBhdHJvbGxlci5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHsgc2VudF9jb3VudCwgY29weV9zZW50X3RvX3NlbmRlciwgZmFpbGVkX25hbWVzIH0gPVxuICAgICAgICAgICAgYXdhaXQgdGhpcy5kZWxpdmVyX3Ntc190b19tYXAocmVjaXBpZW50X21hcCwgZnVsbF9tZXNzYWdlLCBzZW5kZXJfbmFtZSk7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKGB0ZXh0X21lc3NhZ2UoJHtzZW50X2NvdW50ICsgKGNvcHlfc2VudF90b19zZW5kZXIgPyAxIDogMCl9KWApO1xuXG4gICAgICAgIGxldCByZXNwb25zZSA9IGBNZXNzYWdlIHNlbnQgdG8gJHtzZW50X2NvdW50fSBwYXRyb2xsZXIke3NlbnRfY291bnQgIT09IDEgPyBcInNcIiA6IFwiXCJ9YDtcbiAgICAgICAgaWYgKGNvcHlfc2VudF90b19zZW5kZXIpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlICs9IGAgYW5kIGEgY29weSB0byB5b3UuYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3BvbnNlICs9IGAuYDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhbGxfZmFpbGVkID0gWy4uLm5vX3Bob25lX25hbWVzLCAuLi5mYWlsZWRfbmFtZXNdO1xuICAgICAgICBpZiAoYWxsX2ZhaWxlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXNwb25zZSArPSBgIENvdWxkIG5vdCBzZW5kIHRvOiAke2FsbF9mYWlsZWQuam9pbihcIiwgXCIpfS5gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHJlc3BvbnNlIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29yZSBTTVMgZGVsaXZlcnkgbG9vcC4gU2VuZHMgZnVsbF9tZXNzYWdlIHRvIGVhY2ggZW50cnkgaW4gcmVjaXBpZW50X21hcFxuICAgICAqIChuYW1lIOKGkiBcIisxWFhYWFhYWFhYWFwiKS4gSWYgdGhlIHNlbmRlcidzIHBob25lIGlzIG5vdCBhbW9uZyB0aGUgcmVjaXBpZW50cyxcbiAgICAgKiBhIGNvcHkgaXMgc2VudCB0byB0aGlzLmZyb20uIFJldHVybnMgZGVsaXZlcnkgYWNjb3VudGluZyBkYXRhLlxuICAgICAqIEBwYXJhbSB7UmVjb3JkPHN0cmluZywgc3RyaW5nPn0gcmVjaXBpZW50X21hcCAtIE1hcCBvZiBwYXRyb2xsZXIgbmFtZSB0byBcIisxWFhYWFhYWFhYWFwiIHBob25lLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmdWxsX21lc3NhZ2UgLSBUaGUgY29tcGxldGUgZm9ybWF0dGVkIFNNUyB0byBzZW5kLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZW5kZXJfbmFtZSAtIFRoZSBzZW5kZXIncyBuYW1lICh1c2VkIGZvciBmYWlsdXJlIGxvZ2dpbmcpLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPG9iamVjdD59IERlbGl2ZXJ5IGNvdW50cyBhbmQgZmFpbHVyZSBsaXN0LlxuICAgICAqL1xuICAgIGFzeW5jIGRlbGl2ZXJfc21zX3RvX21hcChcbiAgICAgICAgcmVjaXBpZW50X21hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nPixcbiAgICAgICAgZnVsbF9tZXNzYWdlOiBzdHJpbmcsXG4gICAgICAgIHNlbmRlcl9uYW1lOiBzdHJpbmcsXG4gICAgKTogUHJvbWlzZTx7IHNlbnRfY291bnQ6IG51bWJlcjsgY29weV9zZW50X3RvX3NlbmRlcjogYm9vbGVhbjsgZmFpbGVkX25hbWVzOiBzdHJpbmdbXSB9PiB7XG4gICAgICAgIGxldCBzZW50X2NvdW50ID0gMDtcbiAgICAgICAgY29uc3QgZmFpbGVkX25hbWVzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgICAgIGZvciAoY29uc3QgW25hbWUsIHBob25lXSBvZiBPYmplY3QuZW50cmllcyhyZWNpcGllbnRfbWFwKSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmdldF90d2lsaW9fY2xpZW50KCkubWVzc2FnZXMuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgdG86IHBob25lLFxuICAgICAgICAgICAgICAgICAgICBmcm9tOiB0aGlzLnRvLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiBmdWxsX21lc3NhZ2UsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc2VudF9jb3VudCsrO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBGYWlsZWQgdG8gc2VuZCBTTVMgdG8gJHtuYW1lfTogJHtlfWApO1xuICAgICAgICAgICAgICAgIGZhaWxlZF9uYW1lcy5wdXNoKG5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2VuZCBhIGNvcHkgdG8gdGhlIHNlbmRlciBpZiB0aGVpciBudW1iZXIgaXMgbm90IGFscmVhZHkgaW4gdGhlIHJlY2lwaWVudCBtYXBcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZF9zZW5kZXIgPSBgKzEke3Nhbml0aXplX3Bob25lX251bWJlcih0aGlzLmZyb20pfWA7XG4gICAgICAgIGNvbnN0IHNlbmRlcl9pbl9tYXAgPSBPYmplY3QudmFsdWVzKHJlY2lwaWVudF9tYXApLmluY2x1ZGVzKG5vcm1hbGl6ZWRfc2VuZGVyKTtcbiAgICAgICAgbGV0IGNvcHlfc2VudF90b19zZW5kZXIgPSBmYWxzZTtcbiAgICAgICAgaWYgKCFzZW5kZXJfaW5fbWFwKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0X3R3aWxpb19jbGllbnQoKS5tZXNzYWdlcy5jcmVhdGUoe1xuICAgICAgICAgICAgICAgICAgICB0bzogdGhpcy5mcm9tLFxuICAgICAgICAgICAgICAgICAgICBmcm9tOiB0aGlzLnRvLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiBmdWxsX21lc3NhZ2UsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29weV9zZW50X3RvX3NlbmRlciA9IHRydWU7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYEZhaWxlZCB0byBzZW5kIFNNUyBjb3B5IHRvIHNlbmRlciAke3NlbmRlcl9uYW1lfTogJHtlfWApO1xuICAgICAgICAgICAgICAgIGZhaWxlZF9uYW1lcy5wdXNoKHNlbmRlcl9uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7IHNlbnRfY291bnQsIGNvcHlfc2VudF90b19zZW5kZXIsIGZhaWxlZF9uYW1lcyB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb21wdHMgdGhlIHVzZXIgdG8gdHlwZSBhIGJyb2FkY2FzdCBtZXNzYWdlIHRvIGFsbCBwYXRyb2xsZXJzLlxuICAgICAqIFVubGlrZSB0aGUgbWVzc2FnZSBjb21tYW5kICh3aGljaCB0YXJnZXRzIG9ubHkgbG9nZ2VkLWluIHBhdHJvbGxlcnMpLCBicm9hZGNhc3RcbiAgICAgKiBzZW5kcyB0byBldmVyeSBwYXRyb2xsZXIgaW4gdGhlIFBob25lIE51bWJlcnMgc2hlZXQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHByb21wdCByZXNwb25zZS5cbiAgICAgKi9cbiAgICBhc3luYyBwcm9tcHRfYnJvYWRjYXN0KCk6IFByb21pc2U8QlZOU1BSZXNwb25zZT4ge1xuICAgICAgICBjb25zdCBwaG9uZV9tYXAgPSBhd2FpdCB0aGlzLmdldF9waG9uZV9udW1iZXJfbWFwKCk7XG4gICAgICAgIGNvbnN0IHJlY2lwaWVudF9jb3VudCA9IE9iamVjdC5rZXlzKHBob25lX21hcCkubGVuZ3RoO1xuICAgICAgICBpZiAocmVjaXBpZW50X2NvdW50ID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgTm8gcGF0cm9sbGVycyB3aXRoIHBob25lIG51bWJlcnMgZm91bmQuIFRoZXJlIGlzIG5vYm9keSB0byBicm9hZGNhc3QgdG8uYCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2VuZGVyX3Bob25lID0gc2FuaXRpemVfcGhvbmVfbnVtYmVyKHRoaXMuZnJvbSk7XG4gICAgICAgIGNvbnN0IG1heF9sZW5ndGggPSB0aGlzLmdldF9tYXhfbWVzc2FnZV9sZW5ndGgodGhpcy5wYXRyb2xsZXIhLm5hbWUsIHNlbmRlcl9waG9uZSk7XG4gICAgICAgIGlmIChtYXhfbGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBZb3VyIG5hbWUgaXMgdG9vIGxvbmcgdG8gc2VuZCBhIGJyb2FkY2FzdCBtZXNzYWdlLmAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZTogYFBsZWFzZSB0eXBlIGEgYnJvYWRjYXN0IG1lc3NhZ2Ugb2Ygbm8gbW9yZSB0aGFuICR7bWF4X2xlbmd0aH0gcGxhaW4tdGV4dCBjaGFyYWN0ZXJzIHRvICR7cmVjaXBpZW50X2NvdW50fSBwYXRyb2xsZXIke3JlY2lwaWVudF9jb3VudCAhPT0gMSA/IFwic1wiIDogXCJcIn0sIG9yICdyZXN0YXJ0JyB0byBjYW5jZWwuYCxcbiAgICAgICAgICAgIG5leHRfc3RlcDogTkVYVF9TVEVQUy5BV0FJVF9CUk9BRENBU1QsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VuZHMgYSBicm9hZGNhc3QgbWVzc2FnZSB0byBBTEwgcGF0cm9sbGVycyBpbiB0aGUgUGhvbmUgTnVtYmVycyBzaGVldCxcbiAgICAgKiByZWdhcmRsZXNzIG9mIGNoZWNrLWluIHN0YXR1cy4gVXNlcyB0aGUgc2FtZSBwcmVmaXggZm9ybWF0IGFuZCBHU00tNyAvIHNpbmdsZS1zZWdtZW50XG4gICAgICogdmFsaWRhdGlvbiBhcyB0aGUgbWVzc2FnZSBjb21tYW5kLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlX3RleHQgLSBUaGUgcmF3IG1lc3NhZ2UgdGV4dCBmcm9tIHRoZSBzZW5kZXIuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHNlbmQgcmVzdWx0LlxuICAgICAqL1xuICAgIGFzeW5jIHNlbmRfYnJvYWRjYXN0X21lc3NhZ2UobWVzc2FnZV90ZXh0OiBzdHJpbmcpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3Qgc2VuZGVyX25hbWUgPSB0aGlzLnBhdHJvbGxlciEubmFtZTtcbiAgICAgICAgY29uc3Qgc2VuZGVyX3Bob25lID0gc2FuaXRpemVfcGhvbmVfbnVtYmVyKHRoaXMuZnJvbSk7XG4gICAgICAgIGNvbnN0IHByZWZpeCA9IHRoaXMuZ2V0X21lc3NhZ2VfcHJlZml4KHNlbmRlcl9uYW1lLCBzZW5kZXJfcGhvbmUpO1xuICAgICAgICBjb25zdCBtYXhfbGVuZ3RoID0gdGhpcy5nZXRfbWF4X21lc3NhZ2VfbGVuZ3RoKHNlbmRlcl9uYW1lLCBzZW5kZXJfcGhvbmUpO1xuICAgICAgICBjb25zdCBmdWxsX21lc3NhZ2UgPSBwcmVmaXggKyBtZXNzYWdlX3RleHQ7XG5cbiAgICAgICAgY29uc3QgdmFsaWRhdGlvbiA9IHZhbGlkYXRlX3Ntc19tZXNzYWdlKGZ1bGxfbWVzc2FnZSk7XG4gICAgICAgIGlmICghdmFsaWRhdGlvbi52YWxpZCkge1xuICAgICAgICAgICAgaWYgKHZhbGlkYXRpb24ucmVhc29uID09PSBcIm5vbl9nc203XCIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBiYWRfY2hhcnMgPSB2YWxpZGF0aW9uLm5vbl9nc21fY2hhcmFjdGVycyEuam9pbihcIiBcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBZb3VyIG1lc3NhZ2UgY29udGFpbnMgY2hhcmFjdGVycyB0aGF0IGFyZSBub3Qgc3VwcG9ydGVkIGluIHBsYWluLXRleHQgU01TOiAke2JhZF9jaGFyc30uIFBsZWFzZSB1c2Ugb25seSBzdGFuZGFyZCBjaGFyYWN0ZXJzIGFuZCB0cnkgYWdhaW4uYCxcbiAgICAgICAgICAgICAgICAgICAgbmV4dF9zdGVwOiBORVhUX1NURVBTLkFXQUlUX0JST0FEQ0FTVCxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYFlvdXIgbWVzc2FnZSBpcyAke21lc3NhZ2VfdGV4dC5sZW5ndGh9IGNoYXJhY3RlcnMsIHdoaWNoIGV4Y2VlZHMgdGhlIGxpbWl0IG9mICR7bWF4X2xlbmd0aH0uIFBsZWFzZSBzaG9ydGVuIHlvdXIgbWVzc2FnZSBhbmQgdHJ5IGFnYWluLCBvciB0eXBlICdyZXN0YXJ0JyB0byBjYW5jZWwuYCxcbiAgICAgICAgICAgICAgICBuZXh0X3N0ZXA6IE5FWFRfU1RFUFMuQVdBSVRfQlJPQURDQVNULFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZvciBicm9hZGNhc3QsIHNlbmQgdG8gQUxMIHBhdHJvbGxlcnMgaW4gdGhlIHBob25lIG51bWJlciBtYXBcbiAgICAgICAgY29uc3QgcGhvbmVfbWFwID0gYXdhaXQgdGhpcy5nZXRfcGhvbmVfbnVtYmVyX21hcCgpO1xuICAgICAgICBjb25zdCB7IHNlbnRfY291bnQsIGNvcHlfc2VudF90b19zZW5kZXIsIGZhaWxlZF9uYW1lcyB9ID1cbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZGVsaXZlcl9zbXNfdG9fbWFwKHBob25lX21hcCwgZnVsbF9tZXNzYWdlLCBzZW5kZXJfbmFtZSk7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKGBicm9hZGNhc3QoJHtzZW50X2NvdW50ICsgKGNvcHlfc2VudF90b19zZW5kZXIgPyAxIDogMCl9KWApO1xuXG4gICAgICAgIGxldCByZXNwb25zZSA9IGBCcm9hZGNhc3Qgc2VudCB0byAke3NlbnRfY291bnR9IHBhdHJvbGxlciR7c2VudF9jb3VudCAhPT0gMSA/IFwic1wiIDogXCJcIn1gO1xuICAgICAgICBpZiAoY29weV9zZW50X3RvX3NlbmRlcikge1xuICAgICAgICAgICAgcmVzcG9uc2UgKz0gYCBhbmQgYSBjb3B5IHRvIHlvdS5gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzcG9uc2UgKz0gYC5gO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZhaWxlZF9uYW1lcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXNwb25zZSArPSBgIENvdWxkIG5vdCBzZW5kIHRvOiAke2ZhaWxlZF9uYW1lcy5qb2luKFwiLCBcIil9LmA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgcmVzcG9uc2UgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb29rcyB1cCBwaG9uZSBudW1iZXJzIGZvciBhbGwgcGF0cm9sbGVycyBmcm9tIHRoZSBQaG9uZSBOdW1iZXJzIHNoZWV0LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFJlY29yZDxzdHJpbmcsIHN0cmluZz4+fSBBIG1hcCBvZiBwYXRyb2xsZXIgbmFtZSB0byBwaG9uZSBudW1iZXIgKGluICsxWFhYWFhYWFhYWCBmb3JtYXQpLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF9waG9uZV9udW1iZXJfbWFwKCk6IFByb21pc2U8UmVjb3JkPHN0cmluZywgc3RyaW5nPj4ge1xuICAgICAgICBjb25zdCBzaGVldHNfc2VydmljZSA9IGF3YWl0IHRoaXMuZ2V0X3NoZWV0c19zZXJ2aWNlKCk7XG4gICAgICAgIGNvbnN0IG9wdHM6IEZpbmRQYXRyb2xsZXJDb25maWcgPSB0aGlzLmNvbWJpbmVkX2NvbmZpZztcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBzaGVldHNfc2VydmljZS5zcHJlYWRzaGVldHMudmFsdWVzLmdldCh7XG4gICAgICAgICAgICBzcHJlYWRzaGVldElkOiBvcHRzLlNIRUVUX0lELFxuICAgICAgICAgICAgcmFuZ2U6IG9wdHMuUEhPTkVfTlVNQkVSX0xPT0tVUF9TSEVFVCxcbiAgICAgICAgICAgIHZhbHVlUmVuZGVyT3B0aW9uOiBcIlVORk9STUFUVEVEX1ZBTFVFXCIsXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIXJlc3BvbnNlLmRhdGEudmFsdWVzKSB7XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge307XG4gICAgICAgIGZvciAoY29uc3Qgcm93IG9mIHJlc3BvbnNlLmRhdGEudmFsdWVzKSB7XG4gICAgICAgICAgICBjb25zdCBuYW1lID0gcm93W2V4Y2VsX3Jvd190b19pbmRleChvcHRzLlBIT05FX05VTUJFUl9OQU1FX0NPTFVNTildO1xuICAgICAgICAgICAgY29uc3QgcmF3TnVtYmVyID0gcm93W2V4Y2VsX3Jvd190b19pbmRleChvcHRzLlBIT05FX05VTUJFUl9OVU1CRVJfQ09MVU1OKV07XG4gICAgICAgICAgICBpZiAobmFtZSAmJiByYXdOdW1iZXIpIHtcbiAgICAgICAgICAgICAgICBtYXBbbmFtZV0gPSBgKzEke3Nhbml0aXplX3Bob25lX251bWJlcihyYXdOdW1iZXIpfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hcDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBc3NpZ25zIHRoZSBzZWN0aW9uIHRvIHRoZSBwYXRyb2xsZXIuXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCBudWxsfSBzZWN0aW9uICBUaGUgc2VjdGlvbiB0byBhc3NpZ24uXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHJlc3BvbnNlLlxuICAgICAqL1xuICAgIGFzeW5jIGFzc2lnbl9zZWN0aW9uKHNlY3Rpb246IHN0cmluZyB8IG51bGwpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgYXNzaWduZWRTZWN0aW9uID0gc2VjdGlvbiA/PyBcIlJvdmluZ1wiO1xuICAgICAgICBjb25zb2xlLmxvZyhgQXNzaWduaW5nIHNlY3Rpb24gJHt0aGlzLnBhdHJvbGxlciEubmFtZX0gdG8gJHthc3NpZ25lZFNlY3Rpb259YCk7XG4gICAgICAgIGNvbnN0IG1hcHBlZF9zZWN0aW9uID0gdGhpcy5zZWN0aW9uX3ZhbHVlcy5tYXBfc2VjdGlvbihhc3NpZ25lZFNlY3Rpb24pO1xuICAgICAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oYGFzc2lnbl9zZWN0aW9uKCR7bWFwcGVkX3NlY3Rpb259KWApO1xuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG4gICAgICAgIGF3YWl0IGxvZ2luX3NoZWV0LmFzc2lnbl9zZWN0aW9uKHRoaXMucGF0cm9sbGVyISwgbWFwcGVkX3NlY3Rpb24pO1xuICAgICAgICBhd2FpdCB0aGlzLmxvZ2luX3NoZWV0Py5yZWZyZXNoKCk7XG4gICAgICAgIGF3YWl0IHRoaXMuZ2V0X21hcHBlZF9wYXRyb2xsZXIodHJ1ZSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZTogYFVwZGF0ZWQgJHt0aGlzLnBhdHJvbGxlciEubmFtZX0gd2l0aCBzZWN0aW9uIGFzc2lnbm1lbnQ6ICR7bWFwcGVkX3NlY3Rpb259LmAsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVjb3JkIHRoZSBiZWFjb24gc2VhcmNoIGZvciB0aGlzIHBhdHJvbGxlclxuICAgICAqIEBwYXJhbXtzdHJpbmcgfSAgYmVhY29uX3NlYXJjaF9sb2NhdGlvbiAgd2hlcmUgdGhlIGJlYWNvbiB3YXMgZm91bmRcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlPn1cbiAgICAgKi9cbiAgICBhc3luYyBzZXRfYmVhY29uX3NlYXJjaChiZWFjb25fc2VhcmNoX2xvY2F0aW9uOiBzdHJpbmcpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc29sZS5sb2coYFNldHRpbmcgYmVhY29uIHNlYXJjaCBmb3IgJHt0aGlzLnBhdHJvbGxlciEubmFtZX0gYXQgJHtiZWFjb25fc2VhcmNoX2xvY2F0aW9ufWApO1xuICAgICAgICBjb25zdCBzaGVldCA9IGF3YWl0IHRoaXMuZ2V0X3NsZWRfYmVhY29uX2NoZWNrX3NoZWV0KCk7XG4gICAgICAgIGNvbnN0IHByaW9yX3NlYXJjaGVzID0gYXdhaXQgc2hlZXQuZ2V0X2JlYWNvbl9zZWFyY2hlcyh0aGlzLnBhdHJvbGxlciEubmFtZSk7XG4gICAgICAgIGlmIChwcmlvcl9zZWFyY2hlcyA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4geyByZXNwb25zZTogXCJQcm9ibGVtIGxvb2tpbmcgdXAgcGF0cm9sbGVyIGZvciBiZWFjb24gc2VhcmNoZXMuXCIgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlY29yZCB0aGUgbmV3IGJlYWNvbiBzZWFyY2hcbiAgICAgICAgYXdhaXQgc2hlZXQuc2V0X2JlYWNvbnNfc2VhcmNoZXMocHJpb3Jfc2VhcmNoZXMsIGJlYWNvbl9zZWFyY2hfbG9jYXRpb24pO1xuXG4gICAgICAgIC8vIFJlLXJlYWQgdGhlIHZhbHVlcyBhbmQgcmV0dXJuIGNvbmZpcm1hdGlvblxuICAgICAgICBjb25zdCB1cGRhdGVkID0gYXdhaXQgc2hlZXQuZ2V0X2JlYWNvbl9zZWFyY2hlcyh0aGlzLnBhdHJvbGxlciEubmFtZSk7XG4gICAgICAgIGlmICh1cGRhdGVkID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHJlc3BvbnNlOiBgVW5hYmxlIHRvIHJlY29yZCBiZWFjb24gc2VhcmNoIGZvciAke3RoaXMucGF0cm9sbGVyIS5uYW1lfSB0b2RheS5gIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3RhdHVzID0gYENvbXBsZXRlZCAke3VwZGF0ZWQuc2VhcmNoX2NvdW50fSBzZWFyY2gke3VwZGF0ZWQuc2VhcmNoX2NvdW50ID09PSAxID8gJycgOiAnZXMnfSB0aGlzIHNlYXNvbi5gO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZTogYFVwZGF0ZWQgJHt0aGlzLnBhdHJvbGxlciEubmFtZX0gdG8gY29tcGxldGUgYmVhY29uIHNlYXJjaCBhdCAke2JlYWNvbl9zZWFyY2hfbG9jYXRpb259IHRvZGF5LlxcbiR7c3RhdHVzfWAsXG4gICAgICAgIH07XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBzdGF0dXMgb2YgdGhlIHBhdHJvbGxlci5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgc3RhdHVzIHJlc3BvbnNlLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF9zdGF0dXMoKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKTtcbiAgICAgICAgY29uc3Qgc2hlZXRfZGF0ZSA9IGxvZ2luX3NoZWV0LnNoZWV0X2RhdGUudG9EYXRlU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfZGF0ZSA9IGxvZ2luX3NoZWV0LmN1cnJlbnRfZGF0ZS50b0RhdGVTdHJpbmcoKTtcbiAgICAgICAgaWYgKCFsb2dpbl9zaGVldC5pc19jdXJyZW50KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgc2hlZXRfZGF0ZTogJHtsb2dpbl9zaGVldC5zaGVldF9kYXRlfWApO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYGN1cnJlbnRfZGF0ZTogJHtsb2dpbl9zaGVldC5jdXJyZW50X2RhdGV9YCk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgU2hlZXQgaXMgbm90IGN1cnJlbnQgZm9yIHRvZGF5IChsYXN0IHJlc2V0OiAke3NoZWV0X2RhdGV9KS4gJHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXIhLm5hbWVcbiAgICAgICAgICAgICAgICB9IGlzIG5vdCBjaGVja2VkIGluIGZvciAke2N1cnJlbnRfZGF0ZX0uYCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB7IHJlc3BvbnNlOiBhd2FpdCB0aGlzLmdldF9zdGF0dXNfc3RyaW5nKCkgfTtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKFwic3RhdHVzXCIpO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgc3RhdHVzIHN0cmluZyBvZiB0aGUgcGF0cm9sbGVyLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHN0cmluZz59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHN0YXR1cyBzdHJpbmcuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3N0YXR1c19zdHJpbmcoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuICAgICAgICBjb25zdCBndWVzdF9wYXNzX3Byb21pc2UgPSAoXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmdldF9ndWVzdF9wYXNzX3NoZWV0KClcbiAgICAgICAgKS5nZXRfYXZhaWxhYmxlX2FuZF91c2VkX3Bhc3Nlcyh0aGlzLnBhdHJvbGxlciEubmFtZSk7XG4gICAgICAgIGNvbnN0IHBhdHJvbGxlcl9zdGF0dXMgPSB0aGlzLnBhdHJvbGxlciE7XG5cbiAgICAgICAgY29uc3QgY2hlY2tpbkNvbHVtblNldCA9XG4gICAgICAgICAgICBwYXRyb2xsZXJfc3RhdHVzLmNoZWNraW4gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgcGF0cm9sbGVyX3N0YXR1cy5jaGVja2luICE9PSBudWxsO1xuICAgICAgICBjb25zdCBjaGVja2VkT3V0ID1cbiAgICAgICAgICAgIGNoZWNraW5Db2x1bW5TZXQgJiZcbiAgICAgICAgICAgIHRoaXMuY2hlY2tpbl92YWx1ZXMuYnlfc2hlZXRfc3RyaW5nW3BhdHJvbGxlcl9zdGF0dXMuY2hlY2tpbl0ua2V5ID09XG4gICAgICAgICAgICAgICAgXCJvdXRcIjtcbiAgICAgICAgbGV0IHN0YXR1cyA9IHBhdHJvbGxlcl9zdGF0dXMuY2hlY2tpbiB8fCBcIk5vdCBQcmVzZW50XCI7XG5cbiAgICAgICAgaWYgKGNoZWNrZWRPdXQpIHtcbiAgICAgICAgICAgIHN0YXR1cyA9IFwiQ2hlY2tlZCBPdXRcIjtcbiAgICAgICAgfSBlbHNlIGlmIChjaGVja2luQ29sdW1uU2V0KSB7XG4gICAgICAgICAgICBsZXQgc2VjdGlvbiA9IHBhdHJvbGxlcl9zdGF0dXMuc2VjdGlvbi50b1N0cmluZygpO1xuICAgICAgICAgICAgaWYgKHNlY3Rpb24ubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgICAgICBzZWN0aW9uID0gYFNlY3Rpb24gJHtzZWN0aW9ufWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdGF0dXMgPSBgJHtwYXRyb2xsZXJfc3RhdHVzLmNoZWNraW59ICgke3NlY3Rpb259KWA7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb21wbGV0ZWRQYXRyb2xEYXlzID0gYXdhaXQgKFxuICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXRfc2Vhc29uX3NoZWV0KClcbiAgICAgICAgKS5nZXRfcGF0cm9sbGVkX2RheXModGhpcy5wYXRyb2xsZXIhLm5hbWUpO1xuICAgICAgICBjb25zdCBjb21wbGV0ZWRQYXRyb2xEYXlzU3RyaW5nID1cbiAgICAgICAgICAgIGNvbXBsZXRlZFBhdHJvbERheXMgPiAwID8gY29tcGxldGVkUGF0cm9sRGF5cy50b1N0cmluZygpIDogXCJOb1wiO1xuICAgICAgICBjb25zdCBsb2dpblNoZWV0RGF0ZSA9IGxvZ2luX3NoZWV0LnNoZWV0X2RhdGUudG9EYXRlU3RyaW5nKCk7XG5cbiAgICAgICAgbGV0IHN0YXR1c1N0cmluZyA9IGBTdGF0dXMgZm9yICR7XG4gICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICB9IG9uIGRhdGUgJHtsb2dpblNoZWV0RGF0ZX06ICR7c3RhdHVzfS5cXG4ke2NvbXBsZXRlZFBhdHJvbERheXNTdHJpbmd9IGNvbXBsZXRlZCBwYXRyb2wgZGF5cyBwcmlvciB0byB0b2RheS5gO1xuICAgICAgICBjb25zdCB1c2VkVG9kYXlHdWVzdFBhc3NlcyA9IChhd2FpdCBndWVzdF9wYXNzX3Byb21pc2UpPy51c2VkX3RvZGF5IHx8IDA7XG4gICAgICAgIGNvbnN0IHVzZWRTZWFzb25HdWVzdFBhc3NlcyA9XG4gICAgICAgICAgICAoYXdhaXQgZ3Vlc3RfcGFzc19wcm9taXNlKT8udXNlZF9zZWFzb24gfHwgMDtcbiAgICAgICAgY29uc3QgYXZhaWxhYmxlR3Vlc3RQYXNzZXMgPSAoYXdhaXQgZ3Vlc3RfcGFzc19wcm9taXNlKT8uYXZhaWxhYmxlIHx8IDA7XG5cblxuICAgICAgICBzdGF0dXNTdHJpbmcgKz1cbiAgICAgICAgICAgIFwiIFwiICtcbiAgICAgICAgICAgIGJ1aWxkX3Bhc3Nlc19zdHJpbmcoXG4gICAgICAgICAgICAgICAgdXNlZFNlYXNvbkd1ZXN0UGFzc2VzLFxuICAgICAgICAgICAgICAgIHVzZWRTZWFzb25HdWVzdFBhc3NlcyArIGF2YWlsYWJsZUd1ZXN0UGFzc2VzLFxuICAgICAgICAgICAgICAgIHVzZWRUb2RheUd1ZXN0UGFzc2VzXG4gICAgICAgICAgICApO1xuICAgICAgICByZXR1cm4gc3RhdHVzU3RyaW5nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIHRoZSBjaGVjay1pbiBwcm9jZXNzIGZvciB0aGUgcGF0cm9sbGVyIG9uY2UgdGhlIGNoZWNrLWluIG1vZGUgaXMgc2V0LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBjaGVjay1pbiByZXNwb25zZS5cbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gVGhyb3dzIGFuIGVycm9yIGlmIHRoZSBjaGVjay1pbiBtb2RlIGlzIGltcHJvcGVybHkgc2V0LlxuICAgICAqL1xuICAgIGFzeW5jIGNoZWNraW4oKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgYFBlcmZvcm1pbmcgcmVndWxhciBjaGVja2luIGZvciAke1xuICAgICAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyIS5uYW1lXG4gICAgICAgICAgICB9IHdpdGggbW9kZTogJHt0aGlzLmNoZWNraW5fbW9kZX1gXG4gICAgICAgICk7XG4gICAgICAgIGlmIChhd2FpdCB0aGlzLnNoZWV0X25lZWRzX3Jlc2V0KCkpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6XG4gICAgICAgICAgICAgICAgICAgIGAke1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXIhLm5hbWVcbiAgICAgICAgICAgICAgICAgICAgfSwgeW91IGFyZSB0aGUgZmlyc3QgcGVyc29uIHRvIGNoZWNrIGluIHRvZGF5LiBgICtcbiAgICAgICAgICAgICAgICAgICAgYEkgbmVlZCB0byBhcmNoaXZlIGFuZCByZXNldCB0aGUgc2hlZXQgYmVmb3JlIGNvbnRpbnVpbmcuIGAgK1xuICAgICAgICAgICAgICAgICAgICBgV291bGQgeW91IGxpa2UgbWUgdG8gZG8gdGhhdD8gKFllcy9ObylgLFxuICAgICAgICAgICAgICAgIG5leHRfc3RlcDogYCR7TkVYVF9TVEVQUy5DT05GSVJNX1JFU0VUfS0ke3RoaXMuY2hlY2tpbl9tb2RlfWAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGxldCBjaGVja2luX21vZGU7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgICF0aGlzLmNoZWNraW5fbW9kZSB8fFxuICAgICAgICAgICAgKGNoZWNraW5fbW9kZSA9IHRoaXMuY2hlY2tpbl92YWx1ZXMuYnlfa2V5W3RoaXMuY2hlY2tpbl9tb2RlXSkgPT09XG4gICAgICAgICAgICAgICAgdW5kZWZpbmVkXG4gICAgICAgICkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2hlY2tpbiBtb2RlIGltcHJvcGVybHkgc2V0XCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuICAgICAgICBjb25zdCBuZXdfY2hlY2tpbl92YWx1ZSA9IGNoZWNraW5fbW9kZS5zaGVldHNfdmFsdWU7XG4gICAgICAgIGF3YWl0IGxvZ2luX3NoZWV0LmNoZWNraW4odGhpcy5wYXRyb2xsZXIhLCBuZXdfY2hlY2tpbl92YWx1ZSk7XG4gICAgICAgIGF3YWl0IHRoaXMubG9nX2FjdGlvbihgdXBkYXRlLXN0YXR1cygke25ld19jaGVja2luX3ZhbHVlfSlgKTtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2dpbl9zaGVldD8ucmVmcmVzaCgpO1xuICAgICAgICBhd2FpdCB0aGlzLmdldF9tYXBwZWRfcGF0cm9sbGVyKHRydWUpO1xuXG4gICAgICAgIGxldCByZXNwb25zZSA9IGBVcGRhdGluZyAke1xuICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXIhLm5hbWVcbiAgICAgICAgfSB3aXRoIHN0YXR1czogJHtuZXdfY2hlY2tpbl92YWx1ZX0uYDtcbiAgICAgICAgaWYgKCF0aGlzLmZhc3RfY2hlY2tpbikge1xuICAgICAgICAgICAgcmVzcG9uc2UgKz0gYCBZb3UgY2FuIHNlbmQgJyR7Y2hlY2tpbl9tb2RlLmZhc3RfY2hlY2tpbnNbMF19JyBhcyB5b3VyIGZpcnN0IG1lc3NhZ2UgZm9yIGEgZmFzdCAke2NoZWNraW5fbW9kZS5zaGVldHNfdmFsdWV9IGNoZWNraW4gbmV4dCB0aW1lLmA7XG4gICAgICAgIH1cbiAgICAgICAgcmVzcG9uc2UgKz0gXCJcXG5cXG5cIiArIChhd2FpdCB0aGlzLmdldF9zdGF0dXNfc3RyaW5nKCkpO1xuICAgICAgICByZXR1cm4geyByZXNwb25zZTogcmVzcG9uc2UgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdGhlIEdvb2dsZSBTaGVldHMgbmVlZHMgdG8gYmUgcmVzZXQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRydWUgaWYgdGhlIHNoZWV0IG5lZWRzIHRvIGJlIHJlc2V0LCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICovXG4gICAgYXN5bmMgc2hlZXRfbmVlZHNfcmVzZXQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKTtcblxuICAgICAgICBjb25zdCBzaGVldF9kYXRlID0gbG9naW5fc2hlZXQuc2hlZXRfZGF0ZTtcbiAgICAgICAgY29uc3QgY3VycmVudF9kYXRlID0gbG9naW5fc2hlZXQuY3VycmVudF9kYXRlO1xuICAgICAgICBjb25zb2xlLmxvZyhgc2hlZXRfZGF0ZTogJHtzaGVldF9kYXRlfWApO1xuICAgICAgICBjb25zb2xlLmxvZyhgY3VycmVudF9kYXRlOiAke2N1cnJlbnRfZGF0ZX1gKTtcblxuICAgICAgICBjb25zb2xlLmxvZyhgZGF0ZV9pc19jdXJyZW50OiAke2xvZ2luX3NoZWV0LmlzX2N1cnJlbnR9YCk7XG5cbiAgICAgICAgcmV0dXJuICFsb2dpbl9zaGVldC5pc19jdXJyZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc2V0cyB0aGUgR29vZ2xlIFNoZWV0cyBmbG93LCBpbmNsdWRpbmcgYXJjaGl2aW5nIGFuZCByZXNldHRpbmcgdGhlIHNoZWV0IGlmIG5lY2Vzc2FyeS5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlIHwgdm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGNoZWNrLWluIHJlc3BvbnNlIG9yIHZvaWQuXG4gICAgICovXG4gICAgYXN5bmMgcmVzZXRfc2hlZXRfZmxvdygpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2UgfCB2b2lkPiB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5jaGVja191c2VyX2NyZWRzKFxuICAgICAgICAgICAgYCR7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXIhLm5hbWVcbiAgICAgICAgICAgIH0sIGluIG9yZGVyIHRvIHJlc2V0L2FyY2hpdmUsIEkgbmVlZCB5b3UgdG8gYXV0aG9yaXplIHRoZSBhcHAuYFxuICAgICAgICApO1xuICAgICAgICBpZiAocmVzcG9uc2UpXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiByZXNwb25zZS5yZXNwb25zZSxcbiAgICAgICAgICAgICAgICBuZXh0X3N0ZXA6IGAke05FWFRfU1RFUFMuQVVUSF9SRVNFVH0tJHt0aGlzLmNoZWNraW5fbW9kZX1gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucmVzZXRfc2hlZXQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXNldHMgdGhlIEdvb2dsZSBTaGVldHMsIGluY2x1ZGluZyBhcmNoaXZpbmcgYW5kIHJlc2V0dGluZyB0aGUgc2hlZXQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHNoZWV0IGlzIHJlc2V0LlxuICAgICAqL1xuICAgIGFzeW5jIHJlc2V0X3NoZWV0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCBzY3JpcHRfc2VydmljZSA9IGF3YWl0IHRoaXMuZ2V0X3VzZXJfc2NyaXB0c19zZXJ2aWNlKCk7XG4gICAgICAgIGNvbnN0IHNob3VsZF9wZXJmb3JtX2FyY2hpdmUgPSAhKGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCkpLmFyY2hpdmVkO1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gc2hvdWxkX3BlcmZvcm1fYXJjaGl2ZVxuICAgICAgICAgICAgPyBcIk9rYXkuIEFyY2hpdmluZyBhbmQgcmVzZXR0aW5nIHRoZSBjaGVjayBpbiBzaGVldC4gVGhpcyB0YWtlcyBhYm91dCAxMCBzZWNvbmRzLi4uXCJcbiAgICAgICAgICAgIDogXCJPa2F5LiBTaGVldCBoYXMgYWxyZWFkeSBiZWVuIGFyY2hpdmVkLiBQZXJmb3JtaW5nIHJlc2V0LiBUaGlzIHRha2VzIGFib3V0IDUgc2Vjb25kcy4uLlwiO1xuICAgICAgICBhd2FpdCB0aGlzLnNlbmRfbWVzc2FnZShtZXNzYWdlKTtcbiAgICAgICAgaWYgKHNob3VsZF9wZXJmb3JtX2FyY2hpdmUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQXJjaGl2aW5nLi4uXCIpO1xuXG4gICAgICAgICAgICBhd2FpdCBzY3JpcHRfc2VydmljZS5zY3JpcHRzLnJ1bih7XG4gICAgICAgICAgICAgICAgc2NyaXB0SWQ6IHRoaXMucmVzZXRfc2NyaXB0X2lkLFxuICAgICAgICAgICAgICAgIHJlcXVlc3RCb2R5OiB7IGZ1bmN0aW9uOiB0aGlzLmNvbmZpZy5BUkNISVZFX0ZVTkNUSU9OX05BTUUgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5kZWxheSg1KTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubG9nX2FjdGlvbihcImFyY2hpdmVcIik7XG4gICAgICAgICAgICB0aGlzLmxvZ2luX3NoZWV0ID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVzZXR0aW5nLi4uXCIpO1xuICAgICAgICBhd2FpdCBzY3JpcHRfc2VydmljZS5zY3JpcHRzLnJ1bih7XG4gICAgICAgICAgICBzY3JpcHRJZDogdGhpcy5yZXNldF9zY3JpcHRfaWQsXG4gICAgICAgICAgICByZXF1ZXN0Qm9keTogeyBmdW5jdGlvbjogdGhpcy5jb25maWcuUkVTRVRfRlVOQ1RJT05fTkFNRSB9LFxuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgdGhpcy5kZWxheSg1KTtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKFwicmVzZXRcIik7XG4gICAgICAgIGF3YWl0IHRoaXMuc2VuZF9tZXNzYWdlKFwiRG9uZS5cIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgR29vZ2xlIEFwcHMgU2NyaXB0IHNlcnZpY2UuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c2NyaXB0X3YxLlNjcmlwdD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIEdvb2dsZSBBcHBzIFNjcmlwdCBzZXJ2aWNlLlxuICAgICAqL1xuICAgIGFzeW5jIGNoZWNrX3VzZXJfY3JlZHMoXG4gICAgICAgIHByb21wdF9tZXNzYWdlOiBzdHJpbmcgPSBcIkhpLCBiZWZvcmUgeW91IGNhbiB1c2UgQlZOU1AgYm90LCB5b3UgbXVzdCBsb2dpbi5cIlxuICAgICk6IFByb21pc2U8QlZOU1BSZXNwb25zZSB8IHVuZGVmaW5lZD4ge1xuICAgICAgICBjb25zdCB1c2VyX2NyZWRzID0gdGhpcy5nZXRfdXNlcl9jcmVkcygpO1xuICAgICAgICBpZiAoIShhd2FpdCB1c2VyX2NyZWRzLmxvYWRUb2tlbigpKSkge1xuICAgICAgICAgICAgY29uc3QgYXV0aFVybCA9IGF3YWl0IHVzZXJfY3JlZHMuZ2V0QXV0aFVybCgpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYCR7cHJvbXB0X21lc3NhZ2V9IFBsZWFzZSBmb2xsb3cgdGhpcyBsaW5rOlxuJHthdXRoVXJsfVxuXG5NZXNzYWdlIG1lIGFnYWluIHdoZW4gZG9uZS5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIEdvb2dsZSBBcHBzIFNjcmlwdCBzZXJ2aWNlLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHNjcmlwdF92MS5TY3JpcHQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBHb29nbGUgQXBwcyBTY3JpcHQgc2VydmljZS5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfb25fZHV0eSgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zdCBjaGVja2VkX291dF9zZWN0aW9uID0gXCJDaGVja2VkIE91dFwiO1xuICAgICAgICBjb25zdCBsYXN0X3NlY3Rpb25zID0gW2NoZWNrZWRfb3V0X3NlY3Rpb25dO1xuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG5cbiAgICAgICAgY29uc3Qgb25fZHV0eV9wYXRyb2xsZXJzID0gbG9naW5fc2hlZXQuZ2V0X29uX2R1dHlfcGF0cm9sbGVycygpO1xuICAgICAgICBjb25zdCBieV9zZWN0aW9uID0gb25fZHV0eV9wYXRyb2xsZXJzXG4gICAgICAgICAgICAuZmlsdGVyKCh4KSA9PiB4LmNoZWNraW4pXG4gICAgICAgICAgICAucmVkdWNlKChwcmV2OiB7IFtrZXk6IHN0cmluZ106IFBhdHJvbGxlclJvd1tdIH0sIGN1cikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNob3J0X2NvZGUgPVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNraW5fdmFsdWVzLmJ5X3NoZWV0X3N0cmluZ1tjdXIuY2hlY2tpbl0ua2V5O1xuICAgICAgICAgICAgICAgIGxldCBzZWN0aW9uID0gY3VyLnNlY3Rpb247XG4gICAgICAgICAgICAgICAgaWYgKHNob3J0X2NvZGUgPT0gXCJvdXRcIikge1xuICAgICAgICAgICAgICAgICAgICBzZWN0aW9uID0gY2hlY2tlZF9vdXRfc2VjdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCEoc2VjdGlvbiBpbiBwcmV2KSkge1xuICAgICAgICAgICAgICAgICAgICBwcmV2W3NlY3Rpb25dID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHByZXZbc2VjdGlvbl0ucHVzaChjdXIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgICAgICAgfSwge30pO1xuICAgICAgICBsZXQgcmVzdWx0czogc3RyaW5nW11bXSA9IFtdO1xuICAgICAgICBsZXQgYWxsX2tleXMgPSBPYmplY3Qua2V5cyhieV9zZWN0aW9uKTtcbiAgICAgICAgY29uc3Qgb3JkZXJlZF9wcmltYXJ5X3NlY3Rpb25zID0gT2JqZWN0LmtleXMoYnlfc2VjdGlvbilcbiAgICAgICAgICAgIC5maWx0ZXIoKHgpID0+ICFsYXN0X3NlY3Rpb25zLmluY2x1ZGVzKHgpKVxuICAgICAgICAgICAgLnNvcnQoKTtcbiAgICAgICAgY29uc3QgZmlsdGVyZWRfbGFzdF9zZWN0aW9ucyA9IGxhc3Rfc2VjdGlvbnMuZmlsdGVyKCh4KSA9PlxuICAgICAgICAgICAgYWxsX2tleXMuaW5jbHVkZXMoeClcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3Qgb3JkZXJlZF9zZWN0aW9ucyA9IG9yZGVyZWRfcHJpbWFyeV9zZWN0aW9ucy5jb25jYXQoXG4gICAgICAgICAgICBmaWx0ZXJlZF9sYXN0X3NlY3Rpb25zXG4gICAgICAgICk7XG5cbiAgICAgICAgZm9yIChjb25zdCBzZWN0aW9uIG9mIG9yZGVyZWRfc2VjdGlvbnMpIHtcbiAgICAgICAgICAgIGxldCByZXN1bHQ6IHN0cmluZ1tdID0gW107XG4gICAgICAgICAgICBjb25zdCBwYXRyb2xsZXJzID0gYnlfc2VjdGlvbltzZWN0aW9uXS5zb3J0KCh4LCB5KSA9PlxuICAgICAgICAgICAgICAgIHgubmFtZS5sb2NhbGVDb21wYXJlKHkubmFtZSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoc2VjdGlvbi5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChcIlNlY3Rpb24gXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0LnB1c2goYCR7c2VjdGlvbn06IGApO1xuICAgICAgICAgICAgZnVuY3Rpb24gcGF0cm9sbGVyX3N0cmluZyhuYW1lOiBzdHJpbmcsIHNob3J0X2NvZGU6IHN0cmluZykge1xuICAgICAgICAgICAgICAgIGxldCBkZXRhaWxzID0gXCJcIjtcbiAgICAgICAgICAgICAgICBpZiAoc2hvcnRfY29kZSAhPT0gXCJkYXlcIiAmJiBzaG9ydF9jb2RlICE9PSBcIm91dFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGRldGFpbHMgPSBgICgke3Nob3J0X2NvZGUudG9VcHBlckNhc2UoKX0pYDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke25hbWV9JHtkZXRhaWxzfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQucHVzaChcbiAgICAgICAgICAgICAgICBwYXRyb2xsZXJzXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKHgpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRyb2xsZXJfc3RyaW5nKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHgubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNraW5fdmFsdWVzLmJ5X3NoZWV0X3N0cmluZ1t4LmNoZWNraW5dLmtleVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5qb2luKFwiLCBcIilcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oXCJvbi1kdXR5XCIpO1xuICAgICAgICByZXR1cm4gYFBhdHJvbGxlcnMgZm9yICR7bG9naW5fc2hlZXQuc2hlZXRfZGF0ZS50b0RhdGVTdHJpbmcoKX0gKFRvdGFsOiAke1xuICAgICAgICAgICAgb25fZHV0eV9wYXRyb2xsZXJzLmxlbmd0aFxuICAgICAgICB9KTpcXG4ke3Jlc3VsdHMubWFwKChyKSA9PiByLmpvaW4oXCJcIikpLmpvaW4oXCJcXG5cIil9YDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2dzIGFuIGFjdGlvbiB0byB0aGUgR29vZ2xlIFNoZWV0cy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYWN0aW9uX25hbWUgLSBUaGUgbmFtZSBvZiB0aGUgYWN0aW9uIHRvIGxvZy5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgYWN0aW9uIGlzIGxvZ2dlZC5cbiAgICAgKi9cbiAgICBhc3luYyBsb2dfYWN0aW9uKGFjdGlvbl9uYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3Qgc2hlZXRzX3NlcnZpY2UgPSBhd2FpdCB0aGlzLmdldF9zaGVldHNfc2VydmljZSgpO1xuICAgICAgICBhd2FpdCBzaGVldHNfc2VydmljZS5zcHJlYWRzaGVldHMudmFsdWVzLmFwcGVuZCh7XG4gICAgICAgICAgICBzcHJlYWRzaGVldElkOiB0aGlzLmNvbWJpbmVkX2NvbmZpZy5TSEVFVF9JRCxcbiAgICAgICAgICAgIHJhbmdlOiB0aGlzLmNvbmZpZy5BQ1RJT05fTE9HX1NIRUVULFxuICAgICAgICAgICAgdmFsdWVJbnB1dE9wdGlvbjogXCJVU0VSX0VOVEVSRURcIixcbiAgICAgICAgICAgIHJlcXVlc3RCb2R5OiB7XG4gICAgICAgICAgICAgICAgdmFsdWVzOiBbW3RoaXMucGF0cm9sbGVyIS5uYW1lLCBuZXcgRGF0ZSgpLCBhY3Rpb25fbmFtZV1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9ncyBvdXQgdGhlIHVzZXIuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGxvZ291dCByZXNwb25zZS5cbiAgICAgKi9cbiAgICBhc3luYyBsb2dvdXQoKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnN0IHVzZXJfY3JlZHMgPSB0aGlzLmdldF91c2VyX2NyZWRzKCk7XG4gICAgICAgIGF3YWl0IHVzZXJfY3JlZHMuZGVsZXRlVG9rZW4oKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3BvbnNlOiBcIk9rYXksIEkgaGF2ZSByZW1vdmVkIGFsbCBsb2dpbiBzZXNzaW9uIGluZm9ybWF0aW9uLlwiLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIFR3aWxpbyBjbGllbnQuXG4gICAgICogQHJldHVybnMge1R3aWxpb0NsaWVudH0gVGhlIFR3aWxpbyBjbGllbnQuXG4gICAgICovXG4gICAgZ2V0X3R3aWxpb19jbGllbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnR3aWxpb19jbGllbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHdpbGlvX2NsaWVudCB3YXMgbmV2ZXIgaW5pdGlhbGl6ZWQhXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnR3aWxpb19jbGllbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgVHdpbGlvIFN5bmMgY2xpZW50LlxuICAgICAqIEByZXR1cm5zIHtTZXJ2aWNlQ29udGV4dH0gVGhlIFR3aWxpbyBTeW5jIGNsaWVudC5cbiAgICAgKi9cbiAgICBnZXRfc3luY19jbGllbnQoKSB7XG4gICAgICAgIGlmICghdGhpcy5zeW5jX2NsaWVudCkge1xuICAgICAgICAgICAgdGhpcy5zeW5jX2NsaWVudCA9IHRoaXMuZ2V0X3R3aWxpb19jbGllbnQoKS5zeW5jLnYxLnNlcnZpY2VzKFxuICAgICAgICAgICAgICAgIHRoaXMuc3luY19zaWRcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc3luY19jbGllbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgdXNlciBjcmVkZW50aWFscy5cbiAgICAgKiBAcmV0dXJucyB7VXNlckNyZWRzfSBUaGUgdXNlciBjcmVkZW50aWFscy5cbiAgICAgKi9cbiAgICBnZXRfdXNlcl9jcmVkcygpIHtcbiAgICAgICAgaWYgKCF0aGlzLnVzZXJfY3JlZHMpIHtcbiAgICAgICAgICAgIHRoaXMudXNlcl9jcmVkcyA9IG5ldyBVc2VyQ3JlZHMoXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRfc3luY19jbGllbnQoKSxcbiAgICAgICAgICAgICAgICB0aGlzLmZyb20sXG4gICAgICAgICAgICAgICAgdGhpcy5jb21iaW5lZF9jb25maWdcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudXNlcl9jcmVkcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBzZXJ2aWNlIGNyZWRlbnRpYWxzLlxuICAgICAqIEByZXR1cm5zIHtHb29nbGVBdXRofSBUaGUgc2VydmljZSBjcmVkZW50aWFscy5cbiAgICAgKi9cbiAgICBnZXRfc2VydmljZV9jcmVkcygpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNlcnZpY2VfY3JlZHMpIHtcbiAgICAgICAgICAgIHRoaXMuc2VydmljZV9jcmVkcyA9IG5ldyBnb29nbGUuYXV0aC5Hb29nbGVBdXRoKHtcbiAgICAgICAgICAgICAgICBrZXlGaWxlOiBnZXRfc2VydmljZV9jcmVkZW50aWFsc19wYXRoKCksXG4gICAgICAgICAgICAgICAgc2NvcGVzOiB0aGlzLlNDT1BFUyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2VfY3JlZHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgdmFsaWQgY3JlZGVudGlhbHMuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbcmVxdWlyZV91c2VyX2NyZWRzPWZhbHNlXSAtIFdoZXRoZXIgdXNlciBjcmVkZW50aWFscyBhcmUgcmVxdWlyZWQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8R29vZ2xlQXV0aD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHZhbGlkIGNyZWRlbnRpYWxzLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF92YWxpZF9jcmVkcyhyZXF1aXJlX3VzZXJfY3JlZHM6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBpZiAodGhpcy5jb25maWcuVVNFX1NFUlZJQ0VfQUNDT1VOVCAmJiAhcmVxdWlyZV91c2VyX2NyZWRzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRfc2VydmljZV9jcmVkcygpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVzZXJfY3JlZHMgPSB0aGlzLmdldF91c2VyX2NyZWRzKCk7XG4gICAgICAgIGlmICghKGF3YWl0IHVzZXJfY3JlZHMubG9hZFRva2VuKCkpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVc2VyIGlzIG5vdCBhdXRoZWQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVXNpbmcgdXNlciBhY2NvdW50IGZvciBzZXJ2aWNlIGF1dGguLi5cIik7XG4gICAgICAgIHJldHVybiB1c2VyX2NyZWRzLm9hdXRoMl9jbGllbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgR29vZ2xlIFNoZWV0cyBzZXJ2aWNlLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHNoZWV0c192NC5TaGVldHM+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBHb29nbGUgU2hlZXRzIHNlcnZpY2UuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3NoZWV0c19zZXJ2aWNlKCkge1xuICAgICAgICBpZiAoIXRoaXMuc2hlZXRzX3NlcnZpY2UpIHtcbiAgICAgICAgICAgIHRoaXMuc2hlZXRzX3NlcnZpY2UgPSBnb29nbGUuc2hlZXRzKHtcbiAgICAgICAgICAgICAgICB2ZXJzaW9uOiBcInY0XCIsXG4gICAgICAgICAgICAgICAgYXV0aDogYXdhaXQgdGhpcy5nZXRfdmFsaWRfY3JlZHMoKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNoZWV0c19zZXJ2aWNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGxvZ2luIHNoZWV0LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPExvZ2luU2hlZXQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBsb2dpbiBzaGVldFxuICAgICAqL1xuICAgIGFzeW5jIGdldF9sb2dpbl9zaGVldCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmxvZ2luX3NoZWV0KSB7XG4gICAgICAgICAgICBjb25zdCBsb2dpbl9zaGVldF9jb25maWc6IExvZ2luU2hlZXRDb25maWcgPSB0aGlzLmNvbWJpbmVkX2NvbmZpZztcbiAgICAgICAgICAgIGNvbnN0IHNoZWV0c19zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfc2hlZXRzX3NlcnZpY2UoKTtcbiAgICAgICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gbmV3IExvZ2luU2hlZXQoXG4gICAgICAgICAgICAgICAgc2hlZXRzX3NlcnZpY2UsXG4gICAgICAgICAgICAgICAgbG9naW5fc2hlZXRfY29uZmlnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYXdhaXQgbG9naW5fc2hlZXQucmVmcmVzaCgpO1xuICAgICAgICAgICAgdGhpcy5sb2dpbl9zaGVldCA9IGxvZ2luX3NoZWV0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmxvZ2luX3NoZWV0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHNlYXNvbiBzaGVldC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxTZWFzb25TaGVldD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHNlYXNvbiBzaGVldFxuICAgICAqL1xuICAgIGFzeW5jIGdldF9zZWFzb25fc2hlZXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5zZWFzb25fc2hlZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IHNlYXNvbl9zaGVldF9jb25maWc6IFNlYXNvblNoZWV0Q29uZmlnID0gdGhpcy5jb21iaW5lZF9jb25maWc7XG4gICAgICAgICAgICBjb25zdCBzaGVldHNfc2VydmljZSA9IGF3YWl0IHRoaXMuZ2V0X3NoZWV0c19zZXJ2aWNlKCk7XG4gICAgICAgICAgICB0aGlzLnNlYXNvbl9zaGVldCA9IG5ldyBTZWFzb25TaGVldChcbiAgICAgICAgICAgICAgICBzaGVldHNfc2VydmljZSxcbiAgICAgICAgICAgICAgICBzZWFzb25fc2hlZXRfY29uZmlnXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNlYXNvbl9zaGVldDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBndWVzdCBwYXNzIHNoZWV0LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEd1ZXN0UGFzc1NoZWV0Pn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgZ3Vlc3QgcGFzcyBzaGVldFxuICAgICAqL1xuICAgIGFzeW5jIGdldF9ndWVzdF9wYXNzX3NoZWV0KCkge1xuICAgICAgICBpZiAoIXRoaXMuZ3Vlc3RfcGFzc19zaGVldCkge1xuICAgICAgICAgICAgY29uc3QgY29uZmlnOiBHdWVzdFBhc3Nlc0NvbmZpZyA9IHRoaXMuY29tYmluZWRfY29uZmlnO1xuICAgICAgICAgICAgY29uc3Qgc2hlZXRzX3NlcnZpY2UgPSBhd2FpdCB0aGlzLmdldF9zaGVldHNfc2VydmljZSgpO1xuICAgICAgICAgICAgdGhpcy5ndWVzdF9wYXNzX3NoZWV0ID0gbmV3IEd1ZXN0UGFzc1NoZWV0KHNoZWV0c19zZXJ2aWNlLCBjb25maWcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmd1ZXN0X3Bhc3Nfc2hlZXQ7XG4gICAgfVxuXG4gICAgLyoqIGdldCB0aGUgc2xlY19iZWFjb25fY2hlY2tfc2hlZXQuXG4gICAgICogQHJldHVybnMgKFByb21pc2U8U2xlZEJlYWNvbkNoZWNrU2hlZXQ+KVxuICAgICAqL1xuICAgIGFzeW5jIGdldF9zbGVkX2JlYWNvbl9jaGVja19zaGVldCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNsZWRfYmVhY29uX2NoZWNrX3NoZWV0KSB7XG4gICAgICAgICAgICBjb25zdCBjb25maWc6IFNsZWRCZWFjb25Db25maWcgPSAgdGhpcy5jb21iaW5lZF9jb25maWc7XG4gICAgICAgICAgICBjb25zdCBzaGVldHNfc2VydmljZSA9IGF3YWl0IHRoaXMuZ2V0X3NoZWV0c19zZXJ2aWNlKCk7XG4gICAgICAgICAgICB0aGlzLnNsZWRfYmVhY29uX2NoZWNrX3NoZWV0ID0gbmV3IFNsZWRCZWFjb25DaGVja1NoZWV0KHNoZWV0c19zZXJ2aWNlLCBjb25maWcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNsZWRfYmVhY29uX2NoZWNrX3NoZWV0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIEdvb2dsZSBBcHBzIFNjcmlwdCBzZXJ2aWNlLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHNjcmlwdF92MS5TY3JpcHQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBHb29nbGUgQXBwcyBTY3JpcHQgc2VydmljZS5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfdXNlcl9zY3JpcHRzX3NlcnZpY2UoKSB7XG4gICAgICAgIGlmICghdGhpcy51c2VyX3NjcmlwdHNfc2VydmljZSkge1xuICAgICAgICAgICAgdGhpcy51c2VyX3NjcmlwdHNfc2VydmljZSA9IGdvb2dsZS5zY3JpcHQoe1xuICAgICAgICAgICAgICAgIHZlcnNpb246IFwidjFcIixcbiAgICAgICAgICAgICAgICBhdXRoOiBhd2FpdCB0aGlzLmdldF92YWxpZF9jcmVkcyh0cnVlKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJfc2NyaXB0c19zZXJ2aWNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG1hcHBlZCBwYXRyb2xsZXIuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbZm9yY2U9ZmFsc2VdIC0gV2hldGhlciB0byBmb3JjZSB0aGUgcGF0cm9sbGVyIHRvIGJlIGZvdW5kLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2UgfCB2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcmVzcG9uc2Ugb3Igdm9pZC5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfbWFwcGVkX3BhdHJvbGxlcihmb3JjZTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IHBob25lX2xvb2t1cCA9IGF3YWl0IHRoaXMuZmluZF9wYXRyb2xsZXJfZnJvbV9udW1iZXIoKTtcbiAgICAgICAgaWYgKHBob25lX2xvb2t1cCA9PT0gdW5kZWZpbmVkIHx8IHBob25lX2xvb2t1cCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGZvcmNlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGZpbmQgYXNzb2NpYXRlZCB1c2VyXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYFNvcnJ5LCBJIGNvdWxkbid0IGZpbmQgYW4gYXNzb2NpYXRlZCBCVk5TUCBtZW1iZXIgd2l0aCB5b3VyIHBob25lIG51bWJlciAoJHt0aGlzLmZyb219KWAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuICAgICAgICBjb25zdCBtYXBwZWRQYXRyb2xsZXIgPSBsb2dpbl9zaGVldC50cnlfZmluZF9wYXRyb2xsZXIoXG4gICAgICAgICAgICBwaG9uZV9sb29rdXAubmFtZVxuICAgICAgICApO1xuICAgICAgICBpZiAobWFwcGVkUGF0cm9sbGVyID09PSBcIm5vdF9mb3VuZFwiKSB7XG4gICAgICAgICAgICBpZiAoZm9yY2UpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgcGF0cm9sbGVyIGluIGxvZ2luIHNoZWV0XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYENvdWxkIG5vdCBmaW5kIHBhdHJvbGxlciAnJHtwaG9uZV9sb29rdXAubmFtZX0nIGluIGxvZ2luIHNoZWV0LiBQbGVhc2UgbG9vayBhdCB0aGUgbG9naW4gc2hlZXQgbmFtZSwgYW5kIGNvcHkgaXQgdG8gdGhlIFBob25lIE51bWJlcnMgdGFiLmAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3VycmVudF9zaGVldF9kYXRlID0gbG9naW5fc2hlZXQuY3VycmVudF9kYXRlO1xuICAgICAgICB0aGlzLnBhdHJvbGxlciA9IG1hcHBlZFBhdHJvbGxlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaW5kcyB0aGUgcGF0cm9sbGVyIGZyb20gdGhlIHBob25lIG51bWJlci5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxQYXRyb2xsZXJSb3c+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBwYXRyb2xsZXIuXG4gICAgICovXG4gICAgYXN5bmMgZmluZF9wYXRyb2xsZXJfZnJvbV9udW1iZXIoKSB7XG4gICAgICAgIGNvbnN0IHJhd19udW1iZXIgPSB0aGlzLmZyb207XG4gICAgICAgIGNvbnN0IHNoZWV0c19zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfc2hlZXRzX3NlcnZpY2UoKTtcbiAgICAgICAgY29uc3Qgb3B0czogRmluZFBhdHJvbGxlckNvbmZpZyA9IHRoaXMuY29tYmluZWRfY29uZmlnO1xuICAgICAgICBjb25zdCBudW1iZXIgPSBzYW5pdGl6ZV9waG9uZV9udW1iZXIocmF3X251bWJlcik7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgc2hlZXRzX3NlcnZpY2Uuc3ByZWFkc2hlZXRzLnZhbHVlcy5nZXQoe1xuICAgICAgICAgICAgc3ByZWFkc2hlZXRJZDogb3B0cy5TSEVFVF9JRCxcbiAgICAgICAgICAgIHJhbmdlOiBvcHRzLlBIT05FX05VTUJFUl9MT09LVVBfU0hFRVQsXG4gICAgICAgICAgICB2YWx1ZVJlbmRlck9wdGlvbjogXCJVTkZPUk1BVFRFRF9WQUxVRVwiLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhLnZhbHVlcykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGZpbmQgcGF0cm9sbGVyLlwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS52YWx1ZXNcbiAgICAgICAgICAgIC5tYXAoKHJvdykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJhd051bWJlciA9XG4gICAgICAgICAgICAgICAgICAgIHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5QSE9ORV9OVU1CRVJfTlVNQkVSX0NPTFVNTildO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnROdW1iZXIgPVxuICAgICAgICAgICAgICAgICAgICByYXdOdW1iZXIgIT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHNhbml0aXplX3Bob25lX251bWJlcihyYXdOdW1iZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHJhd051bWJlcjtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50TmFtZSA9XG4gICAgICAgICAgICAgICAgICAgIHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5QSE9ORV9OVU1CRVJfTkFNRV9DT0xVTU4pXTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge25hbWU6IGN1cnJlbnROYW1lLCBudW1iZXI6IGN1cnJlbnROdW1iZXJ9O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5maWx0ZXIoKHBhdHJvbGxlcikgPT4gcGF0cm9sbGVyLm51bWJlciA9PT0gbnVtYmVyKVswXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm9tcHRzIHRoZSB1c2VyIGZvciBhIGNvbXAgb3IgbWFuYWdlciBwYXNzLlxuICAgICAqIFdlIGRvIG5vdCByZXF1aXJlIGEgZ3Vlc3QgbmFtZSBpbiB0aGUgU01TIGZsb3c7IHRoaXMgcmV0dXJucyB0aGUgc3RhdHVzL3Byb21wdFxuICAgICAqIGZvciBndWVzdCBwYXNzZXMgc28gdGhlIEd1ZXN0IFBhc3MgY29tbWFuZCBiZWhhdmVzIGxpa2Ugb3RoZXIgaW1tZWRpYXRlIGFjdGlvbnMuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHJlc3BvbnNlLlxuICAgICAqL1xuICAgIGFzeW5jIHByb21wdF9ndWVzdF9wYXNzKCk6IFByb21pc2U8QlZOU1BSZXNwb25zZT4ge1xuICAgICAgICAvLyBBbGxvdyBhbGwgcGF0cm9sbGVycyAoaW5jbHVkaW5nIGNhbmRpZGF0ZXMpIHRvIHVzZSBndWVzdCBwYXNzZXMgd2hlbiBhdmFpbGFibGUuXG4gICAgICAgIGNvbnN0IHNoZWV0ID0gYXdhaXQgdGhpcy5nZXRfZ3Vlc3RfcGFzc19zaGVldCgpO1xuICAgICAgICBjb25zdCB1c2VkX2FuZF9hdmFpbGFibGUgPSBhd2FpdCBzaGVldC5nZXRfYXZhaWxhYmxlX2FuZF91c2VkX3Bhc3Nlcyh0aGlzLnBhdHJvbGxlciEubmFtZSk7XG4gICAgICAgIGlmICh1c2VkX2FuZF9hdmFpbGFibGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgcmVzcG9uc2U6IFwiUHJvYmxlbSBsb29raW5nIHVwIHBhdHJvbGxlciBmb3IgZ3Vlc3QgcGFzc2VzXCIgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHRoZXJlIGFyZSBubyBhdmFpbGFibGUgcGFzc2VzIHRvZGF5LCByZXR1cm4gdGhlIHByb21wdCBpbmRpY2F0aW5nIG5vbmUgYXJlIGF2YWlsYWJsZS5cbiAgICAgICAgaWYgKHVzZWRfYW5kX2F2YWlsYWJsZS5hdmFpbGFibGUgPCAxKSB7XG4gICAgICAgICAgICByZXR1cm4gdXNlZF9hbmRfYXZhaWxhYmxlLmdldF9wcm9tcHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENvbnN1bWUgb25lIGF2YWlsYWJsZSBwYXNzICh0aGUgc2hlZXQgcmVjb3JkcyBvbmx5IHRoZSBkYXRlIG9mIHVzZSkuXG4gICAgICAgIGF3YWl0IHNoZWV0LnNldF91c2VkX2d1ZXN0X3Bhc3Nlcyh1c2VkX2FuZF9hdmFpbGFibGUpO1xuXG4gICAgICAgIC8vIFJlLXJlYWQgdGhlIHZhbHVlcyBhbmQgcmV0dXJuIGNvbmZpcm1hdGlvbiArIHVwZGF0ZWQgc3RhdHVzLlxuICAgICAgICBjb25zdCB1cGRhdGVkID0gYXdhaXQgc2hlZXQuZ2V0X2F2YWlsYWJsZV9hbmRfdXNlZF9wYXNzZXModGhpcy5wYXRyb2xsZXIhLm5hbWUpO1xuICAgICAgICBpZiAodXBkYXRlZCA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4geyByZXNwb25zZTogYFVwZGF0ZWQgJHt0aGlzLnBhdHJvbGxlciEubmFtZX0gdG8gdXNlIGEgZ3Vlc3QgcGFzcyB0b2RheS5gIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzdGF0dXMgPSBidWlsZF9wYXNzZXNfc3RyaW5nKFxuICAgICAgICAgICAgdXBkYXRlZC51c2VkX3NlYXNvbixcbiAgICAgICAgICAgIHVwZGF0ZWQudXNlZF9zZWFzb24gKyB1cGRhdGVkLmF2YWlsYWJsZSxcbiAgICAgICAgICAgIHVwZGF0ZWQudXNlZF90b2RheVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IGBVcGRhdGVkICR7dGhpcy5wYXRyb2xsZXIhLm5hbWV9IHRvIHVzZSBhIGd1ZXN0IHBhc3MgdG9kYXkuXFxuJHtzdGF0dXN9YCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm9tcHQgdGhlIHVzZXIgZm9yIHRoZSBsb2NhdGlvbiBvZiB0aGVpciBjb21wbGV0ZWQgYmVhY29uIHNlYXJjaFxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSByZXNwb25zZS5cbiAgICAgKi9cbiAgICBhc3luYyBwcm9tcHRfYmVhY29uX3NlYXJjaCgpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgaWYgKCF0aGlzLnBhdHJvbGxlciB8fCAhdGhpcy5wYXRyb2xsZXIuY2hlY2tpbikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYCR7dGhpcy5wYXRyb2xsZXIhLm5hbWV9IGlzIG5vdCBjaGVja2VkIGluLmAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZTogIFwiT24gd2hpY2ggcnVuIGRpZCB5b3UgY29tcGxldGUgYSBiZWFjb24gc2VhcmNoIHRvZGF5IChvciAncmVzdGFydCcgdG8gY2FuY2VsKT9cIixcbiAgICAgICAgICAgIG5leHRfc3RlcDogTkVYVF9TVEVQUy5BV0FJVF9CRUFDT05cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZSBsb2NhdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5IC0gdGhlIGJvZHkgb2YgdGhlIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzdHJpbmcgfCBudWxsPn0gVGhlIHNlYXJjaCBsb2NhdGlvbiBpZiB0aGUgbG9jYXRpb24gaXMgdmFsaWRcbiAgICAgKi9cbiAgICBhc3luYyBwYXJzZV9iZWFjb25fc2VhcmNoX2xvY2F0aW9uKGJvZHk6IHN0cmluZyB8IG51bGwpOiBQcm9taXNlPHN0cmluZyB8IG51bGw+IHtcbiAgICAgICAgY29uc3Qgc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9zbGVkX2JlYWNvbl9jaGVja19zaGVldCgpO1xuICAgICAgICByZXR1cm4gc2hlZXQucGFyc2VfbG9jYXRpb24oYm9keSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgc2hlZXRzX3Y0IH0gZnJvbSBcImdvb2dsZWFwaXNcIjtcbmltcG9ydCB7IEd1ZXN0UGFzc2VzQ29uZmlnIH0gZnJvbSBcIi4uL2Vudi9oYW5kbGVyX2NvbmZpZ1wiO1xuaW1wb3J0IHsgZXhjZWxfcm93X3RvX2luZGV4LCByb3dfY29sX3RvX2V4Y2VsX2luZGV4LCBwYXJzZV9ib29sZWFuX2NlbGwgfSBmcm9tIFwiLi4vdXRpbHMvdXRpbFwiO1xuaW1wb3J0IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiIGZyb20gXCIuLi91dGlscy9nb29nbGVfc2hlZXRzX3NwcmVhZHNoZWV0X3RhYlwiO1xuaW1wb3J0IHsgZm9ybWF0X2RhdGVfZm9yX3NwcmVhZHNoZWV0X3ZhbHVlIH0gZnJvbSBcIi4uL3V0aWxzL2RhdGV0aW1lX3V0aWxcIjtcbmltcG9ydCB7IGJ1aWxkX3Bhc3Nlc19zdHJpbmcgfSBmcm9tIFwiLi4vdXRpbHMvZ3Vlc3RfcGFzc2VzXCI7XG5pbXBvcnQgeyBCVk5TUFJlc3BvbnNlIH0gZnJvbSBcIi4uL2hhbmRsZXJzL2J2bnNwX2hhbmRsZXJcIjtcblxuZXhwb3J0IGNsYXNzIFVzZWRBbmRBdmFpbGFibGVQYXNzZXMge1xuICAgIHJvdzogYW55W107XG4gICAgaW5kZXg6IG51bWJlcjtcbiAgICBlbGlnaWJsZTogYm9vbGVhbjtcbiAgICBlbGlnaWJsZV9yZWFzb246IHN0cmluZztcbiAgICBhdmFpbGFibGU6IG51bWJlcjtcbiAgICB1c2VkX3RvZGF5OiBudW1iZXI7XG4gICAgdXNlZF9zZWFzb246IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICByb3c6IGFueVtdLFxuICAgICAgICBpbmRleDogbnVtYmVyLFxuICAgICAgICBlbGlnaWJsZTogYW55LFxuICAgICAgICBlbGlnaWJsZV9yZWFzb246IGFueSxcbiAgICAgICAgYXZhaWxhYmxlOiBhbnksXG4gICAgICAgIHVzZWRfdG9kYXk6IGFueSxcbiAgICAgICAgdXNlZF9zZWFzb246IGFueVxuICAgICkge1xuICAgICAgICB0aGlzLnJvdyA9IHJvdztcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgICAgICB0aGlzLmVsaWdpYmxlID0gcGFyc2VfYm9vbGVhbl9jZWxsKGVsaWdpYmxlKTtcbiAgICAgICAgdGhpcy5lbGlnaWJsZV9yZWFzb24gPSBTdHJpbmcoZWxpZ2libGVfcmVhc29uID8/IFwiXCIpO1xuICAgICAgICB0aGlzLmF2YWlsYWJsZSA9IE51bWJlcihhdmFpbGFibGUpO1xuICAgICAgICB0aGlzLnVzZWRfdG9kYXkgPSBOdW1iZXIodXNlZF90b2RheSk7XG4gICAgICAgIHRoaXMudXNlZF9zZWFzb24gPSBOdW1iZXIodXNlZF9zZWFzb24pO1xuICAgIH1cblxuICAgIGdldF9wcm9tcHQoKTogQlZOU1BSZXNwb25zZSB7XG4gICAgICAgIGlmICh0aGlzLmF2YWlsYWJsZSA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYnVpbGRfcGFzc2VzX3N0cmluZyhcbiAgICAgICAgICAgICAgICB0aGlzLnVzZWRfc2Vhc29uLFxuICAgICAgICAgICAgICAgIHRoaXMuYXZhaWxhYmxlICsgdGhpcy51c2VkX3NlYXNvbixcbiAgICAgICAgICAgICAgICB0aGlzLnVzZWRfdG9kYXksXG4gICAgICAgICAgICAgICAgdHJ1ZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2UsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5lbGlnaWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYFlvdSBhcmUgbm90IGVsaWdpYmxlIGZvciBndWVzdCBwYXNzZXMuIFJlYXNvbjogJHt0aGlzLmVsaWdpYmxlX3JlYXNvbn1gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IFwiWW91IGRvIG5vdCBoYXZlIGFueSBndWVzdCBwYXNzZXMgYXZhaWxhYmxlIHRvZGF5XCIsXG4gICAgICAgIH07XG4gICAgfVxufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUGFzc1NoZWV0IHtcbiAgICBzaGVldDogR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWI7XG5cbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3Ioc2hlZXQ6IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiKSB7XG4gICAgICAgIHRoaXMuc2hlZXQgPSBzaGVldDtcbiAgICB9XG5cbiAgICBhYnN0cmFjdCBnZXQgZWxpZ2libGVfY29sdW1uKCk6IHN0cmluZztcbiAgICBhYnN0cmFjdCBnZXQgZWxpZ2libGVfcmVhc29uX2NvbHVtbigpOiBzdHJpbmc7XG4gICAgYWJzdHJhY3QgZ2V0IGF2YWlsYWJsZV9jb2x1bW4oKTogc3RyaW5nO1xuICAgIGFic3RyYWN0IGdldCB1c2VkX3RvZGF5X2NvbHVtbigpOiBzdHJpbmc7XG4gICAgYWJzdHJhY3QgZ2V0IHVzZWRfc2Vhc29uX2NvbHVtbigpOiBzdHJpbmc7XG4gICAgYWJzdHJhY3QgZ2V0IG5hbWVfY29sdW1uKCk6IHN0cmluZztcbiAgICBhYnN0cmFjdCBnZXQgc3RhcnRfaW5kZXgoKTogbnVtYmVyO1xuICAgIGFic3RyYWN0IGdldCBzaGVldF9uYW1lKCk6IHN0cmluZztcblxuICAgIGFzeW5jIGdldF9hdmFpbGFibGVfYW5kX3VzZWRfcGFzc2VzKFxuICAgICAgICBwYXRyb2xsZXJfbmFtZTogc3RyaW5nXG4gICAgKTogUHJvbWlzZTxVc2VkQW5kQXZhaWxhYmxlUGFzc2VzIHwgbnVsbD4ge1xuICAgICAgICBjb25zdCBwYXRyb2xsZXJfcm93ID0gYXdhaXQgdGhpcy5zaGVldC5nZXRfc2hlZXRfcm93X2Zvcl9wYXRyb2xsZXIoXG4gICAgICAgICAgICBwYXRyb2xsZXJfbmFtZSxcbiAgICAgICAgICAgIHRoaXMubmFtZV9jb2x1bW5cbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHBhdHJvbGxlcl9yb3cgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZWxpZ2libGUgPVxuICAgICAgICAgICAgcGF0cm9sbGVyX3Jvdy5yb3dbZXhjZWxfcm93X3RvX2luZGV4KHRoaXMuZWxpZ2libGVfY29sdW1uKV07XG4gICAgICAgIGNvbnN0IGVsaWdpYmxlX3JlYXNvbiA9XG4gICAgICAgICAgICBwYXRyb2xsZXJfcm93LnJvd1tleGNlbF9yb3dfdG9faW5kZXgodGhpcy5lbGlnaWJsZV9yZWFzb25fY29sdW1uKV07XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfZGF5X2F2YWlsYWJsZV9wYXNzZXMgPVxuICAgICAgICAgICAgcGF0cm9sbGVyX3Jvdy5yb3dbZXhjZWxfcm93X3RvX2luZGV4KHRoaXMuYXZhaWxhYmxlX2NvbHVtbildO1xuICAgICAgICBjb25zdCBjdXJyZW50X2RheV91c2VkX3Bhc3NlcyA9XG4gICAgICAgICAgICBwYXRyb2xsZXJfcm93LnJvd1tleGNlbF9yb3dfdG9faW5kZXgodGhpcy51c2VkX3RvZGF5X2NvbHVtbildO1xuICAgICAgICBjb25zdCBjdXJyZW50X3NlYXNvbl91c2VkX3Bhc3NlcyA9XG4gICAgICAgICAgICBwYXRyb2xsZXJfcm93LnJvd1tleGNlbF9yb3dfdG9faW5kZXgodGhpcy51c2VkX3NlYXNvbl9jb2x1bW4pXTtcbiAgICAgICAgcmV0dXJuIG5ldyBVc2VkQW5kQXZhaWxhYmxlUGFzc2VzKFxuICAgICAgICAgICAgcGF0cm9sbGVyX3Jvdy5yb3csXG4gICAgICAgICAgICBwYXRyb2xsZXJfcm93LmluZGV4LFxuICAgICAgICAgICAgZWxpZ2libGUsXG4gICAgICAgICAgICBlbGlnaWJsZV9yZWFzb24sXG4gICAgICAgICAgICBjdXJyZW50X2RheV9hdmFpbGFibGVfcGFzc2VzLFxuICAgICAgICAgICAgY3VycmVudF9kYXlfdXNlZF9wYXNzZXMsXG4gICAgICAgICAgICBjdXJyZW50X3NlYXNvbl91c2VkX3Bhc3Nlc1xuICAgICAgICApO1xuICAgIH1cblxuICAgIGFzeW5jIHNldF91c2VkX2d1ZXN0X3Bhc3NlcyhcbiAgICAgICAgcGF0cm9sbGVyX3JvdzogVXNlZEFuZEF2YWlsYWJsZVBhc3NlcyxcbiAgICApIHtcbiAgICAgICAgaWYgKCFwYXRyb2xsZXJfcm93LmVsaWdpYmxlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgYFBhdHJvbGxlciBpcyBub3QgZWxpZ2libGUgZm9yIGd1ZXN0IHBhc3Nlcy4gUmVhc29uOiAke3BhdHJvbGxlcl9yb3cuZWxpZ2libGVfcmVhc29ufWBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhdHJvbGxlcl9yb3cuYXZhaWxhYmxlIDwgMSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgIGBOb3QgZW5vdWdoIGF2YWlsYWJsZSBwYXNzZXM6IEF2YWlsYWJsZTogJHtwYXRyb2xsZXJfcm93LmF2YWlsYWJsZX0sIFVzZWQgdGhpcyBzZWFzb246ICAke3BhdHJvbGxlcl9yb3cudXNlZF9zZWFzb259LCBVc2VkIHRvZGF5OiAke3BhdHJvbGxlcl9yb3cudXNlZF90b2RheX1gXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgcm93bnVtID0gcGF0cm9sbGVyX3Jvdy5pbmRleDtcbiAgICAgICAgY29uc3Qgc3RhcnRfaW5kZXggPSB0aGlzLnN0YXJ0X2luZGV4O1xuICAgICAgICBjb25zdCBwcmlvcl9sZW5ndGggPSBwYXRyb2xsZXJfcm93LnJvdy5sZW5ndGggLSBzdGFydF9pbmRleDtcbiAgICAgICAgY29uc3QgY3VycmVudF9kYXRlX3N0cmluZyA9IGZvcm1hdF9kYXRlX2Zvcl9zcHJlYWRzaGVldF92YWx1ZShuZXcgRGF0ZSgpKTtcblxuICAgICAgICBjb25zdCBuZXdfdmFscyA9IHBhdHJvbGxlcl9yb3cucm93XG4gICAgICAgICAgICAuc2xpY2Uoc3RhcnRfaW5kZXgpXG4gICAgICAgICAgICAubWFwKCh4KSA9PiB4Py50b1N0cmluZygpKTtcblxuICAgICAgICAvLyBSZWNvcmQgb25seSB0aGUgZGF0ZSBvZiB0aGUgdXNlOyBubyBndWVzdCBuYW1lIGlzIHN0b3JlZC5cbiAgICAgICAgbmV3X3ZhbHMucHVzaChjdXJyZW50X2RhdGVfc3RyaW5nKTtcblxuICAgICAgICBjb25zdCB1cGRhdGVfbGVuZ3RoID0gTWF0aC5tYXgocHJpb3JfbGVuZ3RoLCBuZXdfdmFscy5sZW5ndGgpO1xuICAgICAgICB3aGlsZSAobmV3X3ZhbHMubGVuZ3RoIDwgdXBkYXRlX2xlbmd0aCkge1xuICAgICAgICAgICAgbmV3X3ZhbHMucHVzaChcIlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGVuZF9pbmRleCA9IHN0YXJ0X2luZGV4ICsgdXBkYXRlX2xlbmd0aCAtIDE7XG4gICAgICAgIGNvbnN0IHJhbmdlID0gYCR7dGhpcy5zaGVldC5zaGVldF9uYW1lfSEke3Jvd19jb2xfdG9fZXhjZWxfaW5kZXgoXG4gICAgICAgICAgICByb3dudW0sXG4gICAgICAgICAgICBzdGFydF9pbmRleFxuICAgICAgICApfToke3Jvd19jb2xfdG9fZXhjZWxfaW5kZXgocm93bnVtLCBlbmRfaW5kZXgpfWA7XG5cbiAgICAgICAgY29uc29sZS5sb2coYFVwZGF0aW5nICR7cmFuZ2V9IHdpdGggJHtuZXdfdmFscy5sZW5ndGh9IHZhbHVlc2ApO1xuICAgICAgICBhd2FpdCB0aGlzLnNoZWV0LnVwZGF0ZV92YWx1ZXMocmFuZ2UsIFtuZXdfdmFsc10pO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEd1ZXN0UGFzc1NoZWV0IGV4dGVuZHMgUGFzc1NoZWV0IHtcbiAgICBjb25maWc6IEd1ZXN0UGFzc2VzQ29uZmlnO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzIHwgbnVsbCxcbiAgICAgICAgY29uZmlnOiBHdWVzdFBhc3Nlc0NvbmZpZ1xuICAgICkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIG5ldyBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYihcbiAgICAgICAgICAgICAgICBzaGVldHNfc2VydmljZSxcbiAgICAgICAgICAgICAgICBjb25maWcuU0hFRVRfSUQsXG4gICAgICAgICAgICAgICAgY29uZmlnLkdVRVNUX1BBU1NfU0hFRVRcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gICAgfVxuXG4gICAgZ2V0IHN0YXJ0X2luZGV4KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBleGNlbF9yb3dfdG9faW5kZXgoXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5HVUVTVF9QQVNTX1NIRUVUX0RBVEVTX1NUQVJUSU5HX0NPTFVNTlxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldCBzaGVldF9uYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5HVUVTVF9QQVNTX1NIRUVUO1xuICAgIH1cblxuICAgIGdldCBlbGlnaWJsZV9jb2x1bW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLkdVRVNUX1BBU1NfRUxJR0lCTEVfQ09MVU1OO1xuICAgIH1cblxuICAgIGdldCBlbGlnaWJsZV9yZWFzb25fY29sdW1uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5HVUVTVF9QQVNTX0VMSUdJQkxFX1JFQVNPTl9DT0xVTU47XG4gICAgfVxuXG4gICAgZ2V0IGF2YWlsYWJsZV9jb2x1bW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLkdVRVNUX1BBU1NfU0hFRVRfQVZBSUxBQkxFX0NPTFVNTjtcbiAgICB9XG5cbiAgICBnZXQgdXNlZF90b2RheV9jb2x1bW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLkdVRVNUX1BBU1NfU0hFRVRfVVNFRF9UT0RBWV9DT0xVTU47XG4gICAgfVxuXG4gICAgZ2V0IHVzZWRfc2Vhc29uX2NvbHVtbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuR1VFU1RfUEFTU19TSEVFVF9VU0VEX1NFQVNPTl9DT0xVTU47XG4gICAgfVxuXG4gICAgZ2V0IG5hbWVfY29sdW1uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5HVUVTVF9QQVNTX1NIRUVUX05BTUVfQ09MVU1OO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IGxvb2t1cF9yb3dfY29sX2luX3NoZWV0LCBleGNlbF9yb3dfdG9faW5kZXggfSBmcm9tIFwiLi4vdXRpbHMvdXRpbFwiO1xuaW1wb3J0IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiIGZyb20gXCIuLi91dGlscy9nb29nbGVfc2hlZXRzX3NwcmVhZHNoZWV0X3RhYlwiO1xuaW1wb3J0IHsgc2FuaXRpemVfZGF0ZSB9IGZyb20gXCIuLi91dGlscy9kYXRldGltZV91dGlsXCI7XG5pbXBvcnQgeyBMb2dpblNoZWV0Q29uZmlnLCBQYXRyb2xsZXJSb3dDb25maWcgfSBmcm9tIFwiLi4vZW52L2hhbmRsZXJfY29uZmlnXCI7XG5pbXBvcnQgeyBzaGVldHNfdjQgfSBmcm9tIFwiZ29vZ2xlYXBpc1wiO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSByb3cgb2YgcGF0cm9sbGVyIGRhdGEuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBQYXRyb2xsZXJSb3dcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBpbmRleCAtIFRoZSBpbmRleCBvZiB0aGUgcm93LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcGF0cm9sbGVyLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IGNhdGVnb3J5IC0gVGhlIGNhdGVnb3J5IG9mIHRoZSBwYXRyb2xsZXIuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gc2VjdGlvbiAtIFRoZSBzZWN0aW9uIG9mIHRoZSBwYXRyb2xsZXIuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gY2hlY2tpbiAtIFRoZSBjaGVjay1pbiBzdGF0dXMgb2YgdGhlIHBhdHJvbGxlci5cbiAqL1xuZXhwb3J0IHR5cGUgUGF0cm9sbGVyUm93ID0ge1xuICAgIGluZGV4OiBudW1iZXI7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGNhdGVnb3J5OiBzdHJpbmc7XG4gICAgc2VjdGlvbjogc3RyaW5nO1xuICAgIGNoZWNraW46IHN0cmluZztcbn07XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGEgbG9naW4gc2hlZXQgaW4gR29vZ2xlIFNoZWV0cy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9naW5TaGVldCB7XG4gICAgbG9naW5fc2hlZXQ6IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiO1xuICAgIGNoZWNraW5fY291bnRfc2hlZXQ6IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiO1xuICAgIGNvbmZpZzogTG9naW5TaGVldENvbmZpZztcbiAgICByb3dzPzogYW55W11bXSB8IG51bGwgPSBudWxsO1xuICAgIGNoZWNraW5fY291bnQ6IG51bWJlciB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgICBwYXRyb2xsZXJzOiBQYXRyb2xsZXJSb3dbXSA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBMb2dpblNoZWV0LlxuICAgICAqIEBwYXJhbSB7c2hlZXRzX3Y0LlNoZWV0cyB8IG51bGx9IHNoZWV0c19zZXJ2aWNlIC0gVGhlIEdvb2dsZSBTaGVldHMgQVBJIHNlcnZpY2UuXG4gICAgICogQHBhcmFtIHtMb2dpblNoZWV0Q29uZmlnfSBjb25maWcgLSBUaGUgY29uZmlndXJhdGlvbiBmb3IgdGhlIGxvZ2luIHNoZWV0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyB8IG51bGwsXG4gICAgICAgIGNvbmZpZzogTG9naW5TaGVldENvbmZpZ1xuICAgICkge1xuICAgICAgICB0aGlzLmxvZ2luX3NoZWV0ID0gbmV3IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiKFxuICAgICAgICAgICAgc2hlZXRzX3NlcnZpY2UsXG4gICAgICAgICAgICBjb25maWcuU0hFRVRfSUQsXG4gICAgICAgICAgICBjb25maWcuTE9HSU5fU0hFRVRfTE9PS1VQXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY2hlY2tpbl9jb3VudF9zaGVldCA9IG5ldyBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYihcbiAgICAgICAgICAgIHNoZWV0c19zZXJ2aWNlLFxuICAgICAgICAgICAgY29uZmlnLlNIRUVUX0lELFxuICAgICAgICAgICAgY29uZmlnLkNIRUNLSU5fQ09VTlRfTE9PS1VQXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZnJlc2hlcyB0aGUgZGF0YSBmcm9tIHRoZSBHb29nbGUgU2hlZXRzLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgICAqL1xuICAgIGFzeW5jIHJlZnJlc2goKSB7XG4gICAgICAgIHRoaXMucm93cyA9IGF3YWl0IHRoaXMubG9naW5fc2hlZXQuZ2V0X3ZhbHVlcyhcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLkxPR0lOX1NIRUVUX0xPT0tVUFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmNoZWNraW5fY291bnQgPSAoYXdhaXQgdGhpcy5jaGVja2luX2NvdW50X3NoZWV0LmdldF92YWx1ZXMoXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5DSEVDS0lOX0NPVU5UX0xPT0tVUFxuICAgICAgICApKSFbMF1bMF07XG4gICAgICAgIHRoaXMucGF0cm9sbGVycyA9IHRoaXMucm93cyEubWFwKCh4LCBpKSA9PlxuICAgICAgICAgICAgdGhpcy5wYXJzZV9wYXRyb2xsZXJfcm93KGksIHgsIHRoaXMuY29uZmlnKVxuICAgICAgICApLmZpbHRlcigoeCkgPT4geCAhPSBudWxsKSBhcyBQYXRyb2xsZXJSb3dbXTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIlJlZnJlc2hpbmcgUGF0cm9sbGVyczogXCIgKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnBhdHJvbGxlcnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGFyY2hpdmVkIHN0YXR1cyBvZiB0aGUgbG9naW4gc2hlZXQuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNoZWV0IGlzIGFyY2hpdmVkLCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICovXG4gICAgZ2V0IGFyY2hpdmVkKCkge1xuICAgICAgICBjb25zdCBhcmNoaXZlZCA9IGxvb2t1cF9yb3dfY29sX2luX3NoZWV0KFxuICAgICAgICAgICAgdGhpcy5jb25maWcuQVJDSElWRURfQ0VMTCxcbiAgICAgICAgICAgIHRoaXMucm93cyFcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIChhcmNoaXZlZCA9PT0gdW5kZWZpbmVkICYmIHRoaXMuY2hlY2tpbl9jb3VudCA9PT0gMCkgfHxcbiAgICAgICAgICAgIGFyY2hpdmVkLnRvTG93ZXJDYXNlKCkgPT09IFwieWVzXCJcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBkYXRlIG9mIHRoZSBzaGVldC5cbiAgICAgKiBAcmV0dXJucyB7RGF0ZX0gVGhlIGRhdGUgb2YgdGhlIHNoZWV0LlxuICAgICAqL1xuICAgIGdldCBzaGVldF9kYXRlKCkge1xuICAgICAgICByZXR1cm4gc2FuaXRpemVfZGF0ZShcbiAgICAgICAgICAgIGxvb2t1cF9yb3dfY29sX2luX3NoZWV0KHRoaXMuY29uZmlnLlNIRUVUX0RBVEVfQ0VMTCwgdGhpcy5yb3dzISlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBjdXJyZW50IGRhdGUuXG4gICAgICogQHJldHVybnMge0RhdGV9IFRoZSBjdXJyZW50IGRhdGUuXG4gICAgICovXG4gICAgZ2V0IGN1cnJlbnRfZGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHNhbml0aXplX2RhdGUoXG4gICAgICAgICAgICBsb29rdXBfcm93X2NvbF9pbl9zaGVldCh0aGlzLmNvbmZpZy5DVVJSRU5UX0RBVEVfQ0VMTCwgdGhpcy5yb3dzISlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdGhlIHNoZWV0IGRhdGUgaXMgdGhlIGN1cnJlbnQgZGF0ZS5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc2hlZXQgZGF0ZSBpcyB0aGUgY3VycmVudCBkYXRlLCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICovXG4gICAgZ2V0IGlzX2N1cnJlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNoZWV0X2RhdGUuZ2V0VGltZSgpID09PSB0aGlzLmN1cnJlbnRfZGF0ZS5nZXRUaW1lKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZXMgdG8gZmluZCBhIHBhdHJvbGxlciBieSBuYW1lLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHBhdHJvbGxlci5cbiAgICAgKiBAcmV0dXJucyB7UGF0cm9sbGVyUm93IHwgXCJub3RfZm91bmRcIn0gVGhlIHBhdHJvbGxlciByb3cgb3IgXCJub3RfZm91bmRcIi5cbiAgICAgKi9cbiAgICB0cnlfZmluZF9wYXRyb2xsZXIobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHBhdHJvbGxlcnMgPSB0aGlzLnBhdHJvbGxlcnMuZmlsdGVyKCh4KSA9PiB4Lm5hbWUgPT09IG5hbWUpO1xuICAgICAgICBpZiAocGF0cm9sbGVycy5sZW5ndGggIT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBcIm5vdF9mb3VuZFwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXRyb2xsZXJzWzBdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHBhdHJvbGxlcnMgd2hvIGFyZSBvbiBkdXR5LlxuICAgICAqIEByZXR1cm5zIHtQYXRyb2xsZXJSb3dbXX0gVGhlIGxpc3Qgb2Ygb24tZHV0eSBwYXRyb2xsZXJzLlxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgbG9naW4gc2hlZXQgaXMgbm90IGN1cnJlbnQuXG4gICAgICovXG4gICAgZ2V0X29uX2R1dHlfcGF0cm9sbGVycygpOiBQYXRyb2xsZXJSb3dbXSB7XG4gICAgICAgIGlmICghdGhpcy5pc19jdXJyZW50KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJMb2dpbiBzaGVldCBpcyBub3QgY3VycmVudFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wYXRyb2xsZXJzLmZpbHRlcigoeCkgPT4geC5jaGVja2luKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaW4gYSBwYXRyb2xsZXIgd2l0aCBhIG5ldyBjaGVjay1pbiB2YWx1ZS5cbiAgICAgKiBAcGFyYW0ge1BhdHJvbGxlclJvd30gcGF0cm9sbGVyX3N0YXR1cyAtIFRoZSBzdGF0dXMgb2YgdGhlIHBhdHJvbGxlci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmV3X2NoZWNraW5fdmFsdWUgLSBUaGUgbmV3IGNoZWNrLWluIHZhbHVlLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgbG9naW4gc2hlZXQgaXMgbm90IGN1cnJlbnQuXG4gICAgICovXG4gICAgYXN5bmMgY2hlY2tpbihwYXRyb2xsZXJfc3RhdHVzOiBQYXRyb2xsZXJSb3csIG5ld19jaGVja2luX3ZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzX2N1cnJlbnQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxvZ2luIHNoZWV0IGlzIG5vdCBjdXJyZW50XCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGBFeGlzdGluZyBzdGF0dXM6ICR7SlNPTi5zdHJpbmdpZnkocGF0cm9sbGVyX3N0YXR1cyl9YCk7XG5cbiAgICAgICAgY29uc3Qgcm93ID0gcGF0cm9sbGVyX3N0YXR1cy5pbmRleCArIDE7IC8vIHByb2dyYW1taW5nIC0+IGV4Y2VsIGxvb2t1cFxuICAgICAgICBjb25zdCByYW5nZSA9IGAke3RoaXMuY29uZmlnLkNIRUNLSU5fRFJPUERPV05fQ09MVU1OfSR7cm93fWA7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5sb2dpbl9zaGVldC51cGRhdGVfdmFsdWVzKHJhbmdlLCBbW25ld19jaGVja2luX3ZhbHVlXV0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFzc2lnbnMgYSBzZWN0aW9uIHRvIGEgcGF0cm9sbGVyLlxuICAgICAqIEBwYXJhbSBwYXRyb2xsZXJfc2VjdGlvbiBUaGUgcm93IGZvciB0aGUgcGF0cm9sbGVyIHRoYXQgbmVlZHMgdG8gaGF2ZSBhIHNlY3Rpb24gYXNzaWduZWQgdG8uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5ld19zZWN0aW9uX3ZhbHVlIC0gVGhlIG5ldyBzZWN0aW9uIHZhbHVlLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgbG9naW4gc2hlZXQgaXMgbm90IGN1cnJlbnQuXG4gICAgICovXG4gICAgYXN5bmMgYXNzaWduX3NlY3Rpb24ocGF0cm9sbGVyX3NlY3Rpb246IFBhdHJvbGxlclJvdywgbmV3X3NlY3Rpb25fdmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAoIXRoaXMuaXNfY3VycmVudCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTG9naW4gc2hlZXQgaXMgbm90IGN1cnJlbnRcIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coYEV4aXN0aW5nIHN0YXR1czogJHtKU09OLnN0cmluZ2lmeShwYXRyb2xsZXJfc2VjdGlvbil9YCk7XG5cbiAgICAgICAgY29uc3Qgcm93ID0gcGF0cm9sbGVyX3NlY3Rpb24uaW5kZXggKyAxOyAvLyBwcm9ncmFtbWluZyAtPiBleGNlbCBsb29rdXBcbiAgICAgICAgY29uc3QgcmFuZ2UgPSBgJHt0aGlzLmNvbmZpZy5TRUNUSU9OX0RST1BET1dOX0NPTFVNTn0ke3Jvd31gO1xuXG4gICAgICAgIGF3YWl0IHRoaXMubG9naW5fc2hlZXQudXBkYXRlX3ZhbHVlcyhyYW5nZSwgW1tuZXdfc2VjdGlvbl92YWx1ZV1dKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZXMgYSByb3cgb2YgcGF0cm9sbGVyIGRhdGEuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gVGhlIGluZGV4IG9mIHRoZSByb3cuXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gcm93IC0gVGhlIHJvdyBkYXRhLlxuICAgICAqIEBwYXJhbSB7UGF0cm9sbGVyUm93Q29uZmlnfSBvcHRzIC0gVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyBmb3IgdGhlIHBhdHJvbGxlciByb3cuXG4gICAgICogQHJldHVybnMge1BhdHJvbGxlclJvdyB8IG51bGx9IFRoZSBwYXJzZWQgcGF0cm9sbGVyIHJvdyBvciBudWxsIGlmIGludmFsaWQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBwYXJzZV9wYXRyb2xsZXJfcm93KFxuICAgICAgICBpbmRleDogbnVtYmVyLFxuICAgICAgICByb3c6IHN0cmluZ1tdLFxuICAgICAgICBvcHRzOiBQYXRyb2xsZXJSb3dDb25maWdcbiAgICApOiBQYXRyb2xsZXJSb3cgfCBudWxsIHtcbiAgICAgICAgaWYgKHJvdy5sZW5ndGggPCA0KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXggPCAzKXtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICBuYW1lOiByb3dbZXhjZWxfcm93X3RvX2luZGV4KG9wdHMuTkFNRV9DT0xVTU4pXSxcbiAgICAgICAgICAgIGNhdGVnb3J5OiByb3dbZXhjZWxfcm93X3RvX2luZGV4KG9wdHMuQ0FURUdPUllfQ09MVU1OKV0sXG4gICAgICAgICAgICBzZWN0aW9uOiByb3dbZXhjZWxfcm93X3RvX2luZGV4KG9wdHMuU0VDVElPTl9EUk9QRE9XTl9DT0xVTU4pXSxcbiAgICAgICAgICAgIGNoZWNraW46IHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5DSEVDS0lOX0RST1BET1dOX0NPTFVNTildLFxuICAgICAgICB9O1xuICAgIH1cbn0iLCJpbXBvcnQge3NoZWV0c192NH0gZnJvbSBcImdvb2dsZWFwaXNcIjtcbmltcG9ydCB7U2Vhc29uU2hlZXRDb25maWcsfSBmcm9tIFwiLi4vZW52L2hhbmRsZXJfY29uZmlnXCI7XG5pbXBvcnQge2V4Y2VsX3Jvd190b19pbmRleH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxcIjtcbmltcG9ydCBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYiBmcm9tIFwiLi4vdXRpbHMvZ29vZ2xlX3NoZWV0c19zcHJlYWRzaGVldF90YWJcIjtcbmltcG9ydCB7ZmlsdGVyX2xpc3RfdG9fZW5kc3dpdGhfY3VycmVudF9kYXl9IGZyb20gXCIuLi91dGlscy9kYXRldGltZV91dGlsXCI7XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGEgc2Vhc29uIHNoZWV0IGluIEdvb2dsZSBTaGVldHMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXNvblNoZWV0IHtcbiAgICBzaGVldDogR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWI7XG4gICAgY29uZmlnOiBTZWFzb25TaGVldENvbmZpZztcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgU2Vhc29uU2hlZXQuXG4gICAgICogQHBhcmFtIHtzaGVldHNfdjQuU2hlZXRzIHwgbnVsbH0gc2hlZXRzX3NlcnZpY2UgLSBUaGUgR29vZ2xlIFNoZWV0cyBBUEkgc2VydmljZS5cbiAgICAgKiBAcGFyYW0ge1NlYXNvblNoZWV0Q29uZmlnfSBjb25maWcgLSBUaGUgY29uZmlndXJhdGlvbiBmb3IgdGhlIHNlYXNvbiBzaGVldC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgc2hlZXRzX3NlcnZpY2U6IHNoZWV0c192NC5TaGVldHMgfCBudWxsLFxuICAgICAgICBjb25maWc6IFNlYXNvblNoZWV0Q29uZmlnXG4gICAgKSB7XG4gICAgICAgIHRoaXMuc2hlZXQgPSBuZXcgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIoXG4gICAgICAgICAgICBzaGVldHNfc2VydmljZSxcbiAgICAgICAgICAgIGNvbmZpZy5TSEVFVF9JRCxcbiAgICAgICAgICAgIGNvbmZpZy5TRUFTT05fU0hFRVRcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbnVtYmVyIG9mIGRheXMgcGF0cm9sbGVkIGJ5IGEgcGF0cm9sbGVyLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRyb2xsZXJfbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwYXRyb2xsZXIuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8bnVtYmVyPn0gVGhlIG51bWJlciBvZiBkYXlzIHBhdHJvbGxlZC5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfcGF0cm9sbGVkX2RheXMoXG4gICAgICAgIHBhdHJvbGxlcl9uYW1lOiBzdHJpbmdcbiAgICApOiBQcm9taXNlPG51bWJlcj4ge1xuICAgICAgICBjb25zdCBwYXRyb2xsZXJfcm93ID0gYXdhaXQgdGhpcy5zaGVldC5nZXRfc2hlZXRfcm93X2Zvcl9wYXRyb2xsZXIoXG4gICAgICAgICAgICBwYXRyb2xsZXJfbmFtZSxcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLlNFQVNPTl9TSEVFVF9OQU1FX0NPTFVNTlxuICAgICAgICApO1xuXG4gICAgICAgIGlmICghcGF0cm9sbGVyX3Jvdykge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY3VycmVudE51bWJlciA9XG4gICAgICAgICAgICBwYXRyb2xsZXJfcm93LnJvd1tleGNlbF9yb3dfdG9faW5kZXgodGhpcy5jb25maWcuU0VBU09OX1NIRUVUX0RBWVNfQ09MVU1OKV07XG5cbiAgICAgICAgY29uc3QgY3VycmVudERheSA9IGZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2N1cnJlbnRfZGF5KHBhdHJvbGxlcl9yb3cucm93KVxuICAgICAgICAgICAgLm1hcCgoeCkgPT4gKHg/LnN0YXJ0c1dpdGgoXCJIXCIpID8gMC41IDogMSkpXG4gICAgICAgICAgICAucmVkdWNlKCh4LCB5LCBpKSA9PiB4ICsgeSwgMCk7XG5cbiAgICAgICAgcmV0dXJuIGN1cnJlbnROdW1iZXIgLSBjdXJyZW50RGF5O1xuICAgIH1cbn0iLCJpbXBvcnQge3NoZWV0c192NH0gZnJvbSBcImdvb2dsZWFwaXNcIjtcbmltcG9ydCBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYiBmcm9tIFwiLi4vdXRpbHMvZ29vZ2xlX3NoZWV0c19zcHJlYWRzaGVldF90YWJcIjtcbmltcG9ydCB7U2xlZEJlYWNvbkNvbmZpZ30gZnJvbSBcIi4uL2Vudi9oYW5kbGVyX2NvbmZpZ1wiO1xuaW1wb3J0IHtleGNlbF9yb3dfdG9faW5kZXgsIHJvd19jb2xfdG9fZXhjZWxfaW5kZXh9IGZyb20gXCIuLi91dGlscy91dGlsXCI7XG5pbXBvcnQge0JWTlNQUmVzcG9uc2V9IGZyb20gXCIuLi9oYW5kbGVycy9idm5zcF9oYW5kbGVyXCI7XG5pbXBvcnQge2Zvcm1hdF9kYXRlX2Zvcl9zcHJlYWRzaGVldF92YWx1ZX0gZnJvbSBcIi4uL3V0aWxzL2RhdGV0aW1lX3V0aWxcIjtcblxuXG5leHBvcnQgY2xhc3MgQmVhY29uU2VhcmNoZXMge1xuICAgIHJvdzogYW55W107XG4gICAgaW5kZXg6IG51bWJlcjtcbiAgICBzZWFyY2hfY291bnQ6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICByb3c6IGFueVtdLFxuICAgICAgICBpbmRleDogbnVtYmVyLFxuICAgICAgICBzZWFyY2hfY291bnQ6IGFueVxuICAgICkge1xuICAgICAgICB0aGlzLnJvdyA9IHJvdztcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgICAgICB0aGlzLnNlYXJjaF9jb3VudCA9IE51bWJlcihzZWFyY2hfY291bnQpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBTbGVkIEJlYWNvbiBDaGVjayBTaGVldCBpbiBHb29nbGUgU2hlZXRzXG4gKi9cbmV4cG9ydCAgY2xhc3MgU2xlZEJlYWNvbkNoZWNrU2hlZXQgIHtcbiAgICBzbGVkX2JlYWNvbl9jaGVja19zaGVldDogR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWI7XG4gICAgY29uZmlnOiBTbGVkQmVhY29uQ29uZmlnXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIExvZ2luU2hlZXQuXG4gICAgICogQHBhcmFtIHtzaGVldHNfdjQuU2hlZXRzIHwgbnVsbH0gc2hlZXRzX3NlcnZpY2UgLSBUaGUgR29vZ2xlIFNoZWV0cyBBUEkgc2VydmljZS5cbiAgICAgKiBAcGFyYW0ge1NsZWRCZWFjb25Db25maWd9IGNvbmZpZyAtIFRoZSBjb25maWd1cmF0aW9uIGZvciB0aGlzIHNoZWV0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyB8IG51bGwsXG4gICAgICAgIGNvbmZpZzogU2xlZEJlYWNvbkNvbmZpZ1xuICAgICkge1xuICAgICAgICB0aGlzLnNsZWRfYmVhY29uX2NoZWNrX3NoZWV0ID0gbmV3IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiKFxuICAgICAgICAgICAgc2hlZXRzX3NlcnZpY2UsXG4gICAgICAgICAgICBjb25maWcuU0hFRVRfSUQsXG4gICAgICAgICAgICBjb25maWcuU0xFRF9CRUFDT05fU0hFRVRcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gICAgfVxuXG4gICAgZ2V0IHN0YXJ0X2luZGV4KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBleGNlbF9yb3dfdG9faW5kZXgoXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5CRUFDT05fRklORF9EQVRFU19TVEFSVElOR19DT0xVTU5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXQgc2hlZXRfbmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuU0xFRF9CRUFDT05fU0hFRVQ7XG4gICAgfVxuXG4gICAgZ2V0IG5hbWVfY29sdW1uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5TTEVEX0JFQUNPTl9TSEVFVF9OQU1FX0NPTFVNTjtcbiAgICB9XG5cbiAgICBnZXQgYmVhY29uX3NlYXJjaF9jb3VudF9jb2x1bW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLkJFQUNPTl9TRUFSQ0hfQ09VTlRfQ09MVU1OO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY3VycmVudCBzZWFyY2hlcyBmb3IgdGhlIGdpdmVuIHBhdHJvbGxlclxuICAgICAqIEBwYXJhbSBwYXRyb2xsZXJfbmFtZVxuICAgICAqL1xuICAgIGFzeW5jIGdldF9iZWFjb25fc2VhcmNoZXMoXG4gICAgICAgIHBhdHJvbGxlcl9uYW1lOiBzdHJpbmdcbiAgICApOiBQcm9taXNlPEJlYWNvblNlYXJjaGVzIHwgbnVsbD4ge1xuICAgICAgICBjb25zdCBwYXRyb2xsZXJfcm93ID0gYXdhaXQgdGhpcy5zbGVkX2JlYWNvbl9jaGVja19zaGVldC5nZXRfc2hlZXRfcm93X2Zvcl9wYXRyb2xsZXIoXG4gICAgICAgICAgICBwYXRyb2xsZXJfbmFtZSxcbiAgICAgICAgICAgIHRoaXMubmFtZV9jb2x1bW5cbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHBhdHJvbGxlcl9yb3cgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2VhcmNoX2NvdW50ID0gcGF0cm9sbGVyX3Jvdy5yb3dbZXhjZWxfcm93X3RvX2luZGV4KHRoaXMuYmVhY29uX3NlYXJjaF9jb3VudF9jb2x1bW4pXTtcbiAgICAgICAgcmV0dXJuIG5ldyBCZWFjb25TZWFyY2hlcyhcbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cucm93LFxuICAgICAgICAgICAgcGF0cm9sbGVyX3Jvdy5pbmRleCxcbiAgICAgICAgICAgIHNlYXJjaF9jb3VudFxuICAgICAgICApO1xuXG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBudW1iZXIgb2YgYmVhY29uIGZpbmRzIGJ5IGEgcGF0cm9sbGVyLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRyb2xsZXJfbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwYXRyb2xsZXIuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8bnVtYmVyPn0gVGhlIG51bWJlciBvZiB0aW1lcyB0aGlzIHBhdHJvbGxlciBmb3VuZCBhIGJlYWNvbnMuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3BhdHJvbGxlZF9iZWFjb25fZmluZF9jb3VudChcbiAgICAgICAgcGF0cm9sbGVyX25hbWU6IHN0cmluZ1xuICAgICk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgICAgIGNvbnN0IHBhdHJvbGxlcl9yb3cgPSBhd2FpdCB0aGlzLnNsZWRfYmVhY29uX2NoZWNrX3NoZWV0LmdldF9zaGVldF9yb3dfZm9yX3BhdHJvbGxlcihcbiAgICAgICAgICAgIHBhdHJvbGxlcl9uYW1lLFxuICAgICAgICAgICAgdGhpcy5jb25maWcuU0xFRF9CRUFDT05fU0hFRVRfTkFNRV9DT0xVTU5cbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoIXBhdHJvbGxlcl9yb3cpIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYXRyb2xsZXJfcm93LnJvd1tleGNlbF9yb3dfdG9faW5kZXgodGhpcy5jb25maWcuQkVBQ09OX1NFQVJDSF9DT1VOVF9DT0xVTU4pXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWNvcmQgYSBuZXcgYmVhY29uIHNlYXJjaCBmb3IgdG9kYXkgYXQgdGhlIHNwZWNpZmllZCBsb2NhdGlvbi5cbiAgICAgKiBAcGFyYW0gcGF0cm9sbGVyX3Jvd1xuICAgICAqIEBwYXJhbSBzZWFyY2hfbG9jYXRpb25cbiAgICAgKi9cbiAgICBhc3luYyBzZXRfYmVhY29uc19zZWFyY2hlcyhcbiAgICAgICAgcGF0cm9sbGVyX3JvdzogQmVhY29uU2VhcmNoZXMsXG4gICAgICAgIHNlYXJjaF9sb2NhdGlvbjogc3RyaW5nXG4gICAgKSB7XG4gICAgICAgIGNvbnN0ICByb3dfbnVtID0gcGF0cm9sbGVyX3Jvdy5pbmRleDtcbiAgICAgICAgY29uc3Qgc3RhcnRfaW5kZXggPSB0aGlzLnN0YXJ0X2luZGV4O1xuICAgICAgICBjb25zdCBwcmlvcl9sZW5ndGggPSBwYXRyb2xsZXJfcm93LnJvdy5sZW5ndGggLSBzdGFydF9pbmRleDtcbiAgICAgICAgY29uc3QgY3VycmVudF9kYXRlX3N0cmluZyA9IGZvcm1hdF9kYXRlX2Zvcl9zcHJlYWRzaGVldF92YWx1ZShuZXcgRGF0ZSgpKTtcblxuICAgICAgICBsZXQgbmV3X3ZhbHMgPSBwYXRyb2xsZXJfcm93LnJvd1xuICAgICAgICAgICAgLnNsaWNlKHN0YXJ0X2luZGV4KVxuICAgICAgICAgICAgLm1hcCgoeCkgPT4geD8udG9TdHJpbmcoKSk7XG5cbiAgICAgICAgLy8gUmVjb3JkICB0aGUgZGF0ZSBvZiB0aGUgc2VhcmNoIGFuZCB0aGUgbG9jYXRpb25cbiAgICAgICAgbmV3X3ZhbHMucHVzaChjdXJyZW50X2RhdGVfc3RyaW5nKyBcIixcIiArIHNlYXJjaF9sb2NhdGlvbik7XG5cbiAgICAgICAgY29uc3QgdXBkYXRlX2xlbmd0aCA9IE1hdGgubWF4KHByaW9yX2xlbmd0aCwgbmV3X3ZhbHMubGVuZ3RoKTtcbiAgICAgICAgd2hpbGUgKG5ld192YWxzLmxlbmd0aCA8IHVwZGF0ZV9sZW5ndGgpIHtcbiAgICAgICAgICAgIG5ld192YWxzLnB1c2goXCJcIik7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBlbmRfaW5kZXggPSBzdGFydF9pbmRleCArIHVwZGF0ZV9sZW5ndGggLSAxO1xuICAgICAgICBjb25zdCByYW5nZSA9IGAke3RoaXMuc2xlZF9iZWFjb25fY2hlY2tfc2hlZXQuc2hlZXRfbmFtZX0hJHtyb3dfY29sX3RvX2V4Y2VsX2luZGV4KFxuICAgICAgICAgICAgcm93X251bSxcbiAgICAgICAgICAgIHN0YXJ0X2luZGV4XG4gICAgICAgICl9OiR7cm93X2NvbF90b19leGNlbF9pbmRleChyb3dfbnVtLCBlbmRfaW5kZXgpfWA7XG5cbiAgICAgICAgY29uc29sZS5sb2coYFVwZGF0aW5nICR7cmFuZ2V9IHdpdGggJHtuZXdfdmFscy5sZW5ndGh9IHZhbHVlc2ApO1xuICAgICAgICBhd2FpdCB0aGlzLnNsZWRfYmVhY29uX2NoZWNrX3NoZWV0LnVwZGF0ZV92YWx1ZXMocmFuZ2UsIFtuZXdfdmFsc10pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlIGxvY2F0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHkgLSB0aGUgYm9keSBvZiB0aGUgcmVxdWVzdFxuICAgICAqIEByZXR1cm5zIHtzdHJpbmcgfCBudWxsfSBUaGUgc2VhcmNoIGxvY2F0aW9uIGlmIHRoZSBsb2NhdGlvbiBpcyB2YWxpZFxuICAgICAqL1xuICAgIHBhcnNlX2xvY2F0aW9uKGJvZHk6IHN0cmluZyB8IG51bGwpOiBzdHJpbmcgfG51bGwgIHtcbiAgICAgICAgaWYgKGJvZHkgPT09IG51bGwgKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jbGVhblNtc1ZhbHVlKGJvZHkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNhbml0aXplIGlucHV0IGZvciBzdG9yYWdlIGluIEdvb2dsZSBTaGVldHMgYW5kIFR3aWxpbyBTTVMgZm9yd2FydGRpbmcsIGJ5IGF2b2lkaW5nXG4gICAgICogLSBGbGF0dGVucyBtdWx0aS1saW5lIGlucHV0cywgdGFicywgYW5kIGhpZGRlbiBjb250cm9sIGNoYXJhY3RlcnMgaW50byBzaW5nbGUgc3BhY2VzLlxuICAgICAqIC0gVHJpbXMgYW5kIG5vcm1hbGl6ZXMgZXhjZXNzaXZlIHdoaXRlc3BhY2UuXG4gICAgICogLSBTdHJpcHMgbGVhZGluZyBmb3JtdWxhIGluamVjdGlvbiB0cmlnZ2VycyAoPSwgKywgLSwgQCkgdG8gcHJldmVudCBjZWxsIGV4ZWN1dGlvbi5cbiAgICAgKiAtIFN0cmlwcyBlbW9qaXMsIG1pc2NlbGxhbmVvdXMgc3ltYm9scywgYW5kIHRyYW5zcG9ydC9tYXAgaW5kaWNhdG9ycy5cbiAgICAgKiAtIFNhZmVseSB0cnVuY2F0ZXMgdGV4dCB0byBhIG1heGltdW0gY2hhcmFjdGVyIGxlbmd0aC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbnB1dCAtIFRoZSByYXcgaW5jb21pbmcgU01TIHRleHQgc3RyaW5nLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtYXhMZW5ndGggLSBUaGUgbWF4aW11bSBhbGxvd2VkIHZpc2libGUgY2hhcmFjdGVycyAoZGVmYXVsdDogMzIwKS5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY2xlYW5lZCwgZmxhdHRlbmVkLCBhbmQgc2FmZWx5IHRydW5jYXRlZCBwbGFpbnRleHQgc3RyaW5nLlxuICAgICAqL1xuICAgIGNsZWFuU21zVmFsdWUoaW5wdXQ6IHN0cmluZywgbWF4TGVuZ3RoOiBudW1iZXIgPSAzMik6IHN0cmluZyB7XG4gICAgICAgIGlmICghaW5wdXQpIHJldHVybiAnJztcblxuICAgICAgICAvLyAxLiBTdHJpcCBsaW5lIGJyZWFrcywgdGFicywgYW5kIGludmlzaWJsZSBjb250cm9sIGNoYXJhY3RlcnMgKFxceDAwLVxceDFGLCBcXHg3RilcbiAgICAgICAgbGV0IGNsZWFuZWQgPSBpbnB1dC5yZXBsYWNlKC9bXFxyXFxuXFx0XFx4MDAtXFx4MUZcXHg3Rl0vZywgJyAnKTtcblxuICAgICAgICAvLyAyLiBLZWVwIE9OTFkgbm9ybWFsIGNoYXJhY3RlcnMgKExldHRlcnMsIE51bWJlcnMsIFNwYWNlcywgSHlwaGVucywgU2xhc2hlcylcbiAgICAgICAgLy8gRG9uJ3QgYWxsb3cgZW1vamlzLCAgZXh0ZW5kZWQgcGljdG9ncmFwaGljIGFuZCBvdGhlciBub24tc3RhbmRhcmQgY2hhcmFjdGVycy5cbiAgICAgICAgLy8gVGhpcyBpbnN0YW50bHkgdmFwb3JpemVzIGFsbCBlbW9qaXMsIHZhcmlhdGlvbiBzZWxlY3RvcnMsIGFuZCB3ZWlyZCBzeW1ib2xzIGdsb2JhbGx5LlxuICAgICAgICBjbGVhbmVkID0gY2xlYW5lZC5yZXBsYWNlKC9bXmEtekEtWjAtOVxcc1xcL1xcLV0vZywgJycpO1xuXG4gICAgICAgIC8vIDMuIENvbGxhcHNlIG11bHRpcGxlIHNwYWNlcyBpbnRvIGEgc2luZ2xlIHNwYWNlIGFuZCB0cmltIGVkZ2VzXG4gICAgICAgIGNsZWFuZWQgPSBjbGVhbmVkLnJlcGxhY2UoL1xccysvZywgJyAnKS50cmltKCk7XG5cbiAgICAgICAgLy8gNC4gUmVtb3ZlIGZvcm11bGEgdHJpZ2dlcnMgZnJvbSB0aGUgYmVnaW5uaW5nIG9mIHRoZSBzdHJpbmdcbiAgICAgICAgY2xlYW5lZCA9IGNsZWFuZWQucmVwbGFjZSgvXihbPStcXC1AXSspLywgJycpLnRyaW0oKTtcblxuICAgICAgICAvLyA1LiBTYWZlbHkgdHJ1bmNhdGUgdXNpbmcgQXJyYXkuZnJvbSB0byBoYW5kbGUgYW55IHJlbWFpbmluZyBtdWx0aS1ieXRlIGNoYXJhY3RlcnNcbiAgICAgICAgY29uc3QgY2hhcmFjdGVycyA9IEFycmF5LmZyb20oY2xlYW5lZCk7XG4gICAgICAgIGlmIChjaGFyYWN0ZXJzLmxlbmd0aCA+IG1heExlbmd0aCkge1xuICAgICAgICAgICAgY2xlYW5lZCA9IGNoYXJhY3RlcnMuc2xpY2UoMCwgbWF4TGVuZ3RoKS5qb2luKCcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjbGVhbmVkO1xuICAgIH1cblxuXG59IiwiaW1wb3J0IHtnb29nbGV9IGZyb20gXCJnb29nbGVhcGlzXCI7XG5pbXBvcnQge0dlbmVyYXRlQXV0aFVybE9wdHN9IGZyb20gXCJnb29nbGUtYXV0aC1saWJyYXJ5XCI7XG5pbXBvcnQge09BdXRoMkNsaWVudH0gZnJvbSBcImdvb2dsZWFwaXMtY29tbW9uXCI7XG5pbXBvcnQge3Nhbml0aXplX3Bob25lX251bWJlcn0gZnJvbSBcIi4vdXRpbHMvdXRpbFwiO1xuaW1wb3J0IHtsb2FkX2NyZWRlbnRpYWxzX2ZpbGVzfSBmcm9tIFwiLi91dGlscy9maWxlX3V0aWxzXCI7XG5pbXBvcnQge1NlcnZpY2VDb250ZXh0fSBmcm9tIFwiQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlcy90eXBlc1wiO1xuaW1wb3J0IHtVc2VyQ3JlZHNDb25maWd9IGZyb20gXCIuL2Vudi9oYW5kbGVyX2NvbmZpZ1wiO1xuaW1wb3J0IHt2YWxpZGF0ZV9zY29wZXN9IGZyb20gXCIuL3V0aWxzL3Njb3BlX3V0aWxcIjtcblxuY29uc3QgU0NPUEVTID0gW1xuICAgIFwiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9zY3JpcHQucHJvamVjdHNcIixcbiAgICBcImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvc3ByZWFkc2hlZXRzXCIsXG5dO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyB1c2VyIGNyZWRlbnRpYWxzIGZvciBHb29nbGUgT0F1dGgyLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyQ3JlZHMge1xuICAgIG51bWJlcjogc3RyaW5nO1xuICAgIG9hdXRoMl9jbGllbnQ6IE9BdXRoMkNsaWVudDtcbiAgICBzeW5jX2NsaWVudDogU2VydmljZUNvbnRleHQ7XG4gICAgZG9tYWluPzogc3RyaW5nO1xuICAgIGxvYWRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgVXNlckNyZWRzIGluc3RhbmNlLlxuICAgICAqIEBwYXJhbSB7U2VydmljZUNvbnRleHR9IHN5bmNfY2xpZW50IC0gVGhlIFR3aWxpbyBTeW5jIGNsaWVudC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IHVuZGVmaW5lZH0gbnVtYmVyIC0gVGhlIHVzZXIncyBwaG9uZSBudW1iZXIuXG4gICAgICogQHBhcmFtIHtVc2VyQ3JlZHNDb25maWd9IG9wdHMgLSBUaGUgdXNlciBjcmVkZW50aWFscyBjb25maWd1cmF0aW9uLlxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBUaHJvd3MgYW4gZXJyb3IgaWYgdGhlIG51bWJlciBpcyB1bmRlZmluZWQgb3IgbnVsbC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgc3luY19jbGllbnQ6IFNlcnZpY2VDb250ZXh0LFxuICAgICAgICBudW1iZXI6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICAgICAgb3B0czogVXNlckNyZWRzQ29uZmlnXG4gICAgKSB7XG4gICAgICAgIGlmIChudW1iZXIgPT09IHVuZGVmaW5lZCB8fCBudW1iZXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk51bWJlciBpcyB1bmRlZmluZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5udW1iZXIgPSBzYW5pdGl6ZV9waG9uZV9udW1iZXIobnVtYmVyKTtcblxuICAgICAgICBjb25zdCBjcmVkZW50aWFscyA9IGxvYWRfY3JlZGVudGlhbHNfZmlsZXMoKTtcbiAgICAgICAgY29uc3QgeyBjbGllbnRfc2VjcmV0LCBjbGllbnRfaWQsIHJlZGlyZWN0X3VyaXMgfSA9IGNyZWRlbnRpYWxzLndlYjtcbiAgICAgICAgdGhpcy5vYXV0aDJfY2xpZW50ID0gbmV3IGdvb2dsZS5hdXRoLk9BdXRoMihcbiAgICAgICAgICAgIGNsaWVudF9pZCxcbiAgICAgICAgICAgIGNsaWVudF9zZWNyZXQsXG4gICAgICAgICAgICByZWRpcmVjdF91cmlzWzBdXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3luY19jbGllbnQgPSBzeW5jX2NsaWVudDtcbiAgICAgICAgbGV0IGRvbWFpbiA9IG9wdHMuTlNQX0VNQUlMX0RPTUFJTjtcbiAgICAgICAgaWYgKGRvbWFpbiA9PT0gdW5kZWZpbmVkIHx8IGRvbWFpbiA9PT0gbnVsbCB8fCBkb21haW4gPT09IFwiXCIpIHtcbiAgICAgICAgICAgIGRvbWFpbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZG9tYWluID0gZG9tYWluO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9hZCB0aGUgT0F1dGgyIHRva2VuLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIGJvb2xlYW4gaW5kaWNhdGluZyBpZiB0aGUgdG9rZW4gd2FzIGxvYWRlZC5cbiAgICAgKi9cbiAgICBhc3luYyBsb2FkVG9rZW4oKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIGlmICghdGhpcy5sb2FkZWQpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYExvb2tpbmcgZm9yICR7dGhpcy50b2tlbl9rZXl9YCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2F1dGgyRG9jID0gYXdhaXQgdGhpcy5zeW5jX2NsaWVudFxuICAgICAgICAgICAgICAgICAgICAuZG9jdW1lbnRzKHRoaXMudG9rZW5fa2V5KVxuICAgICAgICAgICAgICAgICAgICAuZmV0Y2goKTtcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIG9hdXRoMkRvYyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgICAgIG9hdXRoMkRvYy5kYXRhID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgICAgICBvYXV0aDJEb2MuZGF0YS50b2tlbiA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBEaWRuJ3QgZmluZCAke3RoaXMudG9rZW5fa2V5fWApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRva2VuID0gb2F1dGgyRG9jLmRhdGEudG9rZW47XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlX3Njb3BlcyhvYXV0aDJEb2MuZGF0YS5zY29wZXMsIFNDT1BFUyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2F1dGgyX2NsaWVudC5zZXRDcmVkZW50aWFscyh0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBMb2FkZWQgdG9rZW4gJHt0aGlzLnRva2VuX2tleX1gKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICAgICAgYEZhaWxlZCB0byBsb2FkIHRva2VuIGZvciAke3RoaXMudG9rZW5fa2V5fS5cXG4gJHtlfWBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHRva2VuIGtleS5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgdG9rZW4ga2V5LlxuICAgICAqL1xuICAgIGdldCB0b2tlbl9rZXkoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGBvYXV0aDJfJHt0aGlzLm51bWJlcn1gO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlbGV0ZSB0aGUgT0F1dGgyIHRva2VuLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIGJvb2xlYW4gaW5kaWNhdGluZyBpZiB0aGUgdG9rZW4gd2FzIGRlbGV0ZWQuXG4gICAgICovXG4gICAgYXN5bmMgZGVsZXRlVG9rZW4oKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIGNvbnN0IG9hdXRoMkRvYyA9IGF3YWl0IHRoaXMuc3luY19jbGllbnRcbiAgICAgICAgICAgIC5kb2N1bWVudHModGhpcy50b2tlbl9rZXkpXG4gICAgICAgICAgICAuZmV0Y2goKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgb2F1dGgyRG9jID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIG9hdXRoMkRvYy5kYXRhID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgb2F1dGgyRG9jLmRhdGEudG9rZW4gPT09IHVuZGVmaW5lZFxuICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBEaWRuJ3QgZmluZCAke3RoaXMudG9rZW5fa2V5fWApO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHRoaXMuc3luY19jbGllbnQuZG9jdW1lbnRzKG9hdXRoMkRvYy5zaWQpLnJlbW92ZSgpO1xuICAgICAgICBjb25zb2xlLmxvZyhgRGVsZXRlZCB0b2tlbiAke3RoaXMudG9rZW5fa2V5fWApO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb21wbGV0ZSB0aGUgbG9naW4gcHJvY2VzcyBieSBleGNoYW5naW5nIHRoZSBhdXRob3JpemF0aW9uIGNvZGUgZm9yIGEgdG9rZW4uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvZGUgLSBUaGUgYXV0aG9yaXphdGlvbiBjb2RlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IHNjb3BlcyAtIFRoZSBzY29wZXMgdG8gdmFsaWRhdGUuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGxvZ2luIHByb2Nlc3MgaXMgY29tcGxldGUuXG4gICAgICovXG4gICAgYXN5bmMgY29tcGxldGVMb2dpbihjb2RlOiBzdHJpbmcsIHNjb3Blczogc3RyaW5nW10pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgdmFsaWRhdGVfc2NvcGVzKHNjb3BlcywgU0NPUEVTKTtcbiAgICAgICAgY29uc3QgdG9rZW4gPSBhd2FpdCB0aGlzLm9hdXRoMl9jbGllbnQuZ2V0VG9rZW4oY29kZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KE9iamVjdC5rZXlzKHRva2VuLnJlcyEpKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRva2VuLnRva2VucykpO1xuICAgICAgICB0aGlzLm9hdXRoMl9jbGllbnQuc2V0Q3JlZGVudGlhbHModG9rZW4udG9rZW5zKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IG9hdXRoRG9jID0gYXdhaXQgdGhpcy5zeW5jX2NsaWVudC5kb2N1bWVudHMuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICBkYXRhOiB7IHRva2VuOiB0b2tlbi50b2tlbnMsIHNjb3Blczogc2NvcGVzIH0sXG4gICAgICAgICAgICAgICAgdW5pcXVlTmFtZTogdGhpcy50b2tlbl9rZXksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgYEV4Y2VwdGlvbiB3aGVuIGNyZWF0aW5nIG9hdXRoLiBUcnlpbmcgdG8gdXBkYXRlIGluc3RlYWQuLi5cXG4ke2V9YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IG9hdXRoRG9jID0gYXdhaXQgdGhpcy5zeW5jX2NsaWVudFxuICAgICAgICAgICAgICAgIC5kb2N1bWVudHModGhpcy50b2tlbl9rZXkpXG4gICAgICAgICAgICAgICAgLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHsgdG9rZW46IHRva2VuLCBzY29wZXM6IHNjb3BlcyB9LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBhdXRob3JpemF0aW9uIFVSTC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzdHJpbmc+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgYXV0aG9yaXphdGlvbiBVUkwuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0QXV0aFVybCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zdCBpZCA9IHRoaXMuZ2VuZXJhdGVSYW5kb21TdHJpbmcoKTtcbiAgICAgICAgY29uc29sZS5sb2coYFVzaW5nIG5vbmNlICR7aWR9IGZvciAke3RoaXMubnVtYmVyfWApO1xuICAgICAgICBjb25zdCBkb2MgPSBhd2FpdCB0aGlzLnN5bmNfY2xpZW50LmRvY3VtZW50cy5jcmVhdGUoe1xuICAgICAgICAgICAgZGF0YTogeyBudW1iZXI6IHRoaXMubnVtYmVyLCBzY29wZXM6IFNDT1BFUyB9LFxuICAgICAgICAgICAgdW5pcXVlTmFtZTogaWQsXG4gICAgICAgICAgICB0dGw6IDYwICogNSwgLy8gNSBtaW51dGVzXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhgTWFkZSBub25jZS1kb2M6ICR7SlNPTi5zdHJpbmdpZnkoZG9jKX1gKTtcblxuICAgICAgICBjb25zdCBvcHRzOiBHZW5lcmF0ZUF1dGhVcmxPcHRzID0ge1xuICAgICAgICAgICAgYWNjZXNzX3R5cGU6IFwib2ZmbGluZVwiLFxuICAgICAgICAgICAgc2NvcGU6IFNDT1BFUyxcbiAgICAgICAgICAgIHN0YXRlOiBpZCxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMuZG9tYWluKSB7XG4gICAgICAgICAgICBvcHRzW1wiaGRcIl0gPSB0aGlzLmRvbWFpbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm9hdXRoMl9jbGllbnQuZ2VuZXJhdGVBdXRoVXJsKG9wdHMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlIGEgcmFuZG9tIHN0cmluZy5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBBIHJhbmRvbSBzdHJpbmcuXG4gICAgICovXG4gICAgZ2VuZXJhdGVSYW5kb21TdHJpbmcoKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gMzA7XG4gICAgICAgIGxldCByZXN1bHQgPSBcIlwiO1xuICAgICAgICBjb25zdCBjaGFyYWN0ZXJzID1cbiAgICAgICAgICAgIFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODlcIjtcbiAgICAgICAgY29uc3QgY2hhcmFjdGVyc0xlbmd0aCA9IGNoYXJhY3RlcnMubGVuZ3RoO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gY2hhcmFjdGVycy5jaGFyQXQoXG4gICAgICAgICAgICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hhcmFjdGVyc0xlbmd0aClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5cbi8qKlxuICogSW50ZXJmYWNlIHJlcHJlc2VudGluZyB0aGUgdXNlciBjcmVkZW50aWFscyBjb25maWd1cmF0aW9uLlxuICovXG5leHBvcnQgeyBVc2VyQ3JlZHMgfTtcbiIsIi8qKlxuICogUmVwcmVzZW50cyBhIGNoZWNrLWluIHZhbHVlIHdpdGggdmFyaW91cyBwcm9wZXJ0aWVzIGFuZCBsb29rdXAgdmFsdWVzLlxuICovXG5jbGFzcyBDaGVja2luVmFsdWUge1xuICAgIGtleTogc3RyaW5nO1xuICAgIHNoZWV0c192YWx1ZTogc3RyaW5nO1xuICAgIHNtc19kZXNjOiBzdHJpbmc7XG4gICAgZmFzdF9jaGVja2luczogc3RyaW5nW107XG4gICAgbG9va3VwX3ZhbHVlczogU2V0PHN0cmluZz47XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIENoZWNraW5WYWx1ZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gVGhlIGtleSBmb3IgdGhlIGNoZWNrLWluIHZhbHVlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaGVldHNfdmFsdWUgLSBUaGUgdmFsdWUgdXNlZCBpbiBzaGVldHMuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNtc19kZXNjIC0gVGhlIGRlc2NyaXB0aW9uIHVzZWQgaW4gU01TLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgc3RyaW5nW119IGZhc3RfY2hlY2tpbnMgLSBUaGUgZmFzdCBjaGVjay1pbiB2YWx1ZXMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGtleTogc3RyaW5nLFxuICAgICAgICBzaGVldHNfdmFsdWU6IHN0cmluZyxcbiAgICAgICAgc21zX2Rlc2M6IHN0cmluZyxcbiAgICAgICAgZmFzdF9jaGVja2luczogc3RyaW5nIHwgc3RyaW5nW11cbiAgICApIHtcbiAgICAgICAgaWYgKCEoZmFzdF9jaGVja2lucyBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgICAgICAgZmFzdF9jaGVja2lucyA9IFtmYXN0X2NoZWNraW5zXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmtleSA9IGtleTtcbiAgICAgICAgdGhpcy5zaGVldHNfdmFsdWUgPSBzaGVldHNfdmFsdWU7XG4gICAgICAgIHRoaXMuc21zX2Rlc2MgPSBzbXNfZGVzYztcbiAgICAgICAgdGhpcy5mYXN0X2NoZWNraW5zID0gZmFzdF9jaGVja2lucy5tYXAoKHgpID0+IHgudHJpbSgpLnRvTG93ZXJDYXNlKCkpO1xuXG4gICAgICAgIGNvbnN0IHNtc19kZXNjX3NwbGl0OiBzdHJpbmdbXSA9IHNtc19kZXNjXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxzKy8sIFwiLVwiKVxuICAgICAgICAgICAgLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgIC5zcGxpdChcIi9cIik7XG4gICAgICAgIGNvbnN0IGxvb2t1cF92YWxzID0gWy4uLnRoaXMuZmFzdF9jaGVja2lucywgLi4uc21zX2Rlc2Nfc3BsaXRdO1xuICAgICAgICB0aGlzLmxvb2t1cF92YWx1ZXMgPSBuZXcgU2V0PHN0cmluZz4obG9va3VwX3ZhbHMpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgY29sbGVjdGlvbiBvZiBjaGVjay1pbiB2YWx1ZXMgd2l0aCB2YXJpb3VzIGxvb2t1cCBtZXRob2RzLlxuICovXG5jbGFzcyBDaGVja2luVmFsdWVzIHtcbiAgICBieV9rZXk6IHsgW2tleTogc3RyaW5nXTogQ2hlY2tpblZhbHVlIH0gPSB7fTtcbiAgICBieV9sdjogeyBba2V5OiBzdHJpbmddOiBDaGVja2luVmFsdWUgfSA9IHt9O1xuICAgIGJ5X2ZjOiB7IFtrZXk6IHN0cmluZ106IENoZWNraW5WYWx1ZSB9ID0ge307XG4gICAgYnlfc2hlZXRfc3RyaW5nOiB7IFtrZXk6IHN0cmluZ106IENoZWNraW5WYWx1ZSB9ID0ge307XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIENoZWNraW5WYWx1ZXMuXG4gICAgICogQHBhcmFtIHtDaGVja2luVmFsdWVbXX0gY2hlY2tpblZhbHVlcyAtIFRoZSBhcnJheSBvZiBjaGVjay1pbiB2YWx1ZXMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY2hlY2tpblZhbHVlczogQ2hlY2tpblZhbHVlW10pIHtcbiAgICAgICAgZm9yIChjb25zdCBjaGVja2luVmFsdWUgb2YgY2hlY2tpblZhbHVlcykge1xuICAgICAgICAgICAgdGhpcy5ieV9rZXlbY2hlY2tpblZhbHVlLmtleV0gPSBjaGVja2luVmFsdWU7XG4gICAgICAgICAgICB0aGlzLmJ5X3NoZWV0X3N0cmluZ1tjaGVja2luVmFsdWUuc2hlZXRzX3ZhbHVlXSA9IGNoZWNraW5WYWx1ZTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbHYgb2YgY2hlY2tpblZhbHVlLmxvb2t1cF92YWx1ZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ5X2x2W2x2XSA9IGNoZWNraW5WYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3QgZmMgb2YgY2hlY2tpblZhbHVlLmZhc3RfY2hlY2tpbnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ5X2ZjW2ZjXSA9IGNoZWNraW5WYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlcyBhIGZhc3QgY2hlY2staW4gdmFsdWUgZnJvbSB0aGUgZ2l2ZW4gYm9keSBzdHJpbmcuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHkgLSBUaGUgYm9keSBzdHJpbmcgdG8gcGFyc2UuXG4gICAgICogQHJldHVybnMge0NoZWNraW5WYWx1ZSB8IHVuZGVmaW5lZH0gVGhlIHBhcnNlZCBjaGVjay1pbiB2YWx1ZSBvciB1bmRlZmluZWQuXG4gICAgICovXG4gICAgcGFyc2VfZmFzdF9jaGVja2luKGJvZHk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5ieV9mY1tib2R5XTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZXMgYSBjaGVjay1pbiB2YWx1ZSBmcm9tIHRoZSBnaXZlbiBib2R5IHN0cmluZy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYm9keSAtIFRoZSBib2R5IHN0cmluZyB0byBwYXJzZS5cbiAgICAgKiBAcmV0dXJucyB7Q2hlY2tpblZhbHVlIHwgdW5kZWZpbmVkfSBUaGUgcGFyc2VkIGNoZWNrLWluIHZhbHVlIG9yIHVuZGVmaW5lZC5cbiAgICAgKi9cbiAgICBwYXJzZV9jaGVja2luKGJvZHk6IHN0cmluZykge1xuICAgICAgICBjb25zdCBjaGVja2luX2xvd2VyID0gYm9keS5yZXBsYWNlKC9cXHMrLywgXCJcIik7XG4gICAgICAgIHJldHVybiB0aGlzLmJ5X2x2W2NoZWNraW5fbG93ZXJdO1xuICAgIH1cbn1cblxuZXhwb3J0IHsgQ2hlY2tpblZhbHVlLCBDaGVja2luVmFsdWVzIH0iLCIvKipcbiAqIENvbnZlcnQgYW4gRXhjZWwgZGF0ZSB0byBhIEphdmFTY3JpcHQgRGF0ZSBvYmplY3QuXG4gKiBAcGFyYW0ge251bWJlcn0gZGF0ZSAtIFRoZSBFeGNlbCBkYXRlLlxuICogQHJldHVybnMge0RhdGV9IFRoZSBKYXZhU2NyaXB0IERhdGUgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBleGNlbF9kYXRlX3RvX2pzX2RhdGUoZGF0ZTogbnVtYmVyKTogRGF0ZSB7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IERhdGUoMCk7XG4gICAgcmVzdWx0LnNldFVUQ01pbGxpc2Vjb25kcyhNYXRoLnJvdW5kKChkYXRlIC0gMjU1NjkpICogODY0MDAgKiAxMDAwKSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDaGFuZ2UgdGhlIHRpbWV6b25lIG9mIGEgRGF0ZSBvYmplY3QgdG8gUFNULlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIC0gVGhlIERhdGUgb2JqZWN0LlxuICogQHJldHVybnMge0RhdGV9IFRoZSBEYXRlIG9iamVjdCB3aXRoIHRoZSB0aW1lem9uZSBzZXQgdG8gUFNULlxuICovXG5mdW5jdGlvbiBjaGFuZ2VfdGltZXpvbmVfdG9fcHN0KGRhdGU6IERhdGUpOiBEYXRlIHtcbiAgICByZXR1cm4gbmV3IERhdGUoZGF0ZS50b1VUQ1N0cmluZygpLnJlcGxhY2UoXCIgR01UXCIsIFwiIFBTVFwiKSk7XG59XG5cbi8qKlxuICogU3RyaXAgdGhlIHRpbWUgZnJvbSBhIERhdGUgb2JqZWN0LCBrZWVwaW5nIG9ubHkgdGhlIGRhdGUuXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgLSBUaGUgRGF0ZSBvYmplY3QuXG4gKiBAcmV0dXJucyB7RGF0ZX0gVGhlIERhdGUgb2JqZWN0IHdpdGggdGhlIHRpbWUgc3RyaXBwZWQuXG4gKi9cbmZ1bmN0aW9uIHN0cmlwX2RhdGV0aW1lX3RvX2RhdGUoZGF0ZTogRGF0ZSk6IERhdGUge1xuICAgIHJldHVybiBuZXcgRGF0ZShcbiAgICAgICAgZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoXCJlbi1VU1wiLCB7dGltZVpvbmU6IFwiQW1lcmljYS9Mb3NfQW5nZWxlc1wifSlcbiAgICApO1xufVxuXG4vKipcbiAqIFNhbml0aXplIGEgZGF0ZSBieSBjb252ZXJ0aW5nIGl0IGZyb20gYW4gRXhjZWwgZGF0ZSBhbmQgc3RyaXBwaW5nIHRoZSB0aW1lLlxuICogQHBhcmFtIHtudW1iZXJ9IGRhdGUgLSBUaGUgRXhjZWwgZGF0ZS5cbiAqIEByZXR1cm5zIHtEYXRlfSBUaGUgc2FuaXRpemVkIERhdGUgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBzYW5pdGl6ZV9kYXRlKGRhdGU6IG51bWJlcik6IERhdGUge1xuICAgIHJldHVybiBzdHJpcF9kYXRldGltZV90b19kYXRlKFxuICAgICAgICBjaGFuZ2VfdGltZXpvbmVfdG9fcHN0KGV4Y2VsX2RhdGVfdG9fanNfZGF0ZShkYXRlKSlcbiAgICApO1xufVxuXG4vKipcbiAqIEZvcm1hdCBhIERhdGUgb2JqZWN0IGZvciB1c2UgaW4gYSBzcHJlYWRzaGVldCB2YWx1ZS5cbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSAtIFRoZSBEYXRlIG9iamVjdC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgZGF0ZSBzdHJpbmcgaW4gUFNUXG4gKi9cbmZ1bmN0aW9uIGZvcm1hdF9kYXRlX2Zvcl9zcHJlYWRzaGVldF92YWx1ZShkYXRlOiBEYXRlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZGF0ZVxuICAgICAgICAudG9Mb2NhbGVEYXRlU3RyaW5nKFwiZW4tVVNcIiwge3RpbWVab25lOiBcIkFtZXJpY2EvTG9zX0FuZ2VsZXNcIn0pXG4gICAgICAgIC5zcGxpdChcIi9cIilcbiAgICAgICAgLm1hcCgoeCkgPT4geC5wYWRTdGFydCgyLCBcIjBcIikpXG4gICAgICAgIC5qb2luKFwiXCIpO1xufVxuXG4vKipcbiAqIEZpbHRlciBhIGxpc3QgdG8gaW5jbHVkZSBvbmx5IGl0ZW1zIHRoYXQgZW5kIHdpdGggYSBzcGVjaWZpYyBkYXRlLlxuICogQHBhcmFtIHthbnlbXX0gbGlzdCAtIFRoZSBsaXN0IHRvIGZpbHRlci5cbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSAtIFRoZSBkYXRlIHRvIGZpbHRlciBieS5cbiAqIEByZXR1cm5zIHthbnlbXX0gVGhlIGZpbHRlcmVkIGxpc3QuXG4gKi9cbmZ1bmN0aW9uIGZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2RhdGUobGlzdDogYW55W10sIGRhdGU6IERhdGUpOiBhbnlbXSB7XG4gICAgY29uc3QgZGF0ZXN0ciA9IGZvcm1hdF9kYXRlX2Zvcl9zcHJlYWRzaGVldF92YWx1ZShkYXRlKTtcbiAgICByZXR1cm4gbGlzdC5tYXAoKHgpID0+IHg/LnRvU3RyaW5nKCkpLmZpbHRlcigoeCkgPT4geD8uZW5kc1dpdGgoZGF0ZXN0cikpO1xufVxuXG4vKipcbiAqIEZpbHRlciBhIGxpc3QgdG8gaW5jbHVkZSBvbmx5IGl0ZW1zIHRoYXQgZW5kIHdpdGggdGhlIGN1cnJlbnQgZGF0ZS5cbiAqIEBwYXJhbSB7YW55W119IGxpc3QgLSBUaGUgbGlzdCB0byBmaWx0ZXIuXG4gKiBAcmV0dXJucyB7YW55W119IFRoZSBmaWx0ZXJlZCBsaXN0LlxuICovXG5mdW5jdGlvbiBmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9jdXJyZW50X2RheShsaXN0OiBhbnlbXSk6IGFueVtdIHtcbiAgICByZXR1cm4gZmlsdGVyX2xpc3RfdG9fZW5kc3dpdGhfZGF0ZShsaXN0LCBuZXcgRGF0ZSgpKTtcbn1cblxuZXhwb3J0IHtcbiAgICBzYW5pdGl6ZV9kYXRlLFxuICAgIGV4Y2VsX2RhdGVfdG9fanNfZGF0ZSxcbiAgICBjaGFuZ2VfdGltZXpvbmVfdG9fcHN0LFxuICAgIHN0cmlwX2RhdGV0aW1lX3RvX2RhdGUsXG4gICAgZm9ybWF0X2RhdGVfZm9yX3NwcmVhZHNoZWV0X3ZhbHVlLFxuICAgIGZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2RhdGUsXG4gICAgZmlsdGVyX2xpc3RfdG9fZW5kc3dpdGhfY3VycmVudF9kYXksXG59OyIsImltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICdAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzJztcblxuLyoqXG4gKiBMb2FkIGNyZWRlbnRpYWxzIGZyb20gYSBKU09OIGZpbGUuXG4gKiBAcmV0dXJucyB7YW55fSBUaGUgcGFyc2VkIGNyZWRlbnRpYWxzIGZyb20gdGhlIEpTT04gZmlsZS5cbiAqL1xuZnVuY3Rpb24gbG9hZF9jcmVkZW50aWFsc19maWxlcygpOiBhbnkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKFxuICAgICAgICBmc1xuICAgICAgICAgICAgLnJlYWRGaWxlU3luYyhSdW50aW1lLmdldEFzc2V0cygpW1wiL2NyZWRlbnRpYWxzLmpzb25cIl0ucGF0aClcbiAgICAgICAgICAgIC50b1N0cmluZygpXG4gICAgKTtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIHBhdGggdG8gdGhlIHNlcnZpY2UgY3JlZGVudGlhbHMgZmlsZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBwYXRoIHRvIHRoZSBzZXJ2aWNlIGNyZWRlbnRpYWxzIGZpbGUuXG4gKi9cbmZ1bmN0aW9uIGdldF9zZXJ2aWNlX2NyZWRlbnRpYWxzX3BhdGgoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gUnVudGltZS5nZXRBc3NldHMoKVtcIi9zZXJ2aWNlLWNyZWRlbnRpYWxzLmpzb25cIl0ucGF0aDtcbn1cblxuZXhwb3J0IHsgbG9hZF9jcmVkZW50aWFsc19maWxlcywgZ2V0X3NlcnZpY2VfY3JlZGVudGlhbHNfcGF0aCB9OyIsImltcG9ydCB7c2hlZXRzX3Y0fSBmcm9tIFwiZ29vZ2xlYXBpc1wiO1xuaW1wb3J0IHtleGNlbF9yb3dfdG9faW5kZXh9IGZyb20gXCIuL3V0aWxcIjtcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBHb29nbGUgU2hlZXRzIHNwcmVhZHNoZWV0IHRhYi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIge1xuICAgIHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzIHwgbnVsbDtcbiAgICBzaGVldF9pZDogc3RyaW5nO1xuICAgIHNoZWV0X25hbWU6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiLlxuICAgICAqIEBwYXJhbSB7c2hlZXRzX3Y0LlNoZWV0cyB8IG51bGx9IHNoZWV0c19zZXJ2aWNlIC0gVGhlIEdvb2dsZSBTaGVldHMgQVBJIHNlcnZpY2UgaW5zdGFuY2UuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNoZWV0X2lkIC0gVGhlIElEIG9mIHRoZSBHb29nbGUgU2hlZXRzIHNwcmVhZHNoZWV0LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaGVldF9uYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHNoZWV0IHRhYi5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgc2hlZXRzX3NlcnZpY2U6IHNoZWV0c192NC5TaGVldHMgfCBudWxsLFxuICAgICAgICBzaGVldF9pZDogc3RyaW5nLFxuICAgICAgICBzaGVldF9uYW1lOiBzdHJpbmdcbiAgICApIHtcbiAgICAgICAgdGhpcy5zaGVldHNfc2VydmljZSA9IHNoZWV0c19zZXJ2aWNlO1xuICAgICAgICB0aGlzLnNoZWV0X2lkID0gc2hlZXRfaWQ7XG4gICAgICAgIHRoaXMuc2hlZXRfbmFtZSA9IHNoZWV0X25hbWUuc3BsaXQoXCIhXCIpWzBdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB2YWx1ZXMgZnJvbSB0aGUgc2hlZXQuXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCBudWxsfSBbcmFuZ2VdIC0gVGhlIHJhbmdlIHRvIGdldCB2YWx1ZXMgZnJvbS5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnlbXVtdIHwgdW5kZWZpbmVkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIHZhbHVlcyBmcm9tIHRoZSBzaGVldC5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfdmFsdWVzKHJhbmdlPzogc3RyaW5nIHwgbnVsbCk6IFByb21pc2U8YW55W11bXSB8IHVuZGVmaW5lZD4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLl9nZXRfdmFsdWVzKHJhbmdlKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhLnZhbHVlcyA/PyB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSByb3cgZm9yIGEgc3BlY2lmaWMgcGF0cm9sbGVyLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRyb2xsZXJfbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwYXRyb2xsZXIuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVfY29sdW1uIC0gVGhlIGNvbHVtbiB3aGVyZSB0aGUgcGF0cm9sbGVyJ3MgbmFtZSBpcyBsb2NhdGVkLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbH0gW3JhbmdlXSAtIFRoZSByYW5nZSB0byBzZWFyY2ggd2l0aGluLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHsgcm93OiBhbnlbXTsgaW5kZXg6IG51bWJlcjsgfSB8IG51bGw+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgcm93IGFuZCBpbmRleCBvZiB0aGUgcGF0cm9sbGVyLCBvciBudWxsIGlmIG5vdCBmb3VuZC5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfc2hlZXRfcm93X2Zvcl9wYXRyb2xsZXIoXG4gICAgICAgIHBhdHJvbGxlcl9uYW1lOiBzdHJpbmcsXG4gICAgICAgIG5hbWVfY29sdW1uOiBzdHJpbmcsXG4gICAgICAgIHJhbmdlPzogc3RyaW5nIHwgbnVsbFxuICAgICk6IFByb21pc2U8eyByb3c6IGFueVtdOyBpbmRleDogbnVtYmVyOyB9IHwgbnVsbD4ge1xuICAgICAgICBjb25zdCByb3dzID0gYXdhaXQgdGhpcy5nZXRfdmFsdWVzKHJhbmdlKTtcbiAgICAgICAgaWYgKHJvd3MpIHtcbiAgICAgICAgICAgIGNvbnN0IGxvb2t1cF9pbmRleCA9IGV4Y2VsX3Jvd190b19pbmRleChuYW1lX2NvbHVtbik7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAocm93c1tpXVtsb29rdXBfaW5kZXhdID09PSBwYXRyb2xsZXJfbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyByb3c6IHJvd3NbaV0sIGluZGV4OiBpIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICBgQ291bGRuJ3QgZmluZCBwYXRyb2xsZXIgJHtwYXRyb2xsZXJfbmFtZX0gaW4gc2hlZXQgJHt0aGlzLnNoZWV0X25hbWV9LmBcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHZhbHVlcyBpbiB0aGUgc2hlZXQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJhbmdlIC0gVGhlIHJhbmdlIHRvIHVwZGF0ZS5cbiAgICAgKiBAcGFyYW0ge2FueVtdW119IHZhbHVlcyAtIFRoZSB2YWx1ZXMgdG8gdXBkYXRlLlxuICAgICAqL1xuICAgIGFzeW5jIHVwZGF0ZV92YWx1ZXMocmFuZ2U6IHN0cmluZywgdmFsdWVzOiBhbnlbXVtdKSB7XG4gICAgICAgIGNvbnN0IHVwZGF0ZU1lID0gKGF3YWl0IHRoaXMuX2dldF92YWx1ZXMocmFuZ2UsIG51bGwpKS5kYXRhO1xuXG4gICAgICAgIHVwZGF0ZU1lLnZhbHVlcyA9IHZhbHVlcztcbiAgICAgICAgYXdhaXQgdGhpcy5zaGVldHNfc2VydmljZSEuc3ByZWFkc2hlZXRzLnZhbHVlcy51cGRhdGUoe1xuICAgICAgICAgICAgc3ByZWFkc2hlZXRJZDogdGhpcy5zaGVldF9pZCxcbiAgICAgICAgICAgIHZhbHVlSW5wdXRPcHRpb246IFwiVVNFUl9FTlRFUkVEXCIsXG4gICAgICAgICAgICByYW5nZTogdXBkYXRlTWUucmFuZ2UhLFxuICAgICAgICAgICAgcmVxdWVzdEJvZHk6IHVwZGF0ZU1lLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdmFsdWVzIGZyb20gdGhlIHNoZWV0IChwcml2YXRlIG1ldGhvZCkuXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCBudWxsfSBbcmFuZ2VdIC0gVGhlIHJhbmdlIHRvIGdldCB2YWx1ZXMgZnJvbS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bGx9IFt2YWx1ZVJlbmRlck9wdGlvbl0gLSBUaGUgdmFsdWUgcmVuZGVyIG9wdGlvbi5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnlbXVtdPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIHZhbHVlIHJhbmdlLlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcHJpdmF0ZSBhc3luYyBfZ2V0X3ZhbHVlcyhcbiAgICAgICAgcmFuZ2U/OiBzdHJpbmcgfCBudWxsLFxuICAgICAgICB2YWx1ZVJlbmRlck9wdGlvbjogc3RyaW5nIHwgbnVsbCA9IFwiVU5GT1JNQVRURURfVkFMVUVcIlxuICAgICkge1xuICAgICAgICBsZXQgbG9va3VwUmFuZ2UgPSB0aGlzLnNoZWV0X25hbWU7XG4gICAgICAgIGlmIChyYW5nZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBsb29rdXBSYW5nZSA9IGxvb2t1cFJhbmdlICsgXCIhXCI7XG5cbiAgICAgICAgICAgIGlmIChyYW5nZS5zdGFydHNXaXRoKGxvb2t1cFJhbmdlKSkge1xuICAgICAgICAgICAgICAgIHJhbmdlID0gcmFuZ2Uuc3Vic3RyaW5nKGxvb2t1cFJhbmdlLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb29rdXBSYW5nZSA9IGxvb2t1cFJhbmdlICsgcmFuZ2U7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG9wdHM6IHNoZWV0c192NC5QYXJhbXMkUmVzb3VyY2UkU3ByZWFkc2hlZXRzJFZhbHVlcyRHZXQgPSB7XG4gICAgICAgICAgICBzcHJlYWRzaGVldElkOiB0aGlzLnNoZWV0X2lkLFxuICAgICAgICAgICAgcmFuZ2U6IGxvb2t1cFJhbmdlLFxuICAgICAgICB9O1xuICAgICAgICBpZiAodmFsdWVSZW5kZXJPcHRpb24pIHtcbiAgICAgICAgICAgIG9wdHMudmFsdWVSZW5kZXJPcHRpb24gPSB2YWx1ZVJlbmRlck9wdGlvbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5zaGVldHNfc2VydmljZSEuc3ByZWFkc2hlZXRzLnZhbHVlcy5nZXQob3B0cyk7XG4gICAgfVxufVxuIiwiXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRfcGFzc2VzX3N0cmluZyhcbiAgICB1c2VkOiBudW1iZXIsXG4gICAgdG90YWw6IG51bWJlcixcbiAgICB0b2RheTogbnVtYmVyLFxuICAgIGZvcmNlX3RvZGF5OiBib29sZWFuID0gZmFsc2Vcbikge1xuICAgIGxldCBtZXNzYWdlID0gYFlvdSBoYXZlIHVzZWQgJHt1c2VkfSBvZiAke3RvdGFsfSBndWVzdCBwYXNzZXMgdGhpcyBzZWFzb25gO1xuICAgIGlmIChmb3JjZV90b2RheSB8fCB0b2RheSA+IDApIHtcbiAgICAgICAgbWVzc2FnZSArPSBgICgke3RvZGF5fSB1c2VkIHRvZGF5KWA7XG4gICAgfVxuICAgIG1lc3NhZ2UgKz0gXCIuXCI7XG4gICAgcmV0dXJuIG1lc3NhZ2U7XG59XG4iLCIvKipcbiAqIFZhbGlkYXRlcyBpZiB0aGUgcHJvdmlkZWQgc2NvcGVzIGluY2x1ZGUgYWxsIGRlc2lyZWQgc2NvcGVzLlxuICogQHBhcmFtIHtzdHJpbmdbXX0gc2NvcGVzIC0gVGhlIGxpc3Qgb2Ygc2NvcGVzIHRvIHZhbGlkYXRlLlxuICogQHBhcmFtIHtzdHJpbmdbXX0gZGVzaXJlZF9zY29wZXMgLSBUaGUgbGlzdCBvZiBkZXNpcmVkIHNjb3Blcy5cbiAqIEB0aHJvd3Mge0Vycm9yfSBUaHJvd3MgYW4gZXJyb3IgaWYgYW55IGRlc2lyZWQgc2NvcGUgaXMgbWlzc2luZy5cbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVfc2NvcGVzKHNjb3Blczogc3RyaW5nW10sIGRlc2lyZWRfc2NvcGVzOiBzdHJpbmdbXSkge1xuICAgIGZvciAoY29uc3QgZGVzaXJlZF9zY29wZSBvZiBkZXNpcmVkX3Njb3Blcykge1xuICAgICAgICBpZiAoc2NvcGVzID09PSB1bmRlZmluZWQgfHwgIXNjb3Blcy5pbmNsdWRlcyhkZXNpcmVkX3Njb3BlKSkge1xuICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBgTWlzc2luZyBzY29wZSAke2Rlc2lyZWRfc2NvcGV9IGluIHJlY2VpdmVkIHNjb3BlczogJHtzY29wZXN9YDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQge3ZhbGlkYXRlX3Njb3Blc30iLCJpbXBvcnQgeyBTZWN0aW9uQ29uZmlnIH0gZnJvbSAnLi4vZW52L2hhbmRsZXJfY29uZmlnJztcblxuLyoqXG4gICAgKiBDbGFzcyBmb3Igc2VjdGlvbiB2YWx1ZXMuXG4gICAgKi9cbmNsYXNzIFNlY3Rpb25WYWx1ZXMge1xuICAgIHNlY3Rpb25fY29uZmlnOiBTZWN0aW9uQ29uZmlnXG4gICAgc2VjdGlvbnM6IHN0cmluZ1tdO1xuICAgIGxvd2VyY2FzZV9zZWN0aW9uczogc3RyaW5nW107XG5cbiAgICBjb25zdHJ1Y3RvcihzZWN0aW9uX2NvbmZpZzogU2VjdGlvbkNvbmZpZykge1xuICAgICAgICB0aGlzLnNlY3Rpb25fY29uZmlnID0gc2VjdGlvbl9jb25maWc7XG4gICAgICAgIHRoaXMuc2VjdGlvbnMgPSBzZWN0aW9uX2NvbmZpZy5TRUNUSU9OX1ZBTFVFUy5zcGxpdCgnLCcpO1xuICAgICAgICB0aGlzLmxvd2VyY2FzZV9zZWN0aW9ucyA9IHNlY3Rpb25fY29uZmlnLlNFQ1RJT05fVkFMVUVTLnRvTG93ZXJDYXNlKCkuc3BsaXQoJywnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBzZWN0aW9uIGRlc2NyaXB0aW9uLlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBzZWN0aW9uIGRlc2NyaXB0aW9uLlxuICAgICovXG4gICAgZ2V0X3NlY3Rpb25fZGVzY3JpcHRpb24oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VjdGlvbl9jb25maWcuU0VDVElPTl9WQUxVRVM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBQYXJzZXMgYSBzZWN0aW9uLlxuICAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHkgLSBUaGUgYm9keSBvZiB0aGUgcmVxdWVzdC5cbiAgICAqIEByZXR1cm5zIHtzdHJpbmcgfCBudWxsfSBUaGUgc2VjdGlvbiBpZiBpdCBpcyBhIHZhbGlkIHNlY3Rpb24gb3IgbnVsbC5cbiAgICAqL1xuICAgIHBhcnNlX3NlY3Rpb24oYm9keTogc3RyaW5nIHwgbnVsbCk6IHN0cmluZyB8IG51bGwge1xuICAgICAgICBpZiAoYm9keSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgIHJldHVybiB0aGlzLmxvd2VyY2FzZV9zZWN0aW9ucy5pbmNsdWRlcyhib2R5LnRvTG93ZXJDYXNlKCkpID8gYm9keSA6IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBNYXBzIGEgbG93ZXIgY2FzZSB2ZXJzaW9uIG9mIGEgc2VjdGlvbiBzdHJpbmcgdG8gdGhlIG9yaWdpbmFsIGNhc2UgdmFsdWUuXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gc2VjdGlvbiAtIFRoZSBsb3dlciBjYXNlIHNlY3Rpb24gc3RyaW5nLlxuICAgICogQHJldHVybnMge3N0cmluZyB9IFRoZSBvcmlnaW5hbCBjYXNlIHZhbHVlIGlmIGZvdW5kLCBvdGhlcndpc2UgbnVsbC5cbiAgICAqL1xuICAgbWFwX3NlY3Rpb24oc2VjdGlvbjogc3RyaW5nIHwgbnVsbCk6IHN0cmluZyAge1xuICAgICAgIGlmIChzZWN0aW9uID09PSBudWxsKSB7XG4gICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgIH1cbiAgICAgICBjb25zdCBpbmRleCA9IHRoaXMubG93ZXJjYXNlX3NlY3Rpb25zLmluZGV4T2Yoc2VjdGlvbi50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgIHJldHVybiB0aGlzLnNlY3Rpb25zW2luZGV4XTtcbiAgICAgICB9XG4gICAgICAgcmV0dXJuIFwiXCI7XG4gICB9XG5cbn1cblxuZXhwb3J0IHsgU2VjdGlvblZhbHVlcyB9OyIsIi8qKlxuICogQ29udmVydCByb3cgYW5kIGNvbHVtbiBudW1iZXJzIHRvIGFuIEV4Y2VsLWxpa2UgaW5kZXguXG4gKiBAcGFyYW0ge251bWJlcn0gcm93IC0gVGhlIHJvdyBudW1iZXIgKDAtYmFzZWQpLlxuICogQHBhcmFtIHtudW1iZXJ9IGNvbCAtIFRoZSBjb2x1bW4gbnVtYmVyICgwLWJhc2VkKS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBFeGNlbC1saWtlIGluZGV4IChlLmcuLCBcIkExXCIpLlxuICovXG5mdW5jdGlvbiByb3dfY29sX3RvX2V4Y2VsX2luZGV4KHJvdzogbnVtYmVyLCBjb2w6IG51bWJlcik6IHN0cmluZyB7XG4gICAgbGV0IGNvbFN0cmluZyA9IFwiXCI7XG4gICAgY29sICs9IDE7XG4gICAgd2hpbGUgKGNvbCA+IDApIHtcbiAgICAgICAgY29sIC09IDE7XG4gICAgICAgIGNvbnN0IG1vZHVsbyA9IGNvbCAlIDI2O1xuICAgICAgICBjb25zdCBjb2xMZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKCdBJy5jaGFyQ29kZUF0KDApICsgbW9kdWxvKTtcbiAgICAgICAgY29sU3RyaW5nID0gY29sTGV0dGVyICsgY29sU3RyaW5nO1xuICAgICAgICBjb2wgPSBNYXRoLmZsb29yKGNvbCAvIDI2KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbFN0cmluZyArIChyb3cgKyAxKS50b1N0cmluZygpO1xufVxuXG4vKipcbiAqIFNwbGl0IGFuIEV4Y2VsLWxpa2UgaW5kZXggaW50byByb3cgYW5kIGNvbHVtbiBudW1iZXJzLlxuICogQHBhcmFtIHtzdHJpbmd9IGV4Y2VsX2luZGV4IC0gVGhlIEV4Y2VsLWxpa2UgaW5kZXggKGUuZy4sIFwiQTFcIikuXG4gKiBAcmV0dXJucyB7W251bWJlciwgbnVtYmVyXX0gQW4gYXJyYXkgY29udGFpbmluZyB0aGUgcm93IGFuZCBjb2x1bW4gbnVtYmVycyAoMC1iYXNlZCkuXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIGluZGV4IGNhbm5vdCBiZSBwYXJzZWQuXG4gKi9cbmZ1bmN0aW9uIHNwbGl0X3RvX3Jvd19jb2woZXhjZWxfaW5kZXg6IHN0cmluZyk6IFtudW1iZXIsIG51bWJlcl0ge1xuICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cChcIl4oW0EtWmEtel0rKShbMC05XSspJFwiKTtcbiAgICBjb25zdCBtYXRjaCA9IHJlZ2V4LmV4ZWMoZXhjZWxfaW5kZXgpO1xuICAgIGlmIChtYXRjaCA9PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBwYXJzZSBzdHJpbmcgZm9yIGV4Y2VsIHBvc2l0aW9uIHNwbGl0XCIpO1xuICAgIH1cbiAgICBjb25zdCBjb2wgPSBleGNlbF9yb3dfdG9faW5kZXgobWF0Y2hbMV0pO1xuICAgIGNvbnN0IHJhd19yb3cgPSBOdW1iZXIobWF0Y2hbMl0pO1xuICAgIGlmIChyYXdfcm93IDwgMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJSb3cgbXVzdCBiZSA+PTFcIik7XG4gICAgfVxuICAgIHJldHVybiBbcmF3X3JvdyAtIDEsIGNvbF07XG59XG5cbi8qKlxuICogTG9vayB1cCBhIHZhbHVlIGluIGEgc2hlZXQgYnkgaXRzIEV4Y2VsLWxpa2UgaW5kZXguXG4gKiBAcGFyYW0ge3N0cmluZ30gZXhjZWxfaW5kZXggLSBUaGUgRXhjZWwtbGlrZSBpbmRleCAoZS5nLiwgXCJBMVwiKS5cbiAqIEBwYXJhbSB7YW55W11bXX0gc2hlZXQgLSBUaGUgc2hlZXQgZGF0YS5cbiAqIEByZXR1cm5zIHthbnl9IFRoZSB2YWx1ZSBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LCBvciB1bmRlZmluZWQgaWYgbm90IGZvdW5kLlxuICovXG5mdW5jdGlvbiBsb29rdXBfcm93X2NvbF9pbl9zaGVldChleGNlbF9pbmRleDogc3RyaW5nLCBzaGVldDogYW55W11bXSk6IGFueSB7XG4gICAgY29uc3QgW3JvdywgY29sXSA9IHNwbGl0X3RvX3Jvd19jb2woZXhjZWxfaW5kZXgpO1xuICAgIGlmIChyb3cgPj0gc2hlZXQubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiBzaGVldFtyb3ddW2NvbF07XG59XG5cbi8qKlxuICogQ29udmVydCBFeGNlbC1saWtlIGNvbHVtbiBsZXR0ZXJzIHRvIGEgY29sdW1uIG51bWJlci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBsZXR0ZXJzIC0gVGhlIGNvbHVtbiBsZXR0ZXJzIChlLmcuLCBcIkFcIikuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgY29sdW1uIG51bWJlciAoMC1iYXNlZCkuXG4gKi9cbmZ1bmN0aW9uIGV4Y2VsX3Jvd190b19pbmRleChsZXR0ZXJzOiBzdHJpbmcpOiBudW1iZXIge1xuICAgIGNvbnN0IGxvd2VyTGV0dGVycyA9IGxldHRlcnMudG9Mb3dlckNhc2UoKTtcbiAgICBsZXQgcmVzdWx0OiBudW1iZXIgPSAwO1xuICAgIGZvciAobGV0IHAgPSAwOyBwIDwgbG93ZXJMZXR0ZXJzLmxlbmd0aDsgcCsrKSB7XG4gICAgICAgIGNvbnN0IGNoYXJhY3RlclZhbHVlID1cbiAgICAgICAgICAgIGxvd2VyTGV0dGVycy5jaGFyQ29kZUF0KHApIC0gXCJhXCIuY2hhckNvZGVBdCgwKSArIDE7XG4gICAgICAgIHJlc3VsdCA9IGNoYXJhY3RlclZhbHVlICsgcmVzdWx0ICogMjY7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQgLSAxO1xufVxuXG4vKipcbiAqIFBhcnNlIGEgR29vZ2xlIFNoZWV0cyBjaGVja2JveC9ib29sZWFuIGNlbGwgdmFsdWUgYXMgYSBib29sZWFuLlxuICogQWNjZXB0cyBKUyBib29sZWFuIHRydWUvZmFsc2UgYW5kIHN0cmluZyBsaXRlcmFscyBcIlRSVUVcIi9cIkZBTFNFXCJcbiAqIChjYXNlLWluc2Vuc2l0aXZlKSBmcm9tIFNoZWV0cywgIGRlcGVuZGluZyBvbiB0aGUgY2VsbCBmb3JtYXR0aW5nLlxuICogQW55IHZhbHVlIHRoYXQgY2Fubm90IGJlIHJlY29nbml6ZWQgYXMgdHJ1ZSBpcyBjb25zaWRlcmVkIGZhbHNlLlxuICogQHBhcmFtIHthbnl9IHZhbHVlIC0gUmF3IGNlbGwgdmFsdWUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZSBvbmx5IHdoZW4gdmFsdWUgaXMgdHJ1ZSBvciBcIlRSVUVcIiAoY2FzZS1pbnNlbnNpdGl2ZSkuXG4gKi9cbmZ1bmN0aW9uIHBhcnNlX2Jvb2xlYW5fY2VsbCh2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgaWYgKHZhbHVlID09PSB0cnVlKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIHZhbHVlLnRvVXBwZXJDYXNlKCkgPT09IFwiVFJVRVwiO1xufVxuXG4vKipcbiAqIFNhbml0aXplIGEgcGhvbmUgbnVtYmVyIGJ5IHJlbW92aW5nIHVud2FudGVkIGNoYXJhY3RlcnMuXG4gKiBAcGFyYW0ge251bWJlciB8IHN0cmluZ30gbnVtYmVyIC0gVGhlIHBob25lIG51bWJlciB0byBzYW5pdGl6ZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBzYW5pdGl6ZWQgcGhvbmUgbnVtYmVyLlxuICovXG5mdW5jdGlvbiBzYW5pdGl6ZV9waG9uZV9udW1iZXIobnVtYmVyOiBudW1iZXIgfCBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGxldCBuZXdfbnVtYmVyID0gbnVtYmVyLnRvU3RyaW5nKCk7XG4gICAgbmV3X251bWJlciA9IG5ld19udW1iZXIucmVwbGFjZShcIndoYXRzYXBwOlwiLCBcIlwiKTtcbiAgICBsZXQgdGVtcG9yYXJ5X25ld19udW1iZXI6IHN0cmluZyA9IFwiXCI7XG4gICAgd2hpbGUgKHRlbXBvcmFyeV9uZXdfbnVtYmVyICE9IG5ld19udW1iZXIpIHtcbiAgICAgICAgLy8gRG8gdGhpcyBtdWx0aXBsZSB0aW1lcyBzbyB3ZSBnZXQgYWxsICsxIGF0IHRoZSBzdGFydCBvZiB0aGUgc3RyaW5nLCBldmVuIGFmdGVyIHN0cmlwcGluZy5cbiAgICAgICAgdGVtcG9yYXJ5X25ld19udW1iZXIgPSBuZXdfbnVtYmVyO1xuICAgICAgICBuZXdfbnVtYmVyID0gbmV3X251bWJlci5yZXBsYWNlKC8oXlxcKzF8XFwofFxcKXxcXC58LSkvZywgXCJcIik7XG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdCA9IFN0cmluZyhwYXJzZUludChuZXdfbnVtYmVyKSkucGFkU3RhcnQoMTAsIFwiMFwiKTtcbiAgICBpZiAocmVzdWx0Lmxlbmd0aCA9PSAxMSAmJiByZXN1bHRbMF0gPT0gXCIxXCIpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5zdWJzdHJpbmcoMSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRm9ybWF0cyBhIDEwLWRpZ2l0IHBob25lIG51bWJlciBzdHJpbmcgYXMgKFhYWClYWFgtWFhYWCBmb3IgZGlzcGxheS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZW5fZGlnaXRzIC0gQSAxMC1kaWdpdCBwaG9uZSBudW1iZXIgc3RyaW5nIChlLmcuIFwiMTIzNDU2Nzg5MFwiKS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgcGhvbmUgbnVtYmVyIChlLmcuIFwiKDEyMyk0NTYtNzg5MFwiKS5cbiAqL1xuZnVuY3Rpb24gZm9ybWF0X3Bob25lX2Zvcl9kaXNwbGF5KHRlbl9kaWdpdHM6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAoJHt0ZW5fZGlnaXRzLnN1YnN0cmluZygwLCAzKX0pJHt0ZW5fZGlnaXRzLnN1YnN0cmluZygzLCA2KX0tJHt0ZW5fZGlnaXRzLnN1YnN0cmluZyg2LCAxMCl9YDtcbn1cblxuZXhwb3J0IHtcbiAgICByb3dfY29sX3RvX2V4Y2VsX2luZGV4LFxuICAgIGV4Y2VsX3Jvd190b19pbmRleCxcbiAgICBzYW5pdGl6ZV9waG9uZV9udW1iZXIsXG4gICAgc3BsaXRfdG9fcm93X2NvbCxcbiAgICBsb29rdXBfcm93X2NvbF9pbl9zaGVldCxcbiAgICBwYXJzZV9ib29sZWFuX2NlbGwsXG4gICAgZm9ybWF0X3Bob25lX2Zvcl9kaXNwbGF5XG59OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImdvb2dsZWFwaXNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic21zLXNlZ21lbnRzLWNhbGN1bGF0b3JcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxuY29uc3QgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRjb25zdCBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0Y29uc3QgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdGNvbnN0IGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHRjb25zdCBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlci92YWx1ZSBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKTsiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlc1wiO1xuaW1wb3J0IHtcbiAgICBDb250ZXh0LFxuICAgIFNlcnZlcmxlc3NDYWxsYmFjayxcbiAgICBTZXJ2ZXJsZXNzRXZlbnRPYmplY3QsXG4gICAgU2VydmVybGVzc0Z1bmN0aW9uU2lnbmF0dXJlLFxufSBmcm9tIFwiQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlcy90eXBlc1wiO1xuaW1wb3J0IEJWTlNQSGFuZGxlciwgeyBCVk5TUEV2ZW50IH0gZnJvbSBcIi4vYnZuc3BfaGFuZGxlclwiO1xuaW1wb3J0IHsgSGFuZGxlckVudmlyb25tZW50IH0gZnJvbSBcIi4uL2Vudi9oYW5kbGVyX2NvbmZpZ1wiO1xuXG5jb25zdCBORVhUX1NURVBfQ09PS0lFX05BTUUgPSBcImJ2bnNwX25leHRfc3RlcFwiO1xuXG4vKipcbiAqIFR3aWxpbyBTZXJ2ZXJsZXNzIGZ1bmN0aW9uIGhhbmRsZXIgZm9yIEJWTlNQIGJvdCBjb21tYW5kcy5cbiAqIEBwYXJhbSB7Q29udGV4dDxIYW5kbGVyRW52aXJvbm1lbnQ+fSBjb250ZXh0IC0gVGhlIFR3aWxpbyBzZXJ2ZXJsZXNzIGNvbnRleHQuXG4gKiBAcGFyYW0ge1NlcnZlcmxlc3NFdmVudE9iamVjdDxCVk5TUEV2ZW50Pn0gZXZlbnQgLSBUaGUgZXZlbnQgb2JqZWN0LlxuICogQHBhcmFtIHtTZXJ2ZXJsZXNzQ2FsbGJhY2t9IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgY29uc3QgaGFuZGxlcjogU2VydmVybGVzc0Z1bmN0aW9uU2lnbmF0dXJlPFxuICAgIEhhbmRsZXJFbnZpcm9ubWVudCxcbiAgICBCVk5TUEV2ZW50XG4+ID0gYXN5bmMgZnVuY3Rpb24gKFxuICAgIGNvbnRleHQ6IENvbnRleHQ8SGFuZGxlckVudmlyb25tZW50PixcbiAgICBldmVudDogU2VydmVybGVzc0V2ZW50T2JqZWN0PEJWTlNQRXZlbnQ+LFxuICAgIGNhbGxiYWNrOiBTZXJ2ZXJsZXNzQ2FsbGJhY2tcbikge1xuICAgIGNvbnN0IGhhbmRsZXIgPSBuZXcgQlZOU1BIYW5kbGVyKGNvbnRleHQsIGV2ZW50KTtcbiAgICBsZXQgbWVzc2FnZTogc3RyaW5nO1xuICAgIGxldCBuZXh0X3N0ZXA6IHN0cmluZyA9IFwiXCI7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgaGFuZGxlcl9yZXNwb25zZSA9IGF3YWl0IGhhbmRsZXIuaGFuZGxlKCk7XG4gICAgICAgIG1lc3NhZ2UgPVxuICAgICAgICAgICAgaGFuZGxlcl9yZXNwb25zZS5yZXNwb25zZSB8fFxuICAgICAgICAgICAgXCJVbmV4cGVjdGVkIHJlc3VsdCAtIG5vIHJlc3BvbnNlIGRldGVybWluZWRcIjtcbiAgICAgICAgbmV4dF9zdGVwID0gaGFuZGxlcl9yZXNwb25zZS5uZXh0X3N0ZXAgfHwgXCJcIjtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQW4gZXJyb3Igb2NjdXJlZFwiKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGUpKTtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgfVxuICAgICAgICBtZXNzYWdlID0gXCJBbiB1bmV4cGVjdGVkIGVycm9yIG9jY3VyZWQuXCI7XG4gICAgICAgIGlmIChlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIG1lc3NhZ2UgKz0gXCJcXG5cIiArIGUubWVzc2FnZTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3JcIiwgZS5zdGFjayk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yXCIsIGUubmFtZSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yXCIsIGUubWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCByZXNwb25zZSA9IG5ldyBUd2lsaW8uUmVzcG9uc2UoKTtcbiAgICBjb25zdCB0d2ltbCA9IG5ldyBUd2lsaW8udHdpbWwuTWVzc2FnaW5nUmVzcG9uc2UoKTtcblxuICAgIHR3aW1sLm1lc3NhZ2UobWVzc2FnZSk7XG5cbiAgICByZXNwb25zZVxuICAgICAgICAvLyBBZGQgdGhlIHN0cmluZ2lmaWVkIFR3aU1MIHRvIHRoZSByZXNwb25zZSBib2R5XG4gICAgICAgIC5zZXRCb2R5KHR3aW1sLnRvU3RyaW5nKCkpXG4gICAgICAgIC8vIFNpbmNlIHdlJ3JlIHJldHVybmluZyBUd2lNTCwgdGhlIGNvbnRlbnQgdHlwZSBtdXN0IGJlIFhNTFxuICAgICAgICAuYXBwZW5kSGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwidGV4dC94bWxcIilcbiAgICAgICAgLnNldENvb2tpZShORVhUX1NURVBfQ09PS0lFX05BTUUsIG5leHRfc3RlcCk7XG5cbiAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgcmVzcG9uc2UpO1xufTsiXSwibmFtZXMiOlsiQ2hlY2tpblZhbHVlIiwidXNlcl9jcmVkc19jb25maWciLCJOU1BfRU1BSUxfRE9NQUlOIiwiZmluZF9wYXRyb2xsZXJfY29uZmlnIiwiU0hFRVRfSUQiLCJQSE9ORV9OVU1CRVJfTE9PS1VQX1NIRUVUIiwiUEhPTkVfTlVNQkVSX05BTUVfQ09MVU1OIiwiUEhPTkVfTlVNQkVSX05VTUJFUl9DT0xVTU4iLCJsb2dpbl9zaGVldF9jb25maWciLCJMT0dJTl9TSEVFVF9MT09LVVAiLCJDSEVDS0lOX0NPVU5UX0xPT0tVUCIsIlNIRUVUX0RBVEVfQ0VMTCIsIkNVUlJFTlRfREFURV9DRUxMIiwiQVJDSElWRURfQ0VMTCIsIk5BTUVfQ09MVU1OIiwiQ0FURUdPUllfQ09MVU1OIiwiU0VDVElPTl9EUk9QRE9XTl9DT0xVTU4iLCJDSEVDS0lOX0RST1BET1dOX0NPTFVNTiIsInNlYXNvbl9zaGVldF9jb25maWciLCJTRUFTT05fU0hFRVQiLCJTRUFTT05fU0hFRVRfTkFNRV9DT0xVTU4iLCJTRUFTT05fU0hFRVRfREFZU19DT0xVTU4iLCJzZWN0aW9uX2NvbmZpZyIsIlNFQ1RJT05fVkFMVUVTIiwiZ3Vlc3RfcGFzc2VzX2NvbmZpZyIsIkdVRVNUX1BBU1NfU0hFRVQiLCJHVUVTVF9QQVNTX0VMSUdJQkxFX0NPTFVNTiIsIkdVRVNUX1BBU1NfRUxJR0lCTEVfUkVBU09OX0NPTFVNTiIsIkdVRVNUX1BBU1NfU0hFRVRfTkFNRV9DT0xVTU4iLCJHVUVTVF9QQVNTX1NIRUVUX0FWQUlMQUJMRV9DT0xVTU4iLCJHVUVTVF9QQVNTX1NIRUVUX1VTRURfVE9EQVlfQ09MVU1OIiwiR1VFU1RfUEFTU19TSEVFVF9VU0VEX1NFQVNPTl9DT0xVTU4iLCJHVUVTVF9QQVNTX1NIRUVUX0RBVEVTX1NUQVJUSU5HX0NPTFVNTiIsInNsZWRfYmVhY29uX3NoZWV0X2NvbmZpZyIsIlNMRURfQkVBQ09OX1NIRUVUIiwiU0xFRF9CRUFDT05fU0hFRVRfTkFNRV9DT0xVTU4iLCJCRUFDT05fU0VBUkNIX0NPVU5UX0NPTFVNTiIsIkJFQUNPTl9GSU5EX0RBVEVTX1NUQVJUSU5HX0NPTFVNTiIsImhhbmRsZXJfY29uZmlnIiwiU0NSSVBUX0lEIiwiU1lOQ19TSUQiLCJBUkNISVZFX0ZVTkNUSU9OX05BTUUiLCJSRVNFVF9GVU5DVElPTl9OQU1FIiwiVVNFX1NFUlZJQ0VfQUNDT1VOVCIsIkFDVElPTl9MT0dfU0hFRVQiLCJDSEVDS0lOX1ZBTFVFUyIsIkNPTkZJRyIsImdvb2dsZSIsIkxvZ2luU2hlZXQiLCJTZWFzb25TaGVldCIsIlVzZXJDcmVkcyIsIkNoZWNraW5WYWx1ZXMiLCJnZXRfc2VydmljZV9jcmVkZW50aWFsc19wYXRoIiwiZXhjZWxfcm93X3RvX2luZGV4IiwiZm9ybWF0X3Bob25lX2Zvcl9kaXNwbGF5Iiwic2FuaXRpemVfcGhvbmVfbnVtYmVyIiwiYnVpbGRfcGFzc2VzX3N0cmluZyIsIkd1ZXN0UGFzc1NoZWV0IiwiU2VjdGlvblZhbHVlcyIsIlNsZWRCZWFjb25DaGVja1NoZWV0IiwiTkVYVF9TVEVQUyIsIkFXQUlUX0NPTU1BTkQiLCJBV0FJVF9DSEVDS0lOIiwiQ09ORklSTV9SRVNFVCIsIkFVVEhfUkVTRVQiLCJBV0FJVF9TRUNUSU9OIiwiQVdBSVRfUEFTUyIsIkFXQUlUX01FU1NBR0UiLCJBV0FJVF9CUk9BRENBU1QiLCJBV0FJVF9CRUFDT04iLCJDT01NQU5EUyIsIk9OX0RVVFkiLCJTVEFUVVMiLCJDSEVDS0lOIiwiU0VDVElPTl9BU1NJR05NRU5UIiwiR1VFU1RfUEFTUyIsIldIQVRTQVBQIiwiTUVTU0FHRSIsIkJST0FEQ0FTVCIsIkJFQUNPTiIsIlNNU19NQVhfTEVOR1RIIiwiTUVTU0FHRV9QUkVGSVhfVEVNUExBVEUiLCJNRVNTQUdFX1BSRUZJWF9TVUZGSVgiLCJ2YWxpZGF0ZV9zbXNfbWVzc2FnZSIsImZ1bGxfbWVzc2FnZSIsIlNlZ21lbnRlZE1lc3NhZ2UiLCJyZXF1aXJlIiwic2VnbWVudGVkIiwibm9uX2dzbSIsImdldE5vbkdzbUNoYXJhY3RlcnMiLCJsZW5ndGgiLCJ2YWxpZCIsInJlYXNvbiIsIm5vbl9nc21fY2hhcmFjdGVycyIsIlNldCIsInNlZ21lbnRzQ291bnQiLCJzZWdtZW50c19jb3VudCIsIkJWTlNQSGFuZGxlciIsIlNDT1BFUyIsInNtc19yZXF1ZXN0IiwicmVzdWx0X21lc3NhZ2VzIiwiZnJvbSIsInRvIiwiYm9keSIsImJvZHlfcmF3IiwicGF0cm9sbGVyIiwiYnZuc3BfbmV4dF9zdGVwIiwiY2hlY2tpbl9tb2RlIiwiZmFzdF9jaGVja2luIiwiYXNzaWduZWRfc2VjdGlvbiIsInR3aWxpb19jbGllbnQiLCJzeW5jX3NpZCIsInJlc2V0X3NjcmlwdF9pZCIsInN5bmNfY2xpZW50IiwidXNlcl9jcmVkcyIsInNlcnZpY2VfY3JlZHMiLCJzaGVldHNfc2VydmljZSIsInVzZXJfc2NyaXB0c19zZXJ2aWNlIiwibG9naW5fc2hlZXQiLCJzZWFzb25fc2hlZXQiLCJndWVzdF9wYXNzX3NoZWV0Iiwic2xlZF9iZWFjb25fY2hlY2tfc2hlZXQiLCJjaGVja2luX3ZhbHVlcyIsImN1cnJlbnRfc2hlZXRfZGF0ZSIsImNvbWJpbmVkX2NvbmZpZyIsImNvbmZpZyIsInNlY3Rpb25fdmFsdWVzIiwiY29udGV4dCIsImV2ZW50IiwiRnJvbSIsIm51bWJlciIsInVuZGVmaW5lZCIsInRlc3RfbnVtYmVyIiwiVG8iLCJCb2R5IiwidG9Mb3dlckNhc2UiLCJ0cmltIiwicmVwbGFjZSIsInJlcXVlc3QiLCJjb29raWVzIiwiZ2V0VHdpbGlvQ2xpZW50IiwiZSIsImNvbnNvbGUiLCJsb2ciLCJEYXRlIiwicGFyc2VfZmFzdF9jaGVja2luX21vZGUiLCJwYXJzZWQiLCJwYXJzZV9mYXN0X2NoZWNraW4iLCJrZXkiLCJwYXJzZV9jaGVja2luIiwicGFyc2VfY2hlY2tpbl9mcm9tX25leHRfc3RlcCIsImxhc3Rfc2VnbWVudCIsInNwbGl0Iiwic2xpY2UiLCJieV9rZXkiLCJkZWxheSIsInNlY29uZHMiLCJvcHRpb25hbCIsIlByb21pc2UiLCJyZXMiLCJzZXRUaW1lb3V0Iiwic2VuZF9tZXNzYWdlIiwibWVzc2FnZSIsImdldF90d2lsaW9fY2xpZW50IiwibWVzc2FnZXMiLCJjcmVhdGUiLCJwdXNoIiwiaGFuZGxlIiwicmVzdWx0IiwiX2hhbmRsZSIsInJlc3BvbnNlIiwiam9pbiIsIm5leHRfc3RlcCIsImxvZ291dCIsImNoZWNrX3VzZXJfY3JlZHMiLCJnZXRfbWFwcGVkX3BhdHJvbGxlciIsImF3YWl0X3Jlc3BvbnNlIiwiaGFuZGxlX2F3YWl0X2NvbW1hbmQiLCJjaGVja2luIiwic3RhcnRzV2l0aCIsIm5hbWUiLCJyZXNldF9zaGVldF9mbG93Iiwic2VjdGlvbiIsInBhcnNlX3NlY3Rpb24iLCJhc3NpZ25fc2VjdGlvbiIsInByb21wdF9zZWN0aW9uX2Fzc2lnbm1lbnQiLCJzZW5kX3RleHRfbWVzc2FnZSIsInNlbmRfYnJvYWRjYXN0X21lc3NhZ2UiLCJiZWFjb25fc2VhcmNoX2xvY2F0aW9uIiwicGFyc2VfYmVhY29uX3NlYXJjaF9sb2NhdGlvbiIsInNldF9iZWFjb25fc2VhcmNoIiwicHJvbXB0X2JlYWNvbl9zZWFyY2giLCJwcm9tcHRfY29tbWFuZCIsInBhdHJvbGxlcl9uYW1lIiwiaW5jbHVkZXMiLCJnZXRfb25fZHV0eSIsImdldF9zdGF0dXMiLCJwcm9tcHRfY2hlY2tpbiIsInByb21wdF9ndWVzdF9wYXNzIiwicGFyc2VfZmFzdF9zZWN0aW9uX2Fzc2lnbm1lbnQiLCJwcm9tcHRfbWVzc2FnZSIsInByb21wdF9icm9hZGNhc3QiLCJ0eXBlcyIsIk9iamVjdCIsInZhbHVlcyIsIm1hcCIsIngiLCJzbXNfZGVzYyIsInNlZ21lbnRzIiwibGFzdFNlZ21lbnQiLCJwb3AiLCJmaXJzdFBhcnQiLCJtYXBfc2VjdGlvbiIsInNlY3Rpb25fZGVzY3JpcHRpb24iLCJnZXRfc2VjdGlvbl9kZXNjcmlwdGlvbiIsImdldF9tZXNzYWdlX3ByZWZpeCIsInNlbmRlcl9uYW1lIiwic2VuZGVyX3Bob25lIiwiZm9ybWF0dGVkX3Bob25lIiwiZ2V0X21heF9tZXNzYWdlX2xlbmd0aCIsImdldF9sb2dpbl9zaGVldCIsInJlY2lwaWVudHMiLCJnZXRfb25fZHV0eV9wYXRyb2xsZXJzIiwibWF4X2xlbmd0aCIsIm1lc3NhZ2VfdGV4dCIsInByZWZpeCIsInZhbGlkYXRpb24iLCJiYWRfY2hhcnMiLCJzaWduZWRfaW5fcGF0cm9sbGVycyIsInBob25lX21hcCIsImdldF9waG9uZV9udW1iZXJfbWFwIiwicmVjaXBpZW50X21hcCIsIm5vX3Bob25lX25hbWVzIiwicGhvbmUiLCJzZW50X2NvdW50IiwiY29weV9zZW50X3RvX3NlbmRlciIsImZhaWxlZF9uYW1lcyIsImRlbGl2ZXJfc21zX3RvX21hcCIsImxvZ19hY3Rpb24iLCJhbGxfZmFpbGVkIiwiZW50cmllcyIsIm5vcm1hbGl6ZWRfc2VuZGVyIiwic2VuZGVyX2luX21hcCIsInJlY2lwaWVudF9jb3VudCIsImtleXMiLCJnZXRfc2hlZXRzX3NlcnZpY2UiLCJvcHRzIiwic3ByZWFkc2hlZXRzIiwiZ2V0Iiwic3ByZWFkc2hlZXRJZCIsInJhbmdlIiwidmFsdWVSZW5kZXJPcHRpb24iLCJkYXRhIiwicm93IiwicmF3TnVtYmVyIiwiYXNzaWduZWRTZWN0aW9uIiwibWFwcGVkX3NlY3Rpb24iLCJyZWZyZXNoIiwic2hlZXQiLCJnZXRfc2xlZF9iZWFjb25fY2hlY2tfc2hlZXQiLCJwcmlvcl9zZWFyY2hlcyIsImdldF9iZWFjb25fc2VhcmNoZXMiLCJzZXRfYmVhY29uc19zZWFyY2hlcyIsInVwZGF0ZWQiLCJzdGF0dXMiLCJzZWFyY2hfY291bnQiLCJzaGVldF9kYXRlIiwidG9EYXRlU3RyaW5nIiwiY3VycmVudF9kYXRlIiwiaXNfY3VycmVudCIsImdldF9zdGF0dXNfc3RyaW5nIiwiZ3Vlc3RfcGFzc19wcm9taXNlIiwiZ2V0X2d1ZXN0X3Bhc3Nfc2hlZXQiLCJnZXRfYXZhaWxhYmxlX2FuZF91c2VkX3Bhc3NlcyIsInBhdHJvbGxlcl9zdGF0dXMiLCJjaGVja2luQ29sdW1uU2V0IiwiY2hlY2tlZE91dCIsImJ5X3NoZWV0X3N0cmluZyIsInRvU3RyaW5nIiwiY29tcGxldGVkUGF0cm9sRGF5cyIsImdldF9zZWFzb25fc2hlZXQiLCJnZXRfcGF0cm9sbGVkX2RheXMiLCJjb21wbGV0ZWRQYXRyb2xEYXlzU3RyaW5nIiwibG9naW5TaGVldERhdGUiLCJzdGF0dXNTdHJpbmciLCJ1c2VkVG9kYXlHdWVzdFBhc3NlcyIsInVzZWRfdG9kYXkiLCJ1c2VkU2Vhc29uR3Vlc3RQYXNzZXMiLCJ1c2VkX3NlYXNvbiIsImF2YWlsYWJsZUd1ZXN0UGFzc2VzIiwiYXZhaWxhYmxlIiwic2hlZXRfbmVlZHNfcmVzZXQiLCJFcnJvciIsIm5ld19jaGVja2luX3ZhbHVlIiwic2hlZXRzX3ZhbHVlIiwiZmFzdF9jaGVja2lucyIsInJlc2V0X3NoZWV0Iiwic2NyaXB0X3NlcnZpY2UiLCJnZXRfdXNlcl9zY3JpcHRzX3NlcnZpY2UiLCJzaG91bGRfcGVyZm9ybV9hcmNoaXZlIiwiYXJjaGl2ZWQiLCJzY3JpcHRzIiwicnVuIiwic2NyaXB0SWQiLCJyZXF1ZXN0Qm9keSIsImZ1bmN0aW9uIiwiZ2V0X3VzZXJfY3JlZHMiLCJsb2FkVG9rZW4iLCJhdXRoVXJsIiwiZ2V0QXV0aFVybCIsImNoZWNrZWRfb3V0X3NlY3Rpb24iLCJsYXN0X3NlY3Rpb25zIiwib25fZHV0eV9wYXRyb2xsZXJzIiwiYnlfc2VjdGlvbiIsImZpbHRlciIsInJlZHVjZSIsInByZXYiLCJjdXIiLCJzaG9ydF9jb2RlIiwicmVzdWx0cyIsImFsbF9rZXlzIiwib3JkZXJlZF9wcmltYXJ5X3NlY3Rpb25zIiwic29ydCIsImZpbHRlcmVkX2xhc3Rfc2VjdGlvbnMiLCJvcmRlcmVkX3NlY3Rpb25zIiwiY29uY2F0IiwicGF0cm9sbGVycyIsInkiLCJsb2NhbGVDb21wYXJlIiwicGF0cm9sbGVyX3N0cmluZyIsImRldGFpbHMiLCJ0b1VwcGVyQ2FzZSIsInIiLCJhY3Rpb25fbmFtZSIsImFwcGVuZCIsInZhbHVlSW5wdXRPcHRpb24iLCJkZWxldGVUb2tlbiIsImdldF9zeW5jX2NsaWVudCIsInN5bmMiLCJ2MSIsInNlcnZpY2VzIiwiZ2V0X3NlcnZpY2VfY3JlZHMiLCJhdXRoIiwiR29vZ2xlQXV0aCIsImtleUZpbGUiLCJzY29wZXMiLCJnZXRfdmFsaWRfY3JlZHMiLCJyZXF1aXJlX3VzZXJfY3JlZHMiLCJvYXV0aDJfY2xpZW50Iiwic2hlZXRzIiwidmVyc2lvbiIsInNjcmlwdCIsImZvcmNlIiwicGhvbmVfbG9va3VwIiwiZmluZF9wYXRyb2xsZXJfZnJvbV9udW1iZXIiLCJtYXBwZWRQYXRyb2xsZXIiLCJ0cnlfZmluZF9wYXRyb2xsZXIiLCJyYXdfbnVtYmVyIiwiY3VycmVudE51bWJlciIsImN1cnJlbnROYW1lIiwidXNlZF9hbmRfYXZhaWxhYmxlIiwiZ2V0X3Byb21wdCIsInNldF91c2VkX2d1ZXN0X3Bhc3NlcyIsInBhcnNlX2xvY2F0aW9uIiwicm93X2NvbF90b19leGNlbF9pbmRleCIsInBhcnNlX2Jvb2xlYW5fY2VsbCIsIkdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiIiwiZm9ybWF0X2RhdGVfZm9yX3NwcmVhZHNoZWV0X3ZhbHVlIiwiVXNlZEFuZEF2YWlsYWJsZVBhc3NlcyIsImluZGV4IiwiZWxpZ2libGUiLCJlbGlnaWJsZV9yZWFzb24iLCJTdHJpbmciLCJOdW1iZXIiLCJQYXNzU2hlZXQiLCJwYXRyb2xsZXJfcm93IiwiZ2V0X3NoZWV0X3Jvd19mb3JfcGF0cm9sbGVyIiwibmFtZV9jb2x1bW4iLCJlbGlnaWJsZV9jb2x1bW4iLCJlbGlnaWJsZV9yZWFzb25fY29sdW1uIiwiY3VycmVudF9kYXlfYXZhaWxhYmxlX3Bhc3NlcyIsImF2YWlsYWJsZV9jb2x1bW4iLCJjdXJyZW50X2RheV91c2VkX3Bhc3NlcyIsInVzZWRfdG9kYXlfY29sdW1uIiwiY3VycmVudF9zZWFzb25fdXNlZF9wYXNzZXMiLCJ1c2VkX3NlYXNvbl9jb2x1bW4iLCJyb3dudW0iLCJzdGFydF9pbmRleCIsInByaW9yX2xlbmd0aCIsImN1cnJlbnRfZGF0ZV9zdHJpbmciLCJuZXdfdmFscyIsInVwZGF0ZV9sZW5ndGgiLCJNYXRoIiwibWF4IiwiZW5kX2luZGV4Iiwic2hlZXRfbmFtZSIsInVwZGF0ZV92YWx1ZXMiLCJsb29rdXBfcm93X2NvbF9pbl9zaGVldCIsInNhbml0aXplX2RhdGUiLCJjaGVja2luX2NvdW50X3NoZWV0Iiwicm93cyIsImNoZWNraW5fY291bnQiLCJnZXRfdmFsdWVzIiwiaSIsInBhcnNlX3BhdHJvbGxlcl9yb3ciLCJnZXRUaW1lIiwiSlNPTiIsInN0cmluZ2lmeSIsInBhdHJvbGxlcl9zZWN0aW9uIiwibmV3X3NlY3Rpb25fdmFsdWUiLCJjYXRlZ29yeSIsImZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2N1cnJlbnRfZGF5IiwiY3VycmVudERheSIsIkJlYWNvblNlYXJjaGVzIiwiYmVhY29uX3NlYXJjaF9jb3VudF9jb2x1bW4iLCJnZXRfcGF0cm9sbGVkX2JlYWNvbl9maW5kX2NvdW50Iiwic2VhcmNoX2xvY2F0aW9uIiwicm93X251bSIsImNsZWFuU21zVmFsdWUiLCJpbnB1dCIsIm1heExlbmd0aCIsImNsZWFuZWQiLCJjaGFyYWN0ZXJzIiwiQXJyYXkiLCJsb2FkX2NyZWRlbnRpYWxzX2ZpbGVzIiwidmFsaWRhdGVfc2NvcGVzIiwiZG9tYWluIiwibG9hZGVkIiwiY3JlZGVudGlhbHMiLCJjbGllbnRfc2VjcmV0IiwiY2xpZW50X2lkIiwicmVkaXJlY3RfdXJpcyIsIndlYiIsIk9BdXRoMiIsInRva2VuX2tleSIsIm9hdXRoMkRvYyIsImRvY3VtZW50cyIsImZldGNoIiwidG9rZW4iLCJzZXRDcmVkZW50aWFscyIsInNpZCIsInJlbW92ZSIsImNvbXBsZXRlTG9naW4iLCJjb2RlIiwiZ2V0VG9rZW4iLCJ0b2tlbnMiLCJvYXV0aERvYyIsInVuaXF1ZU5hbWUiLCJ1cGRhdGUiLCJpZCIsImdlbmVyYXRlUmFuZG9tU3RyaW5nIiwiZG9jIiwidHRsIiwiYWNjZXNzX3R5cGUiLCJzY29wZSIsInN0YXRlIiwiZ2VuZXJhdGVBdXRoVXJsIiwiY2hhcmFjdGVyc0xlbmd0aCIsImNoYXJBdCIsImZsb29yIiwicmFuZG9tIiwibG9va3VwX3ZhbHVlcyIsInNtc19kZXNjX3NwbGl0IiwibG9va3VwX3ZhbHMiLCJieV9sdiIsImJ5X2ZjIiwiY2hlY2tpblZhbHVlcyIsImNoZWNraW5WYWx1ZSIsImx2IiwiZmMiLCJjaGVja2luX2xvd2VyIiwiZXhjZWxfZGF0ZV90b19qc19kYXRlIiwiZGF0ZSIsInNldFVUQ01pbGxpc2Vjb25kcyIsInJvdW5kIiwiY2hhbmdlX3RpbWV6b25lX3RvX3BzdCIsInRvVVRDU3RyaW5nIiwic3RyaXBfZGF0ZXRpbWVfdG9fZGF0ZSIsInRvTG9jYWxlRGF0ZVN0cmluZyIsInRpbWVab25lIiwicGFkU3RhcnQiLCJmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9kYXRlIiwibGlzdCIsImRhdGVzdHIiLCJlbmRzV2l0aCIsImZzIiwicGFyc2UiLCJyZWFkRmlsZVN5bmMiLCJSdW50aW1lIiwiZ2V0QXNzZXRzIiwicGF0aCIsInNoZWV0X2lkIiwiX2dldF92YWx1ZXMiLCJsb29rdXBfaW5kZXgiLCJ1cGRhdGVNZSIsImxvb2t1cFJhbmdlIiwic3Vic3RyaW5nIiwidXNlZCIsInRvdGFsIiwidG9kYXkiLCJmb3JjZV90b2RheSIsImRlc2lyZWRfc2NvcGVzIiwiZGVzaXJlZF9zY29wZSIsImVycm9yIiwic2VjdGlvbnMiLCJsb3dlcmNhc2Vfc2VjdGlvbnMiLCJpbmRleE9mIiwiY29sIiwiY29sU3RyaW5nIiwibW9kdWxvIiwiY29sTGV0dGVyIiwiZnJvbUNoYXJDb2RlIiwiY2hhckNvZGVBdCIsInNwbGl0X3RvX3Jvd19jb2wiLCJleGNlbF9pbmRleCIsInJlZ2V4IiwiUmVnRXhwIiwibWF0Y2giLCJleGVjIiwicmF3X3JvdyIsImxldHRlcnMiLCJsb3dlckxldHRlcnMiLCJwIiwiY2hhcmFjdGVyVmFsdWUiLCJ2YWx1ZSIsIm5ld19udW1iZXIiLCJ0ZW1wb3JhcnlfbmV3X251bWJlciIsInBhcnNlSW50IiwidGVuX2RpZ2l0cyIsIk5FWFRfU1RFUF9DT09LSUVfTkFNRSIsImhhbmRsZXIiLCJjYWxsYmFjayIsImhhbmRsZXJfcmVzcG9uc2UiLCJzdGFjayIsIlR3aWxpbyIsIlJlc3BvbnNlIiwidHdpbWwiLCJNZXNzYWdpbmdSZXNwb25zZSIsInNldEJvZHkiLCJhcHBlbmRIZWFkZXIiLCJzZXRDb29raWUiXSwic291cmNlUm9vdCI6IiJ9