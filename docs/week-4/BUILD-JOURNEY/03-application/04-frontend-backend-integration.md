# API Implementation — FlavorForge Build Journey

## Objective

This document records how the FlavorForge frontend and backend were connected through the application's API.

FlavorForge contains two separate application components:

```text
frontend/
    |
    | React + Vite
    |
    v
backend/
    |
    | Node.js + Express
    |
    v
API
```

The backend provides API endpoints used by the frontend.

One of the main verification endpoints is:

```text
GET /api/health
```

The application communication flow is:

```text
Browser
   |
   v
React Frontend
   |
   | HTTP Request
   v
Node.js + Express Backend
   |
   | GET /api/health
   v
JSON Response
   |
   v
React Frontend
```

The purpose of this stage was to establish and verify the application communication before moving into Docker.

---

# 1. Verify the FlavorForge Application Structure

## What we needed

The FlavorForge repository keeps the frontend and backend as separate application components.

### Repository structure

```text
flavorforge-azure-devsecops-capstone/
│
├── frontend/
│
├── backend/
│
├── docker/
│
├── kubernetes/
│
└── docs/
```

### Verify

From the project root:

```bash
cd ~/flavorforge-azure-devsecops-capstone
ls
```

### What happened

The repository contained separate `frontend` and `backend` directories along with the Docker, Kubernetes and documentation directories.

### Screenshot / Evidence

![](/screenshots/backend/01-backend-folder-structure.png)

---

# 2. Backend Application Structure

The FlavorForge backend is implemented using:

```text
Node.js
+
Express
```

The backend source is organized under:

```text
backend/src/
```

The repository contains:

```text
backend/
├── src/
├── tests/
├── package.json
├── jest.config.js
└── Dockerfile
```

The backend source contains the application configuration, controllers, routes and services.

The health API implementation is organized through the backend's route/controller/service structure.

### Verify

```bash
cd ~/flavorforge-azure-devsecops-capstone/backend
ls
ls src
ls tests
```

### Screenshot / Evidence

![](/screenshots/backend/01-backend-folder-structure.png)

---

# 3. Understand the Backend API

The backend exposes HTTP API endpoints.

The health endpoint used for application verification is:

```text
GET /api/health
```

The request flow is:

```text
Client
   |
   | GET /api/health
   v
Express
   |
   v
Health Route
   |
   v
Health Controller / Service
   |
   v
JSON Response
```

### Screenshot / Evidence

![](/screenshots/backend/02-backend-health-endpoint.png)

---

# 4. Start the Backend

Before testing the API, the backend must be running.

From the backend directory:

```bash
cd ~/flavorforge-azure-devsecops-capstone/backend
```

Check the available npm scripts:

```bash
npm run
```

Use the appropriate start/development script defined in the actual `package.json`.

The FlavorForge backend runs on:

```text
3000
```

### What happened

The Node.js/Express backend started and listened for HTTP requests on the configured application port.

### Screenshot / Evidence

![](/screenshots/backend/03-backend-server-running.png)

---

# 5. Verify the Health API

With the backend running, the health endpoint can be tested.

### Command

```bash
curl http://localhost:3000/api/health
```

### What happened

The request was sent to the running Express backend.

The backend returned the health information as an HTTP response.

This confirmed that the backend was not only running but also responding to an application-level API request.

### Screenshot / Evidence

![](/screenshots/backend/curl.png)

---

# 6. Verify the Health API Through the Browser

The same endpoint can also be accessed through a browser while the backend is running.

```text
http://localhost:3000/api/health
```

### What happened

The health endpoint returned the backend response through the browser.

This provided a second way of verifying the API.

### Screenshot / Evidence

![](/screenshots/backend/04-health-endpoint-browser.png)

---

# 7. Understand the Backend Configuration

The backend uses runtime configuration for values such as:

```text
PORT
NODE_ENV
CORS_ORIGIN
APP_VERSION
BUILD_VERSION
```

These values become important when the same application is deployed into different environments.

The actual deployed configuration was handled later through the Kubernetes configuration.

### Screenshot / Evidence

![](/screenshots/backend/06-backend-environment-configuration.png)

---

# 8. Frontend and Backend Communication

The frontend is implemented using:

```text
React
+
Vite
```

The backend is:

```text
Node.js
+
Express
```

During local development, the applications use different ports.

The frontend runs on:

```text
http://localhost:5173
```

The backend runs on:

```text
http://localhost:3000
```

Therefore the communication path is:

```text
React Frontend
http://localhost:5173
        |
        | HTTP API request
        v
Express Backend
http://localhost:3000
        |
        v
/ api/health
```

---

# 9. CORS Configuration

Because the frontend and backend use different origins during local development, the backend needs appropriate CORS configuration.

The local frontend origin used by the application is:

```text
http://localhost:5173
```

The backend therefore allows the frontend to communicate with the API through the configured CORS settings.

### What happened

The frontend and backend were successfully connected during the application implementation.

### Screenshot / Evidence

![](/screenshots/backend/10-cors-enabled-frontend-backend-connected.png)

---

# 10. Backend Development Server

During development, the backend could also be run using the project's development-server configuration.

The repository contains evidence of the development server running.

### Screenshot / Evidence

![](/screenshots/backend/08-nodemon-development-server.png)

---

# 11. Backend API Implementation

The backend contains API routes for the application.

The repository includes the health and recipe API implementation under:

```text
backend/src/routes/
```

The backend also contains corresponding controllers and services.

The structure is:

```text
backend/src/
│
├── controllers/
│
├── routes/
│
├── services/
│
├── config/
│
└── ...
```

### Screenshot / Evidence

![](/screenshots/backend/13-backend-api.png)

---

# 12. Recipe API

The FlavorForge backend also contains recipe-related API functionality.

The recipe API structure is implemented through the backend route/controller/service layers.

### Screenshot / Evidence

![](/screenshots/backend/11-recipes-api-structure.png)

The recipe API was subsequently verified as working.

### Screenshot / Evidence

![](/screenshots/backend/12-recipes-api-working.png)

---

# 13. Backend Automated Tests

The backend contains Jest tests under:

```text
backend/tests/
```

The repository contains:

```text
backend/tests/
├── app.test.js
├── controllers.test.js
└── services.test.js
```

The backend test configuration is defined in:

```text
backend/jest.config.js
```

The test command is defined by the actual backend `package.json`.

### Command

```bash
npm test
```

### What happened

The configured Jest test suite was executed as part of the FlavorForge application verification and later CI/CD process.

---

# 14. API Verification vs Automated Testing

These two checks serve different purposes.

### API verification

```bash
curl http://localhost:3000/api/health
```

This checks the running application's HTTP behavior.

```text
curl
  |
  v
Running Express Application
  |
  v
GET /api/health
  |
  v
HTTP Response
```

### Automated testing

```bash
npm test
```

This executes the project's Jest tests.

```text
Backend Source
      |
      v
Jest
      |
      v
Automated Tests
      |
      v
Pass / Fail
```

Both checks were useful during the FlavorForge build.

---

# 15. API Configuration for Docker

When the application was later containerized, the frontend used the Docker-specific API configuration:

```text
VITE_API_BASE_URL=http://backend:3000
```

The communication path became:

```text
Frontend Container
       |
       | http://backend:3000
       v
Backend Container
       |
       v
Express
       |
       v
/api/health
```

The hostname:

```text
backend
```

was used for container-to-container communication within the Docker networking setup.

### Important distinction

`localhost` inside a container refers to that container itself.

Therefore, the frontend container does not use:

```text
localhost:3000
```

to reach a separate backend container.

Instead, the Docker networking configuration provides the backend hostname:

```text
backend:3000
```

The Docker implementation is documented in the next Build Journey stage.

---

# 16. Application-Level Verification

The health endpoint provided a consistent application-level verification point.

The verification path progressed through the build journey:

```text
Local
   |
   v
localhost:3000/api/health
   |
   v
Docker
   |
   v
Backend Container
   |
   v
Kubernetes
   |
   v
Backend Service / Ingress
   |
   v
/api/health
```

This allowed the same basic application health check to be reused during later deployment verification.

---

# 17. What We Achieved

At the end of the API implementation stage, FlavorForge had:

```text
React + Vite Frontend
        |
        | HTTP
        v
Node.js + Express Backend
        |
        +---- GET /api/health
        |
        +---- Recipe API
        |
        +---- Jest Tests
```

The backend was verified through:

```text
Application startup
        |
        v
Health API
        |
        v
Browser / curl verification
        |
        v
Frontend ↔ Backend communication
        |
        v
Automated tests
```

### Final Evidence

Backend running:

![](/screenshots/backend/03-backend-server-running.png)

Health endpoint:

![](/screenshots/backend/02-backend-health-endpoint.png)

Browser verification:

![](/screenshots/backend/04-health-endpoint-browser.png)

Frontend ↔ Backend connection:

![](/screenshots/backend/10-cors-enabled-frontend-backend-connected.png)

---

# 18. Reviewer Explanation

### "What API did you implement?"

> "The FlavorForge backend is a Node.js and Express API. One of the main verification endpoints is `GET /api/health`, which I used to confirm that the backend was running and responding."

### "How did you verify the API?"

> "I ran the backend locally on port 3000 and verified `/api/health` using curl and the browser. I also verified the frontend-to-backend communication and ran the backend Jest tests."

### "How does the frontend communicate with the backend?"

> "The React frontend communicates with the Node.js Express backend through HTTP requests. The backend location is provided through the frontend API configuration."

### "Why is the API URL configurable?"

> "Because the networking arrangement changes between local development, Docker and Kubernetes. Keeping the API location configurable avoids hard-coding one environment's address."

### "Why do you use `backend:3000` in Docker?"

> "The frontend and backend run as separate containers. Within the Docker network, the frontend can reach the backend using its network hostname, `backend`, on port 3000."

### "Why can't you use localhost between containers?"

> "Because localhost inside a container refers to that container itself. The backend is running in a different container, so the frontend needs to use the backend's network hostname."

### "Why do you need CORS?"

> "During local development, the frontend and backend use different origins, such as ports 5173 and 3000. CORS allows the backend to control which frontend origin can make browser requests."

### "Why is `/api/health` useful in DevOps?"

> "It gives me a simple application-level verification point. I can use it during local development, Docker testing and Kubernetes deployment verification to confirm that the backend is actually responding."

---

# 19. Application API Result

The application communication foundation was established:

```text
FlavorForge
     |
     +-------------------+
     |                   |
     v                   v
Frontend              Backend
React + Vite          Node.js + Express
     |                   |
     | HTTP              |
     +------------------>|
                         |
                         v
                  GET /api/health
                         |
                         v
                    JSON Response
```

The application was ready to proceed to the next testing stage before containerization.

The next document is:

```text
05-application-testing.md
```
