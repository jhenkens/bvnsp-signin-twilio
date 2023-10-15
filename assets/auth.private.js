const {google} = require('googleapis');
const {UserCreds} = require(Runtime.getAssets()["/user-creds.js"].path)

module.exports = {get_service_auth}

async function get_service_auth(scopes, context, number) {
  if(context.USE_SERVICE_ACCOUNT === 'true') {
    return new google.auth.GoogleAuth({keyFile: Runtime.getAssets()["/service-credentials.json"].path, scopes: scopes});
  }
  const user_creds = new UserCreds(context, number);
  if(!(await user_creds.loadToken())){
    throw new Error('User is not authed.');
  }
  console.log('Using user account for service auth...');
  return user_creds.oAuth2Client;
}
