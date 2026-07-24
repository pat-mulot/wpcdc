## 1 Créer une class "Router.php"
dans le dossier des class au même niveau que "Plugin.php", placer le fichier "Router.php"

## 2 renomer le nom du plugin
dans les fichiers custom-routes, router, renommer les namespaces et autre du plugin custom attendu par celui utilisé dans le projet

## 3 activer le router dans le backoffice WP

### Retourner dans "Plugin.php"
dans la class plugin.php créer la propriété :

```php
/**
 * @var Router
 */
protected $router;
```

dans le constructeur de plugin.php instancier la class Router :
```php
class Plugin
{
    public function __construct()
    {
        $this->router = new Router();
        echo "router loaded";
    }
}
```

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

## 8 vérifier que la route custom a bien été détectée

## 9 Mise en place du MVC avec "Altorouteur"
Ouvrir un terminal dans le dossier du "pluginCustom" et installer altorouter :

```
composer require altorouter/altorouter
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

## 13 Création des Controllers
Placer le dossier "Controllers" dans le dossier "class",
renommer les namespaces des fichiers "PageController.php" et "CoreController.php"par le bon nom de controller et y renommer les 

## 14 Création du CoreController
De la même manière que pour le controller précédent, créer le fichier "CoreController.php" et y créer une méthode "show" :

## 15 Créer le dossier "views"
Dans le dossier du theme custom, au même niveau que index.php et les partials, placer le dossier "views" et y placer les vues comme "test.php" avec un message a afficher :

```html
<h1>VIEW TEST LOADED</h1>
```