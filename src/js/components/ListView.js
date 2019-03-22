import React from 'react';
import { ListViewContainer, PreferenceCardContainer } from 'document-management-web-ui';

export const ListView = (props) => (
    <div className="web-ui-components centralised-container">
        <div className="u-margin-bottom-c">   
            <ListViewContainer {...props} />
        </div>
        <div>
            <PreferenceCardContainer {...props} />
        </div>
    </div>
)