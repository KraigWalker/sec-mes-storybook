module.exports = {
    test: /client.js$/,
    use: {
        loader: "string-replace-loader",
        options: {
            search: "{/*native*/}",
            replace:
                "window.AndroidInterface={downloadDocument(){console.log(`download document`)},setBackButtonData(){console.log(`set backbutton data`)}, webAppLoaded(){console.log(`web app loaded`)}}",
            strict: true
        }
    }
};
