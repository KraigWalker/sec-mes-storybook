import React from "react";
import { Tabs, Tab, Grid, Row, Col } from "react-bootstrap";
import SecureMessageList from "./SecureMessageList";
import {
  DRAFT,
  SENT,
  INBOX,
  NEW,
  ARCHIVED as ARCHIVE
} from "../constants/StringsConstants";
import _ from "lodash";
const titleName = ["Inbox", "Drafts", "Sent", "Archive"];

export class SecureMessageTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: "inbox"
    };
  }
  onclick = tab => {
    this.setState({ tab });
  };

  render() {
    const { messages } = this.props;
	const unreadInboxCount = getInboxUnreadCount(messages);
	const inboxTitle = getInboxTitle(unreadInboxCount);

    return messages ? (
      <Tabs
        activeKey={this.state.tab}
        onSelect={this.onclick}
        id="secure_tabs"
        className="c-scroll-tabs"
      >
        <Tab
          eventKey="inbox"
          title={inboxTitle}
          aria-label={`${inboxTitle} unread messages`}
        >
          <SecureMessageList
            messages={messages.inboxMessages}
            activeTab={INBOX}
            content={this.props.content}
          />
        </Tab>
        <Tab eventKey="drafts" title={titleName[1]} aria-label={titleName[1]}>
          <SecureMessageList
            messages={messages.draftMessages}
            activeTab={DRAFT}
            content={this.props.content}
          />
        </Tab>
        <Tab eventKey="sent" title={titleName[2]} aria-label={titleName[2]}>
          <SecureMessageList
            messages={messages.sentMessages}
            activeTab={SENT}
            content={this.props.content}
          />
        </Tab>
        <Tab eventKey="archived" title={titleName[3]} aria-label={titleName[3]}>
          <SecureMessageList
            messages={messages.archivedMessages}
            activeTab={ARCHIVE}
            content={this.props.content}
          />
        </Tab>
      </Tabs>
    ) : (
      <p>Loading...</p>
    );
  }
}

const getInboxUnreadCount = messages => _.sumBy(messages.inboxMessages, message => message.status === NEW);
const getInboxTitle = (messageCount) => {
    return messageCount > 0
      ? `Inbox (${messageCount})`
	  : `Inbox`;
}
	  
SecureMessageTabs.propTypes = {};
SecureMessageTabs.defaultProps = {};

export default SecureMessageTabs;
