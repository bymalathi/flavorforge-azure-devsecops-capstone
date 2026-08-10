# Backend Setup — FlavorForge Build Journey

## Objective

This document records the FlavorForge backend setup and verification flow.

The backend uses:

```text
Node.js
Express
```

The backend is maintained separately from the React frontend and provides the API used by the application.

The backend verification flow was:

```text
Backend
   ↓
Dependencies
   ↓
Application
   ↓
Health API
   ↓
Tests
```

---

# 1. Backend Application

## What we wanted

FlavorForge required a backend application to provide the API used by the frontend.

The backend was implemented using:

```text
Node.js
+
Express
```

The backend is located in:

```text
backend/
```

The application structure separates the frontend and backend:

```text
flavorforge-azure-devsecops-capstone/
├── frontend/
└── backend/
```

---

# 2. Install Backend Dependencies

## What we needed

The backend dependencies defined in `backend/package.json` needed to be installed before running the application.

### Command

From the backend directory:

```bash
npm install
```

### What happened

npm read the existing:

```text
backend/package.json
```

and installed the dependencies required by the FlavorForge backend.

The installed packages are placed in:

```text
backend/node_modules/
```

### Verify

Check that the backend project contains its package configuration and installed dependencies.

```text
backend/
├── package.json
└── node_modules/
```

---

# 3. Backend Package Configuration

The backend project configuration is defined in:

```text
backend/package.json
```

This file contains the backend dependencies and npm scripts used by the application.

The same configuration was used to determine how the backend was started and tested.

### Verify

```text
backend/package.json
```

The package file is the source of truth for the backend dependencies and available npm scripts.

---

# 4. Start the Backend

## What we needed

The Node.js/Express application needed to be started locally so that the API could be verified.

### Command

```bash
npm start
```

### What happened

The Node.js/Express backend started and listened on port:

```text
3000
```

The local backend endpoint was therefore:

```text
http://localhost:3000
```

### Verify

From another terminal:

```bash
curl http://localhost:3000/api/health
```

A successful response confirms that the backend is running and responding to HTTP requests.

---

# 5. Verify the Health API

## What we needed

The backend required an endpoint that could be used to confirm that the application was responding correctly.

FlavorForge provides:

```text
GET /api/health
```

### Command

```bash
curl http://localhost:3000/api/health
```

### What happened

The request reached the Express backend through port `3000`.

The backend returned its health information.

This provided an application-level verification instead of only confirming that the Node.js process was running.

### Verify

Run:

```bash
curl http://localhost:3000/api/health
```

The expected communication flow is:

```text
localhost:3000
      |
      v
Express Backend
      |
      v
/api/health
      |
      v
HTTP Response
```

---

# 6. Backend Tests

## What we needed

The backend required automated tests to verify its functionality.

FlavorForge uses:

```text
Jest
```

### Command

From the backend directory:

```bash
npm test
```

### What happened

The configured Jest test suite was executed.

The backend tests passed successfully during the FlavorForge implementation.

### Verify

Run:

```bash
npm test
```

A successful test run confirms that the configured backend test suite completes successfully.

---

# 7. Backend Runtime Configuration

The backend uses runtime configuration values that became important during deployment.

The deployed FlavorForge configuration included:

```text
PORT=3000
NODE_ENV=production
APP_VERSION=1.3
BUILD_VERSION=1.3
```

These values were later supplied through the Kubernetes deployment configuration.

The complete Kubernetes configuration is documented in the Kubernetes Build Journey rather than being repeated here.

---

# 8. Health API Used During Deployment Verification

The same health endpoint used during local development was later used to verify the deployed application:

```text
/api/health
```

The verification path therefore progressed from:

```text
Local Backend
     |
     v
http://localhost:3000/api/health
```

to the deployed application:

```text
Kubernetes / AKS
     |
     v
Application Endpoint
     |
     v
/api/health
```

This provided an application-level verification in addition to checking Kubernetes resources such as pods and services.

---

# 9. Backend Verification Evidence

The backend setup and test results should be supported by the actual FlavorForge evidence captured during implementation.

### Screenshot / Evidence

Use the actual backend verification screenshot from the repository:

### Screenshot / Evidence

![Backend folder structure](/screenshots/backend/01-backend-folder-structure.png)

![Backend server running](/screenshots/backend/03-backend-server-running.png)

![Backend health endpoint](/screenshots/backend/02-backend-health-endpoint.png)

![Health endpoint in browser](/screenshots/backend/04-health-endpoint-browser.png)

![Backend API](/screenshots/backend/13-backend-api.png)

Replace the placeholder with the actual screenshot filename from the FlavorForge screenshot inventory.

If the backend test or health-check evidence was captured separately, the corresponding screenshot can be placed here as well.

---

# 10. Backend Setup Result

At the end of the backend application stage, FlavorForge had:

```text
Backend
   |
   +-- Node.js
   |
   +-- Express
   |
   +-- /api/health
   |
   +-- Jest Tests
   |
   v
Backend Ready for Docker Packaging
```

The backend was verified through:

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

The backend was therefore ready to move into the Docker stage.

---

# 11. Build Journey Result

The application stage now contained two separate application components:

```text
FlavorForge
│
├── Frontend
│   └── React + Vite
│
└── Backend
    └── Node.js + Express
        |
        └── /api/health
```

The frontend and backend were ready to be packaged separately as Docker images.

The next Build Journey stage was:

```text
04-docker/
```

The detailed Docker implementation is documented in:

```text
04-docker/01-docker-setup.md
04-docker/02-frontend-dockerfile.md
04-docker/03-backend-dockerfile.md
```
