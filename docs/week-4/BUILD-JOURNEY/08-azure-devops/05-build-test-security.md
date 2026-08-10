# 05 — Build, Test and Security

## 1. What We Wanted

After configuring the Azure DevOps pipeline and its variables, the next step was to verify the CI stages that run before Docker image publishing and deployment.

For FlavorForge, the pipeline flow was:

```text
Source Code
    ↓
Build
    ↓
Test
    ↓
Security
    ↓
CodeQuality
    ↓
Docker Build
```

The purpose of this stage was to make sure the application passed the configured build, test, security and code-quality checks before moving further through the pipeline.

---

# 2. Verify the Pipeline YAML

The pipeline configuration is stored in the FlavorForge repository:

```text
azure-pipelines.yml
```

From the repository root, verify the file:

```bash
ls azure-pipelines.yml
```

The file is located at:

```text
flavorforge-azure-devsecops-capstone/
└── azure-pipelines.yml
```

This YAML file contains the Build, Test, Security and CodeQuality stages used by the pipeline.

---

# 3. Build Stage

The first CI stage builds the FlavorForge application.

The pipeline uses Node.js `22.x` for the application build.

The build flow is:

```text
FlavorForge Source Code
        ↓
Node.js 22.x
        ↓
Application Build
        ↓
Build Result
```

The frontend and backend source code are processed before the Docker images are created.

---

# 4. Verify the Frontend Build

The frontend application is located under:

```text
frontend/
```

The frontend build produces the production build output used later by the Docker image.

The local frontend build can be verified with:

```bash
cd frontend
npm run build
```

A successful build produces the frontend build output.

Then return to the repository root:

```bash
cd ..
```

The pipeline performs the corresponding application build as part of the Build stage.

---

# 5. Verify the Backend Tests

The backend tests are located under:

```text
backend/tests/
```

The backend uses Jest for testing.

From the backend directory:

```bash
cd backend
npm test
```

The test flow is:

```text
Backend Source
      ↓
Jest
      ↓
Backend Tests
      ↓
Test Result
```

After verification:

```bash
cd ..
```

### Evidence

The Azure DevOps pipeline test stage was captured during pipeline execution.

![Pipeline test execution](/screenshots/pipeline/7-test.png)

---

# 6. Test Stage in Azure DevOps

After the application build, Azure DevOps executes the configured Test stage.

The pipeline flow is:

```text
Build
  ↓
Test
  ↓
Test Result
```

The backend Jest tests form part of the automated test process.

A successful test stage allows the pipeline to continue to the following stages.

---

# 7. Verify the Test Result

The Azure DevOps pipeline run was opened to inspect the Test stage.

The test stage was checked for its execution result before continuing with the remaining pipeline stages.

### Evidence

![Azure DevOps test stage](/screenshots/pipeline/7-test.png)

A successful pipeline execution was also captured:

![Successful pipeline run](/screenshots/pipeline/8-pipelines-run-pass.png)

---

# 8. Security Stage

After testing, the pipeline moves to the configured Security stage.

The flow is:

```text
Build
  ↓
Test
  ↓
Security
```

The Security stage performs the security checks configured in the FlavorForge pipeline before the application proceeds to the remaining CI/CD stages.

---

# 9. Code Quality Stage

The pipeline then executes the `CodeQuality` stage.

FlavorForge uses SonarCloud for code-quality analysis.

The service connection configured earlier is:

```text
flavorforge-sonarcloud-sc
```

The flow is:

```text
FlavorForge Source
       ↓
SonarCloud
       ↓
CodeQuality
       ↓
Quality Result
```

This stage is separate from the application test stage.

---

# 10. Verify SonarCloud Integration

The Azure DevOps project contains the SonarCloud integration used by the pipeline.

The pipeline therefore connects:

```text
Azure DevOps
      ↓
CodeQuality
      ↓
SonarCloud
```

The SonarCloud service connection configured earlier is used by this stage.

### Evidence

The Azure DevOps project contains evidence of the SonarCloud integration:

![SonarCloud extension](/screenshots/enterprise-azure-devops-release-simulation/15-extensions-sonarcloud.png)

---

# 11. Verify Code Coverage

The pipeline also produced test coverage information during the CI process.

The coverage result was checked from the Azure DevOps pipeline execution.

### Evidence

![Code coverage](/screenshots/enterprise-azure-devops-release-simulation/16-code-coverage.png)

The coverage result provides additional evidence that the automated test stage was executed as part of the pipeline.

---

# 12. Build → Test → Security → Code Quality

At this point, the CI portion of the FlavorForge pipeline follows:

```text
                    Source Code
                         ↓
                       Build
                         ↓
                        Test
                         ↓
                      Security
                         ↓
                    CodeQuality
                         ↓
                  Docker Build
```

Each stage must complete before the pipeline proceeds to the next part of the CI/CD workflow.

---

# 13. Verify a Successful CI Pipeline Run

The Azure DevOps pipeline run was checked after execution.

The successful run confirmed that the configured pipeline stages were executing.

### Evidence

![Successful Azure DevOps pipeline run](/screenshots/pipeline/8-pipelines-run-pass.png)

The detailed pipeline run was also captured:

![Detailed pipeline run](/screenshots/pipeline/9-advance-pipelines-run-pass.png)

---

# 14. Build and Test Before Docker

The Docker build comes after the application validation stages.

The pipeline therefore follows:

```text
Application Source
       ↓
Build
       ↓
Test
       ↓
Security
       ↓
CodeQuality
       ↓
DockerBuild
```

This ensures that the application is checked before its container images are published.

---

# 15. What We Actually Achieved

The FlavorForge Azure DevOps pipeline was configured to run the application through the CI checks before the Docker publishing stages.

The verified flow was:

```text
FlavorForge Repository
        ↓
azure-pipelines.yml
        ↓
Build
        ↓
Test
        ↓
Security
        ↓
CodeQuality
        ↓
DockerBuild
```

The pipeline included:

```text
Node.js 22.x
Jest Tests
Security Checks
SonarCloud Code Quality
Code Coverage
```

The successful pipeline execution provided evidence that the CI workflow was running in Azure DevOps.

---

# 16. Result

The FlavorForge CI stages were established and verified before moving to Docker image publishing.

The next stage is:

```text
docs/week-4/BUILD-JOURNEY/08-azure-devops/06-docker-publish.md
```

This will document how the pipeline builds the FlavorForge frontend and backend Docker images and publishes them to `flavorforgeacr2026ms`.
