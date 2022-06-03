<?php

/**
 * Shortcode  Function
 *
 * @author   Jose luis de las heras <support@hotelgest.com>
 * @category Class
 * @package  Hotelgest/Classes
 * @version  1.0.0
 */
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

if (!class_exists('HG_Shortcode')) :

    /**
     * HG_Install Class
     */
    class HG_Shortcode {

        /**
         * Constructor.
         */
        public function __construct() {
            add_shortcode('hg_calendar', array($this, 'calendarHotelgest_plp'));
            add_shortcode("hg_booking", array($this, 'hostelgest_plp'));
            add_shortcode("hg_day_price", array($this, 'dayprice_plp'));
        }

        function calendarHotelgest_plp($atts = null, $content = null, $tag = null) {
            if ($_SERVER["PHP_SELF"] == "/wp-admin/post.php") {
                return;
            }

            // Use minified libraries if SCRIPT_DEBUG is turned off
            HG_Frontend_Scripts::frontend_calendar();

            $atts = shortcode_atts(
                    array(
                'external' => '',
                'onlyrooms' => '',
                'bookrooms' => '',
                'layout' => '',
                'pageid' => '',
                'pcode' => false,
                'url' => false,
                'lang' => '',
                    ), $atts);

            $postInput = "";
                 
            if( $atts["url"] ){
               $action = $atts["url"];
                
            }else if ((int) $atts["external"] > 0) {
                $action = 'https://booking.hotelgest.com/v3/';
                //$action .= ( get_option('hotelgest_v3', 0) ) ? 'v3' : '';
                if( $atts["pcode"] ){
                    $postInput = '<input type="hidden" id="pcode" name="pcode" value="' . $atts["pcode"] . '" >';
                }
            } else {
                $post_id = get_option('hotelgest_pageId_booking', '');
                $action = get_permalink($post_id);
                $postInput = '<input type="hidden" id="page_id" name="page_id" value="' . $post_id . '" >';
            }

            ob_start();
            $suffix = 'min';

            if (file_exists(get_template_directory() . '/wp-hotelgest/themes/shortcode_calendar.php')) {
                include( get_template_directory() . '/wp-hotelgest/themes/shortcode_calendar.php' );
            } else {
                include( HG_PLUGIN_DIR . "themes/shortcode_calendar.php" );
            }
            $html = ob_get_contents();
            ob_end_clean();

            return $html;
        }

        function hostelgest_plp($atts = null) {
            if ($_SERVER["PHP_SELF"] == "/wp-admin/post.php") {
                return;
            }

            $atts = shortcode_atts(
                    array(
                      'pcode' => false,
                      'rtcode' => '',
                      'lang' => false,
                      'occupancy' => false,
                      'min_occupancy' => false,
                      'max_occupancy' => false,  
                    ), $atts);

            foreach ($atts as $key => $att):
                if (!$att)
                    unset($atts[$key]);
            endforeach;

            HG_Frontend_Scripts::booking($atts);

            if (file_exists(get_template_directory() . '/wp-hotelgest/themes/shortcode_booking_main.php')) {
                include( get_template_directory() . '/wp-hotelgest/themes/shortcode_booking_main.php' );
            } else {
                include( HG_PLUGIN_DIR . "themes/shortcode_booking_main.php" );
            }
            if (file_exists(get_template_directory() . '/wp-hotelgest/themes/shortcode_booking_tmpl.php')) {
                include( get_template_directory() . '/wp-hotelgest/themes/shortcode_booking_tmpl.php' );
            } else {
                include( HG_PLUGIN_DIR . "themes/shortcode_booking_tmpl.php" );
            }
            if (file_exists(get_template_directory() . '/wp-hotelgest/themes/shortcode_booking_modal.php')) {
                include( get_template_directory() . '/wp-hotelgest/themes/shortcode_booking_modal.php' );
            } else {
                include( HG_PLUGIN_DIR . "themes/shortcode_booking_modal.php" );
            }


            /*   $user = get_option('hotelgest_user', '');
              $password = get_option('hotelgest_password', '');

              return "TPM-->" . $user . "--" . $password; */
        }

        function dayprice_plp($atts = null) {
            if ($_SERVER["PHP_SELF"] == "/wp-admin/post.php") {
                return;
            }

            if (!class_exists('SDK_Hotelgest')) {
                include HG_PLUGIN_DIR . 'utility/SDK_Hotelgest.php';
            }

            $atts = shortcode_atts(
                    array(
                'rtcode' => '',
                'occupancy' => '',
                'board' => '',
                'policy' => ''
                    ), $atts);

            foreach ($atts as $key => $att):
                if (!$att)
                    unset($atts[$key]);
            endforeach;

            $user_hotelgest = get_option('hotelgest_user', false);
            $pass_hotelgest = get_option('hotelgest_password', false);
            $pcode = get_option('hotelgest_pcode', false);
            $hotel = new SDK_Hotelgest($user_hotelgest, $pass_hotelgest);

            $occupancy = ( isset($atts['occupancy']) ) ? $atts['occupancy'] : 1;
            $board = ( isset($atts['board']) ) ? $atts['board'] : 'nb';
            $policy = ( isset($atts['policy']) ) ? $atts['policy'] : 4;
            $fromDate = date('Y-m-d');
            $toDate = date('Y-m-d');
            $todayDate = new DateTime();
            $fromDate = $todayDate->format('Y-m-d');
            $toDate = $todayDate->modify('+1 day')->format('Y-m-d');
            $price = $hotel->get_price(array('pcode' => $pcode, 'fromDate' => $fromDate, 'toDate' => $toDate
                , 'rtcode' => $atts['rtcode'], 'occupancy' => $occupancy, 'board' => $board, 'policy' => $policy));

            echo $price[0]->price;
        }

    }

    endif;

return new HG_Shortcode();
