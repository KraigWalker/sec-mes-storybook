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

  const isStatementDownload =
    enableCategoryAttachmentParam && category && category === 'Statements';

  const webDownloadUrl = `${basePath}/my-documents/${bank_id}/${id}?bank_id=${bank_id}&client_context=${app_title}&user_tracking_id=${user_tracking_id}&brandId=${brand}&state=${state}`;
  const categoryQueryParam = '&category=Statements';
  const accessTokenHash = `#access_token=${access_token}`;
  /**
   * Only trigger the native document download view if not a statement and in
   * a native mobile app WebView
   */
  if (isWebView) {
    if (isStatementDownload) {
      window.location.href = `${webDownloadUrl}${categoryQueryParam}${accessTokenHash}`;
    } else {
      getDocumentByIdNative(id, fileSize);
    }
  } else {
    window.open(
      `${webDownloadUrl}${
        isStatementDownload
          ? categoryQueryParam // Because adding the category param can throw off other types of attachments, we hardcode Statements
          : ''
      }${accessTokenHash}`
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
