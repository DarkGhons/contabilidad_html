# FinanceTracker - Aplicación de Gestión Financiera Personal

Una aplicación web moderna y responsive para el seguimiento y gestión de finanzas personales, construida con HTML5, CSS3 y JavaScript vanilla.

## 🚀 Características Principales

### 📊 Dashboard Financiero
- **Resumen financiero** con tarjetas de ingresos, gastos, ahorros y balance total
- **Indicadores visuales** con colores representativos y porcentajes de cambio
- **Gráfico interactivo** de tendencias financieras con Chart.js
- **Filtros temporales** (diario, semanal, mensual, anual)

### 💰 Gestión de Transacciones
- **Registro rápido** de nuevas transacciones
- **Categorización automática** de gastos
- **Lista de transacciones recientes** con iconos representativos
- **Validación de formularios** en tiempo real

### 🎯 Objetivos y Metas
- **Seguimiento de objetivos** financieros
- **Barras de progreso** visuales
- **Metas con fechas límite**

### 🌐 Características UX/UI
- **Diseño responsive** adaptable a todos los dispositivos
- **Selector de idiomas** (Español, Inglés, Francés)
- **Tema moderno** con paleta de colores consistente
- **Animaciones suaves** y transiciones
- **Accesibilidad** mejorada con soporte para lectores de pantalla

### 🔧 Funcionalidades Avanzadas
- **Importación de datos** CSV/Excel
- **Escaneo de recibos** (preparado para OCR)
- **Almacenamiento local** de datos
- **Notificaciones** del sistema
- **Menú de usuario** con configuraciones

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con variables CSS y Flexbox/Grid
- **JavaScript ES6+** - Lógica de aplicación y manejo de datos
- **Chart.js** - Gráficos interactivos
- **Font Awesome** - Iconografía
- **LocalStorage** - Persistencia de datos

## 📱 Compatibilidad

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Dispositivos móviles (iOS/Android)

## 🚀 Instalación y Uso

1. **Clona o descarga** el repositorio
2. **Abre** `index.html` en tu navegador web
3. **¡Listo!** No requiere instalación adicional

### Servidor Local (Opcional)

Para desarrollo o testing con un servidor local:

```bash
# Con Python
python -m http.server 8000

# Con Node.js (http-server)
npx http-server

# Con PHP
php -S localhost:8000
```

## 📁 Estructura del Proyecto

```
contabilidad_html/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Lógica JavaScript
└── README.md           # Documentación
```

## 🎨 Paleta de Colores

- **Primario**: `#2563eb` (Azul)
- **Éxito**: `#10b981` (Verde) - Ingresos
- **Peligro**: `#ef4444` (Rojo) - Gastos
- **Info**: `#06b6d4` (Cian) - Ahorros
- **Advertencia**: `#f59e0b` (Amarillo)

## 🔧 Configuración

### Variables CSS Personalizables

El archivo `styles.css` utiliza variables CSS que puedes modificar:

```css
:root {
    --primary-color: #2563eb;
    --success-color: #10b981;
    --danger-color: #ef4444;
    /* ... más variables */
}
```

### Configuración JavaScript

Puedes personalizar la aplicación modificando las opciones en `script.js`:

```javascript
// Configurar idiomas disponibles
this.translations = {
    es: { /* traducciones en español */ },
    en: { /* traducciones en inglés */ }
};

// Configurar categorías de transacciones
const categories = ['food', 'transport', 'entertainment', ...];
```

## 📊 Funcionalidades de Datos

### Almacenamiento Local
- Las transacciones se guardan en `localStorage`
- Configuraciones de usuario persistentes
- Preferencias de idioma recordadas

### Importación de Datos
- Soporte para archivos CSV y Excel
- Validación automática de formato
- Mapeo de columnas flexible

## 🔒 Seguridad y Privacidad

- **Datos locales**: Toda la información se almacena localmente
- **Sin servidor**: No se envían datos a servidores externos
- **Validación**: Validación de entrada en cliente y preparada para servidor
- **Sanitización**: Prevención de XSS en inputs de usuario

## 🚀 Escalabilidad Futura

### Características Planificadas
- **Exportación PDF/Excel** de reportes
- **Integración bancaria** via APIs
- **Alertas de presupuesto** personalizables
- **Análisis predictivo** de gastos
- **Sincronización en la nube**
- **Aplicación móvil** (PWA)

### Arquitectura Preparada
- Estructura modular para fácil extensión
- Separación de responsabilidades
- APIs preparadas para backend
- Componentes reutilizables

## 🐛 Solución de Problemas

### Problemas Comunes

**El gráfico no se muestra:**
- Verifica que Chart.js se cargue correctamente
- Comprueba la consola del navegador para errores

**Los datos no se guardan:**
- Asegúrate de que localStorage esté habilitado
- Verifica que no estés en modo incógnito

**Problemas de responsive:**
- Limpia la caché del navegador
- Verifica que el viewport meta tag esté presente

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

## 📞 Soporte

- **Email**: soporte@financetracker.com
- **Issues**: [GitHub Issues](https://github.com/usuario/contabilidad_html/issues)
- **Documentación**: [Wiki del Proyecto](https://github.com/usuario/contabilidad_html/wiki)

## 🙏 Agradecimientos

- [Chart.js](https://www.chartjs.org/) por los gráficos interactivos
- [Font Awesome](https://fontawesome.com/) por los iconos
- Comunidad de desarrolladores por feedback y sugerencias

---

**FinanceTracker** - Toma el control de tus finanzas personales 💰📈
