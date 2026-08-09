# 01 - Kubernetes Basics

## Step 1 - Connect `kubectl` to the FlavorForge AKS cluster

### What we wanted

We wanted to connect our local machine to the FlavorForge AKS cluster so that we could manage and verify Kubernetes resources using `kubectl`.

The FlavorForge AKS details were:

```text
Resource Group: flavorforge-rg
AKS Cluster:    flavorforge-aks
```

### Where we did it

```text
Local terminal
```

### Command

```bash
az aks get-credentials \
  --resource-group flavorforge-rg \
  --name flavorforge-aks \
  --overwrite-existing
```

### What happened

Azure CLI retrieved the AKS cluster credentials and configured the local Kubernetes context.

After this, `kubectl` could communicate with the FlavorForge AKS cluster.

### Verify

```bash
kubectl get nodes
```

### Screenshot / Evidence


![Connect Local Machine to AKS](/screenshots/azure/11-connect-local-machine-to-aks.png)


### Result

The local machine was connected to the `flavorforge-aks` Kubernetes cluster.

---

## Step 2 - Verify the AKS Kubernetes nodes

### What we wanted

We wanted to confirm that the AKS cluster was reachable and that its Kubernetes nodes were available.

### Where we did it

```text
Local terminal
```

### Command

```bash
kubectl get nodes
```

### What happened

Kubernetes returned the nodes belonging to the FlavorForge AKS cluster.

The important status was:

```text
Ready
```

### Verify

The same command was used to verify the node status:

```bash
kubectl get nodes
```

### Screenshot / Evidence


![Kubernetes Nodes](/screenshots/azure/28-kubectl-get-nodes.png)


### Result

The AKS cluster was reachable through `kubectl`, and the Kubernetes nodes were available.

---

## Step 3 - Check Pods across the AKS cluster

### What we wanted

We wanted to see the Pods running across the AKS cluster, including Kubernetes infrastructure components.

### Where we did it

```text
Local terminal
```

### Command

```bash
kubectl get pods -A
```

### What happened

Kubernetes displayed Pods from all namespaces.

The `-A` option checks all namespaces instead of only the current namespace.

This allowed us to see both FlavorForge workloads and cluster-level components.

### Verify

```bash
kubectl get pods -A
```

### Result

The Kubernetes workloads across the AKS cluster were visible through `kubectl`.

---

## Step 4 - Verify the FlavorForge namespace

### What we wanted

We wanted to keep the FlavorForge application resources grouped inside the `flavorforge` namespace.

### Where we did it

```text
Repository

kubernetes/base/namespace.yaml
```

### Command

The namespace was part of the Kubernetes configuration used by the FlavorForge deployment.

### What happened

The FlavorForge Kubernetes resources were organized under:

```text
flavorforge
```

This gave the application its own Kubernetes namespace for its workloads and supporting resources.

### Verify

```bash
kubectl get all -n flavorforge
```

### Screenshot / Evidence


![Base Namespace YAML](/screenshots/kubernetes/base-namespace-yaml.png)


### Result

The FlavorForge application resources were organized in the `flavorforge` namespace.

---

## Step 5 - Verify all FlavorForge Kubernetes resources

### What we wanted

We wanted to verify the main Kubernetes resources running for FlavorForge.

### Where we did it

```text
Local terminal
```

### Command

```bash
kubectl get all -n flavorforge
```

### What happened

Kubernetes returned the main resources in the `flavorforge` namespace, including the application Deployments, Pods, Services, and ReplicaSets.

### Verify

```bash
kubectl get all -n flavorforge
```

### Screenshot / Evidence


![FlavorForge Kubernetes Resources](/screenshots/kubernetes/kubectl-get-all-n-flavorforge.png)


### Result

The FlavorForge Kubernetes resources were successfully visible in the `flavorforge` namespace.

---

## Step 6 - Verify FlavorForge Pods

### What we wanted

We wanted to confirm that the frontend and backend application Pods were actually running.

### Where we did it

```text
Local terminal
```

### Command

```bash
kubectl get pods -n flavorforge
```

### What happened

Kubernetes displayed the Pods belonging to the FlavorForge namespace.

The application Pods were running with the expected replica configuration.

### Verify

```bash
kubectl get pods -n flavorforge
```

### Screenshot / Evidence


![FlavorForge Pods](/screenshots/kubernetes/pods.png)


### Result

The FlavorForge frontend and backend workloads were running as Kubernetes Pods.

---

## Step 7 - Verify the frontend and backend Deployments

### What we wanted

We wanted Kubernetes to manage the frontend and backend workloads through separate Deployments.

### Where we did it

```text
Repository

kubernetes/base/frontend/deployment.yaml
kubernetes/base/backend/deployment.yaml
```

### Command

The Kubernetes resources were verified with:

```bash
kubectl get all -n flavorforge
```

### What happened

The repository contained separate Deployment definitions for:

```text
Frontend
Backend
```

The Deployments were responsible for maintaining the application Pods.

### Verify

```bash
kubectl get all -n flavorforge
```

### Screenshot / Evidence

Backend Deployment:


![Base Backend Deployment YAML](/screenshots/kubernetes/base-backend-deployment-yaml.png)


Frontend Deployment:


![Base Frontend Deployment YAML](/screenshots/kubernetes/base-frontend-deployment-yaml.png)


### Result

FlavorForge had separate Kubernetes Deployments for the frontend and backend workloads.

---

## Step 8 - Verify the frontend and backend Services

### What we wanted

We wanted stable Kubernetes networking endpoints for the frontend and backend Pods.

### Where we did it

```text
Repository

kubernetes/base/frontend/service.yaml
kubernetes/base/backend/service.yaml
```

### Command

```bash
kubectl get svc -A
```

### What happened

Kubernetes displayed the Services running across the cluster.

FlavorForge had separate Services for the frontend and backend workloads.

### Verify

```bash
kubectl get svc -A
```

### Result

The frontend and backend Kubernetes Services were available for application networking.

---

## Step 9 - Verify the Ingress

### What we wanted

We wanted to verify the Kubernetes Ingress used to expose the FlavorForge application through the NGINX Ingress Controller.

### Where we did it

```text
Repository

kubernetes/base/ingress/ingress.yaml
```

and:

```text
Local terminal
```

### Command

```bash
kubectl get ingress -A
```

### What happened

Kubernetes displayed the available Ingress resources and their assigned addresses.

The external traffic flow was:

```text
Internet
   ↓
External Load Balancer
   ↓
NGINX Ingress Controller
   ↓
FlavorForge Service
   ↓
FlavorForge Pods
```

### Verify

```bash
kubectl get ingress -A
```

### Result

The FlavorForge Ingress resource was available for external application routing.

---

## Step 10 - Verify the FlavorForge application

### What we wanted

We wanted to verify that the Kubernetes deployment was working from the application side, not only from the Kubernetes resource side.

### Where we did it

```text
Browser
```

### Command

The application was accessed through the external Ingress address.

The backend health endpoint was:

```text
/api/health
```

### What happened

The FlavorForge frontend was accessible through the Kubernetes environment.

The backend health endpoint also returned the application response.

### Verify

Frontend:

```text
http://<INGRESS-IP>
```

Backend health:

```text
http://<INGRESS-IP>/api/health
```

### Screenshot / Evidence

Frontend:


![FlavorForge Frontend](/screenshots/kubernetes/frontend-in-the-browser-http-104-45-175-93.png)


Backend health:


![FlavorForge Backend Health Endpoint](/screenshots/kubernetes/backend-in-the-browser-http-104-45-175-93-api-health.png)


### Result

The deployed FlavorForge application was reachable through the Kubernetes environment.

---

## Step 11 - Verify the Kubernetes repository structure

### What we wanted

We wanted the Kubernetes configuration to be organized so that common resources were maintained in `base` and environment-specific configuration was maintained through overlays.

### Where we did it

```text
Repository

kubernetes/
```

### What happened

The FlavorForge Kubernetes configuration was organized as:

```text
kubernetes/
├── README.md
├── base/
│   ├── autoscaling/
│   ├── backend/
│   ├── config/
│   ├── frontend/
│   ├── ingress/
│   ├── namespace.yaml
│   └── kustomization.yaml
│
└── overlays/
    ├── dev/
    ├── qa/
    └── prod/
```

The `base` directory contained the common Kubernetes resources.

The overlays contained environment-specific configuration for:

```text
dev
qa
prod
```

### Verify

```text
kubernetes/base/
kubernetes/overlays/
```

### Result

The Kubernetes configuration was structured using a common base and environment-specific overlays.

---

## Step 12 - Verify the complete Kubernetes flow

### What we wanted

We wanted to confirm the complete path from the container images to the running FlavorForge application.

### Where we did it

```text
Azure Container Registry
        ↓
AKS
        ↓
Kubernetes
```

### What happened

The FlavorForge application followed this deployment path:

```text
Docker Image
      ↓
Azure Container Registry
      ↓
Kubernetes Deployment
      ↓
Pods
      ↓
Services
      ↓
Ingress
      ↓
Running FlavorForge Application
```

The frontend followed:

```text
React + Vite
     ↓
Frontend Docker Image
     ↓
ACR
     ↓
Frontend Deployment
     ↓
Frontend Pods
     ↓
Frontend Service
     ↓
Ingress
```

The backend followed:

```text
Node.js + Express
     ↓
Backend Docker Image
     ↓
ACR
     ↓
Backend Deployment
     ↓
Backend Pods
     ↓
Backend Service
     ↓
Backend API
```

### Verify

```bash
kubectl get nodes
```

```bash
kubectl get pods -A
```

```bash
kubectl get all -n flavorforge
```

```bash
kubectl get pods -n flavorforge
```

```bash
kubectl get svc -A
```

```bash
kubectl get ingress -A
```

### Result

The FlavorForge application was running as Kubernetes-managed workloads on AKS.

---

# Result

The Kubernetes foundation for FlavorForge was successfully established on AKS.

The completed flow was:

```text
FlavorForge Application
        ↓
Docker Images
        ↓
Azure Container Registry
        ↓
AKS
        ↓
Kubernetes Deployments
        ↓
Pods
        ↓
Services
        ↓
Ingress
        ↓
Running FlavorForge Application
```

The Kubernetes repository was also organized into:

```text
base
  ↓
common Kubernetes configuration

overlays
  ↓
dev / qa / prod configuration
```

The next BUILD-JOURNEY document will move from the Kubernetes foundation into the **actual FlavorForge Kubernetes manifests**, starting with the Deployment configuration.
