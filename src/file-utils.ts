import * as fs from "fs";
function load_credentials_files() {
    return JSON.parse(
        fs
            .readFileSync(Runtime.getAssets()["/credentials.json"].path)
            .toString()
    );
}
export { load_credentials_files }
