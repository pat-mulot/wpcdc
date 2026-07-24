<?php
get_header();
include __DIR__ . '/includes/datas/data-regles.php';
?>
<!-- ------------------------------------------ -->
<main class="main-container">
    <nav class="page_links">
        <ul>
            <?php while ($postsFromPage->have_posts()) :
            $postsFromPage->the_post();
            if (get_the_title() !== "Déroulement du jeu") : ?>
                <li class="page_link">
                    <a href="#<?= the_title(); ?>"><?= the_title(); ?></a>
                </li>
            <?php endif; endwhile; ?>
        </ul>
        <div class="scroll_button-left"><</div>
        <div class="scroll_button-right">></div>
    </nav>
    <section class="main_section" style="background-image: url(<?= get_theme_file_uri(); ?>/assets/img/background_paper.jpg);">
        <?php while ($postsFromPage->have_posts()) :
            $postsFromPage->the_post(); ?>
            <article class="main_card-container" id="<?= the_title(); ?>">
                <h2 class="main_card-title1"><?= the_title(); ?></h2>
                <!-- <div class="main-card-content">
                </div> -->
                <div class="main-card-content">
                <?php if (get_field('value', "rules-dices" . '_' . get_field("first_dice_value"))) : ?>
                    <div class="home_dices-image">
                        <?php
                        $dicesValues = [
                            get_field('value', "rules-dices" . '_' . get_field("first_dice_value")),
                            get_field('value', "rules-dices" . '_' . get_field("second_dice_value")),
                            get_field('value', "rules-dices" . '_' . get_field("third_dice_value"))
                        ];
                        $diceIndex = 1;
                        foreach ($dicesValues as $oneDiceValue) : ?>
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
                        <?php
                            $diceIndex++;
                        endforeach;
                        ?>
                    </div>
                    <?php
                    endif;
                    ?>
                    <div class="main_card-text">
                        <?php if (get_field('subtitle')) : ?>
                        <h3 class="main_card-title2"><?= the_field('subtitle'); ?></h3>
                        <?php endif; ?>
                        <?= get_the_content(); ?>
                    </div>
                    <div class="main_card-footer">
                        <a class="main_card-footer-link" href="<?= the_field('source_link'); ?>"><i class="fas fa-external-link-square-alt"></i> documentation</a>
                    </div>
                </div>
            </article>
            <hr class="card-separation">
        <?php
        endwhile;
        ?>
    </section>
</main>
<!-- ------------------------------------------ -->
<?php
get_footer();
?>