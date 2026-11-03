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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVEsSUFDekI7UUFDSkUsWUFBWXVXLGlCQUFpQnZXLFNBQVMsSUFBSTtJQUM5QyxFQUFFLE9BQU8vQixHQUFHO1FBQ1JDLFFBQVFDLEdBQUcsQ0FBQztRQUNaLElBQUk7WUFDQUQsUUFBUUMsR0FBRyxDQUFDdVEsS0FBS0MsU0FBUyxDQUFDMVE7UUFDL0IsRUFBRSxPQUFNO1lBQ0pDLFFBQVFDLEdBQUcsQ0FBQ0Y7UUFDaEI7UUFDQXFCLFVBQVU7UUFDVixJQUFJckIsYUFBYXVKLE9BQU87WUFDcEJsSSxXQUFXLE9BQU9yQixFQUFFcUIsT0FBTztZQUMzQnBCLFFBQVFDLEdBQUcsQ0FBQyxTQUFTRixFQUFFdVksS0FBSztZQUM1QnRZLFFBQVFDLEdBQUcsQ0FBQyxTQUFTRixFQUFFdUMsSUFBSTtZQUMzQnRDLFFBQVFDLEdBQUcsQ0FBQyxTQUFTRixFQUFFcUIsT0FBTztRQUNsQztJQUNKO0lBRUEsTUFBTVEsV0FBVyxJQUFJMlcsT0FBT0MsUUFBUTtJQUNwQyxNQUFNQyxRQUFRLElBQUlGLE9BQU9FLEtBQUssQ0FBQ0MsaUJBQWlCO0lBRWhERCxNQUFNclgsT0FBTyxDQUFDQTtJQUVkUSxRQUNJLGlEQUFpRDtLQUNoRCtXLE9BQU8sQ0FBQ0YsTUFBTWpRLFFBQVEsR0FDdkIsNERBQTREO0tBQzNEb1EsWUFBWSxDQUFDLGdCQUFnQixZQUM3QkMsU0FBUyxDQUFDWCx1QkFBdUJwVztJQUV0QyxPQUFPc1csU0FBUyxNQUFNeFc7QUFDMUIsRUFBRSIsInNvdXJjZXMiOlsiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9ub2RlX21vZHVsZXMvQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlcy9pbmRleC5qcyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL2Vudi9oYW5kbGVyX2NvbmZpZy50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL2hhbmRsZXJzL2J2bnNwX2hhbmRsZXIudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9zaGVldHMvZ3Vlc3RfcGFzc19zaGVldC50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3NoZWV0cy9sb2dpbl9zaGVldC50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3NoZWV0cy9zZWFzb25fc2hlZXQudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9zaGVldHMvc2xlZF9iZWFjb25fY2hlY2tfc2hlZXQudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91c2VyLWNyZWRzLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvY2hlY2tpbl92YWx1ZXMudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91dGlscy9kYXRldGltZV91dGlsLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvZmlsZV91dGlscy50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3V0aWxzL2dvb2dsZV9zaGVldHNfc3ByZWFkc2hlZXRfdGFiLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvZ3Vlc3RfcGFzc2VzLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvc2NvcGVfdXRpbC50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3V0aWxzL3NlY3Rpb25fdmFsdWVzLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvdXRpbC50cyIsImV4dGVybmFsIGNvbW1vbmpzIFwiZ29vZ2xlYXBpc1wiIiwiZXh0ZXJuYWwgY29tbW9uanMgXCJzbXMtc2VnbWVudHMtY2FsY3VsYXRvclwiIiwiZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImZzXCIiLCJ3ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9oYW5kbGVycy9oYW5kbGVyLnByb3RlY3RlZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJbnRlbnRpb25hbGx5IGxlZnQgZW1wdHlcbiIsImltcG9ydCB7IENoZWNraW5WYWx1ZSB9IGZyb20gXCIuLi91dGlscy9jaGVja2luX3ZhbHVlc1wiO1xuXG4vKipcbiAqIEVudmlyb25tZW50IGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBoYW5kbGVyLlxuICogPHA+XG4gKiBOb3RlOiBUaGVzZSBhcmUgdGhlIG9ubHkgc2VjcmV0IHZhbHVlcyB3ZSBuZWVkIHRvIHJlYWQuIFJlc3QgY2FuIGJlIGRlcGxveWVkLlxuICogQHR5cGVkZWYge09iamVjdH0gSGFuZGxlckVudmlyb25tZW50XG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0NSSVBUX0lEIC0gVGhlIElEIG9mIHRoZSBHb29nbGUgQXBwcyBTY3JpcHQgcHJvamVjdC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTWU5DX1NJRCAtIFRoZSBTSUQgb2YgdGhlIFR3aWxpbyBTeW5jIHNlcnZpY2UuXG4gKi9cbnR5cGUgSGFuZGxlckVudmlyb25tZW50ID0ge1xuICAgIFNIRUVUX0lEOiBzdHJpbmc7XG4gICAgU0NSSVBUX0lEOiBzdHJpbmc7XG4gICAgU1lOQ19TSUQ6IHN0cmluZztcbn07XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgdXNlciBjcmVkZW50aWFscy5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IFVzZXJDcmVkc0NvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsfSBOU1BfRU1BSUxfRE9NQUlOIC0gVGhlIGVtYWlsIGRvbWFpbiBmb3IgTlNQLlxuICovXG50eXBlIFVzZXJDcmVkc0NvbmZpZyA9IHtcbiAgICBOU1BfRU1BSUxfRE9NQUlOOiBzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsO1xufTtcbmNvbnN0IHVzZXJfY3JlZHNfY29uZmlnOiBVc2VyQ3JlZHNDb25maWcgPSB7XG4gICAgTlNQX0VNQUlMX0RPTUFJTjogXCJmYXJ3ZXN0Lm9yZ1wiLFxufTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciBmaW5kaW5nIGEgcGF0cm9sbGVyLlxuICogQHR5cGVkZWYge09iamVjdH0gRmluZFBhdHJvbGxlckNvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFNIRUVUX0lEIC0gVGhlIElEIG9mIHRoZSBHb29nbGUgU2hlZXRzIHNwcmVhZHNoZWV0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFBIT05FX05VTUJFUl9MT09LVVBfU0hFRVQgLSBUaGUgcmFuZ2UgZm9yIHBob25lIG51bWJlciBsb29rdXAuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gUEhPTkVfTlVNQkVSX05VTUJFUl9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBwaG9uZSBudW1iZXJzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFBIT05FX05VTUJFUl9OQU1FX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIG5hbWVzLlxuICovXG50eXBlIEZpbmRQYXRyb2xsZXJDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICBQSE9ORV9OVU1CRVJfTE9PS1VQX1NIRUVUOiBzdHJpbmc7XG4gICAgUEhPTkVfTlVNQkVSX05VTUJFUl9DT0xVTU46IHN0cmluZztcbiAgICBQSE9ORV9OVU1CRVJfTkFNRV9DT0xVTU46IHN0cmluZztcbn07XG5cbmNvbnN0IGZpbmRfcGF0cm9sbGVyX2NvbmZpZzogRmluZFBhdHJvbGxlckNvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogXCJ0ZXN0XCIsXG4gICAgUEhPTkVfTlVNQkVSX0xPT0tVUF9TSEVFVDogXCJQaG9uZSBOdW1iZXJzIUEyOkIxMDBcIixcbiAgICBQSE9ORV9OVU1CRVJfTkFNRV9DT0xVTU46IFwiQVwiLFxuICAgIFBIT05FX05VTUJFUl9OVU1CRVJfQ09MVU1OOiBcIkJcIixcbn07XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgdGhlIGxvZ2luIHNoZWV0LlxuICogQHR5cGVkZWYge09iamVjdH0gTG9naW5TaGVldENvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFNIRUVUX0lEIC0gVGhlIElEIG9mIHRoZSBHb29nbGUgU2hlZXRzIHNwcmVhZHNoZWV0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IExPR0lOX1NIRUVUX0xPT0tVUCAtIFRoZSByYW5nZSBmb3IgbG9naW4gc2hlZXQgbG9va3VwLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IENIRUNLSU5fQ09VTlRfTE9PS1VQIC0gVGhlIHJhbmdlIGZvciBjaGVjay1pbiBjb3VudCBsb29rdXAuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQVJDSElWRURfQ0VMTCAtIFRoZSBjZWxsIGZvciBhcmNoaXZlZCBkYXRhLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNIRUVUX0RBVEVfQ0VMTCAtIFRoZSBjZWxsIGZvciB0aGUgc2hlZXQgZGF0ZS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDVVJSRU5UX0RBVEVfQ0VMTCAtIFRoZSBjZWxsIGZvciB0aGUgY3VycmVudCBkYXRlLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IE5BTUVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgbmFtZXMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQ0FURUdPUllfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgY2F0ZWdvcmllcy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTRUNUSU9OX0RST1BET1dOX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIHNlY3Rpb24gZHJvcGRvd24uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBjaGVjay1pbiBkcm9wZG93bi5cbiAqL1xudHlwZSBMb2dpblNoZWV0Q29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBzdHJpbmc7XG4gICAgTE9HSU5fU0hFRVRfTE9PS1VQOiBzdHJpbmc7XG4gICAgQ0hFQ0tJTl9DT1VOVF9MT09LVVA6IHN0cmluZztcbiAgICBBUkNISVZFRF9DRUxMOiBzdHJpbmc7XG4gICAgU0hFRVRfREFURV9DRUxMOiBzdHJpbmc7XG4gICAgQ1VSUkVOVF9EQVRFX0NFTEw6IHN0cmluZztcbiAgICBOQU1FX0NPTFVNTjogc3RyaW5nO1xuICAgIENBVEVHT1JZX0NPTFVNTjogc3RyaW5nO1xuICAgIFNFQ1RJT05fRFJPUERPV05fQ09MVU1OOiBzdHJpbmc7XG4gICAgQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU46IHN0cmluZztcbn07XG5cbmNvbnN0IGxvZ2luX3NoZWV0X2NvbmZpZzogTG9naW5TaGVldENvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogXCJ0ZXN0XCIsXG4gICAgTE9HSU5fU0hFRVRfTE9PS1VQOiBcIkxvZ2luIUExOkkxMDBcIixcbiAgICBDSEVDS0lOX0NPVU5UX0xPT0tVUDogXCJUb29scyFHMjpHMlwiLFxuICAgIFNIRUVUX0RBVEVfQ0VMTDogXCJCMVwiLFxuICAgIENVUlJFTlRfREFURV9DRUxMOiBcIkIyXCIsXG4gICAgQVJDSElWRURfQ0VMTDogXCJIMVwiLFxuICAgIE5BTUVfQ09MVU1OOiBcIkFcIixcbiAgICBDQVRFR09SWV9DT0xVTU46IFwiQlwiLFxuICAgIFNFQ1RJT05fRFJPUERPV05fQ09MVU1OOiBcIkhcIixcbiAgICBDSEVDS0lOX0RST1BET1dOX0NPTFVNTjogXCJJXCIsXG59O1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIHRoZSBzZWFzb24gc2hlZXQuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBTZWFzb25TaGVldENvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFNIRUVUX0lEIC0gVGhlIElEIG9mIHRoZSBHb29nbGUgU2hlZXRzIHNwcmVhZHNoZWV0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNFQVNPTl9TSEVFVCAtIFRoZSBuYW1lIG9mIHRoZSBzZWFzb24gc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0VBU09OX1NIRUVUX0RBWVNfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3Igc2Vhc29uIHNoZWV0IGRheXMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0VBU09OX1NIRUVUX05BTUVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3Igc2Vhc29uIHNoZWV0IG5hbWVzLlxuICovXG50eXBlIFNlYXNvblNoZWV0Q29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBzdHJpbmc7XG4gICAgU0VBU09OX1NIRUVUOiBzdHJpbmc7XG4gICAgU0VBU09OX1NIRUVUX0RBWVNfQ09MVU1OOiBzdHJpbmc7XG4gICAgU0VBU09OX1NIRUVUX05BTUVfQ09MVU1OOiBzdHJpbmc7XG59O1xuY29uc3Qgc2Vhc29uX3NoZWV0X2NvbmZpZzogU2Vhc29uU2hlZXRDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IFwidGVzdFwiLFxuICAgIFNFQVNPTl9TSEVFVDogXCJTZWFzb25cIixcbiAgICBTRUFTT05fU0hFRVRfTkFNRV9DT0xVTU46IFwiQlwiLFxuICAgIFNFQVNPTl9TSEVFVF9EQVlTX0NPTFVNTjogXCJBXCIsXG59O1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIHNlY3Rpb25zLlxuICogQHR5cGVkZWYge09iamVjdH0gU2VjdGlvbkNvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFNFQ1RJT05fVkFMVUVTIC0gVGhlIHNlY3Rpb24gdmFsdWVzLlxuICovXG50eXBlIFNlY3Rpb25Db25maWcgPSB7XG4gICAgU0VDVElPTl9WQUxVRVM6IHN0cmluZztcbn07XG5jb25zdCBzZWN0aW9uX2NvbmZpZzogU2VjdGlvbkNvbmZpZyA9IHtcbiAgICBTRUNUSU9OX1ZBTFVFUzogIFwiMSwyLDMsNCxSb3ZpbmcsRkFSLFRyYWluaW5nXCIsXG59O1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIGd1ZXN0IHBhc3Nlcy5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IEd1ZXN0UGFzc2VzQ29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gR1VFU1RfUEFTU19TSEVFVCAtIFRoZSBuYW1lIG9mIHRoZSBndWVzdCBwYXNzIHNoZWV0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IEdVRVNUX1BBU1NfRUxJR0lCTEVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgZ3Vlc3QgcGFzcyAgZWxpZ2liaWxpdHkgY2hlY2tib3ggKFRSVUUvRkFMU0UpLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IEdVRVNUX1BBU1NfRUxJR0lCTEVfUkVBU09OX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIHRoZSBpbmVsaWdpYmlsaXR5IHJlYXNvbiBzdHJpbmcuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gR1VFU1RfUEFTU19TSEVFVF9BVkFJTEFCTEVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgYXZhaWxhYmxlIHBhc3MgY291bnQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gR1VFU1RfUEFTU19TSEVFVF9VU0VEX1RPREFZX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIHBhc3NlcyB1c2VkIHRvZGF5LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IEdVRVNUX1BBU1NfU0hFRVRfVVNFRF9TRUFTT05fQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgcGFzc2VzIHVzZWQgdGhpcyBzZWFzb24uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gR1VFU1RfUEFTU19TSEVFVF9EQVRFU19TVEFSVElOR19DT0xVTU4gLSBUaGUgY29sdW1uIHdoZXJlIGRhdGUtb2YtdXNlIGVudHJpZXMgYmVnaW4uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gR1VFU1RfUEFTU19TSEVFVF9OQU1FX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIHBhdHJvbGxlciBuYW1lcy5cbiAqL1xudHlwZSBHdWVzdFBhc3Nlc0NvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogc3RyaW5nO1xuICAgIEdVRVNUX1BBU1NfU0hFRVQ6IHN0cmluZztcbiAgICBHVUVTVF9QQVNTX0VMSUdJQkxFX0NPTFVNTjogc3RyaW5nO1xuICAgIEdVRVNUX1BBU1NfRUxJR0lCTEVfUkVBU09OX0NPTFVNTjogc3RyaW5nO1xuICAgIEdVRVNUX1BBU1NfU0hFRVRfQVZBSUxBQkxFX0NPTFVNTjogc3RyaW5nO1xuICAgIEdVRVNUX1BBU1NfU0hFRVRfVVNFRF9UT0RBWV9DT0xVTU46IHN0cmluZztcbiAgICBHVUVTVF9QQVNTX1NIRUVUX1VTRURfU0VBU09OX0NPTFVNTjogc3RyaW5nO1xuICAgIEdVRVNUX1BBU1NfU0hFRVRfREFURVNfU1RBUlRJTkdfQ09MVU1OOiBzdHJpbmc7XG4gICAgR1VFU1RfUEFTU19TSEVFVF9OQU1FX0NPTFVNTjogc3RyaW5nO1xufTtcbmNvbnN0IGd1ZXN0X3Bhc3Nlc19jb25maWc6IEd1ZXN0UGFzc2VzQ29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBcInRlc3RcIixcbiAgICBHVUVTVF9QQVNTX1NIRUVUOiBcIkd1ZXN0UGFzc2VzXCIsXG4gICAgR1VFU1RfUEFTU19FTElHSUJMRV9DT0xVTU46IFwiQlwiLFxuICAgIEdVRVNUX1BBU1NfRUxJR0lCTEVfUkVBU09OX0NPTFVNTjogXCJDXCIsXG4gICAgR1VFU1RfUEFTU19TSEVFVF9OQU1FX0NPTFVNTjogXCJBXCIsXG4gICAgR1VFU1RfUEFTU19TSEVFVF9BVkFJTEFCTEVfQ09MVU1OOiBcIkRcIixcbiAgICBHVUVTVF9QQVNTX1NIRUVUX1VTRURfVE9EQVlfQ09MVU1OOiBcIkVcIixcbiAgICBHVUVTVF9QQVNTX1NIRUVUX1VTRURfU0VBU09OX0NPTFVNTjogXCJGXCIsXG4gICAgR1VFU1RfUEFTU19TSEVFVF9EQVRFU19TVEFSVElOR19DT0xVTU46IFwiR1wiLFxufTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciB0aGUgU2xlZCBCZWFjb24gQ2hlY2tzIHNoZWV0XG4gKlxuICogQHR5cGVkZWYge09iamVjdH0gU2xlZEJlYWNvbkNvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFNIRUVUX0lEIC0gVGhlIElEIG9mIHRoZSBHb29nbGUgU2hlZXRzIHNwcmVhZHNoZWV0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNMRURfQkVBQ09OX1NIRUVUIC0gVGhlIG5hbWUgb2YgdGhlIFNsZWQgQmVjb24gQ2hlY2sgc2hlZXRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTTEVEX0JFQUNPTl9TSEVFVF9OQU1FX0NPTFVNTiAtICBUaGUgY29sdW1uIGZvciBwYXRyb2xsZXIgbmFtZXMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQkVBQ09OX1NFQVJDSF9DT1VOVF9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciB0aGUgc2VhcmNoIGNvdW50IGZvciB0aGlzIHNlYXNvbi5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBCRUFDT05fRklORF9EQVRFU19TVEFSVElOR19DT0xVTU4gLSBUaGVyZSBjb2x1bW4gd2hlcmUgaHRlIGRhdGVzIGZvciBiZWFjb24gZmluZHMgYmVnaW5zLlxuICovXG50eXBlIFNsZWRCZWFjb25Db25maWcgPSB7XG4gICAgIFNIRUVUX0lEOiBzdHJpbmc7XG4gICAgIFNMRURfQkVBQ09OX1NIRUVUOiBzdHJpbmc7XG4gICAgIFNMRURfQkVBQ09OX1NIRUVUX05BTUVfQ09MVU1OOiBzdHJpbmc7XG4gICAgIEJFQUNPTl9TRUFSQ0hfQ09VTlRfQ09MVU1OOiBzdHJpbmc7XG4gICAgIEJFQUNPTl9GSU5EX0RBVEVTX1NUQVJUSU5HX0NPTFVNTjogc3RyaW5nO1xufTtcbiBjb25zdCBzbGVkX2JlYWNvbl9zaGVldF9jb25maWc6IFNsZWRCZWFjb25Db25maWcgPSB7XG4gICAgIFNIRUVUX0lEOiBcInRlc3RcIixcbiAgICAgU0xFRF9CRUFDT05fU0hFRVQ6IFwiU2xlZF9CZWFjb24gQ2hlY2tzXCIsXG4gICAgIFNMRURfQkVBQ09OX1NIRUVUX05BTUVfQ09MVU1OOiBcIkFcIixcbiAgICAgQkVBQ09OX1NFQVJDSF9DT1VOVF9DT0xVTU46IFwiSlwiLFxuICAgICBCRUFDT05fRklORF9EQVRFU19TVEFSVElOR19DT0xVTU46IFwiS1wiXG59XG5cbiAvKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIHRoZSBoYW5kbGVyLlxuICogQHR5cGVkZWYge09iamVjdH0gSGFuZGxlckNvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFNDUklQVF9JRCAtIFRoZSBJRCBvZiB0aGUgR29vZ2xlIEFwcHMgU2NyaXB0IHByb2plY3QuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU1lOQ19TSUQgLSBUaGUgU0lEIG9mIHRoZSBUd2lsaW8gU3luYyBzZXJ2aWNlLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFJFU0VUX0ZVTkNUSU9OX05BTUUgLSBUaGUgbmFtZSBvZiB0aGUgcmVzZXQgZnVuY3Rpb24uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQVJDSElWRV9GVU5DVElPTl9OQU1FIC0gVGhlIG5hbWUgb2YgdGhlIGFyY2hpdmUgZnVuY3Rpb24uXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFVTRV9TRVJWSUNFX0FDQ09VTlQgLSBXaGV0aGVyIHRvIHVzZSBhIHNlcnZpY2UgYWNjb3VudC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBBQ1RJT05fTE9HX1NIRUVUIC0gVGhlIG5hbWUgb2YgdGhlIGFjdGlvbiBsb2cgc2hlZXQuXG4gKiBAcHJvcGVydHkge0NoZWNraW5WYWx1ZVtdfSBDSEVDS0lOX1ZBTFVFUyAtIFRoZSBjaGVjay1pbiB2YWx1ZXMuXG4gKi9cbnR5cGUgSGFuZGxlckNvbmZpZyA9IHtcbiAgICBTQ1JJUFRfSUQ6IHN0cmluZztcbiAgICBTSEVFVF9JRDogc3RyaW5nO1xuICAgIFNZTkNfU0lEOiBzdHJpbmc7XG4gICAgUkVTRVRfRlVOQ1RJT05fTkFNRTogc3RyaW5nO1xuICAgIEFSQ0hJVkVfRlVOQ1RJT05fTkFNRTogc3RyaW5nO1xuICAgIFVTRV9TRVJWSUNFX0FDQ09VTlQ6IGJvb2xlYW47XG4gICAgQUNUSU9OX0xPR19TSEVFVDogc3RyaW5nO1xuICAgIENIRUNLSU5fVkFMVUVTOiBDaGVja2luVmFsdWVbXTtcbn07XG5jb25zdCBoYW5kbGVyX2NvbmZpZzogSGFuZGxlckNvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogXCJ0ZXN0XCIsXG4gICAgU0NSSVBUX0lEOiBcInRlc3RcIixcbiAgICBTWU5DX1NJRDogXCJ0ZXN0XCIsXG4gICAgQVJDSElWRV9GVU5DVElPTl9OQU1FOiBcIkFyY2hpdmVcIixcbiAgICBSRVNFVF9GVU5DVElPTl9OQU1FOiBcIlJlc2V0XCIsXG4gICAgVVNFX1NFUlZJQ0VfQUNDT1VOVDogdHJ1ZSxcbiAgICBBQ1RJT05fTE9HX1NIRUVUOiBcIkJvdF9Vc2FnZVwiLFxuICAgIENIRUNLSU5fVkFMVUVTOiBbXG4gICAgICAgIG5ldyBDaGVja2luVmFsdWUoXCJkYXlcIiwgXCJBbGwgRGF5XCIsIFwiYWxsIGRheS9EQVlcIiwgW1wiY2hlY2tpbi1kYXlcIl0pLFxuICAgICAgICBuZXcgQ2hlY2tpblZhbHVlKFwiYW1cIiwgXCJIYWxmIEFNXCIsIFwibW9ybmluZy9BTVwiLCBbXCJjaGVja2luLWFtXCJdKSxcbiAgICAgICAgbmV3IENoZWNraW5WYWx1ZShcInBtXCIsIFwiSGFsZiBQTVwiLCBcImFmdGVybm9vbi9QTVwiLCBbXCJjaGVja2luLXBtXCJdKSxcbiAgICAgICAgbmV3IENoZWNraW5WYWx1ZShcIm91dFwiLCBcIkNoZWNrZWQgT3V0XCIsIFwiY2hlY2sgb3V0L09VVFwiLCBbXCJjaGVja291dFwiLCBcImNoZWNrLW91dFwiXSksXG4gICAgXSxcbn07XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgcGF0cm9sbGVyIHJvd3MuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBQYXRyb2xsZXJSb3dDb25maWdcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBOQU1FX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIG5hbWVzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IENBVEVHT1JZX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIGNhdGVnb3JpZXMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0VDVElPTl9EUk9QRE9XTl9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBzZWN0aW9uIGRyb3Bkb3duLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IENIRUNLSU5fRFJPUERPV05fQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgY2hlY2staW4gZHJvcGRvd24uXG4gKi9cbnR5cGUgUGF0cm9sbGVyUm93Q29uZmlnID0ge1xuICAgIE5BTUVfQ09MVU1OOiBzdHJpbmc7XG4gICAgQ0FURUdPUllfQ09MVU1OOiBzdHJpbmc7XG4gICAgU0VDVElPTl9EUk9QRE9XTl9DT0xVTU46IHN0cmluZztcbiAgICBDSEVDS0lOX0RST1BET1dOX0NPTFVNTjogc3RyaW5nO1xufTtcblxuLyoqXG4gKiBDb21iaW5lZCBjb25maWd1cmF0aW9uIHR5cGUuXG4gKiBAdHlwZWRlZiB7SGFuZGxlckVudmlyb25tZW50ICYgVXNlckNyZWRzQ29uZmlnICYgRmluZFBhdHJvbGxlckNvbmZpZyAmIExvZ2luU2hlZXRDb25maWcgJiBTZWFzb25TaGVldENvbmZpZyAmIFNlY3Rpb25Db25maWcgJiBHdWVzdFBhc3Nlc0NvbmZpZyAmIEhhbmRsZXJDb25maWcgJiBQYXRyb2xsZXJSb3dDb25maWd9IENvbWJpbmVkQ29uZmlnXG4gKi9cbnR5cGUgQ29tYmluZWRDb25maWcgPSBIYW5kbGVyRW52aXJvbm1lbnQgJlxuICAgIFVzZXJDcmVkc0NvbmZpZyAmXG4gICAgRmluZFBhdHJvbGxlckNvbmZpZyAmXG4gICAgTG9naW5TaGVldENvbmZpZyAmXG4gICAgU2Vhc29uU2hlZXRDb25maWcgJlxuICAgIFNlY3Rpb25Db25maWcgJlxuICAgIEd1ZXN0UGFzc2VzQ29uZmlnICZcbiAgICBTbGVkQmVhY29uQ29uZmlnICZcbiAgICBIYW5kbGVyQ29uZmlnICZcbiAgICBQYXRyb2xsZXJSb3dDb25maWc7XG5cbmNvbnN0IENPTkZJRzogQ29tYmluZWRDb25maWcgPSB7XG4gICAgLi4uaGFuZGxlcl9jb25maWcsXG4gICAgLi4uZmluZF9wYXRyb2xsZXJfY29uZmlnLFxuICAgIC4uLmxvZ2luX3NoZWV0X2NvbmZpZyxcbiAgICAuLi5ndWVzdF9wYXNzZXNfY29uZmlnLFxuICAgIC4uLnNsZWRfYmVhY29uX3NoZWV0X2NvbmZpZyxcbiAgICAuLi5zZWFzb25fc2hlZXRfY29uZmlnLFxuICAgIC4uLnVzZXJfY3JlZHNfY29uZmlnLFxuICAgIC4uLnNlY3Rpb25fY29uZmlnLFxufTtcblxuZXhwb3J0IHtcbiAgICBDT05GSUcsXG4gICAgQ29tYmluZWRDb25maWcsXG4gICAgU2VjdGlvbkNvbmZpZyxcbiAgICBHdWVzdFBhc3Nlc0NvbmZpZyxcbiAgICBTbGVkQmVhY29uQ29uZmlnLFxuICAgIEZpbmRQYXRyb2xsZXJDb25maWcsXG4gICAgSGFuZGxlckNvbmZpZyxcbiAgICBIYW5kbGVyRW52aXJvbm1lbnQsXG4gICAgVXNlckNyZWRzQ29uZmlnLFxuICAgIExvZ2luU2hlZXRDb25maWcsXG4gICAgU2Vhc29uU2hlZXRDb25maWcsXG4gICAgUGF0cm9sbGVyUm93Q29uZmlnLFxufTsiLCJpbXBvcnQgXCJAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzXCI7XG5pbXBvcnQge1xuICAgIENvbnRleHQsXG4gICAgU2VydmVybGVzc0V2ZW50T2JqZWN0LFxuICAgIFNlcnZpY2VDb250ZXh0LFxuICAgIFR3aWxpb0NsaWVudCxcbn0gZnJvbSBcIkB0d2lsaW8tbGFicy9zZXJ2ZXJsZXNzLXJ1bnRpbWUtdHlwZXMvdHlwZXNcIjtcbmltcG9ydCB7Z29vZ2xlLCBzY3JpcHRfdjEsIHNoZWV0c192NH0gZnJvbSBcImdvb2dsZWFwaXNcIjtcbmltcG9ydCB7R29vZ2xlQXV0aH0gZnJvbSBcImdvb2dsZWFwaXMtY29tbW9uXCI7XG5pbXBvcnQge1xuICAgIENvbWJpbmVkQ29uZmlnLFxuICAgIENPTkZJRyxcbiAgICBGaW5kUGF0cm9sbGVyQ29uZmlnLFxuICAgIEd1ZXN0UGFzc2VzQ29uZmlnLFxuICAgIEhhbmRsZXJDb25maWcsXG4gICAgSGFuZGxlckVudmlyb25tZW50LFxuICAgIExvZ2luU2hlZXRDb25maWcsXG4gICAgU2Vhc29uU2hlZXRDb25maWcsIFNsZWRCZWFjb25Db25maWcsXG59IGZyb20gXCIuLi9lbnYvaGFuZGxlcl9jb25maWdcIjtcbmltcG9ydCBMb2dpblNoZWV0LCB7UGF0cm9sbGVyUm93fSBmcm9tIFwiLi4vc2hlZXRzL2xvZ2luX3NoZWV0XCI7XG5pbXBvcnQgU2Vhc29uU2hlZXQgZnJvbSBcIi4uL3NoZWV0cy9zZWFzb25fc2hlZXRcIjtcbmltcG9ydCB7VXNlckNyZWRzfSBmcm9tIFwiLi4vdXNlci1jcmVkc1wiO1xuaW1wb3J0IHtDaGVja2luVmFsdWVzfSBmcm9tIFwiLi4vdXRpbHMvY2hlY2tpbl92YWx1ZXNcIjtcbmltcG9ydCB7Z2V0X3NlcnZpY2VfY3JlZGVudGlhbHNfcGF0aH0gZnJvbSBcIi4uL3V0aWxzL2ZpbGVfdXRpbHNcIjtcbmltcG9ydCB7ZXhjZWxfcm93X3RvX2luZGV4LCBmb3JtYXRfcGhvbmVfZm9yX2Rpc3BsYXksIHNhbml0aXplX3Bob25lX251bWJlcn0gZnJvbSBcIi4uL3V0aWxzL3V0aWxcIjtcbmltcG9ydCB7YnVpbGRfcGFzc2VzX3N0cmluZyx9IGZyb20gXCIuLi91dGlscy9ndWVzdF9wYXNzZXNcIjtcbmltcG9ydCB7R3Vlc3RQYXNzU2hlZXR9IGZyb20gXCIuLi9zaGVldHMvZ3Vlc3RfcGFzc19zaGVldFwiO1xuaW1wb3J0IHtTZWN0aW9uVmFsdWVzfSBmcm9tICcuLi91dGlscy9zZWN0aW9uX3ZhbHVlcyc7XG5pbXBvcnQge1NsZWRCZWFjb25DaGVja1NoZWV0fSBmcm9tIFwiLi4vc2hlZXRzL3NsZWRfYmVhY29uX2NoZWNrX3NoZWV0XCI7XG5cbmV4cG9ydCB0eXBlIEJWTlNQUmVzcG9uc2UgPSB7XG4gICAgcmVzcG9uc2U/OiBzdHJpbmc7XG4gICAgbmV4dF9zdGVwPzogc3RyaW5nO1xufTtcbmV4cG9ydCB0eXBlIEJWTlNQRXZlbnQgPSBTZXJ2ZXJsZXNzRXZlbnRPYmplY3Q8XG4gICAge1xuICAgICAgICBGcm9tOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgICAgIFRvOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgICAgIG51bWJlcjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgICB0ZXN0X251bWJlcjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgICBCb2R5OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgfSxcbiAgICB7fSxcbiAgICB7XG4gICAgICAgIGJ2bnNwX25leHRfc3RlcDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIH1cbj47XG5cbmV4cG9ydCBjb25zdCBORVhUX1NURVBTID0ge1xuICAgIEFXQUlUX0NPTU1BTkQ6IFwiYXdhaXQtY29tbWFuZFwiLFxuICAgIEFXQUlUX0NIRUNLSU46IFwiYXdhaXQtY2hlY2tpblwiLFxuICAgIENPTkZJUk1fUkVTRVQ6IFwiY29uZmlybS1yZXNldFwiLFxuICAgIEFVVEhfUkVTRVQ6IFwiYXV0aC1yZXNldFwiLFxuICAgIEFXQUlUX1NFQ1RJT046IFwiYXdhaXQtc2VjdGlvblwiLFxuICAgIEFXQUlUX1BBU1M6IFwiYXdhaXQtcGFzc1wiLFxuICAgIEFXQUlUX01FU1NBR0U6IFwiYXdhaXQtbWVzc2FnZVwiLFxuICAgIEFXQUlUX0JST0FEQ0FTVDogXCJhd2FpdC1icm9hZGNhc3RcIixcbiAgICBBV0FJVF9CRUFDT046XCJhd2FpdC1iZWFjb25cIixcbn07XG5cbmNvbnN0IENPTU1BTkRTID0ge1xuICAgIE9OX0RVVFk6IFtcIm9uZHV0eVwiLCBcIm9uLWR1dHlcIl0sXG4gICAgU1RBVFVTOiBbXCJzdGF0dXNcIl0sXG4gICAgQ0hFQ0tJTjogW1wiY2hlY2tpblwiLCBcImNoZWNrLWluXCJdLFxuICAgIFNFQ1RJT05fQVNTSUdOTUVOVDogW1wic2VjdGlvblwiLCBcInNlY3Rpb24tYXNzaWdubWVudFwiLCBcInNlY3Rpb25hc3NpZ25tZW50XCIsIFwiYXNzaWdubWVudFwiXSxcbiAgICBHVUVTVF9QQVNTOiBbXCJndWVzdC1wYXNzXCIsIFwiZ3Vlc3RwYXNzXCIsIFwiZ3Vlc3RcIl0sXG4gICAgV0hBVFNBUFA6IFtcIndoYXRzYXBwXCJdLFxuICAgIE1FU1NBR0U6IFtcIm1lc3NhZ2VcIiwgXCJtc2dcIl0sXG4gICAgQlJPQURDQVNUOiBbXCJicm9hZGNhc3RcIl0sXG4gICAgQkVBQ09OOiBbXCJiZWFjb25cIiwgXCJiZWFjb24tc2VhcmNoXCIsIFwiYmVhY29uLWZpbmRcIl0sXG59O1xuXG5leHBvcnQgY29uc3QgU01TX01BWF9MRU5HVEggPSAxNjA7XG5leHBvcnQgY29uc3QgTUVTU0FHRV9QUkVGSVhfVEVNUExBVEUgPSBcIk1lc3NhZ2UgZnJvbSBcIjtcbmV4cG9ydCBjb25zdCBNRVNTQUdFX1BSRUZJWF9TVUZGSVggPSBcIjogXCI7XG5cbi8qKlxuICogUmVzdWx0IG9mIHZhbGlkYXRpbmcgYW4gU01TIG1lc3NhZ2UgZm9yIEdTTS03IGNvbXBhdGliaWxpdHkgYW5kIHNlZ21lbnQgY291bnQuXG4gKi9cbmV4cG9ydCB0eXBlIFNtc1ZhbGlkYXRpb25SZXN1bHQgPSB7XG4gICAgLyoqIFdoZXRoZXIgdGhlIG1lc3NhZ2UgaXMgdmFsaWQgKEdTTS03IG9ubHkgYW5kIGZpdHMgaW4gYSBzaW5nbGUgc2VnbWVudCkuICovXG4gICAgdmFsaWQ6IGJvb2xlYW47XG4gICAgLyoqIElmIGludmFsaWQsIHRoZSByZWFzb246ICdub25fZ3NtNycgb3IgJ3Rvb19tYW55X3NlZ21lbnRzJy4gKi9cbiAgICByZWFzb24/OiBcIm5vbl9nc203XCIgfCBcInRvb19tYW55X3NlZ21lbnRzXCI7XG4gICAgLyoqIFRoZSBub24tR1NNLTcgY2hhcmFjdGVycyBmb3VuZCwgaWYgYW55LiAqL1xuICAgIG5vbl9nc21fY2hhcmFjdGVycz86IHN0cmluZ1tdO1xuICAgIC8qKiBUaGUgbnVtYmVyIG9mIFNNUyBzZWdtZW50cyB0aGUgbWVzc2FnZSB3b3VsZCByZXF1aXJlLiAqL1xuICAgIHNlZ21lbnRzX2NvdW50PzogbnVtYmVyO1xufTtcblxuLyoqXG4gKiBWYWxpZGF0ZXMgdGhhdCBhIGNvbXBsZXRlIFNNUyBtZXNzYWdlIChwcmVmaXggKyBib2R5KSB1c2VzIG9ubHkgR1NNLTcgY2hhcmFjdGVyc1xuICogYW5kIGZpdHMgd2l0aGluIGEgc2luZ2xlIFNNUyBzZWdtZW50LlxuICpcbiAqIFVzZXMgdGhlIHNtcy1zZWdtZW50cy1jYWxjdWxhdG9yIGxpYnJhcnkgKG1haW50YWluZWQgYnkgVHdpbGlvRGV2RWQpIHdoaWNoXG4gKiBwcm92aWRlcyBhdXRob3JpdGF0aXZlIEdTTS03IGNoYXJhY3RlciBkZXRlY3Rpb24uXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZ1bGxfbWVzc2FnZSAtIFRoZSBjb21wbGV0ZSBtZXNzYWdlIHRvIHZhbGlkYXRlIChwcmVmaXggKyB1c2VyIHRleHQpLlxuICogQHJldHVybnMge1Ntc1ZhbGlkYXRpb25SZXN1bHR9IFRoZSB2YWxpZGF0aW9uIHJlc3VsdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlX3Ntc19tZXNzYWdlKGZ1bGxfbWVzc2FnZTogc3RyaW5nKTogU21zVmFsaWRhdGlvblJlc3VsdCB7XG4gICAgY29uc3QgeyBTZWdtZW50ZWRNZXNzYWdlIH0gPSByZXF1aXJlKFwic21zLXNlZ21lbnRzLWNhbGN1bGF0b3JcIik7XG4gICAgY29uc3Qgc2VnbWVudGVkID0gbmV3IFNlZ21lbnRlZE1lc3NhZ2UoZnVsbF9tZXNzYWdlKTtcbiAgICBjb25zdCBub25fZ3NtID0gc2VnbWVudGVkLmdldE5vbkdzbUNoYXJhY3RlcnMoKSBhcyBzdHJpbmdbXTtcblxuICAgIGlmIChub25fZ3NtLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgICAgICAgIHJlYXNvbjogXCJub25fZ3NtN1wiLFxuICAgICAgICAgICAgbm9uX2dzbV9jaGFyYWN0ZXJzOiBbLi4ubmV3IFNldChub25fZ3NtKV0sXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKHNlZ21lbnRlZC5zZWdtZW50c0NvdW50ID4gMSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsaWQ6IGZhbHNlLFxuICAgICAgICAgICAgcmVhc29uOiBcInRvb19tYW55X3NlZ21lbnRzXCIsXG4gICAgICAgICAgICBzZWdtZW50c19jb3VudDogc2VnbWVudGVkLnNlZ21lbnRzQ291bnQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgdmFsaWQ6IHRydWUgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQlZOU1BIYW5kbGVyIHtcbiAgICBTQ09QRVM6IHN0cmluZ1tdID0gW1wiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9zcHJlYWRzaGVldHNcIl07XG5cbiAgICBzbXNfcmVxdWVzdDogYm9vbGVhbjtcbiAgICByZXN1bHRfbWVzc2FnZXM6IHN0cmluZ1tdID0gW107XG4gICAgZnJvbTogc3RyaW5nO1xuICAgIHRvOiBzdHJpbmc7XG4gICAgYm9keTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIGJvZHlfcmF3OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgcGF0cm9sbGVyOiBQYXRyb2xsZXJSb3cgfCBudWxsO1xuICAgIGJ2bnNwX25leHRfc3RlcDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIGNoZWNraW5fbW9kZTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gICAgZmFzdF9jaGVja2luOiBib29sZWFuID0gZmFsc2U7XG4gICAgYXNzaWduZWRfc2VjdGlvbjogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgICB0d2lsaW9fY2xpZW50OiBUd2lsaW9DbGllbnQgfCBudWxsID0gbnVsbDtcbiAgICBzeW5jX3NpZDogc3RyaW5nO1xuICAgIHJlc2V0X3NjcmlwdF9pZDogc3RyaW5nO1xuXG4gICAgLy8gQ2FjaGUgY2xpZW50c1xuICAgIHN5bmNfY2xpZW50OiBTZXJ2aWNlQ29udGV4dCB8IG51bGwgPSBudWxsO1xuICAgIHVzZXJfY3JlZHM6IFVzZXJDcmVkcyB8IG51bGwgPSBudWxsO1xuICAgIHNlcnZpY2VfY3JlZHM6IEdvb2dsZUF1dGggfCBudWxsID0gbnVsbDtcbiAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyB8IG51bGwgPSBudWxsO1xuICAgIHVzZXJfc2NyaXB0c19zZXJ2aWNlOiBzY3JpcHRfdjEuU2NyaXB0IHwgbnVsbCA9IG51bGw7XG5cbiAgICBsb2dpbl9zaGVldDogTG9naW5TaGVldCB8IG51bGwgPSBudWxsO1xuICAgIHNlYXNvbl9zaGVldDogU2Vhc29uU2hlZXQgfCBudWxsID0gbnVsbDtcbiAgICBndWVzdF9wYXNzX3NoZWV0OiBHdWVzdFBhc3NTaGVldCB8IG51bGwgPSBudWxsO1xuICAgIHNsZWRfYmVhY29uX2NoZWNrX3NoZWV0OiBTbGVkQmVhY29uQ2hlY2tTaGVldCB8IG51bGwgPSBudWxsO1xuXG4gICAgY2hlY2tpbl92YWx1ZXM6IENoZWNraW5WYWx1ZXM7XG4gICAgY3VycmVudF9zaGVldF9kYXRlOiBEYXRlO1xuXG4gICAgY29tYmluZWRfY29uZmlnOiBDb21iaW5lZENvbmZpZztcbiAgICBjb25maWc6IEhhbmRsZXJDb25maWc7XG5cbiAgICBzZWN0aW9uX3ZhbHVlczogU2VjdGlvblZhbHVlcztcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgYSBuZXcgQlZOU1BIYW5kbGVyLlxuICAgICAqIEBwYXJhbSB7Q29udGV4dDxIYW5kbGVyRW52aXJvbm1lbnQ+fSBjb250ZXh0IC0gVGhlIHNlcnZlcmxlc3MgZnVuY3Rpb24gY29udGV4dC5cbiAgICAgKiBAcGFyYW0ge1NlcnZlcmxlc3NFdmVudE9iamVjdDxCVk5TUEV2ZW50Pn0gZXZlbnQgLSBUaGUgZXZlbnQgb2JqZWN0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBjb250ZXh0OiBDb250ZXh0PEhhbmRsZXJFbnZpcm9ubWVudD4sXG4gICAgICAgIGV2ZW50OiBTZXJ2ZXJsZXNzRXZlbnRPYmplY3Q8QlZOU1BFdmVudD5cbiAgICApIHtcbiAgICAgICAgLy8gRGV0ZXJtaW5lIG1lc3NhZ2UgZGV0YWlscyBmcm9tIHRoZSBpbmNvbWluZyBldmVudCwgd2l0aCBmYWxsYmFjayB2YWx1ZXNcbiAgICAgICAgdGhpcy5zbXNfcmVxdWVzdCA9IChldmVudC5Gcm9tIHx8IGV2ZW50Lm51bWJlcikgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5mcm9tID0gZXZlbnQuRnJvbSB8fCBldmVudC5udW1iZXIgfHwgZXZlbnQudGVzdF9udW1iZXIhO1xuICAgICAgICB0aGlzLnRvID0gc2FuaXRpemVfcGhvbmVfbnVtYmVyKGV2ZW50LlRvISk7XG4gICAgICAgIHRoaXMuYm9keSA9IGV2ZW50LkJvZHk/LnRvTG93ZXJDYXNlKCk/LnRyaW0oKS5yZXBsYWNlKC9cXHMrLywgXCItXCIpO1xuICAgICAgICB0aGlzLmJvZHlfcmF3ID0gZXZlbnQuQm9keVxuICAgICAgICB0aGlzLmJ2bnNwX25leHRfc3RlcCA9XG4gICAgICAgICAgICBldmVudC5yZXF1ZXN0LmNvb2tpZXMuYnZuc3BfbmV4dF9zdGVwO1xuICAgICAgICB0aGlzLmNvbWJpbmVkX2NvbmZpZyA9IHsgLi4uQ09ORklHLCAuLi5jb250ZXh0IH07XG4gICAgICAgIHRoaXMuY29uZmlnID0gdGhpcy5jb21iaW5lZF9jb25maWc7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMudHdpbGlvX2NsaWVudCA9IGNvbnRleHQuZ2V0VHdpbGlvQ2xpZW50KCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgaW5pdGlhbGl6aW5nIHR3aWxpb19jbGllbnRcIiwgZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zeW5jX3NpZCA9IGNvbnRleHQuU1lOQ19TSUQ7XG4gICAgICAgIHRoaXMucmVzZXRfc2NyaXB0X2lkID0gY29udGV4dC5TQ1JJUFRfSUQ7XG4gICAgICAgIHRoaXMucGF0cm9sbGVyID0gbnVsbDtcblxuICAgICAgICB0aGlzLmNoZWNraW5fdmFsdWVzID0gbmV3IENoZWNraW5WYWx1ZXMoQ09ORklHLkNIRUNLSU5fVkFMVUVTKTtcbiAgICAgICAgdGhpcy5jdXJyZW50X3NoZWV0X2RhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB0aGlzLnNlY3Rpb25fdmFsdWVzID0gbmV3IFNlY3Rpb25WYWx1ZXModGhpcy5jb21iaW5lZF9jb25maWcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlcyB0aGUgZmFzdCBjaGVjay1pbiBtb2RlIGZyb20gdGhlIG1lc3NhZ2UgYm9keS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYm9keSAtIFRoZSBtZXNzYWdlIGJvZHkuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgZmFzdCBjaGVjay1pbiBtb2RlIGlzIHBhcnNlZCwgb3RoZXJ3aXNlIGZhbHNlLlxuICAgICAqL1xuICAgIHBhcnNlX2Zhc3RfY2hlY2tpbl9tb2RlKGJvZHk6IHN0cmluZykge1xuICAgICAgICBjb25zdCBwYXJzZWQgPSB0aGlzLmNoZWNraW5fdmFsdWVzLnBhcnNlX2Zhc3RfY2hlY2tpbihib2R5KTtcbiAgICAgICAgaWYgKHBhcnNlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNraW5fbW9kZSA9IHBhcnNlZC5rZXk7XG4gICAgICAgICAgICB0aGlzLmZhc3RfY2hlY2tpbiA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIHRoZSBjaGVjay1pbiBtb2RlIGZyb20gdGhlIG1lc3NhZ2UgYm9keS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYm9keSAtIFRoZSBtZXNzYWdlIGJvZHkuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgY2hlY2staW4gbW9kZSBpcyBwYXJzZWQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKi9cbiAgICBwYXJzZV9jaGVja2luKGJvZHk6IHN0cmluZykge1xuICAgICAgICBjb25zdCBwYXJzZWQgPSB0aGlzLmNoZWNraW5fdmFsdWVzLnBhcnNlX2NoZWNraW4oYm9keSk7XG4gICAgICAgIGlmIChwYXJzZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5jaGVja2luX21vZGUgPSBwYXJzZWQua2V5O1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlcyB0aGUgY2hlY2staW4gbW9kZSBmcm9tIHRoZSBuZXh0IHN0ZXAuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgY2hlY2staW4gbW9kZSBpcyBwYXJzZWQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKi9cbiAgICBwYXJzZV9jaGVja2luX2Zyb21fbmV4dF9zdGVwKCkge1xuICAgICAgICBjb25zdCBsYXN0X3NlZ21lbnQgPSB0aGlzLmJ2bnNwX25leHRfc3RlcFxuICAgICAgICAgICAgPy5zcGxpdChcIi1cIilcbiAgICAgICAgICAgIC5zbGljZSgtMSlbMF07XG4gICAgICAgIGlmIChsYXN0X3NlZ21lbnQgJiYgbGFzdF9zZWdtZW50IGluIHRoaXMuY2hlY2tpbl92YWx1ZXMuYnlfa2V5KSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNraW5fbW9kZSA9IGxhc3Rfc2VnbWVudDtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWxheXMgdGhlIGV4ZWN1dGlvbiBmb3IgYSBzcGVjaWZpZWQgbnVtYmVyIG9mIHNlY29uZHMuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlY29uZHMgLSBUaGUgbnVtYmVyIG9mIHNlY29uZHMgdG8gZGVsYXkuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9uYWw9ZmFsc2VdIC0gV2hldGhlciB0aGUgZGVsYXkgaXMgb3B0aW9uYWwuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIGFmdGVyIHRoZSBkZWxheS5cbiAgICAgKi9cbiAgICBkZWxheShzZWNvbmRzOiBudW1iZXIsIG9wdGlvbmFsOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKG9wdGlvbmFsICYmICF0aGlzLnNtc19yZXF1ZXN0KSB7XG4gICAgICAgICAgICBzZWNvbmRzID0gMSAvIDEwMDAuMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcykgPT4ge1xuICAgICAgICAgICAgc2V0VGltZW91dChyZXMsIHNlY29uZHMgKiAxMDAwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VuZHMgYSBtZXNzYWdlIHRvIHRoZSB1c2VyLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gVGhlIG1lc3NhZ2UgdG8gc2VuZC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgbWVzc2FnZSBpcyBzZW50LlxuICAgICAqL1xuICAgIGFzeW5jIHNlbmRfbWVzc2FnZShtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMuc21zX3JlcXVlc3QpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0X3R3aWxpb19jbGllbnQoKS5tZXNzYWdlcy5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIHRvOiB0aGlzLmZyb20sXG4gICAgICAgICAgICAgICAgZnJvbTogdGhpcy50byxcbiAgICAgICAgICAgICAgICBib2R5OiBtZXNzYWdlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlc3VsdF9tZXNzYWdlcy5wdXNoKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlcyB0aGUgY2hlY2staW4gcHJvY2Vzcy5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgY2hlY2staW4gcmVzcG9uc2UuXG4gICAgICovXG4gICAgYXN5bmMgaGFuZGxlKCk6IFByb21pc2U8QlZOU1BSZXNwb25zZT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLl9oYW5kbGUoKTtcbiAgICAgICAgaWYgKCF0aGlzLnNtc19yZXF1ZXN0KSB7XG4gICAgICAgICAgICBpZiAocmVzdWx0Py5yZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0X21lc3NhZ2VzLnB1c2gocmVzdWx0LnJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IHRoaXMucmVzdWx0X21lc3NhZ2VzLmpvaW4oXCJcXG4jIyNcXG5cIiksXG4gICAgICAgICAgICAgICAgbmV4dF9zdGVwOiByZXN1bHQ/Lm5leHRfc3RlcCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbnRlcm5hbCBtZXRob2QgdG8gaGFuZGxlIHRoZSBjaGVjay1pbiBwcm9jZXNzLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBjaGVjay1pbiByZXNwb25zZS5cbiAgICAgKi9cbiAgICBhc3luYyBfaGFuZGxlKCk6IFByb21pc2U8QlZOU1BSZXNwb25zZT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgIGBSZWNlaXZlZCByZXF1ZXN0IGZyb20gJHt0aGlzLmZyb219IHdpdGggYm9keTogJHt0aGlzLmJvZHl9IGFuZCBzdGF0ZSAke3RoaXMuYnZuc3BfbmV4dF9zdGVwfWBcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHRoaXMuYm9keSA9PSBcImxvZ291dFwiKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBsb2dvdXRgKTtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmxvZ291dCgpO1xuICAgICAgICB9XG4gICAgICAgIGxldCByZXNwb25zZTogQlZOU1BSZXNwb25zZSB8IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKCF0aGlzLmNvbmZpZy5VU0VfU0VSVklDRV9BQ0NPVU5UKSB7XG4gICAgICAgICAgICByZXNwb25zZSA9IGF3YWl0IHRoaXMuY2hlY2tfdXNlcl9jcmVkcygpO1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlKSByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYm9keT8udG9Mb3dlckNhc2UoKSA9PT0gXCJyZXN0YXJ0XCIpIHtcbiAgICAgICAgICAgIHJldHVybiB7cmVzcG9uc2U6IFwiT2theS4gVGV4dCBtZSBhZ2FpbiB0byBzdGFydCBvdmVyLi4uXCJ9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmdldF9tYXBwZWRfcGF0cm9sbGVyKCk7XG4gICAgICAgIGlmIChyZXNwb25zZSB8fCB0aGlzLnBhdHJvbGxlciA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIHJlc3BvbnNlIHx8IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2U6IFwiVW5leHBlY3RlZCBlcnJvciBsb29raW5nIHVwIHBhdHJvbGxlciBtYXBwaW5nXCIsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgICghdGhpcy5idm5zcF9uZXh0X3N0ZXAgfHxcbiAgICAgICAgICAgICAgICB0aGlzLmJ2bnNwX25leHRfc3RlcCA9PSBORVhUX1NURVBTLkFXQUlUX0NPTU1BTkQpICYmXG4gICAgICAgICAgICB0aGlzLmJvZHlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zdCBhd2FpdF9yZXNwb25zZSA9IGF3YWl0IHRoaXMuaGFuZGxlX2F3YWl0X2NvbW1hbmQoKTtcbiAgICAgICAgICAgIGlmIChhd2FpdF9yZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdF9yZXNwb25zZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHRoaXMuYnZuc3BfbmV4dF9zdGVwID09IE5FWFRfU1RFUFMuQVdBSVRfQ0hFQ0tJTiAmJlxuICAgICAgICAgICAgdGhpcy5ib2R5XG4gICAgICAgICkge1xuICAgICAgICAgICAgaWYgKHRoaXMucGFyc2VfY2hlY2tpbih0aGlzLmJvZHkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuY2hlY2tpbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgdGhpcy5idm5zcF9uZXh0X3N0ZXA/LnN0YXJ0c1dpdGgoXG4gICAgICAgICAgICAgICAgTkVYVF9TVEVQUy5DT05GSVJNX1JFU0VUXG4gICAgICAgICAgICApICYmXG4gICAgICAgICAgICB0aGlzLmJvZHlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5ib2R5ID09IFwieWVzXCIgJiYgdGhpcy5wYXJzZV9jaGVja2luX2Zyb21fbmV4dF9zdGVwKCkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICAgICAgYFBlcmZvcm1pbmcgcmVzZXRfc2hlZXRfZmxvdyBmb3IgJHt0aGlzLnBhdHJvbGxlci5uYW1lfSB3aXRoIGNoZWNraW4gbW9kZTogJHt0aGlzLmNoZWNraW5fbW9kZX1gXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAoYXdhaXQgdGhpcy5yZXNldF9zaGVldF9mbG93KCkpIHx8IChhd2FpdCB0aGlzLmNoZWNraW4oKSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgdGhpcy5idm5zcF9uZXh0X3N0ZXA/LnN0YXJ0c1dpdGgoTkVYVF9TVEVQUy5BVVRIX1JFU0VUKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcnNlX2NoZWNraW5fZnJvbV9uZXh0X3N0ZXAoKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgICAgICBgUGVyZm9ybWluZyByZXNldF9zaGVldF9mbG93LXBvc3QtYXV0aCBmb3IgJHt0aGlzLnBhdHJvbGxlci5uYW1lfSB3aXRoIGNoZWNraW4gbW9kZTogJHt0aGlzLmNoZWNraW5fbW9kZX1gXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAoYXdhaXQgdGhpcy5yZXNldF9zaGVldF9mbG93KCkpIHx8IChhd2FpdCB0aGlzLmNoZWNraW4oKSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgdGhpcy5idm5zcF9uZXh0X3N0ZXA/LnN0YXJ0c1dpdGgoTkVYVF9TVEVQUy5BV0FJVF9TRUNUSU9OKSAmJlxuICAgICAgICAgICAgdGhpcy5ib2R5XG4gICAgICAgICkge1xuICAgICAgICAgICAgY29uc3Qgc2VjdGlvbiA9IHRoaXMuc2VjdGlvbl92YWx1ZXMucGFyc2Vfc2VjdGlvbih0aGlzLmJvZHkpXG4gICAgICAgICAgICBpZiAoc2VjdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmFzc2lnbl9zZWN0aW9uKHNlY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucHJvbXB0X3NlY3Rpb25fYXNzaWdubWVudCgpO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgdGhpcy5idm5zcF9uZXh0X3N0ZXAgPT09IE5FWFRfU1RFUFMuQVdBSVRfTUVTU0FHRSAmJlxuICAgICAgICAgICAgdGhpcy5ib2R5X3Jhd1xuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnNlbmRfdGV4dF9tZXNzYWdlKHRoaXMuYm9keV9yYXcpO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgdGhpcy5idm5zcF9uZXh0X3N0ZXAgPT09IE5FWFRfU1RFUFMuQVdBSVRfQlJPQURDQVNUICYmXG4gICAgICAgICAgICB0aGlzLmJvZHlfcmF3XG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuc2VuZF9icm9hZGNhc3RfbWVzc2FnZSh0aGlzLmJvZHlfcmF3KTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHRoaXMuYnZuc3BfbmV4dF9zdGVwPy5zdGFydHNXaXRoKE5FWFRfU1RFUFMuQVdBSVRfQkVBQ09OKSAmJlxuICAgICAgICAgICAgdGhpcy5ib2R5XG4gICAgICAgICkge1xuICAgICAgICAgICAgY29uc3QgYmVhY29uX3NlYXJjaF9sb2NhdGlvbiA9IGF3YWl0IHRoaXMucGFyc2VfYmVhY29uX3NlYXJjaF9sb2NhdGlvbih0aGlzLmJvZHkpXG4gICAgICAgICAgICBpZiAoYmVhY29uX3NlYXJjaF9sb2NhdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnNldF9iZWFjb25fc2VhcmNoKGJlYWNvbl9zZWFyY2hfbG9jYXRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucHJvbXB0X2JlYWNvbl9zZWFyY2goKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmJ2bnNwX25leHRfc3RlcCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5zZW5kX21lc3NhZ2UoXCJTb3JyeSwgSSBkaWRuJ3QgdW5kZXJzdGFuZCB0aGF0LlwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wcm9tcHRfY29tbWFuZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgdGhlIGF3YWl0IGNvbW1hbmQgc3RlcC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlIHwgdW5kZWZpbmVkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcmVzcG9uc2Ugb3IgdW5kZWZpbmVkLlxuICAgICAqL1xuICAgIGFzeW5jIGhhbmRsZV9hd2FpdF9jb21tYW5kKCk6IFByb21pc2U8QlZOU1BSZXNwb25zZSB8IHVuZGVmaW5lZD4ge1xuICAgICAgICBjb25zdCBwYXRyb2xsZXJfbmFtZSA9IHRoaXMucGF0cm9sbGVyIS5uYW1lO1xuICAgICAgICBpZiAodGhpcy5wYXJzZV9mYXN0X2NoZWNraW5fbW9kZSh0aGlzLmJvZHkhKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgYFBlcmZvcm1pbmcgZmFzdCBjaGVja2luIGZvciAke3BhdHJvbGxlcl9uYW1lfSB3aXRoIG1vZGU6ICR7dGhpcy5jaGVja2luX21vZGV9YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmNoZWNraW4oKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQ09NTUFORFMuT05fRFVUWS5pbmNsdWRlcyh0aGlzLmJvZHkhKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmZvcm1pbmcgZ2V0X29uX2R1dHkgZm9yICR7cGF0cm9sbGVyX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4geyByZXNwb25zZTogYXdhaXQgdGhpcy5nZXRfb25fZHV0eSgpIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJDaGVja2luZyBmb3Igc3RhdHVzLi4uXCIpO1xuICAgICAgICBpZiAoQ09NTUFORFMuU1RBVFVTLmluY2x1ZGVzKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBnZXRfc3RhdHVzIGZvciAke3BhdHJvbGxlcl9uYW1lfWApO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X3N0YXR1cygpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDT01NQU5EUy5DSEVDS0lOLmluY2x1ZGVzKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBwcm9tcHRfY2hlY2tpbiBmb3IgJHtwYXRyb2xsZXJfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb21wdF9jaGVja2luKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKENPTU1BTkRTLkdVRVNUX1BBU1MuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIHByb21wdF9ndWVzdF9wYXNzIGZvciAke3BhdHJvbGxlcl9uYW1lfWApO1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucHJvbXB0X2d1ZXN0X3Bhc3MoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQ09NTUFORFMuQkVBQ09OLmluY2x1ZGVzKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBwcm9tcHRfYmVhY29uIGZvciAke3BhdHJvbGxlcl9uYW1lfWApO1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucHJvbXB0X2JlYWNvbl9zZWFyY2goKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wYXJzZV9mYXN0X3NlY3Rpb25fYXNzaWdubWVudCh0aGlzLmJvZHkhKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmZvcm1pbmcgZmFzdCBzZWN0aW9uX2Fzc2lnbm1lbnQgZm9yICR7cGF0cm9sbGVyX25hbWV9IHRvICR7dGhpcy5hc3NpZ25lZF9zZWN0aW9ufWApO1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuYXNzaWduX3NlY3Rpb24odGhpcy5hc3NpZ25lZF9zZWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQ09NTUFORFMuU0VDVElPTl9BU1NJR05NRU5ULmluY2x1ZGVzKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBzZWN0aW9uX2Fzc2lnbm1lbnQgZm9yICR7cGF0cm9sbGVyX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5wcm9tcHRfc2VjdGlvbl9hc3NpZ25tZW50KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKENPTU1BTkRTLldIQVRTQVBQLmluY2x1ZGVzKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgSSdtIGF2YWlsYWJsZSBvbiBXaGF0c0FwcCBhcyB3ZWxsISBXaGF0c0FwcCB1c2VzIFdpZmkvQ2VsbCBEYXRhIGluc3RlYWQgb2YgU01TLCBhbmQgY2FuIGJlIG1vcmUgcmVsaWFibGUuIE1lc3NhZ2UgbWUgYXQgaHR0cHM6Ly93YS5tZS8xJHt0aGlzLnRvfWAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChDT01NQU5EUy5NRVNTQUdFLmluY2x1ZGVzKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBtZXNzYWdlIGZvciAke3BhdHJvbGxlcl9uYW1lfWApO1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucHJvbXB0X21lc3NhZ2UoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQ09NTUFORFMuQlJPQURDQVNULmluY2x1ZGVzKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBicm9hZGNhc3QgZm9yICR7cGF0cm9sbGVyX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5wcm9tcHRfYnJvYWRjYXN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm9tcHRzIHRoZSB1c2VyIGZvciBhIGNvbW1hbmQuXG4gICAgICogQHJldHVybnMge0JWTlNQUmVzcG9uc2V9IFRoZSByZXNwb25zZSBwcm9tcHRpbmcgdGhlIHVzZXIgZm9yIGEgY29tbWFuZC5cbiAgICAgKi9cbiAgICBwcm9tcHRfY29tbWFuZCgpOiBCVk5TUFJlc3BvbnNlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3BvbnNlOiBgJHt0aGlzLnBhdHJvbGxlciEubmFtZX0sIEknbSB0aGUgQlZOU1AgQm90LlxuRW50ZXIgYSBjb21tYW5kOlxuQ2hlY2sgaW4gLyBDaGVjayBvdXQgLyBTdGF0dXMgLyBPbiBEdXR5IC8gU2VjdGlvbiBBc3NpZ25tZW50IC8gR3Vlc3QgUGFzcyAvIE1lc3NhZ2UgLyBXaGF0c0FwcFxuU2VuZCAncmVzdGFydCcgYXQgYW55IHRpbWUgdG8gYmVnaW4gYWdhaW5gLFxuICAgICAgICAgICAgbmV4dF9zdGVwOiBORVhUX1NURVBTLkFXQUlUX0NPTU1BTkQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvbXB0cyB0aGUgdXNlciBmb3IgYSBjaGVjay1pbi5cbiAgICAgKiBAcmV0dXJucyB7QlZOU1BSZXNwb25zZX0gVGhlIHJlc3BvbnNlIHByb21wdGluZyB0aGUgdXNlciBmb3IgYSBjaGVjay1pbi5cbiAgICAgKi9cbiAgICBwcm9tcHRfY2hlY2tpbigpOiBCVk5TUFJlc3BvbnNlIHtcbiAgICAgICAgY29uc3QgdHlwZXMgPSBPYmplY3QudmFsdWVzKHRoaXMuY2hlY2tpbl92YWx1ZXMuYnlfa2V5KS5tYXAoXG4gICAgICAgICAgICAoeCkgPT4geC5zbXNfZGVzY1xuICAgICAgICApO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IGAke1xuICAgICAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyIS5uYW1lXG4gICAgICAgICAgICB9LCB1cGRhdGUgcGF0cm9sbGluZyBzdGF0dXMgdG86ICR7dHlwZXNcbiAgICAgICAgICAgICAgICAuc2xpY2UoMCwgLTEpXG4gICAgICAgICAgICAgICAgLmpvaW4oXCIsIFwiKX0sIG9yICR7dHlwZXMuc2xpY2UoLTEpfT9gLFxuICAgICAgICAgICAgbmV4dF9zdGVwOiBORVhUX1NURVBTLkFXQUlUX0NIRUNLSU4sXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBQYXJzZXMgdGhlIGZhc3Qgc2VjdGlvbiBhc3NpZ25tZW50IGZyb20gdGhlIG1lc3NhZ2UgYm9keS5cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5IC0gVGhlIG1lc3NhZ2UgYm9keS5cbiAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzZWN0aW9uIGFzc2lnbm1lbnQgaXMgcGFyc2VkLCBvdGhlcndpc2UgZmFsc2UuXG4gICAgKi9cbiAgICBwYXJzZV9mYXN0X3NlY3Rpb25fYXNzaWdubWVudChib2R5OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICB0aGlzLmFzc2lnbmVkX3NlY3Rpb24gPSBudWxsO1xuICAgIGlmICghYm9keSB8fCAhYm9keS5pbmNsdWRlcyhcIi1cIikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBzZWdtZW50cyA9IGJvZHkuc3BsaXQoXCItXCIpO1xuICAgIGNvbnN0IGxhc3RTZWdtZW50ID0gc2VnbWVudHMucG9wKCk7XG4gICAgY29uc3QgZmlyc3RQYXJ0ID0gc2VnbWVudHMuam9pbihcIi1cIikudG9Mb3dlckNhc2UoKTtcblxuICAgIGlmIChsYXN0U2VnbWVudCAmJiBDT01NQU5EUy5TRUNUSU9OX0FTU0lHTk1FTlQuaW5jbHVkZXMoZmlyc3RQYXJ0KSkge1xuICAgICAgICB0aGlzLmFzc2lnbmVkX3NlY3Rpb24gPSB0aGlzLnNlY3Rpb25fdmFsdWVzLm1hcF9zZWN0aW9uKGxhc3RTZWdtZW50LnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICByZXR1cm4gdGhpcy5hc3NpZ25lZF9zZWN0aW9uICE9PSBudWxsICYmIHRoaXMuYXNzaWduZWRfc2VjdGlvbiAhPT0gXCJcIjtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb21wdHMgdGhlIHVzZXIgZm9yIHNlY3Rpb24gYXNzaWdubWVudC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcmVzcG9uc2UuXG4gICAgICovXG4gICAgYXN5bmMgcHJvbXB0X3NlY3Rpb25fYXNzaWdubWVudCgpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgaWYgKCF0aGlzLnBhdHJvbGxlciB8fCAhdGhpcy5wYXRyb2xsZXIuY2hlY2tpbikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYCR7dGhpcy5wYXRyb2xsZXIhLm5hbWV9IGlzIG5vdCBjaGVja2VkIGluLmAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNlY3Rpb25fZGVzY3JpcHRpb24gPSB0aGlzLnNlY3Rpb25fdmFsdWVzLmdldF9zZWN0aW9uX2Rlc2NyaXB0aW9uKCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZTogYEVudGVyIHlvdXIgYXNzaWduZWQgc2VjdGlvbjsgb25lIG9mICR7c2VjdGlvbl9kZXNjcmlwdGlvbn0gKG9yICdyZXN0YXJ0JylgLFxuICAgICAgICAgICAgbmV4dF9zdGVwOiBORVhUX1NURVBTLkFXQUlUX1NFQ1RJT04sXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQnVpbGRzIHRoZSBtZXNzYWdlIHByZWZpeCBmb3IgYSB0ZXh0IG1lc3NhZ2UgZnJvbSBhIHBhdHJvbGxlci5cbiAgICAgKiBJbmNsdWRlcyB0aGUgc2VuZGVyJ3MgbmFtZSBhbmQgZm9ybWF0dGVkIHBob25lIG51bWJlci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VuZGVyX25hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcGF0cm9sbGVyIHNlbmRpbmcgdGhlIG1lc3NhZ2UuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbmRlcl9waG9uZSAtIFRoZSBzZW5kZXIncyAxMC1kaWdpdCBwaG9uZSBudW1iZXIuXG4gICAgICogQHJldHVybnMge3N0cmluZ30gVGhlIG1lc3NhZ2UgcHJlZml4LiBmb3IgZXhhbXBsZSA6IFwiTWVzc2FnZSBmcm9tIEpvaG4gRG9lICgxMjMpNDU2LTc4OTBcIi5cbiAgICAgKi9cbiAgICBnZXRfbWVzc2FnZV9wcmVmaXgoc2VuZGVyX25hbWU6IHN0cmluZywgc2VuZGVyX3Bob25lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBmb3JtYXR0ZWRfcGhvbmUgPSBmb3JtYXRfcGhvbmVfZm9yX2Rpc3BsYXkoc2VuZGVyX3Bob25lKTtcbiAgICAgICAgcmV0dXJuIGAke01FU1NBR0VfUFJFRklYX1RFTVBMQVRFfSR7c2VuZGVyX25hbWV9ICR7Zm9ybWF0dGVkX3Bob25lfSR7TUVTU0FHRV9QUkVGSVhfU1VGRklYfWA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlcyB0aGUgbWF4aW11bSBhbGxvd2VkIG1lc3NhZ2UgbGVuZ3RoIGZvciBhIHRleHQgbWVzc2FnZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VuZGVyX25hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcGF0cm9sbGVyIHNlbmRpbmcgdGhlIG1lc3NhZ2UuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbmRlcl9waG9uZSAtIFRoZSBzZW5kZXIncyAxMC1kaWdpdCBwaG9uZSBudW1iZXIuXG4gICAgICogQHJldHVybnMge251bWJlcn0gVGhlIG1heGltdW0gbnVtYmVyIG9mIGNoYXJhY3RlcnMgdGhlIHVzZXIncyBtZXNzYWdlIGNhbiBjb250YWluLlxuICAgICAqL1xuICAgIGdldF9tYXhfbWVzc2FnZV9sZW5ndGgoc2VuZGVyX25hbWU6IHN0cmluZywgc2VuZGVyX3Bob25lOiBzdHJpbmcpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gU01TX01BWF9MRU5HVEggLSB0aGlzLmdldF9tZXNzYWdlX3ByZWZpeChzZW5kZXJfbmFtZSwgc2VuZGVyX3Bob25lKS5sZW5ndGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvbXB0cyB0aGUgdXNlciB0byB0eXBlIHRoZWlyIHRleHQgbWVzc2FnZS5cbiAgICAgKiBBbnkgcGF0cm9sbGVyIHdpdGggYSB2YWxpZCBwaG9uZSBudW1iZXIgY2FuIHNlbmQgYSBtZXNzYWdlLCByZWdhcmRsZXNzXG4gICAgICogb2YgdGhlaXIgb3duIGNoZWNrLWluIHN0YXR1cy4gIFRoZSByZWNpcGllbnQgbGlzdCBpbmNsdWRlcyBhbGxcbiAgICAgKiBwYXRyb2xsZXJzIHdobyBoYXZlIGFueSBjaGVjay1pbiBzdGF0dXMgKEFsbCBEYXksIEhhbGYgQU0sIEhhbGYgUE0sXG4gICAgICogb3IgQ2hlY2tlZCBPdXQpLCBpbmNsdWRpbmcgdGhlIHNlbmRlciB0aGVtc2VsdmVzIGlmIHRoZXkgYXJlIGNoZWNrZWQgaW4uXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHByb21wdCByZXNwb25zZS5cbiAgICAgKi9cbiAgICBhc3luYyBwcm9tcHRfbWVzc2FnZSgpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuICAgICAgICBjb25zdCByZWNpcGllbnRzID0gbG9naW5fc2hlZXQuZ2V0X29uX2R1dHlfcGF0cm9sbGVycygpO1xuICAgICAgICBpZiAocmVjaXBpZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBObyBwYXRyb2xsZXJzIGFyZSBjdXJyZW50bHkgbG9nZ2VkIGluLiBUaGVyZSBpcyBub2JvZHkgdG8gc2VuZCBhIG1lc3NhZ2UgdG8uYCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2VuZGVyX3Bob25lID0gc2FuaXRpemVfcGhvbmVfbnVtYmVyKHRoaXMuZnJvbSk7XG4gICAgICAgIGNvbnN0IG1heF9sZW5ndGggPSB0aGlzLmdldF9tYXhfbWVzc2FnZV9sZW5ndGgodGhpcy5wYXRyb2xsZXIhLm5hbWUsIHNlbmRlcl9waG9uZSk7XG4gICAgICAgIGlmIChtYXhfbGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBZb3VyIG5hbWUgaXMgdG9vIGxvbmcgdG8gc2VuZCBhIHRleHQgbWVzc2FnZS5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IGBQbGVhc2UgdHlwZSBhIG1lc3NhZ2Ugb2Ygbm8gbW9yZSB0aGFuICR7bWF4X2xlbmd0aH0gcGxhaW4tdGV4dCBjaGFyYWN0ZXJzIHRvICR7cmVjaXBpZW50cy5sZW5ndGh9IHBhdHJvbGxlciR7cmVjaXBpZW50cy5sZW5ndGggIT09IDEgPyBcInNcIiA6IFwiXCJ9LCBvciAncmVzdGFydCcgdG8gY2FuY2VsLmAsXG4gICAgICAgICAgICBuZXh0X3N0ZXA6IE5FWFRfU1RFUFMuQVdBSVRfTUVTU0FHRSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kcyBhIHRleHQgbWVzc2FnZSB0byBhbGwgcGF0cm9sbGVycyB3aXRoIGEgY2hlY2staW4gc3RhdHVzIGZvciB0aGUgZGF5LlxuICAgICAqIFRoZSBzZW5kZXIgYWxzbyByZWNlaXZlcyB0aGUgbWVzc2FnZSBpZiB0aGV5IGhhdmUgYSBjaGVjay1pbiBzdGF0dXMuXG4gICAgICogVmFsaWRhdGVzIHRoYXQgdGhlIGNvbXBsZXRlIG1lc3NhZ2UgKHByZWZpeCArIGJvZHkpIHVzZXMgb25seSBHU00tN1xuICAgICAqIGNoYXJhY3RlcnMgYW5kIGZpdHMgd2l0aGluIGEgc2luZ2xlIFNNUyBzZWdtZW50LCB1c2luZyB0aGVcbiAgICAgKiBzbXMtc2VnbWVudHMtY2FsY3VsYXRvciBsaWJyYXJ5LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlX3RleHQgLSBUaGUgcmF3IG1lc3NhZ2UgdGV4dCBmcm9tIHRoZSBzZW5kZXIuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHNlbmQgcmVzdWx0LlxuICAgICAqL1xuICAgIGFzeW5jIHNlbmRfdGV4dF9tZXNzYWdlKG1lc3NhZ2VfdGV4dDogc3RyaW5nKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnN0IHNlbmRlcl9uYW1lID0gdGhpcy5wYXRyb2xsZXIhLm5hbWU7XG4gICAgICAgIGNvbnN0IHNlbmRlcl9waG9uZSA9IHNhbml0aXplX3Bob25lX251bWJlcih0aGlzLmZyb20pO1xuICAgICAgICBjb25zdCBwcmVmaXggPSB0aGlzLmdldF9tZXNzYWdlX3ByZWZpeChzZW5kZXJfbmFtZSwgc2VuZGVyX3Bob25lKTtcbiAgICAgICAgY29uc3QgbWF4X2xlbmd0aCA9IHRoaXMuZ2V0X21heF9tZXNzYWdlX2xlbmd0aChzZW5kZXJfbmFtZSwgc2VuZGVyX3Bob25lKTtcbiAgICAgICAgY29uc3QgZnVsbF9tZXNzYWdlID0gcHJlZml4ICsgbWVzc2FnZV90ZXh0O1xuXG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb24gPSB2YWxpZGF0ZV9zbXNfbWVzc2FnZShmdWxsX21lc3NhZ2UpO1xuICAgICAgICBpZiAoIXZhbGlkYXRpb24udmFsaWQpIHtcbiAgICAgICAgICAgIGlmICh2YWxpZGF0aW9uLnJlYXNvbiA9PT0gXCJub25fZ3NtN1wiKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYmFkX2NoYXJzID0gdmFsaWRhdGlvbi5ub25fZ3NtX2NoYXJhY3RlcnMhLmpvaW4oXCIgXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgWW91ciBtZXNzYWdlIGNvbnRhaW5zIGNoYXJhY3RlcnMgdGhhdCBhcmUgbm90IHN1cHBvcnRlZCBpbiBwbGFpbi10ZXh0IFNNUzogJHtiYWRfY2hhcnN9LiBQbGVhc2UgdXNlIG9ubHkgc3RhbmRhcmQgY2hhcmFjdGVycyBhbmQgdHJ5IGFnYWluLmAsXG4gICAgICAgICAgICAgICAgICAgIG5leHRfc3RlcDogTkVYVF9TVEVQUy5BV0FJVF9NRVNTQUdFLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgWW91ciBtZXNzYWdlIGlzICR7bWVzc2FnZV90ZXh0Lmxlbmd0aH0gY2hhcmFjdGVycywgd2hpY2ggZXhjZWVkcyB0aGUgbGltaXQgb2YgJHttYXhfbGVuZ3RofS4gUGxlYXNlIHNob3J0ZW4geW91ciBtZXNzYWdlIGFuZCB0cnkgYWdhaW4sIG9yIHR5cGUgJ3Jlc3RhcnQnIHRvIGNhbmNlbC5gLFxuICAgICAgICAgICAgICAgIG5leHRfc3RlcDogTkVYVF9TVEVQUy5BV0FJVF9NRVNTQUdFLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKTtcbiAgICAgICAgY29uc3Qgc2lnbmVkX2luX3BhdHJvbGxlcnMgPSBsb2dpbl9zaGVldC5nZXRfb25fZHV0eV9wYXRyb2xsZXJzKCk7XG4gICAgICAgIGNvbnN0IHBob25lX21hcCA9IGF3YWl0IHRoaXMuZ2V0X3Bob25lX251bWJlcl9tYXAoKTtcblxuICAgICAgICAvLyBCdWlsZCByZWNpcGllbnQgbWFwIGZvciBvbi1kdXR5IHBhdHJvbGxlcnMgd2l0aCBrbm93biBwaG9uZXM7IHRyYWNrIG1pc3NpbmdcbiAgICAgICAgY29uc3QgcmVjaXBpZW50X21hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xuICAgICAgICBjb25zdCBub19waG9uZV9uYW1lczogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBwYXRyb2xsZXIgb2Ygc2lnbmVkX2luX3BhdHJvbGxlcnMpIHtcbiAgICAgICAgICAgIGNvbnN0IHBob25lID0gcGhvbmVfbWFwW3BhdHJvbGxlci5uYW1lXTtcbiAgICAgICAgICAgIGlmIChwaG9uZSkge1xuICAgICAgICAgICAgICAgIHJlY2lwaWVudF9tYXBbcGF0cm9sbGVyLm5hbWVdID0gcGhvbmU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vX3Bob25lX25hbWVzLnB1c2gocGF0cm9sbGVyLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgeyBzZW50X2NvdW50LCBjb3B5X3NlbnRfdG9fc2VuZGVyLCBmYWlsZWRfbmFtZXMgfSA9XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmRlbGl2ZXJfc21zX3RvX21hcChyZWNpcGllbnRfbWFwLCBmdWxsX21lc3NhZ2UsIHNlbmRlcl9uYW1lKTtcblxuICAgICAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oYHRleHRfbWVzc2FnZSgke3NlbnRfY291bnQgKyAoY29weV9zZW50X3RvX3NlbmRlciA/IDEgOiAwKX0pYCk7XG5cbiAgICAgICAgbGV0IHJlc3BvbnNlID0gYE1lc3NhZ2Ugc2VudCB0byAke3NlbnRfY291bnR9IHBhdHJvbGxlciR7c2VudF9jb3VudCAhPT0gMSA/IFwic1wiIDogXCJcIn1gO1xuICAgICAgICBpZiAoY29weV9zZW50X3RvX3NlbmRlcikge1xuICAgICAgICAgICAgcmVzcG9uc2UgKz0gYCBhbmQgYSBjb3B5IHRvIHlvdS5gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzcG9uc2UgKz0gYC5gO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFsbF9mYWlsZWQgPSBbLi4ubm9fcGhvbmVfbmFtZXMsIC4uLmZhaWxlZF9uYW1lc107XG4gICAgICAgIGlmIChhbGxfZmFpbGVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJlc3BvbnNlICs9IGAgQ291bGQgbm90IHNlbmQgdG86ICR7YWxsX2ZhaWxlZC5qb2luKFwiLCBcIil9LmA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgcmVzcG9uc2UgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb3JlIFNNUyBkZWxpdmVyeSBsb29wLiBTZW5kcyBmdWxsX21lc3NhZ2UgdG8gZWFjaCBlbnRyeSBpbiByZWNpcGllbnRfbWFwXG4gICAgICogKG5hbWUg4oaSIFwiKzFYWFhYWFhYWFhYXCIpLiBJZiB0aGUgc2VuZGVyJ3MgcGhvbmUgaXMgbm90IGFtb25nIHRoZSByZWNpcGllbnRzLFxuICAgICAqIGEgY29weSBpcyBzZW50IHRvIHRoaXMuZnJvbS4gUmV0dXJucyBkZWxpdmVyeSBhY2NvdW50aW5nIGRhdGEuXG4gICAgICogQHBhcmFtIHtSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+fSByZWNpcGllbnRfbWFwIC0gTWFwIG9mIHBhdHJvbGxlciBuYW1lIHRvIFwiKzFYWFhYWFhYWFhYXCIgcGhvbmUuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZ1bGxfbWVzc2FnZSAtIFRoZSBjb21wbGV0ZSBmb3JtYXR0ZWQgU01TIHRvIHNlbmQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbmRlcl9uYW1lIC0gVGhlIHNlbmRlcidzIG5hbWUgKHVzZWQgZm9yIGZhaWx1cmUgbG9nZ2luZykuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8b2JqZWN0Pn0gRGVsaXZlcnkgY291bnRzIGFuZCBmYWlsdXJlIGxpc3QuXG4gICAgICovXG4gICAgYXN5bmMgZGVsaXZlcl9zbXNfdG9fbWFwKFxuICAgICAgICByZWNpcGllbnRfbWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+LFxuICAgICAgICBmdWxsX21lc3NhZ2U6IHN0cmluZyxcbiAgICAgICAgc2VuZGVyX25hbWU6IHN0cmluZyxcbiAgICApOiBQcm9taXNlPHsgc2VudF9jb3VudDogbnVtYmVyOyBjb3B5X3NlbnRfdG9fc2VuZGVyOiBib29sZWFuOyBmYWlsZWRfbmFtZXM6IHN0cmluZ1tdIH0+IHtcbiAgICAgICAgbGV0IHNlbnRfY291bnQgPSAwO1xuICAgICAgICBjb25zdCBmYWlsZWRfbmFtZXM6IHN0cmluZ1tdID0gW107XG5cbiAgICAgICAgZm9yIChjb25zdCBbbmFtZSwgcGhvbmVdIG9mIE9iamVjdC5lbnRyaWVzKHJlY2lwaWVudF9tYXApKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0X3R3aWxpb19jbGllbnQoKS5tZXNzYWdlcy5jcmVhdGUoe1xuICAgICAgICAgICAgICAgICAgICB0bzogcGhvbmUsXG4gICAgICAgICAgICAgICAgICAgIGZyb206IHRoaXMudG8sXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IGZ1bGxfbWVzc2FnZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzZW50X2NvdW50Kys7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYEZhaWxlZCB0byBzZW5kIFNNUyB0byAke25hbWV9OiAke2V9YCk7XG4gICAgICAgICAgICAgICAgZmFpbGVkX25hbWVzLnB1c2gobmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZW5kIGEgY29weSB0byB0aGUgc2VuZGVyIGlmIHRoZWlyIG51bWJlciBpcyBub3QgYWxyZWFkeSBpbiB0aGUgcmVjaXBpZW50IG1hcFxuICAgICAgICBjb25zdCBub3JtYWxpemVkX3NlbmRlciA9IGArMSR7c2FuaXRpemVfcGhvbmVfbnVtYmVyKHRoaXMuZnJvbSl9YDtcbiAgICAgICAgY29uc3Qgc2VuZGVyX2luX21hcCA9IE9iamVjdC52YWx1ZXMocmVjaXBpZW50X21hcCkuaW5jbHVkZXMobm9ybWFsaXplZF9zZW5kZXIpO1xuICAgICAgICBsZXQgY29weV9zZW50X3RvX3NlbmRlciA9IGZhbHNlO1xuICAgICAgICBpZiAoIXNlbmRlcl9pbl9tYXApIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXRfdHdpbGlvX2NsaWVudCgpLm1lc3NhZ2VzLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHRvOiB0aGlzLmZyb20sXG4gICAgICAgICAgICAgICAgICAgIGZyb206IHRoaXMudG8sXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IGZ1bGxfbWVzc2FnZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb3B5X3NlbnRfdG9fc2VuZGVyID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgRmFpbGVkIHRvIHNlbmQgU01TIGNvcHkgdG8gc2VuZGVyICR7c2VuZGVyX25hbWV9OiAke2V9YCk7XG4gICAgICAgICAgICAgICAgZmFpbGVkX25hbWVzLnB1c2goc2VuZGVyX25hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHsgc2VudF9jb3VudCwgY29weV9zZW50X3RvX3NlbmRlciwgZmFpbGVkX25hbWVzIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvbXB0cyB0aGUgdXNlciB0byB0eXBlIGEgYnJvYWRjYXN0IG1lc3NhZ2UgdG8gYWxsIHBhdHJvbGxlcnMuXG4gICAgICogVW5saWtlIHRoZSBtZXNzYWdlIGNvbW1hbmQgKHdoaWNoIHRhcmdldHMgb25seSBsb2dnZWQtaW4gcGF0cm9sbGVycyksIGJyb2FkY2FzdFxuICAgICAqIHNlbmRzIHRvIGV2ZXJ5IHBhdHJvbGxlciBpbiB0aGUgUGhvbmUgTnVtYmVycyBzaGVldC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcHJvbXB0IHJlc3BvbnNlLlxuICAgICAqL1xuICAgIGFzeW5jIHByb21wdF9icm9hZGNhc3QoKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnN0IHBob25lX21hcCA9IGF3YWl0IHRoaXMuZ2V0X3Bob25lX251bWJlcl9tYXAoKTtcbiAgICAgICAgY29uc3QgcmVjaXBpZW50X2NvdW50ID0gT2JqZWN0LmtleXMocGhvbmVfbWFwKS5sZW5ndGg7XG4gICAgICAgIGlmIChyZWNpcGllbnRfY291bnQgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBObyBwYXRyb2xsZXJzIHdpdGggcGhvbmUgbnVtYmVycyBmb3VuZC4gVGhlcmUgaXMgbm9ib2R5IHRvIGJyb2FkY2FzdCB0by5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZW5kZXJfcGhvbmUgPSBzYW5pdGl6ZV9waG9uZV9udW1iZXIodGhpcy5mcm9tKTtcbiAgICAgICAgY29uc3QgbWF4X2xlbmd0aCA9IHRoaXMuZ2V0X21heF9tZXNzYWdlX2xlbmd0aCh0aGlzLnBhdHJvbGxlciEubmFtZSwgc2VuZGVyX3Bob25lKTtcbiAgICAgICAgaWYgKG1heF9sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYFlvdXIgbmFtZSBpcyB0b28gbG9uZyB0byBzZW5kIGEgYnJvYWRjYXN0IG1lc3NhZ2UuYCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3BvbnNlOiBgUGxlYXNlIHR5cGUgYSBicm9hZGNhc3QgbWVzc2FnZSBvZiBubyBtb3JlIHRoYW4gJHttYXhfbGVuZ3RofSBwbGFpbi10ZXh0IGNoYXJhY3RlcnMgdG8gJHtyZWNpcGllbnRfY291bnR9IHBhdHJvbGxlciR7cmVjaXBpZW50X2NvdW50ICE9PSAxID8gXCJzXCIgOiBcIlwifSwgb3IgJ3Jlc3RhcnQnIHRvIGNhbmNlbC5gLFxuICAgICAgICAgICAgbmV4dF9zdGVwOiBORVhUX1NURVBTLkFXQUlUX0JST0FEQ0FTVCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kcyBhIGJyb2FkY2FzdCBtZXNzYWdlIHRvIEFMTCBwYXRyb2xsZXJzIGluIHRoZSBQaG9uZSBOdW1iZXJzIHNoZWV0LFxuICAgICAqIHJlZ2FyZGxlc3Mgb2YgY2hlY2staW4gc3RhdHVzLiBVc2VzIHRoZSBzYW1lIHByZWZpeCBmb3JtYXQgYW5kIEdTTS03IC8gc2luZ2xlLXNlZ21lbnRcbiAgICAgKiB2YWxpZGF0aW9uIGFzIHRoZSBtZXNzYWdlIGNvbW1hbmQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VfdGV4dCAtIFRoZSByYXcgbWVzc2FnZSB0ZXh0IGZyb20gdGhlIHNlbmRlci5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgc2VuZCByZXN1bHQuXG4gICAgICovXG4gICAgYXN5bmMgc2VuZF9icm9hZGNhc3RfbWVzc2FnZShtZXNzYWdlX3RleHQ6IHN0cmluZyk6IFByb21pc2U8QlZOU1BSZXNwb25zZT4ge1xuICAgICAgICBjb25zdCBzZW5kZXJfbmFtZSA9IHRoaXMucGF0cm9sbGVyIS5uYW1lO1xuICAgICAgICBjb25zdCBzZW5kZXJfcGhvbmUgPSBzYW5pdGl6ZV9waG9uZV9udW1iZXIodGhpcy5mcm9tKTtcbiAgICAgICAgY29uc3QgcHJlZml4ID0gdGhpcy5nZXRfbWVzc2FnZV9wcmVmaXgoc2VuZGVyX25hbWUsIHNlbmRlcl9waG9uZSk7XG4gICAgICAgIGNvbnN0IG1heF9sZW5ndGggPSB0aGlzLmdldF9tYXhfbWVzc2FnZV9sZW5ndGgoc2VuZGVyX25hbWUsIHNlbmRlcl9waG9uZSk7XG4gICAgICAgIGNvbnN0IGZ1bGxfbWVzc2FnZSA9IHByZWZpeCArIG1lc3NhZ2VfdGV4dDtcblxuICAgICAgICBjb25zdCB2YWxpZGF0aW9uID0gdmFsaWRhdGVfc21zX21lc3NhZ2UoZnVsbF9tZXNzYWdlKTtcbiAgICAgICAgaWYgKCF2YWxpZGF0aW9uLnZhbGlkKSB7XG4gICAgICAgICAgICBpZiAodmFsaWRhdGlvbi5yZWFzb24gPT09IFwibm9uX2dzbTdcIikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJhZF9jaGFycyA9IHZhbGlkYXRpb24ubm9uX2dzbV9jaGFyYWN0ZXJzIS5qb2luKFwiIFwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICByZXNwb25zZTogYFlvdXIgbWVzc2FnZSBjb250YWlucyBjaGFyYWN0ZXJzIHRoYXQgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gcGxhaW4tdGV4dCBTTVM6ICR7YmFkX2NoYXJzfS4gUGxlYXNlIHVzZSBvbmx5IHN0YW5kYXJkIGNoYXJhY3RlcnMgYW5kIHRyeSBhZ2Fpbi5gLFxuICAgICAgICAgICAgICAgICAgICBuZXh0X3N0ZXA6IE5FWFRfU1RFUFMuQVdBSVRfQlJPQURDQVNULFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgWW91ciBtZXNzYWdlIGlzICR7bWVzc2FnZV90ZXh0Lmxlbmd0aH0gY2hhcmFjdGVycywgd2hpY2ggZXhjZWVkcyB0aGUgbGltaXQgb2YgJHttYXhfbGVuZ3RofS4gUGxlYXNlIHNob3J0ZW4geW91ciBtZXNzYWdlIGFuZCB0cnkgYWdhaW4sIG9yIHR5cGUgJ3Jlc3RhcnQnIHRvIGNhbmNlbC5gLFxuICAgICAgICAgICAgICAgIG5leHRfc3RlcDogTkVYVF9TVEVQUy5BV0FJVF9CUk9BRENBU1QsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRm9yIGJyb2FkY2FzdCwgc2VuZCB0byBBTEwgcGF0cm9sbGVycyBpbiB0aGUgcGhvbmUgbnVtYmVyIG1hcFxuICAgICAgICBjb25zdCBwaG9uZV9tYXAgPSBhd2FpdCB0aGlzLmdldF9waG9uZV9udW1iZXJfbWFwKCk7XG4gICAgICAgIGNvbnN0IHsgc2VudF9jb3VudCwgY29weV9zZW50X3RvX3NlbmRlciwgZmFpbGVkX25hbWVzIH0gPVxuICAgICAgICAgICAgYXdhaXQgdGhpcy5kZWxpdmVyX3Ntc190b19tYXAocGhvbmVfbWFwLCBmdWxsX21lc3NhZ2UsIHNlbmRlcl9uYW1lKTtcblxuICAgICAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oYGJyb2FkY2FzdCgke3NlbnRfY291bnQgKyAoY29weV9zZW50X3RvX3NlbmRlciA/IDEgOiAwKX0pYCk7XG5cbiAgICAgICAgbGV0IHJlc3BvbnNlID0gYEJyb2FkY2FzdCBzZW50IHRvICR7c2VudF9jb3VudH0gcGF0cm9sbGVyJHtzZW50X2NvdW50ICE9PSAxID8gXCJzXCIgOiBcIlwifWA7XG4gICAgICAgIGlmIChjb3B5X3NlbnRfdG9fc2VuZGVyKSB7XG4gICAgICAgICAgICByZXNwb25zZSArPSBgIGFuZCBhIGNvcHkgdG8geW91LmA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNwb25zZSArPSBgLmA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZmFpbGVkX25hbWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJlc3BvbnNlICs9IGAgQ291bGQgbm90IHNlbmQgdG86ICR7ZmFpbGVkX25hbWVzLmpvaW4oXCIsIFwiKX0uYDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyByZXNwb25zZSB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvb2tzIHVwIHBob25lIG51bWJlcnMgZm9yIGFsbCBwYXRyb2xsZXJzIGZyb20gdGhlIFBob25lIE51bWJlcnMgc2hlZXQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8UmVjb3JkPHN0cmluZywgc3RyaW5nPj59IEEgbWFwIG9mIHBhdHJvbGxlciBuYW1lIHRvIHBob25lIG51bWJlciAoaW4gKzFYWFhYWFhYWFhYIGZvcm1hdCkuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3Bob25lX251bWJlcl9tYXAoKTogUHJvbWlzZTxSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+PiB7XG4gICAgICAgIGNvbnN0IHNoZWV0c19zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfc2hlZXRzX3NlcnZpY2UoKTtcbiAgICAgICAgY29uc3Qgb3B0czogRmluZFBhdHJvbGxlckNvbmZpZyA9IHRoaXMuY29tYmluZWRfY29uZmlnO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHNoZWV0c19zZXJ2aWNlLnNwcmVhZHNoZWV0cy52YWx1ZXMuZ2V0KHtcbiAgICAgICAgICAgIHNwcmVhZHNoZWV0SWQ6IG9wdHMuU0hFRVRfSUQsXG4gICAgICAgICAgICByYW5nZTogb3B0cy5QSE9ORV9OVU1CRVJfTE9PS1VQX1NIRUVULFxuICAgICAgICAgICAgdmFsdWVSZW5kZXJPcHRpb246IFwiVU5GT1JNQVRURURfVkFMVUVcIixcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghcmVzcG9uc2UuZGF0YS52YWx1ZXMpIHtcbiAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBtYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCByb3cgb2YgcmVzcG9uc2UuZGF0YS52YWx1ZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSByb3dbZXhjZWxfcm93X3RvX2luZGV4KG9wdHMuUEhPTkVfTlVNQkVSX05BTUVfQ09MVU1OKV07XG4gICAgICAgICAgICBjb25zdCByYXdOdW1iZXIgPSByb3dbZXhjZWxfcm93X3RvX2luZGV4KG9wdHMuUEhPTkVfTlVNQkVSX05VTUJFUl9DT0xVTU4pXTtcbiAgICAgICAgICAgIGlmIChuYW1lICYmIHJhd051bWJlcikge1xuICAgICAgICAgICAgICAgIG1hcFtuYW1lXSA9IGArMSR7c2FuaXRpemVfcGhvbmVfbnVtYmVyKHJhd051bWJlcil9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWFwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFzc2lnbnMgdGhlIHNlY3Rpb24gdG8gdGhlIHBhdHJvbGxlci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bGx9IHNlY3Rpb24gIFRoZSBzZWN0aW9uIHRvIGFzc2lnbi5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcmVzcG9uc2UuXG4gICAgICovXG4gICAgYXN5bmMgYXNzaWduX3NlY3Rpb24oc2VjdGlvbjogc3RyaW5nIHwgbnVsbCk6IFByb21pc2U8QlZOU1BSZXNwb25zZT4ge1xuICAgICAgICBjb25zdCBhc3NpZ25lZFNlY3Rpb24gPSBzZWN0aW9uID8/IFwiUm92aW5nXCI7XG4gICAgICAgIGNvbnNvbGUubG9nKGBBc3NpZ25pbmcgc2VjdGlvbiAke3RoaXMucGF0cm9sbGVyIS5uYW1lfSB0byAke2Fzc2lnbmVkU2VjdGlvbn1gKTtcbiAgICAgICAgY29uc3QgbWFwcGVkX3NlY3Rpb24gPSB0aGlzLnNlY3Rpb25fdmFsdWVzLm1hcF9zZWN0aW9uKGFzc2lnbmVkU2VjdGlvbik7XG4gICAgICAgIGF3YWl0IHRoaXMubG9nX2FjdGlvbihgYXNzaWduX3NlY3Rpb24oJHttYXBwZWRfc2VjdGlvbn0pYCk7XG4gICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKTtcbiAgICAgICAgYXdhaXQgbG9naW5fc2hlZXQuYXNzaWduX3NlY3Rpb24odGhpcy5wYXRyb2xsZXIhLCBtYXBwZWRfc2VjdGlvbik7XG4gICAgICAgIGF3YWl0IHRoaXMubG9naW5fc2hlZXQ/LnJlZnJlc2goKTtcbiAgICAgICAgYXdhaXQgdGhpcy5nZXRfbWFwcGVkX3BhdHJvbGxlcih0cnVlKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3BvbnNlOiBgVXBkYXRlZCAke3RoaXMucGF0cm9sbGVyIS5uYW1lfSB3aXRoIHNlY3Rpb24gYXNzaWdubWVudDogJHttYXBwZWRfc2VjdGlvbn0uYCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWNvcmQgdGhlIGJlYWNvbiBzZWFyY2ggZm9yIHRoaXMgcGF0cm9sbGVyXG4gICAgICogQHBhcmFte3N0cmluZyB9ICBiZWFjb25fc2VhcmNoX2xvY2F0aW9uICB3aGVyZSB0aGUgYmVhY29uIHdhcyBmb3VuZFxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fVxuICAgICAqL1xuICAgIGFzeW5jIHNldF9iZWFjb25fc2VhcmNoKGJlYWNvbl9zZWFyY2hfbG9jYXRpb246IHN0cmluZyk6IFByb21pc2U8QlZOU1BSZXNwb25zZT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhgU2V0dGluZyBiZWFjb24gc2VhcmNoIGZvciAke3RoaXMucGF0cm9sbGVyIS5uYW1lfSBhdCAke2JlYWNvbl9zZWFyY2hfbG9jYXRpb259YCk7XG4gICAgICAgIGNvbnN0IHNoZWV0ID0gYXdhaXQgdGhpcy5nZXRfc2xlZF9iZWFjb25fY2hlY2tfc2hlZXQoKTtcbiAgICAgICAgY29uc3QgcHJpb3Jfc2VhcmNoZXMgPSBhd2FpdCBzaGVldC5nZXRfYmVhY29uX3NlYXJjaGVzKHRoaXMucGF0cm9sbGVyIS5uYW1lKTtcbiAgICAgICAgaWYgKHByaW9yX3NlYXJjaGVzID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHJlc3BvbnNlOiBcIlByb2JsZW0gbG9va2luZyB1cCBwYXRyb2xsZXIgZm9yIGJlYWNvbiBzZWFyY2hlcy5cIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVjb3JkIHRoZSBuZXcgYmVhY29uIHNlYXJjaFxuICAgICAgICBhd2FpdCBzaGVldC5zZXRfYmVhY29uc19zZWFyY2hlcyhwcmlvcl9zZWFyY2hlcywgYmVhY29uX3NlYXJjaF9sb2NhdGlvbik7XG5cbiAgICAgICAgLy8gUmUtcmVhZCB0aGUgdmFsdWVzIGFuZCByZXR1cm4gY29uZmlybWF0aW9uXG4gICAgICAgIGNvbnN0IHVwZGF0ZWQgPSBhd2FpdCBzaGVldC5nZXRfYmVhY29uX3NlYXJjaGVzKHRoaXMucGF0cm9sbGVyIS5uYW1lKTtcbiAgICAgICAgaWYgKHVwZGF0ZWQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgcmVzcG9uc2U6IGBVbmFibGUgdG8gcmVjb3JkIGJlYWNvbiBzZWFyY2ggZm9yICR7dGhpcy5wYXRyb2xsZXIhLm5hbWV9IHRvZGF5LmAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzdGF0dXMgPSBgQ29tcGxldGVkICR7dXBkYXRlZC5zZWFyY2hfY291bnR9IHNlYXJjaCR7dXBkYXRlZC5zZWFyY2hfY291bnQgPT09IDEgPyAnJyA6ICdlcyd9IHRoaXMgc2Vhc29uLmA7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3BvbnNlOiBgVXBkYXRlZCAke3RoaXMucGF0cm9sbGVyIS5uYW1lfSB0byBjb21wbGV0ZSBiZWFjb24gc2VhcmNoIGF0ICR7YmVhY29uX3NlYXJjaF9sb2NhdGlvbn0gdG9kYXkuXFxuJHtzdGF0dXN9YCxcbiAgICAgICAgfTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHN0YXR1cyBvZiB0aGUgcGF0cm9sbGVyLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBzdGF0dXMgcmVzcG9uc2UuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3N0YXR1cygpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuICAgICAgICBjb25zdCBzaGVldF9kYXRlID0gbG9naW5fc2hlZXQuc2hlZXRfZGF0ZS50b0RhdGVTdHJpbmcoKTtcbiAgICAgICAgY29uc3QgY3VycmVudF9kYXRlID0gbG9naW5fc2hlZXQuY3VycmVudF9kYXRlLnRvRGF0ZVN0cmluZygpO1xuICAgICAgICBpZiAoIWxvZ2luX3NoZWV0LmlzX2N1cnJlbnQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBzaGVldF9kYXRlOiAke2xvZ2luX3NoZWV0LnNoZWV0X2RhdGV9YCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgY3VycmVudF9kYXRlOiAke2xvZ2luX3NoZWV0LmN1cnJlbnRfZGF0ZX1gKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBTaGVldCBpcyBub3QgY3VycmVudCBmb3IgdG9kYXkgKGxhc3QgcmVzZXQ6ICR7c2hlZXRfZGF0ZX0pLiAke1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICAgICAgICAgIH0gaXMgbm90IGNoZWNrZWQgaW4gZm9yICR7Y3VycmVudF9kYXRlfS5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXNwb25zZSA9IHsgcmVzcG9uc2U6IGF3YWl0IHRoaXMuZ2V0X3N0YXR1c19zdHJpbmcoKSB9O1xuICAgICAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oXCJzdGF0dXNcIik7XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBzdGF0dXMgc3RyaW5nIG9mIHRoZSBwYXRyb2xsZXIuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c3RyaW5nPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgc3RhdHVzIHN0cmluZy5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfc3RhdHVzX3N0cmluZygpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG4gICAgICAgIGNvbnN0IGd1ZXN0X3Bhc3NfcHJvbWlzZSA9IChcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0X2d1ZXN0X3Bhc3Nfc2hlZXQoKVxuICAgICAgICApLmdldF9hdmFpbGFibGVfYW5kX3VzZWRfcGFzc2VzKHRoaXMucGF0cm9sbGVyIS5uYW1lKTtcbiAgICAgICAgY29uc3QgcGF0cm9sbGVyX3N0YXR1cyA9IHRoaXMucGF0cm9sbGVyITtcblxuICAgICAgICBjb25zdCBjaGVja2luQ29sdW1uU2V0ID1cbiAgICAgICAgICAgIHBhdHJvbGxlcl9zdGF0dXMuY2hlY2tpbiAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICBwYXRyb2xsZXJfc3RhdHVzLmNoZWNraW4gIT09IG51bGw7XG4gICAgICAgIGNvbnN0IGNoZWNrZWRPdXQgPVxuICAgICAgICAgICAgY2hlY2tpbkNvbHVtblNldCAmJlxuICAgICAgICAgICAgdGhpcy5jaGVja2luX3ZhbHVlcy5ieV9zaGVldF9zdHJpbmdbcGF0cm9sbGVyX3N0YXR1cy5jaGVja2luXS5rZXkgPT1cbiAgICAgICAgICAgICAgICBcIm91dFwiO1xuICAgICAgICBsZXQgc3RhdHVzID0gcGF0cm9sbGVyX3N0YXR1cy5jaGVja2luIHx8IFwiTm90IFByZXNlbnRcIjtcblxuICAgICAgICBpZiAoY2hlY2tlZE91dCkge1xuICAgICAgICAgICAgc3RhdHVzID0gXCJDaGVja2VkIE91dFwiO1xuICAgICAgICB9IGVsc2UgaWYgKGNoZWNraW5Db2x1bW5TZXQpIHtcbiAgICAgICAgICAgIGxldCBzZWN0aW9uID0gcGF0cm9sbGVyX3N0YXR1cy5zZWN0aW9uLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBpZiAoc2VjdGlvbi5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgICAgIHNlY3Rpb24gPSBgU2VjdGlvbiAke3NlY3Rpb259YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0YXR1cyA9IGAke3BhdHJvbGxlcl9zdGF0dXMuY2hlY2tpbn0gKCR7c2VjdGlvbn0pYDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbXBsZXRlZFBhdHJvbERheXMgPSBhd2FpdCAoXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmdldF9zZWFzb25fc2hlZXQoKVxuICAgICAgICApLmdldF9wYXRyb2xsZWRfZGF5cyh0aGlzLnBhdHJvbGxlciEubmFtZSk7XG4gICAgICAgIGNvbnN0IGNvbXBsZXRlZFBhdHJvbERheXNTdHJpbmcgPVxuICAgICAgICAgICAgY29tcGxldGVkUGF0cm9sRGF5cyA+IDAgPyBjb21wbGV0ZWRQYXRyb2xEYXlzLnRvU3RyaW5nKCkgOiBcIk5vXCI7XG4gICAgICAgIGNvbnN0IGxvZ2luU2hlZXREYXRlID0gbG9naW5fc2hlZXQuc2hlZXRfZGF0ZS50b0RhdGVTdHJpbmcoKTtcblxuICAgICAgICBsZXQgc3RhdHVzU3RyaW5nID0gYFN0YXR1cyBmb3IgJHtcbiAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyIS5uYW1lXG4gICAgICAgIH0gb24gZGF0ZSAke2xvZ2luU2hlZXREYXRlfTogJHtzdGF0dXN9LlxcbiR7Y29tcGxldGVkUGF0cm9sRGF5c1N0cmluZ30gY29tcGxldGVkIHBhdHJvbCBkYXlzIHByaW9yIHRvIHRvZGF5LmA7XG4gICAgICAgIGNvbnN0IHVzZWRUb2RheUd1ZXN0UGFzc2VzID0gKGF3YWl0IGd1ZXN0X3Bhc3NfcHJvbWlzZSk/LnVzZWRfdG9kYXkgfHwgMDtcbiAgICAgICAgY29uc3QgdXNlZFNlYXNvbkd1ZXN0UGFzc2VzID1cbiAgICAgICAgICAgIChhd2FpdCBndWVzdF9wYXNzX3Byb21pc2UpPy51c2VkX3NlYXNvbiB8fCAwO1xuICAgICAgICBjb25zdCBhdmFpbGFibGVHdWVzdFBhc3NlcyA9IChhd2FpdCBndWVzdF9wYXNzX3Byb21pc2UpPy5hdmFpbGFibGUgfHwgMDtcblxuXG4gICAgICAgIHN0YXR1c1N0cmluZyArPVxuICAgICAgICAgICAgXCIgXCIgK1xuICAgICAgICAgICAgYnVpbGRfcGFzc2VzX3N0cmluZyhcbiAgICAgICAgICAgICAgICB1c2VkU2Vhc29uR3Vlc3RQYXNzZXMsXG4gICAgICAgICAgICAgICAgdXNlZFNlYXNvbkd1ZXN0UGFzc2VzICsgYXZhaWxhYmxlR3Vlc3RQYXNzZXMsXG4gICAgICAgICAgICAgICAgdXNlZFRvZGF5R3Vlc3RQYXNzZXNcbiAgICAgICAgICAgICk7XG4gICAgICAgIHJldHVybiBzdGF0dXNTdHJpbmc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgdGhlIGNoZWNrLWluIHByb2Nlc3MgZm9yIHRoZSBwYXRyb2xsZXIgb25jZSB0aGUgY2hlY2staW4gbW9kZSBpcyBzZXQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGNoZWNrLWluIHJlc3BvbnNlLlxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBUaHJvd3MgYW4gZXJyb3IgaWYgdGhlIGNoZWNrLWluIG1vZGUgaXMgaW1wcm9wZXJseSBzZXQuXG4gICAgICovXG4gICAgYXN5bmMgY2hlY2tpbigpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICBgUGVyZm9ybWluZyByZWd1bGFyIGNoZWNraW4gZm9yICR7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXIhLm5hbWVcbiAgICAgICAgICAgIH0gd2l0aCBtb2RlOiAke3RoaXMuY2hlY2tpbl9tb2RlfWBcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGF3YWl0IHRoaXMuc2hlZXRfbmVlZHNfcmVzZXQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTpcbiAgICAgICAgICAgICAgICAgICAgYCR7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICAgICAgICAgICAgICB9LCB5b3UgYXJlIHRoZSBmaXJzdCBwZXJzb24gdG8gY2hlY2sgaW4gdG9kYXkuIGAgK1xuICAgICAgICAgICAgICAgICAgICBgSSBuZWVkIHRvIGFyY2hpdmUgYW5kIHJlc2V0IHRoZSBzaGVldCBiZWZvcmUgY29udGludWluZy4gYCArXG4gICAgICAgICAgICAgICAgICAgIGBXb3VsZCB5b3UgbGlrZSBtZSB0byBkbyB0aGF0PyAoWWVzL05vKWAsXG4gICAgICAgICAgICAgICAgbmV4dF9zdGVwOiBgJHtORVhUX1NURVBTLkNPTkZJUk1fUkVTRVR9LSR7dGhpcy5jaGVja2luX21vZGV9YCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNoZWNraW5fbW9kZTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgIXRoaXMuY2hlY2tpbl9tb2RlIHx8XG4gICAgICAgICAgICAoY2hlY2tpbl9tb2RlID0gdGhpcy5jaGVja2luX3ZhbHVlcy5ieV9rZXlbdGhpcy5jaGVja2luX21vZGVdKSA9PT1cbiAgICAgICAgICAgICAgICB1bmRlZmluZWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDaGVja2luIG1vZGUgaW1wcm9wZXJseSBzZXRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG4gICAgICAgIGNvbnN0IG5ld19jaGVja2luX3ZhbHVlID0gY2hlY2tpbl9tb2RlLnNoZWV0c192YWx1ZTtcbiAgICAgICAgYXdhaXQgbG9naW5fc2hlZXQuY2hlY2tpbih0aGlzLnBhdHJvbGxlciEsIG5ld19jaGVja2luX3ZhbHVlKTtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKGB1cGRhdGUtc3RhdHVzKCR7bmV3X2NoZWNraW5fdmFsdWV9KWApO1xuICAgICAgICBhd2FpdCB0aGlzLmxvZ2luX3NoZWV0Py5yZWZyZXNoKCk7XG4gICAgICAgIGF3YWl0IHRoaXMuZ2V0X21hcHBlZF9wYXRyb2xsZXIodHJ1ZSk7XG5cbiAgICAgICAgbGV0IHJlc3BvbnNlID0gYFVwZGF0aW5nICR7XG4gICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICB9IHdpdGggc3RhdHVzOiAke25ld19jaGVja2luX3ZhbHVlfS5gO1xuICAgICAgICBpZiAoIXRoaXMuZmFzdF9jaGVja2luKSB7XG4gICAgICAgICAgICByZXNwb25zZSArPSBgIFlvdSBjYW4gc2VuZCAnJHtjaGVja2luX21vZGUuZmFzdF9jaGVja2luc1swXX0nIGFzIHlvdXIgZmlyc3QgbWVzc2FnZSBmb3IgYSBmYXN0ICR7Y2hlY2tpbl9tb2RlLnNoZWV0c192YWx1ZX0gY2hlY2tpbiBuZXh0IHRpbWUuYDtcbiAgICAgICAgfVxuICAgICAgICByZXNwb25zZSArPSBcIlxcblxcblwiICsgKGF3YWl0IHRoaXMuZ2V0X3N0YXR1c19zdHJpbmcoKSk7XG4gICAgICAgIHJldHVybiB7IHJlc3BvbnNlOiByZXNwb25zZSB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGUgR29vZ2xlIFNoZWV0cyBuZWVkcyB0byBiZSByZXNldC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdHJ1ZSBpZiB0aGUgc2hlZXQgbmVlZHMgdG8gYmUgcmVzZXQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKi9cbiAgICBhc3luYyBzaGVldF9uZWVkc19yZXNldCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuXG4gICAgICAgIGNvbnN0IHNoZWV0X2RhdGUgPSBsb2dpbl9zaGVldC5zaGVldF9kYXRlO1xuICAgICAgICBjb25zdCBjdXJyZW50X2RhdGUgPSBsb2dpbl9zaGVldC5jdXJyZW50X2RhdGU7XG4gICAgICAgIGNvbnNvbGUubG9nKGBzaGVldF9kYXRlOiAke3NoZWV0X2RhdGV9YCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBjdXJyZW50X2RhdGU6ICR7Y3VycmVudF9kYXRlfWApO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGBkYXRlX2lzX2N1cnJlbnQ6ICR7bG9naW5fc2hlZXQuaXNfY3VycmVudH1gKTtcblxuICAgICAgICByZXR1cm4gIWxvZ2luX3NoZWV0LmlzX2N1cnJlbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzZXRzIHRoZSBHb29nbGUgU2hlZXRzIGZsb3csIGluY2x1ZGluZyBhcmNoaXZpbmcgYW5kIHJlc2V0dGluZyB0aGUgc2hlZXQgaWYgbmVjZXNzYXJ5LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2UgfCB2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgY2hlY2staW4gcmVzcG9uc2Ugb3Igdm9pZC5cbiAgICAgKi9cbiAgICBhc3luYyByZXNldF9zaGVldF9mbG93KCk6IFByb21pc2U8QlZOU1BSZXNwb25zZSB8IHZvaWQ+IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmNoZWNrX3VzZXJfY3JlZHMoXG4gICAgICAgICAgICBgJHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICAgICAgfSwgaW4gb3JkZXIgdG8gcmVzZXQvYXJjaGl2ZSwgSSBuZWVkIHlvdSB0byBhdXRob3JpemUgdGhlIGFwcC5gXG4gICAgICAgICk7XG4gICAgICAgIGlmIChyZXNwb25zZSlcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IHJlc3BvbnNlLnJlc3BvbnNlLFxuICAgICAgICAgICAgICAgIG5leHRfc3RlcDogYCR7TkVYVF9TVEVQUy5BVVRIX1JFU0VUfS0ke3RoaXMuY2hlY2tpbl9tb2RlfWAsXG4gICAgICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5yZXNldF9zaGVldCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc2V0cyB0aGUgR29vZ2xlIFNoZWV0cywgaW5jbHVkaW5nIGFyY2hpdmluZyBhbmQgcmVzZXR0aW5nIHRoZSBzaGVldC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgc2hlZXQgaXMgcmVzZXQuXG4gICAgICovXG4gICAgYXN5bmMgcmVzZXRfc2hlZXQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IHNjcmlwdF9zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfdXNlcl9zY3JpcHRzX3NlcnZpY2UoKTtcbiAgICAgICAgY29uc3Qgc2hvdWxkX3BlcmZvcm1fYXJjaGl2ZSA9ICEoYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKSkuYXJjaGl2ZWQ7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBzaG91bGRfcGVyZm9ybV9hcmNoaXZlXG4gICAgICAgICAgICA/IFwiT2theS4gQXJjaGl2aW5nIGFuZCByZXNldHRpbmcgdGhlIGNoZWNrIGluIHNoZWV0LiBUaGlzIHRha2VzIGFib3V0IDEwIHNlY29uZHMuLi5cIlxuICAgICAgICAgICAgOiBcIk9rYXkuIFNoZWV0IGhhcyBhbHJlYWR5IGJlZW4gYXJjaGl2ZWQuIFBlcmZvcm1pbmcgcmVzZXQuIFRoaXMgdGFrZXMgYWJvdXQgNSBzZWNvbmRzLi4uXCI7XG4gICAgICAgIGF3YWl0IHRoaXMuc2VuZF9tZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICBpZiAoc2hvdWxkX3BlcmZvcm1fYXJjaGl2ZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJBcmNoaXZpbmcuLi5cIik7XG5cbiAgICAgICAgICAgIGF3YWl0IHNjcmlwdF9zZXJ2aWNlLnNjcmlwdHMucnVuKHtcbiAgICAgICAgICAgICAgICBzY3JpcHRJZDogdGhpcy5yZXNldF9zY3JpcHRfaWQsXG4gICAgICAgICAgICAgICAgcmVxdWVzdEJvZHk6IHsgZnVuY3Rpb246IHRoaXMuY29uZmlnLkFSQ0hJVkVfRlVOQ1RJT05fTkFNRSB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmRlbGF5KDUpO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKFwiYXJjaGl2ZVwiKTtcbiAgICAgICAgICAgIHRoaXMubG9naW5fc2hlZXQgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJSZXNldHRpbmcuLi5cIik7XG4gICAgICAgIGF3YWl0IHNjcmlwdF9zZXJ2aWNlLnNjcmlwdHMucnVuKHtcbiAgICAgICAgICAgIHNjcmlwdElkOiB0aGlzLnJlc2V0X3NjcmlwdF9pZCxcbiAgICAgICAgICAgIHJlcXVlc3RCb2R5OiB7IGZ1bmN0aW9uOiB0aGlzLmNvbmZpZy5SRVNFVF9GVU5DVElPTl9OQU1FIH0sXG4gICAgICAgIH0pO1xuICAgICAgICBhd2FpdCB0aGlzLmRlbGF5KDUpO1xuICAgICAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oXCJyZXNldFwiKTtcbiAgICAgICAgYXdhaXQgdGhpcy5zZW5kX21lc3NhZ2UoXCJEb25lLlwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBHb29nbGUgQXBwcyBTY3JpcHQgc2VydmljZS5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzY3JpcHRfdjEuU2NyaXB0Pn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgR29vZ2xlIEFwcHMgU2NyaXB0IHNlcnZpY2UuXG4gICAgICovXG4gICAgYXN5bmMgY2hlY2tfdXNlcl9jcmVkcyhcbiAgICAgICAgcHJvbXB0X21lc3NhZ2U6IHN0cmluZyA9IFwiSGksIGJlZm9yZSB5b3UgY2FuIHVzZSBCVk5TUCBib3QsIHlvdSBtdXN0IGxvZ2luLlwiXG4gICAgKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlIHwgdW5kZWZpbmVkPiB7XG4gICAgICAgIGNvbnN0IHVzZXJfY3JlZHMgPSB0aGlzLmdldF91c2VyX2NyZWRzKCk7XG4gICAgICAgIGlmICghKGF3YWl0IHVzZXJfY3JlZHMubG9hZFRva2VuKCkpKSB7XG4gICAgICAgICAgICBjb25zdCBhdXRoVXJsID0gYXdhaXQgdXNlcl9jcmVkcy5nZXRBdXRoVXJsKCk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgJHtwcm9tcHRfbWVzc2FnZX0gUGxlYXNlIGZvbGxvdyB0aGlzIGxpbms6XG4ke2F1dGhVcmx9XG5cbk1lc3NhZ2UgbWUgYWdhaW4gd2hlbiBkb25lLmAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgR29vZ2xlIEFwcHMgU2NyaXB0IHNlcnZpY2UuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c2NyaXB0X3YxLlNjcmlwdD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIEdvb2dsZSBBcHBzIFNjcmlwdCBzZXJ2aWNlLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF9vbl9kdXR5KCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIGNvbnN0IGNoZWNrZWRfb3V0X3NlY3Rpb24gPSBcIkNoZWNrZWQgT3V0XCI7XG4gICAgICAgIGNvbnN0IGxhc3Rfc2VjdGlvbnMgPSBbY2hlY2tlZF9vdXRfc2VjdGlvbl07XG4gICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKTtcblxuICAgICAgICBjb25zdCBvbl9kdXR5X3BhdHJvbGxlcnMgPSBsb2dpbl9zaGVldC5nZXRfb25fZHV0eV9wYXRyb2xsZXJzKCk7XG4gICAgICAgIGNvbnN0IGJ5X3NlY3Rpb24gPSBvbl9kdXR5X3BhdHJvbGxlcnNcbiAgICAgICAgICAgIC5maWx0ZXIoKHgpID0+IHguY2hlY2tpbilcbiAgICAgICAgICAgIC5yZWR1Y2UoKHByZXY6IHsgW2tleTogc3RyaW5nXTogUGF0cm9sbGVyUm93W10gfSwgY3VyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2hvcnRfY29kZSA9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tpbl92YWx1ZXMuYnlfc2hlZXRfc3RyaW5nW2N1ci5jaGVja2luXS5rZXk7XG4gICAgICAgICAgICAgICAgbGV0IHNlY3Rpb24gPSBjdXIuc2VjdGlvbjtcbiAgICAgICAgICAgICAgICBpZiAoc2hvcnRfY29kZSA9PSBcIm91dFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlY3Rpb24gPSBjaGVja2VkX291dF9zZWN0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIShzZWN0aW9uIGluIHByZXYpKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZbc2VjdGlvbl0gPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcHJldltzZWN0aW9uXS5wdXNoKGN1cik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByZXY7XG4gICAgICAgICAgICB9LCB7fSk7XG4gICAgICAgIGxldCByZXN1bHRzOiBzdHJpbmdbXVtdID0gW107XG4gICAgICAgIGxldCBhbGxfa2V5cyA9IE9iamVjdC5rZXlzKGJ5X3NlY3Rpb24pO1xuICAgICAgICBjb25zdCBvcmRlcmVkX3ByaW1hcnlfc2VjdGlvbnMgPSBPYmplY3Qua2V5cyhieV9zZWN0aW9uKVxuICAgICAgICAgICAgLmZpbHRlcigoeCkgPT4gIWxhc3Rfc2VjdGlvbnMuaW5jbHVkZXMoeCkpXG4gICAgICAgICAgICAuc29ydCgpO1xuICAgICAgICBjb25zdCBmaWx0ZXJlZF9sYXN0X3NlY3Rpb25zID0gbGFzdF9zZWN0aW9ucy5maWx0ZXIoKHgpID0+XG4gICAgICAgICAgICBhbGxfa2V5cy5pbmNsdWRlcyh4KVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBvcmRlcmVkX3NlY3Rpb25zID0gb3JkZXJlZF9wcmltYXJ5X3NlY3Rpb25zLmNvbmNhdChcbiAgICAgICAgICAgIGZpbHRlcmVkX2xhc3Rfc2VjdGlvbnNcbiAgICAgICAgKTtcblxuICAgICAgICBmb3IgKGNvbnN0IHNlY3Rpb24gb2Ygb3JkZXJlZF9zZWN0aW9ucykge1xuICAgICAgICAgICAgbGV0IHJlc3VsdDogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IHBhdHJvbGxlcnMgPSBieV9zZWN0aW9uW3NlY3Rpb25dLnNvcnQoKHgsIHkpID0+XG4gICAgICAgICAgICAgICAgeC5uYW1lLmxvY2FsZUNvbXBhcmUoeS5uYW1lKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChzZWN0aW9uLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKFwiU2VjdGlvbiBcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQucHVzaChgJHtzZWN0aW9ufTogYCk7XG4gICAgICAgICAgICBmdW5jdGlvbiBwYXRyb2xsZXJfc3RyaW5nKG5hbWU6IHN0cmluZywgc2hvcnRfY29kZTogc3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRldGFpbHMgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGlmIChzaG9ydF9jb2RlICE9PSBcImRheVwiICYmIHNob3J0X2NvZGUgIT09IFwib3V0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlscyA9IGAgKCR7c2hvcnRfY29kZS50b1VwcGVyQ2FzZSgpfSlgO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7bmFtZX0ke2RldGFpbHN9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFxuICAgICAgICAgICAgICAgIHBhdHJvbGxlcnNcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgoeCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdHJvbGxlcl9zdHJpbmcoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tpbl92YWx1ZXMuYnlfc2hlZXRfc3RyaW5nW3guY2hlY2tpbl0ua2V5XG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLmpvaW4oXCIsIFwiKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChyZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHRoaXMubG9nX2FjdGlvbihcIm9uLWR1dHlcIik7XG4gICAgICAgIHJldHVybiBgUGF0cm9sbGVycyBmb3IgJHtsb2dpbl9zaGVldC5zaGVldF9kYXRlLnRvRGF0ZVN0cmluZygpfSAoVG90YWw6ICR7XG4gICAgICAgICAgICBvbl9kdXR5X3BhdHJvbGxlcnMubGVuZ3RoXG4gICAgICAgIH0pOlxcbiR7cmVzdWx0cy5tYXAoKHIpID0+IHIuam9pbihcIlwiKSkuam9pbihcIlxcblwiKX1gO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvZ3MgYW4gYWN0aW9uIHRvIHRoZSBHb29nbGUgU2hlZXRzLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhY3Rpb25fbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBhY3Rpb24gdG8gbG9nLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBhY3Rpb24gaXMgbG9nZ2VkLlxuICAgICAqL1xuICAgIGFzeW5jIGxvZ19hY3Rpb24oYWN0aW9uX25hbWU6IHN0cmluZykge1xuICAgICAgICBjb25zdCBzaGVldHNfc2VydmljZSA9IGF3YWl0IHRoaXMuZ2V0X3NoZWV0c19zZXJ2aWNlKCk7XG4gICAgICAgIGF3YWl0IHNoZWV0c19zZXJ2aWNlLnNwcmVhZHNoZWV0cy52YWx1ZXMuYXBwZW5kKHtcbiAgICAgICAgICAgIHNwcmVhZHNoZWV0SWQ6IHRoaXMuY29tYmluZWRfY29uZmlnLlNIRUVUX0lELFxuICAgICAgICAgICAgcmFuZ2U6IHRoaXMuY29uZmlnLkFDVElPTl9MT0dfU0hFRVQsXG4gICAgICAgICAgICB2YWx1ZUlucHV0T3B0aW9uOiBcIlVTRVJfRU5URVJFRFwiLFxuICAgICAgICAgICAgcmVxdWVzdEJvZHk6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZXM6IFtbdGhpcy5wYXRyb2xsZXIhLm5hbWUsIG5ldyBEYXRlKCksIGFjdGlvbl9uYW1lXV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2dzIG91dCB0aGUgdXNlci5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgbG9nb3V0IHJlc3BvbnNlLlxuICAgICAqL1xuICAgIGFzeW5jIGxvZ291dCgpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgdXNlcl9jcmVkcyA9IHRoaXMuZ2V0X3VzZXJfY3JlZHMoKTtcbiAgICAgICAgYXdhaXQgdXNlcl9jcmVkcy5kZWxldGVUb2tlbigpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IFwiT2theSwgSSBoYXZlIHJlbW92ZWQgYWxsIGxvZ2luIHNlc3Npb24gaW5mb3JtYXRpb24uXCIsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgVHdpbGlvIGNsaWVudC5cbiAgICAgKiBAcmV0dXJucyB7VHdpbGlvQ2xpZW50fSBUaGUgVHdpbGlvIGNsaWVudC5cbiAgICAgKi9cbiAgICBnZXRfdHdpbGlvX2NsaWVudCgpIHtcbiAgICAgICAgaWYgKHRoaXMudHdpbGlvX2NsaWVudCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0d2lsaW9fY2xpZW50IHdhcyBuZXZlciBpbml0aWFsaXplZCFcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudHdpbGlvX2NsaWVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBUd2lsaW8gU3luYyBjbGllbnQuXG4gICAgICogQHJldHVybnMge1NlcnZpY2VDb250ZXh0fSBUaGUgVHdpbGlvIFN5bmMgY2xpZW50LlxuICAgICAqL1xuICAgIGdldF9zeW5jX2NsaWVudCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN5bmNfY2xpZW50KSB7XG4gICAgICAgICAgICB0aGlzLnN5bmNfY2xpZW50ID0gdGhpcy5nZXRfdHdpbGlvX2NsaWVudCgpLnN5bmMudjEuc2VydmljZXMoXG4gICAgICAgICAgICAgICAgdGhpcy5zeW5jX3NpZFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zeW5jX2NsaWVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB1c2VyIGNyZWRlbnRpYWxzLlxuICAgICAqIEByZXR1cm5zIHtVc2VyQ3JlZHN9IFRoZSB1c2VyIGNyZWRlbnRpYWxzLlxuICAgICAqL1xuICAgIGdldF91c2VyX2NyZWRzKCkge1xuICAgICAgICBpZiAoIXRoaXMudXNlcl9jcmVkcykge1xuICAgICAgICAgICAgdGhpcy51c2VyX2NyZWRzID0gbmV3IFVzZXJDcmVkcyhcbiAgICAgICAgICAgICAgICB0aGlzLmdldF9zeW5jX2NsaWVudCgpLFxuICAgICAgICAgICAgICAgIHRoaXMuZnJvbSxcbiAgICAgICAgICAgICAgICB0aGlzLmNvbWJpbmVkX2NvbmZpZ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy51c2VyX2NyZWRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHNlcnZpY2UgY3JlZGVudGlhbHMuXG4gICAgICogQHJldHVybnMge0dvb2dsZUF1dGh9IFRoZSBzZXJ2aWNlIGNyZWRlbnRpYWxzLlxuICAgICAqL1xuICAgIGdldF9zZXJ2aWNlX2NyZWRzKCkge1xuICAgICAgICBpZiAoIXRoaXMuc2VydmljZV9jcmVkcykge1xuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlX2NyZWRzID0gbmV3IGdvb2dsZS5hdXRoLkdvb2dsZUF1dGgoe1xuICAgICAgICAgICAgICAgIGtleUZpbGU6IGdldF9zZXJ2aWNlX2NyZWRlbnRpYWxzX3BhdGgoKSxcbiAgICAgICAgICAgICAgICBzY29wZXM6IHRoaXMuU0NPUEVTLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZV9jcmVkcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB2YWxpZCBjcmVkZW50aWFscy5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtyZXF1aXJlX3VzZXJfY3JlZHM9ZmFsc2VdIC0gV2hldGhlciB1c2VyIGNyZWRlbnRpYWxzIGFyZSByZXF1aXJlZC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxHb29nbGVBdXRoPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgdmFsaWQgY3JlZGVudGlhbHMuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3ZhbGlkX2NyZWRzKHJlcXVpcmVfdXNlcl9jcmVkczogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5VU0VfU0VSVklDRV9BQ0NPVU5UICYmICFyZXF1aXJlX3VzZXJfY3JlZHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldF9zZXJ2aWNlX2NyZWRzKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXNlcl9jcmVkcyA9IHRoaXMuZ2V0X3VzZXJfY3JlZHMoKTtcbiAgICAgICAgaWYgKCEoYXdhaXQgdXNlcl9jcmVkcy5sb2FkVG9rZW4oKSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVzZXIgaXMgbm90IGF1dGhlZC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJVc2luZyB1c2VyIGFjY291bnQgZm9yIHNlcnZpY2UgYXV0aC4uLlwiKTtcbiAgICAgICAgcmV0dXJuIHVzZXJfY3JlZHMub2F1dGgyX2NsaWVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBHb29nbGUgU2hlZXRzIHNlcnZpY2UuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c2hlZXRzX3Y0LlNoZWV0cz59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIEdvb2dsZSBTaGVldHMgc2VydmljZS5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfc2hlZXRzX3NlcnZpY2UoKSB7XG4gICAgICAgIGlmICghdGhpcy5zaGVldHNfc2VydmljZSkge1xuICAgICAgICAgICAgdGhpcy5zaGVldHNfc2VydmljZSA9IGdvb2dsZS5zaGVldHMoe1xuICAgICAgICAgICAgICAgIHZlcnNpb246IFwidjRcIixcbiAgICAgICAgICAgICAgICBhdXRoOiBhd2FpdCB0aGlzLmdldF92YWxpZF9jcmVkcygpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2hlZXRzX3NlcnZpY2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbG9naW4gc2hlZXQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8TG9naW5TaGVldD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGxvZ2luIHNoZWV0XG4gICAgICovXG4gICAgYXN5bmMgZ2V0X2xvZ2luX3NoZWV0KCkge1xuICAgICAgICBpZiAoIXRoaXMubG9naW5fc2hlZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0X2NvbmZpZzogTG9naW5TaGVldENvbmZpZyA9IHRoaXMuY29tYmluZWRfY29uZmlnO1xuICAgICAgICAgICAgY29uc3Qgc2hlZXRzX3NlcnZpY2UgPSBhd2FpdCB0aGlzLmdldF9zaGVldHNfc2VydmljZSgpO1xuICAgICAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBuZXcgTG9naW5TaGVldChcbiAgICAgICAgICAgICAgICBzaGVldHNfc2VydmljZSxcbiAgICAgICAgICAgICAgICBsb2dpbl9zaGVldF9jb25maWdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBhd2FpdCBsb2dpbl9zaGVldC5yZWZyZXNoKCk7XG4gICAgICAgICAgICB0aGlzLmxvZ2luX3NoZWV0ID0gbG9naW5fc2hlZXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubG9naW5fc2hlZXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgc2Vhc29uIHNoZWV0LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFNlYXNvblNoZWV0Pn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgc2Vhc29uIHNoZWV0XG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3NlYXNvbl9zaGVldCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNlYXNvbl9zaGVldCkge1xuICAgICAgICAgICAgY29uc3Qgc2Vhc29uX3NoZWV0X2NvbmZpZzogU2Vhc29uU2hlZXRDb25maWcgPSB0aGlzLmNvbWJpbmVkX2NvbmZpZztcbiAgICAgICAgICAgIGNvbnN0IHNoZWV0c19zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfc2hlZXRzX3NlcnZpY2UoKTtcbiAgICAgICAgICAgIHRoaXMuc2Vhc29uX3NoZWV0ID0gbmV3IFNlYXNvblNoZWV0KFxuICAgICAgICAgICAgICAgIHNoZWV0c19zZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHNlYXNvbl9zaGVldF9jb25maWdcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2Vhc29uX3NoZWV0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGd1ZXN0IHBhc3Mgc2hlZXQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8R3Vlc3RQYXNzU2hlZXQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBndWVzdCBwYXNzIHNoZWV0XG4gICAgICovXG4gICAgYXN5bmMgZ2V0X2d1ZXN0X3Bhc3Nfc2hlZXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5ndWVzdF9wYXNzX3NoZWV0KSB7XG4gICAgICAgICAgICBjb25zdCBjb25maWc6IEd1ZXN0UGFzc2VzQ29uZmlnID0gdGhpcy5jb21iaW5lZF9jb25maWc7XG4gICAgICAgICAgICBjb25zdCBzaGVldHNfc2VydmljZSA9IGF3YWl0IHRoaXMuZ2V0X3NoZWV0c19zZXJ2aWNlKCk7XG4gICAgICAgICAgICB0aGlzLmd1ZXN0X3Bhc3Nfc2hlZXQgPSBuZXcgR3Vlc3RQYXNzU2hlZXQoc2hlZXRzX3NlcnZpY2UsIGNvbmZpZyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZ3Vlc3RfcGFzc19zaGVldDtcbiAgICB9XG5cbiAgICAvKiogZ2V0IHRoZSBzbGVjX2JlYWNvbl9jaGVja19zaGVldC5cbiAgICAgKiBAcmV0dXJucyAoUHJvbWlzZTxTbGVkQmVhY29uQ2hlY2tTaGVldD4pXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3NsZWRfYmVhY29uX2NoZWNrX3NoZWV0KCkge1xuICAgICAgICBpZiAoIXRoaXMuc2xlZF9iZWFjb25fY2hlY2tfc2hlZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpZzogU2xlZEJlYWNvbkNvbmZpZyA9ICB0aGlzLmNvbWJpbmVkX2NvbmZpZztcbiAgICAgICAgICAgIGNvbnN0IHNoZWV0c19zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfc2hlZXRzX3NlcnZpY2UoKTtcbiAgICAgICAgICAgIHRoaXMuc2xlZF9iZWFjb25fY2hlY2tfc2hlZXQgPSBuZXcgU2xlZEJlYWNvbkNoZWNrU2hlZXQoc2hlZXRzX3NlcnZpY2UsIGNvbmZpZyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2xlZF9iZWFjb25fY2hlY2tfc2hlZXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgR29vZ2xlIEFwcHMgU2NyaXB0IHNlcnZpY2UuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c2NyaXB0X3YxLlNjcmlwdD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIEdvb2dsZSBBcHBzIFNjcmlwdCBzZXJ2aWNlLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF91c2VyX3NjcmlwdHNfc2VydmljZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnVzZXJfc2NyaXB0c19zZXJ2aWNlKSB7XG4gICAgICAgICAgICB0aGlzLnVzZXJfc2NyaXB0c19zZXJ2aWNlID0gZ29vZ2xlLnNjcmlwdCh7XG4gICAgICAgICAgICAgICAgdmVyc2lvbjogXCJ2MVwiLFxuICAgICAgICAgICAgICAgIGF1dGg6IGF3YWl0IHRoaXMuZ2V0X3ZhbGlkX2NyZWRzKHRydWUpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudXNlcl9zY3JpcHRzX3NlcnZpY2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbWFwcGVkIHBhdHJvbGxlci5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtmb3JjZT1mYWxzZV0gLSBXaGV0aGVyIHRvIGZvcmNlIHRoZSBwYXRyb2xsZXIgdG8gYmUgZm91bmQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZSB8IHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSByZXNwb25zZSBvciB2b2lkLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF9tYXBwZWRfcGF0cm9sbGVyKGZvcmNlOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgcGhvbmVfbG9va3VwID0gYXdhaXQgdGhpcy5maW5kX3BhdHJvbGxlcl9mcm9tX251bWJlcigpO1xuICAgICAgICBpZiAocGhvbmVfbG9va3VwID09PSB1bmRlZmluZWQgfHwgcGhvbmVfbG9va3VwID09PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoZm9yY2UpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgZmluZCBhc3NvY2lhdGVkIHVzZXJcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgU29ycnksIEkgY291bGRuJ3QgZmluZCBhbiBhc3NvY2lhdGVkIEJWTlNQIG1lbWJlciB3aXRoIHlvdXIgcGhvbmUgbnVtYmVyICgke3RoaXMuZnJvbX0pYCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG4gICAgICAgIGNvbnN0IG1hcHBlZFBhdHJvbGxlciA9IGxvZ2luX3NoZWV0LnRyeV9maW5kX3BhdHJvbGxlcihcbiAgICAgICAgICAgIHBob25lX2xvb2t1cC5uYW1lXG4gICAgICAgICk7XG4gICAgICAgIGlmIChtYXBwZWRQYXRyb2xsZXIgPT09IFwibm90X2ZvdW5kXCIpIHtcbiAgICAgICAgICAgIGlmIChmb3JjZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBwYXRyb2xsZXIgaW4gbG9naW4gc2hlZXRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgQ291bGQgbm90IGZpbmQgcGF0cm9sbGVyICcke3Bob25lX2xvb2t1cC5uYW1lfScgaW4gbG9naW4gc2hlZXQuIFBsZWFzZSBsb29rIGF0IHRoZSBsb2dpbiBzaGVldCBuYW1lLCBhbmQgY29weSBpdCB0byB0aGUgUGhvbmUgTnVtYmVycyB0YWIuYCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJyZW50X3NoZWV0X2RhdGUgPSBsb2dpbl9zaGVldC5jdXJyZW50X2RhdGU7XG4gICAgICAgIHRoaXMucGF0cm9sbGVyID0gbWFwcGVkUGF0cm9sbGVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZpbmRzIHRoZSBwYXRyb2xsZXIgZnJvbSB0aGUgcGhvbmUgbnVtYmVyLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFBhdHJvbGxlclJvdz59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHBhdHJvbGxlci5cbiAgICAgKi9cbiAgICBhc3luYyBmaW5kX3BhdHJvbGxlcl9mcm9tX251bWJlcigpIHtcbiAgICAgICAgY29uc3QgcmF3X251bWJlciA9IHRoaXMuZnJvbTtcbiAgICAgICAgY29uc3Qgc2hlZXRzX3NlcnZpY2UgPSBhd2FpdCB0aGlzLmdldF9zaGVldHNfc2VydmljZSgpO1xuICAgICAgICBjb25zdCBvcHRzOiBGaW5kUGF0cm9sbGVyQ29uZmlnID0gdGhpcy5jb21iaW5lZF9jb25maWc7XG4gICAgICAgIGNvbnN0IG51bWJlciA9IHNhbml0aXplX3Bob25lX251bWJlcihyYXdfbnVtYmVyKTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBzaGVldHNfc2VydmljZS5zcHJlYWRzaGVldHMudmFsdWVzLmdldCh7XG4gICAgICAgICAgICBzcHJlYWRzaGVldElkOiBvcHRzLlNIRUVUX0lELFxuICAgICAgICAgICAgcmFuZ2U6IG9wdHMuUEhPTkVfTlVNQkVSX0xPT0tVUF9TSEVFVCxcbiAgICAgICAgICAgIHZhbHVlUmVuZGVyT3B0aW9uOiBcIlVORk9STUFUVEVEX1ZBTFVFXCIsXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIXJlc3BvbnNlLmRhdGEudmFsdWVzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgZmluZCBwYXRyb2xsZXIuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhLnZhbHVlc1xuICAgICAgICAgICAgLm1hcCgocm93KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmF3TnVtYmVyID1cbiAgICAgICAgICAgICAgICAgICAgcm93W2V4Y2VsX3Jvd190b19pbmRleChvcHRzLlBIT05FX05VTUJFUl9OVU1CRVJfQ09MVU1OKV07XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudE51bWJlciA9XG4gICAgICAgICAgICAgICAgICAgIHJhd051bWJlciAhPSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgICAgID8gc2FuaXRpemVfcGhvbmVfbnVtYmVyKHJhd051bWJlcilcbiAgICAgICAgICAgICAgICAgICAgICAgIDogcmF3TnVtYmVyO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnROYW1lID1cbiAgICAgICAgICAgICAgICAgICAgcm93W2V4Y2VsX3Jvd190b19pbmRleChvcHRzLlBIT05FX05VTUJFUl9OQU1FX0NPTFVNTildO1xuICAgICAgICAgICAgICAgIHJldHVybiB7bmFtZTogY3VycmVudE5hbWUsIG51bWJlcjogY3VycmVudE51bWJlcn07XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmZpbHRlcigocGF0cm9sbGVyKSA9PiBwYXRyb2xsZXIubnVtYmVyID09PSBudW1iZXIpWzBdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb21wdHMgdGhlIHVzZXIgZm9yIGEgY29tcCBvciBtYW5hZ2VyIHBhc3MuXG4gICAgICogV2UgZG8gbm90IHJlcXVpcmUgYSBndWVzdCBuYW1lIGluIHRoZSBTTVMgZmxvdzsgdGhpcyByZXR1cm5zIHRoZSBzdGF0dXMvcHJvbXB0XG4gICAgICogZm9yIGd1ZXN0IHBhc3NlcyBzbyB0aGUgR3Vlc3QgUGFzcyBjb21tYW5kIGJlaGF2ZXMgbGlrZSBvdGhlciBpbW1lZGlhdGUgYWN0aW9ucy5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcmVzcG9uc2UuXG4gICAgICovXG4gICAgYXN5bmMgcHJvbXB0X2d1ZXN0X3Bhc3MoKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlPiB7XG4gICAgICAgIC8vIEFsbG93IGFsbCBwYXRyb2xsZXJzIChpbmNsdWRpbmcgY2FuZGlkYXRlcykgdG8gdXNlIGd1ZXN0IHBhc3NlcyB3aGVuIGF2YWlsYWJsZS5cbiAgICAgICAgY29uc3Qgc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9ndWVzdF9wYXNzX3NoZWV0KCk7XG4gICAgICAgIGNvbnN0IHVzZWRfYW5kX2F2YWlsYWJsZSA9IGF3YWl0IHNoZWV0LmdldF9hdmFpbGFibGVfYW5kX3VzZWRfcGFzc2VzKHRoaXMucGF0cm9sbGVyIS5uYW1lKTtcbiAgICAgICAgaWYgKHVzZWRfYW5kX2F2YWlsYWJsZSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4geyByZXNwb25zZTogXCJQcm9ibGVtIGxvb2tpbmcgdXAgcGF0cm9sbGVyIGZvciBndWVzdCBwYXNzZXNcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgdGhlcmUgYXJlIG5vIGF2YWlsYWJsZSBwYXNzZXMgdG9kYXksIHJldHVybiB0aGUgcHJvbXB0IGluZGljYXRpbmcgbm9uZSBhcmUgYXZhaWxhYmxlLlxuICAgICAgICBpZiAodXNlZF9hbmRfYXZhaWxhYmxlLmF2YWlsYWJsZSA8IDEpIHtcbiAgICAgICAgICAgIHJldHVybiB1c2VkX2FuZF9hdmFpbGFibGUuZ2V0X3Byb21wdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ29uc3VtZSBvbmUgYXZhaWxhYmxlIHBhc3MgKHRoZSBzaGVldCByZWNvcmRzIG9ubHkgdGhlIGRhdGUgb2YgdXNlKS5cbiAgICAgICAgYXdhaXQgc2hlZXQuc2V0X3VzZWRfZ3Vlc3RfcGFzc2VzKHVzZWRfYW5kX2F2YWlsYWJsZSk7XG5cbiAgICAgICAgLy8gUmUtcmVhZCB0aGUgdmFsdWVzIGFuZCByZXR1cm4gY29uZmlybWF0aW9uICsgdXBkYXRlZCBzdGF0dXMuXG4gICAgICAgIGNvbnN0IHVwZGF0ZWQgPSBhd2FpdCBzaGVldC5nZXRfYXZhaWxhYmxlX2FuZF91c2VkX3Bhc3Nlcyh0aGlzLnBhdHJvbGxlciEubmFtZSk7XG4gICAgICAgIGlmICh1cGRhdGVkID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHJlc3BvbnNlOiBgVXBkYXRlZCAke3RoaXMucGF0cm9sbGVyIS5uYW1lfSB0byB1c2UgYSBndWVzdCBwYXNzIHRvZGF5LmAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHN0YXR1cyA9IGJ1aWxkX3Bhc3Nlc19zdHJpbmcoXG4gICAgICAgICAgICB1cGRhdGVkLnVzZWRfc2Vhc29uLFxuICAgICAgICAgICAgdXBkYXRlZC51c2VkX3NlYXNvbiArIHVwZGF0ZWQuYXZhaWxhYmxlLFxuICAgICAgICAgICAgdXBkYXRlZC51c2VkX3RvZGF5XG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZTogYFVwZGF0ZWQgJHt0aGlzLnBhdHJvbGxlciEubmFtZX0gdG8gdXNlIGEgZ3Vlc3QgcGFzcyB0b2RheS5cXG4ke3N0YXR1c31gLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb21wdCB0aGUgdXNlciBmb3IgdGhlIGxvY2F0aW9uIG9mIHRoZWlyIGNvbXBsZXRlZCBiZWFjb24gc2VhcmNoXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHJlc3BvbnNlLlxuICAgICAqL1xuICAgIGFzeW5jIHByb21wdF9iZWFjb25fc2VhcmNoKCk6IFByb21pc2U8QlZOU1BSZXNwb25zZT4ge1xuICAgICAgICBpZiAoIXRoaXMucGF0cm9sbGVyIHx8ICF0aGlzLnBhdHJvbGxlci5jaGVja2luKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgJHt0aGlzLnBhdHJvbGxlciEubmFtZX0gaXMgbm90IGNoZWNrZWQgaW4uYCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3BvbnNlOiAgXCJPbiB3aGljaCBydW4gZGlkIHlvdSBjb21wbGV0ZSBhIGJlYWNvbiBzZWFyY2ggdG9kYXkgKG9yICdyZXN0YXJ0JyB0byBjYW5jZWwpP1wiLFxuICAgICAgICAgICAgbmV4dF9zdGVwOiBORVhUX1NURVBTLkFXQUlUX0JFQUNPTlxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlIGxvY2F0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHkgLSB0aGUgYm9keSBvZiB0aGUgcmVxdWVzdFxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHN0cmluZyB8IG51bGw+fSBUaGUgc2VhcmNoIGxvY2F0aW9uIGlmIHRoZSBsb2NhdGlvbiBpcyB2YWxpZFxuICAgICAqL1xuICAgIGFzeW5jIHBhcnNlX2JlYWNvbl9zZWFyY2hfbG9jYXRpb24oYm9keTogc3RyaW5nIHwgbnVsbCk6IFByb21pc2U8c3RyaW5nIHwgbnVsbD4ge1xuICAgICAgICBjb25zdCBzaGVldCA9IGF3YWl0IHRoaXMuZ2V0X3NsZWRfYmVhY29uX2NoZWNrX3NoZWV0KCk7XG4gICAgICAgIHJldHVybiBzaGVldC5wYXJzZV9sb2NhdGlvbihib2R5KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBzaGVldHNfdjQgfSBmcm9tIFwiZ29vZ2xlYXBpc1wiO1xuaW1wb3J0IHsgR3Vlc3RQYXNzZXNDb25maWcgfSBmcm9tIFwiLi4vZW52L2hhbmRsZXJfY29uZmlnXCI7XG5pbXBvcnQgeyBleGNlbF9yb3dfdG9faW5kZXgsIHJvd19jb2xfdG9fZXhjZWxfaW5kZXgsIHBhcnNlX2Jvb2xlYW5fY2VsbCB9IGZyb20gXCIuLi91dGlscy91dGlsXCI7XG5pbXBvcnQgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIgZnJvbSBcIi4uL3V0aWxzL2dvb2dsZV9zaGVldHNfc3ByZWFkc2hlZXRfdGFiXCI7XG5pbXBvcnQgeyBmb3JtYXRfZGF0ZV9mb3Jfc3ByZWFkc2hlZXRfdmFsdWUgfSBmcm9tIFwiLi4vdXRpbHMvZGF0ZXRpbWVfdXRpbFwiO1xuaW1wb3J0IHsgYnVpbGRfcGFzc2VzX3N0cmluZyB9IGZyb20gXCIuLi91dGlscy9ndWVzdF9wYXNzZXNcIjtcbmltcG9ydCB7IEJWTlNQUmVzcG9uc2UgfSBmcm9tIFwiLi4vaGFuZGxlcnMvYnZuc3BfaGFuZGxlclwiO1xuXG5leHBvcnQgY2xhc3MgVXNlZEFuZEF2YWlsYWJsZVBhc3NlcyB7XG4gICAgcm93OiBhbnlbXTtcbiAgICBpbmRleDogbnVtYmVyO1xuICAgIGVsaWdpYmxlOiBib29sZWFuO1xuICAgIGVsaWdpYmxlX3JlYXNvbjogc3RyaW5nO1xuICAgIGF2YWlsYWJsZTogbnVtYmVyO1xuICAgIHVzZWRfdG9kYXk6IG51bWJlcjtcbiAgICB1c2VkX3NlYXNvbjogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHJvdzogYW55W10sXG4gICAgICAgIGluZGV4OiBudW1iZXIsXG4gICAgICAgIGVsaWdpYmxlOiBhbnksXG4gICAgICAgIGVsaWdpYmxlX3JlYXNvbjogYW55LFxuICAgICAgICBhdmFpbGFibGU6IGFueSxcbiAgICAgICAgdXNlZF90b2RheTogYW55LFxuICAgICAgICB1c2VkX3NlYXNvbjogYW55XG4gICAgKSB7XG4gICAgICAgIHRoaXMucm93ID0gcm93O1xuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgICAgIHRoaXMuZWxpZ2libGUgPSBwYXJzZV9ib29sZWFuX2NlbGwoZWxpZ2libGUpO1xuICAgICAgICB0aGlzLmVsaWdpYmxlX3JlYXNvbiA9IFN0cmluZyhlbGlnaWJsZV9yZWFzb24gPz8gXCJcIik7XG4gICAgICAgIHRoaXMuYXZhaWxhYmxlID0gTnVtYmVyKGF2YWlsYWJsZSk7XG4gICAgICAgIHRoaXMudXNlZF90b2RheSA9IE51bWJlcih1c2VkX3RvZGF5KTtcbiAgICAgICAgdGhpcy51c2VkX3NlYXNvbiA9IE51bWJlcih1c2VkX3NlYXNvbik7XG4gICAgfVxuXG4gICAgZ2V0X3Byb21wdCgpOiBCVk5TUFJlc3BvbnNlIHtcbiAgICAgICAgaWYgKHRoaXMuYXZhaWxhYmxlID4gMCkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBidWlsZF9wYXNzZXNfc3RyaW5nKFxuICAgICAgICAgICAgICAgIHRoaXMudXNlZF9zZWFzb24sXG4gICAgICAgICAgICAgICAgdGhpcy5hdmFpbGFibGUgKyB0aGlzLnVzZWRfc2Vhc29uLFxuICAgICAgICAgICAgICAgIHRoaXMudXNlZF90b2RheSxcbiAgICAgICAgICAgICAgICB0cnVlXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmVsaWdpYmxlKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgWW91IGFyZSBub3QgZWxpZ2libGUgZm9yIGd1ZXN0IHBhc3Nlcy4gUmVhc29uOiAke3RoaXMuZWxpZ2libGVfcmVhc29ufWAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZTogXCJZb3UgZG8gbm90IGhhdmUgYW55IGd1ZXN0IHBhc3NlcyBhdmFpbGFibGUgdG9kYXlcIixcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQYXNzU2hlZXQge1xuICAgIHNoZWV0OiBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYjtcblxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihzaGVldDogR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIpIHtcbiAgICAgICAgdGhpcy5zaGVldCA9IHNoZWV0O1xuICAgIH1cblxuICAgIGFic3RyYWN0IGdldCBlbGlnaWJsZV9jb2x1bW4oKTogc3RyaW5nO1xuICAgIGFic3RyYWN0IGdldCBlbGlnaWJsZV9yZWFzb25fY29sdW1uKCk6IHN0cmluZztcbiAgICBhYnN0cmFjdCBnZXQgYXZhaWxhYmxlX2NvbHVtbigpOiBzdHJpbmc7XG4gICAgYWJzdHJhY3QgZ2V0IHVzZWRfdG9kYXlfY29sdW1uKCk6IHN0cmluZztcbiAgICBhYnN0cmFjdCBnZXQgdXNlZF9zZWFzb25fY29sdW1uKCk6IHN0cmluZztcbiAgICBhYnN0cmFjdCBnZXQgbmFtZV9jb2x1bW4oKTogc3RyaW5nO1xuICAgIGFic3RyYWN0IGdldCBzdGFydF9pbmRleCgpOiBudW1iZXI7XG4gICAgYWJzdHJhY3QgZ2V0IHNoZWV0X25hbWUoKTogc3RyaW5nO1xuXG4gICAgYXN5bmMgZ2V0X2F2YWlsYWJsZV9hbmRfdXNlZF9wYXNzZXMoXG4gICAgICAgIHBhdHJvbGxlcl9uYW1lOiBzdHJpbmdcbiAgICApOiBQcm9taXNlPFVzZWRBbmRBdmFpbGFibGVQYXNzZXMgfCBudWxsPiB7XG4gICAgICAgIGNvbnN0IHBhdHJvbGxlcl9yb3cgPSBhd2FpdCB0aGlzLnNoZWV0LmdldF9zaGVldF9yb3dfZm9yX3BhdHJvbGxlcihcbiAgICAgICAgICAgIHBhdHJvbGxlcl9uYW1lLFxuICAgICAgICAgICAgdGhpcy5uYW1lX2NvbHVtblxuICAgICAgICApO1xuICAgICAgICBpZiAocGF0cm9sbGVyX3JvdyA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBlbGlnaWJsZSA9XG4gICAgICAgICAgICBwYXRyb2xsZXJfcm93LnJvd1tleGNlbF9yb3dfdG9faW5kZXgodGhpcy5lbGlnaWJsZV9jb2x1bW4pXTtcbiAgICAgICAgY29uc3QgZWxpZ2libGVfcmVhc29uID1cbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cucm93W2V4Y2VsX3Jvd190b19pbmRleCh0aGlzLmVsaWdpYmxlX3JlYXNvbl9jb2x1bW4pXTtcbiAgICAgICAgY29uc3QgY3VycmVudF9kYXlfYXZhaWxhYmxlX3Bhc3NlcyA9XG4gICAgICAgICAgICBwYXRyb2xsZXJfcm93LnJvd1tleGNlbF9yb3dfdG9faW5kZXgodGhpcy5hdmFpbGFibGVfY29sdW1uKV07XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfZGF5X3VzZWRfcGFzc2VzID1cbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cucm93W2V4Y2VsX3Jvd190b19pbmRleCh0aGlzLnVzZWRfdG9kYXlfY29sdW1uKV07XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfc2Vhc29uX3VzZWRfcGFzc2VzID1cbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cucm93W2V4Y2VsX3Jvd190b19pbmRleCh0aGlzLnVzZWRfc2Vhc29uX2NvbHVtbildO1xuICAgICAgICByZXR1cm4gbmV3IFVzZWRBbmRBdmFpbGFibGVQYXNzZXMoXG4gICAgICAgICAgICBwYXRyb2xsZXJfcm93LnJvdyxcbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cuaW5kZXgsXG4gICAgICAgICAgICBlbGlnaWJsZSxcbiAgICAgICAgICAgIGVsaWdpYmxlX3JlYXNvbixcbiAgICAgICAgICAgIGN1cnJlbnRfZGF5X2F2YWlsYWJsZV9wYXNzZXMsXG4gICAgICAgICAgICBjdXJyZW50X2RheV91c2VkX3Bhc3NlcyxcbiAgICAgICAgICAgIGN1cnJlbnRfc2Vhc29uX3VzZWRfcGFzc2VzXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgYXN5bmMgc2V0X3VzZWRfZ3Vlc3RfcGFzc2VzKFxuICAgICAgICBwYXRyb2xsZXJfcm93OiBVc2VkQW5kQXZhaWxhYmxlUGFzc2VzLFxuICAgICkge1xuICAgICAgICBpZiAoIXBhdHJvbGxlcl9yb3cuZWxpZ2libGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICBgUGF0cm9sbGVyIGlzIG5vdCBlbGlnaWJsZSBmb3IgZ3Vlc3QgcGFzc2VzLiBSZWFzb246ICR7cGF0cm9sbGVyX3Jvdy5lbGlnaWJsZV9yZWFzb259YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGF0cm9sbGVyX3Jvdy5hdmFpbGFibGUgPCAxKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgYE5vdCBlbm91Z2ggYXZhaWxhYmxlIHBhc3NlczogQXZhaWxhYmxlOiAke3BhdHJvbGxlcl9yb3cuYXZhaWxhYmxlfSwgVXNlZCB0aGlzIHNlYXNvbjogICR7cGF0cm9sbGVyX3Jvdy51c2VkX3NlYXNvbn0sIFVzZWQgdG9kYXk6ICR7cGF0cm9sbGVyX3Jvdy51c2VkX3RvZGF5fWBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByb3dudW0gPSBwYXRyb2xsZXJfcm93LmluZGV4O1xuICAgICAgICBjb25zdCBzdGFydF9pbmRleCA9IHRoaXMuc3RhcnRfaW5kZXg7XG4gICAgICAgIGNvbnN0IHByaW9yX2xlbmd0aCA9IHBhdHJvbGxlcl9yb3cucm93Lmxlbmd0aCAtIHN0YXJ0X2luZGV4O1xuICAgICAgICBjb25zdCBjdXJyZW50X2RhdGVfc3RyaW5nID0gZm9ybWF0X2RhdGVfZm9yX3NwcmVhZHNoZWV0X3ZhbHVlKG5ldyBEYXRlKCkpO1xuXG4gICAgICAgIGNvbnN0IG5ld192YWxzID0gcGF0cm9sbGVyX3Jvdy5yb3dcbiAgICAgICAgICAgIC5zbGljZShzdGFydF9pbmRleClcbiAgICAgICAgICAgIC5tYXAoKHgpID0+IHg/LnRvU3RyaW5nKCkpO1xuXG4gICAgICAgIC8vIFJlY29yZCBvbmx5IHRoZSBkYXRlIG9mIHRoZSB1c2U7IG5vIGd1ZXN0IG5hbWUgaXMgc3RvcmVkLlxuICAgICAgICBuZXdfdmFscy5wdXNoKGN1cnJlbnRfZGF0ZV9zdHJpbmcpO1xuXG4gICAgICAgIGNvbnN0IHVwZGF0ZV9sZW5ndGggPSBNYXRoLm1heChwcmlvcl9sZW5ndGgsIG5ld192YWxzLmxlbmd0aCk7XG4gICAgICAgIHdoaWxlIChuZXdfdmFscy5sZW5ndGggPCB1cGRhdGVfbGVuZ3RoKSB7XG4gICAgICAgICAgICBuZXdfdmFscy5wdXNoKFwiXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZW5kX2luZGV4ID0gc3RhcnRfaW5kZXggKyB1cGRhdGVfbGVuZ3RoIC0gMTtcbiAgICAgICAgY29uc3QgcmFuZ2UgPSBgJHt0aGlzLnNoZWV0LnNoZWV0X25hbWV9ISR7cm93X2NvbF90b19leGNlbF9pbmRleChcbiAgICAgICAgICAgIHJvd251bSxcbiAgICAgICAgICAgIHN0YXJ0X2luZGV4XG4gICAgICAgICl9OiR7cm93X2NvbF90b19leGNlbF9pbmRleChyb3dudW0sIGVuZF9pbmRleCl9YDtcblxuICAgICAgICBjb25zb2xlLmxvZyhgVXBkYXRpbmcgJHtyYW5nZX0gd2l0aCAke25ld192YWxzLmxlbmd0aH0gdmFsdWVzYCk7XG4gICAgICAgIGF3YWl0IHRoaXMuc2hlZXQudXBkYXRlX3ZhbHVlcyhyYW5nZSwgW25ld192YWxzXSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgR3Vlc3RQYXNzU2hlZXQgZXh0ZW5kcyBQYXNzU2hlZXQge1xuICAgIGNvbmZpZzogR3Vlc3RQYXNzZXNDb25maWc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgc2hlZXRzX3NlcnZpY2U6IHNoZWV0c192NC5TaGVldHMgfCBudWxsLFxuICAgICAgICBjb25maWc6IEd1ZXN0UGFzc2VzQ29uZmlnXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgbmV3IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiKFxuICAgICAgICAgICAgICAgIHNoZWV0c19zZXJ2aWNlLFxuICAgICAgICAgICAgICAgIGNvbmZpZy5TSEVFVF9JRCxcbiAgICAgICAgICAgICAgICBjb25maWcuR1VFU1RfUEFTU19TSEVFVFxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICB9XG5cbiAgICBnZXQgc3RhcnRfaW5kZXgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGV4Y2VsX3Jvd190b19pbmRleChcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLkdVRVNUX1BBU1NfU0hFRVRfREFURVNfU1RBUlRJTkdfQ09MVU1OXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0IHNoZWV0X25hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLkdVRVNUX1BBU1NfU0hFRVQ7XG4gICAgfVxuXG4gICAgZ2V0IGVsaWdpYmxlX2NvbHVtbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuR1VFU1RfUEFTU19FTElHSUJMRV9DT0xVTU47XG4gICAgfVxuXG4gICAgZ2V0IGVsaWdpYmxlX3JlYXNvbl9jb2x1bW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLkdVRVNUX1BBU1NfRUxJR0lCTEVfUkVBU09OX0NPTFVNTjtcbiAgICB9XG5cbiAgICBnZXQgYXZhaWxhYmxlX2NvbHVtbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuR1VFU1RfUEFTU19TSEVFVF9BVkFJTEFCTEVfQ09MVU1OO1xuICAgIH1cblxuICAgIGdldCB1c2VkX3RvZGF5X2NvbHVtbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuR1VFU1RfUEFTU19TSEVFVF9VU0VEX1RPREFZX0NPTFVNTjtcbiAgICB9XG5cbiAgICBnZXQgdXNlZF9zZWFzb25fY29sdW1uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5HVUVTVF9QQVNTX1NIRUVUX1VTRURfU0VBU09OX0NPTFVNTjtcbiAgICB9XG5cbiAgICBnZXQgbmFtZV9jb2x1bW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLkdVRVNUX1BBU1NfU0hFRVRfTkFNRV9DT0xVTU47XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQsIGV4Y2VsX3Jvd190b19pbmRleCB9IGZyb20gXCIuLi91dGlscy91dGlsXCI7XG5pbXBvcnQgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIgZnJvbSBcIi4uL3V0aWxzL2dvb2dsZV9zaGVldHNfc3ByZWFkc2hlZXRfdGFiXCI7XG5pbXBvcnQgeyBzYW5pdGl6ZV9kYXRlIH0gZnJvbSBcIi4uL3V0aWxzL2RhdGV0aW1lX3V0aWxcIjtcbmltcG9ydCB7IExvZ2luU2hlZXRDb25maWcsIFBhdHJvbGxlclJvd0NvbmZpZyB9IGZyb20gXCIuLi9lbnYvaGFuZGxlcl9jb25maWdcIjtcbmltcG9ydCB7IHNoZWV0c192NCB9IGZyb20gXCJnb29nbGVhcGlzXCI7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHJvdyBvZiBwYXRyb2xsZXIgZGF0YS5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IFBhdHJvbGxlclJvd1xuICogQHByb3BlcnR5IHtudW1iZXJ9IGluZGV4IC0gVGhlIGluZGV4IG9mIHRoZSByb3cuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwYXRyb2xsZXIuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gY2F0ZWdvcnkgLSBUaGUgY2F0ZWdvcnkgb2YgdGhlIHBhdHJvbGxlci5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBzZWN0aW9uIC0gVGhlIHNlY3Rpb24gb2YgdGhlIHBhdHJvbGxlci5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBjaGVja2luIC0gVGhlIGNoZWNrLWluIHN0YXR1cyBvZiB0aGUgcGF0cm9sbGVyLlxuICovXG5leHBvcnQgdHlwZSBQYXRyb2xsZXJSb3cgPSB7XG4gICAgaW5kZXg6IG51bWJlcjtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgY2F0ZWdvcnk6IHN0cmluZztcbiAgICBzZWN0aW9uOiBzdHJpbmc7XG4gICAgY2hlY2tpbjogc3RyaW5nO1xufTtcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBsb2dpbiBzaGVldCBpbiBHb29nbGUgU2hlZXRzLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dpblNoZWV0IHtcbiAgICBsb2dpbl9zaGVldDogR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWI7XG4gICAgY2hlY2tpbl9jb3VudF9zaGVldDogR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWI7XG4gICAgY29uZmlnOiBMb2dpblNoZWV0Q29uZmlnO1xuICAgIHJvd3M/OiBhbnlbXVtdIHwgbnVsbCA9IG51bGw7XG4gICAgY2hlY2tpbl9jb3VudDogbnVtYmVyIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgIHBhdHJvbGxlcnM6IFBhdHJvbGxlclJvd1tdID0gW107XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIExvZ2luU2hlZXQuXG4gICAgICogQHBhcmFtIHtzaGVldHNfdjQuU2hlZXRzIHwgbnVsbH0gc2hlZXRzX3NlcnZpY2UgLSBUaGUgR29vZ2xlIFNoZWV0cyBBUEkgc2VydmljZS5cbiAgICAgKiBAcGFyYW0ge0xvZ2luU2hlZXRDb25maWd9IGNvbmZpZyAtIFRoZSBjb25maWd1cmF0aW9uIGZvciB0aGUgbG9naW4gc2hlZXQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzIHwgbnVsbCxcbiAgICAgICAgY29uZmlnOiBMb2dpblNoZWV0Q29uZmlnXG4gICAgKSB7XG4gICAgICAgIHRoaXMubG9naW5fc2hlZXQgPSBuZXcgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIoXG4gICAgICAgICAgICBzaGVldHNfc2VydmljZSxcbiAgICAgICAgICAgIGNvbmZpZy5TSEVFVF9JRCxcbiAgICAgICAgICAgIGNvbmZpZy5MT0dJTl9TSEVFVF9MT09LVVBcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jaGVja2luX2NvdW50X3NoZWV0ID0gbmV3IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiKFxuICAgICAgICAgICAgc2hlZXRzX3NlcnZpY2UsXG4gICAgICAgICAgICBjb25maWcuU0hFRVRfSUQsXG4gICAgICAgICAgICBjb25maWcuQ0hFQ0tJTl9DT1VOVF9MT09LVVBcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVmcmVzaGVzIHRoZSBkYXRhIGZyb20gdGhlIEdvb2dsZSBTaGVldHMuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAgICovXG4gICAgYXN5bmMgcmVmcmVzaCgpIHtcbiAgICAgICAgdGhpcy5yb3dzID0gYXdhaXQgdGhpcy5sb2dpbl9zaGVldC5nZXRfdmFsdWVzKFxuICAgICAgICAgICAgdGhpcy5jb25maWcuTE9HSU5fU0hFRVRfTE9PS1VQXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY2hlY2tpbl9jb3VudCA9IChhd2FpdCB0aGlzLmNoZWNraW5fY291bnRfc2hlZXQuZ2V0X3ZhbHVlcyhcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLkNIRUNLSU5fQ09VTlRfTE9PS1VQXG4gICAgICAgICkpIVswXVswXTtcbiAgICAgICAgdGhpcy5wYXRyb2xsZXJzID0gdGhpcy5yb3dzIS5tYXAoKHgsIGkpID0+XG4gICAgICAgICAgICB0aGlzLnBhcnNlX3BhdHJvbGxlcl9yb3coaSwgeCwgdGhpcy5jb25maWcpXG4gICAgICAgICkuZmlsdGVyKCh4KSA9PiB4ICE9IG51bGwpIGFzIFBhdHJvbGxlclJvd1tdO1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiUmVmcmVzaGluZyBQYXRyb2xsZXJzOiBcIiApO1xuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMucGF0cm9sbGVycyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgYXJjaGl2ZWQgc3RhdHVzIG9mIHRoZSBsb2dpbiBzaGVldC5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc2hlZXQgaXMgYXJjaGl2ZWQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKi9cbiAgICBnZXQgYXJjaGl2ZWQoKSB7XG4gICAgICAgIGNvbnN0IGFyY2hpdmVkID0gbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQoXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5BUkNISVZFRF9DRUxMLFxuICAgICAgICAgICAgdGhpcy5yb3dzIVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgKGFyY2hpdmVkID09PSB1bmRlZmluZWQgJiYgdGhpcy5jaGVja2luX2NvdW50ID09PSAwKSB8fFxuICAgICAgICAgICAgYXJjaGl2ZWQudG9Mb3dlckNhc2UoKSA9PT0gXCJ5ZXNcIlxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGRhdGUgb2YgdGhlIHNoZWV0LlxuICAgICAqIEByZXR1cm5zIHtEYXRlfSBUaGUgZGF0ZSBvZiB0aGUgc2hlZXQuXG4gICAgICovXG4gICAgZ2V0IHNoZWV0X2RhdGUoKSB7XG4gICAgICAgIHJldHVybiBzYW5pdGl6ZV9kYXRlKFxuICAgICAgICAgICAgbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQodGhpcy5jb25maWcuU0hFRVRfREFURV9DRUxMLCB0aGlzLnJvd3MhKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGN1cnJlbnQgZGF0ZS5cbiAgICAgKiBAcmV0dXJucyB7RGF0ZX0gVGhlIGN1cnJlbnQgZGF0ZS5cbiAgICAgKi9cbiAgICBnZXQgY3VycmVudF9kYXRlKCkge1xuICAgICAgICByZXR1cm4gc2FuaXRpemVfZGF0ZShcbiAgICAgICAgICAgIGxvb2t1cF9yb3dfY29sX2luX3NoZWV0KHRoaXMuY29uZmlnLkNVUlJFTlRfREFURV9DRUxMLCB0aGlzLnJvd3MhKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGUgc2hlZXQgZGF0ZSBpcyB0aGUgY3VycmVudCBkYXRlLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzaGVldCBkYXRlIGlzIHRoZSBjdXJyZW50IGRhdGUsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKi9cbiAgICBnZXQgaXNfY3VycmVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hlZXRfZGF0ZS5nZXRUaW1lKCkgPT09IHRoaXMuY3VycmVudF9kYXRlLmdldFRpbWUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmllcyB0byBmaW5kIGEgcGF0cm9sbGVyIGJ5IG5hbWUuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcGF0cm9sbGVyLlxuICAgICAqIEByZXR1cm5zIHtQYXRyb2xsZXJSb3cgfCBcIm5vdF9mb3VuZFwifSBUaGUgcGF0cm9sbGVyIHJvdyBvciBcIm5vdF9mb3VuZFwiLlxuICAgICAqL1xuICAgIHRyeV9maW5kX3BhdHJvbGxlcihuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgcGF0cm9sbGVycyA9IHRoaXMucGF0cm9sbGVycy5maWx0ZXIoKHgpID0+IHgubmFtZSA9PT0gbmFtZSk7XG4gICAgICAgIGlmIChwYXRyb2xsZXJzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIFwibm90X2ZvdW5kXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhdHJvbGxlcnNbMF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcGF0cm9sbGVycyB3aG8gYXJlIG9uIGR1dHkuXG4gICAgICogQHJldHVybnMge1BhdHJvbGxlclJvd1tdfSBUaGUgbGlzdCBvZiBvbi1kdXR5IHBhdHJvbGxlcnMuXG4gICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBsb2dpbiBzaGVldCBpcyBub3QgY3VycmVudC5cbiAgICAgKi9cbiAgICBnZXRfb25fZHV0eV9wYXRyb2xsZXJzKCk6IFBhdHJvbGxlclJvd1tdIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzX2N1cnJlbnQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxvZ2luIHNoZWV0IGlzIG5vdCBjdXJyZW50XCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnBhdHJvbGxlcnMuZmlsdGVyKCh4KSA9PiB4LmNoZWNraW4pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpbiBhIHBhdHJvbGxlciB3aXRoIGEgbmV3IGNoZWNrLWluIHZhbHVlLlxuICAgICAqIEBwYXJhbSB7UGF0cm9sbGVyUm93fSBwYXRyb2xsZXJfc3RhdHVzIC0gVGhlIHN0YXR1cyBvZiB0aGUgcGF0cm9sbGVyLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuZXdfY2hlY2tpbl92YWx1ZSAtIFRoZSBuZXcgY2hlY2staW4gdmFsdWUuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBsb2dpbiBzaGVldCBpcyBub3QgY3VycmVudC5cbiAgICAgKi9cbiAgICBhc3luYyBjaGVja2luKHBhdHJvbGxlcl9zdGF0dXM6IFBhdHJvbGxlclJvdywgbmV3X2NoZWNraW5fdmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAoIXRoaXMuaXNfY3VycmVudCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTG9naW4gc2hlZXQgaXMgbm90IGN1cnJlbnRcIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coYEV4aXN0aW5nIHN0YXR1czogJHtKU09OLnN0cmluZ2lmeShwYXRyb2xsZXJfc3RhdHVzKX1gKTtcblxuICAgICAgICBjb25zdCByb3cgPSBwYXRyb2xsZXJfc3RhdHVzLmluZGV4ICsgMTsgLy8gcHJvZ3JhbW1pbmcgLT4gZXhjZWwgbG9va3VwXG4gICAgICAgIGNvbnN0IHJhbmdlID0gYCR7dGhpcy5jb25maWcuQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU59JHtyb3d9YDtcblxuICAgICAgICBhd2FpdCB0aGlzLmxvZ2luX3NoZWV0LnVwZGF0ZV92YWx1ZXMocmFuZ2UsIFtbbmV3X2NoZWNraW5fdmFsdWVdXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXNzaWducyBhIHNlY3Rpb24gdG8gYSBwYXRyb2xsZXIuXG4gICAgICogQHBhcmFtIHBhdHJvbGxlcl9zZWN0aW9uIFRoZSByb3cgZm9yIHRoZSBwYXRyb2xsZXIgdGhhdCBuZWVkcyB0byBoYXZlIGEgc2VjdGlvbiBhc3NpZ25lZCB0by5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmV3X3NlY3Rpb25fdmFsdWUgLSBUaGUgbmV3IHNlY3Rpb24gdmFsdWUuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBsb2dpbiBzaGVldCBpcyBub3QgY3VycmVudC5cbiAgICAgKi9cbiAgICBhc3luYyBhc3NpZ25fc2VjdGlvbihwYXRyb2xsZXJfc2VjdGlvbjogUGF0cm9sbGVyUm93LCBuZXdfc2VjdGlvbl92YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICghdGhpcy5pc19jdXJyZW50KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJMb2dpbiBzaGVldCBpcyBub3QgY3VycmVudFwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhgRXhpc3Rpbmcgc3RhdHVzOiAke0pTT04uc3RyaW5naWZ5KHBhdHJvbGxlcl9zZWN0aW9uKX1gKTtcblxuICAgICAgICBjb25zdCByb3cgPSBwYXRyb2xsZXJfc2VjdGlvbi5pbmRleCArIDE7IC8vIHByb2dyYW1taW5nIC0+IGV4Y2VsIGxvb2t1cFxuICAgICAgICBjb25zdCByYW5nZSA9IGAke3RoaXMuY29uZmlnLlNFQ1RJT05fRFJPUERPV05fQ09MVU1OfSR7cm93fWA7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5sb2dpbl9zaGVldC51cGRhdGVfdmFsdWVzKHJhbmdlLCBbW25ld19zZWN0aW9uX3ZhbHVlXV0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlcyBhIHJvdyBvZiBwYXRyb2xsZXIgZGF0YS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggLSBUaGUgaW5kZXggb2YgdGhlIHJvdy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSByb3cgLSBUaGUgcm93IGRhdGEuXG4gICAgICogQHBhcmFtIHtQYXRyb2xsZXJSb3dDb25maWd9IG9wdHMgLSBUaGUgY29uZmlndXJhdGlvbiBvcHRpb25zIGZvciB0aGUgcGF0cm9sbGVyIHJvdy5cbiAgICAgKiBAcmV0dXJucyB7UGF0cm9sbGVyUm93IHwgbnVsbH0gVGhlIHBhcnNlZCBwYXRyb2xsZXIgcm93IG9yIG51bGwgaWYgaW52YWxpZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHBhcnNlX3BhdHJvbGxlcl9yb3coXG4gICAgICAgIGluZGV4OiBudW1iZXIsXG4gICAgICAgIHJvdzogc3RyaW5nW10sXG4gICAgICAgIG9wdHM6IFBhdHJvbGxlclJvd0NvbmZpZ1xuICAgICk6IFBhdHJvbGxlclJvdyB8IG51bGwge1xuICAgICAgICBpZiAocm93Lmxlbmd0aCA8IDQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbmRleCA8IDMpe1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIG5hbWU6IHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5OQU1FX0NPTFVNTildLFxuICAgICAgICAgICAgY2F0ZWdvcnk6IHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5DQVRFR09SWV9DT0xVTU4pXSxcbiAgICAgICAgICAgIHNlY3Rpb246IHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5TRUNUSU9OX0RST1BET1dOX0NPTFVNTildLFxuICAgICAgICAgICAgY2hlY2tpbjogcm93W2V4Y2VsX3Jvd190b19pbmRleChvcHRzLkNIRUNLSU5fRFJPUERPV05fQ09MVU1OKV0sXG4gICAgICAgIH07XG4gICAgfVxufSIsImltcG9ydCB7c2hlZXRzX3Y0fSBmcm9tIFwiZ29vZ2xlYXBpc1wiO1xuaW1wb3J0IHtTZWFzb25TaGVldENvbmZpZyx9IGZyb20gXCIuLi9lbnYvaGFuZGxlcl9jb25maWdcIjtcbmltcG9ydCB7ZXhjZWxfcm93X3RvX2luZGV4fSBmcm9tIFwiLi4vdXRpbHMvdXRpbFwiO1xuaW1wb3J0IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiIGZyb20gXCIuLi91dGlscy9nb29nbGVfc2hlZXRzX3NwcmVhZHNoZWV0X3RhYlwiO1xuaW1wb3J0IHtmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9jdXJyZW50X2RheX0gZnJvbSBcIi4uL3V0aWxzL2RhdGV0aW1lX3V0aWxcIjtcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBzZWFzb24gc2hlZXQgaW4gR29vZ2xlIFNoZWV0cy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2Vhc29uU2hlZXQge1xuICAgIHNoZWV0OiBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYjtcbiAgICBjb25maWc6IFNlYXNvblNoZWV0Q29uZmlnO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBTZWFzb25TaGVldC5cbiAgICAgKiBAcGFyYW0ge3NoZWV0c192NC5TaGVldHMgfCBudWxsfSBzaGVldHNfc2VydmljZSAtIFRoZSBHb29nbGUgU2hlZXRzIEFQSSBzZXJ2aWNlLlxuICAgICAqIEBwYXJhbSB7U2Vhc29uU2hlZXRDb25maWd9IGNvbmZpZyAtIFRoZSBjb25maWd1cmF0aW9uIGZvciB0aGUgc2Vhc29uIHNoZWV0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyB8IG51bGwsXG4gICAgICAgIGNvbmZpZzogU2Vhc29uU2hlZXRDb25maWdcbiAgICApIHtcbiAgICAgICAgdGhpcy5zaGVldCA9IG5ldyBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYihcbiAgICAgICAgICAgIHNoZWV0c19zZXJ2aWNlLFxuICAgICAgICAgICAgY29uZmlnLlNIRUVUX0lELFxuICAgICAgICAgICAgY29uZmlnLlNFQVNPTl9TSEVFVFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBudW1iZXIgb2YgZGF5cyBwYXRyb2xsZWQgYnkgYSBwYXRyb2xsZXIuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdHJvbGxlcl9uYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHBhdHJvbGxlci5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxudW1iZXI+fSBUaGUgbnVtYmVyIG9mIGRheXMgcGF0cm9sbGVkLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF9wYXRyb2xsZWRfZGF5cyhcbiAgICAgICAgcGF0cm9sbGVyX25hbWU6IHN0cmluZ1xuICAgICk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgICAgIGNvbnN0IHBhdHJvbGxlcl9yb3cgPSBhd2FpdCB0aGlzLnNoZWV0LmdldF9zaGVldF9yb3dfZm9yX3BhdHJvbGxlcihcbiAgICAgICAgICAgIHBhdHJvbGxlcl9uYW1lLFxuICAgICAgICAgICAgdGhpcy5jb25maWcuU0VBU09OX1NIRUVUX05BTUVfQ09MVU1OXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKCFwYXRyb2xsZXJfcm93KSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjdXJyZW50TnVtYmVyID1cbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cucm93W2V4Y2VsX3Jvd190b19pbmRleCh0aGlzLmNvbmZpZy5TRUFTT05fU0hFRVRfREFZU19DT0xVTU4pXTtcblxuICAgICAgICBjb25zdCBjdXJyZW50RGF5ID0gZmlsdGVyX2xpc3RfdG9fZW5kc3dpdGhfY3VycmVudF9kYXkocGF0cm9sbGVyX3Jvdy5yb3cpXG4gICAgICAgICAgICAubWFwKCh4KSA9PiAoeD8uc3RhcnRzV2l0aChcIkhcIikgPyAwLjUgOiAxKSlcbiAgICAgICAgICAgIC5yZWR1Y2UoKHgsIHksIGkpID0+IHggKyB5LCAwKTtcblxuICAgICAgICByZXR1cm4gY3VycmVudE51bWJlciAtIGN1cnJlbnREYXk7XG4gICAgfVxufSIsImltcG9ydCB7c2hlZXRzX3Y0fSBmcm9tIFwiZ29vZ2xlYXBpc1wiO1xuaW1wb3J0IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiIGZyb20gXCIuLi91dGlscy9nb29nbGVfc2hlZXRzX3NwcmVhZHNoZWV0X3RhYlwiO1xuaW1wb3J0IHtTbGVkQmVhY29uQ29uZmlnfSBmcm9tIFwiLi4vZW52L2hhbmRsZXJfY29uZmlnXCI7XG5pbXBvcnQge2V4Y2VsX3Jvd190b19pbmRleCwgcm93X2NvbF90b19leGNlbF9pbmRleH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxcIjtcbmltcG9ydCB7QlZOU1BSZXNwb25zZX0gZnJvbSBcIi4uL2hhbmRsZXJzL2J2bnNwX2hhbmRsZXJcIjtcbmltcG9ydCB7Zm9ybWF0X2RhdGVfZm9yX3NwcmVhZHNoZWV0X3ZhbHVlfSBmcm9tIFwiLi4vdXRpbHMvZGF0ZXRpbWVfdXRpbFwiO1xuXG5cbmV4cG9ydCBjbGFzcyBCZWFjb25TZWFyY2hlcyB7XG4gICAgcm93OiBhbnlbXTtcbiAgICBpbmRleDogbnVtYmVyO1xuICAgIHNlYXJjaF9jb3VudDogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHJvdzogYW55W10sXG4gICAgICAgIGluZGV4OiBudW1iZXIsXG4gICAgICAgIHNlYXJjaF9jb3VudDogYW55XG4gICAgKSB7XG4gICAgICAgIHRoaXMucm93ID0gcm93O1xuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgICAgIHRoaXMuc2VhcmNoX2NvdW50ID0gTnVtYmVyKHNlYXJjaF9jb3VudCk7XG4gICAgfVxufVxuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhIFNsZWQgQmVhY29uIENoZWNrIFNoZWV0IGluIEdvb2dsZSBTaGVldHNcbiAqL1xuZXhwb3J0ICBjbGFzcyBTbGVkQmVhY29uQ2hlY2tTaGVldCAge1xuICAgIHNsZWRfYmVhY29uX2NoZWNrX3NoZWV0OiBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYjtcbiAgICBjb25maWc6IFNsZWRCZWFjb25Db25maWdcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgTG9naW5TaGVldC5cbiAgICAgKiBAcGFyYW0ge3NoZWV0c192NC5TaGVldHMgfCBudWxsfSBzaGVldHNfc2VydmljZSAtIFRoZSBHb29nbGUgU2hlZXRzIEFQSSBzZXJ2aWNlLlxuICAgICAqIEBwYXJhbSB7U2xlZEJlYWNvbkNvbmZpZ30gY29uZmlnIC0gVGhlIGNvbmZpZ3VyYXRpb24gZm9yIHRoaXMgc2hlZXQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzIHwgbnVsbCxcbiAgICAgICAgY29uZmlnOiBTbGVkQmVhY29uQ29uZmlnXG4gICAgKSB7XG4gICAgICAgIHRoaXMuc2xlZF9iZWFjb25fY2hlY2tfc2hlZXQgPSBuZXcgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIoXG4gICAgICAgICAgICBzaGVldHNfc2VydmljZSxcbiAgICAgICAgICAgIGNvbmZpZy5TSEVFVF9JRCxcbiAgICAgICAgICAgIGNvbmZpZy5TTEVEX0JFQUNPTl9TSEVFVFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICB9XG5cbiAgICBnZXQgc3RhcnRfaW5kZXgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGV4Y2VsX3Jvd190b19pbmRleChcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLkJFQUNPTl9GSU5EX0RBVEVTX1NUQVJUSU5HX0NPTFVNTlxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldCBzaGVldF9uYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5TTEVEX0JFQUNPTl9TSEVFVDtcbiAgICB9XG5cbiAgICBnZXQgbmFtZV9jb2x1bW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLlNMRURfQkVBQ09OX1NIRUVUX05BTUVfQ09MVU1OO1xuICAgIH1cblxuICAgIGdldCBiZWFjb25fc2VhcmNoX2NvdW50X2NvbHVtbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuQkVBQ09OX1NFQVJDSF9DT1VOVF9DT0xVTU47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBjdXJyZW50IHNlYXJjaGVzIGZvciB0aGUgZ2l2ZW4gcGF0cm9sbGVyXG4gICAgICogQHBhcmFtIHBhdHJvbGxlcl9uYW1lXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X2JlYWNvbl9zZWFyY2hlcyhcbiAgICAgICAgcGF0cm9sbGVyX25hbWU6IHN0cmluZ1xuICAgICk6IFByb21pc2U8QmVhY29uU2VhcmNoZXMgfCBudWxsPiB7XG4gICAgICAgIGNvbnN0IHBhdHJvbGxlcl9yb3cgPSBhd2FpdCB0aGlzLnNsZWRfYmVhY29uX2NoZWNrX3NoZWV0LmdldF9zaGVldF9yb3dfZm9yX3BhdHJvbGxlcihcbiAgICAgICAgICAgIHBhdHJvbGxlcl9uYW1lLFxuICAgICAgICAgICAgdGhpcy5uYW1lX2NvbHVtblxuICAgICAgICApO1xuICAgICAgICBpZiAocGF0cm9sbGVyX3JvdyA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZWFyY2hfY291bnQgPSBwYXRyb2xsZXJfcm93LnJvd1tleGNlbF9yb3dfdG9faW5kZXgodGhpcy5iZWFjb25fc2VhcmNoX2NvdW50X2NvbHVtbildO1xuICAgICAgICByZXR1cm4gbmV3IEJlYWNvblNlYXJjaGVzKFxuICAgICAgICAgICAgcGF0cm9sbGVyX3Jvdy5yb3csXG4gICAgICAgICAgICBwYXRyb2xsZXJfcm93LmluZGV4LFxuICAgICAgICAgICAgc2VhcmNoX2NvdW50XG4gICAgICAgICk7XG5cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG51bWJlciBvZiBiZWFjb24gZmluZHMgYnkgYSBwYXRyb2xsZXIuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdHJvbGxlcl9uYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHBhdHJvbGxlci5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxudW1iZXI+fSBUaGUgbnVtYmVyIG9mIHRpbWVzIHRoaXMgcGF0cm9sbGVyIGZvdW5kIGEgYmVhY29ucy5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfcGF0cm9sbGVkX2JlYWNvbl9maW5kX2NvdW50KFxuICAgICAgICBwYXRyb2xsZXJfbmFtZTogc3RyaW5nXG4gICAgKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICAgICAgY29uc3QgcGF0cm9sbGVyX3JvdyA9IGF3YWl0IHRoaXMuc2xlZF9iZWFjb25fY2hlY2tfc2hlZXQuZ2V0X3NoZWV0X3Jvd19mb3JfcGF0cm9sbGVyKFxuICAgICAgICAgICAgcGF0cm9sbGVyX25hbWUsXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5TTEVEX0JFQUNPTl9TSEVFVF9OQU1FX0NPTFVNTlxuICAgICAgICApO1xuXG4gICAgICAgIGlmICghcGF0cm9sbGVyX3Jvdykge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhdHJvbGxlcl9yb3cucm93W2V4Y2VsX3Jvd190b19pbmRleCh0aGlzLmNvbmZpZy5CRUFDT05fU0VBUkNIX0NPVU5UX0NPTFVNTildO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlY29yZCBhIG5ldyBiZWFjb24gc2VhcmNoIGZvciB0b2RheSBhdCB0aGUgc3BlY2lmaWVkIGxvY2F0aW9uLlxuICAgICAqIEBwYXJhbSBwYXRyb2xsZXJfcm93XG4gICAgICogQHBhcmFtIHNlYXJjaF9sb2NhdGlvblxuICAgICAqL1xuICAgIGFzeW5jIHNldF9iZWFjb25zX3NlYXJjaGVzKFxuICAgICAgICBwYXRyb2xsZXJfcm93OiBCZWFjb25TZWFyY2hlcyxcbiAgICAgICAgc2VhcmNoX2xvY2F0aW9uOiBzdHJpbmdcbiAgICApIHtcbiAgICAgICAgY29uc3QgIHJvd19udW0gPSBwYXRyb2xsZXJfcm93LmluZGV4O1xuICAgICAgICBjb25zdCBzdGFydF9pbmRleCA9IHRoaXMuc3RhcnRfaW5kZXg7XG4gICAgICAgIGNvbnN0IHByaW9yX2xlbmd0aCA9IHBhdHJvbGxlcl9yb3cucm93Lmxlbmd0aCAtIHN0YXJ0X2luZGV4O1xuICAgICAgICBjb25zdCBjdXJyZW50X2RhdGVfc3RyaW5nID0gZm9ybWF0X2RhdGVfZm9yX3NwcmVhZHNoZWV0X3ZhbHVlKG5ldyBEYXRlKCkpO1xuXG4gICAgICAgIGxldCBuZXdfdmFscyA9IHBhdHJvbGxlcl9yb3cucm93XG4gICAgICAgICAgICAuc2xpY2Uoc3RhcnRfaW5kZXgpXG4gICAgICAgICAgICAubWFwKCh4KSA9PiB4Py50b1N0cmluZygpKTtcblxuICAgICAgICAvLyBSZWNvcmQgIHRoZSBkYXRlIG9mIHRoZSBzZWFyY2ggYW5kIHRoZSBsb2NhdGlvblxuICAgICAgICBuZXdfdmFscy5wdXNoKGN1cnJlbnRfZGF0ZV9zdHJpbmcrIFwiLFwiICsgc2VhcmNoX2xvY2F0aW9uKTtcblxuICAgICAgICBjb25zdCB1cGRhdGVfbGVuZ3RoID0gTWF0aC5tYXgocHJpb3JfbGVuZ3RoLCBuZXdfdmFscy5sZW5ndGgpO1xuICAgICAgICB3aGlsZSAobmV3X3ZhbHMubGVuZ3RoIDwgdXBkYXRlX2xlbmd0aCkge1xuICAgICAgICAgICAgbmV3X3ZhbHMucHVzaChcIlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGVuZF9pbmRleCA9IHN0YXJ0X2luZGV4ICsgdXBkYXRlX2xlbmd0aCAtIDE7XG4gICAgICAgIGNvbnN0IHJhbmdlID0gYCR7dGhpcy5zbGVkX2JlYWNvbl9jaGVja19zaGVldC5zaGVldF9uYW1lfSEke3Jvd19jb2xfdG9fZXhjZWxfaW5kZXgoXG4gICAgICAgICAgICByb3dfbnVtLFxuICAgICAgICAgICAgc3RhcnRfaW5kZXhcbiAgICAgICAgKX06JHtyb3dfY29sX3RvX2V4Y2VsX2luZGV4KHJvd19udW0sIGVuZF9pbmRleCl9YDtcblxuICAgICAgICBjb25zb2xlLmxvZyhgVXBkYXRpbmcgJHtyYW5nZX0gd2l0aCAke25ld192YWxzLmxlbmd0aH0gdmFsdWVzYCk7XG4gICAgICAgIGF3YWl0IHRoaXMuc2xlZF9iZWFjb25fY2hlY2tfc2hlZXQudXBkYXRlX3ZhbHVlcyhyYW5nZSwgW25ld192YWxzXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2UgbG9jYXRpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYm9keSAtIHRoZSBib2R5IG9mIHRoZSByZXF1ZXN0XG4gICAgICogQHJldHVybnMge3N0cmluZyB8IG51bGx9IFRoZSBzZWFyY2ggbG9jYXRpb24gaWYgdGhlIGxvY2F0aW9uIGlzIHZhbGlkXG4gICAgICovXG4gICAgcGFyc2VfbG9jYXRpb24oYm9keTogc3RyaW5nIHwgbnVsbCk6IHN0cmluZyB8bnVsbCAge1xuICAgICAgICBpZiAoYm9keSA9PT0gbnVsbCApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmNsZWFuU21zVmFsdWUoYm9keSk7XG4gICAgfVxuXG4gICAgY2xlYW5TbXNWYWx1ZShpbnB1dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKCFpbnB1dCkgcmV0dXJuICcnO1xuXG4gICAgICAgIGxldCBjbGVhbmVkID0gaW5wdXQudHJpbSgpO1xuXG4gICAgICAgIC8vIDEuIFJlbW92ZSBmb3JtdWxhIHRyaWdnZXJzIGZyb20gdGhlIGJlZ2lubmluZyBvZiB0aGUgc3RyaW5nXG4gICAgICAgIC8vIExvb3BzIHRvIGNhdGNoIGVkZ2UgY2FzZXMgbGlrZSBcIj09Q2xpY2sgaGVyZVwiIG9yIFwiKysxXCJcbiAgICAgICAgd2hpbGUgKFsnPScsICcrJywgJy0nLCAnQCddLmluY2x1ZGVzKGNsZWFuZWQuY2hhckF0KDApKSkge1xuICAgICAgICAgICAgY2xlYW5lZCA9IGNsZWFuZWQuc3Vic3RyaW5nKDEpLnRyaW0oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIDIuIFN0cmlwIGxpbmUgYnJlYWtzLCB0YWJzLCBhbmQgaW52aXNpYmxlIGNvbnRyb2wgY2hhcmFjdGVycyAoXFx4MDAtXFx4MUYsIFxceDdGKVxuICAgICAgICAvLyBUaGlzIHByZXZlbnRzIHRoZSBTTVMgcmVwbHkgZnJvbSBicmVha2luZyBvbnRvIG5ldyBsaW5lcyB1bmV4cGVjdGVkbHlcbiAgICAgICAgY2xlYW5lZCA9IGNsZWFuZWQucmVwbGFjZSgvW1xcclxcblxcdFxceDAwLVxceDFGXFx4N0ZdL2csICcgJyk7XG5cbiAgICAgICAgLy8gMy4gQ29sbGFwc2UgbXVsdGlwbGUgc3BhY2VzIGludG8gYSBzaW5nbGUgc3BhY2VcbiAgICAgICAgY2xlYW5lZCA9IGNsZWFuZWQucmVwbGFjZSgvXFxzKy9nLCAnICcpLnRyaW0oKTtcblxuICAgICAgICByZXR1cm4gY2xlYW5lZDtcbiAgICB9XG5cbn0iLCJpbXBvcnQge2dvb2dsZX0gZnJvbSBcImdvb2dsZWFwaXNcIjtcbmltcG9ydCB7R2VuZXJhdGVBdXRoVXJsT3B0c30gZnJvbSBcImdvb2dsZS1hdXRoLWxpYnJhcnlcIjtcbmltcG9ydCB7T0F1dGgyQ2xpZW50fSBmcm9tIFwiZ29vZ2xlYXBpcy1jb21tb25cIjtcbmltcG9ydCB7c2FuaXRpemVfcGhvbmVfbnVtYmVyfSBmcm9tIFwiLi91dGlscy91dGlsXCI7XG5pbXBvcnQge2xvYWRfY3JlZGVudGlhbHNfZmlsZXN9IGZyb20gXCIuL3V0aWxzL2ZpbGVfdXRpbHNcIjtcbmltcG9ydCB7U2VydmljZUNvbnRleHR9IGZyb20gXCJAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzL3R5cGVzXCI7XG5pbXBvcnQge1VzZXJDcmVkc0NvbmZpZ30gZnJvbSBcIi4vZW52L2hhbmRsZXJfY29uZmlnXCI7XG5pbXBvcnQge3ZhbGlkYXRlX3Njb3Blc30gZnJvbSBcIi4vdXRpbHMvc2NvcGVfdXRpbFwiO1xuXG5jb25zdCBTQ09QRVMgPSBbXG4gICAgXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3NjcmlwdC5wcm9qZWN0c1wiLFxuICAgIFwiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9zcHJlYWRzaGVldHNcIixcbl07XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIHVzZXIgY3JlZGVudGlhbHMgZm9yIEdvb2dsZSBPQXV0aDIuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXJDcmVkcyB7XG4gICAgbnVtYmVyOiBzdHJpbmc7XG4gICAgb2F1dGgyX2NsaWVudDogT0F1dGgyQ2xpZW50O1xuICAgIHN5bmNfY2xpZW50OiBTZXJ2aWNlQ29udGV4dDtcbiAgICBkb21haW4/OiBzdHJpbmc7XG4gICAgbG9hZGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBVc2VyQ3JlZHMgaW5zdGFuY2UuXG4gICAgICogQHBhcmFtIHtTZXJ2aWNlQ29udGV4dH0gc3luY19jbGllbnQgLSBUaGUgVHdpbGlvIFN5bmMgY2xpZW50LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgdW5kZWZpbmVkfSBudW1iZXIgLSBUaGUgdXNlcidzIHBob25lIG51bWJlci5cbiAgICAgKiBAcGFyYW0ge1VzZXJDcmVkc0NvbmZpZ30gb3B0cyAtIFRoZSB1c2VyIGNyZWRlbnRpYWxzIGNvbmZpZ3VyYXRpb24uXG4gICAgICogQHRocm93cyB7RXJyb3J9IFRocm93cyBhbiBlcnJvciBpZiB0aGUgbnVtYmVyIGlzIHVuZGVmaW5lZCBvciBudWxsLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBzeW5jX2NsaWVudDogU2VydmljZUNvbnRleHQsXG4gICAgICAgIG51bWJlcjogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgICAgICBvcHRzOiBVc2VyQ3JlZHNDb25maWdcbiAgICApIHtcbiAgICAgICAgaWYgKG51bWJlciA9PT0gdW5kZWZpbmVkIHx8IG51bWJlciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTnVtYmVyIGlzIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm51bWJlciA9IHNhbml0aXplX3Bob25lX251bWJlcihudW1iZXIpO1xuXG4gICAgICAgIGNvbnN0IGNyZWRlbnRpYWxzID0gbG9hZF9jcmVkZW50aWFsc19maWxlcygpO1xuICAgICAgICBjb25zdCB7IGNsaWVudF9zZWNyZXQsIGNsaWVudF9pZCwgcmVkaXJlY3RfdXJpcyB9ID0gY3JlZGVudGlhbHMud2ViO1xuICAgICAgICB0aGlzLm9hdXRoMl9jbGllbnQgPSBuZXcgZ29vZ2xlLmF1dGguT0F1dGgyKFxuICAgICAgICAgICAgY2xpZW50X2lkLFxuICAgICAgICAgICAgY2xpZW50X3NlY3JldCxcbiAgICAgICAgICAgIHJlZGlyZWN0X3VyaXNbMF1cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zeW5jX2NsaWVudCA9IHN5bmNfY2xpZW50O1xuICAgICAgICBsZXQgZG9tYWluID0gb3B0cy5OU1BfRU1BSUxfRE9NQUlOO1xuICAgICAgICBpZiAoZG9tYWluID09PSB1bmRlZmluZWQgfHwgZG9tYWluID09PSBudWxsIHx8IGRvbWFpbiA9PT0gXCJcIikge1xuICAgICAgICAgICAgZG9tYWluID0gdW5kZWZpbmVkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kb21haW4gPSBkb21haW47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2FkIHRoZSBPQXV0aDIgdG9rZW4uXG4gICAgICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgYm9vbGVhbiBpbmRpY2F0aW5nIGlmIHRoZSB0b2tlbiB3YXMgbG9hZGVkLlxuICAgICAqL1xuICAgIGFzeW5jIGxvYWRUb2tlbigpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgaWYgKCF0aGlzLmxvYWRlZCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgTG9va2luZyBmb3IgJHt0aGlzLnRva2VuX2tleX1gKTtcbiAgICAgICAgICAgICAgICBjb25zdCBvYXV0aDJEb2MgPSBhd2FpdCB0aGlzLnN5bmNfY2xpZW50XG4gICAgICAgICAgICAgICAgICAgIC5kb2N1bWVudHModGhpcy50b2tlbl9rZXkpXG4gICAgICAgICAgICAgICAgICAgIC5mZXRjaCgpO1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgb2F1dGgyRG9jID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICAgICAgb2F1dGgyRG9jLmRhdGEgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgICAgIG9hdXRoMkRvYy5kYXRhLnRva2VuID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYERpZG4ndCBmaW5kICR7dGhpcy50b2tlbl9rZXl9YCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBvYXV0aDJEb2MuZGF0YS50b2tlbjtcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGVfc2NvcGVzKG9hdXRoMkRvYy5kYXRhLnNjb3BlcywgU0NPUEVTKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vYXV0aDJfY2xpZW50LnNldENyZWRlbnRpYWxzKHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYExvYWRlZCB0b2tlbiAke3RoaXMudG9rZW5fa2V5fWApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgICAgICBgRmFpbGVkIHRvIGxvYWQgdG9rZW4gZm9yICR7dGhpcy50b2tlbl9rZXl9LlxcbiAke2V9YFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZGVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdG9rZW4ga2V5LlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSB0b2tlbiBrZXkuXG4gICAgICovXG4gICAgZ2V0IHRva2VuX2tleSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYG9hdXRoMl8ke3RoaXMubnVtYmVyfWA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVsZXRlIHRoZSBPQXV0aDIgdG9rZW4uXG4gICAgICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgYm9vbGVhbiBpbmRpY2F0aW5nIGlmIHRoZSB0b2tlbiB3YXMgZGVsZXRlZC5cbiAgICAgKi9cbiAgICBhc3luYyBkZWxldGVUb2tlbigpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgY29uc3Qgb2F1dGgyRG9jID0gYXdhaXQgdGhpcy5zeW5jX2NsaWVudFxuICAgICAgICAgICAgLmRvY3VtZW50cyh0aGlzLnRva2VuX2tleSlcbiAgICAgICAgICAgIC5mZXRjaCgpO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICBvYXV0aDJEb2MgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgb2F1dGgyRG9jLmRhdGEgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICBvYXV0aDJEb2MuZGF0YS50b2tlbiA9PT0gdW5kZWZpbmVkXG4gICAgICAgICkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYERpZG4ndCBmaW5kICR7dGhpcy50b2tlbl9rZXl9YCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgdGhpcy5zeW5jX2NsaWVudC5kb2N1bWVudHMob2F1dGgyRG9jLnNpZCkucmVtb3ZlKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBEZWxldGVkIHRva2VuICR7dGhpcy50b2tlbl9rZXl9YCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbXBsZXRlIHRoZSBsb2dpbiBwcm9jZXNzIGJ5IGV4Y2hhbmdpbmcgdGhlIGF1dGhvcml6YXRpb24gY29kZSBmb3IgYSB0b2tlbi5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29kZSAtIFRoZSBhdXRob3JpemF0aW9uIGNvZGUuXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gc2NvcGVzIC0gVGhlIHNjb3BlcyB0byB2YWxpZGF0ZS5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgbG9naW4gcHJvY2VzcyBpcyBjb21wbGV0ZS5cbiAgICAgKi9cbiAgICBhc3luYyBjb21wbGV0ZUxvZ2luKGNvZGU6IHN0cmluZywgc2NvcGVzOiBzdHJpbmdbXSk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICB2YWxpZGF0ZV9zY29wZXMoc2NvcGVzLCBTQ09QRVMpO1xuICAgICAgICBjb25zdCB0b2tlbiA9IGF3YWl0IHRoaXMub2F1dGgyX2NsaWVudC5nZXRUb2tlbihjb2RlKTtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoT2JqZWN0LmtleXModG9rZW4ucmVzISkpKTtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodG9rZW4udG9rZW5zKSk7XG4gICAgICAgIHRoaXMub2F1dGgyX2NsaWVudC5zZXRDcmVkZW50aWFscyh0b2tlbi50b2tlbnMpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3Qgb2F1dGhEb2MgPSBhd2FpdCB0aGlzLnN5bmNfY2xpZW50LmRvY3VtZW50cy5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6IHsgdG9rZW46IHRva2VuLnRva2Vucywgc2NvcGVzOiBzY29wZXMgfSxcbiAgICAgICAgICAgICAgICB1bmlxdWVOYW1lOiB0aGlzLnRva2VuX2tleSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICBgRXhjZXB0aW9uIHdoZW4gY3JlYXRpbmcgb2F1dGguIFRyeWluZyB0byB1cGRhdGUgaW5zdGVhZC4uLlxcbiR7ZX1gXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29uc3Qgb2F1dGhEb2MgPSBhd2FpdCB0aGlzLnN5bmNfY2xpZW50XG4gICAgICAgICAgICAgICAgLmRvY3VtZW50cyh0aGlzLnRva2VuX2tleSlcbiAgICAgICAgICAgICAgICAudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogeyB0b2tlbjogdG9rZW4sIHNjb3Blczogc2NvcGVzIH0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGF1dGhvcml6YXRpb24gVVJMLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHN0cmluZz59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSBhdXRob3JpemF0aW9uIFVSTC5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRBdXRoVXJsKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIGNvbnN0IGlkID0gdGhpcy5nZW5lcmF0ZVJhbmRvbVN0cmluZygpO1xuICAgICAgICBjb25zb2xlLmxvZyhgVXNpbmcgbm9uY2UgJHtpZH0gZm9yICR7dGhpcy5udW1iZXJ9YCk7XG4gICAgICAgIGNvbnN0IGRvYyA9IGF3YWl0IHRoaXMuc3luY19jbGllbnQuZG9jdW1lbnRzLmNyZWF0ZSh7XG4gICAgICAgICAgICBkYXRhOiB7IG51bWJlcjogdGhpcy5udW1iZXIsIHNjb3BlczogU0NPUEVTIH0sXG4gICAgICAgICAgICB1bmlxdWVOYW1lOiBpZCxcbiAgICAgICAgICAgIHR0bDogNjAgKiA1LCAvLyA1IG1pbnV0ZXNcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBNYWRlIG5vbmNlLWRvYzogJHtKU09OLnN0cmluZ2lmeShkb2MpfWApO1xuXG4gICAgICAgIGNvbnN0IG9wdHM6IEdlbmVyYXRlQXV0aFVybE9wdHMgPSB7XG4gICAgICAgICAgICBhY2Nlc3NfdHlwZTogXCJvZmZsaW5lXCIsXG4gICAgICAgICAgICBzY29wZTogU0NPUEVTLFxuICAgICAgICAgICAgc3RhdGU6IGlkLFxuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5kb21haW4pIHtcbiAgICAgICAgICAgIG9wdHNbXCJoZFwiXSA9IHRoaXMuZG9tYWluO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMub2F1dGgyX2NsaWVudC5nZW5lcmF0ZUF1dGhVcmwob3B0cyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2VuZXJhdGUgYSByYW5kb20gc3RyaW5nLlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IEEgcmFuZG9tIHN0cmluZy5cbiAgICAgKi9cbiAgICBnZW5lcmF0ZVJhbmRvbVN0cmluZygpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBsZW5ndGggPSAzMDtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFwiXCI7XG4gICAgICAgIGNvbnN0IGNoYXJhY3RlcnMgPVxuICAgICAgICAgICAgXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OVwiO1xuICAgICAgICBjb25zdCBjaGFyYWN0ZXJzTGVuZ3RoID0gY2hhcmFjdGVycy5sZW5ndGg7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSBjaGFyYWN0ZXJzLmNoYXJBdChcbiAgICAgICAgICAgICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFyYWN0ZXJzTGVuZ3RoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cblxuLyoqXG4gKiBJbnRlcmZhY2UgcmVwcmVzZW50aW5nIHRoZSB1c2VyIGNyZWRlbnRpYWxzIGNvbmZpZ3VyYXRpb24uXG4gKi9cbmV4cG9ydCB7IFVzZXJDcmVkcyB9O1xuIiwiLyoqXG4gKiBSZXByZXNlbnRzIGEgY2hlY2staW4gdmFsdWUgd2l0aCB2YXJpb3VzIHByb3BlcnRpZXMgYW5kIGxvb2t1cCB2YWx1ZXMuXG4gKi9cbmNsYXNzIENoZWNraW5WYWx1ZSB7XG4gICAga2V5OiBzdHJpbmc7XG4gICAgc2hlZXRzX3ZhbHVlOiBzdHJpbmc7XG4gICAgc21zX2Rlc2M6IHN0cmluZztcbiAgICBmYXN0X2NoZWNraW5zOiBzdHJpbmdbXTtcbiAgICBsb29rdXBfdmFsdWVzOiBTZXQ8c3RyaW5nPjtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQ2hlY2tpblZhbHVlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBUaGUga2V5IGZvciB0aGUgY2hlY2staW4gdmFsdWUuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNoZWV0c192YWx1ZSAtIFRoZSB2YWx1ZSB1c2VkIGluIHNoZWV0cy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc21zX2Rlc2MgLSBUaGUgZGVzY3JpcHRpb24gdXNlZCBpbiBTTVMuXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCBzdHJpbmdbXX0gZmFzdF9jaGVja2lucyAtIFRoZSBmYXN0IGNoZWNrLWluIHZhbHVlcy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAga2V5OiBzdHJpbmcsXG4gICAgICAgIHNoZWV0c192YWx1ZTogc3RyaW5nLFxuICAgICAgICBzbXNfZGVzYzogc3RyaW5nLFxuICAgICAgICBmYXN0X2NoZWNraW5zOiBzdHJpbmcgfCBzdHJpbmdbXVxuICAgICkge1xuICAgICAgICBpZiAoIShmYXN0X2NoZWNraW5zIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICAgICAgICBmYXN0X2NoZWNraW5zID0gW2Zhc3RfY2hlY2tpbnNdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgICAgICB0aGlzLnNoZWV0c192YWx1ZSA9IHNoZWV0c192YWx1ZTtcbiAgICAgICAgdGhpcy5zbXNfZGVzYyA9IHNtc19kZXNjO1xuICAgICAgICB0aGlzLmZhc3RfY2hlY2tpbnMgPSBmYXN0X2NoZWNraW5zLm1hcCgoeCkgPT4geC50cmltKCkudG9Mb3dlckNhc2UoKSk7XG5cbiAgICAgICAgY29uc3Qgc21zX2Rlc2Nfc3BsaXQ6IHN0cmluZ1tdID0gc21zX2Rlc2NcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXHMrLywgXCItXCIpXG4gICAgICAgICAgICAudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgLnNwbGl0KFwiL1wiKTtcbiAgICAgICAgY29uc3QgbG9va3VwX3ZhbHMgPSBbLi4udGhpcy5mYXN0X2NoZWNraW5zLCAuLi5zbXNfZGVzY19zcGxpdF07XG4gICAgICAgIHRoaXMubG9va3VwX3ZhbHVlcyA9IG5ldyBTZXQ8c3RyaW5nPihsb29rdXBfdmFscyk7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBjb2xsZWN0aW9uIG9mIGNoZWNrLWluIHZhbHVlcyB3aXRoIHZhcmlvdXMgbG9va3VwIG1ldGhvZHMuXG4gKi9cbmNsYXNzIENoZWNraW5WYWx1ZXMge1xuICAgIGJ5X2tleTogeyBba2V5OiBzdHJpbmddOiBDaGVja2luVmFsdWUgfSA9IHt9O1xuICAgIGJ5X2x2OiB7IFtrZXk6IHN0cmluZ106IENoZWNraW5WYWx1ZSB9ID0ge307XG4gICAgYnlfZmM6IHsgW2tleTogc3RyaW5nXTogQ2hlY2tpblZhbHVlIH0gPSB7fTtcbiAgICBieV9zaGVldF9zdHJpbmc6IHsgW2tleTogc3RyaW5nXTogQ2hlY2tpblZhbHVlIH0gPSB7fTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQ2hlY2tpblZhbHVlcy5cbiAgICAgKiBAcGFyYW0ge0NoZWNraW5WYWx1ZVtdfSBjaGVja2luVmFsdWVzIC0gVGhlIGFycmF5IG9mIGNoZWNrLWluIHZhbHVlcy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihjaGVja2luVmFsdWVzOiBDaGVja2luVmFsdWVbXSkge1xuICAgICAgICBmb3IgKGNvbnN0IGNoZWNraW5WYWx1ZSBvZiBjaGVja2luVmFsdWVzKSB7XG4gICAgICAgICAgICB0aGlzLmJ5X2tleVtjaGVja2luVmFsdWUua2V5XSA9IGNoZWNraW5WYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuYnlfc2hlZXRfc3RyaW5nW2NoZWNraW5WYWx1ZS5zaGVldHNfdmFsdWVdID0gY2hlY2tpblZhbHVlO1xuICAgICAgICAgICAgZm9yIChjb25zdCBsdiBvZiBjaGVja2luVmFsdWUubG9va3VwX3ZhbHVlcykge1xuICAgICAgICAgICAgICAgIHRoaXMuYnlfbHZbbHZdID0gY2hlY2tpblZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCBmYyBvZiBjaGVja2luVmFsdWUuZmFzdF9jaGVja2lucykge1xuICAgICAgICAgICAgICAgIHRoaXMuYnlfZmNbZmNdID0gY2hlY2tpblZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIGEgZmFzdCBjaGVjay1pbiB2YWx1ZSBmcm9tIHRoZSBnaXZlbiBib2R5IHN0cmluZy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYm9keSAtIFRoZSBib2R5IHN0cmluZyB0byBwYXJzZS5cbiAgICAgKiBAcmV0dXJucyB7Q2hlY2tpblZhbHVlIHwgdW5kZWZpbmVkfSBUaGUgcGFyc2VkIGNoZWNrLWluIHZhbHVlIG9yIHVuZGVmaW5lZC5cbiAgICAgKi9cbiAgICBwYXJzZV9mYXN0X2NoZWNraW4oYm9keTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJ5X2ZjW2JvZHldO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlcyBhIGNoZWNrLWluIHZhbHVlIGZyb20gdGhlIGdpdmVuIGJvZHkgc3RyaW5nLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5IC0gVGhlIGJvZHkgc3RyaW5nIHRvIHBhcnNlLlxuICAgICAqIEByZXR1cm5zIHtDaGVja2luVmFsdWUgfCB1bmRlZmluZWR9IFRoZSBwYXJzZWQgY2hlY2staW4gdmFsdWUgb3IgdW5kZWZpbmVkLlxuICAgICAqL1xuICAgIHBhcnNlX2NoZWNraW4oYm9keTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGNoZWNraW5fbG93ZXIgPSBib2R5LnJlcGxhY2UoL1xccysvLCBcIlwiKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnlfbHZbY2hlY2tpbl9sb3dlcl07XG4gICAgfVxufVxuXG5leHBvcnQgeyBDaGVja2luVmFsdWUsIENoZWNraW5WYWx1ZXMgfSIsIi8qKlxuICogQ29udmVydCBhbiBFeGNlbCBkYXRlIHRvIGEgSmF2YVNjcmlwdCBEYXRlIG9iamVjdC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBkYXRlIC0gVGhlIEV4Y2VsIGRhdGUuXG4gKiBAcmV0dXJucyB7RGF0ZX0gVGhlIEphdmFTY3JpcHQgRGF0ZSBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGV4Y2VsX2RhdGVfdG9fanNfZGF0ZShkYXRlOiBudW1iZXIpOiBEYXRlIHtcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgRGF0ZSgwKTtcbiAgICByZXN1bHQuc2V0VVRDTWlsbGlzZWNvbmRzKE1hdGgucm91bmQoKGRhdGUgLSAyNTU2OSkgKiA4NjQwMCAqIDEwMDApKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENoYW5nZSB0aGUgdGltZXpvbmUgb2YgYSBEYXRlIG9iamVjdCB0byBQU1QuXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgLSBUaGUgRGF0ZSBvYmplY3QuXG4gKiBAcmV0dXJucyB7RGF0ZX0gVGhlIERhdGUgb2JqZWN0IHdpdGggdGhlIHRpbWV6b25lIHNldCB0byBQU1QuXG4gKi9cbmZ1bmN0aW9uIGNoYW5nZV90aW1lem9uZV90b19wc3QoZGF0ZTogRGF0ZSk6IERhdGUge1xuICAgIHJldHVybiBuZXcgRGF0ZShkYXRlLnRvVVRDU3RyaW5nKCkucmVwbGFjZShcIiBHTVRcIiwgXCIgUFNUXCIpKTtcbn1cblxuLyoqXG4gKiBTdHJpcCB0aGUgdGltZSBmcm9tIGEgRGF0ZSBvYmplY3QsIGtlZXBpbmcgb25seSB0aGUgZGF0ZS5cbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSAtIFRoZSBEYXRlIG9iamVjdC5cbiAqIEByZXR1cm5zIHtEYXRlfSBUaGUgRGF0ZSBvYmplY3Qgd2l0aCB0aGUgdGltZSBzdHJpcHBlZC5cbiAqL1xuZnVuY3Rpb24gc3RyaXBfZGF0ZXRpbWVfdG9fZGF0ZShkYXRlOiBEYXRlKTogRGF0ZSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKFxuICAgICAgICBkYXRlLnRvTG9jYWxlRGF0ZVN0cmluZyhcImVuLVVTXCIsIHt0aW1lWm9uZTogXCJBbWVyaWNhL0xvc19BbmdlbGVzXCJ9KVxuICAgICk7XG59XG5cbi8qKlxuICogU2FuaXRpemUgYSBkYXRlIGJ5IGNvbnZlcnRpbmcgaXQgZnJvbSBhbiBFeGNlbCBkYXRlIGFuZCBzdHJpcHBpbmcgdGhlIHRpbWUuXG4gKiBAcGFyYW0ge251bWJlcn0gZGF0ZSAtIFRoZSBFeGNlbCBkYXRlLlxuICogQHJldHVybnMge0RhdGV9IFRoZSBzYW5pdGl6ZWQgRGF0ZSBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIHNhbml0aXplX2RhdGUoZGF0ZTogbnVtYmVyKTogRGF0ZSB7XG4gICAgcmV0dXJuIHN0cmlwX2RhdGV0aW1lX3RvX2RhdGUoXG4gICAgICAgIGNoYW5nZV90aW1lem9uZV90b19wc3QoZXhjZWxfZGF0ZV90b19qc19kYXRlKGRhdGUpKVxuICAgICk7XG59XG5cbi8qKlxuICogRm9ybWF0IGEgRGF0ZSBvYmplY3QgZm9yIHVzZSBpbiBhIHNwcmVhZHNoZWV0IHZhbHVlLlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIC0gVGhlIERhdGUgb2JqZWN0LlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCBkYXRlIHN0cmluZyBpbiBQU1RcbiAqL1xuZnVuY3Rpb24gZm9ybWF0X2RhdGVfZm9yX3NwcmVhZHNoZWV0X3ZhbHVlKGRhdGU6IERhdGUpOiBzdHJpbmcge1xuICAgIHJldHVybiBkYXRlXG4gICAgICAgIC50b0xvY2FsZURhdGVTdHJpbmcoXCJlbi1VU1wiLCB7dGltZVpvbmU6IFwiQW1lcmljYS9Mb3NfQW5nZWxlc1wifSlcbiAgICAgICAgLnNwbGl0KFwiL1wiKVxuICAgICAgICAubWFwKCh4KSA9PiB4LnBhZFN0YXJ0KDIsIFwiMFwiKSlcbiAgICAgICAgLmpvaW4oXCJcIik7XG59XG5cbi8qKlxuICogRmlsdGVyIGEgbGlzdCB0byBpbmNsdWRlIG9ubHkgaXRlbXMgdGhhdCBlbmQgd2l0aCBhIHNwZWNpZmljIGRhdGUuXG4gKiBAcGFyYW0ge2FueVtdfSBsaXN0IC0gVGhlIGxpc3QgdG8gZmlsdGVyLlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIC0gVGhlIGRhdGUgdG8gZmlsdGVyIGJ5LlxuICogQHJldHVybnMge2FueVtdfSBUaGUgZmlsdGVyZWQgbGlzdC5cbiAqL1xuZnVuY3Rpb24gZmlsdGVyX2xpc3RfdG9fZW5kc3dpdGhfZGF0ZShsaXN0OiBhbnlbXSwgZGF0ZTogRGF0ZSk6IGFueVtdIHtcbiAgICBjb25zdCBkYXRlc3RyID0gZm9ybWF0X2RhdGVfZm9yX3NwcmVhZHNoZWV0X3ZhbHVlKGRhdGUpO1xuICAgIHJldHVybiBsaXN0Lm1hcCgoeCkgPT4geD8udG9TdHJpbmcoKSkuZmlsdGVyKCh4KSA9PiB4Py5lbmRzV2l0aChkYXRlc3RyKSk7XG59XG5cbi8qKlxuICogRmlsdGVyIGEgbGlzdCB0byBpbmNsdWRlIG9ubHkgaXRlbXMgdGhhdCBlbmQgd2l0aCB0aGUgY3VycmVudCBkYXRlLlxuICogQHBhcmFtIHthbnlbXX0gbGlzdCAtIFRoZSBsaXN0IHRvIGZpbHRlci5cbiAqIEByZXR1cm5zIHthbnlbXX0gVGhlIGZpbHRlcmVkIGxpc3QuXG4gKi9cbmZ1bmN0aW9uIGZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2N1cnJlbnRfZGF5KGxpc3Q6IGFueVtdKTogYW55W10ge1xuICAgIHJldHVybiBmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9kYXRlKGxpc3QsIG5ldyBEYXRlKCkpO1xufVxuXG5leHBvcnQge1xuICAgIHNhbml0aXplX2RhdGUsXG4gICAgZXhjZWxfZGF0ZV90b19qc19kYXRlLFxuICAgIGNoYW5nZV90aW1lem9uZV90b19wc3QsXG4gICAgc3RyaXBfZGF0ZXRpbWVfdG9fZGF0ZSxcbiAgICBmb3JtYXRfZGF0ZV9mb3Jfc3ByZWFkc2hlZXRfdmFsdWUsXG4gICAgZmlsdGVyX2xpc3RfdG9fZW5kc3dpdGhfZGF0ZSxcbiAgICBmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9jdXJyZW50X2RheSxcbn07IiwiaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgJ0B0d2lsaW8tbGFicy9zZXJ2ZXJsZXNzLXJ1bnRpbWUtdHlwZXMnO1xuXG4vKipcbiAqIExvYWQgY3JlZGVudGlhbHMgZnJvbSBhIEpTT04gZmlsZS5cbiAqIEByZXR1cm5zIHthbnl9IFRoZSBwYXJzZWQgY3JlZGVudGlhbHMgZnJvbSB0aGUgSlNPTiBmaWxlLlxuICovXG5mdW5jdGlvbiBsb2FkX2NyZWRlbnRpYWxzX2ZpbGVzKCk6IGFueSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoXG4gICAgICAgIGZzXG4gICAgICAgICAgICAucmVhZEZpbGVTeW5jKFJ1bnRpbWUuZ2V0QXNzZXRzKClbXCIvY3JlZGVudGlhbHMuanNvblwiXS5wYXRoKVxuICAgICAgICAgICAgLnRvU3RyaW5nKClcbiAgICApO1xufVxuXG4vKipcbiAqIEdldCB0aGUgcGF0aCB0byB0aGUgc2VydmljZSBjcmVkZW50aWFscyBmaWxlLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIHBhdGggdG8gdGhlIHNlcnZpY2UgY3JlZGVudGlhbHMgZmlsZS5cbiAqL1xuZnVuY3Rpb24gZ2V0X3NlcnZpY2VfY3JlZGVudGlhbHNfcGF0aCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBSdW50aW1lLmdldEFzc2V0cygpW1wiL3NlcnZpY2UtY3JlZGVudGlhbHMuanNvblwiXS5wYXRoO1xufVxuXG5leHBvcnQgeyBsb2FkX2NyZWRlbnRpYWxzX2ZpbGVzLCBnZXRfc2VydmljZV9jcmVkZW50aWFsc19wYXRoIH07IiwiaW1wb3J0IHtzaGVldHNfdjR9IGZyb20gXCJnb29nbGVhcGlzXCI7XG5pbXBvcnQge2V4Y2VsX3Jvd190b19pbmRleH0gZnJvbSBcIi4vdXRpbFwiO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQgdGFiLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYiB7XG4gICAgc2hlZXRzX3NlcnZpY2U6IHNoZWV0c192NC5TaGVldHMgfCBudWxsO1xuICAgIHNoZWV0X2lkOiBzdHJpbmc7XG4gICAgc2hlZXRfbmFtZTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIuXG4gICAgICogQHBhcmFtIHtzaGVldHNfdjQuU2hlZXRzIHwgbnVsbH0gc2hlZXRzX3NlcnZpY2UgLSBUaGUgR29vZ2xlIFNoZWV0cyBBUEkgc2VydmljZSBpbnN0YW5jZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2hlZXRfaWQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNoZWV0X25hbWUgLSBUaGUgbmFtZSBvZiB0aGUgc2hlZXQgdGFiLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyB8IG51bGwsXG4gICAgICAgIHNoZWV0X2lkOiBzdHJpbmcsXG4gICAgICAgIHNoZWV0X25hbWU6IHN0cmluZ1xuICAgICkge1xuICAgICAgICB0aGlzLnNoZWV0c19zZXJ2aWNlID0gc2hlZXRzX3NlcnZpY2U7XG4gICAgICAgIHRoaXMuc2hlZXRfaWQgPSBzaGVldF9pZDtcbiAgICAgICAgdGhpcy5zaGVldF9uYW1lID0gc2hlZXRfbmFtZS5zcGxpdChcIiFcIilbMF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHZhbHVlcyBmcm9tIHRoZSBzaGVldC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bGx9IFtyYW5nZV0gLSBUaGUgcmFuZ2UgdG8gZ2V0IHZhbHVlcyBmcm9tLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueVtdW10gfCB1bmRlZmluZWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgdmFsdWVzIGZyb20gdGhlIHNoZWV0LlxuICAgICAqL1xuICAgIGFzeW5jIGdldF92YWx1ZXMocmFuZ2U/OiBzdHJpbmcgfCBudWxsKTogUHJvbWlzZTxhbnlbXVtdIHwgdW5kZWZpbmVkPiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2dldF92YWx1ZXMocmFuZ2UpO1xuICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGEudmFsdWVzID8/IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHJvdyBmb3IgYSBzcGVjaWZpYyBwYXRyb2xsZXIuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdHJvbGxlcl9uYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHBhdHJvbGxlci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZV9jb2x1bW4gLSBUaGUgY29sdW1uIHdoZXJlIHRoZSBwYXRyb2xsZXIncyBuYW1lIGlzIGxvY2F0ZWQuXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCBudWxsfSBbcmFuZ2VdIC0gVGhlIHJhbmdlIHRvIHNlYXJjaCB3aXRoaW4uXG4gICAgICogQHJldHVybnMge1Byb21pc2U8eyByb3c6IGFueVtdOyBpbmRleDogbnVtYmVyOyB9IHwgbnVsbD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSByb3cgYW5kIGluZGV4IG9mIHRoZSBwYXRyb2xsZXIsIG9yIG51bGwgaWYgbm90IGZvdW5kLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF9zaGVldF9yb3dfZm9yX3BhdHJvbGxlcihcbiAgICAgICAgcGF0cm9sbGVyX25hbWU6IHN0cmluZyxcbiAgICAgICAgbmFtZV9jb2x1bW46IHN0cmluZyxcbiAgICAgICAgcmFuZ2U/OiBzdHJpbmcgfCBudWxsXG4gICAgKTogUHJvbWlzZTx7IHJvdzogYW55W107IGluZGV4OiBudW1iZXI7IH0gfCBudWxsPiB7XG4gICAgICAgIGNvbnN0IHJvd3MgPSBhd2FpdCB0aGlzLmdldF92YWx1ZXMocmFuZ2UpO1xuICAgICAgICBpZiAocm93cykge1xuICAgICAgICAgICAgY29uc3QgbG9va3VwX2luZGV4ID0gZXhjZWxfcm93X3RvX2luZGV4KG5hbWVfY29sdW1uKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChyb3dzW2ldW2xvb2t1cF9pbmRleF0gPT09IHBhdHJvbGxlcl9uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHJvdzogcm93c1tpXSwgaW5kZXg6IGkgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgIGBDb3VsZG4ndCBmaW5kIHBhdHJvbGxlciAke3BhdHJvbGxlcl9uYW1lfSBpbiBzaGVldCAke3RoaXMuc2hlZXRfbmFtZX0uYFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdmFsdWVzIGluIHRoZSBzaGVldC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmFuZ2UgLSBUaGUgcmFuZ2UgdG8gdXBkYXRlLlxuICAgICAqIEBwYXJhbSB7YW55W11bXX0gdmFsdWVzIC0gVGhlIHZhbHVlcyB0byB1cGRhdGUuXG4gICAgICovXG4gICAgYXN5bmMgdXBkYXRlX3ZhbHVlcyhyYW5nZTogc3RyaW5nLCB2YWx1ZXM6IGFueVtdW10pIHtcbiAgICAgICAgY29uc3QgdXBkYXRlTWUgPSAoYXdhaXQgdGhpcy5fZ2V0X3ZhbHVlcyhyYW5nZSwgbnVsbCkpLmRhdGE7XG5cbiAgICAgICAgdXBkYXRlTWUudmFsdWVzID0gdmFsdWVzO1xuICAgICAgICBhd2FpdCB0aGlzLnNoZWV0c19zZXJ2aWNlIS5zcHJlYWRzaGVldHMudmFsdWVzLnVwZGF0ZSh7XG4gICAgICAgICAgICBzcHJlYWRzaGVldElkOiB0aGlzLnNoZWV0X2lkLFxuICAgICAgICAgICAgdmFsdWVJbnB1dE9wdGlvbjogXCJVU0VSX0VOVEVSRURcIixcbiAgICAgICAgICAgIHJhbmdlOiB1cGRhdGVNZS5yYW5nZSEsXG4gICAgICAgICAgICByZXF1ZXN0Qm9keTogdXBkYXRlTWUsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB2YWx1ZXMgZnJvbSB0aGUgc2hlZXQgKHByaXZhdGUgbWV0aG9kKS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bGx9IFtyYW5nZV0gLSBUaGUgcmFuZ2UgdG8gZ2V0IHZhbHVlcyBmcm9tLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbH0gW3ZhbHVlUmVuZGVyT3B0aW9uXSAtIFRoZSB2YWx1ZSByZW5kZXIgb3B0aW9uLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueVtdW10+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgdmFsdWUgcmFuZ2UuXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIGFzeW5jIF9nZXRfdmFsdWVzKFxuICAgICAgICByYW5nZT86IHN0cmluZyB8IG51bGwsXG4gICAgICAgIHZhbHVlUmVuZGVyT3B0aW9uOiBzdHJpbmcgfCBudWxsID0gXCJVTkZPUk1BVFRFRF9WQUxVRVwiXG4gICAgKSB7XG4gICAgICAgIGxldCBsb29rdXBSYW5nZSA9IHRoaXMuc2hlZXRfbmFtZTtcbiAgICAgICAgaWYgKHJhbmdlICE9IG51bGwpIHtcbiAgICAgICAgICAgIGxvb2t1cFJhbmdlID0gbG9va3VwUmFuZ2UgKyBcIiFcIjtcblxuICAgICAgICAgICAgaWYgKHJhbmdlLnN0YXJ0c1dpdGgobG9va3VwUmFuZ2UpKSB7XG4gICAgICAgICAgICAgICAgcmFuZ2UgPSByYW5nZS5zdWJzdHJpbmcobG9va3VwUmFuZ2UubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvb2t1cFJhbmdlID0gbG9va3VwUmFuZ2UgKyByYW5nZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgb3B0czogc2hlZXRzX3Y0LlBhcmFtcyRSZXNvdXJjZSRTcHJlYWRzaGVldHMkVmFsdWVzJEdldCA9IHtcbiAgICAgICAgICAgIHNwcmVhZHNoZWV0SWQ6IHRoaXMuc2hlZXRfaWQsXG4gICAgICAgICAgICByYW5nZTogbG9va3VwUmFuZ2UsXG4gICAgICAgIH07XG4gICAgICAgIGlmICh2YWx1ZVJlbmRlck9wdGlvbikge1xuICAgICAgICAgICAgb3B0cy52YWx1ZVJlbmRlck9wdGlvbiA9IHZhbHVlUmVuZGVyT3B0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnNoZWV0c19zZXJ2aWNlIS5zcHJlYWRzaGVldHMudmFsdWVzLmdldChvcHRzKTtcbiAgICB9XG59XG4iLCJcbmV4cG9ydCBmdW5jdGlvbiBidWlsZF9wYXNzZXNfc3RyaW5nKFxuICAgIHVzZWQ6IG51bWJlcixcbiAgICB0b3RhbDogbnVtYmVyLFxuICAgIHRvZGF5OiBudW1iZXIsXG4gICAgZm9yY2VfdG9kYXk6IGJvb2xlYW4gPSBmYWxzZVxuKSB7XG4gICAgbGV0IG1lc3NhZ2UgPSBgWW91IGhhdmUgdXNlZCAke3VzZWR9IG9mICR7dG90YWx9IGd1ZXN0IHBhc3NlcyB0aGlzIHNlYXNvbmA7XG4gICAgaWYgKGZvcmNlX3RvZGF5IHx8IHRvZGF5ID4gMCkge1xuICAgICAgICBtZXNzYWdlICs9IGAgKCR7dG9kYXl9IHVzZWQgdG9kYXkpYDtcbiAgICB9XG4gICAgbWVzc2FnZSArPSBcIi5cIjtcbiAgICByZXR1cm4gbWVzc2FnZTtcbn1cbiIsIi8qKlxuICogVmFsaWRhdGVzIGlmIHRoZSBwcm92aWRlZCBzY29wZXMgaW5jbHVkZSBhbGwgZGVzaXJlZCBzY29wZXMuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBzY29wZXMgLSBUaGUgbGlzdCBvZiBzY29wZXMgdG8gdmFsaWRhdGUuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBkZXNpcmVkX3Njb3BlcyAtIFRoZSBsaXN0IG9mIGRlc2lyZWQgc2NvcGVzLlxuICogQHRocm93cyB7RXJyb3J9IFRocm93cyBhbiBlcnJvciBpZiBhbnkgZGVzaXJlZCBzY29wZSBpcyBtaXNzaW5nLlxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZV9zY29wZXMoc2NvcGVzOiBzdHJpbmdbXSwgZGVzaXJlZF9zY29wZXM6IHN0cmluZ1tdKSB7XG4gICAgZm9yIChjb25zdCBkZXNpcmVkX3Njb3BlIG9mIGRlc2lyZWRfc2NvcGVzKSB7XG4gICAgICAgIGlmIChzY29wZXMgPT09IHVuZGVmaW5lZCB8fCAhc2NvcGVzLmluY2x1ZGVzKGRlc2lyZWRfc2NvcGUpKSB7XG4gICAgICAgICAgICBjb25zdCBlcnJvciA9IGBNaXNzaW5nIHNjb3BlICR7ZGVzaXJlZF9zY29wZX0gaW4gcmVjZWl2ZWQgc2NvcGVzOiAke3Njb3Blc31gO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCB7dmFsaWRhdGVfc2NvcGVzfSIsImltcG9ydCB7IFNlY3Rpb25Db25maWcgfSBmcm9tICcuLi9lbnYvaGFuZGxlcl9jb25maWcnO1xuXG4vKipcbiAgICAqIENsYXNzIGZvciBzZWN0aW9uIHZhbHVlcy5cbiAgICAqL1xuY2xhc3MgU2VjdGlvblZhbHVlcyB7XG4gICAgc2VjdGlvbl9jb25maWc6IFNlY3Rpb25Db25maWdcbiAgICBzZWN0aW9uczogc3RyaW5nW107XG4gICAgbG93ZXJjYXNlX3NlY3Rpb25zOiBzdHJpbmdbXTtcblxuICAgIGNvbnN0cnVjdG9yKHNlY3Rpb25fY29uZmlnOiBTZWN0aW9uQ29uZmlnKSB7XG4gICAgICAgIHRoaXMuc2VjdGlvbl9jb25maWcgPSBzZWN0aW9uX2NvbmZpZztcbiAgICAgICAgdGhpcy5zZWN0aW9ucyA9IHNlY3Rpb25fY29uZmlnLlNFQ1RJT05fVkFMVUVTLnNwbGl0KCcsJyk7XG4gICAgICAgIHRoaXMubG93ZXJjYXNlX3NlY3Rpb25zID0gc2VjdGlvbl9jb25maWcuU0VDVElPTl9WQUxVRVMudG9Mb3dlckNhc2UoKS5zcGxpdCgnLCcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHNlY3Rpb24gZGVzY3JpcHRpb24uXG4gICAgICogQHJldHVybnMge3N0cmluZ30gVGhlIHNlY3Rpb24gZGVzY3JpcHRpb24uXG4gICAgKi9cbiAgICBnZXRfc2VjdGlvbl9kZXNjcmlwdGlvbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWN0aW9uX2NvbmZpZy5TRUNUSU9OX1ZBTFVFUztcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIFBhcnNlcyBhIHNlY3Rpb24uXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gYm9keSAtIFRoZSBib2R5IG9mIHRoZSByZXF1ZXN0LlxuICAgICogQHJldHVybnMge3N0cmluZyB8IG51bGx9IFRoZSBzZWN0aW9uIGlmIGl0IGlzIGEgdmFsaWQgc2VjdGlvbiBvciBudWxsLlxuICAgICovXG4gICAgcGFyc2Vfc2VjdGlvbihib2R5OiBzdHJpbmcgfCBudWxsKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgICAgIGlmIChib2R5ID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICAgcmV0dXJuIHRoaXMubG93ZXJjYXNlX3NlY3Rpb25zLmluY2x1ZGVzKGJvZHkudG9Mb3dlckNhc2UoKSkgPyBib2R5IDogbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIE1hcHMgYSBsb3dlciBjYXNlIHZlcnNpb24gb2YgYSBzZWN0aW9uIHN0cmluZyB0byB0aGUgb3JpZ2luYWwgY2FzZSB2YWx1ZS5cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWN0aW9uIC0gVGhlIGxvd2VyIGNhc2Ugc2VjdGlvbiBzdHJpbmcuXG4gICAgKiBAcmV0dXJucyB7c3RyaW5nIH0gVGhlIG9yaWdpbmFsIGNhc2UgdmFsdWUgaWYgZm91bmQsIG90aGVyd2lzZSBudWxsLlxuICAgICovXG4gICBtYXBfc2VjdGlvbihzZWN0aW9uOiBzdHJpbmcgfCBudWxsKTogc3RyaW5nICB7XG4gICAgICAgaWYgKHNlY3Rpb24gPT09IG51bGwpIHtcbiAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgfVxuICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5sb3dlcmNhc2Vfc2VjdGlvbnMuaW5kZXhPZihzZWN0aW9uLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VjdGlvbnNbaW5kZXhdO1xuICAgICAgIH1cbiAgICAgICByZXR1cm4gXCJcIjtcbiAgIH1cblxufVxuXG5leHBvcnQgeyBTZWN0aW9uVmFsdWVzIH07IiwiLyoqXG4gKiBDb252ZXJ0IHJvdyBhbmQgY29sdW1uIG51bWJlcnMgdG8gYW4gRXhjZWwtbGlrZSBpbmRleC5cbiAqIEBwYXJhbSB7bnVtYmVyfSByb3cgLSBUaGUgcm93IG51bWJlciAoMC1iYXNlZCkuXG4gKiBAcGFyYW0ge251bWJlcn0gY29sIC0gVGhlIGNvbHVtbiBudW1iZXIgKDAtYmFzZWQpLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIEV4Y2VsLWxpa2UgaW5kZXggKGUuZy4sIFwiQTFcIikuXG4gKi9cbmZ1bmN0aW9uIHJvd19jb2xfdG9fZXhjZWxfaW5kZXgocm93OiBudW1iZXIsIGNvbDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBsZXQgY29sU3RyaW5nID0gXCJcIjtcbiAgICBjb2wgKz0gMTtcbiAgICB3aGlsZSAoY29sID4gMCkge1xuICAgICAgICBjb2wgLT0gMTtcbiAgICAgICAgY29uc3QgbW9kdWxvID0gY29sICUgMjY7XG4gICAgICAgIGNvbnN0IGNvbExldHRlciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoJ0EnLmNoYXJDb2RlQXQoMCkgKyBtb2R1bG8pO1xuICAgICAgICBjb2xTdHJpbmcgPSBjb2xMZXR0ZXIgKyBjb2xTdHJpbmc7XG4gICAgICAgIGNvbCA9IE1hdGguZmxvb3IoY29sIC8gMjYpO1xuICAgIH1cbiAgICByZXR1cm4gY29sU3RyaW5nICsgKHJvdyArIDEpLnRvU3RyaW5nKCk7XG59XG5cbi8qKlxuICogU3BsaXQgYW4gRXhjZWwtbGlrZSBpbmRleCBpbnRvIHJvdyBhbmQgY29sdW1uIG51bWJlcnMuXG4gKiBAcGFyYW0ge3N0cmluZ30gZXhjZWxfaW5kZXggLSBUaGUgRXhjZWwtbGlrZSBpbmRleCAoZS5nLiwgXCJBMVwiKS5cbiAqIEByZXR1cm5zIHtbbnVtYmVyLCBudW1iZXJdfSBBbiBhcnJheSBjb250YWluaW5nIHRoZSByb3cgYW5kIGNvbHVtbiBudW1iZXJzICgwLWJhc2VkKS5cbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgaW5kZXggY2Fubm90IGJlIHBhcnNlZC5cbiAqL1xuZnVuY3Rpb24gc3BsaXRfdG9fcm93X2NvbChleGNlbF9pbmRleDogc3RyaW5nKTogW251bWJlciwgbnVtYmVyXSB7XG4gICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKFwiXihbQS1aYS16XSspKFswLTldKykkXCIpO1xuICAgIGNvbnN0IG1hdGNoID0gcmVnZXguZXhlYyhleGNlbF9pbmRleCk7XG4gICAgaWYgKG1hdGNoID09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIHBhcnNlIHN0cmluZyBmb3IgZXhjZWwgcG9zaXRpb24gc3BsaXRcIik7XG4gICAgfVxuICAgIGNvbnN0IGNvbCA9IGV4Y2VsX3Jvd190b19pbmRleChtYXRjaFsxXSk7XG4gICAgY29uc3QgcmF3X3JvdyA9IE51bWJlcihtYXRjaFsyXSk7XG4gICAgaWYgKHJhd19yb3cgPCAxKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlJvdyBtdXN0IGJlID49MVwiKTtcbiAgICB9XG4gICAgcmV0dXJuIFtyYXdfcm93IC0gMSwgY29sXTtcbn1cblxuLyoqXG4gKiBMb29rIHVwIGEgdmFsdWUgaW4gYSBzaGVldCBieSBpdHMgRXhjZWwtbGlrZSBpbmRleC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBleGNlbF9pbmRleCAtIFRoZSBFeGNlbC1saWtlIGluZGV4IChlLmcuLCBcIkExXCIpLlxuICogQHBhcmFtIHthbnlbXVtdfSBzaGVldCAtIFRoZSBzaGVldCBkYXRhLlxuICogQHJldHVybnMge2FueX0gVGhlIHZhbHVlIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXgsIG9yIHVuZGVmaW5lZCBpZiBub3QgZm91bmQuXG4gKi9cbmZ1bmN0aW9uIGxvb2t1cF9yb3dfY29sX2luX3NoZWV0KGV4Y2VsX2luZGV4OiBzdHJpbmcsIHNoZWV0OiBhbnlbXVtdKTogYW55IHtcbiAgICBjb25zdCBbcm93LCBjb2xdID0gc3BsaXRfdG9fcm93X2NvbChleGNlbF9pbmRleCk7XG4gICAgaWYgKHJvdyA+PSBzaGVldC5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIHNoZWV0W3Jvd11bY29sXTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0IEV4Y2VsLWxpa2UgY29sdW1uIGxldHRlcnMgdG8gYSBjb2x1bW4gbnVtYmVyLlxuICogQHBhcmFtIHtzdHJpbmd9IGxldHRlcnMgLSBUaGUgY29sdW1uIGxldHRlcnMgKGUuZy4sIFwiQVwiKS5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBjb2x1bW4gbnVtYmVyICgwLWJhc2VkKS5cbiAqL1xuZnVuY3Rpb24gZXhjZWxfcm93X3RvX2luZGV4KGxldHRlcnM6IHN0cmluZyk6IG51bWJlciB7XG4gICAgY29uc3QgbG93ZXJMZXR0ZXJzID0gbGV0dGVycy50b0xvd2VyQ2FzZSgpO1xuICAgIGxldCByZXN1bHQ6IG51bWJlciA9IDA7XG4gICAgZm9yIChsZXQgcCA9IDA7IHAgPCBsb3dlckxldHRlcnMubGVuZ3RoOyBwKyspIHtcbiAgICAgICAgY29uc3QgY2hhcmFjdGVyVmFsdWUgPVxuICAgICAgICAgICAgbG93ZXJMZXR0ZXJzLmNoYXJDb2RlQXQocCkgLSBcImFcIi5jaGFyQ29kZUF0KDApICsgMTtcbiAgICAgICAgcmVzdWx0ID0gY2hhcmFjdGVyVmFsdWUgKyByZXN1bHQgKiAyNjtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdCAtIDE7XG59XG5cbi8qKlxuICogUGFyc2UgYSBHb29nbGUgU2hlZXRzIGNoZWNrYm94L2Jvb2xlYW4gY2VsbCB2YWx1ZSBhcyBhIGJvb2xlYW4uXG4gKiBBY2NlcHRzIEpTIGJvb2xlYW4gdHJ1ZS9mYWxzZSBhbmQgc3RyaW5nIGxpdGVyYWxzIFwiVFJVRVwiL1wiRkFMU0VcIlxuICogKGNhc2UtaW5zZW5zaXRpdmUpIGZyb20gU2hlZXRzLCAgZGVwZW5kaW5nIG9uIHRoZSBjZWxsIGZvcm1hdHRpbmcuXG4gKiBBbnkgdmFsdWUgdGhhdCBjYW5ub3QgYmUgcmVjb2duaXplZCBhcyB0cnVlIGlzIGNvbnNpZGVyZWQgZmFsc2UuXG4gKiBAcGFyYW0ge2FueX0gdmFsdWUgLSBSYXcgY2VsbCB2YWx1ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIG9ubHkgd2hlbiB2YWx1ZSBpcyB0cnVlIG9yIFwiVFJVRVwiIChjYXNlLWluc2Vuc2l0aXZlKS5cbiAqL1xuZnVuY3Rpb24gcGFyc2VfYm9vbGVhbl9jZWxsKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICBpZiAodmFsdWUgPT09IHRydWUpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgdmFsdWUudG9VcHBlckNhc2UoKSA9PT0gXCJUUlVFXCI7XG59XG5cbi8qKlxuICogU2FuaXRpemUgYSBwaG9uZSBudW1iZXIgYnkgcmVtb3ZpbmcgdW53YW50ZWQgY2hhcmFjdGVycy5cbiAqIEBwYXJhbSB7bnVtYmVyIHwgc3RyaW5nfSBudW1iZXIgLSBUaGUgcGhvbmUgbnVtYmVyIHRvIHNhbml0aXplLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIHNhbml0aXplZCBwaG9uZSBudW1iZXIuXG4gKi9cbmZ1bmN0aW9uIHNhbml0aXplX3Bob25lX251bWJlcihudW1iZXI6IG51bWJlciB8IHN0cmluZyk6IHN0cmluZyB7XG4gICAgbGV0IG5ld19udW1iZXIgPSBudW1iZXIudG9TdHJpbmcoKTtcbiAgICBuZXdfbnVtYmVyID0gbmV3X251bWJlci5yZXBsYWNlKFwid2hhdHNhcHA6XCIsIFwiXCIpO1xuICAgIGxldCB0ZW1wb3JhcnlfbmV3X251bWJlcjogc3RyaW5nID0gXCJcIjtcbiAgICB3aGlsZSAodGVtcG9yYXJ5X25ld19udW1iZXIgIT0gbmV3X251bWJlcikge1xuICAgICAgICAvLyBEbyB0aGlzIG11bHRpcGxlIHRpbWVzIHNvIHdlIGdldCBhbGwgKzEgYXQgdGhlIHN0YXJ0IG9mIHRoZSBzdHJpbmcsIGV2ZW4gYWZ0ZXIgc3RyaXBwaW5nLlxuICAgICAgICB0ZW1wb3JhcnlfbmV3X251bWJlciA9IG5ld19udW1iZXI7XG4gICAgICAgIG5ld19udW1iZXIgPSBuZXdfbnVtYmVyLnJlcGxhY2UoLyheXFwrMXxcXCh8XFwpfFxcLnwtKS9nLCBcIlwiKTtcbiAgICB9XG4gICAgY29uc3QgcmVzdWx0ID0gU3RyaW5nKHBhcnNlSW50KG5ld19udW1iZXIpKS5wYWRTdGFydCgxMCwgXCIwXCIpO1xuICAgIGlmIChyZXN1bHQubGVuZ3RoID09IDExICYmIHJlc3VsdFswXSA9PSBcIjFcIikge1xuICAgICAgICByZXR1cm4gcmVzdWx0LnN1YnN0cmluZygxKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBGb3JtYXRzIGEgMTAtZGlnaXQgcGhvbmUgbnVtYmVyIHN0cmluZyBhcyAoWFhYKVhYWC1YWFhYIGZvciBkaXNwbGF5LlxuICogQHBhcmFtIHtzdHJpbmd9IHRlbl9kaWdpdHMgLSBBIDEwLWRpZ2l0IHBob25lIG51bWJlciBzdHJpbmcgKGUuZy4gXCIxMjM0NTY3ODkwXCIpLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCBwaG9uZSBudW1iZXIgKGUuZy4gXCIoMTIzKTQ1Ni03ODkwXCIpLlxuICovXG5mdW5jdGlvbiBmb3JtYXRfcGhvbmVfZm9yX2Rpc3BsYXkodGVuX2RpZ2l0czogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCgke3Rlbl9kaWdpdHMuc3Vic3RyaW5nKDAsIDMpfSkke3Rlbl9kaWdpdHMuc3Vic3RyaW5nKDMsIDYpfS0ke3Rlbl9kaWdpdHMuc3Vic3RyaW5nKDYsIDEwKX1gO1xufVxuXG5leHBvcnQge1xuICAgIHJvd19jb2xfdG9fZXhjZWxfaW5kZXgsXG4gICAgZXhjZWxfcm93X3RvX2luZGV4LFxuICAgIHNhbml0aXplX3Bob25lX251bWJlcixcbiAgICBzcGxpdF90b19yb3dfY29sLFxuICAgIGxvb2t1cF9yb3dfY29sX2luX3NoZWV0LFxuICAgIHBhcnNlX2Jvb2xlYW5fY2VsbCxcbiAgICBmb3JtYXRfcGhvbmVfZm9yX2Rpc3BsYXlcbn07IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZ29vZ2xlYXBpc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzbXMtc2VnbWVudHMtY2FsY3VsYXRvclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG5jb25zdCBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGNvbnN0IGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHRjb25zdCBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0Y29uc3QgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdGNvbnN0IGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyL3ZhbHVlIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpOyIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCJAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzXCI7XG5pbXBvcnQge1xuICAgIENvbnRleHQsXG4gICAgU2VydmVybGVzc0NhbGxiYWNrLFxuICAgIFNlcnZlcmxlc3NFdmVudE9iamVjdCxcbiAgICBTZXJ2ZXJsZXNzRnVuY3Rpb25TaWduYXR1cmUsXG59IGZyb20gXCJAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzL3R5cGVzXCI7XG5pbXBvcnQgQlZOU1BIYW5kbGVyLCB7IEJWTlNQRXZlbnQgfSBmcm9tIFwiLi9idm5zcF9oYW5kbGVyXCI7XG5pbXBvcnQgeyBIYW5kbGVyRW52aXJvbm1lbnQgfSBmcm9tIFwiLi4vZW52L2hhbmRsZXJfY29uZmlnXCI7XG5cbmNvbnN0IE5FWFRfU1RFUF9DT09LSUVfTkFNRSA9IFwiYnZuc3BfbmV4dF9zdGVwXCI7XG5cbi8qKlxuICogVHdpbGlvIFNlcnZlcmxlc3MgZnVuY3Rpb24gaGFuZGxlciBmb3IgQlZOU1AgYm90IGNvbW1hbmRzLlxuICogQHBhcmFtIHtDb250ZXh0PEhhbmRsZXJFbnZpcm9ubWVudD59IGNvbnRleHQgLSBUaGUgVHdpbGlvIHNlcnZlcmxlc3MgY29udGV4dC5cbiAqIEBwYXJhbSB7U2VydmVybGVzc0V2ZW50T2JqZWN0PEJWTlNQRXZlbnQ+fSBldmVudCAtIFRoZSBldmVudCBvYmplY3QuXG4gKiBAcGFyYW0ge1NlcnZlcmxlc3NDYWxsYmFja30gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBjb25zdCBoYW5kbGVyOiBTZXJ2ZXJsZXNzRnVuY3Rpb25TaWduYXR1cmU8XG4gICAgSGFuZGxlckVudmlyb25tZW50LFxuICAgIEJWTlNQRXZlbnRcbj4gPSBhc3luYyBmdW5jdGlvbiAoXG4gICAgY29udGV4dDogQ29udGV4dDxIYW5kbGVyRW52aXJvbm1lbnQ+LFxuICAgIGV2ZW50OiBTZXJ2ZXJsZXNzRXZlbnRPYmplY3Q8QlZOU1BFdmVudD4sXG4gICAgY2FsbGJhY2s6IFNlcnZlcmxlc3NDYWxsYmFja1xuKSB7XG4gICAgY29uc3QgaGFuZGxlciA9IG5ldyBCVk5TUEhhbmRsZXIoY29udGV4dCwgZXZlbnQpO1xuICAgIGxldCBtZXNzYWdlOiBzdHJpbmc7XG4gICAgbGV0IG5leHRfc3RlcDogc3RyaW5nID0gXCJcIjtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBoYW5kbGVyX3Jlc3BvbnNlID0gYXdhaXQgaGFuZGxlci5oYW5kbGUoKTtcbiAgICAgICAgbWVzc2FnZSA9XG4gICAgICAgICAgICBoYW5kbGVyX3Jlc3BvbnNlLnJlc3BvbnNlIHx8XG4gICAgICAgICAgICBcIlVuZXhwZWN0ZWQgcmVzdWx0IC0gbm8gcmVzcG9uc2UgZGV0ZXJtaW5lZFwiO1xuICAgICAgICBuZXh0X3N0ZXAgPSBoYW5kbGVyX3Jlc3BvbnNlLm5leHRfc3RlcCB8fCBcIlwiO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJBbiBlcnJvciBvY2N1cmVkXCIpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZSkpO1xuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICB9XG4gICAgICAgIG1lc3NhZ2UgPSBcIkFuIHVuZXhwZWN0ZWQgZXJyb3Igb2NjdXJlZC5cIjtcbiAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgbWVzc2FnZSArPSBcIlxcblwiICsgZS5tZXNzYWdlO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvclwiLCBlLnN0YWNrKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3JcIiwgZS5uYW1lKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3JcIiwgZS5tZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHJlc3BvbnNlID0gbmV3IFR3aWxpby5SZXNwb25zZSgpO1xuICAgIGNvbnN0IHR3aW1sID0gbmV3IFR3aWxpby50d2ltbC5NZXNzYWdpbmdSZXNwb25zZSgpO1xuXG4gICAgdHdpbWwubWVzc2FnZShtZXNzYWdlKTtcblxuICAgIHJlc3BvbnNlXG4gICAgICAgIC8vIEFkZCB0aGUgc3RyaW5naWZpZWQgVHdpTUwgdG8gdGhlIHJlc3BvbnNlIGJvZHlcbiAgICAgICAgLnNldEJvZHkodHdpbWwudG9TdHJpbmcoKSlcbiAgICAgICAgLy8gU2luY2Ugd2UncmUgcmV0dXJuaW5nIFR3aU1MLCB0aGUgY29udGVudCB0eXBlIG11c3QgYmUgWE1MXG4gICAgICAgIC5hcHBlbmRIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJ0ZXh0L3htbFwiKVxuICAgICAgICAuc2V0Q29va2llKE5FWFRfU1RFUF9DT09LSUVfTkFNRSwgbmV4dF9zdGVwKTtcblxuICAgIHJldHVybiBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7XG59OyJdLCJuYW1lcyI6WyJDaGVja2luVmFsdWUiLCJ1c2VyX2NyZWRzX2NvbmZpZyIsIk5TUF9FTUFJTF9ET01BSU4iLCJmaW5kX3BhdHJvbGxlcl9jb25maWciLCJTSEVFVF9JRCIsIlBIT05FX05VTUJFUl9MT09LVVBfU0hFRVQiLCJQSE9ORV9OVU1CRVJfTkFNRV9DT0xVTU4iLCJQSE9ORV9OVU1CRVJfTlVNQkVSX0NPTFVNTiIsImxvZ2luX3NoZWV0X2NvbmZpZyIsIkxPR0lOX1NIRUVUX0xPT0tVUCIsIkNIRUNLSU5fQ09VTlRfTE9PS1VQIiwiU0hFRVRfREFURV9DRUxMIiwiQ1VSUkVOVF9EQVRFX0NFTEwiLCJBUkNISVZFRF9DRUxMIiwiTkFNRV9DT0xVTU4iLCJDQVRFR09SWV9DT0xVTU4iLCJTRUNUSU9OX0RST1BET1dOX0NPTFVNTiIsIkNIRUNLSU5fRFJPUERPV05fQ09MVU1OIiwic2Vhc29uX3NoZWV0X2NvbmZpZyIsIlNFQVNPTl9TSEVFVCIsIlNFQVNPTl9TSEVFVF9OQU1FX0NPTFVNTiIsIlNFQVNPTl9TSEVFVF9EQVlTX0NPTFVNTiIsInNlY3Rpb25fY29uZmlnIiwiU0VDVElPTl9WQUxVRVMiLCJndWVzdF9wYXNzZXNfY29uZmlnIiwiR1VFU1RfUEFTU19TSEVFVCIsIkdVRVNUX1BBU1NfRUxJR0lCTEVfQ09MVU1OIiwiR1VFU1RfUEFTU19FTElHSUJMRV9SRUFTT05fQ09MVU1OIiwiR1VFU1RfUEFTU19TSEVFVF9OQU1FX0NPTFVNTiIsIkdVRVNUX1BBU1NfU0hFRVRfQVZBSUxBQkxFX0NPTFVNTiIsIkdVRVNUX1BBU1NfU0hFRVRfVVNFRF9UT0RBWV9DT0xVTU4iLCJHVUVTVF9QQVNTX1NIRUVUX1VTRURfU0VBU09OX0NPTFVNTiIsIkdVRVNUX1BBU1NfU0hFRVRfREFURVNfU1RBUlRJTkdfQ09MVU1OIiwic2xlZF9iZWFjb25fc2hlZXRfY29uZmlnIiwiU0xFRF9CRUFDT05fU0hFRVQiLCJTTEVEX0JFQUNPTl9TSEVFVF9OQU1FX0NPTFVNTiIsIkJFQUNPTl9TRUFSQ0hfQ09VTlRfQ09MVU1OIiwiQkVBQ09OX0ZJTkRfREFURVNfU1RBUlRJTkdfQ09MVU1OIiwiaGFuZGxlcl9jb25maWciLCJTQ1JJUFRfSUQiLCJTWU5DX1NJRCIsIkFSQ0hJVkVfRlVOQ1RJT05fTkFNRSIsIlJFU0VUX0ZVTkNUSU9OX05BTUUiLCJVU0VfU0VSVklDRV9BQ0NPVU5UIiwiQUNUSU9OX0xPR19TSEVFVCIsIkNIRUNLSU5fVkFMVUVTIiwiQ09ORklHIiwiZ29vZ2xlIiwiTG9naW5TaGVldCIsIlNlYXNvblNoZWV0IiwiVXNlckNyZWRzIiwiQ2hlY2tpblZhbHVlcyIsImdldF9zZXJ2aWNlX2NyZWRlbnRpYWxzX3BhdGgiLCJleGNlbF9yb3dfdG9faW5kZXgiLCJmb3JtYXRfcGhvbmVfZm9yX2Rpc3BsYXkiLCJzYW5pdGl6ZV9waG9uZV9udW1iZXIiLCJidWlsZF9wYXNzZXNfc3RyaW5nIiwiR3Vlc3RQYXNzU2hlZXQiLCJTZWN0aW9uVmFsdWVzIiwiU2xlZEJlYWNvbkNoZWNrU2hlZXQiLCJORVhUX1NURVBTIiwiQVdBSVRfQ09NTUFORCIsIkFXQUlUX0NIRUNLSU4iLCJDT05GSVJNX1JFU0VUIiwiQVVUSF9SRVNFVCIsIkFXQUlUX1NFQ1RJT04iLCJBV0FJVF9QQVNTIiwiQVdBSVRfTUVTU0FHRSIsIkFXQUlUX0JST0FEQ0FTVCIsIkFXQUlUX0JFQUNPTiIsIkNPTU1BTkRTIiwiT05fRFVUWSIsIlNUQVRVUyIsIkNIRUNLSU4iLCJTRUNUSU9OX0FTU0lHTk1FTlQiLCJHVUVTVF9QQVNTIiwiV0hBVFNBUFAiLCJNRVNTQUdFIiwiQlJPQURDQVNUIiwiQkVBQ09OIiwiU01TX01BWF9MRU5HVEgiLCJNRVNTQUdFX1BSRUZJWF9URU1QTEFURSIsIk1FU1NBR0VfUFJFRklYX1NVRkZJWCIsInZhbGlkYXRlX3Ntc19tZXNzYWdlIiwiZnVsbF9tZXNzYWdlIiwiU2VnbWVudGVkTWVzc2FnZSIsInJlcXVpcmUiLCJzZWdtZW50ZWQiLCJub25fZ3NtIiwiZ2V0Tm9uR3NtQ2hhcmFjdGVycyIsImxlbmd0aCIsInZhbGlkIiwicmVhc29uIiwibm9uX2dzbV9jaGFyYWN0ZXJzIiwiU2V0Iiwic2VnbWVudHNDb3VudCIsInNlZ21lbnRzX2NvdW50IiwiQlZOU1BIYW5kbGVyIiwiU0NPUEVTIiwic21zX3JlcXVlc3QiLCJyZXN1bHRfbWVzc2FnZXMiLCJmcm9tIiwidG8iLCJib2R5IiwiYm9keV9yYXciLCJwYXRyb2xsZXIiLCJidm5zcF9uZXh0X3N0ZXAiLCJjaGVja2luX21vZGUiLCJmYXN0X2NoZWNraW4iLCJhc3NpZ25lZF9zZWN0aW9uIiwidHdpbGlvX2NsaWVudCIsInN5bmNfc2lkIiwicmVzZXRfc2NyaXB0X2lkIiwic3luY19jbGllbnQiLCJ1c2VyX2NyZWRzIiwic2VydmljZV9jcmVkcyIsInNoZWV0c19zZXJ2aWNlIiwidXNlcl9zY3JpcHRzX3NlcnZpY2UiLCJsb2dpbl9zaGVldCIsInNlYXNvbl9zaGVldCIsImd1ZXN0X3Bhc3Nfc2hlZXQiLCJzbGVkX2JlYWNvbl9jaGVja19zaGVldCIsImNoZWNraW5fdmFsdWVzIiwiY3VycmVudF9zaGVldF9kYXRlIiwiY29tYmluZWRfY29uZmlnIiwiY29uZmlnIiwic2VjdGlvbl92YWx1ZXMiLCJjb250ZXh0IiwiZXZlbnQiLCJGcm9tIiwibnVtYmVyIiwidW5kZWZpbmVkIiwidGVzdF9udW1iZXIiLCJUbyIsIkJvZHkiLCJ0b0xvd2VyQ2FzZSIsInRyaW0iLCJyZXBsYWNlIiwicmVxdWVzdCIsImNvb2tpZXMiLCJnZXRUd2lsaW9DbGllbnQiLCJlIiwiY29uc29sZSIsImxvZyIsIkRhdGUiLCJwYXJzZV9mYXN0X2NoZWNraW5fbW9kZSIsInBhcnNlZCIsInBhcnNlX2Zhc3RfY2hlY2tpbiIsImtleSIsInBhcnNlX2NoZWNraW4iLCJwYXJzZV9jaGVja2luX2Zyb21fbmV4dF9zdGVwIiwibGFzdF9zZWdtZW50Iiwic3BsaXQiLCJzbGljZSIsImJ5X2tleSIsImRlbGF5Iiwic2Vjb25kcyIsIm9wdGlvbmFsIiwiUHJvbWlzZSIsInJlcyIsInNldFRpbWVvdXQiLCJzZW5kX21lc3NhZ2UiLCJtZXNzYWdlIiwiZ2V0X3R3aWxpb19jbGllbnQiLCJtZXNzYWdlcyIsImNyZWF0ZSIsInB1c2giLCJoYW5kbGUiLCJyZXN1bHQiLCJfaGFuZGxlIiwicmVzcG9uc2UiLCJqb2luIiwibmV4dF9zdGVwIiwibG9nb3V0IiwiY2hlY2tfdXNlcl9jcmVkcyIsImdldF9tYXBwZWRfcGF0cm9sbGVyIiwiYXdhaXRfcmVzcG9uc2UiLCJoYW5kbGVfYXdhaXRfY29tbWFuZCIsImNoZWNraW4iLCJzdGFydHNXaXRoIiwibmFtZSIsInJlc2V0X3NoZWV0X2Zsb3ciLCJzZWN0aW9uIiwicGFyc2Vfc2VjdGlvbiIsImFzc2lnbl9zZWN0aW9uIiwicHJvbXB0X3NlY3Rpb25fYXNzaWdubWVudCIsInNlbmRfdGV4dF9tZXNzYWdlIiwic2VuZF9icm9hZGNhc3RfbWVzc2FnZSIsImJlYWNvbl9zZWFyY2hfbG9jYXRpb24iLCJwYXJzZV9iZWFjb25fc2VhcmNoX2xvY2F0aW9uIiwic2V0X2JlYWNvbl9zZWFyY2giLCJwcm9tcHRfYmVhY29uX3NlYXJjaCIsInByb21wdF9jb21tYW5kIiwicGF0cm9sbGVyX25hbWUiLCJpbmNsdWRlcyIsImdldF9vbl9kdXR5IiwiZ2V0X3N0YXR1cyIsInByb21wdF9jaGVja2luIiwicHJvbXB0X2d1ZXN0X3Bhc3MiLCJwYXJzZV9mYXN0X3NlY3Rpb25fYXNzaWdubWVudCIsInByb21wdF9tZXNzYWdlIiwicHJvbXB0X2Jyb2FkY2FzdCIsInR5cGVzIiwiT2JqZWN0IiwidmFsdWVzIiwibWFwIiwieCIsInNtc19kZXNjIiwic2VnbWVudHMiLCJsYXN0U2VnbWVudCIsInBvcCIsImZpcnN0UGFydCIsIm1hcF9zZWN0aW9uIiwic2VjdGlvbl9kZXNjcmlwdGlvbiIsImdldF9zZWN0aW9uX2Rlc2NyaXB0aW9uIiwiZ2V0X21lc3NhZ2VfcHJlZml4Iiwic2VuZGVyX25hbWUiLCJzZW5kZXJfcGhvbmUiLCJmb3JtYXR0ZWRfcGhvbmUiLCJnZXRfbWF4X21lc3NhZ2VfbGVuZ3RoIiwiZ2V0X2xvZ2luX3NoZWV0IiwicmVjaXBpZW50cyIsImdldF9vbl9kdXR5X3BhdHJvbGxlcnMiLCJtYXhfbGVuZ3RoIiwibWVzc2FnZV90ZXh0IiwicHJlZml4IiwidmFsaWRhdGlvbiIsImJhZF9jaGFycyIsInNpZ25lZF9pbl9wYXRyb2xsZXJzIiwicGhvbmVfbWFwIiwiZ2V0X3Bob25lX251bWJlcl9tYXAiLCJyZWNpcGllbnRfbWFwIiwibm9fcGhvbmVfbmFtZXMiLCJwaG9uZSIsInNlbnRfY291bnQiLCJjb3B5X3NlbnRfdG9fc2VuZGVyIiwiZmFpbGVkX25hbWVzIiwiZGVsaXZlcl9zbXNfdG9fbWFwIiwibG9nX2FjdGlvbiIsImFsbF9mYWlsZWQiLCJlbnRyaWVzIiwibm9ybWFsaXplZF9zZW5kZXIiLCJzZW5kZXJfaW5fbWFwIiwicmVjaXBpZW50X2NvdW50Iiwia2V5cyIsImdldF9zaGVldHNfc2VydmljZSIsIm9wdHMiLCJzcHJlYWRzaGVldHMiLCJnZXQiLCJzcHJlYWRzaGVldElkIiwicmFuZ2UiLCJ2YWx1ZVJlbmRlck9wdGlvbiIsImRhdGEiLCJyb3ciLCJyYXdOdW1iZXIiLCJhc3NpZ25lZFNlY3Rpb24iLCJtYXBwZWRfc2VjdGlvbiIsInJlZnJlc2giLCJzaGVldCIsImdldF9zbGVkX2JlYWNvbl9jaGVja19zaGVldCIsInByaW9yX3NlYXJjaGVzIiwiZ2V0X2JlYWNvbl9zZWFyY2hlcyIsInNldF9iZWFjb25zX3NlYXJjaGVzIiwidXBkYXRlZCIsInN0YXR1cyIsInNlYXJjaF9jb3VudCIsInNoZWV0X2RhdGUiLCJ0b0RhdGVTdHJpbmciLCJjdXJyZW50X2RhdGUiLCJpc19jdXJyZW50IiwiZ2V0X3N0YXR1c19zdHJpbmciLCJndWVzdF9wYXNzX3Byb21pc2UiLCJnZXRfZ3Vlc3RfcGFzc19zaGVldCIsImdldF9hdmFpbGFibGVfYW5kX3VzZWRfcGFzc2VzIiwicGF0cm9sbGVyX3N0YXR1cyIsImNoZWNraW5Db2x1bW5TZXQiLCJjaGVja2VkT3V0IiwiYnlfc2hlZXRfc3RyaW5nIiwidG9TdHJpbmciLCJjb21wbGV0ZWRQYXRyb2xEYXlzIiwiZ2V0X3NlYXNvbl9zaGVldCIsImdldF9wYXRyb2xsZWRfZGF5cyIsImNvbXBsZXRlZFBhdHJvbERheXNTdHJpbmciLCJsb2dpblNoZWV0RGF0ZSIsInN0YXR1c1N0cmluZyIsInVzZWRUb2RheUd1ZXN0UGFzc2VzIiwidXNlZF90b2RheSIsInVzZWRTZWFzb25HdWVzdFBhc3NlcyIsInVzZWRfc2Vhc29uIiwiYXZhaWxhYmxlR3Vlc3RQYXNzZXMiLCJhdmFpbGFibGUiLCJzaGVldF9uZWVkc19yZXNldCIsIkVycm9yIiwibmV3X2NoZWNraW5fdmFsdWUiLCJzaGVldHNfdmFsdWUiLCJmYXN0X2NoZWNraW5zIiwicmVzZXRfc2hlZXQiLCJzY3JpcHRfc2VydmljZSIsImdldF91c2VyX3NjcmlwdHNfc2VydmljZSIsInNob3VsZF9wZXJmb3JtX2FyY2hpdmUiLCJhcmNoaXZlZCIsInNjcmlwdHMiLCJydW4iLCJzY3JpcHRJZCIsInJlcXVlc3RCb2R5IiwiZnVuY3Rpb24iLCJnZXRfdXNlcl9jcmVkcyIsImxvYWRUb2tlbiIsImF1dGhVcmwiLCJnZXRBdXRoVXJsIiwiY2hlY2tlZF9vdXRfc2VjdGlvbiIsImxhc3Rfc2VjdGlvbnMiLCJvbl9kdXR5X3BhdHJvbGxlcnMiLCJieV9zZWN0aW9uIiwiZmlsdGVyIiwicmVkdWNlIiwicHJldiIsImN1ciIsInNob3J0X2NvZGUiLCJyZXN1bHRzIiwiYWxsX2tleXMiLCJvcmRlcmVkX3ByaW1hcnlfc2VjdGlvbnMiLCJzb3J0IiwiZmlsdGVyZWRfbGFzdF9zZWN0aW9ucyIsIm9yZGVyZWRfc2VjdGlvbnMiLCJjb25jYXQiLCJwYXRyb2xsZXJzIiwieSIsImxvY2FsZUNvbXBhcmUiLCJwYXRyb2xsZXJfc3RyaW5nIiwiZGV0YWlscyIsInRvVXBwZXJDYXNlIiwiciIsImFjdGlvbl9uYW1lIiwiYXBwZW5kIiwidmFsdWVJbnB1dE9wdGlvbiIsImRlbGV0ZVRva2VuIiwiZ2V0X3N5bmNfY2xpZW50Iiwic3luYyIsInYxIiwic2VydmljZXMiLCJnZXRfc2VydmljZV9jcmVkcyIsImF1dGgiLCJHb29nbGVBdXRoIiwia2V5RmlsZSIsInNjb3BlcyIsImdldF92YWxpZF9jcmVkcyIsInJlcXVpcmVfdXNlcl9jcmVkcyIsIm9hdXRoMl9jbGllbnQiLCJzaGVldHMiLCJ2ZXJzaW9uIiwic2NyaXB0IiwiZm9yY2UiLCJwaG9uZV9sb29rdXAiLCJmaW5kX3BhdHJvbGxlcl9mcm9tX251bWJlciIsIm1hcHBlZFBhdHJvbGxlciIsInRyeV9maW5kX3BhdHJvbGxlciIsInJhd19udW1iZXIiLCJjdXJyZW50TnVtYmVyIiwiY3VycmVudE5hbWUiLCJ1c2VkX2FuZF9hdmFpbGFibGUiLCJnZXRfcHJvbXB0Iiwic2V0X3VzZWRfZ3Vlc3RfcGFzc2VzIiwicGFyc2VfbG9jYXRpb24iLCJyb3dfY29sX3RvX2V4Y2VsX2luZGV4IiwicGFyc2VfYm9vbGVhbl9jZWxsIiwiR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIiLCJmb3JtYXRfZGF0ZV9mb3Jfc3ByZWFkc2hlZXRfdmFsdWUiLCJVc2VkQW5kQXZhaWxhYmxlUGFzc2VzIiwiaW5kZXgiLCJlbGlnaWJsZSIsImVsaWdpYmxlX3JlYXNvbiIsIlN0cmluZyIsIk51bWJlciIsIlBhc3NTaGVldCIsInBhdHJvbGxlcl9yb3ciLCJnZXRfc2hlZXRfcm93X2Zvcl9wYXRyb2xsZXIiLCJuYW1lX2NvbHVtbiIsImVsaWdpYmxlX2NvbHVtbiIsImVsaWdpYmxlX3JlYXNvbl9jb2x1bW4iLCJjdXJyZW50X2RheV9hdmFpbGFibGVfcGFzc2VzIiwiYXZhaWxhYmxlX2NvbHVtbiIsImN1cnJlbnRfZGF5X3VzZWRfcGFzc2VzIiwidXNlZF90b2RheV9jb2x1bW4iLCJjdXJyZW50X3NlYXNvbl91c2VkX3Bhc3NlcyIsInVzZWRfc2Vhc29uX2NvbHVtbiIsInJvd251bSIsInN0YXJ0X2luZGV4IiwicHJpb3JfbGVuZ3RoIiwiY3VycmVudF9kYXRlX3N0cmluZyIsIm5ld192YWxzIiwidXBkYXRlX2xlbmd0aCIsIk1hdGgiLCJtYXgiLCJlbmRfaW5kZXgiLCJzaGVldF9uYW1lIiwidXBkYXRlX3ZhbHVlcyIsImxvb2t1cF9yb3dfY29sX2luX3NoZWV0Iiwic2FuaXRpemVfZGF0ZSIsImNoZWNraW5fY291bnRfc2hlZXQiLCJyb3dzIiwiY2hlY2tpbl9jb3VudCIsImdldF92YWx1ZXMiLCJpIiwicGFyc2VfcGF0cm9sbGVyX3JvdyIsImdldFRpbWUiLCJKU09OIiwic3RyaW5naWZ5IiwicGF0cm9sbGVyX3NlY3Rpb24iLCJuZXdfc2VjdGlvbl92YWx1ZSIsImNhdGVnb3J5IiwiZmlsdGVyX2xpc3RfdG9fZW5kc3dpdGhfY3VycmVudF9kYXkiLCJjdXJyZW50RGF5IiwiQmVhY29uU2VhcmNoZXMiLCJiZWFjb25fc2VhcmNoX2NvdW50X2NvbHVtbiIsImdldF9wYXRyb2xsZWRfYmVhY29uX2ZpbmRfY291bnQiLCJzZWFyY2hfbG9jYXRpb24iLCJyb3dfbnVtIiwiY2xlYW5TbXNWYWx1ZSIsImlucHV0IiwiY2xlYW5lZCIsImNoYXJBdCIsInN1YnN0cmluZyIsImxvYWRfY3JlZGVudGlhbHNfZmlsZXMiLCJ2YWxpZGF0ZV9zY29wZXMiLCJkb21haW4iLCJsb2FkZWQiLCJjcmVkZW50aWFscyIsImNsaWVudF9zZWNyZXQiLCJjbGllbnRfaWQiLCJyZWRpcmVjdF91cmlzIiwid2ViIiwiT0F1dGgyIiwidG9rZW5fa2V5Iiwib2F1dGgyRG9jIiwiZG9jdW1lbnRzIiwiZmV0Y2giLCJ0b2tlbiIsInNldENyZWRlbnRpYWxzIiwic2lkIiwicmVtb3ZlIiwiY29tcGxldGVMb2dpbiIsImNvZGUiLCJnZXRUb2tlbiIsInRva2VucyIsIm9hdXRoRG9jIiwidW5pcXVlTmFtZSIsInVwZGF0ZSIsImlkIiwiZ2VuZXJhdGVSYW5kb21TdHJpbmciLCJkb2MiLCJ0dGwiLCJhY2Nlc3NfdHlwZSIsInNjb3BlIiwic3RhdGUiLCJnZW5lcmF0ZUF1dGhVcmwiLCJjaGFyYWN0ZXJzIiwiY2hhcmFjdGVyc0xlbmd0aCIsImZsb29yIiwicmFuZG9tIiwibG9va3VwX3ZhbHVlcyIsIkFycmF5Iiwic21zX2Rlc2Nfc3BsaXQiLCJsb29rdXBfdmFscyIsImJ5X2x2IiwiYnlfZmMiLCJjaGVja2luVmFsdWVzIiwiY2hlY2tpblZhbHVlIiwibHYiLCJmYyIsImNoZWNraW5fbG93ZXIiLCJleGNlbF9kYXRlX3RvX2pzX2RhdGUiLCJkYXRlIiwic2V0VVRDTWlsbGlzZWNvbmRzIiwicm91bmQiLCJjaGFuZ2VfdGltZXpvbmVfdG9fcHN0IiwidG9VVENTdHJpbmciLCJzdHJpcF9kYXRldGltZV90b19kYXRlIiwidG9Mb2NhbGVEYXRlU3RyaW5nIiwidGltZVpvbmUiLCJwYWRTdGFydCIsImZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2RhdGUiLCJsaXN0IiwiZGF0ZXN0ciIsImVuZHNXaXRoIiwiZnMiLCJwYXJzZSIsInJlYWRGaWxlU3luYyIsIlJ1bnRpbWUiLCJnZXRBc3NldHMiLCJwYXRoIiwic2hlZXRfaWQiLCJfZ2V0X3ZhbHVlcyIsImxvb2t1cF9pbmRleCIsInVwZGF0ZU1lIiwibG9va3VwUmFuZ2UiLCJ1c2VkIiwidG90YWwiLCJ0b2RheSIsImZvcmNlX3RvZGF5IiwiZGVzaXJlZF9zY29wZXMiLCJkZXNpcmVkX3Njb3BlIiwiZXJyb3IiLCJzZWN0aW9ucyIsImxvd2VyY2FzZV9zZWN0aW9ucyIsImluZGV4T2YiLCJjb2wiLCJjb2xTdHJpbmciLCJtb2R1bG8iLCJjb2xMZXR0ZXIiLCJmcm9tQ2hhckNvZGUiLCJjaGFyQ29kZUF0Iiwic3BsaXRfdG9fcm93X2NvbCIsImV4Y2VsX2luZGV4IiwicmVnZXgiLCJSZWdFeHAiLCJtYXRjaCIsImV4ZWMiLCJyYXdfcm93IiwibGV0dGVycyIsImxvd2VyTGV0dGVycyIsInAiLCJjaGFyYWN0ZXJWYWx1ZSIsInZhbHVlIiwibmV3X251bWJlciIsInRlbXBvcmFyeV9uZXdfbnVtYmVyIiwicGFyc2VJbnQiLCJ0ZW5fZGlnaXRzIiwiTkVYVF9TVEVQX0NPT0tJRV9OQU1FIiwiaGFuZGxlciIsImNhbGxiYWNrIiwiaGFuZGxlcl9yZXNwb25zZSIsInN0YWNrIiwiVHdpbGlvIiwiUmVzcG9uc2UiLCJ0d2ltbCIsIk1lc3NhZ2luZ1Jlc3BvbnNlIiwic2V0Qm9keSIsImFwcGVuZEhlYWRlciIsInNldENvb2tpZSJdLCJzb3VyY2VSb290IjoiIn0=