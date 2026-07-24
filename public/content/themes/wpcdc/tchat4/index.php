<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="assets/css/reset.css" crossorigin="anonymous">
    <link rel="stylesheet" href="assets/css/style.css" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.3/css/all.css" integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk" crossorigin="anonymous">
</head>

<body>
    <div class="main_container">
        <div class="user_name-form-container">
            <p id="user_name"></p>
            <form action="" id="user_name-form">
                <input type="text" id="user_name-input" placeholder="Nom...">
                <button type="submit">
                    <div>
                        <img class="icon-sm" src="./assets/icons/check.svg" alt="">
                    </div>
                </button>
            </form>
        </div>
        <div class="users_list-container">
            <span>utilisateurs :</span>
            <ul class="users_list">
                <template id="listed_user-tpl">
                    <li class="listed_user" data-user-id=0></li>
                </template>
            </ul>
        </div>
        <div class="msg_list-container">
            <ul class="msg_list">
                <template id="listed_msg-tpl">
                    <li class="listed_msg">
                        <span class="sender-container">
                            <span class="sender"></span>
                            <span> :</span>
                        </span>
                        <p class="msg"></p>
                    </li>
                </template>
            </ul>
        </div>
        <div class="msg-form-container">
            <form action="" id="msg-form">
                <textarea id="msg-input"></textarea>
                <button type="submit"><img class="icon-sm" src="./assets/icons/paper-plane.svg" alt="">
                </button>
            </form>
        </div>
    </div>



    <!-- <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script> -->
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.4.1/socket.io.js"></script> -->
    <script src="https://pat-mulot.com:8080/socket.io/socket.io.js"></script>

    <script type="text/javascript" src="./assets/js/app.js"></script>
    <script type="text/javascript" src="./assets/js/login/userUtils.js"></script>
    <script type="text/javascript" src="./assets/js/messages/msgUtils.js"></script>
    <script type="text/javascript" src="./client.js"></script>
    <script type="text/javascript" src="./assets/js/login/clientLogin.js"></script>
    <script type="text/javascript" src="./assets/js/messages/clientMsg.js"></script>
</body>

</html>