import React from 'react';
import NoteItem from './NoteItem';

function NoteLists({ notes }) {
  return (
    <div className='notes-list'>
      {notes.map((note) => {
        return <NoteItem key={note.id} id={note.id} {...note} />;
      })}
    </div>
  );
}

export default NoteLists;
