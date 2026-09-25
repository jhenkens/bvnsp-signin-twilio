import { sheets_v4 } from "googleapis";
import { GuestPassesConfig } from "../env/handler_config";
import { excel_row_to_index, row_col_to_excel_index, parse_boolean_cell } from "../utils/util";
import GoogleSheetsSpreadsheetTab from "../utils/google_sheets_spreadsheet_tab";
import { format_date_for_spreadsheet_value } from "../utils/datetime_util";
import { build_passes_string } from "../utils/guest_passes";
import { BVNSPResponse } from "../handlers/bvnsp_handler";

export class UsedAndAvailablePasses {
    row: any[];
    index: number;
    eligible: boolean;
    eligible_reason: string;
    available: number;
    used_today: number;
    used_season: number;

    constructor(
        row: any[],
        index: number,
        eligible: any,
        eligible_reason: any,
        available: any,
        used_today: any,
        used_season: any
    ) {
        this.row = row;
        this.index = index;
        this.eligible = parse_boolean_cell(eligible);
        this.eligible_reason = String(eligible_reason ?? "");
        this.available = Number(available);
        this.used_today = Number(used_today);
        this.used_season = Number(used_season);
    }

    get_prompt(): BVNSPResponse {
        if (this.available > 0) {
            const response = build_passes_string(
                this.used_season,
                this.available + this.used_season,
                this.used_today,
                true
            );
            return {
                response,
            };
        }
        if (!this.eligible) {
            return {
                response: `You are not eligible for guest passes. Reason: ${this.eligible_reason}`,
            };
        }
        return {
            response: "You do not have any guest passes available today",
        };
    }
}

export abstract class PassSheet {
    sheet: GoogleSheetsSpreadsheetTab;

    constructor(sheet: GoogleSheetsSpreadsheetTab) {
        this.sheet = sheet;
    }

    abstract get eligible_column(): string;
    abstract get eligible_reason_column(): string;
    abstract get available_column(): string;
    abstract get used_today_column(): string;
    abstract get used_season_column(): string;
    abstract get name_column(): string;
    abstract get start_index(): number;
    abstract get sheet_name(): string;

    async get_available_and_used_passes(
        patroller_name: string
    ): Promise<UsedAndAvailablePasses | null> {
        const patroller_row = await this.sheet.get_sheet_row_for_patroller(
            patroller_name,
            this.name_column
        );
        if (patroller_row == null) {
            return null;
        }
        const eligible =
            patroller_row.row[excel_row_to_index(this.eligible_column)];
        const eligible_reason =
            patroller_row.row[excel_row_to_index(this.eligible_reason_column)];
        const current_day_available_passes =
            patroller_row.row[excel_row_to_index(this.available_column)];
        const current_day_used_passes =
            patroller_row.row[excel_row_to_index(this.used_today_column)];
        const current_season_used_passes =
            patroller_row.row[excel_row_to_index(this.used_season_column)];
        return new UsedAndAvailablePasses(
            patroller_row.row,
            patroller_row.index,
            eligible,
            eligible_reason,
            current_day_available_passes,
            current_day_used_passes,
            current_season_used_passes
        );
    }

    async set_used_guest_passes(
        patroller_row: UsedAndAvailablePasses,
    ) {
        if (!patroller_row.eligible) {
            throw new Error(
                `Patroller is not eligible for guest passes. Reason: ${patroller_row.eligible_reason}`
            );
        }
        if (patroller_row.available < 1) {
            throw new Error(
                `Not enough available passes: Available: ${patroller_row.available}, Used this season:  ${patroller_row.used_season}, Used today: ${patroller_row.used_today}`
            );
        }

        const rownum = patroller_row.index;
        const start_index = this.start_index;
        const prior_length = patroller_row.row.length - start_index;
        const current_date_string = format_date_for_spreadsheet_value(new Date());

        const new_vals = patroller_row.row
            .slice(start_index)
            .map((x) => x?.toString());

        // Record only the date of the use; no guest name is stored.
        new_vals.push(current_date_string);

        const update_length = Math.max(prior_length, new_vals.length);
        while (new_vals.length < update_length) {
            new_vals.push("");
        }

        const end_index = start_index + update_length - 1;
        const range = `${this.sheet.sheet_name}!${row_col_to_excel_index(
            rownum,
            start_index
        )}:${row_col_to_excel_index(rownum, end_index)}`;

        console.log(`Updating ${range} with ${new_vals.length} values`);
        await this.sheet.update_values(range, [new_vals]);
    }
}

export class GuestPassSheet extends PassSheet {
    config: GuestPassesConfig;

    constructor(
        sheets_service: sheets_v4.Sheets | null,
        config: GuestPassesConfig
    ) {
        super(
            new GoogleSheetsSpreadsheetTab(
                sheets_service,
                config.SHEET_ID,
                config.GUEST_PASS_SHEET
            )
        );
        this.config = config;
    }

    get start_index(): number {
        return excel_row_to_index(
            this.config.GUEST_PASS_SHEET_DATES_STARTING_COLUMN
        );
    }

    get sheet_name(): string {
        return this.config.GUEST_PASS_SHEET;
    }

    get eligible_column(): string {
        return this.config.GUEST_PASS_ELIGIBLE_COLUMN;
    }

    get eligible_reason_column(): string {
        return this.config.GUEST_PASS_ELIGIBLE_REASON_COLUMN;
    }

    get available_column(): string {
        return this.config.GUEST_PASS_SHEET_AVAILABLE_COLUMN;
    }

    get used_today_column(): string {
        return this.config.GUEST_PASS_SHEET_USED_TODAY_COLUMN;
    }

    get used_season_column(): string {
        return this.config.GUEST_PASS_SHEET_USED_SEASON_COLUMN;
    }

    get name_column(): string {
        return this.config.GUEST_PASS_SHEET_NAME_COLUMN;
    }
}
