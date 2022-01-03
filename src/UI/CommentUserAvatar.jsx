import React from 'react';

export default function CommentUserAvatar({userImage}) {
  return (
    <picture className='comment__useravatar'>
      <source srcSet={userImage?.webp} type='image/webp' />
      <source srcSet={userImage?.png} type='image/png' />
      <img src={userImage?.png} alt='User avatar' />
    </picture>
  );
}