class CheckinValue {
    key: string;
    sheets_value: string;
    sms_desc: string;
    fast_checkins: string[];
    lookup_values: Set<string>;
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

class CheckinValues {
    by_key: { [key: string]: CheckinValue } = {};
    by_lv: { [key: string]: CheckinValue } = {};
    by_fc: { [key: string]: CheckinValue } = {};
    by_sheet_string: { [key: string]: CheckinValue } = {};
    constructor(checkinValues: CheckinValue[]) {
        for (var checkinValue of checkinValues){
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
    entries() {
        return Object.entries(this.by_key);
    }

    parse_fast_checkin(body: string) {
        return this.by_fc[body];
    }

    parse_checkin(body: string) {
        const checkin_lower = body.replace(/\s+/, "");
        return this.by_lv[checkin_lower];
    }
}

export {CheckinValue, CheckinValues}