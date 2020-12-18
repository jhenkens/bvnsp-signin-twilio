exports.handler = async function(context, event, callback) {
  if (event.checkin === undefined) {
    callback(`Function was not passed checkin`);
  } else {
    const received = event.checkin.toLowerCase();
    console.log(`Looking for ${received}`);
    try {
      const types = JSON.parse(context.CHECKIN_VALUES);
      for (const checkin_pair of types) {
        const result = checkin_pair[0];
        const lookups = checkin_pair[1].split("/");
        for (const lookup of lookups) {
          const lowerLookup = lookup.toLowerCase();
          console.log(`Testing ${lowerLookup}`);
          if (received === lowerLookup ||
            received.replace(/\s+/, "") === lowerLookup.replace(/\s+/, "")
          ) {
            callback(null, result);
            return;
          }
        }
      }
    } catch (err) {
      console.log(err)
    }
    callback(`Could not find corresponding checkin for ${received}`);
  }
};
