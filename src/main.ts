import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { addEmployee, getAllEmployees, deleteEmployee, updateEmployee } from './database';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Uses preload for secure IPC
      contextIsolation: true,
    },
  });

  mainWindow.loadURL(`file://${path.join(__dirname, '../public/index.html')}`);
}

app.on('ready', createWindow);

ipcMain.handle('getAllEmployees', () => getAllEmployees());
ipcMain.handle('addEmployee', (event, employee) => addEmployee(employee));
ipcMain.handle('deleteEmployee', (event, id) => deleteEmployee(id));
ipcMain.handle('updateEmployee', (event, employee) => updateEmployee(employee));
