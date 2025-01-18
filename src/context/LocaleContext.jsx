import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const LocaleContext = createContext({
  locale: 'en',
  toggleLocale: () => {},
});

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState('en');

  const toggleLocale = () => {
    setLocale((prevLocale) => (prevLocale === 'en' ? 'id' : 'en'));
  };

  const value = {
    locale,
    toggleLocale,
  };

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

LocaleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useLocale() {
  const context = useContext(LocaleContext);

  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }

  return context;
}
