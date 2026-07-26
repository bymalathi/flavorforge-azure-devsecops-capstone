# 🍽️ FlavorForge Backend

The **FlavorForge Backend** is an enterprise-style REST API built with **Node.js** and **Express.js**. It provides the core application services for the FlavorForge Azure DevSecOps Capstone Project and serves as the communication layer between the frontend application and future database services.

The backend follows a layered architecture that separates routing, controllers, services, configuration, and business logic to improve maintainability, scalability, and testability.

Although the current implementation uses in-memory data for demonstration purposes, the project structure has been designed to support future integration with databases, authentication services, containerization, Kubernetes deployment, and Azure DevOps CI/CD pipelines.

---

# 🚀 Technology Stack

| Technology        | Purpose                                     |
| ----------------- | ------------------------------------------- |
| Node.js           | JavaScript runtime                          |
| Express.js        | REST API framework                          |
| dotenv            | Environment variable management             |
| JavaScript (ES6+) | Backend application logic                   |
| REST API          | Communication between frontend and backend  |
| Nodemon           | Automatic server restart during development |

---

# 📂 Project Structure

```text
backend/
│
├── src/
│   ├── app.js
│   │
│   ├── config/
│   │   └── app.config.js
│   │
│   ├── controllers/
│   │   ├── health.controller.js
│   │   └── recipe.controller.js
│   │
│   ├── services/
│   │   ├── health.service.js
│   │   └── recipe.service.js
│   │
│   ├── routes/
│   │   ├── health.routes.js
│   │   └── recipe.routes.js
│   │
│   ├── middleware/
│   ├── database/
│   ├── models/
│   ├── utils/
│   │
│   └── server.js
│
├── tests/
│   ├── server-test.js
│   └── test.js
│
├── package.json
├── package-lock.json
└── README.md
```

---

# ✨ Features

The current backend implementation provides:

* RESTful API architecture
* Express-based HTTP server
* Health monitoring endpoint
* Recipe API endpoint
* Environment-based configuration
* Modular routing
* Layered Controller → Service architecture
* Reusable configuration module
* CORS support for frontend integration
* Production-ready folder organization

---

# 🏛️ Backend Architecture

The backend follows a layered architecture that separates responsibilities into independent layers.

```text
Client Request
      │
      ▼
Express Router
      │
      ▼
Controller
      │
      ▼
Service
      │
      ▼
Business Logic
      │
      ▼
JSON Response
```

Each layer has a single responsibility.

## Routes

Routes receive incoming HTTP requests and forward them to the appropriate controller.

Current routes include:

* Health Routes
* Recipe Routes

---

## Controllers

Controllers process incoming requests and coordinate application logic.

Responsibilities include:

* Receiving client requests
* Calling service methods
* Returning HTTP responses
* Managing response status codes

Current controllers:

* Health Controller
* Recipe Controller

---

## Services

Services contain the application's business logic.

Responsibilities include:

* Processing data
* Returning business objects
* Keeping controllers lightweight
* Supporting future database integration

Current services:

* Health Service
* Recipe Service

---

## Configuration

The configuration layer centralizes application settings.

Current configuration includes:

* Application Name
* Environment
* Port
* Version

Future configuration may include:

* Database connections
* JWT secrets
* Azure Key Vault integration
* External API credentials

---

# 🌐 REST API Endpoints

## Health Endpoint

| Method | Endpoint  | Description                   |
| ------ | --------- | ----------------------------- |
| GET    | `/health` | Returns backend health status |

Example Response

```json
{
  "status": "UP",
  "application": "FlavorForge Backend",
  "version": "1.0.0",
  "timestamp": "2026-07-26T12:30:00.000Z"
}
```

---

## Recipe Endpoint

| Method | Endpoint   | Description                   |
| ------ | ---------- | ----------------------------- |
| GET    | `/recipes` | Returns the available recipes |

The recipe endpoint currently returns sample in-memory data and is designed for future integration with a persistent database.

---

# ⚙️ Environment Configuration

The backend uses **dotenv** to load environment variables.

Example:

```env
PORT=3000
NODE_ENV=development
APP_NAME=FlavorForge Backend
APP_VERSION=1.0.0
```

Configuration is centralized in:

```text
src/config/app.config.js
```

Keeping configuration outside the source code makes it easier to support different environments such as development, testing, staging, and production.

---

# ▶️ Running the Application

## Install Dependencies

```bash
npm install
```

---

## Start Development Server

```bash
npm run dev
```

The backend starts on:

```text
http://localhost:3000
```

---

## Start Production Server

```bash
npm start
```

---

# 🧪 Testing the API

Verify that the backend is running.

Open a browser:

```text
http://localhost:3000/health
```

Or use curl:

```bash
curl http://localhost:3000/health
```

A successful response confirms that:

* Express server is running
* Routing is functioning correctly
* Controller layer is working
* Service layer is responding
* JSON responses are being generated

---

# 📦 Project Dependencies

| Package | Purpose                         |
| ------- | ------------------------------- |
| express | REST API framework              |
| dotenv  | Environment variable management |
| nodemon | Development auto-restart        |

---

# 🛡️ Error Handling

The backend architecture supports centralized error handling.

Future improvements may include:

* Global exception middleware
* Request validation
* Custom error classes
* Standardized HTTP error responses
* Structured logging

---

# 🔐 Security Considerations

Current security measures include:

* CORS configuration for frontend communication
* Environment variable management using dotenv

Future enhancements may include:

* Helmet.js
* Rate limiting
* JWT Authentication
* OAuth integration
* Azure Key Vault
* Secure HTTP headers
* Input validation

---

# 🐳 Planned DevOps Integration

The backend architecture has been designed to support containerized and cloud-native deployment.

Future phases of the project include:

* Docker containerization
* Docker Compose
* Azure Container Registry (ACR)
* Azure Kubernetes Service (AKS)
* Kubernetes Deployments
* Services
* ConfigMaps
* Secrets
* Horizontal Pod Autoscaler (HPA)

---

# 🚀 CI/CD Readiness

The project structure supports enterprise DevOps workflows.

Planned CI/CD pipeline stages include:

* Source checkout
* Dependency installation
* Code quality analysis
* Unit testing
* Docker image build
* Image vulnerability scanning
* Container registry push
* Kubernetes deployment
* Automated rollout validation

---

# 📈 Future Enhancements

The backend will continue evolving with:

* Database integration
* CRUD operations for recipes
* Authentication and Authorization
* Request validation
* Swagger/OpenAPI documentation
* Structured logging
* Redis caching
* Background jobs
* Message queue integration
* Prometheus monitoring
* Grafana dashboards
* Azure Application Insights

---

# 📚 Learning Outcomes

This backend demonstrates practical experience with:

* Node.js
* Express.js
* REST API development
* Layered backend architecture
* Route organization
* Controller-Service pattern
* Environment configuration
* Modular project structure
* Enterprise backend organization
* Production-ready application design
* DevOps-ready backend development

---

# 👩‍💻 Author

**Malathi Shetty**

FlavorForge Azure DevSecOps Capstone Project

Built as part of a hands-on learning journey to develop modern backend engineering, Cloud, Docker, Kubernetes, Azure, DevSecOps, and CI/CD skills by creating a production-style REST API following enterprise software development practices.
