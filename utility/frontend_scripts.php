<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of frontend_scripts
 *
 * @author joseluis
 */
if (!class_exists('HG_Frontend_Scripts')) :

    /**
     * HTL_Frontend_Scripts Class
     */
    class HG_Frontend_Scripts {

        /**
         * Construct.
         */
        public function __construct() {
            add_action('wp_enqueue_scripts', array($this, 'frontend_styles'));
            add_action('wp_enqueue_scripts', array($this, 'frontend_scripts'));
        }

        /**
         * Enqueue styles
         *
         * @access public
         * @return void
         */
        public function frontend_styles() {
            
        }

        /**
         * Register scripts
         *
         * @access public
         * @return void
         */
        public function frontend_scripts() {
            wp_deregister_script('jquery');
            wp_enqueue_script('jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js');
            wp_enqueue_script('jqueryui',  'https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.0/jquery-ui.min.js', false, '1.12.0', true);

            $suffix = defined('SCRIPT_DEBUG') && SCRIPT_DEBUG ? '' : '.min';

            wp_enqueue_style('hg_hotel-datepicker', HG_PLUGIN_URL . 'assets/css/hotel-datepicker.css', false, '1.1', 'all');
            
            
            
             // Localize and enqueue the datepicker scripts
            wp_enqueue_script('fecha', HG_PLUGIN_URL . 'assets/js/lib/fecha/fecha' . $suffix . '.js', array(), '2.3.0', true);
            wp_enqueue_script('hotel-datepicker', HG_PLUGIN_URL . 'assets/js/lib/hotel-datepicker/hotel-datepicker' . $suffix . '.js', array('fecha'), '3.4.0', true);


            wp_enqueue_script('hotel-datepicker-translate', HG_PLUGIN_URL . 'assets/js/i18n/dateRangHotel.js', false, '1.1.0', true);
        }

        /**
         * Enqueue scripts callback
         *
         * @access public
         * @return void
         */
        public static function frontend_calendar() {
            wp_enqueue_style('hg-shortcode-calendar', HG_PLUGIN_URL . 'assets/css/shortcode-calendar.css', false, '1.1', 'all');
            wp_enqueue_script( 'moment','https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js',false,'2.18.1','all');
            wp_enqueue_script('moment-with-locales', HG_PLUGIN_URL . 'assets/js/lib/moment/moment-with-locales.js', false, '1.1.0', true);
            wp_enqueue_script('hg-calendar', HG_PLUGIN_URL . 'assets/js/calendar.js', false, '1.1.0', true);

            $datepicker_params = array(
                'language' => 'es',
                'datepicker_format' => "D MMM YYYY",
                'baseurl' => HG_PLUGIN_URL
            );
            wp_localize_script('hg-calendar', 'hg_params', $datepicker_params);
        }
        
        public static function booking() {
            wp_enqueue_style('hg_booking_engine', HG_PLUGIN_URL . 'assets/css/booking_engine.css', false, '1.1', 'all');
            wp_enqueue_style('bootstrap', 'https://netdna.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css', false, '3.3.6', 'all');
            wp_enqueue_style( 'toastr','https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css',false,'2.1.3','all');
             wp_enqueue_style('hg_calendar', HG_PLUGIN_URL . 'assets/css/calendar.css', false, '1.1', 'all');
            
            wp_enqueue_script('bootstrap', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js', false, '3.3.6', 'all');
            
            wp_enqueue_script('jquery.card', HG_PLUGIN_URL . 'assets/js/lib/jquery.card.js', false, '1.1.0', true);
            wp_enqueue_script('nivo-lightbox', HG_PLUGIN_URL . 'assets/js/lib/slider/nivo-lightbox.min.js', false, '2.1.3', true);
            wp_enqueue_script( 'toastr','https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js',false,'1.1','all');
            wp_enqueue_script('datepicker', HG_PLUGIN_URL . 'assets/js/lib/datepicker.min.js', false, '1.1.0', true);
            wp_enqueue_script( 'moment','https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js',false,'2.18.1','all');
            wp_enqueue_script('moment-with-locales', HG_PLUGIN_URL . 'assets/js/lib/moment/moment-with-locales.js', false, '1.1.0', true);
            wp_enqueue_script('jquery.cookie', HG_PLUGIN_URL . 'assets/js/lib/jquery.cookie.js', false, '1.4.1', true);
            wp_enqueue_script('jquery.translate.', HG_PLUGIN_URL . 'assets/js/lib/jquery.translate.js', false, '0.9', true);
            wp_enqueue_script('bootstrap-validator', HG_PLUGIN_URL . 'assets/js/lib/validator.min.js', false, '0.11.5', true);
            
            wp_enqueue_script('hotel-accommodations-translate', HG_PLUGIN_URL . 'assets/js/i18n/main.js', false, '1.1.0', true);
          
            wp_enqueue_script('hg-accommodations', HG_PLUGIN_URL . 'assets/js/accommodations.js', false, '1.1.0', true);

            $datepicker_params = array(
                'language' => 'es',
                'datepicker_format' => "D MMM YYYY",
                'ajaxurl' => admin_url('admin-ajax.php'),
                'baseurl' => HG_PLUGIN_URL,
                'lang' => get_bloginfo("language")
            );
            wp_localize_script('hg-accommodations', 'hg_params', $datepicker_params);
        }

    }

    new HG_Frontend_Scripts();


endif;