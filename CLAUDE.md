# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture

Spring Boot microservices backend (Java 21, Spring Boot 3.5.4, Spring Cloud 2025.0.0) with an Angular 22 frontend.

- **api-gateway** (port 8080) — Spring Cloud Gateway (WebFlux). Single entry point for the UI; routes by path prefix to each service (see `api-gateway/src/main/resources/application.yml`). Validates JWTs itself via `filter/JwtAuthenticationFilter` + `security/JwtUtil` before forwarding requests — it does not call auth-service to verify tokens. `filter/RouteValidator` lists which paths are public (`/auth/login`, `/auth/register`, `/auth/verify`, `/images`, `GET /cars`); everything else requires a valid `Authorization` header. The JWT secret is duplicated in this service's `application.yml` and must stay in sync with auth-service's.
- **auth-service** (port 8083, DB `auth_db`) — registration/login, email verification codes, Google OAuth2 login, JWT issuance.
- **car-service** (port 8081, DB `car_db`) — car CRUD, image upload/serving (`/cars/**`, `/images/**`), listens for `payment-completed` to update car availability. Uploaded files are read from/written to `app.upload-dir` (currently an absolute local path in `application.yml`).
- **booking-service** (port 8082, DB `booking_db`) — creates bookings, calls car-service synchronously via an OpenFeign client (`client/CarClient`) to fetch car details, and publishes `payment-requested` to Kafka. Listens for `payment-completed` to finalize/update booking status.
- **payment-service** (port 8084, DB `payment_db`) — listens for `payment-requested`, processes payment, publishes `payment-completed`.
- **notification-service** (port 8085, DB `notification_db`) — listens for `payment-completed` and sends email notifications.
- **common-events** — shared library (no Spring Boot dependency) holding the Kafka event DTOs (`PaymentRequestedEvent`, `PaymentCompletedEvent`) used across producers/consumers. Changes here require rebuilding/reinstalling this module before dependent services pick them up (`mvn install` from repo root, or `mvn install -pl common-events`).
- **car-rental-ui** — Angular 22 app (standalone components, Vitest for unit tests). `core/auth.interceptor.ts` attaches the JWT to outgoing requests; `core/auth.guard.ts` protects routes in `app.routes.ts`. All API calls go through the gateway at `http://localhost:8080`.

### Event flow

Booking creation is decoupled from payment/notification via Kafka topics `payment-requested` and `payment-completed`:

```
booking-service --(payment-requested)--> payment-service --(payment-completed)--> booking-service, car-service, notification-service
```

Each service's `application.yml` sets `spring.json.trusted.packages: com.carrental.common.event` and a default type for its consumer, since type headers are disabled.

### Infrastructure

`docker-compose.yml` at the repo root brings up Postgres 16 (port 5432, user/password `postgres`), Zookeeper, and Kafka (port 9092) — no application services are containerized. Each Spring service expects its own database to already exist on the shared Postgres instance (`auth_db`, `car_db`, `booking_db`, `payment_db`, `notification_db`); `ddl-auto: update` handles schema creation. All ports/URLs above assume everything runs on `localhost`, matching how the gateway's static route URIs and the UI's API base URL are configured.

## Commands

### Backend (multi-module Maven reactor, run from repo root)

```
mvn install                          # build all modules, install common-events for dependents
mvn install -pl common-events        # rebuild just the shared event DTOs after changing them
mvn test -pl booking-service         # run tests for one module
mvn spring-boot:run -pl car-service  # run a single service (repeat per service, in dependency order: common-events first)
```

Bring up infra before running services: `docker-compose up -d` (Postgres + Kafka + Zookeeper).

Startup order matters for full end-to-end flows: infra → auth-service, car-service (booking-service's Feign client and Kafka listeners depend on it) → booking-service, payment-service, notification-service → api-gateway last (or first, order doesn't matter for the gateway itself, but nothing works through it until the backing services are up).

### Frontend (`car-rental-ui/`)

```
npm install
ng serve             # dev server at http://localhost:4200, proxies nothing — calls http://localhost:8080 directly
ng test              # Vitest unit tests
ng test -- path/to/file.spec.ts   # single test file
ng build
```

## Notes

- JWT secret is currently hardcoded identically in `api-gateway` and `auth-service` `application.yml` files — if you rotate/change one, update the other.
- Mail and OAuth credentials in service `application.yml` files are read from env vars with committed fallback defaults (`MAIL_USERNAME`, `MAIL_PASSWORD`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`) — prefer setting real env vars over editing the fallbacks.
- Only default Spring Boot-generated `*ApplicationTests` context-load smoke tests exist per backend module; there is no meaningful test coverage to run as a regression check yet.