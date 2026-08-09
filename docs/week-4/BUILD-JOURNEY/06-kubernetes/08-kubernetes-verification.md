# 08 — Kubernetes Verification

## 1. Purpose

After completing the Kubernetes manifests, ConfigMaps and Secrets, Services, Ingress, HPA, and Deployment Strategy stages, the final step was to verify the complete FlavorForge Kubernetes deployment.

The verification checked the actual running AKS environment rather than only the YAML files.

The final verification flow was:

```text
AKS Cluster
    ↓
Kubernetes Nodes
    ↓
Namespaces and Resources
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
    ↓
Backend Health API
    ↓
ArgoCD
```

---

## 2. Start the AKS Cluster

The FlavorForge AKS cluster used for the deployment is:

```text
Resource Group: flavorforge-rg
AKS Cluster: flavorforge-aks
```

Before performing the Kubernetes verification, the AKS cluster was started.

The command used was:

```bash
az login
```

Then the Azure account was verified:

```bash
az account show
```

The AKS cluster was started with:

```bash
az aks start --resource-group flavorforge-rg --name flavorforge-aks
```

This brought the AKS cluster back online for verification.

---

## 3. Configure kubectl

After the AKS cluster was started, the Kubernetes credentials were configured:

```bash
az aks get-credentials --resource-group flavorforge-rg --name flavorforge-aks --overwrite-existing
```

This configured the local Kubernetes context so that `kubectl` commands could communicate with the FlavorForge AKS cluster.

---

## 4. Verify AKS

The AKS clusters available in the Azure subscription were checked using:

```bash
az aks list --output table
```

The FlavorForge cluster was:

```text
flavorforge-aks
```

The resource group was:

```text
flavorforge-rg
```

---

## 5. Verify Kubernetes Nodes

The Kubernetes nodes were checked with:

```bash
kubectl get nodes
```

The nodes were in the `Ready` state.

This confirmed that the AKS Kubernetes worker nodes were available to run the FlavorForge workloads.

The verification flow was:

```text
AKS Cluster
    ↓
Kubernetes Nodes
    ↓
Ready
    ↓
Application Workloads
```

---

## 6. Verify Kubernetes Resources

The Kubernetes resources running in the cluster were checked with:

```bash
kubectl get pods -A
```

This provided an overview of Pods across the Kubernetes namespaces.

The FlavorForge workloads were running alongside the required Kubernetes system components.

---

## 7. Verify FlavorForge Resources

The resources in the FlavorForge namespace were checked with:

```bash
kubectl get all -n flavorforge
```

This provided the combined view of the application's:

```text
Pods
Services
Deployments
ReplicaSets
```

The application resources were therefore verified together inside the namespace.

![AKS Workloads, Deployments and Pods](/screenshots/azure/15-aks-workloads-deployments-pods.png)

---

## 8. Verify Services

The FlavorForge Services were checked using:

```bash
kubectl get svc -A
```

This verified the Kubernetes networking resources across the cluster.

The Services provide the stable networking layer in front of the application Pods.

The application networking path was:

```text
Ingress
    ↓
Service
    ↓
Pod
```

---

## 9. Verify Ingress

The Ingress resources were checked using:

```bash
kubectl get ingress -A
```

This verified that the FlavorForge Ingress configuration was present in the cluster.

The external application path was:

```text
External Request
       ↓
NGINX Ingress Controller
       ↓
FlavorForge Service
       ↓
FlavorForge Pod
```

The NGINX Ingress Controller provided the external entry point for the application.

---

## 10. Verify the Application

After the Kubernetes resources were running and the Ingress had an external IP, the FlavorForge application was opened through the Ingress address.

The application verification confirmed that the frontend was accessible.

The request path was:

```text
Browser
   ↓
Ingress External IP
   ↓
NGINX Ingress
   ↓
Frontend Service
   ↓
Frontend Pods
   ↓
FlavorForge UI
```

---

## 11. Verify Backend Health API

The backend health endpoint was also checked:

```text
http://<INGRESS-IP>/api/health
```

The health endpoint returned the backend application response.

The verification path was:

```text
Browser / HTTP Request
        ↓
Ingress
        ↓
Backend Service
        ↓
Backend Pod
        ↓
/api/health
        ↓
Health Response
```

The response confirmed that the backend API was reachable through the Kubernetes networking path.

---

## 12. Verify HPA

The backend Horizontal Pod Autoscaler was part of the final Kubernetes verification.

The HPA status was checked with:

```bash
kubectl get hpa
```

The backend HPA was configured with:

```text
Minimum replicas: 2
Maximum replicas: 5
```

The resource metrics used by the HPA were available through the Kubernetes metrics infrastructure.

The verification flow was:

```text
Metrics Server
      ↓
HPA
      ↓
Backend Deployment
      ↓
Backend Pods
```

---

## 13. Verify Pod Resource Usage

Pod resource usage was checked using:

```bash
kubectl top pods -n flavorforge
```

This confirmed that resource metrics were available for the running FlavorForge Pods.

The resource metrics provided the information required by the HPA to make scaling decisions.

---

## 14. Verify Kubernetes Configuration

The deployed FlavorForge configuration was also verified through the Kubernetes resources.

The ConfigMap was available in the FlavorForge environment.

![Kubernetes ConfigMap](/screenshots/kubernetes/1-configmap.png)

The Kubernetes Deployment configuration was also verified.

![Kubernetes Deployment](/screenshots/kubernetes/2-deployment.png)

The base Deployment definitions were maintained in the repository.

![Base Frontend Deployment](/screenshots/kubernetes/base-frontend-deployment-yaml.png)

![Base Backend Deployment](/screenshots/kubernetes/base-backend-deployment-yaml.png)

---

## 15. Verify Kubernetes Services

The frontend and backend Service definitions were maintained in the Kubernetes base configuration.

![Base Frontend Service](/screenshots/kubernetes/base-frontend-service-yaml.png)

![Base Backend Service](/screenshots/kubernetes/base-backend-service-yaml.png)

These Services provided the stable networking layer between the Ingress and application Pods.

The relationship was:

```text
NGINX Ingress
      ↓
Frontend Service / Backend Service
      ↓
Frontend Pods / Backend Pods
```

---

## 16. Verify Kubernetes Namespace

FlavorForge uses a dedicated Kubernetes namespace.

The namespace definition is maintained at:

```text
kubernetes/base/namespace.yaml
```

![Base Namespace](/screenshots/kubernetes/base-namespace-yaml.png)

The namespace provides the logical boundary for the FlavorForge Kubernetes resources.

---

## 17. Verify Secrets

The FlavorForge Kubernetes environment also contained the required Secret resources.

Secrets were checked using:

```bash
kubectl get secrets -n flavorforge
```

The repository contains supporting Secret verification evidence:

![Secrets Created](/screenshots/kubernetes/secrets/0-secrets-created.png)

![Secrets in FlavorForge Namespace](/screenshots/kubernetes/secrets/1-kubectl-get-secrets-n-flavorforge.png)

The Secret resources were therefore verified as part of the Kubernetes configuration.

---

## 18. Verify Ingress Controller

The NGINX Ingress Controller was checked as part of the Kubernetes networking verification.

The controller provided the external entry point for the FlavorForge application.

The complete networking path was:

```text
Internet
    ↓
External Load Balancer
    ↓
NGINX Ingress Controller
    ↓
Ingress
    ↓
Service
    ↓
Pod
```

The external IP was then used to access the application.

---

## 19. Verify Application Version

The deployed backend health response was also used to verify the application version and build information.

The verification path was:

```text
Application Image
       ↓
Kubernetes Deployment
       ↓
Backend Pod
       ↓
Ingress
       ↓
/api/health
       ↓
Version / Build Information
```

The deployed backend configuration included the application version information used during the FlavorForge deployment.

---

## 20. Verify ArgoCD

ArgoCD was also checked as part of the final Kubernetes environment verification.

The ArgoCD Pods were checked using:

```bash
kubectl get pods -n argocd
```

The ArgoCD Services were checked using:

```bash
kubectl get svc -n argocd
```

The ArgoCD environment was therefore verified separately from the FlavorForge application namespace.

The overall GitOps relationship was:

```text
Git Repository
      ↓
ArgoCD
      ↓
Kubernetes Cluster
      ↓
FlavorForge Resources
```

---

## 21. Final Kubernetes Verification

The final verification combined the individual checks performed throughout the Kubernetes BUILD-JOURNEY.

```text
AKS Cluster
     ↓
Nodes Ready
     ↓
Kubernetes Resources
     ↓
FlavorForge Deployments
     ↓
Pods Running
     ↓
Services Available
     ↓
Ingress Available
     ↓
External IP
     ↓
Frontend Accessible
     ↓
Backend /api/health Accessible
     ↓
HPA Available
     ↓
ArgoCD Available
```

This confirmed that the individual Kubernetes components were working together as one application deployment.

---

## 22. What We Actually Verified

The final FlavorForge Kubernetes verification covered:

```text
AKS Cluster
    ↓
Kubernetes Nodes
    ↓
FlavorForge Namespace
    ↓
Frontend Deployment
    ↓
Backend Deployment
    ↓
Frontend Pods
    ↓
Backend Pods
    ↓
Frontend Service
    ↓
Backend Service
    ↓
NGINX Ingress
    ↓
External Application Access
    ↓
Backend Health API
    ↓
HPA
    ↓
ArgoCD
```

The verification was performed against the running AKS environment.

---

## 23. Kubernetes BUILD-JOURNEY Completed

The complete Kubernetes BUILD-JOURNEY is now:

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

The Kubernetes implementation was therefore verified from the AKS cluster through the application endpoint.