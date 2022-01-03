import React from 'react';
import CommentInfo from './CommentInfo';
import CommentActions from './CommentActions';
import CommentVote from './CommentVote';
import CommentContent from './CommentContent';
import CommentForm from './CommentForm';
import { CurrentUserContext } from './CurrentUserContext';

export default function Comment({
  status,
  userName,
  userImage,
  createdAt,
  initialContent,
  initialScore,
  initialVote,
  replyingTo,
  handle,
  commentId,
  replyId
}) {
  const currentUSer = React.useContext(CurrentUserContext);

  const handleFormSubmit = (content) => {
    if (status === 'editing') {
      handle({
        type: 'save',
        content: content ? content : initialContent,
        commentId,
        replyId
      })
    }
    if (status === 'new' && content) {
      handle({
        type: 'create',
        content,
        commentId,
        replyId
      })
    }
    if (status === 'new' && !content && replyId) {
      handle({
        type: 'delete',
        commentId,
        replyId
      })
    }
  };

  const handleActionClick = ({isEdit, isReply, isDelete}) => {
    if (isEdit) {
      handle({
        type: 'edit',
        commentId,
        replyId
      })
    }
    if (isReply) {
      handle({
        type: 'empty',
        user: currentUSer,
        commentId
      })
    }
    if (isDelete) {
      handle({
        type: 'togglemodaldelete',
        showModalDelete: true,
        commentId,
        replyId
      })
    }
  };

  const handleVoteClick = (vote) => {
    if (vote) {
      handle({
        type: 'vote',
        user: currentUSer,
        commentId,
        replyId,
        vote
      })
    }
  };

  const savedComment = (
    <>
      <CommentInfo userName={userName} userImage={userImage} createdAt={createdAt} />
      <CommentContent content={initialContent} replyingTo={replyingTo} />
      <CommentVote initialScore={initialScore} initialVote={initialVote} handleClick={handleVoteClick} />  
      <CommentActions userName={userName} handleClick={handleActionClick} />
    </>
  );
  const editingComment = (
    <>
      <CommentInfo userName={userName} userImage={userImage} createdAt={createdAt} />
      <CommentForm isUpdate={true} initialContent={initialContent} replyingTo={replyingTo} buttonText='Update' handleSubmit={handleFormSubmit} />
      <CommentVote initialScore={initialScore} initialVote={initialVote} handleClick={handleVoteClick} />
      <CommentActions userName={userName} handleClick={handleActionClick} />
    </>
  );
  const newComment = <CommentForm isUpdate={false} userImage={userImage} replyingTo={replyingTo} buttonText={replyingTo ? 'Reply' : 'Send'} handleSubmit={handleFormSubmit} />;
  return (
    <div className='comment'>
      {status === 'saved' ? savedComment : null}
      {status === 'editing' ? editingComment : null}
      {status === 'new' ? newComment : null}
    </div>
  );
}