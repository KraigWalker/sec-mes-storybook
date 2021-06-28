import { getAppIdFromBankId } from './getAppIdFromBankId';

const WEB = 'WEB';

export function buildClientContextHeader(bankId, userTrackingId = '') {
  /**
   * @todo Some of these values seem excessively verbose and retrograde.
   * Test to see if we can get rid of some of these through a
   * process of trial and error.
   * Or perhaps find an API Spec with information on the Headers required.
   */
  return JSON.stringify({
    client: {
      user_tracking_id: userTrackingId,
      app_title: getAppIdFromBankId(bankId),
      app_package_name: WEB,
      app_version_code: navigator.appVersion,
      app_version_name: navigator.appName,
    },
    env: {
      platform: WEB,
      platform_version:
        navigator.appVersion || navigator.vendor || window.opera,
      make: navigator.platform || window.opera,
      locale: navigator.language,
    },
  });
}
