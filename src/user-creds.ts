import { google } from "googleapis";
import { GenerateAuthUrlOpts } from "google-auth-library";
import { OAuth2Client } from "googleapis-common";
import { sanitize_number } from "./util";
import { load_credentials_files } from "./file-utils";
import { ServiceContext } from "@twilio-labs/serverless-runtime-types/types";

const SCOPES = [
    "https://www.googleapis.com/auth/script.projects",
    "https://www.googleapis.com/auth/spreadsheets",
];

function validate_scopes(scopes: string[]) {
    for (const desired_scope of SCOPES) {
        if (scopes === undefined || !scopes.includes(desired_scope)) {
            const error = `Missing scope ${desired_scope} in received scopes: ${scopes}`;
            console.log(error);
            throw new Error(error);
        }
    }
}

type USER_CREDS_OPTS = {
    NSP_EMAIL_DOMAIN: string | undefined | null;
};
class UserCreds {
    number: number;
    oauth2_client: OAuth2Client;
    sync_client: ServiceContext;
    domain?: string;
    loaded: boolean = false;
    constructor(
        sync_client: ServiceContext,
        number: string | undefined,
        opts: USER_CREDS_OPTS
    ) {
        if (number === undefined || number === null) {
            throw new Error("Number is undefined");
        }
        this.number = sanitize_number(number);

        const credentials = load_credentials_files();
        const { client_secret, client_id, redirect_uris } = credentials.web;
        this.oauth2_client = new google.auth.OAuth2(
            client_id,
            client_secret,
            redirect_uris[0]
        );
        this.sync_client = sync_client;
        let domain = opts.NSP_EMAIL_DOMAIN;
        if (domain === undefined || domain === null || domain === "") {
            domain = undefined;
        } else {
            this.domain = domain;
        }
    }

    async loadToken() {
        if (!this.loaded) {
            try {
                console.log(`Looking for ${this.token_key}`);
                const oauth2Doc = await this.sync_client
                    .documents(this.token_key)
                    .fetch();
                if (
                    oauth2Doc === undefined ||
                    oauth2Doc.data == undefined ||
                    oauth2Doc.data.token === undefined
                ) {
                    console.log(`Didn't find ${this.token_key}`);
                } else {
                    const token = oauth2Doc.data.token;
                    validate_scopes(oauth2Doc.data.scopes);
                    this.oauth2_client.setCredentials(token);
                    console.log(`Loaded token ${this.token_key}`);
                    this.loaded = true;
                }
            } catch (e) {
                console.log(
                    `Failed to load token for ${this.token_key}.\n ${e}`
                );
            }
        }
        return this.loaded;
    }

    get token_key() {
        return `oauth2_${this.number}`;
    }

    async deleteToken() {
        const oauth2Doc = await this.sync_client
            .documents(this.token_key)
            .fetch();
        if (
            oauth2Doc === undefined ||
            oauth2Doc.data == undefined ||
            oauth2Doc.data.token === undefined
        ) {
            console.log(`Didn't find ${this.token_key}`);
            return false;
        }
        await this.sync_client.documents(oauth2Doc.sid).remove();
        console.log(`Deleted token ${this.token_key}`);
        return true;
    }

    async completeLogin(code: string, scopes: string[]) {
        validate_scopes(scopes);
        const token = await this.oauth2_client.getToken(code);
        console.log(JSON.stringify(Object.keys(token.res!)));
        console.log(JSON.stringify(token.tokens));
        this.oauth2_client.setCredentials(token.tokens);
        try {
            const oauthDoc = await this.sync_client.documents.create({
                data: { token: token.tokens, scopes: scopes },
                uniqueName: this.token_key,
            });
        } catch (e) {
            console.log(
                `Exception when creating oauth. Trying to update instead...\n${e}`
            );
            const oauthDoc = await this.sync_client
                .documents(this.token_key)
                .update({
                    data: { token: token, scopes: scopes },
                });
        }
    }

    async getAuthUrl() {
        const id = this.generateRandomString();
        console.log(`Using nonce ${id} for ${this.number}`);
        const doc = await this.sync_client.documents.create({
            data: { number: this.number, scopes: SCOPES },
            uniqueName: id,
            ttl: 60 * 5, // 5 minutes
        });
        console.log(`Made nonce-doc: ${JSON.stringify(doc)}`);

        const opts: GenerateAuthUrlOpts = {
            access_type: "offline",
            scope: SCOPES,
            state: id,
        };
        if (this.domain) {
            opts["hd"] = this.domain;
        }

        const authUrl = this.oauth2_client.generateAuthUrl(opts);
        return authUrl;
    }

    generateRandomString() {
        const length = 30;
        let result = "";
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }
        return result;
    }
}

export { UserCreds, SCOPES, USER_CREDS_OPTS };
