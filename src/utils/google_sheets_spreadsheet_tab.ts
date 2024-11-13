import { sheets_v4 } from "googleapis";
import { excel_row_to_index } from "./util";

/**
 * Class representing a Google Sheets spreadsheet tab.
 */
export default class GoogleSheetsSpreadsheetTab {
    sheets_service: sheets_v4.Sheets | null;
    sheet_id: string;
    sheet_name: string;

    /**
     * Create a GoogleSheetsSpreadsheetTab.
     * @param {sheets_v4.Sheets | null} sheets_service - The Google Sheets API service instance.
     * @param {string} sheet_id - The ID of the Google Sheets spreadsheet.
     * @param {string} sheet_name - The name of the sheet tab.
     */
    constructor(
        sheets_service: sheets_v4.Sheets | null,
        sheet_id: string,
        sheet_name: string
    ) {
        this.sheets_service = sheets_service;
        this.sheet_id = sheet_id;
        this.sheet_name = sheet_name.split("!")[0];
    }

    /**
     * Get values from the sheet.
     * @param {string | null} [range] - The range to get values from.
     * @returns {Promise<any[][] | undefined>} A promise that resolves to the values from the sheet.
     */
    async get_values(range?: string | null): Promise<any[][] | undefined> {
        const result = await this._get_values(range);
        return result.data.values ?? undefined;
    }

    /**
     * Get the row for a specific patroller.
     * @param {string} patroller_name - The name of the patroller.
     * @param {string} name_column - The column where the patroller's name is located.
     * @param {string | null} [range] - The range to search within.
     * @returns {Promise<{ row: any[]; index: number; } | null>} A promise that resolves to the row and index of the patroller, or null if not found.
     */
    async get_sheet_row_for_patroller(
        patroller_name: string,
        name_column: string,
        range?: string | null
    ): Promise<{ row: any[]; index: number; } | null> {
        const rows = await this.get_values(range);
        if (rows) {
            const lookup_index = excel_row_to_index(name_column);
            for (var i = 0; i < rows.length; i++) {
                if (rows[i][lookup_index] === patroller_name) {
                    return { row: rows[i], index: i };
                }
            }
        }

        console.log(
            `Couldn't find patroller ${patroller_name} in sheet ${this.sheet_name}.`
        );
        return null;
    }

    /**
     * Update values in the sheet.
     * @param {string} range - The range to update.
     * @param {any[][]} values - The values to update.
     */
    async update_values(range: string, values: any[][]) {
        const updateMe = (await this._get_values(range, null)).data;

        updateMe.values = values;
        await this.sheets_service!.spreadsheets.values.update({
            spreadsheetId: this.sheet_id,
            valueInputOption: "USER_ENTERED",
            range: updateMe.range!,
            requestBody: updateMe,
        });
    }

    /**
     * Get values from the sheet (private method).
     * @param {string | null} [range] - The range to get values from.
     * @param {string | null} [valueRenderOption] - The value render option.
     * @returns {Promise<any[][]>} A promise that resolves to the value range.
     * @private
     */
    private async _get_values(
        range?: string | null,
        valueRenderOption: string | null = "UNFORMATTED_VALUE"
    ) {
        let lookupRange = this.sheet_name;
        if (range != null) {
            lookupRange = lookupRange + "!";

            if (range.startsWith(lookupRange)) {
                range = range.substring(lookupRange.length);
            }
            lookupRange = lookupRange + range;
        }
        let opts: sheets_v4.Params$Resource$Spreadsheets$Values$Get = {
            spreadsheetId: this.sheet_id,
            range: lookupRange,
        };
        if (valueRenderOption) {
            opts.valueRenderOption = valueRenderOption;
        }
        const result = await this.sheets_service!.spreadsheets.values.get(opts);
        return result;
    }
}
