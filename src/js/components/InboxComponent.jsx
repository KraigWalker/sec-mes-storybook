import React from 'react';
import { PropTypes } from 'react';

import SvgIcon from './common/GetIcon.jsx'
import _ from 'lodash';


class InboxComponent extends React.Component {
    getMessages(list){
        const messagesList = [];
        if(list && list.length){
            _.map(list, (item,index) => {
                messagesList.push(<div className="c-message">
                <span className="c-message__icon"><SvgIcon id="icon-Information" width="24px" height="24px"/></span>
                <div className="c-message__summary">
                    <div className="c-message__summary__head">
                        <label className="c-message__summary__head__subject">{item.subject}</label>
                        <span className="c-message__summary__head__actions">
                            <button className="c-btn c-btn--link zero-padding c-message__summary__head__actions__reply">Reply</button>
                            <a href="#/" className="c-message__summary__head__actions__reply--sm"><SvgIcon id="icon-Information" width="24px" height="24px"/></a>
                            <button className="c-btn c-btn--link zero-padding c-message__summary__head__actions__delete">Delete</button>
                            <a href="#/" className="c-message__summary__head__actions__delete--sm"><SvgIcon id="icon-delete" width="24px" height="24px"/></a>
                        </span>
                    </div>
                    <p className="c-message__summary__account">{item.account.nummber}</p>
                    <p className="c-message__summary__ref">{item.reference}</p>
                    <p className="c-message__summary__date">Date</p>
                </div>
                </div>);
            });
        }
        return messagesList;
    }
    
    render = () => {
        return (<div>
            {this.getMessages(this.props.messages)}
        </div>
        );
    }
}

export default InboxComponent;


