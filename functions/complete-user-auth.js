/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@twilio-labs/serverless-runtime-types/index.js"
/*!*********************************************************************!*\
  !*** ./node_modules/@twilio-labs/serverless-runtime-types/index.js ***!
  \*********************************************************************/
() {

// Intentionally left empty


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
/*!********************************************!*\
  !*** ./src/handlers/complete-user-auth.ts ***!
  \********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handler: () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _user_creds__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../user-creds */ "./src/user-creds.ts");

/**
 * Twilio Serverless function handler for completing user authentication.
 * @param {Context<HandlerEnvironment>} context - The Twilio serverless context.
 * @param {ServerlessEventObject<HandlerEvent>} event - The event object containing state and code.
 * @param {ServerlessCallback} callback - The callback function.
 */ const handler = async function(context, event, callback) {
    console.log(`Handling auth completion: ${JSON.stringify(event)}`);
    const state = event.state;
    if (state === undefined) {
        throw new Error("Missing nonce");
    }
    const twilioSync = context.getTwilioClient().sync.v1.services(context.SYNC_SID);
    let doc;
    try {
        console.log(`Looking for state ${state}...`);
        doc = await twilioSync.documents(state).fetch();
    } catch (e) {
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
    const user_creds = new _user_creds__WEBPACK_IMPORTED_MODULE_0__["default"](twilioSync, number, context);
    if (await user_creds.loadToken()) {
        callback(null, "already_valid");
        return;
    }
    const code = event.code;
    const scopes = doc.data.scopes;
    try {
        await twilioSync.documents(doc.sid).remove();
        console.log(`Deleted nonce ${doc.uniqueName}`);
    } catch (e) {
        callback(null, `Failed to delete nonce: ${e}`);
        return;
    }
    try {
        await user_creds.completeLogin(code, scopes);
    } catch (e) {
        if (e instanceof Error || e instanceof String) {
            callback(e);
        } else {
            callback("Failed to complete user auth");
        }
        return;
    }
    callback(null, "Please return to your messaging app and engage BVNSP bot again.");
};

})();

exports.handler = __webpack_exports__.handler;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxDQUFDLGNBQWMsRUFBRTZCLElBQUlMLFVBQVUsRUFBRTtJQUNqRCxFQUFFLE9BQU9mLEdBQUc7UUFDUm9GLFNBQVMsTUFBTSxDQUFDLHdCQUF3QixFQUFFcEYsR0FBRztRQUM3QztJQUNKO0lBRUEsSUFBSTtRQUNBLE1BQU00RixXQUFXeEYsYUFBYSxDQUFDQyxNQUFNUDtJQUN6QyxFQUFFLE9BQU9FLEdBQUc7UUFDUixJQUFJQSxhQUFhcEIsU0FBU29CLGFBQWFxRCxRQUFRO1lBQzNDK0IsU0FBU3BGO1FBQ2IsT0FBTztZQUNIb0YsU0FBUztRQUNiO1FBQ0E7SUFDSjtJQUNBQSxTQUNJLE1BQ0E7QUFFUixFQUFFIiwic291cmNlcyI6WyIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL25vZGVfbW9kdWxlcy9AdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzL2luZGV4LmpzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXNlci1jcmVkcy50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3V0aWxzL2ZpbGVfdXRpbHMudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91dGlscy9zY29wZV91dGlsLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvdXRpbC50cyIsImV4dGVybmFsIGNvbW1vbmpzIFwiZ29vZ2xlYXBpc1wiIiwiZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImZzXCIiLCJ3ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy9oYW5kbGVycy9jb21wbGV0ZS11c2VyLWF1dGgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gSW50ZW50aW9uYWxseSBsZWZ0IGVtcHR5XG4iLCJpbXBvcnQge2dvb2dsZX0gZnJvbSBcImdvb2dsZWFwaXNcIjtcbmltcG9ydCB7R2VuZXJhdGVBdXRoVXJsT3B0c30gZnJvbSBcImdvb2dsZS1hdXRoLWxpYnJhcnlcIjtcbmltcG9ydCB7T0F1dGgyQ2xpZW50fSBmcm9tIFwiZ29vZ2xlYXBpcy1jb21tb25cIjtcbmltcG9ydCB7c2FuaXRpemVfcGhvbmVfbnVtYmVyfSBmcm9tIFwiLi91dGlscy91dGlsXCI7XG5pbXBvcnQge2xvYWRfY3JlZGVudGlhbHNfZmlsZXN9IGZyb20gXCIuL3V0aWxzL2ZpbGVfdXRpbHNcIjtcbmltcG9ydCB7U2VydmljZUNvbnRleHR9IGZyb20gXCJAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzL3R5cGVzXCI7XG5pbXBvcnQge1VzZXJDcmVkc0NvbmZpZ30gZnJvbSBcIi4vZW52L2hhbmRsZXJfY29uZmlnXCI7XG5pbXBvcnQge3ZhbGlkYXRlX3Njb3Blc30gZnJvbSBcIi4vdXRpbHMvc2NvcGVfdXRpbFwiO1xuXG5jb25zdCBTQ09QRVMgPSBbXG4gICAgXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3NjcmlwdC5wcm9qZWN0c1wiLFxuICAgIFwiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9zcHJlYWRzaGVldHNcIixcbl07XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIHVzZXIgY3JlZGVudGlhbHMgZm9yIEdvb2dsZSBPQXV0aDIuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXJDcmVkcyB7XG4gICAgbnVtYmVyOiBzdHJpbmc7XG4gICAgb2F1dGgyX2NsaWVudDogT0F1dGgyQ2xpZW50O1xuICAgIHN5bmNfY2xpZW50OiBTZXJ2aWNlQ29udGV4dDtcbiAgICBkb21haW4/OiBzdHJpbmc7XG4gICAgbG9hZGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBVc2VyQ3JlZHMgaW5zdGFuY2UuXG4gICAgICogQHBhcmFtIHtTZXJ2aWNlQ29udGV4dH0gc3luY19jbGllbnQgLSBUaGUgVHdpbGlvIFN5bmMgY2xpZW50LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgdW5kZWZpbmVkfSBudW1iZXIgLSBUaGUgdXNlcidzIHBob25lIG51bWJlci5cbiAgICAgKiBAcGFyYW0ge1VzZXJDcmVkc0NvbmZpZ30gb3B0cyAtIFRoZSB1c2VyIGNyZWRlbnRpYWxzIGNvbmZpZ3VyYXRpb24uXG4gICAgICogQHRocm93cyB7RXJyb3J9IFRocm93cyBhbiBlcnJvciBpZiB0aGUgbnVtYmVyIGlzIHVuZGVmaW5lZCBvciBudWxsLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBzeW5jX2NsaWVudDogU2VydmljZUNvbnRleHQsXG4gICAgICAgIG51bWJlcjogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgICAgICBvcHRzOiBVc2VyQ3JlZHNDb25maWdcbiAgICApIHtcbiAgICAgICAgaWYgKG51bWJlciA9PT0gdW5kZWZpbmVkIHx8IG51bWJlciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTnVtYmVyIGlzIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm51bWJlciA9IHNhbml0aXplX3Bob25lX251bWJlcihudW1iZXIpO1xuXG4gICAgICAgIGNvbnN0IGNyZWRlbnRpYWxzID0gbG9hZF9jcmVkZW50aWFsc19maWxlcygpO1xuICAgICAgICBjb25zdCB7IGNsaWVudF9zZWNyZXQsIGNsaWVudF9pZCwgcmVkaXJlY3RfdXJpcyB9ID0gY3JlZGVudGlhbHMud2ViO1xuICAgICAgICB0aGlzLm9hdXRoMl9jbGllbnQgPSBuZXcgZ29vZ2xlLmF1dGguT0F1dGgyKFxuICAgICAgICAgICAgY2xpZW50X2lkLFxuICAgICAgICAgICAgY2xpZW50X3NlY3JldCxcbiAgICAgICAgICAgIHJlZGlyZWN0X3VyaXNbMF1cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zeW5jX2NsaWVudCA9IHN5bmNfY2xpZW50O1xuICAgICAgICBsZXQgZG9tYWluID0gb3B0cy5OU1BfRU1BSUxfRE9NQUlOO1xuICAgICAgICBpZiAoZG9tYWluID09PSB1bmRlZmluZWQgfHwgZG9tYWluID09PSBudWxsIHx8IGRvbWFpbiA9PT0gXCJcIikge1xuICAgICAgICAgICAgZG9tYWluID0gdW5kZWZpbmVkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kb21haW4gPSBkb21haW47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2FkIHRoZSBPQXV0aDIgdG9rZW4uXG4gICAgICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgYm9vbGVhbiBpbmRpY2F0aW5nIGlmIHRoZSB0b2tlbiB3YXMgbG9hZGVkLlxuICAgICAqL1xuICAgIGFzeW5jIGxvYWRUb2tlbigpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgaWYgKCF0aGlzLmxvYWRlZCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgTG9va2luZyBmb3IgJHt0aGlzLnRva2VuX2tleX1gKTtcbiAgICAgICAgICAgICAgICBjb25zdCBvYXV0aDJEb2MgPSBhd2FpdCB0aGlzLnN5bmNfY2xpZW50XG4gICAgICAgICAgICAgICAgICAgIC5kb2N1bWVudHModGhpcy50b2tlbl9rZXkpXG4gICAgICAgICAgICAgICAgICAgIC5mZXRjaCgpO1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgb2F1dGgyRG9jID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICAgICAgb2F1dGgyRG9jLmRhdGEgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgICAgIG9hdXRoMkRvYy5kYXRhLnRva2VuID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYERpZG4ndCBmaW5kICR7dGhpcy50b2tlbl9rZXl9YCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBvYXV0aDJEb2MuZGF0YS50b2tlbjtcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGVfc2NvcGVzKG9hdXRoMkRvYy5kYXRhLnNjb3BlcywgU0NPUEVTKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vYXV0aDJfY2xpZW50LnNldENyZWRlbnRpYWxzKHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYExvYWRlZCB0b2tlbiAke3RoaXMudG9rZW5fa2V5fWApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgICAgICBgRmFpbGVkIHRvIGxvYWQgdG9rZW4gZm9yICR7dGhpcy50b2tlbl9rZXl9LlxcbiAke2V9YFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZGVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdG9rZW4ga2V5LlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSB0b2tlbiBrZXkuXG4gICAgICovXG4gICAgZ2V0IHRva2VuX2tleSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYG9hdXRoMl8ke3RoaXMubnVtYmVyfWA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVsZXRlIHRoZSBPQXV0aDIgdG9rZW4uXG4gICAgICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgYm9vbGVhbiBpbmRpY2F0aW5nIGlmIHRoZSB0b2tlbiB3YXMgZGVsZXRlZC5cbiAgICAgKi9cbiAgICBhc3luYyBkZWxldGVUb2tlbigpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgY29uc3Qgb2F1dGgyRG9jID0gYXdhaXQgdGhpcy5zeW5jX2NsaWVudFxuICAgICAgICAgICAgLmRvY3VtZW50cyh0aGlzLnRva2VuX2tleSlcbiAgICAgICAgICAgIC5mZXRjaCgpO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICBvYXV0aDJEb2MgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgb2F1dGgyRG9jLmRhdGEgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICBvYXV0aDJEb2MuZGF0YS50b2tlbiA9PT0gdW5kZWZpbmVkXG4gICAgICAgICkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYERpZG4ndCBmaW5kICR7dGhpcy50b2tlbl9rZXl9YCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgdGhpcy5zeW5jX2NsaWVudC5kb2N1bWVudHMob2F1dGgyRG9jLnNpZCkucmVtb3ZlKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBEZWxldGVkIHRva2VuICR7dGhpcy50b2tlbl9rZXl9YCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbXBsZXRlIHRoZSBsb2dpbiBwcm9jZXNzIGJ5IGV4Y2hhbmdpbmcgdGhlIGF1dGhvcml6YXRpb24gY29kZSBmb3IgYSB0b2tlbi5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29kZSAtIFRoZSBhdXRob3JpemF0aW9uIGNvZGUuXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gc2NvcGVzIC0gVGhlIHNjb3BlcyB0byB2YWxpZGF0ZS5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgbG9naW4gcHJvY2VzcyBpcyBjb21wbGV0ZS5cbiAgICAgKi9cbiAgICBhc3luYyBjb21wbGV0ZUxvZ2luKGNvZGU6IHN0cmluZywgc2NvcGVzOiBzdHJpbmdbXSk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICB2YWxpZGF0ZV9zY29wZXMoc2NvcGVzLCBTQ09QRVMpO1xuICAgICAgICBjb25zdCB0b2tlbiA9IGF3YWl0IHRoaXMub2F1dGgyX2NsaWVudC5nZXRUb2tlbihjb2RlKTtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoT2JqZWN0LmtleXModG9rZW4ucmVzISkpKTtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodG9rZW4udG9rZW5zKSk7XG4gICAgICAgIHRoaXMub2F1dGgyX2NsaWVudC5zZXRDcmVkZW50aWFscyh0b2tlbi50b2tlbnMpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3Qgb2F1dGhEb2MgPSBhd2FpdCB0aGlzLnN5bmNfY2xpZW50LmRvY3VtZW50cy5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6IHsgdG9rZW46IHRva2VuLnRva2Vucywgc2NvcGVzOiBzY29wZXMgfSxcbiAgICAgICAgICAgICAgICB1bmlxdWVOYW1lOiB0aGlzLnRva2VuX2tleSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICBgRXhjZXB0aW9uIHdoZW4gY3JlYXRpbmcgb2F1dGguIFRyeWluZyB0byB1cGRhdGUgaW5zdGVhZC4uLlxcbiR7ZX1gXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29uc3Qgb2F1dGhEb2MgPSBhd2FpdCB0aGlzLnN5bmNfY2xpZW50XG4gICAgICAgICAgICAgICAgLmRvY3VtZW50cyh0aGlzLnRva2VuX2tleSlcbiAgICAgICAgICAgICAgICAudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogeyB0b2tlbjogdG9rZW4sIHNjb3Blczogc2NvcGVzIH0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGF1dGhvcml6YXRpb24gVVJMLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHN0cmluZz59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSBhdXRob3JpemF0aW9uIFVSTC5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRBdXRoVXJsKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIGNvbnN0IGlkID0gdGhpcy5nZW5lcmF0ZVJhbmRvbVN0cmluZygpO1xuICAgICAgICBjb25zb2xlLmxvZyhgVXNpbmcgbm9uY2UgJHtpZH0gZm9yICR7dGhpcy5udW1iZXJ9YCk7XG4gICAgICAgIGNvbnN0IGRvYyA9IGF3YWl0IHRoaXMuc3luY19jbGllbnQuZG9jdW1lbnRzLmNyZWF0ZSh7XG4gICAgICAgICAgICBkYXRhOiB7IG51bWJlcjogdGhpcy5udW1iZXIsIHNjb3BlczogU0NPUEVTIH0sXG4gICAgICAgICAgICB1bmlxdWVOYW1lOiBpZCxcbiAgICAgICAgICAgIHR0bDogNjAgKiA1LCAvLyA1IG1pbnV0ZXNcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBNYWRlIG5vbmNlLWRvYzogJHtKU09OLnN0cmluZ2lmeShkb2MpfWApO1xuXG4gICAgICAgIGNvbnN0IG9wdHM6IEdlbmVyYXRlQXV0aFVybE9wdHMgPSB7XG4gICAgICAgICAgICBhY2Nlc3NfdHlwZTogXCJvZmZsaW5lXCIsXG4gICAgICAgICAgICBzY29wZTogU0NPUEVTLFxuICAgICAgICAgICAgc3RhdGU6IGlkLFxuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5kb21haW4pIHtcbiAgICAgICAgICAgIG9wdHNbXCJoZFwiXSA9IHRoaXMuZG9tYWluO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMub2F1dGgyX2NsaWVudC5nZW5lcmF0ZUF1dGhVcmwob3B0cyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2VuZXJhdGUgYSByYW5kb20gc3RyaW5nLlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IEEgcmFuZG9tIHN0cmluZy5cbiAgICAgKi9cbiAgICBnZW5lcmF0ZVJhbmRvbVN0cmluZygpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBsZW5ndGggPSAzMDtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFwiXCI7XG4gICAgICAgIGNvbnN0IGNoYXJhY3RlcnMgPVxuICAgICAgICAgICAgXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OVwiO1xuICAgICAgICBjb25zdCBjaGFyYWN0ZXJzTGVuZ3RoID0gY2hhcmFjdGVycy5sZW5ndGg7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSBjaGFyYWN0ZXJzLmNoYXJBdChcbiAgICAgICAgICAgICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFyYWN0ZXJzTGVuZ3RoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cblxuLyoqXG4gKiBJbnRlcmZhY2UgcmVwcmVzZW50aW5nIHRoZSB1c2VyIGNyZWRlbnRpYWxzIGNvbmZpZ3VyYXRpb24uXG4gKi9cbmV4cG9ydCB7IFVzZXJDcmVkcyB9O1xuIiwiaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgJ0B0d2lsaW8tbGFicy9zZXJ2ZXJsZXNzLXJ1bnRpbWUtdHlwZXMnO1xuXG4vKipcbiAqIExvYWQgY3JlZGVudGlhbHMgZnJvbSBhIEpTT04gZmlsZS5cbiAqIEByZXR1cm5zIHthbnl9IFRoZSBwYXJzZWQgY3JlZGVudGlhbHMgZnJvbSB0aGUgSlNPTiBmaWxlLlxuICovXG5mdW5jdGlvbiBsb2FkX2NyZWRlbnRpYWxzX2ZpbGVzKCk6IGFueSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoXG4gICAgICAgIGZzXG4gICAgICAgICAgICAucmVhZEZpbGVTeW5jKFJ1bnRpbWUuZ2V0QXNzZXRzKClbXCIvY3JlZGVudGlhbHMuanNvblwiXS5wYXRoKVxuICAgICAgICAgICAgLnRvU3RyaW5nKClcbiAgICApO1xufVxuXG4vKipcbiAqIEdldCB0aGUgcGF0aCB0byB0aGUgc2VydmljZSBjcmVkZW50aWFscyBmaWxlLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIHBhdGggdG8gdGhlIHNlcnZpY2UgY3JlZGVudGlhbHMgZmlsZS5cbiAqL1xuZnVuY3Rpb24gZ2V0X3NlcnZpY2VfY3JlZGVudGlhbHNfcGF0aCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBSdW50aW1lLmdldEFzc2V0cygpW1wiL3NlcnZpY2UtY3JlZGVudGlhbHMuanNvblwiXS5wYXRoO1xufVxuXG5leHBvcnQgeyBsb2FkX2NyZWRlbnRpYWxzX2ZpbGVzLCBnZXRfc2VydmljZV9jcmVkZW50aWFsc19wYXRoIH07IiwiLyoqXG4gKiBWYWxpZGF0ZXMgaWYgdGhlIHByb3ZpZGVkIHNjb3BlcyBpbmNsdWRlIGFsbCBkZXNpcmVkIHNjb3Blcy5cbiAqIEBwYXJhbSB7c3RyaW5nW119IHNjb3BlcyAtIFRoZSBsaXN0IG9mIHNjb3BlcyB0byB2YWxpZGF0ZS5cbiAqIEBwYXJhbSB7c3RyaW5nW119IGRlc2lyZWRfc2NvcGVzIC0gVGhlIGxpc3Qgb2YgZGVzaXJlZCBzY29wZXMuXG4gKiBAdGhyb3dzIHtFcnJvcn0gVGhyb3dzIGFuIGVycm9yIGlmIGFueSBkZXNpcmVkIHNjb3BlIGlzIG1pc3NpbmcuXG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlX3Njb3BlcyhzY29wZXM6IHN0cmluZ1tdLCBkZXNpcmVkX3Njb3Blczogc3RyaW5nW10pIHtcbiAgICBmb3IgKGNvbnN0IGRlc2lyZWRfc2NvcGUgb2YgZGVzaXJlZF9zY29wZXMpIHtcbiAgICAgICAgaWYgKHNjb3BlcyA9PT0gdW5kZWZpbmVkIHx8ICFzY29wZXMuaW5jbHVkZXMoZGVzaXJlZF9zY29wZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gYE1pc3Npbmcgc2NvcGUgJHtkZXNpcmVkX3Njb3BlfSBpbiByZWNlaXZlZCBzY29wZXM6ICR7c2NvcGVzfWA7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IHt2YWxpZGF0ZV9zY29wZXN9IiwiLyoqXG4gKiBDb252ZXJ0IHJvdyBhbmQgY29sdW1uIG51bWJlcnMgdG8gYW4gRXhjZWwtbGlrZSBpbmRleC5cbiAqIEBwYXJhbSB7bnVtYmVyfSByb3cgLSBUaGUgcm93IG51bWJlciAoMC1iYXNlZCkuXG4gKiBAcGFyYW0ge251bWJlcn0gY29sIC0gVGhlIGNvbHVtbiBudW1iZXIgKDAtYmFzZWQpLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIEV4Y2VsLWxpa2UgaW5kZXggKGUuZy4sIFwiQTFcIikuXG4gKi9cbmZ1bmN0aW9uIHJvd19jb2xfdG9fZXhjZWxfaW5kZXgocm93OiBudW1iZXIsIGNvbDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBsZXQgY29sU3RyaW5nID0gXCJcIjtcbiAgICBjb2wgKz0gMTtcbiAgICB3aGlsZSAoY29sID4gMCkge1xuICAgICAgICBjb2wgLT0gMTtcbiAgICAgICAgY29uc3QgbW9kdWxvID0gY29sICUgMjY7XG4gICAgICAgIGNvbnN0IGNvbExldHRlciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoJ0EnLmNoYXJDb2RlQXQoMCkgKyBtb2R1bG8pO1xuICAgICAgICBjb2xTdHJpbmcgPSBjb2xMZXR0ZXIgKyBjb2xTdHJpbmc7XG4gICAgICAgIGNvbCA9IE1hdGguZmxvb3IoY29sIC8gMjYpO1xuICAgIH1cbiAgICByZXR1cm4gY29sU3RyaW5nICsgKHJvdyArIDEpLnRvU3RyaW5nKCk7XG59XG5cbi8qKlxuICogU3BsaXQgYW4gRXhjZWwtbGlrZSBpbmRleCBpbnRvIHJvdyBhbmQgY29sdW1uIG51bWJlcnMuXG4gKiBAcGFyYW0ge3N0cmluZ30gZXhjZWxfaW5kZXggLSBUaGUgRXhjZWwtbGlrZSBpbmRleCAoZS5nLiwgXCJBMVwiKS5cbiAqIEByZXR1cm5zIHtbbnVtYmVyLCBudW1iZXJdfSBBbiBhcnJheSBjb250YWluaW5nIHRoZSByb3cgYW5kIGNvbHVtbiBudW1iZXJzICgwLWJhc2VkKS5cbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgaW5kZXggY2Fubm90IGJlIHBhcnNlZC5cbiAqL1xuZnVuY3Rpb24gc3BsaXRfdG9fcm93X2NvbChleGNlbF9pbmRleDogc3RyaW5nKTogW251bWJlciwgbnVtYmVyXSB7XG4gICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKFwiXihbQS1aYS16XSspKFswLTldKykkXCIpO1xuICAgIGNvbnN0IG1hdGNoID0gcmVnZXguZXhlYyhleGNlbF9pbmRleCk7XG4gICAgaWYgKG1hdGNoID09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIHBhcnNlIHN0cmluZyBmb3IgZXhjZWwgcG9zaXRpb24gc3BsaXRcIik7XG4gICAgfVxuICAgIGNvbnN0IGNvbCA9IGV4Y2VsX3Jvd190b19pbmRleChtYXRjaFsxXSk7XG4gICAgY29uc3QgcmF3X3JvdyA9IE51bWJlcihtYXRjaFsyXSk7XG4gICAgaWYgKHJhd19yb3cgPCAxKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlJvdyBtdXN0IGJlID49MVwiKTtcbiAgICB9XG4gICAgcmV0dXJuIFtyYXdfcm93IC0gMSwgY29sXTtcbn1cblxuLyoqXG4gKiBMb29rIHVwIGEgdmFsdWUgaW4gYSBzaGVldCBieSBpdHMgRXhjZWwtbGlrZSBpbmRleC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBleGNlbF9pbmRleCAtIFRoZSBFeGNlbC1saWtlIGluZGV4IChlLmcuLCBcIkExXCIpLlxuICogQHBhcmFtIHthbnlbXVtdfSBzaGVldCAtIFRoZSBzaGVldCBkYXRhLlxuICogQHJldHVybnMge2FueX0gVGhlIHZhbHVlIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXgsIG9yIHVuZGVmaW5lZCBpZiBub3QgZm91bmQuXG4gKi9cbmZ1bmN0aW9uIGxvb2t1cF9yb3dfY29sX2luX3NoZWV0KGV4Y2VsX2luZGV4OiBzdHJpbmcsIHNoZWV0OiBhbnlbXVtdKTogYW55IHtcbiAgICBjb25zdCBbcm93LCBjb2xdID0gc3BsaXRfdG9fcm93X2NvbChleGNlbF9pbmRleCk7XG4gICAgaWYgKHJvdyA+PSBzaGVldC5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIHNoZWV0W3Jvd11bY29sXTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0IEV4Y2VsLWxpa2UgY29sdW1uIGxldHRlcnMgdG8gYSBjb2x1bW4gbnVtYmVyLlxuICogQHBhcmFtIHtzdHJpbmd9IGxldHRlcnMgLSBUaGUgY29sdW1uIGxldHRlcnMgKGUuZy4sIFwiQVwiKS5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBjb2x1bW4gbnVtYmVyICgwLWJhc2VkKS5cbiAqL1xuZnVuY3Rpb24gZXhjZWxfcm93X3RvX2luZGV4KGxldHRlcnM6IHN0cmluZyk6IG51bWJlciB7XG4gICAgY29uc3QgbG93ZXJMZXR0ZXJzID0gbGV0dGVycy50b0xvd2VyQ2FzZSgpO1xuICAgIGxldCByZXN1bHQ6IG51bWJlciA9IDA7XG4gICAgZm9yIChsZXQgcCA9IDA7IHAgPCBsb3dlckxldHRlcnMubGVuZ3RoOyBwKyspIHtcbiAgICAgICAgY29uc3QgY2hhcmFjdGVyVmFsdWUgPVxuICAgICAgICAgICAgbG93ZXJMZXR0ZXJzLmNoYXJDb2RlQXQocCkgLSBcImFcIi5jaGFyQ29kZUF0KDApICsgMTtcbiAgICAgICAgcmVzdWx0ID0gY2hhcmFjdGVyVmFsdWUgKyByZXN1bHQgKiAyNjtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdCAtIDE7XG59XG5cbi8qKlxuICogUGFyc2UgYSBHb29nbGUgU2hlZXRzIGNoZWNrYm94L2Jvb2xlYW4gY2VsbCB2YWx1ZSBhcyBhIGJvb2xlYW4uXG4gKiBBY2NlcHRzIEpTIGJvb2xlYW4gdHJ1ZS9mYWxzZSBhbmQgc3RyaW5nIGxpdGVyYWxzIFwiVFJVRVwiL1wiRkFMU0VcIlxuICogKGNhc2UtaW5zZW5zaXRpdmUpIGZyb20gU2hlZXRzLCAgZGVwZW5kaW5nIG9uIHRoZSBjZWxsIGZvcm1hdHRpbmcuXG4gKiBBbnkgdmFsdWUgdGhhdCBjYW5ub3QgYmUgcmVjb2duaXplZCBhcyB0cnVlIGlzIGNvbnNpZGVyZWQgZmFsc2UuXG4gKiBAcGFyYW0ge2FueX0gdmFsdWUgLSBSYXcgY2VsbCB2YWx1ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIG9ubHkgd2hlbiB2YWx1ZSBpcyB0cnVlIG9yIFwiVFJVRVwiIChjYXNlLWluc2Vuc2l0aXZlKS5cbiAqL1xuZnVuY3Rpb24gcGFyc2VfYm9vbGVhbl9jZWxsKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICBpZiAodmFsdWUgPT09IHRydWUpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgdmFsdWUudG9VcHBlckNhc2UoKSA9PT0gXCJUUlVFXCI7XG59XG5cbi8qKlxuICogU2FuaXRpemUgYSBwaG9uZSBudW1iZXIgYnkgcmVtb3ZpbmcgdW53YW50ZWQgY2hhcmFjdGVycy5cbiAqIEBwYXJhbSB7bnVtYmVyIHwgc3RyaW5nfSBudW1iZXIgLSBUaGUgcGhvbmUgbnVtYmVyIHRvIHNhbml0aXplLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIHNhbml0aXplZCBwaG9uZSBudW1iZXIuXG4gKi9cbmZ1bmN0aW9uIHNhbml0aXplX3Bob25lX251bWJlcihudW1iZXI6IG51bWJlciB8IHN0cmluZyk6IHN0cmluZyB7XG4gICAgbGV0IG5ld19udW1iZXIgPSBudW1iZXIudG9TdHJpbmcoKTtcbiAgICBuZXdfbnVtYmVyID0gbmV3X251bWJlci5yZXBsYWNlKFwid2hhdHNhcHA6XCIsIFwiXCIpO1xuICAgIGxldCB0ZW1wb3JhcnlfbmV3X251bWJlcjogc3RyaW5nID0gXCJcIjtcbiAgICB3aGlsZSAodGVtcG9yYXJ5X25ld19udW1iZXIgIT0gbmV3X251bWJlcikge1xuICAgICAgICAvLyBEbyB0aGlzIG11bHRpcGxlIHRpbWVzIHNvIHdlIGdldCBhbGwgKzEgYXQgdGhlIHN0YXJ0IG9mIHRoZSBzdHJpbmcsIGV2ZW4gYWZ0ZXIgc3RyaXBwaW5nLlxuICAgICAgICB0ZW1wb3JhcnlfbmV3X251bWJlciA9IG5ld19udW1iZXI7XG4gICAgICAgIG5ld19udW1iZXIgPSBuZXdfbnVtYmVyLnJlcGxhY2UoLyheXFwrMXxcXCh8XFwpfFxcLnwtKS9nLCBcIlwiKTtcbiAgICB9XG4gICAgY29uc3QgcmVzdWx0ID0gU3RyaW5nKHBhcnNlSW50KG5ld19udW1iZXIpKS5wYWRTdGFydCgxMCwgXCIwXCIpO1xuICAgIGlmIChyZXN1bHQubGVuZ3RoID09IDExICYmIHJlc3VsdFswXSA9PSBcIjFcIikge1xuICAgICAgICByZXR1cm4gcmVzdWx0LnN1YnN0cmluZygxKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IHtcbiAgICByb3dfY29sX3RvX2V4Y2VsX2luZGV4LFxuICAgIGV4Y2VsX3Jvd190b19pbmRleCxcbiAgICBzYW5pdGl6ZV9waG9uZV9udW1iZXIsXG4gICAgc3BsaXRfdG9fcm93X2NvbCxcbiAgICBsb29rdXBfcm93X2NvbF9pbl9zaGVldCxcbiAgICBwYXJzZV9ib29sZWFuX2NlbGwsXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZ29vZ2xlYXBpc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG5jb25zdCBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGNvbnN0IGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHRjb25zdCBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0Y29uc3QgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdGNvbnN0IGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyL3ZhbHVlIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRpZihBcnJheS5pc0FycmF5KGRlZmluaXRpb24pKSB7XG5cdFx0dmFyIGkgPSAwO1xuXHRcdHdoaWxlKGkgPCBkZWZpbml0aW9uLmxlbmd0aCkge1xuXHRcdFx0dmFyIGtleSA9IGRlZmluaXRpb25baSsrXTtcblx0XHRcdHZhciBiaW5kaW5nID0gZGVmaW5pdGlvbltpKytdO1xuXHRcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRcdGlmKGJpbmRpbmcgPT09IDApIHtcblx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiBkZWZpbml0aW9uW2krK10gfSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGJpbmRpbmcgfSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZihiaW5kaW5nID09PSAwKSB7IGkrKzsgfVxuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7XG4gICAgQ29udGV4dCxcbiAgICBTZXJ2ZXJsZXNzQ2FsbGJhY2ssXG4gICAgU2VydmVybGVzc0V2ZW50T2JqZWN0LFxuICAgIFNlcnZlcmxlc3NGdW5jdGlvblNpZ25hdHVyZSxcbn0gZnJvbSBcIkB0d2lsaW8tbGFicy9zZXJ2ZXJsZXNzLXJ1bnRpbWUtdHlwZXMvdHlwZXNcIjtcbmltcG9ydCBVc2VyQ3JlZHMgZnJvbSBcIi4uL3VzZXItY3JlZHNcIjtcblxudHlwZSBIYW5kbGVyRXZlbnQgPSBTZXJ2ZXJsZXNzRXZlbnRPYmplY3Q8XG4gICAge1xuICAgICAgICBzdGF0ZTogc3RyaW5nO1xuICAgICAgICBjb2RlOiBzdHJpbmc7XG4gICAgfVxuPjtcbnR5cGUgSGFuZGxlckVudmlyb25tZW50ID0ge1xuICAgIFNZTkNfU0lEOiBzdHJpbmc7XG4gICAgTlNQX0VNQUlMX0RPTUFJTjogc3RyaW5nO1xufTtcblxuLyoqXG4gKiBUd2lsaW8gU2VydmVybGVzcyBmdW5jdGlvbiBoYW5kbGVyIGZvciBjb21wbGV0aW5nIHVzZXIgYXV0aGVudGljYXRpb24uXG4gKiBAcGFyYW0ge0NvbnRleHQ8SGFuZGxlckVudmlyb25tZW50Pn0gY29udGV4dCAtIFRoZSBUd2lsaW8gc2VydmVybGVzcyBjb250ZXh0LlxuICogQHBhcmFtIHtTZXJ2ZXJsZXNzRXZlbnRPYmplY3Q8SGFuZGxlckV2ZW50Pn0gZXZlbnQgLSBUaGUgZXZlbnQgb2JqZWN0IGNvbnRhaW5pbmcgc3RhdGUgYW5kIGNvZGUuXG4gKiBAcGFyYW0ge1NlcnZlcmxlc3NDYWxsYmFja30gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBjb25zdCBoYW5kbGVyOiBTZXJ2ZXJsZXNzRnVuY3Rpb25TaWduYXR1cmU8XG4gICAgSGFuZGxlckVudmlyb25tZW50LFxuICAgIEhhbmRsZXJFdmVudFxuPiA9IGFzeW5jIGZ1bmN0aW9uIChcbiAgICBjb250ZXh0OiBDb250ZXh0PEhhbmRsZXJFbnZpcm9ubWVudD4sXG4gICAgZXZlbnQ6IFNlcnZlcmxlc3NFdmVudE9iamVjdDxIYW5kbGVyRXZlbnQ+LFxuICAgIGNhbGxiYWNrOiBTZXJ2ZXJsZXNzQ2FsbGJhY2tcbikge1xuICAgIGNvbnNvbGUubG9nKGBIYW5kbGluZyBhdXRoIGNvbXBsZXRpb246ICR7SlNPTi5zdHJpbmdpZnkoZXZlbnQpfWApO1xuXG4gICAgY29uc3Qgc3RhdGUgPSBldmVudC5zdGF0ZTtcbiAgICBpZiAoc3RhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIG5vbmNlXCIpO1xuICAgIH1cbiAgICBjb25zdCB0d2lsaW9TeW5jID0gY29udGV4dFxuICAgICAgICAuZ2V0VHdpbGlvQ2xpZW50KClcbiAgICAgICAgLnN5bmMudjEuc2VydmljZXMoY29udGV4dC5TWU5DX1NJRCk7XG5cbiAgICBsZXQgZG9jO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBMb29raW5nIGZvciBzdGF0ZSAke3N0YXRlfS4uLmApO1xuICAgICAgICBkb2MgPSBhd2FpdCB0d2lsaW9TeW5jLmRvY3VtZW50cyhzdGF0ZSkuZmV0Y2goKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICBjYWxsYmFjayhgRmFpbGVkIHRvIGdldCBzdGF0ZSBkb2MuYCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGRvYy5kYXRhID09PSB1bmRlZmluZWQgfHwgaXNOYU4oZG9jLmRhdGEubnVtYmVyKSkge1xuICAgICAgICBjYWxsYmFjayhgUmVjZWl2ZWQgaW52YWxpZCBub25jZWApO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG51bWJlciA9IGRvYy5kYXRhLm51bWJlcjtcbiAgICBjb25zb2xlLmxvZyhgRm91bmQgbnVtYmVyICR7bnVtYmVyfSBmb3Igbm9uY2UgJHtzdGF0ZX1gKTtcblxuICAgIGNvbnN0IHVzZXJfY3JlZHMgPSBuZXcgVXNlckNyZWRzKHR3aWxpb1N5bmMsIG51bWJlciwgY29udGV4dCk7XG4gICAgaWYgKGF3YWl0IHVzZXJfY3JlZHMubG9hZFRva2VuKCkpIHtcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgXCJhbHJlYWR5X3ZhbGlkXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY29kZSA9IGV2ZW50LmNvZGU7XG4gICAgY29uc3Qgc2NvcGVzID0gZG9jLmRhdGEuc2NvcGVzO1xuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHR3aWxpb1N5bmMuZG9jdW1lbnRzKGRvYy5zaWQpLnJlbW92ZSgpO1xuICAgICAgICBjb25zb2xlLmxvZyhgRGVsZXRlZCBub25jZSAke2RvYy51bmlxdWVOYW1lfWApO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgYEZhaWxlZCB0byBkZWxldGUgbm9uY2U6ICR7ZX1gKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHVzZXJfY3JlZHMuY29tcGxldGVMb2dpbihjb2RlLCBzY29wZXMpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBFcnJvciB8fCBlIGluc3RhbmNlb2YgU3RyaW5nKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKFwiRmFpbGVkIHRvIGNvbXBsZXRlIHVzZXIgYXV0aFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNhbGxiYWNrKFxuICAgICAgICBudWxsLFxuICAgICAgICBcIlBsZWFzZSByZXR1cm4gdG8geW91ciBtZXNzYWdpbmcgYXBwIGFuZCBlbmdhZ2UgQlZOU1AgYm90IGFnYWluLlwiXG4gICAgKTtcbn07Il0sIm5hbWVzIjpbImdvb2dsZSIsInNhbml0aXplX3Bob25lX251bWJlciIsImxvYWRfY3JlZGVudGlhbHNfZmlsZXMiLCJ2YWxpZGF0ZV9zY29wZXMiLCJTQ09QRVMiLCJVc2VyQ3JlZHMiLCJudW1iZXIiLCJvYXV0aDJfY2xpZW50Iiwic3luY19jbGllbnQiLCJkb21haW4iLCJsb2FkZWQiLCJvcHRzIiwidW5kZWZpbmVkIiwiRXJyb3IiLCJjcmVkZW50aWFscyIsImNsaWVudF9zZWNyZXQiLCJjbGllbnRfaWQiLCJyZWRpcmVjdF91cmlzIiwid2ViIiwiYXV0aCIsIk9BdXRoMiIsIk5TUF9FTUFJTF9ET01BSU4iLCJsb2FkVG9rZW4iLCJjb25zb2xlIiwibG9nIiwidG9rZW5fa2V5Iiwib2F1dGgyRG9jIiwiZG9jdW1lbnRzIiwiZmV0Y2giLCJkYXRhIiwidG9rZW4iLCJzY29wZXMiLCJzZXRDcmVkZW50aWFscyIsImUiLCJkZWxldGVUb2tlbiIsInNpZCIsInJlbW92ZSIsImNvbXBsZXRlTG9naW4iLCJjb2RlIiwiZ2V0VG9rZW4iLCJKU09OIiwic3RyaW5naWZ5IiwiT2JqZWN0Iiwia2V5cyIsInJlcyIsInRva2VucyIsIm9hdXRoRG9jIiwiY3JlYXRlIiwidW5pcXVlTmFtZSIsInVwZGF0ZSIsImdldEF1dGhVcmwiLCJpZCIsImdlbmVyYXRlUmFuZG9tU3RyaW5nIiwiZG9jIiwidHRsIiwiYWNjZXNzX3R5cGUiLCJzY29wZSIsInN0YXRlIiwiZ2VuZXJhdGVBdXRoVXJsIiwibGVuZ3RoIiwicmVzdWx0IiwiY2hhcmFjdGVycyIsImNoYXJhY3RlcnNMZW5ndGgiLCJpIiwiY2hhckF0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiZnMiLCJwYXJzZSIsInJlYWRGaWxlU3luYyIsIlJ1bnRpbWUiLCJnZXRBc3NldHMiLCJwYXRoIiwidG9TdHJpbmciLCJnZXRfc2VydmljZV9jcmVkZW50aWFsc19wYXRoIiwiZGVzaXJlZF9zY29wZXMiLCJkZXNpcmVkX3Njb3BlIiwiaW5jbHVkZXMiLCJlcnJvciIsInJvd19jb2xfdG9fZXhjZWxfaW5kZXgiLCJyb3ciLCJjb2wiLCJjb2xTdHJpbmciLCJtb2R1bG8iLCJjb2xMZXR0ZXIiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJjaGFyQ29kZUF0Iiwic3BsaXRfdG9fcm93X2NvbCIsImV4Y2VsX2luZGV4IiwicmVnZXgiLCJSZWdFeHAiLCJtYXRjaCIsImV4ZWMiLCJleGNlbF9yb3dfdG9faW5kZXgiLCJyYXdfcm93IiwiTnVtYmVyIiwibG9va3VwX3Jvd19jb2xfaW5fc2hlZXQiLCJzaGVldCIsImxldHRlcnMiLCJsb3dlckxldHRlcnMiLCJ0b0xvd2VyQ2FzZSIsInAiLCJjaGFyYWN0ZXJWYWx1ZSIsInBhcnNlX2Jvb2xlYW5fY2VsbCIsInZhbHVlIiwidG9VcHBlckNhc2UiLCJuZXdfbnVtYmVyIiwicmVwbGFjZSIsInRlbXBvcmFyeV9uZXdfbnVtYmVyIiwicGFyc2VJbnQiLCJwYWRTdGFydCIsInN1YnN0cmluZyIsImhhbmRsZXIiLCJjb250ZXh0IiwiZXZlbnQiLCJjYWxsYmFjayIsInR3aWxpb1N5bmMiLCJnZXRUd2lsaW9DbGllbnQiLCJzeW5jIiwidjEiLCJzZXJ2aWNlcyIsIlNZTkNfU0lEIiwiaXNOYU4iLCJ1c2VyX2NyZWRzIl0sInNvdXJjZVJvb3QiOiIifQ==