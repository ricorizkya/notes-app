import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <Link to='/'>
        <h1>Aplikasi Catatan</h1>
      </Link>
      <Link to='/archives'>
        <span className='archive-title'>Arsip</span>
      </Link>
    </header>
  );
}

export default Header;
