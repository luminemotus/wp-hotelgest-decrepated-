<?php

/**
 * Install Function
 *
 * @author   Jose luis de las heras <support@hotelgest.com>
 * @category Class
 * @package  Hotelgest/Classes
 * @version  1.0.0
 */
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

if (!class_exists('HG_Booking')) :

    /**
     * HG_Install Class
     */
    class HG_Booking {
        
        private $user_hotelgest ;
        private $pass_hotelgest ;
        /**
         * Constructor.
         */
        public function __construct() {
            add_action('wp_ajax_hg_frontend_submit', array($this, 'hg_frontend_submit'));
            add_action('wp_ajax_nopriv_hg_frontend_submit', array($this, 'hg_frontend_submit'));

            add_action('wp_ajax_tpv', array($this, 'hg_tpv'));
            add_action('wp_ajax_nopriv_tpv', array($this, 'hg_tpv'));

        }

        /**
         * https://test.webparahoteles.es/wp-admin/admin-ajax.php?action=tpv&pcode=114
         */
        function hg_tpv() {

            include HG_PLUGIN_DIR . 'utility/SDK_Hotelgest.php';
            include HG_PLUGIN_DIR . 'utility/autoload.php';

            $user_hotelgest = get_option('hotelgest_user', false) ;
            $pass_hotelgest = get_option('hotelgest_password', false);

            $hotel = new SDK_Hotelgest($user_hotelgest, $pass_hotelgest);

            // $log_line = date(DATE_RFC822) . ':' . $_GET['pcode'];
            // $hotel->logFile($log_line, 'error.log');

            try {

                $setting = $hotel->getConfig($_GET['pcode']);
                $tpvData = json_decode($setting->tpv);

                $config = array(
                    'Environment' => ( $tpvData->realMode ) ? 'real' : 'test', // Puedes indicar test o real
                    'MerchantCode' => $tpvData->merchantCode,
                    'Key' => $tpvData->cryptKey,
                    'Terminal' => $tpvData->terminal,
                    'TransactionType' => '0',
                    'Currency' => $tpvData->currencyCode,
                    'MerchantName' => $tpvData->merchantName,
                    'Titular' => $tpvData->merchantName,
                    'ConsumerLanguage' => '001',
                    'SignatureVersion' => 'HMAC_SHA256_V1'
                );

                # Control de respuesta del paso 1
                # Cargamos la clase con los parámetros base
                $TPV = new Redsys\Tpv\Tpv($config);
                # Realizamos la comprobación de la transacción

                $tpvRequest = $TPV->checkTransaction($_POST);

                //$tpvRequest["token"] = $hotel->token;
                $tpvRequest["Ds_Order"] = (int) $tpvRequest["Ds_Order"];
                $tpvRequest["Ds_Amount"] = $tpvRequest["Ds_Amount"] / 100; //number_format($tpvRequest["Ds_Amount"]/100, 2, '.', '');

                $hotel->changeStatus(
                        array(
                            'pcode' => $_GET['pcode'],
                            'rscode' => $tpvRequest["Ds_Order"],
                            'status' => 1
                        )
                );



                $hotel->set_payment(
                        array(
                            'pcode' => $_GET['pcode'],
                            'rcode' => $tpvRequest["Ds_Order"],
                            'amount' => $tpvRequest["Ds_Amount"],
                            'type' => "Tarjeta de crédito",
                            'reference' => $tpvRequest["Ds_AuthorisationCode"]
                        )
                );

                $hotel->reloadPush(
                        array(
                            'pcode' => $_GET['pcode'],
                            'rscode' => $tpvRequest["Ds_Order"],
                            'multi' => 1,
                            'admin' => 1,
                            'status' => 1
                        )
                );

                /* ob_start();
                  var_dump($tpvRequest);
                  $log = ob_get_contents();
                  ob_end_clean();
                  $log_line = date(DATE_RFC822) . ':' . $log; //json_encode($booking, JSON_UNESCAPED_UNICODE);
                  $log_file = __DIR__ . '/error.log';
                  $log = fopen($log_file, 'a');
                  fwrite($log, $log_line . "\n");
                  fclose($log); */
            } catch (\Exception $e) {
                //file_put_contents(__DIR__ . '/debug.log', $e->getMessage(), FILE_APPEND);
                $log_line = date(DATE_RFC822) . ':' . $e->getMessage();
                $hotel->logFile($log_line, 'error.log');
                die();
            }

            die();
        }

        function hg_frontend_submit() {
          include HG_PLUGIN_DIR . 'utility/SDK_Hotelgest.php';
            
         
          /*  global $bookyourtravel_accommodation_helper;
            $accommodation_results = $bookyourtravel_accommodation_helper->list_accommodations(@$paged, @$posts_per_page, @$sort_by, @$sort_order, @$parent_location_id, @$accommodation_type_ids, @$accommodation_tag_ids, array(), @$show_featured_only);
            $roomList = array();
            if ($accommodation_results)
                foreach ($accommodation_results['results'] as $accommodation_result) :
                    $accommodation_obj = new BookYourTravel_Accommodation($accommodation_result->ID);
                    if ($accommodation_obj)
                        $roomList[$accommodation_obj->get_rtcode()] = $accommodation_obj->get_custom_field('pcode');
                endforeach;*/


            $user_hotelgest = get_option('hotelgest_user', false) ;
            $pass_hotelgest = get_option('hotelgest_password', false);

            $hotel = new SDK_Hotelgest($user_hotelgest, $pass_hotelgest);

            /*ob_start();
            var_dump($_POST);
            $log = ob_get_contents();
            ob_end_clean();
            $hotel->logFile($log);*/


            $customerArray = array('name', 'surname', 'email', 'country', 'city', 'address', 'zip', 'phone', 'language', 'language_iso');
            $bookingArray = array('pcode', 'rcode', 'rtcode', 'reservation_code', 'reservation_code_num', 'amount_reason', 'discount', 'payment_gateway_fee', 'opportunities', 'wubookroom',
                'status', 'channel_reservation_code', 'id_channel', 'fount', 'modified_reservations', 'was_modified', 'amount', 'orig_amount',
                'date_received', 'date_arrival', 'date_departure', 'arrival_hour', 'boards', 'status_reason', 'occupancy', 'men', 'children', 'ancillary',
                'device', 'special_offer', 'sessionSeed', 'booked_rate', 'cc_info', 'roomnight', 'room_opportunities', 'customer', 'customer_notes');


//comprobamos los campos de customer
            /* $postCustomer = (array) json_decode($_POST['customer']);
              unset($_POST['customer']);
              $customer = KitHotelgest::cleanArray($customerArray, $postCustomer);
              $booking['customer'] = json_encode($customer); */

//comprobamos los campos de rooms
            $postRooms = (array) json_decode(str_replace("\\", '', $_POST['rooms']), true);
            $customer = (array) json_decode(str_replace("\\", '', $_POST['customer']), true);
            $ccard = (array) json_decode(str_replace("\\", '', $_POST['ccard']), true);
            $products = (array) json_decode(str_replace("\\", '', $_POST['products']), true);

            $totalAmount = 0;
            $payment_in = false;
            $total_tpv = 0;
            $a = new DateTime('now');
            $b = new DateTime($_POST['date_arrival']);
            $untilDays = $a->diff($b)->days;

//get info room
            $booking = SDK_Hotelgest::cleanArray($bookingArray, $_POST);
            unset($_POST['rooms']);
            foreach ($postRooms as $postR):
                $postR = (array) $postR;

                // $pcode = $roomList[$postR['rcode']];
                $pcode = $postR['pcode'] = ( isset($postR['pcode']) ) ? $postR['pcode'] : $_POST['pcode'];

                //Caution Multiproperty
                $setting = $hotel->getConfig($postR["pcode"]);
                $property = $hotel->get_property($postR["pcode"]);

                /* if room is empty */
                if (isset($postR['rcode']) < 1)
                    continue;
                $postR['rtcode'] = $postR['rcode'];
                $room['pack'] = (isset($postR['pack']) ) ? $hotel->isPack(array('pack_code' => $postR['pack'],
                            'fromDate' => $booking['date_arrival'], 'toDate' => $booking['date_departure'],
                            'rcode' => $postR['rtcode'], 'pcode' => $postR['pcode'])) : 0;

                $price = $hotel->get_price(array('pcode' => $pcode, 'fromDate' => $booking['date_arrival'], 'toDate' => $booking['date_departure']
                    , 'rtcode' => $postR['rtcode'], 'occupancy' => $postR['occupancy'], 'board' => $postR['board'], 'policy' => $postR['policy']));

                $price = $price[0];
                if (isset($postR['pack'])) {
                    $price = $hotel->get_pricePack(array('pack_code' => $postR['pack'],
                        'fromDate' => $booking['date_arrival'], 'toDate' => $booking['date_departure'],
                        'rcode' => $postR['rcode'], 'pcode' => $pcode));
                }
                $dayprices = [];
                if ($price->ancillary)
                    foreach ($price->ancillary as $key => $prc) {
                        $dayprices[$key] = $prc->price;
                    };

                $totalAmount += $room['amount'] = $price->price;
                $room['amount'] = $price->price;
                $room['orig_amount'] = $price->price;
                $room['dayprices'] = json_encode($dayprices);
                $room['rtcode'] = $postR['rcode'];
                if (isset($postR['children'])) {
                    $room['children'] = $postR['children'];
                    $room['men'] = $postR['men'];
                    $bookingTemp[$pcode]['occupancy'] = $booking['occupancy'] = $room['occupancy'] = $room['men'] + $room['children'];
                } else {
                    $bookingTemp[$pcode]['occupancy'] = $booking['occupancy'] = $room['occupancy'] = $room['men'] = $postR['occupancy'];
                    $room['children'] = 0;
                }

                $room['board'] = $postR['board'];
                $room['policy'] = $postR['policy'];

                if (@$property->paymentType) {
                    $pId = $room['policy'];
                    if (in_array($pId, $property->paymentType->policyId)) {
                        if ($property->paymentType->data->{$pId}->day > $untilDays) {
                            $payment_in = true;

                            $percentageValue = $property->paymentType->data->{$pId}->Percentage / 100;
                            $percentage = $property->paymentType->data->{$pId}->Percentage;
                            $cleanInclude = ( isset($paymentType->data->{$pId}->cleanInclude) ) ? $paymentType->data->{$pId}->cleanInclude : 0;
                            
                              if ($cleanInclude == 1)
                                  $total_tpv = $total_tpv + ( $price->roomclear * $percentageValue );

                            $total_tpv = $price->price * $percentageValue;
                        }
                    }
                }

                $rooms[$pcode][] = $room;
            endforeach;

            $postProduct = (array) json_decode($_POST['products']);


            $bookingGeneral['customer_language_iso'] = strtolower($customer['lang']);
            $bookingGeneral["id_channel"] = 999;
            $bookingGeneral["status"] = 1;
            $bookingGeneral["reservation_code_num"] = 1;

            if ($payment_in and @ $setting->tpv != '') {
                $tpvData = json_decode($setting->tpv);
                $tpvActive = 1;
                $status = 5;
                $bookingGeneral["push"] = 0;
                $bookingGeneral["pushAdmin"] = 0;
            } else {
                $tpvActive = 0;
                $status = 1;
                $bookingGeneral["push"] = 1;
                $bookingGeneral["pushAdmin"] = 1;
                $bookingGeneral["ccard"] = json_encode($ccard, JSON_FORCE_OBJECT);
            }
            //fin preparate tpv    

            $listRscode = [];
            $errorResev = false;
            foreach ($rooms as $p => $r):
                $booking["products"] = $_POST['products'];
                $booking = SDK_Hotelgest::cleanArray($bookingArray, $_POST);
                $booking = array_merge($booking, $bookingGeneral);
                $booking['pcode'] = $p;
                $booking['status'] = $status;
                $booking['occupancy'] = $bookingTemp[$p]['occupancy'];
                $booking['customer_language_iso'] = strtolower($customer['lang']);
                $booking['rooms'] = json_encode($rooms[$p], JSON_FORCE_OBJECT);
                $booking['customer'] = json_encode($customer, JSON_FORCE_OBJECT);
                $booking["id_channel"] = 999;
                $booking["reservation_code_num"] = 1;
                $booking["product"] = $booking["products"] = json_encode($products, JSON_FORCE_OBJECT);
                ;

                // $curl_post_data['fount'] = 1946;

                $decodedBooking = $hotel->set_booking($booking);
                //var_dump($decoded); die('hotel1');
                $returnBooking = json_decode($decodedBooking);

                if (!isset($returnBooking->success)) {
                    var_dump($booking);
                    echo $decodedBooking;
                    $errorResev = true;
                } elseif ($returnBooking->success == false) {
                    $errorResev = true;
                } else {
                    $listRscode[] = $returnBooking->data->rscode;
                    $customer_id = $returnBooking->data->customer;
                }

                //var_dump($booking);
                unset($booking);
                unset($_POST['products']);
            endforeach;

            if ($errorResev) {

                echo json_encode(array("success" => false, "data" => array(), "errors" => ""));
                wp_die();
            }

            $rscodeData = implode(',', $listRscode);
            $returnBooking = (object) array("success" => true, "data" => (object) array("customer" => $customer_id, "rscode" => $rscodeData), "errors" => "");

            if ($tpvActive) {//if (@$setting->tpv != '') {
                 include HG_PLUGIN_DIR . 'utility/autoload.php';
                //var_dump($booking);
                //var_dump($returnBooking);

                $config = array(
                    'Environment' => ( $tpvData->realMode ) ? 'real' : 'test', // Puedes indicar test o real
                    'MerchantCode' => $tpvData->merchantCode,
                    'Key' => $tpvData->cryptKey,
                    'Terminal' => $tpvData->terminal,
                    'TransactionType' => '0',
                    'Currency' => $tpvData->currencyCode,
                    'MerchantName' => $tpvData->merchantName,
                    'Titular' => $tpvData->merchantName,
                    'ProductDescription' => 'Descripcion del productos',
                    'ConsumerLanguage' => '001',
                    'SignatureVersion' => 'HMAC_SHA256_V1'
                );

                # Cargamos la clase con los parámetros base
                $TPV = new Redsys\Tpv\Tpv($config);
                # Indicamos los campos para el pedido
                $path = $_SERVER["HTTP_REFERER"];
                $TPV->setFormHiddens(array(
                    'TransactionType' => '0',
                    'MerchantData' => $tpvData->merchantCode,
                    'Order' => $returnBooking->data->rscode,
                    'ProductDescription' => 'Descripcion del productos TMP',
                    'Amount' => $totalAmount,
                    'UrlOK' => $path . '?rscode=' . $returnBooking->data->rscode . '&tpv=ok',
                    'UrlKO' => $path . '?tpv=ko',
                    'MerchantURL' => admin_url('admin-ajax.php') . '?action=tpv&pcode=' . $pcode . '&rscode=' . $returnBooking->data->rscode
                ));
                $log = admin_url('admin-ajax.php') . '?action=tpv&pcode=' . $pcode . '&rscode=' . $returnBooking->data->rscode;
                $hotel->logFile($log);
                // echo admin_url('admin-ajax.php'); 
                //var_dump( $TPV->getFormHiddens() );
                //var_dump( $TPV->getOption() );
                $dataRedsys = (object) array(
                            'Ds_SignatureVersion' => $TPV->getSignatureVersion(),
                            'Ds_MerchantParameters' => $TPV->getMerchantParametersEncoded(),
                            'Ds_Signature' => $TPV->getValuesSignature()
                );
                /* return $this->getInputHidden('SignatureVersion', $this->options['SignatureVersion'])
                  .$this->getInputHidden('MerchantParameters', $this->getMerchantParametersEncoded())
                  .$this->getInputHidden('Signature', $this->getValuesSignature());
                 */

                $returnBooking = array("success" => true, "data" => $returnBooking->data, "tpv" => array('fields' => $dataRedsys, 'path' => $TPV->getPath('/realizarPago')));
            }


            echo json_encode($returnBooking);

            wp_die();
        }

    }

    endif;

return new HG_Booking();
