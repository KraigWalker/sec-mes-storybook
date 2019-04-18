import React from 'react';
import {DocumentView as DocumentViewContainer} from 'document-management-web-ui';
import {Container, Row} from "web-ui-components/lib/global/layout";
import { withBreakpoints } from "../components/common/hoc/WithBreakpoint";

class DocumentView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const { containerSize, noPadding } = this.props;
        let paddingProps = null;
		if (noPadding)
		{
			paddingProps = {
				className: "u-padding-0",
			}
        }

        return (
            <Container {...paddingProps} size={containerSize}>
                <Row>
                    <DocumentViewContainer {...this.props} />
                </Row>
            </Container>
        )
    }
}

DocumentView = withBreakpoints(DocumentView);

export {
    DocumentView
}