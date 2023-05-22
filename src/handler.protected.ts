import {
    Context,
    ServerlessCallback,
    ServerlessEventObject,
    ServerlessFunctionSignature,
    TwilioClient,
} from "@twilio-labs/serverless-runtime-types/types";
import { find_patroller_from_number, get_sheets_service } from "./util";
import { google } from "googleapis";
import { UserCreds, USER_CREDS_OPTS } from "./user-creds";
import { ServiceContext } from "@twilio-labs/serverless-runtime-types/types";
import { GoogleAuth, OAuth2Client } from "googleapis-common";

type HandlerEvent = ServerlessEventObject<
    {
        From: string | undefined;
        To: string | undefined;
        number: string | undefined;
        Body: string | undefined;
    },
    {},
    { bvnsp_checkin_state: string | undefined }
>;
type HandlerEnvironment = {
    SHEET_ID: string;
    PHONE_NUMBER_LOOKUP_SHEET: string;
    PHONE_NUMBER_NUMBER_COLUMN: string;
    PHONE_NUMBER_NAME_COLUMN: string;
    SYNC_SID: string;
    USE_SERVICE_ACCOUNT: string;
    NSP_EMAIL_DOMAIN: string;
};

export const handler: ServerlessFunctionSignature<
    HandlerEnvironment,
    HandlerEvent
> = async function (
    context: Context<HandlerEnvironment>,
    event: ServerlessEventObject<HandlerEvent>,
    callback: ServerlessCallback
) {
    const handler = new Handler(context, event);
    const handler_response = await handler.handle();

    const response = new Twilio.Response();
    const twiml = new Twilio.twiml.MessagingResponse();

    const message = handler_response?.response || "No response";
    const count = 0;

    // const sheets_service = get_sheets_service(
    //     await get_service_auth(sync_client, SCOPES, number, context)
    // );

    // const phone_lookup = await find_patroller_from_number(
    //     number,
    //     sheets_service,
    //     context
    // );

    // message = `Hello ${phone_lookup.name}.\n${message}`;
    // // Access the pre-initialized Twilio REST client
    // const twilioClient = context.getTwilioClient();

    // await twilioClient.messages
    //     .create({ to, from, body })
    //     .then((result) => {
    //         console.log("Created message using callback");
    //         console.log(result.sid);
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });

    twiml.message(message);

    response
        // Add the stringified TwiML to the response body
        .setBody(twiml.toString())
        // Since we're returning TwiML, the content type must be XML
        .appendHeader("Content-Type", "text/xml")
        // You can increment the count state for the next message, or any other
        // operation that makes sense for your application's needs. Remember
        // that cookies are always stored as strings
        .setCookie("count", (count + 1).toString());

    return callback(null, response);
};

type ResponseObject = { response: string };

class Handler {
    from: string;
    to: string;
    body: string | undefined;
    bvnsp_checkin_state: string | undefined;
    use_service_account: boolean;
    twilio_client: TwilioClient;
    sync_sid: string;
    user_auth_opts: USER_CREDS_OPTS;
    sync_client: ServiceContext | null = null;
    user_creds: UserCreds | null = null;
    service_creds: GoogleAuth | null = null;
    constructor(
        context: Context<HandlerEnvironment>,
        event: ServerlessEventObject<HandlerEvent>
    ) {
        // Determine message details from the incoming event, with fallback values
        this.from = event.From || event.number || "+16508046698";
        this.to = event.To || "+12093000096";
        this.body = event.Body;
        this.bvnsp_checkin_state = event.request.cookies.bvnsp_checkin_state;
        this.use_service_account = context.USE_SERVICE_ACCOUNT === "true";

        this.twilio_client = context.getTwilioClient();
        this.sync_sid = context.SYNC_SID;
        this.user_auth_opts = context;
    }
    delay(time: number) {
        return new Promise((res) => {
            setTimeout(res, time);
        });
    }
    async handle(): Promise<ResponseObject | undefined> {
        if (this.body == "logout") {
            return await this.logout();
        }

        if (!this.use_service_account) {
            const response = await this.check_user_creds();
            if (response) return response;
        }
    }

    async check_user_creds() {
        const user_creds = this.get_user_creds();
        if (!(await user_creds.loadToken())) {
            const authUrl = await user_creds.getAuthUrl();
            await this.twilio_client.messages
                .create({
                    to: this.from,
                    from: this.to,
                    body: `Hi, before you can use BVNSP bot, you must login. Please follow this link:
            ${authUrl}`,
                })
                .then((result) => {
                    console.log("Sent login text");
                    console.log(result.sid);
                })
                .catch((error) => {
                    console.error(error);
                });
            await this.delay(5000);
            return { response: "Message me again when done..." };
        }
    }

    async logout() {
        const user_creds = this.get_user_creds();
        await user_creds.deleteToken();
        return {
            response: "Okay, I have removed all login session information.",
        };
    }

    get_sync_client() {
        if (!this.sync_client) {
            this.sync_client = this.twilio_client.sync.services(this.sync_sid);
        }
        return this.sync_client;
    }

    get_user_creds() {
        if (!this.user_creds) {
            this.user_creds = new UserCreds(
                this.get_sync_client(),
                this.from,
                this.user_auth_opts
            );
        }
        return this.user_creds;
    }

    get_service_creds(scopes: string[]) {
        if (!this.service_creds) {
            this.service_creds = new google.auth.GoogleAuth({
                keyFile: Runtime.getAssets()["/service-credentials.json"].path,
                scopes: scopes,
            });
        }
        return this.service_creds;
    }

    async get_valid_creds(scopes: string[]) {
        if (this.use_service_account) {
            return this.get_service_creds(scopes);
        }

        const user_creds = this.get_user_creds();
        if (!(await user_creds.loadToken())) {
            throw new Error("User is not authed.");
        }
        console.log("Using user account for service auth...");
        return user_creds.oauth2_client;
    }
}
