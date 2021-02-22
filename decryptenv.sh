#!/bin/sh

cd back_end
mkdir env
gpg --quiet --batch --yes --decrypt --passphrase="$TEST_SECRET_VALUE" \
--output ./env.js env.js.gpg