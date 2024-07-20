# Fonctionnement de l'authentification 🔐

## ⚙️ Initialisation 
L'authentification se fait grace à la librairie `@auth0/auth0-vue`
Cette librairie est instanciée dans mon fichier `main.js` mon point d'entrée de la SPA. 

```js
import { auth0 } from './domain/authentification'

app.use(auth0)
```

La configuration est réalisé dans `domain/authentication/index`
```js
// Create and configure the Auth0 instance
export const auth0 = createAuth0({
    authRequired: true,
    domain: Auth0Config.domain,
    clientId: Auth0Config.clientId,
    authorizationParams: {
        redirect_uri: Auth0Config.redirectUri,
        audience: Auth0Config.audience,
    }
});
```

Les paramètres sont dans `Auth0Config.js`
```js
const domain = import.meta.env.AUTH0_DOMAIN || 'dev-03ri6j5f0csn4op2.eu.auth0.com';
const clientId = import.meta.env.AUTH0_CLIENT_ID || 'ieBwYy0pcin37qCdWHuW24QT4kGCgB2X';
const audience = import.meta.env.AUDIENCE || 'http://localhost:3000';
const redirectUri = `${window.location.origin}/callback`;
const logoutUri = `${window.location.origin}/`;

export default {
    domain,
    clientId,
    audience,
    redirectUri,
    logoutUri
};
```

On vient implémenter les paramètres de notre application (client, domain, audience (=api), redirectURI) pour que Auth0 sache à quelle application se connecter pour rechercher la base d'utilisateurs correspondante.

------------

✅ Ces paramètres permettent : 
- d'accéder au système de connexion
- récupérer les informations du user connecté à travers un objet `user` disponible en important l'instance de Auth0 : 

```js 
const { error, isAuthenticated, isLoading, user} = useAuth0();
```
- créer un token avec les permissions du user déclarées sur Auth0

----------------------------

❌ Ces paramètres ne permettent pas : 
- connaître le rôle d'un utilisateur
- modifier les rôles et permission du user
- supprimer un user
- modifier le user

Pour réaliser ces dernières opérations deux choix s'offrent à nous 
- Soit on le fait sur la plateforme de Auth0 (pas très pratique, on aimerait que tout ça soit automatisé quand même)
- Soit Auth0 nous met à disposition une API qui nous permet de gérer nos users sur notre propre appli. C'est le **Auth0 Management API**

💡 C'est pourquoi il y a un deuxième fichier de configuration `Auth0ManagementAPIConfig.js`

 On va l'utiliser pour définir les rôles du user à l'inscription notamment mais aussi pour récupérer le rôle d'une personne qui n'aurait pas terminé son inscription. 


## 🏁 Mise en route

### 🔄 Connexion d'un utilisateur déjà existant 

1. Click sur Connexion dans la NavBar
    
    a. Appel de la fonction loginApp()

    ```js
    const { loginWithRedirect } = useAuth0()
    
    //Connect to Auth0 
        const loginApp = async () => {
            try{
                await loginWithRedirect()
            } catch (error) {
                console.error('error loggin in :', error)
            }
        }
    ```
    
    b. Redirection sur la page de connexion Auth0

2. Redirection sur notre page CallBackPage

    a. Vérification que le user existe dans le back sinon demande de création de profil en redirigeant vers la bonne page. Pour cela il faut savoir s'il s'est inscrit en tant qu'amateur ou artiste donc il faut récupérer son rôle dans Auth0. 

    ```js
        const { error, isAuthenticated, isLoading, user} = useAuth0();
        
        onMounted(() => {
            //Wait a bit auth0 instance get generated
            setTimeout(async() => {
                if(!isLoading.value && isAuthenticated.value){
                    try{
                        //Get user from database and store it in User Domain. 
                        await globalStore.storeProfileFromAuth0Id(user.value.sub)
                        loading.value=false
                        router.push('/')
                    } catch (error) {
                        // User is not found on our database
                        console.log(error)
                        if(error.status == 404){
                            //get role from auth0
                            const role = await authenticationService().getRoleUser(user.value.sub)
                            //According to role Artist or User redirect to correct page
                            if (role[0].name == 'Artist'){
                                loading.value=false
                                router.push('/registration-artist')
                            } else {
                                loading.value=false
                                router.push('/registration-user')
                            }
                        }
                    } 
                }
            }, 1000)    
        })
    ```
    b. On enregistre ensuite le profil de la personne dans une variable 'profile' dans le GlobalStore

    c. redirection sur page d'accueil 

3. Mise à jour de la NavBar 

Dans mon fichier App.vue on a une condition dans la NavBar qui teste le rôle de notre variable profile si elle n'est pas nulle. 


```js
<NavArtistComponent v-if="globalStore.profile?.role === 'artist'" />
<NavUserComponent v-else-if="globalStore.profile?.role === 'amateur'" />
<NavComponent v-else />
```

Lorsque ma variable est modifiée dans mon store, étant donné que c'est une variable définie comme réactive `const profile = ref(null)` et que nous travaillons en composition et non en option, Vue détecte de lui même le changement dans la variable et rerend le composant. D'où la modification de la NavBar de elle-même après authentification.


### 👤 Inscription d'une nouvelle personne 

Le principe d'inscription est assez similaire sur Auth0 que ce soit un artiste ou un amateur. Seule 2 choses sont à prendre en compte :
- le rôle attribué ne sera pas le même
- la page de redirection ne sera pas la même puisqu'un artiste doit ensuite poster sa première publication. 


| Parcours | Amateur | Artiste |
| -------- | ------- | ------- |
| 1. La personne s'inscrit en tant qu' | amateur | artiste | 
| 2. La personne est redirigée vers | /preregistration-user | /preregistration-artist |
| Le nom du composant associé est | UserPreRegistrationPage | ArtistPreRegistrationPage |
| 3. La personne créé un Auth0 account puis est redirigée vers : | /registration-user | /registration-artist
| 4. On assigne le rôle dans Auth0. Un `watch` est appliqué sur `isAuthenticated.value == true`. On appelle alors la méthode : | authenticationService().assignUserRole(user.value.sub, 'User') | authenticationService().assignUserRole(user.value.sub, 'Artist')


Dans le service authenticationService on appelle notre Management API : 

```js
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
```

## 🪲 Beug possibles

1. **CallBackPage reste bloquée sur le loader**

    ➡️ Cela signifie que la personne n'a pas les droits ou qu'elle n'a pas de correspondance dans le backend

2. **La NavBar ne se charge pas bien après ma connexion** 

    ➡️ Le profil s'est mal enregistré dans la variable profile de mon `GlobalStore` 

3. **Je n'arrive pas à accéder aux catégories ou mes calls API ne fonctionne pas bien** 

    ➡️ Le role a été mal attribué dans Auth0 et donc le token associé n'a pas les permissions nécessaires pour l'envoi de données depuis mon back. 






