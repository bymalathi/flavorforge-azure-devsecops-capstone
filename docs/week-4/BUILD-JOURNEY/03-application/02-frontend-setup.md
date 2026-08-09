# FlavorForge Frontend — Complete Build Journey

## Objective

This document records the **actual frontend setup and verification work** for FlavorForge.

The frontend is located in:

```text
frontend/
```

The application uses:

```text
React
Vite
react-router-dom
```

The focus of this document is the commands and configuration that were part of the FlavorForge implementation.

---

## Step 1 — Verify the frontend project

### Command

The original terminal command used to create the frontend project is not established in the available FlavorForge evidence, so it is not reproduced here.

The repository itself establishes that the frontend exists under:

```text
frontend/
```

### What happened

The FlavorForge repository contains a separate frontend application.

The frontend is maintained independently from the Node.js/Express backend.

### Verify

```text
frontend/
```

Expected project structure includes the frontend source and package configuration.

---

## Step 2 — Configure the frontend dependencies

### File

```text
frontend/package.json
```

### What happened

The frontend package configuration contains the React/Vite application dependencies and scripts.

The FlavorForge implementation also uses:

```text
react-router-dom
```

with the project version recorded as:

```text
7.18.1
```

### Verify

Check the existing file:

```text
frontend/package.json
```

The repository's `package.json` is the source of truth for the installed dependencies and available npm scripts.

---

## Step 3 — Configure the frontend API base URL

### File

```text
frontend/.env.docker
```

### Configuration

```text
VITE_API_BASE_URL=http://backend:3000
```

### What happened

The Docker-specific frontend configuration was created so the frontend can communicate with the backend using the Docker network hostname:

```text
backend
```

and backend port:

```text
3000
```

The resulting communication path is:

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

and confirm it contains:

```text
VITE_API_BASE_URL=http://backend:3000
```

---

## Step 4 — Configure local frontend API access

### Configuration

The initial local backend CORS configuration used:

```text
http://localhost:5173
```

### What happened

This allowed the Vite frontend running locally to communicate with the backend during local development.

The local application flow was:

```text
Frontend
http://localhost:5173
       |
       | HTTP
       v
Backend
http://localhost:3000
```

### Verify

The corresponding backend CORS configuration is part of the backend implementation and should be checked in the backend source/configuration.

---

## Step 5 — Verify the frontend build configuration

### Command

The exact original frontend build command is not preserved in the available evidence, so a command is not claimed here.

The build configuration is established by the frontend project and its `package.json`.

### What happened

The frontend is a Vite application and is later built into production static assets.

The production build is then used by the frontend Docker image.

### Verify

Check:

```text
frontend/package.json
```

for the project's actual build script.

---

## Step 6 — Frontend Docker build configuration

### Files

```text
frontend/
```

and the frontend Docker configuration.

The implemented frontend container uses:

```text
node:22-alpine
```

for the build stage and:

```text
nginx:1.29-alpine
```

for the runtime stage.

### What happened

The frontend is built using Node.js/Vite and the generated production files are served by Nginx.

The flow is:

```text
React Source
     |
     v
Node 22 Alpine
     |
     v
Vite Build
     |
     v
Production Files
     |
     v
Nginx 1.29 Alpine
```

### Verify

Check the frontend Docker configuration in the repository and confirm the implemented base images:

```text
node:22-alpine
nginx:1.29-alpine
```

---

## Step 7 — Verify the frontend after deployment

The deployed FlavorForge frontend was eventually exposed through Kubernetes/Ingress.

The repository contains browser evidence for the deployed application.

### Verify

The frontend was verified through the deployed application URL represented by the existing screenshot:

![FlavorForge frontend in browser](/screenshots/kubernetes/nginx-ingress/4-frontend-http-4-157-77-48.png)

### What happened

The screenshot provides evidence that the deployed frontend was reachable through the external application endpoint.

This verification belongs to the later Kubernetes deployment stage, but it confirms that the frontend built during this application stage eventually became part of the running FlavorForge application.

---

## Frontend Setup Result

At the end of the frontend setup, FlavorForge had:

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
Docker-ready frontend
```

The important frontend configuration established during the implementation was:

```text
VITE_API_BASE_URL=http://backend:3000
```

The frontend was then used as the input to the Docker stage, where it was packaged into its own image using Node.js for the build stage and Nginx for serving the production files.

The next application document is:

```text
03-backend-setup.md
```
