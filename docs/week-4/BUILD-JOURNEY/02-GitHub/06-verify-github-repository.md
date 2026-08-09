# GitHub Repository — Complete Verification Guide

## Objective

This document verifies that the local FlavorForge Git repository is correctly connected to GitHub and that the project was successfully pushed.

By the end of this guide, you should be able to confirm:

1. Git is installed.
2. The FlavorForge directory is a Git repository.
3. The correct branch is being used.
4. The `origin` remote exists.
5. `origin` points to the correct GitHub repository.
6. GitHub authentication works.
7. The local branch tracks the correct remote branch.
8. The project files are available on GitHub.
9. The latest commits are available on GitHub.
10. The local and remote branches are synchronized.

---

# 1. Expected Setup

The final GitHub setup should look like this:

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

The important relationship is:

```text
local main
     |
     v
origin/main
     |
     v
GitHub
```

---

# 2. Open the FlavorForge Project

Open the WSL/Ubuntu terminal.

Move into the project:

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

Verify the current directory:

```bash
pwd
```

Expected format:

```text
/home/YOUR_USERNAME/flavorforge-azure-devsecops-capstone
```

The Linux username and path may be different on another machine.

---

# 3. Verify Git Installation

Run:

```bash
git --version
```

Example:

```text
git version 2.43.0
```

If a Git version is displayed, Git is installed.

---

# 4. Verify the Local Git Repository

Run:

```bash
git status
```

A valid Git repository should return information about the current branch and working tree.

Example:

```text
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

The exact output depends on the current repository state.

If you receive:

```text
fatal: not a git repository
```

stop and verify that you are inside:

```text
~/flavorforge-azure-devsecops-capstone
```

---

# 5. Verify the Current Branch

Run:

```bash
git branch --show-current
```

For FlavorForge, the expected branch is:

```text
main
```

Do not automatically rename the branch if another branch is displayed.

First determine whether the different branch is intentional.

---

# 6. Verify the GitHub Remote

Run:

```bash
git remote -v
```

For HTTPS, the expected format is:

```text
origin  https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git (fetch)
origin  https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git (push)
```

For SSH, it may be:

```text
origin  git@github.com:YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git (fetch)
origin  git@github.com:YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git (push)
```

Verify:

```text
Remote name:
origin

Repository:
flavorforge-azure-devsecops-capstone
```

---

# 7. Verify Only the Remote URL

Run:

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

Confirm that the repository name is:

```text
flavorforge-azure-devsecops-capstone
```

---

# 8. Verify Branch Tracking

Run:

```bash
git branch -vv
```

Example:

```text
* main c85aee2 [origin/main] documenting step by step implementation
```

The important part is:

```text
[origin/main]
```

This means the local `main` branch is tracking the remote `origin/main` branch.

---

# 9. Verify Communication With GitHub

Run:

```bash
git ls-remote origin
```

If the connection is working, Git should return remote references similar to:

```text
<commit-hash>    HEAD
<commit-hash>    refs/heads/main
```

The exact commit hashes will be different.

This command is useful because it verifies that Git can communicate with the configured remote repository.

It does **not** push or modify your project.

---

# 10. Verify HTTPS Authentication

If the repository uses HTTPS, run:

```bash
git ls-remote origin
```

If Git asks for:

```text
Username:
```

enter:

```text
YOUR_GITHUB_USERNAME
```

If Git asks for:

```text
Password:
```

enter your:

```text
Personal Access Token
```

Do **not** enter your normal GitHub account password.

Never write the PAT into:

```text
README.md
documentation
scripts
commands
screenshots
videos
Git commits
```

---

# 11. Verify SSH Authentication

If the repository uses SSH, first run:

```bash
ssh -T git@github.com
```

A successful response indicates that GitHub recognizes the SSH key.

Then run:

```bash
git ls-remote origin
```

If this returns the remote references, Git can communicate with the GitHub repository using SSH.

---

# 12. Refresh Remote Information

Before comparing local and remote branches, fetch the latest remote information:

```bash
git fetch origin
```

This does **not** merge anything into your local branch.

It updates your local knowledge of the remote repository.

This is important when checking whether your branch is:

```text
ahead
behind
synchronized
```

---

# 13. Check Local and Remote Status

Run:

```bash
git status -sb
```

You may see:

```text
## main...origin/main
```

This means the local branch and remote tracking branch are synchronized.

You may instead see:

```text
## main...origin/main [ahead 1]
```

This means:

```text
Local main
    |
    | 1 commit not pushed
    v
origin/main
```

You may see:

```text
## main...origin/main [behind 1]
```

This means:

```text
origin/main
    |
    | 1 commit not present locally
    v
local main
```

---

# 14. If the Branch Is `[ahead 1]`

Example:

```text
## main...origin/main [ahead 1]
```

The local branch contains a commit that has not been pushed.

Check the commit:

```bash
git log --oneline origin/main..HEAD
```

If the commit should be on GitHub, push it:

```bash
git push
```

---

# 15. If the Branch Is `[behind 1]`

Example:

```text
## main...origin/main [behind 1]
```

The remote contains a commit that the local branch does not have.

Inspect it:

```bash
git log --oneline HEAD..origin/main
```

Do **not** immediately run:

```bash
git reset --hard
```

and do **not** immediately run:

```bash
git push --force
```

First determine why the remote contains the additional commit.

---

# 16. If the Branch Is Synchronized

If you see:

```text
## main...origin/main
```

with no `ahead` or `behind` indicator, the local branch and remote tracking branch are synchronized.

This is the desired state after a successful push.

---

# 17. Check the Local Working Tree

Run:

```bash
git status
```

A clean working tree should show:

```text
nothing to commit, working tree clean
```

This means there are no uncommitted local changes.

### Important

A clean working tree does **not** automatically mean the repository is synchronized with GitHub.

You could have:

```text
nothing to commit, working tree clean
```

and still be:

```text
behind 1
```

or:

```text
ahead 1
```

Therefore, check both:

```bash
git status
```

and:

```bash
git status -sb
```

---

# 18. Verify Recent Local Commits

Run:

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

The exact commit history depends on the repository version.

---

# 19. Verify the Latest Commit

Run:

```bash
git log -1 --oneline
```

Example:

```text
c85aee2 documenting step by step implementation
```

Copy the commit ID if required.

You can compare this with the latest commit shown in GitHub.

---

# 20. Verify the GitHub Repository in the Browser

Open the GitHub repository:

```text
https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone
```

Verify that the repository belongs to the expected GitHub account.

Check that the project files are visible.

For example:

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
LICENSE
```

The exact structure may change as the project evolves.

---

# 21. Verify `README.md`

Open:

```text
README.md
```

on GitHub.

Confirm that the FlavorForge README is displayed correctly.

This confirms that the README from the local repository is available in the remote repository.

---

# 22. Verify the Commit History on GitHub

Open the repository's **Commits** section.

Compare the latest GitHub commit with:

```bash
git log -1 --oneline
```

The latest local commit should be visible on GitHub when the branch has been successfully pushed.

---

# 23. Verify Important Project Files

Check that important files and directories are present.

For example:

```text
frontend/
backend/
docker/
kubernetes/
argocd/
docs/
scripts/
.github/
```

and:

```text
README.md
azure-pipelines.yml
LICENSE
```

Do not assume every file must exist in every project version.

The purpose of this check is to confirm that the expected FlavorForge project content has reached GitHub.

---

# 24. Verify Repository Visibility

On GitHub, confirm that the repository visibility is intentional:

```text
Public
```

or:

```text
Private
```

If the repository is public, verify that no confidential information has been committed.

---

# 25. Security Verification

Before declaring the GitHub setup complete, check that the repository does not contain:

```text
GitHub PATs
Passwords
SSH private keys
Azure client secrets
Service principal credentials
Connection strings containing passwords
Private certificates
Kubernetes secret values
```

Never commit credentials simply because an application needs them.

Use appropriate secret-management mechanisms.

---

# 26. Complete Verification Command Set

The following commands provide a quick final verification.

Run them from the FlavorForge project directory:

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
git status -sb

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

This command set does not change the repository.

It provides a final snapshot of the GitHub configuration.

---

# 27. Expected Verification Result

A correctly configured repository should look conceptually like:

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

The exact:

* username
* Git version
* commit hashes
* commit messages

will vary.

---

# 28. Existing FlavorForge Verification

For the existing FlavorForge project:

```bash
git --version
```

returned:

```text
git version 2.43.0
```

The primary branch is:

```text
main
```

The configured remote is:

```text
https://github.com/shettymalathib/flavorforge-azure-devsecops-capstone.git
```

Therefore:

```text
Local FlavorForge
       |
       | main
       v
origin
       |
       | HTTPS
       v
GitHub
       |
       v
shettymalathib/flavorforge-azure-devsecops-capstone
```

For a new recreation, replace:

```text
shettymalathib
```

with the user's own GitHub username.

---

# 29. Common Problems

## Problem 1 — `origin` does not exist

Run:

```bash
git remote -v
```

If there is no output, the remote has not been configured.

Return to:

```text
04-connect-local-git-to-github.md
```

---

## Problem 2 — Wrong GitHub repository

Run:

```bash
git remote -v
```

If the URL is incorrect:

```bash
git remote set-url origin <correct-repository-url>
```

Then verify:

```bash
git remote -v
```

---

## Problem 3 — GitHub repository is empty

The local project may not have been pushed.

Return to:

```text
05-first-push.md
```

and complete the push procedure.

---

## Problem 4 — Authentication failed

### HTTPS

Check:

```text
GitHub username
PAT
PAT expiration
Repository permissions
```

Do not use your normal GitHub password.

### SSH

Run:

```bash
ssh -T git@github.com
```

Then:

```bash
ssh-add -l
```

---

## Problem 5 — Branch is `behind`

Run:

```bash
git fetch origin
```

Then:

```bash
git log --oneline HEAD..origin/main
```

Inspect the remote commit before making changes.

---

## Problem 6 — Branch is `ahead`

Run:

```bash
git log --oneline origin/main..HEAD
```

If the commits should be on GitHub:

```bash
git push
```

---

# 30. Final Verification Checklist

Before considering the GitHub setup complete:

* [ ] Git is installed.
* [ ] Correct FlavorForge project directory is open.
* [ ] Project is a Git repository.
* [ ] Current branch is verified.
* [ ] Branch is `main` for the standard FlavorForge setup.
* [ ] Remote named `origin` exists.
* [ ] `origin` points to the correct GitHub repository.
* [ ] Authentication works.
* [ ] `main` tracks `origin/main`.
* [ ] Remote information has been refreshed with `git fetch origin`.
* [ ] Local/remote status has been checked.
* [ ] Project files are visible on GitHub.
* [ ] `README.md` is visible on GitHub.
* [ ] Recent commits are visible on GitHub.
* [ ] Repository visibility is intentional.
* [ ] No PAT or password is committed.
* [ ] No SSH private key is committed.
* [ ] No Azure credentials are committed.
* [ ] No Kubernetes secret values are committed.

---

# 31. Reviewer Explanation

### "How did you verify the GitHub connection?"

> "I verified the local Git installation and repository, checked the current branch, inspected the `origin` remote using `git remote -v`, verified branch tracking with `git branch -vv`, fetched the latest remote information, and tested communication with GitHub using `git ls-remote origin`."

### "How do you know which GitHub repository is connected?"

> "I use `git remote -v` or `git remote get-url origin` to verify the repository URL configured for the `origin` remote."

### "How do you know the first push succeeded?"

> "I verified that the FlavorForge project files and recent commits are visible in the GitHub repository and confirmed that the local `main` branch tracks `origin/main`."

### "What does `main...origin/main` mean?"

> "It means the local `main` branch is tracking the remote `main` branch through the `origin` remote."

### "What does `ahead 1` mean?"

> "It means the local branch contains one commit that has not yet been pushed to GitHub."

### "What does `behind 1` mean?"

> "It means the remote branch contains one commit that the local branch does not currently have. I would fetch and inspect that commit before deciding how to synchronize the branches."

### "Does `git status` being clean mean GitHub is synchronized?"

> "Not necessarily. A clean working tree only means there are no uncommitted local changes. I also check the branch's ahead or behind status against `origin/main`."

---

# 32. GitHub Setup Complete

The GitHub setup is complete when the following relationship is verified:

```text
GitHub Account
      |
      v
GitHub Repository
      |
      ^
      |
    origin
      |
      ^
      |
Local Git Repository
      |
      v
main
```

The complete GitHub setup flow was:

```text
01-github-account.md
        |
        v
02-create-repository.md
        |
        v
03-github-authentication.md
        |
        v
04-connect-local-git-to-github.md
        |
        v
05-first-push.md
        |
        v
06-verify-github-repository.md
```

At this point, GitHub is established as the remote source-code repository for FlavorForge.

The next phase can build on this verified GitHub foundation.
