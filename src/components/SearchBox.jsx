import React from 'react';
import PropTypes from 'prop-types';

function SearchBox({ keyword, keywordChange }) {
  return (
    <div className='search-bar'>
      <input
        type='text'
        placeholder='Cari berdasarkan judul...'
        value={keyword}
        onChange={(event) => keywordChange(event.target.value)}
      />
    </div>
  );
}

SearchBox.propTypes = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
};

export default SearchBox;
