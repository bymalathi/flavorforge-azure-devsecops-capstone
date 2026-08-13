# Project Completion Checklist

## Purpose

This document provides the final completion checklist for the FlavorForge Azure DevSecOps project.

The purpose is to confirm that the project implementation, security controls, deployment workflow, GitOps configuration, documentation, troubleshooting guidance, and final verification are complete.

This checklist should be completed using actual repository contents, execution results, screenshots, and other available evidence.

> **Important:** Do not mark an item as complete unless it has been verified.

---

# 1. Completion Status

Use the following status definitions:

| Status | Meaning |
|---|---|
| `PASS` | Requirement was verified successfully |
| `PARTIAL` | Requirement exists but requires additional verification |
| `NOT VERIFIED` | Requirement has not yet been checked |
| `NOT APPLICABLE` | Requirement does not apply to this implementation |
| `BLOCKED` | Verification could not be completed because of a dependency or external issue |

The final project status should be based on evidence rather than assumptions.

---

# 2. Repository Verification

| Check | Status | Evidence / Notes |
|---|---|---|
| Git repository exists | ☐ | |
| Correct repository is being used | ☐ | |
| Correct branch verified | ☐ | |
| Recent commits reviewed | ☐ | |
| Working tree reviewed | ☐ | |
| No unintended files present | ☐ | |
| Project structure verified | ☐ | |

Commands:

```bash
cd ~/flavorforge-azure-devsecops-capstone

git status
git branch --show-current
git log --oneline -10
git remote -v
````

---

# 3. Application Verification

| Check                                   | Status | Evidence / Notes |
| --------------------------------------- | ------ | ---------------- |
| Application source code exists          | ☐      |                  |
| Application structure documented        | ☐      |                  |
| Build configuration exists              | ☐      |                  |
| Application builds successfully         | ☐      |                  |
| Application artifact is generated       | ☐      |                  |
| Application configuration is documented | ☐      |                  |

For a Maven application:

```bash
mvn clean package
```

Record the actual result.

---

# 4. Docker Verification

| Check                                   | Status | Evidence / Notes |
| --------------------------------------- | ------ | ---------------- |
| Dockerfile exists                       | ☐      |                  |
| `.dockerignore` exists where applicable | ☐      |                  |
| Docker build instructions documented    | ☐      |                  |
| Docker image builds successfully        | ☐      |                  |
| Docker image exists locally             | ☐      |                  |
| Container starts successfully           | ☐      |                  |
| Application runs inside container       | ☐      |                  |

Check:

```bash
docker images
docker ps -a
```

If required:

```bash
docker build -t <image-name>:<tag> .
```

---

# 5. Azure Verification

## 5.1 Resource Group

| Check                                       | Status | Evidence / Notes |
| ------------------------------------------- | ------ | ---------------- |
| Resource group exists                       | ☐      |                  |
| Correct resource group name verified        | ☐      |                  |
| Correct region verified                     | ☐      |                  |
| Resources belong to expected resource group | ☐      |                  |

Expected FlavorForge Week 4 resource group:

```text
flavorforge-rg
```

Verify:

```bash
az group show \
  --name flavorforge-rg \
  --output table
```

---

# 6. Azure Container Registry Verification

| Check                     | Status | Evidence / Notes |
| ------------------------- | ------ | ---------------- |
| ACR exists                | ☐      |                  |
| Correct ACR name verified | ☐      |                  |
| Login server verified     | ☐      |                  |
| Correct region verified   | ☐      |                  |
| Correct SKU verified      | ☐      |                  |
| Repository exists         | ☐      |                  |
| Required image exists     | ☐      |                  |
| Required image tag exists | ☐      |                  |

Expected:

```text
ACR:
flavorforgeacr2026ms

Login Server:
flavorforgeacr2026ms.azurecr.io

Region:
East US

SKU:
Basic
```

Verify:

```bash
az acr show \
  --name flavorforgeacr2026ms \
  --resource-group flavorforge-rg \
  --output table
```

Login server:

```bash
az acr show \
  --name flavorforgeacr2026ms \
  --resource-group flavorforge-rg \
  --query loginServer \
  --output tsv
```

---

# 7. AKS Verification

| Check                         | Status | Evidence / Notes |
| ----------------------------- | ------ | ---------------- |
| AKS cluster exists            | ☐      |                  |
| Correct cluster name verified | ☐      |                  |
| Correct region verified       | ☐      |                  |
| Node count verified           | ☐      |                  |
| Node size verified            | ☐      |                  |
| Cluster is available          | ☐      |                  |
| kubectl access works          | ☐      |                  |
| Nodes are Ready               | ☐      |                  |

Expected FlavorForge AKS:

```text
Cluster:
flavorforge-aks

Region:
East US

Node Count:
2

Node Size:
Standard_D2as_v7
```

Verify:

```bash
az aks show \
  --name flavorforge-aks \
  --resource-group flavorforge-rg \
  --output table
```

Get credentials:

```bash
az aks get-credentials \
  --resource-group flavorforge-rg \
  --name flavorforge-aks \
  --overwrite-existing
```

Check:

```bash
kubectl get nodes
```

---

# 8. Kubernetes Verification

| Check                              | Status | Evidence / Notes |
| ---------------------------------- | ------ | ---------------- |
| Kubernetes manifests exist         | ☐      |                  |
| Namespace verified                 | ☐      |                  |
| Deployment exists                  | ☐      |                  |
| Deployment is Ready                | ☐      |                  |
| Pods are Running                   | ☐      |                  |
| Pods are Ready                     | ☐      |                  |
| Service exists                     | ☐      |                  |
| Service has expected configuration | ☐      |                  |
| Endpoints are available            | ☐      |                  |
| No unexplained pod failures        | ☐      |                  |
| Application logs reviewed          | ☐      |                  |

Commands:

```bash
kubectl get namespaces
kubectl get pods -A
kubectl get deployments -A
kubectl get services -A
kubectl get events -A --sort-by=.lastTimestamp
```

---

# 9. Kustomize Verification

| Check                                          | Status | Evidence / Notes |
| ---------------------------------------------- | ------ | ---------------- |
| Kustomization file exists                      | ☐      |                  |
| Base configuration exists                      | ☐      |                  |
| Overlay configuration exists where applicable  | ☐      |                  |
| Image configuration verified                   | ☐      |                  |
| Generated manifests are valid                  | ☐      |                  |
| Generated manifests contain expected resources | ☐      |                  |

Find Kustomize configuration:

```bash
find . \
  -type f \
  \( -name "kustomization.yaml" -o -name "kustomization.yml" \)
```

Render the appropriate overlay:

```bash
kubectl kustomize <overlay-directory>
```

---

# 10. Azure DevOps Verification

| Check                                        | Status | Evidence / Notes |
| -------------------------------------------- | ------ | ---------------- |
| Azure DevOps organization verified           | ☐      |                  |
| Azure DevOps project verified                | ☐      |                  |
| GitHub connection verified                   | ☐      |                  |
| Agent pool verified                          | ☐      |                  |
| Service connections verified                 | ☐      |                  |
| Variable groups verified                     | ☐      |                  |
| Approvals/checks verified where applicable   | ☐      |                  |
| Pipeline exists                              | ☐      |                  |
| Pipeline YAML exists in repository           | ☐      |                  |
| Latest pipeline execution reviewed           | ☐      |                  |
| Build stage successful                       | ☐      |                  |
| Test stage successful                        | ☐      |                  |
| Security stage successful                    | ☐      |                  |
| Code quality stage successful                | ☐      |                  |
| Docker build stage successful                | ☐      |                  |
| Trivy stage successful                       | ☐      |                  |
| Push stage successful                        | ☐      |                  |
| Deployment stage successful where applicable | ☐      |                  |

The actual pipeline execution should be used as evidence.

Do not mark a stage as successful simply because its YAML definition exists.

---

# 11. SonarCloud Verification

| Check                               | Status | Evidence / Notes |
| ----------------------------------- | ------ | ---------------- |
| SonarCloud account/project verified | ☐      |                  |
| Project configuration verified      | ☐      |                  |
| Pipeline integration verified       | ☐      |                  |
| Analysis completed                  | ☐      |                  |
| Quality Gate result verified        | ☐      |                  |
| Quality Gate passed where required  | ☐      |                  |

Review the actual SonarCloud analysis rather than relying only on pipeline configuration.

---

# 12. Trivy Verification

| Check                           | Status | Evidence / Notes |
| ------------------------------- | ------ | ---------------- |
| Trivy installation documented   | ☐      |                  |
| Filesystem scan documented      | ☐      |                  |
| Filesystem scan executed        | ☐      |                  |
| Docker image scan documented    | ☐      |                  |
| Docker image scan executed      | ☐      |                  |
| Trivy reports generated         | ☐      |                  |
| Security findings reviewed      | ☐      |                  |
| Pipeline security scan verified | ☐      |                  |

Example commands:

```bash
trivy fs .
```

and:

```bash
trivy image <image-name>:<tag>
```

Use the actual project image and configuration.

---

# 13. Argo CD Verification

| Check                              | Status | Evidence / Notes |
| ---------------------------------- | ------ | ---------------- |
| Argo CD installed                  | ☐      |                  |
| Argo CD accessible                 | ☐      |                  |
| Git repository connection verified | ☐      |                  |
| Application exists                 | ☐      |                  |
| Repository verified                | ☐      |                  |
| Revision verified                  | ☐      |                  |
| Application path verified          | ☐      |                  |
| Sync status verified               | ☐      |                  |
| Health status verified             | ☐      |                  |
| Managed resources verified         | ☐      |                  |
| GitOps drift checked               | ☐      |                  |
| Self-healing configuration checked | ☐      |                  |

Commands:

```bash
argocd app list
```

```bash
argocd app get <application-name>
```

```bash
argocd app resources <application-name>
```

Check for differences:

```bash
argocd app diff <application-name>
```

---

# 14. DevSecOps Verification

Verify the complete security-integrated workflow:

```text
Source Code
    ↓
Build
    ↓
Test
    ↓
SonarCloud
    ↓
Trivy
    ↓
Docker Image
    ↓
ACR
    ↓
AKS
    ↓
Argo CD
    ↓
Application
```

| Check                          | Status | Evidence / Notes |
| ------------------------------ | ------ | ---------------- |
| Source control verified        | ☐      |                  |
| Automated build verified       | ☐      |                  |
| Tests verified                 | ☐      |                  |
| SonarCloud verified            | ☐      |                  |
| Trivy verified                 | ☐      |                  |
| Container build verified       | ☐      |                  |
| ACR push verified              | ☐      |                  |
| Kubernetes deployment verified | ☐      |                  |
| Argo CD verified               | ☐      |                  |

---

# 15. Security and Secrets Verification

| Check                                        | Status | Evidence / Notes |
| -------------------------------------------- | ------ | ---------------- |
| No passwords committed                       | ☐      |                  |
| No API keys committed                        | ☐      |                  |
| No access tokens committed                   | ☐      |                  |
| No private keys committed                    | ☐      |                  |
| Secret values not exposed in documentation   | ☐      |                  |
| Secret values not exposed in screenshots     | ☐      |                  |
| Azure service connections used appropriately | ☐      |                  |
| Pipeline secrets protected                   | ☐      |                  |
| Kubernetes Secret values protected           | ☐      |                  |

Search for obvious hard-coded credentials:

```bash
git grep -n -i \
  -E "password=|passwd=|secret=|token=|api[_-]?key="
```

Every result must be reviewed manually.

---

# 16. Documentation Verification

Verify all BUILD-JOURNEY sections:

| Section               | Status |
| --------------------- | ------ |
| 01-prerequisites      | ☐      |
| 02-github             | ☐      |
| 03-application        | ☐      |
| 04-docker             | ☐      |
| 05-azure              | ☐      |
| 06-kubernetes         | ☐      |
| 07-kustomize          | ☐      |
| 08-azure-devops       | ☐      |
| 09-sonarcloud         | ☐      |
| 10-trivy              | ☐      |
| 11-argocd             | ☐      |
| 12-devsecops          | ☐      |
| 13-documentation      | ☐      |
| 14-troubleshooting    | ☐      |
| 15-final-verification | ☐      |

Verify:

```bash
find docs/week-4/BUILD-JOURNEY \
  -maxdepth 2 \
  -type f \
  | sort
```

---

# 17. Troubleshooting Documentation Verification

Verify that the troubleshooting section contains:

```text
14-troubleshooting/
├── 01-github-issues.md
├── 02-docker-issues.md
├── 03-azure-issues.md
├── 04-kubernetes-issues.md
├── 05-pipeline-issues.md
├── 06-argocd-issues.md
└── 07-common-recovery.md
```

Check:

```bash
find docs/week-4/BUILD-JOURNEY/14-troubleshooting \
  -maxdepth 1 \
  -type f \
  | sort
```

Each troubleshooting document should provide:

* Problem.
* Possible cause.
* Diagnostic command.
* Corrective action.
* Verification step.

---

# 18. Final Verification Documentation

Verify:

```text
15-final-verification/
├── 01-end-to-end-verification.md
├── 02-production-verification.md
├── 03-reproducibility-check.md
└── 04-project-completion-checklist.md
```

Check:

```bash
find docs/week-4/BUILD-JOURNEY/15-final-verification \
  -maxdepth 1 \
  -type f \
  | sort
```

---

# 19. Evidence Verification

Search for screenshots:

```bash
find . \
  -type f \
  \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) \
  | sort
```

Verify that documentation references point to files that actually exist.

Search image references:

```bash
grep -R "screenshots/" \
  docs/week-4/BUILD-JOURNEY \
  --include="*.md"
```

Every important screenshot reference should be checked.

---

# 20. Broken Documentation Reference Check

Search for Markdown references:

```bash
grep -R "\](.*\.md" \
  docs/week-4/BUILD-JOURNEY \
  --include="*.md"
```

Review references and verify that referenced files exist.

Also check for:

* Incorrect folder names.
* Incorrect filenames.
* Old numbering.
* Old resource names.
* Old image paths.
* Incorrect URLs.

---

# 21. FlavorForge Resource Consistency

Verify the important Week 4 resource names:

```text
Resource Group:
flavorforge-rg

ACR:
flavorforgeacr2026ms

ACR Login Server:
flavorforgeacr2026ms.azurecr.io

AKS:
flavorforge-aks
```

Search the repository:

```bash
grep -R "flavorforge-rg" . --exclude-dir=.git
```

```bash
grep -R "flavorforgeacr2026ms" . --exclude-dir=.git
```

```bash
grep -R "flavorforge-aks" . --exclude-dir=.git
```

Review unexpected results.

---

# 22. Week 3 / Week 4 Separation

Confirm that Week 3 Azure VM information has not accidentally been documented as FlavorForge Week 4 infrastructure.

FlavorForge Week 4:

```text
Resource Group: flavorforge-rg
Region: East US
ACR: flavorforgeacr2026ms
AKS: flavorforge-aks
```

Week 3 VM resources are separate and must not be used as FlavorForge production evidence.

This check is important because both activities used Azure but represent different environments.

---

# 23. Image Reference Consistency

Search deployment configuration:

```bash
grep -R "image:" . \
  --include="*.yaml" \
  --include="*.yml"
```

Verify the relationship:

```text
Local Docker Image
       ↓
ACR Image
       ↓
Kubernetes Image
       ↓
Argo CD Desired State
       ↓
Running Pod
```

Pay particular attention to image tags.

The project has previously used different image tags in different contexts.

Therefore:

> **Do not change image tags simply to make the documentation appear consistent. Verify the actual deployed image and document the intentional configuration.**

---

# 24. Git Final State

Before completion:

```bash
git status
```

Review:

```bash
git status --short
```

Review the final changes:

```bash
git diff
```

If changes are intentional:

```bash
git add .
```

Review staged changes:

```bash
git diff --cached
```

Only commit after reviewing the changes.

---

# 25. Final Commit Verification

Review the latest commit:

```bash
git log --oneline -5
```

Verify the working tree again:

```bash
git status
```

The final repository should have no unintended uncommitted changes.

---

# 26. Final Completion Matrix

| Area                    | Completed | Evidence Available | Notes |
| ----------------------- | --------- | ------------------ | ----- |
| GitHub                  | ☐         | ☐                  |       |
| Application             | ☐         | ☐                  |       |
| Docker                  | ☐         | ☐                  |       |
| Azure                   | ☐         | ☐                  |       |
| ACR                     | ☐         | ☐                  |       |
| AKS                     | ☐         | ☐                  |       |
| Kubernetes              | ☐         | ☐                  |       |
| Kustomize               | ☐         | ☐                  |       |
| Azure DevOps            | ☐         | ☐                  |       |
| SonarCloud              | ☐         | ☐                  |       |
| Trivy                   | ☐         | ☐                  |       |
| Argo CD                 | ☐         | ☐                  |       |
| DevSecOps               | ☐         | ☐                  |       |
| Documentation           | ☐         | ☐                  |       |
| Troubleshooting         | ☐         | ☐                  |       |
| End-to-End Verification | ☐         | ☐                  |       |
| Production Verification | ☐         | ☐                  |       |
| Reproducibility Review  | ☐         | ☐                  |       |

---

# 27. Final Project Acceptance Criteria

The FlavorForge project should be considered complete only when:

* [ ] Source code is available in GitHub.
* [ ] Application build is verified.
* [ ] Docker configuration is verified.
* [ ] Docker image is verified.
* [ ] Azure resources are verified.
* [ ] ACR is verified.
* [ ] AKS is verified.
* [ ] Kubernetes workloads are verified.
* [ ] Kustomize configuration is verified.
* [ ] Azure DevOps pipeline is verified.
* [ ] SonarCloud integration is verified.
* [ ] Trivy scanning is verified.
* [ ] Argo CD is verified.
* [ ] GitOps synchronization is verified.
* [ ] Application health is verified.
* [ ] Security configuration is reviewed.
* [ ] Documentation is complete.
* [ ] Troubleshooting documentation is complete.
* [ ] Final verification documents are complete.
* [ ] Evidence references are valid.
* [ ] No unintended secrets are committed.
* [ ] No unintended Week 3/Week 4 resource mixing exists.
* [ ] Final Git state is reviewed.

---

# 28. Final Status

Complete this section only after performing the final verification.

```text
Project:
FlavorForge Azure DevSecOps Capstone

Overall Status:
____________________________

Verification Date:
____________________________

Verified By:
____________________________
```

Possible overall statuses:

```text
PASS
PASS WITH MINOR NOTES
PARTIAL
BLOCKED
NOT VERIFIED
```

---

# 29. Final Notes

Record any remaining limitations, known issues, or items that were not independently reproduced.

Example:

```text
Remaining Items:

1. __________________________________________

2. __________________________________________

3. __________________________________________
```

Do not hide known limitations simply to achieve a `PASS` status.

---

# 30. Project Completion Statement

Use the following statement only after the checklist has been completed:

> The FlavorForge Azure DevSecOps project has been reviewed across source control, application build, containerization, Azure infrastructure, Kubernetes, Kustomize, Azure DevOps, SonarCloud, Trivy, Argo CD, GitOps, troubleshooting, documentation, and final verification.
>
> The final project status is based on actual verification evidence available in the repository and associated project services.
>
> Any items that were not independently reproduced or could not be verified are explicitly documented rather than assumed to be successful.

---

# 31. Final Principle

The final checklist exists to answer one question:

> **Is the FlavorForge project complete, verifiable, documented, and reproducible based on evidence?**

The answer should be determined by the verification results — not by the number of documents created.

```text
Implementation
      +
Configuration
      +
Security
      +
Deployment
      +
GitOps
      +
Documentation
      +
Evidence
      ↓
FlavorForge Project Completion
```