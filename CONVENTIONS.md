# Conventions
Guidelines to follow when writing code.

Write css in separate .scss files adjacent to the componets where they are used, rather than putting styling into components.

When adding tsx ts files in places like components/ or models/, also update the associated index.ts file as appropriate.

When adding dependencies for the front end, be sure to put those in frontend/node_modules and frontend/package.json not at the root level.
Same goes for adding things in backend/node_modules.  We don't want node_modules at the root.

As the user, I will run the frontend and backend server processes separately on my machine in other windows.
Don't try to npm start things yourself, tell me as the user to do that when needed. 
This can also relate to when I need to restart servers or frontends because new dependencies have been installed.
