#!/bin/bash

rsync -avzh -Pav -e "ssh -i $SSH_KEY" build/html/* root@194.195.245.183:/srv/http/e-notes.org/public/
