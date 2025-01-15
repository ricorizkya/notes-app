import React from 'react';
import NoteItemTitle from './NoteItemTitle';
import NoteItemCreated from './NoteItemCreated';
import NoteItemContent from './NoteItemContent';

function NoteItem({ id, title, createdAt, body }) {
  return (
    <div className='note-item'>
      <NoteItemTitle title={title} id={id} />
      <NoteItemCreated createdAt={createdAt} />
      <NoteItemContent body={body} />
    </div>
  );
}

export default NoteItem;
