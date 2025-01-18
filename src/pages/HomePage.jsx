import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBox from '../components/SearchBox';
import NoteLists from '../components/NoteList';
import { getActiveNotes } from '../utils/network-data';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keywordFromUrl = searchParams.get('keyword') || '';
  const [notes, setNotes] = useState([]);
  const [keyword, setKeyword] = useState(keywordFromUrl);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        const { error, data } = await getActiveNotes();

        if (!error) {
          setNotes(data);
        } else {
          alert('Gagal mendapatkan data, silahkan coba lagi');
        }
      } catch (error) {
        alert('Gagal menghubungkan ke server, ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, []);

  const onKeywordChangeHandler = (newKeyword) => {
    setKeyword(newKeyword);
    setSearchParams({ keyword: newKeyword });
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  if (loading) {
    return (
      <main>
        <h2>{t('archiveNotes')}</h2>
        <p>{t('loading')}</p>
      </main>
    );
  }

  return (
    <main>
      <div className='title-container'>
        <h1>
          {t('welcomeUser')}
          {user.name || 'Pengguna'}{' '}
        </h1>
        <Link to='/archives'>
          <span>{t('archiveNotes')}</span>
        </Link>
      </div>
      <h2>{t('activeNotes')}</h2>
      <SearchBox keyword={keyword} keywordChange={onKeywordChangeHandler} />

      {filteredNotes.length === 0 ? (
        <div className='notes-list-empty'>
          <p>{t('noNotes')}</p>
        </div>
      ) : (
        <NoteLists notes={filteredNotes} />
      )}
    </main>
  );
}

export default HomePage;
