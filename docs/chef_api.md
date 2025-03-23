# Chef Server API Documentation

This document describes the API endpoints for the Chef Server.

---

## GET /rooms

Retrieves the list of active rooms.

**Endpoint:**
```
GET /rooms
```

**Response:** (Status 200 OK)
```json
[
  {
    "id": "room-1638881234567",
    "name": "Default Room",
    "players": [
      { "id": "p1", "name": "Alice" },
      { "id": "p2", "name": "Bob" }
    ]
  }
]
```

---

## POST /rooms/join

Adds a player to a room. If no active room exists, a new room is created with a default name.

**Request:**
```json
{
  "player": { "id": "p3", "name": "Charlie" }
}
```

**Response:** (Status 200 OK)
```json
{
  "id": "room-1638881234567",
  "name": "Default Room",
  "players": [
    { "id": "p1", "name": "Alice" },
    { "id": "p2", "name": "Bob" },
    { "id": "p3", "name": "Charlie" }
  ]
}
```

*Note:* If no room exists, a new room is created with an automatically generated id and the name "Default Room".

---

## GET /status

Health check endpoint.

**Endpoint:**
```
GET /status
```

**Response:** (Status 200 OK)
```
Chef Backend is running!
```
