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

## Running application

To start the server:

```
npm start
```

The service will listen on http://localhost:4000 (or your configured PORT).

A complete OpenAPI schema (api.yaml) is available in the doc/ folder.
After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/docs/.

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
