## 1 Créer une class "Router.php"
dans le dossier des class au même niveau que "Plugin.php", créer le fichier "Router.php"

## 2 y placer le code de base d'un modèle de class

```php
namespace mydevlib;

class Router
{
    public function __construct()
    {
        echo "router loaded";
    }
}
```

## 3 activer le router

### Retourner dans "P"lugin.php"
dans la class plugin.php créer la propriété :

```php
/**
 * @var Router
 */
protected $router;
```

dans le constructeur de plugin.php instancier la class Router :
```php
class Router
{
    public function __construct()
    {
        $this->router = new Router();
        echo "router loaded";
    }
}
```

### créer les hook pour le router
retourner dans la class "Router.php"

```php
add_action(
    'init',
    [$this, 'createMESCUSTOMRoutes']
);
```

## 4 Créer la methodd déclarée par le hook

```php
public function createMESCUSTOMRoutes()
{
    echo "method CUSTOM route loaded";
}
```

aller vérifier dans le navigateur.

## 5 Déclarer une nouvelle route

```php
add_rewrite_rule(
    // déclarer un nom de route (exemple "register/")
    'maNouvelleRoute/?.*',
    // définir une URL vituelle comprise par wordpress (exemple "index.php?cEstNousQuOnVaGererNousMemeLaRoute)
    // avec pour variable "$_GET" arbitraire "cEstNousQuOnVaGererNousMemeLaRoute"
    // définir une route par laquelle wordpress sera détourné lorsqu'il lira la chaine de caractère "maNouvelleRoute/"
    'index.php?cEstNousQuOnVaGererNousMemeLaRoute=true',
    // "position" la règle en haut des priorité
    'top'
);
```

## 6 vider le cache des règles de routing WordPress
utiliser la méthode "flush_rewrite_rules()" :
    /!\ faire un flush_rewrite_rules des routes est mauvais pour les performances /!\

Créer un hook "add_filter()" :

```php
flush_rewrite_rules();
add_filter('query_vars', function($query_vars)
    {
        // ajouter le nom de la variable à surveiller dans le tableau des variables à surveiller
        $query_vars[] = 'cEstNousQuOnVaGererNousMemeLaRoute';
        return $query_vars;
    }
);
```

## 7 Créer le fichier "custom-routes"
Dans le repertoire des plugins, créer un fichier "custom-routes.php" (équivalent au point d'entrée classique)

```php
echo echo "custom routes loaded";
```

## 8 vérifier que la route custom a bien été détectée
retourner dans "Router.php" et créer un hook "add_filter()" :

```php
add_filter('template_include', function($template){
    echo $template;
    // var_dump($template);
    die();
    // récupérer la variable "cEstNousQuOnVaGererNousMemeLaRoute" :
    $cEstNousQuOnVaGererNousMemeLaRoute = get_query_var('cEstNousQuOnVaGererNousMemeLaRoute');

    if($cEstNousQuOnVaGererNousMemeLaRoute){
            return __DIR__ . '/../custom-routes.php';        
        }
        return $template;
    });
```

## 9 Mise en place du MVC avec "Altorouteur"
Ouvrir un terminal dans le dossier du "pluginCustom" et installer altorouter :

```
composer require altorouter/altorouter
```

## 10 instrurie le point d'entrée "custom-routes.php"
Dans le fichier "custom-routes.php" instancier Altorouter :

```php
$router = new AltoRouter();
```

Reconstruire un "baseURI"
```php
// depuis "SCRIPT_NAME", remplacer la chaine de caractère "index.php" de "$_SERVER" par rien : ""
// afin d'obtenir une nouvelle baseURI clean
$baseURI = str_replace(
    '/index.php',
    '',
    $_SERVER['SCRIPT_NAME']
);
// définir l'URL de base du router avec la nouvelle baseURI :
$router->setBasePath($baseURI);
```

## 11 Définition des routes
Créer une route grâce au router :

```php
$router->map(
    // méthode de la route
    'GET',
    // nom (url) de la route ( exemple : "exempleNouvelleRoute")
    '/maNouvelleRoute/test/', //! "attention à ne pas oublier le dernier /"
    // fonction appelée à la validation de la route :
    function(){
        echo "exempleNouvelleRoute loaded";
        die();
        $controller = new PageController();
        $controller->test();
    },
);
```

## 12 Définir l'execution d'une methode

```php
$match = $router->match();
// si la route "match" :
if ($match) {
    // récupération de la fonction à exectuer :
    $functionToCall = $match["target"];
    // execution de la fonction :
    $functionToCall();
}
```

## 13 Création des Controllers
Créer un dossier "Controllers" dans le dossier "class",
Y créer un controller (exemple "PageController.php"),
Instruire la class correspondant a ce nouveau controller :

```php
namespace NOMDEPLUGIN\Controllers;
class PageController extends CoreController
{
    public function test()
    {
        echo "method TEST du PageController chargée";
        die();
        $this->show(
            'views/maNouvelleRoute/test', 
            [
                // 'dataName' => $dataName,
                // 'dataName' => $dataName,
                // 'dataName' => $dataName,
            ]
        );
    }
}
```

## 14 Création du CoreController
De la même manière que pour le controller précédent, créer le fichier "CoreController.php" et y créer une méthode "show" :

```php
namespace NOMDEPLUGIN\Controllers;

class CoreController
{
    public function show($viewName, $viewVars)
    {
        echo "method SHOW du PageController chargée";
        die();
    }
}
```

## 15 Créer le dossier "views"
Dans le dossier du theme custom, au même niveau que index.php et les partials, créer un dossier "views" et y placer les vues comme "test.php" avec un message a afficher :

```html
<h1>VIEW TEST LOADED</h1>
```