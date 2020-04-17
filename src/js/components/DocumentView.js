import React from 'react';
import {DocumentView as DocumentViewContainer} from 'document-management-lib';
import "../../css/DocumentView.css";

class DocumentView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <DocumentViewContainer {...this.props} />
        )
    }
}

export {
    DocumentView
}