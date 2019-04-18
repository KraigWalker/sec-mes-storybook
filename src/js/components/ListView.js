import React from 'react';
import { ListViewContainer, PreferenceCardContainer } from 'document-management-web-ui';
import {Container, Row} from "web-ui-components/lib/global/layout";
import { withBreakpoints } from "../components/common/hoc/WithBreakpoint";

const listview = (props) => {

    const { containerSize, noPadding } = props;
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
                <ListViewContainer {...props} />
            </Row>
            <Row>
                <PreferenceCardContainer {...props} />
            </Row>
        </Container>
    );

} 

export const ListView = withBreakpoints(listview);