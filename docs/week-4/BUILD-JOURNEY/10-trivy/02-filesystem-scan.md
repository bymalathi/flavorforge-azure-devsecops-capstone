# 02 — Trivy Filesystem Scan

## Objective

The goal of this step is to use **Trivy filesystem scanning** to inspect the FlavorForge repository for known security vulnerabilities and security-related issues.

The filesystem scan analyzes the project directory rather than a Docker image.

For FlavorForge, the scan is performed against the repository root:

```text
flavorforge-azure-devsecops-capstone/
```

---

## 1. Verify Trivy Installation

Before running the filesystem scan, verify that Trivy is available.

```bash
trivy --version
```

Expected result:

```text
Version: ...
```

The exact version may vary depending on the installed Trivy release.

---

## 2. Navigate to the FlavorForge Repository

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

Verify the repository:

```bash
pwd
```

Expected:

```text
/home/malathi/flavorforge-azure-devsecops-capstone
```

---

## 3. Create the Trivy Report Directory

Create a dedicated directory for Trivy reports:

```bash
mkdir -p reports/trivy
```

Verify:

```bash
ls -ld reports/trivy
```

Expected:

```text
reports/trivy
```

---

## 4. Run the Trivy Filesystem Scan

Run Trivy against the complete repository:

```bash
trivy fs \
  --format table \
  . | tee reports/trivy/filesystem-report.txt
```

### What this command does

* `trivy fs` — performs a filesystem scan.
* `--format table` — displays the results in a human-readable table.
* `.` — scans the current repository directory.
* `tee` — displays the results in the terminal and saves them to a report file.
* `reports/trivy/filesystem-report.txt` — stores the scan output.

---

## 5. Verify the Text Report

Check that the report was created:

```bash
ls -lh reports/trivy/filesystem-report.txt
```

Then inspect the report:

```bash
head -50 reports/trivy/filesystem-report.txt
```

The report should contain the Trivy filesystem scan results.

---

## 6. Generate the JSON Report

Generate a machine-readable JSON report:

```bash
trivy fs \
  --format json \
  -o reports/trivy/filesystem-report.json \
  .
```

Verify the JSON report:

```bash
ls -lh reports/trivy/filesystem-report.json
```

---

## 7. Verify Both Reports

Run:

```bash
ls -lh reports/trivy/
```

Expected files:

```text
filesystem-report.txt
filesystem-report.json
```

The text report is useful for human-readable verification, while the JSON report can be consumed by automation or other security tooling.

---

## 8. Verification Checklist

* [ ] Trivy is installed and available.
* [ ] FlavorForge repository is the scan target.
* [ ] `reports/trivy/` directory exists.
* [ ] Filesystem scan completed.
* [ ] `filesystem-report.txt` was generated.
* [ ] `filesystem-report.json` was generated.
* [ ] Both reports can be opened and inspected.

---

## Evidence

The final documentation should include the actual terminal evidence showing:

1. Trivy version.
2. Filesystem scan execution.
3. Scan results.
4. Generated report files.
5. JSON report generation.

Screenshots will be added after the verification is completed.
