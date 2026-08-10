# 02 — Frontend Dockerfile

## 1. What We Wanted

We wanted to containerize the FlavorForge React/Vite frontend.

The frontend Dockerfile was created at:

```text
frontend/Dockerfile
```

The implementation uses a multi-stage Docker build:

```text
Node.js 22
    ↓
npm ci
    ↓
npm run build
    ↓
dist/
    ↓
Nginx
```

---

## 2. Check the Frontend Directory

From the FlavorForge repository root, we checked the project structure.

### Command

```bash
ls
```

### Result

The repository contained the frontend directory:

```text
frontend/
backend/
docker/
kubernetes/
...
```

We then checked the frontend directory:

### Command

```bash
ls -la frontend
```

### Result

The frontend directory contained the application files, including:

```text
Dockerfile
package.json
package-lock.json
nginx.conf.template
src/
public/
...
```

### Evidence

![Frontend Directory](/screenshots/frontend/04-frontend-enterprise-structure.png)

---

## 3. Check the Frontend Dockerfile

We verified that the frontend Dockerfile existed.

### Command

```bash
ls -l frontend/Dockerfile
```

### Result

The Dockerfile was present at:

```text
frontend/Dockerfile
```

We then inspected the Dockerfile.

### Command

```bash
cat frontend/Dockerfile
```

### Result

The Dockerfile used a multi-stage build with:

```text
node:22-alpine
```

for the build stage and:

```text
nginx:1.29-alpine
```

for the final runtime stage.

---

## 4. Frontend Dockerfile Build Stage

The build stage uses:

```dockerfile
FROM node:22-alpine AS builder
```

The working directory is:

```dockerfile
WORKDIR /app
```

The package files are copied:

```dockerfile
COPY package*.json ./
```

Dependencies are installed:

```dockerfile
RUN npm ci
```

The frontend source is copied:

```dockerfile
COPY . .
```

The production frontend is built:

```dockerfile
RUN npm run build
```

The resulting production files are generated under:

```text
/app/dist
```

---

## 5. Frontend Dockerfile Runtime Stage

After the frontend build completes, the Dockerfile starts a second stage:

```dockerfile
FROM nginx:1.29-alpine
```

The generated frontend files are copied from the build stage:

```dockerfile
COPY --from=builder /app/dist /usr/share/nginx/html
```

This gives the final image the following flow:

```text
node:22-alpine
      ↓
npm ci
      ↓
npm run build
      ↓
/app/dist
      ↓
nginx:1.29-alpine
      ↓
/usr/share/nginx/html
```

---

## 6. Verify the Frontend Build Configuration

We checked the frontend package configuration.

### Command

```bash
cat frontend/package.json
```

### Result

The frontend package configuration contained the build command used by the Dockerfile:

```text
npm run build
```

The application is a React/Vite frontend.

---

## 7. Frontend Docker Configuration

The frontend also contains Docker-specific configuration.

The Docker environment configuration was:

```text
frontend/.env.docker
```

The Docker API configuration used:

```text
VITE_API_BASE_URL=http://backend:3000
```

This allows the containerized frontend to communicate with the backend using the Docker service name:

```text
backend
```

and port:

```text
3000
```

---

## 8. Verify the Docker Configuration

We checked the Docker-specific frontend configuration.

### Command

```bash
cat frontend/.env.docker
```

### Result

The frontend Docker configuration pointed to:

```text
http://backend:3000
```

This configuration is used for the containerized frontend/backend setup.

---

## 9. Verify the Complete Frontend Dockerfile

We performed a final check of the Dockerfile.

### Command

```bash
cat frontend/Dockerfile
```

### Result

The Dockerfile contains the actual FlavorForge multi-stage implementation:

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

---

## 10. Result

The FlavorForge frontend Dockerfile was created and verified.

The implementation uses:

```text
React/Vite
    ↓
Node.js 22 Alpine
    ↓
npm ci
    ↓
npm run build
    ↓
dist/
    ↓
Nginx 1.29 Alpine
```

The frontend Dockerfile was ready for the next step: building the Docker image.

---

## 11. Evidence

### Frontend Directory

![Frontend Directory](/screenshots/frontend/04-frontend-enterprise-structure.png)

### Frontend Dockerfile

No dedicated screenshot of `frontend/Dockerfile` is currently present in the screenshot inventory, so no screenshot is added here.

### Frontend Docker Configuration

No dedicated screenshot of `frontend/.env.docker` is currently present in the screenshot inventory, so no screenshot is added here.

We do **not** use an unrelated screenshot as evidence just to fill this section.

---

## 12. Next Step

Continue with:

```text
docs/BUILD-JOURNEY/04-docker/03-backend-dockerfile.md
```

The next step documents the actual FlavorForge backend Dockerfile.
