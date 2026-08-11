# 06 — Kubernetes

## 1. What we wanted to do

After preparing the Azure Container Registry (ACR) and Azure Kubernetes Service (AKS), the next requirement was to deploy the FlavorForge application using Kubernetes.

The goal of this phase was to:

- Deploy the FlavorForge backend and frontend workloads to AKS.
- Manage application containers using Kubernetes Deployments.
- Configure application settings using ConfigMaps and Secrets.
- Provide internal and external application networking using Kubernetes Services.
- Expose the application through an Ingress controller.
- Support rolling application updates.
- Configure Horizontal Pod Autoscaling (HPA).
- Verify that the deployed application was healthy and accessible.
- Prepare the Kubernetes resources for environment-specific deployment using Kustomize.

The overall deployment flow was:

```text
FlavorForge Application
        |
        v
Docker Images
        |
        v
Azure Container Registry
        |
        v
Azure Kubernetes Service
        |
        +----------------------+
        |                      |
        v                      v
Backend Deployment       Frontend Deployment
        |                      |
        v                      v
Backend Service          Frontend Service
        |                      |
        +----------+-----------+
                   |
                   v
                Ingress
                   |
                   v
          FlavorForge Application
````

---

## 2. Why Kubernetes was required

Docker provides a way to package and run application containers, while Kubernetes provides orchestration for those containers.

For FlavorForge, Kubernetes was required to manage:

* Application Pods.
* Desired replica counts.
* Application restarts.
* Service discovery.
* Container networking.
* Rolling deployments.
* Application configuration.
* Secrets.
* Autoscaling.
* External application access.

Instead of manually running containers:

```text
docker run frontend
docker run backend
```

Kubernetes manages the application workloads declaratively:

```text
                AKS
                 |
        +--------+--------+
        |                 |
        v                 v
 Backend Deployment   Frontend Deployment
        |                 |
        v                 v
 Backend Pods         Frontend Pods
        |                 |
        v                 v
 Backend Service     Frontend Service
        |                 |
        +--------+--------+
                 |
                 v
              Ingress
                 |
                 v
             Users
```

This provides a consistent and repeatable way to deploy and operate the FlavorForge application.

---

## 3. Kubernetes architecture for FlavorForge

The FlavorForge Kubernetes environment uses AKS as the managed Kubernetes platform.

The architecture can be represented as:

```text
Azure
 |
 +-- flavorforge-rg
 |
 +-- flavorforgeacr
 |      |
 |      +-- Backend Image
 |      +-- Frontend Image
 |
 +-- flavorforge-aks
        |
        +-- Kubernetes Nodes
        |
        +-- Namespace: flavorforge
               |
               +-- Backend Deployment
               |      |
               |      +-- Backend Pods
               |
               +-- Frontend Deployment
               |      |
               |      +-- Frontend Pods
               |
               +-- ConfigMaps
               |
               +-- Secrets
               |
               +-- Services
               |
               +-- Ingress
               |
               +-- HPA
```

The deployment relationship is:

```text
ACR
 |
 | Pull container images
 v
AKS
 |
 +--> Backend Pods
 |
 +--> Frontend Pods
 |
 +--> Kubernetes Services
 |
 +--> Ingress
 |
 +--> Horizontal Pod Autoscaler
```

---

## 4. Prerequisites

Before deploying the FlavorForge Kubernetes resources, the following components were available:

* Azure subscription.
* Azure CLI.
* Azure Kubernetes Service (AKS).
* Azure Container Registry (ACR).
* FlavorForge container images stored in ACR.
* `kubectl`.
* Local Kubernetes credentials.
* Kubernetes manifests.

The AKS cluster used for the project was:

| Setting            | Value             |
| ------------------ | ----------------- |
| Resource Group     | `flavorforge-rg`  |
| AKS Cluster        | `flavorforge-aks` |
| Container Registry | `flavorforgeacr`  |
| Worker Nodes       | 2                 |
| Kubernetes CLI     | `kubectl`         |

The AKS-to-ACR integration allowed Kubernetes to pull the private FlavorForge images from Azure Container Registry.

---

## 5. Connect the local machine to AKS

The local development machine was configured to communicate with the FlavorForge AKS cluster using `kubectl`.

AKS credentials were obtained using:

```bash
az aks get-credentials \
  --resource-group flavorforge-rg \
  --name flavorforge-aks
```

The Kubernetes context was then verified:

```bash
kubectl config current-context
```

Expected context:

```text
flavorforge-aks
```

Available contexts can be checked using:

```bash
kubectl config get-contexts
```

If required, the FlavorForge AKS context can be selected with:

```bash
kubectl config use-context flavorforge-aks
```

---

## 6. Verify AKS worker nodes

Before deploying application workloads, the Kubernetes worker nodes were verified.

Run:

```bash
kubectl get nodes
```

The nodes should be in the:

```text
Ready
```

state.

The project AKS cluster was configured with two worker nodes.

Conceptually:

```text
flavorforge-aks
       |
       +----------------+
       |                |
       v                v
    Node 1           Node 2
     Ready            Ready
```

A `Ready` node indicates that Kubernetes considers the node available for scheduling workloads.

### Evidence

![AKS Kubernetes Nodes](/screenshots/azure/28-kubectl-get-nodes.png)

*Figure 6.1 — AKS Kubernetes worker nodes verified in the `Ready` state.*

---

## 7. Verify Kubernetes cluster connectivity

The Kubernetes control plane was also verified using:

```bash
kubectl cluster-info
```

This confirms that the local Kubernetes client can communicate with the AKS cluster.

The Kubernetes CLI installation can be verified with:

```bash
kubectl version --client
```

At this stage, the local environment was ready to deploy Kubernetes resources to AKS.

---

## 8. Kubernetes deployment flow

The FlavorForge deployment process follows this sequence:

```text
Source Code
    |
    v
Docker Build
    |
    v
Container Images
    |
    v
Azure Container Registry
    |
    | Image Pull
    v
AKS
    |
    v
Kubernetes Namespace
    |
    +--> Backend Deployment
    |
    +--> Frontend Deployment
    |
    +--> ConfigMaps
    |
    +--> Secrets
    |
    +--> Services
    |
    +--> Ingress
    |
    +--> HPA
    |
    v
Running Application
```

The Kubernetes resources are deployed progressively so that each layer can be verified before moving to the next.

---

# 9. Create the FlavorForge namespace

## What we wanted to do

A dedicated Kubernetes namespace was created for the FlavorForge application.

Namespaces provide logical separation between application resources inside a Kubernetes cluster.

Instead of placing the application resources directly in the default namespace, FlavorForge resources were organized under:

```text
flavorforge
````

The namespace architecture is:

```text
AKS Cluster
    |
    +-- default
    |
    +-- flavorforge
          |
          +-- Backend
          +-- Frontend
          +-- Services
          +-- ConfigMaps
          +-- Secrets
          +-- HPA
          +-- Ingress
```

The namespace can be created using:

```bash
kubectl create namespace flavorforge
```

Verify the namespace:

```bash
kubectl get namespaces
```

The `flavorforge` namespace should appear in the list.

Resources can then be inspected specifically within the namespace:

```bash
kubectl get all -n flavorforge
```

Using a dedicated namespace makes it easier to manage, inspect, and troubleshoot the FlavorForge application.

---

# 10. Deploy the backend

## What we wanted to do

The FlavorForge backend provides the application API used by the frontend.

The backend was deployed to AKS using a Kubernetes Deployment.

The deployment is responsible for:

* Creating backend Pods.
* Maintaining the desired number of replicas.
* Restarting failed Pods.
* Managing application updates.
* Providing the desired state of the backend workload.

Conceptually:

```text
Backend Deployment
        |
        +--------+--------+
        |                 |
        v                 v
 Backend Pod 1       Backend Pod 2
```

The backend deployment manifest defines the container image, container port, replica configuration, and other workload settings.

The deployment can be applied using:

```bash
kubectl apply -f kubernetes/base/backend-deployment.yaml
```

If the manifest is stored in a different project path, the corresponding manifest path should be used.

Verify the backend Deployment:

```bash
kubectl get deployment -n flavorforge
```

Verify the backend Pods:

```bash
kubectl get pods -n flavorforge
```

The backend Pods should eventually reach:

```text
Running
```

The deployment can also be inspected with:

```bash
kubectl describe deployment backend -n flavorforge
```

This provides information about the Deployment, ReplicaSets, Pods, events, and rollout state.

### Evidence

![Backend Deployment](/screenshots/kubernetes/backend-deployment.png)

*Figure 10.1 — FlavorForge backend Deployment configured in Kubernetes.*

---

# 11. Deploy the frontend

## What we wanted to do

The FlavorForge frontend is the user-facing React application.

It was deployed to AKS using a Kubernetes Deployment.

The frontend Deployment is responsible for managing the frontend Pods.

Conceptually:

```text
Frontend Deployment
        |
        +--------+--------+
        |                 |
        v                 v
Frontend Pod 1       Frontend Pod 2
```

The frontend deployment can be applied using:

```bash
kubectl apply -f kubernetes/base/frontend-deployment.yaml
```

Verify the frontend Deployment:

```bash
kubectl get deployment -n flavorforge
```

Verify the Pods:

```bash
kubectl get pods -n flavorforge
```

The frontend Pods should reach the:

```text
Running
```

state.

The frontend Deployment can be inspected using:

```bash
kubectl describe deployment frontend -n flavorforge
```

### Evidence

![Frontend and Backend Deployments](/screenshots/kubernetes/all-deployment.png)

*Figure 11.1 — FlavorForge Kubernetes Deployments verified in the AKS cluster.*

---

# 12. Verify the deployed Pods

After creating the backend and frontend Deployments, the Pods were verified.

Run:

```bash
kubectl get pods -n flavorforge
```

A healthy deployment should show the application Pods in the `Running` state.

The relationship is:

```text
Deployment
    |
    v
ReplicaSet
    |
    v
Pods
    |
    v
Containers
```

The Deployment maintains the desired number of Pods.

If a Pod fails, Kubernetes can create another Pod to maintain the desired state.

A more detailed view can be obtained using:

```bash
kubectl get pods -n flavorforge -o wide
```

This shows additional information such as the node on which each Pod is running.

### Evidence

![FlavorForge Pods](/screenshots/kubernetes/pods.png)

*Figure 12.1 — FlavorForge application Pods running in Kubernetes.*

---

# 13. Backend health verification

The backend exposes a health endpoint that can be used to verify that the application is responding correctly.

The health endpoint was tested after deployment.

A successful health response confirms that:

```text
User Request
     |
     v
Backend Service
     |
     v
Backend Pod
     |
     v
Health Endpoint
     |
     v
Healthy Response
```

The backend health endpoint was also verified from the browser.

### Evidence

![Backend Health](/screenshots/kubernetes/backend-in-the-browser-http-104-45-175-93-api-health.png)

*Figure 13.1 — FlavorForge backend health endpoint responding successfully from the AKS deployment.*

---

# 14. Verify resources in the FlavorForge namespace

Once the initial workloads were deployed, the complete set of Kubernetes resources could be inspected using:

```bash
kubectl get all -n flavorforge
```

This provides a consolidated view of resources such as:

* Pods
* Services
* Deployments
* ReplicaSets

The namespace-specific command is useful because it avoids mixing FlavorForge resources with resources belonging to other namespaces.

### Evidence

![FlavorForge Kubernetes Resources](/screenshots/kubernetes/kubectl-get-all-n-flavorforge.png)

*Figure 14.1 — Kubernetes resources in the `flavorforge` namespace.*

---

# 15. Kubernetes deployment model

At this stage, the basic FlavorForge application deployment was established:

```text
                    AKS
                     |
              flavorforge namespace
                     |
          +----------+----------+
          |                     |
          v                     v
 Backend Deployment      Frontend Deployment
          |                     |
          v                     v
    Backend Pods           Frontend Pods
```

The next requirement was to configure application settings separately from the container images.

For this purpose, Kubernetes ConfigMaps and Secrets were introduced.

---

# 16. Configure application settings with ConfigMaps

## What we wanted to do

Application configuration should be separated from the container image whenever possible.

For FlavorForge, Kubernetes ConfigMaps were used to provide non-sensitive configuration values to the application.

The basic relationship is:

```text
ConfigMap
    |
    v
Deployment
    |
    v
Pod
    |
    v
Container Environment
````

This allows configuration values to be managed independently from the application container image.

A ConfigMap can be created and inspected using:

```bash
kubectl get configmaps -n flavorforge
```

A specific ConfigMap can be inspected with:

```bash
kubectl describe configmap <configmap-name> -n flavorforge
```

The backend configuration was verified in the FlavorForge namespace.

### Evidence

![Backend ConfigMap](/screenshots/kubernetes/backend-configmap.png)

*Figure 16.1 — Backend ConfigMap configured for the FlavorForge application.*

---

# 17. Configure sensitive values with Kubernetes Secrets

## What we wanted to do

Sensitive configuration values should not be stored as ordinary configuration values.

Kubernetes Secrets were used for sensitive application configuration.

The conceptual relationship is:

```text
Kubernetes Secret
       |
       v
Deployment
       |
       v
Pod
       |
       v
Container Environment
```

Secrets were created in the `flavorforge` namespace.

The available Secrets can be checked using:

```bash
kubectl get secrets -n flavorforge
```

A Secret can be inspected at the metadata level using:

```bash
kubectl describe secret <secret-name> -n flavorforge
```

The Secret values are not displayed directly by the normal `kubectl get secrets` command.

The Secret was then consumed by the application workload through the Kubernetes Deployment configuration.

### Evidence

![Secrets Created](/screenshots/kubernetes/secrets/0-secrets-created.png)

*Figure 17.1 — FlavorForge Kubernetes Secret created.*

![Secrets in FlavorForge Namespace](/screenshots/kubernetes/secrets/1-kubectl-get-secrets-n-flavorforge.png)

*Figure 17.2 — Kubernetes Secrets verified in the `flavorforge` namespace.*

---

# 18. Verify configuration inside the deployed workload

After configuring ConfigMaps and Secrets, the deployed Pods were inspected to confirm that the required environment configuration was available to the application.

The relationship is:

```text
ConfigMap / Secret
        |
        v
Deployment
        |
        v
Pod
        |
        v
Container
        |
        v
Environment Variables
```

The environment configuration was verified from the running backend workload.

This confirmed that Kubernetes configuration was being passed to the application container.

### Evidence

![Environment Variables](/screenshots/kubernetes/3-environment-variables.png)

*Figure 18.1 — Environment configuration available to the deployed Kubernetes workload.*

---

# 19. Verify Secret-backed application configuration

The Secret configuration was also verified against the deployed workload.

This verification demonstrated that:

* The Secret existed in the correct namespace.
* The workload could consume the Secret.
* The required configuration was available to the application container.

### Evidence

![Secret Deployment Pods](/screenshots/kubernetes/secrets/2-deployment-pods.png)

*Figure 19.1 — Deployment Pods running with the configured Secret.*

---

# 20. Kubernetes configuration model

At this stage, the application configuration architecture was:

```text
                    AKS
                     |
              flavorforge namespace
                     |
          +----------+----------+
          |                     |
          v                     v
      ConfigMap              Secret
          |                     |
          +----------+----------+
                     |
                     v
               Deployment
                     |
                     v
                    Pod
                     |
                     v
                Container
```

ConfigMaps provide non-sensitive configuration, while Secrets provide sensitive configuration values.

This separation keeps configuration independent from the application image and provides a more appropriate mechanism for managing environment-specific settings.

---

# 21. Configure Kubernetes Services

## What we wanted to do

Kubernetes Services were used to provide stable network endpoints for the FlavorForge application workloads.

The application contains two main workloads:

```text
Frontend Pods
     |
     v
Frontend Service
     |
     v
   Port 80


Backend Pods
     |
     v
Backend Service
     |
     v
  Port 3000
````

The Services use Kubernetes `ClusterIP`, which makes them reachable inside the Kubernetes cluster without assigning a separate public IP address.

This allows the Services to act as stable internal endpoints even when individual Pods are replaced.

---

## 21.1 Backend Service

The backend Service is defined in:

```text
kubernetes/base/backend/service.yaml
```

The configuration uses:

```yaml
kind: Service
name: backend
namespace: flavorforge
```

The Service selects backend Pods using:

```yaml
selector:
  app: backend
```

The backend application listens on port `3000`, so the Service exposes:

```text
Service port: 3000
Target port: 3000
```

The Service type is:

```yaml
type: ClusterIP
```

This means the backend is intended to be accessed internally through the Kubernetes network rather than directly through a public IP.

### Evidence

![Backend Service YAML](/screenshots/kubernetes/base-backend-service-yaml.png)

*Figure 21.1 — FlavorForge backend Kubernetes Service configuration.*

---

## 21.2 Frontend Service

The frontend Service is defined in:

```text
kubernetes/base/frontend/service.yaml
```

The configuration uses:

```yaml
kind: Service
name: frontend
namespace: flavorforge
```

The Service selects frontend Pods using:

```yaml
selector:
  app: frontend
```

The frontend application is exposed through port `80`:

```text
Service port: 80
Target port: 80
```

The Service also uses:

```yaml
type: ClusterIP
```

This keeps the frontend Service inside the Kubernetes cluster while allowing the Ingress controller to route external HTTP traffic to it.

### Evidence

![Frontend Service YAML](/screenshots/kubernetes/base-frontend-service-yaml.png)

*Figure 21.2 — FlavorForge frontend Kubernetes Service configuration.*

---

## 21.3 Verify Services in the AKS cluster

The deployed Services were verified using:

```bash
kubectl get svc -n flavorforge
```

The result showed:

```text
NAME       TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)
backend    ClusterIP   10.0.113.122   <none>        3000/TCP
frontend   ClusterIP   10.0.86.185    <none>        80/TCP
```

The verification confirms that:

* The backend Service exists.
* The frontend Service exists.
* Both Services use `ClusterIP`.
* The backend Service exposes port `3000`.
* The frontend Service exposes port `80`.
* Neither Service has a separate external IP.

### Evidence

![Kubernetes Services verified](/screenshots/kubernetes/nginx-ingress/2-change-type-loadbalancer-to-clusterip.png)

*Figure 21.3 — FlavorForge Services configured as internal `ClusterIP` Services.*

---

## 21.4 Why ClusterIP was used

The Services were intentionally configured as `ClusterIP` because external traffic should enter the application through the NGINX Ingress controller.

The resulting architecture is:

```text
                    Internet
                       |
                       v
                NGINX Ingress
                       |
             +---------+---------+
             |                   |
          /api                  /
             |                   |
             v                   v
       Backend Service     Frontend Service
          ClusterIP            ClusterIP
          Port 3000             Port 80
             |                   |
             v                   v
       Backend Pods         Frontend Pods
```

This provides a clear separation between:

```text
External access
      |
      v
   Ingress
      |
      v
Internal Services
      |
      v
Application Pods
```

The Services therefore provide stable internal networking while the Ingress provides the external HTTP entry point.

---
