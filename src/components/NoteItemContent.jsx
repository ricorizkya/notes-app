import React from 'react';
import PropTypes from 'prop-types';

function NoteItemContent({ body }) {
  return <p className='note-item__body'>{body}</p>;
}

NoteItemContent.propTypes = {
  body: PropTypes.string.isRequired,
};

export default NoteItemContent;
