# Contracts and Class-Based Design

This document outlines our approach to defining and enforcing contracts within our codebase, particularly for business objects such as providers and services.

## Key Principles

- **Explicit Contracts:**  
  We use TypeScript interfaces along with class-based implementations to clearly declare the contracts each business object must fulfill. This explicitness makes it immediately apparent what methods and properties a class is expected to provide.

- **Clarity Through Classes:**  
  Adopting a class-based design ensures that the implementation of these contracts is transparent. It audibly signals to developers—especially those coming from a C# or similar background—that the codebase adheres to well-defined object-oriented principles.

- **Enhanced Testability:**  
  With clear contracts in place, unit tests can easily substitute mock implementations for dependencies, ensuring that business logic remains isolated from infrastructure concerns.

By following these guidelines, we create a maintainable, robust system where contracts are both enforced and easily understandable.

## Example Implementation

Below is an example of a contract for a RoomProvider:

```typescript
export interface RoomProvider {
  getActiveRooms(): Room[];
  addRoom(room: Room): void;
}

export interface Room {
  id: string;
  name: string;
  players: Player[];
}

export interface Player {
  id: string;
  name: string;
}

export class InMemoryRoomProvider implements RoomProvider {
  private rooms: Room[] = [];

  getActiveRooms(): Room[] {
    return this.rooms;
  }

  addRoom(room: Room): void {
    this.rooms.push(room);
  }
}
```

This example demonstrates how we use TypeScript interfaces along with class-based implementations to define clear contracts.
