# The Kingdoms Railway

A web-based puzzle game developed as part of the **Web Programming course** at ELTE — **Semester 3**.  
Built using **vanilla JavaScript**, **HTML**, and **CSS**, this game challenges players to construct a valid railway path on procedurally generated terrain, obeying specific placement rules based on tile types.

---

## 🎯 Objective

Design a railway network that satisfies strict placement rules and connectivity conditions. Each game map is randomly generated depending on the chosen difficulty. The player must build a continuous, valid path before time runs out.

---

## 🕹️ Gameplay Features

- **Name and Difficulty Selection**: Start the game by entering your name and selecting a difficulty level.
- **Procedural Map Generation**: Each difficulty level provides a unique, randomized map layout.
- **Tile-Based Placement Rules**:
  - 🟫 *Bridge*: only straight elements allowed.
  - ⛰️ *Mountain*: only curved (90°) elements allowed.
  - 🟢 *Oasis*: cannot place anything.
  - 🟩 *Empty*: any element is allowed.
- **Dynamic Timer**: Timer starts once the game begins.
- **Game Rules Access**: Easily accessible from the main menu.

---

## ✅ Core Mechanics

- **Placement Validation**:
  - Each touchable cell must be used only once.
  - The path must be continuous and traversable.
  - The correct track element must be placed based on terrain.
- **Game Completion Check**: Auto-check for puzzle validity and completion.
- **Leaderboard**:
  - Records completion time per difficulty level.
  - Stored using `localStorage` for persistent access.
- **Path Drawing Mode**: Click and drag to lay down track elements rapidly.

---

## ✨ Bonus Features

- **Persistent Leaderboard** using browser `localStorage`.
- **Mouse Path Drawing** for intuitive element placement.
