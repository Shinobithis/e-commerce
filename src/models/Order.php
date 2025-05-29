<?php
class Order { //DTO
    public $id;
    public $product_id;
    public $quantity;

    public function __construct($product_id, $quantity, $id = null) {
        $this->product_id = $product_id;
        $this->quantity = $quantity;
        $this->id = $id;
    }
}
?>