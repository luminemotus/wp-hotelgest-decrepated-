<?php
          
include( HG_PLUGIN_DIR . 'utility/apf/library/apf/admin-page-framework.php' );
                
// Extend the class
class APF_AddFieldsHG extends AdminPageFramework {
 
    /**
     * The set-up method which is triggered automatically with the 'wp_loaded' hook.
     * 
     * Here we define the setup() method to set how many pages, page titles and icons etc.
     */
    
     protected $sPageSlug = 'apf_manage_options';

    /**
     * Sets up pages.
     */
    public function setUp() {
       
        $this->setRootMenuPage(
            "<span id='hotelgest-menu'>"
                . __( 'Hotelgest2', 'hotelgest' )
            . "</span>"
            ,
            version_compare( $GLOBALS[ 'wp_version' ], '3.8', '>=' )
                ? 'dashicons-media-code'
                : null // dash-icons are supported since WordPress v3.8
        );

        $this->addSubMenuItems(
            array(
                'title'         => __( 'Hotelgest2', 'hotelgest' ),
                'page_slug'     => 'hotelgest',
            )
        );
        // Add in-page tabs
        $this->addInPageTabs(
            'hotelgest',    // target page slug
            array(
                'title'         => 'Setting',    // tab title
                'tab_slug'      => 'setting',    // tab slug
            ),
            array(
                'title'         => 'Style',    // tab title
                'tab_slug'      => 'style',    // tab slug
            )
        );
       
    }
    
    /**
     * One of the pre-defined methods which is triggered when the registered page loads.
     * 
     * Here we add form fields.
     * @callback        action      load_{page slug}
     */
   // public function load_hotelgest( $oAdminPage ) {
    public function load_hotelgest_setting( $oAdminPage ) {
        
        $this->addSettingFields(
            array(    // Usuario
                'field_id'      => 'hotelgest_user',
                'type'          => 'text',
                'title'         => __( 'User', 'hotelgest' ),
                'description'   => 'Usuario',   
            ),
            array(    // Password
                'field_id'      => 'hotelgest_password',
                'type'          => 'text',
                'title'         => __( 'Password', 'hotelgest' ),
                'description'   => 'Password',   
            ), 
            array(    // pcode
                'field_id'      => 'pcode',
                'type'          => 'text',
                'title'         => __( 'Pcode', 'hotelgest' ),
                'description'   => __( 'Código de propiedad', 'hotelgest' )   
            ), 
            array(    // occupancy_min
                'field_id'      => 'occupancy_min',
                'type'          => 'text',
                'title'         => __( 'Occupancy min', 'hotelgest' ),
                'description'   => __( 'Occupancy min', 'hotelgest' )   
            ), 
            array(    // occupancy_max
                'field_id'      => 'occupancy_max',
                'type'          => 'text',
                'title'         => __( 'Occupancy max', 'hotelgest' ),
                'description'   => __( 'Occupancy max', 'hotelgest' )   
            ),
            array(    // fbAnalytics
                'field_id'      => 'hg-fbAnalytics',
                'type'          => 'text',
                'title'         => __( 'fbAnalytics', 'hotelgest' ) 
            ), 
            array(    // Analytics
                'field_id'      => 'hg-analytics',
                'type'          => 'text',
                'title'         => __( 'Analytics', 'hotelgest' )  
            ),    
                array(
    'field_id'      => 'color_picker_field',
    'title'         => __( 'Color Picker', 'admin-page-framework-loader' ),
    'type'          => 'color',
),
            array( // Submit button
                'field_id'      => 'submit_button',
                'type'          => 'submit',
            )   
        );    
        
        
    }
    
    public function load_hotelgest_style( $oAdminPage ) {
        
        $this->addSettingFields(
            array(    // Usuario
                'field_id'      => 'hotelgest_user',
                'type'          => 'text',
                'title'         => __( 'User', 'hotelgest' ),
                'description'   => 'Usuario',   
            ),
            array(
                'field_id'      => 'color_picker_field',
                'title'         => __( 'Color Picker', 'admin-page-framework-loader' ),
                'type'          => 'color',
            ),
            array( // Submit button
                'field_id'      => 'submit_button',
                'type'          => 'submit',
            )   
        );    
        
        
    }
    
    /**
     * One of the pre-defined methods which is triggered when the page contents is going to be rendered.
     * @callback        action      do_{page slug}
     */
    public function do_my_first_forms() {
                   
        // Show the saved option value.
        // The extended class name is used as the option key. This can be changed by passing a custom string to the constructor.
        echo '<h3>Saved Fields</h3>';
        echo '<pre>my_text_field: ' . AdminPageFramework::getOption( 'APF_AddFields', 'my_text_field', 'default text value' ) . '</pre>';
        echo '<pre>my_textarea_field: ' . AdminPageFramework::getOption( 'APF_AddFields', 'my_textarea_field', 'default text value' ) . '</pre>';
        
        echo '<h3>Show all the options as an array</h3>';
        echo $this->oDebug->get( AdminPageFramework::getOption( 'APF_AddFields' ) );
       
    }
   
}
 
// Instantiate the class object.
new APF_AddFieldsHG;


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

if (!class_exists('HG_Admin')) :

    /**
     * HG_Install Class
     */
    class HG_Admin {

        /**
         * Constructor.
         */
        public function __construct() {
            add_action('admin_menu', array($this, 'hotelgest_admin_menu'));
        }

        function hotelgest_admin_menu() {
            global $_wp_last_object_menu;
            $_wp_last_object_menu++;

            $page_title = 'Hotelgest';
            $menu_title = 'Hotelgest';
            $capability = 'manage_options';
            $menu_slug = 'extra-post-info';
            $function = array($this, 'create_settings_page');
            $icon_url = 'dashicons-media-code';
            $position = $_wp_last_object_menu;

            add_menu_page($page_title, $menu_title, $capability, $menu_slug, $function, $icon_url, $position);
        }

        function create_settings_page() {


            if (isset($_POST['change-clicked'])) {
                update_option('hotelgest_user', $_POST['username']);
                update_option('hotelgest_password', $_POST['password']);
                update_option('hotelgest_pcode', $_POST['pcode']);
                update_option('hotelgest_occupancy_min', $_POST['occupancy_min']);
                update_option('hotelgest_occupancy_max', $_POST['occupancy_max']);
                update_option('hotelgest_fb_analytics', $_POST['fb_analytics']);
            }

            $this->hostelgest_welcome_panel();
            ?>

            <div class="wrap">
                <h1>Configuración de Hotelgest</h1>
                <p>Introduce tus credenciales de acceso:</p>
                <form action="<?php echo str_replace('%7E', '~', $_SERVER['REQUEST_URI']); ?>" method="post">
                    <table class="form-table">
                        <tr>
                            <th scope="row">Usuario</th>   
                            <td>
                                <input type="text" value="<?php echo get_option('hotelgest_user', 'demoacccount'); ?>" name="username" placeholder="Usuario"/>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Password</th>   
                            <td>
                                <input type="password" value="<?php echo get_option('hotelgest_password', '123456789'); ?>" name="password" placeholder="Password"/>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Código de propiedad</th>   
                            <td>
                                <input type="text" value="<?php echo get_option('hotelgest_pcode', '114'); ?>" name="pcode" id="pcode" placeholder="Código de propiedad"/>
                            </td>
                        </tr>

                        <tr>
                            <th scope="row">occupancy min</th>
                            <td>
                                <input type="text" name="occupancy_min" id="" value="<?php echo get_option('hotelgest_occupancy_min', ''); ?>" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">occupancy max</th>
                            <td>
                                <input type="text" name="occupancy_max" id="" value="<?php echo get_option('hotelgest_occupancy_max', ''); ?>" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">fbAnalytics</th>
                            <td>
                                <input type="text" name="fb_analytics" id="hg-fbAnalytics" value="<?php echo get_option('hotelgest_fb_analytics', ''); ?>" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Analytics</th>
                            <td>
                                <input type="text" name="analytics" id="hg-analytics" value="<?php echo get_option('hotelgest_analytics', ''); ?>" />
                            </td>
                        </tr>
                    </table>

                    <input name="change-clicked" type="hidden" value="1" />
                    <p class="submit">
                        <input type="submit" name="submit" id="submit" class="button button-primary" value="Guardar cambios">
                    </p>
                </form>
            </div>

            <?php
        }

        function hostelgest_welcome_panel() {
            $classes = 'welcome-panel';

            /* $vers = (array) get_user_meta( get_current_user_id(),
              'wpcf7_hide_welcome_panel_on', true );

              if ( wpcf7_version_grep( wpcf7_version( 'only_major=1' ), $vers ) ) {
              $classes .= ' hidden';
              } */
            ?>
            <div id="welcome-panel" class="<?php echo esc_attr($classes); ?>">
            <?php wp_nonce_field('wpcf7-welcome-panel-nonce', 'welcomepanelnonce', false); ?>
                <div class="welcome-panel-content">
                    <div class="welcome-panel-column-container">

                        <div class="welcome-panel-column">
                            <h3>
                                <span class="dashicons dashicons-shield" aria-hidden="true"></span> 
            <?php echo esc_html(__("Shortcode calendar", 'hotelgest')); ?>
                            </h3>

                            <p>[hg_booking] opcional </p>
                        </div>


                        <div class="welcome-panel-column">
                            <h3>
                                <span class="dashicons dashicons-megaphone" aria-hidden="true"></span> 
            <?php echo esc_html(__("Shortcode reservation", 'hotelgest')); ?>
                            </h3>

                            <p>Basic: <b>[hg_booking]</b><br> basic lang: <b>[hg_booking lang=es ]</b><br> basic lang external: <b>[hg_booking lang=es external= 1 ]</b></p>


                        </div>

                        <div class="welcome-panel-column" id="tableShortcode">
                            <h3>
                                <span class="dashicons dashicons-megaphone" aria-hidden="true"></span> 
            <?php echo esc_html(__("Shortcode reservation room", 'hotelgest')); ?>
                            </h3>
                            <div id="tableShortcode"></div>
                        </div>

                    </div>
                </div>
            </div>
            <script type="text/javascript">
                (function ($) {

                    //autocomplete
                    var availableTags;
                    function autocomplete() {

                        var pcode = $('#pcode').val();
                        $.ajax({
                            url: 'https://api.hotelgest.com/v1/property/' + pcode + '/room/',
                            dataType: "json",
                            type: 'GET',
                            success: function (data) {
                                availableTags = $.map(data, function (item) {
                                    return {
                                        label: item.name + ' (' + item.rcode + ')',
                                        value: item.rcode,
                                        data: JSON.stringify(item)
                                    };
                                });

                                $.each(data, function (i, item) {
                                    $("#tableShortcode").append(item.name + ": <b>[hg_booking rtcode=" + item.rcode + "]</b><br>");
                                    // console.log(item.name + ": <b>[hg_calendar rtcode=" + item.rcode + "]</b><br>");
                                });

                                /*  $("#rtcode").autocomplete({
                                 source: availableTags
                                 });*/

                            }
                        });
                    }

                    $(document).ready(function () {
                        autocomplete();
                    });



                })(jQuery);
            </script>
            <?php
        }

    }

    endif;

return new HG_Admin();
