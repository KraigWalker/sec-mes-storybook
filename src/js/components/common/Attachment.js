import { DocumentLink } from 'web-ui-components/lib/documents/navigation';

function Attachment({
  document,
  basePath,
  isWebView,
  session,
  message,
  client,
  getDocumentByIdNative,
  history,
  readOnly,
}) {
  return (
    <div className="c-message--attachments">
      <h4>Attachments</h4>
      <DocumentLink
        linkText={document.label}
        onClick={() => {
          if (!isWebView) {
            handleAttachmentClick({
              basePath,
              isWebView,
              session,
              message,
              client,
              getDocumentByIdNative,
              history,
              readOnly,
              enableCategoryAttachmentParam:
                window.flagContext.enableCategoryAttachmentParam || false,
            });
          } else {
            getDocumentByIdNative(
              message.document.id,
              message.document.fileSize
            );
          }
        }}
        hasIcon
      />
    </div>
  );
}

const handleAttachmentClick = ({
  basePath,
  session,
  message,
  client,
  enableCategoryAttachmentParam,
  // history,
  // readOnly,
}) => {
  const { bank_id, access_token, brand, state } = session;
  const {
    client: { app_title, user_tracking_id },
  } = client;
  const {
    category,
    document: { id },
  } = message;

  // FIXME: Removed history.push in MEO as it wasn't working, need to revisit
  // if (readOnly) { //In MEO we need to open the document on the same page due to in memory routing
  //   history.push({
  //       pathname: url,
  //       backPath: '/securemessages/'
  //     });
  // }
  // else {
  window.open(
    `${basePath}/my-documents/${bank_id}/${id}?bank_id=${bank_id}&client_context=${app_title}&user_tracking_id=${user_tracking_id}&brandId=${brand}&state=${state}${
      category && enableCategoryAttachmentParam ? `&category=${category}` : ''
    }#access_token=${access_token}`
  );
  // }
};

export default Attachment;
