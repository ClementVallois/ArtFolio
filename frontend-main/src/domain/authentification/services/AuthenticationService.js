import { getAccessTokenManagementAPI } from '../api/Auth0ManagementAPI'


function authenticationService() {

    async function assignUserRole(roles) {
        try {
            console.log('étape 2')
            const token = await getAccessTokenManagementAPI();
            console.log('token', token)
        } catch (error) {
            console.log(error);
            console.error("Erreur lors de l'affectation des roles':", error);
        }
    }

    return {
        assignUserRole
    }

}

export { authenticationService }