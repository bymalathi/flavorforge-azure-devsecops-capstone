# GitHub — Connect the Local Git Repository to GitHub

## Objective

This document records how the existing local **FlavorForge Git repository** was connected to its GitHub repository.

By the end of this step, the local repository should:

* exist as a Git repository
* use the `main` branch
* have `origin` configured
* point `origin` to the FlavorForge GitHub repository
* be able to communicate with GitHub
* be ready for the first project push

> **Important:** This step connects the local Git repository to GitHub. It does **not** perform the first project push. The first push is documented in `05-first-push.md`.

---

# 1. What We Wanted

The FlavorForge project already existed locally and was already initialized as a Git repository.

The GitHub repository had also been created.

The required connection was:

```text
Local FlavorForge Project
        |
        v
Local Git Repository
        |
        | origin
        v
GitHub
        |
        v
shettymalathib/flavorforge-azure-devsecops-capstone
```

The local repository therefore needed to know that the GitHub repository was its remote named:

```text
origin
```

---

# 2. Actual FlavorForge Repository

The local FlavorForge project was:

```text
~/flavorforge-azure-devsecops-capstone
```

The GitHub repository was:

```text
https://github.com/shettymalathib/flavorforge-azure-devsecops-capstone.git
```

The local branch used by FlavorForge was:

```text
main
```

The remote name was:

```text
origin
```

---

# 3. Open the Local FlavorForge Project

The work was performed from the WSL/Ubuntu terminal.

Enter the FlavorForge project:

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

Verify the current directory:

```bash
pwd
```

Expected path format:

```text
/home/<LINUX_USERNAME>/flavorforge-azure-devsecops-capstone
```

The exact Linux username is environment-specific.

List the project:

```bash
ls
```

The FlavorForge project files should be displayed.

---

# 4. Verify Git Installation

Check the installed Git version:

```bash
git --version
```

The FlavorForge environment reported:

```text
git version 2.43.0
```

This confirmed that Git was available in the WSL environment.

### Evidence

Capture the terminal showing:

```bash
pwd
git --version
```

Suggested screenshot:

```text
github-local-git-version.png
```

---

# 5. Verify the Existing Git Repository

The FlavorForge project was already a Git repository.

Verify it with:

```bash
git status
```

The command should return Git repository information instead of:

```text
fatal: not a git repository
```

For the existing FlavorForge repository, Git recognized the project as a repository.

This was an existing Git repository, so there was **no need to run**:

```bash
git init
```

---

# 6. Verify the Current Branch

Check the current branch:

```bash
git branch --show-current
```

The FlavorForge repository used:

```text
main
```

Therefore:

```text
Local branch = main
```

No unnecessary branch rename was performed.

### Evidence

Capture the terminal showing:

```bash
git branch --show-current
```

Suggested screenshot:

```text
github-local-branch-main.png
```

---

# 7. Check the Existing Remote

Before adding or changing anything, the existing remote configuration was checked:

```bash
git remote -v
```

The FlavorForge repository was already configured with:

```text
origin  https://github.com/shettymalathib/flavorforge-azure-devsecops-capstone.git (fetch)
origin  https://github.com/shettymalathib/flavorforge-azure-devsecops-capstone.git (push)
```

This confirmed that:

```text
Remote name = origin
Repository = flavorforge-azure-devsecops-capstone
Owner = shettymalathib
Protocol = HTTPS
```

### Evidence

This is the **most important screenshot for this document** because it directly proves the local Git repository was connected to the intended GitHub repository.

Capture:

```bash
git remote -v
```

Suggested screenshot name:

```text
github-local-repository-remote.png
```

> **Screenshot to attach:** the terminal output showing both `(fetch)` and `(push)` URLs.

---

# 8. Why We Did Not Run `git remote add origin`

The FlavorForge repository already had the correct `origin`.

Therefore, we did **not** run:

```bash
git remote add origin ...
```

Running it again would be unnecessary and could produce:

```text
error: remote origin already exists.
```

The correct action for the existing FlavorForge repository was simply to verify the remote:

```bash
git remote -v
```

---

# 9. What `origin` Means

`origin` is the local name Git uses for a configured remote repository.

In FlavorForge:

```text
origin
   |
   v
https://github.com/shettymalathib/flavorforge-azure-devsecops-capstone.git
```

Therefore:

```bash
git push origin main
```

means:

```text
Push the local main branch
to the remote repository named origin.
```

`origin` is not:

* a GitHub username
* a password
* a Personal Access Token
* a branch
* an organization

It is simply the name of the configured Git remote.

---

# 10. Verify the Remote URL Directly

The configured URL can also be checked with:

```bash
git remote get-url origin
```

For FlavorForge, the expected result was:

```text
https://github.com/shettymalathib/flavorforge-azure-devsecops-capstone.git
```

This provided a direct verification that `origin` pointed to the intended repository.

---

# 11. Verify GitHub Communication

Checking the remote URL alone does not prove that Git can communicate with GitHub.

The configured remote was tested with:

```bash
git ls-remote origin
```

This command contacts the remote repository and returns its references.

It does **not** push the project.

A successful result indicates that Git can communicate with the configured GitHub repository.

Conceptually:

```text
Local Git Repository
        |
        | git ls-remote origin
        v
GitHub Repository
```

---

# 12. Authentication Used by the Repository

The FlavorForge remote used HTTPS:

```text
https://github.com/shettymalathib/flavorforge-azure-devsecops-capstone.git
```

The authentication configuration was handled separately in:

```text
03-github-authentication.md
```

This document does not recreate the authentication setup.

The important distinction is:

```text
Remote URL
     |
     | tells Git where the repository is
     v
GitHub Repository

Authentication
     |
     | proves access
     v
GitHub
```

The remote URL itself does not contain a password or token.

---

# 13. Security Check

The GitHub remote was configured without credentials embedded in the URL.

Correct:

```text
https://github.com/shettymalathib/flavorforge-azure-devsecops-capstone.git
```

Credentials must **not** be embedded like:

```text
https://USERNAME:PASSWORD@github.com/...
```

or:

```text
https://USERNAME:TOKEN@github.com/...
```

The repository configuration should contain only the repository location.

---

# 14. Check the Local Repository Status

Verify the repository state:

```bash
git status --short --branch
```

This command shows:

* current branch
* tracking information, if configured
* modified files
* untracked files

For example:

```text
## main
```

or, after upstream tracking has been established:

```text
## main...origin/main
```

If files are shown as untracked or modified, that does not mean the GitHub connection is broken.

It only means there are local changes that have not yet been committed.

---

# 15. Check Remote Branches

Remote branches can be checked with:

```bash
git branch -r
```

After the GitHub repository contains a `main` branch, the expected remote branch is:

```text
origin/main
```

The remote can also be inspected with:

```bash
git remote show origin
```

This provides information about the configured remote and branch relationships.

---

# 16. Connection vs First Push

It is important to separate these two activities.

### This document

```text
Connect local Git
        |
        v
Configure origin
        |
        v
Verify origin
        |
        v
Test GitHub communication
```

### Next document

```text
Prepare files
        |
        v
git add
        |
        v
git commit
        |
        v
git push
        |
        v
GitHub
```

The actual first project push belongs to:

```text
05-first-push.md
```

---

# 17. Actual FlavorForge State

The existing FlavorForge repository already had the required GitHub connection.

The verified configuration was:

```text
Local repository:
~/flavorforge-azure-devsecops-capstone

Branch:
main

Remote:
origin

Protocol:
HTTPS

GitHub repository:
https://github.com/shettymalathib/flavorforge-azure-devsecops-capstone.git
```

Therefore, no new Git repository was initialized and no duplicate `origin` remote was created.

---

# 18. Actual Verification Commands

The important commands used for this step were:

### Enter the project

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

### Verify Git

```bash
git --version
```

### Verify the repository

```bash
git status
```

### Verify the branch

```bash
git branch --show-current
```

### Verify the remote

```bash
git remote -v
```

### Verify the remote URL

```bash
git remote get-url origin
```

### Test GitHub communication

```bash
git ls-remote origin
```

### Check remote branches

```bash
git branch -r
```

### Inspect the remote

```bash
git remote show origin
```

---

# 19. What We Did Not Do

Because the FlavorForge repository was already initialized and already had the correct remote, we did **not** perform:

```bash
git init
```

We also did not unnecessarily run:

```bash
git remote add origin ...
```

And we did not perform the first project push in this step.

The push is documented separately in:

```text
05-first-push.md
```

---

# 20. If `origin` Did Not Exist

For a new recreation where:

```bash
git remote -v
```

returns no output, the GitHub remote would need to be added:

```bash
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git
```

Then verify:

```bash
git remote -v
```

This was **not required for the existing FlavorForge repository** because `origin` was already configured correctly.

---

# 21. If `origin` Pointed to the Wrong Repository

If a repository already had an `origin`, but it pointed to the wrong GitHub repository, the existing remote should be corrected instead of creating another `origin`.

Use:

```bash
git remote set-url origin https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git
```

Then verify:

```bash
git remote -v
```

Again, this was not required for the existing FlavorForge repository because the configured URL was already correct.

---

# 22. Common Problems

## Problem 1 — `remote origin already exists`

Run:

```bash
git remote -v
```

If it points to the correct FlavorForge repository:

```text
Do nothing.
```

If it points somewhere else:

```bash
git remote set-url origin <CORRECT_URL>
```

---

## Problem 2 — `fatal: not a git repository`

First verify:

```bash
pwd
```

Then:

```bash
ls -la
```

Make sure the terminal is inside:

```text
~/flavorforge-azure-devsecops-capstone
```

Do not immediately run:

```bash
git init
```

The existing FlavorForge project was already a Git repository.

---

## Problem 3 — `Repository not found`

Check:

```bash
git remote -v
```

Verify:

* GitHub username
* repository name
* repository owner
* repository URL
* GitHub account being authenticated
* repository access

The expected FlavorForge repository is:

```text
shettymalathib/flavorforge-azure-devsecops-capstone
```

---

## Problem 4 — Authentication Failed

The remote URL and authentication are separate.

Check the authentication configuration documented in:

```text
03-github-authentication.md
```

For HTTPS authentication, do not use the normal GitHub account password as the Git password.

---

# 23. Reviewer Questions

### "How did you connect the local repository to GitHub?"

> "FlavorForge was already a local Git repository. I verified the repository and current `main` branch, then checked the configured remote using `git remote -v`. The existing `origin` remote already pointed to the FlavorForge GitHub repository, so I did not create another remote."

### "What does `git remote -v` do?"

> "`git remote -v` displays the remote repositories configured for the local Git repository, including their fetch and push URLs."

### "What is `origin`?"

> "`origin` is the conventional local name for a Git remote repository. In FlavorForge, `origin` points to the FlavorForge GitHub repository."

### "Did you run `git remote add origin`?"

> "No. The FlavorForge repository already had the correct `origin` remote, so I verified it instead of creating a duplicate."

### "How did you test GitHub communication?"

> "I used `git ls-remote origin`. It communicates with the configured remote and verifies that Git can access the repository without performing a push."

### "Did this step push the project?"

> "No. This step only established and verified the GitHub connection. The first project push is handled separately in `05-first-push.md`."

---

# 24. Screenshot Evidence

The following screenshot is relevant and should be captured as evidence for this step.

### Remote configuration

Command:

```bash
git remote -v
```

Suggested filename:

```text
github-local-repository-remote.png
```

The screenshot should clearly show:

```text
origin  https://github.com/shettymalathib/flavorforge-azure-devsecops-capstone.git (fetch)
origin  https://github.com/shettymalathib/flavorforge-azure-devsecops-capstone.git (push)
```

### Optional additional evidence

If screenshots are being collected for the complete BUILD-JOURNEY, these are also useful:

```text
github-local-git-version.png
github-local-branch-main.png
github-local-github-access.png
```

For example, `github-local-github-access.png` can show the successful:

```bash
git ls-remote origin
```

result.

> **If you do not already have these screenshots, capture them during the actual reproduction instead of inserting invented output into the documentation.**

---

# 25. Verification Checklist

Before moving to the first push:

* [x] FlavorForge project directory identified
* [x] Git installation verified
* [x] Existing Git repository verified
* [x] Current branch verified as `main`
* [x] Existing `origin` remote checked
* [x] `origin` points to the FlavorForge GitHub repository
* [x] HTTPS remote confirmed
* [x] GitHub communication tested
* [x] No credentials embedded in the remote URL
* [x] No unnecessary `git init` performed
* [x] No unnecessary `git remote add origin` performed
* [ ] First project push — handled in the next document

---

# 26. Result

The existing FlavorForge local Git repository was connected to GitHub through the existing `origin` remote.

The final relationship was:

```text
FlavorForge Local Repository
          |
          | main
          v
       Git / origin
          |
          | HTTPS
          v
GitHub
          |
          v
shettymalathib/
flavorforge-azure-devsecops-capstone
```

The repository was therefore ready for the next step:

```text
05-first-push.md
```

The next document records how the local FlavorForge commits were pushed to GitHub for the first time.
