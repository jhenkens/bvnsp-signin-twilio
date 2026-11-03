import {sheets_v4} from "googleapis";
import GoogleSheetsSpreadsheetTab from "../utils/google_sheets_spreadsheet_tab";
import {SledBeaconConfig} from "../env/handler_config";
import {excel_row_to_index, row_col_to_excel_index} from "../utils/util";
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
export  class SledBeaconCheckSheet  {
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
        const search_count = patroller_row.row[excel_row_to_index(this.beacon_search_count_column)];
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

    /**
     * Record a new beacon search for today at the specified location.
     * @param patroller_row
     * @param search_location
     */
    async set_beacons_searches(
        patroller_row: BeaconSearches,
        search_location: string
    ) {
        const  row_num = patroller_row.index;
        const start_index = this.start_index;
        const prior_length = patroller_row.row.length - start_index;
        const current_date_string = format_date_for_spreadsheet_value(new Date());

        let new_vals = patroller_row.row
            .slice(start_index)
            .map((x) => x?.toString());

        // Record  the date of the search and the location
        new_vals.push(current_date_string+ "," + search_location);

        const update_length = Math.max(prior_length, new_vals.length);
        while (new_vals.length < update_length) {
            new_vals.push("");
        }

        const end_index = start_index + update_length - 1;
        const range = `${this.sled_beacon_check_sheet.sheet_name}!${row_col_to_excel_index(
            row_num,
            start_index
        )}:${row_col_to_excel_index(row_num, end_index)}`;

        console.log(`Updating ${range} with ${new_vals.length} values`);
        await this.sled_beacon_check_sheet.update_values(range, [new_vals]);
    }

    /**
     * Parse location
     * @param {string} body - the body of the request
     * @returns {string | null} The search location if the location is valid
     */
    parse_location(body: string | null): string |null  {
        if (body === null ) {
            return null;
        }
        return this.cleanSmsValue(body);
    }

    cleanSmsValue(input: string): string {
        if (!input) return '';

        let cleaned = input.trim();

        // 1. Remove formula triggers from the beginning of the string
        // Loops to catch edge cases like "==Click here" or "++1"
        while (['=', '+', '-', '@'].includes(cleaned.charAt(0))) {
            cleaned = cleaned.substring(1).trim();
        }

        // 2. Strip line breaks, tabs, and invisible control characters (\x00-\x1F, \x7F)
        // This prevents the SMS reply from breaking onto new lines unexpectedly
        cleaned = cleaned.replace(/[\r\n\t\x00-\x1F\x7F]/g, ' ');

        // 3. Collapse multiple spaces into a single space
        cleaned = cleaned.replace(/\s+/g, ' ').trim();

        return cleaned;
    }

}