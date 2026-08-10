# 05 — Kustomize Production Overlay

## 1. What We Wanted

After creating the common Kubernetes base and the Dev and QA overlays, the next step was to configure the Production overlay for FlavorForge.

The goal was to reuse the common Kubernetes configuration from:

```text
kubernetes/base/
```

and apply Production-specific configuration from:

```text
kubernetes/overlays/prod/
```

The actual repository structure is:

```text
kubernetes/
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
        ├── backend-replica-patch.yaml
        ├── frontend-replica-patch.yaml
        └── kustomization.yaml
```

The Production overlay allows the common Kubernetes resources to be reused while applying Production-specific replica configuration.

---

# 2. Go to the FlavorForge Repository

### What We Wanted

We needed to work from the FlavorForge repository containing the Kubernetes configuration.

### Command

From the terminal:

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

Verify the repository:

```bash
pwd
```

Then check the Kubernetes directory:

```bash
ls kubernetes
```

### Result

The repository contains:

```text
README.md
base
overlays
```

---

# 3. Check the Production Overlay

### What We Wanted

We wanted to confirm that the Production overlay files were present.

### Command

```bash
ls kubernetes/overlays/prod
```

### Result

The Production overlay contains:

```text
backend-replica-patch.yaml
frontend-replica-patch.yaml
kustomization.yaml
```

The structure is:

```text
kubernetes/overlays/prod/
        │
        ├── backend-replica-patch.yaml
        ├── frontend-replica-patch.yaml
        └── kustomization.yaml
```

---

# 4. Verify the Production Kustomization File

### What We Wanted

The Production overlay needs a `kustomization.yaml` file to combine the common base with the Production-specific patches.

### Command

```bash
cat kubernetes/overlays/prod/kustomization.yaml
```

### What Happened

The Production Kustomization file was present in the repository.

It is the entry point for building the Production overlay.

The relationship is:

```text
Production kustomization.yaml
             ↓
        Kubernetes Base
             ↓
      Production Patches
```

---

# 5. Verify the Backend Production Patch

### What We Wanted

The backend Deployment needed Production-specific replica configuration without changing the common backend Deployment in the base.

### Command

```bash
cat kubernetes/overlays/prod/backend-replica-patch.yaml
```

### Result

The Production backend replica patch was present.

The configuration is kept separately from:

```text
kubernetes/base/backend/deployment.yaml
```

The structure is:

```text
Base Backend Deployment
          ↓
Production Backend Patch
          ↓
Production Backend Configuration
```

---

# 6. Verify the Frontend Production Patch

### What We Wanted

The frontend Deployment also needed its Production-specific replica configuration.

### Command

```bash
cat kubernetes/overlays/prod/frontend-replica-patch.yaml
```

### Result

The Production frontend replica patch was present.

The structure is:

```text
Base Frontend Deployment
          ↓
Production Frontend Patch
          ↓
Production Frontend Configuration
```

---

# 7. Verify the Production Overlay Structure

### What We Wanted

We wanted to verify the complete Production overlay before rendering it.

### Command

```bash
find kubernetes/overlays/prod -maxdepth 1 -type f -print
```

### Result

The Production overlay contains:

```text
kubernetes/overlays/prod/backend-replica-patch.yaml
kubernetes/overlays/prod/frontend-replica-patch.yaml
kubernetes/overlays/prod/kustomization.yaml
```

This confirms that all three Production overlay files are present.

### Evidence

![Kustomize Overlay](/screenshots/enterprise-azure-devops-release-simulation/7-overlay.png)

---

# 8. Verify the Common Kubernetes Base

### What We Wanted

The Production overlay reuses the common Kubernetes base, so we first verified that the base exists.

### Command

```bash
ls kubernetes/base
```

### Result

The base contains:

```text
autoscaling
backend
config
frontend
ingress
namespace.yaml
kustomization.yaml
```

The Production environment therefore uses the common FlavorForge Kubernetes resources from the base.

---

# 9. Render the Production Overlay

### What We Wanted

Before applying the Production configuration to AKS, we wanted to render the complete Production Kubernetes configuration.

### Command

```bash
kubectl kustomize kubernetes/overlays/prod
```

### What Happened

Kustomize reads:

```text
kubernetes/base/
        +
kubernetes/overlays/prod/
```

and produces the combined Kubernetes configuration.

The flow is:

```text
Base Resources
      +
Production Patches
      ↓
Kustomize
      ↓
Rendered Production Configuration
```

The command only renders the configuration. It does not apply it to the cluster.

---

# 10. Inspect the Rendered Production Configuration

### What We Wanted

We wanted to inspect the rendered output before applying it.

### Command

```bash
kubectl kustomize kubernetes/overlays/prod
```

### Result

The terminal displays the Kubernetes resources generated from the Production overlay.

This allows the Production configuration to be checked before deployment.

The important relationship is:

```text
kubernetes/base/
       +
kubernetes/overlays/prod/
       ↓
Rendered Production Configuration
```

---

# 11. Apply the Production Overlay

### What We Wanted

Once the Production configuration was ready, we needed to apply it to the Kubernetes cluster.

### Command

```bash
kubectl apply -k kubernetes/overlays/prod
```

### What Happened

Kustomize resolved the base and Production overlay and applied the resulting Kubernetes resources to the cluster.

The deployment flow was:

```text
Production Overlay
        ↓
Kustomize
        ↓
Kubernetes API
        ↓
FlavorForge Resources
```

---

# 12. Verify Deployments

### What We Wanted

After applying the Production overlay, we wanted to verify that the FlavorForge Deployments were present.

### Command

```bash
kubectl get deployments -n flavorforge
```

### Result

The command displays the Deployments running in the `flavorforge` namespace.

The workload structure is:

```text
flavorforge
    │
    ├── Backend Deployment
    │
    └── Frontend Deployment
```

---

# 13. Verify Production Pods

### What We Wanted

We wanted to confirm that Pods were created from the Deployments.

### Command

```bash
kubectl get pods -n flavorforge
```

### Result

The command displays the running FlavorForge Pods.

The relationship is:

```text
Deployment
    ↓
ReplicaSet
    ↓
Pods
```

The Pod status provides the first runtime verification of the Production workload.

---

# 14. Verify Services

### What We Wanted

The frontend and backend Services needed to be checked after deployment.

### Command

```bash
kubectl get svc -n flavorforge
```

### Result

The Services in the `flavorforge` namespace were displayed.

The networking relationship is:

```text
Production Pods
      ↓
Kubernetes Services
      ↓
Application Networking
```

---

# 15. Verify Ingress

### What We Wanted

The existing FlavorForge Ingress configuration needed to be checked after applying the Production overlay.

### Command

```bash
kubectl get ingress -n flavorforge
```

### Result

The Ingress resource was displayed for the `flavorforge` namespace.

The request path is:

```text
External Request
      ↓
NGINX Ingress
      ↓
Kubernetes Service
      ↓
FlavorForge Pods
```

---

# 16. Verify All FlavorForge Resources

### What We Wanted

We wanted one command that gave us a broader view of the running FlavorForge resources.

### Command

```bash
kubectl get all -n flavorforge
```

### Result

The command displays the main workloads and networking resources in the namespace, including:

```text
Pods
Services
Deployments
ReplicaSets
```

This provides a consolidated runtime check after applying the Production overlay.

---

# 17. Verify the Backend Deployment Configuration

### What We Wanted

We wanted to inspect the deployed backend Deployment and confirm its runtime configuration.

### Command

```bash
kubectl get deployment backend-prod -n flavorforge -o yaml
```

### Result

The deployed backend Deployment configuration was displayed in YAML format.

This allows the deployed resource to be inspected directly from Kubernetes.

---

# 18. Verify the Frontend Deployment Configuration

### What We Wanted

We also wanted to inspect the deployed frontend Deployment.

### Command

```bash
kubectl get deployment frontend-prod -n flavorforge -o yaml
```

### Result

The deployed frontend Deployment configuration was displayed in YAML format.

Together, the backend and frontend checks verify the application Deployments created for the environment.

---

# 19. Production Replica Configuration

The Production overlay keeps the environment-specific replica configuration separate from the common Kubernetes base.

The structure is:

```text
                 Base
                  │
          ┌───────┴───────┐
          │               │
          ▼               ▼
       Backend         Frontend
     Deployment       Deployment
          │               │
          ▼               ▼
     Prod Patch       Prod Patch
          │               │
          └───────┬───────┘
                  ↓
        Production Workloads
```

This means changes specific to Production can be maintained in the Production overlay.

---

# 20. Production Overlay in the Git Repository

### What We Wanted

The Production configuration needed to remain part of the FlavorForge source-controlled Kubernetes configuration.

### Command

```bash
find kubernetes/overlays -maxdepth 2 -type f -print
```

### Result

The repository contains separate overlays for:

```text
kubernetes/overlays/dev/
kubernetes/overlays/qa/
kubernetes/overlays/prod/
```

Each environment has its own Kustomize configuration.

The overall structure is:

```text
kubernetes/
├── base/
│
└── overlays/
    ├── dev/
    ├── qa/
    └── prod/
```

---

# 21. Verify the Production Application

### What We Wanted

After the Production resources were running, we wanted to verify that the application was reachable through the existing Kubernetes networking configuration.

### Commands

First check the Ingress:

```bash
kubectl get ingress -n flavorforge
```

Then verify the Services:

```bash
kubectl get svc -n flavorforge
```

Then verify the Pods:

```bash
kubectl get pods -n flavorforge
```

### Result

These checks verify the complete path:

```text
External Entry Point
        ↓
NGINX Ingress
        ↓
Frontend / Backend Services
        ↓
FlavorForge Pods
```

---

# 22. Production Kustomize Flow

The complete Production overlay flow is:

```text
FlavorForge Repository
          ↓
kubernetes/base/
          ↓
kubernetes/overlays/prod/
          ↓
Production kustomization.yaml
          ↓
Backend / Frontend Patches
          ↓
kubectl kustomize
          ↓
Rendered Configuration
          ↓
kubectl apply -k
          ↓
Kubernetes Cluster
          ↓
FlavorForge Workloads
```

This is how the Production environment is assembled from the common base and the Production overlay.

---

# 23. What We Actually Achieved

The FlavorForge Production Kubernetes configuration was organized using a Kustomize overlay.

The actual repository structure is:

```text
kubernetes/
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
    │   ├── backend-replica-patch.yaml
    │   ├── frontend-replica-patch.yaml
    │   └── kustomization.yaml
    │
    ├── qa/
    │   ├── backend-replica-patch.yaml
    │   ├── frontend-replica-patch.yaml
    │   └── kustomization.yaml
    │
    └── prod/
        ├── backend-replica-patch.yaml
        ├── frontend-replica-patch.yaml
        └── kustomization.yaml
```

The Production overlay reuses the common base and applies the Production-specific replica patches.

---

# 24. Kustomize Stage Progress

The Kustomize BUILD-JOURNEY now progresses as:

```text
01 — Kustomize Structure
        ↓
02 — Base
        ↓
03 — Dev Overlay
        ↓
04 — QA Overlay
        ↓
05 — Production Overlay
        ↓
06 — Kustomize Verification
```

The next document is:

```text
docs/week-4/BUILD-JOURNEY/07-kustomize/06-kustomize-verification.md
```

The next step will verify the complete FlavorForge Kustomize structure using the actual Base, Dev, QA, and Production configurations.
