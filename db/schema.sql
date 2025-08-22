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

-- Table for cuentas
CREATE TABLE IF NOT EXISTS cuentas (
  cuenta_id TEXT PRIMARY KEY,
  cuenta_nombre TEXT,
  tipo_cuenta TEXT,
  banco TEXT,
  nro_mascarado TEXT,
  moneda_base TEXT,
  activa TEXT
);

-- Initial data for cuentas
INSERT INTO cuentas (cuenta_id, cuenta_nombre, tipo_cuenta, banco, nro_mascarado, moneda_base, activa) VALUES
('CTA_001','Banco de Chile','Cuenta Corriente','Banco de Chile','', 'CLP','SI'),
('CTA_002','Banco Estado','Cuenta RUT','Banco Estado','', 'CLP','SI'),
('CTA_003','Banco Falabella','Cuenta Corriente','Banco Falabella','', 'CLP','SI'),
('CTA_004','Banco Santander','Cuenta Corriente','Banco Santander','', 'CLP','SI'),
('CTA_005','BCI','Cuenta Corriente','Banco de Créditos e Inversiones','', 'CLP','NO'),
('CTA_006','Coopeuch','Cuenta Vista','Coopeuch','', 'CLP','SI'),
('CTA_007','Fpay','Billetera digital','Banco Falabella','', 'CLP','NO'),
('CTA_008','Chek','Billetera digital','Banco Ripley','', 'CLP','SI'),
('CTA_009','Tenpo','Billetera digital','Fintech','', 'CLP','SI'),
('CTA_010','Junaeb','Gubernamental','Edenred','', 'CLP','NO'),
('CTA_011','Mercado Pago','Billetera digital','Mercadolibre','', 'CLP','SI'),
('CTA_012','Cuota Coopeuch','Ahorro/Inversión','Coopeuch','', 'CLP','SI'),
('CTA_013','Paypal','Billetera digital','Paypal','', 'USD','SI'),
('CTA_014','Caja Efectivo','Efectivo','N/A','', 'CLP','SI'),
('CTA_015','Prestamo por cobrar - Corto Plazo','Corto plazo','Cuenta de Cobro','', 'CLP','SI'),
('CTA_016','Prestamo por cobrar - Largo Plazo','Largo plazo','Cuenta de Cobro','', 'CLP','SI');

-- Table for contrapartes
CREATE TABLE IF NOT EXISTS contrapartes (
  contraparte_id TEXT PRIMARY KEY,
  contraparte_nombre TEXT,
  tipo TEXT,
  subtipo TEXT,
  activa TEXT,
  notas TEXT
);

-- Initial data for contrapartes
INSERT INTO contrapartes (contraparte_id, contraparte_nombre, tipo, subtipo, activa, notas) VALUES
('CTR_001','Lorena Rojas','Personas','Deudor','',NULL),
('CTR_002','Dagoberto Godoy','Personas','Deudor','',NULL),
('CTR_003','Franco Godoy','Personas','Deudor','',NULL),
('CTR_004','Michell Godoy','Personas','Deudor','',NULL),
('CTR_005','Dayana Godoy','Personas','Deudor','',NULL),
('CTR_006','Daphne Lever','Personas','Deudor','',NULL),
('CTR_007','Camila Villaroel','Personas','Deudor','',NULL),
('CTR_008','Deivi Ramos','Personas','Deudor','',NULL),
('CTR_009','Francisca Llanos','Personas','Deudor','',NULL),
('CTR_010','Lucas Martinez','Personas','Deudor','',NULL),
('CTR_011','Marcos Godoy','Personas','Deudor','',NULL),
('CTR_012','Maria Escobar','Personas','Deudor','',NULL),
('CTR_013','Camilo Campos','Personas','Deudor','',NULL),
('CTR_014','Nadim Asfari','Personas','Deudor','',NULL),
('CTR_015','Rita Balmacena','Personas','Deudor','',NULL),
('CTR_016','Sebastian Aravena','Personas','Deudor','',NULL),
('CTR_017','Vanessa Rojas','Personas','Deudor','',NULL),
('CTR_018','Javiera Cortés','Personas','Deudor','',NULL),
('CTR_019','Laura Lucero','Personas','Deudor','',NULL),
('CTR_020','Diego Godoy','Personas','Deudor','',NULL),
('CTR_021','Susan Godoy','Personas','Deudor','',NULL),
('CTR_022','María Ignacia Cavieres','Personas','Deudor','',NULL),
('CTR_023','Acreedor Diego Godoy','Personas','Acreedor','',NULL),
('CTR_024','Acreedor Lorena Rojas','Personas','Acreedor','',NULL),
('CTR_025','Mini-Empresa','Empresa','Deudor','',NULL);

-- Table for categorias
CREATE TABLE IF NOT EXISTS categorias (
  categoria_id TEXT PRIMARY KEY,
  tipo_flujo TEXT,
  categoria_nombre TEXT,
  grupo TEXT,
  subgrupo TEXT
);

-- Initial data for categorias
INSERT INTO categorias (categoria_id, tipo_flujo, categoria_nombre, grupo, subgrupo) VALUES
('CAT_001','Ajuste','Ajuste contable','Ajustes/Otros','-'),
('CAT_002','Gasto','Otros gastos','Gastos variables','Otros'),
('CAT_003','Gasto','Alimentación','Gastos variables','Comida y bebidas'),
('CAT_004','Gasto','Donaciones y Regalos','Gastos variables','Regalos'),
('CAT_005','Gasto','Hogar y Jardín','Gastos variables','Mantenimiento hogar'),
('CAT_006','Gasto','Ropa y Aseo Personal','Gastos variables','Vestimenta'),
('CAT_007','Gasto','Salud y Bienestar','Gastos variables','Salud eventual'),
('CAT_008','Gasto','Transporte','Gastos variables','Transporte'),
('CAT_009','Gasto','Mantenimiento Vehicular','Gastos variables','Auto y combustible'),
('CAT_010','Gasto','Mascotas','Gastos variables','Mascotas'),
('CAT_011','Gasto','Comunicación','Gastos fijos','Telefonía/Internet'),
('CAT_012','Gasto','Educación y Formación','Gastos fijos','Educación'),
('CAT_013','Gasto','Entretenimiento y Suscripciones','Gastos fijos','Entretenimiento'),
('CAT_014','Gasto','Servicios Básicos','Gastos fijos','Agua, luz, gas'),
('CAT_015','Gasto','Seguros','Gastos fijos','Seguros'),
('CAT_016','Operación financiera','Pago préstamo','Operaciones financieras','Préstamos'),
('CAT_017','Operación financiera','Recepción préstamo','Operaciones financieras','Préstamos'),
('CAT_018','Operación financiera','Pago tarjeta de crédito','Operaciones financieras','Tarjetas'),
('CAT_019','Operación financiera','Impuestos, Interés y Tarifas','Operaciones financieras','Obligaciones fiscales'),
('CAT_020','Operación financiera','Comisiones Bancarias','Operaciones financieras','Comisiones'),
('CAT_021','Mov. interno','Transferencia interna','Movimientos internos','Transferencias'),
('CAT_022','Mov. interno','Ahorro/Inversión Propia','Movimientos internos','Ahorro propio'),
('CAT_023','Ingreso','Bonos/Comisiones','Ingresos','Laborales'),
('CAT_024','Ingreso','Salario','Ingresos','Laborales'),
('CAT_025','Ingreso','Ingreso por Venta','Ingresos','Ventas'),
('CAT_026','Ingreso','Ingreso por Inversiones','Ingresos','Inversiones'),
('CAT_027','Ingreso','Ingresos Pasivos','Ingresos','Pasivos'),
('CAT_028','Ingreso','Ingresos por Actividades Esporádicas','Ingresos','Eventuales'),
('CAT_029','Ingreso','Ingresos por Beneficios Gubernamentales','Ingresos','Subsidios'),
('CAT_030','Ingreso','Reembolsos','Ingresos','Reembolsos'),
('CAT_031','Ingreso','Intereses Bancarios a Favor','Ingresos','Intereses'),
('CAT_032','Operación financiera','Pago de deuda','Operaciones financieras','Préstamos'),
('CAT_033','Patrimonio','Patrimonio','Ajustes/Otros','Ajuste');

-- Table for instrumentos
CREATE TABLE IF NOT EXISTS instrumentos (
  instrumento_id TEXT PRIMARY KEY,
  instrumento_nombre TEXT,
  tipo TEXT,
  emisor TEXT,
  monto_inicial REAL,
  plazo TEXT,
  tasa REAL,
  v_cuota REAL,
  monto_actual REAL,
  cupo REAL,
  moneda TEXT,
  observaciones TEXT
);

-- Initial data for instrumentos
INSERT INTO instrumentos (instrumento_id, instrumento_nombre, tipo, emisor, monto_inicial, plazo, tasa, v_cuota, monto_actual, cupo, moneda, observaciones) VALUES
('INS_001','CMR Falabella','Tarjeta de Crédito','CMR Falabella',NULL,NULL,NULL,NULL,NULL,1250000,'CLP',NULL),
('INS_002','Banco de Chile Signature','Tarjeta de Crédito','Banco de Chile Signature',NULL,NULL,NULL,NULL,NULL,1000000,'CLP',NULL),
('INS_003','Cencosud Scotiabank','Tarjeta de Crédito','Cencosud Scotiabank',NULL,NULL,NULL,NULL,NULL,1520000,'CLP',NULL),
('INS_004','Banco de Chile Signature USD','Tarjeta de Crédito','Banco de Chile Signature USD',NULL,NULL,NULL,NULL,NULL,100,'USD',NULL),
('INS_005','RappiCard','Tarjeta de Crédito','RappiCard',NULL,NULL,NULL,NULL,NULL,NULL,'CLP',NULL),
('INS_006','RappiCard USD','Tarjeta de Crédito','RappiCard USD',NULL,NULL,NULL,NULL,NULL,NULL,'USD',NULL),
('INS_007','Santander Life','Tarjeta de Crédito','Santander Life',NULL,NULL,NULL,NULL,NULL,NULL,'CLP',NULL),
('INS_008','BCI Classic','Tarjeta de Crédito','BCI Classic',NULL,NULL,NULL,NULL,NULL,NULL,'CLP',NULL),
('INS_010','Fintual Acciones','Instrumentos de Inversión y Ahorro','Fintual Acciones',NULL,NULL,NULL,NULL,NULL,NULL,'USD',NULL),
('INS_011','Creación de Empresa','Instrumentos de Inversión y Ahorro','Creación de Empresa',NULL,NULL,NULL,NULL,NULL,NULL,'CLP',NULL),
('INS_012','Fintual','Instrumentos de Inversión y Ahorro','Fintual',NULL,NULL,NULL,NULL,NULL,NULL,'CLP',NULL),
('INS_013','Ahorro vivienda Coopeuch','Instrumentos de Inversión y Ahorro','Ahorro vivienda Coopeuch',NULL,NULL,NULL,NULL,NULL,NULL,'CLP',NULL),
('INS_014','McAfee','Prestamo Otorgado','Cobros Mensuales',45290,12,7.94,5990,NULL,NULL,'CLP',NULL),
('INS_015','Microsoft','Prestamo Otorgado','Cobros Mensuales',46390,15,12,6990,NULL,NULL,'CLP',NULL),
('INS_016','Cobros Mensuales','Prestamo Otorgado','Alexis Godoy Rojas',NULL,NULL,NULL,NULL,NULL,NULL,'CLP',NULL),
('INS_017','Mini-Empresa','Prestamo Otorgado','Alexis Godoy Rojas',NULL,NULL,NULL,NULL,NULL,NULL,'CLP',NULL),
('INS_018','TV Alexis','Prestamo Otorgado','Alexis Godoy Rojas',479990,12,0,39999,NULL,NULL,'CLP','Compra de TV de Alexis pagado por Lorena Rojas'),
('INS_019','Zapatillas Alexis','Prestamo Otorgado','Alexis Godoy Rojas',115280,4,0,28820,NULL,NULL,'CLP','Compra de zapatillas de Alexis pagado por Lorena Rojas'),
('INS_020','Toallas','Prestamo Otorgado','Alexis Godoy Rojas',32186,3,3,11418,NULL,NULL,'CLP','Compra de toallas de Lorena Rojas'),
('INS_021','Amortiguador','Prestamo Otorgado','Alexis Godoy Rojas',84990,6,0,14165,NULL,NULL,'CLP','Compra de amortiguadores de Auto pagado por Dagoberto Godoy'),
('INS_022','Apple TV','Prestamo Otorgado','Alexis Godoy Rojas',155990,12,0,12999,NULL,NULL,'CLP','Compra de Apple TV pagado por Lorena Rojas'),
('INS_023','Línea Blanca','Prestamo Otorgado','Alexis Godoy Rojas',40980,3,0,13660,NULL,NULL,'CLP','Compra de articulos de linea blanca a Lorena Rojas'),
('INS_024','Spotify','Instrumentos de Inversión y Ahorro','Cobros Mensuales',NULL,NULL,NULL,NULL,NULL,NULL,'CLP',NULL),
('INS_025','Entradas','Prestamo Otorgado','Lorena Rojas',NULL,NULL,NULL,NULL,NULL,NULL,'CLP',NULL),
('INS_026','PC','Prestamo Otorgado','Lorena Rojas',NULL,NULL,NULL,NULL,NULL,NULL,'CLP',NULL),
('INS_027','Youtube Premium','Instrumentos de Inversión y Ahorro','Cobros Mensuales',NULL,NULL,NULL,NULL,NULL,NULL,'CLP',NULL),
('INS_028','Editor Video','Prestamo Otorgado','Lorena Rojas',NULL,NULL,NULL,NULL,NULL,NULL,'CLP',NULL),
('INS_029','Amazon','Instrumentos de Inversión y Ahorro','Cobros Mensuales',NULL,NULL,NULL,NULL,NULL,NULL,'CLP',NULL),
('INS_030','Comida','Prestamo Otorgado','Alexis Godoy Rojas',NULL,NULL,NULL,NULL,NULL,NULL,'CLP',NULL),
('INS_031','Depositos a Plazo','Instrumentos de Inversión y Ahorro','Banco Falabella',NULL,NULL,NULL,NULL,NULL,NULL,'CLP',NULL),
('INS_033','Regalo Padre','Prestamo Otorgado','Lorena Rojas',NULL,NULL,NULL,NULL,NULL,NULL,'CLP',NULL),
('INS_034','Impresora','Prestamo Otorgado','Lorena Rojas',NULL,NULL,NULL,NULL,NULL,NULL,'CLP',NULL),
('INS_035','Barra de Sonido','Prestamo Otorgado','Lorena Rojas',NULL,NULL,NULL,NULL,NULL,NULL,'CLP',NULL),
('INS_036','Aspiradora','Prestamo Otorgado','Lorena Rojas',NULL,NULL,NULL,NULL,NULL,NULL,'CLP',NULL),
('INS_037','Bebidas','Prestamo Otorgado','Mini-Empresa',NULL,NULL,NULL,NULL,NULL,NULL,'CLP',NULL),
('INS_038','Sodimac','Prestamo Otorgado','Lorena Rojas',NULL,NULL,NULL,NULL,NULL,NULL,'CLP',NULL),
('INS_039','Bienestar','Prestamo Otorgado','Hospital',NULL,NULL,NULL,NULL,NULL,NULL,'CLP',NULL);

