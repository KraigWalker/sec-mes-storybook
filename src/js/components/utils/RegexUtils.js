import React from 'react';
const regexForPAN = /\d{16}/;
const regexSeparatedBySpacePAN = /[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}/;
const regexSeparatedByHipenPAN = /[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}/;
const regexForValidPastedData = /[0-9A-Za-z&.?'" ]/g;

const RegexUtils = {
    matchString(text) {
        return text.match(regexForPAN) || text.match(regexSeparatedBySpacePAN) || text.match(regexSeparatedByHipenPAN);
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