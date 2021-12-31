import React from 'react';

export default function CommentContent({
  content,
  replyingTo
}) {
  return (
    <div>
      <span>{replyingTo ? '@' + replyingTo + ' ' : ''}</span>
      {content ? content : ''}
    </div>
  );
}