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

if (!class_exists('HG_Install')) :

    /**
     * HG_Install Class
     */
    class HG_Install {

        /**
         * Init functions.
         * @access public
         * @return void
         */
        public static function init() {
            
        }

        /**
         * Check HG version.
         *
         * @access public
         * @return void
         */
        public static function check_version() {
            if (!defined('IFRAME_REQUEST') && ( get_option('hotelier_version') != HTL_VERSION )) {
                self::install();
                do_action('hotelgest_updated');
            }
        }

        /**
         * Install HG
         */
        public static function install() {


            $title_bk_hq = 'booking Hg';
            /* Create post object */
            $is_page = HG_Install::get_page_by_slug_hg( sanitize_title($title_bk_hq) ) ;
            
            if ( !$is_page ) {
                $my_post = array(
                    'post_title' => wp_strip_all_tags($title_bk_hq),
                    'post_content' => '[hg_booking]',
                    'post_status' => 'publish',
                    'post_author' => 1,
                    'post_type' => 'page',
                );

                /* Insert the post into the database */
                $postId = wp_insert_post($my_post);
            }else{
                $postId = $is_page->ID;
            }

            update_option('hotelgest_pageId_booking', $postId);
        }

        public static function get_page_by_slug_hg($slug) {
            if ($pages = get_pages())
                foreach ($pages as $page){
                    if ($slug === $page->post_name)   
                        return $page;
                }    
            return false;
        }

    }

    

    endif;

