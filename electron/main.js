// https://github.com/electron/electron-quick-start/blob/master/main.js

const { electron, app, Tray, Menu, BrowserWindow } = require ('electron');

const path = require('path');
const url = require('url');

const iconPath = path.join (__dirname, 'icon.png');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1200, height: 800, show: true });
  appIcon = new Tray(iconPath);

  console.log ('electron dirname: ', __dirname);
  // and load the index.html of the app.
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../www/index.html'),
    protocol: 'file:',
    slashes: true
  });

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Item 1',
      type: 'radio',
    },
    {
      label: 'Item 2',
      submenu: [
        { label: 'submenu 1'},
        { label: 'submenu 2' }
      ],
    }
  ]);

  appIcon.setToolTip('Butterfly It tools');
  appIcon.setContextMenu(contextMenu);

  mainWindow.loadURL(startUrl);
  // mainWindow.loadURL("http://localhost:8100");

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
