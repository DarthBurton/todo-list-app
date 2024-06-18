import React from 'react';

const TaskList = ({ tasks, status, updateTaskStatus, deleteTask }) => {
  // Function to handle deletion of a task
  const handleDelete = (taskId) => {
    deleteTask(taskId);
  };

  return (
    <div className="task-list">
      {/* Map through tasks array to render each task */}
      {tasks.map((task) => (
        <div
          key={task.id}
          className="task"
          draggable
          // Set taskId as data transfer data on drag start
          onDragStart={(e) => {
            e.dataTransfer.setData('taskId', task.id.toString());
          }}
        >
          <h3>{task.title}</h3>
          <p><strong>Description:</strong> {task.description}</p>
          <p><strong>Assignee:</strong> {task.assignee}</p>
          <p><strong>Status:</strong> {task.status}</p>
          {}
          <button onClick={() => handleDelete(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
