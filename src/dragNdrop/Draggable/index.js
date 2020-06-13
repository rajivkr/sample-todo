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

  return (
    <div draggable='true' onDragStart={onDragStart} onDragEnd={onDragEnd}>
      {children}
    </div>
  );
};

export default Droppable;
