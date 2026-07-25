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
const comp_passes_config = {
    SHEET_ID: "test",
    COMP_PASS_SHEET: "Comps",
    COMP_PASS_SHEET_NAME_COLUMN: "A",
    COMP_PASS_SHEET_DATES_AVAILABLE_COLUMN: "D",
    COMP_PASS_SHEET_USED_TODAY_COLUMN: "E",
    COMP_PASS_SHEET_USED_SEASON_COLUMN: "F",
    COMP_PASS_SHEET_DATES_STARTING_COLUMN: "G"
};
const manager_passes_config = {
    SHEET_ID: "test",
    MANAGER_PASS_SHEET: "Managers",
    MANAGER_PASS_SHEET_NAME_COLUMN: "A",
    MANAGER_PASS_SHEET_AVAILABLE_COLUMN: "E",
    MANAGER_PASS_SHEET_USED_TODAY_COLUMN: "C",
    MANAGER_PASS_SHEET_USED_SEASON_COLUMN: "B",
    MANAGER_PASS_SHEET_DATES_STARTING_COLUMN: "F"
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
    ...comp_passes_config,
    ...manager_passes_config,
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
/* harmony import */ var _utils_comp_passes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/comp_passes */ "./src/utils/comp_passes.ts");
/* harmony import */ var _sheets_comp_pass_sheet__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../sheets/comp_pass_sheet */ "./src/sheets/comp_pass_sheet.ts");
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
    COMP_PASS: [
        "comp-pass",
        "comppass",
        "comp"
    ],
    MANAGER_PASS: [
        "manager-pass",
        "managerpass",
        "manager"
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
    comp_pass_sheet = null;
    manager_pass_sheet = null;
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
     * Parses the pass type from the next step.
     * @returns {CompPassType} The parsed pass type.
     */ parse_pass_from_next_step() {
        const last_segment = this.bvnsp_next_step?.split("-").slice(-2).join("-");
        return last_segment;
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
            const type = this.parse_pass_from_next_step();
            const guest_name = this.body_raw;
            if (guest_name.trim() !== "" && [
                _utils_comp_passes__WEBPACK_IMPORTED_MODULE_9__.CompPassType.CompPass,
                _utils_comp_passes__WEBPACK_IMPORTED_MODULE_9__.CompPassType.ManagerPass
            ].includes(type)) {
                return await this.prompt_comp_manager_pass(type, guest_name);
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
        if (COMMANDS.COMP_PASS.includes(this.body)) {
            console.log(`Performing comp_pass for ${patroller_name}`);
            return await this.prompt_comp_manager_pass(_utils_comp_passes__WEBPACK_IMPORTED_MODULE_9__.CompPassType.CompPass, null);
        }
        if (this.parse_fast_section_assignment(this.body)) {
            console.log(`Performing fast section_assignment for ${patroller_name} to ${this.assigned_section}`);
            return await this.assign_section(this.assigned_section);
        }
        if (COMMANDS.SECTION_ASSIGNMENT.includes(this.body)) {
            console.log(`Performing section_assignment for ${patroller_name}`);
            return await this.prompt_section_assignment();
        }
        if (COMMANDS.MANAGER_PASS.includes(this.body)) {
            console.log(`Performing manager_pass for ${patroller_name}`);
            return await this.prompt_comp_manager_pass(_utils_comp_passes__WEBPACK_IMPORTED_MODULE_9__.CompPassType.ManagerPass, null);
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
Check in / Check out / Status / On Duty / Section Assignment / Comp Pass / Manager Pass / Message / Whatsapp
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
     * @param {CompPassType} pass_type - The type of pass.
     * @param {number | null} passes_to_use - The number of passes to use.
     * @returns {Promise<BVNSPResponse>} A promise that resolves with the response.
     */ async prompt_comp_manager_pass(pass_type, guest_name) {
        if (this.patroller.category == "C") {
            return {
                response: `${this.patroller.name}, candidates do not receive comp or manager passes.`
            };
        }
        const sheet = await (pass_type == _utils_comp_passes__WEBPACK_IMPORTED_MODULE_9__.CompPassType.CompPass ? this.get_comp_pass_sheet() : this.get_manager_pass_sheet());
        const used_and_available = await sheet.get_available_and_used_passes(this.patroller?.name);
        if (used_and_available == null) {
            return {
                response: "Problem looking up patroller for comp passes"
            };
        }
        if (guest_name == null) {
            return used_and_available.get_prompt();
        } else {
            await this.log_action(`use_${pass_type}`);
            await sheet.set_used_comp_passes(used_and_available, guest_name);
            return {
                response: `Updated ${this.patroller.name} to use ${(0,_utils_comp_passes__WEBPACK_IMPORTED_MODULE_9__.get_comp_pass_description)(pass_type)} for guest "${guest_name}" today.`
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
        const comp_pass_promise = (await this.get_comp_pass_sheet()).get_available_and_used_passes(this.patroller.name);
        const manager_pass_promise = (await this.get_manager_pass_sheet()).get_available_and_used_passes(this.patroller.name);
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
        const usedTodayCompPasses = (await comp_pass_promise)?.used_today || 0;
        const usedTodayManagerPasses = (await manager_pass_promise)?.used_today || 0;
        const usedSeasonCompPasses = (await comp_pass_promise)?.used_season || 0;
        const usedSeasonManagerPasses = (await manager_pass_promise)?.used_season || 0;
        const availableCompPasses = (await comp_pass_promise)?.available || 0;
        const availableManagerPasses = (await manager_pass_promise)?.available || 0;
        statusString += " " + (0,_utils_comp_passes__WEBPACK_IMPORTED_MODULE_9__.build_passes_string)(usedSeasonCompPasses, usedSeasonCompPasses + availableCompPasses, usedTodayCompPasses, "comp passes");
        if (usedSeasonManagerPasses + availableManagerPasses > 0) {
            statusString += " " + (0,_utils_comp_passes__WEBPACK_IMPORTED_MODULE_9__.build_passes_string)(usedSeasonManagerPasses, usedSeasonManagerPasses + availableManagerPasses, usedTodayManagerPasses, "manager passes");
        }
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
     * Gets the comp pass sheet.
     * @returns {Promise<CompPassSheet>} A promise that resolves with the comp pass sheet
     */ async get_comp_pass_sheet() {
        if (!this.comp_pass_sheet) {
            const config = this.combined_config;
            const sheets_service = await this.get_sheets_service();
            const season_sheet = new _sheets_comp_pass_sheet__WEBPACK_IMPORTED_MODULE_10__.CompPassSheet(sheets_service, config);
            this.comp_pass_sheet = season_sheet;
        }
        return this.comp_pass_sheet;
    }
    /**
     * Gets the manager pass sheet.
     * @returns {Promise<ManagerPassSheet>} A promise that resolves with the manager pass sheet
     */ async get_manager_pass_sheet() {
        if (!this.manager_pass_sheet) {
            const config = this.combined_config;
            const sheets_service = await this.get_sheets_service();
            const season_sheet = new _sheets_comp_pass_sheet__WEBPACK_IMPORTED_MODULE_10__.ManagerPassSheet(sheets_service, config);
            this.manager_pass_sheet = season_sheet;
        }
        return this.manager_pass_sheet;
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

/***/ "./src/sheets/comp_pass_sheet.ts"
/*!***************************************!*\
  !*** ./src/sheets/comp_pass_sheet.ts ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CompPassSheet: () => (/* binding */ CompPassSheet),
/* harmony export */   ManagerPassSheet: () => (/* binding */ ManagerPassSheet),
/* harmony export */   PassSheet: () => (/* binding */ PassSheet),
/* harmony export */   UsedAndAvailablePasses: () => (/* binding */ UsedAndAvailablePasses)
/* harmony export */ });
/* harmony import */ var _utils_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/util */ "./src/utils/util.ts");
/* harmony import */ var _utils_google_sheets_spreadsheet_tab__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/google_sheets_spreadsheet_tab */ "./src/utils/google_sheets_spreadsheet_tab.ts");
/* harmony import */ var _utils_datetime_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/datetime_util */ "./src/utils/datetime_util.ts");
/* harmony import */ var _utils_comp_passes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/comp_passes */ "./src/utils/comp_passes.ts");




class UsedAndAvailablePasses {
    row;
    index;
    available;
    used_today;
    used_season;
    comp_pass_type;
    constructor(row, index, available, used_today, used_season, type){
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
            let pass_string = (0,_utils_comp_passes__WEBPACK_IMPORTED_MODULE_3__.get_comp_pass_description)(this.comp_pass_type);
            response = (0,_utils_comp_passes__WEBPACK_IMPORTED_MODULE_3__.build_passes_string)(this.used_season, this.available + this.used_season, this.used_today, `${pass_string}es`, true);
            response += "\n\n" + `Enter the first and last name of the guest that will use a ${pass_string} today (or 'restart'):`;
            if (response != null) {
                return {
                    response: response,
                    next_step: `await-pass-${this.comp_pass_type}`
                };
            }
        }
        return {
            response: `You do not have any ${(0,_utils_comp_passes__WEBPACK_IMPORTED_MODULE_3__.get_comp_pass_description)(this.comp_pass_type)} available today`
        };
    }
}
class PassSheet {
    sheet;
    comp_pass_type;
    constructor(sheet, type){
        this.sheet = sheet;
        this.comp_pass_type = type;
    }
    async get_available_and_used_passes(patroller_name) {
        const patroller_row = await this.sheet.get_sheet_row_for_patroller(patroller_name, this.name_column);
        if (patroller_row == null) {
            return null;
        }
        const current_day_available_passes = patroller_row.row[(0,_utils_util__WEBPACK_IMPORTED_MODULE_0__.excel_row_to_index)(this.available_column)];
        const current_day_used_passes = patroller_row.row[(0,_utils_util__WEBPACK_IMPORTED_MODULE_0__.excel_row_to_index)(this.used_today_column)];
        const current_season_used_passes = patroller_row.row[(0,_utils_util__WEBPACK_IMPORTED_MODULE_0__.excel_row_to_index)(this.used_season_column)];
        return new UsedAndAvailablePasses(patroller_row.row, patroller_row.index, current_day_available_passes, current_day_used_passes, current_season_used_passes, this.comp_pass_type);
    }
    async set_used_comp_passes(patroller_row, guest_name) {
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
class CompPassSheet extends PassSheet {
    config;
    constructor(sheets_service, config){
        super(new _utils_google_sheets_spreadsheet_tab__WEBPACK_IMPORTED_MODULE_1__["default"](sheets_service, config.SHEET_ID, config.COMP_PASS_SHEET), _utils_comp_passes__WEBPACK_IMPORTED_MODULE_3__.CompPassType.CompPass);
        this.config = config;
    }
    get start_index() {
        return (0,_utils_util__WEBPACK_IMPORTED_MODULE_0__.excel_row_to_index)(this.config.COMP_PASS_SHEET_DATES_STARTING_COLUMN);
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
class ManagerPassSheet extends PassSheet {
    config;
    constructor(sheets_service, config){
        super(new _utils_google_sheets_spreadsheet_tab__WEBPACK_IMPORTED_MODULE_1__["default"](sheets_service, config.SHEET_ID, config.MANAGER_PASS_SHEET), _utils_comp_passes__WEBPACK_IMPORTED_MODULE_3__.CompPassType.ManagerPass);
        this.config = config;
    }
    get start_index() {
        return (0,_utils_util__WEBPACK_IMPORTED_MODULE_0__.excel_row_to_index)(this.config.MANAGER_PASS_SHEET_DATES_STARTING_COLUMN);
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

/***/ "./src/utils/comp_passes.ts"
/*!**********************************!*\
  !*** ./src/utils/comp_passes.ts ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CompPassType: () => (/* binding */ CompPassType),
/* harmony export */   build_passes_string: () => (/* binding */ build_passes_string),
/* harmony export */   get_comp_pass_description: () => (/* binding */ get_comp_pass_description)
/* harmony export */ });
/**
 * Enum for different types of comp passes.
 * @enum {string}
 */ var CompPassType = /*#__PURE__*/ function(CompPassType) {
    CompPassType["CompPass"] = "comp-pass";
    CompPassType["ManagerPass"] = "manager-pass";
    return CompPassType;
}({});
/**
 * Get the description for a given comp pass type.
 * @param {CompPassType} type - The type of the comp pass.
 * @returns {string} The description of the comp pass type.
 */ function get_comp_pass_description(type) {
    switch(type){
        case "comp-pass":
            return "Comp Pass";
        case "manager-pass":
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RyxDQUFDLFNBQVNGLEVBQUV3QyxJQUFJO1lBQzNCdkMsUUFBUUMsR0FBRyxDQUFDLFNBQVNGLEVBQUV1QixPQUFPO1FBQ2xDO0lBQ0o7SUFFQSxNQUFNUSxXQUFXLElBQUk2VixPQUFPQyxRQUFRO0lBQ3BDLE1BQU1DLFFBQVEsSUFBSUYsT0FBT0UsS0FBSyxDQUFDQyxpQkFBaUI7SUFFaERELE1BQU12VyxPQUFPLENBQUNBO0lBRWRRLFFBQ0ksaURBQWlEO0tBQ2hEaVcsT0FBTyxDQUFDRixNQUFNblAsUUFBUSxHQUN2Qiw0REFBNEQ7S0FDM0RzUCxZQUFZLENBQUMsZ0JBQWdCLFlBQzdCQyxTQUFTLENBQUNYLHVCQUF1QnZWO0lBRXRDLE9BQU95VixTQUFTLE1BQU0xVjtBQUMxQixFQUFFIiwic291cmNlcyI6WyIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL25vZGVfbW9kdWxlcy9AdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzL2luZGV4LmpzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvZW52L2hhbmRsZXJfY29uZmlnLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvaGFuZGxlcnMvYnZuc3BfaGFuZGxlci50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3NoZWV0cy9jb21wX3Bhc3Nfc2hlZXQudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9zaGVldHMvbG9naW5fc2hlZXQudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9zaGVldHMvc2Vhc29uX3NoZWV0LnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXNlci1jcmVkcy50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3V0aWxzL2NoZWNraW5fdmFsdWVzLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvY29tcF9wYXNzZXMudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91dGlscy9kYXRldGltZV91dGlsLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvZmlsZV91dGlscy50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3V0aWxzL2dvb2dsZV9zaGVldHNfc3ByZWFkc2hlZXRfdGFiLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvc2NvcGVfdXRpbC50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3V0aWxzL3NlY3Rpb25fdmFsdWVzLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvdXRpbC50cyIsImV4dGVybmFsIGNvbW1vbmpzIFwiZ29vZ2xlYXBpc1wiIiwiZXh0ZXJuYWwgY29tbW9uanMgXCJzbXMtc2VnbWVudHMtY2FsY3VsYXRvclwiIiwiZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImZzXCIiLCJ3ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9oYW5kbGVycy9oYW5kbGVyLnByb3RlY3RlZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJbnRlbnRpb25hbGx5IGxlZnQgZW1wdHlcbiIsImltcG9ydCB7IENoZWNraW5WYWx1ZSB9IGZyb20gXCIuLi91dGlscy9jaGVja2luX3ZhbHVlc1wiO1xuXG4vKipcbiAqIEVudmlyb25tZW50IGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBoYW5kbGVyLlxuICogPHA+XG4gKiBOb3RlOiBUaGVzZSBhcmUgdGhlIG9ubHkgc2VjcmV0IHZhbHVlcyB3ZSBuZWVkIHRvIHJlYWQuIFJlc3QgY2FuIGJlIGRlcGxveWVkLlxuICogQHR5cGVkZWYge09iamVjdH0gSGFuZGxlckVudmlyb25tZW50XG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0NSSVBUX0lEIC0gVGhlIElEIG9mIHRoZSBHb29nbGUgQXBwcyBTY3JpcHQgcHJvamVjdC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTWU5DX1NJRCAtIFRoZSBTSUQgb2YgdGhlIFR3aWxpbyBTeW5jIHNlcnZpY2UuXG4gKi9cbnR5cGUgSGFuZGxlckVudmlyb25tZW50ID0ge1xuICAgIFNIRUVUX0lEOiBzdHJpbmc7XG4gICAgU0NSSVBUX0lEOiBzdHJpbmc7XG4gICAgU1lOQ19TSUQ6IHN0cmluZztcbn07XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgdXNlciBjcmVkZW50aWFscy5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IFVzZXJDcmVkc0NvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsfSBOU1BfRU1BSUxfRE9NQUlOIC0gVGhlIGVtYWlsIGRvbWFpbiBmb3IgTlNQLlxuICovXG50eXBlIFVzZXJDcmVkc0NvbmZpZyA9IHtcbiAgICBOU1BfRU1BSUxfRE9NQUlOOiBzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsO1xufTtcbmNvbnN0IHVzZXJfY3JlZHNfY29uZmlnOiBVc2VyQ3JlZHNDb25maWcgPSB7XG4gICAgTlNQX0VNQUlMX0RPTUFJTjogXCJmYXJ3ZXN0Lm9yZ1wiLFxufTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciBmaW5kaW5nIGEgcGF0cm9sbGVyLlxuICogQHR5cGVkZWYge09iamVjdH0gRmluZFBhdHJvbGxlckNvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFNIRUVUX0lEIC0gVGhlIElEIG9mIHRoZSBHb29nbGUgU2hlZXRzIHNwcmVhZHNoZWV0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFBIT05FX05VTUJFUl9MT09LVVBfU0hFRVQgLSBUaGUgcmFuZ2UgZm9yIHBob25lIG51bWJlciBsb29rdXAuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gUEhPTkVfTlVNQkVSX05VTUJFUl9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBwaG9uZSBudW1iZXJzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFBIT05FX05VTUJFUl9OQU1FX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIG5hbWVzLlxuICovXG50eXBlIEZpbmRQYXRyb2xsZXJDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICBQSE9ORV9OVU1CRVJfTE9PS1VQX1NIRUVUOiBzdHJpbmc7XG4gICAgUEhPTkVfTlVNQkVSX05VTUJFUl9DT0xVTU46IHN0cmluZztcbiAgICBQSE9ORV9OVU1CRVJfTkFNRV9DT0xVTU46IHN0cmluZztcbn07XG5cbmNvbnN0IGZpbmRfcGF0cm9sbGVyX2NvbmZpZzogRmluZFBhdHJvbGxlckNvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogXCJ0ZXN0XCIsXG4gICAgUEhPTkVfTlVNQkVSX0xPT0tVUF9TSEVFVDogXCJQaG9uZSBOdW1iZXJzIUEyOkIxMDBcIixcbiAgICBQSE9ORV9OVU1CRVJfTkFNRV9DT0xVTU46IFwiQVwiLFxuICAgIFBIT05FX05VTUJFUl9OVU1CRVJfQ09MVU1OOiBcIkJcIixcbn07XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgdGhlIGxvZ2luIHNoZWV0LlxuICogQHR5cGVkZWYge09iamVjdH0gTG9naW5TaGVldENvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFNIRUVUX0lEIC0gVGhlIElEIG9mIHRoZSBHb29nbGUgU2hlZXRzIHNwcmVhZHNoZWV0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IExPR0lOX1NIRUVUX0xPT0tVUCAtIFRoZSByYW5nZSBmb3IgbG9naW4gc2hlZXQgbG9va3VwLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IENIRUNLSU5fQ09VTlRfTE9PS1VQIC0gVGhlIHJhbmdlIGZvciBjaGVjay1pbiBjb3VudCBsb29rdXAuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQVJDSElWRURfQ0VMTCAtIFRoZSBjZWxsIGZvciBhcmNoaXZlZCBkYXRhLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNIRUVUX0RBVEVfQ0VMTCAtIFRoZSBjZWxsIGZvciB0aGUgc2hlZXQgZGF0ZS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDVVJSRU5UX0RBVEVfQ0VMTCAtIFRoZSBjZWxsIGZvciB0aGUgY3VycmVudCBkYXRlLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IE5BTUVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgbmFtZXMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQ0FURUdPUllfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgY2F0ZWdvcmllcy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTRUNUSU9OX0RST1BET1dOX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIHNlY3Rpb24gZHJvcGRvd24uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBjaGVjay1pbiBkcm9wZG93bi5cbiAqL1xudHlwZSBMb2dpblNoZWV0Q29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBzdHJpbmc7XG4gICAgTE9HSU5fU0hFRVRfTE9PS1VQOiBzdHJpbmc7XG4gICAgQ0hFQ0tJTl9DT1VOVF9MT09LVVA6IHN0cmluZztcbiAgICBBUkNISVZFRF9DRUxMOiBzdHJpbmc7XG4gICAgU0hFRVRfREFURV9DRUxMOiBzdHJpbmc7XG4gICAgQ1VSUkVOVF9EQVRFX0NFTEw6IHN0cmluZztcbiAgICBOQU1FX0NPTFVNTjogc3RyaW5nO1xuICAgIENBVEVHT1JZX0NPTFVNTjogc3RyaW5nO1xuICAgIFNFQ1RJT05fRFJPUERPV05fQ09MVU1OOiBzdHJpbmc7XG4gICAgQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU46IHN0cmluZztcbn07XG5cbmNvbnN0IGxvZ2luX3NoZWV0X2NvbmZpZzogTG9naW5TaGVldENvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogXCJ0ZXN0XCIsXG4gICAgTE9HSU5fU0hFRVRfTE9PS1VQOiBcIkxvZ2luIUExOkkxMDBcIixcbiAgICBDSEVDS0lOX0NPVU5UX0xPT0tVUDogXCJUb29scyFHMjpHMlwiLFxuICAgIFNIRUVUX0RBVEVfQ0VMTDogXCJCMVwiLFxuICAgIENVUlJFTlRfREFURV9DRUxMOiBcIkIyXCIsXG4gICAgQVJDSElWRURfQ0VMTDogXCJIMVwiLFxuICAgIE5BTUVfQ09MVU1OOiBcIkFcIixcbiAgICBDQVRFR09SWV9DT0xVTU46IFwiQlwiLFxuICAgIFNFQ1RJT05fRFJPUERPV05fQ09MVU1OOiBcIkhcIixcbiAgICBDSEVDS0lOX0RST1BET1dOX0NPTFVNTjogXCJJXCIsXG59O1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIHRoZSBzZWFzb24gc2hlZXQuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBTZWFzb25TaGVldENvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFNIRUVUX0lEIC0gVGhlIElEIG9mIHRoZSBHb29nbGUgU2hlZXRzIHNwcmVhZHNoZWV0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFNFQVNPTl9TSEVFVCAtIFRoZSBuYW1lIG9mIHRoZSBzZWFzb24gc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0VBU09OX1NIRUVUX0RBWVNfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3Igc2Vhc29uIHNoZWV0IGRheXMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0VBU09OX1NIRUVUX05BTUVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3Igc2Vhc29uIHNoZWV0IG5hbWVzLlxuICovXG50eXBlIFNlYXNvblNoZWV0Q29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBzdHJpbmc7XG4gICAgU0VBU09OX1NIRUVUOiBzdHJpbmc7XG4gICAgU0VBU09OX1NIRUVUX0RBWVNfQ09MVU1OOiBzdHJpbmc7XG4gICAgU0VBU09OX1NIRUVUX05BTUVfQ09MVU1OOiBzdHJpbmc7XG59O1xuY29uc3Qgc2Vhc29uX3NoZWV0X2NvbmZpZzogU2Vhc29uU2hlZXRDb25maWcgPSB7XG4gICAgU0hFRVRfSUQ6IFwidGVzdFwiLFxuICAgIFNFQVNPTl9TSEVFVDogXCJTZWFzb25cIixcbiAgICBTRUFTT05fU0hFRVRfTkFNRV9DT0xVTU46IFwiQlwiLFxuICAgIFNFQVNPTl9TSEVFVF9EQVlTX0NPTFVNTjogXCJBXCIsXG59O1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIHNlY3Rpb25zLlxuICogQHR5cGVkZWYge09iamVjdH0gU2VjdGlvbkNvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFNFQ1RJT05fVkFMVUVTIC0gVGhlIHNlY3Rpb24gdmFsdWVzLlxuICovXG50eXBlIFNlY3Rpb25Db25maWcgPSB7XG4gICAgU0VDVElPTl9WQUxVRVM6IHN0cmluZztcbn07XG5jb25zdCBzZWN0aW9uX2NvbmZpZzogU2VjdGlvbkNvbmZpZyA9IHtcbiAgICBTRUNUSU9OX1ZBTFVFUzogIFwiMSwyLDMsNCxSb3ZpbmcsRkFSLFRyYWluaW5nXCIsXG59O1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIGNvbXAgcGFzc2VzLlxuICogQHR5cGVkZWYge09iamVjdH0gQ29tcFBhc3Nlc0NvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFNIRUVUX0lEIC0gVGhlIElEIG9mIHRoZSBHb29nbGUgU2hlZXRzIHNwcmVhZHNoZWV0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IENPTVBfUEFTU19TSEVFVCAtIFRoZSBuYW1lIG9mIHRoZSBjb21wIHBhc3Mgc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQ09NUF9QQVNTX1NIRUVUX0RBVEVTX0FWQUlMQUJMRV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBhdmFpbGFibGUgZGF0ZXMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQ09NUF9QQVNTX1NIRUVUX1VTRURfVE9EQVlfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgZGF0ZXMgdXNlZCB0b2RheS5cbiAgKiBAcHJvcGVydHkge3N0cmluZ30gQ09NUF9QQVNTX1NIRUVUX1VTRURfU0VBU09OX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIGRhdGVzIHVzZWQgZm9yIHRoaXMgc2Vhc29uLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IENPTVBfUEFTU19TSEVFVF9EQVRFU19TVEFSVElOR19DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBzdGFydGluZyBkYXRlcy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDT01QX1BBU1NfU0hFRVRfTkFNRV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBuYW1lcy5cbiAqL1xudHlwZSBDb21wUGFzc2VzQ29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBzdHJpbmc7XG4gICAgQ09NUF9QQVNTX1NIRUVUOiBzdHJpbmc7XG4gICAgQ09NUF9QQVNTX1NIRUVUX0RBVEVTX0FWQUlMQUJMRV9DT0xVTU46IHN0cmluZztcbiAgICBDT01QX1BBU1NfU0hFRVRfVVNFRF9UT0RBWV9DT0xVTU46IHN0cmluZztcbiAgICBDT01QX1BBU1NfU0hFRVRfVVNFRF9TRUFTT05fQ09MVU1OOiBzdHJpbmc7XG4gICAgQ09NUF9QQVNTX1NIRUVUX0RBVEVTX1NUQVJUSU5HX0NPTFVNTjogc3RyaW5nO1xuICAgIENPTVBfUEFTU19TSEVFVF9OQU1FX0NPTFVNTjogc3RyaW5nO1xufTtcbmNvbnN0IGNvbXBfcGFzc2VzX2NvbmZpZzogQ29tcFBhc3Nlc0NvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogXCJ0ZXN0XCIsXG4gICAgQ09NUF9QQVNTX1NIRUVUOiBcIkNvbXBzXCIsXG4gICAgQ09NUF9QQVNTX1NIRUVUX05BTUVfQ09MVU1OOiBcIkFcIixcbiAgICBDT01QX1BBU1NfU0hFRVRfREFURVNfQVZBSUxBQkxFX0NPTFVNTjogXCJEXCIsXG4gICAgQ09NUF9QQVNTX1NIRUVUX1VTRURfVE9EQVlfQ09MVU1OOiBcIkVcIixcbiAgICBDT01QX1BBU1NfU0hFRVRfVVNFRF9TRUFTT05fQ09MVU1OOiBcIkZcIixcbiAgICBDT01QX1BBU1NfU0hFRVRfREFURVNfU1RBUlRJTkdfQ09MVU1OOiBcIkdcIixcbn07XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgbWFuYWdlciBwYXNzZXMuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBNYW5hZ2VyUGFzc2VzQ29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0hFRVRfSUQgLSBUaGUgSUQgb2YgdGhlIEdvb2dsZSBTaGVldHMgc3ByZWFkc2hlZXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gTUFOQUdFUl9QQVNTX1NIRUVUIC0gVGhlIG5hbWUgb2YgdGhlIG1hbmFnZXIgcGFzcyBzaGVldC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBNQU5BR0VSX1BBU1NfU0hFRVRfQVZBSUxBQkxFX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIGF2YWlsYWJsZSBwYXNzZXMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gTUFOQUdFUl9QQVNTX1NIRUVUX1VTRURfVE9EQVlfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgcGFzc2VzIHVzZWQgdG9kYXkuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gTUFOQUdFUl9QQVNTX1NIRUVUX1VTRURfU0VBU09OX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIGRhdGVzIHVzZWQgZm9yIHRoaXMgc2Vhc29uLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IE1BTkFHRVJfUEFTU19TSEVFVF9EQVRFU19TVEFSVElOR19DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBzdGFydGluZyBkYXRlcy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBNQU5BR0VSX1BBU1NfU0hFRVRfTkFNRV9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBuYW1lcy5cbiAqL1xudHlwZSBNYW5hZ2VyUGFzc2VzQ29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBzdHJpbmc7XG4gICAgTUFOQUdFUl9QQVNTX1NIRUVUOiBzdHJpbmc7XG4gICAgTUFOQUdFUl9QQVNTX1NIRUVUX0FWQUlMQUJMRV9DT0xVTU46IHN0cmluZztcbiAgICBNQU5BR0VSX1BBU1NfU0hFRVRfVVNFRF9UT0RBWV9DT0xVTU46IHN0cmluZztcbiAgICBNQU5BR0VSX1BBU1NfU0hFRVRfVVNFRF9TRUFTT05fQ09MVU1OOiBzdHJpbmc7XG4gICAgTUFOQUdFUl9QQVNTX1NIRUVUX0RBVEVTX1NUQVJUSU5HX0NPTFVNTjogc3RyaW5nO1xuICAgIE1BTkFHRVJfUEFTU19TSEVFVF9OQU1FX0NPTFVNTjogc3RyaW5nO1xufTtcbmNvbnN0IG1hbmFnZXJfcGFzc2VzX2NvbmZpZzogTWFuYWdlclBhc3Nlc0NvbmZpZyA9IHtcbiAgICBTSEVFVF9JRDogXCJ0ZXN0XCIsXG4gICAgTUFOQUdFUl9QQVNTX1NIRUVUOiBcIk1hbmFnZXJzXCIsXG4gICAgTUFOQUdFUl9QQVNTX1NIRUVUX05BTUVfQ09MVU1OOiBcIkFcIixcbiAgICBNQU5BR0VSX1BBU1NfU0hFRVRfQVZBSUxBQkxFX0NPTFVNTjogXCJFXCIsXG4gICAgTUFOQUdFUl9QQVNTX1NIRUVUX1VTRURfVE9EQVlfQ09MVU1OOiBcIkNcIixcbiAgICBNQU5BR0VSX1BBU1NfU0hFRVRfVVNFRF9TRUFTT05fQ09MVU1OOiBcIkJcIixcbiAgICBNQU5BR0VSX1BBU1NfU0hFRVRfREFURVNfU1RBUlRJTkdfQ09MVU1OOiBcIkZcIixcbn07XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgdGhlIGhhbmRsZXIuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBIYW5kbGVyQ29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU0NSSVBUX0lEIC0gVGhlIElEIG9mIHRoZSBHb29nbGUgQXBwcyBTY3JpcHQgcHJvamVjdC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTSEVFVF9JRCAtIFRoZSBJRCBvZiB0aGUgR29vZ2xlIFNoZWV0cyBzcHJlYWRzaGVldC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTWU5DX1NJRCAtIFRoZSBTSUQgb2YgdGhlIFR3aWxpbyBTeW5jIHNlcnZpY2UuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gUkVTRVRfRlVOQ1RJT05fTkFNRSAtIFRoZSBuYW1lIG9mIHRoZSByZXNldCBmdW5jdGlvbi5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBBUkNISVZFX0ZVTkNUSU9OX05BTUUgLSBUaGUgbmFtZSBvZiB0aGUgYXJjaGl2ZSBmdW5jdGlvbi5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gVVNFX1NFUlZJQ0VfQUNDT1VOVCAtIFdoZXRoZXIgdG8gdXNlIGEgc2VydmljZSBhY2NvdW50LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IEFDVElPTl9MT0dfU0hFRVQgLSBUaGUgbmFtZSBvZiB0aGUgYWN0aW9uIGxvZyBzaGVldC5cbiAqIEBwcm9wZXJ0eSB7Q2hlY2tpblZhbHVlW119IENIRUNLSU5fVkFMVUVTIC0gVGhlIGNoZWNrLWluIHZhbHVlcy5cbiAqL1xudHlwZSBIYW5kbGVyQ29uZmlnID0ge1xuICAgIFNDUklQVF9JRDogc3RyaW5nO1xuICAgIFNIRUVUX0lEOiBzdHJpbmc7XG4gICAgU1lOQ19TSUQ6IHN0cmluZztcbiAgICBSRVNFVF9GVU5DVElPTl9OQU1FOiBzdHJpbmc7XG4gICAgQVJDSElWRV9GVU5DVElPTl9OQU1FOiBzdHJpbmc7XG4gICAgVVNFX1NFUlZJQ0VfQUNDT1VOVDogYm9vbGVhbjtcbiAgICBBQ1RJT05fTE9HX1NIRUVUOiBzdHJpbmc7XG4gICAgQ0hFQ0tJTl9WQUxVRVM6IENoZWNraW5WYWx1ZVtdO1xufTtcbmNvbnN0IGhhbmRsZXJfY29uZmlnOiBIYW5kbGVyQ29uZmlnID0ge1xuICAgIFNIRUVUX0lEOiBcInRlc3RcIixcbiAgICBTQ1JJUFRfSUQ6IFwidGVzdFwiLFxuICAgIFNZTkNfU0lEOiBcInRlc3RcIixcbiAgICBBUkNISVZFX0ZVTkNUSU9OX05BTUU6IFwiQXJjaGl2ZVwiLFxuICAgIFJFU0VUX0ZVTkNUSU9OX05BTUU6IFwiUmVzZXRcIixcbiAgICBVU0VfU0VSVklDRV9BQ0NPVU5UOiB0cnVlLFxuICAgIEFDVElPTl9MT0dfU0hFRVQ6IFwiQm90X1VzYWdlXCIsXG4gICAgQ0hFQ0tJTl9WQUxVRVM6IFtcbiAgICAgICAgbmV3IENoZWNraW5WYWx1ZShcImRheVwiLCBcIkFsbCBEYXlcIiwgXCJhbGwgZGF5L0RBWVwiLCBbXCJjaGVja2luLWRheVwiXSksXG4gICAgICAgIG5ldyBDaGVja2luVmFsdWUoXCJhbVwiLCBcIkhhbGYgQU1cIiwgXCJtb3JuaW5nL0FNXCIsIFtcImNoZWNraW4tYW1cIl0pLFxuICAgICAgICBuZXcgQ2hlY2tpblZhbHVlKFwicG1cIiwgXCJIYWxmIFBNXCIsIFwiYWZ0ZXJub29uL1BNXCIsIFtcImNoZWNraW4tcG1cIl0pLFxuICAgICAgICBuZXcgQ2hlY2tpblZhbHVlKFwib3V0XCIsIFwiQ2hlY2tlZCBPdXRcIiwgXCJjaGVjayBvdXQvT1VUXCIsIFtcImNoZWNrb3V0XCIsIFwiY2hlY2stb3V0XCJdKSxcbiAgICBdLFxufTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciBwYXRyb2xsZXIgcm93cy5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IFBhdHJvbGxlclJvd0NvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IE5BTUVfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgbmFtZXMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQ0FURUdPUllfQ09MVU1OIC0gVGhlIGNvbHVtbiBmb3IgY2F0ZWdvcmllcy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBTRUNUSU9OX0RST1BET1dOX0NPTFVNTiAtIFRoZSBjb2x1bW4gZm9yIHNlY3Rpb24gZHJvcGRvd24uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU4gLSBUaGUgY29sdW1uIGZvciBjaGVjay1pbiBkcm9wZG93bi5cbiAqL1xudHlwZSBQYXRyb2xsZXJSb3dDb25maWcgPSB7XG4gICAgTkFNRV9DT0xVTU46IHN0cmluZztcbiAgICBDQVRFR09SWV9DT0xVTU46IHN0cmluZztcbiAgICBTRUNUSU9OX0RST1BET1dOX0NPTFVNTjogc3RyaW5nO1xuICAgIENIRUNLSU5fRFJPUERPV05fQ09MVU1OOiBzdHJpbmc7XG59O1xuXG4vKipcbiAqIENvbWJpbmVkIGNvbmZpZ3VyYXRpb24gdHlwZS5cbiAqIEB0eXBlZGVmIHtIYW5kbGVyRW52aXJvbm1lbnQgJiBVc2VyQ3JlZHNDb25maWcgJiBGaW5kUGF0cm9sbGVyQ29uZmlnICYgTG9naW5TaGVldENvbmZpZyAmIFNlYXNvblNoZWV0Q29uZmlnICYgU2VjdGlvbkNvbmZpZyAmIENvbXBQYXNzZXNDb25maWcgJiBNYW5hZ2VyUGFzc2VzQ29uZmlnICYgSGFuZGxlckNvbmZpZyAmIFBhdHJvbGxlclJvd0NvbmZpZ30gQ29tYmluZWRDb25maWdcbiAqL1xudHlwZSBDb21iaW5lZENvbmZpZyA9IEhhbmRsZXJFbnZpcm9ubWVudCAmXG4gICAgVXNlckNyZWRzQ29uZmlnICZcbiAgICBGaW5kUGF0cm9sbGVyQ29uZmlnICZcbiAgICBMb2dpblNoZWV0Q29uZmlnICZcbiAgICBTZWFzb25TaGVldENvbmZpZyAmXG4gICAgU2VjdGlvbkNvbmZpZyAmXG4gICAgQ29tcFBhc3Nlc0NvbmZpZyAmXG4gICAgTWFuYWdlclBhc3Nlc0NvbmZpZyAmXG4gICAgSGFuZGxlckNvbmZpZyAmXG4gICAgUGF0cm9sbGVyUm93Q29uZmlnO1xuXG5jb25zdCBDT05GSUc6IENvbWJpbmVkQ29uZmlnID0ge1xuICAgIC4uLmhhbmRsZXJfY29uZmlnLFxuICAgIC4uLmZpbmRfcGF0cm9sbGVyX2NvbmZpZyxcbiAgICAuLi5sb2dpbl9zaGVldF9jb25maWcsXG4gICAgLi4uY29tcF9wYXNzZXNfY29uZmlnLFxuICAgIC4uLm1hbmFnZXJfcGFzc2VzX2NvbmZpZyxcbiAgICAuLi5zZWFzb25fc2hlZXRfY29uZmlnLFxuICAgIC4uLnVzZXJfY3JlZHNfY29uZmlnLFxuICAgIC4uLnNlY3Rpb25fY29uZmlnLFxufTtcblxuZXhwb3J0IHtcbiAgICBDT05GSUcsXG4gICAgQ29tYmluZWRDb25maWcsXG4gICAgU2VjdGlvbkNvbmZpZyxcbiAgICBDb21wUGFzc2VzQ29uZmlnLFxuICAgIEZpbmRQYXRyb2xsZXJDb25maWcsXG4gICAgSGFuZGxlckNvbmZpZyxcbiAgICBIYW5kbGVyRW52aXJvbm1lbnQsXG4gICAgTWFuYWdlclBhc3Nlc0NvbmZpZyxcbiAgICBVc2VyQ3JlZHNDb25maWcsXG4gICAgTG9naW5TaGVldENvbmZpZyxcbiAgICBTZWFzb25TaGVldENvbmZpZyxcbiAgICBQYXRyb2xsZXJSb3dDb25maWcsXG59OyIsImltcG9ydCBcIkB0d2lsaW8tbGFicy9zZXJ2ZXJsZXNzLXJ1bnRpbWUtdHlwZXNcIjtcbmltcG9ydCB7XG4gICAgQ29udGV4dCxcbiAgICBTZXJ2ZXJsZXNzRXZlbnRPYmplY3QsXG4gICAgU2VydmljZUNvbnRleHQsXG4gICAgVHdpbGlvQ2xpZW50LFxufSBmcm9tIFwiQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlcy90eXBlc1wiO1xuaW1wb3J0IHsgZ29vZ2xlLCBzY3JpcHRfdjEsIHNoZWV0c192NCB9IGZyb20gXCJnb29nbGVhcGlzXCI7XG5pbXBvcnQgeyBHb29nbGVBdXRoIH0gZnJvbSBcImdvb2dsZWFwaXMtY29tbW9uXCI7XG5pbXBvcnQge1xuICAgIENPTkZJRyxcbiAgICBDb21iaW5lZENvbmZpZyxcbiAgICBDb21wUGFzc2VzQ29uZmlnLFxuICAgIEZpbmRQYXRyb2xsZXJDb25maWcsXG4gICAgSGFuZGxlckNvbmZpZyxcbiAgICBIYW5kbGVyRW52aXJvbm1lbnQsXG4gICAgTG9naW5TaGVldENvbmZpZyxcbiAgICBNYW5hZ2VyUGFzc2VzQ29uZmlnLFxuICAgIFNlYXNvblNoZWV0Q29uZmlnLFxufSBmcm9tIFwiLi4vZW52L2hhbmRsZXJfY29uZmlnXCI7XG5pbXBvcnQgTG9naW5TaGVldCwgeyBQYXRyb2xsZXJSb3cgfSBmcm9tIFwiLi4vc2hlZXRzL2xvZ2luX3NoZWV0XCI7XG5pbXBvcnQgU2Vhc29uU2hlZXQgZnJvbSBcIi4uL3NoZWV0cy9zZWFzb25fc2hlZXRcIjtcbmltcG9ydCB7IFVzZXJDcmVkcyB9IGZyb20gXCIuLi91c2VyLWNyZWRzXCI7XG5pbXBvcnQgeyBDaGVja2luVmFsdWVzIH0gZnJvbSBcIi4uL3V0aWxzL2NoZWNraW5fdmFsdWVzXCI7XG5pbXBvcnQgeyBnZXRfc2VydmljZV9jcmVkZW50aWFsc19wYXRoIH0gZnJvbSBcIi4uL3V0aWxzL2ZpbGVfdXRpbHNcIjtcbmltcG9ydCB7IGV4Y2VsX3Jvd190b19pbmRleCwgc2FuaXRpemVfcGhvbmVfbnVtYmVyIH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxcIjtcbmltcG9ydCB7XG4gICAgYnVpbGRfcGFzc2VzX3N0cmluZyxcbiAgICBDb21wUGFzc1R5cGUsXG4gICAgZ2V0X2NvbXBfcGFzc19kZXNjcmlwdGlvbixcbn0gZnJvbSBcIi4uL3V0aWxzL2NvbXBfcGFzc2VzXCI7XG5pbXBvcnQge1xuICAgIENvbXBQYXNzU2hlZXQsXG4gICAgTWFuYWdlclBhc3NTaGVldCxcbiAgICBQYXNzU2hlZXQsXG59IGZyb20gXCIuLi9zaGVldHMvY29tcF9wYXNzX3NoZWV0XCI7XG5pbXBvcnQgeyBTZWN0aW9uVmFsdWVzIH0gZnJvbSAnLi4vdXRpbHMvc2VjdGlvbl92YWx1ZXMnO1xuXG5leHBvcnQgdHlwZSBCVk5TUFJlc3BvbnNlID0ge1xuICAgIHJlc3BvbnNlPzogc3RyaW5nO1xuICAgIG5leHRfc3RlcD86IHN0cmluZztcbn07XG5leHBvcnQgdHlwZSBCVk5TUEV2ZW50ID0gU2VydmVybGVzc0V2ZW50T2JqZWN0PFxuICAgIHtcbiAgICAgICAgRnJvbTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgICBUbzogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgICBudW1iZXI6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAgICAgdGVzdF9udW1iZXI6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAgICAgQm9keTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIH0sXG4gICAge30sXG4gICAge1xuICAgICAgICBidm5zcF9uZXh0X3N0ZXA6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICB9XG4+O1xuXG5leHBvcnQgY29uc3QgTkVYVF9TVEVQUyA9IHtcbiAgICBBV0FJVF9DT01NQU5EOiBcImF3YWl0LWNvbW1hbmRcIixcbiAgICBBV0FJVF9DSEVDS0lOOiBcImF3YWl0LWNoZWNraW5cIixcbiAgICBDT05GSVJNX1JFU0VUOiBcImNvbmZpcm0tcmVzZXRcIixcbiAgICBBVVRIX1JFU0VUOiBcImF1dGgtcmVzZXRcIixcbiAgICBBV0FJVF9TRUNUSU9OOiBcImF3YWl0LXNlY3Rpb25cIixcbiAgICBBV0FJVF9QQVNTOiBcImF3YWl0LXBhc3NcIixcbiAgICBBV0FJVF9NRVNTQUdFOiBcImF3YWl0LW1lc3NhZ2VcIixcbiAgICBBV0FJVF9CUk9BRENBU1Q6IFwiYXdhaXQtYnJvYWRjYXN0XCIsXG59O1xuXG5jb25zdCBDT01NQU5EUyA9IHtcbiAgICBPTl9EVVRZOiBbXCJvbmR1dHlcIiwgXCJvbi1kdXR5XCJdLFxuICAgIFNUQVRVUzogW1wic3RhdHVzXCJdLFxuICAgIENIRUNLSU46IFtcImNoZWNraW5cIiwgXCJjaGVjay1pblwiXSxcbiAgICBTRUNUSU9OX0FTU0lHTk1FTlQ6IFtcInNlY3Rpb25cIiwgXCJzZWN0aW9uLWFzc2lnbm1lbnRcIiwgXCJzZWN0aW9uYXNzaWdubWVudFwiLCBcImFzc2lnbm1lbnRcIl0sXG4gICAgQ09NUF9QQVNTOiBbXCJjb21wLXBhc3NcIiwgXCJjb21wcGFzc1wiLCBcImNvbXBcIl0sXG4gICAgTUFOQUdFUl9QQVNTOiBbXCJtYW5hZ2VyLXBhc3NcIiwgXCJtYW5hZ2VycGFzc1wiLCBcIm1hbmFnZXJcIl0sXG4gICAgV0hBVFNBUFA6IFtcIndoYXRzYXBwXCJdLFxuICAgIE1FU1NBR0U6IFtcIm1lc3NhZ2VcIiwgXCJtc2dcIl0sXG4gICAgQlJPQURDQVNUOiBbXCJicm9hZGNhc3RcIl0sXG59O1xuXG5leHBvcnQgY29uc3QgU01TX01BWF9MRU5HVEggPSAxNjA7XG5leHBvcnQgY29uc3QgTUVTU0FHRV9QUkVGSVhfVEVNUExBVEUgPSBcIk1lc3NhZ2UgZnJvbSBcIjtcbmV4cG9ydCBjb25zdCBNRVNTQUdFX1BSRUZJWF9TVUZGSVggPSBcIjogXCI7XG5cbi8qKlxuICogUmVzdWx0IG9mIHZhbGlkYXRpbmcgYW4gU01TIG1lc3NhZ2UgZm9yIEdTTS03IGNvbXBhdGliaWxpdHkgYW5kIHNlZ21lbnQgY291bnQuXG4gKi9cbmV4cG9ydCB0eXBlIFNtc1ZhbGlkYXRpb25SZXN1bHQgPSB7XG4gICAgLyoqIFdoZXRoZXIgdGhlIG1lc3NhZ2UgaXMgdmFsaWQgKEdTTS03IG9ubHkgYW5kIGZpdHMgaW4gYSBzaW5nbGUgc2VnbWVudCkuICovXG4gICAgdmFsaWQ6IGJvb2xlYW47XG4gICAgLyoqIElmIGludmFsaWQsIHRoZSByZWFzb246ICdub25fZ3NtNycgb3IgJ3Rvb19tYW55X3NlZ21lbnRzJy4gKi9cbiAgICByZWFzb24/OiBcIm5vbl9nc203XCIgfCBcInRvb19tYW55X3NlZ21lbnRzXCI7XG4gICAgLyoqIFRoZSBub24tR1NNLTcgY2hhcmFjdGVycyBmb3VuZCwgaWYgYW55LiAqL1xuICAgIG5vbl9nc21fY2hhcmFjdGVycz86IHN0cmluZ1tdO1xuICAgIC8qKiBUaGUgbnVtYmVyIG9mIFNNUyBzZWdtZW50cyB0aGUgbWVzc2FnZSB3b3VsZCByZXF1aXJlLiAqL1xuICAgIHNlZ21lbnRzX2NvdW50PzogbnVtYmVyO1xufTtcblxuLyoqXG4gKiBWYWxpZGF0ZXMgdGhhdCBhIGNvbXBsZXRlIFNNUyBtZXNzYWdlIChwcmVmaXggKyBib2R5KSB1c2VzIG9ubHkgR1NNLTcgY2hhcmFjdGVyc1xuICogYW5kIGZpdHMgd2l0aGluIGEgc2luZ2xlIFNNUyBzZWdtZW50LlxuICpcbiAqIFVzZXMgdGhlIHNtcy1zZWdtZW50cy1jYWxjdWxhdG9yIGxpYnJhcnkgKG1haW50YWluZWQgYnkgVHdpbGlvRGV2RWQpIHdoaWNoXG4gKiBwcm92aWRlcyBhdXRob3JpdGF0aXZlIEdTTS03IGNoYXJhY3RlciBkZXRlY3Rpb24uXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZ1bGxfbWVzc2FnZSAtIFRoZSBjb21wbGV0ZSBtZXNzYWdlIHRvIHZhbGlkYXRlIChwcmVmaXggKyB1c2VyIHRleHQpLlxuICogQHJldHVybnMge1Ntc1ZhbGlkYXRpb25SZXN1bHR9IFRoZSB2YWxpZGF0aW9uIHJlc3VsdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlX3Ntc19tZXNzYWdlKGZ1bGxfbWVzc2FnZTogc3RyaW5nKTogU21zVmFsaWRhdGlvblJlc3VsdCB7XG4gICAgY29uc3QgeyBTZWdtZW50ZWRNZXNzYWdlIH0gPSByZXF1aXJlKFwic21zLXNlZ21lbnRzLWNhbGN1bGF0b3JcIik7XG4gICAgY29uc3Qgc2VnbWVudGVkID0gbmV3IFNlZ21lbnRlZE1lc3NhZ2UoZnVsbF9tZXNzYWdlKTtcbiAgICBjb25zdCBub25fZ3NtID0gc2VnbWVudGVkLmdldE5vbkdzbUNoYXJhY3RlcnMoKSBhcyBzdHJpbmdbXTtcblxuICAgIGlmIChub25fZ3NtLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgICAgICAgIHJlYXNvbjogXCJub25fZ3NtN1wiLFxuICAgICAgICAgICAgbm9uX2dzbV9jaGFyYWN0ZXJzOiBbLi4ubmV3IFNldChub25fZ3NtKV0sXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKHNlZ21lbnRlZC5zZWdtZW50c0NvdW50ID4gMSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsaWQ6IGZhbHNlLFxuICAgICAgICAgICAgcmVhc29uOiBcInRvb19tYW55X3NlZ21lbnRzXCIsXG4gICAgICAgICAgICBzZWdtZW50c19jb3VudDogc2VnbWVudGVkLnNlZ21lbnRzQ291bnQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgdmFsaWQ6IHRydWUgfTtcbn1cblxuLyoqXG4gKiBGb3JtYXRzIGEgMTAtZGlnaXQgcGhvbmUgbnVtYmVyIHN0cmluZyBhcyAoWFhYKVhYWC1YWFhYIGZvciBkaXNwbGF5LlxuICogQHBhcmFtIHtzdHJpbmd9IHRlbl9kaWdpdHMgLSBBIDEwLWRpZ2l0IHBob25lIG51bWJlciBzdHJpbmcgKGUuZy4gXCIxMjM0NTY3ODkwXCIpLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCBwaG9uZSBudW1iZXIgKGUuZy4gXCIoMTIzKTQ1Ni03ODkwXCIpLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0X3Bob25lX2Zvcl9kaXNwbGF5KHRlbl9kaWdpdHM6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAoJHt0ZW5fZGlnaXRzLnN1YnN0cmluZygwLCAzKX0pJHt0ZW5fZGlnaXRzLnN1YnN0cmluZygzLCA2KX0tJHt0ZW5fZGlnaXRzLnN1YnN0cmluZyg2LCAxMCl9YDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQlZOU1BIYW5kbGVyIHtcbiAgICBTQ09QRVM6IHN0cmluZ1tdID0gW1wiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9zcHJlYWRzaGVldHNcIl07XG5cbiAgICBzbXNfcmVxdWVzdDogYm9vbGVhbjtcbiAgICByZXN1bHRfbWVzc2FnZXM6IHN0cmluZ1tdID0gW107XG4gICAgZnJvbTogc3RyaW5nO1xuICAgIHRvOiBzdHJpbmc7XG4gICAgYm9keTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIGJvZHlfcmF3OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgcGF0cm9sbGVyOiBQYXRyb2xsZXJSb3cgfCBudWxsO1xuICAgIGJ2bnNwX25leHRfc3RlcDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIGNoZWNraW5fbW9kZTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gICAgZmFzdF9jaGVja2luOiBib29sZWFuID0gZmFsc2U7XG4gICAgYXNzaWduZWRfc2VjdGlvbjogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgICB0d2lsaW9fY2xpZW50OiBUd2lsaW9DbGllbnQgfCBudWxsID0gbnVsbDtcbiAgICBzeW5jX3NpZDogc3RyaW5nO1xuICAgIHJlc2V0X3NjcmlwdF9pZDogc3RyaW5nO1xuXG4gICAgLy8gQ2FjaGUgY2xpZW50c1xuICAgIHN5bmNfY2xpZW50OiBTZXJ2aWNlQ29udGV4dCB8IG51bGwgPSBudWxsO1xuICAgIHVzZXJfY3JlZHM6IFVzZXJDcmVkcyB8IG51bGwgPSBudWxsO1xuICAgIHNlcnZpY2VfY3JlZHM6IEdvb2dsZUF1dGggfCBudWxsID0gbnVsbDtcbiAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyB8IG51bGwgPSBudWxsO1xuICAgIHVzZXJfc2NyaXB0c19zZXJ2aWNlOiBzY3JpcHRfdjEuU2NyaXB0IHwgbnVsbCA9IG51bGw7XG5cbiAgICBsb2dpbl9zaGVldDogTG9naW5TaGVldCB8IG51bGwgPSBudWxsO1xuICAgIHNlYXNvbl9zaGVldDogU2Vhc29uU2hlZXQgfCBudWxsID0gbnVsbDtcbiAgICBjb21wX3Bhc3Nfc2hlZXQ6IENvbXBQYXNzU2hlZXQgfCBudWxsID0gbnVsbDtcbiAgICBtYW5hZ2VyX3Bhc3Nfc2hlZXQ6IE1hbmFnZXJQYXNzU2hlZXQgfCBudWxsID0gbnVsbDtcblxuICAgIGNoZWNraW5fdmFsdWVzOiBDaGVja2luVmFsdWVzO1xuICAgIGN1cnJlbnRfc2hlZXRfZGF0ZTogRGF0ZTtcblxuICAgIGNvbWJpbmVkX2NvbmZpZzogQ29tYmluZWRDb25maWc7XG4gICAgY29uZmlnOiBIYW5kbGVyQ29uZmlnO1xuXG4gICAgc2VjdGlvbl92YWx1ZXM6IFNlY3Rpb25WYWx1ZXM7XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGEgbmV3IEJWTlNQSGFuZGxlci5cbiAgICAgKiBAcGFyYW0ge0NvbnRleHQ8SGFuZGxlckVudmlyb25tZW50Pn0gY29udGV4dCAtIFRoZSBzZXJ2ZXJsZXNzIGZ1bmN0aW9uIGNvbnRleHQuXG4gICAgICogQHBhcmFtIHtTZXJ2ZXJsZXNzRXZlbnRPYmplY3Q8QlZOU1BFdmVudD59IGV2ZW50IC0gVGhlIGV2ZW50IG9iamVjdC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgY29udGV4dDogQ29udGV4dDxIYW5kbGVyRW52aXJvbm1lbnQ+LFxuICAgICAgICBldmVudDogU2VydmVybGVzc0V2ZW50T2JqZWN0PEJWTlNQRXZlbnQ+XG4gICAgKSB7XG4gICAgICAgIC8vIERldGVybWluZSBtZXNzYWdlIGRldGFpbHMgZnJvbSB0aGUgaW5jb21pbmcgZXZlbnQsIHdpdGggZmFsbGJhY2sgdmFsdWVzXG4gICAgICAgIHRoaXMuc21zX3JlcXVlc3QgPSAoZXZlbnQuRnJvbSB8fCBldmVudC5udW1iZXIpICE9PSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZnJvbSA9IGV2ZW50LkZyb20gfHwgZXZlbnQubnVtYmVyIHx8IGV2ZW50LnRlc3RfbnVtYmVyITtcbiAgICAgICAgdGhpcy50byA9IHNhbml0aXplX3Bob25lX251bWJlcihldmVudC5UbyEpO1xuICAgICAgICB0aGlzLmJvZHkgPSBldmVudC5Cb2R5Py50b0xvd2VyQ2FzZSgpPy50cmltKCkucmVwbGFjZSgvXFxzKy8sIFwiLVwiKTtcbiAgICAgICAgdGhpcy5ib2R5X3JhdyA9IGV2ZW50LkJvZHlcbiAgICAgICAgdGhpcy5idm5zcF9uZXh0X3N0ZXAgPVxuICAgICAgICAgICAgZXZlbnQucmVxdWVzdC5jb29raWVzLmJ2bnNwX25leHRfc3RlcDtcbiAgICAgICAgdGhpcy5jb21iaW5lZF9jb25maWcgPSB7IC4uLkNPTkZJRywgLi4uY29udGV4dCB9O1xuICAgICAgICB0aGlzLmNvbmZpZyA9IHRoaXMuY29tYmluZWRfY29uZmlnO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLnR3aWxpb19jbGllbnQgPSBjb250ZXh0LmdldFR3aWxpb0NsaWVudCgpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGluaXRpYWxpemluZyB0d2lsaW9fY2xpZW50XCIsIGUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3luY19zaWQgPSBjb250ZXh0LlNZTkNfU0lEO1xuICAgICAgICB0aGlzLnJlc2V0X3NjcmlwdF9pZCA9IGNvbnRleHQuU0NSSVBUX0lEO1xuICAgICAgICB0aGlzLnBhdHJvbGxlciA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5jaGVja2luX3ZhbHVlcyA9IG5ldyBDaGVja2luVmFsdWVzKENPTkZJRy5DSEVDS0lOX1ZBTFVFUyk7XG4gICAgICAgIHRoaXMuY3VycmVudF9zaGVldF9kYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgdGhpcy5zZWN0aW9uX3ZhbHVlcyA9IG5ldyBTZWN0aW9uVmFsdWVzKHRoaXMuY29tYmluZWRfY29uZmlnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZXMgdGhlIGZhc3QgY2hlY2staW4gbW9kZSBmcm9tIHRoZSBtZXNzYWdlIGJvZHkuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHkgLSBUaGUgbWVzc2FnZSBib2R5LlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIGZhc3QgY2hlY2staW4gbW9kZSBpcyBwYXJzZWQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKi9cbiAgICBwYXJzZV9mYXN0X2NoZWNraW5fbW9kZShib2R5OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgcGFyc2VkID0gdGhpcy5jaGVja2luX3ZhbHVlcy5wYXJzZV9mYXN0X2NoZWNraW4oYm9keSk7XG4gICAgICAgIGlmIChwYXJzZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5jaGVja2luX21vZGUgPSBwYXJzZWQua2V5O1xuICAgICAgICAgICAgdGhpcy5mYXN0X2NoZWNraW4gPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlcyB0aGUgY2hlY2staW4gbW9kZSBmcm9tIHRoZSBtZXNzYWdlIGJvZHkuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHkgLSBUaGUgbWVzc2FnZSBib2R5LlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIGNoZWNrLWluIG1vZGUgaXMgcGFyc2VkLCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICovXG4gICAgcGFyc2VfY2hlY2tpbihib2R5OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgcGFyc2VkID0gdGhpcy5jaGVja2luX3ZhbHVlcy5wYXJzZV9jaGVja2luKGJvZHkpO1xuICAgICAgICBpZiAocGFyc2VkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tpbl9tb2RlID0gcGFyc2VkLmtleTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZXMgdGhlIGNoZWNrLWluIG1vZGUgZnJvbSB0aGUgbmV4dCBzdGVwLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIGNoZWNrLWluIG1vZGUgaXMgcGFyc2VkLCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICovXG4gICAgcGFyc2VfY2hlY2tpbl9mcm9tX25leHRfc3RlcCgpIHtcbiAgICAgICAgY29uc3QgbGFzdF9zZWdtZW50ID0gdGhpcy5idm5zcF9uZXh0X3N0ZXBcbiAgICAgICAgICAgID8uc3BsaXQoXCItXCIpXG4gICAgICAgICAgICAuc2xpY2UoLTEpWzBdO1xuICAgICAgICBpZiAobGFzdF9zZWdtZW50ICYmIGxhc3Rfc2VnbWVudCBpbiB0aGlzLmNoZWNraW5fdmFsdWVzLmJ5X2tleSkge1xuICAgICAgICAgICAgdGhpcy5jaGVja2luX21vZGUgPSBsYXN0X3NlZ21lbnQ7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIHRoZSBwYXNzIHR5cGUgZnJvbSB0aGUgbmV4dCBzdGVwLlxuICAgICAqIEByZXR1cm5zIHtDb21wUGFzc1R5cGV9IFRoZSBwYXJzZWQgcGFzcyB0eXBlLlxuICAgICAqL1xuICAgIHBhcnNlX3Bhc3NfZnJvbV9uZXh0X3N0ZXAoKSB7XG4gICAgICAgIGNvbnN0IGxhc3Rfc2VnbWVudCA9IHRoaXMuYnZuc3BfbmV4dF9zdGVwXG4gICAgICAgICAgICA/LnNwbGl0KFwiLVwiKVxuICAgICAgICAgICAgLnNsaWNlKC0yKVxuICAgICAgICAgICAgLmpvaW4oXCItXCIpO1xuICAgICAgICByZXR1cm4gbGFzdF9zZWdtZW50IGFzIENvbXBQYXNzVHlwZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWxheXMgdGhlIGV4ZWN1dGlvbiBmb3IgYSBzcGVjaWZpZWQgbnVtYmVyIG9mIHNlY29uZHMuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlY29uZHMgLSBUaGUgbnVtYmVyIG9mIHNlY29uZHMgdG8gZGVsYXkuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9uYWw9ZmFsc2VdIC0gV2hldGhlciB0aGUgZGVsYXkgaXMgb3B0aW9uYWwuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIGFmdGVyIHRoZSBkZWxheS5cbiAgICAgKi9cbiAgICBkZWxheShzZWNvbmRzOiBudW1iZXIsIG9wdGlvbmFsOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKG9wdGlvbmFsICYmICF0aGlzLnNtc19yZXF1ZXN0KSB7XG4gICAgICAgICAgICBzZWNvbmRzID0gMSAvIDEwMDAuMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcykgPT4ge1xuICAgICAgICAgICAgc2V0VGltZW91dChyZXMsIHNlY29uZHMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kcyBhIG1lc3NhZ2UgdG8gdGhlIHVzZXIuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSBUaGUgbWVzc2FnZSB0byBzZW5kLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBtZXNzYWdlIGlzIHNlbnQuXG4gICAgICovXG4gICAgYXN5bmMgc2VuZF9tZXNzYWdlKG1lc3NhZ2U6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5zbXNfcmVxdWVzdCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXRfdHdpbGlvX2NsaWVudCgpLm1lc3NhZ2VzLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgdG86IHRoaXMuZnJvbSxcbiAgICAgICAgICAgICAgICBmcm9tOiB0aGlzLnRvLFxuICAgICAgICAgICAgICAgIGJvZHk6IG1lc3NhZ2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVzdWx0X21lc3NhZ2VzLnB1c2gobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIHRoZSBjaGVjay1pbiBwcm9jZXNzLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBjaGVjay1pbiByZXNwb25zZS5cbiAgICAgKi9cbiAgICBhc3luYyBoYW5kbGUoKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2hhbmRsZSgpO1xuICAgICAgICBpZiAoIXRoaXMuc21zX3JlcXVlc3QpIHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQ/LnJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHRfbWVzc2FnZXMucHVzaChyZXN1bHQucmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogdGhpcy5yZXN1bHRfbWVzc2FnZXMuam9pbihcIlxcbiMjI1xcblwiKSxcbiAgICAgICAgICAgICAgICBuZXh0X3N0ZXA6IHJlc3VsdD8ubmV4dF9zdGVwLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEludGVybmFsIG1ldGhvZCB0byBoYW5kbGUgdGhlIGNoZWNrLWluIHByb2Nlc3MuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGNoZWNrLWluIHJlc3BvbnNlLlxuICAgICAqL1xuICAgIGFzeW5jIF9oYW5kbGUoKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgYFJlY2VpdmVkIHJlcXVlc3QgZnJvbSAke3RoaXMuZnJvbX0gd2l0aCBib2R5OiAke3RoaXMuYm9keX0gYW5kIHN0YXRlICR7dGhpcy5idm5zcF9uZXh0X3N0ZXB9YFxuICAgICAgICApO1xuICAgICAgICBpZiAodGhpcy5ib2R5ID09IFwibG9nb3V0XCIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIGxvZ291dGApO1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMubG9nb3V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlc3BvbnNlOiBCVk5TUFJlc3BvbnNlIHwgdW5kZWZpbmVkO1xuICAgICAgICBpZiAoIXRoaXMuY29uZmlnLlVTRV9TRVJWSUNFX0FDQ09VTlQpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlID0gYXdhaXQgdGhpcy5jaGVja191c2VyX2NyZWRzKCk7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UpIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5ib2R5Py50b0xvd2VyQ2FzZSgpID09PSBcInJlc3RhcnRcIikge1xuICAgICAgICAgICAgcmV0dXJuIHsgcmVzcG9uc2U6IFwiT2theS4gVGV4dCBtZSBhZ2FpbiB0byBzdGFydCBvdmVyLi4uXCIgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3BvbnNlID0gYXdhaXQgdGhpcy5nZXRfbWFwcGVkX3BhdHJvbGxlcigpO1xuICAgICAgICBpZiAocmVzcG9uc2UgfHwgdGhpcy5wYXRyb2xsZXIgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICByZXNwb25zZSB8fCB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBcIlVuZXhwZWN0ZWQgZXJyb3IgbG9va2luZyB1cCBwYXRyb2xsZXIgbWFwcGluZ1wiLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICAoIXRoaXMuYnZuc3BfbmV4dF9zdGVwIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5idm5zcF9uZXh0X3N0ZXAgPT0gTkVYVF9TVEVQUy5BV0FJVF9DT01NQU5EKSAmJlxuICAgICAgICAgICAgdGhpcy5ib2R5XG4gICAgICAgICkge1xuICAgICAgICAgICAgY29uc3QgYXdhaXRfcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmhhbmRsZV9hd2FpdF9jb21tYW5kKCk7XG4gICAgICAgICAgICBpZiAoYXdhaXRfcmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXRfcmVzcG9uc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICB0aGlzLmJ2bnNwX25leHRfc3RlcCA9PSBORVhUX1NURVBTLkFXQUlUX0NIRUNLSU4gJiZcbiAgICAgICAgICAgIHRoaXMuYm9keVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcnNlX2NoZWNraW4odGhpcy5ib2R5KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmNoZWNraW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHRoaXMuYnZuc3BfbmV4dF9zdGVwPy5zdGFydHNXaXRoKFxuICAgICAgICAgICAgICAgIE5FWFRfU1RFUFMuQ09ORklSTV9SRVNFVFxuICAgICAgICAgICAgKSAmJlxuICAgICAgICAgICAgdGhpcy5ib2R5XG4gICAgICAgICkge1xuICAgICAgICAgICAgaWYgKHRoaXMuYm9keSA9PSBcInllc1wiICYmIHRoaXMucGFyc2VfY2hlY2tpbl9mcm9tX25leHRfc3RlcCgpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgICAgIGBQZXJmb3JtaW5nIHJlc2V0X3NoZWV0X2Zsb3cgZm9yICR7dGhpcy5wYXRyb2xsZXIubmFtZX0gd2l0aCBjaGVja2luIG1vZGU6ICR7dGhpcy5jaGVja2luX21vZGV9YFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgKGF3YWl0IHRoaXMucmVzZXRfc2hlZXRfZmxvdygpKSB8fCAoYXdhaXQgdGhpcy5jaGVja2luKCkpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHRoaXMuYnZuc3BfbmV4dF9zdGVwPy5zdGFydHNXaXRoKE5FWFRfU1RFUFMuQVVUSF9SRVNFVClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wYXJzZV9jaGVja2luX2Zyb21fbmV4dF9zdGVwKCkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICAgICAgYFBlcmZvcm1pbmcgcmVzZXRfc2hlZXRfZmxvdy1wb3N0LWF1dGggZm9yICR7dGhpcy5wYXRyb2xsZXIubmFtZX0gd2l0aCBjaGVja2luIG1vZGU6ICR7dGhpcy5jaGVja2luX21vZGV9YFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgKGF3YWl0IHRoaXMucmVzZXRfc2hlZXRfZmxvdygpKSB8fCAoYXdhaXQgdGhpcy5jaGVja2luKCkpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHRoaXMuYnZuc3BfbmV4dF9zdGVwPy5zdGFydHNXaXRoKE5FWFRfU1RFUFMuQVdBSVRfUEFTUykgJiZcbiAgICAgICAgICAgIHRoaXMuYm9keV9yYXdcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zdCB0eXBlID0gdGhpcy5wYXJzZV9wYXNzX2Zyb21fbmV4dF9zdGVwKCk7XG4gICAgICAgICAgICBjb25zdCBndWVzdF9uYW1lID0gdGhpcy5ib2R5X3JhdztcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBndWVzdF9uYW1lLnRyaW0oKSAhPT0gXCJcIiAmJlxuICAgICAgICAgICAgICAgIFtDb21wUGFzc1R5cGUuQ29tcFBhc3MsIENvbXBQYXNzVHlwZS5NYW5hZ2VyUGFzc10uaW5jbHVkZXModHlwZSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnByb21wdF9jb21wX21hbmFnZXJfcGFzcyh0eXBlLCBndWVzdF9uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHRoaXMuYnZuc3BfbmV4dF9zdGVwPy5zdGFydHNXaXRoKE5FWFRfU1RFUFMuQVdBSVRfU0VDVElPTikgJiZcbiAgICAgICAgICAgIHRoaXMuYm9keVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnN0IHNlY3Rpb24gPSB0aGlzLnNlY3Rpb25fdmFsdWVzLnBhcnNlX3NlY3Rpb24odGhpcy5ib2R5KVxuICAgICAgICAgICAgaWYgKHNlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5hc3NpZ25fc2VjdGlvbihzZWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnByb21wdF9zZWN0aW9uX2Fzc2lnbm1lbnQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHRoaXMuYnZuc3BfbmV4dF9zdGVwID09PSBORVhUX1NURVBTLkFXQUlUX01FU1NBR0UgJiZcbiAgICAgICAgICAgIHRoaXMuYm9keV9yYXdcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5zZW5kX3RleHRfbWVzc2FnZSh0aGlzLmJvZHlfcmF3KTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHRoaXMuYnZuc3BfbmV4dF9zdGVwID09PSBORVhUX1NURVBTLkFXQUlUX0JST0FEQ0FTVCAmJlxuICAgICAgICAgICAgdGhpcy5ib2R5X3Jhd1xuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnNlbmRfYnJvYWRjYXN0X21lc3NhZ2UodGhpcy5ib2R5X3Jhdyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5idm5zcF9uZXh0X3N0ZXApIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuc2VuZF9tZXNzYWdlKFwiU29ycnksIEkgZGlkbid0IHVuZGVyc3RhbmQgdGhhdC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucHJvbXB0X2NvbW1hbmQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIHRoZSBhd2FpdCBjb21tYW5kIHN0ZXAuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZSB8IHVuZGVmaW5lZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHJlc3BvbnNlIG9yIHVuZGVmaW5lZC5cbiAgICAgKi9cbiAgICBhc3luYyBoYW5kbGVfYXdhaXRfY29tbWFuZCgpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2UgfCB1bmRlZmluZWQ+IHtcbiAgICAgICAgY29uc3QgcGF0cm9sbGVyX25hbWUgPSB0aGlzLnBhdHJvbGxlciEubmFtZTtcbiAgICAgICAgaWYgKHRoaXMucGFyc2VfZmFzdF9jaGVja2luX21vZGUodGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgIGBQZXJmb3JtaW5nIGZhc3QgY2hlY2tpbiBmb3IgJHtwYXRyb2xsZXJfbmFtZX0gd2l0aCBtb2RlOiAke3RoaXMuY2hlY2tpbl9tb2RlfWBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5jaGVja2luKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKENPTU1BTkRTLk9OX0RVVFkuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIGdldF9vbl9kdXR5IGZvciAke3BhdHJvbGxlcl9uYW1lfWApO1xuICAgICAgICAgICAgcmV0dXJuIHsgcmVzcG9uc2U6IGF3YWl0IHRoaXMuZ2V0X29uX2R1dHkoKSB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ2hlY2tpbmcgZm9yIHN0YXR1cy4uLlwiKTtcbiAgICAgICAgaWYgKENPTU1BTkRTLlNUQVRVUy5pbmNsdWRlcyh0aGlzLmJvZHkhKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmZvcm1pbmcgZ2V0X3N0YXR1cyBmb3IgJHtwYXRyb2xsZXJfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldF9zdGF0dXMoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQ09NTUFORFMuQ0hFQ0tJTi5pbmNsdWRlcyh0aGlzLmJvZHkhKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmZvcm1pbmcgcHJvbXB0X2NoZWNraW4gZm9yICR7cGF0cm9sbGVyX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9tcHRfY2hlY2tpbigpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDT01NQU5EUy5DT01QX1BBU1MuaW5jbHVkZXModGhpcy5ib2R5ISkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIGNvbXBfcGFzcyBmb3IgJHtwYXRyb2xsZXJfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnByb21wdF9jb21wX21hbmFnZXJfcGFzcyhcbiAgICAgICAgICAgICAgICBDb21wUGFzc1R5cGUuQ29tcFBhc3MsXG4gICAgICAgICAgICAgICAgbnVsbFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wYXJzZV9mYXN0X3NlY3Rpb25fYXNzaWdubWVudCh0aGlzLmJvZHkhKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmZvcm1pbmcgZmFzdCBzZWN0aW9uX2Fzc2lnbm1lbnQgZm9yICR7cGF0cm9sbGVyX25hbWV9IHRvICR7dGhpcy5hc3NpZ25lZF9zZWN0aW9ufWApO1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuYXNzaWduX3NlY3Rpb24odGhpcy5hc3NpZ25lZF9zZWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQ09NTUFORFMuU0VDVElPTl9BU1NJR05NRU5ULmluY2x1ZGVzKHRoaXMuYm9keSEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBzZWN0aW9uX2Fzc2lnbm1lbnQgZm9yICR7cGF0cm9sbGVyX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5wcm9tcHRfc2VjdGlvbl9hc3NpZ25tZW50KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKENPTU1BTkRTLk1BTkFHRVJfUEFTUy5pbmNsdWRlcyh0aGlzLmJvZHkhKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmZvcm1pbmcgbWFuYWdlcl9wYXNzIGZvciAke3BhdHJvbGxlcl9uYW1lfWApO1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucHJvbXB0X2NvbXBfbWFuYWdlcl9wYXNzKFxuICAgICAgICAgICAgICAgIENvbXBQYXNzVHlwZS5NYW5hZ2VyUGFzcyxcbiAgICAgICAgICAgICAgICBudWxsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDT01NQU5EUy5XSEFUU0FQUC5pbmNsdWRlcyh0aGlzLmJvZHkhKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYEknbSBhdmFpbGFibGUgb24gd2hhdHNhcHAgYXMgd2VsbCEgV2hhdHNhcHAgdXNlcyBXaWZpL0NlbGwgRGF0YSBpbnN0ZWFkIG9mIFNNUywgYW5kIGNhbiBiZSBtb3JlIHJlbGlhYmxlLiBNZXNzYWdlIG1lIGF0IGh0dHBzOi8vd2EubWUvMSR7dGhpcy50b31gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQ09NTUFORFMuTUVTU0FHRS5pbmNsdWRlcyh0aGlzLmJvZHkhKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmZvcm1pbmcgbWVzc2FnZSBmb3IgJHtwYXRyb2xsZXJfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnByb21wdF9tZXNzYWdlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKENPTU1BTkRTLkJST0FEQ0FTVC5pbmNsdWRlcyh0aGlzLmJvZHkhKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmZvcm1pbmcgYnJvYWRjYXN0IGZvciAke3BhdHJvbGxlcl9uYW1lfWApO1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucHJvbXB0X2Jyb2FkY2FzdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvbXB0cyB0aGUgdXNlciBmb3IgYSBjb21tYW5kLlxuICAgICAqIEByZXR1cm5zIHtCVk5TUFJlc3BvbnNlfSBUaGUgcmVzcG9uc2UgcHJvbXB0aW5nIHRoZSB1c2VyIGZvciBhIGNvbW1hbmQuXG4gICAgICovXG4gICAgcHJvbXB0X2NvbW1hbmQoKTogQlZOU1BSZXNwb25zZSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZTogYCR7dGhpcy5wYXRyb2xsZXIhLm5hbWV9LCBJJ20gdGhlIEJWTlNQIEJvdC5cbkVudGVyIGEgY29tbWFuZDpcbkNoZWNrIGluIC8gQ2hlY2sgb3V0IC8gU3RhdHVzIC8gT24gRHV0eSAvIFNlY3Rpb24gQXNzaWdubWVudCAvIENvbXAgUGFzcyAvIE1hbmFnZXIgUGFzcyAvIE1lc3NhZ2UgLyBXaGF0c2FwcFxuU2VuZCAncmVzdGFydCcgYXQgYW55IHRpbWUgdG8gYmVnaW4gYWdhaW5gLFxuICAgICAgICAgICAgbmV4dF9zdGVwOiBORVhUX1NURVBTLkFXQUlUX0NPTU1BTkQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvbXB0cyB0aGUgdXNlciBmb3IgYSBjaGVjay1pbi5cbiAgICAgKiBAcmV0dXJucyB7QlZOU1BSZXNwb25zZX0gVGhlIHJlc3BvbnNlIHByb21wdGluZyB0aGUgdXNlciBmb3IgYSBjaGVjay1pbi5cbiAgICAgKi9cbiAgICBwcm9tcHRfY2hlY2tpbigpOiBCVk5TUFJlc3BvbnNlIHtcbiAgICAgICAgY29uc3QgdHlwZXMgPSBPYmplY3QudmFsdWVzKHRoaXMuY2hlY2tpbl92YWx1ZXMuYnlfa2V5KS5tYXAoXG4gICAgICAgICAgICAoeCkgPT4geC5zbXNfZGVzY1xuICAgICAgICApO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IGAke1xuICAgICAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyIS5uYW1lXG4gICAgICAgICAgICB9LCB1cGRhdGUgcGF0cm9sbGluZyBzdGF0dXMgdG86ICR7dHlwZXNcbiAgICAgICAgICAgICAgICAuc2xpY2UoMCwgLTEpXG4gICAgICAgICAgICAgICAgLmpvaW4oXCIsIFwiKX0sIG9yICR7dHlwZXMuc2xpY2UoLTEpfT9gLFxuICAgICAgICAgICAgbmV4dF9zdGVwOiBORVhUX1NURVBTLkFXQUlUX0NIRUNLSU4sXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBQYXJzZXMgdGhlIGZhc3Qgc2VjdGlvbiBhc3NpZ25tZW50IGZyb20gdGhlIG1lc3NhZ2UgYm9keS5cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5IC0gVGhlIG1lc3NhZ2UgYm9keS5cbiAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzZWN0aW9uIGFzc2lnbm1lbnQgaXMgcGFyc2VkLCBvdGhlcndpc2UgZmFsc2UuXG4gICAgKi9cbiAgICBwYXJzZV9mYXN0X3NlY3Rpb25fYXNzaWdubWVudChib2R5OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICB0aGlzLmFzc2lnbmVkX3NlY3Rpb24gPSBudWxsO1xuICAgIGlmICghYm9keSB8fCAhYm9keS5pbmNsdWRlcyhcIi1cIikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBzZWdtZW50cyA9IGJvZHkuc3BsaXQoXCItXCIpO1xuICAgIGNvbnN0IGxhc3RTZWdtZW50ID0gc2VnbWVudHMucG9wKCk7XG4gICAgY29uc3QgZmlyc3RQYXJ0ID0gc2VnbWVudHMuam9pbihcIi1cIikudG9Mb3dlckNhc2UoKTtcblxuICAgIGlmIChsYXN0U2VnbWVudCAmJiBDT01NQU5EUy5TRUNUSU9OX0FTU0lHTk1FTlQuaW5jbHVkZXMoZmlyc3RQYXJ0KSkge1xuICAgICAgICB0aGlzLmFzc2lnbmVkX3NlY3Rpb24gPSB0aGlzLnNlY3Rpb25fdmFsdWVzLm1hcF9zZWN0aW9uKGxhc3RTZWdtZW50LnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICByZXR1cm4gdGhpcy5hc3NpZ25lZF9zZWN0aW9uICE9PSBudWxsICYmIHRoaXMuYXNzaWduZWRfc2VjdGlvbiAhPT0gXCJcIjtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb21wdHMgdGhlIHVzZXIgZm9yIHNlY3Rpb24gYXNzaWdubWVudC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcmVzcG9uc2UuXG4gICAgICovXG4gICAgYXN5bmMgcHJvbXB0X3NlY3Rpb25fYXNzaWdubWVudCgpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgaWYgKCF0aGlzLnBhdHJvbGxlciB8fCAhdGhpcy5wYXRyb2xsZXIuY2hlY2tpbikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYCR7dGhpcy5wYXRyb2xsZXIhLm5hbWV9IGlzIG5vdCBjaGVja2VkIGluLmAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNlY3Rpb25fZGVzY3JpcHRpb24gPSB0aGlzLnNlY3Rpb25fdmFsdWVzLmdldF9zZWN0aW9uX2Rlc2NyaXB0aW9uKCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZTogYEVudGVyIHlvdXIgYXNzaWduZWQgc2VjdGlvbjsgb25lIG9mICR7c2VjdGlvbl9kZXNjcmlwdGlvbn0gKG9yICdyZXN0YXJ0JylgLFxuICAgICAgICAgICAgbmV4dF9zdGVwOiBORVhUX1NURVBTLkFXQUlUX1NFQ1RJT04sXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQnVpbGRzIHRoZSBtZXNzYWdlIHByZWZpeCBmb3IgYSB0ZXh0IG1lc3NhZ2UgZnJvbSBhIHBhdHJvbGxlci5cbiAgICAgKiBJbmNsdWRlcyB0aGUgc2VuZGVyJ3MgbmFtZSBhbmQgZm9ybWF0dGVkIHBob25lIG51bWJlci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VuZGVyX25hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcGF0cm9sbGVyIHNlbmRpbmcgdGhlIG1lc3NhZ2UuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbmRlcl9waG9uZSAtIFRoZSBzZW5kZXIncyAxMC1kaWdpdCBwaG9uZSBudW1iZXIuXG4gICAgICogQHJldHVybnMge3N0cmluZ30gVGhlIG1lc3NhZ2UgcHJlZml4IChlLmcuLCBcIk1lc3NhZ2UgZnJvbSBKb2huIERvZSAoMTIzKTQ1Ni03ODkwOiBcIikuXG4gICAgICovXG4gICAgZ2V0X21lc3NhZ2VfcHJlZml4KHNlbmRlcl9uYW1lOiBzdHJpbmcsIHNlbmRlcl9waG9uZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkX3Bob25lID0gZm9ybWF0X3Bob25lX2Zvcl9kaXNwbGF5KHNlbmRlcl9waG9uZSk7XG4gICAgICAgIHJldHVybiBgJHtNRVNTQUdFX1BSRUZJWF9URU1QTEFURX0ke3NlbmRlcl9uYW1lfSAke2Zvcm1hdHRlZF9waG9uZX0ke01FU1NBR0VfUFJFRklYX1NVRkZJWH1gO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgdGhlIG1heGltdW0gYWxsb3dlZCBtZXNzYWdlIGxlbmd0aCBmb3IgYSB0ZXh0IG1lc3NhZ2UuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbmRlcl9uYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHBhdHJvbGxlciBzZW5kaW5nIHRoZSBtZXNzYWdlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZW5kZXJfcGhvbmUgLSBUaGUgc2VuZGVyJ3MgMTAtZGlnaXQgcGhvbmUgbnVtYmVyLlxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBtYXhpbXVtIG51bWJlciBvZiBjaGFyYWN0ZXJzIHRoZSB1c2VyJ3MgbWVzc2FnZSBjYW4gY29udGFpbi5cbiAgICAgKi9cbiAgICBnZXRfbWF4X21lc3NhZ2VfbGVuZ3RoKHNlbmRlcl9uYW1lOiBzdHJpbmcsIHNlbmRlcl9waG9uZTogc3RyaW5nKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIFNNU19NQVhfTEVOR1RIIC0gdGhpcy5nZXRfbWVzc2FnZV9wcmVmaXgoc2VuZGVyX25hbWUsIHNlbmRlcl9waG9uZSkubGVuZ3RoO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb21wdHMgdGhlIHVzZXIgdG8gdHlwZSB0aGVpciB0ZXh0IG1lc3NhZ2UuXG4gICAgICogQW55IHBhdHJvbGxlciB3aXRoIGEgdmFsaWQgcGhvbmUgbnVtYmVyIGNhbiBzZW5kIGEgbWVzc2FnZSwgcmVnYXJkbGVzc1xuICAgICAqIG9mIHRoZWlyIG93biBjaGVjay1pbiBzdGF0dXMuICBUaGUgcmVjaXBpZW50IGxpc3QgaW5jbHVkZXMgYWxsXG4gICAgICogcGF0cm9sbGVycyB3aG8gaGF2ZSBhbnkgY2hlY2staW4gc3RhdHVzIChBbGwgRGF5LCBIYWxmIEFNLCBIYWxmIFBNLFxuICAgICAqIG9yIENoZWNrZWQgT3V0KSwgaW5jbHVkaW5nIHRoZSBzZW5kZXIgdGhlbXNlbHZlcyBpZiB0aGV5IGFyZSBjaGVja2VkIGluLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBwcm9tcHQgcmVzcG9uc2UuXG4gICAgICovXG4gICAgYXN5bmMgcHJvbXB0X21lc3NhZ2UoKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKTtcbiAgICAgICAgY29uc3QgcmVjaXBpZW50cyA9IGxvZ2luX3NoZWV0LmdldF9vbl9kdXR5X3BhdHJvbGxlcnMoKTtcbiAgICAgICAgaWYgKHJlY2lwaWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgTm8gcGF0cm9sbGVycyBhcmUgY3VycmVudGx5IGxvZ2dlZCBpbi4gVGhlcmUgaXMgbm9ib2R5IHRvIHNlbmQgYSBtZXNzYWdlIHRvLmAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNlbmRlcl9waG9uZSA9IHNhbml0aXplX3Bob25lX251bWJlcih0aGlzLmZyb20pO1xuICAgICAgICBjb25zdCBtYXhfbGVuZ3RoID0gdGhpcy5nZXRfbWF4X21lc3NhZ2VfbGVuZ3RoKHRoaXMucGF0cm9sbGVyIS5uYW1lLCBzZW5kZXJfcGhvbmUpO1xuICAgICAgICBpZiAobWF4X2xlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgWW91ciBuYW1lIGlzIHRvbyBsb25nIHRvIHNlbmQgYSB0ZXh0IG1lc3NhZ2UuYCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3BvbnNlOiBgUGxlYXNlIHR5cGUgYSBtZXNzYWdlIG9mIG5vIG1vcmUgdGhhbiAke21heF9sZW5ndGh9IHBsYWluLXRleHQgY2hhcmFjdGVycyB0byAke3JlY2lwaWVudHMubGVuZ3RofSBwYXRyb2xsZXIke3JlY2lwaWVudHMubGVuZ3RoICE9PSAxID8gXCJzXCIgOiBcIlwifSwgb3IgJ3Jlc3RhcnQnIHRvIGNhbmNlbC5gLFxuICAgICAgICAgICAgbmV4dF9zdGVwOiBORVhUX1NURVBTLkFXQUlUX01FU1NBR0UsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VuZHMgYSB0ZXh0IG1lc3NhZ2UgdG8gYWxsIHBhdHJvbGxlcnMgd2l0aCBhIGNoZWNrLWluIHN0YXR1cyBmb3IgdGhlIGRheS5cbiAgICAgKiBUaGUgc2VuZGVyIGFsc28gcmVjZWl2ZXMgdGhlIG1lc3NhZ2UgaWYgdGhleSBoYXZlIGEgY2hlY2staW4gc3RhdHVzLlxuICAgICAqIFZhbGlkYXRlcyB0aGF0IHRoZSBjb21wbGV0ZSBtZXNzYWdlIChwcmVmaXggKyBib2R5KSB1c2VzIG9ubHkgR1NNLTdcbiAgICAgKiBjaGFyYWN0ZXJzIGFuZCBmaXRzIHdpdGhpbiBhIHNpbmdsZSBTTVMgc2VnbWVudCwgdXNpbmcgdGhlXG4gICAgICogc21zLXNlZ21lbnRzLWNhbGN1bGF0b3IgbGlicmFyeS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZV90ZXh0IC0gVGhlIHJhdyBtZXNzYWdlIHRleHQgZnJvbSB0aGUgc2VuZGVyLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBzZW5kIHJlc3VsdC5cbiAgICAgKi9cbiAgICBhc3luYyBzZW5kX3RleHRfbWVzc2FnZShtZXNzYWdlX3RleHQ6IHN0cmluZyk6IFByb21pc2U8QlZOU1BSZXNwb25zZT4ge1xuICAgICAgICBjb25zdCBzZW5kZXJfbmFtZSA9IHRoaXMucGF0cm9sbGVyIS5uYW1lO1xuICAgICAgICBjb25zdCBzZW5kZXJfcGhvbmUgPSBzYW5pdGl6ZV9waG9uZV9udW1iZXIodGhpcy5mcm9tKTtcbiAgICAgICAgY29uc3QgcHJlZml4ID0gdGhpcy5nZXRfbWVzc2FnZV9wcmVmaXgoc2VuZGVyX25hbWUsIHNlbmRlcl9waG9uZSk7XG4gICAgICAgIGNvbnN0IG1heF9sZW5ndGggPSB0aGlzLmdldF9tYXhfbWVzc2FnZV9sZW5ndGgoc2VuZGVyX25hbWUsIHNlbmRlcl9waG9uZSk7XG4gICAgICAgIGNvbnN0IGZ1bGxfbWVzc2FnZSA9IHByZWZpeCArIG1lc3NhZ2VfdGV4dDtcblxuICAgICAgICBjb25zdCB2YWxpZGF0aW9uID0gdmFsaWRhdGVfc21zX21lc3NhZ2UoZnVsbF9tZXNzYWdlKTtcbiAgICAgICAgaWYgKCF2YWxpZGF0aW9uLnZhbGlkKSB7XG4gICAgICAgICAgICBpZiAodmFsaWRhdGlvbi5yZWFzb24gPT09IFwibm9uX2dzbTdcIikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJhZF9jaGFycyA9IHZhbGlkYXRpb24ubm9uX2dzbV9jaGFyYWN0ZXJzIS5qb2luKFwiIFwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICByZXNwb25zZTogYFlvdXIgbWVzc2FnZSBjb250YWlucyBjaGFyYWN0ZXJzIHRoYXQgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gcGxhaW4tdGV4dCBTTVM6ICR7YmFkX2NoYXJzfS4gUGxlYXNlIHVzZSBvbmx5IHN0YW5kYXJkIGNoYXJhY3RlcnMgYW5kIHRyeSBhZ2Fpbi5gLFxuICAgICAgICAgICAgICAgICAgICBuZXh0X3N0ZXA6IE5FWFRfU1RFUFMuQVdBSVRfTUVTU0FHRSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYFlvdXIgbWVzc2FnZSBpcyAke21lc3NhZ2VfdGV4dC5sZW5ndGh9IGNoYXJhY3RlcnMsIHdoaWNoIGV4Y2VlZHMgdGhlIGxpbWl0IG9mICR7bWF4X2xlbmd0aH0uIFBsZWFzZSBzaG9ydGVuIHlvdXIgbWVzc2FnZSBhbmQgdHJ5IGFnYWluLCBvciB0eXBlICdyZXN0YXJ0JyB0byBjYW5jZWwuYCxcbiAgICAgICAgICAgICAgICBuZXh0X3N0ZXA6IE5FWFRfU1RFUFMuQVdBSVRfTUVTU0FHRSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG4gICAgICAgIGNvbnN0IHNpZ25lZF9pbl9wYXRyb2xsZXJzID0gbG9naW5fc2hlZXQuZ2V0X29uX2R1dHlfcGF0cm9sbGVycygpO1xuICAgICAgICBjb25zdCBwaG9uZV9tYXAgPSBhd2FpdCB0aGlzLmdldF9waG9uZV9udW1iZXJfbWFwKCk7XG5cbiAgICAgICAgLy8gQnVpbGQgcmVjaXBpZW50IG1hcCBmb3Igb24tZHV0eSBwYXRyb2xsZXJzIHdpdGgga25vd24gcGhvbmVzOyB0cmFjayBtaXNzaW5nXG4gICAgICAgIGNvbnN0IHJlY2lwaWVudF9tYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7fTtcbiAgICAgICAgY29uc3Qgbm9fcGhvbmVfbmFtZXM6IHN0cmluZ1tdID0gW107XG4gICAgICAgIGZvciAoY29uc3QgcGF0cm9sbGVyIG9mIHNpZ25lZF9pbl9wYXRyb2xsZXJzKSB7XG4gICAgICAgICAgICBjb25zdCBwaG9uZSA9IHBob25lX21hcFtwYXRyb2xsZXIubmFtZV07XG4gICAgICAgICAgICBpZiAocGhvbmUpIHtcbiAgICAgICAgICAgICAgICByZWNpcGllbnRfbWFwW3BhdHJvbGxlci5uYW1lXSA9IHBob25lO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBub19waG9uZV9uYW1lcy5wdXNoKHBhdHJvbGxlci5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHsgc2VudF9jb3VudCwgY29weV9zZW50X3RvX3NlbmRlciwgZmFpbGVkX25hbWVzIH0gPVxuICAgICAgICAgICAgYXdhaXQgdGhpcy5kZWxpdmVyX3Ntc190b19tYXAocmVjaXBpZW50X21hcCwgZnVsbF9tZXNzYWdlLCBzZW5kZXJfbmFtZSk7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKGB0ZXh0X21lc3NhZ2UoJHtzZW50X2NvdW50ICsgKGNvcHlfc2VudF90b19zZW5kZXIgPyAxIDogMCl9KWApO1xuXG4gICAgICAgIGxldCByZXNwb25zZSA9IGBNZXNzYWdlIHNlbnQgdG8gJHtzZW50X2NvdW50fSBwYXRyb2xsZXIke3NlbnRfY291bnQgIT09IDEgPyBcInNcIiA6IFwiXCJ9YDtcbiAgICAgICAgaWYgKGNvcHlfc2VudF90b19zZW5kZXIpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlICs9IGAgYW5kIGEgY29weSB0byB5b3UuYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3BvbnNlICs9IGAuYDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhbGxfZmFpbGVkID0gWy4uLm5vX3Bob25lX25hbWVzLCAuLi5mYWlsZWRfbmFtZXNdO1xuICAgICAgICBpZiAoYWxsX2ZhaWxlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXNwb25zZSArPSBgIENvdWxkIG5vdCBzZW5kIHRvOiAke2FsbF9mYWlsZWQuam9pbihcIiwgXCIpfS5gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHJlc3BvbnNlIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29yZSBTTVMgZGVsaXZlcnkgbG9vcC4gU2VuZHMgZnVsbF9tZXNzYWdlIHRvIGVhY2ggZW50cnkgaW4gcmVjaXBpZW50X21hcFxuICAgICAqIChuYW1lIOKGkiBcIisxWFhYWFhYWFhYWFwiKS4gSWYgdGhlIHNlbmRlcidzIHBob25lIGlzIG5vdCBhbW9uZyB0aGUgcmVjaXBpZW50cyxcbiAgICAgKiBhIGNvcHkgaXMgc2VudCB0byB0aGlzLmZyb20uIFJldHVybnMgZGVsaXZlcnkgYWNjb3VudGluZyBkYXRhLlxuICAgICAqIEBwYXJhbSB7UmVjb3JkPHN0cmluZywgc3RyaW5nPn0gcmVjaXBpZW50X21hcCAtIE1hcCBvZiBwYXRyb2xsZXIgbmFtZSB0byBcIisxWFhYWFhYWFhYWFwiIHBob25lLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmdWxsX21lc3NhZ2UgLSBUaGUgY29tcGxldGUgZm9ybWF0dGVkIFNNUyB0byBzZW5kLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZW5kZXJfbmFtZSAtIFRoZSBzZW5kZXIncyBuYW1lICh1c2VkIGZvciBmYWlsdXJlIGxvZ2dpbmcpLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPG9iamVjdD59IERlbGl2ZXJ5IGNvdW50cyBhbmQgZmFpbHVyZSBsaXN0LlxuICAgICAqL1xuICAgIGFzeW5jIGRlbGl2ZXJfc21zX3RvX21hcChcbiAgICAgICAgcmVjaXBpZW50X21hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nPixcbiAgICAgICAgZnVsbF9tZXNzYWdlOiBzdHJpbmcsXG4gICAgICAgIHNlbmRlcl9uYW1lOiBzdHJpbmcsXG4gICAgKTogUHJvbWlzZTx7IHNlbnRfY291bnQ6IG51bWJlcjsgY29weV9zZW50X3RvX3NlbmRlcjogYm9vbGVhbjsgZmFpbGVkX25hbWVzOiBzdHJpbmdbXSB9PiB7XG4gICAgICAgIGxldCBzZW50X2NvdW50ID0gMDtcbiAgICAgICAgY29uc3QgZmFpbGVkX25hbWVzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgICAgIGZvciAoY29uc3QgW25hbWUsIHBob25lXSBvZiBPYmplY3QuZW50cmllcyhyZWNpcGllbnRfbWFwKSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmdldF90d2lsaW9fY2xpZW50KCkubWVzc2FnZXMuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgdG86IHBob25lLFxuICAgICAgICAgICAgICAgICAgICBmcm9tOiB0aGlzLnRvLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiBmdWxsX21lc3NhZ2UsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc2VudF9jb3VudCsrO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBGYWlsZWQgdG8gc2VuZCBTTVMgdG8gJHtuYW1lfTogJHtlfWApO1xuICAgICAgICAgICAgICAgIGZhaWxlZF9uYW1lcy5wdXNoKG5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2VuZCBhIGNvcHkgdG8gdGhlIHNlbmRlciBpZiB0aGVpciBudW1iZXIgaXMgbm90IGFscmVhZHkgaW4gdGhlIHJlY2lwaWVudCBtYXBcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZF9zZW5kZXIgPSBgKzEke3Nhbml0aXplX3Bob25lX251bWJlcih0aGlzLmZyb20pfWA7XG4gICAgICAgIGNvbnN0IHNlbmRlcl9pbl9tYXAgPSBPYmplY3QudmFsdWVzKHJlY2lwaWVudF9tYXApLmluY2x1ZGVzKG5vcm1hbGl6ZWRfc2VuZGVyKTtcbiAgICAgICAgbGV0IGNvcHlfc2VudF90b19zZW5kZXIgPSBmYWxzZTtcbiAgICAgICAgaWYgKCFzZW5kZXJfaW5fbWFwKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0X3R3aWxpb19jbGllbnQoKS5tZXNzYWdlcy5jcmVhdGUoe1xuICAgICAgICAgICAgICAgICAgICB0bzogdGhpcy5mcm9tLFxuICAgICAgICAgICAgICAgICAgICBmcm9tOiB0aGlzLnRvLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiBmdWxsX21lc3NhZ2UsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29weV9zZW50X3RvX3NlbmRlciA9IHRydWU7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYEZhaWxlZCB0byBzZW5kIFNNUyBjb3B5IHRvIHNlbmRlciAke3NlbmRlcl9uYW1lfTogJHtlfWApO1xuICAgICAgICAgICAgICAgIGZhaWxlZF9uYW1lcy5wdXNoKHNlbmRlcl9uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7IHNlbnRfY291bnQsIGNvcHlfc2VudF90b19zZW5kZXIsIGZhaWxlZF9uYW1lcyB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb21wdHMgdGhlIHVzZXIgdG8gdHlwZSBhIGJyb2FkY2FzdCBtZXNzYWdlIHRvIGFsbCBwYXRyb2xsZXJzLlxuICAgICAqIFVubGlrZSB0aGUgbWVzc2FnZSBjb21tYW5kICh3aGljaCB0YXJnZXRzIG9ubHkgbG9nZ2VkLWluIHBhdHJvbGxlcnMpLCBicm9hZGNhc3RcbiAgICAgKiBzZW5kcyB0byBldmVyeSBwYXRyb2xsZXIgaW4gdGhlIFBob25lIE51bWJlcnMgc2hlZXQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHByb21wdCByZXNwb25zZS5cbiAgICAgKi9cbiAgICBhc3luYyBwcm9tcHRfYnJvYWRjYXN0KCk6IFByb21pc2U8QlZOU1BSZXNwb25zZT4ge1xuICAgICAgICBjb25zdCBwaG9uZV9tYXAgPSBhd2FpdCB0aGlzLmdldF9waG9uZV9udW1iZXJfbWFwKCk7XG4gICAgICAgIGNvbnN0IHJlY2lwaWVudF9jb3VudCA9IE9iamVjdC5rZXlzKHBob25lX21hcCkubGVuZ3RoO1xuICAgICAgICBpZiAocmVjaXBpZW50X2NvdW50ID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgTm8gcGF0cm9sbGVycyB3aXRoIHBob25lIG51bWJlcnMgZm91bmQuIFRoZXJlIGlzIG5vYm9keSB0byBicm9hZGNhc3QgdG8uYCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2VuZGVyX3Bob25lID0gc2FuaXRpemVfcGhvbmVfbnVtYmVyKHRoaXMuZnJvbSk7XG4gICAgICAgIGNvbnN0IG1heF9sZW5ndGggPSB0aGlzLmdldF9tYXhfbWVzc2FnZV9sZW5ndGgodGhpcy5wYXRyb2xsZXIhLm5hbWUsIHNlbmRlcl9waG9uZSk7XG4gICAgICAgIGlmIChtYXhfbGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBZb3VyIG5hbWUgaXMgdG9vIGxvbmcgdG8gc2VuZCBhIGJyb2FkY2FzdCBtZXNzYWdlLmAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZTogYFBsZWFzZSB0eXBlIGEgYnJvYWRjYXN0IG1lc3NhZ2Ugb2Ygbm8gbW9yZSB0aGFuICR7bWF4X2xlbmd0aH0gcGxhaW4tdGV4dCBjaGFyYWN0ZXJzIHRvICR7cmVjaXBpZW50X2NvdW50fSBwYXRyb2xsZXIke3JlY2lwaWVudF9jb3VudCAhPT0gMSA/IFwic1wiIDogXCJcIn0sIG9yICdyZXN0YXJ0JyB0byBjYW5jZWwuYCxcbiAgICAgICAgICAgIG5leHRfc3RlcDogTkVYVF9TVEVQUy5BV0FJVF9CUk9BRENBU1QsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VuZHMgYSBicm9hZGNhc3QgbWVzc2FnZSB0byBBTEwgcGF0cm9sbGVycyBpbiB0aGUgUGhvbmUgTnVtYmVycyBzaGVldCxcbiAgICAgKiByZWdhcmRsZXNzIG9mIGNoZWNrLWluIHN0YXR1cy4gVXNlcyB0aGUgc2FtZSBwcmVmaXggZm9ybWF0IGFuZCBHU00tNyAvIHNpbmdsZS1zZWdtZW50XG4gICAgICogdmFsaWRhdGlvbiBhcyB0aGUgbWVzc2FnZSBjb21tYW5kLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlX3RleHQgLSBUaGUgcmF3IG1lc3NhZ2UgdGV4dCBmcm9tIHRoZSBzZW5kZXIuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHNlbmQgcmVzdWx0LlxuICAgICAqL1xuICAgIGFzeW5jIHNlbmRfYnJvYWRjYXN0X21lc3NhZ2UobWVzc2FnZV90ZXh0OiBzdHJpbmcpOiBQcm9taXNlPEJWTlNQUmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3Qgc2VuZGVyX25hbWUgPSB0aGlzLnBhdHJvbGxlciEubmFtZTtcbiAgICAgICAgY29uc3Qgc2VuZGVyX3Bob25lID0gc2FuaXRpemVfcGhvbmVfbnVtYmVyKHRoaXMuZnJvbSk7XG4gICAgICAgIGNvbnN0IHByZWZpeCA9IHRoaXMuZ2V0X21lc3NhZ2VfcHJlZml4KHNlbmRlcl9uYW1lLCBzZW5kZXJfcGhvbmUpO1xuICAgICAgICBjb25zdCBtYXhfbGVuZ3RoID0gdGhpcy5nZXRfbWF4X21lc3NhZ2VfbGVuZ3RoKHNlbmRlcl9uYW1lLCBzZW5kZXJfcGhvbmUpO1xuICAgICAgICBjb25zdCBmdWxsX21lc3NhZ2UgPSBwcmVmaXggKyBtZXNzYWdlX3RleHQ7XG5cbiAgICAgICAgY29uc3QgdmFsaWRhdGlvbiA9IHZhbGlkYXRlX3Ntc19tZXNzYWdlKGZ1bGxfbWVzc2FnZSk7XG4gICAgICAgIGlmICghdmFsaWRhdGlvbi52YWxpZCkge1xuICAgICAgICAgICAgaWYgKHZhbGlkYXRpb24ucmVhc29uID09PSBcIm5vbl9nc203XCIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBiYWRfY2hhcnMgPSB2YWxpZGF0aW9uLm5vbl9nc21fY2hhcmFjdGVycyEuam9pbihcIiBcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBZb3VyIG1lc3NhZ2UgY29udGFpbnMgY2hhcmFjdGVycyB0aGF0IGFyZSBub3Qgc3VwcG9ydGVkIGluIHBsYWluLXRleHQgU01TOiAke2JhZF9jaGFyc30uIFBsZWFzZSB1c2Ugb25seSBzdGFuZGFyZCBjaGFyYWN0ZXJzIGFuZCB0cnkgYWdhaW4uYCxcbiAgICAgICAgICAgICAgICAgICAgbmV4dF9zdGVwOiBORVhUX1NURVBTLkFXQUlUX0JST0FEQ0FTVCxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYFlvdXIgbWVzc2FnZSBpcyAke21lc3NhZ2VfdGV4dC5sZW5ndGh9IGNoYXJhY3RlcnMsIHdoaWNoIGV4Y2VlZHMgdGhlIGxpbWl0IG9mICR7bWF4X2xlbmd0aH0uIFBsZWFzZSBzaG9ydGVuIHlvdXIgbWVzc2FnZSBhbmQgdHJ5IGFnYWluLCBvciB0eXBlICdyZXN0YXJ0JyB0byBjYW5jZWwuYCxcbiAgICAgICAgICAgICAgICBuZXh0X3N0ZXA6IE5FWFRfU1RFUFMuQVdBSVRfQlJPQURDQVNULFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZvciBicm9hZGNhc3QsIHNlbmQgdG8gQUxMIHBhdHJvbGxlcnMgaW4gdGhlIHBob25lIG51bWJlciBtYXBcbiAgICAgICAgY29uc3QgcGhvbmVfbWFwID0gYXdhaXQgdGhpcy5nZXRfcGhvbmVfbnVtYmVyX21hcCgpO1xuICAgICAgICBjb25zdCB7IHNlbnRfY291bnQsIGNvcHlfc2VudF90b19zZW5kZXIsIGZhaWxlZF9uYW1lcyB9ID1cbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZGVsaXZlcl9zbXNfdG9fbWFwKHBob25lX21hcCwgZnVsbF9tZXNzYWdlLCBzZW5kZXJfbmFtZSk7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKGBicm9hZGNhc3QoJHtzZW50X2NvdW50ICsgKGNvcHlfc2VudF90b19zZW5kZXIgPyAxIDogMCl9KWApO1xuXG4gICAgICAgIGxldCByZXNwb25zZSA9IGBCcm9hZGNhc3Qgc2VudCB0byAke3NlbnRfY291bnR9IHBhdHJvbGxlciR7c2VudF9jb3VudCAhPT0gMSA/IFwic1wiIDogXCJcIn1gO1xuICAgICAgICBpZiAoY29weV9zZW50X3RvX3NlbmRlcikge1xuICAgICAgICAgICAgcmVzcG9uc2UgKz0gYCBhbmQgYSBjb3B5IHRvIHlvdS5gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzcG9uc2UgKz0gYC5gO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZhaWxlZF9uYW1lcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXNwb25zZSArPSBgIENvdWxkIG5vdCBzZW5kIHRvOiAke2ZhaWxlZF9uYW1lcy5qb2luKFwiLCBcIil9LmA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgcmVzcG9uc2UgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb29rcyB1cCBwaG9uZSBudW1iZXJzIGZvciBhbGwgcGF0cm9sbGVycyBmcm9tIHRoZSBQaG9uZSBOdW1iZXJzIHNoZWV0LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFJlY29yZDxzdHJpbmcsIHN0cmluZz4+fSBBIG1hcCBvZiBwYXRyb2xsZXIgbmFtZSB0byBwaG9uZSBudW1iZXIgKGluICsxWFhYWFhYWFhYWCBmb3JtYXQpLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF9waG9uZV9udW1iZXJfbWFwKCk6IFByb21pc2U8UmVjb3JkPHN0cmluZywgc3RyaW5nPj4ge1xuICAgICAgICBjb25zdCBzaGVldHNfc2VydmljZSA9IGF3YWl0IHRoaXMuZ2V0X3NoZWV0c19zZXJ2aWNlKCk7XG4gICAgICAgIGNvbnN0IG9wdHM6IEZpbmRQYXRyb2xsZXJDb25maWcgPSB0aGlzLmNvbWJpbmVkX2NvbmZpZztcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBzaGVldHNfc2VydmljZS5zcHJlYWRzaGVldHMudmFsdWVzLmdldCh7XG4gICAgICAgICAgICBzcHJlYWRzaGVldElkOiBvcHRzLlNIRUVUX0lELFxuICAgICAgICAgICAgcmFuZ2U6IG9wdHMuUEhPTkVfTlVNQkVSX0xPT0tVUF9TSEVFVCxcbiAgICAgICAgICAgIHZhbHVlUmVuZGVyT3B0aW9uOiBcIlVORk9STUFUVEVEX1ZBTFVFXCIsXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIXJlc3BvbnNlLmRhdGEudmFsdWVzKSB7XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge307XG4gICAgICAgIGZvciAoY29uc3Qgcm93IG9mIHJlc3BvbnNlLmRhdGEudmFsdWVzKSB7XG4gICAgICAgICAgICBjb25zdCBuYW1lID0gcm93W2V4Y2VsX3Jvd190b19pbmRleChvcHRzLlBIT05FX05VTUJFUl9OQU1FX0NPTFVNTildO1xuICAgICAgICAgICAgY29uc3QgcmF3TnVtYmVyID0gcm93W2V4Y2VsX3Jvd190b19pbmRleChvcHRzLlBIT05FX05VTUJFUl9OVU1CRVJfQ09MVU1OKV07XG4gICAgICAgICAgICBpZiAobmFtZSAmJiByYXdOdW1iZXIpIHtcbiAgICAgICAgICAgICAgICBtYXBbbmFtZV0gPSBgKzEke3Nhbml0aXplX3Bob25lX251bWJlcihyYXdOdW1iZXIpfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hcDtcbiAgICB9XG5cbi8qKlxuICogQXNzaWducyB0aGUgc2VjdGlvbiB0byB0aGUgcGF0cm9sbGVyLlxuICogQHBhcmFtIHtzdHJpbmcgfCBudWxsfSBzZWN0aW9uIC0gVGhlIHNlY3Rpb24gdG8gYXNzaWduLlxuICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHJlc3BvbnNlLlxuICovXG5hc3luYyBhc3NpZ25fc2VjdGlvbihzZWN0aW9uOiBzdHJpbmcgfCBudWxsKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlPiB7XG4gICAgY29uc3QgYXNzaWduZWRTZWN0aW9uID0gc2VjdGlvbiA/PyBcIlJvdmluZ1wiO1xuICAgIGNvbnNvbGUubG9nKGBBc3NpZ25pbmcgc2VjdGlvbiAke3RoaXMucGF0cm9sbGVyIS5uYW1lfSB0byAke2Fzc2lnbmVkU2VjdGlvbn1gKTtcbiAgICBjb25zdCBtYXBwZWRfc2VjdGlvbiA9IHRoaXMuc2VjdGlvbl92YWx1ZXMubWFwX3NlY3Rpb24oYXNzaWduZWRTZWN0aW9uKTtcbiAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oYGFzc2lnbl9zZWN0aW9uKCR7bWFwcGVkX3NlY3Rpb259KWApO1xuICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKTtcbiAgICBhd2FpdCBsb2dpbl9zaGVldC5hc3NpZ25fc2VjdGlvbih0aGlzLnBhdHJvbGxlciEsIG1hcHBlZF9zZWN0aW9uKTtcbiAgICBhd2FpdCB0aGlzLmxvZ2luX3NoZWV0Py5yZWZyZXNoKCk7XG4gICAgYXdhaXQgdGhpcy5nZXRfbWFwcGVkX3BhdHJvbGxlcih0cnVlKTtcbiAgICByZXR1cm4ge1xuICAgICAgICByZXNwb25zZTogYFVwZGF0ZWQgJHt0aGlzLnBhdHJvbGxlciEubmFtZX0gd2l0aCBzZWN0aW9uIGFzc2lnbm1lbnQ6ICR7bWFwcGVkX3NlY3Rpb259LmAsXG4gICAgfTtcbn1cblxuICAgIC8qKlxuICAgICAqIFByb21wdHMgdGhlIHVzZXIgZm9yIGEgY29tcCBvciBtYW5hZ2VyIHBhc3MuXG4gICAgICogQHBhcmFtIHtDb21wUGFzc1R5cGV9IHBhc3NfdHlwZSAtIFRoZSB0eXBlIG9mIHBhc3MuXG4gICAgICogQHBhcmFtIHtudW1iZXIgfCBudWxsfSBwYXNzZXNfdG9fdXNlIC0gVGhlIG51bWJlciBvZiBwYXNzZXMgdG8gdXNlLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSByZXNwb25zZS5cbiAgICAgKi9cbiAgICBhc3luYyBwcm9tcHRfY29tcF9tYW5hZ2VyX3Bhc3MoXG4gICAgICAgIHBhc3NfdHlwZTogQ29tcFBhc3NUeXBlLFxuICAgICAgICBndWVzdF9uYW1lOiBzdHJpbmcgfCBudWxsXG4gICAgKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlPiB7XG4gICAgICAgIGlmICh0aGlzLnBhdHJvbGxlciEuY2F0ZWdvcnkgPT0gXCJDXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGAke1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICAgICAgICAgIH0sIGNhbmRpZGF0ZXMgZG8gbm90IHJlY2VpdmUgY29tcCBvciBtYW5hZ2VyIHBhc3Nlcy5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzaGVldDogUGFzc1NoZWV0ID0gYXdhaXQgKHBhc3NfdHlwZSA9PSBDb21wUGFzc1R5cGUuQ29tcFBhc3NcbiAgICAgICAgICAgID8gdGhpcy5nZXRfY29tcF9wYXNzX3NoZWV0KClcbiAgICAgICAgICAgIDogdGhpcy5nZXRfbWFuYWdlcl9wYXNzX3NoZWV0KCkpO1xuXG4gICAgICAgIGNvbnN0IHVzZWRfYW5kX2F2YWlsYWJsZSA9IGF3YWl0IHNoZWV0LmdldF9hdmFpbGFibGVfYW5kX3VzZWRfcGFzc2VzKFxuICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXI/Lm5hbWUhXG4gICAgICAgICk7XG4gICAgICAgIGlmICh1c2VkX2FuZF9hdmFpbGFibGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogXCJQcm9ibGVtIGxvb2tpbmcgdXAgcGF0cm9sbGVyIGZvciBjb21wIHBhc3Nlc1wiLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZ3Vlc3RfbmFtZSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdXNlZF9hbmRfYXZhaWxhYmxlLmdldF9wcm9tcHQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubG9nX2FjdGlvbihgdXNlXyR7cGFzc190eXBlfWApO1xuICAgICAgICAgICAgYXdhaXQgc2hlZXQuc2V0X3VzZWRfY29tcF9wYXNzZXModXNlZF9hbmRfYXZhaWxhYmxlLCBndWVzdF9uYW1lKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBVcGRhdGVkICR7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyIS5uYW1lXG4gICAgICAgICAgICAgICAgfSB0byB1c2UgJHtnZXRfY29tcF9wYXNzX2Rlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBwYXNzX3R5cGVcbiAgICAgICAgICAgICAgICApfSBmb3IgZ3Vlc3QgXCIke2d1ZXN0X25hbWV9XCIgdG9kYXkuYCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBzdGF0dXMgb2YgdGhlIHBhdHJvbGxlci5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgc3RhdHVzIHJlc3BvbnNlLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF9zdGF0dXMoKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKTtcbiAgICAgICAgY29uc3Qgc2hlZXRfZGF0ZSA9IGxvZ2luX3NoZWV0LnNoZWV0X2RhdGUudG9EYXRlU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfZGF0ZSA9IGxvZ2luX3NoZWV0LmN1cnJlbnRfZGF0ZS50b0RhdGVTdHJpbmcoKTtcbiAgICAgICAgaWYgKCFsb2dpbl9zaGVldC5pc19jdXJyZW50KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgc2hlZXRfZGF0ZTogJHtsb2dpbl9zaGVldC5zaGVldF9kYXRlfWApO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYGN1cnJlbnRfZGF0ZTogJHtsb2dpbl9zaGVldC5jdXJyZW50X2RhdGV9YCk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgU2hlZXQgaXMgbm90IGN1cnJlbnQgZm9yIHRvZGF5IChsYXN0IHJlc2V0OiAke3NoZWV0X2RhdGV9KS4gJHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXIhLm5hbWVcbiAgICAgICAgICAgICAgICB9IGlzIG5vdCBjaGVja2VkIGluIGZvciAke2N1cnJlbnRfZGF0ZX0uYCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB7IHJlc3BvbnNlOiBhd2FpdCB0aGlzLmdldF9zdGF0dXNfc3RyaW5nKCkgfTtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKFwic3RhdHVzXCIpO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgc3RhdHVzIHN0cmluZyBvZiB0aGUgcGF0cm9sbGVyLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHN0cmluZz59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHN0YXR1cyBzdHJpbmcuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3N0YXR1c19zdHJpbmcoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuICAgICAgICBjb25zdCBjb21wX3Bhc3NfcHJvbWlzZSA9IChcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0X2NvbXBfcGFzc19zaGVldCgpXG4gICAgICAgICkuZ2V0X2F2YWlsYWJsZV9hbmRfdXNlZF9wYXNzZXModGhpcy5wYXRyb2xsZXIhLm5hbWUpO1xuICAgICAgICBjb25zdCBtYW5hZ2VyX3Bhc3NfcHJvbWlzZSA9IChcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0X21hbmFnZXJfcGFzc19zaGVldCgpXG4gICAgICAgICkuZ2V0X2F2YWlsYWJsZV9hbmRfdXNlZF9wYXNzZXModGhpcy5wYXRyb2xsZXIhLm5hbWUpO1xuICAgICAgICBjb25zdCBwYXRyb2xsZXJfc3RhdHVzID0gdGhpcy5wYXRyb2xsZXIhO1xuXG4gICAgICAgIGNvbnN0IGNoZWNraW5Db2x1bW5TZXQgPVxuICAgICAgICAgICAgcGF0cm9sbGVyX3N0YXR1cy5jaGVja2luICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIHBhdHJvbGxlcl9zdGF0dXMuY2hlY2tpbiAhPT0gbnVsbDtcbiAgICAgICAgY29uc3QgY2hlY2tlZE91dCA9XG4gICAgICAgICAgICBjaGVja2luQ29sdW1uU2V0ICYmXG4gICAgICAgICAgICB0aGlzLmNoZWNraW5fdmFsdWVzLmJ5X3NoZWV0X3N0cmluZ1twYXRyb2xsZXJfc3RhdHVzLmNoZWNraW5dLmtleSA9PVxuICAgICAgICAgICAgICAgIFwib3V0XCI7XG4gICAgICAgIGxldCBzdGF0dXMgPSBwYXRyb2xsZXJfc3RhdHVzLmNoZWNraW4gfHwgXCJOb3QgUHJlc2VudFwiO1xuXG4gICAgICAgIGlmIChjaGVja2VkT3V0KSB7XG4gICAgICAgICAgICBzdGF0dXMgPSBcIkNoZWNrZWQgT3V0XCI7XG4gICAgICAgIH0gZWxzZSBpZiAoY2hlY2tpbkNvbHVtblNldCkge1xuICAgICAgICAgICAgbGV0IHNlY3Rpb24gPSBwYXRyb2xsZXJfc3RhdHVzLnNlY3Rpb24udG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGlmIChzZWN0aW9uLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgc2VjdGlvbiA9IGBTZWN0aW9uICR7c2VjdGlvbn1gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RhdHVzID0gYCR7cGF0cm9sbGVyX3N0YXR1cy5jaGVja2lufSAoJHtzZWN0aW9ufSlgO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29tcGxldGVkUGF0cm9sRGF5cyA9IGF3YWl0IChcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0X3NlYXNvbl9zaGVldCgpXG4gICAgICAgICkuZ2V0X3BhdHJvbGxlZF9kYXlzKHRoaXMucGF0cm9sbGVyIS5uYW1lKTtcbiAgICAgICAgY29uc3QgY29tcGxldGVkUGF0cm9sRGF5c1N0cmluZyA9XG4gICAgICAgICAgICBjb21wbGV0ZWRQYXRyb2xEYXlzID4gMCA/IGNvbXBsZXRlZFBhdHJvbERheXMudG9TdHJpbmcoKSA6IFwiTm9cIjtcbiAgICAgICAgY29uc3QgbG9naW5TaGVldERhdGUgPSBsb2dpbl9zaGVldC5zaGVldF9kYXRlLnRvRGF0ZVN0cmluZygpO1xuXG4gICAgICAgIGxldCBzdGF0dXNTdHJpbmcgPSBgU3RhdHVzIGZvciAke1xuICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXIhLm5hbWVcbiAgICAgICAgfSBvbiBkYXRlICR7bG9naW5TaGVldERhdGV9OiAke3N0YXR1c30uXFxuJHtjb21wbGV0ZWRQYXRyb2xEYXlzU3RyaW5nfSBjb21wbGV0ZWQgcGF0cm9sIGRheXMgcHJpb3IgdG8gdG9kYXkuYDtcbiAgICAgICAgY29uc3QgdXNlZFRvZGF5Q29tcFBhc3NlcyA9IChhd2FpdCBjb21wX3Bhc3NfcHJvbWlzZSk/LnVzZWRfdG9kYXkgfHwgMDtcbiAgICAgICAgY29uc3QgdXNlZFRvZGF5TWFuYWdlclBhc3NlcyA9XG4gICAgICAgICAgICAoYXdhaXQgbWFuYWdlcl9wYXNzX3Byb21pc2UpPy51c2VkX3RvZGF5IHx8IDA7XG4gICAgICAgIGNvbnN0IHVzZWRTZWFzb25Db21wUGFzc2VzID1cbiAgICAgICAgICAgIChhd2FpdCBjb21wX3Bhc3NfcHJvbWlzZSk/LnVzZWRfc2Vhc29uIHx8IDA7XG4gICAgICAgIGNvbnN0IHVzZWRTZWFzb25NYW5hZ2VyUGFzc2VzID1cbiAgICAgICAgICAgIChhd2FpdCBtYW5hZ2VyX3Bhc3NfcHJvbWlzZSk/LnVzZWRfc2Vhc29uIHx8IDA7XG4gICAgICAgIGNvbnN0IGF2YWlsYWJsZUNvbXBQYXNzZXMgPSAoYXdhaXQgY29tcF9wYXNzX3Byb21pc2UpPy5hdmFpbGFibGUgfHwgMDtcbiAgICAgICAgY29uc3QgYXZhaWxhYmxlTWFuYWdlclBhc3NlcyA9XG4gICAgICAgICAgICAoYXdhaXQgbWFuYWdlcl9wYXNzX3Byb21pc2UpPy5hdmFpbGFibGUgfHwgMDtcblxuICAgICAgICBzdGF0dXNTdHJpbmcgKz1cbiAgICAgICAgICAgIFwiIFwiICtcbiAgICAgICAgICAgIGJ1aWxkX3Bhc3Nlc19zdHJpbmcoXG4gICAgICAgICAgICAgICAgdXNlZFNlYXNvbkNvbXBQYXNzZXMsXG4gICAgICAgICAgICAgICAgdXNlZFNlYXNvbkNvbXBQYXNzZXMgKyBhdmFpbGFibGVDb21wUGFzc2VzLFxuICAgICAgICAgICAgICAgIHVzZWRUb2RheUNvbXBQYXNzZXMsXG4gICAgICAgICAgICAgICAgXCJjb21wIHBhc3Nlc1wiXG4gICAgICAgICAgICApO1xuICAgICAgICBpZiAodXNlZFNlYXNvbk1hbmFnZXJQYXNzZXMgKyBhdmFpbGFibGVNYW5hZ2VyUGFzc2VzID4gMCkge1xuICAgICAgICAgICAgc3RhdHVzU3RyaW5nICs9XG4gICAgICAgICAgICAgICAgXCIgXCIgK1xuICAgICAgICAgICAgICAgIGJ1aWxkX3Bhc3Nlc19zdHJpbmcoXG4gICAgICAgICAgICAgICAgICAgIHVzZWRTZWFzb25NYW5hZ2VyUGFzc2VzLFxuICAgICAgICAgICAgICAgICAgICB1c2VkU2Vhc29uTWFuYWdlclBhc3NlcyArIGF2YWlsYWJsZU1hbmFnZXJQYXNzZXMsXG4gICAgICAgICAgICAgICAgICAgIHVzZWRUb2RheU1hbmFnZXJQYXNzZXMsXG4gICAgICAgICAgICAgICAgICAgIFwibWFuYWdlciBwYXNzZXNcIlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0YXR1c1N0cmluZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyB0aGUgY2hlY2staW4gcHJvY2VzcyBmb3IgdGhlIHBhdHJvbGxlciBvbmNlIHRoZSBjaGVjay1pbiBtb2RlIGlzIHNldC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCVk5TUFJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgY2hlY2staW4gcmVzcG9uc2UuXG4gICAgICogQHRocm93cyB7RXJyb3J9IFRocm93cyBhbiBlcnJvciBpZiB0aGUgY2hlY2staW4gbW9kZSBpcyBpbXByb3Blcmx5IHNldC5cbiAgICAgKi9cbiAgICBhc3luYyBjaGVja2luKCk6IFByb21pc2U8QlZOU1BSZXNwb25zZT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgIGBQZXJmb3JtaW5nIHJlZ3VsYXIgY2hlY2tpbiBmb3IgJHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhdHJvbGxlciEubmFtZVxuICAgICAgICAgICAgfSB3aXRoIG1vZGU6ICR7dGhpcy5jaGVja2luX21vZGV9YFxuICAgICAgICApO1xuICAgICAgICBpZiAoYXdhaXQgdGhpcy5zaGVldF9uZWVkc19yZXNldCgpKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOlxuICAgICAgICAgICAgICAgICAgICBgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyIS5uYW1lXG4gICAgICAgICAgICAgICAgICAgIH0sIHlvdSBhcmUgdGhlIGZpcnN0IHBlcnNvbiB0byBjaGVjayBpbiB0b2RheS4gYCArXG4gICAgICAgICAgICAgICAgICAgIGBJIG5lZWQgdG8gYXJjaGl2ZSBhbmQgcmVzZXQgdGhlIHNoZWV0IGJlZm9yZSBjb250aW51aW5nLiBgICtcbiAgICAgICAgICAgICAgICAgICAgYFdvdWxkIHlvdSBsaWtlIG1lIHRvIGRvIHRoYXQ/IChZZXMvTm8pYCxcbiAgICAgICAgICAgICAgICBuZXh0X3N0ZXA6IGAke05FWFRfU1RFUFMuQ09ORklSTV9SRVNFVH0tJHt0aGlzLmNoZWNraW5fbW9kZX1gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY2hlY2tpbl9tb2RlO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICAhdGhpcy5jaGVja2luX21vZGUgfHxcbiAgICAgICAgICAgIChjaGVja2luX21vZGUgPSB0aGlzLmNoZWNraW5fdmFsdWVzLmJ5X2tleVt0aGlzLmNoZWNraW5fbW9kZV0pID09PVxuICAgICAgICAgICAgICAgIHVuZGVmaW5lZFxuICAgICAgICApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNoZWNraW4gbW9kZSBpbXByb3Blcmx5IHNldFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKTtcbiAgICAgICAgY29uc3QgbmV3X2NoZWNraW5fdmFsdWUgPSBjaGVja2luX21vZGUuc2hlZXRzX3ZhbHVlO1xuICAgICAgICBhd2FpdCBsb2dpbl9zaGVldC5jaGVja2luKHRoaXMucGF0cm9sbGVyISwgbmV3X2NoZWNraW5fdmFsdWUpO1xuICAgICAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oYHVwZGF0ZS1zdGF0dXMoJHtuZXdfY2hlY2tpbl92YWx1ZX0pYCk7XG4gICAgICAgIGF3YWl0IHRoaXMubG9naW5fc2hlZXQ/LnJlZnJlc2goKTtcbiAgICAgICAgYXdhaXQgdGhpcy5nZXRfbWFwcGVkX3BhdHJvbGxlcih0cnVlKTtcblxuICAgICAgICBsZXQgcmVzcG9uc2UgPSBgVXBkYXRpbmcgJHtcbiAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyIS5uYW1lXG4gICAgICAgIH0gd2l0aCBzdGF0dXM6ICR7bmV3X2NoZWNraW5fdmFsdWV9LmA7XG4gICAgICAgIGlmICghdGhpcy5mYXN0X2NoZWNraW4pIHtcbiAgICAgICAgICAgIHJlc3BvbnNlICs9IGAgWW91IGNhbiBzZW5kICcke2NoZWNraW5fbW9kZS5mYXN0X2NoZWNraW5zWzBdfScgYXMgeW91ciBmaXJzdCBtZXNzYWdlIGZvciBhIGZhc3QgJHtjaGVja2luX21vZGUuc2hlZXRzX3ZhbHVlfSBjaGVja2luIG5leHQgdGltZS5gO1xuICAgICAgICB9XG4gICAgICAgIHJlc3BvbnNlICs9IFwiXFxuXFxuXCIgKyAoYXdhaXQgdGhpcy5nZXRfc3RhdHVzX3N0cmluZygpKTtcbiAgICAgICAgcmV0dXJuIHsgcmVzcG9uc2U6IHJlc3BvbnNlIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHRoZSBHb29nbGUgU2hlZXRzIG5lZWRzIHRvIGJlIHJlc2V0LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0cnVlIGlmIHRoZSBzaGVldCBuZWVkcyB0byBiZSByZXNldCwgb3RoZXJ3aXNlIGZhbHNlLlxuICAgICAqL1xuICAgIGFzeW5jIHNoZWV0X25lZWRzX3Jlc2V0KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG5cbiAgICAgICAgY29uc3Qgc2hlZXRfZGF0ZSA9IGxvZ2luX3NoZWV0LnNoZWV0X2RhdGU7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfZGF0ZSA9IGxvZ2luX3NoZWV0LmN1cnJlbnRfZGF0ZTtcbiAgICAgICAgY29uc29sZS5sb2coYHNoZWV0X2RhdGU6ICR7c2hlZXRfZGF0ZX1gKTtcbiAgICAgICAgY29uc29sZS5sb2coYGN1cnJlbnRfZGF0ZTogJHtjdXJyZW50X2RhdGV9YCk7XG5cbiAgICAgICAgY29uc29sZS5sb2coYGRhdGVfaXNfY3VycmVudDogJHtsb2dpbl9zaGVldC5pc19jdXJyZW50fWApO1xuXG4gICAgICAgIHJldHVybiAhbG9naW5fc2hlZXQuaXNfY3VycmVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXNldHMgdGhlIEdvb2dsZSBTaGVldHMgZmxvdywgaW5jbHVkaW5nIGFyY2hpdmluZyBhbmQgcmVzZXR0aW5nIHRoZSBzaGVldCBpZiBuZWNlc3NhcnkuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZSB8IHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBjaGVjay1pbiByZXNwb25zZSBvciB2b2lkLlxuICAgICAqL1xuICAgIGFzeW5jIHJlc2V0X3NoZWV0X2Zsb3coKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlIHwgdm9pZD4ge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuY2hlY2tfdXNlcl9jcmVkcyhcbiAgICAgICAgICAgIGAke1xuICAgICAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyIS5uYW1lXG4gICAgICAgICAgICB9LCBpbiBvcmRlciB0byByZXNldC9hcmNoaXZlLCBJIG5lZWQgeW91IHRvIGF1dGhvcml6ZSB0aGUgYXBwLmBcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHJlc3BvbnNlKVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogcmVzcG9uc2UucmVzcG9uc2UsXG4gICAgICAgICAgICAgICAgbmV4dF9zdGVwOiBgJHtORVhUX1NURVBTLkFVVEhfUkVTRVR9LSR7dGhpcy5jaGVja2luX21vZGV9YCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnJlc2V0X3NoZWV0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzZXRzIHRoZSBHb29nbGUgU2hlZXRzLCBpbmNsdWRpbmcgYXJjaGl2aW5nIGFuZCByZXNldHRpbmcgdGhlIHNoZWV0LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBzaGVldCBpcyByZXNldC5cbiAgICAgKi9cbiAgICBhc3luYyByZXNldF9zaGVldCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3Qgc2NyaXB0X3NlcnZpY2UgPSBhd2FpdCB0aGlzLmdldF91c2VyX3NjcmlwdHNfc2VydmljZSgpO1xuICAgICAgICBjb25zdCBzaG91bGRfcGVyZm9ybV9hcmNoaXZlID0gIShhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpKS5hcmNoaXZlZDtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IHNob3VsZF9wZXJmb3JtX2FyY2hpdmVcbiAgICAgICAgICAgID8gXCJPa2F5LiBBcmNoaXZpbmcgYW5kIHJlc2V0aW5nIHRoZSBjaGVjayBpbiBzaGVldC4gVGhpcyB0YWtlcyBhYm91dCAxMCBzZWNvbmRzLi4uXCJcbiAgICAgICAgICAgIDogXCJPa2F5LiBTaGVldCBoYXMgYWxyZWFkeSBiZWVuIGFyY2hpdmVkLiBQZXJmb3JtaW5nIHJlc2V0LiBUaGlzIHRha2VzIGFib3V0IDUgc2Vjb25kcy4uLlwiO1xuICAgICAgICBhd2FpdCB0aGlzLnNlbmRfbWVzc2FnZShtZXNzYWdlKTtcbiAgICAgICAgaWYgKHNob3VsZF9wZXJmb3JtX2FyY2hpdmUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQXJjaGl2aW5nLi4uXCIpO1xuXG4gICAgICAgICAgICBhd2FpdCBzY3JpcHRfc2VydmljZS5zY3JpcHRzLnJ1bih7XG4gICAgICAgICAgICAgICAgc2NyaXB0SWQ6IHRoaXMucmVzZXRfc2NyaXB0X2lkLFxuICAgICAgICAgICAgICAgIHJlcXVlc3RCb2R5OiB7IGZ1bmN0aW9uOiB0aGlzLmNvbmZpZy5BUkNISVZFX0ZVTkNUSU9OX05BTUUgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5kZWxheSg1KTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubG9nX2FjdGlvbihcImFyY2hpdmVcIik7XG4gICAgICAgICAgICB0aGlzLmxvZ2luX3NoZWV0ID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVzZXR0aW5nLi4uXCIpO1xuICAgICAgICBhd2FpdCBzY3JpcHRfc2VydmljZS5zY3JpcHRzLnJ1bih7XG4gICAgICAgICAgICBzY3JpcHRJZDogdGhpcy5yZXNldF9zY3JpcHRfaWQsXG4gICAgICAgICAgICByZXF1ZXN0Qm9keTogeyBmdW5jdGlvbjogdGhpcy5jb25maWcuUkVTRVRfRlVOQ1RJT05fTkFNRSB9LFxuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgdGhpcy5kZWxheSg1KTtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKFwicmVzZXRcIik7XG4gICAgICAgIGF3YWl0IHRoaXMuc2VuZF9tZXNzYWdlKFwiRG9uZS5cIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgR29vZ2xlIEFwcHMgU2NyaXB0IHNlcnZpY2UuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c2NyaXB0X3YxLlNjcmlwdD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIEdvb2dsZSBBcHBzIFNjcmlwdCBzZXJ2aWNlLlxuICAgICAqL1xuICAgIGFzeW5jIGNoZWNrX3VzZXJfY3JlZHMoXG4gICAgICAgIHByb21wdF9tZXNzYWdlOiBzdHJpbmcgPSBcIkhpLCBiZWZvcmUgeW91IGNhbiB1c2UgQlZOU1AgYm90LCB5b3UgbXVzdCBsb2dpbi5cIlxuICAgICk6IFByb21pc2U8QlZOU1BSZXNwb25zZSB8IHVuZGVmaW5lZD4ge1xuICAgICAgICBjb25zdCB1c2VyX2NyZWRzID0gdGhpcy5nZXRfdXNlcl9jcmVkcygpO1xuICAgICAgICBpZiAoIShhd2FpdCB1c2VyX2NyZWRzLmxvYWRUb2tlbigpKSkge1xuICAgICAgICAgICAgY29uc3QgYXV0aFVybCA9IGF3YWl0IHVzZXJfY3JlZHMuZ2V0QXV0aFVybCgpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYCR7cHJvbXB0X21lc3NhZ2V9IFBsZWFzZSBmb2xsb3cgdGhpcyBsaW5rOlxuJHthdXRoVXJsfVxuXG5NZXNzYWdlIG1lIGFnYWluIHdoZW4gZG9uZS5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIEdvb2dsZSBBcHBzIFNjcmlwdCBzZXJ2aWNlLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHNjcmlwdF92MS5TY3JpcHQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBHb29nbGUgQXBwcyBTY3JpcHQgc2VydmljZS5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfb25fZHV0eSgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zdCBjaGVja2VkX291dF9zZWN0aW9uID0gXCJDaGVja2VkIE91dFwiO1xuICAgICAgICBjb25zdCBsYXN0X3NlY3Rpb25zID0gW2NoZWNrZWRfb3V0X3NlY3Rpb25dO1xuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG5cbiAgICAgICAgY29uc3Qgb25fZHV0eV9wYXRyb2xsZXJzID0gbG9naW5fc2hlZXQuZ2V0X29uX2R1dHlfcGF0cm9sbGVycygpO1xuICAgICAgICBjb25zdCBieV9zZWN0aW9uID0gb25fZHV0eV9wYXRyb2xsZXJzXG4gICAgICAgICAgICAuZmlsdGVyKCh4KSA9PiB4LmNoZWNraW4pXG4gICAgICAgICAgICAucmVkdWNlKChwcmV2OiB7IFtrZXk6IHN0cmluZ106IFBhdHJvbGxlclJvd1tdIH0sIGN1cikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNob3J0X2NvZGUgPVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNraW5fdmFsdWVzLmJ5X3NoZWV0X3N0cmluZ1tjdXIuY2hlY2tpbl0ua2V5O1xuICAgICAgICAgICAgICAgIGxldCBzZWN0aW9uID0gY3VyLnNlY3Rpb247XG4gICAgICAgICAgICAgICAgaWYgKHNob3J0X2NvZGUgPT0gXCJvdXRcIikge1xuICAgICAgICAgICAgICAgICAgICBzZWN0aW9uID0gY2hlY2tlZF9vdXRfc2VjdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCEoc2VjdGlvbiBpbiBwcmV2KSkge1xuICAgICAgICAgICAgICAgICAgICBwcmV2W3NlY3Rpb25dID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHByZXZbc2VjdGlvbl0ucHVzaChjdXIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgICAgICAgfSwge30pO1xuICAgICAgICBsZXQgcmVzdWx0czogc3RyaW5nW11bXSA9IFtdO1xuICAgICAgICBsZXQgYWxsX2tleXMgPSBPYmplY3Qua2V5cyhieV9zZWN0aW9uKTtcbiAgICAgICAgY29uc3Qgb3JkZXJlZF9wcmltYXJ5X3NlY3Rpb25zID0gT2JqZWN0LmtleXMoYnlfc2VjdGlvbilcbiAgICAgICAgICAgIC5maWx0ZXIoKHgpID0+ICFsYXN0X3NlY3Rpb25zLmluY2x1ZGVzKHgpKVxuICAgICAgICAgICAgLnNvcnQoKTtcbiAgICAgICAgY29uc3QgZmlsdGVyZWRfbGFzdF9zZWN0aW9ucyA9IGxhc3Rfc2VjdGlvbnMuZmlsdGVyKCh4KSA9PlxuICAgICAgICAgICAgYWxsX2tleXMuaW5jbHVkZXMoeClcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3Qgb3JkZXJlZF9zZWN0aW9ucyA9IG9yZGVyZWRfcHJpbWFyeV9zZWN0aW9ucy5jb25jYXQoXG4gICAgICAgICAgICBmaWx0ZXJlZF9sYXN0X3NlY3Rpb25zXG4gICAgICAgICk7XG5cbiAgICAgICAgZm9yIChjb25zdCBzZWN0aW9uIG9mIG9yZGVyZWRfc2VjdGlvbnMpIHtcbiAgICAgICAgICAgIGxldCByZXN1bHQ6IHN0cmluZ1tdID0gW107XG4gICAgICAgICAgICBjb25zdCBwYXRyb2xsZXJzID0gYnlfc2VjdGlvbltzZWN0aW9uXS5zb3J0KCh4LCB5KSA9PlxuICAgICAgICAgICAgICAgIHgubmFtZS5sb2NhbGVDb21wYXJlKHkubmFtZSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoc2VjdGlvbi5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChcIlNlY3Rpb24gXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0LnB1c2goYCR7c2VjdGlvbn06IGApO1xuICAgICAgICAgICAgZnVuY3Rpb24gcGF0cm9sbGVyX3N0cmluZyhuYW1lOiBzdHJpbmcsIHNob3J0X2NvZGU6IHN0cmluZykge1xuICAgICAgICAgICAgICAgIGxldCBkZXRhaWxzID0gXCJcIjtcbiAgICAgICAgICAgICAgICBpZiAoc2hvcnRfY29kZSAhPT0gXCJkYXlcIiAmJiBzaG9ydF9jb2RlICE9PSBcIm91dFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGRldGFpbHMgPSBgICgke3Nob3J0X2NvZGUudG9VcHBlckNhc2UoKX0pYDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke25hbWV9JHtkZXRhaWxzfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQucHVzaChcbiAgICAgICAgICAgICAgICBwYXRyb2xsZXJzXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKHgpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRyb2xsZXJfc3RyaW5nKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHgubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNraW5fdmFsdWVzLmJ5X3NoZWV0X3N0cmluZ1t4LmNoZWNraW5dLmtleVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5qb2luKFwiLCBcIilcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oXCJvbi1kdXR5XCIpO1xuICAgICAgICByZXR1cm4gYFBhdHJvbGxlcnMgZm9yICR7bG9naW5fc2hlZXQuc2hlZXRfZGF0ZS50b0RhdGVTdHJpbmcoKX0gKFRvdGFsOiAke1xuICAgICAgICAgICAgb25fZHV0eV9wYXRyb2xsZXJzLmxlbmd0aFxuICAgICAgICB9KTpcXG4ke3Jlc3VsdHMubWFwKChyKSA9PiByLmpvaW4oXCJcIikpLmpvaW4oXCJcXG5cIil9YDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2dzIGFuIGFjdGlvbiB0byB0aGUgR29vZ2xlIFNoZWV0cy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYWN0aW9uX25hbWUgLSBUaGUgbmFtZSBvZiB0aGUgYWN0aW9uIHRvIGxvZy5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgYWN0aW9uIGlzIGxvZ2dlZC5cbiAgICAgKi9cbiAgICBhc3luYyBsb2dfYWN0aW9uKGFjdGlvbl9uYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3Qgc2hlZXRzX3NlcnZpY2UgPSBhd2FpdCB0aGlzLmdldF9zaGVldHNfc2VydmljZSgpO1xuICAgICAgICBhd2FpdCBzaGVldHNfc2VydmljZS5zcHJlYWRzaGVldHMudmFsdWVzLmFwcGVuZCh7XG4gICAgICAgICAgICBzcHJlYWRzaGVldElkOiB0aGlzLmNvbWJpbmVkX2NvbmZpZy5TSEVFVF9JRCxcbiAgICAgICAgICAgIHJhbmdlOiB0aGlzLmNvbmZpZy5BQ1RJT05fTE9HX1NIRUVULFxuICAgICAgICAgICAgdmFsdWVJbnB1dE9wdGlvbjogXCJVU0VSX0VOVEVSRURcIixcbiAgICAgICAgICAgIHJlcXVlc3RCb2R5OiB7XG4gICAgICAgICAgICAgICAgdmFsdWVzOiBbW3RoaXMucGF0cm9sbGVyIS5uYW1lLCBuZXcgRGF0ZSgpLCBhY3Rpb25fbmFtZV1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9ncyBvdXQgdGhlIHVzZXIuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QlZOU1BSZXNwb25zZT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGxvZ291dCByZXNwb25zZS5cbiAgICAgKi9cbiAgICBhc3luYyBsb2dvdXQoKTogUHJvbWlzZTxCVk5TUFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnN0IHVzZXJfY3JlZHMgPSB0aGlzLmdldF91c2VyX2NyZWRzKCk7XG4gICAgICAgIGF3YWl0IHVzZXJfY3JlZHMuZGVsZXRlVG9rZW4oKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3BvbnNlOiBcIk9rYXksIEkgaGF2ZSByZW1vdmVkIGFsbCBsb2dpbiBzZXNzaW9uIGluZm9ybWF0aW9uLlwiLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIFR3aWxpbyBjbGllbnQuXG4gICAgICogQHJldHVybnMge1R3aWxpb0NsaWVudH0gVGhlIFR3aWxpbyBjbGllbnQuXG4gICAgICovXG4gICAgZ2V0X3R3aWxpb19jbGllbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnR3aWxpb19jbGllbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHdpbGlvX2NsaWVudCB3YXMgbmV2ZXIgaW5pdGlhbGl6ZWQhXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnR3aWxpb19jbGllbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgVHdpbGlvIFN5bmMgY2xpZW50LlxuICAgICAqIEByZXR1cm5zIHtTZXJ2aWNlQ29udGV4dH0gVGhlIFR3aWxpbyBTeW5jIGNsaWVudC5cbiAgICAgKi9cbiAgICBnZXRfc3luY19jbGllbnQoKSB7XG4gICAgICAgIGlmICghdGhpcy5zeW5jX2NsaWVudCkge1xuICAgICAgICAgICAgdGhpcy5zeW5jX2NsaWVudCA9IHRoaXMuZ2V0X3R3aWxpb19jbGllbnQoKS5zeW5jLnNlcnZpY2VzKFxuICAgICAgICAgICAgICAgIHRoaXMuc3luY19zaWRcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc3luY19jbGllbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgdXNlciBjcmVkZW50aWFscy5cbiAgICAgKiBAcmV0dXJucyB7VXNlckNyZWRzfSBUaGUgdXNlciBjcmVkZW50aWFscy5cbiAgICAgKi9cbiAgICBnZXRfdXNlcl9jcmVkcygpIHtcbiAgICAgICAgaWYgKCF0aGlzLnVzZXJfY3JlZHMpIHtcbiAgICAgICAgICAgIHRoaXMudXNlcl9jcmVkcyA9IG5ldyBVc2VyQ3JlZHMoXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRfc3luY19jbGllbnQoKSxcbiAgICAgICAgICAgICAgICB0aGlzLmZyb20sXG4gICAgICAgICAgICAgICAgdGhpcy5jb21iaW5lZF9jb25maWdcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudXNlcl9jcmVkcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBzZXJ2aWNlIGNyZWRlbnRpYWxzLlxuICAgICAqIEByZXR1cm5zIHtHb29nbGVBdXRofSBUaGUgc2VydmljZSBjcmVkZW50aWFscy5cbiAgICAgKi9cbiAgICBnZXRfc2VydmljZV9jcmVkcygpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNlcnZpY2VfY3JlZHMpIHtcbiAgICAgICAgICAgIHRoaXMuc2VydmljZV9jcmVkcyA9IG5ldyBnb29nbGUuYXV0aC5Hb29nbGVBdXRoKHtcbiAgICAgICAgICAgICAgICBrZXlGaWxlOiBnZXRfc2VydmljZV9jcmVkZW50aWFsc19wYXRoKCksXG4gICAgICAgICAgICAgICAgc2NvcGVzOiB0aGlzLlNDT1BFUyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2VfY3JlZHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgdmFsaWQgY3JlZGVudGlhbHMuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbcmVxdWlyZV91c2VyX2NyZWRzPWZhbHNlXSAtIFdoZXRoZXIgdXNlciBjcmVkZW50aWFscyBhcmUgcmVxdWlyZWQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8R29vZ2xlQXV0aD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHZhbGlkIGNyZWRlbnRpYWxzLlxuICAgICAqL1xuICAgIGFzeW5jIGdldF92YWxpZF9jcmVkcyhyZXF1aXJlX3VzZXJfY3JlZHM6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBpZiAodGhpcy5jb25maWcuVVNFX1NFUlZJQ0VfQUNDT1VOVCAmJiAhcmVxdWlyZV91c2VyX2NyZWRzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRfc2VydmljZV9jcmVkcygpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVzZXJfY3JlZHMgPSB0aGlzLmdldF91c2VyX2NyZWRzKCk7XG4gICAgICAgIGlmICghKGF3YWl0IHVzZXJfY3JlZHMubG9hZFRva2VuKCkpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVc2VyIGlzIG5vdCBhdXRoZWQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVXNpbmcgdXNlciBhY2NvdW50IGZvciBzZXJ2aWNlIGF1dGguLi5cIik7XG4gICAgICAgIHJldHVybiB1c2VyX2NyZWRzLm9hdXRoMl9jbGllbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgR29vZ2xlIFNoZWV0cyBzZXJ2aWNlLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHNoZWV0c192NC5TaGVldHM+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBHb29nbGUgU2hlZXRzIHNlcnZpY2UuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3NoZWV0c19zZXJ2aWNlKCkge1xuICAgICAgICBpZiAoIXRoaXMuc2hlZXRzX3NlcnZpY2UpIHtcbiAgICAgICAgICAgIHRoaXMuc2hlZXRzX3NlcnZpY2UgPSBnb29nbGUuc2hlZXRzKHtcbiAgICAgICAgICAgICAgICB2ZXJzaW9uOiBcInY0XCIsXG4gICAgICAgICAgICAgICAgYXV0aDogYXdhaXQgdGhpcy5nZXRfdmFsaWRfY3JlZHMoKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNoZWV0c19zZXJ2aWNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGxvZ2luIHNoZWV0LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPExvZ2luU2hlZXQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBsb2dpbiBzaGVldFxuICAgICAqL1xuICAgIGFzeW5jIGdldF9sb2dpbl9zaGVldCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmxvZ2luX3NoZWV0KSB7XG4gICAgICAgICAgICBjb25zdCBsb2dpbl9zaGVldF9jb25maWc6IExvZ2luU2hlZXRDb25maWcgPSB0aGlzLmNvbWJpbmVkX2NvbmZpZztcbiAgICAgICAgICAgIGNvbnN0IHNoZWV0c19zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfc2hlZXRzX3NlcnZpY2UoKTtcbiAgICAgICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gbmV3IExvZ2luU2hlZXQoXG4gICAgICAgICAgICAgICAgc2hlZXRzX3NlcnZpY2UsXG4gICAgICAgICAgICAgICAgbG9naW5fc2hlZXRfY29uZmlnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYXdhaXQgbG9naW5fc2hlZXQucmVmcmVzaCgpO1xuICAgICAgICAgICAgdGhpcy5sb2dpbl9zaGVldCA9IGxvZ2luX3NoZWV0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmxvZ2luX3NoZWV0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHNlYXNvbiBzaGVldC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxTZWFzb25TaGVldD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHNlYXNvbiBzaGVldFxuICAgICAqL1xuICAgIGFzeW5jIGdldF9zZWFzb25fc2hlZXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5zZWFzb25fc2hlZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IHNlYXNvbl9zaGVldF9jb25maWc6IFNlYXNvblNoZWV0Q29uZmlnID0gdGhpcy5jb21iaW5lZF9jb25maWc7XG4gICAgICAgICAgICBjb25zdCBzaGVldHNfc2VydmljZSA9IGF3YWl0IHRoaXMuZ2V0X3NoZWV0c19zZXJ2aWNlKCk7XG4gICAgICAgICAgICBjb25zdCBzZWFzb25fc2hlZXQgPSBuZXcgU2Vhc29uU2hlZXQoXG4gICAgICAgICAgICAgICAgc2hlZXRzX3NlcnZpY2UsXG4gICAgICAgICAgICAgICAgc2Vhc29uX3NoZWV0X2NvbmZpZ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuc2Vhc29uX3NoZWV0ID0gc2Vhc29uX3NoZWV0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNlYXNvbl9zaGVldDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBjb21wIHBhc3Mgc2hlZXQuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8Q29tcFBhc3NTaGVldD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGNvbXAgcGFzcyBzaGVldFxuICAgICAqL1xuICAgIGFzeW5jIGdldF9jb21wX3Bhc3Nfc2hlZXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5jb21wX3Bhc3Nfc2hlZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpZzogQ29tcFBhc3Nlc0NvbmZpZyA9IHRoaXMuY29tYmluZWRfY29uZmlnO1xuICAgICAgICAgICAgY29uc3Qgc2hlZXRzX3NlcnZpY2UgPSBhd2FpdCB0aGlzLmdldF9zaGVldHNfc2VydmljZSgpO1xuICAgICAgICAgICAgY29uc3Qgc2Vhc29uX3NoZWV0ID0gbmV3IENvbXBQYXNzU2hlZXQoc2hlZXRzX3NlcnZpY2UsIGNvbmZpZyk7XG4gICAgICAgICAgICB0aGlzLmNvbXBfcGFzc19zaGVldCA9IHNlYXNvbl9zaGVldDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jb21wX3Bhc3Nfc2hlZXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbWFuYWdlciBwYXNzIHNoZWV0LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPE1hbmFnZXJQYXNzU2hlZXQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBtYW5hZ2VyIHBhc3Mgc2hlZXRcbiAgICAgKi9cbiAgICBhc3luYyBnZXRfbWFuYWdlcl9wYXNzX3NoZWV0KCkge1xuICAgICAgICBpZiAoIXRoaXMubWFuYWdlcl9wYXNzX3NoZWV0KSB7XG4gICAgICAgICAgICBjb25zdCBjb25maWc6IE1hbmFnZXJQYXNzZXNDb25maWcgPSB0aGlzLmNvbWJpbmVkX2NvbmZpZztcbiAgICAgICAgICAgIGNvbnN0IHNoZWV0c19zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfc2hlZXRzX3NlcnZpY2UoKTtcbiAgICAgICAgICAgIGNvbnN0IHNlYXNvbl9zaGVldCA9IG5ldyBNYW5hZ2VyUGFzc1NoZWV0KHNoZWV0c19zZXJ2aWNlLCBjb25maWcpO1xuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyX3Bhc3Nfc2hlZXQgPSBzZWFzb25fc2hlZXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubWFuYWdlcl9wYXNzX3NoZWV0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIEdvb2dsZSBBcHBzIFNjcmlwdCBzZXJ2aWNlLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHNjcmlwdF92MS5TY3JpcHQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBHb29nbGUgQXBwcyBTY3JpcHQgc2VydmljZS5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfdXNlcl9zY3JpcHRzX3NlcnZpY2UoKSB7XG4gICAgICAgIGlmICghdGhpcy51c2VyX3NjcmlwdHNfc2VydmljZSkge1xuICAgICAgICAgICAgdGhpcy51c2VyX3NjcmlwdHNfc2VydmljZSA9IGdvb2dsZS5zY3JpcHQoe1xuICAgICAgICAgICAgICAgIHZlcnNpb246IFwidjFcIixcbiAgICAgICAgICAgICAgICBhdXRoOiBhd2FpdCB0aGlzLmdldF92YWxpZF9jcmVkcyh0cnVlKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJfc2NyaXB0c19zZXJ2aWNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG1hcHBlZCBwYXRyb2xsZXIuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbZm9yY2U9ZmFsc2VdIC0gV2hldGhlciB0byBmb3JjZSB0aGUgcGF0cm9sbGVyIHRvIGJlIGZvdW5kLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJWTlNQUmVzcG9uc2UgfCB2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcmVzcG9uc2Ugb3Igdm9pZC5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRfbWFwcGVkX3BhdHJvbGxlcihmb3JjZTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IHBob25lX2xvb2t1cCA9IGF3YWl0IHRoaXMuZmluZF9wYXRyb2xsZXJfZnJvbV9udW1iZXIoKTtcbiAgICAgICAgaWYgKHBob25lX2xvb2t1cCA9PT0gdW5kZWZpbmVkIHx8IHBob25lX2xvb2t1cCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGZvcmNlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGZpbmQgYXNzb2NpYXRlZCB1c2VyXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYFNvcnJ5LCBJIGNvdWxkbid0IGZpbmQgYW4gYXNzb2NpYXRlZCBCVk5TUCBtZW1iZXIgd2l0aCB5b3VyIHBob25lIG51bWJlciAoJHt0aGlzLmZyb219KWAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuICAgICAgICBjb25zdCBtYXBwZWRQYXRyb2xsZXIgPSBsb2dpbl9zaGVldC50cnlfZmluZF9wYXRyb2xsZXIoXG4gICAgICAgICAgICBwaG9uZV9sb29rdXAubmFtZVxuICAgICAgICApO1xuICAgICAgICBpZiAobWFwcGVkUGF0cm9sbGVyID09PSBcIm5vdF9mb3VuZFwiKSB7XG4gICAgICAgICAgICBpZiAoZm9yY2UpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgcGF0cm9sbGVyIGluIGxvZ2luIHNoZWV0XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYENvdWxkIG5vdCBmaW5kIHBhdHJvbGxlciAnJHtwaG9uZV9sb29rdXAubmFtZX0nIGluIGxvZ2luIHNoZWV0LiBQbGVhc2UgbG9vayBhdCB0aGUgbG9naW4gc2hlZXQgbmFtZSwgYW5kIGNvcHkgaXQgdG8gdGhlIFBob25lIE51bWJlcnMgdGFiLmAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3VycmVudF9zaGVldF9kYXRlID0gbG9naW5fc2hlZXQuY3VycmVudF9kYXRlO1xuICAgICAgICB0aGlzLnBhdHJvbGxlciA9IG1hcHBlZFBhdHJvbGxlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaW5kcyB0aGUgcGF0cm9sbGVyIGZyb20gdGhlIHBob25lIG51bWJlci5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxQYXRyb2xsZXJSb3c+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBwYXRyb2xsZXIuXG4gICAgICovXG4gICAgYXN5bmMgZmluZF9wYXRyb2xsZXJfZnJvbV9udW1iZXIoKSB7XG4gICAgICAgIGNvbnN0IHJhd19udW1iZXIgPSB0aGlzLmZyb207XG4gICAgICAgIGNvbnN0IHNoZWV0c19zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfc2hlZXRzX3NlcnZpY2UoKTtcbiAgICAgICAgY29uc3Qgb3B0czogRmluZFBhdHJvbGxlckNvbmZpZyA9IHRoaXMuY29tYmluZWRfY29uZmlnO1xuICAgICAgICBjb25zdCBudW1iZXIgPSBzYW5pdGl6ZV9waG9uZV9udW1iZXIocmF3X251bWJlcik7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgc2hlZXRzX3NlcnZpY2Uuc3ByZWFkc2hlZXRzLnZhbHVlcy5nZXQoe1xuICAgICAgICAgICAgc3ByZWFkc2hlZXRJZDogb3B0cy5TSEVFVF9JRCxcbiAgICAgICAgICAgIHJhbmdlOiBvcHRzLlBIT05FX05VTUJFUl9MT09LVVBfU0hFRVQsXG4gICAgICAgICAgICB2YWx1ZVJlbmRlck9wdGlvbjogXCJVTkZPUk1BVFRFRF9WQUxVRVwiLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhLnZhbHVlcykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGZpbmQgcGF0cm9sbGVyLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwYXRyb2xsZXIgPSByZXNwb25zZS5kYXRhLnZhbHVlc1xuICAgICAgICAgICAgLm1hcCgocm93KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmF3TnVtYmVyID1cbiAgICAgICAgICAgICAgICAgICAgcm93W2V4Y2VsX3Jvd190b19pbmRleChvcHRzLlBIT05FX05VTUJFUl9OVU1CRVJfQ09MVU1OKV07XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudE51bWJlciA9XG4gICAgICAgICAgICAgICAgICAgIHJhd051bWJlciAhPSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgICAgID8gc2FuaXRpemVfcGhvbmVfbnVtYmVyKHJhd051bWJlcilcbiAgICAgICAgICAgICAgICAgICAgICAgIDogcmF3TnVtYmVyO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnROYW1lID1cbiAgICAgICAgICAgICAgICAgICAgcm93W2V4Y2VsX3Jvd190b19pbmRleChvcHRzLlBIT05FX05VTUJFUl9OQU1FX0NPTFVNTildO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IG5hbWU6IGN1cnJlbnROYW1lLCBudW1iZXI6IGN1cnJlbnROdW1iZXIgfTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZmlsdGVyKChwYXRyb2xsZXIpID0+IHBhdHJvbGxlci5udW1iZXIgPT09IG51bWJlcilbMF07XG4gICAgICAgIHJldHVybiBwYXRyb2xsZXI7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgc2hlZXRzX3Y0IH0gZnJvbSBcImdvb2dsZWFwaXNcIjtcbmltcG9ydCB7IENvbXBQYXNzZXNDb25maWcsIE1hbmFnZXJQYXNzZXNDb25maWcgfSBmcm9tIFwiLi4vZW52L2hhbmRsZXJfY29uZmlnXCI7XG5pbXBvcnQgeyBleGNlbF9yb3dfdG9faW5kZXgsIHJvd19jb2xfdG9fZXhjZWxfaW5kZXggfSBmcm9tIFwiLi4vdXRpbHMvdXRpbFwiO1xuaW1wb3J0IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiIGZyb20gXCIuLi91dGlscy9nb29nbGVfc2hlZXRzX3NwcmVhZHNoZWV0X3RhYlwiO1xuaW1wb3J0IHsgZm9ybWF0X2RhdGVfZm9yX3NwcmVhZHNoZWV0X3ZhbHVlIH0gZnJvbSBcIi4uL3V0aWxzL2RhdGV0aW1lX3V0aWxcIjtcbmltcG9ydCB7XG4gICAgYnVpbGRfcGFzc2VzX3N0cmluZyxcbiAgICBDb21wUGFzc1R5cGUsXG4gICAgZ2V0X2NvbXBfcGFzc19kZXNjcmlwdGlvbixcbn0gZnJvbSBcIi4uL3V0aWxzL2NvbXBfcGFzc2VzXCI7XG5pbXBvcnQgeyBCVk5TUFJlc3BvbnNlIH0gZnJvbSBcIi4uL2hhbmRsZXJzL2J2bnNwX2hhbmRsZXJcIjtcblxuZXhwb3J0IGNsYXNzIFVzZWRBbmRBdmFpbGFibGVQYXNzZXMge1xuICAgIHJvdzogYW55W107XG4gICAgaW5kZXg6IG51bWJlcjtcbiAgICBhdmFpbGFibGU6IG51bWJlcjtcbiAgICB1c2VkX3RvZGF5OiBudW1iZXI7XG4gICAgdXNlZF9zZWFzb246IG51bWJlcjtcbiAgICBjb21wX3Bhc3NfdHlwZTogQ29tcFBhc3NUeXBlO1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICByb3c6IGFueVtdLFxuICAgICAgICBpbmRleDogbnVtYmVyLFxuICAgICAgICBhdmFpbGFibGU6IGFueSxcbiAgICAgICAgdXNlZF90b2RheTogYW55LFxuICAgICAgICB1c2VkX3NlYXNvbjogYW55LFxuICAgICAgICB0eXBlOiBDb21wUGFzc1R5cGVcbiAgICApIHtcbiAgICAgICAgdGhpcy5yb3cgPSByb3c7XG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5hdmFpbGFibGUgPSBOdW1iZXIoYXZhaWxhYmxlKTtcbiAgICAgICAgdGhpcy51c2VkX3RvZGF5ID0gTnVtYmVyKHVzZWRfdG9kYXkpO1xuICAgICAgICB0aGlzLnVzZWRfc2Vhc29uID0gTnVtYmVyKHVzZWRfc2Vhc29uKTtcbiAgICAgICAgdGhpcy5jb21wX3Bhc3NfdHlwZSA9IHR5cGU7XG4gICAgfVxuXG4gICAgZ2V0X3Byb21wdCgpOiBCVk5TUFJlc3BvbnNlIHtcbiAgICAgICAgaWYgKHRoaXMuYXZhaWxhYmxlID4gMCkge1xuICAgICAgICAgICAgbGV0IHJlc3BvbnNlOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgICAgICAgICAgIGxldCBwYXNzX3N0cmluZzogc3RyaW5nID0gZ2V0X2NvbXBfcGFzc19kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBfcGFzc190eXBlXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICByZXNwb25zZSA9IGJ1aWxkX3Bhc3Nlc19zdHJpbmcoXG4gICAgICAgICAgICAgICAgdGhpcy51c2VkX3NlYXNvbixcbiAgICAgICAgICAgICAgICB0aGlzLmF2YWlsYWJsZSArIHRoaXMudXNlZF9zZWFzb24sXG4gICAgICAgICAgICAgICAgdGhpcy51c2VkX3RvZGF5LFxuICAgICAgICAgICAgICAgIGAke3Bhc3Nfc3RyaW5nfWVzYCxcbiAgICAgICAgICAgICAgICB0cnVlXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmVzcG9uc2UgKz1cbiAgICAgICAgICAgICAgICBcIlxcblxcblwiICtcbiAgICAgICAgICAgICAgICBgRW50ZXIgdGhlIGZpcnN0IGFuZCBsYXN0IG5hbWUgb2YgdGhlIGd1ZXN0IHRoYXQgd2lsbCB1c2UgYSAke3Bhc3Nfc3RyaW5nfSB0b2RheSAob3IgJ3Jlc3RhcnQnKTpgO1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICByZXNwb25zZTogcmVzcG9uc2UsXG4gICAgICAgICAgICAgICAgICAgIG5leHRfc3RlcDogYGF3YWl0LXBhc3MtJHt0aGlzLmNvbXBfcGFzc190eXBlfWAsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IGBZb3UgZG8gbm90IGhhdmUgYW55ICR7Z2V0X2NvbXBfcGFzc19kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBfcGFzc190eXBlXG4gICAgICAgICAgICApfSBhdmFpbGFibGUgdG9kYXlgLFxuICAgICAgICB9O1xuICAgIH1cbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBhc3NTaGVldCB7XG4gICAgc2hlZXQ6IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiO1xuICAgIGNvbXBfcGFzc190eXBlOiBDb21wUGFzc1R5cGU7XG4gICAgY29uc3RydWN0b3Ioc2hlZXQ6IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiLCB0eXBlOiBDb21wUGFzc1R5cGUpIHtcbiAgICAgICAgdGhpcy5zaGVldCA9IHNoZWV0O1xuICAgICAgICB0aGlzLmNvbXBfcGFzc190eXBlID0gdHlwZTtcbiAgICB9XG5cbiAgICBhYnN0cmFjdCBnZXQgYXZhaWxhYmxlX2NvbHVtbigpOiBzdHJpbmc7XG4gICAgYWJzdHJhY3QgZ2V0IHVzZWRfdG9kYXlfY29sdW1uKCk6IHN0cmluZztcbiAgICBhYnN0cmFjdCBnZXQgdXNlZF9zZWFzb25fY29sdW1uKCk6IHN0cmluZztcbiAgICBhYnN0cmFjdCBnZXQgbmFtZV9jb2x1bW4oKTogc3RyaW5nO1xuICAgIGFic3RyYWN0IGdldCBzdGFydF9pbmRleCgpOiBudW1iZXI7XG4gICAgYWJzdHJhY3QgZ2V0IHNoZWV0X25hbWUoKTogc3RyaW5nO1xuXG4gICAgYXN5bmMgZ2V0X2F2YWlsYWJsZV9hbmRfdXNlZF9wYXNzZXMoXG4gICAgICAgIHBhdHJvbGxlcl9uYW1lOiBzdHJpbmdcbiAgICApOiBQcm9taXNlPFVzZWRBbmRBdmFpbGFibGVQYXNzZXMgfCBudWxsPiB7XG4gICAgICAgIGNvbnN0IHBhdHJvbGxlcl9yb3cgPSBhd2FpdCB0aGlzLnNoZWV0LmdldF9zaGVldF9yb3dfZm9yX3BhdHJvbGxlcihcbiAgICAgICAgICAgIHBhdHJvbGxlcl9uYW1lLFxuICAgICAgICAgICAgdGhpcy5uYW1lX2NvbHVtblxuICAgICAgICApO1xuICAgICAgICBpZiAocGF0cm9sbGVyX3JvdyA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjdXJyZW50X2RheV9hdmFpbGFibGVfcGFzc2VzID1cbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cucm93W2V4Y2VsX3Jvd190b19pbmRleCh0aGlzLmF2YWlsYWJsZV9jb2x1bW4pXTtcbiAgICAgICAgY29uc3QgY3VycmVudF9kYXlfdXNlZF9wYXNzZXMgPVxuICAgICAgICAgICAgcGF0cm9sbGVyX3Jvdy5yb3dbZXhjZWxfcm93X3RvX2luZGV4KHRoaXMudXNlZF90b2RheV9jb2x1bW4pXTtcbiAgICAgICAgY29uc3QgY3VycmVudF9zZWFzb25fdXNlZF9wYXNzZXMgPVxuICAgICAgICAgICAgcGF0cm9sbGVyX3Jvdy5yb3dbZXhjZWxfcm93X3RvX2luZGV4KHRoaXMudXNlZF9zZWFzb25fY29sdW1uKV07XG4gICAgICAgIHJldHVybiBuZXcgVXNlZEFuZEF2YWlsYWJsZVBhc3NlcyhcbiAgICAgICAgICAgIHBhdHJvbGxlcl9yb3cucm93LFxuICAgICAgICAgICAgcGF0cm9sbGVyX3Jvdy5pbmRleCxcbiAgICAgICAgICAgIGN1cnJlbnRfZGF5X2F2YWlsYWJsZV9wYXNzZXMsXG4gICAgICAgICAgICBjdXJyZW50X2RheV91c2VkX3Bhc3NlcyxcbiAgICAgICAgICAgIGN1cnJlbnRfc2Vhc29uX3VzZWRfcGFzc2VzLFxuICAgICAgICAgICAgdGhpcy5jb21wX3Bhc3NfdHlwZVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGFzeW5jIHNldF91c2VkX2NvbXBfcGFzc2VzKFxuICAgICAgICBwYXRyb2xsZXJfcm93OiBVc2VkQW5kQXZhaWxhYmxlUGFzc2VzLFxuICAgICAgICBndWVzdF9uYW1lOiBzdHJpbmdcbiAgICApIHtcbiAgICAgICAgaWYgKHBhdHJvbGxlcl9yb3cuYXZhaWxhYmxlIDwgMSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgIGBOb3QgZW5vdWdoIGF2YWlsYWJsZSBwYXNzZXM6IEF2YWlsYWJsZTogJHtwYXRyb2xsZXJfcm93LmF2YWlsYWJsZX0sIFVzZWQgdGhpcyBzZWFzb246ICAke3BhdHJvbGxlcl9yb3cudXNlZF9zZWFzb259LCBVc2VkIHRvZGF5OiAke3BhdHJvbGxlcl9yb3cudXNlZF90b2RheX1gXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJvd251bSA9IHBhdHJvbGxlcl9yb3cuaW5kZXg7XG5cbiAgICAgICAgY29uc3Qgc3RhcnRfaW5kZXggPSB0aGlzLnN0YXJ0X2luZGV4O1xuICAgICAgICBjb25zdCBwcmlvcl9sZW5ndGggPSBwYXRyb2xsZXJfcm93LnJvdy5sZW5ndGggLSBzdGFydF9pbmRleDtcblxuICAgICAgICBjb25zdCBjdXJyZW50X2RhdGVfc3RyaW5nID0gZm9ybWF0X2RhdGVfZm9yX3NwcmVhZHNoZWV0X3ZhbHVlKFxuICAgICAgICAgICAgbmV3IERhdGUoKVxuICAgICAgICApO1xuICAgICAgICBsZXQgbmV3X3ZhbHMgPSBwYXRyb2xsZXJfcm93LnJvd1xuICAgICAgICAgICAgLnNsaWNlKHN0YXJ0X2luZGV4KVxuICAgICAgICAgICAgLm1hcCgoeCkgPT4geD8udG9TdHJpbmcoKSk7XG5cbiAgICAgICAgLy8gQWRkIHRoZSBjdXJyZW50IGRhdGUgYXBwZW5kZWQgd2l0aCB0aGUgbmV3IGd1ZXN0IG5hbWVcbiAgICAgICAgbmV3X3ZhbHMucHVzaChjdXJyZW50X2RhdGVfc3RyaW5nICsgXCIsXCIgKyBndWVzdF9uYW1lKTtcblxuICAgICAgICBjb25zdCB1cGRhdGVfbGVuZ3RoID0gTWF0aC5tYXgocHJpb3JfbGVuZ3RoLCBuZXdfdmFscy5sZW5ndGgpO1xuICAgICAgICB3aGlsZSAobmV3X3ZhbHMubGVuZ3RoIDwgdXBkYXRlX2xlbmd0aCkge1xuICAgICAgICAgICAgbmV3X3ZhbHMucHVzaChcIlwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBlbmRfaW5kZXggPSBzdGFydF9pbmRleCArIHVwZGF0ZV9sZW5ndGggLSAxO1xuXG4gICAgICAgIGNvbnN0IHJhbmdlID0gYCR7dGhpcy5zaGVldC5zaGVldF9uYW1lfSEke3Jvd19jb2xfdG9fZXhjZWxfaW5kZXgoXG4gICAgICAgICAgICByb3dudW0sXG4gICAgICAgICAgICBzdGFydF9pbmRleFxuICAgICAgICApfToke3Jvd19jb2xfdG9fZXhjZWxfaW5kZXgocm93bnVtLCBlbmRfaW5kZXgpfWA7XG4gICAgICAgIGNvbnNvbGUubG9nKGBVcGRhdGluZyAke3JhbmdlfSB3aXRoICR7bmV3X3ZhbHMubGVuZ3RofSB2YWx1ZXNgKTtcbiAgICAgICAgYXdhaXQgdGhpcy5zaGVldC51cGRhdGVfdmFsdWVzKHJhbmdlLCBbbmV3X3ZhbHNdKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb21wUGFzc1NoZWV0IGV4dGVuZHMgUGFzc1NoZWV0IHtcbiAgICBjb25maWc6IENvbXBQYXNzZXNDb25maWc7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzIHwgbnVsbCxcbiAgICAgICAgY29uZmlnOiBDb21wUGFzc2VzQ29uZmlnXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgbmV3IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiKFxuICAgICAgICAgICAgICAgIHNoZWV0c19zZXJ2aWNlLFxuICAgICAgICAgICAgICAgIGNvbmZpZy5TSEVFVF9JRCxcbiAgICAgICAgICAgICAgICBjb25maWcuQ09NUF9QQVNTX1NIRUVUXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgQ29tcFBhc3NUeXBlLkNvbXBQYXNzXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgIH1cblxuICAgIGdldCBzdGFydF9pbmRleCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gZXhjZWxfcm93X3RvX2luZGV4KFxuICAgICAgICAgICAgdGhpcy5jb25maWcuQ09NUF9QQVNTX1NIRUVUX0RBVEVTX1NUQVJUSU5HX0NPTFVNTlxuICAgICAgICApO1xuICAgIH1cbiAgICBnZXQgc2hlZXRfbmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuQ09NUF9QQVNTX1NIRUVUO1xuICAgIH1cbiAgICBnZXQgYXZhaWxhYmxlX2NvbHVtbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuQ09NUF9QQVNTX1NIRUVUX0RBVEVTX0FWQUlMQUJMRV9DT0xVTU47XG4gICAgfVxuICAgIGdldCB1c2VkX3RvZGF5X2NvbHVtbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuQ09NUF9QQVNTX1NIRUVUX1VTRURfVE9EQVlfQ09MVU1OO1xuICAgIH1cbiAgICBnZXQgdXNlZF9zZWFzb25fY29sdW1uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5DT01QX1BBU1NfU0hFRVRfVVNFRF9TRUFTT05fQ09MVU1OO1xuICAgIH1cbiAgICBnZXQgbmFtZV9jb2x1bW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLkNPTVBfUEFTU19TSEVFVF9OQU1FX0NPTFVNTjtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNYW5hZ2VyUGFzc1NoZWV0IGV4dGVuZHMgUGFzc1NoZWV0IHtcbiAgICBjb25maWc6IE1hbmFnZXJQYXNzZXNDb25maWc7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzIHwgbnVsbCxcbiAgICAgICAgY29uZmlnOiBNYW5hZ2VyUGFzc2VzQ29uZmlnXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgbmV3IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiKFxuICAgICAgICAgICAgICAgIHNoZWV0c19zZXJ2aWNlLFxuICAgICAgICAgICAgICAgIGNvbmZpZy5TSEVFVF9JRCxcbiAgICAgICAgICAgICAgICBjb25maWcuTUFOQUdFUl9QQVNTX1NIRUVUXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgQ29tcFBhc3NUeXBlLk1hbmFnZXJQYXNzXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgIH1cblxuICAgIGdldCBzdGFydF9pbmRleCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gZXhjZWxfcm93X3RvX2luZGV4KFxuICAgICAgICAgICAgdGhpcy5jb25maWcuTUFOQUdFUl9QQVNTX1NIRUVUX0RBVEVTX1NUQVJUSU5HX0NPTFVNTlxuICAgICAgICApO1xuICAgIH1cbiAgICBnZXQgc2hlZXRfbmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuTUFOQUdFUl9QQVNTX1NIRUVUO1xuICAgIH1cbiAgICBnZXQgYXZhaWxhYmxlX2NvbHVtbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuTUFOQUdFUl9QQVNTX1NIRUVUX0FWQUlMQUJMRV9DT0xVTU47XG4gICAgfVxuICAgIGdldCB1c2VkX3RvZGF5X2NvbHVtbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuTUFOQUdFUl9QQVNTX1NIRUVUX1VTRURfVE9EQVlfQ09MVU1OO1xuICAgIH1cbiAgICBnZXQgdXNlZF9zZWFzb25fY29sdW1uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5NQU5BR0VSX1BBU1NfU0hFRVRfVVNFRF9TRUFTT05fQ09MVU1OO1xuICAgIH1cbiAgICBnZXQgbmFtZV9jb2x1bW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLk1BTkFHRVJfUEFTU19TSEVFVF9OQU1FX0NPTFVNTjtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBsb29rdXBfcm93X2NvbF9pbl9zaGVldCwgZXhjZWxfcm93X3RvX2luZGV4IH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxcIjtcbmltcG9ydCBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYiBmcm9tIFwiLi4vdXRpbHMvZ29vZ2xlX3NoZWV0c19zcHJlYWRzaGVldF90YWJcIjtcbmltcG9ydCB7IHNhbml0aXplX2RhdGUgfSBmcm9tIFwiLi4vdXRpbHMvZGF0ZXRpbWVfdXRpbFwiO1xuaW1wb3J0IHsgTG9naW5TaGVldENvbmZpZywgUGF0cm9sbGVyUm93Q29uZmlnIH0gZnJvbSBcIi4uL2Vudi9oYW5kbGVyX2NvbmZpZ1wiO1xuaW1wb3J0IHsgc2hlZXRzX3Y0IH0gZnJvbSBcImdvb2dsZWFwaXNcIjtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcm93IG9mIHBhdHJvbGxlciBkYXRhLlxuICogQHR5cGVkZWYge09iamVjdH0gUGF0cm9sbGVyUm93XG4gKiBAcHJvcGVydHkge251bWJlcn0gaW5kZXggLSBUaGUgaW5kZXggb2YgdGhlIHJvdy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHBhdHJvbGxlci5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBjYXRlZ29yeSAtIFRoZSBjYXRlZ29yeSBvZiB0aGUgcGF0cm9sbGVyLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IHNlY3Rpb24gLSBUaGUgc2VjdGlvbiBvZiB0aGUgcGF0cm9sbGVyLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IGNoZWNraW4gLSBUaGUgY2hlY2staW4gc3RhdHVzIG9mIHRoZSBwYXRyb2xsZXIuXG4gKi9cbmV4cG9ydCB0eXBlIFBhdHJvbGxlclJvdyA9IHtcbiAgICBpbmRleDogbnVtYmVyO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBjYXRlZ29yeTogc3RyaW5nO1xuICAgIHNlY3Rpb246IHN0cmluZztcbiAgICBjaGVja2luOiBzdHJpbmc7XG59O1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhIGxvZ2luIHNoZWV0IGluIEdvb2dsZSBTaGVldHMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ2luU2hlZXQge1xuICAgIGxvZ2luX3NoZWV0OiBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYjtcbiAgICBjaGVja2luX2NvdW50X3NoZWV0OiBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYjtcbiAgICBjb25maWc6IExvZ2luU2hlZXRDb25maWc7XG4gICAgcm93cz86IGFueVtdW10gfCBudWxsID0gbnVsbDtcbiAgICBjaGVja2luX2NvdW50OiBudW1iZXIgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gICAgcGF0cm9sbGVyczogUGF0cm9sbGVyUm93W10gPSBbXTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgTG9naW5TaGVldC5cbiAgICAgKiBAcGFyYW0ge3NoZWV0c192NC5TaGVldHMgfCBudWxsfSBzaGVldHNfc2VydmljZSAtIFRoZSBHb29nbGUgU2hlZXRzIEFQSSBzZXJ2aWNlLlxuICAgICAqIEBwYXJhbSB7TG9naW5TaGVldENvbmZpZ30gY29uZmlnIC0gVGhlIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBsb2dpbiBzaGVldC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgc2hlZXRzX3NlcnZpY2U6IHNoZWV0c192NC5TaGVldHMgfCBudWxsLFxuICAgICAgICBjb25maWc6IExvZ2luU2hlZXRDb25maWdcbiAgICApIHtcbiAgICAgICAgdGhpcy5sb2dpbl9zaGVldCA9IG5ldyBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYihcbiAgICAgICAgICAgIHNoZWV0c19zZXJ2aWNlLFxuICAgICAgICAgICAgY29uZmlnLlNIRUVUX0lELFxuICAgICAgICAgICAgY29uZmlnLkxPR0lOX1NIRUVUX0xPT0tVUFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmNoZWNraW5fY291bnRfc2hlZXQgPSBuZXcgR29vZ2xlU2hlZXRzU3ByZWFkc2hlZXRUYWIoXG4gICAgICAgICAgICBzaGVldHNfc2VydmljZSxcbiAgICAgICAgICAgIGNvbmZpZy5TSEVFVF9JRCxcbiAgICAgICAgICAgIGNvbmZpZy5DSEVDS0lOX0NPVU5UX0xPT0tVUFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWZyZXNoZXMgdGhlIGRhdGEgZnJvbSB0aGUgR29vZ2xlIFNoZWV0cy5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICAgKi9cbiAgICBhc3luYyByZWZyZXNoKCkge1xuICAgICAgICB0aGlzLnJvd3MgPSBhd2FpdCB0aGlzLmxvZ2luX3NoZWV0LmdldF92YWx1ZXMoXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5MT0dJTl9TSEVFVF9MT09LVVBcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jaGVja2luX2NvdW50ID0gKGF3YWl0IHRoaXMuY2hlY2tpbl9jb3VudF9zaGVldC5nZXRfdmFsdWVzKFxuICAgICAgICAgICAgdGhpcy5jb25maWcuQ0hFQ0tJTl9DT1VOVF9MT09LVVBcbiAgICAgICAgKSkhWzBdWzBdO1xuICAgICAgICB0aGlzLnBhdHJvbGxlcnMgPSB0aGlzLnJvd3MhLm1hcCgoeCwgaSkgPT5cbiAgICAgICAgICAgIHRoaXMucGFyc2VfcGF0cm9sbGVyX3JvdyhpLCB4LCB0aGlzLmNvbmZpZylcbiAgICAgICAgKS5maWx0ZXIoKHgpID0+IHggIT0gbnVsbCkgYXMgUGF0cm9sbGVyUm93W107XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJSZWZyZXNoaW5nIFBhdHJvbGxlcnM6IFwiICk7XG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5wYXRyb2xsZXJzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBhcmNoaXZlZCBzdGF0dXMgb2YgdGhlIGxvZ2luIHNoZWV0LlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzaGVldCBpcyBhcmNoaXZlZCwgb3RoZXJ3aXNlIGZhbHNlLlxuICAgICAqL1xuICAgIGdldCBhcmNoaXZlZCgpIHtcbiAgICAgICAgY29uc3QgYXJjaGl2ZWQgPSBsb29rdXBfcm93X2NvbF9pbl9zaGVldChcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLkFSQ0hJVkVEX0NFTEwsXG4gICAgICAgICAgICB0aGlzLnJvd3MhXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAoYXJjaGl2ZWQgPT09IHVuZGVmaW5lZCAmJiB0aGlzLmNoZWNraW5fY291bnQgPT09IDApIHx8XG4gICAgICAgICAgICBhcmNoaXZlZC50b0xvd2VyQ2FzZSgpID09PSBcInllc1wiXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgZGF0ZSBvZiB0aGUgc2hlZXQuXG4gICAgICogQHJldHVybnMge0RhdGV9IFRoZSBkYXRlIG9mIHRoZSBzaGVldC5cbiAgICAgKi9cbiAgICBnZXQgc2hlZXRfZGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHNhbml0aXplX2RhdGUoXG4gICAgICAgICAgICBsb29rdXBfcm93X2NvbF9pbl9zaGVldCh0aGlzLmNvbmZpZy5TSEVFVF9EQVRFX0NFTEwsIHRoaXMucm93cyEpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgY3VycmVudCBkYXRlLlxuICAgICAqIEByZXR1cm5zIHtEYXRlfSBUaGUgY3VycmVudCBkYXRlLlxuICAgICAqL1xuICAgIGdldCBjdXJyZW50X2RhdGUoKSB7XG4gICAgICAgIHJldHVybiBzYW5pdGl6ZV9kYXRlKFxuICAgICAgICAgICAgbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQodGhpcy5jb25maWcuQ1VSUkVOVF9EQVRFX0NFTEwsIHRoaXMucm93cyEpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHRoZSBzaGVldCBkYXRlIGlzIHRoZSBjdXJyZW50IGRhdGUuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNoZWV0IGRhdGUgaXMgdGhlIGN1cnJlbnQgZGF0ZSwgb3RoZXJ3aXNlIGZhbHNlLlxuICAgICAqL1xuICAgIGdldCBpc19jdXJyZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zaGVldF9kYXRlLmdldFRpbWUoKSA9PT0gdGhpcy5jdXJyZW50X2RhdGUuZ2V0VGltZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWVzIHRvIGZpbmQgYSBwYXRyb2xsZXIgYnkgbmFtZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwYXRyb2xsZXIuXG4gICAgICogQHJldHVybnMge1BhdHJvbGxlclJvdyB8IFwibm90X2ZvdW5kXCJ9IFRoZSBwYXRyb2xsZXIgcm93IG9yIFwibm90X2ZvdW5kXCIuXG4gICAgICovXG4gICAgdHJ5X2ZpbmRfcGF0cm9sbGVyKG5hbWU6IHN0cmluZykge1xuICAgICAgICBjb25zdCBwYXRyb2xsZXJzID0gdGhpcy5wYXRyb2xsZXJzLmZpbHRlcigoeCkgPT4geC5uYW1lID09PSBuYW1lKTtcbiAgICAgICAgaWYgKHBhdHJvbGxlcnMubGVuZ3RoICE9PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJub3RfZm91bmRcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGF0cm9sbGVyc1swXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaW5kcyBhIHBhdHJvbGxlciBieSBuYW1lLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHBhdHJvbGxlci5cbiAgICAgKiBAcmV0dXJucyB7UGF0cm9sbGVyUm93fSBUaGUgcGF0cm9sbGVyIHJvdy5cbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBhdHJvbGxlciBpcyBub3QgZm91bmQuXG4gICAgICovXG4gICAgZmluZF9wYXRyb2xsZXIobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMudHJ5X2ZpbmRfcGF0cm9sbGVyKG5hbWUpO1xuICAgICAgICBpZiAocmVzdWx0ID09PSBcIm5vdF9mb3VuZFwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBmaW5kICR7bmFtZX0gaW4gbG9naW4gc2hlZXRgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHBhdHJvbGxlcnMgd2hvIGFyZSBvbiBkdXR5LlxuICAgICAqIEByZXR1cm5zIHtQYXRyb2xsZXJSb3dbXX0gVGhlIGxpc3Qgb2Ygb24tZHV0eSBwYXRyb2xsZXJzLlxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgbG9naW4gc2hlZXQgaXMgbm90IGN1cnJlbnQuXG4gICAgICovXG4gICAgZ2V0X29uX2R1dHlfcGF0cm9sbGVycygpOiBQYXRyb2xsZXJSb3dbXSB7XG4gICAgICAgIGlmICghdGhpcy5pc19jdXJyZW50KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJMb2dpbiBzaGVldCBpcyBub3QgY3VycmVudFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wYXRyb2xsZXJzLmZpbHRlcigoeCkgPT4geC5jaGVja2luKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaW4gYSBwYXRyb2xsZXIgd2l0aCBhIG5ldyBjaGVjay1pbiB2YWx1ZS5cbiAgICAgKiBAcGFyYW0ge1BhdHJvbGxlclJvd30gcGF0cm9sbGVyX3N0YXR1cyAtIFRoZSBzdGF0dXMgb2YgdGhlIHBhdHJvbGxlci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmV3X2NoZWNraW5fdmFsdWUgLSBUaGUgbmV3IGNoZWNrLWluIHZhbHVlLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgbG9naW4gc2hlZXQgaXMgbm90IGN1cnJlbnQuXG4gICAgICovXG4gICAgYXN5bmMgY2hlY2tpbihwYXRyb2xsZXJfc3RhdHVzOiBQYXRyb2xsZXJSb3csIG5ld19jaGVja2luX3ZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzX2N1cnJlbnQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxvZ2luIHNoZWV0IGlzIG5vdCBjdXJyZW50XCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGBFeGlzdGluZyBzdGF0dXM6ICR7SlNPTi5zdHJpbmdpZnkocGF0cm9sbGVyX3N0YXR1cyl9YCk7XG5cbiAgICAgICAgY29uc3Qgcm93ID0gcGF0cm9sbGVyX3N0YXR1cy5pbmRleCArIDE7IC8vIHByb2dyYW1taW5nIC0+IGV4Y2VsIGxvb2t1cFxuICAgICAgICBjb25zdCByYW5nZSA9IGAke3RoaXMuY29uZmlnLkNIRUNLSU5fRFJPUERPV05fQ09MVU1OfSR7cm93fWA7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5sb2dpbl9zaGVldC51cGRhdGVfdmFsdWVzKHJhbmdlLCBbW25ld19jaGVja2luX3ZhbHVlXV0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogQXNzaWducyBhIHNlY3Rpb24gdG8gYSBwYXRyb2xsZXIuXG4gICAgKiBAcGFyYW0ge1BhdHJvbGxlclJvd30gcGF0cm9sbGVyIC0gVGhlIHBhdHJvbGxlciB0byBhc3NpZ24gdGhlIHNlY3Rpb24gdG8uXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gbmV3X3NlY3Rpb25fdmFsdWUgLSBUaGUgbmV3IHNlY3Rpb24gdmFsdWUuXG4gICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgbG9naW4gc2hlZXQgaXMgbm90IGN1cnJlbnQuXG4gICAgKi9cbiAgICBhc3luYyBhc3NpZ25fc2VjdGlvbihwYXRyb2xsZXJfc2VjdGlvbjogUGF0cm9sbGVyUm93LCBuZXdfc2VjdGlvbl92YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICghdGhpcy5pc19jdXJyZW50KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJMb2dpbiBzaGVldCBpcyBub3QgY3VycmVudFwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhgRXhpc3Rpbmcgc3RhdHVzOiAke0pTT04uc3RyaW5naWZ5KHBhdHJvbGxlcl9zZWN0aW9uKX1gKTtcblxuICAgICAgICBjb25zdCByb3cgPSBwYXRyb2xsZXJfc2VjdGlvbi5pbmRleCArIDE7IC8vIHByb2dyYW1taW5nIC0+IGV4Y2VsIGxvb2t1cFxuICAgICAgICBjb25zdCByYW5nZSA9IGAke3RoaXMuY29uZmlnLlNFQ1RJT05fRFJPUERPV05fQ09MVU1OfSR7cm93fWA7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5sb2dpbl9zaGVldC51cGRhdGVfdmFsdWVzKHJhbmdlLCBbW25ld19zZWN0aW9uX3ZhbHVlXV0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlcyBhIHJvdyBvZiBwYXRyb2xsZXIgZGF0YS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggLSBUaGUgaW5kZXggb2YgdGhlIHJvdy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSByb3cgLSBUaGUgcm93IGRhdGEuXG4gICAgICogQHBhcmFtIHtQYXRyb2xsZXJSb3dDb25maWd9IG9wdHMgLSBUaGUgY29uZmlndXJhdGlvbiBvcHRpb25zIGZvciB0aGUgcGF0cm9sbGVyIHJvdy5cbiAgICAgKiBAcmV0dXJucyB7UGF0cm9sbGVyUm93IHwgbnVsbH0gVGhlIHBhcnNlZCBwYXRyb2xsZXIgcm93IG9yIG51bGwgaWYgaW52YWxpZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHBhcnNlX3BhdHJvbGxlcl9yb3coXG4gICAgICAgIGluZGV4OiBudW1iZXIsXG4gICAgICAgIHJvdzogc3RyaW5nW10sXG4gICAgICAgIG9wdHM6IFBhdHJvbGxlclJvd0NvbmZpZ1xuICAgICk6IFBhdHJvbGxlclJvdyB8IG51bGwge1xuICAgICAgICBpZiAocm93Lmxlbmd0aCA8IDQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbmRleCA8IDMpe1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIG5hbWU6IHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5OQU1FX0NPTFVNTildLFxuICAgICAgICAgICAgY2F0ZWdvcnk6IHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5DQVRFR09SWV9DT0xVTU4pXSxcbiAgICAgICAgICAgIHNlY3Rpb246IHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5TRUNUSU9OX0RST1BET1dOX0NPTFVNTildLFxuICAgICAgICAgICAgY2hlY2tpbjogcm93W2V4Y2VsX3Jvd190b19pbmRleChvcHRzLkNIRUNLSU5fRFJPUERPV05fQ09MVU1OKV0sXG4gICAgICAgIH07XG4gICAgfVxufSIsImltcG9ydCB7IHNoZWV0c192NCB9IGZyb20gXCJnb29nbGVhcGlzXCI7XG5pbXBvcnQge1xuICAgIFNlYXNvblNoZWV0Q29uZmlnLFxufSBmcm9tIFwiLi4vZW52L2hhbmRsZXJfY29uZmlnXCI7XG5pbXBvcnQgeyBleGNlbF9yb3dfdG9faW5kZXggfSBmcm9tIFwiLi4vdXRpbHMvdXRpbFwiO1xuaW1wb3J0IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiIGZyb20gXCIuLi91dGlscy9nb29nbGVfc2hlZXRzX3NwcmVhZHNoZWV0X3RhYlwiO1xuaW1wb3J0IHsgZmlsdGVyX2xpc3RfdG9fZW5kc3dpdGhfY3VycmVudF9kYXkgfSBmcm9tIFwiLi4vdXRpbHMvZGF0ZXRpbWVfdXRpbFwiO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhIHNlYXNvbiBzaGVldCBpbiBHb29nbGUgU2hlZXRzLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWFzb25TaGVldCB7XG4gICAgc2hlZXQ6IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiO1xuICAgIGNvbmZpZzogU2Vhc29uU2hlZXRDb25maWc7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFNlYXNvblNoZWV0LlxuICAgICAqIEBwYXJhbSB7c2hlZXRzX3Y0LlNoZWV0cyB8IG51bGx9IHNoZWV0c19zZXJ2aWNlIC0gVGhlIEdvb2dsZSBTaGVldHMgQVBJIHNlcnZpY2UuXG4gICAgICogQHBhcmFtIHtTZWFzb25TaGVldENvbmZpZ30gY29uZmlnIC0gVGhlIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBzZWFzb24gc2hlZXQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzIHwgbnVsbCxcbiAgICAgICAgY29uZmlnOiBTZWFzb25TaGVldENvbmZpZ1xuICAgICkge1xuICAgICAgICB0aGlzLnNoZWV0ID0gbmV3IEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiKFxuICAgICAgICAgICAgc2hlZXRzX3NlcnZpY2UsXG4gICAgICAgICAgICBjb25maWcuU0hFRVRfSUQsXG4gICAgICAgICAgICBjb25maWcuU0VBU09OX1NIRUVUXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG51bWJlciBvZiBkYXlzIHBhdHJvbGxlZCBieSBhIHBhdHJvbGxlci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0cm9sbGVyX25hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcGF0cm9sbGVyLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPG51bWJlcj59IFRoZSBudW1iZXIgb2YgZGF5cyBwYXRyb2xsZWQuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3BhdHJvbGxlZF9kYXlzKFxuICAgICAgICBwYXRyb2xsZXJfbmFtZTogc3RyaW5nXG4gICAgKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICAgICAgY29uc3QgcGF0cm9sbGVyX3JvdyA9IGF3YWl0IHRoaXMuc2hlZXQuZ2V0X3NoZWV0X3Jvd19mb3JfcGF0cm9sbGVyKFxuICAgICAgICAgICAgcGF0cm9sbGVyX25hbWUsXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5TRUFTT05fU0hFRVRfTkFNRV9DT0xVTU5cbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoIXBhdHJvbGxlcl9yb3cpIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGN1cnJlbnROdW1iZXIgPVxuICAgICAgICAgICAgcGF0cm9sbGVyX3Jvdy5yb3dbZXhjZWxfcm93X3RvX2luZGV4KHRoaXMuY29uZmlnLlNFQVNPTl9TSEVFVF9EQVlTX0NPTFVNTildO1xuXG4gICAgICAgIGNvbnN0IGN1cnJlbnREYXkgPSBmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9jdXJyZW50X2RheShwYXRyb2xsZXJfcm93LnJvdylcbiAgICAgICAgICAgIC5tYXAoKHgpID0+ICh4Py5zdGFydHNXaXRoKFwiSFwiKSA/IDAuNSA6IDEpKVxuICAgICAgICAgICAgLnJlZHVjZSgoeCwgeSwgaSkgPT4geCArIHksIDApO1xuXG4gICAgICAgIGNvbnN0IGRheXNCZWZvcmVUb2RheSA9IGN1cnJlbnROdW1iZXIgLSBjdXJyZW50RGF5O1xuICAgICAgICByZXR1cm4gZGF5c0JlZm9yZVRvZGF5O1xuICAgIH1cbn0iLCJpbXBvcnQgeyBnb29nbGUgfSBmcm9tIFwiZ29vZ2xlYXBpc1wiO1xuaW1wb3J0IHsgR2VuZXJhdGVBdXRoVXJsT3B0cyB9IGZyb20gXCJnb29nbGUtYXV0aC1saWJyYXJ5XCI7XG5pbXBvcnQgeyBPQXV0aDJDbGllbnQgfSBmcm9tIFwiZ29vZ2xlYXBpcy1jb21tb25cIjtcbmltcG9ydCB7IHNhbml0aXplX3Bob25lX251bWJlciB9IGZyb20gXCIuL3V0aWxzL3V0aWxcIjtcbmltcG9ydCB7IGxvYWRfY3JlZGVudGlhbHNfZmlsZXMgfSBmcm9tIFwiLi91dGlscy9maWxlX3V0aWxzXCI7XG5pbXBvcnQgeyBTZXJ2aWNlQ29udGV4dCB9IGZyb20gXCJAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzL3R5cGVzXCI7XG5pbXBvcnQgeyBVc2VyQ3JlZHNDb25maWcgfSBmcm9tIFwiLi9lbnYvaGFuZGxlcl9jb25maWdcIjtcbmltcG9ydCB7IHZhbGlkYXRlX3Njb3BlcyB9IGZyb20gXCIuL3V0aWxzL3Njb3BlX3V0aWxcIjtcblxuY29uc3QgU0NPUEVTID0gW1xuICAgIFwiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9zY3JpcHQucHJvamVjdHNcIixcbiAgICBcImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvc3ByZWFkc2hlZXRzXCIsXG5dO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyB1c2VyIGNyZWRlbnRpYWxzIGZvciBHb29nbGUgT0F1dGgyLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyQ3JlZHMge1xuICAgIG51bWJlcjogc3RyaW5nO1xuICAgIG9hdXRoMl9jbGllbnQ6IE9BdXRoMkNsaWVudDtcbiAgICBzeW5jX2NsaWVudDogU2VydmljZUNvbnRleHQ7XG4gICAgZG9tYWluPzogc3RyaW5nO1xuICAgIGxvYWRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgVXNlckNyZWRzIGluc3RhbmNlLlxuICAgICAqIEBwYXJhbSB7U2VydmljZUNvbnRleHR9IHN5bmNfY2xpZW50IC0gVGhlIFR3aWxpbyBTeW5jIGNsaWVudC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IHVuZGVmaW5lZH0gbnVtYmVyIC0gVGhlIHVzZXIncyBwaG9uZSBudW1iZXIuXG4gICAgICogQHBhcmFtIHtVc2VyQ3JlZHNDb25maWd9IG9wdHMgLSBUaGUgdXNlciBjcmVkZW50aWFscyBjb25maWd1cmF0aW9uLlxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBUaHJvd3MgYW4gZXJyb3IgaWYgdGhlIG51bWJlciBpcyB1bmRlZmluZWQgb3IgbnVsbC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgc3luY19jbGllbnQ6IFNlcnZpY2VDb250ZXh0LFxuICAgICAgICBudW1iZXI6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICAgICAgb3B0czogVXNlckNyZWRzQ29uZmlnXG4gICAgKSB7XG4gICAgICAgIGlmIChudW1iZXIgPT09IHVuZGVmaW5lZCB8fCBudW1iZXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk51bWJlciBpcyB1bmRlZmluZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5udW1iZXIgPSBzYW5pdGl6ZV9waG9uZV9udW1iZXIobnVtYmVyKTtcblxuICAgICAgICBjb25zdCBjcmVkZW50aWFscyA9IGxvYWRfY3JlZGVudGlhbHNfZmlsZXMoKTtcbiAgICAgICAgY29uc3QgeyBjbGllbnRfc2VjcmV0LCBjbGllbnRfaWQsIHJlZGlyZWN0X3VyaXMgfSA9IGNyZWRlbnRpYWxzLndlYjtcbiAgICAgICAgdGhpcy5vYXV0aDJfY2xpZW50ID0gbmV3IGdvb2dsZS5hdXRoLk9BdXRoMihcbiAgICAgICAgICAgIGNsaWVudF9pZCxcbiAgICAgICAgICAgIGNsaWVudF9zZWNyZXQsXG4gICAgICAgICAgICByZWRpcmVjdF91cmlzWzBdXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3luY19jbGllbnQgPSBzeW5jX2NsaWVudDtcbiAgICAgICAgbGV0IGRvbWFpbiA9IG9wdHMuTlNQX0VNQUlMX0RPTUFJTjtcbiAgICAgICAgaWYgKGRvbWFpbiA9PT0gdW5kZWZpbmVkIHx8IGRvbWFpbiA9PT0gbnVsbCB8fCBkb21haW4gPT09IFwiXCIpIHtcbiAgICAgICAgICAgIGRvbWFpbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZG9tYWluID0gZG9tYWluO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9hZCB0aGUgT0F1dGgyIHRva2VuLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIGJvb2xlYW4gaW5kaWNhdGluZyBpZiB0aGUgdG9rZW4gd2FzIGxvYWRlZC5cbiAgICAgKi9cbiAgICBhc3luYyBsb2FkVG9rZW4oKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIGlmICghdGhpcy5sb2FkZWQpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYExvb2tpbmcgZm9yICR7dGhpcy50b2tlbl9rZXl9YCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2F1dGgyRG9jID0gYXdhaXQgdGhpcy5zeW5jX2NsaWVudFxuICAgICAgICAgICAgICAgICAgICAuZG9jdW1lbnRzKHRoaXMudG9rZW5fa2V5KVxuICAgICAgICAgICAgICAgICAgICAuZmV0Y2goKTtcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIG9hdXRoMkRvYyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgICAgIG9hdXRoMkRvYy5kYXRhID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgICAgICBvYXV0aDJEb2MuZGF0YS50b2tlbiA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBEaWRuJ3QgZmluZCAke3RoaXMudG9rZW5fa2V5fWApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRva2VuID0gb2F1dGgyRG9jLmRhdGEudG9rZW47XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlX3Njb3BlcyhvYXV0aDJEb2MuZGF0YS5zY29wZXMsIFNDT1BFUyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2F1dGgyX2NsaWVudC5zZXRDcmVkZW50aWFscyh0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBMb2FkZWQgdG9rZW4gJHt0aGlzLnRva2VuX2tleX1gKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICAgICAgYEZhaWxlZCB0byBsb2FkIHRva2VuIGZvciAke3RoaXMudG9rZW5fa2V5fS5cXG4gJHtlfWBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHRva2VuIGtleS5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgdG9rZW4ga2V5LlxuICAgICAqL1xuICAgIGdldCB0b2tlbl9rZXkoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGBvYXV0aDJfJHt0aGlzLm51bWJlcn1gO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlbGV0ZSB0aGUgT0F1dGgyIHRva2VuLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIGJvb2xlYW4gaW5kaWNhdGluZyBpZiB0aGUgdG9rZW4gd2FzIGRlbGV0ZWQuXG4gICAgICovXG4gICAgYXN5bmMgZGVsZXRlVG9rZW4oKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIGNvbnN0IG9hdXRoMkRvYyA9IGF3YWl0IHRoaXMuc3luY19jbGllbnRcbiAgICAgICAgICAgIC5kb2N1bWVudHModGhpcy50b2tlbl9rZXkpXG4gICAgICAgICAgICAuZmV0Y2goKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgb2F1dGgyRG9jID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIG9hdXRoMkRvYy5kYXRhID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgb2F1dGgyRG9jLmRhdGEudG9rZW4gPT09IHVuZGVmaW5lZFxuICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBEaWRuJ3QgZmluZCAke3RoaXMudG9rZW5fa2V5fWApO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHRoaXMuc3luY19jbGllbnQuZG9jdW1lbnRzKG9hdXRoMkRvYy5zaWQpLnJlbW92ZSgpO1xuICAgICAgICBjb25zb2xlLmxvZyhgRGVsZXRlZCB0b2tlbiAke3RoaXMudG9rZW5fa2V5fWApO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb21wbGV0ZSB0aGUgbG9naW4gcHJvY2VzcyBieSBleGNoYW5naW5nIHRoZSBhdXRob3JpemF0aW9uIGNvZGUgZm9yIGEgdG9rZW4uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvZGUgLSBUaGUgYXV0aG9yaXphdGlvbiBjb2RlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IHNjb3BlcyAtIFRoZSBzY29wZXMgdG8gdmFsaWRhdGUuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGxvZ2luIHByb2Nlc3MgaXMgY29tcGxldGUuXG4gICAgICovXG4gICAgYXN5bmMgY29tcGxldGVMb2dpbihjb2RlOiBzdHJpbmcsIHNjb3Blczogc3RyaW5nW10pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgdmFsaWRhdGVfc2NvcGVzKHNjb3BlcywgU0NPUEVTKTtcbiAgICAgICAgY29uc3QgdG9rZW4gPSBhd2FpdCB0aGlzLm9hdXRoMl9jbGllbnQuZ2V0VG9rZW4oY29kZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KE9iamVjdC5rZXlzKHRva2VuLnJlcyEpKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRva2VuLnRva2VucykpO1xuICAgICAgICB0aGlzLm9hdXRoMl9jbGllbnQuc2V0Q3JlZGVudGlhbHModG9rZW4udG9rZW5zKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IG9hdXRoRG9jID0gYXdhaXQgdGhpcy5zeW5jX2NsaWVudC5kb2N1bWVudHMuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICBkYXRhOiB7IHRva2VuOiB0b2tlbi50b2tlbnMsIHNjb3Blczogc2NvcGVzIH0sXG4gICAgICAgICAgICAgICAgdW5pcXVlTmFtZTogdGhpcy50b2tlbl9rZXksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgYEV4Y2VwdGlvbiB3aGVuIGNyZWF0aW5nIG9hdXRoLiBUcnlpbmcgdG8gdXBkYXRlIGluc3RlYWQuLi5cXG4ke2V9YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IG9hdXRoRG9jID0gYXdhaXQgdGhpcy5zeW5jX2NsaWVudFxuICAgICAgICAgICAgICAgIC5kb2N1bWVudHModGhpcy50b2tlbl9rZXkpXG4gICAgICAgICAgICAgICAgLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHsgdG9rZW46IHRva2VuLCBzY29wZXM6IHNjb3BlcyB9LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBhdXRob3JpemF0aW9uIFVSTC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzdHJpbmc+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgYXV0aG9yaXphdGlvbiBVUkwuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0QXV0aFVybCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zdCBpZCA9IHRoaXMuZ2VuZXJhdGVSYW5kb21TdHJpbmcoKTtcbiAgICAgICAgY29uc29sZS5sb2coYFVzaW5nIG5vbmNlICR7aWR9IGZvciAke3RoaXMubnVtYmVyfWApO1xuICAgICAgICBjb25zdCBkb2MgPSBhd2FpdCB0aGlzLnN5bmNfY2xpZW50LmRvY3VtZW50cy5jcmVhdGUoe1xuICAgICAgICAgICAgZGF0YTogeyBudW1iZXI6IHRoaXMubnVtYmVyLCBzY29wZXM6IFNDT1BFUyB9LFxuICAgICAgICAgICAgdW5pcXVlTmFtZTogaWQsXG4gICAgICAgICAgICB0dGw6IDYwICogNSwgLy8gNSBtaW51dGVzXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhgTWFkZSBub25jZS1kb2M6ICR7SlNPTi5zdHJpbmdpZnkoZG9jKX1gKTtcblxuICAgICAgICBjb25zdCBvcHRzOiBHZW5lcmF0ZUF1dGhVcmxPcHRzID0ge1xuICAgICAgICAgICAgYWNjZXNzX3R5cGU6IFwib2ZmbGluZVwiLFxuICAgICAgICAgICAgc2NvcGU6IFNDT1BFUyxcbiAgICAgICAgICAgIHN0YXRlOiBpZCxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMuZG9tYWluKSB7XG4gICAgICAgICAgICBvcHRzW1wiaGRcIl0gPSB0aGlzLmRvbWFpbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGF1dGhVcmwgPSB0aGlzLm9hdXRoMl9jbGllbnQuZ2VuZXJhdGVBdXRoVXJsKG9wdHMpO1xuICAgICAgICByZXR1cm4gYXV0aFVybDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZSBhIHJhbmRvbSBzdHJpbmcuXG4gICAgICogQHJldHVybnMge3N0cmluZ30gQSByYW5kb20gc3RyaW5nLlxuICAgICAqL1xuICAgIGdlbmVyYXRlUmFuZG9tU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IDMwO1xuICAgICAgICBsZXQgcmVzdWx0ID0gXCJcIjtcbiAgICAgICAgY29uc3QgY2hhcmFjdGVycyA9XG4gICAgICAgICAgICBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5XCI7XG4gICAgICAgIGNvbnN0IGNoYXJhY3RlcnNMZW5ndGggPSBjaGFyYWN0ZXJzLmxlbmd0aDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0ICs9IGNoYXJhY3RlcnMuY2hhckF0KFxuICAgICAgICAgICAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJhY3RlcnNMZW5ndGgpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuXG4vKipcbiAqIEludGVyZmFjZSByZXByZXNlbnRpbmcgdGhlIHVzZXIgY3JlZGVudGlhbHMgY29uZmlndXJhdGlvbi5cbiAqL1xuZXhwb3J0IHsgVXNlckNyZWRzLCBTQ09QRVMgYXMgVXNlckNyZWRzU2NvcGVzIH07XG4iLCIvKipcbiAqIFJlcHJlc2VudHMgYSBjaGVjay1pbiB2YWx1ZSB3aXRoIHZhcmlvdXMgcHJvcGVydGllcyBhbmQgbG9va3VwIHZhbHVlcy5cbiAqL1xuY2xhc3MgQ2hlY2tpblZhbHVlIHtcbiAgICBrZXk6IHN0cmluZztcbiAgICBzaGVldHNfdmFsdWU6IHN0cmluZztcbiAgICBzbXNfZGVzYzogc3RyaW5nO1xuICAgIGZhc3RfY2hlY2tpbnM6IHN0cmluZ1tdO1xuICAgIGxvb2t1cF92YWx1ZXM6IFNldDxzdHJpbmc+O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBDaGVja2luVmFsdWUuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIFRoZSBrZXkgZm9yIHRoZSBjaGVjay1pbiB2YWx1ZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2hlZXRzX3ZhbHVlIC0gVGhlIHZhbHVlIHVzZWQgaW4gc2hlZXRzLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzbXNfZGVzYyAtIFRoZSBkZXNjcmlwdGlvbiB1c2VkIGluIFNNUy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IHN0cmluZ1tdfSBmYXN0X2NoZWNraW5zIC0gVGhlIGZhc3QgY2hlY2staW4gdmFsdWVzLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBrZXk6IHN0cmluZyxcbiAgICAgICAgc2hlZXRzX3ZhbHVlOiBzdHJpbmcsXG4gICAgICAgIHNtc19kZXNjOiBzdHJpbmcsXG4gICAgICAgIGZhc3RfY2hlY2tpbnM6IHN0cmluZyB8IHN0cmluZ1tdXG4gICAgKSB7XG4gICAgICAgIGlmICghKGZhc3RfY2hlY2tpbnMgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgICAgICAgIGZhc3RfY2hlY2tpbnMgPSBbZmFzdF9jaGVja2luc107XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgICAgIHRoaXMuc2hlZXRzX3ZhbHVlID0gc2hlZXRzX3ZhbHVlO1xuICAgICAgICB0aGlzLnNtc19kZXNjID0gc21zX2Rlc2M7XG4gICAgICAgIHRoaXMuZmFzdF9jaGVja2lucyA9IGZhc3RfY2hlY2tpbnMubWFwKCh4KSA9PiB4LnRyaW0oKS50b0xvd2VyQ2FzZSgpKTtcblxuICAgICAgICBjb25zdCBzbXNfZGVzY19zcGxpdDogc3RyaW5nW10gPSBzbXNfZGVzY1xuICAgICAgICAgICAgLnJlcGxhY2UoL1xccysvLCBcIi1cIilcbiAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICAuc3BsaXQoXCIvXCIpO1xuICAgICAgICBjb25zdCBsb29rdXBfdmFscyA9IFsuLi50aGlzLmZhc3RfY2hlY2tpbnMsIC4uLnNtc19kZXNjX3NwbGl0XTtcbiAgICAgICAgdGhpcy5sb29rdXBfdmFsdWVzID0gbmV3IFNldDxzdHJpbmc+KGxvb2t1cF92YWxzKTtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGNvbGxlY3Rpb24gb2YgY2hlY2staW4gdmFsdWVzIHdpdGggdmFyaW91cyBsb29rdXAgbWV0aG9kcy5cbiAqL1xuY2xhc3MgQ2hlY2tpblZhbHVlcyB7XG4gICAgYnlfa2V5OiB7IFtrZXk6IHN0cmluZ106IENoZWNraW5WYWx1ZSB9ID0ge307XG4gICAgYnlfbHY6IHsgW2tleTogc3RyaW5nXTogQ2hlY2tpblZhbHVlIH0gPSB7fTtcbiAgICBieV9mYzogeyBba2V5OiBzdHJpbmddOiBDaGVja2luVmFsdWUgfSA9IHt9O1xuICAgIGJ5X3NoZWV0X3N0cmluZzogeyBba2V5OiBzdHJpbmddOiBDaGVja2luVmFsdWUgfSA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBDaGVja2luVmFsdWVzLlxuICAgICAqIEBwYXJhbSB7Q2hlY2tpblZhbHVlW119IGNoZWNraW5WYWx1ZXMgLSBUaGUgYXJyYXkgb2YgY2hlY2staW4gdmFsdWVzLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNoZWNraW5WYWx1ZXM6IENoZWNraW5WYWx1ZVtdKSB7XG4gICAgICAgIGZvciAodmFyIGNoZWNraW5WYWx1ZSBvZiBjaGVja2luVmFsdWVzKSB7XG4gICAgICAgICAgICB0aGlzLmJ5X2tleVtjaGVja2luVmFsdWUua2V5XSA9IGNoZWNraW5WYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuYnlfc2hlZXRfc3RyaW5nW2NoZWNraW5WYWx1ZS5zaGVldHNfdmFsdWVdID0gY2hlY2tpblZhbHVlO1xuICAgICAgICAgICAgZm9yIChjb25zdCBsdiBvZiBjaGVja2luVmFsdWUubG9va3VwX3ZhbHVlcykge1xuICAgICAgICAgICAgICAgIHRoaXMuYnlfbHZbbHZdID0gY2hlY2tpblZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCBmYyBvZiBjaGVja2luVmFsdWUuZmFzdF9jaGVja2lucykge1xuICAgICAgICAgICAgICAgIHRoaXMuYnlfZmNbZmNdID0gY2hlY2tpblZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZW50cmllcyBvZiBjaGVjay1pbiB2YWx1ZXMgYnkga2V5LlxuICAgICAqIEByZXR1cm5zIHtBcnJheX0gVGhlIGVudHJpZXMgb2YgY2hlY2staW4gdmFsdWVzLlxuICAgICAqL1xuICAgIGVudHJpZXMoKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuZW50cmllcyh0aGlzLmJ5X2tleSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIGEgZmFzdCBjaGVjay1pbiB2YWx1ZSBmcm9tIHRoZSBnaXZlbiBib2R5IHN0cmluZy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYm9keSAtIFRoZSBib2R5IHN0cmluZyB0byBwYXJzZS5cbiAgICAgKiBAcmV0dXJucyB7Q2hlY2tpblZhbHVlIHwgdW5kZWZpbmVkfSBUaGUgcGFyc2VkIGNoZWNrLWluIHZhbHVlIG9yIHVuZGVmaW5lZC5cbiAgICAgKi9cbiAgICBwYXJzZV9mYXN0X2NoZWNraW4oYm9keTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJ5X2ZjW2JvZHldO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlcyBhIGNoZWNrLWluIHZhbHVlIGZyb20gdGhlIGdpdmVuIGJvZHkgc3RyaW5nLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5IC0gVGhlIGJvZHkgc3RyaW5nIHRvIHBhcnNlLlxuICAgICAqIEByZXR1cm5zIHtDaGVja2luVmFsdWUgfCB1bmRlZmluZWR9IFRoZSBwYXJzZWQgY2hlY2staW4gdmFsdWUgb3IgdW5kZWZpbmVkLlxuICAgICAqL1xuICAgIHBhcnNlX2NoZWNraW4oYm9keTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGNoZWNraW5fbG93ZXIgPSBib2R5LnJlcGxhY2UoL1xccysvLCBcIlwiKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnlfbHZbY2hlY2tpbl9sb3dlcl07XG4gICAgfVxufVxuXG5leHBvcnQgeyBDaGVja2luVmFsdWUsIENoZWNraW5WYWx1ZXMgfSIsIi8qKlxuICogRW51bSBmb3IgZGlmZmVyZW50IHR5cGVzIG9mIGNvbXAgcGFzc2VzLlxuICogQGVudW0ge3N0cmluZ31cbiAqL1xuZXhwb3J0IGVudW0gQ29tcFBhc3NUeXBlIHtcbiAgICBDb21wUGFzcyA9IFwiY29tcC1wYXNzXCIsXG4gICAgTWFuYWdlclBhc3MgPSBcIm1hbmFnZXItcGFzc1wiLFxufVxuXG4vKipcbiAqIEdldCB0aGUgZGVzY3JpcHRpb24gZm9yIGEgZ2l2ZW4gY29tcCBwYXNzIHR5cGUuXG4gKiBAcGFyYW0ge0NvbXBQYXNzVHlwZX0gdHlwZSAtIFRoZSB0eXBlIG9mIHRoZSBjb21wIHBhc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZGVzY3JpcHRpb24gb2YgdGhlIGNvbXAgcGFzcyB0eXBlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0X2NvbXBfcGFzc19kZXNjcmlwdGlvbih0eXBlOiBDb21wUGFzc1R5cGUpOiBzdHJpbmcge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIENvbXBQYXNzVHlwZS5Db21wUGFzczpcbiAgICAgICAgICAgIHJldHVybiBcIkNvbXAgUGFzc1wiO1xuICAgICAgICBjYXNlIENvbXBQYXNzVHlwZS5NYW5hZ2VyUGFzczpcbiAgICAgICAgICAgIHJldHVybiBcIk1hbmFnZXIgUGFzc1wiO1xuICAgIH1cbiAgICByZXR1cm4gXCJcIjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkX3Bhc3Nlc19zdHJpbmcoXG4gICAgdXNlZDogbnVtYmVyLFxuICAgIHRvdGFsOiBudW1iZXIsXG4gICAgdG9kYXk6IG51bWJlcixcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgZm9yY2VfdG9kYXk6IGJvb2xlYW4gPSBmYWxzZVxuKSB7XG4gICAgbGV0IG1lc3NhZ2UgPSBgWW91IGhhdmUgdXNlZCAke3VzZWR9IG9mICR7dG90YWx9ICR7dHlwZX0gdGhpcyBzZWFzb25gO1xuICAgIGlmIChmb3JjZV90b2RheSB8fCB0b2RheSA+IDApIHtcbiAgICAgICAgbWVzc2FnZSArPSBgICgke3RvZGF5fSB1c2VkIHRvZGF5KWA7XG4gICAgfVxuICAgIG1lc3NhZ2UgKz0gXCIuXCI7XG4gICAgcmV0dXJuIG1lc3NhZ2U7XG59XG4iLCIvKipcbiAqIENvbnZlcnQgYW4gRXhjZWwgZGF0ZSB0byBhIEphdmFTY3JpcHQgRGF0ZSBvYmplY3QuXG4gKiBAcGFyYW0ge251bWJlcn0gZGF0ZSAtIFRoZSBFeGNlbCBkYXRlLlxuICogQHJldHVybnMge0RhdGV9IFRoZSBKYXZhU2NyaXB0IERhdGUgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBleGNlbF9kYXRlX3RvX2pzX2RhdGUoZGF0ZTogbnVtYmVyKTogRGF0ZSB7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IERhdGUoMCk7XG4gICAgcmVzdWx0LnNldFVUQ01pbGxpc2Vjb25kcyhNYXRoLnJvdW5kKChkYXRlIC0gMjU1NjkpICogODY0MDAgKiAxMDAwKSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDaGFuZ2UgdGhlIHRpbWV6b25lIG9mIGEgRGF0ZSBvYmplY3QgdG8gUFNULlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIC0gVGhlIERhdGUgb2JqZWN0LlxuICogQHJldHVybnMge0RhdGV9IFRoZSBEYXRlIG9iamVjdCB3aXRoIHRoZSB0aW1lem9uZSBzZXQgdG8gUFNULlxuICovXG5mdW5jdGlvbiBjaGFuZ2VfdGltZXpvbmVfdG9fcHN0KGRhdGU6IERhdGUpOiBEYXRlIHtcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgRGF0ZShkYXRlLnRvVVRDU3RyaW5nKCkucmVwbGFjZShcIiBHTVRcIiwgXCIgUFNUXCIpKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFN0cmlwIHRoZSB0aW1lIGZyb20gYSBEYXRlIG9iamVjdCwga2VlcGluZyBvbmx5IHRoZSBkYXRlLlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIC0gVGhlIERhdGUgb2JqZWN0LlxuICogQHJldHVybnMge0RhdGV9IFRoZSBEYXRlIG9iamVjdCB3aXRoIHRoZSB0aW1lIHN0cmlwcGVkLlxuICovXG5mdW5jdGlvbiBzdHJpcF9kYXRldGltZV90b19kYXRlKGRhdGU6IERhdGUpOiBEYXRlIHtcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgRGF0ZShcbiAgICAgICAgZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoXCJlbi1VU1wiLCB7IHRpbWVab25lOiBcIkFtZXJpY2EvTG9zX0FuZ2VsZXNcIiB9KVxuICAgICk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBTYW5pdGl6ZSBhIGRhdGUgYnkgY29udmVydGluZyBpdCBmcm9tIGFuIEV4Y2VsIGRhdGUgYW5kIHN0cmlwcGluZyB0aGUgdGltZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBkYXRlIC0gVGhlIEV4Y2VsIGRhdGUuXG4gKiBAcmV0dXJucyB7RGF0ZX0gVGhlIHNhbml0aXplZCBEYXRlIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gc2FuaXRpemVfZGF0ZShkYXRlOiBudW1iZXIpOiBEYXRlIHtcbiAgICBjb25zdCByZXN1bHQgPSBzdHJpcF9kYXRldGltZV90b19kYXRlKFxuICAgICAgICBjaGFuZ2VfdGltZXpvbmVfdG9fcHN0KGV4Y2VsX2RhdGVfdG9fanNfZGF0ZShkYXRlKSlcbiAgICApO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRm9ybWF0IGEgRGF0ZSBvYmplY3QgZm9yIHVzZSBpbiBhIHNwcmVhZHNoZWV0IHZhbHVlLlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIC0gVGhlIERhdGUgb2JqZWN0LlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCBkYXRlIHN0cmluZyBpbiBQU1RcbiAqL1xuZnVuY3Rpb24gZm9ybWF0X2RhdGVfZm9yX3NwcmVhZHNoZWV0X3ZhbHVlKGRhdGU6IERhdGUpOiBzdHJpbmcge1xuICAgICBjb25zdCBkYXRlc3RyID0gZGF0ZVxuICAgICAgICAgLnRvTG9jYWxlRGF0ZVN0cmluZyhcImVuLVVTXCIsIHsgdGltZVpvbmU6IFwiQW1lcmljYS9Mb3NfQW5nZWxlc1wiIH0pXG4gICAgICAgIC5zcGxpdChcIi9cIilcbiAgICAgICAgLm1hcCgoeCkgPT4geC5wYWRTdGFydCgyLCBcIjBcIikpXG4gICAgICAgIC5qb2luKFwiXCIpO1xuICAgIHJldHVybiBkYXRlc3RyO1xufVxuXG4vKipcbiAqIEZpbHRlciBhIGxpc3QgdG8gaW5jbHVkZSBvbmx5IGl0ZW1zIHRoYXQgZW5kIHdpdGggYSBzcGVjaWZpYyBkYXRlLlxuICogQHBhcmFtIHthbnlbXX0gbGlzdCAtIFRoZSBsaXN0IHRvIGZpbHRlci5cbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSAtIFRoZSBkYXRlIHRvIGZpbHRlciBieS5cbiAqIEByZXR1cm5zIHthbnlbXX0gVGhlIGZpbHRlcmVkIGxpc3QuXG4gKi9cbmZ1bmN0aW9uIGZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2RhdGUobGlzdDogYW55W10sIGRhdGU6IERhdGUpOiBhbnlbXSB7XG4gICAgY29uc3QgZGF0ZXN0ciA9IGZvcm1hdF9kYXRlX2Zvcl9zcHJlYWRzaGVldF92YWx1ZShkYXRlKTtcbiAgICByZXR1cm4gbGlzdC5tYXAoKHgpID0+IHg/LnRvU3RyaW5nKCkpLmZpbHRlcigoeCkgPT4geD8uZW5kc1dpdGgoZGF0ZXN0cikpO1xufVxuXG4vKipcbiAqIEZpbHRlciBhIGxpc3QgdG8gaW5jbHVkZSBvbmx5IGl0ZW1zIHRoYXQgZW5kIHdpdGggdGhlIGN1cnJlbnQgZGF0ZS5cbiAqIEBwYXJhbSB7YW55W119IGxpc3QgLSBUaGUgbGlzdCB0byBmaWx0ZXIuXG4gKiBAcmV0dXJucyB7YW55W119IFRoZSBmaWx0ZXJlZCBsaXN0LlxuICovXG5mdW5jdGlvbiBmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9jdXJyZW50X2RheShsaXN0OiBhbnlbXSk6IGFueVtdIHtcbiAgICByZXR1cm4gZmlsdGVyX2xpc3RfdG9fZW5kc3dpdGhfZGF0ZShsaXN0LCBuZXcgRGF0ZSgpKTtcbn1cblxuZXhwb3J0IHtcbiAgICBzYW5pdGl6ZV9kYXRlLFxuICAgIGV4Y2VsX2RhdGVfdG9fanNfZGF0ZSxcbiAgICBjaGFuZ2VfdGltZXpvbmVfdG9fcHN0LFxuICAgIHN0cmlwX2RhdGV0aW1lX3RvX2RhdGUsXG4gICAgZm9ybWF0X2RhdGVfZm9yX3NwcmVhZHNoZWV0X3ZhbHVlLFxuICAgIGZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2RhdGUsXG4gICAgZmlsdGVyX2xpc3RfdG9fZW5kc3dpdGhfY3VycmVudF9kYXksXG59OyIsImltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICdAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzJztcblxuLyoqXG4gKiBMb2FkIGNyZWRlbnRpYWxzIGZyb20gYSBKU09OIGZpbGUuXG4gKiBAcmV0dXJucyB7YW55fSBUaGUgcGFyc2VkIGNyZWRlbnRpYWxzIGZyb20gdGhlIEpTT04gZmlsZS5cbiAqL1xuZnVuY3Rpb24gbG9hZF9jcmVkZW50aWFsc19maWxlcygpOiBhbnkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKFxuICAgICAgICBmc1xuICAgICAgICAgICAgLnJlYWRGaWxlU3luYyhSdW50aW1lLmdldEFzc2V0cygpW1wiL2NyZWRlbnRpYWxzLmpzb25cIl0ucGF0aClcbiAgICAgICAgICAgIC50b1N0cmluZygpXG4gICAgKTtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIHBhdGggdG8gdGhlIHNlcnZpY2UgY3JlZGVudGlhbHMgZmlsZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBwYXRoIHRvIHRoZSBzZXJ2aWNlIGNyZWRlbnRpYWxzIGZpbGUuXG4gKi9cbmZ1bmN0aW9uIGdldF9zZXJ2aWNlX2NyZWRlbnRpYWxzX3BhdGgoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gUnVudGltZS5nZXRBc3NldHMoKVtcIi9zZXJ2aWNlLWNyZWRlbnRpYWxzLmpzb25cIl0ucGF0aDtcbn1cblxuZXhwb3J0IHsgbG9hZF9jcmVkZW50aWFsc19maWxlcywgZ2V0X3NlcnZpY2VfY3JlZGVudGlhbHNfcGF0aCB9OyIsImltcG9ydCB7IHNoZWV0c192NCB9IGZyb20gXCJnb29nbGVhcGlzXCI7XG5pbXBvcnQgeyBleGNlbF9yb3dfdG9faW5kZXggfSBmcm9tIFwiLi91dGlsXCI7XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGEgR29vZ2xlIFNoZWV0cyBzcHJlYWRzaGVldCB0YWIuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiIHtcbiAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyB8IG51bGw7XG4gICAgc2hlZXRfaWQ6IHN0cmluZztcbiAgICBzaGVldF9uYW1lOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBHb29nbGVTaGVldHNTcHJlYWRzaGVldFRhYi5cbiAgICAgKiBAcGFyYW0ge3NoZWV0c192NC5TaGVldHMgfCBudWxsfSBzaGVldHNfc2VydmljZSAtIFRoZSBHb29nbGUgU2hlZXRzIEFQSSBzZXJ2aWNlIGluc3RhbmNlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaGVldF9pZCAtIFRoZSBJRCBvZiB0aGUgR29vZ2xlIFNoZWV0cyBzcHJlYWRzaGVldC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2hlZXRfbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBzaGVldCB0YWIuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzIHwgbnVsbCxcbiAgICAgICAgc2hlZXRfaWQ6IHN0cmluZyxcbiAgICAgICAgc2hlZXRfbmFtZTogc3RyaW5nXG4gICAgKSB7XG4gICAgICAgIHRoaXMuc2hlZXRzX3NlcnZpY2UgPSBzaGVldHNfc2VydmljZTtcbiAgICAgICAgdGhpcy5zaGVldF9pZCA9IHNoZWV0X2lkO1xuICAgICAgICB0aGlzLnNoZWV0X25hbWUgPSBzaGVldF9uYW1lLnNwbGl0KFwiIVwiKVswXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdmFsdWVzIGZyb20gdGhlIHNoZWV0LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbH0gW3JhbmdlXSAtIFRoZSByYW5nZSB0byBnZXQgdmFsdWVzIGZyb20uXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55W11bXSB8IHVuZGVmaW5lZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSB2YWx1ZXMgZnJvbSB0aGUgc2hlZXQuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3ZhbHVlcyhyYW5nZT86IHN0cmluZyB8IG51bGwpOiBQcm9taXNlPGFueVtdW10gfCB1bmRlZmluZWQ+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5fZ2V0X3ZhbHVlcyhyYW5nZSk7XG4gICAgICAgIHJldHVybiByZXN1bHQuZGF0YS52YWx1ZXMgPz8gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgcm93IGZvciBhIHNwZWNpZmljIHBhdHJvbGxlci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0cm9sbGVyX25hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcGF0cm9sbGVyLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lX2NvbHVtbiAtIFRoZSBjb2x1bW4gd2hlcmUgdGhlIHBhdHJvbGxlcidzIG5hbWUgaXMgbG9jYXRlZC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bGx9IFtyYW5nZV0gLSBUaGUgcmFuZ2UgdG8gc2VhcmNoIHdpdGhpbi5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx7IHJvdzogYW55W107IGluZGV4OiBudW1iZXI7IH0gfCBudWxsPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIHJvdyBhbmQgaW5kZXggb2YgdGhlIHBhdHJvbGxlciwgb3IgbnVsbCBpZiBub3QgZm91bmQuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0X3NoZWV0X3Jvd19mb3JfcGF0cm9sbGVyKFxuICAgICAgICBwYXRyb2xsZXJfbmFtZTogc3RyaW5nLFxuICAgICAgICBuYW1lX2NvbHVtbjogc3RyaW5nLFxuICAgICAgICByYW5nZT86IHN0cmluZyB8IG51bGxcbiAgICApOiBQcm9taXNlPHsgcm93OiBhbnlbXTsgaW5kZXg6IG51bWJlcjsgfSB8IG51bGw+IHtcbiAgICAgICAgY29uc3Qgcm93cyA9IGF3YWl0IHRoaXMuZ2V0X3ZhbHVlcyhyYW5nZSk7XG4gICAgICAgIGlmIChyb3dzKSB7XG4gICAgICAgICAgICBjb25zdCBsb29rdXBfaW5kZXggPSBleGNlbF9yb3dfdG9faW5kZXgobmFtZV9jb2x1bW4pO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJvd3NbaV1bbG9va3VwX2luZGV4XSA9PT0gcGF0cm9sbGVyX25hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgcm93OiByb3dzW2ldLCBpbmRleDogaSB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgYENvdWxkbid0IGZpbmQgcGF0cm9sbGVyICR7cGF0cm9sbGVyX25hbWV9IGluIHNoZWV0ICR7dGhpcy5zaGVldF9uYW1lfS5gXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB2YWx1ZXMgaW4gdGhlIHNoZWV0LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByYW5nZSAtIFRoZSByYW5nZSB0byB1cGRhdGUuXG4gICAgICogQHBhcmFtIHthbnlbXVtdfSB2YWx1ZXMgLSBUaGUgdmFsdWVzIHRvIHVwZGF0ZS5cbiAgICAgKi9cbiAgICBhc3luYyB1cGRhdGVfdmFsdWVzKHJhbmdlOiBzdHJpbmcsIHZhbHVlczogYW55W11bXSkge1xuICAgICAgICBjb25zdCB1cGRhdGVNZSA9IChhd2FpdCB0aGlzLl9nZXRfdmFsdWVzKHJhbmdlLCBudWxsKSkuZGF0YTtcblxuICAgICAgICB1cGRhdGVNZS52YWx1ZXMgPSB2YWx1ZXM7XG4gICAgICAgIGF3YWl0IHRoaXMuc2hlZXRzX3NlcnZpY2UhLnNwcmVhZHNoZWV0cy52YWx1ZXMudXBkYXRlKHtcbiAgICAgICAgICAgIHNwcmVhZHNoZWV0SWQ6IHRoaXMuc2hlZXRfaWQsXG4gICAgICAgICAgICB2YWx1ZUlucHV0T3B0aW9uOiBcIlVTRVJfRU5URVJFRFwiLFxuICAgICAgICAgICAgcmFuZ2U6IHVwZGF0ZU1lLnJhbmdlISxcbiAgICAgICAgICAgIHJlcXVlc3RCb2R5OiB1cGRhdGVNZSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHZhbHVlcyBmcm9tIHRoZSBzaGVldCAocHJpdmF0ZSBtZXRob2QpLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbH0gW3JhbmdlXSAtIFRoZSByYW5nZSB0byBnZXQgdmFsdWVzIGZyb20uXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCBudWxsfSBbdmFsdWVSZW5kZXJPcHRpb25dIC0gVGhlIHZhbHVlIHJlbmRlciBvcHRpb24uXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55W11bXT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSB2YWx1ZSByYW5nZS5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgYXN5bmMgX2dldF92YWx1ZXMoXG4gICAgICAgIHJhbmdlPzogc3RyaW5nIHwgbnVsbCxcbiAgICAgICAgdmFsdWVSZW5kZXJPcHRpb246IHN0cmluZyB8IG51bGwgPSBcIlVORk9STUFUVEVEX1ZBTFVFXCJcbiAgICApIHtcbiAgICAgICAgbGV0IGxvb2t1cFJhbmdlID0gdGhpcy5zaGVldF9uYW1lO1xuICAgICAgICBpZiAocmFuZ2UgIT0gbnVsbCkge1xuICAgICAgICAgICAgbG9va3VwUmFuZ2UgPSBsb29rdXBSYW5nZSArIFwiIVwiO1xuXG4gICAgICAgICAgICBpZiAocmFuZ2Uuc3RhcnRzV2l0aChsb29rdXBSYW5nZSkpIHtcbiAgICAgICAgICAgICAgICByYW5nZSA9IHJhbmdlLnN1YnN0cmluZyhsb29rdXBSYW5nZS5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9va3VwUmFuZ2UgPSBsb29rdXBSYW5nZSArIHJhbmdlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBvcHRzOiBzaGVldHNfdjQuUGFyYW1zJFJlc291cmNlJFNwcmVhZHNoZWV0cyRWYWx1ZXMkR2V0ID0ge1xuICAgICAgICAgICAgc3ByZWFkc2hlZXRJZDogdGhpcy5zaGVldF9pZCxcbiAgICAgICAgICAgIHJhbmdlOiBsb29rdXBSYW5nZSxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHZhbHVlUmVuZGVyT3B0aW9uKSB7XG4gICAgICAgICAgICBvcHRzLnZhbHVlUmVuZGVyT3B0aW9uID0gdmFsdWVSZW5kZXJPcHRpb247XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5zaGVldHNfc2VydmljZSEuc3ByZWFkc2hlZXRzLnZhbHVlcy5nZXQob3B0cyk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBWYWxpZGF0ZXMgaWYgdGhlIHByb3ZpZGVkIHNjb3BlcyBpbmNsdWRlIGFsbCBkZXNpcmVkIHNjb3Blcy5cbiAqIEBwYXJhbSB7c3RyaW5nW119IHNjb3BlcyAtIFRoZSBsaXN0IG9mIHNjb3BlcyB0byB2YWxpZGF0ZS5cbiAqIEBwYXJhbSB7c3RyaW5nW119IGRlc2lyZWRfc2NvcGVzIC0gVGhlIGxpc3Qgb2YgZGVzaXJlZCBzY29wZXMuXG4gKiBAdGhyb3dzIHtFcnJvcn0gVGhyb3dzIGFuIGVycm9yIGlmIGFueSBkZXNpcmVkIHNjb3BlIGlzIG1pc3NpbmcuXG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlX3Njb3BlcyhzY29wZXM6IHN0cmluZ1tdLCBkZXNpcmVkX3Njb3Blczogc3RyaW5nW10pIHtcbiAgICBmb3IgKGNvbnN0IGRlc2lyZWRfc2NvcGUgb2YgZGVzaXJlZF9zY29wZXMpIHtcbiAgICAgICAgaWYgKHNjb3BlcyA9PT0gdW5kZWZpbmVkIHx8ICFzY29wZXMuaW5jbHVkZXMoZGVzaXJlZF9zY29wZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gYE1pc3Npbmcgc2NvcGUgJHtkZXNpcmVkX3Njb3BlfSBpbiByZWNlaXZlZCBzY29wZXM6ICR7c2NvcGVzfWA7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IHt2YWxpZGF0ZV9zY29wZXN9IiwiaW1wb3J0IHsgU2VjdGlvbkNvbmZpZyB9IGZyb20gJy4uL2Vudi9oYW5kbGVyX2NvbmZpZyc7XG5cbi8qKlxuICAgICogQ2xhc3MgZm9yIHNlY3Rpb24gdmFsdWVzLlxuICAgICovXG5jbGFzcyBTZWN0aW9uVmFsdWVzIHtcbiAgICBzZWN0aW9uX2NvbmZpZzogU2VjdGlvbkNvbmZpZ1xuICAgIHNlY3Rpb25zOiBzdHJpbmdbXTtcbiAgICBsb3dlcmNhc2Vfc2VjdGlvbnM6IHN0cmluZ1tdO1xuXG4gICAgY29uc3RydWN0b3Ioc2VjdGlvbl9jb25maWc6IFNlY3Rpb25Db25maWcpIHtcbiAgICAgICAgdGhpcy5zZWN0aW9uX2NvbmZpZyA9IHNlY3Rpb25fY29uZmlnO1xuICAgICAgICB0aGlzLnNlY3Rpb25zID0gc2VjdGlvbl9jb25maWcuU0VDVElPTl9WQUxVRVMuc3BsaXQoJywnKTtcbiAgICAgICAgdGhpcy5sb3dlcmNhc2Vfc2VjdGlvbnMgPSBzZWN0aW9uX2NvbmZpZy5TRUNUSU9OX1ZBTFVFUy50b0xvd2VyQ2FzZSgpLnNwbGl0KCcsJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgc2VjdGlvbiBkZXNjcmlwdGlvbi5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgc2VjdGlvbiBkZXNjcmlwdGlvbi5cbiAgICAqL1xuICAgIGdldF9zZWN0aW9uX2Rlc2NyaXB0aW9uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlY3Rpb25fY29uZmlnLlNFQ1RJT05fVkFMVUVTO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogUGFyc2VzIGEgc2VjdGlvbi5cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5IC0gVGhlIGJvZHkgb2YgdGhlIHJlcXVlc3QuXG4gICAgKiBAcmV0dXJucyB7c3RyaW5nIHwgbnVsbH0gVGhlIHNlY3Rpb24gaWYgaXQgaXMgYSB2YWxpZCBzZWN0aW9uIG9yIG51bGwuXG4gICAgKi9cbiAgICBwYXJzZV9zZWN0aW9uKGJvZHk6IHN0cmluZyB8IG51bGwpOiBzdHJpbmcgfCBudWxsIHtcbiAgICAgICAgaWYgKGJvZHkgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgICByZXR1cm4gdGhpcy5sb3dlcmNhc2Vfc2VjdGlvbnMuaW5jbHVkZXMoYm9keS50b0xvd2VyQ2FzZSgpKSA/IGJvZHkgOiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogTWFwcyBhIGxvd2VyIGNhc2UgdmVyc2lvbiBvZiBhIHNlY3Rpb24gc3RyaW5nIHRvIHRoZSBvcmlnaW5hbCBjYXNlIHZhbHVlLlxuICAgICogQHBhcmFtIHtzdHJpbmd9IHNlY3Rpb24gLSBUaGUgbG93ZXIgY2FzZSBzZWN0aW9uIHN0cmluZy5cbiAgICAqIEByZXR1cm5zIHtzdHJpbmcgfSBUaGUgb3JpZ2luYWwgY2FzZSB2YWx1ZSBpZiBmb3VuZCwgb3RoZXJ3aXNlIG51bGwuXG4gICAgKi9cbiAgIG1hcF9zZWN0aW9uKHNlY3Rpb246IHN0cmluZyB8IG51bGwpOiBzdHJpbmcgIHtcbiAgICAgICBpZiAoc2VjdGlvbiA9PT0gbnVsbCkge1xuICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICB9XG4gICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmxvd2VyY2FzZV9zZWN0aW9ucy5pbmRleE9mKHNlY3Rpb24udG9Mb3dlckNhc2UoKSk7XG4gICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICByZXR1cm4gdGhpcy5zZWN0aW9uc1tpbmRleF07XG4gICAgICAgfVxuICAgICAgIHJldHVybiBcIlwiO1xuICAgfVxuXG59XG5cbmV4cG9ydCB7IFNlY3Rpb25WYWx1ZXMgfTsiLCIvKipcbiAqIENvbnZlcnQgcm93IGFuZCBjb2x1bW4gbnVtYmVycyB0byBhbiBFeGNlbC1saWtlIGluZGV4LlxuICogQHBhcmFtIHtudW1iZXJ9IHJvdyAtIFRoZSByb3cgbnVtYmVyICgwLWJhc2VkKS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBjb2wgLSBUaGUgY29sdW1uIG51bWJlciAoMC1iYXNlZCkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgRXhjZWwtbGlrZSBpbmRleCAoZS5nLiwgXCJBMVwiKS5cbiAqL1xuZnVuY3Rpb24gcm93X2NvbF90b19leGNlbF9pbmRleChyb3c6IG51bWJlciwgY29sOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGxldCBjb2xTdHJpbmcgPSBcIlwiO1xuICAgIGNvbCArPSAxO1xuICAgIHdoaWxlIChjb2wgPiAwKSB7XG4gICAgICAgIGNvbCAtPSAxO1xuICAgICAgICBjb25zdCBtb2R1bG8gPSBjb2wgJSAyNjtcbiAgICAgICAgY29uc3QgY29sTGV0dGVyID0gU3RyaW5nLmZyb21DaGFyQ29kZSgnQScuY2hhckNvZGVBdCgwKSArIG1vZHVsbyk7XG4gICAgICAgIGNvbFN0cmluZyA9IGNvbExldHRlciArIGNvbFN0cmluZztcbiAgICAgICAgY29sID0gTWF0aC5mbG9vcihjb2wgLyAyNik7XG4gICAgfVxuICAgIHJldHVybiBjb2xTdHJpbmcgKyAocm93ICsgMSkudG9TdHJpbmcoKTtcbn1cblxuLyoqXG4gKiBTcGxpdCBhbiBFeGNlbC1saWtlIGluZGV4IGludG8gcm93IGFuZCBjb2x1bW4gbnVtYmVycy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBleGNlbF9pbmRleCAtIFRoZSBFeGNlbC1saWtlIGluZGV4IChlLmcuLCBcIkExXCIpLlxuICogQHJldHVybnMge1tudW1iZXIsIG51bWJlcl19IEFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIHJvdyBhbmQgY29sdW1uIG51bWJlcnMgKDAtYmFzZWQpLlxuICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBpbmRleCBjYW5ub3QgYmUgcGFyc2VkLlxuICovXG5mdW5jdGlvbiBzcGxpdF90b19yb3dfY29sKGV4Y2VsX2luZGV4OiBzdHJpbmcpOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoXCJeKFtBLVphLXpdKykoWzAtOV0rKSRcIik7XG4gICAgY29uc3QgbWF0Y2ggPSByZWdleC5leGVjKGV4Y2VsX2luZGV4KTtcbiAgICBpZiAobWF0Y2ggPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gcGFyc2Ugc3RyaW5nIGZvciBleGNlbCBwb3NpdGlvbiBzcGxpdFwiKTtcbiAgICB9XG4gICAgY29uc3QgY29sID0gZXhjZWxfcm93X3RvX2luZGV4KG1hdGNoWzFdKTtcbiAgICBjb25zdCByYXdfcm93ID0gTnVtYmVyKG1hdGNoWzJdKTtcbiAgICBpZiAocmF3X3JvdyA8IDEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUm93IG11c3QgYmUgPj0xXCIpO1xuICAgIH1cbiAgICByZXR1cm4gW3Jhd19yb3cgLSAxLCBjb2xdO1xufVxuXG4vKipcbiAqIExvb2sgdXAgYSB2YWx1ZSBpbiBhIHNoZWV0IGJ5IGl0cyBFeGNlbC1saWtlIGluZGV4LlxuICogQHBhcmFtIHtzdHJpbmd9IGV4Y2VsX2luZGV4IC0gVGhlIEV4Y2VsLWxpa2UgaW5kZXggKGUuZy4sIFwiQTFcIikuXG4gKiBAcGFyYW0ge2FueVtdW119IHNoZWV0IC0gVGhlIHNoZWV0IGRhdGEuXG4gKiBAcmV0dXJucyB7YW55fSBUaGUgdmFsdWUgYXQgdGhlIHNwZWNpZmllZCBpbmRleCwgb3IgdW5kZWZpbmVkIGlmIG5vdCBmb3VuZC5cbiAqL1xuZnVuY3Rpb24gbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQoZXhjZWxfaW5kZXg6IHN0cmluZywgc2hlZXQ6IGFueVtdW10pOiBhbnkge1xuICAgIGNvbnN0IFtyb3csIGNvbF0gPSBzcGxpdF90b19yb3dfY29sKGV4Y2VsX2luZGV4KTtcbiAgICBpZiAocm93ID49IHNoZWV0Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gc2hlZXRbcm93XVtjb2xdO1xufVxuXG4vKipcbiAqIENvbnZlcnQgRXhjZWwtbGlrZSBjb2x1bW4gbGV0dGVycyB0byBhIGNvbHVtbiBudW1iZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gbGV0dGVycyAtIFRoZSBjb2x1bW4gbGV0dGVycyAoZS5nLiwgXCJBXCIpLlxuICogQHJldHVybnMge251bWJlcn0gVGhlIGNvbHVtbiBudW1iZXIgKDAtYmFzZWQpLlxuICovXG5mdW5jdGlvbiBleGNlbF9yb3dfdG9faW5kZXgobGV0dGVyczogc3RyaW5nKTogbnVtYmVyIHtcbiAgICBjb25zdCBsb3dlckxldHRlcnMgPSBsZXR0ZXJzLnRvTG93ZXJDYXNlKCk7XG4gICAgbGV0IHJlc3VsdDogbnVtYmVyID0gMDtcbiAgICBmb3IgKHZhciBwID0gMDsgcCA8IGxvd2VyTGV0dGVycy5sZW5ndGg7IHArKykge1xuICAgICAgICBjb25zdCBjaGFyYWN0ZXJWYWx1ZSA9XG4gICAgICAgICAgICBsb3dlckxldHRlcnMuY2hhckNvZGVBdChwKSAtIFwiYVwiLmNoYXJDb2RlQXQoMCkgKyAxO1xuICAgICAgICByZXN1bHQgPSBjaGFyYWN0ZXJWYWx1ZSArIHJlc3VsdCAqIDI2O1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0IC0gMTtcbn1cblxuLyoqXG4gKiBTYW5pdGl6ZSBhIHBob25lIG51bWJlciBieSByZW1vdmluZyB1bndhbnRlZCBjaGFyYWN0ZXJzLlxuICogQHBhcmFtIHtudW1iZXIgfCBzdHJpbmd9IG51bWJlciAtIFRoZSBwaG9uZSBudW1iZXIgdG8gc2FuaXRpemUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgc2FuaXRpemVkIHBob25lIG51bWJlci5cbiAqL1xuZnVuY3Rpb24gc2FuaXRpemVfcGhvbmVfbnVtYmVyKG51bWJlcjogbnVtYmVyIHwgc3RyaW5nKTogc3RyaW5nIHtcbiAgICBsZXQgbmV3X251bWJlciA9IG51bWJlci50b1N0cmluZygpO1xuICAgIG5ld19udW1iZXIgPSBuZXdfbnVtYmVyLnJlcGxhY2UoXCJ3aGF0c2FwcDpcIiwgXCJcIik7XG4gICAgbGV0IHRlbXBvcmFyeV9uZXdfbnVtYmVyOiBzdHJpbmcgPSBcIlwiO1xuICAgIHdoaWxlICh0ZW1wb3JhcnlfbmV3X251bWJlciAhPSBuZXdfbnVtYmVyKSB7XG4gICAgICAgIC8vIERvIHRoaXMgbXVsdGlwbGUgdGltZXMgc28gd2UgZ2V0IGFsbCArMSBhdCB0aGUgc3RhcnQgb2YgdGhlIHN0cmluZywgZXZlbiBhZnRlciBzdHJpcHBpbmcuXG4gICAgICAgIHRlbXBvcmFyeV9uZXdfbnVtYmVyID0gbmV3X251bWJlcjtcbiAgICAgICAgbmV3X251bWJlciA9IG5ld19udW1iZXIucmVwbGFjZSgvKF5cXCsxfFxcKHxcXCl8XFwufC0pL2csIFwiXCIpO1xuICAgIH1cbiAgICBjb25zdCByZXN1bHQgPSBTdHJpbmcocGFyc2VJbnQobmV3X251bWJlcikpLnBhZFN0YXJ0KDEwLCBcIjBcIik7XG4gICAgaWYgKHJlc3VsdC5sZW5ndGggPT0gMTEgJiYgcmVzdWx0WzBdID09IFwiMVwiKSB7XG4gICAgICAgIHJldHVybiByZXN1bHQuc3Vic3RyaW5nKDEpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQge1xuICAgIHJvd19jb2xfdG9fZXhjZWxfaW5kZXgsXG4gICAgZXhjZWxfcm93X3RvX2luZGV4LFxuICAgIHNhbml0aXplX3Bob25lX251bWJlcixcbiAgICBzcGxpdF90b19yb3dfY29sLFxuICAgIGxvb2t1cF9yb3dfY29sX2luX3NoZWV0LFxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImdvb2dsZWFwaXNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic21zLXNlZ21lbnRzLWNhbGN1bGF0b3JcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxuY29uc3QgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRjb25zdCBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0Y29uc3QgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdGNvbnN0IGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHRjb25zdCBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlci92YWx1ZSBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0aWYoQXJyYXkuaXNBcnJheShkZWZpbml0aW9uKSkge1xuXHRcdHZhciBpID0gMDtcblx0XHR3aGlsZShpIDwgZGVmaW5pdGlvbi5sZW5ndGgpIHtcblx0XHRcdHZhciBrZXkgPSBkZWZpbml0aW9uW2krK107XG5cdFx0XHR2YXIgYmluZGluZyA9IGRlZmluaXRpb25baSsrXTtcblx0XHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0XHRpZihiaW5kaW5nID09PSAwKSB7XG5cdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogZGVmaW5pdGlvbltpKytdIH0pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBiaW5kaW5nIH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYoYmluZGluZyA9PT0gMCkgeyBpKys7IH1cblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZihTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCJAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzXCI7XG5pbXBvcnQge1xuICAgIENvbnRleHQsXG4gICAgU2VydmVybGVzc0NhbGxiYWNrLFxuICAgIFNlcnZlcmxlc3NFdmVudE9iamVjdCxcbiAgICBTZXJ2ZXJsZXNzRnVuY3Rpb25TaWduYXR1cmUsXG59IGZyb20gXCJAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzL3R5cGVzXCI7XG5pbXBvcnQgQlZOU1BIYW5kbGVyLCB7IEJWTlNQRXZlbnQgfSBmcm9tIFwiLi9idm5zcF9oYW5kbGVyXCI7XG5pbXBvcnQgeyBIYW5kbGVyRW52aXJvbm1lbnQgfSBmcm9tIFwiLi4vZW52L2hhbmRsZXJfY29uZmlnXCI7XG5cbmNvbnN0IE5FWFRfU1RFUF9DT09LSUVfTkFNRSA9IFwiYnZuc3BfbmV4dF9zdGVwXCI7XG5cbi8qKlxuICogVHdpbGlvIFNlcnZlcmxlc3MgZnVuY3Rpb24gaGFuZGxlciBmb3IgQlZOU1AgYm90IGNvbW1hbmRzLlxuICogQHBhcmFtIHtDb250ZXh0PEhhbmRsZXJFbnZpcm9ubWVudD59IGNvbnRleHQgLSBUaGUgVHdpbGlvIHNlcnZlcmxlc3MgY29udGV4dC5cbiAqIEBwYXJhbSB7U2VydmVybGVzc0V2ZW50T2JqZWN0PEJWTlNQRXZlbnQ+fSBldmVudCAtIFRoZSBldmVudCBvYmplY3QuXG4gKiBAcGFyYW0ge1NlcnZlcmxlc3NDYWxsYmFja30gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBjb25zdCBoYW5kbGVyOiBTZXJ2ZXJsZXNzRnVuY3Rpb25TaWduYXR1cmU8XG4gICAgSGFuZGxlckVudmlyb25tZW50LFxuICAgIEJWTlNQRXZlbnRcbj4gPSBhc3luYyBmdW5jdGlvbiAoXG4gICAgY29udGV4dDogQ29udGV4dDxIYW5kbGVyRW52aXJvbm1lbnQ+LFxuICAgIGV2ZW50OiBTZXJ2ZXJsZXNzRXZlbnRPYmplY3Q8QlZOU1BFdmVudD4sXG4gICAgY2FsbGJhY2s6IFNlcnZlcmxlc3NDYWxsYmFja1xuKSB7XG4gICAgY29uc3QgaGFuZGxlciA9IG5ldyBCVk5TUEhhbmRsZXIoY29udGV4dCwgZXZlbnQpO1xuICAgIGxldCBtZXNzYWdlOiBzdHJpbmc7XG4gICAgbGV0IG5leHRfc3RlcDogc3RyaW5nID0gXCJcIjtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBoYW5kbGVyX3Jlc3BvbnNlID0gYXdhaXQgaGFuZGxlci5oYW5kbGUoKTtcbiAgICAgICAgbWVzc2FnZSA9XG4gICAgICAgICAgICBoYW5kbGVyX3Jlc3BvbnNlLnJlc3BvbnNlIHx8XG4gICAgICAgICAgICBcIlVuZXhwZWN0ZWQgcmVzdWx0IC0gbm8gcmVzcG9uc2UgZGV0ZXJtaW5lZFwiO1xuICAgICAgICBuZXh0X3N0ZXAgPSBoYW5kbGVyX3Jlc3BvbnNlLm5leHRfc3RlcCB8fCBcIlwiO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJBbiBlcnJvciBvY2N1cmVkXCIpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZSkpO1xuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICB9XG4gICAgICAgIG1lc3NhZ2UgPSBcIkFuIHVuZXhwZWN0ZWQgZXJyb3Igb2NjdXJlZC5cIjtcbiAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgbWVzc2FnZSArPSBcIlxcblwiICsgZS5tZXNzYWdlO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvclwiLCBlLnN0YWNrKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3JcIiwgZS5uYW1lKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3JcIiwgZS5tZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHJlc3BvbnNlID0gbmV3IFR3aWxpby5SZXNwb25zZSgpO1xuICAgIGNvbnN0IHR3aW1sID0gbmV3IFR3aWxpby50d2ltbC5NZXNzYWdpbmdSZXNwb25zZSgpO1xuXG4gICAgdHdpbWwubWVzc2FnZShtZXNzYWdlKTtcblxuICAgIHJlc3BvbnNlXG4gICAgICAgIC8vIEFkZCB0aGUgc3RyaW5naWZpZWQgVHdpTUwgdG8gdGhlIHJlc3BvbnNlIGJvZHlcbiAgICAgICAgLnNldEJvZHkodHdpbWwudG9TdHJpbmcoKSlcbiAgICAgICAgLy8gU2luY2Ugd2UncmUgcmV0dXJuaW5nIFR3aU1MLCB0aGUgY29udGVudCB0eXBlIG11c3QgYmUgWE1MXG4gICAgICAgIC5hcHBlbmRIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJ0ZXh0L3htbFwiKVxuICAgICAgICAuc2V0Q29va2llKE5FWFRfU1RFUF9DT09LSUVfTkFNRSwgbmV4dF9zdGVwKTtcblxuICAgIHJldHVybiBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7XG59OyJdLCJuYW1lcyI6WyJDaGVja2luVmFsdWUiLCJ1c2VyX2NyZWRzX2NvbmZpZyIsIk5TUF9FTUFJTF9ET01BSU4iLCJmaW5kX3BhdHJvbGxlcl9jb25maWciLCJTSEVFVF9JRCIsIlBIT05FX05VTUJFUl9MT09LVVBfU0hFRVQiLCJQSE9ORV9OVU1CRVJfTkFNRV9DT0xVTU4iLCJQSE9ORV9OVU1CRVJfTlVNQkVSX0NPTFVNTiIsImxvZ2luX3NoZWV0X2NvbmZpZyIsIkxPR0lOX1NIRUVUX0xPT0tVUCIsIkNIRUNLSU5fQ09VTlRfTE9PS1VQIiwiU0hFRVRfREFURV9DRUxMIiwiQ1VSUkVOVF9EQVRFX0NFTEwiLCJBUkNISVZFRF9DRUxMIiwiTkFNRV9DT0xVTU4iLCJDQVRFR09SWV9DT0xVTU4iLCJTRUNUSU9OX0RST1BET1dOX0NPTFVNTiIsIkNIRUNLSU5fRFJPUERPV05fQ09MVU1OIiwic2Vhc29uX3NoZWV0X2NvbmZpZyIsIlNFQVNPTl9TSEVFVCIsIlNFQVNPTl9TSEVFVF9OQU1FX0NPTFVNTiIsIlNFQVNPTl9TSEVFVF9EQVlTX0NPTFVNTiIsInNlY3Rpb25fY29uZmlnIiwiU0VDVElPTl9WQUxVRVMiLCJjb21wX3Bhc3Nlc19jb25maWciLCJDT01QX1BBU1NfU0hFRVQiLCJDT01QX1BBU1NfU0hFRVRfTkFNRV9DT0xVTU4iLCJDT01QX1BBU1NfU0hFRVRfREFURVNfQVZBSUxBQkxFX0NPTFVNTiIsIkNPTVBfUEFTU19TSEVFVF9VU0VEX1RPREFZX0NPTFVNTiIsIkNPTVBfUEFTU19TSEVFVF9VU0VEX1NFQVNPTl9DT0xVTU4iLCJDT01QX1BBU1NfU0hFRVRfREFURVNfU1RBUlRJTkdfQ09MVU1OIiwibWFuYWdlcl9wYXNzZXNfY29uZmlnIiwiTUFOQUdFUl9QQVNTX1NIRUVUIiwiTUFOQUdFUl9QQVNTX1NIRUVUX05BTUVfQ09MVU1OIiwiTUFOQUdFUl9QQVNTX1NIRUVUX0FWQUlMQUJMRV9DT0xVTU4iLCJNQU5BR0VSX1BBU1NfU0hFRVRfVVNFRF9UT0RBWV9DT0xVTU4iLCJNQU5BR0VSX1BBU1NfU0hFRVRfVVNFRF9TRUFTT05fQ09MVU1OIiwiTUFOQUdFUl9QQVNTX1NIRUVUX0RBVEVTX1NUQVJUSU5HX0NPTFVNTiIsImhhbmRsZXJfY29uZmlnIiwiU0NSSVBUX0lEIiwiU1lOQ19TSUQiLCJBUkNISVZFX0ZVTkNUSU9OX05BTUUiLCJSRVNFVF9GVU5DVElPTl9OQU1FIiwiVVNFX1NFUlZJQ0VfQUNDT1VOVCIsIkFDVElPTl9MT0dfU0hFRVQiLCJDSEVDS0lOX1ZBTFVFUyIsIkNPTkZJRyIsImdvb2dsZSIsIkxvZ2luU2hlZXQiLCJTZWFzb25TaGVldCIsIlVzZXJDcmVkcyIsIkNoZWNraW5WYWx1ZXMiLCJnZXRfc2VydmljZV9jcmVkZW50aWFsc19wYXRoIiwiZXhjZWxfcm93X3RvX2luZGV4Iiwic2FuaXRpemVfcGhvbmVfbnVtYmVyIiwiYnVpbGRfcGFzc2VzX3N0cmluZyIsIkNvbXBQYXNzVHlwZSIsImdldF9jb21wX3Bhc3NfZGVzY3JpcHRpb24iLCJDb21wUGFzc1NoZWV0IiwiTWFuYWdlclBhc3NTaGVldCIsIlNlY3Rpb25WYWx1ZXMiLCJORVhUX1NURVBTIiwiQVdBSVRfQ09NTUFORCIsIkFXQUlUX0NIRUNLSU4iLCJDT05GSVJNX1JFU0VUIiwiQVVUSF9SRVNFVCIsIkFXQUlUX1NFQ1RJT04iLCJBV0FJVF9QQVNTIiwiQVdBSVRfTUVTU0FHRSIsIkFXQUlUX0JST0FEQ0FTVCIsIkNPTU1BTkRTIiwiT05fRFVUWSIsIlNUQVRVUyIsIkNIRUNLSU4iLCJTRUNUSU9OX0FTU0lHTk1FTlQiLCJDT01QX1BBU1MiLCJNQU5BR0VSX1BBU1MiLCJXSEFUU0FQUCIsIk1FU1NBR0UiLCJCUk9BRENBU1QiLCJTTVNfTUFYX0xFTkdUSCIsIk1FU1NBR0VfUFJFRklYX1RFTVBMQVRFIiwiTUVTU0FHRV9QUkVGSVhfU1VGRklYIiwidmFsaWRhdGVfc21zX21lc3NhZ2UiLCJmdWxsX21lc3NhZ2UiLCJTZWdtZW50ZWRNZXNzYWdlIiwicmVxdWlyZSIsInNlZ21lbnRlZCIsIm5vbl9nc20iLCJnZXROb25Hc21DaGFyYWN0ZXJzIiwibGVuZ3RoIiwidmFsaWQiLCJyZWFzb24iLCJub25fZ3NtX2NoYXJhY3RlcnMiLCJTZXQiLCJzZWdtZW50c0NvdW50Iiwic2VnbWVudHNfY291bnQiLCJmb3JtYXRfcGhvbmVfZm9yX2Rpc3BsYXkiLCJ0ZW5fZGlnaXRzIiwic3Vic3RyaW5nIiwiQlZOU1BIYW5kbGVyIiwiU0NPUEVTIiwic21zX3JlcXVlc3QiLCJyZXN1bHRfbWVzc2FnZXMiLCJmcm9tIiwidG8iLCJib2R5IiwiYm9keV9yYXciLCJwYXRyb2xsZXIiLCJidm5zcF9uZXh0X3N0ZXAiLCJjaGVja2luX21vZGUiLCJmYXN0X2NoZWNraW4iLCJhc3NpZ25lZF9zZWN0aW9uIiwidHdpbGlvX2NsaWVudCIsInN5bmNfc2lkIiwicmVzZXRfc2NyaXB0X2lkIiwic3luY19jbGllbnQiLCJ1c2VyX2NyZWRzIiwic2VydmljZV9jcmVkcyIsInNoZWV0c19zZXJ2aWNlIiwidXNlcl9zY3JpcHRzX3NlcnZpY2UiLCJsb2dpbl9zaGVldCIsInNlYXNvbl9zaGVldCIsImNvbXBfcGFzc19zaGVldCIsIm1hbmFnZXJfcGFzc19zaGVldCIsImNoZWNraW5fdmFsdWVzIiwiY3VycmVudF9zaGVldF9kYXRlIiwiY29tYmluZWRfY29uZmlnIiwiY29uZmlnIiwic2VjdGlvbl92YWx1ZXMiLCJjb250ZXh0IiwiZXZlbnQiLCJGcm9tIiwibnVtYmVyIiwidW5kZWZpbmVkIiwidGVzdF9udW1iZXIiLCJUbyIsIkJvZHkiLCJ0b0xvd2VyQ2FzZSIsInRyaW0iLCJyZXBsYWNlIiwicmVxdWVzdCIsImNvb2tpZXMiLCJnZXRUd2lsaW9DbGllbnQiLCJlIiwiY29uc29sZSIsImxvZyIsIkRhdGUiLCJwYXJzZV9mYXN0X2NoZWNraW5fbW9kZSIsInBhcnNlZCIsInBhcnNlX2Zhc3RfY2hlY2tpbiIsImtleSIsInBhcnNlX2NoZWNraW4iLCJwYXJzZV9jaGVja2luX2Zyb21fbmV4dF9zdGVwIiwibGFzdF9zZWdtZW50Iiwic3BsaXQiLCJzbGljZSIsImJ5X2tleSIsInBhcnNlX3Bhc3NfZnJvbV9uZXh0X3N0ZXAiLCJqb2luIiwiZGVsYXkiLCJzZWNvbmRzIiwib3B0aW9uYWwiLCJQcm9taXNlIiwicmVzIiwic2V0VGltZW91dCIsInNlbmRfbWVzc2FnZSIsIm1lc3NhZ2UiLCJnZXRfdHdpbGlvX2NsaWVudCIsIm1lc3NhZ2VzIiwiY3JlYXRlIiwicHVzaCIsImhhbmRsZSIsInJlc3VsdCIsIl9oYW5kbGUiLCJyZXNwb25zZSIsIm5leHRfc3RlcCIsImxvZ291dCIsImNoZWNrX3VzZXJfY3JlZHMiLCJnZXRfbWFwcGVkX3BhdHJvbGxlciIsImF3YWl0X3Jlc3BvbnNlIiwiaGFuZGxlX2F3YWl0X2NvbW1hbmQiLCJjaGVja2luIiwic3RhcnRzV2l0aCIsIm5hbWUiLCJyZXNldF9zaGVldF9mbG93IiwidHlwZSIsImd1ZXN0X25hbWUiLCJDb21wUGFzcyIsIk1hbmFnZXJQYXNzIiwiaW5jbHVkZXMiLCJwcm9tcHRfY29tcF9tYW5hZ2VyX3Bhc3MiLCJzZWN0aW9uIiwicGFyc2Vfc2VjdGlvbiIsImFzc2lnbl9zZWN0aW9uIiwicHJvbXB0X3NlY3Rpb25fYXNzaWdubWVudCIsInNlbmRfdGV4dF9tZXNzYWdlIiwic2VuZF9icm9hZGNhc3RfbWVzc2FnZSIsInByb21wdF9jb21tYW5kIiwicGF0cm9sbGVyX25hbWUiLCJnZXRfb25fZHV0eSIsImdldF9zdGF0dXMiLCJwcm9tcHRfY2hlY2tpbiIsInBhcnNlX2Zhc3Rfc2VjdGlvbl9hc3NpZ25tZW50IiwicHJvbXB0X21lc3NhZ2UiLCJwcm9tcHRfYnJvYWRjYXN0IiwidHlwZXMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJtYXAiLCJ4Iiwic21zX2Rlc2MiLCJzZWdtZW50cyIsImxhc3RTZWdtZW50IiwicG9wIiwiZmlyc3RQYXJ0IiwibWFwX3NlY3Rpb24iLCJzZWN0aW9uX2Rlc2NyaXB0aW9uIiwiZ2V0X3NlY3Rpb25fZGVzY3JpcHRpb24iLCJnZXRfbWVzc2FnZV9wcmVmaXgiLCJzZW5kZXJfbmFtZSIsInNlbmRlcl9waG9uZSIsImZvcm1hdHRlZF9waG9uZSIsImdldF9tYXhfbWVzc2FnZV9sZW5ndGgiLCJnZXRfbG9naW5fc2hlZXQiLCJyZWNpcGllbnRzIiwiZ2V0X29uX2R1dHlfcGF0cm9sbGVycyIsIm1heF9sZW5ndGgiLCJtZXNzYWdlX3RleHQiLCJwcmVmaXgiLCJ2YWxpZGF0aW9uIiwiYmFkX2NoYXJzIiwic2lnbmVkX2luX3BhdHJvbGxlcnMiLCJwaG9uZV9tYXAiLCJnZXRfcGhvbmVfbnVtYmVyX21hcCIsInJlY2lwaWVudF9tYXAiLCJub19waG9uZV9uYW1lcyIsInBob25lIiwic2VudF9jb3VudCIsImNvcHlfc2VudF90b19zZW5kZXIiLCJmYWlsZWRfbmFtZXMiLCJkZWxpdmVyX3Ntc190b19tYXAiLCJsb2dfYWN0aW9uIiwiYWxsX2ZhaWxlZCIsImVudHJpZXMiLCJub3JtYWxpemVkX3NlbmRlciIsInNlbmRlcl9pbl9tYXAiLCJyZWNpcGllbnRfY291bnQiLCJrZXlzIiwiZ2V0X3NoZWV0c19zZXJ2aWNlIiwib3B0cyIsInNwcmVhZHNoZWV0cyIsImdldCIsInNwcmVhZHNoZWV0SWQiLCJyYW5nZSIsInZhbHVlUmVuZGVyT3B0aW9uIiwiZGF0YSIsInJvdyIsInJhd051bWJlciIsImFzc2lnbmVkU2VjdGlvbiIsIm1hcHBlZF9zZWN0aW9uIiwicmVmcmVzaCIsInBhc3NfdHlwZSIsImNhdGVnb3J5Iiwic2hlZXQiLCJnZXRfY29tcF9wYXNzX3NoZWV0IiwiZ2V0X21hbmFnZXJfcGFzc19zaGVldCIsInVzZWRfYW5kX2F2YWlsYWJsZSIsImdldF9hdmFpbGFibGVfYW5kX3VzZWRfcGFzc2VzIiwiZ2V0X3Byb21wdCIsInNldF91c2VkX2NvbXBfcGFzc2VzIiwic2hlZXRfZGF0ZSIsInRvRGF0ZVN0cmluZyIsImN1cnJlbnRfZGF0ZSIsImlzX2N1cnJlbnQiLCJnZXRfc3RhdHVzX3N0cmluZyIsImNvbXBfcGFzc19wcm9taXNlIiwibWFuYWdlcl9wYXNzX3Byb21pc2UiLCJwYXRyb2xsZXJfc3RhdHVzIiwiY2hlY2tpbkNvbHVtblNldCIsImNoZWNrZWRPdXQiLCJieV9zaGVldF9zdHJpbmciLCJzdGF0dXMiLCJ0b1N0cmluZyIsImNvbXBsZXRlZFBhdHJvbERheXMiLCJnZXRfc2Vhc29uX3NoZWV0IiwiZ2V0X3BhdHJvbGxlZF9kYXlzIiwiY29tcGxldGVkUGF0cm9sRGF5c1N0cmluZyIsImxvZ2luU2hlZXREYXRlIiwic3RhdHVzU3RyaW5nIiwidXNlZFRvZGF5Q29tcFBhc3NlcyIsInVzZWRfdG9kYXkiLCJ1c2VkVG9kYXlNYW5hZ2VyUGFzc2VzIiwidXNlZFNlYXNvbkNvbXBQYXNzZXMiLCJ1c2VkX3NlYXNvbiIsInVzZWRTZWFzb25NYW5hZ2VyUGFzc2VzIiwiYXZhaWxhYmxlQ29tcFBhc3NlcyIsImF2YWlsYWJsZSIsImF2YWlsYWJsZU1hbmFnZXJQYXNzZXMiLCJzaGVldF9uZWVkc19yZXNldCIsIkVycm9yIiwibmV3X2NoZWNraW5fdmFsdWUiLCJzaGVldHNfdmFsdWUiLCJmYXN0X2NoZWNraW5zIiwicmVzZXRfc2hlZXQiLCJzY3JpcHRfc2VydmljZSIsImdldF91c2VyX3NjcmlwdHNfc2VydmljZSIsInNob3VsZF9wZXJmb3JtX2FyY2hpdmUiLCJhcmNoaXZlZCIsInNjcmlwdHMiLCJydW4iLCJzY3JpcHRJZCIsInJlcXVlc3RCb2R5IiwiZnVuY3Rpb24iLCJnZXRfdXNlcl9jcmVkcyIsImxvYWRUb2tlbiIsImF1dGhVcmwiLCJnZXRBdXRoVXJsIiwiY2hlY2tlZF9vdXRfc2VjdGlvbiIsImxhc3Rfc2VjdGlvbnMiLCJvbl9kdXR5X3BhdHJvbGxlcnMiLCJieV9zZWN0aW9uIiwiZmlsdGVyIiwicmVkdWNlIiwicHJldiIsImN1ciIsInNob3J0X2NvZGUiLCJyZXN1bHRzIiwiYWxsX2tleXMiLCJvcmRlcmVkX3ByaW1hcnlfc2VjdGlvbnMiLCJzb3J0IiwiZmlsdGVyZWRfbGFzdF9zZWN0aW9ucyIsIm9yZGVyZWRfc2VjdGlvbnMiLCJjb25jYXQiLCJwYXRyb2xsZXJzIiwieSIsImxvY2FsZUNvbXBhcmUiLCJwYXRyb2xsZXJfc3RyaW5nIiwiZGV0YWlscyIsInRvVXBwZXJDYXNlIiwiciIsImFjdGlvbl9uYW1lIiwiYXBwZW5kIiwidmFsdWVJbnB1dE9wdGlvbiIsImRlbGV0ZVRva2VuIiwiZ2V0X3N5bmNfY2xpZW50Iiwic3luYyIsInNlcnZpY2VzIiwiZ2V0X3NlcnZpY2VfY3JlZHMiLCJhdXRoIiwiR29vZ2xlQXV0aCIsImtleUZpbGUiLCJzY29wZXMiLCJnZXRfdmFsaWRfY3JlZHMiLCJyZXF1aXJlX3VzZXJfY3JlZHMiLCJvYXV0aDJfY2xpZW50Iiwic2hlZXRzIiwidmVyc2lvbiIsInNjcmlwdCIsImZvcmNlIiwicGhvbmVfbG9va3VwIiwiZmluZF9wYXRyb2xsZXJfZnJvbV9udW1iZXIiLCJtYXBwZWRQYXRyb2xsZXIiLCJ0cnlfZmluZF9wYXRyb2xsZXIiLCJyYXdfbnVtYmVyIiwiY3VycmVudE51bWJlciIsImN1cnJlbnROYW1lIiwicm93X2NvbF90b19leGNlbF9pbmRleCIsIkdvb2dsZVNoZWV0c1NwcmVhZHNoZWV0VGFiIiwiZm9ybWF0X2RhdGVfZm9yX3NwcmVhZHNoZWV0X3ZhbHVlIiwiVXNlZEFuZEF2YWlsYWJsZVBhc3NlcyIsImluZGV4IiwiY29tcF9wYXNzX3R5cGUiLCJOdW1iZXIiLCJwYXNzX3N0cmluZyIsIlBhc3NTaGVldCIsInBhdHJvbGxlcl9yb3ciLCJnZXRfc2hlZXRfcm93X2Zvcl9wYXRyb2xsZXIiLCJuYW1lX2NvbHVtbiIsImN1cnJlbnRfZGF5X2F2YWlsYWJsZV9wYXNzZXMiLCJhdmFpbGFibGVfY29sdW1uIiwiY3VycmVudF9kYXlfdXNlZF9wYXNzZXMiLCJ1c2VkX3RvZGF5X2NvbHVtbiIsImN1cnJlbnRfc2Vhc29uX3VzZWRfcGFzc2VzIiwidXNlZF9zZWFzb25fY29sdW1uIiwicm93bnVtIiwic3RhcnRfaW5kZXgiLCJwcmlvcl9sZW5ndGgiLCJjdXJyZW50X2RhdGVfc3RyaW5nIiwibmV3X3ZhbHMiLCJ1cGRhdGVfbGVuZ3RoIiwiTWF0aCIsIm1heCIsImVuZF9pbmRleCIsInNoZWV0X25hbWUiLCJ1cGRhdGVfdmFsdWVzIiwibG9va3VwX3Jvd19jb2xfaW5fc2hlZXQiLCJzYW5pdGl6ZV9kYXRlIiwiY2hlY2tpbl9jb3VudF9zaGVldCIsInJvd3MiLCJjaGVja2luX2NvdW50IiwiZ2V0X3ZhbHVlcyIsImkiLCJwYXJzZV9wYXRyb2xsZXJfcm93IiwiZ2V0VGltZSIsImZpbmRfcGF0cm9sbGVyIiwiSlNPTiIsInN0cmluZ2lmeSIsInBhdHJvbGxlcl9zZWN0aW9uIiwibmV3X3NlY3Rpb25fdmFsdWUiLCJmaWx0ZXJfbGlzdF90b19lbmRzd2l0aF9jdXJyZW50X2RheSIsImN1cnJlbnREYXkiLCJkYXlzQmVmb3JlVG9kYXkiLCJsb2FkX2NyZWRlbnRpYWxzX2ZpbGVzIiwidmFsaWRhdGVfc2NvcGVzIiwiZG9tYWluIiwibG9hZGVkIiwiY3JlZGVudGlhbHMiLCJjbGllbnRfc2VjcmV0IiwiY2xpZW50X2lkIiwicmVkaXJlY3RfdXJpcyIsIndlYiIsIk9BdXRoMiIsInRva2VuX2tleSIsIm9hdXRoMkRvYyIsImRvY3VtZW50cyIsImZldGNoIiwidG9rZW4iLCJzZXRDcmVkZW50aWFscyIsInNpZCIsInJlbW92ZSIsImNvbXBsZXRlTG9naW4iLCJjb2RlIiwiZ2V0VG9rZW4iLCJ0b2tlbnMiLCJvYXV0aERvYyIsInVuaXF1ZU5hbWUiLCJ1cGRhdGUiLCJpZCIsImdlbmVyYXRlUmFuZG9tU3RyaW5nIiwiZG9jIiwidHRsIiwiYWNjZXNzX3R5cGUiLCJzY29wZSIsInN0YXRlIiwiZ2VuZXJhdGVBdXRoVXJsIiwiY2hhcmFjdGVycyIsImNoYXJhY3RlcnNMZW5ndGgiLCJjaGFyQXQiLCJmbG9vciIsInJhbmRvbSIsIlVzZXJDcmVkc1Njb3BlcyIsImxvb2t1cF92YWx1ZXMiLCJBcnJheSIsInNtc19kZXNjX3NwbGl0IiwibG9va3VwX3ZhbHMiLCJieV9sdiIsImJ5X2ZjIiwiY2hlY2tpblZhbHVlcyIsImNoZWNraW5WYWx1ZSIsImx2IiwiZmMiLCJjaGVja2luX2xvd2VyIiwidXNlZCIsInRvdGFsIiwidG9kYXkiLCJmb3JjZV90b2RheSIsImV4Y2VsX2RhdGVfdG9fanNfZGF0ZSIsImRhdGUiLCJzZXRVVENNaWxsaXNlY29uZHMiLCJyb3VuZCIsImNoYW5nZV90aW1lem9uZV90b19wc3QiLCJ0b1VUQ1N0cmluZyIsInN0cmlwX2RhdGV0aW1lX3RvX2RhdGUiLCJ0b0xvY2FsZURhdGVTdHJpbmciLCJ0aW1lWm9uZSIsImRhdGVzdHIiLCJwYWRTdGFydCIsImZpbHRlcl9saXN0X3RvX2VuZHN3aXRoX2RhdGUiLCJsaXN0IiwiZW5kc1dpdGgiLCJmcyIsInBhcnNlIiwicmVhZEZpbGVTeW5jIiwiUnVudGltZSIsImdldEFzc2V0cyIsInBhdGgiLCJzaGVldF9pZCIsIl9nZXRfdmFsdWVzIiwibG9va3VwX2luZGV4IiwidXBkYXRlTWUiLCJsb29rdXBSYW5nZSIsImRlc2lyZWRfc2NvcGVzIiwiZGVzaXJlZF9zY29wZSIsImVycm9yIiwic2VjdGlvbnMiLCJsb3dlcmNhc2Vfc2VjdGlvbnMiLCJpbmRleE9mIiwiY29sIiwiY29sU3RyaW5nIiwibW9kdWxvIiwiY29sTGV0dGVyIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiY2hhckNvZGVBdCIsInNwbGl0X3RvX3Jvd19jb2wiLCJleGNlbF9pbmRleCIsInJlZ2V4IiwiUmVnRXhwIiwibWF0Y2giLCJleGVjIiwicmF3X3JvdyIsImxldHRlcnMiLCJsb3dlckxldHRlcnMiLCJwIiwiY2hhcmFjdGVyVmFsdWUiLCJuZXdfbnVtYmVyIiwidGVtcG9yYXJ5X25ld19udW1iZXIiLCJwYXJzZUludCIsIk5FWFRfU1RFUF9DT09LSUVfTkFNRSIsImhhbmRsZXIiLCJjYWxsYmFjayIsImhhbmRsZXJfcmVzcG9uc2UiLCJzdGFjayIsIlR3aWxpbyIsIlJlc3BvbnNlIiwidHdpbWwiLCJNZXNzYWdpbmdSZXNwb25zZSIsInNldEJvZHkiLCJhcHBlbmRIZWFkZXIiLCJzZXRDb29raWUiXSwic291cmNlUm9vdCI6IiJ9