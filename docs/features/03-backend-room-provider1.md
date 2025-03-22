# Milestone: Room Provider Part 1

The milestone we're working on now is the room provider. As described in docs\contracts.md,
we have a clear separation between business objects, which don't know about their execution context
and focus exclusively in the business domain, versus other infrastructure objects.

In this milestone we'll create a basic room provider.

## Success Criteria
* Shared models directory created and available for backend (to be imported by the frontend later).
* Established room model that includes an id, a name, and a list of players.
* Established player model.
* Create a room provider which returns a list of rooms (using hard-coded data).
* Unit tests work verifying the room provider returns at least one room.

We will handle sharing that code on the front end later; for now we're focused just on the backend.

## Steps
Proceed in the following sequence
1. Establish a shared models directory which can be imported and used both from the front end and back end.
2. Create a room model in this shared area. For now a room has an id, a name, and a list of players. Also create a Player model in the shared area.
3. Establish a room provider interface, using the ideas from docs\contracts.md. This interface is backend only and lives in a dataprovider directory on the backend.
4. Create a room provider on the backend. For now it will return a hard coded list of rooms. We'll expand it to be more complete later and handle state changes and so on, but for now it returns hard coded data.
5. Make a unit test that ensures the room provider returns at least 1 room.
