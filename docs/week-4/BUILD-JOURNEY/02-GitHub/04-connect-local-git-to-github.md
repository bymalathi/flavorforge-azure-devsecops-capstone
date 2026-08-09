# Connect Local Git Repository to GitHub

## Objective

This document explains how to connect an existing local FlavorForge Git repository to the GitHub repository created in the previous steps.

A person following this guide should be able to:

1. Open the local project in WSL.
2. Confirm that Git is installed.
3. Confirm that the project is already a Git repository.
4. Check the current branch.
5. Check whether a GitHub remote already exists.
6. Add the GitHub remote if it does not exist.
7. Correct the remote if it points to the wrong repository.
8. Verify the connection.
9. Understand what `origin` means.
10. Prepare the repository for the first push.

---

# 1. Understand What We Are Connecting

At this stage, two things already exist.

### Local project

The FlavorForge project exists on the developer's computer:

```text
~/flavorforge-azure-devsecops-capstone
```

### GitHub repository

The remote repository exists on GitHub:

```text
https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git
```

We need Git to know that these two repositories belong together.

The relationship is:

```text
Local FlavorForge Project
        |
        | Git
        |
        v
Local Git Repository
        |
        | origin
        |
        v
GitHub Remote Repository
```

---

# 2. Open the FlavorForge Project

Open the WSL/Ubuntu terminal.

Move into the project directory:

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

Verify the current directory:

```bash
pwd
```

Expected:

```text
/home/YOUR_LINUX_USERNAME/flavorforge-azure-devsecops-capstone
```

The username and exact path may be different on another computer.

---

# 3. Verify Git

Check that Git is available:

```bash
git --version
```

Example:

```text
git version 2.43.0
```

If Git is not installed, return to the prerequisites documentation and install it before continuing.

---

# 4. Verify That This Is a Git Repository

Run:

```bash
git status
```

If the project is already a Git repository, Git will display information about the working tree and branch.

For example:

```text
On branch main
```

If you see:

```text
fatal: not a git repository
```

you are either:

1. In the wrong directory, or
2. The project has not yet been initialized as a Git repository.

First check:

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

---

# 5. Check the Current Branch

Run:

```bash
git branch --show-current
```

For the existing FlavorForge repository, the branch is:

```text
main
```

The expected output is:

```text
main
```

The branch name may be different for another project.

Do not rename the branch just because another tutorial uses a different name.

---

# 6. Check the Existing Git Remote

This is one of the most important steps.

Run:

```bash
git remote -v
```

A correctly connected repository may show:

```text
origin  https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git (fetch)
origin  https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git (push)
```

For the existing FlavorForge repository, the remote is:

```text
origin  https://github.com/shettymalathib/flavorforge-azure-devsecops-capstone.git (fetch)
origin  https://github.com/shettymalathib/flavorforge-azure-devsecops-capstone.git (push)
```

---

# 7. What Is `origin`?

`origin` is simply the conventional name given to a Git remote.

It is not:

* a GitHub account
* a password
* a token
* a branch
* a GitHub organization

It is a local name that points to a remote repository.

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

Git understands:

```text
Push the main branch
to the remote repository named origin
```

---

# 8. Scenario A — `origin` Already Exists and Is Correct

If you run:

```bash
git remote -v
```

and see the correct FlavorForge GitHub repository:

```text
origin  https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git (fetch)
origin  https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git (push)
```

**Do not run:**

```bash
git remote add origin ...
```

The remote is already configured.

You do not need to add it again.

Continue to the verification section.

---

# 9. Why Shouldn't We Run `git remote add origin` Again?

Suppose `origin` already exists.

If you run:

```bash
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git
```

Git may return:

```text
error: remote origin already exists.
```

This does not mean the repository is broken.

It simply means:

> A remote named `origin` has already been configured.

Always check first:

```bash
git remote -v
```

---

# 10. Scenario B — No Remote Exists

If:

```bash
git remote -v
```

returns no output, the local Git repository does not currently have a remote configured.

In that situation, add the GitHub repository.

For HTTPS:

```bash
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git
```

Replace:

```text
YOUR_GITHUB_USERNAME
```

with the actual GitHub username.

Example:

```bash
git remote add origin https://github.com/example-user/flavorforge-azure-devsecops-capstone.git
```

Then verify:

```bash
git remote -v
```

You should see:

```text
origin  https://github.com/example-user/flavorforge-azure-devsecops-capstone.git (fetch)
origin  https://github.com/example-user/flavorforge-azure-devsecops-capstone.git (push)
```

---

# 11. Scenario C — `origin` Exists but Points to the Wrong Repository

Sometimes a local repository already has a remote, but it points somewhere else.

Check:

```bash
git remote -v
```

For example, suppose it shows:

```text
origin  https://github.com/example-user/old-project.git (fetch)
origin  https://github.com/example-user/old-project.git (push)
```

but the correct repository is:

```text
https://github.com/example-user/flavorforge-azure-devsecops-capstone.git
```

Do not add another `origin`.

Instead, change the existing remote:

```bash
git remote set-url origin https://github.com/example-user/flavorforge-azure-devsecops-capstone.git
```

Then verify:

```bash
git remote -v
```

---

# 12. Scenario D — You Want to Use SSH Instead

The authentication documentation provides two options:

```text
HTTPS + PAT
```

or:

```text
SSH
```

If SSH was selected and configured successfully, the remote can use:

```text
git@github.com:YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git
```

If `origin` already exists, change it using:

```bash
git remote set-url origin git@github.com:YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git
```

Then verify:

```bash
git remote -v
```

Expected:

```text
origin  git@github.com:YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git (fetch)
origin  git@github.com:YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git (push)
```

Do not switch from HTTPS to SSH unless you have intentionally chosen SSH authentication.

---

# 13. Verify the Remote Repository

Run:

```bash
git remote -v
```

Confirm all of the following:

* Remote name is `origin`
* GitHub username is correct
* Repository name is correct
* The URL points to the intended repository
* Fetch and push URLs are correct

Expected HTTPS format:

```text
origin  https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git (fetch)
origin  https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git (push)
```

Expected SSH format:

```text
origin  git@github.com:YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git (fetch)
origin  git@github.com:YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git (push)
```

---

# 14. Check the Full Git Status

Run:

```bash
git status --short --branch
```

Example:

```text
## main...origin/main
```

or:

```text
## main...origin/main [behind 1]
```

You may also see untracked files, for example:

```text
?? docs/BUILD-JOURNEY/
```

This means Git sees files that have not yet been committed.

It does **not** mean the GitHub connection is broken.

---

# 15. Understand `[behind 1]`

You may see:

```text
## main...origin/main [behind 1]
```

This means the local branch and remote branch do not currently have exactly the same commit history.

In this example:

```text
Local main
     |
     | one commit behind
     v
Remote main
```

It does not automatically mean there is a problem.

Do not blindly run commands such as:

```bash
git reset --hard
```

just because you see `[behind 1]`.

First understand what changed.

You can inspect the difference using:

```bash
git log --oneline --decorate --graph --all -10
```

---

# 16. Check the Remote Branches

Run:

```bash
git branch -r
```

You may see:

```text
origin/main
```

This means Git knows about the remote `main` branch.

You can also run:

```bash
git remote show origin
```

This provides additional information about the remote repository.

---

# 17. Verify GitHub Access

After authentication has been configured, test communication with GitHub.

For HTTPS, you can test by performing a Git operation such as:

```bash
git ls-remote origin
```

If authentication is required, Git may ask for credentials.

For HTTPS:

```text
Username:
YOUR_GITHUB_USERNAME

Password:
YOUR_PERSONAL_ACCESS_TOKEN
```

Remember:

> The PAT is used in place of the GitHub account password for Git HTTPS authentication.

For SSH, first verify:

```bash
ssh -T git@github.com
```

Then:

```bash
git ls-remote origin
```

A successful `git ls-remote origin` demonstrates that Git can communicate with the configured remote.

---

# 18. Important: We Are Not Pushing Yet

This document is about **connecting** the repositories.

We are not yet performing the first project push.

The next document handles:

```text
git add
git commit
git push
```

That step is documented separately in:

```text
05-first-push.md
```

This separation is intentional.

It helps a beginner understand the difference between:

```text
Connect
```

and:

```text
Push
```

---

# 19. Complete Connection Flow

The complete process is:

```text
1. Open local project
        |
        v
2. Check Git
        |
        v
3. Check Git repository
        |
        v
4. Check current branch
        |
        v
5. Run git remote -v
        |
        v
6. Does origin exist?
       / \
     YES  NO
      |    |
      |    v
      |   git remote add origin ...
      |
      v
7. Is origin correct?
       / \
     YES  NO
      |    |
      |    v
      |   git remote set-url origin ...
      |
      v
8. Verify git remote -v
        |
        v
9. Verify GitHub access
        |
        v
10. Continue to first push
```

---

# 20. Commands Used in This Step

For quick reference:

### Enter the project

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

### Check Git

```bash
git --version
```

### Check repository

```bash
git status
```

### Check branch

```bash
git branch --show-current
```

### Check remote

```bash
git remote -v
```

### Add a remote when none exists

```bash
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git
```

### Change an existing remote

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

### Test remote access

```bash
git ls-remote origin
```

---

# 21. Existing FlavorForge Verification

For the existing FlavorForge project, the following commands were used:

```bash
git --version
```

Result:

```text
git version 2.43.0
```

The current branch is:

```text
main
```

The configured remote is:

```text
origin
```

and points to:

```text
https://github.com/shettymalathib/flavorforge-azure-devsecops-capstone.git
```

Therefore, the existing local FlavorForge repository is already connected to its GitHub repository.

No additional:

```bash
git remote add origin ...
```

command is required for the existing repository.

---

# 22. Important Security Rules

Never put credentials directly into a Git remote URL.

Do not use URLs such as:

```text
https://USERNAME:PASSWORD@github.com/...
```

or:

```text
https://USERNAME:TOKEN@github.com/...
```

Do not commit credentials into:

```text
README.md
*.md
.env
YAML files
source code
scripts
Git configuration files
```

Do not share:

```text
PAT
SSH private key
GitHub password
Azure credentials
```

Only the repository URL should be present in normal Git remote configuration.

---

# 23. Common Problems

## Problem: `remote origin already exists`

Run:

```bash
git remote -v
```

If it is correct, do nothing.

If it is incorrect:

```bash
git remote set-url origin <correct-url>
```

---

## Problem: `fatal: not a git repository`

Check:

```bash
pwd
```

Then:

```bash
ls -la
```

Move into the correct project directory.

---

## Problem: `Repository not found`

Check:

```bash
git remote -v
```

Verify:

* GitHub username
* repository name
* repository visibility
* authentication
* repository access

---

## Problem: Authentication failed

For HTTPS, check:

* PAT is valid
* PAT has not expired
* PAT has the required permissions
* correct GitHub account is being used
* repository URL is correct

Do not use your normal GitHub password.

---

## Problem: `Permission denied (publickey)`

For SSH, check:

```bash
ssh -T git@github.com
```

Then:

```bash
ssh-add -l
```

Verify that the correct public key was added to the intended GitHub account.

---

# 24. Reviewer Explanation

### "How did you connect your local repository to GitHub?"

> "I first verified that the FlavorForge project was already a local Git repository. Then I checked the configured remote using `git remote -v`. The remote named `origin` points to the FlavorForge GitHub repository. If a remote had not existed, I would have used `git remote add origin`. If it pointed to the wrong repository, I would use `git remote set-url`."

### "What does `git remote -v` do?"

> "It displays the remote repositories configured for the local Git repository, including the URLs used for fetching and pushing."

### "Why do you use `origin`?"

> "`origin` is the conventional local name for the main remote repository. It is just a Git remote name and can technically be changed."

### "Did you create another Git repository locally?"

> "No. The FlavorForge project was already a Git repository. I verified the existing repository and connected its remote to GitHub."

### "Does `git remote -v` authenticate you?"

> "No. `git remote -v` only displays the configured remote URL. Authentication happens when Git communicates with the remote, for example during fetch, pull, push, or `git ls-remote`."

---

# 25. Verification Checklist

Before moving to the first push, confirm:

* [ ] Inside the correct FlavorForge project directory
* [ ] Git is installed
* [ ] Project is a Git repository
* [ ] Correct branch is selected
* [ ] `origin` has been checked
* [ ] `origin` points to the correct GitHub repository
* [ ] Authentication method has been configured
* [ ] GitHub access has been tested
* [ ] No credentials were placed in the remote URL
* [ ] No credentials were committed to the project

---

# 26. Next Step

The local Git repository is now connected to the GitHub repository.

Continue with:

```text
05-first-push.md
```

The next document explains how to safely:

```text
git add
    ↓
git commit
    ↓
git push
```

and upload the local FlavorForge project to GitHub for the first time.
