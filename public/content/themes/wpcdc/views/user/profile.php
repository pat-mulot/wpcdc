<?php
get_header();
$user = $args["user"];
$statistics = $args["statistics"];
$statsFields = $args["statsFields"];
$bestScore = $args["bestScore"];
$profile = $args["profile"];
$gamePlayedNb = $args["gamePlayedNb"];
?>
<!-- ------------------------------------------ -->
<main class="main-container">
    <section class="main_section" style="background-image: url(<?= get_theme_file_uri(); ?>/assets/img/background_paper.jpg);">
        <article class="main_card-container">
            <div class="profile_card-header">
                <div class="profile_avatar">
                    <?php if (get_the_post_thumbnail_url($profile->ID)) : ?>
                        <div class="profile_card-img-container img_hover">
                            <img src="<?= get_the_post_thumbnail_url($profile->ID); ?>" alt="">
                        </div>
                    <?php else : ?>
                        <div class="profile_card-img_icon-container img_hover">
                            <div class="img_icon">
                                <i class="fas fa-user"></i>
                            </div>
                        </div>
                    <?php endif; ?>
                    <form class="profile_avatar-add">
                        <label for="file" class="icon-avatar-container">
                            <i class="fas fa-photo-video icon-avatar"></i>
                        </label>
                        <label>
                            <input type="file" id="file" />
                            <input v-model="imageId" type="hidden" />
                        </label>
                    </form>
                    <div class="avatar-preview_img-container">
                        <div class="avatar-preview" style="background-image: url(<?= get_theme_file_uri(); ?>/assets/img/background_paper.jpg);">
                            <div class="cancel-btn-container">
                                <div class="cancel-btn">
                                    <span>X</span>
                                </div>
                            </div>
                            <!-- <div class="avatar-preview"> -->
                            <img v-if="image" src="<?= get_the_post_thumbnail_url($profile->ID); ?>" id="avatar-preview_img" />
                            <form action="<?= home_url(); ?>/user/save-img/" method="POST" class="profile_avatar-save">
                                <input type="hidden" name="profileId" id="profileId" value="<?= $profile->ID; ?>">
                                <input type="hidden" name="imageId" id="imageId" value="">
                                <div class="profile_avatar-save-btns">
                                    <div class="submit-btn">
                                        <input type="submit" id="submit-image" value="Valider">
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <h1 class="main_card-title1">
                    <?= $user->display_name; ?>
                </h1>
                <span class="main_card-title2 statistics-title <?= $statsFields["classRank"]; ?>">
                    Classement : <?= get_field("rank"); ?>
                    <?php if (get_field("rank") <= 3) : ?>
                        <span class="<?= $statsFields["classRank"]; ?>">
                            <i class="fas fa-trophy"></i>
                        </span>
                    <?php endif; ?>
                </span>
            </div>
            <!-- <div class="stats_heading">
            </div> -->
            <hr class="stats_title-separation">
            <ul class="statistics_list">
                <li class="statistics-row">
                    <div class="statistics-name">Nombre de parties jouées : </div>
                    <span class="statistics-text"><?= $gamePlayedNb; ?></span>
                </li>
                <!-- <hr class="stats-separation"> -->
                <li class="statistics-row">
                    <div class="statistics-name">Score total : </div>
                    <span class="statistics-text"><?= get_field("total_score"); ?><em>pts</em></span>
                </li>
                <!-- <hr class="stats-separation"> -->
                <li class="statistics-row">
                    <div class="statistics-name">Nombre de tours total : </div>
                    <span class="statistics-text"><?= get_field("total_rounds"); ?></span>
                </li>
                <!-- <hr class="stats-separation"> -->
                <li class="statistics-row">
                    <div class="statistics-name">Moyenne : </div>
                    <span class="statistics-text"><?= round($statsFields["ptsPerRounds"], 2); ?><em>pts/tr</em></span>
                </li>
                <!-- <hr class="stats-separation"> -->
                <li class="statistics-row">
                    <div class="statistics-name">Meilleur score : </div>
                    <span class="statistics-text"><?= $bestScore; ?><em>pts</em></span>
                </li>
            </ul>
            <hr class="stats_title-separation">
            <div class="main_card-footer">
                <a href="<?= home_url(); ?>/statistics/<?= $user->ID; ?>" class="main_card-footer-link">voir les statistiques</a>

            </div>
        </article>
    </section>
    <?php
    ?>
</main>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<!-- ------------------------------------------ -->
<?php
get_footer();
?>