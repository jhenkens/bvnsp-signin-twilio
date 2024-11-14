#! /bin/bash
DEST="${DEST-current}"

# Remember to set the permissions of the private directory to 700

# Create symlinks to the private directory for the GCP token
ln -f -s "../private/${DEST}/credentials.private.json" "assets/credentials.private.json"
# Create symlinks to the private directory for the GCP token
ln -f -s "../private/${DEST}/service-credentials.private.json" "assets/service-credentials.private.json"
# Create symlinks to the private directory for the environment file, copied from .env_template and values filled in
ln -f -s "./private/${DEST}/.env" ".env"
