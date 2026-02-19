# Interview Quiz Generator - Chingu Voyage 59, Team 36

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Running the project](#running-the-project)
- [Configuration](#configuration)
- [Team Members](#team-members)

## Overview

This full-stack web application was built as part of **Chingu Voyage 59**, a collaborative remote development program. The goal of the project was to design and implement a structured interview preparation experience that allows users to practice technical and non-technical interview questions in a session-based format.

The application enables users to select a role, complete a question session, receive feedback, and review their overall performance.

## Features

- Select a role to practice interview questions. Available roles include: **Web Developer, Python Developer, Scrum Master, Scrum Product Owner,** and **UI/UX Designer**
- Start a session to track quiz progress and results
- Answer multiple-choice questions with **limited attempts per question**
- Receive immediate **feedback** and detailed **rationale** after answering correctly or exhausting attempts
- View a **final summary** of session performance

## Tech Stack

### Frontend
- ReactJS
- Vite
- Tailwind CSS

### Backend
- NodeJS
- Express
- MongoDB
- Mongoose

### Testing
- Vitest (Frontend)
- Jest (Backend)

### Deployment
- Netlify (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

## Running the project
### Live version:

[Interview Practice App](https://interviewquestiongame.netlify.app)

### From the repo:
1. Clone the repository:

    `git clone https://github.com/chingu-voyages/V59-tier3-team-36`

2. Install backend dependencies: `cd ./backend && npm install`
3. Install frontend dependencies: `cd ./frontend && npm install`
4. Create a **Mongo database**
5. Create `.env` file in the `backend` and `frontend` directories (see environment variables [here](#configuration))
6. Insert **roles** and **questions** into the database: `cd ./backend && npm run data:import`
7. Start backend: `cd ./backend && npm run dev`
8. Start frontend: `cd ./frontend && npm run dev`

## Configuration

### Backend Environment Variables
```
PORT=<port-number>
MONGO_URL=<mongodb-connection-string>
```

### Frontend Environment Variables
```
VITE_API_BASE_URL=<backend-url>
```

## Team Members

- Yangchen Dema(Scrum Master): [GitHub](https://github.com/dema66) / [LinkedIn](https://www.linkedin.com/in/yangchendema/)
- Kevin Llanos (Software Engineer): [GitHub](https://github.com/KevinLlano) / [LinkedIn](https://linkedin.com/in/kevinllanos7)
- Shruthi Reddy (Software Engineer) : [GitHub](https://github.com/shrusred) / [LinkedIn](https://www.linkedin.com/in/ssreddy/)
- Banto Klara (Developer): [GitHub](https://github.com/bantoklara) / [LinkedIn](https://www.linkedin.com/in/banto-laczi-klara/)
- Greg Minezzi: [GitHub](https://github.com/minezzig) / [LinkedIn](https://linkedin.com/in/gregminezzi)
- Stanley Eze (Software Engineer) : [GitHub](https://github.com/Blackmile) / [LinkedIn](https://www.linkedin.com/in/stanleyeze01/)
- Chinedu Olekah (Product Owner): [GitHub](https://github.com/kenako1) / [LinkedIn](https://www.linkedin.com/in/chinedu-olekah/)