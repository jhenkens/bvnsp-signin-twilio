const {google} = require('googleapis');
const {get_service_auth} = require(Runtime.getAssets()["/auth.js"].path)
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
const LoginSheet = require(Runtime.getAssets()["/login-sheet.js"].path)
const {logAction} = require(Runtime.getAssets()["/shared.js"].path)

exports.handler = async function(context, event, callback) {
  try{
    const response = await handle(context, event);
    callback(null, response);
  }catch(e){
    console.log(e.stack)
    callback(e);
  }
};

async function handle(context, event){
  const sheets_service = google.sheets({version: 'v4', auth: await get_service_auth(SCOPES, context, event.number)});
  const name = event.name;
  const checkin = event.checkin;
  const fast_checkin = event.fast_checkin === 'true';
  const possible_checkins = JSON.parse(context.CHECKIN_VALUES);
  const checkin_tuple = possible_checkins.filter(x => x[0] == checkin)[0];
  if(checkin_tuple === undefined){
    throw new Error(`Invalid checkin type: ${checkin}`);
  }

  console.log('Getting login_sheet...');
  const login_sheet = new LoginSheet(sheets_service, context);
  await login_sheet.refresh();
  const patroller_status = login_sheet.find_patroller(name);
  console.log(`Existing status: ${JSON.stringify(patroller_status)}`);
  if(!login_sheet.is_current){
    throw new Error('Login sheet is not current');
  }

  const sheetId = context.SHEET_ID
  const sheetName = context.LOGIN_SHEET_LOOKUP.split("!")[0]
  const row = patroller_status.index + 1; // programming -> excel lookup
  const range = `${sheetName}!${context.CHECKIN_DROPDOWN_COLUMN}${row}`;
  const updateMe = (await sheets_service.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: range
  })).data;
  updateMe.values = [[checkin]];
  console.log("Updating....");
  await sheets_service.spreadsheets.values.update({
    spreadsheetId: sheetId,
    valueInputOption: 'USER_ENTERED',
    range: updateMe.range,
    requestBody: updateMe
  });
  await logAction(event.name, sheets_service, context, 'checkin');
  let response =`Checked in ${name} with ${checkin}.`;
  if(!fast_checkin) {
    response += ` You can send '${checkin_tuple[2]}' as your first message for a fast ${checkin_tuple[0]} checkin next time.`;
  }
  console.log(response);
  return response;
}
