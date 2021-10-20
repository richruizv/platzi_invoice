<?php
require_once PROJECT_ROOT_PATH . "/model/Database.php";

class ProductModel extends Database
{
    public function getProducts($limit)
    {
        return $this->select("SELECT * FROM product ORDER BY product_id ASC LIMIT ?", ["i", $limit]);
    }
}

?>