# 06 — Azure Verification

## 1. Purpose

This document consolidates the verification performed after setting up the main Azure infrastructure for FlavorForge.

The Azure BUILD-JOURNEY covered:

```text
Azure Account & CLI
        ↓
Resource Group
        ↓
Azure Container Registry
        ↓
Azure Kubernetes Service
        ↓
ACR → AKS Access
        ↓
Azure Infrastructure Verification
```

The purpose of this stage was to confirm that the Azure environment was available and ready for the Kubernetes deployment stage.

---

## 2. Azure Infrastructure Created

The main Azure resources used by FlavorForge were:

```text
Azure
 │
 └── flavorforge-rg
       │
       ├── Azure Container Registry
       │       └── flavorforgeacr2026ms
       │
       └── Azure Kubernetes Service
               └── flavorforge-aks
```

Each resource had a specific responsibility:

| Resource               | Purpose                                     |
| ---------------------- | ------------------------------------------- |
| `flavorforge-rg`       | Contains the FlavorForge Azure resources    |
| `flavorforgeacr2026ms` | Stores Docker container images              |
| `flavorforge-aks`      | Provides the Kubernetes runtime environment |

---

## 3. Verify Azure CLI Authentication

The Azure CLI was authenticated before managing the Azure resources.

### Evidence

![Azure CLI authenticated](/screenshots/azure/01-azure-cli-authenticated.png)

This established the initial connection between the local development environment and Azure.

The general flow was:

```text
Local Machine
      ↓
Azure CLI
      ↓
Azure Authentication
      ↓
Azure Resources
```

---

## 4. Verify the Resource Group

The FlavorForge Resource Group was created successfully.

### Evidence

![FlavorForge Resource Group](/screenshots/azure/02-resource-group-created.png)

The Resource Group acts as the logical container for the Azure infrastructure used by the project.

```text
flavorforge-rg
      │
      ├── ACR
      └── AKS
```

The repository also contains an Azure Portal view of the Resource Group:

![FlavorForge Resource Group in Azure](/screenshots/azure/flavorforge-rg-microsoft-azure-resource-group.png)

This provides additional evidence of the Azure resource organization.

---

## 5. Verify Azure Container Registry

The Azure Container Registry was created as part of the Azure infrastructure setup.

### ACR Creation Evidence

![Azure Container Registry created](/screenshots/azure/04-acr-created.png)

The ACR was used to store the Docker images required by the FlavorForge application.

The registry name used by the project is:

```text
flavorforgeacr2026ms
```

The required Azure Container Registry resource provider was also registered before creating the registry.

### Provider Registration Evidence

![Container Registry provider registered](/screenshots/azure/03-containerregistry-provider-registered.png)

---

## 6. Verify ACR Authentication

The local environment was able to authenticate with the Azure Container Registry.

### ACR Login Evidence

![ACR login successful](/screenshots/azure/06-az-acr-login-success.png)

Additional evidence of the ACR login workflow is available:

![ACR login verification](/screenshots/azure/13-acr-login-succeed.png)

This confirmed that the local Docker environment could communicate with the FlavorForge container registry.

The authentication flow was:

```text
Local Docker
      ↓
Azure Container Registry Login
      ↓
Authenticated Registry Access
      ↓
Image Push / Pull
```

---

## 7. Verify Docker Images

Before verifying the images in ACR, the locally available Docker images were inspected.

### Docker Images Evidence

![Docker images](/screenshots/azure/07-docker-images.png)

The repository also contains evidence of tagging and verifying the Docker images:

![Tagged Docker images](/screenshots/azure/08-tag-the-images-and-verify-in-docker-images.png)

This established that the FlavorForge frontend and backend container images were available locally before being published to ACR.

---

## 8. Verify Images in ACR

After the Docker images were tagged and pushed, the images were verified in ACR.

### ACR Image Verification

![Images verified in ACR](/screenshots/azure/09-verify-images-in-acr.png)

Additional Azure Portal evidence is available:

![ACR images in Azure Portal](/screenshots/azure/25-acr-images.png)

This confirmed that the container images were available in the Azure Container Registry.

The image flow was:

```text
Docker Image
      ↓
ACR Tag
      ↓
Docker Push
      ↓
Azure Container Registry
      ↓
Image Available
```

---

## 9. Verify ACR Image Tagging

The project also contains evidence of registry-qualified image tagging.

### ACR Tagging Evidence

![ACR image tagging](/screenshots/azure/12-acr-tag.png)

This demonstrates the process of associating a local Docker image with the Azure Container Registry.

Conceptually:

```text
Local Docker Image
        ↓
Registry-qualified Image Tag
        ↓
flavorforgeacr2026ms
        ↓
Push to ACR
```

---

## 10. Verify AKS Creation

The AKS cluster was created inside the FlavorForge Resource Group.

### AKS Creation Evidence

![AKS creation](/screenshots/azure/10-az-aks-create.png)

The AKS cluster used by the project is:

```text
flavorforge-aks
```

The cluster provides the Kubernetes environment for the FlavorForge application.

---

## 11. Verify Local Machine → AKS Connection

The local machine was connected to the AKS cluster.

### AKS Connection Evidence

![Connect local machine to AKS](/screenshots/azure/11-connect-local-machine-to-aks.png)

This allowed Kubernetes commands to be executed from the local terminal against the Azure-hosted AKS cluster.

The connection flow was:

```text
Local Machine
      ↓
kubectl
      ↓
AKS Kubernetes API
      ↓
AKS Cluster
```

---

## 12. Verify AKS Availability

The AKS cluster was started and its running state was verified.

### AKS Start

![AKS start](/screenshots/azure/26-aks-start.png)

### AKS Cluster Running

![AKS cluster running](/screenshots/azure/27-aks-cluster-running.png)

These screenshots provide evidence that the AKS environment was available for Kubernetes operations.

The verification flow was:

```text
Start AKS
   ↓
AKS cluster running
   ↓
Connect kubectl
   ↓
Verify nodes
```

---

## 13. Verify Kubernetes Nodes

The AKS cluster was verified using:

```bash
kubectl get nodes
```

### Evidence

![kubectl get nodes](/screenshots/azure/28-kubectl-get-nodes.png)

A successful node listing confirmed that the local Kubernetes client could communicate with the AKS cluster and retrieve cluster information.

This was an important verification point before deploying the FlavorForge Kubernetes manifests.

---

## 14. Verify AKS Workloads

The Azure environment also contains evidence of Kubernetes workloads running in AKS.

### AKS Workloads Evidence

![AKS workloads deployments and pods](/screenshots/azure/15-aks-workloads-deployments-pods.png)

This provides visibility into the workloads running within the AKS environment.

The detailed Kubernetes deployment process is documented separately under:

```text
docs/week-4/BUILD-JOURNEY/06-kubernetes/
```

---

## 15. Verify Kubernetes Center

The AKS environment was also visible through Azure Kubernetes Center.

### Evidence

![Kubernetes Center in Azure](/screenshots/azure/16-kubernetes-center-microsoft-azure.png)

This provides an Azure Portal view of the Kubernetes environment and complements the command-line verification performed with `kubectl`.

---

## 16. Verify Backend and Frontend Workloads

Azure Portal evidence also exists for the FlavorForge application workloads.

### Backend

![Backend workload in Azure](/screenshots/azure/17-backend-microsoft-azure.png)

### Frontend

![Frontend workload in Azure](/screenshots/azure/18-frontend-microsoft-azure.png)

These provide additional evidence that the FlavorForge application components were running within the Azure Kubernetes environment.

---

## 17. Verify Backend Runtime Information

The backend workload was also inspected through Azure.

### Backend Live Logs

![Backend live logs](/screenshots/azure/19-backend-live-logs.png)

### Backend Events

![Backend events](/screenshots/azure/20-backend-events.png)

These provide runtime and operational evidence for the backend workload.

Logs and events are useful when investigating:

```text
Application startup
Pod behaviour
Runtime problems
Container failures
Kubernetes events
```

---

## 18. Verify Kubernetes Replicas

Replica information was also available for the application workloads.

### Backend ReplicaSet

![Backend ReplicaSet](/screenshots/azure/21-replica-set.png)

### Frontend ReplicaSet

![Frontend ReplicaSet](/screenshots/azure/21-2-frontend-replica-set.png)

ReplicaSets are part of Kubernetes workload management and help maintain the required number of application pod replicas.

The detailed Kubernetes deployment strategy is covered in the Kubernetes BUILD-JOURNEY section.

---

## 19. Verify Services and Ingress

Azure evidence also exists for the application Services and Ingress.

### Evidence

![Services and Ingress](/screenshots/azure/22-services-ingress.png)

These components provide the networking layer that allows traffic to reach the application workloads.

The detailed configuration of:

```text
Services
Ingress
Load Balancer
```

is documented in:

```text
docs/week-4/BUILD-JOURNEY/06-kubernetes/
```

---

## 20. Verify Azure Load Balancer

The AKS environment used an Azure Load Balancer for external application access.

### Load Balancer Resource

![Azure Load Balancer](/screenshots/azure/23-load-balancer-azure-resource.png)

Additional Load Balancer evidence is available for the frontend IP configuration:

![Frontend IP configuration](/screenshots/azure/23-1-frontend-ip-configuration-load-balancer-azure-resource.png)

The repository also contains evidence for the Load Balancer health status:

![Load Balancer health status](/screenshots/azure/23-2-health-status-load-balancer-azure-resource.png)

And Load Balancer rules:

![Load Balancer rules](/screenshots/azure/23-3-load-balancing-rules-load-balancer-azure-resource.png)

These screenshots provide Azure-side evidence of the load-balancing infrastructure associated with the AKS application.

---

## 21. Verify Public IP

A public IP address was associated with the Azure networking infrastructure.

### Evidence

![Public IP address](/screenshots/azure/24-public-ip-address.png)

This enabled external access to the application through the Kubernetes networking configuration.

The detailed Ingress and application exposure process is covered in the Kubernetes stage.

---

## 22. Verify Azure CLI Environment

The Azure CLI environment was also verified.

### Azure CLI Version Evidence

![Azure CLI version](/screenshots/azure/29-azure-version.png)

This confirms the Azure CLI environment used during the project.

---

## 23. End-to-End Azure Architecture

After completing the Azure stage, the infrastructure could be represented as:

```text
                    Azure
                      │
              ┌───────┴────────┐
              │                │
              ▼                ▼
        Resource Group       ACR
        flavorforge-rg       │
              │              │
              │              │ Docker Images
              │              ▼
              │        Frontend / Backend
              │
              ▼
             AKS
       flavorforge-aks
              │
       ┌──────┴──────┐
       │             │
       ▼             ▼
   Frontend       Backend
     Pods            Pods
       │             │
       └──────┬──────┘
              │
          Kubernetes
        Services / Ingress
              │
              ▼
       Azure Load Balancer
              │
              ▼
         Public Access
```

This represents the transition from local Docker containers to the Azure-hosted Kubernetes environment.

---

## 24. Azure Verification Checklist

The main verification points for this stage were:

### Azure CLI

```text
✓ Azure CLI authenticated
✓ Azure CLI environment verified
```

### Resource Group

```text
✓ flavorforge-rg created
```

### ACR

```text
✓ ACR provider registered
✓ ACR created
✓ ACR authentication verified
✓ Docker images available locally
✓ Docker images tagged
✓ Images pushed to ACR
✓ Images available in ACR
```

### AKS

```text
✓ flavorforge-aks created
✓ AKS cluster started
✓ AKS cluster running
✓ Local machine connected to AKS
✓ Kubernetes nodes verified
```

### Kubernetes / Azure Integration

```text
✓ AKS workloads visible
✓ Kubernetes Center verified
✓ Backend and frontend workloads visible
✓ Backend logs and events inspected
✓ ReplicaSets visible
✓ Services and Ingress visible
✓ Azure Load Balancer available
✓ Public IP available
```

---

## 25. What We Actually Achieved

The Azure infrastructure stage successfully established the cloud platform required for FlavorForge.

The complete progression was:

```text
Azure CLI
    ↓
Resource Group
    ↓
Azure Container Registry
    ↓
Docker Images in ACR
    ↓
Azure Kubernetes Service
    ↓
AKS ↔ ACR Access
    ↓
kubectl Connection
    ↓
Kubernetes Workloads
    ↓
Azure Networking
```

At this point, FlavorForge had moved beyond local Docker execution and into an Azure-hosted Kubernetes environment.

---

## 26. Important Learning

The most important concept from the Azure stage is understanding the responsibility of each service.

```text
Resource Group
    ↓
Organizes Azure resources
```

```text
ACR
    ↓
Stores container images
```

```text
AKS
    ↓
Runs Kubernetes workloads
```

```text
Azure Load Balancer
    ↓
Provides external networking
```

Together:

```text
                    Azure
                      │
       ┌──────────────┼──────────────┐
       │              │              │
       ▼              ▼              ▼
 Resource Group      ACR            AKS
                      │              │
                      │              ▼
                      │        Kubernetes
                      │        Workloads
                      │              │
                      └──────► Image Pull
                                     │
                                     ▼
                              Running Pods
```

Understanding these responsibilities makes the later Kubernetes and DevOps stages easier to follow.

---

## 27. Azure Stage Completed

The complete Azure BUILD-JOURNEY is now:

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
        ↓
Next: Kubernetes
```

The Azure infrastructure stage is now complete.

The next BUILD-JOURNEY stage is:

```text
docs/week-4/BUILD-JOURNEY/06-kubernetes/
```

The first document is:

```text
docs/week-4/BUILD-JOURNEY/06-kubernetes/01-kubernetes-basics.md
```

This will explain the Kubernetes concepts used by FlavorForge before documenting the actual Kubernetes manifests and deployment configuration.
