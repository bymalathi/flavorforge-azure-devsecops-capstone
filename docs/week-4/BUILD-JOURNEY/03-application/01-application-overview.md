# Application — Complete Build Journey

## Objective

This document records how the FlavorForge application was created and verified before containerization.

The application was built as two separate components:

```text
Frontend
   +
Backend
   +
API
   +
Tests
```

The resulting application was then used as the input for the Docker stage:

```text
Application
     ↓
Docker
     ↓
Azure Container Registry
     ↓
Kubernetes / AKS
     ↓
Azure DevOps CI/CD
```

---

# 1. Application Structure

## What we wanted

We wanted to keep the frontend and backend as separate application components so that they could later be packaged and deployed independently.

The FlavorForge repository was structured as:

```text
flavorforge-azure-devsecops-capstone/
│
├── frontend/
│
├── backend/
│
├── docker/
├── kubernetes/
├── argocd/
├── docs/
├── scripts/
└── .github/
```

The application code was primarily contained in:

```text
frontend/
backend/
```

### Verify

```bash
cd ~/flavorforge-azure-devsecops-capstone
ls
```

### Result

The repository contained separate `frontend` and `backend` application directories.

---

# 2. Frontend Application

## What we wanted

We needed a web interface for FlavorForge.

The frontend was implemented using:

```text
React
+
Vite
```

The frontend source code was maintained under:

```text
frontend/
```

## 2.1 Verify the Frontend Project

### Actual command

```bash
cd ~/flavorforge-azure-devsecops-capstone
ls frontend
```

### What happened

The command displayed the frontend project files.

The frontend contained the React application source, configuration, public assets, and package files.

### Verify

The frontend project included files such as:

```text
Dockerfile
package.json
package-lock.json
vite.config.js
index.html
src/
public/
```

### Evidence

![](/screenshots/frontend/04-frontend-enterprise-structure.png)

### Result

The FlavorForge React/Vite frontend was present and ready for development and later containerization.

---

# 3. Frontend Application Development

## What we wanted

We wanted the frontend to have a structured application rather than a single-page prototype.

The application was organized into reusable components, pages, layouts, services, API utilities, and styles.

The frontend source structure became:

```text
frontend/src/
│
├── api/
├── assets/
├── components/
├── config/
├── hooks/
├── layouts/
├── pages/
├── services/
├── styles/
├── test/
├── utils/
├── App.jsx
└── main.jsx
```

### Verify

```bash
ls frontend/src
```

### Result

The frontend application had a structured React codebase ready for the remaining application work.

---

# 4. Frontend Application Running

## What we wanted

Before moving to Docker, we needed to verify that the frontend could run successfully.

### Actual command

From the frontend directory:

```bash
cd ~/flavorforge-azure-devsecops-capstone/frontend
npm install
```

The frontend development server was then started using the project's configured npm script.

### What happened

The React/Vite application started successfully and was accessible through the local development URL.

### Verify

The application was opened at:

```text
http://localhost:5173
```

### Evidence

![](/screenshots/frontend/03-react-application-running.png)

### Result

The FlavorForge frontend was running successfully in the local development environment.

---

# 5. Frontend Routing and Pages

## What we wanted

The application needed multiple pages and navigation rather than a single screen.

The frontend used:

```text
react-router-dom
```

The application included pages such as:

```text
Home
Recipes
About
Contact
404 / Not Found
```

### What happened

React Router was used to provide navigation between the application pages.

A shared layout was also introduced for common application elements.

### Verify

The frontend source contained:

```text
frontend/src/pages/
frontend/src/layouts/
```

and the application included routing configuration.

### Evidence

![](/screenshots/frontend/13-react-router-basic-routing.png)

![](/screenshots/frontend/14-shared-layout-with-outlet.png)

### Result

The frontend had reusable navigation and page routing.

---

# 6. Reusable Frontend Components

## What we wanted

We wanted the frontend to use reusable components instead of duplicating UI code.

The component structure included areas such as:

```text
components/
├── BackendStatus/
├── CategoryFilter/
├── EmptyState/
├── ErrorBoundary/
├── FeatureCard/
├── Features/
├── Header/
├── Hero/
├── NotFound/
├── RecipeCard/
├── RecipeList/
├── SearchBar/
└── ui/
```

### What happened

Reusable UI components were created and used throughout the application.

### Verify

```bash
ls frontend/src/components
```

### Evidence

![](/screenshots/frontend/07-first-reusable-component.png)

![](/screenshots/frontend/16-reusable-button-component.png)

![](/screenshots/frontend/19-reusable-loading-component.png)

### Result

The frontend was organized into reusable components that could be maintained independently.

---

# 7. Backend Application

## What we wanted

The frontend needed a backend service to provide application APIs.

The backend was implemented using:

```text
Node.js
+
Express
```

The backend source was maintained under:

```text
backend/
```

## 7.1 Verify the Backend Project

### Actual command

```bash
cd ~/flavorforge-azure-devsecops-capstone
ls backend
```

### What happened

The command confirmed the separate backend application and its project files.

The backend contained:

```text
Dockerfile
package.json
package-lock.json
jest.config.js
src/
tests/
```

### Verify

```bash
ls backend/src
```

The backend source contained application areas including:

```text
config/
controllers/
database/
middleware/
models/
routes/
services/
utils/
```

### Evidence

![](/screenshots/backend/01-backend-folder-structure.png)

### Result

The Node.js/Express backend was established separately from the frontend.

---

# 8. Backend Application Structure

## What we wanted

We wanted the backend to follow a structured API application design.

The backend source was organized into:

```text
backend/src/
│
├── config/
├── controllers/
├── database/
├── middleware/
├── models/
├── routes/
├── services/
└── utils/
```

The health and recipe functionality was separated into appropriate routes, controllers, and services.

### Verify

```bash
ls backend/src/controllers
ls backend/src/routes
ls backend/src/services
```

### Result

The backend was organized into separate application layers instead of placing all API logic in a single file.

---

# 9. Backend Health API

## What we wanted

We needed a simple API endpoint that could confirm that the backend was running.

FlavorForge provided:

```text
GET /api/health
```

### What happened

The backend health route was implemented and connected to the application.

The route was defined under:

```text
backend/src/routes/health.routes.js
```

and the health functionality was implemented through the corresponding controller/service structure.

### Verify

The health endpoint was tested while the backend was running.

```text
/api/health
```

### Evidence

![](/screenshots/backend/02-backend-health-endpoint.png)

![](/screenshots/backend/04-health-endpoint-browser.png)

### Result

The backend health API was responding successfully.

---

# 10. Backend Running

## What we wanted

Before containerization, we needed to verify that the backend could start independently.

### What happened

The Node.js backend was started in the local development environment.

### Verify

The backend process was checked and the health endpoint was accessed.

### Evidence

![](/screenshots/backend/03-backend-server-running.png)

### Result

The backend was running successfully and ready to communicate with the frontend.

---

# 11. Frontend–Backend Integration

## What we wanted

The frontend needed to communicate with the backend through API calls.

The application therefore separated:

```text
Frontend UI
     ↓
API service layer
     ↓
Backend API
```

The frontend contained API/service code under:

```text
frontend/src/api/
frontend/src/services/
```

### What happened

The frontend was connected to the backend API.

### Verify

The application was tested with the backend running.

### Evidence

![](/screenshots/backend/10-cors-enabled-frontend-backend-connected.png)

![](/screenshots/frontend/21-frontend-recipes-integrated.png)

### Result

The frontend and backend were successfully integrated.

---

# 12. Recipe API

## What we wanted

In addition to the health endpoint, the backend needed to provide recipe-related functionality for the frontend.

The backend contained:

```text
recipe.controller.js
recipe.routes.js
recipe.service.js
```

### Verify

```bash
ls backend/src/controllers
ls backend/src/routes
ls backend/src/services
```

### What happened

The recipe API was implemented and connected to the frontend.

### Evidence

![](/screenshots/backend/11-recipes-api-structure.png)

![](/screenshots/backend/12-recipes-api-working.png)

### Result

The frontend could retrieve and display recipe information through the backend API.

---

# 13. Frontend API Service Layer

## What we wanted

We wanted API communication to remain separate from the React UI components.

The frontend therefore contained:

```text
frontend/src/api/
frontend/src/services/
```

including:

```text
apiClient.js
healthService.js
recipeService.js
```

### Verify

```bash
ls frontend/src/api
ls frontend/src/services
```

### Result

API communication was separated from the UI components, making the frontend easier to maintain.

---

# 14. Frontend and Backend Configuration

## What we wanted

The frontend needed a configurable API base URL so that the application could later work in different environments.

The Docker-specific frontend configuration used:

```text
VITE_API_BASE_URL=http://backend:3000
```

### What happened

The frontend was configured to communicate with the backend using the backend service/container name when running through Docker networking.

The resulting container communication model was:

```text
Frontend
    |
    | backend:3000
    ↓
Backend
```

The Kubernetes deployment later provided the environment-specific configuration through Kubernetes configuration.

### Result

The application was prepared for containerized frontend/backend communication.

---

# 15. Frontend Tests

## What we wanted

The frontend needed automated tests for important application behavior.

The frontend test files included:

```text
apiClient.test.js
ErrorBoundary.test.jsx
HomePage.test.jsx
```

### Verify

```bash
find frontend/src -name "*.test.*"
```

### Result

Frontend test coverage was included as part of the application codebase.

---

# 16. Backend Tests

## What we wanted

The backend needed automated tests before being included in the CI/CD pipeline.

FlavorForge used:

```text
Jest
```

The backend tests were located under:

```text
backend/tests/
```

including:

```text
app.test.js
controllers.test.js
services.test.js
```

### Verify

```bash
ls backend/tests
```

### Result

The backend test suite was present and ready to be executed.

---

# 17. Application Build Verification

## What we wanted

Before moving to Docker, we needed to confirm that the application could be built successfully.

The frontend build was verified using the project's npm build command.

### What happened

The frontend build generated the production output under:

```text
frontend/dist/
```

### Evidence

![](/screenshots/frontend/31-dist-folder.png)

![](/screenshots/frontend/32-build-success.png)

### Result

The frontend production build completed successfully.

---

# 18. Final Application Verification

At the end of the application stage, the FlavorForge application consisted of:

```text
FlavorForge
│
├── Frontend
│   └── React + Vite
│
├── Backend
│   └── Node.js + Express
│
├── API
│   ├── /api/health
│   └── Recipe API
│
└── Tests
    ├── Frontend tests
    └── Backend Jest tests
```

The frontend and backend were verified independently and then tested together.

---

# 19. Application Stage Result

The application stage established the working application that would be packaged in the next phase.

The final flow was:

```text
React + Vite Frontend
          |
          | API requests
          ↓
Node.js + Express Backend
          |
          ├── /api/health
          └── Recipe API
```

The application was now ready for containerization.

---

# 20. Evidence Summary

The application stage produced the following evidence:

```text
Frontend
    ↓
03-react-application-running.png

Frontend structure
    ↓
04-frontend-enterprise-structure.png

React routing
    ↓
13-react-router-basic-routing.png

Shared layout
    ↓
14-shared-layout-with-outlet.png

Reusable components
    ↓
07-first-reusable-component.png
16-reusable-button-component.png
19-reusable-loading-component.png

Backend structure
    ↓
01-backend-folder-structure.png

Backend health endpoint
    ↓
02-backend-health-endpoint.png
04-health-endpoint-browser.png

Backend running
    ↓
03-backend-server-running.png

Frontend/backend integration
    ↓
10-cors-enabled-frontend-backend-connected.png

Recipe API
    ↓
11-recipes-api-structure.png
12-recipes-api-working.png

Frontend build
    ↓
31-dist-folder.png
32-build-success.png
```

---

# 21. Reviewer Explanation

### "How did you structure the application?"

> "I separated FlavorForge into a React/Vite frontend and a Node.js/Express backend. The frontend contains the UI, pages, reusable components and API service layer, while the backend contains the API routes, controllers and services."

### "How did you verify that the backend was working?"

> "I started the backend locally and verified the `/api/health` endpoint. I also tested the recipe API and verified that the frontend could communicate with the backend."

### "Why did you separate frontend and backend?"

> "The separation allowed me to build, test, containerize and deploy the frontend and backend independently."

### "What was verified before Docker?"

> "I verified the frontend, backend, API endpoints, frontend-backend integration, automated tests and the frontend production build before moving to containerization."

---

# 22. Next Step

The application stage is complete.

The next stage is:

```text
04-docker/
```

The application will now be packaged into Docker containers.

The Docker Build Journey begins with:

```text
04-docker/01-docker-setup.md
```
