<?php

namespace wpcdc;

class Router
{
    public function __construct()
    {
        add_action(
            'init',
            [$this, 'registerRoutes']
        );
    }
    public function registerRoutes()
    {
        add_rewrite_rule(
            'user/?.*',
            'index.php?cEstNousQuOnVaGererNousMemeLaRoute=true',
            'top'
        );
        add_rewrite_rule(
            // déclarer un nom de route (exemple "register/")
            'game/?.*',
            // définir une URL vituelle comprise par wordpress (exemple "index.php?cEstNousQuOnVaGererNousMemeLaRoute)
            // avec pour variable "$_GET" arbitraire "cEstNousQuOnVaGererNousMemeLaRoute"
            // définir une route par laquelle wordpress sera détourné lorsqu'il lira la chaine de caractère "maNouvelleRoute/"
            'index.php?cEstNousQuOnVaGererNousMemeLaRoute=true',
            // "position" la règle en haut des priorité
            'top'
        );
        add_rewrite_rule(
            // déclarer un nom de route (exemple "register/")
            'statistics/?.*',
            // définir une URL vituelle comprise par wordpress (exemple "index.php?cEstNousQuOnVaGererNousMemeLaRoute)
            // avec pour variable "$_GET" arbitraire "cEstNousQuOnVaGererNousMemeLaRoute"
            // définir une route par laquelle wordpress sera détourné lorsqu'il lira la chaine de caractère "maNouvelleRoute/"
            'index.php?cEstNousQuOnVaGererNousMemeLaRoute=true',
            // "position" la règle en haut des priorité
            'top'
        );
        flush_rewrite_rules();
        add_filter(
            'query_vars',
            function ($query_vars) {
                // ajouter le nom de la variable à surveiller dans le tableau des variables à surveiller
                $query_vars[] = 'cEstNousQuOnVaGererNousMemeLaRoute';
                return $query_vars;
            }
        );
        add_filter('template_include', function($template){
            // echo $template;
            // die();
            // récupérer la variable "cEstNousQuOnVaGererNousMemeLaRoute" :
            $cEstNousQuOnVaGererNousMemeLaRoute = get_query_var('cEstNousQuOnVaGererNousMemeLaRoute');
        
            if($cEstNousQuOnVaGererNousMemeLaRoute){
                    return __DIR__ . '/../custom-routes.php';        
                }
                return $template;
            });
    }
}
