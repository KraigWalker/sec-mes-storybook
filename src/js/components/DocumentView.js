import React from 'react';
import {DocumentView as DocumentViewContainer} from 'document-management-web-ui';
import {Container, Row} from "web-ui-components/lib/global/layout";

class DocumentView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container className="u-margin-top-6">
                <Row>
                    <DocumentViewContainer {...this.props} />
                </Row>
            </Container>
        )
    }
}

export {
    DocumentView
}