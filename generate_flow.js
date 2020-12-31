const fs = require('fs');
const path = require('path');

const destination = process.argv.slice(2)[0];
if(destination === undefined || destination === null){
  throw new Error("Must provide output");
}
try {
  if (fs.existsSync(destination)) {
    if(fs.lstatSync(destination).isDirectory()){
      throw new Error('Cannot write to a directory');
    }
  }
} catch(err) {
}
const functionMappingFile = `${path.dirname(destination)}/function_mapping.json`;
const functionMapping = JSON.parse(fs.readFileSync(functionMappingFile));

const serviceSid = functionMapping.service_sid;
if(serviceSid === undefined){
  throw new Error('Could not find new service-sid for functions');
}
const environmentSid = functionMapping.environment_sid;
if(environmentSid === undefined){
  throw new Error('Could not find new environment-sid for functions');
}
const functionUrlBase = functionMapping.function_urls;
if(functionUrlBase === undefined){
  throw new Error('Could not find new function_urls for functions');
}

const rawJson = fs.readFileSync(`${__dirname}/studio_flows/checkin_flow.json`);
const json = JSON.parse(rawJson);
for(const state of json.states){
  if(state.type !== 'run-function'){
    continue;
  }
  const functionName = state.properties.url.split('twil.io/')[1];
  console.log(functionName);
  if(!(functionName in functionMapping)){
    throw new Error(`Did not find ${functionName} in mappings.`);
  }
  const map = functionMapping[functionName];
  if(map.function_sid === undefined){
    throw new Error(`Did not find sid for ${functionName}`);
  }
  state.properties.service_sid = serviceSid;
  state.properties.environment_sid = environmentSid;
  state.properties.function_sid = map.function_sid;
  state.properties.url = functionUrlBase + functionName;
}

fs.writeFileSync(destination, JSON.stringify(json, null, 2));
