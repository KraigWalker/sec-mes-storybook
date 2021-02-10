import BrowserUtils from './BrowserUtils';

export const buildClientContext = (appTitle, userTrackingId, fingerprint) => ({
  client: {
    app_title: appTitle,
    user_tracking_id: userTrackingId,
    client_id: fingerprint,
    app_version_code: '1.0.0',
    app_version_name: navigator.appVersion,
  },
  env: {
    platform_version: BrowserUtils.getBrowserVersion(),
    make: BrowserUtils.getPlatform(),
    locale: BrowserUtils.getUserLocale(),
    platform: 'B Web',
    device_name: fingerprint,
  },
});
