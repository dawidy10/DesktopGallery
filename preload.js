const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
	selectFolder: () => ipcRenderer.invoke("select-folder"),
	readImages: (folderPath) => ipcRenderer.invoke("read-images", folderPath),
	minimize: () => ipcRenderer.send("window:minimize"),
	maximize: () => ipcRenderer.send("window:maximize"),
	close: () => ipcRenderer.send("window:close"),
});
