import { lookup_row_col_in_sheet, excel_row_to_index } from "../utils/util";
import GoogleSheetsSpreadsheetTab from "../utils/google_sheets_spreadsheet_tab";
import { sanitize_date } from "../utils/datetime_util";
import { LoginSheetConfig, PatrollerRowConfig } from "../env/handler_config";
import { sheets_v4 } from "googleapis";

/**
 * Represents a row of patroller data.
 * @typedef {Object} PatrollerRow
 * @property {number} index - The index of the row.
 * @property {string} name - The name of the patroller.
 * @property {string} category - The category of the patroller.
 * @property {string} section - The section of the patroller.
 * @property {string} checkin - The check-in status of the patroller.
 */
export type PatrollerRow = {
    index: number;
    name: string;
    category: string;
    section: string;
    checkin: string;
};

/**
 * Class representing a login sheet in Google Sheets.
 */
export default class LoginSheet {
    login_sheet: GoogleSheetsSpreadsheetTab;
    checkin_count_sheet: GoogleSheetsSpreadsheetTab;
    config: LoginSheetConfig;
    rows?: any[][] | null = null;
    checkin_count: number | undefined = undefined;
    patrollers: PatrollerRow[] = [];

    /**
     * Creates an instance of LoginSheet.
     * @param {sheets_v4.Sheets | null} sheets_service - The Google Sheets API service.
     * @param {LoginSheetConfig} config - The configuration for the login sheet.
     */
    constructor(
        sheets_service: sheets_v4.Sheets | null,
        config: LoginSheetConfig
    ) {
        this.login_sheet = new GoogleSheetsSpreadsheetTab(
            sheets_service,
            config.SHEET_ID,
            config.LOGIN_SHEET_LOOKUP
        );
        this.checkin_count_sheet = new GoogleSheetsSpreadsheetTab(
            sheets_service,
            config.SHEET_ID,
            config.CHECKIN_COUNT_LOOKUP
        );
        this.config = config;
    }

    /**
     * Refreshes the data from the Google Sheets.
     * @returns {Promise<void>}
     */
    async refresh() {
        this.rows = await this.login_sheet.get_values(
            this.config.LOGIN_SHEET_LOOKUP
        );
        this.checkin_count = (await this.checkin_count_sheet.get_values(
            this.config.CHECKIN_COUNT_LOOKUP
        ))![0][0];
        this.patrollers = this.rows!.map((x, i) =>
            this.parse_patroller_row(i, x, this.config)
        ).filter((x) => x != null) as PatrollerRow[];
        console.log("Refreshing Patrollers: " + this.patrollers);
    }

    /**
     * Gets the archived status of the login sheet.
     * @returns {boolean} True if the sheet is archived, otherwise false.
     */
    get archived() {
        const archived = lookup_row_col_in_sheet(
            this.config.ARCHIVED_CELL,
            this.rows!
        );
        return (
            (archived === undefined && this.checkin_count === 0) ||
            archived.toLowerCase() === "yes"
        );
    }

    /**
     * Gets the date of the sheet.
     * @returns {Date} The date of the sheet.
     */
    get sheet_date() {
        return sanitize_date(
            lookup_row_col_in_sheet(this.config.SHEET_DATE_CELL, this.rows!)
        );
    }

    /**
     * Gets the current date.
     * @returns {Date} The current date.
     */
    get current_date() {
        return sanitize_date(
            lookup_row_col_in_sheet(this.config.CURRENT_DATE_CELL, this.rows!)
        );
    }

    /**
     * Checks if the sheet date is the current date.
     * @returns {boolean} True if the sheet date is the current date, otherwise false.
     */
    get is_current() {
        return this.sheet_date.getTime() === this.current_date.getTime();
    }

    /**
     * Tries to find a patroller by name.
     * @param {string} name - The name of the patroller.
     * @returns {PatrollerRow | "not_found"} The patroller row or "not_found".
     */
    try_find_patroller(name: string) {
        const patrollers = this.patrollers.filter((x) => x.name === name);
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
     */
    find_patroller(name: string) {
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
     */
    get_on_duty_patrollers(): PatrollerRow[] {
        if (!this.is_current) {
            throw new Error("Login sheet is not current");
        }
        return this.patrollers.filter((x) => x.checkin);
    }

    /**
     * Checks in a patroller with a new check-in value.
     * @param {PatrollerRow} patroller_status - The status of the patroller.
     * @param {string} new_checkin_value - The new check-in value.
     * @returns {Promise<void>}
     * @throws {Error} If the login sheet is not current.
     */
    async checkin(patroller_status: PatrollerRow, new_checkin_value: string) {
        if (!this.is_current) {
            throw new Error("Login sheet is not current");
        }
        console.log(`Existing status: ${JSON.stringify(patroller_status)}`);

        const row = patroller_status.index + 1; // programming -> excel lookup
        const range = `${this.config.CHECKIN_DROPDOWN_COLUMN}${row}`;

        await this.login_sheet.update_values(range, [[new_checkin_value]]);
    }

    /**
     * Parses a row of patroller data.
     * @param {number} index - The index of the row.
     * @param {string[]} row - The row data.
     * @param {PatrollerRowConfig} opts - The configuration options for the patroller row.
     * @returns {PatrollerRow | null} The parsed patroller row or null if invalid.
     */
    private parse_patroller_row(
        index: number,
        row: string[],
        opts: PatrollerRowConfig
    ): PatrollerRow | null {
        if (row.length < 4) {
            return null;
        }
        if (index < 3){
            return null;
        }
        return {
            index: index,
            name: row[excel_row_to_index(opts.NAME_COLUMN)],
            category: row[excel_row_to_index(opts.CATEGORY_COLUMN)],
            section: row[excel_row_to_index(opts.SECTION_DROPDOWN_COLUMN)],
            checkin: row[excel_row_to_index(opts.CHECKIN_DROPDOWN_COLUMN)],
        };
    }
}