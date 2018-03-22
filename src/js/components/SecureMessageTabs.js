import React from 'react';
import { Tabs, Tab, Grid, Row, Col } from 'react-bootstrap';
import SecureMessageList from './SecureMessageList';

const titleName = ['Inbox', 'Drafts', 'Sent'];

class SecureMessageTabs extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tab: 'inbox',
		};
	}
	onclick = tab => {
		this.setState({ tab });
	}
	render() {
		const { messages } = this.props;
		let newMessageCount = 0;
		_.map(messages.inboxMessages, message => {
			if (message.status === 'NEW') {
				newMessageCount++;
			}
		});
		const inboxTitle = `${titleName[0]} (${newMessageCount })`;
		return (messages ?
			<Tabs activeKey={this.state.tab} onSelect={this.onclick} id="secure_tabs" className="c-scroll-tabs">
				<Tab eventKey="inbox" title={inboxTitle} aria-label={`${inboxTitle} unread messages`}>
					<SecureMessageList messages={messages.inboxMessages} activeTab="inbox" content={this.props.content} />
				</Tab>
				<Tab eventKey="drafts" title={titleName[1]} aria-label={titleName[1]}>
					<SecureMessageList messages={messages.draftMessages} activeTab="drafts" content={this.props.content} />
				</Tab>
				<Tab eventKey="sent" title={titleName[2]} aria-label={titleName[2]}>
					<SecureMessageList messages={messages.sentMessages} activeTab="sent" content={this.props.content} />
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
