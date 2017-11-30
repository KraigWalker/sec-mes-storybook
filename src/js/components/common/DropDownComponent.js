import React from 'react';
import cx from 'classnames';

class DropDownComponent extends React.Component {
    constructor(props) {
        super(props);
        this.returnMenuItem = this.returnMenuItem.bind(this);
        this.overlayclick = this.overlayclick.bind(this);
        this.showList = this.showList.bind(this);
        this.setDropDrownValue = this.setDropDrownValue.bind(this);
        this.state = {
            list: false,
            Text: 'Please select'
        }
    };
    returnMenuItem() {
        if (this.props.id === 'accounts') {
            let items = [];
            _.map(this.props.accounts.accounts, (account) => {
                items.push(<li className="c-dropdown__value" key={account} value={account} onClick={this.setDropDrownValue}>{account}</li>
                );
            })
            return items;

        } else {
            let items = [];
            _.map(this.props.subjects.subjects, (subject) => {
                items.push(<li className="c-dropdown__value" key={subject.key} value={subject.value} onClick={this.setDropDrownValue}>{subject.value}</li>);
            }, false);
            return items;
        }

    }
    overlayclick() {
        this.setState({
            list: false,
        });

    }
    showList() {
        if (this.state.list === false) {
            this.setState({ list: true });
        }
        else {
            this.setState({ list: false });
        }
    }
    setDropDrownValue(e) {
        this.setState({
            Text: e.target.textContent,
            list: false,
        });
    }
    render() {
        const overlayClassName = cx({
            'c-overlay overlay__custom--zindex': true,
            'overlay__show': this.state.list,

        });
        return (
            <div>
                <button className="c-field__input c-field__input--select c-dropdown u-cursor-pointer" onClick={this.showList}>{this.state.Text}</button>
                {this.state.list ? <div ref="overlay" className={overlayClassName} onClick={this.overlayclick} ></div> : ''}
                {this.state.list && <ul className="c-dropdown__list u-cursor-pointer">{this.returnMenuItem()}</ul>}
            </div>
        );
    }
}
export default DropDownComponent;