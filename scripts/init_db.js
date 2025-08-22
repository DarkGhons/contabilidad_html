const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.join(__dirname, '..', 'db', 'data.db');
const schemaPath = path.join(__dirname, '..', 'db', 'schema.sql');

function init() {
  const db = new sqlite3.Database(dbPath);

  const schema = fs.readFileSync(schemaPath, 'utf-8');
  db.exec(schema, (err) => {
    if (err) {
      console.error('Error initializing database', err);
    } else {
      console.log('Database initialized');
    }
  });

  return db;
}

module.exports = init;

if (require.main === module) {
  init();
}
