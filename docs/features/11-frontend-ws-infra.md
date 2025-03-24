In this milestone we're going to make it so that when a new player joins we send an event to
a websocket on the backend, and maintain that connection.

We will create an object that encapsulates our server connection.  This will go in 
frontend/src/GameConnection.ts.  (Should it start with upper or lower case for the filename?)

The idea is we won't be thinking about websockets anywhere else but inside this module.

The GameConnection object will have these methods:
* Connect(Player).  This will automatically send a player join event to the server.


