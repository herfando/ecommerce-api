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

Menggunakan JWT:

- Register
- Login
- Protected Routes

Header:

```
Authorization: Bearer <token>
```

---

## 📌 API Endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`

### Users

- `GET /api/users`
- `GET /api/users/:id`

### Products

- `GET /api/products`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`

### Cart

- `GET /api/cart`
- `POST /api/cart`

### Orders

- `POST /api/orders`
- `GET /api/orders`

---

## 📤 Upload File (S3)

Menggunakan AWS SDK:

```js
const AWS = require("aws-sdk");

const s3 = new AWS.S3();

const uploadFile = async (file) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: file.originalname,
    Body: file.buffer,
  };

  return await s3.upload(params).promise();
};
```

---

## 🧪 Testing

```bash
npm test
```

---

## 🐳 Docker (Optional)

```bash
docker build -t ecommerce-api .
docker run -p 5000:5000 ecommerce-api
```

---

## 📈 Deployment Steps (AWS EC2)

1. Launch EC2 Instance
2. Install Node.js & PM2
3. Clone repo
4. Setup environment variables
5. Run app with PM2:

```bash
pm2 start server.js
```

---

## 🤝 Contributing

Pull request dipersilakan. Untuk perubahan besar, buka issue terlebih dahulu.

---

## 📄 License

MIT License

---


