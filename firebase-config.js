// ═══════════════════════════════════════════════════════════════
// CONFIGURACIÓN DE FIREBASE PARA BURGERPOINT
// ═══════════════════════════════════════════════════════════════

// INSTRUCCIONES:
// 1. Ve a https://firebase.google.com/
// 2. Crea un proyecto nuevo (gratis)
// 3. Agrega una app web
// 4. Copia la configuración y pégala abajo (reemplaza los valores de ejemplo)

const firebaseConfig = {
    apiKey: "TU-API-KEY-AQUI",
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto-id",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456",
    databaseURL: "https://tu-proyecto-default-rtdb.firebaseio.com"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// ═══════════════════════════════════════════════════════════════
// FUNCIONES PARA GUARDAR Y LEER LOCALES
// ═══════════════════════════════════════════════════════════════

// Guardar una nueva solicitud de local
function guardarSolicitud(solicitud) {
    const solicitudRef = database.ref('solicitudes').push();
    return solicitudRef.set({
        ...solicitud,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        estado: 'pendiente'
    });
}

// Obtener todas las solicitudes
function obtenerSolicitudes(callback) {
    database.ref('solicitudes').on('value', (snapshot) => {
        const solicitudes = [];
        snapshot.forEach((child) => {
            solicitudes.push({
                id: child.key,
                ...child.val()
            });
        });
        callback(solicitudes);
    });
}

// Aprobar una solicitud y agregar al mapa
function aprobarSolicitud(solicitudId, nuevoLocal) {
    const updates = {};
    
    // Actualizar estado de la solicitud
    updates[`solicitudes/${solicitudId}/estado`] = 'aprobada';
    
    // Agregar el local a la lista de locales aprobados
    const localRef = database.ref('locales').push();
    updates[`locales/${localRef.key}`] = nuevoLocal;
    
    return database.ref().update(updates);
}

// Obtener todos los locales aprobados (para el mapa)
function obtenerLocales(callback) {
    database.ref('locales').on('value', (snapshot) => {
        const locales = [];
        snapshot.forEach((child) => {
            locales.push({
                id: child.key,
                ...child.val()
            });
        });
        callback(locales);
    });
}

// Rechazar una solicitud
function rechazarSolicitud(solicitudId, motivo) {
    return database.ref(`solicitudes/${solicitudId}`).update({
        estado: 'rechazada',
        motivoRechazo: motivo,
        fechaRechazo: firebase.database.ServerValue.TIMESTAMP
    });
}

// ═══════════════════════════════════════════════════════════════
// EJEMPLO DE USO
// ═══════════════════════════════════════════════════════════════

/*
// Guardar una solicitud
const nuevaSolicitud = {
    local: {
        nombre: "Burger House",
        direccion: "Av. Santa Fe 3000",
        coords: [-34.5768, -58.5365],
        cadena: "Independiente"
    },
    contacto: {
        nombre: "Juan Pérez",
        email: "juan@email.com",
        telefono: "+54 11 1234-5678"
    },
    menu: [...]
};

guardarSolicitud(nuevaSolicitud)
    .then(() => console.log('Solicitud guardada'))
    .catch((error) => console.error('Error:', error));

// Obtener solicitudes en tiempo real
obtenerSolicitudes((solicitudes) => {
    console.log('Solicitudes:', solicitudes);
    // Actualizar UI con las solicitudes
});

// Obtener locales para el mapa
obtenerLocales((locales) => {
    console.log('Locales:', locales);
    // Mostrar locales en el mapa
});
*/
