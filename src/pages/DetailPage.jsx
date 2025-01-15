import React, { useState, useEffect } from 'react';
import { showFormattedDate } from '../utils';
import {
  IoArchiveOutline,
  IoTrashBinOutline,
  IoTrashOutline,
} from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import {
  archiveNote,
  deleteNote,
  getNote,
  unarchiveNote,
} from '../utils/local-data';
import PropTypes from 'prop-types';

function DetailPage() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = getNote(id);
    setNote(fetchNote);
  }, [id]);

  if (!note) {
    return <p>Catatan tidak ditemukan</p>;
  }

  const handleDelete = () => {
    deleteNote(id);
    navigate('/');
  };

  const handleArchive = () => {
    archiveNote(id);
    navigate('/');
  };

  const handleUnarchive = () => {
    unarchiveNote(id);
    navigate('/');
  };

  const isArchived = note.archived;

  return (
    <div className='app-container'>
      <div className='detail-page'>
        <h1 className='detail-page__title'>{note.title}</h1>
        <span className='detail-page__createdAt'>
          {showFormattedDate(note.createdAt)}
        </span>
        <p className='detail-page__body'>{note.body}</p>
      </div>
      <div className='action' onClick={handleDelete}>
        <IoTrashOutline />
      </div>
      <div
        className='action2'
        onClick={isArchived ? handleUnarchive : handleArchive}
      >
        {isArchived ? <IoTrashBinOutline /> : <IoArchiveOutline />}
      </div>
    </div>
  );
}

DetailPage.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
  }),
  navigate: PropTypes.func,
};

export default DetailPage;
