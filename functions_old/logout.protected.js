const {UserCreds} = require(Runtime.getAssets()["/user-creds.js"].path)

exports.handler = async function(context, event, callback) {
  const number = event.number;
  await (new UserCreds(context,number)).deleteToken();
  callback(null,null);
};
