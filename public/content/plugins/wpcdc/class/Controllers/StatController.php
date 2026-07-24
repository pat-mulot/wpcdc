<?php

namespace wpcdc\Controllers;

use WP_Query;
// use WP_User;

class StatController extends CoreController
{
    public function view()
    {
        $router = $this->router;
        $authorId = $router->match()["params"]["id"];
        if ($authorId === null) {
            $authorId = 1;
        }
        $statisticsArgs = array(
            'post_type' => 'statistics',
            'posts_per_page' => -1,
            'author' => $authorId,
        );
        $statistics = new WP_Query($statisticsArgs);
        $statistics->the_post();
        // CREATING CSS CLASS FOR RANKS :
        $statsFields = [];
        if (get_field("rank") == "1") {
            $statsFields["classRank"] = "top-1";
        } else if (get_field("rank") == "2") {
            $statsFields["classRank"] = "top-2";
        } else if (get_field("rank") == "3") {
            $statsFields["classRank"] = "top-3";
        } else {
            $statsFields["classRank"] = "";
        }
        // GETTING ACF CUSTOM FIELDS AND CALCS :
        $statsFields["rank"] = get_field("rank");
        if (get_field("total_score")) {
            $statsFields["score"] = intval(get_field("total_score"));
        } else {
            $statsFields["score"] = 0;
        };
        if (get_field("total_rounds")) {
            $statsFields["rounds"] = intval(get_field("total_rounds"));
            $statsFields["ptsPerRounds"] = intval(get_field("total_score")) / intval(get_field("total_rounds"));
        } else {
            $statsFields["rounds"] = 0;
            $statsFields["ptsPerRounds"] = 0;
        };
        if (get_field("cdc_nb")) {
            $statsFields["cdcNb"] = intval(get_field("cdc_nb"));
            $statsFields["cdcStat"] = (intval(get_field("cdc_nb") * 100)) / intval(get_field("total_rounds"));
        } else {
            $statsFields["cdcNb"] = 0;
            $statsFields["cdcStat"] = 0;
        };
        if (get_field("cv_nb")) {
            $statsFields["cvNb"] = intval(get_field("cv_nb"));
            $statsFields["cvStat"] = (intval(get_field("cv_nb")) * 100) / intval(get_field("total_rounds"));
        } else {
            $statsFields["cvNb"] = 0;
            $statsFields["cvStat"] = 0;
        };
        if (get_field("chouette_nb")) {
            $statsFields["chouetteNb"] = intval(get_field("chouette_nb"));
            $statsFields["chouetteStat"] = (intval(get_field("chouette_nb")) * 100) / intval(get_field("total_rounds"));
        } else {
            $statsFields["chouetteNb"] = 0;
            $statsFields["chouetteStat"] = 0;
        };
        if (get_field("velute_nb")) {
            $statsFields["veluteNb"] = intval(get_field("velute_nb"));
            $statsFields["veluteStat"] = (intval(get_field("velute_nb")) * 100) / intval(get_field("total_rounds"));
        } else {
            $statsFields["veluteNb"] = 0;
            $statsFields["veluteStat"] = 0;
        };
        if (get_field("suite_nb")) {
            $statsFields["suiteNb"] = intval(get_field("suite_nb"));
            $statsFields["suiteStat"] = (intval(get_field("suite_nb")) * 100) / intval(get_field("total_rounds"));
        } else {
            $statsFields["suiteNb"] = 0;
            $statsFields["suiteStat"] = 0;
        };
        if (get_field("neant_nb")) {
            $statsFields["neantNb"] = intval(get_field("neant_nb"));
            $statsFields["neantStat"] = (intval(get_field("neant_nb")) * 100) / intval(get_field("total_rounds"));
            $statsFields["roundSuccess"] = $statsFields["rounds"] - $statsFields["neantNb"];
            $statsFields["successStats"] = (($statsFields["rounds"] - $statsFields["neantNb"]) * 100) / $statsFields["rounds"];
        } else {
            $statsFields["neantNb"] = 0;
            $statsFields["neantStat"] = 0;
            $statsFields["roundSuccess"] = 0;
            $statsFields["successStats"] = 0;
        };
        if (get_field("suite_nb")) {
            $statsFields["gameNb"] = intval(get_field("game_nb"));
        } else {
            $statsFields["gameNb"] = 0;
        };
        if (get_field("sirotage_nb")) {
            $statsFields["sirotageNb"] = intval(get_field("sirotage_nb"));
            $statsFields["sirotageSuccessNb"] = intval(get_field("sirotage_success_nb"));
            if ($statsFields["sirotageNb"] === 0 && $statsFields["sirotageSuccessNb"] === 0) {
                $statsFields["sirotageSuccessStats"] = 0;
            } else {
                $statsFields["sirotageSuccessStats"] = $statsFields["sirotageSuccessStats"] = ($statsFields["sirotageSuccessNb"] * 100) / $statsFields["sirotageNb"];
            }
        } else {
            $statsFields["sirotageNb"] = 0;
            $statsFields["sirotageSuccessNb"] = 0;
            $statsFields["sirotageSuccessStats"] = 0;
        };
        if (get_field("grelotte_nb")) {
            $statsFields["grelotteNb"] = intval(get_field("grelotte_nb"));
            $statsFields["grelotteFailNb"] = intval(get_field("grelotte_fail_nb"));
            if ($statsFields["grelotteNb"] === 0 && $statsFields["grelotteFailNb"] === 0) {
                $statsFields["grelotteFailStats"] = 0;
            } else {
                $statsFields["grelotteFailStats"] = $statsFields["grelotteFailStats"] = ($statsFields["sirotageSuccessNb"] * 100) / $statsFields["grelotteNb"];
            }
        } else {
            $statsFields["grelotteNb"] = 0;
            $statsFields["grelotteFailNb"] = 0;
            $statsFields["grelotteFailStats"] = 0;
        };
        if (get_field("sirop_gamble_nb")) {
            $statsFields["siropGambleNb"] = intval(get_field("sirop_gamble_nb"));
            $statsFields["siropGambleSuccessNb"] = intval(get_field("sirop_gamble_success_nb"));
            $statsFields["siropGambleSuccessStats"] = $statsFields["siropGambleSuccessStats"] = ($statsFields["siropGambleSuccessNb"] * 100) / $statsFields["siropGambleNb"];
        } else {
            $statsFields["siropGambleNb"] = 0;
            $statsFields["siropGambleSuccessNb"] = 0;
            $statsFields["sirotageSuccessStats"] = 0;
        };
        $allScoresArgs = array(
            'post_type' => 'score',
            'posts_per_page' => -1,
            'author' => $authorId,
            'meta_key' => 'total_score',
            'orderby' => 'meta_value',
            'order' => 'DESC'
        );
        $allScores = get_posts($allScoresArgs);
        $bestScore = get_field("total_score", $allScores[0]->ID);
        $profileArgs = array(
            'post_type' => 'player-profile',
            'posts_per_page' => -1,
            'author' => $authorId,
        );
        $profile = get_posts($profileArgs);
        $gamePlayedNb = get_field("game_nb", $profile[0]->ID);
        if ($gamePlayedNb === null) {
            $gamePlayedNb = 0;
        }
        // $player = get_user_by("id", $authorId);
        $this->show(
            'views/statistics',
            [
                'statistics' => $statistics,
                'statsFields' => $statsFields,
                'bestScore' => $bestScore,
                'gamePlayedNb' => $gamePlayedNb,
            ]
        );
    }
}
