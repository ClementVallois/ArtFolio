
//TODO: configuration with .env
const domain = 'dev-03ri6j5f0csn4op2.eu.auth0.com';
const clientId = '4yQWg80gQkTcPAi71h0HnChAqfCgqKAm';
const audience = 'http://localhost:3000';
const redirectUri = `${window.location.origin}/callback`;
const logoutUri = `${window.location.origin}/`;

export default {
    domain,
    clientId,
    audience,
    redirectUri,
    logoutUri
};

