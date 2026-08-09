# FlavorForge Frontend — Complete Setup Guide

## Objective

This document explains how the FlavorForge frontend was created, configured, and verified.

The frontend is the user-facing part of the FlavorForge application.

The implementation uses:

```text
React
+
Vite
```

The frontend is maintained separately from the Node.js/Express backend.

The frontend later becomes its own Docker image and Kubernetes workload.

The journey is:

```text
React + Vite
      |
      v
Frontend Configuration
      |
      v
Local Frontend Verification
      |
      v
Docker Image
      |
      v
Kubernetes Deployment
      |
      v
Running Application
```

---

# 1. Frontend Technology

The FlavorForge frontend uses:

```text
React
Vite
```

React provides the frontend application framework.

Vite is used as the frontend development and build tool.

The frontend is located in:

```text
frontend/
```

---

# 2. Frontend Location in the Repository

The overall repository contains the frontend as a separate application component:

```text
flavorforge-azure-devsecops-capstone/
│
├── frontend/
│
├── backend/
│
├── docker/
├── kubernetes/
├── argocd/
├── docs/
├── scripts/
├── .github/
├── azure-pipelines.yml
└── README.md
```

The frontend-specific source code is maintained under:

```text
frontend/
```

---

# 3. Frontend Project Structure

The frontend follows the normal React/Vite project structure used by FlavorForge.

The important areas include:

```text
frontend/
│
├── src/
│
├── public/
│
├── package.json
├── package-lock.json
├── vite.config.*
└── Dockerfile
```

The exact files present in the current repository should always be treated as the source of truth.

Do not create files simply because they are shown in a generic example.

---

# 4. React Application

The frontend application is implemented using React.

React is responsible for rendering the user interface and handling frontend application behavior.

Conceptually:

```text
Browser
   |
   v
React Application
   |
   +---- UI
   |
   +---- User Interaction
   |
   +---- API Communication
```

The frontend does not directly implement the backend API.

Instead, it communicates with the backend through HTTP requests.

---

# 5. Vite

Vite is used as the frontend build tool.

The development flow is:

```text
React Source Code
       |
       v
Vite Development Server
       |
       v
Browser
```

For a production build:

```text
React Source Code
       |
       v
Vite Build
       |
       v
Production Static Files
```

The production files are later served by the frontend container.

---

# 6. Frontend Package Configuration

The frontend dependencies and scripts are defined in:

```text
frontend/package.json
```

This file is important because it defines:

* the project metadata
* frontend dependencies
* development dependencies
* application scripts
* the build command
* the development command

The exact package versions should be taken from the project's actual `package.json`.

For the FlavorForge implementation, the frontend uses React and Vite-related dependencies.

---

# 7. React Router

The FlavorForge frontend uses:

```text
react-router-dom
```

The project version recorded during the implementation was:

```text
7.18.1
```

React Router is used to support frontend routing.

This allows different application views/routes to be handled by the React application rather than requiring separate server-side pages.

---

# 8. Frontend Source Code

The main frontend source code is under:

```text
frontend/src/
```

This is where the React application components and application logic are maintained.

The exact source structure should be taken from the repository rather than recreated from this documentation.

The important principle is:

```text
frontend/src/
      |
      v
React Application Source
```

---

# 9. Frontend API Configuration

The frontend needs to know where the backend API is located.

This is handled through an API base URL configuration rather than hard-coding a deployment-specific backend address into the application.

The Docker-specific configuration used during the FlavorForge implementation was:

```text
VITE_API_BASE_URL=http://backend:3000
```

This value is important when the frontend and backend are running as Docker containers on the same Docker network.

The relationship is:

```text
Frontend Container
       |
       | http://backend:3000
       v
Backend Container
```

Here:

```text
backend
```

is the backend container/service hostname.

---

# 10. Why `backend:3000` Is Used

Inside a Docker network, containers can communicate using the service/container name.

Therefore:

```text
http://backend:3000
```

means:

```text
backend
   |
   v
Backend service/container
   |
   v
Port 3000
```

This is different from using:

```text
localhost
```

inside the frontend container.

`localhost` inside a container refers to that same container, not another container.

Therefore, when the frontend runs inside Docker, the backend must be reachable through the Docker network configuration.

---

# 11. Local Development vs Container Configuration

The frontend has different runtime contexts.

### Local development

The frontend runs directly on the developer machine using the Vite development server.

Conceptually:

```text
Browser
   |
   v
Vite
   |
   v
React
   |
   v
Backend API
```

### Docker

The frontend runs inside a container.

The Docker-specific API configuration is:

```text
VITE_API_BASE_URL=http://backend:3000
```

The communication becomes:

```text
Browser
   |
   v
Frontend
   |
   | Docker network
   v
backend:3000
```

### Kubernetes

The frontend and backend are eventually deployed as Kubernetes workloads.

The Kubernetes environment has its own service/configuration mechanism.

Therefore, the Docker hostname should not automatically be treated as the final external production URL.

---

# 12. Frontend Environment Files

The FlavorForge implementation included Docker-specific frontend configuration using:

```text
.env.docker
```

The relevant configuration was:

```text
VITE_API_BASE_URL=http://backend:3000
```

Environment files must be handled carefully.

Do not commit credentials or secrets into frontend environment files.

Also remember that Vite environment variables beginning with:

```text
VITE_
```

are intended for frontend build-time exposure.

Therefore, sensitive credentials must never be placed in frontend `VITE_*` variables.

---

# 13. Frontend CORS Relationship

The frontend communicates with the backend through HTTP.

The backend therefore needs to permit requests from the appropriate frontend origin.

During the initial local application setup, the backend CORS configuration referenced:

```text
http://localhost:5173
```

This corresponds to the normal Vite development server address.

Conceptually:

```text
Frontend
http://localhost:5173
        |
        | HTTP request
        v
Backend
http://localhost:3000
```

The backend's CORS configuration is documented in the backend section.

---

# 14. Frontend Development Server

During local development, Vite provides the frontend development server.

The standard development command is defined by the project's `package.json`.

The exact command should be taken from:

```text
frontend/package.json
```

rather than assumed from a generic React project.

The purpose of the development server is to:

* serve the React application
* support local development
* rebuild the application when source changes
* make the application available to the browser

---

# 15. Frontend Production Build

The frontend is eventually built into production-ready static assets.

The conceptual process is:

```text
React Source
      |
      v
Vite Build
      |
      v
Production Assets
      |
      v
Nginx
      |
      v
Browser
```

The production build is later packaged into the frontend Docker image.

---

# 16. Frontend Docker Architecture

The FlavorForge frontend uses a multi-stage Docker build.

The implementation uses:

```text
node:22-alpine
```

for the build stage.

The final frontend image uses:

```text
nginx:1.29-alpine
```

The conceptual Dockerfile flow is:

```text
                Frontend Dockerfile
                       |
                       v
              Node 22 Alpine
                       |
                       v
              Install Dependencies
                       |
                       v
                 Vite Build
                       |
                       v
              Production Assets
                       |
                       v
             Nginx 1.29 Alpine
                       |
                       v
             Final Frontend Image
```

This keeps the production image focused on serving the built frontend rather than carrying the complete Node.js build environment.

---

# 17. Why a Multi-Stage Docker Build Is Used

A multi-stage build separates:

```text
Build Environment
```

from:

```text
Runtime Environment
```

The build stage needs Node.js and the frontend build tooling.

The final runtime only needs to serve the generated static files.

Conceptually:

```text
Build Stage
Node.js
npm
Vite
React
    |
    | build
    v
dist/
    |
    v
Runtime Stage
Nginx
```

This helps keep the runtime image smaller and avoids carrying unnecessary build tooling into production.

---

# 18. Frontend Port

The frontend production container is served through Nginx.

The container configuration therefore needs to expose the appropriate HTTP port.

The exact Docker and Kubernetes port mappings should be taken from the actual project configuration.

Do not assume that the external application port is the same as the container's internal port.

The deployment layers may map:

```text
External Port
      |
      v
Kubernetes Service
      |
      v
Container Port
      |
      v
Nginx
```

---

# 19. Frontend Build Verification

Before moving to Docker, verify that the frontend can be built successfully.

The build process should:

```text
Install Dependencies
        |
        v
Run Vite Build
        |
        v
Generate Production Assets
```

A successful build confirms that the frontend source and its build configuration are valid.

---

# 20. Important Build Issue Encountered Later

During the Azure DevOps pipeline implementation, the frontend Docker build encountered a Node.js version-selection problem.

The pipeline explicitly requested:

```text
Node 22.x
```

through:

```text
UseNode@1
```

However, pipeline logs showed:

```text
Host Selected Node version: Node24
```

This caused Vite/frontend build compatibility issues.

This issue belongs to the CI/CD stage rather than the initial frontend creation stage.

The important lesson is:

```text
Requested Node Version
        ≠
Actual Node Version
```

unless the pipeline logs confirm the selected runtime.

Therefore, version verification is important in CI/CD.

---

# 21. Frontend Verification Before Docker

Before containerizing the frontend, verify:

```text
React application starts
        |
        v
Frontend loads in browser
        |
        v
Frontend configuration is correct
        |
        v
API configuration is correct
        |
        v
Production build succeeds
```

Only after the frontend works locally should Docker packaging be treated as the next stage.

---

# 22. Frontend → Backend Flow

The complete application flow at this stage is:

```text
                    Browser
                       |
                       v
                React Frontend
                       |
                       | HTTP API
                       v
                Node.js Backend
                       |
                       v
                 Express API
                       |
                       v
                  /api/health
```

When Docker is introduced:

```text
                    Browser
                       |
                       v
              Frontend Container
                       |
                       | backend:3000
                       v
              Backend Container
```

When Kubernetes is introduced later:

```text
                    Browser
                       |
                       v
                Ingress / Service
                       |
                       v
              Frontend Deployment
                       |
                       v
               Backend Service
                       |
                       v
              Backend Deployment
```

Each layer is introduced separately so that failures can be isolated.

---

# 23. What Was Established in This Step

The frontend foundation consists of:

```text
React
Vite
react-router-dom
frontend source code
frontend API configuration
Docker-specific API configuration
local development configuration
production build process
```

The frontend is therefore ready to be verified independently before containerization.

---

# 24. What Is Not Covered Yet

This document does not explain the complete backend implementation.

That is the next document:

```text
03-backend-setup.md
```

It also does not yet explain:

```text
Docker image build
Azure Container Registry
Kubernetes
Kustomize
Azure DevOps
SonarCloud
Trivy
Argo CD
```

Those are documented later in the Build Journey.

---

# 25. Reviewer Explanation

### "What technology did you use for the frontend?"

> "The frontend uses React with Vite as the build tool. React handles the application UI and Vite handles the development server and production build."

### "How does your frontend communicate with the backend?"

> "The frontend communicates with the Node.js and Express backend through HTTP API calls. The API base URL is configuration-driven."

### "Why did you use `http://backend:3000`?"

> "That value is used for the Docker environment. Inside the Docker network, the frontend can reach the backend using the backend service or container hostname rather than localhost."

### "Why can't the frontend container use localhost for the backend?"

> "Because localhost inside a container refers to that same container. The backend is running in a separate container, so the frontend needs to use the backend's Docker network hostname."

### "Why did you use Nginx?"

> "The React application is compiled into static production assets. Nginx is used as the lightweight runtime server for those assets."

### "Why did you use a multi-stage Docker build?"

> "The first stage contains the Node.js and Vite build environment. The final stage contains only the generated frontend assets and Nginx, so build-time tooling doesn't need to be included in the runtime image."

### "What happened with Node 22 and Node 24?"

> "The Docker build used Node 22 Alpine, while the Azure DevOps pipeline initially selected Node 24 despite the YAML requesting Node 22.x. The pipeline logs exposed the mismatch, which was then treated as a CI/CD runtime compatibility issue."

---

# 26. Frontend Setup Complete

The frontend foundation is now documented:

```text
React
   |
   v
Vite
   |
   v
Frontend Source
   |
   v
API Configuration
   |
   v
Local Build
   |
   v
Docker-ready Frontend
```

The next application component is the backend.

Continue with:

```text
docs/BUILD-JOURNEY/03-application/03-backend-setup.md
```
