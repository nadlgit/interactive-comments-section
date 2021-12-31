import React from 'react';

export default function CommentForm({
  initialContent,
  replyingTo,
  buttonText,
  handleSubmit
}) {
  const formattedReplyingTo = replyingTo ? '@' + replyingTo + ' ' : '';
  const [content, setContent] = React.useState(initialContent ? initialContent : '');
  const handleInput = (e) => {
    const regex = new RegExp('^ *' + formattedReplyingTo.trim() + ' *')
    setContent(e.target.value.replace(regex,''));
  }
  const handleClick = (e) => {
    e.preventDefault();
    handleSubmit(content.trim());
  }
  return (
    <form>
      <textarea onInput={handleInput} value={formattedReplyingTo + content} />
      <button onClick={handleClick}>{buttonText}</button>
    </form>
  );
}