// Description
// Add a delay, useful for using with Twilio Studio Run Function Widget

exports.handler = function (context, event, callback) {
  // Function can run up to 10 seconds (value of delay is milliseconds)

  // Pass in delay as a URL query parameter
  // Example: https://x.x.x.x/<path>?delay=5000
  let delayInMs = event.delay || 5000;

  let timerUp = () => {
    return callback(null, `Timer Up: ${delayInMs}ms`);
  };

  setTimeout(timerUp, delayInMs);
};
