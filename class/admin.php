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

if (!class_exists('HG_APF_AddFields')) :

    include( HG_PLUGIN_DIR . 'utility/apf/library/apf/admin-page-framework.php' );

// Extend the class
    class HG_Admin extends AdminPageFramework {

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
            global $_wp_last_object_menu;
            $icon = version_compare($GLOBALS['wp_version'], '3.8', '>=') ? 'dashicons-media-code' : null; // dash-icons are supported since WordPress v3.8,    

            $this->setRootMenuPage(
                    "<span id='hotelgest-menu'>"
                    . __('Hotelgest', 'hotelgest')
                    . "</span>", $icon, 10
            );

            $this->addSubMenuItems(
                    array(
                        'title' => __('Ajustes', 'hotelgest'),
                        'page_slug' => 'hotelgest',
                    )
            );
            // Add in-page tabs
            $this->addInPageTabs(
                    'hotelgest', // target page slug
                    array(
                'title' => 'Setting', // tab title
                'tab_slug' => 'setting', // tab slug
                    ), array(
                'title' => 'Style', // tab title
                'tab_slug' => 'style', // tab slug
                    ), array(
                'title' => 'Advanced', // tab title
                'tab_slug' => 'advanced', // tab slug
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
        public function load_hotelgest_setting($oAdminPage) {
            //$this->hostelgest_welcome_panel(); 

            $this->addSettingFields(
                    array(// Usuario
                'field_id' => 'hotelgest_user',
                'type' => 'text',
                'title' => __('User', 'hotelgest'),
                'default' => 'demoaccount',
                    ), array(// Password
                'field_id' => 'hotelgest_password',
                'type' => 'text',
                'title' => __('Password', 'hotelgest'),
                'description' => 'Password',
                'default' => '123456789',
                    ), array(// pcode
                'field_id' => 'pcode',
                'type' => 'text',
                'title' => __('Pcode', 'hotelgest'),
                'description' => __('Código de propiedad', 'hotelgest'),
                'default' => '114',
                    ), array(// occupancy_min
                'field_id' => 'occupancy_min',
                'type' => 'text',
                'title' => __('Occupancy min', 'hotelgest'),
                'description' => __('Occupancy min', 'hotelgest'),
                'default' => '1',
                    ), array(// occupancy_max
                'field_id' => 'occupancy_max',
                'type' => 'text',
                'title' => __('Occupancy max', 'hotelgest'),
                'description' => __('Occupancy max', 'hotelgest'),
                'default' => '3',
                    ), array(// first
                'field_id' => 'topPack',
                'type' => 'checkbox',
                'title' => __('show first room rate ', 'hotelgest'),
                'label' => __('', 'hotelgest'),
                'default' => false,
                    ), array(// fbAnalytics
                'field_id' => 'hg-fbAnalytics',
                'type' => 'text',
                'title' => __('fbAnalytics', 'hotelgest')
                    ), array(// Analytics
                'field_id' => 'hg-analytics',
                'type' => 'text',
                'title' => __('Analytics', 'hotelgest')
                    ), array(// Submit button
                'field_id' => 'submit_button',
                'type' => 'submit',
                    )
            );
        }

        public function load_hotelgest_style($oAdminPage) {

            $this->addSettingFields(
                    array(// Usuario
                'field_id' => 'section_primary_color',
                'type' => 'color',
                'title' => __('Primary color', 'hotelgest'),
                    ), array(
                'field_id' => 'section_secondary_color',
                'title' => __('Secondary color', 'admin-page-framework-loader'),
                'type' => 'color',
                    ), array(
                'field_id' => 'hotelgest_hide_slide',
                'type' => 'checkbox',
                'title' => __('hide slideshow', 'hotelgest'),
                'label' => __('', 'hotelgest'),
                'default' => false,
                    ), array(
                'field_id' => 'hotelgest_hide_preText',
                'type' => 'checkbox',
                'title' => __('hide pre text', 'hotelgest'),
                'label' => __('', 'hotelgest'),
                'default' => false,
                    ), array(// Submit button
                'field_id' => 'submit_button',
                'type' => 'submit',
                    )
            );
        }

        public function load_hotelgest_advanced($oAdminPage) {

            $this->addSettingFields(
                    array(
                'field_id' => 'noconflict_js',
                'type' => 'checkbox',
                'title' => __('No conflict jquery', 'hotelgest'),
                'label' => __('', 'hotelgest'),
                'default' => false,
                    ), array(
                'field_id' => 'hotelgest_tpv_debug',
                'type' => 'checkbox',
                'title' => __('Debug tpv log', 'hotelgest'),
                'label' => __('', 'hotelgest'),
                'default' => false,
                    ), array(// Submit button
                'field_id' => 'submit_button',
                'type' => 'submit',
                    )
            );
        }

        /**
         * One of the pre-defined methods which is triggered when the page contents is going to be rendered.
         * @callback        action      do_{page slug}
         */
        public function _____() {

            // Show the saved option value.
            // The extended class name is used as the option key. This can be changed by passing a custom string to the constructor.
            echo '<h3>Saved Fields</h3>';
            echo '<pre>my_text_field: ' . AdminPageFramework::getOption('APF_AddFields', 'my_text_field', 'default text value') . '</pre>';
            echo '<pre>my_textarea_field: ' . AdminPageFramework::getOption('APF_AddFields', 'my_textarea_field', 'default text value') . '</pre>';

            echo '<h3>Show all the options as an array</h3>';
            echo $this->oDebug->get(AdminPageFramework::getOption('APF_AddFields'));
        }

        function do_hotelgest() {
            if (AdminPageFramework::getOption('HG_Admin')) {
                update_option('hotelgest_user', AdminPageFramework::getOption('HG_Admin', 'hotelgest_user'));
                update_option('hotelgest_password', AdminPageFramework::getOption('HG_Admin', 'hotelgest_password'));
                update_option('hotelgest_pcode', AdminPageFramework::getOption('HG_Admin', 'pcode'));
                update_option('hotelgest_occupancy_min', AdminPageFramework::getOption('HG_Admin', 'occupancy_min'));
                update_option('hotelgest_occupancy_max', AdminPageFramework::getOption('HG_Admin', 'occupancy_max'));
                update_option('hotelgest_hg_analytics', AdminPageFramework::getOption('HG_Admin', 'hg_analytics'));
                update_option('hotelgest_fb_analytics', AdminPageFramework::getOption('HG_Admin', 'hg_fbAnalytics'));
                update_option('hotelgest_topPack', AdminPageFramework::getOption('HG_Admin', 'topPack'));

                update_option('hotelgest_primary_color', AdminPageFramework::getOption('HG_Admin', 'section_primary_color'));
                update_option('hotelgest_secondary_color', AdminPageFramework::getOption('HG_Admin', 'section_secondary_color'));

                AdminPageFramework::getOption('HG_Admin', 'noconflict_js');
                if (AdminPageFramework::getOption('HG_Admin', 'noconflict_js') == 1) {
                    update_option('hotelgest_noconflict_js', 1);
                } else {
                    update_option('hotelgest_noconflict_js', 0);
                }
                 if (AdminPageFramework::getOption('HG_Admin', 'hotelgest_tpv_debug') == 1) {
                    update_option('hotelgest_tpv_debug', 1);
                } else {
                    update_option('hotelgest_tpv_debug', 0);
                }
            }

            // }   
            // function content() {   
            $classes = 'welcome-panel';
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
                            <p>[hg_calendar] opcional </p>
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

                        var pcode = $('#pcode__0').val();
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



                            }
                        });
                    }

                    $(document).ready(function () {
                        autocomplete();

                        $('.admin-page-framework-in-page-tab a').each(function ( ) {
                            var href = $(this).prop('href').replace('&post_type=post', '');
                            $(this).prop('href', href);
                        });

                    });


                })(jQuery);
            </script>
            <?php
        }

    }

    endif;

// Instantiate the class object.
new HG_Admin;

