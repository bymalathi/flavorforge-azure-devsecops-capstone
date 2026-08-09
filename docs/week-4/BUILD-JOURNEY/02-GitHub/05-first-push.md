# First Push — Upload the Local FlavorForge Project to GitHub

## Objective

This document explains how to perform the **first Git push** from the local FlavorForge repository to the GitHub repository.

A person following this guide should be able to:

1. Confirm the local repository is ready.
2. Confirm the GitHub remote.
3. Review the files that will be committed.
4. Create a commit if required.
5. Push the local branch to GitHub.
6. Verify that the files are available on GitHub.
7. Understand common first-push errors.

---

# 1. Understand What a First Push Does

Before the first push, the project exists locally:

```text
Developer Computer
        |
        v
Local FlavorForge Repository
```

After the push:

```text
Developer Computer
        |
        | git push
        v
GitHub Repository
```

The push transfers Git commits from the local repository to the remote GitHub repository.

The basic flow is:

```text
Files
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

---

# 2. Open the FlavorForge Project

Open the WSL terminal in the project directory.

Example:

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

---

# 3. Verify Git Is Available

Run:

```bash
git --version
```

Example:

```text
git version 2.43.0
```

If Git is not installed, return to:

```text
docs/week-4/BUILD-JOURNEY/01-prerequisites/02-tool-installation.md
```

and follow the Git installation instructions.

---

# 4. Verify the Local Git Repository

Run:

```bash
git status
```

You should see information about the current branch and working tree.

For example:

```text
On branch main
```

If the project is not a Git repository, Git may display:

```text
fatal: not a git repository
```

If that happens, stop here and verify that you are inside:

```text
~/flavorforge-azure-devsecops-capstone
```

---

# 5. Check the Current Branch

Run:

```bash
git branch --show-current
```

For the existing FlavorForge project, the branch is:

```text
main
```

The important point is to know which local branch you are about to push.

---

# 6. Check the GitHub Remote

Run:

```bash
git remote -v
```

For the existing FlavorForge repository, the remote is:

```text
origin  https://github.com/shettymalathib/flavorforge-azure-devsecops-capstone.git (fetch)
origin  https://github.com/shettymalathib/flavorforge-azure-devsecops-capstone.git (push)
```

For another person recreating the project, the username will be different:

```text
origin  https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git (fetch)
origin  https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git (push)
```

If using SSH, it may instead look like:

```text
origin  git@github.com:YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git (fetch)
origin  git@github.com:YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git (push)
```

---

# 7. Important — Do Not Add `origin` Again

If:

```bash
git remote -v
```

already shows:

```text
origin
```

do not run:

```bash
git remote add origin ...
```

again.

That command is only required when the local repository does not already have a remote.

If the existing remote is incorrect, use:

```bash
git remote set-url origin <correct-url>
```

Then verify again:

```bash
git remote -v
```

---

# 8. Review the Working Tree

Before creating a commit or pushing anything, run:

```bash
git status
```

This is an important safety check.

Look for:

```text
modified:
new file:
deleted:
untracked files:
```

Review the changes before adding them.

Do not blindly commit files that may contain credentials.

---

# 9. Check for Sensitive Files

Before the first push, make sure the repository does not contain credentials.

Look for files such as:

```text
.env
.env.*
*.pem
*.key
credentials.*
secret.*
```

Also make sure you have not placed:

```text
GitHub PAT
GitHub password
Azure credentials
Azure client secrets
SSH private keys
Kubernetes secret values
Connection strings containing credentials
```

inside the repository.

A credential should never be committed just because Git allows it.

---

# 10. Check `.gitignore`

Verify that the project has a `.gitignore` file:

```bash
ls -la
```

You should be able to see:

```text
.gitignore
```

You can inspect it using:

```bash
cat .gitignore
```

The `.gitignore` should contain appropriate entries for files that should remain local.

For example:

```text
node_modules/
.env
.env.*
*.log
```

The exact contents should come from the project's actual requirements.

Do not blindly replace an existing `.gitignore`.

---

# 11. Review Untracked Files

Run:

```bash
git status --short
```

Example:

```text
?? docs/BUILD-JOURNEY/
```

The `??` means Git sees the path as **untracked**.

It does not automatically mean the file is bad.

It means Git has not yet started tracking it.

Review the path before adding it.

---

# 12. Add the Files

If the files are reviewed and should be included in the repository, stage them.

For the complete project:

```bash
git add .
```

Then check what has been staged:

```bash
git status
```

This is an important checkpoint.

Do not immediately push without reviewing the staged changes.

---

# 13. Review the Staged Changes

Run:

```bash
git diff --cached --stat
```

This shows a summary of the files that will be included in the commit.

You can also inspect the actual staged changes:

```bash
git diff --cached
```

Review the output.

If something sensitive or incorrect has been staged, remove it before committing.

---

# 14. Unstage a File If Necessary

If you accidentally staged a file, you can remove it from the staging area without deleting the file:

```bash
git restore --staged <file>
```

Example:

```bash
git restore --staged .env
```

Then check:

```bash
git status
```

---

# 15. Create the First Commit

Once the staged files have been reviewed, create the commit:

```bash
git commit -m "Initial FlavorForge project"
```

The commit message can be different if the project already has an established commit history.

For a project that is already committed locally, **do not create another unnecessary initial commit**.

Instead, push the existing local commits.

---

# 16. Verify the Commit

Run:

```bash
git log --oneline -5
```

You should see the latest commits.

For the existing FlavorForge repository, the local history already contains commits such as:

```text
c85aee2 documenting step by step implementation
10e784e docs: update generated documentation
cb6690f documenting step by step implementation
c640066 docs: update generated documentation
557c0a5 changes in root readme
```

The exact commit history will be different for someone recreating the project.

---

# 17. Confirm the Branch

Before pushing, run:

```bash
git branch --show-current
```

For FlavorForge:

```text
main
```

---

# 18. First Push — Existing `main` Branch

If the GitHub repository is empty and your local branch is already named `main`, push using:

```bash
git push -u origin main
```

The `-u` option establishes the relationship between:

```text
local main
```

and:

```text
origin/main
```

After this, future pushes can usually be performed with:

```bash
git push
```

---

# 19. If Your Branch Has Another Name

Check:

```bash
git branch --show-current
```

If the result is:

```text
master
```

or another branch name, do not blindly run:

```bash
git push -u origin main
```

You need to decide which branch should be used.

For this project, the standard branch is:

```text
main
```

If you intentionally want to rename the current local branch to `main`:

```bash
git branch -M main
```

Then:

```bash
git push -u origin main
```

---

# 20. HTTPS Authentication During the Push

If the remote uses HTTPS:

```text
https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git
```

Git may ask for credentials.

If prompted:

```text
Username:
```

enter:

```text
YOUR_GITHUB_USERNAME
```

If prompted:

```text
Password:
```

enter the:

```text
Personal Access Token
```

Do **not** enter your normal GitHub password.

The PAT should not appear in the terminal output or documentation.

---

# 21. SSH Authentication During the Push

If the remote uses SSH:

```text
git@github.com:YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git
```

Git uses the SSH key configured in the previous authentication step.

Before pushing, you can test:

```bash
ssh -T git@github.com
```

If SSH authentication is successful, run:

```bash
git push -u origin main
```

---

# 22. What Happens During `git push`?

Conceptually:

```text
Local main
    |
    | git push
    v
origin/main
    |
    v
GitHub
```

Git transfers the commits that GitHub does not already have.

The files then become visible in the GitHub repository.

---

# 23. Successful Push

A successful push may display output similar to:

```text
Enumerating objects...
Counting objects...
Writing objects...
Total ...
To https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.
```

The exact output will vary.

The important part is that:

```text
main -> main
```

was successfully pushed.

---

# 24. Verify the Local Repository After Push

Run:

```bash
git status
```

A clean working tree should look similar to:

```text
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

This is a useful verification point.

---

# 25. Verify the Remote

Run:

```bash
git remote -v
```

Confirm that the expected GitHub repository is shown for both:

```text
fetch
push
```

---

# 26. Verify the Tracking Relationship

Run:

```bash
git branch -vv
```

You should see the local `main` branch tracking:

```text
origin/main
```

This confirms that the upstream relationship was established.

---

# 27. Verify the Repository on GitHub

Open the GitHub repository in a browser.

You should now see the FlavorForge project files.

Examples include:

```text
frontend/
backend/
docker/
kubernetes/
argocd/
docs/
scripts/
.github/
azure-pipelines.yml
README.md
```

The exact repository contents depend on the project version being recreated.

---

# 28. Verify the README

On GitHub, open:

```text
README.md
```

Confirm that the project README is displayed correctly.

This verifies that the local project content was successfully transferred to GitHub.

---

# 29. Verify the GitHub Commit History

Open the repository's commit history on GitHub.

Compare the latest commit with:

```bash
git log --oneline -5
```

The latest local commit should also appear in the GitHub repository after a successful push.

---

# 30. Common Error — `remote origin already exists`

If you see:

```text
error: remote origin already exists.
```

do not add another remote.

Run:

```bash
git remote -v
```

If the URL is correct, continue.

If it is incorrect:

```bash
git remote set-url origin <correct-url>
```

Then:

```bash
git remote -v
```

---

# 31. Common Error — `Authentication failed`

For HTTPS, check:

```text
GitHub username
PAT validity
PAT expiration
PAT permissions
Repository access
```

Remember:

```text
GitHub password ≠ Git HTTPS password
```

The PAT is used for Git HTTPS authentication.

---

# 32. Common Error — `Permission denied (publickey)`

This normally indicates an SSH authentication problem.

Run:

```bash
ssh -T git@github.com
```

Then check:

```bash
ssh-add -l
```

Verify that:

* the SSH key exists
* the private key is loaded
* the public key was added to the correct GitHub account
* the remote URL uses SSH

Check the remote:

```bash
git remote -v
```

---

# 33. Common Error — `Repository not found`

Check:

```bash
git remote -v
```

Verify:

```text
GitHub username
Repository name
Repository owner
Authentication account
```

The repository should be:

```text
flavorforge-azure-devsecops-capstone
```

---

# 34. Common Error — `rejected` / `non-fast-forward`

You may see an error similar to:

```text
! [rejected] main -> main (non-fast-forward)
```

This can happen when the GitHub repository already contains commits that the local repository does not have.

For example, someone may have created the GitHub repository with a README.

**Do not immediately use `git push --force`.**

First inspect the histories.

A safe approach is to determine whether the remote contains commits that need to be integrated.

For an intentionally empty repository, this normally should not occur.

---

# 35. Do Not Use `git push --force` as a First Fix

Avoid:

```bash
git push --force
```

unless you fully understand the consequences.

Force pushing can overwrite remote history.

For a beginner workflow, first understand why the push was rejected.

---

# 36. Common Error — Files Are Missing on GitHub

If some files do not appear on GitHub:

Run:

```bash
git status
```

Then:

```bash
git log --oneline -5
```

Remember:

```text
Untracked file
    ↓
git add
    ↓
Staged file
    ↓
git commit
    ↓
Local commit
    ↓
git push
    ↓
GitHub
```

A file does not reach GitHub simply because it exists in the local folder.

---

# 37. Important Git Concept

The first push does **not** mean:

> "Upload everything in my folder."

Git pushes **commits**.

The normal process is:

```text
Working Directory
       |
       | git add
       v
Staging Area
       |
       | git commit
       v
Local Git Repository
       |
       | git push
       v
Remote GitHub Repository
```

Understanding this is important for troubleshooting Git.

---

# 38. Final Verification Commands

Run these commands:

```bash
git status
```

```bash
git branch --show-current
```

```bash
git remote -v
```

```bash
git log --oneline -5
```

```bash
git branch -vv
```

Expected overall state:

```text
Branch:
main

Remote:
origin → FlavorForge GitHub repository

Tracking:
main → origin/main

Working tree:
clean
```

---

# 39. First Push Verification Checklist

* [ ] Local FlavorForge repository exists
* [ ] Git is installed
* [ ] Correct branch identified
* [ ] GitHub repository exists
* [ ] `origin` points to the correct GitHub repository
* [ ] Authentication is configured
* [ ] Sensitive files were checked
* [ ] `.gitignore` was checked
* [ ] Files were reviewed before staging
* [ ] Commit exists locally
* [ ] `git push -u origin main` completed successfully
* [ ] GitHub shows the project files
* [ ] GitHub shows the expected commit history
* [ ] Local `main` tracks `origin/main`
* [ ] `git status` is clean

---

# 40. Reviewer Explanation

### "How did you perform the first push?"

> "I first verified the local Git repository, branch and GitHub remote. I reviewed the files and checked for sensitive information before staging and committing them. I then pushed the `main` branch using `git push -u origin main`, which established the upstream relationship with `origin/main`."

### "What does `-u` do?"

> "It establishes the upstream tracking relationship between the local `main` branch and the remote `origin/main` branch. After that, normal `git push` and `git pull` commands can use that relationship."

### "What is the difference between commit and push?"

> "A commit saves changes into the local Git repository. A push transfers those commits to the remote GitHub repository."

### "What happens if a file exists locally but isn't on GitHub?"

> "The file may not have been staged and committed. Git only pushes commits, so I would check `git status`, stage the required file, commit it, and then push."

---

# 41. Next Step

After the first push is successful, continue with:

```text
06-verify-github-repository.md
```

That document performs the final GitHub-side verification and confirms that the local FlavorForge repository and remote GitHub repository are correctly connected.
