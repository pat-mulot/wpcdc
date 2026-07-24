<?php
require __DIR__ . '/includes/theme-config.php';
require __DIR__ . '/includes/load-assets.php';

// disable adminbar for all users:
add_action('after_setup_theme', 'remove_admin_bar');
function remove_admin_bar()
{
    if (!current_user_can('administrator') && !is_admin()) {
        show_admin_bar(false);
    }
}
// redirecting after logging :
add_filter('login_redirect', 'admin_default_page');
function admin_default_page()
{
    return home_url();
}

// redirecting after logging fail :
// add_action( 'wp_login_failed', 'login_fail_action' );  // hook failed login
// function login_fail_action() {
//   return home_url() . "/user/registration/#gueritte2";
// }


add_action('wp_login_failed', 'wpcc_front_end_login_fail');

function wpcc_front_end_login_fail($username)
{
    $referrer = $_SERVER['HTTP_REFERER'];
    if (!empty($referrer) && !strstr($referrer, 'wp-login') && !strstr($referrer, 'wp-admin')) {
        $referrer = esc_url(remove_query_arg('login', $referrer));
        wp_redirect($referrer . '?login=failed');
        exit;
    }
}

add_filter('authenticate', 'custom_authenticate_wpcc', 31, 3);

function custom_authenticate_wpcc($user, $username, $password)
{
    if (is_wp_error($user) && isset($_SERVER[ 'HTTP_REFERER' ]) && !strpos($_SERVER[ 'HTTP_REFERER' ], 'wp-admin') && !strpos($_SERVER[ 'HTTP_REFERER' ], 'wp-login.php')) {
        $referrer = $_SERVER[ 'HTTP_REFERER' ] . "#gueritte2";
        foreach ($user->errors as $key => $error) {
            if (in_array($key, array( 'empty_password', 'empty_username'))) {
                unset($user->errors[ $key ]);
                $user->errors[ 'custom_'.$key ] = $error;
            }
        }
    }

    return $user;
}
