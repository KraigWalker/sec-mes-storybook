import { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSecureMessages, getAccounts } from '../../actions/AppActions';
import { LoadingLocalTakeover } from 'web-ui-components/lib/organisms/takeovers';
import { Container, Row } from 'web-ui-components/lib/global/layout';
import { Card } from 'web-ui-components/lib/organisms/cards';
import { BackButton } from 'web-ui-components/lib/molecules/navigation';
import { StandardBody } from 'web-ui-components/lib/typography/body';
import { ButtonGroup } from 'web-ui-components/lib/molecules/buttons';
import { Button } from 'web-ui-components/lib/atoms/buttons';
import {
  PageHeading,
  SubHeading,
} from 'web-ui-components/lib/typography/headings';
import { withBreakpoints } from './hoc/WithBreakpoint';
import { compose } from 'redux';
import { MessageSelectors } from '../../reducers/index';
import { getPaddingProps, getRowMarginProps } from '../../utils/GeneralUtils';

export class ErrorPage extends Component {
  constructor(props) {
    super(props);
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  handleBackButton = () => {
    window.top.postMessage('goBackToAccount', '*');
  };

  retry = () => {
    const { fetched } = this.props;
    this.props.getAccounts();
    !fetched && this.props.fetchSecureMessages();
  };

  render() {
    const { fetching, containerSize, noPadding, location } = this.props;
    const { content } = location;

    return (
      <LoadingLocalTakeover show={fetching} title="loading..">
        <Container {...getPaddingProps(noPadding)} size={containerSize}>
          <Row {...getRowMarginProps(noPadding)}>
            <Card>
              <StandardBody>
                <BackButton
                  onClick={this.handleBackButton}
                  label={content.backToAccounts}
                />
              </StandardBody>
              <PageHeading>{content.messages}</PageHeading>
              <SubHeading>{content.sorryHeader}</SubHeading>
              <StandardBody>
                <p>{content.tryAgain}</p>
              </StandardBody>
              <StandardBody>
                <p>{content.getInTouch}</p>
              </StandardBody>
              <ButtonGroup>
                <Button display="secondary" onClick={this.handleBackButton}>
                  {content.back}
                </Button>
                <Button display="primary" onClick={this.retry}>
                  {content.retry}
                </Button>
              </ButtonGroup>
            </Card>
          </Row>
        </Container>
      </LoadingLocalTakeover>
    );
  }
}
const mapState = (state) => {
  return {
    fetching: MessageSelectors.getFetching(state),
    fetched: MessageSelectors.getFetched(state),
  };
};

const mapDispatchToProps = {
  fetchSecureMessages,
  getAccounts,
};

export default compose(
  connect(mapState, mapDispatchToProps),
  withBreakpoints
)(ErrorPage);
