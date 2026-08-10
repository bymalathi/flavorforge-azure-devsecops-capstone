# First Push — Upload the Local FlavorForge Project to GitHub

## Objective

This document records how the local FlavorForge repository was connected to GitHub and how the repository state was verified before pushing changes.

The actual FlavorForge repository was already a Git repository with existing commits. Therefore, we did **not** reinitialize Git or create an unnecessary initial commit.

The process was:

```text
Local FlavorForge Repository
        ↓
Verify Git
        ↓
Verify Branch
        ↓
Verify GitHub Remote
        ↓
Review Repository State
        ↓
Commit Required Changes
        ↓
Push to GitHub
        ↓
Verify GitHub Repository
```

---

# 1. Open the FlavorForge Repository

The FlavorForge project was created under the local WSL home directory.

Run:

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

Verify the current directory:

```bash
pwd
```

Actual result:

```text
/home/malathi/flavorforge-azure-devsecops-capstone
```

This confirmed that the terminal was operating inside the FlavorForge project.

---

# 2. Verify Git Installation

Run:

```bash
git --version
```

Actual result:

```text
git version 2.43.0
```

This confirmed that Git was installed and available in the WSL environment.

---

# 3. Verify the Local Git Repository

Run:

```bash
git status
```

The repository reported:

```text
On branch main
```

This confirmed that the FlavorForge project was already initialized as a Git repository.

The repository was **not** initialized again with:

```bash
git init
```

because Git history already existed.

---

# 4. Verify the Current Branch

Run:

```bash
git branch --show-current
```

Actual result:

```text
main
```

Therefore:

```text
Local branch = main
```

This was the branch used for the FlavorForge repository.

---

# 5. Verify the GitHub Remote

Run:

```bash
git remote -v
```

Actual result:

```text
origin  https://github.com/shettymalathib/flavorforge-azure-devsecops-capstone.git (fetch)
origin  https://github.com/shettymalathib/flavorforge-azure-devsecops-capstone.git (push)
```

The GitHub repository configured as `origin` was:

```text
https://github.com/shettymalathib/flavorforge-azure-devsecops-capstone.git
```

The remote was already configured correctly.

Therefore, we did **not** run:

```bash
git remote add origin ...
```

again.

---

# 6. Verify the Exact Remote URL

Run:

```bash
git remote get-url origin
```

Actual result:

```text
https://github.com/shettymalathib/flavorforge-azure-devsecops-capstone.git
```

This confirmed that `origin` pointed to the intended FlavorForge GitHub repository.

---

# 7. Verify the Local Repository State

Run:

```bash
git status
```

At the time of verification, Git reported:

```text
On branch main
Your branch is behind 'origin/main' by 1 commit, and can be fast-forwarded.
```

Git also reported modified BUILD-JOURNEY documentation files.

The modified files included:

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

This showed that the repository contained existing local documentation changes.

---

# 8. Check the Repository Structure

The FlavorForge repository contained the main application and DevOps components:

```text
frontend/
backend/
docker/
kubernetes/
argocd/
docs/
scripts/
screenshots/
videos/
azure-pipelines.yml
argocd-pipeline.yml
README.md
```

The BUILD-JOURNEY documentation was stored under:

```text
docs/week-4/BUILD-JOURNEY/
```

The supporting screenshots were stored under:

```text
screenshots/build-journey/
```

The supporting videos were stored under:

```text
videos/BUILD-JOURNEY/
```

---

# 9. Review Git Changes Before Committing

Before committing documentation changes, the working tree was checked using:

```bash
git status
```

Git clearly identified the modified files.

This allowed the changes to be reviewed before staging them.

The important principle used in the FlavorForge repository was:

```text
Working Directory
        ↓
Review changes
        ↓
git add
        ↓
Staging Area
        ↓
git commit
        ↓
Local Git history
        ↓
git push
        ↓
GitHub
```

---

# 10. Review the Changes

For a summary of the changes:

```bash
git diff --stat
```

For the detailed changes:

```bash
git diff
```

These commands allow the documentation changes to be reviewed before they are committed.

---

# 11. Stage the Required Changes

After reviewing the documentation changes, the required files can be staged.

For the complete reviewed working tree:

```bash
git add .
```

Then verify the staging area:

```bash
git status
```

The staged files should be reviewed before creating the commit.

---

# 12. Review Staged Changes

Run:

```bash
git diff --cached --stat
```

For the complete staged content:

```bash
git diff --cached
```

This provides the final check before committing.

The review should confirm that only intended project changes are being committed.

---

# 13. Create the Commit

Because the FlavorForge repository already contained Git history, the project did not require an artificial:

```text
Initial commit
```

Instead, the commit message should describe the actual change.

For documentation changes, the commit can be:

```bash
git commit -m "docs: update BUILD-JOURNEY documentation"
```

The commit message should reflect the actual work being committed.

---

# 14. Verify the Commit

After committing, check the recent Git history:

```bash
git log --oneline -5
```

The FlavorForge repository already contained multiple commits.

Examples from the repository history included:

```text
c85aee2 documenting step by step implementation
10e784e docs: update generated documentation
cb6690f documenting step by step implementation
c640066 docs: update generated documentation
557c0a5 changes in root readme
```

Commit IDs are historical evidence from the actual repository and should not be manually reproduced when recreating the project.

---

# 15. Verify the Branch Again

Run:

```bash
git branch --show-current
```

Expected result:

```text
main
```

Therefore:

```text
Local branch
    ↓
main
```

---

# 16. Push the Main Branch

Once the required changes have been committed and the remote has been verified, push the branch:

```bash
git push -u origin main
```

The command establishes the upstream relationship:

```text
local main
     ↓
origin/main
```

After the upstream relationship is established, future pushes can normally use:

```bash
git push
```

---

# 17. Verify the Push

After pushing, run:

```bash
git status
```

The desired state is:

```text
On branch main
Your branch is up to date with 'origin/main'.
nothing to commit, working tree clean
```

If local changes are still reported, the repository still contains uncommitted work.

---

# 18. Verify Branch Tracking

Run:

```bash
git branch -vv
```

The local `main` branch should show that it tracks:

```text
origin/main
```

This confirms the local and remote branch relationship.

---

# 19. Verify the Remote Again

Run:

```bash
git remote -v
```

Confirm that both fetch and push point to:

```text
https://github.com/shettymalathib/flavorforge-azure-devsecops-capstone.git
```

The expected configuration is:

```text
origin → FlavorForge GitHub repository
```

---

# 20. Git Verification Evidence

The repository contains recorded evidence for the GitHub setup and verification process.

### GitHub repository evidence

![](/screenshots/build-journey/02-github/01-github-repository.png)

### Local repository and GitHub remote

![](/screenshots/build-journey/02-github/github-local-repository-remote.png)

### Git verification recording

![](/videos/BUILD-JOURNEY/02-git-verification.mp4)

These files provide visual evidence of the GitHub and local Git setup.

---

# 21. Verify the GitHub Repository

Open the FlavorForge repository in GitHub:

```text
flavorforge-azure-devsecops-capstone
```

The repository should contain the project structure, including:

```text
frontend/
backend/
docker/
kubernetes/
argocd/
docs/
scripts/
screenshots/
videos/
azure-pipelines.yml
README.md
```

The exact contents depend on the commit being verified.

---

# 22. Verify the README

Open `README.md` in the GitHub repository.

Confirm that:

```text
README.md
```

is present and rendered correctly.

This verifies that the project documentation was pushed along with the application and DevOps files.

---

# 23. Verify the Commit History on GitHub

Run locally:

```bash
git log --oneline -5
```

Then compare the latest local commit with the commit history displayed on GitHub.

The latest pushed commit should appear in the GitHub repository.

---

# 24. If the Push Says the Branch Is Behind

The FlavorForge repository was observed in the following state:

```text
Your branch is behind 'origin/main' by 1 commit, and can be fast-forwarded.
```

This means the remote contains a commit that the local branch does not yet contain.

Before pushing new local work, synchronize the local branch when appropriate:

```bash
git pull --ff-only
```

The `--ff-only` option allows Git to update the local branch only when the histories can be fast-forwarded.

After synchronization, verify:

```bash
git status
```

Then continue with the required local changes and push.

---

# 25. Do Not Force Push as the First Solution

If Git rejects a push because the local and remote histories differ, do **not** immediately run:

```bash
git push --force
```

First determine:

```text
What exists locally?
What exists remotely?
Why are the histories different?
Should the histories be combined?
```

A force push can overwrite remote history and should not be used as a routine first-push solution.

---

# 26. Common Problem — `remote origin already exists`

If this command:

```bash
git remote add origin <URL>
```

returns:

```text
error: remote origin already exists.
```

check the existing remote:

```bash
git remote -v
```

If it already points to:

```text
https://github.com/shettymalathib/flavorforge-azure-devsecops-capstone.git
```

do nothing.

If the URL is incorrect, update it:

```bash
git remote set-url origin <CORRECT_URL>
```

Then verify:

```bash
git remote -v
```

---

# 27. Common Problem — Authentication Failure

If GitHub rejects authentication, verify:

```text
GitHub account
Repository access
Remote URL
Authentication method
```

For HTTPS authentication, GitHub may require a Personal Access Token rather than the normal account password.

The token must never be committed into:

```text
source code
documentation
README files
scripts
Git commits
```

---

# 28. Common Problem — Repository Not Found

Run:

```bash
git remote -v
```

Check:

```text
GitHub username
Repository owner
Repository name
Repository access
```

For FlavorForge, the repository name is:

```text
flavorforge-azure-devsecops-capstone
```

---

# 29. Common Problem — Files Are Missing on GitHub

If a file exists locally but does not appear on GitHub, verify:

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
Local Git history
 ↓
git push
 ↓
GitHub
```

A file existing in the project directory does not automatically mean that it exists in the GitHub repository.

---

# 30. Final Verification

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

The desired final state is:

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

# 31. Actual FlavorForge Repository State

The actual FlavorForge repository already had:

```text
Git repository
    ↓
main branch
    ↓
origin remote
    ↓
GitHub FlavorForge repository
```

The verified GitHub remote was:

```text
https://github.com/shettymalathib/flavorforge-azure-devsecops-capstone.git
```

The verified local branch was:

```text
main
```

Git version was:

```text
2.43.0
```

Therefore, this BUILD-JOURNEY step is documenting the **actual repository connection and push workflow**, not creating a new Git repository from scratch.

---

# 32. Verification Checklist

Before continuing:

* [ ] FlavorForge project directory verified
* [ ] Git installed and verified
* [ ] Local Git repository verified
* [ ] Current branch verified as `main`
* [ ] `origin` remote verified
* [ ] GitHub repository verified
* [ ] Working tree reviewed
* [ ] Changes reviewed before staging
* [ ] Staged changes reviewed
* [ ] Required commit created
* [ ] `main` pushed to GitHub
* [ ] Remote branch verified
* [ ] GitHub repository files verified
* [ ] GitHub commit history verified
* [ ] Local branch tracks `origin/main`
* [ ] Working tree verified

---

# 33. Reviewer Explanation

### How did you perform the first push?

> "I first verified the local FlavorForge Git repository, the current `main` branch, and the GitHub `origin` remote. Since the repository already had Git history, I did not reinitialize it or create an unnecessary initial commit. I reviewed the required documentation changes, committed them, and pushed the `main` branch to the configured GitHub repository."

### What does `git push -u origin main` do?

> "It pushes the local `main` branch to the `main` branch on the `origin` remote and establishes the upstream tracking relationship. After that, normal `git push` commands can be used."

### What is the difference between commit and push?

> "A commit records changes in the local Git repository. A push transfers those commits to the remote GitHub repository."

### Why can a file exist locally but not on GitHub?

> "Because the file may not have been staged, committed, and pushed. Git tracks commits, not simply everything that exists in the project folder."

### Why should force push not be the first solution?

> "Because force push can overwrite remote history. I would first inspect the local and remote histories and understand why the push was rejected."

---

# 34. Next Step

After the first push and local/remote relationship have been verified, continue with:

```text
06-verify-github-repository.md
```

The next document performs the GitHub-side verification of the FlavorForge repository.
