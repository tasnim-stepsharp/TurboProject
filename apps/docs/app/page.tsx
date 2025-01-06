"use client"
import { useState } from "react";

interface Task {
  text: string;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<string>("");

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask("");
    }
  };

  const toggleTask = (index: number) => {
    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-black">TODO App</h1>
        <div className="flex mb-4">
          <input
            type="text"
            className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none"
            placeholder="Enter a new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            className="bg-blue-500 text-black px-4 py-2 rounded-r-lg hover:bg-blue-600"
            onClick={addTask}
          >
            Add
          </button>
        </div>
        <ul>
          {tasks.map((t, index) => (
            <li
              key={index}
              className={`flex justify-between items-center p-2 border-b ${
                t.completed ? "line-through text-gray-500" : "text-gray-500"
              }`}
            >
              <span
                onClick={() => toggleTask(index)}
                className="cursor-pointer"
              >
                {t.text}
              </span>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
