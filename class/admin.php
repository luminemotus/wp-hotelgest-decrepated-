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
                update_option('hotelgest_v3', $_POST['v3']);
                update_option('hotelgest_occupancy_min', $_POST['occupancy_min']);
                update_option('hotelgest_occupancy_max', $_POST['occupancy_max']);
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
                                <input type="text" value="<?php echo get_option('hotelgest_user', ''); ?>" name="username" placeholder="Usuario"/>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Password</th>   
                            <td>
                                <input type="password" value="<?php echo get_option('hotelgest_password', ''); ?>" name="password" placeholder="Password"/>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Código de propiedad</th>   
                            <td>
                                <input type="text" value="<?php echo get_option('hotelgest_pcode', ''); ?>" name="pcode" placeholder="Código de propiedad"/>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">V3</th>
                            <td>
                                <input type="checkbox" name="v3" id="hg-v3" value="1" <?php echo ( get_option('hotelgest_v3', 0) == 1 ) ? 'checked="checked"' : ''; ?> />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">occupancy min</th>
                            <td>
                                <input type="text" name="occupancy_min" id="hg-v3" value="<?php echo get_option('hotelgest_occupancy_min', ''); ?>" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">occupancy max</th>
                            <td>
                                <input type="text" name="occupancy_max" id="hg-v3" value="<?php echo get_option('hotelgest_occupancy_max', ''); ?>" />
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
                                <?php echo esc_html(__("sortcode cvolendar home", 'hotelgest')); ?>
                            </h3>

                            <p>[hg_booking] opcional </p>
                        </div>


                        <div class="welcome-panel-column">
                            <h3>
                                <span class="dashicons dashicons-megaphone" aria-hidden="true"></span> 
                                <?php echo esc_html(__("Contact Form 7 needs your support.", 'hotelgest')); ?>
                            </h3>

                            <p>Basic: [hg_calendar]<br> basic lang: [hg_calendar lang=es ]<br> basic lang external: [hg_calendar lang=es external= 1 ]</p>


                        </div>

                        <div class="welcome-panel-column">
                            <h3><span class="dashicons dashicons-editor-help" aria-hidden="true"></span> <?php echo esc_html(__("Before you cry over spilt mail&#8230;", 'hotelgest')); ?></h3>

                            <p><?php echo esc_html(__("Contact Form 7 doesn&#8217;t store submitted messages anywhere. Therefore, you may lose important messages forever if your mail server has issues or you make a mistake in mail configuration.", 'hotelgest')); ?></p>

                        </div>


                    </div>
                </div>
            </div>
            <?php
        }

    }

    endif;

 return new HG_Admin();
