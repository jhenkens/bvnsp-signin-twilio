exports.handler = async function(context, event, callback) {
  if (event.checkin === undefined) {
    callback(null, {status: 'fail', message: `Function was not passed checkin`});
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
            callback(null, {status: 'success', checkin_type: result});
            return;
          }
        }
      }
    } catch (err) {
      console.log(err)
    }
    callback(null, {status: 'fail', message: `No match ${received}`});
  }
};
