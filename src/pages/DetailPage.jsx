import React, { useState, useEffect, useContext } from 'react';
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
} from '../utils/network-data';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

function DetailPage() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    async function fetchNoteDetail() {
      try {
        setLoading(true);
        const { error, data } = await getNote(id);

        if (!error && data) {
          setNote(data);
        } else {
          setError('Gagal mengambil detail catatan');
          navigate('/');
        }
      } catch (err) {
        setError('Terjadi kesalahan saat mengambil catatan');
        console.error(err);
        navigate('/');
      } finally {
        setLoading(false);
      }
    }

    fetchNoteDetail();
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      const { error } = await deleteNote(id);
      if (!error) {
        navigate('/');
      } else {
        alert('Gagal menghapus catatan');
      }
    } catch (err) {
      console.error('Error menghapus catatan:', err);
      alert('Terjadi kesalahan saat menghapus catatan');
    }
  };

  const handleArchive = async () => {
    try {
      const { error } = await archiveNote(id);
      if (!error) {
        navigate('/');
      } else {
        alert('Gagal mengarsipkan catatan');
      }
    } catch (err) {
      console.error('Error mengarsipkan catatan:', err);
      alert('Terjadi kesalahan saat mengarsipkan catatan');
    }
  };

  const handleUnarchive = async () => {
    try {
      const { error } = await unarchiveNote(id);
      if (!error) {
        navigate('/');
      } else {
        alert('Gagal membatalkan arsip catatan');
      }
    } catch (err) {
      console.error('Error membatalkan arsip catatan:', err);
      alert('Terjadi kesalahan saat membatalkan arsip catatan');
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm('Apakah anda yakin ingin logout?');
    if (confirmLogout) {
      logout();
      navigate('/login');
    }
  };

  if (loading) {
    return <p>Memuat catatan...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!note) {
    return <p>Catatan tidak ditemukan</p>;
  }

  const isArchived = note?.archived ?? false;

  return (
    <div className='app-container' data-theme={theme}>
      <Header onLogout={handleLogout} />
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

export default DetailPage;
