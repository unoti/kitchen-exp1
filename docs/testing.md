# Testing Strategy and Business Logic Separation

In this project, we enforce a strict separation between business logic and infrastructure concerns. This design offers several benefits:

- **Flexibility:**  
  By decoupling the core logic from the specifics of event sourcing, network communication, or storage, we can easily swap out infrastructure components (such as WebSockets, HTTP endpoints, or even file-based replays) without modifying the business logic.

- **Testability:**  
  Keeping business logic isolated allows us to perform robust unit tests in memory—using mocks or stubs for external dependencies—without the overhead of integration testing with actual network or storage systems. For HTTP endpoint testing, **Supertest** is recommended over built-in testing tools, as it allows you to simulate HTTP requests to your Express server in a lightweight manner.

This approach mirrors the best practices used in other languages (like Python), leveraging dependency injection and clear separation of concerns to facilitate both rapid development and reliable testing.
