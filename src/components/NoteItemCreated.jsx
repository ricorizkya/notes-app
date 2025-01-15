import React from 'react';
import { showFormattedDate } from '../utils';
import PropTypes from 'prop-types';

function NoteItemCreated({ createdAt }) {
  return <p className='note-item__createdAt'>{showFormattedDate(createdAt)}</p>;
}

NoteItemCreated.propTypes = {
  createdAt: PropTypes.string.isRequired,
};

export default NoteItemCreated;
