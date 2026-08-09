# 07 — Kubernetes Deployment Strategy

## 1. Purpose

After configuring the FlavorForge Deployments, Services, Ingress, and HPA, the next step was to verify how application updates were handled inside Kubernetes.

FlavorForge uses Kubernetes Deployments to manage the frontend and backend workloads.

The deployment flow is:

```text
Docker Image
      ↓
Kubernetes Deployment
      ↓
ReplicaSet
      ↓
Pods
      ↓
Running Application
```

The Deployment is responsible for maintaining the desired application state while Kubernetes handles replacement of Pods during updates.

---

## 2. FlavorForge Deployment Structure

The application Deployments are defined in the Kubernetes base configuration:

```text
kubernetes/
├── base/
│   ├── backend/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── kustomization.yaml
│   │
│   └── frontend/
│       ├── deployment.yaml
│       ├── service.yaml
│       └── kustomization.yaml
│
└── overlays/
    ├── dev/
    ├── qa/
    └── prod/
```

The base Deployments provide the common application workload configuration.

The environment overlays are then used for environment-specific deployment configuration.

---

## 3. Frontend Deployment

The frontend Deployment is defined at:

```text
kubernetes/base/frontend/deployment.yaml
```

The Deployment manages the frontend Pods.

The runtime relationship is:

```text
Frontend Deployment
        ↓
Frontend ReplicaSet
        ↓
Frontend Pods
        ↓
Frontend Container
        ↓
Nginx
        ↓
React Application
```

The deployed frontend Pods were verified as running in the FlavorForge environment.

![Frontend Deployment](/screenshots/kubernetes/base-frontend-deployment-yaml.png)

---

## 4. Backend Deployment

The backend Deployment is defined at:

```text
kubernetes/base/backend/deployment.yaml
```

The backend Deployment manages the Node.js + Express application Pods.

The relationship is:

```text
Backend Deployment
        ↓
Backend ReplicaSet
        ↓
Backend Pods
        ↓
Backend Container
        ↓
Node.js + Express
```

The backend Deployment was also verified in the AKS environment.

![Backend Deployment](/screenshots/kubernetes/base-backend-deployment-yaml.png)

---

## 5. Environment-Specific Deployment Configuration

FlavorForge does not maintain completely separate Deployment YAML files for every environment.

Instead, the common Deployment configuration is maintained in the base:

```text
kubernetes/base/
```

and environment-specific changes are maintained through:

```text
kubernetes/overlays/dev/
kubernetes/overlays/qa/
kubernetes/overlays/prod/
```

The deployment model is:

```text
                    Base
                     │
          ┌──────────┼──────────┐
          │          │          │
          ▼          ▼          ▼
         Dev        QA         Prod
       Overlay    Overlay     Overlay
```

This allows the same application Deployment structure to be reused across environments.

---

## 6. Replica Configuration

The environment overlays contain replica patches.

Development contains:

```text
kubernetes/overlays/dev/backend-replica-patch.yaml
kubernetes/overlays/dev/frontend-replica-patch.yaml
```

QA contains:

```text
kubernetes/overlays/qa/backend-replica-patch.yaml
kubernetes/overlays/qa/frontend-replica-patch.yaml
```

Production contains:

```text
kubernetes/overlays/prod/backend-replica-patch.yaml
kubernetes/overlays/prod/frontend-replica-patch.yaml
```

The purpose of these patches is to adjust the number of application replicas for each environment without duplicating the complete Deployment manifests.

---

## 7. Applying an Environment

FlavorForge uses Kustomize to build the Kubernetes configuration for each environment.

The environment configuration can be applied with:

```bash
kubectl apply -k kubernetes/overlays/dev
```

For QA:

```bash
kubectl apply -k kubernetes/overlays/qa
```

For production:

```bash
kubectl apply -k kubernetes/overlays/prod
```

This applies the base resources together with the environment-specific configuration.

---

## 8. Verify Deployment Status

After deployment, the Kubernetes Deployment status was checked with:

```bash
kubectl get deployments -n flavorforge-dev
```

The Pods were then checked using:

```bash
kubectl get pods -n flavorforge-dev
```

The deployed FlavorForge workloads were running successfully.

The verified development workloads included:

```text
backend-dev
frontend-dev
```

with multiple running Pods for the application workloads.

![AKS Workloads, Deployments and Pods](/screenshots/azure/15-aks-workloads-deployments-pods.png)

---

## 9. Verify Rollout Status

The backend Deployment rollout was explicitly verified using:

```bash
kubectl rollout status deployment/backend-dev -n flavorforge-dev
```

The rollout completed successfully.

This provided direct confirmation that the updated backend Deployment reached the expected running state.

The verification flow was:

```text
Deployment Update
       ↓
Kubernetes Rollout
       ↓
New ReplicaSet / Pods
       ↓
Pods Running
       ↓
Rollout Completed
```

---

## 10. Kubernetes Deployment Updates

When a Deployment configuration or application image changes, Kubernetes updates the workload through the Deployment controller.

The general FlavorForge update path is:

```text
Updated Application
        ↓
New Docker Image
        ↓
Kubernetes Deployment
        ↓
New ReplicaSet / Pods
        ↓
Running Application
```

The Deployment maintains the desired replica configuration while the new version is introduced.

---

## 11. Deployment and ReplicaSet

A Deployment does not directly create the application containers.

The Kubernetes resource relationship is:

```text
Deployment
     ↓
ReplicaSet
     ↓
Pods
     ↓
Containers
```

For FlavorForge:

```text
Backend Deployment
        ↓
Backend ReplicaSet
        ↓
Backend Pods
```

and:

```text
Frontend Deployment
        ↓
Frontend ReplicaSet
        ↓
Frontend Pods
```

This allows Kubernetes to manage the application workload as a declarative resource.

---

## 12. Verify Running Pods

The running application Pods were verified in the `flavorforge-dev` namespace.

The verification command was:

```bash
kubectl get pods -n flavorforge-dev
```

The verified Pods included two backend Pods and two frontend Pods, with the application containers running successfully.

The backend Pods included:

```text
backend-dev-7bb99f4964-hgwbw
backend-dev-7bb99f4964-klzwq
```

The frontend Pods included:

```text
frontend-dev-5bc55c9995-cftdw
frontend-dev-5bc55c9995-g5tj2
```

All verified Pods were in the running state.

---

## 13. Deployment and Services

The Deployments work together with the Kubernetes Services documented in the previous stage.

The application path is:

```text
Deployment
     ↓
Pods
     ↓
Service
     ↓
Ingress
     ↓
External User
```

For the development environment:

```text
backend-dev Deployment
        ↓
backend-dev Pods
        ↓
backend Service
```

and:

```text
frontend-dev Deployment
        ↓
frontend-dev Pods
        ↓
frontend Service
```

The Services provide stable networking while the Deployments manage the application Pods.

---

## 14. Deployment and HPA

The backend Deployment also works together with the Horizontal Pod Autoscaler documented in the previous stage.

The relationship is:

```text
Metrics Server
      ↓
     HPA
      ↓
Backend Deployment
      ↓
Replica Count
      ↓
Backend Pods
```

The Deployment remains responsible for maintaining the workload while HPA can modify the desired replica count based on resource utilization.

---

## 15. Deployment Verification in AKS

The deployed workloads were also visible from the Azure AKS environment.

![AKS Workloads, Deployments and Pods](/screenshots/azure/15-aks-workloads-deployments-pods.png)

This provided evidence that the Kubernetes Deployments and Pods were running inside the AKS cluster.

The deployment state was therefore verified at the cluster level rather than only from the repository manifests.

---

## 16. What We Actually Achieved

At this stage, FlavorForge had a Kubernetes Deployment structure that supported:

```text
Frontend Deployment
        ↓
Frontend Pods
```

and:

```text
Backend Deployment
        ↓
Backend Pods
```

The configuration was reused across environments through Kustomize:

```text
Base
 │
 ├── Dev
 ├── QA
 └── Prod
```

Replica configuration was customized through environment-specific patches.

The development rollout was verified successfully using:

```bash
kubectl rollout status deployment/backend-dev -n flavorforge-dev
```

---

## 17. Important Learning

The main deployment concepts demonstrated by FlavorForge are:

### Deployment

```text
Defines the desired application workload
```

### ReplicaSet

```text
Maintains the required Pod replicas
```

### Pod

```text
Runs the application container
```

### Kustomize Overlay

```text
Applies environment-specific configuration
```

### HPA

```text
Can adjust the Deployment replica count based on resource usage
```

The complete relationship is:

```text
Kustomize Overlay
        ↓
Deployment
        ↓
ReplicaSet
        ↓
Pods
        ↓
Service
        ↓
Ingress
```

---

## 18. Kubernetes Stage Progress

The Kubernetes BUILD-JOURNEY now progresses as:

```text
01 — Kubernetes Basics
        ↓
02 — Kubernetes Manifests
        ↓
03 — ConfigMaps and Secrets
        ↓
04 — Services
        ↓
05 — Ingress
        ↓
06 — Horizontal Pod Autoscaler
        ↓
07 — Deployment Strategy
        ↓
08 — Kubernetes Verification
```

The next document is:

```text
docs/week-4/BUILD-JOURNEY/06-kubernetes/08-kubernetes-verification.md
```

This will document the final Kubernetes verification performed on the FlavorForge AKS deployment.
