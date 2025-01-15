import React from 'react';
import { Link } from 'react-router-dom';

function NoteItemTitle({ id, title }) {
  return (
    <Link to={`/notes/${id}`}>
      <h3 className='note-item__title'>{title}</h3>
    </Link>
  );
}

export default NoteItemTitle;
