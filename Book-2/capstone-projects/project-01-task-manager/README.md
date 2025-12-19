# Project 1: Task Manager Application

**Difficulty:** ⭐⭐ Beginner-Friendly
**Estimated Time:** 30-40 hours
**Perfect for:** Demonstrating core JavaScript skills

---

## 🎯 Project Overview

Build a full-featured task manager (Todo app) with categories, priorities, due dates, and local storage persistence.

---

## ✅ Required Features

### Core Functionality
- [ ] Add new tasks with title and description
- [ ] Mark tasks as complete/incomplete
- [ ] Edit existing tasks
- [ ] Delete tasks
- [ ] Tasks persist in local storage

### Task Properties
- [ ] Title (required)
- [ ] Description (optional)
- [ ] Due date
- [ ] Priority (Low, Medium, High)
- [ ] Category/Project
- [ ] Status (Pending, In Progress, Complete)
- [ ] Created timestamp

### Filtering & Sorting
- [ ] Filter by: All, Active, Completed
- [ ] Filter by priority
- [ ] Filter by category
- [ ] Sort by: Date, Priority, Alphabetical
- [ ] Search tasks by keyword

### User Interface
- [ ] Add task form with validation
- [ ] Task list with visual status indicators
- [ ] Edit task modal/form
- [ ] Delete confirmation
- [ ] Statistics dashboard (total, completed, pending)
- [ ] Empty state when no tasks
- [ ] Loading state (if using async operations)

### Data Persistence
- [ ] Save to localStorage on every change
- [ ] Load from localStorage on page load
- [ ] Handle localStorage quota errors
- [ ] Export tasks as JSON
- [ ] Import tasks from JSON

---

## 🎨 Design Requirements

- Clean, modern interface
- Color-coded priorities
- Responsive (mobile, tablet, desktop)
- Smooth animations on add/remove
- Accessible (keyboard navigation, ARIA labels)
- Professional look suitable for portfolio

---

## 💻 Technical Requirements

### JavaScript Patterns
```javascript
// Use classes or factory functions for tasks
class Task {
  constructor(title, description, dueDate, priority, category) {
    this.id = Date.now().toString();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.category = category;
    this.completed = false;
    this.createdAt = new Date().toISOString();
  }
}

// Or use modules
// taskManager.js - handles business logic
// ui.js - handles DOM manipulation
// storage.js - handles localStorage
```

### Code Organization
```
task-manager/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── app.js           # Main entry point
│   ├── task.js          # Task class/model
│   ├── taskManager.js   # Business logic
│   ├── ui.js            # DOM manipulation
│   └── storage.js       # localStorage operations
└── README.md
```

---

## 🧪 Testing Checklist

- [ ] Add task with all fields
- [ ] Add task with only title
- [ ] Edit task
- [ ] Delete task
- [ ] Complete/uncomplete task
- [ ] Filters work correctly
- [ ] Sort works correctly
- [ ] Search finds tasks
- [ ] Data persists after refresh
- [ ] Works on mobile devices
- [ ] Handles 100+ tasks performantly
- [ ] Edge case: Empty title (should prevent)
- [ ] Edge case: Special characters in title
- [ ] Edge case: Very long descriptions

---

## 💡 Bonus Features (Optional)

- [ ] Dark mode toggle
- [ ] Recurring tasks
- [ ] Task notes/comments
- [ ] Subtasks/checklist items
- [ ] Drag and drop to reorder
- [ ] Color themes for categories
- [ ] Keyboard shortcuts
- [ ] Undo/redo functionality
- [ ] Task templates
- [ ] Email reminders (educational, won't actually send)

---

## 📚 Skills Demonstrated

✅ DOM Manipulation
✅ Event Handling
✅ Array Methods (filter, map, reduce, sort)
✅ Objects and Classes
✅ Local Storage API
✅ Form Validation
✅ JSON manipulation
✅ Date/Time handling
✅ Error handling
✅ Code organization

---

## 🎓 Learning Outcomes

By completing this project, you'll be able to:
- Build complete JavaScript applications
- Manage application state
- Persist data locally
- Create intuitive user interfaces
- Write clean, maintainable code
- Handle user input and validation
- Debug JavaScript applications

---

**Start building in the `starter/` folder or from scratch!**

