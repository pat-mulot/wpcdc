// const axios = require('axios').default;
// import axios from 'axios';
// import storage from '../plugins/storage.js';
const userService = {
    // setting base URIs :
    baseURI: wpcdcConfig.baseURI,
    //! ---------------------------------------------------------------------------
    // enpoints URI :
    wpApiRestURI: "/wp-json/wp/v2",
    customEndPointURI: "/wp-json/wpcdc/v1",
    embeddedURI: "?_embed=true",
    login: async function(login, password) {
        let response = await axios.post(
            userService.baseURI + userService.jwtApiURI + '/token', {
                username: login,
                password: password
            }
        ).catch(function() {
            return false;
        });
        return response.data;
    },
    //   isConnected: async function () {
    //     const userData = storage.get('data_from_user');
    //     if (userData != null) {
    //       const token = userData.token;
    //       if (token) {
    //         const options = {
    //           headers: {
    //             Authorization: 'Bearer ' + token
    //           }
    //         };
    //         const response = await axios.post(
    //           userService.baseURI + userService.jwtApiURI + '/token/validate',
    //           null,
    //           options
    //         ).catch(function () {
    //           return false;
    //         });
    //         return response.data;
    //       }
    //     }
    //     return false;
    //   },
    //   logout: function () {
    //     storage.unset('data_from_user');
    //   },


    async uploadProfileImage(image) {
        console.log("uploadProfileImage")

        let formData = new FormData();
        formData.append("image", image);

        // const userData = storage.get('data_from_user');
        // const token = userData.token;
        const result = await axios.post(
            userService.baseURI + userService.customEndPointURI + '/upload-image',
            formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // 'Authorization': 'Bearer ' + token
                }
            }
        );
        console.log("result", result)
        return result.data;
    },
};