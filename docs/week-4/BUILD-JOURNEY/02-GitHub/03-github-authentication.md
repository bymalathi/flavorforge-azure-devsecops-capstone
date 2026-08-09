# GitHub Authentication — HTTPS PAT and SSH

## Objective

This document explains how Git authenticates with GitHub when working with the FlavorForge repository.

There are two supported authentication methods:

1. **HTTPS + Personal Access Token (PAT)**
2. **SSH key authentication**

A person only needs to configure **one** method.

The existing FlavorForge repository uses **HTTPS**. SSH is documented as an alternative for someone setting up the project from scratch.

---

# 1. Why Is Authentication Needed?

When Git communicates with GitHub, GitHub needs to verify that the user has permission to access the repository.

For example:

```text
Local Computer
      |
      | git push
      v
GitHub
```

Authentication answers:

> "Who is making this Git request, and are they allowed to access the repository?"

Without valid authentication, GitHub can reject operations such as:

```bash
git push
git pull
git fetch
```

---

# 2. Authentication vs Remote — Important Difference

Authentication and the Git remote are **not the same thing**.

### Authentication

Authentication answers:

> "How does GitHub verify me?"

Examples:

```text
Personal Access Token
SSH key
```

### Remote

The remote answers:

> "Which GitHub repository should Git communicate with?"

Example:

```text
origin
```

pointing to:

```text
https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git
```

or:

```text
git@github.com:YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git
```

This distinction is important because you can change the authentication method without changing the repository itself.

---

# 3. Choose One Authentication Method

There are two supported approaches.

## Option A — HTTPS + Personal Access Token

```text
Local Git
    |
    | HTTPS
    | Personal Access Token
    v
GitHub
```

Example repository URL:

```text
https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git
```

## Option B — SSH

```text
Local Git
    |
    | SSH
    | SSH key
    v
GitHub
```

Example repository URL:

```text
git@github.com:YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git
```

### Which one should I choose?

Both are valid.

For this project:

```text
Existing FlavorForge setup
→ HTTPS
```

For a new user:

```text
HTTPS + PAT
```

is usually straightforward to understand.

SSH is also a common choice for developers who frequently use Git from Linux or WSL.

> **Choose one method. Do not configure both unless you have a specific reason.**

---

# 4. Before Starting

Make sure:

* GitHub account exists.
* GitHub email has been verified.
* FlavorForge GitHub repository has already been created.
* WSL Ubuntu is available.
* Git is installed.

Check Git:

```bash
git --version
```

Expected:

```text
git version <version>
```

Authentication is configured from the WSL terminal.

---

# OPTION A — HTTPS + PERSONAL ACCESS TOKEN

# 5. What Is a Personal Access Token?

A Personal Access Token (PAT) is a credential that can be used to authenticate Git operations over HTTPS.

Conceptually:

```text
Git
 |
 | HTTPS
 |
 | Username + PAT
 v
GitHub
```

The PAT is used instead of the normal GitHub account password for Git HTTPS authentication.

Treat the PAT like a password.

---

# 6. PAT Security Rules

A PAT must never be committed or published.

Never put a PAT into:

```text
README.md
documentation
Git commits
source code
pipeline YAML
screenshots
screen recordings
videos
chat messages
public notes
```

Never publish token values such as:

```text
ghp_...
github_pat_...
```

If a PAT is accidentally exposed:

1. Revoke the token.
2. Create a replacement token.
3. Update any system that was using the old token.
4. Check whether the exposed token appeared in Git history or other public locations.

Simply deleting a token from the latest file does not necessarily remove it from Git history.

---

# 7. Create a Personal Access Token

Sign in to GitHub.

Open:

```text
Profile picture
→ Settings
→ Developer settings
→ Personal access tokens
```

GitHub provides different token types, including:

```text
Fine-grained personal access tokens
Personal access tokens (classic)
```

For new setups, prefer a **fine-grained token** when it supports the required workflow because it can be restricted to specific repositories and permissions.

Use a classic token only when it is specifically required by your environment or workflow.

---

# 8. Create a Fine-Grained PAT

If using a fine-grained token, select the option to create a new fine-grained token.

GitHub will ask for settings such as:

```text
Token name
Expiration
Resource owner
Repository access
Permissions
```

Use a descriptive token name.

Example:

```text
FlavorForge Git HTTPS
```

---

# 9. Choose the Token Expiration

Select an appropriate expiration period.

A limited lifetime is preferable to an unnecessarily long-lived credential.

For a temporary project or learning exercise, use a reasonable expiration period.

When the token expires, create a new token rather than extending access unnecessarily.

---

# 10. Restrict Repository Access

When GitHub asks which repositories the token can access, avoid granting access to every repository unless it is actually required.

For the FlavorForge project, select only:

```text
flavorforge-azure-devsecops-capstone
```

when the GitHub interface provides repository-specific access.

This follows the principle:

> Give a credential only the access required for its task.

---

# 11. Configure Repository Permissions

For a normal Git workflow, the token needs enough repository access to perform the operations required by the project.

Typical operations are:

```text
clone
fetch
pull
push
```

For a fine-grained token, configure the minimum repository permissions necessary for reading and writing repository contents.

GitHub's permission names and UI can change, so follow the permissions currently displayed by GitHub.

Do not grant unrelated administrative permissions simply because they are available.

---

# 12. Create the Token

Review the settings.

Then select:

**Generate token**

GitHub may display the token only once.

If so, copy it securely at this point.

Do not put the token into the project.

---

# 13. What Happens When Git Asks for a Password?

When Git uses an HTTPS remote, it may ask:

```text
Username:
```

Enter:

```text
YOUR_GITHUB_USERNAME
```

If Git asks:

```text
Password:
```

enter the:

```text
PERSONAL_ACCESS_TOKEN
```

Do **not** enter the normal GitHub account password.

The PAT is the credential used for Git HTTPS authentication.

---

# 14. Verify the HTTPS Remote

From the WSL terminal, go to the FlavorForge project:

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

Check the remote:

```bash
git remote -v
```

For the existing FlavorForge repository, the expected remote is:

```text
origin  https://github.com/shettymalathib/flavorforge-azure-devsecops-capstone.git (fetch)
origin  https://github.com/shettymalathib/flavorforge-azure-devsecops-capstone.git (push)
```

For a new user, it will look like:

```text
origin  https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git (fetch)
origin  https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git (push)
```

If the remote is already correct, do not add it again.

---

# 15. Test HTTPS Authentication

Once the remote is correct, authentication can be tested with a Git operation.

For example:

```bash
git fetch origin
```

If Git asks for credentials:

```text
Username:
YOUR_GITHUB_USERNAME
```

and:

```text
Password:
YOUR_PERSONAL_ACCESS_TOKEN
```

A successful fetch indicates that Git can authenticate and communicate with the repository.

---

# OPTION B — SSH AUTHENTICATION

# 16. What Is SSH Authentication?

SSH authentication uses a cryptographic key pair instead of a PAT.

The key pair contains:

```text
Private key
+
Public key
```

The relationship is:

```text
Local Computer
      |
      | Private key
      v
SSH authentication
      |
      v
GitHub
      |
      | Public key registered with GitHub
      v
Repository
```

The private key stays on the local computer.

The public key is added to GitHub.

---

# 17. SSH Security Rules

### Private key

Example:

```text
~/.ssh/id_ed25519
```

This must remain private.

Never:

* upload it to GitHub
* commit it to Git
* put it in documentation
* include it in screenshots
* include it in videos
* send it to another person

### Public key

Example:

```text
~/.ssh/id_ed25519.pub
```

This is the key that is added to GitHub.

Only the public key should be copied into GitHub.

---

# 18. Check Whether an SSH Key Already Exists

From WSL, run:

```bash
ls -al ~/.ssh
```

Look for keys such as:

```text
id_ed25519
id_ed25519.pub
```

or:

```text
id_rsa
id_rsa.pub
```

If you already have an appropriate SSH key, you may be able to use it.

Do not create additional keys unnecessarily.

You can also check specifically for public keys:

```bash
ls -al ~/.ssh/*.pub
```

---

# 19. Check Whether SSH Is Installed

Run:

```bash
ssh -V
```

If SSH is installed, you should see version information.

If it is missing, install the OpenSSH client:

```bash
sudo apt update
```

Then:

```bash
sudo apt install openssh-client -y
```

Verify again:

```bash
ssh -V
```

---

# 20. Generate an SSH Key

If you do not already have an appropriate SSH key, generate an Ed25519 key:

```bash
ssh-keygen -t ed25519 -C "YOUR_GITHUB_EMAIL"
```

Replace:

```text
YOUR_GITHUB_EMAIL
```

with the email associated with your GitHub account.

When prompted:

```text
Enter file in which to save the key:
```

Press:

```text
Enter
```

to accept the default location.

When prompted for a passphrase, using a passphrase is recommended.

The generated files will normally be:

```text
~/.ssh/id_ed25519
```

and:

```text
~/.ssh/id_ed25519.pub
```

---

# 21. Verify the SSH Key Files

Run:

```bash
ls -al ~/.ssh
```

You should see:

```text
id_ed25519
id_ed25519.pub
```

Remember:

```text
id_ed25519
```

is the private key.

```text
id_ed25519.pub
```

is the public key.

---

# 22. Start the SSH Agent

Run:

```bash
eval "$(ssh-agent -s)"
```

You should see output similar to:

```text
Agent pid 1234
```

The process ID will be different on different systems.

---

# 23. Add the Private Key to the SSH Agent

Run:

```bash
ssh-add ~/.ssh/id_ed25519
```

If you configured a passphrase, SSH may ask you to enter it.

The private key remains on your computer.

The SSH agent simply makes the key available for authentication.

---

# 24. Copy the Public Key

Run:

```bash
cat ~/.ssh/id_ed25519.pub
```

The output will look similar to:

```text
ssh-ed25519 AAAA... YOUR_GITHUB_EMAIL
```

Copy the entire line.

Do **not** run or copy:

```bash
cat ~/.ssh/id_ed25519
```

That would display the private key.

---

# 25. Add the Public Key to GitHub

In GitHub:

1. Select your profile picture.
2. Select **Settings**.
3. Select **SSH and GPG keys**.
4. Select **New SSH key**.
5. Enter a descriptive title.

Example:

```text
FlavorForge WSL
```

6. Select the appropriate key type shown by GitHub.
7. Paste the contents of:

```bash
cat ~/.ssh/id_ed25519.pub
```

into the key field.
8. Select:

**Add SSH key**

GitHub may request additional authentication before allowing the key to be added.

---

# 26. Test the SSH Connection

From WSL, run:

```bash
ssh -T git@github.com
```

The first connection may display a message asking whether you trust GitHub's host key.

Verify that the host is GitHub.

Then enter:

```text
yes
```

A successful authentication response indicates that GitHub recognizes the SSH key.

GitHub does not provide an interactive shell through this connection, so a message explaining that shell access is not provided can still mean that SSH authentication succeeded.

---

# 27. Configure the Git Remote for SSH

If you choose SSH, the remote should use the SSH format:

```text
git@github.com:YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git
```

If `origin` already exists, change it with:

```bash
git remote set-url origin git@github.com:YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git
```

Replace:

```text
YOUR_GITHUB_USERNAME
```

with your GitHub username.

Verify:

```bash
git remote -v
```

Expected:

```text
origin  git@github.com:YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git (fetch)
origin  git@github.com:YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git (push)
```

---

# 28. Test the SSH Git Connection

Once the SSH remote is configured, run:

```bash
git fetch origin
```

If the command completes successfully, Git can communicate with the GitHub repository using SSH.

---

# 29. HTTPS vs SSH

| Feature                   | HTTPS + PAT           | SSH                       |
| ------------------------- | --------------------- | ------------------------- |
| Protocol                  | HTTPS                 | SSH                       |
| Authentication            | Personal Access Token | SSH key pair              |
| GitHub password used      | No                    | No                        |
| Private key required      | No                    | Yes                       |
| PAT required              | Yes                   | No                        |
| Beginner friendly         | Yes                   | Moderate                  |
| Good for frequent Git use | Yes                   | Yes                       |
| Credential expiration     | Depends on PAT        | Depends on key management |
| Main security requirement | Protect PAT           | Protect private key       |

Both methods are valid.

The important point is to protect whichever credential you choose.

---

# 30. Which Authentication Does FlavorForge Use?

The existing FlavorForge repository uses:

```text
HTTPS
```

The current remote is:

```text
https://github.com/shettymalathib/flavorforge-azure-devsecops-capstone.git
```

Therefore, the existing FlavorForge setup should **not** be changed merely because this document also explains SSH.

SSH is included as an alternative for someone recreating the project.

---

# 31. Do Not Add `origin` Again

Authentication does not mean that a new remote needs to be created.

Always check:

```bash
git remote -v
```

If `origin` already exists and points to the correct repository, leave it unchanged.

Do not run:

```bash
git remote add origin ...
```

again.

If the remote is wrong, use:

```bash
git remote set-url origin <correct-url>
```

---

# 32. Common Problems

## Problem 1 — HTTPS Authentication Failed

Check:

```bash
git remote -v
```

Then verify:

* GitHub username
* PAT validity
* PAT expiration
* repository access
* token permissions
* repository URL

Do not use your normal GitHub account password as the Git HTTPS password.

---

## Problem 2 — Permission Denied (publickey)

This is normally an SSH authentication problem.

Run:

```bash
ssh -T git@github.com
```

Then:

```bash
ssh-add -l
```

If the key is not listed, add it:

```bash
ssh-add ~/.ssh/id_ed25519
```

Also verify that the corresponding public key was added to the correct GitHub account.

---

## Problem 3 — `remote origin already exists`

Run:

```bash
git remote -v
```

If the remote is correct, do nothing.

If it is incorrect:

```bash
git remote set-url origin <correct-url>
```

---

## Problem 4 — Repository Not Found

Check:

```bash
git remote -v
```

Verify:

* GitHub username
* repository name
* repository owner
* repository URL
* authentication account
* repository permissions

---

## Problem 5 — SSH Key Already Exists

Do not automatically create another key.

First inspect:

```bash
ls -al ~/.ssh
```

If an existing Ed25519 key is available, it may be reused.

---

# 33. Security Checklist

Before continuing, verify:

* [ ] One authentication method has been selected.
* [ ] PAT is not stored in project files.
* [ ] PAT is not committed to Git.
* [ ] PAT is not included in documentation.
* [ ] PAT is not included in screenshots or videos.
* [ ] SSH private key remains on the local computer.
* [ ] SSH private key has never been uploaded to GitHub.
* [ ] Only the SSH public key was added to GitHub.
* [ ] Repository URL contains no credentials.
* [ ] Only required repository permissions were granted.

---

# 34. Verification Commands

Regardless of the authentication method, these commands are useful.

### Check Git

```bash
git --version
```

### Check the remote

```bash
git remote -v
```

### Check the current branch

```bash
git branch --show-current
```

### Check repository status

```bash
git status
```

### Test communication with GitHub

```bash
git fetch origin
```

For SSH specifically:

```bash
ssh -T git@github.com
```

---

# 35. Reviewer Questions

## "How does Git authenticate with GitHub?"

> "Git can authenticate with GitHub using HTTPS with a Personal Access Token or using SSH key authentication. The existing FlavorForge repository uses HTTPS."

## "Why don't you use your GitHub password?"

> "GitHub does not use the normal account password for Git HTTPS authentication. A Personal Access Token is used instead."

## "What is the difference between PAT and SSH?"

> "A PAT authenticates Git HTTPS operations using a token. SSH uses a cryptographic key pair. Both provide authenticated access to the GitHub repository."

## "Where is your SSH private key?"

> "It remains on my local machine and is never committed or uploaded to GitHub."

## "What is the difference between authentication and a Git remote?"

> "Authentication determines how GitHub verifies my identity. The remote determines which GitHub repository Git communicates with."

## "Which authentication method does FlavorForge currently use?"

> "The existing FlavorForge repository uses HTTPS. Its Git remote points to the GitHub HTTPS repository URL."

---

# 36. Next Step

Authentication has now been configured and tested.

The next document explains how to connect the **existing local FlavorForge Git repository** to the GitHub repository safely.

Continue with:

```text
04-connect-local-git-to-github.md
```
