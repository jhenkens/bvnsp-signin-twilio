import { CONFIG } from "../../src/env/handler_config";
import LoginSheet from "../../src/sheets/login_sheet";
import GoogleSheetsSpreadsheetTab from "../../src/utils/google_sheets_spreadsheet_tab";

beforeEach(() => {});
afterEach(() => {
    jest.restoreAllMocks();
});
describe("LoginSheet", () => {
    const mockLoginSheetRows = [
        ["abc"],
        ["Adam M","P","","","","","","","Roving",""]
    ];
    it("should parse tabs during refresh", async () => {
        jest.spyOn(GoogleSheetsSpreadsheetTab.prototype, "get_values")
            .mockReturnValueOnce(Promise.resolve(mockLoginSheetRows))
            .mockReturnValueOnce(Promise.resolve([[123]]));
            
        const loginSheet = new LoginSheet(null, CONFIG);
        
        const login_sheet = loginSheet.login_sheet;
        const checkin_count_sheet = loginSheet.checkin_count_sheet;

        expect(login_sheet.get_values).toBeCalledTimes(0);
        expect(checkin_count_sheet.get_values).toBeCalledTimes(0);

        await loginSheet.refresh();

        // They share the same mock.
        expect(login_sheet.get_values).toBeCalledTimes(2);
        expect(checkin_count_sheet.get_values).toBeCalledTimes(2);

        expect(loginSheet.rows).toHaveLength(2);
        expect(loginSheet.checkin_count).toStrictEqual(123);
        expect(loginSheet.patrollers).toHaveLength(1);
        expect(loginSheet.patrollers[0].name).toBe("Adam M");
    });
});
