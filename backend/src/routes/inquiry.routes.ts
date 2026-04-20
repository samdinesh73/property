import { Router, Request, Response } from "express";
import { asyncHandler, ApiError } from "../middleware/errorHandler";
import {
  createInquirySchema,
  updateInquirySchema,
} from "../schemas/inquiry.schema";
import prisma from "../lib/prisma";

const router = Router();

// Get all inquiries
router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const { propertyId, userId, status } = req.query;

    const where: any = {};
    if (propertyId) where.propertyId = propertyId;
    if (userId) where.userId = userId;
    if (status) where.status = status;

    const inquiries = await prisma.inquiry.findMany({
      where,
      include: {
        property: {
          select: {
            id: true,
            title: true,
            location: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      success: true,
      data: inquiries,
    });
  })
);

// Get inquiry by ID
router.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const inquiry = await prisma.inquiry.findUnique({
      where: { id },
      include: {
        property: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    if (!inquiry) {
      throw new ApiError(404, "Inquiry not found");
    }

    res.json({
      success: true,
      data: inquiry,
    });
  })
);

// Create inquiry
router.post(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const validatedData = createInquirySchema.parse(req.body);

    // Check if property exists
    const property = await prisma.property.findUnique({
      where: { id: validatedData.propertyId },
    });

    if (!property) {
      throw new ApiError(404, "Property not found");
    }

    const inquiry = await prisma.inquiry.create({
      data: validatedData,
      include: {
        property: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: "Inquiry created successfully",
      data: inquiry,
    });
  })
);

// Update inquiry status
router.put(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const validatedData = updateInquirySchema.parse(req.body);

    const inquiry = await prisma.inquiry.update({
      where: { id },
      data: validatedData,
    });

    res.json({
      success: true,
      message: "Inquiry updated successfully",
      data: inquiry,
    });
  })
);

// Delete inquiry
router.delete(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    await prisma.inquiry.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: "Inquiry deleted successfully",
    });
  })
);

export default router;
