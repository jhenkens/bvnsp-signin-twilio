import { google } from "googleapis";
import { GenerateAuthUrlOpts } from "google-auth-library";
import { OAuth2Client } from "googleapis-common";
import { sanitize_phone_number } from "./utils/util";
import { load_credentials_files } from "./utils/file_utils";
import { ServiceContext } from "@twilio-labs/serverless-runtime-types/types";
import { UserCredsConfig } from "./env/handler_config";
import { validate_scopes } from "./utils/scope_util";

const SCOPES = [
    "https://www.googleapis.com/auth/script.projects",
    "https://www.googleapis.com/auth/spreadsheets",
];

/**
 * Class representing user credentials for Google OAuth2.
 */
export default class UserCreds {
    number: string;
    oauth2_client: OAuth2Client;
    sync_client: ServiceContext;
    domain?: string;
    loaded: boolean = false;

    /**
     * Create a UserCreds instance.
     * @param {ServiceContext} sync_client - The Twilio Sync client.
     * @param {string | undefined} number - The user's phone number.
     * @param {UserCredsConfig} opts - The user credentials configuration.
     * @throws {Error} Throws an error if the number is undefined or null.
     */
    constructor(
        sync_client: ServiceContext,
        number: string | undefined,
        opts: UserCredsConfig
    ) {
        if (number === undefined || number === null) {
            throw new Error("Number is undefined");
        }
        this.number = sanitize_phone_number(number);

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

    /**
     * Load the OAuth2 token.
     * @returns {Promise<boolean>} A promise that resolves to a boolean indicating if the token was loaded.
     */
    async loadToken(): Promise<boolean> {
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
                    validate_scopes(oauth2Doc.data.scopes, SCOPES);
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

    /**
     * Get the token key.
     * @returns {string} The token key.
     */
    get token_key(): string {
        return `oauth2_${this.number}`;
    }

    /**
     * Delete the OAuth2 token.
     * @returns {Promise<boolean>} A promise that resolves to a boolean indicating if the token was deleted.
     */
    async deleteToken(): Promise<boolean> {
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

    /**
     * Complete the login process by exchanging the authorization code for a token.
     * @param {string} code - The authorization code.
     * @param {string[]} scopes - The scopes to validate.
     * @returns {Promise<void>} A promise that resolves when the login process is complete.
     */
    async completeLogin(code: string, scopes: string[]): Promise<void> {
        validate_scopes(scopes, SCOPES);
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

    /**
     * Get the authorization URL.
     * @returns {Promise<string>} A promise that resolves to the authorization URL.
     */
    async getAuthUrl(): Promise<string> {
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

    /**
     * Generate a random string.
     * @returns {string} A random string.
     */
    generateRandomString(): string {
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

/**
 * Interface representing the user credentials configuration.
 */
export { UserCreds, SCOPES as UserCredsScopes };
