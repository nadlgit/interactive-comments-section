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

  switch (status) {
    case 'saved': return (
      <div>
        <CommentInfo userName={userName} userImage={userImage} createdAt={createdAt} imageOnly={false} />
        <CommentActions userName={userName} handleClick={handleActionClick} />
        <CommentVote initialScore={initialScore} initialVote={initialVote} handleClick={handleVoteClick} />  
        <CommentContent content={initialContent} replyingTo={replyingTo} />
      </div>
    )
    case 'editing': return (
      <div>
        <CommentInfo userName={userName} userImage={userImage} createdAt={createdAt} imageOnly={false} />
        <CommentActions userName={userName} handleClick={handleActionClick} />
        <CommentVote initialScore={initialScore} initialVote={initialVote} handleClick={handleVoteClick} />
        <CommentForm initialContent={initialContent} replyingTo={replyingTo} buttonText='Update' handleSubmit={handleFormSubmit} />
      </div>
    )
    case 'new': return (
      <div>
        <CommentInfo userImage={userImage} imageOnly={true} />
        <CommentForm replyingTo={replyingTo} buttonText={replyingTo ? 'Reply' : 'Send'} handleSubmit={handleFormSubmit} />
      </div>
    )
    default: throw new Error(`Unexpected status: ${status}`)
  }
}