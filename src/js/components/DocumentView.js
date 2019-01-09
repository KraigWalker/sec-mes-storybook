import React from 'react';
import { DocumentView as DocumentViewContainer } from 'document-management-web-ui';

class DocumentView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="web-ui-components centralised-container">
                <DocumentViewContainer {...this.props} />
            </div>
        )
    }
}

export {
    DocumentView
}