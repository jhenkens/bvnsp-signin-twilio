import { sheets_v4 } from "googleapis";
import {
    parse_patroller_row,
    lookup_row_col_in_sheet,
    strip_datetime_to_date,
    parse_time_to_utc,
    excel_date_to_js_date,
} from "./util";

function sanitize_date(date: number) {
    const result = strip_datetime_to_date(
        parse_time_to_utc(excel_date_to_js_date(date))
    );
    return result;
}

type LoginSheetOpts = {
    SHEET_ID: string;
    LOGIN_SHEET_LOOKUP: string;
    NUMBER_CHECKINS_LOOKUP: string;
    ARCHIVED_CELL: string;
    SHEET_DATE_CELL: string;
    CURRENT_DATE_CELL: string;
    SECTION_DROPDOWN_COLUMN: string;
    CHECKIN_DROPDOWN_COLUMN: string;
};
class LoginSheet {
    sheets_service: sheets_v4.Sheets;
    opts: LoginSheetOpts;
    rows?: any[][] | null;
    number_checkins: any;
    constructor(sheets_service: sheets_v4.Sheets, context: LoginSheetOpts) {
        this.opts = context;
        this.sheets_service = sheets_service;
        this.rows = null;
        this.number_checkins = null;
    }
    async refresh() {
        this.rows = (
            await this.sheets_service.spreadsheets.values.get({
                spreadsheetId: this.opts.SHEET_ID,
                range: this.opts.LOGIN_SHEET_LOOKUP,
                valueRenderOption: "UNFORMATTED_VALUE",
            })
        ).data.values;
        this.number_checkins = (
            await this.sheets_service.spreadsheets.values.get({
                spreadsheetId: this.opts.SHEET_ID,
                range: this.opts.NUMBER_CHECKINS_LOOKUP,
                valueRenderOption: "UNFORMATTED_VALUE",
            })
        ).data.values![0][0];
    }
    get archived() {
        const archived = lookup_row_col_in_sheet(
            this.opts.ARCHIVED_CELL,
            this.rows!
        );
        return (
            (archived === undefined && this.number_checkins === 0) ||
            archived.toLowerCase() === "yes"
        );
    }
    get sheet_date() {
        return sanitize_date(
            lookup_row_col_in_sheet(this.opts.SHEET_DATE_CELL, this.rows!)
        );
    }
    get current_date() {
        return sanitize_date(
            lookup_row_col_in_sheet(this.opts.CURRENT_DATE_CELL, this.rows!)
        );
    }
    get is_current() {
        return this.sheet_date.getTime() === this.current_date.getTime();
    }
    try_find_patroller(name: string) {
        const index = this.rows!.findIndex((row) => row[0] === name);
        if (index === -1) {
            return "not_found";
        }
        return parse_patroller_row(index, this.rows![index], this.opts);
    }
    find_patroller(name: string) {
        const result = this.try_find_patroller(name);
        if (result === "not_found") {
            throw new Error(`Could not find ${name} in login sheet`);
        }
        return result;
    }
}

module.exports = LoginSheet;
