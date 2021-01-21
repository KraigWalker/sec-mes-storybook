import { DocumentLink } from 'web-ui-components/lib/documents/navigation';

function handleAttachmentClick({
  basePath,
  isWebView,
  session,
  message,
  client,
  getDocumentByIdNative,
  enableCategoryAttachmentParam,
}) {
  const { bank_id, access_token, brand, state } = session;
  const {
    client: { app_title, user_tracking_id },
  } = client;
  const {
    category,
    document: { id, fileSize },
  } = message;

  if (isWebView) {
    /**
     * If downloading a Statement, we add a query string to the end of the documentId
     * so that, when the native mobile builds the URL on it's end, it ends up adding
     * the `?category=Statements` query that routes the user to the correct document
     * store. It's a bit unorthodox, but avoids shipping a non-backawards compatible
     * change in the native mobile apps.
     */
    getDocumentByIdNative(
      category && category === 'Statements' ? `${id}?category=Statements` : id,
      fileSize
    );
  } else {
    window.open(
      `${basePath}/my-documents/${bank_id}/${id}?bank_id=${bank_id}&client_context=${app_title}&user_tracking_id=${user_tracking_id}&brandId=${brand}&state=${state}${
        category && category === 'Statements' && enableCategoryAttachmentParam
          ? '&category=Statements' // Because adding the category param can throw off other types of attachments, we hardcode Statements
          : ''
      }#access_token=${access_token}`
    );
  }
}

function Attachment({
  document,
  basePath,
  isWebView,
  session,
  message,
  client,
  getDocumentByIdNative,
}) {
  return (
    <div className="c-message--attachments">
      <h4>Attachments</h4>
      <DocumentLink
        linkText={document.label}
        onClick={() => {
          handleAttachmentClick({
            basePath,
            isWebView,
            session,
            message,
            client,
            getDocumentByIdNative,
            enableCategoryAttachmentParam:
              window.flagContext.enableCategoryAttachmentParam || false,
          });
        }}
        hasIcon
      />
    </div>
  );
}

export { Attachment };
