const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const app = express();
app.use(express.json());
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Swagger docs 
const fs = require('fs');
const yaml = require('js-yaml');
const swaggerDocument = yaml.load(fs.readFileSync('./docs/swagger/index.yaml', 'utf8'));
const swaggerOptions = {
  definition: swaggerDocument,
  apis: ['./routes/*.js'], // Scan route files for JSDoc
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Create a new gear item
app.post('/gear', async (req, res) => {
  const { name, type, brand, model, year, price, description } = req.body;
  try {
    const gearItem = await prisma.gearItem.create({
      data: { name, type, brand, model, year, price, description },
    });
    res.status(201).json(gearItem);
  } catch (error) {
    res.status(400).json({ error: 'Invalid input' });
  }
});

// Get all gear items
app.get('/gear', async (req, res) => {
  const items = await prisma.gearItem.findMany();
  res.json(items);
});

// Get a single gear item
app.get('/gear/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const item = await prisma.gearItem.findUnique({
      where: { id }
    });
    if (!item) throw new Error();
    res.json(item);
  } catch {
    res.status(404).json({ error: 'Item not found' });
  }
});

// Update a gear item
app.put('/gear/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const data = req.body;
  try {
    const updatedItem = await prisma.gearItem.update({
      where: { id },
      data
    });
    res.json(updatedItem);
  } catch (error) {
    res.status(404).json({ error: 'Item not found or update failed' });
  }
});

// Delete a gear item
app.delete('/gear/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    await prisma.gearItem.delete({
      where: { id }
    });
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(404).json({ error: 'Item not found or delete failed' });
  }
});

// Only listen if not in test mode
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Export app for testing
module.exports = app;
