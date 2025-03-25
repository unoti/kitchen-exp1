We want to make it apparent to the user that a station can be clicked on.

Modify the css for the station so that when the user is hovering over a station
* it grows a bit larger and changes color
* use css transitions on this so that the user can see what's happening, make it nice
* Also when hovering over a station, change the mouse pointer shape to invite the user to click on it

If a chef is inside of a station, give that station a different class
	and style the station a bit differently.

To send the click events back up to the LandingPage where our state is managed, do this:
* Create a dispatch function in Landing Page.
* Hand that dispatch function off to children via a context manager.
* In Station.tsx pick up that dispatch method and dispatch a message that is
	appropriate for a go to station message as described in shared/models/event.ts
	In there you are looking for MoveToStationEvent.
	You want to make one of those and send it.

When we're done with this step, I want to see a console.log originating from within
	LandingPage.tsx where its dispatch function that it handed down to children
	is getting called and going down to the console.

Also change LandingPage.tsx to send that formatted message down the websocket to GameConnection
right after it logs the message.