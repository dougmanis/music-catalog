# Music Equipment Catalog

A simple CRUD backend API for managing a catalog of music gear — built with Node.js, Express, Prisma, and SQLite.

## Features

- Full CRUD API for `GearItem` entity
- SQLite database with Prisma ORM
- Easily extendable for testing, authentication, and frontend
- Designed for learning and experimentation with AI-assisted coding

## Setup

1. Clone the repo:

   ```bash
   git clone git@github.com:yourusername/music-catalog.git ~/githome/music-catalog
   cd ~/githome/music-catalog
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment:
   Ensure `.env` contains:

   ```env
   DATABASE_URL="file:./prisma/dev.db"
   ```

4. Run database migrations:

   ```bash
   npx prisma migrate dev
   ```

5. Seed initial test data:

   ```bash
   node prisma/seed.js
   ```

   Note: the seed.js script merges its contents into the existing data entries. It does not overwrite or reset your data.

6. Start the server:

   ```bash
   npm run dev
   ```

## API Endpoints

| Method | Endpoint       | Description                 |
| ------ | -------------- | ---------------------------|
| GET    | `/gear`        | List all gear items         |
| GET    | `/gear/:id`    | Get gear item by ID         |
| POST   | `/gear`        | Create new gear item        |
| PUT    | `/gear/:id`    | Update gear item by ID      |
| DELETE | `/gear/:id`    | Delete gear item by ID      |

## Updating Test Data

- Edit `prisma/seed.js` to add, remove, or modify seed data.
- Re-run `node prisma/seed.js` to refresh test data.

## Backup and Restore

- **Backup:** Copy the `dev.db` SQLite file to a safe location.
- **Restore:** Replace `dev.db` with your backup copy.
- Alternatively, keep your seed data script updated for quick resets.

## Running Tests

Tests are written with Jest and target the API endpoints directly.

To set up a clean test environment:

1. Create the test database:

   ```bash
   npm run db:push:test

2. Run the tests:

   ```bash
   npm test

3. Optional: View test coverage:

   ```bash
   npm run test:coverage
   open coverage/lcov-report/index.html  # on macOS

## Swagger API Documentation Export

This project uses Swagger to generate and publish API reference documentation.

### Exporting the OpenAPI Spec

Swagger docs are generated from JSDoc comments in `./routes/*.js` and metadata in `./docs/swagger/index.yaml`.

To export the OpenAPI spec for publishing (e.g., GitHub Pages):

```bash
npm run export:swagger
```

This will write the spec to:

```
./docs/api/swagger-output.json
```

### Note

This export is handled manually or in CI. It is **not written at runtime** by `index.js` to avoid infinite rebuild loops.

### Setup Recap

1. Swagger config is located in:
   - `index.yaml` — base OpenAPI definition
   - `routes/` — annotated route handlers

2. Output lives in:
   - `docs/api/swagger-output.json`

3. UI rendering (Swagger UI or Redoc) can be hosted from this folder using GitHub Pages.

### Generating Static API Docs for GitHub Pages

To generate static HTML documentation for publishing:

#### Swagger UI

```bash
./scripts/update-swagger-ui.sh
```

This exports the OpenAPI spec and updates Swagger UI in `docs/api/`. You can then push your changes to GitHub to publish.

Visit:
```
https://<your-username>.github.io/<your-repo>/api/
```

#### ReDoc

```bash
./scripts/publish-redoc.sh
```

This generates a minimal Redoc HTML file using the exported Swagger spec and places it in `docs/api-redoc/`.

Visit:
```
https://<your-username>.github.io/<your-repo>/api-redoc/
```

Both can be maintained independently and used as alternate views.

## Useful npm scripts

| Script              | Purpose                                  |
|---------------------|------------------------------------------|
| `npm run dev`       | Run the Express server with nodemon      |
| `npm run seed`      | Seed the dev database                    |
| `npm test`          | Run the Jest test suite                  |
| `npm run test:watch`| Run tests in watch mode                  |
| `npm run test:coverage` | Generate code coverage report       |
| `npm run db:push:test`  | Sync schema to test.db for tests    |

---

## License

MIT License

---

## Contact

Doug Manis — <dougmanis@example.com>
