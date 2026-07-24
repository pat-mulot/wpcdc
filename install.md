# Installation en local
Ce projet est un WordPress fait maison : le ceur WordPress et les dépendances sont gérés par Composer et ne sont pas versionnés, seuls le thème et les plugins maison le sont.

## Prérequis
- PHP 7.4+ (testé avec PHP 8.3)
- MySQL ou MariaDB
- Apache + `mod_rewrite` (ou nginx avec un rewrite équivalent)
- [Composer](https://getcomposer.org/)
- [WP-CLI](https://wp-cli.org/) (recommandé, simplifie plusieurs étapes ci-dessous)

## 1. Installer les dépendances PHP
Depuis le dossier `public/` :
```bash
composer install
```

Ça télécharge WordPress et les plugins/thèmes listés dans
`composer.json` (via [WPackagist](https://wpackagist.org)) dans `wp/` et
`content/plugins/` / `content/themes/`.

## 2. Créer la DB
Créer une base et un utilisateur MySQL avec tous les droits 
```sql
CREATE DATABASE wpcdc CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'wpcdc'@'localhost' IDENTIFIED BY 'un_mot_de_passe';
GRANT ALL PRIVILEGES ON wpcdc.* TO 'wpcdc'@'localhost';
FLUSH PRIVILEGES;
```

Puis importer le dump fourni (contenu, thème, réglages... ) :
```bash
mysql -u wpcdc -p wpcdc < public/docs/wpcdc.sql
```

## 3. Configurer `wp-config.php`
Créer `public/wp-config.php` à partir de `public/wp/wp-config-sample.php`, et
renseigner :

```php
define( 'DB_NAME', 'wpcdc' );
define( 'DB_USER', 'wpcdc' );
define( 'DB_PASSWORD', 'un_mot_de_passe' );
define( 'DB_HOST', 'localhost' );
define('WP_HOME', rtrim('http://<ton-url-locale>', '/'));
define('WP_SITEURL', WP_HOME . '/wp');
define('WP_CONTENT_URL', WP_HOME . '/content');
define('WP_CONTENT_DIR', __DIR__ . '/content');
define('FS_METHOD', 'direct');
require_once ABSPATH . 'wp-settings.php';
```
Générer les clés/salts (section `AUTH_KEY` etc.) via le
[générateur officiel](https://api.wordpress.org/secret-key/1.1/salt/).

`<url-locale>` doit correspondre à l'URL réelle du projet vu par le
navigateur ex. `http://localhost/mes...repertoire.../wpcdc/public`

## 4. Adapter le `.htaccess`
Le `RewriteBase` du `.htaccess` à la racine de `public/` doit correspondre au même chemin que `WP_HOME` (sans le domaine) :
```apacheconf
RewriteBase /wpcdc/public/
...
RewriteRule . /wpcdc/public/index.php [L]
```

## 5. Recaler les URLs stockées en base
WordPress stocke des URLs absolues en dur dans la base. Le dump fourni contient les URLs de l'installation d'origine : si l'URL locale est différente, les remplacer avec WP-CLI (depuis `public/`) :
```bash
wp search-replace 'ancienne-url-du-dump' 'http://<ton-url-locale>' --all-tables
```

*(L'ancienne URL exacte se retrouve avec `wp option get home` juste après l'import, avant remplacement.)*

## 6. Vérifier
Ouvrir `http://<url-locale>/` dans un navigateur : la page d'accueil du site doit s'afficher avec son contenu d'origine.

## Notes
- Les identifiants du compte administrateur WordPress sont dans la base   importée (table `wp_users`)
- `wp db check` / `wp core version` permettent de vérifier que `wp-config.php` pointe bien vers la bonne base.
