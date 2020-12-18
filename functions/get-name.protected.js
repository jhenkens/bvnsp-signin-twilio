const {google} = require('googleapis');
const {get_service_auth, find_name_from_number} = require(Runtime.getAssets()["/shared.js"].path)
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']


exports.handler = async function(context, event, callback) {
  const sheets_service = google.sheets({version: 'v4', auth: get_service_auth(SCOPES)});
  const number = event.number;
  const name = await find_name_from_number(number, sheets_service, context);
  if(name === undefined || name === null){
    throw new Error(`Couldn't find name for ${number}`)
  }
  callback(null,name.name);
};
