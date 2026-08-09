# Application Testing — Complete Beginner Build Guide

## Objective

This document explains how the FlavorForge application was tested after the frontend and backend were implemented.

The purpose of application testing was to verify that:

* The backend starts successfully.
* The backend health API works.
* The frontend builds successfully.
* The frontend can communicate with the backend.
* Backend API tests execute successfully.
* The application is ready for containerization and the later DevSecOps pipeline.

The application testing stage comes before Dockerization.

The overall flow is:

```text
Frontend
   |
   | HTTP request
   v
Backend API
   |
   v
Application Response
```

---

# 1. Application Testing Strategy

FlavorForge contains two primary application components:

```text
frontend/
backend/
```

Testing was performed at the application level before moving into the container and cloud infrastructure stages.

The main areas are:

```text
Frontend
   |
   +-- Build verification

Backend
   |
   +-- Application startup
   +-- Health API
   +-- Automated tests

Integration
   |
   +-- Frontend → Backend communication
```

---

# 2. Verify the Project Structure

From the project root:

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

Check the application directories:

```bash
ls
```

The project should contain:

```text
frontend/
backend/
```

You can inspect them using:

```bash
ls frontend
```

and:

```bash
ls backend
```

The exact contents may evolve as the project changes.

---

# 3. Backend Testing

Move into the backend:

```bash
cd ~/flavorforge-azure-devsecops-capstone/backend
```

Install the backend dependencies if required:

```bash
npm install
```

The backend uses Node.js and Express.

---

# 4. Verify Backend Dependencies

Check the installed dependencies:

```bash
npm list --depth=0
```

This helps confirm that the packages required by the backend are available.

If dependencies have not yet been installed, run:

```bash
npm install
```

---

# 5. Start the Backend

Start the backend using the project's configured start command.

For example:

```bash
npm start
```

The exact command should match the `scripts` section of:

```text
backend/package.json
```

The backend should start without errors.

The application uses port:

```text
3000
```

in the documented configuration.

---

# 6. Verify the Backend Health Endpoint

FlavorForge provides a health endpoint:

```text
/api/health
```

When the backend is running locally on port `3000`, test it with:

```bash
curl http://localhost:3000/api/health
```

A successful response should return JSON.

The exact response depends on the current application configuration.

The important verification is that:

```text
HTTP request
      |
      v
/ api / health
      |
      v
Backend
      |
      v
JSON response
```

---

# 7. Why a Health Endpoint Is Important

The health endpoint provides a simple way to determine whether the backend application is responding.

It is useful later for:

* Docker health checks
* Kubernetes probes
* Load balancer checks
* Troubleshooting
* Deployment verification
* Production monitoring

The same concept is used later when the application runs inside AKS.

---

# 8. Backend Automated Testing

The backend contains automated tests.

From:

```text
backend/
```

run the project's configured test command.

For the FlavorForge backend, Jest is used for testing.

A typical command is:

```bash
npm test
```

The exact command should be confirmed from:

```text
backend/package.json
```

---

# 9. Understand What the Backend Tests Verify

The automated tests provide application-level validation before deployment.

The tests are intended to verify backend behavior rather than manually checking every request.

The testing flow is:

```text
Test Code
   |
   v
Jest
   |
   v
Backend Application
   |
   v
Assertions
   |
   v
PASS / FAIL
```

A successful test run should report that the configured tests passed.

---

# 10. Test Result

The FlavorForge backend tests were executed successfully during the application implementation.

The project later uses these tests as part of the Azure DevOps pipeline.

The pipeline therefore does not rely only on:

```text
Build successful
```

It also validates:

```text
Automated tests
```

before continuing through the CI/CD process.

---

# 11. Frontend Testing — Build Verification

Move to the frontend:

```bash
cd ~/flavorforge-azure-devsecops-capstone/frontend
```

Install dependencies if required:

```bash
npm install
```

Then run the configured frontend build command:

```bash
npm run build
```

The exact result depends on the current frontend configuration.

A successful build verifies that the React/Vite application can be compiled for deployment.

---

# 12. Why Frontend Build Testing Matters

The frontend source code is not deployed directly in its development form.

The production process is:

```text
React Source
     |
     v
Vite Build
     |
     v
Production Static Files
     |
     v
Nginx
```

Therefore, a successful build is an important application verification step.

Later, the same build occurs inside the Docker multi-stage build.

---

# 13. Frontend Development Verification

For local development, the frontend can be started using the configured development command.

Typically:

```bash
npm run dev
```

The Vite development server provides a local address, commonly:

```text
http://localhost:5173
```

The exact address may vary depending on the configuration.

Open the displayed address in a browser.

---

# 14. Verify the Frontend UI

After starting the frontend:

1. Open the displayed local URL.
2. Confirm that the FlavorForge UI loads.
3. Check that the page renders without major browser errors.
4. Exercise the application functionality implemented in the project.
5. Confirm that API-dependent functionality receives a response from the backend.

The purpose is to verify the application before introducing Docker and Kubernetes.

---

# 15. Frontend → Backend Communication

The frontend must know where the backend API is located.

The project uses an API base URL configuration.

During local development, the frontend and backend run as separate processes.

Conceptually:

```text
Browser
   |
   v
Frontend :5173
   |
   | API request
   v
Backend :3000
```

The browser should be able to communicate with the backend without an API connection error.

---

# 16. CORS Verification

The backend uses CORS configuration to control which frontend origin can communicate with it.

During local development, the frontend origin was configured around:

```text
http://localhost:5173
```

Therefore, when testing locally, verify that:

```text
Frontend origin
        |
        v
Backend CORS configuration
        |
        v
API request allowed
```

CORS problems commonly appear in the browser even when the backend itself is running correctly.

---

# 17. Browser Developer Tools

If the frontend does not appear to communicate with the backend, open the browser developer tools.

Check:

```text
Console
Network
```

The **Network** tab is especially useful for identifying API requests.

Look for:

```text
Request URL
HTTP method
Status code
Response
```

For example:

```text
GET /api/health
```

should return a successful response when the backend is running and correctly configured.

---

# 18. Verify the Backend Independently

If the frontend cannot communicate with the backend, first test the backend directly.

Run:

```bash
curl http://localhost:3000/api/health
```

If this succeeds:

```text
Backend works
```

Then investigate:

```text
Frontend configuration
CORS
API URL
Browser request
```

If the health endpoint itself fails:

```text
Backend startup
Port
Environment configuration
Application code
```

should be investigated first.

This separates frontend problems from backend problems.

---

# 19. Test Before Dockerization

The application should be verified locally before creating Docker images.

The sequence is:

```text
Application Code
      |
      v
Local Backend Test
      |
      v
Local Frontend Test
      |
      v
Frontend Build
      |
      v
Automated Tests
      |
      v
Docker
```

This makes troubleshooting easier.

If the application fails before Dockerization, the problem is in the application layer rather than the container layer.

---

# 20. Important Difference Between Testing Stages

FlavorForge later contains several different testing and validation layers.

### Application testing

```text
Does the application work?
```

### Docker testing

```text
Does the application work inside the container?
```

### Kubernetes verification

```text
Does the application work when deployed to Kubernetes?
```

### Pipeline testing

```text
Does CI/CD automatically build and test the application?
```

### Production verification

```text
Does the deployed application work through the production endpoint?
```

These are related but not identical.

---

# 21. Application Test Checklist

Before moving to Docker, verify:

### Backend

* [ ] Backend dependencies installed
* [ ] Backend starts successfully
* [ ] Backend listens on the expected port
* [ ] `/api/health` responds
* [ ] Backend automated tests execute
* [ ] Backend tests pass

### Frontend

* [ ] Frontend dependencies installed
* [ ] Frontend development server starts
* [ ] Frontend UI loads
* [ ] Frontend production build succeeds
* [ ] API requests can reach the backend

### Integration

* [ ] Frontend and backend can communicate
* [ ] CORS configuration allows the expected frontend origin
* [ ] Browser console does not show blocking API/CORS errors

---

# 22. Useful Commands

### Check Node.js

```bash
node --version
```

### Check npm

```bash
npm --version
```

### Install dependencies

```bash
npm install
```

### Start backend

```bash
npm start
```

### Test backend

```bash
npm test
```

### Test health endpoint

```bash
curl http://localhost:3000/api/health
```

### Start frontend

```bash
npm run dev
```

### Build frontend

```bash
npm run build
```

The exact scripts available are defined by the respective:

```text
package.json
```

files.

---

# 23. Troubleshooting

## Backend does not start

Check:

```bash
node --version
npm --version
```

Then:

```bash
npm install
```

Review the startup error.

Also verify that the required port is not already occupied.

---

## Port 3000 is already in use

Check which process is using the port:

```bash
sudo lsof -i :3000
```

Stop the conflicting process if appropriate, or use the application's configured port.

Do not blindly terminate unknown processes.

---

## Health endpoint does not respond

First confirm that the backend is running.

Then:

```bash
curl http://localhost:3000/api/health
```

If it still fails, inspect the backend startup logs.

---

## Frontend does not start

Run:

```bash
npm install
```

Then:

```bash
npm run dev
```

Check the terminal output for the exact error.

---

## Frontend build fails

Run:

```bash
npm run build
```

and inspect the build output.

Common causes include:

* dependency problems
* JavaScript/TypeScript errors
* environment configuration
* incompatible Node.js version
* incorrect application configuration

The actual error should be investigated rather than changing versions blindly.

---

## Frontend loads but API requests fail

Check:

```text
Browser → Developer Tools → Network
```

Then verify:

```text
API URL
Backend status
CORS configuration
```

Also test the backend independently:

```bash
curl http://localhost:3000/api/health
```

---

# 24. What Testing Proved

After successful application testing, we have confidence that:

```text
React frontend
       |
       v
Vite build
       |
       v
Node.js / Express backend
       |
       v
API
       |
       v
Automated backend tests
```

are functioning at the application level.

This gives us a stable application baseline before introducing containerization.

---

# 25. Why We Test Before Docker

A common DevOps troubleshooting mistake is to change several layers at once.

For example:

```text
Application
Docker
Kubernetes
Azure
Pipeline
```

If the application has not been tested locally, a failure later becomes harder to diagnose.

FlavorForge therefore follows the principle:

```text
Test application
       ↓
Containerize application
       ↓
Test container
       ↓
Deploy to Kubernetes
       ↓
Test deployment
       ↓
Automate through CI/CD
```

---

# 26. Reviewer Explanation

### "How did you test the application before Docker?"

> "I tested the application locally first. I verified that the Node.js backend starts, checked the `/api/health` endpoint, ran the backend Jest tests, started the React frontend, verified the UI, and confirmed that the frontend could communicate with the backend."

### "Why did you test before Dockerizing?"

> "I wanted to establish that the application itself worked before introducing containerization. That way, if Docker failed later, I could isolate the problem to the container layer instead of debugging application and infrastructure problems at the same time."

### "How did you test the backend?"

> "I started the Express backend, verified the `/api/health` endpoint using an HTTP request, and executed the configured Jest tests."

### "How did you verify the frontend?"

> "I started the Vite development server, opened the application in the browser, verified the UI and API communication, and also ran the production build."

### "How did you troubleshoot frontend-to-backend issues?"

> "I first tested the backend independently using the health endpoint. If that worked, I checked the browser Network and Console tabs, the frontend API configuration, and the backend CORS configuration."

---

# 27. Application Testing Complete

The application layer is now ready for the next stage.

The Build Journey is:

```text
03-application
       |
       +-- 01 Application Overview
       |
       +-- 02 Frontend Setup
       |
       +-- 03 Backend Setup
       |
       +-- 04 API Implementation
       |
       +-- 05 Application Testing
       |
       +-- 06 Application Verification
```

The next document performs the final application-level verification before moving to Docker:

```text
docs/BUILD-JOURNEY/03-application/06-application-verification.md
```

The next stage after the application section will be the containerization/build stage.
