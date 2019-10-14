import React from 'react';
import { ConfirmationModal } from "web-ui-components/lib/organisms/modals";
import { SubHeading } from 'web-ui-components/lib/typography/headings';
import { StandardBody } from 'web-ui-components/lib/typography/body';

const ErrorModal = props => {
  const { content, onCloseClicked, onRetry } = props;
  return (
    <ConfirmationModal
      title={content.sorryHeader}
      onConfirm={onRetry}
      isOpen={true}
      onClose={onCloseClicked}
      dismissButtonText={content.back}
      confirmButtonText={content.retry}
    >
      <StandardBody>{content.tryAgain}</StandardBody>
      <StandardBody>{content.getInTouch}</StandardBody>
    </ConfirmationModal>
  );
};

export default ErrorModal;