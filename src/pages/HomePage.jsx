import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBox from '../components/SearchBox';
import { getActiveNotes } from '../utils/local-data';
import NoteLists from '../components/NoteList';

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keywordFromUrl = searchParams.get('keyword') || '';
  const [notes, setNotes] = useState(getActiveNotes());
  const [keyword, setKeyword] = useState(keywordFromUrl);

  useEffect(() => {
    setNotes(getActiveNotes());
  }, []);

  const onKeywordChangeHandler = (newKeyword) => {
    setKeyword(newKeyword);
    setSearchParams({ keyword: newKeyword });
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <main>
      <h2>Catatan Aktif</h2>
      <SearchBox keyword={keyword} keywordChange={onKeywordChangeHandler} />

      {filteredNotes.length === 0 ? (
        <div className='notes-list-empty'>
          <p>Tidak ada catatan</p>
        </div>
      ) : (
        <NoteLists notes={filteredNotes} />
      )}
    </main>
  );
}

export default HomePage;
