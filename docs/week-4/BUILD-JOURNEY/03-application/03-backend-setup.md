# Backend Setup — FlavorForge Build Journey

## Objective

This document records the actual FlavorForge backend setup and verification flow.

The backend uses:

```text
Node.js
Express
```

The backend is maintained separately from the React frontend and provides the API used by the application.

The focus of this document is:

```text
Backend
   ↓
Dependencies
   ↓
Run
   ↓
Health API
   ↓
Tests
```

---

# Step 1 — Install Backend Dependencies

### Command

Run this from the `backend` directory:

```bash
npm install
```

### What happened

npm read the existing `backend/package.json` and installed the dependencies required by the FlavorForge backend.

The generated `node_modules` directory contains the installed packages.

### Verify

```bash
npm run
```

This displays the npm scripts available for the backend.

---

# Step 2 — Check the Available Backend Commands

### Command

```bash
npm run
```

### What happened

This displayed the scripts defined in the backend's `package.json`.

The available scripts were used to determine how the backend could be started and tested rather than assuming commands from a generic Node.js project.

### Verify

The terminal output should show the scripts configured in:

```text
backend/package.json
```

---

# Step 3 — Start the Backend

### Command

Use the start command defined in the backend's `package.json`.

```bash
npm start
```

### What happened

The Node.js/Express backend started and listened on the configured application port.

FlavorForge uses port:

```text
3000
```

### Verify

Open another terminal and check the health endpoint:

```bash
curl http://localhost:3000/api/health
```

---

# Step 4 — Verify the Backend Health API

### Command

```bash
curl http://localhost:3000/api/health
```

### What happened

The request reached the Express backend through port `3000` and returned the application's health information.

This confirmed that the backend was not only started but was also responding to an HTTP request.

### Verify

Run the same request again:

```bash
curl http://localhost:3000/api/health
```

A successful response confirms that:

```text
localhost:3000
      ↓
Express Backend
      ↓
/api/health
      ↓
HTTP Response
```

---

# Step 5 — Run Backend Tests

### Command

From the backend directory:

```bash
npm test
```

### What happened

The configured Jest backend test suite was executed.

The tests passed successfully during the FlavorForge implementation.

### Verify

Run:

```bash
npm test
```

The test output should show the configured test suites completing successfully.

---

# Step 6 — Confirm the Backend Application Flow

At this point, the backend verification flow was:

```text
backend/
   |
   v
npm install
   |
   v
Dependencies installed
   |
   v
npm start
   |
   v
Node.js + Express
   |
   v
localhost:3000
   |
   v
/api/health
   |
   v
Successful response
   |
   v
npm test
   |
   v
Backend tests passed
```

---

# Step 7 — Backend Configuration Used by FlavorForge

The backend uses configuration values for its runtime environment.

The deployed FlavorForge configuration included values such as:

```text
PORT=3000
NODE_ENV=production
APP_VERSION=1.3
BUILD_VERSION=1.3
```

These values were later supplied through the Kubernetes deployment configuration.

The Kubernetes configuration is documented separately and is not repeated here.

---

# Step 8 — Backend Health Endpoint Used for Later Deployment Verification

The same backend endpoint:

```text
/api/health
```

was later used to verify the application after deployment.

The verification path changed as the application moved through the build journey:

```text
Local Backend
     |
     v
localhost:3000/api/health
```

then later:

```text
Kubernetes / AKS
     |
     v
Application endpoint
     |
     v
/api/health
```

This gave us an application-level check in addition to checking whether Kubernetes pods were running.

---

# Backend Setup Result

The FlavorForge backend was established as:

```text
Node.js
   |
   v
Express
   |
   v
Backend Application
   |
   +---- /api/health
   |
   +---- Jest Tests
```

The backend was verified by:

```bash
npm install
```

```bash
npm start
```

```bash
curl http://localhost:3000/api/health
```

```bash
npm test
```

The backend was then ready for the next stage of the FlavorForge Build Journey.
