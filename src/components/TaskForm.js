import React, { useState } from 'react';

function TaskForm({ statuses, onAddTask }) {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: statuses[0], // Default status is the first status in the array
    assignee: ''
  });

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(newTask);
    setNewTask({ // Reset form fields after submission
      title: '',
      description: '',
      status: statuses[0],
      assignee: ''
    });
  };

  return (
    <div className="task-form-container">
      <form className="task-form" onSubmit={handleSubmit}>
        <h3>Add a new task</h3>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Status:
          <select
            name="status"
            value={newTask.status}
            onChange={handleInputChange}
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
            name="assignee"
            value={newTask.assignee}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default TaskForm;
