const request = require('supertest');
const app = require('../index');

let prisma;

beforeAll(async () => {
  const { PrismaClient } = require('@prisma/client');
  prisma = new PrismaClient();
  await prisma.$connect();
  await prisma.gearItem.deleteMany(); // Reset test DB
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Gear API', () => {
  it('POST /gear should create a gear item (happy path)', async () => {
    const res = await request(app).post('/gear').send({
      name: 'Fender Stratocaster',
      type: 'Guitar',
      brand: 'Fender',
      model: 'Standard',
      year: 2022,
      description: 'Classic electric guitar',
      price: 1299.99
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Fender Stratocaster');
  });

  it('POST /gear should fail with invalid data (error case)', async () => {
    const res = await request(app).post('/gear').send({
      type: 'Guitar'
    });

    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });
});
