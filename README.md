# HRMS Performance Assessment

This repository contains a Spring Boot backend and a Vite React frontend for an HRMS performance assessment application.

## Quick start (Docker Compose)

Requires Docker and Docker Compose.

1. Build and run services:

```bash
docker-compose up --build
```

2. Backend will be available at `http://localhost:8080`.
   - Flyway migrations run automatically and seed sample data.
3. Frontend will be available at `http://localhost:3000` (proxied via Nginx container).

## Environment variables

You can override the defaults in `docker-compose.yml` by setting these variables:

- `SPRING_DATASOURCE_URL` (default: `jdbc:postgresql://db:5432/hrms_db`)
- `SPRING_DATASOURCE_USERNAME` (default: `postgres`)
- `SPRING_DATASOURCE_PASSWORD` (default: `postgres`)
- `JWT_SECRET` (default in compose: `ChangeThisSecretToAStrongRandomValue`)

## Local development

- To run the backend locally against H2: the project includes `application-local.properties`.
- To run the frontend locally: `cd frontend && npm install && npm run dev`.

## Notes

- Production configuration is in `src/main/resources/application-prod.properties` and reads DB credentials from environment variables.
- Flyway migrations are in `src/main/resources/db/migration`.
# NIC HRMS — Annual Performance Assessment System

Local development

1. Start Postgres and services with Docker Compose:

```bash
docker-compose up --build
```

2. Frontend will be at `http://localhost:3000`, backend at `http://localhost:8080`.

Environment
- Set `jwt.secret` via `SPRING_APPLICATION_JSON` or `JWT_SECRET` env var for production.
