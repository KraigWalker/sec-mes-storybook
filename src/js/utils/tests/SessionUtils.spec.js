import { getSessionDetails } from '../SessionUtils';
import { parseUrlParams } from '../GeneralUtils';
const config = {
  libertyBaseApiUrl: 'http://localhost:8888/ibapi/v2',
  paasBaseApiUrl: 'http://localhost:8888/ibapi/v2',
};
jest.mock('web-lib-application-essentials/lib/jwtUtil', () => ({
  validateAuthToken: () => ({
    aud: 'https://secure.cb.com',
    capabilities: 'RESETCREDS',
    client_id: 'aa1a9e30-f981-11ea-991d-4ba7b80f4cb4',
    context: 'USER',
    created_at: 'Mon Nov 23 23:22:56 GMT 2020',
    iat: 1606173776,
    iss: 'https://secure.cb.com',
    jti: 'fa799ed3-1a94-4756-bb0b-31cbf8b58f75',
    oauth_scope: 'RESETCREDS',
    scope: 30,
    token_type: 'Bearer',
    user_id: '1097591226',
  }),
}));
jest.mock('@virginmoney/api-connector-lib', () => ({
  oauthService: {
    exchangeOAuthJWTToken: () =>
      new Promise((resolve) =>
        resolve(
          'eyJhbGciOiJIUzI1NiIsImtpZCI6IjEyMzQ1IiwidHlwIjoiSldUIn0.eyJqdGkiOiJNVFEwTmpKa1ptUTVPVE0yTkRFMVpUWmpOR1ptWmpJMyIsImlhdCI6MTUzNjgzNDk4NywiaXNzIjoiaHR0cHM6Ly9zZWN1cmUuY2IuY29tIiwiYXVkIjoiaHR0cHM6Ly9zZWN1cmUuY2IuY29tIiwiY2xpZW50X2lkIjoiZDBlNzdjMTQtMWVjMi00Y2E0LWJiMzgtMGMzNDdkMDk5MzliIiwidG9rZW5fdHlwZSI6IkJhc2ljIiwic2NvcGUiOiIyMCIsImNyZWF0ZWRfYXQiOiJUdWUgT2N0IDIwIDA5OjQ2OjU0IEJTVCAyMDIwIiwib2F1dGhfc2NvcGUiOiJyZXNldGNyZWRzIn0.sZSUzfRSyYtqdkrOAY3YIU7MOA8y3n8mwJUicvGAwNY'
        )
      ),
    shortTermAccessToken: () =>
      new Promise((resolve) =>
        resolve({
          type: 'Bearer',
          created_at: '2020-11-23 22:29:14.497',
          access_token: '9fe1085a-c7d5-4cc7-86a3-fd0d54dce027',
          user_identity: { user_id: '1097591226' },
          scope: 30,
          context: 'USER',
          oauth_scope: 'RESETCREDS',
        })
      ),
    getPublicKey: () =>
      new Promise((resolve) =>
        resolve({
          public_key: '12345678',
        })
      ),
  },
}));

describe('Session Utils Check for for mobile to Web journey', () => {
  const { location } = window;
  beforeAll(() => {
    const testUrl = new URL(
      'http://someurl.com/securemessages/cb/#bank_id=yb&client_context=YB%20Web&user_tracking_id=501c6c03-6541-44f8-9503-70ec2825266f&brandId=vm&state=state&isDocumentLibraryEnabled=true&exchangeToken=df1b2109-13dc-423d-9625-7f7dee92984e'
    );

    delete window.location;
    window.location = testUrl;
    window.customHashParam = parseUrlParams(testUrl.hash.substring(1));
  });

  afterAll(() => {
    window.location = location;
    window.customHashParam = null;
  });
  it(' getSessionDetails provides access_token from exchange token jwt', async () => {
    const config = {
      libertyBaseApiUrl: 'http://localhost:8888/ibapi/v2',
      paasBaseApiUrl: 'http://localhost:8888/ibapi/v2',
    };
    expect(window.customHashParam.exchangeToken).toEqual(
      'df1b2109-13dc-423d-9625-7f7dee92984e'
    );
    expect(window.customHashParam.access_token).not.toBeDefined();
    const sessionDetails = await getSessionDetails(config);
    expect(sessionDetails.session.access_token).toEqual(
      'fa799ed3-1a94-4756-bb0b-31cbf8b58f75'
    );
    expect(sessionDetails.session.bank_id).toEqual('YB');
    expect(sessionDetails.session.brand).toEqual('VM');
    expect(sessionDetails.session.state).toEqual('state');
  });
});
describe('Session Utils Check for for Web to Web journey', () => {
  const { location } = window;
  beforeAll(() => {
    const testUrl = new URL(
      'http://someurl.com/securemessages/cb/#bank_id=yb&client_context=YB%20Web&user_tracking_id=501c6c03-6541-44f8-9503-70ec2825266f&brandId=vm&state=state&isDocumentLibraryEnabled=true'
    );

    delete window.location;
    window.location = testUrl;
    window.customHashParam = parseUrlParams(testUrl.hash.substring(1));
    document.cookie =
      'jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJNVFEwTmpKa1ptUTVPVE0yTkRFMVpUWmpOR1ptWmpJMyIsInNjb3BlIjoib3BlbmlkIGFjY291bnRzIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmUuY2IuY29tIiwiaWF0IjoxNTM2ODM0OTg3LCJzdWIiOiJkMGU3N2MxNC0xZWMyLTRjYTQtYmIzOC0wYzM0N2QwOTkzOWIiLCJhdWQiOiJodHRwczovL3NlY3VyZS5jYi5jb20iLCJleHAiOjI1MzY4MzUyODd9.v_CfWB0kg8hLZeAPLFBzNFb6wqdsenKMTh6iIOl4R34';
  });

  afterAll(() => {
    window.location = location;
    window.customHashParam = null;
  });
  it(' getSessionDetails provides access_token from cookie jwt', async () => {
    expect(window.customHashParam.exchangeToken).not.toBeDefined();
    expect(window.customHashParam.access_token).not.toBeDefined();
    const sessionDetails = await getSessionDetails(config);
    expect(sessionDetails.session.access_token).toEqual(
      'fa799ed3-1a94-4756-bb0b-31cbf8b58f75'
    );
    expect(sessionDetails.session.bank_id).toEqual('YB');
    expect(sessionDetails.session.brand).toEqual('VM');
    expect(sessionDetails.session.state).toEqual('state');
  });
});
