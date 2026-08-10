# 05 — Run Docker Containers

## 1. Purpose

After building the FlavorForge frontend and backend Docker images, the next step was to run those images as Docker containers.

The purpose of this step was to verify that the built images could actually start and run the FlavorForge application.

The Docker flow was:

```text
Dockerfile
    ↓
Docker Image
    ↓
Docker Container
    ↓
Running Application
```

FlavorForge was run as separate frontend and backend containers:

```text
Frontend Docker Image
        ↓
Frontend Container
        ↓
Nginx
        ↓
React Application
```

```text
Backend Docker Image
        ↓
Backend Container
        ↓
Node.js + Express
        ↓
FlavorForge APIs
```

---

# 2. Run the Backend Container

The backend Docker image was started as a container so that the Node.js + Express application could be tested inside Docker.

The containerized backend flow was:

```text
Host Machine
     ↓
Backend Container
     ↓
Node.js + Express
     ↓
FlavorForge API
```

### Backend container running

![Backend container running](/screenshots/docker/7-backend-container-running.png)

The screenshot shows the FlavorForge backend container running successfully.

This confirmed that the backend Docker image could be started as a container.

---

# 3. Verify the Backend Health Endpoint

After starting the backend container, the FlavorForge health endpoint was tested.

```text
/api/health
```

The health endpoint was used to verify that the application inside the container was responding to HTTP requests.

### Backend health check

![Backend health check](/screenshots/docker/8-backend-health-success.png)

The successful response confirmed that:

```text
Backend Container
       ↓
Node.js + Express
       ↓
/api/health
       ↓
Successful Response
```

The backend was therefore not only running as a container, but also responding correctly at the application level.

---

# 4. Verify the Recipes API

The Recipes API was also tested from the running backend container.

```text
/api/recipes
```

### Recipes API verification

![Recipes API](/screenshots/docker/9-backend-recipes-success.png)

The successful response confirmed that the backend container was serving an actual application API.

Additional verification was also captured:

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

This provided application-level verification of the containerized backend.

---

# 5. Run the Frontend Container

The frontend Docker image was also run as a container.

The FlavorForge frontend uses Nginx as the runtime server.

The runtime flow was:

```text
Frontend Container
       ↓
Nginx
       ↓
React Production Files
       ↓
FlavorForge Web Application
```

The frontend container therefore served the built React application through Nginx.

---

# 6. Verify Frontend and Backend Containers Together

The frontend and backend containers were run together as part of the local containerized application.

### Frontend and backend containers running

![Frontend and backend containers running](/screenshots/docker/10-frontend-backend-container-running.png)

The resulting local architecture was:

```text
                 Host Machine
                      │
             ┌────────┴────────┐
             │                 │
             ▼                 ▼
      Frontend Container   Backend Container
             │                 │
             ▼                 ▼
           Nginx          Node.js + Express
             │                 │
             ▼                 ▼
       React Application     REST API
```

The screenshot provides evidence that both major application components were running as Docker containers.

---

# 7. Check Running Containers

The running Docker containers were checked using:

```bash
docker ps
```

For all containers, including stopped containers:

```bash
docker ps -a
```

### Docker container status

![Docker container status](/screenshots/docker/12-1-docker-ps.png)

The Docker container listing provided visibility into the containers participating in the FlavorForge Docker environment.

The output included information such as:

```text
Container ID
Image
Status
Ports
Container Name
```

---

# 8. Inspect the FlavorForge Docker Network

The FlavorForge Docker environment used a Docker network named:

```text
flavorforge-network
```

The network was inspected using:

```bash
docker network inspect flavorforge-network
```

### FlavorForge Docker network

![FlavorForge Docker network](/screenshots/docker/12-docker-network-inspect-flavorforge-network.png)

The network inspection provided evidence of the Docker networking configuration used by the application containers.

Conceptually:

```text
             flavorforge-network
                     │
          ┌──────────┴──────────┐
          │                     │
          ▼                     ▼
 Frontend Container      Backend Container
          │                     │
          └──────────┬──────────┘
                     │
              Docker Network
```

This was important for running the frontend and backend as a connected local containerized application.

---

# 9. Run the Application with Docker Compose

The FlavorForge repository contains:

```text
docker-compose.yml
```

Docker Compose was used to work with the frontend and backend containers together.

### Docker Compose running

![Docker Compose running](/screenshots/docker/13-docker-compose-running.png)

The Compose workflow can be represented as:

```text
docker-compose.yml
        │
        ├────────────────┐
        │                │
        ▼                ▼
    Frontend          Backend
    Container         Container
        │                │
        └────────┬───────┘
                 │
          Docker Network
```

The screenshot provides evidence that the multi-container Docker Compose environment was running.

---

# 10. Verify Docker Images During the Container Workflow

The Docker images used by the application were also inspected.

### Docker images

![Docker images](/screenshots/docker/13-1-docker-images.png)

This confirmed that the required FlavorForge Docker images were available during the container workflow.

The two application components were represented by separate Docker images:

```text
Frontend Image
       ↓
Frontend Container
```

```text
Backend Image
       ↓
Backend Container
```

---

# 11. Verify the Backend API

The backend API was tested while the Docker environment was running.

### Backend API

![Backend API](/screenshots/docker/13-2-backend-api.png)

The verification flow was:

```text
Client
  ↓
Backend Container
  ↓
Node.js + Express
  ↓
API Route
  ↓
Response
```

The successful response provided additional evidence that the backend application was accessible from the containerized environment.

---

# 12. Verify Frontend API Communication

Frontend-side API communication was also verified.

### Frontend API

![Frontend API](/screenshots/docker/13-2-frontend-api.png)

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

This demonstrated the interaction between the frontend and backend components in the Docker environment.

---

# 13. Verify the Frontend Application

The containerized frontend application was opened in the browser.

### FlavorForge website

![FlavorForge website](/screenshots/docker/13-5-website.png)

The screenshot shows the FlavorForge application being served successfully from the containerized frontend.

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

This confirmed that the frontend Docker image could be run successfully and serve the production React application.

---

# 14. Inspect Docker Container Logs

Container logs were inspected during the Docker workflow.

The standard Docker command is:

```bash
docker logs <container-name>
```

### Docker container logs

![Docker container logs](/screenshots/docker/13-6-docker-logs.png)

The logs provided runtime information from the container.

They are useful for checking:

```text
Application startup
Runtime messages
Application errors
API errors
Unexpected container behavior
```

This is useful because a container showing a `Running` status does not by itself prove that the application inside the container is functioning correctly.

---

# 15. Additional Docker Run Evidence

The Docker screenshot collection also contains earlier evidence from the image-build and container-run stages.

### Docker build success

![Docker build success](/screenshots/docker/1-docker-build-success.png)

### Dockerfile / Dockerignore setup

![Dockerignore created](/screenshots/docker/2-dockerignore-created.png)

### Build context optimization

![Build context optimized](/screenshots/docker/3-build-context-optimized.png)

### Docker images

![Docker images](/screenshots/docker/4-docker-images.png)

### Docker run

![Docker run](/screenshots/docker/5-docker-run.png)

These screenshots provide the supporting sequence:

```text
Docker Configuration
       ↓
Docker Build
       ↓
Docker Image
       ↓
Docker Run
       ↓
Running Container
```

The detailed image-building process is documented in:

```text
docs/week-4/BUILD-JOURNEY/04-docker/04-build-images.md
```

---

# 16. What We Actually Achieved

At the beginning of this step, FlavorForge had built Docker images.

The objective of this step was to run those images and verify the applications.

The frontend flow was:

```text
React + Vite
      ↓
frontend/Dockerfile
      ↓
Frontend Docker Image
      ↓
Frontend Container
      ↓
Nginx
      ↓
Running Web Application
```

The backend flow was:

```text
Node.js + Express
      ↓
backend/Dockerfile
      ↓
Backend Docker Image
      ↓
Backend Container
      ↓
Health / Recipe APIs
```

The frontend and backend were also tested together using the Docker networking and Docker Compose environment.

---

# 17. Container Verification Summary

### Backend

```text
Backend Image
      ↓
Backend Container
      ↓
Health Endpoint
      ↓
Recipes API
      ↓
Successful Response
```

Verified through:

```text
7-backend-container-running.png
8-backend-health-success.png
9-backend-recipes-success.png
9-1-backend-recipes-success.png
13-2-backend-api.png
```

### Frontend

```text
Frontend Image
      ↓
Frontend Container
      ↓
Nginx
      ↓
React Application
      ↓
Application Accessible
```

Verified through:

```text
10-frontend-backend-container-running.png
13-5-website.png
13-2-frontend-api.png
```

### Multi-container environment

```text
Frontend Container
        ↕
Docker Network
        ↕
Backend Container
```

Verified through:

```text
12-docker-network-inspect-flavorforge-network.png
13-docker-compose-running.png
12-1-docker-ps.png
```

---

# 18. Dockerfile → Image → Container

The three Docker concepts should remain separate.

### Dockerfile

```text
Dockerfile
    ↓
Instructions used to build an image
```

### Docker Image

```text
Docker Image
    ↓
Packaged application artifact
```

### Docker Container

```text
Docker Container
    ↓
Running instance of an image
```

For FlavorForge:

```text
frontend/Dockerfile
        ↓
Frontend Docker Image
        ↓
Frontend Container
        ↓
Nginx + React Application
```

And:

```text
backend/Dockerfile
        ↓
Backend Docker Image
        ↓
Backend Container
        ↓
Node.js + Express API
```

This distinction becomes important later because Kubernetes does not build the application images. Kubernetes uses container images when creating application pods.

---

# 19. Docker Stage Progress

The Docker BUILD-JOURNEY is:

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
Next: Azure Infrastructure
```

At this point, FlavorForge had moved from:

```text
Docker Images
```

to:

```text
Running Docker Containers
        ↓
Working Backend APIs
        ↓
Working Frontend
        ↓
Multi-container Environment
```

The next document is:

```text
docs/week-4/BUILD-JOURNEY/04-docker/06-docker-verification.md
```

---

# 20. Result

The Docker container runtime stage was completed successfully.

The verified local Docker architecture was:

```text
                     FlavorForge
                          │
                ┌─────────┴─────────┐
                │                   │
                ▼                   ▼
            Frontend             Backend
                │                   │
                ▼                   ▼
          Docker Image         Docker Image
                │                   │
                ▼                   ▼
          Docker Container    Docker Container
                │                   │
                ▼                   ▼
              Nginx           Node.js + Express
                │                   │
                ▼                   ▼
        React Application       REST APIs
```

The application was also verified through:

```text
Docker Network
      ↓
Frontend + Backend
      ↓
Docker Compose
      ↓
Application Verification
```

Therefore, the FlavorForge Docker runtime stage established that the built images could be started as containers and that the containerized frontend and backend applications were functioning before moving to the Azure infrastructure stage.
