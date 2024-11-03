const { contextBridge, ipcRenderer } = require('electron');
console.log("preload.js loaded");


contextBridge.exposeInMainWorld('electron', {

  invoke: (channel, data) => ipcRenderer.invoke(channel, data),
});
