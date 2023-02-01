# Moralis-express

Demo app that calls moralis stream API and process subsequent blockchain events.



## This file build using this stack
Node.js/Express
Moralis Stream API


## To use
(1) follow setup page at [ngork](https://dashboard.ngrok.com/get-started/setup)
```
ngrok config add-authtoken xxx
ngrok http 5001
```

(2) install and start package
```
npm install
npm start
```

(3) Then navigate to localhost:5001
Open in browser
```
http://localhost:5001/
```
And observe
```
Hello world Ethan, this is the root point of webhook subscriber!
```
