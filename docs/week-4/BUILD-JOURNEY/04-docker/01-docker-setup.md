# Docker Setup — Complete Beginner Build Guide

## Objective

This document explains how Docker was introduced into the FlavorForge project.

The purpose of this step is to:

* understand why Docker is used
* verify Docker installation
* understand the Docker architecture used by FlavorForge
* identify the frontend and backend containerization approach
* prepare the project for creating the frontend and backend Dockerfiles
* verify that Docker is available before building images

This document does **not** build the application images yet.

Image creation is covered in:

```text
02-frontend-dockerfile.md
03-backend-dockerfile.md
04-build-images.md
```

---

# 1. What Is Docker?

Docker is used to package an application together with the environment required to run it.

Instead of running the application directly on the developer's machine, FlavorForge packages the application into Docker images.

The basic relationship is:

```text
Application Source Code
        |
        v
Dockerfile
        |
        v
Docker Image
        |
        v
Docker Container
```

For FlavorForge, both the frontend and backend are containerized.

---

# 2. Why Docker Is Used in FlavorForge

FlavorForge contains two application components:

```text
Frontend
React + Vite
```

and:

```text
Backend
Node.js + Express
```

Docker provides a consistent way to package and run both components.

The overall architecture is:

```text
                 FlavorForge

        +-----------------------+
        |       Frontend        |
        |    React + Vite       |
        +-----------+-----------+
                    |
                    |
                    v
        +-----------------------+
        |        Backend        |
        |    Node.js + Express  |
        +-----------------------+
```

Each component is packaged separately.

```text
Frontend Source
      |
      v
Frontend Dockerfile
      |
      v
Frontend Docker Image
      |
      v
Frontend Container
```

and:

```text
Backend Source
      |
      v
Backend Dockerfile
      |
      v
Backend Docker Image
      |
      v
Backend Container
```

---

# 3. Docker Image vs Docker Container

These two terms are important.

## Docker Image

A Docker image is the packaged application artifact.

For example:

```text
flavorforge-frontend
flavorforge-backend
```

The image contains the application and the runtime environment required to start it.

---

## Docker Container

A container is a running instance of an image.

The relationship is:

```text
Docker Image
     |
     | docker run
     v
Docker Container
```

One image can be used to create multiple containers.

---

# 4. Dockerfile

A `Dockerfile` contains the instructions Docker uses to build an image.

For example:

```text
Dockerfile
    |
    | instructions
    v
Docker Image
```

A Dockerfile can define:

* base image
* working directory
* dependency installation
* source-code copying
* build commands
* exposed port
* startup command

FlavorForge uses separate Dockerfiles for the frontend and backend.

---

# 5. FlavorForge Docker Structure

The Docker-related project structure is organized around the two application components.

Conceptually:

```text
flavorforge-azure-devsecops-capstone/
│
├── frontend/
│   ├── source code
│   ├── package.json
│   └── Dockerfile
│
├── backend/
│   ├── source code
│   ├── package.json
│   └── Dockerfile
│
└── docker/
    └── Docker-related project resources
```

The exact files present in the repository should always be verified against the actual project rather than assumed from this overview.

---

# 6. Docker Installation

Docker must be available on the development machine before images can be built.

From the WSL terminal, verify Docker:

```bash
docker --version
```

A successful installation returns a Docker version.

For example:

```text
Docker version <version>
```

The exact version depends on the installed Docker release.

---

# 7. Verify Docker Is Running

Run:

```bash
docker info
```

This checks whether the Docker client can communicate with the Docker engine.

If Docker is running correctly, Docker returns information about the environment.

If Docker is not running, the command may return an error indicating that the Docker daemon cannot be reached.

---

# 8. Verify Docker With a Simple Command

Run:

```bash
docker ps
```

This lists currently running containers.

If no containers are running, it is valid for the result to be empty.

For example:

```text
CONTAINER ID   IMAGE   COMMAND   CREATED   STATUS   PORTS   NAMES
```

An empty list does **not** mean Docker is broken.

It simply means there are currently no running containers.

---

# 9. Understand Docker Client and Docker Engine

Docker commands are executed through the Docker CLI.

Conceptually:

```text
Docker Command
     |
     v
Docker CLI
     |
     v
Docker Engine
     |
     v
Images / Containers
```

For example:

```bash
docker ps
```

asks Docker to return information about running containers.

Similarly:

```bash
docker images
```

asks Docker to list locally available images.

---

# 10. Verify Docker Images

Run:

```bash
docker images
```

At this stage, the FlavorForge images may not exist yet.

That is expected because the images will be built in later steps.

After the image-building step, we expect to see FlavorForge images among the local images.

The image-building procedure is documented in:

```text
04-build-images.md
```

---

# 11. Verify Docker Containers

Run:

```bash
docker ps -a
```

This displays both running and stopped containers.

At the initial setup stage, FlavorForge containers may not exist yet.

They will be created and tested in:

```text
05-run-containers.md
```

---

# 12. FlavorForge Containerization Flow

The complete Docker workflow is:

```text
React + Vite Frontend
        |
        v
frontend/Dockerfile
        |
        v
Frontend Docker Image
        |
        v
Frontend Container
```

and:

```text
Node.js + Express Backend
        |
        v
backend/Dockerfile
        |
        v
Backend Docker Image
        |
        v
Backend Container
```

---

# 13. Frontend Docker Architecture

FlavorForge uses a multi-stage Docker build for the frontend.

The conceptual flow is:

```text
React Source Code
       |
       v
Node.js Build Stage
       |
       | npm install
       | npm build
       v
Production Build
       |
       v
Nginx Runtime Stage
       |
       v
Frontend Container
```

The frontend Dockerfile uses:

```text
node:22-alpine
```

for the build stage.

The final runtime uses:

```text
nginx:1.29-alpine
```

This separates the build environment from the lightweight runtime environment.

The exact Dockerfile is documented in:

```text
02-frontend-dockerfile.md
```

---

# 14. Backend Docker Architecture

The backend is a Node.js + Express application.

Its containerization flow is:

```text
Node.js + Express Source
        |
        v
Backend Dockerfile
        |
        v
Node.js Docker Image
        |
        v
Backend Container
```

The backend exposes the API used by the frontend.

The backend also provides the health endpoint:

```text
/api/health
```

The exact backend Dockerfile and build process are documented in:

```text
03-backend-dockerfile.md
```

---

# 15. Frontend and Backend Are Separate Images

FlavorForge does not package the frontend and backend into one application container.

Instead:

```text
Frontend
   |
   v
Frontend Image
```

and:

```text
Backend
   |
   v
Backend Image
```

This separation is important because the two components have different responsibilities.

### Frontend

Responsible for:

```text
User Interface
React
Vite
Nginx runtime
```

### Backend

Responsible for:

```text
API
Node.js
Express
Application logic
```

---

# 16. Frontend API Configuration

The frontend needs to know where the backend API is available.

The Docker-specific frontend configuration uses:

```text
.env.docker
```

with:

```text
VITE_API_BASE_URL=http://backend:3000
```

The important part is:

```text
backend
```

This represents the backend container/service name when the containers are connected through an appropriate Docker network.

The frontend does not need to use:

```text
localhost
```

to communicate with another container.

---

# 17. Why `localhost` Is Important

Inside a container:

```text
localhost
```

refers to that same container.

Therefore:

```text
Frontend Container
localhost
```

does **not** automatically mean:

```text
Backend Container
```

Instead, container-to-container communication can use the backend's Docker network name.

For example:

```text
Frontend Container
       |
       | http://backend:3000
       v
Backend Container
```

This is an important Docker networking concept.

---

# 18. Docker Build Context

When building an image, Docker needs access to the files referenced by the Dockerfile.

The directory supplied to:

```bash
docker build
```

is called the **build context**.

Conceptually:

```text
Build Context
     |
     v
Dockerfile + required files
     |
     v
Docker Image
```

The build context should contain the application files required by that Dockerfile.

This becomes important when we build the frontend and backend images.

---

# 19. Docker Ignore Files

Docker supports:

```text
.dockerignore
```

This file prevents unnecessary files from being sent into the Docker build context.

Examples of files that commonly should not be included are:

```text
node_modules/
.git/
logs/
temporary files
```

The actual FlavorForge `.dockerignore` configuration should be verified from the repository.

Do not create or modify ignore rules simply based on this generic example.

---

# 20. Docker Image Naming

Docker images need names and may also use tags.

Conceptually:

```text
image-name:tag
```

For example:

```text
flavorforge-frontend:v1
```

and:

```text
flavorforge-backend:v1
```

Tags identify a particular image version.

During the actual FlavorForge implementation, image tags were also used when publishing images to Azure Container Registry.

---

# 21. Local Docker vs Azure Container Registry

There are two different locations for Docker images.

### Local Docker

Images are stored on the developer's machine.

```text
Developer Computer
       |
       v
Docker Engine
       |
       v
Local Docker Images
```

### Azure Container Registry

Images are stored remotely in Azure Container Registry.

```text
Docker Image
      |
      | docker push
      v
Azure Container Registry
```

The local build and ACR publishing are separate steps.

---

# 22. Docker's Role in the Overall FlavorForge Architecture

Docker sits between application development and Kubernetes deployment.

The overall flow is:

```text
Application Source Code
          |
          v
       Docker
          |
          v
    Docker Image
          |
          v
Azure Container Registry
          |
          v
        AKS
          |
          v
     Kubernetes
```

Later, Azure DevOps automates much of this process.

---

# 23. Docker in the CI/CD Pipeline

The final FlavorForge pipeline includes Docker-related stages.

The high-level flow is:

```text
GitHub
   |
   v
Azure DevOps
   |
   v
Build Application
   |
   v
Run Tests
   |
   v
Build Docker Images
   |
   v
Scan Images
   |
   v
Push Images to ACR
   |
   v
Deploy to AKS
```

Docker therefore becomes the packaging layer between application code and Kubernetes.

---

# 24. Verify the Project Before Creating Dockerfiles

Before continuing, verify that the application directories exist.

From the project root:

```bash
ls
```

You should be able to identify the application directories, including:

```text
frontend
backend
```

You can also check:

```bash
ls frontend
```

and:

```bash
ls backend
```

The exact contents depend on the current repository version.

---

# 25. Do Not Build Images Yet

At this stage, the purpose is only to verify Docker and understand the containerization structure.

Do not run the final FlavorForge image build commands yet.

The next documents will perform those steps in order:

```text
02-frontend-dockerfile.md
```

then:

```text
03-backend-dockerfile.md
```

then:

```text
04-build-images.md
```

---

# 26. Docker Setup Verification

Run the following commands:

```bash
docker --version
```

```bash
docker info
```

```bash
docker ps
```

```bash
docker images
```

```bash
docker ps -a
```

These verify:

```text
Docker installed
       |
       v
Docker engine available
       |
       v
Docker CLI working
       |
       v
Images can be listed
       |
       v
Containers can be listed
```

---

# 27. Troubleshooting

## Problem: `docker: command not found`

Docker is not available from the current environment.

Verify the Docker installation and WSL/Docker integration before continuing.

---

## Problem: Cannot connect to Docker daemon

If:

```bash
docker info
```

returns an error indicating that Docker cannot connect to the daemon, Docker Engine may not be running or the WSL integration may not be available.

Start/check the Docker environment and run:

```bash
docker info
```

again.

---

## Problem: `docker ps` shows no containers

This is not necessarily an error.

Run:

```bash
docker ps -a
```

If there are no containers, the Docker environment is simply not running any containers yet.

Containers will be created in the later Docker steps.

---

## Problem: No FlavorForge images appear

At this stage this is expected.

Images are created later using the Dockerfiles.

Continue with:

```text
02-frontend-dockerfile.md
```

---

# 28. Reviewer Explanation

### "Why did you use Docker?"

> "I used Docker to package the FlavorForge frontend and backend into reproducible container images. This separates the application runtime from the host environment and provides consistent artifacts that can later be stored in Azure Container Registry and deployed to AKS."

### "Did you create one Docker image or two?"

> "I created separate images for the frontend and backend because they are separate application components with different runtime responsibilities."

### "What is the difference between an image and a container?"

> "A Docker image is the packaged application artifact. A container is a running instance created from that image."

### "Why is the frontend using Nginx?"

> "The React application is built into static production files. Nginx is used as the lightweight production web server for serving those files."

### "How does the frontend communicate with the backend?"

> "The Docker-specific frontend configuration uses the backend service name and port rather than treating localhost as the backend container."

### "Where do the images go after Docker builds them?"

> "Initially they exist locally in the Docker engine. Later they are tagged and pushed to Azure Container Registry, which is the remote image registry used by the AKS deployment."

---

# 29. Expected Result

At the end of this step:

```text
Docker installed
        |
        v
Docker Engine available
        |
        v
Docker CLI verified
        |
        v
FlavorForge frontend identified
        |
        v
FlavorForge backend identified
        |
        v
Ready to create Dockerfiles
```

The application source code has **not** been changed by this setup verification.

The Docker image build happens in the following steps.

---

# 30. Next Step

Continue with:

```text
docs/BUILD-JOURNEY/04-docker/02-frontend-dockerfile.md
```

That document will explain exactly how the FlavorForge React/Vite frontend was containerized, including the multi-stage build and Nginx runtime.
