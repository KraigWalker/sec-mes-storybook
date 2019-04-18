import React from "react";
import ReactDOM from "react-dom";
import { App } from "../../src/js/App.advisor";

const loadStyles = (brandId) => {
    var head = document.getElementsByTagName('head')[0];
    var element = document.createElement('link');
    element.rel = 'stylesheet';
    element.href = `${path}css/app.${brandId.toLowerCase()}.css`;
    head.appendChild(element);
};

function cybgSecureMessagingUI(config, id) {
    loadStyles(config.brandId);
    ReactDOM.render(<App config={config} />, document.getElementById(id));
}

export default cybgSecureMessagingUI;