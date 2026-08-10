# 06 — Docker Image Build and Publish

## 1. What We Wanted

After the Build, Test, Security, and Code Quality stages, the next step in the FlavorForge pipeline was to build the application Docker images and publish them to Azure Container Registry.

FlavorForge uses two application images:

```text
Frontend
Backend
```

The pipeline flow was:

```text
FlavorForge Source Code
        ↓
Azure DevOps Pipeline
        ↓
Docker Build
        ↓
Frontend Image
Backend Image
        ↓
Azure Container Registry
        ↓
flavorforgeacr2026ms
```

The Docker images produced by this stage are the images used by the later AKS deployment stages.

---

# 2. FlavorForge Docker Images

The repository already contains separate Dockerfiles for the two application components:

```text
frontend/
└── Dockerfile

backend/
└── Dockerfile
```

The application structure is:

```text
FlavorForge
    │
    ├── frontend/
    │     └── Dockerfile
    │
    └── backend/
          └── Dockerfile
```

The Azure DevOps pipeline builds these as separate container images.

---

# 3. Docker Image Tag

The pipeline uses the Azure DevOps build ID as the image tag:

```text
$(Build.BuildId)
```

This gives each pipeline execution its own image tag.

The image flow is:

```text
Azure DevOps Build
        ↓
Build.BuildId
        ↓
Image Tag
        ↓
Frontend Image
Backend Image
```

This allows an image produced by a particular pipeline run to be identified later.

---

# 4. Build the Frontend Image

The frontend Docker image is built from the FlavorForge frontend application.

The source used by the pipeline is:

```text
frontend/
```

with:

```text
frontend/Dockerfile
```

The build flow is:

```text
frontend/
    ↓
Dockerfile
    ↓
Docker Build
    ↓
Frontend Container Image
```

The frontend image is then prepared for publishing to the FlavorForge ACR.

### Evidence

![Azure DevOps pipeline](/screenshots/pipeline/13-pipelines-run.png)

---

# 5. Build the Backend Image

The backend Docker image is built from:

```text
backend/
```

using:

```text
backend/Dockerfile
```

The flow is:

```text
backend/
    ↓
Dockerfile
    ↓
Docker Build
    ↓
Backend Container Image
```

The resulting backend image is prepared for publication to the same FlavorForge ACR.

---

# 6. FlavorForge Container Registry

The Azure Container Registry used by the project is:

```text
flavorforgeacr2026ms
```

The registry was created earlier in the Azure infrastructure stage.

The pipeline therefore publishes:

```text
Frontend Image
       ↓
flavorforgeacr2026ms

Backend Image
       ↓
flavorforgeacr2026ms
```

### Evidence

![ACR and Docker configuration](/screenshots/pipeline/10-acr-dockerhub.png)

---

# 7. Authenticate to the Registry

The Azure DevOps pipeline uses the configured ACR service connection when working with the container registry.

The service connection created earlier was:

```text
flavorforge-acr-connection
```

The relationship is:

```text
Azure DevOps Pipeline
        ↓
flavorforge-acr-connection
        ↓
Azure Container Registry
        ↓
flavorforgeacr2026ms
```

This keeps registry authentication outside the application source code.

### Evidence

![Azure DevOps service connections](/screenshots/pipeline/11-service-connections.png)

---

# 8. Publish the Frontend Image

After the frontend image is built, it is published to:

```text
flavorforgeacr2026ms
```

The resulting flow is:

```text
Frontend Source
      ↓
Frontend Dockerfile
      ↓
Frontend Docker Image
      ↓
ACR Authentication
      ↓
flavorforgeacr2026ms
```

The image is tagged using the pipeline build ID.

---

# 9. Publish the Backend Image

The backend follows the same pipeline process:

```text
Backend Source
      ↓
Backend Dockerfile
      ↓
Backend Docker Image
      ↓
ACR Authentication
      ↓
flavorforgeacr2026ms
```

The backend image is also tagged using the pipeline build ID.

---

# 10. Verify the Pipeline Publish Stage

The Azure DevOps pipeline run was checked after the Docker build and publish stages.

From Azure DevOps:

```text
Pipelines
    ↓
FlavorForge Pipeline
    ↓
Runs
    ↓
Open pipeline run
```

The pipeline run provides evidence that the Docker build and publishing stages were executed.

### Evidence

![FlavorForge pipeline run](/screenshots/pipeline/13-pipelines-run.png)

---

# 11. Verify ACR Access

The connection between the Azure DevOps pipeline and the Azure resources was also verified through the configured service connections.

The Azure DevOps environment contains the service connections required for the pipeline to access Azure resources and the container registry.

### Evidence

![ACR and AKS service connection](/screenshots/pipeline/12-acr-aks.png)

---

# 12. Docker Images in the FlavorForge Workflow

At this point, the CI/CD flow becomes:

```text
FlavorForge Repository
        ↓
Azure DevOps Pipeline
        ↓
Build
        ↓
Test
        ↓
Security
        ↓
Code Quality
        ↓
Docker Build
        ↓
Frontend Image
Backend Image
        ↓
Azure Container Registry
        ↓
Trivy Scan
        ↓
AKS Deployment
```

The Docker images therefore become the deployment artifacts for the Kubernetes stages.

---

# 13. Connection to Kubernetes

The published images are later consumed by the Kubernetes deployment configuration.

The overall relationship is:

```text
Azure DevOps
      ↓
Docker Build
      ↓
ACR
      ↓
Kubernetes Deployment
      ↓
FlavorForge Pods
```

The Kubernetes workloads use the container images stored in ACR rather than building the application again inside AKS.

---

# 14. What We Actually Achieved

The FlavorForge Azure DevOps pipeline was configured to build separate Docker images for:

```text
Frontend
Backend
```

The images were tagged using:

```text
$(Build.BuildId)
```

and published to:

```text
flavorforgeacr2026ms
```

The implementation flow was:

```text
Frontend Dockerfile ──┐
                      ├──→ Docker Build
Backend Dockerfile ───┘
                            ↓
                       Image Tag
                            ↓
                    ACR Authentication
                            ↓
                  flavorforgeacr2026ms
                            ↓
                     Trivy Scan
                            ↓
                       AKS Deploy
```

---

# 15. Result

The Docker publishing stage connected the application build process to the Azure Container Registry.

The result was:

```text
FlavorForge Source Code
        ↓
Azure DevOps
        ↓
Frontend + Backend Docker Images
        ↓
flavorforgeacr2026ms
        ↓
Images ready for later deployment stages
```

The next document is:

```text
docs/week-4/BUILD-JOURNEY/08-azure-devops/07-trivy-scan.md
```

This will document the Trivy container-image security scanning stage of the FlavorForge pipeline.
