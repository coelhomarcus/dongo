import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let win: BrowserWindow | null = null;

const createWindow = () => {
    win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"), // comunicação segura
            nodeIntegration: false,
            contextIsolation: true,
        },
    });

    if (process.env.VITE_DEV_SERVER_URL) {
        win.loadURL(process.env.VITE_DEV_SERVER_URL);
    } else {
        win.loadFile(path.join(__dirname, "../dist/index.html"));
    }
};

// Handler para requisições HTTP
ipcMain.handle('make-request', async (event, { method, url, data, headers }) => {
    const startTime = Date.now();
    
    try {
        const response = await axios({
            method: method.toLowerCase(),
            url,
            data,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            timeout: 10000, // 10 segundos de timeout
        });

        const endTime = Date.now();
        const responseTime = endTime - startTime;
        
        // Calcular tamanho da resposta
        const responseString = JSON.stringify(response.data);
        const responseSize = new Blob([responseString]).size;

        return {
            success: true,
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            data: response.data,
            responseTime,
            responseSize,
        };
    } catch (error) {
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        
        if (axios.isAxiosError(error)) {
            const errorData = error.response?.data || error.message;
            const errorString = JSON.stringify(errorData);
            const responseSize = new Blob([errorString]).size;
            
            return {
                success: false,
                status: error.response?.status || 0,
                statusText: error.response?.statusText || 'Network Error',
                headers: error.response?.headers || {},
                data: errorData,
                error: error.message,
                responseTime,
                responseSize,
            };
        }
        
        const errorString = JSON.stringify(error);
        const responseSize = new Blob([errorString]).size;
        
        return {
            success: false,
            status: 0,
            statusText: 'Unknown Error',
            headers: {},
            data: error,
            error: 'Unknown error occurred',
            responseTime,
            responseSize,
        };
    }
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
