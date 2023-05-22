exports.handler = async function(context, event, callback) {
  if (event.checkin === undefined) {
    callback(null, {status: 'fail', message: `Function was not passed checkin`});
  } else {
    const received = event.checkin.toLowerCase();
    console.log(`Looking for ${received}`);
    try {
      const types = JSON.parse(context.CHECKIN_VALUES);
      console.log(`types: ${types}`);
      for (const checkin_pair of types) {
        console.log(`pair: ${checkin_pair}`)
        const result = checkin_pair[0];
        const fast_lookup = checkin_pair[2];
        console.log(`Checking ${fast_lookup} => ${result}...`)
        if(received == fast_lookup){
          callback(null, {status: 'success', checkin_type: result});
          return;
        }
      }
    } catch (err) {
      console.log(err)
    }
    callback(null, {status: 'fail', message: `No match`});
  }
};
