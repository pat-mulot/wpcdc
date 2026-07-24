# 1 Activation de l'option menu
Dans le fichier "functions.php" du thême, utiliser le hook support pour ajouter l'option au theme :

Créer le hook "add action" d'initialisation du theme puis créerla fonction "nomDeTheme_theme_setup()" et y ajouter le hook "add theme support" :

```php
add_action("after_setup_theme","nomDeTheme_theme_setup");
function nomDeTheme_theme_setup() {
    // echo "theme setup loaded";
    // die();
    add_theme_support("menus");
}
```

## 2 ajout des menus 
Dans la fonction "nomDeTheme_theme_setup" à la suite du hook "add theme support" des menus, ajouter le hook de création de menu :

```php
register_nav_menus([
    "slug-du-menu" => "Nom Du Menu",
])
```