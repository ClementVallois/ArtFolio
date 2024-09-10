import { useGlobalStore } from '@/stores/GlobalStore';
import { getAccessTokenManagementAPI } from '../api/Auth0ManagementAPI'
import auth0ManagementApi from '../api/Auth0ManagementAPI'

function auth0Service() {

    const storeGlobal=useGlobalStore()

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
        try {
            const accessToken = await getAccessTokenManagementAPI();
            auth0ManagementApi.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
            const response = await auth0ManagementApi.delete(`/users/${auth0Id}`)
            return response
        } catch (error) {
            storeGlobal.logError(error, 6)
            throw error
        }
    }

    return {
        getRoleUser,
        deleteUser
    }
}

export { auth0Service }