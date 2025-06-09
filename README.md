# Home Library Service

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Configuration

Rename .env.example to .env or create a new .env file.
By default, the service listens on port 4000. To override, set:

```
PORT=4000
```

## Running DB

There are three modes of running both postgres and app:

Before running tests in new terminal, please wait until the end of migrations and start of the app, it will take some time.
These lines should be displayed in the terminal:

```
nest-app     | App is running on http://localhost:4000/
nest-app     | To test API use http://localhost:4000/docs
```

Is means that app is ready and you can use it and run tests.

For convenience there are prepared Make scripts, which will run all typeorm migrations and start the app.

### Running with hot-reload (app is hosted inside the docker container / development mode)

In this mode, application is restarting upon changes implemented into src folder.

To start the mode:

```
make docker-dev-up
```

OR

```
docker compose --file docker-compose.dev.yml up --build --watch
```

When you finished using the mode, run:

```
make docker-dev-down
```

OR

```
docker compose --file docker-compose.dev.yml down --volumes
```

### Running build application (app is hosted inside the docker container / production mode)

In this mode application will firstly be built, and than will start. Hot reload will not be available.

To start the mode:

```
make docker-prod-up
```

OR

```
docker compose --file docker-compose.dev.yml up --build --watch
```

When you finished using the mode, run:

```
make docker-prod-down
```

OR

```
docker compose --file docker-compose.prod.yml down --volumes
```

### Running PostgreSQL database inside the docker container (app is hosted on the local machine)

In this mode, only PostgreSQL database is running inside the docker container, not app.

To start the mode:

```
make outside-docker-up
```

OR

```
docker compose --file docker-compose.db.yml up -d
npm run migration:up
npm run start
```

When you finished using the mode, run:

```
outside-docker-down
```

OR

Press CTRL+C and run:

```
npm run migration:down
docker compose file docker-compose.db.yml down --volumes
```

## Running application

Postgres database should be running for app to work properly.

To start the server:

```
npm start
```

The service will listen on http://localhost:4000 (or your configured PORT).

A complete OpenAPI schema (api.yaml) is available in the doc/ folder.
After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/docs/.

## Migrations

Postgres database should be running during migrations process.
To run migrations and form the postgress tables:

```
npm run migration:up
```

To remove all tables:

```
npm run migration:down
```

## Docker images vulnerabilities scanning

To scan docker images vulnerabilities run:

```
npm run docker:check
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```
