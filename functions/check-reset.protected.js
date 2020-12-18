const {google} = require('googleapis');
const {get_service_auth} = require(Runtime.getAssets()["/shared.js"].path)
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
const LoginSheet = require(Runtime.getAssets()["/login-sheet.js"].path)

exports.handler = async function(context, event, callback) {
  const sheets_service = google.sheets({version: 'v4', auth: get_service_auth(SCOPES)});
  const login_sheet = new LoginSheet(sheets_service, context);
  await login_sheet.refresh();
  console.log(`archived: ${login_sheet.archived}`);

  const sheet_date = login_sheet.sheet_date;
  const current_date = login_sheet.current_date;
  console.log(`sheet_date: ${sheet_date}`);
  console.log(`current_date: ${current_date}`);

  const date_is_current = sheet_date.getTime() === current_date.getTime();
  console.log(`date_is_current: ${date_is_current}`);

  if(!date_is_current){
    callback(null,"reset");
    return;
  }
  callback(null,"ok");
};
