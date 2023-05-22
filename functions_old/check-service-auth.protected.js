const {UserCreds} = require(Runtime.getAssets()["/user-creds.js"].path)

exports.handler = async function(context, event, callback) {
  if (context.USE_SERVICE_ACCOUNT === 'true') {
    callback(null, {status: 'service'});
    return;
  }

  const user_creds = new UserCreds(context, event.number);
  if (await user_creds.loadToken()) {
    callback(null, {status: 'user'});
    return;
  }

  const authUrl = await user_creds.getAuthUrl();
  callback(null, {status: 'auth', url: authUrl});
  return;
};
