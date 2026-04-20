import { Router, Request, Response } from "express";
import { asyncHandler, ApiError } from "../middleware/errorHandler";
import prisma from "../lib/prisma";

const router = Router();

// Get all categories
router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      success: true,
      data: categories,
    });
  })
);

// Get category by ID
router.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new ApiError(404, "Category not found");
    }

    res.json({
      success: true,
      data: category,
    });
  })
);

// Get category by slug
router.get(
  "/slug/:slug",
  asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;

    const category = await prisma.category.findUnique({
      where: { slug },
    });

    if (!category) {
      throw new ApiError(404, "Category not found");
    }

    res.json({
      success: true,
      data: category,
    });
  })
);

// Create category
router.post(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const { name, slug, description, icon, image } = req.body;

    if (!name || !slug) {
      throw new ApiError(400, "Name and slug are required");
    }

    const existing = await prisma.category.findUnique({
      where: { slug },
    });

    if (existing) {
      throw new ApiError(409, "Category with this slug already exists");
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description,
        icon,
        image,
      },
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  })
);

// Update category
router.put(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, slug, description, icon, image } = req.body;

    const category = await prisma.category.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        icon,
        image,
      },
    });

    res.json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  })
);

// Delete category
router.delete(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    await prisma.category.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: "Category deleted successfully",
    });
  })
);

export default router;
