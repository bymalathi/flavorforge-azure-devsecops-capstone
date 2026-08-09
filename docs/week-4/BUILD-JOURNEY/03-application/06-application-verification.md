# Application Verification — Complete Beginner Guide

## Objective

This document provides the final verification of the FlavorForge application before moving to the Docker/containerization stage.

The purpose is to confirm that the application layer is ready for the next stage of the Build Journey.

The verification covers:

1. Application source structure
2. Frontend
3. Backend
4. API health endpoint
5. Automated backend tests
6. Frontend build
7. Frontend-to-backend communication
8. Application configuration
9. Git status
10. Final readiness for Dockerization

The important principle is:

```text
Application must work first
        |
        v
Then containerize it
```

---

# 1. Application Verification Flow

The application verification flow is:

```text
FlavorForge Source Code
        |
        +-------------------+
        |                   |
        v                   v
    Frontend             Backend
        |                   |
        v                   v
   Vite Build          Express API
        |                   |
        |                   v
        |              /api/health
        |                   |
        +---------+---------+
                  |
                  v
          Application Ready
                  |
                  v
             Docker Stage
```

---

# 2. Open the Project

Open the WSL terminal.

Move to the FlavorForge project:

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

Verify the directory:

```bash
pwd
```

Expected structure:

```text
/home/YOUR_USERNAME/flavorforge-azure-devsecops-capstone
```

The username and exact home directory can differ on another machine.

---

# 3. Verify the Application Directories

Run:

```bash
ls
```

The project should contain the application directories:

```text
frontend/
backend/
```

The project also contains other directories used later in the DevSecOps implementation, such as:

```text
docker/
kubernetes/
argocd/
docs/
scripts/
.github/
```

The exact repository contents may evolve as the project is developed.

---

# 4. Verify the Frontend

Move into the frontend:

```bash
cd frontend
```

Check the files:

```bash
ls
```

The frontend is based on:

```text
React
Vite
```

The frontend configuration is defined through files such as:

```text
package.json
```

and the application source under:

```text
src/
```

---

# 5. Verify Frontend Dependencies

Run:

```bash
npm install
```

If dependencies are already installed and the project is unchanged, npm may report that everything is already installed.

The purpose of this step is to make sure the dependencies required by the frontend are available.

---

# 6. Verify the Frontend Build

Run:

```bash
npm run build
```

A successful build confirms that the React/Vite application can be compiled for production.

The conceptual flow is:

```text
React Source
     |
     v
Vite
     |
     v
Production Build
```

The frontend production build is important because the application will later be packaged into a Docker image.

---

# 7. Verify the Frontend Development Server

If required, start the frontend:

```bash
npm run dev
```

Vite normally displays a local URL in the terminal.

For example:

```text
http://localhost:5173
```

Open the displayed URL in a browser.

Do not assume the port if the terminal displays a different one.

---

# 8. Verify the Frontend UI

Confirm:

* The page loads.
* The application renders correctly.
* The browser does not show a blocking JavaScript error.
* The implemented FlavorForge functionality is visible.
* API-dependent functionality can communicate with the backend when the backend is running.

If the frontend is running successfully, stop the development server when finished using:

```text
Ctrl + C
```

---

# 9. Verify the Backend

Return to the project root:

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

Then:

```bash
cd backend
```

Check the backend files:

```bash
ls
```

The backend uses:

```text
Node.js
Express
```

---

# 10. Install Backend Dependencies

Run:

```bash
npm install
```

This ensures that the dependencies defined by the backend project are available.

---

# 11. Start the Backend

Start the backend using the configured npm script.

For example:

```bash
npm start
```

The exact script should be verified from:

```text
backend/package.json
```

The documented application configuration uses:

```text
PORT=3000
```

when running the backend locally.

---

# 12. Verify the Backend Health API

With the backend running, open another WSL terminal.

Run:

```bash
curl http://localhost:3000/api/health
```

The backend should return a JSON response.

The exact response depends on the current application configuration.

The important verification is:

```text
HTTP request
     |
     v
http://localhost:3000/api/health
     |
     v
Express Backend
     |
     v
JSON Response
```

---

# 13. Why `/api/health` Is Important

The health endpoint provides a simple way to determine whether the backend is responding.

Later in the Build Journey, health checks become useful for:

```text
Docker
Kubernetes
AKS
Load Balancer
Troubleshooting
Deployment Verification
```

Therefore, this endpoint is an important application-level verification point.

---

# 14. Run Backend Automated Tests

Stop the backend only if required by the project's test setup.

From:

```text
backend/
```

run:

```bash
npm test
```

The FlavorForge backend uses:

```text
Jest
```

for automated testing.

A successful test run confirms that the configured backend tests pass.

The conceptual flow is:

```text
Test Files
    |
    v
Jest
    |
    v
Backend Code
    |
    v
Assertions
    |
    v
PASS / FAIL
```

---

# 15. Verify the Test Result

The exact output depends on the current test suite.

A successful run should indicate that the configured tests passed.

Do not judge success only by whether the command returned to the terminal.

Look at the test summary and confirm that the tests completed successfully.

---

# 16. Verify Frontend-to-Backend Communication

The application has two separately running components during local development:

```text
Frontend
localhost:5173
```

and:

```text
Backend
localhost:3000
```

The conceptual communication is:

```text
Browser
   |
   v
React Frontend
   |
   | API request
   v
Express Backend
   |
   v
API Response
```

Start both components if the application functionality requires them.

---

# 17. Verify CORS Configuration

The backend needs to allow the frontend origin during local development.

The documented local frontend origin is:

```text
http://localhost:5173
```

Therefore, verify that the backend's CORS configuration allows the expected frontend origin.

If the frontend loads but API requests are blocked, inspect:

```text
Browser Developer Tools
        |
        +-- Console
        |
        +-- Network
```

Look for CORS-related errors.

---

# 18. Test the API Directly Before Debugging the Frontend

If the frontend cannot communicate with the backend, test the backend independently first:

```bash
curl http://localhost:3000/api/health
```

If this succeeds:

```text
Backend is responding
```

then investigate:

```text
Frontend API configuration
CORS
Browser request
Frontend environment
```

If this fails, investigate the backend first.

This provides a simple troubleshooting decision tree:

```text
Frontend API request fails
          |
          v
Test /api/health directly
          |
       +--+--+
       |     |
     Works  Fails
       |     |
       v     v
Frontend   Backend
/CORS      investigation
```

---

# 19. Verify the Production Frontend Build

The frontend must be able to produce a production build before containerization.

From:

```text
frontend/
```

run:

```bash
npm run build
```

A successful build demonstrates:

```text
Frontend Source
       |
       v
Vite
       |
       v
Production Assets
```

These production assets will later be used by the frontend Docker image.

---

# 20. Verify the Application Configuration

Before moving to Docker, review the application configuration.

Important areas include:

```text
Frontend API configuration
Backend port
Backend environment configuration
CORS configuration
Application version information
```

Do not commit credentials into configuration files.

Never place values such as:

```text
Passwords
PATs
Azure secrets
Private keys
Database credentials
```

into source-controlled configuration.

---

# 21. Verify the Git Repository

Return to the project root:

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

Run:

```bash
git status
```

This confirms the current state of the working tree.

It is normal for the working tree to contain changes if application development is still in progress.

Do not automatically discard changes just to make the repository clean.

---

# 22. Verify the GitHub Remote

Run:

```bash
git remote -v
```

The remote should point to the FlavorForge GitHub repository.

For the existing project:

```text
origin  https://github.com/shettymalathib/flavorforge-azure-devsecops-capstone.git
```

For a recreated project:

```text
origin  https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git
```

---

# 23. Verify the Current Branch

Run:

```bash
git branch --show-current
```

The expected primary branch is:

```text
main
```

Verify the upstream relationship:

```bash
git branch -vv
```

The expected relationship is:

```text
main
   |
   v
origin/main
```

---

# 24. Final Application Verification Commands

The following commands provide a compact final verification.

### Verify Git

```bash
git --version
```

### Verify branch

```bash
git branch --show-current
```

### Verify remote

```bash
git remote -v
```

### Verify repository status

```bash
git status
```

### Verify recent commits

```bash
git log --oneline -5
```

### Verify backend health

```bash
curl http://localhost:3000/api/health
```

### Verify backend tests

From `backend/`:

```bash
npm test
```

### Verify frontend build

From `frontend/`:

```bash
npm run build
```

---

# 25. Final Verification Checklist

## Project

* [ ] FlavorForge project directory exists.
* [ ] `frontend/` exists.
* [ ] `backend/` exists.
* [ ] Project is a Git repository.

## Frontend

* [ ] Frontend dependencies are installed.
* [ ] Frontend development server starts.
* [ ] Frontend UI loads.
* [ ] Frontend production build succeeds.
* [ ] Frontend can communicate with the backend when both are running.

## Backend

* [ ] Backend dependencies are installed.
* [ ] Backend starts successfully.
* [ ] Backend uses the expected application configuration.
* [ ] `/api/health` responds.
* [ ] Backend Jest tests pass.

## Integration

* [ ] Frontend API configuration is correct.
* [ ] CORS configuration allows the expected frontend origin.
* [ ] API requests can reach the backend.

## Git/GitHub

* [ ] Git is installed.
* [ ] Current branch is `main`.
* [ ] `origin` exists.
* [ ] `origin` points to the correct GitHub repository.
* [ ] GitHub authentication works.
* [ ] Local project has been pushed to GitHub.
* [ ] Recent commits are visible on GitHub.

## Security

* [ ] No PAT is stored in the repository.
* [ ] No password is stored in the repository.
* [ ] No SSH private key is committed.
* [ ] No Azure credentials are committed.
* [ ] No connection strings containing credentials are committed.

---

# 26. What We Have Proven

After completing this verification, we have verified the application layer:

```text
                FlavorForge
                    |
          +---------+---------+
          |                   |
          v                   v
      Frontend             Backend
       React              Node.js
        Vite              Express
          |                   |
          |                   v
          |              /api/health
          |                   |
          +---------+---------+
                    |
                    v
             Application Tests
                    |
                    v
             Application Build
                    |
                    v
             Ready for Docker
```

The important point is that Docker has **not** yet been used to prove the application works.

The application has first been verified at the source-code/runtime level.

---

# 27. Why This Verification Stage Exists

The Build Journey separates application problems from infrastructure problems.

Without this stage, a later failure could come from:

```text
Application code
Dockerfile
Docker image
ACR
Kubernetes
AKS
Ingress
Azure DevOps
```

With application verification completed first, we establish a known-good application baseline.

Therefore:

```text
Known-good application
        |
        v
Docker
        |
        v
Container
        |
        v
Kubernetes
        |
        v
AKS
        |
        v
CI/CD
```

This makes the later troubleshooting process much easier.

---

# 28. Reviewer Explanation

### "How did you verify the application before Docker?"

> "I verified the frontend and backend independently first. I started the backend and tested `/api/health`, ran the backend Jest tests, started the React frontend, verified the UI and frontend-to-backend communication, and confirmed that the frontend production build succeeds."

### "Why didn't you start with Docker?"

> "I wanted to establish a known-good application baseline first. That separates application issues from containerization and infrastructure issues."

### "How do you know the backend is working?"

> "The Express backend starts successfully, the `/api/health` endpoint responds, and the configured Jest tests pass."

### "How do you know the frontend is buildable?"

> "I run `npm run build` from the frontend directory and verify that the Vite production build completes successfully."

### "How did you verify frontend-to-backend communication?"

> "I ran the backend independently first, verified the health endpoint, then ran the frontend and checked the browser's API requests and CORS configuration."

### "What happens after application verification?"

> "The application moves into the containerization stage, where the frontend and backend are packaged into Docker images."

---

# 29. Application Stage Complete

The complete application section is now:

```text
03-application/
│
├── 01-application-overview.md
│
├── 02-frontend-setup.md
│
├── 03-backend-setup.md
│
├── 04-api-implementation.md
│
├── 05-application-testing.md
│
└── 06-application-verification.md
```

The flow is:

```text
01 Application Overview
          |
          v
02 Frontend Setup
          |
          v
03 Backend Setup
          |
          v
04 API Implementation
          |
          v
05 Application Testing
          |
          v
06 Application Verification
          |
          v
      Docker Stage
```

The application is now documented and verified as the foundation for the remaining FlavorForge DevSecOps implementation.

---

# 30. Next Build Journey Stage

Continue with the next section of the Build Journey:

```text
04-docker/
```

The Docker stage will explain how the verified application is converted into container images and prepared for the container registry.
