# 🌿 Air Quality Visualization 

This is a Next.js application for visualizing air quality data using interactive charts.

## 🛠️ Tech Stack

- **Next.js 14** – React-based framework for server-side rendering and static site generation  
- **Recharts** – Data visualization library for interactive charts  
- **Prettier** – Code formatter for consistent styling  
- **Tailwind CSS** – Utility-first CSS framework for styling  

---

## 🚀 Getting Started


### 1. Install dependencies
```bash
yarn
```

### 2. Configure environment variables
- Copy the example environment file:
```bash
cp .env.example .env
```
- Open `.env` and add your backend API URL:
```env
NEXT_PUBLIC_BACKEND_API_URL=https://your-backend-api.com
```

### 3. Start the development server
```bash
yarn dev
```
The application will be running at: [http://localhost:3000](http://localhost:3000)

---

## 🛎️ Available Commands

| Command                 | Description                                   |
|-------------------------|-----------------------------------------------|
| `yarn dev`             | Run the development server                   |
| `yarn build`           | Build the application for production         |
| `yarn start`           | Start the production server                  |
| `yarn lint`            | Run ESLint to check for code quality         |
| `yarn format`          | Format code using Prettier                  |

---


## 💎 Code Style & Quality

- **Prettier**: Auto-formats code for consistency  
- **ESLint**: Linting with Next.js recommended rules  

### Format Code:
```bash
yarn format
```

### Lint Code:
```bash
yarn lint
```

---

## 🚀 Building for Production

1. **Create a production build**:
```bash
yarn build
```

2. **Run the production server**:
```bash
yarn start
```

The production server will be available at: [http://localhost:3000](http://localhost:3000)

