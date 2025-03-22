# Yes Chef

**Yes Chef** is an experimental multiplayer web game — part cooking competition, part chaotic kitchen sim, all real-time fun.

The goal of this project is to prototype the gameplay loop of a shared cooking space where players collaborate (or compete) to prepare dishes by moving between stations and interacting with shared ingredients, tools, and workspaces.

We’re starting simple: no fancy graphics, just React components, fast iteration, and a shared backend state. The goal is to explore what makes the core loop fun before investing in visuals or polish.

---

## Gameplay Concept

Players enter a shared kitchen environment and see a set of **stations**, each representing a key part of the kitchen:

- **Pantry** (dry goods and vegetables)  
- **Refrigerator** (perishables)  
- **Cupboard** (dishes and pans)  
- **Cutting Board** (prep area)  
- **Stove** (cooking area)  
- **Delivery Counter** (where finished dishes go)

Players can click a station to move there instantly (or near-instantly). **Only one player may occupy a station at a time.** Once at a station, players can interact in a context-sensitive way: picking up ingredients, dropping off inventory, or performing actions specific to that station.

For now, there are no scoring mechanics, timers, or winning conditions — the initial goal is to make it **feel good** to move around, interact, and play with the kitchen space.

---

## Architecture Overview

- **Frontend:** React (with Fluent UI), TypeScript  
- **Backend:** Node.js with WebSockets, also in TypeScript  
- **State Management:**  
  - All authoritative game state lives on the **backend**, managed by a reducer.  
  - Clients receive state updates via WebSocket and render accordingly.  
  - Clients send player actions (like movement or inventory transfers) to the server.  
- **Rooms:**  
  - A simple lobby/landing page shows all active rooms.  
  - If no room exists, a new one is created.  
  - Players can join any room with available space.  
  - Room timeout and cleanup logic is out of scope for the prototype.

---

## Why This Exists

This project is a sandbox to answer one question: **Is this idea fun?**

Rather than spend time on visuals or long-term architecture, *Yes Chef* is intended to help us feel out the moment-to-moment gameplay, player flow, and interaction model. If it turns out to be engaging, we’ll use what we learn here to build a more polished version later — potentially in Unreal Engine or another production-grade platform.

---

## Next Steps

- ✅ Build core reducer for game state  
- ✅ Enable player movement between stations  
- ⏳ Implement basic inventory pickup / dropoff  
- ⏳ Add more stations and interactions  
- 🔜 Try collaborative cooking with shared goals  
- 🔮 Later: introduce scoring, judging, and LLM-based creativity metrics  

---

Want to jump in? Clone the repo, spin up the dev server, and start clicking around the kitchen. Just don’t burn the onions.

---
# Project Title

A brief description of what this project does and who it's for.

## Installation

Instructions on how to install and set up the project.

## Usage

Examples of how to use the project.

## Contributing

Guidelines for contributing to the project.

## License

Information about the project's license.
