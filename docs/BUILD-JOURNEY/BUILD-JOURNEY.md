# FlavorForge Build Journey

## 1. Purpose

This document provides the complete chronological journey for rebuilding the FlavorForge Azure DevSecOps Capstone project from an empty Git repository.

Unlike the implementation guides, this document focuses on the order in which the project was designed, built, verified, and deployed. Every phase documents the objectives, prerequisites, implementation steps, verification process, supporting evidence, common issues, and completion criteria required before progressing to the next phase.

The goal is to ensure that the project can be recreated consistently months or years later without relying on memory or external notes.

---

## 2. Intended Audience

This document is intended for:

- Developers rebuilding the project from scratch.
- Students learning Azure DevSecOps implementation.
- Reviewers and interviewers who want to understand the complete engineering journey.
- Future maintenance of the FlavorForge project.

---

## 3. Project Overview

FlavorForge is a cloud-native recipe discovery application built using a modern DevSecOps workflow.

The application consists of a React frontend, a Node.js and Express backend, Docker containers, Azure Container Registry (ACR), Azure Kubernetes Service (AKS), Kubernetes manifests, Azure DevOps CI/CD pipelines, SonarCloud quality analysis, Trivy security scanning, and Argo CD GitOps deployment.

The project demonstrates the complete lifecycle of designing, building, testing, securing, deploying, and maintaining a cloud-native application using Microsoft Azure and Kubernetes.

---

## 4. Build Strategy

The project is rebuilt in the same sequence in which it was originally developed.

Each phase depends on the successful completion of the previous phase. Verification is performed before moving to the next stage to ensure that every component is functioning correctly.

The build sequence is summarized below.

```text
Project Planning
        │
        ▼
Repository Setup
        │
        ▼
Frontend Development
        │
        ▼
Backend Development
        │
        ▼
Application Integration
        │
        ▼
Dockerization
        │
        ▼
Azure Infrastructure
        │
        ▼
Azure Container Registry (ACR)
        │
        ▼
Azure Kubernetes Service (AKS)
        │
        ▼
Kubernetes Manifests
        │
        ▼
Ingress Controller
        │
        ▼
Horizontal Pod Autoscaler
        │
        ▼
Azure DevOps Pipeline
        │
        ▼
SonarCloud
        │
        ▼
Trivy Security Scanning
        │
        ▼
Argo CD GitOps
        │
        ▼
Monitoring
        │
        ▼
Documentation
        │
        ▼
Demo Preparation
        │
        ▼
Final Verification
```

---

# Phase 1 — Project Planning

## Goal

Define the project vision, technology stack, architecture, development approach, and expected deliverables before writing any code.

Proper planning reduces rework, establishes a clear implementation roadmap, and ensures that every subsequent phase follows a well-defined architecture.

---

## Why This Phase Comes First

Every software project begins with planning.

Before creating a repository or writing code, the project requirements, architecture, technologies, and deployment strategy must be identified.

Planning first ensures that development decisions remain consistent throughout the project lifecycle.

---

## Concept

Building a software project is similar to constructing a house.

A house is not built by purchasing bricks first. The land is surveyed, the requirements are gathered, the architecture is designed, and a construction plan is approved before construction begins.

Similarly, FlavorForge is planned before any source code, infrastructure, or deployment resources are created.

---

## Technical Explanation

During this phase, the overall architecture of the application is defined, the technology stack is selected, and the complete DevSecOps workflow is planned.

No application code or cloud resources are created during this phase.

Instead, this phase establishes the blueprint that guides every remaining stage of the project.

---

## Prerequisites

None.

This is the starting point for rebuilding the project.

---

## Files Created

No project files are created during this phase.

The planning process produces design decisions that will be implemented during the following phases.

---

## Files Modified

None.

---

## Technology Stack

| Category | Technology |
|----------|------------|
| Frontend | React, Vite |
| Backend | Node.js, Express |
| Runtime | Node.js |
| Containerization | Docker |
| Container Registry | Azure Container Registry (ACR) |
| Orchestration | Kubernetes |
| Managed Kubernetes | Azure Kubernetes Service (AKS) |
| CI/CD | Azure DevOps Pipelines |
| Code Quality | SonarCloud |
| Security Scanning | Trivy |
| GitOps | Argo CD |
| Version Control | Git and GitHub |

---

## Project Objectives

The project should:

- Build a modern React frontend.
- Develop a RESTful backend using Node.js and Express.
- Containerize both applications using Docker.
- Store container images in Azure Container Registry.
- Deploy workloads to Azure Kubernetes Service.
- Manage Kubernetes resources using Kustomize overlays.
- Automate CI/CD using Azure DevOps.
- Perform code quality analysis using SonarCloud.
- Scan container images using Trivy.
- Implement GitOps deployments using Argo CD.
- Produce comprehensive engineering documentation.
- Demonstrate the complete DevSecOps lifecycle.

---

## Step-by-Step Tasks

1. Define the application idea.
2. Identify project requirements.
3. Select the frontend framework.
4. Select the backend framework.
5. Select the cloud platform.
6. Select the container platform.
7. Select the CI/CD platform.
8. Define the deployment strategy.
9. Define the documentation strategy.
10. Define the project directory structure.

No implementation commands are executed during this phase.

---

## Verification

Planning is complete when:

- Project objectives are clearly documented.
- Technology stack has been finalized.
- Overall architecture has been identified.
- Build sequence has been established.
- Development roadmap has been approved.

---

## Evidence

Use the following architecture diagrams from the repository.

![Enterprise Cloud Architecture](diagrams/flavorforge-enterprise-cloud-architecture.png)

*Figure 1.1 – Overall enterprise cloud architecture.*



![Application Architecture](diagrams/flavorforge-application-architecture.png)

*Figure 1.2 – FlavorForge application architecture.*

![DevSecOps Lifecycle](diagrams/flavorforge-devsecops-lifecycle-infographic.png)

*Figure 1.3 – FlavorForge DevSecOps lifecycle.*

---

## Common Mistakes

- Beginning development before defining the architecture.
- Choosing technologies without understanding how they integrate.
- Building infrastructure before designing the deployment workflow.
- Creating project folders without a planned repository structure.
- Failing to define verification criteria before implementation begins.

---

## Before Moving to Phase 2

Verify that:

- Project vision is finalized.
- Technology stack has been selected.
- Build sequence has been documented.
- Overall architecture is understood.
- Development roadmap is complete.

Only after these activities are completed should the repository be created.

---

## References

- React Documentation: https://react.dev
- Vite Documentation: https://vite.dev
- Node.js Documentation: https://nodejs.org/docs
- Docker Documentation: https://docs.docker.com
- Kubernetes Documentation: https://kubernetes.io/docs
- Microsoft Learn – Azure Architecture Center: https://learn.microsoft.com/azure/architecture/
- Argo CD Documentation: https://argo-cd.readthedocs.io/
- SonarCloud Documentation: https://docs.sonarcloud.io/
- Trivy Documentation: https://trivy.dev/latest/docs/

---

---

# Phase 2 — Development Environment Setup

## Goal

Prepare a development workstation with all required software, command-line tools, and editors needed to build, test, containerize, deploy, and maintain the FlavorForge application.

A correctly configured development environment ensures that every subsequent phase can be completed without missing dependencies or compatibility issues.

---

## Why This Phase Comes Now

Before creating a repository or writing application code, the development environment must be prepared.

Installing all required tools at the beginning prevents interruptions during later phases and ensures that the same environment is used throughout the project lifecycle.

---

## Concept

Building a software project requires more than writing code.

A developer also needs the correct tools to create source code, manage versions, build containers, communicate with Azure, deploy Kubernetes resources, and automate deployments.

This phase prepares the workstation so that it is capable of performing every task required throughout the project.

---

## Technical Explanation

The FlavorForge project depends on several development tools, including Git, Node.js, Docker, Azure CLI, Kubernetes CLI utilities, and Visual Studio Code.

Each tool has a specific responsibility during development.

Installing and verifying these tools before beginning development reduces configuration issues and simplifies troubleshooting.

---

## Prerequisites

- Completion of Phase 1 – Project Planning.
- Internet connectivity.
- Administrative or sudo privileges on the development machine.

---

## Files Created

No project source files are created during this phase.

The software required for development is installed on the local workstation.

---

## Files Modified

None.

---

## Required Software

| Software | Purpose |
|-----------|---------|
| Git | Version control |
| GitHub Account | Source code hosting |
| Visual Studio Code | Source code editor |
| Node.js LTS | JavaScript runtime |
| npm | Package management |
| Docker | Containerization |
| Azure CLI | Azure resource management |
| kubectl | Kubernetes management |
| Kustomize | Kubernetes environment overlays |
| Google Chrome | Application testing |

---

## Step-by-Step Tasks

### Step 1 — Verify Git Installation

```bash
git --version
```

Expected output:

```text
git version 2.x.x
```

---

### Step 2 — Verify Node.js

```bash
node --version
```

Expected output:

```text
v22.x.x
```

---

### Step 3 — Verify npm

```bash
npm --version
```

---

### Step 4 — Verify Docker

```bash
docker --version
```

---

### Step 5 — Verify Docker Compose

```bash
docker compose version
```

---

### Step 6 — Verify Azure CLI

```bash
az version
```

---

### Step 7 — Verify Kubernetes CLI

```bash
kubectl version --client
```

---

### Step 8 — Verify Kustomize

```bash
kubectl kustomize --help
```

---

### Step 9 — Verify Visual Studio Code

```bash
code --version
```

---

## Verification

The development environment is ready when:

- Git is installed.
- Node.js and npm are installed.
- Docker is running.
- Azure CLI is installed.
- kubectl is installed.
- Kustomize is available.
- Visual Studio Code launches successfully.

---

## Learning Outcome

After completing this phase, you should understand:

- The purpose of every development tool.
- How to verify software installations.
- Which tools are required throughout the project lifecycle.
- Why development environment consistency is important.

---

## Estimated Completion Time

Approximately 20–30 minutes.

---

## Evidence

Use the following screenshot.

![Node.js Installation](../screenshots/Backend/07-Node24-Installation.png)

*Figure 2.1 – Development environment with Node.js installed.*

---

## Common Mistakes

- Installing an unsupported Node.js version.
- Forgetting to start the Docker daemon.
- Installing Azure CLI without verifying authentication later.
- Using an outdated version of Git.
- Skipping tool verification after installation.

---

## Before Moving to Phase 3

Verify that:

- All required software has been installed.
- Every verification command executes successfully.
- Docker is running.
- The Azure CLI is accessible.
- Visual Studio Code is ready for development.

Only after completing these checks should the project repository be created.

---

## References

- Git: https://git-scm.com/doc
- Node.js: https://nodejs.org
- Docker: https://docs.docker.com
- Azure CLI: https://learn.microsoft.com/cli/azure/
- kubectl: https://kubernetes.io/docs/reference/kubectl/
- Visual Studio Code: https://code.visualstudio.com/docs