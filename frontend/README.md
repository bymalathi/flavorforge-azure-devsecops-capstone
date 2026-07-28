# 🍽️ FlavorForge Frontend

The **FlavorForge Frontend** is a modern React application built using **Vite**. It serves as the user interface for the FlavorForge Azure DevSecOps Capstone Project and communicates with the Express backend through REST APIs.

The project demonstrates enterprise frontend development practices including reusable components, responsive UI design, API integration, routing, error handling, and production-ready architecture.

---

# 🚀 Tech Stack

| Technology | Purpose |
|------------|---------|
| React | Component-based UI library |
| Vite | Fast development server and production build tool |
| React Router DOM | Client-side routing |
| JavaScript (ES6+) | Application logic |
| CSS3 | Styling and responsive design |
| Fetch API | Backend communication |

---

# 📂 Project Structure

```text
frontend/
│
├── public/
│
├── src/
│   ├── api/
│   │   └── apiClient.js
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── BackendStatus/
│   │   ├── CategoryFilter/
│   │   ├── EmptyState/
│   │   ├── ErrorBoundary/
│   │   ├── FeatureCard/
│   │   ├── Features/
│   │   ├── Footer/
│   │   ├── Header/
│   │   ├── Hero/
│   │   ├── NotFound/
│   │   ├── RecipeCard/
│   │   ├── RecipeList/
│   │   ├── SearchBar/
│   │   └── ui/
│   │       ├── Badge/
│   │       ├── Button/
│   │       ├── Card/
│   │       └── Loading/
│   │
│   ├── layouts/
│   │
│   ├── pages/
│   │
│   ├── services/
│   │
│   ├── styles/
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .env
├── package.json
├── vite.config.js
└── README.md
```

---

# ✨ Features

## Application Features

- Responsive modern UI
- Hero landing section
- Feature highlights
- Recipe listing
- Recipe search
- Category filtering
- Backend health monitoring
- Loading indicators
- Empty state handling
- Error Boundary
- 404 Page
- Mobile navigation
- Component-based architecture

---

# 🧩 Reusable Components

The project follows reusable component principles.

### UI Components

- Button
- Card
- Badge
- Loading

### Feature Components

- Hero
- Features
- FeatureCard
- RecipeCard
- RecipeList
- SearchBar
- CategoryFilter
- BackendStatus
- EmptyState
- Header
- Footer
- NotFound
- ErrorBoundary

---

# 🌐 Routing

The application uses React Router.

| Route | Description |
|--------|-------------|
| / | Home page |
| /recipes | Recipe listing |
| /about | About FlavorForge |
| /contact | Contact page |
| * | Custom 404 page |

---

# 🔗 Backend Integration

The frontend communicates with the Express backend through REST APIs.

Current endpoints:

| Endpoint | Purpose |
|----------|---------|
| GET /api/health | Backend health check |
| GET /api/recipes | Retrieve recipe list |

Environment variable:

```env
VITE_API_BASE_URL=http://localhost:3000
```

---

# ⚙️ Environment Configuration

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:3000
```

---

# ▶️ Running the Application

## Install dependencies

```bash
npm install
```

## Start development server

```bash
npm run dev
```

Application:

```
http://localhost:5173
```

Backend must be running on:

```
http://localhost:3000
```

---

# 🏗️ Production Build

Build the application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

# ✅ Code Quality

Run ESLint:

```bash
npm run lint
```

Current project status:

- ESLint passing
- Production build successful
- Responsive layout verified

---

# 🛡️ Error Handling

The frontend includes:

- Error Boundary
- Loading Component
- Empty State
- API error handling
- Backend health monitoring

These improve user experience and make the application more resilient.

---

# 🎨 Responsive Design

The application is responsive for:

- Desktop
- Tablet
- Mobile

Responsive techniques include:

- Flexbox
- CSS Grid
- Media Queries
- Reusable CSS variables

---

# 🏛️ Architecture

```text
Browser
      │
      ▼
React Components
      │
      ▼
Services
      │
      ▼
API Client
      │
      ▼
Express Backend
```

---

# 📦 Project Dependencies

| Package | Purpose |
|----------|---------|
| react | UI library |
| react-dom | React rendering |
| react-router-dom | Client-side routing |
| vite | Development server & production build |
| eslint | Code quality |
| @vitejs/plugin-react | React support for Vite |

---

# 🔒 Dependency Security Note

During development, `npm audit` reported a high-severity advisory related to **react-router**.

Assessment:

- The advisory targets React Server Components (RSC).
- FlavorForge is a client-side React SPA built with Vite.
- React Server Components are not used.
- No exploitable path exists in the current implementation.

Decision:

- Do not apply `npm audit fix --force`.
- Re-evaluate dependency updates during CI/CD testing.

---

# 🚀 Future Enhancements

The frontend will be extended with:

- Docker multi-stage build
- Nginx deployment
- Docker Compose
- Azure Container Registry (ACR)
- Azure Kubernetes Service (AKS)
- Azure DevOps CI/CD Pipeline
- Kubernetes Ingress
- Horizontal Pod Autoscaler
- Monitoring with Prometheus & Grafana

---

# 📚 Learning Outcomes

This frontend demonstrates practical experience with:

- React
- Vite
- Component-based architecture
- React Router
- API integration
- Responsive UI development
- Error handling
- State management using Hooks
- Enterprise folder organization
- Production-ready frontend development

---

# 👩‍💻 Author

**Malathi Shetty**

FlavorForge Azure DevSecOps Capstone Project

Built as part of a hands-on journey to learn modern Cloud, DevOps, Docker, Kubernetes, Azure, and CI/CD practices through a production-style application.