import { getAccessTokenManagementAPI } from '../api/Auth0ManagementAPI'
import auth0ManagementApi from '../api/Auth0ManagementAPI'

function authenticationService() {

    //Roles: Admin, Artist, Moderator, User
    async function assignUserRole(auth0Id, role) {
        try {
            const token = await getAccessTokenManagementAPI();
            const roleId = await getRoleID(token, role)
            auth0ManagementApi.defaults.headers.common['Authorization'] = `Bearer ${token}`
            auth0ManagementApi.post(`/roles/${roleId}/users`, {  "users": [auth0Id] })
        } catch (error) {
            console.log(error);
            console.error("Erreur lors de l'affectation des roles':", error);
        }
    }

    async function getRoleID(accessToken, roleName) {
        try {
            auth0ManagementApi.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
            const response = await auth0ManagementApi.get('/roles')
            const roles = response.data
            console.log(roles)
            const role = roles.find(role => role.name === roleName);
        
            if (role) {
                console.log(`ID of the role '${roleName}': ${role.id}`);
                return(role.id)
            } else {
                console.log(`Role '${roleName}' not found.`);
            }
            } catch (error) {
            console.error('Error fetching roles:', error);
            }
        };





    return {
        assignUserRole
    }

}

export { authenticationService }