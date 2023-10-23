import {
    excel_date_to_js_date,
    change_timezone_to_pst,
    strip_datetime_to_date,
    sanitize_date,
    format_date_for_spreadsheet_value,
    filter_list_to_endswith_date,
} from "../../src/utils/datetime_util";

test("excel_date_to_js_date should return proper date", () => {
    expect(excel_date_to_js_date(25569 + 1)).toStrictEqual(
        new Date("1970-01-02")
    );
});

test("strip_datetime_to_date should remove time", () => {
    expect(
        strip_datetime_to_date(new Date("1970-01-02 10:10:10"))
    ).toStrictEqual(new Date("1970-01-02 PST"));
});

test("change_timezone_to_pst should change timezone to PST", () => {
    expect(
        change_timezone_to_pst(new Date("1970-01-02 10:10:10 UTC"))
    ).toStrictEqual(new Date("1970-01-02 10:10:10 PST"));
});

test("sanitize_date should return a date-only, PST object", () => {
    expect(sanitize_date(25570.5)).toStrictEqual(new Date("1970-01-02 PST"));
});

test("get_current_date_string should return a date as used in the spreadsheet", () => {
    expect(
        format_date_for_spreadsheet_value(new Date("1970-01-02 PST"))
    ).toStrictEqual("01021970");
});

test("filter_list_to_endswith_date should properly filter list", () => {
    expect(
        filter_list_to_endswith_date(["01021970", "H01021970", "01021971"], new Date("1970-01-02 PST"))
    ).toHaveLength(2);
});
