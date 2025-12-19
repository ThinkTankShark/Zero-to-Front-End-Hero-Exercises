# Task Manager - Detailed Requirements

Build a full-featured task management application using vanilla JavaScript.

---

## 🎯 Project Goal

Create a task manager that demonstrates mastery of DOM manipulation, event handling, array methods, local storage, and code organization.

---

## 📋 Core Features (MVP)

### 1. Task Creation
- **Add Task Form** with fields:
  - Title (required, max 100 chars)
  - Description (optional, max 500 chars)
  - Due Date (optional)
  - Priority (Low, Medium, High)
  - Category/Project (optional)
- **Validation:**
  - Title cannot be empty
  - Due date must be future date (if provided)
  - Show error messages
- **Submit:** Create task and add to list

### 2. Task Display
- **Task Card** showing:
  - Title
  - Description (truncated if long)
  - Due date (formatted: "Dec 20, 2025")
  - Priority indicator (color-coded)
  - Category/tag
  - Completion checkbox
  - Edit button
  - Delete button
- **Visual States:**
  - Different style for completed tasks
  - Overdue tasks highlighted
  - Priority colors (Low=green, Medium=yellow, High=red)

### 3. Task Operations (CRUD)
- **Create:** Add new task via form
- **Read:** Display all tasks in list
- **Update:**
  - Toggle completion status
  - Edit task details via modal/form
- **Delete:** Remove task with confirmation

### 4. Filtering & Sorting
- **Filter by Status:**
  - All tasks
  - Active only
  - Completed only
- **Filter by Priority:**
  - All priorities
  - High only
  - Medium only
  - Low only
- **Filter by Category** (if categories exist)
- **Sort by:**
  - Date created (newest/oldest)
  - Due date (soonest/latest)
  - Priority (high to low)
  - Alphabetical (A-Z / Z-A)
- **Search:** Filter tasks by keyword in title/description

### 5. Statistics Dashboard
- Total tasks count
- Active tasks count
- Completed tasks count
- Completion percentage
- Overdue tasks count (if applicable)

### 6. Data Persistence
- Save all tasks to localStorage
- Load tasks on page load
- Auto-save on every change
- Handle localStorage errors
- Export/Import features (bonus)

---

## 🎨 UI/UX Requirements

### Layout
- Header with app title and statistics
- Add task form (can be modal or inline)
- Filter/sort controls
- Task list area
- Empty state when no tasks

### Responsive Design
- Mobile (320px+): Single column, stacked layout
- Tablet (768px+): Two columns for tasks
- Desktop (1024px+): Sidebar for filters, main area for tasks

### Visual Feedback
- Button hover states
- Smooth animations (add/remove tasks)
- Loading states (if needed)
- Success/error messages
- Disabled states during operations

### Accessibility
- Keyboard navigation (Tab, Enter, Escape)
- ARIA labels for screen readers
- Focus visible indicators
- Semantic HTML

---

## 💻 Technical Requirements

### JavaScript Patterns

**Task Model:**
```javascript
class Task {
  constructor(data) {
    this.id = Date.now().toString() + Math.random();
    this.title = data.title;
    this.description = data.description || '';
    this.dueDate = data.dueDate || null;
    this.priority = data.priority || 'medium';
    this.category = data.category || '';
    this.completed = false;
    this.createdAt = new Date().toISOString();
  }
}
```

**Required Modules:**
1. `Task.js` - Task class/model
2. `TaskManager.js` - Business logic (add, delete, update, filter, sort)
3. `storage.js` - localStorage operations
4. `UI.js` - DOM manipulation and rendering
5. `app.js` - Main entry point, event listeners

### Array Methods to Use
- `filter()` - Filtering tasks
- `map()` - Transforming data
- `find()` - Finding specific task
- `findIndex()` - Finding task index
- `sort()` - Sorting tasks
- `reduce()` - Statistics calculation

### Event Handling
- Form submission
- Button clicks
- Checkbox changes
- Input changes (search)
- Dropdown changes (filters)
- Event delegation for dynamic elements

### localStorage
- Save: `localStorage.setItem('tasks', JSON.stringify(tasks))`
- Load: `JSON.parse(localStorage.getItem('tasks'))`
- Handle quota exceeded errors
- Handle corrupt data

---

## 📊 Data Structure

```javascript
// Task Object
{
  id: "1639234123456-0.789",
  title: "Complete project",
  description: "Finish the task manager app",
  dueDate: "2025-12-25",
  priority: "high",        // 'low', 'medium', 'high'
  category: "Work",
  completed: false,
  createdAt: "2025-12-19T10:30:00.000Z"
}

// App State
{
  tasks: [],               // Array of Task objects
  currentFilter: 'all',    // 'all', 'active', 'completed'
  currentSort: 'date',     // 'date', 'priority', 'alphabetical'
  searchTerm: ''
}
```

---

## ✅ Acceptance Criteria

### Minimum Pass (60%):
- Can add tasks with title
- Can mark complete/incomplete
- Can delete tasks
- Basic styling
- Data persists in localStorage

### Portfolio-Ready (85%):
- All CRUD operations work
- Filtering and sorting functional
- Search works
- Professional UI
- Fully responsive
- Good code organization

### Exceptional (95%):
- All features + bonuses
- Excellent UI/UX
- Perfect responsive design
- Accessible (WCAG AA)
- Clean, modular code
- Handle edge cases
- Export/import functionality

---

## 🐛 Edge Cases to Handle

1. **Empty title** - Prevent submission
2. **Very long title/description** - Truncate display
3. **Past due date** - Show as overdue
4. **100+ tasks** - Performance considerations
5. **localStorage full** - Graceful error handling
6. **Corrupted localStorage data** - Reset to empty
7. **No tasks** - Show empty state
8. **Special characters** - Handle properly
9. **Date formatting** - Show user-friendly dates
10. **Filter/sort with 0 results** - Show message

---

## 🎓 Skills Assessment

This project tests:
- ✅ JavaScript fundamentals
- ✅ DOM manipulation
- ✅ Event handling
- ✅ Array methods
- ✅ Object-oriented programming
- ✅ Modules/code organization
- ✅ localStorage API
- ✅ Form validation
- ✅ Date/time handling
- ✅ Responsive design
- ✅ User experience

---

## 📚 Recommended Approach

### Phase 1: Core Functionality (Week 1)
1. Create Task class
2. Build add task form
3. Display tasks in list
4. Implement delete functionality
5. Add completion toggle

### Phase 2: Filtering & Sorting (Week 2)
6. Add status filters
7. Implement search
8. Add sorting options
9. Build statistics dashboard

### Phase 3: Polish & Persistence (Week 3)
10. localStorage integration
11. Edit task functionality
12. Improve UI/UX
13. Add animations
14. Test on mobile

### Phase 4: Advanced Features (Week 4)
15. Export/import
16. Additional filters
17. Keyboard shortcuts
18. Accessibility improvements
19. Final polish

---

**Target:** Build a task manager you'd actually use! Make it portfolio-worthy! 💼✨

