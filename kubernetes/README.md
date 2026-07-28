# Kubernetes Deployment

This directory contains all Kubernetes manifests used to deploy the FlavorForge application to Azure Kubernetes Service (AKS).

The manifests are organized using a **Kustomize base/overlays** structure to support multiple deployment environments while minimizing duplication.

---

## Directory Structure

```text
kubernetes/
├── base/
│   ├── namespace.yaml
│   ├── frontend/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── kustomization.yaml
│   ├── backend/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── kustomization.yaml
│   ├── ingress/
│   │   └── ingress.yaml
│   ├── config/
│   │   ├── configmap.yaml
│   │   └── secret.yaml
│   ├── autoscaling/
│   │   └── hpa.yaml
│   └── kustomization.yaml
│
├── overlays/
│   ├── dev/
│   ├── qa/
│   └── prod/
│
└── README.md
```

---

# Directory Overview

## base/

Contains the common Kubernetes manifests shared across all environments.

Examples include:

- Namespace
- Deployments
- Services
- ConfigMaps
- Secrets
- Ingress
- Horizontal Pod Autoscaler (HPA)

The files in this directory should remain environment-independent whenever possible.

---

## overlays/

Contains environment-specific customizations.

Each overlay references the base manifests and applies only the differences required for that environment.

Current environments:

- Development (dev)
- Quality Assurance (qa)
- Production (prod)

Typical differences include:

- Replica count
- Image tag
- Resource requests and limits
- Environment variables
- Feature flags

---

# Deployment Strategy

The project uses **Kustomize** to combine the shared base configuration with environment-specific overlays.

This approach:

- Reduces YAML duplication
- Simplifies maintenance
- Supports consistent deployments across environments
- Aligns with common Kubernetes and GitOps practices

---

# Deployment Workflow

```text
Developer
    │
    ▼
GitHub Repository
    │
    ▼
Azure DevOps Pipeline
    │
    ▼
Build Docker Images
    │
    ▼
Push Images to Azure Container Registry (ACR)
    │
    ▼
Apply Kustomize Overlay
    │
    ▼
Deploy to Azure Kubernetes Service (AKS)
```

---

# Notes

The manifest files in this repository are intentionally developed incrementally.

As the project progresses, each manifest will be completed, tested, and documented with explanations and deployment examples.


---

## Kubernetes Secrets

### Goal
Store sensitive configuration securely outside the application image.

### Secret Created
- JWT_SECRET
- DATABASE_PASSWORD

### Deployment Integration
The backend Deployment consumes these values using `secretKeyRef`.

### Verification

```bash
kubectl get secrets -n flavorforge
kubectl exec <backend-pod> -n flavorforge -- printenv | grep -E "JWT_SECRET|DATABASE_PASSWORD"
```

### Result

The backend successfully reads the Secret values as environment variables.

### Enterprise Notes

- Non-sensitive configuration is stored in ConfigMaps.
- Sensitive values are stored in Kubernetes Secrets.
- Secrets are Base64 encoded by Kubernetes.
- In production, Secrets are often integrated with external secret managers such as Azure Key Vault.

---

## Horizontal Pod Autoscaler (HPA)

### Goal

Automatically scale backend Pods based on CPU utilization.

### Configuration

- Minimum Replicas: 2
- Maximum Replicas: 5
- Target CPU Utilization: 70%

### Verification

```bash
kubectl get hpa -n flavorforge
kubectl describe hpa backend-hpa -n flavorforge
```

### Result

The HPA successfully monitors backend CPU utilization and adjusts replica counts automatically within the configured limits.

### Enterprise Notes

- HPA uses Metrics Server to collect CPU metrics.
- CPU requests must be configured for utilization-based scaling.
- `minReplicas` ensures application availability during low traffic.