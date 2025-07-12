export const oktaConfig = {
  clientId: '0oao3b136ryPcxHRL1d7', // Replace with your Okta client ID
  issuer: 'https://usaa-b2b-trial.oktapreview.com/oauth2/default', // Replace with your Okta domain
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true
}; 