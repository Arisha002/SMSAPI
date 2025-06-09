const express = require('express');
const cors = require('cors');
const pool = require('./db'); // PostgreSQL pool
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Allowed tables for safety
const tables = [
  "competition_participants", "orders", "portfolio", "recommendations",
  "sectors", "stock_alerts", "stocks", "trading_competitions",
  "transactions", "user_subscriptions", "users1", "watchlists"
];

function isValidTable(table) {
  return tables.includes(table);
}

app.get('/', (req, res) => res.json("WELCOME TO API"));

// Dynamic routes for all tables
tables.forEach(table => {
  app.get(`/${table}/count`, async (req, res) => {
    try {
      const result = await pool.query(`SELECT COUNT(*) AS count FROM ${table}`);
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get(`/${table}/rows`, async (req, res) => {
    try {
      const result = await pool.query(`SELECT * FROM ${table}`);
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
});

// INSERT row
app.post('/:table', async (req, res) => {
  const { table } = req.params;
  if (!isValidTable(table)) return res.status(400).json({ error: 'Invalid table name' });

  const data = req.body;
  const keys = Object.keys(data);
  const values = Object.values(data);

  if (keys.length === 0) return res.status(400).json({ error: 'No data provided' });

  const cols = keys.join(", ");
  const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");

  try {
    const result = await pool.query(
      `INSERT INTO ${table} (${cols}) VALUES (${placeholders}) RETURNING *`,
      values
    );
    res.json({ message: "Inserted", row: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE row by ID
app.put('/:table/:id', async (req, res) => {
  const { table, id } = req.params;
  if (!isValidTable(table)) return res.status(400).json({ error: 'Invalid table name' });

  const updates = req.body;
  const keys = Object.keys(updates);
  const values = Object.values(updates);

  if (keys.length === 0) return res.status(400).json({ error: "No fields to update" });

  // Build set clause safely
  const setClause = keys.map((key, i) => `"${key}" = $${i + 1}`).join(", ");

  try {
    const result = await pool.query(
      `UPDATE ${table} SET ${setClause} WHERE id = $${keys.length + 1}`,
      [...values, id]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: "Row not found" });
    res.json({ message: "Updated", rowsAffected: result.rowCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE row by ID
app.delete('/:table/:id', async (req, res) => {
  const { table, id } = req.params;
  if (!isValidTable(table)) return res.status(400).json({ error: 'Invalid table name' });

  try {
    const result = await pool.query(`DELETE FROM ${table} WHERE id = $1`, [id]);
    if (result.rowCount === 0) return res.status(404).json({ error: "Row not found" });
    res.json({ message: "Deleted", rowsAffected: result.rowCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
