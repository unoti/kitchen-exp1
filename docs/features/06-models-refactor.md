# Models reorganization and refactor

Analyze what we have going on with models both on the front end, backend, and also in the shared directory.
We are preparing now to do some changes where the front end starts calling APIs on the backend. Below is an analysis of our current state and the proposed improvements.

## Summary of the current situation

- The frontend currently maintains its own model for Player in `frontend/src/models/Player.ts`.
- The shared directory contains models such as Room and Player in `shared/models/`.
- The backend uses shared models (e.g., Room from `shared/models/Room.ts`).
- There is a risk of duplication and inconsistency between frontend-specific models and shared models.

## How we want it to be

- Consolidate all domain models (e.g., Player, Room) in the `shared/models/` directory.
- The frontend should import models directly from `shared/models/`, removing duplicate definitions.
- The backend will continue to use the models from `shared/models/`.
- This ensures consistency across the application when the frontend starts making API calls to the backend.

## Steps to make it the way we want

1. Deprecate or remove `frontend/src/models/Player.ts`.
2. Update `frontend/src/models/index.ts` to re-export models from `shared/models/`.
3. Audit all frontend files to change their imports to use shared models instead.
4. Update documentation and API endpoints as necessary to reflect the unified model definitions.


