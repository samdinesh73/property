# SafeProperty Backend API

A robust Node.js/Express backend for the SafeProperty real estate platform with MySQL database and Prisma ORM.

## 🚀 Features

- RESTful API with Express.js
- MySQL database with Prisma ORM
- User authentication and management
- Property listing management
- Inquiry management
- Review and rating system
- Favorite/wishlist functionality
- Category management
- Comprehensive error handling
- Input validation with Zod

## 📋 Prerequisites

- Node.js v16+ and npm
- MySQL 8.0+
- Git

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Update `.env` with your database credentials:

```env
DATABASE_URL="mysql://username:password@localhost:3306/safeproperty"
NODE_ENV="development"
PORT=3001
```

### 3. Create MySQL Database

```sql
CREATE DATABASE safeproperty;
```

### 4. Run Prisma Migrations

```bash
npm run prisma:generate
npm run prisma:push
```

Or to create a new migration:

```bash
npm run prisma:migrate
```

### 5. Start Development Server

```bash
npm run dev
```

The server will run on `http://localhost:3001`

## 📚 API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Properties
- `GET /api/properties` - Get properties (with filters)
- `GET /api/properties/:id` - Get property by ID
- `POST /api/properties` - Create property
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property

### Inquiries
- `GET /api/inquiries` - Get all inquiries
- `GET /api/inquiries/:id` - Get inquiry by ID
- `POST /api/inquiries` - Create inquiry
- `PUT /api/inquiries/:id` - Update inquiry status
- `DELETE /api/inquiries/:id` - Delete inquiry

### Favorites
- `GET /api/favorites/user/:userId` - Get user's favorites
- `POST /api/favorites` - Add to favorites
- `DELETE /api/favorites/:id` - Remove from favorites

### Reviews
- `GET /api/reviews/property/:propertyId` - Get property reviews
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

## 🗄️ Database Schema

### User
- id (UUID)
- email (unique)
- password
- name
- phone
- avatar
- role (user, agent, admin)
- verified
- timestamps

### Property
- id (UUID)
- title
- description
- category
- propertyType
- price
- location, city, state, zipCode
- bedrooms, bathrooms, area
- amenities, images, videoUrl
- featured, verified, active
- owner (relationship)
- timestamps

### Inquiry
- id (UUID)
- name, email, phone, message
- status (pending, contacted, converted, rejected)
- property (relationship)
- user (relationship)
- timestamps

### Favorite
- id (UUID)
- user (relationship)
- property (relationship)
- Unique constraint: userId + propertyId

### Review
- id (UUID)
- rating (1-5)
- comment
- property (relationship)
- user (relationship)
- timestamps

### Category
- id (UUID)
- name (unique)
- slug (unique)
- description
- icon, image
- timestamps

## 🔐 Security

- Helmet.js for HTTP headers
- CORS enabled for frontend
- Input validation with Zod
- Async error handling

## 📊 Prisma Studio

View and manage your database with Prisma Studio:

```bash
npm run prisma:studio
```

## 🛠️ Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Create and run migrations
- `npm run prisma:push` - Push schema to database (no migrations)
- `npm run prisma:studio` - Open Prisma Studio

## 📝 Notes

- Password hashing is not implemented yet. Implement bcrypt before production.
- JWT authentication is not implemented. Add authentication middleware for protected routes.
- Add request rate limiting for production.
- Add database backups and recovery procedures.

## 📄 License

ISC
