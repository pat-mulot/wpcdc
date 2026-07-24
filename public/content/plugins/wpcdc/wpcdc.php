<?php
/**
 * Plugin Name: wpcdc
 * Author: trinity team
 * Description: Découverte des plugins wordpress
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
use wpcdc\Plugin;
use wpcdc\Api;
require __DIR__ . '/vendor-wpcdc/autoload.php';
$wpcdc = new Plugin();
// DOC WP PLUGININ activation "hook" : https://developer.wordpress.org/reference/functions/register_activation_hook/
register_activation_hook(
   __FILE__,
   [$wpcdc, 'activate'],
);
register_deactivation_hook(
   __FILE__,
   [$wpcdc, 'deactivate'],
);
$api = new Api();

// WP-CLI : recalcule le classement (rank) de tous les posts "score",
// utile après une suppression manuelle de score(s) en admin (voir utils.md) :
if ( defined( 'WP_CLI' ) && WP_CLI ) {
    WP_CLI::add_command( 'wpcdc recalc-ranks', function () {
        $scoresRankArgs = array(
            'post_type'      => 'score',
            'posts_per_page' => -1,
            'meta_key'       => 'total_score',
            'orderby'        => 'meta_value',
            'order'          => 'DESC',
        );
        $scoresRank = get_posts( $scoresRankArgs );
        $rankIndex = 1;
        foreach ( $scoresRank as $postRank ) {
            wp_update_post(
                array(
                    'ID'         => $postRank->ID,
                    'meta_input' => array( 'rank' => $rankIndex ),
                )
            );
            $rankIndex++;
        }
        WP_CLI::success( sprintf( '%d scores renumérotés.', count( $scoresRank ) ) );
    } );
}