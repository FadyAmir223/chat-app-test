import { createRoot } from 'react-dom/client';
import '../i18n.js';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root') as HTMLElement).render(<App />);
