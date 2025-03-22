# Conventions
Guidelines to follow when writing code.

* Write css in separate .scss files adjacent to the componets where they are used, rather than putting styling into components.
* When adding tsx ts files in places like components/ or models/, also update the associated index.ts file as appropriate.
* When adding dependencies for the front end, be sure to put those in frontend/node_modules and frontend/package.json not at the root level.
