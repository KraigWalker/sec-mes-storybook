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
  const { bank_id, access_token, brand, state = '' } = session;
  const {
    client: { app_title, user_tracking_id },
  } = client;
  const {
    category,
    document: { id, fileSize },
  } = message;

  const isStatementDownload =
    enableCategoryAttachmentParam && category && category === 'Statements';

  const stateQueryParam =
    state.length && state.length > 0 ? `&state=${state}` : '';
  const webDownloadUrl = `${basePath}/my-documents/${bank_id}/${id}?bank_id=${bank_id}&client_context=${app_title}&user_tracking_id=${user_tracking_id}&brandId=${brand}`;
  const categoryQueryParam = isStatementDownload ? '&category=Statements' : '';
  const accessTokenHash = `#access_token=${access_token}`;
  const completeDownloadURL =
    webDownloadUrl + stateQueryParam + categoryQueryParam + accessTokenHash;

  /**
   * Only trigger the native document download view if not a statement and in
   * a native mobile app WebView
   */
  if (isWebView) {
    if (isStatementDownload) {
      // triggers a new page load within the WebView.
      // perhaps we should use the router instead??
      window.location.href = completeDownloadURL;
    } else {
      getDocumentByIdNative(id, fileSize);
    }
  } else {
    window.open(completeDownloadURL);
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
