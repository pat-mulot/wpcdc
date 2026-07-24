<?php
namespace wpcdc;
use WP_User;
class Registration 
{
    public function __construct() {
        // customization du formulaire :
        // hook pour le formulaire :
        add_action (
            "register_form",
            [$this, "customizeRegisterForm"]
        );
        add_filter (
            "registration_errors",
            [$this, "checkRegistration"]
        );
        add_filter(
            "user_register",
            [$this, "customUserRegistration"]
            )
        ;
    }
    // ========================= SANITIZING : =========================
    // https://developer.wordpress.org/plugins/security/securing-input/
    // ================================================================
    public function checkRegistration($errors) {
        // var_dump($_POST); die();// pour voir les entrées du formulaire
        $role = filter_input(INPUT_POST, "user_role-registration");
        if(!$role) {
            $errors->add(
                // identifiant de l'erreur
                "NOM_DE_MON_ERREUR", // je choisis le nom de l'erreur
                "Vous devez ne pas faire d'erreur...", // définir le message d'erreur à retourner
            );
        }
        // $password = filter_input(INPUT_POST, "user_email-registration");
        // if(!$this->checkPassword($password)) {
        //     $errors->add(
        //         "user_password_invalid",
        //         "Invalid password or username",
        //     );
        // }
        $password = filter_input(INPUT_POST, "user_password-registration");
        if(!$this->checkPassword($password)) {
            $errors->add(
                "user_password_invalid",
                "Invalid password or username",
            );
        }
        return $errors;
    }
    public function checkPassword($password) {
        // // un pass word doit avoir :
        // // mini 8 caractères de long,
        // // des minuscules et des majuscules,
        // // au moins un chiffre,
        // // un caractère spécial.
        // if(mb_strlen($password) < 8) {
        //     return false;
        // }
        // // recherche de caractère dans une chaine de caractère :
        // // # 1, si je n'ai pas au moins un caractère minuscule entre "a" et "z"
        // if(!preg_match("/[a-z]+/", $password)) {
        //     return false;
        // }
        // // # 2, si je n'ai pas au moins un caractère majuscule entre "A" et "Z"
        // if(!preg_match("/[A-Z]+/", $password)) {
        //     return false;
        // }
        // // # 3, si je n'ai pas au moins un caractère minuscule entre "0" et "9"
        // if(!preg_match("/[0-9]+/", $password)) {
        //     return false;
        // }
        // // INFO :
        // // REGEX VERIF, pour savoir si il y a au moins un caractère spéciale, il faut vérifier avec "\W" tout ce qui n'est pas un caractère lettre MAJ/min ou un chiffre
        // // (ou avec "\w" tout ce qui EST un caractère min/MAJ ou un chiffre)
        // if(!preg_match("/\W/", $password)) {
        //     return false;
        // }
        return true;
    }
    public function customUserRegistration($userId) {
        $registerPassword = filter_input(INPUT_POST, "user_password-registration");
        // $registerEmail = filter_input(INPUT_POST, "user_email-registration");
        $selectedRole = filter_input(INPUT_POST, "user_prole-registration");
        $userObject = new WP_User($userId);
        wp_set_password($registerPassword, $userId);
        $userObject->remove_role("subscriber");
        // if($selectedRole === "verif nom de role existant") {
        $userObject->add_role($selectedRole);
        // $userCreateResult = wp_create_user(
        //     $userName,
        //     $userPassword,
        //     $userEmail,
        // );
        // }
        // A PARTIR D'ICI : il est possible d'ajouer une page de profile pour l'utilisateur nouvellement enregistré qui serait un CPT (à définir en amont) par le biais d'un "wp_insert_post("tous les détails relatifs au CPT profil utilisateur")
    }
}