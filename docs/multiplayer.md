# Multiplayer Strategy

In this prototype, the backend is the source of truth for the entire game state. The frontend is focused on rendering this state and sending high-level events (e.g., "go to station") to the backend. The backend will process these events, update the state accordingly, and push the complete updated state to all connected clients via WebSockets.

For simplicity:
- The frontend will not perform predictive state updates.
- The backend will send the whole state in every update rather than incremental event patches.
- This design cleanly separates display logic from game state management, keeping each component focused on its purpose.

In this prototype, the backend is intentionally kept minimal. A basic HTTP health-check endpoint is provided solely for deployment and initial verification. Our primary focus is on business logic and state management through well-defined contracts and event-driven state transitions, rather than relying on synthetic HTTP or WebSocket requests for testing. This approach minimizes dependencies and keeps the HTTP layer as lean as possible.