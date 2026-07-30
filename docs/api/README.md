# 🔌 FlavorForge API Documentation

## Overview

The FlavorForge backend exposes REST APIs that provide application functionality to the frontend.

The APIs are built using:

- Node.js
- Express.js
- REST architecture
- JSON for request and response payloads

---

# API Architecture

```text
User
   │
   ▼
React Frontend
   │
   ▼
REST API Requests
   │
   ▼
Node.js Express Backend
   │
   ▼
Application Services
```

---

# API Base Information

| Item | Value |
|------|-------|
| Protocol | HTTP / HTTPS |
| Architecture | REST API |
| Backend Framework | Express.js |
| Data Format | JSON |

---

# Available APIs

| API | Purpose |
|-----|---------|
| Health API | Verify application health and availability |
| Recipe APIs | Perform recipe-related operations |
| Future APIs | Additional application features |

---

# Documentation Structure

- `backend-api.md`
- `health-check.md`
- `authentication.md`
- `api-examples.md`


---

## `docs/api/backend-api.md`


# 📡 Backend API Reference

## Base URL

### Development

```text
http://localhost:3000
```

### Production

```text
https://<application-url>
```

---

# Health Endpoint

## GET /api/health

Returns the current health status of the backend application.

### Request

```http
GET /api/health
```

### Response

**Status Code:** `200 OK`

**Content-Type:** `application/json`

```json
{
  "status": "UP",
  "application": "FlavorForge Backend",
  "version": "1.3"
}
```

---

# Recipe Endpoints

## GET /api/recipes

Retrieves all available recipes.

### Request

```http
GET /api/recipes
```

### Response

**Status Code:** `200 OK`

**Content-Type:** `application/json`

```json
[
  {
    "id": 1,
    "name": "Pasta"
  }
]
```

> **Note**
>
> Document only the endpoints that are implemented.
> Do not include APIs that do not currently exist.


---

## `docs/api/health-check.md`


# ❤️ Application Health Check

## Purpose

The health endpoint verifies that the backend application is running and able to serve requests.

It is commonly used by:

- Kubernetes Liveness Probes
- Kubernetes Readiness Probes
- Monitoring systems
- Load balancers
- Manual verification

---

# Endpoint

```http
GET /api/health
```

---

# Successful Response

**Status Code:** `200 OK`

```json
{
  "status": "UP",
  "application": "FlavorForge Backend",
  "environment": "production"
}
```

---

# Kubernetes Example

### Liveness Probe

```yaml
livenessProbe:
  httpGet:
    path: /api/health
    port: 3000
```

### Readiness Probe

```yaml
readinessProbe:
  httpGet:
    path: /api/health
    port: 3000
```

---

# Verification

Run the following command to verify application health:

```bash
curl -X GET http://localhost:3000/api/health
```


---

## `docs/api/authentication.md`


# 🔐 API Authentication

## Current Status

Authentication and authorization are **not implemented** in the current version of FlavorForge.

Currently, all APIs are publicly accessible for development purposes.

---

# Future Design

Future releases may include:

- JWT Authentication
- Role-Based Access Control (RBAC)
- Secure API Authorization
- Protected Routes

---

# Authentication Flow

```text
User Login
      │
      ▼
Authentication Service
      │
      ▼
JWT Token Generated
      │
      ▼
Client Sends JWT
      │
      ▼
Protected API Access
```


---

## `docs/api/api-examples.md`


# 📘 API Usage Examples

## Health Verification

```bash
curl -X GET http://localhost:3000/api/health
```

Expected Response

```json
{
  "status": "UP",
  "application": "FlavorForge Backend",
  "version": "1.3"
}
```

---

## Frontend to Backend API Flow

```text
React Component
      │
      ▼
Axios / Fetch API
      │
      ▼
Express.js Backend
      │
      ▼
Business Logic
      │
      ▼
JSON Response
```

---

## Example JavaScript Request

```javascript
fetch("http://localhost:3000/api/health")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```
