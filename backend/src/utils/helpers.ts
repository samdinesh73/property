import { Response } from "express";
import { ApiResponse, PaginatedResponse } from "../types";

/**
 * Send a successful API response
 */
export const sendSuccess = <T>(
  res: Response,
  statusCode: number = 200,
  message: string = "Success",
  data?: T
): Response => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    ...(data !== undefined && { data }),
  };

  return res.status(statusCode).json(response);
};

/**
 * Send a paginated response
 */
export const sendPaginated = <T>(
  res: Response,
  data: T[],
  total: number,
  page: number,
  limit: number,
  message: string = "Success"
): Response => {
  const response: PaginatedResponse<T> = {
    success: true,
    message,
    data,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  };

  return res.status(200).json(response);
};

/**
 * Send an error response
 */
export const sendError = (
  res: Response,
  statusCode: number = 500,
  message: string = "Internal Server Error",
  errors?: any[]
): Response => {
  const response: ApiResponse = {
    success: false,
    error: message,
    ...(errors && { errors }),
  };

  return res.status(statusCode).json(response);
};

/**
 * Generate a slug from text
 */
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

/**
 * Format price for display
 */
export const formatPrice = (price: number | bigint): string => {
  const numPrice = typeof price === "bigint" ? Number(price) : price;

  if (numPrice >= 10000000) {
    return `₹${(numPrice / 10000000).toFixed(1)}Cr`;
  }
  if (numPrice >= 100000) {
    return `₹${(numPrice / 100000).toFixed(1)}L`;
  }
  return `₹${numPrice.toLocaleString("en-IN")}`;
};

/**
 * Calculate pagination offset
 */
export const getPaginationOffset = (
  page: number,
  limit: number
): number => {
  return (page - 1) * limit;
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone format
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10;
};

/**
 * Parse JSON safely
 */
export const safeParseJSON = <T>(json: string, fallback: T): T => {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
};

/**
 * Get date range (useful for filtering)
 */
export const getDateRange = (
  days: number
): { startDate: Date; endDate: Date } => {
  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - days);

  return { startDate, endDate };
};

/**
 * Serialize BigInt values to strings for JSON response
 */
export const serializeBigInt = (obj: any): any => {
  if (obj === null || obj === undefined) return obj;

  if (typeof obj === "bigint") {
    return obj.toString();
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => serializeBigInt(item));
  }

  if (typeof obj === "object") {
    const serialized: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        serialized[key] = serializeBigInt(obj[key]);
      }
    }
    return serialized;
  }

  return obj;
};
