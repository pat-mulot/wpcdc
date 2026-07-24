<?php
get_header();
$user = $args["user"];
$profile = $args["profile"];
$allIaProfiles = $args["allIaProfiles"];
$iaPlayers = $args["iaPlayers"];
?>
<!-- ------------------------------------------ -->
<main class="main-container">
    <!-- <section class="main_section"> -->
    <div class="game_container">
        <!-- ------------------------- BOARD ------------------------- -->
        <div id="board">
            <!-- ------------------------- DICES TABLE ------------------------- -->
            <div class="dices_table" style="background-image: url(<?= get_theme_file_uri(); ?>/assets/img/background_wood.jpg);">
                <div class="dice_container dice_container3">
                    <div id="dice3" class="dice">
                        <div class="dot fig_mid hidden visible"></div>
                        <div class="dot fig_top_left hidden visible"></div>
                        <div class="dot fig_top_right hidden"></div>
                        <div class="dot fig_mid_left hidden"></div>
                        <div class="dot fig_mid_right hidden"></div>
                        <div class="dot fig_bot_left hidden"></div>
                        <div class="dot fig_bot_right hidden visible"></div>
                    </div>
                </div>
                <div class="dice_container dice_container2">
                    <div id="dice2" class="dice">
                        <div class="dot fig_mid hidden"></div>
                        <div class="dot fig_top_left hidden visible"></div>
                        <div class="dot fig_top_right hidden visible"></div>
                        <div class="dot fig_mid_left hidden"></div>
                        <div class="dot fig_mid_right hidden"></div>
                        <div class="dot fig_bot_left hidden visible"></div>
                        <div class="dot fig_bot_right hidden visible"></div>
                    </div>
                </div>
                <div class="dice_container dice_container1">
                    <div id="dice1" class="dice">
                        <div class="dot fig_mid hidden visible"></div>
                        <div class="dot fig_top_left hidden visible"></div>
                        <div class="dot fig_top_right hidden"></div>
                        <div class="dot fig_mid_left hidden"></div>
                        <div class="dot fig_mid_right hidden"></div>
                        <div class="dot fig_bot_left hidden"></div>
                        <div class="dot fig_bot_right hidden visible"></div>
                    </div>
                </div>
                <div class="message-figure-container">
                    <span class="message-figure"></span>
                </div>
                <div class="message-bevue-container">
                    <span class="message-bevue"></span>
                </div>
                <div class="message-sirop-container">
                    <span class="message-sirop">Sirotage ?</span>
                    <div class="sirotage-btn-container">
                        <button class="sirotage-no">Non</button>
                        <button class="sirotage-yes">Oui</button>
                    </div>
                </div>
                <div class="message-sirop-gamble">
                    <span class="message-gamble">Perceval parié
                        <br>
                        <span class="gamble_value"></span>
                    </span>
                </div>
                <div class="sirop_selector-container">
                    <h2>Choisissez un dés</h2>
                    <div class="sirop_selector">
                        <div class="sirop" data-dice-value="1">
                            <i class="fas fa-dice-one gamble_dice gamble_dice_1"></i>
                        </div>
                        <div class="sirop" data-dice-value="2">
                            <i class="fas fa-dice-two gamble_dice gamble_dice_2"></i>
                        </div>
                        <div class="sirop" data-dice-value="3">
                            <i class="fas fa-dice-three gamble_dice gamble_dice_3"></i>
                        </div>
                        <div class="sirop" data-dice-value="4">
                            <i class="fas fa-dice-four gamble_dice gamble_dice_4"></i>
                        </div>
                        <div class="sirop" data-dice-value="5">
                            <i class="fas fa-dice-five gamble_dice gamble_dice_5"></i>
                        </div>
                        <div class="sirop" data-dice-value="6">
                            <i class="fas fa-dice-six gamble_dice gamble_dice_6"></i>
                        </div>
                    </div>
                </div>
                <div class="dice_roll-gauge-container">
                    <div class="dice_roll-gauge-content">
                        <div class="dice_roll-gauge"></div>
                        <div class="dice_roll-cursor">
                        </div>
                        <div class="dice_roll-gauge-limit">
                            <span><i class="fas fa-caret-right"></i></span>
                            <div></div>
                            <span><i class="fas fa-caret-left"></i></span>
                        </div>
                    </div>
                </div>
                <div class="grelotte_hit-container">
                    <div class="grelotte_hit-content">
                        <span><i class="fas fa-hand-paper"></i></span>
                    </div>
                </div>
                <div class="player_turn_hit-container">
                    <div class="player_turn_hit-content">
                        <span>Click !</span>
                    </div>
                </div>
            </div>
            <!-- ------------------------- SCORES ------------------------- -->
            <div class="other_players">
                <template id="tpl-other_player">
                    <div class="score-ia" data-player-id="0">
                        <span class="other_player-name">Score IA</span>
                        <div>
                            <span class="score-total-other_players">0</span>
                            <span id="gamble-nb-ia"></span>

                            <span id="gamble-score_msg-ia">
                                <span></span>
                            </span>
                            <span id="bevue-score_msg-ia">
                                <span></span>
                            </span>
                        </div>
                    </div>
                </template>
            </div>
            <div class="score-container">
                <div class="rounds">
                    <span>Tour n° </span>
                    <span id="round-nb">0</span>
                </div>
                <div class="score">
                    <span>Score</span>
                    <div class="score_nb-container">
                        <span id="gamble-nb-player">0</span>
                        <span id="score-total">0</span>
                        <span id="gamble-score_msg-player">
                            <span></span>
                        </span>
                        <span id="bevue-score_msg-player">
                            <span></span>
                        </span>

                    </div>
                </div>
            </div>
            <!-- ------------------------- SCORES ------------------------- -->
        </div>
        <!-- ---------------------- END GAME SECTION WIN ---------------------- -->
        <section class="end_game-you_win-container">
            <div class="end_game-you_win" style="background-image: url(<?= get_theme_file_uri(); ?>/assets/img/background_paper.jpg);">
                <h2>PARTIE TERMINEE <i class="fas fa-trophy"></i></h2>
                <p><em id="final_score-total"></em> points</p>
                <p>En <em id="final_score-rounds"></em> tours</p>
                <form action="<?= home_url(); ?>/game/add-score" method="POST">
                    <?php if (is_user_logged_in() === true) : ?>
                        <input type="hidden" id="nameToSend" name="nameToSend" placeholder="Entrez votre nom" value="<?= wp_get_current_user()->display_name; ?>">
                    <?php else : ?>
                        <input type="text" id="nameToSend" name="nameToSend" placeholder="Entrez votre nom" required="required">
                    <?php endif; ?>
                    <input id="scoreToSend" name="scoreToSend" type="hidden" value="">
                    <input id="roundsToSend" name="roundsToSend" type="hidden" value="">
                    <!-- fields for stats : ------------------------>
                    <input id="cdcNb" name="cdcNb" type="hidden" value="">
                    <input id="cvNb" name="cvNb" type="hidden" value="">
                    <input id="chouetteNb" name="chouetteNb" type="hidden" value="">
                    <input id="veluteNb" name="veluteNb" type="hidden" value="">
                    <input id="suiteNb" name="suiteNb" type="hidden" value="">
                    <input id="neantNb" name="neantNb" type="hidden" value="">
                    <input id="sirotageNb" name="sirotageNb" type="hidden" value="">
                    <input id="sirotageSuccessNb" name="sirotageSuccessNb" type="hidden" value="">
                    <input id="grelotteNb" name="grelotteNb" type="hidden" value="">
                    <input id="grelotteFailNb" name="grelotteFailNb" type="hidden" value="">
                    <input id="bevueNb" name="bevueNb" type="hidden" value="0">
                    <input id="bevueFailNb" name="bevueFailNb" type="hidden" value="0">
                    <input id="siropGambleNb" name="siropGambleNb" type="hidden" value="0">
                    <input id="siropGambleSuccessNb" name="siropGambleSuccessNb" type="hidden" value="0">
                    <input type="submit" id="submit-score" value="ENVOYER VOTRE SCORE ?">
                </form>
                <div class="end_game-footer">
                    <a href="<?= home_url(); ?>">Retour acceuil</a>
                    <span>|</span>
                    <a href="">Rejouer</a>
                </div>
            </div>
        </section>
        <!-- ---------------------- END GAME SECTION WIN ---------------------- -->
        <section class="end_game-lost-container">
            <div class="end_game-lost" style="background-image: url(<?= get_theme_file_uri(); ?>/assets/img/background_paper.jpg);">
                <h2>PARTIE TERMINEE</h2>
                <?php
                 $profileIndex = 1;
                foreach ($allIaProfiles as $iaProfile) :
                    if (get_the_post_thumbnail_url($iaProfile[0]->ID)) :
                ?>
                        <div class="main_card-img-container" style="display: none">
                            <img src="<?= get_the_post_thumbnail_url($iaProfile[0]->ID); ?>" alt="" class="ia_img ia_img-<?= $profileIndex; ?>">
                        </div>
                    <?php else : ?>
                    <?php endif; ?>
                <?php
                    $profileIndex++;
                endforeach;
                ?>
                <div class="winner-infos">
                    <h3 class="winner">VAINQUEUR : </h3>
                    <span class="winner-name"></span>
                </div>
                <p><em id="final_score-total-ia"></em> points
                    En <em id="final_score-rounds-ia"></em> tours
                </p>

                <div class="end_game-footer">
                    <a href="<?= home_url(); ?>">Retour acceuil</a>
                    <span>|</span>
                    <a href="">Rejouer</a>
                </div>
            </div>
        </section>
        <!-- ------------------------- OPTIONS ------------------------- -->
        <div class="display-options">
            <span><i class="fas fa-cog"></i></span>
        </div>
        <!-- ------------------------------------------ -->
    </div>
    <!-- ------------------------- OPTIONS ------------------------- -->
    <section class="game_options-container">
        <div class="game_options" style="background-image: url(<?= get_theme_file_uri(); ?>/assets/img/background_paper.jpg);">
            <div class="cancel-btn-container">
                <div class="cancel-btn">
                    <span>X</span>
                </div>
            </div>
            <h1>Options de jeu</h1>
            <div class="game_options-content">
                <div class="options_type">
                    <label>Mode de jeu :</label>
                    <div class="dropdown" id="game_type-dropdown-selector" data-id="" value="">
                        <button class="dropdown-btn" type="button" aria-haspopup="true" id="game_type" value="">selectionnez</button>
                        <ul role="listbox" class="dropdown-menu" aria-expanded="false">
                            <li role="option" tabindex="0" value="1">Entrainnement</li>
                            <li role="option" tabindex="0" value="2">Jouer contre l'ordi</li>

                            <!-- <li role="option" tabindex="0" value="3">Multijoueur</li> -->
                        </ul>
                    </div>
                </div>
                <div class="options_type" id="ia_select-form">
                    <label>Choisissez un adversaire :</label>
                    <div class="dropdown" id="ia-dropdown-selector" data-id="" value="">
                        <button class="dropdown-btn" type="button" aria-haspopup="true" id="ia_select" value=""><span>selectionnez</span></button>
                        <ul role="listbox" class="dropdown-menu" aria-expanded="false">
                            <?php
                            $profileIndex = 1;
                            foreach ($iaPlayers as $ia) :
                            ?>
                                <li role="option" tabindex="0" value="<?= $profileIndex; ?>"><?= $ia->display_name; ?></li>
                            <?php
                                $profileIndex++;
                            endforeach;
                            ?>
                        </ul>
                    </div>
                </div>
                <div class="options_type">
                    <label>Règles :</label>
                    <ul id="rules_list">
                        <li data-rule="bevue"><span>Bévue</span></li>
                        <li data-rule="grelotte"><span>Grelotte ça picotte</span></li>
                        <li data-rule="sirotage"><span>Sirotage</span></li>
                        <li data-rule="grelottine" class="disabled"><span>Grelotine</span></li>
                        <li data-rule="civet" class="disabled"><span>Civet</span></li>
                    </ul>
                </div>
            </div>
            <button class="start_game-btn">Commencer</button>
        </div>
    </section>
    <div class="sirotage_timer-container">
        <div class="sirotage_timer">
            <div class="sirotage_timer-bar">
                <div class="bar-cursor">
                    <!-- <div class="cursor-content"></div> -->
                </div>
            </div>
        </div>
    </div>
    <div class="start_game">
        <button class="start_game-btn">Commencer ?</button>
    </div>
</main>
<!-- ------------------------------------------ -->
<?php
get_footer();
?>
