# ArtFolio

A social platform for independent artists to showcase their work, built with a production-grade backend architecture following Domain-Driven Design and Clean Architecture principles.

![Demo Artfolio](demo_artfolio-main.gif)

---

## What Is ArtFolio

ArtFolio is a social network for artists of all disciplines to share their creative work, process, and activity with art enthusiasts. Users can discover new artists, follow their work, and engage with the community.

**Core features:**
- Customizable artist/amateur profiles with portfolio display
- Content sharing (images with metadata, categories, pinned posts)
- Community engagement (likes, comments, follows)
- Discovery tools (search by artist, category filtering)
- GDPR-compliant personal data export and deletion requests
- Admin interface for content moderation

---

## Architecture & Technical Decisions

### Backend (NestJS + Fastify + TypeScript)

The backend is the technical core of this project -- a production-ready REST API demonstrating enterprise-level engineering:

| Area | Implementation |
|------|---------------|
| **Architecture** | Domain-Driven Design with 4-layer Clean Architecture (Domain, Application, Infrastructure, Presentation) |
| **Auth** | Auth0 with RS256 JWT, JWKS auto-rotation, RBAC via custom PermissionsGuard |
| **Security** | Helmet (CSP, CORP, COOP), CORS whitelist, CSRF tokens, secure sessions, input sanitization |
| **Rate Limiting** | Global ThrottlerGuard on all endpoints |
| **Database** | PostgreSQL with TypeORM, UUID PKs, soft deletes, SnakeNamingStrategy, versioned migrations |
| **Stored Procedures** | PL/pgSQL functions for GDPR data export + audit triggers with JSONB history |
| **Transactions** | Multi-step atomic operations with automatic rollback and file cleanup |
| **Value Objects** | Typed ID wrappers (UserId, PostId, etc.) with UUID validation -- compile-time + runtime safety |
| **Validation** | Global ValidationPipe (whitelist, forbidNonWhitelisted, transform) + class-validator DTOs |
| **Error Handling** | PostgreSQL error code parsing, structured HTTP responses, contextual error messages |
| **Logging** | Custom file-based logger with 7 severity levels, daily rotation, HTTP interceptor, @LogMethod decorator |
| **Caching** | Cache-aside pattern with TTL-based in-memory caching |
| **File Uploads** | Fastify multipart, MIME filtering, 10MB limit, streaming responses, transactional cleanup |
| **Testing** | Unit tests (mocked use cases), integration tests (module wiring), E2E tests (full HTTP lifecycle) |
| **Seeding** | CLI-driven via nest-commander, Faker.js data generation, idempotent execution |
| **API Docs** | Auto-generated Swagger/OpenAPI at /api |
| **Env Safety** | Joi schema validation at boot -- app refuses to start on misconfiguration |

> See [backend-api/README.md](backend-api/README.md) for detailed architecture documentation, code examples, and design rationale.

### Frontends (Vue.js)

- **Main app**: Responsive SPA for artists and art enthusiasts
- **Admin panel**: Content moderation and community management interface

### Infrastructure

- **Database**: PostgreSQL with migrations, stored procedures, and triggers
- **Deployment**: Docker containerization on AWS EC2
- **Auth Provider**: Auth0 (delegated identity management)

---

## Project Structure

```
ArtFolio/
├── backend-api/          # NestJS REST API (DDD + Clean Architecture)
│   ├── src/
│   │   ├── domain/       # Entities, value objects, repository interfaces
│   │   ├── application/  # Use cases, validators, handlers
│   │   ├── infrastructure/ # DB, auth, logging, file services, error handling
│   │   └── presentation/ # Controllers, DTOs, guards, decorators, Swagger
│   └── test/             # E2E tests
├── frontend-main/        # Vue.js main application
└── frontend-admin/       # Vue.js admin panel
```

---

## Getting Started

```bash
# Backend
cd backend-api
npm install
npm run start:dev            # Starts on port 3000

# Database
npm run typeorm:run-migrations
npm run console seed seed    # Populate with test data

# Tests
npm run test                 # Unit tests
npm run test:e2e             # End-to-end tests
npm run test:cov             # Coverage report
```

---

## Key Technical Highlights

- **Zero-dependency domain layer** -- business logic is framework-agnostic and fully unit-testable
- **Repository pattern with interface segregation** -- 8 repository interfaces in domain, concrete implementations in infrastructure
- **Decorator-based RBAC** -- `@Permissions('create:artist')` + guard reads token scopes via Reflector
- **Transactional consistency** -- artist creation spans 6 DB operations in a single atomic transaction with file rollback
- **Audit trail** -- PostgreSQL trigger logs every user mutation as JSONB diffs in `users_history`
- **GDPR compliance** -- stored procedure aggregates all user data for portable export/deletion
- **Fail-fast configuration** -- Joi validates env vars at boot, not at first request
