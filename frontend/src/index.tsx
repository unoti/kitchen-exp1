import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx'; // Why in the name of all that is holy does this not work without the .tsx extension?

const container = document.getElementById('root');
if (!container) throw new Error("Could not find root element");

const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
