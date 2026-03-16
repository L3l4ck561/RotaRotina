import { useState, useEffect } from 'react';

function isValidTasksFormat(data) {
  if (!Array.isArray(data)) return false;

  return data.every(task => {
    if (!task || typeof task !== "object" || Array.isArray(task)) return false;

    if (typeof task.id !== "number") return false;
    if (typeof task.texto !== "string") return false;
    if (typeof task.color !== "string") return false;

    if (!task.date || typeof task.date !== "object") return false;
    if (typeof task.date.day !== "number") return false;
    if (typeof task.date.month !== "number") return false;
    if (typeof task.date.year !== "number") return false;

    if (task.startTime !== undefined && typeof task.startTime !== "string") return false;
    if (task.endTime !== undefined && typeof task.endTime !== "string") return false;

    return true;
  });
}

export default function useTasks() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('tasks');
      const parsed = saved ? JSON.parse(saved) : [];

      return isValidTasksFormat(parsed) ? parsed : [];
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