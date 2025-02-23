# Backend (Node.js)

## Setup Instructions

### Prerequisites
- **Node.js**: Download [Here](https://nodejs.org/en/download)
- **PostgreSQL**: Download [Here](https://www.postgresql.org/download/)

### How to Run
1. check [.env.example](./.env.example) to set required environment variables.
2. `npm install` to install dependencies
3. `npm run migrate:up` to migrate database
4. `npm run dev` to run the server

## Features

- **User Model**
  - `id`: Primary key
  - `username`: string
  - `email`: Unique string
  - `password`: Hashed string

- **Task Model**:
  - `id`: Primary key
  - `title`: string
  - `description`: string (optional)
  - `isComplete`: boolean (default `false`)
  - `createdAT`: a timestamp in a string format
  - `updatedAT`: a timestamp in a string format
  - _(Optional)_ `userId` to link tasks to the user who created them

- **Tasks CRUD**:  
  - `GET /tasks` – Retrieve a list of tasks (optionally filtered by user).  
  - `POST /tasks` – Create a new task.  
  - `PUT /tasks/:id` – Update a task (e.g., mark as complete, edit text).  
  - `DELETE /tasks/:id` – Delete a task.
- **Database**: PostgreSQL
    - `users` table (with hashed passwords)
    - `tasks` table
- **Setup**:
  - `npm install` to install dependencies
  - `npm run start` (or `npm run dev`) to run the server
  - Document any environment variables (e.g., database connection string, JWT secret)