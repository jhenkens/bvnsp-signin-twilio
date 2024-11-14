import { sheets_v4 } from "googleapis";
import { CompPassesConfig, ManagerPassesConfig } from "../env/handler_config";
import { excel_row_to_index, row_col_to_excel_index } from "../utils/util";
import GoogleSheetsSpreadsheetTab from "../utils/google_sheets_spreadsheet_tab";
import { format_date_for_spreadsheet_value } from "../utils/datetime_util";
import {
    build_passes_string,
    CompPassType,
    get_comp_pass_description,
} from "../utils/comp_passes";
import { BVNSPCheckinResponse } from "../handlers/bvnsp_checkin_handler";

export class UsedAndAvailablePasses {
    row: any[];
    index: number;
    available: number;
    used_today: number;
    used_season: number;
    comp_pass_type: CompPassType;
    constructor(
        row: any[],
        index: number,
        available: any,
        used_today: any,
        used_season: any,
        type: CompPassType
    ) {
        this.row = row;
        this.index = index;
        this.available = Number(available);
        this.used_today = Number(used_today);
        this.used_season = Number(used_season);
        this.comp_pass_type = type;
    }

    get_prompt(): BVNSPCheckinResponse {
        if (this.available > 0) {
            let response: string | null = null;
            let pass_string: string = get_comp_pass_description(
                this.comp_pass_type
            );

            response = build_passes_string(
                this.used_season,
                this.available + this.used_season,
                this.used_today,
                `${pass_string}es`,
                true
            );
            response +=
                "\n\n" +
                `Enter the first and last name of the guest that will use a ${pass_string} today (or 'restart'):`;
            if (response != null) {
                return {
                    response: response,
                    next_step: `await-pass-${this.comp_pass_type}`,
                };
            }
        }
        return {
            response: `You do not have any ${get_comp_pass_description(
                this.comp_pass_type
            )} available today`,
        };
    }
}

export abstract class PassSheet {
    sheet: GoogleSheetsSpreadsheetTab;
    comp_pass_type: CompPassType;
    constructor(sheet: GoogleSheetsSpreadsheetTab, type: CompPassType) {
        this.sheet = sheet;
        this.comp_pass_type = type;
    }

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
        const current_day_available_passes =
            patroller_row.row[excel_row_to_index(this.available_column)];
        const current_day_used_passes =
            patroller_row.row[excel_row_to_index(this.used_today_column)];
        const current_season_used_passes =
            patroller_row.row[excel_row_to_index(this.used_season_column)];
        return new UsedAndAvailablePasses(
            patroller_row.row,
            patroller_row.index,
            current_day_available_passes,
            current_day_used_passes,
            current_season_used_passes,
            this.comp_pass_type
        );
    }

    async set_used_comp_passes(
        patroller_row: UsedAndAvailablePasses,
        guest_name: string
    ) {
        if (patroller_row.available < 1) {
            throw new Error(
                `Not enough available passes: Available: ${patroller_row.available}, Used this season:  ${patroller_row.used_season}, Used today: ${patroller_row.used_today}`
            );
        }
        const rownum = patroller_row.index;

        const start_index = this.start_index;
        const prior_length = patroller_row.row.length - start_index;

        const current_date_string = format_date_for_spreadsheet_value(
            new Date()
        );
        let new_vals = patroller_row.row
            .slice(start_index)
            .map((x) => x?.toString());

        // Add the current date appended with the new guest name
        new_vals.push(current_date_string + "," + guest_name);

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

export class CompPassSheet extends PassSheet {
    config: CompPassesConfig;
    constructor(
        sheets_service: sheets_v4.Sheets | null,
        config: CompPassesConfig
    ) {
        super(
            new GoogleSheetsSpreadsheetTab(
                sheets_service,
                config.SHEET_ID,
                config.COMP_PASS_SHEET
            ),
            CompPassType.CompPass
        );
        this.config = config;
    }

    get start_index(): number {
        return excel_row_to_index(
            this.config.COMP_PASS_SHEET_DATES_STARTING_COLUMN
        );
    }
    get sheet_name(): string {
        return this.config.COMP_PASS_SHEET;
    }
    get available_column(): string {
        return this.config.COMP_PASS_SHEET_DATES_AVAILABLE_COLUMN;
    }
    get used_today_column(): string {
        return this.config.COMP_PASS_SHEET_USED_TODAY_COLUMN;
    }
    get used_season_column(): string {
        return this.config.COMP_PASS_SHEET_USED_SEASON_COLUMN;
    }
    get name_column(): string {
        return this.config.COMP_PASS_SHEET_NAME_COLUMN;
    }
}

export class ManagerPassSheet extends PassSheet {
    config: ManagerPassesConfig;
    constructor(
        sheets_service: sheets_v4.Sheets | null,
        config: ManagerPassesConfig
    ) {
        super(
            new GoogleSheetsSpreadsheetTab(
                sheets_service,
                config.SHEET_ID,
                config.MANAGER_PASS_SHEET
            ),
            CompPassType.ManagerPass
        );
        this.config = config;
    }

    get start_index(): number {
        return excel_row_to_index(
            this.config.MANAGER_PASS_SHEET_DATES_STARTING_COLUMN
        );
    }
    get sheet_name(): string {
        return this.config.MANAGER_PASS_SHEET;
    }
    get available_column(): string {
        return this.config.MANAGER_PASS_SHEET_AVAILABLE_COLUMN;
    }
    get used_today_column(): string {
        return this.config.MANAGER_PASS_SHEET_USED_TODAY_COLUMN;
    }
    get used_season_column(): string {
        return this.config.MANAGER_PASS_SHEET_USED_SEASON_COLUMN;
    }
    get name_column(): string {
        return this.config.MANAGER_PASS_SHEET_NAME_COLUMN;
    }
}
