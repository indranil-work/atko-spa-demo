export const oktaConfig = {
  clientId: '0oalwfppn1P0REzEx1d7', // Replace with your Okta client ID
  issuer: 'https://login.twisec.com/oauth2/default', // Replace with your Okta domain
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true
}; 