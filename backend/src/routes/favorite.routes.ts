import { Router, Request, Response } from "express";
import { asyncHandler, ApiError } from "../middleware/errorHandler";
import prisma from "../lib/prisma";

const router = Router();

// Get user's favorites
router.get(
  "/user/:userId",
  asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;

    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: {
        property: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      success: true,
      data: favorites,
    });
  })
);

// Check if property is favorited by user
router.get(
  "/:propertyId/user/:userId",
  asyncHandler(async (req: Request, res: Response) => {
    const { propertyId, userId } = req.params;

    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_propertyId: {
          userId,
          propertyId,
        },
      },
    });

    res.json({
      success: true,
      isFavorited: !!favorite,
    });
  })
);

// Add to favorites
router.post(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const { userId, propertyId } = req.body;

    if (!userId || !propertyId) {
      throw new ApiError(400, "User ID and Property ID are required");
    }

    // Check if already favorited
    const existing = await prisma.favorite.findUnique({
      where: {
        userId_propertyId: {
          userId,
          propertyId,
        },
      },
    });

    if (existing) {
      throw new ApiError(409, "Property already in favorites");
    }

    const favorite = await prisma.favorite.create({
      data: {
        userId,
        propertyId,
      },
      include: {
        property: true,
      },
    });

    res.status(201).json({
      success: true,
      message: "Added to favorites",
      data: favorite,
    });
  })
);

// Remove from favorites
router.delete(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    await prisma.favorite.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: "Removed from favorites",
    });
  })
);

// Remove by userId and propertyId
router.delete(
  "/user/:userId/property/:propertyId",
  asyncHandler(async (req: Request, res: Response) => {
    const { userId, propertyId } = req.params;

    await prisma.favorite.delete({
      where: {
        userId_propertyId: {
          userId,
          propertyId,
        },
      },
    });

    res.json({
      success: true,
      message: "Removed from favorites",
    });
  })
);

export default router;
