const fs = require("fs");
const inquirer = require("inquirer");
const {staffToken} = require("./loginToMEO");
const advisorHtmlPath = `${process.cwd()}/dev/advisor/`;
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
// Run developer login enquiries
inquirer
    .prompt(questions)
    .then(({username, password}) => staffToken(username, password)
        .then(token => {
            if (username && password) {
                return fs.readFile(`${advisorHtmlPath}/index_tmp.html`, 'utf-8', (err, contents) => {
                    if (err) throw err;
                    const htmlWithToken = contents.toString()
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
