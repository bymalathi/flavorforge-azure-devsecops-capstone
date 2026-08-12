Yes. And I want to correct one important thing from my previous version: **your `01-sonarcloud-account.md` should not stop at login/account creation.** Since your actual project uses Azure DevOps, this section should clearly show the **SonarCloud account → token → Azure DevOps SonarCloud service connection** flow.

Also, I checked your repository tree: **you currently do not have any SonarCloud screenshots under `screenshots/`**. So I would **not invent screenshot filenames**. We should take the screenshots now and save them with a clean naming scheme.

SonarCloud's current documentation confirms that for Azure Pipelines you create a SonarCloud authentication token, then create a **SonarQube Cloud** service connection in Azure DevOps and enter that token there. ([SonarSource Docs][1])

## Screenshots you should take

Create this folder first:

```bash
mkdir -p screenshots/sonarcloud
```

Then take these screenshots:

```text
screenshots/sonarcloud/01-sonarcloud-account.png
screenshots/sonarcloud/02-sonarcloud-organization.png
screenshots/sonarcloud/03-flavorforge-project.png
screenshots/sonarcloud/04-create-token.png
screenshots/sonarcloud/05-token-created.png
screenshots/sonarcloud/06-azure-devops-sonarcloud-service-connection.png
screenshots/sonarcloud/07-sonarcloud-service-connection-verified.png
```

### Important about the token screenshot

**Do NOT capture the actual token value.**

When SonarCloud displays the generated token:

* take the screenshot showing the **token name / creation confirmation**
* blur or hide the token value
* never commit the token to GitHub
* never put the token inside `azure-pipelines.yml`

The token is a credential. Azure DevOps stores it inside the service connection.

---

# Complete copy-paste `01-sonarcloud-account.md`

Replace your current file with this:

````markdown
# SonarCloud Account and Azure DevOps Integration

## What we wanted to do

SonarCloud was used in the FlavorForge project to perform automated code quality analysis as part of the Azure DevOps CI/CD pipeline.

The setup consisted of:

```text
GitHub Repository
      |
      v
SonarCloud
      |
      | Authentication Token
      v
Azure DevOps Service Connection
      |
      v
Azure DevOps Pipeline
      |
      v
SonarCloudPrepare
      |
      v
SonarCloudAnalyze
      |
      v
SonarCloudPublish
````

The goal of this step was to:

* Sign in to SonarCloud.
* Configure the SonarCloud organization.
* Prepare the FlavorForge SonarCloud project.
* Generate an authentication token.
* Create the SonarCloud service connection in Azure DevOps.
* Verify the connection.
* Keep the token outside the source code.

---

# Step 1 — Open SonarCloud

Open SonarCloud in a browser:

[SonarCloud](https://sonarcloud.io/)

Select the option to sign in.

For this project, GitHub authentication was used.

---

# Step 2 — Sign in with GitHub

Select:

```text
Log in with GitHub
```

Complete the GitHub authentication and authorize SonarCloud when prompted.

SonarCloud supports connecting a GitHub organization or personal account and importing repositories for analysis. ([SonarSource Docs][2])

### Screenshot

![SonarCloud Account](/screenshots/sonarcloud/01-sonarcloud-account.png)

---

# Step 3 — Verify the SonarCloud Organization

After signing in, verify the SonarCloud organization.

The organization used for the FlavorForge project was:

```text
malathi-shetty
```

The organization is used by the Azure DevOps pipeline during SonarCloud analysis.

The pipeline contains:

```yaml
organization: 'malathi-shetty'
```

SonarCloud organizations group the projects that are analyzed and are associated with the corresponding DevOps platform organization or account. ([SonarSource Docs][2])

### Screenshot

![SonarCloud Organization](/screenshots/sonarcloud/02-sonarcloud-organization.png)

---

# Step 4 — Verify the FlavorForge SonarCloud Project

The FlavorForge project was configured in SonarCloud with:

```text
Project Name:
FlavorForge

Project Key:
shettymalathib_flavorforge-azure-devsecops-capstone
```

The project key is later referenced by the Azure DevOps pipeline:

```yaml
cliProjectKey: 'shettymalathib_flavorforge-azure-devsecops-capstone'
```

The project name is:

```yaml
cliProjectName: 'FlavorForge'
```

### Screenshot

![FlavorForge SonarCloud Project](/screenshots/sonarcloud/03-flavorforge-project.png)

---

# Step 5 — Create an Authentication Token

Azure DevOps needs an authentication credential to communicate with SonarCloud.

In SonarCloud, open the account/security area and create a token for the Azure DevOps integration.

Use a descriptive token name such as:

```text
flavorforge-azure-devops
```

or another name that clearly identifies its purpose.

The token should be treated as a secret.

SonarCloud's Azure Pipelines documentation specifically requires an authentication token for the Azure DevOps service connection. ([SonarSource Docs][1])

---

## Token creation

When creating the token:

1. Enter a descriptive token name.
2. Create the token.
3. Copy the token immediately.
4. Store it securely.
5. Do not place it inside the Git repository.

### Screenshot

![Create SonarCloud Token](/screenshots/sonarcloud/04-create-token.png)

---

# Step 6 — Protect the Token

The token is a secret credential.

Do not add it to:

```text
azure-pipelines.yml
README.md
documentation
GitHub
screenshots
shell history
```

The token should instead be stored inside the Azure DevOps SonarCloud service connection.

For the documentation screenshot, the token value must be hidden or blurred.

### Screenshot

![SonarCloud Token Created](/screenshots/sonarcloud/05-token-created.png)

> **Security note:** Never commit the real token value to GitHub. The screenshot should show that the token was created without exposing the secret itself.

---

# Step 7 — Open Azure DevOps Project Settings

Open the FlavorForge Azure DevOps project.

Navigate to:

```text
Project Settings
    |
    └── Service connections
```

Select:

```text
New service connection
```

Search for:

```text
Sonar
```

Select:

```text
SonarQube Cloud
```

SonarCloud's current Azure Pipelines documentation uses a **SonarQube Cloud** service connection for this integration. ([SonarSource Docs][1])

---

# Step 8 — Configure the SonarCloud Service Connection

Configure the service connection using the token generated in SonarCloud.

The important fields are:

```text
Connection type:
SonarQube Cloud

Region:
Global

SonarQube Cloud Token:
<generated token>

Service Connection Name:
flavorforge-sonarcloud-sc
```

The service connection name is important because the Azure DevOps pipeline references it.

The project used:

```text
flavorforge-sonarcloud-sc
```

SonarCloud documentation specifies that the service connection name is later used when configuring the Azure build pipeline. ([SonarSource Docs][1])

### Screenshot

![Azure DevOps SonarCloud Service Connection](/screenshots/sonarcloud/06-azure-devops-sonarcloud-service-connection.png)

---

# Step 9 — Verify the Service Connection

After entering the token and service connection details, select:

```text
Verify
```

Azure DevOps should successfully verify the connection to SonarCloud.

Then select:

```text
Save
```

SonarCloud recommends verifying the connection before saving the service connection. ([SonarSource Docs][1])

### Screenshot

![SonarCloud Service Connection Verified](/screenshots/sonarcloud/07-sonarcloud-service-connection-verified.png)

---

# Step 10 — How the Service Connection Is Used by the Pipeline

The token itself is **not written inside the YAML pipeline**.

Instead, the pipeline references the Azure DevOps service connection by name.

The FlavorForge pipeline contains:

```yaml
- task: SonarCloudPrepare@4
  displayName: "Prepare SonarCloud Analysis"

  inputs:
    SonarCloud: 'flavorforge-sonarcloud-sc'
    organization: 'malathi-shetty'
    scannerMode: 'cli'
    configMode: 'manual'
    cliProjectKey: 'shettymalathib_flavorforge-azure-devsecops-capstone'
    cliProjectName: 'FlavorForge'
```

This means:

```text
Azure DevOps Pipeline
        |
        | SonarCloud:
        | flavorforge-sonarcloud-sc
        v
Azure DevOps Service Connection
        |
        | securely stores authentication
        v
SonarCloud
```

The Azure DevOps SonarCloud extension provides the `SonarCloudPrepare` task and uses the service connection specified by the `SonarCloud` input. ([SonarSource Docs][3])

---

# Step 11 — SonarCloud Analysis in the Pipeline

After the preparation step, the pipeline performs the actual analysis.

The FlavorForge pipeline contains:

```yaml
- task: SonarCloudAnalyze@4
  displayName: "Run SonarCloud Analysis"
```

After analysis, the quality gate result is published:

```yaml
- task: SonarCloudPublish@4
  displayName: "Publish Quality Gate"

  inputs:
    pollingTimeoutSec: "300"
```

Therefore, the complete flow is:

```text
SonarCloud Account
        |
        v
SonarCloud Organization
        |
        v
FlavorForge Project
        |
        v
Authentication Token
        |
        v
Azure DevOps Service Connection
        |
        v
SonarCloudPrepare
        |
        v
Build / Tests / Coverage
        |
        v
SonarCloudAnalyze
        |
        v
SonarCloudPublish
        |
        v
Quality Gate Result
```

---

# Step 12 — Verify the Integration

The service connection is considered ready when:

* The SonarCloud organization is accessible.
* The FlavorForge project exists.
* The authentication token has been created.
* The Azure DevOps SonarCloud service connection exists.
* The service connection verification succeeds.
* The pipeline references the correct service connection name.
* The pipeline references the correct organization.
* The pipeline references the correct FlavorForge project key.

The configuration used by FlavorForge is:

```text
SonarCloud Organization
    malathi-shetty

Project Name
    FlavorForge

Project Key
    shettymalathib_flavorforge-azure-devsecops-capstone

Azure DevOps Service Connection
    flavorforge-sonarcloud-sc
```

---

# Important Security Practice

The authentication token is intentionally not included in this documentation.

The correct approach is:

```text
SonarCloud
    |
    | Generate token
    v
Azure DevOps Service Connection
    |
    | Securely stores token
    v
Azure DevOps Pipeline
```

The incorrect approach would be:

```text
azure-pipelines.yml
    |
    └── hard-coded SonarCloud token
```

The token must never be committed to the GitHub repository.

---

# Result

The SonarCloud account and Azure DevOps integration were prepared successfully.

The resulting configuration was:

```text
GitHub
  |
  | FlavorForge repository
  v
SonarCloud
  |
  | Organization: malathi-shetty
  |
  | Project: FlavorForge
  |
  | Project Key:
  | shettymalathib_flavorforge-azure-devsecops-capstone
  |
  | Authentication Token
  v
Azure DevOps
  |
  | Service Connection:
  | flavorforge-sonarcloud-sc
  v
Azure Pipeline
  |
  | SonarCloudPrepare
  | SonarCloudAnalyze
  | SonarCloudPublish
  v
Quality Gate
```

The next step configures the FlavorForge project and its analysis settings.

**Next:** [SonarCloud Project Setup](02-project-setup.md)

````

### One important correction to the paths

Because your file is located at:

```text
docs/week-4/BUILD-JOURNEY/09-sonarcloud/01-sonarcloud-account.md
````

the relative path:

```text
/screenshots/sonarcloud/...
```

is correct.

It resolves:

```text
09-sonarcloud
   ↓
BUILD-JOURNEY
   ↓
week-4
   ↓
docs
   ↓
screenshots
```


![SonarCloud Account](/screenshots/build-journey/sonarqube/Login.png)




### SonarSource Docs:


https://docs.sonarsource.com/sonarqube-cloud/advanced-setup/ci-based-analysis/azure-pipelines/setting-up-project-integration "Configuring project for Azure Pipelines | SonarQube Cloud | Sonar Documentation"

https://docs.sonarsource.com/sonarqube-cloud/getting-started/github "Getting started with GitHub | SonarQube Cloud | Sonar Documentation"

https://docs.sonarsource.com/sonarqube-cloud/advanced-setup/ci-based-analysis/azure-pipelines/sonarqube-tasks "List of SonarQube tasks | SonarQube Cloud | Sonar Documentation"
