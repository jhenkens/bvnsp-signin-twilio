#Setup
### Env
1. Copy `.env_template` to `.env`, we need to fill it out as we do later steps 

## Twilio Side
1. Create a [twilio](www.twilio.com) account
1. Copy `Account SID` and `Auth Token` to `.env`
1. Create a project (suggested name: `bvnsp-signin-twilio`)
1. Create a phone number under that project (button available on [console](https://www.twilio.com/console))
1. Create a [sync-service](https://www.twilio.com/console/sync/services/) (suggested name: `bvnsp-oauth-logins`), enable ACL, and copy/paste its SID to .env
1. Run `npm run deploy` to deploy our functions
    1. From the output, copy the URL ending in `/complete-user-auth` - this is your OAuth redirect URI. 
1. Go to [Studio Flows](https://www.twilio.com/console/studio/flows), hit Create Flow, name it `BVNSP Checkin Flow`.
    1. Click "Import from JSON", bottom right, and paste in json from `studio_flows/checkin_flow.json`

### Google Developer Project
1. Go to [Google Cloud Dev Console](https://console.cloud.google.com/) and register a new application, via dropdown top left.
    1. Name it consistently with other projects, keeps tracking easier (`bvnsp-signin-twilio`, perhaps)
1. With the newly created project selected, hit 3 dots on the right -> project settings, then copy the `Project Number` (all digits, no letters), and set it in `.env`
1. Click back on `Google APIs` top left, to go back to the dashboard for your new app.
1. Click Enable APIs top center, and add `Google Sheets API` and `Apps Script API`
1. From the dashboard, click OAuth consent screen
    1. Enter an app name (`BVNSP Checkin`)
    1. Under Authorized Domains, add `twil.io`
    1. Fill out other required fields
    1. Don't add any scopes
    1. Optional info, can put:
        * This app performs SMS based checkin for BVNSP via Twilio
    1. Hit save.
    1. Back on the overview for OAuth, you should see "User type: Internal", or a button to make it such
        * This restricts it to `@farwest.org` accounts
1. From the dashboard, click Credentials, Create Credentials (at the top), select service account
    1. Name it `twilio` (or anything, but it will be used by twilio)
    1. Can skip the grants
    1. Click the email of the new account from the resulting page
    1. Copy the service account email, and paste it into the corresponding row in `.env`
    1. Hit Add Key -> Create New -> Json
    1. Move (and rename) the downloaded file to `assets/service-credentials.private.json`
1. Click Create Credentials again, select OAuth Client
    1. Select Web Application, name it `twilio`, and add the redirect URI from our twilio function deployment.
        


### Spreadsheet
1. Go to the checkin spreadsheet
1. From the url, everything between `/d/` and `/edit` is the ID. Place this in `.env`
1. Go to Share (top right), and add the service account, by email, as an editor
1. Go to tool -> scripts, then on the scripts page, Resource -> Google Cloud Project, and set project ID to the project you put in the `.env`
    1. This will remove the 'auto-genned' project, and require re-auth for users to execute scripts, as it is now a new project.
1. On the scripts page, you must go to Publish -> Deploy as API executable.
    1. I am unsure if permission must be set to 'Anyone' or not.
    1. The scriptId from the resulting API-Executable page is the value you use in .env
    1. This must be run any time you update the script, bumping the version to a new number.


## Code side
1. Copy .env_template to .env
1. Copy/Paste ACCOUNT_SID, and AUTH_TOKEN from twilio project into .env
1. Copy/Paste SHEET_ID for Google sheets ID into .env
1. Copy/Paste Script ID from bvnsp's sheet script into .env
1. Run `npm rum deploy` to publish functions
1. Go to [functions](https://www.twilio.com/console/functions), find the `bvnsp-signin-twilio` function, click on `complete-user-auth` on the left side, then copy-url on the bottom right
1. Your `.env` and your `.twilio-functions` are your keys to deploying any updates. They are unique to your machine.

## Back to google side
1. Under IAM/Admin, add an OAUTH login, named `twilio`, and use the url from `complete-user-auth` as the redirect URL.
1. When you hit save, ignore the credentials window, go to the main screen, and hit the download button.
1. Save the credentials file to assets/credentials.private.json - OAuth is only used for the reset flow


### Whatsapp
Whatsapp is more responsive, and slightly cheaper on a twilio side. I am unsure of the whatsapp side for proper usage, using a registered, dedicated number.  
For my development, I used the [whatsapp sandbox](https://www.twilio.com/console/sms/whatsapp/learn), which uses a shared whatsapp number
that you register to our app using a unique code. If you use the sandbox, go to [sandbox settings](https://www.twilio.com/console/sms/whatsapp/sandbox) and paste in the "webhook url" from [the studio flow's trigger node](https://www.twilio.com/console/studio).
