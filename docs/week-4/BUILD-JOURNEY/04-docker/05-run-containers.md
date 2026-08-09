# 05 — Run Docker Containers

## 1. Purpose

After building the frontend and backend Docker images, the next step in the FlavorForge Docker journey was to run those images as containers.

The purpose of this step was to verify that the application images could start successfully and that the frontend and backend applications could run inside Docker.

The overall flow was:

```text
Dockerfile
    ↓
Docker Image
    ↓
Docker Container
    ↓
Running Application
```

For FlavorForge, the frontend and backend were handled as separate containers.

```text
Frontend Docker Image
        ↓
Frontend Container
        ↓
Nginx serving React application
```

```text
Backend Docker Image
        ↓
Backend Container
        ↓
Node.js + Express API
```

---

## 2. Run the Backend Container

The backend image was started as a Docker container.

The container runs the Node.js + Express backend application and makes the backend available for API testing.

The basic runtime flow was:

```text
Host Machine
     │
     ▼
Backend Container
     │
     ▼
Node.js + Express
     │
     ▼
FlavorForge API
```

### Backend container running

The running container was checked using:

```bash
docker ps
```

![Backend container running](/screenshots/docker/7-backend-container-running.png)

This confirmed that the FlavorForge backend container was successfully running.

---

## 3. Verify the Backend Health Endpoint

FlavorForge provides a backend health endpoint:

```text
/api/health
```

This endpoint was used to verify that the Node.js + Express application was running and responding correctly from the container.

The verification flow was:

```text
HTTP Request
     │
     ▼
Backend Container
     │
     ▼
Node.js + Express
     │
     ▼
/api/health
     │
     ▼
Health Response
```

### Backend health check

![Backend health check](/screenshots/docker/8-backend-health-success.png)

The successful response confirmed that the containerized backend application was responding correctly.

---

## 4. Verify the Recipes API

The backend Recipes API was also tested after starting the container.

The endpoint used was:

```text
/api/recipes
```

### Backend Recipes API

![Backend Recipes API](/screenshots/docker/9-backend-recipes-success.png)

The successful response confirmed that the backend container was not only running, but was also serving an application API successfully.

### Additional Recipes API verification

![Additional Recipes API verification](/screenshots/docker/9-1-backend-recipes-success.png)

This provided additional evidence that the Recipes API was working in the containerized environment.

The request flow was:

```text
HTTP Request
     │
     ▼
Backend Container
     │
     ▼
Express Routes
     │
     ▼
Recipes API
     │
     ▼
API Response
```

---

## 5. Run the Frontend Container

The frontend image was also run as a Docker container.

The FlavorForge frontend Dockerfile uses Nginx as the runtime server.

The runtime flow was:

```text
Frontend Container
       │
       ▼
Nginx
       │
       ▼
React Production Files
       │
       ▼
FlavorForge Web Application
```

The frontend container therefore handled the React application's production files through Nginx.

---

## 6. Verify Frontend and Backend Containers

The frontend and backend containers were run as part of the local containerized application.

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

### Frontend and backend containers running

![Frontend and backend containers running](/screenshots/docker/10-frontend-backend-container-running.png)

This provided evidence that both application components were running as Docker containers.

---

## 7. Check Container Status

Docker provides `docker ps` to view currently running containers:

```bash
docker ps
```

For all containers, including stopped containers:

```bash
docker ps -a
```

### Docker container status

![Docker container status](/screenshots/docker/12-1-docker-ps.png)

This provided direct evidence of the Docker containers running during the FlavorForge containerization workflow.

---

## 8. Inspect the Docker Network

When multiple containers communicate with each other, Docker networking becomes important.

FlavorForge used a Docker network named:

```text
flavorforge-network
```

The network was inspected using:

```bash
docker network inspect flavorforge-network
```

### FlavorForge Docker network

![FlavorForge Docker network](/screenshots/docker/12-docker-network-inspect-flavorforge-network.png)

The network inspection provided visibility into the Docker network used by the application containers.

The conceptual relationship was:

```text
                 flavorforge-network
                         │
              ┌──────────┴──────────┐
              │                     │
              ▼                     ▼
      Frontend Container     Backend Container
              │                     │
              └─────────┬───────────┘
                        │
                  Docker Network
```

---

## 9. Verify Docker Compose

The FlavorForge repository also contains:

```text
docker-compose.yml
```

Docker Compose was used to work with the frontend and backend containers together.

### Docker Compose running

![Docker Compose running](/screenshots/docker/13-docker-compose-running.png)

This provided evidence that the Docker Compose environment was successfully started.

The Compose workflow provided a convenient way to work with the multiple application containers as a local environment.

---

## 10. Verify Docker Images

The Docker images used by the containerized application were also inspected.

### Docker images

![Docker images](/screenshots/docker/13-1-docker-images.png)

This provided evidence of the Docker images available during the containerized application workflow.

---

## 11. Verify Backend API

The backend API was tested while the Docker environment was running.

### Backend API

![Backend API](/screenshots/docker/13-2-backend-api.png)

The successful response confirmed that the backend API was accessible from the containerized environment.

---

## 12. Verify Frontend API Communication

The frontend-side API interaction was also verified.

### Frontend API

![Frontend API](/screenshots/docker/13-2-frontend-api.png)

This provided evidence that the frontend was able to interact with the backend API in the containerized environment.

The application communication flow was:

```text
Browser
   │
   ▼
Frontend Container
   │
   │ API Request
   ▼
Backend Container
   │
   ▼
Express API
   │
   ▼
API Response
   │
   ▼
Frontend
```

---

## 13. Verify the Frontend Application

The containerized frontend was opened in the browser to verify that the application was being served successfully.

### FlavorForge website

![FlavorForge website](/screenshots/docker/13-5-website.png)

The screenshot confirms that the FlavorForge web application was accessible from the containerized frontend.

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

---

## 14. Inspect Container Logs

Docker logs can be used to inspect application output from a running container.

The command is:

```bash
docker logs <container-name>
```

### Docker container logs

![Docker container logs](/screenshots/docker/13-6-docker-logs.png)

The logs provided runtime information that could be used to troubleshoot application startup and runtime behavior.

---

## 15. Docker Compose Application Verification

The Docker Compose workflow provided another way to verify FlavorForge as a multi-container application.

The relationship was:

```text
docker-compose.yml
        │
        ├───────────────┐
        │               │
        ▼               ▼
    Frontend         Backend
    Container        Container
        │               │
        └───────┬───────┘
                │
         Docker Network
```

The Compose environment, images, APIs, website, and container logs were verified during this stage.

This provided a local multi-container validation stage before the later Kubernetes deployment.

---

## 16. Why Run Containers Before Kubernetes?

Running the application in Docker before deploying it to Kubernetes provided an important validation stage.

The overall progression was:

```text
Application Development
        ↓
Dockerfile
        ↓
Docker Image
        ↓
Docker Container
        ↓
Application Verification
        ↓
Kubernetes Deployment
```

This helped separate application and container issues from later Kubernetes infrastructure issues.

For example, if the application failed inside Docker, the problem could first be investigated at the application or container level rather than immediately assuming Kubernetes was responsible.

---

## 17. Container Verification Summary

### Backend

The backend verification flow was:

```text
Backend Container Running
        ↓
Health Endpoint Working
        ↓
Recipes API Working
```

Evidence:

* Backend container running
* Backend health endpoint
* Recipes API responses

### Frontend

The frontend verification flow was:

```text
Frontend Container
        ↓
Nginx
        ↓
React Application
        ↓
Application Accessible
```

### Multi-container environment

The combined environment was verified through:

```text
Frontend
   ↕
Backend
   ↕
Docker Network
```

and through the Docker Compose workflow.

---

## 18. What We Actually Achieved

At the end of this step, FlavorForge moved from:

```text
Docker Images
```

to:

```text
Running Docker Containers
```

The frontend flow was:

```text
React + Vite Frontend
        ↓
Frontend Dockerfile
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
Node.js + Express Backend
        ↓
Backend Dockerfile
        ↓
Backend Docker Image
        ↓
Backend Container
        ↓
Health / Recipe APIs
```

The frontend and backend were also verified together as a multi-container application.

---

## 19. Important Learning

Three Docker concepts should be kept separate.

### Dockerfile

```text
Dockerfile
    ↓
Instructions for building an image
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

and:

```text
backend/Dockerfile
        ↓
Backend Docker Image
        ↓
Backend Container
        ↓
Node.js + Express API
```

This distinction becomes important later because Kubernetes does not build the Docker images. Kubernetes uses already-built container images when creating application pods.

---

## 20. Docker Stage Completed

The Docker BUILD-JOURNEY now looks like:

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

At this point, FlavorForge had been containerized and the containers had been tested locally.

The next document is:

```text
docs/week-4/BUILD-JOURNEY/04-docker/06-docker-verification.md
```

This will consolidate the Docker verification results before continuing to the Azure stage.
