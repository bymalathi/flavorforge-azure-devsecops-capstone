# Step 1.1 — Windows, WSL and VS Code Setup

## What we wanted to do

Before starting FlavorForge development, we needed a Linux-based development environment on Windows.

The development environment used:

* Windows
* WSL 2
* Ubuntu
* Visual Studio Code
* VS Code WSL integration

The goal was to run the FlavorForge command-line tools from an Ubuntu WSL terminal instead of directly from Windows.

This provided a consistent Linux environment for tools such as Docker, Kubernetes, Azure CLI, and project automation.

---

# Step 1 — Check whether WSL was installed

We first checked whether WSL was already available on the Windows machine.

### Command

Run from **Windows PowerShell** or **Windows Terminal**:

```powershell
wsl --status
```

We could also check the installed Linux distributions:

```powershell
wsl --list --verbose
```

### What the command did

```powershell
wsl --status
```

displayed the current WSL configuration.

```powershell
wsl --list --verbose
```

listed the installed Linux distributions and showed which WSL version they were using.

An example of the expected output was:

```text
NAME      STATE      VERSION
Ubuntu    Running    2
```

The important value was:

```text
VERSION 2
```

This confirmed that Ubuntu was running using WSL 2.

---

# Step 2 — Install WSL if required

If WSL was not installed, we used an administrator PowerShell window.

### Command

```powershell
wsl --install
```

### What the command did

This enabled WSL and installed the default Linux distribution supported by the Windows installation.

If Windows requested a restart, the machine was restarted before continuing.

After restarting, Ubuntu could be opened from the Windows Start menu.

### Important

This installation step was only required if WSL was not already available.

If WSL 2 and Ubuntu were already installed, we continued with verification instead of reinstalling them.

---

# Step 3 — Verify WSL 2

After installation, we verified the Linux distribution and WSL version.

### Command

Run from PowerShell:

```powershell
wsl --list --verbose
```

### Expected result

```text
NAME      STATE      VERSION
Ubuntu    Running    2
```

The exact Ubuntu state may vary depending on whether the distribution is currently running.

The important part was:

```text
VERSION 2
```

### What this confirmed

We had:

```text
Windows
   ↓
WSL 2
   ↓
Ubuntu
```

This became the Linux environment used for the FlavorForge project.

---

# Step 4 — Open Ubuntu

We opened the Ubuntu application from the Windows Start menu.

On the first launch, Ubuntu could request:

* Linux username
* Linux password

These credentials belong to the local WSL Linux environment.

### Security note

The Linux password was not included in project documentation or screenshots.

---

# Step 5 — Verify the Ubuntu environment

Once inside Ubuntu, we verified which Linux distribution was being used.

### Command

```bash
cat /etc/os-release | grep PRETTY_NAME
```

### Expected result

```text
PRETTY_NAME="Ubuntu 24.04.4 LTS"
```

The exact Ubuntu version may change with future installations.

### What the command did

`/etc/os-release` contains information about the Linux operating system.

The `grep PRETTY_NAME` part displayed only the human-readable operating-system name.

This confirmed that our command-line environment was Ubuntu.

---

# Step 6 — Install Visual Studio Code

The next requirement was Visual Studio Code.

If VS Code was already installed, we continued to the WSL integration step.

If it was not installed, it was installed using the normal Windows installation process.

The purpose of VS Code was to provide:

* project editing
* integrated terminal
* Git integration
* WSL development support

---

# Step 7 — Install the VS Code WSL extension

Inside Visual Studio Code, we opened the Extensions panel and searched for:

```text
WSL
```

We installed the Microsoft WSL extension.

### What it did

The extension allowed VS Code to work directly with files and terminals inside the WSL Linux environment.

This meant that the project could be opened from Ubuntu while still using the Windows VS Code application.

---

# Step 8 — Open the FlavorForge repository through WSL

We opened the Ubuntu terminal and navigated to the FlavorForge repository.

### Command

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

### What the command did

`cd` changed the current directory to the FlavorForge project directory.

The repository was therefore available from the WSL filesystem environment.

---

# Step 9 — Open the project in VS Code

From the FlavorForge project directory, we opened VS Code.

### Command

```bash
code .
```

### What the command did

The `.` represents the current directory.

Therefore:

```bash
code .
```

opened the current FlavorForge repository in Visual Studio Code.

VS Code was connected to the WSL environment instead of treating the project as a normal Windows-only project.

---

# Step 10 — Verify the project directory

After opening the project, we opened the VS Code integrated terminal.

The terminal was expected to be an Ubuntu/WSL terminal.

### Command

```bash
pwd
```

### Expected result

```text
/home/<username>/flavorforge-azure-devsecops-capstone
```

The `<username>` value depends on the local Linux user.

### What this confirmed

The terminal was operating inside the FlavorForge repository:

```text
Ubuntu / WSL
      ↓
FlavorForge repository
      ↓
VS Code
```

This became the command-line environment used throughout the BUILD-JOURNEY.

---

# Step 11 — Confirm the working environment

At this point the development environment consisted of:

```text
Windows
   │
   ▼
WSL 2
   │
   ▼
Ubuntu
   │
   ▼
FlavorForge repository
   │
   ▼
VS Code + WSL integration
```

This environment was then used for the subsequent FlavorForge implementation steps.

---

# Commands used in this setup

The main commands introduced during this setup were:

### Windows / PowerShell

```powershell
wsl --status
```

```powershell
wsl --list --verbose
```

If WSL was not installed:

```powershell
wsl --install
```

### Ubuntu / WSL

```bash
cat /etc/os-release | grep PRETTY_NAME
```

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

```bash
code .
```

```bash
pwd
```

---

# Verification

The environment was considered ready when the following checks were successful:

```text
✓ WSL available
✓ WSL 2 available
✓ Ubuntu available
✓ Ubuntu terminal working
✓ VS Code installed
✓ VS Code WSL integration available
✓ FlavorForge repository accessible from WSL
✓ VS Code opened the repository through WSL
✓ VS Code integrated terminal working from the repository
```

---

# Screenshot Evidence

When documenting this setup, screenshots should show the actual environment without exposing credentials or secrets.

Useful evidence includes:

* VS Code with the FlavorForge repository open
* Ubuntu/WSL terminal
* FlavorForge repository path
* WSL environment information

Before committing screenshots to GitHub, verify that they do not contain:

* passwords
* access tokens
* private keys
* connection strings
* other credentials

---

# What we achieved

We prepared the development environment required to build FlavorForge.

The final setup was:

```text
Windows
   ↓
WSL 2
   ↓
Ubuntu
   ↓
VS Code WSL Integration
   ↓
FlavorForge Repository
```

From this point onward, the FlavorForge command-line work could be performed from the Ubuntu WSL terminal inside VS Code.

This environment was then used for the subsequent Git, application, Docker, Azure, and Kubernetes implementation steps.

---

# Reviewer Question

## Why did we use WSL?

We used WSL because it provides a Linux environment directly inside Windows. This gave us a consistent Linux command-line environment for FlavorForge tools such as Docker, Kubernetes, Azure CLI, and project automation while continuing to use Windows and VS Code for development.
