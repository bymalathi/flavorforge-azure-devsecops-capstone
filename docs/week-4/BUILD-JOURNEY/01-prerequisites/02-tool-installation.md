# Step 1.2 — Development and DevOps Tool Installation

## What we wanted to do

After preparing Windows, WSL 2, Ubuntu, and VS Code, the next step was to prepare the command-line tools required to build, containerize, deploy, and manage FlavorForge.

The main tools required were:

* Git
* Node.js
* npm
* Docker
* Azure CLI
* kubectl
* Helm
* Azure DevOps CLI extension

We did **not** want to reinstall tools that were already working.

The approach was:

```text
Check tool
    ↓
Already installed?
    ├── Yes → Verify and continue
    │
    └── No → Install → Verify
```

This avoided unnecessary changes to an already working development environment.

---

# Step 1 — Verify Git

Git was required for source-code version control and for working with the FlavorForge GitHub repository.

### Command

```bash
git --version
```

### What the command did

It displayed the installed Git version.

Example:

```text
git version 2.43.0
```

The exact version can differ between systems.

### If Git was missing

If the terminal returned:

```text
git: command not found
```

Git could be installed using:

```bash
sudo apt update
```

```bash
sudo apt install -y git
```

Then it was verified again:

```bash
git --version
```

### Result

Git was available for the FlavorForge repository workflow.

---

# Step 2 — Verify Node.js

Node.js was required because FlavorForge uses:

* React + Vite for the frontend
* Node.js + Express for the backend

### Command

```bash
node --version
```

### What the command did

It displayed the installed Node.js version.

Example:

```text
v24.18.0
```

The exact version depends on the development environment.

### Result

If a Node.js version was returned, Node.js was available.

---

# Step 3 — Verify npm

npm is used to install and manage the JavaScript dependencies for the frontend and backend.

npm normally comes with Node.js.

### Command

```bash
npm --version
```

### What the command did

It displayed the installed npm version.

Example:

```text
11.16.0
```

### Result

If the command returned a version number, npm was available.

---

# Step 4 — Check the Node.js version required by the project

We did not want to install an arbitrary Node.js version just because it was the latest available.

The Node.js version needed to remain compatible with the FlavorForge application and its build process.

This was particularly important because the frontend uses Vite and the Azure DevOps pipeline also specifies a Node.js version.

Therefore, before changing an existing Node.js installation, the project configuration should be checked.

### Important rule

If the required project version is already installed and working:

```text
Do not reinstall Node.js.
```

If a new environment requires a different version, a version manager such as `nvm` can be used to install the required version.

After changing Node.js, verify both:

```bash
node --version
```

```bash
npm --version
```

---

# Step 5 — Verify Docker

Docker was required to containerize the FlavorForge frontend and backend.

### Command

```bash
docker --version
```

### What the command did

It displayed the installed Docker version.

Example:

```text
Docker version 29.5.3
```

The exact version may differ.

However, checking the version alone was not enough.

We also needed to verify that Docker could actually run a container.

### Functional test

```bash
docker run hello-world
```

### What the command did

Docker downloaded and ran the `hello-world` test image.

A successful completion confirmed that the Docker engine was accessible from the development environment.

### Result

Docker was ready for the FlavorForge containerization stage.

---

# Step 6 — Configure Docker with WSL

Because FlavorForge development was performed through Ubuntu WSL, Docker needed to be accessible from the WSL terminal.

For the Windows + WSL setup:

1. Docker Desktop was installed on Windows.
2. Docker Engine was started.
3. WSL integration was enabled for the Ubuntu distribution.
4. The VS Code WSL terminal was reopened.

Docker was then verified again:

```bash
docker --version
```

and:

```bash
docker run hello-world
```

The important result was that Docker commands worked directly from the Ubuntu WSL terminal.

---

# Step 7 — Verify Azure CLI

Azure CLI was required to create and manage the Azure resources used by FlavorForge.

These included resources such as:

* Resource Group
* Azure Container Registry
* Azure Kubernetes Service

### Command

```bash
az version
```

A more focused version check was:

```bash
az version --query '"azure-cli"' -o tsv
```

### What the command did

It displayed the installed Azure CLI version.

Example:

```text
2.88.0
```

The exact version may differ.

### Result

Azure CLI was available for the Azure setup and deployment stages.

---

# Step 8 — Verify Azure authentication

Having Azure CLI installed was not enough.

We also needed to verify that the CLI was authenticated to an Azure subscription.

### Command

```bash
az account show --query "{subscription:name,state:state}" -o table
```

### What the command did

It displayed a limited set of Azure account information.

Example:

```text
Subscription        State
------------------  -------
Azure subscription  1 Enabled
```

The important information was that the subscription was available and enabled.

### If Azure CLI was not authenticated

The login command was:

```bash
az login
```

A browser-based authentication process then allowed the Azure account to be authenticated.

After login, verification was performed using:

```bash
az account show --query "{subscription:name,state:state}" -o table
```

### Security rule

For screenshots and recorded demonstrations, we avoided commands that unnecessarily exposed sensitive Azure account information.

For example, we did not use the full:

```bash
az account show
```

in recorded demonstrations when a sanitized query was sufficient.

---

# Step 9 — Verify kubectl

`kubectl` was required to communicate with Kubernetes and later with the FlavorForge AKS cluster.

### Command

```bash
kubectl version --client
```

### Example output

```text
Client Version: v1.35.0
Kustomize Version: v5.7.1
```

The exact versions may differ.

### What the command did

The `--client` option checked the local kubectl installation without requiring a Kubernetes cluster connection.

### Result

kubectl was installed and ready for the later AKS/Kubernetes stages.

---

# Step 10 — Verify Helm

Helm was another Kubernetes command-line tool required in the DevOps environment.

### Command

```bash
helm version --short
```

### Example

```text
v3.21.2+g1259634
```

The exact version may differ.

### Result

Helm was available for Kubernetes-related tooling.

---

# Step 11 — Verify the Azure DevOps CLI extension

Azure DevOps functionality is provided through an Azure CLI extension.

### Command

```bash
az extension show --name azure-devops --query version -o tsv
```

### What the command did

It checked whether the Azure DevOps extension was installed and returned its version.

Example:

```text
1.0.6
```

### If the extension was missing

It could be installed using:

```bash
az extension add --name azure-devops
```

Then verified again:

```bash
az extension show --name azure-devops --query version -o tsv
```

### Result

The Azure CLI environment was prepared for Azure DevOps-related operations.

---

# Step 12 — Perform final tool verification

After all required tools were available, we could run a combined verification.

### Command

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

### What this verified

The command checked the major tools in one place:

```text
Ubuntu
Git
Node.js
npm
Docker
Azure CLI
kubectl
Helm
Azure DevOps extension
Azure authentication
```

This gave us a final readiness check before continuing with the FlavorForge implementation.

---

# Security — What we must never publish

While running these commands, we had to make sure credentials and sensitive information were not included in screenshots, videos, or Git commits.

Never publish:

```text
Subscription ID
Tenant ID
Email address
Password
Access token
Client secret
Personal access token
Private key
Kubernetes Secret values
Connection strings
Service principal credentials
```

Where possible, use filtered commands such as:

```bash
az account show --query "{subscription:name,state:state}" -o table
```

instead of displaying the complete account object.

---

# Final Verification

The development environment was ready when the following checks were successful:

```text
✓ Git available
✓ Node.js available
✓ npm available
✓ Docker available
✓ Docker container test successful
✓ Azure CLI available
✓ Azure authentication available
✓ kubectl available
✓ Helm available
✓ Azure DevOps CLI extension available
```

---

# What we achieved

At the end of this step, the WSL development environment contained the command-line tooling required for the FlavorForge journey.

The environment was now ready for the next stages:

```text
GitHub
   ↓
Application
   ↓
Docker
   ↓
Azure
   ↓
Kubernetes
   ↓
Kustomize
   ↓
Azure DevOps
   ↓
SonarCloud
   ↓
Argo CD
```

The important rule throughout the setup was:

> **Check first. Install only when required. Verify after installation.**

This prevented unnecessary changes to an already working development environment.
