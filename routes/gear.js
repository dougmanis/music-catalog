const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all gear items
/**
 * @swagger
 * /gear:
 *   get:
 *     summary: Get all music gear items
 *     tags: [Gear]
 *     responses:
 *       200:
 *         description: A list of all gear items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GearItem'
 */
router.get('/', async (req, res) => {
  const items = await prisma.gearItem.findMany();
  res.json(items);
});

// GET a single item by ID
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const item = await prisma.gearItem.findUnique({ where: { id } });
  item ? res.json(item) : res.status(404).send('Not found');
});

// POST new item
/**
 * @swagger
 * /gear:
 *   post:
 *     summary: Create a new gear item
 *     tags: [Gear]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GearItemInput'
 *     responses:
 *       201:
 *         description: Gear item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GearItem'
 *       400:
 *         description: Invalid input
 */
router.post('/', async (req, res) => {
  const newItem = await prisma.gearItem.create({ data: req.body });
  res.status(201).json(newItem);
});

// PUT (update) an item
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const updated = await prisma.gearItem.update({
    where: { id },
    data: req.body
  });
  res.json(updated);
});

// DELETE an item
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  await prisma.gearItem.delete({ where: { id } });
  res.status(204).send();
});

module.exports = router;
