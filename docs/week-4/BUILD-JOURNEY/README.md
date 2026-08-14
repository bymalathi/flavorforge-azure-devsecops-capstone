# FlavorForge Build Journey

The **FlavorForge Build Journey** documents the complete process of rebuilding the FlavorForge Azure DevSecOps Capstone project from the beginning through final verification.

The documentation is organized as a chronological learning path. Each section explains what was built, why it was built, how it was configured, how it was verified, and where to find troubleshooting and final verification guidance.

---

## FlavorForge – Use Case

- Build a modern full-stack recipe-sharing web application.
- Demonstrate an end-to-end Azure DevSecOps implementation.
- Automate CI/CD using Azure DevOps Pipelines.
- Perform code quality analysis with SonarCloud.
- Scan container images for vulnerabilities using Trivy.
- Containerize the application using Docker.
- Store Docker images in Azure Container Registry (ACR).
- Deploy and manage the application on Azure Kubernetes Service (AKS).
- Implement GitOps-based continuous deployment using Argo CD.
- Monitor and manage the application using Azure Monitor.
- Showcase enterprise-grade cloud-native architecture and deployment practices.

---

## Build Journey Structure

| Stage | Area | Purpose |
|---|---|---|
| 01 | Prerequisites | Prepare the development environment |
| 02 | GitHub | Set up the source repository |
| 03 | Application | Build and understand the application |
| 04 | Docker | Containerize and run the application |
| 05 | Azure | Create Azure infrastructure |
| 06 | Kubernetes | Deploy Kubernetes resources |
| 07 | Kustomize | Manage Kubernetes configuration |
| 08 | Azure DevOps | Configure CI/CD |
| 09 | SonarCloud | Perform code quality analysis |
| 10 | Trivy | Perform security scanning |
| 11 | Argo CD | Implement GitOps deployment |
| 12 | DevSecOps | Connect security and delivery controls |
| 13 | Documentation | Automate and verify project documentation |
| 14 | Troubleshooting | Recover from common project issues |
| 15 | Final Verification | Verify the complete project |

---

## Chronological Build Guide

The complete chronological implementation and rebuild process is documented in:

**[BUILD-JOURNEY.md](./BUILD-JOURNEY.md)**

This is the main document to follow when rebuilding FlavorForge from scratch.

---

## Troubleshooting

Troubleshooting procedures are available under:

```text
14-troubleshooting/
```

These documents cover common issues involving:

* GitHub
* Docker
* Azure
* Kubernetes
* Azure DevOps pipelines
* Argo CD
* Cross-layer recovery

The recommended recovery principle is:

> **Diagnose first, change second, verify third.**

---

## Final Verification

The final verification documentation is available under:

```text
15-final-verification/
```

It contains:

* End-to-end verification
* Production verification
* Reproducibility checks
* Project completion checklist

These documents should be used after the implementation and troubleshooting stages are complete.

---

## Project Technology Stack

FlavorForge demonstrates a cloud-native DevSecOps workflow using:

* React and Vite
* Node.js and Express
* Docker
* Azure Container Registry (ACR)
* Azure Kubernetes Service (AKS)
* Kubernetes
* Kustomize
* Azure DevOps
* SonarCloud
* Trivy
* Argo CD
* Git and GitHub

---

## Recommended Learning Order

For a complete rebuild, follow the directories in numerical order:

```text
01 → 02 → 03 → 04 → 05 → 06 → 07 → 08
                         ↓
09 → 10 → 11 → 12 → 13 → 14 → 15
```

Do not skip verification steps between major stages.

---

## Documentation Principle

The BUILD-JOURNEY is designed to make the project reproducible for a beginner while preserving troubleshooting and verification information for future maintenance and review.

The objective is not only to document **what** was done, but also:

* Why it was done.
* How it was implemented.
* How it was verified.
* What can go wrong.
* How the issue can be recovered.
* How the final project can be independently checked.

---

## Project Completion

The project should be considered complete only after the final verification checklist in:

```text
15-final-verification/04-project-completion-checklist.md
```

has been reviewed against actual project evidence.
