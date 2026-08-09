# First Push — Upload the Local FlavorForge Project to GitHub

## Objective

This document explains how to push an existing local FlavorForge Git repository to the GitHub repository for the first time.

A person following this guide should be able to:

1. Verify the local repository.
2. Verify the GitHub remote.
3. Review files before committing.
4. Check for sensitive information.
5. Create a commit if required.
6. Push the correct branch to GitHub.
7. Verify the push locally and on GitHub.
8. Troubleshoot common first-push problems.

> **Important:** This guide does not assume that the local repository is brand new. If the local repository already contains commits, do not create an unnecessary "initial" commit.

---

# 1. Understand the Git Flow

Git does not directly upload every file in the project folder.

The normal Git workflow is:

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
GitHub Remote Repository
```

Therefore:

```text
git add
```

prepares changes.

```text
git commit
```

stores the changes in local Git history.

```text
git push
```

transfers commits to GitHub.

---

# 2. Open the FlavorForge Project

Open the WSL/Ubuntu terminal.

Run:

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

Verify the location:

```bash
pwd
```

Expected format:

```text
/home/YOUR_USERNAME/flavorforge-azure-devsecops-capstone
```

The Linux username may be different on another computer.

---

# 3. Verify Git

Run:

```bash
git --version
```

Example:

```text
git version 2.43.0
```

If Git is not installed, stop here and complete the Git installation from the prerequisites documentation.

---

# 4. Verify the Local Repository

Run:

```bash
git status
```

A valid Git repository should display information about the current branch and working tree.

For example:

```text
On branch main
```

If you see:

```text
fatal: not a git repository
```

verify that you are inside:

```text
~/flavorforge-azure-devsecops-capstone
```

---

# 5. Check the Current Branch

Run:

```bash
git branch --show-current
```

For the existing FlavorForge repository:

```text
main
```

The important thing is to identify the branch that will be pushed.

Do not blindly assume the branch is `main` without checking.

---

# 6. Check the GitHub Remote

Run:

```bash
git remote -v
```

For the existing FlavorForge repository:

```text
origin  https://github.com/shettymalathib/flavorforge-azure-devsecops-capstone.git (fetch)
origin  https://github.com/shettymalathib/flavorforge-azure-devsecops-capstone.git (push)
```

For another user:

```text
origin  https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git (fetch)
origin  https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git (push)
```

If SSH is being used:

```text
origin  git@github.com:YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git (fetch)
origin  git@github.com:YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git (push)
```

---

# 7. Verify `origin` Before Doing Anything Else

If `origin` already exists and points to the correct repository:

**Do nothing.**

Do not run:

```bash
git remote add origin ...
```

again.

If you run that command when `origin` already exists, Git may return:

```text
error: remote origin already exists.
```

If the remote is wrong, correct it with:

```bash
git remote set-url origin <CORRECT_REPOSITORY_URL>
```

Then verify:

```bash
git remote -v
```

---

# 8. Check the Working Tree

Run:

```bash
git status
```

Review anything listed as:

```text
modified
new file
deleted
untracked
```

Do not immediately run:

```bash
git add .
```

without first understanding what has changed.

---

# 9. Check for Sensitive Information

Before pushing the project to GitHub, make sure it does not contain credentials.

Check for files such as:

```text
.env
.env.*
*.pem
*.key
credentials.*
secret.*
```

Also check that the repository does not contain:

```text
GitHub Personal Access Tokens
GitHub passwords
Azure credentials
Azure client secrets
SSH private keys
Kubernetes secret values
Database passwords
Connection strings containing credentials
```

Never commit credentials simply because Git allows the file to be committed.

---

# 10. Verify `.gitignore`

Check that `.gitignore` exists:

```bash
ls -la
```

Then inspect it:

```bash
cat .gitignore
```

Typical entries may include:

```text
node_modules/
.env
.env.*
*.log
```

The exact `.gitignore` must match the actual project requirements.

**Do not replace an existing project `.gitignore` blindly.**

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

The `??` means the path is currently untracked.

Review every important untracked path before adding it.

---

# 12. Stage the Project Changes

If the changes have been reviewed and should be committed:

```bash
git add .
```

Then immediately check the staging area:

```bash
git status
```

This gives you an opportunity to catch unwanted files before creating the commit.

---

# 13. Review the Staged Changes

Check the summary:

```bash
git diff --cached --stat
```

For a detailed review:

```bash
git diff --cached
```

Look specifically for:

* credentials
* `.env` files
* private keys
* unnecessary generated files
* large files
* files that should have been ignored

---

# 14. Unstage a File If Necessary

If an unwanted file was staged, remove it from staging:

```bash
git restore --staged <FILE>
```

Example:

```bash
git restore --staged .env
```

Then verify:

```bash
git status
```

This does **not** delete the file from the computer. It only removes it from the staging area.

---

# 15. Decide Whether a Commit Is Required

There are two possible situations.

### Situation A — Changes are already committed

Check:

```bash
git status
```

If there are no changes that need committing, do **not** create another unnecessary commit.

You can proceed toward the push.

### Situation B — There are staged changes

Create a commit:

```bash
git commit -m "Initial FlavorForge project"
```

For an existing project, use an appropriate commit message rather than creating a fake "initial" commit.

For example:

```bash
git commit -m "docs: add BUILD-JOURNEY documentation"
```

The commit message should describe the actual change.

---

# 16. Verify the Local Commit History

Run:

```bash
git log --oneline -5
```

For the existing FlavorForge repository, the history already contains commits such as:

```text
c85aee2 documenting step by step implementation
10e784e docs: update generated documentation
cb6690f documenting step by step implementation
c640066 docs: update generated documentation
557c0a5 changes in root readme
```

The exact history will differ when the project is recreated by another person.

Do not manually reproduce these commit IDs.

---

# 17. Confirm the Branch Again

Run:

```bash
git branch --show-current
```

For FlavorForge:

```text
main
```

We now know:

```text
Local branch = main
```

---

# 18. Check Whether the GitHub Repository Is Empty

Before pushing, determine whether the remote repository already contains commits.

Run:

```bash
git ls-remote origin
```

If the repository is completely empty, there may be no branch references.

If the repository already contains a branch such as:

```text
refs/heads/main
```

then the remote already has Git history.

This distinction is important.

---

# 19. First Push to an Empty GitHub Repository

If:

* local branch is `main`
* GitHub repository is empty
* `origin` is correct
* authentication works

then push:

```bash
git push -u origin main
```

The `-u` option establishes the upstream relationship:

```text
local main
      |
      v
origin/main
```

After that, normal pushes can usually use:

```bash
git push
```

---

# 20. If the Local Branch Has Another Name

Check:

```bash
git branch --show-current
```

If the result is:

```text
master
```

or another name, do not automatically run:

```bash
git push -u origin main
```

If `main` is the intended project branch, rename the local branch:

```bash
git branch -M main
```

Then push:

```bash
git push -u origin main
```

Only rename the branch when that is actually the intended repository convention.

---

# 21. HTTPS Authentication During Push

If the remote uses HTTPS:

```text
https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git
```

Git may request credentials.

Enter:

```text
Username:
YOUR_GITHUB_USERNAME
```

For the password prompt, enter:

```text
YOUR_PERSONAL_ACCESS_TOKEN
```

Do **not** enter the normal GitHub account password.

The PAT should never be written into:

```text
README.md
documentation
scripts
source code
screenshots
videos
Git commits
```

---

# 22. SSH Authentication During Push

If the remote uses SSH:

```text
git@github.com:YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git
```

Git will use the configured SSH key.

You can test authentication first:

```bash
ssh -T git@github.com
```

If authentication succeeds:

```bash
git push -u origin main
```

---

# 23. Understand What `git push` Does

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

Git transfers commits that the remote does not already contain.

It does not simply upload every file from the folder.

---

# 24. Successful Push

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

The important result is:

```text
main -> main
```

and:

```text
branch 'main' set up to track 'origin/main'
```

---

# 25. Verify the Local Repository

After the push, run:

```bash
git status
```

A clean repository should look similar to:

```text
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

---

# 26. Verify Branch Tracking

Run:

```bash
git branch -vv
```

You should see that:

```text
main
```

tracks:

```text
origin/main
```

This confirms that the local branch is associated with the remote branch.

---

# 27. Verify the Remote Again

Run:

```bash
git remote -v
```

Confirm:

```text
origin
```

points to:

```text
flavorforge-azure-devsecops-capstone
```

for both:

```text
fetch
push
```

---

# 28. Verify the GitHub Repository

Open the FlavorForge repository in GitHub.

You should now see the project files, such as:

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

The exact contents depend on the project version.

---

# 29. Verify the README

Open:

```text
README.md
```

on GitHub.

Confirm that the project README is displayed correctly.

---

# 30. Verify the Commit History

Compare the latest local commit:

```bash
git log --oneline -5
```

with the commit history displayed on GitHub.

The latest pushed commit should appear on GitHub.

---

# 31. Important — What If the Push Is Rejected?

You may see:

```text
! [rejected] main -> main (non-fast-forward)
```

This normally means the GitHub repository already contains commits that are not present locally.

For example:

```text
Local history
      |
      | different history
      |
Remote history
```

This can happen if the GitHub repository was created with:

* README
* `.gitignore`
* LICENSE
* another initial commit

### Do not immediately run:

```bash
git push --force
```

First inspect the histories.

---

# 32. Why `git push --force` Is Dangerous

Force pushing can replace remote history.

For a beginner workflow, never use:

```bash
git push --force
```

as a first troubleshooting step.

First determine:

```text
What commits exist locally?
What commits exist remotely?
Are they supposed to be combined?
Is the remote repository disposable?
```

Then choose the appropriate recovery method.

---

# 33. Common Error — `remote origin already exists`

Run:

```bash
git remote -v
```

If the URL is correct:

**Do nothing.**

If the URL is incorrect:

```bash
git remote set-url origin <CORRECT_URL>
```

Then:

```bash
git remote -v
```

---

# 34. Common Error — Authentication Failed

For HTTPS, verify:

```text
GitHub username
PAT
PAT expiration
PAT permissions
Repository access
Repository URL
```

Remember:

```text
GitHub account password
        ≠
Git HTTPS password
```

The PAT is used for Git HTTPS authentication.

---

# 35. Common Error — Permission Denied (Public Key)

For SSH:

```bash
ssh -T git@github.com
```

Then:

```bash
ssh-add -l
```

Verify:

* SSH key exists
* private key is loaded
* public key is registered with GitHub
* correct GitHub account is being used
* remote URL uses SSH

---

# 36. Common Error — Repository Not Found

Run:

```bash
git remote -v
```

Check:

```text
GitHub username
Repository owner
Repository name
Authentication account
Repository access
```

The expected repository name is:

```text
flavorforge-azure-devsecops-capstone
```

---

# 37. Common Error — Files Are Missing on GitHub

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
File
 ↓
git add
 ↓
Staged
 ↓
git commit
 ↓
Local commit
 ↓
git push
 ↓
GitHub
```

A file existing in the local directory does not mean that it has been pushed to GitHub.

---

# 38. Final Verification Commands

Run:

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

The expected overall state is:

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

# 39. Existing FlavorForge Repository

The existing FlavorForge repository already contains Git history and has been connected to:

```text
https://github.com/shettymalathib/flavorforge-azure-devsecops-capstone.git
```

The local branch is:

```text
main
```

Therefore, when documenting or reproducing the project:

> Do not create unnecessary commits or reinitialize the repository simply because this guide is called "First Push."

The correct action depends on the actual state of the local and remote repositories.

---

# 40. Verification Checklist

Before moving to the next document:

* [ ] Correct FlavorForge project directory opened
* [ ] Git is installed
* [ ] Local Git repository verified
* [ ] Correct branch identified
* [ ] `origin` verified
* [ ] GitHub repository verified
* [ ] Sensitive files reviewed
* [ ] `.gitignore` reviewed
* [ ] Staged changes reviewed
* [ ] Required commit exists locally
* [ ] Authentication works
* [ ] Push completed successfully
* [ ] GitHub shows the project files
* [ ] GitHub shows the expected commit
* [ ] `main` tracks `origin/main`
* [ ] Working tree is clean

---

# 41. Reviewer Explanation

### "How did you perform the first push?"

> "I first verified the local Git repository, current branch, and GitHub remote. I reviewed the files and checked for sensitive information before staging and committing any required changes. Once the repository was ready and authentication was working, I pushed the `main` branch using `git push -u origin main`."

### "What does `-u` do?"

> "It establishes the upstream tracking relationship between the local `main` branch and `origin/main`. After that, normal `git push` and `git pull` commands can use the configured upstream branch."

### "What is the difference between commit and push?"

> "A commit records changes in the local Git repository. A push transfers those commits from the local repository to the remote GitHub repository."

### "Why might a file exist locally but not on GitHub?"

> "Because Git only pushes committed changes. The file may not have been staged and committed. I would check `git status`, stage the required file, create a commit, and push it."

### "Why shouldn't you use force push immediately?"

> "A force push can overwrite remote history. I first inspect the local and remote histories and determine why the push was rejected before deciding how to reconcile them."

---

# 42. Next Step

After the first push has been verified, continue with:

```text
06-verify-github-repository.md
```

The next document performs the final GitHub-side verification and confirms that the local FlavorForge repository and GitHub repository are correctly connected.
