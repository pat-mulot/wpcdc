<?php
// ------------------------------------- //
// GETTING ALL CUSTOM POSTS FROM TYPE : //
// ----------------------------------- //
$scoresPostsArgs = array(
    'post_type' => 'score',
    'posts_per_page' => -1,
    'meta_key'            => 'total_score',
    'orderby'            => 'meta_value',
    'order'                => 'DESC',
);
$scoresPosts = new WP_Query($scoresPostsArgs);
// // ------------------------------------- //
// // GETTIN THE STATISTICS POST BY AUTHOR : //
// // ----------------------------------- //
// function getStatisticsByAuthor($id) {
//     $statisticPostsArgs = array(
//         'post_type' => 'statistics',
//         'posts_per_page' => -1,
//         'author' => $id,
//     );
//     $statisticPosts = get_post($statisticPostsArgs);
//     // var_dump($statisticLink);
//     return $statisticPosts;
// };
