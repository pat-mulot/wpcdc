userUtils.init();
msgUtils.init();

const port = 8080;
// se connecter au port :
    const hostUrl = "https://pat-mulot.com";
    const socket = io.connect(
        hostUrl + ":" + port,
        {
            transports: ["websocket"],
            upgrade: false,

        }
    )