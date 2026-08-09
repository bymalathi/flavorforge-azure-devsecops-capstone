# Backend Dockerfile — Complete Beginner Build Guide

## Objective

This document explains how the **FlavorForge backend** was containerized using Docker.

A person following this guide should understand:

1. What the backend Dockerfile does.
2. Where the Dockerfile belongs.
3. Which Node.js image is used.
4. How the backend dependencies are installed.
5. How the backend application is copied into the image.
6. Which port the container exposes.
7. How the backend container starts.
8. How to build the backend Docker image.
9. How to verify the resulting image.

The backend application is a Node.js + Express application.

The Docker flow is:

```text
FlavorForge Backend Source
          |
          v
      Dockerfile
          |
          v
   Docker Build Context
          |
          v
   Backend Docker Image
          |
          v
    Backend Container
          |
          v
 Node.js + Express API
```

---

# 1. Backend Application

The FlavorForge backend is implemented using:

```text
Node.js
Express
```

The backend provides the API used by the frontend.

The project structure contains the backend application under:

```text
backend/
```

A simplified structure is:

```text
backend/
├── package.json
├── package-lock.json
├── src/
└── tests/
```

The exact contents of `src/` and `tests/` depend on the current project version.

---

# 2. Why Containerize the Backend?

Without Docker, the backend depends directly on the environment where Node.js is installed.

For example:

```text
Developer Computer
      |
      v
Node.js
      |
      v
npm install
      |
      v
npm start
```

This can create environment differences.

Docker packages the backend and its runtime environment into a container image.

The resulting flow is:

```text
Backend Source Code
       |
       v
Docker Image
       |
       v
Container
       |
       v
Node.js + Express
```

The same image can then be used across environments such as:

```text
Local
Dev
QA
Production
AKS
```

---

# 3. Dockerfile Location

The backend Dockerfile belongs with the backend Docker build configuration.

For the FlavorForge project, verify the actual repository structure before running commands.

The important distinction is:

```text
backend source code
```

versus:

```text
Docker build configuration
```

The Dockerfile defines how the backend source becomes a Docker image.

---

# 4. Backend Dockerfile

The backend Dockerfile used by FlavorForge is based on a Node.js Alpine image.

The Dockerfile should be treated as the source of truth for the actual implementation.

A representative structure is:

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

EXPOSE 3000

CMD ["node", "src/index.js"]
```

> **Important:** Before recreating the project, verify the exact `CMD` and source entry-point filename from the existing `backend/package.json` and backend source. Do not change the entry point based only on this example if the repository uses a different one.

---

# 5. Understand `FROM`

The first Dockerfile instruction is:

```dockerfile
FROM node:22-alpine
```

This specifies the base image.

It provides:

```text
Node.js
+
Linux Alpine environment
```

The backend therefore does not require Node.js to be installed separately inside the container.

Docker provides the required runtime through the base image.

The relationship is:

```text
node:22-alpine
       |
       v
Node.js Runtime
       |
       v
FlavorForge Backend
```

---

# 6. Why Node.js 22?

The FlavorForge application uses Node.js 22.x in its container build.

The Dockerfile therefore uses:

```text
node:22-alpine
```

This keeps the backend runtime aligned with the project's Node.js requirement.

The `22` identifies the Node.js major version.

The `alpine` suffix identifies the Alpine Linux based image variant.

---

# 7. Understand `WORKDIR`

The Dockerfile defines:

```dockerfile
WORKDIR /app
```

This establishes:

```text
/app
```

as the working directory inside the container.

After this instruction, subsequent commands operate relative to:

```text
/app
```

For example:

```dockerfile
COPY package*.json ./
```

means:

```text
Copy package files
        |
        v
/app/
```

---

# 8. Copy Package Files First

The Dockerfile copies the Node.js package files:

```dockerfile
COPY package*.json ./
```

This typically includes:

```text
package.json
package-lock.json
```

The reason for copying these files separately is Docker layer caching.

The dependency installation layer can remain cached when application source files change but the dependency files do not.

Conceptually:

```text
package.json
package-lock.json
       |
       v
npm ci
       |
       v
Dependencies
```

Then the application source is copied.

---

# 9. Install Backend Dependencies

The Dockerfile uses:

```dockerfile
RUN npm ci --omit=dev
```

`npm ci` installs dependencies based on the lock file.

This is intended for reproducible installation.

The:

```text
--omit=dev
```

option excludes development dependencies from the production container.

The resulting container therefore contains the dependencies required to run the backend rather than the complete development dependency set.

---

# 10. Why `npm ci`?

There is an important difference between:

```bash
npm install
```

and:

```bash
npm ci
```

For a container build, `npm ci` is useful because it installs from the lock file.

The expected relationship is:

```text
package.json
      +
package-lock.json
      |
      v
    npm ci
      |
      v
Consistent dependency installation
```

This helps make container builds more predictable.

---

# 11. Copy Backend Source

After installing dependencies:

```dockerfile
COPY . .
```

copies the backend application into the image.

The build context is copied into:

```text
/app
```

The resulting image contains the backend application and its installed dependencies.

Conceptually:

```text
backend/
├── package.json
├── package-lock.json
├── src/
└── tests/
       |
       | Docker build
       v
/app/
├── package.json
├── package-lock.json
├── node_modules/
└── src/
```

The exact resulting files depend on the project's `.dockerignore` and build context.

---

# 12. `.dockerignore`

A Docker build should avoid unnecessarily copying files into the image.

For example, the backend should generally not copy an existing local:

```text
node_modules/
```

directory into the image.

The project can use a `.dockerignore` file to control what enters the Docker build context.

Typical exclusions can include:

```text
node_modules
npm-debug.log
.git
.gitignore
.env
.env.*
coverage
```

> **Important:** The exact `.dockerignore` contents should be taken from the actual FlavorForge repository. Do not add exclusions that are not present in the implementation and then describe them as historical project configuration.

---

# 13. Expose Backend Port

The Dockerfile contains:

```dockerfile
EXPOSE 3000
```

This documents that the backend application listens on:

```text
3000
```

The backend API therefore follows:

```text
Container
   |
   | TCP 3000
   v
Express API
```

`EXPOSE` does not by itself publish the port to the host.

Port publishing is configured when the container is run.

For example:

```bash
docker run -p 3000:3000 ...
```

means:

```text
Host port 3000
        |
        v
Container port 3000
```

---

# 14. Start the Backend

The Dockerfile defines the command used to start the backend container.

For example:

```dockerfile
CMD ["node", "src/index.js"]
```

The exact command must match the actual backend entry point.

Another common project configuration is:

```dockerfile
CMD ["npm", "start"]
```

If the FlavorForge backend uses an npm start script, the Dockerfile should use the command actually defined by the project.

Verify it with:

```bash
cat backend/package.json
```

Look for:

```json
"scripts": {
  "start": "..."
}
```

The Dockerfile and `package.json` must agree on how the application starts.

---

# 15. Backend Runtime Flow

After the image is built, the runtime flow becomes:

```text
Docker Container
      |
      v
Node.js 22
      |
      v
FlavorForge Backend
      |
      v
Express
      |
      v
Port 3000
      |
      v
API
```

---

# 16. Build the Backend Image

Move to the appropriate Docker build context.

For example, if the Dockerfile is inside the backend directory:

```bash
cd ~/flavorforge-azure-devsecops-capstone/backend
```

Verify:

```bash
pwd
```

Then:

```bash
ls
```

Confirm that the expected backend files are present.

Build the image using the project's actual image naming convention.

For example:

```bash
docker build -t flavorforge-backend:latest .
```

The important pieces are:

```text
docker build
        |
        v
-t flavorforge-backend:latest
        |
        v
.
```

where:

```text
.
```

represents the current Docker build context.

---

# 17. Understand the Docker Build

When Docker executes:

```bash
docker build -t flavorforge-backend:latest .
```

the process is approximately:

```text
Backend Directory
       |
       v
Dockerfile
       |
       v
FROM node:22-alpine
       |
       v
WORKDIR /app
       |
       v
COPY package*.json
       |
       v
npm ci --omit=dev
       |
       v
COPY backend source
       |
       v
EXPOSE 3000
       |
       v
CMD
       |
       v
flavorforge-backend:latest
```

---

# 18. Verify the Image

After the build completes:

```bash
docker images
```

Look for:

```text
flavorforge-backend
```

You may see:

```text
REPOSITORY           TAG       IMAGE ID       CREATED        SIZE
flavorforge-backend  latest    <image-id>     <time>         <size>
```

The exact image ID, creation time and size will vary.

---

# 19. Inspect the Image

You can inspect the image:

```bash
docker inspect flavorforge-backend:latest
```

This returns detailed metadata.

You can also check the image history:

```bash
docker history flavorforge-backend:latest
```

This helps demonstrate the Docker image layers created during the build.

---

# 20. Verify the Image Uses Node.js 22

Run:

```bash
docker run --rm flavorforge-backend:latest node --version
```

Expected major version:

```text
v22.x.x
```

The exact patch version depends on the base image available when the image was built.

This verifies the Node.js runtime inside the container.

---

# 21. Run the Backend Container

To test the container locally:

```bash
docker run --name flavorforge-backend -p 3000:3000 flavorforge-backend:latest
```

The mapping is:

```text
Host
3000
 |
 | Docker port mapping
 v
Container
3000
 |
 v
Express Backend
```

---

# 22. Verify the Running Container

Open another terminal and run:

```bash
docker ps
```

You should see the backend container.

For example:

```text
CONTAINER ID
IMAGE
COMMAND
STATUS
PORTS
NAMES
```

The container should show a port mapping similar to:

```text
0.0.0.0:3000->3000/tcp
```

---

# 23. Check Backend Logs

Run:

```bash
docker logs flavorforge-backend
```

The output should show the backend startup information defined by the application.

If the container exits immediately, inspect the logs:

```bash
docker logs flavorforge-backend
```

This is usually the first place to look for startup errors.

---

# 24. Verify the Health Endpoint

FlavorForge provides a backend health endpoint:

```text
/api/health
```

With the container running locally on port 3000, test it with:

```bash
curl http://localhost:3000/api/health
```

The endpoint should return the backend health response.

The exact JSON fields depend on the current application implementation.

---

# 25. Stop the Backend Container

When testing is complete:

```bash
docker stop flavorforge-backend
```

Then remove it:

```bash
docker rm flavorforge-backend
```

Verify:

```bash
docker ps
```

The stopped backend container should no longer appear in the running-container list.

---

# 26. Important Difference: Image vs Container

This distinction is important during interviews.

### Docker Image

An image is the packaged application template.

Example:

```text
flavorforge-backend:latest
```

### Docker Container

A container is a running instance created from an image.

Example:

```text
flavorforge-backend
```

Relationship:

```text
Dockerfile
    |
    v
Docker Image
    |
    v
Docker Container
```

---

# 27. Backend Dockerization Flow

The complete process is:

```text
Backend Source Code
       |
       v
package.json
package-lock.json
       |
       v
Backend Dockerfile
       |
       v
docker build
       |
       v
flavorforge-backend image
       |
       v
docker run
       |
       v
Backend Container
       |
       v
Express API :3000
```

---

# 28. How This Fits Into FlavorForge

The backend Docker image is not the final deployment artifact.

The next stages are:

```text
Backend Docker Image
        |
        v
Azure Container Registry
        |
        v
AKS
        |
        v
Kubernetes Deployment
        |
        v
Backend Service
```

Azure Container Registry will eventually store the backend image.

Kubernetes will pull that image and create backend pods.

---

# 29. Why Build the Backend Separately?

FlavorForge has separate frontend and backend applications.

Therefore, they are containerized independently:

```text
Frontend
   |
   v
Frontend Docker Image
```

and:

```text
Backend
   |
   v
Backend Docker Image
```

This allows the frontend and backend to be:

* built independently
* versioned independently
* deployed independently
* scaled independently

---

# 30. Important Security Rule

Do not bake secrets into the Docker image.

Do not put values such as:

```text
passwords
API keys
Azure credentials
PATs
database credentials
private keys
```

inside the Dockerfile.

Do not use:

```dockerfile
ENV PASSWORD=...
```

for real credentials.

Runtime configuration and secrets should be supplied through appropriate configuration/secret mechanisms.

This becomes particularly important later when the application is deployed to Kubernetes.

---

# 31. Troubleshooting

## Problem: `docker: command not found`

Docker is not available in the current environment.

Return to:

```text
04-docker/01-docker-setup.md
```

and verify the Docker installation/setup.

---

## Problem: `npm ci` fails

Check:

```bash
cat package.json
```

and:

```bash
ls package-lock.json
```

The dependency installation requires a valid lock file for `npm ci`.

Also inspect the Docker build output for the exact npm error.

---

## Problem: Container exits immediately

Check:

```bash
docker ps -a
```

Then:

```bash
docker logs flavorforge-backend
```

Common causes include:

* incorrect application start command
* missing dependency
* application startup error
* incorrect entry point

---

## Problem: Port 3000 is already in use

You may see an error indicating that port 3000 is already allocated.

Check:

```bash
docker ps
```

and:

```bash
ss -ltnp | grep 3000
```

You can stop the process/container using that port or use a different host port.

For example:

```bash
docker run --name flavorforge-backend -p 3001:3000 flavorforge-backend:latest
```

Then:

```text
http://localhost:3001
        |
        v
Container :3000
```

---

## Problem: `/api/health` does not respond

First check:

```bash
docker ps
```

Then:

```bash
docker logs flavorforge-backend
```

Then verify that the application is listening on:

```text
3000
```

Also confirm the endpoint path matches the actual backend implementation:

```text
/api/health
```

---

# 32. Verification Checklist

Before continuing to the next Docker step, confirm:

* [ ] Backend source exists.
* [ ] Backend `package.json` exists.
* [ ] Backend lock file exists.
* [ ] Backend Dockerfile exists.
* [ ] Dockerfile uses the intended Node.js runtime.
* [ ] Dependencies install successfully.
* [ ] Backend source is copied into the image.
* [ ] Container port is `3000`.
* [ ] Backend image builds successfully.
* [ ] Backend image appears in `docker images`.
* [ ] Node.js version inside the image is correct.
* [ ] Backend container starts.
* [ ] Backend logs show successful startup.
* [ ] `/api/health` responds successfully.
* [ ] No credentials are baked into the image.

---

# 33. Reviewer Explanation

### "How did you containerize the backend?"

> "I created a Docker image for the Node.js and Express backend. The Dockerfile uses a Node.js 22 Alpine base image, sets `/app` as the working directory, installs the dependencies using the package lock file, copies the backend source, exposes port 3000 and starts the backend application."

### "Why did you use `npm ci`?"

> "`npm ci` installs dependencies from the lock file and is appropriate for reproducible dependency installation during container builds."

### "Why use Alpine?"

> "The Node.js Alpine image provides a lightweight Linux-based runtime for the container, reducing the base image footprint compared with a larger general-purpose image."

### "What is the difference between the image and container?"

> "The image is the packaged backend artifact. A container is a running instance created from that image."

### "How did you verify the backend image?"

> "I checked the image with `docker images`, verified the Node.js version inside the image, started a container, checked the container logs and tested the `/api/health` endpoint."

### "What port does the backend use?"

> "The FlavorForge backend listens on port 3000. Docker exposes port 3000, and the container can be mapped to a host port for local testing."

---

# 34. Build Journey Position

The Docker section currently follows this sequence:

```text
04-docker/
│
├── 01-docker-setup.md
│
├── 02-frontend-dockerfile.md
│
├── 03-backend-dockerfile.md    ← CURRENT
│
├── 04-build-images.md
│
├── 05-run-containers.md
│
└── 06-docker-verification.md
```

The next document is:

```text
docs/BUILD-JOURNEY/04-docker/04-build-images.md
```

That document should bring the frontend and backend Dockerfiles together and document the actual image build/tag process.
