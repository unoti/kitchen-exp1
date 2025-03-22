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

## Troubleshooting Notes (03/22/2025)

When setting up the backend, we encountered the following issues and fixes:

1. **Type Definition Mismatch:**  
   The project had a version mismatch between Express 4.x and @types/express 5.0.1, causing TypeScript compilation errors. The error manifested as:
   ```
   TSError: ⨯ Unable to compile TypeScript:
   error TS2769: No overload matches this call.
     The last overload gave the following error.
       Argument of type '(req: Request, res: Response, next: NextFunction) => express.Response<any, Record<string, any>> | undefined' is not assignable to parameter of type 'Application<Record<string, any>>'.
   ```

2. **Fixes Applied:**  
   - Removed the unnecessary `NextFunction` parameter from route handlers in `chefServer.ts`
   - Downgraded the TypeScript type definitions to match the Express version:
     ```bash
     npm uninstall @types/express && npm install --save-dev @types/express@4.17.21
     ```

3. **Installation Notes:**  
   When using the project's recommended installation command with `--prefix`:
   ```bash
   npm --prefix backend install
   ```
   This requires a root-level package.json file which was missing. As an alternative, 
   navigate directly to the backend directory and run npm commands from there:
   ```bash
   cd backend && npm install
   cd backend && npm start
   ```

These changes resulted in a successfully running backend server that responds correctly to the defined REST endpoints.

* [Troubleshooting with Claude](https://claude.ai/share/cc840936-5ac0-493e-8e8b-f2e08af058d7)
