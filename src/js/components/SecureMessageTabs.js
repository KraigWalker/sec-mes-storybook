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

import {TabGroup} from "web-ui-components/lib/navigation/tab-group";
import {Row, Container} from "web-ui-components/lib/global/layout";
import { withBreakpoints } from "../components/common/hoc/WithBreakpoint";

export class SecureMessageTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: INBOX
        };
    }

    onclick = activeTab => {
        this.setState({activeTab});
    };

    render() {
        const {messages, noPadding, containerSize} = this.props;
        const unreadInboxCount = getInboxUnreadCount(messages);
        const inboxTitle = getInboxTitle(unreadInboxCount);
        const activeTabMessages = getActiveTabMessages(
            this.state.activeTab,
            this.props.messages
        );

        let paddingProps = null;
		if (noPadding)
		{
			paddingProps = {
				className: "u-margin-top-2 u-padding-left-0",
			}
        }
        else {
            paddingProps = {
				className: "u-margin-top-2 u-padding-left-0",
			}
        }

        return messages ? (
            <Container {...paddingProps} size={containerSize}>
                <TabGroup className="u-padding-left-0"
                    activeTab={this.state.activeTab}
                    onChange={val => {
                        this.setState({activeTab: val});
                    }}
                    tabButtons={[
                        {
                            title: inboxTitle,
                            id: INBOX
                        },
                        {
                            title: "Drafts",
                            id: DRAFT
                        },
                        {
                            title: "Sent",
                            id: SENT
                        },
                        {
                            title: "Archive",
                            id: ARCHIVE
                        }
                    ]}
                />
                <Row>
                    <SecureMessageList
                        messages={activeTabMessages}
                        activeTab={this.state.activeTab}
                        content={this.props.content}
                    />
                </Row>
            </Container>
        ) : (
            <p>Loading...</p>
        );
    }
}

const getInboxUnreadCount = messages => {
    if (messages.inboxMessages.length) {
        return messages.inboxMessages
            .filter(message => message.status === "NEW").length;
    }
    return 0;
};


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

export default withBreakpoints(SecureMessageTabs);
