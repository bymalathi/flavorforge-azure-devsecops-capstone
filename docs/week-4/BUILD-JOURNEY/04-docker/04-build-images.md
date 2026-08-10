# 04 — Build Docker Images

## Objective

After creating the frontend and backend Dockerfiles, the next step in the FlavorForge build journey was to build the Docker images.

At this stage, the goal was to convert the two application components into Docker images:

```text
Frontend source
      |
      v
frontend/Dockerfile
      |
      v
Frontend Docker image
```

and:

```text
Backend source
      |
      v
backend/Dockerfile
      |
      v
Backend Docker image
```

The frontend and backend were built as **separate Docker images** because they are separate application components and are deployed independently later in Kubernetes.

---

# 1. Docker Build Setup

The Dockerfiles already created in the previous steps were:

```text
frontend/Dockerfile
backend/Dockerfile
```

The repository structure confirmed that both application directories contain their own Dockerfiles:

```text
flavorforge-azure-devsecops-capstone/
│
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   └── package-lock.json
│
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── package-lock.json
│
├── docker/
│   └── README.md
│
└── screenshots/
    └── docker/
```

Before building the images, Docker was verified to be available.

### Command

```bash
docker --version
```

Then Docker was checked with:

```bash
docker info
```

### Result

Docker was running and ready to build the FlavorForge images.

### Evidence

![Docker build/setup verification](/screenshots/docker/1-docker-build-success.png)

---

# 2. Build the Frontend Docker Image

The frontend Docker image was built from the repository root.

### Command

```bash
docker build -t flavorforge-frontend ./frontend
```

The command contains three important parts:

```text
docker build
```

Build a Docker image.

```text
-t flavorforge-frontend
```

Give the image the name:

```text
flavorforge-frontend
```

```text
./frontend
```

Use the `frontend` directory as the Docker build context.

Because no explicit tag was supplied, Docker used its default:

```text
latest
```

Therefore the resulting local image was:

```text
flavorforge-frontend:latest
```

---

# 3. Frontend Image Build

The frontend Dockerfile uses a multi-stage Docker build.

The build process was:

```text
Frontend Source
      |
      v
Node.js Builder
      |
      v
Install Dependencies
      |
      v
Copy Frontend Source
      |
      v
npm run build
      |
      v
Production Build
      |
      v
Nginx Runtime
      |
      v
flavorforge-frontend:latest
```

The Node.js stage was responsible for building the React/Vite application.

The final image uses Nginx to serve the generated frontend files.

This means the final runtime image contains the production frontend rather than requiring the development environment to run the application.

### Evidence — Frontend Docker Build

![Frontend Docker image build success](/screenshots/docker/6-backend-build-success.png)

> The repository also contains additional Docker build screenshots under `screenshots/docker/`. The exact screenshot used here should correspond to the frontend build output when maintaining the final repository documentation.

---

# 4. Verify the Frontend Image

After the frontend build completed, the Docker images were listed.

### Command

```bash
docker images
```

The frontend image was expected to appear as:

```text
flavorforge-frontend    latest
```

A targeted check can also be performed with:

```bash
docker images flavorforge-frontend
```

### Result

The frontend Docker image was successfully created locally.

```text
flavorforge-frontend:latest
```

### Evidence

![Docker images](/screenshots/docker/4-docker-images.png)

---

# 5. Build the Backend Docker Image

The backend image was built separately from the backend directory.

From the repository root:

### Command

```bash
docker build -t flavorforge-backend ./backend
```

The command uses:

```text
./backend
```

as the Docker build context.

The image name is:

```text
flavorforge-backend
```

Since no explicit tag was supplied, Docker used:

```text
latest
```

Therefore the resulting local image was:

```text
flavorforge-backend:latest
```

---

# 6. Backend Image Build

The backend Dockerfile packages the Node.js and Express application into a Docker image.

The build flow was:

```text
Backend Source
      |
      v
backend/Dockerfile
      |
      v
Node.js Base Image
      |
      v
Install Backend Dependencies
      |
      v
Copy Backend Source
      |
      v
Backend Docker Image
      |
      v
flavorforge-backend:latest
```

The backend image contains the application and the dependencies required to run the Express API.

### Evidence — Backend Docker Build

![Backend Docker build success](/screenshots/docker/6-backend-build-success.png)

---

# 7. Verify the Backend Image

The Docker images were listed after the backend build.

### Command

```bash
docker images
```

The resulting images included the FlavorForge application images:

```text
flavorforge-frontend:latest
flavorforge-backend:latest
```

A targeted backend check can also be performed:

```bash
docker images flavorforge-backend
```

### Result

The backend Docker image was successfully created locally.

```text
flavorforge-backend:latest
```

### Evidence

![FlavorForge Docker images](/screenshots/docker/13-1-docker-images.png)

---

# 8. Both FlavorForge Images

At this point, both application components had been converted into local Docker images.

```text
                 FlavorForge
                     |
          ┌──────────┴──────────┐
          |                     |
          v                     v
      Frontend                Backend
          |                     |
          v                     v
 frontend/Dockerfile     backend/Dockerfile
          |                     |
          v                     v
flavorforge-frontend    flavorforge-backend
       :latest                :latest
```

The local Docker image state was:

```text
flavorforge-frontend:latest
flavorforge-backend:latest
```

### Evidence

![FlavorForge Docker images created](/screenshots/docker/13-1-docker-images.png)

---

# 9. Understanding the Image Names and Tags

Docker image references follow this format:

```text
image-name:tag
```

For FlavorForge:

```text
flavorforge-frontend:latest
```

means:

```text
Image name = flavorforge-frontend
Tag        = latest
```

And:

```text
flavorforge-backend:latest
```

means:

```text
Image name = flavorforge-backend
Tag        = latest
```

The actual local build commands were:

```bash
docker build -t flavorforge-frontend ./frontend
```

and:

```bash
docker build -t flavorforge-backend ./backend
```

Because the commands did not specify another tag, Docker assigned:

```text
latest
```

---

# 10. Important: Local Build vs Registry Tagging

Building an image does **not** automatically send the image to Azure Container Registry.

At this stage the images existed on the local Docker environment:

```text
Local Docker
     |
     ├── flavorforge-frontend:latest
     |
     └── flavorforge-backend:latest
```

The later Azure workflow moves these images toward ACR:

```text
Local Docker Image
        |
        v
ACR image tag
        |
        v
Azure Container Registry
        |
        v
AKS
```

Therefore:

```text
docker build
```

creates the local image.

It does not perform:

```text
docker push
```

The registry publishing stage is documented separately in the Azure/ACR part of the BUILD-JOURNEY.

---

# 11. Version Tag Clarification

FlavorForge later used version information such as:

```text
1.3
```

during the image publishing and deployment workflow.

However, this build step records the actual local build commands:

```bash
docker build -t flavorforge-frontend ./frontend
```

```bash
docker build -t flavorforge-backend ./backend
```

Therefore the local images produced at this stage are documented as:

```text
flavorforge-frontend:latest
flavorforge-backend:latest
```

We do **not** rewrite these commands as:

```bash
docker build -t flavorforge-frontend:1.3 ./frontend
```

or:

```bash
docker build -t flavorforge-backend:1.3 ./backend
```

unless there is direct evidence that those exact commands were used at this stage.

The later ACR/version-tagging workflow belongs to the subsequent Azure documentation.

---

# 12. Inspect the Images

Once the images were created, Docker could be used to inspect them.

### Frontend

```bash
docker image inspect flavorforge-frontend:latest
```

### Backend

```bash
docker image inspect flavorforge-backend:latest
```

These commands provide information about the image configuration and metadata.

The important result for this build step was that both images had been successfully created.

---

# 13. View Docker Image History

Docker also provides image history information.

### Frontend

```bash
docker image history flavorforge-frontend:latest
```

### Backend

```bash
docker image history flavorforge-backend:latest
```

This displays the image layers created during the Docker build.

The relationship is:

```text
Dockerfile instructions
        |
        v
Docker build
        |
        v
Docker layers
        |
        v
Docker image
```

This is particularly useful for understanding how the Dockerfile instructions become the final image.

---

# 14. Docker Build Cache

Docker can reuse previously created layers when the inputs for those layers have not changed.

For example, the frontend and backend Dockerfiles separate dependency-related steps from application source copying.

Conceptually:

```text
package.json
package-lock.json
        |
        v
Install dependencies
        |
        v
Copy application source
        |
        v
Build application
```

If the dependency files have not changed, Docker may reuse the dependency layer during a subsequent build.

This makes repeated Docker builds faster.

The exact cache behavior depends on the Dockerfile and the files that changed.

---

# 15. Build Verification

After both images were built, the Docker image list was checked.

### Command

```bash
docker images
```

The important FlavorForge entries were:

```text
flavorforge-frontend:latest
flavorforge-backend:latest
```

### Evidence

![Final Docker image list](/screenshots/docker/4-docker-images.png)

The Docker build stage therefore reached the expected result:

```text
Frontend Dockerfile
        |
        v
flavorforge-frontend:latest

Backend Dockerfile
        |
        v
flavorforge-backend:latest
```

---

# 16. Additional Docker Build Evidence

The repository contains additional screenshots captured during the Docker workflow.

These include:

```text
screenshots/docker/
├── 1-docker-build-success.png
├── 4-docker-images.png
├── 6-backend-build-success.png
├── 13-1-docker-images.png
├── 13-4-terminal-build-success.png
└── ...
```

The terminal build-success evidence can also be referenced directly:

![Docker terminal build success](/screenshots/docker/13-4-terminal-build-success.png)

These screenshots provide visual evidence of the Docker build activity rather than referring to an unspecified “previous screenshot.”

---

# 17. Frontend and Backend Are Independent Images

FlavorForge intentionally separates the frontend and backend into different images.

```text
                  FlavorForge
                      |
             ┌────────┴────────┐
             |                 |
             v                 v
         Frontend           Backend
             |                 |
             v                 v
      Dockerfile          Dockerfile
             |                 |
             v                 v
   frontend image       backend image
```

This allows the two application components to be managed independently.

Later in Kubernetes, this becomes:

```text
Frontend Deployment
        |
        v
Frontend Pods
```

and:

```text
Backend Deployment
        |
        v
Backend Pods
```

---

# 18. Complete Docker Build Flow

The actual FlavorForge Docker build flow can be summarized as:

```text
                    FlavorForge Repository
                             |
                ┌────────────┴────────────┐
                |                         |
                v                         v
            frontend/                 backend/
                |                         |
                v                         v
        frontend/Dockerfile       backend/Dockerfile
                |                         |
                | docker build            | docker build
                v                         v
   flavorforge-frontend:latest  flavorforge-backend:latest
                |                         |
                └────────────┬────────────┘
                             |
                             v
                   Local Docker Images
                             |
                             v
                    Next Azure/ACR Stage
```

---

# 19. What We Actually Achieved

Before this step, FlavorForge had:

```text
Application source
+
Dockerfiles
```

After this step, FlavorForge had:

```text
Built Docker images
```

Specifically:

```text
flavorforge-frontend:latest
flavorforge-backend:latest
```

The actual build commands were:

```bash
docker build -t flavorforge-frontend ./frontend
```

```bash
docker build -t flavorforge-backend ./backend
```

The images were then verified using Docker image listing commands.

---

# 20. Evidence Summary

The key evidence for this BUILD-JOURNEY step is stored in the repository under:

```text
screenshots/docker/
```

The most relevant evidence includes:

### Docker build success

![Docker build success](/screenshots/docker/1-docker-build-success.png)

### Docker images

![Docker images](/screenshots/docker/4-docker-images.png)

### Backend build success

![Backend Docker build success](/screenshots/docker/6-backend-build-success.png)

### Final Docker image verification

![Final Docker images](/screenshots/docker/13-1-docker-images.png)

### Terminal build evidence

![Docker terminal build success](/screenshots/docker/13-4-terminal-build-success.png)

These screenshots are part of the FlavorForge repository and are used directly as evidence for the Docker build journey.

---

# 21. Result

The Docker image build stage successfully converted the FlavorForge frontend and backend applications into local Docker images.

### Frontend

```text
React + Vite
      |
      v
frontend/Dockerfile
      |
      v
flavorforge-frontend:latest
```

### Backend

```text
Node.js + Express
      |
      v
backend/Dockerfile
      |
      v
flavorforge-backend:latest
```

The resulting images were available locally and ready for the next stage of the FlavorForge deployment workflow.

```text
Local Docker Images
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

The next BUILD-JOURNEY document is:

```text
docs/week-4/BUILD-JOURNEY/04-docker/05-run-containers.md
```
