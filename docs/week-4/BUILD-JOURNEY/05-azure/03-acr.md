# 03 — Azure Container Registry (ACR)

## 1. Purpose

After creating the Azure Resource Group, the next step in the FlavorForge Azure infrastructure journey was to create an **Azure Container Registry (ACR)**.

Azure Container Registry is used to store and manage the Docker images required by the FlavorForge application.

The overall flow is:

```text
FlavorForge Application
        ↓
Docker Images
        ↓
Azure Container Registry
        ↓
Backend / Frontend Images
        ↓
AKS
```

The ACR created for FlavorForge was:

```text
flavorforgeacr2026ms
```

It was created inside:

```text
flavorforge-rg
```

in:

```text
East US
```

---

# 2. Why FlavorForge Needed ACR

The application was first containerized locally using Docker.

The local workflow was:

```text
Frontend Source Code
        ↓
Frontend Dockerfile
        ↓
Frontend Docker Image
```

and:

```text
Backend Source Code
        ↓
Backend Dockerfile
        ↓
Backend Docker Image
```

These images then needed a central registry where they could be stored and later retrieved by the Azure Kubernetes Service (AKS) cluster.

ACR provides that registry.

The resulting architecture is:

```text
                    FlavorForge
                         │
              ┌──────────┴──────────┐
              │                     │
              ▼                     ▼
       Frontend Image         Backend Image
              │                     │
              └──────────┬──────────┘
                         │
                         ▼
              Azure Container Registry
                  flavorforgeacr2026ms
                         │
                         ▼
                        AKS
```

---

# 3. Azure Container Registry Used

The FlavorForge project used the following Azure Container Registry:

```text
ACR Name:
flavorforgeacr2026ms
```

Resource group:

```text
flavorforge-rg
```

Region:

```text
East US
```

The ACR was created as part of the FlavorForge Azure infrastructure.

---

# 4. Register the Required Azure Resource Provider

Before creating the registry, the required Azure Container Registry resource provider was registered.

The repository contains evidence of this step:

```text
screenshots/azure/03-containerregistry-provider-registered.png
```

### Evidence

![Azure Container Registry provider registered](/screenshots/azure/03-containerregistry-provider-registered.png)

This confirmed that the Azure subscription was ready to create Container Registry resources.

---

# 5. Create the Azure Container Registry

The ACR was created inside the existing FlavorForge resource group.

The resulting resource was:

```text
flavorforgeacr2026ms
```

### Evidence

![FlavorForge ACR created](../../../screenshots/azure/04-acr-created.png)

This screenshot provides evidence that the Azure Container Registry was successfully created.

---

# 6. ACR and Resource Group Relationship

The Azure infrastructure was organized using the FlavorForge resource group:

```text
flavorforge-rg
```

The Container Registry belongs to this resource group.

The relationship is:

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

This organization keeps the major FlavorForge Azure resources together.

---

# 7. Authenticate Docker with ACR

After creating the registry, Docker was authenticated with the Azure Container Registry.

The repository contains evidence of the successful ACR login:

```text
screenshots/azure/06-az-acr-login-success.png
```

### Evidence

![Azure Container Registry login success](../../../screenshots/azure/06-az-acr-login-success.png)

The successful login allowed Docker to interact with the FlavorForge ACR.

Conceptually:

```text
Local Docker
     │
     │ Authentication
     ▼
Azure Container Registry
     │
     ▼
flavorforgeacr2026ms
```

---

# 8. Docker Images for FlavorForge

The application contains separate frontend and backend Docker images.

The containerization stage produced:

```text
Frontend Docker Image
```

and:

```text
Backend Docker Image
```

These images were then prepared for storage in ACR.

The workflow was:

```text
Application Source
        │
        ├───────────────┐
        │               │
        ▼               ▼
    Frontend         Backend
    Dockerfile       Dockerfile
        │               │
        ▼               ▼
 Frontend Image      Backend Image
        │               │
        └───────┬───────┘
                │
                ▼
              ACR
```

---

# 9. Tagging Images for ACR

Docker images need to be associated with the ACR registry before they can be pushed.

The repository contains evidence of the image tagging workflow:

```text
screenshots/azure/05-tag-create.png
```

The tagging process identifies the target registry and repository for the image.

Conceptually:

```text
Local Docker Image
        ↓
ACR-qualified image tag
        ↓
flavorforgeacr2026ms
        ↓
Push to ACR
```

The exact image tags used during the project can also be verified from the Docker and ACR evidence already captured in the repository.

---

# 10. Verify Images in ACR

After the Docker images were pushed, the images stored in Azure Container Registry were verified.

Evidence:

```text
screenshots/azure/09-verify-images-in-acr.png
```

### Evidence

![Images verified in Azure Container Registry](../../../screenshots/azure/09-verify-images-in-acr.png)

This confirmed that the FlavorForge container images were available in ACR.

---

# 11. ACR Images in Azure Portal

The ACR repositories were also inspected from the Azure Portal.

Evidence:

```text
screenshots/azure/25-acr-images.png
```

### Evidence

![FlavorForge ACR images](../../../screenshots/azure/25-acr-images.png)

This provides additional evidence that the container images were stored in the Azure Container Registry.

---

# 12. ACR Repository Structure

The FlavorForge ACR stores the application container images that are later required by AKS.

The logical structure is:

```text
Azure Container Registry
        │
        ├── Frontend image
        │
        └── Backend image
```

The registry therefore acts as the central image repository between Docker image creation and Kubernetes deployment.

---

# 13. Docker → ACR Workflow

The complete image publishing workflow was:

```text
FlavorForge Source Code
        ↓
Dockerfile
        ↓
Docker Build
        ↓
Local Docker Image
        ↓
ACR Image Tag
        ↓
Docker Login to ACR
        ↓
Docker Push
        ↓
Azure Container Registry
```

This establishes the connection between the local Docker stage and the Azure deployment stage.

---

# 14. ACR Verification

The ACR stage was verified using multiple pieces of evidence.

### Provider registration

```text
screenshots/azure/03-containerregistry-provider-registered.png
```

Confirmed that the required Container Registry resource provider was registered.

### ACR creation

```text
screenshots/azure/04-acr-created.png
```

Confirmed that the FlavorForge ACR was created.

### ACR authentication

```text
screenshots/azure/06-az-acr-login-success.png
```

Confirmed successful authentication to the registry.

### Image verification

```text
screenshots/azure/09-verify-images-in-acr.png
```

Confirmed that images were available in ACR.

### Azure Portal image verification

```text
screenshots/azure/25-acr-images.png
```

Provided additional evidence of the images stored in the registry.

---

# 15. ACR → AKS Relationship

The ACR stage prepares the container images for the next stage of the FlavorForge deployment.

The relationship is:

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
```

AKS later uses the container images stored in ACR when creating the application workloads.

This is why ACR is an important component of the Azure infrastructure.

---

# 16. Why ACR Is Used Instead of Local Docker Images

A Docker image available only on the developer's local machine cannot be directly used by an AKS cluster.

The image needs to be available from a registry that the cluster can access.

Therefore:

```text
Local Machine
     │
     │ Docker Image
     ▼
Azure Container Registry
     │
     │ Pull Image
     ▼
AKS
     │
     ▼
Kubernetes Pod
```

This provides a clear separation between:

```text
Image Building
```

and:

```text
Application Deployment
```

Docker is responsible for building the image.

ACR stores the image.

AKS later deploys the image.

---

# 17. FlavorForge ACR Architecture

The Azure container image flow can be represented as:

```text
                         Azure
                          │
             ┌────────────┴────────────┐
             │                         │
             ▼                         ▼
      Container Registry             AKS
   flavorforgeacr2026ms        flavorforge-aks
             │                         │
             │                         │
       Container Images          Kubernetes Pods
             │                         │
             └────────────┬────────────┘
                          │
                    FlavorForge
                    Application
```

The registry provides the image source for the Kubernetes deployment.

---

# 18. Evidence Available in Repository

The following screenshots already exist in the FlavorForge repository for the ACR stage:

```text
screenshots/azure/
├── 03-containerregistry-provider-registered.png
├── 04-acr-created.png
├── 05-tag create.png
├── 06-az acr login success.png
├── 09-Verify Images in ACR.png
└── 25-ACR-images.png
```

These screenshots provide evidence for:

```text
Provider Registration
        ↓
ACR Creation
        ↓
Image Tagging
        ↓
ACR Authentication
        ↓
Image Publishing
        ↓
Image Verification
```

No additional screenshots need to be recreated for this document because the repository already contains evidence for the ACR workflow.

---

# 19. What We Actually Achieved

At the end of this stage, FlavorForge had a working Azure Container Registry:

```text
flavorforgeacr2026ms
```

inside:

```text
flavorforge-rg
```

The container image workflow was:

```text
FlavorForge Application
        ↓
Docker Images
        ↓
Tag Images for ACR
        ↓
Authenticate with ACR
        ↓
Push Images
        ↓
Verify Images
        ↓
Images Available in ACR
```

The Docker images were therefore no longer limited to the local development environment.

They were available in Azure for the next deployment stage.

---

# 20. Important Learning

The important distinction between Docker and ACR is:

```text
Docker
    ↓
Builds and runs containers
```

while:

```text
Azure Container Registry
    ↓
Stores and distributes container images
```

The complete relationship is:

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

This pattern is commonly used in cloud-native deployment workflows.

---

# 21. ACR Stage Completed

The Azure BUILD-JOURNEY now looks like:

```text
01 — Azure Account and CLI
        ↓
02 — Resource Group
        ↓
03 — ACR
        ↓
Next: 04 — AKS
```

The FlavorForge container images were successfully prepared and stored in Azure Container Registry.

The next stage is:

```text
docs/week-4/BUILD-JOURNEY/05-azure/04-aks.md
```

This will document how the FlavorForge Azure Kubernetes Service cluster was created and connected to the application deployment workflow.
