#! /bin/bash
ln -s $PWD/private/current/credentials.private.json assets/credentials.private.json
ln -s $PWD/private/current/service-credentials.private.json assets/service-credentials.private.json
ln -s $PWD/private/current/.env .env
ln -s $PWD/private/current/.twilio-functions .twilio-functions
