<?php
$pagesTypeArgs = array(
    'taxonomy' => 'page-tag',
    'parent' => '0',
    'hide_empty' => false,
);
$pagesType = get_terms($pagesTypeArgs);
$mainMenu = wp_get_nav_menu_items("main-home-menu");
if (is_user_logged_in()) {
    $user = wp_get_current_user()->data;
    $profileArgs = array(
        'post_type' => 'player-profile',
        'posts_per_page' => -1,
        'author' => $user->ID,
    );
    $profile = get_posts($profileArgs)[0];
}