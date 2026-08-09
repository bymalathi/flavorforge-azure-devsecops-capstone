# 01 — Azure Account and CLI

## 1. Purpose

Before creating the Azure infrastructure for FlavorForge, the Azure account and command-line environment needed to be configured and verified.

The Azure CLI was used to interact with Azure resources from the local development environment.

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

---

# 2. Azure CLI

The Azure CLI provides command-line access to Azure services.

The CLI was used during the FlavorForge implementation to:

* Authenticate with Azure
* Verify the active Azure account
* List Azure resources
* Work with the Azure Resource Group
* Work with Azure Container Registry
* Work with Azure Kubernetes Service
* Connect the local environment to AKS

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

This opens the Azure authentication flow and authenticates the local CLI session with the Azure account.

The FlavorForge project contains evidence of Azure CLI authentication:

![Azure CLI authentication](/screenshots/azure/01-azure-cli-authenticated.png)

This screenshot provides evidence that the Azure CLI authentication step was completed successfully.

---

# 4. Verify the Active Azure Account

After authentication, the active Azure account can be verified using:

```bash
az account show
```

This command displays information about the currently selected Azure subscription and account context.

FlavorForge also contains evidence of this verification in the Azure DevOps documentation screenshots:


![az account show](/screenshots/enterprise-azure-devops-release-simulation/19-az-account-show.png)


The purpose of this verification was to make sure subsequent Azure CLI commands were executed against the intended Azure subscription.

---

# 5. List Available Azure Subscriptions

The available Azure subscriptions can be viewed using:

```bash
az account list --output table
```

The table format makes it easier to identify:

* Subscription name
* Subscription ID
* Subscription state
* Default subscription

The active subscription should be confirmed before creating or modifying Azure resources.

---

# 6. Azure Region

The FlavorForge Azure resources were created in:

```text
East US
```

The main cloud resources used by FlavorForge were associated with the following environment:

```text
Azure
  │
  └── East US
       │
       └── flavorforge-rg
            ├── Azure Container Registry
            └── Azure Kubernetes Service
```

The Azure portal information for the AKS resource identifies the cluster region as **East US**.

---

# 7. FlavorForge Azure Resource Group

The main FlavorForge Azure resource group is:

```text
flavorforge-rg
```

The resource group acts as the logical container for the Azure resources used by the project.

The architecture is:

```text
Azure Subscription
        │
        ▼
flavorforge-rg
        │
        ├── flavorforge-aks
        │
        └── flavorforgeacr2026ms
```

The Resource Group was created in the Azure stage that follows this document.

This document only establishes the Azure CLI/account context required to work with it.

---

# 8. Verify Resource Groups

Azure Resource Groups can be listed using:

```bash
az group list --output table
```

This provides a quick way to confirm that the expected resource group exists.

For FlavorForge, the expected resource group is:

```text
flavorforge-rg
```

---

# 9. Verify AKS Resources

Azure Kubernetes Service resources can be listed using:

```bash
az aks list --output table
```

For FlavorForge, the AKS cluster created later in the Azure journey is:

```text
flavorforge-aks
```

This command is also useful during later demo preparation to check the current AKS state.

---

# 10. Azure CLI and AKS Credentials

Once the AKS cluster exists, the local machine can obtain Kubernetes credentials using:

```bash
az aks get-credentials \
  --resource-group flavorforge-rg \
  --name flavorforge-aks \
  --overwrite-existing
```

This connects the local `kubectl` configuration to the FlavorForge AKS cluster.

The resulting workflow is:

```text
Azure CLI
     ↓
Azure AKS
     ↓
AKS Credentials
     ↓
kubectl
     ↓
Kubernetes Cluster
```

This command belongs to the later AKS connection stage, but it is important to understand its relationship with Azure CLI.

---

# 11. Verify the Kubernetes Connection

After obtaining the AKS credentials, the Kubernetes connection can be verified with:

```bash
kubectl get nodes
```

A successful response confirms that the local machine can communicate with the AKS cluster.

This is a later-stage verification because the AKS cluster must exist before this command can succeed.

The FlavorForge project contains Kubernetes/Azure evidence for this connection, including:

![](/screenshots/azure/11-connect-local-machine-to-aks.png)

and:


![](/screenshots/azure/28-kubectl-get-nodes.png)


---

# 12. Azure CLI in the FlavorForge Workflow

The Azure CLI became the command-line interface between the local development environment and Azure.

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

This infrastructure was then used by the later CI/CD and GitOps stages.

---

# 13. Azure CLI Verification Evidence

The repository contains Azure CLI and AKS verification screenshots captured during the implementation.

### Azure CLI authentication

![Azure CLI authenticated](/screenshots/azure/01-azure-cli-authenticated.png)

### Azure account verification

![Azure account verification](/screenshots/enterprise-azure-devops-release-simulation/19-az%20account%20show.png)

### Azure version / CLI environment

![Azure CLI version](/screenshots/azure/29-azure-version.png)

### AKS connection

![Connect local machine to AKS](/screenshots/azure/11-connect-local-machine-to-aks.png)

### Kubernetes node verification

![Kubernetes nodes](/screenshots/azure/28-kubectl-get-nodes.png)

These screenshots provide supporting evidence that the Azure CLI environment was configured and subsequently used to authenticate with Azure, connect to the AKS cluster, and verify the Kubernetes nodes.


---

# 14. Azure CLI Commands Used in the Project

The key Azure CLI commands relevant to the FlavorForge workflow are:

### Login

```bash
az login
```

### Verify active account

```bash
az account show
```

### List subscriptions

```bash
az account list --output table
```

### List resource groups

```bash
az group list --output table
```

### List AKS clusters

```bash
az aks list --output table
```

### Connect local machine to AKS

```bash
az aks get-credentials \
  --resource-group flavorforge-rg \
  --name flavorforge-aks \
  --overwrite-existing
```

The commands were used at different points in the overall Azure/Kubernetes workflow.

---

# 15. Important Learning

A key distinction is:

```text
Azure CLI
    ↓
Command-line tool
```

while:

```text
Azure Subscription
    ↓
Billing / resource ownership boundary
```

and:

```text
Resource Group
    ↓
Logical container for related Azure resources
```

and:

```text
AKS
    ↓
Managed Kubernetes service
```

and:

```text
ACR
    ↓
Container image registry
```

These components work together but serve different purposes.

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

The Azure CLI environment was established as the command-line interface for the FlavorForge Azure implementation.

The verified starting point was:

```text
Local Machine
      ↓
Azure CLI
      ↓
Authenticated Azure Account
      ↓
Azure Subscription
      ↓
FlavorForge Azure Infrastructure
```

The Azure resources used by the project were:

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

---

# 17. Azure Stage Progress

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
docs/week-4/BUILD-JOURNEY/05-azure/02-resource-group.md
```

That document will explain how the FlavorForge Azure Resource Group was created and verified.
