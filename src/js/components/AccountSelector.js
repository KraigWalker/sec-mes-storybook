import React from 'react';
import {AccountSelectorContainer} from 'document-management-web-ui';
import {Container, Row} from "web-ui-components/lib/global/layout";
import { withBreakpoints } from "../components/common/hoc/WithBreakpoint";

const accounts = (props) =>  {
    const { containerSize, noPadding } = props;
    let paddingProps = null;
    if (noPadding)
    {
        paddingProps = {
            className: "u-padding-0",
        }
    }

    return (<Container {...paddingProps} size={containerSize}>
        <Row>
            <AccountSelectorContainer {...props} />
        </Row>
    </Container>);
}

export const AccountSelector = withBreakpoints(accounts);

