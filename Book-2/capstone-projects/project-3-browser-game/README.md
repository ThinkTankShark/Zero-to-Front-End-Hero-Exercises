# Project 3: Interactive Browser Game

## Overview

Build an engaging browser-based game (Simon Says OR Memory Card game—your choice!). This capstone project for Volume 2 requires integrating all JavaScript concepts: events, state management, timers, game logic, and more.

**Game Options:**
1. **Simon Says** - Sequence memory game
2. **Memory Card Match** - Card matching game

Choose the one that interests you more!

## Learning Objectives

- ✅ Complex state management
- ✅ Event handling and timing
- ✅ Game logic and algorithms
- ✅ Animation and visual feedback
- ✅ Sound integration
- ✅ Score tracking and high scores
- ✅ Context binding (`this`)

## Requirements (Simon Says Version)

### Core Features

1. **Game Board**
   - [ ] 4 colored buttons/pads
   - [ ] Start button
   - [ ] Score display
   - [ ] Level display

2. **Game Logic**
   - [ ] Generate random sequence
   - [ ] Play sequence (light up + sound)
   - [ ] Accept user input
   - [ ] Validate sequence
   - [ ] Increase difficulty each level

3. **Feedback**
   - [ ] Visual feedback on button press
   - [ ] Sound for each button
   - [ ] Success/fail animations
   - [ ] Game over message

4. **Scoring**
   - [ ] Current score
   - [ ] High score (localStorage)
   - [ ] Level counter
   - [ ] Speed increase per level

5. **Game States**
   - [ ] Start screen
   - [ ] Playing
   - [ ] Player turn
   - [ ] Computer turn
   - [ ] Game over

### Technical Requirements

- Proper state machine
- Timer management (setInterval, setTimeout)
- Event delegation
- Audio API for sounds
- CSS animations
- localStorage for high scores

## Requirements (Memory Card Version)

### Core Features

1. **Game Board**
   - [ ] Grid of cards (4x4 or 6x6)
   - [ ] Cards flip on click
   - [ ] Images/icons on cards
   - [ ] Move counter

2. **Game Logic**
   - [ ] Shuffle cards randomly
   - [ ] Match checking
   - [ ] Prevent clicking during animation
   - [ ] Win condition (all matched)

3. **Feedback**
   - [ ] Card flip animations
   - [ ] Match success indication
   - [ ] Wrong match indication
   - [ ] Win celebration

4. **Scoring**
   - [ ] Move counter
   - [ ] Timer
   - [ ] Star rating (performance)
   - [ ] Best time (localStorage)

5. **Difficulty Levels**
   - [ ] Easy (4x4 grid)
   - [ ] Medium (4x5 grid)
   - [ ] Hard (6x6 grid)

## Checkpoints

### Checkpoint 1: Basic UI & Structure
- [ ] Create game board HTML/CSS
- [ ] Style game elements
- [ ] Add start button
- [ ] Display score/level

### Checkpoint 2: Core Game Logic
- [ ] Implement game state management
- [ ] Generate sequences/shuffle cards
- [ ] Handle user input
- [ ] Validate moves

### Checkpoint 3: Timing & Animation
- [ ] Add timers for sequence playback
- [ ] Implement animations
- [ ] Handle async sequences
- [ ] Smooth transitions

### Checkpoint 4: Sound & Feedback
- [ ] Add sound effects
- [ ] Visual feedback
- [ ] Success/fail states
- [ ] Game over screen

### Checkpoint 5: Scoring & Polish
- [ ] Score calculation
- [ ] High score persistence
- [ ] Difficulty progression
- [ ] Final polish

## Stretch Goals

1. **Multiple Difficulty Levels**
2. **Multiplayer Mode**
3. **Themes** - Change colors/sounds
4. **Leaderboard** - Online scores
5. **Mobile Touch Support**
6. **Accessibility** - Keyboard controls
7. **Tutorial Mode**
8. **Achievements System**

## State Management Pattern

```javascript
const gameState = {
    sequence: [],
    playerSequence: [],
    level: 1,
    score: 0,
    isPlaying: false,
    isPlayerTurn: false
};
```

## Common Pitfalls

**❌ Avoid:**
- Not handling async properly
- Allowing clicks during computer turn
- Forgetting to clean up timers
- Poor state management
- No loading/disabled states

**✅ Do:**
- Disable buttons when appropriate
- Clear timers properly
- Manage state centrally
- Provide visual feedback
- Handle edge cases

