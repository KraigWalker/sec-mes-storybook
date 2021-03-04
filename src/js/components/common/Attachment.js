import { DocumentLink } from 'web-ui-components/lib/documents/navigation';

function handleAttachmentClick({
  basePath,
  isWebView,
  session,
  message,
  client,
  onUpgradeRequiredToViewStatementError,
  getDocumentByIdNative,
}) {
  const { bank_id, access_token, brand, state = '' } = session;
  const {
    client: { app_title, user_tracking_id },
  } = client;
  const {
    category,
    document: { id, fileSize },
  } = message;

  const isStatementDownload = category && category === 'Statements';

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
      if (
        window.webkit &&
        window.webkit.messageHandlers &&
        window.webkit.messageHandlers.downloadStatement
      ) {
        window.webkit.messageHandlers.downloadStatement.postMessage(id);
      } else if (
        window.AndroidInterface &&
        window.AndroidInterface.downloadStatement
      ) {
        window.AndroidInterface.downloadStatement(id);
      } else {
        onUpgradeRequiredToViewStatementError();
      }
    } else {
      // normal document.
      getDocumentByIdNative(id, fileSize);
    }
  } else {
    // we're on a web browser. Open url in new window/tab
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
  onUpgradeRequiredToViewStatementError,
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
            onUpgradeRequiredToViewStatementError,
            getDocumentByIdNative,
          });
        }}
        hasIcon
      />
    </div>
  );
}

export { Attachment };
