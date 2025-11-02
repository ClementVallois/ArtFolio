# ArtFolio Backend

API REST du backend ArtFolio, construit avec **NestJS**, **Fastify** et **TypeScript**, suivant une architecture **DDD** pour gérer utilisateurs, contenus et demandes de données personnelles RGPD.

---

## Stack

* **Framework:** NestJS + Fastify
* **Langage:** TypeScript
* **Base de données:** PostgreSQL via TypeORM avec SnakeNamingStrategy
* **Authentification:** JWT (passport-jwt, jwks-rsa) et guards de permissions
* **Documentation:** Swagger/OpenAPI, redirection de `/` vers `/api`
* **Sécurité:** Helmet, CORS, sessions + CSRF, ValidationPipe stricte
* **Upload:** Multipart avec filtrage MIME et limite 10MB

---

## Structure

```
backend-api/
├─ assets/                  # posts_pictures, profile_pictures, photo_seed
├─ scripts/                 # seed.command.ts (nest-commander)
├─ src/
│  ├─ application/          # use-cases par domaine, handlers fichiers, validators
│  ├─ domain/               # entities, value-objects, interfaces de repositories
│  ├─ infrastructure/       # DB config + migrations, logger, file services, security
│  └─ presentation/         # controllers, DTOs, decorators, swagger
```

Cette organisation sépare clairement **métier**, **infrastructure** et **présentation** selon les principes DDD pour une meilleure maintenabilité.

---

## Installation

```bash
npm install
```

Les scripts clés (`start`, `start:dev`, `test`, `test:e2e`, `test:cov`) et les commandes TypeORM pour migrations sont disponibles dans `package.json`.

---

## Configuration (.env)

```env
# Application
NODE_ENV=development
BACKEND_API_SERVER_PORT=3000
SESSION_SECRET=your-session-secret
LOG_DIRECTORY=./logs

# Database
DB_API_PORT=5432
DB_API_NAME=artfolio
DB_API_USER=your_username
DB_API_PASSWORD=your_password
SYNCHRONIZE_ENABLED=false
LOGGING_ENABLED=false

# Auth0 (JWT)
AUTH0_ISSUER_URL=https://your-domain.auth0.com/
AUTH0_AUDIENCE=your-api-audience

# Assets (dev)
DEV_POST_ASSETS_LOCATION=./backend-api/assets/posts_pictures
DEV_PROFILE_ASSETS_LOCATION=./backend-api/assets/profile_pictures
```

Le datasource TypeORM lit ces variables, applique la stratégie **snake_case**, charge les entités sous `src/domain/*.entity` et les migrations sous `src/infrastructure/database/migrations`.

---

## Démarrage

```bash
# Dev (watch, 0.0.0.0:3000 par défaut)
npm run start:dev
```

Au boot, l’app configure **CORS**, **Helmet**, **multipart**, **sessions + CSRF**, **ValidationPipe**, installe **Swagger** via `SWAGGER_CONFIG`, redirige `/` vers `/api` et écoute sur `BACKEND_API_SERVER_PORT` (par défaut 3000).

---

## CORS et sécurité

* **CORS:** origines autorisées `https://artfolio.dev`, `https://www.artfolio.dev`, `https://admin.artfolio.dev`, `http://localhost:5174` et `:5180` avec credentials et en-têtes `Content-Type`, `Authorization`, `x-csrf-token`.
* **Helmet:** `frameguard sameorigin`, `referrerPolicy same-origin`, CSP activé, CORP `cross-origin`, COOP `same-origin-allow-popups`.
* **Sessions + CSRF:** cookies `httpOnly`, `SameSite=lax`, `secure` si `NODE_ENV=production`, token CSRF activé.
* **Validation:** `transform`, `whitelist`, `forbidNonWhitelisted`, code 422, `stopAtFirstError=false`.

---

## Endpoints clés

* **Artistes:**
  `GET /artists`, `GET /artists/withPinnedPost`, `GET /artists/:id`, `GET /artists/:id/posts`, `GET /artists/:id/categories`, `GET /artists/:id/assets`, `POST /artists`, `PATCH /artists/:id`, `DELETE /artists/:id`, `DELETE /artists/me/:id` (guards + scopes)

* **Amateurs:**
  `GET /amateurs`, `GET /amateurs/:id`, `GET /amateurs/:id/assets`, `POST /amateurs`, `PATCH /amateurs/:id`, `DELETE /amateurs/:id` (upload profilePicture)

* **Posts:**
  `GET /posts`, `GET /posts/:id`, `GET /posts/:id/assets`, `POST /posts`, `PATCH /posts/:id`, `DELETE /posts/:id` (upload postPicture)

* **Catégories:**
  `GET /categories`, `GET /categories/:id`, `POST /categories`, `PATCH /categories/:id`, `DELETE /categories/:id`

* **Données personnelles:**
  `GET /personal-data-requests`, `GET /personal-data-requests/requested`, `GET /personal-data-requests/:id`, `POST /personal-data-requests`, `PATCH /personal-data-requests/:id`, `GET /personal-data-requests/download/:id`

---

## Auth et permissions

Routes protégées avec `AuthGuard('jwt')` et `PermissionsGuard` utilisant des scopes tels que `read:all`, `read:allArtist`, `read:posts`, `create:artist`, `create:amateur`, `create:post`, `update:*`, `delete:*` selon le domaine.

---

## Upload et assets

* Interceptor **multipart** avec filtre MIME (`image/png`, `image/jpeg`, `image/webp`) et limite 10MB par champ.
* Sauvegarde sur `DEV_PROFILE_ASSETS_LOCATION` ou `DEV_POST_ASSETS_LOCATION`.
* Création/mise à jour des métadonnées d’**Asset**.
* Streaming via **FastifyReply**.

---

## Base de données et migrations

* **Exécution:** `npm run typeorm:run-migrations`
* **Rollback:** `npm run typeorm:revert-migration` (config: `src/infrastructure/database/ormconfig.ts`)
* **Génération:** `npm run typeorm:generate-migration --name <Nom>`
* **Création:** `npm run typeorm:create-migration --name <Nom>`

---

## Seeding

* **Via conteneur:** `npm run seed` et `npm run clear` exécutent seed et clear via `nest-commander`.
* **En direct:** `npm run console seed seed` ou `npm run console seed clear` pour lancer `SeederService` depuis la machine hôte.

---

## Tests

* **Unitaires:** `npm run test` ou `npm run test:watch`
* **E2E:** `npm run test:e2e`
* **Couverture:** `npm run test:cov`

---

## Logging

* Logger applicatif écrit des fichiers journaux quotidiens dans `LOG_DIRECTORY` selon `NODE_ENV`.
* Interceptor global trace chaque requête avec méthode, URL et temps de réponse.
