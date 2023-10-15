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
/*!***********************************!*\
  !*** ./src/complete-user-auth.ts ***!
  \***********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handler: () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _user_creds__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-creds */ "./src/user-creds.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const handler = function (context, event, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Handling auth completion: ${JSON.stringify(event)}`);
        const state = event.state;
        if (state === undefined) {
            throw new Error("Missing nonce");
        }
        const twilioSync = context
            .getTwilioClient()
            .sync.services(context.SYNC_SID);
        let doc;
        try {
            console.log(`Looking for state ${state}...`);
            doc = yield twilioSync.documents(state).fetch();
        }
        catch (e) {
            console.log(e);
            callback(`Failed to get state doc.`);
            return;
        }
        if (doc.data === undefined || isNaN(doc.data.number)) {
            callback(`Received invalid nonce`);
            return;
        }
        const number = doc.data.number;
        console.log(`Found number ${number} for nonce ${state}`);
        const user_creds = new _user_creds__WEBPACK_IMPORTED_MODULE_0__.UserCreds(twilioSync, number, context);
        if (yield user_creds.loadToken()) {
            callback(null, "already_valid");
            return;
        }
        const code = event.code;
        const scopes = doc.data.scopes;
        try {
            yield twilioSync.documents(doc.sid).remove();
            console.log(`Deleted nonce ${doc.uniqueName}`);
        }
        catch (e) {
            callback(null, `Failed to delete nonce: ${e}`);
            return;
        }
        try {
            yield user_creds.completeLogin(code, scopes);
        }
        catch (e) {
            if (e instanceof Error || e instanceof String) {
                callback(e);
            }
            else {
                callback("Failed to complete user auth");
            }
            return;
        }
        callback(null, "Please return to your messaging app and engage BVNSP bot again.");
    });
};

})();

exports.handler = __webpack_exports__.handler;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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STtZQUNBLE1BQU0sVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDaEQ7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLElBQUksQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDLFlBQVksTUFBTSxFQUFFO2dCQUMzQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDZjtpQkFBTTtnQkFDSCxRQUFRLENBQUMsOEJBQThCLENBQUMsQ0FBQzthQUM1QztZQUNELE9BQU87U0FDVjtRQUNELFFBQVEsQ0FDSixJQUFJLEVBQ0osaUVBQWlFLENBQ3BFLENBQUM7SUFDTixDQUFDO0NBQUEsQ0FBQyIsInNvdXJjZXMiOlsiL1VzZXJzL2pvaGFuaGVua2Vucy9SZXBvc2l0b3JpZXMvcGVyc29uYWxfcHJvamVjdHMvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvZmlsZS11dGlscy50cyIsIi9Vc2Vycy9qb2hhbmhlbmtlbnMvUmVwb3NpdG9yaWVzL3BlcnNvbmFsX3Byb2plY3RzL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3VzZXItY3JlZHMudHMiLCIvVXNlcnMvam9oYW5oZW5rZW5zL1JlcG9zaXRvcmllcy9wZXJzb25hbF9wcm9qZWN0cy9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91dGlsLnRzIiwiZXh0ZXJuYWwgY29tbW9uanMgXCJAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzXCIiLCJleHRlcm5hbCBjb21tb25qcyBcImdvb2dsZWFwaXNcIiIsImV4dGVybmFsIG5vZGUtY29tbW9uanMgXCJmc1wiIiwid2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0IiwiL1VzZXJzL2pvaGFuaGVua2Vucy9SZXBvc2l0b3JpZXMvcGVyc29uYWxfcHJvamVjdHMvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvY29tcGxldGUtdXNlci1hdXRoLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICdAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzJztcbmZ1bmN0aW9uIGxvYWRfY3JlZGVudGlhbHNfZmlsZXMoKSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoXG4gICAgICAgIGZzXG4gICAgICAgICAgICAucmVhZEZpbGVTeW5jKFJ1bnRpbWUuZ2V0QXNzZXRzKClbXCIvY3JlZGVudGlhbHMuanNvblwiXS5wYXRoKVxuICAgICAgICAgICAgLnRvU3RyaW5nKClcbiAgICApO1xufVxuZnVuY3Rpb24gZ2V0X3NlcnZpY2VfY3JlZGVudGlhbHNfcGF0aCgpIHtcbiAgICByZXR1cm4gUnVudGltZS5nZXRBc3NldHMoKVtcIi9zZXJ2aWNlLWNyZWRlbnRpYWxzLmpzb25cIl0ucGF0aDtcbn1cbmV4cG9ydCB7IGxvYWRfY3JlZGVudGlhbHNfZmlsZXMsIGdldF9zZXJ2aWNlX2NyZWRlbnRpYWxzX3BhdGggfTtcbiIsImltcG9ydCB7IGdvb2dsZSB9IGZyb20gXCJnb29nbGVhcGlzXCI7XG5pbXBvcnQgeyBHZW5lcmF0ZUF1dGhVcmxPcHRzIH0gZnJvbSBcImdvb2dsZS1hdXRoLWxpYnJhcnlcIjtcbmltcG9ydCB7IE9BdXRoMkNsaWVudCB9IGZyb20gXCJnb29nbGVhcGlzLWNvbW1vblwiO1xuaW1wb3J0IHsgc2FuaXRpemVfbnVtYmVyIH0gZnJvbSBcIi4vdXRpbFwiO1xuaW1wb3J0IHsgbG9hZF9jcmVkZW50aWFsc19maWxlcyB9IGZyb20gXCIuL2ZpbGUtdXRpbHNcIjtcbmltcG9ydCB7IFNlcnZpY2VDb250ZXh0IH0gZnJvbSBcIkB0d2lsaW8tbGFicy9zZXJ2ZXJsZXNzLXJ1bnRpbWUtdHlwZXMvdHlwZXNcIjtcblxuY29uc3QgU0NPUEVTID0gW1xuICAgIFwiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9zY3JpcHQucHJvamVjdHNcIixcbiAgICBcImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvc3ByZWFkc2hlZXRzXCIsXG5dO1xuXG5mdW5jdGlvbiB2YWxpZGF0ZV9zY29wZXMoc2NvcGVzOiBzdHJpbmdbXSkge1xuICAgIGZvciAoY29uc3QgZGVzaXJlZF9zY29wZSBvZiBTQ09QRVMpIHtcbiAgICAgICAgaWYgKHNjb3BlcyA9PT0gdW5kZWZpbmVkIHx8ICFzY29wZXMuaW5jbHVkZXMoZGVzaXJlZF9zY29wZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gYE1pc3Npbmcgc2NvcGUgJHtkZXNpcmVkX3Njb3BlfSBpbiByZWNlaXZlZCBzY29wZXM6ICR7c2NvcGVzfWA7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG50eXBlIFVTRVJfQ1JFRFNfT1BUUyA9IHtcbiAgICBOU1BfRU1BSUxfRE9NQUlOOiBzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsO1xufTtcbmNsYXNzIFVzZXJDcmVkcyB7XG4gICAgbnVtYmVyOiBudW1iZXI7XG4gICAgb2F1dGgyX2NsaWVudDogT0F1dGgyQ2xpZW50O1xuICAgIHN5bmNfY2xpZW50OiBTZXJ2aWNlQ29udGV4dDtcbiAgICBkb21haW4/OiBzdHJpbmc7XG4gICAgbG9hZGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHN5bmNfY2xpZW50OiBTZXJ2aWNlQ29udGV4dCxcbiAgICAgICAgbnVtYmVyOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgICAgIG9wdHM6IFVTRVJfQ1JFRFNfT1BUU1xuICAgICkge1xuICAgICAgICBpZiAobnVtYmVyID09PSB1bmRlZmluZWQgfHwgbnVtYmVyID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOdW1iZXIgaXMgdW5kZWZpbmVkXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubnVtYmVyID0gc2FuaXRpemVfbnVtYmVyKG51bWJlcik7XG5cbiAgICAgICAgY29uc3QgY3JlZGVudGlhbHMgPSBsb2FkX2NyZWRlbnRpYWxzX2ZpbGVzKCk7XG4gICAgICAgIGNvbnN0IHsgY2xpZW50X3NlY3JldCwgY2xpZW50X2lkLCByZWRpcmVjdF91cmlzIH0gPSBjcmVkZW50aWFscy53ZWI7XG4gICAgICAgIHRoaXMub2F1dGgyX2NsaWVudCA9IG5ldyBnb29nbGUuYXV0aC5PQXV0aDIoXG4gICAgICAgICAgICBjbGllbnRfaWQsXG4gICAgICAgICAgICBjbGllbnRfc2VjcmV0LFxuICAgICAgICAgICAgcmVkaXJlY3RfdXJpc1swXVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN5bmNfY2xpZW50ID0gc3luY19jbGllbnQ7XG4gICAgICAgIGxldCBkb21haW4gPSBvcHRzLk5TUF9FTUFJTF9ET01BSU47XG4gICAgICAgIGlmIChkb21haW4gPT09IHVuZGVmaW5lZCB8fCBkb21haW4gPT09IG51bGwgfHwgZG9tYWluID09PSBcIlwiKSB7XG4gICAgICAgICAgICBkb21haW4gPSB1bmRlZmluZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRvbWFpbiA9IGRvbWFpbjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGxvYWRUb2tlbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmxvYWRlZCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgTG9va2luZyBmb3IgJHt0aGlzLnRva2VuX2tleX1gKTtcbiAgICAgICAgICAgICAgICBjb25zdCBvYXV0aDJEb2MgPSBhd2FpdCB0aGlzLnN5bmNfY2xpZW50XG4gICAgICAgICAgICAgICAgICAgIC5kb2N1bWVudHModGhpcy50b2tlbl9rZXkpXG4gICAgICAgICAgICAgICAgICAgIC5mZXRjaCgpO1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgb2F1dGgyRG9jID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICAgICAgb2F1dGgyRG9jLmRhdGEgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgICAgIG9hdXRoMkRvYy5kYXRhLnRva2VuID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYERpZG4ndCBmaW5kICR7dGhpcy50b2tlbl9rZXl9YCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBvYXV0aDJEb2MuZGF0YS50b2tlbjtcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGVfc2NvcGVzKG9hdXRoMkRvYy5kYXRhLnNjb3Blcyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2F1dGgyX2NsaWVudC5zZXRDcmVkZW50aWFscyh0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBMb2FkZWQgdG9rZW4gJHt0aGlzLnRva2VuX2tleX1gKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICAgICAgYEZhaWxlZCB0byBsb2FkIHRva2VuIGZvciAke3RoaXMudG9rZW5fa2V5fS5cXG4gJHtlfWBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRlZDtcbiAgICB9XG5cbiAgICBnZXQgdG9rZW5fa2V5KCkge1xuICAgICAgICByZXR1cm4gYG9hdXRoMl8ke3RoaXMubnVtYmVyfWA7XG4gICAgfVxuXG4gICAgYXN5bmMgZGVsZXRlVG9rZW4oKSB7XG4gICAgICAgIGNvbnN0IG9hdXRoMkRvYyA9IGF3YWl0IHRoaXMuc3luY19jbGllbnRcbiAgICAgICAgICAgIC5kb2N1bWVudHModGhpcy50b2tlbl9rZXkpXG4gICAgICAgICAgICAuZmV0Y2goKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgb2F1dGgyRG9jID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIG9hdXRoMkRvYy5kYXRhID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgb2F1dGgyRG9jLmRhdGEudG9rZW4gPT09IHVuZGVmaW5lZFxuICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBEaWRuJ3QgZmluZCAke3RoaXMudG9rZW5fa2V5fWApO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHRoaXMuc3luY19jbGllbnQuZG9jdW1lbnRzKG9hdXRoMkRvYy5zaWQpLnJlbW92ZSgpO1xuICAgICAgICBjb25zb2xlLmxvZyhgRGVsZXRlZCB0b2tlbiAke3RoaXMudG9rZW5fa2V5fWApO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBhc3luYyBjb21wbGV0ZUxvZ2luKGNvZGU6IHN0cmluZywgc2NvcGVzOiBzdHJpbmdbXSkge1xuICAgICAgICB2YWxpZGF0ZV9zY29wZXMoc2NvcGVzKTtcbiAgICAgICAgY29uc3QgdG9rZW4gPSBhd2FpdCB0aGlzLm9hdXRoMl9jbGllbnQuZ2V0VG9rZW4oY29kZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KE9iamVjdC5rZXlzKHRva2VuLnJlcyEpKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRva2VuLnRva2VucykpO1xuICAgICAgICB0aGlzLm9hdXRoMl9jbGllbnQuc2V0Q3JlZGVudGlhbHModG9rZW4udG9rZW5zKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IG9hdXRoRG9jID0gYXdhaXQgdGhpcy5zeW5jX2NsaWVudC5kb2N1bWVudHMuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICBkYXRhOiB7IHRva2VuOiB0b2tlbi50b2tlbnMsIHNjb3Blczogc2NvcGVzIH0sXG4gICAgICAgICAgICAgICAgdW5pcXVlTmFtZTogdGhpcy50b2tlbl9rZXksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgYEV4Y2VwdGlvbiB3aGVuIGNyZWF0aW5nIG9hdXRoLiBUcnlpbmcgdG8gdXBkYXRlIGluc3RlYWQuLi5cXG4ke2V9YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IG9hdXRoRG9jID0gYXdhaXQgdGhpcy5zeW5jX2NsaWVudFxuICAgICAgICAgICAgICAgIC5kb2N1bWVudHModGhpcy50b2tlbl9rZXkpXG4gICAgICAgICAgICAgICAgLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHsgdG9rZW46IHRva2VuLCBzY29wZXM6IHNjb3BlcyB9LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0QXV0aFVybCgpIHtcbiAgICAgICAgY29uc3QgaWQgPSB0aGlzLmdlbmVyYXRlUmFuZG9tU3RyaW5nKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBVc2luZyBub25jZSAke2lkfSBmb3IgJHt0aGlzLm51bWJlcn1gKTtcbiAgICAgICAgY29uc3QgZG9jID0gYXdhaXQgdGhpcy5zeW5jX2NsaWVudC5kb2N1bWVudHMuY3JlYXRlKHtcbiAgICAgICAgICAgIGRhdGE6IHsgbnVtYmVyOiB0aGlzLm51bWJlciwgc2NvcGVzOiBTQ09QRVMgfSxcbiAgICAgICAgICAgIHVuaXF1ZU5hbWU6IGlkLFxuICAgICAgICAgICAgdHRsOiA2MCAqIDUsIC8vIDUgbWludXRlc1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2coYE1hZGUgbm9uY2UtZG9jOiAke0pTT04uc3RyaW5naWZ5KGRvYyl9YCk7XG5cbiAgICAgICAgY29uc3Qgb3B0czogR2VuZXJhdGVBdXRoVXJsT3B0cyA9IHtcbiAgICAgICAgICAgIGFjY2Vzc190eXBlOiBcIm9mZmxpbmVcIixcbiAgICAgICAgICAgIHNjb3BlOiBTQ09QRVMsXG4gICAgICAgICAgICBzdGF0ZTogaWQsXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLmRvbWFpbikge1xuICAgICAgICAgICAgb3B0c1tcImhkXCJdID0gdGhpcy5kb21haW47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBhdXRoVXJsID0gdGhpcy5vYXV0aDJfY2xpZW50LmdlbmVyYXRlQXV0aFVybChvcHRzKTtcbiAgICAgICAgcmV0dXJuIGF1dGhVcmw7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVSYW5kb21TdHJpbmcoKSB7XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IDMwO1xuICAgICAgICBsZXQgcmVzdWx0ID0gXCJcIjtcbiAgICAgICAgY29uc3QgY2hhcmFjdGVycyA9XG4gICAgICAgICAgICBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5XCI7XG4gICAgICAgIGNvbnN0IGNoYXJhY3RlcnNMZW5ndGggPSBjaGFyYWN0ZXJzLmxlbmd0aDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0ICs9IGNoYXJhY3RlcnMuY2hhckF0KFxuICAgICAgICAgICAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJhY3RlcnNMZW5ndGgpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuXG5leHBvcnQgeyBVc2VyQ3JlZHMsIFNDT1BFUywgVVNFUl9DUkVEU19PUFRTIH07XG4iLCJpbXBvcnQgeyBnb29nbGUsIHNoZWV0c192NCB9IGZyb20gXCJnb29nbGVhcGlzXCI7XG5cbnR5cGUgRklORF9QQVRST0xMRVJfT1BUUyA9IHtcbiAgICBTSEVFVF9JRDogc3RyaW5nO1xuICAgIFBIT05FX05VTUJFUl9MT09LVVBfU0hFRVQ6IHN0cmluZztcbiAgICBQSE9ORV9OVU1CRVJfTlVNQkVSX0NPTFVNTjogc3RyaW5nO1xuICAgIFBIT05FX05VTUJFUl9OQU1FX0NPTFVNTjogc3RyaW5nO1xufTtcbmFzeW5jIGZ1bmN0aW9uIGZpbmRfcGF0cm9sbGVyX2Zyb21fbnVtYmVyKFxuICAgIHJhd19udW1iZXI6IHN0cmluZyxcbiAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyxcbiAgICBvcHRzOiBGSU5EX1BBVFJPTExFUl9PUFRTXG4pIHtcbiAgICBjb25zdCBudW1iZXIgPSBzYW5pdGl6ZV9udW1iZXIocmF3X251bWJlcik7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBzaGVldHNfc2VydmljZS5zcHJlYWRzaGVldHMudmFsdWVzLmdldCh7XG4gICAgICAgIHNwcmVhZHNoZWV0SWQ6IG9wdHMuU0hFRVRfSUQsXG4gICAgICAgIHJhbmdlOiBvcHRzLlBIT05FX05VTUJFUl9MT09LVVBfU0hFRVQsXG4gICAgICAgIHZhbHVlUmVuZGVyT3B0aW9uOiBcIlVORk9STUFUVEVEX1ZBTFVFXCIsXG4gICAgfSk7XG4gICAgaWYgKCFyZXNwb25zZS5kYXRhLnZhbHVlcykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgZmluZCBwYXRyb2xsZXIuXCIpO1xuICAgIH1cbiAgICBjb25zdCBwYXRyb2xsZXIgPSByZXNwb25zZS5kYXRhLnZhbHVlc1xuICAgICAgICAubWFwKChyb3cpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJhd051bWJlciA9XG4gICAgICAgICAgICAgICAgcm93W2V4Y2VsX3Jvd190b19pbmRleChvcHRzLlBIT05FX05VTUJFUl9OVU1CRVJfQ09MVU1OKV07XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50TnVtYmVyID1cbiAgICAgICAgICAgICAgICByYXdOdW1iZXIgIT0gdW5kZWZpbmVkID8gc2FuaXRpemVfbnVtYmVyKHJhd051bWJlcikgOiByYXdOdW1iZXI7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50TmFtZSA9XG4gICAgICAgICAgICAgICAgcm93W2V4Y2VsX3Jvd190b19pbmRleChvcHRzLlBIT05FX05VTUJFUl9OQU1FX0NPTFVNTildO1xuICAgICAgICAgICAgcmV0dXJuIHsgbmFtZTogY3VycmVudE5hbWUsIG51bWJlcjogY3VycmVudE51bWJlciB9O1xuICAgICAgICB9KVxuICAgICAgICAuZmlsdGVyKChwYXRyb2xsZXIpID0+IChwYXRyb2xsZXIubnVtYmVyID09PSBudW1iZXIpKVswXTtcbiAgICByZXR1cm4gcGF0cm9sbGVyO1xufVxudHlwZSBQQVRST0xMRVJfU0VBU09OX09QVFMgPSB7XG4gICAgU0hFRVRfSUQ6IHN0cmluZztcbiAgICBTRUFTT05fU0hFRVQ6IHN0cmluZztcbiAgICBTRUFTT05fU0hFRVRfREFZU19DT0xVTU46IHN0cmluZztcbiAgICBTRUFTT05fU0hFRVRfTkFNRV9DT0xVTU46IHN0cmluZztcbn07XG5cbmFzeW5jIGZ1bmN0aW9uIGdldF9wYXRyb2xsZWRfZGF5cyhcbiAgICBwYXRyb2xsZXJfbmFtZTogc3RyaW5nLFxuICAgIHNoZWV0c19zZXJ2aWNlOiBzaGVldHNfdjQuU2hlZXRzLFxuICAgIG9wdHM6IFBBVFJPTExFUl9TRUFTT05fT1BUU1xuKSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBzaGVldHNfc2VydmljZS5zcHJlYWRzaGVldHMudmFsdWVzLmdldCh7XG4gICAgICAgIHNwcmVhZHNoZWV0SWQ6IG9wdHMuU0hFRVRfSUQsXG4gICAgICAgIHJhbmdlOiBvcHRzLlNFQVNPTl9TSEVFVCxcbiAgICAgICAgdmFsdWVSZW5kZXJPcHRpb246IFwiVU5GT1JNQVRURURfVkFMVUVcIixcbiAgICB9KTtcbiAgICBpZiAoIXJlc3BvbnNlLmRhdGEudmFsdWVzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBmaW5kIHBhdHJvbGxlciBpbiBzZWFzb24gc2hlZXQuXCIpO1xuICAgIH1cbiAgICBjb25zdCBkYXRlc3RyID0gbmV3IERhdGUoKVxuICAgICAgICAudG9Mb2NhbGVEYXRlU3RyaW5nKClcbiAgICAgICAgLnNwbGl0KFwiL1wiKVxuICAgICAgICAubWFwKCh4KSA9PiB4LnBhZFN0YXJ0KDIsIFwiMFwiKSlcbiAgICAgICAgLmpvaW4oXCJcIik7XG4gICAgY29uc3QgcGF0cm9sbGVyX3JvdyA9IHJlc3BvbnNlLmRhdGEudmFsdWVzLmZpbHRlcigocm93KSA9PiByb3dbZXhjZWxfcm93X3RvX2luZGV4KG9wdHMuU0VBU09OX1NIRUVUX05BTUVfQ09MVU1OKV0gPT0gcGF0cm9sbGVyX25hbWUpWzBdO1xuXG4gICAgaWYoIXBhdHJvbGxlcl9yb3cpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIkNvdWxkbid0IGZpbmQgZGF5cyBmb3IgcGF0cm9sbGVyXCIgKyBwYXRyb2xsZXJfbmFtZSlcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIGNvbnN0IGN1cnJlbnROdW1iZXIgPVxuICAgICAgICBwYXRyb2xsZXJfcm93W2V4Y2VsX3Jvd190b19pbmRleChvcHRzLlNFQVNPTl9TSEVFVF9EQVlTX0NPTFVNTildO1xuICAgIGNvbnN0IGN1cnJlbnREYXkgPSBwYXRyb2xsZXJfcm93XG4gICAgICAgIC5tYXAoKHgpID0+IHg/LnRvU3RyaW5nKCkpXG4gICAgICAgIC5maWx0ZXIoKHgpID0+IHg/LmVuZHNXaXRoKGRhdGVzdHIpKVxuICAgICAgICAubWFwKCh4KSA9PiAoeD8uc3RhcnRzV2l0aChcIkhcIikgPyAwLjUgOiAxKSlcbiAgICAgICAgLnJlZHVjZSgoeCwgeSwgaSkgPT4geCArIHksIDApO1xuICAgIFxuICAgIGNvbnN0IGRheXNCZWZvcmVUb2RheSA9IGN1cnJlbnROdW1iZXIgLSBjdXJyZW50RGF5O1xuICAgIHJldHVybiBkYXlzQmVmb3JlVG9kYXk7XG59XG5cbmZ1bmN0aW9uIHNwbGl0X3RvX3Jvd19jb2woZXhjZWxfaW5kZXg6IHN0cmluZykge1xuICAgIGNvbnN0IGNvbCA9IGV4Y2VsX3Jvd190b19pbmRleChleGNlbF9pbmRleFswXSk7XG4gICAgY29uc3Qgcm93ID0gTnVtYmVyKGV4Y2VsX2luZGV4WzFdKSAtIDE7XG4gICAgcmV0dXJuIFtyb3csIGNvbF07XG59XG5cbmZ1bmN0aW9uIGxvb2t1cF9yb3dfY29sX2luX3NoZWV0KGV4Y2VsX2luZGV4OiBzdHJpbmcsIHNoZWV0OiBhbnlbXVtdKSB7XG4gICAgY29uc3QgW3JvdywgY29sXSA9IHNwbGl0X3RvX3Jvd19jb2woZXhjZWxfaW5kZXgpO1xuICAgIHJldHVybiBzaGVldFtyb3ddW2NvbF07XG59XG5cbmZ1bmN0aW9uIGV4Y2VsX3Jvd190b19pbmRleChyb3c6IHN0cmluZykge1xuICAgIHJldHVybiByb3cudG9Mb3dlckNhc2UoKS5jaGFyQ29kZUF0KDApIC0gXCJhXCIuY2hhckNvZGVBdCgwKTtcbn1cblxuZnVuY3Rpb24gc2FuaXRpemVfbnVtYmVyKG51bWJlcjogbnVtYmVyIHwgc3RyaW5nKSB7XG4gICAgbGV0IG5ld19udW1iZXIgPSBudW1iZXIudG9TdHJpbmcoKTtcbiAgICBuZXdfbnVtYmVyID0gbmV3X251bWJlci5yZXBsYWNlKFwid2hhdHNhcHA6XCIsIFwiXCIpO1xuICAgIG5ld19udW1iZXIgPSBuZXdfbnVtYmVyLnJlcGxhY2UoLyheXFwrMXxcXCh8XFwpfFxcLnwtKS9nLCBcIlwiKTtcbiAgICBpZiAobmV3X251bWJlci5zdGFydHNXaXRoKFwiKzFcIikpIHtcbiAgICAgICAgbmV3X251bWJlciA9IG5ld19udW1iZXIuc3Vic3RyaW5nKDIpO1xuICAgIH1cbiAgICByZXR1cm4gcGFyc2VJbnQobmV3X251bWJlcik7XG59XG5cbnR5cGUgUEFUUk9MTEVSX1JPV19PUFRTID0ge1xuICAgIFNFQ1RJT05fRFJPUERPV05fQ09MVU1OOiBzdHJpbmc7XG4gICAgQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU46IHN0cmluZztcbn07XG50eXBlIFBhdHJvbGxlclJvdyA9IHtcbiAgICBpbmRleDogbnVtYmVyLFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBzZWN0aW9uOiBzdHJpbmcsXG4gICAgY2hlY2tpbjogc3RyaW5nXG59XG5mdW5jdGlvbiBwYXJzZV9wYXRyb2xsZXJfcm93KFxuICAgIGluZGV4OiBudW1iZXIsXG4gICAgcm93OiBzdHJpbmdbXSxcbiAgICBvcHRzOiBQQVRST0xMRVJfUk9XX09QVFNcbik6IFBhdHJvbGxlclJvdyB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICBuYW1lOiByb3dbMF0sXG4gICAgICAgIHNlY3Rpb246IHJvd1tleGNlbF9yb3dfdG9faW5kZXgob3B0cy5TRUNUSU9OX0RST1BET1dOX0NPTFVNTildLFxuICAgICAgICBjaGVja2luOiByb3dbZXhjZWxfcm93X3RvX2luZGV4KG9wdHMuQ0hFQ0tJTl9EUk9QRE9XTl9DT0xVTU4pXSxcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBleGNlbF9kYXRlX3RvX2pzX2RhdGUoZGF0ZTogbnVtYmVyKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IERhdGUoMCk7XG4gICAgcmVzdWx0LnNldFVUQ01pbGxpc2Vjb25kcyhNYXRoLnJvdW5kKChkYXRlIC0gMjU1NjkpICogODY0MDAgKiAxMDAwKSk7XG4gICAgLy8gY29uc29sZS5sb2coYERFQlVHOiBleGNlbF9kYXRlX3RvX2pzX2RhdGUgKCR7cmVzdWx0fSlgKVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIHBhcnNlX3RpbWVfdG9fdXRjKGRhdGU6IERhdGUpIHtcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgRGF0ZShkYXRlLnRvVVRDU3RyaW5nKCkucmVwbGFjZShcIiBHTVRcIiwgXCIgUFNUXCIpKTtcbiAgICAvLyBjb25zb2xlLmxvZyhgREVCVUc6IHBhcnNlX3RpbWVfdG9fdXRjICgke3Jlc3VsdH0pYClcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBzdHJpcF9kYXRldGltZV90b19kYXRlKGRhdGU6IERhdGUpIHtcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgRGF0ZShcbiAgICAgICAgZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoXCJlbi1VU1wiLCB7IHRpbWVab25lOiBcIkFtZXJpY2EvTG9zX0FuZ2VsZXNcIiB9KVxuICAgICk7XG4gICAgLy8gY29uc29sZS5sb2coYERFQlVHOiBzdHJpcF9kYXRldGltZV90b19kYXRlICgke3Jlc3VsdH0pYClcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5hc3luYyBmdW5jdGlvbiBsb2dBY3Rpb24oXG4gICAgcGF0cm9sbGVyX25hbWU6IHN0cmluZyxcbiAgICBzaGVldHNfc2VydmljZTogc2hlZXRzX3Y0LlNoZWV0cyxcbiAgICBzaGVldF9pZDogc3RyaW5nLFxuICAgIHVzZXJfc3RhdGlzdGljc19zaGVldDogc3RyaW5nLFxuICAgIGFjdGlvbjogc3RyaW5nXG4pIHtcbiAgICBhd2FpdCBzaGVldHNfc2VydmljZS5zcHJlYWRzaGVldHMudmFsdWVzLmFwcGVuZCh7XG4gICAgICAgIHNwcmVhZHNoZWV0SWQ6IHNoZWV0X2lkLFxuICAgICAgICByYW5nZTogdXNlcl9zdGF0aXN0aWNzX3NoZWV0LFxuICAgICAgICB2YWx1ZUlucHV0T3B0aW9uOiBcIlVTRVJfRU5URVJFRFwiLFxuICAgICAgICByZXF1ZXN0Qm9keTogeyB2YWx1ZXM6IFtbcGF0cm9sbGVyX25hbWUsIG5ldyBEYXRlKCksIGFjdGlvbl1dIH0sXG4gICAgfSk7XG59XG5cbmV4cG9ydCB7XG4gICAgZXhjZWxfcm93X3RvX2luZGV4LFxuICAgIHBhcnNlX3BhdHJvbGxlcl9yb3csXG4gICAgZXhjZWxfZGF0ZV90b19qc19kYXRlLFxuICAgIHBhcnNlX3RpbWVfdG9fdXRjLFxuICAgIHN0cmlwX2RhdGV0aW1lX3RvX2RhdGUsXG4gICAgc2FuaXRpemVfbnVtYmVyLFxuICAgIHNwbGl0X3RvX3Jvd19jb2wsXG4gICAgbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQsXG4gICAgZmluZF9wYXRyb2xsZXJfZnJvbV9udW1iZXIsXG4gICAgbG9nQWN0aW9uLFxuICAgIGdldF9wYXRyb2xsZWRfZGF5cyxcbiAgICBGSU5EX1BBVFJPTExFUl9PUFRTLFxuICAgIFBhdHJvbGxlclJvdyxcbiAgICBQQVRST0xMRVJfU0VBU09OX09QVFMsXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJnb29nbGVhcGlzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge1xuICAgIENvbnRleHQsXG4gICAgU2VydmVybGVzc0NhbGxiYWNrLFxuICAgIFNlcnZlcmxlc3NFdmVudE9iamVjdCxcbiAgICBTZXJ2ZXJsZXNzRnVuY3Rpb25TaWduYXR1cmUsXG59IGZyb20gXCJAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzL3R5cGVzXCI7XG5pbXBvcnQgeyBVc2VyQ3JlZHMgfSBmcm9tIFwiLi91c2VyLWNyZWRzXCI7XG5cbnR5cGUgSGFuZGxlckV2ZW50ID0gU2VydmVybGVzc0V2ZW50T2JqZWN0PFxuICAgIHtcbiAgICAgICAgc3RhdGU6IHN0cmluZztcbiAgICAgICAgY29kZTogc3RyaW5nO1xuICAgIH0sXG4gICAge30sXG4gICAge31cbj47XG50eXBlIEhhbmRsZXJFbnZpcm9ubWVudCA9IHtcbiAgICBTWU5DX1NJRDogc3RyaW5nO1xuICAgIE5TUF9FTUFJTF9ET01BSU46IHN0cmluZztcbn07XG5cbmV4cG9ydCBjb25zdCBoYW5kbGVyOiBTZXJ2ZXJsZXNzRnVuY3Rpb25TaWduYXR1cmU8XG4gICAgSGFuZGxlckVudmlyb25tZW50LFxuICAgIEhhbmRsZXJFdmVudFxuPiA9IGFzeW5jIGZ1bmN0aW9uIChcbiAgICBjb250ZXh0OiBDb250ZXh0PEhhbmRsZXJFbnZpcm9ubWVudD4sXG4gICAgZXZlbnQ6IFNlcnZlcmxlc3NFdmVudE9iamVjdDxIYW5kbGVyRXZlbnQ+LFxuICAgIGNhbGxiYWNrOiBTZXJ2ZXJsZXNzQ2FsbGJhY2tcbikge1xuICAgIGNvbnNvbGUubG9nKGBIYW5kbGluZyBhdXRoIGNvbXBsZXRpb246ICR7SlNPTi5zdHJpbmdpZnkoZXZlbnQpfWApO1xuXG4gICAgY29uc3Qgc3RhdGUgPSBldmVudC5zdGF0ZTtcbiAgICBpZiAoc3RhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIG5vbmNlXCIpO1xuICAgIH1cbiAgICBjb25zdCB0d2lsaW9TeW5jID0gY29udGV4dFxuICAgICAgICAuZ2V0VHdpbGlvQ2xpZW50KClcbiAgICAgICAgLnN5bmMuc2VydmljZXMoY29udGV4dC5TWU5DX1NJRCk7XG5cbiAgICBsZXQgZG9jO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBMb29raW5nIGZvciBzdGF0ZSAke3N0YXRlfS4uLmApO1xuICAgICAgICBkb2MgPSBhd2FpdCB0d2lsaW9TeW5jLmRvY3VtZW50cyhzdGF0ZSkuZmV0Y2goKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICBjYWxsYmFjayhgRmFpbGVkIHRvIGdldCBzdGF0ZSBkb2MuYCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGRvYy5kYXRhID09PSB1bmRlZmluZWQgfHwgaXNOYU4oZG9jLmRhdGEubnVtYmVyKSkge1xuICAgICAgICBjYWxsYmFjayhgUmVjZWl2ZWQgaW52YWxpZCBub25jZWApO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG51bWJlciA9IGRvYy5kYXRhLm51bWJlcjtcbiAgICBjb25zb2xlLmxvZyhgRm91bmQgbnVtYmVyICR7bnVtYmVyfSBmb3Igbm9uY2UgJHtzdGF0ZX1gKTtcblxuICAgIGNvbnN0IHVzZXJfY3JlZHMgPSBuZXcgVXNlckNyZWRzKHR3aWxpb1N5bmMsIG51bWJlciwgY29udGV4dCk7XG4gICAgaWYgKGF3YWl0IHVzZXJfY3JlZHMubG9hZFRva2VuKCkpIHtcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgXCJhbHJlYWR5X3ZhbGlkXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY29kZSA9IGV2ZW50LmNvZGU7XG4gICAgY29uc3Qgc2NvcGVzID0gZG9jLmRhdGEuc2NvcGVzO1xuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHR3aWxpb1N5bmMuZG9jdW1lbnRzKGRvYy5zaWQpLnJlbW92ZSgpO1xuICAgICAgICBjb25zb2xlLmxvZyhgRGVsZXRlZCBub25jZSAke2RvYy51bmlxdWVOYW1lfWApO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgYEZhaWxlZCB0byBkZWxldGUgbm9uY2U6ICR7ZX1gKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHVzZXJfY3JlZHMuY29tcGxldGVMb2dpbihjb2RlLCBzY29wZXMpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBFcnJvciB8fCBlIGluc3RhbmNlb2YgU3RyaW5nKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKFwiRmFpbGVkIHRvIGNvbXBsZXRlIHVzZXIgYXV0aFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNhbGxiYWNrKFxuICAgICAgICBudWxsLFxuICAgICAgICBcIlBsZWFzZSByZXR1cm4gdG8geW91ciBtZXNzYWdpbmcgYXBwIGFuZCBlbmdhZ2UgQlZOU1AgYm90IGFnYWluLlwiXG4gICAgKTtcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=