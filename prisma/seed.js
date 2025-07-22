const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.gearItem.deleteMany();

  // Seed data
  await prisma.gearItem.createMany({
    data: [
      {
        name: "Fender Stratocaster",
        type: "Guitar",
        brand: "Fender",
        description: "A classic electric guitar with a bright, clean tone.",
        price: 1299.99
      },
      {
        name: "Marshall DSL40CR",
        type: "Amplifier",
        brand: "Marshall",
        description: "A powerful tube amp great for rock and metal.",
        price: 749.00
      },
      {
        name: "Boss DD-7 Digital Delay",
        type: "Effect Pedal",
        brand: "Boss",
        description: "A versatile digital delay pedal with stereo outputs.",
        price: 159.99
      }
    ]
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });