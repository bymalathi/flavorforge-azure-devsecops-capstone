# 4. Step-by-Step Implementation

## Step 1 — Create Azure Resource Group

**Goal:** Create a dedicated Azure Resource Group to host all FlavorForge cloud resources.

### Command

```bash
az group create \
  --name flavorforge-rg \
  --location eastus
```

### Expected Output

```text
{
  "id": "/subscriptions/.../resourceGroups/flavorforge-rg",
  "location": "eastus",
  "name": "flavorforge-rg",
  "properties": {
    "provisioningState": "Succeeded"
  }
}
```

The successful creation of the resource group confirms that Azure is ready to provision all required infrastructure components for the project.

> 📸 **Screenshot 4:** Azure Portal showing the `flavorforge-rg` Resource Group.