# Security Policy

## Overview

FlavorForge follows DevSecOps security practices throughout the software delivery lifecycle.

Security is integrated into source control, CI/CD pipelines, container management, Kubernetes deployment, and cloud operations.

---

# Supported Versions

This repository is maintained for learning and demonstration purposes.

The latest main branch represents the supported version.

---

# Reporting a Vulnerability

If you discover a security vulnerability:

- Do not create a public issue.
- Report it privately to the repository owner.

Please include:

- Description of the issue
- Steps to reproduce
- Potential impact
- Suggested remediation

---

# Security Practices Implemented

FlavorForge demonstrates the following security controls:

## Source Code Security

- SonarCloud static code analysis
- Code quality gate validation
- Security hotspot detection

## Container Security

- Docker multi-stage builds
- Minimal production images
- Trivy vulnerability scanning
- Container image validation before deployment

## Kubernetes Security

- Kubernetes Secrets for sensitive configuration
- ConfigMaps for non-sensitive configuration
- Namespace-based resource isolation
- Secure workload deployment practices

## Cloud Security

- Azure managed identity integration
- Azure Container Registry private image storage
- AKS-based workload isolation

## CI/CD Security

- Automated security validation
- Controlled deployment workflow
- GitOps-based deployment using ArgoCD

---

# Secret Management

Sensitive values should never be committed directly into Git repositories.

For production environments, secrets should be managed using:

- Azure Key Vault
- Kubernetes External Secrets
- Azure Workload Identity

The repository contains example placeholders only for demonstration purposes.