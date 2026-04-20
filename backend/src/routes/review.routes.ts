import { Router, Request, Response } from "express";
import { asyncHandler, ApiError } from "../middleware/errorHandler";
import {
  createReviewSchema,
  updateReviewSchema,
} from "../schemas/review.schema";
import prisma from "../lib/prisma";

const router = Router();

// Get reviews for a property
router.get(
  "/property/:propertyId",
  asyncHandler(async (req: Request, res: Response) => {
    const { propertyId } = req.params;

    const reviews = await prisma.review.findMany({
      where: { propertyId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Calculate average rating
    const avgRating = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

    res.json({
      success: true,
      data: reviews,
      stats: {
        totalReviews: reviews.length,
        averageRating: parseFloat(avgRating.toFixed(1)),
      },
    });
  })
);

// Get all reviews
router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const { propertyId, userId } = req.query;

    const where: any = {};
    if (propertyId) where.propertyId = propertyId;
    if (userId) where.userId = userId;

    const reviews = await prisma.review.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        property: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      success: true,
      data: reviews,
    });
  })
);

// Create review
router.post(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const validatedData = createReviewSchema.parse(req.body);

    const review = await prisma.review.create({
      data: validatedData,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: review,
    });
  })
);

// Update review
router.put(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const validatedData = updateReviewSchema.parse(req.body);

    const review = await prisma.review.update({
      where: { id },
      data: validatedData,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    res.json({
      success: true,
      message: "Review updated successfully",
      data: review,
    });
  })
);

// Delete review
router.delete(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    await prisma.review.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: "Review deleted successfully",
    });
  })
);

export default router;
