#! /bin/bash
ln -f -s ../private/current/credentials.private.json assets/credentials.private.json
ln -f -s ./private/current/service-credentials.private.json assets/service-credentials.private.json
ln -f -s ./private/current/.env .env
ln -f -s ./private/current/.twilio-functions .twilio-functions
