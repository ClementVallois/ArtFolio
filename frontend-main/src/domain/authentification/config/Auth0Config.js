
//TODO: configuration with .env
const domain = process.env.AUTH0_DOMAIN || 'dev-03ri6j5f0csn4op2.eu.auth0.com';
const clientId = process.env.AUTH0_CLIENT_ID || 'ieBwYy0pcin37qCdWHuW24QT4kGCgB2X';
const audience = process.env.AUDIENCE || 'http://localhost:3000';
const redirectUri = `${window.location.origin}/callback`;
const logoutUri = `${window.location.origin}/`;

export default {
    domain,
    clientId,
    audience,
    redirectUri,
    logoutUri
};

