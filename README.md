# LTL Pickup & Delivery

## HTML5/JS/CSS files for use in Hybrid (Cordova-based) Application

### Overview

This repository contains the raw web files for use in a Hybrid mobile
application.  This repo should not contain any native or platform-specific
files (e.g. iOS, Android, etc.).

### Submodule Info

This repository is intended to be used as the "www" folder in a Cordova-based
mobile application.  Here is one way to achieve this:

1. Create a new PhoneGap/Cordova application, using PhoneGap's "create" utility:

    # create <dest> <default namespace> <project name>
    create './mycode/ltl-pd-android' 'com.bluedotsolutions' 'ltl-pd-android'

1. Make this folder a new Git repository (e.g. ltl-pd-android)

    cd ./mycode/ltl-pd-android
    git init
    git commit -a -m 'Initial commit'

1. Remove the default www folder created in the Cordova projects

    rm -rf ./mycode/ltl-pd-android/assets/www

1. Add this www repository as a submodule in the ltl-pd-android repo:

    cd ./mycode/ltl-pd-android
    git submodule add git@github.com:andywhite37/ltl-pd-www.git assets/www

    # git submodule init/update if needed (?)
    git submodule init
    git submodule update

### 3rd-Party Dependencies (included in lib)

1. jQuery (1.8.2)
1. Underscore.js (1.4.2)
1. Backbone.js (0.9.2)
1. Apache Cordova (2.2.0)
1. Require.js (2.1.1)
1. Twitter Bootstrap (2.2.1)
1. JSON2 (2012-10-08)
