import React from 'react';

export default function CommentContent({
  content,
  replyingTo
}) {
  return (
    <div className='comment__content'>
      <span>{replyingTo ? '@' + replyingTo + ' ' : ''}</span>
      {content ? content : ''}
    </div>
  );
}