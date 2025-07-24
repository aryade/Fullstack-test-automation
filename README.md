# Todo App

A full-stack Todo application built with Node.js (Express) backend and React frontend.
Includes automated API and UI tests.

## Features

- User authentication (login)
- Create, read, update, delete (CRUD) todos
- Responsive React UI
- Automated API tests (Jest + Supertest)
- Automated UI tests (Playwright)
- Manual API test collection (Postman)
- Integrated test scripts into a GitHub Actions/CI pipeline.
- Added code coverage reporting.
- Added visual test snapshots (for UI)

## Getting Started

### Prerequisites

- Node.js & npm
- Python (for Playwright UI tests)
- Postman (for manual API testing)

### Installation


1. **Install backend dependencies:**
   ```sh
   cd backend
   npm install
   ```

2. **Install frontend dependencies:**
   ```sh
   cd ../frontend
   npm install
   ```

### Running the App

- **Start backend:**
  ```sh
  cd backend
  npm start
  ```
- **Start frontend:**
  ```sh
  cd frontend
  npm start
  ```

### Running Tests

- **API Tests (Jest + Supertest):**
  ```sh
  cd backend
  npm test
  ```
- **UI Tests (Playwright):**
  ```sh
  cd frontend/ui-tests
  pytest
  ```
- **API Manual Tests (Postman):**
  - Import the provided Postman collection and run requests against `http://localhost:4000`.


##