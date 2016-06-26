#!/bin/bash

VALID_URL=https://mannrobo.github.io/

function parse_yaml {
   local prefix=$2
   local s='[[:space:]]*' w='[a-zA-Z0-9_]*' fs=$(echo @|tr @ '\034')
   sed -ne "s|^\($s\):|\1|" \
        -e "s|^\($s\)\($w\)$s:$s[\"']\(.*\)[\"']$s\$|\1$fs\2$fs\3|p" \
        -e "s|^\($s\)\($w\)$s:$s\(.*\)$s\$|\1$fs\2$fs\3|p"  $1 |
   awk -F$fs '{
      indent = length($1)/2;
      vname[indent] = $2;
      for (i in vname) {if (i > indent) {delete vname[i]}}
      if (length($3) > 0) {
         vn=""; for (i=0; i<indent; i++) {vn=(vn)(vname[i])("_")}
         printf("%s%s%s=\"%s\"\n", "'$prefix'",vn, $2, $3);
      }
   }'
} # Source for YAML Parsing Function: http://stackoverflow.com/a/21189044

eval $(parse_yaml ./_config.yml "CONFIG_")

if [ "$CONFIG_url" == "$VALID_URL" ]; then
echo "URL is properly set."
exit 0
else
echo "Fault in _config.yml! The URL value is set to:"
echo $CONFIG_url
echo "This value should be set to: "
echo $VALID_URL
exit 1
fi
