// ═══════════════════════════════════════════════════════════════
// USAR GITHUB ISSUES COMO BASE DE DATOS
// 100% GRATIS - SIN LÍMITES - SIN CONFIGURACIÓN COMPLEJA
// ═══════════════════════════════════════════════════════════════

// CONFIGURACIÓN
const GITHUB_USER = 'sebahs09';  // Tu usuario de GitHub
const GITHUB_REPO = 'burgerpoint';  // Tu repositorio
const GITHUB_TOKEN = 'TU_TOKEN_AQUI';  // Token de GitHub (opcional para más requests)

// ═══════════════════════════════════════════════════════════════
// FUNCIONES PARA GUARDAR SOLICITUDES
// ═══════════════════════════════════════════════════════════════

// Crear una nueva solicitud de local (crea un Issue en GitHub)
async function crearSolicitudLocal(solicitud) {
    const url = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/issues`;
    
    const body = `
## 📍 ${solicitud.local.nombre}

**Cadena:** ${solicitud.local.cadena}
**Dirección:** ${solicitud.local.direccion}
**Coordenadas:** ${solicitud.local.coords[0]}, ${solicitud.local.coords[1]}

### 👤 Contacto
- **Nombre:** ${solicitud.contacto.nombre}
- **Email:** ${solicitud.contacto.email}
- **Teléfono:** ${solicitud.contacto.telefono}

### 🔗 Links
- **Rappi:** ${solicitud.links.rappi || 'No proporcionado'}
- **PedidosYa:** ${solicitud.links.pedidosYa || 'No proporcionado'}

### 🍔 Menú (${solicitud.menu.length} productos)
${solicitud.menu.map(item => `- **${item.name}** - $${item.price}`).join('\n')}

### 📝 Comentarios
${solicitud.comentarios || 'Ninguno'}

---
\`\`\`json
${JSON.stringify(solicitud, null, 2)}
\`\`\`
    `;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify({
            title: `🏪 Solicitud: ${solicitud.local.nombre}`,
            body: body,
            labels: ['solicitud-local', 'pendiente']
        })
    });

    if (!response.ok) {
        throw new Error('Error al crear solicitud');
    }

    return await response.json();
}

// Obtener todas las solicitudes pendientes
async function obtenerSolicitudesPendientes() {
    const url = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/issues?labels=solicitud-local,pendiente&state=open`;
    
    const response = await fetch(url);
    const issues = await response.json();
    
    return issues.map(issue => {
        // Extraer el JSON del cuerpo del issue
        const jsonMatch = issue.body.match(/```json\n([\s\S]*?)\n```/);
        if (jsonMatch) {
            return {
                id: issue.number,
                issueUrl: issue.html_url,
                ...JSON.parse(jsonMatch[1])
            };
        }
        return null;
    }).filter(Boolean);
}

// Aprobar una solicitud (cerrar el issue y agregar label "aprobada")
async function aprobarSolicitud(issueNumber) {
    const url = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/issues/${issueNumber}`;
    
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify({
            state: 'closed',
            labels: ['solicitud-local', 'aprobada']
        })
    });

    return await response.json();
}

// Rechazar una solicitud
async function rechazarSolicitud(issueNumber, motivo) {
    const url = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/issues/${issueNumber}`;
    
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify({
            state: 'closed',
            labels: ['solicitud-local', 'rechazada'],
            body: `**Motivo del rechazo:** ${motivo}\n\n---\n${issue.body}`
        })
    });

    return await response.json();
}

// Obtener locales aprobados (desde locales.json en GitHub)
async function obtenerLocalesAprobados() {
    const url = `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/main/locales.json`;
    
    const response = await fetch(url);
    return await response.json();
}

// ═══════════════════════════════════════════════════════════════
// VENTAJAS DE ESTE MÉTODO
// ═══════════════════════════════════════════════════════════════

/*
✅ 100% GRATIS - Sin límites de tiempo
✅ SIN CONFIGURACIÓN - Solo necesitas tu repo de GitHub
✅ VISUAL - Puedes ver las solicitudes en GitHub Issues
✅ NOTIFICACIONES - GitHub te notifica por email
✅ COMENTARIOS - Puedes comunicarte con quien envió la solicitud
✅ HISTORIAL - Todo queda registrado
✅ LABELS - Organiza con etiquetas (pendiente, aprobada, rechazada)
✅ BÚSQUEDA - GitHub tiene búsqueda integrada
*/

// ═══════════════════════════════════════════════════════════════
// CÓMO FUNCIONA
// ═══════════════════════════════════════════════════════════════

/*
1. Usuario llena formulario de registro
2. Se crea un ISSUE en tu repositorio de GitHub
3. Recibes notificación por email
4. Revisas el issue en GitHub
5. Apruebas o rechazas desde el panel admin
6. Si apruebas, copias el JSON y lo agregas a locales.json
7. Haces commit y push
8. Todos ven el nuevo local
*/
