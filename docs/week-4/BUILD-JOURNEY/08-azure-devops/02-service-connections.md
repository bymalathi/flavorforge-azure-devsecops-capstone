# 02 — Azure DevOps Service Connections

## 1. What We Wanted

The FlavorForge pipeline needed permission to access the Azure resources used by the project.

The required connections were:

```text
Azure DevOps Pipeline
        │
        ├── Azure Resource Manager
        │
        ├── Azure Container Registry
        │
        └── SonarCloud
```

These connections were created in the Azure DevOps project before configuring the pipeline stages.

---

# 2. Azure Resource Manager Service Connection

The Azure connection created for FlavorForge was:

```text
flavorforge-azure-sc
```

Its type was:

```text
Azure Resource Manager
```

This connection allowed the Azure DevOps pipeline to authenticate against the Azure subscription and work with the FlavorForge Azure resources.

The Azure resources used by the project included:

```text
Resource Group
    ↓
flavorforge-rg

AKS
    ↓
flavorforge-aks

ACR
    ↓
flavorforgeacr2026ms
```

The connection was configured using **Workload Identity Federation** rather than storing a client secret in the pipeline.

---

# 3. Create the Azure Resource Manager Connection

In the Azure DevOps project:

```text
Project
    ↓
Project Settings
    ↓
Service connections
    ↓
New service connection
    ↓
Azure Resource Manager
```

The connection was created for the FlavorForge Azure environment.

The resulting service connection name was:

```text
flavorforge-azure-sc
```

The connection was then available to the Azure DevOps pipeline.

---

# 4. Verify the Azure Connection

The service connection was checked from:

```text
Azure DevOps
    ↓
Project Settings
    ↓
Service connections
```

The expected FlavorForge connection was:

```text
flavorforge-azure-sc
```

The service connection listing also showed the other connections created for the project.

---

# 5. Azure Container Registry Connection

The pipeline also needed access to the FlavorForge Azure Container Registry.

The ACR service connection created for the project was:

```text
flavorforge-acr-connection
```

Its type was:

```text
Docker Registry
```

The registry used by FlavorForge was:

```text
flavorforgeacr2026ms
```

The purpose of this connection was to allow the pipeline to authenticate with ACR when publishing Docker images.

The flow was:

```text
Azure DevOps Pipeline
        ↓
flavorforge-acr-connection
        ↓
Azure Container Registry
        ↓
flavorforgeacr2026ms
```

---

# 6. Configure the ACR Connection

The connection was created from:

```text
Azure DevOps
    ↓
Project Settings
    ↓
Service connections
    ↓
New service connection
    ↓
Docker Registry
```

The resulting connection was:

```text
flavorforge-acr-connection
```

The connection used **Workload Identity Federation with OpenID Connect**.

This avoided putting a long-lived registry password into the Azure DevOps pipeline.

---

# 7. Workload Identity Federation

The ACR connection used Workload Identity Federation.

The authentication flow was:

```text
Azure DevOps Pipeline
        ↓
OpenID Connect
        ↓
Workload Identity Federation
        ↓
Azure Authentication
        ↓
Azure Container Registry
```

The configured WIF issuer was:

```text
https://login.microsoftonline.com/84614013-dd00-4014-9442-d8d3cb4a0002/v2.0
```

The service connection had its own WIF subject identifier associated with the Azure DevOps connection.

This allowed Azure DevOps to authenticate without storing a client secret for the connection.

---

# 8. SonarCloud Service Connection

The project also contained a SonarCloud service connection:

```text
flavorforge-sonarcloud-sc
```

Its purpose was to allow the Azure DevOps pipeline to communicate with SonarCloud during the Code Quality stage.

The service connections created for FlavorForge were therefore:

```text
flavorforge-azure-sc
        ↓
Azure Resource Manager

flavorforge-acr-connection
        ↓
Docker Registry / ACR

flavorforge-sonarcloud-sc
        ↓
SonarCloud
```

---

# 9. Service Connections Used by the Pipeline

The connections were created before the pipeline stages that depended on them.

The overall pipeline relationship was:

```text
Azure DevOps
      │
      ├── flavorforge-azure-sc
      │       ↓
      │    Azure / AKS
      │
      ├── flavorforge-acr-connection
      │       ↓
      │    Azure Container Registry
      │
      └── flavorforge-sonarcloud-sc
              ↓
          SonarCloud
```

---

# 10. Verify Service Connections

The service connections were verified from:

```text
Azure DevOps
    ↓
Project Settings
    ↓
Service connections
```

The FlavorForge service connection listing contained:

```text
flavorforge-acr-connection
flavorforge-azure-sc
flavorforge-sonarcloud-sc
```

This confirmed that the external services required by the pipeline had been configured.

---

# 11. Why These Connections Were Needed

Each connection had a specific purpose in the FlavorForge pipeline.

```text
Azure Resource Manager
        ↓
Azure resources / AKS deployment
```

```text
Docker Registry
        ↓
Push Docker images to ACR
```

```text
SonarCloud
        ↓
Code quality analysis
```

The pipeline could therefore use the appropriate authenticated connection for each stage rather than embedding credentials directly in the YAML.

---

# 12. Result

The Azure DevOps project had the required service connections configured:

```text
Azure DevOps Project
        │
        ├── flavorforge-azure-sc
        │
        ├── flavorforge-acr-connection
        │
        └── flavorforge-sonarcloud-sc
```

The important implementation detail was that the Azure and ACR authentication used **Workload Identity Federation**, allowing the pipeline to authenticate without relying on long-lived client secrets.

---

# 13. Next Step

With the service connections available, the next step was to create the Azure DevOps pipeline configuration:

```text
08-azure-devops/
├── 01-azure-devops-project.md
├── 02-service-connections.md
└── 03-pipeline-setup.md
```

Next:

```text
docs/week-4/BUILD-JOURNEY/08-azure-devops/03-pipeline-setup.md
```
