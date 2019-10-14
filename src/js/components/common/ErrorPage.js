import React from 'react';
import { connect } from 'react-redux';
import { fetchSecureMessages, getAccounts } from '../../actions/AppActions';
import { LoadingLocalTakeover } from 'web-ui-components/lib/organisms/takeovers';
import { Container, Row } from "web-ui-components/lib/global/layout";
import { Card } from "web-ui-components/lib/organisms/cards";
import { BackButton } from 'web-ui-components/lib/molecules/navigation';
import { TextBody } from "web-ui-components/lib/atoms/text";
import { ButtonGroup } from 'web-ui-components/lib/molecules/buttons'
import { Button } from 'web-ui-components/lib/atoms/buttons';
import { PageHeading, SubHeading } from 'web-ui-components/lib/typography/headings';
import { withBreakpoints } from "./hoc/WithBreakpoint";
import { compose } from "redux";
import { MessageSelectors } from '../../reducers/index';

export class ErrorPage extends React.Component {

    constructor(props) {
        super(props);
        this.handleBackButton = this.handleBackButton.bind(this);
    }

    handleBackButton = () => {
        window.top.postMessage('goBackToAccount', "*");
    }

    retry = () => {
        const { fetched } = this.props;
        this.props.getAccounts();
        !fetched && this.props.fetchSecureMessages();
    }

    render() {
        const { fetching, containerSize, noPadding} = this.props;
        const { content } = this.props.location;
        
		let paddingProps = null;
		if (noPadding)
		{
			paddingProps = {
				className: "u-padding-0",
			}
        }

        return (<LoadingLocalTakeover show={fetching} title="loading.." >
            <Container {...paddingProps} size={containerSize}>
                <Row>
                    <Card>
                        <TextBody>
                            <BackButton onClick={this.handleBackButton} label={content.backToAccounts}/>
                        </TextBody>
                        <PageHeading>{content.messages}</PageHeading>
                        <SubHeading>{content.sorryHeader}</SubHeading>
                        <TextBody>{content.tryAgain}</TextBody>
                        <TextBody>{content.getInTouch}</TextBody>
                        <ButtonGroup>
                            <Button display="secondary" onClick={this.handleBackButton}>{content.back}</Button>
                            <Button display="primary" onClick={this.retry}>{content.retry}</Button>
                        </ButtonGroup>
                    </Card>
                </Row>
            </Container>
        </LoadingLocalTakeover>);
    }
}
const mapState = (state) => {
    return {
        fetching: MessageSelectors.getFetching(state),
        fetched: MessageSelectors.getFetched(state)
    }
};

const mapDispatchToProps = {
    fetchSecureMessages,
    getAccounts
}

export default compose(
    connect(
      mapState,
      mapDispatchToProps
    ),
    withBreakpoints
  )(ErrorPage);
