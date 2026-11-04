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
            console.log(`Performing set_guest_pass for ${patroller_name}`);
            return await this.set_guest_pass();
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
        await this.log_action(`set_beacon_search(${beacon_search_location})`);
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
     * Records the use of a single guest pass.
     * We do not require a guest name in the SMS flow; this returns the status/prompt
     * for guest passes so the Guest Pass command behaves like other immediate actions.
     * @returns {Promise<BVNSPResponse>} A promise that resolves with the response.
     */ async set_guest_pass() {
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
        await this.log_action(`set_guest_pass`);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ZXMiOlsiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9ub2RlX21vZHVsZXMvQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlcy9pbmRleC5qcyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL2Vudi9oYW5kbGVyX2NvbmZpZy50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL2hhbmRsZXJzL2J2bnNwX2hhbmRsZXIudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9zaGVldHMvZ3Vlc3RfcGFzc19zaGVldC50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3NoZWV0cy9sb2dpbl9zaGVldC50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3NoZWV0cy9zZWFzb25fc2hlZXQudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9zaGVldHMvc2xlZF9iZWFjb25fY2hlY2tfc2hlZXQudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91c2VyLWNyZWRzLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvY2hlY2tpbl92YWx1ZXMudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91dGlscy9kYXRldGltZV91dGlsLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvZmlsZV91dGlscy50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3V0aWxzL2dvb2dsZV9zaGVldHNfc3ByZWFkc2hlZXRfdGFiLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvZ3Vlc3RfcGFzc2VzLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvc2NvcGVfdXRpbC50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3V0aWxzL3NlY3Rpb25fdmFsdWVzLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvdXRpbC50cyIsImV4dGVybmFsIGNvbW1vbmpzIFwiZ29vZ2xlYXBpc1wiIiwiZXh0ZXJuYWwgY29tbW9uanMgXCJzbXMtc2VnbWVudHMtY2FsY3VsYXRvclwiIiwiZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImZzXCIiLCJ3ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9oYW5kbGVycy9oYW5kbGVyLnByb3RlY3RlZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJbnRlbnRpb25hbGx5IGxlZnQgZW1wdHlcbiIsImltcG9ydCB7IENoZWNraW5WYWx1ZSB9IGZyb20gXCIuLi91dGlscy9jaGVja2luX3ZhbHVlc1wiO1xuXG4vKipcbiAqIEVudmlyb25tZW50IGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBoYW5kbGVyLlxuICogPHA+XG4gKiBOb3RlOiBUaGVzZSBhcmUgdGhlIG9ubHkgc2VjcmV0IHZhbHVlcyB3ZSBuZWVkIHRvIHJlYWQuIFJlc3QgY2FuIGJlIGRlcGxveWVkLlxuICogQHR5cGVkZWYge09iamVjdH0gSGFuZGxlckVudmlyb25tZW50XG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0NSSVBUX0lEIC0gVGhlIElEIG9mIHRoZSBHb29nbGUgQXBwcyBTY3JpcHQgcHJvamVjdC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTWU5DX1NJRCAtIFRoZSBTSUQgb2YgdGhlIFR3aWxpbyBTeW5jIHNlcnZpY2UuXG4gKi9cbnR5cGUgSGFuZGxlckVudmlyb25tZW50ID0ge1xuICAgIFNIRUVUX0lEOiBzdHJpbmc7XG4gICAgU0NSSVBUX0lEOiBzdHJpbmc7XG4gICAgU1lOQ19TSUQ6IHN0cmluZztcbn07XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgdXNlciBjcmVkZW50aWFscy5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IFVzZXJDcmVkc0NvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsfSBOU1BfRU1BSUxfRE9NQUlOIC0gVGhlIGVtYWlsIGRvbWFpbiBmb3IgTlNQLlxuICovXG50eXBlIFVzZXJDcmVkc0NvbmZpZyA9IHtcbiAgICBOU1BfRU1BSUxfRE9NQUlOOiBzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsO1xufTtcbmNvbnN0IHVzZXJfY3JlZHNfY29uZmlnOiBVc2VyQ3JlZHNDb25maWcgPSB7XG4gICAgTlNQX0VNQUlMX0RPTUFJTjogXCJmYXJ3ZXN0Lm9yZ1wiLFxufTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciBmaW5kaW5nIGEgcGF0cm9sbGVyLlxuICogQHR5cGVkZWYge09iamVjdH0gRmluZFBhdHJvbGxlckNvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFNIRUVUX0lEIC0gVGhlIElEIG9mIHRoZSBHb29nbGUgU2hlZXRzIHNwcmVhZHNoZWV0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFBIT05FX05VTUJFUl9MT09LVVBfU0hFRVQgLSBUaGUgcmFuZ2UgZm9yIHBob25lIG51bWJlciBsb29rdXAuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gUEhPTkVfTlVNQkVSX05VTUJFUl9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBwaG9uZSBudW1iZXJzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFBIT05FX05VTUJFUl9OQU1FX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIG5hbWVzLlxuICovXG50eXBlIEZpbmRQYXRyb2xsZXJDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICBQSE9ORV9OVU1CRVJfTE9PS1VQX1NIRUVUOiBzdHJpbmc7XG4gICAgUEhPTkVfTlVNQkVSX05VTUJFUl9DT0xVTU46IHN0cmluZztcbiAgICBQSE9ORV9OVU1CRVJfTkFNRV9DT0xVTU46IHN0cmluZztcbn07XG5cbmNvbnN0IGZpbmRfcGF0cm9sbGVyX2NvbmZpZzogRmluZFBhdHJvbGxlckNvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogXCJ0ZXN0XCIsXG4gICAgUEhPTkVfTlVNQkVSX0xPT0tVUF9TSEVFVDogXCJQaG9uZSBOdW1iZXJzIUEyOkIxMDBcIixcbiAgICBQSE9ORV9OVU1CRVJfTkFNRV9DT0xVTU46IFwiQVwiLFxuICAgIFBIT05FX05VTUJFUl9OVU1CRVJfQ09MVU1OOiBcIkJcIixcbn07XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgdGhlIGxvZ2luIHNoZWV0LlxuICogQHR5cGVkZWYge09iamVjdH0gTG9naW5TaGVldENvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFNIRUVUX0lEIC0gVGhlIElEIG9mIHRoZSBHb29nbGUgU2hlZXRzIHNwcmVhZHNoZWV0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IExPR0lOX1NIRUVUX0xPT0tVUCAtIFRoZSByYW5nZSBmb3IgbG9naW4gc2hlZXQgbG9va3VwLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IENIRUNLSU5fQ09VTlRfTE9PS1VQIC0gVGhlIHJhbmdlIGZvciBjaGVjay1pbiBjb3VudCBsb29rdXAuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQVJDSElWRURfQ0VMTCAtIFRoZSBjZWxsIGZvciBhcmNoaXZlZCBkYXRhLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNIRUVUX0RBVEVfQ0VMTCAtIFRoZSBjZWxsIGZvciB0aGUgc2hlZXQgZGF0ZS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDVVJSRU5UX0RBVEVfQ0VMTCAtIFRoZSBjZWxsIGZvciB0aGUgY3VycmVudCBkYXRlLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IE5BTUVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgbmFtZXMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQ0FURUdPUllfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgY2F0ZWdvcmllcy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTRUNUSU9OX0RST1BET1dOX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIHNlY3Rpb24gZHJvcGRvd24uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBjaGVjay1pbiBkcm9wZG93bi5cbiAqL1xudHlwZSBMb2dpblNoZWV0Q29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBzdHJpbmc7XG4gICAgTE9HSU5fU0hFRVRfTE9PS1VQOiBzdHJpbmc7XG4gICAgQ0hFQ0tJTl9DT1VOVF9MT09LVVA6IHN0cmluZztcbiAgICBBUkNISVZFRF9DRUxMOiBzdHJpbmc7XG4gICAgU0hFRVRfREFURV9DRUxMOiBzdHJpbmc7XG4gICAgQ1VSUkVOVF9EQVRFX0NFTEw6IHN0cmluZztcbiAgICBOQU1FX0NPTFVNTjogc3RyaW5nO1xuICAgIENBVEVHT1JZX0NPTFVNTjogc3RyaW5nO1xuICAgIFNFQ1RJT05fRFJPUERPV05fQ09MVU1OOiBzdHJpbmc7XG4gICAgQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU46IHN0cmluZztcbn07XG5cbmNvbnN0IGxvZ2luX3NoZWV0X2NvbmZpZzogTG9naW5TaGVldENvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogXCJ0ZXN0XCIsXG4gICAgTE9HSU5fU0hFRVRfTE9PS1VQOiBcIkxvZ2luIUExOkkxMDBcIixcbiAgICBDSEVDS0lOX0NPVU5UX0xPT0tVUDogXCJUb29scyFHMjpHMlwiLFxuICAgIFNIRUVUX0RBVEVfQ0VMTDogXCJCMVwiLFxuICAgIENVUlJFTlRfREFURV9DRUxMOiBcIkIyXCIsXG4gICAgQVJDSElWRURfQ0VMTDogXCJIMVwiLFxuICAgIE5BTUVfQ09MVU1OOiBcIkFcIixcbiAgICBDQVRFR09SWV9DT0xVTU46IFwiQlwiLFxuICAgIFNFQ1RJT05fRFJPUERPV05fQ09MVU1OOiBcIkhcIixcbiAgICBDSEVDS0lOX0RST1BET1dOX0NPTFVNTjogXCJJXCIsXG59O1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIHRoZSBzZWFzb24gc2hlZXQuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBTZWFzb25TaGVldENvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFNIRUVUX0lEIC0gVGhlIElEIG9mIHRoZSBHb29nbGUgU2hlZXRzIHNwcmVhZHNoZWV0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNFQVNPTl9TSEVFVCAtIFRoZSBuYW1lIG9mIHRoZSBzZWFzb24gc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0VBU09OX1NIRUVUX0RBWVNfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3Igc2Vhc29uIHNoZWV0IGRheXMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0VBU09OX1NIRUVUX05BTUVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3Igc2Vhc29uIHNoZWV0IG5hbWVzLlxuICovXG50eXBlIFNlYXNvblNoZWV0Q29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBzdHJpbmc7XG4gICAgU0VBU09OX1NIRUVUOiBzdHJpbmc7XG4gICAgU0VBU09OX1NIRUVUX0RBWVNfQ09MVU1OOiBzdHJpbmc7XG4gICAgU0VBU09OX1NIRUVUX05BTUVfQ09MVU1OOiBzdHJpbmc7XG59O1xuY29uc3Qgc2Vhc29uX3NoZWV0X2NvbmZpZzogU2Vhc29uU2hlZXRDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IFwidGVzdFwiLFxuICAgIFNFQVNPTl9TSEVFVDogXCJTZWFzb25cIixcbiAgICBTRUFTT05fU0hFRVRfTkFNRV9DT0xVTU46IFwiQlwiLFxuICAgIFNFQVNPTl9TSEVFVF9EQVlTX0NPTFVNTjogXCJBXCIsXG59O1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIHNlY3Rpb25zLlxuICogQHR5cGVkZWYge09iamVjdH0gU2VjdGlvbkNvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFNFQ1RJT05fVkFMVUVTIC0gVGhlIHNlY3Rpb24gdmFsdWVzLlxuICovXG50eXBlIFNlY3Rpb25Db25maWcgPSB7XG4gICAgU0VDVElPTl9WQUxVRVM6IHN0cmluZztcbn07XG5jb25zdCBzZWN0aW9uX2NvbmZpZzogU2VjdGlvbkNvbmZpZyA9IHtcbiAgICBTRUNUSU9OX1ZBTFVFUzogIFwiMSwyLDMsNCxSb3ZpbmcsRkFSLFRyYWluaW5nXCIsXG59O1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIGd1ZXN0IHBhc3Nlcy5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IEd1ZXN0UGFzc2VzQ29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gR1VFU1RfUEFTU19TSEVFVCAtIFRoZSBuYW1lIG9mIHRoZSBndWVzdCBwYXNzIHNoZWV0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IEdVRVNUX1BBU1NfRUxJR0lCTEVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgZ3Vlc3QgcGFzcyAgZWxpZ2liaWxpdHkgY2hlY2tib3ggKFRSVUUvRkFMU0UpLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IEdVRVNUX1BBU1NfRUxJR0lCTEVfUkVBU09OX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIHRoZSBpbmVsaWdpYmlsaXR5IHJlYXNvbiBzdHJpbmcuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gR1VFU1RfUEFTU19TSEVFVF9BVkFJTEFCTEVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgYXZhaWxhYmxlIHBhc3MgY291bnQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gR1VFU1RfUEFTU19TSEVFVF9VU0VEX1RPREFZX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIHBhc3NlcyB1c2VkIHRvZGF5LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IEdVRVNUX1BBU1NfU0hFRVRfVVNFRF9TRUFTT05fQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgcGFzc2VzIHVzZWQgdGhpcyBzZWFzb24uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gR1VFU1RfUEFTU19TSEVFVF9EQVRFU19TVEFSVElOR19DT0xVTU4gLSBUaGUgY29sdW1uIHdoZXJlIGRhdGUtb2YtdXNlIGVudHJpZXMgYmVnaW4uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gR1VFU1RfUEFTU19TSEVFVF9OQU1FX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIHBhdHJvbGxlciBuYW1lcy5cbiAqL1xudHlwZSBHdWVzdFBhc3Nlc0NvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogc3RyaW5nO1xuICAgIEdVRVNUX1BBU1NfU0hFRVQ6IHN0cmluZztcbiAgICBHVUVTVF9QQVNTX0VMSUdJQkxFX0NPTFVNTjogc3RyaW5nO1xuICAgIEdVRVNUX1BBU1NfRUxJR0lCTEVfUkVBU09OX0NPTFVNTjogc3RyaW5nO1xuICAgIEdVRVNUX1BBU1NfU0hFRVRfQVZBSUxBQkxFX0NPTFVNTjogc3RyaW5nO1xuICAgIEdVRVNUX1BBU1NfU0hFRVRfVVNFRF9UT0RBWV9DT0xVTU46IHN0cmluZztcbiAgICBHVUVTVF9QQVNTX1NIRUVUX1VTRURfU0VBU09OX0NPTFVNTjogc3RyaW5nO1xuICAgIEdVRVNUX1BBU1NfU0hFRVRfREFURVNfU1RBUlRJTkdfQ09MVU1OOiBzdHJpbmc7XG4gICAgR1VFU1RfUEFTU19TSEVFVF9OQU1FX0NPTFVNTjogc3RyaW5nO1xufTtcbmNvbnN0IGd1ZXN0X3Bhc3Nlc19jb25maWc6IEd1ZXN0UGFzc2VzQ29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBcInRlc3RcIixcbiAgICBHVUVTVF9QQVNTX1NIRUVUOiBcIkd1ZXN0UGFzc2VzXCIsXG4gICAgR1VFU1RfUEFTU19FTElHSUJMRV9DT0xVTU46IFwiQlwiLFxuICAgIEdVRVNUX1BBU1NfRUxJR0lCTEVfUkVBU09OX0NPTFVNTjogXCJDXCIsXG4gICAgR1VFU1RfUEFTU19TSEVFVF9OQU1FX0NPTFVNTjogXCJBXCIsXG4gICAgR1VFU1RfUEFTU19TSEVFVF9BVkFJTEFCTEVfQ09MVU1OOiBcIkRcIixcbiAgICBHVUVTVF9QQVNTX1NIRUVUX1VTRURfVE9EQVlfQ09MVU1OOiBcIkVcIixcbiAgICBHVUVTVF9QQVNTX1NIRUVUX1VTRURfU0VBU09OX0NPTFVNTjogXCJGXCIsXG4gICAgR1VFU1RfUEFTU19TSEVFVF9EQVRFU19TVEFSVElOR19DT0xVTU46IFwiR1wiLFxufTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciB0aGUgU2xlZCBCZWFjb24gQ2hlY2tzIHNoZWV0XG4gKlxuICogQHR5cGVkZWYge09iamVjdH0gU2xlZEJlYWNvbkNvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFNIRUVUX0lEIC0gVGhlIElEIG9mIHRoZSBHb29nbGUgU2hlZXRzIHNwcmVhZHNoZWV0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNMRURfQkVBQ09OX1NIRUVUIC0gVGhlIG5hbWUgb2YgdGhlIFNsZWQgQmVjb24gQ2hlY2sgc2hlZXRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTTEVEX0JFQUNPTl9TSEVFVF9OQU1FX0NPTFVNTiAtICBUaGUgY29sdW1uIGZvciBwYXRyb2xsZXIgbmFtZXMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQkVBQ09OX1NFQVJDSF9DT1VOVF9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciB0aGUgc2VhcmNoIGNvdW50IGZvciB0aGlzIHNlYXNvbi5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBCRUFDT05fRklORF9EQVRFU19TVEFSVElOR19DT0xVTU4gLSBUaGVyZSBjb2x1bW4gd2hlcmUgaHRlIGRhdGVzIGZvciBiZWFjb24gZmluZHMgYmVnaW5zLlxuICovXG50eXBlIFNsZWRCZWFjb25Db25maWcgPSB7XG4gICAgIFNIRUVUX0lEOiBzdHJpbmc7XG4gICAgIFNMRURfQkVBQ09OX1NIRUVUOiBzdHJpbmc7XG4gICAgIFNMRURfQkVBQ09OX1NIRUVUX05BTUVfQ09MVU1OOiBzdHJpbmc7XG4gICAgIEJFQUNPTl9TRUFSQ0hfQ09VTlRfQ09MVU1OOiBzdHJpbmc7XG4gICAgIEJFQUNPTl9GSU5EX0RBVEVTX1NUQVJUSU5HX0NPTFVNTjogc3RyaW5nO1xufTtcbiBjb25zdCBzbGVkX2JlYWNvbl9zaGVldF9jb25maWc6IFNsZWRCZWFjb25Db25maWcgPSB7XG4gICAgIFNIRUVUX0lEOiBcInRlc3RcIixcbiAgICAgU0xFRF9CRUFDT05fU0hFRVQ6IFwiU2xlZF9CZWFjb24gQ2hlY2tzXCIsXG4gICAgIFNMRURfQkVBQ09OX1NIRUVUX05BTUVfQ09MVU1OOiBcIkFcIixcbiAgICAgQkVBQ09OX1NFQVJDSF9DT1VOVF9DT0xVTU46IFwiSlwiLFxuICAgICBCRUFDT05fRklORF9EQVRFU19TVEFSVElOR19DT0xVTU46IFwiS1wiXG59XG5cbiAvKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIHRoZSBoYW5kbGVyLlxuICogQHR5cGVkZWYge09iamVjdH0gSGFuZGxlckNvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFNDUklQVF9JRCAtIFRoZSBJRCBvZiB0aGUgR29vZ2xlIEFwcHMgU2NyaXB0IHByb2plY3QuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU1lOQ19TSUQgLSBUaGUgU0lEIG9mIHRoZSBUd2lsaW8gU3luYyBzZXJ2aWNlLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFJFU0VUX0ZVTkNUSU9OX05BTUUgLSBUaGUgbmFtZSBvZiB0aGUgcmVzZXQgZnVuY3Rpb24uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQVJDSElWRV9GVU5DVElPTl9OQU1FIC0gVGhlIG5hbWUgb2YgdGhlIGFyY2hpdmUgZnVuY3Rpb24uXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFVTRV9TRVJWSUNFX0FDQ09VTlQgLSBXaGV0aGVyIHRvIHVzZSBhIHNlcnZpY2UgYWNjb3VudC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBBQ1RJT05fTE9HX1NIRUVUIC0gVGhlIG5hbWUgb2YgdGhlIGFjdGlvbiBsb2cgc2hlZXQuXG4gKiBAcHJvcGVydHkge0NoZWNraW5WYWx1ZVtdfSBDSEVDS0lOX1ZBTFVFUyAtIFRoZSBjaGVjay1pbiB2YWx1ZXMuXG4gKi9cbnR5cGUgSGFuZGxlckNvbmZpZyA9IHtcbiAgICBTQ1JJUFRfSUQ6IHN0cmluZztcbiAgICBTSEVFVF9JRDogc3RyaW5nO1xuICAgIFNZTkNfU0lEOiBzdHJpbmc7XG4gICAgUkVTRVRfRlVOQ1RJT05fTkFNRTogc3RyaW5nO1xuICAgIEFSQ0hJVkVfRlVOQ1RJT05fTkFNRTogc3RyaW5nO1xuICAgIFVTRV9TRVJWSUNFX0FDQ09VTlQ6IGJvb2xlYW47XG4gICAgQUNUSU9OX0xPR19TSEVFVDogc3RyaW5nO1xuICAgIENIRUNLSU5fVkFMVUVTOiBDaGVja2luVmFsdWVbXTtcbn07XG5jb25zdCBoYW5kbGVyX2NvbmZpZzogSGFuZGxlckNvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogXCJ0ZXN0XCIsXG4gICAgU0NSSVBUX0lEOiBcInRlc3RcIixcbiAgICBTWU5DX1NJRDogXCJ0ZXN0XCIsXG5cbiAgICBBUkNISVZFX0ZVTkNUSU9OX05BTUU6IFwiQXJjaGl2ZVwiLFxuICAgIFJFU0VUX0ZVTkNUSU9OX05BTUU6IFwiUmVzZXRcIixcbiAgICBVU0VfU0VSVklDRV9BQ0NPVU5UOiB0cnVlLFxuICAgIEFDVElPTl9MT0dfU0hFRVQ6IFwiQm90X1VzYWdlXCIsXG4gICAgQ0hFQ0tJTl9WQUxVRVM6IFtcbiAgICAgICAgbmV3IENoZWNraW5WYWx1ZShcImRheVwiLCBcIkFsbCBEYXlcIiwgXCJhbGwgZGF5L0RBWVwiLCBbXCJjaGVja2luLWRheVwiXSksXG4gICAgICAgIG5ldyBDaGVja2luVmFsdWUoXCJhbVwiLCBcIkhhbGYgQU1cIiwgXCJtb3JuaW5nL0FNXCIsIFtcImNoZWNraW4tYW1cIl0pLFxuICAgICAgICBuZXcgQ2hlY2tpblZhbHVlKFwicG1cIiwgXCJIYWxmIFBNXCIsIFwiYWZ0ZXJub29uL1BNXCIsIFtcImNoZWNraW4tcG1cIl0pLFxuICAgICAgICBuZXcgQ2hlY2tpblZhbHVlKFwib3V0XCIsIFwiQ2hlY2tlZCBPdXRcIiwgXCJjaGVjayBvdXQvT1VUXCIsIFtcImNoZWNrb3V0XCIsIFwiY2hlY2stb3V0XCJdKSxcbiAgICBdLFxufTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciBwYXRyb2xsZXIgcm93cy5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IFBhdHJvbGxlclJvd0NvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IE5BTUVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgbmFtZXMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQ0FURUdPUllfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgY2F0ZWdvcmllcy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTRUNUSU9OX0RST1BET1dOX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIHNlY3Rpb24gZHJvcGRvd24uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBjaGVjay1pbiBkcm9wZG93bi5cbiAqL1xudHlwZSBQYXRyb2xsZXJSb3dDb25maWcgPSB7XG4gICAgTkFNRV9DT0xVTU46IHN0cmluZztcbiAgICBDQVRFR09SWV9DT0xVTU46IHN0cmluZztcbiAgICBTRUNUSU9OX0RST1BET1dOX0NPTFVNTjogc3RyaW5nO1xuICAgIENIRUNLSU5fRFJPUERPV05fQ09MVU1OOiBzdHJpbmc7XG59O1xuXG4vKipcbiAqIENvbWJpbmVkIGNvbmZpZ3VyYXRpb24gdHlwZS5cbiAqIEB0eXBlZGVmIHtIYW5kbGVyRW52aXJvbm1lbnQgJiBVc2VyQ3JlZHNDb25maWcgJiBGaW5kUGF0cm9sbGVyQ29uZmlnICYgTG9naW5TaGVldENvbmZpZyAmIFNlYXNvblNoZWV0Q29uZmlnICYgU2VjdGlvbkNvbmZpZyAmIEd1ZXN0UGFzc2VzQ29uZmlnICYgSGFuZGxlckNvbmZpZyAmIFBhdHJvbGxlclJvd0NvbmZpZ30gQ29tYmluZWRDb25maWdcbiAqL1xudHlwZSBDb21iaW5lZENvbmZpZyA9IEhhbmRsZXJFbnZpcm9ubWVudCAmXG4gICAgVXNlckNyZWRzQ29uZmlnICZcbiAgICBGaW5kUGF0cm9sbGVyQ29uZmlnICZcbiAgICBMb2dpblNoZWV0Q29uZmlnICZcbiAgICBTZWFzb25TaGVldENvbmZpZyAmXG4gICAgU2VjdGlvbkNvbmZpZyAmXG4gICAgR3Vlc3RQYXNzZXNDb25maWcgJlxuICAgIFNsZWRCZWFjb25Db25maWcgJlxuICAgIEhhbmRsZXJDb25maWcgJlxuICAgIFBhdHJvbGxlclJvd0NvbmZpZztcblxuY29uc3QgQ09ORklHOiBDb21iaW5lZENvbmZpZyA9IHtcbiAgICAuLi5oYW5kbGVyX2NvbmZpZyxcbiAgICAuLi5maW5kX3BhdHJvbGxlcl9jb25maWcsXG4gICAgLi4ubG9naW5fc2hlZXRfY29uZmlnLFxuICAgIC4uLmd1ZXN0X3Bhc3Nlc19jb25maWcsXG4gICAgLi4uc2xlZF9iZWFjb25fc2hlZXRfY29uZmlnLFxuICAgIC4uLnNlYXNvbl9zaGVldF9jb25maWcsXG4gICAgLi4udXNlcl9jcmVkc19jb25maWcsXG4gICAgLi4uc2VjdGlvbl9jb25maWcsXG59O1xuXG5leHBvcnQge1xuICAgIENPTkZJRyxcbiAgICBDb21iaW5lZENvbmZpZyxcbiAgICBTZWN0aW9uQ29uZmlnLFxuICAgIEd1ZXN0UGFzc2VzQ29uZmlnLFxuICAgIFNsZWRCZWFjb25Db25maWcsXG4gICAgRmluZFBhdHJvbGxlckNvbmZpZyxcbiAgICBIYW5kbGVyQ29uZmlnLFxuICAgIEhhbmRsZXJFbnZpcm9ubWVudCxcbiAgICBVc2VyQ3JlZHNDb25maWcsXG4gICAgTG9naW5TaGVldENvbmZpZyxcbiAgICBTZWFzb25TaGVldENvbmZpZyxcbiAgICBQYXRyb2xsZXJSb3dDb25maWcsXG59OyIsImltcG9ydCBcIkB0d2lsaW8tbGFicy9zZXJ2ZXJsZXNzLXJ1bnRpbWUtdHlwZXNcIjtcbmltcG9ydCB7XG4gICAgQ29udGV4dCxcbiAgICBTZXJ2ZXJsZXNzRXZlbnRPYmplY3QsXG4gICAgU2VydmljZUNvbnRleHQsXG4gICAgVHdpbGlvQ2xpZW50LFxufSBmcm9tIFwiQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlcy90eXBlc1wiO1xuaW1wb3J0IHtnb29nbGUsIHNjcmlwdF92MSwgc2hlZXRzX3Y0fSBmcm9tIFwiZ29vZ2xlYXBpc1wiO1xuaW1wb3J0IHtHb29nbGVBdXRofSBmcm9tIFwiZ29vZ2xlYXBpcy1jb21tb25cIjtcbmltcG9ydCB7XG4gICAgQ29tYmluZWRDb25maWcsXG4gICAgQ09ORklHLFxuICAgIEZpbmRQYXRyb2xsZXJDb25maWcsXG4gICAgR3Vlc3RQYXNzZXNDb25maWcsXG4gICAgSGFuZGxlckNvbmZpZyxcbiAgICBIYW5kbGVyRW52aXJvbm1lbnQsXG4gICAgTG9naW5TaGVldENvbmZpZyxcbiAgICBTZWFzb25TaGVldENvbmZpZywgU2xlZEJlYWNvbkNvbmZpZyxcbn0gZnJvbSBcIi4uL2Vudi9oYW5kbGVyX2NvbmZpZ1wiO1xuaW1wb3J0IExvZ2luU2hlZXQsIHtQYXRyb2xsZXJSb3d9IGZyb20gXCIuLi9zaGVldHMvbG9naW5fc2hlZXRcIjtcbmltcG9ydCBTZWFzb25TaGVldCBmcm9tIFwiLi4vc2hlZXRzL3NlYXNvbl9zaGVldFwiO1xuaW1wb3J0IHtVc2VyQ3JlZHN9IGZyb20gXCIuLi91c2VyLWNyZWRzXCI7XG5pbXBvcnQge0NoZWNraW5WYWx1ZXN9IGZyb20gXCIuLi91dGlscy9jaGVja2luX3ZhbHVlc1wiO1xuaW1wb3J0IHtnZXRfc2VydmljZV9jcmVkZW50aWFsc19wYXRofSBmcm9tIFwiLi4vdXRpbHMvZmlsZV91dGlsc1wiO1xuaW1wb3J0IHtleGNlbF9yb3dfdG9faW5kZXgsIGZvcm1hdF9waG9uZV9mb3JfZGlzcGxheSwgc2FuaXRpemVfcGhvbmVfbnVtYmVyfSBmcm9tIFwiLi4vdXRpbHMvdXRpbFwiO1xuaW1wb3J0IHtidWlsZF9wYXNzZXNfc3RyaW5nLH0gZnJvbSBcIi4uL3V0aWxzL2d1ZXN0X3Bhc3Nlc1wiO1xuaW1wb3J0IHtHdWVzdFBhc3NTaGVldH0gZnJvbSBcIi4uL3NoZWV0cy9ndWVzdF9wYXNzX3NoZWV0XCI7XG5pbXBvcnQge1NlY3Rpb25WYWx1ZXN9IGZyb20gJy4uL3V0aWxzL3NlY3Rpb25fdmFsdWVzJztcbmltcG9ydCB7U2xlZEJlYWNvbkNoZWNrU2hlZXR9IGZyb20gXCIuLi9zaGVldHMvc2xlZF9iZWFjb25fY2hlY2tfc2hlZXRcIjtcblxuZXhwb3J0IHR5cGUgQlZOU1BSZXNwb25zZSA9IHtcbiAgICByZXNwb25zZT86IHN0cmluZztcbiAgICBuZXh0X3N0ZXA/OiBzdHJpbmc7XG59O1xuZXhwb3J0IHR5cGUgQlZOU1BFdmVudCA9IFNlcnZlcmxlc3NFdmVudE9iamVjdDxcbiAgICB7XG4gICAgICAgIEZyb206IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAgICAgVG86IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAgICAgbnVtYmVyOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgICAgIHRlc3RfbnVtYmVyOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgICAgIEJvZHk6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICB9LFxuICAgIHt9LFxuICAgIHtcbiAgICAgICAgYnZuc3BfbmV4dF9zdGVwOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgfVxuPjtcblxuZXhwb3J0IGNvbnN0IE5FWFRfU1RFUFMgPSB7XG4gICAgQVdBSVRfQ09NTUFORDogXCJhd2FpdC1jb21tYW5kXCIsXG4gICAgQVdBSVRfQ0hFQ0tJTjogXCJhd2FpdC1jaGVja2luXCIsXG4gICAgQ09ORklSTV9SRVNFVDogXCJjb25maXJtLXJlc2V0XCIsXG4gICAgQVVUSF9SRVNFVDogXCJhdXRoLXJlc2V0XCIsXG4gICAgQVdBSVRfU0VDVElPTjogXCJhd2FpdC1zZWN0aW9uXCIsXG4gICAgQVdBSVRfUEFTUzogXCJhd2FpdC1wYXNzXCIsXG4gICAgQVdBSVRfTUVTU0FHRTogXCJhd2FpdC1tZXNzYWdlXCIsXG4gICAgQVdBSVRfQlJPQURDQVNUOiBcImF3YWl0LWJyb2FkY2FzdFwiLFxuICAgIEFXQUlUX0JFQUNPTjpcImF3YWl0LWJlYWNvblwiLFxufTtcblxuY29uc3QgQ09NTUFORFMgPSB7XG4gICAgT05fRFVUWTogW1wib25kdXR5XCIsIFwib24tZHV0eVwiXSxcbiAgICBTVEFUVVM6IFtcInN0YXR1c1wiXSxcbiAgICBDSEVDS0lOOiBbXCJjaGVja2luXCIsIFwiY2hlY2staW5cIl0sXG4gICAgU0VDVElPTl9BU1NJR05NRU5UOiBbXCJzZWN0aW9uXCIsIFwic2VjdGlvbi1hc3NpZ25tZW50XCIsIFwic2VjdGlvbmFzc2lnbm1lbnRcIiwgXCJhc3NpZ25tZW50XCJdLFxuICAgIEdVRVNUX1BBU1M6IFtcImd1ZXN0LXBhc3NcIiwgXCJndWVzdHBhc3NcIiwgXCJndWVzdFwiXSxcbiAgICBXSEFUU0FQUDogW1wid2hhdHNhcHBcIl0sXG4gICAgTUVTU0FHRTogW1wibWVzc2FnZVwiLCBcIm1zZ1wiXSxcbiAgICBCUk9BRENBU1Q6IFtcImJyb2FkY2FzdFwiXSxcbiAgICBCRUFDT046IFtcImJlYWNvblwiLCBcImJlYWNvbi1zZWFyY2hcIiwgXCJiZWFjb24tZmluZFwiXSxcbn07XG5cbmV4cG9ydCBjb25zdCBTTVNfTUFYX0xFTkdUSCA9IDE2MDtcbmV4cG9ydCBjb25zdCBNRVNTQUdFX1BSRUZJWF9URU1QTEFURSA9IFwiTWVzc2FnZSBmcm9tIFwiO1xuZXhwb3J0IGNvbnN0IE1FU1NBR0VfUFJFRklYX1NVRkZJWCA9IFwiOiBcIjtcblxuLyoqXG4gKiBSZXN1bHQgb2YgdmFsaWRhdGluZyBhbiBTTVMgbWVzc2FnZSBmb3IgR1NNLTcgY29tcGF0aWJpbGl0eSBhbmQgc2VnbWVudCBjb3VudC5cbiAqL1xuZXhwb3J0IHR5cGUgU21zVmFsaWRhdGlvblJlc3VsdCA9IHtcbiAgICAvKiogV2hldGhlciB0aGUgbWVzc2FnZSBpcyB2YWxpZCAoR1NNLTcgb25seSBhbmQgZml0cyBpbiBhIHNpbmdsZSBzZWdtZW50KS4gKi9cbiAgICB2YWxpZDogYm9vbGVhbjtcbiAgICAvKiogSWYgaW52YWxpZCwgdGhlIHJlYXNvbjogJ25vbl9nc203JyBvciAndG9vX21hbnlfc2VnbWVudHMnLiAqL1xuICAgIHJlYXNvbj86IFwibm9uX2dzbTdcIiB8IFwidG9vX21hbnlfc2VnbWVudHNcIjtcbiAgICAvKiogVGhlIG5vbi1HU00tNyBjaGFyYWN0ZXJzIGZvdW5kLCBpZiBhbnkuICovXG4gICAgbm9uX2dzbV9jaGFyYWN0ZXJzPzogc3RyaW5nW107XG4gICAgLyoqIFRoZSBudW1iZXIgb2YgU01TIHNlZ21lbnRzIHRoZSBtZXNzYWdlIHdvdWxkIHJlcXVpcmUuICovXG4gICAgc2VnbWVudHNfY291bnQ/OiBudW1iZXI7XG59O1xuXG4vKipcbiAqIFZhbGlkYXRlcyB0aGF0IGEgY29tcGxldGUgU01TIG1lc3NhZ2UgKHByZWZpeCArIGJvZHkpIHVzZXMgb25seSBHU00tNyBjaGFyYWN0ZXJzXG4gKiBhbmQgZml0cyB3aXRoaW4gYSBzaW5nbGUgU01TIHNlZ21lbnQuXG4gKlxuICogVXNlcyB0aGUgc21zLXNlZ21lbnRzLWNhbGN1bGF0b3IgbGlicmFyeSAobWFpbnRhaW5lZCBieSBUd2lsaW9EZXZFZCkgd2hpY2hcbiAqIHByb3ZpZGVzIGF1dGhvcml0YXRpdmUgR1NNLTcgY2hhcmFjdGVyIGRldGVjdGlvbi5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZnVsbF9tZXNzYWdlIC0gVGhlIGNvbXBsZXRlIG1lc3NhZ2UgdG8gdmFsaWRhdGUgKHByZWZpeCArIHVzZXIgdGV4dCkuXG4gKiBAcmV0dXJucyB7U21zVmFsaWRhdGlvblJlc3VsdH0gVGhlIHZhbGlkYXRpb24gcmVzdWx0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVfc21zX21lc3NhZ2UoZnVsbF9tZXNzYWdlOiBzdHJpbmcpOiBTbXNWYWxpZGF0aW9uUmVzdWx0IHtcbiAgICBjb25zdCB7IFNlZ21lbnRlZE1lc3NhZ2UgfSA9IHJlcXVpcmUoXCJzbXMtc2VnbWVudHMtY2FsY3VsYXRvclwiKTtcbiAgICBjb25zdCBzZWdtZW50ZWQgPSBuZXcgU2VnbWVudGVkTWVzc2FnZShmdWxsX21lc3NhZ2UpO1xuICAgIGNvbnN0IG5vbl9nc20gPSBzZWdtZW50ZWQuZ2V0Tm9uR3NtQ2hhcmFjdGVycygpIGFzIHN0cmluZ1tdO1xuXG4gICAgaWYgKG5vbl9nc20ubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsaWQ6IGZhbHNlLFxuICAgICAgICAgICAgcmVhc29uOiBcIm5vbl9nc203XCIsXG4gICAgICAgICAgICBub25fZ3NtX2NoYXJhY3RlcnM6IFsuLi5uZXcgU2V0KG5vbl9nc20pXSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoc2VnbWVudGVkLnNlZ21lbnRzQ291bnQgPiAxKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWxpZDogZmFsc2UsXG4gICAgICAgICAgICByZWFzb246IFwidG9vX21hbnlfc2VnbWVudHNcIixcbiAgICAgICAgICAgIHNlZ21lbnRzX2NvdW50OiBzZWdtZW50ZWQuc2VnbWVudHNDb3VudCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4geyB2YWxpZDogdHJ1ZSB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCVk5TUEhhbmRsZXIge1xuICAgIFNDT1BFUzogc3RyaW5nW10gPSBbXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3NwcmVhZHNoZWV0c1wiXTtcblxuICAgIHNtc19yZXF1ZXN0OiBib29sZWFuO1xuICAgIHJlc3VsdF9tZXNzYWdlczogc3RyaW5nW10gPSBbXTtcbiAgICBmcm9tOiBzdHJpbmc7XG4gICAgdG86IHN0cmluZztcbiAgICBib2R5OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgYm9keV9yYXc6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBwYXRyb2xsZXI6IFBhdHJvbGxlclJvdyB8IG51bGw7XG4gICAgYnZuc3BfbmV4dF9zdGVwOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgY2hlY2tpbl9tb2RlOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgICBmYXN0X2NoZWNraW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBhc3NpZ25lZF9zZWN0aW9uOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAgIHR3aWxpb19jbGllbnQ6IFR3aWxpb0NsaWVudCB8IG51bGwgPSBudWxsO1xuICAgIHN5bmNfc2lkOiBzdHJpbmc7XG4gICAgcmVzZXRfc2NyaXB0X2lkOiBzdHJpbmc7XG5cbiAgICAvLyBDYWNoZSBjbGllbnRzXG4gICAgc3luY19jbGllbnQ6IFNlcnZpY2VDb250ZXh0IHwgbnVsbCA9IG51bGw7XG4gICAgdXNlcl9jcmVkczogVXNlckNyZWRzIHwgbnVsbCA9IG51bGw7XG4gICAgc2VydmljZV9jcmVkczogR29vZ2xlQXV0aCB8IG51bGwgPSBudWxsO1xuICAgIHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzIHwgbnVsbCA9IG51bGw7XG4gICAgdXNlcl9zY3JpcHRzX3NlcnZpY2U6IHNjcmlwdF92MS5TY3JpcHQgfCBudWxsID0gbnVsbDtcblxuICAgIGxvZ2luX3NoZWV0OiBMb2dpblNoZWV0IHwgbnVsbCA9IG51bGw7XG4gICAgc2Vhc29uX3NoZWV0OiBTZWFzb25TaGVldCB8IG51bGwgPSBudWxsO1xuICAgIGd1ZXN0X3Bhc3Nfc2hlZXQ6IEd1ZXN0UGFzc1NoZWV0IHwgbnVsbCA9IG51bGw7XG4gICAgc2xlZF9iZWFjb25fY2hlY2tfc2hlZXQ6IFNsZWRCZWFjb25DaGVja1NoZWV0IHwgbnVsbCA9IG51bGw7XG5cbiAgICBjaGVja2luX3ZhbHVlczogQ2hlY2tpblZhbHVlcztcbiAgICBjdXJyZW50X3NoZWV0X2RhdGU6IERhdGU7XG5cbiAgICBjb21iaW5lZF9jb25maWc6IENvbWJpbmVkQ29uZmlnO1xuICAgIGNvbmZpZzogSGFuZGxlckNvbmZpZztcblxuICAgIHNlY3Rpb25fdmFsdWVzOiBTZWN0aW9uVmFsdWVzO1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhIG5ldyBCVk5TUEhhbmRsZXIuXG4gICAgICogQHBhcmFtIHtDb250ZXh0PEhhbmRsZXJFbnZpcm9ubWVudD59IGNvbnRleHQgLSBUaGUgc2VydmVybGVzcyBmdW5jdGlvbiBjb250ZXh0LlxuICAgICAqIEBwYXJhbSB7U2VydmVybGVzc0V2ZW50T2JqZWN0PEJWTlNQRXZlbnQ+fSBldmVudCAtIFRoZSBldmVudCBvYmplY3QuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGNvbnRleHQ6IENvbnRleHQ8SGFuZGxlckVudmlyb25tZW50PixcbiAgICAgICAgZXZlbnQ6IFNlcnZlcmxlc3NFdmVudE9iamVjdDxCVk5TUEV2ZW50PlxuICAgICkge1xuICAgICAgICAvLyBEZXRlcm1pbmUgbWVzc2FnZSBkZXRhaWxzIGZyb20gdGhlIGluY29taW5nIGV2ZW50LCB3aXRoIGZhbGxiYWNrIHZhbHVlc1xuICAgICAgICB0aGlzLnNtc19yZXF1ZXN0ID0gKGV2ZW50LkZyb20gfHwgZXZlbnQubnVtYmVyKSAhPT0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmZyb20gPSBldmVudC5Gcm9tIHx8IGV2ZW50Lm51bWJlciB8fCBldmVudC50ZXN0X251bWJlciE7XG4gICAgICAgIHRoaXMudG8gPSBzYW5pdGl6ZV9waG9uZV9udW1iZXIoZXZlbnQuVG8hKTtcbiAgICAgICAgdGhpcy5ib2R5ID0gZXZlbnQuQm9keT8udG9Mb3dlckNhc2UoKT8udHJpbSgpLnJlcGxhY2UoL1xccysvLCBcIi1cIik7XG4gICAgICAgIHRoaXMuYm9keV9yYXcgPSBldmVudC5Cb2R5XG4gICAgICAgIHRoaXMuYnZuc3BfbmV4dF9zdGVwID1cbiAgICAgICAgICAgIGV2ZW50LnJlcXVlc3QuY29va2llcy5idm5zcF9uZXh0X3N0ZXA7XG4gICAgICAgIHRoaXMuY29tYmluZWRfY29uZmlnID0geyAuLi5DT05GSUcsIC4uLmNvbnRleHQgfTtcbiAgICAgICAgdGhpcy5jb25maWcgPSB0aGlzLmNvbWJpbmVkX2NvbmZpZztcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy50d2lsaW9fY2xpZW50ID0gY29udGV4dC5nZXRUd2lsaW9DbGllbnQoKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBpbml0aWFsaXppbmcgdHdpbGlvX2NsaWVudFwiLCBlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN5bmNfc2lkID0gY29udGV4dC5TWU5DX1NJRDtcbiAgICAgICAgdGhpcy5yZXNldF9zY3JpcHRfaWQgPSBjb250ZXh0LlNDUklQVF9JRDtcbiAgICAgICAgdGhpcy5wYXRyb2xsZXIgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuY2hlY2tpbl92YWx1ZXMgPSBuZXcgQ2hlY2tpblZhbHVlcyhDT05GSUcuQ0hFQ0tJTl9WQUxVRVMpO1xuICAgICAgICB0aGlzLmN1cnJlbnRfc2hlZXRfZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHRoaXMuc2VjdGlvbl92YWx1ZXMgPSBuZXcgU2VjdGlvblZhbHVlcyh0aGlzLmNvbWJpbmVkX2NvbmZpZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIHRoZSBmYXN0IGNoZWNrLWluIG1vZGUgZnJvbSB0aGUgbWVzc2FnZSBib2R5LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5IC0gVGhlIG1lc3NhZ2UgYm9keS5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBmYXN0IGNoZWNrLWluIG1vZGUgaXMgcGFyc2VkLCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICovXG4gICAgcGFyc2VfZmFzdF9jaGVja2luX21vZGUoYm9keTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHBhcnNlZCA9IHRoaXMuY2hlY2tpbl92YWx1ZXMucGFyc2VfZmFzdF9jaGVja2luKGJvZHkpO1xuICAgICAgICBpZiAocGFyc2VkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tpbl9tb2RlID0gcGFyc2VkLmtleTtcbiAgICAgICAgICAgIHRoaXMuZmFzdF9jaGVja2luID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZXMgdGhlIGNoZWNrLWluIG1vZGUgZnJvbSB0aGUgbWVzc2FnZSBib2R5LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5IC0gVGhlIG1lc3NhZ2UgYm9keS5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBjaGVjay1pbiBtb2RlIGlzIHBhcnNlZCwgb3RoZXJ3aXNlIGZhbHNlLlxuICAgICAqL1xuICAgIHBhcnNlX2NoZWNraW4oYm9keTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHBhcnNlZCA9IHRoaXMuY2hlY2tpbl92YWx1ZXMucGFyc2VfY2hlY2tpbihib2R5KTtcbiAgICAgICAgaWYgKHBhcnNlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNraW5fbW9kZSA9IHBhcnNlZC5rZXk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIHRoZSBjaGVjay1pbiBtb2RlIGZyb20gdGhlIG5leHQgc3RlcC5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBjaGVjay1pbiBtb2RlIGlzIHBhcnNlZCwgb3RoZXJ3aXNlIGZhbHNlLlxuICAgICAqL1xuICAgIHBhcnNlX2NoZWNraW5fZnJvbV9uZXh0X3N0ZXAoKSB7XG4gICAgICAgIGNvbnN0IGxhc3Rfc2VnbWVudCA9IHRoaXMuYnZuc3BfbmV4dF9zdGVwXG4gICAgICAgICAgICA/LnNwbGl0KFwiLVwiKVxuICAgICAgICAgICAgLnNsaWNlKC0xKVswXTtcbiAgICAgICAgaWYgKGxhc3Rfc2VnbWVudCAmJiBsYXN0X3NlZ21lbnQgaW4gdGhpcy5jaGVja2luX3ZhbHVlcy5ieV9rZXkpIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tpbl9tb2RlID0gbGFzdF9zZWdtZW50O1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlbGF5cyB0aGUgZXhlY3V0aW9uIGZvciBhIHNwZWNpZmllZCBudW1iZXIgb2Ygc2Vjb25kcy5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2Vjb25kcyAtIFRoZSBudW1iZXIgb2Ygc2Vjb25kcyB0byBkZWxheS5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25hbD1mYWxzZV0gLSBXaGV0aGVyIHRoZSBkZWxheSBpcyBvcHRpb25hbC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgYWZ0ZXIgdGhlIGRlbGF5LlxuICAgICAqL1xuICAgIGRlbGF5KHNlY29uZHM6IG51bWJlciwgb3B0aW9uYWw6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBpZiAob3B0aW9uYWwgJiYgIXRoaXMuc21zX3JlcXVlc3QpIHtcbiAgICAgICAgICAgIHNlY29uZHMgPSAxIC8gMTAwMC4wO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzKSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJlcywgc2Vjb25kcyAqIDEwMDApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kcyBhIG1lc3NhZ2UgdG8gdGhlIHVzZXIuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSBUaGUgbWVzc2FnZSB0byBzZW5kLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBtZXNzYWdlIGlzIHNlbnQuXG4gICAgICovXG4gICAgYXN5bmMgc2VuZF9tZXNzYWdlKG1lc3NhZ2U6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5zbXNfcmVxdWVzdCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXRfdHdpbGlvX2NsaWVudCgpLm1lc3NhZ2VzLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgdG86IHRoaXMuZnJvbSxcbiAgICAgICAgICAgICAgICBmcm9tOiB0aGlzLnRvLFxuICAgICAgICAgICAgICAgIGJvZHk6IG1lc3NhZ2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVzdWx0X21lc3NhZ2VzLnB1c2gobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIHRoZSBjaGVjay1pbiBwcm9jZXNzLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBjaGVjay1pbiByZXNwb25zZS5cbiAgICAgKi9cbiAgICBhc3luYyBoYW5kbGUoKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2hhbmRsZSgpO1xuICAgICAgICBpZiAoIXRoaXMuc21zX3JlcXVlc3QpIHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQ/LnJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHRfbWVzc2FnZXMucHVzaChyZXN1bHQucmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogdGhpcy5yZXN1bHRfbWVzc2FnZXMuam9pbihcIlxcbiMjI1xcblwiKSxcbiAgICAgICAgICAgICAgICBuZXh0X3N0ZXA6IHJlc3VsdD8ubmV4dF9zdGVwLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEludGVybmFsIG1ldGhvZCB0byBoYW5kbGUgdGhlIGNoZWNrLWluIHByb2Nlc3MuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGNoZWNrLWluIHJlc3BvbnNlLlxuICAgICAqL1xuICAgIGFzeW5jIF9oYW5kbGUoKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgYFJlY2VpdmVkIHJlcXVlc3QgZnJvbSAke3RoaXMuZnJvbX0gd2l0aCBib2R5OiAke3RoaXMuYm9keX0gYW5kIHN0YXRlICR7dGhpcy5idm5zcF9uZXh0X3N0ZXB9YFxuICAgICAgICApO1xuICAgICAgICBpZiAodGhpcy5ib2R5ID09IFwibG9nb3V0XCIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIGxvZ291dGApO1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMubG9nb3V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlc3BvbnNlOiBCVk5TUFJlc3BvbnNlIHwgdW5kZWZpbmVkO1xuICAgICAgICBpZiAoIXRoaXMuY29uZmlnLlVTRV9TRVJWSUNFX0FDQ09VTlQpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlID0gYXdhaXQgdGhpcy5jaGVja191c2VyX2NyZWRzKCk7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UpIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5ib2R5Py50b0xvd2VyQ2FzZSgpID09PSBcInJlc3RhcnRcIikge1xuICAgICAgICAgICAgcmV0dXJuIHtyZXNwb25zZTogXCJPa2F5LiBUZXh0IG1lIGFnYWluIHRvIHN0YXJ0IG92ZXIuLi5cIn07XG4gICAgICAgIH1cblxuICAgICAgICByZXNwb25zZSA9IGF3YWl0IHRoaXMuZ2V0X21hcHBlZF9wYXRyb2xsZXIoKTtcbiAgICAgICAgaWYgKHJlc3BvbnNlIHx8IHRoaXMucGF0cm9sbGVyID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UgfHwge1xuICAgICAgICAgICAgICAgICAgICByZXNwb25zZTogXCJVbmV4cGVjdGVkIGVycm9yIGxvb2tpbmcgdXAgcGF0cm9sbGVyIG1hcHBpbmdcIixcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgKCF0aGlzLmJ2bnNwX25leHRfc3RlcCB8fFxuICAgICAgICAgICAgICAgIHRoaXMuYnZuc3BfbmV4dF9zdGVwID09IE5FWFRfU1RFUFMuQVdBSVRfQ09NTUFORCkgJiZcbiAgICAgICAgICAgIHRoaXMuYm9keVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnN0IGF3YWl0X3Jlc3BvbnNlID0gYXdhaXQgdGhpcy5oYW5kbGVfYXdhaXRfY29tbWFuZCgpO1xuICAgICAgICAgICAgaWYgKGF3YWl0X3Jlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0X3Jlc3BvbnNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgdGhpcy5idm5zcF9uZXh0X3N0ZXAgPT0gTkVYVF9TVEVQUy5BV0FJVF9DSEVDS0lOICYmXG4gICAgICAgICAgICB0aGlzLmJvZHlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wYXJzZV9jaGVja2luKHRoaXMuYm9keSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5jaGVja2luKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICB0aGlzLmJ2bnNwX25leHRfc3RlcD8uc3RhcnRzV2l0aChcbiAgICAgICAgICAgICAgICBORVhUX1NURVBTLkNPTkZJUk1fUkVTRVRcbiAgICAgICAgICAgICkgJiZcbiAgICAgICAgICAgIHRoaXMuYm9keVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmJvZHkgPT0gXCJ5ZXNcIiAmJiB0aGlzLnBhcnNlX2NoZWNraW5fZnJvbV9uZXh0X3N0ZXAoKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgICAgICBgUGVyZm9ybWluZyByZXNldF9zaGVldF9mbG93IGZvciAke3RoaXMucGF0cm9sbGVyLm5hbWV9IHdpdGggY2hlY2tpbiBtb2RlOiAke3RoaXMuY2hlY2tpbl9tb2RlfWBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIChhd2FpdCB0aGlzLnJlc2V0X3NoZWV0X2Zsb3coKSkgfHwgKGF3YWl0IHRoaXMuY2hlY2tpbigpKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICB0aGlzLmJ2bnNwX25leHRfc3RlcD8uc3RhcnRzV2l0aChORVhUX1NURVBTLkFVVEhfUkVTRVQpXG4gICAgICAgICkge1xuICAgICAgICAgICAgaWYgKHRoaXMucGFyc2VfY2hlY2tpbl9mcm9tX25leHRfc3RlcCgpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgICAgIGBQZXJmb3JtaW5nIHJlc2V0X3NoZWV0X2Zsb3ctcG9zdC1hdXRoIGZvciAke3RoaXMucGF0cm9sbGVyLm5hbWV9IHdpdGggY2hlY2tpbiBtb2RlOiAke3RoaXMuY2hlY2tpbl9tb2RlfWBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIChhd2FpdCB0aGlzLnJlc2V0X3NoZWV0X2Zsb3coKSkgfHwgKGF3YWl0IHRoaXMuY2hlY2tpbigpKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICB0aGlzLmJ2bnNwX25leHRfc3RlcD8uc3RhcnRzV2l0aChORVhUX1NURVBTLkFXQUlUX1NFQ1RJT04pICYmXG4gICAgICAgICAgICB0aGlzLmJvZHlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zdCBzZWN0aW9uID0gdGhpcy5zZWN0aW9uX3ZhbHVlcy5wYXJzZV9zZWN0aW9uKHRoaXMuYm9keSlcbiAgICAgICAgICAgIGlmIChzZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuYXNzaWduX3NlY3Rpb24oc2VjdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5wcm9tcHRfc2VjdGlvbl9hc3NpZ25tZW50KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICB0aGlzLmJ2bnNwX25leHRfc3RlcCA9PT0gTkVYVF9TVEVQUy5BV0FJVF9NRVNTQUdFICYmXG4gICAgICAgICAgICB0aGlzLmJvZHlfcmF3XG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuc2VuZF90ZXh0X21lc3NhZ2UodGhpcy5ib2R5X3Jhdyk7XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICB0aGlzLmJ2bnNwX25leHRfc3RlcCA9PT0gTkVYVF9TVEVQUy5BV0FJVF9CUk9BRENBU1QgJiZcbiAgICAgICAgICAgIHRoaXMuYm9keV9yYXdcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5zZW5kX2Jyb2FkY2FzdF9tZXNzYWdlKHRoaXMuYm9keV9yYXcpO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgdGhpcy5idm5zcF9uZXh0X3N0ZXA/LnN0YXJ0c1dpdGgoTkVYVF9TVEVQUy5BV0FJVF9CRUFDT04pICYmXG4gICAgICAgICAgICB0aGlzLmJvZHlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zdCBiZWFjb25fc2VhcmNoX2xvY2F0aW9uID0gYXdhaXQgdGhpcy5wYXJzZV9iZWFjb25fc2VhcmNoX2xvY2F0aW9uKHRoaXMuYm9keSlcbiAgICAgICAgICAgIGlmIChiZWFjb25fc2VhcmNoX2xvY2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuc2V0X2JlYWNvbl9zZWFyY2goYmVhY29uX3NlYXJjaF9sb2NhdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5wcm9tcHRfYmVhY29uX3NlYXJjaCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYnZuc3BfbmV4dF9zdGVwKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnNlbmRfbWVzc2FnZShcIlNvcnJ5LCBJIGRpZG4ndCB1bmRlcnN0YW5kIHRoYXQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnByb21wdF9jb21tYW5kKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlcyB0aGUgYXdhaXQgY29tbWFuZCBzdGVwLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2UgfCB1bmRlZmluZWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSByZXNwb25zZSBvciB1bmRlZmluZWQuXG4gICAgICovXG4gICAgYXN5bmMgaGFuZGxlX2F3YWl0X2NvbW1hbmQoKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlIHwgdW5kZWZpbmVkPiB7XG4gICAgICAgIGNvbnN0IHBhdHJvbGxlcl9uYW1lID0gdGhpcy5wYXRyb2xsZXIhLm5hbWU7XG4gICAgICAgIGlmICh0aGlzLnBhcnNlX2Zhc3RfY2hlY2tpbl9tb2RlKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICBgUGVyZm9ybWluZyBmYXN0IGNoZWNraW4gZm9yICR7cGF0cm9sbGVyX25hbWV9IHdpdGggbW9kZTogJHt0aGlzLmNoZWNraW5fbW9kZX1gXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuY2hlY2tpbigpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDT01NQU5EUy5PTl9EVVRZLmluY2x1ZGVzKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBnZXRfb25fZHV0eSBmb3IgJHtwYXRyb2xsZXJfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiB7IHJlc3BvbnNlOiBhd2FpdCB0aGlzLmdldF9vbl9kdXR5KCkgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhcIkNoZWNraW5nIGZvciBzdGF0dXMuLi5cIik7XG4gICAgICAgIGlmIChDT01NQU5EUy5TVEFUVVMuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIGdldF9zdGF0dXMgZm9yICR7cGF0cm9sbGVyX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRfc3RhdHVzKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKENPTU1BTkRTLkNIRUNLSU4uaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIHByb21wdF9jaGVja2luIGZvciAke3BhdHJvbGxlcl9uYW1lfWApO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvbXB0X2NoZWNraW4oKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQ09NTUFORFMuR1VFU1RfUEFTUy5pbmNsdWRlcyh0aGlzLmJvZHkhKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmZvcm1pbmcgc2V0X2d1ZXN0X3Bhc3MgZm9yICR7cGF0cm9sbGVyX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5zZXRfZ3Vlc3RfcGFzcygpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDT01NQU5EUy5CRUFDT04uaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIHByb21wdF9iZWFjb24gZm9yICR7cGF0cm9sbGVyX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5wcm9tcHRfYmVhY29uX3NlYXJjaCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnBhcnNlX2Zhc3Rfc2VjdGlvbl9hc3NpZ25tZW50KHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBmYXN0IHNlY3Rpb25fYXNzaWdubWVudCBmb3IgJHtwYXRyb2xsZXJfbmFtZX0gdG8gJHt0aGlzLmFzc2lnbmVkX3NlY3Rpb259YCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5hc3NpZ25fc2VjdGlvbih0aGlzLmFzc2lnbmVkX3NlY3Rpb24pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDT01NQU5EUy5TRUNUSU9OX0FTU0lHTk1FTlQuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIHNlY3Rpb25fYXNzaWdubWVudCBmb3IgJHtwYXRyb2xsZXJfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnByb21wdF9zZWN0aW9uX2Fzc2lnbm1lbnQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQ09NTUFORFMuV0hBVFNBUFAuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBJJ20gYXZhaWxhYmxlIG9uIFdoYXRzQXBwIGFzIHdlbGwhIFdoYXRzQXBwIHVzZXMgV2lmaS9DZWxsIERhdGEgaW5zdGVhZCBvZiBTTVMsIGFuZCBjYW4gYmUgbW9yZSByZWxpYWJsZS4gTWVzc2FnZSBtZSBhdCBodHRwczovL3dhLm1lLzEke3RoaXMudG99YCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKENPTU1BTkRTLk1FU1NBR0UuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIG1lc3NhZ2UgZm9yICR7cGF0cm9sbGVyX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5wcm9tcHRfbWVzc2FnZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDT01NQU5EUy5CUk9BRENBU1QuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIGJyb2FkY2FzdCBmb3IgJHtwYXRyb2xsZXJfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnByb21wdF9icm9hZGNhc3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb21wdHMgdGhlIHVzZXIgZm9yIGEgY29tbWFuZC5cbiAgICAgKiBAcmV0dXJucyB7QlZOU1BSZXNwb25zZX0gVGhlIHJlc3BvbnNlIHByb21wdGluZyB0aGUgdXNlciBmb3IgYSBjb21tYW5kLlxuICAgICAqL1xuICAgIHByb21wdF9jb21tYW5kKCk6IEJWTlNQUmVzcG9uc2Uge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IGAke3RoaXMucGF0cm9sbGVyIS5uYW1lfSwgSSdtIHRoZSBCVk5TUCBCb3QuXG5FbnRlciBhIGNvbW1hbmQ6XG5DaGVjayBpbiAvIENoZWNrIG91dCAvIFN0YXR1cyAvIEJlYWNvbiAvIFNlY3Rpb24gQXNzaWdubWVudCAvIEd1ZXN0IFBhc3MgLyBPbiBEdXR5IC8gTWVzc2FnZSAvIFdoYXRzQXBwXG5TZW5kICdyZXN0YXJ0JyBhdCBhbnkgdGltZSB0byBiZWdpbiBhZ2FpbmAsXG4gICAgICAgICAgICBuZXh0X3N0ZXA6IE5FWFRfU1RFUFMuQVdBSVRfQ09NTUFORCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm9tcHRzIHRoZSB1c2VyIGZvciBhIGNoZWNrLWluLlxuICAgICAqIEByZXR1cm5zIHtCVk5TUFJlc3BvbnNlfSBUaGUgcmVzcG9uc2UgcHJvbXB0aW5nIHRoZSB1c2VyIGZvciBhIGNoZWNrLWluLlxuICAgICAqL1xuICAgIHByb21wdF9jaGVja2luKCk6IEJWTlNQUmVzcG9uc2Uge1xuICAgICAgICBjb25zdCB0eXBlcyA9IE9iamVjdC52YWx1ZXModGhpcy5jaGVja2luX3ZhbHVlcy5ieV9rZXkpLm1hcChcbiAgICAgICAgICAgICh4KSA9PiB4LnNtc19kZXNjXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZTogYCR7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXIhLm5hbWVcbiAgICAgICAgICAgIH0sIHVwZGF0ZSBwYXRyb2xsaW5nIHN0YXR1cyB0bzogJHt0eXBlc1xuICAgICAgICAgICAgICAgIC5zbGljZSgwLCAtMSlcbiAgICAgICAgICAgICAgICAuam9pbihcIiwgXCIpfSwgb3IgJHt0eXBlcy5zbGljZSgtMSl9P2AsXG4gICAgICAgICAgICBuZXh0X3N0ZXA6IE5FWFRfU1RFUFMuQVdBSVRfQ0hFQ0tJTixcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIFBhcnNlcyB0aGUgZmFzdCBzZWN0aW9uIGFzc2lnbm1lbnQgZnJvbSB0aGUgbWVzc2FnZSBib2R5LlxuICAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHkgLSBUaGUgbWVzc2FnZSBib2R5LlxuICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNlY3Rpb24gYXNzaWdubWVudCBpcyBwYXJzZWQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAqL1xuICAgIHBhcnNlX2Zhc3Rfc2VjdGlvbl9hc3NpZ25tZW50KGJvZHk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHRoaXMuYXNzaWduZWRfc2VjdGlvbiA9IG51bGw7XG4gICAgaWYgKCFib2R5IHx8ICFib2R5LmluY2x1ZGVzKFwiLVwiKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHNlZ21lbnRzID0gYm9keS5zcGxpdChcIi1cIik7XG4gICAgY29uc3QgbGFzdFNlZ21lbnQgPSBzZWdtZW50cy5wb3AoKTtcbiAgICBjb25zdCBmaXJzdFBhcnQgPSBzZWdtZW50cy5qb2luKFwiLVwiKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgaWYgKGxhc3RTZWdtZW50ICYmIENPTU1BTkRTLlNFQ1RJT05fQVNTSUdOTUVOVC5pbmNsdWRlcyhmaXJzdFBhcnQpKSB7XG4gICAgICAgIHRoaXMuYXNzaWduZWRfc2VjdGlvbiA9IHRoaXMuc2VjdGlvbl92YWx1ZXMubWFwX3NlY3Rpb24obGFzdFNlZ21lbnQudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgIHJldHVybiB0aGlzLmFzc2lnbmVkX3NlY3Rpb24gIT09IG51bGwgJiYgdGhpcy5hc3NpZ25lZF9zZWN0aW9uICE9PSBcIlwiO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvbXB0cyB0aGUgdXNlciBmb3Igc2VjdGlvbiBhc3NpZ25tZW50LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSByZXNwb25zZS5cbiAgICAgKi9cbiAgICBhc3luYyBwcm9tcHRfc2VjdGlvbl9hc3NpZ25tZW50KCk6IFByb21pc2U8QlZOU1BSZXNwb25zZT4ge1xuICAgICAgICBpZiAoIXRoaXMucGF0cm9sbGVyIHx8ICF0aGlzLnBhdHJvbGxlci5jaGVja2luKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgJHt0aGlzLnBhdHJvbGxlciEubmFtZX0gaXMgbm90IGNoZWNrZWQgaW4uYCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2VjdGlvbl9kZXNjcmlwdGlvbiA9IHRoaXMuc2VjdGlvbl92YWx1ZXMuZ2V0X3NlY3Rpb25fZGVzY3JpcHRpb24oKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3BvbnNlOiBgRW50ZXIgeW91ciBhc3NpZ25lZCBzZWN0aW9uOyBvbmUgb2YgJHtzZWN0aW9uX2Rlc2NyaXB0aW9ufSAob3IgJ3Jlc3RhcnQnKWAsXG4gICAgICAgICAgICBuZXh0X3N0ZXA6IE5FWFRfU1RFUFMuQVdBSVRfU0VDVElPTixcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCdWlsZHMgdGhlIG1lc3NhZ2UgcHJlZml4IGZvciBhIHRleHQgbWVzc2FnZSBmcm9tIGEgcGF0cm9sbGVyLlxuICAgICAqIEluY2x1ZGVzIHRoZSBzZW5kZXIncyBuYW1lIGFuZCBmb3JtYXR0ZWQgcGhvbmUgbnVtYmVyLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZW5kZXJfbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwYXRyb2xsZXIgc2VuZGluZyB0aGUgbWVzc2FnZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VuZGVyX3Bob25lIC0gVGhlIHNlbmRlcidzIDEwLWRpZ2l0IHBob25lIG51bWJlci5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgbWVzc2FnZSBwcmVmaXguIGZvciBleGFtcGxlIDogXCJNZXNzYWdlIGZyb20gSm9obiBEb2UgKDEyMyk0NTYtNzg5MFwiLlxuICAgICAqL1xuICAgIGdldF9tZXNzYWdlX3ByZWZpeChzZW5kZXJfbmFtZTogc3RyaW5nLCBzZW5kZXJfcGhvbmU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZF9waG9uZSA9IGZvcm1hdF9waG9uZV9mb3JfZGlzcGxheShzZW5kZXJfcGhvbmUpO1xuICAgICAgICByZXR1cm4gYCR7TUVTU0FHRV9QUkVGSVhfVEVNUExBVEV9JHtzZW5kZXJfbmFtZX0gJHtmb3JtYXR0ZWRfcGhvbmV9JHtNRVNTQUdFX1BSRUZJWF9TVUZGSVh9YDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGVzIHRoZSBtYXhpbXVtIGFsbG93ZWQgbWVzc2FnZSBsZW5ndGggZm9yIGEgdGV4dCBtZXNzYWdlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZW5kZXJfbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwYXRyb2xsZXIgc2VuZGluZyB0aGUgbWVzc2FnZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VuZGVyX3Bob25lIC0gVGhlIHNlbmRlcidzIDEwLWRpZ2l0IHBob25lIG51bWJlci5cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgbWF4aW11bSBudW1iZXIgb2YgY2hhcmFjdGVycyB0aGUgdXNlcidzIG1lc3NhZ2UgY2FuIGNvbnRhaW4uXG4gICAgICovXG4gICAgZ2V0X21heF9tZXNzYWdlX2xlbmd0aChzZW5kZXJfbmFtZTogc3RyaW5nLCBzZW5kZXJfcGhvbmU6IHN0cmluZyk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBTTVNfTUFYX0xFTkdUSCAtIHRoaXMuZ2V0X21lc3NhZ2VfcHJlZml4KHNlbmRlcl9uYW1lLCBzZW5kZXJfcGhvbmUpLmxlbmd0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm9tcHRzIHRoZSB1c2VyIHRvIHR5cGUgdGhlaXIgdGV4dCBtZXNzYWdlLlxuICAgICAqIEFueSBwYXRyb2xsZXIgd2l0aCBhIHZhbGlkIHBob25lIG51bWJlciBjYW4gc2VuZCBhIG1lc3NhZ2UsIHJlZ2FyZGxlc3NcbiAgICAgKiBvZiB0aGVpciBvd24gY2hlY2staW4gc3RhdHVzLiAgVGhlIHJlY2lwaWVudCBsaXN0IGluY2x1ZGVzIGFsbFxuICAgICAqIHBhdHJvbGxlcnMgd2hvIGhhdmUgYW55IGNoZWNrLWluIHN0YXR1cyAoQWxsIERheSwgSGFsZiBBTSwgSGFsZiBQTSxcbiAgICAgKiBvciBDaGVja2VkIE91dCksIGluY2x1ZGluZyB0aGUgc2VuZGVyIHRoZW1zZWx2ZXMgaWYgdGhleSBhcmUgY2hlY2tlZCBpbi5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcHJvbXB0IHJlc3BvbnNlLlxuICAgICAqL1xuICAgIGFzeW5jIHByb21wdF9tZXNzYWdlKCk6IFByb21pc2U8QlZOU1BSZXNwb25zZT4ge1xuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG4gICAgICAgIGNvbnN0IHJlY2lwaWVudHMgPSBsb2dpbl9zaGVldC5nZXRfb25fZHV0eV9wYXRyb2xsZXJzKCk7XG4gICAgICAgIGlmIChyZWNpcGllbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYE5vIHBhdHJvbGxlcnMgYXJlIGN1cnJlbnRseSBsb2dnZWQgaW4uIFRoZXJlIGlzIG5vYm9keSB0byBzZW5kIGEgbWVzc2FnZSB0by5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZW5kZXJfcGhvbmUgPSBzYW5pdGl6ZV9waG9uZV9udW1iZXIodGhpcy5mcm9tKTtcbiAgICAgICAgY29uc3QgbWF4X2xlbmd0aCA9IHRoaXMuZ2V0X21heF9tZXNzYWdlX2xlbmd0aCh0aGlzLnBhdHJvbGxlciEubmFtZSwgc2VuZGVyX3Bob25lKTtcbiAgICAgICAgaWYgKG1heF9sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYFlvdXIgbmFtZSBpcyB0b28gbG9uZyB0byBzZW5kIGEgdGV4dCBtZXNzYWdlLmAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZTogYFBsZWFzZSB0eXBlIGEgbWVzc2FnZSBvZiBubyBtb3JlIHRoYW4gJHttYXhfbGVuZ3RofSBwbGFpbi10ZXh0IGNoYXJhY3RlcnMgdG8gJHtyZWNpcGllbnRzLmxlbmd0aH0gcGF0cm9sbGVyJHtyZWNpcGllbnRzLmxlbmd0aCAhPT0gMSA/IFwic1wiIDogXCJcIn0sIG9yICdyZXN0YXJ0JyB0byBjYW5jZWwuYCxcbiAgICAgICAgICAgIG5leHRfc3RlcDogTkVYVF9TVEVQUy5BV0FJVF9NRVNTQUdFLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbmRzIGEgdGV4dCBtZXNzYWdlIHRvIGFsbCBwYXRyb2xsZXJzIHdpdGggYSBjaGVjay1pbiBzdGF0dXMgZm9yIHRoZSBkYXkuXG4gICAgICogVGhlIHNlbmRlciBhbHNvIHJlY2VpdmVzIHRoZSBtZXNzYWdlIGlmIHRoZXkgaGF2ZSBhIGNoZWNrLWluIHN0YXR1cy5cbiAgICAgKiBWYWxpZGF0ZXMgdGhhdCB0aGUgY29tcGxldGUgbWVzc2FnZSAocHJlZml4ICsgYm9keSkgdXNlcyBvbmx5IEdTTS03XG4gICAgICogY2hhcmFjdGVycyBhbmQgZml0cyB3aXRoaW4gYSBzaW5nbGUgU01TIHNlZ21lbnQsIHVzaW5nIHRoZVxuICAgICAqIHNtcy1zZWdtZW50cy1jYWxjdWxhdG9yIGxpYnJhcnkuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VfdGV4dCAtIFRoZSByYXcgbWVzc2FnZSB0ZXh0IGZyb20gdGhlIHNlbmRlci5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgc2VuZCByZXN1bHQuXG4gICAgICovXG4gICAgYXN5bmMgc2VuZF90ZXh0X21lc3NhZ2UobWVzc2FnZV90ZXh0OiBzdHJpbmcpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3Qgc2VuZGVyX25hbWUgPSB0aGlzLnBhdHJvbGxlciEubmFtZTtcbiAgICAgICAgY29uc3Qgc2VuZGVyX3Bob25lID0gc2FuaXRpemVfcGhvbmVfbnVtYmVyKHRoaXMuZnJvbSk7XG4gICAgICAgIGNvbnN0IHByZWZpeCA9IHRoaXMuZ2V0X21lc3NhZ2VfcHJlZml4KHNlbmRlcl9uYW1lLCBzZW5kZXJfcGhvbmUpO1xuICAgICAgICBjb25zdCBtYXhfbGVuZ3RoID0gdGhpcy5nZXRfbWF4X21lc3NhZ2VfbGVuZ3RoKHNlbmRlcl9uYW1lLCBzZW5kZXJfcGhvbmUpO1xuICAgICAgICBjb25zdCBmdWxsX21lc3NhZ2UgPSBwcmVmaXggKyBtZXNzYWdlX3RleHQ7XG5cbiAgICAgICAgY29uc3QgdmFsaWRhdGlvbiA9IHZhbGlkYXRlX3Ntc19tZXNzYWdlKGZ1bGxfbWVzc2FnZSk7XG4gICAgICAgIGlmICghdmFsaWRhdGlvbi52YWxpZCkge1xuICAgICAgICAgICAgaWYgKHZhbGlkYXRpb24ucmVhc29uID09PSBcIm5vbl9nc203XCIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBiYWRfY2hhcnMgPSB2YWxpZGF0aW9uLm5vbl9nc21fY2hhcmFjdGVycyEuam9pbihcIiBcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBZb3VyIG1lc3NhZ2UgY29udGFpbnMgY2hhcmFjdGVycyB0aGF0IGFyZSBub3Qgc3VwcG9ydGVkIGluIHBsYWluLXRleHQgU01TOiAke2JhZF9jaGFyc30uIFBsZWFzZSB1c2Ugb25seSBzdGFuZGFyZCBjaGFyYWN0ZXJzIGFuZCB0cnkgYWdhaW4uYCxcbiAgICAgICAgICAgICAgICAgICAgbmV4dF9zdGVwOiBORVhUX1NURVBTLkFXQUlUX01FU1NBR0UsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBZb3VyIG1lc3NhZ2UgaXMgJHttZXNzYWdlX3RleHQubGVuZ3RofSBjaGFyYWN0ZXJzLCB3aGljaCBleGNlZWRzIHRoZSBsaW1pdCBvZiAke21heF9sZW5ndGh9LiBQbGVhc2Ugc2hvcnRlbiB5b3VyIG1lc3NhZ2UgYW5kIHRyeSBhZ2Fpbiwgb3IgdHlwZSAncmVzdGFydCcgdG8gY2FuY2VsLmAsXG4gICAgICAgICAgICAgICAgbmV4dF9zdGVwOiBORVhUX1NURVBTLkFXQUlUX01FU1NBR0UsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuICAgICAgICBjb25zdCBzaWduZWRfaW5fcGF0cm9sbGVycyA9IGxvZ2luX3NoZWV0LmdldF9vbl9kdXR5X3BhdHJvbGxlcnMoKTtcbiAgICAgICAgY29uc3QgcGhvbmVfbWFwID0gYXdhaXQgdGhpcy5nZXRfcGhvbmVfbnVtYmVyX21hcCgpO1xuXG4gICAgICAgIC8vIEJ1aWxkIHJlY2lwaWVudCBtYXAgZm9yIG9uLWR1dHkgcGF0cm9sbGVycyB3aXRoIGtub3duIHBob25lczsgdHJhY2sgbWlzc2luZ1xuICAgICAgICBjb25zdCByZWNpcGllbnRfbWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge307XG4gICAgICAgIGNvbnN0IG5vX3Bob25lX25hbWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IHBhdHJvbGxlciBvZiBzaWduZWRfaW5fcGF0cm9sbGVycykge1xuICAgICAgICAgICAgY29uc3QgcGhvbmUgPSBwaG9uZV9tYXBbcGF0cm9sbGVyLm5hbWVdO1xuICAgICAgICAgICAgaWYgKHBob25lKSB7XG4gICAgICAgICAgICAgICAgcmVjaXBpZW50X21hcFtwYXRyb2xsZXIubmFtZV0gPSBwaG9uZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbm9fcGhvbmVfbmFtZXMucHVzaChwYXRyb2xsZXIubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB7IHNlbnRfY291bnQsIGNvcHlfc2VudF90b19zZW5kZXIsIGZhaWxlZF9uYW1lcyB9ID1cbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZGVsaXZlcl9zbXNfdG9fbWFwKHJlY2lwaWVudF9tYXAsIGZ1bGxfbWVzc2FnZSwgc2VuZGVyX25hbWUpO1xuXG4gICAgICAgIGF3YWl0IHRoaXMubG9nX2FjdGlvbihgdGV4dF9tZXNzYWdlKCR7c2VudF9jb3VudCArIChjb3B5X3NlbnRfdG9fc2VuZGVyID8gMSA6IDApfSlgKTtcblxuICAgICAgICBsZXQgcmVzcG9uc2UgPSBgTWVzc2FnZSBzZW50IHRvICR7c2VudF9jb3VudH0gcGF0cm9sbGVyJHtzZW50X2NvdW50ICE9PSAxID8gXCJzXCIgOiBcIlwifWA7XG4gICAgICAgIGlmIChjb3B5X3NlbnRfdG9fc2VuZGVyKSB7XG4gICAgICAgICAgICByZXNwb25zZSArPSBgIGFuZCBhIGNvcHkgdG8geW91LmA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNwb25zZSArPSBgLmA7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYWxsX2ZhaWxlZCA9IFsuLi5ub19waG9uZV9uYW1lcywgLi4uZmFpbGVkX25hbWVzXTtcbiAgICAgICAgaWYgKGFsbF9mYWlsZWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmVzcG9uc2UgKz0gYCBDb3VsZCBub3Qgc2VuZCB0bzogJHthbGxfZmFpbGVkLmpvaW4oXCIsIFwiKX0uYDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyByZXNwb25zZSB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvcmUgU01TIGRlbGl2ZXJ5IGxvb3AuIFNlbmRzIGZ1bGxfbWVzc2FnZSB0byBlYWNoIGVudHJ5IGluIHJlY2lwaWVudF9tYXBcbiAgICAgKiAobmFtZSDihpIgXCIrMVhYWFhYWFhYWFhcIikuIElmIHRoZSBzZW5kZXIncyBwaG9uZSBpcyBub3QgYW1vbmcgdGhlIHJlY2lwaWVudHMsXG4gICAgICogYSBjb3B5IGlzIHNlbnQgdG8gdGhpcy5mcm9tLiBSZXR1cm5zIGRlbGl2ZXJ5IGFjY291bnRpbmcgZGF0YS5cbiAgICAgKiBAcGFyYW0ge1JlY29yZDxzdHJpbmcsIHN0cmluZz59IHJlY2lwaWVudF9tYXAgLSBNYXAgb2YgcGF0cm9sbGVyIG5hbWUgdG8gXCIrMVhYWFhYWFhYWFhcIiBwaG9uZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZnVsbF9tZXNzYWdlIC0gVGhlIGNvbXBsZXRlIGZvcm1hdHRlZCBTTVMgdG8gc2VuZC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VuZGVyX25hbWUgLSBUaGUgc2VuZGVyJ3MgbmFtZSAodXNlZCBmb3IgZmFpbHVyZSBsb2dnaW5nKS5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxvYmplY3Q+fSBEZWxpdmVyeSBjb3VudHMgYW5kIGZhaWx1cmUgbGlzdC5cbiAgICAgKi9cbiAgICBhc3luYyBkZWxpdmVyX3Ntc190b19tYXAoXG4gICAgICAgIHJlY2lwaWVudF9tYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4sXG4gICAgICAgIGZ1bGxfbWVzc2FnZTogc3RyaW5nLFxuICAgICAgICBzZW5kZXJfbmFtZTogc3RyaW5nLFxuICAgICk6IFByb21pc2U8eyBzZW50X2NvdW50OiBudW1iZXI7IGNvcHlfc2VudF90b19zZW5kZXI6IGJvb2xlYW47IGZhaWxlZF9uYW1lczogc3RyaW5nW10gfT4ge1xuICAgICAgICBsZXQgc2VudF9jb3VudCA9IDA7XG4gICAgICAgIGNvbnN0IGZhaWxlZF9uYW1lczogc3RyaW5nW10gPSBbXTtcblxuICAgICAgICBmb3IgKGNvbnN0IFtuYW1lLCBwaG9uZV0gb2YgT2JqZWN0LmVudHJpZXMocmVjaXBpZW50X21hcCkpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXRfdHdpbGlvX2NsaWVudCgpLm1lc3NhZ2VzLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHRvOiBwaG9uZSxcbiAgICAgICAgICAgICAgICAgICAgZnJvbTogdGhpcy50byxcbiAgICAgICAgICAgICAgICAgICAgYm9keTogZnVsbF9tZXNzYWdlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHNlbnRfY291bnQrKztcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgRmFpbGVkIHRvIHNlbmQgU01TIHRvICR7bmFtZX06ICR7ZX1gKTtcbiAgICAgICAgICAgICAgICBmYWlsZWRfbmFtZXMucHVzaChuYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNlbmQgYSBjb3B5IHRvIHRoZSBzZW5kZXIgaWYgdGhlaXIgbnVtYmVyIGlzIG5vdCBhbHJlYWR5IGluIHRoZSByZWNpcGllbnQgbWFwXG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZWRfc2VuZGVyID0gYCsxJHtzYW5pdGl6ZV9waG9uZV9udW1iZXIodGhpcy5mcm9tKX1gO1xuICAgICAgICBjb25zdCBzZW5kZXJfaW5fbWFwID0gT2JqZWN0LnZhbHVlcyhyZWNpcGllbnRfbWFwKS5pbmNsdWRlcyhub3JtYWxpemVkX3NlbmRlcik7XG4gICAgICAgIGxldCBjb3B5X3NlbnRfdG9fc2VuZGVyID0gZmFsc2U7XG4gICAgICAgIGlmICghc2VuZGVyX2luX21hcCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmdldF90d2lsaW9fY2xpZW50KCkubWVzc2FnZXMuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgdG86IHRoaXMuZnJvbSxcbiAgICAgICAgICAgICAgICAgICAgZnJvbTogdGhpcy50byxcbiAgICAgICAgICAgICAgICAgICAgYm9keTogZnVsbF9tZXNzYWdlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvcHlfc2VudF90b19zZW5kZXIgPSB0cnVlO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBGYWlsZWQgdG8gc2VuZCBTTVMgY29weSB0byBzZW5kZXIgJHtzZW5kZXJfbmFtZX06ICR7ZX1gKTtcbiAgICAgICAgICAgICAgICBmYWlsZWRfbmFtZXMucHVzaChzZW5kZXJfbmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geyBzZW50X2NvdW50LCBjb3B5X3NlbnRfdG9fc2VuZGVyLCBmYWlsZWRfbmFtZXMgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm9tcHRzIHRoZSB1c2VyIHRvIHR5cGUgYSBicm9hZGNhc3QgbWVzc2FnZSB0byBhbGwgcGF0cm9sbGVycy5cbiAgICAgKiBVbmxpa2UgdGhlIG1lc3NhZ2UgY29tbWFuZCAod2hpY2ggdGFyZ2V0cyBvbmx5IGxvZ2dlZC1pbiBwYXRyb2xsZXJzKSwgYnJvYWRjYXN0XG4gICAgICogc2VuZHMgdG8gZXZlcnkgcGF0cm9sbGVyIGluIHRoZSBQaG9uZSBOdW1iZXJzIHNoZWV0LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBwcm9tcHQgcmVzcG9uc2UuXG4gICAgICovXG4gICAgYXN5bmMgcHJvbXB0X2Jyb2FkY2FzdCgpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgcGhvbmVfbWFwID0gYXdhaXQgdGhpcy5nZXRfcGhvbmVfbnVtYmVyX21hcCgpO1xuICAgICAgICBjb25zdCByZWNpcGllbnRfY291bnQgPSBPYmplY3Qua2V5cyhwaG9uZV9tYXApLmxlbmd0aDtcbiAgICAgICAgaWYgKHJlY2lwaWVudF9jb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYE5vIHBhdHJvbGxlcnMgd2l0aCBwaG9uZSBudW1iZXJzIGZvdW5kLiBUaGVyZSBpcyBub2JvZHkgdG8gYnJvYWRjYXN0IHRvLmAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNlbmRlcl9waG9uZSA9IHNhbml0aXplX3Bob25lX251bWJlcih0aGlzLmZyb20pO1xuICAgICAgICBjb25zdCBtYXhfbGVuZ3RoID0gdGhpcy5nZXRfbWF4X21lc3NhZ2VfbGVuZ3RoKHRoaXMucGF0cm9sbGVyIS5uYW1lLCBzZW5kZXJfcGhvbmUpO1xuICAgICAgICBpZiAobWF4X2xlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgWW91ciBuYW1lIGlzIHRvbyBsb25nIHRvIHNlbmQgYSBicm9hZGNhc3QgbWVzc2FnZS5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IGBQbGVhc2UgdHlwZSBhIGJyb2FkY2FzdCBtZXNzYWdlIG9mIG5vIG1vcmUgdGhhbiAke21heF9sZW5ndGh9IHBsYWluLXRleHQgY2hhcmFjdGVycyB0byAke3JlY2lwaWVudF9jb3VudH0gcGF0cm9sbGVyJHtyZWNpcGllbnRfY291bnQgIT09IDEgPyBcInNcIiA6IFwiXCJ9LCBvciAncmVzdGFydCcgdG8gY2FuY2VsLmAsXG4gICAgICAgICAgICBuZXh0X3N0ZXA6IE5FWFRfU1RFUFMuQVdBSVRfQlJPQURDQVNULFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbmRzIGEgYnJvYWRjYXN0IG1lc3NhZ2UgdG8gQUxMIHBhdHJvbGxlcnMgaW4gdGhlIFBob25lIE51bWJlcnMgc2hlZXQsXG4gICAgICogcmVnYXJkbGVzcyBvZiBjaGVjay1pbiBzdGF0dXMuIFVzZXMgdGhlIHNhbWUgcHJlZml4IGZvcm1hdCBhbmQgR1NNLTcgLyBzaW5nbGUtc2VnbWVudFxuICAgICAqIHZhbGlkYXRpb24gYXMgdGhlIG1lc3NhZ2UgY29tbWFuZC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZV90ZXh0IC0gVGhlIHJhdyBtZXNzYWdlIHRleHQgZnJvbSB0aGUgc2VuZGVyLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBzZW5kIHJlc3VsdC5cbiAgICAgKi9cbiAgICBhc3luYyBzZW5kX2Jyb2FkY2FzdF9tZXNzYWdlKG1lc3NhZ2VfdGV4dDogc3RyaW5nKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnN0IHNlbmRlcl9uYW1lID0gdGhpcy5wYXRyb2xsZXIhLm5hbWU7XG4gICAgICAgIGNvbnN0IHNlbmRlcl9waG9uZSA9IHNhbml0aXplX3Bob25lX251bWJlcih0aGlzLmZyb20pO1xuICAgICAgICBjb25zdCBwcmVmaXggPSB0aGlzLmdldF9tZXNzYWdlX3ByZWZpeChzZW5kZXJfbmFtZSwgc2VuZGVyX3Bob25lKTtcbiAgICAgICAgY29uc3QgbWF4X2xlbmd0aCA9IHRoaXMuZ2V0X21heF9tZXNzYWdlX2xlbmd0aChzZW5kZXJfbmFtZSwgc2VuZGVyX3Bob25lKTtcbiAgICAgICAgY29uc3QgZnVsbF9tZXNzYWdlID0gcHJlZml4ICsgbWVzc2FnZV90ZXh0O1xuXG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb24gPSB2YWxpZGF0ZV9zbXNfbWVzc2FnZShmdWxsX21lc3NhZ2UpO1xuICAgICAgICBpZiAoIXZhbGlkYXRpb24udmFsaWQpIHtcbiAgICAgICAgICAgIGlmICh2YWxpZGF0aW9uLnJlYXNvbiA9PT0gXCJub25fZ3NtN1wiKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYmFkX2NoYXJzID0gdmFsaWRhdGlvbi5ub25fZ3NtX2NoYXJhY3RlcnMhLmpvaW4oXCIgXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgWW91ciBtZXNzYWdlIGNvbnRhaW5zIGNoYXJhY3RlcnMgdGhhdCBhcmUgbm90IHN1cHBvcnRlZCBpbiBwbGFpbi10ZXh0IFNNUzogJHtiYWRfY2hhcnN9LiBQbGVhc2UgdXNlIG9ubHkgc3RhbmRhcmQgY2hhcmFjdGVycyBhbmQgdHJ5IGFnYWluLmAsXG4gICAgICAgICAgICAgICAgICAgIG5leHRfc3RlcDogTkVYVF9TVEVQUy5BV0FJVF9CUk9BRENBU1QsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBZb3VyIG1lc3NhZ2UgaXMgJHttZXNzYWdlX3RleHQubGVuZ3RofSBjaGFyYWN0ZXJzLCB3aGljaCBleGNlZWRzIHRoZSBsaW1pdCBvZiAke21heF9sZW5ndGh9LiBQbGVhc2Ugc2hvcnRlbiB5b3VyIG1lc3NhZ2UgYW5kIHRyeSBhZ2Fpbiwgb3IgdHlwZSAncmVzdGFydCcgdG8gY2FuY2VsLmAsXG4gICAgICAgICAgICAgICAgbmV4dF9zdGVwOiBORVhUX1NURVBTLkFXQUlUX0JST0FEQ0FTVCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGb3IgYnJvYWRjYXN0LCBzZW5kIHRvIEFMTCBwYXRyb2xsZXJzIGluIHRoZSBwaG9uZSBudW1iZXIgbWFwXG4gICAgICAgIGNvbnN0IHBob25lX21hcCA9IGF3YWl0IHRoaXMuZ2V0X3Bob25lX251bWJlcl9tYXAoKTtcbiAgICAgICAgY29uc3QgeyBzZW50X2NvdW50LCBjb3B5X3NlbnRfdG9fc2VuZGVyLCBmYWlsZWRfbmFtZXMgfSA9XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmRlbGl2ZXJfc21zX3RvX21hcChwaG9uZV9tYXAsIGZ1bGxfbWVzc2FnZSwgc2VuZGVyX25hbWUpO1xuXG4gICAgICAgIGF3YWl0IHRoaXMubG9nX2FjdGlvbihgYnJvYWRjYXN0KCR7c2VudF9jb3VudCArIChjb3B5X3NlbnRfdG9fc2VuZGVyID8gMSA6IDApfSlgKTtcblxuICAgICAgICBsZXQgcmVzcG9uc2UgPSBgQnJvYWRjYXN0IHNlbnQgdG8gJHtzZW50X2NvdW50fSBwYXRyb2xsZXIke3NlbnRfY291bnQgIT09IDEgPyBcInNcIiA6IFwiXCJ9YDtcbiAgICAgICAgaWYgKGNvcHlfc2VudF90b19zZW5kZXIpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlICs9IGAgYW5kIGEgY29weSB0byB5b3UuYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3BvbnNlICs9IGAuYDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmYWlsZWRfbmFtZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmVzcG9uc2UgKz0gYCBDb3VsZCBub3Qgc2VuZCB0bzogJHtmYWlsZWRfbmFtZXMuam9pbihcIiwgXCIpfS5gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHJlc3BvbnNlIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9va3MgdXAgcGhvbmUgbnVtYmVycyBmb3IgYWxsIHBhdHJvbGxlcnMgZnJvbSB0aGUgUGhvbmUgTnVtYmVycyBzaGVldC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+Pn0gQSBtYXAgb2YgcGF0cm9sbGVyIG5hbWUgdG8gcGhvbmUgbnVtYmVyIChpbiArMVhYWFhYWFhYWFggZm9ybWF0KS5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfcGhvbmVfbnVtYmVyX21hcCgpOiBQcm9taXNlPFJlY29yZDxzdHJpbmcsIHN0cmluZz4+IHtcbiAgICAgICAgY29uc3Qgc2hlZXRzX3NlcnZpY2UgPSBhd2FpdCB0aGlzLmdldF9zaGVldHNfc2VydmljZSgpO1xuICAgICAgICBjb25zdCBvcHRzOiBGaW5kUGF0cm9sbGVyQ29uZmlnID0gdGhpcy5jb21iaW5lZF9jb25maWc7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgc2hlZXRzX3NlcnZpY2Uuc3ByZWFkc2hlZXRzLnZhbHVlcy5nZXQoe1xuICAgICAgICAgICAgc3ByZWFkc2hlZXRJZDogb3B0cy5TSEVFVF9JRCxcbiAgICAgICAgICAgIHJhbmdlOiBvcHRzLlBIT05FX05VTUJFUl9MT09LVVBfU0hFRVQsXG4gICAgICAgICAgICB2YWx1ZVJlbmRlck9wdGlvbjogXCJVTkZPUk1BVFRFRF9WQUxVRVwiLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhLnZhbHVlcykge1xuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IHJvdyBvZiByZXNwb25zZS5kYXRhLnZhbHVlcykge1xuICAgICAgICAgICAgY29uc3QgbmFtZSA9IHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5QSE9ORV9OVU1CRVJfTkFNRV9DT0xVTU4pXTtcbiAgICAgICAgICAgIGNvbnN0IHJhd051bWJlciA9IHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5QSE9ORV9OVU1CRVJfTlVNQkVSX0NPTFVNTildO1xuICAgICAgICAgICAgaWYgKG5hbWUgJiYgcmF3TnVtYmVyKSB7XG4gICAgICAgICAgICAgICAgbWFwW25hbWVdID0gYCsxJHtzYW5pdGl6ZV9waG9uZV9udW1iZXIocmF3TnVtYmVyKX1gO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXNzaWducyB0aGUgc2VjdGlvbiB0byB0aGUgcGF0cm9sbGVyLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbH0gc2VjdGlvbiAgVGhlIHNlY3Rpb24gdG8gYXNzaWduLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSByZXNwb25zZS5cbiAgICAgKi9cbiAgICBhc3luYyBhc3NpZ25fc2VjdGlvbihzZWN0aW9uOiBzdHJpbmcgfCBudWxsKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnN0IGFzc2lnbmVkU2VjdGlvbiA9IHNlY3Rpb24gPz8gXCJSb3ZpbmdcIjtcbiAgICAgICAgY29uc29sZS5sb2coYEFzc2lnbmluZyBzZWN0aW9uICR7dGhpcy5wYXRyb2xsZXIhLm5hbWV9IHRvICR7YXNzaWduZWRTZWN0aW9ufWApO1xuICAgICAgICBjb25zdCBtYXBwZWRfc2VjdGlvbiA9IHRoaXMuc2VjdGlvbl92YWx1ZXMubWFwX3NlY3Rpb24oYXNzaWduZWRTZWN0aW9uKTtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKGBhc3NpZ25fc2VjdGlvbigke21hcHBlZF9zZWN0aW9ufSlgKTtcbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuICAgICAgICBhd2FpdCBsb2dpbl9zaGVldC5hc3NpZ25fc2VjdGlvbih0aGlzLnBhdHJvbGxlciEsIG1hcHBlZF9zZWN0aW9uKTtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2dpbl9zaGVldD8ucmVmcmVzaCgpO1xuICAgICAgICBhd2FpdCB0aGlzLmdldF9tYXBwZWRfcGF0cm9sbGVyKHRydWUpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IGBVcGRhdGVkICR7dGhpcy5wYXRyb2xsZXIhLm5hbWV9IHdpdGggc2VjdGlvbiBhc3NpZ25tZW50OiAke21hcHBlZF9zZWN0aW9ufS5gLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlY29yZCB0aGUgYmVhY29uIHNlYXJjaCBmb3IgdGhpcyBwYXRyb2xsZXJcbiAgICAgKiBAcGFyYW17c3RyaW5nIH0gIGJlYWNvbl9zZWFyY2hfbG9jYXRpb24gIHdoZXJlIHRoZSBiZWFjb24gd2FzIGZvdW5kXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZT59XG4gICAgICovXG4gICAgYXN5bmMgc2V0X2JlYWNvbl9zZWFyY2goYmVhY29uX3NlYXJjaF9sb2NhdGlvbjogc3RyaW5nKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBTZXR0aW5nIGJlYWNvbiBzZWFyY2ggZm9yICR7dGhpcy5wYXRyb2xsZXIhLm5hbWV9IGF0ICR7YmVhY29uX3NlYXJjaF9sb2NhdGlvbn1gKTtcbiAgICAgICAgY29uc3Qgc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9zbGVkX2JlYWNvbl9jaGVja19zaGVldCgpO1xuICAgICAgICBjb25zdCBwcmlvcl9zZWFyY2hlcyA9IGF3YWl0IHNoZWV0LmdldF9iZWFjb25fc2VhcmNoZXModGhpcy5wYXRyb2xsZXIhLm5hbWUpO1xuICAgICAgICBpZiAocHJpb3Jfc2VhcmNoZXMgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgcmVzcG9uc2U6IFwiUHJvYmxlbSBsb29raW5nIHVwIHBhdHJvbGxlciBmb3IgYmVhY29uIHNlYXJjaGVzLlwiIH07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZWNvcmQgdGhlIG5ldyBiZWFjb24gc2VhcmNoXG4gICAgICAgIGF3YWl0IHNoZWV0LnNldF9iZWFjb25zX3NlYXJjaGVzKHByaW9yX3NlYXJjaGVzLCBiZWFjb25fc2VhcmNoX2xvY2F0aW9uKTtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKGBzZXRfYmVhY29uX3NlYXJjaCgke2JlYWNvbl9zZWFyY2hfbG9jYXRpb259KWApO1xuXG4gICAgICAgIC8vIFJlLXJlYWQgdGhlIHZhbHVlcyBhbmQgcmV0dXJuIGNvbmZpcm1hdGlvblxuICAgICAgICBjb25zdCB1cGRhdGVkID0gYXdhaXQgc2hlZXQuZ2V0X2JlYWNvbl9zZWFyY2hlcyh0aGlzLnBhdHJvbGxlciEubmFtZSk7XG4gICAgICAgIGlmICh1cGRhdGVkID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHJlc3BvbnNlOiBgVW5hYmxlIHRvIHJlY29yZCBiZWFjb24gc2VhcmNoIGZvciAke3RoaXMucGF0cm9sbGVyIS5uYW1lfSB0b2RheS5gIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3RhdHVzID0gYENvbXBsZXRlZCAke3VwZGF0ZWQuc2VhcmNoX2NvdW50fSBzZWFyY2gke3VwZGF0ZWQuc2VhcmNoX2NvdW50ID09PSAxID8gJycgOiAnZXMnfSB0aGlzIHNlYXNvbi5gO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZTogYFVwZGF0ZWQgJHt0aGlzLnBhdHJvbGxlciEubmFtZX0gdG8gY29tcGxldGUgYmVhY29uIHNlYXJjaCBhdCAke2JlYWNvbl9zZWFyY2hfbG9jYXRpb259IHRvZGF5LlxcbiR7c3RhdHVzfWAsXG4gICAgICAgIH07XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBzdGF0dXMgb2YgdGhlIHBhdHJvbGxlci5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgc3RhdHVzIHJlc3BvbnNlLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF9zdGF0dXMoKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKTtcbiAgICAgICAgY29uc3Qgc2hlZXRfZGF0ZSA9IGxvZ2luX3NoZWV0LnNoZWV0X2RhdGUudG9EYXRlU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfZGF0ZSA9IGxvZ2luX3NoZWV0LmN1cnJlbnRfZGF0ZS50b0RhdGVTdHJpbmcoKTtcbiAgICAgICAgaWYgKCFsb2dpbl9zaGVldC5pc19jdXJyZW50KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgc2hlZXRfZGF0ZTogJHtsb2dpbl9zaGVldC5zaGVldF9kYXRlfWApO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYGN1cnJlbnRfZGF0ZTogJHtsb2dpbl9zaGVldC5jdXJyZW50X2RhdGV9YCk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgU2hlZXQgaXMgbm90IGN1cnJlbnQgZm9yIHRvZGF5IChsYXN0IHJlc2V0OiAke3NoZWV0X2RhdGV9KS4gJHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXIhLm5hbWVcbiAgICAgICAgICAgICAgICB9IGlzIG5vdCBjaGVja2VkIGluIGZvciAke2N1cnJlbnRfZGF0ZX0uYCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB7IHJlc3BvbnNlOiBhd2FpdCB0aGlzLmdldF9zdGF0dXNfc3RyaW5nKCkgfTtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKFwic3RhdHVzXCIpO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgc3RhdHVzIHN0cmluZyBvZiB0aGUgcGF0cm9sbGVyLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHN0cmluZz59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHN0YXR1cyBzdHJpbmcuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3N0YXR1c19zdHJpbmcoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuICAgICAgICBjb25zdCBndWVzdF9wYXNzX3Byb21pc2UgPSAoXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmdldF9ndWVzdF9wYXNzX3NoZWV0KClcbiAgICAgICAgKS5nZXRfYXZhaWxhYmxlX2FuZF91c2VkX3Bhc3Nlcyh0aGlzLnBhdHJvbGxlciEubmFtZSk7XG4gICAgICAgIGNvbnN0IHBhdHJvbGxlcl9zdGF0dXMgPSB0aGlzLnBhdHJvbGxlciE7XG5cbiAgICAgICAgY29uc3QgY2hlY2tpbkNvbHVtblNldCA9XG4gICAgICAgICAgICBwYXRyb2xsZXJfc3RhdHVzLmNoZWNraW4gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgcGF0cm9sbGVyX3N0YXR1cy5jaGVja2luICE9PSBudWxsO1xuICAgICAgICBjb25zdCBjaGVja2VkT3V0ID1cbiAgICAgICAgICAgIGNoZWNraW5Db2x1bW5TZXQgJiZcbiAgICAgICAgICAgIHRoaXMuY2hlY2tpbl92YWx1ZXMuYnlfc2hlZXRfc3RyaW5nW3BhdHJvbGxlcl9zdGF0dXMuY2hlY2tpbl0ua2V5ID09XG4gICAgICAgICAgICAgICAgXCJvdXRcIjtcbiAgICAgICAgbGV0IHN0YXR1cyA9IHBhdHJvbGxlcl9zdGF0dXMuY2hlY2tpbiB8fCBcIk5vdCBQcmVzZW50XCI7XG5cbiAgICAgICAgaWYgKGNoZWNrZWRPdXQpIHtcbiAgICAgICAgICAgIHN0YXR1cyA9IFwiQ2hlY2tlZCBPdXRcIjtcbiAgICAgICAgfSBlbHNlIGlmIChjaGVja2luQ29sdW1uU2V0KSB7XG4gICAgICAgICAgICBsZXQgc2VjdGlvbiA9IHBhdHJvbGxlcl9zdGF0dXMuc2VjdGlvbi50b1N0cmluZygpO1xuICAgICAgICAgICAgaWYgKHNlY3Rpb24ubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgICAgICBzZWN0aW9uID0gYFNlY3Rpb24gJHtzZWN0aW9ufWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdGF0dXMgPSBgJHtwYXRyb2xsZXJfc3RhdHVzLmNoZWNraW59ICgke3NlY3Rpb259KWA7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb21wbGV0ZWRQYXRyb2xEYXlzID0gYXdhaXQgKFxuICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXRfc2Vhc29uX3NoZWV0KClcbiAgICAgICAgKS5nZXRfcGF0cm9sbGVkX2RheXModGhpcy5wYXRyb2xsZXIhLm5hbWUpO1xuICAgICAgICBjb25zdCBjb21wbGV0ZWRQYXRyb2xEYXlzU3RyaW5nID1cbiAgICAgICAgICAgIGNvbXBsZXRlZFBhdHJvbERheXMgPiAwID8gY29tcGxldGVkUGF0cm9sRGF5cy50b1N0cmluZygpIDogXCJOb1wiO1xuICAgICAgICBjb25zdCBsb2dpblNoZWV0RGF0ZSA9IGxvZ2luX3NoZWV0LnNoZWV0X2RhdGUudG9EYXRlU3RyaW5nKCk7XG5cbiAgICAgICAgbGV0IHN0YXR1c1N0cmluZyA9IGBTdGF0dXMgZm9yICR7XG4gICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICB9IG9uIGRhdGUgJHtsb2dpblNoZWV0RGF0ZX06ICR7c3RhdHVzfS5cXG4ke2NvbXBsZXRlZFBhdHJvbERheXNTdHJpbmd9IGNvbXBsZXRlZCBwYXRyb2wgZGF5cyBwcmlvciB0byB0b2RheS5gO1xuICAgICAgICBjb25zdCB1c2VkVG9kYXlHdWVzdFBhc3NlcyA9IChhd2FpdCBndWVzdF9wYXNzX3Byb21pc2UpPy51c2VkX3RvZGF5IHx8IDA7XG4gICAgICAgIGNvbnN0IHVzZWRTZWFzb25HdWVzdFBhc3NlcyA9XG4gICAgICAgICAgICAoYXdhaXQgZ3Vlc3RfcGFzc19wcm9taXNlKT8udXNlZF9zZWFzb24gfHwgMDtcbiAgICAgICAgY29uc3QgYXZhaWxhYmxlR3Vlc3RQYXNzZXMgPSAoYXdhaXQgZ3Vlc3RfcGFzc19wcm9taXNlKT8uYXZhaWxhYmxlIHx8IDA7XG5cblxuICAgICAgICBzdGF0dXNTdHJpbmcgKz1cbiAgICAgICAgICAgIFwiIFwiICtcbiAgICAgICAgICAgIGJ1aWxkX3Bhc3Nlc19zdHJpbmcoXG4gICAgICAgICAgICAgICAgdXNlZFNlYXNvbkd1ZXN0UGFzc2VzLFxuICAgICAgICAgICAgICAgIHVzZWRTZWFzb25HdWVzdFBhc3NlcyArIGF2YWlsYWJsZUd1ZXN0UGFzc2VzLFxuICAgICAgICAgICAgICAgIHVzZWRUb2RheUd1ZXN0UGFzc2VzXG4gICAgICAgICAgICApO1xuICAgICAgICByZXR1cm4gc3RhdHVzU3RyaW5nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIHRoZSBjaGVjay1pbiBwcm9jZXNzIGZvciB0aGUgcGF0cm9sbGVyIG9uY2UgdGhlIGNoZWNrLWluIG1vZGUgaXMgc2V0LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBjaGVjay1pbiByZXNwb25zZS5cbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gVGhyb3dzIGFuIGVycm9yIGlmIHRoZSBjaGVjay1pbiBtb2RlIGlzIGltcHJvcGVybHkgc2V0LlxuICAgICAqL1xuICAgIGFzeW5jIGNoZWNraW4oKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgYFBlcmZvcm1pbmcgcmVndWxhciBjaGVja2luIGZvciAke1xuICAgICAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyIS5uYW1lXG4gICAgICAgICAgICB9IHdpdGggbW9kZTogJHt0aGlzLmNoZWNraW5fbW9kZX1gXG4gICAgICAgICk7XG4gICAgICAgIGlmIChhd2FpdCB0aGlzLnNoZWV0X25lZWRzX3Jlc2V0KCkpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6XG4gICAgICAgICAgICAgICAgICAgIGAke1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXIhLm5hbWVcbiAgICAgICAgICAgICAgICAgICAgfSwgeW91IGFyZSB0aGUgZmlyc3QgcGVyc29uIHRvIGNoZWNrIGluIHRvZGF5LiBgICtcbiAgICAgICAgICAgICAgICAgICAgYEkgbmVlZCB0byBhcmNoaXZlIGFuZCByZXNldCB0aGUgc2hlZXQgYmVmb3JlIGNvbnRpbnVpbmcuIGAgK1xuICAgICAgICAgICAgICAgICAgICBgV291bGQgeW91IGxpa2UgbWUgdG8gZG8gdGhhdD8gKFllcy9ObylgLFxuICAgICAgICAgICAgICAgIG5leHRfc3RlcDogYCR7TkVYVF9TVEVQUy5DT05GSVJNX1JFU0VUfS0ke3RoaXMuY2hlY2tpbl9tb2RlfWAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGxldCBjaGVja2luX21vZGU7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgICF0aGlzLmNoZWNraW5fbW9kZSB8fFxuICAgICAgICAgICAgKGNoZWNraW5fbW9kZSA9IHRoaXMuY2hlY2tpbl92YWx1ZXMuYnlfa2V5W3RoaXMuY2hlY2tpbl9tb2RlXSkgPT09XG4gICAgICAgICAgICAgICAgdW5kZWZpbmVkXG4gICAgICAgICkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2hlY2tpbiBtb2RlIGltcHJvcGVybHkgc2V0XCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuICAgICAgICBjb25zdCBuZXdfY2hlY2tpbl92YWx1ZSA9IGNoZWNraW5fbW9kZS5zaGVldHNfdmFsdWU7XG4gICAgICAgIGF3YWl0IGxvZ2luX3NoZWV0LmNoZWNraW4odGhpcy5wYXRyb2xsZXIhLCBuZXdfY2hlY2tpbl92YWx1ZSk7XG4gICAgICAgIGF3YWl0IHRoaXMubG9nX2FjdGlvbihgdXBkYXRlLXN0YXR1cygke25ld19jaGVja2luX3ZhbHVlfSlgKTtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2dpbl9zaGVldD8ucmVmcmVzaCgpO1xuICAgICAgICBhd2FpdCB0aGlzLmdldF9tYXBwZWRfcGF0cm9sbGVyKHRydWUpO1xuXG4gICAgICAgIGxldCByZXNwb25zZSA9IGBVcGRhdGluZyAke1xuICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXIhLm5hbWVcbiAgICAgICAgfSB3aXRoIHN0YXR1czogJHtuZXdfY2hlY2tpbl92YWx1ZX0uYDtcbiAgICAgICAgaWYgKCF0aGlzLmZhc3RfY2hlY2tpbikge1xuICAgICAgICAgICAgcmVzcG9uc2UgKz0gYCBZb3UgY2FuIHNlbmQgJyR7Y2hlY2tpbl9tb2RlLmZhc3RfY2hlY2tpbnNbMF19JyBhcyB5b3VyIGZpcnN0IG1lc3NhZ2UgZm9yIGEgZmFzdCAke2NoZWNraW5fbW9kZS5zaGVldHNfdmFsdWV9IGNoZWNraW4gbmV4dCB0aW1lLmA7XG4gICAgICAgIH1cbiAgICAgICAgcmVzcG9uc2UgKz0gXCJcXG5cXG5cIiArIChhd2FpdCB0aGlzLmdldF9zdGF0dXNfc3RyaW5nKCkpO1xuICAgICAgICByZXR1cm4geyByZXNwb25zZTogcmVzcG9uc2UgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdGhlIEdvb2dsZSBTaGVldHMgbmVlZHMgdG8gYmUgcmVzZXQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRydWUgaWYgdGhlIHNoZWV0IG5lZWRzIHRvIGJlIHJlc2V0LCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICovXG4gICAgYXN5bmMgc2hlZXRfbmVlZHNfcmVzZXQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKTtcblxuICAgICAgICBjb25zdCBzaGVldF9kYXRlID0gbG9naW5fc2hlZXQuc2hlZXRfZGF0ZTtcbiAgICAgICAgY29uc3QgY3VycmVudF9kYXRlID0gbG9naW5fc2hlZXQuY3VycmVudF9kYXRlO1xuICAgICAgICBjb25zb2xlLmxvZyhgc2hlZXRfZGF0ZTogJHtzaGVldF9kYXRlfWApO1xuICAgICAgICBjb25zb2xlLmxvZyhgY3VycmVudF9kYXRlOiAke2N1cnJlbnRfZGF0ZX1gKTtcblxuICAgICAgICBjb25zb2xlLmxvZyhgZGF0ZV9pc19jdXJyZW50OiAke2xvZ2luX3NoZWV0LmlzX2N1cnJlbnR9YCk7XG5cbiAgICAgICAgcmV0dXJuICFsb2dpbl9zaGVldC5pc19jdXJyZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc2V0cyB0aGUgR29vZ2xlIFNoZWV0cyBmbG93LCBpbmNsdWRpbmcgYXJjaGl2aW5nIGFuZCByZXNldHRpbmcgdGhlIHNoZWV0IGlmIG5lY2Vzc2FyeS5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlIHwgdm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGNoZWNrLWluIHJlc3BvbnNlIG9yIHZvaWQuXG4gICAgICovXG4gICAgYXN5bmMgcmVzZXRfc2hlZXRfZmxvdygpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2UgfCB2b2lkPiB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5jaGVja191c2VyX2NyZWRzKFxuICAgICAgICAgICAgYCR7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXIhLm5hbWVcbiAgICAgICAgICAgIH0sIGluIG9yZGVyIHRvIHJlc2V0L2FyY2hpdmUsIEkgbmVlZCB5b3UgdG8gYXV0aG9yaXplIHRoZSBhcHAuYFxuICAgICAgICApO1xuICAgICAgICBpZiAocmVzcG9uc2UpXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiByZXNwb25zZS5yZXNwb25zZSxcbiAgICAgICAgICAgICAgICBuZXh0X3N0ZXA6IGAke05FWFRfU1RFUFMuQVVUSF9SRVNFVH0tJHt0aGlzLmNoZWNraW5fbW9kZX1gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucmVzZXRfc2hlZXQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXNldHMgdGhlIEdvb2dsZSBTaGVldHMsIGluY2x1ZGluZyBhcmNoaXZpbmcgYW5kIHJlc2V0dGluZyB0aGUgc2hlZXQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHNoZWV0IGlzIHJlc2V0LlxuICAgICAqL1xuICAgIGFzeW5jIHJlc2V0X3NoZWV0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCBzY3JpcHRfc2VydmljZSA9IGF3YWl0IHRoaXMuZ2V0X3VzZXJfc2NyaXB0c19zZXJ2aWNlKCk7XG4gICAgICAgIGNvbnN0IHNob3VsZF9wZXJmb3JtX2FyY2hpdmUgPSAhKGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCkpLmFyY2hpdmVkO1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gc2hvdWxkX3BlcmZvcm1fYXJjaGl2ZVxuICAgICAgICAgICAgPyBcIk9rYXkuIEFyY2hpdmluZyBhbmQgcmVzZXR0aW5nIHRoZSBjaGVjayBpbiBzaGVldC4gVGhpcyB0YWtlcyBhYm91dCAxMCBzZWNvbmRzLi4uXCJcbiAgICAgICAgICAgIDogXCJPa2F5LiBTaGVldCBoYXMgYWxyZWFkeSBiZWVuIGFyY2hpdmVkLiBQZXJmb3JtaW5nIHJlc2V0LiBUaGlzIHRha2VzIGFib3V0IDUgc2Vjb25kcy4uLlwiO1xuICAgICAgICBhd2FpdCB0aGlzLnNlbmRfbWVzc2FnZShtZXNzYWdlKTtcbiAgICAgICAgaWYgKHNob3VsZF9wZXJmb3JtX2FyY2hpdmUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQXJjaGl2aW5nLi4uXCIpO1xuXG4gICAgICAgICAgICBhd2FpdCBzY3JpcHRfc2VydmljZS5zY3JpcHRzLnJ1bih7XG4gICAgICAgICAgICAgICAgc2NyaXB0SWQ6IHRoaXMucmVzZXRfc2NyaXB0X2lkLFxuICAgICAgICAgICAgICAgIHJlcXVlc3RCb2R5OiB7IGZ1bmN0aW9uOiB0aGlzLmNvbmZpZy5BUkNISVZFX0ZVTkNUSU9OX05BTUUgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5kZWxheSg1KTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubG9nX2FjdGlvbihcImFyY2hpdmVcIik7XG4gICAgICAgICAgICB0aGlzLmxvZ2luX3NoZWV0ID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVzZXR0aW5nLi4uXCIpO1xuICAgICAgICBhd2FpdCBzY3JpcHRfc2VydmljZS5zY3JpcHRzLnJ1bih7XG4gICAgICAgICAgICBzY3JpcHRJZDogdGhpcy5yZXNldF9zY3JpcHRfaWQsXG4gICAgICAgICAgICByZXF1ZXN0Qm9keTogeyBmdW5jdGlvbjogdGhpcy5jb25maWcuUkVTRVRfRlVOQ1RJT05fTkFNRSB9LFxuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgdGhpcy5kZWxheSg1KTtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKFwicmVzZXRcIik7XG4gICAgICAgIGF3YWl0IHRoaXMuc2VuZF9tZXNzYWdlKFwiRG9uZS5cIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgR29vZ2xlIEFwcHMgU2NyaXB0IHNlcnZpY2UuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c2NyaXB0X3YxLlNjcmlwdD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIEdvb2dsZSBBcHBzIFNjcmlwdCBzZXJ2aWNlLlxuICAgICAqL1xuICAgIGFzeW5jIGNoZWNrX3VzZXJfY3JlZHMoXG4gICAgICAgIHByb21wdF9tZXNzYWdlOiBzdHJpbmcgPSBcIkhpLCBiZWZvcmUgeW91IGNhbiB1c2UgQlZOU1AgYm90LCB5b3UgbXVzdCBsb2dpbi5cIlxuICAgICk6IFByb21pc2U8QlZOU1BSZXNwb25zZSB8IHVuZGVmaW5lZD4ge1xuICAgICAgICBjb25zdCB1c2VyX2NyZWRzID0gdGhpcy5nZXRfdXNlcl9jcmVkcygpO1xuICAgICAgICBpZiAoIShhd2FpdCB1c2VyX2NyZWRzLmxvYWRUb2tlbigpKSkge1xuICAgICAgICAgICAgY29uc3QgYXV0aFVybCA9IGF3YWl0IHVzZXJfY3JlZHMuZ2V0QXV0aFVybCgpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYCR7cHJvbXB0X21lc3NhZ2V9IFBsZWFzZSBmb2xsb3cgdGhpcyBsaW5rOlxuJHthdXRoVXJsfVxuXG5NZXNzYWdlIG1lIGFnYWluIHdoZW4gZG9uZS5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIEdvb2dsZSBBcHBzIFNjcmlwdCBzZXJ2aWNlLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHNjcmlwdF92MS5TY3JpcHQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBHb29nbGUgQXBwcyBTY3JpcHQgc2VydmljZS5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfb25fZHV0eSgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zdCBjaGVja2VkX291dF9zZWN0aW9uID0gXCJDaGVja2VkIE91dFwiO1xuICAgICAgICBjb25zdCBsYXN0X3NlY3Rpb25zID0gW2NoZWNrZWRfb3V0X3NlY3Rpb25dO1xuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG5cbiAgICAgICAgY29uc3Qgb25fZHV0eV9wYXRyb2xsZXJzID0gbG9naW5fc2hlZXQuZ2V0X29uX2R1dHlfcGF0cm9sbGVycygpO1xuICAgICAgICBjb25zdCBieV9zZWN0aW9uID0gb25fZHV0eV9wYXRyb2xsZXJzXG4gICAgICAgICAgICAuZmlsdGVyKCh4KSA9PiB4LmNoZWNraW4pXG4gICAgICAgICAgICAucmVkdWNlKChwcmV2OiB7IFtrZXk6IHN0cmluZ106IFBhdHJvbGxlclJvd1tdIH0sIGN1cikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNob3J0X2NvZGUgPVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNraW5fdmFsdWVzLmJ5X3NoZWV0X3N0cmluZ1tjdXIuY2hlY2tpbl0ua2V5O1xuICAgICAgICAgICAgICAgIGxldCBzZWN0aW9uID0gY3VyLnNlY3Rpb247XG4gICAgICAgICAgICAgICAgaWYgKHNob3J0X2NvZGUgPT0gXCJvdXRcIikge1xuICAgICAgICAgICAgICAgICAgICBzZWN0aW9uID0gY2hlY2tlZF9vdXRfc2VjdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCEoc2VjdGlvbiBpbiBwcmV2KSkge1xuICAgICAgICAgICAgICAgICAgICBwcmV2W3NlY3Rpb25dID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHByZXZbc2VjdGlvbl0ucHVzaChjdXIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgICAgICAgfSwge30pO1xuICAgICAgICBsZXQgcmVzdWx0czogc3RyaW5nW11bXSA9IFtdO1xuICAgICAgICBsZXQgYWxsX2tleXMgPSBPYmplY3Qua2V5cyhieV9zZWN0aW9uKTtcbiAgICAgICAgY29uc3Qgb3JkZXJlZF9wcmltYXJ5X3NlY3Rpb25zID0gT2JqZWN0LmtleXMoYnlfc2VjdGlvbilcbiAgICAgICAgICAgIC5maWx0ZXIoKHgpID0+ICFsYXN0X3NlY3Rpb25zLmluY2x1ZGVzKHgpKVxuICAgICAgICAgICAgLnNvcnQoKTtcbiAgICAgICAgY29uc3QgZmlsdGVyZWRfbGFzdF9zZWN0aW9ucyA9IGxhc3Rfc2VjdGlvbnMuZmlsdGVyKCh4KSA9PlxuICAgICAgICAgICAgYWxsX2tleXMuaW5jbHVkZXMoeClcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3Qgb3JkZXJlZF9zZWN0aW9ucyA9IG9yZGVyZWRfcHJpbWFyeV9zZWN0aW9ucy5jb25jYXQoXG4gICAgICAgICAgICBmaWx0ZXJlZF9sYXN0X3NlY3Rpb25zXG4gICAgICAgICk7XG5cbiAgICAgICAgZm9yIChjb25zdCBzZWN0aW9uIG9mIG9yZGVyZWRfc2VjdGlvbnMpIHtcbiAgICAgICAgICAgIGxldCByZXN1bHQ6IHN0cmluZ1tdID0gW107XG4gICAgICAgICAgICBjb25zdCBwYXRyb2xsZXJzID0gYnlfc2VjdGlvbltzZWN0aW9uXS5zb3J0KCh4LCB5KSA9PlxuICAgICAgICAgICAgICAgIHgubmFtZS5sb2NhbGVDb21wYXJlKHkubmFtZSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoc2VjdGlvbi5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChcIlNlY3Rpb24gXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0LnB1c2goYCR7c2VjdGlvbn06IGApO1xuICAgICAgICAgICAgZnVuY3Rpb24gcGF0cm9sbGVyX3N0cmluZyhuYW1lOiBzdHJpbmcsIHNob3J0X2NvZGU6IHN0cmluZykge1xuICAgICAgICAgICAgICAgIGxldCBkZXRhaWxzID0gXCJcIjtcbiAgICAgICAgICAgICAgICBpZiAoc2hvcnRfY29kZSAhPT0gXCJkYXlcIiAmJiBzaG9ydF9jb2RlICE9PSBcIm91dFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGRldGFpbHMgPSBgICgke3Nob3J0X2NvZGUudG9VcHBlckNhc2UoKX0pYDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke25hbWV9JHtkZXRhaWxzfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQucHVzaChcbiAgICAgICAgICAgICAgICBwYXRyb2xsZXJzXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKHgpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRyb2xsZXJfc3RyaW5nKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHgubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNraW5fdmFsdWVzLmJ5X3NoZWV0X3N0cmluZ1t4LmNoZWNraW5dLmtleVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5qb2luKFwiLCBcIilcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oXCJvbi1kdXR5XCIpO1xuICAgICAgICByZXR1cm4gYFBhdHJvbGxlcnMgZm9yICR7bG9naW5fc2hlZXQuc2hlZXRfZGF0ZS50b0RhdGVTdHJpbmcoKX0gKFRvdGFsOiAke1xuICAgICAgICAgICAgb25fZHV0eV9wYXRyb2xsZXJzLmxlbmd0aFxuICAgICAgICB9KTpcXG4ke3Jlc3VsdHMubWFwKChyKSA9PiByLmpvaW4oXCJcIikpLmpvaW4oXCJcXG5cIil9YDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2dzIGFuIGFjdGlvbiB0byB0aGUgR29vZ2xlIFNoZWV0cy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYWN0aW9uX25hbWUgLSBUaGUgbmFtZSBvZiB0aGUgYWN0aW9uIHRvIGxvZy5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgYWN0aW9uIGlzIGxvZ2dlZC5cbiAgICAgKi9cbiAgICBhc3luYyBsb2dfYWN0aW9uKGFjdGlvbl9uYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3Qgc2hlZXRzX3NlcnZpY2UgPSBhd2FpdCB0aGlzLmdldF9zaGVldHNfc2VydmljZSgpO1xuICAgICAgICBhd2FpdCBzaGVldHNfc2VydmljZS5zcHJlYWRzaGVldHMudmFsdWVzLmFwcGVuZCh7XG4gICAgICAgICAgICBzcHJlYWRzaGVldElkOiB0aGlzLmNvbWJpbmVkX2NvbmZpZy5TSEVFVF9JRCxcbiAgICAgICAgICAgIHJhbmdlOiB0aGlzLmNvbmZpZy5BQ1RJT05fTE9HX1NIRUVULFxuICAgICAgICAgICAgdmFsdWVJbnB1dE9wdGlvbjogXCJVU0VSX0VOVEVSRURcIixcbiAgICAgICAgICAgIHJlcXVlc3RCb2R5OiB7XG4gICAgICAgICAgICAgICAgdmFsdWVzOiBbW3RoaXMucGF0cm9sbGVyIS5uYW1lLCBuZXcgRGF0ZSgpLCBhY3Rpb25fbmFtZV1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9ncyBvdXQgdGhlIHVzZXIuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGxvZ291dCByZXNwb25zZS5cbiAgICAgKi9cbiAgICBhc3luYyBsb2dvdXQoKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnN0IHVzZXJfY3JlZHMgPSB0aGlzLmdldF91c2VyX2NyZWRzKCk7XG4gICAgICAgIGF3YWl0IHVzZXJfY3JlZHMuZGVsZXRlVG9rZW4oKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3BvbnNlOiBcIk9rYXksIEkgaGF2ZSByZW1vdmVkIGFsbCBsb2dpbiBzZXNzaW9uIGluZm9ybWF0aW9uLlwiLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIFR3aWxpbyBjbGllbnQuXG4gICAgICogQHJldHVybnMge1R3aWxpb0NsaWVudH0gVGhlIFR3aWxpbyBjbGllbnQuXG4gICAgICovXG4gICAgZ2V0X3R3aWxpb19jbGllbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnR3aWxpb19jbGllbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHdpbGlvX2NsaWVudCB3YXMgbmV2ZXIgaW5pdGlhbGl6ZWQhXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnR3aWxpb19jbGllbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgVHdpbGlvIFN5bmMgY2xpZW50LlxuICAgICAqIEByZXR1cm5zIHtTZXJ2aWNlQ29udGV4dH0gVGhlIFR3aWxpbyBTeW5jIGNsaWVudC5cbiAgICAgKi9cbiAgICBnZXRfc3luY19jbGllbnQoKSB7XG4gICAgICAgIGlmICghdGhpcy5zeW5jX2NsaWVudCkge1xuICAgICAgICAgICAgdGhpcy5zeW5jX2NsaWVudCA9IHRoaXMuZ2V0X3R3aWxpb19jbGllbnQoKS5zeW5jLnYxLnNlcnZpY2VzKFxuICAgICAgICAgICAgICAgIHRoaXMuc3luY19zaWRcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc3luY19jbGllbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgdXNlciBjcmVkZW50aWFscy5cbiAgICAgKiBAcmV0dXJucyB7VXNlckNyZWRzfSBUaGUgdXNlciBjcmVkZW50aWFscy5cbiAgICAgKi9cbiAgICBnZXRfdXNlcl9jcmVkcygpIHtcbiAgICAgICAgaWYgKCF0aGlzLnVzZXJfY3JlZHMpIHtcbiAgICAgICAgICAgIHRoaXMudXNlcl9jcmVkcyA9IG5ldyBVc2VyQ3JlZHMoXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRfc3luY19jbGllbnQoKSxcbiAgICAgICAgICAgICAgICB0aGlzLmZyb20sXG4gICAgICAgICAgICAgICAgdGhpcy5jb21iaW5lZF9jb25maWdcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudXNlcl9jcmVkcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBzZXJ2aWNlIGNyZWRlbnRpYWxzLlxuICAgICAqIEByZXR1cm5zIHtHb29nbGVBdXRofSBUaGUgc2VydmljZSBjcmVkZW50aWFscy5cbiAgICAgKi9cbiAgICBnZXRfc2VydmljZV9jcmVkcygpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNlcnZpY2VfY3JlZHMpIHtcbiAgICAgICAgICAgIHRoaXMuc2VydmljZV9jcmVkcyA9IG5ldyBnb29nbGUuYXV0aC5Hb29nbGVBdXRoKHtcbiAgICAgICAgICAgICAgICBrZXlGaWxlOiBnZXRfc2VydmljZV9jcmVkZW50aWFsc19wYXRoKCksXG4gICAgICAgICAgICAgICAgc2NvcGVzOiB0aGlzLlNDT1BFUyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2VfY3JlZHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgdmFsaWQgY3JlZGVudGlhbHMuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbcmVxdWlyZV91c2VyX2NyZWRzPWZhbHNlXSAtIFdoZXRoZXIgdXNlciBjcmVkZW50aWFscyBhcmUgcmVxdWlyZWQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8R29vZ2xlQXV0aD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHZhbGlkIGNyZWRlbnRpYWxzLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF92YWxpZF9jcmVkcyhyZXF1aXJlX3VzZXJfY3JlZHM6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBpZiAodGhpcy5jb25maWcuVVNFX1NFUlZJQ0VfQUNDT1VOVCAmJiAhcmVxdWlyZV91c2VyX2NyZWRzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRfc2VydmljZV9jcmVkcygpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVzZXJfY3JlZHMgPSB0aGlzLmdldF91c2VyX2NyZWRzKCk7XG4gICAgICAgIGlmICghKGF3YWl0IHVzZXJfY3JlZHMubG9hZFRva2VuKCkpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVc2VyIGlzIG5vdCBhdXRoZWQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVXNpbmcgdXNlciBhY2NvdW50IGZvciBzZXJ2aWNlIGF1dGguLi5cIik7XG4gICAgICAgIHJldHVybiB1c2VyX2NyZWRzLm9hdXRoMl9jbGllbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgR29vZ2xlIFNoZWV0cyBzZXJ2aWNlLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHNoZWV0c192NC5TaGVldHM+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBHb29nbGUgU2hlZXRzIHNlcnZpY2UuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3NoZWV0c19zZXJ2aWNlKCkge1xuICAgICAgICBpZiAoIXRoaXMuc2hlZXRzX3NlcnZpY2UpIHtcbiAgICAgICAgICAgIHRoaXMuc2hlZXRzX3NlcnZpY2UgPSBnb29nbGUuc2hlZXRzKHtcbiAgICAgICAgICAgICAgICB2ZXJzaW9uOiBcInY0XCIsXG4gICAgICAgICAgICAgICAgYXV0aDogYXdhaXQgdGhpcy5nZXRfdmFsaWRfY3JlZHMoKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNoZWV0c19zZXJ2aWNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGxvZ2luIHNoZWV0LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPExvZ2luU2hlZXQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBsb2dpbiBzaGVldFxuICAgICAqL1xuICAgIGFzeW5jIGdldF9sb2dpbl9zaGVldCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmxvZ2luX3NoZWV0KSB7XG4gICAgICAgICAgICBjb25zdCBsb2dpbl9zaGVldF9jb25maWc6IExvZ2luU2hlZXRDb25maWcgPSB0aGlzLmNvbWJpbmVkX2NvbmZpZztcbiAgICAgICAgICAgIGNvbnN0IHNoZWV0c19zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfc2hlZXRzX3NlcnZpY2UoKTtcbiAgICAgICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gbmV3IExvZ2luU2hlZXQoXG4gICAgICAgICAgICAgICAgc2hlZXRzX3NlcnZpY2UsXG4gICAgICAgICAgICAgICAgbG9naW5fc2hlZXRfY29uZmlnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYXdhaXQgbG9naW5fc2hlZXQucmVmcmVzaCgpO1xuICAgICAgICAgICAgdGhpcy5sb2dpbl9zaGVldCA9IGxvZ2luX3NoZWV0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmxvZ2luX3NoZWV0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHNlYXNvbiBzaGVldC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxTZWFzb25TaGVldD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHNlYXNvbiBzaGVldFxuICAgICAqL1xuICAgIGFzeW5jIGdldF9zZWFzb25fc2hlZXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5zZWFzb25fc2hlZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IHNlYXNvbl9zaGVldF9jb25maWc6IFNlYXNvblNoZWV0Q29uZmlnID0gdGhpcy5jb21iaW5lZF9jb25maWc7XG4gICAgICAgICAgICBjb25zdCBzaGVldHNfc2VydmljZSA9IGF3YWl0IHRoaXMuZ2V0X3NoZWV0c19zZXJ2aWNlKCk7XG4gICAgICAgICAgICB0aGlzLnNlYXNvbl9zaGVldCA9IG5ldyBTZWFzb25TaGVldChcbiAgICAgICAgICAgICAgICBzaGVldHNfc2VydmljZSxcbiAgICAgICAgICAgICAgICBzZWFzb25fc2hlZXRfY29uZmlnXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNlYXNvbl9zaGVldDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBndWVzdCBwYXNzIHNoZWV0LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEd1ZXN0UGFzc1NoZWV0Pn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgZ3Vlc3QgcGFzcyBzaGVldFxuICAgICAqL1xuICAgIGFzeW5jIGdldF9ndWVzdF9wYXNzX3NoZWV0KCkge1xuICAgICAgICBpZiAoIXRoaXMuZ3Vlc3RfcGFzc19zaGVldCkge1xuICAgICAgICAgICAgY29uc3QgY29uZmlnOiBHdWVzdFBhc3Nlc0NvbmZpZyA9IHRoaXMuY29tYmluZWRfY29uZmlnO1xuICAgICAgICAgICAgY29uc3Qgc2hlZXRzX3NlcnZpY2UgPSBhd2FpdCB0aGlzLmdldF9zaGVldHNfc2VydmljZSgpO1xuICAgICAgICAgICAgdGhpcy5ndWVzdF9wYXNzX3NoZWV0ID0gbmV3IEd1ZXN0UGFzc1NoZWV0KHNoZWV0c19zZXJ2aWNlLCBjb25maWcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmd1ZXN0X3Bhc3Nfc2hlZXQ7XG4gICAgfVxuXG4gICAgLyoqIGdldCB0aGUgc2xlY19iZWFjb25fY2hlY2tfc2hlZXQuXG4gICAgICogQHJldHVybnMgKFByb21pc2U8U2xlZEJlYWNvbkNoZWNrU2hlZXQ+KVxuICAgICAqL1xuICAgIGFzeW5jIGdldF9zbGVkX2JlYWNvbl9jaGVja19zaGVldCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNsZWRfYmVhY29uX2NoZWNrX3NoZWV0KSB7XG4gICAgICAgICAgICBjb25zdCBjb25maWc6IFNsZWRCZWFjb25Db25maWcgPSAgdGhpcy5jb21iaW5lZF9jb25maWc7XG4gICAgICAgICAgICBjb25zdCBzaGVldHNfc2VydmljZSA9IGF3YWl0IHRoaXMuZ2V0X3NoZWV0c19zZXJ2aWNlKCk7XG4gICAgICAgICAgICB0aGlzLnNsZWRfYmVhY29uX2NoZWNrX3NoZWV0ID0gbmV3IFNsZWRCZWFjb25DaGVja1NoZWV0KHNoZWV0c19zZXJ2aWNlLCBjb25maWcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNsZWRfYmVhY29uX2NoZWNrX3NoZWV0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIEdvb2dsZSBBcHBzIFNjcmlwdCBzZXJ2aWNlLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHNjcmlwdF92MS5TY3JpcHQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBHb29nbGUgQXBwcyBTY3JpcHQgc2VydmljZS5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfdXNlcl9zY3JpcHRzX3NlcnZpY2UoKSB7XG4gICAgICAgIGlmICghdGhpcy51c2VyX3NjcmlwdHNfc2VydmljZSkge1xuICAgICAgICAgICAgdGhpcy51c2VyX3NjcmlwdHNfc2VydmljZSA9IGdvb2dsZS5zY3JpcHQoe1xuICAgICAgICAgICAgICAgIHZlcnNpb246IFwidjFcIixcbiAgICAgICAgICAgICAgICBhdXRoOiBhd2FpdCB0aGlzLmdldF92YWxpZF9jcmVkcyh0cnVlKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJfc2NyaXB0c19zZXJ2aWNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG1hcHBlZCBwYXRyb2xsZXIuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbZm9yY2U9ZmFsc2VdIC0gV2hldGhlciB0byBmb3JjZSB0aGUgcGF0cm9sbGVyIHRvIGJlIGZvdW5kLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2UgfCB2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcmVzcG9uc2Ugb3Igdm9pZC5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfbWFwcGVkX3BhdHJvbGxlcihmb3JjZTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IHBob25lX2xvb2t1cCA9IGF3YWl0IHRoaXMuZmluZF9wYXRyb2xsZXJfZnJvbV9udW1iZXIoKTtcbiAgICAgICAgaWYgKHBob25lX2xvb2t1cCA9PT0gdW5kZWZpbmVkIHx8IHBob25lX2xvb2t1cCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGZvcmNlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGZpbmQgYXNzb2NpYXRlZCB1c2VyXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYFNvcnJ5LCBJIGNvdWxkbid0IGZpbmQgYW4gYXNzb2NpYXRlZCBCVk5TUCBtZW1iZXIgd2l0aCB5b3VyIHBob25lIG51bWJlciAoJHt0aGlzLmZyb219KWAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuICAgICAgICBjb25zdCBtYXBwZWRQYXRyb2xsZXIgPSBsb2dpbl9zaGVldC50cnlfZmluZF9wYXRyb2xsZXIoXG4gICAgICAgICAgICBwaG9uZV9sb29rdXAubmFtZVxuICAgICAgICApO1xuICAgICAgICBpZiAobWFwcGVkUGF0cm9sbGVyID09PSBcIm5vdF9mb3VuZFwiKSB7XG4gICAgICAgICAgICBpZiAoZm9yY2UpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgcGF0cm9sbGVyIGluIGxvZ2luIHNoZWV0XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYENvdWxkIG5vdCBmaW5kIHBhdHJvbGxlciAnJHtwaG9uZV9sb29rdXAubmFtZX0nIGluIGxvZ2luIHNoZWV0LiBQbGVhc2UgbG9vayBhdCB0aGUgbG9naW4gc2hlZXQgbmFtZSwgYW5kIGNvcHkgaXQgdG8gdGhlIFBob25lIE51bWJlcnMgdGFiLmAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3VycmVudF9zaGVldF9kYXRlID0gbG9naW5fc2hlZXQuY3VycmVudF9kYXRlO1xuICAgICAgICB0aGlzLnBhdHJvbGxlciA9IG1hcHBlZFBhdHJvbGxlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaW5kcyB0aGUgcGF0cm9sbGVyIGZyb20gdGhlIHBob25lIG51bWJlci5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxQYXRyb2xsZXJSb3c+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBwYXRyb2xsZXIuXG4gICAgICovXG4gICAgYXN5bmMgZmluZF9wYXRyb2xsZXJfZnJvbV9udW1iZXIoKSB7XG4gICAgICAgIGNvbnN0IHJhd19udW1iZXIgPSB0aGlzLmZyb207XG4gICAgICAgIGNvbnN0IHNoZWV0c19zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfc2hlZXRzX3NlcnZpY2UoKTtcbiAgICAgICAgY29uc3Qgb3B0czogRmluZFBhdHJvbGxlckNvbmZpZyA9IHRoaXMuY29tYmluZWRfY29uZmlnO1xuICAgICAgICBjb25zdCBudW1iZXIgPSBzYW5pdGl6ZV9waG9uZV9udW1iZXIocmF3X251bWJlcik7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgc2hlZXRzX3NlcnZpY2Uuc3ByZWFkc2hlZXRzLnZhbHVlcy5nZXQoe1xuICAgICAgICAgICAgc3ByZWFkc2hlZXRJZDogb3B0cy5TSEVFVF9JRCxcbiAgICAgICAgICAgIHJhbmdlOiBvcHRzLlBIT05FX05VTUJFUl9MT09LVVBfU0hFRVQsXG4gICAgICAgICAgICB2YWx1ZVJlbmRlck9wdGlvbjogXCJVTkZPUk1BVFRFRF9WQUxVRVwiLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhLnZhbHVlcykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGZpbmQgcGF0cm9sbGVyLlwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS52YWx1ZXNcbiAgICAgICAgICAgIC5tYXAoKHJvdykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJhd051bWJlciA9XG4gICAgICAgICAgICAgICAgICAgIHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5QSE9ORV9OVU1CRVJfTlVNQkVSX0NPTFVNTildO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnROdW1iZXIgPVxuICAgICAgICAgICAgICAgICAgICByYXdOdW1iZXIgIT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHNhbml0aXplX3Bob25lX251bWJlcihyYXdOdW1iZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHJhd051bWJlcjtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50TmFtZSA9XG4gICAgICAgICAgICAgICAgICAgIHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5QSE9ORV9OVU1CRVJfTkFNRV9DT0xVTU4pXTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge25hbWU6IGN1cnJlbnROYW1lLCBudW1iZXI6IGN1cnJlbnROdW1iZXJ9O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5maWx0ZXIoKHBhdHJvbGxlcikgPT4gcGF0cm9sbGVyLm51bWJlciA9PT0gbnVtYmVyKVswXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWNvcmRzIHRoZSB1c2Ugb2YgYSBzaW5nbGUgZ3Vlc3QgcGFzcy5cbiAgICAgKiBXZSBkbyBub3QgcmVxdWlyZSBhIGd1ZXN0IG5hbWUgaW4gdGhlIFNNUyBmbG93OyB0aGlzIHJldHVybnMgdGhlIHN0YXR1cy9wcm9tcHRcbiAgICAgKiBmb3IgZ3Vlc3QgcGFzc2VzIHNvIHRoZSBHdWVzdCBQYXNzIGNvbW1hbmQgYmVoYXZlcyBsaWtlIG90aGVyIGltbWVkaWF0ZSBhY3Rpb25zLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSByZXNwb25zZS5cbiAgICAgKi9cbiAgICBhc3luYyBzZXRfZ3Vlc3RfcGFzcygpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgLy8gQWxsb3cgYWxsIHBhdHJvbGxlcnMgKGluY2x1ZGluZyBjYW5kaWRhdGVzKSB0byB1c2UgZ3Vlc3QgcGFzc2VzIHdoZW4gYXZhaWxhYmxlLlxuICAgICAgICBjb25zdCBzaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2d1ZXN0X3Bhc3Nfc2hlZXQoKTtcbiAgICAgICAgY29uc3QgdXNlZF9hbmRfYXZhaWxhYmxlID0gYXdhaXQgc2hlZXQuZ2V0X2F2YWlsYWJsZV9hbmRfdXNlZF9wYXNzZXModGhpcy5wYXRyb2xsZXIhLm5hbWUpO1xuICAgICAgICBpZiAodXNlZF9hbmRfYXZhaWxhYmxlID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHJlc3BvbnNlOiBcIlByb2JsZW0gbG9va2luZyB1cCBwYXRyb2xsZXIgZm9yIGd1ZXN0IHBhc3Nlc1wiIH07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiB0aGVyZSBhcmUgbm8gYXZhaWxhYmxlIHBhc3NlcyB0b2RheSwgcmV0dXJuIHRoZSBwcm9tcHQgaW5kaWNhdGluZyBub25lIGFyZSBhdmFpbGFibGUuXG4gICAgICAgIGlmICh1c2VkX2FuZF9hdmFpbGFibGUuYXZhaWxhYmxlIDwgMSkge1xuICAgICAgICAgICAgcmV0dXJuIHVzZWRfYW5kX2F2YWlsYWJsZS5nZXRfcHJvbXB0KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDb25zdW1lIG9uZSBhdmFpbGFibGUgcGFzcyAodGhlIHNoZWV0IHJlY29yZHMgb25seSB0aGUgZGF0ZSBvZiB1c2UpLlxuICAgICAgICBhd2FpdCBzaGVldC5zZXRfdXNlZF9ndWVzdF9wYXNzZXModXNlZF9hbmRfYXZhaWxhYmxlKTtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKGBzZXRfZ3Vlc3RfcGFzc2ApO1xuXG5cbiAgICAgICAgLy8gUmUtcmVhZCB0aGUgdmFsdWVzIGFuZCByZXR1cm4gY29uZmlybWF0aW9uICsgdXBkYXRlZCBzdGF0dXMuXG4gICAgICAgIGNvbnN0IHVwZGF0ZWQgPSBhd2FpdCBzaGVldC5nZXRfYXZhaWxhYmxlX2FuZF91c2VkX3Bhc3Nlcyh0aGlzLnBhdHJvbGxlciEubmFtZSk7XG4gICAgICAgIGlmICh1cGRhdGVkID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHJlc3BvbnNlOiBgVXBkYXRlZCAke3RoaXMucGF0cm9sbGVyIS5uYW1lfSB0byB1c2UgYSBndWVzdCBwYXNzIHRvZGF5LmAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHN0YXR1cyA9IGJ1aWxkX3Bhc3Nlc19zdHJpbmcoXG4gICAgICAgICAgICB1cGRhdGVkLnVzZWRfc2Vhc29uLFxuICAgICAgICAgICAgdXBkYXRlZC51c2VkX3NlYXNvbiArIHVwZGF0ZWQuYXZhaWxhYmxlLFxuICAgICAgICAgICAgdXBkYXRlZC51c2VkX3RvZGF5XG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZTogYFVwZGF0ZWQgJHt0aGlzLnBhdHJvbGxlciEubmFtZX0gdG8gdXNlIGEgZ3Vlc3QgcGFzcyB0b2RheS5cXG4ke3N0YXR1c31gLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb21wdCB0aGUgdXNlciBmb3IgdGhlIGxvY2F0aW9uIG9mIHRoZWlyIGNvbXBsZXRlZCBiZWFjb24gc2VhcmNoXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHJlc3BvbnNlLlxuICAgICAqL1xuICAgIGFzeW5jIHByb21wdF9iZWFjb25fc2VhcmNoKCk6IFByb21pc2U8QlZOU1BSZXNwb25zZT4ge1xuICAgICAgICBpZiAoIXRoaXMucGF0cm9sbGVyIHx8ICF0aGlzLnBhdHJvbGxlci5jaGVja2luKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgJHt0aGlzLnBhdHJvbGxlciEubmFtZX0gaXMgbm90IGNoZWNrZWQgaW4uYCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3BvbnNlOiAgXCJPbiB3aGljaCBydW4gZGlkIHlvdSBjb21wbGV0ZSBhIGJlYWNvbiBzZWFyY2ggdG9kYXkgKG9yICdyZXN0YXJ0JyB0byBjYW5jZWwpP1wiLFxuICAgICAgICAgICAgbmV4dF9zdGVwOiBORVhUX1NURVBTLkFXQUlUX0JFQUNPTlxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlIGxvY2F0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHkgLSB0aGUgYm9keSBvZiB0aGUgcmVxdWVzdFxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHN0cmluZyB8IG51bGw+fSBUaGUgc2VhcmNoIGxvY2F0aW9uIGlmIHRoZSBsb2NhdGlvbiBpcyB2YWxpZFxuICAgICAqL1xuICAgIGFzeW5jIHBhcnNlX2JlYWNvbl9zZWFyY2hfbG9jYXRpb24oYm9keTogc3RyaW5nIHwgbnVsbCk6IFByb21pc2U8c3RyaW5nIHwgbnVsbD4ge1xuICAgICAgICBjb25zdCBzaGVldCA9IGF3YWl0IHRoaXMuZ2V0X3NsZWRfYmVhY29uX2NoZWNrX3NoZWV0KCk7XG4gICAgICAgIHJldHVybiBzaGVldC5wYXJzZV9sb2NhdGlvbihib2R5KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBzaGVldHNfdjQgfSBmcm9tIFwiZ29vZ2xlYXBpc1wiO1xuaW1wb3J0IHsgR3Vlc3RQYXNzZXNDb25maWcgfSBmcm9tIFwiLi4vZW52L2hhbmRsZXJfY29uZmlnXCI7XG5pbXBvcnQgeyBleGNlbF9yb3dfdG9faW5kZXgsIHJvd19jb2xfdG9fZXhjZWxfaW5kZXgsIHBhcnNlX2Jvb2xlYW5fY2VsbCB9IGZyb20gXCIuLi91dGlscy91dGlsXCI7XG5pbXBvcnQgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIgZnJvbSBcIi4uL3V0aWxzL2dvb2dsZV9zaGVldHNfc3ByZWFkc2hlZXRfdGFiXCI7XG5pbXBvcnQgeyBmb3JtYXRfZGF0ZV9mb3Jfc3ByZWFkc2hlZXRfdmFsdWUgfSBmcm9tIFwiLi4vdXRpbHMvZGF0ZXRpbWVfdXRpbFwiO1xuaW1wb3J0IHsgYnVpbGRfcGFzc2VzX3N0cmluZyB9IGZyb20gXCIuLi91dGlscy9ndWVzdF9wYXNzZXNcIjtcbmltcG9ydCB7IEJWTlNQUmVzcG9uc2UgfSBmcm9tIFwiLi4vaGFuZGxlcnMvYnZuc3BfaGFuZGxlclwiO1xuXG5leHBvcnQgY2xhc3MgVXNlZEFuZEF2YWlsYWJsZVBhc3NlcyB7XG4gICAgcm93OiBhbnlbXTtcbiAgICBpbmRleDogbnVtYmVyO1xuICAgIGVsaWdpYmxlOiBib29sZWFuO1xuICAgIGVsaWdpYmxlX3JlYXNvbjogc3RyaW5nO1xuICAgIGF2YWlsYWJsZTogbnVtYmVyO1xuICAgIHVzZWRfdG9kYXk6IG51bWJlcjtcbiAgICB1c2VkX3NlYXNvbjogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHJvdzogYW55W10sXG4gICAgICAgIGluZGV4OiBudW1iZXIsXG4gICAgICAgIGVsaWdpYmxlOiBhbnksXG4gICAgICAgIGVsaWdpYmxlX3JlYXNvbjogYW55LFxuICAgICAgICBhdmFpbGFibGU6IGFueSxcbiAgICAgICAgdXNlZF90b2RheTogYW55LFxuICAgICAgICB1c2VkX3NlYXNvbjogYW55XG4gICAgKSB7XG4gICAgICAgIHRoaXMucm93ID0gcm93O1xuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgICAgIHRoaXMuZWxpZ2libGUgPSBwYXJzZV9ib29sZWFuX2NlbGwoZWxpZ2libGUpO1xuICAgICAgICB0aGlzLmVsaWdpYmxlX3JlYXNvbiA9IFN0cmluZyhlbGlnaWJsZV9yZWFzb24gPz8gXCJcIik7XG4gICAgICAgIHRoaXMuYXZhaWxhYmxlID0gTnVtYmVyKGF2YWlsYWJsZSk7XG4gICAgICAgIHRoaXMudXNlZF90b2RheSA9IE51bWJlcih1c2VkX3RvZGF5KTtcbiAgICAgICAgdGhpcy51c2VkX3NlYXNvbiA9IE51bWJlcih1c2VkX3NlYXNvbik7XG4gICAgfVxuXG4gICAgZ2V0X3Byb21wdCgpOiBCVk5TUFJlc3BvbnNlIHtcbiAgICAgICAgaWYgKHRoaXMuYXZhaWxhYmxlID4gMCkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBidWlsZF9wYXNzZXNfc3RyaW5nKFxuICAgICAgICAgICAgICAgIHRoaXMudXNlZF9zZWFzb24sXG4gICAgICAgICAgICAgICAgdGhpcy5hdmFpbGFibGUgKyB0aGlzLnVzZWRfc2Vhc29uLFxuICAgICAgICAgICAgICAgIHRoaXMudXNlZF90b2RheSxcbiAgICAgICAgICAgICAgICB0cnVlXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmVsaWdpYmxlKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgWW91IGFyZSBub3QgZWxpZ2libGUgZm9yIGd1ZXN0IHBhc3Nlcy4gUmVhc29uOiAke3RoaXMuZWxpZ2libGVfcmVhc29ufWAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZTogXCJZb3UgZG8gbm90IGhhdmUgYW55IGd1ZXN0IHBhc3NlcyBhdmFpbGFibGUgdG9kYXlcIixcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQYXNzU2hlZXQge1xuICAgIHNoZWV0OiBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYjtcblxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihzaGVldDogR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIpIHtcbiAgICAgICAgdGhpcy5zaGVldCA9IHNoZWV0O1xuICAgIH1cblxuICAgIGFic3RyYWN0IGdldCBlbGlnaWJsZV9jb2x1bW4oKTogc3RyaW5nO1xuICAgIGFic3RyYWN0IGdldCBlbGlnaWJsZV9yZWFzb25fY29sdW1uKCk6IHN0cmluZztcbiAgICBhYnN0cmFjdCBnZXQgYXZhaWxhYmxlX2NvbHVtbigpOiBzdHJpbmc7XG4gICAgYWJzdHJhY3QgZ2V0IHVzZWRfdG9kYXlfY29sdW1uKCk6IHN0cmluZztcbiAgICBhYnN0cmFjdCBnZXQgdXNlZF9zZWFzb25fY29sdW1uKCk6IHN0cmluZztcbiAgICBhYnN0cmFjdCBnZXQgbmFtZV9jb2x1bW4oKTogc3RyaW5nO1xuICAgIGFic3RyYWN0IGdldCBzdGFydF9pbmRleCgpOiBudW1iZXI7XG4gICAgYWJzdHJhY3QgZ2V0IHNoZWV0X25hbWUoKTogc3RyaW5nO1xuXG4gICAgYXN5bmMgZ2V0X2F2YWlsYWJsZV9hbmRfdXNlZF9wYXNzZXMoXG4gICAgICAgIHBhdHJvbGxlcl9uYW1lOiBzdHJpbmdcbiAgICApOiBQcm9taXNlPFVzZWRBbmRBdmFpbGFibGVQYXNzZXMgfCBudWxsPiB7XG4gICAgICAgIGNvbnN0IHBhdHJvbGxlcl9yb3cgPSBhd2FpdCB0aGlzLnNoZWV0LmdldF9zaGVldF9yb3dfZm9yX3BhdHJvbGxlcihcbiAgICAgICAgICAgIHBhdHJvbGxlcl9uYW1lLFxuICAgICAgICAgICAgdGhpcy5uYW1lX2NvbHVtblxuICAgICAgICApO1xuICAgICAgICBpZiAocGF0cm9sbGVyX3JvdyA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBlbGlnaWJsZSA9XG4gICAgICAgICAgICBwYXRyb2xsZXJfcm93LnJvd1tleGNlbF9yb3dfdG9faW5kZXgodGhpcy5lbGlnaWJsZV9jb2x1bW4pXTtcbiAgICAgICAgY29uc3QgZWxpZ2libGVfcmVhc29uID1cbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cucm93W2V4Y2VsX3Jvd190b19pbmRleCh0aGlzLmVsaWdpYmxlX3JlYXNvbl9jb2x1bW4pXTtcbiAgICAgICAgY29uc3QgY3VycmVudF9kYXlfYXZhaWxhYmxlX3Bhc3NlcyA9XG4gICAgICAgICAgICBwYXRyb2xsZXJfcm93LnJvd1tleGNlbF9yb3dfdG9faW5kZXgodGhpcy5hdmFpbGFibGVfY29sdW1uKV07XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfZGF5X3VzZWRfcGFzc2VzID1cbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cucm93W2V4Y2VsX3Jvd190b19pbmRleCh0aGlzLnVzZWRfdG9kYXlfY29sdW1uKV07XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfc2Vhc29uX3VzZWRfcGFzc2VzID1cbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cucm93W2V4Y2VsX3Jvd190b19pbmRleCh0aGlzLnVzZWRfc2Vhc29uX2NvbHVtbildO1xuICAgICAgICByZXR1cm4gbmV3IFVzZWRBbmRBdmFpbGFibGVQYXNzZXMoXG4gICAgICAgICAgICBwYXRyb2xsZXJfcm93LnJvdyxcbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cuaW5kZXgsXG4gICAgICAgICAgICBlbGlnaWJsZSxcbiAgICAgICAgICAgIGVsaWdpYmxlX3JlYXNvbixcbiAgICAgICAgICAgIGN1cnJlbnRfZGF5X2F2YWlsYWJsZV9wYXNzZXMsXG4gICAgICAgICAgICBjdXJyZW50X2RheV91c2VkX3Bhc3NlcyxcbiAgICAgICAgICAgIGN1cnJlbnRfc2Vhc29uX3VzZWRfcGFzc2VzXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgYXN5bmMgc2V0X3VzZWRfZ3Vlc3RfcGFzc2VzKFxuICAgICAgICBwYXRyb2xsZXJfcm93OiBVc2VkQW5kQXZhaWxhYmxlUGFzc2VzLFxuICAgICkge1xuICAgICAgICBpZiAoIXBhdHJvbGxlcl9yb3cuZWxpZ2libGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICBgUGF0cm9sbGVyIGlzIG5vdCBlbGlnaWJsZSBmb3IgZ3Vlc3QgcGFzc2VzLiBSZWFzb246ICR7cGF0cm9sbGVyX3Jvdy5lbGlnaWJsZV9yZWFzb259YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGF0cm9sbGVyX3Jvdy5hdmFpbGFibGUgPCAxKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgYE5vdCBlbm91Z2ggYXZhaWxhYmxlIHBhc3NlczogQXZhaWxhYmxlOiAke3BhdHJvbGxlcl9yb3cuYXZhaWxhYmxlfSwgVXNlZCB0aGlzIHNlYXNvbjogICR7cGF0cm9sbGVyX3Jvdy51c2VkX3NlYXNvbn0sIFVzZWQgdG9kYXk6ICR7cGF0cm9sbGVyX3Jvdy51c2VkX3RvZGF5fWBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByb3dudW0gPSBwYXRyb2xsZXJfcm93LmluZGV4O1xuICAgICAgICBjb25zdCBzdGFydF9pbmRleCA9IHRoaXMuc3RhcnRfaW5kZXg7XG4gICAgICAgIGNvbnN0IHByaW9yX2xlbmd0aCA9IHBhdHJvbGxlcl9yb3cucm93Lmxlbmd0aCAtIHN0YXJ0X2luZGV4O1xuICAgICAgICBjb25zdCBjdXJyZW50X2RhdGVfc3RyaW5nID0gZm9ybWF0X2RhdGVfZm9yX3NwcmVhZHNoZWV0X3ZhbHVlKG5ldyBEYXRlKCkpO1xuXG4gICAgICAgIGNvbnN0IG5ld192YWxzID0gcGF0cm9sbGVyX3Jvdy5yb3dcbiAgICAgICAgICAgIC5zbGljZShzdGFydF9pbmRleClcbiAgICAgICAgICAgIC5tYXAoKHgpID0+IHg/LnRvU3RyaW5nKCkpO1xuXG4gICAgICAgIC8vIFJlY29yZCBvbmx5IHRoZSBkYXRlIG9mIHRoZSB1c2U7IG5vIGd1ZXN0IG5hbWUgaXMgc3RvcmVkLlxuICAgICAgICBuZXdfdmFscy5wdXNoKGN1cnJlbnRfZGF0ZV9zdHJpbmcpO1xuXG4gICAgICAgIGNvbnN0IHVwZGF0ZV9sZW5ndGggPSBNYXRoLm1heChwcmlvcl9sZW5ndGgsIG5ld192YWxzLmxlbmd0aCk7XG4gICAgICAgIHdoaWxlIChuZXdfdmFscy5sZW5ndGggPCB1cGRhdGVfbGVuZ3RoKSB7XG4gICAgICAgICAgICBuZXdfdmFscy5wdXNoKFwiXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZW5kX2luZGV4ID0gc3RhcnRfaW5kZXggKyB1cGRhdGVfbGVuZ3RoIC0gMTtcbiAgICAgICAgY29uc3QgcmFuZ2UgPSBgJHt0aGlzLnNoZWV0LnNoZWV0X25hbWV9ISR7cm93X2NvbF90b19leGNlbF9pbmRleChcbiAgICAgICAgICAgIHJvd251bSxcbiAgICAgICAgICAgIHN0YXJ0X2luZGV4XG4gICAgICAgICl9OiR7cm93X2NvbF90b19leGNlbF9pbmRleChyb3dudW0sIGVuZF9pbmRleCl9YDtcblxuICAgICAgICBjb25zb2xlLmxvZyhgVXBkYXRpbmcgJHtyYW5nZX0gd2l0aCAke25ld192YWxzLmxlbmd0aH0gdmFsdWVzYCk7XG4gICAgICAgIGF3YWl0IHRoaXMuc2hlZXQudXBkYXRlX3ZhbHVlcyhyYW5nZSwgW25ld192YWxzXSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgR3Vlc3RQYXNzU2hlZXQgZXh0ZW5kcyBQYXNzU2hlZXQge1xuICAgIGNvbmZpZzogR3Vlc3RQYXNzZXNDb25maWc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgc2hlZXRzX3NlcnZpY2U6IHNoZWV0c192NC5TaGVldHMgfCBudWxsLFxuICAgICAgICBjb25maWc6IEd1ZXN0UGFzc2VzQ29uZmlnXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgbmV3IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiKFxuICAgICAgICAgICAgICAgIHNoZWV0c19zZXJ2aWNlLFxuICAgICAgICAgICAgICAgIGNvbmZpZy5TSEVFVF9JRCxcbiAgICAgICAgICAgICAgICBjb25maWcuR1VFU1RfUEFTU19TSEVFVFxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICB9XG5cbiAgICBnZXQgc3RhcnRfaW5kZXgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGV4Y2VsX3Jvd190b19pbmRleChcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLkdVRVNUX1BBU1NfU0hFRVRfREFURVNfU1RBUlRJTkdfQ09MVU1OXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0IHNoZWV0X25hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLkdVRVNUX1BBU1NfU0hFRVQ7XG4gICAgfVxuXG4gICAgZ2V0IGVsaWdpYmxlX2NvbHVtbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuR1VFU1RfUEFTU19FTElHSUJMRV9DT0xVTU47XG4gICAgfVxuXG4gICAgZ2V0IGVsaWdpYmxlX3JlYXNvbl9jb2x1bW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLkdVRVNUX1BBU1NfRUxJR0lCTEVfUkVBU09OX0NPTFVNTjtcbiAgICB9XG5cbiAgICBnZXQgYXZhaWxhYmxlX2NvbHVtbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuR1VFU1RfUEFTU19TSEVFVF9BVkFJTEFCTEVfQ09MVU1OO1xuICAgIH1cblxuICAgIGdldCB1c2VkX3RvZGF5X2NvbHVtbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuR1VFU1RfUEFTU19TSEVFVF9VU0VEX1RPREFZX0NPTFVNTjtcbiAgICB9XG5cbiAgICBnZXQgdXNlZF9zZWFzb25fY29sdW1uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5HVUVTVF9QQVNTX1NIRUVUX1VTRURfU0VBU09OX0NPTFVNTjtcbiAgICB9XG5cbiAgICBnZXQgbmFtZV9jb2x1bW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLkdVRVNUX1BBU1NfU0hFRVRfTkFNRV9DT0xVTU47XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQsIGV4Y2VsX3Jvd190b19pbmRleCB9IGZyb20gXCIuLi91dGlscy91dGlsXCI7XG5pbXBvcnQgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIgZnJvbSBcIi4uL3V0aWxzL2dvb2dsZV9zaGVldHNfc3ByZWFkc2hlZXRfdGFiXCI7XG5pbXBvcnQgeyBzYW5pdGl6ZV9kYXRlIH0gZnJvbSBcIi4uL3V0aWxzL2RhdGV0aW1lX3V0aWxcIjtcbmltcG9ydCB7IExvZ2luU2hlZXRDb25maWcsIFBhdHJvbGxlclJvd0NvbmZpZyB9IGZyb20gXCIuLi9lbnYvaGFuZGxlcl9jb25maWdcIjtcbmltcG9ydCB7IHNoZWV0c192NCB9IGZyb20gXCJnb29nbGVhcGlzXCI7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHJvdyBvZiBwYXRyb2xsZXIgZGF0YS5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IFBhdHJvbGxlclJvd1xuICogQHByb3BlcnR5IHtudW1iZXJ9IGluZGV4IC0gVGhlIGluZGV4IG9mIHRoZSByb3cuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwYXRyb2xsZXIuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gY2F0ZWdvcnkgLSBUaGUgY2F0ZWdvcnkgb2YgdGhlIHBhdHJvbGxlci5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBzZWN0aW9uIC0gVGhlIHNlY3Rpb24gb2YgdGhlIHBhdHJvbGxlci5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBjaGVja2luIC0gVGhlIGNoZWNrLWluIHN0YXR1cyBvZiB0aGUgcGF0cm9sbGVyLlxuICovXG5leHBvcnQgdHlwZSBQYXRyb2xsZXJSb3cgPSB7XG4gICAgaW5kZXg6IG51bWJlcjtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgY2F0ZWdvcnk6IHN0cmluZztcbiAgICBzZWN0aW9uOiBzdHJpbmc7XG4gICAgY2hlY2tpbjogc3RyaW5nO1xufTtcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBsb2dpbiBzaGVldCBpbiBHb29nbGUgU2hlZXRzLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dpblNoZWV0IHtcbiAgICBsb2dpbl9zaGVldDogR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWI7XG4gICAgY2hlY2tpbl9jb3VudF9zaGVldDogR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWI7XG4gICAgY29uZmlnOiBMb2dpblNoZWV0Q29uZmlnO1xuICAgIHJvd3M/OiBhbnlbXVtdIHwgbnVsbCA9IG51bGw7XG4gICAgY2hlY2tpbl9jb3VudDogbnVtYmVyIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgIHBhdHJvbGxlcnM6IFBhdHJvbGxlclJvd1tdID0gW107XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIExvZ2luU2hlZXQuXG4gICAgICogQHBhcmFtIHtzaGVldHNfdjQuU2hlZXRzIHwgbnVsbH0gc2hlZXRzX3NlcnZpY2UgLSBUaGUgR29vZ2xlIFNoZWV0cyBBUEkgc2VydmljZS5cbiAgICAgKiBAcGFyYW0ge0xvZ2luU2hlZXRDb25maWd9IGNvbmZpZyAtIFRoZSBjb25maWd1cmF0aW9uIGZvciB0aGUgbG9naW4gc2hlZXQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzIHwgbnVsbCxcbiAgICAgICAgY29uZmlnOiBMb2dpblNoZWV0Q29uZmlnXG4gICAgKSB7XG4gICAgICAgIHRoaXMubG9naW5fc2hlZXQgPSBuZXcgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIoXG4gICAgICAgICAgICBzaGVldHNfc2VydmljZSxcbiAgICAgICAgICAgIGNvbmZpZy5TSEVFVF9JRCxcbiAgICAgICAgICAgIGNvbmZpZy5MT0dJTl9TSEVFVF9MT09LVVBcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jaGVja2luX2NvdW50X3NoZWV0ID0gbmV3IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiKFxuICAgICAgICAgICAgc2hlZXRzX3NlcnZpY2UsXG4gICAgICAgICAgICBjb25maWcuU0hFRVRfSUQsXG4gICAgICAgICAgICBjb25maWcuQ0hFQ0tJTl9DT1VOVF9MT09LVVBcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVmcmVzaGVzIHRoZSBkYXRhIGZyb20gdGhlIEdvb2dsZSBTaGVldHMuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAgICovXG4gICAgYXN5bmMgcmVmcmVzaCgpIHtcbiAgICAgICAgdGhpcy5yb3dzID0gYXdhaXQgdGhpcy5sb2dpbl9zaGVldC5nZXRfdmFsdWVzKFxuICAgICAgICAgICAgdGhpcy5jb25maWcuTE9HSU5fU0hFRVRfTE9PS1VQXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY2hlY2tpbl9jb3VudCA9IChhd2FpdCB0aGlzLmNoZWNraW5fY291bnRfc2hlZXQuZ2V0X3ZhbHVlcyhcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLkNIRUNLSU5fQ09VTlRfTE9PS1VQXG4gICAgICAgICkpIVswXVswXTtcbiAgICAgICAgdGhpcy5wYXRyb2xsZXJzID0gdGhpcy5yb3dzIS5tYXAoKHgsIGkpID0+XG4gICAgICAgICAgICB0aGlzLnBhcnNlX3BhdHJvbGxlcl9yb3coaSwgeCwgdGhpcy5jb25maWcpXG4gICAgICAgICkuZmlsdGVyKCh4KSA9PiB4ICE9IG51bGwpIGFzIFBhdHJvbGxlclJvd1tdO1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiUmVmcmVzaGluZyBQYXRyb2xsZXJzOiBcIiApO1xuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMucGF0cm9sbGVycyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgYXJjaGl2ZWQgc3RhdHVzIG9mIHRoZSBsb2dpbiBzaGVldC5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc2hlZXQgaXMgYXJjaGl2ZWQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKi9cbiAgICBnZXQgYXJjaGl2ZWQoKSB7XG4gICAgICAgIGNvbnN0IGFyY2hpdmVkID0gbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQoXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5BUkNISVZFRF9DRUxMLFxuICAgICAgICAgICAgdGhpcy5yb3dzIVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgKGFyY2hpdmVkID09PSB1bmRlZmluZWQgJiYgdGhpcy5jaGVja2luX2NvdW50ID09PSAwKSB8fFxuICAgICAgICAgICAgYXJjaGl2ZWQudG9Mb3dlckNhc2UoKSA9PT0gXCJ5ZXNcIlxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGRhdGUgb2YgdGhlIHNoZWV0LlxuICAgICAqIEByZXR1cm5zIHtEYXRlfSBUaGUgZGF0ZSBvZiB0aGUgc2hlZXQuXG4gICAgICovXG4gICAgZ2V0IHNoZWV0X2RhdGUoKSB7XG4gICAgICAgIHJldHVybiBzYW5pdGl6ZV9kYXRlKFxuICAgICAgICAgICAgbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQodGhpcy5jb25maWcuU0hFRVRfREFURV9DRUxMLCB0aGlzLnJvd3MhKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGN1cnJlbnQgZGF0ZS5cbiAgICAgKiBAcmV0dXJucyB7RGF0ZX0gVGhlIGN1cnJlbnQgZGF0ZS5cbiAgICAgKi9cbiAgICBnZXQgY3VycmVudF9kYXRlKCkge1xuICAgICAgICByZXR1cm4gc2FuaXRpemVfZGF0ZShcbiAgICAgICAgICAgIGxvb2t1cF9yb3dfY29sX2luX3NoZWV0KHRoaXMuY29uZmlnLkNVUlJFTlRfREFURV9DRUxMLCB0aGlzLnJvd3MhKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGUgc2hlZXQgZGF0ZSBpcyB0aGUgY3VycmVudCBkYXRlLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzaGVldCBkYXRlIGlzIHRoZSBjdXJyZW50IGRhdGUsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKi9cbiAgICBnZXQgaXNfY3VycmVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hlZXRfZGF0ZS5nZXRUaW1lKCkgPT09IHRoaXMuY3VycmVudF9kYXRlLmdldFRpbWUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmllcyB0byBmaW5kIGEgcGF0cm9sbGVyIGJ5IG5hbWUuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcGF0cm9sbGVyLlxuICAgICAqIEByZXR1cm5zIHtQYXRyb2xsZXJSb3cgfCBcIm5vdF9mb3VuZFwifSBUaGUgcGF0cm9sbGVyIHJvdyBvciBcIm5vdF9mb3VuZFwiLlxuICAgICAqL1xuICAgIHRyeV9maW5kX3BhdHJvbGxlcihuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgcGF0cm9sbGVycyA9IHRoaXMucGF0cm9sbGVycy5maWx0ZXIoKHgpID0+IHgubmFtZSA9PT0gbmFtZSk7XG4gICAgICAgIGlmIChwYXRyb2xsZXJzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIFwibm90X2ZvdW5kXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhdHJvbGxlcnNbMF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcGF0cm9sbGVycyB3aG8gYXJlIG9uIGR1dHkuXG4gICAgICogQHJldHVybnMge1BhdHJvbGxlclJvd1tdfSBUaGUgbGlzdCBvZiBvbi1kdXR5IHBhdHJvbGxlcnMuXG4gICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBsb2dpbiBzaGVldCBpcyBub3QgY3VycmVudC5cbiAgICAgKi9cbiAgICBnZXRfb25fZHV0eV9wYXRyb2xsZXJzKCk6IFBhdHJvbGxlclJvd1tdIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzX2N1cnJlbnQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxvZ2luIHNoZWV0IGlzIG5vdCBjdXJyZW50XCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnBhdHJvbGxlcnMuZmlsdGVyKCh4KSA9PiB4LmNoZWNraW4pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpbiBhIHBhdHJvbGxlciB3aXRoIGEgbmV3IGNoZWNrLWluIHZhbHVlLlxuICAgICAqIEBwYXJhbSB7UGF0cm9sbGVyUm93fSBwYXRyb2xsZXJfc3RhdHVzIC0gVGhlIHN0YXR1cyBvZiB0aGUgcGF0cm9sbGVyLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuZXdfY2hlY2tpbl92YWx1ZSAtIFRoZSBuZXcgY2hlY2staW4gdmFsdWUuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBsb2dpbiBzaGVldCBpcyBub3QgY3VycmVudC5cbiAgICAgKi9cbiAgICBhc3luYyBjaGVja2luKHBhdHJvbGxlcl9zdGF0dXM6IFBhdHJvbGxlclJvdywgbmV3X2NoZWNraW5fdmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAoIXRoaXMuaXNfY3VycmVudCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTG9naW4gc2hlZXQgaXMgbm90IGN1cnJlbnRcIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coYEV4aXN0aW5nIHN0YXR1czogJHtKU09OLnN0cmluZ2lmeShwYXRyb2xsZXJfc3RhdHVzKX1gKTtcblxuICAgICAgICBjb25zdCByb3cgPSBwYXRyb2xsZXJfc3RhdHVzLmluZGV4ICsgMTsgLy8gcHJvZ3JhbW1pbmcgLT4gZXhjZWwgbG9va3VwXG4gICAgICAgIGNvbnN0IHJhbmdlID0gYCR7dGhpcy5jb25maWcuQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU59JHtyb3d9YDtcblxuICAgICAgICBhd2FpdCB0aGlzLmxvZ2luX3NoZWV0LnVwZGF0ZV92YWx1ZXMocmFuZ2UsIFtbbmV3X2NoZWNraW5fdmFsdWVdXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXNzaWducyBhIHNlY3Rpb24gdG8gYSBwYXRyb2xsZXIuXG4gICAgICogQHBhcmFtIHBhdHJvbGxlcl9zZWN0aW9uIFRoZSByb3cgZm9yIHRoZSBwYXRyb2xsZXIgdGhhdCBuZWVkcyB0byBoYXZlIGEgc2VjdGlvbiBhc3NpZ25lZCB0by5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmV3X3NlY3Rpb25fdmFsdWUgLSBUaGUgbmV3IHNlY3Rpb24gdmFsdWUuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBsb2dpbiBzaGVldCBpcyBub3QgY3VycmVudC5cbiAgICAgKi9cbiAgICBhc3luYyBhc3NpZ25fc2VjdGlvbihwYXRyb2xsZXJfc2VjdGlvbjogUGF0cm9sbGVyUm93LCBuZXdfc2VjdGlvbl92YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICghdGhpcy5pc19jdXJyZW50KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJMb2dpbiBzaGVldCBpcyBub3QgY3VycmVudFwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhgRXhpc3Rpbmcgc3RhdHVzOiAke0pTT04uc3RyaW5naWZ5KHBhdHJvbGxlcl9zZWN0aW9uKX1gKTtcblxuICAgICAgICBjb25zdCByb3cgPSBwYXRyb2xsZXJfc2VjdGlvbi5pbmRleCArIDE7IC8vIHByb2dyYW1taW5nIC0+IGV4Y2VsIGxvb2t1cFxuICAgICAgICBjb25zdCByYW5nZSA9IGAke3RoaXMuY29uZmlnLlNFQ1RJT05fRFJPUERPV05fQ09MVU1OfSR7cm93fWA7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5sb2dpbl9zaGVldC51cGRhdGVfdmFsdWVzKHJhbmdlLCBbW25ld19zZWN0aW9uX3ZhbHVlXV0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlcyBhIHJvdyBvZiBwYXRyb2xsZXIgZGF0YS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggLSBUaGUgaW5kZXggb2YgdGhlIHJvdy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSByb3cgLSBUaGUgcm93IGRhdGEuXG4gICAgICogQHBhcmFtIHtQYXRyb2xsZXJSb3dDb25maWd9IG9wdHMgLSBUaGUgY29uZmlndXJhdGlvbiBvcHRpb25zIGZvciB0aGUgcGF0cm9sbGVyIHJvdy5cbiAgICAgKiBAcmV0dXJucyB7UGF0cm9sbGVyUm93IHwgbnVsbH0gVGhlIHBhcnNlZCBwYXRyb2xsZXIgcm93IG9yIG51bGwgaWYgaW52YWxpZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHBhcnNlX3BhdHJvbGxlcl9yb3coXG4gICAgICAgIGluZGV4OiBudW1iZXIsXG4gICAgICAgIHJvdzogc3RyaW5nW10sXG4gICAgICAgIG9wdHM6IFBhdHJvbGxlclJvd0NvbmZpZ1xuICAgICk6IFBhdHJvbGxlclJvdyB8IG51bGwge1xuICAgICAgICBpZiAocm93Lmxlbmd0aCA8IDQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbmRleCA8IDMpe1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIG5hbWU6IHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5OQU1FX0NPTFVNTildLFxuICAgICAgICAgICAgY2F0ZWdvcnk6IHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5DQVRFR09SWV9DT0xVTU4pXSxcbiAgICAgICAgICAgIHNlY3Rpb246IHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5TRUNUSU9OX0RST1BET1dOX0NPTFVNTildLFxuICAgICAgICAgICAgY2hlY2tpbjogcm93W2V4Y2VsX3Jvd190b19pbmRleChvcHRzLkNIRUNLSU5fRFJPUERPV05fQ09MVU1OKV0sXG4gICAgICAgIH07XG4gICAgfVxufSIsImltcG9ydCB7c2hlZXRzX3Y0fSBmcm9tIFwiZ29vZ2xlYXBpc1wiO1xuaW1wb3J0IHtTZWFzb25TaGVldENvbmZpZyx9IGZyb20gXCIuLi9lbnYvaGFuZGxlcl9jb25maWdcIjtcbmltcG9ydCB7ZXhjZWxfcm93X3RvX2luZGV4fSBmcm9tIFwiLi4vdXRpbHMvdXRpbFwiO1xuaW1wb3J0IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiIGZyb20gXCIuLi91dGlscy9nb29nbGVfc2hlZXRzX3NwcmVhZHNoZWV0X3RhYlwiO1xuaW1wb3J0IHtmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9jdXJyZW50X2RheX0gZnJvbSBcIi4uL3V0aWxzL2RhdGV0aW1lX3V0aWxcIjtcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBzZWFzb24gc2hlZXQgaW4gR29vZ2xlIFNoZWV0cy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2Vhc29uU2hlZXQge1xuICAgIHNoZWV0OiBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYjtcbiAgICBjb25maWc6IFNlYXNvblNoZWV0Q29uZmlnO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBTZWFzb25TaGVldC5cbiAgICAgKiBAcGFyYW0ge3NoZWV0c192NC5TaGVldHMgfCBudWxsfSBzaGVldHNfc2VydmljZSAtIFRoZSBHb29nbGUgU2hlZXRzIEFQSSBzZXJ2aWNlLlxuICAgICAqIEBwYXJhbSB7U2Vhc29uU2hlZXRDb25maWd9IGNvbmZpZyAtIFRoZSBjb25maWd1cmF0aW9uIGZvciB0aGUgc2Vhc29uIHNoZWV0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyB8IG51bGwsXG4gICAgICAgIGNvbmZpZzogU2Vhc29uU2hlZXRDb25maWdcbiAgICApIHtcbiAgICAgICAgdGhpcy5zaGVldCA9IG5ldyBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYihcbiAgICAgICAgICAgIHNoZWV0c19zZXJ2aWNlLFxuICAgICAgICAgICAgY29uZmlnLlNIRUVUX0lELFxuICAgICAgICAgICAgY29uZmlnLlNFQVNPTl9TSEVFVFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBudW1iZXIgb2YgZGF5cyBwYXRyb2xsZWQgYnkgYSBwYXRyb2xsZXIuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdHJvbGxlcl9uYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHBhdHJvbGxlci5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxudW1iZXI+fSBUaGUgbnVtYmVyIG9mIGRheXMgcGF0cm9sbGVkLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF9wYXRyb2xsZWRfZGF5cyhcbiAgICAgICAgcGF0cm9sbGVyX25hbWU6IHN0cmluZ1xuICAgICk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgICAgIGNvbnN0IHBhdHJvbGxlcl9yb3cgPSBhd2FpdCB0aGlzLnNoZWV0LmdldF9zaGVldF9yb3dfZm9yX3BhdHJvbGxlcihcbiAgICAgICAgICAgIHBhdHJvbGxlcl9uYW1lLFxuICAgICAgICAgICAgdGhpcy5jb25maWcuU0VBU09OX1NIRUVUX05BTUVfQ09MVU1OXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKCFwYXRyb2xsZXJfcm93KSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjdXJyZW50TnVtYmVyID1cbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cucm93W2V4Y2VsX3Jvd190b19pbmRleCh0aGlzLmNvbmZpZy5TRUFTT05fU0hFRVRfREFZU19DT0xVTU4pXTtcblxuICAgICAgICBjb25zdCBjdXJyZW50RGF5ID0gZmlsdGVyX2xpc3RfdG9fZW5kc3dpdGhfY3VycmVudF9kYXkocGF0cm9sbGVyX3Jvdy5yb3cpXG4gICAgICAgICAgICAubWFwKCh4KSA9PiAoeD8uc3RhcnRzV2l0aChcIkhcIikgPyAwLjUgOiAxKSlcbiAgICAgICAgICAgIC5yZWR1Y2UoKHgsIHksIGkpID0+IHggKyB5LCAwKTtcblxuICAgICAgICByZXR1cm4gY3VycmVudE51bWJlciAtIGN1cnJlbnREYXk7XG4gICAgfVxufSIsImltcG9ydCB7c2hlZXRzX3Y0fSBmcm9tIFwiZ29vZ2xlYXBpc1wiO1xuaW1wb3J0IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiIGZyb20gXCIuLi91dGlscy9nb29nbGVfc2hlZXRzX3NwcmVhZHNoZWV0X3RhYlwiO1xuaW1wb3J0IHtTbGVkQmVhY29uQ29uZmlnfSBmcm9tIFwiLi4vZW52L2hhbmRsZXJfY29uZmlnXCI7XG5pbXBvcnQge2V4Y2VsX3Jvd190b19pbmRleCwgcm93X2NvbF90b19leGNlbF9pbmRleH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxcIjtcbmltcG9ydCB7QlZOU1BSZXNwb25zZX0gZnJvbSBcIi4uL2hhbmRsZXJzL2J2bnNwX2hhbmRsZXJcIjtcbmltcG9ydCB7Zm9ybWF0X2RhdGVfZm9yX3NwcmVhZHNoZWV0X3ZhbHVlfSBmcm9tIFwiLi4vdXRpbHMvZGF0ZXRpbWVfdXRpbFwiO1xuXG5cbmV4cG9ydCBjbGFzcyBCZWFjb25TZWFyY2hlcyB7XG4gICAgcm93OiBhbnlbXTtcbiAgICBpbmRleDogbnVtYmVyO1xuICAgIHNlYXJjaF9jb3VudDogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHJvdzogYW55W10sXG4gICAgICAgIGluZGV4OiBudW1iZXIsXG4gICAgICAgIHNlYXJjaF9jb3VudDogYW55XG4gICAgKSB7XG4gICAgICAgIHRoaXMucm93ID0gcm93O1xuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgICAgIHRoaXMuc2VhcmNoX2NvdW50ID0gTnVtYmVyKHNlYXJjaF9jb3VudCk7XG4gICAgfVxufVxuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhIFNsZWQgQmVhY29uIENoZWNrIFNoZWV0IGluIEdvb2dsZSBTaGVldHNcbiAqL1xuZXhwb3J0ICBjbGFzcyBTbGVkQmVhY29uQ2hlY2tTaGVldCAge1xuICAgIHNsZWRfYmVhY29uX2NoZWNrX3NoZWV0OiBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYjtcbiAgICBjb25maWc6IFNsZWRCZWFjb25Db25maWdcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgTG9naW5TaGVldC5cbiAgICAgKiBAcGFyYW0ge3NoZWV0c192NC5TaGVldHMgfCBudWxsfSBzaGVldHNfc2VydmljZSAtIFRoZSBHb29nbGUgU2hlZXRzIEFQSSBzZXJ2aWNlLlxuICAgICAqIEBwYXJhbSB7U2xlZEJlYWNvbkNvbmZpZ30gY29uZmlnIC0gVGhlIGNvbmZpZ3VyYXRpb24gZm9yIHRoaXMgc2hlZXQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzIHwgbnVsbCxcbiAgICAgICAgY29uZmlnOiBTbGVkQmVhY29uQ29uZmlnXG4gICAgKSB7XG4gICAgICAgIHRoaXMuc2xlZF9iZWFjb25fY2hlY2tfc2hlZXQgPSBuZXcgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIoXG4gICAgICAgICAgICBzaGVldHNfc2VydmljZSxcbiAgICAgICAgICAgIGNvbmZpZy5TSEVFVF9JRCxcbiAgICAgICAgICAgIGNvbmZpZy5TTEVEX0JFQUNPTl9TSEVFVFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICB9XG5cbiAgICBnZXQgc3RhcnRfaW5kZXgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGV4Y2VsX3Jvd190b19pbmRleChcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLkJFQUNPTl9GSU5EX0RBVEVTX1NUQVJUSU5HX0NPTFVNTlxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldCBzaGVldF9uYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5TTEVEX0JFQUNPTl9TSEVFVDtcbiAgICB9XG5cbiAgICBnZXQgbmFtZV9jb2x1bW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLlNMRURfQkVBQ09OX1NIRUVUX05BTUVfQ09MVU1OO1xuICAgIH1cblxuICAgIGdldCBiZWFjb25fc2VhcmNoX2NvdW50X2NvbHVtbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuQkVBQ09OX1NFQVJDSF9DT1VOVF9DT0xVTU47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBjdXJyZW50IHNlYXJjaGVzIGZvciB0aGUgZ2l2ZW4gcGF0cm9sbGVyXG4gICAgICogQHBhcmFtIHBhdHJvbGxlcl9uYW1lXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X2JlYWNvbl9zZWFyY2hlcyhcbiAgICAgICAgcGF0cm9sbGVyX25hbWU6IHN0cmluZ1xuICAgICk6IFByb21pc2U8QmVhY29uU2VhcmNoZXMgfCBudWxsPiB7XG4gICAgICAgIGNvbnN0IHBhdHJvbGxlcl9yb3cgPSBhd2FpdCB0aGlzLnNsZWRfYmVhY29uX2NoZWNrX3NoZWV0LmdldF9zaGVldF9yb3dfZm9yX3BhdHJvbGxlcihcbiAgICAgICAgICAgIHBhdHJvbGxlcl9uYW1lLFxuICAgICAgICAgICAgdGhpcy5uYW1lX2NvbHVtblxuICAgICAgICApO1xuICAgICAgICBpZiAocGF0cm9sbGVyX3JvdyA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZWFyY2hfY291bnQgPSBwYXRyb2xsZXJfcm93LnJvd1tleGNlbF9yb3dfdG9faW5kZXgodGhpcy5iZWFjb25fc2VhcmNoX2NvdW50X2NvbHVtbildO1xuICAgICAgICByZXR1cm4gbmV3IEJlYWNvblNlYXJjaGVzKFxuICAgICAgICAgICAgcGF0cm9sbGVyX3Jvdy5yb3csXG4gICAgICAgICAgICBwYXRyb2xsZXJfcm93LmluZGV4LFxuICAgICAgICAgICAgc2VhcmNoX2NvdW50XG4gICAgICAgICk7XG5cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG51bWJlciBvZiBiZWFjb24gZmluZHMgYnkgYSBwYXRyb2xsZXIuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdHJvbGxlcl9uYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHBhdHJvbGxlci5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxudW1iZXI+fSBUaGUgbnVtYmVyIG9mIHRpbWVzIHRoaXMgcGF0cm9sbGVyIGZvdW5kIGEgYmVhY29ucy5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfcGF0cm9sbGVkX2JlYWNvbl9maW5kX2NvdW50KFxuICAgICAgICBwYXRyb2xsZXJfbmFtZTogc3RyaW5nXG4gICAgKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICAgICAgY29uc3QgcGF0cm9sbGVyX3JvdyA9IGF3YWl0IHRoaXMuc2xlZF9iZWFjb25fY2hlY2tfc2hlZXQuZ2V0X3NoZWV0X3Jvd19mb3JfcGF0cm9sbGVyKFxuICAgICAgICAgICAgcGF0cm9sbGVyX25hbWUsXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5TTEVEX0JFQUNPTl9TSEVFVF9OQU1FX0NPTFVNTlxuICAgICAgICApO1xuXG4gICAgICAgIGlmICghcGF0cm9sbGVyX3Jvdykge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhdHJvbGxlcl9yb3cucm93W2V4Y2VsX3Jvd190b19pbmRleCh0aGlzLmNvbmZpZy5CRUFDT05fU0VBUkNIX0NPVU5UX0NPTFVNTildO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlY29yZCBhIG5ldyBiZWFjb24gc2VhcmNoIGZvciB0b2RheSBhdCB0aGUgc3BlY2lmaWVkIGxvY2F0aW9uLlxuICAgICAqIEBwYXJhbSBwYXRyb2xsZXJfcm93XG4gICAgICogQHBhcmFtIHNlYXJjaF9sb2NhdGlvblxuICAgICAqL1xuICAgIGFzeW5jIHNldF9iZWFjb25zX3NlYXJjaGVzKFxuICAgICAgICBwYXRyb2xsZXJfcm93OiBCZWFjb25TZWFyY2hlcyxcbiAgICAgICAgc2VhcmNoX2xvY2F0aW9uOiBzdHJpbmdcbiAgICApIHtcbiAgICAgICAgY29uc3QgIHJvd19udW0gPSBwYXRyb2xsZXJfcm93LmluZGV4O1xuICAgICAgICBjb25zdCBzdGFydF9pbmRleCA9IHRoaXMuc3RhcnRfaW5kZXg7XG4gICAgICAgIGNvbnN0IHByaW9yX2xlbmd0aCA9IHBhdHJvbGxlcl9yb3cucm93Lmxlbmd0aCAtIHN0YXJ0X2luZGV4O1xuICAgICAgICBjb25zdCBjdXJyZW50X2RhdGVfc3RyaW5nID0gZm9ybWF0X2RhdGVfZm9yX3NwcmVhZHNoZWV0X3ZhbHVlKG5ldyBEYXRlKCkpO1xuXG4gICAgICAgIGxldCBuZXdfdmFscyA9IHBhdHJvbGxlcl9yb3cucm93XG4gICAgICAgICAgICAuc2xpY2Uoc3RhcnRfaW5kZXgpXG4gICAgICAgICAgICAubWFwKCh4KSA9PiB4Py50b1N0cmluZygpKTtcblxuICAgICAgICAvLyBSZWNvcmQgIHRoZSBkYXRlIG9mIHRoZSBzZWFyY2ggYW5kIHRoZSBsb2NhdGlvblxuICAgICAgICBuZXdfdmFscy5wdXNoKGN1cnJlbnRfZGF0ZV9zdHJpbmcrIFwiLFwiICsgc2VhcmNoX2xvY2F0aW9uKTtcblxuICAgICAgICBjb25zdCB1cGRhdGVfbGVuZ3RoID0gTWF0aC5tYXgocHJpb3JfbGVuZ3RoLCBuZXdfdmFscy5sZW5ndGgpO1xuICAgICAgICB3aGlsZSAobmV3X3ZhbHMubGVuZ3RoIDwgdXBkYXRlX2xlbmd0aCkge1xuICAgICAgICAgICAgbmV3X3ZhbHMucHVzaChcIlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGVuZF9pbmRleCA9IHN0YXJ0X2luZGV4ICsgdXBkYXRlX2xlbmd0aCAtIDE7XG4gICAgICAgIGNvbnN0IHJhbmdlID0gYCR7dGhpcy5zbGVkX2JlYWNvbl9jaGVja19zaGVldC5zaGVldF9uYW1lfSEke3Jvd19jb2xfdG9fZXhjZWxfaW5kZXgoXG4gICAgICAgICAgICByb3dfbnVtLFxuICAgICAgICAgICAgc3RhcnRfaW5kZXhcbiAgICAgICAgKX06JHtyb3dfY29sX3RvX2V4Y2VsX2luZGV4KHJvd19udW0sIGVuZF9pbmRleCl9YDtcblxuICAgICAgICBjb25zb2xlLmxvZyhgVXBkYXRpbmcgJHtyYW5nZX0gd2l0aCAke25ld192YWxzLmxlbmd0aH0gdmFsdWVzYCk7XG4gICAgICAgIGF3YWl0IHRoaXMuc2xlZF9iZWFjb25fY2hlY2tfc2hlZXQudXBkYXRlX3ZhbHVlcyhyYW5nZSwgW25ld192YWxzXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2UgbG9jYXRpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYm9keSAtIHRoZSBib2R5IG9mIHRoZSByZXF1ZXN0XG4gICAgICogQHJldHVybnMge3N0cmluZyB8IG51bGx9IFRoZSBzZWFyY2ggbG9jYXRpb24gaWYgdGhlIGxvY2F0aW9uIGlzIHZhbGlkXG4gICAgICovXG4gICAgcGFyc2VfbG9jYXRpb24oYm9keTogc3RyaW5nIHwgbnVsbCk6IHN0cmluZyB8bnVsbCAge1xuICAgICAgICBpZiAoYm9keSA9PT0gbnVsbCApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmNsZWFuU21zVmFsdWUoYm9keSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2FuaXRpemUgaW5wdXQgZm9yIHN0b3JhZ2UgaW4gR29vZ2xlIFNoZWV0cyBhbmQgVHdpbGlvIFNNUyBmb3J3YXJ0ZGluZywgYnkgYXZvaWRpbmdcbiAgICAgKiAtIEZsYXR0ZW5zIG11bHRpLWxpbmUgaW5wdXRzLCB0YWJzLCBhbmQgaGlkZGVuIGNvbnRyb2wgY2hhcmFjdGVycyBpbnRvIHNpbmdsZSBzcGFjZXMuXG4gICAgICogLSBUcmltcyBhbmQgbm9ybWFsaXplcyBleGNlc3NpdmUgd2hpdGVzcGFjZS5cbiAgICAgKiAtIFN0cmlwcyBsZWFkaW5nIGZvcm11bGEgaW5qZWN0aW9uIHRyaWdnZXJzICg9LCArLCAtLCBAKSB0byBwcmV2ZW50IGNlbGwgZXhlY3V0aW9uLlxuICAgICAqIC0gU3RyaXBzIGVtb2ppcywgbWlzY2VsbGFuZW91cyBzeW1ib2xzLCBhbmQgdHJhbnNwb3J0L21hcCBpbmRpY2F0b3JzLlxuICAgICAqIC0gU2FmZWx5IHRydW5jYXRlcyB0ZXh0IHRvIGEgbWF4aW11bSBjaGFyYWN0ZXIgbGVuZ3RoLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlucHV0IC0gVGhlIHJhdyBpbmNvbWluZyBTTVMgdGV4dCBzdHJpbmcuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1heExlbmd0aCAtIFRoZSBtYXhpbXVtIGFsbG93ZWQgdmlzaWJsZSBjaGFyYWN0ZXJzIChkZWZhdWx0OiAzMjApLlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjbGVhbmVkLCBmbGF0dGVuZWQsIGFuZCBzYWZlbHkgdHJ1bmNhdGVkIHBsYWludGV4dCBzdHJpbmcuXG4gICAgICovXG4gICAgY2xlYW5TbXNWYWx1ZShpbnB1dDogc3RyaW5nLCBtYXhMZW5ndGg6IG51bWJlciA9IDMyKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKCFpbnB1dCkgcmV0dXJuICcnO1xuXG4gICAgICAgIC8vIDEuIFN0cmlwIGxpbmUgYnJlYWtzLCB0YWJzLCBhbmQgaW52aXNpYmxlIGNvbnRyb2wgY2hhcmFjdGVycyAoXFx4MDAtXFx4MUYsIFxceDdGKVxuICAgICAgICBsZXQgY2xlYW5lZCA9IGlucHV0LnJlcGxhY2UoL1tcXHJcXG5cXHRcXHgwMC1cXHgxRlxceDdGXS9nLCAnICcpO1xuXG4gICAgICAgIC8vIDIuIEtlZXAgT05MWSBub3JtYWwgY2hhcmFjdGVycyAoTGV0dGVycywgTnVtYmVycywgU3BhY2VzLCBIeXBoZW5zLCBTbGFzaGVzKVxuICAgICAgICAvLyBEb24ndCBhbGxvdyBlbW9qaXMsICBleHRlbmRlZCBwaWN0b2dyYXBoaWMgYW5kIG90aGVyIG5vbi1zdGFuZGFyZCBjaGFyYWN0ZXJzLlxuICAgICAgICAvLyBUaGlzIGluc3RhbnRseSB2YXBvcml6ZXMgYWxsIGVtb2ppcywgdmFyaWF0aW9uIHNlbGVjdG9ycywgYW5kIHdlaXJkIHN5bWJvbHMgZ2xvYmFsbHkuXG4gICAgICAgIGNsZWFuZWQgPSBjbGVhbmVkLnJlcGxhY2UoL1teYS16QS1aMC05XFxzXFwvXFwtXS9nLCAnJyk7XG5cbiAgICAgICAgLy8gMy4gQ29sbGFwc2UgbXVsdGlwbGUgc3BhY2VzIGludG8gYSBzaW5nbGUgc3BhY2UgYW5kIHRyaW0gZWRnZXNcbiAgICAgICAgY2xlYW5lZCA9IGNsZWFuZWQucmVwbGFjZSgvXFxzKy9nLCAnICcpLnRyaW0oKTtcblxuICAgICAgICAvLyA0LiBSZW1vdmUgZm9ybXVsYSB0cmlnZ2VycyBmcm9tIHRoZSBiZWdpbm5pbmcgb2YgdGhlIHN0cmluZ1xuICAgICAgICBjbGVhbmVkID0gY2xlYW5lZC5yZXBsYWNlKC9eKFs9K1xcLUBdKykvLCAnJykudHJpbSgpO1xuXG4gICAgICAgIC8vIDUuIFNhZmVseSB0cnVuY2F0ZSB1c2luZyBBcnJheS5mcm9tIHRvIGhhbmRsZSBhbnkgcmVtYWluaW5nIG11bHRpLWJ5dGUgY2hhcmFjdGVyc1xuICAgICAgICBjb25zdCBjaGFyYWN0ZXJzID0gQXJyYXkuZnJvbShjbGVhbmVkKTtcbiAgICAgICAgaWYgKGNoYXJhY3RlcnMubGVuZ3RoID4gbWF4TGVuZ3RoKSB7XG4gICAgICAgICAgICBjbGVhbmVkID0gY2hhcmFjdGVycy5zbGljZSgwLCBtYXhMZW5ndGgpLmpvaW4oJycpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNsZWFuZWQ7XG4gICAgfVxuXG5cbn0iLCJpbXBvcnQge2dvb2dsZX0gZnJvbSBcImdvb2dsZWFwaXNcIjtcbmltcG9ydCB7R2VuZXJhdGVBdXRoVXJsT3B0c30gZnJvbSBcImdvb2dsZS1hdXRoLWxpYnJhcnlcIjtcbmltcG9ydCB7T0F1dGgyQ2xpZW50fSBmcm9tIFwiZ29vZ2xlYXBpcy1jb21tb25cIjtcbmltcG9ydCB7c2FuaXRpemVfcGhvbmVfbnVtYmVyfSBmcm9tIFwiLi91dGlscy91dGlsXCI7XG5pbXBvcnQge2xvYWRfY3JlZGVudGlhbHNfZmlsZXN9IGZyb20gXCIuL3V0aWxzL2ZpbGVfdXRpbHNcIjtcbmltcG9ydCB7U2VydmljZUNvbnRleHR9IGZyb20gXCJAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzL3R5cGVzXCI7XG5pbXBvcnQge1VzZXJDcmVkc0NvbmZpZ30gZnJvbSBcIi4vZW52L2hhbmRsZXJfY29uZmlnXCI7XG5pbXBvcnQge3ZhbGlkYXRlX3Njb3Blc30gZnJvbSBcIi4vdXRpbHMvc2NvcGVfdXRpbFwiO1xuXG5jb25zdCBTQ09QRVMgPSBbXG4gICAgXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3NjcmlwdC5wcm9qZWN0c1wiLFxuICAgIFwiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9zcHJlYWRzaGVldHNcIixcbl07XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIHVzZXIgY3JlZGVudGlhbHMgZm9yIEdvb2dsZSBPQXV0aDIuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXJDcmVkcyB7XG4gICAgbnVtYmVyOiBzdHJpbmc7XG4gICAgb2F1dGgyX2NsaWVudDogT0F1dGgyQ2xpZW50O1xuICAgIHN5bmNfY2xpZW50OiBTZXJ2aWNlQ29udGV4dDtcbiAgICBkb21haW4/OiBzdHJpbmc7XG4gICAgbG9hZGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBVc2VyQ3JlZHMgaW5zdGFuY2UuXG4gICAgICogQHBhcmFtIHtTZXJ2aWNlQ29udGV4dH0gc3luY19jbGllbnQgLSBUaGUgVHdpbGlvIFN5bmMgY2xpZW50LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgdW5kZWZpbmVkfSBudW1iZXIgLSBUaGUgdXNlcidzIHBob25lIG51bWJlci5cbiAgICAgKiBAcGFyYW0ge1VzZXJDcmVkc0NvbmZpZ30gb3B0cyAtIFRoZSB1c2VyIGNyZWRlbnRpYWxzIGNvbmZpZ3VyYXRpb24uXG4gICAgICogQHRocm93cyB7RXJyb3J9IFRocm93cyBhbiBlcnJvciBpZiB0aGUgbnVtYmVyIGlzIHVuZGVmaW5lZCBvciBudWxsLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBzeW5jX2NsaWVudDogU2VydmljZUNvbnRleHQsXG4gICAgICAgIG51bWJlcjogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgICAgICBvcHRzOiBVc2VyQ3JlZHNDb25maWdcbiAgICApIHtcbiAgICAgICAgaWYgKG51bWJlciA9PT0gdW5kZWZpbmVkIHx8IG51bWJlciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTnVtYmVyIGlzIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm51bWJlciA9IHNhbml0aXplX3Bob25lX251bWJlcihudW1iZXIpO1xuXG4gICAgICAgIGNvbnN0IGNyZWRlbnRpYWxzID0gbG9hZF9jcmVkZW50aWFsc19maWxlcygpO1xuICAgICAgICBjb25zdCB7IGNsaWVudF9zZWNyZXQsIGNsaWVudF9pZCwgcmVkaXJlY3RfdXJpcyB9ID0gY3JlZGVudGlhbHMud2ViO1xuICAgICAgICB0aGlzLm9hdXRoMl9jbGllbnQgPSBuZXcgZ29vZ2xlLmF1dGguT0F1dGgyKFxuICAgICAgICAgICAgY2xpZW50X2lkLFxuICAgICAgICAgICAgY2xpZW50X3NlY3JldCxcbiAgICAgICAgICAgIHJlZGlyZWN0X3VyaXNbMF1cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zeW5jX2NsaWVudCA9IHN5bmNfY2xpZW50O1xuICAgICAgICBsZXQgZG9tYWluID0gb3B0cy5OU1BfRU1BSUxfRE9NQUlOO1xuICAgICAgICBpZiAoZG9tYWluID09PSB1bmRlZmluZWQgfHwgZG9tYWluID09PSBudWxsIHx8IGRvbWFpbiA9PT0gXCJcIikge1xuICAgICAgICAgICAgZG9tYWluID0gdW5kZWZpbmVkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kb21haW4gPSBkb21haW47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2FkIHRoZSBPQXV0aDIgdG9rZW4uXG4gICAgICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgYm9vbGVhbiBpbmRpY2F0aW5nIGlmIHRoZSB0b2tlbiB3YXMgbG9hZGVkLlxuICAgICAqL1xuICAgIGFzeW5jIGxvYWRUb2tlbigpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgaWYgKCF0aGlzLmxvYWRlZCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgTG9va2luZyBmb3IgJHt0aGlzLnRva2VuX2tleX1gKTtcbiAgICAgICAgICAgICAgICBjb25zdCBvYXV0aDJEb2MgPSBhd2FpdCB0aGlzLnN5bmNfY2xpZW50XG4gICAgICAgICAgICAgICAgICAgIC5kb2N1bWVudHModGhpcy50b2tlbl9rZXkpXG4gICAgICAgICAgICAgICAgICAgIC5mZXRjaCgpO1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgb2F1dGgyRG9jID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICAgICAgb2F1dGgyRG9jLmRhdGEgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgICAgIG9hdXRoMkRvYy5kYXRhLnRva2VuID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYERpZG4ndCBmaW5kICR7dGhpcy50b2tlbl9rZXl9YCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBvYXV0aDJEb2MuZGF0YS50b2tlbjtcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGVfc2NvcGVzKG9hdXRoMkRvYy5kYXRhLnNjb3BlcywgU0NPUEVTKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vYXV0aDJfY2xpZW50LnNldENyZWRlbnRpYWxzKHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYExvYWRlZCB0b2tlbiAke3RoaXMudG9rZW5fa2V5fWApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgICAgICBgRmFpbGVkIHRvIGxvYWQgdG9rZW4gZm9yICR7dGhpcy50b2tlbl9rZXl9LlxcbiAke2V9YFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZGVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdG9rZW4ga2V5LlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSB0b2tlbiBrZXkuXG4gICAgICovXG4gICAgZ2V0IHRva2VuX2tleSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYG9hdXRoMl8ke3RoaXMubnVtYmVyfWA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVsZXRlIHRoZSBPQXV0aDIgdG9rZW4uXG4gICAgICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgYm9vbGVhbiBpbmRpY2F0aW5nIGlmIHRoZSB0b2tlbiB3YXMgZGVsZXRlZC5cbiAgICAgKi9cbiAgICBhc3luYyBkZWxldGVUb2tlbigpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgY29uc3Qgb2F1dGgyRG9jID0gYXdhaXQgdGhpcy5zeW5jX2NsaWVudFxuICAgICAgICAgICAgLmRvY3VtZW50cyh0aGlzLnRva2VuX2tleSlcbiAgICAgICAgICAgIC5mZXRjaCgpO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICBvYXV0aDJEb2MgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgb2F1dGgyRG9jLmRhdGEgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICBvYXV0aDJEb2MuZGF0YS50b2tlbiA9PT0gdW5kZWZpbmVkXG4gICAgICAgICkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYERpZG4ndCBmaW5kICR7dGhpcy50b2tlbl9rZXl9YCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgdGhpcy5zeW5jX2NsaWVudC5kb2N1bWVudHMob2F1dGgyRG9jLnNpZCkucmVtb3ZlKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBEZWxldGVkIHRva2VuICR7dGhpcy50b2tlbl9rZXl9YCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbXBsZXRlIHRoZSBsb2dpbiBwcm9jZXNzIGJ5IGV4Y2hhbmdpbmcgdGhlIGF1dGhvcml6YXRpb24gY29kZSBmb3IgYSB0b2tlbi5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29kZSAtIFRoZSBhdXRob3JpemF0aW9uIGNvZGUuXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gc2NvcGVzIC0gVGhlIHNjb3BlcyB0byB2YWxpZGF0ZS5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgbG9naW4gcHJvY2VzcyBpcyBjb21wbGV0ZS5cbiAgICAgKi9cbiAgICBhc3luYyBjb21wbGV0ZUxvZ2luKGNvZGU6IHN0cmluZywgc2NvcGVzOiBzdHJpbmdbXSk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICB2YWxpZGF0ZV9zY29wZXMoc2NvcGVzLCBTQ09QRVMpO1xuICAgICAgICBjb25zdCB0b2tlbiA9IGF3YWl0IHRoaXMub2F1dGgyX2NsaWVudC5nZXRUb2tlbihjb2RlKTtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoT2JqZWN0LmtleXModG9rZW4ucmVzISkpKTtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodG9rZW4udG9rZW5zKSk7XG4gICAgICAgIHRoaXMub2F1dGgyX2NsaWVudC5zZXRDcmVkZW50aWFscyh0b2tlbi50b2tlbnMpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3Qgb2F1dGhEb2MgPSBhd2FpdCB0aGlzLnN5bmNfY2xpZW50LmRvY3VtZW50cy5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6IHsgdG9rZW46IHRva2VuLnRva2Vucywgc2NvcGVzOiBzY29wZXMgfSxcbiAgICAgICAgICAgICAgICB1bmlxdWVOYW1lOiB0aGlzLnRva2VuX2tleSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICBgRXhjZXB0aW9uIHdoZW4gY3JlYXRpbmcgb2F1dGguIFRyeWluZyB0byB1cGRhdGUgaW5zdGVhZC4uLlxcbiR7ZX1gXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29uc3Qgb2F1dGhEb2MgPSBhd2FpdCB0aGlzLnN5bmNfY2xpZW50XG4gICAgICAgICAgICAgICAgLmRvY3VtZW50cyh0aGlzLnRva2VuX2tleSlcbiAgICAgICAgICAgICAgICAudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogeyB0b2tlbjogdG9rZW4sIHNjb3Blczogc2NvcGVzIH0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGF1dGhvcml6YXRpb24gVVJMLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHN0cmluZz59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSBhdXRob3JpemF0aW9uIFVSTC5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRBdXRoVXJsKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIGNvbnN0IGlkID0gdGhpcy5nZW5lcmF0ZVJhbmRvbVN0cmluZygpO1xuICAgICAgICBjb25zb2xlLmxvZyhgVXNpbmcgbm9uY2UgJHtpZH0gZm9yICR7dGhpcy5udW1iZXJ9YCk7XG4gICAgICAgIGNvbnN0IGRvYyA9IGF3YWl0IHRoaXMuc3luY19jbGllbnQuZG9jdW1lbnRzLmNyZWF0ZSh7XG4gICAgICAgICAgICBkYXRhOiB7IG51bWJlcjogdGhpcy5udW1iZXIsIHNjb3BlczogU0NPUEVTIH0sXG4gICAgICAgICAgICB1bmlxdWVOYW1lOiBpZCxcbiAgICAgICAgICAgIHR0bDogNjAgKiA1LCAvLyA1IG1pbnV0ZXNcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBNYWRlIG5vbmNlLWRvYzogJHtKU09OLnN0cmluZ2lmeShkb2MpfWApO1xuXG4gICAgICAgIGNvbnN0IG9wdHM6IEdlbmVyYXRlQXV0aFVybE9wdHMgPSB7XG4gICAgICAgICAgICBhY2Nlc3NfdHlwZTogXCJvZmZsaW5lXCIsXG4gICAgICAgICAgICBzY29wZTogU0NPUEVTLFxuICAgICAgICAgICAgc3RhdGU6IGlkLFxuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5kb21haW4pIHtcbiAgICAgICAgICAgIG9wdHNbXCJoZFwiXSA9IHRoaXMuZG9tYWluO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMub2F1dGgyX2NsaWVudC5nZW5lcmF0ZUF1dGhVcmwob3B0cyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2VuZXJhdGUgYSByYW5kb20gc3RyaW5nLlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IEEgcmFuZG9tIHN0cmluZy5cbiAgICAgKi9cbiAgICBnZW5lcmF0ZVJhbmRvbVN0cmluZygpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBsZW5ndGggPSAzMDtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFwiXCI7XG4gICAgICAgIGNvbnN0IGNoYXJhY3RlcnMgPVxuICAgICAgICAgICAgXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OVwiO1xuICAgICAgICBjb25zdCBjaGFyYWN0ZXJzTGVuZ3RoID0gY2hhcmFjdGVycy5sZW5ndGg7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSBjaGFyYWN0ZXJzLmNoYXJBdChcbiAgICAgICAgICAgICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFyYWN0ZXJzTGVuZ3RoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cblxuLyoqXG4gKiBJbnRlcmZhY2UgcmVwcmVzZW50aW5nIHRoZSB1c2VyIGNyZWRlbnRpYWxzIGNvbmZpZ3VyYXRpb24uXG4gKi9cbmV4cG9ydCB7IFVzZXJDcmVkcyB9O1xuIiwiLyoqXG4gKiBSZXByZXNlbnRzIGEgY2hlY2staW4gdmFsdWUgd2l0aCB2YXJpb3VzIHByb3BlcnRpZXMgYW5kIGxvb2t1cCB2YWx1ZXMuXG4gKi9cbmNsYXNzIENoZWNraW5WYWx1ZSB7XG4gICAga2V5OiBzdHJpbmc7XG4gICAgc2hlZXRzX3ZhbHVlOiBzdHJpbmc7XG4gICAgc21zX2Rlc2M6IHN0cmluZztcbiAgICBmYXN0X2NoZWNraW5zOiBzdHJpbmdbXTtcbiAgICBsb29rdXBfdmFsdWVzOiBTZXQ8c3RyaW5nPjtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQ2hlY2tpblZhbHVlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBUaGUga2V5IGZvciB0aGUgY2hlY2staW4gdmFsdWUuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNoZWV0c192YWx1ZSAtIFRoZSB2YWx1ZSB1c2VkIGluIHNoZWV0cy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc21zX2Rlc2MgLSBUaGUgZGVzY3JpcHRpb24gdXNlZCBpbiBTTVMuXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCBzdHJpbmdbXX0gZmFzdF9jaGVja2lucyAtIFRoZSBmYXN0IGNoZWNrLWluIHZhbHVlcy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAga2V5OiBzdHJpbmcsXG4gICAgICAgIHNoZWV0c192YWx1ZTogc3RyaW5nLFxuICAgICAgICBzbXNfZGVzYzogc3RyaW5nLFxuICAgICAgICBmYXN0X2NoZWNraW5zOiBzdHJpbmcgfCBzdHJpbmdbXVxuICAgICkge1xuICAgICAgICBpZiAoIShmYXN0X2NoZWNraW5zIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICAgICAgICBmYXN0X2NoZWNraW5zID0gW2Zhc3RfY2hlY2tpbnNdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgICAgICB0aGlzLnNoZWV0c192YWx1ZSA9IHNoZWV0c192YWx1ZTtcbiAgICAgICAgdGhpcy5zbXNfZGVzYyA9IHNtc19kZXNjO1xuICAgICAgICB0aGlzLmZhc3RfY2hlY2tpbnMgPSBmYXN0X2NoZWNraW5zLm1hcCgoeCkgPT4geC50cmltKCkudG9Mb3dlckNhc2UoKSk7XG5cbiAgICAgICAgY29uc3Qgc21zX2Rlc2Nfc3BsaXQ6IHN0cmluZ1tdID0gc21zX2Rlc2NcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXHMrLywgXCItXCIpXG4gICAgICAgICAgICAudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgLnNwbGl0KFwiL1wiKTtcbiAgICAgICAgY29uc3QgbG9va3VwX3ZhbHMgPSBbLi4udGhpcy5mYXN0X2NoZWNraW5zLCAuLi5zbXNfZGVzY19zcGxpdF07XG4gICAgICAgIHRoaXMubG9va3VwX3ZhbHVlcyA9IG5ldyBTZXQ8c3RyaW5nPihsb29rdXBfdmFscyk7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBjb2xsZWN0aW9uIG9mIGNoZWNrLWluIHZhbHVlcyB3aXRoIHZhcmlvdXMgbG9va3VwIG1ldGhvZHMuXG4gKi9cbmNsYXNzIENoZWNraW5WYWx1ZXMge1xuICAgIGJ5X2tleTogeyBba2V5OiBzdHJpbmddOiBDaGVja2luVmFsdWUgfSA9IHt9O1xuICAgIGJ5X2x2OiB7IFtrZXk6IHN0cmluZ106IENoZWNraW5WYWx1ZSB9ID0ge307XG4gICAgYnlfZmM6IHsgW2tleTogc3RyaW5nXTogQ2hlY2tpblZhbHVlIH0gPSB7fTtcbiAgICBieV9zaGVldF9zdHJpbmc6IHsgW2tleTogc3RyaW5nXTogQ2hlY2tpblZhbHVlIH0gPSB7fTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQ2hlY2tpblZhbHVlcy5cbiAgICAgKiBAcGFyYW0ge0NoZWNraW5WYWx1ZVtdfSBjaGVja2luVmFsdWVzIC0gVGhlIGFycmF5IG9mIGNoZWNrLWluIHZhbHVlcy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihjaGVja2luVmFsdWVzOiBDaGVja2luVmFsdWVbXSkge1xuICAgICAgICBmb3IgKGNvbnN0IGNoZWNraW5WYWx1ZSBvZiBjaGVja2luVmFsdWVzKSB7XG4gICAgICAgICAgICB0aGlzLmJ5X2tleVtjaGVja2luVmFsdWUua2V5XSA9IGNoZWNraW5WYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuYnlfc2hlZXRfc3RyaW5nW2NoZWNraW5WYWx1ZS5zaGVldHNfdmFsdWVdID0gY2hlY2tpblZhbHVlO1xuICAgICAgICAgICAgZm9yIChjb25zdCBsdiBvZiBjaGVja2luVmFsdWUubG9va3VwX3ZhbHVlcykge1xuICAgICAgICAgICAgICAgIHRoaXMuYnlfbHZbbHZdID0gY2hlY2tpblZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCBmYyBvZiBjaGVja2luVmFsdWUuZmFzdF9jaGVja2lucykge1xuICAgICAgICAgICAgICAgIHRoaXMuYnlfZmNbZmNdID0gY2hlY2tpblZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIGEgZmFzdCBjaGVjay1pbiB2YWx1ZSBmcm9tIHRoZSBnaXZlbiBib2R5IHN0cmluZy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYm9keSAtIFRoZSBib2R5IHN0cmluZyB0byBwYXJzZS5cbiAgICAgKiBAcmV0dXJucyB7Q2hlY2tpblZhbHVlIHwgdW5kZWZpbmVkfSBUaGUgcGFyc2VkIGNoZWNrLWluIHZhbHVlIG9yIHVuZGVmaW5lZC5cbiAgICAgKi9cbiAgICBwYXJzZV9mYXN0X2NoZWNraW4oYm9keTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJ5X2ZjW2JvZHldO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlcyBhIGNoZWNrLWluIHZhbHVlIGZyb20gdGhlIGdpdmVuIGJvZHkgc3RyaW5nLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5IC0gVGhlIGJvZHkgc3RyaW5nIHRvIHBhcnNlLlxuICAgICAqIEByZXR1cm5zIHtDaGVja2luVmFsdWUgfCB1bmRlZmluZWR9IFRoZSBwYXJzZWQgY2hlY2staW4gdmFsdWUgb3IgdW5kZWZpbmVkLlxuICAgICAqL1xuICAgIHBhcnNlX2NoZWNraW4oYm9keTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGNoZWNraW5fbG93ZXIgPSBib2R5LnJlcGxhY2UoL1xccysvLCBcIlwiKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnlfbHZbY2hlY2tpbl9sb3dlcl07XG4gICAgfVxufVxuXG5leHBvcnQgeyBDaGVja2luVmFsdWUsIENoZWNraW5WYWx1ZXMgfSIsIi8qKlxuICogQ29udmVydCBhbiBFeGNlbCBkYXRlIHRvIGEgSmF2YVNjcmlwdCBEYXRlIG9iamVjdC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBkYXRlIC0gVGhlIEV4Y2VsIGRhdGUuXG4gKiBAcmV0dXJucyB7RGF0ZX0gVGhlIEphdmFTY3JpcHQgRGF0ZSBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGV4Y2VsX2RhdGVfdG9fanNfZGF0ZShkYXRlOiBudW1iZXIpOiBEYXRlIHtcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgRGF0ZSgwKTtcbiAgICByZXN1bHQuc2V0VVRDTWlsbGlzZWNvbmRzKE1hdGgucm91bmQoKGRhdGUgLSAyNTU2OSkgKiA4NjQwMCAqIDEwMDApKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENoYW5nZSB0aGUgdGltZXpvbmUgb2YgYSBEYXRlIG9iamVjdCB0byBQU1QuXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgLSBUaGUgRGF0ZSBvYmplY3QuXG4gKiBAcmV0dXJucyB7RGF0ZX0gVGhlIERhdGUgb2JqZWN0IHdpdGggdGhlIHRpbWV6b25lIHNldCB0byBQU1QuXG4gKi9cbmZ1bmN0aW9uIGNoYW5nZV90aW1lem9uZV90b19wc3QoZGF0ZTogRGF0ZSk6IERhdGUge1xuICAgIHJldHVybiBuZXcgRGF0ZShkYXRlLnRvVVRDU3RyaW5nKCkucmVwbGFjZShcIiBHTVRcIiwgXCIgUFNUXCIpKTtcbn1cblxuLyoqXG4gKiBTdHJpcCB0aGUgdGltZSBmcm9tIGEgRGF0ZSBvYmplY3QsIGtlZXBpbmcgb25seSB0aGUgZGF0ZS5cbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSAtIFRoZSBEYXRlIG9iamVjdC5cbiAqIEByZXR1cm5zIHtEYXRlfSBUaGUgRGF0ZSBvYmplY3Qgd2l0aCB0aGUgdGltZSBzdHJpcHBlZC5cbiAqL1xuZnVuY3Rpb24gc3RyaXBfZGF0ZXRpbWVfdG9fZGF0ZShkYXRlOiBEYXRlKTogRGF0ZSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKFxuICAgICAgICBkYXRlLnRvTG9jYWxlRGF0ZVN0cmluZyhcImVuLVVTXCIsIHt0aW1lWm9uZTogXCJBbWVyaWNhL0xvc19BbmdlbGVzXCJ9KVxuICAgICk7XG59XG5cbi8qKlxuICogU2FuaXRpemUgYSBkYXRlIGJ5IGNvbnZlcnRpbmcgaXQgZnJvbSBhbiBFeGNlbCBkYXRlIGFuZCBzdHJpcHBpbmcgdGhlIHRpbWUuXG4gKiBAcGFyYW0ge251bWJlcn0gZGF0ZSAtIFRoZSBFeGNlbCBkYXRlLlxuICogQHJldHVybnMge0RhdGV9IFRoZSBzYW5pdGl6ZWQgRGF0ZSBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIHNhbml0aXplX2RhdGUoZGF0ZTogbnVtYmVyKTogRGF0ZSB7XG4gICAgcmV0dXJuIHN0cmlwX2RhdGV0aW1lX3RvX2RhdGUoXG4gICAgICAgIGNoYW5nZV90aW1lem9uZV90b19wc3QoZXhjZWxfZGF0ZV90b19qc19kYXRlKGRhdGUpKVxuICAgICk7XG59XG5cbi8qKlxuICogRm9ybWF0IGEgRGF0ZSBvYmplY3QgZm9yIHVzZSBpbiBhIHNwcmVhZHNoZWV0IHZhbHVlLlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIC0gVGhlIERhdGUgb2JqZWN0LlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCBkYXRlIHN0cmluZyBpbiBQU1RcbiAqL1xuZnVuY3Rpb24gZm9ybWF0X2RhdGVfZm9yX3NwcmVhZHNoZWV0X3ZhbHVlKGRhdGU6IERhdGUpOiBzdHJpbmcge1xuICAgIHJldHVybiBkYXRlXG4gICAgICAgIC50b0xvY2FsZURhdGVTdHJpbmcoXCJlbi1VU1wiLCB7dGltZVpvbmU6IFwiQW1lcmljYS9Mb3NfQW5nZWxlc1wifSlcbiAgICAgICAgLnNwbGl0KFwiL1wiKVxuICAgICAgICAubWFwKCh4KSA9PiB4LnBhZFN0YXJ0KDIsIFwiMFwiKSlcbiAgICAgICAgLmpvaW4oXCJcIik7XG59XG5cbi8qKlxuICogRmlsdGVyIGEgbGlzdCB0byBpbmNsdWRlIG9ubHkgaXRlbXMgdGhhdCBlbmQgd2l0aCBhIHNwZWNpZmljIGRhdGUuXG4gKiBAcGFyYW0ge2FueVtdfSBsaXN0IC0gVGhlIGxpc3QgdG8gZmlsdGVyLlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIC0gVGhlIGRhdGUgdG8gZmlsdGVyIGJ5LlxuICogQHJldHVybnMge2FueVtdfSBUaGUgZmlsdGVyZWQgbGlzdC5cbiAqL1xuZnVuY3Rpb24gZmlsdGVyX2xpc3RfdG9fZW5kc3dpdGhfZGF0ZShsaXN0OiBhbnlbXSwgZGF0ZTogRGF0ZSk6IGFueVtdIHtcbiAgICBjb25zdCBkYXRlc3RyID0gZm9ybWF0X2RhdGVfZm9yX3NwcmVhZHNoZWV0X3ZhbHVlKGRhdGUpO1xuICAgIHJldHVybiBsaXN0Lm1hcCgoeCkgPT4geD8udG9TdHJpbmcoKSkuZmlsdGVyKCh4KSA9PiB4Py5lbmRzV2l0aChkYXRlc3RyKSk7XG59XG5cbi8qKlxuICogRmlsdGVyIGEgbGlzdCB0byBpbmNsdWRlIG9ubHkgaXRlbXMgdGhhdCBlbmQgd2l0aCB0aGUgY3VycmVudCBkYXRlLlxuICogQHBhcmFtIHthbnlbXX0gbGlzdCAtIFRoZSBsaXN0IHRvIGZpbHRlci5cbiAqIEByZXR1cm5zIHthbnlbXX0gVGhlIGZpbHRlcmVkIGxpc3QuXG4gKi9cbmZ1bmN0aW9uIGZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2N1cnJlbnRfZGF5KGxpc3Q6IGFueVtdKTogYW55W10ge1xuICAgIHJldHVybiBmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9kYXRlKGxpc3QsIG5ldyBEYXRlKCkpO1xufVxuXG5leHBvcnQge1xuICAgIHNhbml0aXplX2RhdGUsXG4gICAgZXhjZWxfZGF0ZV90b19qc19kYXRlLFxuICAgIGNoYW5nZV90aW1lem9uZV90b19wc3QsXG4gICAgc3RyaXBfZGF0ZXRpbWVfdG9fZGF0ZSxcbiAgICBmb3JtYXRfZGF0ZV9mb3Jfc3ByZWFkc2hlZXRfdmFsdWUsXG4gICAgZmlsdGVyX2xpc3RfdG9fZW5kc3dpdGhfZGF0ZSxcbiAgICBmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9jdXJyZW50X2RheSxcbn07IiwiaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgJ0B0d2lsaW8tbGFicy9zZXJ2ZXJsZXNzLXJ1bnRpbWUtdHlwZXMnO1xuXG4vKipcbiAqIExvYWQgY3JlZGVudGlhbHMgZnJvbSBhIEpTT04gZmlsZS5cbiAqIEByZXR1cm5zIHthbnl9IFRoZSBwYXJzZWQgY3JlZGVudGlhbHMgZnJvbSB0aGUgSlNPTiBmaWxlLlxuICovXG5mdW5jdGlvbiBsb2FkX2NyZWRlbnRpYWxzX2ZpbGVzKCk6IGFueSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoXG4gICAgICAgIGZzXG4gICAgICAgICAgICAucmVhZEZpbGVTeW5jKFJ1bnRpbWUuZ2V0QXNzZXRzKClbXCIvY3JlZGVudGlhbHMuanNvblwiXS5wYXRoKVxuICAgICAgICAgICAgLnRvU3RyaW5nKClcbiAgICApO1xufVxuXG4vKipcbiAqIEdldCB0aGUgcGF0aCB0byB0aGUgc2VydmljZSBjcmVkZW50aWFscyBmaWxlLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIHBhdGggdG8gdGhlIHNlcnZpY2UgY3JlZGVudGlhbHMgZmlsZS5cbiAqL1xuZnVuY3Rpb24gZ2V0X3NlcnZpY2VfY3JlZGVudGlhbHNfcGF0aCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBSdW50aW1lLmdldEFzc2V0cygpW1wiL3NlcnZpY2UtY3JlZGVudGlhbHMuanNvblwiXS5wYXRoO1xufVxuXG5leHBvcnQgeyBsb2FkX2NyZWRlbnRpYWxzX2ZpbGVzLCBnZXRfc2VydmljZV9jcmVkZW50aWFsc19wYXRoIH07IiwiaW1wb3J0IHtzaGVldHNfdjR9IGZyb20gXCJnb29nbGVhcGlzXCI7XG5pbXBvcnQge2V4Y2VsX3Jvd190b19pbmRleH0gZnJvbSBcIi4vdXRpbFwiO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQgdGFiLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYiB7XG4gICAgc2hlZXRzX3NlcnZpY2U6IHNoZWV0c192NC5TaGVldHMgfCBudWxsO1xuICAgIHNoZWV0X2lkOiBzdHJpbmc7XG4gICAgc2hlZXRfbmFtZTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIuXG4gICAgICogQHBhcmFtIHtzaGVldHNfdjQuU2hlZXRzIHwgbnVsbH0gc2hlZXRzX3NlcnZpY2UgLSBUaGUgR29vZ2xlIFNoZWV0cyBBUEkgc2VydmljZSBpbnN0YW5jZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2hlZXRfaWQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNoZWV0X25hbWUgLSBUaGUgbmFtZSBvZiB0aGUgc2hlZXQgdGFiLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyB8IG51bGwsXG4gICAgICAgIHNoZWV0X2lkOiBzdHJpbmcsXG4gICAgICAgIHNoZWV0X25hbWU6IHN0cmluZ1xuICAgICkge1xuICAgICAgICB0aGlzLnNoZWV0c19zZXJ2aWNlID0gc2hlZXRzX3NlcnZpY2U7XG4gICAgICAgIHRoaXMuc2hlZXRfaWQgPSBzaGVldF9pZDtcbiAgICAgICAgdGhpcy5zaGVldF9uYW1lID0gc2hlZXRfbmFtZS5zcGxpdChcIiFcIilbMF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHZhbHVlcyBmcm9tIHRoZSBzaGVldC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bGx9IFtyYW5nZV0gLSBUaGUgcmFuZ2UgdG8gZ2V0IHZhbHVlcyBmcm9tLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueVtdW10gfCB1bmRlZmluZWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgdmFsdWVzIGZyb20gdGhlIHNoZWV0LlxuICAgICAqL1xuICAgIGFzeW5jIGdldF92YWx1ZXMocmFuZ2U/OiBzdHJpbmcgfCBudWxsKTogUHJvbWlzZTxhbnlbXVtdIHwgdW5kZWZpbmVkPiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2dldF92YWx1ZXMocmFuZ2UpO1xuICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGEudmFsdWVzID8/IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHJvdyBmb3IgYSBzcGVjaWZpYyBwYXRyb2xsZXIuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdHJvbGxlcl9uYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHBhdHJvbGxlci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZV9jb2x1bW4gLSBUaGUgY29sdW1uIHdoZXJlIHRoZSBwYXRyb2xsZXIncyBuYW1lIGlzIGxvY2F0ZWQuXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCBudWxsfSBbcmFuZ2VdIC0gVGhlIHJhbmdlIHRvIHNlYXJjaCB3aXRoaW4uXG4gICAgICogQHJldHVybnMge1Byb21pc2U8eyByb3c6IGFueVtdOyBpbmRleDogbnVtYmVyOyB9IHwgbnVsbD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSByb3cgYW5kIGluZGV4IG9mIHRoZSBwYXRyb2xsZXIsIG9yIG51bGwgaWYgbm90IGZvdW5kLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF9zaGVldF9yb3dfZm9yX3BhdHJvbGxlcihcbiAgICAgICAgcGF0cm9sbGVyX25hbWU6IHN0cmluZyxcbiAgICAgICAgbmFtZV9jb2x1bW46IHN0cmluZyxcbiAgICAgICAgcmFuZ2U/OiBzdHJpbmcgfCBudWxsXG4gICAgKTogUHJvbWlzZTx7IHJvdzogYW55W107IGluZGV4OiBudW1iZXI7IH0gfCBudWxsPiB7XG4gICAgICAgIGNvbnN0IHJvd3MgPSBhd2FpdCB0aGlzLmdldF92YWx1ZXMocmFuZ2UpO1xuICAgICAgICBpZiAocm93cykge1xuICAgICAgICAgICAgY29uc3QgbG9va3VwX2luZGV4ID0gZXhjZWxfcm93X3RvX2luZGV4KG5hbWVfY29sdW1uKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChyb3dzW2ldW2xvb2t1cF9pbmRleF0gPT09IHBhdHJvbGxlcl9uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHJvdzogcm93c1tpXSwgaW5kZXg6IGkgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgIGBDb3VsZG4ndCBmaW5kIHBhdHJvbGxlciAke3BhdHJvbGxlcl9uYW1lfSBpbiBzaGVldCAke3RoaXMuc2hlZXRfbmFtZX0uYFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdmFsdWVzIGluIHRoZSBzaGVldC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmFuZ2UgLSBUaGUgcmFuZ2UgdG8gdXBkYXRlLlxuICAgICAqIEBwYXJhbSB7YW55W11bXX0gdmFsdWVzIC0gVGhlIHZhbHVlcyB0byB1cGRhdGUuXG4gICAgICovXG4gICAgYXN5bmMgdXBkYXRlX3ZhbHVlcyhyYW5nZTogc3RyaW5nLCB2YWx1ZXM6IGFueVtdW10pIHtcbiAgICAgICAgY29uc3QgdXBkYXRlTWUgPSAoYXdhaXQgdGhpcy5fZ2V0X3ZhbHVlcyhyYW5nZSwgbnVsbCkpLmRhdGE7XG5cbiAgICAgICAgdXBkYXRlTWUudmFsdWVzID0gdmFsdWVzO1xuICAgICAgICBhd2FpdCB0aGlzLnNoZWV0c19zZXJ2aWNlIS5zcHJlYWRzaGVldHMudmFsdWVzLnVwZGF0ZSh7XG4gICAgICAgICAgICBzcHJlYWRzaGVldElkOiB0aGlzLnNoZWV0X2lkLFxuICAgICAgICAgICAgdmFsdWVJbnB1dE9wdGlvbjogXCJVU0VSX0VOVEVSRURcIixcbiAgICAgICAgICAgIHJhbmdlOiB1cGRhdGVNZS5yYW5nZSEsXG4gICAgICAgICAgICByZXF1ZXN0Qm9keTogdXBkYXRlTWUsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB2YWx1ZXMgZnJvbSB0aGUgc2hlZXQgKHByaXZhdGUgbWV0aG9kKS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bGx9IFtyYW5nZV0gLSBUaGUgcmFuZ2UgdG8gZ2V0IHZhbHVlcyBmcm9tLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbH0gW3ZhbHVlUmVuZGVyT3B0aW9uXSAtIFRoZSB2YWx1ZSByZW5kZXIgb3B0aW9uLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueVtdW10+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgdmFsdWUgcmFuZ2UuXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIGFzeW5jIF9nZXRfdmFsdWVzKFxuICAgICAgICByYW5nZT86IHN0cmluZyB8IG51bGwsXG4gICAgICAgIHZhbHVlUmVuZGVyT3B0aW9uOiBzdHJpbmcgfCBudWxsID0gXCJVTkZPUk1BVFRFRF9WQUxVRVwiXG4gICAgKSB7XG4gICAgICAgIGxldCBsb29rdXBSYW5nZSA9IHRoaXMuc2hlZXRfbmFtZTtcbiAgICAgICAgaWYgKHJhbmdlICE9IG51bGwpIHtcbiAgICAgICAgICAgIGxvb2t1cFJhbmdlID0gbG9va3VwUmFuZ2UgKyBcIiFcIjtcblxuICAgICAgICAgICAgaWYgKHJhbmdlLnN0YXJ0c1dpdGgobG9va3VwUmFuZ2UpKSB7XG4gICAgICAgICAgICAgICAgcmFuZ2UgPSByYW5nZS5zdWJzdHJpbmcobG9va3VwUmFuZ2UubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvb2t1cFJhbmdlID0gbG9va3VwUmFuZ2UgKyByYW5nZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgb3B0czogc2hlZXRzX3Y0LlBhcmFtcyRSZXNvdXJjZSRTcHJlYWRzaGVldHMkVmFsdWVzJEdldCA9IHtcbiAgICAgICAgICAgIHNwcmVhZHNoZWV0SWQ6IHRoaXMuc2hlZXRfaWQsXG4gICAgICAgICAgICByYW5nZTogbG9va3VwUmFuZ2UsXG4gICAgICAgIH07XG4gICAgICAgIGlmICh2YWx1ZVJlbmRlck9wdGlvbikge1xuICAgICAgICAgICAgb3B0cy52YWx1ZVJlbmRlck9wdGlvbiA9IHZhbHVlUmVuZGVyT3B0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnNoZWV0c19zZXJ2aWNlIS5zcHJlYWRzaGVldHMudmFsdWVzLmdldChvcHRzKTtcbiAgICB9XG59XG4iLCJcbmV4cG9ydCBmdW5jdGlvbiBidWlsZF9wYXNzZXNfc3RyaW5nKFxuICAgIHVzZWQ6IG51bWJlcixcbiAgICB0b3RhbDogbnVtYmVyLFxuICAgIHRvZGF5OiBudW1iZXIsXG4gICAgZm9yY2VfdG9kYXk6IGJvb2xlYW4gPSBmYWxzZVxuKSB7XG4gICAgbGV0IG1lc3NhZ2UgPSBgWW91IGhhdmUgdXNlZCAke3VzZWR9IG9mICR7dG90YWx9IGd1ZXN0IHBhc3NlcyB0aGlzIHNlYXNvbmA7XG4gICAgaWYgKGZvcmNlX3RvZGF5IHx8IHRvZGF5ID4gMCkge1xuICAgICAgICBtZXNzYWdlICs9IGAgKCR7dG9kYXl9IHVzZWQgdG9kYXkpYDtcbiAgICB9XG4gICAgbWVzc2FnZSArPSBcIi5cIjtcbiAgICByZXR1cm4gbWVzc2FnZTtcbn1cbiIsIi8qKlxuICogVmFsaWRhdGVzIGlmIHRoZSBwcm92aWRlZCBzY29wZXMgaW5jbHVkZSBhbGwgZGVzaXJlZCBzY29wZXMuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBzY29wZXMgLSBUaGUgbGlzdCBvZiBzY29wZXMgdG8gdmFsaWRhdGUuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBkZXNpcmVkX3Njb3BlcyAtIFRoZSBsaXN0IG9mIGRlc2lyZWQgc2NvcGVzLlxuICogQHRocm93cyB7RXJyb3J9IFRocm93cyBhbiBlcnJvciBpZiBhbnkgZGVzaXJlZCBzY29wZSBpcyBtaXNzaW5nLlxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZV9zY29wZXMoc2NvcGVzOiBzdHJpbmdbXSwgZGVzaXJlZF9zY29wZXM6IHN0cmluZ1tdKSB7XG4gICAgZm9yIChjb25zdCBkZXNpcmVkX3Njb3BlIG9mIGRlc2lyZWRfc2NvcGVzKSB7XG4gICAgICAgIGlmIChzY29wZXMgPT09IHVuZGVmaW5lZCB8fCAhc2NvcGVzLmluY2x1ZGVzKGRlc2lyZWRfc2NvcGUpKSB7XG4gICAgICAgICAgICBjb25zdCBlcnJvciA9IGBNaXNzaW5nIHNjb3BlICR7ZGVzaXJlZF9zY29wZX0gaW4gcmVjZWl2ZWQgc2NvcGVzOiAke3Njb3Blc31gO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCB7dmFsaWRhdGVfc2NvcGVzfSIsImltcG9ydCB7IFNlY3Rpb25Db25maWcgfSBmcm9tICcuLi9lbnYvaGFuZGxlcl9jb25maWcnO1xuXG4vKipcbiAgICAqIENsYXNzIGZvciBzZWN0aW9uIHZhbHVlcy5cbiAgICAqL1xuY2xhc3MgU2VjdGlvblZhbHVlcyB7XG4gICAgc2VjdGlvbl9jb25maWc6IFNlY3Rpb25Db25maWdcbiAgICBzZWN0aW9uczogc3RyaW5nW107XG4gICAgbG93ZXJjYXNlX3NlY3Rpb25zOiBzdHJpbmdbXTtcblxuICAgIGNvbnN0cnVjdG9yKHNlY3Rpb25fY29uZmlnOiBTZWN0aW9uQ29uZmlnKSB7XG4gICAgICAgIHRoaXMuc2VjdGlvbl9jb25maWcgPSBzZWN0aW9uX2NvbmZpZztcbiAgICAgICAgdGhpcy5zZWN0aW9ucyA9IHNlY3Rpb25fY29uZmlnLlNFQ1RJT05fVkFMVUVTLnNwbGl0KCcsJyk7XG4gICAgICAgIHRoaXMubG93ZXJjYXNlX3NlY3Rpb25zID0gc2VjdGlvbl9jb25maWcuU0VDVElPTl9WQUxVRVMudG9Mb3dlckNhc2UoKS5zcGxpdCgnLCcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHNlY3Rpb24gZGVzY3JpcHRpb24uXG4gICAgICogQHJldHVybnMge3N0cmluZ30gVGhlIHNlY3Rpb24gZGVzY3JpcHRpb24uXG4gICAgKi9cbiAgICBnZXRfc2VjdGlvbl9kZXNjcmlwdGlvbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWN0aW9uX2NvbmZpZy5TRUNUSU9OX1ZBTFVFUztcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIFBhcnNlcyBhIHNlY3Rpb24uXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gYm9keSAtIFRoZSBib2R5IG9mIHRoZSByZXF1ZXN0LlxuICAgICogQHJldHVybnMge3N0cmluZyB8IG51bGx9IFRoZSBzZWN0aW9uIGlmIGl0IGlzIGEgdmFsaWQgc2VjdGlvbiBvciBudWxsLlxuICAgICovXG4gICAgcGFyc2Vfc2VjdGlvbihib2R5OiBzdHJpbmcgfCBudWxsKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgICAgIGlmIChib2R5ID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICAgcmV0dXJuIHRoaXMubG93ZXJjYXNlX3NlY3Rpb25zLmluY2x1ZGVzKGJvZHkudG9Mb3dlckNhc2UoKSkgPyBib2R5IDogbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIE1hcHMgYSBsb3dlciBjYXNlIHZlcnNpb24gb2YgYSBzZWN0aW9uIHN0cmluZyB0byB0aGUgb3JpZ2luYWwgY2FzZSB2YWx1ZS5cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWN0aW9uIC0gVGhlIGxvd2VyIGNhc2Ugc2VjdGlvbiBzdHJpbmcuXG4gICAgKiBAcmV0dXJucyB7c3RyaW5nIH0gVGhlIG9yaWdpbmFsIGNhc2UgdmFsdWUgaWYgZm91bmQsIG90aGVyd2lzZSBudWxsLlxuICAgICovXG4gICBtYXBfc2VjdGlvbihzZWN0aW9uOiBzdHJpbmcgfCBudWxsKTogc3RyaW5nICB7XG4gICAgICAgaWYgKHNlY3Rpb24gPT09IG51bGwpIHtcbiAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgfVxuICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5sb3dlcmNhc2Vfc2VjdGlvbnMuaW5kZXhPZihzZWN0aW9uLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VjdGlvbnNbaW5kZXhdO1xuICAgICAgIH1cbiAgICAgICByZXR1cm4gXCJcIjtcbiAgIH1cblxufVxuXG5leHBvcnQgeyBTZWN0aW9uVmFsdWVzIH07IiwiLyoqXG4gKiBDb252ZXJ0IHJvdyBhbmQgY29sdW1uIG51bWJlcnMgdG8gYW4gRXhjZWwtbGlrZSBpbmRleC5cbiAqIEBwYXJhbSB7bnVtYmVyfSByb3cgLSBUaGUgcm93IG51bWJlciAoMC1iYXNlZCkuXG4gKiBAcGFyYW0ge251bWJlcn0gY29sIC0gVGhlIGNvbHVtbiBudW1iZXIgKDAtYmFzZWQpLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIEV4Y2VsLWxpa2UgaW5kZXggKGUuZy4sIFwiQTFcIikuXG4gKi9cbmZ1bmN0aW9uIHJvd19jb2xfdG9fZXhjZWxfaW5kZXgocm93OiBudW1iZXIsIGNvbDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBsZXQgY29sU3RyaW5nID0gXCJcIjtcbiAgICBjb2wgKz0gMTtcbiAgICB3aGlsZSAoY29sID4gMCkge1xuICAgICAgICBjb2wgLT0gMTtcbiAgICAgICAgY29uc3QgbW9kdWxvID0gY29sICUgMjY7XG4gICAgICAgIGNvbnN0IGNvbExldHRlciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoJ0EnLmNoYXJDb2RlQXQoMCkgKyBtb2R1bG8pO1xuICAgICAgICBjb2xTdHJpbmcgPSBjb2xMZXR0ZXIgKyBjb2xTdHJpbmc7XG4gICAgICAgIGNvbCA9IE1hdGguZmxvb3IoY29sIC8gMjYpO1xuICAgIH1cbiAgICByZXR1cm4gY29sU3RyaW5nICsgKHJvdyArIDEpLnRvU3RyaW5nKCk7XG59XG5cbi8qKlxuICogU3BsaXQgYW4gRXhjZWwtbGlrZSBpbmRleCBpbnRvIHJvdyBhbmQgY29sdW1uIG51bWJlcnMuXG4gKiBAcGFyYW0ge3N0cmluZ30gZXhjZWxfaW5kZXggLSBUaGUgRXhjZWwtbGlrZSBpbmRleCAoZS5nLiwgXCJBMVwiKS5cbiAqIEByZXR1cm5zIHtbbnVtYmVyLCBudW1iZXJdfSBBbiBhcnJheSBjb250YWluaW5nIHRoZSByb3cgYW5kIGNvbHVtbiBudW1iZXJzICgwLWJhc2VkKS5cbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgaW5kZXggY2Fubm90IGJlIHBhcnNlZC5cbiAqL1xuZnVuY3Rpb24gc3BsaXRfdG9fcm93X2NvbChleGNlbF9pbmRleDogc3RyaW5nKTogW251bWJlciwgbnVtYmVyXSB7XG4gICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKFwiXihbQS1aYS16XSspKFswLTldKykkXCIpO1xuICAgIGNvbnN0IG1hdGNoID0gcmVnZXguZXhlYyhleGNlbF9pbmRleCk7XG4gICAgaWYgKG1hdGNoID09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIHBhcnNlIHN0cmluZyBmb3IgZXhjZWwgcG9zaXRpb24gc3BsaXRcIik7XG4gICAgfVxuICAgIGNvbnN0IGNvbCA9IGV4Y2VsX3Jvd190b19pbmRleChtYXRjaFsxXSk7XG4gICAgY29uc3QgcmF3X3JvdyA9IE51bWJlcihtYXRjaFsyXSk7XG4gICAgaWYgKHJhd19yb3cgPCAxKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlJvdyBtdXN0IGJlID49MVwiKTtcbiAgICB9XG4gICAgcmV0dXJuIFtyYXdfcm93IC0gMSwgY29sXTtcbn1cblxuLyoqXG4gKiBMb29rIHVwIGEgdmFsdWUgaW4gYSBzaGVldCBieSBpdHMgRXhjZWwtbGlrZSBpbmRleC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBleGNlbF9pbmRleCAtIFRoZSBFeGNlbC1saWtlIGluZGV4IChlLmcuLCBcIkExXCIpLlxuICogQHBhcmFtIHthbnlbXVtdfSBzaGVldCAtIFRoZSBzaGVldCBkYXRhLlxuICogQHJldHVybnMge2FueX0gVGhlIHZhbHVlIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXgsIG9yIHVuZGVmaW5lZCBpZiBub3QgZm91bmQuXG4gKi9cbmZ1bmN0aW9uIGxvb2t1cF9yb3dfY29sX2luX3NoZWV0KGV4Y2VsX2luZGV4OiBzdHJpbmcsIHNoZWV0OiBhbnlbXVtdKTogYW55IHtcbiAgICBjb25zdCBbcm93LCBjb2xdID0gc3BsaXRfdG9fcm93X2NvbChleGNlbF9pbmRleCk7XG4gICAgaWYgKHJvdyA+PSBzaGVldC5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIHNoZWV0W3Jvd11bY29sXTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0IEV4Y2VsLWxpa2UgY29sdW1uIGxldHRlcnMgdG8gYSBjb2x1bW4gbnVtYmVyLlxuICogQHBhcmFtIHtzdHJpbmd9IGxldHRlcnMgLSBUaGUgY29sdW1uIGxldHRlcnMgKGUuZy4sIFwiQVwiKS5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBjb2x1bW4gbnVtYmVyICgwLWJhc2VkKS5cbiAqL1xuZnVuY3Rpb24gZXhjZWxfcm93X3RvX2luZGV4KGxldHRlcnM6IHN0cmluZyk6IG51bWJlciB7XG4gICAgY29uc3QgbG93ZXJMZXR0ZXJzID0gbGV0dGVycy50b0xvd2VyQ2FzZSgpO1xuICAgIGxldCByZXN1bHQ6IG51bWJlciA9IDA7XG4gICAgZm9yIChsZXQgcCA9IDA7IHAgPCBsb3dlckxldHRlcnMubGVuZ3RoOyBwKyspIHtcbiAgICAgICAgY29uc3QgY2hhcmFjdGVyVmFsdWUgPVxuICAgICAgICAgICAgbG93ZXJMZXR0ZXJzLmNoYXJDb2RlQXQocCkgLSBcImFcIi5jaGFyQ29kZUF0KDApICsgMTtcbiAgICAgICAgcmVzdWx0ID0gY2hhcmFjdGVyVmFsdWUgKyByZXN1bHQgKiAyNjtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdCAtIDE7XG59XG5cbi8qKlxuICogUGFyc2UgYSBHb29nbGUgU2hlZXRzIGNoZWNrYm94L2Jvb2xlYW4gY2VsbCB2YWx1ZSBhcyBhIGJvb2xlYW4uXG4gKiBBY2NlcHRzIEpTIGJvb2xlYW4gdHJ1ZS9mYWxzZSBhbmQgc3RyaW5nIGxpdGVyYWxzIFwiVFJVRVwiL1wiRkFMU0VcIlxuICogKGNhc2UtaW5zZW5zaXRpdmUpIGZyb20gU2hlZXRzLCAgZGVwZW5kaW5nIG9uIHRoZSBjZWxsIGZvcm1hdHRpbmcuXG4gKiBBbnkgdmFsdWUgdGhhdCBjYW5ub3QgYmUgcmVjb2duaXplZCBhcyB0cnVlIGlzIGNvbnNpZGVyZWQgZmFsc2UuXG4gKiBAcGFyYW0ge2FueX0gdmFsdWUgLSBSYXcgY2VsbCB2YWx1ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIG9ubHkgd2hlbiB2YWx1ZSBpcyB0cnVlIG9yIFwiVFJVRVwiIChjYXNlLWluc2Vuc2l0aXZlKS5cbiAqL1xuZnVuY3Rpb24gcGFyc2VfYm9vbGVhbl9jZWxsKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICBpZiAodmFsdWUgPT09IHRydWUpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgdmFsdWUudG9VcHBlckNhc2UoKSA9PT0gXCJUUlVFXCI7XG59XG5cbi8qKlxuICogU2FuaXRpemUgYSBwaG9uZSBudW1iZXIgYnkgcmVtb3ZpbmcgdW53YW50ZWQgY2hhcmFjdGVycy5cbiAqIEBwYXJhbSB7bnVtYmVyIHwgc3RyaW5nfSBudW1iZXIgLSBUaGUgcGhvbmUgbnVtYmVyIHRvIHNhbml0aXplLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIHNhbml0aXplZCBwaG9uZSBudW1iZXIuXG4gKi9cbmZ1bmN0aW9uIHNhbml0aXplX3Bob25lX251bWJlcihudW1iZXI6IG51bWJlciB8IHN0cmluZyk6IHN0cmluZyB7XG4gICAgbGV0IG5ld19udW1iZXIgPSBudW1iZXIudG9TdHJpbmcoKTtcbiAgICBuZXdfbnVtYmVyID0gbmV3X251bWJlci5yZXBsYWNlKFwid2hhdHNhcHA6XCIsIFwiXCIpO1xuICAgIGxldCB0ZW1wb3JhcnlfbmV3X251bWJlcjogc3RyaW5nID0gXCJcIjtcbiAgICB3aGlsZSAodGVtcG9yYXJ5X25ld19udW1iZXIgIT0gbmV3X251bWJlcikge1xuICAgICAgICAvLyBEbyB0aGlzIG11bHRpcGxlIHRpbWVzIHNvIHdlIGdldCBhbGwgKzEgYXQgdGhlIHN0YXJ0IG9mIHRoZSBzdHJpbmcsIGV2ZW4gYWZ0ZXIgc3RyaXBwaW5nLlxuICAgICAgICB0ZW1wb3JhcnlfbmV3X251bWJlciA9IG5ld19udW1iZXI7XG4gICAgICAgIG5ld19udW1iZXIgPSBuZXdfbnVtYmVyLnJlcGxhY2UoLyheXFwrMXxcXCh8XFwpfFxcLnwtKS9nLCBcIlwiKTtcbiAgICB9XG4gICAgY29uc3QgcmVzdWx0ID0gU3RyaW5nKHBhcnNlSW50KG5ld19udW1iZXIpKS5wYWRTdGFydCgxMCwgXCIwXCIpO1xuICAgIGlmIChyZXN1bHQubGVuZ3RoID09IDExICYmIHJlc3VsdFswXSA9PSBcIjFcIikge1xuICAgICAgICByZXR1cm4gcmVzdWx0LnN1YnN0cmluZygxKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBGb3JtYXRzIGEgMTAtZGlnaXQgcGhvbmUgbnVtYmVyIHN0cmluZyBhcyAoWFhYKVhYWC1YWFhYIGZvciBkaXNwbGF5LlxuICogQHBhcmFtIHtzdHJpbmd9IHRlbl9kaWdpdHMgLSBBIDEwLWRpZ2l0IHBob25lIG51bWJlciBzdHJpbmcgKGUuZy4gXCIxMjM0NTY3ODkwXCIpLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCBwaG9uZSBudW1iZXIgKGUuZy4gXCIoMTIzKTQ1Ni03ODkwXCIpLlxuICovXG5mdW5jdGlvbiBmb3JtYXRfcGhvbmVfZm9yX2Rpc3BsYXkodGVuX2RpZ2l0czogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCgke3Rlbl9kaWdpdHMuc3Vic3RyaW5nKDAsIDMpfSkke3Rlbl9kaWdpdHMuc3Vic3RyaW5nKDMsIDYpfS0ke3Rlbl9kaWdpdHMuc3Vic3RyaW5nKDYsIDEwKX1gO1xufVxuXG5leHBvcnQge1xuICAgIHJvd19jb2xfdG9fZXhjZWxfaW5kZXgsXG4gICAgZXhjZWxfcm93X3RvX2luZGV4LFxuICAgIHNhbml0aXplX3Bob25lX251bWJlcixcbiAgICBzcGxpdF90b19yb3dfY29sLFxuICAgIGxvb2t1cF9yb3dfY29sX2luX3NoZWV0LFxuICAgIHBhcnNlX2Jvb2xlYW5fY2VsbCxcbiAgICBmb3JtYXRfcGhvbmVfZm9yX2Rpc3BsYXlcbn07IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZ29vZ2xlYXBpc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzbXMtc2VnbWVudHMtY2FsY3VsYXRvclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG5jb25zdCBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGNvbnN0IGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHRjb25zdCBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0Y29uc3QgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdGNvbnN0IGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyL3ZhbHVlIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpOyIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCJAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzXCI7XG5pbXBvcnQge1xuICAgIENvbnRleHQsXG4gICAgU2VydmVybGVzc0NhbGxiYWNrLFxuICAgIFNlcnZlcmxlc3NFdmVudE9iamVjdCxcbiAgICBTZXJ2ZXJsZXNzRnVuY3Rpb25TaWduYXR1cmUsXG59IGZyb20gXCJAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzL3R5cGVzXCI7XG5pbXBvcnQgQlZOU1BIYW5kbGVyLCB7IEJWTlNQRXZlbnQgfSBmcm9tIFwiLi9idm5zcF9oYW5kbGVyXCI7XG5pbXBvcnQgeyBIYW5kbGVyRW52aXJvbm1lbnQgfSBmcm9tIFwiLi4vZW52L2hhbmRsZXJfY29uZmlnXCI7XG5cbmNvbnN0IE5FWFRfU1RFUF9DT09LSUVfTkFNRSA9IFwiYnZuc3BfbmV4dF9zdGVwXCI7XG5cbi8qKlxuICogVHdpbGlvIFNlcnZlcmxlc3MgZnVuY3Rpb24gaGFuZGxlciBmb3IgQlZOU1AgYm90IGNvbW1hbmRzLlxuICogQHBhcmFtIHtDb250ZXh0PEhhbmRsZXJFbnZpcm9ubWVudD59IGNvbnRleHQgLSBUaGUgVHdpbGlvIHNlcnZlcmxlc3MgY29udGV4dC5cbiAqIEBwYXJhbSB7U2VydmVybGVzc0V2ZW50T2JqZWN0PEJWTlNQRXZlbnQ+fSBldmVudCAtIFRoZSBldmVudCBvYmplY3QuXG4gKiBAcGFyYW0ge1NlcnZlcmxlc3NDYWxsYmFja30gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBjb25zdCBoYW5kbGVyOiBTZXJ2ZXJsZXNzRnVuY3Rpb25TaWduYXR1cmU8XG4gICAgSGFuZGxlckVudmlyb25tZW50LFxuICAgIEJWTlNQRXZlbnRcbj4gPSBhc3luYyBmdW5jdGlvbiAoXG4gICAgY29udGV4dDogQ29udGV4dDxIYW5kbGVyRW52aXJvbm1lbnQ+LFxuICAgIGV2ZW50OiBTZXJ2ZXJsZXNzRXZlbnRPYmplY3Q8QlZOU1BFdmVudD4sXG4gICAgY2FsbGJhY2s6IFNlcnZlcmxlc3NDYWxsYmFja1xuKSB7XG4gICAgY29uc3QgaGFuZGxlciA9IG5ldyBCVk5TUEhhbmRsZXIoY29udGV4dCwgZXZlbnQpO1xuICAgIGxldCBtZXNzYWdlOiBzdHJpbmc7XG4gICAgbGV0IG5leHRfc3RlcDogc3RyaW5nID0gXCJcIjtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBoYW5kbGVyX3Jlc3BvbnNlID0gYXdhaXQgaGFuZGxlci5oYW5kbGUoKTtcbiAgICAgICAgbWVzc2FnZSA9XG4gICAgICAgICAgICBoYW5kbGVyX3Jlc3BvbnNlLnJlc3BvbnNlIHx8XG4gICAgICAgICAgICBcIlVuZXhwZWN0ZWQgcmVzdWx0IC0gbm8gcmVzcG9uc2UgZGV0ZXJtaW5lZFwiO1xuICAgICAgICBuZXh0X3N0ZXAgPSBoYW5kbGVyX3Jlc3BvbnNlLm5leHRfc3RlcCB8fCBcIlwiO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJBbiBlcnJvciBvY2N1cmVkXCIpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZSkpO1xuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICB9XG4gICAgICAgIG1lc3NhZ2UgPSBcIkFuIHVuZXhwZWN0ZWQgZXJyb3Igb2NjdXJlZC5cIjtcbiAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgbWVzc2FnZSArPSBcIlxcblwiICsgZS5tZXNzYWdlO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvclwiLCBlLnN0YWNrKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3JcIiwgZS5uYW1lKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3JcIiwgZS5tZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHJlc3BvbnNlID0gbmV3IFR3aWxpby5SZXNwb25zZSgpO1xuICAgIGNvbnN0IHR3aW1sID0gbmV3IFR3aWxpby50d2ltbC5NZXNzYWdpbmdSZXNwb25zZSgpO1xuXG4gICAgdHdpbWwubWVzc2FnZShtZXNzYWdlKTtcblxuICAgIHJlc3BvbnNlXG4gICAgICAgIC8vIEFkZCB0aGUgc3RyaW5naWZpZWQgVHdpTUwgdG8gdGhlIHJlc3BvbnNlIGJvZHlcbiAgICAgICAgLnNldEJvZHkodHdpbWwudG9TdHJpbmcoKSlcbiAgICAgICAgLy8gU2luY2Ugd2UncmUgcmV0dXJuaW5nIFR3aU1MLCB0aGUgY29udGVudCB0eXBlIG11c3QgYmUgWE1MXG4gICAgICAgIC5hcHBlbmRIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJ0ZXh0L3htbFwiKVxuICAgICAgICAuc2V0Q29va2llKE5FWFRfU1RFUF9DT09LSUVfTkFNRSwgbmV4dF9zdGVwKTtcblxuICAgIHJldHVybiBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7XG59OyJdLCJuYW1lcyI6WyJDaGVja2luVmFsdWUiLCJ1c2VyX2NyZWRzX2NvbmZpZyIsIk5TUF9FTUFJTF9ET01BSU4iLCJmaW5kX3BhdHJvbGxlcl9jb25maWciLCJTSEVFVF9JRCIsIlBIT05FX05VTUJFUl9MT09LVVBfU0hFRVQiLCJQSE9ORV9OVU1CRVJfTkFNRV9DT0xVTU4iLCJQSE9ORV9OVU1CRVJfTlVNQkVSX0NPTFVNTiIsImxvZ2luX3NoZWV0X2NvbmZpZyIsIkxPR0lOX1NIRUVUX0xPT0tVUCIsIkNIRUNLSU5fQ09VTlRfTE9PS1VQIiwiU0hFRVRfREFURV9DRUxMIiwiQ1VSUkVOVF9EQVRFX0NFTEwiLCJBUkNISVZFRF9DRUxMIiwiTkFNRV9DT0xVTU4iLCJDQVRFR09SWV9DT0xVTU4iLCJTRUNUSU9OX0RST1BET1dOX0NPTFVNTiIsIkNIRUNLSU5fRFJPUERPV05fQ09MVU1OIiwic2Vhc29uX3NoZWV0X2NvbmZpZyIsIlNFQVNPTl9TSEVFVCIsIlNFQVNPTl9TSEVFVF9OQU1FX0NPTFVNTiIsIlNFQVNPTl9TSEVFVF9EQVlTX0NPTFVNTiIsInNlY3Rpb25fY29uZmlnIiwiU0VDVElPTl9WQUxVRVMiLCJndWVzdF9wYXNzZXNfY29uZmlnIiwiR1VFU1RfUEFTU19TSEVFVCIsIkdVRVNUX1BBU1NfRUxJR0lCTEVfQ09MVU1OIiwiR1VFU1RfUEFTU19FTElHSUJMRV9SRUFTT05fQ09MVU1OIiwiR1VFU1RfUEFTU19TSEVFVF9OQU1FX0NPTFVNTiIsIkdVRVNUX1BBU1NfU0hFRVRfQVZBSUxBQkxFX0NPTFVNTiIsIkdVRVNUX1BBU1NfU0hFRVRfVVNFRF9UT0RBWV9DT0xVTU4iLCJHVUVTVF9QQVNTX1NIRUVUX1VTRURfU0VBU09OX0NPTFVNTiIsIkdVRVNUX1BBU1NfU0hFRVRfREFURVNfU1RBUlRJTkdfQ09MVU1OIiwic2xlZF9iZWFjb25fc2hlZXRfY29uZmlnIiwiU0xFRF9CRUFDT05fU0hFRVQiLCJTTEVEX0JFQUNPTl9TSEVFVF9OQU1FX0NPTFVNTiIsIkJFQUNPTl9TRUFSQ0hfQ09VTlRfQ09MVU1OIiwiQkVBQ09OX0ZJTkRfREFURVNfU1RBUlRJTkdfQ09MVU1OIiwiaGFuZGxlcl9jb25maWciLCJTQ1JJUFRfSUQiLCJTWU5DX1NJRCIsIkFSQ0hJVkVfRlVOQ1RJT05fTkFNRSIsIlJFU0VUX0ZVTkNUSU9OX05BTUUiLCJVU0VfU0VSVklDRV9BQ0NPVU5UIiwiQUNUSU9OX0xPR19TSEVFVCIsIkNIRUNLSU5fVkFMVUVTIiwiQ09ORklHIiwiZ29vZ2xlIiwiTG9naW5TaGVldCIsIlNlYXNvblNoZWV0IiwiVXNlckNyZWRzIiwiQ2hlY2tpblZhbHVlcyIsImdldF9zZXJ2aWNlX2NyZWRlbnRpYWxzX3BhdGgiLCJleGNlbF9yb3dfdG9faW5kZXgiLCJmb3JtYXRfcGhvbmVfZm9yX2Rpc3BsYXkiLCJzYW5pdGl6ZV9waG9uZV9udW1iZXIiLCJidWlsZF9wYXNzZXNfc3RyaW5nIiwiR3Vlc3RQYXNzU2hlZXQiLCJTZWN0aW9uVmFsdWVzIiwiU2xlZEJlYWNvbkNoZWNrU2hlZXQiLCJORVhUX1NURVBTIiwiQVdBSVRfQ09NTUFORCIsIkFXQUlUX0NIRUNLSU4iLCJDT05GSVJNX1JFU0VUIiwiQVVUSF9SRVNFVCIsIkFXQUlUX1NFQ1RJT04iLCJBV0FJVF9QQVNTIiwiQVdBSVRfTUVTU0FHRSIsIkFXQUlUX0JST0FEQ0FTVCIsIkFXQUlUX0JFQUNPTiIsIkNPTU1BTkRTIiwiT05fRFVUWSIsIlNUQVRVUyIsIkNIRUNLSU4iLCJTRUNUSU9OX0FTU0lHTk1FTlQiLCJHVUVTVF9QQVNTIiwiV0hBVFNBUFAiLCJNRVNTQUdFIiwiQlJPQURDQVNUIiwiQkVBQ09OIiwiU01TX01BWF9MRU5HVEgiLCJNRVNTQUdFX1BSRUZJWF9URU1QTEFURSIsIk1FU1NBR0VfUFJFRklYX1NVRkZJWCIsInZhbGlkYXRlX3Ntc19tZXNzYWdlIiwiZnVsbF9tZXNzYWdlIiwiU2VnbWVudGVkTWVzc2FnZSIsInJlcXVpcmUiLCJzZWdtZW50ZWQiLCJub25fZ3NtIiwiZ2V0Tm9uR3NtQ2hhcmFjdGVycyIsImxlbmd0aCIsInZhbGlkIiwicmVhc29uIiwibm9uX2dzbV9jaGFyYWN0ZXJzIiwiU2V0Iiwic2VnbWVudHNDb3VudCIsInNlZ21lbnRzX2NvdW50IiwiQlZOU1BIYW5kbGVyIiwiU0NPUEVTIiwic21zX3JlcXVlc3QiLCJyZXN1bHRfbWVzc2FnZXMiLCJmcm9tIiwidG8iLCJib2R5IiwiYm9keV9yYXciLCJwYXRyb2xsZXIiLCJidm5zcF9uZXh0X3N0ZXAiLCJjaGVja2luX21vZGUiLCJmYXN0X2NoZWNraW4iLCJhc3NpZ25lZF9zZWN0aW9uIiwidHdpbGlvX2NsaWVudCIsInN5bmNfc2lkIiwicmVzZXRfc2NyaXB0X2lkIiwic3luY19jbGllbnQiLCJ1c2VyX2NyZWRzIiwic2VydmljZV9jcmVkcyIsInNoZWV0c19zZXJ2aWNlIiwidXNlcl9zY3JpcHRzX3NlcnZpY2UiLCJsb2dpbl9zaGVldCIsInNlYXNvbl9zaGVldCIsImd1ZXN0X3Bhc3Nfc2hlZXQiLCJzbGVkX2JlYWNvbl9jaGVja19zaGVldCIsImNoZWNraW5fdmFsdWVzIiwiY3VycmVudF9zaGVldF9kYXRlIiwiY29tYmluZWRfY29uZmlnIiwiY29uZmlnIiwic2VjdGlvbl92YWx1ZXMiLCJjb250ZXh0IiwiZXZlbnQiLCJGcm9tIiwibnVtYmVyIiwidW5kZWZpbmVkIiwidGVzdF9udW1iZXIiLCJUbyIsIkJvZHkiLCJ0b0xvd2VyQ2FzZSIsInRyaW0iLCJyZXBsYWNlIiwicmVxdWVzdCIsImNvb2tpZXMiLCJnZXRUd2lsaW9DbGllbnQiLCJlIiwiY29uc29sZSIsImxvZyIsIkRhdGUiLCJwYXJzZV9mYXN0X2NoZWNraW5fbW9kZSIsInBhcnNlZCIsInBhcnNlX2Zhc3RfY2hlY2tpbiIsImtleSIsInBhcnNlX2NoZWNraW4iLCJwYXJzZV9jaGVja2luX2Zyb21fbmV4dF9zdGVwIiwibGFzdF9zZWdtZW50Iiwic3BsaXQiLCJzbGljZSIsImJ5X2tleSIsImRlbGF5Iiwic2Vjb25kcyIsIm9wdGlvbmFsIiwiUHJvbWlzZSIsInJlcyIsInNldFRpbWVvdXQiLCJzZW5kX21lc3NhZ2UiLCJtZXNzYWdlIiwiZ2V0X3R3aWxpb19jbGllbnQiLCJtZXNzYWdlcyIsImNyZWF0ZSIsInB1c2giLCJoYW5kbGUiLCJyZXN1bHQiLCJfaGFuZGxlIiwicmVzcG9uc2UiLCJqb2luIiwibmV4dF9zdGVwIiwibG9nb3V0IiwiY2hlY2tfdXNlcl9jcmVkcyIsImdldF9tYXBwZWRfcGF0cm9sbGVyIiwiYXdhaXRfcmVzcG9uc2UiLCJoYW5kbGVfYXdhaXRfY29tbWFuZCIsImNoZWNraW4iLCJzdGFydHNXaXRoIiwibmFtZSIsInJlc2V0X3NoZWV0X2Zsb3ciLCJzZWN0aW9uIiwicGFyc2Vfc2VjdGlvbiIsImFzc2lnbl9zZWN0aW9uIiwicHJvbXB0X3NlY3Rpb25fYXNzaWdubWVudCIsInNlbmRfdGV4dF9tZXNzYWdlIiwic2VuZF9icm9hZGNhc3RfbWVzc2FnZSIsImJlYWNvbl9zZWFyY2hfbG9jYXRpb24iLCJwYXJzZV9iZWFjb25fc2VhcmNoX2xvY2F0aW9uIiwic2V0X2JlYWNvbl9zZWFyY2giLCJwcm9tcHRfYmVhY29uX3NlYXJjaCIsInByb21wdF9jb21tYW5kIiwicGF0cm9sbGVyX25hbWUiLCJpbmNsdWRlcyIsImdldF9vbl9kdXR5IiwiZ2V0X3N0YXR1cyIsInByb21wdF9jaGVja2luIiwic2V0X2d1ZXN0X3Bhc3MiLCJwYXJzZV9mYXN0X3NlY3Rpb25fYXNzaWdubWVudCIsInByb21wdF9tZXNzYWdlIiwicHJvbXB0X2Jyb2FkY2FzdCIsInR5cGVzIiwiT2JqZWN0IiwidmFsdWVzIiwibWFwIiwieCIsInNtc19kZXNjIiwic2VnbWVudHMiLCJsYXN0U2VnbWVudCIsInBvcCIsImZpcnN0UGFydCIsIm1hcF9zZWN0aW9uIiwic2VjdGlvbl9kZXNjcmlwdGlvbiIsImdldF9zZWN0aW9uX2Rlc2NyaXB0aW9uIiwiZ2V0X21lc3NhZ2VfcHJlZml4Iiwic2VuZGVyX25hbWUiLCJzZW5kZXJfcGhvbmUiLCJmb3JtYXR0ZWRfcGhvbmUiLCJnZXRfbWF4X21lc3NhZ2VfbGVuZ3RoIiwiZ2V0X2xvZ2luX3NoZWV0IiwicmVjaXBpZW50cyIsImdldF9vbl9kdXR5X3BhdHJvbGxlcnMiLCJtYXhfbGVuZ3RoIiwibWVzc2FnZV90ZXh0IiwicHJlZml4IiwidmFsaWRhdGlvbiIsImJhZF9jaGFycyIsInNpZ25lZF9pbl9wYXRyb2xsZXJzIiwicGhvbmVfbWFwIiwiZ2V0X3Bob25lX251bWJlcl9tYXAiLCJyZWNpcGllbnRfbWFwIiwibm9fcGhvbmVfbmFtZXMiLCJwaG9uZSIsInNlbnRfY291bnQiLCJjb3B5X3NlbnRfdG9fc2VuZGVyIiwiZmFpbGVkX25hbWVzIiwiZGVsaXZlcl9zbXNfdG9fbWFwIiwibG9nX2FjdGlvbiIsImFsbF9mYWlsZWQiLCJlbnRyaWVzIiwibm9ybWFsaXplZF9zZW5kZXIiLCJzZW5kZXJfaW5fbWFwIiwicmVjaXBpZW50X2NvdW50Iiwia2V5cyIsImdldF9zaGVldHNfc2VydmljZSIsIm9wdHMiLCJzcHJlYWRzaGVldHMiLCJnZXQiLCJzcHJlYWRzaGVldElkIiwicmFuZ2UiLCJ2YWx1ZVJlbmRlck9wdGlvbiIsImRhdGEiLCJyb3ciLCJyYXdOdW1iZXIiLCJhc3NpZ25lZFNlY3Rpb24iLCJtYXBwZWRfc2VjdGlvbiIsInJlZnJlc2giLCJzaGVldCIsImdldF9zbGVkX2JlYWNvbl9jaGVja19zaGVldCIsInByaW9yX3NlYXJjaGVzIiwiZ2V0X2JlYWNvbl9zZWFyY2hlcyIsInNldF9iZWFjb25zX3NlYXJjaGVzIiwidXBkYXRlZCIsInN0YXR1cyIsInNlYXJjaF9jb3VudCIsInNoZWV0X2RhdGUiLCJ0b0RhdGVTdHJpbmciLCJjdXJyZW50X2RhdGUiLCJpc19jdXJyZW50IiwiZ2V0X3N0YXR1c19zdHJpbmciLCJndWVzdF9wYXNzX3Byb21pc2UiLCJnZXRfZ3Vlc3RfcGFzc19zaGVldCIsImdldF9hdmFpbGFibGVfYW5kX3VzZWRfcGFzc2VzIiwicGF0cm9sbGVyX3N0YXR1cyIsImNoZWNraW5Db2x1bW5TZXQiLCJjaGVja2VkT3V0IiwiYnlfc2hlZXRfc3RyaW5nIiwidG9TdHJpbmciLCJjb21wbGV0ZWRQYXRyb2xEYXlzIiwiZ2V0X3NlYXNvbl9zaGVldCIsImdldF9wYXRyb2xsZWRfZGF5cyIsImNvbXBsZXRlZFBhdHJvbERheXNTdHJpbmciLCJsb2dpblNoZWV0RGF0ZSIsInN0YXR1c1N0cmluZyIsInVzZWRUb2RheUd1ZXN0UGFzc2VzIiwidXNlZF90b2RheSIsInVzZWRTZWFzb25HdWVzdFBhc3NlcyIsInVzZWRfc2Vhc29uIiwiYXZhaWxhYmxlR3Vlc3RQYXNzZXMiLCJhdmFpbGFibGUiLCJzaGVldF9uZWVkc19yZXNldCIsIkVycm9yIiwibmV3X2NoZWNraW5fdmFsdWUiLCJzaGVldHNfdmFsdWUiLCJmYXN0X2NoZWNraW5zIiwicmVzZXRfc2hlZXQiLCJzY3JpcHRfc2VydmljZSIsImdldF91c2VyX3NjcmlwdHNfc2VydmljZSIsInNob3VsZF9wZXJmb3JtX2FyY2hpdmUiLCJhcmNoaXZlZCIsInNjcmlwdHMiLCJydW4iLCJzY3JpcHRJZCIsInJlcXVlc3RCb2R5IiwiZnVuY3Rpb24iLCJnZXRfdXNlcl9jcmVkcyIsImxvYWRUb2tlbiIsImF1dGhVcmwiLCJnZXRBdXRoVXJsIiwiY2hlY2tlZF9vdXRfc2VjdGlvbiIsImxhc3Rfc2VjdGlvbnMiLCJvbl9kdXR5X3BhdHJvbGxlcnMiLCJieV9zZWN0aW9uIiwiZmlsdGVyIiwicmVkdWNlIiwicHJldiIsImN1ciIsInNob3J0X2NvZGUiLCJyZXN1bHRzIiwiYWxsX2tleXMiLCJvcmRlcmVkX3ByaW1hcnlfc2VjdGlvbnMiLCJzb3J0IiwiZmlsdGVyZWRfbGFzdF9zZWN0aW9ucyIsIm9yZGVyZWRfc2VjdGlvbnMiLCJjb25jYXQiLCJwYXRyb2xsZXJzIiwieSIsImxvY2FsZUNvbXBhcmUiLCJwYXRyb2xsZXJfc3RyaW5nIiwiZGV0YWlscyIsInRvVXBwZXJDYXNlIiwiciIsImFjdGlvbl9uYW1lIiwiYXBwZW5kIiwidmFsdWVJbnB1dE9wdGlvbiIsImRlbGV0ZVRva2VuIiwiZ2V0X3N5bmNfY2xpZW50Iiwic3luYyIsInYxIiwic2VydmljZXMiLCJnZXRfc2VydmljZV9jcmVkcyIsImF1dGgiLCJHb29nbGVBdXRoIiwia2V5RmlsZSIsInNjb3BlcyIsImdldF92YWxpZF9jcmVkcyIsInJlcXVpcmVfdXNlcl9jcmVkcyIsIm9hdXRoMl9jbGllbnQiLCJzaGVldHMiLCJ2ZXJzaW9uIiwic2NyaXB0IiwiZm9yY2UiLCJwaG9uZV9sb29rdXAiLCJmaW5kX3BhdHJvbGxlcl9mcm9tX251bWJlciIsIm1hcHBlZFBhdHJvbGxlciIsInRyeV9maW5kX3BhdHJvbGxlciIsInJhd19udW1iZXIiLCJjdXJyZW50TnVtYmVyIiwiY3VycmVudE5hbWUiLCJ1c2VkX2FuZF9hdmFpbGFibGUiLCJnZXRfcHJvbXB0Iiwic2V0X3VzZWRfZ3Vlc3RfcGFzc2VzIiwicGFyc2VfbG9jYXRpb24iLCJyb3dfY29sX3RvX2V4Y2VsX2luZGV4IiwicGFyc2VfYm9vbGVhbl9jZWxsIiwiR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIiLCJmb3JtYXRfZGF0ZV9mb3Jfc3ByZWFkc2hlZXRfdmFsdWUiLCJVc2VkQW5kQXZhaWxhYmxlUGFzc2VzIiwiaW5kZXgiLCJlbGlnaWJsZSIsImVsaWdpYmxlX3JlYXNvbiIsIlN0cmluZyIsIk51bWJlciIsIlBhc3NTaGVldCIsInBhdHJvbGxlcl9yb3ciLCJnZXRfc2hlZXRfcm93X2Zvcl9wYXRyb2xsZXIiLCJuYW1lX2NvbHVtbiIsImVsaWdpYmxlX2NvbHVtbiIsImVsaWdpYmxlX3JlYXNvbl9jb2x1bW4iLCJjdXJyZW50X2RheV9hdmFpbGFibGVfcGFzc2VzIiwiYXZhaWxhYmxlX2NvbHVtbiIsImN1cnJlbnRfZGF5X3VzZWRfcGFzc2VzIiwidXNlZF90b2RheV9jb2x1bW4iLCJjdXJyZW50X3NlYXNvbl91c2VkX3Bhc3NlcyIsInVzZWRfc2Vhc29uX2NvbHVtbiIsInJvd251bSIsInN0YXJ0X2luZGV4IiwicHJpb3JfbGVuZ3RoIiwiY3VycmVudF9kYXRlX3N0cmluZyIsIm5ld192YWxzIiwidXBkYXRlX2xlbmd0aCIsIk1hdGgiLCJtYXgiLCJlbmRfaW5kZXgiLCJzaGVldF9uYW1lIiwidXBkYXRlX3ZhbHVlcyIsImxvb2t1cF9yb3dfY29sX2luX3NoZWV0Iiwic2FuaXRpemVfZGF0ZSIsImNoZWNraW5fY291bnRfc2hlZXQiLCJyb3dzIiwiY2hlY2tpbl9jb3VudCIsImdldF92YWx1ZXMiLCJpIiwicGFyc2VfcGF0cm9sbGVyX3JvdyIsImdldFRpbWUiLCJKU09OIiwic3RyaW5naWZ5IiwicGF0cm9sbGVyX3NlY3Rpb24iLCJuZXdfc2VjdGlvbl92YWx1ZSIsImNhdGVnb3J5IiwiZmlsdGVyX2xpc3RfdG9fZW5kc3dpdGhfY3VycmVudF9kYXkiLCJjdXJyZW50RGF5IiwiQmVhY29uU2VhcmNoZXMiLCJiZWFjb25fc2VhcmNoX2NvdW50X2NvbHVtbiIsImdldF9wYXRyb2xsZWRfYmVhY29uX2ZpbmRfY291bnQiLCJzZWFyY2hfbG9jYXRpb24iLCJyb3dfbnVtIiwiY2xlYW5TbXNWYWx1ZSIsImlucHV0IiwibWF4TGVuZ3RoIiwiY2xlYW5lZCIsImNoYXJhY3RlcnMiLCJBcnJheSIsImxvYWRfY3JlZGVudGlhbHNfZmlsZXMiLCJ2YWxpZGF0ZV9zY29wZXMiLCJkb21haW4iLCJsb2FkZWQiLCJjcmVkZW50aWFscyIsImNsaWVudF9zZWNyZXQiLCJjbGllbnRfaWQiLCJyZWRpcmVjdF91cmlzIiwid2ViIiwiT0F1dGgyIiwidG9rZW5fa2V5Iiwib2F1dGgyRG9jIiwiZG9jdW1lbnRzIiwiZmV0Y2giLCJ0b2tlbiIsInNldENyZWRlbnRpYWxzIiwic2lkIiwicmVtb3ZlIiwiY29tcGxldGVMb2dpbiIsImNvZGUiLCJnZXRUb2tlbiIsInRva2VucyIsIm9hdXRoRG9jIiwidW5pcXVlTmFtZSIsInVwZGF0ZSIsImlkIiwiZ2VuZXJhdGVSYW5kb21TdHJpbmciLCJkb2MiLCJ0dGwiLCJhY2Nlc3NfdHlwZSIsInNjb3BlIiwic3RhdGUiLCJnZW5lcmF0ZUF1dGhVcmwiLCJjaGFyYWN0ZXJzTGVuZ3RoIiwiY2hhckF0IiwiZmxvb3IiLCJyYW5kb20iLCJsb29rdXBfdmFsdWVzIiwic21zX2Rlc2Nfc3BsaXQiLCJsb29rdXBfdmFscyIsImJ5X2x2IiwiYnlfZmMiLCJjaGVja2luVmFsdWVzIiwiY2hlY2tpblZhbHVlIiwibHYiLCJmYyIsImNoZWNraW5fbG93ZXIiLCJleGNlbF9kYXRlX3RvX2pzX2RhdGUiLCJkYXRlIiwic2V0VVRDTWlsbGlzZWNvbmRzIiwicm91bmQiLCJjaGFuZ2VfdGltZXpvbmVfdG9fcHN0IiwidG9VVENTdHJpbmciLCJzdHJpcF9kYXRldGltZV90b19kYXRlIiwidG9Mb2NhbGVEYXRlU3RyaW5nIiwidGltZVpvbmUiLCJwYWRTdGFydCIsImZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2RhdGUiLCJsaXN0IiwiZGF0ZXN0ciIsImVuZHNXaXRoIiwiZnMiLCJwYXJzZSIsInJlYWRGaWxlU3luYyIsIlJ1bnRpbWUiLCJnZXRBc3NldHMiLCJwYXRoIiwic2hlZXRfaWQiLCJfZ2V0X3ZhbHVlcyIsImxvb2t1cF9pbmRleCIsInVwZGF0ZU1lIiwibG9va3VwUmFuZ2UiLCJzdWJzdHJpbmciLCJ1c2VkIiwidG90YWwiLCJ0b2RheSIsImZvcmNlX3RvZGF5IiwiZGVzaXJlZF9zY29wZXMiLCJkZXNpcmVkX3Njb3BlIiwiZXJyb3IiLCJzZWN0aW9ucyIsImxvd2VyY2FzZV9zZWN0aW9ucyIsImluZGV4T2YiLCJjb2wiLCJjb2xTdHJpbmciLCJtb2R1bG8iLCJjb2xMZXR0ZXIiLCJmcm9tQ2hhckNvZGUiLCJjaGFyQ29kZUF0Iiwic3BsaXRfdG9fcm93X2NvbCIsImV4Y2VsX2luZGV4IiwicmVnZXgiLCJSZWdFeHAiLCJtYXRjaCIsImV4ZWMiLCJyYXdfcm93IiwibGV0dGVycyIsImxvd2VyTGV0dGVycyIsInAiLCJjaGFyYWN0ZXJWYWx1ZSIsInZhbHVlIiwibmV3X251bWJlciIsInRlbXBvcmFyeV9uZXdfbnVtYmVyIiwicGFyc2VJbnQiLCJ0ZW5fZGlnaXRzIiwiTkVYVF9TVEVQX0NPT0tJRV9OQU1FIiwiaGFuZGxlciIsImNhbGxiYWNrIiwiaGFuZGxlcl9yZXNwb25zZSIsInN0YWNrIiwiVHdpbGlvIiwiUmVzcG9uc2UiLCJ0d2ltbCIsIk1lc3NhZ2luZ1Jlc3BvbnNlIiwic2V0Qm9keSIsImFwcGVuZEhlYWRlciIsInNldENvb2tpZSJdLCJzb3VyY2VSb290IjoiIn0=