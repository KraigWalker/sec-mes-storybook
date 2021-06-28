/**
 *
 * @param {String} bankId
 * @param {String?} appTitle
 * @returns
 */
export function getAppIdFromBankId(bankId, appTitle) {
  return appTitle || `${bankId.toUpperCase()} Web`;
}
