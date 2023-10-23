import { CheckinValue } from "../utils/checkin_values";

// These are the only secret values we need to read. Rest can be deployed.
type HandlerEnvironment = {
    SHEET_ID: string;
    SCRIPT_ID: string;
    SYNC_SID: string;
};

type UserCredsConfig = {
    NSP_EMAIL_DOMAIN: string | undefined | null;
};
const user_creds_config: UserCredsConfig = {
    NSP_EMAIL_DOMAIN: "farwest.org",
};

type FindPatrollerConfig = {
    SHEET_ID: string;
    PHONE_NUMBER_LOOKUP_SHEET: string;
    PHONE_NUMBER_NUMBER_COLUMN: string;
    PHONE_NUMBER_NAME_COLUMN: string;
};

const find_patroller_config: FindPatrollerConfig = {
    SHEET_ID: "test",
    PHONE_NUMBER_LOOKUP_SHEET: "Phone Numbers!A2:B100",
    PHONE_NUMBER_NAME_COLUMN: "A",
    PHONE_NUMBER_NUMBER_COLUMN: "B",
};
type LoginSheetConfig = {
    SHEET_ID: string;

    LOGIN_SHEET_LOOKUP: string;
    CHECKIN_COUNT_LOOKUP: string;

    ARCHIVED_CELL: string;
    SHEET_DATE_CELL: string;
    CURRENT_DATE_CELL: string;
    NAME_COLUMN: string;
    CATEGORY_COLUMN: string;
    SECTION_DROPDOWN_COLUMN: string;
    CHECKIN_DROPDOWN_COLUMN: string;
};

const login_sheet_config: LoginSheetConfig = {
    SHEET_ID: "test",

    LOGIN_SHEET_LOOKUP: "Login!A1:Z100",
    CHECKIN_COUNT_LOOKUP: "Tools!G2:G2",

    SHEET_DATE_CELL: "B1",
    CURRENT_DATE_CELL: "B2",
    ARCHIVED_CELL: "H1",
    NAME_COLUMN: "A",
    CATEGORY_COLUMN: "B",
    SECTION_DROPDOWN_COLUMN: "H",
    CHECKIN_DROPDOWN_COLUMN: "I",

};

type SeasonSheetConfig = {
    SHEET_ID: string;
    SEASON_SHEET: string;
    SEASON_SHEET_DAYS_COLUMN: string;
    SEASON_SHEET_NAME_COLUMN: string;
};
const season_sheet_config: SeasonSheetConfig = {
    SHEET_ID: "test",

    SEASON_SHEET: "Season",
    SEASON_SHEET_NAME_COLUMN: "B",
    SEASON_SHEET_DAYS_COLUMN: "A",
};

type CompPassesConfig = {
    SHEET_ID: string;
    COMP_PASS_SHEET: string;
    COMP_PASS_SHEET_DATES_AVAILABLE_COLUMN: string;
    COMP_PASS_SHEET_DATES_USED_TODAY_COLUMN: string;
    COMP_PASS_SHEET_DATES_STARTING_COLUMN: string;
    COMP_PASS_SHEET_NAME_COLUMN: string;
};
const comp_passes_config: CompPassesConfig = {
    SHEET_ID: "test",

    COMP_PASS_SHEET: "Comps",
    COMP_PASS_SHEET_NAME_COLUMN: "A",
    COMP_PASS_SHEET_DATES_AVAILABLE_COLUMN: "D",
    COMP_PASS_SHEET_DATES_USED_TODAY_COLUMN: "E",
    COMP_PASS_SHEET_DATES_STARTING_COLUMN: "G",
};

type ManagerPassesConfig = {
    SHEET_ID: string;
    MANAGER_PASS_SHEET: string;
    MANAGER_PASS_SHEET_AVAIABLE_COLUMN: string;
    MANAGER_PASS_SHEET_USED_TODAY_COLUMN: string;
    MANAGER_PASS_SHEET_DATES_STARTING_COLUMN: string;
    MANAGER_PASS_SHEET_NAME_COLUMN: string;
};
const manager_passes_config: ManagerPassesConfig = {
    SHEET_ID: "test",

    MANAGER_PASS_SHEET: "Managers",
    MANAGER_PASS_SHEET_NAME_COLUMN: "A",
    MANAGER_PASS_SHEET_AVAIABLE_COLUMN: "G",
    MANAGER_PASS_SHEET_USED_TODAY_COLUMN: "C",
    MANAGER_PASS_SHEET_DATES_STARTING_COLUMN: "H",
};

type HandlerConfig = {
    SCRIPT_ID: string;
    SHEET_ID: string;
    SYNC_SID: string;

    RESET_FUNCTION_NAME: string;
    ARCHIVE_FUNCTION_NAME: string;

    USE_SERVICE_ACCOUNT: boolean;
    ACITON_LOG_SHEET: string;

    CHECKIN_VALUES: CheckinValue[];
};
const handler_config: HandlerConfig = {
    SHEET_ID: "test",
    SCRIPT_ID: "test",
    SYNC_SID: "test",

    ARCHIVE_FUNCTION_NAME: "Archive",
    RESET_FUNCTION_NAME: "Reset",

    USE_SERVICE_ACCOUNT: true,
    ACITON_LOG_SHEET: "Bot_Usage",

    CHECKIN_VALUES: [
        new CheckinValue("day", "All Day", "all day/DAY", ["checkin-day"]),
        new CheckinValue("am", "Half AM", "morning/AM", ["checkin-am"]),
        new CheckinValue("pm", "Half PM", "afternoon/PM", ["checkin-pm"]),
        new CheckinValue("out", "Checked Out", "check out/OUT", ["checkout", "check-out"]),
    ],
};


type PatrollerRowConfig = {
    NAME_COLUMN: string;
    CATEGORY_COLUMN: string;
    SECTION_DROPDOWN_COLUMN: string;
    CHECKIN_DROPDOWN_COLUMN: string;
};

type CombinedConfig = HandlerEnvironment &
    UserCredsConfig &
    FindPatrollerConfig &
    LoginSheetConfig &
    SeasonSheetConfig &
    CompPassesConfig &
    ManagerPassesConfig &
    HandlerConfig &
    PatrollerRowConfig;

const CONFIG: CombinedConfig = {
    ...handler_config,
    ...find_patroller_config,
    ...login_sheet_config,
    ...comp_passes_config,
    ...manager_passes_config,
    ...season_sheet_config,
    ...user_creds_config,
};

export {
    CONFIG,
    CombinedConfig,
    CompPassesConfig,
    FindPatrollerConfig,
    HandlerConfig,
    HandlerEnvironment,
    ManagerPassesConfig,
    UserCredsConfig,
    LoginSheetConfig,
    SeasonSheetConfig,
    PatrollerRowConfig,
};
