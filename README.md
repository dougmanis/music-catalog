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
   DATABASE_URL="file:./dev.db"
   ```

4. Run database migrations:

   ```bash
   npx prisma migrate dev --name init
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

---

## License

MIT License

---

## Contact

Your Name — <dougmanis@example.com>