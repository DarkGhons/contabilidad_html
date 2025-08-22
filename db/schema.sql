CREATE TABLE IF NOT EXISTS movimientos (
  mov_id INTEGER PRIMARY KEY AUTOINCREMENT,
  fecha DATE,
  mes INTEGER,
  anio INTEGER,
  cuenta_id INTEGER,
  contraparte_id INTEGER,
  categoria_id INTEGER,
  instrumento_id INTEGER,
  descripcion TEXT,
  monto REAL,
  moneda TEXT,
  tasa_cambio REAL
);
