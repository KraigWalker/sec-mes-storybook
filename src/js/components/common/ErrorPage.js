import React from 'react';
import { connect } from 'react-redux';
import { fetchSecureMessages, getAccounts } from '../../actions/AppActions';
import { Loader } from 'web-ui-components/lib/organisms/modals';
import { Container, Row } from "web-ui-components/lib/global/layout";
import { Card } from "web-ui-components/lib/organisms/cards";
import { BackButton } from 'web-ui-components/lib/molecules/navigation';
import { Title, TextBody } from "web-ui-components/lib/atoms/text";
import { ButtonGroup } from 'web-ui-components/lib/molecules/buttons'
import { Button } from 'web-ui-components/lib/atoms/buttons';

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
        const { messages} = this.props;
        const { content } = this.props.location;

        return (messages.fetching 
            ? <Loader isOpen={true} />
            : <Container>
                <Row>
                    <Card>
                        <TextBody>
                            <BackButton onClick={this.handleBackButton} label={content.backToAccounts}/>
                        </TextBody>
                        <TextBody>
                            <Title size="h1">{content.messages}</Title>
                        </TextBody>
                        <TextBody>
                            <Title size="h2">{content.sorryHeader}</Title>
                        </TextBody>
                        <TextBody>{content.tryAgain}</TextBody>
                        <TextBody>{content.getInTouch}</TextBody>
                        <ButtonGroup>
                            <Button display="secondary" onClick={this.handleBackButton}>{content.back}</Button>
                            <Button display="primary" onClick={this.retry}>{content.retry}</Button>
                        </ButtonGroup>
                    </Card>
                </Row>
        </Container>);
    }
}
const mapState = (state) => {
    return {
        messages: state.messages,
    }
};

const mapDispatchToProps = {
    fetchSecureMessages,
    getAccounts
}
export default connect(mapState, mapDispatchToProps)(ErrorPage);