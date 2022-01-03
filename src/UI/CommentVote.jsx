import React from 'react';
import iconPlus from './icon-plus.svg';
import iconMinus from './icon-minus.svg';

const Vote = ({vote, handleClick, initialVote}) => {
  const upImg = <img src={iconPlus} alt='Icon Upvote' />;
  const downImg = <img src={iconMinus} alt='Icon Downvote' />;
  return (
    <button onClick={() => handleClick(vote)} className={initialVote === vote ? 'comment__voteitem comment__voteitem--voted' : 'comment__voteitem'}>
      {vote === '+' ? upImg : null}
      {vote === '-' ? downImg : null}
    </button>
  )
}

export default function CommentVote({initialScore, initialVote, handleClick}) {
  return (
    <div className='comment__vote'>
      <Vote vote='+' handleClick={handleClick} initialVote={initialVote} />
      {initialScore}
      <Vote vote='-' handleClick={handleClick} initialVote={initialVote} />
    </div>
  );
}