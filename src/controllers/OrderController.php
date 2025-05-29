<?php
require_once __DIR__ . '/../core/Database.php';
require_once __DIR__ . '/../models/Order.php';

class OrderController {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance();
    }

    public function index() {
        $stmt = $this->db->query("SELECT * FROM orders");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    }

    public function show($id) {
        $stmt = $this->db->prepare("SELECT * FROM orders WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
    }

    public function store($data) {
        $stmt = $this->db->prepare("INSERT INTO orders (product_id, quantity) VALUES (?, ?)");
        $stmt->execute([$data['product_id'], $data['quantity']]);
        echo json_encode(["message" => "Commande ajoutée"]);
    }

    public function update($id, $data) {
        $stmt = $this->db->prepare("UPDATE orders SET product_id = ?, quantity = ? WHERE id = ?");
        $stmt->execute([$data['product_id'], $data['quantity'], $id]);
        echo json_encode(["message" => "Commande mise à jour"]);
    }

    public function destroy($id) {
        $stmt = $this->db->prepare("DELETE FROM orders WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(["message" => "Commande supprimée"]);
    }
}