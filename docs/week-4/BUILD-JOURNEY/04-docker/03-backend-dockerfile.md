# 03 — Backend Dockerfile

## 1. What We Wanted

We wanted to containerize the FlavorForge Node.js + Express backend.

The backend Dockerfile is located at:

```text
backend/Dockerfile
```

The Dockerfile would define how the backend application is packaged into a Docker image.

---

## 2. Check the Backend Directory

From the FlavorForge repository root, we checked the backend directory.

### Command

```bash
ls -la backend
```

### What Happened

The backend directory contained the backend application files, including the Dockerfile and Node.js package files.

### Verify

```bash
ls -l backend/Dockerfile
```

### Result

The backend Dockerfile was present at:

```text
backend/Dockerfile
```

### Evidence

![Backend Directory](/screenshots/backend/01-backend-folder-structure.png)

---

## 3. Check the Backend Dockerfile

We checked the actual Dockerfile used by the FlavorForge backend.

### Command

```bash
cat backend/Dockerfile
```

### What Happened

The terminal displayed the Dockerfile used to build the backend image.

### Result

The Dockerfile was present and ready for the backend image build.

### Evidence

The Dockerfile contents can be captured from the terminal output of:

```bash
cat backend/Dockerfile
```

---

## 4. Verify the Backend Package Configuration

We checked the backend package configuration to confirm the Node.js application and its start configuration.

### Command

```bash
cat backend/package.json
```

### What Happened

The backend `package.json` showed the project's Node.js dependencies and scripts.

### Verify

The package configuration was checked against the Dockerfile so that the Docker image would use the application's actual runtime configuration.

### Result

The backend package configuration was present and matched the FlavorForge backend implementation.

---

## 5. Verify the Backend Source

We checked the backend source structure.

### Command

```bash
ls -R backend/src
```

### What Happened

The backend source contained the FlavorForge API implementation, including:

```text
controllers/
routes/
services/
config/
```

and the application/server files.

### Result

The backend source required by the Docker image was present.

---

## 6. Verify the Backend Dockerfile

The Dockerfile was then checked directly.

### Command

```bash
cat backend/Dockerfile
```

### Verify

We verified the actual instructions in the Dockerfile rather than recreating a generic Dockerfile.

The Dockerfile remained the source of truth for:

```text
Base image
Working directory
Dependency installation
Application files
Port
Startup command
```

### Result

The FlavorForge backend Dockerfile was verified and ready for the Docker image build.

---

## 7. Backend Dockerfile Flow

The actual Dockerfile defines the backend container build.

The resulting flow is:

```text
FlavorForge Backend
        |
        ↓
backend/Dockerfile
        |
        ↓
Docker build
        |
        ↓
Backend Docker Image
        |
        ↓
Backend Container
        |
        ↓
Node.js + Express API
```

---

## 8. Verify the Backend Health Endpoint

The backend provides the health endpoint:

```text
/api/health
```

The endpoint was already verified during backend application development.

### Command

```bash
curl http://localhost:3000/api/health
```

### What Happened

The backend returned its health response.

### Result

The backend application was responding successfully on port `3000`.

### Evidence

![Backend Health Endpoint](/screenshots/backend/02-backend-health-endpoint.png)

---

## 9. Dockerfile Ready for Image Build

At this point we had verified:

```text
backend/
├── Dockerfile
├── package.json
├── package-lock.json
├── src/
└── tests/
```

The backend Dockerfile was ready to be used for the image-build step.

---

## 10. Evidence

### Backend Directory

![Backend Directory](/screenshots/backend/01-backend-folder-structure.png)

### Backend Health Endpoint

![Backend Health Endpoint](/screenshots/backend/02-backend-health-endpoint.png)

### Backend Dockerfile

For the Dockerfile itself, capture the terminal output from:

```bash
cat backend/Dockerfile
```

Save the screenshot under:

```text
screenshots/docker/
```

using the next available Docker screenshot number rather than inventing a filename.

---

## 11. Result

The FlavorForge backend Dockerfile was located and verified.

The backend was ready for the next Docker step:

```text
04-build-images.md
```

The next step documents the **actual frontend and backend Docker image build and tagging process**.
