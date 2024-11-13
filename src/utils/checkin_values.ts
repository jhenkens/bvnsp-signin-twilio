/**
 * Represents a check-in value with various properties and lookup values.
 */
class CheckinValue {
    key: string;
    sheets_value: string;
    sms_desc: string;
    fast_checkins: string[];
    lookup_values: Set<string>;

    /**
     * Creates an instance of CheckinValue.
     * @param {string} key - The key for the check-in value.
     * @param {string} sheets_value - The value used in sheets.
     * @param {string} sms_desc - The description used in SMS.
     * @param {string | string[]} fast_checkins - The fast check-in values.
     */
    constructor(
        key: string,
        sheets_value: string,
        sms_desc: string,
        fast_checkins: string | string[]
    ) {
        if (!(fast_checkins instanceof Array)) {
            fast_checkins = [fast_checkins];
        }
        this.key = key;
        this.sheets_value = sheets_value;
        this.sms_desc = sms_desc;
        this.fast_checkins = fast_checkins.map((x) => x.trim().toLowerCase());

        const sms_desc_split: string[] = sms_desc
            .replace(/\s+/, "-")
            .toLowerCase()
            .split("/");
        const lookup_vals = [...this.fast_checkins, ...sms_desc_split];
        this.lookup_values = new Set<string>(lookup_vals);
    }
}

/**
 * Represents a collection of check-in values with various lookup methods.
 */
class CheckinValues {
    by_key: { [key: string]: CheckinValue } = {};
    by_lv: { [key: string]: CheckinValue } = {};
    by_fc: { [key: string]: CheckinValue } = {};
    by_sheet_string: { [key: string]: CheckinValue } = {};

    /**
     * Creates an instance of CheckinValues.
     * @param {CheckinValue[]} checkinValues - The array of check-in values.
     */
    constructor(checkinValues: CheckinValue[]) {
        for (var checkinValue of checkinValues) {
            this.by_key[checkinValue.key] = checkinValue;
            this.by_sheet_string[checkinValue.sheets_value] = checkinValue;
            for (const lv of checkinValue.lookup_values) {
                this.by_lv[lv] = checkinValue;
            }
            for (const fc of checkinValue.fast_checkins) {
                this.by_fc[fc] = checkinValue;
            }
        }
    }

    /**
     * Returns the entries of check-in values by key.
     * @returns {Array} The entries of check-in values.
     */
    entries() {
        return Object.entries(this.by_key);
    }

    /**
     * Parses a fast check-in value from the given body string.
     * @param {string} body - The body string to parse.
     * @returns {CheckinValue | undefined} The parsed check-in value or undefined.
     */
    parse_fast_checkin(body: string) {
        return this.by_fc[body];
    }

    /**
     * Parses a check-in value from the given body string.
     * @param {string} body - The body string to parse.
     * @returns {CheckinValue | undefined} The parsed check-in value or undefined.
     */
    parse_checkin(body: string) {
        const checkin_lower = body.replace(/\s+/, "");
        return this.by_lv[checkin_lower];
    }
}

export { CheckinValue, CheckinValues }