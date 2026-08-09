# Step 1.1 — Windows, WSL and VS Code Setup

## Objective

Prepare a Linux development environment for the FlavorForge project using:

* Windows
* WSL 2
* Ubuntu
* Visual Studio Code
* VS Code WSL integration

All FlavorForge development and command-line instructions in this BUILD-JOURNEY are performed from the Ubuntu WSL terminal inside VS Code.

---

# 1. Check Whether WSL Is Already Installed

Open **Windows PowerShell** or **Windows Terminal**.

Run:

```powershell
wsl --status
```

You can also run:

```powershell
wsl --list --verbose
```

## If WSL is already installed

Look for an installed Linux distribution such as:

```text
NAME      STATE      VERSION
Ubuntu    Running    2
```

If Ubuntu is listed with:

```text
VERSION 2
```

WSL 2 is already available.

### Action

Continue to the Ubuntu verification section.

---

# 2. If WSL Is NOT Installed

Open **PowerShell as Administrator**.

Run:

```powershell
wsl --install
```

This installs WSL and the default Linux distribution supported by the Windows installation.

Restart Windows if requested.

After restarting, open Ubuntu from the Start menu.

---

# 3. Verify WSL

Run from PowerShell:

```powershell
wsl --list --verbose
```

Expected example:

```text
NAME      STATE      VERSION
Ubuntu    Running    2
```

The exact distribution name may vary.

The important value is:

```text
VERSION 2
```

---

# 4. Open Ubuntu

Open the Ubuntu application from Windows Start.

The first launch may ask you to create:

* Linux username
* Linux password

These credentials are for the WSL Linux environment.

Do not publish the password.

---

# 5. Verify Ubuntu

Inside the Ubuntu terminal run:

```bash
cat /etc/os-release | grep PRETTY_NAME
```

Expected:

```text
PRETTY_NAME="Ubuntu 24.04.4 LTS"
```

The exact Ubuntu version may differ for a future installation.

---

# 6. Install VS Code

If Visual Studio Code is already installed:

Open VS Code and continue.

If VS Code is not installed:

1. Download Visual Studio Code from the official Microsoft website.
2. Install it using the normal Windows installer.
3. Open Visual Studio Code.

---

# 7. Install the VS Code WSL Extension

Inside VS Code:

1. Open **Extensions**.
2. Search for:

```text
WSL
```

3. Install the Microsoft **WSL** extension.

The extension allows VS Code to work directly with files and terminals inside the Linux WSL environment.

---

# 8. Open the Project Through WSL

Open the Ubuntu terminal.

Navigate to the project:

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

Then run:

```bash
code .
```

VS Code should open the project using the WSL environment.

Check the bottom-left corner of VS Code.

It should indicate that VS Code is connected to WSL.

---

# 9. Verify the Terminal

Inside VS Code:

1. Open **Terminal → New Terminal**.
2. Confirm the terminal is an Ubuntu/WSL terminal.
3. Run:

```bash
pwd
```

Expected:

```text
/home/<username>/flavorforge-azure-devsecops-capstone
```

The username will be different for another person.

---

# 10. Important Environment Rule

All FlavorForge command-line instructions in this BUILD-JOURNEY should be executed from the **VS Code WSL Ubuntu terminal**, unless a step explicitly says to use:

* Windows PowerShell
* Azure Portal
* Azure DevOps
* GitHub
* SonarCloud
* another web interface

Do not assume that a Windows PowerShell command and a WSL command are interchangeable.

---

# Screenshot if you are documenting

Capture:

1. VS Code showing the FlavorForge project.
2. WSL terminal showing the project directory.
3. WSL/Ubuntu environment.

Before publishing the screenshot, make sure no:

* password
* token
* private key
* secret
* connection string

is visible.


---

# Verification Checklist

* [ ] WSL installed
* [ ] WSL 2 verified
* [ ] Ubuntu installed
* [ ] Ubuntu terminal working
* [ ] VS Code installed
* [ ] VS Code WSL extension installed
* [ ] Project opened through WSL
* [ ] VS Code terminal verified

---

# Reviewer Question

### Why did you use WSL?

WSL provides a Linux environment directly inside Windows. I used it so the FlavorForge command-line development environment is consistent with the Linux-based tooling used for Docker, Kubernetes, Azure CLI, Helm and project automation.
