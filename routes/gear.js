const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all gear items
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
