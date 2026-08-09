# GitHub Account — Complete Beginner Setup Guide

## Objective

This document explains how to create a GitHub account for the FlavorForge Azure DevSecOps project.

A person following this guide should be able to create a GitHub account without needing prior GitHub experience.

The project uses GitHub as the remote source-code repository.

The overall relationship is:

```text
Developer Computer
      |
      | Git
      v
Local FlavorForge Repository
      |
      | Push / Pull
      v
GitHub Repository
      |
      v
Azure DevOps CI/CD
```

---

# 1. What Is GitHub?

GitHub is a cloud platform used to host Git repositories.

For this project, GitHub stores the FlavorForge source code and project configuration.

The repository will eventually contain:

```text
FlavorForge
├── frontend
├── backend
├── docker
├── kubernetes
├── argocd
├── docs
├── scripts
├── azure-pipelines.yml
└── README.md
```

GitHub is different from Git.

### Git

Git is installed on the developer's computer.

It is used to:

* track changes
* create commits
* create branches
* connect to remote repositories
* push code
* pull code

### GitHub

GitHub hosts the remote repository online.

It is used to:

* store the project
* collaborate
* review source code
* manage branches
* integrate with CI/CD
* provide the source repository for Azure DevOps

---

# 2. What Do I Need?

Before creating the account, you need:

* A working internet connection
* A web browser
* An email address
* A GitHub username
* A password

You do **not** need Git installed just to create the GitHub account.

Git will be installed and verified separately in the prerequisites section.

---

# 3. Open GitHub

Open the official GitHub website:

[GitHub](https://github.com/?utm_source=chatgpt.com)

You should see the GitHub home page.

Select:

**Sign up**

---

# 4. Create the Account

GitHub will ask for account information.

Follow the instructions shown by GitHub.

The exact screens may change over time, so follow the current GitHub registration page.

Typically, GitHub will ask for:

* Email address
* Password
* Username
* Email preferences
* Verification/challenge

Use an email address that you can access.

---

# 5. Verify the Email Address

GitHub may send a verification email.

Open your email inbox.

Find the email from GitHub.

Follow the verification instructions.

Return to GitHub after completing verification.

Email verification is important because some GitHub functionality may not work correctly until the account is verified.

---

# 6. Choose a GitHub Username

Choose a username that you are comfortable using publicly.

For this project, the GitHub username used in the existing FlavorForge repository is:

```text
shettymalathib
```

For someone recreating the project, they may use their own GitHub username.

Do **not** hard-code the username into project documentation unless it is necessary.

Use placeholders such as:

```text
YOUR_GITHUB_USERNAME
```

when writing reusable commands.

---

# 7. Sign In

After creating and verifying the account:

1. Open GitHub.
2. Sign in.
3. Confirm that your GitHub profile opens successfully.

You should be able to access your GitHub dashboard/profile.

---

# 8. Important Security Rule

Never put the following information into project documentation:

```text
Passwords
Personal Access Tokens
SSH private keys
Client secrets
Azure credentials
Kubernetes secret values
Connection strings containing credentials
```

A GitHub Personal Access Token (PAT) is a credential.

If you create one later, **never paste the token into GitHub documentation, screenshots, videos, Git commits, README files, or chat messages.**

The token should be treated like a password.

---

# 9. GitHub Authentication Options

Later, when connecting the local FlavorForge repository to GitHub, there are two supported approaches in this documentation:

### Option A — HTTPS + Personal Access Token

```text
Local Git
    |
    | HTTPS
    | PAT authentication
    v
GitHub
```

### Option B — SSH

```text
Local Git
    |
    | SSH
    | SSH key authentication
    v
GitHub
```

The user only needs to configure **one** authentication method.

The authentication procedure is documented separately in:

```text
03-github-authentication.md
```

Do not create a PAT or SSH key as part of this account-creation step.

---

# 10. What Happens Next?

After the GitHub account is ready, the next step is to create the remote GitHub repository.

The repository will contain the FlavorForge project.

The next document is:

```text
02-create-repository.md
```

The expected flow is:

```text
GitHub Account
      |
      v
Create Repository
      |
      v
Configure Git
      |
      v
Configure Authentication
      |
      v
Connect Local Repository
      |
      v
Push Project
      |
      v
Verify GitHub Repository
```

---

# 11. Verification Checklist

Before continuing, confirm:

* [ ] GitHub account created
* [ ] Email verified
* [ ] GitHub sign-in works
* [ ] GitHub username selected
* [ ] No password or credential was added to project files
* [ ] Authentication method has not yet been configured

---

# 12. Common Problems

## Problem: Verification email did not arrive

Check:

* Spam/Junk folder
* Email address entered during registration
* GitHub account notification area

Follow the current GitHub instructions for resending the verification email.

---

## Problem: Username is already taken

Choose another username.

The username does not need to be the same as the original FlavorForge project owner's username.

---

## Problem: I forgot my GitHub password

Use GitHub's password/account recovery process.

Do not create a password file inside the project.

---

# 13. Reference Documentation

Official GitHub documentation should be preferred because GitHub's screens and security options can change.

[GitHub Docs](https://docs.github.com/?utm_source=chatgpt.com)

For account creation and getting started, use the current GitHub documentation available from the official documentation site.

---

# 14. Reviewer Explanation

If a reviewer asks:

### "Why are you using GitHub?"

Answer:

> "GitHub is the remote source-code repository for the project. It stores the application code, infrastructure configuration, Kubernetes manifests, pipeline configuration and documentation. Azure DevOps consumes the repository as the source for the CI/CD process."

### "Is Git the same as GitHub?"

Answer:

> "No. Git is the version-control tool running on my local machine. GitHub is the remote platform that hosts the Git repository."

### "How does your local project connect to GitHub?"

Answer:

> "The local project is a Git repository with GitHub configured as its remote repository. Git communicates with GitHub using either HTTPS authentication with a Personal Access Token or SSH authentication."

---

# 15. Next Step

After the GitHub account is successfully created and verified, continue with:

```text
02-create-repository.md
```

That document explains how to create the FlavorForge GitHub repository from the beginning.
