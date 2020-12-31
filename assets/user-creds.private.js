const {google} = require('googleapis');
const fs = require("fs");
const {sanitize_number} = require(Runtime.getAssets()["/shared.js"].path)
const SCOPES = ['https://www.googleapis.com/auth/script.projects', 'https://www.googleapis.com/auth/spreadsheets'];

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
function validate_scopes(scopes) {
  for(const desired_scope of SCOPES){
    if(scopes === undefined || !scopes.includes(desired_scope)){
      const error = `Missing scope ${desired_scope} in received scopes: ${scopes}`;
      console.log(error);
      throw new Error(error);
    }
  }
}

class UserCreds {
  constructor(context, number) {
    this.number = number;
    if (this.number === undefined || this.number === null) {
      throw new Error("Number is undefined");
    }
    this.number = sanitize_number(this.number);
    this.context = context;
    const credentials = JSON.parse(fs.readFileSync(Runtime.getAssets()["/credentials.json"].path));
    const {client_secret, client_id, redirect_uris} = credentials.web;
    this.oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    this.twilioSync = context.getTwilioClient().sync.services(context.SYNC_SID);
    this.domain = context.NSP_EMAIL_DOMAIN;
    if (this.domain === null || this.domain === '') {
      this.domain = undefined;
    }
  }

  async loadToken() {
    try {
      console.log(`Looking for ${this.token_key}`)
      const oauth2Doc = await this.twilioSync.documents(this.token_key).fetch();
      if (oauth2Doc === undefined || oauth2Doc.data == undefined || oauth2Doc.data.token === undefined) {
        console.log(`Didn't find ${this.token_key}`)
        return false;
      }
      const token = oauth2Doc.data.token;
      validate_scopes(oauth2Doc.data.scopes);
      this.oAuth2Client.setCredentials(token);
      console.log(`Loaded token ${this.token_key}`);
      return true;
    } catch (e) {
      console.log(`Failed to validate token for ${this.token_key}.\n ${e}`)
      return false;
    }
  }

  get token_key() {
    return `oauth2_${this.number}`;
  }

  async deleteToken(){
    const oauth2Doc = await this.twilioSync.documents(this.token_key).fetch();
    if (oauth2Doc === undefined || oauth2Doc.data == undefined || oauth2Doc.data.token === undefined) {
      console.log(`Didn't find ${this.token_key}`)
      return false;
    }
    await this.twilioSync.documents(oauth2Doc.sid).remove();
    console.log(`Deleted token ${this.token_key}`);
    return true;
  }

  async completeLogin(code, scopes) {
    validate_scopes(scopes);
    const token = (await this.oAuth2Client.getToken(code)).tokens;
    this.oAuth2Client.setCredentials(token);
    try {
      const oauthDoc = await this.twilioSync.documents.create({
        data: {token: token, scopes: scopes},
        uniqueName: this.token_key,
      });
    }catch(e){
      console.log(`Exception when creating oauth. Trying to update instead...\n${e}`)
      const oauthDoc = await this.twilioSync.documents(this.token_key).update({
        data: {token: token, scopes: scopes}
      });
    }
  }

  async getAuthUrl() {
    const id = this.generateRandomString();
    console.log(`Using nonce ${id} for ${this.number}`)
    const doc = await this.twilioSync.documents.create({
      data: {number: this.number, scopes: SCOPES},
      uniqueName: id,
      ttl: 60 * 5, // 5 minutes
    });
    console.log(`Made nonce-doc: ${JSON.stringify(doc)}`);

    const opts = {
      access_type: 'offline',
      scope: SCOPES,
      state: id
    };
    if (this.domain) {
      opts['hd'] = this.domain;
    }

    const authUrl = this.oAuth2Client.generateAuthUrl(opts);
    return authUrl;
  }

  generateRandomString() {
    return makeid(30);
  }
}

module.exports = {UserCreds: UserCreds, Scopes: SCOPES};
