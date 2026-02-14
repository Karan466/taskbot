# 🤖 TaskBot — AI Task Management Chatbot

TaskBot is a production-ready full-stack chatbot that allows users to manage daily tasks using **natural language commands**.  
The project demonstrates real-world backend, frontend, and cloud deployment skills.

---

## 🌍 Live Application

- **Frontend (Vercel)**  
  https://taskbot-lnzh.vercel.app/

- **Backend API (Railway)**  
  https://taskbot-production-e2a6.up.railway.app/

- **API Documentation (Swagger UI)**  
  https://taskbot-production-e2a6.up.railway.app/docs

---

## ✨ Key Features

- Natural language task commands
- Add tasks with date & time parsing
- View tasks in a card-based UI
- Mark tasks as completed
- Delete tasks
- Chat-style interface
- AI typing indicator
- Fully deployed backend and frontend

---

## 🧪 Example Commands

```text
add buy milk tomorrow at 6 pm
my tasks
complete task 1
delete task 1
🛠️ Tech Stack
Backend
FastAPI

SQLAlchemy

SQLite

Python

Railway

Frontend
React (Vite)

TypeScript

Tailwind CSS

Vercel

📂 Project Structure
taskbot/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── models/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── database.py
│   │   └── main.py
│   └── requirements.txt
│
├── frontend-react/
│   ├── src/
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
🚀 Deployment
Backend deployed on Railway

Frontend deployed on Vercel

Automatic redeployments on GitHub push

📈 What This Project Demonstrates
Full-stack ownership

Clean API design with FastAPI

Natural language input handling

Production debugging & cloud deployment

Modern React + Tailwind UI patterns

🔮 Future Improvements
User authentication

Task reminders & notifications

OpenAI-powered NLP

Calendar integration

Mobile app version

👨‍💻 Author
Karan Kumar

GitHub: https://github.com/Karan466

⭐ If you like this project, consider giving it a star!

