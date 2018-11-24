#!/usr/bin/env bash

set -e

./node_modules/.bin/prettier --config ./.prettierrc --write "./src/**/*.js"
./node_modules/.bin/eslint ./src/