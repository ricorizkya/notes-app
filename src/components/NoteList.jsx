import React from 'react';
import NoteItem from './NoteItem';
import PropTypes from 'prop-types';

function NoteLists({ notes }) {
  return (
    <div className='notes-list'>
      {notes.map((note) => {
        return <NoteItem key={note.id} id={note.id} {...note} />;
      })}
    </div>
  );
}

NoteLists.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default NoteLists;
