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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGxldGUtdXNlci1hdXRoLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQWtDO0FBR2lCO0FBQ087QUFHUDtBQUVuRCxNQUFNSSxTQUFTO0lBQ1g7SUFDQTtDQUNIO0FBRUQ7O0NBRUMsR0FDYyxNQUFNQztJQUNqQkMsT0FBZTtJQUNmQyxjQUE0QjtJQUM1QkMsWUFBNEI7SUFDNUJDLE9BQWdCO0lBQ2hCQyxTQUFrQixNQUFNO0lBRXhCOzs7Ozs7S0FNQyxHQUNELFlBQ0lGLFdBQTJCLEVBQzNCRixNQUEwQixFQUMxQkssSUFBcUIsQ0FDdkI7UUFDRSxJQUFJTCxXQUFXTSxhQUFhTixXQUFXLE1BQU07WUFDekMsTUFBTSxJQUFJTyxNQUFNO1FBQ3BCO1FBQ0EsSUFBSSxDQUFDUCxNQUFNLEdBQUdMLGtFQUFxQkEsQ0FBQ0s7UUFFcEMsTUFBTVEsY0FBY1oseUVBQXNCQTtRQUMxQyxNQUFNLEVBQUVhLGFBQWEsRUFBRUMsU0FBUyxFQUFFQyxhQUFhLEVBQUUsR0FBR0gsWUFBWUksR0FBRztRQUNuRSxJQUFJLENBQUNYLGFBQWEsR0FBRyxJQUFJUCw4Q0FBTUEsQ0FBQ21CLElBQUksQ0FBQ0MsTUFBTSxDQUN2Q0osV0FDQUQsZUFDQUUsYUFBYSxDQUFDLEVBQUU7UUFFcEIsSUFBSSxDQUFDVCxXQUFXLEdBQUdBO1FBQ25CLElBQUlDLFNBQVNFLEtBQUtVLGdCQUFnQjtRQUNsQyxJQUFJWixXQUFXRyxhQUFhSCxXQUFXLFFBQVFBLFdBQVcsSUFBSTtZQUMxREEsU0FBU0c7UUFDYixPQUFPO1lBQ0gsSUFBSSxDQUFDSCxNQUFNLEdBQUdBO1FBQ2xCO0lBQ0o7SUFFQTs7O0tBR0MsR0FDRCxNQUFNYSxZQUE4QjtRQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDWixNQUFNLEVBQUU7WUFDZCxJQUFJO2dCQUNBYSxRQUFRQyxHQUFHLENBQUMsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDQyxTQUFTLEVBQUU7Z0JBQzNDLE1BQU1DLFlBQVksTUFBTSxJQUFJLENBQUNsQixXQUFXLENBQ25DbUIsU0FBUyxDQUFDLElBQUksQ0FBQ0YsU0FBUyxFQUN4QkcsS0FBSztnQkFDVixJQUNJRixjQUFjZCxhQUNkYyxVQUFVRyxJQUFJLElBQUlqQixhQUNsQmMsVUFBVUcsSUFBSSxDQUFDQyxLQUFLLEtBQUtsQixXQUMzQjtvQkFDRVcsUUFBUUMsR0FBRyxDQUFDLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQ0MsU0FBUyxFQUFFO2dCQUMvQyxPQUFPO29CQUNILE1BQU1LLFFBQVFKLFVBQVVHLElBQUksQ0FBQ0MsS0FBSztvQkFDbEMzQixrRUFBZUEsQ0FBQ3VCLFVBQVVHLElBQUksQ0FBQ0UsTUFBTSxFQUFFM0I7b0JBQ3ZDLElBQUksQ0FBQ0csYUFBYSxDQUFDeUIsY0FBYyxDQUFDRjtvQkFDbENQLFFBQVFDLEdBQUcsQ0FBQyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUNDLFNBQVMsRUFBRTtvQkFDNUMsSUFBSSxDQUFDZixNQUFNLEdBQUc7Z0JBQ2xCO1lBQ0osRUFBRSxPQUFPdUIsR0FBRztnQkFDUlYsUUFBUUMsR0FBRyxDQUNQLENBQUMseUJBQXlCLEVBQUUsSUFBSSxDQUFDQyxTQUFTLENBQUMsSUFBSSxFQUFFUSxHQUFHO1lBRTVEO1FBQ0o7UUFDQSxPQUFPLElBQUksQ0FBQ3ZCLE1BQU07SUFDdEI7SUFFQTs7O0tBR0MsR0FDRCxJQUFJZSxZQUFvQjtRQUNwQixPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQ25CLE1BQU0sRUFBRTtJQUNsQztJQUVBOzs7S0FHQyxHQUNELE1BQU00QixjQUFnQztRQUNsQyxNQUFNUixZQUFZLE1BQU0sSUFBSSxDQUFDbEIsV0FBVyxDQUNuQ21CLFNBQVMsQ0FBQyxJQUFJLENBQUNGLFNBQVMsRUFDeEJHLEtBQUs7UUFDVixJQUNJRixjQUFjZCxhQUNkYyxVQUFVRyxJQUFJLElBQUlqQixhQUNsQmMsVUFBVUcsSUFBSSxDQUFDQyxLQUFLLEtBQUtsQixXQUMzQjtZQUNFVyxRQUFRQyxHQUFHLENBQUMsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDQyxTQUFTLEVBQUU7WUFDM0MsT0FBTztRQUNYO1FBQ0EsTUFBTSxJQUFJLENBQUNqQixXQUFXLENBQUNtQixTQUFTLENBQUNELFVBQVVTLEdBQUcsRUFBRUMsTUFBTTtRQUN0RGIsUUFBUUMsR0FBRyxDQUFDLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQ0MsU0FBUyxFQUFFO1FBQzdDLE9BQU87SUFDWDtJQUVBOzs7OztLQUtDLEdBQ0QsTUFBTVksY0FBY0MsSUFBWSxFQUFFUCxNQUFnQixFQUFpQjtRQUMvRDVCLG1FQUFlQSxDQUFDNEIsUUFBUTNCO1FBQ3hCLE1BQU0wQixRQUFRLE1BQU0sSUFBSSxDQUFDdkIsYUFBYSxDQUFDZ0MsUUFBUSxDQUFDRDtRQUNoRGYsUUFBUUMsR0FBRyxDQUFDZ0IsS0FBS0MsU0FBUyxDQUFDQyxPQUFPQyxJQUFJLENBQUNiLE1BQU1jLEdBQUc7UUFDaERyQixRQUFRQyxHQUFHLENBQUNnQixLQUFLQyxTQUFTLENBQUNYLE1BQU1lLE1BQU07UUFDdkMsSUFBSSxDQUFDdEMsYUFBYSxDQUFDeUIsY0FBYyxDQUFDRixNQUFNZSxNQUFNO1FBQzlDLElBQUk7WUFDQSxNQUFNQyxXQUFXLE1BQU0sSUFBSSxDQUFDdEMsV0FBVyxDQUFDbUIsU0FBUyxDQUFDb0IsTUFBTSxDQUFDO2dCQUNyRGxCLE1BQU07b0JBQUVDLE9BQU9BLE1BQU1lLE1BQU07b0JBQUVkLFFBQVFBO2dCQUFPO2dCQUM1Q2lCLFlBQVksSUFBSSxDQUFDdkIsU0FBUztZQUM5QjtRQUNKLEVBQUUsT0FBT1EsR0FBRztZQUNSVixRQUFRQyxHQUFHLENBQ1AsQ0FBQyw0REFBNEQsRUFBRVMsR0FBRztZQUV0RSxNQUFNYSxXQUFXLE1BQU0sSUFBSSxDQUFDdEMsV0FBVyxDQUNsQ21CLFNBQVMsQ0FBQyxJQUFJLENBQUNGLFNBQVMsRUFDeEJ3QixNQUFNLENBQUM7Z0JBQ0pwQixNQUFNO29CQUFFQyxPQUFPQTtvQkFBT0MsUUFBUUE7Z0JBQU87WUFDekM7UUFDUjtJQUNKO0lBRUE7OztLQUdDLEdBQ0QsTUFBTW1CLGFBQThCO1FBQ2hDLE1BQU1DLEtBQUssSUFBSSxDQUFDQyxvQkFBb0I7UUFDcEM3QixRQUFRQyxHQUFHLENBQUMsQ0FBQyxZQUFZLEVBQUUyQixHQUFHLEtBQUssRUFBRSxJQUFJLENBQUM3QyxNQUFNLEVBQUU7UUFDbEQsTUFBTStDLE1BQU0sTUFBTSxJQUFJLENBQUM3QyxXQUFXLENBQUNtQixTQUFTLENBQUNvQixNQUFNLENBQUM7WUFDaERsQixNQUFNO2dCQUFFdkIsUUFBUSxJQUFJLENBQUNBLE1BQU07Z0JBQUV5QixRQUFRM0I7WUFBTztZQUM1QzRDLFlBQVlHO1lBQ1pHLEtBQUssS0FBSztRQUNkO1FBQ0EvQixRQUFRQyxHQUFHLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRWdCLEtBQUtDLFNBQVMsQ0FBQ1ksTUFBTTtRQUVwRCxNQUFNMUMsT0FBNEI7WUFDOUI0QyxhQUFhO1lBQ2JDLE9BQU9wRDtZQUNQcUQsT0FBT047UUFDWDtRQUNBLElBQUksSUFBSSxDQUFDMUMsTUFBTSxFQUFFO1lBQ2JFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDRixNQUFNO1FBQzVCO1FBRUEsT0FBTyxJQUFJLENBQUNGLGFBQWEsQ0FBQ21ELGVBQWUsQ0FBQy9DO0lBQzlDO0lBRUE7OztLQUdDLEdBQ0R5Qyx1QkFBK0I7UUFDM0IsTUFBTU8sU0FBUztRQUNmLElBQUlDLFNBQVM7UUFDYixNQUFNQyxhQUNGO1FBQ0osTUFBTUMsbUJBQW1CRCxXQUFXRixNQUFNO1FBQzFDLElBQUssSUFBSUksSUFBSSxHQUFHQSxJQUFJSixRQUFRSSxJQUFLO1lBQzdCSCxVQUFVQyxXQUFXRyxNQUFNLENBQ3ZCQyxLQUFLQyxLQUFLLENBQUNELEtBQUtFLE1BQU0sS0FBS0w7UUFFbkM7UUFDQSxPQUFPRjtJQUNYO0FBQ0o7QUFFQTs7Q0FFQyxHQUNvQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcE1JO0FBQ3NCO0FBRS9DOzs7Q0FHQyxHQUNELFNBQVMxRDtJQUNMLE9BQU9zQyxLQUFLNkIsS0FBSyxDQUNiRCw0Q0FDaUIsQ0FBQ0csUUFBUUMsU0FBUyxFQUFFLENBQUMsb0JBQW9CLENBQUNDLElBQUksRUFDMURDLFFBQVE7QUFFckI7QUFFQTs7O0NBR0MsR0FDRCxTQUFTQztJQUNMLE9BQU9KLFFBQVFDLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDQyxJQUFJO0FBQ2hFO0FBRWdFOzs7Ozs7Ozs7Ozs7Ozs7O0FDdkJoRTs7Ozs7Q0FLQyxHQUNELFNBQVN0RSxnQkFBZ0I0QixNQUFnQixFQUFFNkMsY0FBd0I7SUFDL0QsS0FBSyxNQUFNQyxpQkFBaUJELGVBQWdCO1FBQ3hDLElBQUk3QyxXQUFXbkIsYUFBYSxDQUFDbUIsT0FBTytDLFFBQVEsQ0FBQ0QsZ0JBQWdCO1lBQ3pELE1BQU1FLFFBQVEsQ0FBQyxjQUFjLEVBQUVGLGNBQWMscUJBQXFCLEVBQUU5QyxRQUFRO1lBQzVFUixRQUFRQyxHQUFHLENBQUN1RDtZQUNaLE1BQU0sSUFBSWxFLE1BQU1rRTtRQUNwQjtJQUNKO0FBQ0o7QUFDd0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNmeEI7Ozs7O0NBS0MsR0FDRCxTQUFTQyx1QkFBdUJDLEdBQVcsRUFBRUMsR0FBVztJQUNwRCxJQUFJQyxZQUFZO0lBQ2hCRCxPQUFPO0lBQ1AsTUFBT0EsTUFBTSxFQUFHO1FBQ1pBLE9BQU87UUFDUCxNQUFNRSxTQUFTRixNQUFNO1FBQ3JCLE1BQU1HLFlBQVlDLE9BQU9DLFlBQVksQ0FBQyxJQUFJQyxVQUFVLENBQUMsS0FBS0o7UUFDMURELFlBQVlFLFlBQVlGO1FBQ3hCRCxNQUFNakIsS0FBS0MsS0FBSyxDQUFDZ0IsTUFBTTtJQUMzQjtJQUNBLE9BQU9DLFlBQVksQ0FBQ0YsTUFBTSxHQUFHUCxRQUFRO0FBQ3pDO0FBRUE7Ozs7O0NBS0MsR0FDRCxTQUFTZSxpQkFBaUJDLFdBQW1CO0lBQ3pDLE1BQU1DLFFBQVEsSUFBSUMsT0FBTztJQUN6QixNQUFNQyxRQUFRRixNQUFNRyxJQUFJLENBQUNKO0lBQ3pCLElBQUlHLFNBQVMsTUFBTTtRQUNmLE1BQU0sSUFBSWhGLE1BQU07SUFDcEI7SUFDQSxNQUFNcUUsTUFBTWEsbUJBQW1CRixLQUFLLENBQUMsRUFBRTtJQUN2QyxNQUFNRyxVQUFVQyxPQUFPSixLQUFLLENBQUMsRUFBRTtJQUMvQixJQUFJRyxVQUFVLEdBQUc7UUFDYixNQUFNLElBQUluRixNQUFNO0lBQ3BCO0lBQ0EsT0FBTztRQUFDbUYsVUFBVTtRQUFHZDtLQUFJO0FBQzdCO0FBRUE7Ozs7O0NBS0MsR0FDRCxTQUFTZ0Isd0JBQXdCUixXQUFtQixFQUFFUyxLQUFjO0lBQ2hFLE1BQU0sQ0FBQ2xCLEtBQUtDLElBQUksR0FBR08saUJBQWlCQztJQUNwQyxJQUFJVCxPQUFPa0IsTUFBTXhDLE1BQU0sRUFBRTtRQUNyQixPQUFPL0M7SUFDWDtJQUNBLE9BQU91RixLQUFLLENBQUNsQixJQUFJLENBQUNDLElBQUk7QUFDMUI7QUFFQTs7OztDQUlDLEdBQ0QsU0FBU2EsbUJBQW1CSyxPQUFlO0lBQ3ZDLE1BQU1DLGVBQWVELFFBQVFFLFdBQVc7SUFDeEMsSUFBSTFDLFNBQWlCO0lBQ3JCLElBQUssSUFBSTJDLElBQUksR0FBR0EsSUFBSUYsYUFBYTFDLE1BQU0sRUFBRTRDLElBQUs7UUFDMUMsTUFBTUMsaUJBQ0ZILGFBQWFiLFVBQVUsQ0FBQ2UsS0FBSyxJQUFJZixVQUFVLENBQUMsS0FBSztRQUNyRDVCLFNBQVM0QyxpQkFBaUI1QyxTQUFTO0lBQ3ZDO0lBQ0EsT0FBT0EsU0FBUztBQUNwQjtBQUVBOzs7Ozs7O0NBT0MsR0FDRCxTQUFTNkMsbUJBQW1CQyxLQUFVO0lBQ2xDLElBQUlBLFVBQVUsTUFBTSxPQUFPO0lBQzNCLE9BQU8sT0FBT0EsVUFBVSxZQUFZQSxNQUFNQyxXQUFXLE9BQU87QUFDaEU7QUFFQTs7OztDQUlDLEdBQ0QsU0FBUzFHLHNCQUFzQkssTUFBdUI7SUFDbEQsSUFBSXNHLGFBQWF0RyxPQUFPb0UsUUFBUTtJQUNoQ2tDLGFBQWFBLFdBQVdDLE9BQU8sQ0FBQyxhQUFhO0lBQzdDLElBQUlDLHVCQUErQjtJQUNuQyxNQUFPQSx3QkFBd0JGLFdBQVk7UUFDdkMsNEZBQTRGO1FBQzVGRSx1QkFBdUJGO1FBQ3ZCQSxhQUFhQSxXQUFXQyxPQUFPLENBQUMsc0JBQXNCO0lBQzFEO0lBQ0EsTUFBTWpELFNBQVMwQixPQUFPeUIsU0FBU0gsYUFBYUksUUFBUSxDQUFDLElBQUk7SUFDekQsSUFBSXBELE9BQU9ELE1BQU0sSUFBSSxNQUFNQyxNQUFNLENBQUMsRUFBRSxJQUFJLEtBQUs7UUFDekMsT0FBT0EsT0FBT3FELFNBQVMsQ0FBQztJQUM1QjtJQUNBLE9BQU9yRDtBQUNYO0FBRUE7Ozs7Q0FJQyxHQUNELFNBQVNzRCx5QkFBeUJDLFVBQWtCO0lBQ2hELE9BQU8sQ0FBQyxDQUFDLEVBQUVBLFdBQVdGLFNBQVMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFRSxXQUFXRixTQUFTLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRUUsV0FBV0YsU0FBUyxDQUFDLEdBQUcsS0FBSztBQUN4RztBQVVFOzs7Ozs7Ozs7Ozs7QUN4SEYsdUM7Ozs7Ozs7Ozs7O0FDQUEsK0I7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUM1QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLGlDQUFpQyxXQUFXO1VBQzVDO1VBQ0EsRTs7O1VDUEE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQSxFOzs7VUNQQSx5Rjs7O1VDQUE7VUFDQTtVQUNBLHNEQUFzRCxpQkFBaUI7VUFDdkUsZ0RBQWdELGFBQWE7VUFDN0QsRTs7Ozs7Ozs7Ozs7Ozs7O0FDRXNDO0FBYXRDOzs7OztDQUtDLEdBQ00sTUFBTUcsVUFHVCxlQUNBQyxPQUFvQyxFQUNwQ0MsS0FBMEMsRUFDMUNDLFFBQTRCO0lBRTVCaEcsUUFBUUMsR0FBRyxDQUFDLENBQUMsMEJBQTBCLEVBQUVnQixLQUFLQyxTQUFTLENBQUM2RSxRQUFRO0lBRWhFLE1BQU03RCxRQUFRNkQsTUFBTTdELEtBQUs7SUFDekIsSUFBSUEsVUFBVTdDLFdBQVc7UUFDckIsTUFBTSxJQUFJQyxNQUFNO0lBQ3BCO0lBQ0EsTUFBTTJHLGFBQWFILFFBQ2RJLGVBQWUsR0FDZkMsSUFBSSxDQUFDQyxFQUFFLENBQUNDLFFBQVEsQ0FBQ1AsUUFBUVEsUUFBUTtJQUV0QyxJQUFJeEU7SUFDSixJQUFJO1FBQ0E5QixRQUFRQyxHQUFHLENBQUMsQ0FBQyxrQkFBa0IsRUFBRWlDLE1BQU0sR0FBRyxDQUFDO1FBQzNDSixNQUFNLE1BQU1tRSxXQUFXN0YsU0FBUyxDQUFDOEIsT0FBTzdCLEtBQUs7SUFDakQsRUFBRSxPQUFPSyxHQUFHO1FBQ1JWLFFBQVFDLEdBQUcsQ0FBQ1M7UUFDWnNGLFNBQVMsQ0FBQyx3QkFBd0IsQ0FBQztRQUNuQztJQUNKO0lBQ0EsSUFBSWxFLElBQUl4QixJQUFJLEtBQUtqQixhQUFha0gsTUFBTXpFLElBQUl4QixJQUFJLENBQUN2QixNQUFNLEdBQUc7UUFDbERpSCxTQUFTLENBQUMsc0JBQXNCLENBQUM7UUFDakM7SUFDSjtJQUNBLE1BQU1qSCxTQUFTK0MsSUFBSXhCLElBQUksQ0FBQ3ZCLE1BQU07SUFDOUJpQixRQUFRQyxHQUFHLENBQUMsQ0FBQyxhQUFhLEVBQUVsQixPQUFPLFdBQVcsRUFBRW1ELE9BQU87SUFFdkQsTUFBTXNFLGFBQWEsSUFBSTFILG1EQUFTQSxDQUFDbUgsWUFBWWxILFFBQVErRztJQUNyRCxJQUFJLE1BQU1VLFdBQVd6RyxTQUFTLElBQUk7UUFDOUJpRyxTQUFTLE1BQU07UUFDZjtJQUNKO0lBRUEsTUFBTWpGLE9BQU9nRixNQUFNaEYsSUFBSTtJQUN2QixNQUFNUCxTQUFTc0IsSUFBSXhCLElBQUksQ0FBQ0UsTUFBTTtJQUM5QixJQUFJO1FBQ0EsTUFBTXlGLFdBQVc3RixTQUFTLENBQUMwQixJQUFJbEIsR0FBRyxFQUFFQyxNQUFNO1FBQzFDYixRQUFRQyxHQUFHLENBQUMsQ0FBQyxjQUFjLEVBQUU2QixJQUFJTCxVQUFVLEVBQUU7SUFDakQsRUFBRSxPQUFPZixHQUFHO1FBQ1JzRixTQUFTLE1BQU0sQ0FBQyx3QkFBd0IsRUFBRXRGLEdBQUc7UUFDN0M7SUFDSjtJQUVBLElBQUk7UUFDQSxNQUFNOEYsV0FBVzFGLGFBQWEsQ0FBQ0MsTUFBTVA7SUFDekMsRUFBRSxPQUFPRSxHQUFHO1FBQ1IsSUFBSUEsYUFBYXBCLFNBQVNvQixhQUFhcUQsUUFBUTtZQUMzQ2lDLFNBQVN0RjtRQUNiLE9BQU87WUFDSHNGLFNBQVM7UUFDYjtRQUNBO0lBQ0o7SUFDQUEsU0FDSSxNQUNBO0FBRVIsRUFBRSIsInNvdXJjZXMiOlsiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9ub2RlX21vZHVsZXMvQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlcy9pbmRleC5qcyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3VzZXItY3JlZHMudHMiLCIvVXNlcnMvam9lcC9pZGVhLXdvcmtzcGFjZS9idm5zcC1zaWduaW4tdHdpbGlvL3NyYy91dGlscy9maWxlX3V0aWxzLnRzIiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvdXRpbHMvc2NvcGVfdXRpbC50cyIsIi9Vc2Vycy9qb2VwL2lkZWEtd29ya3NwYWNlL2J2bnNwLXNpZ25pbi10d2lsaW8vc3JjL3V0aWxzL3V0aWwudHMiLCJleHRlcm5hbCBjb21tb25qcyBcImdvb2dsZWFwaXNcIiIsImV4dGVybmFsIG5vZGUtY29tbW9uanMgXCJmc1wiIiwid2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0IiwiL1VzZXJzL2pvZXAvaWRlYS13b3Jrc3BhY2UvYnZuc3Atc2lnbmluLXR3aWxpby9zcmMvaGFuZGxlcnMvY29tcGxldGUtdXNlci1hdXRoLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEludGVudGlvbmFsbHkgbGVmdCBlbXB0eVxuIiwiaW1wb3J0IHtnb29nbGV9IGZyb20gXCJnb29nbGVhcGlzXCI7XG5pbXBvcnQge0dlbmVyYXRlQXV0aFVybE9wdHN9IGZyb20gXCJnb29nbGUtYXV0aC1saWJyYXJ5XCI7XG5pbXBvcnQge09BdXRoMkNsaWVudH0gZnJvbSBcImdvb2dsZWFwaXMtY29tbW9uXCI7XG5pbXBvcnQge3Nhbml0aXplX3Bob25lX251bWJlcn0gZnJvbSBcIi4vdXRpbHMvdXRpbFwiO1xuaW1wb3J0IHtsb2FkX2NyZWRlbnRpYWxzX2ZpbGVzfSBmcm9tIFwiLi91dGlscy9maWxlX3V0aWxzXCI7XG5pbXBvcnQge1NlcnZpY2VDb250ZXh0fSBmcm9tIFwiQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlcy90eXBlc1wiO1xuaW1wb3J0IHtVc2VyQ3JlZHNDb25maWd9IGZyb20gXCIuL2Vudi9oYW5kbGVyX2NvbmZpZ1wiO1xuaW1wb3J0IHt2YWxpZGF0ZV9zY29wZXN9IGZyb20gXCIuL3V0aWxzL3Njb3BlX3V0aWxcIjtcblxuY29uc3QgU0NPUEVTID0gW1xuICAgIFwiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9zY3JpcHQucHJvamVjdHNcIixcbiAgICBcImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvc3ByZWFkc2hlZXRzXCIsXG5dO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyB1c2VyIGNyZWRlbnRpYWxzIGZvciBHb29nbGUgT0F1dGgyLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyQ3JlZHMge1xuICAgIG51bWJlcjogc3RyaW5nO1xuICAgIG9hdXRoMl9jbGllbnQ6IE9BdXRoMkNsaWVudDtcbiAgICBzeW5jX2NsaWVudDogU2VydmljZUNvbnRleHQ7XG4gICAgZG9tYWluPzogc3RyaW5nO1xuICAgIGxvYWRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgVXNlckNyZWRzIGluc3RhbmNlLlxuICAgICAqIEBwYXJhbSB7U2VydmljZUNvbnRleHR9IHN5bmNfY2xpZW50IC0gVGhlIFR3aWxpbyBTeW5jIGNsaWVudC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IHVuZGVmaW5lZH0gbnVtYmVyIC0gVGhlIHVzZXIncyBwaG9uZSBudW1iZXIuXG4gICAgICogQHBhcmFtIHtVc2VyQ3JlZHNDb25maWd9IG9wdHMgLSBUaGUgdXNlciBjcmVkZW50aWFscyBjb25maWd1cmF0aW9uLlxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBUaHJvd3MgYW4gZXJyb3IgaWYgdGhlIG51bWJlciBpcyB1bmRlZmluZWQgb3IgbnVsbC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgc3luY19jbGllbnQ6IFNlcnZpY2VDb250ZXh0LFxuICAgICAgICBudW1iZXI6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICAgICAgb3B0czogVXNlckNyZWRzQ29uZmlnXG4gICAgKSB7XG4gICAgICAgIGlmIChudW1iZXIgPT09IHVuZGVmaW5lZCB8fCBudW1iZXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk51bWJlciBpcyB1bmRlZmluZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5udW1iZXIgPSBzYW5pdGl6ZV9waG9uZV9udW1iZXIobnVtYmVyKTtcblxuICAgICAgICBjb25zdCBjcmVkZW50aWFscyA9IGxvYWRfY3JlZGVudGlhbHNfZmlsZXMoKTtcbiAgICAgICAgY29uc3QgeyBjbGllbnRfc2VjcmV0LCBjbGllbnRfaWQsIHJlZGlyZWN0X3VyaXMgfSA9IGNyZWRlbnRpYWxzLndlYjtcbiAgICAgICAgdGhpcy5vYXV0aDJfY2xpZW50ID0gbmV3IGdvb2dsZS5hdXRoLk9BdXRoMihcbiAgICAgICAgICAgIGNsaWVudF9pZCxcbiAgICAgICAgICAgIGNsaWVudF9zZWNyZXQsXG4gICAgICAgICAgICByZWRpcmVjdF91cmlzWzBdXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3luY19jbGllbnQgPSBzeW5jX2NsaWVudDtcbiAgICAgICAgbGV0IGRvbWFpbiA9IG9wdHMuTlNQX0VNQUlMX0RPTUFJTjtcbiAgICAgICAgaWYgKGRvbWFpbiA9PT0gdW5kZWZpbmVkIHx8IGRvbWFpbiA9PT0gbnVsbCB8fCBkb21haW4gPT09IFwiXCIpIHtcbiAgICAgICAgICAgIGRvbWFpbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZG9tYWluID0gZG9tYWluO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9hZCB0aGUgT0F1dGgyIHRva2VuLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIGJvb2xlYW4gaW5kaWNhdGluZyBpZiB0aGUgdG9rZW4gd2FzIGxvYWRlZC5cbiAgICAgKi9cbiAgICBhc3luYyBsb2FkVG9rZW4oKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIGlmICghdGhpcy5sb2FkZWQpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYExvb2tpbmcgZm9yICR7dGhpcy50b2tlbl9rZXl9YCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2F1dGgyRG9jID0gYXdhaXQgdGhpcy5zeW5jX2NsaWVudFxuICAgICAgICAgICAgICAgICAgICAuZG9jdW1lbnRzKHRoaXMudG9rZW5fa2V5KVxuICAgICAgICAgICAgICAgICAgICAuZmV0Y2goKTtcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIG9hdXRoMkRvYyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgICAgIG9hdXRoMkRvYy5kYXRhID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgICAgICBvYXV0aDJEb2MuZGF0YS50b2tlbiA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBEaWRuJ3QgZmluZCAke3RoaXMudG9rZW5fa2V5fWApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRva2VuID0gb2F1dGgyRG9jLmRhdGEudG9rZW47XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlX3Njb3BlcyhvYXV0aDJEb2MuZGF0YS5zY29wZXMsIFNDT1BFUyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2F1dGgyX2NsaWVudC5zZXRDcmVkZW50aWFscyh0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBMb2FkZWQgdG9rZW4gJHt0aGlzLnRva2VuX2tleX1gKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICAgICAgYEZhaWxlZCB0byBsb2FkIHRva2VuIGZvciAke3RoaXMudG9rZW5fa2V5fS5cXG4gJHtlfWBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHRva2VuIGtleS5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgdG9rZW4ga2V5LlxuICAgICAqL1xuICAgIGdldCB0b2tlbl9rZXkoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGBvYXV0aDJfJHt0aGlzLm51bWJlcn1gO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlbGV0ZSB0aGUgT0F1dGgyIHRva2VuLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIGJvb2xlYW4gaW5kaWNhdGluZyBpZiB0aGUgdG9rZW4gd2FzIGRlbGV0ZWQuXG4gICAgICovXG4gICAgYXN5bmMgZGVsZXRlVG9rZW4oKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIGNvbnN0IG9hdXRoMkRvYyA9IGF3YWl0IHRoaXMuc3luY19jbGllbnRcbiAgICAgICAgICAgIC5kb2N1bWVudHModGhpcy50b2tlbl9rZXkpXG4gICAgICAgICAgICAuZmV0Y2goKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgb2F1dGgyRG9jID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIG9hdXRoMkRvYy5kYXRhID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgb2F1dGgyRG9jLmRhdGEudG9rZW4gPT09IHVuZGVmaW5lZFxuICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBEaWRuJ3QgZmluZCAke3RoaXMudG9rZW5fa2V5fWApO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHRoaXMuc3luY19jbGllbnQuZG9jdW1lbnRzKG9hdXRoMkRvYy5zaWQpLnJlbW92ZSgpO1xuICAgICAgICBjb25zb2xlLmxvZyhgRGVsZXRlZCB0b2tlbiAke3RoaXMudG9rZW5fa2V5fWApO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb21wbGV0ZSB0aGUgbG9naW4gcHJvY2VzcyBieSBleGNoYW5naW5nIHRoZSBhdXRob3JpemF0aW9uIGNvZGUgZm9yIGEgdG9rZW4uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvZGUgLSBUaGUgYXV0aG9yaXphdGlvbiBjb2RlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IHNjb3BlcyAtIFRoZSBzY29wZXMgdG8gdmFsaWRhdGUuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGxvZ2luIHByb2Nlc3MgaXMgY29tcGxldGUuXG4gICAgICovXG4gICAgYXN5bmMgY29tcGxldGVMb2dpbihjb2RlOiBzdHJpbmcsIHNjb3Blczogc3RyaW5nW10pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgdmFsaWRhdGVfc2NvcGVzKHNjb3BlcywgU0NPUEVTKTtcbiAgICAgICAgY29uc3QgdG9rZW4gPSBhd2FpdCB0aGlzLm9hdXRoMl9jbGllbnQuZ2V0VG9rZW4oY29kZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KE9iamVjdC5rZXlzKHRva2VuLnJlcyEpKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRva2VuLnRva2VucykpO1xuICAgICAgICB0aGlzLm9hdXRoMl9jbGllbnQuc2V0Q3JlZGVudGlhbHModG9rZW4udG9rZW5zKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IG9hdXRoRG9jID0gYXdhaXQgdGhpcy5zeW5jX2NsaWVudC5kb2N1bWVudHMuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICBkYXRhOiB7IHRva2VuOiB0b2tlbi50b2tlbnMsIHNjb3Blczogc2NvcGVzIH0sXG4gICAgICAgICAgICAgICAgdW5pcXVlTmFtZTogdGhpcy50b2tlbl9rZXksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgYEV4Y2VwdGlvbiB3aGVuIGNyZWF0aW5nIG9hdXRoLiBUcnlpbmcgdG8gdXBkYXRlIGluc3RlYWQuLi5cXG4ke2V9YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IG9hdXRoRG9jID0gYXdhaXQgdGhpcy5zeW5jX2NsaWVudFxuICAgICAgICAgICAgICAgIC5kb2N1bWVudHModGhpcy50b2tlbl9rZXkpXG4gICAgICAgICAgICAgICAgLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHsgdG9rZW46IHRva2VuLCBzY29wZXM6IHNjb3BlcyB9LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBhdXRob3JpemF0aW9uIFVSTC5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzdHJpbmc+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgYXV0aG9yaXphdGlvbiBVUkwuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0QXV0aFVybCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zdCBpZCA9IHRoaXMuZ2VuZXJhdGVSYW5kb21TdHJpbmcoKTtcbiAgICAgICAgY29uc29sZS5sb2coYFVzaW5nIG5vbmNlICR7aWR9IGZvciAke3RoaXMubnVtYmVyfWApO1xuICAgICAgICBjb25zdCBkb2MgPSBhd2FpdCB0aGlzLnN5bmNfY2xpZW50LmRvY3VtZW50cy5jcmVhdGUoe1xuICAgICAgICAgICAgZGF0YTogeyBudW1iZXI6IHRoaXMubnVtYmVyLCBzY29wZXM6IFNDT1BFUyB9LFxuICAgICAgICAgICAgdW5pcXVlTmFtZTogaWQsXG4gICAgICAgICAgICB0dGw6IDYwICogNSwgLy8gNSBtaW51dGVzXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhgTWFkZSBub25jZS1kb2M6ICR7SlNPTi5zdHJpbmdpZnkoZG9jKX1gKTtcblxuICAgICAgICBjb25zdCBvcHRzOiBHZW5lcmF0ZUF1dGhVcmxPcHRzID0ge1xuICAgICAgICAgICAgYWNjZXNzX3R5cGU6IFwib2ZmbGluZVwiLFxuICAgICAgICAgICAgc2NvcGU6IFNDT1BFUyxcbiAgICAgICAgICAgIHN0YXRlOiBpZCxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMuZG9tYWluKSB7XG4gICAgICAgICAgICBvcHRzW1wiaGRcIl0gPSB0aGlzLmRvbWFpbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm9hdXRoMl9jbGllbnQuZ2VuZXJhdGVBdXRoVXJsKG9wdHMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlIGEgcmFuZG9tIHN0cmluZy5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBBIHJhbmRvbSBzdHJpbmcuXG4gICAgICovXG4gICAgZ2VuZXJhdGVSYW5kb21TdHJpbmcoKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gMzA7XG4gICAgICAgIGxldCByZXN1bHQgPSBcIlwiO1xuICAgICAgICBjb25zdCBjaGFyYWN0ZXJzID1cbiAgICAgICAgICAgIFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODlcIjtcbiAgICAgICAgY29uc3QgY2hhcmFjdGVyc0xlbmd0aCA9IGNoYXJhY3RlcnMubGVuZ3RoO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gY2hhcmFjdGVycy5jaGFyQXQoXG4gICAgICAgICAgICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hhcmFjdGVyc0xlbmd0aClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5cbi8qKlxuICogSW50ZXJmYWNlIHJlcHJlc2VudGluZyB0aGUgdXNlciBjcmVkZW50aWFscyBjb25maWd1cmF0aW9uLlxuICovXG5leHBvcnQgeyBVc2VyQ3JlZHMgfTtcbiIsImltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICdAdHdpbGlvLWxhYnMvc2VydmVybGVzcy1ydW50aW1lLXR5cGVzJztcblxuLyoqXG4gKiBMb2FkIGNyZWRlbnRpYWxzIGZyb20gYSBKU09OIGZpbGUuXG4gKiBAcmV0dXJucyB7YW55fSBUaGUgcGFyc2VkIGNyZWRlbnRpYWxzIGZyb20gdGhlIEpTT04gZmlsZS5cbiAqL1xuZnVuY3Rpb24gbG9hZF9jcmVkZW50aWFsc19maWxlcygpOiBhbnkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKFxuICAgICAgICBmc1xuICAgICAgICAgICAgLnJlYWRGaWxlU3luYyhSdW50aW1lLmdldEFzc2V0cygpW1wiL2NyZWRlbnRpYWxzLmpzb25cIl0ucGF0aClcbiAgICAgICAgICAgIC50b1N0cmluZygpXG4gICAgKTtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIHBhdGggdG8gdGhlIHNlcnZpY2UgY3JlZGVudGlhbHMgZmlsZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBwYXRoIHRvIHRoZSBzZXJ2aWNlIGNyZWRlbnRpYWxzIGZpbGUuXG4gKi9cbmZ1bmN0aW9uIGdldF9zZXJ2aWNlX2NyZWRlbnRpYWxzX3BhdGgoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gUnVudGltZS5nZXRBc3NldHMoKVtcIi9zZXJ2aWNlLWNyZWRlbnRpYWxzLmpzb25cIl0ucGF0aDtcbn1cblxuZXhwb3J0IHsgbG9hZF9jcmVkZW50aWFsc19maWxlcywgZ2V0X3NlcnZpY2VfY3JlZGVudGlhbHNfcGF0aCB9OyIsIi8qKlxuICogVmFsaWRhdGVzIGlmIHRoZSBwcm92aWRlZCBzY29wZXMgaW5jbHVkZSBhbGwgZGVzaXJlZCBzY29wZXMuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBzY29wZXMgLSBUaGUgbGlzdCBvZiBzY29wZXMgdG8gdmFsaWRhdGUuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBkZXNpcmVkX3Njb3BlcyAtIFRoZSBsaXN0IG9mIGRlc2lyZWQgc2NvcGVzLlxuICogQHRocm93cyB7RXJyb3J9IFRocm93cyBhbiBlcnJvciBpZiBhbnkgZGVzaXJlZCBzY29wZSBpcyBtaXNzaW5nLlxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZV9zY29wZXMoc2NvcGVzOiBzdHJpbmdbXSwgZGVzaXJlZF9zY29wZXM6IHN0cmluZ1tdKSB7XG4gICAgZm9yIChjb25zdCBkZXNpcmVkX3Njb3BlIG9mIGRlc2lyZWRfc2NvcGVzKSB7XG4gICAgICAgIGlmIChzY29wZXMgPT09IHVuZGVmaW5lZCB8fCAhc2NvcGVzLmluY2x1ZGVzKGRlc2lyZWRfc2NvcGUpKSB7XG4gICAgICAgICAgICBjb25zdCBlcnJvciA9IGBNaXNzaW5nIHNjb3BlICR7ZGVzaXJlZF9zY29wZX0gaW4gcmVjZWl2ZWQgc2NvcGVzOiAke3Njb3Blc31gO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCB7dmFsaWRhdGVfc2NvcGVzfSIsIi8qKlxuICogQ29udmVydCByb3cgYW5kIGNvbHVtbiBudW1iZXJzIHRvIGFuIEV4Y2VsLWxpa2UgaW5kZXguXG4gKiBAcGFyYW0ge251bWJlcn0gcm93IC0gVGhlIHJvdyBudW1iZXIgKDAtYmFzZWQpLlxuICogQHBhcmFtIHtudW1iZXJ9IGNvbCAtIFRoZSBjb2x1bW4gbnVtYmVyICgwLWJhc2VkKS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBFeGNlbC1saWtlIGluZGV4IChlLmcuLCBcIkExXCIpLlxuICovXG5mdW5jdGlvbiByb3dfY29sX3RvX2V4Y2VsX2luZGV4KHJvdzogbnVtYmVyLCBjb2w6IG51bWJlcik6IHN0cmluZyB7XG4gICAgbGV0IGNvbFN0cmluZyA9IFwiXCI7XG4gICAgY29sICs9IDE7XG4gICAgd2hpbGUgKGNvbCA+IDApIHtcbiAgICAgICAgY29sIC09IDE7XG4gICAgICAgIGNvbnN0IG1vZHVsbyA9IGNvbCAlIDI2O1xuICAgICAgICBjb25zdCBjb2xMZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKCdBJy5jaGFyQ29kZUF0KDApICsgbW9kdWxvKTtcbiAgICAgICAgY29sU3RyaW5nID0gY29sTGV0dGVyICsgY29sU3RyaW5nO1xuICAgICAgICBjb2wgPSBNYXRoLmZsb29yKGNvbCAvIDI2KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbFN0cmluZyArIChyb3cgKyAxKS50b1N0cmluZygpO1xufVxuXG4vKipcbiAqIFNwbGl0IGFuIEV4Y2VsLWxpa2UgaW5kZXggaW50byByb3cgYW5kIGNvbHVtbiBudW1iZXJzLlxuICogQHBhcmFtIHtzdHJpbmd9IGV4Y2VsX2luZGV4IC0gVGhlIEV4Y2VsLWxpa2UgaW5kZXggKGUuZy4sIFwiQTFcIikuXG4gKiBAcmV0dXJucyB7W251bWJlciwgbnVtYmVyXX0gQW4gYXJyYXkgY29udGFpbmluZyB0aGUgcm93IGFuZCBjb2x1bW4gbnVtYmVycyAoMC1iYXNlZCkuXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIGluZGV4IGNhbm5vdCBiZSBwYXJzZWQuXG4gKi9cbmZ1bmN0aW9uIHNwbGl0X3RvX3Jvd19jb2woZXhjZWxfaW5kZXg6IHN0cmluZyk6IFtudW1iZXIsIG51bWJlcl0ge1xuICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cChcIl4oW0EtWmEtel0rKShbMC05XSspJFwiKTtcbiAgICBjb25zdCBtYXRjaCA9IHJlZ2V4LmV4ZWMoZXhjZWxfaW5kZXgpO1xuICAgIGlmIChtYXRjaCA9PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBwYXJzZSBzdHJpbmcgZm9yIGV4Y2VsIHBvc2l0aW9uIHNwbGl0XCIpO1xuICAgIH1cbiAgICBjb25zdCBjb2wgPSBleGNlbF9yb3dfdG9faW5kZXgobWF0Y2hbMV0pO1xuICAgIGNvbnN0IHJhd19yb3cgPSBOdW1iZXIobWF0Y2hbMl0pO1xuICAgIGlmIChyYXdfcm93IDwgMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJSb3cgbXVzdCBiZSA+PTFcIik7XG4gICAgfVxuICAgIHJldHVybiBbcmF3X3JvdyAtIDEsIGNvbF07XG59XG5cbi8qKlxuICogTG9vayB1cCBhIHZhbHVlIGluIGEgc2hlZXQgYnkgaXRzIEV4Y2VsLWxpa2UgaW5kZXguXG4gKiBAcGFyYW0ge3N0cmluZ30gZXhjZWxfaW5kZXggLSBUaGUgRXhjZWwtbGlrZSBpbmRleCAoZS5nLiwgXCJBMVwiKS5cbiAqIEBwYXJhbSB7YW55W11bXX0gc2hlZXQgLSBUaGUgc2hlZXQgZGF0YS5cbiAqIEByZXR1cm5zIHthbnl9IFRoZSB2YWx1ZSBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LCBvciB1bmRlZmluZWQgaWYgbm90IGZvdW5kLlxuICovXG5mdW5jdGlvbiBsb29rdXBfcm93X2NvbF9pbl9zaGVldChleGNlbF9pbmRleDogc3RyaW5nLCBzaGVldDogYW55W11bXSk6IGFueSB7XG4gICAgY29uc3QgW3JvdywgY29sXSA9IHNwbGl0X3RvX3Jvd19jb2woZXhjZWxfaW5kZXgpO1xuICAgIGlmIChyb3cgPj0gc2hlZXQubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiBzaGVldFtyb3ddW2NvbF07XG59XG5cbi8qKlxuICogQ29udmVydCBFeGNlbC1saWtlIGNvbHVtbiBsZXR0ZXJzIHRvIGEgY29sdW1uIG51bWJlci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBsZXR0ZXJzIC0gVGhlIGNvbHVtbiBsZXR0ZXJzIChlLmcuLCBcIkFcIikuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgY29sdW1uIG51bWJlciAoMC1iYXNlZCkuXG4gKi9cbmZ1bmN0aW9uIGV4Y2VsX3Jvd190b19pbmRleChsZXR0ZXJzOiBzdHJpbmcpOiBudW1iZXIge1xuICAgIGNvbnN0IGxvd2VyTGV0dGVycyA9IGxldHRlcnMudG9Mb3dlckNhc2UoKTtcbiAgICBsZXQgcmVzdWx0OiBudW1iZXIgPSAwO1xuICAgIGZvciAobGV0IHAgPSAwOyBwIDwgbG93ZXJMZXR0ZXJzLmxlbmd0aDsgcCsrKSB7XG4gICAgICAgIGNvbnN0IGNoYXJhY3RlclZhbHVlID1cbiAgICAgICAgICAgIGxvd2VyTGV0dGVycy5jaGFyQ29kZUF0KHApIC0gXCJhXCIuY2hhckNvZGVBdCgwKSArIDE7XG4gICAgICAgIHJlc3VsdCA9IGNoYXJhY3RlclZhbHVlICsgcmVzdWx0ICogMjY7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQgLSAxO1xufVxuXG4vKipcbiAqIFBhcnNlIGEgR29vZ2xlIFNoZWV0cyBjaGVja2JveC9ib29sZWFuIGNlbGwgdmFsdWUgYXMgYSBib29sZWFuLlxuICogQWNjZXB0cyBKUyBib29sZWFuIHRydWUvZmFsc2UgYW5kIHN0cmluZyBsaXRlcmFscyBcIlRSVUVcIi9cIkZBTFNFXCJcbiAqIChjYXNlLWluc2Vuc2l0aXZlKSBmcm9tIFNoZWV0cywgIGRlcGVuZGluZyBvbiB0aGUgY2VsbCBmb3JtYXR0aW5nLlxuICogQW55IHZhbHVlIHRoYXQgY2Fubm90IGJlIHJlY29nbml6ZWQgYXMgdHJ1ZSBpcyBjb25zaWRlcmVkIGZhbHNlLlxuICogQHBhcmFtIHthbnl9IHZhbHVlIC0gUmF3IGNlbGwgdmFsdWUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZSBvbmx5IHdoZW4gdmFsdWUgaXMgdHJ1ZSBvciBcIlRSVUVcIiAoY2FzZS1pbnNlbnNpdGl2ZSkuXG4gKi9cbmZ1bmN0aW9uIHBhcnNlX2Jvb2xlYW5fY2VsbCh2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgaWYgKHZhbHVlID09PSB0cnVlKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIHZhbHVlLnRvVXBwZXJDYXNlKCkgPT09IFwiVFJVRVwiO1xufVxuXG4vKipcbiAqIFNhbml0aXplIGEgcGhvbmUgbnVtYmVyIGJ5IHJlbW92aW5nIHVud2FudGVkIGNoYXJhY3RlcnMuXG4gKiBAcGFyYW0ge251bWJlciB8IHN0cmluZ30gbnVtYmVyIC0gVGhlIHBob25lIG51bWJlciB0byBzYW5pdGl6ZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBzYW5pdGl6ZWQgcGhvbmUgbnVtYmVyLlxuICovXG5mdW5jdGlvbiBzYW5pdGl6ZV9waG9uZV9udW1iZXIobnVtYmVyOiBudW1iZXIgfCBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGxldCBuZXdfbnVtYmVyID0gbnVtYmVyLnRvU3RyaW5nKCk7XG4gICAgbmV3X251bWJlciA9IG5ld19udW1iZXIucmVwbGFjZShcIndoYXRzYXBwOlwiLCBcIlwiKTtcbiAgICBsZXQgdGVtcG9yYXJ5X25ld19udW1iZXI6IHN0cmluZyA9IFwiXCI7XG4gICAgd2hpbGUgKHRlbXBvcmFyeV9uZXdfbnVtYmVyICE9IG5ld19udW1iZXIpIHtcbiAgICAgICAgLy8gRG8gdGhpcyBtdWx0aXBsZSB0aW1lcyBzbyB3ZSBnZXQgYWxsICsxIGF0IHRoZSBzdGFydCBvZiB0aGUgc3RyaW5nLCBldmVuIGFmdGVyIHN0cmlwcGluZy5cbiAgICAgICAgdGVtcG9yYXJ5X25ld19udW1iZXIgPSBuZXdfbnVtYmVyO1xuICAgICAgICBuZXdfbnVtYmVyID0gbmV3X251bWJlci5yZXBsYWNlKC8oXlxcKzF8XFwofFxcKXxcXC58LSkvZywgXCJcIik7XG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdCA9IFN0cmluZyhwYXJzZUludChuZXdfbnVtYmVyKSkucGFkU3RhcnQoMTAsIFwiMFwiKTtcbiAgICBpZiAocmVzdWx0Lmxlbmd0aCA9PSAxMSAmJiByZXN1bHRbMF0gPT0gXCIxXCIpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5zdWJzdHJpbmcoMSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRm9ybWF0cyBhIDEwLWRpZ2l0IHBob25lIG51bWJlciBzdHJpbmcgYXMgKFhYWClYWFgtWFhYWCBmb3IgZGlzcGxheS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZW5fZGlnaXRzIC0gQSAxMC1kaWdpdCBwaG9uZSBudW1iZXIgc3RyaW5nIChlLmcuIFwiMTIzNDU2Nzg5MFwiKS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgcGhvbmUgbnVtYmVyIChlLmcuIFwiKDEyMyk0NTYtNzg5MFwiKS5cbiAqL1xuZnVuY3Rpb24gZm9ybWF0X3Bob25lX2Zvcl9kaXNwbGF5KHRlbl9kaWdpdHM6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAoJHt0ZW5fZGlnaXRzLnN1YnN0cmluZygwLCAzKX0pJHt0ZW5fZGlnaXRzLnN1YnN0cmluZygzLCA2KX0tJHt0ZW5fZGlnaXRzLnN1YnN0cmluZyg2LCAxMCl9YDtcbn1cblxuZXhwb3J0IHtcbiAgICByb3dfY29sX3RvX2V4Y2VsX2luZGV4LFxuICAgIGV4Y2VsX3Jvd190b19pbmRleCxcbiAgICBzYW5pdGl6ZV9waG9uZV9udW1iZXIsXG4gICAgc3BsaXRfdG9fcm93X2NvbCxcbiAgICBsb29rdXBfcm93X2NvbF9pbl9zaGVldCxcbiAgICBwYXJzZV9ib29sZWFuX2NlbGwsXG4gICAgZm9ybWF0X3Bob25lX2Zvcl9kaXNwbGF5XG59OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImdvb2dsZWFwaXNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxuY29uc3QgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRjb25zdCBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0Y29uc3QgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdGNvbnN0IGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHRjb25zdCBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlci92YWx1ZSBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKTsiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtcbiAgICBDb250ZXh0LFxuICAgIFNlcnZlcmxlc3NDYWxsYmFjayxcbiAgICBTZXJ2ZXJsZXNzRXZlbnRPYmplY3QsXG4gICAgU2VydmVybGVzc0Z1bmN0aW9uU2lnbmF0dXJlLFxufSBmcm9tIFwiQHR3aWxpby1sYWJzL3NlcnZlcmxlc3MtcnVudGltZS10eXBlcy90eXBlc1wiO1xuaW1wb3J0IFVzZXJDcmVkcyBmcm9tIFwiLi4vdXNlci1jcmVkc1wiO1xuXG50eXBlIEhhbmRsZXJFdmVudCA9IFNlcnZlcmxlc3NFdmVudE9iamVjdDxcbiAgICB7XG4gICAgICAgIHN0YXRlOiBzdHJpbmc7XG4gICAgICAgIGNvZGU6IHN0cmluZztcbiAgICB9XG4+O1xudHlwZSBIYW5kbGVyRW52aXJvbm1lbnQgPSB7XG4gICAgU1lOQ19TSUQ6IHN0cmluZztcbiAgICBOU1BfRU1BSUxfRE9NQUlOOiBzdHJpbmc7XG59O1xuXG4vKipcbiAqIFR3aWxpbyBTZXJ2ZXJsZXNzIGZ1bmN0aW9uIGhhbmRsZXIgZm9yIGNvbXBsZXRpbmcgdXNlciBhdXRoZW50aWNhdGlvbi5cbiAqIEBwYXJhbSB7Q29udGV4dDxIYW5kbGVyRW52aXJvbm1lbnQ+fSBjb250ZXh0IC0gVGhlIFR3aWxpbyBzZXJ2ZXJsZXNzIGNvbnRleHQuXG4gKiBAcGFyYW0ge1NlcnZlcmxlc3NFdmVudE9iamVjdDxIYW5kbGVyRXZlbnQ+fSBldmVudCAtIFRoZSBldmVudCBvYmplY3QgY29udGFpbmluZyBzdGF0ZSBhbmQgY29kZS5cbiAqIEBwYXJhbSB7U2VydmVybGVzc0NhbGxiYWNrfSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbi5cbiAqL1xuZXhwb3J0IGNvbnN0IGhhbmRsZXI6IFNlcnZlcmxlc3NGdW5jdGlvblNpZ25hdHVyZTxcbiAgICBIYW5kbGVyRW52aXJvbm1lbnQsXG4gICAgSGFuZGxlckV2ZW50XG4+ID0gYXN5bmMgZnVuY3Rpb24gKFxuICAgIGNvbnRleHQ6IENvbnRleHQ8SGFuZGxlckVudmlyb25tZW50PixcbiAgICBldmVudDogU2VydmVybGVzc0V2ZW50T2JqZWN0PEhhbmRsZXJFdmVudD4sXG4gICAgY2FsbGJhY2s6IFNlcnZlcmxlc3NDYWxsYmFja1xuKSB7XG4gICAgY29uc29sZS5sb2coYEhhbmRsaW5nIGF1dGggY29tcGxldGlvbjogJHtKU09OLnN0cmluZ2lmeShldmVudCl9YCk7XG5cbiAgICBjb25zdCBzdGF0ZSA9IGV2ZW50LnN0YXRlO1xuICAgIGlmIChzdGF0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1pc3Npbmcgbm9uY2VcIik7XG4gICAgfVxuICAgIGNvbnN0IHR3aWxpb1N5bmMgPSBjb250ZXh0XG4gICAgICAgIC5nZXRUd2lsaW9DbGllbnQoKVxuICAgICAgICAuc3luYy52MS5zZXJ2aWNlcyhjb250ZXh0LlNZTkNfU0lEKTtcblxuICAgIGxldCBkb2M7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc29sZS5sb2coYExvb2tpbmcgZm9yIHN0YXRlICR7c3RhdGV9Li4uYCk7XG4gICAgICAgIGRvYyA9IGF3YWl0IHR3aWxpb1N5bmMuZG9jdW1lbnRzKHN0YXRlKS5mZXRjaCgpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIGNhbGxiYWNrKGBGYWlsZWQgdG8gZ2V0IHN0YXRlIGRvYy5gKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZG9jLmRhdGEgPT09IHVuZGVmaW5lZCB8fCBpc05hTihkb2MuZGF0YS5udW1iZXIpKSB7XG4gICAgICAgIGNhbGxiYWNrKGBSZWNlaXZlZCBpbnZhbGlkIG5vbmNlYCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgbnVtYmVyID0gZG9jLmRhdGEubnVtYmVyO1xuICAgIGNvbnNvbGUubG9nKGBGb3VuZCBudW1iZXIgJHtudW1iZXJ9IGZvciBub25jZSAke3N0YXRlfWApO1xuXG4gICAgY29uc3QgdXNlcl9jcmVkcyA9IG5ldyBVc2VyQ3JlZHModHdpbGlvU3luYywgbnVtYmVyLCBjb250ZXh0KTtcbiAgICBpZiAoYXdhaXQgdXNlcl9jcmVkcy5sb2FkVG9rZW4oKSkge1xuICAgICAgICBjYWxsYmFjayhudWxsLCBcImFscmVhZHlfdmFsaWRcIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjb2RlID0gZXZlbnQuY29kZTtcbiAgICBjb25zdCBzY29wZXMgPSBkb2MuZGF0YS5zY29wZXM7XG4gICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgdHdpbGlvU3luYy5kb2N1bWVudHMoZG9jLnNpZCkucmVtb3ZlKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBEZWxldGVkIG5vbmNlICR7ZG9jLnVuaXF1ZU5hbWV9YCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWxsYmFjayhudWxsLCBgRmFpbGVkIHRvIGRlbGV0ZSBub25jZTogJHtlfWApO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgdXNlcl9jcmVkcy5jb21wbGV0ZUxvZ2luKGNvZGUsIHNjb3Blcyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIEVycm9yIHx8IGUgaW5zdGFuY2VvZiBTdHJpbmcpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FsbGJhY2soXCJGYWlsZWQgdG8gY29tcGxldGUgdXNlciBhdXRoXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY2FsbGJhY2soXG4gICAgICAgIG51bGwsXG4gICAgICAgIFwiUGxlYXNlIHJldHVybiB0byB5b3VyIG1lc3NhZ2luZyBhcHAgYW5kIGVuZ2FnZSBCVk5TUCBib3QgYWdhaW4uXCJcbiAgICApO1xufTsiXSwibmFtZXMiOlsiZ29vZ2xlIiwic2FuaXRpemVfcGhvbmVfbnVtYmVyIiwibG9hZF9jcmVkZW50aWFsc19maWxlcyIsInZhbGlkYXRlX3Njb3BlcyIsIlNDT1BFUyIsIlVzZXJDcmVkcyIsIm51bWJlciIsIm9hdXRoMl9jbGllbnQiLCJzeW5jX2NsaWVudCIsImRvbWFpbiIsImxvYWRlZCIsIm9wdHMiLCJ1bmRlZmluZWQiLCJFcnJvciIsImNyZWRlbnRpYWxzIiwiY2xpZW50X3NlY3JldCIsImNsaWVudF9pZCIsInJlZGlyZWN0X3VyaXMiLCJ3ZWIiLCJhdXRoIiwiT0F1dGgyIiwiTlNQX0VNQUlMX0RPTUFJTiIsImxvYWRUb2tlbiIsImNvbnNvbGUiLCJsb2ciLCJ0b2tlbl9rZXkiLCJvYXV0aDJEb2MiLCJkb2N1bWVudHMiLCJmZXRjaCIsImRhdGEiLCJ0b2tlbiIsInNjb3BlcyIsInNldENyZWRlbnRpYWxzIiwiZSIsImRlbGV0ZVRva2VuIiwic2lkIiwicmVtb3ZlIiwiY29tcGxldGVMb2dpbiIsImNvZGUiLCJnZXRUb2tlbiIsIkpTT04iLCJzdHJpbmdpZnkiLCJPYmplY3QiLCJrZXlzIiwicmVzIiwidG9rZW5zIiwib2F1dGhEb2MiLCJjcmVhdGUiLCJ1bmlxdWVOYW1lIiwidXBkYXRlIiwiZ2V0QXV0aFVybCIsImlkIiwiZ2VuZXJhdGVSYW5kb21TdHJpbmciLCJkb2MiLCJ0dGwiLCJhY2Nlc3NfdHlwZSIsInNjb3BlIiwic3RhdGUiLCJnZW5lcmF0ZUF1dGhVcmwiLCJsZW5ndGgiLCJyZXN1bHQiLCJjaGFyYWN0ZXJzIiwiY2hhcmFjdGVyc0xlbmd0aCIsImkiLCJjaGFyQXQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJmcyIsInBhcnNlIiwicmVhZEZpbGVTeW5jIiwiUnVudGltZSIsImdldEFzc2V0cyIsInBhdGgiLCJ0b1N0cmluZyIsImdldF9zZXJ2aWNlX2NyZWRlbnRpYWxzX3BhdGgiLCJkZXNpcmVkX3Njb3BlcyIsImRlc2lyZWRfc2NvcGUiLCJpbmNsdWRlcyIsImVycm9yIiwicm93X2NvbF90b19leGNlbF9pbmRleCIsInJvdyIsImNvbCIsImNvbFN0cmluZyIsIm1vZHVsbyIsImNvbExldHRlciIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsImNoYXJDb2RlQXQiLCJzcGxpdF90b19yb3dfY29sIiwiZXhjZWxfaW5kZXgiLCJyZWdleCIsIlJlZ0V4cCIsIm1hdGNoIiwiZXhlYyIsImV4Y2VsX3Jvd190b19pbmRleCIsInJhd19yb3ciLCJOdW1iZXIiLCJsb29rdXBfcm93X2NvbF9pbl9zaGVldCIsInNoZWV0IiwibGV0dGVycyIsImxvd2VyTGV0dGVycyIsInRvTG93ZXJDYXNlIiwicCIsImNoYXJhY3RlclZhbHVlIiwicGFyc2VfYm9vbGVhbl9jZWxsIiwidmFsdWUiLCJ0b1VwcGVyQ2FzZSIsIm5ld19udW1iZXIiLCJyZXBsYWNlIiwidGVtcG9yYXJ5X25ld19udW1iZXIiLCJwYXJzZUludCIsInBhZFN0YXJ0Iiwic3Vic3RyaW5nIiwiZm9ybWF0X3Bob25lX2Zvcl9kaXNwbGF5IiwidGVuX2RpZ2l0cyIsImhhbmRsZXIiLCJjb250ZXh0IiwiZXZlbnQiLCJjYWxsYmFjayIsInR3aWxpb1N5bmMiLCJnZXRUd2lsaW9DbGllbnQiLCJzeW5jIiwidjEiLCJzZXJ2aWNlcyIsIlNZTkNfU0lEIiwiaXNOYU4iLCJ1c2VyX2NyZWRzIl0sInNvdXJjZVJvb3QiOiIifQ==