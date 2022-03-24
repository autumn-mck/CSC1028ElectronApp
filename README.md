# Electron-based front-end for CSC1028 Project

See <https://mck.is/CSC1028> for further details.

![Electron app UI](ElectronUI.png)

The electron app provides a user-friendly interface allowing the user to make queries regarding any URL, and displays the data to the user in a better format than the entirely raw JSON, however further steps should be taken as the current presentation is still not easily readable.

Since it is built with electron, the page is little more than a HTML page with some javascript behind it! As a result, all this app has to do is query the back-end HTTP APIs and display the result to the user!

### Running the application

Assuming you've followed the steps above for running/developing the central node.js app (Which you should have done, as this electron app isn't too useful without it), not much more is required to run the electron app. After opening the folder, you'll need to run `npm install --save-dev electron` to install everything required for electron. You can then run `npm start` to start the app.  
You might also want to look at <https://www.electronjs.org/docs/latest/tutorial/quick-start/> for an introduction to Electron.

### Further development

The electron app itself is thankfully not too complex.  
First, there's the `main.js` file, which is a node.js application that is used to launch the electron browser window itself, which is `index.html`. This just works like a standard web page - the HTML is stored in `index.html`, the CSS in `index.css` (The CSS probably doesn't need to much editing - It's designed to work well with just plain HTML), and the javascript is in `renderer.js`.

The javascript doesn't have to do too much in this case - it only needs to query the Node.js APIs created earlier, and display the results to the user. If you're looking for something to improve in the electron application, I'd suggest this - currently, only the raw data returned is displayed to the user.
