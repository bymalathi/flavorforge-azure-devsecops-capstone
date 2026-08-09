# 03 — Azure Container Registry (ACR)

## 1. Purpose

After creating the Azure Resource Group, the next step in the FlavorForge Azure infrastructure journey was to create an **Azure Container Registry (ACR)**.

Azure Container Registry was used to store the Docker images required by the FlavorForge application.

The overall flow was:

```text
FlavorForge Application
        ↓
Docker Images
        ↓
Azure Container Registry
        ↓
Container Images
        ↓
AKS
```

The ACR used by FlavorForge was:

```text
flavorforgeacr2026ms
```

It was associated with:

```text
Resource Group: flavorforge-rg
Region: East US
```

---

# 2. Why FlavorForge Needed ACR

During the Docker stage, the frontend and backend were packaged as separate Docker images.

Conceptually:

```text
Frontend Source
      ↓
frontend/Dockerfile
      ↓
Frontend Docker Image
```

and:

```text
Backend Source
      ↓
backend/Dockerfile
      ↓
Backend Docker Image
```

These images needed to be stored in a registry that could be accessed by the Azure deployment environment.

Azure Container Registry provided that central image repository.

The resulting workflow was:

```text
Local Docker Images
        ↓
Azure Container Registry
        ↓
Azure Kubernetes Service
        ↓
Kubernetes Pods
```

---

# 3. FlavorForge ACR

The Azure Container Registry used by FlavorForge was:

```text
ACR Name:
flavorforgeacr2026ms
```

It was associated with:

```text
Resource Group:
flavorforge-rg
```

and:

```text
Region:
East US
```

The high-level Azure structure was:

```text
Azure Subscription
        │
        ▼
flavorforge-rg
        │
        ├── flavorforgeacr2026ms
        │
        └── flavorforge-aks
```

The AKS resource is documented in the following stage.

---

# 4. Register the Container Registry Resource Provider

Before creating the registry, the required Azure Container Registry resource provider was registered.

Existing project evidence:

![](/screenshots/azure/03-containerregistry-provider-registered.png)

This provided evidence that the Azure subscription was prepared to work with Azure Container Registry resources.

The important point for the BUILD-JOURNEY is that the provider registration was completed before the registry was created.

---

# 5. Create the Azure Container Registry

The FlavorForge Azure Container Registry was created as part of the Azure infrastructure setup.

The resulting registry was:

```text
flavorforgeacr2026ms
```

Existing repository evidence documents the registry creation.

The registry belonged to:

```text
flavorforge-rg
```

and was created in:

```text
East US
```

The relationship was:

```text
Azure
  │
  ▼
flavorforge-rg
  │
  ▼
flavorforgeacr2026ms
```

---

# 6. Verify the Container Registry

The registry could be verified through Azure.

A CLI verification command is:

```bash
az acr show \
  --name flavorforgeacr2026ms \
  --resource-group flavorforge-rg
```

A simpler table view can also be used:

```bash
az acr list --output table
```

The expected registry is:

```text
flavorforgeacr2026ms
```

These commands are verification commands and should not be confused with the original registry creation step.

---

# 7. Authenticate Docker with ACR

After the registry was available, Docker was authenticated with the FlavorForge ACR.

The standard Azure CLI command is:

```bash
az acr login --name flavorforgeacr2026ms
```

The project contains evidence of successful ACR authentication.

The purpose of this step was to allow Docker to interact with the Azure Container Registry.

The relationship was:

```text
Local Docker
     │
     │ Authentication
     ▼
flavorforgeacr2026ms
```

---

# 8. Prepare Docker Images for ACR

The frontend and backend had already been built as Docker images during the Docker stage.

The local workflow was:

```text
Frontend
    ↓
frontend/Dockerfile
    ↓
Frontend Docker Image
```

and:

```text
Backend
    ↓
backend/Dockerfile
    ↓
Backend Docker Image
```

Before an image can be pushed to ACR, it must use an image reference that identifies the target registry and repository.

Conceptually:

```text
Local Docker Image
        ↓
Registry-qualified image reference
        ↓
Azure Container Registry
```

The exact image tags used during the FlavorForge implementation should be taken from the existing Docker/ACR evidence rather than reconstructed from memory.

This keeps the documentation reproducible and avoids claiming an exact command that was not recorded.

---

# 9. Push Images to ACR

After the images were prepared for the registry and Docker was authenticated, the application images were pushed to Azure Container Registry.

The conceptual workflow was:

```text
Local Docker Image
        ↓
ACR-qualified Image
        ↓
Docker Push
        ↓
flavorforgeacr2026ms
```

The important result was that the FlavorForge container images became available in ACR for use by the later AKS deployment.

Where the original push command is not directly available in the project evidence, this document intentionally describes the workflow rather than inventing an exact command.

---

# 10. Verify Images in ACR

The images stored in ACR were verified.

Existing evidence:

![](/screenshots/azure/09-verify-images-in-acr.png)

This confirmed that FlavorForge container images were available in the Azure Container Registry.

The verification flow was:

```text
Docker Images
      ↓
Push to ACR
      ↓
ACR Repository
      ↓
Verify Images
```

---

# 11. Verify ACR Images in Azure Portal

The ACR images were also inspected through the Azure Portal.

Existing evidence:

![](/screenshots/azure/25-acr-images.png)


This provides additional evidence that the container images were stored successfully in the registry.

The Portal view provides a visual confirmation of the registry contents.

---

# 12. ACR Repository Concept

The registry acts as the central storage location for the container images used by the application.

Conceptually:

```text
Azure Container Registry
        │
        ├── Frontend Image
        │
        └── Backend Image
```

The registry separates image storage from image execution.

ACR stores the images.

AKS later uses those images to create Kubernetes workloads.

---

# 13. Docker → ACR Workflow

The complete FlavorForge image publishing workflow can be represented as:

```text
FlavorForge Source Code
        ↓
Dockerfile
        ↓
Docker Build
        ↓
Local Docker Image
        ↓
Registry-qualified Image Reference
        ↓
Docker / ACR Authentication
        ↓
Push Image
        ↓
Azure Container Registry
        ↓
Verify Image
```

This connects the Docker stage with the Azure deployment stage.

---

# 14. ACR and AKS Relationship

The next major Azure component was Azure Kubernetes Service.

The relationship between ACR and AKS is:

```text
Local Docker
      │
      ▼
Azure Container Registry
flavorforgeacr2026ms
      │
      │ Container Images
      ▼
Azure Kubernetes Service
flavorforge-aks
      │
      ▼
Kubernetes Pods
```

ACR provides the image source.

AKS runs workloads based on those images.

The ACR → AKS access configuration is documented separately in:

```text
05 — ACR → AKS Access
```

This distinction is important because simply having an image in ACR does not by itself document how AKS obtains permission to pull it.

---

# 15. Why ACR Is Needed

An image stored only on the developer's local machine cannot be directly used as the image source for a cloud Kubernetes cluster.

The image needs to be available from a registry accessible to the cluster.

Therefore:

```text
Developer Machine
       │
       │ Docker Image
       ▼
Azure Container Registry
       │
       │ Image Pull
       ▼
AKS
       │
       ▼
Kubernetes Pod
```

This creates a clear separation between:

```text
Image Building
```

and:

```text
Image Deployment
```

Docker builds the image.

ACR stores the image.

AKS deploys workloads using the image.

---

# 16. ACR Verification Evidence

The existing repository contains evidence for the major ACR activities.

### Provider registration

![](/screenshots/azure/03-containerregistry-provider-registered.png)

### ACR creation

Existing Azure evidence documents the creation of:

```text
flavorforgeacr2026ms
```

### ACR authentication

Existing project evidence documents successful authentication to the registry.

### Image verification

![](/screenshots/azure/09-verify-images-in-acr.png)

### Azure Portal image verification

![](/screenshots/azure/25-acr-images.png)

Together, these provide evidence of the major ACR workflow:

```text
Provider Registration
        ↓
ACR Creation
        ↓
Authentication
        ↓
Image Publishing
        ↓
Image Verification
```

---

# 17. Important Reproducibility Note

The exact image tags used during the FlavorForge implementation should be taken from the captured project evidence and later pipeline configuration.

This document therefore does **not** invent a specific image tag or push command where the original evidence is not available.

This is intentional.

The BUILD-JOURNEY should distinguish between:

```text
What was actually recorded
```

and:

```text
What Docker/Azure supports in general
```

For example, the concept of tagging an image for ACR is valid:

```text
Local Image
     ↓
ACR-qualified Image
     ↓
Push
```

but the exact historical tag should only be documented when supported by the project's actual evidence.

---

# 18. What We Actually Achieved

At the end of this stage, FlavorForge had an Azure Container Registry:

```text
flavorforgeacr2026ms
```

associated with:

```text
flavorforge-rg
```

in:

```text
East US
```

The container image workflow was:

```text
FlavorForge Application
        ↓
Docker Images
        ↓
ACR Preparation
        ↓
ACR Authentication
        ↓
Image Push
        ↓
Image Verification
        ↓
Images Available in ACR
```

The container images were therefore available in Azure rather than being limited to the local Docker environment.

---

# 19. Important Learning

The important distinction between Docker, ACR, and AKS is:

```text
Docker
    ↓
Builds and runs containers
```

```text
Azure Container Registry
    ↓
Stores and distributes container images
```

```text
Azure Kubernetes Service
    ↓
Runs containerized workloads
```

The overall relationship is:

```text
Dockerfile
    ↓
Docker Image
    ↓
ACR
    ↓
AKS
    ↓
Kubernetes Pod
```

This distinction is important when explaining the FlavorForge architecture during the CBC demonstration or an interview.

---

# 20. ACR Stage Completed

The Azure BUILD-JOURNEY now follows:

```text
01 — Azure Account and CLI
        ↓
02 — Resource Group
        ↓
03 — Azure Container Registry
        ↓
04 — Azure Kubernetes Service
        ↓
05 — ACR → AKS Access
        ↓
06 — Azure Verification
```

The FlavorForge Azure Container Registry was created, authenticated, populated with the application container images, and verified.

The next document is:

```text
docs/week-4/BUILD-JOURNEY/05-azure/04-aks.md
```

This will document how the FlavorForge Azure Kubernetes Service cluster was created and verified.
