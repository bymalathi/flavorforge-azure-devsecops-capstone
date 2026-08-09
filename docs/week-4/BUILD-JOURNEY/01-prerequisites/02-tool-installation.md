# Step 1.2 — Development and DevOps Tool Installation

## Objective

Verify and, if necessary, install all tools required to build and deploy FlavorForge.

The instructions below support both situations:

1. The tool is already installed.
2. The tool is missing.

Never reinstall a working tool unnecessarily.

---

# 1. Git

## Check

Run:

```bash
git --version
```

### If Git is installed

Example:

```text
git version 2.43.0
```

### Action

Git is available.

Continue to Node.js.

---

## If Git is missing

If the terminal reports something similar to:

```text
git: command not found
```

run:

```bash
sudo apt update
sudo apt install -y git
```

Then verify:

```bash
git --version
```

Expected output similar to:

```text
git version 2.43.0
```

The exact version may differ.

---

# 2. Node.js

## Check

Run:

```bash
node --version
```

### If Node.js is installed

Example:

```text
v24.18.0
```

Verify npm as well:

```bash
npm --version
```

### Action

If both commands work, continue.

---

## If Node.js is missing

Do not immediately install an arbitrary latest version.

First check the FlavorForge project configuration for its required Node.js version.

If the project specifies a version, install that version.

For a new Ubuntu environment where the project requires Node.js 24, a version manager such as `nvm` can be used.

Install `nvm` using its official installation instructions, then install the required Node.js version.

After installation:

```bash
node --version
npm --version
```

Verify both commands before continuing.

### Important

Node.js version consistency matters because the frontend build and Azure DevOps pipeline must use compatible Node.js versions.

---

# 3. npm

npm normally comes with Node.js.

## Check

```bash
npm --version
```

### If installed

Example:

```text
11.16.0
```

Continue.

### If npm is missing

Do not install a random npm version separately first.

Check the Node.js installation.

Run:

```bash
node --version
```

If Node.js is not correctly installed, reinstall/configure Node.js using the project's required version.

Then verify:

```bash
npm --version
```

---

# 4. Docker

## Check

Run:

```bash
docker --version
```

### If Docker is installed

Example:

```text
Docker version 29.5.3
```

Then verify that Docker can actually run containers:

```bash
docker run hello-world
```

If the container completes successfully, Docker is working.

---

## If Docker is missing

For the Windows + WSL environment, install Docker Desktop on Windows and enable WSL 2 integration.

After installation:

1. Open Docker Desktop.
2. Ensure Docker Engine is running.
3. Enable WSL integration for the Ubuntu distribution.
4. Open the VS Code WSL terminal again.

Then run:

```bash
docker --version
```

and:

```bash
docker run hello-world
```

Both must work before continuing.

---

# 5. Azure CLI

## Check

Run:

```bash
az version
```

or:

```bash
az version --query '"azure-cli"' -o tsv
```

### If Azure CLI is installed

Example:

```text
2.88.0
```

Continue.

---

## If Azure CLI is missing

Install Azure CLI using the official Microsoft Azure CLI installation instructions for Ubuntu.

After installation:

```bash
az version --query '"azure-cli"' -o tsv
```

Verify that a version number is returned.

---

# 6. Azure Authentication

## Check

Run:

```bash
az account show --query "{subscription:name,state:state}" -o table
```

### If authentication is already available

Expected example:

```text
Subscription       State
-----------------  -------
Azure subscription 1 Enabled
```

Continue.

---

## If Azure CLI is not authenticated

Run:

```bash
az login
```

A browser-based login process will start.

Complete Azure authentication.

Then verify using the safe command:

```bash
az account show --query "{subscription:name,state:state}" -o table
```

Do NOT use the following command in recorded videos:

```bash
az account show
```

because it can display account identifiers.

Also do not record commands that display:

* subscription IDs
* tenant IDs
* access tokens
* credentials

---

# 7. kubectl

## Check

Run:

```bash
kubectl version --client
```

Expected example:

```text
Client Version: v1.35.0
Kustomize Version: v5.7.1
```

### If installed

Continue.

---

## If kubectl is missing

Install the Kubernetes command-line tool using the official Kubernetes installation instructions for Linux.

Then verify:

```bash
kubectl version --client
```

Do not continue until the command works.

---

# 8. Helm

## Check

Run:

```bash
helm version --short
```

Expected example:

```text
v3.21.2+g1259634
```

### If Helm is installed

Continue.

---

## If Helm is missing

Install Helm using the official Helm installation instructions.

Then verify:

```bash
helm version --short
```

---

# 9. Azure DevOps CLI Extension

The Azure DevOps extension is an extension of Azure CLI.

## Check

Run:

```bash
az extension show --name azure-devops --query version -o tsv
```

### If installed

Example:

```text
1.0.6
```

Continue.

---

## If missing

Run:

```bash
az extension add --name azure-devops
```

Then verify:

```bash
az extension show --name azure-devops --query version -o tsv
```

---

# 10. Final Tool Verification

After installing anything that was missing, run:

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

# Security Rule

Never publish or record:

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

Use sanitized verification commands for recorded demonstrations.

---

# Verification Checklist

* [ ] Git checked
* [ ] Git installed if required
* [ ] Node.js checked
* [ ] Node.js installed if required
* [ ] npm checked
* [ ] Docker checked
* [ ] Docker functional test completed
* [ ] Azure CLI checked
* [ ] Azure authentication verified
* [ ] kubectl checked
* [ ] Helm checked
* [ ] Azure DevOps extension checked
* [ ] Final verification completed