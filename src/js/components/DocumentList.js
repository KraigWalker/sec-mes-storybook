import React from 'react';
import { DocumentListContainer, PreferenceCardContainer } from 'document-management-web-ui';
import {Container, Row} from "web-ui-components/lib/global/layout";

export const DocumentList = (props) => (
    <Container className="u-margin-top-6">
        <Row>
            <DocumentListContainer {...props} />
        </Row>
        <Row>
            <PreferenceCardContainer {...props} />
        </Row>
    </Container>
)