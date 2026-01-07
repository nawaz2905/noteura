# Noteura 🧠

Noteura is a "Second Brain" application designed to help you capture, organize, and store your thoughts, notes, and links efficiently. It features a robust backend for secure data storage and a modern, responsive frontend for a seamless user experience.

## ✨ Features

- **Store & Organize**: Save notes, links, and documents easily.
- **Secure Authentication**: User signup and login with JWT and password hashing.
- **Modern UI**: Built with React 19 and Tailwind CSS for a fast, premium feel.
- **TypeScript**: End-to-end type safety for better developer experience and stability.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **API Client**: [Axios](https://axios-http.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Validation**: [Zod](https://zod.dev/)
- **Security**: JWT (JSON Web Tokens), Bcrypt for password hashing
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 📂 Project Structure

```text
Noteura/
├── frontend-noteura/   # React frontend application
├── backend-noteura/    # Node.js/Express backend API
└── README.md           # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (local or Atlas)

### Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/nawaz2905/noteura.git
   cd noteura
   ```

2. **Backend Setup**:
   ```bash
   cd backend-noteura
   npm install
   # Create a .env file based on the environment requirements
   npm run dev
   ```

3. **Frontend Setup**:
   ```bash
   cd ../frontend-noteura
   npm install
   npm run dev
   ```

## 📜 Scripts

### Backend
- `npm run dev`: Starts the server in development mode.
- `npm run build`: Compiles TypeScript to JavaScript.
- `npm start`: Runs the compiled production build.

### Frontend
- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the application for production.
- `npm run lint`: Runs ESLint for code quality checks.

## 📄 License

This project is licensed under the ISC License.
