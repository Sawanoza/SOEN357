import * as SQLite from 'expo-sqlite';

let db;

//----------------------------------------- TABLES -----------------------------------------
export const initDatabase = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('mydb.db');
    console.log('✅ Database opened: mydb.db');
  }

  // Drop all tables
  await db.execAsync(`DROP TABLE IF EXISTS users;`);
  console.log('🗑️  Dropped existing users table');

  // Recreate the users table
  await db.execAsync(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `);
  console.log('✅ Users table created');

  // Insert default users (ADMIN)
  await db.runAsync(
    `INSERT INTO users (username, password) VALUES (?, ?)`,
    ['ADMIN', 'ADMIN']
  );
  console.log('✅ ADMIN user inserted');

  // Log users table
  const result = await db.getAllAsync(`SELECT * FROM users`);
  console.log('📋 Users table contents:', result);
};
//------------------------------------------------------------------------------------------



//----------------------------------------- METHODS -----------------------------------------
// LOGIN METHOD
export const loginUser = async (username, password) => {
  const result = await db.getAllAsync(
    `SELECT * FROM users WHERE username = ? AND password = ?`,
    [username, password]
  );
  return result.length > 0;
};
//------------------------------------------------------------------------------------------