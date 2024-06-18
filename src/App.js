import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State to store the tasks
  const [tasks, setTasks] = useState([]);
  
  // State to store the new task details
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'To Do',
    assignee: ''
  });
  
  // State to store the task being dragged
  const [draggingTask, setDraggingTask] = useState(null);
  
  // State to control the visibility of the modal
  const [modalVisible, setModalVisible] = useState(false);

  // Task statuses
  const statuses = ['To Do', 'In Progress', 'Done'];

  // Fetch tasks from data.json on component mount
  useEffect(() => {
    fetch('/data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched tasks:', data); // Log the fetched data
        setTasks(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Handle the start of dragging a task
  const handleDragStart = (task) => {
    setDraggingTask(task);
  };

  // Handle dropping a task into a new status column
  const handleDrop = (status) => {
    if (draggingTask) {
      setTasks(prevTasks =>
        prevTasks
          .filter(task => task.title !== draggingTask.title)
          .concat({ ...draggingTask, status })
      );
      setDraggingTask(null);
    }
  };

  // Allow drop by preventing the default handling of the dragover event
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Add a new task if it doesn't already exist
  const addTask = () => {
    const taskExists = tasks.some(task => task.title === newTask.title);
    if (taskExists) {
      setModalVisible(true);
    } else {
      setTasks([...tasks, newTask]);
      setNewTask({ title: '', description: '', status: 'To Do', assignee: '' });
    }
  };

  // Delete a task by its title
  const deleteTask = (title) => {
    setTasks(tasks.filter(task => task.title !== title));
  };

  // Close the modal
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="app">
      <h1>Todo List</h1>
      <div className="columns">
        {statuses.map(status => (
          <div
            key={status}
            className="column"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(status)}
          >
            <h2>{status}</h2>
            <div className="tasks">
              {tasks
                .filter(task => task.status === status)
                .map(task => (
                  <div
                    key={task.title}
                    className="task"
                    draggable
                    onDragStart={() => handleDragStart(task)}
                  >
                    <p><strong>Title:</strong> {task.title}</p>
                    <p><strong>Description:</strong> {task.description}</p>
                    <p><strong>Assignee:</strong> {task.assignee}</p>
                    <div className="task-actions">
                      <button onClick={() => deleteTask(task.title)}>Delete</button>
                    </div>
                  </div>
                ))}
              {tasks.filter(task => task.status === status).length === 0 && <p className="empty-column">Column is empty</p>}
            </div>
          </div>
        ))}
      </div>
      <div className="task-form-container">
        <form className="task-form">
          <h3>Add a new task</h3>
          <label>
            Title:
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
          </label>
          <label>
            Description:
            <textarea
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
          </label>
          <label>
            Status:
            <select
              value={newTask.status}
              onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </label>
          <label>
            Assignee:
            <input
              type="text"
              value={newTask.assignee}
              onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
            />
          </label>
          <button type="button" onClick={addTask}>Add Task</button>
        </form>
      </div>
      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>A task with this title already exists.</h2>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
