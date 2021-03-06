import React from 'react';
import Comment from './Comment';
import ModalDeleteComment from './ModalDeleteComment';
import { CurrentUserContext } from './CurrentUserContext';
import * as Data from '../data/data';

const commentListReducer = (list, action) => {
  let newList = [...list];
  const idList = newList.reduce((result, comment) => [...result, comment.id, ...comment.replies.map(item => item.id)], []);
  const existingComment = newList.find( item => item.id === action.commentId );
  const existingReply = existingComment?.replies.find( item => item.id === action.replyId );
  const existingItem = existingReply ?? existingComment;
  const addEmptyItem = (user, commentId) => {   
    const newItem = {
      id: Data.getNewId(),
      userName: user.userName,
      userImage: user.userImage,
      createdAt: null,
      content: '',
      score: 0,
      votes: [],
      status: 'new'
    };
    if (idList.includes(newItem.id)) { // prevent duplicates
      return;
    }
    if (commentId) { // it's an empty reply
      newItem.commentId = commentId;
      newItem.replyId = newItem.id;
      newItem.replyingTo = existingComment.userName;
      existingComment.replies.push(newItem);
    } else { // it's an empty comment
      newItem.commentId = newItem.id;
      newItem.replyId = null;
      newItem.replyingTo = null;
      newItem.replies = [];
      newList.push(newItem);
    }
  }
  switch(action.type) {
    case 'empty':
      addEmptyItem(action.user, action.commentId);
      break;
    case 'edit':
      if (existingItem) {
        existingItem.status = 'editing';
      }
      break;
    case 'save':
      if (existingItem) {
        if (action.content) {
          Data.updateCommentContent(
            existingItem.commentId,
            existingItem.replyId,
            action.content
          );
          existingItem.content = action.content;
        }
        existingItem.status = 'saved';
      }
      break;
    case 'create':
      if (existingItem) {
        if (action.content) {
          existingItem.content = action.content;
        }
        existingItem.createdAt = Date.now();
        Data.createComment(
          existingItem.commentId,
          existingItem.replyId,
          existingItem.replyingTo,
          existingItem.userName,
          existingItem.createdAt,
          existingItem.content);
        existingItem.status = 'saved';
        if (!existingReply) {
          addEmptyItem({userName: existingItem.userName, userImage: existingItem.userImage}, null);
        }
      }
      break;
    case 'delete':
      const itemExists = existingItem ? true : false ;
      if (itemExists) {
        Data.deleteComment(existingItem.commentId, existingItem.replyId);
        const deleteFilter = item => item !== existingItem;
        if (action.replyId) {
          existingComment.replies = existingComment.replies.filter(deleteFilter);
        } else {
          newList = newList.filter(deleteFilter);
        }
      }
      break;
    case 'vote':
      if (existingItem) {
        const userVote = {userName: action.user.userName, vote: action.vote};
        const existingVote = existingItem.votes.find(item => item.userName === action.user.userName);
        const voteValue = symbol => symbol === '+' ? 1 : symbol === '-' ? -1 : 0;
        const newScore = existingItem.score + voteValue(action.vote) - voteValue(existingVote?.vote);
        Data.updateCommentVotes(
          existingItem.commentId,
          existingItem.replyId,
          userVote,
          newScore);
        existingItem.score = newScore;
        if (existingVote) {
          existingVote.vote = userVote.vote;
        } else {
          existingItem.votes.push(userVote);
        }
      }
      break;
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
  return newList;
}

export function initCommentList() {
  return commentListReducer(
    Data.getCommentList(),
    {
      type: 'empty',
      user: Data.getCurrentUser()
    }
  );
}

export default function CommentList({initialList}) {
  const {current: currentUser} = React.useRef(Data.getCurrentUser());
  // useRef isn't really needed but it would be if we had a remote backend with an expensive computation cost.
  // Picked useRef and not useMemo because there are no dependencies, cf. https://blog.logrocket.com/rethinking-hooks-memoization/

  const [commentList, dispatchCommentList] = React.useReducer(commentListReducer, initialList);

  const [modalDeleteProps, setModalDeleteProps] = React.useState({show: false});

  const handleUserAction = (action) => {
    switch(action.type) {
      case 'empty':
      case 'edit':
      case 'save':
      case 'create':
      case 'vote':
        dispatchCommentList(action);
        break;
      case 'delete':
        setModalDeleteProps({show: false});
        dispatchCommentList(action);
        break;
      case 'togglemodaldelete':
        setModalDeleteProps({
          show: action.showModalDelete,
          commentId: action.commentId,
          replyId: action.replyId
        });
        break;
      default: break;
    }
  };

  const mapComment = comment => (
    <Comment key={comment.id}
            status={comment.status}
            userName={comment.userName}
            userImage={comment.userImage}
            createdAt={comment.createdAt}
            initialContent={comment.content}
            initialScore={comment.score}
            initialVote={comment.votes.find(item => item.userName === currentUser.userName)?.vote}
            replyingTo={comment.replyingTo}
            handle={handleUserAction}
            commentId={comment.commentId}
            replyId={comment.replyId}
    />
  );
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='commentlist'>
        {commentList.map( comment => (
          <React.Fragment key={comment.id}>
            {mapComment(comment)}
            <div className='commentreplies'>
              {comment.replies.map( reply => mapComment(reply) )}
            </div>
          </React.Fragment>
          )
        )}
        <ModalDeleteComment handle={handleUserAction} {...modalDeleteProps} />
      </div>
    </CurrentUserContext.Provider>
  );
}