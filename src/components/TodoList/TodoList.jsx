import React, { useState } from 'react';
import '../../App.css'

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const editTask = (index) => {
    setIsEditing(true);
    setNewTask(tasks[index].text);
    setCurrentTaskIndex(index);
  };

  const updateTask = () => {
    const updatedTasks = tasks.map((task, index) =>
      index === currentTaskIndex ? { ...task, text: newTask } : task
    );
    setTasks(updatedTasks);
    setIsEditing(false);
    setNewTask('');
    setCurrentTaskIndex(null);
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(updatedTasks);
  };

  const toggleCompletion = (index) => {
    const updatedTasks = tasks.map((task, taskIndex) =>
      taskIndex === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-list-container">
      <h1>Todo List</h1>
      <div className="task-input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        {isEditing ? (
          <button onClick={updateTask}>Update Task</button>
        ) : (
          <button onClick={addTask}>Add Task</button>
        )}
      </div>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <span onClick={() => toggleCompletion(index)}>
              {task.text}
            </span>
            <button onClick={() => editTask(index)}>Edit</button>
            <button onClick={() => removeTask(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
