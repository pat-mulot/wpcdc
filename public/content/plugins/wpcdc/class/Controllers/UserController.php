<?php

namespace wpcdc\Controllers;

use WP_Query;
use WP_User;

class UserController extends CoreController
{
    public function registration($error = false)
    {
        $registerForm = true;
        $error_login = $_GET["login"];

        $this->show(
            'views/user/registration',
            [
                'registerForm' => $registerForm,
                "error" => $error,
                "error_login" => $error_login,
            ]
        );
    }
    public function add()
    {
        $userName = $_POST["user_name-registration"];
        $userPassword = $_POST["user_password-registration"];
        $userEmail = $_POST["user_email-registration"];
        $userRole = $_POST["user_role-registration"];
        $userCreateResult = wp_create_user(
            $userName,
            $userPassword,
            $userEmail,
        );
        if (is_int($userCreateResult)) {
            $user = new WP_User($userCreateResult);
            $user->remove_role('subscriber');
            $user->add_role($userRole);
            // CREATE THE CUSTOM USER PROFILE
            $statsCreateResult = wp_insert_post(
                [
                    'post_title' => $userName,
                    'post_author' => $userCreateResult,
                    'post_status' => 'publish',
                    'post_type' => 'player-profile',
                ]
            );
        } else {
            $error = "Une erreur est survenue, vérifiez que vous avez correctement remplit les champs.";
            $this->registration($error);
            return [
                'success' => false,
                'error' => $userCreateResult
            ];
        }
        $this->login();
    }
    public function login()
    {
        $registerForm = false;
        $this->show(
            'views/user/registration',
            [
                'registerForm' => $registerForm,
            ]
        );
    }
    public function profile()
    {
        if (is_user_logged_in()) {
            $user = wp_get_current_user()->data;
            $statisticsArgs = array(
                'post_type' => 'statistics',
                'posts_per_page' => -1,
                'author' => $user->ID,
            );
            $statistics = new WP_Query($statisticsArgs);
            $statistics->the_post();
            // CREATING CSS CLASS FOR RANKS :
            $statsFields["rank"] = get_field("rank");
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
            if (get_field("total_rounds")) {
                // $statsFields["rounds"] = intval(get_field("total_rounds"));
                $statsFields["ptsPerRounds"] = intval(get_field("total_score")) / intval(get_field("total_rounds"));
            } else {
                // $statsFields["rounds"] = 0;
                $statsFields["ptsPerRounds"] = 0;
            };
            // GETTING ALL SCORES FROM USER TO FIND THE BEST :
            $allScoresArgs = array(
                'post_type' => 'score',
                'posts_per_page' => -1,
                'author' => $user->ID,
                'meta_key' => 'total_score',
                'orderby' => 'meta_value',
                'order' => 'DESC'
            );
            $allScores = get_posts($allScoresArgs);
            $bestScore = get_field("total_score", $allScores[0]->ID);
            $profileArgs = array(
                'post_type' => 'player-profile',
                'posts_per_page' => -1,
                'author' => $user->ID,
            );
            $profile = get_posts($profileArgs);
            $gamePlayedNb = get_field("game_nb", $profile[0]->ID);
            if ($gamePlayedNb === null) {
                $gamePlayedNb = 0;
            }
            $this->show(
                'views/user/profile',
                [
                    'user' => $user,
                    'statistics' => $statistics,
                    'statsFields' => $statsFields,
                    'bestScore' => $bestScore,
                    'profile' => $profile[0],
                    'gamePlayedNb' => $gamePlayedNb,
                ]
            );
        } else {
            $registerForm = true;
            $this->show(
                'views/user/registration',
                [
                    'registerForm' => $registerForm,
                ]
            );
        };
    }
    public function saveImage()
    {
        $profileId = intval(sanitize_text_field($_POST["profileId"]));
        $imageId = intval(sanitize_text_field($_POST["imageId"]));
        if (is_int($profileId)) {
            if ($imageId) {
                set_post_thumbnail(
                    $profileId,
                    $imageId
                );
            }
        }
        wp_redirect(home_url() . "/user/profile/");
    }
}
