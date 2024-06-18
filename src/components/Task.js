import React from 'react';

// Task component renders individual task information
function Task({ task }) {
  return (
    <div className="task" draggable="true" data-task-id={task.id}>
      <h3>{task.title}</h3> {}
      <p><strong>Description:</strong> {task.description}</p> {}
      <p><strong>Assignee:</strong> {task.assignee}</p> {}
      <p><strong>Status:</strong> {task.status}</p> {}
    </div>
  );
}

export default Task;
