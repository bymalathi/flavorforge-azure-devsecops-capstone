# 3. Repository Structure

The FlavorForge Azure DevSecOps Capstone repository is organized into separate directories for the application source code, containerization, Kubernetes manifests, CI/CD pipelines, documentation, automation scripts, and project artifacts.

```text
flavorforge-azure-devsecops-capstone/
├── backend/                     # Node.js REST API
│   ├── src/
│   ├── tests/
│   ├── Dockerfile
│   └── package.json
│
├── frontend/                    # React + Vite application
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   └── package.json
│
├── kubernetes/                  # Kubernetes manifests
│   ├── base/
│   │   ├── backend/
│   │   ├── frontend/
│   │   ├── config/
│   │   ├── ingress/
│   │   └── autoscaling/
│   └── overlays/
│       ├── dev/
│       ├── qa/
│       └── prod/
│
├── argocd/                      # GitOps configuration
│   ├── flavorforge-app.yaml
│   └── README.md
│
├── docker/                      # Docker documentation
│
├── scripts/                     # Automation scripts
│   ├── setup.sh
│   ├── deploy.sh
│   ├── verify.sh
│   ├── clean.sh
│   └── azure-manager.sh
│
├── docs/                        # Project documentation
│   ├── architecture/
│   ├── implementation/
│   ├── pipeline/
│   ├── troubleshooting/
│   ├── presentation/
│   └── project/
│
├── screenshots/                 # Project evidence
│
├── azure-pipelines.yml          # Azure DevOps CI/CD pipeline
├── argocd-pipeline.yml          # GitOps pipeline
├── docker-compose.yml           # Local development
├── README.md
├── LICENSE
└── SECURITY.md
```

The repository is structured to separate application source code, infrastructure configuration, CI/CD pipelines, GitOps deployment, automation scripts, documentation, and supporting project artifacts. This modular organization improves maintainability, scalability, and ease of collaboration throughout the software development lifecycle.