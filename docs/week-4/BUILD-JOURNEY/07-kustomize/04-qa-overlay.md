# 04 — QA Overlay

## 1. What We Wanted

After creating the development overlay, the next step was to create the **QA overlay** for FlavorForge.

The common Kubernetes configuration remains in:

```text
kubernetes/base/
```

The QA-specific configuration is maintained under:

```text
kubernetes/overlays/qa/
```

The QA overlay follows the same structure as the development overlay:

```text
kubernetes/
├── base/
│
└── overlays/
    └── qa/
        ├── backend-replica-patch.yaml
        ├── frontend-replica-patch.yaml
        └── kustomization.yaml
```

The purpose is to reuse the common base and apply the QA-specific replica configuration.

---

# 2. Check the QA Overlay

From the FlavorForge repository root, check the QA directory:

```bash
ls kubernetes/overlays/qa
```

On Windows PowerShell:

```powershell
Get-ChildItem kubernetes/overlays/qa
```

The QA overlay contains:

```text
backend-replica-patch.yaml
frontend-replica-patch.yaml
kustomization.yaml
```

The structure is:

```text
QA Overlay
    │
    ├── Backend replica patch
    │
    ├── Frontend replica patch
    │
    └── Kustomization
```

---

# 3. Check the QA Kustomization

The main QA Kustomize file is:

```text
kubernetes/overlays/qa/kustomization.yaml
```

From the repository root, inspect it:

```bash
cat kubernetes/overlays/qa/kustomization.yaml
```

On Windows PowerShell:

```powershell
Get-Content kubernetes/overlays/qa/kustomization.yaml
```

This connects the QA overlay with the common Kubernetes base and the QA-specific patches.

The configuration flow is:

```text
QA kustomization.yaml
        ↓
kubernetes/base
        ↓
QA-specific patches
        ↓
QA Kubernetes configuration
```

---

# 4. Check the QA Backend Patch

The QA backend replica patch is:

```text
kubernetes/overlays/qa/backend-replica-patch.yaml
```

Inspect the file:

```bash
cat kubernetes/overlays/qa/backend-replica-patch.yaml
```

On Windows PowerShell:

```powershell
Get-Content kubernetes/overlays/qa/backend-replica-patch.yaml
```

This patch changes the backend Deployment configuration for the QA environment.

The configuration flow is:

```text
Base Backend Deployment
          ↓
QA Backend Replica Patch
          ↓
QA Backend Deployment
```

The complete backend Deployment does not need to be duplicated inside the QA directory.

---

# 5. Check the QA Frontend Patch

The QA frontend replica patch is:

```text
kubernetes/overlays/qa/frontend-replica-patch.yaml
```

Inspect the file:

```bash
cat kubernetes/overlays/qa/frontend-replica-patch.yaml
```

On Windows PowerShell:

```powershell
Get-Content kubernetes/overlays/qa/frontend-replica-patch.yaml
```

This patch changes the frontend Deployment configuration for the QA environment.

The configuration flow is:

```text
Base Frontend Deployment
          ↓
QA Frontend Replica Patch
          ↓
QA Frontend Deployment
```

---

# 6. Render the QA Overlay

Before applying the QA configuration, render it with:

```bash
kubectl kustomize kubernetes/overlays/qa
```

Kustomize combines:

```text
kubernetes/base/
        +
kubernetes/overlays/qa/
```

and produces the Kubernetes configuration for the QA environment.

The flow is:

```text
Base
  +
QA Overlay
  ↓
Kustomize
  ↓
QA Kubernetes YAML
```

This allows the generated configuration to be checked before it is applied to the cluster.

---

# 7. Check the Rendered QA Workloads

The rendered configuration contains the common FlavorForge resources together with the QA-specific Deployment changes.

The important application workloads are:

```text
Backend Deployment
Frontend Deployment
```

The backend configuration is produced from:

```text
Base Backend
      +
QA Backend Patch
      ↓
QA Backend Deployment
```

The frontend configuration is produced from:

```text
Base Frontend
      +
QA Frontend Patch
      ↓
QA Frontend Deployment
```

---

# 8. Apply the QA Overlay

The QA overlay is applied using:

```bash
kubectl apply -k kubernetes/overlays/qa
```

The `-k` option tells `kubectl` to process the Kustomize configuration.

The deployment flow is:

```text
kubernetes/overlays/qa
          ↓
       Kustomize
          ↓
    Base + QA Patches
          ↓
   Kubernetes Resources
          ↓
       AKS Cluster
```

---

# 9. Verify QA Deployments

After applying the QA overlay, check the Deployments:

```bash
kubectl get deployments -n flavorforge
```

This verifies the frontend and backend Deployments running in the namespace.

The relationship is:

```text
QA Overlay
    ↓
Deployments
    ↓
ReplicaSets
    ↓
Pods
```

---

# 10. Verify QA Pods

Check the running Pods:

```bash
kubectl get pods -n flavorforge
```

The output shows the current frontend and backend workload Pods.

This allows us to verify whether the Deployments created the expected Pods successfully.

---

# 11. Verify QA Replica Configuration

The QA overlay contains separate replica patches:

```text
backend-replica-patch.yaml
frontend-replica-patch.yaml
```

The resulting Deployment state can be checked using:

```bash
kubectl get deployments -n flavorforge
```

The output provides:

```text
NAME
READY
UP-TO-DATE
AVAILABLE
```

This verifies the resulting replica state of the frontend and backend Deployments.

---

# 12. Verify QA Services

The Services come from the common Kubernetes base.

Check them with:

```bash
kubectl get svc -n flavorforge
```

The application networking remains:

```text
Frontend Service
       ↓
Frontend Pods
```

and:

```text
Backend Service
       ↓
Backend Pods
```

The QA overlay does not require separate copies of the Service manifests.

---

# 13. Verify QA Ingress

Check the Ingress resource:

```bash
kubectl get ingress -n flavorforge
```

The request path remains:

```text
External Request
       ↓
NGINX Ingress
       ↓
Service
       ↓
QA Pods
```

The common Ingress configuration is reused through the base.

---

# 14. Verify QA Configuration

Check the ConfigMaps:

```bash
kubectl get configmap -n flavorforge
```

Check the Secrets:

```bash
kubectl get secrets -n flavorforge
```

These resources come from the common Kubernetes configuration and are available to the resulting QA workload.

---

# 15. Verify QA HPA

Check the Horizontal Pod Autoscaler:

```bash
kubectl get hpa -n flavorforge
```

The autoscaling configuration is maintained in the base and is included when the QA overlay is rendered.

The relationship is:

```text
Base HPA Configuration
        ↓
QA Kustomization
        ↓
QA Kubernetes Resources
```

---

# 16. Verify All QA Resources

The complete namespace can be checked with:

```bash
kubectl get all -n flavorforge
```

This provides a combined view of:

```text
Pods
Services
Deployments
ReplicaSets
```

This is the final resource-level check after applying the QA overlay.

---

# 17. Verify Backend Workload

Identify the backend Pods:

```bash
kubectl get pods -n flavorforge
```

Then inspect the backend Pod:

```bash
kubectl describe pod <backend-pod-name> -n flavorforge
```

The resulting workload is based on:

```text
Base Backend Deployment
          ↓
QA Backend Patch
          ↓
Backend Deployment
          ↓
ReplicaSet
          ↓
Backend Pods
```

---

# 18. Verify Frontend Workload

Identify the frontend Pods:

```bash
kubectl get pods -n flavorforge
```

Then inspect the frontend Pod:

```bash
kubectl describe pod <frontend-pod-name> -n flavorforge
```

The resulting workload is based on:

```text
Base Frontend Deployment
          ↓
QA Frontend Patch
          ↓
Frontend Deployment
          ↓
ReplicaSet
          ↓
Frontend Pods
```

---

# 19. QA Overlay Verification Flow

The QA overlay verification follows the same practical sequence used for the Kubernetes environment:

```text
Check QA files
      ↓
Check kustomization.yaml
      ↓
Check backend replica patch
      ↓
Check frontend replica patch
      ↓
Render QA overlay
      ↓
Apply QA overlay
      ↓
Check Deployments
      ↓
Check Pods
      ↓
Check Services
      ↓
Check Ingress
      ↓
Check HPA
      ↓
Check all resources
```

---

# 20. Base + QA Overlay

The important part of the FlavorForge Kustomize structure is that QA reuses the common base.

The configuration is assembled as:

```text
                 Kubernetes Base
                       │
          ┌────────────┼────────────┐
          │            │            │
          ▼            ▼            ▼
       Backend      Frontend      Config
          │            │            │
          └────────────┼────────────┘
                       │
                       ▼
                  QA Overlay
                       │
              ┌────────┴────────┐
              ▼                 ▼
       Backend Patch      Frontend Patch
              │                 │
              └────────┬────────┘
                       ▼
                 QA Configuration
```

This avoids maintaining separate copies of the complete Kubernetes manifests.

---

# 21. What We Actually Achieved

The FlavorForge QA environment was organized using a Kustomize overlay.

The QA overlay contains:

```text
kubernetes/overlays/qa/
├── backend-replica-patch.yaml
├── frontend-replica-patch.yaml
└── kustomization.yaml
```

It reuses the common configuration from:

```text
kubernetes/base/
```

and applies QA-specific replica configuration to the frontend and backend Deployments.

The resulting flow is:

```text
Kubernetes Base
      ↓
QA Overlay
      ↓
Replica Patches
      ↓
Kustomize
      ↓
kubectl apply -k
      ↓
FlavorForge QA Workloads
```

---

# 22. Result

The QA environment now has its own Kustomize layer while continuing to use the common FlavorForge Kubernetes base.

The resulting structure is:

```text
kubernetes/
│
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
    └── qa/
        ├── backend-replica-patch.yaml
        ├── frontend-replica-patch.yaml
        └── kustomization.yaml
```

The next document is:

```text
07-kustomize/05-prod-overlay.md
```
