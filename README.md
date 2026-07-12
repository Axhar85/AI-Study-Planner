# AI-Study-Planner
Full-stack AI study planner built with Python frontend and Node.js backend

## Project Structure

```text
AI-Study-Planner/
  frontend/   Python app that users will see and interact with
  backend/    Node.js API that stores data and handles app logic
  docs/       Notes and planning documents for learning step by step
```

## What We Are Building

AI Study Planner helps a student organize subjects, tasks, and study progress.

The current version includes:

- A Python Streamlit frontend
- A Node.js Express backend
- Subject and task creation
- Task completion tracking
- Task deletion
- Dashboard stats and progress bar
- Local JSON persistence for saved subjects and tasks

## Learning Path

We will build this project one step at a time:

1. Create the project structure
2. Build a small Node.js backend
3. Build a Python frontend
4. Connect frontend and backend
5. Save data locally with JSON
6. Add AI-powered study planning
7. Polish and deploy the project

## Backend

The backend is a Node.js and Express API.

Subjects and tasks are saved in:

```text
backend/src/data/subjects.json
```

This is simple local persistence for version 1. Later, this can be replaced with a real database.

### Backend Setup

Go into the backend folder:

```powershell
cd backend
```

Install packages:

```powershell
npm.cmd install
```

Create a local environment file:

```powershell
Copy-Item .env.example .env
```

Start the development server:

```powershell
npm.cmd run dev
```

The backend runs at:

```text
http://localhost:5000
```

### Backend Scripts

```text
npm.cmd run dev   Starts the server with nodemon for development
npm.cmd start     Starts the server normally with Node.js
```

### API Endpoints

```text
GET     /                         Check that the backend is running
GET     /api/subjects             Get all subjects
POST    /api/subjects             Create a subject
POST    /api/subjects/:id/tasks   Create a task for one subject
PATCH   /api/subjects/:id/tasks/:taskId
                                  Update a task
DELETE  /api/subjects/:id/tasks/:taskId
                                  Delete a task
```

### Example Requests

Create a subject:

```powershell
Invoke-RestMethod `
  -Uri http://localhost:5000/api/subjects `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"name":"Physics"}'
```

Create a task:

```powershell
Invoke-RestMethod `
  -Uri http://localhost:5000/api/subjects/1/tasks `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"title":"Study Newton laws"}'
```

Mark a task as complete:

```powershell
Invoke-RestMethod `
  -Uri http://localhost:5000/api/subjects/1/tasks/1 `
  -Method PATCH `
  -ContentType "application/json" `
  -Body '{"completed":true}'
```

Delete a task:

```powershell
Invoke-RestMethod `
  -Uri http://localhost:5000/api/subjects/1/tasks/1 `
  -Method DELETE
```

## Frontend

The frontend is a Python Streamlit app.

### Frontend Setup

Open a second terminal and go into the frontend folder:

```powershell
cd frontend
```

Create a virtual environment:

```powershell
python -m venv .venv
```

Activate it:

```powershell
.\.venv\Scripts\Activate.ps1
```

If PowerShell blocks activation, use the virtual environment Python directly:

```powershell
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m streamlit run app.py
```

Install packages:

```powershell
python -m pip install -r requirements.txt
```

Start the frontend:

```powershell
streamlit run app.py
```

The frontend usually runs at:

```text
http://localhost:8501
```

The frontend reads subjects from:

```text
http://localhost:5000/api/subjects
```

### Version 1 Features

The frontend can:

```text
Create subjects
Create tasks under subjects
Mark tasks complete or incomplete
Delete tasks
Show total subjects
Show total tasks
Show completed and remaining tasks
Show overall progress
```
