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

<img width="1242" height="92" alt="image" src="https://github.com/user-attachments/assets/c0825da8-5e76-473e-a80b-80c253c32885" />
<img width="960" height="402" alt="image" src="https://github.com/user-attachments/assets/8d9dd3ae-e0e9-4ccb-b235-d5f28cddb49f" />
<img width="792" height="226" alt="image" src="https://github.com/user-attachments/assets/4ee9a769-26dc-460d-846c-5bf386996c45" />
<img width="1562" height="1257" alt="image" src="https://github.com/user-attachments/assets/1b4cf5a3-0ebb-45c3-89bf-6f4eb15df219" />
<img width="1320" height="487" alt="image" src="https://github.com/user-attachments/assets/ff732443-cbc1-4ce9-9941-bd6b2663f3e7" />
<img width="937" height="47" alt="image" src="https://github.com/user-attachments/assets/d8fa5b33-bb89-4125-bd1d-718406bd3d21" />
<img width="1357" height="1266" alt="image" src="https://github.com/user-attachments/assets/d91eea68-a799-4450-b85e-453d2f3f8948" />
<img width="665" height="182" alt="image" src="https://github.com/user-attachments/assets/2d3baa9b-f17e-433f-affd-84e13d63c726" />
