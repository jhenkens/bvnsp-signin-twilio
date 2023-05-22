import { google, sheets_v4 } from "googleapis";
import { GoogleAuth, OAuth2Client } from "googleapis-common";

function get_sheets_service(auth: GoogleAuth | OAuth2Client) {
    return google.sheets({ version: "v4", auth: auth });
}

type FIND_PATROLLER_OPTS = {
    SHEET_ID: string;
    PHONE_NUMBER_LOOKUP_SHEET: string;
    PHONE_NUMBER_NUMBER_COLUMN: string;
    PHONE_NUMBER_NAME_COLUMN: string;
};
async function find_patroller_from_number(
    raw_number: string,
    sheets_service: sheets_v4.Sheets,
    opts: FIND_PATROLLER_OPTS
) {
    const number = sanitize_number(raw_number);
    const response = await sheets_service.spreadsheets.values.get({
        spreadsheetId: opts.SHEET_ID,
        range: opts.PHONE_NUMBER_LOOKUP_SHEET,
        valueRenderOption: "UNFORMATTED_VALUE",
    });
    if (!response.data.values) {
        throw new Error("Could not find patroller.");
    }
    const patroller = response.data.values
        .map((row) => {
            const rawNumber =
                row[excel_row_to_index(opts.PHONE_NUMBER_NUMBER_COLUMN)];
            const currentNumber =
                rawNumber != undefined ? sanitize_number(rawNumber) : rawNumber;
            const currentName =
                row[excel_row_to_index(opts.PHONE_NUMBER_NAME_COLUMN)];
            return { name: currentName, number: currentNumber };
        })
        .filter((patroller) => {
            if (patroller.number === number) {
                console.log(`Hello ${patroller.name}`);
                return true;
            }
        })[0];
    return patroller;
}

function split_to_row_col(excel_index: string) {
    const col = excel_row_to_index(excel_index[0]);
    const row = Number(excel_index[1]) - 1;
    return [row, col];
}

function lookup_row_col_in_sheet(excel_index: string, sheet: any[][]) {
    const [row, col] = split_to_row_col(excel_index);
    return sheet[row][col];
}

function excel_row_to_index(row: string) {
    return row.toLowerCase().charCodeAt(0) - "a".charCodeAt(0);
}

function sanitize_number(number: number | string) {
    let new_number = number.toString();
    new_number = new_number.replace("whatsapp:", "");
    new_number = new_number.replace(/(^\+1|\(|\)|\.|-)/g, "");
    if (new_number.startsWith("+1")) {
        new_number = new_number.substring(2);
    }
    return parseInt(new_number);
}

type PATROLLER_ROW_OPTS = {
    SECTION_DROPDOWN_COLUMN: string;
    CHECKIN_DROPDOWN_COLUMN: string;
};
function parse_patroller_row(
    index: number,
    row: string[],
    opts: PATROLLER_ROW_OPTS
) {
    return {
        index: index,
        name: row[0],
        section: row[excel_row_to_index(opts.SECTION_DROPDOWN_COLUMN)],
        checkin: row[excel_row_to_index(opts.CHECKIN_DROPDOWN_COLUMN)],
    };
}

function excel_date_to_js_date(date: number) {
    const result = new Date(0);
    result.setUTCMilliseconds(Math.round((date - 25569) * 86400 * 1000));
    // console.log(`DEBUG: excel_date_to_js_date (${result})`)
    return result;
}

function parse_time_to_utc(date: Date) {
    const result = new Date(date.toUTCString().replace(" GMT", " PST"));
    // console.log(`DEBUG: parse_time_to_utc (${result})`)
    return result;
}

function strip_datetime_to_date(date: Date) {
    const result = new Date(
        date.toLocaleDateString("en-US", { timeZone: "America/Los_Angeles" })
    );
    // console.log(`DEBUG: strip_datetime_to_date (${result})`)
    return result;
}

async function logAction(
    patroller_name: string,
    sheets_service: sheets_v4.Sheets,
    sheet_id: string,
    user_statistics_sheet: string,
    action: string
) {
    await sheets_service.spreadsheets.values.append({
        spreadsheetId: sheet_id,
        range: user_statistics_sheet,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [[patroller_name, new Date(), action]] },
    });
}

export {
    excel_row_to_index,
    parse_patroller_row,
    excel_date_to_js_date,
    parse_time_to_utc,
    strip_datetime_to_date,
    sanitize_number,
    split_to_row_col,
    lookup_row_col_in_sheet,
    find_patroller_from_number,
    logAction,
    get_sheets_service,
};
