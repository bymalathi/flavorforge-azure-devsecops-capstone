# 06 — Docker Verification

## 1. Purpose

This document records the final verification of the Docker implementation for FlavorForge.

The Docker BUILD-JOURNEY was completed in the following order:

```text
01 — Docker Setup
        ↓
02 — Frontend Dockerfile
        ↓
03 — Backend Dockerfile
        ↓
04 — Build Images
        ↓
05 — Run Containers
        ↓
06 — Docker Verification
```

The purpose of this stage was to verify the Docker images, containers, application endpoints, Docker networking, Docker Compose environment, and runtime behavior.

---

## 2. Docker Verification Flow

The completed Docker flow was:

```text
FlavorForge Application
        ↓
Dockerfile
        ↓
Docker Image
        ↓
Docker Container
        ↓
Running Application
        ↓
Application Verification
```

For the frontend:

```text
React + Vite
      ↓
Frontend Dockerfile
      ↓
Frontend Docker Image
      ↓
Frontend Container
      ↓
Nginx
      ↓
FlavorForge Web Application
```

For the backend:

```text
Node.js + Express
      ↓
Backend Dockerfile
      ↓
Backend Docker Image
      ↓
Backend Container
      ↓
Health / Recipes API
```

---

# 3. Verify Docker Build

The Docker build process was completed successfully before moving to container verification.

![Docker build success](/screenshots/docker/1-docker-build-success.png)

The build process produced Docker images that could then be used to start the FlavorForge containers.

The Docker build flow was:

```text
Source Code
     ↓
Dockerfile
     ↓
Docker Build
     ↓
Docker Image
```

---

# 4. Verify `.dockerignore` and Build Context

The Docker setup also included creation of the `.dockerignore` configuration.

![Dockerignore created](/screenshots/docker/2-dockerignore-created.png)

The build context was then checked and optimized.

![Build context optimized](/screenshots/docker/3-build-context-optimized.png)

This was part of preparing the application correctly for Docker image creation.

---

# 5. Verify Docker Images

The locally available Docker images were inspected.

![Docker images](/screenshots/docker/4-docker-images.png)

The Docker images represent the packaged application artifacts that were created from the FlavorForge Dockerfiles.

The relationship was:

```text
Frontend Dockerfile
        ↓
Frontend Image

Backend Dockerfile
        ↓
Backend Image
```

The Docker images were then available for container execution.

---

# 6. Verify Docker Run

The Docker run stage was successfully executed.

![Docker run](/screenshots/docker/5-docker-run.png)

This moved the application from the image stage into the container runtime stage.

```text
Docker Image
     ↓
docker run
     ↓
Docker Container
```

---

# 7. Verify Backend Image Build

The backend Docker image was successfully built.

![Backend build success](/screenshots/docker/6-backend-build-success.png)

The backend build flow was:

```text
backend/
   ↓
backend/Dockerfile
   ↓
Docker Build
   ↓
Backend Docker Image
```

This confirmed that the backend Docker image could be created successfully.

---

# 8. Verify Backend Container

The backend image was started as a Docker container.

![Backend container running](/screenshots/docker/7-backend-container-running.png)

This confirmed that the backend container successfully started.

The runtime flow was:

```text
Backend Docker Image
        ↓
Backend Container
        ↓
Node.js + Express
        ↓
FlavorForge Backend
```

The running containers could be inspected with:

```bash
docker ps
```

---

# 9. Verify Backend Health Endpoint

The FlavorForge backend provides a health endpoint:

```text
/api/health
```

The endpoint was tested after starting the backend container.

![Backend health check](/screenshots/docker/8-backend-health-success.png)

The verification flow was:

```text
HTTP Request
      ↓
Backend Container
      ↓
Node.js + Express
      ↓
/api/health
      ↓
Successful Response
```

This confirmed that the backend was not only running as a container, but that the application inside the container was responding successfully.

---

# 10. Verify Recipes API

The Recipes API was also tested.

The endpoint used was:

```text
/api/recipes
```

![Backend Recipes API](/screenshots/docker/9-backend-recipes-success.png)

An additional Recipes API verification was also captured:

![Additional Recipes API verification](/screenshots/docker/9-1-backend-recipes-success.png)

The request flow was:

```text
HTTP Request
      ↓
Backend Container
      ↓
Express Routes
      ↓
Recipes API
      ↓
API Response
```

This confirmed that an actual FlavorForge application API was working from the containerized backend.

---

# 11. Verify Frontend and Backend Containers

The frontend and backend were run as separate Docker containers.

![Frontend and backend containers running](/screenshots/docker/10-frontend-backend-container-running.png)

The resulting containerized application structure was:

```text
                 Host Machine
                      │
            ┌─────────┴─────────┐
            │                   │
            ▼                   ▼
     Frontend Container   Backend Container
            │                   │
            ▼                   ▼
          Nginx           Node.js + Express
            │                   │
            ▼                   ▼
     React Application        REST API
```

This confirmed that both major FlavorForge application components could run as containers.

---

# 12. Verify Docker Network

FlavorForge used a Docker network named:

```text
flavorforge-network
```

The network was inspected using:

```bash
docker network inspect flavorforge-network
```

![FlavorForge Docker network](/screenshots/docker/12-docker-network-inspect-flavorforge-network.png)

The container relationship was:

```text
             flavorforge-network
                     │
          ┌──────────┴──────────┐
          │                     │
          ▼                     ▼
  Frontend Container     Backend Container
          │                     │
          └──────────┬──────────┘
                     │
              Docker Network
```

This provided visibility into the Docker network used by the application containers.

---

# 13. Verify Running Containers

The running Docker containers were inspected using:

```bash
docker ps
```

![Docker container status](/screenshots/docker/12-1-docker-ps.png)

The command provides information about the running containers, including:

```text
Container ID
Image
Status
Ports
Container Name
```

For all containers, including stopped containers, the command is:

```bash
docker ps -a
```

---

# 14. Verify Docker Compose

The FlavorForge repository contains:

```text
docker-compose.yml
```

Docker Compose was used to work with the frontend and backend containers together.

![Docker Compose running](/screenshots/docker/13-docker-compose-running.png)

The Compose structure was:

```text
docker-compose.yml
        │
        ├───────────────┐
        │               │
        ▼               ▼
    Frontend          Backend
    Container         Container
        │               │
        └───────┬───────┘
                │
         Docker Network
```

This provided a local multi-container environment for FlavorForge.

---

# 15. Verify Docker Images During Compose

The Docker images used during the containerized workflow were inspected.

![Docker images during Compose workflow](/screenshots/docker/13-1-docker-images.png)

This confirmed that the required Docker images were available in the local Docker environment.

---

# 16. Verify Backend API

The backend API was tested while the Docker environment was running.

![Backend API](/screenshots/docker/13-2-backend-api.png)

The request flow was:

```text
Client
  ↓
Backend Container
  ↓
Node.js + Express
  ↓
API Route
  ↓
API Response
```

This provided additional confirmation that the containerized backend was accessible and serving the application API.

---

# 17. Verify Frontend API Interaction

Frontend-side API communication was also verified.

![Frontend API interaction](/screenshots/docker/13-2-frontend-api.png)

The application communication flow was:

```text
Browser
   ↓
Frontend Container
   ↓
API Request
   ↓
Backend Container
   ↓
Express API
   ↓
API Response
   ↓
Frontend
```

This confirmed the frontend/backend interaction in the containerized environment.

---

# 18. Verify Additional Docker Build

Additional terminal evidence of the Docker build was captured.

![Docker terminal build success](/screenshots/docker/13-4-terminal-build-success.png)

This provided further evidence that the Docker build process completed successfully.

---

# 19. Verify FlavorForge Website

The containerized frontend was opened in the browser.

![FlavorForge website](/screenshots/docker/13-5-website.png)

The runtime flow was:

```text
Browser
   ↓
Frontend Container
   ↓
Nginx
   ↓
React Production Files
   ↓
FlavorForge UI
```

This confirmed that the frontend container successfully served the FlavorForge web application.

---

# 20. Inspect Docker Container Logs

Container logs were inspected during the Docker workflow.

The command used for container logs is:

```bash
docker logs <container-name>
```

![Docker container logs](/screenshots/docker/13-6-docker-logs.png)

Container logs provide runtime information that can be used to investigate:

```text
Application startup
Runtime behavior
Errors
API issues
Configuration problems
```

This is an important verification step because a container being in a `Running` state does not by itself prove that the application inside the container is functioning correctly.

---

# 21. Docker Verification Evidence

The Docker screenshots captured during the FlavorForge implementation cover the complete containerization workflow.

### Docker setup and build

![Docker build success](/screenshots/docker/1-docker-build-success.png)

![Dockerignore created](/screenshots/docker/2-dockerignore-created.png)

![Build context optimized](/screenshots/docker/3-build-context-optimized.png)

![Docker images](/screenshots/docker/4-docker-images.png)

![Docker run](/screenshots/docker/5-docker-run.png)

### Backend container

![Backend build success](/screenshots/docker/6-backend-build-success.png)

![Backend container running](/screenshots/docker/7-backend-container-running.png)

![Backend health endpoint](/screenshots/docker/8-backend-health-success.png)

![Backend Recipes API](/screenshots/docker/9-backend-recipes-success.png)

![Additional Recipes API verification](/screenshots/docker/9-1-backend-recipes-success.png)

### Frontend and backend

![Frontend and backend containers](/screenshots/docker/10-frontend-backend-container-running.png)

### Docker networking and containers

![Docker network](/screenshots/docker/12-docker-network-inspect-flavorforge-network.png)

![Docker container status](/screenshots/docker/12-1-docker-ps.png)

### Docker Compose and application verification

![Docker Compose](/screenshots/docker/13-docker-compose-running.png)

![Docker images](/screenshots/docker/13-1-docker-images.png)

![Backend API](/screenshots/docker/13-2-backend-api.png)

![Frontend API interaction](/screenshots/docker/13-2-frontend-api.png)

![Docker terminal build success](/screenshots/docker/13-4-terminal-build-success.png)

![FlavorForge website](/screenshots/docker/13-5-website.png)

![Docker logs](/screenshots/docker/13-6-docker-logs.png)

---

# 22. Docker Verification Checklist

| Verification                  | Result    | Evidence                                                           |
| ----------------------------- | --------- | ------------------------------------------------------------------ |
| Docker build                  | Verified  | `1-docker-build-success.png`                                       |
| `.dockerignore`               | Verified  | `2-dockerignore-created.png`                                       |
| Build context                 | Verified  | `3-build-context-optimized.png`                                    |
| Docker images                 | Verified  | `4-docker-images.png`                                              |
| Docker run                    | Verified  | `5-docker-run.png`                                                 |
| Backend image build           | Verified  | `6-backend-build-success.png`                                      |
| Backend container             | Verified  | `7-backend-container-running.png`                                  |
| Backend health endpoint       | Verified  | `8-backend-health-success.png`                                     |
| Recipes API                   | Verified  | `9-backend-recipes-success.png`, `9-1-backend-recipes-success.png` |
| Frontend + backend containers | Verified  | `10-frontend-backend-container-running.png`                        |
| Docker network                | Inspected | `12-docker-network-inspect-flavorforge-network.png`                |
| Running containers            | Verified  | `12-1-docker-ps.png`                                               |
| Docker Compose                | Verified  | `13-docker-compose-running.png`                                    |
| Docker images during workflow | Verified  | `13-1-docker-images.png`                                           |
| Backend API                   | Verified  | `13-2-backend-api.png`                                             |
| Frontend API interaction      | Verified  | `13-2-frontend-api.png`                                            |
| Docker build terminal output  | Verified  | `13-4-terminal-build-success.png`                                  |
| Frontend application          | Verified  | `13-5-website.png`                                                 |
| Container logs                | Inspected | `13-6-docker-logs.png`                                             |

---

# 23. What Was Actually Verified

The Docker implementation was verified at multiple levels.

## Level 1 — Docker Image

```text
Dockerfile
    ↓
Docker Image
```

The Docker images were successfully created and made available for container execution.

## Level 2 — Docker Container

```text
Docker Image
    ↓
Docker Container
```

The frontend and backend containers were successfully started.

## Level 3 — Application

```text
Docker Container
    ↓
Application
```

The backend health endpoint and Recipes API were tested successfully.

## Level 4 — Frontend Application

```text
Frontend Container
       ↓
Nginx
       ↓
React Application
       ↓
FlavorForge UI
```

The frontend application was opened and verified through the browser.

## Level 5 — Multi-container Environment

```text
Frontend Container
        ↕
Docker Network
        ↕
Backend Container
```

The frontend and backend were used together as a containerized application environment.

## Level 6 — Runtime Inspection

```text
Docker Container
       ↓
Docker Logs
```

Container logs were inspected to provide runtime visibility.

---

# 24. Docker Verification Result

The Docker implementation reached the following state:

```text
Dockerfiles
     ↓
Docker Images
     ↓
Docker Containers
     ↓
Backend Health API
     ↓
Recipes API
     ↓
Frontend Application
     ↓
Frontend + Backend
     ↓
Docker Network
     ↓
Docker Compose
     ↓
Docker Logs
```

The Docker stage therefore established a working containerized version of FlavorForge before moving to Azure infrastructure.

---

# 25. Docker BUILD-JOURNEY Completed

The complete Docker BUILD-JOURNEY is:

```text
01 — Docker Setup
        ↓
02 — Frontend Dockerfile
        ↓
03 — Backend Dockerfile
        ↓
04 — Build Images
        ↓
05 — Run Containers
        ↓
06 — Docker Verification
        ↓
Next: Azure
```

The next BUILD-JOURNEY stage is:

```text
docs/week-4/BUILD-JOURNEY/05-azure/
```

with the following sequence:

```text
01 — Azure Account and CLI
        ↓
02 — Resource Group
        ↓
03 — Azure Container Registry
        ↓
04 — Azure Kubernetes Service
        ↓
05 — ACR → AKS Access
        ↓
06 — Azure Verification
```

---

# 26. Result

Docker verification for FlavorForge was completed.

The final verified containerized architecture was:

```text
                    FlavorForge
                         │
              ┌──────────┴──────────┐
              │                     │
              ▼                     ▼
          Frontend               Backend
              │                     │
              ▼                     ▼
       Docker Image          Docker Image
              │                     │
              ▼                     ▼
       Frontend Container   Backend Container
              │                     │
              ▼                     ▼
            Nginx             Node.js + Express
              │                     │
              ▼                     ▼
       React Application        REST APIs
```

The Docker environment was additionally verified through:

```text
Docker Network
      ↓
Frontend + Backend
      ↓
Docker Compose
      ↓
Application Verification
      ↓
Container Logs
```

Therefore, the FlavorForge Docker stage was completed and verified before proceeding to Azure.

**Next:**

```text
docs/week-4/BUILD-JOURNEY/05-azure/01-azure-account-and-cli.md
```
