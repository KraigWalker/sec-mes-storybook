import React from 'react';
import { ConfirmationModal } from "web-ui-components/lib/organisms/modals";

const ErrorModal = props => {
  const { content, onCloseClicked, onRetry } = props;
  const bodyContent = (
    <div>
      <h3>{content.sorryHeader}</h3>
      <br />
      <p>{content.tryAgain}</p>
      <br />
      <p>{content.getInTouch}</p>
    </div>
  );
  return (
    <ConfirmationModal
      title={bodyContent}
      onConfirm={onRetry}
      isOpen={true}
      onClose={onCloseClicked}
      dismissButtonText={content.back}
      confirmButtonText={content.retry}
    />
  );
};

export default ErrorModal;