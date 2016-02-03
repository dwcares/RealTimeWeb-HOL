 # Hands on: Real-time Chess
 ### with WebSockets and Socket.io
 ![Tony Fischer Chess in Washington Square Park (Flickr)](https://c2.staticflickr.com/4/3047/2566070837_8ed5848d40_z.jpg?zz=1)

In this hands on lab, we'll make a multiplayer chess game that where your moves are shown on your opponent's screen in real-time. Instantly. Checkmate.

<iframe src="https://channel9.msdn.com/Shows/Lets-dev-this/LDT1605/player" width="640" height="360" frameborder="0" allowfullscreen="allowfullscreen"></iframe>


 # Lab Overview
 
 ## Learning Objectives
After completing the exercises in this lab, you will be able to:
* Create a Node.js web app, run, and debug it locally
* Create a basic a Socket.io server
* Publish your server to Azure from GitHub

Estimated time to complete this lab: 60 minutes

 ## Prerequisite software
In order to complete the lab, you need the following pre-requisites

* Windows 10, Mac OS 10 Yosemite, or Linux
* [Visual Studio Code](http://code.visualstudio.com)
* [Node.js](https://nodejs.org)


 ## Prerequisite online accounts
In order to complete the lab, you need the following prerequisite online accounts
* [Microsoft account](http://accounts.microsoft.com) – Nseeded to use Microsoft Azure
* [Microsoft Azure Subscription](http://azure.com) – A free trial is sufficient
* [GitHub](http://github.com) – Required to deploy code to Azure

# Exercise 1: Create a basic node app and run it locally
 
## Scenario
We will create a basic Node.js web app that serves up some HTML content using the Express framework and run it locally.

## Create your project folder

1. Open the ‘Node.js command prompt’ from the task bar or by searching for it in Start.
2. Make a new folder named ‘chess’ that will contain our source code and navigate to it

 ````
  > mkdir chess
  > cd chess
 ````
 
3. After you create the folder, now you need to create the package metadata for your node app. This file will include all of the project decencies. 
 
 ````
  > npm init
 ````
4. This will walk through a tutorial, keep all the defaults by repeatedly hitting enter.
5.	List the folders contents contents and open the package file
 ````
 > dir
 ````

<sub>Note: To open the current folder in Visual Studio Code type “code <filename>” from the command prompt to open a file or folder.</sub>

## Create your project folder
1. Observe your project metadata displayed in Visual Studio Code.
2. Click on the new file button and create a new file named ‘index.js’
3. In your index.js file paste in the following code. This is the code for your web server.

    ````javascript
    var express = require('express');
    var app = express();
    app.use(express.static('public')); 
    var http = require('http').Server(app);
    var port = process.env.PORT || 3000;
    
    app.get('/', function(req, res) {
        res.sendFile(__dirname + '/default.html');
    });
    
    http.listen(port, function() {
        console.log('listening on *: ' + port);
    });
    ```` 

4. Create another file called ‘default.html’ in the same folder and type hello world into it. Go ahead and save it.
5. Switch back to the ‘Node.js command prompt’ and type ‘npm install express’. This will add the express web framework to your node app so you can host web content.
    ```` 
    > npm install express
    ```` 
6. Switch back to Visual Studio Code, click the Debug button on the left and hit the play button to start your project. debug.
7. You can see in the Debug Console that the “listening on *: 3000” console message was printed out so we know our code is working. Let’s see if it’s hosting the page.
8. Open your browser and navigate to localhost:3000 and you’ll see your webpage 

## Add the chess game

### What we need
 1.	Chessboard.js – This is a full interactive touch ready chessboard that let’s you programmatically place chess pieces, respond to player movements through event callbacks, and customize piece theme. This is the UI and visual behavior.
 2.	Chess.js – This is the chess logic. It will know if something is a valid chess move and maintain the game logic and state. What’s cool is that it’s compatible with Chessboard.js by using a standard FEN notation for board layout and game moves.

### Get started
1. Download the above references and add them to your lib folder
2. Add the chess markup to your default.html file.
  ````html 
<html>
    <body>
        <div id="gameBoard"></div>
        <script src="default.js"></script>
        <script src="../lib/chess.min.js"></script>
        <script src="../lib/chessboard-0.3.0.min.js"></script>
    </body>
</html>
  ```` 
3. Create a new file named default.js and include the following source code.

    ````javascript
    window.onload = function() { initGame(); }
    
    var initGame = function () {
        var cfg = {
            draggable: true,
            position: 'start',
            onDrop: handleMove,
        };
        
        board = new ChessBoard('gameBoard', cfg);
        game = new Chess();
    }
    
    var handleMove = function(source, target) {
        var move = game.move({from: source, to: target});
    }
    ```` 
    
Now we need to go run the full game that we created. Click the play button to start debugging the Chess game. You’ll see that it’s running!

# Exercise 2: Make it real-time with Socket.io

## Scenario
What’s going to make our chess game special is that it’s real-time and superfast to make, and respond to chess moves. WebSockets and the Socket.io JavaScript framework are the special sauce that is going to make this work.
Respond to a simple Socket.io message

## Respond to a simple Socket.io message

### What we need
* [Socket.io](http://socket.io) - A Handy JS framework for doing real-time stuff with WebSockets

### Get started
1. Open the ‘Node.js command prompt’ and type ‘npm install socket.io’ This adds the project dependencies to our project.
  ```` 
    > npm install socket.io
  ```` 
2. Update default.js to send a message to the server when someone clicks a button.
  ````javascript
   // setup my socket client
   var socket = io();
   
   msgButton.onclick = function(e) {
       // someone clicked send a message
       socket.emit('message', 'hello world!');
   }
  ```` 
3. Now update index.js to respond to that message by outputting to the log.

    ````javascript
    // setup my socket server
    var io = require('socket.io')(http);
     
    io.on('connection', function(socket) {
        console.log('New connection');
     
        socket.on('message', function(msg) {
            console.log('Got message from client: ' + msg);
        }
    }
    ```` 

Now when you run it, observe in the console that your message made it across when you click the button! 