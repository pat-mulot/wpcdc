<?php
get_header();
include __DIR__ . '/includes/datas/data-scores.php';;
?>
<!-- ------------------------------------------ -->
<main class="main-container">
    <nav class="page_links">
        <ul>
            <li class="page_link">
                <a href="#top-3">Top 3</a>
            </li>
            <li class="page_link">
                <a href="#top-10">Top 10</a>
            </li>
            <li class="page_link">
                <a href="#top-50">Top 50</a>
            </li>
        </ul>
        <div class="scroll_button-left"><</div>
        <div class="scroll_button-right">></div>
    </nav>
    <section class="main_section scores_section" style="background-image: url(<?= get_theme_file_uri(); ?>/assets/img/background_paper.jpg);">
        <h1 class="main_card-title1">TOP SCORES</h1>
        <!-- <div class="main_card-container registration-header">
            <h2 class="main_card-title1">Inscription ? -> 
                <a href="#gueritte_1">Gueritte numéro 1.</a>
            </h2>
            <h2 class="main_card-title1">Connexion ? -> 
                <a href="#gueritte_2">Gueritte numéro 2.</a>
            </h2>
        </div>
        <hr class="card-separation"> -->
        <article action="<?= home_url(); ?>/user/add/" method="POST" class="main_card-container">
            <ul class="scores_list">
                <li class="scores_list-header">
                    <div class="scores_list-title scores-title">Joueurs</div>
                    <div class="scores_list-title scores-title">Scores</div>
                    <div class="scores_list-title scores-title">Tours</div>
                    <div class="scores_list-title scores-title">Top</div>
                </li>
                <hr class="scores-separation">
                <?php
                $rankIndex = 1;
                while ($scoresPosts->have_posts()) :
                    $scoresPosts->the_post();
                    $top;
                    if ($rankIndex === 1) {
                        $top = "top-3";
                    } else if ($rankIndex === 4) {
                        $top = "top-10";
                    } else if ($rankIndex === 51) {
                        $top = "top-50";
                    }
                ?>
                <!-- <span>le <strong><?= "" // get_the_date('j F Y'); ?></strong></span> -->
                    <li class="scores-row" id="<?= $top;?>">
                        <div>
                            <?php
                            // if (get_the_author_meta("ID") != 0) :
                            if (get_the_author_meta("ID") != 0 && get_the_author_meta("ID") != 1) :
                                $class = "player_logged";
                            ?>
                                <a href="<?= home_url(); ?>/statistics/<?= get_the_author_meta("ID"); ?>" class="name_link top-<?= $rankIndex . " " . $class; ?>">
                                    <?= the_title(); ?>
                                </a>
                            <?php else : ?>
                                <a class="name_link top-<?= $rankIndex; ?>">
                                    <?= the_title(); ?>
                                </a>
                            <?php endif; ?>
                        </div>
                        <div>
                            <?= get_field("total_score"); ?>
                        </div>
                        <div>
                            <?= get_field("total_rounds"); ?>
                        </div>
                        <div class="top-<?= $rankIndex . " " . $class; ?>">
                            <?php if ($rankIndex <= 3) : ?>
                                <?= the_field("rank"); ?><span><i class="fas fa-trophy"></i></span>
                            <?php else : ?>
                                <?= the_field("rank"); ?>
                            <?php endif; ?>
                        </div>
                    </li>
                    <hr class="scores-separation">
                <?php
                    $rankIndex++;
                endwhile;
                ?>
            </ul>
        </article>
    </section>
</main>
<!-- ------------------------------------------ -->
<?php
get_footer();
?>