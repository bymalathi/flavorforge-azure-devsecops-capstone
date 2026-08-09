# Docker Setup — Complete Beginner Build Guide

## Objective

In the previous section, we verified that the FlavorForge application works.

Now we are going to introduce Docker.

We will do this slowly:

```text
Application
     |
     v
Docker
     |
     v
Docker Image
     |
     v
Docker Container
```

At this step, **we are not building the FlavorForge images yet**.

First we will:

1. Open the FlavorForge project.
2. Check that Docker is installed.
3. Check that Docker is running.
4. Check that Docker can list images.
5. Check that Docker can list containers.
6. Understand how FlavorForge frontend and backend will be containerized.
7. Prepare for the next Dockerfile steps.

The actual Docker image creation comes later.

---

# 1. Before Starting

We already have the FlavorForge application:

```text
flavorforge-azure-devsecops-capstone/
│
├── frontend/
│
└── backend/
```

The application contains two separate parts:

```text
Frontend
React + Vite
```

and:

```text
Backend
Node.js + Express
```

We are going to create separate containers for them.

The final idea will be:

```text
Frontend
   |
   v
Frontend Docker Image
   |
   v
Frontend Container


Backend
   |
   v
Backend Docker Image
   |
   v
Backend Container
```

---

# 2. Open WSL

Open your WSL terminal.

We will use WSL for the Docker commands in this Build Journey.

First check where you are:

```bash
pwd
```

You can now see your current directory.

---

# 3. Go to the FlavorForge Project

Run:

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

Now check your location:

```bash
pwd
```

You should see something similar to:

```text
/home/YOUR_USERNAME/flavorforge-azure-devsecops-capstone
```

Your username will be different.

The important part is:

```text
flavorforge-azure-devsecops-capstone
```

---

# 4. Check the Project

Run:

```bash
ls
```

You should be able to see the main project folders.

The two application folders we care about right now are:

```text
frontend
backend
```

Check the frontend:

```bash
ls frontend
```

Then check the backend:

```bash
ls backend
```

At this point we are only confirming that the application source code is still present.

---

# 5. What Are We Going to Do With Docker?

Before using commands, understand the basic idea.

Currently:

```text
Your Computer
     |
     +---- React Frontend
     |
     +---- Node.js Backend
```

After Dockerization:

```text
Your Computer
     |
     +---- Docker
             |
             +---- Frontend Container
             |
             +---- Backend Container
```

Docker gives each application component a consistent runtime environment.

---

# 6. What Is a Docker Image?

A Docker image is the packaged version of an application.

Think of it like a template.

```text
Docker Image
      |
      v
Docker Container
```

For FlavorForge, we will eventually have:

```text
Frontend Image
Backend Image
```

These images can then be pushed to Azure Container Registry.

---

# 7. What Is a Docker Container?

A container is a running instance of a Docker image.

For example:

```text
Frontend Docker Image
        |
        | docker run
        v
Frontend Container
```

and:

```text
Backend Docker Image
        |
        | docker run
        v
Backend Container
```

So remember:

```text
Image = packaged application

Container = running application
```

---

# 8. What Is a Dockerfile?

A Dockerfile tells Docker how to create an image.

The basic flow is:

```text
Dockerfile
     |
     | docker build
     v
Docker Image
```

The Dockerfile can tell Docker:

* which base image to use
* where the application should live
* how dependencies should be installed
* how the application should be built
* which port the application uses
* how the application should start

FlavorForge uses separate Dockerfiles for the frontend and backend.

---

# 9. Check Docker Installation

Now let's actually check Docker.

Run:

```bash
docker --version
```

You should get a response similar to:

```text
Docker version ...
```

The exact version depends on the Docker version installed on your machine.

If you get a version, Docker is installed.

---

# 10. What If Docker Is Not Found?

If you see something like:

```text
docker: command not found
```

stop here.

Do not continue with Docker image creation.

Docker must first be installed and available from WSL.

Once Docker is available, run again:

```bash
docker --version
```

---

# 11. Check Whether Docker Engine Is Running

Installing Docker is not enough.

The Docker engine must also be running.

Run:

```bash
docker info
```

This command asks Docker for information about the Docker environment.

If Docker is working correctly, you will see information about:

```text
Containers
Images
Server Version
Storage
Runtime
and other Docker information
```

The exact output will depend on your Docker installation.

---

# 12. Why Do We Run `docker info`?

There are two things we need:

```text
Docker CLI
     +
Docker Engine
```

Think of it like this:

```text
Your Command
     |
     v
Docker CLI
     |
     v
Docker Engine
     |
     v
Containers / Images
```

`docker --version` mainly verifies that the Docker command is available.

`docker info` verifies that the Docker CLI can communicate with the Docker engine.

---

# 13. Check Running Containers

Now run:

```bash
docker ps
```

This displays currently running containers.

You may see something like:

```text
CONTAINER ID   IMAGE   COMMAND   CREATED   STATUS   PORTS   NAMES
```

You may also see no containers.

For example:

```text
CONTAINER ID   IMAGE   COMMAND   CREATED   STATUS   PORTS   NAMES
```

with no rows underneath.

That is completely fine.

It simply means:

```text
Docker is running
but
no containers are currently running
```

---

# 14. Check All Containers

Now run:

```bash
docker ps -a
```

This shows:

```text
Running containers
+
Stopped containers
```

At this stage, FlavorForge containers may not exist yet.

That is expected.

We will create them later.

---

# 15. Check Docker Images

Run:

```bash
docker images
```

This displays the Docker images available locally.

At this stage, you may not see FlavorForge images.

That is also expected.

We have not built them yet.

Later we will create images such as:

```text
FlavorForge Frontend Image
FlavorForge Backend Image
```

---

# 16. Understand the Current Situation

At this point our situation should look like:

```text
FlavorForge Source Code
          |
          v
     frontend/
     backend/
          |
          |
          v
       Docker
          |
          v
Docker is installed
Docker is running
```

We have **not built an image yet**.

That is intentional.

---

# 17. FlavorForge Docker Architecture

FlavorForge has two application components.

### Frontend

```text
React + Vite
```

### Backend

```text
Node.js + Express
```

We will create one Docker image for each.

```text
React + Vite
     |
     v
Frontend Dockerfile
     |
     v
Frontend Image
```

and:

```text
Node.js + Express
     |
     v
Backend Dockerfile
     |
     v
Backend Image
```

---

# 18. Why Two Images?

We could theoretically put everything into one container.

But FlavorForge is designed as two separate application components.

Keeping them separate gives us:

```text
Frontend
   |
   +---- Build independently
   |
   +---- Deploy independently
   |
   +---- Scale independently


Backend
   |
   +---- Build independently
   |
   +---- Deploy independently
   |
   +---- Scale independently
```

This design becomes especially useful later in Kubernetes.

---

# 19. Frontend Docker Architecture

The frontend is a React/Vite application.

The production frontend is built first and then served using Nginx.

The Docker flow is:

```text
React Source Code
       |
       v
Node.js Build Stage
       |
       | npm install
       |
       | npm run build
       |
       v
Production Build Files
       |
       v
Nginx
       |
       v
Frontend Container
```

The frontend Dockerfile uses:

```text
node:22-alpine
```

as the build stage.

The final runtime uses:

```text
nginx:1.29-alpine
```

This is called a **multi-stage Docker build**.

We will build this Dockerfile in the next document.

---

# 20. Backend Docker Architecture

The backend is:

```text
Node.js + Express
```

Its Docker flow is:

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

The backend provides the API:

```text
/api/health
```

The backend will later run inside its own container.

---

# 21. Frontend → Backend Inside Docker

This is an important concept.

When applications run locally, we might have:

```text
Frontend
localhost:5173
      |
      v
Backend
localhost:3000
```

Inside Docker, the containers communicate using Docker networking.

The FlavorForge Docker frontend configuration uses:

```text
VITE_API_BASE_URL=http://backend:3000
```

So the communication becomes:

```text
Frontend Container
       |
       | http://backend:3000
       v
Backend Container
       |
       v
Express API
```

---

# 22. Why Not `localhost:3000`?

This is one of the most important beginner Docker concepts.

Inside a container:

```text
localhost
```

means:

```text
this container
```

It does **not** automatically mean another container.

Therefore:

```text
Frontend Container
       |
       | localhost:3000
       X
       |
       v
Backend Container
```

is not the correct way to address the backend container.

Instead, Docker networking allows the frontend to use the backend's service/container name:

```text
http://backend:3000
```

So:

```text
Frontend Container
       |
       | backend:3000
       v
Backend Container
```

---

# 23. What Is `backend`?

In:

```text
http://backend:3000
```

the parts mean:

```text
backend
   |
   +---- Docker network hostname

3000
   |
   +---- Backend application port
```

The backend container/service can therefore be reached through the Docker network using the name:

```text
backend
```

The exact networking setup will be used when we run the containers.

---

# 24. Check Docker Networking Later

We do not need to create the final Docker network during this setup document.

That will happen as part of the container-running/testing stage.

For now, remember:

```text
Container
    |
    v
Docker Network
    |
    +---- frontend
    |
    +---- backend
```

The containers can communicate using the appropriate Docker network names.

---

# 25. Docker Build Context

When we eventually run:

```bash
docker build
```

Docker needs to know which files it is allowed to use during the build.

That collection of files is called the:

```text
Build Context
```

Think of it as:

```text
Build Context
      |
      +---- Dockerfile
      |
      +---- package.json
      |
      +---- source code
      |
      +---- other required files
      |
      v
Docker Image
```

The correct build context is important because Docker can only access files available within that context.

We will specify the correct build context in the actual image-building steps.

---

# 26. `.dockerignore`

Docker can use a file named:

```text
.dockerignore
```

This prevents unnecessary files from being sent into the Docker build context.

Common examples include:

```text
node_modules/
.git/
logs/
temporary files
```

For FlavorForge, always use the `.dockerignore` configuration that exists in the actual repository.

Do not blindly add files just because they are commonly ignored in other projects.

---

# 27. Local Docker Images vs ACR

There are two stages.

### Stage 1 — Local

The image exists on our computer:

```text
Dockerfile
    |
    v
docker build
    |
    v
Local Docker Image
```

### Stage 2 — Azure Container Registry

Later:

```text
Local Docker Image
       |
       | docker push
       v
Azure Container Registry
```

ACR is the remote image registry used by FlavorForge.

---

# 28. Docker's Place in the Complete Build Journey

The complete architecture eventually becomes:

```text
Application Source
       |
       v
Dockerfile
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

Later, Azure DevOps automates these steps.

The pipeline will eventually perform a flow similar to:

```text
Build
  |
  v
Test
  |
  v
Security
  |
  v
Code Quality
  |
  v
Docker Build
  |
  v
Trivy Scan
  |
  v
Push to ACR
  |
  v
Deploy to AKS
```

---

# 29. Final Docker Setup Verification

Now run these commands one by one.

### Command 1 — Docker version

```bash
docker --version
```

Confirm that Docker returns a version.

---

### Command 2 — Docker engine

```bash
docker info
```

Confirm that Docker returns engine information.

---

### Command 3 — Running containers

```bash
docker ps
```

An empty result is okay.

---

### Command 4 — All containers

```bash
docker ps -a
```

At this stage there may be no FlavorForge containers.

That is okay.

---

### Command 5 — Local images

```bash
docker images
```

At this stage there may be no FlavorForge images.

That is okay.

---

# 30. Verify the Application Folders One More Time

Return to the project root:

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

Run:

```bash
ls
```

Confirm that:

```text
frontend
backend
```

are present.

This confirms that our Docker setup is still connected to the correct FlavorForge application.

---

# 31. What We Have Completed

We have now verified:

```text
FlavorForge Source Code
        |
        v
Frontend exists
        |
        v
Backend exists
        |
        v
Docker installed
        |
        v
Docker Engine running
        |
        v
Docker CLI working
        |
        v
Ready for Dockerfiles
```

We have **not built any FlavorForge Docker image yet**.

That comes next.

---

# 32. Final Beginner Checklist

Before moving forward, confirm:

* [ ] WSL terminal is working.
* [ ] FlavorForge repository is accessible.
* [ ] `frontend/` exists.
* [ ] `backend/` exists.
* [ ] `docker --version` works.
* [ ] `docker info` works.
* [ ] `docker ps` works.
* [ ] `docker ps -a` works.
* [ ] `docker images` works.
* [ ] Docker Engine is running.
* [ ] We understand image vs container.
* [ ] We understand Dockerfile.
* [ ] We understand why frontend and backend use separate images.
* [ ] We understand why the frontend uses `backend:3000` inside Docker.
* [ ] We are ready to create the frontend Dockerfile.

---

# 33. What Happens Next?

Now we move from:

```text
Docker Setup
```

to actually creating the first Dockerfile.

The next document is:

```text
docs/BUILD-JOURNEY/04-docker/02-frontend-dockerfile.md
```

There we will do it step by step:

```text
1. Go to frontend
        |
        v
2. Create/check Dockerfile
        |
        v
3. Understand every line
        |
        v
4. Understand node:22-alpine
        |
        v
5. Install dependencies
        |
        v
6. Build React application
        |
        v
7. Copy build into Nginx
        |
        v
8. Expose frontend port
        |
        v
9. Understand the final image
```

Only after that will we build the actual frontend Docker image.
