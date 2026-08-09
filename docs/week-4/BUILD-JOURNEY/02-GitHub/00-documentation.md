# GitHub — Complete Setup and Connection Guide

## Objective

This document explains how to create and connect the FlavorForge project to GitHub from the beginning.

A person following this guide should be able to:

1. Create a GitHub account if required.
2. Create a GitHub repository.
3. Install and verify Git.
4. Configure Git locally.
5. Connect the local FlavorForge project to GitHub.
6. Authenticate using either:

   * HTTPS + Personal Access Token (PAT), or
   * SSH.
7. Push the project to GitHub.
8. Verify that the repository is correctly connected.

The guide provides **two authentication options** because different users may prefer different approaches.

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
* connect the repository to CI/CD systems
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
* WSL Ubuntu
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

If the command:

```bash
git --version
```

returns something similar to:

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

and:

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

Use the email address associated with the GitHub account when appropriate.

Verify:

```bash
git config --global --list
```

Important:

The Git username/email configuration is **not** a GitHub password or authentication token.

---

# 6. Create a GitHub Account

If the person does not already have a GitHub account:

1. Open GitHub.
2. Select **Sign up**.
3. Enter an email address.
4. Create a password.
5. Choose a username.
6. Complete GitHub's verification steps.
7. Verify the email address if GitHub requests it.
8. Sign in.

For this project, the repository will be:

```text
flavorforge-azure-devsecops-capstone
```

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

5. Do not add unnecessary files if the project already exists locally.

If the project already has a local:

```text
README.md
.gitignore
```

do not create another README unnecessarily.

6. Select **Create repository**.

GitHub will create an empty remote repository.

---

# 8. Understand Local Repository vs Remote Repository

At this point there are two locations:

```text
Local Project
~/flavorforge-azure-devsecops-capstone
```

and:

```text
GitHub
flavorforge-azure-devsecops-capstone
```

They are separate until we connect them.

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

# 9. Create or Enter the Local Project Folder

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

---

# 10. Initialize Git If This Is a New Local Project

If the project is not already a Git repository, run:

```bash
git init
```

Git will create a hidden `.git` directory.

Verify:

```bash
git status
```

If the repository is already initialized, **do not run `git init` again unnecessarily**.

---

# 11. Set the Main Branch

Use:

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

---

# 12. GitHub Authentication Options

GitHub supports multiple ways of authenticating Git operations.

For this documentation we provide two options:

## Option A

HTTPS + Personal Access Token (PAT)

## Option B

SSH

The person following this guide can choose either.

Do not configure both unless there is a specific reason.

---

# OPTION A — HTTPS + PERSONAL ACCESS TOKEN

# 13. Why Do We Need a PAT?

When Git communicates with GitHub over HTTPS, GitHub needs to authenticate the user.

GitHub no longer uses a normal account password for Git operations over HTTPS.

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

If using the classic token flow:

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

The required permissions depend on what the token is being used for and whether the repository is public/private.

For a classic PAT being used to work with repositories, the repository-related permission is the important one.

For example:

```text
repo
```

provides repository access.

Do not enable unrelated permissions such as:

```text
admin:org
delete_repo
admin:enterprise
codespace
billing
user
audit_log
```

unless there is a specific requirement.

The principle is:

> Give the token the minimum permissions required for the task.

---

# 18. Generate the PAT

After selecting the required settings:

1. Review the token settings.
2. Generate the token.
3. GitHub will display the token.

The token may only be displayed in full at creation time.

Copy it securely if you need it.

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

If a token is accidentally exposed, revoke it immediately and create a new one.

---

# 19. Connect the Local Repository Using HTTPS

From the WSL terminal, use:

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

---

# 20. Test HTTPS Authentication

When pushing:

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

The private key stays on the local computer.

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

To specifically check for public keys:

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

The files have different purposes.

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

Never copy or display:

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

If the repository currently uses HTTPS:

```bash
git remote -v
```

Change it:

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

Both methods can be used to connect Git to GitHub.

| Feature                         | HTTPS + PAT                          | SSH                 |
| ------------------------------- | ------------------------------------ | ------------------- |
| Protocol                        | HTTPS                                | SSH                 |
| Authentication                  | PAT                                  | SSH key             |
| GitHub password used            | No                                   | No                  |
| Credential required during push | PAT may be requested/cached          | Usually no          |
| Private key required            | No                                   | Yes                 |
| Public key added to GitHub      | No                                   | Yes                 |
| Good for automation             | Yes, with secure credential handling | Yes                 |
| Setup complexity                | Easier initially                     | Slightly more setup |
| Security requirement            | Protect PAT                          | Protect private key |

### Recommended principle

Choose one method and use it consistently.

For a beginner, HTTPS + PAT can be easier to understand.

For long-term Git usage from WSL, SSH is also a very common approach.

---

# 30. Check the Remote

Regardless of which authentication method was selected:

```bash
git remote -v
```

This command answers:

> Which GitHub repository is this local project connected to?

For HTTPS:

```text
https://github.com/<USERNAME>/flavorforge-azure-devsecops-capstone.git
```

For SSH:

```text
git@github.com:<USERNAME>/flavorforge-azure-devsecops-capstone.git
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

# 33. Add Project Files

Before adding files, make sure `.gitignore` exists.

Then:

```bash
git add .
```

Check what will be committed:

```bash
git status
```

Do not commit files containing secrets.

---

# 34. Important `.gitignore` Entries

The project should normally exclude files such as:

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

# 35. Create the First Commit

Once the files have been reviewed:

```bash
git commit -m "Initial FlavorForge project"
```

Verify:

```bash
git log --oneline -5
```

---

# 36. Push the Main Branch

If `origin` is configured:

```bash
git push -u origin main
```

The `-u` option establishes the upstream relationship between the local `main` branch and the remote `origin/main` branch.

After the first push, future pushes can normally be:

```bash
git push
```

---

# 37. Verify the GitHub Repository

Open the GitHub repository in a browser.

Verify that the project files are visible.

Check:

* README
* frontend
* backend
* Docker files
* Kubernetes files
* documentation
* pipeline files
* Argo CD configuration
* `.gitignore`

Do not publish secrets.

---

# 38. Verify the Local/Remote Relationship

Run:

```bash
git status --short --branch
```

A healthy relationship may show:

```text
## main...origin/main
```

If there are local changes, they may also be listed.

For example:

```text
## main...origin/main [behind 1]
```

means the local branch is one commit behind the remote branch.

It does NOT automatically mean something is broken.

Check the differences before deciding whether to pull, merge, or push.

---

# 39. Useful Git Verification Commands

### Git version

```bash
git --version
```

### Repository status

```bash
git status
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

# 40. Common Problems

## Problem 1 — `git: command not found`

Install Git:

```bash
sudo apt update
sudo apt install git -y
```

Then:

```bash
git --version
```

---

## Problem 2 — `remote origin already exists`

Check:

```bash
git remote -v
```

If the existing remote is correct, do nothing.

If it is incorrect:

```bash
git remote set-url origin <correct-repository-url>
```

Then verify:

```bash
git remote -v
```

---

## Problem 3 — GitHub authentication failed with HTTPS

Check:

* GitHub username
* PAT
* PAT expiration
* PAT permissions
* repository access

Do not use the normal GitHub account password as the Git HTTPS password.

---

## Problem 4 — SSH authentication failed

Check:

```bash
ls -al ~/.ssh
```

Then:

```bash
ssh -T git@github.com
```

Verify that the public key added to GitHub matches the local public key.

---

## Problem 5 — Permission denied when pushing

Check:

```bash
git remote -v
```

Make sure the repository belongs to the correct GitHub account or that the account has permission to push.

For SSH, verify:

```bash
ssh -T git@github.com
```

For HTTPS, verify the PAT.

---

## Problem 6 — `main` is behind `origin/main`

Check the status:

```bash
git status
```

Then inspect the remote commits:

```bash
git log --oneline HEAD..origin/main
```

Do not automatically reset or delete anything.

If the remote changes need to be brought into the local branch, handle the pull/merge deliberately.

---

# 41. Security Rules

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
2. Revoke/rotate it.
3. Create a replacement credential.
4. Remove the secret from the repository/history as appropriate.
5. Verify that the new credential is secure.

Simply deleting a secret from the latest file does not necessarily remove it from Git history.

---

# 42. What We Actually Verified for FlavorForge

The existing FlavorForge repository has already been connected to GitHub.

The current remote is:

```text
origin
https://github.com/shettymalathib/flavorforge-azure-devsecops-capstone.git
```

The current branch is:

```text
main
```

Git is installed and verified.

The repository can be checked with:

```bash
git status --short --branch
```

The existing project should not be deleted or recreated merely to repeat these verification steps.

This document exists so that a **new person starting from zero** understands how the GitHub setup works.

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

Both are valid. The choice depends on the user's workflow. The important requirement is to protect the credential/private key and use the minimum required access.

## Why should secrets not be committed?

Because Git repositories can expose credentials to unauthorized users and Git history can retain previously committed secrets.

## How does GitHub connect to the DevOps pipeline?

The GitHub repository acts as the source-code repository. Azure DevOps can connect to it and use the repository as the source for the CI/CD pipeline.
