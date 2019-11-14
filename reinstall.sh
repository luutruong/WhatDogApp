#!/usr/bin/env bash

set -e

rm -rf package-lock.json
rm -rf ios/build/
rm -rf ios/Pods/
rm -rf ios/Podfile.lock
rm -rf android/build/

npm install

cd ios/ && pod install