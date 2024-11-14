import * as fs from "fs";
import '@twilio-labs/serverless-runtime-types';

/**
 * Load credentials from a JSON file.
 * @returns {any} The parsed credentials from the JSON file.
 */
function load_credentials_files(): any {
    return JSON.parse(
        fs
            .readFileSync(Runtime.getAssets()["/credentials.json"].path)
            .toString()
    );
}

/**
 * Get the path to the service credentials file.
 * @returns {string} The path to the service credentials file.
 */
function get_service_credentials_path(): string {
    return Runtime.getAssets()["/service-credentials.json"].path;
}

export { load_credentials_files, get_service_credentials_path };