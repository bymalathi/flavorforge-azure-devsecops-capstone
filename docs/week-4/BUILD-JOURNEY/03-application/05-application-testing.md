# Application Testing

## Objective

In this step, we test the FlavorForge application locally **before Dockerization**.

The testing flow is:

```text
Frontend + Backend
        ↓
Install dependencies
        ↓
Start Backend
        ↓
Verify /api/health
        ↓
Run Backend Tests
        ↓
Start Frontend
        ↓
Verify Frontend UI
        ↓
Verify Frontend → Backend communication
        ↓
Build Frontend
        ↓
Application Testing Complete
```

The purpose is simple:

> Confirm that the FlavorForge application works locally before introducing Docker.

---

# 1. Open WSL

Open the WSL terminal.

Go to the FlavorForge project:

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

Verify the current directory:

```bash
pwd
```

Expected location:

```text
/home/<your-username>/flavorforge-azure-devsecops-capstone
```

---

# 2. Verify the Project Structure

List the project files:

```bash
ls
```

Verify that the application directories exist:

```bash
ls frontend
```

```bash
ls backend
```

The application contains:

```text
frontend/
backend/
```

The frontend contains the React/Vite application.

The backend contains the Node.js/Express application.

---

# 3. Check Node.js

From the project directory, run:

```bash
node --version
```

FlavorForge uses the Node.js 22.x line for its application and frontend build setup.

The version should be in the Node.js 22.x range.

---

# 4. Check npm

Run:

```bash
npm --version
```

npm is used to install the application dependencies and execute the configured project commands.

---

# 5. Test the Backend

Move into the backend directory:

```bash
cd ~/flavorforge-azure-devsecops-capstone/backend
```

Verify the location:

```bash
pwd
```

List the backend files:

```bash
ls
```

The important backend areas are:

```text
package.json
src/
tests/
```

---

# 6. Install Backend Dependencies

Run:

```bash
npm install
```

npm reads the backend `package.json` and installs the required dependencies.

After installation, the backend has the dependencies required to run and test the application.

---

# 7. Check Backend Commands

Run:

```bash
npm run
```

This displays the scripts configured in:

```text
backend/package.json
```

The configured scripts include the commands used to start and test the backend.

---

# 8. Start the Backend

Run:

```bash
npm start
```

The FlavorForge backend starts using Node.js and Express.

The backend listens on:

```text
localhost:3000
```

The terminal should remain open because the backend needs to keep running while we test it.

![](/screenshots/backend/03-backend-server-running.png)

### Result

The backend server is running successfully.

---

# 9. Open a Second WSL Terminal

Keep the backend terminal running.

Open another WSL terminal for verification commands.

The setup is now:

```text
Terminal 1
    ↓
Backend running
localhost:3000

Terminal 2
    ↓
Verification commands
```

---

# 10. Verify the Backend Health API

In the second terminal, run:

```bash
curl http://localhost:3000/api/health
```

The request goes to:

```text
GET /api/health
```

The flow is:

```text
curl
  ↓
localhost:3000
  ↓
Express Backend
  ↓
/api/health
  ↓
JSON Response
```

A successful response confirms that the backend is responding to HTTP requests.

---

# 11. Verify the HTTP Status

Run:

```bash
curl -i http://localhost:3000/api/health
```

The `-i` option displays the HTTP response headers together with the response body.

Verify that the response contains a successful HTTP status.

For example:

```text
HTTP/1.1 200 OK
```

### Result

The backend health endpoint responds successfully.

---

# 12. Run Backend Automated Tests

Make sure you are inside the backend directory:

```bash
cd ~/flavorforge-azure-devsecops-capstone/backend
```

Run:

```bash
npm test
```

FlavorForge uses Jest for the backend automated tests.

The test flow is:

```text
Backend Source
      ↓
Jest
      ↓
Test Cases
      ↓
Assertions
      ↓
PASS / FAIL
```

Verify the Jest output and confirm that the configured tests pass.

### Result

The backend automated tests pass successfully.

---

# 13. Backend Testing Checkpoint

At this point we have verified:

```text
Backend
  ↓
Dependencies installed
  ↓
Server starts
  ↓
Port 3000 responds
  ↓
/api/health works
  ↓
Jest tests pass
```

The backend is ready for frontend integration testing.

---

# 14. Test the Frontend

Open another WSL terminal if required.

Move into the frontend directory:

```bash
cd ~/flavorforge-azure-devsecops-capstone/frontend
```

Verify the location:

```bash
pwd
```

List the frontend files:

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

# 15. Install Frontend Dependencies

Run:

```bash
npm install
```

npm reads:

```text
frontend/package.json
```

and installs the frontend dependencies.

---

# 16. Check Frontend Commands

Run:

```bash
npm run
```

This displays the scripts configured in:

```text
frontend/package.json
```

The frontend development and production workflow uses Vite.

---

# 17. Start the Frontend

Run:

```bash
npm run dev
```

Vite starts the frontend development server.

The terminal displays the URL.

For the local FlavorForge frontend, the development server is available around:

```text
http://localhost:5173
```

Use the actual URL displayed by Vite.

Keep the terminal running.

---

# 18. Verify the Frontend in the Browser

Open the URL displayed by Vite in the browser.

For example:

```text
http://localhost:5173
```

Verify that:

```text
Frontend loads
      ↓
React application renders
      ↓
FlavorForge UI is visible
```

Check the application from the user's point of view.

### Result

The React frontend loads successfully in the browser.

---

# 19. Check the Browser Console

Open browser Developer Tools.

Use:

```text
F12
```

or:

```text
Right click → Inspect
```

Open:

```text
Console
```

Check for errors related to:

```text
JavaScript
API
CORS
Network
```

The purpose of this check is to identify frontend runtime problems before moving to Docker.

---

# 20. Check the Browser Network Tab

Open:

```text
Network
```

in Developer Tools.

Use the application and observe the requests made by the frontend.

Check the relevant API request details:

```text
Request URL
HTTP method
Status
Response
```

The request should reach the backend successfully.

---

# 21. Verify Frontend → Backend Communication

At this point both applications are running:

```text
Browser
   ↓
React + Vite
   ↓
localhost:5173
   ↓
HTTP API request
   ↓
localhost:3000
   ↓
Node.js + Express
   ↓
API Response
   ↓
Frontend
```

The frontend and backend are therefore being tested together.

If an API request succeeds in the browser Network tab, it confirms that the frontend can communicate with the running backend.

---

# 22. Verify the Backend Again if Required

If the frontend cannot communicate with the backend, first test the backend directly:

```bash
curl http://localhost:3000/api/health
```

If the health endpoint responds:

```text
Backend working
```

then continue investigating the frontend side:

```text
Frontend API configuration
CORS
Browser Console
Browser Network tab
```

If the health endpoint does not respond, investigate the backend first.

The troubleshooting order is:

```text
Backend
   ↓
/api/health
   ↓
Frontend
   ↓
API request
   ↓
CORS / browser
```

---

# 23. Verify the Frontend API Configuration

The frontend uses:

```text
VITE_API_BASE_URL
```

for the backend API configuration.

For local application testing, the backend is running separately on:

```text
http://localhost:3000
```

The Docker-specific configuration is different and uses:

```text
VITE_API_BASE_URL=http://backend:3000
```

That Docker configuration will be used during the Docker stage.

For this document, we are only verifying the local application before Docker.

---

# 24. Check CORS During Integration Testing

The local frontend and backend use different origins:

```text
Frontend
http://localhost:5173

Backend
http://localhost:3000
```

The browser therefore applies CORS rules to requests between them.

If the browser reports a CORS error, inspect:

```text
Browser Console
Browser Network
Backend configuration
Frontend API configuration
```

Do not change configuration randomly.

First identify the failed request and its error.

---

# 25. Build the Frontend

After completing the runtime testing, stop the frontend development server if necessary:

```text
Ctrl + C
```

Make sure you are inside:

```text
frontend/
```

Run:

```bash
npm run build
```

Vite builds the React application for production.

The build flow is:

```text
React Source
      ↓
Vite
      ↓
Production Build
      ↓
Static Assets
```

A successful build confirms that the frontend can be compiled for production.

---

# 26. Verify the Build Result

After running:

```bash
npm run build
```

verify that the command completes successfully.

The production assets are generated by Vite.

The build output is normally:

```text
dist/
```

Do not manually create the build directory.

Vite generates it during the build.

### Result

The frontend production build completes successfully.

---

# 27. Final Application Testing

At this point we have tested the application in the following order:

```text
Backend
    ↓
Backend dependencies
    ↓
Backend startup
    ↓
Health API
    ↓
Jest tests
    ↓
Frontend dependencies
    ↓
Frontend startup
    ↓
Browser UI
    ↓
Frontend → Backend communication
    ↓
Frontend production build
```

The application has now been tested locally before Dockerization.

---

# 28. Final Backend Test

If the backend is no longer running, start it again:

```bash
cd ~/flavorforge-azure-devsecops-capstone/backend
```

```bash
npm start
```

Then from another terminal verify:

```bash
curl http://localhost:3000/api/health
```

Run the backend tests:

```bash
cd ~/flavorforge-azure-devsecops-capstone/backend
```

```bash
npm test
```

Verify that the tests pass.

---

# 29. Final Frontend Test

Move to the frontend:

```bash
cd ~/flavorforge-azure-devsecops-capstone/frontend
```

Start the development server:

```bash
npm run dev
```

Open the URL displayed by Vite.

Verify:

```text
Frontend loads
UI renders
API communication works
```

Then stop the development server if required:

```text
Ctrl + C
```

Run the production build:

```bash
npm run build
```

Verify that the build succeeds.

---

# 30. Application Testing Checklist

Before moving to Docker, verify:

## Project

```text
[✓] FlavorForge project opens
[✓] frontend/ exists
[✓] backend/ exists
[✓] Node.js works
[✓] npm works
```

## Backend

```text
[✓] Backend dependencies installed
[✓] Backend starts
[✓] Backend listens on port 3000
[✓] /api/health responds
[✓] Backend tests pass
```

## Frontend

```text
[✓] Frontend dependencies installed
[✓] Vite starts
[✓] Frontend opens in browser
[✓] UI renders
[✓] Browser Console checked
[✓] Browser Network checked
[✓] Frontend → Backend communication verified
[✓] Production build succeeds
```

---

# 31. What We Have Proven

The application has passed the local testing stage.

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
            Application Tested
```

The important result is:

```text
Application works locally
        ↓
Application testing complete
        ↓
Ready for final verification
```

---

# 32. Testing Result

The FlavorForge application has been tested locally before introducing Docker.

We verified:

```text
Backend
  ↓
Starts successfully
  ↓
Health API responds
  ↓
Jest tests pass

Frontend
  ↓
Starts successfully
  ↓
UI loads
  ↓
API communication works
  ↓
Production build succeeds
```

The application is now ready for the final application verification stage.

---

# 33. Next Step

The next document is:

```text
docs/BUILD-JOURNEY/03-application/06-application-verification.md
```

`05-application-testing.md` covered **how the application was tested**.

The next document will perform the **final verification checkpoint** before moving to:

```text
04-docker/
```

The build journey continues:

```text
Application Testing
        ↓
Application Verification
        ↓
Application Ready
        ↓
Docker
```
