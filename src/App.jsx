import React, { useContext } from 'react';
import HomePage from './pages/HomePage';
import { FiPlus } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import { useAuth } from './context/AuthContext';
import { ThemeContext } from './context/ThemeContext';

function App() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { theme } = useContext(ThemeContext);

  const handleLogout = () => {
    const confirmLogout = 'Apakah anda yakin ingin logout?';
    if (confirmLogout) {
      logout();
      navigate('/login');
    }
  };

  return (
    <div className='app-container' data-theme={theme}>
      <Header onLogout={handleLogout} />
      <HomePage />
      <Link to='/notes/new'>
        <div className='action'>
          <FiPlus />
        </div>
      </Link>
    </div>
  );
}

export default App;
