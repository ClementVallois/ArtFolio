import { createAuth0 } from '@auth0/auth0-vue';
import Auth0Config from './config/Auth0Config';

// Create and configure the Auth0 instance
//TODO: modify with the ENV
export const auth0 = createAuth0({
    authRequired: true,
    domain: Auth0Config.domain,
    clientId: Auth0Config.clientId,
    authorizationParams: {
        redirect_uri: Auth0Config.redirectUri,
        audience: Auth0Config.audience,
    }
});



