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
  "location": "eastus",
  "name": "flavorforge-rg",
  "properties": {
    "provisioningState": "Succeeded"
  }
}
```

<img width="960" height="402" alt="image" src="https://github.com/user-attachments/assets/8d9dd3ae-e0e9-4ccb-b235-d5f28cddb49f" />


### Explanation

The Azure Resource Group serves as the logical container for all cloud resources used throughout the project, including Azure Kubernetes Service (AKS), Azure Container Registry (ACR), networking resources, public IP addresses, and load balancers. Creating the resource group first provides a centralized location for deploying, managing, and monitoring all project resources.

The successful creation of the resource group confirms that Azure is ready to provision all required infrastructure components for the project.

<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/9fbe02da-ceb9-40ee-8b13-488182be9be4" />

<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/d05216a1-2d07-474f-aad9-9b4453353b59" />


