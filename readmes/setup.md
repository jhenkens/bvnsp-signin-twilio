## Google side
1. Go to [Google Cloud Dev Console](https://console.cloud.google.com/) and register a new application
1. Copy the ProjectID (number), we will use it later.
1. Under APIs/Services for the app, add Google Sheets API, App Script API
1. Under IAM/Admin, go to service accounts, and create a new service account
1. Download the credentials file for the service account, and move it to assets/service-credentials.private.json
1. Copy the email address associated with the service account, we will use it later
1. Go to your spreadsheet, go to sharing, and add the service account, by email, as an editor
1. Go to tool -> scripts, then on the scripts page, tools -> project, and set project ID to the project you just registered
1. Also on the scripts page, you must go to Publish -> Deploy as API executable. This must be run any time the script is updatedA.
1. The scriptId from the API-Executable page is the value you use in .envs

## Twilio Side
1. Create a [twilio](www.twilio.com) account
1. Create a project (suggested name: `bvnsp-signin-twilio`)
1. Create a phone number under that project
1. Enable WhatsApp for the project
1. Import studio flow
1. Get webhook url from studio-flow trigger
1. Paste webhook URL into whatsapp handler page
1. Create a [sync-service](https://www.twilio.com/console/sync/services/) (suggested name: `bvnsp-oauth-logics`), enable ACL, and copy/paste its SID to .env


## Code side
1. Copy .env_template to .env
1. Copy/Paste ACCOUNT_SID, and AUTH_TOKEN from twilio project into .env
1. Copy/Paste SHEET_ID for Google sheets ID into .env
1. Copy/Paste Script ID from bvnsp's sheet script into .env
1. Run `npm rum deploy` to publish functions
1. Go to [functions](https://www.twilio.com/console/functions), find the `bvnsp-signin-twilio` function, click on `complete-user-auth` on the left side, then copy-url on the bottom right

## Back to google side
1. Under IAM/Admin, add an OAUTH login, named `twilio`, and use the url from `complete-user-auth` as the redirect URL.
1. When you hit save, ignore the credentials window, go to the main screen, and hit the download button.
1. Save the credentials file to assets/credentials.private.json - OAuth is only used for the reset flow
