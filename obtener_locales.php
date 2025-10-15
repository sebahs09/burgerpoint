<?php
header('Content-Type: application/json');

// Configuración de la base de datos
$servername = "127.0.0.1";
$username = "root"; // Cambia según tu configuración
$password = "";     // Cambia según tu configuración
$dbname = "burgerpoint";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Consulta para obtener locales y sus menús
    $stmt = $conn->prepare("SELECT l.id, l.nombre AS name, l.direccion AS address, l.latitud AS lat, l.longitud AS lon, l.link_pedido AS orderLink, l.cadena AS chain, 
                            m.nombre AS menu_name, m.precio AS menu_price, m.imagen_url AS menu_image 
                            FROM locales l 
                            LEFT JOIN menu_items m ON l.id = m.local_id");
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Agrupar menús por local
    $locations = [];
    foreach ($results as $row) {
        $localId = $row['id'];
        if (!isset($locations[$localId])) {
            $locations[$localId] = [
                'id' => $localId,
                'name' => $row['name'],
                'address' => $row['address'],
                'coords' => [floatval($row['lat']), floatval($row['lon'])],
                'orderLink' => $row['orderLink'] ?: '#',
                'menu' => []
            ];
        }
        if ($row['menu_name']) {
            $locations[$localId]['menu'][] = [
                'name' => $row['menu_name'],
                'price' => floatval($row['menu_price']),
                'image' => $row['menu_image'] ?: 'https://via.placeholder.com/60x60.png?text=' . urlencode($row['menu_name'])
            ];
        }
    }

    // Convertir a array y enviar como JSON
    echo json_encode(array_values($locations));
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error de conexión: ' . $e->getMessage()]);
}
?>