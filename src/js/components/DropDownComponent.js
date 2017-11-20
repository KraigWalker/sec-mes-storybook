import React from 'react';

class DropDownComoonent extends React.Component {
    constructor(props) {
        super(props);
        this.returnMenuItem = this.returnMenuItem.bind(this);
    };
    returnMenuItem() {
        if(this.props.id === 'accounts'){
            let items = [];  
            _.map(this.props.accounts.accounts,(account)=>{
                items.push(<option key = {account} value ={account}>{account}</option>
            );
            })
            return items;
           
        } else {
            let items = [];  
            _.map(this.props.subjects.subjects, (subject) => {
                console.log('sub:',subject);
                items.push(<option key = {subject.key} value={subject.value} >{subject.value}</option>);
            },false);
            return items;
        }
       
    }
    render() {
        return( <div>
        <select onChange = {this.props.selectSubject} name = "select" id={this.props.id}>
        {this.returnMenuItem()}
    </select><br/><br/><br/>
    </div>);
    }
}
export default DropDownComoonent;