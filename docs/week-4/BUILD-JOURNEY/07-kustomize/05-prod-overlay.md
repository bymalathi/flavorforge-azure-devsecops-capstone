# 05 — Kustomize Production Overlay

## 1. Purpose

After creating the common Kubernetes base and the Dev and QA overlays, the next step was to define the Production overlay for FlavorForge.

The Production overlay reuses the common Kubernetes configuration from:

```text
kubernetes/base/
```

and applies the Production-specific configuration from:

```text
kubernetes/overlays/prod/
```

The structure is:

```text
kubernetes/
├── base/
│
└── overlays/
    └── prod/
        ├── backend-replica-patch.yaml
        ├── frontend-replica-patch.yaml
        └── kustomization.yaml
```

The goal was to avoid maintaining a separate copy of every Kubernetes manifest for Production.

---

# 2. What We Wanted

We wanted the Production environment to use the same common FlavorForge Kubernetes resources while allowing Production-specific replica settings.

The model was:

```text
Common Kubernetes Configuration
              ↓
          Base
              ↓
       Production Overlay
              ↓
     Production Deployment
```

This means the Production environment does not need duplicate copies of:

```text
Deployment
Service
ConfigMap
Secret template
Ingress
HPA
```

The overlay applies only the environment-specific changes.

---

# 3. Production Overlay Directory

The Production overlay is located at:

```text
kubernetes/overlays/prod/
```

The directory contains:

```text
backend-replica-patch.yaml
frontend-replica-patch.yaml
kustomization.yaml
```

The relationship is:

```text
kubernetes/overlays/prod/
        │
        ├── kustomization.yaml
        │
        ├── backend-replica-patch.yaml
        │
        └── frontend-replica-patch.yaml
```

---

# 4. Production Kustomization

The Production overlay is controlled by:

```text
kubernetes/overlays/prod/kustomization.yaml
```

This Kustomization connects the Production environment to the common base configuration and the Production-specific patches.

The structure is:

```text
Production Kustomization
          │
          ▼
     Kubernetes Base
          │
          ├── Backend
          ├── Frontend
          ├── Services
          ├── Config
          ├── Ingress
          └── Autoscaling
          │
          ▼
    Production Patches
          │
       ┌──┴──┐
       ▼     ▼
   Backend  Frontend
   replicas replicas
```

---

# 5. Verify the Production Overlay Files

From the FlavorForge repository root, check the Production overlay:

```bash
ls kubernetes/overlays/prod
```

The directory should contain:

```text
backend-replica-patch.yaml
frontend-replica-patch.yaml
kustomization.yaml
```

This confirms that the Production overlay files are present.

### Evidence

```text
screenshots/kubernetes/kustomize/prod-overlay-files.png
```

---

# 6. Backend Replica Patch

The Production backend replica configuration is maintained in:

```text
kubernetes/overlays/prod/backend-replica-patch.yaml
```

The patch changes the replica configuration of the backend Deployment for the Production environment.

The relationship is:

```text
Base Backend Deployment
          ↓
Production Backend Patch
          ↓
Production Backend Deployment
```

This allows Production to use a different replica configuration without modifying the common backend Deployment.

---

# 7. Frontend Replica Patch

The Production frontend replica configuration is maintained in:

```text
kubernetes/overlays/prod/frontend-replica-patch.yaml
```

The patch changes the replica configuration of the frontend Deployment for Production.

The relationship is:

```text
Base Frontend Deployment
          ↓
Production Frontend Patch
          ↓
Production Frontend Deployment
```

The common frontend configuration remains in the base.

---

# 8. Build the Production Configuration

Before applying the Production overlay to the cluster, the rendered Kubernetes configuration can be generated with:

```bash
kubectl kustomize kubernetes/overlays/prod
```

This renders the complete Production configuration by combining:

```text
Base resources
       +
Production patches
       ↓
Rendered Production manifests
```

The command does not directly modify the cluster.

It allows the resulting Production configuration to be inspected before deployment.

---

# 9. Verify the Rendered Production Configuration

The rendered output can be reviewed directly in the terminal:

```bash
kubectl kustomize kubernetes/overlays/prod
```

The output should contain the Kubernetes resources assembled from the Production overlay.

The important part is that the Production configuration contains the resources required by FlavorForge, including the backend and frontend Deployments and their related Kubernetes resources.

The flow is:

```text
kubernetes/base/
       +
kubernetes/overlays/prod/
       ↓
kubectl kustomize
       ↓
Rendered Production Configuration
```

---

# 10. Apply the Production Overlay

Once the Production configuration is ready, it can be applied to the Kubernetes cluster with:

```bash
kubectl apply -k kubernetes/overlays/prod
```

Kustomize resolves the base and Production overlay and sends the resulting Kubernetes resources to the cluster.

The deployment flow is:

```text
Production Overlay
        ↓
Kustomize
        ↓
Kubernetes API
        ↓
Production Resources
```

---

# 11. Verify Production Deployments

After applying the Production overlay, check the Deployments:

```bash
kubectl get deployments -n flavorforge
```

This verifies that the FlavorForge Deployments are present in the namespace.

The expected workload structure is:

```text
flavorforge namespace
        │
        ├── Backend Deployment
        │
        └── Frontend Deployment
```

---

# 12. Verify Production Pods

The running Pods can be checked with:

```bash
kubectl get pods -n flavorforge
```

This verifies whether the application Pods created by the Deployments are running.

The flow is:

```text
Production Deployment
        ↓
ReplicaSet
        ↓
Production Pods
```

The Pod status provides the first confirmation that the Production workload was successfully created.

---

# 13. Verify Production Services

The Services can be checked using:

```bash
kubectl get svc -n flavorforge
```

This verifies that the frontend and backend Services are available for the Production workloads.

The relationship remains:

```text
Production Pods
       ↓
Kubernetes Services
       ↓
Application Networking
```

---

# 14. Verify Production Ingress

The Ingress resource can be checked using:

```bash
kubectl get ingress -n flavorforge
```

This verifies that the application routing configuration is available.

The external request path remains:

```text
External Request
       ↓
NGINX Ingress
       ↓
Frontend / Backend Service
       ↓
Production Pods
```

---

# 15. Verify All FlavorForge Resources

A broader verification can be performed with:

```bash
kubectl get all -n flavorforge
```

This provides a consolidated view of the FlavorForge Kubernetes workloads and Services.

The verification flow is:

```text
Production Overlay
       ↓
Deployments
       ↓
Pods
       ↓
Services
       ↓
Running FlavorForge Workloads
```

---

# 16. Verify the Production Configuration

The Production configuration can also be inspected after deployment.

For the backend Deployment:

```bash
kubectl get deployment backend-prod -n flavorforge -o yaml
```

For the frontend Deployment:

```bash
kubectl get deployment frontend-prod -n flavorforge -o yaml
```

This allows the deployed Deployment configuration to be compared with the intended Production overlay.

---

# 17. Production Replica Configuration

The Production overlay exists specifically so that replica configuration can be customized independently from the base.

The model is:

```text
                    Base
                     │
             ┌───────┴───────┐
             │               │
             ▼               ▼
      Backend Deployment  Frontend Deployment
             │               │
             ▼               ▼
       Prod Patch         Prod Patch
             │               │
             └───────┬───────┘
                     ▼
             Production Workloads
```

This keeps environment-specific configuration separate from the common application definition.

---

# 18. Production Overlay and Git

The Production overlay is stored in the FlavorForge repository together with the other Kubernetes configuration.

The structure is:

```text
Git Repository
      │
      ▼
kubernetes/
      │
      ├── base/
      │
      └── overlays/
            ├── dev/
            ├── qa/
            └── prod/
```

Because the configuration is stored as code, changes to the Production configuration can be reviewed and version controlled along with the application.

---

# 19. Production Deployment Flow

The complete Production Kustomize flow is:

```text
FlavorForge Repository
          ↓
kubernetes/base/
          ↓
kubernetes/overlays/prod/
          ↓
Production Kustomization
          ↓
Backend / Frontend Patches
          ↓
Rendered Kubernetes Configuration
          ↓
kubectl apply -k
          ↓
AKS
          ↓
Production Deployments
          ↓
Production Pods
```

This is the actual purpose of the Production overlay.

---

# 20. Verify the Application

After the Production workloads are running, verify the application through the existing FlavorForge entry point.

The application path is:

```text
External IP
      ↓
NGINX Ingress
      ↓
Frontend Service
      ↓
Frontend Pods
```

The backend health endpoint can also be checked:

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

This confirms that the Production workload is not only deployed but reachable through the Kubernetes networking layer.

---

# 21. Production Overlay Evidence

The Production Kustomize configuration should be supported by the repository's Production overlay and Kubernetes verification evidence.

```text
screenshots/kubernetes/kustomize/prod-overlay-files.png
screenshots/kubernetes/kustomize/prod-kustomize-build.png
screenshots/kubernetes/kustomize/prod-deployments.png
screenshots/kubernetes/kustomize/prod-pods.png
```

These provide evidence of:

```text
Production overlay
        ↓
Rendered configuration
        ↓
Production Deployments
        ↓
Production Pods
```

---

# 22. What We Actually Achieved

The FlavorForge Production environment was organized using a Kustomize overlay rather than a separate copy of the entire Kubernetes configuration.

The final structure is:

```text
kubernetes/
├── base/
│
└── overlays/
    ├── dev/
    ├── qa/
    └── prod/
        ├── backend-replica-patch.yaml
        ├── frontend-replica-patch.yaml
        └── kustomization.yaml
```

The Production overlay reuses the common Kubernetes base and applies Production-specific replica configuration.

---

# 23. Important Learning

The important Kustomize concept at this stage is:

```text
Base
  ↓
Common Kubernetes configuration
```

while:

```text
Overlay
  ↓
Environment-specific configuration
```

For FlavorForge:

```text
                 Base
                  │
        ┌─────────┼─────────┐
        ▼         ▼         ▼
       Dev       QA        Prod
    Overlay   Overlay    Overlay
        │         │         │
        ▼         ▼         ▼
   Environment-specific configuration
```

This allows the same application definition to be reused across environments without duplicating the complete Kubernetes configuration.

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
05 — Prod Overlay
        ↓
06 — Kustomize Verification
```

The next document is:

```text
docs/week-4/BUILD-JOURNEY/07-kustomize/06-kustomize-verification.md
```

This will verify the complete FlavorForge Kustomize structure and confirm that the Base, Dev, QA, and Production configurations render and deploy correctly.
