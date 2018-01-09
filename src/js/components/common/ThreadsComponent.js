
import React from 'react';
import SecureMessageSummary from './SecureMessageSummary';
import TextArea from '../common/TextAreaComponent';

class ThreadsComponent extends React.Component {
   
    render() {
        const { ThreadDetail } = this.props;
        return (
           <li className="c-thread">
               <SecureMessageSummary message= { ThreadDetail } threadFlag={true} hasOnClick={false}/>
               <pre className="c-thread__body">
                  {ThreadDetail.messageBody} 
               </pre>
           </li>
        );
    }
};
export default ThreadsComponent;