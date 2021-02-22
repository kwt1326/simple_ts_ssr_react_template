#!/bin/sh

mkdir env
gpg --quiet --batch --yes --decrypt --passphrase="$TEST_SECRET_VALUE" \
--output ./env/env.js env.js.gpg