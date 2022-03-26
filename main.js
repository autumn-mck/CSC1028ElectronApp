// Node.js to launch the electron app
// Mostly from https://www.electronjs.org/docs/latest/tutorial/quick-start/

const path = require("path");
const { app, BrowserWindow } = require("electron");

// Function for creating the window
const createWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		autoHideMenuBar: true,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
	});

	// Load the index.html file
	win.loadFile("index.html");
};

// When the app is ready, create the window
app.whenReady().then(() => {
	createWindow();

	// Apparently a workaround for odd MacOS behaviour
	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

// Quit the application if no windows are left open
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});
