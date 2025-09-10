const { ipcRenderer, contextBridge } = require('electron');

console.log('Preload script carregado!');

// Expor APIs seguras para o renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  makeRequest: (method: string, url: string, data?: unknown, headers?: Record<string, string>) => 
    ipcRenderer.invoke('make-request', { method, url, data, headers })
});

console.log('electronAPI exposta no window!');