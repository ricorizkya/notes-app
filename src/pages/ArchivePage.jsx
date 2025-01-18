import React, { useContext, useEffect, useState } from 'react';
import SearchBox from '../components/SearchBox';
import NoteLists from '../components/NoteList';
import Header from '../components/Header';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { getArchivedNotes } from '../utils/network-data';

function ArchivePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    async function fetchArchivedNotes() {
      try {
        setLoading(true);
        const { error, data } = await getArchivedNotes();

        if (!error) {
          setNotes(data);
        } else {
          alert('Gagal mendapatkan catatan arsip');
        }
      } catch (error) {
        console.error('Error fetching archived notes:', error);
        alert('Gagal menghubungkan ke server');
      } finally {
        setLoading(false);
      }
    }

    fetchArchivedNotes();
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm('Apakah anda yakin ingin logout?');
    if (confirmLogout) {
      logout();
      navigate('/login');
    }
  };

  const onKeywordChangeHandler = (newKeyword) => {
    setKeyword(newKeyword);
    setSearchParams({ keyword: newKeyword });
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  if (loading) {
    return (
      <div className='app-container' data-theme={theme}>
        <Header onLogout={handleLogout} />
        <main>
          <h2>Catatan Arsip</h2>
          <p>Memuat catatan...</p>
        </main>
      </div>
    );
  }

  return (
    <div className='app-container' data-theme={theme}>
      <Header onLogout={handleLogout} />
      <main>
        <h2>Catatan Arsip</h2>
        <SearchBox keyword={keyword} keywordChange={onKeywordChangeHandler} />

        {filteredNotes.length === 0 ? (
          <div className='notes-list-empty'>
            <p>Tidak ada catatan</p>
          </div>
        ) : (
          <NoteLists notes={filteredNotes} />
        )}
      </main>
    </div>
  );
}

export default ArchivePage;
