<?php
add_action(
    'after_setup_theme',
    'wpcdc_initializeTheme'
);
function wpcdc_initializeTheme(){
    add_theme_support('title-tag');
    // add_post_type_support( 'wpcdc', 'thumbnail' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'menus' );
    register_nav_menus([
        "slug-du-menu" => "Nom Du Menu",
    ]);
}
// add_filter("nav_menu_css_class", "wpcdc_add_menu_nav_class", 10, 4);
// function wpcdc_add_menu_nav_class($classes, $item, $args, $depth) {
//     // $classes[] = "nom_de_class_du_nav";
//     // si je veux supprimer les classes wordpress de base je dois changer le nom $classes:
//     $newClasses[] = "nom_de_class_du_nav";
//     // $item = "";
//     // $args = "";
//     // $depth = "";
//     return $newClasses;
// };
// add_filter("nav_menu_link_attributes", "nomDeTheme_add_menu_link_class", 10, 3);
// function nomDeTheme_add_menu_link_class($atts, $item, $args) {
//     $atts["class"] = "nom_de_class_link";
//     return $atts;
//     // return $classes;
// };