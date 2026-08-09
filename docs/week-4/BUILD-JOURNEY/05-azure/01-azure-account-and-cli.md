# 01 — Azure Account and CLI

## 1. Purpose

Before creating the Azure infrastructure for FlavorForge, the Azure account and command-line environment needed to be configured and verified.

The **Azure CLI** was used to interact with Azure resources from the local development environment.

The Azure setup was the starting point for the cloud deployment journey:

```text
Local Machine
     ↓
Azure CLI
     ↓
Azure Subscription
     ↓
Resource Group
     ↓
ACR / AKS
```

For FlavorForge, the Azure resources were created in the **East US** region.

This document focuses on the initial Azure account and CLI setup. Commands related to Resource Groups, ACR, and AKS are referenced later only to show how the Azure CLI fits into the complete workflow.

---

# 2. Azure CLI

The **Azure CLI** provides command-line access to Microsoft Azure services.

During the FlavorForge implementation, Azure CLI was used to:

* Authenticate with Azure
* Verify the active Azure subscription
* List Azure resources
* Create and manage the FlavorForge Resource Group
* Work with Azure Container Registry
* Work with Azure Kubernetes Service
* Retrieve AKS credentials
* Connect the local environment to the Kubernetes cluster

The general workflow was:

```text
Azure CLI
    ↓
Azure Authentication
    ↓
Azure Subscription
    ↓
Azure Resources
```

---

# 3. Authenticate with Azure

The Azure CLI login command is:

```bash
az login
```

This starts the Azure authentication flow and authenticates the local CLI session with the Azure account.

The login step established the authenticated Azure CLI session that was subsequently used to create and manage the FlavorForge infrastructure.

The command was:

```bash
az login
```

---

# 4. Verify the Active Azure Account

After authentication, the active Azure account can be verified using:

```bash
az account show
```

This command displays information about the currently selected Azure subscription and account context.

The purpose of this verification was to ensure that subsequent Azure CLI commands were executed against the intended Azure subscription.

The command was:

```bash
az account show
```

---

# 5. List Available Azure Subscriptions

Available Azure subscriptions can be viewed using:

```bash
az account list --output table
```

The table format makes it easier to identify:

* Subscription name
* Subscription ID
* Subscription state
* Default subscription

The active subscription should be confirmed before creating or modifying Azure resources.

The command was:

```bash
az account list --output table
```

---

# 6. Azure CLI Version Verification

The Azure CLI installation can be verified using:

```bash
az version
```

or:

```bash
az --version
```

This confirms that the Azure CLI is installed and available in the local environment.

The Azure CLI version was also captured as part of the implementation evidence.

---

# 7. Azure Region

The FlavorForge Azure resources were created in:

```text
East US
```

The main Azure environment was structured around the FlavorForge Resource Group:

```text
Azure Subscription
       ↓
East US
       ↓
flavorforge-rg
       ├── Azure Container Registry
       └── Azure Kubernetes Service
```

The region is an Azure resource configuration and is not something that needs to be specified when running `az login`.

It becomes relevant when individual Azure resources are created.

---

# 8. FlavorForge Resource Group

The main FlavorForge Azure Resource Group is:

```text
flavorforge-rg
```

The Resource Group acts as the logical container for the Azure resources used by the project.

The resulting structure is:

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

The Resource Group itself is created in the next document:

```text
02 — Resource Group
```

Therefore, this document only establishes the Azure CLI and account context required before creating it.

---

# 9. Verify Resource Groups

Once Resource Groups exist, Azure CLI can list them using:

```bash
az group list --output table
```

For FlavorForge, the expected Resource Group is:

```text
flavorforge-rg
```

### Later-stage reference

This command belongs to the Resource Group verification stage rather than the initial Azure login step.

It is included here only because it is useful for understanding how Azure CLI was used throughout the project.

---

# 10. Azure CLI and Azure Resources

Once authenticated, the same Azure CLI session can be used to work with different Azure services.

The FlavorForge workflow eventually included:

```text
Azure CLI
     │
     ├── Resource Group
     │
     ├── Azure Container Registry
     │
     └── Azure Kubernetes Service
```

Each service has its own Azure CLI command group.

For example:

```text
az group
az acr
az aks
```

This means Azure CLI is the interface used to manage Azure resources; it is not itself an Azure resource.

---

# 11. AKS Commands — Later-Stage Reference

The following commands were used later in the FlavorForge Kubernetes workflow.

They are **not part of the initial Azure account setup**.

They are included here only to show how the Azure CLI eventually connected the local environment to AKS.

### List AKS clusters

```bash
az aks list --output table
```

For FlavorForge, the AKS cluster was:

```text
flavorforge-aks
```

### Obtain AKS credentials

After the AKS cluster was created, credentials were retrieved using:

```bash
az aks get-credentials \
  --resource-group flavorforge-rg \
  --name flavorforge-aks \
  --overwrite-existing
```

This updates the local Kubernetes configuration so that `kubectl` can communicate with the AKS cluster.

The later-stage workflow was:

```text
Azure CLI
     ↓
Azure AKS
     ↓
AKS Credentials
     ↓
Local kubeconfig
     ↓
kubectl
     ↓
Kubernetes Cluster
```

Again, these commands belong to the later AKS stage.

---

# 12. Verify the Kubernetes Connection — Later Stage

After AKS credentials were configured, the Kubernetes connection could be verified using:

```bash
kubectl get nodes
```

A successful response confirms that the local machine can communicate with the AKS cluster.

This command cannot be used during the initial Azure CLI setup because the AKS cluster must already exist.

The correct sequence is:

```text
Azure CLI Setup
      ↓
Resource Group
      ↓
ACR
      ↓
AKS
      ↓
AKS Credentials
      ↓
kubectl get nodes
```

Therefore, `kubectl get nodes` is documented here only as a later-stage reference.

---

# 13. Azure CLI in the FlavorForge Workflow

Azure CLI became the command-line interface between the local development environment and Azure.

The overall relationship was:

```text
Developer Machine
        │
        ▼
     Azure CLI
        │
        ▼
Azure Subscription
        │
        ▼
 flavorforge-rg
        │
        ├───────────────┐
        │               │
        ▼               ▼
       ACR             AKS
        │               │
        │               ▼
        │          Kubernetes
        │
        ▼
 Container Images
```

This infrastructure was later used by the CI/CD and GitOps stages.

---

# 14. Azure CLI Commands Used Throughout the Project

The following commands are relevant to different stages of the FlavorForge Azure workflow.

### Initial Azure setup

```bash
az login
```

```bash
az account show
```

```bash
az account list --output table
```

```bash
az version
```

### Resource Group — later stage

```bash
az group list --output table
```

### AKS — later stage

```bash
az aks list --output table
```

```bash
az aks get-credentials \
  --resource-group flavorforge-rg \
  --name flavorforge-aks \
  --overwrite-existing
```

### Kubernetes verification — later stage

```bash
kubectl get nodes
```

The commands are intentionally separated by stage so that the initial Azure setup is not confused with the later infrastructure and Kubernetes configuration.

---

# 15. Important Learning

Several Azure concepts should be kept separate.

### Azure CLI

```text
Azure CLI
    ↓
Command-line management tool
```

### Azure Subscription

```text
Azure Subscription
    ↓
Resource ownership / billing boundary
```

### Resource Group

```text
Resource Group
    ↓
Logical container for related Azure resources
```

### Azure Container Registry

```text
ACR
    ↓
Container image registry
```

### Azure Kubernetes Service

```text
AKS
    ↓
Managed Kubernetes service
```

These components work together but have different purposes.

For FlavorForge:

```text
Azure CLI
    ↓
Azure Subscription
    ↓
flavorforge-rg
    ├── flavorforgeacr2026ms
    └── flavorforge-aks
```

---

# 16. Verification Result

The initial Azure CLI environment was established as the command-line interface for the FlavorForge Azure implementation.

The starting point was:

```text
Local Machine
      ↓
Azure CLI
      ↓
Authenticated Azure Account
      ↓
Azure Subscription
```

The Azure infrastructure was then created in subsequent stages.

The main FlavorForge Azure resources were:

```text
Resource Group:
flavorforge-rg

Region:
East US

Azure Container Registry:
flavorforgeacr2026ms

Azure Kubernetes Service:
flavorforge-aks
```

The Resource Group, ACR, and AKS resources are documented in their respective BUILD-JOURNEY documents.

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
01 — Azure Account and CLI
```

The next document is:

```text
docs/BUILD-JOURNEY/05-azure/02-resource-group.md
```

That document will explain how the FlavorForge Azure Resource Group was created and verified.

---

# 18. Result

The initial Azure setup established the foundation for the FlavorForge cloud deployment:

```text
Local Machine
      ↓
Azure CLI
      ↓
Azure Authentication
      ↓
Azure Subscription
      ↓
FlavorForge Azure Infrastructure
```

At this point, the environment was ready to proceed to the next Azure stage:

```text
Resource Group
```

The important distinction is:

```text
01 — Azure Account and CLI
        ↓
Authentication and CLI preparation

02 — Resource Group
        ↓
Azure infrastructure creation
```

This keeps the BUILD-JOURNEY chronological and prevents later AKS commands from being incorrectly presented as part of the initial Azure setup.
