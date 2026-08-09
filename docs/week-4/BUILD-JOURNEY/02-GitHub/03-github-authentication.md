# GitHub Authentication — HTTPS PAT and SSH

## Objective

This document explains how Git authenticates with GitHub when pushing and pulling the FlavorForge project.

There are two supported methods:

1. **HTTPS + Personal Access Token (PAT)**
2. **SSH key authentication**

A person only needs to configure **one** of these methods.

The documentation explains both so that a new user can choose the method they understand and prefer.

---

# 1. Why Is Authentication Needed?

Git needs permission to communicate with the GitHub repository.

For example:

```text
Local Computer
      |
      | git push
      |
      v
GitHub
```

GitHub must know:

> "Is this person allowed to push to this repository?"

Authentication provides that proof.

---

# 2. Two Authentication Methods

## Option A — HTTPS + Personal Access Token

```text
Local Git
    |
    | HTTPS
    | username + Personal Access Token
    v
GitHub
```

This method uses the repository HTTPS URL.

Example:

```text
https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git
```

When Git needs authentication, a Personal Access Token can be used instead of a GitHub account password.

---

## Option B — SSH

```text
Local Git
    |
    | SSH
    | SSH key
    v
GitHub
```

With SSH, the computer generates a key pair:

```text
Private Key
    +
Public Key
```

The public key is added to GitHub.

The private key stays on the computer.

GitHub uses the public key to verify that the computer is authorized.

---

# 3. Which Method Should I Choose?

Both methods are valid.

For this documentation:

```text
HTTPS + PAT
```

is easier to understand for a beginner who is already familiar with HTTPS.

SSH is useful when:

* the user prefers SSH
* the user works with Git frequently
* the user wants key-based authentication
* the user does not want to repeatedly enter credentials

Choose **one**.

Do not configure both unless there is a specific reason.

---

# 4. IMPORTANT — PAT Security

A Personal Access Token is a credential.

Treat it like a password.

Never put a PAT into:

```text
GitHub README
Markdown documentation
Git commit
Screenshot
Screen recording
Video
Chat message
Public repository
Source code
```

Never publish:

```text
ghp_...
github_pat_...
```

or any other GitHub token value.

If a token is accidentally exposed, revoke it immediately from GitHub and create a new one.

---

# 5. OPTION A — HTTPS + PAT

## 5.1 Check the GitHub Repository URL

Open the FlavorForge repository on GitHub.

Select:

**Code**

Then select:

**HTTPS**

You will see a URL similar to:

```text
https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git
```

Copy the URL if required.

Do not change it yet.

---

# 6. Create a Personal Access Token

Sign in to GitHub.

Open:

**Profile picture → Settings**

Then find:

**Developer settings**

Then:

**Personal access tokens**

GitHub currently provides token options such as:

* Fine-grained personal access tokens
* Personal access tokens (classic)

For this beginner documentation, the important point is:

> Use the least-privileged token that supports the Git operations required by the project.

If your organization's or GitHub setup specifically requires a classic token, use the classic-token procedure below.

---

# 7. PAT — Classic Token Procedure

If you use:

**Personal access tokens (classic)**

select:

**Generate new token → Generate new token (classic)**

GitHub may ask for:

### Note

Enter a descriptive name.

Example:

```text
FlavorForge Git HTTPS
```

This is only a label to help identify the token.

---

# 8. PAT Expiration

GitHub asks for an expiration period.

Choose an expiration that follows your security requirements.

A short-lived token is safer than a token that never expires.

For a temporary project/recreation exercise, use a reasonable limited expiration period.

Do not choose an unnecessarily long lifetime just for convenience.

---

# 9. PAT Permissions

Do **NOT** select every permission.

A common beginner mistake is:

> "Select everything because I don't know what is needed."

Do not do that.

For a normal Git repository workflow, the token should only have the repository access required to:

```text
clone
pull
fetch
push
```

For a **classic PAT**, the commonly required repository permission is:

```text
repo
```

However, if the repository is public and your workflow only needs limited access, do not automatically grant broad permissions without checking the current GitHub requirements.

For a **fine-grained PAT**, configure:

* Repository access → only the required repository
* Repository permissions → minimum permissions required for Git operations

For a normal push workflow, this generally means repository contents access sufficient for reading and writing repository contents.

The exact GitHub UI and permission names may change, so follow the current GitHub screen.

---

# 10. Generate the PAT

After selecting the required permissions:

Select:

**Generate token**

GitHub will display the token.

### VERY IMPORTANT

Copy the token immediately if GitHub tells you that it will only be shown once.

Store it securely.

Do NOT put it into:

```text
docs/
README.md
screenshots/
videos/
GitHub repository
```

Do not send it to another person through chat.

---

# 11. What Does the PAT Replace?

GitHub no longer accepts the normal GitHub account password for Git HTTPS authentication.

When Git asks for:

```text
Username:
Password:
```

use:

```text
Username:
YOUR_GITHUB_USERNAME
```

and:

```text
Password:
YOUR_PERSONAL_ACCESS_TOKEN
```

The PAT is entered where Git asks for the password.

The GitHub account password itself should NOT be entered.

---

# 12. Test HTTPS Authentication

From the WSL terminal in the FlavorForge project:

```bash
git remote -v
```

You should see something similar to:

```text
origin  https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git (fetch)
origin  https://github.com/YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git (push)
```

If the remote is already correct, do not add another remote.

---

# 13. OPTION B — SSH Authentication

SSH uses a key pair instead of a PAT.

The key pair is:

```text
Private Key
+
Public Key
```

### Private key

The private key stays on your computer.

Never upload it to GitHub.

Never commit it to Git.

Never share it.

### Public key

The public key can be added to GitHub.

GitHub uses it to recognize your computer.

---

# 14. Check Whether an SSH Key Already Exists

Open the WSL terminal.

Run:

```bash
ls -al ~/.ssh
```

Look for files such as:

```text
id_ed25519
id_ed25519.pub
```

or:

```text
id_rsa
id_rsa.pub
```

If you already have a suitable SSH key, do not create another one unnecessarily.

---

# 15. Install SSH Tools If Missing

Check:

```bash
ssh -V
```

If SSH is missing, install the OpenSSH client:

```bash
sudo apt update
```

Then:

```bash
sudo apt install openssh-client -y
```

Verify:

```bash
ssh -V
```

---

# 16. Generate an SSH Key

If you do not already have an SSH key, use:

```bash
ssh-keygen -t ed25519 -C "YOUR_GITHUB_EMAIL"
```

Replace:

```text
YOUR_GITHUB_EMAIL
```

with the email address associated with your GitHub account.

When prompted:

```text
Enter file in which to save the key:
```

Press:

**Enter**

to use the default location.

When prompted for a passphrase, a passphrase is recommended.

You will then have files similar to:

```text
~/.ssh/id_ed25519
~/.ssh/id_ed25519.pub
```

---

# 17. Understand the Two Files

You should now have:

```text
~/.ssh/id_ed25519
```

This is the:

**PRIVATE KEY**

Never share it.

And:

```text
~/.ssh/id_ed25519.pub
```

This is the:

**PUBLIC KEY**

The public key is the one that can be added to GitHub.

---

# 18. Start the SSH Agent

Run:

```bash
eval "$(ssh-agent -s)"
```

You should see output similar to:

```text
Agent pid 1234
```

The number may be different.

---

# 19. Add the Private Key to the SSH Agent

Run:

```bash
ssh-add ~/.ssh/id_ed25519
```

If your key uses a passphrase, you may be asked to enter it.

The private key remains on your computer.

---

# 20. Display the Public Key

Run:

```bash
cat ~/.ssh/id_ed25519.pub
```

You will see a single line beginning approximately with:

```text
ssh-ed25519
```

Copy the entire public-key line.

### Security warning

The `.pub` file is the public key.

The file without `.pub` is the private key.

Never copy:

```text
~/.ssh/id_ed25519
```

into GitHub.

Only copy:

```text
~/.ssh/id_ed25519.pub
```

---

# 21. Add the SSH Public Key to GitHub

In GitHub:

1. Select your profile picture.
2. Select **Settings**.
3. Select **SSH and GPG keys**.
4. Select **New SSH key**.
5. Enter a title.

Example:

```text
FlavorForge WSL
```

For **Key type**, select the appropriate authentication option shown by GitHub.

Paste the contents of:

```bash
cat ~/.ssh/id_ed25519.pub
```

into the key field.

Select:

**Add SSH key**

GitHub may ask you to confirm your password or another authentication factor.

---

# 22. Test the SSH Connection

From WSL, run:

```bash
ssh -T git@github.com
```

The first time, SSH may ask:

```text
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

Verify that the host is GitHub and then enter:

```text
yes
```

A successful authentication message should indicate that GitHub recognizes your account.

GitHub does not provide an interactive shell, so a message saying that shell access is not provided can still indicate that authentication succeeded.

---

# 23. Change the Git Remote to SSH

If you choose SSH, the GitHub remote should look like:

```text
git@github.com:YOUR_GITHUB_USERNAME/flavorforge-azure-devsecops-capstone.git
```

To change the existing remote:

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

# 24. HTTPS vs SSH

| Feature                   | HTTPS + PAT             | SSH               |
| ------------------------- | ----------------------- | ----------------- |
| Protocol                  | HTTPS                   | SSH               |
| Credential                | PAT                     | SSH key           |
| GitHub password used      | No                      | No                |
| Private key required      | No                      | Yes               |
| Easy for beginners        | Yes                     | Moderate          |
| Good for frequent Git use | Yes                     | Yes               |
| Token expiration          | Yes, depending on token | SSH key lifecycle |
| Secret must be protected  | PAT                     | Private key       |

Both methods are valid.

---

# 25. Which Method Does FlavorForge Use?

The existing FlavorForge repository currently uses an HTTPS remote:

```text
https://github.com/shettymalathib/flavorforge-azure-devsecops-capstone.git
```

This means the current local repository is configured for:

```text
HTTPS
```

The documentation supports SSH as an alternative for someone recreating the project.

Do not change the existing FlavorForge remote just for documentation purposes.

---

# 26. Important Difference: Authentication vs Remote

These are two different things.

### Authentication

Answers:

> "Who are you and are you allowed to access GitHub?"

Examples:

```text
PAT
SSH key
```

### Remote

Answers:

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

---

# 27. Common Errors

## Error: Authentication failed

For HTTPS:

Check:

* GitHub username
* PAT validity
* PAT expiration
* Repository permissions
* Repository URL

Do not use your normal GitHub password as the Git HTTPS password.

---

## Error: Permission denied (publickey)

For SSH:

Check:

```bash
ssh -T git@github.com
```

Then check:

```bash
ssh-add -l
```

Also verify that the public key was added to the correct GitHub account.

---

## Error: remote origin already exists

Run:

```bash
git remote -v
```

Do not run:

```bash
git remote add origin ...
```

again.

If the remote is incorrect, use:

```bash
git remote set-url origin <correct-url>
```

---

## Error: Repository not found

Check:

```bash
git remote -v
```

Make sure:

* GitHub username is correct
* Repository name is correct
* Authentication account has access
* Repository exists

---

# 28. Security Checklist

Before continuing:

* [ ] Only one authentication method selected
* [ ] PAT is not stored in project files
* [ ] PAT is not committed to Git
* [ ] PAT is not included in screenshots
* [ ] PAT is not included in videos
* [ ] PAT is not included in documentation
* [ ] SSH private key remains on the computer
* [ ] SSH private key is never uploaded to GitHub
* [ ] Only the SSH public key is added to GitHub
* [ ] Repository URL contains no credentials

---

# 29. What to Say in the Presentation

### "How does Git authenticate with GitHub?"

> "I use GitHub authentication through HTTPS with a Personal Access Token, or SSH key authentication as an alternative. The token or private key is never stored in the repository."

### "Why don't you use your GitHub password?"

> "GitHub does not use the normal account password for Git HTTPS operations. A Personal Access Token is used instead."

### "What is the difference between PAT and SSH?"

> "PAT authenticates Git HTTPS operations using a token. SSH uses a cryptographic key pair. In both cases, the credential must be protected."

### "Where is your SSH private key?"

> "It remains on my local machine and is never committed or uploaded to GitHub."

### "Which authentication method are you using?"

For the existing FlavorForge setup:

> "The existing FlavorForge repository uses HTTPS. The remote is configured using the GitHub HTTPS repository URL."

---

# 30. Next Step

Authentication is now understood.

The next document explains how to connect the local FlavorForge Git repository to the GitHub repository safely.

Continue with:

```text
04-connect-local-git-to-github.md
```
