var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var win;
var args = JSON.parse(process.argv[2])

function createWindow(url, headless) {
  win = new BrowserWindow({width: 800, height: 600, show: !headless})

  win.loadURL(url)

  win.on('closed', () => {
    win = null;
  })
}


app.on('window-all-closed', () => {
  app.quit();
});

app.on('ready', () => {
  createWindow(args.url, args.headless);
});
