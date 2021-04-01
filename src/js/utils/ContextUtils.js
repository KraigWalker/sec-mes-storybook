import BrowserUtils from './BrowserUtils';

export const buildClientContext = (appTitle, userTrackingId, fingerprint) => ({
  client: {
    app_title: appTitle,
    user_tracking_id: userTrackingId,
    client_id: fingerprint,
    app_version_code: navigator.appName,
    app_version_name: '1.0.0',
  },
  env: {
    platform_version: BrowserUtils.getBrowserVersion(),
    make: BrowserUtils.getPlatform(),
    locale: BrowserUtils.getUserLocale(),
    platform: 'B Web',
    device_name: fingerprint,
  },
});
