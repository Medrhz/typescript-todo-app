
# TypeScript Todo App ✅

A simple and clean Todo List application built with **TypeScript**, following modular architecture using the MVC (Model-View-Controller) pattern.

---

## 🚀 Features

- Add, edit, delete, and toggle todo tasks  
- Persist tasks using **localStorage**  
- Modular structure (models, services, UI, app logic)  
- Built with **TypeScript**  
- Live reloading using `live-server`

---

## 🧱 Project Structure

```
typescript-todo-app/
│
├── src/ # TypeScript source files
│   ├── models/ # Type definitions (interfaces)
│   │   └── todo.ts
│   ├── services/ # Business logic (data handling)
│   │   └── todo.service.ts
│   ├── ui/ # UI logic (DOM interaction)
│   │   └── todo.ui.ts
│   ├── app.ts # App controller (ties UI + logic)
│   └── main.ts # Entry point (bootstraps app)
│
├── public/ # Static frontend files
│   ├── index.html # HTML UI
│   └── style.css # Optional styling
│
├── dist/ # Compiled JS output (auto-generated)
│
├── package.json # Project metadata and scripts
├── tsconfig.json # TypeScript configuration
└── README.md # This file
```

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/your-username/typescript-todo-app.git
cd typescript-todo-app

# Install project dependencies
npm install
```

## 🛠️ Run the Project

```bash
# Compile TypeScript to JavaScript
npm run build

# Start the development server
npm start

# Or run in watch mode (auto-compile on changes)
npm run watch
```
Make sure live-server is installed locally as a dev dependency
You can install it with:
`npm install --save-dev live-server`

## 📦 Scripts (package.json)

```json
"scripts": {
  "build": "npx tsc",
  "start": "npm run build && live-server public",
  "watch": "npx tsc --watch"
}
```

## ✍️ Author
Made with ❤️ by Mohamed RHZIZA
GitHub: https://github.com/Medrhz

## 📄 License
This project is licensed under the MIT License.

---


