from pathlib import Path
from datetime import datetime


ROOT = Path(".")
def search_content(keyword):
    for file in ROOT.rglob("*"):
        if file.is_file():
            try:
                content = file.read_text(
                    encoding="utf-8",
                    errors="ignore"
                )

                if keyword.lower() in content.lower():
                    return True

            except Exception:
                pass

    return False

def exists(path):
    return Path(path).exists()


components = {
    "Frontend Application": exists("frontend"),
    "Backend API": exists("backend"),
    "Docker Containerization": any(ROOT.rglob("Dockerfile")),
    "Azure DevOps Pipeline": exists("azure-pipelines.yml"),
    "Kubernetes Deployment": exists("kubernetes"),
    "ArgoCD GitOps": exists("argocd"),
    "Documentation": exists("docs"),
    "SonarCloud Integration": any(ROOT.rglob("*sonar*")),
    "Trivy Security Scan": (
    any(ROOT.rglob("*trivy*"))
    or search_content("trivy")
),
}


report = []

report.append("# 📊 FlavorForge Automated Project Status\n")

report.append(
    f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n"
)

report.append("| Component | Status |\n")
report.append("|-----------|--------|\n")


for name, present in components.items():
    status = "✅ Detected" if present else "❌ Not Found"
    report.append(f"| {name} | {status} |\n")


output = Path("docs/generated/PROJECT_STATUS.md")

output.parent.mkdir(
    parents=True,
    exist_ok=True
)

output.write_text(
    "".join(report),
    encoding="utf-8"
)

print("Documentation generated successfully")
