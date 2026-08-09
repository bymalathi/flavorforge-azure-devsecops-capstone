# 01 — Kustomize Structure

## 1. What We Wanted

After creating the Kubernetes base resources and environment overlays, we needed a way to organize the FlavorForge Kubernetes configuration without maintaining separate copies of every YAML file.

The structure we used was:

```text
kubernetes/
├── base/
└── overlays/
    ├── dev/
    ├── qa/
    └── prod/
```

The idea was:

```text
Common Kubernetes configuration
            ↓
           Base
            ↓
    ┌───────┼───────┐
    ↓       ↓       ↓
   Dev     QA      Prod
```

The common resources stay in `base`, while environment-specific changes are kept inside the corresponding overlay.

---

# 2. Where We Worked

The Kustomize configuration is inside the FlavorForge repository.

From the repository root, first check the Kubernetes directory:

```bash
ls kubernetes
```

The expected structure contains:

```text
base
overlays
README.md
```

---

# 3. Check the Base Directory

Move into the Kubernetes directory:

```bash
cd kubernetes
```

Then check the base directory:

```bash
ls base
```

The FlavorForge base contains the common Kubernetes resources:

```text
autoscaling
backend
config
frontend
ingress
namespace.yaml
kustomization.yaml
```

The structure is:

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

---

# 4. Check the Backend Structure

Check the backend directory:

```bash
ls base/backend
```

The backend configuration contains:

```text
deployment.yaml
service.yaml
kustomization.yaml
```

The structure is:

```text
base/backend/
├── deployment.yaml
├── service.yaml
└── kustomization.yaml
```

These files define the common backend Kubernetes resources.

---

# 5. Check the Frontend Structure

Check the frontend directory:

```bash
ls base/frontend
```

The frontend configuration contains:

```text
deployment.yaml
service.yaml
kustomization.yaml
```

The structure is:

```text
base/frontend/
├── deployment.yaml
├── service.yaml
└── kustomization.yaml
```

---

# 6. Check the Configuration Structure

Check the configuration directory:

```bash
ls base/config
```

The FlavorForge configuration contains:

```text
backend-configmap.yaml
secret-template.yaml
kustomization.yaml
```

The structure is:

```text
base/config/
├── backend-configmap.yaml
├── secret-template.yaml
└── kustomization.yaml
```

---

# 7. Check the Ingress Structure

Check the ingress directory:

```bash
ls base/ingress
```

The directory contains:

```text
ingress.yaml
kustomization.yaml
```

The structure is:

```text
base/ingress/
├── ingress.yaml
└── kustomization.yaml
```

---

# 8. Check the Autoscaling Structure

Check the autoscaling directory:

```bash
ls base/autoscaling
```

The directory contains:

```text
hpa.yaml
kustomization.yaml
```

The structure is:

```text
base/autoscaling/
├── hpa.yaml
└── kustomization.yaml
```

---

# 9. Check the Environment Overlays

Now check the overlays directory:

```bash
ls overlays
```

The FlavorForge environments are:

```text
dev
qa
prod
```

The structure is:

```text
kubernetes/overlays/
├── dev/
├── qa/
└── prod/
```

Each environment gets its own Kustomize configuration.

---

# 10. Check the Development Overlay

Check the development overlay:

```bash
ls overlays/dev
```

The development configuration contains:

```text
backend-replica-patch.yaml
frontend-replica-patch.yaml
kustomization.yaml
```

The structure is:

```text
overlays/dev/
├── backend-replica-patch.yaml
├── frontend-replica-patch.yaml
└── kustomization.yaml
```

These patches allow the development environment to change the replica configuration without copying the complete Deployment manifests.

---

# 11. Check the QA Overlay

Check the QA overlay:

```bash
ls overlays/qa
```

The QA configuration contains:

```text
backend-replica-patch.yaml
frontend-replica-patch.yaml
kustomization.yaml
```

The structure is:

```text
overlays/qa/
├── backend-replica-patch.yaml
├── frontend-replica-patch.yaml
└── kustomization.yaml
```

---

# 12. Check the Production Overlay

Check the production overlay:

```bash
ls overlays/prod
```

The production configuration contains:

```text
backend-replica-patch.yaml
frontend-replica-patch.yaml
kustomization.yaml
```

The structure is:

```text
overlays/prod/
├── backend-replica-patch.yaml
├── frontend-replica-patch.yaml
└── kustomization.yaml
```

---

# 13. Check the Complete Structure

From the `kubernetes` directory, run:

```bash
find . -maxdepth 3 -type f
```

This allows the complete Kustomize file structure to be checked from one place.

The important structure is:

```text
kubernetes/
│
├── base/
│   ├── autoscaling/
│   │   ├── hpa.yaml
│   │   └── kustomization.yaml
│   │
│   ├── backend/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── kustomization.yaml
│   │
│   ├── config/
│   │   ├── backend-configmap.yaml
│   │   ├── secret-template.yaml
│   │   └── kustomization.yaml
│   │
│   ├── frontend/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── kustomization.yaml
│   │
│   ├── ingress/
│   │   ├── ingress.yaml
│   │   └── kustomization.yaml
│   │
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

---

# 14. Check Kustomize Installation

Before building the configuration, verify that Kustomize is available:

```bash
kubectl kustomize version
```

If the command returns the Kustomize version, the Kubernetes CLI can process Kustomize configurations.

---

# 15. Build the Base Configuration

From the repository root, the base configuration can be rendered with:

```bash
kubectl kustomize kubernetes/base
```

This does not deploy anything.

It renders the Kubernetes resources generated from the base Kustomization.

The important distinction is:

```text
kubectl kustomize
        ↓
Build/render configuration
        ↓
No cluster change
```

---

# 16. Check the Development Overlay

The development overlay can be rendered with:

```bash
kubectl kustomize kubernetes/overlays/dev
```

This combines the common base configuration with the development-specific configuration.

The flow is:

```text
Base
 │
 ├── Backend
 ├── Frontend
 ├── Config
 ├── Ingress
 ├── Autoscaling
 └── Namespace
        │
        ▼
   Dev Overlay
        │
        ▼
Rendered Dev Configuration
```

---

# 17. Check the QA Overlay

The QA configuration can be rendered with:

```bash
kubectl kustomize kubernetes/overlays/qa
```

The flow is:

```text
Base
   +
QA Overlay
   ↓
Rendered QA Configuration
```

---

# 18. Check the Production Overlay

The production configuration can be rendered with:

```bash
kubectl kustomize kubernetes/overlays/prod
```

The flow is:

```text
Base
   +
Prod Overlay
   ↓
Rendered Production Configuration
```

---

# 19. What We Wanted to Achieve

The important part of this step was establishing the Kustomize structure before making environment-specific changes.

The resulting model is:

```text
                         Kubernetes
                              │
                             Base
                              │
             ┌────────────────┼────────────────┐
             │                │                │
             ▼                ▼                ▼
            Dev              QA               Prod
          Overlay          Overlay           Overlay
             │                │                │
             ▼                ▼                ▼
       Dev Resources    QA Resources    Prod Resources
```

The common Kubernetes configuration remains in one place.

Environment-specific changes are maintained separately.

---

# 20. Result

The FlavorForge Kubernetes configuration was organized into a reusable Kustomize structure:

```text
kubernetes/base
        ↓
Common resources
        ↓
Kustomize overlays
        ↓
dev / qa / prod
```

The base contains the common frontend, backend, configuration, ingress, namespace, and autoscaling resources.

The overlays contain environment-specific replica patches and Kustomization files.

This structure is now ready for the next step:

```text
02 — Base
```

where we will work directly with:

```text
kubernetes/base/kustomization.yaml
```

and verify how the common FlavorForge Kubernetes resources are assembled.
