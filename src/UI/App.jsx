import React from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import FallbackUI from './FallbackUI';
import LoadingUI from './LoadingUI';
import CommentList, {initCommentList} from './CommentList';

//TODO: tout le CSS (peut-etre du HTML à modifier du coup)
//TODO: empechement du double clic sur les actions => remplacer les div par des button => pas suffisant
//TODO: stockage dans Window.sessionStorage, en simulant comme si c'était un backend
//Il aurait fallu faire une meilleure gestion d'erreurs et utiliser useErrorHandler mais ça prendrait trop de temps

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