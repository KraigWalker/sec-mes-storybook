import React from 'react';
import Inbox from './Inbox';
import { Link } from 'react-router-dom';

/**
 * @class SecureMessageLanding 
 * Landing Page of the application
*/

class SecureMessageLanding extends React.Component {
    
    render() {
        return(
            <div>
                <ul>
                    <li><Link to = '/securemessages:inbox'>Inbox</Link></li>
                </ul>
            </div>
        );
    }
}
/**
 * Maps the state of the component to the state of the redux store
 * @param {object} state. State of the application
 */


export default SecureMessageLanding;