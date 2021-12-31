import React from 'react';

export default function ModalDeleteComment({show, handle, commentId, replyId}) {
  if (show) {
    return (
      <div>
        <h1>Delete comment</h1>
        <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
        <button onClick={() => handle({type: 'togglemodaldelete', showModalDelete: false})} >No, cancel</button>
        <button onClick={() => handle({type: 'delete', commentId, replyId})} >Yes, delete</button>
      </div>
    );
  } else {
    return null;
  }
}