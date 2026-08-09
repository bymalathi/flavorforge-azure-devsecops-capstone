# GitHub Repository — Complete Beginner Setup Guide

## Objective

This document explains how to create the **remote GitHub repository** for the FlavorForge Azure DevSecOps project.

A person following this guide from zero should be able to:

1. Sign in to GitHub.
2. Create the FlavorForge repository.
3. Choose the correct repository name.
4. Choose the repository visibility.
5. Understand the README, `.gitignore`, and license options.
6. Avoid creating duplicate files or conflicting Git history.
7. Verify that the GitHub repository was created correctly.

> **Important:** This document only creates the GitHub repository. Authentication and connection of the local FlavorForge project are handled in the following documents.

---

# 1. What Are We Creating?

We are creating a **remote Git repository on GitHub**.

The final setup will look like this:

```text
Developer Computer
       |
       | Git
       v
Local FlavorForge Repository
       |
       | Push / Pull
       v
GitHub Remote Repository
       |
       v
Azure DevOps CI/CD
```

There are two separate repositories:

### Local repository

The FlavorForge project exists on the developer's computer.

Example:

```text
~/flavorforge-azure-devsecops-capstone
```

### Remote repository

The same project will eventually be hosted on GitHub.

Example:

```text
https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone
```

Git is used to connect the local repository to the remote repository.

---

# 2. Prerequisites

Before creating the repository, make sure you have:

* A GitHub account
* Access to the GitHub account
* A web browser
* Internet access

You **do not need to configure Git, PAT, or SSH yet**.

Those steps are handled separately.

---

# 3. Sign In to GitHub

Open the official GitHub website:

[GitHub](https://github.com/)

Sign in using your GitHub account.

After signing in, confirm that you are using the correct GitHub account.

For the existing FlavorForge repository, the GitHub username is:

```text
shettymalathib
```

For someone recreating the project, use their own GitHub username.

---

# 4. Start Creating a New Repository

From GitHub:

1. Select the **+** icon in the upper-right corner.
2. Select **New repository**.

You can also select **New** from the repository section of your GitHub dashboard.

GitHub will open the **Create a new repository** page.

---

# 5. Select the Repository Owner

Find the:

```text
Owner
```

field.

Select the GitHub account that should own the repository.

For example:

```text
YOUR_GITHUB_USERNAME
```

For the existing FlavorForge repository:

```text
shettymalathib
```

Do not select an organization unless the project is intentionally being created under that organization.

---

# 6. Enter the Repository Name

Enter exactly:

```text
flavorforge-azure-devsecops-capstone
```

This is the standard repository name used throughout the FlavorForge documentation.

The resulting GitHub repository address will be:

```text
https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone
```

For the existing repository:

```text
https://github.com/shettymalathib/flavorforge-azure-devsecops-capstone
```

---

# 7. Add a Repository Description

The description is optional, but a useful description helps reviewers quickly understand the project.

Use:

```text
Azure DevSecOps reference implementation using React, Node.js, Docker, ACR, AKS, Kubernetes, Azure DevOps, SonarCloud, Trivy and Argo CD.
```

---

# 8. Choose Repository Visibility

GitHub provides repository visibility options such as:

```text
Public
Private
```

## Public Repository

Anyone can view the repository.

This is useful for:

* portfolio projects
* learning projects
* demonstration projects
* internship projects
* project reviews
* sharing documentation

## Private Repository

Only authorized users can access the repository.

This is appropriate when the project contains:

* proprietary source code
* confidential information
* private configuration
* restricted project information

### For FlavorForge

A **Public** repository can be used if the project has been reviewed and contains no confidential information or credentials.

If you are unsure, keep the repository **Private** until the security review is complete.

---

# 9. Perform a Security Check

Before making a repository public, make sure it does not contain secrets.

Never commit or publish:

```text
Passwords
Personal Access Tokens
SSH private keys
Azure client secrets
Service principal secrets
Kubernetes Secret values
Private certificates
Private keys
Connection strings containing credentials
```

Also check for files such as:

```text
.env
.env.*
*.pem
*.key
credentials.*
secret.*
```

A `.gitignore` file should be used in the local project to help prevent accidental commits.

> **Important:** Creating a `.gitignore` on GitHub does not replace checking the actual local project for secrets.

---

# 10. Add a README — What Should You Choose?

GitHub provides an option:

```text
Add a README file
```

This creates an initial `README.md` commit directly on GitHub.

### For a brand-new project

If there is no local project or local README yet, creating a GitHub README can be useful.

### For the existing FlavorForge project

The local FlavorForge project already contains:

```text
README.md
```

and already has its own Git history.

Therefore:

```text
Add a README file
→ Do NOT select
```

This keeps the GitHub repository empty so the existing local repository can be pushed without creating an unnecessary separate initial commit.

---

# 11. Add `.gitignore` — What Should You Choose?

GitHub also provides:

```text
Add .gitignore
```

This option creates a GitHub-generated `.gitignore`.

### For the existing FlavorForge project

The local project already has its own `.gitignore`.

Therefore:

```text
Add .gitignore
→ Do NOT select
```

The local `.gitignore` should remain the source of truth for the project.

Typical entries may include:

```text
node_modules/
.env
.env.*
*.log
```

The exact contents should match the actual FlavorForge project.

Do not blindly replace the existing `.gitignore` with a GitHub-generated one.

---

# 12. Choose a License

GitHub may also provide:

```text
Choose a license
```

A license defines how other people may use, modify, and distribute the project.

For the existing FlavorForge project, the local repository already contains:

```text
LICENSE
```

Therefore:

```text
Choose a license
→ Do NOT select
```

This avoids creating a duplicate or conflicting license file.

If creating a completely new project, choose a license according to the project's requirements.

---

# 13. Final Repository Settings

For the existing FlavorForge project, use:

```text
Owner:
YOUR_GITHUB_USERNAME

Repository name:
flavorforge-azure-devsecops-capstone

Description:
Azure DevSecOps reference implementation using React, Node.js, Docker, ACR, AKS, Kubernetes, Azure DevOps, SonarCloud, Trivy and Argo CD.

Visibility:
Public or Private according to project requirements

Add README:
Do NOT select

Add .gitignore:
Do NOT select

Choose a license:
Do NOT select
```

The important reason for leaving these options empty is that the local FlavorForge project already contains these files.

---

# 14. Create the Repository

Review the settings.

Then select:

**Create repository**

GitHub will create the remote repository.

---

# 15. What Should the Repository Look Like?

Because we intentionally did not create a README, `.gitignore`, or license on GitHub, the repository may initially be empty.

GitHub may display instructions such as:

```text
…or push an existing repository from the command line
```

This is expected.

The local FlavorForge project will be pushed later.

Do **not** blindly copy all commands displayed by GitHub.

The correct commands depend on the current state of the local repository.

---

# 16. Verify the Repository

On the GitHub repository page, verify:

```text
Repository owner:
YOUR_GITHUB_USERNAME

Repository name:
flavorforge-azure-devsecops-capstone
```

Also verify that the selected visibility is correct.

At this point, the repository may contain no project files.

That is normal.

The final setup will eventually become:

```text
Local FlavorForge Repository
          |
          | Authentication
          v
GitHub Remote Repository
          |
          | git push
          v
FlavorForge Source Code
```

---

# 17. Do Not Connect the Local Repository Yet

At this stage, **do not change the local Git configuration**.

Do not immediately run:

```bash
git remote add origin ...
```

First, the next documents will verify:

1. Whether Git is installed.
2. Whether the local FlavorForge project is already a Git repository.
3. Whether a remote named `origin` already exists.
4. Which authentication method will be used.

This prevents unnecessary configuration changes.

---

# 18. Why Do We Check `origin` Before Adding It?

A local Git repository can already have a remote named:

```text
origin
```

If you run:

```bash
git remote add origin ...
```

when `origin` already exists, Git will return:

```text
error: remote origin already exists.
```

Therefore, always check first:

```bash
git remote -v
```

If the existing remote is correct, no change is required.

If it is incorrect, the remote can be changed deliberately using:

```bash
git remote set-url origin <correct-repository-url>
```

---

# 19. What If the Repository Name Is Wrong?

The standard FlavorForge repository name is:

```text
flavorforge-azure-devsecops-capstone
```

If a different repository name was accidentally created, for example:

```text
flavorforge-devops
```

do not immediately modify the local Git configuration.

First decide whether:

* the repository should be renamed, or
* the incorrect repository should be deleted and recreated.

Avoid creating multiple repositories for the same project unnecessarily.

---

# 20. Common Problems

## Problem 1 — Repository Name Already Exists

GitHub may indicate that a repository with the same name already exists.

Repository names only need to be unique within the selected owner.

Check whether the repository already exists under your account.

If it is the correct repository, use the existing repository instead of creating another one.

---

## Problem 2 — I Accidentally Selected "Add README"

If the local project already contains commits, do not immediately start manually copying or merging files.

First check the local and remote Git histories.

The safest approach depends on whether the remote repository has already received commits.

---

## Problem 3 — I Accidentally Created a Public Repository

Do not panic.

Repository visibility can be changed through GitHub repository settings.

Before sharing the repository publicly:

1. Review the repository files.
2. Search for credentials.
3. Check configuration files.
4. Check Git history if necessary.
5. Confirm that no confidential information is present.

---

## Problem 4 — GitHub Repository Is Empty

This is expected.

The GitHub repository has been created, but the local FlavorForge project has not yet been pushed.

Continue with the next setup documents.

---

# 21. Local Repository vs GitHub Repository

It is important to understand that these are two separate things.

### Local

```text
~/flavorforge-azure-devsecops-capstone
```

### GitHub

```text
flavorforge-azure-devsecops-capstone
```

Git provides the connection between them.

Eventually, the local repository will have a remote named:

```text
origin
```

which points to the GitHub repository.

This can be verified with:

```bash
git remote -v
```

---

# 22. Reviewer Questions

## "How did you create the GitHub repository?"

> "I created a GitHub repository named `flavorforge-azure-devsecops-capstone` under my GitHub account. Since the project already existed as a local Git repository, I created the GitHub repository without an additional README, `.gitignore`, or license and used the local project as the source of truth."

## "Why didn't you create a README on GitHub?"

> "The local FlavorForge project already had its own README and Git history. Creating another README on GitHub would create an unnecessary initial commit and could complicate the first push."

## "What is `origin`?"

> "`origin` is the conventional name for the remote repository. I can verify where it points using `git remote -v`."

## "Did GitHub create your local repository?"

> "No. Git manages the local repository on my computer. GitHub hosts the remote repository. Git connects the two."

## "Why didn't you configure authentication while creating the repository?"

> "Repository creation and Git authentication are separate steps. I first created the remote repository, then configured the authentication method before connecting and pushing the local repository."

---

# 23. Verification Checklist

Before continuing, confirm:

* [ ] GitHub account exists.
* [ ] GitHub account is verified.
* [ ] Correct GitHub account is selected.
* [ ] Repository name is `flavorforge-azure-devsecops-capstone`.
* [ ] Repository was created successfully.
* [ ] Repository visibility was intentionally selected.
* [ ] No credentials were added to the repository.
* [ ] GitHub-generated README was not created unnecessarily.
* [ ] GitHub-generated `.gitignore` was not created unnecessarily.
* [ ] Duplicate license was not created.
* [ ] Local Git configuration has not been changed unnecessarily.

---

# 24. Next Step

The GitHub remote repository has now been created.

Continue with:

```text
03-github-authentication.md
```

That document explains how to authenticate Git with GitHub using **one** of these methods:

```text
Option A
HTTPS + Personal Access Token (PAT)
```

or:

```text
Option B
SSH
```

Only one authentication method is required.
