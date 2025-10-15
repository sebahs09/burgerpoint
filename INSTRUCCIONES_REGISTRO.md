# 📋 Sistema de Registro de Locales - BurgerPoint

## 🎯 Descripción General

Este sistema permite que los dueños de hamburgueserías registren sus locales de forma **100% GRATUITA** en el mapa de BurgerPoint.

## 📁 Archivos del Sistema

### 1. **registro-local.html** - Formulario de Solicitud
- Formulario público para que los locales se registren
- Recopila información del local, contacto, links y menú
- Guarda las solicitudes en `localStorage`

### 2. **admin-panel.html** - Panel de Administración
- Panel privado para revisar solicitudes
- Permite aprobar o rechazar solicitudes
- Muestra estadísticas y filtros

### 3. **burger.html** - Mapa Principal
- Botón flotante verde: "Registra tu Local GRATIS"
- Botón flotante morado: "Admin" (para ti)

## 🔄 Flujo de Trabajo

### Para los Dueños de Locales:

1. **Acceden al formulario**: Click en "Registra tu Local GRATIS"
2. **Completan el formulario**:
   - Información del local (nombre, dirección, coordenadas)
   - Datos de contacto
   - Links de Rappi/PedidosYa (opcional)
   - Menú con al menos 3 productos
3. **Envían la solicitud**: Se guarda automáticamente
4. **Esperan aprobación**: Recibirán confirmación por email

### Para Ti (Administrador):

1. **Accedes al panel**: Click en "Admin" o abre `admin-panel.html`
2. **Revisas solicitudes pendientes**:
   - Ves toda la información del local
   - Verificas el menú y precios
   - Compruebas los datos de contacto
3. **Tomas una decisión**:
   - ✅ **Aprobar**: El local se marca como aprobado
   - ❌ **Rechazar**: Puedes indicar el motivo
4. **Agregas al mapa** (manual):
   - Copia los datos del local aprobado
   - Agrégalos a `locales.json`

## 💾 Almacenamiento de Datos

### Actual (LocalStorage):
```javascript
// Solicitudes pendientes
localStorage.getItem('solicitudesPendientes')

// Locales aprobados (temporal)
localStorage.getItem('localesAprobados')
```

### Para Producción (Recomendado):
- **Backend**: Node.js + Express
- **Base de datos**: MongoDB o PostgreSQL
- **Email**: Nodemailer para notificaciones
- **Autenticación**: Sistema de login para admin

## 📝 Estructura de una Solicitud

```json
{
  "timestamp": "2025-10-15T18:30:00.000Z",
  "local": {
    "nombre": "Burger House - Palermo",
    "cadena": "Independiente",
    "direccion": "Av. Santa Fe 3000, Palermo",
    "coords": [-34.5768, -58.5365]
  },
  "contacto": {
    "nombre": "Juan Pérez",
    "telefono": "+54 11 1234-5678",
    "email": "juan@burgerhouse.com"
  },
  "links": {
    "rappi": "https://www.rappi.com.ar/...",
    "pedidosYa": "https://www.pedidosya.com.ar/..."
  },
  "menu": [
    {
      "name": "Big Burger",
      "price": 8000,
      "description": "Doble carne, queso, lechuga",
      "image": "https://..."
    }
  ],
  "comentarios": "Horario: 11-23hs",
  "estado": "pendiente"
}
```

## 🔒 Seguridad

### Actual:
- Datos almacenados localmente en el navegador
- Sin autenticación en el panel admin
- **⚠️ Solo para desarrollo/demo**

### Recomendaciones para Producción:
1. **Autenticación**: Login con usuario/contraseña
2. **Backend**: API REST para manejar solicitudes
3. **Validación**: Verificar datos antes de guardar
4. **Email**: Notificaciones automáticas
5. **Captcha**: Prevenir spam

## 🚀 Cómo Agregar un Local Aprobado

1. Abre `admin-panel.html`
2. Aprueba la solicitud
3. Copia los datos del local
4. Abre `locales.json`
5. Agrega el nuevo local al array:

```json
{
  "id": 9,
  "name": "Burger House - Palermo",
  "address": "Av. Santa Fe 3000, Palermo",
  "coords": [-34.5768, -58.5365],
  "chain": "Independiente",
  "googleMapsLink": "https://www.google.com/maps/place/-34.5768,-58.5365",
  "rappiLink": "https://www.rappi.com.ar/...",
  "pedidosYaLink": "https://www.pedidosya.com.ar/...",
  "menu": [...]
}
```

## 📧 Comunicación con los Locales

### Email de Aprobación (Ejemplo):
```
Asunto: ✅ Tu local ha sido aprobado en BurgerPoint

Hola [Nombre],

¡Excelentes noticias! Tu local "[Nombre del Local]" ha sido aprobado 
y ya aparece en el mapa de BurgerPoint.

Ahora miles de usuarios podrán:
- Ver tu ubicación en el mapa
- Consultar tu menú y precios
- Pedir directamente por Rappi/PedidosYa

Gracias por unirte a BurgerPoint!

Saludos,
El equipo de BurgerPoint
```

### Email de Rechazo (Ejemplo):
```
Asunto: ℹ️ Actualización sobre tu solicitud en BurgerPoint

Hola [Nombre],

Lamentablemente no pudimos aprobar tu solicitud por el siguiente motivo:
[Motivo del rechazo]

Si deseas, puedes enviar una nueva solicitud corrigiendo estos puntos.

Saludos,
El equipo de BurgerPoint
```

## 🎨 Personalización

### Cambiar colores del formulario:
- Edita `registro-local.html` línea 9-200 (CSS)
- Color principal: `#ee761b` (naranja)
- Color secundario: `#2c3e50` (azul oscuro)

### Agregar campos al formulario:
1. Agrega el campo HTML en `registro-local.html`
2. Actualiza el JavaScript para capturar el dato
3. Modifica `admin-panel.html` para mostrar el nuevo campo

## 📊 Estadísticas

El panel admin muestra:
- Total de solicitudes
- Solicitudes pendientes
- Solicitudes aprobadas
- Solicitudes rechazadas

## 🔄 Actualización Automática

El panel admin se actualiza automáticamente cada 5 segundos para mostrar nuevas solicitudes.

## ⚠️ Limitaciones Actuales

1. **Sin backend**: Todo en localStorage
2. **Sin emails**: Notificaciones manuales
3. **Sin autenticación**: Panel admin público
4. **Datos temporales**: Se pierden al limpiar caché

## 🎯 Próximos Pasos Recomendados

1. Implementar backend con Node.js
2. Agregar base de datos
3. Sistema de autenticación
4. Envío automático de emails
5. Dashboard con analytics
6. API REST para mobile app

---

**¿Necesitas ayuda?** Contacta al equipo de desarrollo.
