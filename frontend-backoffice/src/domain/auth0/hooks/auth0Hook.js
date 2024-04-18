import { useAuth0 } from '@auth0/auth0-vue';
const { isAuthenticated } = useAuth0();

export function requireAuth(to, from, next) {
    // Check if the route requires authentication
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // Check if user is authenticated, you can implement this logic using Auth0 or any other authentication mechanism
      console.log(isAuthenticated)  
      if (!isAuthenticated) {
            // Redirect to sign-in page
            next('/signin');
        } else {
            // Continue to the route
            next();
        }
    } else {
        // For routes that don't require authentication, continue to the route
        next();
    }
}