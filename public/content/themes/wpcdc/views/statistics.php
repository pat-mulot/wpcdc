<?php
get_header();
$statistics = $args["statistics"];
$statsFields = $args["statsFields"];
$bestScore = $args["bestScore"];
$gamePlayedNb = $args["gamePlayedNb"];
$statistics->the_post();
?>
<!-- ------------------------------------------ -->
<main class="main-container">
    <section class="main_section stats_section" style="background-image: url(<?= get_theme_file_uri(); ?>/assets/img/background_paper.jpg);">
        <h2 class="main_card-title1">STATISTIQUES JOUEUR</h2>
        <article class="main_card-container">
            <div class="stats_heading">
                <h3 class="main_card-title2 statistics-title">
                    <span>SCORES : </span>
                    <a href=""><?= get_the_author_meta("display_name", the_author()); ?></a>
                </h3>
            </div>
            <hr class="stats_title-separation">
            <ul class="statistics_list">
                <li class="statistics-row">
                    <div class="statistics-name">NOMBRE DE PARTIES : </div>
                    <span class="statistics-text"><?= $gamePlayedNb; ?></span>
                </li>
                <hr class="stats-separation">
                <li class="statistics-row">
                    <div class="statistics-name">MEILLEUR SCORE : </div>
                    <span class="statistics-text"><?= $bestScore; ?></span>
                </li>
                <hr class="stats-separation">
                <li class="statistics-row">
                    <div class="statistics-name">CLASSEMENT : </div>
                    <div class="statistics-text">
                        <span><?= $statsFields["rank"]; ?></span>
                        <span class="<?= $statsFields["classRank"]; ?> class_icon">
                            <i class="fas fa-trophy"></i>
                        </span>
                    </div>
                </li>
                <hr class="stats-separation">
                <li class="statistics-row">
                    <div class="statistics-name">SCORE TOTAL : </div>
                    <div class="statistics-text"><?= $statsFields["score"]; ?></div>
                </li>
                <hr class="stats-separation">
                <li class="statistics-row">
                    <div class="statistics-name">ROUNDS TOTAL : </div>
                    <div class="statistics-text"><?= $statsFields["rounds"]; ?></div>
                </li>
                <hr class="stats-separation">
                <li class="statistics-row">
                    <div class="statistics-name">MOYENNE (pts/tour) : </div>
                    <div class="statistics-text"><?= round($statsFields["ptsPerRounds"], 2); ?></div>
                </li>
                <hr class="stats-separation">
            </ul>
        </article>
        <article class="main_card-container">
            <div class="stats_heading">
                <h3 class="main_card-title2 statistics-title">FIGURES TOTAL : </h3>
            </div>
            <hr class="stats_title-separation">
            <ul class="statistics_list">
                <li class="statistics-row">
                    <div class="statistics-name">Nombre de coups réussis : </div>
                    <div class="statistics-text"><?= $statsFields["roundSuccess"]; ?><span>(<?= round($statsFields["successStats"], 2); ?>%)</span></div>
                </li>
                <hr class="stats-separation">
                <li class="statistics-row">
                    <div class="statistics-name">Cul de chouette : </div>
                    <div class="statistics-text"><?= $statsFields["cdcNb"]; ?><span>(<?= round($statsFields["cdcStat"], 2); ?>%)</span></div>
                </li>
                <hr class="stats-separation">
                <li class="statistics-row">
                    <div class="statistics-name">Chouette-velute : </div>
                    <div class="statistics-text"><?= $statsFields["cvNb"]; ?><span>(<?= round($statsFields["cvStat"], 2); ?>%)</span></div>
                </li>
                <hr class="stats-separation">
                <li class="statistics-row">
                    <div class="statistics-name">Chouette : </div>
                    <div class="statistics-text"><?= $statsFields["chouetteNb"]; ?><span>(<?= round($statsFields["chouetteStat"], 2); ?>%)</span></div>
                </li>
                <hr class="stats-separation">
                <li class="statistics-row">
                    <div class="statistics-name">Velute : </div>
                    <div class="statistics-text"><?= $statsFields["veluteNb"]; ?><span>(<?= round($statsFields["veluteStat"], 2); ?>%)</span></div>
                </li>
                <hr class="stats-separation">
                <li class="statistics-row">
                    <div class="statistics-name">Suite : </div>
                    <div class="statistics-text"><?= $statsFields["suiteNb"]; ?><span>(<?= round($statsFields["suiteStat"], 2); ?>%)</span></div>
                </li>
                <hr class="stats-separation">
                <li class="statistics-row">
                    <div class="statistics-name">Néant : </div>
                    <div class="statistics-text"><?= $statsFields["neantNb"]; ?><span>(<?= round($statsFields["neantStat"], 2); ?>%)</span></div>
                </li>
                <hr class="stats-separation">
            </ul>
        </article>
        <article class="main_card-container">
            <div class="stats_heading">
                <h3 class="main_card-title2 statistics-title">Grelotte ça picotte : </h3>
            </div>
            <hr class="stats_title-separation">
            <ul class="statistics_list">
                <li class="statistics-row">
                    <div class="statistics-name">"Grelotte ça picotte" effectués : </div>
                    <div class="statistics-text"><?= $statsFields["grelotteNb"]; ?></div>
                </li>
                <hr class="stats-separation">
                <li class="statistics-row">
                    <div class="statistics-name">"Grelotte ça picotte" échoués : </div>
                    <div class="statistics-text"><?= $statsFields["grelotteFailNb"]; ?><span>(<?= round($statsFields["grelotteFailStats"], 2); ?>%)</span></div>
                </li>
                <hr class="stats-separation">
            </ul>
        </article>
        <article class="main_card-container">
            <div class="stats_heading">
                <h3 class="main_card-title2 statistics-title">Sirotages : </h3>
            </div>
            <hr class="stats_title-separation">
            <ul class="statistics_list">
                <li class="statistics-row">
                    <div class="statistics-name">Nombre de sirotages : </div>
                    <div class="statistics-text"><?= $statsFields["sirotageNb"]; ?></div>
                </li>
                <hr class="stats-separation">
                <li class="statistics-row">
                    <div class="statistics-name">Nombre de sirotages réussis : </div>
                    <div class="statistics-text"><?= $statsFields["sirotageSuccessNb"]; ?><span>(<?= round($statsFields["sirotageSuccessStats"], 2); ?>%)</span></div>
                </li>
                <hr class="stats-separation">
            </ul>
        </article>
    </section>
</main>
<!-- ------------------------------------------ -->
<?php
// endif;
// endwhile;
get_footer();
?>