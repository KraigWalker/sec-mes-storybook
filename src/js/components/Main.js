import React from 'react';
import { compose } from 'redux';
import { withRouter, Link } from 'react-router-dom';
import { TabCardBlock, TabCard } from "web-ui-components/lib/navigation/tab-cards";
import { utils } from "document-management-web-ui";
import { PageLayout, Container } from 'web-ui-components/lib/global/layout';

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
			<PageLayout>
				{ !isWebView && isDocumentLibraryEnabled &&
					<Container className="u-padding-1 u-margin-bottom-6">
						<TabCardBlock>
							<TabCard label="Secure Messages" onClick={this.handleSecureMessagesClick} iconType="MailBrandedSmall" isActive={location.pathname.includes("securemessages")} />
							<TabCard label="Document Library" onClick={this.handleDocumentPortalClick} iconType="BriefcaseBrandedSmall" isActive={location.pathname.includes("my-documents")} />
						</TabCardBlock>
					</Container>
				}
				{ this.props.children }
			</PageLayout>
		);
	}
}

export default compose(
    withRouter,
    utils.withNativeBridge(window)
)(Main);
