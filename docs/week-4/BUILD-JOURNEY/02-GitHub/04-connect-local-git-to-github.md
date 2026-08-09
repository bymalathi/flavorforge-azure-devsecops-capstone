# GitHub — Connect the Local Git Repository to GitHub

## Objective

This document explains how to connect the existing local **FlavorForge Git repository** to the GitHub repository created in the previous step.

A person following this guide should be able to:

1. Open the local FlavorForge project in WSL.
2. Verify that Git is installed.
3. Confirm that the project is already a Git repository.
4. Check the current branch.
5. Check whether a GitHub remote already exists.
6. Add the GitHub remote if it does not exist.
7. Correct the remote if it points to the wrong repository.
8. Verify the GitHub remote.
9. Test GitHub access.
10. Prepare the repository for the first push.

> **Important:** This document connects the local repository to GitHub. It does **not** perform the first project push. The first push is handled in `05-first-push.md`.

---

# 1. Understand What We Are Connecting

At this stage, two repositories exist.

### Local repository

The FlavorForge project exists on the developer's computer:

```text
~/flavorforge-azure-devsecops-capstone
```

### Remote GitHub repository

The GitHub repository exists online:

```text
https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git
```

We now need to tell the local Git repository where its remote GitHub repository is located.

The relationship is:

```text
Developer Computer
       |
       v
FlavorForge Project
       |
       | Git
       v
Local Git Repository
       |
       | origin
       |
       v
GitHub Repository
```

---

# 2. Prerequisites

Before continuing, make sure:

* [ ] GitHub account exists
* [ ] GitHub repository has been created
* [ ] Local FlavorForge project exists
* [ ] Local project is already a Git repository
* [ ] GitHub authentication has been configured
* [ ] You know your GitHub username
* [ ] You know the GitHub repository name

The expected repository name is:

```text
flavorforge-azure-devsecops-capstone
```

Authentication is covered in:

```text
03-github-authentication.md
```

---

# 3. Open the Local FlavorForge Project

Open the **WSL/Ubuntu terminal**.

Move into the FlavorForge project:

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

Verify the current directory:

```bash
pwd
```

Example:

```text
/home/YOUR_LINUX_USERNAME/flavorforge-azure-devsecops-capstone
```

The Linux username and exact path may be different on another computer.

Now list the project files:

```bash
ls
```

You should see the FlavorForge project contents.

---

# 4. Verify Git Is Installed

Run:

```bash
git --version
```

Example:

```text
git version 2.43.0
```

If a Git version is displayed, Git is installed.

If Git is missing, install it before continuing:

```bash
sudo apt update
```

Then:

```bash
sudo apt install git -y
```

Verify again:

```bash
git --version
```

---

# 5. Verify That the Project Is a Git Repository

Run:

```bash
git status
```

If the project is already a Git repository, Git will display information about the repository.

For example:

```text
On branch main
```

You may also see information about modified or untracked files.

### If you see:

```text
fatal: not a git repository
```

do not immediately run `git init`.

First verify that you are in the correct directory:

```bash
pwd
```

Then:

```bash
ls -la
```

Make sure you are inside:

```text
flavorforge-azure-devsecops-capstone
```

If you are in the correct project directory and the project genuinely has never been initialized as a Git repository, then Git can be initialized separately.

For this existing FlavorForge project, however, the repository is already initialized.

---

# 6. Check the Current Branch

Run:

```bash
git branch --show-current
```

For the existing FlavorForge repository, the expected result is:

```text
main
```

The branch is:

```text
main
```

Do not rename the branch unnecessarily.

---

# 7. Check Whether a Remote Already Exists

This is the most important verification before making any changes.

Run:

```bash
git remote -v
```

There are three possible situations.

### Situation A

`origin` exists and is correct.

### Situation B

No remote exists.

### Situation C

`origin` exists but points to the wrong repository.

We will handle each situation safely.

---

# 8. What Is `origin`?

`origin` is the conventional name given to the main remote repository.

It is simply a local Git name.

It is **not**:

* a GitHub username
* a GitHub account
* a password
* a PAT
* a branch
* an organization

For example:

```text
origin
   |
   v
https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git
```

When we run:

```bash
git push origin main
```

Git interprets this as:

```text
Push the local main branch
to the remote repository named origin.
```

---

# 9. Situation A — `origin` Already Exists and Is Correct

Run:

```bash
git remote -v
```

If you see:

```text
origin  https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git (fetch)
origin  https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git (push)
```

then the local repository is already connected to the correct GitHub repository.

### Do not run:

```bash
git remote add origin ...
```

The remote already exists.

Simply continue to:

**Section 12 — Verify the Remote**

---

# 10. Situation B — No Remote Exists

If:

```bash
git remote -v
```

returns no output, the local Git repository does not have a remote configured.

Add the GitHub repository:

```bash
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git
```

Replace:

```text
YOUR_GITHUB_USERNAME
```

with the actual GitHub username.

For example:

```bash
git remote add origin https://github.com/example-user/flavorforge-azure-devsecops-capstone.git
```

Now verify:

```bash
git remote -v
```

Expected:

```text
origin  https://github.com/example-user/flavorforge-azure-devsecops-capstone.git (fetch)
origin  https://github.com/example-user/flavorforge-azure-devsecops-capstone.git (push)
```

---

# 11. Situation C — `origin` Exists but Points to the Wrong Repository

Sometimes a local project already has an `origin`, but it points to a different repository.

For example:

```text
origin  https://github.com/example-user/old-project.git (fetch)
origin  https://github.com/example-user/old-project.git (push)
```

but the correct repository is:

```text
https://github.com/example-user/flavorforge-azure-devsecops-capstone.git
```

Do **not** add another `origin`.

Instead, change the existing remote:

```bash
git remote set-url origin https://github.com/example-user/flavorforge-azure-devsecops-capstone.git
```

Then verify:

```bash
git remote -v
```

The result should now point to:

```text
flavorforge-azure-devsecops-capstone.git
```

---

# 12. Verify the Remote

Run:

```bash
git remote -v
```

Check all of the following:

* Remote name is `origin`
* GitHub username is correct
* Repository name is correct
* Repository URL is correct
* Fetch URL is correct
* Push URL is correct

For HTTPS, the expected format is:

```text
origin  https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git (fetch)
origin  https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git (push)
```

If SSH was intentionally selected instead, the format is:

```text
origin  git@github.com:YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git (fetch)
origin  git@github.com:YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git (push)
```

---

# 13. HTTPS or SSH?

The remote URL depends on the authentication method selected in:

```text
03-github-authentication.md
```

### If using HTTPS + PAT

Use:

```text
https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git
```

### If using SSH

Use:

```text
git@github.com:YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git
```

You only need one authentication method.

Do not change the existing FlavorForge configuration simply for practice.

---

# 14. Test GitHub Access

Checking the remote URL does **not** prove that authentication works.

This command only displays the configured URL:

```bash
git remote -v
```

To test actual communication with GitHub, run:

```bash
git ls-remote origin
```

This asks Git to communicate with the configured remote repository.

---

## If Using HTTPS

Git may request credentials.

Use:

```text
Username:
YOUR_GITHUB_USERNAME
```

For the password prompt, use:

```text
YOUR_PERSONAL_ACCESS_TOKEN
```

Do **not** enter your normal GitHub account password.

If the command succeeds, Git can communicate with the GitHub repository.

---

## If Using SSH

First test:

```bash
ssh -T git@github.com
```

Then:

```bash
git ls-remote origin
```

A successful SSH authentication means GitHub recognizes the configured SSH key.

---

# 15. Check the Local Git Status

Run:

```bash
git status --short --branch
```

You may see something similar to:

```text
## main...origin/main
```

This indicates that the local branch is tracking the remote branch.

You may also see untracked or modified files.

For example:

```text
?? docs/BUILD-JOURNEY/
```

This means Git sees files that have not yet been committed.

It does **not** mean the GitHub connection is broken.

---

# 16. Check Remote Branches

Run:

```bash
git branch -r
```

You may see:

```text
origin/main
```

This represents the remote `main` branch.

You can also inspect the remote using:

```bash
git remote show origin
```

This provides additional information about:

* remote URL
* tracked branches
* remote branches
* local tracking configuration

---

# 17. Important: Do Not Push Yet

At this stage, the goal is only:

```text
Connect
```

We are **not** uploading the FlavorForge project yet.

The distinction is:

```text
Connect
   |
   v
Tell Git where GitHub is
   |
   v
Authenticate
   |
   v
Verify access
   |
   v
First Push
```

The actual first push will happen in:

```text
05-first-push.md
```

That document will cover:

```bash
git add .
git commit
git push
```

---

# 18. Complete Decision Flow

Use this decision process:

```text
Open FlavorForge project
        |
        v
Check Git
        |
        v
Check git status
        |
        v
Check current branch
        |
        v
Run git remote -v
        |
        v
Does origin exist?
       / \
     YES  NO
      |    |
      |    v
      |   git remote add origin ...
      |    |
      |    v
      |   verify
      |
      v
Is origin correct?
       / \
     YES  NO
      |    |
      |    v
      |   git remote set-url origin ...
      |    |
      |    v
      |   verify
      |
      v
Test GitHub access
        |
        v
Ready for first push
```

---

# 19. Commands Used in This Step

### Enter the project

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

### Verify Git

```bash
git --version
```

### Verify repository

```bash
git status
```

### Check current branch

```bash
git branch --show-current
```

### Check remote

```bash
git remote -v
```

### Add remote when none exists

```bash
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git
```

### Change an incorrect remote

```bash
git remote set-url origin https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git
```

### Check remote branches

```bash
git branch -r
```

### Inspect remote

```bash
git remote show origin
```

### Test GitHub access

```bash
git ls-remote origin
```

---

# 20. Existing FlavorForge Verification

The existing FlavorForge project has already been connected to GitHub.

The current configuration is:

```text
Branch:
main
```

Remote name:

```text
origin
```

Remote URL:

```text
https://github.com/shettymalathib/flavorforge-azure-devsecops-capstone.git
```

Therefore, for the existing FlavorForge repository, there is **no need to run**:

```bash
git remote add origin ...
```

again.

The correct verification command is:

```bash
git remote -v
```

---

# 21. Security Rules

Never place credentials inside the Git remote URL.

### Do not use:

```text
https://USERNAME:PASSWORD@github.com/...
```

or:

```text
https://USERNAME:TOKEN@github.com/...
```

The normal remote URL should contain only the repository location.

For example:

```text
https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git
```

Never commit:

```text
PATs
Passwords
SSH private keys
Azure credentials
Service principal secrets
Kubernetes secret values
Connection strings containing credentials
```

Never place credentials in:

```text
README.md
Markdown documentation
YAML files
Source code
Scripts
Screenshots
Videos
Git history
```

---

# 22. Common Problems

## Problem 1 — `remote origin already exists`

Run:

```bash
git remote -v
```

If the URL is correct:

> Do nothing.

If the URL is incorrect:

```bash
git remote set-url origin <correct-url>
```

---

## Problem 2 — `fatal: not a git repository`

Check:

```bash
pwd
```

Then:

```bash
ls -la
```

Make sure you are inside:

```text
flavorforge-azure-devsecops-capstone
```

If the project genuinely has no Git repository, Git initialization must be handled separately.

---

## Problem 3 — `Repository not found`

Check:

```bash
git remote -v
```

Verify:

* GitHub username
* repository name
* repository URL
* repository visibility
* authentication
* repository permissions

---

## Problem 4 — Authentication failed

For HTTPS, verify:

* PAT is valid
* PAT has not expired
* PAT has the required permissions
* correct GitHub account is being used
* repository URL is correct

Do not use your normal GitHub password.

---

## Problem 5 — `Permission denied (publickey)`

For SSH, run:

```bash
ssh -T git@github.com
```

Then:

```bash
ssh-add -l
```

Verify that the correct public key was added to the intended GitHub account.

---

# 23. Reviewer Questions

### "How did you connect your local repository to GitHub?"

> "I first verified that the FlavorForge project was already a local Git repository. Then I checked the configured remote using `git remote -v`. The remote named `origin` points to the FlavorForge GitHub repository. If a remote had not existed, I would use `git remote add origin`. If it pointed to the wrong repository, I would use `git remote set-url`."

### "What does `git remote -v` do?"

> "`git remote -v` displays the remote repositories configured for the local Git repository, including the URLs used for fetching and pushing."

### "What is `origin`?"

> "`origin` is the conventional local name for the main remote Git repository. It is simply a Git remote name."

### "Does `git remote -v` authenticate with GitHub?"

> "No. It only displays the configured remote URL. Authentication happens when Git communicates with GitHub, such as during fetch, pull, push, or `git ls-remote`."

### "Did you create another local Git repository?"

> "No. FlavorForge was already a Git repository. I verified the existing repository and configured its GitHub remote."

### "What is the difference between the remote and authentication?"

> "The remote tells Git which repository to communicate with. Authentication proves that I have permission to access that repository. For example, the remote can use an HTTPS URL while the PAT is used to authenticate the Git operation."

---

# 24. Verification Checklist

Before continuing to the first push, confirm:

* [ ] Inside the correct FlavorForge project directory
* [ ] Git is installed
* [ ] Project is a Git repository
* [ ] Current branch has been verified
* [ ] `git remote -v` has been checked
* [ ] Remote is named `origin`
* [ ] `origin` points to the correct GitHub repository
* [ ] Authentication method has been configured
* [ ] GitHub access has been tested
* [ ] No credentials are present in the remote URL
* [ ] No credentials have been committed
* [ ] No project files have been pushed yet as part of this step

---

# 25. Next Step

The local FlavorForge Git repository is now connected to the GitHub repository.

Continue with:

```text
05-first-push.md
```

The next document explains how to safely perform the first:

```text
git add
    ↓
git commit
    ↓
git push
```

and upload the local FlavorForge project to GitHub.
