# Backend Notes

## Current Backend Structure

```text
backend/
  src/
    server.js
    controllers/
      subjectController.js
    data/
      subjects.js
    middleware/
      errorMiddleware.js
    routes/
      subjectRoutes.js
```

## What Each File Does

### server.js

This is the entry point of the backend.

It creates the Express app, adds middleware, connects routes, and starts the server.

### routes/subjectRoutes.js

This file defines the API URLs for subjects and tasks.

Routes answer the question:

```text
Which URL should call which function?
```

### controllers/subjectController.js

This file contains the actual logic for each route.

Controllers answer the question:

```text
What should happen when this route is called?
```

### data/subjects.js

This file stores temporary fake data.

Right now the data is stored in memory. That means it disappears when the server restarts.

Later, this file will be replaced by a real database.

### middleware/errorMiddleware.js

This file handles errors and unknown routes.

It helps the API return clean JSON error messages.

## Request And Response

In Express:

```js
req
```

means request. It contains information coming from the client.

Examples:

```js
req.body
req.params
req.originalUrl
```

```js
res
```

means response. It is used to send something back to the client.

Examples:

```js
res.json(data)
res.status(201).json(data)
res.status(404).json({ message: "Not found" })
```
