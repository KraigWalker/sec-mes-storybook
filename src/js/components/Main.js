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
		history.push(`/securemessages`)
	}

	handleDocumentPortalClick() {
		const { history, session } = this.props;
		history.push(`/my-documents/${session.brand}`)

	}

	render() {
		const { location, isWebView, isDocumentLibraryEnabled } = this.props;
		return (
			<div className="container">
				{ !isWebView && isDocumentLibraryEnabled &&
					<div className="tab-container">
						<TabCardBlock>
							<TabCard label="Secure Messages" onClick={this.handleSecureMessagesClick} iconType="MailBrandedSmall" isActive={location.pathname.includes("securemessages")} />
							<TabCard label="Document Library" onClick={this.handleDocumentPortalClick} iconType="BriefcaseBrandedSmall" isActive={location.pathname.includes("my-documents")} />
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
    utils.withNativeBridge(window)
)(Main);
