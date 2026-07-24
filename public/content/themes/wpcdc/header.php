<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php bloginfo('title'); ?></title>
    <link href="https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.3/css/all.css" integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk" crossorigin="anonymous">
</head>

<body>
    <?php
    wp_head();
    include __DIR__ . '/includes/datas/data-header.php';
    $current_url = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
    ?>
    <header class="header-container">
        <div class="hydeburger-background"></div>
        <h1 class="header-title"><?php bloginfo('title'); ?></h1>
        <nav class="nav-container">
            <div class="links-to-display">
                <div class="nav-header_logo">
                    <a href="<?= home_url(); ?>" class="nav-header_logo-link header_link">
                        <img class="header_logo-img" src="<?= get_theme_file_uri(); ?>/assets/img/dice_icon.ico" alt="">
                        <h3 class="header_logo-title">CdC</h3>
                    </a>
                </div>
                <?php if (is_user_logged_in()) :
                    $user = wp_get_current_user();
                ?>
                    <div class="nav-header_profile">
                        <a href="<?= home_url(); ?>/user/profile/" class="nav-header_profile-link header_link">
                            <h3 class="header_profile-name"><?= $user->display_name; ?></h3>
                            <?php if (get_the_post_thumbnail_url($profile->ID)) : ?>
                                <img class="header_profile-img" src="<?= get_the_post_thumbnail_url($profile->ID); ?>" alt="">
                            <?php else : ?>
                                <div class="header_profile-img_icon">
                                    <i class="fas fa-user"></i>
                                </div>
                            <?php endif; ?>
                        </a>
                    </div>
                <?php endif; ?>
                <!-- <div> -->
                <ul class="nav_links-container">
                    <li class="displayable_link game_link">
                        <a href="<?= home_url(); ?>/game" class="header_link">Jouer
                            <span><i class="fas fa-dice dice_icon"></i></span>
                        </a>
                    </li>
                    <?php
                    foreach ($mainMenu as $pageLink) :
                        // echo $current_url;
                        // echo home_url() . "/" . $onePageType->slug . $userLink;
                        $activeClass = "";
                        if (isset($pageLink) && $current_url == $pageLink->url) {
                            $activeClass = " active_link";
                        }
                    ?>
                        <li class="displayable_link <?= $activeClass; ?>">
                            <a href="<?= $pageLink->url; ?>" class="header_link"><?= $pageLink->title; ?></a>
                        </li>

                    <?php
                    endforeach;
                    ?>
                    <li class="displayable_link">
                        <a href="<?=$_SERVER["REQUEST_SCHEME"] . "://" . $_SERVER["SERVER_NAME"];?>/games/wpcdc/public/content/themes/wpcdc/tchat4/" class="header_link">Tchat</a>
                    </li>
                    <!-- <li class="displayable_link">
                        <?php // if (is_user_logged_in()) :
                        ?>
                            <a href="<?= "" // home_url();
                                        ?>/statistics/<?= wp_get_current_user()->ID; ?>" class="header_link">Statistiques</a>
                        <?php // else :
                        ?>
                            <a href="<?= "" // home_url();
                                        ?>/statistics/0" class="header_link">Statistiques</a>
                        <?php // endif;
                        ?>
                    </li> -->
                    <?php
                    foreach ($pagesType as $onePageType) :
                        if ($onePageType->name === "user") :
                            $userLink = "/registration";
                            if (is_user_logged_in() === true) :
                    ?>
                                <li class="displayable_link">
                                    <a href="<?= wp_logout_url(home_url() . "/" . $onePageType->slug . $userLink); ?>" class="header_link">Se déconnecter</a>
                                </li>
                            <?php else :
                            ?>
                                <!-- http://localhost/neo/mes-travaux-2/wpcdc/public/user/registration
                            http://localhost/neo/mes-travaux-2/wpcdc/public/neo/mes-travaux-2/wpcdc/public/regles -->


                                <li class="displayable_link">
                                    <a href="<?= home_url(); ?>/<?= $onePageType->slug . $userLink; ?>" class="header_link">Se connecter<br>s'enregistrer</a>
                                </li>
                            <?php endif; ?>
                    <?php endif;
                    endforeach; ?>
                    <div class="burger-header-background"></div>
                    <li id="burger-icon-container">
                        <div class="burger-icon">
                            <span></span>
                        </div>
                    </li>
                </ul>
                <!-- <div id="burger-icon-container">
                        <div class="burger-icon">
                            <span></span>
                        </div>
                    </div> -->
                <!-- </div> -->
            </div>
        </nav>
        <div class="fullscreen-container">
            <button class="fullscreen-btn">
                <span>
                    <i class="fas fa-expand"></i>
                </span>
                <span>
                    <i class="fas fa-compress"></i>
                </span>
            </button>
        </div>
        <?php
        // wp_nav_menu([
        //     "theme_location" => "slug-du-menu", // (slug-du-menu-precedemment-enregistré)
        //     "container" => "nav", // ou autre type de container (div, span ou autre)
        // ]);
        ?>
        <!-- <span><?php // bloginfo('description');
                    ?></span> -->
        <!-- <div class="nav-header_line"></div> -->
    </header>