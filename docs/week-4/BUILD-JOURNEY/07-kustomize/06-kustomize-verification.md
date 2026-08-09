# 06 — Kustomize Verification

## 1. Purpose

After creating the Kustomize Base and the Dev, QA, and Production overlays, the next step was to verify that the FlavorForge Kubernetes configuration could be rendered correctly for each environment.

The verification flow was:

```text
Kustomize Base
      ↓
Environment Overlay
      ↓
Rendered Kubernetes Configuration
      ↓
Kubernetes Resources
      ↓
Running FlavorForge Workloads
```

The FlavorForge Kustomize structure is:

```text
kubernetes/
├── base/
└── overlays/
    ├── dev/
    ├── qa/
    └── prod/
```

---

# 2. Verify the Kustomize Directory

From the FlavorForge repository root, first check the Kubernetes directory:

```bash
ls kubernetes
```

The output should show:

```text
base
overlays
```

Then check the environment overlays:

```bash
ls kubernetes/overlays
```

The output should show:

```text
dev
qa
prod
```

This confirms that the common Base and the three environment overlays are present.

---

# 3. Verify the Base

The common Kubernetes configuration is stored under:

```text
kubernetes/base/
```

Verify the Base directory:

```bash
ls kubernetes/base
```

The Base contains the common FlavorForge Kubernetes resources.

The structure includes:

```text
backend/
frontend/
config/
ingress/
autoscaling/
namespace.yaml
kustomization.yaml
```

The Base is the common configuration used by the environment overlays.

---

# 4. Render the Dev Overlay

The Dev configuration was rendered using:

```bash
kubectl kustomize kubernetes/overlays/dev
```

This combines the common Base with the Dev-specific configuration.

The rendering flow is:

```text
kubernetes/base/
       +
kubernetes/overlays/dev/
       ↓
kubectl kustomize
       ↓
Rendered Dev Configuration
```

The command outputs the Kubernetes YAML without directly applying it to the cluster.

---

# 5. Render the QA Overlay

The QA configuration was rendered using:

```bash
kubectl kustomize kubernetes/overlays/qa
```

The rendering flow is:

```text
kubernetes/base/
       +
kubernetes/overlays/qa/
       ↓
kubectl kustomize
       ↓
Rendered QA Configuration
```

This verifies that the QA overlay can be combined with the common Base successfully.

---

# 6. Render the Production Overlay

The Production configuration was rendered using:

```bash
kubectl kustomize kubernetes/overlays/prod
```

The rendering flow is:

```text
kubernetes/base/
       +
kubernetes/overlays/prod/
       ↓
kubectl kustomize
       ↓
Rendered Production Configuration
```

This verifies that the Production overlay can also be rendered from the same common Base.

---

# 7. Compare the Environment Structure

The three environment configurations follow the same Kustomize model:

```text
                  Kubernetes Base
                        │
          ┌─────────────┼─────────────┐
          │             │             │
          ▼             ▼             ▼
         Dev           QA            Prod
      Overlay        Overlay        Overlay
          │             │             │
          ▼             ▼             ▼
     Environment-specific configuration
```

The common Kubernetes resources remain in:

```text
kubernetes/base/
```

while environment-specific changes remain under:

```text
kubernetes/overlays/
```

---

# 8. Verify the Dev Deployment

After the Dev configuration is deployed, verify the workloads in the FlavorForge namespace:

```bash
kubectl get deployments -n flavorforge
```

Then check the Pods:

```bash
kubectl get pods -n flavorforge
```

The result verifies that the Kubernetes workloads created from the configuration are running in the cluster.

The relationship is:

```text
Dev Overlay
     ↓
Deployment
     ↓
ReplicaSet
     ↓
Pods
```

---

# 9. Verify Services

The Services can be checked with:

```bash
kubectl get svc -n flavorforge
```

This verifies the networking resources associated with the FlavorForge workloads.

The relationship is:

```text
Deployment
    ↓
Pods
    ↓
Service
```

The Services provide the stable network endpoints used by the application.

---

# 10. Verify Ingress

The Ingress configuration can be verified with:

```bash
kubectl get ingress -n flavorforge
```

This confirms that the application routing resource exists in the `flavorforge` namespace.

The application networking path is:

```text
External Request
      ↓
NGINX Ingress
      ↓
Service
      ↓
Pod
```

---

# 11. Verify Autoscaling

The HPA can be checked with:

```bash
kubectl get hpa -n flavorforge
```

This verifies that the autoscaling resource is present.

The relationship is:

```text
Metrics
   ↓
HPA
   ↓
Deployment
   ↓
Pods
```

The HPA therefore operates alongside the Deployments created from the Kubernetes configuration.

---

# 12. Verify the Complete Namespace

The complete FlavorForge Kubernetes workload can be inspected using:

```bash
kubectl get all -n flavorforge
```

This provides a combined view of the main Kubernetes resources.

The verification flow is:

```text
Kustomize Configuration
        ↓
Kubernetes Resources
        ↓
Deployments
        ↓
Pods
        ↓
Services
```

This is useful as a final cluster-level check after the Kustomize configuration has been deployed.

---

# 13. Verify the Running Pods

The Pod status was checked with:

```bash
kubectl get pods -n flavorforge
```

The important information is the Pod status.

A running application should show the required Pods in a healthy state.

The relationship is:

```text
Deployment
    ↓
Pods
    ↓
Running Containers
```

This confirms that the Kubernetes configuration resulted in actual running workloads.

---

# 14. Verify the Backend

The backend workload can be checked separately:

```bash
kubectl get pods -n flavorforge
```

The backend Pods can then be inspected with:

```bash
kubectl describe pod <backend-pod-name> -n flavorforge
```

This allows the deployed backend workload to be inspected from the Kubernetes cluster.

The backend path is:

```text
Backend Deployment
       ↓
Backend Pod
       ↓
Node.js + Express
```

---

# 15. Verify the Frontend

The frontend workload can be checked through the same namespace:

```bash
kubectl get pods -n flavorforge
```

The frontend Pod can then be inspected with:

```bash
kubectl describe pod <frontend-pod-name> -n flavorforge
```

The frontend path is:

```text
Frontend Deployment
       ↓
Frontend Pod
       ↓
Nginx
       ↓
React Application
```

---

# 16. Verify Kustomize Configuration Against the Cluster

The Kustomize configuration can be rendered without applying it:

```bash
kubectl kustomize kubernetes/overlays/dev
```

The same verification can be performed for QA:

```bash
kubectl kustomize kubernetes/overlays/qa
```

and Production:

```bash
kubectl kustomize kubernetes/overlays/prod
```

This separates two checks:

```text
Kustomize rendering
        ↓
Is the configuration assembled correctly?
```

and:

```text
kubectl get ...
        ↓
Are the resulting Kubernetes resources running?
```

Both are useful when verifying the deployment configuration.

---

# 17. Verify the Application Through Kubernetes

After the Kubernetes resources are running, the application can be verified through the existing Ingress entry point.

The frontend path is:

```text
External IP
      ↓
NGINX Ingress
      ↓
Frontend Service
      ↓
Frontend Pods
      ↓
FlavorForge UI
```

The backend health path is:

```text
External IP
      ↓
NGINX Ingress
      ↓
Backend Service
      ↓
Backend Pods
      ↓
/api/health
```

This confirms that the Kustomize-managed Kubernetes resources are connected to the application networking layer.

---

# 18. Verify the Backend Health Endpoint

The FlavorForge backend health endpoint is:

```text
/api/health
```

The deployed application can be checked through the existing Ingress address:

```text
http://<INGRESS-IP>/api/health
```

The expected result is a successful backend health response.

The verification chain is:

```text
Browser / HTTP Request
        ↓
Ingress
        ↓
Backend Service
        ↓
Backend Pod
        ↓
Express API
        ↓
Health Response
```

---

# 19. Verify the Kustomize Environment Model

At this point the complete Kustomize structure is:

```text
kubernetes/
│
├── base/
│   ├── backend/
│   ├── frontend/
│   ├── config/
│   ├── ingress/
│   ├── autoscaling/
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

This confirms the intended Base + Overlay structure.

---

# 20. Kustomize Verification Flow

The complete verification process is:

```text
FlavorForge Repository
        ↓
kubernetes/base/
        ↓
Environment Overlay
        ↓
kubectl kustomize
        ↓
Rendered Kubernetes YAML
        ↓
Kubernetes Cluster
        ↓
Deployments
        ↓
Pods
        ↓
Services
        ↓
Ingress
        ↓
Application
```

Each environment uses the same common Kubernetes foundation while applying its own overlay configuration.

---

# 21. What We Actually Verified

The Kustomize stage verified the following:

```text
Base exists
   ↓
Dev overlay exists
   ↓
QA overlay exists
   ↓
Prod overlay exists
   ↓
Dev configuration renders
   ↓
QA configuration renders
   ↓
Prod configuration renders
   ↓
Kubernetes workloads verified
   ↓
Services verified
   ↓
Ingress verified
   ↓
HPA verified
```

The important point is that Kustomize is not a separate application runtime.

It is the configuration layer used to assemble the Kubernetes manifests for each FlavorForge environment.

---

# 22. Kustomize Evidence

The Kustomize verification evidence should be kept with the existing Kubernetes screenshots for the actual FlavorForge implementation.

```text
screenshots/kubernetes/
```

The previously captured Base, overlay, Deployment, Service, Ingress, and workload screenshots provide the visual evidence for the configuration and deployment stages.

---

# 23. Result

The FlavorForge Kubernetes configuration was organized into a reusable Kustomize structure:

```text
                    Base
                     │
          ┌──────────┼──────────┐
          │          │          │
          ▼          ▼          ▼
         Dev        QA         Prod
       Overlay    Overlay     Overlay
          │          │          │
          └──────────┼──────────┘
                     ▼
              Kubernetes Cluster
                     │
             ┌───────┴───────┐
             ▼               ▼
        Application       Networking
        Workloads          Resources
```

The Base provided the common Kubernetes configuration, while the environment overlays provided environment-specific configuration.

The rendered configurations were verified with Kustomize, and the resulting Kubernetes resources were verified in the `flavorforge` namespace.

---

# 24. Kustomize Stage Completed

The Kustomize BUILD-JOURNEY is now complete:

```text
01 — Kustomize Structure
        ↓
02 — Base
        ↓
03 — Dev Overlay
        ↓
04 — QA Overlay
        ↓
05 — Prod Overlay
        ↓
06 — Kustomize Verification
```

The next BUILD-JOURNEY stage can move to the next part of the FlavorForge implementation.
