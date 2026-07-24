<?php
// $router = $this->router;
// $currentPageName = str_replace(
//     '/index.php',
//     '',
//     $_SERVER['SCRIPT_NAME']
// );
// ------------------------------------- //
// GETTING ALL CUSTOM POSTS FROM TYPE : //
// ----------------------------------- //
$postsFromPageArgs = array(
    'post_type' => 'rules-post',
    'posts_per_page' => -1,
    'order' => 'ASC',
    // 'tax_query' => array(
    //     array(
    //         'taxonomy' => "rules-dices",
    //         'field' => 'slug',
    //         'terms' => $postType,
    //     )
    // )
);
$postsFromPage = new WP_Query($postsFromPageArgs);
        // var_dump($postsFromPage);
        // foreach($postsFromPage as $onePost) {
        //     var_dump($onePost);
        // }

        // $dicesValuesTermsArgs = array(
        //             'taxonomy' => "rules-dices",
        //             'hide_empty' => false,
        // );
        // $dicesValuesTerms = get_terms($dicesValuesTermsArgs);
        // var_dump($dicesValuesTerms);
