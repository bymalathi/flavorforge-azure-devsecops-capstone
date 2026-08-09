# 04 — Azure Kubernetes Service (AKS)

## 1. Purpose

After creating the Azure Resource Group and Azure Container Registry, the next step in the FlavorForge Azure infrastructure journey was to create an **Azure Kubernetes Service (AKS)** cluster.

AKS provides the managed Kubernetes environment where the containerized FlavorForge application would later run.

The Azure deployment flow became:

```text
FlavorForge Application
        ↓
Docker Images
        ↓
Azure Container Registry
        ↓
Azure Kubernetes Service (AKS)
        ↓
Kubernetes Workloads
```

At this stage, the focus was on:

* Creating the AKS cluster
* Starting the cluster when required
* Connecting the local machine to AKS
* Verifying Kubernetes access
* Verifying the cluster nodes

The detailed Kubernetes application deployment is documented later in:

```text
docs/week-4/BUILD-JOURNEY/06-kubernetes/
```

---

# 2. What is AKS?

**Azure Kubernetes Service (AKS)** is Microsoft's managed Kubernetes service.

AKS provides a Kubernetes environment without requiring the project to manually build the complete Kubernetes control-plane infrastructure.

For FlavorForge, AKS became the cloud platform used to run the application's Kubernetes workloads.

The later Kubernetes deployment included resources such as:

```text
Deployments
Services
Ingress
ConfigMaps
Secrets
HPA
Pods
```

These Kubernetes resources are documented separately from the Azure infrastructure setup.

---

# 3. FlavorForge AKS Cluster

The AKS cluster used by FlavorForge was:

```text
flavorforge-aks
```

The cluster was associated with the existing Azure Resource Group:

```text
flavorforge-rg
```

The relationship was:

```text
Azure Subscription
        │
        ▼
flavorforge-rg
        │
        ▼
flavorforge-aks
```

The AKS cluster became the Kubernetes runtime environment for the FlavorForge application.

---

# 4. Create the AKS Cluster

The AKS cluster was created as part of the FlavorForge Azure infrastructure setup.

Existing project evidence:

![](/screenshots/azure/10-az-aks-create.png)

This screenshot provides evidence of the AKS creation workflow.

The important result was the creation of:

```text
flavorforge-aks
```

inside:

```text
flavorforge-rg
```

The exact historical `az aks create` command is intentionally not reconstructed here unless it is directly available from the original project evidence.

This keeps the BUILD-JOURNEY factual rather than guessing command options that may not have been used.

---

# 5. AKS and Resource Group Relationship

The Azure infrastructure now contained:

```text
Azure
 │
 └── flavorforge-rg
       │
       ├── flavorforgeacr2026ms
       │
       └── flavorforge-aks
```

The two major services had different responsibilities:

```text
ACR
 ↓
Stores container images
```

and:

```text
AKS
 ↓
Runs Kubernetes workloads
```

The ACR → AKS access relationship is documented separately in:

```text
05 — ACR → AKS Access
```

---

# 6. Connect the Local Machine to AKS

Creating the AKS cluster does not automatically configure the local machine's Kubernetes client.

The local environment therefore needed Kubernetes credentials for the FlavorForge AKS cluster.

The standard command used to obtain AKS credentials is:

```bash
az aks get-credentials \
  --resource-group flavorforge-rg \
  --name flavorforge-aks \
  --overwrite-existing
```

### Important stage distinction

This command is part of the **AKS connection stage**, not the AKS cluster creation itself.

The relationship is:

```text
AKS Cluster Created
        ↓
Obtain AKS Credentials
        ↓
Local kubeconfig updated
        ↓
kubectl can communicate with AKS
```

Existing project evidence:

```text
screenshots/azure/11-connect-local-machine-to-aks.png
```

documents this connection step.

---

# 7. Kubernetes Access

Once the local machine was connected to AKS, Kubernetes commands could communicate with the cluster.

The general workflow became:

```text
Local Machine
      │
      │ kubectl
      ▼
AKS Cluster
      │
      ▼
Kubernetes API
```

This was an important transition in the project.

The local development environment was no longer interacting only with Azure resources through the Azure CLI; it could also interact directly with the Kubernetes cluster through `kubectl`.

---

# 8. Verify the AKS Cluster

The Kubernetes connection was verified using:

```bash
kubectl get nodes
```

Existing project evidence:

```text
screenshots/azure/28-kubectl-get-nodes.png
```

A successful response confirmed that the local Kubernetes client could communicate with the AKS cluster and retrieve node information.

The verification flow was:

```text
Local Machine
      ↓
kubectl
      ↓
AKS Kubernetes API
      ↓
Cluster Nodes
```

---

# 9. Start the AKS Cluster

The FlavorForge AKS cluster was also stopped and started as part of the project workflow.

This was useful when the cluster was not required continuously and helped manage Azure usage.

Existing evidence:

```text
screenshots/azure/26-aks-start.png
```

documents the AKS start operation.

The conceptual lifecycle was:

```text
AKS Cluster
     │
     ├── Running
     │
     └── Stopped when not required
              │
              ↓
          Start again
              │
              ↓
           Running
```

Starting an AKS cluster and creating an AKS cluster are separate operations and should not be treated as the same step.

---

# 10. Verify AKS Cluster Running

After the cluster was started, its state was verified.

Existing evidence:

```text
screenshots/azure/27-aks-cluster-running.png
```

This confirms that the AKS environment was available for use.

The verification sequence was:

```text
Start AKS
   ↓
AKS Cluster Running
   ↓
Connect kubectl
   ↓
Verify Nodes
```

---

# 11. AKS in Azure Portal

The AKS environment was also inspected through the Azure Portal.

Existing project evidence:

```text
screenshots/azure/16-kubernetes-center-microsoft-azure.png
```

The Azure Kubernetes Center provided another view of the Kubernetes environment.

This complemented the command-line verification performed through:

```bash
kubectl get nodes
```

The two verification approaches served different purposes:

```text
Azure Portal
    ↓
Azure / AKS resource visibility
```

while:

```text
kubectl
    ↓
Kubernetes cluster visibility
```

---

# 12. AKS Workloads

The repository also contains evidence of AKS workloads:

```text
screenshots/azure/15-aks-workloads-deployments-pods.png
```

This provides evidence of Kubernetes workloads associated with the FlavorForge AKS environment.

The detailed creation and configuration of the Kubernetes Deployments, Services, Ingress, ConfigMaps, HPA, and other Kubernetes resources belongs to the later Kubernetes BUILD-JOURNEY.

Therefore, this document does not repeat those implementation steps.

---

# 13. Relationship Between ACR and AKS

The Azure environment now contained two important services:

```text
Azure Container Registry
        │
        │ Stores container images
        ▼
FlavorForge Images
```

and:

```text
Azure Kubernetes Service
        │
        │ Runs Kubernetes workloads
        ▼
FlavorForge Application
```

The eventual deployment flow was:

```text
Source Code
    ↓
Docker Build
    ↓
Docker Images
    ↓
Azure Container Registry
    ↓
AKS
    ↓
Kubernetes Pods
```

However, AKS must have permission to pull images from ACR.

That access configuration is intentionally documented separately in:

```text
docs/week-4/BUILD-JOURNEY/05-azure/05-acr-aks-access.md
```

---

# 14. Why AKS Was Needed

Docker allowed FlavorForge to package the frontend and backend applications into containers.

However, the cloud deployment required an orchestration platform capable of managing those containers.

AKS provides the Kubernetes platform for capabilities such as:

```text
Container orchestration
        ↓
Deployments
        ↓
Replica management
        ↓
Services
        ↓
Ingress
        ↓
Health checks
        ↓
Autoscaling
```

These capabilities were implemented and documented during the later Kubernetes stage.

---

# 15. Azure Infrastructure Progress

The Azure infrastructure had now progressed through:

```text
Azure Account
      ↓
Resource Group
      ↓
Azure Container Registry
      ↓
Azure Kubernetes Service
```

The responsibilities of these components were:

| Azure Resource | Purpose                                     |
| -------------- | ------------------------------------------- |
| Resource Group | Logical container for project resources     |
| ACR            | Stores FlavorForge container images         |
| AKS            | Provides the managed Kubernetes environment |

The next Azure stage establishes the connection between ACR and AKS.

---

# 16. Evidence Available in the Repository

The following screenshots provide evidence for this AKS stage.

### AKS creation

```text
screenshots/azure/10-az-aks-create.png
```

### Local machine connected to AKS

```text
screenshots/azure/11-connect-local-machine-to-aks.png
```

### AKS start operation

```text
screenshots/azure/26-aks-start.png
```

### AKS cluster running

```text
screenshots/azure/27-aks-cluster-running.png
```

### Kubernetes node verification

```text
screenshots/azure/28-kubectl-get-nodes.png
```

### AKS workloads

```text
screenshots/azure/15-aks-workloads-deployments-pods.png
```

### Kubernetes Center

```text
screenshots/azure/16-kubernetes-center-microsoft-azure.png
```

Together, these provide evidence covering:

```text
AKS Creation
      ↓
AKS Start
      ↓
AKS Running
      ↓
Local Connection
      ↓
kubectl Verification
      ↓
Kubernetes Visibility
```

---

# 17. What We Actually Achieved

At the end of this stage, FlavorForge had an AKS environment available for Kubernetes deployment.

The progression was:

```text
flavorforge-rg
      ↓
flavorforge-aks
      ↓
AKS Cluster Running
      ↓
Local Machine Connected
      ↓
kubectl Access Verified
      ↓
Kubernetes Nodes Verified
```

The AKS cluster was therefore ready to serve as the runtime platform for the FlavorForge Kubernetes workloads.

---

# 18. Important Learning

The most important distinction at this stage is between **ACR** and **AKS**.

```text
ACR
 ↓
Stores container images
```

while:

```text
AKS
 ↓
Provides the Kubernetes environment
```

They work together:

```text
                 Azure
                   │
          ┌────────┴────────┐
          │                 │
          ▼                 ▼
         ACR               AKS
          │                 │
          │ Images          │ Workloads
          ▼                 ▼
    Docker Images      Kubernetes Pods
```

The next step explains how AKS was given access to pull the images stored in ACR.

---

# 19. Azure Stage Progress

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

The next document is:

```text
docs/week-4/BUILD-JOURNEY/05-azure/05-acr-aks-access.md
```

This will document how AKS was configured to access the FlavorForge container images stored in Azure Container Registry.

---

# 20. Result

The AKS infrastructure stage established:

```text
AKS Cluster:
flavorforge-aks

Resource Group:
flavorforge-rg

Region:
East US
```

The cluster was started when required, connected to the local Kubernetes client, and verified using Kubernetes node information.

The resulting Azure architecture was:

```text
                    Azure
                      │
              flavorforge-rg
                      │
          ┌───────────┴───────────┐
          │                       │
          ▼                       ▼
flavorforgeacr2026ms        flavorforge-aks
          │                       │
          │ Images                │ Kubernetes
          │                       │ Workloads
          ▼                       ▼
    Container Images        FlavorForge Pods
```

The next stage establishes the required **ACR → AKS access** so that AKS can pull the FlavorForge images from the registry.
