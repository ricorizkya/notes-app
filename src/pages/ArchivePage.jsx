import React from 'react';
import { getArchivedNotes } from '../utils/local-data';
import SearchBox from '../components/SearchBox';
import NoteLists from '../components/NoteList';
import PropTypes from 'prop-types';

function ArchivePageWrapper() {
  const [searchParams, setSearchParams] = useParams();
  const keyword = searchParams.get('keyword');

  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return (
    <ArchivePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
  );
}

class ArchivePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getArchivedNotes(),
      keyword: props.defaultKeyword || '',
    };

    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
  }

  onKeywordChangeHandler(keyword) {
    this.setState(() => {
      return {
        keyword,
      };
    });
    this.props.keywordChange(keyword);
  }

  render() {
    const notes = this.state.notes.filter((note) => {
      return note.title
        .toLowerCase()
        .includes(this.state.keyword.toLowerCase());
    });

    return (
      <main>
        <h2>Catatan Arsip</h2>
        <SearchBox
          keyword={this.state.keyword}
          keywordChange={this.onKeywordChangeHandler}
        />

        {notes.length === 0 ? (
          <div className='notes-list-empty'>
            <p>Tidak ada catatan</p>
          </div>
        ) : (
          <NoteLists notes={notes} />
        )}
      </main>
    );
  }
}

ArchivePage.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
};

export default ArchivePage;
