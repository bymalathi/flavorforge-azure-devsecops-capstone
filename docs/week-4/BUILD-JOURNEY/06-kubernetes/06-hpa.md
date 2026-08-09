# 06 — Horizontal Pod Autoscaler (HPA)

## 1. Purpose

After configuring the Kubernetes Deployments and Services, the next step in the FlavorForge Kubernetes journey was to configure **Horizontal Pod Autoscaling (HPA)**.

HPA allows Kubernetes to automatically adjust the number of pod replicas based on resource utilization.

The basic idea is:

```text
Application Load
       ↓
Resource Usage
       ↓
Horizontal Pod Autoscaler
       ↓
Adjust Pod Replicas
```

For FlavorForge, HPA was configured for the backend workload.

---

## 2. Why HPA Was Required

A fixed number of replicas may not be sufficient when application traffic increases.

Without autoscaling:

```text
Higher Traffic
      ↓
Same Number of Pods
      ↓
Higher Resource Usage
      ↓
Possible Performance Issues
```

With HPA:

```text
Higher Traffic
      ↓
Higher Resource Usage
      ↓
HPA Detects Increased Usage
      ↓
More Pod Replicas
```

When the workload decreases, Kubernetes can also reduce the number of replicas within the configured limits.

---

## 3. HPA Architecture

The FlavorForge backend scaling flow is:

```text
                  Backend Application
                          │
                          ▼
                  Backend Deployment
                          │
                          ▼
                    Backend Pods
                          │
                          ▼
                  Resource Usage
                          │
                          ▼
                 Horizontal Pod Autoscaler
                          │
                  ┌───────┴───────┐
                  │               │
             Scale Up          Scale Down
                  │               │
                  ▼               ▼
             More Pods         Fewer Pods
```

The HPA works with the Kubernetes Deployment rather than directly creating independent Pods.

---

## 4. Metrics Server

Kubernetes requires resource metrics to make CPU/memory-based autoscaling decisions.

The FlavorForge Kubernetes environment included the Metrics Server.

The Metrics Server provides resource utilization information that can be used by Kubernetes autoscaling.

The verification flow is:

```text
Kubernetes Nodes
       ↓
Metrics Server
       ↓
Resource Metrics
       ↓
HPA
       ↓
Scaling Decision
```

![Metrics Server](/screenshots/kubernetes/hpa/1-metrics-server.png)

This provides evidence that the Metrics Server was available in the Kubernetes environment.

---

## 5. HPA Configuration

The HPA configuration is maintained in the Kubernetes repository under:

```text
kubernetes/base/autoscaling/
├── hpa.yaml
└── kustomization.yaml
```

The HPA is included through the Kubernetes base configuration.

The repository structure is:

```text
kubernetes/
├── base/
│   ├── autoscaling/
│   │   ├── hpa.yaml
│   │   └── kustomization.yaml
│   ├── backend/
│   ├── frontend/
│   ├── config/
│   ├── ingress/
│   └── kustomization.yaml
│
└── overlays/
    ├── dev/
    ├── qa/
    └── prod/
```

This keeps the autoscaling configuration organized separately from the backend Deployment itself.

---

## 6. Configure Autoscaling

The HPA configuration defines the scaling behavior for the backend workload.

Conceptually:

```text
Backend Deployment
       │
       ▼
Minimum Replicas
       │
       ▼
Resource Target
       │
       ▼
Maximum Replicas
```

This allows Kubernetes to maintain the backend within the configured replica range.

The configuration is applied through the Kubernetes manifests and Kustomize structure.

---

## 7. Autoscaling Configuration Verification

The autoscaling configuration was verified in the Kubernetes environment.

![Autoscaling configured successfully](/screenshots/kubernetes/hpa/2-autoscaling-configured-successfully.png)

This provides evidence that the HPA configuration was successfully established.

---

## 8. Verify Deployments and Pods

After configuring HPA, the backend Deployment and its Pods were checked.

![Deployments and Pods](/screenshots/kubernetes/hpa/3-deploymemts-pods.png)

The relationship is:

```text
HPA
 │
 ▼
Backend Deployment
 │
 ├── Backend Pod
 ├── Backend Pod
 └── ...
```

The number of Pods can change depending on the scaling decision.

---

## 9. Inspect the Backend Deployment

The backend Deployment was inspected using Kubernetes commands.

The deployment inspection provides information about:

* Replica configuration
* Pod template
* Container configuration
* Resource configuration
* Deployment status

![Backend Deployment inspection](/screenshots/kubernetes/hpa/4-kubectl-describe-deployment-backend---n-flavorforge.png)

This provides evidence of the backend Deployment configuration used by the application.

---

## 10. Check Current Pod Resource Usage

Kubernetes resource usage was checked using:

```bash
kubectl top pods -n flavorforge
```

This command displays resource usage for the Pods in the `flavorforge` namespace.

The output can be used to understand the current workload before evaluating autoscaling behavior.

![Pod resource usage](/screenshots/kubernetes/hpa/5-kubectl-top-pods-n-flavorforge.png)

This provides evidence that resource metrics were available for the FlavorForge Pods.

---

## 11. Verify HPA Status

The HPA status was checked using:

```bash
kubectl get hpa
```

This provides information such as:

* HPA name
* Target workload
* Minimum replicas
* Maximum replicas
* Current replicas
* Current resource utilization
* Target utilization

![HPA status](/screenshots/kubernetes/hpa/6-kubectl-get-hpa.png)

This provides direct evidence of the configured Horizontal Pod Autoscaler.

---

## 12. Inspect HPA Configuration

The deployed HPA resource was inspected in YAML format using:

```bash
kubectl get hpa backend-hpa -n flavorforge -o yaml
```

![HPA YAML](/screenshots/kubernetes/hpa/7-kubectl-get-hpa-backend-hpa-n-flavorforge-o-yaml.png)

This provides detailed evidence of the deployed HPA resource and its Kubernetes configuration.

---

## 13. HPA Scaling Flow

The complete scaling process can be understood as:

```text
                Backend Pods
                     │
                     ▼
              Resource Usage
                     │
                     ▼
              Metrics Server
                     │
                     ▼
                    HPA
                     │
             ┌───────┴───────┐
             │               │
       Usage increases   Usage decreases
             │               │
             ▼               ▼
        Scale Out         Scale In
             │               │
             ▼               ▼
       More replicas     Fewer replicas
```

This allows the backend workload to respond dynamically to resource demand.

---

## 14. HPA and Kubernetes Deployment

HPA does not replace the Deployment.

Instead, HPA works with the Deployment by adjusting the desired number of replicas.

```text
                HPA
                 │
                 │ adjusts replicas
                 ▼
          Backend Deployment
                 │
                 ▼
          Backend ReplicaSet
                 │
                 ▼
             Backend Pods
```

The Deployment remains responsible for managing the application workload, while HPA controls the desired replica count based on resource utilization.

---

## 15. Why HPA Matters for FlavorForge

The FlavorForge backend is an API workload.

If application traffic increases, additional backend replicas can help distribute the workload.

The intended behavior is:

```text
Normal Traffic
      ↓
Normal Replica Count
```

```text
Increased Traffic
      ↓
Increased Resource Usage
      ↓
HPA Scaling Decision
      ↓
Additional Backend Pods
```

When demand decreases:

```text
Lower Resource Usage
      ↓
HPA Scaling Decision
      ↓
Replica Count Can Decrease
```

This provides a basic cloud-native scaling capability.

---

## 16. HPA Verification Checklist

The HPA verification included:

```text
Metrics Server available
        ↓
HPA configured
        ↓
Backend Deployment running
        ↓
Pod resource metrics available
        ↓
HPA status verified
        ↓
HPA YAML inspected
```

The evidence is shown throughout this document alongside each verification step.

---

## 17. Important Learning

There are three important components to understand.

### Metrics Server

Provides resource utilization metrics.

```text
Metrics Server
      ↓
CPU / Memory Metrics
```

### HPA

Uses metrics to determine whether scaling is required.

```text
Metrics
   ↓
HPA
   ↓
Scaling Decision
```

### Deployment

Manages the actual application replicas.

```text
Deployment
    ↓
ReplicaSet
    ↓
Pods
```

Together:

```text
Metrics Server
      ↓
     HPA
      ↓
Deployment Replica Count
      ↓
    Pods
```

---

## 18. What We Actually Achieved

At the end of this stage, FlavorForge had Kubernetes autoscaling configured for the backend workload.

The progression was:

```text
Backend Deployment
        ↓
Resource Metrics
        ↓
Metrics Server
        ↓
Horizontal Pod Autoscaler
        ↓
Replica Management
```

The HPA environment was verified using Kubernetes resource and HPA inspection commands.

The verification included:

```text
Metrics Server
      ↓
Pod Resource Usage
      ↓
HPA Status
      ↓
HPA YAML
```

---

## 19. Kubernetes Stage Progress

The Kubernetes BUILD-JOURNEY now looks like:

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
docs/week-4/BUILD-JOURNEY/06-kubernetes/07-deployment-strategy.md
```

This will document how FlavorForge manages Kubernetes deployment behavior, including the relationship between Deployments, replicas, updates, and rollout strategy.
