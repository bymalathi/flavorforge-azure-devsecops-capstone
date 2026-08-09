# GitHub Repository — Complete Beginner Setup Guide

## Objective

This document explains how to create the remote GitHub repository for the FlavorForge project.

A person following this guide should be able to:

1. Sign in to GitHub.
2. Create a new repository.
3. Choose the correct repository name.
4. Decide whether the repository is public or private.
5. Understand the README, `.gitignore`, and license options.
6. Avoid accidentally creating a repository that conflicts with the local project.
7. Verify that the repository was created successfully.

The next steps will connect the local FlavorForge Git repository to this GitHub repository.

---

# 1. What Are We Creating?

We are creating a **remote Git repository** on GitHub.

The relationship will eventually be:

```text
VS Code + WSL
       |
       | Local Git Repository
       |
       | git push
       v
GitHub Remote Repository
       |
       v
FlavorForge
```

The local project and GitHub repository are two different locations.

### Local repository

The project exists on the developer's computer.

Example:

```text
~/flavorforge-azure-devsecops-capstone
```

### Remote repository

The project is stored on GitHub.

Example:

```text
https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone
```

Git connects the two.

---

# 2. Before Creating the Repository

Make sure you have:

* A GitHub account
* Access to the GitHub account
* A web browser
* Internet access

You do not need to configure PAT or SSH yet.

Authentication is covered separately in:

```text
03-github-authentication.md
```

---

# 3. Sign In to GitHub

Open:

[GitHub](https://github.com/?utm_source=chatgpt.com)

Sign in using your GitHub account.

After signing in, open your GitHub profile/dashboard.

---

# 4. Start Creating a Repository

From GitHub:

1. Select the **+** icon in the upper-right corner.
2. Select **New repository**.

Alternatively, from your GitHub dashboard, select:

**New**

under the repository section.

You should now see the **Create a new repository** page.

---

# 5. Repository Owner

Find:

```text
Owner
```

Select your GitHub account.

For example:

```text
YOUR_GITHUB_USERNAME
```

Do not select another organization unless the project is intentionally being created inside that organization.

---

# 6. Repository Name

Enter:

```text
flavorforge-azure-devsecops-capstone
```

The repository name should match the project name used throughout this documentation.

The resulting GitHub address will look like:

```text
https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone
```

For the existing FlavorForge repository, the GitHub owner is:

```text
shettymalathib
```

and the repository is:

```text
flavorforge-azure-devsecops-capstone
```

For another person recreating the project, replace the username with their own GitHub username.

---

# 7. Repository Description

The description is optional.

A suitable description is:

```text
Azure DevSecOps reference implementation using React, Node.js, Docker, ACR, AKS, Kubernetes, Azure DevOps, SonarCloud, Trivy and Argo CD.
```

The description helps someone understand the purpose of the repository without opening the code.

---

# 8. Public or Private Repository?

GitHub provides visibility options such as:

```text
Public
Private
```

### Public

Anyone can view the repository.

This is useful for:

* portfolio projects
* learning projects
* demonstration projects
* CBC/project reviews
* sharing documentation

### Private

Only authorized users can access the repository.

This is useful when the project contains:

* proprietary code
* confidential information
* private business configuration
* restricted project information

For this reference implementation, **Public can be used if the project contains no confidential information or credentials**.

If you are unsure, use **Private** until the project has been reviewed for sensitive information.

---

# 9. Important Security Check Before Making It Public

Before selecting **Public**, make sure the repository does NOT contain:

```text
Passwords
Personal Access Tokens
SSH private keys
Azure client secrets
Service principal secrets
Kubernetes Secret values
Connection strings containing credentials
Private certificates
Private keys
```

Also check that credentials have not accidentally been committed into:

```text
.env
.env.*
*.pem
*.key
credentials.*
secret.*
```

or similar files.

A `.gitignore` file should be used to prevent accidental commits of local secrets.

---

# 10. Initialize This Repository With a README

GitHub may provide:

```text
Add a README file
```

For a **brand-new local project that does not already have a README**, this option can be useful.

However, for this FlavorForge recreation, the local project already contains its own:

```text
README.md
```

Therefore, when connecting an existing local Git repository, avoid unnecessarily creating a second independent initial commit on GitHub.

For an existing local repository, the recommended approach is:

```text
Add a README file
    → Do not select
```

The local project's existing README will be pushed later.

---

# 11. Add .gitignore

GitHub may provide:

```text
Add .gitignore
```

If the local project already has a `.gitignore`, do not create another GitHub-generated `.gitignore` that conflicts with it.

For the existing FlavorForge project, the local repository should remain the source of truth for its project files.

A proper `.gitignore` should prevent files such as local dependencies and credentials from being committed.

Common examples include:

```text
node_modules/
.env
.env.*
*.log
```

The exact `.gitignore` required by FlavorForge should be verified from the local repository rather than blindly replacing it.

---

# 12. Add a License

GitHub may provide:

```text
Choose a license
```

A license determines how other people may use, modify, and distribute the project.

If a license has already been created in the local project, do not create a second conflicting license file from GitHub.

The existing FlavorForge repository contains:

```text
LICENSE
```

Therefore, for the existing project, leave the GitHub license selection empty and use the local project's license.

---

# 13. Final Repository Settings

For an existing local FlavorForge repository, the recommended initial GitHub settings are:

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
Do not select

Add .gitignore:
Do not select if the local repository already has one

Choose a license:
Do not select if the local repository already contains LICENSE
```

---

# 14. Create the Repository

After checking the settings:

Select:

**Create repository**

GitHub will create the empty remote repository.

You should now see the repository page.

---

# 15. What Does "Empty Repository" Mean?

An empty GitHub repository means GitHub has created the remote location, but the local FlavorForge files have not necessarily been uploaded yet.

You may see instructions similar to:

```text
…or push an existing repository from the command line
```

This is expected.

Do not blindly copy every command shown by GitHub.

The exact commands depend on whether the local project is already a Git repository.

Our next documents handle that carefully.

---

# 16. Verify the Repository

On the GitHub repository page, verify:

```text
Repository name:
flavorforge-azure-devsecops-capstone
```

Also verify that the repository belongs to the expected GitHub account.

At this stage, the repository may contain no project files yet.

That is okay.

The next steps will:

```text
Local Git Repository
        |
        | Authentication
        v
GitHub Repository
        |
        | git push
        v
FlavorForge Source Code
```

---

# 17. Important: Do Not Run `git remote add` Yet

If the local FlavorForge repository already has a remote named:

```text
origin
```

do NOT immediately run:

```bash
git remote add origin ...
```

That would produce an error such as:

```text
error: remote origin already exists.
```

First check:

```bash
git remote -v
```

If you see:

```text
origin  https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git (fetch)
origin  https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git (push)
```

then the remote is already configured.

This is why verification comes before changing the configuration.

---

# 18. If the Repository Name Is Different

If someone accidentally creates:

```text
flavorforge-devops
```

instead of:

```text
flavorforge-azure-devsecops-capstone
```

do not immediately change the local Git configuration.

First decide whether the repository should be renamed or recreated.

The documentation uses:

```text
flavorforge-azure-devsecops-capstone
```

as the standard repository name.

---

# 19. Common Problems

## Problem 1 — Repository name already exists

GitHub may say the repository name is already in use.

Repository names only need to be unique under the selected GitHub owner.

Check whether the repository already exists under your account.

If it is your repository, use the existing repository instead of creating another one.

---

## Problem 2 — I selected "Add README" by mistake

If the local project already contains commits, do not immediately start merging files manually.

Stop and verify the local and remote Git histories before pushing.

The next Git documentation explains how to handle this safely.

---

## Problem 3 — I accidentally created a public repository

Do not panic.

GitHub repository visibility can be changed from repository settings if required.

Before sharing the repository publicly, perform a security review and ensure no credentials or sensitive information are present.

---

## Problem 4 — GitHub shows an empty repository

That is normal at this stage.

The local project has not necessarily been pushed yet.

Continue to:

```text
03-github-authentication.md
```

and then:

```text
04-connect-local-git-to-github.md
```

---

# 20. GitHub Repository vs Local Repository

Remember:

```text
Local Repository
~/flavorforge-azure-devsecops-capstone
```

is not the same thing as:

```text
GitHub Repository
flavorforge-azure-devsecops-capstone
```

The connection is created using Git.

Eventually:

```text
git remote -v
```

will show the GitHub repository as the remote called:

```text
origin
```

---

# 21. Reviewer Explanation

### "How did you create the GitHub repository?"

Answer:

> "I created a GitHub repository named `flavorforge-azure-devsecops-capstone` under my GitHub account. Because the project already exists as a local Git repository, I kept the GitHub repository empty initially and connected the existing local repository to it."

### "Why didn't you create a README on GitHub?"

Answer:

> "The local project already had its own README and Git history. Creating another initial README commit on GitHub would create an unnecessary separate history. I used the local project as the source of truth and pushed it to GitHub."

### "What is origin?"

Answer:

> "`origin` is the conventional name Git gives to the remote GitHub repository. I can verify it using `git remote -v`."

### "Did GitHub create the local repository?"

Answer:

> "No. The local repository is managed by Git on my computer. GitHub hosts the remote repository. Git connects the two."

---

# 22. Verification Checklist

Before continuing:

* [ ] GitHub account exists
* [ ] GitHub account is verified
* [ ] Correct GitHub account is selected
* [ ] Repository name is `flavorforge-azure-devsecops-capstone`
* [ ] Repository was created successfully
* [ ] Repository visibility was intentionally selected
* [ ] No credentials were added
* [ ] No unnecessary GitHub-generated README was created
* [ ] No unnecessary GitHub-generated `.gitignore` was created
* [ ] No duplicate license was created
* [ ] Local Git repository has not been modified unnecessarily

---

# 23. Next Step

Continue with:

```text
03-github-authentication.md
```

That document explains the two supported authentication methods:

```text
Option A
HTTPS + Personal Access Token (PAT)

OR

Option B
SSH
```

Only one method is required.
