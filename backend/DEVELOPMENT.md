# Backend Development Guide

## 🎯 Getting Started

### First Time Setup

1. **Clone and Navigate**
   ```bash
   cd safeproperty/backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create Database**
   ```bash
   mysql -u root -p
   > CREATE DATABASE safeproperty;
   > EXIT;
   ```

4. **Setup Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your MySQL credentials
   ```

5. **Initialize Database**
   ```bash
   npm run prisma:push
   ```

6. **Start Development**
   ```bash
   npm run dev
   ```

Server runs at: `http://localhost:3001`

## 📝 Common Tasks

### Add a New Database Model

1. **Update Prisma Schema**
   ```
   // prisma/schema.prisma
   model NewModel {
     id String @id @default(uuid())
     // Add fields here
   }
   ```

2. **Push to Database**
   ```bash
   npm run prisma:push
   ```

### Create a New API Endpoint

1. **Create validation schema** (src/schemas/)
   ```typescript
   export const createItemSchema = z.object({
     name: z.string(),
     // Add fields
   });
   ```

2. **Create route** (src/routes/)
   ```typescript
   import { Router } from "express";
   
   const router = Router();
   
   router.get("/", async (req, res) => {
     // Your endpoint logic
   });
   
   export default router;
   ```

3. **Register route** (src/index.ts)
   ```typescript
   import itemRoutes from "./routes/item.routes";
   app.use("/api/items", itemRoutes);
   ```

### Debug Database Issues

```bash
# Open Prisma Studio to view/edit database
npm run prisma:studio
```

## 🔄 Environment-Specific Config

### Development (.env)
```env
DATABASE_URL="mysql://user:pass@localhost:3306/safeproperty"
NODE_ENV="development"
PORT=3001
```

### Production
```env
DATABASE_URL="mysql://user:pass@prod-db:3306/safeproperty"
NODE_ENV="production"
PORT=3001
JWT_SECRET="your-secret-key"
```

## 📊 Database Seeding

To add initial data, create `prisma/seed.ts`:

```typescript
import prisma from "../src/lib/prisma";

async function main() {
  const user = await prisma.user.create({
    data: {
      email: "admin@example.com",
      password: "password123",
      name: "Admin",
      role: "admin",
    },
  });
  console.log("Seeded:", user);
}

main();
```

Run: `npx ts-node prisma/seed.ts`

## 🛠️ Useful Commands

```bash
# Start development server (with hot reload)
npm run dev

# Build TypeScript to JavaScript
npm run build

# Start production server
npm start

# Generate Prisma client
npm run prisma:generate

# Create and run database migration
npm run prisma:migrate

# Push schema to database (no migrations)
npm run prisma:push

# Open Prisma Studio
npm run prisma:studio

# Lint code
npm run lint
```

## 🧪 Testing Endpoints

### Using cURL

```bash
# Get all users
curl http://localhost:3001/api/users

# Create user
curl -X POST http://localhost:3001/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "pass123",
    "name": "Test User"
  }'
```

### Using Postman

1. Import collection or create requests manually
2. Set method (GET, POST, PUT, DELETE)
3. Set URL (e.g., `http://localhost:3001/api/users`)
4. Add headers: `Content-Type: application/json`
5. Add body for POST/PUT requests
6. Click Send

### Using Thunder Client / REST Client

Similar to Postman but can be integrated in VS Code.

## 🚨 Common Issues & Solutions

### Issue: "Error: connect ECONNREFUSED"
**Solution**: MySQL is not running
```bash
# On Windows
mysql.server start

# On Mac
brew services start mysql

# On Linux
sudo systemctl start mysql
```

### Issue: "Access denied for user 'root'@'localhost'"
**Solution**: Wrong credentials in .env
- Check DATABASE_URL
- Verify MySQL user and password

### Issue: "database does not exist"
**Solution**: Create the database
```bash
mysql -u root -p -e "CREATE DATABASE safeproperty;"
```

### Issue: "Port 3001 is already in use"
**Solution**: Change port in .env or kill process
```bash
# On Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# On Mac/Linux
lsof -ti:3001 | xargs kill -9
```

## 📚 Resource Links

- [Express.js Docs](https://expressjs.com/)
- [Prisma Docs](https://www.prisma.io/docs/)
- [Zod Validation](https://zod.dev/)
- [MySQL](https://dev.mysql.com/doc/)
- [REST API Best Practices](https://restfulapi.net/)

## 🔐 Security Checklist

Before deployment:

- [ ] Implement password hashing (bcrypt)
- [ ] Add JWT authentication
- [ ] Enable HTTPS
- [ ] Add rate limiting
- [ ] Validate all inputs
- [ ] Set secure CORS headers
- [ ] Add request logging
- [ ] Hide sensitive data from logs
- [ ] Use environment variables for secrets
- [ ] Add database backups
- [ ] Implement error logging

## 🎨 Code Style

The project uses:
- **ESLint**: Code linting (optional setup)
- **TypeScript**: Type safety
- **Prettier**: Code formatting (optional setup)

## 📞 Support

For issues or questions:
1. Check console output for error messages
2. Review Prisma Studio for database state
3. Check .env configuration
4. Verify MySQL is running
5. Review API response status codes
