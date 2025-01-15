import React from 'react';
import SearchBox from '../components/SearchBox';
import NoteItem from '../components/NoteItem';
import { useParams } from 'react-router-dom';
import { getActiveNotes, getAllNotes } from '../utils/local-data';
import NoteLists from '../components/NoteList';

function HomePageWrapper() {
  const [searchParams, setSearchParams] = useParams();
  const keyword = searchParams.get('keyword');

  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return (
    <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
  );
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getActiveNotes(),
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
        <h2>Catatan Aktif</h2>
        <SearchBox
          keyword={this.state.keyword}
          keywordChange={this.onKeywordChangeHandler}
        />
        <NoteLists notes={notes} />
      </main>
    );
  }
}

export default HomePage;
