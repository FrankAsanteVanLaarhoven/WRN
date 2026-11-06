const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const http = require('http');

let mainWindow;
let tray;
let edgeProcess = null;

function checkEdgeRunning() {
  return new Promise((resolve) => {
    const req = http.get('http://127.0.0.1:8080/health', (res) => {
      resolve(res.statusCode === 200);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(500, () => {
      req.destroy();
      resolve(false);
    });
  });
}

function startEdgeServer() {
  const binaryPath = path.join(__dirname, '..', 'backend', 'go-edge', 'bin', 'wrn-edge-server');
  try {
    edgeProcess = spawn(binaryPath, [], {
      detached: false,
      stdio: 'ignore'
    });
    console.log('[*] WRN Native Desktop: Spawned background Go Edge Gateway');
  } catch (err) {
    console.warn('[!] Could not spawn local edge binary, falling back to network gateway:', err.message);
  }
}

async function createWindow() {
  // Check if edge server is running; if not, spawn it locally
  const isRunning = await checkEdgeRunning();
  if (!isRunning) {
    startEdgeServer();
  }

  mainWindow = new BrowserWindow({
    width: 1360,
    height: 860,
    minWidth: 1024,
    minHeight: 700,
    backgroundColor: '#0D0E15',
    titleBarStyle: 'hiddenInset',
    vibrancy: 'ultra-dark',
    visualEffectState: 'active',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // Try loading local vite preview/dev server, fallback to dist index.html
  mainWindow.loadURL('http://127.0.0.1:3000').catch(() => {
    mainWindow.loadFile(path.join(__dirname, '..', 'console', 'dist', 'index.html'));
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  ipcMain.on('window-minimize', () => mainWindow?.minimize());
  ipcMain.on('window-maximize', () => {
    if (mainWindow?.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow?.maximize();
    }
  });
  ipcMain.on('window-close', () => mainWindow?.close());
  ipcMain.handle('get-edge-status', async () => {
    return await checkEdgeRunning();
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    if (edgeProcess) {
      edgeProcess.kill();
    }
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
