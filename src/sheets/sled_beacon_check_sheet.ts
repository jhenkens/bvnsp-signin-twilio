import {sheets_v4} from "googleapis";
import GoogleSheetsSpreadsheetTab from "../utils/google_sheets_spreadsheet_tab";
import {SledBeaconConfig} from "../env/handler_config";
import {excel_row_to_index, parse_boolean_cell, row_col_to_excel_index} from "../utils/util";
import {BVNSPResponse} from "../handlers/bvnsp_handler";
import {format_date_for_spreadsheet_value} from "../utils/datetime_util";


export class BeaconSearches {
    row: any[];
    index: number;
    search_count: number;

    constructor(
        row: any[],
        index: number,
        search_count: any
    ) {
        this.row = row;
        this.index = index;
        this.search_count = Number(search_count);
    }
}

/**
 * Class representing a Sled Beacon Check Sheet in Google Sheets
 */
export  class Sled_BeaconCheckSheet  {
    sled_beacon_check_sheet: GoogleSheetsSpreadsheetTab;
    config: SledBeaconConfig

    /**
     * Creates an instance of LoginSheet.
     * @param {sheets_v4.Sheets | null} sheets_service - The Google Sheets API service.
     * @param {SledBeaconConfig} config - The configuration for this sheet.
     */
    constructor(
        sheets_service: sheets_v4.Sheets | null,
        config: SledBeaconConfig
    ) {
        this.sled_beacon_check_sheet = new GoogleSheetsSpreadsheetTab(
            sheets_service,
            config.SHEET_ID,
            config.SLED_BEACON_SHEET
        );
        this.config = config;
    }

    get start_index(): number {
        return excel_row_to_index(
            this.config.BEACON_FIND_DATES_STARTING_COLUMN
        );
    }

    get sheet_name(): string {
        return this.config.SLED_BEACON_SHEET;
    }

    get name_column(): string {
        return this.config.SLED_BEACON_SHEET_NAME_COLUMN;
    }

    get beacon_search_count_column(): string {
        return this.config.BEACON_SEARCH_COUNT_COLUMN;
    }

    /**
     * Get the current searches for the given patroller
     * @param patroller_name
     */
    async get_beacon_searches(
        patroller_name: string
    ): Promise<BeaconSearches | null> {
        const patroller_row = await this.sled_beacon_check_sheet.get_sheet_row_for_patroller(
            patroller_name,
            this.name_column
        );
        if (patroller_row == null) {
            return null;
        }
        let search_count = patroller_row.row[excel_row_to_index(this.beacon_search_count_column)];
        return new BeaconSearches(
            patroller_row.row,
            patroller_row.index,
            search_count
        );


    }

    /**
     * Gets the number of beacon finds by a patroller.
     * @param {string} patroller_name - The name of the patroller.
     * @returns {Promise<number>} The number of times this patroller found a beacons.
     */
    async get_patrolled_beacon_find_count(
        patroller_name: string
    ): Promise<number> {
        const patroller_row = await this.sled_beacon_check_sheet.get_sheet_row_for_patroller(
            patroller_name,
            this.config.SLED_BEACON_SHEET_NAME_COLUMN
        );

        if (!patroller_row) {
            return -1;
        }

        return patroller_row.row[excel_row_to_index(this.config.BEACON_SEARCH_COUNT_COLUMN)];
    }

    get_beacon_prompt(): BVNSPResponse {
        return {
            response:  "On which run did you complete a beacon search today (or 'reset' to cancel)?"
        }
    }

    async set_beacons_searches(
        patroller_row: BeaconSearches,
        search_location: string
    ) {
        let  row_num = patroller_row.index;
        let start_index = this.start_index;
        let prior_length = patroller_row.row.length - start_index;
        let current_date_string = format_date_for_spreadsheet_value(new Date());

        let new_vals = patroller_row.row
            .slice(start_index)
            .map((x) => x?.toString());

        // Record  the date of the search and the location
        new_vals.push(current_date_string+ "," + search_location);

        let update_length = Math.max(prior_length, new_vals.length);
        while (new_vals.length < update_length) {
            new_vals.push("");
        }

        let end_index = start_index + update_length - 1;
        let range = `${this.sled_beacon_check_sheet.sheet_name}!${row_col_to_excel_index(
            row_num,
            start_index
        )}:${row_col_to_excel_index(row_num, end_index)}`;

        console.log(`Updating ${range} with ${new_vals.length} values`);
        await this.sled_beacon_check_sheet.update_values(range, [new_vals]);
    }

}