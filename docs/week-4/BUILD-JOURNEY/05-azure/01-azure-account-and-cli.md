# 01 — Azure Account and CLI

## What we wanted

Before creating the FlavorForge Azure infrastructure, we needed to prepare the local development environment to work with Azure.

The Azure CLI was used from the local WSL environment to authenticate with Azure and work with the Azure subscription.

The Azure setup started with:

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

The FlavorForge Azure resources were created in the **East US** region.

---

## Where we did it

The Azure CLI commands were run from the local WSL terminal in the FlavorForge repository:

```text
~/flavorforge-azure-devsecops-capstone
```

The repository was already available locally before starting the Azure infrastructure setup.

---

# Step 1 — Authenticate with Azure

## What we wanted

We wanted to authenticate the local Azure CLI session with the Azure account that would be used for FlavorForge.

## Command

Run:

```bash
az login
```

## What happened

The Azure authentication flow was started.

After successful authentication, the local Azure CLI session was connected to the Azure account.

## Verify

Run:

```bash
az account show
```

This displayed the currently active Azure account and subscription context.

## Screenshot

![Azure CLI authenticated](/screenshots/azure/01-azure-cli-authenticated.png)

## Result

The local Azure CLI session was authenticated successfully and was ready for the FlavorForge Azure setup.

---

# Step 2 — Verify the Azure Subscription

## What we wanted

We wanted to confirm the Azure subscriptions available to the authenticated account before creating any FlavorForge resources.

## Command

Run:

```bash
az account list --output table
```

## What happened

Azure displayed the available subscriptions in table format.

The table provided the subscription information needed to confirm the Azure environment being used for FlavorForge.

## Verify

Run:

```bash
az account show
```

The active subscription and account context were displayed.

## Result

The Azure account and subscription context were verified successfully.

The environment was ready to create the FlavorForge Azure resources.

---

# Step 3 — Verify the Azure CLI Installation

## What we wanted

We wanted to confirm that the Azure CLI was installed correctly and available from the local WSL environment.

## Command

Run:

```bash
az version
```

## What happened

The Azure CLI version information was displayed in the terminal.

This confirmed that the Azure CLI command was available from the local development environment.

## Screenshot

![Azure CLI version verification](/screenshots/azure/29-azure-version.png)

## Result

The Azure CLI was installed and working correctly in the FlavorForge development environment.

---

# Step 4 — Confirm the Azure Region

The FlavorForge Azure infrastructure was created in:

```text
East US
```

The Azure resource structure used for FlavorForge was:

```text
Azure Subscription
        ↓
     East US
        ↓
 flavorforge-rg
        ├── flavorforgeacr2026ms
        └── flavorforge-aks
```

The region is specified when the individual Azure resources are created. It is not part of the `az login` command.

The Resource Group, ACR, and AKS creation steps are documented separately in the following BUILD-JOURNEY documents.

---

# Step 5 — Confirm the FlavorForge Azure Build Sequence

At this point, the local environment had the Azure CLI installed and the Azure account authenticated.

The Azure infrastructure was then built in the following order:

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

The main FlavorForge Azure resources created during these stages were:

```text
Resource Group
flavorforge-rg

Azure Container Registry
flavorforgeacr2026ms

Azure Kubernetes Service
flavorforge-aks
```

The actual repository contains these six Azure BUILD-JOURNEY documents in this sequence.

---

# Step 6 — Move to Resource Group Creation

The Azure CLI and account setup was now complete.

The next task was to create the main FlavorForge Resource Group:

```text
flavorforge-rg
```

The Resource Group creation belongs to the next BUILD-JOURNEY document:

```text
docs/week-4/BUILD-JOURNEY/05-azure/02-resource-group.md
```

The Resource Group will then provide the Azure resource container in which the FlavorForge ACR and AKS resources are created.

---

# Result

The initial Azure environment was prepared successfully.

We completed:

```text
Azure CLI
    ↓
Azure Authentication
    ↓
Azure Account Verification
    ↓
Azure Subscription Verification
    ↓
Azure CLI Verification
```

The environment was ready for the next stage of the FlavorForge cloud setup:

```text
02 — Resource Group
```

The next resource to create was:

```text
flavorforge-rg
```
