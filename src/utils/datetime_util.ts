/**
 * Convert an Excel date to a JavaScript Date object.
 * @param {number} date - The Excel date.
 * @returns {Date} The JavaScript Date object.
 */
function excel_date_to_js_date(date: number): Date {
    const result = new Date(0);
    result.setUTCMilliseconds(Math.round((date - 25569) * 86400 * 1000));
    return result;
}

/**
 * Change the timezone of a Date object to PST.
 * @param {Date} date - The Date object.
 * @returns {Date} The Date object with the timezone set to PST.
 */
function change_timezone_to_pst(date: Date): Date {
    const result = new Date(date.toUTCString().replace(" GMT", " PST"));
    return result;
}

/**
 * Strip the time from a Date object, keeping only the date.
 * @param {Date} date - The Date object.
 * @returns {Date} The Date object with the time stripped.
 */
function strip_datetime_to_date(date: Date): Date {
    const result = new Date(
        date.toLocaleDateString("en-US", { timeZone: "America/Los_Angeles" })
    );
    return result;
}

/**
 * Sanitize a date by converting it from an Excel date and stripping the time.
 * @param {number} date - The Excel date.
 * @returns {Date} The sanitized Date object.
 */
function sanitize_date(date: number): Date {
    const result = strip_datetime_to_date(
        change_timezone_to_pst(excel_date_to_js_date(date))
    );
    return result;
}

/**
 * Format a Date object for use in a spreadsheet value.
 * @param {Date} date - The Date object.
 * @returns {string} The formatted date string in PST
 */
function format_date_for_spreadsheet_value(date: Date): string {
     const datestr = date
         .toLocaleDateString("en-US", { timeZone: "America/Los_Angeles" })
        .split("/")
        .map((x) => x.padStart(2, "0"))
        .join("");
    return datestr;
}

/**
 * Filter a list to include only items that end with a specific date.
 * @param {any[]} list - The list to filter.
 * @param {Date} date - The date to filter by.
 * @returns {any[]} The filtered list.
 */
function filter_list_to_endswith_date(list: any[], date: Date): any[] {
    const datestr = format_date_for_spreadsheet_value(date);
    return list.map((x) => x?.toString()).filter((x) => x?.endsWith(datestr));
}

/**
 * Filter a list to include only items that end with the current date.
 * @param {any[]} list - The list to filter.
 * @returns {any[]} The filtered list.
 */
function filter_list_to_endswith_current_day(list: any[]): any[] {
    return filter_list_to_endswith_date(list, new Date());
}

export {
    sanitize_date,
    excel_date_to_js_date,
    change_timezone_to_pst,
    strip_datetime_to_date,
    format_date_for_spreadsheet_value,
    filter_list_to_endswith_date,
    filter_list_to_endswith_current_day,
};