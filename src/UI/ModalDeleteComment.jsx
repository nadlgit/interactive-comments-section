import React from 'react';

export default function ModalDeleteComment({show, handle, commentId, replyId}) {
  if (show) {
    return (
      <div class="modaloverlay" id="modal">
        <div className='modal'>
          <h1>Delete comment</h1>
          <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
          <button className='modal__button' onClick={() => handle({type: 'togglemodaldelete', showModalDelete: false})} >No, cancel</button>
          <button className='modal__button modal__button--red' onClick={() => handle({type: 'delete', commentId, replyId})} >Yes, delete</button>
        </div>
      </div>
    );
  } else {
    return null;
  }
}