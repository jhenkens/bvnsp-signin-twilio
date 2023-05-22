import '@twilio-labs/serverless-runtime-types';
import {
    Context,
    ServerlessCallback,
    ServerlessEventObject,
    ServerlessFunctionSignature,
  } from '@twilio-labs/serverless-runtime-types/types';

  export const handler: ServerlessFunctionSignature = function(
    context: Context,
    event: ServerlessEventObject,
    callback: ServerlessCallback
  ) {
    const response = new Twilio.Response();
    const twiml = new Twilio.twiml.MessagingResponse();
  
    // Cookies are accessed by name from the event.request.cookies object
    // If the user doesn't have a count yet, initialize it to zero. Cookies are
    // always strings, so you'll need to convert the count to a number
    const count = Number(Object.keys(event.request.cookies).length) || 0;
  
    // Return a dynamic message based on if this is the first message or not
    const message =
      count > 0
        ? `Your current count is ${count}`
        : 'Hello, thanks for the new message!';
  
    twiml.message(message);
  
    response
      // Add the stringified TwiML to the response body
      .setBody(twiml.toString())
      // Since we're returning TwiML, the content type must be XML
      .appendHeader('Content-Type', 'text/xml')
      // You can increment the count state for the next message, or any other
      // operation that makes sense for your application's needs. Remember
      // that cookies are always stored as strings
      .setCookie('count', (count + 1).toString());
  
    return callback(null, response);
  };
  