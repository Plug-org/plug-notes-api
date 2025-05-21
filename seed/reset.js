const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const DB_FILE = './notes.db';
const db = new Database(DB_FILE);

async function resetDb () {
  try{
    db.prepare('DELETE FROM notes').run();
    //TODO: create utility for seeding (used here, seed.js and in reset route.)
    const filePath = path.join(__dirname, "/seed_data.json")
    const seedData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const insert = db.prepare('INSERT INTO notes (title, content) VALUES (?, ?)');
    const insertMany = db.transaction((notes) => {
      for (const note of notes) insert.run(note.title, note.content);
    });
    insertMany(seedData);
    console.log({ success: "Successfully reset database." });
  }catch{
    console.error({ error: "Failed to reset data" })
  }
};

resetDb();