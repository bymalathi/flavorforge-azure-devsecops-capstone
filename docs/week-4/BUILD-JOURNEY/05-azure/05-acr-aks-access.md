# 05 — ACR → AKS Access

## 1. Purpose

After creating Azure Container Registry (ACR) and Azure Kubernetes Service (AKS), the next step was to allow the AKS cluster to access the container images stored in ACR.

The overall Azure container workflow is:

```text
FlavorForge Source Code
        ↓
Docker Build
        ↓
Docker Images
        ↓
Azure Container Registry
        ↓
AKS Access to ACR
        ↓
Kubernetes Pods
```

This access is required because Kubernetes needs to pull the FlavorForge frontend and backend images from ACR when creating application pods.

---

## 2. Why ACR → AKS Access Is Required

ACR and AKS have different responsibilities.

```text
Azure Container Registry
        ↓
Stores container images
```

while:

```text
Azure Kubernetes Service
        ↓
Runs containers as Kubernetes workloads
```

When AKS creates a pod using an image stored in ACR, the cluster needs permission to access the registry.

The required flow is:

```text
AKS
 │
 │ request container image
 ▼
Azure Container Registry
 │
 │ return image
 ▼
AKS
 │
 ▼
Kubernetes Pod
```

Without this access, Kubernetes may not be able to pull private images from ACR.

---

## 3. FlavorForge ACR

The FlavorForge Azure Container Registry is:

```text
flavorforgeacr2026ms
```

The registry contains the Docker images required by the application.

The repository contains evidence that the images were available in ACR:

![](/screenshots/azure/09-verify-images-in-acr.png)

The ACR image listing provides evidence that the container images were successfully published to Azure Container Registry.

---

## 4. Images Published to ACR

The Docker images created during the Docker stage were tagged for the Azure Container Registry and pushed to ACR.

The image workflow was:

```text
Local Docker Image
        ↓
ACR-compatible image tag
        ↓
Azure Container Registry
        ↓
Stored image
```

The Docker images were also inspected during the workflow:

![](/screenshots/docker/13.1-Docker%20Images.png)

The ACR image verification was:

![](/screenshots/azure/09-verify-images-in-acr.png)

This established the container images that AKS would later consume.

---

## 5. ACR Login Verification

The Azure Container Registry login process was verified during the workflow.

The ACR login allowed the local Docker environment to authenticate with the FlavorForge registry.

The repository contains ACR authentication evidence from the Azure workflow.

The distinction is important:

```text
Local Docker
     ↓
ACR authentication
     ↓
Push / access images
```

This verifies registry access from the local environment.

---

## 6. AKS Access to ACR

The AKS cluster was configured so that it could access the images stored in the FlavorForge ACR.

The architecture is:

```text
                    Azure
                      │
          ┌───────────┴───────────┐
          │                       │
          ▼                       ▼
        ACR                      AKS
          │                       │
          │ Docker Images         │
          │                       │
          └───────────┬───────────┘
                      │
                 Image Access
                      │
                      ▼
                Kubernetes Pods
```

This allows Kubernetes workloads to use the application images stored in the private Azure Container Registry.

---

## 7. Managed Identity Relationship

The FlavorForge AKS environment used Azure identity-based access to the container registry.

The important concept is:

```text
AKS Managed Identity
        ↓
Permission to access ACR
        ↓
Pull container images
        ↓
Create Kubernetes Pods
```

This avoids requiring the application deployment to store a separate Docker registry username and password in the Kubernetes manifests.

The access relationship is therefore handled at the Azure infrastructure level.

---

## 8. Why Managed Identity Is Useful

Using Azure identity-based access provides a cleaner approach for private registry access.

Instead of:

```text
Kubernetes
    ↓
Hard-coded registry username/password
    ↓
ACR
```

the infrastructure can use:

```text
AKS
    ↓
Azure Managed Identity
    ↓
Authorized ACR access
    ↓
Container image
```

This reduces the need to place registry credentials directly into application deployment configuration.

---

## 9. Verify ACR Images

The ACR images were verified after they were published.

![](/screenshots/azure/09-verify-images-in-acr.png)

The images were also inspected through the Azure Portal:

![](/screenshots/azure/25-acr-images.png)

These provide evidence that the container images were available inside Azure Container Registry.

The important distinction is:

```text
Docker image exists locally
        ↓
Image pushed to ACR
        ↓
Image visible in ACR
        ↓
AKS can use the image
```

---

## 10. ACR Image Tagging

The project used registry-qualified image tags so that Docker images could be pushed to the FlavorForge Azure Container Registry.

The conceptual workflow is:

```text
Local Image
     ↓
Registry-qualified tag
     ↓
ACR Repository
     ↓
Image available to AKS
```

Tagging is important because Kubernetes deployments reference container images using registry-qualified image names.

---

## 11. Connection Between Docker, ACR and AKS

At this point, the complete container image flow becomes:

```text
Developer
    ↓
Dockerfile
    ↓
Docker Image
    ↓
ACR
    ↓
AKS
    ↓
Kubernetes Deployment
    ↓
Pod
```

For FlavorForge:

```text
Frontend Docker Image
        ↓
Azure Container Registry
        ↓
AKS
        ↓
Frontend Pod
```

and:

```text
Backend Docker Image
        ↓
Azure Container Registry
        ↓
AKS
        ↓
Backend Pod
```

---

## 12. Why This Step Matters

This step connects the two major Azure services used by FlavorForge:

```text
ACR = Image Storage
AKS = Container Orchestration
```

The relationship can be visualized as:

```text
             FlavorForge
                  │
                  ▼
             Docker Images
                  │
                  ▼
          Azure Container Registry
                  │
                  │ image access
                  ▼
       Azure Kubernetes Service
                  │
          ┌───────┴───────┐
          ▼               ▼
    Frontend Pod      Backend Pod
```

This is the foundation for the Kubernetes deployment that follows.

---

## 13. What We Actually Achieved

At the end of this stage:

* FlavorForge Docker images were available in ACR.
* ACR image availability was verified.
* The AKS environment had access to the container registry.
* Azure identity-based access was used for the AKS-to-ACR relationship.
* The environment was ready to deploy Kubernetes workloads using the ACR images.

The resulting flow was:

```text
Docker Images
      ↓
Azure Container Registry
      ↓
AKS Registry Access
      ↓
Kubernetes Workloads
```

---

## 14. Important Learning

The key concept to remember is:

> **ACR stores the images; AKS runs the images.**

For example:

```text
ACR
 │
 ├── FlavorForge frontend image
 │
 └── FlavorForge backend image
```

Then:

```text
AKS
 │
 ├── Frontend Deployment
 │       ↓
 │   Frontend Pods
 │
 └── Backend Deployment
         ↓
     Backend Pods
```

AKS needs access to ACR so that the Kubernetes workloads can pull those private images.

---

## 15. Evidence Available in the Repository

The main ACR evidence used in this stage includes:

### ACR image verification

![](/screenshots/azure/09-verify-images-in-acr.png)

### ACR images in Azure Portal

![](/screenshots/azure/25-acr-images.png)

### Docker images

![](/screenshots/docker/13.1-Docker%20Images.png)

The earlier Azure ACR document contains the provider-registration and ACR-creation evidence.

Together, these provide supporting evidence for:

```text
Docker Images
        ↓
ACR Authentication
        ↓
Image Publishing
        ↓
Images Available in ACR
        ↓
AKS Access
```

---

## 16. Azure Stage Progress

The Azure BUILD-JOURNEY now looks like:

```text
01 — Azure Account & CLI
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

The next document is:

```text
docs/week-4/BUILD-JOURNEY/05-azure/06-azure-verification.md
```

This will bring together the Azure Resource Group, ACR, AKS, registry access, and Kubernetes connectivity evidence to verify that the complete Azure infrastructure stage was working.
