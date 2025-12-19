# Task Manager - Starter Template

Welcome! This starter template provides the foundation for building your Task Manager application.

## 📁 What's Included

```
starter/
├── index.html          # Complete HTML structure
├── css/
│   └── styles.css     # Starter CSS with TODO sections
├── js/
│   ├── app.js         # Main application logic (TODOs)
│   ├── Task.js        # Task class definition
│   ├── TaskManager.js # TaskManager class
│   ├── UI.js          # DOM manipulation functions
│   └── storage.js     # LocalStorage operations
└── README.md          # This file
```

## 🚀 Getting Started

### 1. Open the Project
- Open `index.html` in your browser
- Open the project folder in VS Code

### 2. Complete the TODOs
The starter code has `TODO` comments throughout. Complete them in this order:

**Phase 1: Core Classes**
1. Complete `Task.js` - Task class methods
2. Complete `TaskManager.js` - Task management logic
3. Complete `storage.js` - LocalStorage operations

**Phase 2: UI & App Logic**
4. Complete `UI.js` - DOM manipulation functions
5. Complete `app.js` - Wire everything together

**Phase 3: Polish**
6. Complete `styles.css` - Finish styling
7. Add animations and transitions
8. Test thoroughly

### 3. Test As You Build
Open browser console (F12) and test each function:
```javascript
// Test Task class
const task = new Task({ title: 'Test Task' });
console.log(task);

// Test TaskManager
const manager = new TaskManager();
manager.addTask(task);
console.log(manager.getAllTasks());
```

## ✅ Features to Implement

### Must Have (MVP)
- [x] HTML structure (provided)
- [x] CSS foundation (provided)
- [ ] Add task functionality
- [ ] Display tasks
- [ ] Mark complete/incomplete
- [ ] Delete tasks
- [ ] Filter tasks (all/active/completed)
- [ ] LocalStorage persistence

### Should Have
- [ ] Edit tasks
- [ ] Due dates
- [ ] Priorities
- [ ] Categories
- [ ] Sort functionality
- [ ] Search functionality
- [ ] Statistics

### Nice to Have
- [ ] Dark mode
- [ ] Export/import tasks
- [ ] Keyboard shortcuts
- [ ] Undo/redo
- [ ] Task templates

## 💡 Implementation Tips

### Starting Point
1. Start with the `Task` class - get it working first
2. Then build `TaskManager` - test with console.log()
3. Wire up the form to create tasks
4. Display tasks in the UI
5. Add delete functionality
6. Add complete/uncomplete
7. Add localStorage
8. Polish the UI

### Debugging Tips
- Use `console.log()` liberally
- Check browser console for errors
- Test each function individually
- Use breakpoints in DevTools

### Code Organization
- Keep each file focused on its responsibility
- Use meaningful variable names
- Comment complex logic
- Test frequently

## 📚 Key Concepts

### Classes
- `Task`: Represents a single task
- `TaskManager`: Manages the collection of tasks
- Separation of concerns

### LocalStorage
- Save tasks as JSON
- Load tasks on page load
- Handle errors (quota exceeded)

### Event Delegation
- Listen on parent element
- Handle all task actions efficiently

### Array Methods
- `filter()`: Filter by status/search
- `map()`: Transform data
- `sort()`: Sort tasks
- `find()`: Find by ID

## 🧪 Testing Checklist

Before considering your app complete:
- [ ] Add task with only title
- [ ] Add task with all fields
- [ ] Complete a task
- [ ] Uncomplete a task
- [ ] Delete a task
- [ ] Filter tasks
- [ ] Sort tasks
- [ ] Search tasks
- [ ] Refresh page (data persists)
- [ ] Add 20+ tasks (performance)
- [ ] Test on mobile device
- [ ] Test with screen reader

## 📖 Resources

- [MDN LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [MDN Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [JavaScript Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

## 🆘 Stuck?

1. Check the main project README
2. Review the relevant book chapter
3. Check hints.md (if available)
4. Google the specific error
5. Look at console errors carefully

## 🎯 Success Criteria

Your app is complete when:
- All required features work
- Data persists after page refresh
- No console errors
- Works on mobile
- Code is clean and organized
- You're proud to show it!

---

**Happy coding! Build something awesome!** 🚀

