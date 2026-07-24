<?php
// -------------------- //
// HOME CUSTOM POSTS : //
// ------------------ //
$homePostsArgs = array(
    'post_type' => 'home-post',
    'posts_per_page' => -1,
);
$homePosts = new WP_Query($homePostsArgs);
// ---------------------------------- //
// HOME RULES CUSTOM POSTS (slider): //
// -------------------------------- //
$rulesPostsArgs = array(
    'post_type' => 'rules-post',
    'posts_per_page' => -1,
    'order' => 'ASC',
);
$rulesPosts = new WP_Query($rulesPostsArgs);
// -------------------------------- //
// HOME CUSTOM POSTS best scores : //
// ------------------------------ //
$scoresPostsArgs = array(
    'post_type' => 'score',
    'posts_per_page' => 3,
    'meta_key' => 'total_score',
    'orderby' => 'meta_value',
    'order' => 'DESC',
);
$scoresPosts = new WP_Query($scoresPostsArgs);
// ------------------------------------------ //
// HOME CUSTOM POSTS best scores from week : //
// ---------------------------------------- //
$weekScoresArgs = array(
    'post_type' => 'score',
    'posts_per_page' => 3,
    'meta_key' => 'total_score',
    'orderby' => 'meta_value',
    'order' => 'DESC',
    'post_status'       => array('publish'),
    'meta_query'        => array(
        'after'     => date('Y-m-d',strtotime('previous week Sunday')),
        'before'    => date('Y-m-d',strtotime('previous week Sunday')),
    )
);
$weekScoresPosts = new WP_Query($weekScoresArgs);

// -------------------- //
// FIND BEST GAMBLER : //
// ------------------ //
// # 1 getting all stats posts
$allStatsArgs = array(
    'post_type' => 'statistics',
    'posts_per_page' => -1,
    // 'meta_key' => 'sirop_gamble_success_nb',
    // 'orderby' => 'meta_value',
    // 'order' => 'DESC',
    'post_status'       => array('publish'),
    // 'meta_query'        => array(
    //     'after'     => date('Y-m-d',strtotime('previous week Sunday')),
    //     'before'    => date('Y-m-d',strtotime('previous week Sunday')),
    // )
);
$allStats = get_posts($allStatsArgs);
//  # 2 for each stats, getting all gamble stats :
// $siropGambleStat = [];
$topStat = 0;
$topGamblerPost;
$topGambleNb = 0;
$topGambleSuccessNb = 0;
foreach ($allStats as $singleStatsPost) {
    if (get_field("sirop_gamble_nb", $singleStatsPost->ID) !== null && get_field("sirop_gamble_nb", $singleStatsPost->ID) > 0) {
        $siropGambleStat = (get_field("sirop_gamble_success_nb", $singleStatsPost->ID) * 100) / get_field("sirop_gamble_nb", $singleStatsPost->ID);
        if ($siropGambleStat > $topStat) {
            $topStat = $siropGambleStat;
            $topGambleNb = get_field("sirop_gamble_nb", $singleStatsPost->ID);
            $topGambleSuccessNb = get_field("sirop_gamble_success_nb", $singleStatsPost->ID);
            // getting the best gambler's stat post id :
            $topGamblerPost = $singleStatsPost;
        };
    };
};
// -------------------- //
// FIND BEST GAMBLER OF THE WEEK: //
// ------------------ //
// # 1 getting all stats posts
$allStatsWeekArgs = array(
    'post_type' => 'statistics',
    'posts_per_page' => -1,
    // 'meta_key' => 'sirop_gamble_success_nb',
    // 'orderby' => 'meta_value',
    // 'order' => 'DESC',
    'post_status' => array('publish'),
    'meta_query' => array(
        'after' => date('Y-m-d',strtotime('previous week Sunday')),
        'before' => date('Y-m-d',strtotime('previous week Sunday')),
    )
);
$allStatsWeek = get_posts($allStatsWeekArgs);
//  # 2 for each stats, getting all gamble stats :
// $siropGambleStat = [];
$topStatWeek = 0;
$topGamblerPostWeek;
$topGambleNbWeek = 0;
$topGambleSuccessNbWeek = 0;
foreach ($allStatsWeek as $singleStatsPost) {
    if (get_field("sirop_gamble_nb", $singleStatsPost->ID) !== null && get_field("sirop_gamble_nb", $singleStatsPost->ID) > 0) {
        $siropGambleStat = (get_field("sirop_gamble_success_nb", $singleStatsPost->ID) * 100) / get_field("sirop_gamble_nb", $singleStatsPost->ID);
        if ($siropGambleStat > $topStatWeek) {
            $topStatWeek = $siropGambleStat;
            $topGambleNbWeek = get_field("sirop_gamble_nb", $singleStatsPost->ID);
            $topGambleSuccessNbWeek = get_field("sirop_gamble_success_nb", $singleStatsPost->ID);
            // getting the best gambler's stat post id :
            $topGamblerPostWeek = $singleStatsPost;
        };
    };
};