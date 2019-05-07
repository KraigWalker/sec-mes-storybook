import React from 'react';
import { DocumentListContainer, PreferenceCardContainer } from 'document-management-web-ui';
import {Container, Row} from "web-ui-components/lib/global/layout";
import { withBreakpoints } from "../components/common/hoc/WithBreakpoint";

const DocumentList = (props) => {

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
                <DocumentListContainer {...props} />
            </Row>
            <Row>
                <PreferenceCardContainer {...props} />
            </Row>
        </Container>
        );
}

export default withBreakpoints(DocumentList);