# 07 — Kustomize

## 1. Objective

After the FlavorForge Kubernetes manifests were organized into a common base and environment-specific overlays, Kustomize was used to manage the Kubernetes configuration for different environments without maintaining separate copies of the common manifests.

The Kustomize structure used in this project is:

```text
kubernetes/
├── base/
│   ├── autoscaling/
│   ├── backend/
│   ├── config/
│   ├── frontend/
│   ├── ingress/
│   ├── kustomization.yaml
│   └── namespace.yaml
└── overlays/
    ├── dev/
    ├── qa/
    └── prod/
````

The model is:

```text
                    Common Kubernetes Resources
                              │
                              ▼
                            Base
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
             Dev             QA              Prod
              │               │               │
       Dev-specific      QA-specific      Prod-specific
         changes           changes           changes
```

The base contains the common FlavorForge Kubernetes resources.

The overlays reuse the base and apply environment-specific configuration.

---

# 2. Starting Point

The Kustomize configuration is located inside the existing FlavorForge Kubernetes directory:

```text
kubernetes/
```

The repository already contains the Kubernetes base and the three environment overlays.

The structure was verified with:

```bash
find kubernetes -maxdepth 3 -type f -print | sort
```

The verified structure was:

```text
kubernetes/README.md
kubernetes/base/autoscaling/hpa.yaml
kubernetes/base/autoscaling/kustomization.yaml
kubernetes/base/backend/deployment.yaml
kubernetes/base/backend/kustomization.yaml
kubernetes/base/backend/service.yaml
kubernetes/base/config/backend-configmap.yaml
kubernetes/base/config/kustomization.yaml
kubernetes/base/config/secret-template.yaml
kubernetes/base/frontend/deployment.yaml
kubernetes/base/frontend/kustomization.yaml
kubernetes/base/frontend/service.yaml
kubernetes/base/ingress/ingress.yaml
kubernetes/base/ingress/kustomization.yaml
kubernetes/base/kustomization.yaml
kubernetes/base/namespace.yaml
kubernetes/overlays/dev/backend-replica-patch.yaml
kubernetes/overlays/dev/frontend-replica-patch.yaml
kubernetes/overlays/dev/kustomization.yaml
kubernetes/overlays/prod/backend-replica-patch.yaml
kubernetes/overlays/prod/frontend-replica-patch.yaml
kubernetes/overlays/prod/kustomization.yaml
kubernetes/overlays/qa/backend-replica-patch.yaml
kubernetes/overlays/qa/frontend-replica-patch.yaml
kubernetes/overlays/qa/kustomization.yaml
```

This confirms that the project contains:

* a reusable Kubernetes base
* a development overlay
* a QA overlay
* a production overlay
* environment-specific replica patches
* Kustomization files for the base and overlays

---

# 3. Verify Kustomize Availability

Kustomize is available through the installed Kubernetes client.

The version was checked with:

```bash
kubectl version --client
```

The actual result was:

```text
Client Version: v1.35.0
Kustomize Version: v5.7.1
```

This confirms that the installed `kubectl` client includes Kustomize support.

---

# 4. Verify Kustomize Build Support

The Kustomize build command was also checked:

```bash
kubectl kustomize --help | head -30
```

The command returned help information describing Kustomize build functionality.

The output included:

```text
Build a set of KRM resources using a 'kustomization.yaml' file.
```

This confirms that the local Kubernetes client can build Kubernetes resources from a directory containing a `kustomization.yaml` file.

---

# 5. Verify the Base Kustomization

The base Kustomization file was inspected with:

```bash
cat kubernetes/base/kustomization.yaml
```

The actual configuration is:

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
- namespace.yaml
- backend
- frontend
- config
- autoscaling
```

The base therefore references:

```text
namespace.yaml
backend
frontend
config
autoscaling
```

The `ingress` directory exists under the base directory, but it is not directly listed in the base `kustomization.yaml`.

Production explicitly adds the base ingress configuration, as shown later in this document.

---

# 6. Verify the Base Directory

The base directory was checked with:

```bash
find kubernetes/base -maxdepth 2 -type f -print | sort
```

The verified structure is:

```text
kubernetes/base/
├── autoscaling/
│   ├── hpa.yaml
│   └── kustomization.yaml
├── backend/
│   ├── deployment.yaml
│   ├── kustomization.yaml
│   └── service.yaml
├── config/
│   ├── backend-configmap.yaml
│   ├── kustomization.yaml
│   └── secret-template.yaml
├── frontend/
│   ├── deployment.yaml
│   ├── kustomization.yaml
│   └── service.yaml
├── ingress/
│   ├── ingress.yaml
│   └── kustomization.yaml
├── kustomization.yaml
└── namespace.yaml
```

The base therefore contains the common configuration for:

* namespace
* backend
* frontend
* application configuration
* secret template
* autoscaling
* ingress configuration

---

# 7. Build the Base Configuration

The base was rendered using:

```bash
kubectl kustomize kubernetes/base
```

The rendered resource types were summarized with:

```bash
kubectl kustomize kubernetes/base | grep '^kind:' | sort | uniq -c
```

The actual result was:

```text
1 kind: ConfigMap
2 kind: Deployment
1 kind: HorizontalPodAutoscaler
1 kind: Namespace
1 kind: Secret
2 kind: Service
```

Therefore, the base render produced:

```text
1 Namespace
1 ConfigMap
1 Secret
2 Services
2 Deployments
1 HorizontalPodAutoscaler
```

This confirms that the base Kustomization can successfully assemble the common FlavorForge Kubernetes resources.

---

# 8. Inspect the Rendered Base Resources

The rendered resource names were inspected with:

```bash
kubectl kustomize kubernetes/base | grep -E '^(kind:|  name:|  namespace:)'
```

The verified resources included:

```text
kind: Namespace
name: flavorforge

kind: ConfigMap
name: backend-config
namespace: flavorforge

kind: Secret
name: backend-secret
namespace: flavorforge

kind: Service
name: backend
namespace: flavorforge

kind: Service
name: frontend
namespace: flavorforge

kind: Deployment
name: backend

kind: Deployment
name: frontend

kind: HorizontalPodAutoscaler
name: backend-hpa
namespace: flavorforge
```

The base therefore provides the common FlavorForge application resources before environment-specific overlay changes are applied.

---

# 9. Verify the Development Overlay

The development overlay was inspected with:

```bash
cat kubernetes/overlays/dev/kustomization.yaml
```

The actual configuration is:

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
- ../../base

namespace: flavorforge-dev

nameSuffix: -dev

patches:
- path: backend-replica-patch.yaml
  target:
    kind: Deployment
    name: backend

- path: frontend-replica-patch.yaml
  target:
    kind: Deployment
    name: frontend
```

The development overlay therefore:

1. Reuses `../../base`
2. Uses the `flavorforge-dev` namespace
3. Adds the `-dev` name suffix
4. Applies a backend replica patch
5. Applies a frontend replica patch

---

# 10. Render the Development Overlay

The development overlay was rendered with:

```bash
kubectl kustomize kubernetes/overlays/dev
```

The rendered development configuration included resources such as:

```text
backend-dev
frontend-dev
backend-hpa-dev
```

The development services were rendered as:

```text
backend-dev
frontend-dev
```

inside:

```text
namespace: flavorforge-dev
```

The development HPA was rendered as:

```text
backend-hpa-dev
```

and targets:

```text
backend-dev
```

---

# 11. Verify Development Resource Types

The development resource types were summarized with:

```bash
kubectl kustomize kubernetes/overlays/dev | grep '^kind:' | sort | uniq -c
```

The actual result was:

```text
1 kind: ConfigMap
2 kind: Deployment
1 kind: HorizontalPodAutoscaler
1 kind: Namespace
1 kind: Secret
2 kind: Service
```

Therefore, the development overlay renders:

```text
1 Namespace
1 ConfigMap
1 Secret
2 Services
2 Deployments
1 HorizontalPodAutoscaler
```

---

# 12. Verify Development Deployments

The development deployments were inspected with:

```bash
kubectl kustomize kubernetes/overlays/dev | grep -A8 '^kind: Deployment'
```

The rendered deployments included:

```text
name: backend-dev
namespace: flavorforge-dev
```

and:

```text
name: frontend-dev
namespace: flavorforge-dev
```

The rendered backend deployment also contained the existing deployment change-cause annotation:

```text
kubernetes.io/change-cause: Release 1.8 - Backend health probe update
```

The frontend deployment contained:

```text
kubernetes.io/change-cause: Release 1.4 - Backend health probe update
```

These values are part of the existing rendered configuration and were captured during verification.

---

# 13. Verify the QA Overlay

The QA overlay was inspected with:

```bash
cat kubernetes/overlays/qa/kustomization.yaml
```

The QA overlay follows the same reusable-base model:

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
- ../../base

namespace: flavorforge-qa

nameSuffix: -qa

patches:
- path: backend-replica-patch.yaml
  target:
    kind: Deployment
    name: backend

- path: frontend-replica-patch.yaml
  target:
    kind: Deployment
    name: frontend
```

The QA overlay therefore:

* reuses the common base
* uses the `flavorforge-qa` namespace
* adds the `-qa` suffix
* applies the QA backend replica patch
* applies the QA frontend replica patch

---

# 14. Render the QA Overlay

The QA overlay was rendered using:

```bash
kubectl kustomize kubernetes/overlays/qa
```

The rendered configuration included:

```text
backend-qa
frontend-qa
backend-hpa-qa
```

The services were rendered in:

```text
namespace: flavorforge-qa
```

The QA resource summary was:

```text
1 kind: ConfigMap
2 kind: Deployment
1 kind: HorizontalPodAutoscaler
1 kind: Namespace
1 kind: Secret
2 kind: Service
```

Therefore, QA produces the same resource categories as Dev while using QA-specific names and namespace configuration.

---

# 15. Verify the Production Overlay

The production overlay was inspected with:

```bash
cat kubernetes/overlays/prod/kustomization.yaml
```

The actual configuration includes:

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
- ../../base
- ../../base/ingress

namespace: flavorforge

patches:
- path: backend-replica-patch.yaml
  target:
    kind: Deployment
    name: backend

- path: frontend-replica-patch.yaml
  target:
    kind: Deployment
    name: frontend
```

Unlike Dev and QA, the production overlay explicitly includes:

```yaml
- ../../base/ingress
```

This causes the production render to include the FlavorForge ingress configuration.

---

# 16. Render the Production Overlay

The production overlay was rendered using:

```bash
kubectl kustomize kubernetes/overlays/prod
```

The production resource summary was:

```bash
kubectl kustomize kubernetes/overlays/prod | grep '^kind:' | sort | uniq -c
```

The actual result was:

```text
1 kind: ConfigMap
2 kind: Deployment
1 kind: HorizontalPodAutoscaler
1 kind: Ingress
1 kind: Namespace
1 kind: Secret
2 kind: Service
```

Therefore, the production overlay renders:

```text
1 Namespace
1 ConfigMap
1 Secret
2 Services
2 Deployments
1 HorizontalPodAutoscaler
1 Ingress
```

---

# 17. Verify the Production Ingress

The production render contained:

```text
kind: Ingress
name: flavorforge-ingress
namespace: flavorforge
```

The ingress uses:

```text
ingressClassName: nginx
```

The configured paths include:

```text
/api  → backend service → port 3000
/     → frontend service → port 80
```

This confirms that the production overlay includes the ingress configuration in addition to the common application resources.

---

# 18. Compare the Three Environments

The verified Kustomize render results can be summarized as follows:

| Environment | Namespace         | Name Suffix | Deployments | Services | HPA | Ingress |
| ----------- | ----------------- | ----------- | ----------: | -------: | --: | ------: |
| Base        | `flavorforge`     | None        |           2 |        2 |   1 |      No |
| Dev         | `flavorforge-dev` | `-dev`      |           2 |        2 |   1 |      No |
| QA          | `flavorforge-qa`  | `-qa`       |           2 |        2 |   1 |      No |
| Prod        | `flavorforge`     | None        |           2 |        2 |   1 |     Yes |

The important point is that Dev and QA reuse the common base while applying their environment-specific namespace, naming and replica patches.

Production additionally includes the base ingress configuration.

---

# 19. What Kustomize Gives This Project

The verified structure allows the project to maintain common Kubernetes configuration in one place.

Instead of maintaining completely separate Kubernetes manifests for:

```text
Dev
QA
Prod
```

the overlays reuse:

```text
../../base
```

and apply only environment-specific changes.

The project therefore follows this configuration model:

```text
                  kubernetes/base
                        │
          ┌─────────────┼─────────────┐
          │             │             │
          ▼             ▼             ▼
        Dev             QA           Prod
          │             │             │
      namespace      namespace    namespace
      name suffix    name suffix  ingress
      patches        patches      patches
```

---

# 20. Evidence Collected

The Kustomize evidence is stored under:

```text
screenshots/build-journey/kustomize/
```

The available evidence files are:

```text
dev-render-success.png
hpa.png
ingress.png
kubectl-get-all.png
kubernetes-resources.png
kustomize-overlays.png
overlay-render-validation.png
prod-render-success.png
qa-render-success.png
services-ingress.png
```

The existing Kustomize structure screenshot is:

![Kustomize base and environment overlay structure](/screenshots/build-journey/kustomize/kustomize-overlays.png)

**Figure 1 — Kustomize base and environment overlay structure**

---

# 21. Troubleshooting

## 21.1 `kustomization.yaml` not found

If:

```bash
kubectl kustomize kubernetes/base
```

reports that a Kustomization file cannot be found, verify that the directory contains:

```text
kustomization.yaml
```

Use:

```bash
find kubernetes -name kustomization.yaml -print
```

---

## 21.2 Validate an overlay before applying it

Kustomize rendering can be checked without changing the cluster:

```bash
kubectl kustomize kubernetes/overlays/dev
```

Similarly:

```bash
kubectl kustomize kubernetes/overlays/qa
```

and:

```bash
kubectl kustomize kubernetes/overlays/prod
```

A successful render confirms that Kustomize can process the referenced resources and patches.

---

## 21.3 Inspect only resource types

For a quick summary:

```bash
kubectl kustomize kubernetes/overlays/dev \
  | grep '^kind:' \
  | sort \
  | uniq -c
```

The same approach can be used for QA and Prod.

---

# 22. Reproducibility

A user cloning the FlavorForge repository can inspect and render the Kustomize configurations from the repository root.

For example:

```bash
git clone <repository-url>
cd flavorforge-azure-devsecops-capstone
```

Then:

```bash
kubectl version --client
```

and:

```bash
kubectl kustomize kubernetes/base
kubectl kustomize kubernetes/overlays/dev
kubectl kustomize kubernetes/overlays/qa
kubectl kustomize kubernetes/overlays/prod
```

These commands allow the Kubernetes configuration to be inspected and rendered without immediately applying changes to a cluster.

---

# 23. Official References

Kustomize documentation:

* Kubernetes documentation — Kustomize

Kustomize is integrated into the Kubernetes command-line workflow through commands such as:

```bash
kubectl kustomize
```

Official documentation should be consulted for current Kustomize syntax and behavior.

---

# 24. Result

The Kustomize stage was verified against the actual FlavorForge repository.

The verification confirmed:

* Kustomize is available through `kubectl`
* Kustomize version `v5.7.1` is installed
* The Kubernetes configuration contains a reusable base
* Dev, QA and Prod overlays exist
* The base renders successfully
* The Dev overlay renders successfully
* The QA overlay renders successfully
* The Prod overlay renders successfully
* Dev uses the `flavorforge-dev` namespace and `-dev` suffix
* QA uses the `flavorforge-qa` namespace and `-qa` suffix
* Production uses the `flavorforge` namespace
* Production explicitly includes the ingress configuration
* Environment-specific replica patches are defined
* The rendered resource types were verified for all environments

The resulting configuration provides a reusable Kubernetes configuration model for the FlavorForge environments:

```text
                FlavorForge Kubernetes
                         │
                         ▼
                       Base
                         │
             ┌───────────┼───────────┐
             ▼           ▼           ▼
            Dev         QA          Prod
             │           │           │
          patches      patches     patches
             │           │           │
             └───────────┼───────────┘
                         ▼
                  Environment-specific
                     Kubernetes
                     resources
```

The next stage is to verify the rendered configurations against the Kubernetes/AKS environment before moving forward to the Azure DevOps pipeline stage.

