import { app, BrowserWindow } from "electron";
import path from "path";

let win: BrowserWindow | null = null;

const createWindow = () => {
    win = new BrowserWindow({
        width: 1200,
        height: 800,
        // webPreferences: {
        //     preload: path.join(__dirname, "preload.js"), // comunicação segura
        // },
    });

    if (process.env.VITE_DEV_SERVER_URL) {
        win.loadURL(process.env.VITE_DEV_SERVER_URL);
    } else {
        win.loadFile(path.join(__dirname, "../dist/index.html"));
    }
};

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
