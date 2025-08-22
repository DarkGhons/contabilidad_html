const express = require('express');
const initDb = require('./scripts/init_db');

const app = express();
const db = initDb();

// Basic CORS support so the frontend can call the API from other ports or file://
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

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

// ---- Endpoints for dimension tables ----

// Generic helper to handle database operations
function handleAll(table, res) {
  db.all(`SELECT * FROM ${table}`, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: `Error fetching ${table}` });
    } else {
      res.json(rows);
    }
  });
}

function generateNextId(table, idField, prefix, cb) {
  const start = prefix.length + 2;
  const stmt = `SELECT ${idField} AS id FROM ${table} ORDER BY CAST(SUBSTR(${idField}, ${start}) AS INTEGER) DESC LIMIT 1`;
  db.get(stmt, [], (err, row) => {
    if (err) return cb(err);
    const next = row && row.id ? parseInt(row.id.split('_')[1], 10) + 1 : 1;
    const id = `${prefix}_${String(next).padStart(3, '0')}`;
    cb(null, id);
  });
}

// Cuentas
app.get('/cuentas', (req, res) => handleAll('cuentas', res));

app.post('/cuentas', (req, res) => {
  const { cuenta_nombre, tipo_cuenta, banco, nro_mascarado, moneda_base, activa } = req.body;
  generateNextId('cuentas', 'cuenta_id', 'CTA', (err, cuenta_id) => {
    if (err) return res.status(500).json({ error: 'Error generating id' });
    const stmt = `INSERT INTO cuentas (cuenta_id, cuenta_nombre, tipo_cuenta, banco, nro_mascarado, moneda_base, activa) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.run(stmt, [cuenta_id, cuenta_nombre, tipo_cuenta, banco, nro_mascarado, moneda_base, activa], function(err2) {
      if (err2) {
        res.status(500).json({ error: 'Error inserting cuenta' });
      } else {
        res.json({ cuenta_id, cuenta_nombre, tipo_cuenta, banco, nro_mascarado, moneda_base, activa });
      }
    });
  });
});

app.delete('/cuentas/:id', (req, res) => {
  db.run('DELETE FROM cuentas WHERE cuenta_id = ?', [req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: 'Error deleting cuenta' });
    } else {
      res.json({ deleted: this.changes });
    }
  });
});

// Contrapartes
app.get('/contrapartes', (req, res) => handleAll('contrapartes', res));

app.post('/contrapartes', (req, res) => {
  const { contraparte_nombre, tipo, subtipo, activa, notas } = req.body;
  generateNextId('contrapartes', 'contraparte_id', 'CTR', (err, contraparte_id) => {
    if (err) return res.status(500).json({ error: 'Error generating id' });
    const stmt = `INSERT INTO contrapartes (contraparte_id, contraparte_nombre, tipo, subtipo, activa, notas) VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(stmt, [contraparte_id, contraparte_nombre, tipo, subtipo, activa, notas], function(err2) {
      if (err2) {
        res.status(500).json({ error: 'Error inserting contraparte' });
      } else {
        res.json({ contraparte_id, contraparte_nombre, tipo, subtipo, activa, notas });
      }
    });
  });
});

app.delete('/contrapartes/:id', (req, res) => {
  db.run('DELETE FROM contrapartes WHERE contraparte_id = ?', [req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: 'Error deleting contraparte' });
    } else {
      res.json({ deleted: this.changes });
    }
  });
});

// Categorias
app.get('/categorias', (req, res) => handleAll('categorias', res));

app.post('/categorias', (req, res) => {
  const { tipo_flujo, categoria_nombre, grupo, subgrupo } = req.body;
  generateNextId('categorias', 'categoria_id', 'CAT', (err, categoria_id) => {
    if (err) return res.status(500).json({ error: 'Error generating id' });
    const stmt = `INSERT INTO categorias (categoria_id, tipo_flujo, categoria_nombre, grupo, subgrupo) VALUES (?, ?, ?, ?, ?)`;
    db.run(stmt, [categoria_id, tipo_flujo, categoria_nombre, grupo, subgrupo], function(err2) {
      if (err2) {
        res.status(500).json({ error: 'Error inserting categoria' });
      } else {
        res.json({ categoria_id, tipo_flujo, categoria_nombre, grupo, subgrupo });
      }
    });
  });
});

app.delete('/categorias/:id', (req, res) => {
  db.run('DELETE FROM categorias WHERE categoria_id = ?', [req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: 'Error deleting categoria' });
    } else {
      res.json({ deleted: this.changes });
    }
  });
});

// Instrumentos
app.get('/instrumentos', (req, res) => handleAll('instrumentos', res));

app.post('/instrumentos', (req, res) => {
  const { instrumento_nombre, tipo, emisor, monto_inicial, plazo, tasa, v_cuota, monto_actual, cupo, moneda, observaciones } = req.body;
  generateNextId('instrumentos', 'instrumento_id', 'INS', (err, instrumento_id) => {
    if (err) return res.status(500).json({ error: 'Error generating id' });
    const stmt = `INSERT INTO instrumentos (instrumento_id, instrumento_nombre, tipo, emisor, monto_inicial, plazo, tasa, v_cuota, monto_actual, cupo, moneda, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.run(stmt, [instrumento_id, instrumento_nombre, tipo, emisor, monto_inicial, plazo, tasa, v_cuota, monto_actual, cupo, moneda, observaciones], function(err2) {
      if (err2) {
        res.status(500).json({ error: 'Error inserting instrumento' });
      } else {
        res.json({ instrumento_id, instrumento_nombre, tipo, emisor, monto_inicial, plazo, tasa, v_cuota, monto_actual, cupo, moneda, observaciones });
      }
    });
  });
});

app.delete('/instrumentos/:id', (req, res) => {
  db.run('DELETE FROM instrumentos WHERE instrumento_id = ?', [req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: 'Error deleting instrumento' });
    } else {
      res.json({ deleted: this.changes });
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
