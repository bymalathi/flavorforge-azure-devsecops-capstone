# FlavorForge Frontend — Complete Build Journey

## Objective

This document records the frontend setup and verification work for the FlavorForge application.

The frontend is located in:

```text
frontend/
```

The frontend application uses:

```text
React
Vite
react-router-dom
```

The frontend was prepared as a separate application from the Node.js/Express backend and was later packaged into its own Docker image.

---

# 1. Frontend Application

## What we wanted

FlavorForge required a web-based frontend that could communicate with the backend API.

The frontend was implemented using:

```text
React
+
Vite
```

The frontend is maintained separately from the backend:

```text
flavorforge-azure-devsecops-capstone/
├── frontend/
└── backend/
```

---

# 2. Frontend Project

## Step 1 — Verify the frontend directory

### Project location

```text
frontend/
```

### What happened

The FlavorForge repository contains the frontend application under the `frontend/` directory.

The frontend and backend are maintained as separate application components.

### Verify

The frontend project can be inspected from:

```text
frontend/
```

The directory contains the frontend source code and project configuration.

---

# 3. Frontend Package Configuration

## Step 1 — Check `package.json`

### File

```text
frontend/package.json
```

### What happened

The frontend package configuration defines the React/Vite application dependencies and npm scripts.

The FlavorForge frontend also uses:

```text
react-router-dom
```

The project version recorded for this dependency is:

```text
7.18.1
```

### Verify

Check the existing file:

```text
frontend/package.json
```

The repository's `package.json` is the source of truth for the frontend dependencies and available npm scripts.

---

# 4. Frontend Routing

## What we needed

The application required frontend routing so that different application views could be handled by the React application.

FlavorForge uses:

```text
react-router-dom
```

### What happened

The frontend routing functionality was implemented using the project's React Router dependency.

### Verify

Check:

```text
frontend/package.json
```

and the frontend source files that use the routing dependency.

---

# 5. Frontend API Configuration

## What we needed

The frontend needed a way to communicate with the backend API.

The Docker-specific frontend configuration is stored in:

```text
frontend/.env.docker
```

### Configuration

```text
VITE_API_BASE_URL=http://backend:3000
```

### What happened

This configuration allows the containerized frontend to use the backend service hostname:

```text
backend
```

with the backend listening on:

```text
3000
```

The intended communication path is:

```text
Frontend
    |
    | http://backend:3000
    v
Backend
```

### Verify

Check:

```text
frontend/.env.docker
```

and confirm:

```text
VITE_API_BASE_URL=http://backend:3000
```

---

# 6. Local Frontend and Backend Communication

During local development, the frontend used the Vite development server.

The local frontend address was:

```text
http://localhost:5173
```

The backend CORS configuration initially allowed:

```text
http://localhost:5173
```

### What happened

This allowed the locally running frontend to communicate with the backend during development.

The local application flow was:

```text
Frontend
http://localhost:5173
       |
       | HTTP request
       v
Backend
http://localhost:3000
```

### Verify

The corresponding CORS configuration can be checked in the backend implementation.

---

# 7. Frontend Build Configuration

## What we needed

The React application needed to be converted into production-ready static files before being served by the production web server.

The FlavorForge frontend uses Vite for the production build.

### What happened

The frontend application is structured as a Vite project and is later built into production static assets.

The production build output is used by the frontend Docker image.

### Verify

Check:

```text
frontend/package.json
```

for the project's actual build script.

The `package.json` remains the source of truth for the configured frontend build command.

---

# 8. Preparation for Docker

The frontend was prepared to be packaged separately from the backend.

The implemented frontend container uses:

```text
node:22-alpine
```

for the build stage and:

```text
nginx:1.29-alpine
```

for serving the production files.

The resulting flow is:

```text
React Source
     |
     v
Node.js 22 Alpine
     |
     v
Vite Production Build
     |
     v
Static Frontend Files
     |
     v
Nginx 1.29 Alpine
```

The detailed Dockerfile implementation is documented in the Docker Build Journey.

---

# 9. Frontend Verification

At the application stage, the important frontend components were verified as part of the FlavorForge project structure and configuration.

The frontend contains:

```text
React
Vite
react-router-dom
API configuration
```

The Docker-specific API configuration is:

```text
VITE_API_BASE_URL=http://backend:3000
```

The frontend was then prepared for the Docker packaging stage.

---

# 10. Frontend Deployment Evidence

The frontend was later deployed as part of the complete FlavorForge application through Docker, Kubernetes, and Ingress.

The deployed frontend was verified through the running application.

### Screenshot / Evidence

Use the actual frontend verification screenshot from the repository here:


### Screenshot / Evidence

![React application running](/screenshots/frontend/03-react-application-running.png)

![Frontend project structure](/screenshots/frontend/04-frontend-enterprise-structure.png)

![Frontend backend build success](/screenshots/frontend/30-frontend-backend-build-success.png)

![Frontend build success](/screenshots/frontend/32-build-success.png)

The screenshot should be replaced with the actual filename used in the FlavorForge screenshot inventory.

This deployment verification belongs to the later Kubernetes stage; it is included here only as evidence that the frontend created during this stage became part of the running FlavorForge application.

---

# 11. Frontend Setup Result

At the end of the frontend application stage, FlavorForge had a separate frontend application:

```text
frontend/
    |
    +-- React
    |
    +-- Vite
    |
    +-- react-router-dom
    |
    +-- API configuration
    |
    +-- Docker-specific configuration
    |
    v
Frontend ready for Docker packaging
```

The important frontend configuration established during the implementation was:

```text
VITE_API_BASE_URL=http://backend:3000
```

The frontend was ready to move into the Docker stage, where it was packaged into its own container image.

---

# 12. Build Journey Result

The frontend portion of the FlavorForge application was established as:

```text
FlavorForge Frontend
        |
        +-- React
        |
        +-- Vite
        |
        +-- react-router-dom
        |
        +-- API configuration
        |
        v
Ready for Docker
```

The next application document is:

```text
02-backend-setup.md
```

The next major Build Journey phase after the application setup is:

```text
04-docker/
```
