# Application — Complete Build Journey

## Objective

This document records the application stage of the FlavorForge build journey.

At this stage, we prepared and verified the application before moving to Docker.

The application consists of:

```text
Frontend
    +
Backend
    +
API
    +
Tests
```

The application was later used as the input for:

```text
Application
    ↓
Docker
    ↓
Azure Container Registry
    ↓
AKS / Kubernetes
    ↓
Azure DevOps CI/CD
```

---

# 1. Application Structure

The FlavorForge repository separates the frontend and backend:

```text
flavorforge-azure-devsecops-capstone/
├── frontend/
└── backend/
```

The supporting project directories are:

```text
docker/
kubernetes/
argocd/
docs/
scripts/
.github/
```

The application code itself is primarily inside:

```text
frontend/
backend/
```

---

# 2. Frontend

## What we needed

We needed a frontend for the FlavorForge application.

The frontend was implemented using:

```text
React
+
Vite
```

The frontend source is located in:

```text
frontend/
```

## Step 1 — Check the frontend project

### Command

```bash
cd ~/flavorforge-azure-devsecops-capstone
ls frontend
```

### What happened

This confirmed that the React/Vite frontend exists inside the FlavorForge repository.

### Verify

```bash
ls frontend
```

The frontend project files should be present.

---

## Step 2 — Check the frontend configuration

### Command

```bash
cat frontend/package.json
```

### What happened

The frontend package configuration defines the application dependencies and scripts used by the React/Vite project.

The project also uses `react-router-dom` for frontend routing.

### Verify

```bash
cat frontend/package.json
```

Check the dependencies and scripts defined for the frontend.

---

# 3. Backend

## What we needed

The frontend needed a backend application that could provide the API.

The backend was implemented using:

```text
Node.js
+
Express
```

The backend source is located in:

```text
backend/
```

## Step 1 — Check the backend project

### Command

```bash
ls backend
```

### What happened

This confirmed that the Node.js/Express backend exists separately from the frontend.

### Verify

```bash
ls backend
```

The backend source and configuration files should be present.

---

## Step 2 — Check the backend configuration

### Command

```bash
cat backend/package.json
```

### What happened

This allowed us to verify the backend project configuration, dependencies, scripts, and test setup.

### Verify

```bash
cat backend/package.json
```

The backend configuration should contain the required Node.js/Express application setup and Jest test configuration.

---

# 4. Backend API

## What we needed

The backend needed an endpoint that could be used to verify that the application was responding.

FlavorForge provides:

```text
GET /api/health
```

## Step 1 — Verify the health endpoint

### Command

The endpoint is accessed through HTTP rather than through a Kubernetes command.

For a running FlavorForge backend:

```text
/api/health
```

### What happened

The backend returned application health information.

The response includes application/build information and environment information used later during deployment verification.

### Verify

The health endpoint was later verified through the deployed application:

```text
http://<INGRESS-IP>/api/health
```

The exact external IP depends on the AKS ingress deployment.

---

# 5. Application Configuration

## What we needed

The application needed configuration values that could change between environments.

The frontend uses an API base URL.

The Docker-specific configuration used in the project was:

```text
VITE_API_BASE_URL=http://backend:3000
```

### What happened

This allowed the containerized frontend to communicate with the backend using the backend service/container name instead of depending on a hard-coded external address.

The Docker networking relationship became:

```text
Frontend
   |
   | backend:3000
   v
Backend
```

The Kubernetes environment-specific configuration was handled later through Kubernetes manifests and Kustomize overlays.

---

# 6. Backend Runtime Configuration

The backend uses application configuration values including:

```text
APP_VERSION
BUILD_VERSION
NODE_ENV
PORT
CORS_ORIGIN
```

These values became important when the same application was deployed into:

```text
dev
qa
prod
```

The Kubernetes configuration for these values is documented in the Kubernetes Build Journey.

---

# 7. Backend Tests

## What we needed

Before deploying the application, the backend needed automated tests.

FlavorForge uses:

```text
Jest
```

## Step 1 — Verify the test configuration

### Command

```bash
cat backend/package.json
```

### What happened

The backend package configuration was used to verify the available test configuration.

The project later executed the Jest tests successfully as part of the CI/CD process.

### Verify

```bash
cat backend/package.json
```

Confirm that the backend test configuration is present.

---

# 8. Application Verification Before Docker

At the end of the application stage, the important application components were:

```text
FlavorForge
│
├── frontend/
│   └── React + Vite
│
└── backend/
    └── Node.js + Express
```

The backend exposed:

```text
GET /api/health
```

The backend also contained Jest tests.

The application was therefore ready for the next stage:

```text
Application
     ↓
Docker
```

---

# 9. What We Achieved

The application foundation was established as two separate components:

```text
Frontend
React + Vite
     |
     |
     v
Backend
Node.js + Express
     |
     |
     v
/ api/health
```

The application structure was ready to support separate Docker images and later separate Kubernetes deployments.

---

# 10. Build Journey Result

At the end of the application stage:

```text
Application
│
├── Frontend
│   └── React + Vite
│
├── Backend
│   └── Node.js + Express
│
├── API
│   └── /api/health
│
└── Tests
    └── Jest
```

The next Build Journey stage was:

```text
04-docker/
```

Docker then packaged the frontend and backend separately for deployment.
