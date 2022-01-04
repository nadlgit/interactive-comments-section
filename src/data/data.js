import jsonData from './data.json';
import { subMonths, subWeeks, subDays } from 'date-fns'

function processJsonImage(image) {
  return {
    png: image.png.replace('./images', process.env.PUBLIC_URL),
    webp: image.webp.replace('./images', process.env.PUBLIC_URL)
  };
}

const currentUser = {
  userName: jsonData.currentUser.username,
  userImage: processJsonImage(jsonData.currentUser.image)
};

function getJsonCommentList() {
  const processBaseAttr = (item) => {
    let id = item.id;
    let commentId = item.replyingTo ? null : item.id;
    let replyId = item.replyingTo ? item.id : null;
    let userName = item.user.username;
    let userImage = processJsonImage(item.user.image);
    let createdAt;
    switch(item.createdAt) {
      case '1 month ago':
        createdAt = subMonths(Date.now(), 1).getTime();
        break;
      case '2 weeks ago':
        createdAt = subWeeks(Date.now(), 2).getTime();
        break;
      case '1 week ago':
        createdAt = subWeeks(Date.now(), 1).getTime();
        break;
      case '2 days ago':
        createdAt = subDays(Date.now(), 2).getTime();
        break;
      default:
        createdAt = Date.now();
    }
    let content = item.content;
    let score = item.score;
    let replyingTo = item.replyingTo ?? null;
    let votes = [];
    let status = 'saved';
    return {id, commentId, replyId, userName, userImage, createdAt, content, score, replyingTo, votes, status};
  }
  return jsonData.comments.map( (comment) => {
    return {
      ...processBaseAttr(comment),
      replies: comment.replies.map( (reply) => {
        return {...processBaseAttr(reply), commentId: comment.id}
      } )
    };
  });
}

////////////
// EXPORT //
////////////
export function getCurrentUser() {
  return currentUser;
}
export function getCommentList() {
  return getJsonCommentList();
}
export function getNewId() {
  return Date.now();
}
export function createComment(commentId, replyId, replyingTo, userName, createdAt, content) {
}
export function updateCommentContent(commentId, replyId, content) {
}
export function updateCommentVotes(commentId, replyId, userVote, score) {
}
export function deleteComment(commentId, replyId) {
}