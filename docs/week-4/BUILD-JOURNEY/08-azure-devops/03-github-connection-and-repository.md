Perfect. This gives us the **confirmed values** we were missing. We can now rewrite `02-create-project.md` much more accurately.

One important distinction: your current project page confirms the **current project configuration**. It does not prove every setting selected on the original creation screen. So I will document what the evidence actually shows.

Replace the contents of:

```text
docs/week-4/BUILD-JOURNEY/08-azure-devops/02-create-project.md
```

with this:

````markdown
# Step 2 — Create the Azure DevOps Project

## What We Wanted

After creating the Azure DevOps organization, the next step was to create a dedicated Azure DevOps project for the FlavorForge Azure DevSecOps capstone.

The project provides the central Azure DevOps workspace for managing:

- Boards
- Repositories
- Pipelines
- Test Plans
- Artifacts
- Project-level configuration
- CI/CD automation

The project created for this capstone is:

```text
FlavorForge – Azure DevSecOps Capstone
````

The project belongs to the Azure DevOps organization:

```text
malathiabhilash
```

The resulting structure is:

```text
Azure DevOps
    │
    └── Organization
          │
          └── malathiabhilash
                │
                └── FlavorForge – Azure DevSecOps Capstone
```

---

# Step 2.1 — Open the Azure DevOps Organization

## Where We Went

Open Azure DevOps and sign in.

The Azure DevOps organization used for the FlavorForge project is:

```text
malathiabhilash
```

The organization URL is:

```text
https://dev.azure.com/malathiabhilash/
```

## What We Clicked

1. Open a web browser.
2. Open Azure DevOps.
3. Sign in with the Microsoft account associated with the Azure DevOps organization.
4. Open the `malathiabhilash` organization.

## What Happened

The Azure DevOps organization page displayed the available projects.

The organization showed:

```text
ACR-Pipeline-Demo

FlavorForge – Azure DevSecOps Capstone
```

The organization owner displayed in Azure DevOps was:

```text
Malathi Shetty
```

---

# Step 2.2 — Start Creating the Project

## Where We Went

From the Azure DevOps organization page, go to the **Projects** section.

## What We Clicked

Click:

```text
New project
```

## What Happened

Azure DevOps opened the project creation form.

The project creation form allows the project name and other project-level settings to be configured.

---

# Step 2.3 — Enter the Project Name

## What We Entered

The project name used for the FlavorForge capstone is:

```text
FlavorForge – Azure DevSecOps Capstone
```

## Project Details

| Field                     | Value                                    |
| ------------------------- | ---------------------------------------- |
| Project name              | `FlavorForge – Azure DevSecOps Capstone` |
| Azure DevOps organization | `malathiabhilash`                        |

The project name identifies the Azure DevOps workspace used for the FlavorForge capstone.

---

# Step 2.4 — Project Description

The project contains the following description:

> Enterprise-grade Azure DevSecOps project demonstrating a complete CI/CD pipeline using GitHub, Azure DevOps, Docker, Azure Container Registry (ACR), Azure Kubernetes Service (AKS), Kubernetes, NGINX Ingress, SonarCloud, Trivy, ConfigMaps, Secrets, and Horizontal Pod Autoscaler (HPA). The pipeline automatically builds, tests, scans, containerizes, pushes images to ACR, and deploys to AKS across Development, QA, and Production environments.

The project description also documents the intended DevSecOps flow:

```text
Developer
    ↓
GitHub
    ↓
Azure DevOps Pipeline
    ↓
Build
    ↓
Test
    ↓
SonarCloud Analysis
    ↓
Trivy Security Scan
    ↓
Docker Image Build
    ↓
Push to Azure Container Registry (ACR)
    ↓
Deploy to Azure Kubernetes Service (AKS)
    ↓
Development
    ↓
QA
    ↓
Production
    ↓
NGINX Ingress
    ↓
Live Application
```

This description is visible under the project's **Project details**.

---

# Step 2.5 — Project Process

## What We Selected

The project's configured process is:

```text
Basic
```

## Project Configuration

| Field   | Value   |
| ------- | ------- |
| Process | `Basic` |

The current Azure DevOps Project details page confirms that the FlavorForge project uses the **Basic** process.

## Why This Matters

The process determines the work-tracking methodology and the work item types available in Azure DevOps.

For this project, the confirmed process is:

```text
Basic
```

We should not document the project as using Agile or Scrum.

---

# Step 2.6 — Project Visibility

The project is shown as:

```text
Private
```

The project page displays:

```text
Private
Invite
```

Therefore, the confirmed project visibility is:

```text
Private
```

## Project Configuration

| Field      | Value     |
| ---------- | --------- |
| Visibility | `Private` |

This means access to the project is restricted rather than being publicly accessible.

---

# Step 2.7 — Project Administrator

The Project details page shows the configured project administrator.

## Project Administrator

```text
Malathi Shetty
```

The associated account displayed by Azure DevOps is:

```text
malathiabhilash@outlook.com
```

The Project administrators section also provides:

```text
Add administrator
```

for adding additional project administrators.

## Confirmed Configuration

| Field                 | Value                         |
| --------------------- | ----------------------------- |
| Project administrator | `Malathi Shetty`              |
| Account               | `malathiabhilash@outlook.com` |

---

# Step 2.8 — Azure DevOps Services Enabled for the Project

The Project details page shows the Azure DevOps services enabled for the project.

The confirmed services are:

| Azure DevOps Service | Status |
| -------------------- | ------ |
| Boards               | On     |
| Repos                | On     |
| Pipelines            | On     |
| Test Plans           | On     |
| Artifacts            | On     |

The project therefore has the following Azure DevOps capabilities enabled:

```text
Boards
Repos
Pipelines
Test Plans
Artifacts
```

---

# Step 2.9 — Boards

The project has:

```text
Boards
On
```

Boards provide agile planning functionality within Azure DevOps.

For this documentation, the important confirmed fact is that Boards are enabled for the FlavorForge project.

---

# Step 2.10 — Repos

The project has:

```text
Repos
On
```

Repos provide repository and pull-request functionality within Azure DevOps.

The FlavorForge project also contains a repository entry for:

```text
FlavorForge – Azure DevSecOps Capstone
```

The repository contains the project's source code and documentation.

The project README is available at:

```text
README.md
```

The repository is connected with the FlavorForge source-control workflow documented in the following steps.

---

# Step 2.11 — Pipelines

The project has:

```text
Pipelines
On
```

This is important because the FlavorForge implementation uses Azure DevOps Pipelines for CI/CD automation.

The pipeline workflow documented for this project includes activities such as:

```text
Build
↓
Test
↓
SonarCloud Analysis
↓
Trivy Security Scan
↓
Docker Image Build
↓
Push to ACR
↓
AKS Deployment
```

The detailed pipeline configuration will be documented in later BUILD-JOURNEY steps.

---

# Step 2.12 — Test Plans

The project has:

```text
Test Plans
On
```

Azure DevOps Test Plans provides structured manual testing capabilities.

The current project configuration confirms that the service is enabled.

---

# Step 2.13 — Artifacts

The project has:

```text
Artifacts
On
```

Azure DevOps Artifacts provides package-feed capabilities for packages such as:

```text
NuGet
npm
Maven
Universal Packages
Python
```

The current project configuration confirms that Artifacts is enabled.

---

# Step 2.14 — Verify the Project Details

Open:

```text
Project settings
    ↓
Overview
```

The Project details page should show the following information.

## Project Details

| Field                 | Confirmed Value                          |
| --------------------- | ---------------------------------------- |
| Name                  | `FlavorForge – Azure DevSecOps Capstone` |
| Process               | `Basic`                                  |
| Visibility            | `Private`                                |
| Project administrator | `Malathi Shetty`                         |
| Organization          | `malathiabhilash`                        |

## Azure DevOps Services

| Service    | Status |
| ---------- | ------ |
| Boards     | On     |
| Repos      | On     |
| Pipelines  | On     |
| Test Plans | On     |
| Artifacts  | On     |

---

# Step 2.15 — Verify the Project README

The project also exposes a repository README:

```text
README.md
```

The README identifies the project as:

```text
FlavorForge - Enterprise Azure DevSecOps Capstone
```

It describes FlavorForge as a production-style Azure DevSecOps project using technologies including:

* Azure DevOps
* Docker
* Azure Container Registry
* Azure Kubernetes Service
* Kubernetes
* SonarCloud
* Trivy
* Azure Monitor

The README also contains the project objectives, technology stack, repository documentation, roadmap, and project status.

---

# Verify

The final project configuration confirmed from Azure DevOps is:

```text
Organization
    ↓
malathiabhilash

Project
    ↓
FlavorForge – Azure DevSecOps Capstone

Process
    ↓
Basic

Visibility
    ↓
Private

Administrator
    ↓
Malathi Shetty
```

The enabled Azure DevOps services are:

```text
Boards       → On
Repos        → On
Pipelines    → On
Test Plans   → On
Artifacts    → On
```

---

# Screenshot

## Screenshot 1 — Project Details

Use the screenshot/evidence showing:

```text
Project details

Name
FlavorForge – Azure DevSecOps Capstone

Description
Enterprise-grade Azure DevSecOps project...

Process
Basic

Project administrators
Malathi Shetty
```

This screenshot also shows the Azure DevOps services:

```text
Boards      → On
Repos       → On
Pipelines   → On
Test Plans  → On
Artifacts   → On
```

Add the actual screenshot file here once its repository path is confirmed.

```text
[Insert actual Project Settings → Overview screenshot]
```

---

## Screenshot 2 — Project Home

Use the screenshot/evidence showing:

```text
FlavorForge – Azure DevSecOps Capstone

Private
```

and the project description.

Add the actual screenshot file here once its repository path is confirmed.

```text
[Insert actual FlavorForge Azure DevOps project home screenshot]
```

---

# Result

The Azure DevOps project was successfully created and configured as:

```text
FlavorForge – Azure DevSecOps Capstone
```

under the:

```text
malathiabhilash
```

Azure DevOps organization.

The confirmed configuration is:

```text
Organization
    ↓
malathiabhilash
    ↓
FlavorForge – Azure DevSecOps Capstone
    │
    ├── Visibility: Private
    ├── Process: Basic
    ├── Administrator: Malathi Shetty
    │
    ├── Boards: On
    ├── Repos: On
    ├── Pipelines: On
    ├── Test Plans: On
    └── Artifacts: On
```

The project is now ready for the next stage of the Azure DevOps BUILD-JOURNEY.

The next document is:

```text
03-github-connection-and-repository.md
```

```

### One correction from the earlier version

We can now safely replace the earlier statement:

> “Project visibility/process/description were not confirmed.”

with the actual evidence:

- **Name:** FlavorForge – Azure DevSecOps Capstone
- **Description:** confirmed
- **Process:** Basic
- **Visibility:** Private
- **Administrator:** Malathi Shetty
- **Boards:** On
- **Repos:** On
- **Pipelines:** On
- **Test Plans:** On
- **Artifacts:** On

The **only thing I would still not claim** is the exact values selected on the original *Create project* screen (for example, if a README checkbox existed there), because your current Project Settings page doesn't prove what was selected at creation time.
```
