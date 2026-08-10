# 02 — Azure Container Registry (ACR)

After creating the `flavorforge-rg` Resource Group and registering the Container Registry provider, we created an **Azure Container Registry (ACR)** for FlavorForge.

The purpose was to store the Docker images we built locally:

```text
flavorforge-backend
flavorforge-frontend
```

The flow was:

```text
Local Docker Images
        ↓
Azure Container Registry
        ↓
AKS
```

---

## Step 1 — Make sure we are in the FlavorForge project

We went to the project:

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

Check:

```bash
pwd
```

Expected:

```text
/home/malathi/flavorforge-azure-devsecops-capstone
```

---

## Step 2 — Check that the Resource Group exists

Before creating ACR, we checked the Resource Group:

```bash
az group show --name flavorforge-rg --output table
```

The Resource Group we used was:

```text
flavorforge-rg
```

The selected Azure region was:

```text
West US 2
```

---

## Step 3 — Create the Azure Container Registry

We created an Azure Container Registry inside the `flavorforge-rg` Resource Group.

### Important

The ACR name must be globally unique in Azure.

Use the **actual ACR name that was created for FlavorForge**.

The command follows this format:

```bash
az acr create \
  --resource-group flavorforge-rg \
  --name flavorforgeacr2026ms \
  --sku <SKU>
```

For our FlavorForge project, use the exact ACR name and SKU from the command/screenshot we actually used.

Do not replace `flavorforgeacr2026ms` with an arbitrary name when recreating the project.

---

## Step 4 — Verify ACR from the terminal

After creating the registry, we checked it from Azure CLI.

Run:

```bash
az acr list --resource-group flavorforge-rg --output table
```

The FlavorForge ACR should appear in the list.

We can also check the specific registry:

```bash
az acr show \
  --name flavorforgeacr2026ms \
  --resource-group flavorforge-rg \
  --output table
```

---

## Step 5 — Get the ACR login server

We needed the ACR login server because Docker images are pushed using the registry's login server.

Run:

```bash
az acr show \
  --name flavorforgeacr2026ms \
  --resource-group flavorforge-rg \
  --query loginServer \
  --output tsv
```

The result will look like:

```text
flavorforgeacr2026ms.azurecr.io
```

This value is used when tagging Docker images for ACR.

---

## Step 6 — Check ACR from Azure Portal

We also checked the registry from the Azure Portal.

Open:

**Azure Portal → Resource groups → flavorforge-rg**

Then:

1. Open `flavorforge-rg`.
2. Look at the resources inside the Resource Group.
3. Find the **Container Registry**.
4. Open the registry.

Inside the ACR overview page, we can check:

* Registry name
* Location
* Resource Group
* Login server
* SKU
* Repositories

The registry should be associated with:

```text
Resource Group: flavorforge-rg
Region: West US 2
```

### Screenshot

![ACR created successfully](/screenshots/azure/04-acr-created.png)

---

## Step 7 — Log in to ACR from Azure CLI

After creating the registry, we logged Docker into ACR.

First make sure Azure CLI is authenticated:

```bash
az account show
```

Then run:

```bash
az acr login --name flavorforgeacr2026ms
```

A successful login should show a message similar to:

```text
Login Succeeded
```

### Screenshot

![ACR login succeeded](/screenshots/azure/06-az-acr-login-success.png)

---

## Step 8 — Check the local Docker images

Before pushing anything to ACR, we checked the Docker images available on our machine:

```bash
docker images
```

We expected to have the FlavorForge images:

```text
flavorforge-backend
flavorforge-frontend
```

with the tags we created during the Docker stage.

### Screenshot

![Docker images](/screenshots/azure/07-docker-images.png)

---

## Step 9 — Tag the FlavorForge Docker images

Docker images created locally have local names.

Before pushing them to ACR, we tagged them with the ACR login server.

The format is:

```bash
docker tag <LOCAL_IMAGE>:<TAG> <ACR_LOGIN_SERVER>/<LOCAL_IMAGE>:<TAG>
```

For the FlavorForge backend:

```bash
docker tag flavorforge-backend:1.0 \
  <ACR_LOGIN_SERVER>/flavorforge-backend:1.0
```

For the FlavorForge frontend:

```bash
docker tag flavorforge-frontend:1.0 \
  <ACR_LOGIN_SERVER>/flavorforge-frontend:1.0
```

Then we checked the images:

```bash
docker images
```

The ACR-tagged images should now appear.

### Screenshot

![ACR-tagged Docker images](/screenshots/azure/08-tag-the-images-and-verify-in-docker-images.png)

---

## Step 10 — Push the backend image to ACR

After tagging the backend image, we pushed it:

```bash
docker push <ACR_LOGIN_SERVER>/flavorforge-backend:1.0
```

Docker uploaded the image layers to Azure Container Registry.

---

## Step 11 — Push the frontend image to ACR

We pushed the frontend image:

```bash
docker push <ACR_LOGIN_SERVER>/flavorforge-frontend:1.0
```

The frontend image was uploaded to ACR.

---

## Step 12 — Verify the images in Azure Container Registry

After pushing the images, we checked ACR.

### From Azure CLI

Run:

```bash
az acr repository list \
  --name flavorforgeacr2026ms \
  --output table
```

The repositories should include the FlavorForge images.

We can check the tags for the backend:

```bash
az acr repository show-tags \
  --name flavorforgeacr2026ms \
  --repository flavorforge-backend \
  --output table
```

And the frontend:

```bash
az acr repository show-tags \
  --name flavorforgeacr2026ms \
  --repository flavorforge-frontend \
  --output table
```

### From Azure Portal

Open:

**Azure Portal → flavorforge-rg → Container Registry → Repositories**

We should see:

```text
flavorforge-backend
flavorforge-frontend
```

Open each repository to check its available image tags.

### Screenshot

![Images verified in ACR](/screenshots/azure/09-verify-images-in-acr.png)

---

## Step 13 — Final ACR check

At this point our Docker images had moved from the local machine into Azure:

```text
Local Machine
     │
     │ docker build
     ↓
Local Docker Images
     │
     │ docker tag
     ↓
ACR Login Server
     │
     │ docker push
     ↓
Azure Container Registry
     │
     ├── flavorforge-backend
     │
     └── flavorforge-frontend
```

### Result

The FlavorForge Docker images were successfully stored in Azure Container Registry.

We verified the setup using:

* Azure CLI
* Docker CLI
* Azure Portal

➡️ **Next:** Create the Azure Kubernetes Service (AKS) cluster.
