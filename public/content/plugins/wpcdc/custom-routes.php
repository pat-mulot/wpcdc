<?php

// use wpcdc\Controllers\RulesController;
use wpcdc\Controllers\UserController;
use wpcdc\Controllers\GameController;
use wpcdc\Controllers\StatController;

global $router;

$router = new AltoRouter();
$baseURI = str_replace(
    '/index.php',
    '',
    $_SERVER['SCRIPT_NAME']
);
$router->setBasePath($baseURI);

$router->map(
    // méthode de la route
    'GET',
    '/user/registration/', //! "attention à ne pas oublier le dernier /"
    function(){
        $controller = new UserController();
        $controller->registration();
    },
);
$router->map(
    // méthode de la route
    'POST',
    '/user/add/', //! "attention à ne pas oublier le dernier /"
    function(){
        $controller = new UserController();
        $controller->add();
    },
);
$router->map(
    // méthode de la route
    'GET',
    '/user/login/', //! "attention à ne pas oublier le dernier /"
    function(){
        $controller = new UserController();
        $controller->login();
    },
);
$router->map(
    // méthode de la route
    'GET',
    // '/user/profile/[i:id]/', //! "attention à ne pas oublier le dernier /"
    '/user/profile/', //! "attention à ne pas oublier le dernier /"
    function(){
        $controller = new UserController();
        $controller->profile();
    },
);
// $router->map(
//     // méthode de la route
//     'POST',
//     // '/user/profile/[i:id]/', //! "attention à ne pas oublier le dernier /"
//     '/user/save-img/', //! "attention à ne pas oublier le dernier /"
//     function(){
//         $controller = new UserController();
//         $controller->saveImage();
//     },
// );
$router->map(
    // méthode de la route
    'POST',
    // '/user/profile/[i:id]/', //! "attention à ne pas oublier le dernier /"
    '/user/save-img/', //! "attention à ne pas oublier le dernier /"
    function(){
        $controller = new UserController();
        $controller->saveImage();
    },
);
$router->map(
    // méthode de la route
    'GET',
    // nom (url) de la route ( exemple : "exempleNouvelleRoute")
    '/game/', //! "attention à ne pas oublier le dernier /"
    // fonction appelée à la validation de la route :
    function(){
        $controller = new GameController();
        $controller->view();
    },
);
$router->map(
    // méthode de la route
    'POST',
    // nom (url) de la route ( exemple : "exempleNouvelleRoute")
    '/game/add-score', //! "attention à ne pas oublier le dernier /"
    // fonction appelée à la validation de la route :
    function(){
        $controller = new GameController();
        $controller->addScore();
    },
);
$router->map(
    // méthode de la route
    'GET',
    // nom (url) de la route ( exemple : "exempleNouvelleRoute")
    '/statistics/[i:id]/', //! "attention à ne pas oublier le dernier /"
    // fonction appelée à la validation de la route :
    function(){
        $controller = new StatController();
        $controller->view();
    },
);
$router->map(
    // méthode de la route
    'GET',
    // nom (url) de la route ( exemple : "exempleNouvelleRoute")
    '/statistics/', //! "attention à ne pas oublier le dernier /"
    // fonction appelée à la validation de la route :
    function(){
        $controller = new StatController();
        $controller->view();
    },
);
$match = $router->match();
// si la route "match" :
if ($match) {
    // récupération de la fonction à exectuer :
    $functionToCall = $match["target"];
    // execution de la fonction :
    $functionToCall();
}
