module.exports = {
    test: /client.js$/,
    use: {
        loader: "string-replace-loader",
        options: {
            search: "{/*native*/}",
            replace:
                "window.webkit={messageHandlers:{webAppLoaded:{postMessage(){console.log(`webapploaded`)}},downloadDocument:{postMessage(){console.log(`download document`)}},setBackButtonData:{postMessage(){console.log(`setbackbuttondata`)}}}}",
            strict: true
        }
    }
};
