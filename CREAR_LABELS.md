# 🏷️ Crear Labels en GitHub

## Opción 1: Manual (Más Fácil)

1. **Ve a tu repositorio:**
   ```
   https://github.com/sebahs09/burgerpoint/labels
   ```

2. **Crea estos 4 labels:**

   ### Label 1: solicitud-local
   - **Name:** `solicitud-local`
   - **Description:** `Solicitud de alta de local en BurgerPoint`
   - **Color:** `#0366d6` (azul)
   - Click en "Create label"

   ### Label 2: pendiente
   - **Name:** `pendiente`
   - **Description:** `Solicitud pendiente de revisión`
   - **Color:** `#fbca04` (amarillo)
   - Click en "Create label"

   ### Label 3: aprobada
   - **Name:** `aprobada`
   - **Description:** `Solicitud aprobada - se agregará al mapa`
   - **Color:** `#0e8a16` (verde)
   - Click en "Create label"

   ### Label 4: rechazada
   - **Name:** `rechazada`
   - **Description:** `Solicitud rechazada`
   - **Color:** `#d73a49` (rojo)
   - Click en "Create label"

---

## Opción 2: Usando la API de GitHub (Automático)

Si tienes un token de GitHub, puedes ejecutar estos comandos en PowerShell:

```powershell
# Reemplaza TU_TOKEN con tu Personal Access Token de GitHub
$TOKEN = "TU_TOKEN"
$REPO = "sebahs09/burgerpoint"

# Label 1: solicitud-local
Invoke-RestMethod -Uri "https://api.github.com/repos/$REPO/labels" -Method Post -Headers @{
    Authorization = "token $TOKEN"
    Accept = "application/vnd.github.v3+json"
} -Body (@{
    name = "solicitud-local"
    description = "Solicitud de alta de local en BurgerPoint"
    color = "0366d6"
} | ConvertTo-Json) -ContentType "application/json"

# Label 2: pendiente
Invoke-RestMethod -Uri "https://api.github.com/repos/$REPO/labels" -Method Post -Headers @{
    Authorization = "token $TOKEN"
    Accept = "application/vnd.github.v3+json"
} -Body (@{
    name = "pendiente"
    description = "Solicitud pendiente de revisión"
    color = "fbca04"
} | ConvertTo-Json) -ContentType "application/json"

# Label 3: aprobada
Invoke-RestMethod -Uri "https://api.github.com/repos/$REPO/labels" -Method Post -Headers @{
    Authorization = "token $TOKEN"
    Accept = "application/vnd.github.v3+json"
} -Body (@{
    name = "aprobada"
    description = "Solicitud aprobada - se agregará al mapa"
    color = "0e8a16"
} | ConvertTo-Json) -ContentType "application/json"

# Label 4: rechazada
Invoke-RestMethod -Uri "https://api.github.com/repos/$REPO/labels" -Method Post -Headers @{
    Authorization = "token $TOKEN"
    Accept = "application/vnd.github.v3+json"
} -Body (@{
    name = "rechazada"
    description = "Solicitud rechazada"
    color = "d73a49"
} | ConvertTo-Json) -ContentType "application/json"
```

### Cómo obtener un token:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token
3. Permisos: `repo` (marcar todo)
4. Copiar el token

---

## ✅ Verificar que se crearon

Después de crearlos, ve a:
```
https://github.com/sebahs09/burgerpoint/labels
```

Deberías ver los 4 labels nuevos.

---

## 🧪 Probar el Sistema

1. **Crear una solicitud de prueba:**
   - Ve a: `https://sebahs09.github.io/burgerpoint/burger.html`
   - Click en "Registra tu Local GRATIS"
   - Llena el formulario (puedes usar datos de prueba)
   - Envía

2. **Revisar el Issue:**
   - Ve a: `https://github.com/sebahs09/burgerpoint/issues`
   - Deberías ver un nuevo issue con label `solicitud-local` y `pendiente`

3. **Aprobar:**
   - Abre el issue
   - Agrega el label `aprobada`
   - Cierra el issue
   - Espera 1-2 minutos

4. **Verificar:**
   - Ve a: `https://github.com/sebahs09/burgerpoint/actions`
   - Deberías ver el workflow ejecutándose
   - Cuando termine, ve a `locales.json` y verifica que se agregó el nuevo local
   - Refresca el mapa: `https://sebahs09.github.io/burgerpoint/burger.html`
   - ¡El nuevo local debería aparecer!

---

## 🔐 Acceder al Panel Admin

1. Ve a: `https://sebahs09.github.io/burgerpoint/admin-panel.html`
2. Ingresa el PIN: `12345`
3. Verás las solicitudes (aunque ahora estarán vacías porque usan localStorage)

**Nota:** El admin panel muestra solicitudes de localStorage (local). Las solicitudes reales están en GitHub Issues.

---

## 📝 Resumen

- ✅ Código subido a GitHub
- ⏳ Falta crear los 4 labels
- ⏳ Falta hacer una prueba

**Recomendación:** Usa la Opción 1 (manual) - es más rápido y no necesitas token.
