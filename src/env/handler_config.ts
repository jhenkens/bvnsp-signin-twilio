import { CheckinValue } from "../utils/checkin_values";

/**
 * Environment configuration for the handler.
 * <p>
 * Note: These are the only secret values we need to read. Rest can be deployed.
 * @typedef {Object} HandlerEnvironment
 * @property {string} SHEET_ID - The ID of the Google Sheets spreadsheet.
 * @property {string} SCRIPT_ID - The ID of the Google Apps Script project.
 * @property {string} SYNC_SID - The SID of the Twilio Sync service.
 */
type HandlerEnvironment = {
    SHEET_ID: string;
    SCRIPT_ID: string;
    SYNC_SID: string;
};

/**
 * Configuration for user credentials.
 * @typedef {Object} UserCredsConfig
 * @property {string | undefined | null} NSP_EMAIL_DOMAIN - The email domain for NSP.
 */
type UserCredsConfig = {
    NSP_EMAIL_DOMAIN: string | undefined | null;
};
const user_creds_config: UserCredsConfig = {
    NSP_EMAIL_DOMAIN: "farwest.org",
};

/**
 * Configuration for finding a patroller.
 * @typedef {Object} FindPatrollerConfig
 * @property {string} SHEET_ID - The ID of the Google Sheets spreadsheet.
 * @property {string} PHONE_NUMBER_LOOKUP_SHEET - The range for phone number lookup.
 * @property {string} PHONE_NUMBER_NUMBER_COLUMN - The column for phone numbers.
 * @property {string} PHONE_NUMBER_NAME_COLUMN - The column for names.
 */
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

/**
 * Configuration for the login sheet.
 * @typedef {Object} LoginSheetConfig
 * @property {string} SHEET_ID - The ID of the Google Sheets spreadsheet.
 * @property {string} LOGIN_SHEET_LOOKUP - The range for login sheet lookup.
 * @property {string} CHECKIN_COUNT_LOOKUP - The range for check-in count lookup.
 * @property {string} ARCHIVED_CELL - The cell for archived data.
 * @property {string} SHEET_DATE_CELL - The cell for the sheet date.
 * @property {string} CURRENT_DATE_CELL - The cell for the current date.
 * @property {string} NAME_COLUMN - The column for names.
 * @property {string} CATEGORY_COLUMN - The column for categories.
 * @property {string} SECTION_DROPDOWN_COLUMN - The column for section dropdown.
 * @property {string} CHECKIN_DROPDOWN_COLUMN - The column for check-in dropdown.
 */
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

/**
 * Configuration for the season sheet.
 * @typedef {Object} SeasonSheetConfig
 * @property {string} SHEET_ID - The ID of the Google Sheets spreadsheet.
 * @property {string} SEASON_SHEET - The name of the season sheet.
 * @property {string} SEASON_SHEET_DAYS_COLUMN - The column for season sheet days.
 * @property {string} SEASON_SHEET_NAME_COLUMN - The column for season sheet names.
 */
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

/**
 * Configuration for sections.
 * @typedef {Object} SectionConfig
 * @property {string} SECTION_VALUES - The section values.
 */
type SectionConfig = {
    SECTION_VALUES: string;
};
const section_config: SectionConfig = {
    SECTION_VALUES:  "1,2,3,4,Roving,FAR,Training",
};

/**
 * Configuration for comp passes.
 * @typedef {Object} CompPassesConfig
 * @property {string} SHEET_ID - The ID of the Google Sheets spreadsheet.
 * @property {string} COMP_PASS_SHEET - The name of the comp pass sheet.
 * @property {string} COMP_PASS_SHEET_DATES_AVAILABLE_COLUMN - The column for available dates.
 * @property {string} COMP_PASS_SHEET_USED_TODAY_COLUMN - The column for dates used today.
  * @property {string} COMP_PASS_SHEET_USED_SEASON_COLUMN - The column for dates used for this season.
 * @property {string} COMP_PASS_SHEET_DATES_STARTING_COLUMN - The column for starting dates.
 * @property {string} COMP_PASS_SHEET_NAME_COLUMN - The column for names.
 */
type CompPassesConfig = {
    SHEET_ID: string;
    COMP_PASS_SHEET: string;
    COMP_PASS_SHEET_DATES_AVAILABLE_COLUMN: string;
    COMP_PASS_SHEET_USED_TODAY_COLUMN: string;
    COMP_PASS_SHEET_USED_SEASON_COLUMN: string;
    COMP_PASS_SHEET_DATES_STARTING_COLUMN: string;
    COMP_PASS_SHEET_NAME_COLUMN: string;
};
const comp_passes_config: CompPassesConfig = {
    SHEET_ID: "test",
    COMP_PASS_SHEET: "Comps",
    COMP_PASS_SHEET_NAME_COLUMN: "A",
    COMP_PASS_SHEET_DATES_AVAILABLE_COLUMN: "D",
    COMP_PASS_SHEET_USED_TODAY_COLUMN: "E",
    COMP_PASS_SHEET_USED_SEASON_COLUMN: "F",
    COMP_PASS_SHEET_DATES_STARTING_COLUMN: "G",
};

/**
 * Configuration for manager passes.
 * @typedef {Object} ManagerPassesConfig
 * @property {string} SHEET_ID - The ID of the Google Sheets spreadsheet.
 * @property {string} MANAGER_PASS_SHEET - The name of the manager pass sheet.
 * @property {string} MANAGER_PASS_SHEET_AVAILABLE_COLUMN - The column for available passes.
 * @property {string} MANAGER_PASS_SHEET_USED_TODAY_COLUMN - The column for passes used today.
 * @property {string} MANAGER_PASS_SHEET_USED_SEASON_COLUMN - The column for dates used for this season.
 * @property {string} MANAGER_PASS_SHEET_DATES_STARTING_COLUMN - The column for starting dates.
 * @property {string} MANAGER_PASS_SHEET_NAME_COLUMN - The column for names.
 */
type ManagerPassesConfig = {
    SHEET_ID: string;
    MANAGER_PASS_SHEET: string;
    MANAGER_PASS_SHEET_AVAILABLE_COLUMN: string;
    MANAGER_PASS_SHEET_USED_TODAY_COLUMN: string;
    MANAGER_PASS_SHEET_USED_SEASON_COLUMN: string;
    MANAGER_PASS_SHEET_DATES_STARTING_COLUMN: string;
    MANAGER_PASS_SHEET_NAME_COLUMN: string;
};
const manager_passes_config: ManagerPassesConfig = {
    SHEET_ID: "test",
    MANAGER_PASS_SHEET: "Managers",
    MANAGER_PASS_SHEET_NAME_COLUMN: "A",
    MANAGER_PASS_SHEET_AVAILABLE_COLUMN: "E",
    MANAGER_PASS_SHEET_USED_TODAY_COLUMN: "C",
    MANAGER_PASS_SHEET_USED_SEASON_COLUMN: "B",
    MANAGER_PASS_SHEET_DATES_STARTING_COLUMN: "F",
};

/**
 * Configuration for the handler.
 * @typedef {Object} HandlerConfig
 * @property {string} SCRIPT_ID - The ID of the Google Apps Script project.
 * @property {string} SHEET_ID - The ID of the Google Sheets spreadsheet.
 * @property {string} SYNC_SID - The SID of the Twilio Sync service.
 * @property {string} RESET_FUNCTION_NAME - The name of the reset function.
 * @property {string} ARCHIVE_FUNCTION_NAME - The name of the archive function.
 * @property {boolean} USE_SERVICE_ACCOUNT - Whether to use a service account.
 * @property {string} ACTION_LOG_SHEET - The name of the action log sheet.
 * @property {CheckinValue[]} CHECKIN_VALUES - The check-in values.
 */
type HandlerConfig = {
    SCRIPT_ID: string;
    SHEET_ID: string;
    SYNC_SID: string;
    RESET_FUNCTION_NAME: string;
    ARCHIVE_FUNCTION_NAME: string;
    USE_SERVICE_ACCOUNT: boolean;
    ACTION_LOG_SHEET: string;
    CHECKIN_VALUES: CheckinValue[];
};
const handler_config: HandlerConfig = {
    SHEET_ID: "test",
    SCRIPT_ID: "test",
    SYNC_SID: "test",
    ARCHIVE_FUNCTION_NAME: "Archive",
    RESET_FUNCTION_NAME: "Reset",
    USE_SERVICE_ACCOUNT: true,
    ACTION_LOG_SHEET: "Bot_Usage",
    CHECKIN_VALUES: [
        new CheckinValue("day", "All Day", "all day/DAY", ["checkin-day"]),
        new CheckinValue("am", "Half AM", "morning/AM", ["checkin-am"]),
        new CheckinValue("pm", "Half PM", "afternoon/PM", ["checkin-pm"]),
        new CheckinValue("out", "Checked Out", "check out/OUT", ["checkout", "check-out"]),
    ],
};

/**
 * Configuration for patroller rows.
 * @typedef {Object} PatrollerRowConfig
 * @property {string} NAME_COLUMN - The column for names.
 * @property {string} CATEGORY_COLUMN - The column for categories.
 * @property {string} SECTION_DROPDOWN_COLUMN - The column for section dropdown.
 * @property {string} CHECKIN_DROPDOWN_COLUMN - The column for check-in dropdown.
 */
type PatrollerRowConfig = {
    NAME_COLUMN: string;
    CATEGORY_COLUMN: string;
    SECTION_DROPDOWN_COLUMN: string;
    CHECKIN_DROPDOWN_COLUMN: string;
};

/**
 * Combined configuration type.
 * @typedef {HandlerEnvironment & UserCredsConfig & FindPatrollerConfig & LoginSheetConfig & SeasonSheetConfig & SectionConfig & CompPassesConfig & ManagerPassesConfig & HandlerConfig & PatrollerRowConfig} CombinedConfig
 */
type CombinedConfig = HandlerEnvironment &
    UserCredsConfig &
    FindPatrollerConfig &
    LoginSheetConfig &
    SeasonSheetConfig &
    SectionConfig &
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
    ...section_config,
};

export {
    CONFIG,
    CombinedConfig,
    SectionConfig,
    CompPassesConfig,
    FindPatrollerConfig,
    HandlerConfig,
    handler_config,
    HandlerEnvironment,
    ManagerPassesConfig,
    UserCredsConfig,
    LoginSheetConfig,
    SeasonSheetConfig,
    PatrollerRowConfig,
};