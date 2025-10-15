# BurgerPoint 🍔

Mapa interactivo de hamburgueserías en San Martín y alrededores.

## Proyecto Escolar
**7mo Programación - Técnica 5 "Galileo Galilei"**

---

## 🚀 Cómo usar

### Opción 1: Servidor local simple (Recomendado)

1. **Abrir terminal en la carpeta del proyecto**

2. **Iniciar servidor con Python:**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # O si tienes Python 2
   python -m SimpleHTTPServer 8000
   ```

3. **Abrir en el navegador:**
   ```
   http://localhost:8000/burger.html
   ```

### Opción 2: Live Server (VS Code)

1. Instalar extensión "Live Server" en VS Code
2. Click derecho en `burger.html` → "Open with Live Server"

### Opción 3: Servidor Node.js

```bash
npx http-server -p 8000
```

---

## 📁 Estructura del proyecto

```
proyecto emprendimiento/
├── burger.html          # Aplicación principal
├── locales.json         # Base de datos local (JSON)
├── logo.png            # Logo de BurgerPoint
├── point.png           # Icono de punto
├── punto_burger.png    # Imagen de hamburguesa
└── README.md           # Este archivo
```

---

## ✨ Características

- 🗺️ **Mapa interactivo** con Leaflet.js
- 📍 **8 ubicaciones** de hamburgueserías (McDonald's, Mostaza, Burger King)
- 🍴 **Menús con precios** para cada local
- 🛒 **Enlaces a PedidosYa** para ordenar
- 🚗 **Rutas con Google Maps** (auto y transporte público)
- 📱 **Diseño responsivo** para móviles
- 💾 **Base de datos JSON local** (no requiere PHP/MySQL)

---

## 🛠️ Tecnologías utilizadas

- HTML5
- CSS3 (Montserrat font)
- JavaScript (Vanilla)
- Leaflet.js (mapas)
- OpenStreetMap (tiles)

---

## 📝 Editar ubicaciones

Para agregar o modificar hamburgueserías, edita el archivo `locales.json`:

```json
{
  "id": 9,
  "name": "Nombre del local",
  "address": "Dirección completa",
  "coords": [-34.123456, -58.123456],
  "chain": "Cadena",
  "orderLink": "https://...",
  "menu": [
    {
      "name": "Producto",
      "price": 3500,
      "image": "URL de imagen"
    }
  ]
}
```

---

## ⚠️ Notas importantes

- **Requiere servidor web** para funcionar (no abrir directamente el HTML)
- Las coordenadas están en formato `[latitud, longitud]`
- Los precios están en pesos argentinos (actualizados octubre 2025)
- Las imágenes de menú usan placeholders (puedes reemplazarlas)

---

## 🌐 Publicar en GitHub Pages

### Pasos para publicar:

1. **Crear repositorio en GitHub**
2. **Subir todos los archivos**
3. **Ir a Settings → Pages**
4. **Seleccionar rama `main` y carpeta `root`**
5. **Guardar y esperar 2-3 minutos**
6. **Tu sitio estará en:** `https://tu-usuario.github.io/nombre-repo/burger.html`

### ⚠️ Sistema de Registro (Desactivado para GitHub Pages)

Los archivos `registro-local.html` y `admin-panel.html` están incluidos pero **NO funcionan en GitHub Pages** porque:

- ❌ Usan localStorage (solo guarda en el navegador local)
- ❌ No hay sincronización entre usuarios
- ❌ Requieren un backend (Node.js, Firebase, etc.)

**Para desarrollo local:**
- Descomenta las líneas 314-324 en `burger.html`
- Usa el sistema localmente para pruebas

**Para producción real:**
- Necesitas implementar un backend
- Usar base de datos (MongoDB, PostgreSQL, Firebase)
- Sistema de autenticación
- Envío de emails

---

## ⚖️ Aviso Legal

- Los precios son **referenciales** y pueden variar
- Verifica precios actuales en las apps oficiales  
- BurgerPoint es un **proyecto educativo sin fines de lucro**
- No procesamos pagos ni vendemos productos
- Las marcas mencionadas pertenecen a sus respectivos dueños

---

## 📧 Contacto

Proyecto escolar - Técnica 5 "Galileo Galilei"
