<?php

/**
 * Plugin Name: Hotelgest plugin
 * Plugin URI: http://www.hotelgest.com
 * Description: This plugin is for integration module of Hotelgest into  WordPress
 * Version: 1.0.37
 * Author: hotelgest
 * Author URI: http://www.hotelgest.com
 * License: GPL2
 */
//add_action( 'wp_footer', 'my_function' );
//add_action('admin_menu', 'my_admin_menu');

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

if (!class_exists('Hotelier')) :

    final class Hotelgest {

        /**
         * @var string
         */
        public $version = '1.0.37';

        /**
         * @var Hotelier The single instance of the class
         */
        private static $_instance = null;

        /**
         * Main Instance
         *
         * Insures that only one instance of Hotelgest exists in memory at any one time.
         *
         * @static
         * @return Hotelgest - Main instance
         */
        public static function instance() {
            if (is_null(self::$_instance)) {
                self::$_instance = new self();
            }

            return self::$_instance;
        }

        public function __construct() {
            $this->plugin_name = 'hotelgest-wp';
            
            $this->setLocalization();
            $this->setup_constants();
            $this->includes();
            $this->init_hooks();



            do_action('hotegest_loaded');
        }

        /**
         * Load localization files.
         *
         * @callback    action      init
         */
        public function setLocalization() {

             load_plugin_textdomain(
			$this->plugin_name,
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

           
        }

        /**
         * Hook into actions and filters
         */
        private function init_hooks() {
            register_activation_hook(__FILE__, array('HG_Install', 'install'));
            //lo llamo desde la clase add_shortcode('hg_calendar', array( $this->shortcode, 'calendarHotelgest_plp'));
        }

        /**
         * Include required files used in admin and on the frontend.
         *
         * @access private
         * @return void
         */
        private function includes() {
            include( "utility/frontend_scripts.php" );

            include_once 'class/install.php';
            $this->shortcode = include_once 'class/shortcode.php';
            include_once 'class/booking.php';

            if (is_admin()) {
                include_once 'class/admin.php';

                require HG_PLUGIN_DIR . 'utility/puc/plugin-update-checker.php';
                $myUpdateChecker = Puc_v4_Factory::buildUpdateChecker(
                                'https://raw.githubusercontent.com/luminemotus/wp-hotelgest/master/hotelgest.json', __FILE__, 'wp-hotelgest'
                );
            }
        }

        /**
         * Setup plugin constants
         *
         * @access private
         * @return void
         */
        private function setup_constants() {
            /* Plugin Folder Path */
            if (!defined('HG_PLUGIN_DIR')) {
                define('HG_PLUGIN_DIR', plugin_dir_path(__FILE__));
            }

            /* Plugin Folder URL */
            if (!defined('HG_PLUGIN_URL')) {
                define('HG_PLUGIN_URL', plugin_dir_url(__FILE__));
            }

            /* Plugin Root File */
            if (!defined('HG_PLUGIN_FILE')) {
                define('HG_PLUGIN_FILE', __FILE__);
            }

            /* Plugin Basename */
            if (!defined('HG_PLUGIN_BASENAME')) {
                define('HG_PLUGIN_BASENAME', plugin_basename(__FILE__));
            }
        }

        /**
         * 
         * @param type $url
         * @return type
         */
        function getter($url) {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_HEADER, 0);

            curl_setopt($ch, CURLOPT_FAILONERROR, true);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
            curl_setopt($ch, CURLOPT_AUTOREFERER, true);
            curl_setopt($ch, CURLOPT_TIMEOUT, 10);

            $data = curl_exec($ch);
            curl_close($ch);
            return $data;
        }

    }

    endif;

Hotelgest::instance();









/* function my_admin_menu() {
  global $_wp_last_object_menu;
  $_wp_last_object_menu++;

  //add_management_page
  add_management_page('Config Hotelgest', 'Config Hotelgest', 'manage_options', __FILE__, 'hotelgest_admin_management_page', 'dashicons-email', $_wp_last_object_menu);
  }
  function hotelgest_admin_management_page() {

  //$textvar = get_option('hotelgest_user', '');
  //$textvar = get_option('hotelgest_password', '');
  if (isset($_POST['change-clicked'])) {
  update_option('hotelgest_user', $_POST['username']);
  update_option('hotelgest_password', $_POST['password']);
  update_option('hotelgest_codigo_propiedad', $_POST['codigo_propiedad']);
  }
  ?>

  <div class="wrap">
  <h1>Configuración de Hotelgest</h1>
  <p>Introduce tus credenciales de acceso:</p>
  <form action="<?php echo str_replace('%7E', '~', $_SERVER['REQUEST_URI']); ?>" method="post">
  Usuario:<input type="text" value="" name="username" placeholder="Usuario"><br />
  Password:<input type="password" value="" name="password" placeholder="Password"><br />
  Código de propiedad:<input type="text" value="" name="codigo_propiedad" placeholder="Password"><br />
  <input name="change-clicked" type="hidden" value="1" />
  <input type="submit" value="Guardar" />
  </form>
  </div>



  <?php
  } */




add_filter('generate_rewrite_rules', function ( $wp_rewrite ) {
    $wp_rewrite->rules = array_merge(
            ['my-custom-url/?$' => 'index.php?custom=1'], $wp_rewrite->rules
    );
});
add_filter('query_vars', function( $query_vars ) {
    $query_vars[] = 'custom';
    return $query_vars;
});
add_action('template_redirect', function() {
    $custom = intval(get_query_var('custom'));
    if ($custom) {

        include plugin_dir_path(__FILE__) . 'themes/hg-template.php';
        die;
    }
});

