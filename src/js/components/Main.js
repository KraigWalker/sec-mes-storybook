import React from 'react';
import { compose } from 'redux';
import { withRouter, Link } from 'react-router-dom';
import { TabCardBlock, TabCard } from "web-ui-components/lib/navigation/tab-cards";
import { utils } from "document-management-web-ui";

export class Main extends React.Component {
	constructor(props) {
		super(props);

		this.handleSecureMessagesClick = this.handleSecureMessagesClick.bind(this);
		this.handleDocumentPortalClick = this.handleDocumentPortalClick.bind(this);

	}
	handleSecureMessagesClick() {
		const { history } = this.props;
		history.push(`${window.baseURl}/securemessages`)
	}

	handleDocumentPortalClick() {
		const { history } = this.props;
		history.push(`${window.baseURl}/my-documents`)

	}

	render() {
		const { location, isWebView } = this.props;
		return (
			<div className="container">
				{ !isWebView &&
					<div className="tab-container web-ui-components">
						<TabCardBlock>
							<TabCard label="Secure messages" onClick={this.handleSecureMessagesClick} iconType="MailOutlineSmall" isActive={location.pathname.includes("securemessages")} />
							<TabCard label="Document portal" onClick={this.handleDocumentPortalClick} iconType="BriefcaseOutlineSmall" isActive={location.pathname.includes("my-documents")} />
						</TabCardBlock>
					</div>
				}
				{ this.props.children }
			</div>
		);
	}
}
export default compose(
	withRouter,
	utils.withNativeBridge(window.navigator.userAgent)
)(Main);
