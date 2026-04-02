# 🛒 E-Commerce API (Node.js + AWS)

RESTful API untuk sistem e-commerce menggunakan Node.js dan layanan AWS. Dirancang scalable, modular, dan siap production.

---

## 🚀 Tech Stack

- Node.js (Express.js)
- AWS (EC2, S3, RDS, API Gateway, Lambda - optional)
- PostgreSQL / MySQL (RDS)
- JWT Authentication
- Docker (optional)

---

## 📦 Features

- 🔐 Authentication & Authorization (JWT)
- 👤 User Management
- 🛍️ Product Management
- 🧺 Cart System
- 💳 Order & Payment
- ☁️ File Upload ke AWS S3
- 📊 Admin Dashboard API

---

## 📁 Project Structure

```
├── src
│   ├── controllers
│   ├── services
│   ├── models
│   ├── routes
│   ├── middlewares
│   ├── utils
│   └── config
├── tests
├── .env
├── package.json
└── server.js
```

---

## ⚙️ Installation

```bash
git clone https://github.com/your-username/ecommerce-api.git
cd ecommerce-api
npm install
```

---

## 🔑 Environment Variables

Buat file `.env`:

```
PORT=5000
DB_HOST=your-rds-endpoint
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=ecommerce
JWT_SECRET=your-secret-key
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=ap-southeast-1
AWS_S3_BUCKET=your-bucket-name
```

---

## ▶️ Running the App

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

---

## ☁️ AWS Architecture

- **EC2** → Hosting backend
- **RDS** → Database
- **S3** → Image storage
- **API Gateway** (optional) → Routing API
- **Lambda** (optional) → Serverless functions

---

## 🔐 Authentication
