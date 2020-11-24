import GetIcon from './GetIcon';
import { Button } from 'web-ui-components/lib/atoms/buttons';
import { ButtonGroup } from 'web-ui-components/lib/molecules/buttons';
import { CentredModal } from 'web-ui-components/lib/organisms/modals';
import { TextBody } from 'web-ui-components/lib/atoms/text';

const SuccessModal = (props) => {
  window.top.postMessage('clearNewMessagePage', '*');

  const bodyContent = (
    <div>
      <div>
        <GetIcon id="icon-success" width="68px" height="68px" fill="#9CDD00" />
      </div>
      {props.bodyText}
    </div>
  );

  const footerButtons = (
    <TextBody>
      <ButtonGroup alignment="center">
        <Button display="primary" onClick={props.onClick}>
          {props.okText}
        </Button>
      </ButtonGroup>
    </TextBody>
  );

  return (
    <CentredModal
      isOpen={true}
      title=""
      buttonNode={footerButtons}
      onClose={props.onClick}
    >
      <TextBody>{bodyContent}</TextBody>
    </CentredModal>
  );
};

export default SuccessModal;
