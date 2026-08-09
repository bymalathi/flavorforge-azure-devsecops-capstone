# 02 — Kubernetes Manifests

## What we wanted

After connecting to the FlavorForge AKS cluster, we needed to define how the frontend and backend applications should run in Kubernetes.

Instead of configuring Kubernetes resources manually, FlavorForge stores the Kubernetes configuration in the repository under:

```text
kubernetes/
```

The Kubernetes configuration is organized into a common `base` and environment-specific overlays.

```text
kubernetes/
├── base/
└── overlays/
```

---

# Step 1 — Create the Kubernetes namespace definition

## What we wanted

We wanted to keep the FlavorForge Kubernetes resources inside a dedicated namespace.

## Where we did it

```text
Repository

kubernetes/base/namespace.yaml
```

## Command

The namespace configuration is included in the Kubernetes base configuration.

The namespace is:

```text
flavorforge
```

## What happened

The FlavorForge workloads were organized under the `flavorforge` namespace instead of using the default namespace.

## Verify

```bash
kubectl get all -n flavorforge
```

## Screenshot / Evidence

![Base Namespace YAML](/screenshots/kubernetes/base-namespace-yaml.png)

## Result

The Kubernetes configuration contained a dedicated namespace for FlavorForge resources.

---

# Step 2 — Define the backend Deployment

## What we wanted

We wanted Kubernetes to run the FlavorForge backend container as a managed workload.

## Where we did it

```text
Repository

kubernetes/base/backend/deployment.yaml
```

## Command

The backend Deployment was defined in:

```text
kubernetes/base/backend/deployment.yaml
```

The deployed resources were verified with:

```bash
kubectl get all -n flavorforge
```

## What happened

The backend Deployment defined the desired Kubernetes state for the FlavorForge Node.js + Express application.

The workload flow was:

```text
Backend Deployment
        ↓
Backend Pods
        ↓
Backend Container
        ↓
Node.js + Express
        ↓
FlavorForge API
```

## Verify

```bash
kubectl get all -n flavorforge
```

## Screenshot / Evidence


![Base Backend Deployment](/screenshots/kubernetes/base-backend-deployment-yaml.png)

![Backend Deployment](/screenshots/kubernetes/backend-deployment.png)


## Result

The FlavorForge backend was defined as a Kubernetes Deployment.

---

# Step 3 — Define the frontend Deployment

## What we wanted

We wanted Kubernetes to run the FlavorForge frontend container as a managed workload.

## Where we did it

```text
Repository

kubernetes/base/frontend/deployment.yaml
```

## Command

The frontend Deployment was defined in:

```text
kubernetes/base/frontend/deployment.yaml
```

The deployed resources were verified with:

```bash
kubectl get all -n flavorforge
```

## What happened

The frontend Deployment defined the desired Kubernetes state for the React application running through NGINX.

The workload flow was:

```text
Frontend Deployment
        ↓
Frontend Pods
        ↓
Frontend Container
        ↓
NGINX
        ↓
React Application
```

## Verify

```bash
kubectl get all -n flavorforge
```

## Screenshot / Evidence

![Base Frontend Deployment YAML](/screenshots/kubernetes/base-frontend-deployment-yaml.png)

![Kubernetes Deployment](/screenshots/kubernetes/2-deployment.png)

## Result

The FlavorForge frontend was defined as a Kubernetes Deployment.

---

# Step 4 — Define the backend Service

## What we wanted

We wanted a stable Kubernetes network endpoint for the backend Pods.

## Where we did it

```text
Repository

kubernetes/base/backend/service.yaml
```

## Command

The backend Service was defined in:

```text
kubernetes/base/backend/service.yaml
```

The Service was verified with:

```bash
kubectl get svc -A
```

## What happened

The backend Service provided a stable Kubernetes endpoint for the backend workload.

The networking flow was:

```text
Backend Service
       ↓
Backend Pods
       ↓
Node.js + Express
```

## Verify

```bash
kubectl get svc -A
```

## Screenshot / Evidence

![Base Backend Service](/screenshots/kubernetes/base-backend-service-yaml.png)

## Result

The backend Pods had a Kubernetes Service for stable application networking.

---

# Step 5 — Define the frontend Service

## What we wanted

We wanted a stable Kubernetes network endpoint for the frontend Pods.

## Where we did it

```text
Repository

kubernetes/base/frontend/service.yaml
```

## Command

The frontend Service was defined in:

```text
kubernetes/base/frontend/service.yaml
```

The Service was verified with:

```bash
kubectl get svc -A
```

## What happened

The frontend Service provided a stable endpoint for the frontend workload.

The networking flow was:

```text
Frontend Service
       ↓
Frontend Pods
       ↓
NGINX
       ↓
React Application
```

## Verify

```bash
kubectl get svc -A
```

## Screenshot / Evidence

```text
/screenshots/kubernetes/
```

![Base Frontend Service](/screenshots/kubernetes/base-frontend-service-yaml.png)

## Result

The frontend Pods had a Kubernetes Service for application networking.

---

# Step 6 — Add backend runtime configuration

## What we wanted

We wanted to keep backend runtime configuration separate from the Docker image.

## Where we did it

```text
Repository

kubernetes/base/config/backend-configmap.yaml
```

## Command

The backend ConfigMap was defined in:

```text
kubernetes/base/config/backend-configmap.yaml
```

The Kubernetes resources were verified with:

```bash
kubectl get all -n flavorforge
```

## What happened

The backend configuration was provided through Kubernetes configuration rather than being placed directly into the container image.

The configuration flow was:

```text
ConfigMap
    ↓
Backend Pod
    ↓
Environment Variables
    ↓
Node.js Application
```

## Verify

```bash
kubectl get all -n flavorforge
```

## Screenshot / Evidence

```text

```

![configmap](/screenshots/kubernetes/1-configmap.png)

## Result

FlavorForge had a Kubernetes ConfigMap for backend runtime configuration.

---

# Step 7 — Define the Secret template

## What we wanted

We wanted to keep sensitive runtime values separate from normal application configuration.

## Where we did it

```text
Repository

kubernetes/base/config/secret-template.yaml
```

## Command

The Secret template was stored in:

```text
kubernetes/base/config/secret-template.yaml
```

Secret resources were verified with:

```bash
kubectl get secrets -n flavorforge
```

## What happened

FlavorForge used Kubernetes Secrets for sensitive runtime configuration.

The configuration flow was:

```text
Kubernetes Secret
       ↓
Application Pod
       ↓
Environment Variable
       ↓
Application
```

## Verify

```bash
kubectl get secrets -n flavorforge
```

## Screenshot / Evidence

![Secrets Created](/screenshots/kubernetes/secrets/0-secrets-created.png)
![Kubernetes Secrets in FlavorForge Namespace](/screenshots/kubernetes/secrets/1-kubectl-get-secrets-n-flavorforge.png)
![Deployment Pods](/screenshots/kubernetes/secrets/2-deployment-pods.png)
![Secret Environment Variable](/screenshots/kubernetes/secrets/3-print-env-secret-password.png)

## Result

FlavorForge had Kubernetes Secret configuration for sensitive runtime values.

---

# Step 8 — Define the Ingress

## What we wanted

We wanted to route external HTTP traffic to the FlavorForge application through the NGINX Ingress Controller.

## Where we did it

```text
Repository

kubernetes/base/ingress/ingress.yaml
```

## Command

The Ingress resource was verified with:

```bash
kubectl get ingress -A
```

## What happened

The Kubernetes Ingress provided the external routing layer for FlavorForge.

The traffic flow was:

```text
External Traffic
       ↓
External Load Balancer
       ↓
NGINX Ingress Controller
       ↓
Ingress
       ├── Frontend Service
       └── Backend Service
```

## Verify

```bash
kubectl get ingress -A
```

## Result

The FlavorForge application had Kubernetes Ingress configuration for external traffic routing.

---

# Step 9 — Add Horizontal Pod Autoscaler configuration

## What we wanted

We wanted the Kubernetes configuration to include autoscaling for the FlavorForge workloads.

## Where we did it

```text
Repository

kubernetes/base/autoscaling/
```

The directory contains:

```text
hpa.yaml
kustomization.yaml
```

## Command

The HPA resources were verified with:

```bash
kubectl get hpa -n flavorforge
```

## What happened

The Horizontal Pod Autoscaler configuration was included in the Kubernetes base.

The HPA controls the number of application replicas based on resource usage.

## Verify

```bash
kubectl get hpa -n flavorforge
```

## Result

The Kubernetes configuration included Horizontal Pod Autoscaling for FlavorForge.

Detailed HPA verification is covered in the later HPA BUILD-JOURNEY document.

---

# Step 10 — Create the backend Kustomization

## What we wanted

We wanted the backend Kubernetes resources to be grouped together under Kustomize.

## Where we did it

```text
Repository

kubernetes/base/backend/kustomization.yaml
```

The backend directory contains:

```text
kubernetes/base/backend/
├── deployment.yaml
├── service.yaml
└── kustomization.yaml
```

## Command

The backend Kustomization was part of the Kubernetes base configuration.

## What happened

The backend Deployment and Service were grouped together as the backend Kustomize component.

```text
Backend Kustomization
       │
       ├── Deployment
       └── Service
```

## Verify

```text
kubernetes/base/backend/
```

## Result

The backend Kubernetes resources were organized as a reusable Kustomize component.

---

# Step 11 — Create the frontend Kustomization

## What we wanted

We wanted the frontend Kubernetes resources to be grouped together under Kustomize.

## Where we did it

```text
Repository

kubernetes/base/frontend/kustomization.yaml
```

The frontend directory contains:

```text
kubernetes/base/frontend/
├── deployment.yaml
├── service.yaml
└── kustomization.yaml
```

## Command

The frontend Kustomization was part of the Kubernetes base configuration.

## What happened

The frontend Deployment and Service were grouped together.

```text
Frontend Kustomization
       │
       ├── Deployment
       └── Service
```

## Verify

```text
kubernetes/base/frontend/
```

## Result

The frontend Kubernetes resources were organized as a reusable Kustomize component.

---

# Step 12 — Create the configuration Kustomization

## What we wanted

We wanted the ConfigMap and Secret configuration to be managed together.

## Where we did it

```text
Repository

kubernetes/base/config/kustomization.yaml
```

The directory contains:

```text
kubernetes/base/config/
├── backend-configmap.yaml
├── secret-template.yaml
└── kustomization.yaml
```

## Command

The configuration resources were included through the Kustomize configuration.

## What happened

The configuration resources were grouped together:

```text
Configuration
     │
     ├── ConfigMap
     └── Secret Template
```

## Verify

```text
kubernetes/base/config/
```

## Result

The runtime configuration resources were organized under the configuration Kustomization.

---

# Step 13 — Create the Ingress Kustomization

## What we wanted

We wanted the Ingress resource to have its own Kustomize configuration.

## Where we did it

```text
Repository

kubernetes/base/ingress/kustomization.yaml
```

The directory contains:

```text
kubernetes/base/ingress/
├── ingress.yaml
└── kustomization.yaml
```

## Command

The Ingress resource was included through its Kustomization.

## What happened

The Ingress configuration was separated from the frontend and backend workload definitions.

```text
Ingress Kustomization
       │
       └── Ingress
```

## Verify

```bash
kubectl get ingress -A
```

## Result

The Ingress configuration was organized as a separate Kustomize component.

---

# Step 14 — Create the base Kustomization

## What we wanted

We wanted one base Kustomization to bring the common FlavorForge Kubernetes configuration together.

## Where we did it

```text
Repository

kubernetes/base/kustomization.yaml
```

## Command

The base Kustomization was stored at:

```text
kubernetes/base/kustomization.yaml
```

## What happened

The base configuration brought together the common Kubernetes resources used by FlavorForge.

The base structure was:

```text
kubernetes/base/
├── autoscaling/
├── backend/
├── config/
├── frontend/
├── ingress/
├── namespace.yaml
└── kustomization.yaml
```

## Verify

```text
kubernetes/base/
```

## Result

The common FlavorForge Kubernetes resources were organized under a single base configuration.

---

# Step 15 — Create environment overlays

## What we wanted

We wanted to reuse the common Kubernetes configuration while maintaining separate configurations for Dev, QA, and Prod.

## Where we did it

```text
Repository

kubernetes/overlays/
```

The environments were:

```text
kubernetes/overlays/dev/
kubernetes/overlays/qa/
kubernetes/overlays/prod/
```

## Command

The overlays were maintained as part of the Kubernetes repository structure.

## What happened

The common configuration remained in `base`, while environment-specific changes were maintained under the corresponding overlay.

The structure was:

```text
                 Base
                  │
        ┌─────────┼─────────┐
        │         │         │
        ▼         ▼         ▼
       Dev       QA       Prod
```

## Verify

```text
kubernetes/overlays/dev/
kubernetes/overlays/qa/
kubernetes/overlays/prod/
```

## Result

FlavorForge had separate Kustomize overlays for Dev, QA, and Prod.

---

# Step 16 — Add environment-specific replica patches

## What we wanted

We wanted each environment to be able to use different replica settings without duplicating the complete Deployment manifests.

## Where we did it

Development:

```text
kubernetes/overlays/dev/
├── backend-replica-patch.yaml
└── frontend-replica-patch.yaml
```

QA:

```text
kubernetes/overlays/qa/
├── backend-replica-patch.yaml
└── frontend-replica-patch.yaml
```

Production:

```text
kubernetes/overlays/prod/
├── backend-replica-patch.yaml
└── frontend-replica-patch.yaml
```

## Command

The environment-specific replica configuration was maintained through the Kustomize overlays.

## What happened

The same base Deployments could be reused while the overlays changed the replica configuration for each environment.

```text
Base Deployment
       ↓
Environment Overlay
       ↓
Environment-specific Replica Count
```

## Verify

```text
kubernetes/overlays/dev/
kubernetes/overlays/qa/
kubernetes/overlays/prod/
```

## Result

FlavorForge could reuse the common Deployment manifests across Dev, QA, and Prod while applying environment-specific replica settings.

---

# Step 17 — Verify the complete Kubernetes manifest structure

## What we wanted

We wanted to confirm that all major FlavorForge Kubernetes configuration was present in the repository.

## Where we did it

```text
Repository

kubernetes/
```

## Command

```bash
kubectl get all -n flavorforge
```

Additional Kubernetes verification:

```bash
kubectl get pods -n flavorforge
```

```bash
kubectl get svc -A
```

```bash
kubectl get ingress -A
```

## What happened

The repository configuration covered the main Kubernetes resources used by FlavorForge:

```text
Namespace
Frontend Deployment
Backend Deployment
Frontend Service
Backend Service
ConfigMap
Secret
Ingress
HPA
Kustomizations
Dev Overlay
QA Overlay
Prod Overlay
```

The deployed resources were then verified from the AKS cluster.

## Verify

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

## Screenshot / Evidence

![AKS Workloads, Deployments and Pods](/screenshots/azure/15-aks-workloads-deployments-pods.png)

![Kubernetes Deployment](/screenshots/kubernetes/2-deployment.png)

![Kubernetes ConfigMap](/screenshots/kubernetes/1-configmap.png)

![Base Backend Deployment YAML](/screenshots/kubernetes/base-backend-deployment-yaml.png)

![Base Frontend Deployment YAML](/screenshots/kubernetes/base-frontend-deployment-yaml.png)

![Base Backend Service YAML](/screenshots/kubernetes/base-backend-service-yaml.png)

![Base Frontend Service YAML](/screenshots/kubernetes/base-frontend-service-yaml.png)

## Result

The FlavorForge Kubernetes manifests were organized in the repository and used as the configuration for the AKS workloads.

---

# Result

The FlavorForge Kubernetes manifest stage was completed.

The repository contained the Kubernetes configuration for:

```text
Namespace
    ↓
Frontend Deployment
    ↓
Backend Deployment
    ↓
Frontend Service
    ↓
Backend Service
    ↓
ConfigMap
    ↓
Secret
    ↓
Ingress
    ↓
HPA
    ↓
Kustomize Base
    ↓
Dev / QA / Prod Overlays
```

The complete deployment path was:

```text
FlavorForge Source Code
        ↓
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
Running Application
```

The next BUILD-JOURNEY document is:

```text
docs/week-4/BUILD-JOURNEY/06-kubernetes/03-configmaps-and-secrets.md
```

It will continue with the actual FlavorForge ConfigMap and Secret configuration.
