const {google} = require('googleapis');
const {get_service_auth} = require(Runtime.getAssets()["/shared.js"].path)
const SERVICE_SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
const LoginSheet = require(Runtime.getAssets()["/login-sheet.js"].path)
const {UserCreds} = require(Runtime.getAssets()["/user-creds.js"].path)

exports.handler = async function(context, event, callback) {
  const check_auth = event.check_auth === 'true';
  const service_auth = get_service_auth(SERVICE_SCOPES);
  const sheets_service = google.sheets({version: 'v4', auth: service_auth});
  const login_sheet = new LoginSheet(sheets_service, context);
  await login_sheet.refresh();

  let reset = false;
  let archive = false;
  if(!login_sheet.is_current){
    console.log('Sheet needs resetting...')
    const user_creds = new UserCreds(context, event.number);
    if(!(await user_creds.loadToken())){
      const authUrl = await user_creds.getAuthUrl();
      callback(null, {status: 'auth', url: authUrl});
      return;
    }
    if(check_auth){
      console.log("We are only checking auth... exiting.");
      callback(null, {status: 'valid_auth'});
      return;
    }

    try {
      const script_service = google.script({version: 'v1', auth: user_creds.oAuth2Client});
      let result;
      if (!login_sheet.archived) {
        if(event.archive_complete === 'true'){
          throw new Error('Archive has already been attempted. Cannot attempt again...')
        }
        console.log("Archiving...");

        result = await script_service.scripts.run({
          resource: {function: context.ARCHIVE_FUNCTION_NAME},
          scriptId: context.SCRIPT_ID,
        });
        console.log(JSON.stringify(result));
        callback(null, {status: 'archive_complete'});
        return;
      }

      console.log("Resetting...");
      result = await script_service.scripts.run({
        resource: {function: context.RESET_FUNCTION_NAME},
        scriptId: context.SCRIPT_ID,
      });
      console.log(JSON.stringify(result));
      archive = true;
    }catch(e){
      console.log(e);
      callback(e);
      return;
    }
  }
  callback(null,{status: 'success', message: `Done. Performed Archive = ${archive}. Performed Reset = ${reset}`});
};
