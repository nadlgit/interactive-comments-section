import React from 'react';
import iconPlus from './icon-plus.svg';
import iconMinus from './icon-minus.svg';

export default function CommentVote({initialScore, initialVote, handleClick}) {
  return (
    <div>
      <img src={iconPlus} alt='Icon Upvote' onClick={() => handleClick('+')} style={{border: initialVote === '+' ? 'solid red' : null }} />
      {initialScore}
      <img src={iconMinus} alt='Icon Downvote' onClick={() => handleClick('-')} style={{border: initialVote === '-' ? 'solid red' : null }} />
    </div>
  );
}