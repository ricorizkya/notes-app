import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import './styles/style.css';
import { BrowserRouter } from 'react-router-dom';
import NoteApp from './components/NoteApp';

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <NoteApp />,
  </BrowserRouter>
);
