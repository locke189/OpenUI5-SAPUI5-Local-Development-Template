# OpenUI5-SAPUI5-Local-Development-Template
Template for local development, alternative to SAP WebIDE.

Last week I had to travel to another city and I couldn't connect to Internet, and well because sap dev tools for SAPUI5/OPENUI5 are mostly web I kinda got nothing to do for a couple of days. I'm creating this template to run a local web server compatible with SAPUI5/OPENUI5, in order to use local dev tools and well... be able to work offline and use my favourite dev tools.

# Installation
  1.  Clone / Download repo
  2.   on the root directory run: _npm install_

# Running Server
  1.  on the root directory run: _npm start_
  2.  open your browser at *http://localhost:3000*

# Start Developing!
All files are in the webapp folder, in which all the UI5 development will take place. The localhost:3000 will take you to localenv.html file, but you can launch any file in the webapp folder. I like to keep an *index.html* with the CDN bootstrap link and the *localenv.html* with a local openui5 runtime.

# OpenU5 Version

_1.36.10 (2016-05-20)_

To upgrade the version of OpenUI5 runtime go to *http://openui5.org/download.html* and download the package. Replace the files in the _/webapp/resources/_ folder.


*Enjoy!*

