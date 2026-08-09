# API Implementation — Complete Beginner Build Guide

## Objective

This document explains how the FlavorForge backend API was implemented and how the frontend communicates with it.

The API is provided by:

```text
Node.js
+
Express
```

The main API endpoint used for application and deployment verification is:

```text
/api/health
```

The overall communication flow is:

```text
User
  |
  v
React Frontend
  |
  | HTTP API Request
  v
Node.js + Express Backend
  |
  | /api/health
  v
API Response
  |
  v
React Frontend
```

---

# 1. What Is an API?

An API allows one application component to communicate with another.

In FlavorForge:

```text
Frontend
   |
   | HTTP request
   v
Backend API
   |
   | HTTP response
   v
Frontend
```

The React frontend does not directly execute backend code.

Instead, it sends HTTP requests to the Node.js/Express backend.

---

# 2. Why FlavorForge Uses an API

The frontend and backend are separate application components.

```text
frontend/
    |
    | React + Vite
    |
    v
User Interface


backend/
    |
    | Node.js + Express
    |
    v
API
```

This separation allows the two components to be:

* developed independently
* tested independently
* built independently
* containerized independently
* deployed independently

This becomes especially useful when the application is deployed to Kubernetes.

---

# 3. Backend API Technology

The API is implemented using:

```text
Node.js
Express
```

Node.js provides the runtime.

Express provides the HTTP server and routing functionality.

The simplified architecture is:

```text
Node.js
   |
   v
Express Application
   |
   +---- API Routes
   |
   +---- Middleware
   |
   v
HTTP Response
```

The actual implementation is maintained under:

```text
backend/src/
```

---

# 4. API Endpoint

FlavorForge provides a health endpoint:

```text
GET /api/health
```

The complete local URL is:

```text
http://localhost:3000/api/health
```

The endpoint is used to determine whether the backend is running and responding.

---

# 5. HTTP Method

The health endpoint uses:

```text
GET
```

Therefore the request is:

```text
GET /api/health
```

The purpose of the request is to retrieve the current health/status information from the backend.

---

# 6. API Request Flow

When the health endpoint is called:

```text
Client
  |
  | GET /api/health
  v
Express Server
  |
  v
Health Route
  |
  v
JSON Response
```

The client can be:

* a browser
* curl
* the React frontend
* a Kubernetes verification command
* an API testing tool

---

# 7. Local API Verification

After starting the backend, test the endpoint using:

```bash
curl http://localhost:3000/api/health
```

A successful response confirms that:

```text
Backend process
       |
       v
Express server
       |
       v
/api/health
       |
       v
HTTP response
```

is working.

The exact response fields may change as the application evolves.

---

# 8. API Response

The FlavorForge backend health response can include application information such as:

```text
version
environment
health/status information
```

In the deployed FlavorForge environment, the API health response was used to verify information including:

```text
version/build
environment
```

For example, the deployed application was verified with application version information around:

```text
1.3
```

and the production environment.

The exact response should always be taken from the running application rather than hard-coded into this documentation.

---

# 9. Why Version Information Is Useful

The application version/build information helps identify which version of the application is actually running.

For example:

```text
Frontend
    |
    v
Backend
    |
    v
/api/health
    |
    v
version/build information
```

This becomes useful when troubleshooting a deployment.

If a user reports:

> "I am seeing an old version."

the health endpoint can help determine which backend version is actually running.

---

# 10. Environment Information

The backend health response can also expose the configured application environment.

For the deployed production configuration, the backend used:

```text
NODE_ENV=production
```

This allows the running API to be associated with its deployment environment.

The general idea is:

```text
Development
    |
    v
API

QA
    |
    v
API

Production
    |
    v
API
```

The deployment configuration determines the environment-specific values.

---

# 11. Backend Port

The backend uses:

```text
PORT=3000
```

Therefore, during local execution, the API is accessed through:

```text
http://localhost:3000
```

and the health endpoint becomes:

```text
http://localhost:3000/api/health
```

---

# 12. Frontend → Backend Communication

The frontend communicates with the backend using HTTP.

The simplified flow is:

```text
React Application
       |
       | HTTP request
       v
Backend API
       |
       | HTTP response
       v
React Application
```

The frontend needs to know the backend API base URL.

This is why the frontend uses an API configuration value rather than assuming that the backend always runs on the same host.

---

# 13. API Base URL

The FlavorForge frontend uses:

```text
VITE_API_BASE_URL
```

for the API base URL configuration.

For Docker-based frontend configuration, the project used:

```text
VITE_API_BASE_URL=http://backend:3000
```

The important concept is:

```text
VITE_API_BASE_URL
        |
        v
Backend API
```

The value can change depending on where the application is running.

---

# 14. Why the API URL Is Configurable

The frontend may run in different environments.

For example:

```text
Local Development
        |
        v
Local Backend


Docker
        |
        v
Backend Container


Kubernetes
        |
        v
Backend Service
```

The backend address is therefore not necessarily identical in every environment.

Using a configuration value allows the frontend build/deployment configuration to determine the appropriate backend location.

---

# 15. Docker Network Example

When the frontend and backend run as Docker containers on the same Docker network, the backend can be addressed by its container/service name.

The FlavorForge Docker configuration used:

```text
http://backend:3000
```

for:

```text
VITE_API_BASE_URL
```

The flow becomes:

```text
Frontend Container
       |
       | http://backend:3000
       v
Backend Container
       |
       v
Express API
```

The name:

```text
backend
```

is resolved through the container networking configuration.

---

# 16. Kubernetes API Communication

In Kubernetes, the communication model changes.

Instead of relying on a local Docker container name, the frontend communicates through the Kubernetes networking/service configuration.

The general architecture is:

```text
Frontend Pod
     |
     v
Backend Service
     |
     v
Backend Pod
     |
     v
Express API
```

The Kubernetes service provides a stable way for other workloads to reach the backend pods.

The exact Kubernetes service configuration is documented later in the Kubernetes section of the BUILD-JOURNEY.

---

# 17. CORS

Because the frontend and backend can run on different origins, the backend uses CORS configuration.

CORS stands for:

```text
Cross-Origin Resource Sharing
```

The simplified flow is:

```text
Browser
   |
   | Request from frontend origin
   v
Backend
   |
   | CORS check
   v
Allow / Reject
```

The backend configuration therefore needs to know which frontend origin is allowed.

---

# 18. Local CORS Configuration

During local development, the frontend may run on:

```text
http://localhost:5173
```

The backend therefore needs to allow the appropriate frontend origin when local development is being used.

The original FlavorForge frontend configuration used:

```text
http://localhost:5173
```

as the local frontend origin.

---

# 19. Deployed CORS Configuration

The deployed backend configuration uses an environment-specific:

```text
CORS_ORIGIN
```

value.

This allows the same backend application image to be deployed with different environment configuration.

Conceptually:

```text
Backend Image
      |
      +---- Dev configuration
      |
      +---- QA configuration
      |
      +---- Production configuration
```

The application image does not need to be rebuilt simply because the allowed frontend origin changes.

---

# 20. API and Configuration Separation

FlavorForge separates:

```text
Application Code
```

from:

```text
Environment Configuration
```

Application code:

```text
backend/src/
```

Configuration:

```text
environment variables
Kubernetes ConfigMaps
Kubernetes Secrets where required
```

This is important for a DevSecOps implementation because environment-specific values should not be unnecessarily hard-coded into the application.

---

# 21. Health API and Kubernetes

The `/api/health` endpoint becomes particularly important after containerization.

A Kubernetes deployment can expose the backend through:

```text
Backend Pod
    |
    v
Backend Service
    |
    v
/api/health
```

The endpoint can then be used to verify that the deployed backend is responding.

The Kubernetes configuration later adds deployment-level health mechanisms where appropriate.

---

# 22. Health API Through the Deployed Application

Once the application is exposed through the deployed routing configuration, the API can also be reached through the application entry point.

The general flow is:

```text
Browser / curl
      |
      v
Ingress
      |
      v
Backend Service
      |
      v
Backend Pod
      |
      v
/api/health
```

This allows the same API endpoint to be used for local and deployed verification, while the actual URL changes according to the environment.

---

# 23. API Testing

The API should be tested at multiple levels.

### Local API test

```bash
curl http://localhost:3000/api/health
```

### Backend automated tests

```bash
npm test
```

### Deployed API test

Use the appropriate deployed application/API URL and verify that:

```text
HTTP request
      |
      v
Backend
      |
      v
Successful response
```

This provides progressively stronger verification.

---

# 24. API Testing in the CI/CD Pipeline

The backend tests are integrated into the Azure DevOps pipeline.

The pipeline flow includes testing before later delivery stages.

Conceptually:

```text
GitHub
   |
   v
Azure DevOps
   |
   v
Build
   |
   v
Test
   |
   v
Security / Quality
   |
   v
Docker Build
   |
   v
Deployment
```

The purpose is to catch application problems before the application is promoted through the deployment process.

---

# 25. API and SonarCloud

The backend source is also included in the project's code-quality analysis.

The configured SonarCloud source paths include:

```text
backend/src
```

and the backend test path includes:

```text
backend/tests
```

This means the backend implementation participates in the project's code-quality and test-analysis process.

---

# 26. API and Test Coverage

The backend tests contribute to the project's test coverage reporting.

Coverage values may change as the test suite and source code change.

Therefore, this documentation does not treat one historical coverage percentage as a permanent application property.

The important implementation flow is:

```text
Backend Source
      |
      v
Backend Tests
      |
      v
Coverage Data
      |
      v
SonarCloud / CI Quality Analysis
```

---

# 27. API Verification Commands

The following commands are useful during development.

### Check backend directory

```bash
cd ~/flavorforge-azure-devsecops-capstone/backend
```

### Check available scripts

```bash
npm run
```

### Run backend tests

```bash
npm test
```

### Check local health endpoint

```bash
curl http://localhost:3000/api/health
```

### Check HTTP headers

```bash
curl -i http://localhost:3000/api/health
```

The `-i` option displays the HTTP response headers along with the response body.

---

# 28. Understanding HTTP Status

For a successful health request, the backend should return a successful HTTP response.

Conceptually:

```text
HTTP Request
     |
     v
GET /api/health
     |
     v
Backend
     |
     v
2xx Success
```

If the endpoint returns an error, investigate the backend logs and application configuration before changing the deployment.

---

# 29. Common API Problems

## Problem 1 — `Connection refused`

Example:

```text
curl: (7) Failed to connect
```

Possible causes include:

* backend is not running
* backend is listening on a different port
* application startup failed
* incorrect URL

First check the backend process and configured port.

---

## Problem 2 — CORS error in browser

Possible causes:

* frontend origin is not allowed
* incorrect `CORS_ORIGIN`
* frontend is using a different URL than expected
* backend configuration was not updated for the environment

Check:

```text
Frontend Origin
        |
        v
CORS_ORIGIN
        |
        v
Backend
```

---

## Problem 3 — Frontend cannot reach `backend:3000`

Remember that:

```text
backend
```

is useful in the appropriate container networking context.

It is not automatically a valid hostname from every location.

For example:

```text
Browser on developer computer
        X
        |
        | cannot necessarily resolve
        |
backend:3000
```

whereas:

```text
Frontend Container
        |
        v
backend:3000
        |
        v
Backend Container
```

can work when the containers share the appropriate Docker network.

---

# 30. API Security

The API implementation must not expose credentials.

Do not return sensitive information from:

```text
/api/health
```

or other API endpoints.

Do not place:

```text
Passwords
PATs
Azure credentials
Private keys
Database credentials
Connection strings containing secrets
```

into API responses.

Health information should contain only the information necessary for application/deployment verification.

---

# 31. API Architecture Summary

The FlavorForge API architecture can be represented as:

```text
                    FlavorForge
                         |
          +--------------+--------------+
          |                             |
          v                             v
      Frontend                       Backend
   React + Vite                 Node.js + Express
          |                             |
          | HTTP API                    |
          +------------->---------------+
                         |
                         v
                  /api/health
                         |
                         v
                    API Response
```

---

# 32. Local Application Flow

The local application flow is:

```text
Browser
   |
   v
React Frontend
   |
   | API request
   v
localhost:3000
   |
   v
Express
   |
   v
/api/health
   |
   v
JSON Response
```

---

# 33. Docker Application Flow

After containerization:

```text
Browser
   |
   v
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

---

# 34. Kubernetes Application Flow

After Kubernetes deployment:

```text
User
 |
 v
Frontend
 |
 v
Backend Service
 |
 v
Backend Pod
 |
 v
Express
 |
 v
/api/health
```

The Kubernetes section will explain the exact Services, Deployments, ConfigMaps and routing configuration.

---

# 35. What We Have Implemented

The API implementation provides the application communication foundation.

The important implementation points are:

```text
Node.js
   |
   v
Express
   |
   v
API route
   |
   v
GET /api/health
```

The frontend communicates with the backend through a configurable API base URL.

The backend uses CORS configuration to control allowed frontend origins.

The backend can be verified locally and later through Docker and Kubernetes deployments.

---

# 36. Verification Checklist

Before continuing, verify:

* [ ] Backend uses Node.js.
* [ ] Backend uses Express.
* [ ] Backend source is under `backend/src/`.
* [ ] Backend tests are under `backend/tests/`.
* [ ] Backend uses port `3000` according to the project configuration.
* [ ] `/api/health` exists.
* [ ] `/api/health` can be tested locally.
* [ ] Frontend uses an API base URL configuration.
* [ ] Docker configuration uses the appropriate backend address.
* [ ] CORS is configured for the appropriate frontend origin.
* [ ] Backend tests are available.
* [ ] Backend participates in CI testing.
* [ ] Backend source participates in SonarCloud analysis.
* [ ] No credentials are exposed through API responses.

---

# 37. Reviewer Explanation

### "What API did you implement?"

> "The FlavorForge backend is a Node.js and Express API. One of the key endpoints is `GET /api/health`, which I use to verify that the backend is running and responding."

### "How does your frontend communicate with the backend?"

> "The React frontend communicates with the Node.js Express backend through HTTP requests. The backend API base URL is configurable so the application can use the appropriate backend address in different environments."

### "Why do you use CORS?"

> "The frontend and backend can run on different origins, so the backend uses CORS configuration to control which frontend origin is allowed to make browser-based requests."

### "Why is the API URL configurable?"

> "The frontend and backend addresses can change between local development, Docker and Kubernetes. Keeping the API base URL configurable avoids hard-coding one environment's address into the application."

### "How do you verify the API?"

> "Locally, I call `GET /api/health` using curl and also run the backend Jest tests. After deployment, the same health endpoint can be used to verify the deployed backend."

### "Why is the health endpoint useful in DevOps?"

> "It provides a simple application-level verification point. I can use it during local development, container testing and Kubernetes deployment verification to confirm that the backend is actually responding."

---

# 38. Next Step

The API implementation is now documented.

Continue with:

```text
docs/BUILD-JOURNEY/03-application/05-application-testing.md
```

That document will cover how the FlavorForge application was tested before moving into the containerization and deployment stages.
