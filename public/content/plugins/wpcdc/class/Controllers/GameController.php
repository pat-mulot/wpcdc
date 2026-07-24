<?php

namespace wpcdc\Controllers;

use WP_Query;

// use WP_User;
class GameController extends CoreController
{
    public function view()
    {
        $user = wp_get_current_user()->data;
        $statisticsArgs = array(
                'post_type' => 'statistics',
                'posts_per_page' => -1,
                'author' => $user->ID,
            );
        $profileArgs = array(
                'post_type' => 'player-profile',
                'posts_per_page' => -1,
                'author' => $user->ID,
            );
        $profile = get_posts($profileArgs);

        $iaArgs = array(
            'role'    => 'ia',
            'order'   => 'ASC'
        );
        $iaPlayers = get_users($iaArgs);

        $allIaProfiles = [];
        foreach ($iaPlayers as $ia) {
            $profileArgs = array(
                    'post_type' => 'player-profile',
                    'posts_per_page' => -1,
                    'author' => $ia->ID,
                );
            $allIaProfiles[] = get_posts($profileArgs);
        }
        $this->show(
            'views/game',
            [
                'user' => $user,
                'profile' => $profile[0],
                'iaPlayers' => $iaPlayers,
                'allIaProfiles' => $allIaProfiles,
            ]
        );
    }
    public function addScore()
    {
        // GETTING DATAS FROM FORM :
        $playerName = $_POST["nameToSend"];
        $playerScore = $_POST["scoreToSend"];
        $roundsToSend = $_POST["roundsToSend"];
        // FIGURES NB FIELDS :
        $cdcNb = $_POST["cdcNb"];
        $cvNb = $_POST["cvNb"];
        $chouetteNb = $_POST["chouetteNb"];
        $veluteNb = $_POST["veluteNb"];
        $suiteNb = $_POST["suiteNb"];
        $neantNb = $_POST["neantNb"];
        $sirotageNb = $_POST["sirotageNb"];
        $sirotageSuccessNb = $_POST["sirotageSuccessNb"];
        $grelotteNb = $_POST["grelotteNb"];
        $grelotteFailNb = $_POST["grelotteFailNb"];
        $bevueNb = $_POST["bevueNb"];
        $bevueFailNb = $_POST["bevueFailNb"];
        $siropGambleNb = $_POST["siropGambleNb"];
        $siropGambleSuccessNb = $_POST["siropGambleSuccessNb"];
        $gameNb = 1;
        // ---------------------------------------------- //
        // ADDING PLAYERS AND USERS SCORES TO SCORE PAGE //
        // -------------------------------------------- //
        $scoresCreateResult = wp_insert_post(
            [
                'post_title' => $playerName,
                'meta_input' => [
                    'total_score' => $playerScore,
                    'total_rounds' => $roundsToSend,
                ],
                'post_status' => 'publish',
                'post_type' => 'score',
            ]
        );
        if ($scoresCreateResult) {
            // UPDATE RANKS :
            $scoresRankArgs = array(
                'post_type' => 'score',
                'posts_per_page' => -1,
                'meta_key' => 'total_score',
                'orderby' => 'meta_value',
                'order' => 'DESC'
            );
            $scoresRank = get_posts($scoresRankArgs);
            $rankIndex = 1;
            foreach ($scoresRank as $postRank) {
                wp_update_post(
                    [
                        'ID' => $postRank->ID,
                        'meta_input' => [
                            'rank'   => $rankIndex,
                        ],
                        'post_status' => 'publish',
                        'post_type' => 'score',
                    ]
                );
                $rankIndex++;
            }
        }
        $authorId = wp_get_current_user()->ID;
        $profileArgs = array(
            'post_type' => 'player-profile',
            'posts_per_page' => -1,
            'author' => $authorId,
        );
        $profile = get_posts($profileArgs)[0];
        $newGameNb = (get_field("game_nb", $profile->ID) + $gameNb);
        $userProfileUpdateResult = wp_insert_post(
            [
                'post_type' => 'player-profile',
                'ID' => $profile->ID,
                'post_title' => $playerName,
                'meta_input' => [
                    "game_nb" => $newGameNb,
                ],
                'post_status' => 'publish',
            ]
        );
        // ------------------------------------------------- //
        // ADDING PLAYERS GAME STATISTICS TO STATISTIC PAGE //
        // ----------------------------------------------- //
        if (is_user_logged_in() === true) {
            // FIND IF CURRENT PLAYER HAVE STATS :
            $statsArgs = array(
                'post_type' => 'statistics',
                'posts_per_page' => -1,
                'author' => $authorId,
            );
            $currentPlayerStats = new WP_Query($statsArgs);
            $currentPlayerStatsId = $currentPlayerStats->posts[0]->ID;
            // getting previous stats :
            $previousScore = get_field('total_score', $currentPlayerStatsId);
            $previousRounds = get_field('total_rounds', $currentPlayerStatsId);
            $previousCdcNb = get_field('cdc_nb', $currentPlayerStatsId);
            $previousCvNb = get_field('cv_nb', $currentPlayerStatsId);
            $previousChouetteNb = get_field('chouette_nb', $currentPlayerStatsId);
            $previousVeluteNb = get_field('velute_nb', $currentPlayerStatsId);
            $previousSuiteNb = get_field('suite_nb', $currentPlayerStatsId);
            $previousNeantNb = get_field('neant_nb', $currentPlayerStatsId);
            $previousSirotageNb = get_field('sirotage_nb', $currentPlayerStatsId);
            $previousSirotageSuccessNb = get_field('sirotage_success_nb', $currentPlayerStatsId);
            $previousGrelotteNb = get_field('grelotte_nb', $currentPlayerStatsId);
            $previousGrelotteFailNb = get_field('grelotte_fail_nb', $currentPlayerStatsId);
            $previousBevueNb = get_field('bevue_nb', $currentPlayerStatsId);
            $previousBevueFailNb = get_field('bevue_fail_nb', $currentPlayerStatsId);
            $previousSiropGambleNb = get_field('sirop_gamble_nb', $currentPlayerStatsId);
            $previousSiropGambleSuccessNb = get_field('sirop_gamble_success_nb', $currentPlayerStatsId);

            // setting new stats :
            $newScore = $previousScore + $playerScore;
            $newRounds = $previousRounds + $roundsToSend;
            $newCdcNb = $previousCdcNb + $cdcNb;
            $newCvNb = $previousCvNb + $cvNb;
            $newChouetteNb = $previousChouetteNb + $chouetteNb;
            $newVeluteNb = $previousVeluteNb + $veluteNb;
            $newSuiteNb = $previousSuiteNb + $suiteNb;
            $newNeantNb = $previousNeantNb + $neantNb;
            $newSirotageNb = $previousSirotageNb + $sirotageNb;
            $newSirotageSuccessNb = $previousSirotageSuccessNb + $sirotageSuccessNb;
            $newGrelotteNb = $previousGrelotteNb + $grelotteNb;
            $newGrelotteFailNb = $previousGrelotteFailNb + $grelotteFailNb;
            $newBevueNb = $previousBevueNb + $bevueNb;
            $newBevueFailNb = $previousBevueFailNb + $bevueFailNb;
            $newSiropGambleNb = $previousSiropGambleNb + $siropGambleNb;
            $newSiropGambleSuccessNb = $previousSiropGambleSuccessNb + $siropGambleSuccessNb;

            // GETTING BEST PLAYER's RANK FROM SCORES POSTS :
            $rankToUpdateArgs = array(
                'post_type' => 'score',
                'posts_per_page' => -1,
                'author' => $authorId,
                'meta_key' => 'total_score',
                'orderby' => 'meta_value',
                'order' => 'DESC'
            );
            $rankToUpdate = get_posts($rankToUpdateArgs);
            $playerTopRank = get_field("rank", $rankToUpdate[0]->ID);
            if (isset($currentPlayerStats->posts[0])) {
                // UPDATING NEW STATS :
                $statsUpdateResult = wp_update_post(
                    [
                        'ID' => $currentPlayerStatsId,
                        'post_title' => $playerName,
                        'author' => $playerName,
                        'meta_input' => [
                            'total_score'   => $newScore,
                            'total_rounds'   => $newRounds,
                            'rank'   => $playerTopRank,
                            // TOTAL FIGURES NB :
                            'cdc_nb'   => $newCdcNb,
                            'cv_nb'   => $newCvNb,
                            'chouette_nb'   => $newChouetteNb,
                            'velute_nb'   => $newVeluteNb,
                            'suite_nb'   => $newSuiteNb,
                            'neant_nb'   => $newNeantNb,
                            'sirotage_nb'   => $newSirotageNb,
                            'sirotage_success_nb'   => $newSirotageSuccessNb,
                            'grelotte_nb'   => $newGrelotteNb,
                            'grelotte_fail_nb'   => $newGrelotteFailNb,
                            'bevue_nb'   => $newBevueNb,
                            'bevue_fail_nb'   => $newBevueFailNb,
                            'sirop_gamble_nb'   => $newSiropGambleNb,
                            'sirop_gamble_success_nb'   => $newSiropGambleSuccessNb,
                            // "game_nb" => $newGameNb,
                        ],
                        'post_status' => 'publish',
                        'post_type' => 'statistics',
                    ]
                );
            } else {
                // IF CURRENT PLAYER HAVE NO STATS :
                $statsCreateResult = wp_insert_post(
                    [
                        'post_title' => $playerName,
                        'author' => $playerName,
                        'meta_input' => [
                            'total_score'   => $playerScore,
                            'total_rounds'   => $roundsToSend,
                            // TOTAL FIGURES NB :
                            'cdc_nb'   => $cdcNb,
                            'cv_nb'   => $cvNb,
                            'chouette_nb'   => $chouetteNb,
                            'velute_nb'   => $veluteNb,
                            'suite_nb'   => $suiteNb,
                            'neant_nb'   => $neantNb,
                            'rank'   => $playerTopRank,
                            'sirotage_nb'   => $sirotageNb,
                            'sirotage_success_nb'   => $sirotageSuccessNb,
                            'grelotte_nb'   => $grelotteNb,
                            'grelotte_fail_nb'   => $grelotteFailNb,
                            'bevue_nb'   => $bevueNb,
                            'bevue_fail_nb'   => $bevueFailNb,
                            'sirop_gamble_nb'   => $siropGambleNb,
                            'sirop_gamble_success_nb'   => $siropGambleSuccessNb,
                            // "game_nb" => $gameNb,
                        ],
                        'post_status' => 'publish',
                        'post_type' => 'statistics',
                    ]
                );
            }
        }
        // redirecting to scores page at the end of the game:
        if ($scoresCreateResult) {
            wp_redirect(home_url() . '/scores');
        }
    }
}