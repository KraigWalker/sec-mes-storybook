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
		let inboxTitle =  titleName[0] + '('+ newMessageCount + ')';
		return (messages?
				<Tabs activeKey={this.props.activeTab} onSelect={this.props.onClick} id="secure_tabs" className="c-scroll-tabs">
					<Tab eventKey={'inbox'} title={inboxTitle}  aria-label={`${inboxTitle} unread messages`}>
                        <SecureMessageList messages={messages? messages.inboxMessages : null} activeTab = {this.props.activeTab} count = {messages.inboxMessages.length}/>
					</Tab>
					<Tab eventKey={'drafts'} title={titleName[1]}  aria-label={titleName[1]}>
                        <SecureMessageList messages={messages? messages.draftMessages : null} activeTab = {this.props.activeTab} count = {messages.draftMessages.length}/>
					</Tab>
					<Tab eventKey={'sent'} title={titleName[2]}  aria-label={titleName[2]}>
                        <SecureMessageList messages={messages? messages.sentMessages : null} activeTab = {this.props.activeTab} count = {messages.sentMessages.length}/>
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