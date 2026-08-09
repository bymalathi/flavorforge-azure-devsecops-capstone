# GitHub Account — Complete Beginner Setup Guide

## Objective

This document explains how to create and verify a GitHub account for the FlavorForge Azure DevSecOps project.

A person following this guide should be able to:

1. Understand what GitHub is.
2. Create a GitHub account.
3. Verify the GitHub email address.
4. Choose a GitHub username.
5. Sign in successfully.
6. Understand the security requirements before continuing.

> **Scope:** This document covers **GitHub account creation only**.
> Repository creation, Git configuration, authentication, and project connection are covered in later documents.

---

# 1. What Is GitHub?

GitHub is a cloud platform used to host Git repositories.

For the FlavorForge project, GitHub will eventually store the project's source code, configuration, infrastructure files, and documentation.

The overall project flow is:

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

# 2. Git vs GitHub

Before continuing, understand the difference between Git and GitHub.

## Git

Git is a version-control tool installed on the developer's computer.

Git is used to:

* track file changes
* create commits
* create branches
* compare changes
* restore previous versions
* push code
* pull code
* connect to remote repositories

## GitHub

GitHub is the online platform that hosts Git repositories.

GitHub is used to:

* store source code remotely
* collaborate with other developers
* review source code
* manage branches
* integrate with CI/CD systems
* provide the source repository for Azure DevOps

The relationship is:

```text
Git
  |
  | manages
  v
Local Git Repository
  |
  | communicates with
  v
GitHub Repository
```

---

# 3. What Is Required?

To create a GitHub account, you need:

* Internet connection
* Web browser
* Working email address
* GitHub username
* Password

You do **not** need Git installed to create the GitHub account.

Git will be installed and verified separately during the development-environment setup.

---

# 4. Open GitHub

Open the official GitHub website:

[GitHub](https://github.com/?utm_source=chatgpt.com)

The GitHub home page should open.

Select:

**Sign up**

---

# 5. Create the GitHub Account

Follow the registration process shown by GitHub.

The exact screens may change over time, so follow the instructions displayed on the current GitHub registration page.

GitHub may ask for:

* Email address
* Password
* Username
* Email preferences
* Verification or security challenge

Use an email address that you can access.

Complete the registration process.

---

# 6. Verify the Email Address

GitHub may send a verification email to the email address used during registration.

Open your email inbox.

Look for the email from GitHub.

Follow the verification instructions.

After completing verification, return to GitHub.

Email verification is important because some GitHub functionality may require a verified email address.

---

# 7. Choose a GitHub Username

Choose a username that you are comfortable using publicly.

For the existing FlavorForge repository, the GitHub username is:

```text
shettymalathib
```

If recreating the project using another GitHub account, use your own username.

For reusable documentation and commands, use:

```text
YOUR_GITHUB_USERNAME
```

instead of hard-coding a specific username.

For example:

```text
https://github.com/YOUR_GITHUB_USERNAME/
```

---

# 8. Sign In to GitHub

After creating and verifying the account:

1. Open GitHub.
2. Select **Sign in** if necessary.
3. Enter your GitHub credentials.
4. Confirm that the GitHub account opens successfully.

You should be able to access your GitHub profile and account settings.

---

# 9. Verify the GitHub Account

Confirm that:

* You can sign in successfully.
* Your GitHub profile opens.
* Your username is correct.
* Your email address has been verified.

At this point, the GitHub account is ready for the next stage.

---

# 10. Security Rules

Protect your GitHub account credentials.

Never put the following into project documentation or source code:

```text
GitHub password
Personal Access Token (PAT)
SSH private key
Client secret
Azure credentials
Kubernetes secret values
Connection strings containing credentials
Access tokens
```

A Personal Access Token is a credential and must be protected like a password.

An SSH private key is also sensitive and must remain on the local machine.

Do not create or configure either credential as part of this account-creation step.

---

# 11. GitHub Authentication Comes Later

The local FlavorForge repository will later need an authentication method to communicate with GitHub.

Two methods will be documented:

## Option A — HTTPS + Personal Access Token

```text
Local Git
    |
    | HTTPS
    | PAT authentication
    v
GitHub
```

## Option B — SSH

```text
Local Git
    |
    | SSH
    | SSH key authentication
    v
GitHub
```

Only one method needs to be configured.

The authentication setup will be covered in a later BUILD-JOURNEY document.

> **Do not create a PAT or SSH key during this step.**

---

# 12. What Happens Next?

The GitHub account is now ready.

The next step is to create the remote GitHub repository for FlavorForge.

The BUILD-JOURNEY flow is:

```text
01. Create GitHub Account
          |
          v
02. Create GitHub Repository
          |
          v
03. Configure Git Locally
          |
          v
04. Configure GitHub Authentication
          |
          v
05. Connect Local Repository
          |
          v
06. Commit and Push Project
          |
          v
07. Verify GitHub Repository
```

The next document is:

```text
02-create-repository.md
```

---

# 13. Verification Checklist

Before continuing, confirm:

* [ ] GitHub account created
* [ ] Email address verified
* [ ] GitHub sign-in works
* [ ] GitHub username selected
* [ ] GitHub profile opens successfully
* [ ] No password or credential was added to project files
* [ ] PAT has not been created
* [ ] SSH key has not been created

Once all items are complete, continue to:

```text
02-create-repository.md
```

---

# 14. Common Problems

## Problem 1 — Verification Email Did Not Arrive

Check:

* Spam/Junk folder
* Email address entered during registration
* GitHub notifications

If necessary, use GitHub's current instructions to resend the verification email.

---

## Problem 2 — Username Is Already Taken

Choose another available username.

The username does not need to be the same as the original FlavorForge project owner's username.

---

## Problem 3 — Cannot Sign In

Verify:

* GitHub username or email
* Password
* Account verification status

If the password has been forgotten, use GitHub's account recovery process.

Do not store the password in the project directory.

---

# 15. Official Documentation

GitHub's interface and account-security options can change over time.

Use the official GitHub documentation when the current interface differs from this guide:

[GitHub Documentation](https://docs.github.com/?utm_source=chatgpt.com)

---

# 16. Reviewer Questions

## Why are you using GitHub?

> "GitHub is the remote source-code repository for the project. It stores the application code, infrastructure configuration, Kubernetes manifests, pipeline configuration, and documentation. Azure DevOps can use the GitHub repository as the source for the CI/CD process."

## Is Git the same as GitHub?

> "No. Git is the version-control tool running on my local machine. GitHub is the remote platform that hosts the Git repository."

## Do you need Git installed to create a GitHub account?

> "No. A GitHub account can be created through the web browser. Git is required later when connecting the local project to the GitHub repository."

## Have you configured GitHub authentication yet?

> "Not at this stage. This step only creates and verifies the GitHub account. Repository creation and authentication are handled in the following steps."

---

# 17. Completion Criteria

Step 1 is complete when:

```text
GitHub Account
      |
      ├── Account created
      ├── Email verified
      ├── Username selected
      └── Sign-in verified
```

No repository or authentication configuration is required in this document.

Continue with:

```text
02-create-repository.md
```
