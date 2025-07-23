require('dotenv').config({ path: '.env.test' });
console.log('[jest.setup.js] DATABASE_URL is now:', process.env.DATABASE_URL);
