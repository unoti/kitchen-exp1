# Chef Server API Documentation

This document describes the API endpoints for the Chef Backend server and provides example request and response bodies.

**Note:** Shared models used by both the frontend and backend are stored in the `shared/models` directory. They can be referenced for details on the data structures the API consumes and returns.

---

## Endpoints

### GET /rooms

**Description:**  
Returns a list of active rooms.

**Example Request:**
```
GET http://localhost:3000/rooms
```

**Example Response:**
```json
[
  {
    "id": "room-1616585323",
    "name": "Default Room",
    "players": [
      { "id": "p1", "name": "Alice" },
      { "id": "p2", "name": "Bob" }
    ]
  }
]
```

---

### POST /rooms/join

**Description:**  
Adds a player to a room.  
If no room exists, a new room is created with a default name and the player is added.

**Example Request:**
```
POST http://localhost:3000/rooms/join
Content-Type: application/json
```

**Request Body:**
```json
{
  "player": { "id": "p3", "name": "Charlie" }
}
```

**Example Response (new room created):**
```json
{
  "id": "room-1616585323",
  "name": "Default Room",
  "players": [
    { "id": "p3", "name": "Charlie" }
  ]
}
```

**Example Response (joining existing room):**
```json
{
  "id": "room1",
  "name": "Existing Room",
  "players": [
    { "id": "p1", "name": "Alice" },
    { "id": "p2", "name": "Bob" },
    { "id": "p3", "name": "Charlie" }
  ]
}
```

---

### GET /status

**Description:**  
Returns a simple health check message.

**Example Request:**
```
GET http://localhost:3000/status
```

**Example Response:**
```
Chef Backend is running!
```
