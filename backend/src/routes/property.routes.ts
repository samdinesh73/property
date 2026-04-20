import { Router, Request, Response } from "express";
import { asyncHandler, ApiError } from "../middleware/errorHandler";
import {
  createPropertySchema,
  updatePropertySchema,
  queryPropertySchema,
} from "../schemas/property.schema";
import prisma from "../lib/prisma";

const router = Router();

// Get all properties with filters
router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const query = queryPropertySchema.parse(req.query);
    const { city, category, minPrice, maxPrice, bedrooms, featured, page, limit, search } = query;

    const where: any = {
      active: true,
      verified: true,
    };

    if (city) where.city = city;
    if (category) where.category = category;
    if (featured === "true") where.featured = true;
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = minPrice;
      if (maxPrice) where.price.lte = maxPrice;
    }
    if (bedrooms) where.bedrooms = bedrooms;
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { location: { contains: search } },
      ];
    }

    const skip = (page - 1) * limit;

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        skip,
        take: limit,
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              phone: true,
              avatar: true,
            },
          },
        },
      }),
      prisma.property.count({ where }),
    ]);

    res.json({
      success: true,
      data: properties,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  })
);

// Get property by ID
router.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const property = await prisma.property.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            phone: true,
            avatar: true,
            email: true,
          },
        },
        reviews: true,
      },
    });

    if (!property) {
      throw new ApiError(404, "Property not found");
    }

    res.json({
      success: true,
      data: property,
    });
  })
);

// Create property
router.post(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const validatedData = createPropertySchema.parse(req.body);
    const { ownerId } = req.body;

    if (!ownerId) {
      throw new ApiError(400, "Owner ID is required");
    }

    const property = await prisma.property.create({
      data: {
        ...validatedData,
        ownerId,
        amenities: validatedData.amenities ? JSON.stringify(validatedData.amenities) : null,
        images: validatedData.images ? JSON.stringify(validatedData.images) : null,
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: "Property created successfully",
      data: property,
    });
  })
);

// Update property
router.put(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const validatedData = updatePropertySchema.parse(req.body);

    const property = await prisma.property.update({
      where: { id },
      data: {
        ...validatedData,
        amenities: validatedData.amenities ? JSON.stringify(validatedData.amenities) : undefined,
        images: validatedData.images ? JSON.stringify(validatedData.images) : undefined,
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    res.json({
      success: true,
      message: "Property updated successfully",
      data: property,
    });
  })
);

// Delete property
router.delete(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    await prisma.property.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: "Property deleted successfully",
    });
  })
);

export default router;
