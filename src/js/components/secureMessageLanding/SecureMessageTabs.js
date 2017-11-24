import React from 'react';
import { Tabs, Tab, Grid, Row, Col } from 'react-bootstrap';
import SecureMessageList from './SecureMessageList';
let titleName = ['Inbox', 'Drafts', 'Sent'];

class SecureMessageTabs extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
        const { messages } = this.props;
		return (messages?
				<Tabs activeKey={this.props.activeTab} onSelect={this.props.onClick} id="secure_tabs" className="c-scroll-tabs">
					<Tab eventKey={'inbox'} title={titleName[0]}>
                        <SecureMessageList messages={messages? messages.inboxMessages : null}/>
					</Tab>
					<Tab eventKey={'drafts'} title={titleName[1]}>
                        <SecureMessageList messages={messages? messages.draftMessages : null}/>
					</Tab>
					<Tab eventKey={'sent'} title={titleName[2]}>
                        <SecureMessageList messages={messages? messages.sentMessages : null}/>
					</Tab>
				</Tabs>
			 : <p>Loading...</p> 
		);
	}
}

SecureMessageTabs.propTypes = {
	
};
SecureMessageTabs.defaultProps = {
	
};

export default SecureMessageTabs;