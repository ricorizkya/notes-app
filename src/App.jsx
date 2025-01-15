import React from 'react';
import HomePage from './pages/HomePage';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className='app-container'>
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
