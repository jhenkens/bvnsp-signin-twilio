function excel_date_to_js_date(date: number) {
    const result = new Date(0);
    result.setUTCMilliseconds(Math.round((date - 25569) * 86400 * 1000));
    return result;
}

function change_timezone_to_pst(date: Date) {
    const result = new Date(date.toUTCString().replace(" GMT", " PST"));
    return result;
}

function strip_datetime_to_date(date: Date) {
    const result = new Date(
        date.toLocaleDateString("en-US", { timeZone: "America/Los_Angeles" })
    );
    return result;
}

function sanitize_date(date: number) {
    const result = strip_datetime_to_date(
        change_timezone_to_pst(excel_date_to_js_date(date))
    );
    return result;
}

function format_date_for_spreadsheet_value(date: Date) {
    const datestr = date
        .toLocaleDateString()
        .split("/")
        .map((x) => x.padStart(2, "0"))
        .join("");
    return datestr;
}

function filter_list_to_endswith_date(list: any[], date: Date) {
    const datestr = format_date_for_spreadsheet_value(date);
    return list.map((x) => x?.toString()).filter((x) => x?.endsWith(datestr));
}

function filter_list_to_endswith_current_day(list: any[]) {
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
