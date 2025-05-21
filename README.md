# Plug Notes API

A beginner-friendly REST API for practicing frontend development with a "real" backend. Built with Express and SQLite. No auth to keep things simple for this easy level API.

## Features

- Full CRUD on `/notes`
- Persistent local SQLite storage
- initial data already seeded
- reset endpoint to restore initial data 
- CORS-enabled and JSON-ready

## Setup

1. **Clone the repo**

```bash
git clone git@github.com:Plug-org/plug-notes-api.git
cd plug-notes-api
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the API**

```bash
npm run dev
```

The server will start at [http://localhost:5000](http://localhost:5000).

## Endpoints

### Get all notes
```http
GET /notes
```

### Get a note by ID
```http
GET /notes/:id
```

### Create a new note
```http
POST /notes
Content-Type: application/json

{
  "title": "My Note",
  "content": "Something useful."
}
```

### Update a note
```http
PUT /notes/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content."
}
```

### Delete a note
```http
DELETE /notes/:id
```

### Reset notes to initial data
```http
POST /reset
```
> If you ever want to start from scratch this will erase the data in the database and then loads sample notes from `seed_data.json`.

## File Structure

```
plug-notes-api/
├── app.js                   # Main server
├── notes.db                 # Local SQLite DB (auto-created)
├── notes.db-shm             # Local SQLite DB (auto-created)
├── notes.db-wal             # Local SQLite DB (auto-created)
├── package.json             # Project metadata
└── README.md                # This file
├──seed/
      ├── seed_data.json     # initial data 
      ├── seed.js            # script to seed initial data
```

## Who is this for?
- Frontend devs learning how to interact with APIs
- Bootcamp students and self-taught devs

This is a very basic CRUD app to get started with.

## License
MIT
