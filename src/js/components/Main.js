import React from 'react';
import {compose} from 'redux';
import {withRouter, Link} from 'react-router-dom';
import {TabCardBlock, TabCard} from "web-ui-components/lib/navigation/tab-cards";
import {utils} from "document-management-lib";
import {PageLayout, Container} from 'web-ui-components/lib/global/layout';
import { withBreakpoints } from "../components/common/hoc/WithBreakpoint";
import { preventWindowZoom } from "../utils/GeneralUtils";

export class Main extends React.Component {
    constructor(props) {
        super(props);
        this.handleSecureMessagesClick = this.handleSecureMessagesClick.bind(this);
        this.handleDocumentPortalClick = this.handleDocumentPortalClick.bind(this);
    }

    handleSecureMessagesClick() {
        const {history} = this.props;
        history.push(`/securemessages`);
        window.top.postMessage("goToSecureMessages", "*");
    }

    handleDocumentPortalClick() {
        const {history, session} = this.props;
        history.push(`/my-documents/${session.bank_id}`);
        window.top.postMessage("goToMyDocuments", "*");
    }

    componentDidMount() {
        if (this.props.isWebView) {
            preventWindowZoom();
        }
    }

    render() {
		const {location, isWebView, isDocumentLibraryEnabled, noPadding, containerSize} = this.props;
		let paddingProps = null;
		if (noPadding) {
			paddingProps = {
				className: "u-margin-bottom-6 u-padding-0"
			}
		} else {
			paddingProps = {
				className: "u-margin-bottom-6 u-padding-left-1"
			}
		}

        return (
            <PageLayout>
					{!isWebView && isDocumentLibraryEnabled &&
					<Container {...paddingProps} size={containerSize} >
						<TabCardBlock>
							<TabCard label="Secure messages" onClick={this.handleSecureMessagesClick}
									iconType="MailBrandedSmall" isActive={location.pathname.includes("securemessages")}/>
							<TabCard label="Letters and documents" onClick={this.handleDocumentPortalClick}
									iconType="BriefcaseBrandedSmall"
									isActive={location.pathname.includes("my-documents")}/>
						</TabCardBlock>
					</Container>
                    }
                    {this.props.children}
            </PageLayout>
        );
    }
}

export default compose(
    withRouter,
	utils.withNativeBridge(window),
	withBreakpoints
)(Main);
