const shell = require("shelljs");
const macChromePath = "/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome";
const instructionPath = "/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --ignore-certificate-errors";

try {
    const hasCurlRequest = require("curl-request");
    if (hasCurlRequest) {
        // TODO: find windows paths
        if (shell.which(macChromePath)) {
            shell.exec("echo Please close all active Google Chrome instances.");
            shell.exec("echo Will wait 5 seconds...");
            shell.exec("sleep 5");
            shell.exec(`${instructionPath} > /dev/null $`, {async: true});
            return shell.exit(0);
        }

        return shell.exec("echo Error Google Chrome application path not detected on your machine. This must be started with ignore certicate errors.").stdout && shell.exit(1);
    }
} catch (err) {
    console.error("ERROR Please use node > 10 to run MEO advisor dependencies. Re-run npm install once on node 10");
    throw err;
}

