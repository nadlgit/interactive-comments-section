import React from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import FallbackUI from './FallbackUI';
import LoadingUI from './LoadingUI';
import CommentList, {initCommentList} from './CommentList';

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [initialList, setInitialList] = React.useState();
  React.useEffect(() => {
    setInitialList(initCommentList());
    setIsLoading(false);
  }, []);
  return (
    <ErrorBoundary FallbackComponent={FallbackUI}>
      {isLoading ? <LoadingUI /> : <CommentList initialList={initialList} />}
    </ErrorBoundary>
  );
}