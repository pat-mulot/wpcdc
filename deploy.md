# Déploiement

Checklist pour redéployer le projet sur un nouvel environnement (prod, sandbox...).
Pour le détail de chaque étape (créer une base, configurer `wp-config.php`...), voir [`install.md`](./install.md), c'est la même logique.

## 1. Fichiers
- Transférer le repo (git clone / rsync) sur le serveur cible.
- `composer install` (dans `public/`) pour récupérer `wp/` et les plugins/thèmes tiers.
- `npm install` dans `public/content/themes/wpcdc/tchat4/` si le chat est utilisé.

## 2. Base de données
- Exporter la base source : `wp db export dump.sql`
- Créer la base + l'utilisateur sur le serveur cible (voir `install.md`).
- Importer : `mysql -u user -p dbname < dump.sql`

## 3. Config
- `wp-config.php` : DB_NAME/DB_USER/DB_PASSWORD/DB_HOST + `WP_HOME` avec l'URL réelle de destination.
- `.htaccess` : adapter le `RewriteBase` au chemin réel sur le serveur cible.

## 4. Recaler les URLs
La base importée contient encore les URLs de l'environnement source. Depuis `public/` :
```bash
wp search-replace 'ancienne-url' 'nouvelle-url' --all-tables
```

## 5. Vérifier
Ouvrir le site, tester une connexion, une partie.

*Le chat (`tchat4/`) est un process Node à part (`node server.js`), pas géré par WordPress, à démarrer/arrêter séparément si besoin. Désactivé/non maintenu de toute façon (voir README).*
