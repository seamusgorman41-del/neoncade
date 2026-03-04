import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.jsx';
import './index.css';

console.log('Neon Arcade: Initializing...');

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Neon Arcade: Root element not found!');
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
  console.log('Neon Arcade: Rendered successfully.');
}
