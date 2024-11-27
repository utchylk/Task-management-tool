import { useEffect, useState, useCallback } from 'react';
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import './index.css';

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    const handleStorage = () => {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    };
    handleStorage();
  }, [tasks]);

  const onTaskClick = useCallback((taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {...task, isCompleted: !task.isCompleted};
      }
      return task;
    });
    setTasks(newTasks);
  }, [tasks]);

  const onDeleteTaskClick = useCallback((taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }, [tasks]);

  function handleAddTask(title, description) {
    if (validateTask(title, description)) {
      const newTask = {
        id: Date.now(),
        title,
        description,
        isCompleted: false,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } else {
      alert("Please, add a title and a description.");
    }
  }

  function validateTask(title, description) {
    return title.trim() && description.trim();
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <h1 className="text-3xl text-slate-100 font-bold text-center">Task management tool</h1>
        <AddTask onAddTaskSubmit={handleAddTask} />
        <Tasks 
          tasks={tasks} onTaskClick={onTaskClick} onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;