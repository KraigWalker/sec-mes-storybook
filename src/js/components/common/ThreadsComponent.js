
import React from 'react';
import SecureMessageSummary from './SecureMessageSummary';
import TextArea from '../common/TextAreaComponent';

class ThreadsComponent extends React.Component {
   
    render() {
        const { ThreadDetail } = this.props;
        return (
           <div>
               <SecureMessageSummary message= { ThreadDetail } threadFlag={true} hasOnClick={false}/>
               <section>
                  {ThreadDetail.messageBody} 
               </section>
               
               {/*<div className="c-field">
                <TextArea messageBody={ThreadDetail.messageBody} disableText={true} threadFlag={true}/>
               </div>*/}
           </div>
        );
    }
};
export default ThreadsComponent;