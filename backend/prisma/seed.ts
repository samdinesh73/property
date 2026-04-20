import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data (optional, for development)
  await prisma.review.deleteMany({});
  await prisma.inquiry.deleteMany({});
  await prisma.favorite.deleteMany({});
  await prisma.property.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.user.deleteMany({});

  // Create sample users
  const user1 = await prisma.user.create({
    data: {
      email: "rajesh@safeproperty.com",
      password: "hashed_password_1",
      name: "Rajesh Kumar",
      phone: "+91 9876543210",
      role: "agent",
      verified: true,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "priya@safeproperty.com",
      password: "hashed_password_2",
      name: "Priya Singh",
      phone: "+91 9876543211",
      role: "buyer",
      verified: true,
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: "amit@safeproperty.com",
      password: "hashed_password_3",
      name: "Amit Patel",
      phone: "+91 9876543212",
      role: "agent",
      verified: true,
    },
  });

  const user4 = await prisma.user.create({
    data: {
      email: "neha@safeproperty.com",
      password: "hashed_password_4",
      name: "Neha Desai",
      phone: "+91 9876543213",
      role: "buyer",
      verified: true,
    },
  });

  const adminUser = await prisma.user.create({
    data: {
      email: "admin@safeproperty.com",
      password: "hashed_password_admin",
      name: "Admin User",
      phone: "+91 9999999999",
      role: "admin",
      verified: true,
    },
  });

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: "Apartment",
        slug: "apartment",
        description: "Residential apartments and flats",
      },
    }),
    prisma.category.create({
      data: {
        name: "House",
        slug: "house",
        description: "Independent houses and bungalows",
      },
    }),
    prisma.category.create({
      data: {
        name: "Villa",
        slug: "villa",
        description: "Luxury villas and estates",
      },
    }),
    prisma.category.create({
      data: {
        name: "Land",
        slug: "land",
        description: "Plots and land for development",
      },
    }),
    prisma.category.create({
      data: {
        name: "Commercial",
        slug: "commercial",
        description: "Office spaces and commercial properties",
      },
    }),
    prisma.category.create({
      data: {
        name: "Townhouse",
        slug: "townhouse",
        description: "Modern townhouses and row houses",
      },
    }),
  ]);

  // Create sample properties
  const properties = await Promise.all([
    prisma.property.create({
      data: {
        title: "Modern 3BHK Apartment",
        description:
          "Beautiful apartment with modern amenities in a prime location with great views and excellent connectivity.",
        category: categories[0].name,
        propertyType: "residential",
        price: BigInt(5200000),
        location: "Bandra",
        city: "Mumbai",
        state: "Maharashtra",
        zipCode: "400050",
        latitude: 19.058,
        longitude: 72.828,
        bedrooms: 3,
        bathrooms: 2,
        area: 1500,
        parking: 1,
        amenities: JSON.stringify([
          "Gym",
          "Pool",
          "Security",
          "Parking",
          "Garden",
        ]),
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500",
        ]),
        featured: true,
        verified: true,
        active: true,
        ownerId: user1.id,
      },
    }),
    prisma.property.create({
      data: {
        title: "Luxury Villa with Pool",
        description:
          "Stunning villa with private pool, garden, and high-end finishes. Perfect for luxury living.",
        category: categories[2].name,
        propertyType: "residential",
        price: BigInt(12500000),
        location: "Powai",
        city: "Mumbai",
        state: "Maharashtra",
        zipCode: "400076",
        latitude: 19.108,
        longitude: 72.906,
        bedrooms: 4,
        bathrooms: 3,
        area: 3000,
        parking: 2,
        amenities: JSON.stringify([
          "Pool",
          "Garden",
          "Gym",
          "Theater",
          "Security",
        ]),
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1512917774080-9aa51e3eab47?w=500",
        ]),
        featured: true,
        verified: true,
        active: true,
        ownerId: user3.id,
      },
    }),
    prisma.property.create({
      data: {
        title: "1 BHK Studio Flat",
        description:
          "Cozy studio apartment perfect for young professionals and small families. Well-maintained and spacious.",
        category: categories[0].name,
        propertyType: "residential",
        price: BigInt(2800000),
        location: "Andheri",
        city: "Mumbai",
        state: "Maharashtra",
        zipCode: "400058",
        latitude: 19.11,
        longitude: 72.827,
        bedrooms: 1,
        bathrooms: 1,
        area: 650,
        parking: 0,
        amenities: JSON.stringify(["Security", "Parking Available", "Water"]),
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500",
        ]),
        featured: false,
        verified: true,
        active: true,
        ownerId: user3.id,
      },
    }),
    prisma.property.create({
      data: {
        title: "Plot in IT Park",
        description:
          "Prime commercial plot in IT Park with excellent connectivity and infrastructure. Ideal for business.",
        category: categories[3].name,
        propertyType: "commercial",
        price: BigInt(4500000),
        location: "Hinjewadi",
        city: "Pune",
        state: "Maharashtra",
        zipCode: "411057",
        latitude: 18.599,
        longitude: 73.709,
        bedrooms: 0,
        bathrooms: 0,
        area: 2500,
        parking: 0,
        amenities: JSON.stringify(["IT Park", "High Speed Internet", "Security"]),
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1516998318423-f06f70e504b3?w=500",
        ]),
        featured: true,
        verified: true,
        active: true,
        ownerId: user1.id,
      },
    }),
    prisma.property.create({
      data: {
        title: "2 BHK Townhouse",
        description:
          "Modern townhouse with terrace and modern kitchen. Great location with easy access to malls and schools.",
        category: categories[5].name,
        propertyType: "residential",
        price: BigInt(6800000),
        location: "Vashi",
        city: "Navi Mumbai",
        state: "Maharashtra",
        zipCode: "400703",
        latitude: 19.077,
        longitude: 72.998,
        bedrooms: 2,
        bathrooms: 2,
        area: 1200,
        parking: 1,
        amenities: JSON.stringify(["Terrace", "Garden", "Security", "Parking"]),
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1484154218962-a197022e5060?w=500",
        ]),
        featured: false,
        verified: true,
        active: true,
        ownerId: user1.id,
      },
    }),
    prisma.property.create({
      data: {
        title: "Luxury Apartment with Balcony",
        description:
          "Premium apartment with panoramic views, high-speed elevators, and state-of-the-art security system.",
        category: categories[0].name,
        propertyType: "residential",
        price: BigInt(8500000),
        location: "Marine Drive",
        city: "Mumbai",
        state: "Maharashtra",
        zipCode: "400020",
        latitude: 18.946,
        longitude: 72.823,
        bedrooms: 3,
        bathrooms: 2,
        area: 1800,
        parking: 1,
        amenities: JSON.stringify([
          "Pool",
          "Gym",
          "Security",
          "Concierge",
          "Cinema",
        ]),
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1503597332443-1b8b7c83c5c1?w=500",
        ]),
        featured: true,
        verified: true,
        active: true,
        ownerId: user3.id,
      },
    }),
  ]);

  // Create favorites
  await Promise.all([
    prisma.favorite.create({
      data: {
        userId: user2.id,
        propertyId: properties[0].id,
      },
    }),
    prisma.favorite.create({
      data: {
        userId: user2.id,
        propertyId: properties[1].id,
      },
    }),
    prisma.favorite.create({
      data: {
        userId: user4.id,
        propertyId: properties[3].id,
      },
    }),
    prisma.favorite.create({
      data: {
        userId: user4.id,
        propertyId: properties[4].id,
      },
    }),
  ]);

  // Create inquiries
  await Promise.all([
    prisma.inquiry.create({
      data: {
        name: "Rajesh Kumar",
        email: "rajesh@example.com",
        phone: "+91 9876543210",
        userId: user2.id,
        propertyId: properties[0].id,
        message: "Interested in the property, can we schedule a visit?",
        status: "pending",
      },
    }),
    prisma.inquiry.create({
      data: {
        name: "Priya Singh",
        email: "priya@example.com",
        phone: "+91 9876543211",
        userId: user2.id,
        propertyId: properties[1].id,
        message: "What are the payment options available?",
        status: "contacted",
      },
    }),
    prisma.inquiry.create({
      data: {
        name: "Amit Patel",
        email: "amit@example.com",
        phone: "+91 9876543212",
        userId: user4.id,
        propertyId: properties[2].id,
        message: "Ready to move forward with the purchase",
        status: "converted",
      },
    }),
    prisma.inquiry.create({
      data: {
        name: "Neha Desai",
        email: "neha@example.com",
        phone: "+91 9876543213",
        userId: user4.id,
        propertyId: properties[3].id,
        message: "Can you provide more details about the location?",
        status: "pending",
      },
    }),
    prisma.inquiry.create({
      data: {
        name: "Vikram Singh",
        email: "vikram@example.com",
        phone: "+91 9876543214",
        userId: user2.id,
        propertyId: properties[4].id,
        message: "Is this property still available?",
        status: "pending",
      },
    }),
  ]);

  // Create reviews
  await Promise.all([
    prisma.review.create({
      data: {
        userId: user2.id,
        propertyId: properties[0].id,
        rating: 5,
        comment: "Excellent property! Great location and amazing amenities. Highly recommended.",
      },
    }),
    prisma.review.create({
      data: {
        userId: user4.id,
        propertyId: properties[1].id,
        rating: 5,
        comment: "Luxury villa with stunning views. The pool and garden are absolutely beautiful.",
      },
    }),
    prisma.review.create({
      data: {
        userId: user4.id,
        propertyId: properties[2].id,
        rating: 4,
        comment: "Good value for money. Well-maintained apartment in a safe neighborhood.",
      },
    }),
    prisma.review.create({
      data: {
        userId: user2.id,
        propertyId: properties[3].id,
        rating: 5,
        comment: "Perfect commercial plot in IT park. Excellent connectivity and infrastructure.",
      },
    }),
    prisma.review.create({
      data: {
        userId: user4.id,
        propertyId: properties[4].id,
        rating: 4,
        comment: "Modern townhouse with great design. Very happy with the purchase.",
      },
    }),
  ]);

  console.log("✅ Database seeded successfully!");
  console.log(`📦 Created ${properties.length} properties`);
  console.log(`👥 Created 5 users`);
  console.log(`📂 Created ${categories.length} categories`);
  console.log("❤️  Added favorites, inquiries, and reviews");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
