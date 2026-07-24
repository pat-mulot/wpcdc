<?php
get_header();
// include __DIR__ . '/includes/data-scores.php';;
?>
<!-- ------------------------------------------ -->
<main class="main-container">
    <section class="main_section" style="background-image: url(<?= get_theme_file_uri(); ?>/assets/img/background_paper.jpg);">
        <h2 class="main_card-title1">FEUILLE DE SCORE</h2>
        <article class="main_card-container scores_sheet-container">
            <!-- <h1 class="row page-title">FEUILLE DE SCORE</h1> -->
            <button class="max_score-button">score max : <span class="score_max">343</span><input class="edit-score_max" type="number"></button>
            <!-- <div class="row"> -->
            <ul class="scores_list">
                <!-- <li class="row score-header">
                    <div class="col-4 titles">JOUEURS</div>
                    <div class="col-3 titles">TOTAL</div>
                    <div class="col-3 titles">ACTIONS</div>
                    <div class="col-2 titles"></div>
                    <hr>
                </li> -->
                <li class="scores_list-header">
                    <div class="scores-title scores_title-player">JOUEURS</div>
                    <div class="scores-title scores_title-scores">TOTAL</div>
                    <div class="scores-title scores_title-actions">ACTIONS</div>
                    <div class="scores-title scores_title-remove"> - </div>
                </li>
                <hr class="scores-separation">

                <div class="new_player-tpl-container">
                    <template class="player-tpl">
                        <li class="scores_sheet-row player-row">
                            <div class="player-name">
                                <span class="name_link">
                                    Nouveau Joueur
                                </span>
                            </div>
                            <div class="player-score">
                                000
                            </div>
                            <div class="points-actions">
                                <button class="points-add">
                                    <i class="fas fa-plus"></i>
                                </button>
                                <button class="points-remove">
                                    <i class="fas fa-minus"></i>
                                </button>
                            </div>
                            <div class="player-remove">
                                <button class="player-remove-button">
                                    <i class="far fa-trash-alt"></i>
                                </button>
                            </div>
                            <!-- <hr> -->
                        </li>
                        <hr class="scores-separation">
                    </template>
                </div>
                <li class="row player-add">
                    <div class="player-add-container">
                        <span>AJOUTER UN JOUEUR </span>
                        <div>+</div>
                    </div>
                </li>
            </ul>
            <!-- </div> -->
        </article>
        <div class="new_player-form">
            <div class="new_player-form-background">
            </div>
            <label for="new_player-form-name">
                <input type="text" id="new_player-form-name" class="new_player-form-inputs" placeholder="Nom du joueur">
                <input type="number" id="score_input" class="new_player-form-inputs">
                <button class="submit-player_name">VALIDER</button>
                <div id="endgame_message-container">
                    <p id="endgame_message">
                    <h1>PARTIE TERMINEE</h1>
                        <span>Bravo</span>
                        <span id="winner"></span>
                    
                    </p>
                </div>
            </label>
        </div>
    </section>
</main>
<!-- ------------------------------------------ -->
<?php
get_footer();
?>