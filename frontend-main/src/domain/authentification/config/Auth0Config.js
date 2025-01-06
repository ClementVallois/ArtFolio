
const domain = import.meta.env.VITE_AUTH0_DOMAIN || 'dev-03ri6j5f0csn4op2.eu.auth0.com';
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID || 'ieBwYy0pcin37qCdWHuW24QT4kGCgB2X';
const audience = import.meta.env.VITE_AUTH0_AUDIENCE || 'http://localhost:3000';
const redirectUri = `${window.location.origin}/callback`;
const logoutUri = import.meta.env.VITE_AUTH0_LOGOUT || `${window.location.origin}/`;

export default {
    domain,
    clientId,
    audience,
    redirectUri,
    logoutUri
};

