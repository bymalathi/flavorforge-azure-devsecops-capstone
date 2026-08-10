# 07 — Trivy Scan

## 1. What We Wanted

After the FlavorForge Docker images were built and published, the next pipeline step was to scan the container images for security vulnerabilities.

The pipeline flow was:

```text
Docker Build
      ↓
Publish
      ↓
Trivy Scan
      ↓
Deploy Dev
```

The Trivy scan was part of the Azure DevOps pipeline before the deployment stages.

---

## 2. Run the FlavorForge Pipeline

The Trivy scan was executed as part of the Azure DevOps pipeline.

From the FlavorForge project:

```text
Azure DevOps
    ↓
Pipelines
    ↓
FlavorForge Pipeline
    ↓
Run pipeline
```

The pipeline then progressed through the configured stages.

```text
Build
  ↓
Test
  ↓
Security
  ↓
CodeQuality
  ↓
DockerBuild
  ↓
Publish
  ↓
TrivyScan
```

### Evidence

![FlavorForge pipeline run](/screenshots/pipeline/13-pipelines-run.png)

---

## 3. Reach the Trivy Scan Stage

After the Docker images were built and published, the pipeline reached:

```text
TrivyScan
```

The purpose of this stage was to scan the container images produced by the FlavorForge pipeline.

The flow was:

```text
FlavorForge Docker Images
        ↓
TrivyScan
        ↓
Vulnerability Results
```

---

## 4. Verify the Pipeline Stage

The pipeline run was opened in Azure DevOps:

```text
Pipelines
    ↓
Runs
    ↓
FlavorForge pipeline run
```

The pipeline stages were checked to confirm that the Trivy scanning stage was included in the execution.

### Evidence

![Azure DevOps pipeline stages](/screenshots/pipeline/9-advance-pipelines-run-pass.png)

---

## 5. Verify the Docker Images Used by the Pipeline

The Docker images used by the pipeline were the FlavorForge frontend and backend images published to ACR.

The registry was:

```text
flavorforgeacr2026ms
```

The image flow was:

```text
Frontend Image ──┐
                 ├──→ ACR ──→ TrivyScan
Backend Image ───┘
```

### Evidence

![ACR images](/screenshots/azure/25-acr-images.png)

---

## 6. What Happened

The pipeline executed the Trivy scanning stage after the Docker publishing stage.

The resulting pipeline flow was:

```text
DockerBuild
     ↓
Publish
     ↓
TrivyScan
     ↓
DeployDev
```

This placed container-image security scanning before the application was moved into the deployment stages.

---

## 7. Result

The FlavorForge Azure DevOps pipeline included the Trivy container-image scanning stage.

The completed flow was:

```text
Source Code
    ↓
Build
    ↓
Test
    ↓
Security
    ↓
CodeQuality
    ↓
DockerBuild
    ↓
Publish
    ↓
TrivyScan
    ↓
DeployDev
```

The next stage was:

```text
docs/week-4/BUILD-JOURNEY/08-azure-devops/08-deploy-dev.md
```

This documents how the FlavorForge pipeline deployed the application to the Dev environment.
