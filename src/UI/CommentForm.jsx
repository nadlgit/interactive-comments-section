import React from 'react';
import CommentUserAvatar from './CommentUserAvatar';

export default function CommentForm({
  isUpdate,
  userImage,
  initialContent,
  replyingTo,
  buttonText,
  handleSubmit
}) {
  const formattedReplyingTo = replyingTo ? '@' + replyingTo + ' ' : '';
  
  const [content, setContent] = React.useState(initialContent ? initialContent : '');

  const handleInput = (e) => {
    const regex = new RegExp('^ *' + formattedReplyingTo.trim() + ' *')
    setContent(e.target.value.replace(regex,''));
  }

  const handleClick = (e) => {
    e.preventDefault();
    handleSubmit(content.trim());
  }

  return (
    <form className={isUpdate ? 'comment__form comment__form--update' : 'comment__form'}>
      {isUpdate ? null : <CommentUserAvatar userImage={userImage} />}
      <textarea onInput={handleInput} value={formattedReplyingTo + content} placeholder='Add a comment...' />
      <button onClick={handleClick}>{buttonText}</button>
    </form>
  );
}