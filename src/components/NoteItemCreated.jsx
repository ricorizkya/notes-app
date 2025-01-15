import React from 'react';
import { showFormattedDate } from '../utils';

function NoteItemCreated({ createdAt }) {
  return <p className='note-item__createdAt'>{showFormattedDate(createdAt)}</p>;
}

export default NoteItemCreated;
