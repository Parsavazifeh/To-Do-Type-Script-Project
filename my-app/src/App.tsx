import React, { useState, useEffect } from 'react';
import Sidebar from "./Components/Sidebar";
import Task from "./Components/Task";
import SearchBar from "./Components/SearchBar";

interface TaskData {
  id: number;
  value: string;
  category: string;
  checked: boolean;
}

const TASKS_STORAGE_KEY = 'tasks';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [tasks, setTasks] = useState<TaskData[]>(() => {
    try {
      const stored = localStorage.getItem(TASKS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored) as TaskData[];
      }
    } catch (err) {
      console.error('Failed to parse tasks from localStorage:', err);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    } catch (err) {
      console.error('Failed to save tasks to localStorage:', err);
    }
  }, [tasks]);

  const [newTaskText, setNewTaskText] = useState<string>("");

  const toggleTask = (id: number, newChecked: boolean) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id
          ? { ...t, checked: newChecked }
          : t
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const addTask = () => {
    const trimmedText = newTaskText.trim();
    if (!trimmedText) return;

    const categoryToUse = selectedCategory === 'All'
      ? 'Uncategorized'
      : selectedCategory;

    const nextId = tasks.length > 0
      ? Math.max(...tasks.map(t => t.id)) + 1
      : 1;

    const newTask: TaskData = {
      id: nextId,
      value: trimmedText,
      category: categoryToUse,
      checked: false,
    };

    setTasks(prev => [...prev, newTask]);
    setNewTaskText("");
  };

  const filteredTasks: TaskData[] = (() => {
    const byCategory = selectedCategory === 'All'
      ? tasks
      : tasks.filter(t => t.category === selectedCategory);

    const incomplete = byCategory
      .filter(t => !t.checked)
      .sort((a, b) => a.value.localeCompare(b.value));

    const complete = byCategory
      .filter(t => t.checked)
      .sort((a, b) => a.value.localeCompare(b.value));

    return [...incomplete, ...complete];
  })();

  return (
    <div
      style={{
        backgroundColor: '#EA5959',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: '70%',
          width: '80%',
          backgroundColor: '#FFFFFF',
          borderRadius: '1rem',
          padding: '0.5rem'
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
        />
        <div style={{ padding: '2rem', flex: 1 }}>
          <h1>{selectedCategory} Tasks</h1>
          <SearchBar
            value={newTaskText}
            onChange={setNewTaskText}
            onEnter={addTask}
          />
          {filteredTasks.map(t => (
            <Task
              key={t.id}
              value={t.value}
              category={t.category}
              checked={t.checked}
              onChange={(newChecked) => toggleTask(t.id, newChecked)}
              onDelete={() => deleteTask(t.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;