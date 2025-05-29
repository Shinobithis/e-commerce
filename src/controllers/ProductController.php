<?php
require_once __DIR__ . '/../core/Database.php';
require_once __DIR__ . '/../models/Product.php';

class ProductController {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance();
    }

    public function index() {
        $stmt = $this->db->query("SELECT * FROM products");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    }

    public function show($id) {
        $stmt = $this->db->prepare("SELECT * FROM products WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
    }

    public function store($data) {
        $stmt = $this->db->prepare("INSERT INTO products (name, price) VALUES (?, ?)");
        $stmt->execute([$data['name'], $data['price']]);
        echo json_encode(["message" => "Produit ajouté"]);
    }

    public function update($id, $data) {
        $stmt = $this->db->prepare("UPDATE products SET name = ?, price = ? WHERE id = ?");
        $stmt->execute([$data['name'], $data['price'], $id]);
        echo json_encode(["message" => "Produit mis à jour"]);
    }

    public function destroy($id) {
        $stmt = $this->db->prepare("DELETE FROM products WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(["message" => "Produit supprimé"]);
    }
}
