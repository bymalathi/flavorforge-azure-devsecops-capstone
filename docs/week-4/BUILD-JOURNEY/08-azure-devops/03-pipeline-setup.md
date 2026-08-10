# 03 — Azure DevOps Pipeline Setup

## 1. What We Wanted

After creating the Azure DevOps project and service connections, we connected the existing FlavorForge repository to an Azure DevOps YAML pipeline.

The pipeline definition already exists in the FlavorForge repository as:

```text
azure-pipelines.yml
```

The intended pipeline flow was:

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
  ↓
DeployDev
  ↓
DeployQA
  ↓
DeployProd
```

---

## 2. Verify the Pipeline File in the Repository

Before creating the pipeline in Azure DevOps, we verified that the pipeline YAML file existed in the FlavorForge repository.

From the FlavorForge repository root:

```bash
ls
```

The repository contained:

```text
azure-pipelines.yml
```

The relevant repository structure was:

```text
flavorforge-azure-devsecops-capstone/
├── frontend/
├── backend/
├── docker/
├── kubernetes/
├── azure-pipelines.yml
└── ...
```

### Evidence

The repository structure was captured during the Azure DevOps release simulation work.

![FlavorForge repository structure](/screenshots/enterprise-azure-devops-release-simulation/20-tree-l-2.png)

---

## 3. Open Azure DevOps Pipelines

We opened the FlavorForge project in Azure DevOps and went to:

```text
Azure DevOps
    ↓
FlavorForge Project
    ↓
Pipelines
```

The pipeline configuration was created from the existing repository YAML file.

### Evidence

![Azure DevOps Pipelines](/screenshots/pipeline/1-azure-devops-organizations.png)

---

## 4. Create the Pipeline

From Azure DevOps:

```text
Pipelines
    ↓
New Pipeline
```

The repository containing FlavorForge was selected as the pipeline source.

The pipeline was configured to use the existing YAML definition instead of manually recreating every pipeline stage through the Azure DevOps UI.

### Evidence

![Create new Azure DevOps pipeline](/screenshots/pipeline/5-click-new-pipeline.png)

---

## 5. Select the FlavorForge Repository

The FlavorForge repository was selected as the source repository for the pipeline.

The source relationship became:

```text
FlavorForge Repository
        ↓
azure-pipelines.yml
        ↓
Azure DevOps Pipeline
```

The YAML file remained version-controlled in Git together with the application.

---

## 6. Load `azure-pipelines.yml`

Azure DevOps was configured to use:

```text
azure-pipelines.yml
```

from the repository root.

The pipeline definition contains the stages required for the FlavorForge CI/CD process.

The repository therefore remained the source of truth for the pipeline configuration.

### Evidence

![Azure DevOps pipeline configuration](/screenshots/pipeline/6-pipelines-run.png)

---

## 7. Verify the Pipeline Definition

After connecting the repository, the pipeline definition was loaded by Azure DevOps.

The pipeline contained the major stages used by FlavorForge:

```text
Build
Test
Security
CodeQuality
DockerBuild
Publish
TrivyScan
DeployDev
DeployQA
DeployProd
```

The pipeline was then saved and executed.

---

## 8. Run the Pipeline

The pipeline was started from:

```text
Azure DevOps
    ↓
Pipelines
    ↓
FlavorForge Pipeline
    ↓
Run pipeline
```

A pipeline run was created.

The run provided the execution history for the FlavorForge CI/CD workflow.

### Evidence

![Azure DevOps pipeline run](/screenshots/pipeline/13-pipelines-run.png)

---

## 9. Verify the Build and Test Execution

The pipeline execution was checked to confirm that the application build and test stages were being executed.

The flow was:

```text
Source Code
    ↓
Build
    ↓
Test
    ↓
Next Pipeline Stage
```

The backend Jest tests were part of the pipeline test process.

### Evidence

![Pipeline test execution](/screenshots/pipeline/7-test.png)

---

## 10. Verify a Successful Pipeline Run

After the pipeline execution completed successfully, the run status was checked in Azure DevOps.

The successful run confirmed that the configured pipeline stages could execute through the pipeline.

### Evidence

![Successful Azure DevOps pipeline run](/screenshots/pipeline/8-pipelines-run-pass.png)

---

## 11. Verify the Advanced Pipeline Run

The pipeline execution was also verified through the more detailed pipeline run view.

This provided evidence of the pipeline progressing through the configured CI/CD workflow.

### Evidence

![Advanced pipeline run verification](/screenshots/pipeline/9-advance-pipelines-run-pass.png)

---

## 12. Build Stage

The FlavorForge pipeline uses Node.js `22.x` for the application build.

The build flow is:

```text
FlavorForge Source Code
        ↓
Node.js 22.x
        ↓
Application Build
```

The frontend and backend are then available for the following pipeline stages.

---

## 13. Test Stage

The pipeline executes the configured application tests after the build.

For the backend, the project contains Jest tests under:

```text
backend/tests/
```

The test flow is:

```text
Build
  ↓
Jest Tests
  ↓
Test Result
```

A successful test stage allows the pipeline to continue.

---

## 14. Security and Code Quality Stages

The pipeline contains security and code-quality checks before the Docker deployment process.

The relevant flow is:

```text
Build
   ↓
Test
   ↓
Security
   ↓
CodeQuality
```

The `CodeQuality` stage integrates with the SonarCloud service connection configured earlier.

The configured connection is:

```text
flavorforge-sonarcloud-sc
```

---

## 15. Docker Build Stage

After the application validation stages, the pipeline builds the FlavorForge Docker images.

FlavorForge uses separate images for:

```text
Frontend
Backend
```

The pipeline therefore follows:

```text
Frontend Source
      ↓
Frontend Docker Image

Backend Source
      ↓
Backend Docker Image
```

---

## 16. Image Tag

The pipeline uses the Azure DevOps build ID as the image tag:

```text
$(Build.BuildId)
```

The image versioning flow is:

```text
Azure DevOps Build
        ↓
Build.BuildId
        ↓
Docker Image Tag
        ↓
Frontend / Backend Images
```

This allows images generated by different pipeline runs to be distinguished.

---

## 17. Publish Images to ACR

After the Docker images are built, they are published to the FlavorForge Azure Container Registry.

The registry is:

```text
flavorforgeacr2026ms
```

The flow is:

```text
Docker Build
     ↓
Frontend Image
Backend Image
     ↓
ACR Authentication
     ↓
flavorforgeacr2026ms
```

The ACR service connection configured earlier is used for registry authentication.

### Evidence

The Azure DevOps release simulation captured the images available in ACR.

![FlavorForge frontend image in ACR](/screenshots/enterprise-azure-devops-release-simulation/13-1-acr-flavorforge-frontend.png)

![FlavorForge backend image in ACR](/screenshots/enterprise-azure-devops-release-simulation/13-acr-flavorforge-backend.png)

---

## 18. Trivy Scan

The pipeline includes a Trivy security scanning stage after the Docker image publishing process.

The flow is:

```text
Docker Image
     ↓
Trivy Scan
     ↓
Security Result
```

This adds container-image vulnerability scanning to the CI/CD process.

---

## 19. Deploy Dev

After the build, test, security, Docker and image-publishing stages, the pipeline moves to the development deployment stage.

The deployment target is the FlavorForge AKS cluster:

```text
Resource Group:
flavorforge-rg

AKS Cluster:
flavorforge-aks
```

The deployment flow is:

```text
Azure DevOps
      ↓
Deploy Dev
      ↓
AKS
      ↓
FlavorForge Dev Workloads
```

---

## 20. Deploy QA

After the Dev deployment stage, the pipeline continues to the QA deployment stage.

The Kubernetes configuration for QA is maintained in:

```text
kubernetes/overlays/qa/
```

The flow is:

```text
Azure DevOps
      ↓
Deploy QA
      ↓
Kustomize QA Overlay
      ↓
AKS
      ↓
QA Workloads
```

---

## 21. Deploy Prod

The production deployment stage uses the Production Kubernetes configuration maintained in:

```text
kubernetes/overlays/prod/
```

The flow is:

```text
Azure DevOps
      ↓
Deploy Prod
      ↓
Kustomize Prod Overlay
      ↓
AKS
      ↓
Production Workloads
```

The Azure DevOps release simulation also contained separate Dev, QA and Prod environment views.

### Evidence

![Dev, QA and Prod environments](/screenshots/enterprise-azure-devops-release-simulation/1-2-dev-qa-prod-azure-devops-environments.png)

---

## 22. Verify Azure DevOps Environments

The Azure DevOps environment configuration was verified for the deployment flow.

The environments represented:

```text
Dev
QA
Prod
```

This provided the environment structure used for the FlavorForge deployment stages.

### Evidence

![Azure DevOps environments](/screenshots/enterprise-azure-devops-release-simulation/1-1-dev-azure-devops-environments.png)

---

## 23. Verify Pipeline Execution

The completed pipeline execution was checked from:

```text
Azure DevOps
    ↓
Pipelines
    ↓
Runs
```

The pipeline run provided evidence of the CI/CD workflow executing successfully.

The overall flow was:

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
  ↓
DeployDev
  ↓
DeployQA
  ↓
DeployProd
```

### Evidence

![Final Azure DevOps pipeline](/screenshots/enterprise-azure-devops-release-simulation/14-final-azure-pipeline.png)

---

## 24. FlavorForge Pipeline Flow

At this stage, the complete pipeline relationship was:

```text
GitHub
   ↓
FlavorForge Repository
   ↓
azure-pipelines.yml
   ↓
Azure DevOps
   ↓
Build
   ↓
Test
   ↓
Security
   ↓
SonarCloud
   ↓
Docker Build
   ↓
ACR
   ↓
Trivy
   ↓
AKS
   ↓
Dev
   ↓
QA
   ↓
Prod
```

The Azure DevOps pipeline therefore connected the application source code with the automated build, security, image publishing and Kubernetes deployment process.

---

## 25. What We Actually Achieved

The FlavorForge repository was successfully connected to an Azure DevOps YAML pipeline.

The pipeline configuration was stored in:

```text
azure-pipelines.yml
```

The pipeline connected:

```text
FlavorForge Repository
        ↓
Azure DevOps
        ↓
Build / Test
        ↓
Security / Code Quality
        ↓
Docker Build
        ↓
Azure Container Registry
        ↓
Trivy Scan
        ↓
AKS
        ↓
Dev / QA / Prod
```

The Azure DevOps pipeline was now ready for the next configuration step: defining and verifying the variables used by the pipeline.

---

## 26. Result

The FlavorForge Azure DevOps pipeline was created from the repository's `azure-pipelines.yml` and successfully executed through Azure DevOps.

Evidence was captured for:

```text
Azure DevOps project
Pipeline creation
Pipeline execution
Test execution
Successful pipeline run
ACR images
Dev / QA / Prod environments
Final pipeline
```

The next document is:

```text
docs/week-4/BUILD-JOURNEY/08-azure-devops/04-pipeline-variables.md
```
