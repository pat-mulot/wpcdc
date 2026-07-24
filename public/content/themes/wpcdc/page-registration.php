<?php
get_header();
include __DIR__ . '/includes/datas/data-registration.php';;
?>
<!-- ------------------------------------------ -->
<main class="main-container">
    <section class="main_section" style="background-image: url(<?= get_theme_file_uri(); ?>/assets/img/background_paper.jpg);">
        <!-- <div class="main_card-container registration-header">
            <h2 class="main_card-title1">Inscription ? -> 
                <a href="#gueritte_1">Gueritte numéro 1.</a>
            </h2>
            <h2 class="main_card-title1">Connexion ? -> 
                <a href="#gueritte_2">Gueritte numéro 2.</a>
            </h2>
        </div>
        <hr class="card-separation"> -->
        <form action="<?= home_url(); ?>/user/add/" method="POST" class="main_card-container" id="gueritte_1">
            <div class="user_form-header">
                <span>Gueritte numéro 1 : <h2 class="main_card-title2">Inscription</h2></span>
            </div>
            <div class="main-card-content">
                <div class="user_form-input_container">
                    <label for="user_name-registration" class="user_form-input-label">Votre nom :</label>
                    <input class="user_form-input" type="text" name="user_name-registration" id="user_name-registration" value="" autocomplete="new-password" />
                </div>
                <div class="user_form-input_container">
                    <label for="user_email-registration" class="user_form-input-label">Votre adresse mail :</label>
                    <input class="user_form-input" type="email" name="user_email-registration" id="user_email-registration" value="" autocomplete="new-password" />
                </div>
                <div class="user_form-input_container">
                    <label for="user_password-registration" class="user_form-input-label">Votre code secret :</label>
                    <input class="user_form-input" type="password" name="user_password-registration" id="user_password-registration" value="" autocomplete="new-password" />
                </div>
                <div class="user_form-radio_input_container">
                    <div class="main-radio-label">
                        <span class="user_form-input-label">Vous êtes</span>
                    </div>
                    <div>
                        <div class="single-radio-content">
                            <div class="user_form-radio-container">
                                <input type="radio" name="user_role-registration" id="user_role-registration-1" value="player" class="form_radio" />
                                <label for="user_role-registration-1"></label>
                            </div>
                            <span>Un gros tagazou</span>
                        </div>
                        <div class="single-radio-content">
                            <div class="user_form-radio-container">
                                <input type="radio" name="user_role-registration" id="user_role-registration-2" value="player" class="form_radio" />
                                <label for="user_role-registration-2"></label>
                            </div>
                            <span>Un Druide</span>
                        </div>
                        <div class="single-radio-content">
                            <div class="user_form-radio-container">
                                <input type="radio" name="user_role-registration" id="user_role-registration-3" value="player" class="form_radio" />
                                <label for="user_role-registration-3"></label>
                            </div>
                            <span>Un Enchanteur</span>
                        </div>
                    </div>
                </div>
                <div class="main_card-footer">
                    <div class="user_form-button">
                        <input type="submit" value="Valider l'inscription" />
                    </div>
                </div>
            </div>
        </form>
        <hr class="card-separation">
        <form action="<?= site_url('/wp-login.php'); ?>" method="POST" name="loginform" id="loginform" class="main_card-container" id="gueritte_2" autocomplete="off">
            <div class="user_form-header">
                <span>Gueritte numéro 2 : <h2 class="main_card-title2">Connexion</h2></span>
            </div>
            <div class="main-card-content">
                <div class="user_form-input_container">
                    <label for="user_login" class="user_form-input-label">Votre nom :</label>
                    <input class="user_form-input" type="text" name="log" id="user_login" autocomplete="new-password" />
                </div>
                <div class="user_form-input_container">
                    <label for="user_pass" class="user_form-input-label">Votre code secret :</label>
                    <input class="user_form-input" type="password" name="pwd" id="user_pass" autocomplete="new-password" />
                </div>
                <div class="user_form-input_container">
                    <span class="user_form-input-label">Se souvenir des informations</span>
                    <div class="user_form-checkbox-container">
                        <input id="rememberme" type="checkbox" value="forever" name="rememberme" class="form_checkbox" />
                        <label for="rememberme"></label>
                    </div>
                </div>
                <div class="main_card-footer">
                    <div class="user_form-button">
                        <input type="submit" value="Se connecter" id="wp-submit" name="wp-submit" />
                    </div>
                </div>
            </div>
        </form>
    </section>
</main>
<!-- ------------------------------------------ -->
<?php
get_footer();
?>