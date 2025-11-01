const { app, BrowserWindow, ipcMain, dialog, protocol, net } = require("electron");
const path = require("path");

const isDev = !app.isPackaged;
const protocolName = "local";

let win;

function createWindow() {
	win = new BrowserWindow({
		width: 1000,
		height: 700,
		frame: false,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
			sandbox: false,
		},
	});

	if (isDev) {
		win.loadURL("http://localhost:5173").catch((err) => {
			console.error("❌ Nu s-a putut încărca http://localhost:5173:", err.message);
		});
		win.webContents.openDevTools();
	} else {
		win.loadFile(path.join(__dirname, "dist/index.html"));
	}
}

// Protocol custom pentru fișiere locale
function registerLocalProtocol() {
	protocol.handle(protocolName, (request) => {
		const url = request.url.replace(`${protocolName}://`, "file://");
		return net.fetch(url);
	});
}

// Dialog pentru selectarea folderului
function registerDialogHandler() {
	ipcMain.handle("select-folder", async () => {
		const result = await dialog.showOpenDialog({
			properties: ["openDirectory"],
		});
		if (result.canceled) return null;
		return result.filePaths[0];
	});
}

const fs = require("fs");

// ...
function registerDialogHandler() {
	ipcMain.handle("select-folder", async () => {
		const result = await dialog.showOpenDialog({
			properties: ["openDirectory"],
		});
		if (result.canceled) return null;
		return result.filePaths[0];
	});

	ipcMain.handle("read-images", async (event, folderPath) => {
		const exts = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
		try {
			const files = fs.readdirSync(folderPath);
			const images = files
				.filter((f) => exts.some((ext) => f.toLowerCase().endsWith(ext)))
				.map((f) => path.join(folderPath, f));
			return images;
		} catch (e) {
			console.error(e);
			return [];
		}
	});
}

app.whenReady().then(() => {
	registerLocalProtocol();
	registerDialogHandler();
	createWindow();

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});

ipcMain.on("window:minimize", () => {
	if (win) win.minimize();
});

ipcMain.on("window:maximize", () => {
	if (win) {
		if (win.isMaximized()) win.unmaximize();
		else win.maximize();
	}
});

ipcMain.on("window:close", () => {
	if (win) win.close();
});
