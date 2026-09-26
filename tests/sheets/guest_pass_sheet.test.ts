import { GuestPassSheet, UsedAndAvailablePasses } from "../../src/sheets/guest_pass_sheet";
import { CONFIG } from "../../src/env/handler_config";
import GoogleSheetsSpreadsheetTab from "../../src/utils/google_sheets_spreadsheet_tab";
import { describe, beforeEach, afterEach, it, expect, jest } from "@jest/globals";

afterEach(() => {
    jest.restoreAllMocks();
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Build a UsedAndAvailablePasses with sensible defaults so each test only has
 * to supply the fields it cares about.
 */
function make_passes(overrides: {
    available?: number;
    used_today?: number;
    used_season?: number;
    eligible?: any;
    eligible_reason?: any;
} = {}): UsedAndAvailablePasses {
    const available = overrides.available ?? 0;
    const used_today = overrides.used_today ?? 0;
    const used_season = overrides.used_season ?? 2;
    // Use `"eligible" in overrides` so that explicitly passing undefined is preserved
    // (destructuring defaults would silently replace it with true).
    const eligible = "eligible" in overrides ? overrides.eligible : true;
    const eligible_reason = overrides.eligible_reason ?? "";
    // Row layout: [name, eligible, eligible_reason, available, used_today, used_season, ...dates]
    // Indices:       A=0   B=1       C=2              D=3        E=4         F=5
    const row = ["Test Patroller", eligible, eligible_reason, available, used_today, used_season];
    return new UsedAndAvailablePasses(
        row,
        1,
        eligible,
        eligible_reason,
        available,
        used_today,
        used_season
    );
}

// ---------------------------------------------------------------------------
// UsedAndAvailablePasses.get_prompt()
// ---------------------------------------------------------------------------

describe("UsedAndAvailablePasses.get_prompt", () => {
    it("should show pass count when passes are available", () => {
        const passes = make_passes({ available: 2, used_today: 1, used_season: 3, eligible: true });
        const { response } = passes.get_prompt();
        expect(response).toContain("3 of 5 guest passes this season");
        expect(response).toContain("1 used today");
    });

    it("should show ineligibility message when eligible is boolean false", () => {
        const passes = make_passes({ available: 0, eligible: false, eligible_reason: "CPR expired" });
        const { response } = passes.get_prompt();
        expect(response).toBe("You are not eligible for guest passes. Reason: CPR expired");
    });

    it("should show ineligibility message when eligible is the string \"FALSE\"", () => {
        const passes = make_passes({ available: 0, eligible: "FALSE", eligible_reason: "Not active" });
        const { response } = passes.get_prompt();
        expect(response).toBe("You are not eligible for guest passes. Reason: Not active");
    });

    it("should show ineligibility message when eligible is the string \"false\" (case-insensitive)", () => {
        const passes = make_passes({ available: 0, eligible: "false", eligible_reason: "Suspended" });
        // parse_boolean_cell("false") → false → ineligible path
        const { response } = passes.get_prompt();
        expect(response).toBe("You are not eligible for guest passes. Reason: Suspended");
    });

    it("should show 'no passes available' when eligible is true and passes are exhausted", () => {
        const passes = make_passes({ available: 0, eligible: true });
        const { response } = passes.get_prompt();
        expect(response).toBe("You do not have any guest passes available today");
    });

    it("should show 'no passes available' when eligible is the string \"TRUE\"", () => {
        const passes = make_passes({ available: 0, eligible: "TRUE" });
        const { response } = passes.get_prompt();
        expect(response).toBe("You do not have any guest passes available today");
    });

    it("should show 'no passes available' when eligible is null", () => {
        const passes = make_passes({ available: 0, eligible: null });
        const { response } = passes.get_prompt();
        // null → parse_boolean_cell returns false → ineligible path
        expect(response).toContain("not eligible");
    });

    it("should show 'no passes available' when eligible is undefined", () => {
        const passes = make_passes({ available: 0, eligible: undefined });
        const { response } = passes.get_prompt();
        expect(response).toContain("not eligible");
    });
});

// ---------------------------------------------------------------------------
// PassSheet.set_used_guest_passes() — via GuestPassSheet
// ---------------------------------------------------------------------------

describe("PassSheet.set_used_guest_passes", () => {
    let sheet: GuestPassSheet;

    beforeEach(() => {
        sheet = new GuestPassSheet(null, CONFIG);
    });

    it("should throw an ineligibility error when eligible is false", async () => {
        const passes = make_passes({ available: 0, eligible: false, eligible_reason: "CPR expired" });
        await expect(sheet.set_used_guest_passes(passes)).rejects.toThrow(
            "Patroller is not eligible for guest passes. Reason: CPR expired"
        );
    });

    it("ineligibility error should take priority even when available > 0", async () => {
        // Defensive: available=2 but eligible=false — eligibility check fires first.
        const passes = make_passes({ available: 2, eligible: false, eligible_reason: "On hold" });
        await expect(sheet.set_used_guest_passes(passes)).rejects.toThrow(
            "not eligible for guest passes"
        );
    });

    it("should throw 'not enough passes' when eligible is true but available < 1", async () => {
        const passes = make_passes({ available: 0, eligible: true });
        await expect(sheet.set_used_guest_passes(passes)).rejects.toThrow(
            "Not enough available passes"
        );
    });

    it("should NOT throw when eligible is true and passes are available", async () => {
        // Spy on update_values so the actual Sheets API is never called.
        jest.spyOn(GoogleSheetsSpreadsheetTab.prototype, "update_values")
            .mockResolvedValue(undefined as any);

        const passes = make_passes({ available: 1, used_today: 0, used_season: 1, eligible: true });
        await expect(sheet.set_used_guest_passes(passes)).resolves.not.toThrow();
    });
});

// ---------------------------------------------------------------------------
// GuestPassSheet.get_available_and_used_passes() — sheet lookup
// ---------------------------------------------------------------------------

describe("GuestPassSheet.get_available_and_used_passes", () => {
    let sheet: GuestPassSheet;

    beforeEach(() => {
        sheet = new GuestPassSheet(null, CONFIG);
    });

    it("should return null when patroller is not found in the sheet", async () => {
        jest.spyOn(GoogleSheetsSpreadsheetTab.prototype, "get_sheet_row_for_patroller")
            .mockResolvedValue(null);

        const result = await sheet.get_available_and_used_passes("Unknown Patroller");
        expect(result).toBeNull();
    });

    it("should populate eligible and eligible_reason from the correct columns", async () => {
        // Row layout matching CONFIG: A=name, B=eligible, C=reason, D=available, E=used_today, F=used_season
        const mockRow = ["Jane Smith", true, "CPR current", 3, 1, 4];
        jest.spyOn(GoogleSheetsSpreadsheetTab.prototype, "get_sheet_row_for_patroller")
            .mockResolvedValue({ row: mockRow, index: 2 });

        const result = await sheet.get_available_and_used_passes("Jane Smith");

        expect(result).not.toBeNull();
        expect(result!.eligible).toBe(true);
        expect(result!.eligible_reason).toBe("CPR current");
        expect(result!.available).toBe(3);
        expect(result!.used_today).toBe(1);
        expect(result!.used_season).toBe(4);
    });

    it("should set eligible to false when the sheet checkbox is boolean false", async () => {
        const mockRow = ["John Doe", false, "Membership lapsed", 0, 0, 0];
        jest.spyOn(GoogleSheetsSpreadsheetTab.prototype, "get_sheet_row_for_patroller")
            .mockResolvedValue({ row: mockRow, index: 3 });

        const result = await sheet.get_available_and_used_passes("John Doe");

        expect(result!.eligible).toBe(false);
        expect(result!.eligible_reason).toBe("Membership lapsed");
        expect(result!.available).toBe(0);
    });

    it("should set eligible to false when the sheet returns the string \"FALSE\"", async () => {
        const mockRow = ["Pat Riley", "FALSE", "Inactive", 0, 0, 0];
        jest.spyOn(GoogleSheetsSpreadsheetTab.prototype, "get_sheet_row_for_patroller")
            .mockResolvedValue({ row: mockRow, index: 4 });

        const result = await sheet.get_available_and_used_passes("Pat Riley");

        expect(result!.eligible).toBe(false);
        expect(result!.eligible_reason).toBe("Inactive");
    });

    it("should set eligible to true when the sheet returns the string \"TRUE\"", async () => {
        const mockRow = ["Alice Brown", "TRUE", "", 2, 0, 1];
        jest.spyOn(GoogleSheetsSpreadsheetTab.prototype, "get_sheet_row_for_patroller")
            .mockResolvedValue({ row: mockRow, index: 5 });

        const result = await sheet.get_available_and_used_passes("Alice Brown");

        expect(result!.eligible).toBe(true);
        expect(result!.eligible_reason).toBe("");
    });
});

// ---------------------------------------------------------------------------
// GuestPassSheet column getters
// ---------------------------------------------------------------------------

describe("GuestPassSheet column getters", () => {
    it("should expose eligible_column from config", () => {
        const sheet = new GuestPassSheet(null, CONFIG);
        expect(sheet.eligible_column).toBe(CONFIG.GUEST_PASS_ELIGIBLE_COLUMN);
    });

    it("should expose eligible_reason_column from config", () => {
        const sheet = new GuestPassSheet(null, CONFIG);
        expect(sheet.eligible_reason_column).toBe(CONFIG.GUEST_PASS_ELIGIBLE_REASON_COLUMN);
    });
});



