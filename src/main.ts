import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { addEmployee, getAllEmployees, deleteEmployeeById, updateEmployee } from './database';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      webSecurity: false,
    },
  });

  // Check if the app is in production mode
  const isDev = !app.isPackaged;

  if (isDev) {
    // Load the HTML file directly from the public folder in development
    mainWindow.loadURL(`file://${path.join(__dirname, '../public/index.html')}`);
  } else {
    // Load the HTML file from dist folder in production
    mainWindow.loadURL(`file://${path.join(__dirname, '../dist/index.html')}`);
  }
}

app.whenReady().then(createWindow);

ipcMain.handle('getAllEmployees', () => getAllEmployees());
ipcMain.handle('addEmployee', (event, employee) => addEmployee(employee));
ipcMain.handle('deleteEmployeeById', (event, uuid) => deleteEmployeeById(uuid));
ipcMain.handle('updateEmployee', (event, employee) => updateEmployee(employee));
