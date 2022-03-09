#!/bin/bash

# build the app
npm run build
npm run builder

cd release

# create zip files
for filename in Liara-Desktop*; do
  if [[ ${filename} =~ (zip|win.exe)$ ]]; then
    rm ${filename}
    continue
  fi
  if [[ ${filename} =~ (exe|deb|dmg)$ ]]; then
    zip "${filename}.zip" $filename
    c=$(echo "$filename".zip | cut -d- -f4-)
    cp "${filename}.zip" "Liara-Desktop-latest-$c"
    rm $filename
  fi
done

# # upload to minio
mc cp -r latest* "${MINIO_TARGET}"/desktop 
mc cp -r Liara-Desktop* "${MINIO_TARGET}"/desktop 
