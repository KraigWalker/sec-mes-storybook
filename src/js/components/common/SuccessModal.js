import GetIcon from './GetIcon';
import { Button } from 'web-ui-components/lib/atoms/buttons';
import { ButtonGroup } from 'web-ui-components/lib/molecules/buttons';
import { CentredModal } from 'web-ui-components/lib/organisms/modals';
import { StandardBody } from 'web-ui-components/lib/typography/body';

function SuccessModal(props) {
  window.top.postMessage('clearNewMessagePage', '*');

  return (
    <CentredModal
      isOpen={true}
      title=""
      buttonNode={
        <StandardBody>
          <ButtonGroup alignment="center">
            <Button display="primary" onClick={props.onClick}>
              {props.okText}
            </Button>
          </ButtonGroup>
        </StandardBody>
      }
      onClose={props.onClick}
    >
      <StandardBody>
        <p>
          <div>
            <div>
              <GetIcon
                id="icon-success"
                width="68px"
                height="68px"
                fill="#9CDD00"
              />
            </div>
            {props.bodyText}
          </div>
        </p>
      </StandardBody>
    </CentredModal>
  );
}

export { SuccessModal };
