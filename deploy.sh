#!/bin/bash

# build the app
# npm run build
# npm run builder

cd release

# create zip files
for filename in Liara-Desktop*; do
  if [[ ${filename} =~ (exe|deb|dmg)$ ]]; then
    zip "${filename}.zip" $filename
    c=$(echo "$filename".zip | cut -d- -f4-)
    copy "${filename}.zip" "Liara-Desktop-latest-$c"
  fi
done

# upload to minio
mc cp -r latest* "${MINIO_TARGET}"/desktop 
mc cp -r Liara-Desktop* "${MINIO_TARGET}"/desktop 
