<?php
require_once PROJECT_ROOT_PATH . "/model/Database.php";

class PromotionModel extends Database
{
    public function getPromotion($code)
    {
        return $this->select("SELECT * FROM promotion where promotion_code =  ?", ["s", $code]);
    }
}

?>