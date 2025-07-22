const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// GET all gear items
app.get('/gear', async (req, res) => {
  try {
    const items = await prisma.gearItem.findMany();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve gear items.' });
  }
});

// GET a single gear item by ID
app.get('/gear/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const item = await prisma.gearItem.findUnique({ where: { id } });
    item ? res.json(item) : res.status(404).json({ error: 'Item not found.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve gear item.' });
  }
});

// POST a new gear item
app.post('/gear', async (req, res) => {
  const { name, type, brand, description, price } = req.body;
  try {
    const item = await prisma.gearItem.create({
      data: { name, type, brand, description, price },
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create gear item.' });
  }
});

// PUT update an existing gear item
app.put('/gear/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, type, brand, description, price } = req.body;
  try {
    const item = await prisma.gearItem.update({
      where: { id },
      data: { name, type, brand, description, price },
    });
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update gear item.' });
  }
});

// DELETE a gear item
app.delete('/gear/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.gearItem.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete gear item.' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API server listening at http://localhost:${PORT}`);
});
