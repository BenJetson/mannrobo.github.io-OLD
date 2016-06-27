#!/bin/bash

ERRORS=0
WARNS=0

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

function spacer {    
    for i in {1..2}; do
      echo ""
    done
}

function dashline {
    echo "----------------------------------------"
}

function textReset {
    tput sgr0;
}

function colorRed {
    tput setaf 1;
}

function colorYellow {
    tput setaf 3;
}

function colorGreen {
    tput setaf 2;
}

function colorCyan {
    tput setaf 6;
}

function colorBlue {
    tput setaf 4;
}

function colorBlack {
    tput setaf 0;
}

function formatBold {
    tput bold;
}

function doTest {

    local valueToCheck=$1
    local expectedValue=$2
    local valueTitle=$3
    local warnOnly=$4

    if [ -z "$warnOnly" ]; then warnOnly=false; fi;

    echo "Checking $valueTitle ..."
    dashline
    if [ "$valueToCheck" == "$expectedValue" ]; then
        colorGreen;echo "PASS: $valueTitle is properly set.";textReset;
    elif [ "$warnOnly" == true ]; then
        colorYellow;
        echo "WARN: Fault in _config.yml! $valueTitle is incorrectly set."
        echo "We expected '$expectedValue' but instead found '$valueToCheck'."
        echo "This will not affect your build status, but should be noted."
        textReset;
        WARNS=$(( $WARNS + 1 ))
    else
        colorRed;
        echo "FAIL: Fault in _config.yml! $valueTitle is incorrectly set."
        echo "We expected '$expectedValue' but instead found '$valueToCheck'."
        textReset;
        ERRORS=$(( $ERRORS + 1 ))
    fi

    spacer

}

spacer; tput setab 2;
colorCyan;formatBold;
echo "";echo "    Site Configuration Databse Tests";textReset;tput setab 2;
dashline
colorYellow;formatBold;echo "            ** TEST START **";textReset;
spacer

# Read in config file for testing
echo "Loading config from disk..."
dashline
eval $(parse_yaml "./_config.yml" "CONFIG_")
colorYellow;echo "Complete. [Status Unknown]";textReset;spacer


doTest "$CONFIG_title" "Mann Robotics" "site.title"
doTest "$CONFIG_url" "https://mannrobo.github.io/" "site.url"
doTest "$CONFIG_baseurl" "" "site.url"
doTest "$CONFIG_timezone" "America/New_York" "Time Zone (site.timezone)" true
doTest "$CONFIG_safe" "true" "safe build flag (site.safe)"
doTest "$CONFIG_github_username" "mannrobo" "site.github_username"
doTest "$CONFIG_email" "mannrobo@users.noreply.github.com" "site.email"
doTest "$CONFIG_permalink" "updates/:year/:month/:day/:title/" "Permalink Type (site.permalink)"
doTest "$CONFIG_paginate_path" "updates/page/:num/" "Update Pagination Path (site.paginate_path)"
doTest "$CONFIG_paginate" "10" "Updates per Page (site.paginate)" true


# Return exit code...
colorCyan;formatBold;echo "OVERALL RESULTS";textReset;
dashline;
if [ $WARNS -gt 0 ]; then
colorYellow;formatBold;
echo "Warnings were raised for $WARNS non-critical config faults."
echo "Be sure to investigate the source of these warnings and correct"
echo "  the issue prior to your next build."
textReset;
fi

if [ $ERRORS -gt 0 ]; then
colorRed;formatBold;
echo "Config checks failed. We found $ERRORS fault(s) in the config.yml database."
echo "Read the output above for detailed information about this problem."
spacer; tput setab 5;
echo ""
echo " +--------------+"
echo " |  __      __  |   Unfortunately, your build had a few critical errors "
echo " |  \ \    / /  |     that we just simply can't let pass through."
echo " |   \ \  / /   |  "
echo " |    \ \/ /    |  "
echo " |    / /\ \    |   However, if you read the output above and correct the"
echo " |   / /  \ \   |     problem, you can push a new commit to build again."
echo " |  /_/    \_\  |"
echo " |    ERROR!    |   THIS BUILD FAILED DUE TO $ERRORS CRITICAL CONFIG ERROR(S)."
echo " +--------------+"

textReset;
elif [ $WARNS -gt 0 ]; then
colorYellow; tput setab blue;
echo "       _  "
echo "      / \   Well... you almost got the config file right... :/ "
echo "     /   \  "
echo "    /  |  \   Since the errors in your config weren't critical, "
echo "   /   |   \    we'll let you off with only a warning this time."
echo "  /    @    \ "
echo " /___________\    Just fix the $WARNS warning(s) before the next push, OK? :) "
textReset;
else
colorGreen;formatBold;
echo "Config checks passed. We found zero faults in the config.yml database."
echo ""
tput setab 6;
echo "       __ "
echo "      / /   Looks like you somehow managed to scrape together valid config."
echo " __  / /    Fantastic Job, <insert username here>!"
echo " \ \/ / "
echo "  \__/   Config check passed with no warnings! Yay! :)"
textReset;
fi

spacer;
exit $ERRORS
