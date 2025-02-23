# Full-Stack Coding Challenge

**Deadline**: Sunday, Feb 23th 11:59 pm PST

---

## Overview

This is a “Task Management” application with **React + TypeScript** (frontend), **Node.js** (or **Nest.js**) (backend), and **PostgreSQL** (database) with functionality below:

1. **Register** (sign up) and **Log in** (sign in) users.
2. After logging in, allow users to:
   - **View a list of tasks**.
   - **Create a new task**.
   - **Update an existing task** (e.g., mark complete, edit).
   - **Delete a task**.

---

## Demo

[Demo Video](https://drive.google.com/file/d/19DqXS-JoQ4FHAjQH1w_hzCveeraPmKiC/view?usp=drive_link)

## Features

### 1. Authentication

- **User Model**:
  - `id`: Primary key
  - `username`: string
  - `email`: unique string
  - `password`: hashed string
- **Endpoints**:
  - `POST /auth/register` – Create a new user
  - `POST /auth/login` – Login user, return a token (e.g., JWT)
- **Secure the Tasks Routes**: Only authenticated users can perform task operations.  
  - **Password Hashing**: Use `bcrypt` or another hashing library to store passwords securely.
  - **Token Verification**: Verify the token (JWT) on each request to protected routes.

### 2. Backend (Node.js)
Check [Readme](backend/README.md)

### 3. Frontend (React + TypeScript + Vite)
Check [Readme](frontend/README.md)




<details>
  <summary>Salary Expectation? </summary>
    4,000 ~ 5,000 USD
</details>