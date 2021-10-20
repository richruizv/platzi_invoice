<?php
class PromotionController extends BaseController
{
    /**
     * "/user/list" Endpoint - Get list of users
     */
    public function getCodeAction()
    {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $arrQueryStringParams = $this->getQueryStringParams();
 
        if (strtoupper($requestMethod) == 'GET') {
            try {
                $promotionModel = new PromotionModel();
                
                if (isset($arrQueryStringParams['code']) && $arrQueryStringParams['code']) {
                    $code = $arrQueryStringParams['code'];
                }else{
                    $code='';
                }
                $arrPromotions= $promotionModel->getPromotion($code);
                $responseData = json_encode($arrPromotions);
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }
 
        // send output
        if (!$strErrorDesc) {
            $this->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            $this->sendOutput(json_encode(array('error' => $strErrorDesc)), 
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }
}