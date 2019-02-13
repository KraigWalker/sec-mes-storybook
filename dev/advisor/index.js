import React from "react";
import ReactDOM from "react-dom";
import { App } from "../../src/js/App.advisor";
console.log(App);
function cybgSecureMessagesUI(config, id) {
    ReactDOM.render(<App config={config} />, document.getElementById(id));
}

export default cybgSecureMessagesUI;