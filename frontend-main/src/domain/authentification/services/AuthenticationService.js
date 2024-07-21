import { CRUDapi } from '@/api/CrudApi';
import { getAccessTokenManagementAPI } from '../api/Auth0ManagementAPI'
import auth0ManagementApi from '../api/Auth0ManagementAPI'
import { useGlobalStore } from '@/store/GlobalStore';
import { useAuthenticationPersistStore } from '../store/AuthenticationPersistStore';

function authenticationService() {

    const storeGlobal=useGlobalStore()

    //Roles: Admin, Artist, Moderator, User
    async function assignUserRole(auth0Id, role) {
        try {
            const token = await getAccessTokenManagementAPI();
            const roleId = await getRoleID(token, role)
            auth0ManagementApi.defaults.headers.common['Authorization'] = `Bearer ${token}`
            auth0ManagementApi.post(`/roles/${roleId}/users`, {  "users": [auth0Id] })
        } catch (error) {
            storeGlobal.logError(error, 6);
        }
    }

    async function getRoleID(accessToken, roleName) {
        try {
            auth0ManagementApi.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
            const response = await auth0ManagementApi.get('/roles')
            const roles = response.data
            const role = roles.find(role => role.name === roleName);
        
            if (role) {
                return(role.id)
            } else {
                storeGlobal.logError(`Role '${roleName}' not found.`, 6);
            }
            } catch (error) {
                storeGlobal.logError('Error fetching roles:' + error , 6);
            }
        };

    async function getRoleUser(auth0Id) {
        try {
            const accessToken = await getAccessTokenManagementAPI();
            auth0ManagementApi.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
            const response = await auth0ManagementApi.get(`/users/${auth0Id}/roles`)
            const roles = response.data
            return roles
        } catch (error) {
            storeGlobal.logError(error, 6)
        }
    }

    async function deleteUser(auth0Id) {
        const authenticationPersistStore = useAuthenticationPersistStore()
        try {
            const accessToken = await getAccessTokenManagementAPI();
            auth0ManagementApi.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
            const response = await auth0ManagementApi.delete(`/users/${auth0Id}`)
            authenticationPersistStore.resetProfile()
            console.log(response)
        } catch (error) {
            storeGlobal.logError(error, 6)
        }

    }



    return {
        assignUserRole,
        getRoleUser,
        deleteUser
    }

}

export { authenticationService }