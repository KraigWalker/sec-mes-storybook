import React from "react";
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
import { TabGroup } from "web-ui-components/lib/navigation/tab-group";

export class SecureMessageTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: INBOX
    };
  }
  onclick = activeTab => {
    this.setState({ activeTab });
  };

  render() {
    const { messages } = this.props;
    const unreadInboxCount = getInboxUnreadCount(messages);
    const inboxTitle = getInboxTitle(unreadInboxCount);

    const activeTabMessages = getActiveTabMessages(
      this.state.activeTab,
      this.props.messages
    );

    return messages ? (
      <div>
        <TabGroup
          activeTab={this.state.activeTab}
          onChange={val => {
            this.setState({ activeTab: val });
          }}
          tabButtons={[
            {
              title: inboxTitle,
              id: INBOX
            },
            {
              title: titleName[1],
              id: DRAFT
            },
            {
              title: titleName[2],
              id: SENT
            },
            {
              title: titleName[3],
              id: ARCHIVE
            }
          ]}
        />

        <SecureMessageList
          messages={activeTabMessages}
          activeTab={this.state.activeTab}
		  content={this.props.content}
        />
      </div>
    ) : (
      <p>Loading...</p>
    );
  }
}

const getInboxUnreadCount = messages =>
  _.sumBy(messages.inboxMessages, message => message.status === NEW);

const getInboxTitle = messageCount => {
  return messageCount > 0 ? `Inbox (${messageCount})` : `Inbox`;
};

const getActiveTabMessages = (tab, messages) => {
  switch (tab) {
    case DRAFT:
      return messages.draftMessages;
    case SENT:
      return messages.sentMessages;
    case ARCHIVE:
      return messages.archivedMessages;
    case INBOX:
    default:
      return messages.inboxMessages;
  }
};

SecureMessageTabs.propTypes = {};
SecureMessageTabs.defaultProps = {};

export default SecureMessageTabs;
