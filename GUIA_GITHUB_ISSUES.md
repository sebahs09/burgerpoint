# 🎯 Usar GitHub Issues como Base de Datos

## ✅ Ventajas

- **100% GRATIS** - Sin límites, sin pruebas, para siempre
- **SIN CONFIGURACIÓN** - Ya tienes GitHub
- **VISUAL** - Ves las solicitudes como issues
- **NOTIFICACIONES** - Email automático cuando alguien se registra
- **SIMPLE** - No necesitas backend ni base de datos

## 🚀 Cómo Funciona

### Flujo Completo:

```
1. Usuario llena formulario
   ↓
2. Se crea un ISSUE en GitHub
   ↓
3. Recibes email de GitHub
   ↓
4. Revisas el issue (tiene toda la info)
   ↓
5. Apruebas/Rechazas desde admin panel
   ↓
6. Copias el JSON del issue
   ↓
7. Lo agregas a locales.json
   ↓
8. Commit + Push
   ↓
9. ¡Todos ven el nuevo local!
```

## 📝 Paso 1: Configurar Labels en GitHub

1. Ve a: `https://github.com/sebahs09/burgerpoint/labels`
2. Crea estos labels:
   - `solicitud-local` (color: azul)
   - `pendiente` (color: amarillo)
   - `aprobada` (color: verde)
   - `rechazada` (color: rojo)

## 🔧 Paso 2: Integrar con tu Proyecto

### 2.1 Agregar script en `registro-local.html`

Agrega ANTES de `</head>`:

```html
<script src="github-database.js"></script>
```

### 2.2 Modificar el formulario

En `registro-local.html`, reemplaza la función de submit:

```javascript
document.getElementById('registroForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = {
        // ... (el código actual de recopilación de datos)
    };

    try {
        // Crear issue en GitHub
        await crearSolicitudLocal(data);
        
        // Mostrar mensaje de éxito
        document.getElementById('successMessage').innerHTML = `
            <h2>✅ ¡Solicitud enviada!</h2>
            <p>Hemos recibido tu solicitud. La revisaremos pronto.</p>
            <p>Puedes ver el estado en: 
                <a href="https://github.com/sebahs09/burgerpoint/issues" target="_blank">
                    GitHub Issues
                </a>
            </p>
        `;
        document.getElementById('successMessage').classList.add('show');
        this.reset();
    } catch (error) {
        alert('Error al enviar solicitud: ' + error.message);
    }
});
```

### 2.3 Modificar `admin-panel.html`

Reemplaza la función de cargar solicitudes:

```javascript
async function cargarSolicitudes() {
    try {
        solicitudes = await obtenerSolicitudesPendientes();
        actualizarEstadisticas();
        mostrarSolicitudes();
    } catch (error) {
        console.error('Error al cargar solicitudes:', error);
    }
}
```

## 📧 Paso 3: Recibir Notificaciones

1. Ve a: `https://github.com/settings/notifications`
2. Asegúrate de tener activado:
   - ✅ Email notifications
   - ✅ Participating (para issues donde participas)

Ahora recibirás un email cada vez que alguien envíe una solicitud.

## 👀 Paso 4: Revisar Solicitudes

### Opción A: Desde GitHub (Recomendado)

1. Ve a: `https://github.com/sebahs09/burgerpoint/issues`
2. Filtra por label: `solicitud-local` + `pendiente`
3. Click en un issue para ver todos los detalles
4. El JSON completo está al final del issue

### Opción B: Desde el Panel Admin

1. Abre `admin-panel.html`
2. Verás todas las solicitudes pendientes
3. Click en "Aprobar" o "Rechazar"

## ✅ Paso 5: Aprobar un Local

### Método Manual (Más simple):

1. Abre el issue en GitHub
2. Copia el JSON que está al final
3. Abre `locales.json`
4. Pega el JSON antes del último `]`
5. Agrega una coma después del local anterior
6. Commit y push:
   ```bash
   git add locales.json
   git commit -m "Agregar nuevo local: [Nombre]"
   git push origin main
   ```
7. Cierra el issue y agrega label `aprobada`

### Método Automático (Desde admin panel):

1. Abre `admin-panel.html`
2. Click en "Aprobar"
3. Copia el JSON que aparece
4. Sigue los pasos 3-7 de arriba

## 🔴 Límites de la API de GitHub

GitHub permite:
- **60 requests/hora** sin autenticación
- **5,000 requests/hora** con token

Para más requests, crea un token:

1. GitHub → Settings → Developer settings
2. Personal access tokens → Generate new token
3. Permisos: `public_repo`
4. Copia el token
5. Pégalo en `github-database.js`:
   ```javascript
   const GITHUB_TOKEN = 'ghp_tu_token_aqui';
   ```

## 📊 Ejemplo de Issue

Cuando alguien se registre, se creará un issue así:

```
Título: 🏪 Solicitud: Burger House - Palermo

Cuerpo:
## 📍 Burger House - Palermo

**Cadena:** Independiente
**Dirección:** Av. Santa Fe 3000
**Coordenadas:** -34.5768, -58.5365

### 👤 Contacto
- **Nombre:** Juan Pérez
- **Email:** juan@email.com
- **Teléfono:** +54 11 1234-5678

### 🔗 Links
- **Rappi:** https://...
- **PedidosYa:** https://...

### 🍔 Menú (5 productos)
- **Big Burger** - $8000
- **Cheese Burger** - $6500
...

---
```json
{
  "local": {...},
  "contacto": {...},
  "menu": [...]
}
```
```

## 💡 Tips

1. **Comunícate con el solicitante**: Usa los comentarios del issue
2. **Organiza con labels**: Crea labels personalizados
3. **Usa milestones**: Agrupa solicitudes por mes
4. **Asigna issues**: Asígnate los que estás revisando
5. **Cierra duplicados**: Si alguien envía dos veces

## 🆘 Solución de Problemas

### Error: "API rate limit exceeded"
- Espera 1 hora
- O crea un token de GitHub

### No recibo notificaciones
- Verifica configuración de notificaciones en GitHub
- Revisa tu carpeta de spam

### El issue no se crea
- Verifica que el repo sea público
- Revisa la consola del navegador

## 🎉 Ventajas vs Otras Soluciones

| Característica | GitHub Issues | Firebase | Google Sheets |
|---------------|---------------|----------|---------------|
| Costo | 100% Gratis | Gratis limitado | Gratis limitado |
| Configuración | Mínima | Media | Media |
| Notificaciones | ✅ Email | ❌ | ❌ |
| Visual | ✅ | ❌ | ✅ |
| Límites | 60/hora | 1GB | 10MB |
| Tiempo real | ❌ | ✅ | ❌ |

## 📝 Resumen

**Pros:**
- ✅ Gratis para siempre
- ✅ Sin configuración compleja
- ✅ Notificaciones por email
- ✅ Interfaz visual en GitHub
- ✅ Historial completo

**Contras:**
- ❌ No es tiempo real (necesitas hacer commit/push)
- ❌ Límite de 60 requests/hora sin token
- ❌ Proceso manual para aprobar

**Ideal para:**
- Proyectos escolares
- Sitios con pocas actualizaciones
- Cuando quieres control manual de cada solicitud

---

**¡Con este método, cualquiera puede enviar solicitudes y tú decides cuáles aprobar!** 🚀
