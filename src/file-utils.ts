import * as fs from "fs";
import '@twilio-labs/serverless-runtime-types';
function load_credentials_files() {
    return JSON.parse(
        fs
            .readFileSync(Runtime.getAssets()["/credentials.json"].path)
            .toString()
    );
}
function get_service_credentials_path() {
    return Runtime.getAssets()["/service-credentials.json"].path;
}
export { load_credentials_files, get_service_credentials_path };
