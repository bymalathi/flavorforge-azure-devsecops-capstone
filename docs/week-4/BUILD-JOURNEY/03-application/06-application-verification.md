# Application Verification — Complete Beginner Build Guide

## Objective

This is the **final verification step of the application stage**.

Before starting Docker, we want to make sure that the FlavorForge application itself is working.

We will verify:

```text
1. Project structure
2. Git repository
3. Frontend
4. Backend
5. Backend health API
6. Backend tests
7. Frontend build
8. Frontend → Backend communication
9. GitHub repository
10. Final application readiness
```

The most important idea is:

```text
First make sure the application works
                |
                v
        Then introduce Docker
```

If the application works before Docker, troubleshooting later becomes much easier.

---

# 1. Application Verification Flow

Our final application verification looks like this:

```text
FlavorForge
    |
    +-------------------+
    |                   |
    v                   v
Frontend             Backend
React + Vite         Node.js + Express
    |                   |
    |                   v
    |              /api/health
    |                   |
    +---------+---------+
              |
              v
       Application Works
              |
              v
        Ready for Docker
```

---

# 2. Open WSL

Open your **WSL terminal**.

We will work from the FlavorForge project directory.

Move to the project:

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

Now check where you are:

```bash
pwd
```

You should see something similar to:

```text
/home/YOUR_USERNAME/flavorforge-azure-devsecops-capstone
```

Your username may be different.

---

# 3. Check the Project Files

Run:

```bash
ls
```

You should see the main project directories.

At this stage, the important application directories are:

```text
frontend/
backend/
```

You will also have other directories because the project was later expanded for Docker, Kubernetes, Azure DevOps and documentation.

For example:

```text
frontend/
backend/
docker/
kubernetes/
argocd/
docs/
scripts/
.github/
```

Do not worry if the complete list is larger.

We are currently checking only the application foundation.

---

# 4. Check Git Status

Before testing the application, check the Git repository.

Run:

```bash
git status
```

This tells us:

* whether Git recognizes the project
* which branch we are on
* whether files have changed
* whether there are untracked files

You may see something like:

```text
On branch main
```

and possibly a list of modified or untracked files.

Do **not** delete changes just because `git status` is not clean.

At this stage, we are only checking the repository state.

---

# 5. Check the Current Branch

Run:

```bash
git branch --show-current
```

The main branch used for the project is:

```text
main
```

If you see:

```text
main
```

the branch check is successful.

---

# 6. Check the GitHub Remote

Run:

```bash
git remote -v
```

You should see the GitHub repository configured as `origin`.

For the FlavorForge repository, it should point to the project's GitHub repository.

The important idea is:

```text
Local FlavorForge Repository
          |
          v
        origin
          |
          v
GitHub FlavorForge Repository
```

This confirms that the local project is connected to GitHub.

---

# 7. Check Recent Commits

Run:

```bash
git log --oneline -5
```

This displays the five most recent commits.

For example:

```text
abc1234 latest change
def5678 documentation update
...
```

The actual commit IDs and messages will be different.

This is simply a quick way to confirm that the repository contains the expected project history.

---

# 8. Verify the Frontend

Now we will verify the React frontend.

From the project root, run:

```bash
cd frontend
```

Check your location:

```bash
pwd
```

You should now be inside:

```text
flavorforge-azure-devsecops-capstone/frontend
```

Check the files:

```bash
ls
```

The frontend contains the React/Vite application.

Important areas include:

```text
package.json
src/
```

---

# 9. Install Frontend Dependencies

From the `frontend/` directory, run:

```bash
npm install
```

npm reads the frontend:

```text
package.json
```

and installs the required packages.

The generated dependencies are normally stored in:

```text
node_modules/
```

You do not manually create `node_modules`.

npm creates it for you.

---

# 10. Verify the Frontend Build

Still inside:

```text
frontend/
```

run:

```bash
npm run build
```

This runs the configured Vite production build.

The flow is:

```text
React Source Code
       |
       v
      Vite
       |
       v
Production Build
```

If the command finishes successfully, the frontend can be compiled for production.

This is important because the frontend will later be placed inside a Docker image.

---

# 11. What Does a Successful Build Mean?

A successful:

```bash
npm run build
```

means that the frontend source can be converted into production-ready files.

Conceptually:

```text
frontend/src/
     |
     v
Vite
     |
     v
Production Assets
```

At this point, we know that the frontend can be built.

---

# 12. Start the Frontend

To test the frontend in the browser, run:

```bash
npm run dev
```

Vite will display a URL in the terminal.

It will normally be similar to:

```text
http://localhost:5173
```

Use the URL shown by the terminal.

Open it in your browser.

---

# 13. Verify the Frontend UI

Once the application opens in the browser, check:

```text
✓ Page loads
✓ UI is visible
✓ No major JavaScript error
✓ FlavorForge functionality is displayed
```

At this point, we are checking the frontend itself.

Do not worry yet if an API-dependent feature does not work.

We will verify the backend separately.

---

# 14. Stop the Frontend

When you finish checking the frontend, return to the terminal where Vite is running.

Press:

```text
Ctrl + C
```

This stops the development server.

We can start it again later when we test frontend-to-backend communication.

---

# 15. Return to the Project Root

Run:

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

Now enter the backend directory:

```bash
cd backend
```

Check your location:

```bash
pwd
```

You should now be inside:

```text
flavorforge-azure-devsecops-capstone/backend
```

---

# 16. Check Backend Files

Run:

```bash
ls
```

The backend contains the Node.js/Express application.

Important areas include:

```text
package.json
src/
tests/
```

The backend application code is under:

```text
src/
```

and the automated tests are under:

```text
tests/
```

---

# 17. Install Backend Dependencies

From:

```text
backend/
```

run:

```bash
npm install
```

npm reads:

```text
backend/package.json
```

and installs the dependencies required by the backend.

---

# 18. Check Available Backend Commands

Before starting the backend, run:

```bash
npm run
```

This displays the npm scripts configured in:

```text
backend/package.json
```

This is a useful beginner habit.

Instead of guessing an npm command, you can look at the commands the project provides.

For example, the project may provide commands for:

```text
start
test
```

The exact list displayed by `npm run` comes from the project's current `package.json`.

---

# 19. Start the Backend

Start the backend using the project's configured start command.

For the FlavorForge backend, use:

```bash
npm start
```

The backend runs using:

```text
Node.js
+
Express
```

The configured application port is:

```text
3000
```

The terminal should remain running while the backend is active.

Do not close this terminal yet.

---

# 20. Understand What Is Happening

When you run:

```bash
npm start
```

the flow is:

```text
npm
 |
 v
Node.js
 |
 v
Express
 |
 v
HTTP Server
 |
 v
Port 3000
```

The backend is now waiting for HTTP requests.

---

# 21. Open a Second WSL Terminal

Do not stop the backend.

Open another WSL terminal.

We need the backend terminal to keep running while we test it.

The two terminals will look like this:

```text
Terminal 1
    |
    +-- Backend running


Terminal 2
    |
    +-- Commands used for verification
```

This is a very common way to test a local frontend/backend application.

---

# 22. Test the Backend Health API

In the **second terminal**, run:

```bash
curl http://localhost:3000/api/health
```

This sends an HTTP request to:

```text
localhost
```

on port:

```text
3000
```

for:

```text
/api/health
```

The request flow is:

```text
curl
 |
 v
localhost:3000
 |
 v
Express Backend
 |
 v
/api/health
 |
 v
JSON Response
```

---

# 23. What Should You See?

The backend should return a JSON response.

The exact response can depend on the current application configuration.

The important thing is that the request successfully reaches the backend and produces a response.

For example, the response can contain information related to:

```text
health/status
version
environment
build information
```

Do not worry if the exact JSON is different from an older screenshot or example.

The running application's response is the source of truth.

---

# 24. Why We Test `/api/health`

The health endpoint gives us a very simple way to answer:

> "Is my backend actually running?"

Instead of checking the entire application, we can make one HTTP request:

```bash
curl http://localhost:3000/api/health
```

If we receive the expected response:

```text
Backend is running
```

This same idea becomes useful later with:

```text
Docker
   |
   v
Kubernetes
   |
   v
AKS
```

---

# 25. Check the HTTP Response

We can also use:

```bash
curl -i http://localhost:3000/api/health
```

The `-i` option displays the HTTP response headers as well as the response body.

This helps us see information such as the HTTP status.

Conceptually:

```text
HTTP Request
     |
     v
GET /api/health
     |
     v
HTTP Response
     |
     +---- Status
     |
     +---- Headers
     |
     +---- JSON Body
```

---

# 26. Run Backend Tests

Now we will test the backend automatically.

Make sure you are inside:

```text
backend/
```

Run:

```bash
npm test
```

The FlavorForge backend uses Jest for automated testing.

The flow is:

```text
Backend Tests
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

# 27. Verify the Test Result

Look at the terminal output.

We want to see that the configured tests completed successfully.

Do not just assume success because the command finished.

Look for the Jest test summary and confirm that the tests passed.

The exact number of tests can change as the project evolves.

---

# 28. Stop the Backend

After completing the backend verification, return to the terminal where the backend is running.

Press:

```text
Ctrl + C
```

This stops the backend.

We will start it again when testing frontend-to-backend communication.

---

# 29. Start the Backend Again

Open one WSL terminal and run:

```bash
cd ~/flavorforge-azure-devsecops-capstone/backend
```

Then:

```bash
npm start
```

Leave this terminal running.

---

# 30. Start the Frontend Again

Open another WSL terminal.

Run:

```bash
cd ~/flavorforge-azure-devsecops-capstone/frontend
```

Then:

```bash
npm run dev
```

Vite will display the frontend URL.

Open that URL in the browser.

Usually it will be similar to:

```text
http://localhost:5173
```

Use the actual URL shown by Vite.

---

# 31. Test Frontend → Backend Communication

Now both applications are running:

```text
Frontend
localhost:5173
       |
       | HTTP API request
       v
Backend
localhost:3000
```

Use the application normally.

When the frontend needs backend information, it should send an HTTP request to the backend.

The flow is:

```text
Browser
   |
   v
React Frontend
   |
   | API Request
   v
Node.js + Express
   |
   v
API Response
   |
   v
React Frontend
```

---

# 32. Check the Browser

Open the browser developer tools.

Usually:

```text
F12
```

or:

```text
Right click
    |
    v
Inspect
```

Then check:

```text
Console
Network
```

The **Network** tab is particularly useful.

---

# 33. Check API Requests

In the Network tab, look for requests going to the backend.

You may see requests related to:

```text
/api/health
```

or other application API endpoints.

Check:

```text
Request URL
HTTP method
Status
Response
```

A successful API request should show a successful HTTP status.

---

# 34. Verify CORS

If the browser reports a CORS error, do not immediately change random settings.

First understand the problem.

The flow should be:

```text
Frontend Origin
      |
      v
CORS Configuration
      |
      v
Backend
      |
      v
Request Allowed
```

The documented local frontend origin is:

```text
http://localhost:5173
```

The backend must allow the appropriate frontend origin.

---

# 35. Troubleshoot Frontend → Backend Communication

If the frontend cannot communicate with the backend, use this order.

### Step 1 — Test backend directly

Run:

```bash
curl http://localhost:3000/api/health
```

If this works:

```text
Backend is working
```

Continue checking:

```text
Frontend API URL
CORS
Browser Network tab
```

If this does not work:

```text
Backend problem
```

Investigate the backend first.

This prevents us from changing frontend code when the real problem is the backend.

---

# 36. Verify Frontend API Configuration

The frontend uses:

```text
VITE_API_BASE_URL
```

to determine where the backend API is located.

This configuration is important because the backend address changes between environments.

Conceptually:

```text
Local
   |
   +--> Backend on localhost:3000


Docker
   |
   +--> Backend container/service


Kubernetes
   |
   +--> Backend Service
```

Therefore, the frontend should use the appropriate API configuration for the environment.

---

# 37. Verify the Frontend Production Build Again

After completing the runtime testing, stop the frontend if it is still running:

```text
Ctrl + C
```

Then make sure you are inside:

```text
frontend/
```

Run:

```bash
npm run build
```

We want the production build to complete successfully.

The flow is:

```text
React Source
     |
     v
Vite
     |
     v
Production Assets
```

These production assets are later packaged into the frontend Docker image.

---

# 38. Check Git Status Again

Return to the project root:

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

Run:

```bash
git status
```

Testing may create generated files.

Check what Git reports.

Do not blindly commit every generated file.

For example:

```text
node_modules/
```

should normally not be committed.

The project's `.gitignore` should handle generated dependency directories.

---

# 39. Check GitHub Remote Again

Run:

```bash
git remote -v
```

Confirm that:

```text
origin
```

points to the FlavorForge GitHub repository.

This is important because the next stages of the project will use the repository for:

```text
Docker
Azure DevOps
CI/CD
GitOps
Documentation
```

---

# 40. Final Backend Verification

At this point we have verified:

```text
Backend
   |
   +---- Node.js
   |
   +---- Express
   |
   +---- Port 3000
   |
   +---- /api/health
   |
   +---- Jest tests
```

The backend application is ready for the next stage.

---

# 41. Final Frontend Verification

We have also verified:

```text
Frontend
   |
   +---- React
   |
   +---- Vite
   |
   +---- Development server
   |
   +---- Browser UI
   |
   +---- API communication
   |
   +---- Production build
```

The frontend is ready for the next stage.

---

# 42. Final Integration Verification

The application consists of:

```text
React Frontend
       |
       | HTTP
       v
Node.js + Express Backend
       |
       v
API Response
```

We have tested the components individually and then tested their communication.

This is important.

Testing only the frontend does not prove that the backend works.

Testing only the backend does not prove that the frontend can communicate with it.

We therefore test both.

---

# 43. Final Application Checklist

Before moving to Docker, verify the following.

## Project

```text
[ ] FlavorForge project opens correctly
[ ] frontend/ exists
[ ] backend/ exists
[ ] Git repository works
[ ] origin remote is configured
```

## Frontend

```text
[ ] npm install completed
[ ] npm run dev works
[ ] Frontend opens in browser
[ ] UI loads correctly
[ ] npm run build succeeds
```

## Backend

```text
[ ] npm install completed
[ ] npm start works
[ ] Backend listens on port 3000
[ ] /api/health responds
[ ] npm test succeeds
```

## Integration

```text
[ ] Frontend can communicate with backend
[ ] API URL is configured correctly
[ ] CORS configuration is correct
[ ] Browser Network tab shows successful API requests
```

## GitHub

```text
[ ] Current branch is main
[ ] origin points to GitHub
[ ] Project changes are understood
[ ] No unwanted generated files are committed
```

---

# 44. Useful Final Commands

## Go to project

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

## Check Git status

```bash
git status
```

## Check branch

```bash
git branch --show-current
```

## Check remote

```bash
git remote -v
```

## Enter backend

```bash
cd ~/flavorforge-azure-devsecops-capstone/backend
```

## Install backend dependencies

```bash
npm install
```

## See backend commands

```bash
npm run
```

## Start backend

```bash
npm start
```

## Test backend

```bash
npm test
```

## Test backend health API

```bash
curl http://localhost:3000/api/health
```

## Enter frontend

```bash
cd ~/flavorforge-azure-devsecops-capstone/frontend
```

## Install frontend dependencies

```bash
npm install
```

## Start frontend

```bash
npm run dev
```

## Build frontend

```bash
npm run build
```

---

# 45. If Something Fails

Do not jump directly to Docker.

Use this troubleshooting order:

```text
Application
    |
    +---- Does backend start?
    |
    +---- Does /api/health work?
    |
    +---- Do backend tests pass?
    |
    +---- Does frontend start?
    |
    +---- Does frontend build?
    |
    +---- Can frontend reach backend?
    |
    v
Application confirmed
    |
    v
Move to Docker
```

This order is important.

If:

```bash
curl http://localhost:3000/api/health
```

fails, fix the backend first.

If the backend works but the browser cannot call it, investigate:

```text
Frontend API configuration
CORS
Browser Network tab
```

If the frontend works but:

```bash
npm run build
```

fails, fix the frontend build before starting Docker.

---

# 46. Why We Do Not Start Docker Yet

At this point, Docker has still not been used to verify the application.

That is intentional.

We first establish:

```text
Known-good source application
```

Only after that do we introduce:

```text
Docker
```

Then:

```text
Docker Image
      |
      v
Container
      |
      v
Container Registry
      |
      v
Kubernetes
      |
      v
AKS
```

This makes troubleshooting much easier because each layer can be tested separately.

---

# 47. What We Have Proven

After completing this document, we have verified the application layer.

```text
                    FlavorForge
                         |
             +-----------+-----------+
             |                       |
             v                       v
         Frontend                 Backend
       React + Vite           Node.js + Express
             |                       |
             |                       v
             |                  /api/health
             |                       |
             +-----------+-----------+
                         |
                         v
                  Integration
                         |
                         v
                Automated Tests
                         |
                         v
                 Production Build
                         |
                         v
                  Ready for Docker
```

The important result is:

```text
Application verified
        |
        v
Dockerization can begin
```

---

# 48. Reviewer Explanation

### "How did you verify the application before Docker?"

> "I verified the application layer first. I checked the project structure, started the Express backend, tested `/api/health`, ran the backend Jest tests, started the React frontend, verified the UI and frontend-to-backend communication, and confirmed that the Vite production build succeeds."

### "Why did you verify the application before Docker?"

> "I wanted a known-good application baseline before introducing containers. That way, if something failed during Dockerization, I could determine whether the issue came from the application or the container configuration."

### "How did you verify the backend?"

> "I started the Node.js and Express backend, verified the health endpoint using curl, and ran the configured Jest test suite."

### "How did you verify the frontend?"

> "I started the Vite development server, opened the application in the browser, checked the UI and API communication, and ran the production build using `npm run build`."

### "How did you troubleshoot frontend-to-backend communication?"

> "I first tested `/api/health` directly. If the backend responded successfully, I then checked the frontend API configuration, CORS configuration, and the browser Network and Console tabs."

### "What is the result of this stage?"

> "The application has been verified independently of Docker, so it is ready to move into the containerization stage."

---

# 49. Application Stage Complete

The complete application Build Journey is now:

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

The complete flow is:

```text
Application Overview
        |
        v
Frontend Setup
        |
        v
Backend Setup
        |
        v
API Implementation
        |
        v
Application Testing
        |
        v
Application Verification
        |
        v
Application Ready
```

---

# 50. Next Build Journey Stage

The application layer is complete.

Now we move to:

```text
04-docker/
```

The Docker stage will take the application we have just verified and explain, step by step:

```text
Application
     |
     v
Dockerfile
     |
     v
Docker Image
     |
     v
Container
     |
     v
Local Container Verification
     |
     v
Ready for Azure Container Registry
```

The next document is:

```text
docs/BUILD-JOURNEY/04-docker/01-docker-setup.md
```

This is where containerization begins.
