import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import AddPage from '../pages/AddPage';
import App from '../App';
import DetailPage from '../pages/DetailPage';
import ArchivePage from '../pages/ArchivePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import { PrivateRoute } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import NotFoundPage from '../pages/NotFound';

function NoteApp() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className='app-container' data-theme={theme}>
      <main>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route
            path='/'
            element={
              <PrivateRoute>
                <App />
              </PrivateRoute>
            }
          />
          <Route
            path='/notes/new'
            element={
              <PrivateRoute>
                <AddPage />
              </PrivateRoute>
            }
          />
          <Route
            path='/notes/:id'
            element={
              <PrivateRoute>
                <DetailPage />
              </PrivateRoute>
            }
          />
          <Route
            path='/archives'
            element={
              <PrivateRoute>
                <ArchivePage />
              </PrivateRoute>
            }
          />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default NoteApp;
