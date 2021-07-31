#!/bin/bash

source scripts/env.sh

if [ -z "$SSH_KEY_PATH" ]; then
      echo "\$SSH_KEY_PATH not defined. Exiting."
      exit 1
fi

rsync -avzh -Pav -e "ssh -i $SSH_KEY_PATH" build/html/* root@194.195.245.183:/srv/http/e-notes.org/public/
