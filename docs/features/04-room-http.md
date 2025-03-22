# Milestone: Basic Room Initialization via REST

## Success Criteria

1. **Empty Server State:**  
   The backend starts with no rooms defined.

2. **GET /rooms Endpoint:**  
   Returns the current list of active rooms. Initially, this endpoint returns an empty list.

3. **POST /rooms/join Endpoint:**  
   Handles player join requests:
   - If no active room exists when the first player joins, a new room is created with a unique id, a default name, and the player is added.
   - If an active room already exists, the player is added to that room.

4. **Simple Domain Logic:**  
   - When the first player connects, the server creates a new room and adds the player.
   - When subsequent players connect, they join the existing room.
   - Querying `/rooms` should accurately reflect the current state (i.e., one room with one player, then one room with two players after a second join).

5. **Unit Testing:**  
   - Use a testing framework (such as Jest) to simulate the following scenario:
     - Start with an empty state.
     - A first player joins via POST `/rooms/join` resulting in one active room with one player.
     - A second player joins via POST `/rooms/join`, and now querying GET `/rooms` returns the same room containing two players.

## Technical Steps

1. **Extend Room Provider:**  
   Enhance the existing RoomProvider (in the backend) to support adding a player to a room.

2. **Implement REST Endpoints:**  
   - **GET `/rooms`:** Fetch the list of active rooms.
   - **POST `/rooms/join`:** Adds a player to a room, with logic to:
     - Create a new room if none exists.
     - Add the player to the existing room otherwise.

3. **Unit Testing:**  
   Write tests to simulate the described room and player join scenario, ensuring that the room state is updated as expected.

4. **Documentation:**  
   Optionally update internal docs or README files with API details if needed.

This milestone focuses solely on the backend REST endpoints for room management, excluding authentication and real-time gameplay. The goal is to achieve a working prototype for room creation and player joining in about an hour of focused development.


* [Troubleshooting with Claude](https://claude.ai/share/cc840936-5ac0-493e-8e8b-f2e08af058d7)