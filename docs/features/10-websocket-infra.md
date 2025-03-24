# Websocket Infrastructure

Our goal for this milestone is to send events from the client and get state updates from the server.

In previous iterations we have joined a room using a POST.  The next step is to get
a websocket open with the server.

Let's think though how this will work technically.  I'm thinking that each room has
its own websocket URL.  So after the player does a post to get a room id,
they open the websocket for that room.

But thinking this through more, what if the player joins the room but never
opens the websocket? We don't want that player in the room state because they
are not really there.

To streamline this and make it simpler, how about we eliminate the player join POST
completely.  Instead, the player opens a websocket to the server, and sends
down that websocket an event with a player join which includes their profile information.

Then from there the server hears that event, joins them to a room, and now they are
connected to that room's reducer via a websocket.

## Recommendations and Thoughts

- **Consider Robust Connection Handling:** Ensure the client retries connection attempts and handles disconnections gracefully.
- **Security Improvements:** Validate websocket events with proper authentication (e.g., tokens) to prevent unauthorized access.
- **Error Propagation & Logging:** Implement detailed error logging and provide clear feedback for connection timeouts or failures.
- **Scalability Considerations:** Plan for managing a high volume of websocket connections through load balancing or clustering.
- **Documentation Updates:** Regularly update both development and user documentation to reflect the real-time architecture changes.
