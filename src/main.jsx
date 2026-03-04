import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const log = (msg) => {
  const debugLog = document.getElementById('debug-log');
  if (debugLog) {
    const div = document.createElement('div');
    div.innerText = `[JS_MAIN] ${msg}`;
    debugLog.appendChild(div);
  }
  console.log(`[JS_MAIN] ${msg}`);
};

log('Bootstrap starting...');

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    log('CRITICAL: Root element #root not found');
    throw new Error('Root element #root not found in DOM');
  }

  log('Creating React root...');
  const root = createRoot(rootElement);
  
  log('Rendering App...');
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  log('Render call completed.');
} catch (error) {
  log(`CRITICAL_ERROR: ${error.message}`);
  console.error('Neon Arcade: Critical boot error:', error);
}
