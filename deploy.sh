#!/bin/bash

set -e

# download mc client 
wget https://dl.min.io/client/mc/release/darwin-amd64/mc
chmod +x ./mc

# set alias
./mc alias set "${AWS_TARGET}" "${AWS_ENDPOINT}" "${AWS_ACCESS_KEY_ID}" "${AWS_SECRET_ACCESS_KEY}"

# build the app
npm run build
npm run builder

cd release

# create zip files
for filename in Liara-Desktop*; do
  if [[ ${filename} =~ (exe|deb|dmg)$ ]]; then
    zip "${filename}.zip" $filename
    c=$(echo "$filename".zip | cut -d- -f4-)
    cp "${filename}.zip" "Liara-Desktop-latest-$c"
  fi
done

# upload to minio
../mc cp -r latest* "${AWS_TARGET}"/releases 
../mc cp -r Liara-Desktop* "${AWS_TARGET}"/releases 
