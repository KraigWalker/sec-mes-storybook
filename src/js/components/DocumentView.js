import { DocumentView as DocumentViewContainer } from 'document-management-lib';
import '../../css/DocumentView.css';

export function DocumentView(props) {
  /** @todo get more specific props for DocumentViewContainer */
  console.log('DocumentView Props');
  console.dir(props);
  return <DocumentViewContainer {...props} />;
}
