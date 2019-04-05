const path = require("path");

module.exports = {
    resolveFromRoot: relativePath => path.resolve(__dirname, relativePath)
};
