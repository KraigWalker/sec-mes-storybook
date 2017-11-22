import React from 'react';
const regexForPAN = /\d{16}/;
const regexForValidPastedData = /[0-9A-Za-z&.?'" ]/g;

const RegexUtils = {
    matchString(text) {
        return text.match(regexForPAN);
    },
    getLastFourDigits(text) {
        return String(text).substr(text.length - 5);
    },
    isValidPastedData(data) {
        const regExp = new RegExp(regexForValidPastedData,'g');
       return regExp.test(data);
    }
}
export default RegexUtils;