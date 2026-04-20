import { Request, Response, NextFunction } from "express";
import { ApiError } from "./errorHandler";

/**
 * JWT Authentication Middleware (Future Implementation)
 * This is a template for implementing JWT authentication
 */

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

/**
 * Verify JWT token middleware
 * @example
 * router.post('/protected', verifyToken, controllerFunction)
 */
export const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new ApiError(401, "No token provided");
    }

    // TODO: Implement JWT verification
    // const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    // req.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    throw new ApiError(401, "Authentication required");
  }
  next();
};

/**
 * Check if user has specific role
 */
export const hasRole = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new ApiError(401, "Authentication required");
    }

    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, "Access denied. Insufficient permissions.");
    }

    next();
  };
};

/**
 * Check if user is owner of resource
 */
export const isOwner = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    throw new ApiError(401, "Authentication required");
  }

  // This should be customized based on your requirements
  // For example, check if req.user.id matches req.body.ownerId or similar

  next();
};

/**
 * Rate limiting middleware (placeholder)
 * Consider using express-rate-limit package
 */
export const rateLimit = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // TODO: Implement rate limiting
  next();
};

/**
 * CORS configuration
 * Already implemented in index.ts, but included here for reference
 */
export const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? ["https://safeproperty.com"]
      : ["http://localhost:3000", "http://localhost:3001"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
