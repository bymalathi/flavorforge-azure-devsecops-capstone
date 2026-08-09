# Backend Setup — Complete Beginner Build Guide

## Objective

This document explains how the FlavorForge backend was created, configured, and verified.

The backend provides the API layer for the FlavorForge application.

The implementation uses:

```text
Node.js
Express
```

The backend runs separately from the React frontend.

The overall application architecture is:

```text
User
 |
 v
React Frontend
 |
 | HTTP API request
 v
Node.js + Express Backend
 |
 v
API Response
 |
 v
React Frontend
```

---

# 1. Backend Role in FlavorForge

The backend is responsible for providing the application's API.

The backend is separated from the frontend so that:

* frontend code handles the user interface
* backend code handles API requests
* frontend and backend can be built separately
* frontend and backend can be containerized separately
* Kubernetes can deploy them as separate workloads

The project structure contains:

```text
frontend/
backend/
```

The backend source code is maintained inside:

```text
backend/
```

---

# 2. Backend Technology

The FlavorForge backend uses:

```text
Node.js
Express
```

Node.js provides the JavaScript runtime.

Express provides the HTTP server and API framework.

The backend is therefore structured approximately as:

```text
backend
├── src
├── tests
├── package.json
└── ...
```

The exact contents may evolve as the project is developed.

---

# 3. Backend Directory

From the WSL terminal, move into the backend directory:

```bash
cd ~/flavorforge-azure-devsecops-capstone/backend
```

Verify the location:

```bash
pwd
```

The expected path is similar to:

```text
/home/YOUR_USERNAME/flavorforge-azure-devsecops-capstone/backend
```

The username and home directory can differ between systems.

---

# 4. Verify Node.js

Check the installed Node.js version:

```bash
node --version
```

The FlavorForge project uses the Node.js 22.x line for its application/build configuration.

The Docker build also uses:

```text
node:22-alpine
```

for the frontend build stage.

The exact locally installed Node.js patch version may differ.

---

# 5. Verify npm

Check npm:

```bash
npm --version
```

npm is used to install the backend dependencies defined by the project.

---

# 6. Backend `package.json`

The backend project uses a `package.json` file to define its Node.js project configuration.

The file is located at:

```text
backend/package.json
```

It defines information required to install and run the backend application.

The important concept is:

```text
package.json
      |
      +---- project configuration
      |
      +---- dependencies
      |
      +---- scripts
      |
      v
npm
      |
      v
Node.js backend
```

Do not manually recreate dependency versions from memory.

The repository's existing:

```text
backend/package.json
```

is the source of truth for the actual dependency configuration.

---

# 7. Install Backend Dependencies

From the backend directory, install the dependencies using the project's package configuration.

Run:

```bash
npm install
```

npm reads:

```text
package.json
```

and installs the required packages.

The installed dependencies are normally placed under:

```text
backend/node_modules/
```

`node_modules` is a generated local directory and should not be committed to Git.

The repository's `.gitignore` should prevent it from being added.

---

# 8. Backend Source Code

The backend application source is maintained under:

```text
backend/src/
```

The backend contains the Express application and its supporting source code.

The project also contains:

```text
backend/tests/
```

for backend tests.

The source and test separation allows the application and its automated verification to be maintained independently.

---

# 9. Express Application

The backend uses Express to create the HTTP API server.

The general flow is:

```text
Node.js
   |
   v
Express
   |
   v
HTTP Server
   |
   +---- API routes
   |
   +---- Health endpoint
   |
   v
HTTP response
```

The actual implementation should be taken from the current files under:

```text
backend/src/
```

rather than recreated manually.

---

# 10. Health Endpoint

One of the important backend endpoints is:

```text
/api/health
```

The endpoint is used to verify that the backend application is running and responding to HTTP requests.

A health request follows this flow:

```text
Client
  |
  | GET /api/health
  v
Express Backend
  |
  v
Health Response
```

This endpoint becomes especially useful later when the application is deployed to:

```text
Docker
      |
      v
Kubernetes
      |
      v
AKS
```

and when the deployment needs to be verified.

---

# 11. Local Backend Port

The backend application uses:

```text
PORT=3000
```

as the application port in the project configuration.

The backend therefore listens on port:

```text
3000
```

when running locally according to the configured environment.

The application configuration should be taken from the project's actual configuration files rather than hard-coding values into documentation.

---

# 12. Start the Backend Locally

From:

```text
backend/
```

run the project's configured start command.

For example, inspect the available scripts first:

```bash
npm run
```

Then use the appropriate script defined in:

```text
backend/package.json
```

The exact command should come from the repository's current `package.json`.

This avoids documenting a command that does not match the actual implementation.

---

# 13. Verify the Backend Is Running

Once the backend is started, verify the health endpoint.

Using curl:

```bash
curl http://localhost:3000/api/health
```

A successful response should return the backend health information configured by the application.

The exact JSON response can change as the application version or environment configuration changes.

The important verification is:

```text
HTTP request
     |
     v
localhost:3000
     |
     v
/api/health
     |
     v
Successful API response
```

---

# 14. Why the Health Endpoint Matters

The health endpoint is useful throughout the FlavorForge build.

During local development:

```text
Developer
   |
   v
curl localhost:3000/api/health
```

During Docker testing:

```text
Docker Container
   |
   v
/api/health
```

During Kubernetes deployment:

```text
AKS Pod
   |
   v
/api/health
```

During production verification:

```text
Ingress
   |
   v
Backend Service
   |
   v
/api/health
```

Therefore, the same endpoint provides a simple way to verify backend availability across multiple deployment stages.

---

# 15. Backend Configuration

The backend requires configuration values such as:

```text
PORT
NODE_ENV
CORS_ORIGIN
APP_VERSION
BUILD_VERSION
```

The exact values depend on the environment.

For example, the deployed FlavorForge backend configuration included values such as:

```text
PORT=3000
NODE_ENV=production
APP_VERSION=1.3
BUILD_VERSION=1.3
```

These values were later supplied through Kubernetes configuration rather than embedding environment-specific configuration directly into the application image.

---

# 16. Local vs Kubernetes Configuration

It is important to distinguish application code from deployment configuration.

### Application code

Stored under:

```text
backend/src/
```

### Application package configuration

Stored in:

```text
backend/package.json
```

### Kubernetes configuration

Stored under:

```text
kubernetes/
```

The application image should remain reusable across environments.

Environment-specific configuration is supplied by the deployment environment.

The later Kubernetes documentation explains how this is implemented using Kubernetes configuration resources.

---

# 17. CORS Configuration

The backend needs to allow requests from the frontend.

The project therefore uses a CORS configuration.

The backend's CORS configuration is environment-dependent.

For example, during local development the frontend may communicate from:

```text
http://localhost:5173
```

while the deployed environment uses the appropriate deployed frontend origin.

The important design principle is:

```text
Frontend Origin
       |
       v
CORS Configuration
       |
       v
Backend API
```

The actual production value should come from the deployment configuration rather than being permanently hard-coded for every environment.

---

# 18. Backend Tests

The backend contains automated tests under:

```text
backend/tests/
```

The project uses Jest for backend testing.

The purpose of these tests is to verify backend behavior automatically.

The test flow is:

```text
Backend Source
      |
      v
Jest Tests
      |
      v
Pass / Fail
```

These tests are also used later in the Azure DevOps pipeline.

---

# 19. Run Backend Tests

From the backend directory:

```bash
npm test
```

The exact test command is defined by the project's `package.json`.

A successful run should report that the configured tests passed.

The pipeline later executes the same project test configuration as part of the CI process.

---

# 20. Backend Testing in CI

The backend tests are not only for local development.

The Azure DevOps pipeline includes a testing stage.

The overall flow becomes:

```text
Developer
    |
    v
GitHub
    |
    v
Azure DevOps Pipeline
    |
    v
Backend Tests
    |
    +---- Pass --> continue
    |
    +---- Fail --> pipeline stops
```

This prevents a known failing test suite from silently progressing through the later stages of the pipeline.

---

# 21. Backend and Frontend Separation

FlavorForge intentionally separates the two application components.

```text
frontend/
   |
   | React + Vite
   |
   v
Frontend Container


backend/
   |
   | Node.js + Express
   |
   v
Backend Container
```

This separation later maps naturally to Kubernetes:

```text
Frontend Deployment
        |
        v
Frontend Service

Backend Deployment
        |
        v
Backend Service
```

The frontend communicates with the backend through the API.

---

# 22. Backend Docker Preparation

The backend is eventually containerized separately from the frontend.

The conceptual flow is:

```text
backend/
   |
   v
Dockerfile
   |
   v
Backend Docker Image
   |
   v
Azure Container Registry
   |
   v
AKS
```

The exact Docker implementation belongs to the Docker section of the BUILD-JOURNEY.

This document focuses on establishing and verifying the backend application itself before containerization.

---

# 23. Backend Verification Flow

The basic backend verification flow is:

```text
1. Enter backend directory
        |
        v
2. Verify Node.js
        |
        v
3. Install dependencies
        |
        v
4. Start backend
        |
        v
5. Call /api/health
        |
        v
6. Run backend tests
        |
        v
7. Confirm successful response
```

---

# 24. Useful Commands

### Enter backend

```bash
cd ~/flavorforge-azure-devsecops-capstone/backend
```

### Check Node.js

```bash
node --version
```

### Check npm

```bash
npm --version
```

### Install dependencies

```bash
npm install
```

### Display available npm scripts

```bash
npm run
```

### Run tests

```bash
npm test
```

### Test health endpoint

```bash
curl http://localhost:3000/api/health
```

The exact application start command should always be taken from:

```text
backend/package.json
```

---

# 25. Common Problems

## Problem 1 — `node` command not found

Verify:

```bash
node --version
```

If Node.js is not installed, complete the prerequisite/tool installation step before continuing.

---

## Problem 2 — `npm install` fails

Check:

```bash
node --version
npm --version
```

Then review the npm error message.

Do not delete project files blindly.

The dependency versions should be determined by:

```text
backend/package.json
```

---

## Problem 3 — Port 3000 is already in use

The backend expects port:

```text
3000
```

Check which process is using the port before stopping anything.

For example:

```bash
sudo lsof -i :3000
```

Do not terminate an unknown process without understanding what it is.

---

## Problem 4 — `/api/health` does not respond

Check:

1. Is the backend process running?
2. Is it listening on port 3000?
3. Is the URL correct?
4. Did the application start successfully?
5. Are there startup errors in the terminal?

Then retry:

```bash
curl http://localhost:3000/api/health
```

---

## Problem 5 — Frontend cannot call backend

Check:

```text
Frontend API URL
        |
        v
Backend URL
        |
        v
CORS configuration
```

For local development, verify that the configured frontend origin matches the backend CORS configuration.

Do not solve the problem by disabling CORS globally.

---

# 26. Security Considerations

Do not place secrets directly into backend source code.

Do not commit:

```text
Passwords
API keys
Tokens
Azure credentials
Database credentials
Private keys
```

Environment-specific values should be supplied through the appropriate configuration mechanism.

The backend source repository should remain safe to push to GitHub.

---

# 27. Reviewer Explanation

### "Why did you create a separate backend?"

> "I separated the backend from the React frontend so the API layer can be developed, tested, containerized and deployed independently."

### "What technology does your backend use?"

> "The FlavorForge backend uses Node.js with Express."

### "How do you verify that the backend is working?"

> "I run the backend locally and call the `/api/health` endpoint. I also run the backend Jest tests to verify the application behavior."

### "Why is `/api/health` important?"

> "It provides a simple endpoint to verify that the backend is running and responding. The same type of health verification is useful later when the application runs in Docker and Kubernetes."

### "Where are the backend tests?"

> "The backend tests are maintained under `backend/tests/` and are executed using the project's Jest configuration."

### "How does the frontend communicate with the backend?"

> "The React frontend communicates with the Node.js Express backend through HTTP API requests. CORS configuration controls which frontend origin is allowed to call the backend."

---

# 28. Backend Build Result

At the end of this step, the project should have:

```text
FlavorForge
│
├── frontend/
│
└── backend/
    ├── src/
    ├── tests/
    ├── package.json
    └── ...
```

The backend should be capable of:

```text
Starting locally
      |
      v
Listening on port 3000
      |
      v
Serving /api/health
      |
      v
Passing configured backend tests
```

---

# 29. What We Have Completed

The backend application foundation is now documented.

The implementation flow is:

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
   +---- Tests
   |
   v
Local Verification
```

The backend is now ready for the next application step.

---

# 30. Next Step

Continue with:

```text
docs/BUILD-JOURNEY/03-application/04-api-implementation.md
```

That document explains the API implementation and how the frontend and backend communicate.
