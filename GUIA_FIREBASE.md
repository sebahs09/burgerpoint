# 🔥 Guía Completa: Integrar Firebase a BurgerPoint

## 📋 ¿Qué es Firebase?

Firebase es una plataforma de Google que te permite:
- ✅ Guardar datos en la nube (gratis hasta 1GB)
- ✅ Sincronización en tiempo real
- ✅ No necesitas programar un backend
- ✅ Funciona con GitHub Pages

## 🚀 Paso 1: Crear Proyecto en Firebase

### 1.1 Crear cuenta
1. Ve a: https://firebase.google.com/
2. Click en "Comenzar"
3. Inicia sesión con tu cuenta de Google

### 1.2 Crear proyecto
1. Click en "Agregar proyecto"
2. Nombre: `burgerpoint`
3. Desactiva Google Analytics (no es necesario)
4. Click en "Crear proyecto"
5. Espera 30 segundos

### 1.3 Crear base de datos
1. En el menú izquierdo: **Realtime Database**
2. Click en "Crear base de datos"
3. Ubicación: `United States (us-central1)`
4. Reglas: **Modo de prueba** (por ahora)
5. Click en "Habilitar"

### 1.4 Obtener configuración
1. En el menú: ⚙️ **Configuración del proyecto**
2. Scroll down hasta "Tus apps"
3. Click en el ícono `</>`  (Web)
4. Nombre: `BurgerPoint Web`
5. Click en "Registrar app"
6. **COPIA** el código de configuración

## 📝 Paso 2: Configurar tu Proyecto

### 2.1 Editar `firebase-config.js`

Abre el archivo `firebase-config.js` y reemplaza:

```javascript
const firebaseConfig = {
    apiKey: "TU-API-KEY-AQUI",  // ← Pega tu API Key
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto-id",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456",
    databaseURL: "https://tu-proyecto-default-rtdb.firebaseio.com"
};
```

### 2.2 Agregar Firebase a `burger.html`

Agrega ANTES de `</head>`:

```html
<!-- Firebase SDK -->
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-database-compat.js"></script>
<script src="firebase-config.js"></script>
```

### 2.3 Modificar el código del mapa

En `burger.html`, reemplaza la línea que carga `locales.json`:

**ANTES:**
```javascript
fetch("locales.json")
    .then(res => res.json())
    .then(locations => {
        // código...
    });
```

**DESPUÉS:**
```javascript
// Cargar locales desde Firebase
obtenerLocales((locations) => {
    if (!locations || locations.length === 0) {
        console.error('No hay locales disponibles');
        return;
    }
    // El resto del código sigue igual...
});
```

### 2.4 Modificar `registro-local.html`

Reemplaza la función que guarda en localStorage:

**ANTES:**
```javascript
let solicitudes = JSON.parse(localStorage.getItem('solicitudesPendientes') || '[]');
solicitudes.push(data);
localStorage.setItem('solicitudesPendientes', JSON.stringify(solicitudes));
```

**DESPUÉS:**
```javascript
guardarSolicitud(data)
    .then(() => {
        document.getElementById('successMessage').classList.add('show');
        this.reset();
    })
    .catch((error) => {
        alert('Error al enviar solicitud: ' + error.message);
    });
```

### 2.5 Modificar `admin-panel.html`

Reemplaza la función que carga solicitudes:

**ANTES:**
```javascript
solicitudes = JSON.parse(localStorage.getItem('solicitudesPendientes') || '[]');
```

**DESPUÉS:**
```javascript
obtenerSolicitudes((solicitudesFirebase) => {
    solicitudes = solicitudesFirebase;
    actualizarEstadisticas();
    mostrarSolicitudes();
});
```

## 🔒 Paso 3: Configurar Reglas de Seguridad

### 3.1 Reglas básicas (para desarrollo)

En Firebase Console → Realtime Database → Reglas:

```json
{
  "rules": {
    "solicitudes": {
      ".read": true,
      ".write": true
    },
    "locales": {
      ".read": true,
      ".write": false
    }
  }
}
```

**Explicación:**
- `solicitudes`: Cualquiera puede leer y escribir (para que los locales se registren)
- `locales`: Todos pueden leer, solo admin puede escribir

### 3.2 Reglas con autenticación (producción)

Para mayor seguridad, agrega autenticación:

```json
{
  "rules": {
    "solicitudes": {
      ".read": true,
      ".write": true,
      "$solicitudId": {
        ".validate": "newData.hasChildren(['local', 'contacto', 'menu'])"
      }
    },
    "locales": {
      ".read": true,
      ".write": "auth != null && auth.uid === 'TU-UID-DE-ADMIN'"
    }
  }
}
```

## 🎯 Paso 4: Migrar Datos Existentes

### 4.1 Importar locales actuales

1. Abre Firebase Console → Realtime Database
2. Click en los 3 puntos (⋮) → "Importar JSON"
3. Selecciona tu archivo `locales.json`
4. Click en "Importar"

### 4.2 Estructura de datos en Firebase

```
burgerpoint/
├── locales/
│   ├── -NxAbCdEfGh/
│   │   ├── id: 1
│   │   ├── name: "McDonald's - Peatonal"
│   │   ├── address: "..."
│   │   ├── coords: [-34.5768, -58.5365]
│   │   ├── menu: [...]
│   │   └── ...
│   └── -NxAbCdEfGi/
│       └── ...
└── solicitudes/
    ├── -NxAbCdEfGj/
    │   ├── estado: "pendiente"
    │   ├── timestamp: 1697400000000
    │   ├── local: {...}
    │   └── contacto: {...}
    └── ...
```

## 🧪 Paso 5: Probar

### 5.1 Probar registro de local

1. Abre `registro-local.html`
2. Llena el formulario
3. Envía
4. Ve a Firebase Console → Realtime Database
5. Deberías ver la solicitud en `solicitudes/`

### 5.2 Probar panel admin

1. Abre `admin-panel.html`
2. Deberías ver las solicitudes
3. Aprueba una
4. Ve a Firebase Console
5. Deberías ver el local en `locales/`

### 5.3 Probar el mapa

1. Abre `burger.html`
2. Deberías ver todos los locales (incluido el nuevo)
3. Click en un marcador
4. Verifica que muestra la información correcta

## 📤 Paso 6: Subir a GitHub

```bash
git add .
git commit -m "Integración con Firebase para datos en tiempo real"
git push origin main
```

Espera 2-3 minutos y tu sitio estará actualizado con Firebase.

## ✅ Ventajas de Firebase

- ✅ **Gratis** hasta 1GB de datos y 10GB de transferencia
- ✅ **Tiempo real**: Los cambios se ven instantáneamente
- ✅ **No necesitas servidor**: Todo funciona desde GitHub Pages
- ✅ **Escalable**: Puede crecer con tu proyecto
- ✅ **Seguro**: Reglas de seguridad configurables

## 🔐 Seguridad Adicional (Opcional)

### Agregar autenticación para admin

1. Firebase Console → Authentication
2. Habilita "Email/Password"
3. Crea un usuario admin
4. En `admin-panel.html`, agrega login:

```javascript
// Login de admin
firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        console.log('Admin autenticado');
    })
    .catch((error) => {
        alert('Error de autenticación');
    });
```

## 🆘 Solución de Problemas

### Error: "Permission denied"
- Verifica las reglas de seguridad en Firebase Console
- Asegúrate de que `.read` y `.write` estén en `true` para pruebas

### Error: "Firebase is not defined"
- Verifica que los scripts de Firebase estén antes de `firebase-config.js`
- Revisa la consola del navegador para errores

### Los datos no se actualizan
- Verifica que `databaseURL` esté correcto en la configuración
- Revisa Firebase Console → Realtime Database para ver si los datos se guardan

### No aparecen los locales en el mapa
- Abre la consola del navegador (F12)
- Busca errores en rojo
- Verifica que la función `obtenerLocales()` se esté llamando

## 📞 Soporte

Si tienes problemas:
1. Revisa la consola del navegador (F12)
2. Revisa Firebase Console → Realtime Database → Datos
3. Verifica que la configuración esté correcta

---

**¡Con Firebase, todos los usuarios verán los mismos locales en tiempo real!** 🚀
