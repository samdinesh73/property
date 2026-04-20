# Backend Project Structure

## 📁 Complete Folder Structure

```
backend/
├── src/
│   ├── index.ts                 # Main Express application
│   ├── middleware/
│   │   ├── errorHandler.ts      # Error handling & async wrapper
│   │   └── auth.ts              # Authentication middleware (template)
│   ├── lib/
│   │   └── prisma.ts            # Prisma client instance
│   ├── schemas/
│   │   ├── user.schema.ts       # User validation schemas (Zod)
│   │   ├── property.schema.ts   # Property validation schemas
│   │   ├── inquiry.schema.ts    # Inquiry validation schemas
│   │   └── review.schema.ts     # Review validation schemas
│   ├── routes/
│   │   ├── user.routes.ts       # User endpoints
│   │   ├── property.routes.ts   # Property endpoints
│   │   ├── inquiry.routes.ts    # Inquiry endpoints
│   │   ├── favorite.routes.ts   # Favorite endpoints
│   │   ├── review.routes.ts     # Review endpoints
│   │   └── category.routes.ts   # Category endpoints
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces
│   └── utils/
│       └── helpers.ts            # Utility functions
├── prisma/
│   └── schema.prisma            # Database schema
├── dist/                         # Compiled JavaScript (generated)
├── node_modules/                # Dependencies (generated)
├── .env                         # Environment variables (not in git)
├── .env.example                 # Environment template
├── .gitignore                   # Git ignore rules
├── package.json                 # Project metadata & dependencies
├── tsconfig.json                # TypeScript configuration
├── README.md                    # Project documentation
├── SETUP.md                     # Quick start guide
└── DEVELOPMENT.md               # Development guide (optional)
```

## 📦 Key Dependencies

### Core Framework
- **express**: Web framework
- **cors**: Cross-origin resource sharing
- **helmet**: Security headers
- **morgan**: HTTP request logger

### Database
- **@prisma/client**: ORM client
- **prisma**: ORM CLI and utilities

### Validation & Types
- **zod**: Schema validation
- **typescript**: Type safety

### Development
- **ts-node-dev**: Auto-reload development server
- **@types/express**: TypeScript types for Express
- **@types/node**: TypeScript types for Node.js

## 🔄 Request Flow

```
1. Client sends HTTP request
   ↓
2. Express middleware (cors, helmet, morgan)
   ↓
3. Route handler receives request
   ↓
4. Validation (Zod schema)
   ↓
5. Prisma query to database
   ↓
6. Response sent to client
   ↓
7. Error handler (if any errors)
```

## 🗄️ Database Tables (Prisma Models)

1. **User** - Users and agents
2. **Property** - Real estate listings
3. **Inquiry** - Inquiries about properties
4. **Favorite** - User's favorite properties
5. **Review** - Property reviews and ratings
6. **Category** - Property categories

## 🚀 API Endpoints Summary

### Base URL: `http://localhost:3001/api`

| Resource | Method | Endpoint | Purpose |
|----------|--------|----------|---------|
| Health Check | GET | `/health` | Server status |
| Users | GET | `/users` | List all users |
| Users | GET | `/users/:id` | Get user by ID |
| Users | POST | `/users/register` | Register new user |
| Users | POST | `/users/login` | Login user |
| Users | PUT | `/users/:id` | Update user |
| Users | DELETE | `/users/:id` | Delete user |
| Properties | GET | `/properties` | List properties (with filters) |
| Properties | GET | `/properties/:id` | Get property details |
| Properties | POST | `/properties` | Create property |
| Properties | PUT | `/properties/:id` | Update property |
| Properties | DELETE | `/properties/:id` | Delete property |
| Inquiries | GET | `/inquiries` | List inquiries |
| Inquiries | POST | `/inquiries` | Create inquiry |
| Inquiries | PUT | `/inquiries/:id` | Update inquiry |
| Favorites | GET | `/favorites/user/:userId` | List user favorites |
| Favorites | POST | `/favorites` | Add to favorites |
| Favorites | DELETE | `/favorites/:id` | Remove from favorites |
| Reviews | GET | `/reviews/property/:propertyId` | List property reviews |
| Reviews | POST | `/reviews` | Create review |
| Reviews | PUT | `/reviews/:id` | Update review |
| Categories | GET | `/categories` | List all categories |
| Categories | POST | `/categories` | Create category |

## 🔐 Error Handling

All routes use `asyncHandler` wrapper to catch errors:

```typescript
router.get('/:id', asyncHandler(async (req, res) => {
  // Your code here
  // Errors are automatically caught
}));
```

Custom errors:
```typescript
throw new ApiError(404, "Not found");
throw new ApiError(400, "Validation failed", errors);
```

## 📝 Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* payload */ }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "errors": [ /* validation errors */ ]
}
```

### Paginated Response
```json
{
  "success": true,
  "data": [ /* items */ ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "pages": 10
  }
}
```

## 🔧 Configuration Files

### package.json
- Dependencies and dev dependencies
- NPM scripts for common tasks
- Project metadata

### tsconfig.json
- TypeScript compiler options
- Target ES2020
- Strict mode enabled
- Source and output directories

### .env
- Database connection string
- Port number
- Environment mode

### prisma/schema.prisma
- Database provider (MySQL)
- Data models and relationships
- Field types and constraints

## 📚 Development Workflow

1. **Create migration**: `npm run prisma:migrate`
2. **Generate client**: `npm run prisma:generate`
3. **Start dev server**: `npm run dev`
4. **Test endpoints**: Use Postman or cURL
5. **View database**: `npm run prisma:studio`
6. **Build**: `npm run build`
7. **Deploy**: `npm start`

## 🎯 To-Do Items

- [ ] Implement JWT authentication
- [ ] Add password hashing (bcrypt)
- [ ] Add rate limiting
- [ ] Add file upload functionality
- [ ] Add email notifications
- [ ] Add full-text search
- [ ] Add image optimization
- [ ] Add caching (Redis)
- [ ] Add logging system
- [ ] Add API documentation (Swagger)
- [ ] Add unit tests
- [ ] Add integration tests

## 🚀 Production Checklist

- [ ] Remove example data
- [ ] Enable HTTPS
- [ ] Set strong database passwords
- [ ] Add environment-specific configs
- [ ] Enable database backups
- [ ] Set up monitoring
- [ ] Add error tracking (Sentry)
- [ ] Enable logging
- [ ] Set appropriate CORS settings
- [ ] Enable rate limiting
- [ ] Add request validation logging
- [ ] Set up CI/CD pipeline
