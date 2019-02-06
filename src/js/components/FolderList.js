import React from 'react';
import { FolderListContainer, PreferenceCardContainer } from 'document-management-web-ui';

export const FolderList = (props) => (
    <div className="web-ui-components centralised-container">
        <div className="u-margin-bottom-c">   
            <FolderListContainer {...props} />
        </div>
        <div>
            <PreferenceCardContainer {...props} />
        </div>
    </div>
)