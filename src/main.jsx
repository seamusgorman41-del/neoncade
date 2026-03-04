import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.jsx';
import './index.css';

console.log('Neon Arcade: Bootstrap starting...');

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element #root not found in DOM');
  }

  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  console.log('Neon Arcade: Render call completed');
} catch (error) {
  console.error('Neon Arcade: Critical boot error:', error);
  document.body.innerHTML = `
    <div style="background: #000; color: #f00; padding: 20px; font-family: monospace;">
      <h1>CRITICAL BOOT ERROR</h1>
      <pre>${error.stack || error.message}</pre>
    </div>
  `;
}
