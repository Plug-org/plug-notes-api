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
response
```json
 [
    {
        "id": 1,
        "title": "Welcome Note",
        "content": "This is a sample note to get started. Feel free to add, edit, or delete.",
        "created_at": "2025-05-21 03:38:26"
    },
    {
        "id": 2,
        "title": "Next Steps",
        "content": "Try connecting this API to a frontend like React or Vue!",
        "created_at": "2025-05-21 03:38:26"
    }
 ]
```

### Get a note by ID
```http
GET /notes/:id
```
response
```json
// hitting /notes/2
{
    "id": 2,
    "title": "Next Steps",
    "content": "Try connecting this API to a frontend like React or Vue!",
    "created_at": "2025-05-21 03:38:26"
}
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
successful response
```json
{
    "id": 5,
    "title": "My Note",
    "content": "Something useful.",
    "created_at": "2025-05-21 18:54:04"
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
successful response
```json
// hitting http://localhost:5000/notes/1
{
    "id": 1,
    "title": "Updated Title",
    "content": "Updated content.",
    "created_at": "2025-05-21 03:38:26"
}
```


### Delete a note
```http
DELETE /notes/:id
```
succesful response
```json
// hitting http://localhost:5000/notes/1
{
    "success": true
}
```

### Reset notes to initial data
```http
POST /reset
```
successful response
```json
{
    "success": true
}
```
Make a `GET` request to `/notes` again to see all notes and you should see the initial data

*You'll notice the newly re-seeded data will have ids that are new (not 1 and 2) and they'll have up to date timestamps*

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

# Tips and Troubleshooting
1. Check out [Postman](https://www.postman.com/) to learn how to test api calls in isolation before writing any code in your client.
2. Keep the server's CLI open so you can see any logging information. 
3. Make use of dev tools like Google Chrome [network activity inspector tab](https://developer.chrome.com/docs/devtools/network).
## License
MIT
