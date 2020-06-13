import React from 'react';

const Droppable = ({ todoItem, setDragElement, children }) => {
  const onDragStart = ({ dataTransfer, target }) => {
    dataTransfer.setData('todo-item', JSON.stringify(todoItem));
    setDragElement(todoItem);
    setTimeout(() => {
      target.style.visibility = 'hidden';
    }, 1);
  };

  const onDragEnd = e => (e.target.style.visibility = 'visible');

  const onDragEnter = e => (e.target.style.border = '2px dashed #000');

  const onDragLeave = e => (e.target.style.border = 'none');

  return (
    <div
      draggable='true'
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
    >
      {children}
    </div>
  );
};

export default Droppable;
