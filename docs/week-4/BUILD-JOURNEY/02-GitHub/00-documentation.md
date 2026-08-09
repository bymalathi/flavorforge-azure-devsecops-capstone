# GitHub — Complete Setup and Connection Guide

## Objective

This document explains how to create and connect the FlavorForge project to GitHub from the beginning.

A person following this guide should be able to:

1. Create a GitHub account if required.
2. Create a GitHub repository.
3. Install and verify Git.
4. Configure Git locally.
5. Create or identify the local project repository.
6. Connect the local FlavorForge project to GitHub.
7. Authenticate using either:

   * HTTPS + Personal Access Token (PAT), or
   * SSH.
8. Commit the project.
9. Push the project to GitHub.
10. Verify that the repository is correctly connected.
11. Capture safe evidence for the BUILD-JOURNEY.

> **Important:** FlavorForge already has an existing GitHub repository. The commands in the setup sections explain how the connection works for someone starting from zero. Do not recreate or delete the existing FlavorForge repository.

---

# 1. GitHub and Git — What Is the Difference?

Before starting, understand the difference between Git and GitHub.

### Git

Git is a version-control tool installed on the local computer.

It allows us to:

* track file changes
* create commits
* create branches
* compare changes
* restore previous versions
* connect the local project to a remote repository

### GitHub

GitHub is a cloud platform that hosts Git repositories.

It allows us to:

* store the project remotely
* collaborate with others
* view source code
* manage branches
* review changes
* connect to CI/CD systems
* integrate with Azure DevOps

The relationship is:

```text
Local Computer
      |
      | Git
      v
Local Git Repository
      |
      | Push / Pull
      v
GitHub Repository
```

---

# 2. Prerequisites

The following are required:

* GitHub account
* Git
* VS Code
* WSL
* Ubuntu
* Internet connection

The commands in this documentation are written for:

```text
VS Code
+
WSL
+
Ubuntu
```

Open the VS Code terminal using your WSL/Ubuntu environment.

Verify that the terminal is running Linux:

```bash
cat /etc/os-release
```

You should see Ubuntu information.

---

# 3. Check Whether Git Is Installed

Before installing anything, check whether Git already exists.

Run:

```bash
git --version
```

Example:

```text
git version 2.43.0
```

If a Git version is displayed, Git is already installed.

Continue to the next section.

---

# 4. Install Git If It Is Missing

If:

```bash
git --version
```

returns:

```text
git: command not found
```

install Git.

Run:

```bash
sudo apt update
```

Then:

```bash
sudo apt install git -y
```

Verify:

```bash
git --version
```

Expected:

```text
git version <version>
```

---

# 5. Configure Git

Git needs a username and email address for commits.

Check the current configuration:

```bash
git config --global user.name
```

Then:

```bash
git config --global user.email
```

If they are empty, configure them.

Example:

```bash
git config --global user.name "Your Name"
```

```bash
git config --global user.email "your-email@example.com"
```

Use an email address associated with the GitHub account when appropriate.

Verify:

```bash
git config --global --list
```

Important:

The Git username and email configuration are **not** a GitHub password or authentication token.

---

# 6. Create a GitHub Account

If the person does not already have a GitHub account:

1. Open GitHub.
2. Select **Sign up**.
3. Enter an email address.
4. Create a password.
5. Choose a username.
6. Complete GitHub's verification steps.
7. Verify the email address if requested.
8. Sign in.

For this project, the repository name is:

```text
flavorforge-azure-devsecops-capstone
```

If a GitHub account already exists, continue to the next section.

---

# 7. Create the GitHub Repository

After signing into GitHub:

1. Open GitHub.
2. Select **New repository**.
3. Enter:

```text
Repository name:
flavorforge-azure-devsecops-capstone
```

4. Select the required visibility.

For a public reference implementation, the repository can be public.

5. If the project already exists locally, avoid unnecessarily creating:

```text
README.md
.gitignore
LICENSE
```

on GitHub if those files already exist locally.

6. Select **Create repository**.

GitHub will create the remote repository.

### Important for the existing FlavorForge project

The FlavorForge repository already exists.

Do **not** create another repository with the same purpose.

---

# 8. Understand Local Repository vs Remote Repository

There are two locations:

```text
Local Project
~/flavorforge-azure-devsecops-capstone
```

and:

```text
GitHub
flavorforge-azure-devsecops-capstone
```

They are separate until the local repository is connected to GitHub.

The connection is called a **Git remote**.

The conventional remote name is:

```text
origin
```

So:

```text
origin
```

means:

> The remote Git repository that this local repository is connected to.

---

# 9. Enter the Local Project Folder

If the project folder already exists:

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

Verify:

```bash
pwd
```

Expected:

```text
/home/<username>/flavorforge-azure-devsecops-capstone
```

List the files:

```bash
ls
```

For FlavorForge, the project should contain the application and project files already created for the project.

---

# 10. Check Whether the Local Project Is Already a Git Repository

Before running `git init`, check the existing repository.

Run:

```bash
git status
```

If Git recognizes the repository, it is already initialized.

You can also check:

```bash
git rev-parse --is-inside-work-tree
```

Expected:

```text
true
```

### If this is a completely new project

Only then use:

```bash
git init
```

Then:

```bash
git status
```

### Important

If the FlavorForge repository is already initialized, **do not run `git init` again unnecessarily**.

---

# 11. Set the Main Branch

For a new repository, use:

```bash
git branch -M main
```

Verify:

```bash
git branch --show-current
```

Expected:

```text
main
```

For the existing FlavorForge repository, first verify the current branch before changing anything.

---

# 12. Choose a GitHub Authentication Method

GitHub supports multiple authentication methods.

For this documentation we provide two options:

### Option A

HTTPS + Personal Access Token (PAT)

### Option B

SSH

Choose one method.

Do not change an already-working FlavorForge authentication method unless there is a specific reason.

---

# OPTION A — HTTPS + PERSONAL ACCESS TOKEN

# 13. Why Do We Need a PAT?

When Git communicates with GitHub over HTTPS, GitHub needs to authenticate the user.

GitHub does not use the normal account password for Git HTTPS operations.

A **Personal Access Token (PAT)** can be used as the authentication credential.

Conceptually:

```text
Git
 |
 | HTTPS
 v
GitHub
 |
 | PAT authentication
 v
Repository
```

The PAT should be treated like a password.

---

# 14. Create a GitHub Personal Access Token

Sign into GitHub.

Navigate to:

```text
GitHub
→ Profile picture
→ Settings
→ Developer settings
→ Personal access tokens
```

GitHub may provide different token types.

For a classic PAT:

```text
Personal access tokens
→ Tokens (classic)
→ Generate new token
```

GitHub may ask for:

* Note
* Expiration
* Scopes

---

# 15. Give the PAT a Useful Name

Use a descriptive name.

Example:

```text
FlavorForge Git HTTPS
```

The purpose is to identify why the token exists.

---

# 16. Choose PAT Expiration

Select an appropriate expiration period.

A short-lived token is safer than an indefinitely valid token.

If the token expires, create a new token rather than sharing the old one.

---

# 17. Select Only Required Permissions

Do **not** automatically select every permission.

The required permissions depend on the repository and the operation being performed.

For a classic PAT used for repository access, the repository-related permission may be required.

For example:

```text
repo
```

provides repository access.

Do not enable unrelated permissions unless there is a specific requirement.

The principle is:

> Give the token the minimum permissions required for the task.

---

# 18. Generate the PAT

After selecting the required settings:

1. Review the token settings.
2. Generate the token.
3. GitHub will display the token.

The token may only be displayed in full at creation time.

Copy it securely if required.

### IMPORTANT

Never put the PAT into:

```text
README.md
documentation
GitHub repository
Git commit
pipeline YAML
screenshot
video
chat message
public notes
```

Never publish it.

If a token is accidentally exposed:

1. Revoke it immediately.
2. Create a replacement token.
3. Update the required authentication configuration.

---

# 19. Connect the Local Repository Using HTTPS

Only run this if an `origin` remote does not already exist.

Run:

```bash
git remote add origin https://github.com/<GITHUB-USERNAME>/flavorforge-azure-devsecops-capstone.git
```

Example:

```bash
git remote add origin https://github.com/shettymalathib/flavorforge-azure-devsecops-capstone.git
```

Verify:

```bash
git remote -v
```

Expected:

```text
origin  https://github.com/<GITHUB-USERNAME>/flavorforge-azure-devsecops-capstone.git (fetch)
origin  https://github.com/<GITHUB-USERNAME>/flavorforge-azure-devsecops-capstone.git (push)
```

### If `origin` already exists

Do **not** run `git remote add origin` again.

Check it first:

```bash
git remote -v
```

If the URL is correct, leave it unchanged.

---

# 20. Test HTTPS Authentication

After the local repository has been connected:

```bash
git push -u origin main
```

Git may ask for credentials.

Use:

```text
Username:
Your GitHub username
```

For the password prompt:

> Enter the GitHub Personal Access Token instead of the GitHub account password.

The token will normally not be displayed while typing.

If authentication succeeds, the branch will be pushed to GitHub.

---

# OPTION B — SSH

# 21. Why Use SSH?

SSH is another way to authenticate Git with GitHub.

Instead of entering a PAT during Git operations, an SSH key pair is created.

The key pair contains:

```text
Private key
+
Public key
```

The public key is added to GitHub.

The private key remains on the local computer.

Conceptually:

```text
Local Computer
    |
    | Private SSH key
    |
    v
GitHub
    |
    | Matching public key
    v
Repository
```

---

# 22. Check Whether an SSH Key Already Exists

Run:

```bash
ls -al ~/.ssh
```

Look for public key files such as:

```text
id_ed25519.pub
```

or:

```text
id_rsa.pub
```

You can specifically check:

```bash
ls -al ~/.ssh/*.pub
```

If a public key already exists, you may be able to use it.

Do not create unnecessary duplicate keys.

---

# 23. Create an SSH Key If One Does Not Exist

The recommended modern key type is Ed25519.

Run:

```bash
ssh-keygen -t ed25519 -C "your-email@example.com"
```

When asked where to save the key, the default location can normally be accepted.

You may optionally protect the private key with a passphrase.

The resulting files normally include:

```text
~/.ssh/id_ed25519
```

and:

```text
~/.ssh/id_ed25519.pub
```

---

# 24. Understand the Two SSH Files

### Private key

```text
~/.ssh/id_ed25519
```

This MUST remain private.

Never:

* upload it to GitHub
* commit it to Git
* put it in documentation
* publish it
* share it

### Public key

```text
~/.ssh/id_ed25519.pub
```

This is the key that can be added to GitHub.

---

# 25. Display the Public SSH Key

Run:

```bash
cat ~/.ssh/id_ed25519.pub
```

The output will look similar to:

```text
ssh-ed25519 AAAA... your-email@example.com
```

Copy the entire public key.

Never run:

```bash
cat ~/.ssh/id_ed25519
```

That is the private key.

---

# 26. Add the SSH Key to GitHub

In GitHub:

```text
Profile picture
→ Settings
→ SSH and GPG keys
→ New SSH key
```

Enter:

```text
Title:
FlavorForge WSL
```

Paste the contents of:

```text
~/.ssh/id_ed25519.pub
```

into the key field.

Select:

```text
Add SSH key
```

GitHub may ask for authentication.

Complete it.

---

# 27. Test the GitHub SSH Connection

From WSL:

```bash
ssh -T git@github.com
```

The first connection may ask whether GitHub's host key should be trusted.

Verify that the host is GitHub before accepting.

A successful authentication will indicate that GitHub recognizes the SSH key.

---

# 28. Change the Git Remote to SSH

Only do this if you intentionally want to use SSH.

Check the current remote:

```bash
git remote -v
```

Then:

```bash
git remote set-url origin git@github.com:<GITHUB-USERNAME>/flavorforge-azure-devsecops-capstone.git
```

Example:

```bash
git remote set-url origin git@github.com:shettymalathib/flavorforge-azure-devsecops-capstone.git
```

Verify:

```bash
git remote -v
```

Expected:

```text
origin  git@github.com:<GITHUB-USERNAME>/flavorforge-azure-devsecops-capstone.git (fetch)
origin  git@github.com:<GITHUB-USERNAME>/flavorforge-azure-devsecops-capstone.git (push)
```

---

# 29. HTTPS/PAT vs SSH

Both methods can connect Git to GitHub.

| Feature                        | HTTPS + PAT | SSH                 |
| ------------------------------ | ----------- | ------------------- |
| Protocol                       | HTTPS       | SSH                 |
| Authentication                 | PAT         | SSH key             |
| GitHub account password        | No          | No                  |
| Private key required           | No          | Yes                 |
| Public key added to GitHub     | No          | Yes                 |
| Credential handling            | PAT         | SSH key             |
| Initial setup                  | Easier      | Slightly more setup |
| Common for long-term WSL usage | Yes         | Yes                 |

### Recommended principle

Choose one method and use it consistently.

For a beginner, HTTPS + PAT can be easier to understand.

SSH is also a common and convenient option for long-term Git usage from WSL.

---

# 30. Verify the Remote

Regardless of the authentication method:

```bash
git remote -v
```

This answers:

> Which GitHub repository is this local project connected to?

For HTTPS:

```text
https://github.com/<USERNAME>/flavorforge-azure-devsecops-capstone.git
```

For SSH:

```text
git@github.com:<USERNAME>/flavorforge-azure-devsecops-capstone.git
```

For the existing FlavorForge repository, the expected repository is:

```text
flavorforge-azure-devsecops-capstone
```

---

# 31. Check the Git Repository Status

Run:

```bash
git status
```

This shows:

* current branch
* modified files
* untracked files
* staged files
* whether the working tree is clean

---

# 32. Check the Current Branch

Run:

```bash
git branch --show-current
```

Expected:

```text
main
```

---

# 33. Review `.gitignore` Before Adding Files

Before staging files, verify that `.gitignore` exists:

```bash
ls -la .gitignore
```

Review it:

```bash
cat .gitignore
```

The project should normally exclude sensitive or generated files such as:

```text
node_modules/
.env
.env.*
*.pem
*.key
*.p12
*.pfx
credentials.json
secrets/
```

The exact `.gitignore` should match the actual project.

Do not blindly exclude files that the application genuinely needs in source control.

---

# 34. Review Files Before Staging

Check the repository:

```bash
git status
```

Then add the project files:

```bash
git add .
```

Review what is staged:

```bash
git status
```

If anything sensitive is staged, stop and remove it before committing.

---

# 35. Create the Commit

Once the files have been reviewed:

```bash
git commit -m "Initial FlavorForge project"
```

Verify:

```bash
git log --oneline -5
```

### Existing FlavorForge repository

Do not create an unnecessary new "Initial FlavorForge project" commit if the existing repository already contains its commits.

Instead, verify the existing history:

```bash
git log --oneline -5
```

---

# 36. Push the Main Branch

For a new local repository:

```bash
git push -u origin main
```

The `-u` option establishes the upstream relationship between:

```text
local main
```

and:

```text
origin/main
```

After the first successful push, future pushes can normally be:

```bash
git push
```

### Existing FlavorForge repository

If the repository is already connected and synchronized, do not push unnecessarily just for documentation.

Verify the relationship instead:

```bash
git status --short --branch
```

---

# 37. Verify the GitHub Repository

Open the GitHub repository in a browser.

Verify that the expected project files are visible.

Check areas such as:

```text
README.md
frontend/
backend/
docker/
kubernetes/
docs/
azure-pipelines.yml
.github/
.gitignore
```

Do not publish secrets.

---

# 38. Verify the Local/Remote Relationship

Run:

```bash
git status --short --branch
```

A healthy synchronized repository may show:

```text
## main...origin/main
```

If there are local changes, they may also be listed.

For example:

```text
## main...origin/main [behind 1]
```

means the local branch is one commit behind the remote branch.

It does **not** automatically mean something is broken.

Check the differences before deciding whether to pull, merge, or push.

---

# 39. Final GitHub Verification Commands

Run:

### Git version

```bash
git --version
```

### Repository status

```bash
git status --short --branch
```

### Current branch

```bash
git branch --show-current
```

### Remote repository

```bash
git remote -v
```

### Recent commits

```bash
git log --oneline -5
```

### All branches

```bash
git branch -a
```

### Remote branches

```bash
git branch -r
```

---

# 40. Security Verification

Before capturing screenshots or publishing the documentation, check for sensitive information.

Never commit or publish:

```text
PATs
Passwords
Client secrets
Azure credentials
Private SSH keys
Private certificates
Connection strings
Kubernetes Secret values
.env files containing credentials
Service principal secrets
Access tokens
```

If a secret is accidentally committed:

1. Stop using it.
2. Revoke or rotate it.
3. Create a replacement credential.
4. Remove the secret from the repository/history as appropriate.
5. Verify that the new credential is secure.

Simply deleting a secret from the latest file does not necessarily remove it from Git history.

---

# 41. Evidence Capture

For the BUILD-JOURNEY, capture only safe evidence.

### Recommended screenshot

Run:

```bash
git status --short --branch
git branch --show-current
git remote -v
git log --oneline -5
```

You may capture the terminal showing:

```text
main
origin
flavorforge-azure-devsecops-capstone
recent commits
```

### Suggested filename

![](/screenshots/azure/02-resource-group-created.png)

Before saving or publishing the screenshot, verify that it does not contain:

* PAT
* password
* access token
* private key
* Azure secret
* unnecessary personal information

---

# 42. What We Actually Verified for FlavorForge

The existing FlavorForge repository is already connected to GitHub.

The repository is:

```text
flavorforge-azure-devsecops-capstone
```

The GitHub owner is:

```text
shettymalathib
```

The existing remote is:

```text
origin
```

with the repository URL:

```text
https://github.com/shettymalathib/flavorforge-azure-devsecops-capstone.git
```

The expected primary branch is:

```text
main
```

Git is installed and has already been verified.

The existing project should **not** be:

* deleted
* recreated
* reinitialized unnecessarily
* connected to a new GitHub repository

The purpose of this document is to explain the complete setup from zero while also documenting the actual FlavorForge GitHub configuration.

---

# 43. Reviewer Questions

## What is Git?

Git is a distributed version-control system used to track source-code changes.

## What is GitHub?

GitHub is a platform for hosting Git repositories and collaborating around source code.

## What is a Git remote?

A Git remote is a reference to another Git repository, such as the GitHub repository.

## What is `origin`?

`origin` is the conventional name assigned to the remote GitHub repository.

## How do you check the remote?

```bash
git remote -v
```

## How do you check the current branch?

```bash
git branch --show-current
```

## How do you check repository status?

```bash
git status
```

## How do you push code?

```bash
git push
```

## What is a PAT?

A Personal Access Token is a credential that can be used to authenticate Git operations over HTTPS.

## Why not use your GitHub password?

GitHub does not use the normal account password for Git HTTPS authentication.

## What is SSH authentication?

SSH authentication uses a key pair. The public key is registered with GitHub while the private key remains on the local machine.

## Which is better — PAT or SSH?

Both are valid. The choice depends on the workflow. The important requirement is to protect the credential/private key and use the minimum required access.

## Why should secrets not be committed?

Because Git repositories can expose credentials to unauthorized users, and Git history can retain previously committed secrets.

## What does `git remote -v` show?

It shows the remote repository URLs configured for fetching and pushing.

## What does `git push -u origin main` do?

It pushes the local `main` branch to the `origin` remote and establishes the upstream relationship between the local and remote branches.

## How does GitHub connect to the DevOps pipeline?

The GitHub repository acts as the source-code repository. Azure DevOps can connect to the repository and use it as the source for the CI/CD pipeline.

---

# 44. Completion Criteria

The GitHub step is complete when:

* [ ] GitHub account is available
* [ ] Git is installed
* [ ] Git username is configured
* [ ] Git email is configured
* [ ] Local FlavorForge repository exists
* [ ] Main branch is verified
* [ ] GitHub repository exists
* [ ] `origin` remote is configured
* [ ] GitHub authentication works
* [ ] Project files are committed
* [ ] Project is pushed to GitHub
* [ ] GitHub repository is verified
* [ ] `.gitignore` is reviewed
* [ ] No secrets are committed
* [ ] Screenshot captured
* [ ] Screenshot checked for sensitive information
* [ ] Documentation completed

For the **existing FlavorForge project**, items that are already complete should be **verified rather than recreated**.

Only after the GitHub step is verified should the BUILD-JOURNEY continue to the next step.
