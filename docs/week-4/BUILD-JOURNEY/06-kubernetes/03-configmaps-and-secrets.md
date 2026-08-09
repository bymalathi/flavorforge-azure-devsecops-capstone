# 03 — ConfigMaps and Secrets

## Step 1 — Add the backend ConfigMap

### What we wanted

We wanted to keep the FlavorForge backend runtime configuration separate from the Docker image.

### Where we did it

```text
Repository

kubernetes/base/config/backend-configmap.yaml
```

### Command

The backend ConfigMap was defined in:

```text
kubernetes/base/config/backend-configmap.yaml
```

The configuration resources were grouped through:

```text
kubernetes/base/config/kustomization.yaml
```

### What happened

The backend configuration was stored as a Kubernetes ConfigMap instead of being placed directly into the application image.

The configuration included runtime values used by the backend, such as:

```text
APP_VERSION
BUILD_VERSION
NODE_ENV
PORT
```

### Verify

```bash
kubectl get configmaps -n flavorforge
```

### Evidence

![Kubernetes ConfigMap](/screenshots/kubernetes/1-configmap.png)

![Backend ConfigMap](/screenshots/kubernetes/backend-configmap.png)

### Result

The FlavorForge backend had Kubernetes-managed runtime configuration.

---

## Step 2 — Verify the backend ConfigMap

### What we wanted

We wanted to confirm that the backend configuration was available in the `flavorforge` namespace.

### Where we did it

```text
Local terminal
```

### Command

```bash
kubectl get configmaps -n flavorforge
```

### What happened

Kubernetes returned the ConfigMap resources available in the `flavorforge` namespace.

### Verify

```bash
kubectl get configmaps -n flavorforge
```

### Result

The FlavorForge ConfigMap was available in the Kubernetes namespace.

---

## Step 3 — Create the Secret template

### What we wanted

We wanted to define the structure required for sensitive backend configuration without committing real secret values to the repository.

### Where we did it

```text
Repository

kubernetes/base/config/secret-template.yaml
```

### Command

The Secret template was maintained at:

```text
kubernetes/base/config/secret-template.yaml
```

### What happened

The repository contained a template for the Kubernetes Secret configuration.

The actual sensitive value was kept separate from the repository configuration.

The configuration structure was:

```text
Secret Template
      ↓
Kubernetes Secret
      ↓
Backend Pod
```

### Verify

```bash
kubectl get secrets -n flavorforge
```

### Evidence

![Secrets Created](/screenshots/kubernetes/secrets/0-secrets-created.png)

### Result

The FlavorForge Kubernetes configuration contained a Secret template for sensitive runtime configuration.

---

## Step 4 — Verify Secrets in the FlavorForge namespace

### What we wanted

We wanted to confirm that the Kubernetes Secret was available to the FlavorForge namespace.

### Where we did it

```text
Local terminal
```

### Command

```bash
kubectl get secrets -n flavorforge
```

### What happened

Kubernetes listed the Secret resources available in the `flavorforge` namespace.

### Verify

```bash
kubectl get secrets -n flavorforge
```

### Evidence

![Kubernetes Secrets in FlavorForge Namespace](/screenshots/kubernetes/secrets/1-kubectl-get-secrets-n-flavorforge.png)

### Result

The FlavorForge Secret was available in the `flavorforge` namespace.

---

## Step 5 — Verify the application Pods using the configuration

### What we wanted

We wanted to verify that the backend workload was running after the configuration and Secret resources were available.

### Where we did it

```text
Local terminal
```

### Command

```bash
kubectl get pods -n flavorforge
```

### What happened

The FlavorForge application Pods were listed in the namespace.

The running Pods provided the workload in which the backend configuration was consumed.

### Verify

```bash
kubectl get pods -n flavorforge
```

### Evidence

![Deployment Pods](/screenshots/kubernetes/secrets/2-deployment-pods.png)

### Result

The FlavorForge application Pods were running with the Kubernetes configuration resources available to the workload.

---

## Step 6 — Keep sensitive values out of the documentation

### What we wanted

We wanted to verify Secret usage without exposing the actual sensitive value in the BUILD-JOURNEY documentation.

### Where we did it

```text
Local terminal
```

### Command

Secret-related verification was performed against the running workload.

### What happened

The repository contains an internal screenshot showing the Secret value being printed from the application environment.

That screenshot is **not included in the public BUILD-JOURNEY documentation** because it may expose sensitive information.

### Evidence

The internal evidence remains under:

```text
/screenshots/kubernetes/secrets/3-print-env-secret-password.png
```

It should not be embedded into the public documentation.

### Result

Secret usage was verified internally while keeping the sensitive value out of the published documentation.

---

## Step 7 — Keep configuration separate from the Docker image

### What we wanted

We wanted the container image and Kubernetes runtime configuration to remain separate.

### Where we did it

```text
Repository

Docker
+
kubernetes/base/config/
```

### What happened

The application image was built during the Docker stage.

Kubernetes then supplied runtime configuration through:

```text
ConfigMap
Secret
```

The deployment model was:

```text
Docker Image
      +
ConfigMap
      +
Secret
      ↓
Backend Pod
      ↓
Node.js + Express
```

### Verify

```bash
kubectl get configmaps -n flavorforge
```

```bash
kubectl get secrets -n flavorforge
```

```bash
kubectl get pods -n flavorforge
```

### Result

FlavorForge kept application packaging separate from Kubernetes runtime configuration.

---

## Step 8 — Verify the configuration resources in the repository

### What we wanted

We wanted the ConfigMap and Secret configuration to remain organized with the other Kubernetes resources.

### Where we did it

```text
Repository

kubernetes/base/config/
```

### What happened

The configuration directory contained:

```text
kubernetes/base/config/
├── backend-configmap.yaml
├── secret-template.yaml
└── kustomization.yaml
```

The resources were grouped through the configuration Kustomization.

### Verify

```text
kubernetes/base/config/
```

### Evidence

![Kubernetes ConfigMap](/screenshots/kubernetes/1-configmap.png)

![Backend ConfigMap](/screenshots/kubernetes/backend-configmap.png)

### Result

FlavorForge configuration resources were organized separately from the frontend and backend Deployment files.

---

## Step 9 — Verify the complete configuration flow

### What we wanted

We wanted to verify the relationship between the Kubernetes configuration resources and the running backend workload.

### Where we did it

```text
AKS
 ↓
flavorforge namespace
```

### Command

```bash
kubectl get configmaps -n flavorforge
```

```bash
kubectl get secrets -n flavorforge
```

```bash
kubectl get pods -n flavorforge
```

### What happened

The configuration resources and application Pods were available in the same FlavorForge Kubernetes environment.

The resulting flow was:

```text
ConfigMap
    ↓
Backend Configuration

Secret
    ↓
Sensitive Configuration

Both
    ↓
Backend Pod
    ↓
Node.js + Express
```

### Verify

```bash
kubectl get configmaps -n flavorforge
```

```bash
kubectl get secrets -n flavorforge
```

```bash
kubectl get pods -n flavorforge
```

### Result

The FlavorForge backend configuration layer was available alongside the running Kubernetes workload.

---

# Result

FlavorForge's Kubernetes configuration layer was established.

The repository contains:

```text
kubernetes/base/config/
├── backend-configmap.yaml
├── secret-template.yaml
└── kustomization.yaml
```

The resulting runtime model was:

```text
Docker Image
      ↓
Backend Pod
      ↑
      │
 ┌────┴────┐
 │         │
ConfigMap  Secret
 │         │
 └────┬────┘
      ↓
Runtime Configuration
```

The ConfigMap handled the backend runtime configuration, while the Secret handled sensitive configuration.

The actual Secret value was kept out of the published documentation.

The next BUILD-JOURNEY document is:

```text
docs/week-4/BUILD-JOURNEY/06-kubernetes/04-services.md
```

That stage will document the actual FlavorForge frontend and backend Kubernetes Services.
