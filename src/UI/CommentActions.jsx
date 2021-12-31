import React from 'react';
import { CurrentUserContext } from './CurrentUserContext';
import iconDelete from './icon-delete.svg';
import iconEdit from './icon-edit.svg';
import iconReply from './icon-reply.svg';

const Action = ({text, icon, action}) => (
  <div onClick={action}>
    <img src={icon} alt={`Icon ${text}`} /> {text}
  </div>
)

export default function CommentActions({userName, handleClick}) {
  const isCurrentUSer = (React.useContext(CurrentUserContext).userName === userName);  
  if (isCurrentUSer) {
    return (
      <div>
        <Action text='Delete' icon={iconDelete} action={() => handleClick({isDelete: true})} />
        <Action text='Edit' icon={iconEdit} action={() => handleClick({isEdit: true})} />
      </div>
    )
  } else {
    return (
      <div>
        <Action text='Reply' icon={iconReply} action={() => handleClick({isReply: true})} />
      </div>
    )
  }
}