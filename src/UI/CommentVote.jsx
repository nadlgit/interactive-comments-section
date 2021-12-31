import React from 'react';
import iconPlus from './icon-plus.svg';
import iconMinus from './icon-minus.svg';

export default function CommentVote({initialScore, initialVote, handleClick}) {
  return (
    <div>
      <button onClick={() => handleClick('+')} style={{border: initialVote === '+' ? 'solid red' : null }}><img src={iconPlus} alt='Icon Upvote' /></button>
      {initialScore}
      <button onClick={() => handleClick('-')} style={{border: initialVote === '-' ? 'solid red' : null }}><img src={iconMinus} alt='Icon Downvote' /></button>
    </div>
  );
}