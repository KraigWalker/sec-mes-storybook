import { getAuthCookie } from 'web-lib-application-essentials/lib/cookie';
import { oauthService } from '@virginmoney/api-connector-lib';
import { validateAuthToken } from 'web-lib-application-essentials/lib/jwtUtil';
import { DEV_API_CONNECTOR_URL } from '../constants/devConstants';

export const isMobileToWebJourney = ({ exchangeToken }) =>
  exchangeToken ? true : false;

export const getPublicKey = async (
  { bank_id, user_tracking_id },
  paasApiUrl
) => {
  const publicKeyResp = await oauthService.getPublicKey(
    paasApiUrl,
    bank_id.toUpperCase(),
    user_tracking_id
  );
  return publicKeyResp && publicKeyResp.public_key;
};

export const getShortTermToken = async (
  { bank_id, user_tracking_id, access_token },
  paasApiUrl
) => {
  const body = 'grant_type=client_credentials&scope=30';
  const shortTermTokenResp = await oauthService.shortTermAccessToken(
    paasApiUrl,
    bank_id.toUpperCase(),
    body,
    access_token,
    user_tracking_id
  );
  return shortTermTokenResp && shortTermTokenResp.access_token;
};

export const getExchangeToken = async (
  { bank_id, user_tracking_id },
  paasApiUrl,
  shortToken
) => {
  const body = 'grant_type=client_credentials&scope=30';
  const exchangeToken = await oauthService.exchangeOAuthJWTToken(
    paasApiUrl,
    bank_id.toUpperCase(),
    body,
    shortToken,
    user_tracking_id
  );
  return exchangeToken;
};

export const getDecodedJWTToken = (jwtToken, publicKey) => {
  const decodedAuthToken = validateAuthToken(jwtToken, publicKey);
  return !decodedAuthToken.error ? decodedAuthToken.jti : null;
};

export const getAccessTokenFromJWT = async (hashParams, config) => {
  let paasApiUrl = config.paasBaseApiUrl;
  if (process.env.NODE_ENV !== 'production') {
    paasApiUrl = DEV_API_CONNECTOR_URL;
  }

  let jwtToken = null;
  // check if exchangeToken is present in hash param;
  // For web-to-web it will not be present but for mobile to web it will be
  if (isMobileToWebJourney(hashParams)) {
    let shortTermToken = hashParams.exchangeToken;
    if (process.env.NODE_ENV !== 'production') {
      shortTermToken = await getShortTermToken(hashParams, paasApiUrl);
    }
    // Integrate the exchange token API based on short term token
    jwtToken = await getExchangeToken(hashParams, paasApiUrl, shortTermToken);
  } else {
    jwtToken = getAuthCookie();
  }
  // Integrate the public key API
  const publicKey = await getPublicKey(hashParams, paasApiUrl);
  // Integrate the verify token method
  return getDecodedJWTToken(jwtToken, publicKey);
};
