<div align="center">

# 🤖 TaskBot  
### AI-Driven Task Management Chatbot (Full-Stack)

A production-ready, full-stack chatbot that allows users to manage daily tasks using **natural language commands** — built to demonstrate **real-world backend, frontend, and deployment skills**.

🚀 Live • 🌐 Deployed • 🧠 NLP-Powered

</div>

---

## 🌍 Live Application

- **Frontend (Vercel)**  
  🔗 https://taskbot-lnzh.vercel.app/

- **Backend API (Railway)**  
  🔗 https://taskbot-production-e2a6.up.railway.app/

- **API Documentation (Swagger)**  
  🔗 https://taskbot-production-e2a6.up.railway.app/docs

---

## 🧠 Why This Project Matters

TaskBot simulates a **real product scenario** where users interact with a system conversationally instead of through forms.

This project demonstrates:
- Designing **API-driven architectures**
- Handling **natural language input**
- Building **responsive UI components**
- Managing **stateful backend logic**
- Deploying & debugging in **production environments**

---

## ✨ Key Features

- 🗣️ **Natural Language Task Commands**
- ➕ Add tasks with date & time parsing
- 📋 Task rendering using card-based UI
- ✅ Complete tasks via chat
- 🗑️ Delete tasks
- ⏳ AI typing indicator for better UX
- 🌐 End-to-end deployed system

---

## 🧪 Sample User Commands

```text
add buy groceries tomorrow at 6 pm
my tasks
complete task 1
delete task 1
🛠️ Technology Stack
Backend
FastAPI — REST API design

SQLAlchemy — ORM & data modeling

SQLite — lightweight persistent storage

Python

Railway — cloud deployment

Frontend
React (Vite) — fast SPA architecture

TypeScript — type-safe UI logic

Tailwind CSS — modern styling

Vercel — frontend deployment

📂 Project Architecture
taskbot/
├── backend/
│   ├── app/
│   │   ├── api/        # API routes
│   │   ├── models/    # Database models
│   │   ├── services/  # NLP logic
│   │   ├── utils/     # Date & time parsing
│   │   ├── database.py
│   │   └── main.py
│   └── requirements.txt
│
├── frontend-react/
│   ├── src/
│   ├── components/
│   └── package.json
│
└── README.md
⚙️ Local Development
Backend
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
Frontend
cd frontend-react
npm install
npm run dev
🚀 Deployment Strategy
Backend deployed on Railway with production environment variables

Frontend deployed on Vercel

CI/CD via GitHub push triggers

📈 What I Learned
Structuring scalable FastAPI projects

Handling NLP-style user input without external AI APIs

Debugging cloud deployment issues (paths, imports, environment)

Building clean, reusable React components

End-to-end ownership of a production system

🔮 Future Enhancements
User authentication (multi-user support)

Task reminders & scheduled notifications

OpenAI-powered NLP understanding

Calendar & email integrations

Mobile app version

👨‍💻 About the Author
Karan Kumar
Software Engineer | Full-Stack Developer

GitHub: https://github.com/Karan466

Passionate about backend systems, APIs, and scalable applications

<div align="center">
⭐ If this project interests you, feel free to star the repository!

</div> ```
