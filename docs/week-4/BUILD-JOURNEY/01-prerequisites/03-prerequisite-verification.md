# Step 1.3 — Final Prerequisite Verification

## What we wanted to do

Before starting the actual FlavorForge application development, we needed one final check to make sure the development environment was ready.

At this point, the required tools had either:

* already been installed and verified, or
* been installed during the previous setup steps.

The purpose of this step was to verify everything together from the **VS Code WSL Ubuntu terminal**.

---

# Step 1 — Run the final verification command

Open the FlavorForge project in VS Code and use the WSL Ubuntu terminal.

Run:

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

# Step 2 — Understand what was verified

The command performed several checks in one run.

### Operating system

```bash
cat /etc/os-release | grep PRETTY_NAME
```

Confirmed the Linux environment being used by the project.

### Current user

```bash
whoami
```

Confirmed the Linux user running the commands.

### Git

```bash
git --version
```

Confirmed Git was available.

### Node.js

```bash
node --version
```

Confirmed Node.js was available for the frontend and backend development.

### npm

```bash
npm --version
```

Confirmed the Node.js package manager was available.

### Docker

```bash
docker --version
```

Confirmed Docker was available from the WSL environment.

### Azure CLI

```bash
az version --query '"azure-cli"' -o tsv
```

Confirmed Azure CLI was installed.

### kubectl

```bash
kubectl version --client
```

Confirmed the Kubernetes command-line client was available.

### Helm

```bash
helm version --short
```

Confirmed Helm was available.

### Azure DevOps extension

```bash
az extension show --name azure-devops --query version -o tsv
```

Confirmed the Azure DevOps extension was installed in Azure CLI.

### Azure authentication

```bash
az account show --query "{subscription:name,state:state}" -o table
```

Confirmed that Azure CLI had an authenticated and enabled subscription.

The filtered query was intentionally used instead of displaying the complete Azure account information.

---

# Step 3 — Verify the result

The final output should provide successful information for the development tools.

The environment should have the following available:

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

Azure authentication should also show an enabled subscription.

The exact version numbers may differ between environments.

The important requirement is that the commands complete successfully.

---

# Step 4 — Capture the verification evidence

Once the verification command completed successfully, the complete terminal output could be captured as a screenshot.

### Screenshot filename

```text
01-prerequisites-verification.png
```

### Repository location

```text
screenshots/build-journey/01-prerequisites/
```

The screenshot should show the verification output clearly enough for another person to confirm that the tools were available.

---

# Step 5 — Record the verification

The same prerequisite verification process was also recorded for the BUILD-JOURNEY video evidence.

### Video location

```text
videos/BUILD-JOURNEY/01-prerequisites/
```

The recording should show the verification being performed from the WSL/VS Code environment.

---

# Step 6 — Check the evidence before publishing

Before committing the screenshot or video to the repository, inspect the evidence for sensitive information.

Do not publish:

```text
Subscription ID
Tenant ID
Email address
Password
Access token
Client secret
Private key
Kubernetes Secret values
Connection strings
```

The Azure verification command was intentionally filtered:

```bash
az account show --query "{subscription:name,state:state}" -o table
```

This reduces the amount of account information displayed in the verification output.

---

# Final Completion Checklist

Step 1 was complete when:

```text
[ ] WSL works
[ ] Ubuntu works
[ ] VS Code WSL integration works
[ ] Git works
[ ] Node.js works
[ ] npm works
[ ] Docker works
[ ] Azure CLI works
[ ] Azure authentication works
[ ] kubectl works
[ ] Helm works
[ ] Azure DevOps extension works
[ ] Final verification command completed
[ ] Screenshot captured
[ ] Video recorded
[ ] Documentation completed
[ ] Screenshot/video checked for sensitive information
```

---

# What we achieved

The FlavorForge development environment was verified as ready.

The resulting workflow was:

```text
Windows
   ↓
WSL 2
   ↓
Ubuntu
   ↓
VS Code
   ↓
FlavorForge Repository
   ↓
Development & DevOps Tools
   ↓
Ready for FlavorForge Development
```

Only after these prerequisite checks were complete did we move to the next stage of the FlavorForge BUILD-JOURNEY.
