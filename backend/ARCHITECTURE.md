# SafeProperty Backend Architecture

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Next.js)                      │
│              (http://localhost:3000)                        │
└────────────────────────┬────────────────────────────────────┘
                         │
                      HTTP/CORS
                         │
┌────────────────────────▼────────────────────────────────────┐
│                    Express Server                           │
│              (http://localhost:3001)                        │
├────────────────────────────────────────────────────────────┤
│  Middleware Layer                                           │
│  ├─ CORS (Cross-Origin)                                    │
│  ├─ Helmet (Security Headers)                             │
│  ├─ Morgan (Request Logging)                              │
│  ├─ Body Parser (JSON)                                    │
│  └─ Error Handler                                         │
├────────────────────────────────────────────────────────────┤
│  Route Controllers                                         │
│  ├─ /api/users       → User Management                    │
│  ├─ /api/properties  → Property Listings                  │
│  ├─ /api/inquiries   → Property Inquiries                 │
│  ├─ /api/favorites   → Wishlist                           │
│  ├─ /api/reviews     → Reviews & Ratings                  │
│  └─ /api/categories  → Categories                         │
├────────────────────────────────────────────────────────────┤
│  Business Logic Layer                                      │
│  ├─ Validation (Zod Schemas)                              │
│  ├─ Authorization (Middleware)                            │
│  └─ Error Handling                                        │
├────────────────────────────────────────────────────────────┤
│  Data Access Layer (Prisma ORM)                           │
│  └─ Query Building & Optimization                        │
└────────────────────────┬────────────────────────────────────┘
                         │
                    SQL Queries
                         │
┌────────────────────────▼────────────────────────────────────┐
│                   MySQL Database                           │
│              (localhost:3306)                              │
├────────────────────────────────────────────────────────────┤
│  Tables                                                    │
│  ├─ User (users)                                          │
│  ├─ Property (properties)                                 │
│  ├─ Inquiry (inquiries)                                   │
│  ├─ Favorite (favorites)                                  │
│  ├─ Review (reviews)                                      │
│  └─ Category (categories)                                 │
└────────────────────────────────────────────────────────────┘
```

## 📊 Data Flow Example: Search Properties

```
1. User clicks Search in Frontend
   ↓
2. Frontend sends GET request to /api/properties?city=Mumbai&category=apartment
   ↓
3. Express Router receives request
   ↓
4. Middleware processes (CORS, logging, parsing)
   ↓
5. Route handler executes asyncHandler
   ↓
6. Validation: Query parameters validated with Zod schema
   ↓
7. Prisma builds SQL query with filters
   ↓
8. MySQL executes query and returns results
   ↓
9. Include related data (owner info, reviews count)
   ↓
10. Format response with pagination metadata
   ↓
11. Send JSON response to Frontend
   ↓
12. Frontend receives and displays results
```

## 🔐 Authentication Flow (Future Implementation)

```
1. User enters credentials
   ↓
2. POST /api/users/login
   ↓
3. Validate email format (Zod)
   ↓
4. Find user in database
   ↓
5. Compare passwords (bcrypt)
   ↓
6. Generate JWT token
   ↓
7. Return token to frontend
   ↓
8. Frontend stores token (localStorage/cookie)
   ↓
9. Frontend includes token in Authorization header
   ↓
10. Express verifies token with JWT middleware
   ↓
11. Allow/Deny request based on token
```

## 📦 Request/Response Cycle

```
CLIENT REQUEST:
├─ Method: GET, POST, PUT, DELETE
├─ URL: /api/resource
├─ Headers: Content-Type, Authorization, etc.
└─ Body: JSON (for POST/PUT)

              ↓

EXPRESS PROCESSING:
├─ Parse headers and body
├─ Match route pattern
├─ Execute middleware
├─ Validate input
├─ Query database
└─ Process results

              ↓

SERVER RESPONSE:
├─ Status Code: 200, 201, 400, 401, 404, 500, etc.
├─ Headers: Content-Type: application/json
└─ Body: 
   {
     "success": true/false,
     "message": "...",
     "data": {...},
     "pagination": {...}
   }
```

## 🗄️ Database Relationships

```
User
 ├─ has many Properties (as owner)
 ├─ has many Inquiries
 ├─ has many Favorites
 └─ has many Reviews

Property
 ├─ belongs to User (owner)
 ├─ has many Inquiries
 ├─ has many Favorites
 └─ has many Reviews

Inquiry
 ├─ belongs to Property
 └─ belongs to User (optional)

Favorite
 ├─ belongs to User
 └─ belongs to Property

Review
 ├─ belongs to Property
 └─ belongs to User

Category
 └─ independent (lookup table)
```

## 🔄 API Response Patterns

### List Response
```json
{
  "success": true,
  "data": [
    { "id": "...", "name": "..." },
    { "id": "...", "name": "..." }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "pages": 10
  }
}
```

### Detail Response
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "...",
    "description": "...",
    "owner": { "id": "...", "name": "..." },
    "reviews": [...]
  }
}
```

### Create/Update Response
```json
{
  "success": true,
  "message": "Property created successfully",
  "data": { "id": "...", "title": "..." }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Validation failed",
  "errors": [
    { "field": "email", "message": "Invalid email" }
  ]
}
```

## 🚀 Deployment Architecture

```
Production Environment:

┌─────────────────────────────────────────┐
│      CloudFlare / CDN (Optional)        │
└──────────────┬──────────────────────────┘
               │ HTTPS
┌──────────────▼──────────────────────────┐
│      Load Balancer (Optional)           │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│  Application Server(s) (Node.js)        │
│  ├─ Server 1 (Express App)              │
│  ├─ Server 2 (Express App)              │
│  └─ Server N (Express App)              │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│   Database Cluster (MySQL)              │
│   ├─ Primary (Write)                    │
│   ├─ Replica 1 (Read)                   │
│   ├─ Replica 2 (Read)                   │
│   └─ Backup                             │
└─────────────────────────────────────────┘

Optional Services:
├─ Redis (Caching)
├─ RabbitMQ (Message Queue)
├─ Elasticsearch (Full-text Search)
├─ S3 (File Storage)
├─ Sentry (Error Tracking)
└─ LogStash (Log Aggregation)
```

## 📈 Scalability Strategy

```
Phase 1: Single Server
└─ Express + MySQL on same machine

Phase 2: Separate Database
├─ Express server
└─ MySQL database server

Phase 3: Load Balancing
├─ Load Balancer
├─ Express Server 1
├─ Express Server 2
└─ MySQL Database (Replicated)

Phase 4: Microservices
├─ API Gateway
├─ User Service
├─ Property Service
├─ Search Service
├─ Analytics Service
└─ Shared Database Layer
```

## 🎯 Performance Optimization

```
Optimization Layers:

1. Application Layer
   ├─ Query optimization (Prisma select)
   ├─ Pagination (limit results)
   └─ Caching (Redis)

2. Database Layer
   ├─ Indexes on frequently queried columns
   ├─ Connection pooling
   └─ Query optimization

3. Infrastructure Layer
   ├─ CDN for static files
   ├─ Load balancing
   └─ Database replication

4. Client Layer
   ├─ Lazy loading
   ├─ Pagination
   └─ Client-side caching
```
