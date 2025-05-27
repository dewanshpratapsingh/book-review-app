# Book Review App

This is a simple Book Review application built using Node.js, Express, and MongoDB.  
It follows a clean architecture with separation of concerns via **controller**, **service**, **repository**, and **model** layers.

---

## Features

- User signup and login
- JWT authentication with access and refresh token flow
- CRUD operations on books
- Users can add reviews (one per book per user)
- Pagination and filtering support on listing endpoints

---

## JWT Token Management

JWT-related utility functions (token generation, validation, etc.) are located in /utils/authentication.js


---

## Tech Stack

- **Node.js** & **Express**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- Layered architecture for scalability and maintainability

---

## Installation

1. Clone the repository:
   git clone git@github.com:dewanshpratapsingh/book-review-app.git
2. Go inside the app folder and install dependencies
   cd book-review-app
   npm install

## Run Project
node server.js
