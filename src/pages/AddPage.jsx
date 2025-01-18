import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import NoteInput from '../components/NoteInput';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { addNote } from '../utils/network-data';

function AddPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { theme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    const confirmLogout = 'Apakah anda yakin ingin logout?';
    if (confirmLogout) {
      logout();
      navigate('/login');
    }
  };

  async function onAddNoteHandler(note) {
    setLoading(true);
    try {
      const { error, data } = await addNote(note);

      if (!error) {
        setLoading(false);
        navigate('/');
      } else {
        console.error('Gagal menambahkan catatan');
        alert('Gagal menambahkan catatan. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Error saat menambahkan catatan:', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
    }
  }

  return (
    <div className='app-container' data-theme={theme}>
      <Header onLogout={handleLogout} />
      {loading ?? <p>Tunggu sebentar...</p>}
      <NoteInput addNote={onAddNoteHandler} />
    </div>
  );
}

export default AddPage;
