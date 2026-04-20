# 🚀 Quick Start Guide - Backend Setup

## Step 1: Install Dependencies

```bash
cd backend
npm install
```

This will install all required packages including:
- Express.js
- Prisma ORM
- TypeScript
- MySQL client
- Validation libraries

## Step 2: Create MySQL Database

Open MySQL and run:

```sql
CREATE DATABASE safeproperty;
```

Or using command line:

```bash
mysql -u root -p -e "CREATE DATABASE safeproperty;"
```

## Step 3: Configure Environment Variables

Copy the example env file:

```bash
cp .env.example .env
```

Edit `.env` and update with your MySQL credentials:

```env
DATABASE_URL="mysql://root:yourpassword@localhost:3306/safeproperty"
NODE_ENV="development"
PORT=3001
```

**Format:** `mysql://username:password@host:port/database_name`

Example:
```env
DATABASE_URL="mysql://root:password123@localhost:3306/safeproperty"
```

## Step 4: Setup Prisma Schema

Generate Prisma client:

```bash
npm run prisma:generate
```

Push the schema to database (creates tables):

```bash
npm run prisma:push
```

## Step 5: Start Development Server

```bash
npm run dev
```

You should see:
```
✅ Server running on port 3001
🌍 Environment: development
```

## Step 6: Test the API

Open browser or Postman and visit:

```
http://localhost:3001/api/health
```

Response:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

## 📚 API Testing Examples

### Create a User (Register)

```bash
curl -X POST http://localhost:3001/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe",
    "phone": "1234567890"
  }'
```

### Get All Users

```bash
curl http://localhost:3001/api/users
```

### Get All Properties

```bash
curl "http://localhost:3001/api/properties?city=Mumbai&category=apartment"
```

### Create Property

```bash
curl -X POST http://localhost:3001/api/properties \
  -H "Content-Type: application/json" \
  -d '{
    "title": "3 BHK Apartment",
    "description": "Beautiful apartment in downtown",
    "category": "apartment",
    "propertyType": "residential",
    "price": 5000000,
    "location": "Bandra",
    "city": "Mumbai",
    "state": "Maharashtra",
    "bedrooms": 3,
    "bathrooms": 2,
    "area": 1200,
    "ownerId": "user-id-here"
  }'
```

## 🔍 View Database

Open Prisma Studio to view/manage database:

```bash
npm run prisma:studio
```

This opens `http://localhost:5555` in your browser.

## ⚠️ Common Issues

### Error: "connect ECONNREFUSED"
- MySQL is not running
- Check DATABASE_URL in .env
- Verify database exists

### Error: "Access denied for user"
- Wrong MySQL credentials in .env
- Check username and password

### Error: "Prisma client not generated"
- Run: `npm run prisma:generate`

### Port already in use
- Change PORT in .env
- Or kill process on port 3001

## 🎯 Next Steps

1. ✅ Backend is running
2. 🔐 Implement JWT authentication
3. 🔑 Add password hashing (bcrypt)
4. 📁 Add file upload functionality
5. 🔍 Add full-text search
6. 📊 Add analytics/dashboard endpoints

## 📞 Need Help?

- Check console logs for errors
- Verify .env configuration
- Ensure MySQL is running
- Check Prisma documentation: https://www.prisma.io/docs
