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


### Question:
> Are there fields that the frontend needs that the backend does not? I'm wondering if we should maintain a separate model for player in particu 
. lar

Based on the current state of the code:

 • The shared model for Player is defined as follows:
```typescript   
   export interface Player {
     id: string;
     name: string;
   }
```   
 • In frontend code (in frontend/src/models/Player.ts and its usage), the same fields (id and name) are expected.
 • The backend also uses this shared Player type (for example, within rooms in the room provider). There are no extra fields on the frontend side     
   beyond id and name.

At this point, the requirements for the frontend and backend are aligned, so there's no evidence that the frontend needs additional fields that the   
backend does not. Maintaining separate models for the same entity could lead to duplication and potential inconsistencies as the system evolves.      

Recommendation:

 1 Unify the Model:
   Consolidate the Player model into the shared models directory (as you're already planning to do with your refactor) so both the frontend and       
   backend import the same definition.
 2 Extending in the Future:
   If, in the future, you identify frontend-specific fields (for example, UI state details, presentation-specific flags, or additional client-side    
   metadata), consider one of the following:
    • Extend the shared Player interface for frontend needs, e.g., create an interface like PlayerUI extends Player so the domain model remains       
      consistent while the frontend gets its extra properties.
    • Use a transformation layer in the frontend that maps the shared Player into a richer object used by the UI. This allows you to keep the API     
      contract simple while still managing client-specific behavior.

For now, keeping a single, unified model for Player is both practical and in line with the goal of avoiding duplication.