

const express = require('express');

const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());





const tables = [
  "competition_participants",
  "orders",
  "portfolio",
  "recommendations",
  "sectors",
  "stock_alerts",
  "stocks",
  "trading_competitions",
  "transactions",
  "user_subscriptions",
  "users1",
  "watchlists"
];

app.get('/', (req, res) => res.json("WELCOME TO API"));

tables.forEach(table => {
  // Count endpoint
  app.get(`/${table}/count`, async (req, res) => {
    try {
      const result = await pool.query(`SELECT COUNT(*) AS count FROM ${table}`);
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  });

  // Full rows endpoint
  app.get(`/${table}/rows`, async (req, res) => {
    try {
      const result = await pool.query(`SELECT * FROM ${table}`);
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  });
});


async function deleteRow(table, id) {
  if (!confirm("Are you sure to delete?")) return;

  try {
    await safeFetchJSON(`${baseURL}/${table}/${id}`, { method: "DELETE" });
    alert("Deleted successfully");
    loadTableData(table);
  } catch (error) {
    alert("Delete failed: " + error.message);
  }
}

// UPDATE row by ID
app.put('/:table/:id', async (req, res) => {
  const { table, id } = req.params;
  const updates = req.body;

  const keys = Object.keys(updates);
  const values = Object.values(updates);

  if (!keys.length) return res.status(400).json({ error: "No fields to update" });

  const setClause = keys.map((k, i) => `${k} = $${i + 1}`).join(", ");
  try {
    const result = await pool.query(
      `UPDATE ${table} SET ${setClause} WHERE id = $${keys.length + 1}`,
      [...values, id]
    );
    res.json({ message: "Updated", rowsAffected: result.rowCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// INSERT row
app.post('/:table', async (req, res) => {
  const { table } = req.params;
  const data = req.body;

  const keys = Object.keys(data);
  const values = Object.values(data);

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


const PORT = process.env.PORT || 5000;
app.get('/:table/rows', async (req, res) => {
  const { table } = req.params;
  try {
    const result = await pool.query(`SELECT * FROM ${table} ORDER BY id ASC`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`API running on port ${PORT}`));
