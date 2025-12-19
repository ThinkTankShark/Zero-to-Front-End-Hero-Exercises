# Project 1: Task Manager Application

## Overview

Build a fully functional task management application with CRUD (Create, Read, Update, Delete) capabilities. This project tests your DOM manipulation, event handling, data management, and localStorage skills.

**What you'll build:**
- Task creation and management system
- Categories for organizing tasks
- Filter and search functionality
- Data persistence with localStorage
- Responsive interface

## Learning Objectives

- ✅ DOM manipulation and traversal
- ✅ Event handling and delegation
- ✅ Array methods (map, filter, reduce, find)
- ✅ Object manipulation
- ✅ localStorage for data persistence
- ✅ Function composition and organization
- ✅ State management patterns

## Requirements

### Core Features

1. **Task Creation**
   - [ ] Input field for task text
   - [ ] Category selection dropdown
   - [ ] Priority level (Low, Medium, High)
   - [ ] Due date picker
   - [ ] Add button

2. **Task Display**
   - [ ] List of all tasks
   - [ ] Show task details (text, category, priority, due date)
   - [ ] Visual indication of priority
   - [ ] Overdue tasks highlighted

3. **Task Actions**
   - [ ] Mark task as complete/incomplete (checkbox)
   - [ ] Edit task (inline editing)
   - [ ] Delete task
   - [ ] Duplicate task

4. **Filtering & Search**
   - [ ] Filter by category
   - [ ] Filter by priority
   - [ ] Filter by status (all, active, completed)
   - [ ] Search tasks by text
   - [ ] Clear all filters

5. **Data Persistence**
   - [ ] Save tasks to localStorage
   - [ ] Load tasks on page load
   - [ ] Auto-save on changes

6. **Statistics**
   - [ ] Total tasks counter
   - [ ] Completed tasks counter
   - [ ] Tasks by category count

### Technical Requirements

- Vanilla JavaScript (no frameworks)
- ES6+ features (arrow functions, destructuring, etc.)
- Event delegation for dynamic elements
- Modular code structure
- Error handling
- Input validation

## Checkpoints

### Checkpoint 1: Basic Structure & Create
**Goal:** Set up HTML and create tasks

- [ ] Create HTML structure (form, task list)
- [ ] Style basic interface
- [ ] Implement task creation
- [ ] Display tasks in list
- [ ] Add basic styling for tasks

**Test:** Can create and display tasks

### Checkpoint 2: CRUD Operations
**Goal:** Implement all task operations

- [ ] Mark tasks as complete
- [ ] Delete tasks
- [ ] Edit tasks inline
- [ ] Update task state
- [ ] Visual feedback for actions

**Test:** Can fully manage tasks

### Checkpoint 3: Data Persistence
**Goal:** Implement localStorage

- [ ] Save tasks to localStorage
- [ ] Load tasks on page load
- [ ] Handle JSON serialization
- [ ] Error handling for storage

**Test:** Tasks persist across page refreshes

### Checkpoint 4: Filtering & Categories
**Goal:** Add filtering functionality

- [ ] Implement category system
- [ ] Create filter buttons
- [ ] Filter tasks by category
- [ ] Filter by status
- [ ] Search functionality

**Test:** Can filter and search tasks effectively

### Checkpoint 5: Polish & Enhancements
**Goal:** Add final features and polish

- [ ] Priority indicators
- [ ] Due date handling
- [ ] Statistics display
- [ ] Animations for actions
- [ ] Empty state messages
- [ ] Keyboard shortcuts (stretch)

**Test:** App feels polished and professional

## Stretch Goals

1. **Drag and Drop** - Reorder tasks
2. **Task Notes** - Add detailed descriptions
3. **Subtasks** - Break tasks into steps
4. **Dark Mode** - Theme toggle
5. **Export/Import** - JSON export functionality
6. **Undo/Redo** - Action history
7. **Notifications** - Browser notifications for due dates
8. **Keyboard Shortcuts** - Power user features

## Code Structure

Organize your code into modules:

```javascript
// app.js - Main application logic
// storage.js - localStorage operations
// dom.js - DOM manipulation helpers
// utils.js - Utility functions
// constants.js - App constants
```

## Common Pitfalls

**❌ Avoid:**
- Inline event handlers in HTML
- Global variables everywhere
- Repetitive code
- Not validating user input
- Forgetting edge cases (empty lists, etc.)

**✅ Do:**
- Use event delegation
- Keep functions small and focused
- Handle errors gracefully
- Validate and sanitize input
- Test edge cases

