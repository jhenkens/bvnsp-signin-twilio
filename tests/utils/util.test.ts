import {
    split_to_row_col,
    excel_row_to_index,
    lookup_row_col_in_sheet,
    sanitize_phone_number,
} from "../../src/utils/util"


test("excel_row_to_index should convert letters to index", () => {
    expect(excel_row_to_index("A")).toBe(0);
    expect(excel_row_to_index("Z")).toBe(25);
    expect(excel_row_to_index("AA")).toBe(26);
    expect(excel_row_to_index("AZ")).toBe(51);
    expect(excel_row_to_index("ZZ")).toBe(701); // (26*26 + 25)
});

test("split_to_row_col should return an array index", () => {
    expect(split_to_row_col("A1")).toStrictEqual([0,0]);
    expect(split_to_row_col("B1")).toStrictEqual([0,1]);
    expect(split_to_row_col("A2")).toStrictEqual([1,0]);
    expect(split_to_row_col("B2")).toStrictEqual([1,1]);
    expect(split_to_row_col("Z30")).toStrictEqual([29,25]);
    expect(split_to_row_col("AA30")).toStrictEqual([29,26]);
});

test("split_to_row_col should throw errors when not valid input", () => {
    expect(() => split_to_row_col("2")).toThrow();
    expect(() => split_to_row_col("A")).toThrow();
    expect(() => split_to_row_col("2A")).toThrow();
    expect(() => split_to_row_col("A0")).toThrow();
});

test("lookup_row_col_in_sheet should return the right value", () => {
    const table = [
        ["A1_Val", "B1_Val", "C1_Val"],
        ["A2_Val", "B2_Val", "C2_Val"],
        ["A3_Val", "B3_Val", "C3_Val"],
    ];
    expect(lookup_row_col_in_sheet("A1", table)).toBe("A1_Val");
    expect(lookup_row_col_in_sheet("C1", table)).toBe("C1_Val");
    expect(lookup_row_col_in_sheet("B2", table)).toBe("B2_Val");
});

test("lookup_row_col_in_sheet should return undefined if out of range", () => {
    const table = [[0]];
    expect(lookup_row_col_in_sheet("B1", table)).toBeUndefined();
    expect(lookup_row_col_in_sheet("A2", table)).toBeUndefined();
});

test("sanitize_phone_number should return a consistent US phone number", () => {
    expect(sanitize_phone_number(".+10123456789")).toBe(123456789);
    expect(sanitize_phone_number("+1(012)345-6789")).toBe(123456789);
    expect(sanitize_phone_number("(012)345-6789")).toBe(123456789);
    expect(sanitize_phone_number("012-345-6789")).toBe(123456789);
    expect(sanitize_phone_number("012.345.6789")).toBe(123456789);
    expect(sanitize_phone_number("whatsapp:012.345.6789")).toBe(123456789);
});