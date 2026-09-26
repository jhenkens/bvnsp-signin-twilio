# Mac Setup

Set up symbolic links as per make_links.sh

## Install Node.js and npm

 ###  Using NVM:
Download the nvm install script via cURL:
1. curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.40.4/install.sh | bash
2. Ensure that nvm was installed correctly with nvm --version, which should return the version of nvm installed.
3. Install the version of Node.js you want 
   * Install the latest version with nvm install node 
   * Use the latest version with nvm use node 
   * Install the latest LTS version with nvm install --lts 
   * Use the latest LTS verison with nvm use --lts

### By hand
1. Download the latest version of Node.js from https://nodejs.org/en/download/
2. Ensure system has appropriate C++ compiler installed
   * For Mac, install Xcode from the App Store
   * Or in Terminal, run xcode-select --install; select "Install" when prompted
3. Download Node.js pre-built binaries for your system from https://nodejs.org/en/download/prebuilt-binaries
4. Extract the tarball to /usr/local
5. Add the bin directory to your PATH
   * In Terminal, run echo 'export PATH=$PATH:/usr/local/node-vx.x.x-darwin-x64/bin' >> ~/.zshenv
   * Replace x.x.x with the version number of the Node.js you downloaded
   * Run source ~/.zshenv to update your PATH
   * Validate the installation with node -v and npm -v

## Install Twilio CLI
1. Install the Twilio CLI via npm: npm install twilio-cli -g
2. Or download the installer from https://www.twilio.com/docs/twilio-cli/getting-started/install
   * Run the installer; If macOS prevents the installer from running, see https://support.apple.com/en-us/102445
3. Validate the installation with twilio -v

## Install Webpack
1. Install the Webpack binary  webpack-cli: npm install --save-dev webpack webpack-cli

## TypeScript 7
1. Remove the old package-lock.json and node_modules directory:
   * rm -rf package-lock.json node_modules
2. Reinstall the dependencies (ignoring legacy dependencies to keep twilio-run@5.0.1 from complaining about its legacy hard dependency on node 22. The server side supports 24):
   * npm install --legacy-peer-deps

## SWC
SWC is a superfast TypeScript / JavaScript compiler. It is used to compile the TypeScript code in this project to JavaScript. The SWC compiler is used instead of the TypeScript compiler (tsc) because it is much faster and has better support for modern JavaScript features.
As it is written in rust, and npm code runs in sandbox mode, and blocks third-party packages from executing lifecycle scripts, we need to explicitly authorize it:
* npm approve-scripts @swc/core unrs-resolver

## Build and run the project
As per setup.md instructions;
1. Run npm run build to build the project
2. Execute npm run start to run a local command line interface

Hit the local server from command line as follows:
curl -X POST http://localhost:3000/handler \
-H "Content-Type: application/x-www-form-urlencoded" \
-d "From=+1234567890&To=+0987654321&Body=YourMessageHere"
Note that this works for single commands (fast checkins) but in order to capture state through the request cookie use the following:

Load the following URL in your browser:
http://localhost:3000/handler?From=234567890&To=9876543210&Body=YourMessageHere

## Permissions
Note that if you make a copy of the BV Daily Log sheet and update the sheet_id,
also grant access to your copy to the Google service account for which you provided the assets/credentials.private.json 

## Deploying code
1. Bump the version number in package.json and package-lock.json
2. Adjust your .env to point to the production sheet
3. Create a Twilio profile: twilio profiles:create
4. Enter the appropriate values for the profile (account SID, auth token, etc.)
5. Set the profile as the default: twilio profiles:use default
6. Or, if you named the profile something else, use that name instead of default
7. Deploy the functions: npm run deploy
8. If that fails due to: "│ ERROR Service with name 'bvnsp-signin-twilio' already exists with SID "<account_sid> then overwrite the service with: twilio serverless:deploy --override-existing-project --environment prod

## Serverless Toolkit v3
See https://github.com/twilio-labs/serverless-toolkit/blob/main/docs/MIGRATION.md
Make sure that you're running the latest version of the Twilio CLI and the Serverless Toolkit. You can update the Twilio CLI with twilio update and the Serverless Toolkit with npm install -g twilio-cli@latest
Go to at least cli version 7.

## Google and serverless weirdness
Twilio serversless under node24 wants to force  "@twilio/runtime-handler": "2.1.2", however, that version is not available on npm public servers.
So we're leaving it in our spec as 2.1.0, which workds locally, and the deployment will override that.
Also, we specifically need to peg Google APIs at 144 in the package.json. Trying to go to a newer version such as 173 or higher will make it choke, silently during the deployment step (probably on some typescript 7 dependency or some other voodoo).
