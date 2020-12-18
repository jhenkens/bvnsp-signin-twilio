const {UserCreds} = require(Runtime.getAssets()["/user-creds.js"].path)

async function get_number(context, event){
  return number;
}

exports.handler = async function(context, event, callback) {
  console.log(`Handling auth completion: ${JSON.stringify(event)}`);

  const state = event.state;
  if(state === undefined){
    throw new Error('Missing nonce');
  }
  const twilioSync = context.getTwilioClient().sync.services(context.SYNC_SID);

  let doc;
  try {
    console.log(`Looking for state ${state}...`)
    doc = await twilioSync.documents(state).fetch();
  }catch(e){
    console.log(e);
    callback(`Failed to get state doc.`);
    return;
  }
  if (doc.data === undefined || isNaN(doc.data.number)) {
    callback(`Received invalid nonce`);
    return;
  }
  const number = doc.data.number;
  console.log(`Found number ${number} for nonce ${state}`);

  const user_creds = new UserCreds(context, number);
  if(await user_creds.loadToken()){
    callback(null, 'already_valid');
    return;
  }

  const code = event.code;
  const scopes = doc.data.scopes;
  console.log(`code: ${code}, scopes: ${scopes}`);
  try {
    await twilioSync.documents(doc.sid).remove();
    console.log(`Deleted nonce ${doc.uniqueName}`)
  }catch(e){
    callback(null, `Failed to delete nonce: ${e}` );
    return;
  }

  try {
    await user_creds.completeLogin(code, scopes);
  }catch(e){
    callback(null, e);
    return;
  }
  callback(null, "Please return to your messaging app and engage BVNSP bot again.");
};
