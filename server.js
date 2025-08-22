const express = require('express');
const initDb = require('./scripts/init_db');

const app = express();
const db = initDb();

app.use(express.json());

app.get('/movimientos', (req, res) => {
  db.all('SELECT * FROM movimientos ORDER BY mov_id DESC', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching movimientos' });
    } else {
      res.json(rows);
    }
  });
});

app.post('/movimientos', (req, res) => {
  const {
    fecha,
    mes,
    anio,
    cuenta_id,
    contraparte_id,
    categoria_id,
    instrumento_id,
    descripcion,
    monto,
    moneda,
    tasa_cambio
  } = req.body;

  const stmt = `INSERT INTO movimientos
    (fecha, mes, anio, cuenta_id, contraparte_id, categoria_id, instrumento_id, descripcion, monto, moneda, tasa_cambio)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.run(stmt, [fecha, mes, anio, cuenta_id, contraparte_id, categoria_id, instrumento_id, descripcion, monto, moneda, tasa_cambio], function(err) {
    if (err) {
      res.status(500).json({ error: 'Error inserting movimiento' });
    } else {
      res.json({
        mov_id: this.lastID,
        fecha,
        mes,
        anio,
        cuenta_id,
        contraparte_id,
        categoria_id,
        instrumento_id,
        descripcion,
        monto,
        moneda,
        tasa_cambio
      });
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
