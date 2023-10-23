/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/handlers/complete-user-auth.ts":
/*!********************************************!*\
  !*** ./src/handlers/complete-user-auth.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.handler = void 0;
const user_creds_1 = __importDefault(__webpack_require__(/*! ../user-creds */ "./src/user-creds.ts"));
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
        const user_creds = new user_creds_1.default(twilioSync, number, context);
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
exports.handler = handler;


/***/ }),

/***/ "./src/user-creds.ts":
/*!***************************!*\
  !*** ./src/user-creds.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserCredsScopes = exports.UserCreds = void 0;
const googleapis_1 = __webpack_require__(/*! googleapis */ "googleapis");
const util_1 = __webpack_require__(/*! ./utils/util */ "./src/utils/util.ts");
const file_utils_1 = __webpack_require__(/*! ./utils/file_utils */ "./src/utils/file_utils.ts");
const scope_util_1 = __webpack_require__(/*! ./utils/scope_util */ "./src/utils/scope_util.ts");
const SCOPES = [
    "https://www.googleapis.com/auth/script.projects",
    "https://www.googleapis.com/auth/spreadsheets",
];
exports.UserCredsScopes = SCOPES;
class UserCreds {
    constructor(sync_client, number, opts) {
        this.loaded = false;
        if (number === undefined || number === null) {
            throw new Error("Number is undefined");
        }
        this.number = (0, util_1.sanitize_phone_number)(number);
        const credentials = (0, file_utils_1.load_credentials_files)();
        const { client_secret, client_id, redirect_uris } = credentials.web;
        this.oauth2_client = new googleapis_1.google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
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
                        (0, scope_util_1.validate_scopes)(oauth2Doc.data.scopes, SCOPES);
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
            (0, scope_util_1.validate_scopes)(scopes, SCOPES);
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
exports["default"] = UserCreds;
exports.UserCreds = UserCreds;


/***/ }),

/***/ "./src/utils/file_utils.ts":
/*!*********************************!*\
  !*** ./src/utils/file_utils.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.get_service_credentials_path = exports.load_credentials_files = void 0;
const fs = __importStar(__webpack_require__(/*! fs */ "fs"));
__webpack_require__(/*! @twilio-labs/serverless-runtime-types */ "@twilio-labs/serverless-runtime-types");
function load_credentials_files() {
    return JSON.parse(fs
        .readFileSync(Runtime.getAssets()["/credentials.json"].path)
        .toString());
}
exports.load_credentials_files = load_credentials_files;
function get_service_credentials_path() {
    return Runtime.getAssets()["/service-credentials.json"].path;
}
exports.get_service_credentials_path = get_service_credentials_path;


/***/ }),

/***/ "./src/utils/scope_util.ts":
/*!*********************************!*\
  !*** ./src/utils/scope_util.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validate_scopes = void 0;
function validate_scopes(scopes, desired_scopes) {
    for (const desired_scope of desired_scopes) {
        if (scopes === undefined || !scopes.includes(desired_scope)) {
            const error = `Missing scope ${desired_scope} in received scopes: ${scopes}`;
            console.log(error);
            throw new Error(error);
        }
    }
}
exports.validate_scopes = validate_scopes;


/***/ }),

/***/ "./src/utils/util.ts":
/*!***************************!*\
  !*** ./src/utils/util.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.lookup_row_col_in_sheet = exports.split_to_row_col = exports.sanitize_phone_number = exports.excel_row_to_index = exports.row_col_to_excel_index = void 0;
function row_col_to_excel_index(row, col) {
    let colString = "";
    col += 1;
    while (col > 0) {
        col -= 1;
        const modulo = col % 26;
        const colLetter = String.fromCharCode('A'.charCodeAt(0) + modulo);
        colString = colLetter + colString;
        col = Math.floor(col / 26);
    }
    return colString + (row + 1).toString();
}
exports.row_col_to_excel_index = row_col_to_excel_index;
function split_to_row_col(excel_index) {
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
    return [raw_row - 1, col];
}
exports.split_to_row_col = split_to_row_col;
function lookup_row_col_in_sheet(excel_index, sheet) {
    const [row, col] = split_to_row_col(excel_index);
    if (row >= sheet.length) {
        return undefined;
    }
    return sheet[row][col];
}
exports.lookup_row_col_in_sheet = lookup_row_col_in_sheet;
function excel_row_to_index(letters) {
    const lowerLetters = letters.toLowerCase();
    let result = 0;
    for (var p = 0; p < lowerLetters.length; p++) {
        const characterValue = lowerLetters.charCodeAt(p) - "a".charCodeAt(0) + 1;
        result = characterValue + result * 26;
    }
    return result - 1;
}
exports.excel_row_to_index = excel_row_to_index;
function sanitize_phone_number(number) {
    let new_number = number.toString();
    new_number = new_number.replace("whatsapp:", "");
    let temporary_new_number = "";
    while (temporary_new_number != new_number) {
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
exports.sanitize_phone_number = sanitize_phone_number;


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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/handlers/complete-user-auth.ts");
/******/ 	exports.handler = __webpack_exports__.handler;
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Y2VzIjpbIi9Vc2Vycy9qb2hhbmhlbmtlbnMvUmVwb3NpdG9yaWVzL3BlcnNvbmFsX3Byb2plY3RzL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL2hhbmRsZXJzL2NvbXBsZXRlLXVzZXItYXV0aC50cyIsIi9Vc2Vycy9qb2hhbmhlbmtlbnMvUmVwb3NpdG9yaWVzL3BlcnNvbmFsX3Byb2plY3RzL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3VzZXItY3JlZHMudHMiLCIvVXNlcnMvam9oYW5oZW5rZW5zL1JlcG9zaXRvcmllcy9wZXJzb25hbF9wcm9qZWN0cy9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91dGlscy9maWxlX3V0aWxzLnRzIiwiL1VzZXJzL2pvaGFuaGVua2Vucy9SZXBvc2l0b3JpZXMvcGVyc29uYWxfcHJvamVjdHMvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvc2NvcGVfdXRpbC50cyIsIi9Vc2Vycy9qb2hhbmhlbmtlbnMvUmVwb3NpdG9yaWVzL3BlcnNvbmFsX3Byb2plY3RzL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3V0aWxzL3V0aWwudHMiLCJleHRlcm5hbCBjb21tb25qcyBcIkB0d2lsaW8tbGFicy9zZXJ2ZXJsZXNzLXJ1bnRpbWUtdHlwZXNcIiIsImV4dGVybmFsIGNvbW1vbmpzIFwiZ29vZ2xlYXBpc1wiIiwiZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImZzXCIiLCJ3ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb250ZXh0LFxuICAgIFNlcnZlcmxlc3NDYWxsYmFjayxcbiAgICBTZXJ2ZXJsZXNzRXZlbnRPYmplY3QsXG4gICAgU2VydmVybGVzc0Z1bmN0aW9uU2lnbmF0dXJlLFxufSBmcm9tIFwiQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlcy90eXBlc1wiO1xuaW1wb3J0IFVzZXJDcmVkcyBmcm9tIFwiLi4vdXNlci1jcmVkc1wiO1xuXG50eXBlIEhhbmRsZXJFdmVudCA9IFNlcnZlcmxlc3NFdmVudE9iamVjdDxcbiAgICB7XG4gICAgICAgIHN0YXRlOiBzdHJpbmc7XG4gICAgICAgIGNvZGU6IHN0cmluZztcbiAgICB9LFxuICAgIHt9LFxuICAgIHt9XG4+O1xudHlwZSBIYW5kbGVyRW52aXJvbm1lbnQgPSB7XG4gICAgU1lOQ19TSUQ6IHN0cmluZztcbiAgICBOU1BfRU1BSUxfRE9NQUlOOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgY29uc3QgaGFuZGxlcjogU2VydmVybGVzc0Z1bmN0aW9uU2lnbmF0dXJlPFxuICAgIEhhbmRsZXJFbnZpcm9ubWVudCxcbiAgICBIYW5kbGVyRXZlbnRcbj4gPSBhc3luYyBmdW5jdGlvbiAoXG4gICAgY29udGV4dDogQ29udGV4dDxIYW5kbGVyRW52aXJvbm1lbnQ+LFxuICAgIGV2ZW50OiBTZXJ2ZXJsZXNzRXZlbnRPYmplY3Q8SGFuZGxlckV2ZW50PixcbiAgICBjYWxsYmFjazogU2VydmVybGVzc0NhbGxiYWNrXG4pIHtcbiAgICBjb25zb2xlLmxvZyhgSGFuZGxpbmcgYXV0aCBjb21wbGV0aW9uOiAke0pTT04uc3RyaW5naWZ5KGV2ZW50KX1gKTtcblxuICAgIGNvbnN0IHN0YXRlID0gZXZlbnQuc3RhdGU7XG4gICAgaWYgKHN0YXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyBub25jZVwiKTtcbiAgICB9XG4gICAgY29uc3QgdHdpbGlvU3luYyA9IGNvbnRleHRcbiAgICAgICAgLmdldFR3aWxpb0NsaWVudCgpXG4gICAgICAgIC5zeW5jLnNlcnZpY2VzKGNvbnRleHQuU1lOQ19TSUQpO1xuXG4gICAgbGV0IGRvYztcbiAgICB0cnkge1xuICAgICAgICBjb25zb2xlLmxvZyhgTG9va2luZyBmb3Igc3RhdGUgJHtzdGF0ZX0uLi5gKTtcbiAgICAgICAgZG9jID0gYXdhaXQgdHdpbGlvU3luYy5kb2N1bWVudHMoc3RhdGUpLmZldGNoKCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgY2FsbGJhY2soYEZhaWxlZCB0byBnZXQgc3RhdGUgZG9jLmApO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChkb2MuZGF0YSA9PT0gdW5kZWZpbmVkIHx8IGlzTmFOKGRvYy5kYXRhLm51bWJlcikpIHtcbiAgICAgICAgY2FsbGJhY2soYFJlY2VpdmVkIGludmFsaWQgbm9uY2VgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBudW1iZXIgPSBkb2MuZGF0YS5udW1iZXI7XG4gICAgY29uc29sZS5sb2coYEZvdW5kIG51bWJlciAke251bWJlcn0gZm9yIG5vbmNlICR7c3RhdGV9YCk7XG5cbiAgICBjb25zdCB1c2VyX2NyZWRzID0gbmV3IFVzZXJDcmVkcyh0d2lsaW9TeW5jLCBudW1iZXIsIGNvbnRleHQpO1xuICAgIGlmIChhd2FpdCB1c2VyX2NyZWRzLmxvYWRUb2tlbigpKSB7XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIFwiYWxyZWFkeV92YWxpZFwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGNvZGUgPSBldmVudC5jb2RlO1xuICAgIGNvbnN0IHNjb3BlcyA9IGRvYy5kYXRhLnNjb3BlcztcbiAgICB0cnkge1xuICAgICAgICBhd2FpdCB0d2lsaW9TeW5jLmRvY3VtZW50cyhkb2Muc2lkKS5yZW1vdmUoKTtcbiAgICAgICAgY29uc29sZS5sb2coYERlbGV0ZWQgbm9uY2UgJHtkb2MudW5pcXVlTmFtZX1gKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIGBGYWlsZWQgdG8gZGVsZXRlIG5vbmNlOiAke2V9YCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICBhd2FpdCB1c2VyX2NyZWRzLmNvbXBsZXRlTG9naW4oY29kZSwgc2NvcGVzKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChlIGluc3RhbmNlb2YgRXJyb3IgfHwgZSBpbnN0YW5jZW9mIFN0cmluZykge1xuICAgICAgICAgICAgY2FsbGJhY2soZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWxsYmFjayhcIkZhaWxlZCB0byBjb21wbGV0ZSB1c2VyIGF1dGhcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjYWxsYmFjayhcbiAgICAgICAgbnVsbCxcbiAgICAgICAgXCJQbGVhc2UgcmV0dXJuIHRvIHlvdXIgbWVzc2FnaW5nIGFwcCBhbmQgZW5nYWdlIEJWTlNQIGJvdCBhZ2Fpbi5cIlxuICAgICk7XG59O1xuIiwiaW1wb3J0IHsgZ29vZ2xlIH0gZnJvbSBcImdvb2dsZWFwaXNcIjtcbmltcG9ydCB7IEdlbmVyYXRlQXV0aFVybE9wdHMgfSBmcm9tIFwiZ29vZ2xlLWF1dGgtbGlicmFyeVwiO1xuaW1wb3J0IHsgT0F1dGgyQ2xpZW50IH0gZnJvbSBcImdvb2dsZWFwaXMtY29tbW9uXCI7XG5pbXBvcnQgeyBzYW5pdGl6ZV9waG9uZV9udW1iZXIgfSBmcm9tIFwiLi91dGlscy91dGlsXCI7XG5pbXBvcnQgeyBsb2FkX2NyZWRlbnRpYWxzX2ZpbGVzIH0gZnJvbSBcIi4vdXRpbHMvZmlsZV91dGlsc1wiO1xuaW1wb3J0IHsgU2VydmljZUNvbnRleHQgfSBmcm9tIFwiQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlcy90eXBlc1wiO1xuaW1wb3J0IHsgVXNlckNyZWRzQ29uZmlnIH0gZnJvbSBcIi4vZW52L2hhbmRsZXJfY29uZmlnXCI7XG5pbXBvcnQgeyB2YWxpZGF0ZV9zY29wZXMgfSBmcm9tIFwiLi91dGlscy9zY29wZV91dGlsXCI7XG5cbmNvbnN0IFNDT1BFUyA9IFtcbiAgICBcImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvc2NyaXB0LnByb2plY3RzXCIsXG4gICAgXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3NwcmVhZHNoZWV0c1wiLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckNyZWRzIHtcbiAgICBudW1iZXI6IHN0cmluZztcbiAgICBvYXV0aDJfY2xpZW50OiBPQXV0aDJDbGllbnQ7XG4gICAgc3luY19jbGllbnQ6IFNlcnZpY2VDb250ZXh0O1xuICAgIGRvbWFpbj86IHN0cmluZztcbiAgICBsb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgc3luY19jbGllbnQ6IFNlcnZpY2VDb250ZXh0LFxuICAgICAgICBudW1iZXI6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICAgICAgb3B0czogVXNlckNyZWRzQ29uZmlnXG4gICAgKSB7XG4gICAgICAgIGlmIChudW1iZXIgPT09IHVuZGVmaW5lZCB8fCBudW1iZXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk51bWJlciBpcyB1bmRlZmluZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5udW1iZXIgPSBzYW5pdGl6ZV9waG9uZV9udW1iZXIobnVtYmVyKTtcblxuICAgICAgICBjb25zdCBjcmVkZW50aWFscyA9IGxvYWRfY3JlZGVudGlhbHNfZmlsZXMoKTtcbiAgICAgICAgY29uc3QgeyBjbGllbnRfc2VjcmV0LCBjbGllbnRfaWQsIHJlZGlyZWN0X3VyaXMgfSA9IGNyZWRlbnRpYWxzLndlYjtcbiAgICAgICAgdGhpcy5vYXV0aDJfY2xpZW50ID0gbmV3IGdvb2dsZS5hdXRoLk9BdXRoMihcbiAgICAgICAgICAgIGNsaWVudF9pZCxcbiAgICAgICAgICAgIGNsaWVudF9zZWNyZXQsXG4gICAgICAgICAgICByZWRpcmVjdF91cmlzWzBdXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3luY19jbGllbnQgPSBzeW5jX2NsaWVudDtcbiAgICAgICAgbGV0IGRvbWFpbiA9IG9wdHMuTlNQX0VNQUlMX0RPTUFJTjtcbiAgICAgICAgaWYgKGRvbWFpbiA9PT0gdW5kZWZpbmVkIHx8IGRvbWFpbiA9PT0gbnVsbCB8fCBkb21haW4gPT09IFwiXCIpIHtcbiAgICAgICAgICAgIGRvbWFpbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZG9tYWluID0gZG9tYWluO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgbG9hZFRva2VuKCkge1xuICAgICAgICBpZiAoIXRoaXMubG9hZGVkKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBMb29raW5nIGZvciAke3RoaXMudG9rZW5fa2V5fWApO1xuICAgICAgICAgICAgICAgIGNvbnN0IG9hdXRoMkRvYyA9IGF3YWl0IHRoaXMuc3luY19jbGllbnRcbiAgICAgICAgICAgICAgICAgICAgLmRvY3VtZW50cyh0aGlzLnRva2VuX2tleSlcbiAgICAgICAgICAgICAgICAgICAgLmZldGNoKCk7XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICBvYXV0aDJEb2MgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgICAgICBvYXV0aDJEb2MuZGF0YSA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICAgICAgb2F1dGgyRG9jLmRhdGEudG9rZW4gPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgRGlkbid0IGZpbmQgJHt0aGlzLnRva2VuX2tleX1gKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0b2tlbiA9IG9hdXRoMkRvYy5kYXRhLnRva2VuO1xuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZV9zY29wZXMob2F1dGgyRG9jLmRhdGEuc2NvcGVzLCBTQ09QRVMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9hdXRoMl9jbGllbnQuc2V0Q3JlZGVudGlhbHModG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgTG9hZGVkIHRva2VuICR7dGhpcy50b2tlbl9rZXl9YCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgICAgIGBGYWlsZWQgdG8gbG9hZCB0b2tlbiBmb3IgJHt0aGlzLnRva2VuX2tleX0uXFxuICR7ZX1gXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5sb2FkZWQ7XG4gICAgfVxuXG4gICAgZ2V0IHRva2VuX2tleSgpIHtcbiAgICAgICAgcmV0dXJuIGBvYXV0aDJfJHt0aGlzLm51bWJlcn1gO1xuICAgIH1cblxuICAgIGFzeW5jIGRlbGV0ZVRva2VuKCkge1xuICAgICAgICBjb25zdCBvYXV0aDJEb2MgPSBhd2FpdCB0aGlzLnN5bmNfY2xpZW50XG4gICAgICAgICAgICAuZG9jdW1lbnRzKHRoaXMudG9rZW5fa2V5KVxuICAgICAgICAgICAgLmZldGNoKCk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIG9hdXRoMkRvYyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICBvYXV0aDJEb2MuZGF0YSA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIG9hdXRoMkRvYy5kYXRhLnRva2VuID09PSB1bmRlZmluZWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgRGlkbid0IGZpbmQgJHt0aGlzLnRva2VuX2tleX1gKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLnN5bmNfY2xpZW50LmRvY3VtZW50cyhvYXV0aDJEb2Muc2lkKS5yZW1vdmUoKTtcbiAgICAgICAgY29uc29sZS5sb2coYERlbGV0ZWQgdG9rZW4gJHt0aGlzLnRva2VuX2tleX1gKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgYXN5bmMgY29tcGxldGVMb2dpbihjb2RlOiBzdHJpbmcsIHNjb3Blczogc3RyaW5nW10pIHtcbiAgICAgICAgdmFsaWRhdGVfc2NvcGVzKHNjb3BlcywgU0NPUEVTKTtcbiAgICAgICAgY29uc3QgdG9rZW4gPSBhd2FpdCB0aGlzLm9hdXRoMl9jbGllbnQuZ2V0VG9rZW4oY29kZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KE9iamVjdC5rZXlzKHRva2VuLnJlcyEpKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRva2VuLnRva2VucykpO1xuICAgICAgICB0aGlzLm9hdXRoMl9jbGllbnQuc2V0Q3JlZGVudGlhbHModG9rZW4udG9rZW5zKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IG9hdXRoRG9jID0gYXdhaXQgdGhpcy5zeW5jX2NsaWVudC5kb2N1bWVudHMuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICBkYXRhOiB7IHRva2VuOiB0b2tlbi50b2tlbnMsIHNjb3Blczogc2NvcGVzIH0sXG4gICAgICAgICAgICAgICAgdW5pcXVlTmFtZTogdGhpcy50b2tlbl9rZXksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgYEV4Y2VwdGlvbiB3aGVuIGNyZWF0aW5nIG9hdXRoLiBUcnlpbmcgdG8gdXBkYXRlIGluc3RlYWQuLi5cXG4ke2V9YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IG9hdXRoRG9jID0gYXdhaXQgdGhpcy5zeW5jX2NsaWVudFxuICAgICAgICAgICAgICAgIC5kb2N1bWVudHModGhpcy50b2tlbl9rZXkpXG4gICAgICAgICAgICAgICAgLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHsgdG9rZW46IHRva2VuLCBzY29wZXM6IHNjb3BlcyB9LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0QXV0aFVybCgpIHtcbiAgICAgICAgY29uc3QgaWQgPSB0aGlzLmdlbmVyYXRlUmFuZG9tU3RyaW5nKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBVc2luZyBub25jZSAke2lkfSBmb3IgJHt0aGlzLm51bWJlcn1gKTtcbiAgICAgICAgY29uc3QgZG9jID0gYXdhaXQgdGhpcy5zeW5jX2NsaWVudC5kb2N1bWVudHMuY3JlYXRlKHtcbiAgICAgICAgICAgIGRhdGE6IHsgbnVtYmVyOiB0aGlzLm51bWJlciwgc2NvcGVzOiBTQ09QRVMgfSxcbiAgICAgICAgICAgIHVuaXF1ZU5hbWU6IGlkLFxuICAgICAgICAgICAgdHRsOiA2MCAqIDUsIC8vIDUgbWludXRlc1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2coYE1hZGUgbm9uY2UtZG9jOiAke0pTT04uc3RyaW5naWZ5KGRvYyl9YCk7XG5cbiAgICAgICAgY29uc3Qgb3B0czogR2VuZXJhdGVBdXRoVXJsT3B0cyA9IHtcbiAgICAgICAgICAgIGFjY2Vzc190eXBlOiBcIm9mZmxpbmVcIixcbiAgICAgICAgICAgIHNjb3BlOiBTQ09QRVMsXG4gICAgICAgICAgICBzdGF0ZTogaWQsXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLmRvbWFpbikge1xuICAgICAgICAgICAgb3B0c1tcImhkXCJdID0gdGhpcy5kb21haW47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBhdXRoVXJsID0gdGhpcy5vYXV0aDJfY2xpZW50LmdlbmVyYXRlQXV0aFVybChvcHRzKTtcbiAgICAgICAgcmV0dXJuIGF1dGhVcmw7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVSYW5kb21TdHJpbmcoKSB7XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IDMwO1xuICAgICAgICBsZXQgcmVzdWx0ID0gXCJcIjtcbiAgICAgICAgY29uc3QgY2hhcmFjdGVycyA9XG4gICAgICAgICAgICBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5XCI7XG4gICAgICAgIGNvbnN0IGNoYXJhY3RlcnNMZW5ndGggPSBjaGFyYWN0ZXJzLmxlbmd0aDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0ICs9IGNoYXJhY3RlcnMuY2hhckF0KFxuICAgICAgICAgICAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJhY3RlcnNMZW5ndGgpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuXG5leHBvcnQgeyBVc2VyQ3JlZHMsIFNDT1BFUyBhcyBVc2VyQ3JlZHNTY29wZXMgfTtcbiIsImltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICdAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzJztcbmZ1bmN0aW9uIGxvYWRfY3JlZGVudGlhbHNfZmlsZXMoKSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoXG4gICAgICAgIGZzXG4gICAgICAgICAgICAucmVhZEZpbGVTeW5jKFJ1bnRpbWUuZ2V0QXNzZXRzKClbXCIvY3JlZGVudGlhbHMuanNvblwiXS5wYXRoKVxuICAgICAgICAgICAgLnRvU3RyaW5nKClcbiAgICApO1xufVxuZnVuY3Rpb24gZ2V0X3NlcnZpY2VfY3JlZGVudGlhbHNfcGF0aCgpIHtcbiAgICByZXR1cm4gUnVudGltZS5nZXRBc3NldHMoKVtcIi9zZXJ2aWNlLWNyZWRlbnRpYWxzLmpzb25cIl0ucGF0aDtcbn1cbmV4cG9ydCB7IGxvYWRfY3JlZGVudGlhbHNfZmlsZXMsIGdldF9zZXJ2aWNlX2NyZWRlbnRpYWxzX3BhdGggfTtcbiIsIlxuZnVuY3Rpb24gdmFsaWRhdGVfc2NvcGVzKHNjb3Blczogc3RyaW5nW10sIGRlc2lyZWRfc2NvcGVzOiBzdHJpbmdbXSkge1xuICAgIGZvciAoY29uc3QgZGVzaXJlZF9zY29wZSBvZiBkZXNpcmVkX3Njb3Blcykge1xuICAgICAgICBpZiAoc2NvcGVzID09PSB1bmRlZmluZWQgfHwgIXNjb3Blcy5pbmNsdWRlcyhkZXNpcmVkX3Njb3BlKSkge1xuICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBgTWlzc2luZyBzY29wZSAke2Rlc2lyZWRfc2NvcGV9IGluIHJlY2VpdmVkIHNjb3BlczogJHtzY29wZXN9YDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQge3ZhbGlkYXRlX3Njb3Blc30iLCJmdW5jdGlvbiByb3dfY29sX3RvX2V4Y2VsX2luZGV4KHJvdzogbnVtYmVyLCBjb2w6IG51bWJlcil7XG4gICAgbGV0IGNvbFN0cmluZyA9IFwiXCI7XG4gICAgY29sKz0xO1xuICAgIHdoaWxlKGNvbCA+IDApe1xuICAgICAgICBjb2wtPTE7XG4gICAgICAgIGNvbnN0IG1vZHVsbyA9IGNvbCAlIDI2O1xuICAgICAgICBjb25zdCBjb2xMZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKCdBJy5jaGFyQ29kZUF0KDApICsgbW9kdWxvKTtcbiAgICAgICAgY29sU3RyaW5nID0gY29sTGV0dGVyICsgY29sU3RyaW5nO1xuICAgICAgICBjb2wgPSBNYXRoLmZsb29yKGNvbCAvIDI2KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbFN0cmluZyArIChyb3crMSkudG9TdHJpbmcoKTtcbn1cblxuZnVuY3Rpb24gc3BsaXRfdG9fcm93X2NvbChleGNlbF9pbmRleDogc3RyaW5nKSB7XG4gICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKFwiXihbQS1aYS16XSspKFswLTldKykkXCIpO1xuICAgIGNvbnN0IG1hdGNoID0gcmVnZXguZXhlYyhleGNlbF9pbmRleCk7XG4gICAgaWYgKG1hdGNoID09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIHBhcnNlIHN0cmluZyBmb3IgZXhjZWwgcG9zaXRpb24gc3BsaXRcIik7XG4gICAgfVxuICAgIGNvbnN0IGNvbCA9IGV4Y2VsX3Jvd190b19pbmRleChtYXRjaFsxXSk7XG4gICAgY29uc3QgcmF3X3JvdyA9IE51bWJlcihtYXRjaFsyXSk7XG4gICAgaWYgKHJhd19yb3cgPCAxKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlJvdyBtdXN0IGJlID49MVwiKTtcbiAgICB9XG4gICAgcmV0dXJuIFtyYXdfcm93IC0gMSwgY29sXTtcbn1cblxuZnVuY3Rpb24gbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQoZXhjZWxfaW5kZXg6IHN0cmluZywgc2hlZXQ6IGFueVtdW10pIHtcbiAgICBjb25zdCBbcm93LCBjb2xdID0gc3BsaXRfdG9fcm93X2NvbChleGNlbF9pbmRleCk7XG4gICAgaWYgKHJvdyA+PSBzaGVldC5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIHNoZWV0W3Jvd11bY29sXTtcbn1cblxuZnVuY3Rpb24gZXhjZWxfcm93X3RvX2luZGV4KGxldHRlcnM6IHN0cmluZyk6bnVtYmVyIHtcbiAgICBjb25zdCBsb3dlckxldHRlcnMgPSBsZXR0ZXJzLnRvTG93ZXJDYXNlKCk7XG4gICAgbGV0IHJlc3VsdDogbnVtYmVyID0gMDtcbiAgICBmb3IgKHZhciBwID0gMDsgcCA8IGxvd2VyTGV0dGVycy5sZW5ndGg7IHArKykge1xuICAgICAgICBjb25zdCBjaGFyYWN0ZXJWYWx1ZSA9XG4gICAgICAgICAgICBsb3dlckxldHRlcnMuY2hhckNvZGVBdChwKSAtIFwiYVwiLmNoYXJDb2RlQXQoMCkgKyAxO1xuICAgICAgICByZXN1bHQgPSBjaGFyYWN0ZXJWYWx1ZSArIHJlc3VsdCAqIDI2O1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0IC0gMTtcbn1cblxuZnVuY3Rpb24gc2FuaXRpemVfcGhvbmVfbnVtYmVyKG51bWJlcjogbnVtYmVyIHwgc3RyaW5nKSB7XG4gICAgbGV0IG5ld19udW1iZXIgPSBudW1iZXIudG9TdHJpbmcoKTtcbiAgICBuZXdfbnVtYmVyID0gbmV3X251bWJlci5yZXBsYWNlKFwid2hhdHNhcHA6XCIsIFwiXCIpO1xuICAgIGxldCB0ZW1wb3JhcnlfbmV3X251bWJlcjogc3RyaW5nID0gXCJcIjtcbiAgICB3aGlsZSh0ZW1wb3JhcnlfbmV3X251bWJlciAhPSBuZXdfbnVtYmVyKXtcbiAgICAgICAgLy8gRG8gdGhpcyBtdWx0aXBsZSB0aW1lcyBzbyB3ZSBnZXQgYWxsICsxIGF0IHRoZSBzdGFydCBvZiB0aGUgc3RyaW5nLCBldmVuIGFmdGVyIHN0cmlwcGluZy5cbiAgICAgICAgdGVtcG9yYXJ5X25ld19udW1iZXIgPSBuZXdfbnVtYmVyO1xuICAgICAgICBuZXdfbnVtYmVyID0gbmV3X251bWJlci5yZXBsYWNlKC8oXlxcKzF8XFwofFxcKXxcXC58LSkvZywgXCJcIik7XG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdCA9IFN0cmluZyhwYXJzZUludChuZXdfbnVtYmVyKSkucGFkU3RhcnQoMTAsXCIwXCIpO1xuICAgIGlmIChyZXN1bHQubGVuZ3RoID09IDExICYmIHJlc3VsdFswXSA9PSBcIjFcIil7XG4gICAgICAgIHJldHVybiByZXN1bHQuc3Vic3RyaW5nKDEpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cbmV4cG9ydCB7XG4gICAgcm93X2NvbF90b19leGNlbF9pbmRleCxcbiAgICBleGNlbF9yb3dfdG9faW5kZXgsXG4gICAgc2FuaXRpemVfcGhvbmVfbnVtYmVyLFxuICAgIHNwbGl0X3RvX3Jvd19jb2wsXG4gICAgbG9va3VwX3Jvd19jb2xfaW5fc2hlZXQsXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJnb29nbGVhcGlzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9oYW5kbGVycy9jb21wbGV0ZS11c2VyLWF1dGgudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=