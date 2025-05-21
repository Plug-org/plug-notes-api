// plug-notes-api/index.js

const express = require('express');
const fs = require('fs');
const Database = require('better-sqlite3');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const DB_FILE = './notes.db';

app.use(cors());
app.use(express.json());

// Initialize or connect to DB
const db = new Database(DB_FILE);
db.pragma('journal_mode = WAL');
db.prepare(`CREATE TABLE IF NOT EXISTS notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
)`).run();

// Routes
app.get('/notes', (req, res) => {
  const notes = db.prepare('SELECT * FROM notes ORDER BY created_at DESC').all();
  res.json(notes);
});

app.get('/notes/:id', (req, res) => {
  const note = db.prepare('SELECT * FROM notes WHERE id = ?').get(req.params.id);
  if (note) res.json(note);
  else res.status(404).json({ error: 'Note not found' });
});

app.post('/notes', (req, res) => {
  const { title, content } = req.body;
  const stmt = db.prepare('INSERT INTO notes (title, content) VALUES (?, ?)');
  const info = stmt.run(title, content);
  const newNote = db.prepare('SELECT * FROM notes WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json(newNote);
});

app.put('/notes/:id', (req, res) => {
  const { title, content } = req.body;
  const stmt = db.prepare('UPDATE notes SET title = ?, content = ? WHERE id = ?');
  const info = stmt.run(title, content, req.params.id);
  if (info.changes > 0) {
    const updated = db.prepare('SELECT * FROM notes WHERE id = ?').get(req.params.id);
    res.json(updated);
  } else {
    res.status(404).json({ error: 'Note not found' });
  }
});

app.delete('/notes/:id', (req, res) => {
  const stmt = db.prepare('DELETE FROM notes WHERE id = ?');
  const info = stmt.run(req.params.id);
  if (info.changes > 0) res.json({ success: true });
  else res.status(404).json({ error: 'Note not found' });
});

// Reset endpoint
app.post('/reset', (req, res) => {
  try {
    db.prepare('DELETE FROM notes').run();
    const seedData = JSON.parse(fs.readFileSync('./seed/seed_data.json', 'utf-8'));
    const insert = db.prepare('INSERT INTO notes (title, content) VALUES (?, ?)');
    const insertMany = db.transaction((notes) => {
      for (const note of notes) insert.run(note.title, note.content);
    });
    insertMany(seedData);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: 'Failed to reset data' });
  }
});

app.listen(PORT, () => {
  console.log(`Plug Notes API running at http://localhost:${PORT}`);
});
