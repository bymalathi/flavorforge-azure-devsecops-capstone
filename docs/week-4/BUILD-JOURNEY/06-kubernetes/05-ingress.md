# 05 — Kubernetes Ingress

## 1. Purpose

After creating the Kubernetes Services, the next step was to configure external HTTP access to the FlavorForge application.

Kubernetes Services provide stable networking inside the cluster, but external users still need a way to reach the application.

FlavorForge uses **NGINX Ingress** to route incoming HTTP traffic to the appropriate Kubernetes Services.

The request flow is:

```text
User Browser
      ↓
External IP
      ↓
NGINX Ingress Controller
      ↓
Ingress Rules
      ↓
Kubernetes Service
      ↓
Application Pods
```

---

## 2. Why Ingress Is Needed

Without an Ingress layer, each application service could require its own externally exposed endpoint.

Ingress provides a centralized HTTP routing layer.

Instead of:

```text
Internet
   │
   ├──► Frontend external endpoint
   │
   └──► Backend external endpoint
```

the application can use:

```text
Internet
    │
    ▼
NGINX Ingress Controller
    │
    ├──► Frontend Service
    │
    └──► Backend Service
```

This provides a centralized entry point for the FlavorForge application.

---

## 3. FlavorForge Ingress Architecture

The FlavorForge Kubernetes repository contains the Ingress configuration under:

```text
kubernetes/base/ingress/
├── ingress.yaml
└── kustomization.yaml
```

The architecture is:

```text
                     Internet
                        │
                        ▼
              NGINX Ingress Controller
                        │
                 Ingress Rules
                        │
              ┌─────────┴─────────┐
              │                   │
              ▼                   ▼
      Frontend Service      Backend Service
              │                   │
              ▼                   ▼
       Frontend Pods          Backend Pods
```

---

## 4. Install NGINX Ingress Controller

The NGINX Ingress Controller was installed into the AKS cluster to provide the ingress functionality.

The installation created the Kubernetes resources required for the controller to receive and process incoming HTTP traffic.

The controller acts as the entry point for external application requests.

The flow is:

```text
External Request
       ↓
NGINX Ingress Controller
       ↓
Ingress Resource
       ↓
Kubernetes Service
       ↓
Pod
```

The installation was verified in the cluster:

![NGINX Ingress Controller installation](/screenshots/kubernetes/nginx-ingress/1-installation.png)

---

## 5. Verify NGINX Ingress Controller

After installation, the NGINX Ingress Controller resources were verified.

The installation evidence shows that the controller was successfully created in the Kubernetes environment.

![NGINX Ingress Controller installation verification](/screenshots/kubernetes/nginx-ingress/1-installation.png)

This established the ingress controller required to process external application traffic.

---

## 6. Ingress Resource

FlavorForge defines its application routing through:

```text
kubernetes/base/ingress/ingress.yaml
```

The Ingress resource defines how incoming HTTP requests are routed to the application Services.

Conceptually:

```text
Ingress
   │
   ├──► Frontend Service
   │
   └──► Backend Service
```

The Ingress therefore connects the external HTTP request path to the internal Kubernetes networking layer.

---

## 7. Ingress Controller External Address

Once the NGINX Ingress Controller was running, an external address was assigned to the controller.

The external address was verified during the Kubernetes deployment.

![NGINX Ingress external address](/screenshots/kubernetes/nginx-ingress/3-ingress-external-address.png)

This external address provides the entry point through which the application can be accessed.

The flow becomes:

```text
Internet
   ↓
Ingress External IP
   ↓
NGINX Ingress Controller
   ↓
FlavorForge Services
```

---

## 8. Access the Frontend Through Ingress

The FlavorForge frontend was accessed through the external Ingress address.

![FlavorForge frontend through Ingress](/screenshots/kubernetes/nginx-ingress/4-frontend-http-4-157-77-48.png)

This verified that the external request successfully reached the frontend application through the NGINX Ingress layer.

The request flow was:

```text
Browser
   ↓
Ingress External IP
   ↓
NGINX Ingress Controller
   ↓
Frontend Service
   ↓
Frontend Pod
   ↓
Nginx
   ↓
React Application
```

---

## 9. Access the Backend Through Ingress

The backend was also exposed through the Ingress configuration.

![FlavorForge backend through Ingress](/screenshots/kubernetes/nginx-ingress/5-backend.png)

This provided evidence that requests could be routed to the backend application through the Kubernetes networking layer.

The flow was:

```text
Browser / HTTP Request
        ↓
Ingress External IP
        ↓
NGINX Ingress Controller
        ↓
Backend Service
        ↓
Backend Pod
        ↓
Node.js + Express
```

---

## 10. Verify the Backend Health Endpoint

The backend health endpoint was tested through the Kubernetes environment.

![FlavorForge API health endpoint](/screenshots/kubernetes/nginx-ingress/7-api-health.png)

The successful response confirmed that the request reached the backend application through the configured Kubernetes networking path.

The verification chain was:

```text
Client
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

---

## 11. Ingress and Services

Ingress does not normally send traffic directly to Pods.

The normal request path is:

```text
Ingress
   ↓
Service
   ↓
Pod
```

For FlavorForge:

```text
                     NGINX Ingress
                           │
                 ┌─────────┴─────────┐
                 │                   │
                 ▼                   ▼
          Frontend Service    Backend Service
                 │                   │
                 ▼                   ▼
          Frontend Pods        Backend Pods
```

This separation allows Services to provide stable networking and Pod discovery.

---

## 12. Frontend and Backend Routing

The frontend and backend are separate application components.

The Ingress layer provides the external routing mechanism while the Services provide internal Kubernetes networking.

The overall architecture is:

```text
                         Internet
                            │
                            ▼
                  NGINX Ingress Controller
                            │
                    Ingress Routing
                            │
                 ┌──────────┴──────────┐
                 │                     │
                 ▼                     ▼
          Frontend Service       Backend Service
                 │                     │
                 ▼                     ▼
          Frontend Pods           Backend Pods
                 │                     │
                 ▼                     ▼
               Nginx            Node.js + Express
```

---

## 13. Verify Ingress Resources

Ingress resources can be checked using:

```bash
kubectl get ingress -n flavorforge
```

More detailed information can be obtained with:

```bash
kubectl describe ingress <ingress-name> -n flavorforge
```

The Ingress Controller itself can be inspected with:

```bash
kubectl get pods -n ingress-nginx
```

and:

```bash
kubectl get svc -n ingress-nginx
```

These commands verify that the controller and application routing resources are available.

---

## 14. Inspect Ingress Controller

The NGINX Ingress Controller installation was verified in the cluster.

![NGINX Ingress Controller](/screenshots/kubernetes/nginx-ingress/1-installation.png)

The controller is responsible for:

* Receiving external HTTP requests
* Processing Ingress rules
* Routing requests to Services
* Forwarding traffic to application Pods

It therefore acts as the HTTP entry point into the Kubernetes application.

---

## 15. Verify Application Through External IP

After the external IP was available, the FlavorForge application was accessed through the browser.

![FlavorForge frontend through external Ingress IP](/screenshots/kubernetes/nginx-ingress/4-frontend-http-4-157-77-48.png)

The frontend verification demonstrated:

```text
External IP
    ↓
NGINX Ingress
    ↓
Frontend Service
    ↓
Frontend Pod
    ↓
FlavorForge UI
```

The backend was also verified:

![FlavorForge backend through external Ingress IP](/screenshots/kubernetes/nginx-ingress/5-backend.png)

The backend verification demonstrated:

```text
External IP
    ↓
NGINX Ingress
    ↓
Backend Service
    ↓
Backend Pod
    ↓
FlavorForge API
```

This confirmed that the external networking path was working.

---

## 16. Ingress Configuration Updates

During the Kubernetes workflow, the application configuration and build version were updated and the resulting deployment was verified.

The build-version update process was captured in the repository:

![Updating FlavorForge build version](/screenshots/kubernetes/nginx-ingress/10-updating-build-version.png)

This verified that changes to the deployed application could be propagated through the Kubernetes environment.

---

## 17. Verify Build Version

The deployed build version was checked after updating the application.

![FlavorForge build version verification](/screenshots/kubernetes/nginx-ingress/11-build-version.png)

This helped verify that the expected application version was running in the Kubernetes environment.

The verification flow was:

```text
Updated Application
       ↓
New Container Image
       ↓
Kubernetes Deployment
       ↓
New Pod
       ↓
Ingress
       ↓
Application Response
       ↓
Build Version Verification
```

---

## 18. Ingress Request Flow

The complete external request path for FlavorForge is:

```text
                         User
                          │
                          ▼
                    Browser Request
                          │
                          ▼
                 Ingress External IP
                          │
                          ▼
              NGINX Ingress Controller
                          │
                          ▼
                    Ingress Rules
                          │
              ┌───────────┴───────────┐
              │                       │
              ▼                       ▼
       Frontend Service        Backend Service
              │                       │
              ▼                       ▼
       Frontend Pods             Backend Pods
              │                       │
              ▼                       ▼
             Nginx              Node.js + Express
              │                       │
              ▼                       ▼
        React Application          REST API
```

This represents the external-to-application networking path used by FlavorForge.

---

## 19. Why NGINX Ingress Is Important

NGINX Ingress provides the HTTP routing layer required for external access to the application.

For FlavorForge, it provides:

* Centralized HTTP routing
* External application access
* Routing to multiple Services
* A single external entry point
* Integration with Kubernetes Services

Instead of exposing every application component independently, the cluster uses the Ingress Controller as the main HTTP entry point.

---

## 20. What We Actually Achieved

At the end of this stage, FlavorForge had a working external HTTP routing layer.

The progression was:

```text
Frontend / Backend Pods
          ↓
Frontend / Backend Services
          ↓
NGINX Ingress
          ↓
External IP
          ↓
Browser
```

The frontend and backend were successfully accessed through the Kubernetes networking stack.

The backend health endpoint was also verified through the external application path.

![FlavorForge API health verification](/screenshots/kubernetes/nginx-ingress/7-api-health.png)

This means the application had progressed from internal Kubernetes workloads to an externally accessible application.

---

## 21. Important Learning

The roles of the Kubernetes networking resources should be kept separate.

### Pod

```text
Runs the application
```

### Service

```text
Provides stable networking to Pods
```

### Ingress

```text
Defines HTTP routing rules
```

### Ingress Controller

```text
Implements the Ingress rules and processes incoming traffic
```

The relationship is:

```text
External User
      ↓
Ingress Controller
      ↓
Ingress
      ↓
Service
      ↓
Pod
      ↓
Application
```

Understanding this flow is important when troubleshooting external application access.

---

## 22. Kubernetes Stage Progress

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
06 — HPA
        ↓
07 — Deployment Strategy
        ↓
08 — Kubernetes Verification
```

The next document is:

```text
docs/week-4/BUILD-JOURNEY/06-kubernetes/06-hpa.md
```

This will document how Horizontal Pod Autoscaling was configured and verified for the FlavorForge backend.
