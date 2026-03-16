ecommerce-api – RESTful API for React Native E-Commerce
Description

ecommerce-api is a RESTful API built with Node.js, Express, and MongoDB to power mobile e-commerce applications. It provides endpoints for products, users, carts, and orders, optimized for React Native but usable with any front-end.

This backend is lightweight, scalable, and follows modern best practices for building e-commerce apps.

Features :

Products CRUD: Create, Read, Update, Delete products

User Authentication: Sign-up, login, JWT-based authentication

Shopping Cart: Add, remove, view cart items

Orders Management: Place and track orders

MongoDB Integration: Flexible, document-based storage

Security & CORS: Configured for safe access

Tech Stack

Backend: Node.js, Express.js

Database: MongoDB Atlas or local MongoDB

Authentication: JWT (JSON Web Token)

Testing / Client: Postman, React Native, Web front-end optional

Folder Structure
ecommerce-api/
│
├─ src/
│ ├─ controllers/ # API logic for products, users, cart, orders
│ ├─ models/ # Mongoose schemas
│ ├─ routes/ # Express route definitions
│ ├─ middleware/ # Authentication, error handling, etc.
│ ├─ utils/ # Helper functions
│ └─ app.js # Express app setup
│
├─ .env #
├─ package.json # Project dependencies & scripts
└─ README.md
