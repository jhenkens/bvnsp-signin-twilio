"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
require("@twilio-labs/serverless-runtime-types");
const handler = function (context, event, callback) {
    const response = new Twilio.Response();
    const twiml = new Twilio.twiml.MessagingResponse();
    // Cookies are accessed by name from the event.request.cookies object
    // If the user doesn't have a count yet, initialize it to zero. Cookies are
    // always strings, so you'll need to convert the count to a number
    const count = Number(Object.keys(event.request.cookies).length) || 0;
    // Return a dynamic message based on if this is the first message or not
    const message = count > 0
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
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjZWl2ZS5wcm90ZWN0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWNlaXZlLnByb3RlY3RlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpREFBK0M7QUFRdEMsTUFBTSxPQUFPLEdBQWdDLFVBQ2xELE9BQWdCLEVBQ2hCLEtBQTRCLEVBQzVCLFFBQTRCO0lBRTVCLE1BQU0sUUFBUSxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3ZDLE1BQU0sS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBRW5ELHFFQUFxRTtJQUNyRSwyRUFBMkU7SUFDM0Usa0VBQWtFO0lBQ2xFLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXJFLHdFQUF3RTtJQUN4RSxNQUFNLE9BQU8sR0FDWCxLQUFLLEdBQUcsQ0FBQztRQUNQLENBQUMsQ0FBQyx5QkFBeUIsS0FBSyxFQUFFO1FBQ2xDLENBQUMsQ0FBQyxvQ0FBb0MsQ0FBQztJQUUzQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRXZCLFFBQVE7UUFDTixpREFBaUQ7U0FDaEQsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMxQiw0REFBNEQ7U0FDM0QsWUFBWSxDQUFDLGNBQWMsRUFBRSxVQUFVLENBQUM7UUFDekMsdUVBQXVFO1FBQ3ZFLG9FQUFvRTtRQUNwRSw0Q0FBNEM7U0FDM0MsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBRTlDLE9BQU8sUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNsQyxDQUFDLENBQUM7QUFoQ1csUUFBQSxPQUFPLFdBZ0NsQiJ9