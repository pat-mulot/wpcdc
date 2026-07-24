<!-- ------------------------------------------ -->
<?php
get_header();
include __DIR__ . '/includes/datas/data-home.php';
?>
<!-- --------------------------------- MAIN HOME SECTION --------------------------------- -->
<main class="main_container">
        <section class="main_section-home" style="background-image: url(<?= get_theme_file_uri(); ?>/assets/img/background_wood.jpg);">
            <div class="main_section-home-container">
                <?php  while ($homePosts->have_posts()) :
                $homePosts->the_post(); ?>
                    <div class="main_section-home-content">
                        <div class="home_dices-image">
                            <div id="dice3" class="dice">
                                <div class="dot fig_mid hidden visible"></div>
                                <div class="dot fig_top_left hidden visible"></div>
                                <div class="dot fig_top_right hidden"></div>
                                <div class="dot fig_mid_left hidden"></div>
                                <div class="dot fig_mid_right hidden"></div>
                                <div class="dot fig_bot_left hidden"></div>
                                <div class="dot fig_bot_right hidden visible"></div>
                            </div>
                            <div id="dice2" class="dice">
                                <div class="dot fig_mid hidden"></div>
                                <div class="dot fig_top_left hidden visible"></div>
                                <div class="dot fig_top_right hidden visible"></div>
                                <div class="dot fig_mid_left hidden"></div>
                                <div class="dot fig_mid_right hidden"></div>
                                <div class="dot fig_bot_left hidden visible"></div>
                                <div class="dot fig_bot_right hidden visible"></div>
                            </div>
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
                        <div class="main_section-home-text-container">
                            <div class="main_card-text">
                                <div>
                                    <h1>Le Cul de Chouette</h1>
                                </div>
                                <div>Jeu originaire de la série <strong>"Kaamelott"</strong> et se joue avec trois dés.</div>
                            </div>
                        </div>
                    </div>
            <?php endwhile; ?>
            </div>
        </section>
    <section class="main_section" style="background-image: url(<?= get_theme_file_uri(); ?>/assets/img/background_paper.jpg);">
        <div class="home_tops-wrapper">
            <article class="main-card-content">
                <a href="home_url() . '/scores'"><h3 class="main_card-title2">Top scores</h3></a>
                <div class="best_scores-wrappers inner_slider-container">
                    <div class="inner_slider">
                        <?php while ($scoresPosts->have_posts()) :
                            $scoresPosts->the_post(); ?>
                        <div class="home_best_players-container inner_slider-content <?= get_field("rank"); ?>">
                            <div class="home_best_players-frame">
                                <div class="home_top home_top-<?= get_field("rank"); ?>">
                                    <span><i class="fas fa-trophy icon"></i></span><span class="home_top-nb"><?= the_field("rank"); ?></span>
                                </div>
                                <ul class="text-content">
                                    <?php
                                    if (get_the_author_meta("ID") != 0 && get_the_author_meta("ID") != 1) :
                                        $class = "player_logged";
                                    ?>
                                        <h3><a href="<?= home_url(); ?>/statistics/<?= get_the_author_meta("ID"); ?>">
                                            <?= the_title(); ?>
                                        </a></h3>
                                    <?php else : ?>
                                        <h3><a>
                                            <?= the_title(); ?>
                                        </a></h3>
                                    <?php endif; ?>
                                    <li>
                                        <span><strong><?= get_field("total_score"); ?></strong> Pts</span>
                                    </li>
                                    <li>
                                        <span><strong><?= get_field("total_rounds"); ?></strong> Tours</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <?php 
                            endwhile; 
                        ?>
                    </div>
                    <div class="inner_slider-buttons-container">
                        <div class="inner_slider-button button-1" data-item-id="0">
                            <div class="button_top button_top-1">
                                <span><i class="fas fa-trophy icon"></i></span><span class="home_top-nb">1</span>
                            </div>
                        </div>
                        <div class="inner_slider-button button-2" data-item-id="1">
                            <div class="button_top button_top-2">
                                <span><i class="fas fa-trophy icon"></i></span><span class="home_top-nb">2</span>
                            </div>
                        </div>
                        <div class="inner_slider-button button-3" data-item-id="2">
                            <div class="button_top button_top-3">
                                <span><i class="fas fa-trophy icon"></i></span><span class="home_top-nb">3</span>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
            <article class="main-card-content">
                <a href="home_url() . '/scores'"><h3 class="main_card-title2">Top scores de la semaine</h3></a>
                <div class="best_scores-wrappers inner_slider-container">
                    <div class="inner_slider">
                    <?php while ($weekScoresPosts->have_posts()) :
                        $weekScoresPosts->the_post(); ?>
                        <div class="home_best_players-container inner_slider-content <?= get_field("rank"); ?>">
                            <div class="home_best_players-frame">
                                <div class="home_top home_top-<?= get_field("rank"); ?>">
                                    <span><i class="fas fa-trophy icon"></i></span><span class="home_top-nb"><?= the_field("rank"); ?></span>
                                </div>
                                <ul class="text-content">
                                    <?php
                                    if (get_the_author_meta("ID") != 0 && get_the_author_meta("ID") != 1) :
                                        $class = "player_logged";
                                    ?>
                                        <h3><a href="<?= home_url(); ?>/statistics/<?= get_the_author_meta("ID"); ?>">
                                            <?= the_title(); ?>
                                        </a></h3>
                                    <?php else : ?>
                                        <h3><a>
                                            <?= the_title(); ?>
                                        </a></h3>
                                    <?php endif; ?>
                                    <li>
                                        <span><strong><?= get_field("total_score"); ?></strong> Pts</span>
                                    </li>
                                    <li>
                                        <span><strong><?= get_field("total_rounds"); ?></strong> Tours</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    <?php endwhile; ?>
                    </div>
                    <div class="inner_slider-buttons-container">
                        <div class="inner_slider-button button-1" data-item-id="0">
                            <div class="button_top button_top-1">
                                <span><i class="fas fa-trophy icon"></i></span><span class="home_top-nb">1</span>
                            </div>
                        </div>
                        <div class="inner_slider-button button-2" data-item-id="1">
                            <div class="button_top button_top-2">
                                <span><i class="fas fa-trophy icon"></i></span><span class="home_top-nb">2</span>
                            </div>
                        </div>
                        <div class="inner_slider-button button-3" data-item-id="2">
                            <div class="button_top button_top-3">
                                <span><i class="fas fa-trophy icon"></i></span><span class="home_top-nb">3</span>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
            <article class="main-card-content">
                <a href="<?= home_url(); ?>/statistics/<?= $topGamblerPost->post_author; ?>"><h3 class="main_card-title2">L'Oeil de Taupe</h3></a>
                <div class="oeil_de_taupe-content">
                    <div class="oeil_de_taupe-icon-container">
                        <i class="fas fa-eye oeil_de_taupe-icon"></i>
                        <div><span><?= $topStatWeek; ?></span>%</div>
                    </div>
                    <a href="<?= home_url(); ?>/statistics/<?= $topGamblerPost->post_author; ?>"><span class="oeil_de_taupe-player"><?= $topGamblerPost->post_title; ?></span></a>
                    <ul class="oeil_de_taupe-text">
                        <li><span><?= $topGambleNb; ?></span> Sirotages pariés au total
                        </li>
                        <li><span><?= $topGambleSuccessNb; ?></span> Paris réussis
                        </li>
                    </ul>
                </div>
            </article>
            <article class="main-card-content">
                <a href="<?= home_url(); ?>/statistics/<?= $topGamblerPostWeek->post_author; ?>"><h3 class="main_card-title2">Oeil de Taupe de la semaine</h3></a>
                <div class="oeil_de_taupe-content">
                    <div class="oeil_de_taupe-icon-container">
                        <i class="fas fa-eye oeil_de_taupe-icon"></i>
                        <div><span><?= $topStatWeek; ?></span>%</div>
                    </div>
                    <a href="<?= home_url(); ?>/statistics/<?= $topGamblerPost->post_author; ?>"><span class="oeil_de_taupe-player"><?= $topGamblerPostWeek->post_title; ?></span></a>
                    <ul class="oeil_de_taupe-text">
                        <li><span><?= $topGambleNbWeek; ?></span> Sirotages pariés au total
                        </li>
                        <li><span><?= $topGambleSuccessNbWeek; ?></span> Paris réussis
                        </li>
                    </ul>
                </div>
            </article>
        </div>
        <div class="home_tops_slider-buttons">
            <div class="home_tops_slider-button"><<</div>
            <div class="home_tops_slider-button">>></div>
        </div>
        <hr class="card-separation">
            <?php  while ($homePosts->have_posts()) :
            $homePosts->the_post(); ?>
            <article class="main_card-container">
                <h2 class="main_card-title1"><?= the_title(); ?></h2>
                <div class="main_card-content">
                    <div class="home_dices-image">
                        <div class="home_dice-icon-container home_dice-1"><i class="fas fa-dice-three home_dice-icon"></i></div>
                        <div class="home_dice-icon-container home_dice-2"><i class="fas fa-dice-four home_dice-icon"></i></div>
                        <div class="home_dice-icon-container home_dice-3"><i class="fas fa-dice-three home_dice-icon"></i></div>
                    </div>
                    <div class="main_card-text">
                        <h3 class="main_card-title2"><?= the_field('subtitle'); ?></h3>
                        <?= get_the_content(); ?>
                    </div>
                    <?php if(get_field("source_link", the_ID())): ?>
                    <div class="main_card-footer">
                        <a class="main_card-footer-link" href="<?= the_field("source_link"); ?>"><i class="fas fa-external-link-square-alt"></i> wikibooks.org</a>
                    </div>
                    <?php endif; ?>
                </div>
            </article>
        <?php endwhile; ?>
        <hr class="card-separation">
        <!-- --------------------------------- RULES SLIDES SECTION --------------------------------- -->
        <div class="slider-container main_card-container">
            <a href="<?= home_url() ?>/regles"><h2 class="main_card-title1">Les Règles du jeu</h2></a>
            
            <div class="slider">
                <?php
                $slideIndex = 0;
                while ($rulesPosts->have_posts()) :
                    $rulesPosts->the_post();
                    if (get_the_title() !== "Déroulement du jeu") :
                ?>
                        <div class="slide slide-1" data-slide-number="<?= $slideIndex; ?>">
                            <div class="slide-img-container">
                                <?php
                                $dicesValues = [
                                    get_field('value', "rules-dices" . '_' . get_field("first_dice_value")),
                                    get_field('value', "rules-dices" . '_' . get_field("second_dice_value")),
                                    get_field('value', "rules-dices" . '_' . get_field("third_dice_value"))
                                ];
                                $diceIndex = 1;
                                foreach ($dicesValues as $oneDiceValue) :
                                ?>
                                    <div class="home_dice-icon-container home_dice-<?= $diceIndex; ?>">
                                        <?php
                                        if ($oneDiceValue === "1") : ?>
                                            <i class="fas fa-dice-one home_dice-icon"></i>
                                        <?php elseif ($oneDiceValue === "2") : ?>
                                            <i class="fas fa-dice-two home_dice-icon"></i>
                                        <?php elseif ($oneDiceValue === "3") : ?>
                                            <i class="fas fa-dice-three home_dice-icon"></i>
                                        <?php elseif ($oneDiceValue === "4") : ?>
                                            <i class="fas fa-dice-four home_dice-icon"></i>
                                        <?php elseif ($oneDiceValue === "5") : ?>
                                            <i class="fas fa-dice-five home_dice-icon"></i>
                                        <?php elseif ($oneDiceValue === "6") : ?>
                                            <i class="fas fa-dice-six home_dice-icon"></i>
                                        <?php
                                        endif;
                                        ?>
                                    </div>
                                <?php $diceIndex++;
                                endforeach; ?>
                            </div>
                            <div class="slide-content">
                                <h3 class="main_card-title2"><?= the_title(); ?></h3>
                                <p class="slide-text-content"><?= get_field("subtitle"); ?></p>
                            </div>
                        </div>
                <?php $slideIndex++;
                    endif; endwhile; ?>
            </div>
            <div class="slider-buttons-container">
                <?php
                $slideIndex = 0;
                while ($rulesPosts->have_posts()) :
                    $rulesPosts->the_post();
                    if (get_the_title() !== "Déroulement du jeu") :
                ?>
                        <div class="slider-button" data-slide-button-number="<?= $slideIndex; ?>"></div>
                <?php
                        $slideIndex++;
                    endif;
                endwhile;
                ?>
                <!-- <div class="slider-button" data-slide-button-number="1"></div>
                <div class="slider-button" data-slide-button-number="2"></div>
                <div class="slider-button" data-slide-button-number="3"></div>
                <div class="slider-button" data-slide-button-number="4"></div> -->
            </div>
        </div>
    </section>
</main>
<!-- ------------------------------------------ -->
<?php
get_footer();
?>
<!-- ------------------------------------------ -->