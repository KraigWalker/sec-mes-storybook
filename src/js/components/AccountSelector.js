import React from 'react';
import {AccountSelectorContainer} from 'document-management-web-ui';
import {Container, Row} from "web-ui-components/lib/global/layout";

export const AccountSelector = (props) =>  <Container className="u-padding-left-0 u-padding-right-0">
    <Row>
        <AccountSelectorContainer {...props} />
    </Row>
</Container>;