Yes — understood. You **already created `02-create-project.md`**, and you want me to **fill that file's content**, not move to Step 3.

Copy-paste this into:

```text
docs/week-4/BUILD-JOURNEY/08-azure-devops/02-create-project.md
```

````markdown
# Step 2 — Create the Azure DevOps Project

## What We Wanted

After confirming the Azure DevOps organization, the next step was to create the Azure DevOps project for the FlavorForge application.

The project provides the workspace where the FlavorForge DevSecOps implementation is managed.

The project is located inside the Azure DevOps organization:

```text
malathiabhilash
````

The project created for the capstone is:

```text
FlavorForge – Azure DevSecOps Capstone
```

The overall structure is:

```text
Azure DevOps
    ↓
Organization: malathiabhilash
    ↓
Project: FlavorForge – Azure DevSecOps Capstone
```

---

# Step 2.1 — Open Azure DevOps

## Where We Went

Open a web browser and navigate to Azure DevOps:

```text
https://dev.azure.com/
```

## What We Clicked

1. Open the browser.
2. Navigate to Azure DevOps.
3. Sign in using the Microsoft account associated with the Azure DevOps organization.
4. Open the Azure DevOps organization:

```text
malathiabhilash
```

The organization URL is:

```text
https://dev.azure.com/malathiabhilash/
```

## What Happened

The Azure DevOps organization page opened.

The Projects section displayed the projects available inside the organization.

At the time of verification, the organization displayed:

```text
Projects

ACR-Pipeline-Demo

FlavorForge – Azure DevSecOps Capstone
```

---

# Step 2.2 — Open the New Project Option

## What We Wanted

We needed an Azure DevOps project dedicated to the FlavorForge Azure DevSecOps capstone.

## Where We Went

From the Azure DevOps organization page, locate the **Projects** section.

## What We Clicked

Click:

```text
New project
```

## What Happened

Azure DevOps opened the project creation form.

The form provides the fields required to create a new Azure DevOps project.

---

# Step 2.3 — Enter the Project Name

## What We Entered

For the project name, enter:

```text
FlavorForge – Azure DevSecOps Capstone
```

## Project Name

| Field        | Value                                    |
| ------------ | ---------------------------------------- |
| Project name | `FlavorForge – Azure DevSecOps Capstone` |

The project name identifies the Azure DevOps workspace used for the FlavorForge capstone.

---

# Step 2.4 — Configure the Project

Azure DevOps provides additional project configuration options during project creation.

Only values that were confirmed from the recovered FlavorForge evidence are documented here.

The confirmed project name is:

```text
FlavorForge – Azure DevSecOps Capstone
```

Do not assume or document additional historical selections unless they are supported by the available project-creation evidence.

---

# Step 2.5 — Create the Project

## What We Clicked

After entering the required project information, click:

```text
Create project
```

## What Happened

Azure DevOps created the project.

The project became available under the `malathiabhilash` organization.

The resulting hierarchy was:

```text
Azure DevOps
    ↓
malathiabhilash
    ↓
FlavorForge – Azure DevSecOps Capstone
```

---

# Step 2.6 — Open the FlavorForge Project

## Where We Went

Return to the Azure DevOps organization Projects page.

## What We Clicked

Locate:

```text
FlavorForge – Azure DevSecOps Capstone
```

and open the project.

## What Happened

The FlavorForge Azure DevOps project opened.

This project is the central Azure DevOps workspace used for the remaining DevSecOps configuration.

The following work will be configured inside this project:

```text
GitHub Repository
        ↓
Service Connections
        ↓
Agent Pools
        ↓
Library / Variable Groups
        ↓
Approvals & Checks
        ↓
Pipeline
        ↓
SonarCloud
        ↓
Docker / ACR
        ↓
AKS
        ↓
Release / GitOps verification
```

---

# Verify

Verify that the Azure DevOps organization is:

```text
malathiabhilash
```

Verify that the project is:

```text
FlavorForge – Azure DevSecOps Capstone
```

The organization and project relationship should be:

```text
Organization
    └── malathiabhilash
            │
            └── Project
                  └── FlavorForge – Azure DevSecOps Capstone
```

The project should also appear in the organization's Projects list.

---

# Screenshot

Use the actual screenshot showing the Azure DevOps project creation or the resulting Projects page.

The available evidence confirms that the organization page displayed:

```text
dev.azure.com/malathiabhilash (Owner)
```

and:

```text
FlavorForge – Azure DevSecOps Capstone
```

Do not invent a screenshot filename.

When the actual screenshot path is confirmed, add it here.

```text
[Insert actual Azure DevOps project creation / project page screenshot here]
```

---

# Result

The Azure DevOps project for the FlavorForge capstone was created under the:

```text
malathiabhilash
```

organization.

The confirmed project name is:

```text
FlavorForge – Azure DevSecOps Capstone
```

The final structure is:

```text
Azure DevOps
    ↓
Organization: malathiabhilash
    ↓
Project: FlavorForge – Azure DevSecOps Capstone
```

The Azure DevOps project is now ready for the next configuration steps.

The next step is:

```text
03-github-connection-and-repository.md
```

where the connection between the Azure DevOps project and the FlavorForge GitHub repository will be documented.

```

**Important:** I have deliberately not added unconfirmed values such as the project's visibility, process (`Agile`/`Scrum`), description, README setting, or exact creation date. That keeps this rebuild documentation evidence-based.
```
