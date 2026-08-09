# GitHub Repository — Complete Verification Guide

## Objective

This document explains how to verify that the local FlavorForge Git repository is correctly connected to the GitHub repository and that the project has been pushed successfully.

A person following this guide should be able to verify:

1. Git is installed.
2. The local project is a Git repository.
3. The correct branch is being used.
4. The GitHub remote is configured.
5. GitHub authentication works.
6. The local branch is connected to the correct remote branch.
7. The project files are present on GitHub.
8. The latest commit is available on GitHub.
9. Local and remote repository status can be compared.

---

# 1. Understand What We Are Verifying

The expected setup is:

```text
Developer Computer
        |
        | WSL + Ubuntu
        |
        v
FlavorForge Local Git Repository
        |
        | origin
        |
        v
GitHub Remote Repository
        |
        v
flavorforge-azure-devsecops-capstone
```

The goal is to confirm that the connection between the local repository and GitHub is working correctly.

---

# 2. Open the FlavorForge Project

Open the WSL terminal.

Go to the project directory:

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

Verify the current directory:

```bash
pwd
```

Expected:

```text
/home/YOUR_USERNAME/flavorforge-azure-devsecops-capstone
```

The username and path may be different on another computer.

---

# 3. Verify Git Is Installed

Run:

```bash
git --version
```

Example:

```text
git version 2.43.0
```

If a Git version is displayed, Git is installed correctly.

If Git is not installed, follow:

```text
docs/week-4/BUILD-JOURNEY/01-prerequisites/02-tool-installation.md
```

---

# 4. Verify This Is a Git Repository

Run:

```bash
git status
```

A Git repository should return information about the current branch and working tree.

Example:

```text
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

The exact message depends on the current state of the project.

---

# 5. Verify the Current Branch

Run:

```bash
git branch --show-current
```

Expected:

```text
main
```

The FlavorForge repository uses:

```text
main
```

as the primary branch.

If another branch is displayed, do not change it automatically.

First understand why the repository is currently on that branch.

---

# 6. Verify the GitHub Remote

Run:

```bash
git remote -v
```

For HTTPS authentication, the output should look similar to:

```text
origin  https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git (fetch)
origin  https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git (push)
```

For SSH authentication, it may look like:

```text
origin  git@github.com:YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git (fetch)
origin  git@github.com:YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git (push)
```

The important points are:

```text
Remote name:
origin

Repository:
flavorforge-azure-devsecops-capstone
```

---

# 7. What Is `origin`?

`origin` is the conventional name assigned to the remote GitHub repository.

For example:

```text
origin
   |
   v
https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git
```

It allows commands such as:

```bash
git push origin main
```

and:

```bash
git pull origin main
```

to communicate with the GitHub repository.

---

# 8. Verify the Remote URL Directly

You can check only the URL by running:

```bash
git remote get-url origin
```

HTTPS example:

```text
https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git
```

SSH example:

```text
git@github.com:YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git
```

Make sure the repository name is:

```text
flavorforge-azure-devsecops-capstone
```

---

# 9. Verify the Remote Branch

Run:

```bash
git branch -vv
```

Example:

```text
* main c85aee2 [origin/main] documenting step by step implementation
```

This indicates that the local `main` branch is associated with:

```text
origin/main
```

---

# 10. Verify the GitHub Repository in the Browser

Open your GitHub repository.

The repository should be:

```text
flavorforge-azure-devsecops-capstone
```

The repository URL will look similar to:

```text
https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone
```

Verify that the expected project files are visible.

Examples:

```text
frontend/
backend/
docker/
kubernetes/
docs/
scripts/
.github/
README.md
azure-pipelines.yml
```

The exact contents may change as the project evolves.

---

# 11. Verify the README

Open:

```text
README.md
```

from the GitHub repository.

Confirm that the expected FlavorForge project README is present.

This confirms that the local project's documentation was pushed to GitHub.

---

# 12. Verify the Commit History

From WSL, run:

```bash
git log --oneline -5
```

Example:

```text
c85aee2 documenting step by step implementation
10e784e docs: update generated documentation
cb6690f documenting step by step implementation
c640066 docs: update generated documentation
557c0a5 changes in root readme
```

The exact commits will depend on the current project history.

Open the **Commits** section of the GitHub repository.

The recent commits should be visible there as well.

---

# 13. Verify the Latest Commit

You can display the latest commit using:

```bash
git log -1 --oneline
```

Example:

```text
c85aee2 documenting step by step implementation
```

Compare the latest local commit with the latest commit displayed on GitHub.

They should correspond when the local branch has been pushed.

---

# 14. Verify Local and Remote Branch Information

Run:

```bash
git status --short --branch
```

A clean repository might show:

```text
## main...origin/main
```

or:

```text
## main...origin/main [ahead 1]
```

or:

```text
## main...origin/main [behind 1]
```

These messages are important.

### `main...origin/main`

The local branch is tracking the GitHub branch.

### `[ahead 1]`

The local branch contains one commit that has not yet been pushed.

### `[behind 1]`

The GitHub remote contains one commit that the local branch does not currently have.

### No ahead/behind indicator

The local and remote branches are synchronized.

---

# 15. Important Example — `[behind 1]`

If you see:

```text
## main...origin/main [behind 1]
```

do not immediately assume that GitHub is broken.

It means:

```text
GitHub has 1 commit
        |
        v
Local branch does not have it yet
```

The safe next step is to inspect the difference.

Run:

```bash
git fetch origin
```

Then:

```bash
git log --oneline HEAD..origin/main
```

This shows commits that exist on the remote but not in the local branch.

Do not blindly reset or overwrite the branch.

First understand where the commit came from.

---

# 16. Verify the Remote Without Changing Anything

The following command is useful for checking communication with the remote:

```bash
git ls-remote origin
```

If authentication and the remote repository are configured correctly, Git should return references from GitHub.

You may see output similar to:

```text
<commit-hash>    HEAD
<commit-hash>    refs/heads/main
```

The exact commit hash will be different.

This command does not push your project.

---

# 17. Verify HTTPS Authentication

If using HTTPS, run:

```bash
git ls-remote origin
```

If Git asks for credentials:

```text
Username:
```

enter:

```text
YOUR_GITHUB_USERNAME
```

If Git asks:

```text
Password:
```

enter the:

```text
Personal Access Token
```

Do not enter your normal GitHub password.

The PAT should never be written into documentation or commands.

---

# 18. Verify SSH Authentication

If using SSH, first run:

```bash
ssh -T git@github.com
```

A successful authentication response should indicate that GitHub recognizes the account.

Then run:

```bash
git ls-remote origin
```

If the SSH remote is correctly configured, Git should be able to communicate with GitHub.

---

# 19. Verify the Repository Contents

From GitHub, check that important project directories and files are present.

For example:

```text
frontend/
backend/
docker/
kubernetes/
docs/
scripts/
.github/
```

and files such as:

```text
README.md
azure-pipelines.yml
LICENSE
```

The exact repository structure may evolve during the project.

The purpose of this check is to confirm that the expected local project content exists in the remote repository.

---

# 20. Verify the GitHub Repository URL

The repository should belong to the intended GitHub account.

For example:

```text
https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone
```

Make sure:

* The username is correct.
* The repository name is correct.
* The repository is accessible.
* The repository visibility is intentional.

---

# 21. Complete Verification Command Set

For a quick verification, run:

```bash
echo "===== GITHUB REPOSITORY VERIFICATION ====="

echo ""
echo "=== Git Version ==="
git --version

echo ""
echo "=== Current Directory ==="
pwd

echo ""
echo "=== Repository Status ==="
git status --short --branch

echo ""
echo "=== Current Branch ==="
git branch --show-current

echo ""
echo "=== Git Remote ==="
git remote -v

echo ""
echo "=== Remote URL ==="
git remote get-url origin

echo ""
echo "=== Branch Tracking ==="
git branch -vv

echo ""
echo "=== Recent Commits ==="
git log --oneline -5

echo ""
echo "=== Remote References ==="
git ls-remote origin
```

This provides a useful final verification of the GitHub connection.

---

# 22. Expected Verification Result

A correctly configured repository should show something similar to:

```text
===== GITHUB REPOSITORY VERIFICATION =====

=== Git Version ===
git version 2.43.0

=== Current Directory ===
/home/YOUR_USERNAME/flavorforge-azure-devsecops-capstone

=== Repository Status ===
## main...origin/main

=== Current Branch ===
main

=== Git Remote ===
origin  https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git (fetch)
origin  https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git (push)

=== Remote URL ===
https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git

=== Branch Tracking ===
* main <commit> [origin/main] <commit message>

=== Recent Commits ===
<recent commits>

=== Remote References ===
<commit-hash> HEAD
<commit-hash> refs/heads/main
```

The exact commit hashes, messages, username, and Git version will be different for different users.

---

# 23. FlavorForge Verification Example

The existing FlavorForge repository was verified with:

```bash
git --version
```

which returned:

```text
git version 2.43.0
```

The current branch was:

```text
main
```

The configured GitHub remote is:

```text
https://github.com/shettymalathib/flavorforge-azure-devsecops-capstone.git
```

The repository therefore uses:

```text
Git
  |
  v
main
  |
  v
origin
  |
  v
GitHub
```

---

# 24. Important: A Clean Working Tree Is Not the Same as a Synced Repository

These two concepts are different.

### Clean working tree

```text
nothing to commit
```

means there are no uncommitted local file changes.

### Synchronized branch

```text
main...origin/main
```

with no ahead/behind difference means the local and remote branches are synchronized.

You can have:

```text
clean working tree
```

while still being:

```text
behind 1
```

or:

```text
ahead 1
```

Therefore, check both.

---

# 25. Common Problems

## Problem: `origin` does not exist

If:

```bash
git remote -v
```

returns nothing, the local repository does not currently have a remote configured.

Follow:

```text
04-connect-local-git-to-github.md
```

---

## Problem: Wrong GitHub repository

If:

```bash
git remote -v
```

shows the wrong repository, do not create another remote named `origin`.

Use:

```bash
git remote set-url origin <correct-repository-url>
```

Then verify again:

```bash
git remote -v
```

---

## Problem: GitHub repository is empty

If the GitHub repository contains no project files, the local project may not have been pushed yet.

Follow:

```text
05-first-push.md
```

---

## Problem: Authentication failed

Check the authentication method.

### HTTPS

Verify:

* username
* PAT
* PAT expiration
* repository permissions

### SSH

Verify:

```bash
ssh -T git@github.com
```

and:

```bash
ssh-add -l
```

---

## Problem: `behind 1`

Do not overwrite anything immediately.

Run:

```bash
git fetch origin
```

Then:

```bash
git log --oneline HEAD..origin/main
```

Review the remote commit before deciding what to do.

---

# 26. Security Verification

Before considering the GitHub setup complete, verify that the repository does not contain credentials.

Search the project carefully for:

```text
PATs
Passwords
SSH private keys
Azure secrets
Service principal credentials
Connection strings
Private certificates
Kubernetes secret values
```

Do not commit credentials just because they are required by a tool.

Use appropriate secret-management mechanisms instead.

---

# 27. Final Verification Checklist

Confirm the following:

* [ ] Git is installed.
* [ ] The FlavorForge directory is a Git repository.
* [ ] The expected branch is `main`.
* [ ] A remote named `origin` exists.
* [ ] `origin` points to the correct GitHub repository.
* [ ] GitHub authentication works.
* [ ] The local branch tracks `origin/main`.
* [ ] The GitHub repository is accessible.
* [ ] FlavorForge project files are visible on GitHub.
* [ ] `README.md` is present.
* [ ] Recent commits are visible on GitHub.
* [ ] Local and remote branch status has been checked.
* [ ] No PAT or password is stored in the repository.
* [ ] No SSH private key has been committed.
* [ ] Repository visibility is intentional.

---

# 28. Reviewer Explanation

### "How did you verify the GitHub connection?"

Answer:

> "I verified the local Git installation, checked the current branch, inspected the `origin` remote using `git remote -v`, verified branch tracking with `git branch -vv`, checked the recent commit history, and tested communication with GitHub using `git ls-remote origin`."

### "How do you know which GitHub repository is connected?"

Answer:

> "I use `git remote -v` or `git remote get-url origin` to verify the repository URL configured for the `origin` remote."

### "How do you know the push was successful?"

Answer:

> "I verify that the project files and recent commits are visible in the GitHub repository and compare the local branch with `origin/main`."

### "What does `main...origin/main` mean?"

Answer:

> "It means my local `main` branch is tracking the remote `main` branch on GitHub."

### "What does `behind 1` mean?"

Answer:

> "It means the remote branch contains one commit that my local branch does not currently have. I would fetch and inspect that commit before making any changes."

---

# 29. GitHub Setup Complete

At this point, the GitHub portion of the initial FlavorForge setup is complete.

The overall flow is:

```text
01 Create GitHub Account
          |
          v
02 Create GitHub Repository
          |
          v
03 Configure Authentication
          |
          v
04 Connect Local Git to GitHub
          |
          v
05 Push Local Project
          |
          v
06 Verify GitHub Repository
```

The local project is now ready to use GitHub as its remote source-code repository.

The next phase of the FlavorForge build journey can begin from this verified GitHub foundation.
