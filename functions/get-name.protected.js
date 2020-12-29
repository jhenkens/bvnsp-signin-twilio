const {google} = require('googleapis');
const {get_service_auth, find_patroller_from_number} = require(Runtime.getAssets()["/shared.js"].path)
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']


exports.handler = async function(context, event, callback) {
  const sheets_service = google.sheets({version: 'v4', auth: get_service_auth(SCOPES)});
  const number = event.number;
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
