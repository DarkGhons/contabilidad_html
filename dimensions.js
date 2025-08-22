const entities = {
  cuentas: {
    label: 'Cuentas',
    fields: ['cuenta_id','cuenta_nombre','tipo_cuenta','banco','nro_mascarado','moneda_base','activa']
  },
  contrapartes: {
    label: 'Contrapartes',
    fields: ['contraparte_id','contraparte_nombre','tipo','subtipo','activa','notas']
  },
  categorias: {
    label: 'Categorías',
    fields: ['categoria_id','tipo_flujo','categoria_nombre','grupo','subgrupo']
  },
  instrumentos: {
    label: 'Instrumentos',
    fields: ['instrumento_id','instrumento_nombre','tipo','emisor','monto_inicial','plazo','tasa','v_cuota','monto_actual','cupo','moneda','observaciones']
  }
};

const select = document.getElementById('dimensionSelect');
const container = document.getElementById('dimensionContainer');

Object.entries(entities).forEach(([key, cfg]) => {
  const opt = document.createElement('option');
  opt.value = key;
  opt.textContent = cfg.label;
  select.appendChild(opt);
});

select.addEventListener('change', () => {
  const entity = select.value;
  if (!entity) {
    container.innerHTML = '';
    return;
  }
  renderEntity(entity, entities[entity]);
});

function renderEntity(entity, config) {
  container.innerHTML = '';
  const title = document.createElement('h2');
  title.textContent = config.label;
  container.appendChild(title);

  const table = document.createElement('table');
  table.id = 'dimension-table';
  container.appendChild(table);

  const form = document.createElement('form');
  form.id = 'dimension-form';
  config.fields.forEach(f => {
    const input = document.createElement('input');
    input.name = f;
    input.placeholder = f;
    form.appendChild(input);
  });
  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.textContent = 'Agregar';
  form.appendChild(submit);
  container.appendChild(form);

  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = {};
    config.fields.forEach(f => {
      data[f] = form[f].value;
    });
    fetch(`/${entity}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(() => {
      form.reset();
      loadData(entity, config);
    });
  });

  loadData(entity, config);
}

function renderTable(entity, config, data) {
  const table = document.getElementById('dimension-table');
  table.innerHTML = '';
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  config.fields.forEach(f => {
    const th = document.createElement('th');
    th.textContent = f;
    headerRow.appendChild(th);
  });
  const actionTh = document.createElement('th');
  actionTh.textContent = 'Acciones';
  headerRow.appendChild(actionTh);
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  data.forEach(item => {
    const row = document.createElement('tr');
    config.fields.forEach(f => {
      const td = document.createElement('td');
      td.textContent = item[f] || '';
      row.appendChild(td);
    });
    const actionTd = document.createElement('td');
    const btn = document.createElement('button');
    btn.textContent = 'Eliminar';
    btn.addEventListener('click', () => deleteItem(entity, item[config.fields[0]], config));
    actionTd.appendChild(btn);
    row.appendChild(actionTd);
    tbody.appendChild(row);
  });
  table.appendChild(tbody);
}

function loadData(entity, config) {
  fetch(`/${entity}`)
    .then(r => r.json())
    .then(data => renderTable(entity, config, data));
}

function deleteItem(entity, id, config) {
  fetch(`/${entity}/${id}`, { method: 'DELETE' })
    .then(() => loadData(entity, config));
}