<?php
header("Content-Type: application/json");

require_once __DIR__ . '/../src/controllers/ProductController.php';
require_once __DIR__ . '/../src/controllers/OrderController.php';

$method = $_SERVER['REQUEST_METHOD'];
$path = explode('/', $_GET['endpoint'] ?? '');
$resource = $path[0] ?? '';
$id = $path[1] ?? null;
$data = json_decode(file_get_contents("php://input"), true);

$productController = new ProductController();
$orderController = new OrderController();

switch ($resource) {
    case 'products':
        if ($method === 'GET') {
            $id ? $productController->show($id) : $productController->index();
        } elseif ($method === 'POST') {
            $productController->store($data);
        } elseif ($method === 'PUT' && $id) {
            $productController->update($id, $data);
        } elseif ($method === 'DELETE' && $id) {
            $productController->destroy($id);
        }
        break;

    case 'orders':
        if ($method === 'GET') {
            $id ? $orderController->show($id) : $orderController->index();
        } elseif ($method === 'POST') {
            $orderController->store($data);
        } elseif ($method === 'PUT' && $id) {
            $orderController->update($id, $data);
        } elseif ($method === 'DELETE' && $id) {
            $orderController->destroy($id);
        }
        break;

    default:
        http_response_code(404);
        echo json_encode(["error" => "Endpoint introuvable"]);
}
