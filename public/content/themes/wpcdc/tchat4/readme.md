vérifier script localhost:8080 dans index.php
```
    <script type="text/javascript" src="http://localhost:8080/socket.io/socket.io.js"></script>
```


```
sudo kill -9 `sudo lsof -t -i:8080`
```


```
curl "https://pat-mulot.com/socket.io/?EIO=4&transport=polling"
```

