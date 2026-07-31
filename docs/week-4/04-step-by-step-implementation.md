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

---



# Step 2 — Register Azure Container Registry Resource Provider

### Goal

Register the Azure Container Registry (ACR) resource provider to enable Azure Container Registry services within the Azure subscription.

### Command

```bash
az provider register \
  --namespace Microsoft.ContainerRegistry

az provider show \
  --namespace Microsoft.ContainerRegistry \
  --query registrationState \
  --output tsv
```

### Expected Output

```text
Registered
```

### Explanation

Azure services require their corresponding resource providers to be registered before they can be used. Registering the **Microsoft.ContainerRegistry** provider enables the creation and management of Azure Container Registry resources within the subscription. The registration status is verified before proceeding with ACR creation.

>  Azure CLI showing the `Microsoft.ContainerRegistry` provider registration status as **Registered**.

<img width="792" height="226" alt="image" src="https://github.com/user-attachments/assets/6c26beb8-80aa-4d10-bed7-df49df7c48e0" />


---


# Step 3 — Create Azure Container Registry (ACR)

### Goal

Create an Azure Container Registry (ACR) to securely store and manage Docker container images used by the FlavorForge application.

### Command

```bash
az acr create \
  --resource-group flavorforge-rg \
  --name flavorforgeacr2026ms \
  --sku Basic \
  --admin-enabled true
```

### Expected Output

```text
{
  "name": "flavorforgeacr2026ms",
  "location": "eastus",
  "sku": {
    "name": "Basic"
  },
  "adminUserEnabled": true,
  "provisioningState": "Succeeded"
}
```

### Explanation

Azure Container Registry (ACR) serves as the private Docker image repository for the project. After the application images are built by the Azure DevOps pipeline, they are pushed to ACR before being deployed to Azure Kubernetes Service (AKS). Enabling the admin user simplifies authentication during development and testing.


<img width="1562" height="1257" alt="image" src="https://github.com/user-attachments/assets/f4961ebf-4051-4880-a202-ecfa240e4c14" />


---



# Step 4 — Apply Tags to the Azure Resource Group

### Goal

Apply resource tags to the Azure Resource Group for easier identification, organization, and resource management.

### Command

```bash
az tag create \
  --resource-id $(az group show \
  --name flavorforge-rg \
  --query id \
  --output tsv) \
  --tags \
  Project=FlavorForge \
  Environment=Dev \
  Owner=Malathi
```

### Expected Output

```text
{
  "properties": {
    "tags": {
      "Project": "FlavorForge",
      "Environment": "Dev",
      "Owner": "Malathi"
    }
  }
}
```

### Explanation

Azure resource tags provide metadata that helps organize and manage cloud resources. In this project, tags were applied to identify the project name, deployment environment, and resource owner. Tagging resources is a DevOps best practice that simplifies resource management, governance, reporting, and cost tracking.

>  Azure CLI showing the successful creation of tags for the `flavorforge-rg` Resource Group.

<img width="1320" height="487" alt="image" src="https://github.com/user-attachments/assets/d1bafd7d-58e5-4483-868a-d3319651c187" />



---

# Step 5 — Authenticate with Azure Container Registry (ACR)

### Goal

Authenticate the local Docker client with Azure Container Registry (ACR) to enable pushing and pulling container images.

### Command

```bash id="nxxuhr"
az acr login \
  --name flavorforgeacr2026ms
```

### Expected Output

```text id="uozq9s"
Login Succeeded
```

### Explanation

Before Docker images can be pushed to Azure Container Registry, authentication is required. The `az acr login` command securely authenticates the local Docker client with the registry, allowing Azure DevOps and local development environments to store and retrieve container images.

>  Successful authentication with the `flavorforgeacr2026ms` Azure Container Registry.

<img width="937" height="47" alt="image" src="https://github.com/user-attachments/assets/eeda51a6-24d5-452e-89de-f811b9d5d238" />


---


# Step 6 — Create Azure Kubernetes Service (AKS) Cluster

### Goal

Provision an Azure Kubernetes Service (AKS) cluster to host the FlavorForge application and provide a managed Kubernetes environment for container orchestration.

### Command

```bash
az aks create \
  --resource-group flavorforge-rg \
  --name flavorforge-aks \
  --node-count 2 \
  --node-vm-size Standard_D2as_v7 \
  --generate-ssh-keys
```

### Expected Output

```text
{
  "name": "flavorforge-aks",
  "location": "eastus",
  "kubernetesVersion": "...",
  "provisioningState": "Succeeded",
  "powerState": {
    "code": "Running"
  }
}
```

### Explanation

Azure Kubernetes Service (AKS) provides a managed Kubernetes environment without requiring manual control plane management. A two-node cluster was created to host the frontend and backend workloads, enabling scalable, highly available application deployments.

>  Successful creation of the `flavorforge-aks` Kubernetes cluster.

<img width="1357" height="1266" alt="image" src="https://github.com/user-attachments/assets/594db48a-78a5-4088-b907-29466915f342" />


---



# Step 7 — Connect the Local Machine to the AKS Cluster

### Goal

Configure `kubectl` to communicate with the Azure Kubernetes Service (AKS) cluster from the local development machine.

### Command

```bash
az aks get-credentials \
  --resource-group flavorforge-rg \
  --name flavorforge-aks \
  --overwrite-existing

kubectl get nodes
```

### Expected Output

```text
Merged "flavorforge-aks" as current context in /home/<username>/.kube/config

NAME                                STATUS   ROLES    AGE   VERSION
aks-nodepool1-xxxxxxxx-vmss000000   Ready    <none>   xxm   v1.35.6
aks-nodepool1-xxxxxxxx-vmss000001   Ready    <none>   xxm   v1.35.6
```

### Explanation

The `az aks get-credentials` command downloads the Kubernetes cluster credentials and merges them into the local kubeconfig file. This enables `kubectl` to manage the AKS cluster directly. Running `kubectl get nodes` verifies that the connection is successful and that all worker nodes are in the **Ready** state.

> Successful connection to the AKS cluster showing all worker nodes in the **Ready** state.

<img width="867" height="250" alt="image" src="https://github.com/user-attachments/assets/53c6581a-4124-4e3d-bb1c-0d415a02b669" />


---


---

# Step 8 — Build the Backend Docker Image

### Goal

Build the Docker image for the FlavorForge backend application using a multi-stage Dockerfile.

### Command

```bash
docker build \
  -t flavorforge-backend:1.0 \
  ./backend
```

### Expected Output

```text
...
Successfully built <IMAGE_ID>
Successfully tagged flavorforge-backend:1.0
```

### Explanation

The backend application is containerized using Docker to provide a consistent runtime environment across development, testing, and production. The generated image is later pushed to Azure Container Registry (ACR), where it becomes available for deployment to Azure Kubernetes Service (AKS).

>  Successful backend Docker image build.

<img width="1106" height="841" alt="image" src="https://github.com/user-attachments/assets/f14938f7-cc95-46f7-9510-c12c1878f1c7" />


---


# 4. Step-by-Step Implementation

## Azure Infrastructure

✅ Step 1 – Create Azure Resource Group

✅ Step 2 – Register Azure Container Registry Provider

✅ Step 3 – Create Azure Container Registry

✅ Step 4 – Apply Resource Tags

✅ Step 5 – Authenticate with Azure Container Registry

✅ Step 6 – Create Azure Kubernetes Service

✅ Step 7 – Connect Local Machine to AKS

---

## Docker Containerization

### Step 8 – Build Backend Docker Image

<img width="1106" height="841" alt="image" src="https://github.com/user-attachments/assets/8c20f32a-ecd4-4f11-868a-d5721c90cc20" />


---

### Step 9 – Verify Backend Container

<img width="1642" height="295" alt="image" src="https://github.com/user-attachments/assets/cca70409-f17b-477d-ac38-2ef37b409273" />


---

### Step 10 – Build Frontend Docker Image

Screenshot

<img width="1740" height="1112" alt="image" src="https://github.com/user-attachments/assets/ddfc15e2-e842-4932-b80e-dacead5db68b" />


---

### Step 11 – Verify Docker Images

<img width="1685" height="327" alt="image" src="https://github.com/user-attachments/assets/323e68af-b676-496d-9ceb-124508f57992" />


---

## Azure Container Registry

### Step 12 – Tag Backend Image

<img width="2212" height="467" alt="image" src="https://github.com/user-attachments/assets/85ae5421-f7d4-48d2-bc0b-72e7027d0d08" />


---

### Step 13 – Push Images to Azure Container Registry

<img width="1273" height="1085" alt="image" src="https://github.com/user-attachments/assets/5ae97dc4-cbb0-4b3b-bde9-22db52477c26" />


---

### Step 14 – Verify Images inside ACR

<img width="1908" height="958" alt="image" src="https://github.com/user-attachments/assets/95bcd221-ad38-488c-b2c0-dc184a452166" />


---

## Azure DevOps

### Step 15 – Create Azure DevOps Project

<img width="1732" height="936" alt="image" src="https://github.com/user-attachments/assets/5790a19a-9d7b-438f-a423-66ea9277037d" />


---

### Step 16 – Configure Service Connections

<img width="2155" height="452" alt="image" src="https://github.com/user-attachments/assets/97b7091d-26cc-4260-a9aa-7ce48f19f8da" />


---

### Step 17 – Configure Azure Pipeline

<img width="2557" height="1222" alt="image" src="https://github.com/user-attachments/assets/f1fbcbfd-d995-40e6-b606-4e20f5b200da" />


---

### Step 18 – Execute Multi-Stage Pipeline

<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/d9f30a71-b8e2-4ac2-9fe9-183d5b8c3a69" />
<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/b1308add-c2a1-4967-afde-eae662d8c847" />


---

### Step 19 – Execute Unit Tests

<img width="827" height="1045" alt="image" src="https://github.com/user-attachments/assets/edc0e431-35fd-400e-ba2f-e748b9d44942" />


---

### Step 20 – SonarCloud Analysis

<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/5a686dd3-5612-4b14-b4be-0bd825194c3d" />


---

### Step 21 – Publish Docker Images

<img width="1920" height="1304" alt="image" src="https://github.com/user-attachments/assets/db1378c5-6c91-4085-bf48-c0fb5551f64c" />
<img width="1920" height="1304" alt="image" src="https://github.com/user-attachments/assets/4ea5f604-9a2b-4783-9fc6-58e4229f6f14" />


---

## Kubernetes Deployment

### Step 22 – Deploy Kubernetes Manifests

<img width="965" height="52" alt="image" src="https://github.com/user-attachments/assets/4c07b94e-ffac-4a06-bb59-336bef34a3b3" />
<img width="927" height="66" alt="image" src="https://github.com/user-attachments/assets/dcc47853-9227-4757-be50-64e5f02362cc" />
<img width="922" height="65" alt="image" src="https://github.com/user-attachments/assets/e553e00f-c9f4-4e6a-877b-3c8cf5a2d37f" />
<img width="2305" height="1132" alt="image" src="https://github.com/user-attachments/assets/3ca37155-9823-4621-be47-931302528333" />


---

### Step 23 – Verify Pods and Services

<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/f918778b-8370-45d0-9427-20b68f18b60d" />
<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/830e9206-8eaf-4c36-8a66-7e1f7e76db04" />
<img width="2262" height="991" alt="image" src="https://github.com/user-attachments/assets/ed10ab3d-ce35-4650-8a16-9b46c074b8be" />
<img width="2272" height="845" alt="image" src="https://github.com/user-attachments/assets/a13a7fd4-a2da-45df-8c28-53c553102bf2" />
<img width="2262" height="1157" alt="image" src="https://github.com/user-attachments/assets/b8006d13-42f7-40c3-a8ff-670583e6a736" />
<img width="2236" height="1162" alt="image" src="https://github.com/user-attachments/assets/aaf77a20-b4a5-49ae-b054-a65022b8e956" />


---

### Step 24 – Configure NGINX Ingress

<img width="1197" height="617" alt="image" src="https://github.com/user-attachments/assets/49f594cd-37e1-472a-910f-62d039a3ba2f" />


---

### Step 25 – Verify Application

<img width="2560" height="3392" alt="image" src="https://github.com/user-attachments/assets/c6f5e837-7686-4c80-b48f-4b25152ca55f" />


---

## GitOps

### Step 26 – Configure Argo CD

<img width="2560" height="2769" alt="image" src="https://github.com/user-attachments/assets/2087eece-33ba-487a-89de-4a0f987ac69a" />


---

### Step 27 – Verify GitOps Synchronization

<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/ba8a2abf-b74c-4d64-92a9-48353e949517" />

---

## Final Validation

### Step 28 – Verify Kubernetes Resources

Screenshot

<img width="2557" height="1122" alt="image" src="https://github.com/user-attachments/assets/677269ba-45e3-4c25-89ca-e7b9d8144671" />


---

### Step 29 – Verify Azure Resources

<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/fa3f85bf-66f8-4cf6-b109-fe9df7ff0cf8" />


---

### Step 30 – Verify Production Application

<img width="2560" height="3392" alt="image" src="https://github.com/user-attachments/assets/2981e31e-24c7-4c84-87a9-85806000604e" />
<img width="622" height="427" alt="image" src="https://github.com/user-attachments/assets/14e87a78-8648-4155-a899-a5e15b9917b6" />


---


---

# Step 9 — Verify the Backend Docker Container

### Goal

Verify that the backend Docker container starts successfully and the Node.js application is running correctly inside the container.

### Command

```bash
docker run -d \
  --name flavorforge-backend \
  -p 3000:3000 \
  flavorforge-backend:1.0

docker ps

curl http://localhost:3000/api/health
```

### Expected Output

```text
CONTAINER ID   IMAGE                     STATUS
xxxxxxxxxxxx   flavorforge-backend:1.0   Up

{
  "status": "UP",
  "application": "FlavorForge Backend",
  "version": "1.0"
}
```

### Explanation

After building the Docker image, the backend container is started locally to verify that the application launches successfully. The `docker ps` command confirms that the container is running, while the health endpoint validates that the backend API is accessible before the image is published to Azure Container Registry.

>  Backend Docker container running successfully and responding to the health endpoint.

---

### Screenshot(s) to use

Use these from your repository:

<img width="1642" height="295" alt="image" src="https://github.com/user-attachments/assets/1df75c9a-4873-4421-9d1f-5e5334ac9e6e" />

<img width="1127" height="312" alt="image" src="https://github.com/user-attachments/assets/1b07f673-3c66-43f8-a669-3fe13b588d60" />


These two screenshots together provide evidence that:

1. The container is running.
2. The backend API is healthy.

---


# Step 10 — Build the Frontend Docker Image

### Goal

Build the Docker image for the FlavorForge React frontend using a multi-stage Dockerfile optimized for production deployment.

### Command

```bash
docker build \
  -t flavorforge-frontend:1.0 \
  ./frontend
```

### Expected Output

```text
...
Successfully built <IMAGE_ID>
Successfully tagged flavorforge-frontend:1.0
```

### Explanation

The frontend application is containerized using a multi-stage Docker build. During the build process, the React application is compiled into optimized static assets, which are then served using an NGINX web server. This approach produces a lightweight production-ready image suitable for deployment to Azure Kubernetes Service (AKS).

> Successful build of the FlavorForge frontend Docker image.

<img width="1740" height="1112" alt="image" src="https://github.com/user-attachments/assets/93ba8949-dfa3-4991-8775-a5dcac51c10e" />



---

## Step 11 — Verify Docker Images

### Goal

Verify that both backend and frontend Docker images have been successfully created and are available in the local Docker image repository.

### Command

```bash
docker images
```

### Expected Output

```text
REPOSITORY               TAG      IMAGE ID       SIZE

flavorforge-backend      1.0      xxxxxxxxx      xxxMB
flavorforge-frontend     1.0      xxxxxxxxx      xxxMB
```

### Explanation

The `docker images` command lists all locally available Docker images. Verifying both the backend and frontend images confirms that the containerization process completed successfully and that the images are ready to be tagged and pushed to Azure Container Registry.

>  Docker images showing the successfully built backend and frontend container images.

<img width="1685" height="327" alt="image" src="https://github.com/user-attachments/assets/5a6215ca-1a6c-4805-87e4-950c5bfdc0d5" />


---

# Step 9 — Configure Azure DevOps Service Connections

## Goal

Configure secure service connections between Azure DevOps and Azure resources so that the CI/CD pipeline can authenticate and deploy applications without embedding credentials in the pipeline.

---

## Azure Resource Manager Service Connection

This service connection is used by Azure DevOps to authenticate with the Azure subscription and manage Azure resources such as Azure Kubernetes Service (AKS).

**Configuration**

* Connection Type: Azure Resource Manager
* Authentication Method: Workload Identity Federation
* Subscription: Azure subscription 1
* Resource Group: `flavorforge-rg`
* Service Connection Name: `flavorforge-azure-sc`

---

## Azure Container Registry Service Connection

This service connection allows Azure DevOps to securely push Docker images to Azure Container Registry.

**Configuration**

* Registry: `flavorforgeacr2026ms.azurecr.io`
* Service Connection Name: `flavorforge-acr-connection`

---

## Why This Step Is Required

Azure DevOps uses service connections to securely communicate with Azure resources. These connections eliminate the need to store usernames or passwords inside the pipeline and enable authenticated deployments to Azure services.

---

## Evidence

<img width="2546" height="1226" alt="image" src="https://github.com/user-attachments/assets/11c73397-5d8f-4317-8023-d708455678cc" />
<img width="2555" height="1221" alt="image" src="https://github.com/user-attachments/assets/0403605e-e5b7-4e93-9b4f-58f3b4369146" />
<img width="2556" height="1227" alt="image" src="https://github.com/user-attachments/assets/42568df7-dd4d-4ca0-9889-948d942ad026" />
<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/be3b3f52-d972-4cf2-8c91-1a0bf76f7cd0" />
<img width="2155" height="452" alt="image" src="https://github.com/user-attachments/assets/864f998b-33cf-4fd4-ae3b-bac5266f1d5a" />
<img width="1195" height="1041" alt="image" src="https://github.com/user-attachments/assets/eefcc617-532c-4e12-9c4a-b6f3c43011d8" />
<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/4b703f8e-672c-4587-80d6-f2c265089482" />


---

## Result

Azure DevOps was successfully configured with secure service connections for Azure Resource Manager and Azure Container Registry. These connections are used throughout the CI/CD pipeline to build container images, push them to Azure Container Registry, and deploy the application to Azure Kubernetes Service.

---

# Step 9 — Configure Azure DevOps Service Connections

## Goal

Configure secure service connections between Azure DevOps and Azure resources so that the CI/CD pipeline can authenticate and deploy applications without storing credentials inside the pipeline.

---

## Azure Resource Manager Service Connection

This service connection allows Azure DevOps to authenticate with the Azure subscription and manage Azure resources such as Azure Kubernetes Service (AKS).

### Configuration

- **Connection Type:** Azure Resource Manager
- **Authentication Method:** Workload Identity Federation
- **Subscription:** Azure subscription 1
- **Resource Group:** `flavorforge-rg`
- **Service Connection Name:** `flavorforge-azure-sc`

---

## Azure Container Registry Service Connection

This service connection enables Azure DevOps to securely push Docker images to Azure Container Registry.

### Configuration

- **Registry:** `flavorforgeacr2026ms.azurecr.io`
- **Service Connection Name:** `flavorforge-acr-connection`

---

## Why This Step Is Required

Azure DevOps service connections provide secure authentication between Azure DevOps and Azure resources. Using Workload Identity Federation eliminates the need to store usernames, passwords, or service principal secrets inside the CI/CD pipeline while allowing automated deployments to Azure Kubernetes Service and Azure Container Registry.

---

## Evidence

Insert the following screenshots:

<img src="../../screenshots/Pipeline/2-service connection.png" alt="Create Service Connection" width="100%">

<img src="../../screenshots/Pipeline/3-Azure resource manager.png" alt="Azure Resource Manager Connection" width="100%">

<img src="../../screenshots/Pipeline/4-New Azure service connection.png" alt="New Azure Service Connection" width="100%">

<img src="../../screenshots/Pipeline/4.1-New Azure service connection.png" alt="Configure Azure Service Connection" width="100%">

<img src="../../screenshots/Pipeline/11-service connections.png" alt="Configured Service Connections" width="100%">

<img src="../../screenshots/Pipeline/12-acr & aks.png" alt="ACR and AKS Service Connections" width="100%">

---

## Result

Azure DevOps was successfully configured with secure service connections for Azure Resource Manager and Azure Container Registry. These authenticated connections are used by the CI/CD pipeline to build Docker images, push them to Azure Container Registry, and deploy the FlavorForge application to Azure Kubernetes Service.

---

# Step 10 — Configure Azure DevOps Multi-Stage Pipeline

## Goal

Create an Azure DevOps multi-stage YAML pipeline to automate the complete DevSecOps workflow, including application build, testing, security scanning, Docker image creation, image publishing, and Kubernetes deployment.

---

## Pipeline Configuration

The pipeline definition is stored in the project root as:

```text
azure-pipelines.yml
```

The pipeline is connected to the GitHub repository and is automatically triggered whenever changes are pushed to the main branch.

---

## Pipeline Stages

The Azure DevOps pipeline consists of the following stages:

1. Build
2. Test
3. Code Quality Analysis (SonarCloud)
4. Security Scan (Trivy)
5. Docker Image Build
6. Publish Images to Azure Container Registry
7. Deploy to Development
8. Deploy to QA
9. Deploy to Production
10. Release Summary

---

## Why This Step Is Required

A multi-stage CI/CD pipeline automates software delivery by validating code quality, performing security checks, building container images, publishing artifacts, and deploying applications consistently across multiple environments.

---

## Evidence

Insert the following screenshots:

<img src="../../screenshots/Pipeline/5-Click New Pipeline..png" alt="Create New Pipeline" width="100%">

<img src="../../screenshots/Pipeline/6-Pipelines-Run.png" alt="Pipeline Execution Started" width="100%">

<img src="../../screenshots/Pipeline/7-test.png" alt="Pipeline Test Stage" width="100%">

<img src="../../screenshots/Pipeline/8-Pipelines-Run-Pass.png" alt="Pipeline Completed Successfully" width="100%">

<img src="../../screenshots/Pipeline/9-Advance-Pipelines-Run-Pass.png" alt="Advanced Pipeline Execution" width="100%">

<img src="../../screenshots/Pipeline/13-Pipelines-Run.png" alt="Final Pipeline Run" width="100%">

---

## Result

The Azure DevOps multi-stage pipeline was successfully configured and executed. The pipeline automated the complete DevSecOps workflow from source code validation to production deployment, ensuring repeatable, secure, and reliable software delivery.

---

# Step 11 — Configure Azure DevOps Environments and Approvals

## Goal

Configure Development, QA, and Production environments with deployment approvals to simulate an enterprise-grade release management process.

---

## Environment Configuration

The following deployment environments were created in Azure DevOps:

- Development
- QA
- Production

Each environment represents a separate deployment stage in the CI/CD pipeline.

---

## Manual Approval Configuration

Manual approval gates were configured for QA and Production environments to ensure that deployments are validated before progressing to the next stage.

Approval checks simulate the release approval process commonly followed in enterprise DevOps environments.

---

## Variable Groups

Environment-specific Variable Groups were created to manage deployment configuration separately for each environment.

Examples include:

- Development Variables
- QA Variables
- Production Variables

---

## Why This Step Is Required

Enterprise CI/CD pipelines require controlled deployments across multiple environments. Environment approvals and variable groups improve deployment security, reduce configuration errors, and ensure that production releases are reviewed before deployment.

---

## Evidence

<img src="../../screenshots/Enterprise Azure DevOps Release Simulation/1-Azure DevOps Environments.png" alt="Azure DevOps Environments" width="100%">

<img src="../../screenshots/Enterprise Azure DevOps Release Simulation/1.2-Dev-QA-Prod-Azure DevOps Environments.png" alt="Development QA Production Environments" width="100%">

<img src="../../screenshots/Enterprise Azure DevOps Release Simulation/2-Library.png" alt="Variable Groups Library" width="100%">

<img src="../../screenshots/Enterprise Azure DevOps Release Simulation/2-qavariab;es.png" alt="QA Variable Group" width="100%">

<img src="../../screenshots/Enterprise Azure DevOps Release Simulation/2-prod variab;es.png" alt="Production Variable Group" width="100%">

<img src="../../screenshots/Enterprise Azure DevOps Release Simulation/3-Approvals.png" alt="Deployment Approvals" width="100%">

<img src="../../screenshots/Enterprise Azure DevOps Release Simulation/4.3-Approvals-prod.png" alt="Production Approval Gate" width="100%">

---

## Result

Azure DevOps environments, approval gates, and variable groups were successfully configured. The CI/CD pipeline now supports controlled deployments across Development, QA, and Production environments following enterprise DevOps best practices.

---

# Step 12 — Integrate SonarCloud for Code Quality Analysis

## Goal

Integrate SonarCloud into the Azure DevOps pipeline to automatically analyze source code quality, detect code smells, identify bugs, measure test coverage, and enforce quality gates during every pipeline execution.

---

## SonarCloud Configuration

SonarCloud was configured using the Azure DevOps extension and integrated into the pipeline.

The analysis includes:

- Static Code Analysis
- Code Smells Detection
- Bug Detection
- Security Hotspots
- Test Coverage Analysis
- Quality Gate Validation

The SonarCloud analysis executes automatically during every pipeline run.

---

## Why This Step Is Required

Continuous code quality analysis helps identify issues early in the development lifecycle. Integrating SonarCloud into the CI/CD pipeline improves maintainability, reliability, and overall software quality while preventing poor-quality code from progressing through the deployment pipeline.

---

## Evidence


<img src="../../screenshots/Enterprise Azure DevOps Release Simulation/15-Extensions-sonarcloud.png" alt="SonarCloud Extension Installed" width="100%">

<img src="../../screenshots/Enterprise Azure DevOps Release Simulation/16-code coverage.png" alt="SonarCloud Code Coverage Report" width="100%">

---

## Result

SonarCloud was successfully integrated into the Azure DevOps pipeline. Every pipeline execution now performs automated static code analysis, evaluates code quality, measures test coverage, and validates quality gates before deployment.

---

# Step 13 — Build and Publish Docker Images to Azure Container Registry

## Goal

Build Docker images for the FlavorForge frontend and backend applications and publish them to Azure Container Registry (ACR) for Kubernetes deployments.

---

## Docker Build Process

The Azure DevOps pipeline automatically builds container images for:

- FlavorForge Frontend
- FlavorForge Backend

Each build generates a uniquely versioned Docker image.

---

## Image Publishing

After a successful build, the pipeline pushes the Docker images to Azure Container Registry.

**Container Registry**

```text
flavorforgeacr2026ms.azurecr.io
```

Published repositories include:

- flavorforge-frontend
- flavorforge-backend

---

## Why This Step Is Required

Azure Kubernetes Service pulls application images directly from Azure Container Registry during deployment. Publishing versioned container images ensures consistent, traceable, and repeatable application deployments across all environments.

---

## Evidence

<img src="../../screenshots/Enterprise Azure DevOps Release Simulation/13-ACR-flavorforge-backend.png" alt="Backend Image in Azure Container Registry" width="100%">

<img src="../../screenshots/Enterprise Azure DevOps Release Simulation/13.1-ACR-flavorforge-frontend.png" alt="Frontend Image in Azure Container Registry" width="100%">

---

## Result

The Azure DevOps pipeline successfully built Docker images for both the frontend and backend applications and published them to Azure Container Registry. These versioned images are used by Azure Kubernetes Service during automated deployments.

---

# Step 14 — Deploy the Application to Azure Kubernetes Service (AKS)

## Goal

Deploy the FlavorForge application to Azure Kubernetes Service (AKS) using Kubernetes manifests and Kustomize overlays for Development, QA, and Production environments.

---

## Deployment Process

The Azure DevOps pipeline deploys the application to AKS after successfully completing the build, testing, code quality, security scanning, and image publishing stages.

The deployment includes:

- Backend Deployment
- Frontend Deployment
- Kubernetes Services
- ConfigMaps
- Secrets
- Horizontal Pod Autoscaler (HPA)
- Ingress Controller

Kustomize overlays are used to manage environment-specific configurations for Development, QA, and Production.

---

## Why This Step Is Required

Azure Kubernetes Service provides a scalable and highly available platform for running containerized applications. Kubernetes automates container scheduling, scaling, rolling updates, and self-healing to ensure reliable application deployment and operation.

---

## Evidence

<img src="../../screenshots/Enterprise Azure DevOps Release Simulation/5-kubectl get svc -n flavorforge-de.png" alt="Development Services" width="100%">

<img src="../../screenshots/Enterprise Azure DevOps Release Simulation/6-kubectl get all -n flavorforge-dev.png" alt="Development Kubernetes Resources" width="100%">

<img src="../../screenshots/Enterprise Azure DevOps Release Simulation/9-Services.png" alt="Kubernetes Services" width="100%">

<img src="../../screenshots/Enterprise Azure DevOps Release Simulation/11-Production ingress.png" alt="Production Ingress" width="100%">

<img src="../../screenshots/Enterprise Azure DevOps Release Simulation/12-Ingress controller.png" alt="NGINX Ingress Controller" width="100%">

---

## Result

The FlavorForge application was successfully deployed to Azure Kubernetes Service. Kubernetes manages the application across Development, QA, and Production environments using deployments, services, ingress, autoscaling, and environment-specific Kustomize overlays.

---

# Step 15 — Implement GitOps Continuous Delivery Using Argo CD

## Goal

Implement GitOps continuous delivery using Argo CD to automatically synchronize Kubernetes deployments with the GitHub repository and maintain the desired cluster state.

---

## GitOps Workflow

The GitOps implementation follows these steps:

1. Source code and Kubernetes manifests are stored in GitHub.
2. Argo CD continuously monitors the GitHub repository.
3. When changes are committed, Argo CD detects the updates.
4. Kubernetes manifests are synchronized automatically.
5. Azure Kubernetes Service applies the updated configuration.
6. If configuration drift occurs, Argo CD restores the cluster to the desired state.

---

## Argo CD Application

The FlavorForge application is registered in Argo CD using:

```text
argocd/flavorforge-app.yaml
```

Synchronization is configured to keep the Kubernetes cluster aligned with the Git repository.

---

## Why This Step Is Required

GitOps provides a declarative deployment model where Git acts as the single source of truth. This approach improves deployment consistency, enables automatic recovery from configuration drift, simplifies rollbacks, and enhances auditability.

---

## Evidence

<img src="../../screenshots/argo-cd/4-flavorforge-Application-Details-Tree-Argo-CD.png" alt="Argo CD Application" width="100%">

<img src="../../screenshots/Enterprise Azure DevOps Release Simulation/17-argocd-pipeline.png" alt="Azure DevOps and Argo CD Integration" width="100%">

<img src="../../screenshots/Enterprise Azure DevOps Release Simulation/17.1-argocd-pipeline.png" alt="GitOps Deployment Pipeline" width="100%">

<img src="../../screenshots/Enterprise Azure DevOps Release Simulation/17.2-argocd-pipeline.png" alt="Argo CD Synchronization" width="100%">

---

## Result

Argo CD was successfully integrated with Azure Kubernetes Service to implement GitOps continuous delivery. Kubernetes deployments are now automatically synchronized with the GitHub repository, ensuring consistent, repeatable, and self-healing application deployments.

---


# Step 16 — Validate the End-to-End DevSecOps Pipeline

## Goal

Validate that the complete DevSecOps pipeline functions successfully from source code commit to application deployment on Azure Kubernetes Service.

---

## Validation Activities

The following components were verified during the final validation:

- Source code successfully committed to GitHub.
- Azure DevOps pipeline executed successfully.
- Unit tests completed successfully.
- SonarCloud code quality analysis passed.
- Docker images were built successfully.
- Docker images were published to Azure Container Registry.
- Azure Kubernetes Service deployed the latest application version.
- Argo CD synchronized Kubernetes manifests with the Git repository.
- Frontend application was accessible through the Ingress endpoint.
- Backend health API responded successfully.
- Kubernetes workloads were in the **Running** state.

---

## Why This Step Is Required

End-to-end validation confirms that every stage of the DevSecOps pipeline operates correctly and that the deployed application is stable, secure, and production-ready.

---

## Evidence

<img src="../../screenshots/Enterprise Azure DevOps Release Simulation/14-Final Azure Pipeline.png" alt="Final Azure DevOps Pipeline" width="100%">

<img src="../../screenshots/Enterprise Azure DevOps Release Simulation/14.1-Test-Final Azure Pipeline.png" alt="Successful Test Stage" width="100%">

<img src="../../screenshots/Enterprise Azure DevOps Release Simulation/14.2-Dev-Environment-Final Azure Pipeline.png" alt="Development Deployment" width="100%">

<img src="../../screenshots/Enterprise Azure DevOps Release Simulation/14.2-QA-Environment-Final Azure Pipeline.png" alt="QA Deployment" width="100%">

<img height="1347" src="https://github.com/user-attachments/assets/8f22d2e3-9a03-4475-a6f4-081920066ea0" alt="Production Deployment" width="100%">

<img width="2560" height="1229" src="https://github.com/user-attachments/assets/b1219717-6fbb-4691-a0bb-7c61b5efeff5" alt="Complete Multi-Stage Pipeline">

<img width="2560"  />


---

## Result

The FlavorForge Azure DevSecOps platform was successfully validated from source code integration through production deployment. The completed solution demonstrates a production-style implementation of CI/CD, containerization, Kubernetes orchestration, Azure cloud infrastructure, automated quality and security checks, and GitOps continuous delivery using Azure DevOps, Azure Kubernetes Service, Azure Container Registry, SonarCloud, Docker, and Argo CD.

---

# 5. Implementation Summary

The FlavorForge Azure DevSecOps Capstone was successfully implemented using modern cloud-native technologies and enterprise DevSecOps practices.

The implementation began with provisioning Azure infrastructure, including a Resource Group, Azure Container Registry, and Azure Kubernetes Service cluster. Docker was used to containerize both the React frontend and Node.js backend applications, while Azure Container Registry served as the centralized image repository.

An Azure DevOps multi-stage CI/CD pipeline was configured to automate source code validation, application build, unit testing, static code analysis with SonarCloud, container image creation, security scanning, image publishing, and Kubernetes deployment.

Environment-specific deployments were managed using Kustomize overlays for Development, QA, and Production. Azure DevOps Environments, Variable Groups, and Manual Approval Gates simulated an enterprise release management workflow.

GitOps continuous delivery was implemented using Argo CD, enabling automatic synchronization of Kubernetes manifests from GitHub to Azure Kubernetes Service while maintaining the desired cluster state.

The completed implementation demonstrates a production-style DevSecOps platform incorporating infrastructure automation, CI/CD, containerization, Kubernetes orchestration, cloud deployment, code quality analysis, security validation, and GitOps-based continuous delivery.

The successful execution and validation of each implementation step confirm that the FlavorForge application meets the project objectives and follows industry-standard DevSecOps practices for building, securing, and deploying cloud-native applications.






