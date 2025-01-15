import React from 'react';
import Header from '../components/Header';
import NoteInput from '../components/NoteInput';
import { useNavigate, useNavigation } from 'react-router-dom';
import { addNote } from '../utils/local-data';

function AddPage() {
  const navigate = useNavigate();

  function onAddNoteHandler(note) {
    addNote(note);
    navigate('/');
  }

  return (
    <div className='app-container'>
      <NoteInput addNote={onAddNoteHandler} />
    </div>
  );
}

export default AddPage;
