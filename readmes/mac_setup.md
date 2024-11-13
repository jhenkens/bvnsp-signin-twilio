# Mac Setup

Set up symbolic links as per make_links.sh

## Install Node.js and npm

 ###  Using NVM:
Download the nvm install script via cURL:
1. curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
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
   * Run the installer; If MacOS prevents the installer from running, see https://support.apple.com/en-us/102445
3. Validate the installation with twilio -v

## Install Webpack
1. Install the Webpack binary  webpack-cli: npm install --save-dev webpack webpack-cli

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
