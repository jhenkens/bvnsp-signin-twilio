import { lookup_row_col_in_sheet, excel_row_to_index } from "../utils/util";
import GoogleSheetsSpreadsheetTab from "../utils/google_sheets_spreadsheet_tab";

import { sanitize_date } from "../utils/datetime_util";
import { LoginSheetConfig, PatrollerRowConfig } from "../env/handler_config";
import { sheets_v4 } from "googleapis";

export type PatrollerRow = {
    index: number;
    name: string;
    category: string;
    section: string;
    checkin: string;
};

export default class LoginSheet {
    login_sheet: GoogleSheetsSpreadsheetTab;
    checkin_count_sheet: GoogleSheetsSpreadsheetTab;
    config: LoginSheetConfig;
    rows?: any[][] | null = null;
    checkin_count: number | undefined = undefined;
    allowed_categories = ["DR", "P", "C"];
    patrollers: PatrollerRow[] = [];

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
    }

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

    get sheet_date() {
        return sanitize_date(
            lookup_row_col_in_sheet(this.config.SHEET_DATE_CELL, this.rows!)
        );
    }
    get current_date() {
        return sanitize_date(
            lookup_row_col_in_sheet(this.config.CURRENT_DATE_CELL, this.rows!)
        );
    }
    get is_current() {
        return this.sheet_date.getTime() === this.current_date.getTime();
    }
    try_find_patroller(name: string) {
        const patrollers = this.patrollers.filter((x) => x.name === name);
        if (patrollers.length !== 1) {
            return "not_found";
        }
        return patrollers[0];
    }
    find_patroller(name: string) {
        const result = this.try_find_patroller(name);
        if (result === "not_found") {
            throw new Error(`Could not find ${name} in login sheet`);
        }
        return result;
    }

    get_on_duty_patrollers(): PatrollerRow[] {
        if (!this.is_current) {
            throw new Error("Login sheet is not current");
        }
        return this.patrollers.filter((x) => x.checkin);
    }

    async checkin(patroller_status: PatrollerRow, new_checkin_value: string) {
        if (!this.is_current) {
            throw new Error("Login sheet is not current");
        }
        console.log(`Existing status: ${JSON.stringify(patroller_status)}`);

        const row = patroller_status.index + 1; // programming -> excel lookup
        const range = `${this.config.CHECKIN_DROPDOWN_COLUMN}${row}`;

        await this.login_sheet.update_values(range, [[new_checkin_value]]);
    }

    private parse_patroller_row(
        index: number,
        row: string[],
        opts: PatrollerRowConfig
    ): PatrollerRow | null {
        if (row.length < 2) {
            return null;
        }
        const potentialCategory = String(row[1]);
        if (
            !this.allowed_categories.includes(potentialCategory.toUpperCase())
        ) {
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
