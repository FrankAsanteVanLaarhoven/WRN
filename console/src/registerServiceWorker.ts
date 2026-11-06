export function registerSW() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('[*] WRN PWA ServiceWorker registered with scope:', reg.scope);
        })
        .catch((err) => {
          console.warn('[!] WRN PWA ServiceWorker registration failed:', err);
        });
    });
  }
}
