# Docker Setup

## Objective

Verify that Docker is installed, accessible from WSL, and ready for the FlavorForge containerization steps.

At this stage, we are **not building Docker images**.

The sequence is:

```text
FlavorForge Application
        ↓
Verify Docker
        ↓
Verify Docker Engine
        ↓
Verify Docker CLI
        ↓
Ready for Dockerfiles
```

---

## 1. Open the FlavorForge Project

### What we wanted

Open the existing FlavorForge project from WSL.

### Command

```bash
pwd
```

Then:

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

Verify the project location:

```bash
pwd
```

### Result

The terminal is now inside the FlavorForge project:

```text
/home/<USERNAME>/flavorforge-azure-devsecops-capstone
```

The username may be different on the machine.

### Verification

```bash
ls
```

The project files and directories are listed.

---

## 2. Verify the Frontend and Backend

### What we wanted

Confirm that the existing FlavorForge application source code is present before starting Docker work.

### Command

```bash
ls frontend
```

Then:

```bash
ls backend
```

### Result

The frontend and backend application directories are available.

```text
frontend/
backend/
```

This confirms that Dockerization will be performed against the existing FlavorForge application.

---

## 3. Verify Docker Installation

### What we wanted

Confirm that the Docker CLI is installed and available from WSL.

### Command

```bash
docker --version
```

### Result

Docker returned its installed version.

Example:

```text
Docker version ...
```

The exact version depends on the Docker installation being used.

### Verification

The `docker` command is available from the WSL terminal.

---

## 4. Verify Docker Engine

### What we wanted

Confirm that the Docker CLI can communicate with the Docker Engine.

### Command

```bash
docker info
```

### Result

Docker returned information about the running Docker environment.

The output includes information such as:

```text
Server Version
Containers
Images
Storage Driver
Runtime
```

### Verification

The Docker Engine is running and accessible from WSL.

---

## 5. Check Running Containers

### What we wanted

Check whether any Docker containers are currently running.

### Command

```bash
docker ps
```

### Result

Docker displayed the list of running containers.

If no containers were running, the result contained only the column headers:

```text
CONTAINER ID
IMAGE
COMMAND
CREATED
STATUS
PORTS
NAMES
```

An empty list is valid at this stage.

### Verification

The `docker ps` command completed successfully.

---

## 6. Check All Docker Containers

### What we wanted

Check both running and stopped containers.

### Command

```bash
docker ps -a
```

### Result

Docker displayed all containers available locally.

At this stage, FlavorForge containers had not yet been created.

### Verification

The `docker ps -a` command completed successfully.

---

## 7. Check Local Docker Images

### What we wanted

Check which Docker images are already available locally.

### Command

```bash
docker images
```

### Result

Docker displayed the locally available images.

FlavorForge images were not expected at this stage because the Dockerfiles had not yet been built.

### Verification

The `docker images` command completed successfully.

---

## 8. Verify Docker from the FlavorForge Project

### What we wanted

Confirm that Docker commands work while we are inside the actual FlavorForge repository.

### Command

```bash
pwd
```

Verify that the current directory is:

```text
flavorforge-azure-devsecops-capstone
```

Then run:

```bash
docker ps
```

### Result

Docker successfully responded while working from the FlavorForge project directory.

### Verification

The project directory and Docker environment are both accessible from the same WSL terminal.

---

## 9. Docker Setup Verification

Run the final verification commands:

### Docker version

```bash
docker --version
```

### Docker Engine

```bash
docker info
```

### Running containers

```bash
docker ps
```

### All containers

```bash
docker ps -a
```

### Local images

```bash
docker images
```

### Project verification

```bash
pwd
ls
```

### Expected Result

The following conditions are confirmed:

```text
FlavorForge repository accessible
        ↓
frontend/ exists
        ↓
backend/ exists
        ↓
Docker CLI available
        ↓
Docker Engine running
        ↓
Docker commands working
        ↓
Ready for Dockerfile creation
```

---

## 10. Evidence

Save the relevant terminal screenshots under:

```text
screenshots/Docker/
```

For example:

```text
screenshots/Docker/01-docker-version.png
screenshots/Docker/02-docker-info.png
screenshots/Docker/03-docker-containers.png
screenshots/Docker/04-docker-images.png
```

Use the screenshots that were actually captured during the FlavorForge build.

Do not create screenshots for commands that were not run.

---

## 11. Result

Docker setup was verified successfully for the FlavorForge project.

We confirmed:

```text
FlavorForge repository
        ↓
frontend/ present
        ↓
backend/ present
        ↓
Docker installed
        ↓
Docker Engine running
        ↓
Docker CLI working
```

No FlavorForge Docker image was built in this step.

The project is now ready for the frontend Dockerfile step.

---

## Next Step

Continue with:

```text
docs/BUILD-JOURNEY/04-docker/02-frontend-dockerfile.md
```

The next step will verify the actual Dockerfile used to containerize the FlavorForge frontend.
