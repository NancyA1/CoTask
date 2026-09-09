# CoTask

A full-stack project and task management application built to practice building a complete web application with authentication, project management, task assignment, and team collaboration.

## Live Demo

**Frontend:** https://cotaskproject.netlify.app/

> The live deployment is currently used as a frontend showcase. The complete backend API and database integration are included in this repository and can be run locally.

## Features

* User registration and login
* User profile management
* Create and manage projects
* Create and manage tasks
* Add project members
* Assign tasks to team members
* Project and task dashboards
* User settings
* JWT-based authentication with HTTP-only cookies
* Database integration using Prisma

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend

* Node.js
* Express.js
* TypeScript
* JWT
* bcrypt
* cookie-parser
* CORS

### Database

* Microsoft SQL Server
* Prisma ORM

### Deployment

* Netlify

## Architecture

CoTask is structured as a separate frontend and backend application:

```text
CoTask/
├── frontend/
│   ├── app/
│   ├── components/
│   ├── public/
│   └── ...
│
└── backend/
    ├── src/
    │   ├── controllers/
    │   ├── routes/
    │   ├── middlewares/
    │   ├── config/
    │   └── ...
    ├── prisma/
    └── ...
```

The frontend communicates with the Express API, while the backend handles authentication, business logic, and database operations through Prisma.

## Main API Areas

The backend provides endpoints for:

* Authentication
* Users and profiles
* Projects
* Project members
* Tasks
* Task assignments

## Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/NancyA1/CoTask.git
cd CoTask
```

### 2. Run the frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on the local Next.js development server.

### 3. Run the backend

Open another terminal:

```bash
cd backend
npm install
npm run dev
```

### 4. Environment Variables

The backend requires environment variables for configuration, including the database connection and JWT secret.

Create a `.env` file inside the `backend` directory:

```env
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret
```

Use your own local database configuration and secret values.

> Never commit `.env` files or secret credentials to GitHub.

## What I Practiced

Building CoTask gave me hands-on experience with:

* Building a full-stack application
* Designing REST APIs with Express
* Authentication and authorization
* JWT and HTTP-only cookies
* Password hashing with bcrypt
* Prisma ORM and database operations
* Relational data modeling
* Connecting a Next.js frontend to an Express backend
* Managing projects, tasks, users, and relationships
* Structuring a larger application into reusable components and modules
* Deploying a web application

## Project Goal

CoTask was built as a portfolio project to strengthen my full-stack development skills and gain practical experience building an application from the frontend through the backend and database layers.
