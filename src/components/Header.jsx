import React, { useContext } from 'react';
import { FiPower, FiSun } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { FaMoon } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';
import { useLocale } from '../context/LocaleContext';
import { useTranslation } from '../hooks/useTranslation';
import PropTypes from 'prop-types';

function Header({ onLogout }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { locale, toggleLocale } = useLocale();
  const { t } = useTranslation();

  return (
    <header>
      <Link to='/'>
        <h1>{t('notesApp')}</h1>
      </Link>
      <div className='settings'>
        <span className='locale-set' onClick={toggleLocale}>
          {locale}
        </span>
        <span className='theme-logo' onClick={toggleTheme}>
          {theme === 'dark' ? <FiSun /> : <FaMoon />}
        </span>
        <Link to='/archives'>
          <span className='logout-logo' onClick={onLogout}>
            <FiPower />
          </span>
        </Link>
      </div>
    </header>
  );
}

Header.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default Header;
