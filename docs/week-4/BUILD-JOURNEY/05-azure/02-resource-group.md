# 02 — Azure Resource Group

## 1. Purpose

After authenticating with Azure and verifying the Azure CLI environment, the next step in the FlavorForge Azure journey was to create the Azure Resource Group.

An Azure Resource Group provides a logical container for related Azure resources.

For FlavorForge, the Resource Group became the main organizational boundary for the cloud infrastructure.

The overall structure eventually became:

```text
Azure Subscription
        ↓
flavorforge-rg
        ↓
┌─────────────────────────────┐
│ FlavorForge Azure Resources │
├─────────────────────────────┤
│ Azure Container Registry    │
│ (ACR)                       │
│                             │
│ Azure Kubernetes Service    │
│ (AKS)                       │
└─────────────────────────────┘
```

> **Chronology note:** ACR and AKS were created in later Azure stages. They are shown here to explain the final relationship with the Resource Group, not to imply that they already existed when the Resource Group was created.

---

# 2. FlavorForge Resource Group

The Resource Group created for the project was:

```text
flavorforge-rg
```

The Azure infrastructure for FlavorForge was organized under this Resource Group.

The project infrastructure was created in:

```text
East US
```

Therefore:

```text
Resource Group:
flavorforge-rg

Region:
East US
```

---

# 3. Create the Resource Group

The Azure CLI command used to create the Resource Group was:

```bash
az group create \
  --name flavorforge-rg \
  --location eastus
```

The command specifies:

| Parameter      | Value            |
| -------------- | ---------------- |
| Resource Group | `flavorforge-rg` |
| Azure Region   | `eastus`         |

The Azure CLI region name:

```text
eastus
```

corresponds to the Azure Portal region:

```text
East US
```

---

# 4. Understand the Command

The command:

```bash
az group create
```

tells Azure CLI to create a Resource Group.

The:

```bash
--name flavorforge-rg
```

parameter specifies the Resource Group name.

The:

```bash
--location eastus
```

parameter specifies the Azure region associated with the Resource Group.

Conceptually:

```text
az group create
       │
       ├── Resource Group: flavorforge-rg
       │
       └── Location: eastus
```

---

# 5. Verify the Resource Group

After creation, the Resource Group can be verified using:

```bash
az group show \
  --name flavorforge-rg
```

This displays detailed information about the Resource Group.

For a simpler table view, Resource Groups can also be listed using:

```bash
az group list --output table
```

The expected Resource Group is:

```text
flavorforge-rg
```

---

# 6. Azure Portal Verification

The Resource Group was also verified through the Azure Portal.

The project contains evidence for the Resource Group creation and Azure environment.

These screenshots provide supporting evidence that the Resource Group existed in Azure.

The Portal verification complements the Azure CLI verification:

```text
Azure CLI
    ↓
az group show
    ↓
Resource Group verified
```

and:

```text
Azure Portal
    ↓
Resource Group
    ↓
Visual verification
```

---

# 7. Resource Group Overview

The Resource Group provides a single logical location from which the FlavorForge Azure resources can be managed.

The eventual structure was:

```text
                    Azure
                      │
                      ▼
               flavorforge-rg
                      │
             ┌────────┴────────┐
             │                 │
             ▼                 ▼
            ACR               AKS
             │                 │
             ▼                 ▼
      Container Images    Kubernetes Cluster
```

The Resource Group itself does not run the application.

Instead, it organizes the Azure infrastructure used by the application.

---

# 8. Why Use a Resource Group?

The Resource Group provided several practical benefits for FlavorForge.

### Organization

Related Azure resources could be grouped together:

```text
flavorforge-rg
    ├── ACR
    └── AKS
```

### Resource Management

Resources could be viewed and managed together through the Azure Portal or Azure CLI.

### Lifecycle Management

The Resource Group provided a convenient boundary for managing the lifecycle of the project's Azure resources.

### Cost Visibility

Resources associated with the project could be reviewed together when monitoring Azure usage and costs.

---

# 9. Verify Resources Inside the Resource Group

Once resources were created, Azure CLI could be used to list resources belonging to the Resource Group:

```bash
az resource list \
  --resource-group flavorforge-rg \
  --output table
```

At the time of Resource Group creation, the Resource Group itself was the primary resource being established.

As the Azure infrastructure was built in later stages, additional resources were associated with it.

The eventual high-level structure became:

```text
flavorforge-rg
     │
     ├── flavorforgeacr2026ms
     │       │
     │       └── Container Images
     │
     └── flavorforge-aks
             │
             └── Kubernetes Workloads
```

> **Important:** The ACR and AKS entries above represent the later state of the FlavorForge Azure environment. They were not created as part of this Resource Group creation command.

---

# 10. Resource Group and Azure Container Registry — Later Stage

The Azure Container Registry created later in the project was:

```text
flavorforgeacr2026ms
```

It was associated with the FlavorForge Resource Group:

```text
flavorforge-rg
       │
       ▼
flavorforgeacr2026ms
       │
       ▼
FlavorForge Container Images
```

The ACR creation and configuration are documented separately in:

```text
03 — Azure Container Registry
```

This keeps the BUILD-JOURNEY chronological.

---

# 11. Resource Group and AKS — Later Stage

The Azure Kubernetes Service cluster created later for FlavorForge was:

```text
flavorforge-aks
```

It was also associated with:

```text
flavorforge-rg
```

The later relationship became:

```text
flavorforge-rg
       │
       ▼
flavorforge-aks
       │
       ▼
Kubernetes Cluster
       │
       ├── Frontend
       ├── Backend
       ├── Services
       └── Ingress
```

The AKS infrastructure is documented separately in:

```text
04 — Azure Kubernetes Service
```

---

# 12. Resource Group as the Cloud Boundary

The Resource Group became the main Azure organizational boundary for the FlavorForge deployment.

The overall architecture was:

```text
Azure Subscription
        │
        ▼
  flavorforge-rg
        │
        ├─────────────────────┐
        │                     │
        ▼                     ▼
      ACR                    AKS
        │                     │
        │                     ├── Kubernetes
        │                     │
        ▼                     └── FlavorForge
  Container Images
```

The important distinction is:

```text
ACR
 ↓
Stores container images
```

while:

```text
AKS
 ↓
Runs the containerized application
```

Both resources were organized under:

```text
flavorforge-rg
```

---

# 13. Resource Group Verification Checklist

The Resource Group stage can be verified using the following checklist:

| Verification                       | Expected Result        |
| ---------------------------------- | ---------------------- |
| Resource Group exists              | `flavorforge-rg`       |
| Region                             | East US                |
| Azure CLI access                   | Successful             |
| Resource Group visible in Portal   | Yes                    |
| Resource Group visible through CLI | Yes                    |
| ACR associated later               | `flavorforgeacr2026ms` |
| AKS associated later               | `flavorforge-aks`      |

The ACR and AKS checks are **later-stage checks** and are not required to consider Resource Group creation itself successful.

---

# 14. Evidence for This Stage

The relevant evidence for this stage should demonstrate:

1. Azure CLI access
2. Resource Group creation
3. Resource Group visibility in Azure

The most useful CLI verification command is:

```bash
az group show \
  --name flavorforge-rg
```

A broader verification command is:

```bash
az group list --output table
```

Azure Portal can also be used to visually verify:

```text
flavorforge-rg
```

These provide evidence that the Resource Group was successfully created.

---

# 15. Important Learning

A Resource Group is not the same thing as an application server, container registry, or Kubernetes cluster.

The relationship is:

```text
Azure Subscription
        │
        ▼
Resource Group
        │
        ├── ACR
        │
        └── AKS
```

The Resource Group is the **organizational container**.

ACR is the **container image registry**.

AKS is the **managed Kubernetes platform**.

For FlavorForge:

```text
flavorforge-rg
      │
      ├── flavorforgeacr2026ms
      │
      └── flavorforge-aks
```

Understanding this distinction is important when explaining the architecture during the CBC demonstration or an interview.

---

# 16. Result

The FlavorForge Azure Resource Group was established as:

```text
Resource Group:
flavorforge-rg

Region:
East US
```

The Resource Group provided the Azure organizational boundary for the project's cloud infrastructure.

Later Azure stages added:

```text
flavorforge-rg
      │
      ├── Azure Container Registry
      │
      └── Azure Kubernetes Service
```

The Resource Group creation stage was therefore complete before moving to the ACR stage.

---

# 17. Azure Stage Progress

The Azure BUILD-JOURNEY follows this sequence:

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

The current document completed:

```text
02 — Resource Group
```

The next document is:

```text
docs/BUILD-JOURNEY/05-azure/03-acr.md
```

That document will explain how the FlavorForge Azure Container Registry was created, verified, and used to store the Docker images.
