import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './AuthContext.tsx';
import AppCheckInitializer from './AppCheckInitializer.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Fatal Error: The root element with ID 'root' was not found in the DOM.");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <AppCheckInitializer />
      <App />
    </AuthProvider>
  </React.StrictMode>
);
