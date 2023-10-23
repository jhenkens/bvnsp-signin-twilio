import { sheets_v4 } from "googleapis";
import {
    SeasonSheetConfig,
} from "../env/handler_config";
import { excel_row_to_index } from "../utils/util";
import GoogleSheetsSpreadsheetTab from "../utils/google_sheets_spreadsheet_tab";
import { filter_list_to_endswith_current_day } from "../utils/datetime_util";

export default class SeasonSheet {
    sheet: GoogleSheetsSpreadsheetTab;
    config: SeasonSheetConfig;
    constructor(
        sheets_service: sheets_v4.Sheets | null,
        config: SeasonSheetConfig
    ) {
        this.sheet = new GoogleSheetsSpreadsheetTab(
            sheets_service,
            config.SHEET_ID,
            config.SEASON_SHEET
        );
        this.config = config;
    }

    async get_patrolled_days(
        patroller_name: string
    ): Promise<number> {
        const patroller_row = await this.sheet.get_sheet_row_for_patroller(
            patroller_name,
            this.config.SEASON_SHEET_NAME_COLUMN
        );

        if (!patroller_row) {
            return -1;
        }

        const currentNumber =
            patroller_row.row[excel_row_to_index(this.config.SEASON_SHEET_DAYS_COLUMN)];

        const currentDay = filter_list_to_endswith_current_day(patroller_row.row)
            .map((x) => (x?.startsWith("H") ? 0.5 : 1))
            .reduce((x, y, i) => x + y, 0);

        const daysBeforeToday = currentNumber - currentDay;
        return daysBeforeToday;
    }
}
