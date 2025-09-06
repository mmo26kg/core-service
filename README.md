# Core Service (Node.js, modular)

A minimal, NestJS-inspired microservice skeleton using vanilla JavaScript (ESM), designed for modular growth.

## Structure

- `src/` main source
    - `common/` shared utilities (e.g., logger)
    - `core/` framework-like primitives (module registry)
    - `modules/` feature modules (e.g., health)
- `config/` environment config
- `tests/` unit/integration tests

## Usage

- Start: `npm start`
- Dev (watch): `npm run dev`
- Test: `npm test`

### Environment

- Copy `.env.example` to `.env` and adjust as needed.

### HTTP

- Health endpoint: `GET /health` returns `{ status: "ok", uptime: <seconds> }`.
