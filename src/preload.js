const { contextBridge, ipcRenderer } = require('electron');
console.log("preload.js loaded");


contextBridge.exposeInMainWorld('electron', {

  invoke: (channel, data) => ipcRenderer.invoke(channel, data),
  getAllEmployees: () => ipcRenderer.invoke('getAllEmployees'),
  addEmployee: (employee) => ipcRenderer.invoke('addEmployee', employee),
  deleteEmployeeById: (uuid) => ipcRenderer.invoke('deleteEmployeeById', uuid)
});
