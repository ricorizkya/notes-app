import React from 'react';
import { FiCheck } from 'react-icons/fi';

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 'notes-',
      title: '',
      body: '',
      createdAt: new Date().toISOString(),
      archived: false,
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    this.setState(() => {
      return {
        title: event.target.value,
      };
    });
  }

  onBodyChangeEventHandler(event) {
    this.setState(() => {
      return {
        body: event.target.value,
      };
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();
    const updatedNote = {
      ...this.state,
      createdAt: new Date().toISOString(),
    };

    this.props.addNote(updatedNote);
  }

  render() {
    return (
      <form
        className='add-new-page__input'
        onSubmit={this.onSubmitEventHandler}
      >
        <input
          type='text'
          className='add-new-page__input__title'
          placeholder='Catatan rahasia'
          value={this.state.title}
          onChange={this.onTitleChangeEventHandler}
        />
        <textarea
          className='add-new-page__input__body'
          placeholder='Sebenarnya saya adalah...'
          value={this.state.body}
          onChange={this.onBodyChangeEventHandler}
        />
        <button type='submit' className='action'>
          <FiCheck />
        </button>
      </form>
    );
  }
}

export default NoteInput;
