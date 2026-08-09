# Application — Complete Build Journey

## Objective

This document explains how the FlavorForge application was structured and prepared before the Docker, Azure, Kubernetes, and CI/CD stages were introduced.

The purpose of this document is to establish the application foundation clearly so that another person can understand:

* what the application does
* which technologies were used
* how the frontend and backend are separated
* how the frontend communicates with the backend
* where the application source code is located
* which parts are later containerized
* which application endpoints are used for verification

The application is the foundation of the entire FlavorForge DevSecOps implementation.

The overall journey is:

```text
Application
    |
    +---- Frontend
    |
    +---- Backend
    |
    +---- API
    |
    +---- Tests
    |
    v
Docker
    |
    v
Azure Container Registry
    |
    v
AKS / Kubernetes
    |
    v
Azure DevOps CI/CD
    |
    v
DevSecOps Deployment
```

---

# 1. What Is FlavorForge?

FlavorForge is the application used as the foundation for the Azure DevSecOps capstone project.

The project combines an application with the infrastructure and DevSecOps tooling required to build, test, scan, package, deploy, and verify it.

The application consists primarily of:

```text
Frontend
    +
Backend
    +
API
```

The frontend provides the user interface.

The backend provides the server-side application and API.

The backend and frontend are packaged separately later using Docker.

---

# 2. Application Technology Stack

The application uses:

| Component           | Technology          |
| ------------------- | ------------------- |
| Frontend            | React               |
| Frontend build tool | Vite                |
| Backend             | Node.js             |
| Backend framework   | Express             |
| API                 | REST-style HTTP API |
| Backend testing     | Jest                |
| Containerization    | Docker              |
| Source control      | Git / GitHub        |

The infrastructure and DevSecOps technologies are documented separately.

They include:

```text
Azure
Azure Container Registry
Azure Kubernetes Service
Kubernetes
Kustomize
Azure DevOps
SonarCloud
Trivy
Argo CD
```

---

# 3. Application Repository Structure

The FlavorForge repository contains separate areas for the application and its supporting infrastructure.

The important application directories are:

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
├── argocd/
│
├── docs/
│
├── scripts/
│
├── .github/
│
├── azure-pipelines.yml
│
└── README.md
```

The application itself is primarily contained in:

```text
frontend/
backend/
```

The other directories support the application's containerization, deployment, automation, documentation, and DevSecOps workflow.

---

# 4. Frontend

The FlavorForge frontend was implemented using:

```text
React
+
Vite
```

The frontend is responsible for:

* displaying the application UI
* accepting user interaction
* communicating with the backend API
* displaying backend responses
* providing the user-facing application experience

The frontend source code is maintained separately from the backend.

The primary location is:

```text
frontend/
```

---

# 5. Backend

The backend was implemented using:

```text
Node.js
+
Express
```

The backend is responsible for:

* running the server
* exposing API endpoints
* processing requests
* returning responses to the frontend
* providing the health-check endpoint used during deployment verification

The primary location is:

```text
backend/
```

---

# 6. Frontend and Backend Separation

The application follows a separated frontend/backend model:

```text
                 FlavorForge
                     |
          +----------+----------+
          |                     |
          v                     v
      Frontend               Backend
       React                 Node.js
       Vite                  Express
          |                     |
          | HTTP API            |
          +-------------------->|
                                |
                                v
                              API
```

This separation is important for the later DevSecOps implementation.

The frontend and backend can be:

* built independently
* tested independently
* packaged into separate Docker images
* deployed as separate Kubernetes workloads
* scaled independently

---

# 7. Frontend-to-Backend Communication

The frontend communicates with the backend through an API.

The backend exposes an HTTP endpoint for application health verification:

```text
/api/health
```

A request to the health endpoint allows us to verify that the backend is running.

Conceptually:

```text
Browser
   |
   v
Frontend
   |
   | HTTP request
   v
Backend
   |
   v
/api/health
```

The endpoint is especially useful later when verifying:

```text
Docker
Kubernetes
AKS
Ingress
CI/CD deployment
```

---

# 8. Backend Health Endpoint

The backend provides:

```text
GET /api/health
```

The endpoint is used as a simple application-level health check.

The response contains application information such as the application version/build information and environment.

This allows the deployment to be verified beyond simply checking whether a Kubernetes pod is running.

The distinction is important:

```text
Pod Running
    ≠
Application Working
```

A running Kubernetes pod only tells us that the container process is running.

The API health endpoint allows us to verify that the application itself responds successfully.

---

# 9. Application Configuration

The application uses environment/configuration values rather than hard-coding deployment-specific settings wherever appropriate.

For example, the frontend uses an API base URL configuration.

The Docker-specific frontend configuration used:

```text
VITE_API_BASE_URL=http://backend:3000
```

This is important because the frontend does not need to know the backend's final external address when the application is running inside the container network.

The Docker networking relationship becomes:

```text
Frontend Container
       |
       | backend:3000
       v
Backend Container
```

The Kubernetes configuration is handled later through Kubernetes configuration resources and deployment configuration.

---

# 10. Why the Application Was Separated Before Docker

Docker should package an application that already has a clear structure.

Therefore, the implementation sequence was:

```text
Build Application
      |
      v
Verify Frontend
      |
      v
Verify Backend
      |
      v
Verify API
      |
      v
Containerize
```

This makes troubleshooting easier.

If the application fails before Docker, the problem is an application problem.

If the application works locally but fails inside Docker, the problem is more likely related to:

```text
Dockerfile
environment variables
networking
container configuration
```

This separation helps isolate problems.

---

# 11. Local Development Model

During local development, the frontend and backend are treated as separate application components.

Conceptually:

```text
Developer Machine
       |
       +----------------------+
       |                      |
       v                      v
   Frontend                Backend
   React/Vite             Node/Express
       |                      |
       +------ HTTP ----------+
```

The frontend can therefore be developed independently from the backend.

The backend can also be tested independently through its API.

---

# 12. Backend Testing

The backend contains automated tests using:

```text
Jest
```

The backend tests are part of the project's quality and CI/CD process.

The testing flow later becomes:

```text
Source Code
    |
    v
Install Dependencies
    |
    v
Run Jest Tests
    |
    v
Test Result
    |
    v
Continue Pipeline
```

Testing is documented in:

```text
05-application-testing.md
```

---

# 13. Application Build vs Infrastructure

It is important to distinguish the application from the infrastructure.

### Application

```text
frontend/
backend/
```

### Containerization

```text
docker/
Dockerfiles
```

### Kubernetes

```text
kubernetes/
```

### GitOps

```text
argocd/
```

### CI/CD

```text
azure-pipelines.yml
```

### Documentation

```text
docs/
```

This separation makes the project easier to understand and reproduce.

---

# 14. Application Lifecycle

The application eventually follows this lifecycle:

```text
Developer
    |
    v
Write Application Code
    |
    v
Git
    |
    v
GitHub
    |
    v
Azure DevOps Pipeline
    |
    +---- Test
    |
    +---- SonarCloud
    |
    +---- Docker Build
    |
    +---- Trivy Scan
    |
    v
Azure Container Registry
    |
    v
AKS
    |
    v
Kubernetes
    |
    v
Running FlavorForge Application
```

The application therefore becomes the input to the complete DevSecOps workflow.

---

# 15. Why Frontend and Backend Use Separate Containers

The frontend and backend are packaged separately.

Conceptually:

```text
                    FlavorForge
                        |
             +----------+----------+
             |                     |
             v                     v
       Frontend Image        Backend Image
             |                     |
             v                     v
        Frontend Pod          Backend Pod
             |                     |
             +----------+----------+
                        |
                     Kubernetes
```

This provides independent deployment and scaling.

For example, the Kubernetes deployment can maintain separate replicas for:

```text
frontend
backend
```

The application therefore follows a basic service-oriented deployment model.

---

# 16. Application Versioning

The backend exposes application/build information through the health endpoint.

During the FlavorForge implementation, values such as:

```text
APP_VERSION
BUILD_VERSION
NODE_ENV
PORT
CORS_ORIGIN
```

were used as application/deployment configuration.

These values become particularly important when the same application is deployed into different environments.

For example:

```text
Development
QA
Production
```

The exact environment-specific configuration is handled later in the Kubernetes/Kustomize sections.

---

# 17. Application Environment Model

The application eventually runs in multiple deployment environments:

```text
Development
     |
     v
QA
     |
     v
Production
```

The application code remains the same while environment-specific configuration can change.

This is one of the reasons configuration is separated from application code.

The later Kustomize overlays provide the environment-specific deployment configuration.

---

# 18. Application Verification Philosophy

The application is verified at multiple levels.

### Level 1 — Source

Does the source code exist?

```text
frontend/
backend/
```

### Level 2 — Build

Can the application be built successfully?

### Level 3 — Tests

Do the automated tests pass?

### Level 4 — API

Does the backend respond?

```text
GET /api/health
```

### Level 5 — Container

Does the application run inside Docker?

### Level 6 — Kubernetes

Do the application pods run successfully?

### Level 7 — External Application

Can the deployed application be accessed successfully?

This layered verification approach is used throughout the project.

---

# 19. Important Reproducibility Principle

A person recreating FlavorForge should not start with:

```text
AKS
Docker
Azure DevOps
Argo CD
```

before understanding the application.

The recommended order is:

```text
Application
    ↓
Local Verification
    ↓
Docker
    ↓
Azure
    ↓
Kubernetes
    ↓
CI/CD
    ↓
GitOps
```

Each stage builds on the previous stage.

This makes the project reproducible rather than simply documenting the final infrastructure.

---

# 20. Application Build Journey

The application section is divided into the following documents:

```text
03-application/
│
├── 01-application-overview.md
├── 02-frontend-setup.md
├── 03-backend-setup.md
├── 04-api-implementation.md
├── 05-application-testing.md
└── 06-application-verification.md
```

The purpose of each document is:

### 01 — Application Overview

Explains the overall application architecture and technology stack.

### 02 — Frontend Setup

Documents how the React/Vite frontend was created and configured.

### 03 — Backend Setup

Documents how the Node.js/Express backend was created and configured.

### 04 — API Implementation

Documents the backend API and health endpoint.

### 05 — Application Testing

Documents the Jest tests and application testing process.

### 06 — Application Verification

Documents how the complete application was verified before moving to Docker.

---

# 21. What We Are Not Documenting Here

This document does not yet explain:

```text
Docker image creation
Azure Container Registry
AKS
Kubernetes
Kustomize
Azure DevOps
SonarCloud
Trivy
Argo CD
```

Those are later stages of the Build Journey.

The purpose here is to establish the application foundation first.

---

# 22. Reviewer Explanation

### "What is FlavorForge?"

> "FlavorForge is the application used as the foundation for my Azure DevSecOps capstone. It has a React/Vite frontend and a Node.js/Express backend, which are developed and deployed as separate components."

### "Why did you separate frontend and backend?"

> "The frontend and backend have different responsibilities and can be built, tested, containerized, deployed, and scaled independently."

### "How does the frontend communicate with the backend?"

> "The frontend communicates with the Node.js/Express backend through HTTP API calls. The backend also exposes `/api/health` for application-level health verification."

### "Why is `/api/health` important?"

> "It provides an application-level verification point. A Kubernetes pod being in Running state doesn't necessarily prove that the application is responding correctly, so the health endpoint gives us a simple way to verify the application itself."

### "Why didn't you start directly with AKS?"

> "I built and verified the application first. Then I containerized it, pushed the images to ACR, deployed them to AKS, and finally integrated the CI/CD and GitOps workflow. This makes each stage independently verifiable and reproducible."

---

# 23. Current Application Foundation

At the end of this stage, the conceptual structure is:

```text
FlavorForge
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

This application becomes the input for the next stage:

```text
Application
     |
     v
Docker
```

---

# 24. Next Step

Continue with:

```text
03-application/02-frontend-setup.md
```

The next document explains the actual FlavorForge frontend setup, including the React/Vite project structure, configuration, dependencies, API configuration, and local verification.
