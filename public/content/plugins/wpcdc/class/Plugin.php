<?php

namespace wpcdc;

class Plugin
{
    /**
     * @var Router
     */
    protected $router;
    public function __construct()
    {
        $this->router = new Router();
        $registration = new Registration();
        add_action(
            'init',
            [$this, 'createHomeCustomPostType']
        );
        // add_action(
        //     'init',
        //     [$this, 'create[nom-du-plugin]Custom[nom-de-tableWP]']
        // );
        add_action(
            'init',
            [$this, 'createPageTagCustomTaxonomy']
        );
        add_action(
            'init',
            [$this, 'createRulesCustomPostType']
        );
        add_action(
            'init',
            [$this, 'createDicesCustomTaxonomy']
        );
        add_action(
            'init',
            [$this, 'createScoreCustomPostType']
        );
        add_action(
            'init',
            [$this, 'createStatisticCustomPostType']
        );
        add_action(
            'init',
            [$this, 'createPlayerProfileCustomPostType']
        );
        add_action(
            'init',
            [$this, 'createLatesteNewsCustomPostType']
        );
    }
    public function activate()
    {
        $this->registerPlayerRole();
    }
    public function deactivate()
    {
    }

    public function registerPlayerRole()
    {
        add_role(
            //identifiant :
            "player",
            // libellé :
            "player",
            // liste des autorisations (capabilities) :
            [
                // aller dans User Role Editor, Selectionner un rôle pour exemple, selectionner toutes les capabilities qui nous intéressent :
                //  -----------------------------
                // /!\ pour un cpt ça doit être par exemple "delete_NOMDECPT" /!\
                //  -----------------------------
                // "delete_monCPT" => false,
                // "edit_monCPT" => true,
                // "edit_others_monCPT" => false, // (concerne les CPT mis en ligne par d'autres utilisateurs)
                // "publissh_monCPT" => true,
                // "read_private_monCPT" => false,
                //  -----------------------------
            ]
        );
        add_role(
            "ia",
            "IA",
        );
    }


    public function createHomeCustomPostType()
    {
        register_post_type(
            'home-post', //!
            // second argument les options pour configurer le post type
            [
                'labels' => [
                    'name' => 'Posts for home page',
                    'singular_name' => 'Post for home',
                ],
                // option public true : le cpt est administrable dans le backoffice
                'public' => true,
                'show_in_rest' => true, //! (http://...apres "public")/wp-json/wp/v2/receipe
                'hierarchical' => false,
                'menu_icon' => 'dashicons-text-page', //!
                // NOTICE WP PLUGIN, fonctionnalités activable poure un cpt :  ‘title’, ‘editor’, ‘comments’, ‘revisions’, ‘trackbacks’, ‘author’, ‘excerpt’, ‘page-attributes’, ‘thumbnail’, ‘custom-fields’, and ‘post-formats’.
                'supports' => [
                    'title',
                    'thumbnail', //! add_theme_support( 'post-thumbnails' ); dans themes/includes/theme-config.php
                    'editor',
                    // 'comments', 
                    // 'revisions', //!
                    // 'trackbacks', 
                    // 'author', 
                    // 'excerpt',
                    // 'page-attributes',
                    // 'custom-fields',
                    // 'post-formats' //!
                ],
            ]
        );
    }
    public function createPageTagCustomTaxonomy()
    {
        register_taxonomy(
            'page-tag',
            ['post'],
            [
                'label' => 'page tag',
                'hierarchical' => false,
                'public' => true
            ]
        );
    }

    public function createRulesCustomPostType()
    {
        register_post_type(
            'rules-post', //!
            // second argument les options pour configurer le post type
            [
                'labels' => [
                    'name' => 'Rules',
                    'singular_name' => 'Rule',
                ],
                // option public true : le cpt est administrable dans le backoffice
                'public' => true,
                'show_in_rest' => true, //! (http://...apres "public")/wp-json/wp/v2/receipe
                'hierarchical' => false,
                'menu_icon' => 'dashicons-media-interactive', //!
                // NOTICE WP PLUGIN, fonctionnalités activable poure un cpt :  ‘title’, ‘editor’, ‘comments’, ‘revisions’, ‘trackbacks’, ‘author’, ‘excerpt’, ‘page-attributes’, ‘thumbnail’, ‘custom-fields’, and ‘post-formats’.
                'supports' => [
                    'title',
                    'thumbnail', //! add_theme_support( 'post-thumbnails' ); dans themes/includes/theme-config.php
                    'editor',
                    // 'comments', 
                    // 'revisions', //!
                    // 'trackbacks', 
                    'author',
                    // AJOUT DE L'AUTEUR POUR RECUP L'ID 
                    // DU SCORE POSTé ET LE COMPARER A L'ID 
                    // DU STAT/POST POUR METTRE A JOUR LE 
                    // CHAMP RANK OU RECUP LA VALUE DU CHAMP 
                    // RANK DU POST/SCORE
                    // 'excerpt',
                    // 'page-attributes',
                    // 'custom-fields',
                    // 'post-formats' //!
                ],
            ]
        );
    }
    public function createDicesCustomTaxonomy()
    {
        register_taxonomy(
            'rules-dices',
            ['rules-post'],
            [
                'label' => 'rules dices',
                'hierarchical' => true,
                'public' => true
            ]
        );
    }
    public function createScoreCustomPostType()
    {
        register_post_type(
            'score', //!
            // second argument les options pour configurer le post type
            [
                'labels' => [
                    'name' => 'Scores',
                    'singular_name' => 'Score',
                ],
                // option public true : le cpt est administrable dans le backoffice
                'public' => true,
                'show_in_rest' => true, //! (http://...apres "public")/wp-json/wp/v2/receipe
                'hierarchical' => false,
                'menu_icon' => 'dashicons-text-page', //!
                // NOTICE WP PLUGIN, fonctionnalités activable poure un cpt :  ‘title’, ‘editor’, ‘comments’, ‘revisions’, ‘trackbacks’, ‘author’, ‘excerpt’, ‘page-attributes’, ‘thumbnail’, ‘custom-fields’, and ‘post-formats’.
                'supports' => [
                    'title',
                    // 'thumbnail', //! add_theme_support( 'post-thumbnails' ); dans themes/includes/theme-config.php
                    // 'editor',
                    // 'comments', 
                    // 'revisions', //!
                    // 'trackbacks', 
                    // 'author', 
                    // 'excerpt',
                    // 'page-attributes',
                    // 'custom-fields',
                    // 'post-formats' //!
                ],
            ]
        );
    }
    public function createStatisticCustomPostType()
    {
        register_post_type(
            'statistics', //!
            // second argument les options pour configurer le post type
            [
                'labels' => [
                    'name' => 'Statistiques',
                    'singular_name' => 'Statistique',
                ],
                // option public true : le cpt est administrable dans le backoffice
                'public' => true,
                'show_in_rest' => true, //! (http://...apres "public")/wp-json/wp/v2/receipe
                'hierarchical' => false,
                'menu_icon' => 'dashicons-analytics', //!
                // NOTICE WP PLUGIN, fonctionnalités activable poure un cpt :  ‘title’, ‘editor’, ‘comments’, ‘revisions’, ‘trackbacks’, ‘author’, ‘excerpt’, ‘page-attributes’, ‘thumbnail’, ‘custom-fields’, and ‘post-formats’.
                'supports' => [
                    'title',
                    // 'thumbnail', //! add_theme_support( 'post-thumbnails' ); dans themes/includes/theme-config.php
                    // 'editor',
                    // 'comments', 
                    // 'revisions', //!
                    // 'trackbacks', 
                    'author',
                    // 'excerpt',
                    // 'page-attributes',
                    // 'custom-fields',
                    // 'post-formats' //!
                ],
            ]
        );
    }
    public function createPlayerProfileCustomPostType()
    {
        register_post_type(
            'player-profile', //!
            // second argument les options pour configurer le post type
            [
                'labels' => [
                    'name' => 'Profils Joueurs',
                    'singular_name' => 'Profil Joueur',
                ],
                // "capability_type" => "player",
                // option public true : le cpt est administrable dans le backoffice
                'public' => true,
                'show_in_rest' => true, //! (http://...apres "public")/wp-json/wp/v2/receipe
                'hierarchical' => false,
                'menu_icon' => 'dashicons-hammer', //!
                // NOTICE WP PLUGIN, fonctionnalités activable poure un cpt :  ‘title’, ‘editor’, ‘comments’, ‘revisions’, ‘trackbacks’, ‘author’, ‘excerpt’, ‘page-attributes’, ‘thumbnail’, ‘custom-fields’, and ‘post-formats’.
                'supports' => [
                    'title',
                    'thumbnail', //! add_theme_support( 'post-thumbnails' ); dans themes/includes/theme-config.php
                    // 'editor',
                    // 'comments', 
                    // 'revisions', //!
                    // 'trackbacks', 
                    'author',
                    // 'excerpt',
                    // 'page-attributes',
                    // 'custom-fields',
                    // 'post-formats' //!
                ],
            ]
        );
    }
    public function createLatesteNewsCustomPostType()
    {
        register_post_type(
            'latest-news', //!
            // second argument les options pour configurer le post type
            [
                'labels' => [
                    'name' => 'Nouveautés',
                    'singular_name' => 'Nouveauté',
                ],
                // "capability_type" => "player",
                // option public true : le cpt est administrable dans le backoffice
                'public' => true,
                'show_in_rest' => true, //! (http://...apres "public")/wp-json/wp/v2/receipe
                'hierarchical' => false,
                'menu_icon' => 'dashicons-insert-after', //!
                // NOTICE WP PLUGIN, fonctionnalités activable poure un cpt :  ‘title’, ‘editor’, ‘comments’, ‘revisions’, ‘trackbacks’, ‘author’, ‘excerpt’, ‘page-attributes’, ‘thumbnail’, ‘custom-fields’, and ‘post-formats’.
                'supports' => [
                    'title',
                    'thumbnail', //! add_theme_support( 'post-thumbnails' ); dans themes/includes/theme-config.php
                    'editor',
                    // 'comments', 
                    // 'revisions', //!
                    // 'trackbacks', 
                    // 'author',
                    // 'excerpt',
                    // 'page-attributes',
                    // 'custom-fields',
                    // 'post-formats' //!
                ],
            ]
        );
    }
}
