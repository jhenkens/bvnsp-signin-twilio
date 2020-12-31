const {google} = require('googleapis');
const {get_service_auth} = require(Runtime.getAssets()["/auth.js"].path)
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
const LoginSheet = require(Runtime.getAssets()["/login-sheet.js"].path)

exports.handler = async function(context, event, callback) {
  const sheets_service = google.sheets({version: 'v4', auth: await get_service_auth(SCOPES, context, event.number)});
  const name = event.name;
  const login_sheet = new LoginSheet(sheets_service, context);
  await login_sheet.refresh();
  const patroller_status = login_sheet.find_patroller(name);
  const sheet_date = login_sheet.sheet_date.toDateString();
  const current_date = login_sheet.current_date.toDateString();
  if(!login_sheet.is_current){
    console.log(`sheet_date: ${login_sheet.sheet_date}`)
    console.log(`current_date: ${login_sheet.current_date}`)
    callback(null, `Sheet is not current for today (last reset: ${sheet_date}). ${patroller_status.name} is not checked in for ${current_date}.`)
    return;
  }
  const status = patroller_status.checkin !== undefined && patroller_status.checkin !== null ?
    `Checked in for ${patroller_status.checkin} with section ${patroller_status.section}` :
    `Not checked in.`
  callback(null, `Status for ${patroller_status.name} on sheet with date ${sheet_date}:\n${status}`);
};
