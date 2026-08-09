# 04 — Kubernetes Services

## Step 1 — Define the Backend Service

### What we wanted

After creating the backend Deployment, we needed a stable Kubernetes network endpoint for the FlavorForge backend Pods.

### Where we did it

The backend Service configuration is stored in:

```text
kubernetes/base/backend/service.yaml
```

### Command

The backend Service was defined as part of the Kubernetes manifest configuration.

### What happened

The backend Service provided stable networking for the backend Pods managed by the backend Deployment.

The relationship was:

```text
Backend Deployment
        ↓
Backend Pods
        ↓
Backend Service
        ↓
Backend API
```

### Verify

```bash
kubectl get svc -n flavorforge
```

### Screenshot / Evidence

![Base Backend Service YAML](/screenshots/kubernetes/base-backend-service-yaml.png)

### Result

The FlavorForge backend Service was defined and available as the stable network endpoint for the backend workload.

---

## Step 2 — Define the Frontend Service

### What we wanted

We needed a stable Kubernetes network endpoint for the FlavorForge frontend Pods.

### Where we did it

The frontend Service configuration is stored in:

```text
kubernetes/base/frontend/service.yaml
```

### Command

The frontend Service was defined as part of the Kubernetes manifest configuration.

### What happened

The frontend Service provided stable networking for the frontend Pods managed by the frontend Deployment.

The relationship was:

```text
Frontend Deployment
        ↓
Frontend Pods
        ↓
Frontend Service
        ↓
Frontend Application
```

### Verify

```bash
kubectl get svc -n flavorforge
```

### Screenshot / Evidence

![Base Frontend Service YAML](/screenshots/kubernetes/base-frontend-service-yaml.png)

### Result

The FlavorForge frontend Service was defined and available as the stable network endpoint for the frontend workload.

---

## Step 3 — Verify the FlavorForge Services

### What we wanted

After defining the frontend and backend Services, we needed to verify that they were available inside the `flavorforge` namespace.

### Where we did it

```text
AKS cluster
namespace: flavorforge
```

### Command

```bash
kubectl get svc -n flavorforge
```

### What happened

Kubernetes returned the Services available in the `flavorforge` namespace.

This allowed us to verify the Service resources associated with the FlavorForge application.

### Verify

```bash
kubectl get svc -n flavorforge
```

### Screenshot / Evidence

![AKS Workloads, Deployments and Pods](/screenshots/azure/15-aks-workloads-deployments-pods.png)

### Result

The FlavorForge Services were present in the Kubernetes namespace.

---

## Step 4 — Verify Services With the Application Workloads

### What we wanted

We wanted to verify that the Services existed together with the actual FlavorForge Deployments and Pods.

### Where we did it

```text
AKS cluster
namespace: flavorforge
```

### Command

```bash
kubectl get all -n flavorforge
```

### What happened

Kubernetes displayed the main resources running in the `flavorforge` namespace.

This included:

```text
Pods
Services
Deployments
ReplicaSets
```

This gave us a single view of the application workloads and their networking resources.

### Verify

```bash
kubectl get all -n flavorforge
```

### Screenshot / Evidence

![Kubernetes Deployment](/screenshots/kubernetes/2-deployment.png)

### Result

The FlavorForge Deployments, Pods, and Services were running together in the `flavorforge` namespace.

---

## Step 5 — Verify Service Endpoints

### What we wanted

We needed to verify that the Services had application Pods available behind them.

### Where we did it

```text
AKS cluster
namespace: flavorforge
```

### Command

```bash
kubectl get endpoints -n flavorforge
```

### What happened

Kubernetes displayed the endpoints associated with the Services.

These endpoints represent the Pods currently available to receive traffic through the Services.

### Verify

```bash
kubectl get endpoints -n flavorforge
```

### Result

The Services were connected to the running application workloads.

---

## Step 6 — Verify the Ingress-to-Service Path

### What we wanted

After the frontend and backend Services were available, they needed to work with the NGINX Ingress configuration.

The application traffic path was:

```text
External Request
       ↓
NGINX Ingress
       ↓
Frontend Service / Backend Service
       ↓
Frontend Pods / Backend Pods
```

### Where we did it

The Ingress configuration is stored in:

```text
kubernetes/base/ingress/ingress.yaml
```

### Command

```bash
kubectl get ingress -A
```

### What happened

Kubernetes displayed the Ingress resources and their addresses.

The Ingress routes traffic to the Kubernetes Services, while the Services provide stable access to the application Pods.

### Verify

```bash
kubectl get ingress -A
```

### Screenshot / Evidence

![AKS Workloads, Deployments and Pods](/screenshots/azure/15-aks-workloads-deployments-pods.png)

### Result

The Services were part of the Kubernetes networking path used to reach the FlavorForge application.

---

## Step 7 — Verify the Frontend Through the Kubernetes Environment

### What we wanted

We needed to verify that the frontend was actually reachable after the Kubernetes networking resources were configured.

### Where we did it

```text
Browser
→ FlavorForge external application endpoint
```

### Command

No additional Kubernetes command was required for this browser-level verification.

### What happened

The FlavorForge frontend was accessible through the deployed Kubernetes environment.

### Verify

Open the application endpoint in the browser.

### Screenshot / Evidence

![FlavorForge Frontend](/screenshots/kubernetes/frontend-in-the-browser-http-104-45-175-93.png)

### Result

The FlavorForge frontend was successfully reachable through the Kubernetes networking configuration.

---

## Step 8 — Verify the Backend Health Endpoint

### What we wanted

We also needed to verify that the backend API was reachable through the deployed Kubernetes environment.

### Where we did it

```text
Browser
→ FlavorForge backend health endpoint
```

### Command

No additional Kubernetes command was required for this browser-level verification.

### What happened

The backend health endpoint returned the FlavorForge API response.

The endpoint used for verification was:

```text
/api/health
```

### Verify

Open:

```text
/api/health
```

through the deployed application endpoint.

### Screenshot / Evidence

![FlavorForge Backend Health Endpoint](/screenshots/kubernetes/backend-in-the-browser-http-104-45-175-93-api-health.png)

### Result

The FlavorForge backend API was successfully reachable through the Kubernetes networking path.

---

# Service Request Flow

The completed networking flow was:

```text
                    External Request
                           ↓
                  NGINX Ingress
                     /       \
                    ↓         ↓
          Frontend Service   Backend Service
                  ↓               ↓
          Frontend Pods      Backend Pods
                  ↓               ↓
                Nginx       Node.js + Express
                  ↓               ↓
             React App           API
```

The Services provided the stable networking layer between the Kubernetes workloads and the Ingress.

---

# What We Actually Achieved

At the end of this stage, FlavorForge had:

```text
Frontend Deployment
        ↓
Frontend Pods
        ↓
Frontend Service
```

and:

```text
Backend Deployment
        ↓
Backend Pods
        ↓
Backend Service
```

These Services were then used as the application targets for the Kubernetes Ingress configuration.

The complete application path was:

```text
User
 ↓
External Load Balancer
 ↓
NGINX Ingress
 ↓
Kubernetes Service
 ↓
Application Pod
 ↓
FlavorForge Application
```

The frontend and backend were therefore no longer dependent on direct Pod IP addresses.

---

# Result

The FlavorForge frontend and backend Kubernetes Services were defined and verified as part of the AKS deployment.

We verified:

```text
Frontend Service
Backend Service
Running Pods
Deployments
Service endpoints
Ingress
Frontend application
Backend health endpoint
```

The next BUILD-JOURNEY document is:

```text
docs/week-4/BUILD-JOURNEY/06-kubernetes/05-ingress.md
```

The next stage will document the actual FlavorForge **NGINX Ingress configuration, external access, verification, and routing**.
