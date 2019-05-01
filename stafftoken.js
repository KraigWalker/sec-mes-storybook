const curl = require("curl-request");
const hostPath = "https://homev8-u.eu.nag.net:64016";
const loginPath = `${hostPath}/cbmeoV8/frontend/logoff.do`;
const postFormPath = `${hostPath}/pkmslogin.form`;
const staffTokenPath = `${hostPath}/stafftoken/ibapi/v2/stafftoken/token`;
const advisorHtmlPath = `${process.cwd()}/dev/advisor/`;
const inquirer = require("inquirer");

const questions = [{
    type: "input",
    name: "username",
    message: "what is your ALP username",
    default: false,
}, {
    type: "password",
    name: "password",
    message: "what is your ALP password",
    mask: true,
    default: false,
}];

const fs = require("fs");

// TODO USE generators
async function getMEOSessionCookie() {
    return await new curl()
        .get(loginPath);
}

async function getLoginCookiesWithData(data) {
    return await new curl()
        .setHeaders([`Cookie: ${data.cookie}`])
        .setBody(
            {
                username: data.username,
                password: data.password,
                "login-form-type": "pwd",
                logonID: ""
            })
        .post(postFormPath)
}

async function getStaffToken(data) {
    return await new curl()
        .setHeaders([`Cookie: ${data.cookie}`, 'Content-Type: application/json', 'Accept: */*'])
        .setBody("{ \"bank_id\": \"CB\", \"system_code\": \"MEO\" }")
        .post(staffTokenPath);
}

async function staffToken(username, password) {
    return getMEOSessionCookie()
        .then(({headers}) => {
            if (headers.hasOwnProperty("set-cookie")) {
                const data = {
                    cookie: headers["set-cookie"][0],
                    username,
                    password,
                };
                console.log("Getting MEO Credentials...");
                return getLoginCookiesWithData(data)
                    .then(({headers}) => {
                        if (headers.hasOwnProperty("set-cookie")) {
                            const headerStrings = headers["set-cookie"].map(cookie => cookie.substring(0, cookie.indexOf(";")));
                            const cookie = headerStrings.reduce((prev, curr) => {
                                return `${prev} ${curr};`
                            }, "");
                            console.log("Getting Access Token...");
                            return getStaffToken({cookie})
                                .then(({body}) => {
                                    if (!body.access_token) throw new Error("Failed to Sign In");
                                    console.log(`Success! STAFF TOKEN: ${body.access_token}`);
                                    return body.access_token;
                                });
                        }
                        throw `No cookie in ${postFormPath}, Are you connected to CYBG VPN?`;
                    })
                    .catch(e => console.log(e))
            }
            throw `No cookie in ${loginPath}, Are you connected to CYBG VPN?`;
        }).catch(e => console.log(e));
}

inquirer
    .prompt(questions)
    .then(({username, password}) => staffToken(username, password)
        .then(token => {
            if (username && password) {
                return fs.readFile(`${advisorHtmlPath}/index_tmp.html`, 'utf-8', (err, contents) => {
                    if (err) throw err;
                    let htmlWithToken = contents.toString()
                        .replace("{{staffToken}}", token);
                    fs.writeFile(`${advisorHtmlPath}/index.html`, htmlWithToken, (err) => {
                        if (err) {
                            throw console.log(err);
                        }
                        console.log("file saved!");
                    });

                });
            }
        }).catch(e => console.log(e))
        .catch(err => console.log(err)));




