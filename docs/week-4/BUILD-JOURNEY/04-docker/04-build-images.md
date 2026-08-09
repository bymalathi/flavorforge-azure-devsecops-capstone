# 04 — Build Docker Images

## 1. Purpose

After creating the frontend and backend Dockerfiles, the next step in FlavorForge was to build Docker images from those Dockerfiles.

The goal was to turn the application source code into deployable container images that could later be:

1. Tested locally
2. Tagged as required for the container registry
3. Pushed to Azure Container Registry (ACR)
4. Pulled by Azure Kubernetes Service (AKS)

For FlavorForge, the frontend and backend were built as **separate Docker images**.

This separation allowed Kubernetes to deploy and manage the frontend and backend independently.

---

# 2. Images Created

FlavorForge has two application images.

### Frontend

```text
Frontend source
    ↓
React + Vite application
    ↓
frontend/Dockerfile
    ↓
Docker image
    ↓
Nginx runtime
```

### Backend

```text
Backend source
    ↓
Node.js + Express application
    ↓
backend/Dockerfile
    ↓
Docker image
    ↓
Node.js runtime
```

The frontend Dockerfile uses a multi-stage build.

Conceptually:

```text
Node.js builder
      ↓
Install dependencies
      ↓
Copy application source
      ↓
npm run build
      ↓
React production files
      ↓
Nginx runtime image
```

The backend image packages the Node.js/Express application with the dependencies required to run it.

---

# 3. Before Building

Docker must be installed and running before building the images.

Verify the Docker installation:

```bash
docker --version
```

Then verify that the Docker engine is available:

```bash
docker info
```

A successful `docker info` response confirms that the Docker engine is running and accessible.

These commands are verification commands; they are not part of the image build itself.

---

# 4. FlavorForge Repository Structure

The Dockerfiles used for the application are:

```text
frontend/Dockerfile
backend/Dockerfile
```

The relevant repository structure is:

```text
flavorforge-azure-devsecops-capstone/
│
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── application source
│
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── application source
│
└── docker/
    └── README.md
```

The `docker/README.md` contains the documented Docker build commands for FlavorForge.

---

# 5. Build the Frontend Image

The frontend image is built using:

```text
frontend/Dockerfile
```

From the **repository root**, the documented build command is:

```bash
docker build -t flavorforge-frontend ./frontend
```

### What this command means

```text
docker build
```

Tells Docker to build an image.

```text
-t flavorforge-frontend
```

Assigns the image the name:

```text
flavorforge-frontend
```

No explicit tag is specified in this command.

Therefore Docker uses its default tag:

```text
latest
```

The resulting local image is:

```text
flavorforge-frontend:latest
```

The final part:

```text
./frontend
```

specifies the frontend directory as the Docker build context.

---

# 6. What Happens During the Frontend Build

The frontend Dockerfile uses a multi-stage build.

Conceptually, the process is:

```text
Frontend source code
        │
        ▼
Node.js builder image
        │
        ├── Install dependencies
        │
        ├── Copy application source
        │
        └── npm run build
        │
        ▼
Production frontend files
        │
        ▼
Nginx runtime image
        │
        ▼
flavorforge-frontend:latest
```

The important point is that the Node.js build environment is used to create the production frontend files.

The final runtime stage uses Nginx to serve those production files.

Therefore, the final frontend runtime image does not need to run the development build environment.

---

# 7. Verify the Frontend Image

After the build completes, list the Docker images:

```bash
docker images
```

or:

```bash
docker image ls
```

You should find:

```text
flavorforge-frontend
```

with the default tag:

```text
latest
```

A more targeted check is:

```bash
docker images flavorforge-frontend
```

The resulting local image is:

```text
flavorforge-frontend:latest
```

---

# 8. Build the Backend Image

The backend image is built using:

```text
backend/Dockerfile
```

From the **repository root**, the documented command is:

```bash
docker build -t flavorforge-backend ./backend
```

The resulting local image is:

```text
flavorforge-backend:latest
```

The final part of the command:

```text
./backend
```

specifies the backend directory as the Docker build context.

---

# 9. What Happens During the Backend Build

The backend build can be represented as:

```text
Backend source code
        │
        ▼
backend/Dockerfile
        │
        ▼
Docker build
        │
        ▼
Node.js + Express application image
        │
        ▼
flavorforge-backend:latest
```

The backend image contains the Node.js/Express application and the dependencies required to run it.

---

# 10. Verify the Backend Image

Run:

```bash
docker images
```

or:

```bash
docker image ls
```

To specifically check the backend image:

```bash
docker images flavorforge-backend
```

The resulting image should be:

```text
flavorforge-backend:latest
```

---

# 11. Why Frontend and Backend Were Built Separately

The two application components were packaged into separate images:

```text
                    FlavorForge
                         │
               ┌─────────┴─────────┐
               │                   │
               ▼                   ▼
           Frontend             Backend
               │                   │
               ▼                   ▼
    frontend/Dockerfile    backend/Dockerfile
               │                   │
               ▼                   ▼
flavorforge-frontend:     flavorforge-backend:
latest                    latest
```

This separation is important for the later Kubernetes deployment.

Kubernetes can have:

```text
Frontend Deployment
        ↓
Frontend Pods
```

and:

```text
Backend Deployment
        ↓
Backend Pods
```

The two components can therefore be managed independently.

---

# 12. Understanding Image Tags

A Docker image reference normally follows this structure:

```text
image-name:tag
```

For example:

```text
flavorforge-frontend:latest
```

Here:

```text
flavorforge-frontend
```

is the image name.

And:

```text
latest
```

is the image tag.

In the documented local FlavorForge build commands, no explicit tag was supplied:

```bash
docker build -t flavorforge-frontend ./frontend
```

```bash
docker build -t flavorforge-backend ./backend
```

Therefore Docker uses:

```text
latest
```

and the resulting images are:

```text
flavorforge-frontend:latest
flavorforge-backend:latest
```

---

# 13. Important Version-Tag Clarification

FlavorForge later used version information such as `1.3` for application/image deployments.

However, we should **not rewrite the documented local build commands as**:

```bash
docker build -t flavorforge-frontend:1.3 ./frontend
```

or:

```bash
docker build -t flavorforge-backend:1.3 ./backend
```

unless there is direct evidence that those exact commands were used for this build step.

The documented local build commands are:

```bash
docker build -t flavorforge-frontend ./frontend
```

```bash
docker build -t flavorforge-backend ./backend
```

Therefore this BUILD-JOURNEY step records the local images as:

```text
flavorforge-frontend:latest
flavorforge-backend:latest
```

Any later version-specific tagging belongs to the later image/registry workflow and should be documented there.

This distinction keeps the BUILD-JOURNEY reproducible instead of mixing different stages of the project.

---

# 14. Inspect the Images

Docker provides an image inspection command:

```bash
docker image inspect flavorforge-frontend:latest
```

and:

```bash
docker image inspect flavorforge-backend:latest
```

These commands can be useful for examining image metadata and configuration.

For example, image inspection can help troubleshoot:

* Image configuration
* Entrypoint
* Environment configuration
* Exposed ports
* Architecture
* Image metadata

The important result at this stage is that Docker has successfully created the images.

---

# 15. View Image Layers

Docker can also show the history of an image:

```bash
docker image history flavorforge-frontend:latest
```

and:

```bash
docker image history flavorforge-backend:latest
```

This shows the layers that make up each image.

Conceptually:

```text
Dockerfile instructions
        │
        ▼
Docker build
        │
        ▼
Image layers
        │
        ▼
Docker image
```

This is useful when understanding how the Dockerfile becomes a container image.

---

# 16. Understand Docker Build Cache

Docker can reuse previously built layers when the relevant inputs have not changed.

For example, dependency-related files can affect an earlier layer:

```text
package.json
package-lock.json
        │
        ▼
Install dependencies
        │
        ▼
Application source
        │
        ▼
Application build
```

If an earlier layer can be reused, Docker does not necessarily need to execute that part of the build again.

This can make repeated builds faster.

The exact cache behavior depends on the Dockerfile instructions and whether the files used by those instructions have changed.

---

# 17. Normal Build vs Clean Build

The normal documented frontend build is:

```bash
docker build -t flavorforge-frontend ./frontend
```

The normal documented backend build is:

```bash
docker build -t flavorforge-backend ./backend
```

Docker also supports options such as:

```bash
--no-cache
```

and:

```bash
--pull
```

For example:

```bash
docker build --no-cache -t flavorforge-frontend ./frontend
```

`--no-cache` tells Docker not to reuse the build cache.

Similarly:

```bash
docker build --pull -t flavorforge-frontend ./frontend
```

asks Docker to check for a newer version of the base image.

These are **optional Docker capabilities**, not commands that should be presented as part of the original FlavorForge build unless they were actually used.

For reproducibility, we distinguish between:

```text
Actual FlavorForge command
```

and:

```text
Optional Docker troubleshooting command
```

---

# 18. Build Verification

After building both images:

```bash
docker images
```

The relevant FlavorForge images should be present:

```text
flavorforge-frontend:latest
flavorforge-backend:latest
```

The overall process is:

```text
Application source
       ↓
Dockerfiles
       ↓
docker build
       ↓
Local Docker images
       ↓
Verify images
       ↓
Ready for the next container workflow stage
```

---

# 19. Local Image vs Azure Container Registry Image

It is important to understand that building an image does **not** automatically push it to Azure Container Registry.

After the local build:

```text
Developer machine
└── Docker
    ├── flavorforge-frontend:latest
    └── flavorforge-backend:latest
```

The images are still stored locally.

The later registry flow is:

```text
Local Docker Image
        │
        ▼
ACR-compatible image reference/tag
        │
        ▼
Azure Container Registry
        │
        ▼
AKS
```

Therefore:

> **`docker build` creates the local Docker image. It does not by itself push the image to ACR.**

The registry push is a separate step.

---

# 20. What We Actually Achieved

At the end of this step, FlavorForge moved from:

```text
Dockerfiles
+
Application source
```

to:

```text
Built local Docker images
```

Specifically:

```text
flavorforge-frontend:latest
flavorforge-backend:latest
```

The actual documented build commands were:

```bash
docker build -t flavorforge-frontend ./frontend
```

and:

```bash
docker build -t flavorforge-backend ./backend
```

---

# 21. Important Learning

A Dockerfile is **not** the container itself.

The relationship is:

```text
Dockerfile
    │
    │ docker build
    ▼
Docker Image
    │
    │ docker run
    ▼
Container
```

For FlavorForge:

```text
frontend/Dockerfile
        │
        ▼
flavorforge-frontend:latest
```

and:

```text
backend/Dockerfile
        │
        ▼
flavorforge-backend:latest
```

Later in the deployment process, Kubernetes does not build these images.

Instead, Kubernetes pulls the required images from the container registry and creates containers from those images.

This distinction is important when explaining the FlavorForge architecture during the CBC demo.

---

# 22. Evidence to Capture

For reproducibility documentation, the most useful evidence from this step is the Docker output showing that the images were created.

### Docker version

```bash
docker --version
```

### Built images

```bash
docker images
```

### Frontend image details

```bash
docker image inspect flavorforge-frontend:latest
```

### Backend image details

```bash
docker image inspect flavorforge-backend:latest
```

### Optional image history

```bash
docker image history flavorforge-frontend:latest
```

```bash
docker image history flavorforge-backend:latest
```

The most important screenshot is the output of:

```bash
docker images
```

showing:

```text
flavorforge-frontend
flavorforge-backend
```

with the expected local tag:

```text
latest
```

These provide evidence that the Dockerfiles were successfully converted into local Docker images before the images moved into the Azure workflow.

---

# 23. Complete Docker Build Flow

The FlavorForge Docker build flow is:

```text
                         FlavorForge Repository
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
                    ▼                           ▼
                frontend/                   backend/
                    │                           │
                    ▼                           ▼
          frontend/Dockerfile         backend/Dockerfile
                    │                           │
                    │ docker build              │ docker build
                    ▼                           ▼
      flavorforge-frontend:latest   flavorforge-backend:latest
                    │                           │
                    └─────────────┬─────────────┘
                                  │
                                  ▼
                         Local Docker Images
                                  │
                                  ▼
                         Next Registry Stage
```

---

# 24. Result

The Docker image build stage established the first container artifacts for FlavorForge:

```text
React + Vite Frontend
        │
        ▼
frontend/Dockerfile
        │
        ▼
flavorforge-frontend:latest
```

and:

```text
Node.js + Express Backend
        │
        ▼
backend/Dockerfile
        │
        ▼
flavorforge-backend:latest
```

The documented build commands are:

```bash
docker build -t flavorforge-frontend ./frontend
```

```bash
docker build -t flavorforge-backend ./backend
```

At this point, the images exist locally.

The next stage is to move from **local Docker images** to **Azure Container Registry (ACR)** as part of the FlavorForge Azure deployment workflow.
