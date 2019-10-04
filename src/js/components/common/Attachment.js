import React from "react";
import { DocumentLink } from 'web-ui-components/lib/documents/navigation';

const Attachment = (props) => (
	<div className="c-message--attachments">
		<h4>Attachments</h4>
        <DocumentLink 
            linkText={props.document.label}
            onClick={() => handleAttachmentClick(props)}
            hasIcon
        />
	</div>
);

const handleAttachmentClick = ({basePath, isWebView, session, message, client, getDocumentByIdNative, history, readOnly}) => {
    if (!isWebView) {

      let url = `${basePath}/my-documents/${session.bank_id}/${message.document.id}#access_token=${session.access_token}&bank_id=${session.bank_id}&client_context=${
        client.client.app_title
        }&user_tracking_id=${client.client.user_tracking_id}&brandId=${session.brand}&state=${session.state}`;

      if (readOnly) { //In MEO we need to open the document on the same page due to in memory routing
        history.push({
            pathname: url,
            backPath: '/securemessages/'});
      }
      else {
        window.open(url);
      }
    }
    else {
      getDocumentByIdNative(message.document.id, message.document.fileSize);
    }
  }

  export default Attachment;
