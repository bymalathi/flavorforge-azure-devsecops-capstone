# Application Verification

## Objective

This is the **final verification of the FlavorForge application stage**.

The application has already been built and tested in the previous documents.

Now we perform one final verification before moving to Docker.

The verification flow is:

```text
Application
    ↓
Frontend verified
    ↓
Backend verified
    ↓
Health API verified
    ↓
Backend tests verified
    ↓
Frontend build verified
    ↓
Application ready
    ↓
Move to Docker
```

The goal is simple:

> Confirm that the application is ready to be containerized.

---

# 1. Go to the FlavorForge Project

Open WSL and move to the project:

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

Verify the location:

```bash
pwd
```

Expected location:

```text
/home/<your-username>/flavorforge-azure-devsecops-capstone
```

---

# 2. Verify the Application Directories

Run:

```bash
ls
```

Verify the application directories:

```bash
ls frontend
```

```bash
ls backend
```

The application structure is:

```text
flavorforge-azure-devsecops-capstone/
│
├── frontend/
│
└── backend/
```

### Result

Both application components are present.

---

# 3. Verify the Git Repository

From the project root, run:

```bash
git status
```

This confirms that the project is recognized as a Git repository and shows the current working-tree state.

We are not making changes here.

We are only verifying the repository before moving to Docker.

---

# 4. Verify the Current Branch

Run:

```bash
git branch --show-current
```

The project branch is:

```text
main
```

### Result

The current branch is verified.

---

# 5. Verify the GitHub Remote

Run:

```bash
git remote -v
```

Verify that the `origin` remote points to the FlavorForge GitHub repository.

The repository flow is:

```text
Local FlavorForge Project
        ↓
      origin
        ↓
GitHub Repository
```

### Result

The local repository is connected to GitHub.

---

# 6. Verify the Backend

Move to the backend:

```bash
cd ~/flavorforge-azure-devsecops-capstone/backend
```

Verify the location:

```bash
pwd
```

List the files:

```bash
ls
```

Verify the important backend areas:

```text
package.json
src/
tests/
```

### Result

The backend source and test structure are present.

---

# 7. Verify Backend Dependencies

Run:

```bash
npm install
```

This ensures that the dependencies defined by the backend project are installed.

### Result

Backend dependencies are installed and the backend is ready to run.

---

# 8. Verify the Backend Starts

Run:

```bash
npm start
```

The FlavorForge backend starts on port:

```text
3000
```

The backend should remain running while the health endpoint is checked.

![](/screenshots/backend/03-backend-server-running.png)

### Result

The Node.js/Express backend is running.

---

# 9. Verify the Backend Health Endpoint

Open another WSL terminal.

Run:

```bash
curl http://localhost:3000/api/health
```

This verifies the application health endpoint.

The request flow is:

```text
curl
  ↓
localhost:3000
  ↓
Express
  ↓
/api/health
  ↓
Response
```

### Result

The backend health endpoint responds successfully.

---

# 10. Verify the HTTP Response

Run:

```bash
curl -i http://localhost:3000/api/health
```

Verify that the response contains a successful HTTP status.

For example:

```text
HTTP/1.1 200 OK
```

### Result

The backend successfully responds at the HTTP level.

---

# 11. Verify Backend Tests

From the backend directory, run:

```bash
cd ~/flavorforge-azure-devsecops-capstone/backend
```

Then:

```bash
npm test
```

Verify the Jest output and confirm that the configured tests pass.

### Result

The backend automated tests pass.

---

# 12. Backend Verification Complete

The backend verification is now:

```text
Backend
   ↓
Dependencies installed
   ↓
Server starts
   ↓
Port 3000 available
   ↓
/api/health responds
   ↓
HTTP response successful
   ↓
Jest tests pass
```

### Result

**Backend verification complete.**

---

# 13. Verify the Frontend

Open another WSL terminal.

Move to the frontend:

```bash
cd ~/flavorforge-azure-devsecops-capstone/frontend
```

Verify the location:

```bash
pwd
```

List the files:

```bash
ls
```

Verify the frontend project structure:

```text
package.json
src/
```

### Result

The React/Vite frontend source is present.

---

# 14. Verify Frontend Dependencies

Run:

```bash
npm install
```

This installs the dependencies defined in the frontend `package.json`.

### Result

Frontend dependencies are installed.

---

# 15. Verify the Frontend Production Build

Run:

```bash
npm run build
```

The Vite build process converts the React source into production assets.

The flow is:

```text
React Source
     ↓
Vite
     ↓
Production Assets
```

Verify that the command completes successfully.

### Result

The frontend production build succeeds.

---

# 16. Verify the Frontend Development Server

Run:

```bash
npm run dev
```

Vite starts the frontend development server.

Use the URL displayed by Vite and open it in the browser.

The local development URL is normally:

```text
http://localhost:5173
```

Use the actual URL displayed by the terminal.

### Result

The frontend development server starts successfully.

---

# 17. Verify the Frontend UI

Open the application in the browser.

Verify:

```text
Frontend loads
      ↓
React application renders
      ↓
FlavorForge UI is visible
```

Check the application from the browser.

### Result

The frontend UI loads successfully.

---

# 18. Verify Frontend → Backend Communication

With the backend and frontend running:

```text
Browser
   ↓
React Frontend
   ↓
localhost:5173
   ↓
HTTP Request
   ↓
localhost:3000
   ↓
Node.js + Express
   ↓
API Response
   ↓
Frontend
```

Use the application and verify that API-dependent functionality works.

### Result

Frontend-to-backend communication is working.

---

# 19. Verify Browser Network Requests

Open Developer Tools:

```text
F12
```

Open:

```text
Network
```

Use the application and inspect the API requests.

Check:

```text
Request URL
HTTP Method
Status
Response
```

Verify that the relevant API requests complete successfully.

### Result

Browser API requests are successfully reaching the backend.

---

# 20. Verify Browser Console

Open:

```text
Console
```

Check for application errors.

Pay particular attention to:

```text
JavaScript errors
API errors
CORS errors
Network errors
```

### Result

The browser console has been checked as part of final application verification.

---

# 21. Verify the Frontend API Configuration

The frontend uses:

```text
VITE_API_BASE_URL
```

for API configuration.

The local backend is running on:

```text
http://localhost:3000
```

The Docker-specific configuration is:

```text
VITE_API_BASE_URL=http://backend:3000
```

The Docker configuration will be used in the Docker stage.

At this stage, we are only confirming that the local application works before containerization.

---

# 22. Stop the Frontend

After completing the browser verification, return to the terminal running Vite.

Press:

```text
Ctrl + C
```

This stops the development server.

---

# 23. Stop the Backend

Return to the terminal running the backend.

Press:

```text
Ctrl + C
```

This stops the local backend server.

The local application verification is now complete.

---

# 24. Final Backend Verification Summary

The backend has been verified for:

```text
[✓] Backend directory exists
[✓] Dependencies installed
[✓] Backend starts
[✓] Port 3000 responds
[✓] /api/health responds
[✓] HTTP response succeeds
[✓] Jest tests pass
```

---

# 25. Final Frontend Verification Summary

The frontend has been verified for:

```text
[✓] Frontend directory exists
[✓] Dependencies installed
[✓] Vite development server starts
[✓] Frontend opens in browser
[✓] UI renders
[✓] API communication works
[✓] Browser Network checked
[✓] Browser Console checked
[✓] Production build succeeds
```

---

# 26. Final Repository Verification

Return to the project root:

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

Run:

```bash
git status
```

Then:

```bash
git branch --show-current
```

And:

```bash
git remote -v
```

Verify that the project remains connected to the expected GitHub repository and that the working-tree changes are understood before continuing.

---

# 27. Final Application Verification

The complete application verification is:

```text
                 FlavorForge
                     |
          +----------+----------+
          |                     |
          v                     v
      Frontend               Backend
     React/Vite          Node.js/Express
          |                     |
          |                     |
          +----------+----------+
                     |
                     v
              HTTP Communication
                     |
                     v
                /api/health
                     |
                     v
              Backend Tests
                     |
                     v
             Frontend Build
                     |
                     v
             Final Verification
                     |
                     v
              Ready for Docker
```

---

# 28. Final Application Checklist

Before moving to Docker:

## Application

```text
[✓] FlavorForge project available
[✓] frontend/ exists
[✓] backend/ exists
```

## Backend

```text
[✓] Dependencies installed
[✓] Backend starts
[✓] Port 3000 responds
[✓] /api/health works
[✓] HTTP response verified
[✓] Backend tests pass
```

## Frontend

```text
[✓] Dependencies installed
[✓] Vite starts
[✓] Frontend loads
[✓] UI renders
[✓] API communication works
[✓] Browser Network checked
[✓] Browser Console checked
[✓] Production build succeeds
```

## Repository

```text
[✓] Git repository verified
[✓] Current branch verified
[✓] GitHub remote verified
```

---

# 29. Application Stage Result

The application stage is now complete.

```text
Application Overview
        ↓
Frontend Setup
        ↓
Backend Setup
        ↓
API Implementation
        ↓
Application Testing
        ↓
Application Verification
        ↓
Application Ready
```

The final result is:

```text
Application verified
        ↓
Known-good application baseline
        ↓
Ready for Docker
```

---

# 30. Build Journey Status

The `03-application` stage is now:

```text
03-application/
│
├── 01-application-overview.md
├── 02-frontend-setup.md
├── 03-backend-setup.md
├── 04-api-implementation.md
├── 05-application-testing.md
└── 06-application-verification.md
```

`05-application-testing.md` documented the **testing process**.

`06-application-verification.md` documents the **final readiness check**.

---

# 31. Next Build Journey Stage

The application is now ready for containerization.

The next document is:

```text
docs/BUILD-JOURNEY/04-docker/01-docker-setup.md
```

The build journey continues:

```text
Application
      ↓
Application Verified
      ↓
Docker
      ↓
Docker Image
      ↓
Container Verification
      ↓
Azure Container Registry
```

Dockerization begins in the next stage.
