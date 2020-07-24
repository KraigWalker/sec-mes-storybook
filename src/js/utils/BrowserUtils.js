const BrowserUtils = {
  getPlatform() {
    return navigator.platform || window.opera;
  },

  getBrowserVersion() {
    return navigator.appVersion || navigator.vendor || window.opera;
  },

  getUserLocale() {
    return navigator.userLanguage || navigator.language || navigator.browserLanguage || navigator.systemLanguage;
  },
};

module.exports = BrowserUtils;
