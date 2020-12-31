const {google} = require('googleapis');
const {find_patroller_from_number} = require(Runtime.getAssets()["/shared.js"].path)
const {get_service_auth} = require(Runtime.getAssets()["/auth.js"].path)
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']


exports.handler = async function(context, event, callback) {
  const number = event.number;
  const auth = await get_service_auth(SCOPES, context, number);
  const sheets_service = google.sheets({version: 'v4', auth: auth});
  const patroller = await find_patroller_from_number(number, sheets_service, context);
  let status = 'success';
  let message = null;
  let name = null;
  if(patroller === undefined || patroller === null){
    status = 'error';
    message = `Couldn't find name for ${number}`;
  }else{
    name = patroller.name;
  }
  callback(null,{status: status, message: message, name: name});
};
