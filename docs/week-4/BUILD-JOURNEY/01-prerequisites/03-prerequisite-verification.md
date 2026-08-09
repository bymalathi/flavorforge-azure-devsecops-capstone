# Step 1.3 — Final Prerequisite Verification

## Objective

Confirm that the complete FlavorForge development environment is ready before starting application development.

This verification is performed after all required tools have either:

* already been found installed, or
* installed and verified.

---

## Run the Verification

From the VS Code WSL terminal:

```bash
echo "===== FlavorForge Prerequisites ====="

echo ""
echo "=== OS ==="
cat /etc/os-release | grep PRETTY_NAME

echo ""
echo "=== User ==="
whoami

echo ""
echo "=== Git ==="
git --version

echo ""
echo "=== Node.js ==="
node --version

echo ""
echo "=== npm ==="
npm --version

echo ""
echo "=== Docker ==="
docker --version

echo ""
echo "=== Azure CLI ==="
az version --query '"azure-cli"' -o tsv

echo ""
echo "=== kubectl ==="
kubectl version --client

echo ""
echo "=== Helm ==="
helm version --short

echo ""
echo "=== Azure DevOps Extension ==="
az extension show --name azure-devops --query version -o tsv

echo ""
echo "=== Azure Authentication ==="
az account show --query "{subscription:name,state:state}" -o table
```

---

# Expected Result

The command should show successful versions for:

```text
Ubuntu
Git
Node.js
npm
Docker
Azure CLI
kubectl
Kustomize
Helm
Azure DevOps extension
```

and Azure authentication should show an enabled subscription without exposing subscription or tenant IDs.

---

# Screenshot

### 📸 SAFE TO CAPTURE

Capture the complete terminal output.

Suggested filename:

```text
01-prerequisites-verification.png
```

Save under:

```text
screenshots/BUILD-JOURNEY/01-prerequisites/
```

---

# Video



### Recorded the same verification process.

Saved under:

```text
videos/BUILD-JOURNEY/01-prerequisites/
```

---

# Security Verification Before Publishing

Check the screenshot and video for:

* Subscription ID
* Tenant ID
* Email address
* Password
* Access token
* Client secret
* Private key
* Kubernetes secret value
* Connection string

If any sensitive information appears, do not publish that evidence.

---

# Completion Criteria

Step 1 is complete when:

* [ ] WSL works
* [ ] Ubuntu works
* [ ] VS Code WSL works
* [ ] Git works
* [ ] Node.js works
* [ ] npm works
* [ ] Docker works
* [ ] Azure CLI works
* [ ] Azure authentication works
* [ ] kubectl works
* [ ] Helm works
* [ ] Azure DevOps extension works
* [ ] Screenshot captured
* [ ] Video recorded
* [ ] Documentation completed
* [ ] Evidence checked for sensitive information

Only after all items are complete should the BUILD-JOURNEY continue to Step 2.
