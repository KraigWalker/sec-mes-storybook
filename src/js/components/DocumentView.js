import { DocumentView as DocumentViewContainer } from 'document-management-lib';
import '../../css/DocumentView.css';

function DocumentView(props) {
  /** @todo get more specific props for DocumentViewContainer */
  console.dir(props);
  return <DocumentViewContainer {...props} />;
}

export { DocumentView };
