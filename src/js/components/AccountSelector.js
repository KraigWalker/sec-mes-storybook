import React from 'react';
import { AccountSelectorContainer } from 'document-management-web-ui';

export const AccountSelector = (props) => (
    <div className="web-ui-components centralised-container">
        <div className="u-margin-bottom-c">   
            <AccountSelectorContainer {...props} />
        </div>
    </div>
);