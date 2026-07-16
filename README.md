# CS453 Project - Task Management API

## Overview

This project is a Task Management REST API developed for CS 453 Client/Server Architectures. The application provides a backend service for managing tasks using Node.js, Express, TypeScript, and PostgreSQL.

Checkpoint 1 focuses on building a REST API that supports CRUD operations, persists data in PostgreSQL, validates client input, and separates application logic into routes, services, and database components.

---

## Features

Current functionality includes:

- Create a task
- View all tasks
- View a single task by ID
- Update an existing task
- Delete a task
- PostgreSQL database persistence
- Request validation
- Automated API tests using Jest and Supertest

---

## Technology Stack

### Server

- Node.js 20
- TypeScript
- Express

### Database

- PostgreSQL
- Docker

### Development Tools

- npm
- Jest
- Supertest
- ts-jest

---

## Prerequisites

Install the following before running the project:

- Node.js 20
- Docker Desktop
- Git

---

## Installation

Clone your repository:

```bash
git clone <your-repository-url>
cd cs453-project-template
```

Install the root dependencies:

```bash
npm install
```

Install the API dependencies:

```bash
cd apps/api
npm install
cd ../..
```

---

## Environment Configuration

Create a `.env` file in the project root by copying `.env.example`.

Example:

```text
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/cs453
PORT=3000
JWT_SECRET=changeme
```

---

## Database Setup

Start PostgreSQL:

```bash
npm run db:start
```

Create the database tables:

```bash
docker exec -i cs453-postgres psql -U postgres -d cs453 < database/schema.sql
```

---

## Running the API

From the project root:

```bash
npm run dev
```

The API runs at:

```text
http://localhost:3000
```

---

## Running Tests

From the API directory:

```bash
cd apps/api
npm test
```

To verify TypeScript compilation:

```bash
npm run build
```

---

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/health` | API health check |
| GET | `/db-health` | Database health check |
| GET | `/tasks` | Retrieve all tasks |
| GET | `/tasks/:id` | Retrieve a task by ID |
| POST | `/tasks` | Create a task |
| PATCH | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

---

## Example Requests

Create a task:

```bash
curl -X POST http://localhost:3000/tasks \
-H "Content-Type: application/json" \
-d "{\"title\":\"Finish CS453 Checkpoint\",\"status\":\"todo\"}"
```

Retrieve all tasks:

```bash
curl http://localhost:3000/tasks
```

Update a task:

```bash
curl -X PATCH http://localhost:3000/tasks/1 \
-H "Content-Type: application/json" \
-d "{\"status\":\"in-progress\"}"
```

Delete a task:

```bash
curl -X DELETE http://localhost:3000/tasks/1
```

---

## Checkpoint 1 Summary

Completed functionality:

- REST API with CRUD operations
- PostgreSQL persistence
- Input validation
- Proper HTTP status codes
- Layered architecture (routes, services, database)
- Automated tests with Jest and Supertest