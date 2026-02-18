import { useState, useEffect } from 'react';

export default function useTasks() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('tasks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => setTasks(prev => [...prev, task]);
  const updateTask = (task) =>
    setTasks(prev => prev.map(t => t.id === task.id ? task : t));
  const deleteTask = (id) => setTasks(prev => prev.filter(t => t.id !== id));

  return { tasks, addTask, updateTask, deleteTask };
}
