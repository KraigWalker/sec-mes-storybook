import { useParams } from 'react-router-dom';

function SingleDocumentView() {
  const { documentId } = useParams();

  return (
    <div>
      <h1>SingleDocumentView</h1>
      <p>{`${documentId}`}</p>
    </div>
  );
}
export { SingleDocumentView };
