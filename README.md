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

## Architecture (NestJS-like, modular)

This service follows a lightweight, NestJS-inspired module system with manual dependency injection (DI) using an Application context.

### Key pieces

- `src/main.js`: Bootstrap sequence (logger -> registry -> application -> http server).
- `src/core/module-registry.js`: Minimal module container that constructs and stores module instances.
- `src/app.js`: Application lifecycle (bootstrap, registerRoutes, shutdown) and shared `context` (a Map) for manual DI.
- `src/server.js`: Creates and returns the Express app instance; modules mount routers here.
- `src/modules/index.js`: Central aggregator to list and register all feature modules.
- `src/modules/<feature>/`: One folder per feature (e.g., `health`, `users`).
    - `<feature>.service.js`: Business logic.
    - `<feature>.controller.js`: Orchestrates inputs/outputs, calls service.
    - `<feature>.routes.js`: Express Router mounting HTTP endpoints.
    - `<feature>.module.js`: Wires service+controller, exposes lifecycle hooks and `registerRoutes()`.

### Execution flow

1) `main.js` creates `logger`, `ModuleRegistry`, then calls `registerAllModules(registry)` from `src/modules/index.js`.
2) `Application.bootstrap()` runs `onModuleInit(context)` for every module — each module can publish services via `context.set(key, value)` to enable manual DI.
3) An Express app is created via `createServer()` and passed to `Application.registerRoutes(httpApp)`; modules with `registerRoutes()` mount their routers.
4) OS signals (SIGINT) trigger `Application.shutdown()` which calls `onModuleDestroy(context)` in reverse order.

### ASCII overview

```
+---------------------+                      +--------------------+
|      main.js        |                      |  modules/index.js  |
|---------------------|                      |--------------------|
| - createLogger()    |                      | export modules[]   |
| - new ModuleRegistry|        ----->        | registerAllModules |
| - registerAllModules|                      +--------------------+
| - new Application   |
| - app.bootstrap()   |
| - httpApp=createServer()                   +--------------------+
| - app.registerRoutes(httpApp)              |  ModuleRegistry    |
| - httpApp.listen(...)                      |--------------------|
+-------------+-------+                      | modules: Module[]  |
                            |                | register(Module)   |
                            |                | getModules()       |
                            v                +---------+----------+
            +-------+-------------------------+|
            |         Application (app.js)     |
            |----------------------------------|
            | registry, logger, context(Map)   |
            |                                  |
            | bootstrap():                     |
            |  for mod in registry.modules:    |
            |    mod.onModuleInit(context)     |
            |                                  |
            | registerRoutes(httpApp):         |
            |  for mod in registry.modules:    |
            |    mod.registerRoutes(httpApp,   |
            |                      context)?   |
            |                                  |
            | shutdown(): reverse order        |
            |  mod.onModuleDestroy(context)?   |
            +-------------------+--------------+
                                                    |
                                                    v
                                +---------+-----------+
                                |       server.js     |
                                |---------------------|
                                | createServer():     |
                                |  Express instance   |
                                +----------+----------+
                                                     |
                             HTTP req/res flows to
                                                     v
         +--------------------+--------------------+
         |       Feature Modules (examples)       |
         |----------------------------------------|
         | HealthModule / UsersModule             |
         | - service                              |
         | - controller                           |
         | - registerRoutes(app): mount routers   |
         | - onModuleInit(context): set services  |
         | - onModuleDestroy(context)             |
         +----------------------------------------+
```

### Manual DI via Application context

- Each module can publish reusable objects:
    ```js
    // inside <feature>.module.js
    onModuleInit(context) {
        context.set('usersService', this.service)
    }
    ```
- Anywhere needing it can retrieve later (e.g., in another module’s `registerRoutes(app, context)`):
    ```js
    const usersService = context.get('usersService')
    ```

### Add a new feature module

1) Create `src/modules/<feature>/` with:
     - `<feature>.service.js`, `<feature>.controller.js`, `<feature>.routes.js`, `<feature>.module.js`, `index.js` (optional barrel)
2) Export and register in `src/modules/index.js`:
     ```js
     import { <Feature>Module } from './<feature>/<feature>.module.js'
     export const modules = [ /* existing */, <Feature>Module ]
     ```
3) Done — `main.js` already assembles all modules via `registerAllModules()`.
