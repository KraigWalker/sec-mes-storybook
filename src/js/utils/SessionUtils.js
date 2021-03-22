import { getAccessTokenFromJWT } from './OAuthUtils';
import { buildClientContext } from './ContextUtils';

export async function getSessionDetails(config) {
  const hash = window.customHashParam;
  const accessTokenFromJWT = await getAccessTokenFromJWT(hash, config);
  // clear hash parameters
  window.customHashParam = null;

  const {
    user_tracking_id,
    bank_id,
    brandId,
    state,
    client_context,
    isDocumentLibraryEnabled,
    access_token = null,
  } = hash;
  // set token into in web app store
  const session = {
    access_token: accessTokenFromJWT ? accessTokenFromJWT : access_token,
    bank_id: bank_id ? bank_id.toUpperCase() : 'CB',
    brand: brandId ? brandId.toUpperCase() : 'VM',
    state,
  };
  const clientContext = buildClientContext(
    decodeURIComponent(client_context),
    user_tracking_id,
    state
  );

  const isDocumentLibraryEnabledFinal = isDocumentLibraryEnabled === 'true';

  const normalisedBrandId = {
    CB: 'CB',
    YB: 'YB',
    DYB: 'B',
    VM: 'VM',
  }[session.brand];

  return {
    session,
    clientContext,
    isDocumentLibraryEnabledFinal,
    normalisedBrandId,
  };
}
