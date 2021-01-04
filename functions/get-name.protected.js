const {google} = require('googleapis');
const {find_patroller_from_number} = require(Runtime.getAssets()["/shared.js"].path)
const {get_service_auth} = require(Runtime.getAssets()["/auth.js"].path)
const LoginSheet = require(Runtime.getAssets()["/login-sheet.js"].path)
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']

exports.handler = async function(context, event, callback) {
  const number = event.number;
  const auth = await get_service_auth(SCOPES, context, number);
  const sheets_service = google.sheets({version: 'v4', auth: auth});
  const phone_lookup = await find_patroller_from_number(number, sheets_service, context);
  const loginSheet = new LoginSheet(sheets_service, context);
  let status = 'success';
  let message = null;
  let name = null;
  if(phone_lookup === undefined || phone_lookup === null){
    status = 'not_found';
    message = `Sorry, I couldn't find an associated BVNSP member with your phone number (${number})`;
  }else {
    await loginSheet.refresh();
    const mappedPatroller = loginSheet.try_find_patroller(phone_lookup.name);
    if (mappedPatroller === 'not_found') {
      status = 'mis_mapped';
      message = `Could not find patroller '${phone_lookup.name}' in login sheet. Please look at the login sheet name, and copy it to the Phone Numbers tab.`;
    } else {
      name = phone_lookup.name;
    }
  }
  callback(null, {status: status, message: message, name: name});
};
