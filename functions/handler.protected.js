/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/file-utils.ts":
/*!***************************!*\
  !*** ./src/file-utils.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   load_credentials_files: () => (/* binding */ load_credentials_files)
/* harmony export */ });
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);

function load_credentials_files() {
    return JSON.parse(fs__WEBPACK_IMPORTED_MODULE_0__.readFileSync(Runtime.getAssets()["/credentials.json"].path)
        .toString());
}



/***/ }),

/***/ "./src/login-sheet.ts":
/*!****************************!*\
  !*** ./src/login-sheet.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoginSheet: () => (/* binding */ LoginSheet)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/util.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

function sanitize_date(date) {
    const result = (0,_util__WEBPACK_IMPORTED_MODULE_0__.strip_datetime_to_date)((0,_util__WEBPACK_IMPORTED_MODULE_0__.parse_time_to_utc)((0,_util__WEBPACK_IMPORTED_MODULE_0__.excel_date_to_js_date)(date)));
    return result;
}
class LoginSheet {
    constructor(sheets_service, context) {
        this.rows = null;
        this.number_checkins = undefined;
        this.opts = context;
        this.sheets_service = sheets_service;
        this.rows = null;
    }
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            this.rows = (yield this.sheets_service.spreadsheets.values.get({
                spreadsheetId: this.opts.SHEET_ID,
                range: this.opts.LOGIN_SHEET_LOOKUP,
                valueRenderOption: "UNFORMATTED_VALUE",
            })).data.values;
            this.number_checkins = (yield this.sheets_service.spreadsheets.values.get({
                spreadsheetId: this.opts.SHEET_ID,
                range: this.opts.NUMBER_CHECKINS_LOOKUP,
                valueRenderOption: "UNFORMATTED_VALUE",
            })).data.values[0][0];
        });
    }
    get archived() {
        const archived = (0,_util__WEBPACK_IMPORTED_MODULE_0__.lookup_row_col_in_sheet)(this.opts.ARCHIVED_CELL, this.rows);
        return ((archived === undefined && this.number_checkins === 0) ||
            archived.toLowerCase() === "yes");
    }
    get sheet_date() {
        return sanitize_date((0,_util__WEBPACK_IMPORTED_MODULE_0__.lookup_row_col_in_sheet)(this.opts.SHEET_DATE_CELL, this.rows));
    }
    get current_date() {
        return sanitize_date((0,_util__WEBPACK_IMPORTED_MODULE_0__.lookup_row_col_in_sheet)(this.opts.CURRENT_DATE_CELL, this.rows));
    }
    get is_current() {
        return this.sheet_date.getTime() === this.current_date.getTime();
    }
    try_find_patroller(name) {
        const index = this.rows.findIndex((row) => row[0] === name);
        if (index === -1) {
            return "not_found";
        }
        return (0,_util__WEBPACK_IMPORTED_MODULE_0__.parse_patroller_row)(index, this.rows[index], this.opts);
    }
    find_patroller(name) {
        const result = this.try_find_patroller(name);
        if (result === "not_found") {
            throw new Error(`Could not find ${name} in login sheet`);
        }
        return result;
    }
    get_on_duty_patrollers() {
        if (!this.is_current) {
            throw new Error("Login sheet is not current");
        }
        return this.rows.filter((x) => ["P", "C", "DR"].includes(x[1])).map((x, i) => (0,_util__WEBPACK_IMPORTED_MODULE_0__.parse_patroller_row)(i, x, this.opts)).filter((x) => x.checkin);
    }
    checkin(patroller_name, new_checkin_value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.is_current) {
                throw new Error("Login sheet is not current");
            }
            const patroller_status = this.find_patroller(patroller_name);
            console.log(`Existing status: ${JSON.stringify(patroller_status)}`);
            const sheetId = this.opts.SHEET_ID;
            const sheetName = this.opts.LOGIN_SHEET_LOOKUP.split("!")[0];
            const row = patroller_status.index + 1; // programming -> excel lookup
            const range = `${sheetName}!${this.opts.CHECKIN_DROPDOWN_COLUMN}${row}`;
            const updateMe = (yield this.sheets_service.spreadsheets.values.get({
                spreadsheetId: sheetId,
                range: range,
            })).data;
            updateMe.values = [[new_checkin_value]];
            console.log("Updating....");
            yield this.sheets_service.spreadsheets.values.update({
                spreadsheetId: sheetId,
                valueInputOption: "USER_ENTERED",
                range: updateMe.range,
                requestBody: updateMe,
            });
        });
    }
}



/***/ }),

/***/ "./src/user-creds.ts":
/*!***************************!*\
  !*** ./src/user-creds.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SCOPES: () => (/* binding */ SCOPES),
/* harmony export */   UserCreds: () => (/* binding */ UserCreds)
/* harmony export */ });
/* harmony import */ var googleapis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! googleapis */ "googleapis");
/* harmony import */ var googleapis__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(googleapis__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/util.ts");
/* harmony import */ var _file_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./file-utils */ "./src/file-utils.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



const SCOPES = [
    "https://www.googleapis.com/auth/script.projects",
    "https://www.googleapis.com/auth/spreadsheets",
];
function validate_scopes(scopes) {
    for (const desired_scope of SCOPES) {
        if (scopes === undefined || !scopes.includes(desired_scope)) {
            const error = `Missing scope ${desired_scope} in received scopes: ${scopes}`;
            console.log(error);
            throw new Error(error);
        }
    }
}
class UserCreds {
    constructor(sync_client, number, opts) {
        this.loaded = false;
        if (number === undefined || number === null) {
            throw new Error("Number is undefined");
        }
        this.number = (0,_util__WEBPACK_IMPORTED_MODULE_1__.sanitize_number)(number);
        const credentials = (0,_file_utils__WEBPACK_IMPORTED_MODULE_2__.load_credentials_files)();
        const { client_secret, client_id, redirect_uris } = credentials.web;
        this.oauth2_client = new googleapis__WEBPACK_IMPORTED_MODULE_0__.google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
        this.sync_client = sync_client;
        let domain = opts.NSP_EMAIL_DOMAIN;
        if (domain === undefined || domain === null || domain === "") {
            domain = undefined;
        }
        else {
            this.domain = domain;
        }
    }
    loadToken() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.loaded) {
                try {
                    console.log(`Looking for ${this.token_key}`);
                    const oauth2Doc = yield this.sync_client
                        .documents(this.token_key)
                        .fetch();
                    if (oauth2Doc === undefined ||
                        oauth2Doc.data == undefined ||
                        oauth2Doc.data.token === undefined) {
                        console.log(`Didn't find ${this.token_key}`);
                    }
                    else {
                        const token = oauth2Doc.data.token;
                        validate_scopes(oauth2Doc.data.scopes);
                        this.oauth2_client.setCredentials(token);
                        console.log(`Loaded token ${this.token_key}`);
                        this.loaded = true;
                    }
                }
                catch (e) {
                    console.log(`Failed to load token for ${this.token_key}.\n ${e}`);
                }
            }
            return this.loaded;
        });
    }
    get token_key() {
        return `oauth2_${this.number}`;
    }
    deleteToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const oauth2Doc = yield this.sync_client
                .documents(this.token_key)
                .fetch();
            if (oauth2Doc === undefined ||
                oauth2Doc.data == undefined ||
                oauth2Doc.data.token === undefined) {
                console.log(`Didn't find ${this.token_key}`);
                return false;
            }
            yield this.sync_client.documents(oauth2Doc.sid).remove();
            console.log(`Deleted token ${this.token_key}`);
            return true;
        });
    }
    completeLogin(code, scopes) {
        return __awaiter(this, void 0, void 0, function* () {
            validate_scopes(scopes);
            const token = yield this.oauth2_client.getToken(code);
            console.log(JSON.stringify(Object.keys(token.res)));
            console.log(JSON.stringify(token.tokens));
            this.oauth2_client.setCredentials(token.tokens);
            try {
                const oauthDoc = yield this.sync_client.documents.create({
                    data: { token: token.tokens, scopes: scopes },
                    uniqueName: this.token_key,
                });
            }
            catch (e) {
                console.log(`Exception when creating oauth. Trying to update instead...\n${e}`);
                const oauthDoc = yield this.sync_client
                    .documents(this.token_key)
                    .update({
                    data: { token: token, scopes: scopes },
                });
            }
        });
    }
    getAuthUrl() {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.generateRandomString();
            console.log(`Using nonce ${id} for ${this.number}`);
            const doc = yield this.sync_client.documents.create({
                data: { number: this.number, scopes: SCOPES },
                uniqueName: id,
                ttl: 60 * 5, // 5 minutes
            });
            console.log(`Made nonce-doc: ${JSON.stringify(doc)}`);
            const opts = {
                access_type: "offline",
                scope: SCOPES,
                state: id,
            };
            if (this.domain) {
                opts["hd"] = this.domain;
            }
            const authUrl = this.oauth2_client.generateAuthUrl(opts);
            return authUrl;
        });
    }
    generateRandomString() {
        const length = 30;
        let result = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}



/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   excel_date_to_js_date: () => (/* binding */ excel_date_to_js_date),
/* harmony export */   excel_row_to_index: () => (/* binding */ excel_row_to_index),
/* harmony export */   find_patroller_from_number: () => (/* binding */ find_patroller_from_number),
/* harmony export */   get_patrolled_days: () => (/* binding */ get_patrolled_days),
/* harmony export */   logAction: () => (/* binding */ logAction),
/* harmony export */   lookup_row_col_in_sheet: () => (/* binding */ lookup_row_col_in_sheet),
/* harmony export */   parse_patroller_row: () => (/* binding */ parse_patroller_row),
/* harmony export */   parse_time_to_utc: () => (/* binding */ parse_time_to_utc),
/* harmony export */   sanitize_number: () => (/* binding */ sanitize_number),
/* harmony export */   split_to_row_col: () => (/* binding */ split_to_row_col),
/* harmony export */   strip_datetime_to_date: () => (/* binding */ strip_datetime_to_date)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function find_patroller_from_number(raw_number, sheets_service, opts) {
    return __awaiter(this, void 0, void 0, function* () {
        const number = sanitize_number(raw_number);
        const response = yield sheets_service.spreadsheets.values.get({
            spreadsheetId: opts.SHEET_ID,
            range: opts.PHONE_NUMBER_LOOKUP_SHEET,
            valueRenderOption: "UNFORMATTED_VALUE",
        });
        if (!response.data.values) {
            throw new Error("Could not find patroller.");
        }
        const patroller = response.data.values
            .map((row) => {
            const rawNumber = row[excel_row_to_index(opts.PHONE_NUMBER_NUMBER_COLUMN)];
            const currentNumber = rawNumber != undefined ? sanitize_number(rawNumber) : rawNumber;
            const currentName = row[excel_row_to_index(opts.PHONE_NUMBER_NAME_COLUMN)];
            return { name: currentName, number: currentNumber };
        })
            .filter((patroller) => (patroller.number === number))[0];
        return patroller;
    });
}
function get_patrolled_days(patroller_name, sheets_service, opts) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield sheets_service.spreadsheets.values.get({
            spreadsheetId: opts.SHEET_ID,
            range: opts.SEASON_SHEET,
            valueRenderOption: "UNFORMATTED_VALUE",
        });
        if (!response.data.values) {
            throw new Error("Could not find patroller in season sheet.");
        }
        const datestr = new Date()
            .toLocaleDateString()
            .split("/")
            .map((x) => x.padStart(2, "0"))
            .join("");
        const patroller_row = response.data.values.filter((row) => row[excel_row_to_index(opts.SEASON_SHEET_NAME_COLUMN)] == patroller_name)[0];
        if (!patroller_row) {
            console.log("Couldn't find days for patroller" + patroller_name);
            return -1;
        }
        const currentNumber = patroller_row[excel_row_to_index(opts.SEASON_SHEET_DAYS_COLUMN)];
        const currentDay = patroller_row
            .map((x) => x === null || x === void 0 ? void 0 : x.toString())
            .filter((x) => x === null || x === void 0 ? void 0 : x.endsWith(datestr))
            .map((x) => ((x === null || x === void 0 ? void 0 : x.startsWith("H")) ? 0.5 : 1))
            .reduce((x, y, i) => x + y, 0);
        const daysBeforeToday = currentNumber - currentDay;
        return daysBeforeToday;
    });
}
function split_to_row_col(excel_index) {
    const col = excel_row_to_index(excel_index[0]);
    const row = Number(excel_index[1]) - 1;
    return [row, col];
}
function lookup_row_col_in_sheet(excel_index, sheet) {
    const [row, col] = split_to_row_col(excel_index);
    return sheet[row][col];
}
function excel_row_to_index(row) {
    return row.toLowerCase().charCodeAt(0) - "a".charCodeAt(0);
}
function sanitize_number(number) {
    let new_number = number.toString();
    new_number = new_number.replace("whatsapp:", "");
    new_number = new_number.replace(/(^\+1|\(|\)|\.|-)/g, "");
    if (new_number.startsWith("+1")) {
        new_number = new_number.substring(2);
    }
    return parseInt(new_number);
}
function parse_patroller_row(index, row, opts) {
    return {
        index: index,
        name: row[0],
        section: row[excel_row_to_index(opts.SECTION_DROPDOWN_COLUMN)],
        checkin: row[excel_row_to_index(opts.CHECKIN_DROPDOWN_COLUMN)],
    };
}
function excel_date_to_js_date(date) {
    const result = new Date(0);
    result.setUTCMilliseconds(Math.round((date - 25569) * 86400 * 1000));
    // console.log(`DEBUG: excel_date_to_js_date (${result})`)
    return result;
}
function parse_time_to_utc(date) {
    const result = new Date(date.toUTCString().replace(" GMT", " PST"));
    // console.log(`DEBUG: parse_time_to_utc (${result})`)
    return result;
}
function strip_datetime_to_date(date) {
    const result = new Date(date.toLocaleDateString("en-US", { timeZone: "America/Los_Angeles" }));
    // console.log(`DEBUG: strip_datetime_to_date (${result})`)
    return result;
}
function logAction(patroller_name, sheets_service, sheet_id, user_statistics_sheet, action) {
    return __awaiter(this, void 0, void 0, function* () {
        yield sheets_service.spreadsheets.values.append({
            spreadsheetId: sheet_id,
            range: user_statistics_sheet,
            valueInputOption: "USER_ENTERED",
            requestBody: { values: [[patroller_name, new Date(), action]] },
        });
    });
}



/***/ }),

/***/ "googleapis":
/*!*****************************!*\
  !*** external "googleapis" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("googleapis");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
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
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
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
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************************!*\
  !*** ./src/handler.protected.ts ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handler: () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var googleapis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! googleapis */ "googleapis");
/* harmony import */ var googleapis__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(googleapis__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _login_sheet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login-sheet */ "./src/login-sheet.ts");
/* harmony import */ var _user_creds__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user-creds */ "./src/user-creds.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util */ "./src/util.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




const NEXT_STEP_COOKIE_NAME = "bvnsp_checkin_next_step";
const handler = function (context, event, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const handler = new Handler(context, event);
        let message;
        let next_step = "";
        try {
            const handler_response = yield handler.handle();
            message =
                handler_response.response ||
                    "Unexpected result - no response determined";
            next_step = handler_response.next_step || "";
        }
        catch (e) {
            console.log("An error occured");
            console.log(e);
            message = "An unexpected error occured.";
            if (e instanceof Error) {
                message += "\n" + e.message;
            }
        }
        const response = new Twilio.Response();
        const twiml = new Twilio.twiml.MessagingResponse();
        twiml.message(message);
        response
            // Add the stringified TwiML to the response body
            .setBody(twiml.toString())
            // Since we're returning TwiML, the content type must be XML
            .appendHeader("Content-Type", "text/xml")
            // You can increment the count state for the next message, or any other
            // operation that makes sense for your application's needs. Remember
            // that cookies are always stored as strings
            .setCookie(NEXT_STEP_COOKIE_NAME, next_step);
        return callback(null, response);
    });
};
class CheckinValue {
    constructor(key, sheets_value, sms_desc, fast_checkins) {
        if (!(fast_checkins instanceof Array)) {
            fast_checkins = [fast_checkins];
        }
        this.key = key;
        this.sheets_value = sheets_value;
        this.sms_desc = sms_desc;
        this.fast_checkins = fast_checkins.map((x) => x.trim().toLowerCase());
        const sms_desc_split = sms_desc
            .replace(/\s+/, "-")
            .toLowerCase()
            .split("/");
        const lookup_vals = [...this.fast_checkins, ...sms_desc_split];
        this.lookup_values = new Set(lookup_vals);
    }
}
class CheckinValues {
    constructor(json_blob) {
        this.by_key = {};
        this.by_lv = {};
        this.by_fc = {};
        this.by_sheet_string = {};
        const values = [];
        for (var [key, sheets_value, sms_desc, fast_checkin] of JSON.parse(json_blob)) {
            const result = new CheckinValue(key, sheets_value, sms_desc, fast_checkin);
            this.by_key[result.key] = result;
            this.by_sheet_string[result.sheets_value] = result;
            for (const lv of result.lookup_values) {
                this.by_lv[lv] = result;
            }
            for (const fc of result.fast_checkins) {
                this.by_fc[fc] = result;
            }
        }
    }
    entries() {
        return Object.entries(this.by_key);
    }
    parse_fast_checkin(body) {
        return this.by_fc[body];
    }
    parse_checkin(body) {
        const checkin_lower = body.replace(/\s+/, "");
        return this.by_lv[checkin_lower];
    }
}
class Handler {
    constructor(context, event) {
        var _a, _b;
        this.SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
        this.result_messages = [];
        this.patroller_name = "UnknownPatroller";
        this.checkin_mode = null;
        this.fast_checkin = false;
        // Cache clients
        this.sync_client = null;
        this.user_creds = null;
        this.service_creds = null;
        this.sheets_service = null;
        this.user_scripts_service = null;
        this.login_sheet = null;
        // Determine message details from the incoming event, with fallback values
        this.sms_request = (event.From || event.number) !== undefined;
        this.from = event.From || event.number || "+16508046698";
        this.to = event.To || "+12093000096";
        this.body = (_b = (_a = event.Body) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === null || _b === void 0 ? void 0 : _b.trim().replace(/\s+/, "-");
        this.bvnsp_checkin_next_step =
            event.request.cookies.bvnsp_checkin_next_step;
        this.use_service_account = context.USE_SERVICE_ACCOUNT === "true";
        this.twilio_client = context.getTwilioClient();
        this.sync_sid = context.SYNC_SID;
        this.reset_script_id = context.SCRIPT_ID;
        this.archive_function_name = context.ARCHIVE_FUNCTION_NAME;
        this.reset_function_name = context.RESET_FUNCTION_NAME;
        this.action_log_sheet = context.USER_STATISTICS_SHEET;
        this.user_auth_opts = context;
        this.find_patroller_opts = context;
        this.login_sheet_opts = context;
        this.patroller_season_opts = context;
        this.patroller_name;
        this.checkin_values = new CheckinValues(context.CHECKIN_VALUES);
    }
    parse_fast_checkin_mode(body) {
        const parsed = this.checkin_values.parse_fast_checkin(body);
        if (parsed !== undefined) {
            this.checkin_mode = parsed.key;
            this.fast_checkin = true;
            return true;
        }
        return false;
    }
    parse_checkin(body) {
        const parsed = this.checkin_values.parse_checkin(body);
        if (parsed !== undefined) {
            this.checkin_mode = parsed.key;
            return true;
        }
        return false;
    }
    parse_checkin_from_next_step() {
        var _a;
        const last_segment = (_a = this.bvnsp_checkin_next_step) === null || _a === void 0 ? void 0 : _a.split("-").slice(-1)[0];
        if (last_segment && last_segment in this.checkin_values.by_key) {
            this.checkin_mode = last_segment;
            return true;
        }
        return false;
    }
    delay(seconds, optional = false) {
        if (optional && !this.sms_request) {
            seconds = 1 / 1000.0;
        }
        return new Promise((res) => {
            setTimeout(res, seconds);
        });
    }
    send_message(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.sms_request) {
                yield this.twilio_client.messages
                    .create({
                    to: this.from,
                    from: this.to,
                    body: message,
                })
                    .then((result) => {
                    console.log("Created message using callback");
                    console.log(result.sid);
                })
                    .catch((error) => {
                    console.error(error);
                });
            }
            else {
                this.result_messages.push(message);
            }
        });
    }
    handle() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._handle();
            if (!this.sms_request) {
                if (result === null || result === void 0 ? void 0 : result.response) {
                    this.result_messages.push(result.response);
                }
                return {
                    response: this.result_messages.join("\n###\n"),
                    next_step: result === null || result === void 0 ? void 0 : result.next_step,
                };
            }
            return result;
        });
    }
    _handle() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Received request from ${this.from} with body: ${this.body} and state ${this.bvnsp_checkin_next_step}`);
            if (this.body == "logout") {
                console.log(`Performing logout`);
                return yield this.logout();
            }
            let response;
            if (!this.use_service_account) {
                response = yield this.check_user_creds();
                if (response)
                    return response;
            }
            if (this.body == "restart") {
                return { response: "Okay. Text me again to start over..." };
            }
            response = yield this.get_patroller_name();
            if (response) {
                return response;
            }
            if ((!this.bvnsp_checkin_next_step ||
                this.bvnsp_checkin_next_step == "await-command") &&
                this.body) {
                if (this.parse_fast_checkin_mode(this.body)) {
                    console.log(`Performing fast checkin for ${this.patroller_name} with mode: ${this.checkin_mode}`);
                    return yield this.checkin();
                }
                if (["onduty", "on-duty"].includes(this.body)) {
                    console.log(`Performing get_on_duty for ${this.patroller_name}`);
                    return { response: yield this.get_on_duty() };
                }
                if (["status"].includes(this.body)) {
                    console.log(`Performing get_status for ${this.patroller_name}`);
                    return this.get_status();
                }
                if (["checkin", "check-in"].includes(this.body)) {
                    console.log(`Performing prompt_checkin for ${this.patroller_name}`);
                    return this.prompt_checkin();
                }
            }
            else if (this.bvnsp_checkin_next_step == "await-checkin" &&
                this.body) {
                if (this.parse_checkin(this.body)) {
                    console.log(`Performing regular checkin for ${this.patroller_name} with mode: ${this.checkin_mode}`);
                    return yield this.checkin();
                }
            }
            else if (((_a = this.bvnsp_checkin_next_step) === null || _a === void 0 ? void 0 : _a.startsWith("confirm-reset")) && this.body) {
                if (this.body == "yes" &&
                    this.parse_checkin_from_next_step()) {
                    console.log(`Performing reset_sheet_flow for ${this.patroller_name} with checkin mode: ${this.checkin_mode}`);
                    return ((yield this.reset_sheet_flow()) || (yield this.checkin()));
                }
            }
            else if ((_b = this.bvnsp_checkin_next_step) === null || _b === void 0 ? void 0 : _b.startsWith("auth-reset")) {
                if (this.parse_checkin_from_next_step()) {
                    console.log(`Performing reset_sheet_flow-post-auth for ${this.patroller_name} with checkin mode: ${this.checkin_mode}`);
                    return ((yield this.reset_sheet_flow()) || (yield this.checkin()));
                }
            }
            if (this.bvnsp_checkin_next_step) {
                yield this.send_message("Sorry, I didn't understand that.");
            }
            return this.prompt_command();
        });
    }
    prompt_command() {
        return {
            response: `${this.patroller_name}, I'm BVNSP Bot. 
Enter a command:
Check in / Check out / Status / On Duty
Send 'restart' at any time to begin again`,
            next_step: "await-command",
        };
    }
    prompt_checkin() {
        const types = Object.values(this.checkin_values.by_key).map((x) => x.sms_desc);
        return {
            response: `${this.patroller_name}, update patrolling status to: ${types
                .slice(0, -1)
                .join(", ")}, or ${types.slice(-1)}?`,
            next_step: "await-checkin",
        };
    }
    get_status() {
        return __awaiter(this, void 0, void 0, function* () {
            const login_sheet = yield this.get_login_sheet();
            const sheet_date = login_sheet.sheet_date.toDateString();
            const current_date = login_sheet.current_date.toDateString();
            if (!login_sheet.is_current) {
                console.log(`sheet_date: ${login_sheet.sheet_date}`);
                console.log(`current_date: ${login_sheet.current_date}`);
                return {
                    response: `Sheet is not current for today (last reset: ${sheet_date}). ${this.patroller_name} is not checked in for ${current_date}.`,
                };
            }
            const response = { response: yield this.get_status_string() };
            yield this.log_action("status");
            return response;
        });
    }
    get_status_string() {
        return __awaiter(this, void 0, void 0, function* () {
            const login_sheet = yield this.get_login_sheet();
            const patroller_status = login_sheet.find_patroller(this.patroller_name);
            const checkinColumnSet = patroller_status.checkin !== undefined &&
                patroller_status.checkin !== null;
            const checkedOut = checkinColumnSet &&
                this.checkin_values.by_sheet_string[patroller_status.checkin].key == "out";
            let status = patroller_status.checkin || "Not Present";
            if (checkedOut) {
                status = "Checked Out";
            }
            else if (checkinColumnSet) {
                let section = patroller_status.section.toString();
                if (section.length == 1) {
                    section = `Section ${section}`;
                }
                status = `${patroller_status.checkin} (${section})`;
            }
            else {
                status = "not present";
            }
            const completedPatrolDays = yield (0,_util__WEBPACK_IMPORTED_MODULE_3__.get_patrolled_days)(this.patroller_name, yield this.get_sheets_service(), this.patroller_season_opts);
            const completedPatrolDaysString = completedPatrolDays > 0 ? completedPatrolDays.toString() : "No";
            const loginSheetDate = login_sheet.sheet_date.toDateString();
            return `Status for ${this.patroller_name} on date ${loginSheetDate}: ${status}.\n${completedPatrolDaysString} completed patrol days prior to today.`;
        });
    }
    checkin() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.sheet_needs_reset()) {
                return {
                    response: `${this.patroller_name}, you are the first person to check in today. ` +
                        `I need to archive and reset the sheet before continuing. ` +
                        `Would you like me to do that? (Yes/No)`,
                    next_step: `confirm-reset-${this.checkin_mode}`,
                };
            }
            let checkin_mode;
            if (!this.checkin_mode || (checkin_mode = this.checkin_values.by_key[this.checkin_mode]) === undefined) {
                throw new Error("Checkin mode improperly set");
            }
            const login_sheet = yield this.get_login_sheet();
            const new_checkin_value = checkin_mode.sheets_value;
            yield login_sheet.checkin(this.patroller_name, new_checkin_value);
            yield ((_a = this.login_sheet) === null || _a === void 0 ? void 0 : _a.refresh());
            let response = `Updating ${this.patroller_name} with status: ${new_checkin_value}.`;
            if (!this.fast_checkin) {
                response += ` You can send '${checkin_mode.fast_checkins[0]}' as your first message for a fast ${checkin_mode.sheets_value} checkin next time.`;
            }
            response += "\n\n" + (yield this.get_status_string());
            return { response: response };
        });
    }
    sheet_needs_reset() {
        return __awaiter(this, void 0, void 0, function* () {
            const login_sheet = yield this.get_login_sheet();
            const sheet_date = login_sheet.sheet_date;
            const current_date = login_sheet.current_date;
            console.log(`sheet_date: ${sheet_date}`);
            console.log(`current_date: ${current_date}`);
            console.log(`date_is_current: ${login_sheet.is_current}`);
            return !login_sheet.is_current;
        });
    }
    reset_sheet_flow() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.check_user_creds(`${this.patroller_name}, in order to reset/archive, I need you to authorize the app.`);
            if (response)
                return {
                    response: response.response,
                    next_step: `auth-reset-${this.checkin_mode}`,
                };
            if (response) {
                return response;
            }
            return yield this.reset_sheet();
        });
    }
    reset_sheet() {
        return __awaiter(this, void 0, void 0, function* () {
            const script_service = yield this.get_user_scripts_service();
            const should_perform_archive = !(yield this.get_login_sheet()).archived;
            const message = should_perform_archive
                ? "Okay. Archiving and reseting the check in sheet. This takes about 10 seconds..."
                : "Okay. Sheet has already been archived. Performing reset. This takes about 5 seconds...";
            yield this.send_message(message);
            if (should_perform_archive) {
                console.log("Archiving...");
                yield script_service.scripts.run({
                    scriptId: this.reset_script_id,
                    requestBody: { function: this.archive_function_name },
                });
                yield this.delay(5);
                yield this.log_action("archive");
                this.login_sheet = null;
            }
            console.log("Resetting...");
            yield script_service.scripts.run({
                scriptId: this.reset_script_id,
                requestBody: { function: this.reset_function_name },
            });
            yield this.delay(5);
            yield this.log_action("reset");
            yield this.send_message("Done.");
        });
    }
    check_user_creds(prompt_message = "Hi, before you can use BVNSP bot, you must login.") {
        return __awaiter(this, void 0, void 0, function* () {
            const user_creds = this.get_user_creds();
            if (!(yield user_creds.loadToken())) {
                const authUrl = yield user_creds.getAuthUrl();
                return {
                    response: `${prompt_message} Please follow this link:
${authUrl}

Message me again when done.`,
                };
            }
        });
    }
    get_on_duty() {
        return __awaiter(this, void 0, void 0, function* () {
            const checked_out_section = "Checked Out";
            const last_sections = [checked_out_section];
            const login_sheet = yield this.get_login_sheet();
            const on_duty_patrollers = login_sheet.get_on_duty_patrollers();
            const by_section = on_duty_patrollers
                .filter((x) => x.checkin)
                .reduce((prev, cur) => {
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
            const ordered_primary_sections = Object.keys(by_section)
                .filter((x) => !last_sections.includes(x))
                .sort();
            const filtered_last_sections = last_sections.filter((x) => all_keys.includes(x));
            const ordered_sections = ordered_primary_sections.concat(filtered_last_sections);
            for (const section of ordered_sections) {
                let result = [];
                const patrollers = by_section[section].sort((x, y) => x.name.localeCompare(y.name));
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
                result.push(patrollers
                    .map((x) => patroller_string(x.name, this.checkin_values.by_sheet_string[x.checkin].key))
                    .join(", "));
                results.push(result);
            }
            return `Patrollers for ${login_sheet.sheet_date.toDateString()} (Total: ${on_duty_patrollers.length}):\n${results.map((r) => r.join("")).join("\n")}`;
        });
    }
    log_action(action_name) {
        return __awaiter(this, void 0, void 0, function* () {
            const sheets_service = yield this.get_sheets_service();
            yield sheets_service.spreadsheets.values.append({
                spreadsheetId: this.login_sheet_opts.SHEET_ID,
                range: this.action_log_sheet,
                valueInputOption: "USER_ENTERED",
                requestBody: {
                    values: [[this.patroller_name, new Date(), action_name]],
                },
            });
        });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            const user_creds = this.get_user_creds();
            yield user_creds.deleteToken();
            return {
                response: "Okay, I have removed all login session information.",
            };
        });
    }
    get_sync_client() {
        if (!this.sync_client) {
            this.sync_client = this.twilio_client.sync.services(this.sync_sid);
        }
        return this.sync_client;
    }
    get_user_creds() {
        if (!this.user_creds) {
            this.user_creds = new _user_creds__WEBPACK_IMPORTED_MODULE_2__.UserCreds(this.get_sync_client(), this.from, this.user_auth_opts);
        }
        return this.user_creds;
    }
    get_service_creds() {
        if (!this.service_creds) {
            this.service_creds = new googleapis__WEBPACK_IMPORTED_MODULE_0__.google.auth.GoogleAuth({
                keyFile: Runtime.getAssets()["/service-credentials.json"].path,
                scopes: this.SCOPES,
            });
        }
        return this.service_creds;
    }
    get_valid_creds(require_user_creds = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.use_service_account && !require_user_creds) {
                return this.get_service_creds();
            }
            const user_creds = this.get_user_creds();
            if (!(yield user_creds.loadToken())) {
                throw new Error("User is not authed.");
            }
            console.log("Using user account for service auth...");
            return user_creds.oauth2_client;
        });
    }
    get_sheets_service() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.sheets_service) {
                this.sheets_service = googleapis__WEBPACK_IMPORTED_MODULE_0__.google.sheets({
                    version: "v4",
                    auth: yield this.get_valid_creds(),
                });
            }
            return this.sheets_service;
        });
    }
    get_login_sheet() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.login_sheet) {
                const sheets_service = yield this.get_sheets_service();
                const login_sheet = new _login_sheet__WEBPACK_IMPORTED_MODULE_1__.LoginSheet(sheets_service, this.login_sheet_opts);
                yield login_sheet.refresh();
                this.login_sheet = login_sheet;
            }
            return this.login_sheet;
        });
    }
    get_user_scripts_service() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.user_scripts_service) {
                this.user_scripts_service = googleapis__WEBPACK_IMPORTED_MODULE_0__.google.script({
                    version: "v1",
                    auth: yield this.get_valid_creds(true),
                });
            }
            return this.user_scripts_service;
        });
    }
    get_patroller_name() {
        return __awaiter(this, void 0, void 0, function* () {
            const sheets_service = yield this.get_sheets_service();
            const phone_lookup = yield (0,_util__WEBPACK_IMPORTED_MODULE_3__.find_patroller_from_number)(this.from, sheets_service, this.find_patroller_opts);
            if (phone_lookup === undefined || phone_lookup === null) {
                return {
                    response: `Sorry, I couldn't find an associated BVNSP member with your phone number (${this.from})`,
                };
            }
            const login_sheet = yield this.get_login_sheet();
            const mappedPatroller = login_sheet.try_find_patroller(phone_lookup.name);
            if (mappedPatroller === "not_found") {
                return {
                    response: `Could not find patroller '${phone_lookup.name}' in login sheet. Please look at the login sheet name, and copy it to the Phone Numbers tab.`,
                };
            }
            this.patroller_name = phone_lookup.name;
        });
    }
}

})();

exports.handler = __webpack_exports__.handler;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxDQUFDO0tBQUE7SUFFSyxrQkFBa0I7O1lBQ3BCLE1BQU0sY0FBYyxHQUFHLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFDdkQsTUFBTSxZQUFZLEdBQUcsTUFBTSxpRUFBMEIsQ0FDakQsSUFBSSxDQUFDLElBQUksRUFDVCxjQUFjLEVBQ2QsSUFBSSxDQUFDLG1CQUFtQixDQUMzQixDQUFDO1lBQ0YsSUFBSSxZQUFZLEtBQUssU0FBUyxJQUFJLFlBQVksS0FBSyxJQUFJLEVBQUU7Z0JBQ3JELE9BQU87b0JBQ0gsUUFBUSxFQUFFLDZFQUE2RSxJQUFJLENBQUMsSUFBSSxHQUFHO2lCQUN0RyxDQUFDO2FBQ0w7WUFFRCxNQUFNLFdBQVcsR0FBRyxNQUFNLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUNqRCxNQUFNLGVBQWUsR0FBRyxXQUFXLENBQUMsa0JBQWtCLENBQ2xELFlBQVksQ0FBQyxJQUFJLENBQ3BCLENBQUM7WUFDRixJQUFJLGVBQWUsS0FBSyxXQUFXLEVBQUU7Z0JBQ2pDLE9BQU87b0JBQ0gsUUFBUSxFQUFFLDZCQUE2QixZQUFZLENBQUMsSUFBSSw4RkFBOEY7aUJBQ3pKLENBQUM7YUFDTDtZQUNELElBQUksQ0FBQyxjQUFjLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQztRQUM1QyxDQUFDO0tBQUE7Q0FDSiIsInNvdXJjZXMiOlsiL1VzZXJzL2pvaGFuaGVua2Vucy9SZXBvc2l0b3JpZXMvcGVyc29uYWxfcHJvamVjdHMvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvZmlsZS11dGlscy50cyIsIi9Vc2Vycy9qb2hhbmhlbmtlbnMvUmVwb3NpdG9yaWVzL3BlcnNvbmFsX3Byb2plY3RzL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL2xvZ2luLXNoZWV0LnRzIiwiL1VzZXJzL2pvaGFuaGVua2Vucy9SZXBvc2l0b3JpZXMvcGVyc29uYWxfcHJvamVjdHMvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXNlci1jcmVkcy50cyIsIi9Vc2Vycy9qb2hhbmhlbmtlbnMvUmVwb3NpdG9yaWVzL3BlcnNvbmFsX3Byb2plY3RzL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3V0aWwudHMiLCJleHRlcm5hbCBjb21tb25qcyBcImdvb2dsZWFwaXNcIiIsImV4dGVybmFsIG5vZGUtY29tbW9uanMgXCJmc1wiIiwid2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0IiwiL1VzZXJzL2pvaGFuaGVua2Vucy9SZXBvc2l0b3JpZXMvcGVyc29uYWxfcHJvamVjdHMvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvaGFuZGxlci5wcm90ZWN0ZWQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XG5mdW5jdGlvbiBsb2FkX2NyZWRlbnRpYWxzX2ZpbGVzKCkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKFxuICAgICAgICBmc1xuICAgICAgICAgICAgLnJlYWRGaWxlU3luYyhSdW50aW1lLmdldEFzc2V0cygpW1wiL2NyZWRlbnRpYWxzLmpzb25cIl0ucGF0aClcbiAgICAgICAgICAgIC50b1N0cmluZygpXG4gICAgKTtcbn1cbmV4cG9ydCB7IGxvYWRfY3JlZGVudGlhbHNfZmlsZXMgfVxuIiwiaW1wb3J0IHsgc2hlZXRzX3Y0IH0gZnJvbSBcImdvb2dsZWFwaXNcIjtcbmltcG9ydCB7XG4gICAgcGFyc2VfcGF0cm9sbGVyX3JvdyxcbiAgICBsb29rdXBfcm93X2NvbF9pbl9zaGVldCxcbiAgICBzdHJpcF9kYXRldGltZV90b19kYXRlLFxuICAgIHBhcnNlX3RpbWVfdG9fdXRjLFxuICAgIGV4Y2VsX2RhdGVfdG9fanNfZGF0ZSxcbiAgICBQYXRyb2xsZXJSb3csXG59IGZyb20gXCIuL3V0aWxcIjtcblxuZnVuY3Rpb24gc2FuaXRpemVfZGF0ZShkYXRlOiBudW1iZXIpIHtcbiAgICBjb25zdCByZXN1bHQgPSBzdHJpcF9kYXRldGltZV90b19kYXRlKFxuICAgICAgICBwYXJzZV90aW1lX3RvX3V0YyhleGNlbF9kYXRlX3RvX2pzX2RhdGUoZGF0ZSkpXG4gICAgKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG50eXBlIExPR0lOX1NIRUVUX09QVFMgPSB7XG4gICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICBMT0dJTl9TSEVFVF9MT09LVVA6IHN0cmluZztcbiAgICBOVU1CRVJfQ0hFQ0tJTlNfTE9PS1VQOiBzdHJpbmc7XG4gICAgQVJDSElWRURfQ0VMTDogc3RyaW5nO1xuICAgIFNIRUVUX0RBVEVfQ0VMTDogc3RyaW5nO1xuICAgIENVUlJFTlRfREFURV9DRUxMOiBzdHJpbmc7XG4gICAgU0VDVElPTl9EUk9QRE9XTl9DT0xVTU46IHN0cmluZztcbiAgICBDSEVDS0lOX0RST1BET1dOX0NPTFVNTjogc3RyaW5nO1xuICAgIENIRUNLSU5fVkFMVUVTOiBzdHJpbmc7XG59O1xuY2xhc3MgTG9naW5TaGVldCB7XG4gICAgc2hlZXRzX3NlcnZpY2U6IHNoZWV0c192NC5TaGVldHM7XG4gICAgb3B0czogTE9HSU5fU0hFRVRfT1BUUztcbiAgICByb3dzPzogYW55W11bXSB8IG51bGwgPSBudWxsO1xuICAgIG51bWJlcl9jaGVja2luczogbnVtYmVyIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgIGNvbnN0cnVjdG9yKHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzLCBjb250ZXh0OiBMT0dJTl9TSEVFVF9PUFRTKSB7XG4gICAgICAgIHRoaXMub3B0cyA9IGNvbnRleHQ7XG4gICAgICAgIHRoaXMuc2hlZXRzX3NlcnZpY2UgPSBzaGVldHNfc2VydmljZTtcbiAgICAgICAgdGhpcy5yb3dzID0gbnVsbDtcbiAgICB9XG4gICAgYXN5bmMgcmVmcmVzaCgpIHtcbiAgICAgICAgdGhpcy5yb3dzID0gKFxuICAgICAgICAgICAgYXdhaXQgdGhpcy5zaGVldHNfc2VydmljZS5zcHJlYWRzaGVldHMudmFsdWVzLmdldCh7XG4gICAgICAgICAgICAgICAgc3ByZWFkc2hlZXRJZDogdGhpcy5vcHRzLlNIRUVUX0lELFxuICAgICAgICAgICAgICAgIHJhbmdlOiB0aGlzLm9wdHMuTE9HSU5fU0hFRVRfTE9PS1VQLFxuICAgICAgICAgICAgICAgIHZhbHVlUmVuZGVyT3B0aW9uOiBcIlVORk9STUFUVEVEX1ZBTFVFXCIsXG4gICAgICAgICAgICB9KVxuICAgICAgICApLmRhdGEudmFsdWVzITtcbiAgICAgICAgdGhpcy5udW1iZXJfY2hlY2tpbnMgPSAoXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnNoZWV0c19zZXJ2aWNlLnNwcmVhZHNoZWV0cy52YWx1ZXMuZ2V0KHtcbiAgICAgICAgICAgICAgICBzcHJlYWRzaGVldElkOiB0aGlzLm9wdHMuU0hFRVRfSUQsXG4gICAgICAgICAgICAgICAgcmFuZ2U6IHRoaXMub3B0cy5OVU1CRVJfQ0hFQ0tJTlNfTE9PS1VQLFxuICAgICAgICAgICAgICAgIHZhbHVlUmVuZGVyT3B0aW9uOiBcIlVORk9STUFUVEVEX1ZBTFVFXCIsXG4gICAgICAgICAgICB9KVxuICAgICAgICApLmRhdGEudmFsdWVzIVswXVswXTtcbiAgICB9XG4gICAgZ2V0IGFyY2hpdmVkKCkge1xuICAgICAgICBjb25zdCBhcmNoaXZlZCA9IGxvb2t1cF9yb3dfY29sX2luX3NoZWV0KFxuICAgICAgICAgICAgdGhpcy5vcHRzLkFSQ0hJVkVEX0NFTEwsXG4gICAgICAgICAgICB0aGlzLnJvd3MhXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAoYXJjaGl2ZWQgPT09IHVuZGVmaW5lZCAmJiB0aGlzLm51bWJlcl9jaGVja2lucyA9PT0gMCkgfHxcbiAgICAgICAgICAgIGFyY2hpdmVkLnRvTG93ZXJDYXNlKCkgPT09IFwieWVzXCJcbiAgICAgICAgKTtcbiAgICB9XG4gICAgZ2V0IHNoZWV0X2RhdGUoKSB7XG4gICAgICAgIHJldHVybiBzYW5pdGl6ZV9kYXRlKFxuICAgICAgICAgICAgbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQodGhpcy5vcHRzLlNIRUVUX0RBVEVfQ0VMTCwgdGhpcy5yb3dzISlcbiAgICAgICAgKTtcbiAgICB9XG4gICAgZ2V0IGN1cnJlbnRfZGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHNhbml0aXplX2RhdGUoXG4gICAgICAgICAgICBsb29rdXBfcm93X2NvbF9pbl9zaGVldCh0aGlzLm9wdHMuQ1VSUkVOVF9EQVRFX0NFTEwsIHRoaXMucm93cyEpXG4gICAgICAgICk7XG4gICAgfVxuICAgIGdldCBpc19jdXJyZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zaGVldF9kYXRlLmdldFRpbWUoKSA9PT0gdGhpcy5jdXJyZW50X2RhdGUuZ2V0VGltZSgpO1xuICAgIH1cbiAgICB0cnlfZmluZF9wYXRyb2xsZXIobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5yb3dzIS5maW5kSW5kZXgoKHJvdykgPT4gcm93WzBdID09PSBuYW1lKTtcbiAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIFwibm90X2ZvdW5kXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhcnNlX3BhdHJvbGxlcl9yb3coaW5kZXgsIHRoaXMucm93cyFbaW5kZXhdLCB0aGlzLm9wdHMpO1xuICAgIH1cbiAgICBmaW5kX3BhdHJvbGxlcihuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy50cnlfZmluZF9wYXRyb2xsZXIobmFtZSk7XG4gICAgICAgIGlmIChyZXN1bHQgPT09IFwibm90X2ZvdW5kXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgJHtuYW1lfSBpbiBsb2dpbiBzaGVldGApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgZ2V0X29uX2R1dHlfcGF0cm9sbGVycygpOiBQYXRyb2xsZXJSb3dbXSB7XG4gICAgICAgIGlmKCF0aGlzLmlzX2N1cnJlbnQpe1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTG9naW4gc2hlZXQgaXMgbm90IGN1cnJlbnRcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucm93cyEuZmlsdGVyKCh4KSA9PiBbXCJQXCIsIFwiQ1wiLCBcIkRSXCJdLmluY2x1ZGVzKHhbMV0pKS5tYXAoXG4gICAgICAgICAgICAoeCwgaSkgPT4gcGFyc2VfcGF0cm9sbGVyX3JvdyhpLCB4LCB0aGlzLm9wdHMpXG4gICAgICAgICkuZmlsdGVyKCh4KSA9PiB4LmNoZWNraW4pO1xuICAgIH1cblxuICAgIGFzeW5jIGNoZWNraW4ocGF0cm9sbGVyX25hbWU6IHN0cmluZywgbmV3X2NoZWNraW5fdmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAoIXRoaXMuaXNfY3VycmVudCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTG9naW4gc2hlZXQgaXMgbm90IGN1cnJlbnRcIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGF0cm9sbGVyX3N0YXR1cyA9IHRoaXMuZmluZF9wYXRyb2xsZXIocGF0cm9sbGVyX25hbWUpO1xuICAgICAgICBjb25zb2xlLmxvZyhgRXhpc3Rpbmcgc3RhdHVzOiAke0pTT04uc3RyaW5naWZ5KHBhdHJvbGxlcl9zdGF0dXMpfWApO1xuXG4gICAgICAgIGNvbnN0IHNoZWV0SWQgPSB0aGlzLm9wdHMuU0hFRVRfSUQ7XG4gICAgICAgIGNvbnN0IHNoZWV0TmFtZSA9IHRoaXMub3B0cy5MT0dJTl9TSEVFVF9MT09LVVAuc3BsaXQoXCIhXCIpWzBdO1xuICAgICAgICBjb25zdCByb3cgPSBwYXRyb2xsZXJfc3RhdHVzLmluZGV4ICsgMTsgLy8gcHJvZ3JhbW1pbmcgLT4gZXhjZWwgbG9va3VwXG4gICAgICAgIGNvbnN0IHJhbmdlID0gYCR7c2hlZXROYW1lfSEke3RoaXMub3B0cy5DSEVDS0lOX0RST1BET1dOX0NPTFVNTn0ke3Jvd31gO1xuICAgICAgICBjb25zdCB1cGRhdGVNZSA9IChcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuc2hlZXRzX3NlcnZpY2Uuc3ByZWFkc2hlZXRzLnZhbHVlcy5nZXQoe1xuICAgICAgICAgICAgICAgIHNwcmVhZHNoZWV0SWQ6IHNoZWV0SWQsXG4gICAgICAgICAgICAgICAgcmFuZ2U6IHJhbmdlLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgKS5kYXRhO1xuXG4gICAgICAgIHVwZGF0ZU1lLnZhbHVlcyA9IFtbbmV3X2NoZWNraW5fdmFsdWVdXTtcbiAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGluZy4uLi5cIik7XG4gICAgICAgIGF3YWl0IHRoaXMuc2hlZXRzX3NlcnZpY2Uuc3ByZWFkc2hlZXRzLnZhbHVlcy51cGRhdGUoe1xuICAgICAgICAgICAgc3ByZWFkc2hlZXRJZDogc2hlZXRJZCxcbiAgICAgICAgICAgIHZhbHVlSW5wdXRPcHRpb246IFwiVVNFUl9FTlRFUkVEXCIsXG4gICAgICAgICAgICByYW5nZTogdXBkYXRlTWUucmFuZ2UhLFxuICAgICAgICAgICAgcmVxdWVzdEJvZHk6IHVwZGF0ZU1lLFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCB7IExvZ2luU2hlZXQsIExPR0lOX1NIRUVUX09QVFMgfTtcbiIsImltcG9ydCB7IGdvb2dsZSB9IGZyb20gXCJnb29nbGVhcGlzXCI7XG5pbXBvcnQgeyBHZW5lcmF0ZUF1dGhVcmxPcHRzIH0gZnJvbSBcImdvb2dsZS1hdXRoLWxpYnJhcnlcIjtcbmltcG9ydCB7IE9BdXRoMkNsaWVudCB9IGZyb20gXCJnb29nbGVhcGlzLWNvbW1vblwiO1xuaW1wb3J0IHsgc2FuaXRpemVfbnVtYmVyIH0gZnJvbSBcIi4vdXRpbFwiO1xuaW1wb3J0IHsgbG9hZF9jcmVkZW50aWFsc19maWxlcyB9IGZyb20gXCIuL2ZpbGUtdXRpbHNcIjtcbmltcG9ydCB7IFNlcnZpY2VDb250ZXh0IH0gZnJvbSBcIkB0d2lsaW8tbGFicy9zZXJ2ZXJsZXNzLXJ1bnRpbWUtdHlwZXMvdHlwZXNcIjtcblxuY29uc3QgU0NPUEVTID0gW1xuICAgIFwiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9zY3JpcHQucHJvamVjdHNcIixcbiAgICBcImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvc3ByZWFkc2hlZXRzXCIsXG5dO1xuXG5mdW5jdGlvbiB2YWxpZGF0ZV9zY29wZXMoc2NvcGVzOiBzdHJpbmdbXSkge1xuICAgIGZvciAoY29uc3QgZGVzaXJlZF9zY29wZSBvZiBTQ09QRVMpIHtcbiAgICAgICAgaWYgKHNjb3BlcyA9PT0gdW5kZWZpbmVkIHx8ICFzY29wZXMuaW5jbHVkZXMoZGVzaXJlZF9zY29wZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gYE1pc3Npbmcgc2NvcGUgJHtkZXNpcmVkX3Njb3BlfSBpbiByZWNlaXZlZCBzY29wZXM6ICR7c2NvcGVzfWA7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG50eXBlIFVTRVJfQ1JFRFNfT1BUUyA9IHtcbiAgICBOU1BfRU1BSUxfRE9NQUlOOiBzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsO1xufTtcbmNsYXNzIFVzZXJDcmVkcyB7XG4gICAgbnVtYmVyOiBudW1iZXI7XG4gICAgb2F1dGgyX2NsaWVudDogT0F1dGgyQ2xpZW50O1xuICAgIHN5bmNfY2xpZW50OiBTZXJ2aWNlQ29udGV4dDtcbiAgICBkb21haW4/OiBzdHJpbmc7XG4gICAgbG9hZGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHN5bmNfY2xpZW50OiBTZXJ2aWNlQ29udGV4dCxcbiAgICAgICAgbnVtYmVyOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgICAgIG9wdHM6IFVTRVJfQ1JFRFNfT1BUU1xuICAgICkge1xuICAgICAgICBpZiAobnVtYmVyID09PSB1bmRlZmluZWQgfHwgbnVtYmVyID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOdW1iZXIgaXMgdW5kZWZpbmVkXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubnVtYmVyID0gc2FuaXRpemVfbnVtYmVyKG51bWJlcik7XG5cbiAgICAgICAgY29uc3QgY3JlZGVudGlhbHMgPSBsb2FkX2NyZWRlbnRpYWxzX2ZpbGVzKCk7XG4gICAgICAgIGNvbnN0IHsgY2xpZW50X3NlY3JldCwgY2xpZW50X2lkLCByZWRpcmVjdF91cmlzIH0gPSBjcmVkZW50aWFscy53ZWI7XG4gICAgICAgIHRoaXMub2F1dGgyX2NsaWVudCA9IG5ldyBnb29nbGUuYXV0aC5PQXV0aDIoXG4gICAgICAgICAgICBjbGllbnRfaWQsXG4gICAgICAgICAgICBjbGllbnRfc2VjcmV0LFxuICAgICAgICAgICAgcmVkaXJlY3RfdXJpc1swXVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN5bmNfY2xpZW50ID0gc3luY19jbGllbnQ7XG4gICAgICAgIGxldCBkb21haW4gPSBvcHRzLk5TUF9FTUFJTF9ET01BSU47XG4gICAgICAgIGlmIChkb21haW4gPT09IHVuZGVmaW5lZCB8fCBkb21haW4gPT09IG51bGwgfHwgZG9tYWluID09PSBcIlwiKSB7XG4gICAgICAgICAgICBkb21haW4gPSB1bmRlZmluZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRvbWFpbiA9IGRvbWFpbjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGxvYWRUb2tlbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmxvYWRlZCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgTG9va2luZyBmb3IgJHt0aGlzLnRva2VuX2tleX1gKTtcbiAgICAgICAgICAgICAgICBjb25zdCBvYXV0aDJEb2MgPSBhd2FpdCB0aGlzLnN5bmNfY2xpZW50XG4gICAgICAgICAgICAgICAgICAgIC5kb2N1bWVudHModGhpcy50b2tlbl9rZXkpXG4gICAgICAgICAgICAgICAgICAgIC5mZXRjaCgpO1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgb2F1dGgyRG9jID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICAgICAgb2F1dGgyRG9jLmRhdGEgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgICAgIG9hdXRoMkRvYy5kYXRhLnRva2VuID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYERpZG4ndCBmaW5kICR7dGhpcy50b2tlbl9rZXl9YCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBvYXV0aDJEb2MuZGF0YS50b2tlbjtcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGVfc2NvcGVzKG9hdXRoMkRvYy5kYXRhLnNjb3Blcyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2F1dGgyX2NsaWVudC5zZXRDcmVkZW50aWFscyh0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBMb2FkZWQgdG9rZW4gJHt0aGlzLnRva2VuX2tleX1gKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICAgICAgYEZhaWxlZCB0byBsb2FkIHRva2VuIGZvciAke3RoaXMudG9rZW5fa2V5fS5cXG4gJHtlfWBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRlZDtcbiAgICB9XG5cbiAgICBnZXQgdG9rZW5fa2V5KCkge1xuICAgICAgICByZXR1cm4gYG9hdXRoMl8ke3RoaXMubnVtYmVyfWA7XG4gICAgfVxuXG4gICAgYXN5bmMgZGVsZXRlVG9rZW4oKSB7XG4gICAgICAgIGNvbnN0IG9hdXRoMkRvYyA9IGF3YWl0IHRoaXMuc3luY19jbGllbnRcbiAgICAgICAgICAgIC5kb2N1bWVudHModGhpcy50b2tlbl9rZXkpXG4gICAgICAgICAgICAuZmV0Y2goKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgb2F1dGgyRG9jID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIG9hdXRoMkRvYy5kYXRhID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgb2F1dGgyRG9jLmRhdGEudG9rZW4gPT09IHVuZGVmaW5lZFxuICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBEaWRuJ3QgZmluZCAke3RoaXMudG9rZW5fa2V5fWApO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHRoaXMuc3luY19jbGllbnQuZG9jdW1lbnRzKG9hdXRoMkRvYy5zaWQpLnJlbW92ZSgpO1xuICAgICAgICBjb25zb2xlLmxvZyhgRGVsZXRlZCB0b2tlbiAke3RoaXMudG9rZW5fa2V5fWApO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBhc3luYyBjb21wbGV0ZUxvZ2luKGNvZGU6IHN0cmluZywgc2NvcGVzOiBzdHJpbmdbXSkge1xuICAgICAgICB2YWxpZGF0ZV9zY29wZXMoc2NvcGVzKTtcbiAgICAgICAgY29uc3QgdG9rZW4gPSBhd2FpdCB0aGlzLm9hdXRoMl9jbGllbnQuZ2V0VG9rZW4oY29kZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KE9iamVjdC5rZXlzKHRva2VuLnJlcyEpKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRva2VuLnRva2VucykpO1xuICAgICAgICB0aGlzLm9hdXRoMl9jbGllbnQuc2V0Q3JlZGVudGlhbHModG9rZW4udG9rZW5zKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IG9hdXRoRG9jID0gYXdhaXQgdGhpcy5zeW5jX2NsaWVudC5kb2N1bWVudHMuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICBkYXRhOiB7IHRva2VuOiB0b2tlbi50b2tlbnMsIHNjb3Blczogc2NvcGVzIH0sXG4gICAgICAgICAgICAgICAgdW5pcXVlTmFtZTogdGhpcy50b2tlbl9rZXksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgYEV4Y2VwdGlvbiB3aGVuIGNyZWF0aW5nIG9hdXRoLiBUcnlpbmcgdG8gdXBkYXRlIGluc3RlYWQuLi5cXG4ke2V9YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IG9hdXRoRG9jID0gYXdhaXQgdGhpcy5zeW5jX2NsaWVudFxuICAgICAgICAgICAgICAgIC5kb2N1bWVudHModGhpcy50b2tlbl9rZXkpXG4gICAgICAgICAgICAgICAgLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHsgdG9rZW46IHRva2VuLCBzY29wZXM6IHNjb3BlcyB9LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0QXV0aFVybCgpIHtcbiAgICAgICAgY29uc3QgaWQgPSB0aGlzLmdlbmVyYXRlUmFuZG9tU3RyaW5nKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBVc2luZyBub25jZSAke2lkfSBmb3IgJHt0aGlzLm51bWJlcn1gKTtcbiAgICAgICAgY29uc3QgZG9jID0gYXdhaXQgdGhpcy5zeW5jX2NsaWVudC5kb2N1bWVudHMuY3JlYXRlKHtcbiAgICAgICAgICAgIGRhdGE6IHsgbnVtYmVyOiB0aGlzLm51bWJlciwgc2NvcGVzOiBTQ09QRVMgfSxcbiAgICAgICAgICAgIHVuaXF1ZU5hbWU6IGlkLFxuICAgICAgICAgICAgdHRsOiA2MCAqIDUsIC8vIDUgbWludXRlc1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2coYE1hZGUgbm9uY2UtZG9jOiAke0pTT04uc3RyaW5naWZ5KGRvYyl9YCk7XG5cbiAgICAgICAgY29uc3Qgb3B0czogR2VuZXJhdGVBdXRoVXJsT3B0cyA9IHtcbiAgICAgICAgICAgIGFjY2Vzc190eXBlOiBcIm9mZmxpbmVcIixcbiAgICAgICAgICAgIHNjb3BlOiBTQ09QRVMsXG4gICAgICAgICAgICBzdGF0ZTogaWQsXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLmRvbWFpbikge1xuICAgICAgICAgICAgb3B0c1tcImhkXCJdID0gdGhpcy5kb21haW47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBhdXRoVXJsID0gdGhpcy5vYXV0aDJfY2xpZW50LmdlbmVyYXRlQXV0aFVybChvcHRzKTtcbiAgICAgICAgcmV0dXJuIGF1dGhVcmw7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVSYW5kb21TdHJpbmcoKSB7XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IDMwO1xuICAgICAgICBsZXQgcmVzdWx0ID0gXCJcIjtcbiAgICAgICAgY29uc3QgY2hhcmFjdGVycyA9XG4gICAgICAgICAgICBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5XCI7XG4gICAgICAgIGNvbnN0IGNoYXJhY3RlcnNMZW5ndGggPSBjaGFyYWN0ZXJzLmxlbmd0aDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0ICs9IGNoYXJhY3RlcnMuY2hhckF0KFxuICAgICAgICAgICAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJhY3RlcnNMZW5ndGgpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuXG5leHBvcnQgeyBVc2VyQ3JlZHMsIFNDT1BFUywgVVNFUl9DUkVEU19PUFRTIH07XG4iLCJpbXBvcnQgeyBnb29nbGUsIHNoZWV0c192NCB9IGZyb20gXCJnb29nbGVhcGlzXCI7XG5cbnR5cGUgRklORF9QQVRST0xMRVJfT1BUUyA9IHtcbiAgICBTSEVFVF9JRDogc3RyaW5nO1xuICAgIFBIT05FX05VTUJFUl9MT09LVVBfU0hFRVQ6IHN0cmluZztcbiAgICBQSE9ORV9OVU1CRVJfTlVNQkVSX0NPTFVNTjogc3RyaW5nO1xuICAgIFBIT05FX05VTUJFUl9OQU1FX0NPTFVNTjogc3RyaW5nO1xufTtcbmFzeW5jIGZ1bmN0aW9uIGZpbmRfcGF0cm9sbGVyX2Zyb21fbnVtYmVyKFxuICAgIHJhd19udW1iZXI6IHN0cmluZyxcbiAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyxcbiAgICBvcHRzOiBGSU5EX1BBVFJPTExFUl9PUFRTXG4pIHtcbiAgICBjb25zdCBudW1iZXIgPSBzYW5pdGl6ZV9udW1iZXIocmF3X251bWJlcik7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBzaGVldHNfc2VydmljZS5zcHJlYWRzaGVldHMudmFsdWVzLmdldCh7XG4gICAgICAgIHNwcmVhZHNoZWV0SWQ6IG9wdHMuU0hFRVRfSUQsXG4gICAgICAgIHJhbmdlOiBvcHRzLlBIT05FX05VTUJFUl9MT09LVVBfU0hFRVQsXG4gICAgICAgIHZhbHVlUmVuZGVyT3B0aW9uOiBcIlVORk9STUFUVEVEX1ZBTFVFXCIsXG4gICAgfSk7XG4gICAgaWYgKCFyZXNwb25zZS5kYXRhLnZhbHVlcykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgZmluZCBwYXRyb2xsZXIuXCIpO1xuICAgIH1cbiAgICBjb25zdCBwYXRyb2xsZXIgPSByZXNwb25zZS5kYXRhLnZhbHVlc1xuICAgICAgICAubWFwKChyb3cpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJhd051bWJlciA9XG4gICAgICAgICAgICAgICAgcm93W2V4Y2VsX3Jvd190b19pbmRleChvcHRzLlBIT05FX05VTUJFUl9OVU1CRVJfQ09MVU1OKV07XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50TnVtYmVyID1cbiAgICAgICAgICAgICAgICByYXdOdW1iZXIgIT0gdW5kZWZpbmVkID8gc2FuaXRpemVfbnVtYmVyKHJhd051bWJlcikgOiByYXdOdW1iZXI7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50TmFtZSA9XG4gICAgICAgICAgICAgICAgcm93W2V4Y2VsX3Jvd190b19pbmRleChvcHRzLlBIT05FX05VTUJFUl9OQU1FX0NPTFVNTildO1xuICAgICAgICAgICAgcmV0dXJuIHsgbmFtZTogY3VycmVudE5hbWUsIG51bWJlcjogY3VycmVudE51bWJlciB9O1xuICAgICAgICB9KVxuICAgICAgICAuZmlsdGVyKChwYXRyb2xsZXIpID0+IChwYXRyb2xsZXIubnVtYmVyID09PSBudW1iZXIpKVswXTtcbiAgICByZXR1cm4gcGF0cm9sbGVyO1xufVxudHlwZSBQQVRST0xMRVJfU0VBU09OX09QVFMgPSB7XG4gICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICBTRUFTT05fU0hFRVQ6IHN0cmluZztcbiAgICBTRUFTT05fU0hFRVRfREFZU19DT0xVTU46IHN0cmluZztcbiAgICBTRUFTT05fU0hFRVRfTkFNRV9DT0xVTU46IHN0cmluZztcbn07XG5cbmFzeW5jIGZ1bmN0aW9uIGdldF9wYXRyb2xsZWRfZGF5cyhcbiAgICBwYXRyb2xsZXJfbmFtZTogc3RyaW5nLFxuICAgIHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzLFxuICAgIG9wdHM6IFBBVFJPTExFUl9TRUFTT05fT1BUU1xuKSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBzaGVldHNfc2VydmljZS5zcHJlYWRzaGVldHMudmFsdWVzLmdldCh7XG4gICAgICAgIHNwcmVhZHNoZWV0SWQ6IG9wdHMuU0hFRVRfSUQsXG4gICAgICAgIHJhbmdlOiBvcHRzLlNFQVNPTl9TSEVFVCxcbiAgICAgICAgdmFsdWVSZW5kZXJPcHRpb246IFwiVU5GT1JNQVRURURfVkFMVUVcIixcbiAgICB9KTtcbiAgICBpZiAoIXJlc3BvbnNlLmRhdGEudmFsdWVzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBmaW5kIHBhdHJvbGxlciBpbiBzZWFzb24gc2hlZXQuXCIpO1xuICAgIH1cbiAgICBjb25zdCBkYXRlc3RyID0gbmV3IERhdGUoKVxuICAgICAgICAudG9Mb2NhbGVEYXRlU3RyaW5nKClcbiAgICAgICAgLnNwbGl0KFwiL1wiKVxuICAgICAgICAubWFwKCh4KSA9PiB4LnBhZFN0YXJ0KDIsIFwiMFwiKSlcbiAgICAgICAgLmpvaW4oXCJcIik7XG4gICAgY29uc3QgcGF0cm9sbGVyX3JvdyA9IHJlc3BvbnNlLmRhdGEudmFsdWVzLmZpbHRlcigocm93KSA9PiByb3dbZXhjZWxfcm93X3RvX2luZGV4KG9wdHMuU0VBU09OX1NIRUVUX05BTUVfQ09MVU1OKV0gPT0gcGF0cm9sbGVyX25hbWUpWzBdO1xuXG4gICAgaWYoIXBhdHJvbGxlcl9yb3cpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIkNvdWxkbid0IGZpbmQgZGF5cyBmb3IgcGF0cm9sbGVyXCIgKyBwYXRyb2xsZXJfbmFtZSlcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIGNvbnN0IGN1cnJlbnROdW1iZXIgPVxuICAgICAgICBwYXRyb2xsZXJfcm93W2V4Y2VsX3Jvd190b19pbmRleChvcHRzLlNFQVNPTl9TSEVFVF9EQVlTX0NPTFVNTildO1xuICAgIGNvbnN0IGN1cnJlbnREYXkgPSBwYXRyb2xsZXJfcm93XG4gICAgICAgIC5tYXAoKHgpID0+IHg/LnRvU3RyaW5nKCkpXG4gICAgICAgIC5maWx0ZXIoKHgpID0+IHg/LmVuZHNXaXRoKGRhdGVzdHIpKVxuICAgICAgICAubWFwKCh4KSA9PiAoeD8uc3RhcnRzV2l0aChcIkhcIikgPyAwLjUgOiAxKSlcbiAgICAgICAgLnJlZHVjZSgoeCwgeSwgaSkgPT4geCArIHksIDApO1xuICAgIFxuICAgIGNvbnN0IGRheXNCZWZvcmVUb2RheSA9IGN1cnJlbnROdW1iZXIgLSBjdXJyZW50RGF5O1xuICAgIHJldHVybiBkYXlzQmVmb3JlVG9kYXk7XG59XG5cbmZ1bmN0aW9uIHNwbGl0X3RvX3Jvd19jb2woZXhjZWxfaW5kZXg6IHN0cmluZykge1xuICAgIGNvbnN0IGNvbCA9IGV4Y2VsX3Jvd190b19pbmRleChleGNlbF9pbmRleFswXSk7XG4gICAgY29uc3Qgcm93ID0gTnVtYmVyKGV4Y2VsX2luZGV4WzFdKSAtIDE7XG4gICAgcmV0dXJuIFtyb3csIGNvbF07XG59XG5cbmZ1bmN0aW9uIGxvb2t1cF9yb3dfY29sX2luX3NoZWV0KGV4Y2VsX2luZGV4OiBzdHJpbmcsIHNoZWV0OiBhbnlbXVtdKSB7XG4gICAgY29uc3QgW3JvdywgY29sXSA9IHNwbGl0X3RvX3Jvd19jb2woZXhjZWxfaW5kZXgpO1xuICAgIHJldHVybiBzaGVldFtyb3ddW2NvbF07XG59XG5cbmZ1bmN0aW9uIGV4Y2VsX3Jvd190b19pbmRleChyb3c6IHN0cmluZykge1xuICAgIHJldHVybiByb3cudG9Mb3dlckNhc2UoKS5jaGFyQ29kZUF0KDApIC0gXCJhXCIuY2hhckNvZGVBdCgwKTtcbn1cblxuZnVuY3Rpb24gc2FuaXRpemVfbnVtYmVyKG51bWJlcjogbnVtYmVyIHwgc3RyaW5nKSB7XG4gICAgbGV0IG5ld19udW1iZXIgPSBudW1iZXIudG9TdHJpbmcoKTtcbiAgICBuZXdfbnVtYmVyID0gbmV3X251bWJlci5yZXBsYWNlKFwid2hhdHNhcHA6XCIsIFwiXCIpO1xuICAgIG5ld19udW1iZXIgPSBuZXdfbnVtYmVyLnJlcGxhY2UoLyheXFwrMXxcXCh8XFwpfFxcLnwtKS9nLCBcIlwiKTtcbiAgICBpZiAobmV3X251bWJlci5zdGFydHNXaXRoKFwiKzFcIikpIHtcbiAgICAgICAgbmV3X251bWJlciA9IG5ld19udW1iZXIuc3Vic3RyaW5nKDIpO1xuICAgIH1cbiAgICByZXR1cm4gcGFyc2VJbnQobmV3X251bWJlcik7XG59XG5cbnR5cGUgUEFUUk9MTEVSX1JPV19PUFRTID0ge1xuICAgIFNFQ1RJT05fRFJPUERPV05fQ09MVU1OOiBzdHJpbmc7XG4gICAgQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU46IHN0cmluZztcbn07XG50eXBlIFBhdHJvbGxlclJvdyA9IHtcbiAgICBpbmRleDogbnVtYmVyLFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBzZWN0aW9uOiBzdHJpbmcsXG4gICAgY2hlY2tpbjogc3RyaW5nXG59XG5mdW5jdGlvbiBwYXJzZV9wYXRyb2xsZXJfcm93KFxuICAgIGluZGV4OiBudW1iZXIsXG4gICAgcm93OiBzdHJpbmdbXSxcbiAgICBvcHRzOiBQQVRST0xMRVJfUk9XX09QVFNcbik6IFBhdHJvbGxlclJvdyB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICBuYW1lOiByb3dbMF0sXG4gICAgICAgIHNlY3Rpb246IHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5TRUNUSU9OX0RST1BET1dOX0NPTFVNTildLFxuICAgICAgICBjaGVja2luOiByb3dbZXhjZWxfcm93X3RvX2luZGV4KG9wdHMuQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU4pXSxcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBleGNlbF9kYXRlX3RvX2pzX2RhdGUoZGF0ZTogbnVtYmVyKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IERhdGUoMCk7XG4gICAgcmVzdWx0LnNldFVUQ01pbGxpc2Vjb25kcyhNYXRoLnJvdW5kKChkYXRlIC0gMjU1NjkpICogODY0MDAgKiAxMDAwKSk7XG4gICAgLy8gY29uc29sZS5sb2coYERFQlVHOiBleGNlbF9kYXRlX3RvX2pzX2RhdGUgKCR7cmVzdWx0fSlgKVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIHBhcnNlX3RpbWVfdG9fdXRjKGRhdGU6IERhdGUpIHtcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgRGF0ZShkYXRlLnRvVVRDU3RyaW5nKCkucmVwbGFjZShcIiBHTVRcIiwgXCIgUFNUXCIpKTtcbiAgICAvLyBjb25zb2xlLmxvZyhgREVCVUc6IHBhcnNlX3RpbWVfdG9fdXRjICgke3Jlc3VsdH0pYClcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBzdHJpcF9kYXRldGltZV90b19kYXRlKGRhdGU6IERhdGUpIHtcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgRGF0ZShcbiAgICAgICAgZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoXCJlbi1VU1wiLCB7IHRpbWVab25lOiBcIkFtZXJpY2EvTG9zX0FuZ2VsZXNcIiB9KVxuICAgICk7XG4gICAgLy8gY29uc29sZS5sb2coYERFQlVHOiBzdHJpcF9kYXRldGltZV90b19kYXRlICgke3Jlc3VsdH0pYClcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5hc3luYyBmdW5jdGlvbiBsb2dBY3Rpb24oXG4gICAgcGF0cm9sbGVyX25hbWU6IHN0cmluZyxcbiAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyxcbiAgICBzaGVldF9pZDogc3RyaW5nLFxuICAgIHVzZXJfc3RhdGlzdGljc19zaGVldDogc3RyaW5nLFxuICAgIGFjdGlvbjogc3RyaW5nXG4pIHtcbiAgICBhd2FpdCBzaGVldHNfc2VydmljZS5zcHJlYWRzaGVldHMudmFsdWVzLmFwcGVuZCh7XG4gICAgICAgIHNwcmVhZHNoZWV0SWQ6IHNoZWV0X2lkLFxuICAgICAgICByYW5nZTogdXNlcl9zdGF0aXN0aWNzX3NoZWV0LFxuICAgICAgICB2YWx1ZUlucHV0T3B0aW9uOiBcIlVTRVJfRU5URVJFRFwiLFxuICAgICAgICByZXF1ZXN0Qm9keTogeyB2YWx1ZXM6IFtbcGF0cm9sbGVyX25hbWUsIG5ldyBEYXRlKCksIGFjdGlvbl1dIH0sXG4gICAgfSk7XG59XG5cbmV4cG9ydCB7XG4gICAgZXhjZWxfcm93X3RvX2luZGV4LFxuICAgIHBhcnNlX3BhdHJvbGxlcl9yb3csXG4gICAgZXhjZWxfZGF0ZV90b19qc19kYXRlLFxuICAgIHBhcnNlX3RpbWVfdG9fdXRjLFxuICAgIHN0cmlwX2RhdGV0aW1lX3RvX2RhdGUsXG4gICAgc2FuaXRpemVfbnVtYmVyLFxuICAgIHNwbGl0X3RvX3Jvd19jb2wsXG4gICAgbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQsXG4gICAgZmluZF9wYXRyb2xsZXJfZnJvbV9udW1iZXIsXG4gICAgbG9nQWN0aW9uLFxuICAgIGdldF9wYXRyb2xsZWRfZGF5cyxcbiAgICBGSU5EX1BBVFJPTExFUl9PUFRTLFxuICAgIFBhdHJvbGxlclJvdyxcbiAgICBQQVRST0xMRVJfU0VBU09OX09QVFMsXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZ29vZ2xlYXBpc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtcbiAgICBDb250ZXh0LFxuICAgIFNlcnZlcmxlc3NDYWxsYmFjayxcbiAgICBTZXJ2ZXJsZXNzRXZlbnRPYmplY3QsXG4gICAgU2VydmVybGVzc0Z1bmN0aW9uU2lnbmF0dXJlLFxuICAgIFNlcnZpY2VDb250ZXh0LFxuICAgIFR3aWxpb0NsaWVudCxcbn0gZnJvbSBcIkB0d2lsaW8tbGFicy9zZXJ2ZXJsZXNzLXJ1bnRpbWUtdHlwZXMvdHlwZXNcIjtcbmltcG9ydCB7IGdvb2dsZSwgc2NyaXB0X3YxLCBzaGVldHNfdjQgfSBmcm9tIFwiZ29vZ2xlYXBpc1wiO1xuaW1wb3J0IHsgR29vZ2xlQXV0aCB9IGZyb20gXCJnb29nbGVhcGlzLWNvbW1vblwiO1xuaW1wb3J0IHsgTE9HSU5fU0hFRVRfT1BUUywgTG9naW5TaGVldCB9IGZyb20gXCIuL2xvZ2luLXNoZWV0XCI7XG5pbXBvcnQgeyBVU0VSX0NSRURTX09QVFMsIFVzZXJDcmVkcyB9IGZyb20gXCIuL3VzZXItY3JlZHNcIjtcbmltcG9ydCB7XG4gICAgRklORF9QQVRST0xMRVJfT1BUUyxcbiAgICBmaW5kX3BhdHJvbGxlcl9mcm9tX251bWJlcixcbiAgICBnZXRfcGF0cm9sbGVkX2RheXMsXG4gICAgUEFUUk9MTEVSX1NFQVNPTl9PUFRTLFxuICAgIFBhdHJvbGxlclJvdyxcbn0gZnJvbSBcIi4vdXRpbFwiO1xuXG5jb25zdCBORVhUX1NURVBfQ09PS0lFX05BTUUgPSBcImJ2bnNwX2NoZWNraW5fbmV4dF9zdGVwXCI7XG50eXBlIEhhbmRsZXJFdmVudCA9IFNlcnZlcmxlc3NFdmVudE9iamVjdDxcbiAgICB7XG4gICAgICAgIEZyb206IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAgICAgVG86IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAgICAgbnVtYmVyOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgICAgIEJvZHk6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICB9LFxuICAgIHt9LFxuICAgIHtcbiAgICAgICAgYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXA6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICB9XG4+O1xudHlwZSBIYW5kbGVyRW52aXJvbm1lbnQgPSB7XG4gICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICBTQ1JJUFRfSUQ6IHN0cmluZztcbiAgICBSRVNFVF9GVU5DVElPTl9OQU1FOiBzdHJpbmc7XG4gICAgQVJDSElWRV9GVU5DVElPTl9OQU1FOiBzdHJpbmc7XG4gICAgUEhPTkVfTlVNQkVSX0xPT0tVUF9TSEVFVDogc3RyaW5nO1xuICAgIFBIT05FX05VTUJFUl9OVU1CRVJfQ09MVU1OOiBzdHJpbmc7XG4gICAgUEhPTkVfTlVNQkVSX05BTUVfQ09MVU1OOiBzdHJpbmc7XG4gICAgU1lOQ19TSUQ6IHN0cmluZztcbiAgICBVU0VfU0VSVklDRV9BQ0NPVU5UOiBzdHJpbmc7XG4gICAgTlNQX0VNQUlMX0RPTUFJTjogc3RyaW5nO1xuXG4gICAgTE9HSU5fU0hFRVRfTE9PS1VQOiBzdHJpbmc7XG4gICAgTlVNQkVSX0NIRUNLSU5TX0xPT0tVUDogc3RyaW5nO1xuICAgIEFSQ0hJVkVEX0NFTEw6IHN0cmluZztcbiAgICBTSEVFVF9EQVRFX0NFTEw6IHN0cmluZztcbiAgICBDVVJSRU5UX0RBVEVfQ0VMTDogc3RyaW5nO1xuICAgIFNFQ1RJT05fRFJPUERPV05fQ09MVU1OOiBzdHJpbmc7XG4gICAgQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU46IHN0cmluZztcbiAgICBDSEVDS0lOX1ZBTFVFUzogc3RyaW5nO1xuICAgIFVTRVJfU1RBVElTVElDU19TSEVFVDogc3RyaW5nO1xuXG4gICAgU0VBU09OX1NIRUVUOiBzdHJpbmc7XG4gICAgU0VBU09OX1NIRUVUX0RBWVNfQ09MVU1OOiBzdHJpbmc7XG4gICAgU0VBU09OX1NIRUVUX05BTUVfQ09MVU1OOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgY29uc3QgaGFuZGxlcjogU2VydmVybGVzc0Z1bmN0aW9uU2lnbmF0dXJlPFxuICAgIEhhbmRsZXJFbnZpcm9ubWVudCxcbiAgICBIYW5kbGVyRXZlbnRcbj4gPSBhc3luYyBmdW5jdGlvbiAoXG4gICAgY29udGV4dDogQ29udGV4dDxIYW5kbGVyRW52aXJvbm1lbnQ+LFxuICAgIGV2ZW50OiBTZXJ2ZXJsZXNzRXZlbnRPYmplY3Q8SGFuZGxlckV2ZW50PixcbiAgICBjYWxsYmFjazogU2VydmVybGVzc0NhbGxiYWNrXG4pIHtcbiAgICBjb25zdCBoYW5kbGVyID0gbmV3IEhhbmRsZXIoY29udGV4dCwgZXZlbnQpO1xuICAgIGxldCBtZXNzYWdlOiBzdHJpbmc7XG4gICAgbGV0IG5leHRfc3RlcDogc3RyaW5nID0gXCJcIjtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBoYW5kbGVyX3Jlc3BvbnNlID0gYXdhaXQgaGFuZGxlci5oYW5kbGUoKTtcbiAgICAgICAgbWVzc2FnZSA9XG4gICAgICAgICAgICBoYW5kbGVyX3Jlc3BvbnNlLnJlc3BvbnNlIHx8XG4gICAgICAgICAgICBcIlVuZXhwZWN0ZWQgcmVzdWx0IC0gbm8gcmVzcG9uc2UgZGV0ZXJtaW5lZFwiO1xuICAgICAgICBuZXh0X3N0ZXAgPSBoYW5kbGVyX3Jlc3BvbnNlLm5leHRfc3RlcCB8fCBcIlwiO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJBbiBlcnJvciBvY2N1cmVkXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgbWVzc2FnZSA9IFwiQW4gdW5leHBlY3RlZCBlcnJvciBvY2N1cmVkLlwiO1xuICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICBtZXNzYWdlICs9IFwiXFxuXCIgKyBlLm1lc3NhZ2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCByZXNwb25zZSA9IG5ldyBUd2lsaW8uUmVzcG9uc2UoKTtcbiAgICBjb25zdCB0d2ltbCA9IG5ldyBUd2lsaW8udHdpbWwuTWVzc2FnaW5nUmVzcG9uc2UoKTtcblxuICAgIHR3aW1sLm1lc3NhZ2UobWVzc2FnZSk7XG5cbiAgICByZXNwb25zZVxuICAgICAgICAvLyBBZGQgdGhlIHN0cmluZ2lmaWVkIFR3aU1MIHRvIHRoZSByZXNwb25zZSBib2R5XG4gICAgICAgIC5zZXRCb2R5KHR3aW1sLnRvU3RyaW5nKCkpXG4gICAgICAgIC8vIFNpbmNlIHdlJ3JlIHJldHVybmluZyBUd2lNTCwgdGhlIGNvbnRlbnQgdHlwZSBtdXN0IGJlIFhNTFxuICAgICAgICAuYXBwZW5kSGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwidGV4dC94bWxcIilcbiAgICAgICAgLy8gWW91IGNhbiBpbmNyZW1lbnQgdGhlIGNvdW50IHN0YXRlIGZvciB0aGUgbmV4dCBtZXNzYWdlLCBvciBhbnkgb3RoZXJcbiAgICAgICAgLy8gb3BlcmF0aW9uIHRoYXQgbWFrZXMgc2Vuc2UgZm9yIHlvdXIgYXBwbGljYXRpb24ncyBuZWVkcy4gUmVtZW1iZXJcbiAgICAgICAgLy8gdGhhdCBjb29raWVzIGFyZSBhbHdheXMgc3RvcmVkIGFzIHN0cmluZ3NcbiAgICAgICAgLnNldENvb2tpZShORVhUX1NURVBfQ09PS0lFX05BTUUsIG5leHRfc3RlcCk7XG5cbiAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgcmVzcG9uc2UpO1xufTtcblxudHlwZSBSZXNwb25zZSA9IHtcbiAgICByZXNwb25zZT86IHN0cmluZztcbiAgICBuZXh0X3N0ZXA/OiBzdHJpbmc7XG59O1xuXG5jbGFzcyBDaGVja2luVmFsdWUge1xuICAgIGtleTogc3RyaW5nO1xuICAgIHNoZWV0c192YWx1ZTogc3RyaW5nO1xuICAgIHNtc19kZXNjOiBzdHJpbmc7XG4gICAgZmFzdF9jaGVja2luczogc3RyaW5nW107XG4gICAgbG9va3VwX3ZhbHVlczogU2V0PHN0cmluZz47XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGtleTogc3RyaW5nLFxuICAgICAgICBzaGVldHNfdmFsdWU6IHN0cmluZyxcbiAgICAgICAgc21zX2Rlc2M6IHN0cmluZyxcbiAgICAgICAgZmFzdF9jaGVja2luczogc3RyaW5nIHwgc3RyaW5nW11cbiAgICApIHtcbiAgICAgICAgaWYgKCEoZmFzdF9jaGVja2lucyBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgICAgICAgZmFzdF9jaGVja2lucyA9IFtmYXN0X2NoZWNraW5zXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmtleSA9IGtleTtcbiAgICAgICAgdGhpcy5zaGVldHNfdmFsdWUgPSBzaGVldHNfdmFsdWU7XG4gICAgICAgIHRoaXMuc21zX2Rlc2MgPSBzbXNfZGVzYztcbiAgICAgICAgdGhpcy5mYXN0X2NoZWNraW5zID0gZmFzdF9jaGVja2lucy5tYXAoKHgpID0+IHgudHJpbSgpLnRvTG93ZXJDYXNlKCkpO1xuXG4gICAgICAgIGNvbnN0IHNtc19kZXNjX3NwbGl0OiBzdHJpbmdbXSA9IHNtc19kZXNjXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxzKy8sIFwiLVwiKVxuICAgICAgICAgICAgLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgIC5zcGxpdChcIi9cIik7XG4gICAgICAgIGNvbnN0IGxvb2t1cF92YWxzID0gWy4uLnRoaXMuZmFzdF9jaGVja2lucywgLi4uc21zX2Rlc2Nfc3BsaXRdO1xuICAgICAgICB0aGlzLmxvb2t1cF92YWx1ZXMgPSBuZXcgU2V0PHN0cmluZz4obG9va3VwX3ZhbHMpO1xuICAgIH1cbn1cblxuY2xhc3MgQ2hlY2tpblZhbHVlcyB7XG4gICAgYnlfa2V5OiB7IFtrZXk6IHN0cmluZ106IENoZWNraW5WYWx1ZSB9ID0ge307XG4gICAgYnlfbHY6IHsgW2tleTogc3RyaW5nXTogQ2hlY2tpblZhbHVlIH0gPSB7fTtcbiAgICBieV9mYzogeyBba2V5OiBzdHJpbmddOiBDaGVja2luVmFsdWUgfSA9IHt9O1xuICAgIGJ5X3NoZWV0X3N0cmluZzogeyBba2V5OiBzdHJpbmddOiBDaGVja2luVmFsdWUgfSA9IHt9O1xuICAgIGNvbnN0cnVjdG9yKGpzb25fYmxvYjogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlczogQ2hlY2tpblZhbHVlW10gPSBbXTtcbiAgICAgICAgZm9yICh2YXIgW2tleSwgc2hlZXRzX3ZhbHVlLCBzbXNfZGVzYywgZmFzdF9jaGVja2luXSBvZiBKU09OLnBhcnNlKFxuICAgICAgICAgICAganNvbl9ibG9iXG4gICAgICAgICkpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBDaGVja2luVmFsdWUoXG4gICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgIHNoZWV0c192YWx1ZSxcbiAgICAgICAgICAgICAgICBzbXNfZGVzYyxcbiAgICAgICAgICAgICAgICBmYXN0X2NoZWNraW5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLmJ5X2tleVtyZXN1bHQua2V5XSA9IHJlc3VsdDtcbiAgICAgICAgICAgIHRoaXMuYnlfc2hlZXRfc3RyaW5nW3Jlc3VsdC5zaGVldHNfdmFsdWVdID0gcmVzdWx0O1xuICAgICAgICAgICAgZm9yIChjb25zdCBsdiBvZiByZXN1bHQubG9va3VwX3ZhbHVlcykge1xuICAgICAgICAgICAgICAgIHRoaXMuYnlfbHZbbHZdID0gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCBmYyBvZiByZXN1bHQuZmFzdF9jaGVja2lucykge1xuICAgICAgICAgICAgICAgIHRoaXMuYnlfZmNbZmNdID0gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVudHJpZXMoKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuZW50cmllcyh0aGlzLmJ5X2tleSk7XG4gICAgfVxuXG4gICAgcGFyc2VfZmFzdF9jaGVja2luKGJvZHk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5ieV9mY1tib2R5XTtcbiAgICB9XG5cbiAgICBwYXJzZV9jaGVja2luKGJvZHk6IHN0cmluZykge1xuICAgICAgICBjb25zdCBjaGVja2luX2xvd2VyID0gYm9keS5yZXBsYWNlKC9cXHMrLywgXCJcIik7XG4gICAgICAgIHJldHVybiB0aGlzLmJ5X2x2W2NoZWNraW5fbG93ZXJdO1xuICAgIH1cbn1cblxuY2xhc3MgSGFuZGxlciB7XG4gICAgU0NPUEVTOiBzdHJpbmdbXSA9IFtcImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvc3ByZWFkc2hlZXRzXCJdO1xuXG4gICAgc21zX3JlcXVlc3Q6IGJvb2xlYW47XG4gICAgcmVzdWx0X21lc3NhZ2VzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGZyb206IHN0cmluZztcbiAgICB0bzogc3RyaW5nO1xuICAgIGJvZHk6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBwYXRyb2xsZXJfbmFtZTogc3RyaW5nID0gXCJVbmtub3duUGF0cm9sbGVyXCI7XG4gICAgYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXA6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBjaGVja2luX21vZGU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICAgIGZhc3RfY2hlY2tpbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgdXNlX3NlcnZpY2VfYWNjb3VudDogYm9vbGVhbjtcbiAgICB0d2lsaW9fY2xpZW50OiBUd2lsaW9DbGllbnQ7XG4gICAgc3luY19zaWQ6IHN0cmluZztcbiAgICByZXNldF9zY3JpcHRfaWQ6IHN0cmluZztcbiAgICBhcmNoaXZlX2Z1bmN0aW9uX25hbWU6IHN0cmluZztcbiAgICByZXNldF9mdW5jdGlvbl9uYW1lOiBzdHJpbmc7XG4gICAgdXNlcl9hdXRoX29wdHM6IFVTRVJfQ1JFRFNfT1BUUztcbiAgICBmaW5kX3BhdHJvbGxlcl9vcHRzOiBGSU5EX1BBVFJPTExFUl9PUFRTO1xuICAgIGFjdGlvbl9sb2dfc2hlZXQ6IHN0cmluZztcblxuICAgIC8vIENhY2hlIGNsaWVudHNcbiAgICBzeW5jX2NsaWVudDogU2VydmljZUNvbnRleHQgfCBudWxsID0gbnVsbDtcbiAgICB1c2VyX2NyZWRzOiBVc2VyQ3JlZHMgfCBudWxsID0gbnVsbDtcbiAgICBzZXJ2aWNlX2NyZWRzOiBHb29nbGVBdXRoIHwgbnVsbCA9IG51bGw7XG4gICAgc2hlZXRzX3NlcnZpY2U6IHNoZWV0c192NC5TaGVldHMgfCBudWxsID0gbnVsbDtcbiAgICB1c2VyX3NjcmlwdHNfc2VydmljZTogc2NyaXB0X3YxLlNjcmlwdCB8IG51bGwgPSBudWxsO1xuICAgIGxvZ2luX3NoZWV0X29wdHM6IExPR0lOX1NIRUVUX09QVFM7XG4gICAgbG9naW5fc2hlZXQ6IExvZ2luU2hlZXQgfCBudWxsID0gbnVsbDtcbiAgICBjaGVja2luX3ZhbHVlczogQ2hlY2tpblZhbHVlcztcbiAgICBwYXRyb2xsZXJfc2Vhc29uX29wdHM6IFBBVFJPTExFUl9TRUFTT05fT1BUUztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBjb250ZXh0OiBDb250ZXh0PEhhbmRsZXJFbnZpcm9ubWVudD4sXG4gICAgICAgIGV2ZW50OiBTZXJ2ZXJsZXNzRXZlbnRPYmplY3Q8SGFuZGxlckV2ZW50PlxuICAgICkge1xuICAgICAgICAvLyBEZXRlcm1pbmUgbWVzc2FnZSBkZXRhaWxzIGZyb20gdGhlIGluY29taW5nIGV2ZW50LCB3aXRoIGZhbGxiYWNrIHZhbHVlc1xuICAgICAgICB0aGlzLnNtc19yZXF1ZXN0ID0gKGV2ZW50LkZyb20gfHwgZXZlbnQubnVtYmVyKSAhPT0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmZyb20gPSBldmVudC5Gcm9tIHx8IGV2ZW50Lm51bWJlciB8fCBcIisxNjUwODA0NjY5OFwiO1xuICAgICAgICB0aGlzLnRvID0gZXZlbnQuVG8gfHwgXCIrMTIwOTMwMDAwOTZcIjtcbiAgICAgICAgdGhpcy5ib2R5ID0gZXZlbnQuQm9keT8udG9Mb3dlckNhc2UoKT8udHJpbSgpLnJlcGxhY2UoL1xccysvLCBcIi1cIik7XG4gICAgICAgIHRoaXMuYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXAgPVxuICAgICAgICAgICAgZXZlbnQucmVxdWVzdC5jb29raWVzLmJ2bnNwX2NoZWNraW5fbmV4dF9zdGVwO1xuICAgICAgICB0aGlzLnVzZV9zZXJ2aWNlX2FjY291bnQgPSBjb250ZXh0LlVTRV9TRVJWSUNFX0FDQ09VTlQgPT09IFwidHJ1ZVwiO1xuXG4gICAgICAgIHRoaXMudHdpbGlvX2NsaWVudCA9IGNvbnRleHQuZ2V0VHdpbGlvQ2xpZW50KCk7XG4gICAgICAgIHRoaXMuc3luY19zaWQgPSBjb250ZXh0LlNZTkNfU0lEO1xuICAgICAgICB0aGlzLnJlc2V0X3NjcmlwdF9pZCA9IGNvbnRleHQuU0NSSVBUX0lEO1xuICAgICAgICB0aGlzLmFyY2hpdmVfZnVuY3Rpb25fbmFtZSA9IGNvbnRleHQuQVJDSElWRV9GVU5DVElPTl9OQU1FO1xuICAgICAgICB0aGlzLnJlc2V0X2Z1bmN0aW9uX25hbWUgPSBjb250ZXh0LlJFU0VUX0ZVTkNUSU9OX05BTUU7XG4gICAgICAgIHRoaXMuYWN0aW9uX2xvZ19zaGVldCA9IGNvbnRleHQuVVNFUl9TVEFUSVNUSUNTX1NIRUVUO1xuICAgICAgICB0aGlzLnVzZXJfYXV0aF9vcHRzID0gY29udGV4dDtcbiAgICAgICAgdGhpcy5maW5kX3BhdHJvbGxlcl9vcHRzID0gY29udGV4dDtcbiAgICAgICAgdGhpcy5sb2dpbl9zaGVldF9vcHRzID0gY29udGV4dDtcbiAgICAgICAgdGhpcy5wYXRyb2xsZXJfc2Vhc29uX29wdHMgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLnBhdHJvbGxlcl9uYW1lO1xuXG4gICAgICAgIHRoaXMuY2hlY2tpbl92YWx1ZXMgPSBuZXcgQ2hlY2tpblZhbHVlcyhjb250ZXh0LkNIRUNLSU5fVkFMVUVTKTtcbiAgICB9XG5cbiAgICBwYXJzZV9mYXN0X2NoZWNraW5fbW9kZShib2R5OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgcGFyc2VkID0gdGhpcy5jaGVja2luX3ZhbHVlcy5wYXJzZV9mYXN0X2NoZWNraW4oYm9keSk7XG4gICAgICAgIGlmIChwYXJzZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5jaGVja2luX21vZGUgPSBwYXJzZWQua2V5O1xuICAgICAgICAgICAgdGhpcy5mYXN0X2NoZWNraW4gPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHBhcnNlX2NoZWNraW4oYm9keTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHBhcnNlZCA9IHRoaXMuY2hlY2tpbl92YWx1ZXMucGFyc2VfY2hlY2tpbihib2R5KTtcbiAgICAgICAgaWYgKHBhcnNlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNraW5fbW9kZSA9IHBhcnNlZC5rZXk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcGFyc2VfY2hlY2tpbl9mcm9tX25leHRfc3RlcCgpIHtcbiAgICAgICAgY29uc3QgbGFzdF9zZWdtZW50ID0gdGhpcy5idm5zcF9jaGVja2luX25leHRfc3RlcFxuICAgICAgICAgICAgPy5zcGxpdChcIi1cIilcbiAgICAgICAgICAgIC5zbGljZSgtMSlbMF07XG4gICAgICAgIGlmIChsYXN0X3NlZ21lbnQgJiYgbGFzdF9zZWdtZW50IGluIHRoaXMuY2hlY2tpbl92YWx1ZXMuYnlfa2V5KSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNraW5fbW9kZSA9IGxhc3Rfc2VnbWVudDtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBkZWxheShzZWNvbmRzOiBudW1iZXIsIG9wdGlvbmFsOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKG9wdGlvbmFsICYmICF0aGlzLnNtc19yZXF1ZXN0KSB7XG4gICAgICAgICAgICBzZWNvbmRzID0gMSAvIDEwMDAuMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcykgPT4ge1xuICAgICAgICAgICAgc2V0VGltZW91dChyZXMsIHNlY29uZHMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhc3luYyBzZW5kX21lc3NhZ2UobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLnNtc19yZXF1ZXN0KSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnR3aWxpb19jbGllbnQubWVzc2FnZXNcbiAgICAgICAgICAgICAgICAuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgdG86IHRoaXMuZnJvbSxcbiAgICAgICAgICAgICAgICAgICAgZnJvbTogdGhpcy50byxcbiAgICAgICAgICAgICAgICAgICAgYm9keTogbWVzc2FnZSxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDcmVhdGVkIG1lc3NhZ2UgdXNpbmcgY2FsbGJhY2tcIik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC5zaWQpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVzdWx0X21lc3NhZ2VzLnB1c2gobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBoYW5kbGUoKTogUHJvbWlzZTxSZXNwb25zZT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLl9oYW5kbGUoKTtcbiAgICAgICAgaWYgKCF0aGlzLnNtc19yZXF1ZXN0KSB7XG4gICAgICAgICAgICBpZiAocmVzdWx0Py5yZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0X21lc3NhZ2VzLnB1c2gocmVzdWx0LnJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IHRoaXMucmVzdWx0X21lc3NhZ2VzLmpvaW4oXCJcXG4jIyNcXG5cIiksXG4gICAgICAgICAgICAgICAgbmV4dF9zdGVwOiByZXN1bHQ/Lm5leHRfc3RlcCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgYXN5bmMgX2hhbmRsZSgpOiBQcm9taXNlPFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBSZWNlaXZlZCByZXF1ZXN0IGZyb20gJHt0aGlzLmZyb219IHdpdGggYm9keTogJHt0aGlzLmJvZHl9IGFuZCBzdGF0ZSAke3RoaXMuYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXB9YClcbiAgICAgICAgaWYgKHRoaXMuYm9keSA9PSBcImxvZ291dFwiKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBsb2dvdXRgKTtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmxvZ291dCgpO1xuICAgICAgICB9XG4gICAgICAgIGxldCByZXNwb25zZTogUmVzcG9uc2UgfCB1bmRlZmluZWQ7XG4gICAgICAgIGlmICghdGhpcy51c2Vfc2VydmljZV9hY2NvdW50KSB7XG4gICAgICAgICAgICByZXNwb25zZSA9IGF3YWl0IHRoaXMuY2hlY2tfdXNlcl9jcmVkcygpO1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlKSByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYm9keSA9PSBcInJlc3RhcnRcIikge1xuICAgICAgICAgICAgcmV0dXJuIHsgcmVzcG9uc2U6IFwiT2theS4gVGV4dCBtZSBhZ2FpbiB0byBzdGFydCBvdmVyLi4uXCIgfTtcbiAgICAgICAgfVxuICAgICAgICByZXNwb25zZSA9IGF3YWl0IHRoaXMuZ2V0X3BhdHJvbGxlcl9uYW1lKCk7XG4gICAgICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgKCF0aGlzLmJ2bnNwX2NoZWNraW5fbmV4dF9zdGVwIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5idm5zcF9jaGVja2luX25leHRfc3RlcCA9PSBcImF3YWl0LWNvbW1hbmRcIikgJiZcbiAgICAgICAgICAgIHRoaXMuYm9keVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcnNlX2Zhc3RfY2hlY2tpbl9tb2RlKHRoaXMuYm9keSkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBmYXN0IGNoZWNraW4gZm9yICR7dGhpcy5wYXRyb2xsZXJfbmFtZX0gd2l0aCBtb2RlOiAke3RoaXMuY2hlY2tpbl9tb2RlfWApXG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuY2hlY2tpbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKFtcIm9uZHV0eVwiLCBcIm9uLWR1dHlcIl0uaW5jbHVkZXModGhpcy5ib2R5KSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIGdldF9vbl9kdXR5IGZvciAke3RoaXMucGF0cm9sbGVyX25hbWV9YCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgcmVzcG9uc2U6IGF3YWl0IHRoaXMuZ2V0X29uX2R1dHkoKSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKFtcInN0YXR1c1wiXS5pbmNsdWRlcyh0aGlzLmJvZHkpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmZvcm1pbmcgZ2V0X3N0YXR1cyBmb3IgJHt0aGlzLnBhdHJvbGxlcl9uYW1lfWApO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldF9zdGF0dXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChbXCJjaGVja2luXCIsIFwiY2hlY2staW5cIl0uaW5jbHVkZXModGhpcy5ib2R5KSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIHByb21wdF9jaGVja2luIGZvciAke3RoaXMucGF0cm9sbGVyX25hbWV9YCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvbXB0X2NoZWNraW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHRoaXMuYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXAgPT0gXCJhd2FpdC1jaGVja2luXCIgJiZcbiAgICAgICAgICAgIHRoaXMuYm9keVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcnNlX2NoZWNraW4odGhpcy5ib2R5KSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nIHJlZ3VsYXIgY2hlY2tpbiBmb3IgJHt0aGlzLnBhdHJvbGxlcl9uYW1lfSB3aXRoIG1vZGU6ICR7dGhpcy5jaGVja2luX21vZGV9YClcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5jaGVja2luKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5idm5zcF9jaGVja2luX25leHRfc3RlcD8uc3RhcnRzV2l0aChcImNvbmZpcm0tcmVzZXRcIikgJiYgdGhpcy5ib2R5KSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgdGhpcy5ib2R5ID09IFwieWVzXCIgJiZcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnNlX2NoZWNraW5fZnJvbV9uZXh0X3N0ZXAoKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmZvcm1pbmcgcmVzZXRfc2hlZXRfZmxvdyBmb3IgJHt0aGlzLnBhdHJvbGxlcl9uYW1lfSB3aXRoIGNoZWNraW4gbW9kZTogJHt0aGlzLmNoZWNraW5fbW9kZX1gKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAoYXdhaXQgdGhpcy5yZXNldF9zaGVldF9mbG93KCkpIHx8IChhd2FpdCB0aGlzLmNoZWNraW4oKSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXA/LnN0YXJ0c1dpdGgoXCJhdXRoLXJlc2V0XCIpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wYXJzZV9jaGVja2luX2Zyb21fbmV4dF9zdGVwKCkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyByZXNldF9zaGVldF9mbG93LXBvc3QtYXV0aCBmb3IgJHt0aGlzLnBhdHJvbGxlcl9uYW1lfSB3aXRoIGNoZWNraW4gbW9kZTogJHt0aGlzLmNoZWNraW5fbW9kZX1gKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAoYXdhaXQgdGhpcy5yZXNldF9zaGVldF9mbG93KCkpIHx8IChhd2FpdCB0aGlzLmNoZWNraW4oKSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXApIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuc2VuZF9tZXNzYWdlKFwiU29ycnksIEkgZGlkbid0IHVuZGVyc3RhbmQgdGhhdC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucHJvbXB0X2NvbW1hbmQoKTtcbiAgICB9XG5cbiAgICBwcm9tcHRfY29tbWFuZCgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3BvbnNlOiBgJHt0aGlzLnBhdHJvbGxlcl9uYW1lfSwgSSdtIEJWTlNQIEJvdC4gXG5FbnRlciBhIGNvbW1hbmQ6XG5DaGVjayBpbiAvIENoZWNrIG91dCAvIFN0YXR1cyAvIE9uIER1dHlcblNlbmQgJ3Jlc3RhcnQnIGF0IGFueSB0aW1lIHRvIGJlZ2luIGFnYWluYCxcbiAgICAgICAgICAgIG5leHRfc3RlcDogXCJhd2FpdC1jb21tYW5kXCIsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJvbXB0X2NoZWNraW4oKSB7XG4gICAgICAgIGNvbnN0IHR5cGVzID0gT2JqZWN0LnZhbHVlcyh0aGlzLmNoZWNraW5fdmFsdWVzLmJ5X2tleSkubWFwKCh4KSA9PiB4LnNtc19kZXNjKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3BvbnNlOiBgJHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhdHJvbGxlcl9uYW1lXG4gICAgICAgICAgICB9LCB1cGRhdGUgcGF0cm9sbGluZyBzdGF0dXMgdG86ICR7dHlwZXNcbiAgICAgICAgICAgICAgICAuc2xpY2UoMCwgLTEpXG4gICAgICAgICAgICAgICAgLmpvaW4oXCIsIFwiKX0sIG9yICR7dHlwZXMuc2xpY2UoLTEpfT9gLFxuICAgICAgICAgICAgbmV4dF9zdGVwOiBcImF3YWl0LWNoZWNraW5cIixcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBhc3luYyBnZXRfc3RhdHVzKCkge1xuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG4gICAgICAgIGNvbnN0IHNoZWV0X2RhdGUgPSBsb2dpbl9zaGVldC5zaGVldF9kYXRlLnRvRGF0ZVN0cmluZygpO1xuICAgICAgICBjb25zdCBjdXJyZW50X2RhdGUgPSBsb2dpbl9zaGVldC5jdXJyZW50X2RhdGUudG9EYXRlU3RyaW5nKCk7XG4gICAgICAgIGlmICghbG9naW5fc2hlZXQuaXNfY3VycmVudCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYHNoZWV0X2RhdGU6ICR7bG9naW5fc2hlZXQuc2hlZXRfZGF0ZX1gKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBjdXJyZW50X2RhdGU6ICR7bG9naW5fc2hlZXQuY3VycmVudF9kYXRlfWApO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYFNoZWV0IGlzIG5vdCBjdXJyZW50IGZvciB0b2RheSAobGFzdCByZXNldDogJHtzaGVldF9kYXRlfSkuICR7dGhpcy5wYXRyb2xsZXJfbmFtZX0gaXMgbm90IGNoZWNrZWQgaW4gZm9yICR7Y3VycmVudF9kYXRlfS5gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXNwb25zZSA9IHsgcmVzcG9uc2U6IGF3YWl0IHRoaXMuZ2V0X3N0YXR1c19zdHJpbmcoKSB9O1xuICAgICAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oXCJzdGF0dXNcIik7XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG5cbiAgICBhc3luYyBnZXRfc3RhdHVzX3N0cmluZygpIHtcbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuICAgICAgICBjb25zdCBwYXRyb2xsZXJfc3RhdHVzID0gbG9naW5fc2hlZXQuZmluZF9wYXRyb2xsZXIoXG4gICAgICAgICAgICB0aGlzLnBhdHJvbGxlcl9uYW1lXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGNoZWNraW5Db2x1bW5TZXQgPVxuICAgICAgICAgICAgcGF0cm9sbGVyX3N0YXR1cy5jaGVja2luICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIHBhdHJvbGxlcl9zdGF0dXMuY2hlY2tpbiAhPT0gbnVsbDtcbiAgICAgICAgY29uc3QgY2hlY2tlZE91dCA9XG4gICAgICAgICAgICBjaGVja2luQ29sdW1uU2V0ICYmXG4gICAgICAgICAgICB0aGlzLmNoZWNraW5fdmFsdWVzLmJ5X3NoZWV0X3N0cmluZ1twYXRyb2xsZXJfc3RhdHVzLmNoZWNraW5dLmtleSA9PSBcIm91dFwiO1xuICAgICAgICBsZXQgc3RhdHVzID0gcGF0cm9sbGVyX3N0YXR1cy5jaGVja2luIHx8IFwiTm90IFByZXNlbnRcIjtcblxuICAgICAgICBpZiAoY2hlY2tlZE91dCkge1xuICAgICAgICAgICAgc3RhdHVzID0gXCJDaGVja2VkIE91dFwiO1xuICAgICAgICB9IGVsc2UgaWYgKGNoZWNraW5Db2x1bW5TZXQpIHtcbiAgICAgICAgICAgIGxldCBzZWN0aW9uID0gcGF0cm9sbGVyX3N0YXR1cy5zZWN0aW9uLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBpZiAoc2VjdGlvbi5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgICAgIHNlY3Rpb24gPSBgU2VjdGlvbiAke3NlY3Rpb259YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0YXR1cyA9IGAke3BhdHJvbGxlcl9zdGF0dXMuY2hlY2tpbn0gKCR7c2VjdGlvbn0pYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0YXR1cyA9IFwibm90IHByZXNlbnRcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbXBsZXRlZFBhdHJvbERheXMgPSBhd2FpdCBnZXRfcGF0cm9sbGVkX2RheXMoXG4gICAgICAgICAgICB0aGlzLnBhdHJvbGxlcl9uYW1lLFxuICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXRfc2hlZXRzX3NlcnZpY2UoKSxcbiAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyX3NlYXNvbl9vcHRzXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGNvbXBsZXRlZFBhdHJvbERheXNTdHJpbmcgPVxuICAgICAgICAgICAgY29tcGxldGVkUGF0cm9sRGF5cyA+IDAgPyBjb21wbGV0ZWRQYXRyb2xEYXlzLnRvU3RyaW5nKCkgOiBcIk5vXCI7XG4gICAgICAgIGNvbnN0IGxvZ2luU2hlZXREYXRlID0gbG9naW5fc2hlZXQuc2hlZXRfZGF0ZS50b0RhdGVTdHJpbmcoKTtcblxuICAgICAgICByZXR1cm4gYFN0YXR1cyBmb3IgJHt0aGlzLnBhdHJvbGxlcl9uYW1lfSBvbiBkYXRlICR7bG9naW5TaGVldERhdGV9OiAke3N0YXR1c30uXFxuJHtjb21wbGV0ZWRQYXRyb2xEYXlzU3RyaW5nfSBjb21wbGV0ZWQgcGF0cm9sIGRheXMgcHJpb3IgdG8gdG9kYXkuYDtcbiAgICB9XG5cbiAgICBhc3luYyBjaGVja2luKCkge1xuICAgICAgICBpZiAoYXdhaXQgdGhpcy5zaGVldF9uZWVkc19yZXNldCgpKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOlxuICAgICAgICAgICAgICAgICAgICBgJHt0aGlzLnBhdHJvbGxlcl9uYW1lfSwgeW91IGFyZSB0aGUgZmlyc3QgcGVyc29uIHRvIGNoZWNrIGluIHRvZGF5LiBgICtcbiAgICAgICAgICAgICAgICAgICAgYEkgbmVlZCB0byBhcmNoaXZlIGFuZCByZXNldCB0aGUgc2hlZXQgYmVmb3JlIGNvbnRpbnVpbmcuIGAgK1xuICAgICAgICAgICAgICAgICAgICBgV291bGQgeW91IGxpa2UgbWUgdG8gZG8gdGhhdD8gKFllcy9ObylgLFxuICAgICAgICAgICAgICAgIG5leHRfc3RlcDogYGNvbmZpcm0tcmVzZXQtJHt0aGlzLmNoZWNraW5fbW9kZX1gLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY2hlY2tpbl9tb2RlO1xuICAgICAgICBpZiAoIXRoaXMuY2hlY2tpbl9tb2RlIHx8IChjaGVja2luX21vZGUgPSB0aGlzLmNoZWNraW5fdmFsdWVzLmJ5X2tleVt0aGlzLmNoZWNraW5fbW9kZV0pID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNoZWNraW4gbW9kZSBpbXByb3Blcmx5IHNldFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKTtcbiAgICAgICAgY29uc3QgbmV3X2NoZWNraW5fdmFsdWUgPSBjaGVja2luX21vZGUuc2hlZXRzX3ZhbHVlO1xuICAgICAgICBhd2FpdCBsb2dpbl9zaGVldC5jaGVja2luKHRoaXMucGF0cm9sbGVyX25hbWUsIG5ld19jaGVja2luX3ZhbHVlKTtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2dpbl9zaGVldD8ucmVmcmVzaCgpO1xuXG4gICAgICAgIGxldCByZXNwb25zZSA9IGBVcGRhdGluZyAke3RoaXMucGF0cm9sbGVyX25hbWV9IHdpdGggc3RhdHVzOiAke25ld19jaGVja2luX3ZhbHVlfS5gO1xuICAgICAgICBpZiAoIXRoaXMuZmFzdF9jaGVja2luKSB7XG4gICAgICAgICAgICByZXNwb25zZSArPSBgIFlvdSBjYW4gc2VuZCAnJHtjaGVja2luX21vZGUuZmFzdF9jaGVja2luc1swXX0nIGFzIHlvdXIgZmlyc3QgbWVzc2FnZSBmb3IgYSBmYXN0ICR7Y2hlY2tpbl9tb2RlLnNoZWV0c192YWx1ZX0gY2hlY2tpbiBuZXh0IHRpbWUuYDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3BvbnNlICs9IFwiXFxuXFxuXCIgKyAoYXdhaXQgdGhpcy5nZXRfc3RhdHVzX3N0cmluZygpKTtcbiAgICAgICAgcmV0dXJuIHsgcmVzcG9uc2U6IHJlc3BvbnNlIH07XG4gICAgfVxuXG4gICAgYXN5bmMgc2hlZXRfbmVlZHNfcmVzZXQoKSB7XG4gICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKTtcblxuICAgICAgICBjb25zdCBzaGVldF9kYXRlID0gbG9naW5fc2hlZXQuc2hlZXRfZGF0ZTtcbiAgICAgICAgY29uc3QgY3VycmVudF9kYXRlID0gbG9naW5fc2hlZXQuY3VycmVudF9kYXRlO1xuICAgICAgICBjb25zb2xlLmxvZyhgc2hlZXRfZGF0ZTogJHtzaGVldF9kYXRlfWApO1xuICAgICAgICBjb25zb2xlLmxvZyhgY3VycmVudF9kYXRlOiAke2N1cnJlbnRfZGF0ZX1gKTtcblxuICAgICAgICBjb25zb2xlLmxvZyhgZGF0ZV9pc19jdXJyZW50OiAke2xvZ2luX3NoZWV0LmlzX2N1cnJlbnR9YCk7XG5cbiAgICAgICAgcmV0dXJuICFsb2dpbl9zaGVldC5pc19jdXJyZW50O1xuICAgIH1cblxuICAgIGFzeW5jIHJlc2V0X3NoZWV0X2Zsb3coKSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5jaGVja191c2VyX2NyZWRzKFxuICAgICAgICAgICAgYCR7dGhpcy5wYXRyb2xsZXJfbmFtZX0sIGluIG9yZGVyIHRvIHJlc2V0L2FyY2hpdmUsIEkgbmVlZCB5b3UgdG8gYXV0aG9yaXplIHRoZSBhcHAuYFxuICAgICAgICApO1xuICAgICAgICBpZiAocmVzcG9uc2UpXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiByZXNwb25zZS5yZXNwb25zZSxcbiAgICAgICAgICAgICAgICBuZXh0X3N0ZXA6IGBhdXRoLXJlc2V0LSR7dGhpcy5jaGVja2luX21vZGV9YCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnJlc2V0X3NoZWV0KCk7XG4gICAgfVxuXG4gICAgYXN5bmMgcmVzZXRfc2hlZXQoKSB7XG4gICAgICAgIGNvbnN0IHNjcmlwdF9zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfdXNlcl9zY3JpcHRzX3NlcnZpY2UoKTtcbiAgICAgICAgY29uc3Qgc2hvdWxkX3BlcmZvcm1fYXJjaGl2ZSA9ICEoYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKSkuYXJjaGl2ZWQ7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBzaG91bGRfcGVyZm9ybV9hcmNoaXZlXG4gICAgICAgICAgICA/IFwiT2theS4gQXJjaGl2aW5nIGFuZCByZXNldGluZyB0aGUgY2hlY2sgaW4gc2hlZXQuIFRoaXMgdGFrZXMgYWJvdXQgMTAgc2Vjb25kcy4uLlwiXG4gICAgICAgICAgICA6IFwiT2theS4gU2hlZXQgaGFzIGFscmVhZHkgYmVlbiBhcmNoaXZlZC4gUGVyZm9ybWluZyByZXNldC4gVGhpcyB0YWtlcyBhYm91dCA1IHNlY29uZHMuLi5cIjtcbiAgICAgICAgYXdhaXQgdGhpcy5zZW5kX21lc3NhZ2UobWVzc2FnZSk7XG4gICAgICAgIGlmIChzaG91bGRfcGVyZm9ybV9hcmNoaXZlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkFyY2hpdmluZy4uLlwiKTtcblxuICAgICAgICAgICAgYXdhaXQgc2NyaXB0X3NlcnZpY2Uuc2NyaXB0cy5ydW4oe1xuICAgICAgICAgICAgICAgIHNjcmlwdElkOiB0aGlzLnJlc2V0X3NjcmlwdF9pZCxcbiAgICAgICAgICAgICAgICByZXF1ZXN0Qm9keTogeyBmdW5jdGlvbjogdGhpcy5hcmNoaXZlX2Z1bmN0aW9uX25hbWUgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5kZWxheSg1KTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubG9nX2FjdGlvbihcImFyY2hpdmVcIik7XG4gICAgICAgICAgICB0aGlzLmxvZ2luX3NoZWV0ID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVzZXR0aW5nLi4uXCIpO1xuICAgICAgICBhd2FpdCBzY3JpcHRfc2VydmljZS5zY3JpcHRzLnJ1bih7XG4gICAgICAgICAgICBzY3JpcHRJZDogdGhpcy5yZXNldF9zY3JpcHRfaWQsXG4gICAgICAgICAgICByZXF1ZXN0Qm9keTogeyBmdW5jdGlvbjogdGhpcy5yZXNldF9mdW5jdGlvbl9uYW1lIH0sXG4gICAgICAgIH0pO1xuICAgICAgICBhd2FpdCB0aGlzLmRlbGF5KDUpO1xuICAgICAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oXCJyZXNldFwiKTtcbiAgICAgICAgYXdhaXQgdGhpcy5zZW5kX21lc3NhZ2UoXCJEb25lLlwiKTtcbiAgICB9XG5cbiAgICBhc3luYyBjaGVja191c2VyX2NyZWRzKFxuICAgICAgICBwcm9tcHRfbWVzc2FnZTogc3RyaW5nID0gXCJIaSwgYmVmb3JlIHlvdSBjYW4gdXNlIEJWTlNQIGJvdCwgeW91IG11c3QgbG9naW4uXCJcbiAgICApIHtcbiAgICAgICAgY29uc3QgdXNlcl9jcmVkcyA9IHRoaXMuZ2V0X3VzZXJfY3JlZHMoKTtcbiAgICAgICAgaWYgKCEoYXdhaXQgdXNlcl9jcmVkcy5sb2FkVG9rZW4oKSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGF1dGhVcmwgPSBhd2FpdCB1c2VyX2NyZWRzLmdldEF1dGhVcmwoKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGAke3Byb21wdF9tZXNzYWdlfSBQbGVhc2UgZm9sbG93IHRoaXMgbGluazpcbiR7YXV0aFVybH1cblxuTWVzc2FnZSBtZSBhZ2FpbiB3aGVuIGRvbmUuYCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBnZXRfb25fZHV0eSgpIHtcbiAgICAgICAgY29uc3QgY2hlY2tlZF9vdXRfc2VjdGlvbiA9IFwiQ2hlY2tlZCBPdXRcIjtcbiAgICAgICAgY29uc3QgbGFzdF9zZWN0aW9ucyA9IFtjaGVja2VkX291dF9zZWN0aW9uXTtcbiAgICAgICAgY29uc3QgbG9naW5fc2hlZXQgPSBhd2FpdCB0aGlzLmdldF9sb2dpbl9zaGVldCgpO1xuXG4gICAgICAgIGNvbnN0IG9uX2R1dHlfcGF0cm9sbGVycyA9IGxvZ2luX3NoZWV0LmdldF9vbl9kdXR5X3BhdHJvbGxlcnMoKTtcbiAgICAgICAgY29uc3QgYnlfc2VjdGlvbiA9IG9uX2R1dHlfcGF0cm9sbGVyc1xuICAgICAgICAgICAgLmZpbHRlcigoeCkgPT4geC5jaGVja2luKVxuICAgICAgICAgICAgLnJlZHVjZSgocHJldjogeyBba2V5OiBzdHJpbmddOiBQYXRyb2xsZXJSb3dbXSB9LCBjdXIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzaG9ydF9jb2RlID1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja2luX3ZhbHVlcy5ieV9zaGVldF9zdHJpbmdbY3VyLmNoZWNraW5dLmtleTtcbiAgICAgICAgICAgICAgICBsZXQgc2VjdGlvbiA9IGN1ci5zZWN0aW9uO1xuICAgICAgICAgICAgICAgIGlmIChzaG9ydF9jb2RlID09IFwib3V0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VjdGlvbiA9IGNoZWNrZWRfb3V0X3NlY3Rpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghKHNlY3Rpb24gaW4gcHJldikpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldltzZWN0aW9uXSA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwcmV2W3NlY3Rpb25dLnB1c2goY3VyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJldjtcbiAgICAgICAgICAgIH0sIHt9KTtcbiAgICAgICAgbGV0IHJlc3VsdHM6IHN0cmluZ1tdW10gPSBbXTtcbiAgICAgICAgbGV0IGFsbF9rZXlzID0gT2JqZWN0LmtleXMoYnlfc2VjdGlvbik7XG4gICAgICAgIGNvbnN0IG9yZGVyZWRfcHJpbWFyeV9zZWN0aW9ucyA9IE9iamVjdC5rZXlzKGJ5X3NlY3Rpb24pXG4gICAgICAgICAgICAuZmlsdGVyKCh4KSA9PiAhbGFzdF9zZWN0aW9ucy5pbmNsdWRlcyh4KSlcbiAgICAgICAgICAgIC5zb3J0KCk7XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkX2xhc3Rfc2VjdGlvbnMgPSBsYXN0X3NlY3Rpb25zLmZpbHRlcigoeCkgPT5cbiAgICAgICAgICAgIGFsbF9rZXlzLmluY2x1ZGVzKHgpXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IG9yZGVyZWRfc2VjdGlvbnMgPSBvcmRlcmVkX3ByaW1hcnlfc2VjdGlvbnMuY29uY2F0KFxuICAgICAgICAgICAgZmlsdGVyZWRfbGFzdF9zZWN0aW9uc1xuICAgICAgICApO1xuXG4gICAgICAgIGZvciAoY29uc3Qgc2VjdGlvbiBvZiBvcmRlcmVkX3NlY3Rpb25zKSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0OiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICAgICAgY29uc3QgcGF0cm9sbGVycyA9IGJ5X3NlY3Rpb25bc2VjdGlvbl0uc29ydCgoeCwgeSkgPT5cbiAgICAgICAgICAgICAgICB4Lm5hbWUubG9jYWxlQ29tcGFyZSh5Lm5hbWUpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKHNlY3Rpb24ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goXCJTZWN0aW9uIFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGAke3NlY3Rpb259OiBgKTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIHBhdHJvbGxlcl9zdHJpbmcobmFtZTogc3RyaW5nLCBzaG9ydF9jb2RlOiBzdHJpbmcpIHtcbiAgICAgICAgICAgICAgICBsZXQgZGV0YWlscyA9IFwiXCI7XG4gICAgICAgICAgICAgICAgaWYgKHNob3J0X2NvZGUgIT09IFwiZGF5XCIgJiYgc2hvcnRfY29kZSAhPT0gXCJvdXRcIikge1xuICAgICAgICAgICAgICAgICAgICBkZXRhaWxzID0gYCAoJHtzaG9ydF9jb2RlLnRvVXBwZXJDYXNlKCl9KWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBgJHtuYW1lfSR7ZGV0YWlsc31gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0LnB1c2goXG4gICAgICAgICAgICAgICAgcGF0cm9sbGVyc1xuICAgICAgICAgICAgICAgICAgICAubWFwKCh4KSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0cm9sbGVyX3N0cmluZyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja2luX3ZhbHVlcy5ieV9zaGVldF9zdHJpbmdbeC5jaGVja2luXS5rZXlcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAuam9pbihcIiwgXCIpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGBQYXRyb2xsZXJzIGZvciAke2xvZ2luX3NoZWV0LnNoZWV0X2RhdGUudG9EYXRlU3RyaW5nKCl9IChUb3RhbDogJHtcbiAgICAgICAgICAgIG9uX2R1dHlfcGF0cm9sbGVycy5sZW5ndGhcbiAgICAgICAgfSk6XFxuJHtyZXN1bHRzLm1hcCgocikgPT4gci5qb2luKFwiXCIpKS5qb2luKFwiXFxuXCIpfWA7XG4gICAgfVxuXG4gICAgYXN5bmMgbG9nX2FjdGlvbihhY3Rpb25fbmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHNoZWV0c19zZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRfc2hlZXRzX3NlcnZpY2UoKTtcbiAgICAgICAgYXdhaXQgc2hlZXRzX3NlcnZpY2Uuc3ByZWFkc2hlZXRzLnZhbHVlcy5hcHBlbmQoe1xuICAgICAgICAgICAgc3ByZWFkc2hlZXRJZDogdGhpcy5sb2dpbl9zaGVldF9vcHRzLlNIRUVUX0lELFxuICAgICAgICAgICAgcmFuZ2U6IHRoaXMuYWN0aW9uX2xvZ19zaGVldCxcbiAgICAgICAgICAgIHZhbHVlSW5wdXRPcHRpb246IFwiVVNFUl9FTlRFUkVEXCIsXG4gICAgICAgICAgICByZXF1ZXN0Qm9keToge1xuICAgICAgICAgICAgICAgIHZhbHVlczogW1t0aGlzLnBhdHJvbGxlcl9uYW1lLCBuZXcgRGF0ZSgpLCBhY3Rpb25fbmFtZV1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMgbG9nb3V0KCkge1xuICAgICAgICBjb25zdCB1c2VyX2NyZWRzID0gdGhpcy5nZXRfdXNlcl9jcmVkcygpO1xuICAgICAgICBhd2FpdCB1c2VyX2NyZWRzLmRlbGV0ZVRva2VuKCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZTogXCJPa2F5LCBJIGhhdmUgcmVtb3ZlZCBhbGwgbG9naW4gc2Vzc2lvbiBpbmZvcm1hdGlvbi5cIixcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXRfc3luY19jbGllbnQoKSB7XG4gICAgICAgIGlmICghdGhpcy5zeW5jX2NsaWVudCkge1xuICAgICAgICAgICAgdGhpcy5zeW5jX2NsaWVudCA9IHRoaXMudHdpbGlvX2NsaWVudC5zeW5jLnNlcnZpY2VzKHRoaXMuc3luY19zaWQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnN5bmNfY2xpZW50O1xuICAgIH1cblxuICAgIGdldF91c2VyX2NyZWRzKCkge1xuICAgICAgICBpZiAoIXRoaXMudXNlcl9jcmVkcykge1xuICAgICAgICAgICAgdGhpcy51c2VyX2NyZWRzID0gbmV3IFVzZXJDcmVkcyhcbiAgICAgICAgICAgICAgICB0aGlzLmdldF9zeW5jX2NsaWVudCgpLFxuICAgICAgICAgICAgICAgIHRoaXMuZnJvbSxcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJfYXV0aF9vcHRzXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJfY3JlZHM7XG4gICAgfVxuXG4gICAgZ2V0X3NlcnZpY2VfY3JlZHMoKSB7XG4gICAgICAgIGlmICghdGhpcy5zZXJ2aWNlX2NyZWRzKSB7XG4gICAgICAgICAgICB0aGlzLnNlcnZpY2VfY3JlZHMgPSBuZXcgZ29vZ2xlLmF1dGguR29vZ2xlQXV0aCh7XG4gICAgICAgICAgICAgICAga2V5RmlsZTogUnVudGltZS5nZXRBc3NldHMoKVtcIi9zZXJ2aWNlLWNyZWRlbnRpYWxzLmpzb25cIl0ucGF0aCxcbiAgICAgICAgICAgICAgICBzY29wZXM6IHRoaXMuU0NPUEVTLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZV9jcmVkcztcbiAgICB9XG5cbiAgICBhc3luYyBnZXRfdmFsaWRfY3JlZHMocmVxdWlyZV91c2VyX2NyZWRzOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHRoaXMudXNlX3NlcnZpY2VfYWNjb3VudCAmJiAhcmVxdWlyZV91c2VyX2NyZWRzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRfc2VydmljZV9jcmVkcygpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVzZXJfY3JlZHMgPSB0aGlzLmdldF91c2VyX2NyZWRzKCk7XG4gICAgICAgIGlmICghKGF3YWl0IHVzZXJfY3JlZHMubG9hZFRva2VuKCkpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVc2VyIGlzIG5vdCBhdXRoZWQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVXNpbmcgdXNlciBhY2NvdW50IGZvciBzZXJ2aWNlIGF1dGguLi5cIik7XG4gICAgICAgIHJldHVybiB1c2VyX2NyZWRzLm9hdXRoMl9jbGllbnQ7XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0X3NoZWV0c19zZXJ2aWNlKCkge1xuICAgICAgICBpZiAoIXRoaXMuc2hlZXRzX3NlcnZpY2UpIHtcbiAgICAgICAgICAgIHRoaXMuc2hlZXRzX3NlcnZpY2UgPSBnb29nbGUuc2hlZXRzKHtcbiAgICAgICAgICAgICAgICB2ZXJzaW9uOiBcInY0XCIsXG4gICAgICAgICAgICAgICAgYXV0aDogYXdhaXQgdGhpcy5nZXRfdmFsaWRfY3JlZHMoKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNoZWV0c19zZXJ2aWNlO1xuICAgIH1cblxuICAgIGFzeW5jIGdldF9sb2dpbl9zaGVldCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmxvZ2luX3NoZWV0KSB7XG4gICAgICAgICAgICBjb25zdCBzaGVldHNfc2VydmljZSA9IGF3YWl0IHRoaXMuZ2V0X3NoZWV0c19zZXJ2aWNlKCk7XG4gICAgICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IG5ldyBMb2dpblNoZWV0KFxuICAgICAgICAgICAgICAgIHNoZWV0c19zZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHRoaXMubG9naW5fc2hlZXRfb3B0c1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGF3YWl0IGxvZ2luX3NoZWV0LnJlZnJlc2goKTtcbiAgICAgICAgICAgIHRoaXMubG9naW5fc2hlZXQgPSBsb2dpbl9zaGVldDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5sb2dpbl9zaGVldDtcbiAgICB9XG5cbiAgICBhc3luYyBnZXRfdXNlcl9zY3JpcHRzX3NlcnZpY2UoKSB7XG4gICAgICAgIGlmICghdGhpcy51c2VyX3NjcmlwdHNfc2VydmljZSkge1xuICAgICAgICAgICAgdGhpcy51c2VyX3NjcmlwdHNfc2VydmljZSA9IGdvb2dsZS5zY3JpcHQoe1xuICAgICAgICAgICAgICAgIHZlcnNpb246IFwidjFcIixcbiAgICAgICAgICAgICAgICBhdXRoOiBhd2FpdCB0aGlzLmdldF92YWxpZF9jcmVkcyh0cnVlKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJfc2NyaXB0c19zZXJ2aWNlO1xuICAgIH1cblxuICAgIGFzeW5jIGdldF9wYXRyb2xsZXJfbmFtZSgpIHtcbiAgICAgICAgY29uc3Qgc2hlZXRzX3NlcnZpY2UgPSBhd2FpdCB0aGlzLmdldF9zaGVldHNfc2VydmljZSgpO1xuICAgICAgICBjb25zdCBwaG9uZV9sb29rdXAgPSBhd2FpdCBmaW5kX3BhdHJvbGxlcl9mcm9tX251bWJlcihcbiAgICAgICAgICAgIHRoaXMuZnJvbSxcbiAgICAgICAgICAgIHNoZWV0c19zZXJ2aWNlLFxuICAgICAgICAgICAgdGhpcy5maW5kX3BhdHJvbGxlcl9vcHRzXG4gICAgICAgICk7XG4gICAgICAgIGlmIChwaG9uZV9sb29rdXAgPT09IHVuZGVmaW5lZCB8fCBwaG9uZV9sb29rdXAgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBTb3JyeSwgSSBjb3VsZG4ndCBmaW5kIGFuIGFzc29jaWF0ZWQgQlZOU1AgbWVtYmVyIHdpdGggeW91ciBwaG9uZSBudW1iZXIgKCR7dGhpcy5mcm9tfSlgLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKTtcbiAgICAgICAgY29uc3QgbWFwcGVkUGF0cm9sbGVyID0gbG9naW5fc2hlZXQudHJ5X2ZpbmRfcGF0cm9sbGVyKFxuICAgICAgICAgICAgcGhvbmVfbG9va3VwLm5hbWVcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKG1hcHBlZFBhdHJvbGxlciA9PT0gXCJub3RfZm91bmRcIikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYENvdWxkIG5vdCBmaW5kIHBhdHJvbGxlciAnJHtwaG9uZV9sb29rdXAubmFtZX0nIGluIGxvZ2luIHNoZWV0LiBQbGVhc2UgbG9vayBhdCB0aGUgbG9naW4gc2hlZXQgbmFtZSwgYW5kIGNvcHkgaXQgdG8gdGhlIFBob25lIE51bWJlcnMgdGFiLmAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGF0cm9sbGVyX25hbWUgPSBwaG9uZV9sb29rdXAubmFtZTtcbiAgICB9XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=