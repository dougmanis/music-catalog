const fs = require('fs');
const yaml = require('js-yaml');
const swaggerJSDoc = require('swagger-jsdoc');

// Load the base OpenAPI definition
const swaggerDocument = yaml.load(fs.readFileSync('./docs/swagger/index.yaml', 'utf8'));

// Define the full spec config
const swaggerSpec = swaggerJSDoc({
  definition: swaggerDocument,
  apis: ['./routes/*.js'], // Update this if your JSDoc lives elsewhere
});

// Write the spec to the docs/api directory
fs.mkdirSync('./docs/api', { recursive: true });
fs.writeFileSync('./docs/api/swagger-output.json', JSON.stringify(swaggerSpec, null, 2));

console.log('✅ Swagger spec exported to ./docs/api/swagger-output.json');
