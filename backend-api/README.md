# ArtFolio Backend API

Production-grade REST API built with **NestJS**, **Fastify**, and **TypeScript**, following **Domain-Driven Design (DDD)** and **Clean Architecture** principles. The system manages users, content, file uploads, and GDPR personal data requests with enterprise-level security, observability, and testing.

---

## Architecture Overview

```
src/
├── domain/                          # Core business layer (framework-agnostic)
│   ├── entities/                    # Business entities (User, Post, Asset, Category, PersonalDataRequest)
│   ├── interfaces/                  # Repository contracts (8 interfaces)
│   └── value-objects/               # Typed identifiers with built-in validation (UserId, ArtistId, PostId, etc.)
│
├── application/                     # Use-case layer (orchestration logic)
│   ├── modules/                     # Feature modules (Artist, Amateur, Post, Category, PersonalDataRequest, User, Asset)
│   │   └── */use-cases/             # Single-responsibility use cases
│   ├── handlers/                    # Cross-domain orchestrators (ProfilePictureHandler)
│   └── validators/                  # Business rule validation (ValidationService)
│
├── infrastructure/                  # Technical concerns (replaceable implementations)
│   ├── database/                    # TypeORM config, migrations, stored procedures
│   ├── repositories/                # Repository implementations (concrete data access)
│   ├── security/                    # JWT strategy, Auth0 integration
│   ├── logger/                      # File-based logging system with levels, interceptors, decorators
│   ├── services/                    # File management, seeding (Faker)
│   ├── errors/                      # Database error parsing & structured error responses
│   ├── config/                      # Joi-based environment validation
│   └── common/                      # Pipes, interceptors, filters, types
│
├── presentation/                    # API surface layer
│   ├── controllers/                 # HTTP controllers (7 controllers)
│   ├── dto/                         # Request/response DTOs with class-validator decorators
│   ├── decorators/                  # @Permissions, @GetUser, @ToBoolean
│   └── swagger/                     # OpenAPI auto-generated documentation
```

**Design decisions:**
- The **Domain layer** has zero external dependencies -- entities, value objects, and repository interfaces are pure TypeScript, making business logic fully testable without a framework
- The **Application layer** depends only on domain interfaces, never on infrastructure -- use cases are injected with abstractions via NestJS DI
- The **Infrastructure layer** implements domain contracts -- swapping PostgreSQL for another DB only requires new repository implementations
- The **Presentation layer** handles HTTP concerns exclusively -- DTOs, validation decorators, guards, and Swagger docs live here

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js + TypeScript (strict mode) |
| Framework | NestJS + Fastify (high-performance HTTP) |
| Database | PostgreSQL via TypeORM (SnakeNamingStrategy) |
| Auth | Auth0 + JWT (RS256, JWKS auto-rotation) |
| Validation | class-validator + class-transformer |
| Docs | Swagger/OpenAPI (auto-generated) |
| Caching | NestJS CacheModule (in-memory, TTL-based) |
| Testing | Jest + @nestjs/testing |
| CLI | nest-commander (seed/clear operations) |

---

## Authentication & Authorization

### Auth0 JWT Integration

```
Client -> Authorization: Bearer <token> -> API
                                            |
                                  ┌─────────┴──────────┐
                                  │ JWT Strategy        │
                                  │ - JWKS endpoint     │
                                  │ - RS256 validation  │
                                  │ - Audience check    │
                                  │ - Issuer check      │
                                  └─────────┬──────────┘
                                            |
                                  ┌─────────┴──────────┐
                                  │ PermissionsGuard    │
                                  │ - Extracts scopes   │
                                  │ - Route matching    │
                                  └────────────────────┘
```

- **JWKS caching and rate limiting** (5 requests/min to Auth0) to avoid upstream bottlenecks
- **RS256 asymmetric algorithm** -- the API never holds signing secrets, only verifies with public keys
- Token payload extraction provides `auth0Id` (sub claim) for user identity resolution

### Role-Based Access Control (RBAC)

Custom `@Permissions()` decorator paired with a `PermissionsGuard` that performs route-level authorization:

```typescript
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Permissions('create:artist', 'update:artist')
@Post()
async createArtist(...) {}
```

Permission scopes include: `read:all`, `read:allArtist`, `read:posts`, `create:artist`, `create:amateur`, `create:post`, `update:artist`, `update:amateur`, `delete:artist`, `delete:me`, etc.

The guard reads metadata set by the decorator via NestJS `Reflector` and validates every required scope is present in the JWT token's `permissions` array.

---

## Rate Limiting

Global throttle protection via `@nestjs/throttler`:

```typescript
ThrottlerModule.forRootAsync({
  useFactory: () => [{ ttl: 1000, limit: 10000 }],
}),
{ provide: APP_GUARD, useClass: ThrottlerGuard }
```

Applied as a global guard -- every endpoint is protected without explicit decoration.

---

## Security Hardening

| Measure | Implementation |
|---------|---------------|
| **CORS** | Strict origin whitelist (no wildcards), credentials enabled, specific allowed headers |
| **Helmet** | CSP, X-Frame-Options (sameorigin), Referrer-Policy (same-origin), CORP (cross-origin), COOP |
| **CSRF** | Token-based protection via `@fastify/csrf-protection`, secure cookies in production |
| **Sessions** | HttpOnly, SameSite=Lax, Secure flag in production, server-side secret |
| **Input validation** | Global ValidationPipe: whitelist, forbidNonWhitelisted, transform, 422 status |
| **File upload** | MIME type filtering (png/jpeg/webp only), 10MB size limit, interceptor-based |
| **Env validation** | Joi schema validates all required env vars at boot -- fails fast on misconfiguration |

---

## Data Validation & DTOs

Global `ValidationPipe` configuration enforces strict request validation:

```typescript
new ValidationPipe({
  transform: true,              // Auto-transform payloads to DTO instances
  whitelist: true,              // Strip properties not in the DTO
  forbidNonWhitelisted: true,   // Reject requests with unknown properties
  errorHttpStatusCode: 422,     // Unprocessable Entity for validation failures
  stopAtFirstError: false,      // Report ALL validation errors, not just the first
})
```

DTOs leverage `class-validator` decorators with custom error messages:
- `@IsNotEmpty`, `@IsString`, `@MaxLength`, `@IsISO8601`, `@IsEnum`, `@IsUUID`
- `@ValidateNested` + `@Type()` for deep object validation
- `@Transform()` for sanitization (e.g., trimming whitespace)

---

## Error Handling & Structured API Responses

### Database Error Handler

Parses PostgreSQL error codes into human-readable, client-safe messages:

```typescript
// PostgreSQL code 23505 (unique violation) -> contextual message
"User with username johndoe already exists"  // 400 Bad Request
```

### HTTP Status Code Strategy

| Status | Meaning | When Used |
|--------|---------|-----------|
| 200 | OK | Successful GET, PATCH |
| 201 | Created | Successful POST |
| 400 | Bad Request | Business rule violation, DB constraint |
| 401 | Unauthorized | Missing/invalid JWT |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 422 | Unprocessable Entity | DTO validation failure |
| 500 | Internal Server Error | Unexpected failures |

All error responses follow a consistent structure for frontend consumption.

---

## Logging & Observability

Custom file-based logging system with 7 severity levels:

```
FATAL > ERROR > WARN > INFO > DEBUG > TRACE > ALL
```

### Components

- **LoggerService**: Global injectable, writes daily rotating log files (`app-YYYY-MM-DD.log`)
- **LoggingInterceptor**: Global HTTP interceptor tracing every request with method, URL, response time, and errors
- **@LogMethod() decorator**: Method-level tracing for use-case debugging
- **LogConfigService**: Environment-aware configuration (dev vs. prod log levels)
- **LogFormatterService**: Consistent log message formatting with timestamps
- **LogFileService**: File I/O abstraction for log persistence

---

## Database

### TypeORM Configuration

- **SnakeNamingStrategy**: Automatic `camelCase` to `snake_case` column mapping
- **Entity auto-discovery**: Scans `src/domain/*.entity.ts`
- **Soft deletes**: `@DeleteDateColumn()` on all entities -- data is never physically removed
- **UUID primary keys**: `@PrimaryGeneratedColumn('uuid')` for distributed-friendly IDs
- **Timestamps**: `@CreateDateColumn()` and `@UpdateDateColumn()` on every entity

### Migrations

Versioned, reversible schema changes:

```bash
npm run typeorm:run-migrations       # Apply pending migrations
npm run typeorm:revert-migration     # Rollback last migration
npm run typeorm:generate-migration   # Auto-generate from entity changes
npm run typeorm:create-migration     # Create empty migration file
```

### Stored Procedures & Triggers

**`fetch_user_data(user_id UUID)`** -- PL/pgSQL function for GDPR data export:
- Aggregates user profile, posts, assets, categories, and data requests into a single JSONB object
- Deployed via TypeORM migration reading raw SQL files
- Called from the PersonalDataRequest use case for portable data downloads

**`log_user_changes()`** -- Audit trigger:
- Fires on INSERT, UPDATE, DELETE on the `users` table
- Records old/new state as JSONB in `users_history`
- Tracks action type, timestamp, and database user
- Full audit trail for compliance

### Transactions

Multi-step operations use `DataSource.transaction()` with `EntityManager` scoping:

```typescript
return await this.dataSource.transaction(async (manager: EntityManager) => {
  const artist = await manager.save(manager.create(User, userFields));
  const profileAsset = await manager.save(manager.create(Asset, {...}));
  const post = await manager.save(manager.create(Post, {...}));
  // ... category linking
  return artist;
});
```

On failure: automatic rollback + file cleanup for any saved uploads.

---

## Value Objects

Typed wrappers enforcing domain invariants at the boundary:

```typescript
export class UserId {
  constructor(private readonly value: string) {
    if (!isUUID(value, 4)) throw new Error('Invalid user ID');
  }
  toString(): string { return this.value; }
}
```

Available: `UserId`, `ArtistId`, `AmateurId`, `PostId`, `CategoryId`, `PersonalDataRequestId`

Prevents accidentally passing a PostId where a UserId is expected -- compile-time and runtime safety.

---

## Caching

Cache-aside pattern with TTL-based expiration:

```typescript
const cached = await this.cacheManager.get<Artist[]>('all_artists');
if (cached) return cached;

const artists = await this.artistRepository.findAllByDescCreateDate();
await this.cacheManager.set('all_artists', artists, 10000); // 10s TTL
return artists;
```

Reduces database load for frequently accessed, infrequently changing data.

---

## File Upload System

- **Fastify multipart** with custom interceptor (`LocalFilesInterceptor`)
- **MIME filtering**: Only `image/png`, `image/jpeg`, `image/webp` accepted
- **Size limit**: 10MB per file
- **Streaming responses**: Files served via `FastifyReply.sendFile()` for memory efficiency
- **Cleanup on failure**: If a transaction rolls back, saved files are deleted

---

## Testing Strategy

### Unit Tests

Each use case tested in isolation with fully mocked dependencies:

```typescript
const module: TestingModule = await Test.createTestingModule({
  providers: [
    CreateArtistUseCase,
    { provide: 'IArtistRepository', useValue: { findAll: jest.fn() } },
    { provide: CACHE_MANAGER, useValue: { get: jest.fn(), set: jest.fn() } },
    { provide: getDataSourceToken(), useValue: { transaction: jest.fn() } },
  ],
}).compile();
```

**Test scenarios covered:**
- Happy path (successful creation/retrieval)
- Validation failures (bad input, missing files)
- Not found scenarios (non-existent resources)
- Database errors (unique constraint violations)
- Cache hit/miss paths
- Transaction rollback and file cleanup
- Guard and permission enforcement

### Integration Tests

Test use cases with real NestJS module resolution and dependency wiring to verify correct DI configuration and module imports.

### E2E Tests

Full request lifecycle testing via `jest-e2e.json` configuration -- HTTP request to database response.

### Mocking Patterns

- **Repository mocking**: Interface-based (`jest.Mocked<IArtistRepository>`)
- **Service mocking**: Partial implementation with `jest.fn()`
- **DataSource mocking**: Transaction callback simulation
- **Cache mocking**: Hit/miss scenario testing

---

## Seeding

CLI-driven data seeding via `nest-commander`:

```bash
npm run console seed seed    # Populate with Faker-generated data
npm run console seed clear   # Wipe seeded data
```

Seeders: User (artist/amateur/moderator roles), Post, Asset, Category, PersonalDataRequest

Features:
- Idempotent execution (checks existence before insert)
- Predefined Auth0 IDs for consistent local testing
- Faker.js for realistic dataset generation
- Ordered execution with early-exit on error

---

## API Documentation

Auto-generated Swagger/OpenAPI documentation at `/api`:
- Bearer token security scheme
- DTO-based request/response schemas
- Per-endpoint descriptions and examples

---

## Environment Configuration

Boot-time validation via Joi schema -- the application **refuses to start** if any required variable is missing:

```bash
SESSION_SECRET, DB_API_HOST, DB_API_PORT, DB_API_NAME, DB_API_USER,
DB_API_PASSWORD, AUTH0_ISSUER_URL, AUTH0_AUDIENCE, NODE_ENV, LOG_DIRECTORY, ...
```

---

## Running

```bash
npm install
npm run start:dev          # Development with hot-reload (0.0.0.0:3000)
npm run start:prod         # Production build
npm run test               # Unit tests
npm run test:e2e           # End-to-end tests
npm run test:cov           # Coverage report
npm run typeorm:run-migrations
```
