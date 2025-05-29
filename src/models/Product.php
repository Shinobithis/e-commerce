<?php
class Product {
    public $id;
    public $name;
    public $price;

    public function __construct($name, $price, $id = null) {
        $this->name = $name;
        $this->price = $price;
        $this->id = $id;
    }
}
?>