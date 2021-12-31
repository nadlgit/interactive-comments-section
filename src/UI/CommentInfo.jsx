import React from 'react';
import { CurrentUserContext } from './CurrentUserContext';
import { differenceInMinutes, differenceInHours, differenceInCalendarDays, differenceInWeeks, differenceInMonths, format } from 'date-fns'

export default function CommentInfo({
  userName,
  userImage,
  createdAt,
  imageOnly
}) {
  const formatDate = (timestamp) => {
    if (!Number.isInteger(timestamp) || (Math.abs(timestamp) > 8640000000000000)) {
      return '';
    }
    const inputDate = new Date(timestamp);
    const nowDate = Date.now();
    const diffMinutes = differenceInMinutes(nowDate,inputDate);
    const diffHours = differenceInHours(nowDate,inputDate);
    const diffDays = differenceInCalendarDays(nowDate,inputDate);
    const diffWeeks = differenceInWeeks(nowDate,inputDate);
    const diffMonths = differenceInMonths(nowDate,inputDate);
    if ( diffMinutes >= 0 && diffMinutes < 1 ) {
      return 'a few seconds ago'
    } else if ( diffMinutes === 1 ) {
      return '1 minute ago'
    } else if ( diffMinutes >= 2 && diffMinutes <= 59 ) {
      return `${diffMinutes} minutes ago`
    } else if ( diffHours === 1 ) {
      return '1 hour ago'
    } else if ( diffHours >= 2 && diffHours <= 12 && diffDays === 0 ) {
      return `${diffHours} hours ago`
    } else if ( diffHours > 12 && diffDays === 0 ) {
      return 'today'
    } else if ( diffDays === 1 ) {
      return 'yesterday'
    } else if ( diffDays >= 2 && diffWeeks === 0 ) {
      return `${diffDays} days ago`
    } else if ( diffWeeks === 1 ) {
      return '1 week ago'
    } else if ( diffWeeks >= 2 && diffWeeks <= 3 ) {
      return `${diffWeeks} weeks ago`
    } else if ( diffWeeks >=4 && diffMonths <= 1 ) {
      return '1 month ago'
    } else if ( diffMonths >= 2 && diffMonths <= 11 ) {
      return `${diffMonths} months ago`
    } else {
      return format(inputDate, 'dd MMM yyyy');
    }
  }

  const isCurrentUSer = (React.useContext(CurrentUserContext).userName === userName);
  
  const avatar = (
    <picture>
      <source srcSet={userImage?.webp} type='image/webp' />
      <source srcSet={userImage?.png} type='image/png' />
      <img src={userImage?.png} alt='User avatar' />
    </picture>
  );

  if (imageOnly) {
    return (
      <div>
        {avatar}
      </div>
    )
  } else {
    return (
      <div>
        {avatar}
        <div>{userName} {isCurrentUSer ? <span>you</span> : ''} </div>
        <div>{formatDate(createdAt)}</div>
      </div>
    )
  }
}