const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('wrnDesktop', {
  isDesktop: true,
  version: '0.2.0',
  platform: process.platform,
  minimize: () => ipcRenderer.send('window-minimize'),
  maximize: () => ipcRenderer.send('window-maximize'),
  close: () => ipcRenderer.send('window-close'),
  getEdgeStatus: () => ipcRenderer.invoke('get-edge-status')
});

