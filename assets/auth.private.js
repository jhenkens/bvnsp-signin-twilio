const {google} = require('googleapis');
const {UserCreds} = require(Runtime.getAssets()["/user-creds.js"].path)

module.exports = {get_service_auth}

async function get_service_auth(scopes, context, number) {
  if(context.USE_SERVICE_ACCOUNT === 'true') {
    return new google.auth.GoogleAuth({keyFile: Runtime.getAssets()["/service-credentials.json"].path, scopes: scopes});
  }

async function get_service_auth(scopes) {
    const {google} = await import("googleapis");
    return new google.auth.GoogleAuth({
        keyFile: Runtime.getAssets()["/service-credentials.json"].path,
        scopes: scopes,
    });
}
