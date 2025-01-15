import React from 'react';
import NoteItemTitle from './NoteItemTitle';
import NoteItemCreated from './NoteItemCreated';
import NoteItemContent from './NoteItemContent';
import PropTypes from 'prop-types';

function NoteItem({ id, title, createdAt, body }) {
  return (
    <div className='note-item'>
      <NoteItemTitle title={title} id={id} />
      <NoteItemCreated createdAt={createdAt} />
      <NoteItemContent body={body} />
    </div>
  );
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default NoteItem;
