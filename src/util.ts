import { google, sheets_v4 } from "googleapis";

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
        .filter((patroller) => (patroller.number === number))[0];
    return patroller;
}
type PATROLLER_SEASON_OPTS = {
    SHEET_ID: string;
    SEASON_SHEET: string;
    SEASON_SHEET_DAYS_COLUMN: string;
    SEASON_SHEET_NAME_COLUMN: string;
};

async function get_patrolled_days(
    patroller_name: string,
    sheets_service: sheets_v4.Sheets,
    opts: PATROLLER_SEASON_OPTS
) {
    const response = await sheets_service.spreadsheets.values.get({
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

    if(!patroller_row){
        console.log("Couldn't find days for patroller" + patroller_name)
        return -1;
    }

    const currentNumber =
        patroller_row[excel_row_to_index(opts.SEASON_SHEET_DAYS_COLUMN)];
    const currentDay = patroller_row
        .map((x) => x?.toString())
        .filter((x) => x?.endsWith(datestr))
        .map((x) => (x?.startsWith("H") ? 0.5 : 1))
        .reduce((x, y, i) => x + y, 0);
    
    const daysBeforeToday = currentNumber - currentDay;
    return daysBeforeToday;
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
    NAME_COLUMN: string;
    CATEGORY_COLUMN: string;
    SECTION_DROPDOWN_COLUMN: string;
    CHECKIN_DROPDOWN_COLUMN: string;
};
type PatrollerRow = {
    index: number,
    name: string,
    category: string,
    section: string,
    checkin: string
}
function parse_patroller_row(
    index: number,
    row: string[],
    opts: PATROLLER_ROW_OPTS
): PatrollerRow {
    return {
        index: index,
        name: row[excel_row_to_index(opts.NAME_COLUMN)],
        category: row[excel_row_to_index(opts.CATEGORY_COLUMN)],
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
    get_patrolled_days,
    FIND_PATROLLER_OPTS,
    PatrollerRow,
    PATROLLER_SEASON_OPTS,
};
