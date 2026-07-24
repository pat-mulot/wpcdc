<?php
namespace wpcdc;

use WP_REST_Request;
// use WP_User;

class Api
{
    /**
     * @var string
     */
    protected $baseURI;

    public function __construct()
    {
        add_action(
            'rest_api_init',
            [$this, 'initialize']
        );
    }

    public function initialize()
    {
        // -------------- CUSTOM USER ENDPOINTS -------------- //
        register_rest_route(
            'wpcdc/v1/',
            '/upload-image',
            [
                'methods' => 'post',
                'callback' => [$this, 'uploadProfileImage']
            ]
        );
    }
    // -------------- CUSTOM USER GETTERS & SETTERS -------------- //
    public function uploadProfileImage(WP_REST_Request $request)
    {
        // correspond au nom de la variable utilisée pour envoyer l'image
        $imageFileIndex = 'image';
        // récupération des informations concernant l'image uploadée
        $imageData = $_FILES[$imageFileIndex];
        // récupération du chemin fichier dans lequel est stockée l'image qui vient d'être uploadée
        $imageSource = $imageData['tmp_name'];
        // récupération es informations du dossier dans lequel wp stocke les fichiers uploadés
        $destination = wp_upload_dir();
        // dossier worpdress dans lequel nous allons stocker l'image
        $imageDestinationFolder = $destination['path'];
        // DOC nettoyage d'un nom de fichier avec wp https://developer.wordpress.org/reference/functions/sanitize_file_name/
        $imageName =  sanitize_file_name(
            md5(uniqid()) . '-' . // génération d'une partie aléatoire pour ne pas écraser de fichier existant
            $imageData['name']);
        $imageDestination = $imageDestinationFolder . '/' . $imageName;
        // on déplace le fichier uploadé dans le dossier de stokage de wp
        $success = move_uploaded_file($imageSource, $imageDestination);
        // si le déplacement du fichier à bien fonctionné
        if($success) {
            // récupération des informations dont wordpress a besoin pour identifier le type de fichier uploadé
            $imageType =  wp_check_filetype( $imageDestination, null);
            // préparation des informations nécessaires pour créer le media
            $attachment = array(
                'post_mime_type' => $imageType['type'],
                'post_title' => $imageName,
                'post_content' => '',
                'post_status' => 'inherit'
            );
            // on enregistre l'image dans wordpress
            $attachmentId = wp_insert_attachment( $attachment, $imageDestination );
            if(is_int($attachmentId)) {
                // youpi merci wordpress...
                require_once( ABSPATH . 'wp-admin/includes/image.php' );
                // DOC on génère les metadatas pour le média https://developer.wordpress.org/reference/functions/wp_generate_attachment_metadata/
                $metadata = wp_generate_attachment_metadata( $attachmentId, $imageDestination );
                // on met à jour les metadata du media
                wp_update_attachment_metadata( $attachmentId, $metadata );
                return [
                    'status' => 'success',
                    'image' => [
                        'url' => $destination['url'] . '/' . $imageName,
                        'id' => $attachmentId
                    ]
                ];
            }
            else {
                return [
                    'status' => 'failed'
                ];
            }
        }
        return [
            'status' => 'failed'
        ];
    }
}
