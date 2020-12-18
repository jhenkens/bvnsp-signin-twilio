exports.handler = async function(context, event, callback) {
  const types = JSON.parse(context.CHECKIN_VALUES).map(x => x[1]);
  callback(null, `Are you patrolling ${types.slice(0,-1).join(", ")}, or ${types.slice(-1)}?`);
};
