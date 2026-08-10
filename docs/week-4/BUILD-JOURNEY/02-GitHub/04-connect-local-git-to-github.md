# Connect Local Git to GitHub

## Objective

This document records how the existing local FlavorForge Git repository was connected to the GitHub repository.

By the end of this step, we verified:

1. The FlavorForge project directory.
2. Git installation.
3. The local Git repository.
4. The current branch.
5. The `origin` remote.
6. The GitHub repository URL.
7. Communication between the local repository and GitHub.

> **Important:** FlavorForge was already an existing Git repository. We did not initialize a new repository or create unnecessary Git history.

---

# 1. Open the FlavorForge Project

The FlavorForge project was stored in the local WSL/Ubuntu environment.

We opened the project directory:

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

Then verified the current directory:

```bash
pwd
```

### What happened

The terminal showed:

```text
/home/malathi/flavorforge-azure-devsecops-capstone
```

This confirmed that the commands were being executed from the FlavorForge project directory.

---

# 2. Verify Git Installation

We checked whether Git was installed:

```bash
git --version
```

### Result

```text
git version 2.43.0
```

This confirmed that Git was installed and available in the WSL/Ubuntu environment.

---

# 3. Verify the Local Git Repository

We checked the repository status:

```bash
git status
```

### Result

The repository reported:

```text
On branch main
Your branch is behind 'origin/main' by 1 commit, and can be fast-forwarded.
(use "git pull" to update your local branch)
```

The working tree also contained documentation changes that had not yet been staged.

The modified files reported by Git were:

```text
docs/week-4/BUILD-JOURNEY/02-GitHub/04-connect-local-git-to-github.md
docs/week-4/BUILD-JOURNEY/07-kustomize/05-prod-overlay.md
docs/week-4/BUILD-JOURNEY/08-azure-devops/01-azure-devops-project.md
docs/week-4/BUILD-JOURNEY/08-azure-devops/02-service-connections.md
docs/week-4/BUILD-JOURNEY/08-azure-devops/03-pipeline-setup.md
docs/week-4/BUILD-JOURNEY/08-azure-devops/04-pipeline-variables.md
docs/week-4/BUILD-JOURNEY/08-azure-devops/05-build-test-security.md
docs/week-4/BUILD-JOURNEY/08-azure-devops/06-docker-publish.md
docs/week-4/BUILD-JOURNEY/08-azure-devops/07-trivy-scan.md
```

### What this confirmed

The directory was already a Git repository.

It also showed that the local repository and GitHub were **not currently synchronized**:

```text
Local main
    |
    | behind by 1 commit
    v
origin/main
```

At this point, we did **not** run `git pull`, because there were already local documentation changes that needed to be preserved and reviewed.

---

# 4. Check the Current Branch

We checked the active branch:

```bash
git branch --show-current
```

### Result

```text
main
```

Therefore the current local branch was:

```text
main
```

---

# 5. Check the GitHub Remote

We checked the configured Git remotes:

```bash
git remote -v
```

### Result

```text
origin  https://github.com/shettymalathib/flavorforge-azure-devsecops-capstone.git (fetch)
origin  https://github.com/shettymalathib/flavorforge-azure-devsecops-capstone.git (push)
```

This confirmed that the local repository already had an `origin` remote configured.

The remote repository was:

```text
https://github.com/shettymalathib/flavorforge-azure-devsecops-capstone.git
```

---

# 6. Verify the Remote URL Directly

We verified only the URL associated with `origin`:

```bash
git remote get-url origin
```

### Result

```text
https://github.com/shettymalathib/flavorforge-azure-devsecops-capstone.git
```

This confirmed that:

```text
Remote name = origin
Repository = flavorforge-azure-devsecops-capstone
Protocol = HTTPS
```

---

# 7. Verify the Local-to-GitHub Relationship

The verified setup was:

```text
WSL / Ubuntu
      |
      v
Local FlavorForge Git Repository
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

The local branch was:

```text
main
```

The configured remote branch was:

```text
origin/main
```

The repository was already connected to GitHub.

---

# 8. Evidence

The Git verification commands and their output were captured in:

![](/screenshots/build-journey/02-github/github-local-repository-remote.png)

The evidence shows:

```text
/home/malathi/flavorforge-azure-devsecops-capstone
git version 2.43.0
On branch main
origin → https://github.com/shettymalathib/flavorforge-azure-devsecops-capstone.git
```

This provides evidence for:

* local project location
* Git installation
* current branch
* GitHub remote
* remote repository URL

The verification was also recorded in:

[▶️ Watch Git Verification Video](/videos/BUILD-JOURNEY/02-git-verification.mp4)

---

# 9. Important Repository State

At the time of this verification, Git reported:

```text
Your branch is behind 'origin/main' by 1 commit, and can be fast-forwarded.
```

This means the local repository was not yet synchronized with the GitHub `main` branch.

It did **not** mean that the GitHub connection was broken.

The connection was working because Git successfully identified:

```text
origin/main
```

and displayed the configured GitHub remote.

The repository also contained local documentation changes that had not yet been committed.

Therefore, synchronization was intentionally **not performed as part of this connection step**.

The next action must first account for the existing local changes and the additional remote commit.

---

# 10. What We Did Not Do

Because the FlavorForge repository already existed, we did not run:

```bash
git init
```

We also did not add the remote again:

```bash
git remote add origin ...
```

The `origin` remote already existed and pointed to the correct repository.

We also did not use:

```bash
git push --force
```

or:

```bash
git reset --hard
```

because the repository had both:

* local documentation changes
* one commit present on the remote that was not yet present locally

Those changes must be reviewed before synchronization.

---

# 11. Verification Commands Used

The actual verification sequence was:

```bash
cd ~/flavorforge-azure-devsecops-capstone
pwd
git --version
git status
git branch --show-current
git remote -v
git remote get-url origin
```

These commands were read-only verification commands. They did not create commits or modify the Git history.

---

# 12. Result

The local FlavorForge Git repository was successfully verified as connected to GitHub.

The verified configuration was:

```text
Project:
~/flavorforge-azure-devsecops-capstone

Git:
2.43.0

Branch:
main

Remote:
origin
```
GitHub repository:
https://github.com/shettymalathib/flavorforge-azure-devsecops-capstone.git


The repository was connected correctly, but the local branch was currently:

```text
behind origin/main by 1 commit
```

and contained local documentation changes.

Therefore, this step confirms the **local Git → GitHub connection**, but does not claim that the local and remote repositories are currently synchronized.

---

# Verification Checklist

* [x] FlavorForge project directory verified
* [x] Git installation verified
* [x] Local Git repository verified
* [x] Current branch verified
* [x] `main` branch identified
* [x] `origin` remote verified
* [x] GitHub repository URL verified
* [x] HTTPS remote confirmed
* [x] Local-to-GitHub relationship confirmed
* [x] Screenshot evidence captured
* [x] Verification video available
* [x] Existing local changes identified
* [x] Remote/local synchronization state identified
* [ ] Local and remote branches synchronized

The final synchronization check belongs to the subsequent GitHub push/verification steps.

---

# Reviewer Explanation

### "How did you connect the local FlavorForge repository to GitHub?"

> "I opened the existing FlavorForge Git repository in WSL, verified Git and the current `main` branch, and checked the configured `origin` remote using `git remote -v`. The remote pointed to the FlavorForge GitHub repository over HTTPS, confirming that the local repository was connected to GitHub."

### "How did you verify which GitHub repository was connected?"

> "I used `git remote -v` and `git remote get-url origin`. Both showed the FlavorForge GitHub repository."

### "Did you initialize a new Git repository?"

> "No. FlavorForge already had an existing Git repository, so I verified the existing repository instead of running `git init`."

### "Was the local repository synchronized with GitHub at this point?"

> "Not at that point. Git reported that the local `main` branch was behind `origin/main` by one commit, and there were also local documentation changes. I therefore did not blindly pull or overwrite anything before reviewing the repository state."

---

# Next Step

Continue with:

```text
05-first-push.md
```

The next document handles staging, committing, and pushing changes when the actual local and remote repository state has been reviewed.
