import { userApi } from "../api/UserRemoteDataSource";
import User from "@/model/UserModel";


function userService() {

    async function getAllUsers() {
        try {
            const response = await userApi().getAllUsers();
            if (Array.isArray(response)) {
                const usersAll = response.map(jsonUser => User.fromJson(jsonUser))
                return usersAll;
            } else {
                console.error("La réponse n'est pas un tableau d'objets JSON :", response);
                throw new Error("La réponse n'est pas un tableau d'objets JSON :")
            }
        } catch (error) {
            console.log(error);
            console.error("Erreur lors de la récupération des artistes:", error);
        }
    }

    return {
        getAllUsers,
    }
}

export { userService }