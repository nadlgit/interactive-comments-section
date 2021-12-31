import React from 'react';

export default function ModalDeleteComment({show, handle, commentId, replyId}) {
  if (show) {
    return (
      <div>
        <h1>Delete comment</h1>
        <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
        <div onClick={() => handle({type: 'togglemodaldelete', showModalDelete: false})} >No, cancel</div>
        <div onClick={() => handle({type: 'delete', commentId, replyId})} >Yes, delete</div>
      </div>
    );
  } else {
    return null;
  }
}