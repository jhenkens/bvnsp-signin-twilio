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
/* harmony export */   get_service_credentials_path: () => (/* binding */ get_service_credentials_path),
/* harmony export */   load_credentials_files: () => (/* binding */ load_credentials_files)
/* harmony export */ });
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _twilio_labs_serverless_runtime_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @twilio-labs/serverless-runtime-types */ "@twilio-labs/serverless-runtime-types");
/* harmony import */ var _twilio_labs_serverless_runtime_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_twilio_labs_serverless_runtime_types__WEBPACK_IMPORTED_MODULE_1__);


function load_credentials_files() {
    return JSON.parse(fs__WEBPACK_IMPORTED_MODULE_0__.readFileSync(Runtime.getAssets()["/credentials.json"].path)
        .toString());
}
function get_service_credentials_path() {
    return Runtime.getAssets()["/service-credentials.json"].path;
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

/***/ "@twilio-labs/serverless-runtime-types":
/*!********************************************************!*\
  !*** external "@twilio-labs/serverless-runtime-types" ***!
  \********************************************************/
/***/ ((module) => {

module.exports = require("@twilio-labs/serverless-runtime-types");

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
/* harmony import */ var _twilio_labs_serverless_runtime_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @twilio-labs/serverless-runtime-types */ "@twilio-labs/serverless-runtime-types");
/* harmony import */ var _twilio_labs_serverless_runtime_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_twilio_labs_serverless_runtime_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var googleapis__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! googleapis */ "googleapis");
/* harmony import */ var googleapis__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(googleapis__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _login_sheet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login-sheet */ "./src/login-sheet.ts");
/* harmony import */ var _user_creds__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./user-creds */ "./src/user-creds.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util */ "./src/util.ts");
/* harmony import */ var _file_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./file-utils */ "./src/file-utils.ts");
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
                console.log("Error", e.stack);
                console.log("Error", e.name);
                console.log("Error", e.message);
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
            else if (((_a = this.bvnsp_checkin_next_step) === null || _a === void 0 ? void 0 : _a.startsWith("confirm-reset")) &&
                this.body) {
                if (this.body == "yes" && this.parse_checkin_from_next_step()) {
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
                this.checkin_values.by_sheet_string[patroller_status.checkin].key ==
                    "out";
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
            const completedPatrolDays = yield (0,_util__WEBPACK_IMPORTED_MODULE_4__.get_patrolled_days)(this.patroller_name, yield this.get_sheets_service(), this.patroller_season_opts);
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
            if (!this.checkin_mode ||
                (checkin_mode = this.checkin_values.by_key[this.checkin_mode]) ===
                    undefined) {
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
            this.user_creds = new _user_creds__WEBPACK_IMPORTED_MODULE_3__.UserCreds(this.get_sync_client(), this.from, this.user_auth_opts);
        }
        return this.user_creds;
    }
    get_service_creds() {
        if (!this.service_creds) {
            this.service_creds = new googleapis__WEBPACK_IMPORTED_MODULE_1__.google.auth.GoogleAuth({
                keyFile: (0,_file_utils__WEBPACK_IMPORTED_MODULE_5__.get_service_credentials_path)(),
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
                this.sheets_service = googleapis__WEBPACK_IMPORTED_MODULE_1__.google.sheets({
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
                const login_sheet = new _login_sheet__WEBPACK_IMPORTED_MODULE_2__.LoginSheet(sheets_service, this.login_sheet_opts);
                yield login_sheet.refresh();
                this.login_sheet = login_sheet;
            }
            return this.login_sheet;
        });
    }
    get_user_scripts_service() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.user_scripts_service) {
                this.user_scripts_service = googleapis__WEBPACK_IMPORTED_MODULE_1__.google.script({
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
            const phone_lookup = yield (0,_util__WEBPACK_IMPORTED_MODULE_4__.find_patroller_from_number)(this.from, sheets_service, this.find_patroller_opts);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUN6QyxDQUFDLENBQUM7YUFDTjtZQUNELE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDO1FBQ3JDLENBQUM7S0FBQTtJQUVLLGtCQUFrQjs7WUFDcEIsTUFBTSxjQUFjLEdBQUcsTUFBTSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUN2RCxNQUFNLFlBQVksR0FBRyxNQUFNLGlFQUEwQixDQUNqRCxJQUFJLENBQUMsSUFBSSxFQUNULGNBQWMsRUFDZCxJQUFJLENBQUMsbUJBQW1CLENBQzNCLENBQUM7WUFDRixJQUFJLFlBQVksS0FBSyxTQUFTLElBQUksWUFBWSxLQUFLLElBQUksRUFBRTtnQkFDckQsT0FBTztvQkFDSCxRQUFRLEVBQUUsNkVBQTZFLElBQUksQ0FBQyxJQUFJLEdBQUc7aUJBQ3RHLENBQUM7YUFDTDtZQUVELE1BQU0sV0FBVyxHQUFHLE1BQU0sSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ2pELE1BQU0sZUFBZSxHQUFHLFdBQVcsQ0FBQyxrQkFBa0IsQ0FDbEQsWUFBWSxDQUFDLElBQUksQ0FDcEIsQ0FBQztZQUNGLElBQUksZUFBZSxLQUFLLFdBQVcsRUFBRTtnQkFDakMsT0FBTztvQkFDSCxRQUFRLEVBQUUsNkJBQTZCLFlBQVksQ0FBQyxJQUFJLDhGQUE4RjtpQkFDekosQ0FBQzthQUNMO1lBQ0QsSUFBSSxDQUFDLGNBQWMsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDO1FBQzVDLENBQUM7S0FBQTtDQUNKIiwic291cmNlcyI6WyIvVXNlcnMvam9oYW5oZW5rZW5zL1JlcG9zaXRvcmllcy9wZXJzb25hbF9wcm9qZWN0cy9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9maWxlLXV0aWxzLnRzIiwiL1VzZXJzL2pvaGFuaGVua2Vucy9SZXBvc2l0b3JpZXMvcGVyc29uYWxfcHJvamVjdHMvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvbG9naW4tc2hlZXQudHMiLCIvVXNlcnMvam9oYW5oZW5rZW5zL1JlcG9zaXRvcmllcy9wZXJzb25hbF9wcm9qZWN0cy9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91c2VyLWNyZWRzLnRzIiwiL1VzZXJzL2pvaGFuaGVua2Vucy9SZXBvc2l0b3JpZXMvcGVyc29uYWxfcHJvamVjdHMvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbC50cyIsImV4dGVybmFsIGNvbW1vbmpzIFwiQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlc1wiIiwiZXh0ZXJuYWwgY29tbW9uanMgXCJnb29nbGVhcGlzXCIiLCJleHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiZnNcIiIsIndlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIi9Vc2Vycy9qb2hhbmhlbmtlbnMvUmVwb3NpdG9yaWVzL3BlcnNvbmFsX3Byb2plY3RzL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL2hhbmRsZXIucHJvdGVjdGVkLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICdAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzJztcbmZ1bmN0aW9uIGxvYWRfY3JlZGVudGlhbHNfZmlsZXMoKSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoXG4gICAgICAgIGZzXG4gICAgICAgICAgICAucmVhZEZpbGVTeW5jKFJ1bnRpbWUuZ2V0QXNzZXRzKClbXCIvY3JlZGVudGlhbHMuanNvblwiXS5wYXRoKVxuICAgICAgICAgICAgLnRvU3RyaW5nKClcbiAgICApO1xufVxuZnVuY3Rpb24gZ2V0X3NlcnZpY2VfY3JlZGVudGlhbHNfcGF0aCgpIHtcbiAgICByZXR1cm4gUnVudGltZS5nZXRBc3NldHMoKVtcIi9zZXJ2aWNlLWNyZWRlbnRpYWxzLmpzb25cIl0ucGF0aDtcbn1cbmV4cG9ydCB7IGxvYWRfY3JlZGVudGlhbHNfZmlsZXMsIGdldF9zZXJ2aWNlX2NyZWRlbnRpYWxzX3BhdGggfTtcbiIsImltcG9ydCB7IHNoZWV0c192NCB9IGZyb20gXCJnb29nbGVhcGlzXCI7XG5pbXBvcnQge1xuICAgIHBhcnNlX3BhdHJvbGxlcl9yb3csXG4gICAgbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQsXG4gICAgc3RyaXBfZGF0ZXRpbWVfdG9fZGF0ZSxcbiAgICBwYXJzZV90aW1lX3RvX3V0YyxcbiAgICBleGNlbF9kYXRlX3RvX2pzX2RhdGUsXG4gICAgUGF0cm9sbGVyUm93LFxufSBmcm9tIFwiLi91dGlsXCI7XG5cbmZ1bmN0aW9uIHNhbml0aXplX2RhdGUoZGF0ZTogbnVtYmVyKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gc3RyaXBfZGF0ZXRpbWVfdG9fZGF0ZShcbiAgICAgICAgcGFyc2VfdGltZV90b191dGMoZXhjZWxfZGF0ZV90b19qc19kYXRlKGRhdGUpKVxuICAgICk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxudHlwZSBMT0dJTl9TSEVFVF9PUFRTID0ge1xuICAgIFNIRUVUX0lEOiBzdHJpbmc7XG4gICAgTE9HSU5fU0hFRVRfTE9PS1VQOiBzdHJpbmc7XG4gICAgTlVNQkVSX0NIRUNLSU5TX0xPT0tVUDogc3RyaW5nO1xuICAgIEFSQ0hJVkVEX0NFTEw6IHN0cmluZztcbiAgICBTSEVFVF9EQVRFX0NFTEw6IHN0cmluZztcbiAgICBDVVJSRU5UX0RBVEVfQ0VMTDogc3RyaW5nO1xuICAgIFNFQ1RJT05fRFJPUERPV05fQ09MVU1OOiBzdHJpbmc7XG4gICAgQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU46IHN0cmluZztcbiAgICBDSEVDS0lOX1ZBTFVFUzogc3RyaW5nO1xufTtcbmNsYXNzIExvZ2luU2hlZXQge1xuICAgIHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzO1xuICAgIG9wdHM6IExPR0lOX1NIRUVUX09QVFM7XG4gICAgcm93cz86IGFueVtdW10gfCBudWxsID0gbnVsbDtcbiAgICBudW1iZXJfY2hlY2tpbnM6IG51bWJlciB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgICBjb25zdHJ1Y3RvcihzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cywgY29udGV4dDogTE9HSU5fU0hFRVRfT1BUUykge1xuICAgICAgICB0aGlzLm9wdHMgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLnNoZWV0c19zZXJ2aWNlID0gc2hlZXRzX3NlcnZpY2U7XG4gICAgICAgIHRoaXMucm93cyA9IG51bGw7XG4gICAgfVxuICAgIGFzeW5jIHJlZnJlc2goKSB7XG4gICAgICAgIHRoaXMucm93cyA9IChcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuc2hlZXRzX3NlcnZpY2Uuc3ByZWFkc2hlZXRzLnZhbHVlcy5nZXQoe1xuICAgICAgICAgICAgICAgIHNwcmVhZHNoZWV0SWQ6IHRoaXMub3B0cy5TSEVFVF9JRCxcbiAgICAgICAgICAgICAgICByYW5nZTogdGhpcy5vcHRzLkxPR0lOX1NIRUVUX0xPT0tVUCxcbiAgICAgICAgICAgICAgICB2YWx1ZVJlbmRlck9wdGlvbjogXCJVTkZPUk1BVFRFRF9WQUxVRVwiLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgKS5kYXRhLnZhbHVlcyE7XG4gICAgICAgIHRoaXMubnVtYmVyX2NoZWNraW5zID0gKFxuICAgICAgICAgICAgYXdhaXQgdGhpcy5zaGVldHNfc2VydmljZS5zcHJlYWRzaGVldHMudmFsdWVzLmdldCh7XG4gICAgICAgICAgICAgICAgc3ByZWFkc2hlZXRJZDogdGhpcy5vcHRzLlNIRUVUX0lELFxuICAgICAgICAgICAgICAgIHJhbmdlOiB0aGlzLm9wdHMuTlVNQkVSX0NIRUNLSU5TX0xPT0tVUCxcbiAgICAgICAgICAgICAgICB2YWx1ZVJlbmRlck9wdGlvbjogXCJVTkZPUk1BVFRFRF9WQUxVRVwiLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgKS5kYXRhLnZhbHVlcyFbMF1bMF07XG4gICAgfVxuICAgIGdldCBhcmNoaXZlZCgpIHtcbiAgICAgICAgY29uc3QgYXJjaGl2ZWQgPSBsb29rdXBfcm93X2NvbF9pbl9zaGVldChcbiAgICAgICAgICAgIHRoaXMub3B0cy5BUkNISVZFRF9DRUxMLFxuICAgICAgICAgICAgdGhpcy5yb3dzIVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgKGFyY2hpdmVkID09PSB1bmRlZmluZWQgJiYgdGhpcy5udW1iZXJfY2hlY2tpbnMgPT09IDApIHx8XG4gICAgICAgICAgICBhcmNoaXZlZC50b0xvd2VyQ2FzZSgpID09PSBcInllc1wiXG4gICAgICAgICk7XG4gICAgfVxuICAgIGdldCBzaGVldF9kYXRlKCkge1xuICAgICAgICByZXR1cm4gc2FuaXRpemVfZGF0ZShcbiAgICAgICAgICAgIGxvb2t1cF9yb3dfY29sX2luX3NoZWV0KHRoaXMub3B0cy5TSEVFVF9EQVRFX0NFTEwsIHRoaXMucm93cyEpXG4gICAgICAgICk7XG4gICAgfVxuICAgIGdldCBjdXJyZW50X2RhdGUoKSB7XG4gICAgICAgIHJldHVybiBzYW5pdGl6ZV9kYXRlKFxuICAgICAgICAgICAgbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQodGhpcy5vcHRzLkNVUlJFTlRfREFURV9DRUxMLCB0aGlzLnJvd3MhKVxuICAgICAgICApO1xuICAgIH1cbiAgICBnZXQgaXNfY3VycmVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hlZXRfZGF0ZS5nZXRUaW1lKCkgPT09IHRoaXMuY3VycmVudF9kYXRlLmdldFRpbWUoKTtcbiAgICB9XG4gICAgdHJ5X2ZpbmRfcGF0cm9sbGVyKG5hbWU6IHN0cmluZykge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMucm93cyEuZmluZEluZGV4KChyb3cpID0+IHJvd1swXSA9PT0gbmFtZSk7XG4gICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiBcIm5vdF9mb3VuZFwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXJzZV9wYXRyb2xsZXJfcm93KGluZGV4LCB0aGlzLnJvd3MhW2luZGV4XSwgdGhpcy5vcHRzKTtcbiAgICB9XG4gICAgZmluZF9wYXRyb2xsZXIobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMudHJ5X2ZpbmRfcGF0cm9sbGVyKG5hbWUpO1xuICAgICAgICBpZiAocmVzdWx0ID09PSBcIm5vdF9mb3VuZFwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBmaW5kICR7bmFtZX0gaW4gbG9naW4gc2hlZXRgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGdldF9vbl9kdXR5X3BhdHJvbGxlcnMoKTogUGF0cm9sbGVyUm93W10ge1xuICAgICAgICBpZighdGhpcy5pc19jdXJyZW50KXtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxvZ2luIHNoZWV0IGlzIG5vdCBjdXJyZW50XCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnJvd3MhLmZpbHRlcigoeCkgPT4gW1wiUFwiLCBcIkNcIiwgXCJEUlwiXS5pbmNsdWRlcyh4WzFdKSkubWFwKFxuICAgICAgICAgICAgKHgsIGkpID0+IHBhcnNlX3BhdHJvbGxlcl9yb3coaSwgeCwgdGhpcy5vcHRzKVxuICAgICAgICApLmZpbHRlcigoeCkgPT4geC5jaGVja2luKTtcbiAgICB9XG5cbiAgICBhc3luYyBjaGVja2luKHBhdHJvbGxlcl9uYW1lOiBzdHJpbmcsIG5ld19jaGVja2luX3ZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzX2N1cnJlbnQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxvZ2luIHNoZWV0IGlzIG5vdCBjdXJyZW50XCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhdHJvbGxlcl9zdGF0dXMgPSB0aGlzLmZpbmRfcGF0cm9sbGVyKHBhdHJvbGxlcl9uYW1lKTtcbiAgICAgICAgY29uc29sZS5sb2coYEV4aXN0aW5nIHN0YXR1czogJHtKU09OLnN0cmluZ2lmeShwYXRyb2xsZXJfc3RhdHVzKX1gKTtcblxuICAgICAgICBjb25zdCBzaGVldElkID0gdGhpcy5vcHRzLlNIRUVUX0lEO1xuICAgICAgICBjb25zdCBzaGVldE5hbWUgPSB0aGlzLm9wdHMuTE9HSU5fU0hFRVRfTE9PS1VQLnNwbGl0KFwiIVwiKVswXTtcbiAgICAgICAgY29uc3Qgcm93ID0gcGF0cm9sbGVyX3N0YXR1cy5pbmRleCArIDE7IC8vIHByb2dyYW1taW5nIC0+IGV4Y2VsIGxvb2t1cFxuICAgICAgICBjb25zdCByYW5nZSA9IGAke3NoZWV0TmFtZX0hJHt0aGlzLm9wdHMuQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU59JHtyb3d9YDtcbiAgICAgICAgY29uc3QgdXBkYXRlTWUgPSAoXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnNoZWV0c19zZXJ2aWNlLnNwcmVhZHNoZWV0cy52YWx1ZXMuZ2V0KHtcbiAgICAgICAgICAgICAgICBzcHJlYWRzaGVldElkOiBzaGVldElkLFxuICAgICAgICAgICAgICAgIHJhbmdlOiByYW5nZSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICkuZGF0YTtcblxuICAgICAgICB1cGRhdGVNZS52YWx1ZXMgPSBbW25ld19jaGVja2luX3ZhbHVlXV07XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVXBkYXRpbmcuLi4uXCIpO1xuICAgICAgICBhd2FpdCB0aGlzLnNoZWV0c19zZXJ2aWNlLnNwcmVhZHNoZWV0cy52YWx1ZXMudXBkYXRlKHtcbiAgICAgICAgICAgIHNwcmVhZHNoZWV0SWQ6IHNoZWV0SWQsXG4gICAgICAgICAgICB2YWx1ZUlucHV0T3B0aW9uOiBcIlVTRVJfRU5URVJFRFwiLFxuICAgICAgICAgICAgcmFuZ2U6IHVwZGF0ZU1lLnJhbmdlISxcbiAgICAgICAgICAgIHJlcXVlc3RCb2R5OiB1cGRhdGVNZSxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgeyBMb2dpblNoZWV0LCBMT0dJTl9TSEVFVF9PUFRTIH07XG4iLCJpbXBvcnQgeyBnb29nbGUgfSBmcm9tIFwiZ29vZ2xlYXBpc1wiO1xuaW1wb3J0IHsgR2VuZXJhdGVBdXRoVXJsT3B0cyB9IGZyb20gXCJnb29nbGUtYXV0aC1saWJyYXJ5XCI7XG5pbXBvcnQgeyBPQXV0aDJDbGllbnQgfSBmcm9tIFwiZ29vZ2xlYXBpcy1jb21tb25cIjtcbmltcG9ydCB7IHNhbml0aXplX251bWJlciB9IGZyb20gXCIuL3V0aWxcIjtcbmltcG9ydCB7IGxvYWRfY3JlZGVudGlhbHNfZmlsZXMgfSBmcm9tIFwiLi9maWxlLXV0aWxzXCI7XG5pbXBvcnQgeyBTZXJ2aWNlQ29udGV4dCB9IGZyb20gXCJAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzL3R5cGVzXCI7XG5cbmNvbnN0IFNDT1BFUyA9IFtcbiAgICBcImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvc2NyaXB0LnByb2plY3RzXCIsXG4gICAgXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3NwcmVhZHNoZWV0c1wiLFxuXTtcblxuZnVuY3Rpb24gdmFsaWRhdGVfc2NvcGVzKHNjb3Blczogc3RyaW5nW10pIHtcbiAgICBmb3IgKGNvbnN0IGRlc2lyZWRfc2NvcGUgb2YgU0NPUEVTKSB7XG4gICAgICAgIGlmIChzY29wZXMgPT09IHVuZGVmaW5lZCB8fCAhc2NvcGVzLmluY2x1ZGVzKGRlc2lyZWRfc2NvcGUpKSB7XG4gICAgICAgICAgICBjb25zdCBlcnJvciA9IGBNaXNzaW5nIHNjb3BlICR7ZGVzaXJlZF9zY29wZX0gaW4gcmVjZWl2ZWQgc2NvcGVzOiAke3Njb3Blc31gO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxudHlwZSBVU0VSX0NSRURTX09QVFMgPSB7XG4gICAgTlNQX0VNQUlMX0RPTUFJTjogc3RyaW5nIHwgdW5kZWZpbmVkIHwgbnVsbDtcbn07XG5jbGFzcyBVc2VyQ3JlZHMge1xuICAgIG51bWJlcjogbnVtYmVyO1xuICAgIG9hdXRoMl9jbGllbnQ6IE9BdXRoMkNsaWVudDtcbiAgICBzeW5jX2NsaWVudDogU2VydmljZUNvbnRleHQ7XG4gICAgZG9tYWluPzogc3RyaW5nO1xuICAgIGxvYWRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBzeW5jX2NsaWVudDogU2VydmljZUNvbnRleHQsXG4gICAgICAgIG51bWJlcjogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgICAgICBvcHRzOiBVU0VSX0NSRURTX09QVFNcbiAgICApIHtcbiAgICAgICAgaWYgKG51bWJlciA9PT0gdW5kZWZpbmVkIHx8IG51bWJlciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTnVtYmVyIGlzIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm51bWJlciA9IHNhbml0aXplX251bWJlcihudW1iZXIpO1xuXG4gICAgICAgIGNvbnN0IGNyZWRlbnRpYWxzID0gbG9hZF9jcmVkZW50aWFsc19maWxlcygpO1xuICAgICAgICBjb25zdCB7IGNsaWVudF9zZWNyZXQsIGNsaWVudF9pZCwgcmVkaXJlY3RfdXJpcyB9ID0gY3JlZGVudGlhbHMud2ViO1xuICAgICAgICB0aGlzLm9hdXRoMl9jbGllbnQgPSBuZXcgZ29vZ2xlLmF1dGguT0F1dGgyKFxuICAgICAgICAgICAgY2xpZW50X2lkLFxuICAgICAgICAgICAgY2xpZW50X3NlY3JldCxcbiAgICAgICAgICAgIHJlZGlyZWN0X3VyaXNbMF1cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zeW5jX2NsaWVudCA9IHN5bmNfY2xpZW50O1xuICAgICAgICBsZXQgZG9tYWluID0gb3B0cy5OU1BfRU1BSUxfRE9NQUlOO1xuICAgICAgICBpZiAoZG9tYWluID09PSB1bmRlZmluZWQgfHwgZG9tYWluID09PSBudWxsIHx8IGRvbWFpbiA9PT0gXCJcIikge1xuICAgICAgICAgICAgZG9tYWluID0gdW5kZWZpbmVkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kb21haW4gPSBkb21haW47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBsb2FkVG9rZW4oKSB7XG4gICAgICAgIGlmICghdGhpcy5sb2FkZWQpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYExvb2tpbmcgZm9yICR7dGhpcy50b2tlbl9rZXl9YCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2F1dGgyRG9jID0gYXdhaXQgdGhpcy5zeW5jX2NsaWVudFxuICAgICAgICAgICAgICAgICAgICAuZG9jdW1lbnRzKHRoaXMudG9rZW5fa2V5KVxuICAgICAgICAgICAgICAgICAgICAuZmV0Y2goKTtcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIG9hdXRoMkRvYyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgICAgIG9hdXRoMkRvYy5kYXRhID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgICAgICBvYXV0aDJEb2MuZGF0YS50b2tlbiA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBEaWRuJ3QgZmluZCAke3RoaXMudG9rZW5fa2V5fWApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRva2VuID0gb2F1dGgyRG9jLmRhdGEudG9rZW47XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlX3Njb3BlcyhvYXV0aDJEb2MuZGF0YS5zY29wZXMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9hdXRoMl9jbGllbnQuc2V0Q3JlZGVudGlhbHModG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgTG9hZGVkIHRva2VuICR7dGhpcy50b2tlbl9rZXl9YCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgICAgIGBGYWlsZWQgdG8gbG9hZCB0b2tlbiBmb3IgJHt0aGlzLnRva2VuX2tleX0uXFxuICR7ZX1gXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5sb2FkZWQ7XG4gICAgfVxuXG4gICAgZ2V0IHRva2VuX2tleSgpIHtcbiAgICAgICAgcmV0dXJuIGBvYXV0aDJfJHt0aGlzLm51bWJlcn1gO1xuICAgIH1cblxuICAgIGFzeW5jIGRlbGV0ZVRva2VuKCkge1xuICAgICAgICBjb25zdCBvYXV0aDJEb2MgPSBhd2FpdCB0aGlzLnN5bmNfY2xpZW50XG4gICAgICAgICAgICAuZG9jdW1lbnRzKHRoaXMudG9rZW5fa2V5KVxuICAgICAgICAgICAgLmZldGNoKCk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIG9hdXRoMkRvYyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICBvYXV0aDJEb2MuZGF0YSA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIG9hdXRoMkRvYy5kYXRhLnRva2VuID09PSB1bmRlZmluZWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgRGlkbid0IGZpbmQgJHt0aGlzLnRva2VuX2tleX1gKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLnN5bmNfY2xpZW50LmRvY3VtZW50cyhvYXV0aDJEb2Muc2lkKS5yZW1vdmUoKTtcbiAgICAgICAgY29uc29sZS5sb2coYERlbGV0ZWQgdG9rZW4gJHt0aGlzLnRva2VuX2tleX1gKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgYXN5bmMgY29tcGxldGVMb2dpbihjb2RlOiBzdHJpbmcsIHNjb3Blczogc3RyaW5nW10pIHtcbiAgICAgICAgdmFsaWRhdGVfc2NvcGVzKHNjb3Blcyk7XG4gICAgICAgIGNvbnN0IHRva2VuID0gYXdhaXQgdGhpcy5vYXV0aDJfY2xpZW50LmdldFRva2VuKGNvZGUpO1xuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShPYmplY3Qua2V5cyh0b2tlbi5yZXMhKSkpO1xuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0b2tlbi50b2tlbnMpKTtcbiAgICAgICAgdGhpcy5vYXV0aDJfY2xpZW50LnNldENyZWRlbnRpYWxzKHRva2VuLnRva2Vucyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBvYXV0aERvYyA9IGF3YWl0IHRoaXMuc3luY19jbGllbnQuZG9jdW1lbnRzLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgZGF0YTogeyB0b2tlbjogdG9rZW4udG9rZW5zLCBzY29wZXM6IHNjb3BlcyB9LFxuICAgICAgICAgICAgICAgIHVuaXF1ZU5hbWU6IHRoaXMudG9rZW5fa2V5LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgIGBFeGNlcHRpb24gd2hlbiBjcmVhdGluZyBvYXV0aC4gVHJ5aW5nIHRvIHVwZGF0ZSBpbnN0ZWFkLi4uXFxuJHtlfWBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCBvYXV0aERvYyA9IGF3YWl0IHRoaXMuc3luY19jbGllbnRcbiAgICAgICAgICAgICAgICAuZG9jdW1lbnRzKHRoaXMudG9rZW5fa2V5KVxuICAgICAgICAgICAgICAgIC51cGRhdGUoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7IHRva2VuOiB0b2tlbiwgc2NvcGVzOiBzY29wZXMgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGdldEF1dGhVcmwoKSB7XG4gICAgICAgIGNvbnN0IGlkID0gdGhpcy5nZW5lcmF0ZVJhbmRvbVN0cmluZygpO1xuICAgICAgICBjb25zb2xlLmxvZyhgVXNpbmcgbm9uY2UgJHtpZH0gZm9yICR7dGhpcy5udW1iZXJ9YCk7XG4gICAgICAgIGNvbnN0IGRvYyA9IGF3YWl0IHRoaXMuc3luY19jbGllbnQuZG9jdW1lbnRzLmNyZWF0ZSh7XG4gICAgICAgICAgICBkYXRhOiB7IG51bWJlcjogdGhpcy5udW1iZXIsIHNjb3BlczogU0NPUEVTIH0sXG4gICAgICAgICAgICB1bmlxdWVOYW1lOiBpZCxcbiAgICAgICAgICAgIHR0bDogNjAgKiA1LCAvLyA1IG1pbnV0ZXNcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBNYWRlIG5vbmNlLWRvYzogJHtKU09OLnN0cmluZ2lmeShkb2MpfWApO1xuXG4gICAgICAgIGNvbnN0IG9wdHM6IEdlbmVyYXRlQXV0aFVybE9wdHMgPSB7XG4gICAgICAgICAgICBhY2Nlc3NfdHlwZTogXCJvZmZsaW5lXCIsXG4gICAgICAgICAgICBzY29wZTogU0NPUEVTLFxuICAgICAgICAgICAgc3RhdGU6IGlkLFxuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5kb21haW4pIHtcbiAgICAgICAgICAgIG9wdHNbXCJoZFwiXSA9IHRoaXMuZG9tYWluO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYXV0aFVybCA9IHRoaXMub2F1dGgyX2NsaWVudC5nZW5lcmF0ZUF1dGhVcmwob3B0cyk7XG4gICAgICAgIHJldHVybiBhdXRoVXJsO1xuICAgIH1cblxuICAgIGdlbmVyYXRlUmFuZG9tU3RyaW5nKCkge1xuICAgICAgICBjb25zdCBsZW5ndGggPSAzMDtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFwiXCI7XG4gICAgICAgIGNvbnN0IGNoYXJhY3RlcnMgPVxuICAgICAgICAgICAgXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OVwiO1xuICAgICAgICBjb25zdCBjaGFyYWN0ZXJzTGVuZ3RoID0gY2hhcmFjdGVycy5sZW5ndGg7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSBjaGFyYWN0ZXJzLmNoYXJBdChcbiAgICAgICAgICAgICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFyYWN0ZXJzTGVuZ3RoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cblxuZXhwb3J0IHsgVXNlckNyZWRzLCBTQ09QRVMsIFVTRVJfQ1JFRFNfT1BUUyB9O1xuIiwiaW1wb3J0IHsgZ29vZ2xlLCBzaGVldHNfdjQgfSBmcm9tIFwiZ29vZ2xlYXBpc1wiO1xuXG50eXBlIEZJTkRfUEFUUk9MTEVSX09QVFMgPSB7XG4gICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICBQSE9ORV9OVU1CRVJfTE9PS1VQX1NIRUVUOiBzdHJpbmc7XG4gICAgUEhPTkVfTlVNQkVSX05VTUJFUl9DT0xVTU46IHN0cmluZztcbiAgICBQSE9ORV9OVU1CRVJfTkFNRV9DT0xVTU46IHN0cmluZztcbn07XG5hc3luYyBmdW5jdGlvbiBmaW5kX3BhdHJvbGxlcl9mcm9tX251bWJlcihcbiAgICByYXdfbnVtYmVyOiBzdHJpbmcsXG4gICAgc2hlZXRzX3NlcnZpY2U6IHNoZWV0c192NC5TaGVldHMsXG4gICAgb3B0czogRklORF9QQVRST0xMRVJfT1BUU1xuKSB7XG4gICAgY29uc3QgbnVtYmVyID0gc2FuaXRpemVfbnVtYmVyKHJhd19udW1iZXIpO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgc2hlZXRzX3NlcnZpY2Uuc3ByZWFkc2hlZXRzLnZhbHVlcy5nZXQoe1xuICAgICAgICBzcHJlYWRzaGVldElkOiBvcHRzLlNIRUVUX0lELFxuICAgICAgICByYW5nZTogb3B0cy5QSE9ORV9OVU1CRVJfTE9PS1VQX1NIRUVULFxuICAgICAgICB2YWx1ZVJlbmRlck9wdGlvbjogXCJVTkZPUk1BVFRFRF9WQUxVRVwiLFxuICAgIH0pO1xuICAgIGlmICghcmVzcG9uc2UuZGF0YS52YWx1ZXMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGZpbmQgcGF0cm9sbGVyLlwiKTtcbiAgICB9XG4gICAgY29uc3QgcGF0cm9sbGVyID0gcmVzcG9uc2UuZGF0YS52YWx1ZXNcbiAgICAgICAgLm1hcCgocm93KSA9PiB7XG4gICAgICAgICAgICBjb25zdCByYXdOdW1iZXIgPVxuICAgICAgICAgICAgICAgIHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5QSE9ORV9OVU1CRVJfTlVNQkVSX0NPTFVNTildO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudE51bWJlciA9XG4gICAgICAgICAgICAgICAgcmF3TnVtYmVyICE9IHVuZGVmaW5lZCA/IHNhbml0aXplX251bWJlcihyYXdOdW1iZXIpIDogcmF3TnVtYmVyO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudE5hbWUgPVxuICAgICAgICAgICAgICAgIHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5QSE9ORV9OVU1CRVJfTkFNRV9DT0xVTU4pXTtcbiAgICAgICAgICAgIHJldHVybiB7IG5hbWU6IGN1cnJlbnROYW1lLCBudW1iZXI6IGN1cnJlbnROdW1iZXIgfTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZpbHRlcigocGF0cm9sbGVyKSA9PiAocGF0cm9sbGVyLm51bWJlciA9PT0gbnVtYmVyKSlbMF07XG4gICAgcmV0dXJuIHBhdHJvbGxlcjtcbn1cbnR5cGUgUEFUUk9MTEVSX1NFQVNPTl9PUFRTID0ge1xuICAgIFNIRUVUX0lEOiBzdHJpbmc7XG4gICAgU0VBU09OX1NIRUVUOiBzdHJpbmc7XG4gICAgU0VBU09OX1NIRUVUX0RBWVNfQ09MVU1OOiBzdHJpbmc7XG4gICAgU0VBU09OX1NIRUVUX05BTUVfQ09MVU1OOiBzdHJpbmc7XG59O1xuXG5hc3luYyBmdW5jdGlvbiBnZXRfcGF0cm9sbGVkX2RheXMoXG4gICAgcGF0cm9sbGVyX25hbWU6IHN0cmluZyxcbiAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyxcbiAgICBvcHRzOiBQQVRST0xMRVJfU0VBU09OX09QVFNcbikge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgc2hlZXRzX3NlcnZpY2Uuc3ByZWFkc2hlZXRzLnZhbHVlcy5nZXQoe1xuICAgICAgICBzcHJlYWRzaGVldElkOiBvcHRzLlNIRUVUX0lELFxuICAgICAgICByYW5nZTogb3B0cy5TRUFTT05fU0hFRVQsXG4gICAgICAgIHZhbHVlUmVuZGVyT3B0aW9uOiBcIlVORk9STUFUVEVEX1ZBTFVFXCIsXG4gICAgfSk7XG4gICAgaWYgKCFyZXNwb25zZS5kYXRhLnZhbHVlcykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgZmluZCBwYXRyb2xsZXIgaW4gc2Vhc29uIHNoZWV0LlwiKTtcbiAgICB9XG4gICAgY29uc3QgZGF0ZXN0ciA9IG5ldyBEYXRlKClcbiAgICAgICAgLnRvTG9jYWxlRGF0ZVN0cmluZygpXG4gICAgICAgIC5zcGxpdChcIi9cIilcbiAgICAgICAgLm1hcCgoeCkgPT4geC5wYWRTdGFydCgyLCBcIjBcIikpXG4gICAgICAgIC5qb2luKFwiXCIpO1xuICAgIGNvbnN0IHBhdHJvbGxlcl9yb3cgPSByZXNwb25zZS5kYXRhLnZhbHVlcy5maWx0ZXIoKHJvdykgPT4gcm93W2V4Y2VsX3Jvd190b19pbmRleChvcHRzLlNFQVNPTl9TSEVFVF9OQU1FX0NPTFVNTildID09IHBhdHJvbGxlcl9uYW1lKVswXTtcblxuICAgIGlmKCFwYXRyb2xsZXJfcm93KXtcbiAgICAgICAgY29uc29sZS5sb2coXCJDb3VsZG4ndCBmaW5kIGRheXMgZm9yIHBhdHJvbGxlclwiICsgcGF0cm9sbGVyX25hbWUpXG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50TnVtYmVyID1cbiAgICAgICAgcGF0cm9sbGVyX3Jvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5TRUFTT05fU0hFRVRfREFZU19DT0xVTU4pXTtcbiAgICBjb25zdCBjdXJyZW50RGF5ID0gcGF0cm9sbGVyX3Jvd1xuICAgICAgICAubWFwKCh4KSA9PiB4Py50b1N0cmluZygpKVxuICAgICAgICAuZmlsdGVyKCh4KSA9PiB4Py5lbmRzV2l0aChkYXRlc3RyKSlcbiAgICAgICAgLm1hcCgoeCkgPT4gKHg/LnN0YXJ0c1dpdGgoXCJIXCIpID8gMC41IDogMSkpXG4gICAgICAgIC5yZWR1Y2UoKHgsIHksIGkpID0+IHggKyB5LCAwKTtcbiAgICBcbiAgICBjb25zdCBkYXlzQmVmb3JlVG9kYXkgPSBjdXJyZW50TnVtYmVyIC0gY3VycmVudERheTtcbiAgICByZXR1cm4gZGF5c0JlZm9yZVRvZGF5O1xufVxuXG5mdW5jdGlvbiBzcGxpdF90b19yb3dfY29sKGV4Y2VsX2luZGV4OiBzdHJpbmcpIHtcbiAgICBjb25zdCBjb2wgPSBleGNlbF9yb3dfdG9faW5kZXgoZXhjZWxfaW5kZXhbMF0pO1xuICAgIGNvbnN0IHJvdyA9IE51bWJlcihleGNlbF9pbmRleFsxXSkgLSAxO1xuICAgIHJldHVybiBbcm93LCBjb2xdO1xufVxuXG5mdW5jdGlvbiBsb29rdXBfcm93X2NvbF9pbl9zaGVldChleGNlbF9pbmRleDogc3RyaW5nLCBzaGVldDogYW55W11bXSkge1xuICAgIGNvbnN0IFtyb3csIGNvbF0gPSBzcGxpdF90b19yb3dfY29sKGV4Y2VsX2luZGV4KTtcbiAgICByZXR1cm4gc2hlZXRbcm93XVtjb2xdO1xufVxuXG5mdW5jdGlvbiBleGNlbF9yb3dfdG9faW5kZXgocm93OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gcm93LnRvTG93ZXJDYXNlKCkuY2hhckNvZGVBdCgwKSAtIFwiYVwiLmNoYXJDb2RlQXQoMCk7XG59XG5cbmZ1bmN0aW9uIHNhbml0aXplX251bWJlcihudW1iZXI6IG51bWJlciB8IHN0cmluZykge1xuICAgIGxldCBuZXdfbnVtYmVyID0gbnVtYmVyLnRvU3RyaW5nKCk7XG4gICAgbmV3X251bWJlciA9IG5ld19udW1iZXIucmVwbGFjZShcIndoYXRzYXBwOlwiLCBcIlwiKTtcbiAgICBuZXdfbnVtYmVyID0gbmV3X251bWJlci5yZXBsYWNlKC8oXlxcKzF8XFwofFxcKXxcXC58LSkvZywgXCJcIik7XG4gICAgaWYgKG5ld19udW1iZXIuc3RhcnRzV2l0aChcIisxXCIpKSB7XG4gICAgICAgIG5ld19udW1iZXIgPSBuZXdfbnVtYmVyLnN1YnN0cmluZygyKTtcbiAgICB9XG4gICAgcmV0dXJuIHBhcnNlSW50KG5ld19udW1iZXIpO1xufVxuXG50eXBlIFBBVFJPTExFUl9ST1dfT1BUUyA9IHtcbiAgICBTRUNUSU9OX0RST1BET1dOX0NPTFVNTjogc3RyaW5nO1xuICAgIENIRUNLSU5fRFJPUERPV05fQ09MVU1OOiBzdHJpbmc7XG59O1xudHlwZSBQYXRyb2xsZXJSb3cgPSB7XG4gICAgaW5kZXg6IG51bWJlcixcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgc2VjdGlvbjogc3RyaW5nLFxuICAgIGNoZWNraW46IHN0cmluZ1xufVxuZnVuY3Rpb24gcGFyc2VfcGF0cm9sbGVyX3JvdyhcbiAgICBpbmRleDogbnVtYmVyLFxuICAgIHJvdzogc3RyaW5nW10sXG4gICAgb3B0czogUEFUUk9MTEVSX1JPV19PUFRTXG4pOiBQYXRyb2xsZXJSb3cge1xuICAgIHJldHVybiB7XG4gICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgbmFtZTogcm93WzBdLFxuICAgICAgICBzZWN0aW9uOiByb3dbZXhjZWxfcm93X3RvX2luZGV4KG9wdHMuU0VDVElPTl9EUk9QRE9XTl9DT0xVTU4pXSxcbiAgICAgICAgY2hlY2tpbjogcm93W2V4Y2VsX3Jvd190b19pbmRleChvcHRzLkNIRUNLSU5fRFJPUERPV05fQ09MVU1OKV0sXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gZXhjZWxfZGF0ZV90b19qc19kYXRlKGRhdGU6IG51bWJlcikge1xuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBEYXRlKDApO1xuICAgIHJlc3VsdC5zZXRVVENNaWxsaXNlY29uZHMoTWF0aC5yb3VuZCgoZGF0ZSAtIDI1NTY5KSAqIDg2NDAwICogMTAwMCkpO1xuICAgIC8vIGNvbnNvbGUubG9nKGBERUJVRzogZXhjZWxfZGF0ZV90b19qc19kYXRlICgke3Jlc3VsdH0pYClcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBwYXJzZV90aW1lX3RvX3V0YyhkYXRlOiBEYXRlKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IERhdGUoZGF0ZS50b1VUQ1N0cmluZygpLnJlcGxhY2UoXCIgR01UXCIsIFwiIFBTVFwiKSk7XG4gICAgLy8gY29uc29sZS5sb2coYERFQlVHOiBwYXJzZV90aW1lX3RvX3V0YyAoJHtyZXN1bHR9KWApXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gc3RyaXBfZGF0ZXRpbWVfdG9fZGF0ZShkYXRlOiBEYXRlKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IERhdGUoXG4gICAgICAgIGRhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKFwiZW4tVVNcIiwgeyB0aW1lWm9uZTogXCJBbWVyaWNhL0xvc19BbmdlbGVzXCIgfSlcbiAgICApO1xuICAgIC8vIGNvbnNvbGUubG9nKGBERUJVRzogc3RyaXBfZGF0ZXRpbWVfdG9fZGF0ZSAoJHtyZXN1bHR9KWApXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gbG9nQWN0aW9uKFxuICAgIHBhdHJvbGxlcl9uYW1lOiBzdHJpbmcsXG4gICAgc2hlZXRzX3NlcnZpY2U6IHNoZWV0c192NC5TaGVldHMsXG4gICAgc2hlZXRfaWQ6IHN0cmluZyxcbiAgICB1c2VyX3N0YXRpc3RpY3Nfc2hlZXQ6IHN0cmluZyxcbiAgICBhY3Rpb246IHN0cmluZ1xuKSB7XG4gICAgYXdhaXQgc2hlZXRzX3NlcnZpY2Uuc3ByZWFkc2hlZXRzLnZhbHVlcy5hcHBlbmQoe1xuICAgICAgICBzcHJlYWRzaGVldElkOiBzaGVldF9pZCxcbiAgICAgICAgcmFuZ2U6IHVzZXJfc3RhdGlzdGljc19zaGVldCxcbiAgICAgICAgdmFsdWVJbnB1dE9wdGlvbjogXCJVU0VSX0VOVEVSRURcIixcbiAgICAgICAgcmVxdWVzdEJvZHk6IHsgdmFsdWVzOiBbW3BhdHJvbGxlcl9uYW1lLCBuZXcgRGF0ZSgpLCBhY3Rpb25dXSB9LFxuICAgIH0pO1xufVxuXG5leHBvcnQge1xuICAgIGV4Y2VsX3Jvd190b19pbmRleCxcbiAgICBwYXJzZV9wYXRyb2xsZXJfcm93LFxuICAgIGV4Y2VsX2RhdGVfdG9fanNfZGF0ZSxcbiAgICBwYXJzZV90aW1lX3RvX3V0YyxcbiAgICBzdHJpcF9kYXRldGltZV90b19kYXRlLFxuICAgIHNhbml0aXplX251bWJlcixcbiAgICBzcGxpdF90b19yb3dfY29sLFxuICAgIGxvb2t1cF9yb3dfY29sX2luX3NoZWV0LFxuICAgIGZpbmRfcGF0cm9sbGVyX2Zyb21fbnVtYmVyLFxuICAgIGxvZ0FjdGlvbixcbiAgICBnZXRfcGF0cm9sbGVkX2RheXMsXG4gICAgRklORF9QQVRST0xMRVJfT1BUUyxcbiAgICBQYXRyb2xsZXJSb3csXG4gICAgUEFUUk9MTEVSX1NFQVNPTl9PUFRTLFxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkB0d2lsaW8tbGFicy9zZXJ2ZXJsZXNzLXJ1bnRpbWUtdHlwZXNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZ29vZ2xlYXBpc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICdAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzJztcbmltcG9ydCB7XG4gICAgQ29udGV4dCxcbiAgICBTZXJ2ZXJsZXNzQ2FsbGJhY2ssXG4gICAgU2VydmVybGVzc0V2ZW50T2JqZWN0LFxuICAgIFNlcnZlcmxlc3NGdW5jdGlvblNpZ25hdHVyZSxcbiAgICBTZXJ2aWNlQ29udGV4dCxcbiAgICBUd2lsaW9DbGllbnQsXG59IGZyb20gXCJAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzL3R5cGVzXCI7XG5pbXBvcnQgeyBnb29nbGUsIHNjcmlwdF92MSwgc2hlZXRzX3Y0IH0gZnJvbSBcImdvb2dsZWFwaXNcIjtcbmltcG9ydCB7IEdvb2dsZUF1dGggfSBmcm9tIFwiZ29vZ2xlYXBpcy1jb21tb25cIjtcbmltcG9ydCB7IExPR0lOX1NIRUVUX09QVFMsIExvZ2luU2hlZXQgfSBmcm9tIFwiLi9sb2dpbi1zaGVldFwiO1xuaW1wb3J0IHsgVVNFUl9DUkVEU19PUFRTLCBVc2VyQ3JlZHMgfSBmcm9tIFwiLi91c2VyLWNyZWRzXCI7XG5pbXBvcnQge1xuICAgIEZJTkRfUEFUUk9MTEVSX09QVFMsXG4gICAgZmluZF9wYXRyb2xsZXJfZnJvbV9udW1iZXIsXG4gICAgZ2V0X3BhdHJvbGxlZF9kYXlzLFxuICAgIFBBVFJPTExFUl9TRUFTT05fT1BUUyxcbiAgICBQYXRyb2xsZXJSb3csXG59IGZyb20gXCIuL3V0aWxcIjtcbmltcG9ydCB7IGdldF9zZXJ2aWNlX2NyZWRlbnRpYWxzX3BhdGggfSBmcm9tIFwiLi9maWxlLXV0aWxzXCI7XG5cbmNvbnN0IE5FWFRfU1RFUF9DT09LSUVfTkFNRSA9IFwiYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXBcIjtcbnR5cGUgSGFuZGxlckV2ZW50ID0gU2VydmVybGVzc0V2ZW50T2JqZWN0PFxuICAgIHtcbiAgICAgICAgRnJvbTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgICBUbzogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgICBudW1iZXI6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAgICAgQm9keTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIH0sXG4gICAge30sXG4gICAge1xuICAgICAgICBidm5zcF9jaGVja2luX25leHRfc3RlcDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIH1cbj47XG50eXBlIEhhbmRsZXJFbnZpcm9ubWVudCA9IHtcbiAgICBTSEVFVF9JRDogc3RyaW5nO1xuICAgIFNDUklQVF9JRDogc3RyaW5nO1xuICAgIFJFU0VUX0ZVTkNUSU9OX05BTUU6IHN0cmluZztcbiAgICBBUkNISVZFX0ZVTkNUSU9OX05BTUU6IHN0cmluZztcbiAgICBQSE9ORV9OVU1CRVJfTE9PS1VQX1NIRUVUOiBzdHJpbmc7XG4gICAgUEhPTkVfTlVNQkVSX05VTUJFUl9DT0xVTU46IHN0cmluZztcbiAgICBQSE9ORV9OVU1CRVJfTkFNRV9DT0xVTU46IHN0cmluZztcbiAgICBTWU5DX1NJRDogc3RyaW5nO1xuICAgIFVTRV9TRVJWSUNFX0FDQ09VTlQ6IHN0cmluZztcbiAgICBOU1BfRU1BSUxfRE9NQUlOOiBzdHJpbmc7XG5cbiAgICBMT0dJTl9TSEVFVF9MT09LVVA6IHN0cmluZztcbiAgICBOVU1CRVJfQ0hFQ0tJTlNfTE9PS1VQOiBzdHJpbmc7XG4gICAgQVJDSElWRURfQ0VMTDogc3RyaW5nO1xuICAgIFNIRUVUX0RBVEVfQ0VMTDogc3RyaW5nO1xuICAgIENVUlJFTlRfREFURV9DRUxMOiBzdHJpbmc7XG4gICAgU0VDVElPTl9EUk9QRE9XTl9DT0xVTU46IHN0cmluZztcbiAgICBDSEVDS0lOX0RST1BET1dOX0NPTFVNTjogc3RyaW5nO1xuICAgIENIRUNLSU5fVkFMVUVTOiBzdHJpbmc7XG4gICAgVVNFUl9TVEFUSVNUSUNTX1NIRUVUOiBzdHJpbmc7XG5cbiAgICBTRUFTT05fU0hFRVQ6IHN0cmluZztcbiAgICBTRUFTT05fU0hFRVRfREFZU19DT0xVTU46IHN0cmluZztcbiAgICBTRUFTT05fU0hFRVRfTkFNRV9DT0xVTU46IHN0cmluZztcbn07XG5cbmV4cG9ydCBjb25zdCBoYW5kbGVyOiBTZXJ2ZXJsZXNzRnVuY3Rpb25TaWduYXR1cmU8XG4gICAgSGFuZGxlckVudmlyb25tZW50LFxuICAgIEhhbmRsZXJFdmVudFxuPiA9IGFzeW5jIGZ1bmN0aW9uIChcbiAgICBjb250ZXh0OiBDb250ZXh0PEhhbmRsZXJFbnZpcm9ubWVudD4sXG4gICAgZXZlbnQ6IFNlcnZlcmxlc3NFdmVudE9iamVjdDxIYW5kbGVyRXZlbnQ+LFxuICAgIGNhbGxiYWNrOiBTZXJ2ZXJsZXNzQ2FsbGJhY2tcbikge1xuICAgIGNvbnN0IGhhbmRsZXIgPSBuZXcgSGFuZGxlcihjb250ZXh0LCBldmVudCk7XG4gICAgbGV0IG1lc3NhZ2U6IHN0cmluZztcbiAgICBsZXQgbmV4dF9zdGVwOiBzdHJpbmcgPSBcIlwiO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXJfcmVzcG9uc2UgPSBhd2FpdCBoYW5kbGVyLmhhbmRsZSgpO1xuICAgICAgICBtZXNzYWdlID1cbiAgICAgICAgICAgIGhhbmRsZXJfcmVzcG9uc2UucmVzcG9uc2UgfHxcbiAgICAgICAgICAgIFwiVW5leHBlY3RlZCByZXN1bHQgLSBubyByZXNwb25zZSBkZXRlcm1pbmVkXCI7XG4gICAgICAgIG5leHRfc3RlcCA9IGhhbmRsZXJfcmVzcG9uc2UubmV4dF9zdGVwIHx8IFwiXCI7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkFuIGVycm9yIG9jY3VyZWRcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICBtZXNzYWdlID0gXCJBbiB1bmV4cGVjdGVkIGVycm9yIG9jY3VyZWQuXCI7XG4gICAgICAgIGlmIChlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIG1lc3NhZ2UgKz0gXCJcXG5cIiArIGUubWVzc2FnZTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvclwiLCBlLnN0YWNrKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3JcIiwgZS5uYW1lKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3JcIiwgZS5tZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHJlc3BvbnNlID0gbmV3IFR3aWxpby5SZXNwb25zZSgpO1xuICAgIGNvbnN0IHR3aW1sID0gbmV3IFR3aWxpby50d2ltbC5NZXNzYWdpbmdSZXNwb25zZSgpO1xuXG4gICAgdHdpbWwubWVzc2FnZShtZXNzYWdlKTtcblxuICAgIHJlc3BvbnNlXG4gICAgICAgIC8vIEFkZCB0aGUgc3RyaW5naWZpZWQgVHdpTUwgdG8gdGhlIHJlc3BvbnNlIGJvZHlcbiAgICAgICAgLnNldEJvZHkodHdpbWwudG9TdHJpbmcoKSlcbiAgICAgICAgLy8gU2luY2Ugd2UncmUgcmV0dXJuaW5nIFR3aU1MLCB0aGUgY29udGVudCB0eXBlIG11c3QgYmUgWE1MXG4gICAgICAgIC5hcHBlbmRIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJ0ZXh0L3htbFwiKVxuICAgICAgICAvLyBZb3UgY2FuIGluY3JlbWVudCB0aGUgY291bnQgc3RhdGUgZm9yIHRoZSBuZXh0IG1lc3NhZ2UsIG9yIGFueSBvdGhlclxuICAgICAgICAvLyBvcGVyYXRpb24gdGhhdCBtYWtlcyBzZW5zZSBmb3IgeW91ciBhcHBsaWNhdGlvbidzIG5lZWRzLiBSZW1lbWJlclxuICAgICAgICAvLyB0aGF0IGNvb2tpZXMgYXJlIGFsd2F5cyBzdG9yZWQgYXMgc3RyaW5nc1xuICAgICAgICAuc2V0Q29va2llKE5FWFRfU1RFUF9DT09LSUVfTkFNRSwgbmV4dF9zdGVwKTtcblxuICAgIHJldHVybiBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7XG59O1xuXG50eXBlIFJlc3BvbnNlID0ge1xuICAgIHJlc3BvbnNlPzogc3RyaW5nO1xuICAgIG5leHRfc3RlcD86IHN0cmluZztcbn07XG5cbmNsYXNzIENoZWNraW5WYWx1ZSB7XG4gICAga2V5OiBzdHJpbmc7XG4gICAgc2hlZXRzX3ZhbHVlOiBzdHJpbmc7XG4gICAgc21zX2Rlc2M6IHN0cmluZztcbiAgICBmYXN0X2NoZWNraW5zOiBzdHJpbmdbXTtcbiAgICBsb29rdXBfdmFsdWVzOiBTZXQ8c3RyaW5nPjtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAga2V5OiBzdHJpbmcsXG4gICAgICAgIHNoZWV0c192YWx1ZTogc3RyaW5nLFxuICAgICAgICBzbXNfZGVzYzogc3RyaW5nLFxuICAgICAgICBmYXN0X2NoZWNraW5zOiBzdHJpbmcgfCBzdHJpbmdbXVxuICAgICkge1xuICAgICAgICBpZiAoIShmYXN0X2NoZWNraW5zIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICAgICAgICBmYXN0X2NoZWNraW5zID0gW2Zhc3RfY2hlY2tpbnNdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgICAgICB0aGlzLnNoZWV0c192YWx1ZSA9IHNoZWV0c192YWx1ZTtcbiAgICAgICAgdGhpcy5zbXNfZGVzYyA9IHNtc19kZXNjO1xuICAgICAgICB0aGlzLmZhc3RfY2hlY2tpbnMgPSBmYXN0X2NoZWNraW5zLm1hcCgoeCkgPT4geC50cmltKCkudG9Mb3dlckNhc2UoKSk7XG5cbiAgICAgICAgY29uc3Qgc21zX2Rlc2Nfc3BsaXQ6IHN0cmluZ1tdID0gc21zX2Rlc2NcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXHMrLywgXCItXCIpXG4gICAgICAgICAgICAudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgLnNwbGl0KFwiL1wiKTtcbiAgICAgICAgY29uc3QgbG9va3VwX3ZhbHMgPSBbLi4udGhpcy5mYXN0X2NoZWNraW5zLCAuLi5zbXNfZGVzY19zcGxpdF07XG4gICAgICAgIHRoaXMubG9va3VwX3ZhbHVlcyA9IG5ldyBTZXQ8c3RyaW5nPihsb29rdXBfdmFscyk7XG4gICAgfVxufVxuXG5jbGFzcyBDaGVja2luVmFsdWVzIHtcbiAgICBieV9rZXk6IHsgW2tleTogc3RyaW5nXTogQ2hlY2tpblZhbHVlIH0gPSB7fTtcbiAgICBieV9sdjogeyBba2V5OiBzdHJpbmddOiBDaGVja2luVmFsdWUgfSA9IHt9O1xuICAgIGJ5X2ZjOiB7IFtrZXk6IHN0cmluZ106IENoZWNraW5WYWx1ZSB9ID0ge307XG4gICAgYnlfc2hlZXRfc3RyaW5nOiB7IFtrZXk6IHN0cmluZ106IENoZWNraW5WYWx1ZSB9ID0ge307XG4gICAgY29uc3RydWN0b3IoanNvbl9ibG9iOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgdmFsdWVzOiBDaGVja2luVmFsdWVbXSA9IFtdO1xuICAgICAgICBmb3IgKHZhciBba2V5LCBzaGVldHNfdmFsdWUsIHNtc19kZXNjLCBmYXN0X2NoZWNraW5dIG9mIEpTT04ucGFyc2UoXG4gICAgICAgICAgICBqc29uX2Jsb2JcbiAgICAgICAgKSkge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IENoZWNraW5WYWx1ZShcbiAgICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICAgc2hlZXRzX3ZhbHVlLFxuICAgICAgICAgICAgICAgIHNtc19kZXNjLFxuICAgICAgICAgICAgICAgIGZhc3RfY2hlY2tpblxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuYnlfa2V5W3Jlc3VsdC5rZXldID0gcmVzdWx0O1xuICAgICAgICAgICAgdGhpcy5ieV9zaGVldF9zdHJpbmdbcmVzdWx0LnNoZWV0c192YWx1ZV0gPSByZXN1bHQ7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGx2IG9mIHJlc3VsdC5sb29rdXBfdmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ieV9sdltsdl0gPSByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZjIG9mIHJlc3VsdC5mYXN0X2NoZWNraW5zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ieV9mY1tmY10gPSByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZW50cmllcygpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKHRoaXMuYnlfa2V5KTtcbiAgICB9XG5cbiAgICBwYXJzZV9mYXN0X2NoZWNraW4oYm9keTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJ5X2ZjW2JvZHldO1xuICAgIH1cblxuICAgIHBhcnNlX2NoZWNraW4oYm9keTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGNoZWNraW5fbG93ZXIgPSBib2R5LnJlcGxhY2UoL1xccysvLCBcIlwiKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnlfbHZbY2hlY2tpbl9sb3dlcl07XG4gICAgfVxufVxuXG5jbGFzcyBIYW5kbGVyIHtcbiAgICBTQ09QRVM6IHN0cmluZ1tdID0gW1wiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9zcHJlYWRzaGVldHNcIl07XG5cbiAgICBzbXNfcmVxdWVzdDogYm9vbGVhbjtcbiAgICByZXN1bHRfbWVzc2FnZXM6IHN0cmluZ1tdID0gW107XG4gICAgZnJvbTogc3RyaW5nO1xuICAgIHRvOiBzdHJpbmc7XG4gICAgYm9keTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIHBhdHJvbGxlcl9uYW1lOiBzdHJpbmcgPSBcIlVua25vd25QYXRyb2xsZXJcIjtcbiAgICBidm5zcF9jaGVja2luX25leHRfc3RlcDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIGNoZWNraW5fbW9kZTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gICAgZmFzdF9jaGVja2luOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICB1c2Vfc2VydmljZV9hY2NvdW50OiBib29sZWFuO1xuICAgIHR3aWxpb19jbGllbnQ6IFR3aWxpb0NsaWVudDtcbiAgICBzeW5jX3NpZDogc3RyaW5nO1xuICAgIHJlc2V0X3NjcmlwdF9pZDogc3RyaW5nO1xuICAgIGFyY2hpdmVfZnVuY3Rpb25fbmFtZTogc3RyaW5nO1xuICAgIHJlc2V0X2Z1bmN0aW9uX25hbWU6IHN0cmluZztcbiAgICB1c2VyX2F1dGhfb3B0czogVVNFUl9DUkVEU19PUFRTO1xuICAgIGZpbmRfcGF0cm9sbGVyX29wdHM6IEZJTkRfUEFUUk9MTEVSX09QVFM7XG4gICAgYWN0aW9uX2xvZ19zaGVldDogc3RyaW5nO1xuXG4gICAgLy8gQ2FjaGUgY2xpZW50c1xuICAgIHN5bmNfY2xpZW50OiBTZXJ2aWNlQ29udGV4dCB8IG51bGwgPSBudWxsO1xuICAgIHVzZXJfY3JlZHM6IFVzZXJDcmVkcyB8IG51bGwgPSBudWxsO1xuICAgIHNlcnZpY2VfY3JlZHM6IEdvb2dsZUF1dGggfCBudWxsID0gbnVsbDtcbiAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyB8IG51bGwgPSBudWxsO1xuICAgIHVzZXJfc2NyaXB0c19zZXJ2aWNlOiBzY3JpcHRfdjEuU2NyaXB0IHwgbnVsbCA9IG51bGw7XG4gICAgbG9naW5fc2hlZXRfb3B0czogTE9HSU5fU0hFRVRfT1BUUztcbiAgICBsb2dpbl9zaGVldDogTG9naW5TaGVldCB8IG51bGwgPSBudWxsO1xuICAgIGNoZWNraW5fdmFsdWVzOiBDaGVja2luVmFsdWVzO1xuICAgIHBhdHJvbGxlcl9zZWFzb25fb3B0czogUEFUUk9MTEVSX1NFQVNPTl9PUFRTO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGNvbnRleHQ6IENvbnRleHQ8SGFuZGxlckVudmlyb25tZW50PixcbiAgICAgICAgZXZlbnQ6IFNlcnZlcmxlc3NFdmVudE9iamVjdDxIYW5kbGVyRXZlbnQ+XG4gICAgKSB7XG4gICAgICAgIC8vIERldGVybWluZSBtZXNzYWdlIGRldGFpbHMgZnJvbSB0aGUgaW5jb21pbmcgZXZlbnQsIHdpdGggZmFsbGJhY2sgdmFsdWVzXG4gICAgICAgIHRoaXMuc21zX3JlcXVlc3QgPSAoZXZlbnQuRnJvbSB8fCBldmVudC5udW1iZXIpICE9PSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZnJvbSA9IGV2ZW50LkZyb20gfHwgZXZlbnQubnVtYmVyIHx8IFwiKzE2NTA4MDQ2Njk4XCI7XG4gICAgICAgIHRoaXMudG8gPSBldmVudC5UbyB8fCBcIisxMjA5MzAwMDA5NlwiO1xuICAgICAgICB0aGlzLmJvZHkgPSBldmVudC5Cb2R5Py50b0xvd2VyQ2FzZSgpPy50cmltKCkucmVwbGFjZSgvXFxzKy8sIFwiLVwiKTtcbiAgICAgICAgdGhpcy5idm5zcF9jaGVja2luX25leHRfc3RlcCA9XG4gICAgICAgICAgICBldmVudC5yZXF1ZXN0LmNvb2tpZXMuYnZuc3BfY2hlY2tpbl9uZXh0X3N0ZXA7XG4gICAgICAgIHRoaXMudXNlX3NlcnZpY2VfYWNjb3VudCA9IGNvbnRleHQuVVNFX1NFUlZJQ0VfQUNDT1VOVCA9PT0gXCJ0cnVlXCI7XG5cbiAgICAgICAgdGhpcy50d2lsaW9fY2xpZW50ID0gY29udGV4dC5nZXRUd2lsaW9DbGllbnQoKTtcbiAgICAgICAgdGhpcy5zeW5jX3NpZCA9IGNvbnRleHQuU1lOQ19TSUQ7XG4gICAgICAgIHRoaXMucmVzZXRfc2NyaXB0X2lkID0gY29udGV4dC5TQ1JJUFRfSUQ7XG4gICAgICAgIHRoaXMuYXJjaGl2ZV9mdW5jdGlvbl9uYW1lID0gY29udGV4dC5BUkNISVZFX0ZVTkNUSU9OX05BTUU7XG4gICAgICAgIHRoaXMucmVzZXRfZnVuY3Rpb25fbmFtZSA9IGNvbnRleHQuUkVTRVRfRlVOQ1RJT05fTkFNRTtcbiAgICAgICAgdGhpcy5hY3Rpb25fbG9nX3NoZWV0ID0gY29udGV4dC5VU0VSX1NUQVRJU1RJQ1NfU0hFRVQ7XG4gICAgICAgIHRoaXMudXNlcl9hdXRoX29wdHMgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLmZpbmRfcGF0cm9sbGVyX29wdHMgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLmxvZ2luX3NoZWV0X29wdHMgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLnBhdHJvbGxlcl9zZWFzb25fb3B0cyA9IGNvbnRleHQ7XG4gICAgICAgIHRoaXMucGF0cm9sbGVyX25hbWU7XG5cbiAgICAgICAgdGhpcy5jaGVja2luX3ZhbHVlcyA9IG5ldyBDaGVja2luVmFsdWVzKGNvbnRleHQuQ0hFQ0tJTl9WQUxVRVMpO1xuICAgIH1cblxuICAgIHBhcnNlX2Zhc3RfY2hlY2tpbl9tb2RlKGJvZHk6IHN0cmluZykge1xuICAgICAgICBjb25zdCBwYXJzZWQgPSB0aGlzLmNoZWNraW5fdmFsdWVzLnBhcnNlX2Zhc3RfY2hlY2tpbihib2R5KTtcbiAgICAgICAgaWYgKHBhcnNlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNraW5fbW9kZSA9IHBhcnNlZC5rZXk7XG4gICAgICAgICAgICB0aGlzLmZhc3RfY2hlY2tpbiA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcGFyc2VfY2hlY2tpbihib2R5OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgcGFyc2VkID0gdGhpcy5jaGVja2luX3ZhbHVlcy5wYXJzZV9jaGVja2luKGJvZHkpO1xuICAgICAgICBpZiAocGFyc2VkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tpbl9tb2RlID0gcGFyc2VkLmtleTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwYXJzZV9jaGVja2luX2Zyb21fbmV4dF9zdGVwKCkge1xuICAgICAgICBjb25zdCBsYXN0X3NlZ21lbnQgPSB0aGlzLmJ2bnNwX2NoZWNraW5fbmV4dF9zdGVwXG4gICAgICAgICAgICA/LnNwbGl0KFwiLVwiKVxuICAgICAgICAgICAgLnNsaWNlKC0xKVswXTtcbiAgICAgICAgaWYgKGxhc3Rfc2VnbWVudCAmJiBsYXN0X3NlZ21lbnQgaW4gdGhpcy5jaGVja2luX3ZhbHVlcy5ieV9rZXkpIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tpbl9tb2RlID0gbGFzdF9zZWdtZW50O1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGRlbGF5KHNlY29uZHM6IG51bWJlciwgb3B0aW9uYWw6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBpZiAob3B0aW9uYWwgJiYgIXRoaXMuc21zX3JlcXVlc3QpIHtcbiAgICAgICAgICAgIHNlY29uZHMgPSAxIC8gMTAwMC4wO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzKSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJlcywgc2Vjb25kcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFzeW5jIHNlbmRfbWVzc2FnZShtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMuc21zX3JlcXVlc3QpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMudHdpbGlvX2NsaWVudC5tZXNzYWdlc1xuICAgICAgICAgICAgICAgIC5jcmVhdGUoe1xuICAgICAgICAgICAgICAgICAgICB0bzogdGhpcy5mcm9tLFxuICAgICAgICAgICAgICAgICAgICBmcm9tOiB0aGlzLnRvLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiBtZXNzYWdlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZXN1bHRfbWVzc2FnZXMucHVzaChtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGhhbmRsZSgpOiBQcm9taXNlPFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2hhbmRsZSgpO1xuICAgICAgICBpZiAoIXRoaXMuc21zX3JlcXVlc3QpIHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQ/LnJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHRfbWVzc2FnZXMucHVzaChyZXN1bHQucmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogdGhpcy5yZXN1bHRfbWVzc2FnZXMuam9pbihcIlxcbiMjI1xcblwiKSxcbiAgICAgICAgICAgICAgICBuZXh0X3N0ZXA6IHJlc3VsdD8ubmV4dF9zdGVwLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBhc3luYyBfaGFuZGxlKCk6IFByb21pc2U8UmVzcG9uc2U+IHtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICBgUmVjZWl2ZWQgcmVxdWVzdCBmcm9tICR7dGhpcy5mcm9tfSB3aXRoIGJvZHk6ICR7dGhpcy5ib2R5fSBhbmQgc3RhdGUgJHt0aGlzLmJ2bnNwX2NoZWNraW5fbmV4dF9zdGVwfWBcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHRoaXMuYm9keSA9PSBcImxvZ291dFwiKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUGVyZm9ybWluZyBsb2dvdXRgKTtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmxvZ291dCgpO1xuICAgICAgICB9XG4gICAgICAgIGxldCByZXNwb25zZTogUmVzcG9uc2UgfCB1bmRlZmluZWQ7XG4gICAgICAgIGlmICghdGhpcy51c2Vfc2VydmljZV9hY2NvdW50KSB7XG4gICAgICAgICAgICByZXNwb25zZSA9IGF3YWl0IHRoaXMuY2hlY2tfdXNlcl9jcmVkcygpO1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlKSByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYm9keSA9PSBcInJlc3RhcnRcIikge1xuICAgICAgICAgICAgcmV0dXJuIHsgcmVzcG9uc2U6IFwiT2theS4gVGV4dCBtZSBhZ2FpbiB0byBzdGFydCBvdmVyLi4uXCIgfTtcbiAgICAgICAgfVxuICAgICAgICByZXNwb25zZSA9IGF3YWl0IHRoaXMuZ2V0X3BhdHJvbGxlcl9uYW1lKCk7XG4gICAgICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgKCF0aGlzLmJ2bnNwX2NoZWNraW5fbmV4dF9zdGVwIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5idm5zcF9jaGVja2luX25leHRfc3RlcCA9PSBcImF3YWl0LWNvbW1hbmRcIikgJiZcbiAgICAgICAgICAgIHRoaXMuYm9keVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcnNlX2Zhc3RfY2hlY2tpbl9tb2RlKHRoaXMuYm9keSkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICAgICAgYFBlcmZvcm1pbmcgZmFzdCBjaGVja2luIGZvciAke3RoaXMucGF0cm9sbGVyX25hbWV9IHdpdGggbW9kZTogJHt0aGlzLmNoZWNraW5fbW9kZX1gXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5jaGVja2luKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoW1wib25kdXR5XCIsIFwib24tZHV0eVwiXS5pbmNsdWRlcyh0aGlzLmJvZHkpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgICAgIGBQZXJmb3JtaW5nIGdldF9vbl9kdXR5IGZvciAke3RoaXMucGF0cm9sbGVyX25hbWV9YFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgcmVzcG9uc2U6IGF3YWl0IHRoaXMuZ2V0X29uX2R1dHkoKSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKFtcInN0YXR1c1wiXS5pbmNsdWRlcyh0aGlzLmJvZHkpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmZvcm1pbmcgZ2V0X3N0YXR1cyBmb3IgJHt0aGlzLnBhdHJvbGxlcl9uYW1lfWApO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldF9zdGF0dXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChbXCJjaGVja2luXCIsIFwiY2hlY2staW5cIl0uaW5jbHVkZXModGhpcy5ib2R5KSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgICAgICBgUGVyZm9ybWluZyBwcm9tcHRfY2hlY2tpbiBmb3IgJHt0aGlzLnBhdHJvbGxlcl9uYW1lfWBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByb21wdF9jaGVja2luKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICB0aGlzLmJ2bnNwX2NoZWNraW5fbmV4dF9zdGVwID09IFwiYXdhaXQtY2hlY2tpblwiICYmXG4gICAgICAgICAgICB0aGlzLmJvZHlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wYXJzZV9jaGVja2luKHRoaXMuYm9keSkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICAgICAgYFBlcmZvcm1pbmcgcmVndWxhciBjaGVja2luIGZvciAke3RoaXMucGF0cm9sbGVyX25hbWV9IHdpdGggbW9kZTogJHt0aGlzLmNoZWNraW5fbW9kZX1gXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5jaGVja2luKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICB0aGlzLmJ2bnNwX2NoZWNraW5fbmV4dF9zdGVwPy5zdGFydHNXaXRoKFwiY29uZmlybS1yZXNldFwiKSAmJlxuICAgICAgICAgICAgdGhpcy5ib2R5XG4gICAgICAgICkge1xuICAgICAgICAgICAgaWYgKHRoaXMuYm9keSA9PSBcInllc1wiICYmIHRoaXMucGFyc2VfY2hlY2tpbl9mcm9tX25leHRfc3RlcCgpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgICAgIGBQZXJmb3JtaW5nIHJlc2V0X3NoZWV0X2Zsb3cgZm9yICR7dGhpcy5wYXRyb2xsZXJfbmFtZX0gd2l0aCBjaGVja2luIG1vZGU6ICR7dGhpcy5jaGVja2luX21vZGV9YFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgKGF3YWl0IHRoaXMucmVzZXRfc2hlZXRfZmxvdygpKSB8fCAoYXdhaXQgdGhpcy5jaGVja2luKCkpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmJ2bnNwX2NoZWNraW5fbmV4dF9zdGVwPy5zdGFydHNXaXRoKFwiYXV0aC1yZXNldFwiKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucGFyc2VfY2hlY2tpbl9mcm9tX25leHRfc3RlcCgpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgICAgIGBQZXJmb3JtaW5nIHJlc2V0X3NoZWV0X2Zsb3ctcG9zdC1hdXRoIGZvciAke3RoaXMucGF0cm9sbGVyX25hbWV9IHdpdGggY2hlY2tpbiBtb2RlOiAke3RoaXMuY2hlY2tpbl9tb2RlfWBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIChhd2FpdCB0aGlzLnJlc2V0X3NoZWV0X2Zsb3coKSkgfHwgKGF3YWl0IHRoaXMuY2hlY2tpbigpKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5idm5zcF9jaGVja2luX25leHRfc3RlcCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5zZW5kX21lc3NhZ2UoXCJTb3JyeSwgSSBkaWRuJ3QgdW5kZXJzdGFuZCB0aGF0LlwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wcm9tcHRfY29tbWFuZCgpO1xuICAgIH1cblxuICAgIHByb21wdF9jb21tYW5kKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IGAke3RoaXMucGF0cm9sbGVyX25hbWV9LCBJJ20gQlZOU1AgQm90LiBcbkVudGVyIGEgY29tbWFuZDpcbkNoZWNrIGluIC8gQ2hlY2sgb3V0IC8gU3RhdHVzIC8gT24gRHV0eVxuU2VuZCAncmVzdGFydCcgYXQgYW55IHRpbWUgdG8gYmVnaW4gYWdhaW5gLFxuICAgICAgICAgICAgbmV4dF9zdGVwOiBcImF3YWl0LWNvbW1hbmRcIixcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcm9tcHRfY2hlY2tpbigpIHtcbiAgICAgICAgY29uc3QgdHlwZXMgPSBPYmplY3QudmFsdWVzKHRoaXMuY2hlY2tpbl92YWx1ZXMuYnlfa2V5KS5tYXAoXG4gICAgICAgICAgICAoeCkgPT4geC5zbXNfZGVzY1xuICAgICAgICApO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IGAke1xuICAgICAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyX25hbWVcbiAgICAgICAgICAgIH0sIHVwZGF0ZSBwYXRyb2xsaW5nIHN0YXR1cyB0bzogJHt0eXBlc1xuICAgICAgICAgICAgICAgIC5zbGljZSgwLCAtMSlcbiAgICAgICAgICAgICAgICAuam9pbihcIiwgXCIpfSwgb3IgJHt0eXBlcy5zbGljZSgtMSl9P2AsXG4gICAgICAgICAgICBuZXh0X3N0ZXA6IFwiYXdhaXQtY2hlY2tpblwiLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGFzeW5jIGdldF9zdGF0dXMoKSB7XG4gICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKTtcbiAgICAgICAgY29uc3Qgc2hlZXRfZGF0ZSA9IGxvZ2luX3NoZWV0LnNoZWV0X2RhdGUudG9EYXRlU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfZGF0ZSA9IGxvZ2luX3NoZWV0LmN1cnJlbnRfZGF0ZS50b0RhdGVTdHJpbmcoKTtcbiAgICAgICAgaWYgKCFsb2dpbl9zaGVldC5pc19jdXJyZW50KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgc2hlZXRfZGF0ZTogJHtsb2dpbl9zaGVldC5zaGVldF9kYXRlfWApO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYGN1cnJlbnRfZGF0ZTogJHtsb2dpbl9zaGVldC5jdXJyZW50X2RhdGV9YCk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgU2hlZXQgaXMgbm90IGN1cnJlbnQgZm9yIHRvZGF5IChsYXN0IHJlc2V0OiAke3NoZWV0X2RhdGV9KS4gJHt0aGlzLnBhdHJvbGxlcl9uYW1lfSBpcyBub3QgY2hlY2tlZCBpbiBmb3IgJHtjdXJyZW50X2RhdGV9LmAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0geyByZXNwb25zZTogYXdhaXQgdGhpcy5nZXRfc3RhdHVzX3N0cmluZygpIH07XG4gICAgICAgIGF3YWl0IHRoaXMubG9nX2FjdGlvbihcInN0YXR1c1wiKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cblxuICAgIGFzeW5jIGdldF9zdGF0dXNfc3RyaW5nKCkge1xuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG4gICAgICAgIGNvbnN0IHBhdHJvbGxlcl9zdGF0dXMgPSBsb2dpbl9zaGVldC5maW5kX3BhdHJvbGxlcihcbiAgICAgICAgICAgIHRoaXMucGF0cm9sbGVyX25hbWVcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgY2hlY2tpbkNvbHVtblNldCA9XG4gICAgICAgICAgICBwYXRyb2xsZXJfc3RhdHVzLmNoZWNraW4gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgcGF0cm9sbGVyX3N0YXR1cy5jaGVja2luICE9PSBudWxsO1xuICAgICAgICBjb25zdCBjaGVja2VkT3V0ID1cbiAgICAgICAgICAgIGNoZWNraW5Db2x1bW5TZXQgJiZcbiAgICAgICAgICAgIHRoaXMuY2hlY2tpbl92YWx1ZXMuYnlfc2hlZXRfc3RyaW5nW3BhdHJvbGxlcl9zdGF0dXMuY2hlY2tpbl0ua2V5ID09XG4gICAgICAgICAgICAgICAgXCJvdXRcIjtcbiAgICAgICAgbGV0IHN0YXR1cyA9IHBhdHJvbGxlcl9zdGF0dXMuY2hlY2tpbiB8fCBcIk5vdCBQcmVzZW50XCI7XG5cbiAgICAgICAgaWYgKGNoZWNrZWRPdXQpIHtcbiAgICAgICAgICAgIHN0YXR1cyA9IFwiQ2hlY2tlZCBPdXRcIjtcbiAgICAgICAgfSBlbHNlIGlmIChjaGVja2luQ29sdW1uU2V0KSB7XG4gICAgICAgICAgICBsZXQgc2VjdGlvbiA9IHBhdHJvbGxlcl9zdGF0dXMuc2VjdGlvbi50b1N0cmluZygpO1xuICAgICAgICAgICAgaWYgKHNlY3Rpb24ubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgICAgICBzZWN0aW9uID0gYFNlY3Rpb24gJHtzZWN0aW9ufWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdGF0dXMgPSBgJHtwYXRyb2xsZXJfc3RhdHVzLmNoZWNraW59ICgke3NlY3Rpb259KWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdGF0dXMgPSBcIm5vdCBwcmVzZW50XCI7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb21wbGV0ZWRQYXRyb2xEYXlzID0gYXdhaXQgZ2V0X3BhdHJvbGxlZF9kYXlzKFxuICAgICAgICAgICAgdGhpcy5wYXRyb2xsZXJfbmFtZSxcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0X3NoZWV0c19zZXJ2aWNlKCksXG4gICAgICAgICAgICB0aGlzLnBhdHJvbGxlcl9zZWFzb25fb3B0c1xuICAgICAgICApO1xuICAgICAgICBjb25zdCBjb21wbGV0ZWRQYXRyb2xEYXlzU3RyaW5nID1cbiAgICAgICAgICAgIGNvbXBsZXRlZFBhdHJvbERheXMgPiAwID8gY29tcGxldGVkUGF0cm9sRGF5cy50b1N0cmluZygpIDogXCJOb1wiO1xuICAgICAgICBjb25zdCBsb2dpblNoZWV0RGF0ZSA9IGxvZ2luX3NoZWV0LnNoZWV0X2RhdGUudG9EYXRlU3RyaW5nKCk7XG5cbiAgICAgICAgcmV0dXJuIGBTdGF0dXMgZm9yICR7dGhpcy5wYXRyb2xsZXJfbmFtZX0gb24gZGF0ZSAke2xvZ2luU2hlZXREYXRlfTogJHtzdGF0dXN9LlxcbiR7Y29tcGxldGVkUGF0cm9sRGF5c1N0cmluZ30gY29tcGxldGVkIHBhdHJvbCBkYXlzIHByaW9yIHRvIHRvZGF5LmA7XG4gICAgfVxuXG4gICAgYXN5bmMgY2hlY2tpbigpIHtcbiAgICAgICAgaWYgKGF3YWl0IHRoaXMuc2hlZXRfbmVlZHNfcmVzZXQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTpcbiAgICAgICAgICAgICAgICAgICAgYCR7dGhpcy5wYXRyb2xsZXJfbmFtZX0sIHlvdSBhcmUgdGhlIGZpcnN0IHBlcnNvbiB0byBjaGVjayBpbiB0b2RheS4gYCArXG4gICAgICAgICAgICAgICAgICAgIGBJIG5lZWQgdG8gYXJjaGl2ZSBhbmQgcmVzZXQgdGhlIHNoZWV0IGJlZm9yZSBjb250aW51aW5nLiBgICtcbiAgICAgICAgICAgICAgICAgICAgYFdvdWxkIHlvdSBsaWtlIG1lIHRvIGRvIHRoYXQ/IChZZXMvTm8pYCxcbiAgICAgICAgICAgICAgICBuZXh0X3N0ZXA6IGBjb25maXJtLXJlc2V0LSR7dGhpcy5jaGVja2luX21vZGV9YCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNoZWNraW5fbW9kZTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgIXRoaXMuY2hlY2tpbl9tb2RlIHx8XG4gICAgICAgICAgICAoY2hlY2tpbl9tb2RlID0gdGhpcy5jaGVja2luX3ZhbHVlcy5ieV9rZXlbdGhpcy5jaGVja2luX21vZGVdKSA9PT1cbiAgICAgICAgICAgICAgICB1bmRlZmluZWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDaGVja2luIG1vZGUgaW1wcm9wZXJseSBzZXRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG4gICAgICAgIGNvbnN0IG5ld19jaGVja2luX3ZhbHVlID0gY2hlY2tpbl9tb2RlLnNoZWV0c192YWx1ZTtcbiAgICAgICAgYXdhaXQgbG9naW5fc2hlZXQuY2hlY2tpbih0aGlzLnBhdHJvbGxlcl9uYW1lLCBuZXdfY2hlY2tpbl92YWx1ZSk7XG4gICAgICAgIGF3YWl0IHRoaXMubG9naW5fc2hlZXQ/LnJlZnJlc2goKTtcblxuICAgICAgICBsZXQgcmVzcG9uc2UgPSBgVXBkYXRpbmcgJHt0aGlzLnBhdHJvbGxlcl9uYW1lfSB3aXRoIHN0YXR1czogJHtuZXdfY2hlY2tpbl92YWx1ZX0uYDtcbiAgICAgICAgaWYgKCF0aGlzLmZhc3RfY2hlY2tpbikge1xuICAgICAgICAgICAgcmVzcG9uc2UgKz0gYCBZb3UgY2FuIHNlbmQgJyR7Y2hlY2tpbl9tb2RlLmZhc3RfY2hlY2tpbnNbMF19JyBhcyB5b3VyIGZpcnN0IG1lc3NhZ2UgZm9yIGEgZmFzdCAke2NoZWNraW5fbW9kZS5zaGVldHNfdmFsdWV9IGNoZWNraW4gbmV4dCB0aW1lLmA7XG4gICAgICAgIH1cblxuICAgICAgICByZXNwb25zZSArPSBcIlxcblxcblwiICsgKGF3YWl0IHRoaXMuZ2V0X3N0YXR1c19zdHJpbmcoKSk7XG4gICAgICAgIHJldHVybiB7IHJlc3BvbnNlOiByZXNwb25zZSB9O1xuICAgIH1cblxuICAgIGFzeW5jIHNoZWV0X25lZWRzX3Jlc2V0KCkge1xuICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCk7XG5cbiAgICAgICAgY29uc3Qgc2hlZXRfZGF0ZSA9IGxvZ2luX3NoZWV0LnNoZWV0X2RhdGU7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfZGF0ZSA9IGxvZ2luX3NoZWV0LmN1cnJlbnRfZGF0ZTtcbiAgICAgICAgY29uc29sZS5sb2coYHNoZWV0X2RhdGU6ICR7c2hlZXRfZGF0ZX1gKTtcbiAgICAgICAgY29uc29sZS5sb2coYGN1cnJlbnRfZGF0ZTogJHtjdXJyZW50X2RhdGV9YCk7XG5cbiAgICAgICAgY29uc29sZS5sb2coYGRhdGVfaXNfY3VycmVudDogJHtsb2dpbl9zaGVldC5pc19jdXJyZW50fWApO1xuXG4gICAgICAgIHJldHVybiAhbG9naW5fc2hlZXQuaXNfY3VycmVudDtcbiAgICB9XG5cbiAgICBhc3luYyByZXNldF9zaGVldF9mbG93KCkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuY2hlY2tfdXNlcl9jcmVkcyhcbiAgICAgICAgICAgIGAke3RoaXMucGF0cm9sbGVyX25hbWV9LCBpbiBvcmRlciB0byByZXNldC9hcmNoaXZlLCBJIG5lZWQgeW91IHRvIGF1dGhvcml6ZSB0aGUgYXBwLmBcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHJlc3BvbnNlKVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogcmVzcG9uc2UucmVzcG9uc2UsXG4gICAgICAgICAgICAgICAgbmV4dF9zdGVwOiBgYXV0aC1yZXNldC0ke3RoaXMuY2hlY2tpbl9tb2RlfWAsXG4gICAgICAgICAgICB9O1xuICAgICAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5yZXNldF9zaGVldCgpO1xuICAgIH1cblxuICAgIGFzeW5jIHJlc2V0X3NoZWV0KCkge1xuICAgICAgICBjb25zdCBzY3JpcHRfc2VydmljZSA9IGF3YWl0IHRoaXMuZ2V0X3VzZXJfc2NyaXB0c19zZXJ2aWNlKCk7XG4gICAgICAgIGNvbnN0IHNob3VsZF9wZXJmb3JtX2FyY2hpdmUgPSAhKGF3YWl0IHRoaXMuZ2V0X2xvZ2luX3NoZWV0KCkpLmFyY2hpdmVkO1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gc2hvdWxkX3BlcmZvcm1fYXJjaGl2ZVxuICAgICAgICAgICAgPyBcIk9rYXkuIEFyY2hpdmluZyBhbmQgcmVzZXRpbmcgdGhlIGNoZWNrIGluIHNoZWV0LiBUaGlzIHRha2VzIGFib3V0IDEwIHNlY29uZHMuLi5cIlxuICAgICAgICAgICAgOiBcIk9rYXkuIFNoZWV0IGhhcyBhbHJlYWR5IGJlZW4gYXJjaGl2ZWQuIFBlcmZvcm1pbmcgcmVzZXQuIFRoaXMgdGFrZXMgYWJvdXQgNSBzZWNvbmRzLi4uXCI7XG4gICAgICAgIGF3YWl0IHRoaXMuc2VuZF9tZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICBpZiAoc2hvdWxkX3BlcmZvcm1fYXJjaGl2ZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJBcmNoaXZpbmcuLi5cIik7XG5cbiAgICAgICAgICAgIGF3YWl0IHNjcmlwdF9zZXJ2aWNlLnNjcmlwdHMucnVuKHtcbiAgICAgICAgICAgICAgICBzY3JpcHRJZDogdGhpcy5yZXNldF9zY3JpcHRfaWQsXG4gICAgICAgICAgICAgICAgcmVxdWVzdEJvZHk6IHsgZnVuY3Rpb246IHRoaXMuYXJjaGl2ZV9mdW5jdGlvbl9uYW1lIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZGVsYXkoNSk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmxvZ19hY3Rpb24oXCJhcmNoaXZlXCIpO1xuICAgICAgICAgICAgdGhpcy5sb2dpbl9zaGVldCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZyhcIlJlc2V0dGluZy4uLlwiKTtcbiAgICAgICAgYXdhaXQgc2NyaXB0X3NlcnZpY2Uuc2NyaXB0cy5ydW4oe1xuICAgICAgICAgICAgc2NyaXB0SWQ6IHRoaXMucmVzZXRfc2NyaXB0X2lkLFxuICAgICAgICAgICAgcmVxdWVzdEJvZHk6IHsgZnVuY3Rpb246IHRoaXMucmVzZXRfZnVuY3Rpb25fbmFtZSB9LFxuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgdGhpcy5kZWxheSg1KTtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2dfYWN0aW9uKFwicmVzZXRcIik7XG4gICAgICAgIGF3YWl0IHRoaXMuc2VuZF9tZXNzYWdlKFwiRG9uZS5cIik7XG4gICAgfVxuXG4gICAgYXN5bmMgY2hlY2tfdXNlcl9jcmVkcyhcbiAgICAgICAgcHJvbXB0X21lc3NhZ2U6IHN0cmluZyA9IFwiSGksIGJlZm9yZSB5b3UgY2FuIHVzZSBCVk5TUCBib3QsIHlvdSBtdXN0IGxvZ2luLlwiXG4gICAgKSB7XG4gICAgICAgIGNvbnN0IHVzZXJfY3JlZHMgPSB0aGlzLmdldF91c2VyX2NyZWRzKCk7XG4gICAgICAgIGlmICghKGF3YWl0IHVzZXJfY3JlZHMubG9hZFRva2VuKCkpKSB7XG4gICAgICAgICAgICBjb25zdCBhdXRoVXJsID0gYXdhaXQgdXNlcl9jcmVkcy5nZXRBdXRoVXJsKCk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBgJHtwcm9tcHRfbWVzc2FnZX0gUGxlYXNlIGZvbGxvdyB0aGlzIGxpbms6XG4ke2F1dGhVcmx9XG5cbk1lc3NhZ2UgbWUgYWdhaW4gd2hlbiBkb25lLmAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0X29uX2R1dHkoKSB7XG4gICAgICAgIGNvbnN0IGNoZWNrZWRfb3V0X3NlY3Rpb24gPSBcIkNoZWNrZWQgT3V0XCI7XG4gICAgICAgIGNvbnN0IGxhc3Rfc2VjdGlvbnMgPSBbY2hlY2tlZF9vdXRfc2VjdGlvbl07XG4gICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKTtcblxuICAgICAgICBjb25zdCBvbl9kdXR5X3BhdHJvbGxlcnMgPSBsb2dpbl9zaGVldC5nZXRfb25fZHV0eV9wYXRyb2xsZXJzKCk7XG4gICAgICAgIGNvbnN0IGJ5X3NlY3Rpb24gPSBvbl9kdXR5X3BhdHJvbGxlcnNcbiAgICAgICAgICAgIC5maWx0ZXIoKHgpID0+IHguY2hlY2tpbilcbiAgICAgICAgICAgIC5yZWR1Y2UoKHByZXY6IHsgW2tleTogc3RyaW5nXTogUGF0cm9sbGVyUm93W10gfSwgY3VyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2hvcnRfY29kZSA9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tpbl92YWx1ZXMuYnlfc2hlZXRfc3RyaW5nW2N1ci5jaGVja2luXS5rZXk7XG4gICAgICAgICAgICAgICAgbGV0IHNlY3Rpb24gPSBjdXIuc2VjdGlvbjtcbiAgICAgICAgICAgICAgICBpZiAoc2hvcnRfY29kZSA9PSBcIm91dFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlY3Rpb24gPSBjaGVja2VkX291dF9zZWN0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIShzZWN0aW9uIGluIHByZXYpKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZbc2VjdGlvbl0gPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcHJldltzZWN0aW9uXS5wdXNoKGN1cik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByZXY7XG4gICAgICAgICAgICB9LCB7fSk7XG4gICAgICAgIGxldCByZXN1bHRzOiBzdHJpbmdbXVtdID0gW107XG4gICAgICAgIGxldCBhbGxfa2V5cyA9IE9iamVjdC5rZXlzKGJ5X3NlY3Rpb24pO1xuICAgICAgICBjb25zdCBvcmRlcmVkX3ByaW1hcnlfc2VjdGlvbnMgPSBPYmplY3Qua2V5cyhieV9zZWN0aW9uKVxuICAgICAgICAgICAgLmZpbHRlcigoeCkgPT4gIWxhc3Rfc2VjdGlvbnMuaW5jbHVkZXMoeCkpXG4gICAgICAgICAgICAuc29ydCgpO1xuICAgICAgICBjb25zdCBmaWx0ZXJlZF9sYXN0X3NlY3Rpb25zID0gbGFzdF9zZWN0aW9ucy5maWx0ZXIoKHgpID0+XG4gICAgICAgICAgICBhbGxfa2V5cy5pbmNsdWRlcyh4KVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBvcmRlcmVkX3NlY3Rpb25zID0gb3JkZXJlZF9wcmltYXJ5X3NlY3Rpb25zLmNvbmNhdChcbiAgICAgICAgICAgIGZpbHRlcmVkX2xhc3Rfc2VjdGlvbnNcbiAgICAgICAgKTtcblxuICAgICAgICBmb3IgKGNvbnN0IHNlY3Rpb24gb2Ygb3JkZXJlZF9zZWN0aW9ucykge1xuICAgICAgICAgICAgbGV0IHJlc3VsdDogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IHBhdHJvbGxlcnMgPSBieV9zZWN0aW9uW3NlY3Rpb25dLnNvcnQoKHgsIHkpID0+XG4gICAgICAgICAgICAgICAgeC5uYW1lLmxvY2FsZUNvbXBhcmUoeS5uYW1lKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChzZWN0aW9uLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKFwiU2VjdGlvbiBcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQucHVzaChgJHtzZWN0aW9ufTogYCk7XG4gICAgICAgICAgICBmdW5jdGlvbiBwYXRyb2xsZXJfc3RyaW5nKG5hbWU6IHN0cmluZywgc2hvcnRfY29kZTogc3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRldGFpbHMgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGlmIChzaG9ydF9jb2RlICE9PSBcImRheVwiICYmIHNob3J0X2NvZGUgIT09IFwib3V0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlscyA9IGAgKCR7c2hvcnRfY29kZS50b1VwcGVyQ2FzZSgpfSlgO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7bmFtZX0ke2RldGFpbHN9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFxuICAgICAgICAgICAgICAgIHBhdHJvbGxlcnNcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgoeCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdHJvbGxlcl9zdHJpbmcoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tpbl92YWx1ZXMuYnlfc2hlZXRfc3RyaW5nW3guY2hlY2tpbl0ua2V5XG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLmpvaW4oXCIsIFwiKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChyZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBgUGF0cm9sbGVycyBmb3IgJHtsb2dpbl9zaGVldC5zaGVldF9kYXRlLnRvRGF0ZVN0cmluZygpfSAoVG90YWw6ICR7XG4gICAgICAgICAgICBvbl9kdXR5X3BhdHJvbGxlcnMubGVuZ3RoXG4gICAgICAgIH0pOlxcbiR7cmVzdWx0cy5tYXAoKHIpID0+IHIuam9pbihcIlwiKSkuam9pbihcIlxcblwiKX1gO1xuICAgIH1cblxuICAgIGFzeW5jIGxvZ19hY3Rpb24oYWN0aW9uX25hbWU6IHN0cmluZykge1xuICAgICAgICBjb25zdCBzaGVldHNfc2VydmljZSA9IGF3YWl0IHRoaXMuZ2V0X3NoZWV0c19zZXJ2aWNlKCk7XG4gICAgICAgIGF3YWl0IHNoZWV0c19zZXJ2aWNlLnNwcmVhZHNoZWV0cy52YWx1ZXMuYXBwZW5kKHtcbiAgICAgICAgICAgIHNwcmVhZHNoZWV0SWQ6IHRoaXMubG9naW5fc2hlZXRfb3B0cy5TSEVFVF9JRCxcbiAgICAgICAgICAgIHJhbmdlOiB0aGlzLmFjdGlvbl9sb2dfc2hlZXQsXG4gICAgICAgICAgICB2YWx1ZUlucHV0T3B0aW9uOiBcIlVTRVJfRU5URVJFRFwiLFxuICAgICAgICAgICAgcmVxdWVzdEJvZHk6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZXM6IFtbdGhpcy5wYXRyb2xsZXJfbmFtZSwgbmV3IERhdGUoKSwgYWN0aW9uX25hbWVdXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFzeW5jIGxvZ291dCgpIHtcbiAgICAgICAgY29uc3QgdXNlcl9jcmVkcyA9IHRoaXMuZ2V0X3VzZXJfY3JlZHMoKTtcbiAgICAgICAgYXdhaXQgdXNlcl9jcmVkcy5kZWxldGVUb2tlbigpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2U6IFwiT2theSwgSSBoYXZlIHJlbW92ZWQgYWxsIGxvZ2luIHNlc3Npb24gaW5mb3JtYXRpb24uXCIsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2V0X3N5bmNfY2xpZW50KCkge1xuICAgICAgICBpZiAoIXRoaXMuc3luY19jbGllbnQpIHtcbiAgICAgICAgICAgIHRoaXMuc3luY19jbGllbnQgPSB0aGlzLnR3aWxpb19jbGllbnQuc3luYy5zZXJ2aWNlcyh0aGlzLnN5bmNfc2lkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zeW5jX2NsaWVudDtcbiAgICB9XG5cbiAgICBnZXRfdXNlcl9jcmVkcygpIHtcbiAgICAgICAgaWYgKCF0aGlzLnVzZXJfY3JlZHMpIHtcbiAgICAgICAgICAgIHRoaXMudXNlcl9jcmVkcyA9IG5ldyBVc2VyQ3JlZHMoXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRfc3luY19jbGllbnQoKSxcbiAgICAgICAgICAgICAgICB0aGlzLmZyb20sXG4gICAgICAgICAgICAgICAgdGhpcy51c2VyX2F1dGhfb3B0c1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy51c2VyX2NyZWRzO1xuICAgIH1cblxuICAgIGdldF9zZXJ2aWNlX2NyZWRzKCkge1xuICAgICAgICBpZiAoIXRoaXMuc2VydmljZV9jcmVkcykge1xuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlX2NyZWRzID0gbmV3IGdvb2dsZS5hdXRoLkdvb2dsZUF1dGgoe1xuICAgICAgICAgICAgICAgIGtleUZpbGU6IGdldF9zZXJ2aWNlX2NyZWRlbnRpYWxzX3BhdGgoKSxcbiAgICAgICAgICAgICAgICBzY29wZXM6IHRoaXMuU0NPUEVTLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZV9jcmVkcztcbiAgICB9XG5cbiAgICBhc3luYyBnZXRfdmFsaWRfY3JlZHMocmVxdWlyZV91c2VyX2NyZWRzOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHRoaXMudXNlX3NlcnZpY2VfYWNjb3VudCAmJiAhcmVxdWlyZV91c2VyX2NyZWRzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRfc2VydmljZV9jcmVkcygpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVzZXJfY3JlZHMgPSB0aGlzLmdldF91c2VyX2NyZWRzKCk7XG4gICAgICAgIGlmICghKGF3YWl0IHVzZXJfY3JlZHMubG9hZFRva2VuKCkpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVc2VyIGlzIG5vdCBhdXRoZWQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVXNpbmcgdXNlciBhY2NvdW50IGZvciBzZXJ2aWNlIGF1dGguLi5cIik7XG4gICAgICAgIHJldHVybiB1c2VyX2NyZWRzLm9hdXRoMl9jbGllbnQ7XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0X3NoZWV0c19zZXJ2aWNlKCkge1xuICAgICAgICBpZiAoIXRoaXMuc2hlZXRzX3NlcnZpY2UpIHtcbiAgICAgICAgICAgIHRoaXMuc2hlZXRzX3NlcnZpY2UgPSBnb29nbGUuc2hlZXRzKHtcbiAgICAgICAgICAgICAgICB2ZXJzaW9uOiBcInY0XCIsXG4gICAgICAgICAgICAgICAgYXV0aDogYXdhaXQgdGhpcy5nZXRfdmFsaWRfY3JlZHMoKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNoZWV0c19zZXJ2aWNlO1xuICAgIH1cblxuICAgIGFzeW5jIGdldF9sb2dpbl9zaGVldCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmxvZ2luX3NoZWV0KSB7XG4gICAgICAgICAgICBjb25zdCBzaGVldHNfc2VydmljZSA9IGF3YWl0IHRoaXMuZ2V0X3NoZWV0c19zZXJ2aWNlKCk7XG4gICAgICAgICAgICBjb25zdCBsb2dpbl9zaGVldCA9IG5ldyBMb2dpblNoZWV0KFxuICAgICAgICAgICAgICAgIHNoZWV0c19zZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHRoaXMubG9naW5fc2hlZXRfb3B0c1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGF3YWl0IGxvZ2luX3NoZWV0LnJlZnJlc2goKTtcbiAgICAgICAgICAgIHRoaXMubG9naW5fc2hlZXQgPSBsb2dpbl9zaGVldDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5sb2dpbl9zaGVldDtcbiAgICB9XG5cbiAgICBhc3luYyBnZXRfdXNlcl9zY3JpcHRzX3NlcnZpY2UoKSB7XG4gICAgICAgIGlmICghdGhpcy51c2VyX3NjcmlwdHNfc2VydmljZSkge1xuICAgICAgICAgICAgdGhpcy51c2VyX3NjcmlwdHNfc2VydmljZSA9IGdvb2dsZS5zY3JpcHQoe1xuICAgICAgICAgICAgICAgIHZlcnNpb246IFwidjFcIixcbiAgICAgICAgICAgICAgICBhdXRoOiBhd2FpdCB0aGlzLmdldF92YWxpZF9jcmVkcyh0cnVlKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJfc2NyaXB0c19zZXJ2aWNlO1xuICAgIH1cblxuICAgIGFzeW5jIGdldF9wYXRyb2xsZXJfbmFtZSgpIHtcbiAgICAgICAgY29uc3Qgc2hlZXRzX3NlcnZpY2UgPSBhd2FpdCB0aGlzLmdldF9zaGVldHNfc2VydmljZSgpO1xuICAgICAgICBjb25zdCBwaG9uZV9sb29rdXAgPSBhd2FpdCBmaW5kX3BhdHJvbGxlcl9mcm9tX251bWJlcihcbiAgICAgICAgICAgIHRoaXMuZnJvbSxcbiAgICAgICAgICAgIHNoZWV0c19zZXJ2aWNlLFxuICAgICAgICAgICAgdGhpcy5maW5kX3BhdHJvbGxlcl9vcHRzXG4gICAgICAgICk7XG4gICAgICAgIGlmIChwaG9uZV9sb29rdXAgPT09IHVuZGVmaW5lZCB8fCBwaG9uZV9sb29rdXAgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGBTb3JyeSwgSSBjb3VsZG4ndCBmaW5kIGFuIGFzc29jaWF0ZWQgQlZOU1AgbWVtYmVyIHdpdGggeW91ciBwaG9uZSBudW1iZXIgKCR7dGhpcy5mcm9tfSlgLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxvZ2luX3NoZWV0ID0gYXdhaXQgdGhpcy5nZXRfbG9naW5fc2hlZXQoKTtcbiAgICAgICAgY29uc3QgbWFwcGVkUGF0cm9sbGVyID0gbG9naW5fc2hlZXQudHJ5X2ZpbmRfcGF0cm9sbGVyKFxuICAgICAgICAgICAgcGhvbmVfbG9va3VwLm5hbWVcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKG1hcHBlZFBhdHJvbGxlciA9PT0gXCJub3RfZm91bmRcIikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZTogYENvdWxkIG5vdCBmaW5kIHBhdHJvbGxlciAnJHtwaG9uZV9sb29rdXAubmFtZX0nIGluIGxvZ2luIHNoZWV0LiBQbGVhc2UgbG9vayBhdCB0aGUgbG9naW4gc2hlZXQgbmFtZSwgYW5kIGNvcHkgaXQgdG8gdGhlIFBob25lIE51bWJlcnMgdGFiLmAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGF0cm9sbGVyX25hbWUgPSBwaG9uZV9sb29rdXAubmFtZTtcbiAgICB9XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=