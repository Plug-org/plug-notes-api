# Plug Notes API

A beginner-friendly REST API for practicing frontend development with a real backend. Built with Express and SQLite. No auth, just clean CRUD.

## Features

- Full CRUD on `/notes`
- Persistent local SQLite storage
- Seed/reset endpoint to restore initial data
- CORS-enabled and JSON-ready

## Setup

1. **Clone the repo**

```bash
git clone https://github.com/yourusername/plug-notes-api.git
cd plug-notes-api
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the API**

```bash
node index.js
```

The server will start at [http://localhost:3000](http://localhost:3000).

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
> Loads sample notes from `seed_data.json` and replaces the database content.

## File Structure

```
plug-notes-api/
├── index.js            # Main server
├── notes.db            # Local SQLite DB (auto-created)
├── seed_data.json      # Seed data for reset
├── package.json        # Project metadata
└── README.md           # This file
```

## Who is this for?
- Frontend devs learning how to interact with APIs
- Bootcamp students and self-taught devs
- Anyone who wants clean, working backends to plug into their UI projects

## License
MIT
