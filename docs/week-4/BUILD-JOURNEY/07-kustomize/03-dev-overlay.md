# 03 — Development Overlay

## 1. What We Wanted

After creating the common Kustomize base, the next step was to create the **Development overlay** for FlavorForge.

The common configuration remains under:

```text
kubernetes/base/
```

The development-specific configuration is under:

```text
kubernetes/overlays/dev/
```

The structure is:

```text
kubernetes/
├── base/
│
└── overlays/
    └── dev/
        ├── backend-replica-patch.yaml
        ├── frontend-replica-patch.yaml
        └── kustomization.yaml
```

The purpose of the development overlay is to reuse the common base while applying the development-specific replica configuration.

---

# 2. Check the Development Overlay

From the FlavorForge repository root, check the overlay:

```bash
ls kubernetes/overlays/dev
```

On Windows PowerShell:

```powershell
Get-ChildItem kubernetes/overlays/dev
```

The development overlay contains:

```text
backend-replica-patch.yaml
frontend-replica-patch.yaml
kustomization.yaml
```

The relationship is:

```text
                Kubernetes Base
                      │
                      ▼
              Development Overlay
                      │
             ┌────────┴────────┐
             ▼                 ▼
      Backend Patch      Frontend Patch
```

---

# 3. Check the Development Kustomization

The main file for the development overlay is:

```text
kubernetes/overlays/dev/kustomization.yaml
```

From the repository root:

```bash
cat kubernetes/overlays/dev/kustomization.yaml
```

On Windows PowerShell:

```powershell
Get-Content kubernetes/overlays/dev/kustomization.yaml
```

This file connects the development overlay with the common Kubernetes base and the development-specific patches.

The structure is:

```text
dev/kustomization.yaml
        │
        ▼
   kubernetes/base
        │
        ├── Backend
        ├── Frontend
        ├── Config
        ├── Ingress
        └── Autoscaling
        │
        ▼
   Development patches
```

---

# 4. Backend Replica Patch

The development backend replica configuration is maintained in:

```text
kubernetes/overlays/dev/backend-replica-patch.yaml
```

Check the file:

```bash
cat kubernetes/overlays/dev/backend-replica-patch.yaml
```

On Windows PowerShell:

```powershell
Get-Content kubernetes/overlays/dev/backend-replica-patch.yaml
```

This patch changes the backend Deployment configuration for the development environment.

The important point is that the complete backend Deployment does not need to be copied into the `dev` directory.

Instead:

```text
Base Backend Deployment
          ↓
Development Replica Patch
          ↓
Development Backend Deployment
```

---

# 5. Frontend Replica Patch

The development frontend replica configuration is maintained in:

```text
kubernetes/overlays/dev/frontend-replica-patch.yaml
```

Check the file:

```bash
cat kubernetes/overlays/dev/frontend-replica-patch.yaml
```

On Windows PowerShell:

```powershell
Get-Content kubernetes/overlays/dev/frontend-replica-patch.yaml
```

The patch modifies the frontend Deployment for the development environment.

The flow is:

```text
Base Frontend Deployment
          ↓
Development Replica Patch
          ↓
Development Frontend Deployment
```

---

# 6. Render the Development Overlay

Before applying the development configuration, render the overlay:

```bash
kubectl kustomize kubernetes/overlays/dev
```

This combines:

```text
Base
 +
Development overlay
```

and produces the Kubernetes resources that would be generated for the development environment.

The flow is:

```text
kubernetes/base/
       +
kubernetes/overlays/dev/
       ↓
Kustomize
       ↓
Development Kubernetes configuration
```

---

# 7. Check the Development Deployment Configuration

The rendered configuration can be reviewed before deployment.

The important workloads are:

```text
Backend Deployment
Frontend Deployment
```

The development overlay applies the replica patches to these Deployments.

The configuration therefore becomes:

```text
Backend Base
     ↓
Backend Dev Patch
     ↓
Dev Backend Deployment
```

and:

```text
Frontend Base
     ↓
Frontend Dev Patch
     ↓
Dev Frontend Deployment
```

---

# 8. Apply the Development Overlay

The development configuration is applied with:

```bash
kubectl apply -k kubernetes/overlays/dev
```

The `-k` option tells `kubectl` to process the Kustomize configuration rather than applying one individual YAML file.

The deployment flow is:

```text
kubernetes/overlays/dev
          ↓
       Kustomize
          ↓
       Base + Patches
          ↓
 Kubernetes Development Resources
          ↓
       AKS Cluster
```

---

# 9. Verify Development Pods

After applying the development overlay, check the Pods:

```bash
kubectl get pods -n flavorforge
```

The running workloads should show the FlavorForge frontend and backend Pods.

The relationship is:

```text
Development Overlay
        ↓
Deployments
        ↓
ReplicaSets
        ↓
Pods
```

---

# 10. Verify Development Deployments

Check the Deployments:

```bash
kubectl get deployments -n flavorforge
```

This verifies the backend and frontend Deployments created from the Kustomize configuration.

The deployment structure is:

```text
Backend Deployment
       ↓
Backend Pods
```

```text
Frontend Deployment
       ↓
Frontend Pods
```

---

# 11. Verify Replica Counts

The development overlay contains separate replica patches for the backend and frontend.

The resulting replica configuration can be checked with:

```bash
kubectl get deployments -n flavorforge
```

The output allows us to compare:

```text
Desired
Current
Ready
Available
```

for the deployed workloads.

This confirms that the development overlay was applied to the Deployments.

---

# 12. Verify Services

The Services created from the base configuration remain available to the development environment.

Check them with:

```bash
kubectl get svc -n flavorforge
```

The expected application networking remains:

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

The overlay changes the environment-specific Deployment configuration without requiring duplicate Service manifests.

---

# 13. Verify Ingress

The common Ingress configuration is also part of the Kustomize configuration.

Check the deployed Ingress:

```bash
kubectl get ingress -n flavorforge
```

The request path remains:

```text
External Request
       ↓
NGINX Ingress
       ↓
Frontend / Backend Service
       ↓
Development Pods
```

---

# 14. Verify the Complete Development Workload

The complete development workload can be checked with:

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

This is useful after applying the overlay because it shows whether the resulting Kubernetes resources are running correctly.

---

# 15. Verify the Backend

The backend Pods can be identified with:

```bash
kubectl get pods -n flavorforge
```

After identifying the backend Pod, its status can be inspected with:

```bash
kubectl describe pod <backend-pod-name> -n flavorforge
```

The backend workload should be managed by the backend Deployment generated from the base plus the development overlay.

The relationship is:

```text
Base Backend Deployment
          ↓
Dev Replica Patch
          ↓
Backend Deployment
          ↓
Backend ReplicaSet
          ↓
Backend Pods
```

---

# 16. Verify the Frontend

The frontend workload can be checked in the same way:

```bash
kubectl get pods -n flavorforge
```

Then inspect the frontend Pod:

```bash
kubectl describe pod <frontend-pod-name> -n flavorforge
```

The relationship is:

```text
Base Frontend Deployment
          ↓
Dev Replica Patch
          ↓
Frontend Deployment
          ↓
Frontend ReplicaSet
          ↓
Frontend Pods
```

---

# 17. Development Overlay Verification

The development overlay verification follows this sequence:

```text
Check dev files
      ↓
Check kustomization.yaml
      ↓
Check backend replica patch
      ↓
Check frontend replica patch
      ↓
Render with kubectl kustomize
      ↓
Apply with kubectl apply -k
      ↓
Check Deployments
      ↓
Check Pods
      ↓
Check Services
      ↓
Check Ingress
```

This verifies both the Kustomize configuration and the resulting Kubernetes resources.

---

# 18. Base + Development Overlay

The important part of the FlavorForge structure is that the development environment does not require a second complete copy of the Kubernetes configuration.

Instead:

```text
                    Base
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
     Backend      Frontend      Config
        │            │            │
        └────────────┼────────────┘
                     │
                     ▼
              Development Overlay
                     │
             ┌───────┴───────┐
             ▼               ▼
       Backend Patch    Frontend Patch
             │               │
             └───────┬───────┘
                     ▼
             Development
             Configuration
```

This keeps the common Kubernetes configuration in one place.

---

# 19. What We Actually Achieved

The FlavorForge development environment was organized using a Kustomize overlay.

The development overlay contains:

```text
kubernetes/overlays/dev/
├── backend-replica-patch.yaml
├── frontend-replica-patch.yaml
└── kustomization.yaml
```

The overlay reuses:

```text
kubernetes/base/
```

and applies development-specific replica configuration to the backend and frontend Deployments.

The final configuration flow is:

```text
Kubernetes Base
      ↓
Development Overlay
      ↓
Replica Patches
      ↓
Kustomize Render
      ↓
kubectl apply -k
      ↓
FlavorForge Development Workloads
```

---

# 20. Result

The development environment now has its own Kustomize layer while continuing to reuse the common FlavorForge Kubernetes configuration.

The structure is:

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
    └── dev/
        ├── backend-replica-patch.yaml
        ├── frontend-replica-patch.yaml
        └── kustomization.yaml
```

The next environment overlay is:

```text
07-kustomize/04-qa-overlay.md
```
