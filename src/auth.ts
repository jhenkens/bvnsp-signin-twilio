import { google } from "googleapis";
import { UserCreds } from "./user-creds";
import { ServiceContext } from "@twilio-labs/serverless-runtime-types/types";

export { get_service_auth };

type AUTH_OPTS = {
    USE_SERVICE_ACCOUNT: string;
    NSP_EMAIL_DOMAIN: string | undefined | null;
};
async function get_service_auth(
    sync_client: ServiceContext,
    scopes: string[],
    number: string,
    opts: AUTH_OPTS
) {
    if (opts.USE_SERVICE_ACCOUNT === "true") {
        return new google.auth.GoogleAuth({
            keyFile: Runtime.getAssets()["/service-credentials.json"].path,
            scopes: scopes,
        });
    }

    const user_creds = new UserCreds(sync_client, number, opts);
    if (!(await user_creds.loadToken())) {
        throw new Error("User is not authed.");
    }
    console.log("Using user account for service auth...");
    return user_creds.oauth2_client;
}
