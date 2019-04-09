import React from 'react';
import { ListViewContainer, PreferenceCardContainer } from 'document-management-web-ui';
import {Container, Row} from "web-ui-components/lib/global/layout";

export const ListView = (props) => (
    <Container className="u-padding-left-0 u-padding-right-0">
        <Row>
            <ListViewContainer {...props} />
        </Row>
        <Row>
            <PreferenceCardContainer {...props} />
        </Row>
    </Container>
)