import {
    Context,
    ServerlessCallback,
    ServerlessEventObject,
    ServerlessFunctionSignature,
} from "@twilio-labs/serverless-runtime-types/types";
import UserCreds from "../user-creds";

type HandlerEvent = ServerlessEventObject<
    {
        state: string;
        code: string;
    },
    {},
    {}
>;
type HandlerEnvironment = {
    SYNC_SID: string;
    NSP_EMAIL_DOMAIN: string;
};

/**
 * Twilio Serverless function handler for completing user authentication.
 * @param {Context<HandlerEnvironment>} context - The Twilio serverless context.
 * @param {ServerlessEventObject<HandlerEvent>} event - The event object containing state and code.
 * @param {ServerlessCallback} callback - The callback function.
 */
export const handler: ServerlessFunctionSignature<
    HandlerEnvironment,
    HandlerEvent
> = async function (
    context: Context<HandlerEnvironment>,
    event: ServerlessEventObject<HandlerEvent>,
    callback: ServerlessCallback
) {
    console.log(`Handling auth completion: ${JSON.stringify(event)}`);

    const state = event.state;
    if (state === undefined) {
        throw new Error("Missing nonce");
    }
    const twilioSync = context
        .getTwilioClient()
        .sync.services(context.SYNC_SID);

    let doc;
    try {
        console.log(`Looking for state ${state}...`);
        doc = await twilioSync.documents(state).fetch();
    } catch (e) {
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

    const user_creds = new UserCreds(twilioSync, number, context);
    if (await user_creds.loadToken()) {
        callback(null, "already_valid");
        return;
    }

    const code = event.code;
    const scopes = doc.data.scopes;
    try {
        await twilioSync.documents(doc.sid).remove();
        console.log(`Deleted nonce ${doc.uniqueName}`);
    } catch (e) {
        callback(null, `Failed to delete nonce: ${e}`);
        return;
    }

    try {
        await user_creds.completeLogin(code, scopes);
    } catch (e) {
        if (e instanceof Error || e instanceof String) {
            callback(e);
        } else {
            callback("Failed to complete user auth");
        }
        return;
    }
    callback(
        null,
        "Please return to your messaging app and engage BVNSP bot again."
    );
};