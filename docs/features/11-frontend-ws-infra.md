In this milestone we're going to make it so that when a new player joins we send an event to
a websocket on the backend, and maintain that connection.

We will create an object that encapsulates our server connection.  This will go in 
frontend/src/services/GameConnection.ts.  (Using UpperCamelCase for the filename.)

Additionally, we will define a custom hook in frontend/src/hooks/useGameConnection.ts which will manage 
the lifecycle of our GameConnection instance, including initialization and cleanup. This hook will 
integrate the connection seamlessly with our React components, allowing us to instantiate the GameConnection 
in LandingPage and share its state via context or direct hook usage.

The idea is we won't be thinking about websockets anywhere else but inside this module, keeping our 
communication logic encapsulated and easily testable.

The GameConnection object will have these methods:
* Connect(Player).  This will automatically send a player join event to the server.


