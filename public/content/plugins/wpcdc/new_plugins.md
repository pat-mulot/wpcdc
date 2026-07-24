# 1
placer le dossier plugins dans content ou wp-content, au même niveau que themes.

# 2
renomer le dossier nomDeTheme avec le nom du theme

# 3
renommer le fichier "Nomdetheme.php" par le nom du theme et renseigner le namespace de plugin.php

# 4
- renseigner la section autload du composer.json
- renseigner le dossier vendor-nomDeTheme 
- se placer dans le dossier plugins/nomDeTheme avec le terminal et faire :
    ```
        composer update
    ```

# 5
mettre à jour le .gitignore :
    ```
        public/content/plugins/*
        !/public/content/plugins
        !/public/content/plugins/oprofile
    ```

# 6
dans le back wp, cliquer sur plugin puis activer/desactiver




dashicons : 
https://developer.wordpress.org/resource/dashicons/#editor-rtl