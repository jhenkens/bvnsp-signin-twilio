import "@twilio-labs/serverless-runtime-types";
import {
    Context,
    ServerlessCallback,
    ServerlessEventObject,
    ServerlessFunctionSignature,
} from "@twilio-labs/serverless-runtime-types/types";
import BVNSPCheckinHandler, { HandlerEvent } from "./bvnsp_checkin_handler";
import { HandlerEnvironment } from "../env/handler_config";

const NEXT_STEP_COOKIE_NAME = "bvnsp_checkin_next_step";

export const handler: ServerlessFunctionSignature<
    HandlerEnvironment,
    HandlerEvent
> = async function (
    context: Context<HandlerEnvironment>,
    event: ServerlessEventObject<HandlerEvent>,
    callback: ServerlessCallback
) {
    const handler = new BVNSPCheckinHandler(context, event);
    let message: string;
    let next_step: string = "";
    try {
        const handler_response = await handler.handle();
        message =
            handler_response.response ||
            "Unexpected result - no response determined";
        next_step = handler_response.next_step || "";
    } catch (e) {
        console.log("An error occured");
        try {
            console.log(JSON.stringify(e));
        } catch {
            console.log(e);
        }
        message = "An unexpected error occured.";
        if (e instanceof Error) {
            message += "\n" + e.message;
            console.log("Error", e.stack);
            console.log("Error", e.name);
            console.log("Error", e.message);
        }
    }

    const response = new Twilio.Response();
    const twiml = new Twilio.twiml.MessagingResponse();

    twiml.message(message);

    response
        // Add the stringified TwiML to the response body
        .setBody(twiml.toString())
        // Since we're returning TwiML, the content type must be XML
        .appendHeader("Content-Type", "text/xml")
        .setCookie(NEXT_STEP_COOKIE_NAME, next_step);

    return callback(null, response);
};
