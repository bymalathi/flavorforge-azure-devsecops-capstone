# Frontend Dockerfile — Complete Beginner Build Guide

## Objective

This document explains how the FlavorForge React/Vite frontend was containerized using Docker.

A person following this guide should be able to understand:

1. Why the frontend needs a Dockerfile.
2. Where the frontend Dockerfile is located.
3. Why a multi-stage Docker build is used.
4. Which Node.js image is used for building.
5. How the React/Vite application is built.
6. Why Nginx is used for the final runtime.
7. How the Docker image is structured.
8. How the Dockerfile can be verified before building the image.

The actual image build is covered separately in:

```text
03-backend-dockerfile.md
04-build-images.md
```

---

# 1. Frontend Application

FlavorForge uses a React frontend built with Vite.

The frontend source code is located under:

```text
frontend/
```

The frontend is responsible for the application's user interface.

Conceptually:

```text
User
 |
 v
React Frontend
 |
 v
Backend API
```

The frontend needs to be packaged into a container so that the same application artifact can later be used in different environments.

---

# 2. Why Create a Frontend Dockerfile?

A Dockerfile provides the instructions required to create the frontend Docker image.

The relationship is:

```text
React/Vite Source Code
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

Without the Dockerfile, Docker does not know how to package the frontend application.

---

# 3. Frontend Dockerfile Location

The frontend Dockerfile is located at:

```text
frontend/Dockerfile
```

The expected structure is:

```text
flavorforge-azure-devsecops-capstone/
│
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   ├── src/
│   └── ...
│
└── backend/
```

The exact contents of the frontend directory may evolve as the project changes.

---

# 4. Why a Multi-Stage Docker Build?

The FlavorForge frontend uses a **multi-stage Docker build**.

The basic idea is:

```text
Stage 1
Build the React application
        |
        v
Production build files
        |
        v
Stage 2
Serve the files with Nginx
```

This separates:

```text
Build Environment
```

from:

```text
Runtime Environment
```

The final image does not need the complete Node.js build environment.

---

# 5. Frontend Docker Build Architecture

The complete flow is:

```text
                 Frontend Source
                       |
                       v
              +----------------+
              | Build Stage    |
              | Node.js 22     |
              | Alpine         |
              +-------+--------+
                      |
                      | npm install
                      | npm run build
                      v
                dist/ files
                      |
                      v
              +----------------+
              | Runtime Stage  |
              | Nginx 1.29     |
              | Alpine         |
              +-------+--------+
                      |
                      v
              Frontend Container
```

The two stages have different purposes.

---

# 6. Stage 1 — Node.js Build Environment

The first stage uses:

```text
node:22-alpine
```

This provides Node.js and npm in a relatively small Alpine-based image.

The build stage is responsible for:

```text
Installing dependencies
        |
        v
Building the React application
        |
        v
Generating production files
```

---

# 7. Build Stage Dockerfile

The frontend Dockerfile follows this structure:

```dockerfile
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build
```

The exact repository Dockerfile should always be treated as the source of truth.

The commands above explain the actual build pattern used by the FlavorForge frontend.

---

# 8. `FROM node:22-alpine`

The first instruction is:

```dockerfile
FROM node:22-alpine AS builder
```

This specifies the base image.

It means:

```text
Node.js
+
Alpine Linux
```

The name:

```text
builder
```

gives this Docker build stage a name.

That name can later be referenced from another stage.

---

# 9. Why Node.js Is Needed

The React/Vite application requires Node.js tooling during the build.

Node.js provides the environment required to run commands such as:

```bash
npm ci
```

and:

```bash
npm run build
```

The Node.js environment is therefore required during the build stage.

It is not necessary to use Node.js as the final web server for the compiled frontend.

---

# 10. Why Alpine?

The image:

```text
node:22-alpine
```

uses Alpine Linux.

Alpine-based images are commonly used when a smaller container base is desirable.

For FlavorForge, the build stage uses the Alpine variant of Node.js.

The important point is that the build stage needs Node.js tooling, while the final stage only needs to serve the generated frontend files.

---

# 11. `WORKDIR /app`

The Dockerfile defines:

```dockerfile
WORKDIR /app
```

This establishes:

```text
/app
```

as the working directory inside the container.

The following commands therefore operate from:

```text
/app
```

Conceptually:

```text
Container
└── /app
    ├── package.json
    ├── package-lock.json
    ├── src/
    └── ...
```

---

# 12. Copy Package Files First

The Dockerfile uses:

```dockerfile
COPY package*.json ./
```

This copies the package definition files into the container.

Typically these include:

```text
package.json
package-lock.json
```

The dependency installation can then be performed before the rest of the application source is copied.

---

# 13. Install Dependencies

The build stage uses:

```dockerfile
RUN npm ci
```

`npm ci` installs the dependencies according to the lock file.

This is useful for reproducible builds because the dependency versions are taken from:

```text
package-lock.json
```

The basic flow is:

```text
package.json
       +
package-lock.json
       |
       v
npm ci
       |
       v
node_modules
```

---

# 14. Copy the Frontend Source

The Dockerfile then uses:

```dockerfile
COPY . .
```

This copies the frontend project into the Docker build environment.

At this point the container has:

```text
/app
├── package.json
├── package-lock.json
├── node_modules/
├── src/
├── public/        (if present)
└── other frontend files
```

The exact directory structure depends on the current project.

---

# 15. Build the React Application

The Dockerfile executes:

```dockerfile
RUN npm run build
```

This runs the build script defined in:

```text
frontend/package.json
```

For a Vite application, this generates the production frontend files.

The result is normally written to:

```text
dist/
```

Conceptually:

```text
React Source
     |
     | npm run build
     v
dist/
     |
     ├── index.html
     ├── assets/
     └── ...
```

---

# 16. Why the `dist` Directory Matters

The `dist` directory contains the production-ready frontend files generated by Vite.

These files no longer require the complete development environment to be served.

Instead, they can be served by a web server such as Nginx.

Therefore:

```text
Node.js Build Environment
        |
        | produces
        v
dist/
        |
        v
Nginx Runtime
```

---

# 17. Stage 2 — Nginx Runtime

The second stage uses:

```text
nginx:1.29-alpine
```

The purpose of this stage is to serve the static frontend files.

The architecture becomes:

```text
Build Stage
Node.js 22
     |
     | dist/
     v
Runtime Stage
Nginx 1.29
     |
     v
Browser
```

---

# 18. Runtime Dockerfile

The second stage follows this pattern:

```dockerfile
FROM nginx:1.29-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
```

The important part is:

```dockerfile
COPY --from=builder
```

This tells Docker to copy files from the earlier `builder` stage.

---

# 19. What Does `COPY --from=builder` Mean?

The Dockerfile has two stages:

```text
builder
```

and:

```text
nginx runtime
```

The command:

```dockerfile
COPY --from=builder /app/dist /usr/share/nginx/html
```

means:

```text
Take:

/app/dist

from:

builder stage

and copy it to:

/usr/share/nginx/html

inside the final Nginx image.
```

The final image therefore receives the compiled application instead of the complete source/build environment.

---

# 20. Why Nginx?

The React/Vite frontend becomes static files after the production build.

Nginx is well suited to serve those files.

The runtime architecture is:

```text
Browser
   |
   | HTTP
   v
Nginx
   |
   v
React static files
```

The Node.js build environment is no longer required to serve the already-built static files.

---

# 21. Complete Frontend Dockerfile

The FlavorForge frontend Dockerfile follows the multi-stage pattern:

```dockerfile
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:1.29-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
```

This is the core frontend containerization logic.

---

# 22. Understand the Complete Dockerfile Line by Line

```dockerfile
FROM node:22-alpine AS builder
```

Creates the Node.js build stage.

```dockerfile
WORKDIR /app
```

Sets the working directory.

```dockerfile
COPY package*.json ./
```

Copies dependency definition files.

```dockerfile
RUN npm ci
```

Installs dependencies.

```dockerfile
COPY . .
```

Copies the frontend source.

```dockerfile
RUN npm run build
```

Creates the production frontend build.

Then:

```dockerfile
FROM nginx:1.29-alpine
```

starts the lightweight runtime stage.

Finally:

```dockerfile
COPY --from=builder /app/dist /usr/share/nginx/html
```

copies the generated frontend files into the Nginx web directory.

---

# 23. Why Not Keep Node.js in the Final Image?

The final frontend only needs to serve static files.

It does not need:

```text
Source code
npm
package manager
Development dependencies
Node.js build tooling
```

after the build has completed.

Therefore:

```text
Build Image
Node.js + dependencies + source
```

is separated from:

```text
Runtime Image
Nginx + production files
```

This is one of the main advantages of the multi-stage build.

---

# 24. Multi-Stage Build Result

Conceptually:

```text
                Docker Build
                     |
          +----------+----------+
          |                     |
          v                     v
   Build Stage              Runtime Stage
   node:22-alpine           nginx:1.29-alpine
          |                     ^
          |                     |
          | npm run build       |
          |                     |
          +---- dist/ ----------+
                     |
                     v
              Final Image
```

Only the runtime stage becomes the final image.

---

# 25. Frontend Docker Environment Configuration

FlavorForge also contains Docker-specific frontend configuration:

```text
.env.docker
```

The Docker-specific API base URL is:

```text
VITE_API_BASE_URL=http://backend:3000
```

This configuration is important because the frontend needs to know the backend API location when running in the Docker environment.

The relationship is:

```text
Frontend
   |
   | http://backend:3000
   v
Backend
```

The exact way this configuration is supplied during the build/runtime process should be verified against the current frontend configuration and Docker build commands.

---

# 26. Important Vite Concept

Vite environment variables beginning with:

```text
VITE_
```

are available to the frontend application during the frontend build process.

Therefore:

```text
VITE_API_BASE_URL
```

is part of the frontend configuration used by the application.

This is different from a backend-only environment variable.

Do not place secrets in frontend `VITE_` variables.

Anything included in a browser-delivered frontend build can potentially be inspected by users.

---

# 27. Verify the Dockerfile Exists

From the project root:

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

Then:

```bash
ls -l frontend/Dockerfile
```

You should see the Dockerfile.

---

# 28. Inspect the Dockerfile

Run:

```bash
cat frontend/Dockerfile
```

Verify that the Dockerfile contains the expected multi-stage structure:

```text
node:22-alpine
       |
       v
builder
       |
       v
npm ci
       |
       v
npm run build
       |
       v
nginx:1.29-alpine
       |
       v
/app/dist → /usr/share/nginx/html
```

---

# 29. Verify the Frontend Build Configuration

Before building the Docker image, verify:

```bash
cd frontend
```

Then inspect:

```bash
cat package.json
```

Confirm that the project has a build script.

For example, the scripts section should contain a build command corresponding to the Vite application.

Then return to the project root:

```bash
cd ..
```

---

# 30. Verify `.env.docker`

From the frontend directory:

```bash
cat .env.docker
```

The Docker-specific configuration used by FlavorForge includes:

```text
VITE_API_BASE_URL=http://backend:3000
```

Do not expose credentials through this file.

The backend URL is configuration, not a secret.

---

# 31. Docker Build Context

The frontend Docker image is built using the frontend directory as the relevant application context.

Conceptually:

```text
frontend/
    |
    +── Dockerfile
    +── package.json
    +── package-lock.json
    +── src/
    +── .env.docker
    +── ...
```

Docker uses the supplied build context to access the files needed by the Dockerfile.

---

# 32. Why `.dockerignore` Matters

Before building the image, verify whether the frontend project contains:

```text
frontend/.dockerignore
```

If present, inspect it:

```bash
cat frontend/.dockerignore
```

The purpose is to avoid unnecessarily sending files such as:

```text
node_modules/
.git/
temporary files
```

into the Docker build context.

Use the repository's actual `.dockerignore` as the source of truth.

Do not blindly replace it with a generic file.

---

# 33. Do Not Build Yet

This document establishes and verifies the frontend Dockerfile.

The actual Docker image build is intentionally handled later.

The sequence is:

```text
01 Docker Setup
       |
       v
02 Frontend Dockerfile
       |
       v
03 Backend Dockerfile
       |
       v
04 Build Images
```

This keeps the Build Journey reproducible and easy to troubleshoot.

---

# 34. Common Problems

## Problem: `npm ci` fails

Check:

```text
package.json
package-lock.json
```

Make sure the lock file belongs to the current project version.

Do not randomly replace the lock file.

---

## Problem: `npm run build` fails

Run the frontend build directly first:

```bash
cd frontend
npm ci
npm run build
```

This helps determine whether the problem is with the application build itself or with Docker.

---

## Problem: `dist` is not created

If:

```bash
npm run build
```

does not successfully complete, the production build directory may not be generated.

Fix the application build problem before troubleshooting the Docker runtime stage.

---

## Problem: Nginx image cannot be pulled

The Docker engine needs network access to pull:

```text
nginx:1.29-alpine
```

Verify Docker connectivity and try again.

---

# 35. Reviewer Explanation

### "Why did you use a multi-stage Dockerfile?"

> "The first stage uses Node.js to install dependencies and build the React/Vite application. The second stage uses Nginx to serve the generated static files. This keeps the final runtime image separate from the build environment."

### "Why Node.js in the first stage?"

> "The React/Vite application requires Node.js and npm during the build."

### "Why Nginx in the second stage?"

> "After Vite generates the production static files, we only need a web server to serve them. Nginx provides that runtime."

### "What happens to the source code in the final image?"

> "The production build output from `dist` is copied into the Nginx image. The final runtime does not need the complete Node.js build environment."

### "What does `COPY --from=builder` do?"

> "It copies the generated files from the named build stage into the final Nginx stage."

### "Why not run `npm run dev` in the container?"

> "The Docker image is intended for the production-style frontend runtime. The application is built with Vite and the resulting static files are served by Nginx."

---

# 36. Verification Checklist

Before moving to the backend Dockerfile, confirm:

* [ ] `frontend/` exists.
* [ ] `frontend/Dockerfile` exists.
* [ ] Dockerfile uses a multi-stage build.
* [ ] Build stage uses `node:22-alpine`.
* [ ] Build stage is named `builder`.
* [ ] `WORKDIR` is `/app`.
* [ ] `package*.json` is copied before dependency installation.
* [ ] `npm ci` installs dependencies.
* [ ] Frontend source is copied.
* [ ] `npm run build` creates the production build.
* [ ] Runtime stage uses `nginx:1.29-alpine`.
* [ ] `dist` is copied from the builder stage.
* [ ] Frontend Docker configuration uses `VITE_API_BASE_URL=http://backend:3000`.
* [ ] No credentials are included in frontend configuration.
* [ ] The actual repository Dockerfile has been checked before building.

---

# 37. Expected Result

At the end of this step, the frontend has a reproducible Docker build definition:

```text
React + Vite
     |
     v
node:22-alpine
     |
     | npm ci
     | npm run build
     v
dist/
     |
     v
nginx:1.29-alpine
     |
     v
Frontend Docker Image
```

The image itself has **not** been built as part of this documentation step.

Image creation is covered in:

```text
docs/BUILD-JOURNEY/04-docker/04-build-images.md
```

---

# 38. Next Step

Continue with:

```text
docs/BUILD-JOURNEY/04-docker/03-backend-dockerfile.md
```

That document will explain how the FlavorForge Node.js + Express backend is containerized.
