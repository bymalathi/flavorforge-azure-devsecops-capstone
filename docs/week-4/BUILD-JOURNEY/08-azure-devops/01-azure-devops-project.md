# 01 — Azure DevOps Project

## 1. What We Wanted

After completing the Kubernetes and Kustomize configuration, the next step was to set up the Azure DevOps project for the FlavorForge CI/CD workflow.

The goal was to connect the existing FlavorForge GitHub repository to Azure DevOps and use Azure Pipelines for the build and deployment process.

The planned flow was:

```text
FlavorForge GitHub Repository
            ↓
      Azure DevOps
            ↓
      Azure Pipeline
            ↓
   Build / Test / Security
            ↓
       Docker Build
            ↓
            ACR
            ↓
            AKS
```

---

## 2. Open Azure DevOps

### What We Wanted

We needed an Azure DevOps organization and project where the FlavorForge pipeline could be configured.

### What We Did

Azure DevOps was opened and the existing organization was used to create/access the FlavorForge project.

### Screenshot / Evidence

![Azure DevOps Organization](/screenshots/pipeline/1-azure-devops-organizations.png)

### Result

The Azure DevOps organization was available and ready for the FlavorForge project.

---

## 3. Create the FlavorForge Azure DevOps Project

### What We Wanted

We needed a dedicated Azure DevOps project for the FlavorForge CI/CD implementation.

### What We Did

From Azure DevOps, the project was created/opened for the FlavorForge implementation.

The Azure DevOps project became the workspace for the pipeline configuration.

The project structure was:

```text
Azure DevOps Organization
        ↓
FlavorForge Project
        ↓
Pipeline
```

### Screenshot / Evidence

![Azure DevOps Project](/screenshots/enterprise-azure-devops-release-simulation/project.png)

### Result

The FlavorForge Azure DevOps project was available for the CI/CD setup.

---

## 4. Verify the FlavorForge Source Repository

### What We Wanted

The application source code was already maintained in the FlavorForge GitHub repository.

We wanted Azure DevOps to work with the existing repository rather than creating another application repository.

### What We Used

The local FlavorForge repository was:

```text
flavorforge-azure-devsecops-capstone
```

The repository already contained the Azure Pipeline configuration:

```text
azure-pipelines.yml
```

The repository also contained:

```text
argocd-pipeline.yml
```

### Verify Command

From the FlavorForge repository:

```bash
ls
```

The repository contained:

```text
azure-pipelines.yml
argocd-pipeline.yml
frontend/
backend/
docker/
kubernetes/
screenshots/
docs/
```

### Result

The FlavorForge source repository and Azure Pipeline configuration were present.

---

## 5. Connect the Repository to Azure DevOps Pipeline

### What We Wanted

The Azure DevOps pipeline needed access to the FlavorForge source code so that pipeline stages could build, test, scan, package, and deploy the application.

### What We Did

The Azure DevOps pipeline setup was started from the existing FlavorForge repository.

The pipeline source was connected to the FlavorForge project/repository.

### Screenshot / Evidence

![Create New Pipeline](/screenshots/pipeline/5-click-new-pipeline.png)

### Result

The Azure DevOps pipeline setup was ready to use the FlavorForge repository.

---

## 6. Verify the Pipeline Configuration File

### What We Wanted

We wanted to confirm that the pipeline configuration existed in the FlavorForge repository.

### Verify Command

From the repository root:

```bash
ls azure-pipelines.yml
```

### Expected Result

```text
azure-pipelines.yml
```

### Result

The Azure Pipelines configuration file was present in the FlavorForge repository.

---

## 7. FlavorForge Azure DevOps Pipeline Flow

The Azure DevOps project was then used as the CI/CD entry point for the existing FlavorForge implementation.

The resulting workflow was:

```text
GitHub
   ↓
FlavorForge Repository
   ↓
Azure DevOps
   ↓
Azure Pipeline
   ↓
Build
   ↓
Test
   ↓
Security / Code Quality
   ↓
Docker Build
   ↓
Publish to ACR
   ↓
Deploy to AKS
```

The pipeline configuration was maintained in:

```text
azure-pipelines.yml
```

---

## 8. Verify Azure DevOps Pipeline

### What We Wanted

We wanted to confirm that the Azure DevOps pipeline could be created and executed for FlavorForge.

### What We Did

The pipeline was created from the Azure DevOps project and a pipeline run was started.

### Screenshot / Evidence

![Pipeline Run](/screenshots/pipeline/6-pipelines-run.png)

### Result

The FlavorForge Azure Pipeline was available in Azure DevOps and a pipeline run was initiated.

---

## 9. Verify Pipeline Execution

### What We Wanted

After starting the pipeline, we needed to verify that the pipeline execution completed successfully.

### What We Did

The pipeline run was monitored from Azure DevOps.

### Screenshot / Evidence

![Pipeline Test](/screenshots/pipeline/7-test.png)

![Pipeline Run Passed](/screenshots/pipeline/8-pipelines-run-pass.png)

### Result

The pipeline execution completed successfully.

---

## 10. FlavorForge Azure DevOps Structure

At this stage, the implementation had the following structure:

```text
FlavorForge GitHub Repository
            │
            │
            ▼
     Azure DevOps Project
            │
            ▼
       Azure Pipeline
            │
            ├── Build
            ├── Test
            ├── Security
            ├── Code Quality
            ├── Docker Build
            ├── Publish
            ├── Trivy Scan
            └── Deployment
```

The pipeline stages were implemented in the existing:

```text
azure-pipelines.yml
```

---

## 11. What We Actually Achieved

The Azure DevOps project was established and connected to the FlavorForge CI/CD workflow.

At this point:

```text
FlavorForge Repository
        ↓
Azure DevOps Project
        ↓
Azure Pipeline
        ↓
Pipeline Execution
```

The pipeline could be executed from Azure DevOps.

The next step was to configure the Azure DevOps service connections required by the pipeline.

---

## 12. Next Step

The next document is:

```text
docs/week-4/BUILD-JOURNEY/08-azure-devops/02-service-connections.md
```

The next step will document the actual Azure DevOps service connections used by FlavorForge.
