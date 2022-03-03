# Electron-based front-end for CSC1028 Project

See <https://mck.is/CSC1028> for further details.

![Electron app UI](ElectronUI.png)

The electron app provides a user-friendly interface allowing the user to make queries regarding any URL, and displays the data to the user in a better format than the entirely raw JSON, however further steps should be taken as the current presentation is still not easily readable.

Since it is built with electron, the page is little more than a HTML page with some javascript behind it! As a result, all this app has to do is query the back-end HTTP APIs and display the result to the user!

### Running the application

Assuming you've followed the steps above for running/developing the central node.js app (Which you should have done, as this electron app isn't too useful without it), not much more is required to run the elctron app. After opening the folder, you'll need to run `npm install --save-dev electron` to install everything required for electron. You can then run `npm start` to start the app.
