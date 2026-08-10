# 02 — Azure Resource Group

## What we wanted

We wanted to create the Azure Resource Group that would contain the FlavorForge Azure infrastructure.

The Resource Group name was:

```text
flavorforge-rg
```

The Azure region used for FlavorForge was:

```text
East US
```

The Azure CLI region value for East US was:

```text
eastus
```

## Where we did it

Local WSL terminal:

```text
~/flavorforge-azure-devsecops-capstone
```

The Azure CLI was already authenticated from the previous step.

---

## Step 1 — Create the Resource Group

### Command

```bash
az group create \
  --name flavorforge-rg \
  --location eastus
```

### What happened

Azure created the Resource Group:

```text
flavorforge-rg
```

in the:

```text
East US
```

region.

The Resource Group became the Azure resource boundary used for the FlavorForge infrastructure.

### Verify

```bash
az group show \
  --name flavorforge-rg
```

### Screenshot

![](/screenshots/azure/02-resource-group-created.png)

### Result

The FlavorForge Resource Group was created successfully.

```text
Resource Group: flavorforge-rg
Region: East US
```

---

## Step 2 — Verify the Resource Group from Azure CLI

### Command

```bash
az group list --output table
```

### What happened

Azure CLI displayed the available Resource Groups in table format.

The FlavorForge Resource Group appeared as:

```text
flavorforge-rg
```

### Verify

```bash
az group show \
  --name flavorforge-rg
```

### Screenshot

![](/screenshots/azure/flavorforge-rg-microsoft-azure-resource-group.png)

### Result

The Resource Group was visible and available in Azure.

---

## Step 3 — Verify the Resource Group in Azure Portal

### What we wanted

We wanted to confirm that the Resource Group created through Azure CLI was also visible in the Azure Portal.

### What happened

The Azure Portal showed the FlavorForge Resource Group:

```text
flavorforge-rg
```

### Screenshot

![](/screenshots/azure/flavorforge-rg-microsoft-azure-resource-group.png)

### Result

The Resource Group was successfully verified in the Azure Portal.

---

## Step 4 — Confirm the Azure Resource Structure

At this stage, the Resource Group had been created.

The FlavorForge Azure build then continued inside this Resource Group:

```text
Azure Subscription
        ↓
flavorforge-rg
        ↓
Azure Infrastructure
```

The next Azure resource to be created was the Azure Container Registry.

The build sequence was:

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

### Result

The Azure Resource Group stage was complete.

---

## Final Result

The FlavorForge Azure Resource Group was successfully created and verified.

```text
Resource Group
flavorforge-rg

Region
East US
```

The next step was to create the FlavorForge Azure Container Registry:

```text
flavorforgeacr2026ms
```

Next document:

```text
docs/BUILD-JOURNEY/05-azure/03-acr.md
```
