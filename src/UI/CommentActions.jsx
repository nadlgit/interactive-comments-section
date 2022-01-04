import React from 'react';
import { CurrentUserContext } from './CurrentUserContext';
import iconDelete from './icon-delete.svg';
import iconEdit from './icon-edit.svg';
import iconReply from './icon-reply.svg';

const Action = ({text, icon, action, color}) => (
  <button onClick={action} className={color ? `comment__actionitem comment__actionitem--${color}` : 'comment__actionitem'}>
    <img src={icon} alt={`Icon ${text}`} /> {text}
  </button>
);

export default function CommentActions({userName, handleClick}) {
  const isCurrentUSer = (React.useContext(CurrentUserContext).userName === userName);
  
  const currentUSerActions = (
    <>
      <Action color='red' text='Delete' icon={iconDelete} action={() => handleClick({isDelete: true})} />
      <Action text='Edit' icon={iconEdit} action={() => handleClick({isEdit: true})} />
    </>
  );
  const otherUserActions = <Action text='Reply' icon={iconReply} action={() => handleClick({isReply: true})} />;
  return (
    <div className='comment__action'>
      {isCurrentUSer ? currentUSerActions : otherUserActions}
    </div>
  );
}