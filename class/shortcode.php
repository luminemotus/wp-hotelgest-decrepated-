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
            add_shortcode('hg_calendar', array( $this, 'calendarHotelgest_plp'));
            add_shortcode("hg_booking", array($this, 'hostelgest_plp'));
        }

        function calendarHotelgest_plp($atts = null, $content = null, $tag = null) {
// Use minified libraries if SCRIPT_DEBUG is turned off
            HG_Frontend_Scripts::frontend_calendar();

            $atts = shortcode_atts(
                    array(
                'external' => '',
                'onlyrooms' => '',
                'bookrooms' => '',
                'layout' => '',
                'pageid' => '',
                'lang' => '',
                    ), $atts);

            $postInput = "";
            if ((int) $atts["external"] > 0) {
                $action = 'https://booking.hotelgest.com/';
                $action .= ( get_option('hotelgest_v3', 0) ) ? 'v3' : '';
            } else {
                $post_id = get_option('hotelgest_pageId_booking', '');
                $action = get_permalink( $post_id );
                $postInput = '<input type="hidden" id="page_id" name="page_id" value="'.$post_id.'" >';
            }

            ob_start();
            $suffix = 'min';
            include( HG_PLUGIN_DIR."themes/shortcode_calendar.php" );
            
            $html = ob_get_contents();
            ob_end_clean();

            return $html;
        }

        function hostelgest_plp($atts = null) {
            $atts = shortcode_atts(
                    array(
                'rtcode' => '',
                'lang' => false,
                    ), $atts);
      
            foreach( $atts as $key =>$att ):
                if( !$att )
                    unset( $atts[$key] );
            endforeach;
            
            HG_Frontend_Scripts::booking( $atts );
         

            include( HG_PLUGIN_DIR."themes/shortcode_booking_main.php" );
            include( HG_PLUGIN_DIR."themes/shortcode_booking_tmpl.php" );
            include( HG_PLUGIN_DIR."themes/shortcode_booking_modal.php" );


         /*   $user = get_option('hotelgest_user', '');
            $password = get_option('hotelgest_password', '');

            return "TPM-->" . $user . "--" . $password;*/
        }

    }

    endif;

return new HG_Shortcode();
