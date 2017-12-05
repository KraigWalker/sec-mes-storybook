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
		let newMessageCount = 0;
		_.map(messages.inboxMessages,message => {
			if(message.status === 'NEW') {
				newMessageCount++;
			}
		});
		let inboxTitle = titleName[0] + '('+ newMessageCount + ')';
		return (messages?
				<Tabs activeKey={this.props.activeTab} onSelect={this.props.onClick} id="secure_tabs" className="c-scroll-tabs">
					<Tab eventKey={'inbox'} title={inboxTitle}>
                        <SecureMessageList messages={messages? messages.inboxMessages : null} activeTab = {this.props.activeTab}/>
					</Tab>
					<Tab eventKey={'drafts'} title={titleName[1]}>
                        <SecureMessageList messages={messages? messages.draftMessages : null} activeTab = {this.props.activeTab}/>
					</Tab>
					<Tab eventKey={'sent'} title={titleName[2]}>
                        <SecureMessageList messages={messages? messages.sentMessages : null} activeTab = {this.props.activeTab}/>
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