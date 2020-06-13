import React from 'react';

const Droppable = ({ onTodoDrop, children, status }) => {
  const allowDrop = e => e.preventDefault();

  const handleDrop = e => {
    const data = JSON.parse(e.dataTransfer.getData('todo-item'));
    onTodoDrop(data, status);
  };

  return (
    <div onDragOver={allowDrop} onDrop={handleDrop} className='drop-wrapper'>
      {children}
    </div>
  );
};

export default Droppable;
