#! /bin/bash
DEST="${DEST-current}"

ln -f -s "../private/${DEST}/credentials.private.json" "assets/credentials.private.json"
ln -f -s "../private/${DEST}/service-credentials.private.json" "assets/service-credentials.private.json"
ln -f -s "./private/${DEST}/.env" ".env"
