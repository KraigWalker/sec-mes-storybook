import React from 'react';
import { DocumentListContainer, PreferenceCardContainer } from 'document-management-web-ui';

export const DocumentList = (props) => (
    <div className="web-ui-components centralised-container">
        <div className="u-margin-bottom-c">
            <DocumentListContainer {...props} />
        </div>
        <div>
            <PreferenceCardContainer {...props} />
        </div>
    </div>
)