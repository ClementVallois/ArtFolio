[![Backend CI](https://github.com/ClementVallois/ArtFolio/actions/workflows/backend-ci.yml/badge.svg?branch=main)](https://github.com/ClementVallois/ArtFolio/actions/workflows/backend-ci.yml)

# ArtFolio Backend

REST API for ArtFolio, a social platform where artists showcase their work and connect with their community. Built with NestJS, Fastify, TypeScript, and PostgreSQL.

## Why these choices

**DDD architecture** because the domain has real business rules (artist profiles, content moderation, GDPR data requests) that benefit from explicit modeling. Entities, value objects, and use cases live in their own layers, separated from infrastructure.

**Fastify over Express** for better performance on file uploads (profile pictures, post images) and lower overhead on JSON serialization. NestJS abstracts the adapter, so switching back would be trivial.

**Auth0 over hand-rolled auth** because authentication is not a differentiator for this project. Auth0 handles token issuance, JWKS rotation, and scope management. The backend validates JWTs and enforces permissions through NestJS guards.

## Architecture

```
Request → Controller → UseCase → Repository Interface → TypeORM Repository → PostgreSQL
                         ↓
                   Domain Entity
                   Value Object
```

```
src/
├── domain/           # Entities, value objects, repository interfaces (no dependencies)
├── application/      # Use cases, validators, file handlers (depends on domain only)
├── infrastructure/   # TypeORM repos, Auth0 config, database, logger (implements domain interfaces)
└── presentation/     # Controllers, DTOs, Swagger config (calls application layer)
```

The domain layer has zero imports from NestJS or TypeORM. Infrastructure implements the repository interfaces defined in the domain. Controllers never touch repositories directly.

## Quick start

```bash
# With Docker Compose (from project root)
docker compose up -d

# Or manually
cp .env.example .env          # fill in your Auth0 + DB credentials
npm install
npm run typeorm:run-migrations
npm run seed                  # optional: load sample data
npm run start:dev             # http://localhost:3000
```

The root URL (`/`) redirects to Swagger at `/api`.

## Tests

25 unit tests covering the core use cases:

```bash
npm test              # run all tests
npm run test:watch    # watch mode
npm run test:cov      # coverage report
npm run test:e2e      # end-to-end
```

Tested use cases: `createArtist`, `getAllArtists`, `getPostById`, `getUserById`, `getUserByAuth0Id`, `getUserDataRequests`.

## Stack

| Layer            | Technology                                              |
| ---------------- | ------------------------------------------------------- |
| Framework        | NestJS 10 + Fastify                                     |
| Language         | TypeScript (strict)                                     |
| Database         | PostgreSQL 16, TypeORM, snake_case naming strategy      |
| Auth             | Auth0 (passport-jwt, jwks-rsa), permission guards       |
| Validation       | class-validator, class-transformer, Joi                 |
| Security         | Helmet, CSRF, CORS, rate limiting (throttler)           |
| File upload      | @fastify/multipart, MIME filtering, 10MB limit          |
| Documentation    | Swagger / OpenAPI (auto-generated)                      |
| CI               | GitHub Actions (lint → test → build)                    |
| Containerization | Docker Compose (backend + 2 frontends + DB + SonarQube) |

## API overview

All mutating routes require a valid JWT and appropriate scopes (`create:artist`, `update:post`, `delete:*`, etc.). Read routes for public content are open.

| Resource               | Endpoints                               |
| ---------------------- | --------------------------------------- |
| Artists                | CRUD + pinned posts, categories, assets |
| Amateurs               | CRUD + profile picture upload           |
| Posts                  | CRUD + post picture upload              |
| Categories             | CRUD                                    |
| Personal data requests | CRUD + download (GDPR compliance)       |

Full endpoint list available at `/api` (Swagger UI) when the server is running.

## Security

- **CORS**: whitelisted origins only, credentials enabled
- **Helmet**: CSP, frameguard, referrer policy
- **CSRF**: session-based tokens, httpOnly cookies, SameSite=lax, secure in production
- **Validation**: whitelist mode, forbidNonWhitelisted, transforms enabled, returns 422
- **Auth**: JWT validation via JWKS endpoint, permission-based guards on every protected route

## Database

```bash
npm run typeorm:run-migrations          # apply migrations
npm run typeorm:revert-migration        # rollback last migration
npm run typeorm:generate-migration --name=<Name>  # generate from entity diff
```

Config: `src/infrastructure/database/ormconfig.ts`

## Configuration

See `.env.example` for all required variables. Key groups:

- `BACKEND_API_SERVER_PORT`, `NODE_ENV`, `SESSION_SECRET`
- `DB_API_*` (PostgreSQL connection)
- `AUTH0_ISSUER_URL`, `AUTH0_AUDIENCE` (JWT validation)
- `DEV_*_ASSETS_LOCATION` (file upload paths)

## Logging

Daily rotating log files in `LOG_DIRECTORY`. A global interceptor logs every request with method, URL, and response time.

## Author

Clément Vallois — [GitHub](https://github.com/ClementVallois)
