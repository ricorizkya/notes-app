import React from 'react';
import Header from './Header';
import { Route, Routes } from 'react-router-dom';
import AddPage from '../pages/AddPage';
import App from '../App';
import DetailPage from '../pages/DetailPage';

function NoteApp() {
  return (
    <div className='app-container'>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/notes/new' element={<AddPage />} />
          <Route path='/notes/:id' element={<DetailPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default NoteApp;
