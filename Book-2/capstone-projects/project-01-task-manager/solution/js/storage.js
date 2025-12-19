/**
 * storage.js - LocalStorage Operations
 * Handles saving and loading tasks from localStorage
 */

const Storage = {
  STORAGE_KEY: 'taskManagerTasks',

  /**
   * Save tasks to localStorage
   */
  save(tasks) {
    try {
      const tasksJSON = JSON.stringify(tasks);
      localStorage.setItem(this.STORAGE_KEY, tasksJSON);
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);

      // Handle quota exceeded error
      if (error.name === 'QuotaExceededError') {
        alert('Storage is full! Please delete some tasks.');
      } else {
        alert('Failed to save tasks. Please try again.');
      }
      return false;
    }
  },

  /**
   * Load tasks from localStorage
   */
  load() {
    try {
      const tasksJSON = localStorage.getItem(this.STORAGE_KEY);

      if (!tasksJSON) {
        return [];
      }

      const tasksData = JSON.parse(tasksJSON);

      // Validate data is an array
      if (!Array.isArray(tasksData)) {
        console.warn('Invalid tasks data in localStorage. Resetting...');
        this.clear();
        return [];
      }

      // Convert to Task instances
      return tasksData.map(data => Task.fromJSON(data));

    } catch (error) {
      console.error('Error loading from localStorage:', error);
      alert('Failed to load tasks. Starting fresh.');
      this.clear();
      return [];
    }
  },

  /**
   * Clear all tasks from localStorage
   */
  clear() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },

  /**
   * Export tasks as JSON file
   */
  exportToFile(tasks) {
    try {
      const dataStr = JSON.stringify(tasks, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `tasks-backup-${Date.now()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
      return true;
    } catch (error) {
      console.error('Error exporting tasks:', error);
      alert('Failed to export tasks');
      return false;
    }
  },

  /**
   * Import tasks from JSON file
   */
  importFromFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const tasksData = JSON.parse(e.target.result);

          if (!Array.isArray(tasksData)) {
            throw new Error('Invalid file format');
          }

          const tasks = tasksData.map(data => Task.fromJSON(data));
          resolve(tasks);
        } catch (error) {
          reject(new Error('Failed to parse file'));
        }
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      reader.readAsText(file);
    });
  }
};

