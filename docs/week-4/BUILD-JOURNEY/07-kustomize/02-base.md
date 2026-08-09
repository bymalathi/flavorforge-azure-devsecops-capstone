# 02 — Kustomize Base

## 1. What We Wanted

After creating the Kubernetes manifests, the next step was to organize the common Kubernetes configuration into a reusable **Kustomize base**.

FlavorForge keeps the common Kubernetes resources under:

```text
kubernetes/base/
```

The base contains the resources shared by the different environments.

The structure used by FlavorForge is:

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
```

The idea is:

```text
Common Kubernetes configuration
             ↓
          Base
             ↓
     ┌───────┼───────┐
     ↓       ↓       ↓
    Dev      QA     Prod
```

---

# 2. Go to the FlavorForge Repository

Open a terminal and move to the FlavorForge repository.

From the repository root, verify that the Kubernetes directory exists:

```bash
ls kubernetes
```

On Windows PowerShell:

```powershell
Get-ChildItem kubernetes
```

The Kubernetes directory should contain:

```text
base
overlays
README.md
```

---

# 3. Check the Base Directory

We then checked the contents of the Kubernetes base:

```bash
ls kubernetes/base
```

On Windows PowerShell:

```powershell
Get-ChildItem kubernetes/base
```

The base contains the common application resources:

```text
autoscaling
backend
config
frontend
ingress
namespace.yaml
kustomization.yaml
```

This confirmed that the common Kubernetes configuration was organized under the base.

---

# 4. Check the Backend Base

The backend resources are stored under:

```text
kubernetes/base/backend/
```

Verify the directory:

```bash
ls kubernetes/base/backend
```

The backend directory contains:

```text
deployment.yaml
service.yaml
kustomization.yaml
```

The structure is:

```text
backend/
├── deployment.yaml
├── service.yaml
└── kustomization.yaml
```

These files define the common backend Kubernetes resources.

---

# 5. Check the Frontend Base

The frontend resources are stored under:

```text
kubernetes/base/frontend/
```

Verify the directory:

```bash
ls kubernetes/base/frontend
```

The frontend directory contains:

```text
deployment.yaml
service.yaml
kustomization.yaml
```

The structure is:

```text
frontend/
├── deployment.yaml
├── service.yaml
└── kustomization.yaml
```

These files define the common frontend Kubernetes resources.

---

# 6. Check the Configuration Base

The application configuration is stored under:

```text
kubernetes/base/config/
```

Verify it:

```bash
ls kubernetes/base/config
```

The directory contains:

```text
backend-configmap.yaml
secret-template.yaml
kustomization.yaml
```

The structure is:

```text
config/
├── backend-configmap.yaml
├── secret-template.yaml
└── kustomization.yaml
```

This keeps the backend configuration resources together.

---

# 7. Check the Ingress Base

The Ingress configuration is stored under:

```text
kubernetes/base/ingress/
```

Verify it:

```bash
ls kubernetes/base/ingress
```

The directory contains:

```text
ingress.yaml
kustomization.yaml
```

The structure is:

```text
ingress/
├── ingress.yaml
└── kustomization.yaml
```

---

# 8. Check the Autoscaling Base

The HPA configuration is stored under:

```text
kubernetes/base/autoscaling/
```

Verify it:

```bash
ls kubernetes/base/autoscaling
```

The directory contains:

```text
hpa.yaml
kustomization.yaml
```

The structure is:

```text
autoscaling/
├── hpa.yaml
└── kustomization.yaml
```

This keeps the autoscaling configuration separate from the backend Deployment.

---

# 9. Check the Namespace

The FlavorForge namespace is defined directly inside the base:

```text
kubernetes/base/namespace.yaml
```

Verify that the file exists:

```bash
ls kubernetes/base/namespace.yaml
```

On Windows PowerShell:

```powershell
Get-Item kubernetes/base/namespace.yaml
```

The namespace provides the Kubernetes namespace used by the FlavorForge resources.

---

# 10. Check the Base Kustomization

The main Kustomize file is:

```text
kubernetes/base/kustomization.yaml
```

From the repository root, inspect it:

```bash
cat kubernetes/base/kustomization.yaml
```

On Windows PowerShell:

```powershell
Get-Content kubernetes/base/kustomization.yaml
```

This file connects the common Kubernetes resources together.

The relationship is:

```text
base/kustomization.yaml
          │
          ├── Namespace
          │
          ├── Backend
          │
          ├── Frontend
          │
          ├── Config
          │
          ├── Ingress
          │
          └── Autoscaling
```

---

# 11. Build the Base with Kustomize

After confirming the structure, the base configuration can be rendered using Kustomize.

From the FlavorForge repository root, run:

```bash
kubectl kustomize kubernetes/base
```

This does not immediately change the cluster.

It renders the Kubernetes resources produced by the base configuration.

The flow is:

```text
kubernetes/base/
       ↓
kustomization.yaml
       ↓
Kustomize
       ↓
Rendered Kubernetes YAML
```

This lets us check the generated configuration before applying it.

---

# 12. Verify the Rendered Resources

The rendered output should contain the Kubernetes resources that belong to the FlavorForge base.

The important resources include:

```text
Namespace
Deployment
Service
ConfigMap
Secret
Ingress
HorizontalPodAutoscaler
```

The base therefore acts as the common Kubernetes configuration layer.

---

# 13. Apply the Base

When applying the base directly is required, the Kustomize command is:

```bash
kubectl apply -k kubernetes/base
```

This tells Kubernetes to apply the resources generated from:

```text
kubernetes/base/kustomization.yaml
```

The flow is:

```text
kubernetes/base/
       ↓
Kustomize
       ↓
Kubernetes resources
       ↓
FlavorForge namespace
       ↓
Running workloads
```

---

# 14. Verify the Namespace

After applying the configuration, verify the FlavorForge namespace:

```bash
kubectl get namespace flavorforge
```

The namespace should be present in the cluster.

This confirms that the namespace resource is available.

---

# 15. Verify FlavorForge Resources

Check the resources in the FlavorForge namespace:

```bash
kubectl get all -n flavorforge
```

This provides an overview of the running workloads and Services.

The output allows us to verify resources such as:

```text
Pods
Services
Deployments
ReplicaSets
```

---

# 16. Verify Configuration Resources

Check the ConfigMaps:

```bash
kubectl get configmap -n flavorforge
```

Check the Secrets:

```bash
kubectl get secrets -n flavorforge
```

This verifies that the configuration resources are present in the namespace.

---

# 17. Verify Ingress

Check the Ingress resources:

```bash
kubectl get ingress -n flavorforge
```

This verifies that the application routing configuration is available.

---

# 18. Verify HPA

Check the Horizontal Pod Autoscaler:

```bash
kubectl get hpa -n flavorforge
```

This verifies that the autoscaling resource from the base configuration is available.

---

# 19. Verify the Base Against the Repository

At this point, the repository structure and Kubernetes resources should line up:

```text
Repository
    │
    ▼
kubernetes/base/
    │
    ▼
kustomization.yaml
    │
    ├── Backend
    ├── Frontend
    ├── Configuration
    ├── Ingress
    ├── Autoscaling
    └── Namespace
    │
    ▼
Kubernetes
    │
    ▼
FlavorForge Resources
```

This is the foundation used by the environment overlays.

---

# 20. What We Actually Achieved

The FlavorForge Kubernetes configuration was organized into a reusable Kustomize base.

The base contains the common configuration for:

```text
Namespace
Backend
Frontend
ConfigMap
Secret Template
Ingress
HPA
```

The environment-specific configuration is kept separately under:

```text
kubernetes/overlays/
```

The final structure is:

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
    ├── qa/
    └── prod/
```

The important transition is:

```text
Individual Kubernetes YAML
            ↓
      Kustomize Base
            ↓
   Reusable Configuration
            ↓
     Environment Overlays
```

---

# 21. Base Stage Completed

The Kustomize base is now the common foundation for the FlavorForge environments.

The next stage is the development overlay:

```text
07-kustomize/
├── 01-kustomize-structure.md
├── 02-base.md
├── 03-dev-overlay.md
├── 04-qa-overlay.md
├── 05-prod-overlay.md
└── 06-kustomize-verification.md
```

Next:

```text
07-kustomize/03-dev-overlay.md
```

The next document will follow the same build-record format:

```text
What we wanted
      ↓
Where we worked
      ↓
Actual command
      ↓
What happened
      ↓
Verify command
      ↓
Screenshot/evidence
      ↓
Result
```
